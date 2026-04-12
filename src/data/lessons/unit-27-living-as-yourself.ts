// Unit 27: Living as Yourself
//
// Bridge unit. The user has mapped their type, explored their core question,
// and built the observer. This unit consolidates: what does it look like to
// actually LIVE from self-knowledge? Not as a project. Not as optimization.
// Just as a way of being.
//
// This unit intentionally builds UP the sense of self — "you know who you
// are, now live from that" — so the later units (28-30) can investigate
// whether that self is as solid as it seems. The arc only works if the
// identity is first felt as real and valuable.

import type { Lesson } from "@/types/lessons";

export const unit27Lessons: Lesson[] = [
  {
    id: "living-alignment",
    unitId: "living-as-yourself",
    order: 1,
    title: "What alignment actually feels like",
    subtitle: "Not perfection. Just less friction.",
    xpReward: 30,
    // Pattern A: concept-intro → multiple-choice → sorting → scenario → free-recall
    exercises: [
      {
        id: "e27-1-i",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "You know your pattern. Now what?",
          body: "You have mapped your type, your instinct, your core question, your defenses. That is a lot of self-knowledge. But knowledge about yourself is not the same as living from it. Living from it means: when the pattern fires, you notice it faster. When the defense activates, you hold it more lightly. When the core fear whispers, you hear it as a whisper instead of as the truth. That is alignment. Not perfection. Just less automatic suffering.",
        },
      },
      {
        id: "e27-1-mc",
        difficulty: 2,
        content: {
          type: "multiple-choice",
          question: "Alignment is best described as which of the following?",
          options: [
            "A peak state of clarity and self-expression, achieved through sustained effort",
            "The absence of your type's pattern — when the defense finally stops firing",
            "A quieter relationship to your pattern, where it still runs but has less grip on you",
            "The point at which self-knowledge becomes fully integrated and complete",
          ],
          correctIndex: 2,
          explanation:
            "Alignment is not the elimination of your pattern. The pattern keeps running. What changes is your relationship to it: you notice it faster, hold it more lightly, hear the fear as a whisper instead of as truth. It is quieter, not more dramatic.",
        },
      },
      {
        id: "e27-1-so",
        difficulty: 2,
        content: {
          type: "sorting",
          instruction:
            "Sort these moments into 'likely aligned' or 'likely performing' — based on whether the inner experience suggests less friction or more management.",
          categories: ["Likely aligned", "Likely performing"],
          items: [
            {
              text: "You exhale in the car after a party and feel your shoulders drop",
              categoryIndex: 0,
            },
            {
              text: "You laugh a little too loudly to signal you are relaxed",
              categoryIndex: 1,
            },
            {
              text: "You say something true that you did not plan to say",
              categoryIndex: 0,
            },
            {
              text: "You agree with someone to avoid how disagreement would land",
              categoryIndex: 1,
            },
            {
              text: "You sit quietly and feel no urge to fill the silence",
              categoryIndex: 0,
            },
            {
              text: "You monitor how you are coming across mid-conversation",
              categoryIndex: 1,
            },
          ],
        },
      },
      {
        id: "e27-1-sc",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario:
            "You are at a party and realize you have been performing all evening: laughing a little too loudly, agreeing with things you do not actually believe, monitoring how others perceive you. On the drive home, you exhale and feel your shoulders drop. In the silence of the car, you feel more like yourself than you did all night.",
          question: "What does this contrast reveal about alignment?",
          options: [
            "You are an introvert and should avoid parties",
            "The performing self is fake and the car self is the real you",
            "Alignment often arrives in the quiet, unmanaged moments — not in the effortful ones",
            "Social situations always prevent you from being authentic",
          ],
          correctIndex: 2,
          explanation:
            "Alignment is not a dramatic experience. It is what remains when the managing stops. Most people expect it to feel like a breakthrough. In practice, it feels more like a sigh. The moments where nothing is being performed are the moments you are closest to yourself.",
        },
      },
      {
        id: "e27-1-fr",
        difficulty: 3,
        content: {
          type: "free-recall",
          prompt:
            "Describe what 'being yourself without effort' looks like on a Tuesday. Not the ideal version. The real one.",
          keyTerms: ["ordinary", "easy", "natural", "just", "simple"],
          minWords: 20,
          modelAnswer:
            "The real version is always less impressive and more true than the ideal. Living as yourself is not a destination you arrive at. It is a quality of attention you bring to what is already happening.",
        },
      },
    ],
  },
  {
    id: "living-values",
    unitId: "living-as-yourself",
    order: 2,
    title: "Acting from values, not from fear",
    subtitle: "The difference changes everything",
    xpReward: 30,
    // Pattern B: concept-intro → fill-in-blank → matching-pairs → scenario → socratic-prompt
    exercises: [
      {
        id: "e27-2-i",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "Every action has two possible engines",
          body: "You can do the same thing from two completely different places. You can be generous because you value generosity, or because you fear being unloved. You can work hard because the work matters, or because stopping feels like death. The behavior looks identical. The inner experience is completely different. Your type tends to default to the fear engine. The practice is finding the values engine for the same behavior.",
        },
      },
      {
        id: "e27-2-fib",
        difficulty: 2,
        content: {
          type: "fill-in-blank",
          sentence:
            "When two people do the identical outward action but from different internal sources, it is the ___ that differs — not the behavior.",
          options: ["result", "fuel", "pattern", "outcome"],
          correctIndex: 1,
          explanation:
            "The behavior can be identical — both people stay late, both people help, both people speak up. What differs is the fuel: one acts from values, the other from fear of what happens if they don't. The inner experience is completely different even when the action is the same.",
        },
      },
      {
        id: "e27-2-mp",
        difficulty: 2,
        content: {
          type: "matching-pairs",
          instruction:
            "Match each fear-driven behavior to its values-driven counterpart — same action, different engine.",
          pairs: [
            {
              left: "Helping because you are afraid of being seen as selfish",
              right: "Helping because contributing to others matters to you",
            },
            {
              left: "Working hard because stopping feels dangerous",
              right: "Working hard because the work itself is meaningful",
            },
            {
              left: "Being honest because you fear being caught in a lie",
              right: "Being honest because integrity is something you value",
            },
            {
              left: "Staying quiet to avoid conflict",
              right: "Choosing silence because it is what the moment calls for",
            },
          ],
        },
      },
      {
        id: "e27-2-sc",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario:
            "You stay late at work every night. Your manager praises your dedication. But when you are honest with yourself, you realize you are not staying because you love the work. You are staying because you are terrified of what it means if you stop. The behavior is identical from the outside. The inner experience is completely different.",
          question: "What is the most important insight here?",
          options: [
            "You should stop staying late to prove you are not driven by fear",
            "The behavior itself is the problem and needs to change",
            "The same action can come from values or from fear — and the inner experience, not the visible behavior, is what determines whether it costs you",
            "Fear is always a bad motivator and should be eliminated",
          ],
          correctIndex: 2,
          explanation:
            "You do not need to change what you do. You need to notice why you are doing it. When you act from values instead of fear, the behavior might look the same, but the suffering drops. The action stays. The fuel changes.",
        },
      },
      {
        id: "e27-2-sp",
        difficulty: 3,
        content: {
          type: "socratic-prompt",
          question:
            "Pick one thing you do every day. Are you doing it because you want to, or because you are afraid of what happens if you don't?",
          reflection:
            "This is not a trick question. The answer might be 'both.' But knowing the ratio matters.",
          revealLabel: "The shift",
          conceptTitle: "Same action, different fuel",
          conceptBody:
            "You do not need to change what you do. You need to notice WHY you are doing it. When the 1 acts from integrity instead of from fear of being wrong, the behavior looks the same but the inner suffering drops. When the 7 pursues something new from curiosity instead of from avoidance, the experience deepens. The action stays. The fuel changes. That is what living as yourself looks like.",
        },
      },
    ],
  },
  {
    id: "living-enough",
    unitId: "living-as-yourself",
    order: 3,
    title: "You are already who you need to be",
    subtitle: "This is the foundation for everything that comes next",
    xpReward: 30,
    // Pattern C: concept-intro → multiple-choice → fill-in-blank → scenario → sorting
    exercises: [
      {
        id: "e27-3-i",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "Self-knowledge is not self-improvement",
          body: "There is a subtle trap in all of this: using self-knowledge as another way to fix yourself. Learning your type to become a 'better' version. Mapping your defenses to eliminate them. This misses the point entirely. You are not broken. Your pattern is not a bug. The Enneagram does not show you what is wrong with you. It shows you the shape of your particular way of being human. That shape is not a problem to solve. It is a structure to inhabit with more awareness.",
        },
      },
      {
        id: "e27-3-mc",
        difficulty: 2,
        content: {
          type: "multiple-choice",
          question:
            "Someone uses their Enneagram type to build a detailed plan for eliminating their core defense. Which of the following best describes what is happening?",
          options: [
            "They are doing the work correctly — identifying patterns is the first step to removing them",
            "They have misunderstood the purpose — self-knowledge is being used as a more sophisticated form of self-rejection",
            "Their approach will work, but will take longer than they expect",
            "The defense is the problem, and eliminating it should always be the goal",
          ],
          correctIndex: 1,
          explanation:
            "The trap is subtle: using self-knowledge as ammunition against yourself. The Enneagram does not show you what is wrong. It shows you the shape of your particular way of being human. That shape is not a bug to eliminate. It is a structure to inhabit with more awareness.",
        },
      },
      {
        id: "e27-3-fib",
        difficulty: 2,
        content: {
          type: "fill-in-blank",
          sentence:
            "The goal of self-knowledge in this app is not to become a better version of yourself, but to ___ the version you already are with more awareness.",
          options: ["replace", "escape", "inhabit", "audit"],
          correctIndex: 2,
          explanation:
            "You are not a project. You are a person. The self-knowledge on offer here is not about replacement or optimization. It is about inhabiting what is already here — your particular shape, your particular way of being human — with greater clarity and less automatic suffering.",
        },
      },
      {
        id: "e27-3-sc",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario:
            "You finish a personality workshop feeling energized. You make a list of everything you want to change about yourself: be less reactive, be more present, stop procrastinating, express anger more cleanly. A week later, you realize the list is itself your pattern running — using self-knowledge as another self-improvement project.",
          question: "What trap does this situation illustrate?",
          options: [
            "Self-improvement is always harmful and should be avoided",
            "The list was fine; the problem is that you did not follow through",
            "Using self-knowledge as a tool to fix yourself can become another expression of the very pattern it was supposed to address",
            "Personality workshops give false hope and are not useful",
          ],
          correctIndex: 2,
          explanation:
            "Self-knowledge is not self-improvement. The subtle trap is using everything you learn as ammunition against yourself. You are not broken. Your pattern is not a bug. The point is not to become a better version. It is to inhabit the version you already are with more awareness.",
        },
      },
      {
        id: "e27-3-so",
        difficulty: 2,
        content: {
          type: "sorting",
          instruction:
            "Sort these uses of self-knowledge into 'self-acceptance' or 'self-improvement trap' — based on whether the underlying orientation is toward inhabiting yourself or fixing yourself.",
          categories: ["Self-acceptance", "Self-improvement trap"],
          items: [
            {
              text: "Noticing your defense with curiosity rather than judgment",
              categoryIndex: 0,
            },
            {
              text: "Building a 90-day plan to eliminate your core pattern",
              categoryIndex: 1,
            },
            {
              text: "Recognizing a familiar reaction and holding it more lightly",
              categoryIndex: 0,
            },
            {
              text: "Using your type's growth line as a target to hit this quarter",
              categoryIndex: 1,
            },
            {
              text: "Feeling the fear as a whisper instead of as truth",
              categoryIndex: 0,
            },
            {
              text: "Adding 'fix core wound' to your personal development backlog",
              categoryIndex: 1,
            },
          ],
        },
      },
    ],
  },
];
