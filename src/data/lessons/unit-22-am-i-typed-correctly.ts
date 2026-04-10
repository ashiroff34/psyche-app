// Unit 22: Am I Typed Correctly?
//
// An exploratory unit with NO right or wrong answers. Every exercise is a
// socratic-prompt or free-recall, never multiple-choice. The goal is to help
// the user sit with ambiguity, question their initial typing, and notice
// where the description fits and where it doesn't.
//
// Grounded in Enneagram: Riso-Hudson explicitly warn against premature
// self-typing and recommend 6-12 months of self-observation. This unit
// is the structured version of that advice.
//
// Important framing: the Enneagram type is not something you choose or
// grow out of. It is a core motivational pattern that stays with you.
// What changes is your relationship to it, your awareness of its pull,
// and how much it runs you vs. you running it.

import type { Lesson } from "@/types/lessons";

export const unit22Lessons: Lesson[] = [
  {
    id: "explore-fit",
    unitId: "am-i-typed-correctly",
    order: 1,
    title: "Where it fits",
    subtitle: "What resonates and what doesn't",
    xpReward: 30,
    exercises: [
      {
        id: "e22-1-intro",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "Your type is a hypothesis, not a verdict",
          body: "A short quiz points a direction. Real self-knowledge comes from months of self-observation. In this unit, there are no right or wrong answers. You are the expert on your own experience. We are just asking better questions.",
        },
      },
      {
        id: "e22-1-sp1",
        difficulty: 2,
        content: {
          type: "socratic-prompt",
          question: "When you first read your type description, what was the one sentence that made you stop and think: 'that's exactly me'?",
          reflection: "The moments of strongest recognition often point to core motivation, not surface behavior.",
          revealLabel: "See why this matters",
          conceptTitle: "Recognition vs. performance",
          conceptBody: "A type fits when the MOTIVATION feels true, not just the behavior. You might act like a 3 at work but feel like a 9 underneath. The question is always: what drives the behavior, not just what the behavior looks like.",
        },
      },
      {
        id: "e22-1-fr1",
        difficulty: 3,
        content: {
          type: "free-recall",
          prompt: "Write about one part of your type description that does NOT feel like you. What about it feels off?",
          keyTerms: ["doesn't fit", "not me", "sometimes", "depends", "only when"],
          minWords: 20,
          modelAnswer: "There is no right answer here. The parts that don't fit are often the most useful: they either point to a subtype variation, a wing influence, or a genuine mistype worth exploring.",
        },
      },
    ],
  },
  {
    id: "explore-mistype",
    unitId: "am-i-typed-correctly",
    order: 2,
    title: "The usual suspects",
    subtitle: "Types that look like yours but aren't",
    xpReward: 30,
    exercises: [
      {
        id: "e22-2-intro",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "Every type has a doppelganger",
          body: "Some types look nearly identical from the outside but are driven by completely different motivations. 1s and 6s both worry. 2s and 9s both accommodate. 3s and 7s both avoid negativity. The surface is not the structure.",
        },
      },
      {
        id: "e22-2-sp1",
        difficulty: 2,
        content: {
          type: "socratic-prompt",
          question: "If you had to pick a second type that almost fits you, which would it be? What draws you to it?",
          reflection: "The runner-up type is important. Sometimes it is the real type and the first was the performance.",
          revealLabel: "What runners-up reveal",
          conceptTitle: "The runner-up signal",
          conceptBody: "Your runner-up type often shares surface behavior with your actual type but has a different engine underneath. Pay attention to which one's core FEAR resonates more. The fear is usually more telling than the desire.",
        },
      },
      {
        id: "e22-2-fr1",
        difficulty: 3,
        content: {
          type: "free-recall",
          prompt: "Describe how you react when you feel rejected or criticized. What is the first thing that happens inside, before you choose how to respond?",
          keyTerms: ["first", "automatic", "before", "instinct", "gut", "feel"],
          minWords: 25,
          modelAnswer: "The automatic reaction, before you have time to manage it, is often the clearest window into core type. 1s feel indignation. 2s feel hurt. 3s feel exposed. 4s feel unseen. 5s retreat. 6s scan for danger. 7s reframe. 8s push back. 9s go numb.",
        },
      },
    ],
  },
  {
    id: "explore-under-stress",
    unitId: "am-i-typed-correctly",
    order: 3,
    title: "When the mask slips",
    subtitle: "Your type under pressure",
    xpReward: 30,
    exercises: [
      {
        id: "e22-3-intro",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "Stress reveals the structure",
          body: "At your best, you can look like almost any type. Under sustained pressure, the real pattern shows. Your type is not who you are on a good day. It is who you are when the good day breaks down.",
        },
      },
      {
        id: "e22-3-sp1",
        difficulty: 2,
        content: {
          type: "socratic-prompt",
          question: "Think of the last time you were really stressed for more than a few days. What did you do that you later regretted or didn't understand?",
          reflection: "Stress behavior often follows the Enneagram's integration/disintegration lines. It is patterned, not random.",
          revealLabel: "See the pattern",
          conceptTitle: "Stress is not random",
          conceptBody: "Under stress, each type moves to a predictable place: 1s become moody like 4s, 4s become frantic like 2s, 7s become rigid like 1s. If your stress behavior matches a DIFFERENT type's stress arrow, that might confirm your typing. If it doesn't, your type might be different than you think.",
        },
      },
      {
        id: "e22-3-fr1",
        difficulty: 3,
        content: {
          type: "free-recall",
          prompt: "When everything falls apart, what is the one thing you MUST have to feel okay? Not what you want. What you cannot function without.",
          keyTerms: ["need", "must", "can't", "without", "survive"],
          minWords: 20,
          modelAnswer: "What you cannot function without often points directly to core desire: control (8), certainty (6), options (7), significance (4), competence (5), connection (2), peace (9), success (3), or integrity (1).",
        },
      },
    ],
  },
  {
    id: "explore-childhood",
    unitId: "am-i-typed-correctly",
    order: 4,
    title: "The earliest version of you",
    subtitle: "How your type showed up before you knew the word",
    xpReward: 30,
    exercises: [
      {
        id: "e22-4-intro",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "Your type is not something you developed. It is something you are.",
          body: "Most Enneagram teachers agree: your core type is present from very early childhood. It is not caused by your parents, though your environment shaped how it expressed. Looking at who you were at 7 or 8 often reveals the pattern more clearly than who you are now, because adult life adds layers of compensation.",
        },
      },
      {
        id: "e22-4-sp1",
        difficulty: 2,
        content: {
          type: "socratic-prompt",
          question: "Think about yourself at age 8 or 9. What were you most worried about? What did you most want from the adults around you?",
          reflection: "Childhood wants often map directly to core Enneagram desire. What you wanted then, you still want now, just in more sophisticated forms.",
          revealLabel: "See the connection",
          conceptTitle: "The early signal",
          conceptBody: "The thing you most needed as a child is often the thing you still organize your life around. Not because you didn't get it (maybe you did), but because the need itself is structural. It is part of how you see the world.",
        },
      },
      {
        id: "e22-4-fr1",
        difficulty: 3,
        content: {
          type: "free-recall",
          prompt: "Describe a memory from before age 12 where you felt most like yourself. What were you doing? Who were you with?",
          keyTerms: ["remember", "felt", "myself", "real", "happy", "safe"],
          minWords: 25,
          modelAnswer: "There is no wrong answer. The memory itself is data. What it reveals about what mattered to you before the world taught you what should matter is often the clearest window into core type.",
        },
      },
    ],
  },
  {
    id: "explore-settling",
    unitId: "am-i-typed-correctly",
    order: 5,
    title: "Sitting with uncertainty",
    subtitle: "What to do when you're still not sure",
    xpReward: 30,
    exercises: [
      {
        id: "e22-5-intro",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "Not knowing is fine",
          body: "Some people identify their type in minutes. Others take months or years. Both are valid. The Enneagram is a self-observation practice, not a label generator. If you are still unsure, you are doing it right. The exploration IS the practice.",
        },
      },
      {
        id: "e22-5-sp1",
        difficulty: 2,
        content: {
          type: "socratic-prompt",
          question: "Right now, how certain are you of your type on a scale of 1 to 10? What would move you from where you are to one point higher?",
          reflection: "Certainty is not the goal. Self-honesty is.",
          revealLabel: "One more thing",
          conceptTitle: "The type that offends you",
          conceptBody: "Riso and Hudson noticed that people often have the strongest negative reaction to descriptions of their own type. If a type description makes you defensive ('that's definitely not me'), it is worth spending more time with. The defense itself is information.",
        },
      },
      {
        id: "e22-5-fr1",
        difficulty: 3,
        content: {
          type: "free-recall",
          prompt: "If you had to explain your core motivation in one sentence to someone who has never heard of the Enneagram, what would you say?",
          keyTerms: ["I want", "I need", "I fear", "I avoid", "matters", "always"],
          minWords: 15,
          modelAnswer: "Your one-sentence core motivation is the most useful self-knowledge you will build in this app. It does not need a type number attached to it. The number is a shorthand. The sentence is the truth.",
        },
      },
    ],
  },
];
