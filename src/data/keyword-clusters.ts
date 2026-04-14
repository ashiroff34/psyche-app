// ─────────────────────────────────────────────────────────────────────────────
// Keyword Cluster Scoring
// Sources: Riso & Hudson "Wisdom of the Enneagram", Claudio Naranjo,
//          Carl Jung "Psychological Types" (1921), Isabel Briggs Myers
// ─────────────────────────────────────────────────────────────────────────────

export interface Cluster {
  terms: string[];
  weight: number; // 1.0 = normal, 1.5 = strong signal, 2.0 = core term
}

export interface TypeCluster {
  typeId: number;
  coreFear: Cluster;
  coreDesire: Cluster;
  keyBehaviors: Cluster;
  growthTerms: Cluster;
  stressTerms: Cluster;
  commonMistypes: number[];
}

// ── Type Clusters ─────────────────────────────────────────────────────────────

export const TYPE_CLUSTERS: TypeCluster[] = [
  // Type 1 — The Reformer / Perfectionist
  {
    typeId: 1,
    coreFear: {
      terms: ["wrong", "bad", "corrupt", "imperfect", "evil", "flawed", "mistake", "error", "failure", "condemned"],
      weight: 2.0,
    },
    coreDesire: {
      terms: ["right", "good", "integrity", "ethical", "correct", "virtuous", "moral", "just", "principled", "fair"],
      weight: 2.0,
    },
    keyBehaviors: {
      terms: [
        "perfectionism", "reform", "correction", "standards", "improvement", "criticism",
        "discipline", "rules", "orderly", "precise", "detail", "quality", "judgment",
        "resentment", "critic", "conscientious", "responsible", "compare", "ideal",
        "should", "ought", "must", "proper", "control", "inner critic",
      ],
      weight: 1.5,
    },
    growthTerms: {
      terms: [
        "acceptance", "serenity", "release", "imperfection", "compassion", "forgiveness",
        "playful", "spontaneous", "trust", "wholeness", "integrate", "relax",
      ],
      weight: 1.0,
    },
    stressTerms: {
      terms: [
        "mood", "irrational", "dramatic", "withdrawn", "indulgent", "melancholic",
        "erratic", "self-pity", "bitter", "cynical",
      ],
      weight: 1.0,
    },
    commonMistypes: [6, 3, 5],
  },

  // Type 2 — The Helper / Giver
  {
    typeId: 2,
    coreFear: {
      terms: ["unloved", "unwanted", "unworthy", "rejected", "abandoned", "needy", "alone", "unneeded"],
      weight: 2.0,
    },
    coreDesire: {
      terms: ["loved", "needed", "wanted", "cherished", "appreciated", "cared for", "belong", "adored"],
      weight: 2.0,
    },
    keyBehaviors: {
      terms: [
        "helping", "giving", "nurture", "support", "care", "serve", "please",
        "pride", "manipulation", "flattery", "possessive", "warm", "empathy",
        "relationship", "generous", "selfless", "self-sacrifice", "attention",
        "love", "affection", "people-pleasing", "indirect", "martyr",
      ],
      weight: 1.5,
    },
    growthTerms: {
      terms: [
        "self-care", "boundaries", "authentic needs", "humility", "receive",
        "independence", "own desires", "vulnerable", "direct", "self-worth",
      ],
      weight: 1.0,
    },
    stressTerms: {
      terms: [
        "aggressive", "domineering", "controlling", "victim", "resentful",
        "demanding", "entitled", "complaining",
      ],
      weight: 1.0,
    },
    commonMistypes: [4, 9, 7],
  },

  // Type 3 — The Achiever / Performer
  {
    typeId: 3,
    coreFear: {
      terms: ["failure", "worthless", "unsuccessful", "rejected", "insignificant", "mediocre", "loser", "incompetent"],
      weight: 2.0,
    },
    coreDesire: {
      terms: ["success", "valuable", "admired", "accomplished", "outstanding", "winning", "recognition", "achievement"],
      weight: 2.0,
    },
    keyBehaviors: {
      terms: [
        "perform", "achieve", "image", "status", "efficiency", "productive",
        "goals", "compete", "ambitious", "chameleon", "adapt", "role",
        "deceive", "mask", "career", "prestige", "driven", "workaholic",
        "self-promotion", "appear", "persona", "success-oriented",
      ],
      weight: 1.5,
    },
    growthTerms: {
      terms: [
        "authentic", "feelings", "vulnerable", "inner life", "slow down",
        "value", "being", "genuine", "heart", "honest",
      ],
      weight: 1.0,
    },
    stressTerms: {
      terms: [
        "distrustful", "paranoid", "anxious", "erratic", "detached",
        "over-analytical", "split",
      ],
      weight: 1.0,
    },
    commonMistypes: [1, 7, 8],
  },

  // Type 4 — The Individualist / Romantic
  {
    typeId: 4,
    coreFear: {
      terms: ["ordinary", "plain", "insignificant", "defective", "abandoned", "no identity", "bland", "generic"],
      weight: 2.0,
    },
    coreDesire: {
      terms: ["authentic", "unique", "special", "significant", "myself", "identity", "original", "genuine"],
      weight: 2.0,
    },
    keyBehaviors: {
      terms: [
        "melancholy", "longing", "envy", "aesthetic", "depth", "different",
        "missing", "withdrawn", "creative", "feelings", "intense", "dramatic",
        "romantic", "idealize", "devalue", "self-absorbed", "moody", "introspective",
        "artistic", "tragic", "beauty", "loss", "nostalgia", "yearning",
      ],
      weight: 1.5,
    },
    growthTerms: {
      terms: [
        "equanimity", "groundedness", "present", "action", "discipline",
        "practical", "objective", "commonality", "gratitude",
      ],
      weight: 1.0,
    },
    stressTerms: {
      terms: [
        "overwork", "perfectionism", "harsh", "critical", "judgmental",
        "compulsive", "rigid",
      ],
      weight: 1.0,
    },
    commonMistypes: [9, 2, 5],
  },

  // Type 5 — The Investigator / Observer
  {
    typeId: 5,
    coreFear: {
      terms: ["incompetent", "helpless", "useless", "ignorant", "depleted", "overwhelmed", "invaded", "dependent"],
      weight: 2.0,
    },
    coreDesire: {
      terms: ["competent", "knowledgeable", "capable", "understand", "mastery", "expert", "self-sufficient", "privacy"],
      weight: 2.0,
    },
    keyBehaviors: {
      terms: [
        "withdraw", "observe", "analyze", "detach", "hoard", "accumulate",
        "minimize", "isolated", "intellectual", "research", "data", "privacy",
        "boundaries", "emotion-avoidant", "cerebral", "reclusive", "compartment",
        "conserve", "energy", "thinking", "theory", "speculate",
      ],
      weight: 1.5,
    },
    growthTerms: {
      terms: [
        "engage", "share", "embody", "feelings", "connect", "nonattachment",
        "generosity", "participate", "action", "trust",
      ],
      weight: 1.0,
    },
    stressTerms: {
      terms: [
        "scattered", "impulsive", "hyperactive", "reckless", "distracted",
        "scattered energy",
      ],
      weight: 1.0,
    },
    commonMistypes: [1, 4, 9],
  },

  // Type 6 — The Loyalist / Questioner
  {
    typeId: 6,
    coreFear: {
      terms: ["danger", "unsafe", "no support", "abandoned", "alone", "betrayed", "uncertain", "vulnerable", "threat"],
      weight: 2.0,
    },
    coreDesire: {
      terms: ["security", "support", "certainty", "safe", "trust", "loyal", "guidance", "belonging", "reassurance"],
      weight: 2.0,
    },
    keyBehaviors: {
      terms: [
        "anxiety", "doubt", "question", "fear", "suspicious", "worst-case",
        "loyal", "duty", "authority", "rebellious", "counterphobic", "phobic",
        "test", "vigilant", "paranoid", "procrastinate", "indecision",
        "alliance", "group", "commitment", "prepare", "danger-sensing",
      ],
      weight: 1.5,
    },
    growthTerms: {
      terms: [
        "courage", "faith", "inner authority", "calm", "trust self",
        "equanimity", "groundedness", "security from within",
      ],
      weight: 1.0,
    },
    stressTerms: {
      terms: [
        "scattered", "impulsive", "overindulgent", "frantic", "escapist",
        "manic",
      ],
      weight: 1.0,
    },
    commonMistypes: [1, 4, 9],
  },

  // Type 7 — The Enthusiast / Epicure
  {
    typeId: 7,
    coreFear: {
      terms: ["pain", "deprivation", "trapped", "bored", "limited", "missing out", "suffering", "loss", "stuck"],
      weight: 2.0,
    },
    coreDesire: {
      terms: ["happy", "satisfied", "free", "stimulated", "options", "joy", "pleasure", "experience", "adventure"],
      weight: 2.0,
    },
    keyBehaviors: {
      terms: [
        "enthusiasm", "optimism", "planning", "ideas", "scattered", "gluttony",
        "avoid", "escape", "reframe", "positive", "spontaneous", "curiosity",
        "multi-tasking", "fomo", "indulgent", "future-focused", "synthesize",
        "restless", "fun", "excitement", "variety",
      ],
      weight: 1.5,
    },
    growthTerms: {
      terms: [
        "sobriety", "present", "depth", "commitment", "embrace pain",
        "gratitude", "stillness", "completeness", "focus",
      ],
      weight: 1.0,
    },
    stressTerms: {
      terms: [
        "perfectionistic", "self-critical", "harsh", "rigid", "overly critical",
        "anxious perfectionist",
      ],
      weight: 1.0,
    },
    commonMistypes: [3, 4, 2],
  },

  // Type 8 — The Challenger / Protector
  {
    typeId: 8,
    coreFear: {
      terms: ["controlled", "harm", "weak", "powerless", "vulnerable", "betrayed", "dominated", "manipulated"],
      weight: 2.0,
    },
    coreDesire: {
      terms: ["strong", "power", "control", "protect", "impact", "autonomy", "independent", "self-reliant"],
      weight: 2.0,
    },
    keyBehaviors: {
      terms: [
        "challenge", "confront", "direct", "aggressive", "dominate", "protect",
        "justice", "intensity", "excess", "lust", "deny vulnerability",
        "leader", "decisive", "bold", "intimidate", "blunt", "loyal",
        "provider", "fight", "strong", "territorial",
      ],
      weight: 1.5,
    },
    growthTerms: {
      terms: [
        "innocence", "vulnerability", "tender", "surrender", "trust",
        "openness", "heart", "gentleness",
      ],
      weight: 1.0,
    },
    stressTerms: {
      terms: [
        "withdrawn", "secretive", "paranoid", "isolated", "detached",
        "cold",
      ],
      weight: 1.0,
    },
    commonMistypes: [3, 6, 7],
  },

  // Type 9 — The Peacemaker / Mediator
  {
    typeId: 9,
    coreFear: {
      terms: ["conflict", "disconnection", "loss", "fragmentation", "separation", "ignored", "tension"],
      weight: 2.0,
    },
    coreDesire: {
      terms: ["peace", "harmony", "unity", "comfortable", "connected", "stability", "inner calm", "merge"],
      weight: 2.0,
    },
    keyBehaviors: {
      terms: [
        "accommodate", "numb", "forget", "distracted", "stubborn", "inertia",
        "mediate", "easy", "pleasant", "passive", "avoid", "blend in",
        "agenda-less", "merge", "routine", "comfort", "sloth", "asleep",
        "go along", "self-forget", "procrastinate", "postpone",
      ],
      weight: 1.5,
    },
    growthTerms: {
      terms: [
        "action", "presence", "priority", "assertion", "awakened",
        "engagement", "self-remembering", "love", "particularize",
      ],
      weight: 1.0,
    },
    stressTerms: {
      terms: [
        "anxious", "worried", "catastrophizing", "hyperactive", "compulsive",
        "frenetic",
      ],
      weight: 1.0,
    },
    commonMistypes: [4, 5, 2],
  },
];

// ── Cognitive Function Clusters ───────────────────────────────────────────────

export interface FunctionCluster {
  functionId: string; // e.g. "Ne", "Ni"
  terms: string[];
  weight: number;
}

export const COGNITIVE_FUNCTION_CLUSTERS: FunctionCluster[] = [
  {
    functionId: "Ne",
    terms: [
      "possibility", "brainstorm", "pattern", "connect ideas", "divergent",
      "hypothetical", "what if", "novelty", "explore", "lateral thinking",
      "abstract", "future potential", "inspiration", "serendipity",
      "open-ended", "imagine",
    ],
    weight: 1.5,
  },
  {
    functionId: "Ni",
    terms: [
      "convergent", "insight", "foresight", "vision", "synthesize",
      "unconscious", "symbolic", "underlying pattern", "aha moment",
      "intuition", "deep understanding", "gestalt", "prophetic",
      "long-term", "predict", "archetypal",
    ],
    weight: 1.5,
  },
  {
    functionId: "Se",
    terms: [
      "sensory", "present moment", "action", "aesthetic", "concrete",
      "physical", "experience", "spontaneous", "opportunity", "tangible",
      "immediate", "sensual", "body", "surroundings", "impulse",
    ],
    weight: 1.5,
  },
  {
    functionId: "Si",
    terms: [
      "memory", "tradition", "routine", "detail", "comparison",
      "past experience", "reliable", "duty", "precedent", "sensory recall",
      "familiar", "stored impression", "history", "concrete detail",
    ],
    weight: 1.5,
  },
  {
    functionId: "Te",
    terms: [
      "organize", "efficiency", "external system", "logic", "structure",
      "measurable", "objective", "goal", "decisive", "plan", "benchmark",
      "metrics", "process", "manage", "leadership",
    ],
    weight: 1.5,
  },
  {
    functionId: "Ti",
    terms: [
      "internal logic", "precision", "define", "categorize", "analyze",
      "consistency", "taxonomy", "principle", "framework", "critique",
      "independent", "accuracy", "refine", "deconstruct",
    ],
    weight: 1.5,
  },
  {
    functionId: "Fe",
    terms: [
      "harmony", "group values", "others' feelings", "empathy", "social",
      "emotional attunement", "consensus", "community", "belong",
      "relational", "atmosphere", "collective", "warmth", "approval",
    ],
    weight: 1.5,
  },
  {
    functionId: "Fi",
    terms: [
      "personal values", "authenticity", "individual", "inner moral",
      "identity", "meaning", "conviction", "integrity", "depth of feeling",
      "subjective", "purpose", "ethical code", "who I am", "genuine",
    ],
    weight: 1.5,
  },
];

// ── Jungian Concept Clusters ──────────────────────────────────────────────────

export interface ConceptCluster {
  conceptId: string;
  terms: string[];
  weight: number;
}

export const JUNGIAN_CONCEPT_CLUSTERS: ConceptCluster[] = [
  {
    conceptId: "shadow",
    terms: [
      "unconscious", "disowned", "repressed", "rejected", "dark side",
      "projection", "trigger", "unknown self", "integrate", "blind spot",
    ],
    weight: 1.5,
  },
  {
    conceptId: "persona",
    terms: [
      "mask", "social role", "presentation", "facade", "image",
      "public self", "conformity", "performance", "role", "outer self",
    ],
    weight: 1.5,
  },
  {
    conceptId: "anima",
    terms: [
      "feminine", "inner woman", "man's unconscious feminine",
      "anima projection", "soul image", "emotional depth in men",
    ],
    weight: 1.5,
  },
  {
    conceptId: "animus",
    terms: [
      "masculine", "inner man", "woman's unconscious masculine",
      "animus projection", "logos", "intellectual drive in women",
    ],
    weight: 1.5,
  },
  {
    conceptId: "individuation",
    terms: [
      "wholeness", "integration", "self-realization", "becoming",
      "psychological growth", "inner journey", "authentic self",
      "transcend ego", "complete", "mature",
    ],
    weight: 1.5,
  },
  {
    conceptId: "projection",
    terms: [
      "attribute to others", "disown", "see in others", "unconscious transfer",
      "mirror", "reflect", "trigger", "blame", "perceive outward",
    ],
    weight: 1.5,
  },
  {
    conceptId: "archetype",
    terms: [
      "universal pattern", "collective unconscious", "primordial image",
      "hero", "trickster", "wise old man", "great mother", "symbol",
      "mythic", "universal motif",
    ],
    weight: 1.5,
  },
];

// ── Scoring Function ─────────────────────────────────────────────────────────

/**
 * Score a block of text against a TypeCluster.
 * Returns a weighted score between 0 and 100.
 */
export function scoreTextAgainstCluster(text: string, cluster: TypeCluster): number {
  const lower = text.toLowerCase();
  const subClusters = [
    cluster.coreFear,
    cluster.coreDesire,
    cluster.keyBehaviors,
    cluster.growthTerms,
    cluster.stressTerms,
  ];

  let totalScore = 0;
  let maxPossible = 0;

  for (const sub of subClusters) {
    let subHits = 0;
    for (const term of sub.terms) {
      if (lower.includes(term.toLowerCase())) {
        subHits += sub.weight;
      }
    }
    totalScore += subHits;
    maxPossible += sub.terms.length * sub.weight;
  }

  if (maxPossible === 0) return 0;
  return Math.min(100, Math.round((totalScore / maxPossible) * 100));
}

/**
 * Score text against all 9 types and return ranked results.
 */
export function rankTypesForText(
  text: string
): Array<{ typeId: number; score: number }> {
  return TYPE_CLUSTERS.map((cluster) => ({
    typeId: cluster.typeId,
    score: scoreTextAgainstCluster(text, cluster),
  })).sort((a, b) => b.score - a.score);
}
