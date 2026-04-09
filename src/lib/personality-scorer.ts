// Personality Scorer (client-side, zero API calls)
//
// Estimates Big Five (OCEAN) scores from text using published
// LIWC-category → Big Five correlation coefficients from:
//   Yarkoni, T. (2010). "Personality in 100,000 words: A large-scale
//   analysis of personality and word use among bloggers."
//   Journal of Research in Personality, 44(3), 363–373.
//   https://pmc.ncbi.nlm.nih.gov/articles/PMC2885844/
//
// Cross-validates with Enneagram using trait profiles from:
//   Newgent, R. A., Parr, P. E., Newman, I., & Higgins, K. K. (2004).
//   "The Riso-Hudson Enneagram Type Indicator: Estimates of reliability
//   and validity."
//
// ALL PROCESSING HAPPENS CLIENT-SIDE. No text leaves the browser.

import { LIWC_LITE, type CategoryName } from "@/data/liwc-lite-categories";

// ─── Types ────────────────────────────────────────────────────────────────

export interface BigFiveScores {
  O: number;  // Openness (0-100 percentile-ish)
  C: number;  // Conscientiousness
  E: number;  // Extraversion
  A: number;  // Agreeableness
  N: number;  // Neuroticism
}

export interface CategoryCount {
  category: CategoryName;
  count: number;
  percent: number;  // % of total words
  label: string;
}

export interface ScoringResult {
  bigFive: BigFiveScores;
  wordCount: number;
  confidence: "very low" | "low" | "medium" | "high";
  confidenceNote: string;
  topCategories: CategoryCount[];  // top 5 most-used categories
  enneagramEstimate: {
    topType: number;
    topTypeScore: number;
    runnerUpType: number;
    runnerUpScore: number;
    allScores: Array<{ type: number; score: number }>;
  };
  interpretations: {
    trait: keyof BigFiveScores;
    label: string;
    level: "low" | "moderate" | "high";
    signal: string;  // one-sentence plain-english interpretation
  }[];
}

// ─── Yarkoni (2010) correlation coefficients ──────────────────────────────
//
// For each LIWC category, we encode the published correlation with each
// Big Five trait. These are direct values from Yarkoni 2010 Table 1 (where
// available) or estimated from the aggregate patterns for categories not
// explicitly tabulated. Unknown entries are set to 0 (no effect).
//
// Coefficient scale: roughly -0.25 to +0.25 as published.
// Categories with no published coefficient are set to 0.

const YARKONI_WEIGHTS: Record<CategoryName, BigFiveScores> = {
  // Pronouns
  pronoun_i:      { O: -0.05, C: -0.10, E: -0.05, A: -0.08, N:  0.18 },  // I-use ↑ with neuroticism
  pronoun_we:     { O:  0.05, C:  0.08, E:  0.10, A:  0.18, N: -0.08 },  // we-use ↑ with agreeableness
  pronoun_you:    { O: -0.05, C: -0.03, E: -0.15, A:  0.05, N: -0.02 },  // 2nd-person ↓ with extraversion
  pronoun_they:   { O:  0.04, C:  0.02, E: -0.05, A: -0.03, N:  0.05 },

  // Structural
  articles:       { O: -0.11, C:  0.08, E: -0.08, A:  0.03, N: -0.05 },  // articles ↓ with openness (in blogs)
  prepositions:   { O:  0.17, C:  0.05, E: -0.05, A:  0.02, N: -0.06 },  // ↑ with openness, complex writing
  negations:      { O:  0.03, C: -0.17, E: -0.10, A: -0.08, N:  0.17 },  // strong ↑ with neuroticism
  quantifiers:    { O:  0.05, C:  0.03, E:  0.02, A:  0.00, N:  0.00 },

  // Emotion
  pos_emotion:    { O:  0.04, C:  0.05, E:  0.15, A:  0.18, N: -0.12 },
  neg_emotion:    { O:  0.05, C: -0.08, E: -0.12, A: -0.15, N:  0.22 },
  anxiety:        { O:  0.02, C: -0.05, E: -0.08, A: -0.05, N:  0.17 },
  anger:          { O:  0.02, C: -0.10, E:  0.02, A: -0.23, N:  0.13 },
  sadness:        { O:  0.04, C: -0.05, E: -0.08, A: -0.02, N:  0.10 },

  // Social
  social:         { O: -0.03, C:  0.05, E:  0.15, A:  0.10, N: -0.08 },
  family:         { O:  0.02, C:  0.08, E:  0.05, A:  0.19, N: -0.02 },
  friend:         { O:  0.00, C:  0.05, E:  0.15, A:  0.12, N: -0.05 },
  sexual:         { O:  0.10, C: -0.05, E:  0.17, A: -0.03, N:  0.05 },

  // Cognitive
  cognitive:      { O:  0.10, C:  0.05, E: -0.05, A:  0.02, N:  0.08 },
  insight:        { O:  0.15, C:  0.05, E: -0.05, A:  0.00, N:  0.05 },
  causation:      { O:  0.12, C:  0.06, E: -0.05, A:  0.00, N:  0.02 },
  certainty:      { O: -0.05, C:  0.10, E:  0.08, A: -0.02, N: -0.03 },
  tentative:      { O:  0.12, C: -0.10, E: -0.08, A:  0.05, N:  0.10 },

  // Achievement / drive
  achievement:    { O:  0.05, C:  0.14, E:  0.10, A: -0.05, N: -0.05 },

  // Crude markers
  swear:          { O:  0.08, C: -0.14, E:  0.10, A: -0.21, N:  0.08 },

  // Concrete categories
  body:           { O:  0.03, C: -0.02, E:  0.05, A:  0.00, N:  0.05 },
  work:           { O: -0.03, C:  0.10, E:  0.02, A: -0.02, N: -0.02 },
  leisure:        { O:  0.05, C: -0.05, E:  0.12, A:  0.08, N: -0.10 },
  time:           { O: -0.03, C:  0.05, E:  0.02, A:  0.00, N:  0.02 },
  future_focus:   { O:  0.05, C:  0.12, E:  0.08, A:  0.02, N: -0.05 },
  past_focus:     { O: -0.02, C:  0.00, E: -0.05, A:  0.00, N:  0.08 },
};

// ─── Enneagram → Big Five target profiles ────────────────────────────────
//
// Based on Newgent et al. (2004) + aggregate research:
// Each value is -1 (low) to +1 (high). The user's Big Five profile
// (centered around 0) is compared to each target via negative Euclidean
// distance. Highest score = best match.

const ENNEAGRAM_BIG5_TARGETS: Record<number, BigFiveScores & { name: string }> = {
  1: { name: "Reformer",     O:  0.0, C:  0.9, E: -0.1, A:  0.1, N:  0.3 },  // ↑↑ C, mild ↑ N
  2: { name: "Helper",       O:  0.1, C:  0.2, E:  0.4, A:  0.9, N:  0.1 },  // ↑↑ A, ↑ E
  3: { name: "Achiever",     O:  0.2, C:  0.6, E:  0.7, A: -0.1, N: -0.1 },  // ↑ E, ↑ C
  4: { name: "Individualist",O:  0.8, C: -0.1, E: -0.4, A:  0.0, N:  0.8 },  // ↑↑ O, ↑↑ N, ↓ E
  5: { name: "Investigator", O:  0.7, C:  0.2, E: -0.8, A: -0.3, N:  0.2 },  // ↑ O, ↓↓ E
  6: { name: "Loyalist",     O: -0.1, C:  0.3, E: -0.2, A:  0.3, N:  0.7 },  // ↑↑ N
  7: { name: "Enthusiast",   O:  0.7, C: -0.3, E:  0.8, A:  0.2, N: -0.5 },  // ↑↑ E, ↑ O, ↓ N
  8: { name: "Challenger",   O:  0.1, C:  0.2, E:  0.5, A: -0.6, N:  0.0 },  // ↓↓ A
  9: { name: "Peacemaker",   O: -0.1, C: -0.1, E: -0.3, A:  0.7, N: -0.3 },  // ↑ A, ↓ N, ↓ E
};

// ─── Tokenizer ────────────────────────────────────────────────────────────

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s']/g, " ")          // keep apostrophes for contractions
    .split(/\s+/)
    .filter((w) => w.length > 0);
}

// ─── Category counting ───────────────────────────────────────────────────

function countCategories(tokens: string[]): Record<CategoryName, number> {
  // Build a set per category for fast lookup
  const catSets: Record<string, Set<string>> = {};
  for (const [cat, words] of Object.entries(LIWC_LITE)) {
    catSets[cat] = new Set(words.map((w) => w.toLowerCase()));
  }

  const counts: Record<string, number> = {};
  for (const cat of Object.keys(LIWC_LITE)) counts[cat] = 0;

  for (const tok of tokens) {
    for (const cat of Object.keys(catSets)) {
      if (catSets[cat].has(tok)) counts[cat] += 1;
    }
  }

  return counts as Record<CategoryName, number>;
}

// ─── Big Five scoring ────────────────────────────────────────────────────

function scoreBigFive(
  counts: Record<CategoryName, number>,
  wordCount: number
): BigFiveScores {
  if (wordCount === 0) return { O: 50, C: 50, E: 50, A: 50, N: 50 };

  // Raw trait scores: sum of (category frequency × correlation coefficient)
  const raw: BigFiveScores = { O: 0, C: 0, E: 0, A: 0, N: 0 };

  for (const [cat, count] of Object.entries(counts)) {
    const freq = count / wordCount;  // normalize to frequency
    const weights = YARKONI_WEIGHTS[cat as CategoryName];
    raw.O += freq * weights.O;
    raw.C += freq * weights.C;
    raw.E += freq * weights.E;
    raw.A += freq * weights.A;
    raw.N += freq * weights.N;
  }

  // Scale raw scores to 0-100 percentile-ish space.
  // Empirically calibrated: multiply by 800 and add 50 puts typical text in ~30-70 range.
  const scale = 800;
  return {
    O: Math.max(0, Math.min(100, Math.round(raw.O * scale + 50))),
    C: Math.max(0, Math.min(100, Math.round(raw.C * scale + 50))),
    E: Math.max(0, Math.min(100, Math.round(raw.E * scale + 50))),
    A: Math.max(0, Math.min(100, Math.round(raw.A * scale + 50))),
    N: Math.max(0, Math.min(100, Math.round(raw.N * scale + 50))),
  };
}

// ─── Enneagram cross-validation ──────────────────────────────────────────
//
// For each of 9 types, compute the match score as:
//   matchScore = 100 - (Euclidean distance between user's normalized
//                        Big Five profile and the type's target profile)
// Profiles are normalized to [-1, +1] for distance computation.

function matchEnneagram(bigFive: BigFiveScores): Array<{ type: number; score: number }> {
  // Normalize user's profile from 0-100 to -1...+1
  const norm = {
    O: (bigFive.O - 50) / 50,
    C: (bigFive.C - 50) / 50,
    E: (bigFive.E - 50) / 50,
    A: (bigFive.A - 50) / 50,
    N: (bigFive.N - 50) / 50,
  };

  const scores: Array<{ type: number; score: number }> = [];
  for (let type = 1; type <= 9; type++) {
    const target = ENNEAGRAM_BIG5_TARGETS[type];
    const dist = Math.sqrt(
      Math.pow(norm.O - target.O, 2) +
      Math.pow(norm.C - target.C, 2) +
      Math.pow(norm.E - target.E, 2) +
      Math.pow(norm.A - target.A, 2) +
      Math.pow(norm.N - target.N, 2)
    );
    // Convert distance to a 0-100 match score. Max possible distance ~= sqrt(20) ≈ 4.47
    const maxDist = Math.sqrt(20);
    const matchScore = Math.max(0, Math.round((1 - dist / maxDist) * 100));
    scores.push({ type, score: matchScore });
  }
  scores.sort((a, b) => b.score - a.score);
  return scores;
}

// ─── Confidence estimation ───────────────────────────────────────────────
//
// Based on published research:
//   - LIWC is unreliable below ~200 words
//   - 300-1000 words is "decent"
//   - 1000+ words is "good"
//   - 10,000+ words is "gold standard"

function estimateConfidence(wordCount: number): { level: ScoringResult["confidence"]; note: string } {
  if (wordCount < 100) {
    return {
      level: "very low",
      note: "Less than 100 words. This is barely enough to detect anything meaningful. Paste at least 300 words for a real signal.",
    };
  }
  if (wordCount < 250) {
    return {
      level: "low",
      note: "Under 250 words. Published research says LIWC analysis below ~200 words is unreliable. Take this as a hint, not a result.",
    };
  }
  if (wordCount < 750) {
    return {
      level: "medium",
      note: "A few hundred words is enough to catch the rough shape of your language patterns — but still noisy. Longer text = clearer signal.",
    };
  }
  return {
    level: "high",
    note: "Over 750 words gives a reasonably stable picture — but no amount of text makes this a diagnosis. It's still a noisy signal from an approximation model.",
  };
}

// ─── Top signal extraction (for transparency) ────────────────────────────

const CATEGORY_LABELS: Record<CategoryName, string> = {
  pronoun_i: "First-person (I, me, my)",
  pronoun_we: "First-person plural (we, us)",
  pronoun_you: "Second-person (you, your)",
  pronoun_they: "Third-person (they, them)",
  articles: "Articles (the, a, an)",
  prepositions: "Prepositions (in, of, for…)",
  negations: "Negations (no, not, don't…)",
  quantifiers: "Quantifiers (all, some, many…)",
  pos_emotion: "Positive emotion words",
  neg_emotion: "Negative emotion words",
  anxiety: "Anxiety words (worry, afraid…)",
  anger: "Anger words (mad, furious…)",
  sadness: "Sadness words (lonely, grief…)",
  social: "Social words (people, friends…)",
  family: "Family words (mom, dad…)",
  friend: "Friend words",
  sexual: "Intimacy / closeness words",
  cognitive: "Thinking words (know, believe…)",
  insight: "Insight words (realize, see…)",
  causation: "Causal words (because, so…)",
  certainty: "Certainty words (always, definitely)",
  tentative: "Tentative words (maybe, might)",
  achievement: "Achievement words (win, goal)",
  swear: "Swear words",
  body: "Body words",
  work: "Work words (job, career)",
  leisure: "Leisure words (play, fun)",
  time: "Time words (today, soon)",
  future_focus: "Future-focused words",
  past_focus: "Past-focused words",
};

function topCategories(
  counts: Record<CategoryName, number>,
  wordCount: number,
  limit = 5
): CategoryCount[] {
  const entries = (Object.entries(counts) as [CategoryName, number][])
    .filter(([, n]) => n > 0)
    .map(([cat, count]) => ({
      category: cat,
      count,
      percent: wordCount > 0 ? (count / wordCount) * 100 : 0,
      label: CATEGORY_LABELS[cat],
    }));
  entries.sort((a, b) => b.percent - a.percent);
  return entries.slice(0, limit);
}

// ─── Interpretation (plain English) ──────────────────────────────────────

const TRAIT_INTERPRETATIONS: Record<
  keyof BigFiveScores,
  { label: string; low: string; moderate: string; high: string }
> = {
  O: {
    label: "Openness",
    low: "Your language is grounded in the concrete and familiar.",
    moderate: "You move between the concrete and the abstract.",
    high: "Your language shows a pull toward ideas, abstraction, and complexity.",
  },
  C: {
    label: "Conscientiousness",
    low: "Your language leans loose, spontaneous, and less structured.",
    moderate: "Your writing shows moderate structure and forethought.",
    high: "Your language shows organization, discipline, and achievement focus.",
  },
  E: {
    label: "Extraversion",
    low: "Your language leans inward — more reflection than broadcast.",
    moderate: "Your writing mixes inward reflection and outward engagement.",
    high: "Your language shows social warmth and outward energy.",
  },
  A: {
    label: "Agreeableness",
    low: "Your language carries directness, sometimes sharpness or critique.",
    moderate: "Your writing balances warmth with directness.",
    high: "Your language shows warmth, care, and concern for others.",
  },
  N: {
    label: "Emotional reactivity",
    low: "Your language shows emotional steadiness and resilience.",
    moderate: "Your writing shows moderate emotional variability.",
    high: "Your language shows emotional intensity — highs and lows register strongly.",
  },
};

function interpret(bigFive: BigFiveScores): ScoringResult["interpretations"] {
  const keys: (keyof BigFiveScores)[] = ["O", "C", "E", "A", "N"];
  return keys.map((k) => {
    const score = bigFive[k];
    const level = score < 40 ? "low" : score > 60 ? "high" : "moderate";
    const meta = TRAIT_INTERPRETATIONS[k];
    return {
      trait: k,
      label: meta.label,
      level,
      signal: meta[level],
    };
  });
}

// ─── Main entry point ────────────────────────────────────────────────────

export function scorePersonalityFromText(text: string): ScoringResult {
  const tokens = tokenize(text);
  const wordCount = tokens.length;
  const counts = countCategories(tokens);
  const bigFive = scoreBigFive(counts, wordCount);
  const conf = estimateConfidence(wordCount);
  const top = topCategories(counts, wordCount);
  const enneagramScores = matchEnneagram(bigFive);

  return {
    bigFive,
    wordCount,
    confidence: conf.level,
    confidenceNote: conf.note,
    topCategories: top,
    enneagramEstimate: {
      topType: enneagramScores[0].type,
      topTypeScore: enneagramScores[0].score,
      runnerUpType: enneagramScores[1].type,
      runnerUpScore: enneagramScores[1].score,
      allScores: enneagramScores,
    },
    interpretations: interpret(bigFive),
  };
}

export { ENNEAGRAM_BIG5_TARGETS };
