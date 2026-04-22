// The Living Mirror
//
// Reads back to you who you are becoming, in your own voice, using your
// own words. Generates a letter from your future self based on:
//   1. Your accumulated text corpus (journal, reflections, intentions)
//   2. Your linguistic growth vector (how your language has changed)
//   3. Your Enneagram integration arc
//
// No app has ever done this. The uncanny recognition of seeing your own
// voice say things you have not said yet is a category of experience
// that does not exist in any product.

export interface TextEntry {
  date: string;
  text: string;
  source: string; // "journal" | "morning" | "evening" | "growth" | "free-recall"
}

export interface LinguisticProfile {
  avgSentenceLength: number;
  hedgingRatio: number; // "maybe", "kind of", "I think", "probably" / total words
  agencyRatio: number; // "I chose", "I decided", "I will" / total words
  emotionWords: number; // percentage
  insightWords: number; // "realize", "understand", "notice", "see" / total words
  totalWords: number;
  totalEntries: number;
  topRecurringPhrases: string[];
  quotableLines: string[]; // sentences that are self-contained and meaningful
}

// Hedging words (partial list, Pennebaker-informed)
const HEDGING = /\b(maybe|perhaps|kind of|sort of|i think|i guess|probably|might|could be|not sure|i don't know)\b/gi;
const AGENCY = /\b(i chose|i decided|i will|i am going to|i want|i need|i committed|i started|i stopped|i realized|i noticed)\b/gi;
const EMOTION = /\b(angry|sad|happy|afraid|anxious|grateful|proud|ashamed|lonely|loved|frustrated|calm|excited|hurt|tender|vulnerable|joyful|peaceful|overwhelmed)\b/gi;
const INSIGHT = /\b(realize|understand|notice|see|recognize|discover|learn|aware|insight|clarity|pattern|shifted)\b/gi;

/**
 * Collect all user text from localStorage sources.
 */
export function collectTextCorpus(): TextEntry[] {
  if (typeof window === "undefined") return [];
  const entries: TextEntry[] = [];

  try {
    // Morning journal
    const morning = localStorage.getItem("psyche-morning-journal");
    if (morning) {
      for (const e of JSON.parse(morning)) {
        if (e.response) entries.push({ date: e.date, text: e.response, source: "morning" });
      }
    }
  } catch {
    // intentionally silent — malformed JSON or private browsing
  }

  try {
    // Evening journal
    const evening = localStorage.getItem("psyche-evening-journal");
    if (evening) {
      for (const e of JSON.parse(evening)) {
        if (e.response) entries.push({ date: e.date, text: e.response, source: "evening" });
      }
    }
  } catch {
    // intentionally silent — malformed JSON or private browsing
  }

  try {
    // Growth reflections (keyed by date)
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("psyche-growth-")) {
        const raw = localStorage.getItem(key);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed.reflection) entries.push({ date: parsed.savedAt?.slice(0, 10) ?? key, text: parsed.reflection, source: "growth" });
        }
      }
    }
  } catch {
    // intentionally silent — malformed JSON or private browsing
  }

  try {
    // Kegan exercises
    const kegan = localStorage.getItem("psyche-kegan-history");
    if (kegan) {
      for (const e of JSON.parse(kegan)) {
        if (e.text) entries.push({ date: e.week, text: e.text, source: "journal" });
      }
    }
  } catch {
    // intentionally silent — malformed JSON or private browsing
  }

  return entries.sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Analyze the linguistic profile of a text corpus.
 */
export function analyzeLinguistics(entries: TextEntry[]): LinguisticProfile {
  const allText = entries.map(e => e.text).join(" ");
  const words = allText.split(/\s+/).filter(w => w.length > 0);
  const totalWords = words.length;
  if (totalWords < 20) {
    return {
      avgSentenceLength: 0, hedgingRatio: 0, agencyRatio: 0, emotionWords: 0,
      insightWords: 0, totalWords, totalEntries: entries.length,
      topRecurringPhrases: [], quotableLines: [],
    };
  }

  // Sentence length
  const sentences = allText.split(/[.!?]+/).filter(s => s.trim().length > 5);
  const avgSentenceLength = sentences.length ? Math.round(totalWords / sentences.length) : 12;

  // Ratios
  const hedgingCount = (allText.match(HEDGING) || []).length;
  const agencyCount = (allText.match(AGENCY) || []).length;
  const emotionCount = (allText.match(EMOTION) || []).length;
  const insightCount = (allText.match(INSIGHT) || []).length;

  // Find quotable lines (sentences between 8-25 words that contain insight or emotion words)
  const quotable = sentences
    .map(s => s.trim())
    .filter(s => {
      const wc = s.split(/\s+/).length;
      return wc >= 8 && wc <= 30 && (INSIGHT.test(s) || EMOTION.test(s) || AGENCY.test(s));
    })
    .slice(-10); // most recent are most relevant

  // Recurring phrases (2-3 word combos that appear 3+ times)
  const bigrams: Record<string, number> = {};
  for (let i = 0; i < words.length - 1; i++) {
    const bg = `${words[i].toLowerCase()} ${words[i + 1].toLowerCase()}`;
    if (bg.length > 5) bigrams[bg] = (bigrams[bg] ?? 0) + 1;
  }
  const topPhrases = Object.entries(bigrams)
    .filter(([, c]) => c >= 2)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([phrase]) => phrase);

  return {
    avgSentenceLength,
    hedgingRatio: totalWords > 0 ? hedgingCount / totalWords : 0,
    agencyRatio: totalWords > 0 ? agencyCount / totalWords : 0,
    emotionWords: totalWords > 0 ? (emotionCount / totalWords) * 100 : 0,
    insightWords: totalWords > 0 ? (insightCount / totalWords) * 100 : 0,
    totalWords,
    totalEntries: entries.length,
    topRecurringPhrases: topPhrases,
    quotableLines: quotable,
  };
}

/**
 * Compute growth vector by comparing early vs recent entries.
 */
export function computeGrowthVector(entries: TextEntry[]): {
  agencyShift: number; // positive = more agency over time
  hedgingShift: number; // negative = less hedging over time
  insightShift: number; // positive = more insight words
  emotionShift: number; // positive = more emotional granularity
  direction: "growing" | "stable" | "early";
} {
  if (entries.length < 6) return { agencyShift: 0, hedgingShift: 0, insightShift: 0, emotionShift: 0, direction: "early" };

  const mid = Math.floor(entries.length / 2);
  const early = entries.slice(0, mid);
  const recent = entries.slice(mid);

  const earlyProfile = analyzeLinguistics(early);
  const recentProfile = analyzeLinguistics(recent);

  const agencyShift = recentProfile.agencyRatio - earlyProfile.agencyRatio;
  const hedgingShift = recentProfile.hedgingRatio - earlyProfile.hedgingRatio;
  const insightShift = recentProfile.insightWords - earlyProfile.insightWords;
  const emotionShift = recentProfile.emotionWords - earlyProfile.emotionWords;

  const totalShift = Math.abs(agencyShift) + Math.abs(hedgingShift) + Math.abs(insightShift) + Math.abs(emotionShift);
  const direction = totalShift > 0.005 ? "growing" : "stable";

  return { agencyShift, hedgingShift, insightShift, emotionShift, direction };
}

/**
 * Generate a "letter from your future self" using the user's own words,
 * growth vector, and type data. This is a client-side template-based
 * version (no LLM needed). For an LLM version, pass the output of
 * analyzeLinguistics + computeGrowthVector to the /api/generate endpoint.
 */
export function generateFutureLetterClientSide(
  profile: LinguisticProfile,
  growth: ReturnType<typeof computeGrowthVector>,
  enneagramType: number,
  displayName?: string | null,
): string {
  const name = displayName ? displayName.split(" ")[0] : "you";
  const quotes = profile.quotableLines;
  const q1 = quotes[0] ? `"${quotes[0]}"` : "";
  const q2 = quotes[1] ? `"${quotes[1]}"` : "";

  // Type-specific future-self voice
  const TYPE_FUTURES: Record<number, string> = {
    1: "The critic is still here. It always will be. But I hear it as a voice now, not as the truth. That distinction changed everything.",
    2: "I still notice when someone needs help. The difference is I ask myself what I need first. Not always. But more than before.",
    3: "I stopped performing for a whole afternoon last month. Nothing collapsed. I am still here. That was the proof I needed.",
    4: "The longing didn't go away. But I found something in an ordinary Tuesday that I used to think only extraordinary moments could give me.",
    5: "I shared an unfinished thought with someone. They didn't judge it. They built on it. The world replenished instead of depleting.",
    6: "I made a decision last week without consulting anyone. I was terrified. It turned out fine. I am learning that I already know enough.",
    7: "I stayed with something boring for longer than I wanted to. What I found underneath the boredom was depth I had been running from.",
    8: "I let someone see the soft part. Not the strength. The tender thing underneath. They held it carefully. I survived.",
    9: "I said what I actually thought in a room full of people. My voice shook. But it was mine. And the room held.",
  };

  const futureVoice = TYPE_FUTURES[enneagramType] ?? "Something shifted. I cannot point to the moment. But the pattern runs me less than it used to.";

  // Growth vector narrative
  let growthNarrative = "";
  if (growth.direction === "growing") {
    if (growth.agencyShift > 0) growthNarrative += "Your language has more agency in it now. More 'I chose' and less 'it happened to me.' ";
    if (growth.hedgingShift < 0) growthNarrative += "You hedge less. The 'maybes' and 'I guesses' are thinning out. ";
    if (growth.insightShift > 0) growthNarrative += "You notice more. The word 'realize' shows up more than it used to. ";
    if (growth.emotionShift > 0) growthNarrative += "Your emotional vocabulary is expanding. You name feelings with more precision. ";
  }

  const letter = [
    `Dear ${name},`,
    "",
    `This is you, a few months from now. I am writing from a place you have not arrived at yet, but you are closer than you think.`,
    "",
    q1 ? `You wrote this recently: ${q1}` : "",
    q1 ? `I want you to know: that sentence was more true than you realized when you wrote it.` : "",
    "",
    futureVoice,
    "",
    growthNarrative ? `Here is what I can see that you cannot: ${growthNarrative.trim()}` : "",
    growthNarrative ? `These are not dramatic changes. They are shifts in how you hold the same pattern. The pattern stays. The grip loosens.` : "",
    "",
    q2 ? `And this: ${q2}` : "",
    q2 ? `You will come back to this line. It will mean something different in three months. Save it.` : "",
    "",
    `The practice continues. It looks like Tuesday.`,
    "",
    `You are not behind. You are here.`,
    "",
    `— You, later`,
  ].filter(line => line !== "").join("\n");

  return letter;
}
