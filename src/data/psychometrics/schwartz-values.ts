// Schwartz Basic Human Values (short PVQ-style)
//
// Based on Schwartz (1992, 2012) Theory of Basic Human Values and the
// refined 19-value model from Schwartz et al. (2012). This implementation
// uses a shortened 10-value version optimized for in-app brevity.
//
// Circular structure: adjacent values are compatible; opposing values
// (e.g., Self-Direction ↔ Conformity) create tension. The 10 values
// cluster into 4 higher-order dimensions:
//   - Openness to Change: Self-Direction, Stimulation, Hedonism
//   - Self-Enhancement:   Achievement, Power
//   - Conservation:       Security, Conformity, Tradition
//   - Self-Transcendence: Universalism, Benevolence
//
// Items adapted from the PVQ (Portrait Values Questionnaire). Each item
// describes a person; respondent rates "how much is this person like me?"
// from 1 (not at all) to 6 (very much).
//
// References:
//   Schwartz, S. H. (1992). Universals in the content and structure of values.
//   Schwartz et al. (2012). Refining the theory of basic individual values.

export type SchwartzValue =
  | "selfDirection"
  | "stimulation"
  | "hedonism"
  | "achievement"
  | "power"
  | "security"
  | "conformity"
  | "tradition"
  | "benevolence"
  | "universalism";

export interface SchwartzValueDef {
  key: SchwartzValue;
  name: string;
  higherOrder:
    | "Openness to Change"
    | "Self-Enhancement"
    | "Conservation"
    | "Self-Transcendence";
  definition: string;
  shadow: string; // what this value looks like when over-expressed
}

export const SCHWARTZ_VALUES: SchwartzValueDef[] = [
  {
    key: "selfDirection",
    name: "Self-Direction",
    higherOrder: "Openness to Change",
    definition: "Independent thought, creativity, freedom, choosing your own goals.",
    shadow: "Over-individualism, refusing structure that would help.",
  },
  {
    key: "stimulation",
    name: "Stimulation",
    higherOrder: "Openness to Change",
    definition: "Excitement, novelty, challenge, a varied life.",
    shadow: "Restlessness, inability to sit with ordinary moments.",
  },
  {
    key: "hedonism",
    name: "Hedonism",
    higherOrder: "Openness to Change",
    definition: "Pleasure, sensory gratification, enjoying life.",
    shadow: "Avoidance of effort or meaning beyond pleasure.",
  },
  {
    key: "achievement",
    name: "Achievement",
    higherOrder: "Self-Enhancement",
    definition: "Personal success, demonstrating competence by social standards.",
    shadow: "Worth becoming contingent on performance.",
  },
  {
    key: "power",
    name: "Power",
    higherOrder: "Self-Enhancement",
    definition: "Social status, prestige, control or dominance over people and resources.",
    shadow: "Relationships become instruments.",
  },
  {
    key: "security",
    name: "Security",
    higherOrder: "Conservation",
    definition: "Safety, harmony, stability of society and self.",
    shadow: "Chronic vigilance at the cost of living.",
  },
  {
    key: "conformity",
    name: "Conformity",
    higherOrder: "Conservation",
    definition: "Restraint of actions that might upset others or violate norms.",
    shadow: "Losing self to keep the peace.",
  },
  {
    key: "tradition",
    name: "Tradition",
    higherOrder: "Conservation",
    definition: "Respect and commitment to customs and ideas inherited from your culture.",
    shadow: "Rigidity that blocks growth when traditions no longer serve.",
  },
  {
    key: "benevolence",
    name: "Benevolence",
    higherOrder: "Self-Transcendence",
    definition: "Preserving and enhancing the welfare of those you're close to.",
    shadow: "Self-sacrifice that becomes invisible resentment.",
  },
  {
    key: "universalism",
    name: "Universalism",
    higherOrder: "Self-Transcendence",
    definition: "Understanding, appreciation, and protection of all people and nature.",
    shadow: "Abstract care for humanity while neglecting specific people.",
  },
];

export interface SchwartzItem {
  id: string;
  text: string;
  value: SchwartzValue;
  reverse?: boolean;
}

// 20 items (2 per value). Each item is a portrait statement.
// Response scale: 1 (not like me at all) - 6 (very much like me).
export const SCHWARTZ_ITEMS: SchwartzItem[] = [
  { id: "sd1", text: "Thinking up new ideas and being creative is important to her. She likes to do things in her own original way.", value: "selfDirection" },
  { id: "sd2", text: "It is important to him to make his own decisions about what he does. He likes to be free to plan and to choose his activities for himself.", value: "selfDirection" },

  { id: "st1", text: "She thinks it is important to do lots of different things in life. She always looks for new things to try.", value: "stimulation" },
  { id: "st2", text: "He likes to take risks. He is always looking for adventures.", value: "stimulation" },

  { id: "he1", text: "Having a good time is important to her. She likes to spoil herself.", value: "hedonism" },
  { id: "he2", text: "He seeks every chance he can to have fun. It is important to him to do things that give him pleasure.", value: "hedonism" },

  { id: "ac1", text: "It is important to her to show her abilities. She wants people to admire what she does.", value: "achievement" },
  { id: "ac2", text: "Being very successful is important to him. He likes to impress other people.", value: "achievement" },

  { id: "po1", text: "It is important to her to be in charge and tell others what to do. She wants people to do what she says.", value: "power" },
  { id: "po2", text: "He always wants to be the one who makes the decisions. He likes to be the leader.", value: "power" },

  { id: "se1", text: "It is important to her to live in secure surroundings. She avoids anything that might endanger her safety.", value: "security" },
  { id: "se2", text: "It is important to him that things be organized and clean. He really does not like things to be a mess.", value: "security" },

  { id: "co1", text: "She believes that people should do what they are told. She thinks people should follow rules at all times, even when no one is watching.", value: "conformity" },
  { id: "co2", text: "It is important to him always to behave properly. He wants to avoid doing anything people would say is wrong.", value: "conformity" },

  { id: "tr1", text: "It is important to her to be humble and modest. She tries not to draw attention to herself.", value: "tradition" },
  { id: "tr2", text: "Tradition is important to him. He tries to follow the customs handed down by his religion or his family.", value: "tradition" },

  { id: "be1", text: "It's very important to her to help the people around her. She wants to care for their well-being.", value: "benevolence" },
  { id: "be2", text: "It is important to him to be loyal to his friends. He wants to devote himself to people close to him.", value: "benevolence" },

  { id: "un1", text: "She strongly believes that people should care for nature. Looking after the environment is important to her.", value: "universalism" },
  { id: "un2", text: "He thinks it is important that every person in the world be treated equally. He believes everyone should have equal opportunities in life.", value: "universalism" },
];

export interface SchwartzResult {
  scores: Record<SchwartzValue, number>; // 1-6 centered, then mean-centered
  topValues: SchwartzValue[]; // top 3
  bottomValues: SchwartzValue[]; // bottom 3
  higherOrderScores: Record<string, number>;
  completedAt: string;
}

// MRAT-correct: subtract each respondent's mean from their scores so values
// represent RELATIVE importance, not just acquiescence. Schwartz recommends
// this correction.
export function scoreSchwartz(answers: Record<string, number>): SchwartzResult {
  const grouped: Record<SchwartzValue, number[]> = {
    selfDirection: [], stimulation: [], hedonism: [], achievement: [], power: [],
    security: [], conformity: [], tradition: [], benevolence: [], universalism: [],
  };
  for (const item of SCHWARTZ_ITEMS) {
    const raw = answers[item.id];
    if (typeof raw === "number") grouped[item.value].push(raw);
  }
  const means = Object.fromEntries(
    Object.entries(grouped).map(([k, arr]) => [
      k,
      arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 3.5,
    ])
  ) as Record<SchwartzValue, number>;

  // Person mean for ipsative centering
  const allAnswered = Object.values(answers).filter(v => typeof v === "number");
  const personMean = allAnswered.length
    ? allAnswered.reduce((a, b) => a + b, 0) / allAnswered.length
    : 3.5;

  const centered = Object.fromEntries(
    Object.entries(means).map(([k, m]) => [k, m - personMean])
  ) as Record<SchwartzValue, number>;

  const sorted = (Object.entries(centered) as [SchwartzValue, number][])
    .sort(([, a], [, b]) => b - a);
  const topValues = sorted.slice(0, 3).map(([k]) => k);
  const bottomValues = sorted.slice(-3).map(([k]) => k).reverse();

  const higherOrderScores: Record<string, number> = {
    "Openness to Change": 0,
    "Self-Enhancement": 0,
    Conservation: 0,
    "Self-Transcendence": 0,
  };
  const higherCounts: Record<string, number> = {
    "Openness to Change": 0,
    "Self-Enhancement": 0,
    Conservation: 0,
    "Self-Transcendence": 0,
  };
  for (const def of SCHWARTZ_VALUES) {
    higherOrderScores[def.higherOrder] += centered[def.key];
    higherCounts[def.higherOrder] += 1;
  }
  for (const k of Object.keys(higherOrderScores)) {
    higherOrderScores[k] = higherOrderScores[k] / Math.max(higherCounts[k], 1);
  }

  return {
    scores: means,
    topValues,
    bottomValues,
    higherOrderScores,
    completedAt: new Date().toISOString(),
  };
}
