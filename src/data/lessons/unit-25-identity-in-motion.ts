// Unit 25: Identity in Motion
//
// Universal unit. Challenges the fixed self-concept users built in the
// Enneagram tier. Key framing: your type STAYS. Your relationship to it
// changes. You do not outgrow it. You learn to hold it with more space.

import type { Lesson } from "@/types/lessons";

export const unit25Lessons: Lesson[] = [
  {
    id: "identity-river",
    unitId: "identity-in-motion",
    order: 1,
    title: "You are a pattern, not a snapshot",
    subtitle: "Identity is a river, not a rock",
    xpReward: 30,
    exercises: [
      { id: "e25-1-i", difficulty: 1, content: { type: "concept-intro", title: "Everything changes, including you", body: "You are not the same person you were five years ago. Your values shifted, your relationships changed, your understanding deepened. But your core type stayed. The Enneagram type is the riverbed. The water, your behaviors, your moods, your growth, flows over it. The bed shapes the flow. The flow shapes the bed. Neither is fixed." } },
      { id: "e25-1-s", difficulty: 2, content: { type: "socratic-prompt", question: "How has your relationship to your type changed since you first learned it? Do you hold it differently now?", reflection: "The type does not change. The grip does. Growth is not becoming a different type. It is loosening the pattern's hold on you.", revealLabel: "See the distinction", conceptTitle: "Loosening, not leaving", conceptBody: "Riso and Hudson described 9 'levels of development' for each type, from healthy to average to unhealthy. Growth means moving toward health within your type, not moving to a different type. The 1 becomes more serene, not less principled. The 7 becomes more present, not less joyful. The pattern stays. The suffering decreases." } },
      { id: "e25-1-f", difficulty: 3, content: { type: "free-recall", prompt: "How would you describe the difference between 'you at your best' and 'you when the pattern is running you'? Both are still your type.", keyTerms: ["best", "worst", "pattern", "same type", "different"], minWords: 20, modelAnswer: "The healthy and unhealthy versions of your type share the same motivation. The difference is awareness, flexibility, and how much suffering the pattern creates. Growth is not escape. It is spaciousness." } },
    ],
  },
  {
    id: "identity-story",
    unitId: "identity-in-motion",
    order: 2,
    title: "Your life is a story you are still writing",
    subtitle: "You are both the narrator and the character",
    xpReward: 30,
    exercises: [
      { id: "e25-2-i", difficulty: 1, content: { type: "concept-intro", title: "You narrate yourself into existence", body: "The story you tell about your life is not just a description of what happened. It shapes what happens next. If you tell yourself 'I am someone who always gets abandoned,' you will organize your life around that plot. The Enneagram type is the genre. The specific chapters are up to you." } },
      { id: "e25-2-s", difficulty: 2, content: { type: "socratic-prompt", question: "If your life so far were a book, what would the title be? And what title would you give the next chapter?", reflection: "The title you give the past reveals your narrative lens. The title you give the future reveals where you are headed.", revealLabel: "The practice", conceptTitle: "Reauthoring, not rewriting", conceptBody: "You cannot change what happened. But you can change the story you tell about it. Not by lying, not by positive thinking, but by asking: is this the only way to read these events? Your type predisposes you to a particular genre (tragedy for 4, thriller for 6, adventure for 7). Noticing the genre is the first step toward choosing it instead of being chosen by it." } },
      { id: "e25-2-f", difficulty: 3, content: { type: "free-recall", prompt: "Write the first sentence of the 'next chapter' of your life. Make it a sentence you actually want to live.", keyTerms: ["next", "chapter", "want", "begin", "I"], minWords: 10, modelAnswer: "You just wrote a line of your own narrative. That is not just an exercise. It is an act of authorship. The Enneagram gives you the character. You write the plot." } },
    ],
  },
  {
    id: "identity-paradox",
    unitId: "identity-in-motion",
    order: 3,
    title: "Holding two truths at once",
    subtitle: "Maturity is the ability to hold paradox",
    xpReward: 30,
    exercises: [
      { id: "e25-3-i", difficulty: 1, content: { type: "concept-intro", title: "Both things can be true", body: "You are a specific Enneagram type AND you are more than any label. Your patterns are real AND you are not defined by them. You need your defenses AND you can outgrow your dependence on them. Growth is not picking one side. It is learning to hold both." } },
      { id: "e25-3-s", difficulty: 2, content: { type: "socratic-prompt", question: "What is one contradiction about yourself that you have stopped trying to resolve?", reflection: "The contradictions are not bugs. They are the most interesting parts of who you are.", revealLabel: "See the insight", conceptTitle: "Paradox as maturity", conceptBody: "Young thinking wants one answer. Mature thinking holds tension. Your type creates specific paradoxes (the 2 who needs to be needed, the 5 who craves connection but avoids it, the 8 who protects by pushing away). Seeing the paradox is not the same as solving it. The seeing IS the solution." } },
      { id: "e25-3-f", difficulty: 3, content: { type: "free-recall", prompt: "Name one way your type both helps and hurts you. Can you hold both of those truths without needing to fix either one?", keyTerms: ["helps", "hurts", "both", "true", "hold"], minWords: 15, modelAnswer: "This is the central practice of self-knowledge: seeing the whole pattern, the gift and the cost, without trying to amputate either. Your type is not a disease to cure. It is a structure to inhabit with more awareness." } },
    ],
  },
];
