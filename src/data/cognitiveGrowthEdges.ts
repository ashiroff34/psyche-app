// Cognitive Growth Edges — Inferior Function Development
//
// Each MBTI type's deepest growth edge is its inferior function: the least
// developed function in the personality stack. In stress or growth, the
// inferior function emerges, often clumsily, as the main vector of
// psychological individuation (Jung's term for becoming more whole).
//
// Sources:
//   Carl Jung, "Psychological Types" (1921) — foundational function theory
//   Marie-Louise von Franz & James Hillman, "Lectures on Jung's Typology"
//     (1971) — primary academic treatment of the inferior function as the
//     gateway to wholeness; the "inferior function" framing here draws
//     directly from von Franz's second lecture
//   Isabel Briggs Myers, "Gifts Differing" (1980) — applied MBTI stack theory
//   John Beebe, "Energies and Patterns in Psychological Type" (2017) — modern
//     synthesis of the eight-function model; confirms inferior as growth axis
//
// Dominant/inferior pairings confirmed against standard MBTI function stacks.
// Growth edge descriptions are practical re-expressions of clinical theory,
// not clinical advice.

export interface CognitiveGrowthEdge {
  dominantFunction: string;
  inferiorFunction: string;
  growthEdge: string;        // 1-2 sentence daily growth edge
  dailyPractice: string;     // specific thing to try today
}

export const cognitiveGrowthEdges: Record<string, CognitiveGrowthEdge> = {
  INTJ: {
    dominantFunction: "Ni · Introverted Intuition",
    inferiorFunction: "Se",
    growthEdge: "Your inferior Se means you're most cut off from embodied presence. physical sensation, the immediate moment, sensory reality. Growth lives in your body, not your mind.",
    dailyPractice: "Spend 5 minutes doing something purely sensory: eat slowly and notice texture, take a deliberate walk without a mental agenda, or sit outside without checking your phone.",
  },
  INFJ: {
    dominantFunction: "Ni · Introverted Intuition",
    inferiorFunction: "Se",
    growthEdge: "Your inferior Se means the biggest growth edge is landing in the present moment. sensory, embodied, immediate. rather than in your rich inner vision of what is and what could be.",
    dailyPractice: "Before responding to the first difficult situation today, pause and notice what your body is actually feeling. tension, openness, weight. Let that inform your response.",
  },
  ENTJ: {
    dominantFunction: "Te · Extraverted Thinking",
    inferiorFunction: "Fi",
    growthEdge: "Your inferior Fi means authentic emotional connection and personal values are your biggest growth edge. You're fluent in external logic; the deeper challenge is internal truth.",
    dailyPractice: "Ask yourself one honest question today: 'Is what I'm working toward something I actually value, or something that's simply effective?' Sit with the answer before acting.",
  },
  ENFJ: {
    dominantFunction: "Fe · Extraverted Feeling",
    inferiorFunction: "Ti",
    growthEdge: "Your inferior Ti means independent logical analysis. reaching your own conclusions without reference to the emotional field. is where significant growth lives.",
    dailyPractice: "On one issue today, deliberately set aside what others think or feel about it and reason through it yourself from first principles. Trust your own logic.",
  },
  INTP: {
    dominantFunction: "Ti · Introverted Thinking",
    inferiorFunction: "Fe",
    growthEdge: "Your inferior Fe means emotional connection, warmth, and genuine consideration of how others are feeling represent your deepest growth opportunity.",
    dailyPractice: "In one interaction today, ask someone how they're doing and actually listen. not to analyze, not to fix, but to understand. Stay present with their emotional reality for a full minute.",
  },
  INFP: {
    dominantFunction: "Fi · Introverted Feeling",
    inferiorFunction: "Te",
    growthEdge: "Your inferior Te means external organization, objective criteria, and following through on commitments are where the most friction. and the most growth. live.",
    dailyPractice: "Pick one thing you've been meaning to do and do just the first concrete step today. Don't wait for the right feeling. Do it as an act of self-respect, separate from how it feels.",
  },
  ENTP: {
    dominantFunction: "Ne · Extraverted Intuition",
    inferiorFunction: "Si",
    growthEdge: "Your inferior Si means honoring established commitments, building on what's been learned before, and staying with one thing long enough for it to matter are your growth edges.",
    dailyPractice: "Choose one thing you've already started. a project, a relationship, a practice. and spend 20 minutes deepening it rather than starting something new.",
  },
  ENFP: {
    dominantFunction: "Ne · Extraverted Intuition",
    inferiorFunction: "Si",
    growthEdge: "Your inferior Si means consistency, honoring past commitments, and returning to what's already been established (rather than always seeking the new) represent your growth edge.",
    dailyPractice: "Do one thing today that you've already committed to doing. something that doesn't excite you right now but matters to someone or something you care about. Notice the satisfaction in following through.",
  },
  ISTJ: {
    dominantFunction: "Si · Introverted Sensing",
    inferiorFunction: "Ne",
    growthEdge: "Your inferior Ne means openness to new possibilities, imaginative thinking, and genuine curiosity about what could be different are where growth lives for you.",
    dailyPractice: "Ask 'What else could be true here?' about one situation today. Genuinely entertain at least two alternative explanations before landing on your usual interpretation.",
  },
  ISFJ: {
    dominantFunction: "Si · Introverted Sensing",
    inferiorFunction: "Ne",
    growthEdge: "Your inferior Ne means flexible thinking, openness to disruption of familiar patterns, and imagination about new possibilities are your deepest growth edge.",
    dailyPractice: "Do one small thing differently today. take a different route, try a different approach to a familiar task, or ask 'what if we tried it this way instead?' Notice the discomfort and stay with it.",
  },
  ESTJ: {
    dominantFunction: "Te · Extraverted Thinking",
    inferiorFunction: "Fi",
    growthEdge: "Your inferior Fi means authentic emotional connection, personal values beneath the efficient surface, and genuine vulnerability represent where the most meaningful growth lives.",
    dailyPractice: "Ask yourself: 'What do I actually value about this situation, separate from what's efficient or correct?' Let that personal answer have weight before you act today.",
  },
  ESFJ: {
    dominantFunction: "Fe · Extraverted Feeling",
    inferiorFunction: "Ti",
    growthEdge: "Your inferior Ti means independent critical analysis. reaching conclusions through your own logic rather than through the emotional field of the group. is where growth lives.",
    dailyPractice: "On one decision today, write down your actual logical reasoning (not how others feel about it) before asking for input. Trust that your own analysis has value.",
  },
  ISTP: {
    dominantFunction: "Ti · Introverted Thinking",
    inferiorFunction: "Fe",
    growthEdge: "Your inferior Fe means emotional connection, empathy, and caring about how others experience you represent your deepest growth edge. Logic alone doesn't build relationships.",
    dailyPractice: "In one interaction today, ask someone about their experience of a shared situation rather than your analysis of it. Listen without immediately offering a solution.",
  },
  ISFP: {
    dominantFunction: "Fi · Introverted Feeling",
    inferiorFunction: "Te",
    growthEdge: "Your inferior Te means external structure, objective criteria, and disciplined follow-through are where significant growth lives. Values need vehicles to become real.",
    dailyPractice: "Identify one thing that matters to you and make one concrete, measurable commitment to it today. not 'I'll try to do better' but 'I will do X by Y.'",
  },
  ESTP: {
    dominantFunction: "Se · Extraverted Sensing",
    inferiorFunction: "Ni",
    growthEdge: "Your inferior Ni means sitting with long-term meaning, depth over stimulation, and following a single vision over time represent your biggest growth opportunity.",
    dailyPractice: "Spend 10 minutes with a question that has no immediate answer: 'Where do I want to be in five years, and why does that actually matter to me?' Stay with it without rushing to a solution.",
  },
  ESFP: {
    dominantFunction: "Se · Extraverted Sensing",
    inferiorFunction: "Ni",
    growthEdge: "Your inferior Ni means depth, long-range vision, and sitting with meaning beneath the surface of experience are where the most profound growth lives for you.",
    dailyPractice: "Reflect on one pattern you've noticed about yourself. something that keeps recurring. Don't rush past it. Ask: 'What does this pattern reveal about what I actually want or fear?'",
  },
};
