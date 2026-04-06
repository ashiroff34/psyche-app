// ─────────────────────────────────────────────────────────────────────────────
// Interleaving Exercises — Mixed-type discrimination for all 9 types
// Each exercise reinforces one type by mixing it with 1-2 others
// Focus: core motivation (the WHY), not surface behavior
// ─────────────────────────────────────────────────────────────────────────────

export interface InterleavingExercise {
  typeNumber: number;    // the type being reinforced
  mixedWith: number[];   // 1-2 other types in the mix
  title: string;
  items: Array<{
    statement: string;
    correctType: number;
    explanation: string;
  }>;
}

export const interleavingExercises: InterleavingExercise[] = [
  // ── Type 1 — mixed with 6 and 3 ──────────────────────────────────────────
  {
    typeNumber: 1,
    mixedWith: [3, 6],
    title: "Types 1, 3 & 6 — Identify the motivation",
    items: [
      {
        statement: "Redoes the report at midnight — not because it will hurt their career if it stays wrong, but because leaving an error in place feels morally intolerable.",
        correctType: 1,
        explanation: "The One's motivation is internal integrity, not external consequence. The error is wrong in principle.",
      },
      {
        statement: "Checks company policy before acting, not from personal conviction, but because not knowing the rule creates anxious uncertainty.",
        correctType: 6,
        explanation: "The Six follows rules to reduce anxiety, not because they hold a deep moral position about them.",
      },
      {
        statement: "Polishes the presentation until it's flawless — primarily so the audience will be impressed and see them as highly competent.",
        correctType: 3,
        explanation: "The Three's perfectionism is image-driven. They want the result seen and admired.",
      },
    ],
  },

  // ── Type 2 — mixed with 9 and 3 ──────────────────────────────────────────
  {
    typeNumber: 2,
    mixedWith: [3, 9],
    title: "Types 2, 3 & 9 — Identify the motivation",
    items: [
      {
        statement: "Anticipates what their friend needs before being asked, then quietly provides it — driven by the felt need to be seen as indispensable.",
        correctType: 2,
        explanation: "The Two gives to secure their position in the relationship. Being needed feels like being safe.",
      },
      {
        statement: "Goes along with the group's plan even though it's not what they wanted — keeping the peace feels more important than asserting themselves.",
        correctType: 9,
        explanation: "The Nine merges with others' agendas to avoid conflict and maintain harmony, not to be loved.",
      },
      {
        statement: "Takes on extra responsibility at work, not because they're trying to be helpful, but because succeeding at a visible project will earn them recognition.",
        correctType: 3,
        explanation: "The Three performs and achieves to be seen as successful, not to make others feel cared for.",
      },
    ],
  },

  // ── Type 3 — mixed with 1 and 7 ──────────────────────────────────────────
  {
    typeNumber: 3,
    mixedWith: [1, 7],
    title: "Types 3, 1 & 7 — Identify the motivation",
    items: [
      {
        statement: "Starts a new venture with enormous energy and plans, primarily drawn by the exciting possibilities — and quickly moves to the next thing if this one stops being stimulating.",
        correctType: 7,
        explanation: "The Seven's drive is about freedom and stimulation. They chase possibilities to stay ahead of boredom and pain.",
      },
      {
        statement: "Researches the 'best way' to do something for hours before starting — needing to be sure they're doing it correctly, not just efficiently.",
        correctType: 1,
        explanation: "The One wants to do it right, from an internalized standard. The concern is correctness, not image.",
      },
      {
        statement: "Shapes their personality and presentation to match what they sense the room values — because being seen as successful and impressive is the deep goal.",
        correctType: 3,
        explanation: "The Three is a chameleon who adapts to earn admiration. Worth feels contingent on achievement.",
      },
    ],
  },

  // ── Type 4 — mixed with 2 and 9 ──────────────────────────────────────────
  {
    typeNumber: 4,
    mixedWith: [2, 9],
    title: "Types 4, 2 & 9 — Identify the motivation",
    items: [
      {
        statement: "Withdraws into melancholy after a social gathering, convinced that everyone else belongs somewhere they don't — drawn toward the feeling itself as proof of their uniqueness.",
        correctType: 4,
        explanation: "The Four romanticizes their separateness. Longing and feeling different become a source of identity.",
      },
      {
        statement: "Suppresses their frustration about a decision that affected them, redirecting energy into helping the person who made the decision feel better.",
        correctType: 2,
        explanation: "The Two turns away from their own needs and toward caretaking — keeping the relationship intact is the priority.",
      },
      {
        statement: "Lets go of their preferred outcome in a group decision because the conflict of asserting it feels worse than not getting what they wanted.",
        correctType: 9,
        explanation: "The Nine erases their own desire to maintain peace. The discomfort of conflict outweighs the loss.",
      },
    ],
  },

  // ── Type 5 — mixed with 1 and 4 ──────────────────────────────────────────
  {
    typeNumber: 5,
    mixedWith: [1, 4],
    title: "Types 5, 1 & 4 — Identify the motivation",
    items: [
      {
        statement: "Declines a last-minute invitation, not because they dislike the people, but because unplanned social demands feel depleting and they need to protect their energy.",
        correctType: 5,
        explanation: "The Five conserves resources. Unplanned demands feel like intrusions that threaten their supply of inner energy.",
      },
      {
        statement: "Crafts a lengthy response to an email to make sure every nuance is precisely worded — because an imprecise reply would feel like a failure of their own standards.",
        correctType: 1,
        explanation: "The One's precision comes from an internalized standard of correctness. Getting it right matters in principle.",
      },
      {
        statement: "Experiences a powerful sense of connection during a film and then feels melancholy afterward, aware of the gap between that feeling and ordinary life.",
        correctType: 4,
        explanation: "The Four lives in the gap between the ideal and the real. Emotional intensity followed by longing is their signature.",
      },
    ],
  },

  // ── Type 6 — mixed with 1 and 5 ──────────────────────────────────────────
  {
    typeNumber: 6,
    mixedWith: [1, 5],
    title: "Types 6, 1 & 5 — Identify the motivation",
    items: [
      {
        statement: "Fact-checks an authority's claim — not from intellectual curiosity, but from an undercurrent of vigilance about whether this person should actually be trusted.",
        correctType: 6,
        explanation: "The Six's questioning is threat-detection. They scan authorities for hidden agendas or signs of untrustworthiness.",
      },
      {
        statement: "Researches a topic exhaustively before forming an opinion — needing to understand it fully from the inside before feeling qualified to say anything.",
        correctType: 5,
        explanation: "The Five builds knowledge as a resource and protective buffer. Competence before engagement.",
      },
      {
        statement: "Corrects a colleague's minor word choice in a meeting — not to embarrass them, but because using the wrong term feels like a violation of accuracy.",
        correctType: 1,
        explanation: "The One corrects from principle. Inaccuracy itself is the problem.",
      },
    ],
  },

  // ── Type 7 — mixed with 3 and 2 ──────────────────────────────────────────
  {
    typeNumber: 7,
    mixedWith: [2, 3],
    title: "Types 7, 3 & 2 — Identify the motivation",
    items: [
      {
        statement: "Reframes a difficult situation almost immediately into what can be learned from it — not to process it, but to escape the weight of the feeling.",
        correctType: 7,
        explanation: "The Seven uses positive reframing as a flight from pain. The move to 'silver lining' is anxiety management.",
      },
      {
        statement: "Offers help to a struggling colleague because seeing them struggle makes the Two feel needed — and being needed feels like a guarantee of connection.",
        correctType: 2,
        explanation: "The Two is moved by the prospect of being indispensable, not just by generosity.",
      },
      {
        statement: "Announces a new project before it's finished — motivated more by wanting to be seen as innovative and ahead of the curve than by the project itself.",
        correctType: 3,
        explanation: "The Three performs for admiration. The announcement is about image, not just enthusiasm.",
      },
    ],
  },

  // ── Type 8 — mixed with 3 and 6 ──────────────────────────────────────────
  {
    typeNumber: 8,
    mixedWith: [3, 6],
    title: "Types 8, 3 & 6 — Identify the motivation",
    items: [
      {
        statement: "Takes charge of a chaotic situation immediately — not to impress anyone, but because surrendering control feels genuinely dangerous.",
        correctType: 8,
        explanation: "The Eight asserts control because vulnerability is a threat. Power is protection, not performance.",
      },
      {
        statement: "Stays late to solve a problem at work — primarily because resolving it will position them as the indispensable person who saves the day.",
        correctType: 3,
        explanation: "The Three acts for impact and recognition. Their effort is audience-aware.",
      },
      {
        statement: "Defers to the official procedure even when they disagree with it — because following the established structure feels safer than acting on their own judgment.",
        correctType: 6,
        explanation: "The Six uses external structures to manage anxiety. The authority of the procedure provides safety.",
      },
    ],
  },

  // ── Type 9 — mixed with 2 and 5 ──────────────────────────────────────────
  {
    typeNumber: 9,
    mixedWith: [2, 5],
    title: "Types 9, 2 & 5 — Identify the motivation",
    items: [
      {
        statement: "Agrees with both sides of a disagreement in the same conversation — not from dishonesty, but from a genuine merging with whoever they're currently talking to.",
        correctType: 9,
        explanation: "The Nine loses their own perspective in the presence of others. Merging is not manipulation, it's the dissolution of self.",
      },
      {
        statement: "Spends the evening reading rather than joining friends — because the social engagement would require more output than they currently have to give.",
        correctType: 5,
        explanation: "The Five is protecting their limited felt resources. Solitude is conservation, not avoidance.",
      },
      {
        statement: "Sends a check-in text to a friend going through difficulty — primarily because knowing they're needed gives them a sense of secure connection.",
        correctType: 2,
        explanation: "The Two's attentiveness is tied to their need to be needed and loved in return.",
      },
    ],
  },
];
