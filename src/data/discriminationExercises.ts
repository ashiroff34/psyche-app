// ─────────────────────────────────────────────────────────────────────────────
// Near-Neighbor Discrimination Exercises
// Presents two commonly confused Enneagram types side-by-side and asks
// the learner to identify which behavioral statement belongs to which type.
//
// Key principle: the difference between types is ALWAYS in the WHY
// (core motivation/fear), never just the surface behavior.
// ─────────────────────────────────────────────────────────────────────────────

export interface DiscriminationItem {
  text: string;
  answer: "A" | "B";
  explanation: string;
}

export interface DiscriminationExercise {
  id: string;
  typeA: number;
  typeB: number;
  prompt: string;
  items: DiscriminationItem[];
}

// ── Type 1 vs Type 6 ─────────────────────────────────────────────────────────
// Both are rule-oriented and self-controlled, but for different reasons.
// Type 1: follows rules because they reflect what is right and good.
// Type 6: follows rules because violating them produces anxiety about consequences.

export const disc_1v6: DiscriminationExercise = {
  id: "disc-1v6",
  typeA: 1,
  typeB: 6,
  prompt: "Which of these behaviors or inner experiences belongs to Type 1 (The Reformer) vs. Type 6 (The Loyalist)?",
  items: [
    {
      text: "Corrects others because the error itself offends their internal standard of rightness. the mistake feels wrong in principle, regardless of who is watching.",
      answer: "A",
      explanation: "Type 1's correction comes from an internalized sense of how things ought to be. There's no anxiety about consequences. the imperfection itself is the problem.",
    },
    {
      text: "Checks the rules before acting, not because they personally believe in every rule, but because uncertainty about the correct procedure creates anxiety.",
      answer: "B",
      explanation: "Type 6 uses rules as an external anchor to reduce anxiety. They're not driven by an internal standard of goodness. they need to know what is expected so they feel safe.",
    },
    {
      text: "Experiences resentment when others don't uphold ethical standards, feeling it as a personal affront to what is right.",
      answer: "A",
      explanation: "The Type 1 passion is resentment. a chronic sensitivity to the gap between what is and what ought to be. This resentment is moral, not fear-based.",
    },
    {
      text: "Scans for hidden motives in others. wondering if people in authority have agendas they're not disclosing. before fully committing to a course of action.",
      answer: "B",
      explanation: "Type 6's vigilance is about detecting threats and unreliable alliances. Their questioning is survival-oriented, not principled.",
    },
    {
      text: "Holds themselves to the same standard they hold others to. often harsher with themselves than anyone else.",
      answer: "A",
      explanation: "The inner critic of Type 1 applies most intensely to themselves. They are their own strictest judge.",
    },
  ],
};

// ── Type 1 vs Type 3 ─────────────────────────────────────────────────────────
// Both are achievement-oriented with high standards, but for different reasons.
// Type 1: achieves to be genuinely good and correct.
// Type 3: achieves to be seen as successful and to feel valuable.

export const disc_1v3: DiscriminationExercise = {
  id: "disc-1v3",
  typeA: 1,
  typeB: 3,
  prompt: "Which of these behaviors or inner experiences belongs to Type 1 (The Reformer) vs. Type 3 (The Achiever)?",
  items: [
    {
      text: "Feels uncomfortable accepting praise if they privately know the work wasn't their best. the recognition feels unearned.",
      answer: "A",
      explanation: "Type 1's relationship to praise is filtered through their internal standard. If the work doesn't meet their own measure of quality, external validation feels hollow or even dishonest.",
    },
    {
      text: "Adapts their presentation. their story, their persona, their priorities. to match what will be most impressive to the specific audience they're with.",
      answer: "B",
      explanation: "Type 3's image-shifting is a core strategy. They read the room and become what is most valued there. This is not manipulation. it's automatic self-adjustment.",
    },
    {
      text: "Becomes frustrated when processes are done sloppily even when the outcome looks fine to everyone else.",
      answer: "A",
      explanation: "For Type 1, the how matters as much as the what. A correct result achieved through sloppy methods still registers as wrong.",
    },
    {
      text: "Keeps moving from goal to goal. once achieved, an accomplishment loses its emotional charge and the next target immediately becomes the focus.",
      answer: "B",
      explanation: "Type 3 experiences a treadmill quality to achievement. The feeling of success is brief because their value is located in the next achievement, not the present one.",
    },
  ],
};

// ── Type 2 vs Type 9 ─────────────────────────────────────────────────────────
// Both are accommodating and relationship-focused, but for different reasons.
// Type 2: gives to create connection and be needed.
// Type 9: accommodates to preserve harmony and avoid conflict.

export const disc_2v9: DiscriminationExercise = {
  id: "disc-2v9",
  typeA: 2,
  typeB: 9,
  prompt: "Which of these behaviors or inner experiences belongs to Type 2 (The Helper) vs. Type 9 (The Peacemaker)?",
  items: [
    {
      text: "Moves toward people in distress. feels pulled to help, often before being asked, and experiences helping as energizing.",
      answer: "A",
      explanation: "Type 2 is drawn into the emotional lives of others. Helping feels meaningful and creates the sense of connection they seek.",
    },
    {
      text: "Goes along with what others want, often without clearly knowing what they themselves want. their own preferences feel fuzzy or unimportant.",
      answer: "B",
      explanation: "Type 9 merges with others' agendas. Their own desires are not suppressed on purpose. they genuinely have difficulty accessing them because self-assertion feels threatening to the peace.",
    },
    {
      text: "Keeps a private emotional ledger. feels hurt or resentful when their efforts go unnoticed or unreciprocated, even if they don't say so.",
      answer: "A",
      explanation: "Type 2's giving is not without strings. They expect love and appreciation in return, and its absence registers as rejection.",
    },
    {
      text: "Avoids direct disagreement, often changing the subject or deflecting rather than stating a contrary position. conflict feels physically uncomfortable.",
      answer: "B",
      explanation: "Type 9 experiences conflict as a threat to their sense of peace and inner stability. Harmony isn't just preferred. it feels necessary.",
    },
  ],
};

// ── Type 3 vs Type 7 ─────────────────────────────────────────────────────────
// Both are energetic, future-focused, and avoid pain, but differently.
// Type 3: avoids failure and worthlessness through accomplishment.
// Type 7: avoids pain and limitation through stimulation and options.

export const disc_3v7: DiscriminationExercise = {
  id: "disc-3v7",
  typeA: 3,
  typeB: 7,
  prompt: "Which of these behaviors or inner experiences belongs to Type 3 (The Achiever) vs. Type 7 (The Enthusiast)?",
  items: [
    {
      text: "Keeps a running awareness of how they are being perceived. even in casual conversations, some part of them is tracking the impression they're making.",
      answer: "A",
      explanation: "Type 3's image-consciousness is always active. They are naturally tuned to the social feedback loop.",
    },
    {
      text: "Generates excitement by accumulating new plans, options, and experiences. the anticipation itself is more pleasurable than the thing once it arrives.",
      answer: "B",
      explanation: "Type 7's pleasure is in possibility. The future is always better than the present because it has not yet disappointed.",
    },
    {
      text: "Becomes emotionally flat or shutdown when they fail at something they care about. feelings get cut off to keep functioning.",
      answer: "A",
      explanation: "Type 3 decouples from feelings in order to maintain performance. Emotional pain is a threat to productivity and image.",
    },
    {
      text: "Reframes painful situations quickly into positive learning opportunities. the reframe feels genuine, not forced, because they actually believe it.",
      answer: "B",
      explanation: "Type 7's positive reframing is a cognitive defense mechanism. gluttony for positive experience and an automatic escape from pain.",
    },
  ],
};

// ── Type 4 vs Type 9 ─────────────────────────────────────────────────────────
// Both can appear withdrawn and melancholic, but for different reasons.
// Type 4: withdrawn because they feel fundamentally different/deficient; melancholy feels real and true.
// Type 9: withdrawn because they have merged into background; melancholy is a form of numbing.

export const disc_4v9: DiscriminationExercise = {
  id: "disc-4v9",
  typeA: 4,
  typeB: 9,
  prompt: "Which of these behaviors or inner experiences belongs to Type 4 (The Individualist) vs. Type 9 (The Peacemaker)?",
  items: [
    {
      text: "Feels that their emotional experience is more intense and more real than what others seem to feel. their inner life feels significant, not a problem.",
      answer: "A",
      explanation: "Type 4 identifies with their feelings. The depth of their emotional experience is part of their identity. it confirms their specialness, not their brokenness.",
    },
    {
      text: "Goes along with group plans while internally drifting. physically present but not fully engaged; awareness dispersed across multiple things at once.",
      answer: "B",
      explanation: "Type 9's merging produces a kind of psychic diffusion. They are not intensely present in their own experience.",
    },
    {
      text: "Romanticizes what is absent or lost. people, places, and experiences always seem more beautiful in memory or imagination than in the actual present.",
      answer: "A",
      explanation: "Type 4's longing structure means the distant or unavailable has special emotional charge. The present is always slightly disappointing by comparison.",
    },
    {
      text: "Avoids making definitive choices when possible. keeping things open feels comfortable; committing feels like losing something.",
      answer: "B",
      explanation: "Type 9's difficulty with decisiveness reflects their tendency to see all sides without a strong internal voice pointing one direction.",
    },
  ],
};

// ── Type 4 vs Type 6 ─────────────────────────────────────────────────────────
// Both can be anxious and emotionally intense, but for different reasons.
// Type 4: anxiety is existential. about being essentially flawed or missing.
// Type 6: anxiety is threat-based. about what might go wrong in the external world.

export const disc_4v6: DiscriminationExercise = {
  id: "disc-4v6",
  typeA: 4,
  typeB: 6,
  prompt: "Which of these behaviors or inner experiences belongs to Type 4 (The Individualist) vs. Type 6 (The Loyalist)?",
  items: [
    {
      text: "Feels that something fundamental is missing or wrong with them at the core. not that things will go badly, but that they themselves are inherently lacking.",
      answer: "A",
      explanation: "Type 4's core wound is a sense of deficiency or abandonment at the identity level. an existential ache, not a situational threat assessment.",
    },
    {
      text: "Runs worst-case scenarios in their mind before undertaking anything new. imagining obstacles helps them feel more prepared and less caught off guard.",
      answer: "B",
      explanation: "Type 6's anticipatory scanning is a safety strategy. Thinking through what could go wrong feels protective, not pessimistic.",
    },
    {
      text: "Feels misunderstood even by people who love them. suspects that others can't fully grasp the depth or uniqueness of their experience.",
      answer: "A",
      explanation: "Type 4's sense of being uniquely different means connection always feels partial. No one quite gets it.",
    },
    {
      text: "Tests loyalty before extending full trust. will create ambiguous situations to see how someone responds before committing.",
      answer: "B",
      explanation: "Type 6's testing behavior is about detecting whether people are reliable. Authority and loyalty are the key questions.",
    },
  ],
};

// ── Type 5 vs Type 9 ─────────────────────────────────────────────────────────
// Both are withdrawn and private, but for different reasons.
// Type 5: withdraws to conserve energy and protect inner resources.
// Type 9: withdraws by merging into background and deprioritizing self.

export const disc_5v9: DiscriminationExercise = {
  id: "disc-5v9",
  typeA: 5,
  typeB: 9,
  prompt: "Which of these behaviors or inner experiences belongs to Type 5 (The Investigator) vs. Type 9 (The Peacemaker)?",
  items: [
    {
      text: "Experiences social interaction as depleting. needs to be alone afterward to process and restore, even when the interaction was pleasant.",
      answer: "A",
      explanation: "Type 5 experiences the world as demanding more than they can give. Social contact is energetically costly and requires recovery time.",
    },
    {
      text: "Loses track of their own wants and needs when around others for extended periods. other people's presence seems to dilute their sense of self.",
      answer: "B",
      explanation: "Type 9 merges with the field of others. This is not the same as introversion. it is a dissolution of self-boundary.",
    },
    {
      text: "Compartmentalizes life carefully. keeps different domains (work, hobbies, relationships) separate, revealing only what is necessary in each context.",
      answer: "A",
      explanation: "Type 5's compartmentalization is a resource-management strategy. Each domain gets only its allotted portion of them.",
    },
    {
      text: "Resists nothing, accommodates everything. and then feels unexpectedly resentful about a situation they technically agreed to.",
      answer: "B",
      explanation: "Type 9's passive resistance emerges when their suppressed preferences finally surface as resentment. They said yes without accessing their actual no.",
    },
  ],
};

// ── Type 7 vs Type 3 (image-conscious, optimistic) ────────────────────────────
// Repeated pair with more subtle items focused on the image vs. stimulation axis.

export const disc_7v3: DiscriminationExercise = {
  id: "disc-7v3",
  typeA: 7,
  typeB: 3,
  prompt: "Which of these behaviors or inner experiences belongs to Type 7 (The Enthusiast) vs. Type 3 (The Achiever)?",
  items: [
    {
      text: "Gets restless or irritable when forced to stay on one topic for too long. their mind naturally wants to jump to the next interesting thing.",
      answer: "A",
      explanation: "Type 7's attention style naturally gravitates toward stimulation. Sustained focus on one thing feels like deprivation.",
    },
    {
      text: "Structures their schedule around deadlines and goals. feels most comfortable when there is a clear target to orient toward.",
      answer: "B",
      explanation: "Type 3 is goal-directed and task-oriented. Accomplishment gives them their sense of value.",
    },
    {
      text: "Experiences boredom as almost physically aversive. will create activity, humor, or new plans to escape a dull or heavy moment.",
      answer: "A",
      explanation: "Type 7's relationship to pain includes boredom, heaviness, and emotional flatness. Stimulation is escape.",
    },
    {
      text: "Feels most alive when they are moving toward a visible milestone. the journey matters less than the sense of progression.",
      answer: "B",
      explanation: "Type 3 is achievement-oriented. The goal gives meaning; the striving is instrumental.",
    },
  ],
};

// ── Master list of all discrimination exercises ───────────────────────────────

export const DISCRIMINATION_EXERCISES: DiscriminationExercise[] = [
  disc_1v6,
  disc_1v3,
  disc_2v9,
  disc_3v7,
  disc_4v9,
  disc_4v6,
  disc_5v9,
  disc_7v3,
];

/** Get a discrimination exercise by its ID */
export function getDiscriminationExercise(id: string): DiscriminationExercise | undefined {
  return DISCRIMINATION_EXERCISES.find((e) => e.id === id);
}

/** Get the discrimination exercise most relevant to a given type number */
export function getDiscriminationForType(typeNum: number): DiscriminationExercise | undefined {
  // Priority map: which exercise to use when we're teaching that type
  const priorityMap: Record<number, string> = {
    1: "disc-1v6",
    2: "disc-2v9",
    3: "disc-3v7",
    4: "disc-4v6",
    5: "disc-5v9",
    6: "disc-1v6",
    7: "disc-7v3",
    8: "disc-1v3", // closest available
    9: "disc-4v9",
  };
  const id = priorityMap[typeNum];
  return id ? getDiscriminationExercise(id) : undefined;
}
