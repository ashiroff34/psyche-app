// Big Five Aspects Scale (BFAS) - short form
//
// DeYoung, Quilty, & Peterson (2007) showed each Big Five factor splits into
// two distinct aspects with separable biological substrates and behavioral
// correlates. This gives 10 aspects instead of 5 factors, or 30 facets:
//
//   Neuroticism → Volatility + Withdrawal
//   Agreeableness → Compassion + Politeness
//   Conscientiousness → Industriousness + Orderliness
//   Extraversion → Enthusiasm + Assertiveness
//   Openness → Openness (proper) + Intellect
//
// The aspects solve the common "I'm half this" problem: someone can be high
// Industriousness but low Orderliness (driven but messy); high Compassion but
// low Politeness (warm but blunt). These patterns are invisible at the
// factor level.
//
// This short form uses 30 items (3 per aspect) on a 1-5 agree-disagree
// Likert scale. Items adapted from the BFAS and IPIP-NEO public domain pools.
//
// Reference: DeYoung, C. G., Quilty, L. C., & Peterson, J. B. (2007).
// Between facets and domains: 10 aspects of the Big Five. JPSP, 93(5), 880-896.

export type Aspect =
  | "volatility"
  | "withdrawal"
  | "compassion"
  | "politeness"
  | "industriousness"
  | "orderliness"
  | "enthusiasm"
  | "assertiveness"
  | "opennessProper"
  | "intellect";

export interface AspectDef {
  key: Aspect;
  name: string;
  factor: "Neuroticism" | "Agreeableness" | "Conscientiousness" | "Extraversion" | "Openness";
  description: string;
  high: string;
  low: string;
}

export const ASPECTS: AspectDef[] = [
  {
    key: "volatility",
    name: "Volatility",
    factor: "Neuroticism",
    description: "Emotional reactivity, irritability, mood shifts.",
    high: "Reactive, quick to anger or frustration, big emotional swings.",
    low: "Stable mood, even-keeled, slow to react emotionally.",
  },
  {
    key: "withdrawal",
    name: "Withdrawal",
    factor: "Neuroticism",
    description: "Anxiety, sadness, inward-turning under stress.",
    high: "Worries, retreats inward under stress, prone to rumination.",
    low: "Stays engaged under pressure, less prone to anxious withdrawal.",
  },
  {
    key: "compassion",
    name: "Compassion",
    factor: "Agreeableness",
    description: "Emotional concern and warmth toward others.",
    high: "Warmly empathetic, responsive to others' emotional needs.",
    low: "Detached or matter-of-fact about others' emotional states.",
  },
  {
    key: "politeness",
    name: "Politeness",
    factor: "Agreeableness",
    description: "Deference to authority and social norms.",
    high: "Respectful, conflict-avoidant, defers to norms.",
    low: "Blunt, willing to challenge authority, low deference.",
  },
  {
    key: "industriousness",
    name: "Industriousness",
    factor: "Conscientiousness",
    description: "Goal-directed effort and persistence.",
    high: "Persistent, hard-working, finishes what she starts.",
    low: "Starts but struggles to finish, low drive toward goals.",
  },
  {
    key: "orderliness",
    name: "Orderliness",
    factor: "Conscientiousness",
    description: "Need for structure, tidiness, schedules.",
    high: "Highly organized, tidy, schedule-driven.",
    low: "Comfortable with mess or unscheduled time, low need for order.",
  },
  {
    key: "enthusiasm",
    name: "Enthusiasm",
    factor: "Extraversion",
    description: "Sociability, positive affect, warmth.",
    high: "Warm, sociable, positive affect, energized by people.",
    low: "Reserved, lower baseline positive affect, not energized by crowds.",
  },
  {
    key: "assertiveness",
    name: "Assertiveness",
    factor: "Extraversion",
    description: "Social agency, willingness to lead and speak up.",
    high: "Takes charge, speaks up, comfortable leading.",
    low: "Waits for others to lead, quieter in groups.",
  },
  {
    key: "opennessProper",
    name: "Openness (proper)",
    factor: "Openness",
    description: "Aesthetic and experiential imagination.",
    high: "Imaginative, drawn to art, vivid inner life.",
    low: "Practical, less drawn to fantasy or aesthetic experience.",
  },
  {
    key: "intellect",
    name: "Intellect",
    factor: "Openness",
    description: "Cognitive engagement, intellectual curiosity.",
    high: "Ideas-driven, enjoys abstract thinking and debate.",
    low: "Less drawn to abstract or theoretical thinking.",
  },
];

export interface AspectItem {
  id: string;
  text: string;
  aspect: Aspect;
  reverse: boolean;
}

// 30 items, 3 per aspect, 1-5 agree scale.
export const ASPECT_ITEMS: AspectItem[] = [
  // Volatility
  { id: "vol1", text: "I get upset easily.", aspect: "volatility", reverse: false },
  { id: "vol2", text: "I rarely get irritated.", aspect: "volatility", reverse: true },
  { id: "vol3", text: "My mood changes frequently.", aspect: "volatility", reverse: false },
  // Withdrawal
  { id: "wd1", text: "I worry about things.", aspect: "withdrawal", reverse: false },
  { id: "wd2", text: "I feel comfortable with myself.", aspect: "withdrawal", reverse: true },
  { id: "wd3", text: "I often feel blue.", aspect: "withdrawal", reverse: false },
  // Compassion
  { id: "cp1", text: "I feel others' emotions.", aspect: "compassion", reverse: false },
  { id: "cp2", text: "I am not really interested in others' troubles.", aspect: "compassion", reverse: true },
  { id: "cp3", text: "I take time out for others.", aspect: "compassion", reverse: false },
  // Politeness
  { id: "pl1", text: "I respect authority.", aspect: "politeness", reverse: false },
  { id: "pl2", text: "I insult people.", aspect: "politeness", reverse: true },
  { id: "pl3", text: "I avoid imposing my will on others.", aspect: "politeness", reverse: false },
  // Industriousness
  { id: "in1", text: "I carry out my plans.", aspect: "industriousness", reverse: false },
  { id: "in2", text: "I waste my time.", aspect: "industriousness", reverse: true },
  { id: "in3", text: "I finish what I start.", aspect: "industriousness", reverse: false },
  // Orderliness
  { id: "or1", text: "I like order.", aspect: "orderliness", reverse: false },
  { id: "or2", text: "I leave my belongings around.", aspect: "orderliness", reverse: true },
  { id: "or3", text: "I want everything to be just right.", aspect: "orderliness", reverse: false },
  // Enthusiasm
  { id: "en1", text: "I make friends easily.", aspect: "enthusiasm", reverse: false },
  { id: "en2", text: "I keep to myself.", aspect: "enthusiasm", reverse: true },
  { id: "en3", text: "I am full of warmth.", aspect: "enthusiasm", reverse: false },
  // Assertiveness
  { id: "as1", text: "I take charge.", aspect: "assertiveness", reverse: false },
  { id: "as2", text: "I wait for others to lead the way.", aspect: "assertiveness", reverse: true },
  { id: "as3", text: "I have a strong personality.", aspect: "assertiveness", reverse: false },
  // Openness proper
  { id: "op1", text: "I believe in the importance of art.", aspect: "opennessProper", reverse: false },
  { id: "op2", text: "I seldom get lost in thought.", aspect: "opennessProper", reverse: true },
  { id: "op3", text: "I enjoy wild flights of fantasy.", aspect: "opennessProper", reverse: false },
  // Intellect
  { id: "it1", text: "I like to solve complex problems.", aspect: "intellect", reverse: false },
  { id: "it2", text: "I avoid philosophical discussions.", aspect: "intellect", reverse: true },
  { id: "it3", text: "I can handle a lot of information.", aspect: "intellect", reverse: false },
];

export interface AspectResult {
  scores: Record<Aspect, number>; // 0-100 normalized
  factorScores: Record<string, number>; // averaged within factor
  highestAspects: Aspect[]; // top 3
  lowestAspects: Aspect[]; // bottom 3
  splitAspects: Array<{ factor: string; high: Aspect; low: Aspect; gap: number }>; // factors with big within-split
  completedAt: string;
}

export function scoreAspects(answers: Record<string, number>): AspectResult {
  const byAspect: Record<Aspect, number[]> = {
    volatility: [], withdrawal: [], compassion: [], politeness: [],
    industriousness: [], orderliness: [], enthusiasm: [], assertiveness: [],
    opennessProper: [], intellect: [],
  };
  for (const item of ASPECT_ITEMS) {
    const raw = answers[item.id];
    if (typeof raw !== "number") continue;
    const adj = item.reverse ? 6 - raw : raw;
    byAspect[item.aspect].push(adj);
  }
  const scores = Object.fromEntries(
    Object.entries(byAspect).map(([k, arr]) => {
      if (!arr.length) return [k, 50];
      const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
      return [k, Math.round(((mean - 1) / 4) * 100)];
    })
  ) as Record<Aspect, number>;

  const factorGroups: Record<string, Aspect[]> = {
    Neuroticism: ["volatility", "withdrawal"],
    Agreeableness: ["compassion", "politeness"],
    Conscientiousness: ["industriousness", "orderliness"],
    Extraversion: ["enthusiasm", "assertiveness"],
    Openness: ["opennessProper", "intellect"],
  };
  const factorScores: Record<string, number> = {};
  const splitAspects: Array<{ factor: string; high: Aspect; low: Aspect; gap: number }> = [];
  for (const [factor, [a, b]] of Object.entries(factorGroups)) {
    factorScores[factor] = Math.round((scores[a] + scores[b]) / 2);
    const gap = Math.abs(scores[a] - scores[b]);
    if (gap >= 25) {
      splitAspects.push({
        factor,
        high: scores[a] >= scores[b] ? a : b,
        low: scores[a] < scores[b] ? a : b,
        gap,
      });
    }
  }

  const sorted = (Object.entries(scores) as [Aspect, number][])
    .sort(([, a], [, b]) => b - a);
  const highestAspects = sorted.slice(0, 3).map(([k]) => k);
  const lowestAspects = sorted.slice(-3).map(([k]) => k).reverse();

  return {
    scores,
    factorScores,
    highestAspects,
    lowestAspects,
    splitAspects,
    completedAt: new Date().toISOString(),
  };
}
