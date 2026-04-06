export interface FacetDescription {
  name: string;
  factor: "O" | "C" | "E" | "A" | "N";
  /** Canonical key matching big-five.ts facet strings (lowercased) */
  key: string;
  high: string;
  low: string;
}

export const bigFiveFacets: FacetDescription[] = [
  // OPENNESS
  {
    name: "Fantasy",
    factor: "O",
    key: "fantasy",
    high: "Rich inner world; enjoys daydreaming and imaginative thought.",
    low: "Stays grounded in the concrete; rarely engages in fantasy or daydreaming.",
  },
  {
    name: "Aesthetics",
    factor: "O",
    key: "aesthetics",
    high: "Deeply moved by art, music, and beauty; notices subtlety others miss.",
    low: "Indifferent to artistic experiences; focuses on practical over aesthetic.",
  },
  {
    name: "Feelings",
    factor: "O",
    key: "feelings",
    high: "Emotionally self-aware; values and attends closely to inner feelings.",
    low: "Less attuned to emotional nuance; doesn't prioritize inner emotional processing.",
  },
  {
    name: "Actions",
    factor: "O",
    key: "actions",
    high: "Seeks novelty and variety; willing to try unfamiliar activities.",
    low: "Prefers routine and familiarity; sticks to what is known and proven.",
  },
  {
    name: "Ideas",
    factor: "O",
    key: "ideas",
    high: "Intellectually curious; loves abstract concepts and theoretical exploration.",
    low: "Practical and concrete; prefers applied knowledge over theory.",
  },
  {
    name: "Values",
    factor: "O",
    key: "values",
    high: "Open to questioning established norms and re-examining personal beliefs.",
    low: "Respects tradition; prefers clear, conventional standards of right and wrong.",
  },

  // CONSCIENTIOUSNESS
  {
    name: "Competence",
    factor: "C",
    key: "competence",
    high: "Feels capable and effective; confident in ability to handle challenges.",
    low: "May doubt own abilities; tends to feel unprepared or inadequate.",
  },
  {
    name: "Order",
    factor: "C",
    key: "order",
    high: "Organized and methodical; keeps spaces and systems neat and structured.",
    low: "Comfortable with disorder; doesn't feel the need to organize or tidy.",
  },
  {
    name: "Dutifulness",
    factor: "C",
    key: "dutifulness",
    high: "Reliable and principled; follows through on commitments and obligations.",
    low: "Flexible about rules and duties; may bend expectations when convenient.",
  },
  {
    name: "Achievement Striving",
    factor: "C",
    key: "achievement-striving",
    high: "Driven and ambitious; sets high goals and works hard to achieve them.",
    low: "Content without striving; not strongly motivated by achievement or success.",
  },
  {
    name: "Self-Discipline",
    factor: "C",
    key: "self-discipline",
    high: "Persistent and focused; stays on task even when it becomes difficult.",
    low: "Easily distracted; struggles with follow-through on long-term tasks.",
  },
  {
    name: "Deliberation",
    factor: "C",
    key: "deliberation",
    high: "Thoughtful and careful; weighs options thoroughly before deciding.",
    low: "Acts quickly on impulse; doesn't spend much time considering consequences.",
  },

  // EXTRAVERSION
  {
    name: "Warmth",
    factor: "E",
    key: "warmth",
    high: "Friendly, warm, and affectionate; connects easily with others.",
    low: "Reserved and more formal; doesn't readily express warmth toward others.",
  },
  {
    name: "Gregariousness",
    factor: "E",
    key: "gregariousness",
    high: "Thrives in social situations; loves groups, parties, and gatherings.",
    low: "Prefers solitude or small groups; finds large social settings draining.",
  },
  {
    name: "Assertiveness",
    factor: "E",
    key: "assertiveness",
    high: "Takes charge; speaks up, leads, and expresses opinions directly.",
    low: "Tends to defer; holds back in groups and lets others take the lead.",
  },
  {
    name: "Activity",
    factor: "E",
    key: "activity",
    high: "High-energy and fast-paced; always on the move and busy.",
    low: "Slow and leisurely paced; prefers calm, unhurried ways of living.",
  },
  {
    name: "Excitement Seeking",
    factor: "E",
    key: "excitement-seeking",
    high: "Craves stimulation, thrills, and risk-taking; easily bored without novelty.",
    low: "Prefers safe, predictable activities; does not seek out excitement.",
  },
  {
    name: "Positive Emotions",
    factor: "E",
    key: "positive emotions",
    high: "Experiences frequent joy, enthusiasm, and positive affect.",
    low: "More serious and restrained; doesn't experience strong positive emotions regularly.",
  },

  // AGREEABLENESS
  {
    name: "Trust",
    factor: "A",
    key: "trust",
    high: "Assumes good intentions in others; gives people the benefit of the doubt.",
    low: "Skeptical and guarded; tends to question others' motives.",
  },
  {
    name: "Straightforwardness",
    factor: "A",
    key: "straightforwardness",
    high: "Frank and direct; says what they mean without hidden agendas.",
    low: "More strategic in communication; may withhold information or shade the truth.",
  },
  {
    name: "Altruism",
    factor: "A",
    key: "altruism",
    high: "Generous and giving; goes out of their way to help others.",
    low: "Self-focused; prioritizes own needs and doesn't readily help others.",
  },
  {
    name: "Compliance",
    factor: "A",
    key: "compliance",
    high: "Conflict-averse and accommodating; yields to others to keep the peace.",
    low: "Competitive and assertive in disagreements; doesn't back down easily.",
  },
  {
    name: "Modesty",
    factor: "A",
    key: "modesty",
    high: "Humble and self-effacing; downplays achievements and avoids the spotlight.",
    low: "Confident in own superiority; comfortable with self-promotion.",
  },
  {
    name: "Tender-Mindedness",
    factor: "A",
    key: "tender-mindedness",
    high: "Empathetic and compassionate; moved by others' suffering.",
    low: "Tough-minded and logical; less influenced by emotional appeals.",
  },

  // NEUROTICISM
  {
    name: "Anxiety",
    factor: "N",
    key: "anxiety",
    high: "Prone to worry and tension; frequently anticipates negative outcomes.",
    low: "Calm and relaxed; rarely worries or feels tense about the future.",
  },
  {
    name: "Angry Hostility",
    factor: "N",
    key: "angry hostility",
    high: "Gets frustrated and irritated easily; has a short fuse.",
    low: "Slow to anger and hard to provoke; stays even-tempered under pressure.",
  },
  {
    name: "Depression",
    factor: "N",
    key: "depression",
    high: "Prone to sadness, guilt, and discouragement; dwells on negative experiences.",
    low: "Emotionally resilient; rarely feels sad or hopeless.",
  },
  {
    name: "Self-Consciousness",
    factor: "N",
    key: "self-consciousness",
    high: "Sensitive to social judgment; uncomfortable being the center of attention.",
    low: "Socially confident; not bothered by what others think.",
  },
  {
    name: "Impulsiveness",
    factor: "N",
    key: "impulsiveness",
    high: "Gives in easily to cravings and urges; struggles with self-control.",
    low: "Strong impulse control; resists temptation in favor of long-term goals.",
  },
  {
    name: "Vulnerability",
    factor: "N",
    key: "vulnerability",
    high: "Easily overwhelmed under stress; may panic or shut down in difficult situations.",
    low: "Handles pressure well; stays composed and clearheaded under stress.",
  },
];

export const facetsByFactor: Record<string, FacetDescription[]> = bigFiveFacets.reduce(
  (acc, facet) => {
    if (!acc[facet.factor]) acc[facet.factor] = [];
    acc[facet.factor].push(facet);
    return acc;
  },
  {} as Record<string, FacetDescription[]>
);
