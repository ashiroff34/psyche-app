// Cross-map: Enneagram type → expected Big Five facet patterns
// Grounded in research (McCrae & Costa, Furnham correlations with Enneagram)

export interface EnneagramBigFiveProfile {
  highFacets: string[];
  lowFacets: string[];
  interpretation: string;
}

export const bigFiveCrossMap: Record<number, EnneagramBigFiveProfile> = {
  1: {
    highFacets: ["Competence", "Order", "Dutifulness", "Achievement Striving", "Self-Discipline", "Deliberation", "Angry Hostility"],
    lowFacets: ["Values", "Impulsiveness"],
    interpretation:
      "Type 1s typically show the highest Conscientiousness of all types, with particular strength in Dutifulness, Order, and Deliberation. reflecting their drive for correctness and adherence to principles. Their Angry Hostility score is often elevated, capturing the suppressed resentment that underlies their rigid self-control. They tend to score low on Values (Openness facet), preferring clear moral standards over relativism.",
  },
  2: {
    highFacets: ["Altruism", "Tender-Mindedness", "Warmth", "Trust", "Compliance"],
    lowFacets: ["Straightforwardness", "Assertiveness"],
    interpretation:
      "Type 2s show strong Agreeableness. especially Altruism, Tender-Mindedness, and Warmth. reflecting their orientation toward helping and connecting with others. Their Straightforwardness score is often lower, as Twos can be indirect about their own needs. They score high on Extraversion facets like Warmth but may be lower on Assertiveness, reflecting their self-effacing relational style.",
  },
  3: {
    highFacets: ["Achievement Striving", "Competence", "Assertiveness", "Activity", "Positive Emotions"],
    lowFacets: ["Anxiety", "Depression", "Vulnerability", "Self-Consciousness"],
    interpretation:
      "Type 3s are characterized by high Achievement Striving and Competence (Conscientiousness facets) alongside strong Extraversion. particularly Assertiveness and Positive Emotions. They typically score low on Neuroticism, especially Anxiety and Self-Consciousness, as they project a confident, capable image. Their profile reflects a driven, image-conscious orientation toward success and social approval.",
  },
  4: {
    highFacets: ["Feelings", "Aesthetics", "Fantasy", "Depression", "Self-Consciousness", "Anxiety"],
    lowFacets: ["Gregariousness", "Assertiveness", "Activity", "Compliance"],
    interpretation:
      "Type 4s show the highest Openness to Experience on emotional and aesthetic facets. Feelings, Aesthetics, and Fantasy. alongside elevated Neuroticism on Depression and Self-Consciousness. This captures their rich inner life, aesthetic sensitivity, and tendency toward melancholy and self-scrutiny. Low Extraversion (especially Gregariousness) reflects their introverted, individualistic orientation.",
  },
  5: {
    highFacets: ["Ideas", "Fantasy", "Values", "Deliberation"],
    lowFacets: ["Warmth", "Gregariousness", "Assertiveness", "Altruism", "Tender-Mindedness"],
    interpretation:
      "Type 5s score highest on Openness facets related to intellectual exploration. Ideas and Fantasy. alongside high Deliberation. They tend to score low on Agreeableness (Altruism, Tender-Mindedness) and Extraversion (Warmth, Gregariousness), reflecting their emotionally reserved, intellectually independent style. Their profile shows a withdrawn, analytical character who prioritizes knowledge over connection.",
  },
  6: {
    highFacets: ["Anxiety", "Vulnerability", "Dutifulness", "Self-Consciousness"],
    lowFacets: ["Actions", "Excitement Seeking", "Trust"],
    interpretation:
      "Type 6s show the highest Neuroticism. particularly on Anxiety and Vulnerability. reflecting their core pattern of anticipating threat and seeking reassurance. High Dutifulness captures their loyalty to rules, authorities, and group norms. Low Trust is characteristic: Sixes are inherently suspicious of motives. They score low on Openness/Actions and Excitement Seeking, preferring the familiar and predictable.",
  },
  7: {
    highFacets: ["Excitement Seeking", "Actions", "Ideas", "Activity", "Positive Emotions", "Gregariousness"],
    lowFacets: ["Self-Discipline", "Deliberation", "Dutifulness"],
    interpretation:
      "Type 7s show the highest Extraversion of all types. particularly Excitement Seeking, Activity, and Positive Emotions. alongside high Openness on Actions and Ideas. This reflects their enthusiasm, expansiveness, and restless curiosity. Their Conscientiousness is typically low on Self-Discipline and Deliberation, capturing their avoidance of constraint and tendency toward impulsive, variety-seeking behavior.",
  },
  8: {
    highFacets: ["Assertiveness", "Activity", "Angry Hostility", "Excitement Seeking"],
    lowFacets: ["Compliance", "Modesty", "Anxiety", "Vulnerability", "Self-Consciousness"],
    interpretation:
      "Type 8s show very high Assertiveness and Activity (Extraversion) alongside low Agreeableness. particularly Compliance and Modesty. reflecting their dominant, confrontational style. Their Neuroticism profile is unusual: low Anxiety and Vulnerability (they don't fear much), but elevated Angry Hostility. This captures their powerful, direct energy and comfort with conflict and confrontation.",
  },
  9: {
    highFacets: ["Compliance", "Modesty", "Trust", "Altruism"],
    lowFacets: ["Assertiveness", "Activity", "Achievement Striving", "Self-Discipline", "Angry Hostility"],
    interpretation:
      "Type 9s show high Agreeableness. especially Compliance, Modesty, and Trust. reflecting their accommodating, conflict-averse nature. They typically score low on Assertiveness and Activity (Extraversion), and low on Achievement Striving and Self-Discipline (Conscientiousness), capturing their tendency toward inertia and going along. Low Angry Hostility reflects their suppressed anger and characteristic peacefulness.",
  },
};
