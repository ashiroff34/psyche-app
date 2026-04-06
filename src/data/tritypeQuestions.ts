// Tritype Forced-Choice Assessment Questions
// 27 questions: 9 per center (gut/heart/head)
// Each question presents two statements from different types within the same center.
// The user picks which resonates more deeply as a CORE pattern (not just behavior).
// Focus: core fears, core strategies, the WHY behind actions.

export interface TritypeQuestion {
  id: number;
  center: "gut" | "heart" | "head";
  optionA: { text: string; type: number };
  optionB: { text: string; type: number };
}

// ── GUT CENTER QUESTIONS (Types 8, 9, 1) ──────────────────────────────────────
// Core question: How do you relate to anger, power, and self-assertion?
// Type 8: externalizes anger, takes control, resists vulnerability
// Type 9: numbs anger, merges with others, avoids conflict
// Type 1: internalizes anger as self-criticism, strives for correctness

export const tritypeQuestions: TritypeQuestion[] = [
  // GUT CENTER — 8 vs 9
  {
    id: 1,
    center: "gut",
    optionA: {
      text: "At my core, I am driven by a need to stay in control and not be controlled. Vulnerability feels dangerous.",
      type: 8,
    },
    optionB: {
      text: "At my core, I avoid conflict and merge with others' agendas to keep peace — even losing track of my own desires.",
      type: 9,
    },
  },
  // GUT CENTER — 8 vs 1
  {
    id: 2,
    center: "gut",
    optionA: {
      text: "When I feel wronged, I instinctively push back, confront, and assert myself — I won't be pushed around.",
      type: 8,
    },
    optionB: {
      text: "When I feel wronged, I suppress my anger and redirect it into criticism — of myself and what's wrong with the situation.",
      type: 1,
    },
  },
  // GUT CENTER — 9 vs 1
  {
    id: 3,
    center: "gut",
    optionA: {
      text: "My deepest fear is separation and conflict. I'd rather go along and keep things comfortable than assert what I want.",
      type: 9,
    },
    optionB: {
      text: "My deepest fear is being wrong, flawed, or corrupt. I push myself relentlessly to meet the standards I hold inside.",
      type: 1,
    },
  },
  // GUT CENTER — 8 vs 9
  {
    id: 4,
    center: "gut",
    optionA: {
      text: "I instinctively test people and situations to see if they can handle me at full intensity.",
      type: 8,
    },
    optionB: {
      text: "I instinctively adapt to people and situations to avoid disrupting the harmony.",
      type: 9,
    },
  },
  // GUT CENTER — 9 vs 1
  {
    id: 5,
    center: "gut",
    optionA: {
      text: "I often feel invisible or overlooked, like my own voice and needs fall asleep even to me.",
      type: 9,
    },
    optionB: {
      text: "I often feel like I have to be the responsible one — catching errors others miss and correcting things before they go wrong.",
      type: 1,
    },
  },
  // GUT CENTER — 8 vs 1
  {
    id: 6,
    center: "gut",
    optionA: {
      text: "I trust my gut instincts and act decisively, even if it means bending the rules or being seen as too aggressive.",
      type: 8,
    },
    optionB: {
      text: "I trust the right way of doing things and feel genuine discomfort when rules, ethics, or standards are violated.",
      type: 1,
    },
  },
  // GUT CENTER — 8 vs 9
  {
    id: 7,
    center: "gut",
    optionA: {
      text: "I would rather be too much than invisible. If people don't like my intensity, that's their problem.",
      type: 8,
    },
    optionB: {
      text: "I would rather be agreeable than create friction. Conflict feels genuinely draining and disorienting to me.",
      type: 9,
    },
  },
  // GUT CENTER — 1 vs 9
  {
    id: 8,
    center: "gut",
    optionA: {
      text: "There is a relentless inner critic in my head that notices everything imperfect and impels me to fix it.",
      type: 1,
    },
    optionB: {
      text: "There is a deep inner numbness — I space out, procrastinate, and get lost in minor distractions to avoid what demands effort.",
      type: 9,
    },
  },
  // GUT CENTER — 8 vs 1
  {
    id: 9,
    center: "gut",
    optionA: {
      text: "I am fundamentally concerned with power — who has it, who's using it, and whether I can protect what matters to me.",
      type: 8,
    },
    optionB: {
      text: "I am fundamentally concerned with integrity — whether I, and the world around me, are living up to what is right.",
      type: 1,
    },
  },

  // ── HEART CENTER QUESTIONS (Types 2, 3, 4) ─────────────────────────────────
  // Core question: How do you construct and protect your sense of self and worth?
  // Type 2: worth through being needed and loved, denies own needs
  // Type 3: worth through achievement, image, and success
  // Type 4: worth through uniqueness and authenticity, feels something is missing

  // HEART CENTER — 2 vs 3
  {
    id: 10,
    center: "heart",
    optionA: {
      text: "My sense of worth comes from being loved and needed. When no one needs me, I feel empty and anxious.",
      type: 2,
    },
    optionB: {
      text: "My sense of worth comes from what I achieve and how I'm seen. I naturally present the version of myself that succeeds.",
      type: 3,
    },
  },
  // HEART CENTER — 2 vs 4
  {
    id: 11,
    center: "heart",
    optionA: {
      text: "I instinctively move toward people, anticipate their needs, and feel most alive when I'm genuinely helping someone.",
      type: 2,
    },
    optionB: {
      text: "I instinctively turn inward, longing for what feels missing or lost, and feel most alive in deep, genuine emotional experiences.",
      type: 4,
    },
  },
  // HEART CENTER — 3 vs 4
  {
    id: 12,
    center: "heart",
    optionA: {
      text: "I adapt my presentation to succeed in any environment — I know intuitively what image works and I project it.",
      type: 3,
    },
    optionB: {
      text: "I resist fitting in. I would rather be uniquely myself, even if it means being misunderstood or left out.",
      type: 4,
    },
  },
  // HEART CENTER — 2 vs 3
  {
    id: 13,
    center: "heart",
    optionA: {
      text: "I often don't know what I need or feel — I'm so focused on others that my own inner life gets overlooked.",
      type: 2,
    },
    optionB: {
      text: "I often don't know who I am without my accomplishments. What I've achieved is what I am.",
      type: 3,
    },
  },
  // HEART CENTER — 3 vs 4
  {
    id: 14,
    center: "heart",
    optionA: {
      text: "Efficiency and forward momentum matter deeply to me. I don't like dwelling on emotions that slow things down.",
      type: 3,
    },
    optionB: {
      text: "Depth and authenticity matter more than momentum. I'd rather feel something real than perform something polished.",
      type: 4,
    },
  },
  // HEART CENTER — 2 vs 4
  {
    id: 15,
    center: "heart",
    optionA: {
      text: "Giving and being loving is central to my identity. I feel ashamed when I seem selfish or unhelpful.",
      type: 2,
    },
    optionB: {
      text: "Being authentic and original is central to my identity. I feel ashamed when I seem ordinary or fake.",
      type: 4,
    },
  },
  // HEART CENTER — 3 vs 2
  {
    id: 16,
    center: "heart",
    optionA: {
      text: "I'm highly aware of how I'm coming across and naturally adjust to make the best impression in any setting.",
      type: 3,
    },
    optionB: {
      text: "I'm highly aware of others' emotions and naturally adjust to give them what they need in any setting.",
      type: 2,
    },
  },
  // HEART CENTER — 4 vs 3
  {
    id: 17,
    center: "heart",
    optionA: {
      text: "I often feel a persistent sense that something essential is missing from my life or from me — and I'm always searching for it.",
      type: 4,
    },
    optionB: {
      text: "I rarely dwell on what's missing. I focus on what I can accomplish, and I move quickly toward the next goal.",
      type: 3,
    },
  },
  // HEART CENTER — 2 vs 4
  {
    id: 18,
    center: "heart",
    optionA: {
      text: "I fear being unloved or unwanted. Being dispensable to those I care about is one of my deepest fears.",
      type: 2,
    },
    optionB: {
      text: "I fear being ordinary or having no identity. Being like everyone else feels like a kind of disappearance.",
      type: 4,
    },
  },

  // ── HEAD CENTER QUESTIONS (Types 5, 6, 7) ──────────────────────────────────
  // Core question: How do you manage fear and uncertainty?
  // Type 5: withdraws to think, conserves energy, fears being overwhelmed
  // Type 6: scans for threats, seeks security/guidance, fears being without support
  // Type 7: reframes toward positive, keeps options open, fears pain/deprivation

  // HEAD CENTER — 5 vs 6
  {
    id: 19,
    center: "head",
    optionA: {
      text: "When I'm anxious, I withdraw from people, go quiet, and think things through alone until I feel prepared.",
      type: 5,
    },
    optionB: {
      text: "When I'm anxious, I look for reassurance, check in with trusted others, and scan for what could go wrong.",
      type: 6,
    },
  },
  // HEAD CENTER — 5 vs 7
  {
    id: 20,
    center: "head",
    optionA: {
      text: "I tend to conserve my energy, minimize demands on myself, and retreat into my own mental world when overwhelmed.",
      type: 5,
    },
    optionB: {
      text: "I tend to stay busy, keep options open, and redirect toward what's exciting or positive when overwhelmed.",
      type: 7,
    },
  },
  // HEAD CENTER — 6 vs 7
  {
    id: 21,
    center: "head",
    optionA: {
      text: "I spend significant mental energy anticipating what could go wrong and preparing for potential threats or failures.",
      type: 6,
    },
    optionB: {
      text: "I spend significant mental energy imagining what could be exciting and planning for positive future possibilities.",
      type: 7,
    },
  },
  // HEAD CENTER — 5 vs 6
  {
    id: 22,
    center: "head",
    optionA: {
      text: "I need a lot of privacy and alone time. Being around people for too long depletes me in a fundamental way.",
      type: 5,
    },
    optionB: {
      text: "I need reliable connections and support systems. Being without trusted allies leaves me feeling truly unsafe.",
      type: 6,
    },
  },
  // HEAD CENTER — 6 vs 7
  {
    id: 23,
    center: "head",
    optionA: {
      text: "I frequently doubt myself and my decisions, worrying about whether I've made the right choice or can trust my own judgment.",
      type: 6,
    },
    optionB: {
      text: "I rarely dwell on past decisions. I'm more focused on what's next and what possibilities are still open to me.",
      type: 7,
    },
  },
  // HEAD CENTER — 5 vs 7
  {
    id: 24,
    center: "head",
    optionA: {
      text: "I fear being depleted by the world — intruded upon, overwhelmed by demands, left with no inner reserves.",
      type: 5,
    },
    optionB: {
      text: "I fear being trapped in pain, boredom, or limitation — cut off from options, pleasure, or stimulation.",
      type: 7,
    },
  },
  // HEAD CENTER — 5 vs 6
  {
    id: 25,
    center: "head",
    optionA: {
      text: "I accumulate knowledge and expertise as protection — understanding gives me a sense of control over an overwhelming world.",
      type: 5,
    },
    optionB: {
      text: "I build loyal alliances and structures as protection — having reliable support gives me a sense of safety in an uncertain world.",
      type: 6,
    },
  },
  // HEAD CENTER — 7 vs 6
  {
    id: 26,
    center: "head",
    optionA: {
      text: "I keep my life full of plans, projects, and possibilities. Slowing down enough to feel pain or emptiness is something I genuinely resist.",
      type: 7,
    },
    optionB: {
      text: "I keep myself vigilant and prepared. I can't fully relax because I know the world is unpredictable and things can go wrong.",
      type: 6,
    },
  },
  // HEAD CENTER — 5 vs 7
  {
    id: 27,
    center: "head",
    optionA: {
      text: "I observe more than I participate. I'm most comfortable as a witness on the edge of experience rather than being fully immersed in it.",
      type: 5,
    },
    optionB: {
      text: "I participate more than I reflect. I'm most comfortable when I'm engaged, moving, experiencing — life should be savored.",
      type: 7,
    },
  },
];
