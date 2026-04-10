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
      { id: "e25-1-sc1", difficulty: 2, content: { type: "scenario", scenario: "A close friend tells you that you have changed a lot over the past few years. You feel proud for a moment, but then a familiar tension creeps in: the same old frustration with yourself, the same core worry you have carried since childhood. The surface changed. The undertow did not.", question: "What does this experience most accurately reveal about personal growth?", options: ["Growth means the core pattern eventually disappears if you work hard enough", "The pattern stays, but your awareness of it and relationship to it can change", "If the same worry keeps returning, no real growth has happened", "True change requires replacing your personality with a healthier one"], correctIndex: 1, explanation: "Growth within the Enneagram is not about eliminating the pattern. It is about holding it with more awareness and less suffering. The riverbed stays. The flow changes." } },
      { id: "e25-1-fr2", difficulty: 3, content: { type: "free-recall", prompt: "Think of a moment when you caught yourself running on autopilot, doing the same thing your type always does. What happened when you noticed it? Did noticing change anything, even slightly?", keyTerms: ["noticed", "autopilot", "pattern", "awareness", "shifted", "caught"], minWords: 20, modelAnswer: "The moment of noticing is itself the growth. You do not need to stop the pattern. The awareness that you are in the pattern is the beginning of a different relationship to it. That is the river reshaping the riverbed." } },
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
      { id: "e25-2-sc1", difficulty: 2, content: { type: "scenario", scenario: "You are telling a new friend the story of a difficult breakup from years ago. Midway through, you realize you are telling it the exact same way you always do: same villain, same lesson, same ending. It occurs to you that this version might not be the only way to read what happened.", question: "What does this realization point to about personal narratives?", options: ["The original story was probably wrong and needs to be corrected", "Retelling the same story means you have not healed from the event", "The narrative you repeat shapes your identity, and you can choose to reauthor it without changing the facts", "You should stop telling the story entirely to move on"], correctIndex: 2, explanation: "You cannot change what happened. But you can change the story you tell about it. Reauthoring is not lying. It is noticing you have been reading one interpretation as the only interpretation, and recognizing you have choices." } },
      { id: "e25-2-fr2", difficulty: 3, content: { type: "free-recall", prompt: "What is one story you tell about yourself that might be more of a habit than a truth? What would a different, equally honest version of that story sound like?", keyTerms: ["story", "habit", "different", "version", "honest", "narrative"], minWords: 20, modelAnswer: "The stories that feel most automatic are often the ones most worth examining. Not because they are false, but because they may be incomplete. A different reading of the same events can open up possibilities the original narrative foreclosed." } },
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
      { id: "e25-3-sc1", difficulty: 2, content: { type: "scenario", scenario: "You are having dinner with someone who knows you well. They say something that is both a compliment and a criticism: 'You care so deeply about things that it exhausts everyone around you, including you.' You feel seen and stung at the same time. You want to defend yourself and also agree.", question: "What is the most mature response to this kind of feedback?", options: ["Reject the criticism and hold onto the compliment", "Accept the criticism and downplay the compliment", "Hold both the gift and the cost without needing to resolve the contradiction", "Decide to change the trait they described"], correctIndex: 2, explanation: "Your pattern is both a gift and a cost. Maturity is not resolving the contradiction. It is inhabiting it with open eyes. The same quality that makes you extraordinary is the one that makes you suffer. That is not a problem to fix. It is a paradox to hold." } },
      { id: "e25-3-fr2", difficulty: 3, content: { type: "free-recall", prompt: "What is one contradiction in yourself that you have slowly learned to live with instead of trying to resolve? How did you arrive at that acceptance?", keyTerms: ["contradiction", "live with", "accept", "both", "tension", "learned"], minWords: 20, modelAnswer: "The ability to sit with unresolved tension is one of the clearest signs of psychological maturity. The paradox does not go away. You just stop needing it to. That is the space where growth happens." } },
    ],
  },
];
