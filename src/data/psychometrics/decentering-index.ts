// Decentering Index
//
// Based on Fresco, Moore, van Dulmen et al. (2007) Experiences Questionnaire.
// Decentering = the ability to observe thoughts and feelings as transient
// mental events rather than as reflections of reality or central to identity.
//
// Adapted for Enneagram context: each item references the user's type pattern
// specifically. The index measures the gap between "being the pattern" (subject)
// and "seeing the pattern" (object), which maps directly to Kegan's stage 3 → 4
// transition and to the app's philosophical arc (Observer → Looker → Holding Both).
//
// Scored 1-5 per item, averaged, tracked longitudinally. Rising scores over
// months = genuine growth.

export interface DecenteringItem {
  id: string;
  text: string; // contains {type} placeholder, replaced at render time
  reverse: boolean;
}

export const DECENTERING_ITEMS: DecenteringItem[] = [
  { id: "dc1", text: "I can notice my Type {type} pattern firing without being pulled into it.", reverse: false },
  { id: "dc2", text: "When my core fear activates, I experience it as a feeling I am having, not as the truth about reality.", reverse: false },
  { id: "dc3", text: "I can observe my inner critic (or inner narrator) as a voice rather than as myself.", reverse: false },
  { id: "dc4", text: "When a strong emotion arises, I get completely swept up in it before I notice what happened.", reverse: true },
  { id: "dc5", text: "I can hold my personality pattern and the awareness behind it at the same time.", reverse: false },
  { id: "dc6", text: "My type's defensive reaction feels automatic and impossible to see while it is happening.", reverse: true },
  { id: "dc7", text: "I can step back from a difficult situation and observe my own response to it.", reverse: false },
  { id: "dc8", text: "I treat my thoughts about myself as facts rather than as mental events.", reverse: true },
];

export interface DecenteringResult {
  score: number; // 1-5 averaged
  percentage: number; // 0-100
  completedAt: string;
  answers: Record<string, number>;
}

export function scoreDecentering(answers: Record<string, number>): DecenteringResult {
  let sum = 0;
  let count = 0;
  for (const item of DECENTERING_ITEMS) {
    const raw = answers[item.id];
    if (typeof raw !== "number") continue;
    const adj = item.reverse ? 6 - raw : raw;
    sum += adj;
    count++;
  }
  const avg = count > 0 ? sum / count : 3;
  const percentage = Math.round(((avg - 1) / 4) * 100);
  return {
    score: Math.round(avg * 10) / 10,
    percentage,
    completedAt: new Date().toISOString(),
    answers,
  };
}

// Interpretation thresholds
export function interpretDecentering(percentage: number): {
  level: "developing" | "growing" | "established" | "deep";
  description: string;
} {
  if (percentage < 30) return {
    level: "developing",
    description: "You are beginning to notice your patterns. The fact that you can take this assessment means the observer is already working. Keep practicing.",
  };
  if (percentage < 55) return {
    level: "growing",
    description: "You catch your pattern more often than you miss it. The gap between reaction and awareness is narrowing. This is where most of the meaningful growth happens.",
  };
  if (percentage < 75) return {
    level: "established",
    description: "You can hold your type pattern and the awareness behind it simultaneously. The pattern still fires, but it rarely runs you without you noticing.",
  };
  return {
    level: "deep",
    description: "The pattern and the awareness coexist naturally. You are your type and you see your type at the same time. This is what the philosophical arc was building toward.",
  };
}
