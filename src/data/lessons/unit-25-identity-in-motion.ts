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
      // Pattern A: concept-intro → multiple-choice → sorting → scenario → free-recall
      {
        id: "e25-1-i", difficulty: 1,
        content: {
          type: "concept-intro",
          title: "Everything changes, including you",
          body: "You are not the same person you were five years ago. Your values shifted, your relationships changed, your understanding deepened. But your core type stayed. The Enneagram type is the riverbed. The water — your behaviors, your moods, your growth — flows over it. The bed shapes the flow. The flow shapes the bed. Neither is fixed."
        }
      },
      {
        id: "e25-1-mc", difficulty: 2,
        content: {
          type: "multiple-choice",
          question: "You have done years of self-work: therapy, reflection, reading, practice. Yet in a moment of stress, you react exactly the way you did at twenty-two — the same pattern, the same flavor. What does this most accurately reveal about growth?",
          options: [
            "The self-work has not been effective and needs to be reconsidered",
            "Stress strips away growth and reveals your 'true self,' which has not changed",
            "The pattern remains; what changes is how quickly you can notice it and what you do with it next",
            "Some people are capable of real change and some are not — stress reveals which category you are in"
          ],
          correctIndex: 2,
          explanation: "Growth is not the elimination of the pattern. The riverbed does not disappear. Growth shows up in the speed of recovery, in the ability to catch yourself mid-pattern, in what you do in the moment after the reaction. The pattern persisting is not failure. The noticing is the change."
        }
      },
      {
        id: "e25-1-so", difficulty: 2,
        content: {
          type: "sorting",
          instruction: "Sort each statement about change into whether it describes growth within your type or a misunderstanding of how the Enneagram works.",
          categories: ["Genuine growth within the type", "Misunderstanding of how change works"],
          items: [
            { text: "I still feel the pull toward control, but I can pause before acting on it", categoryIndex: 0 },
            { text: "I have completely stopped needing approval — that pattern is gone", categoryIndex: 1 },
            { text: "The same fear shows up, but I can now name it instead of being run by it", categoryIndex: 0 },
            { text: "I must be a different type now because I do not relate to my original description", categoryIndex: 1 },
            { text: "I still go to my default pattern under stress, but I recover faster than I used to", categoryIndex: 0 },
            { text: "If I keep working on myself, the core pattern will eventually disappear", categoryIndex: 1 }
          ]
        }
      },
      {
        id: "e25-1-sc", difficulty: 2,
        content: {
          type: "scenario",
          scenario: "A close friend tells you that you have changed a lot over the past few years. You feel proud for a moment, but then a familiar tension creeps in: the same old frustration with yourself, the same core worry you have carried since childhood. The surface changed. The undertow did not.",
          question: "What does this experience most accurately reveal about personal growth?",
          options: [
            "Growth means the core pattern eventually disappears if you work hard enough",
            "The pattern stays, but your awareness of it and relationship to it can change",
            "If the same worry keeps returning, no real growth has happened",
            "True change requires replacing your personality with a healthier one"
          ],
          correctIndex: 1,
          explanation: "Growth within the Enneagram is not about eliminating the pattern. It is about holding it with more awareness and less suffering. The riverbed stays. The flow changes."
        }
      },
      {
        id: "e25-1-f", difficulty: 3,
        content: {
          type: "free-recall",
          prompt: "How would you describe the difference between 'you at your best' and 'you when the pattern is running you'? Both are still your type.",
          keyTerms: ["best", "worst", "pattern", "same type", "different"],
          minWords: 20,
          modelAnswer: "The healthy and unhealthy versions of your type share the same motivation. The difference is awareness, flexibility, and how much suffering the pattern creates. Growth is not escape. It is spaciousness."
        }
      },
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
      // Pattern B: concept-intro → fill-in-blank → matching-pairs → scenario → socratic-prompt
      {
        id: "e25-2-i", difficulty: 1,
        content: {
          type: "concept-intro",
          title: "You narrate yourself into existence",
          body: "The story you tell about your life is not just a description of what happened. It shapes what happens next. If you tell yourself 'I am someone who always gets abandoned,' you will organize your life around that plot. The Enneagram type is the genre. The specific chapters are up to you."
        }
      },
      {
        id: "e25-2-fib", difficulty: 2,
        content: {
          type: "fill-in-blank",
          sentence: "You cannot change what happened, but you can change the ___ you tell about it — not by lying, but by asking whether there is another equally honest way to read the events.",
          options: ["story", "ending", "feeling"],
          correctIndex: 0,
          explanation: "Reauthoring is not positive thinking or denial. It is recognizing that any set of events can be read through more than one lens. The facts stay. The narrative interpretation has more flexibility than we usually allow."
        }
      },
      {
        id: "e25-2-mp", difficulty: 2,
        content: {
          type: "matching-pairs",
          instruction: "Match each Enneagram type to the narrative genre their pattern tends to cast them in.",
          pairs: [
            { left: "Type 4", right: "Tragic romance — always on the outside of belonging" },
            { left: "Type 6", right: "Thriller — threat is always around the next corner" },
            { left: "Type 7", right: "Adventure — the next horizon holds what this moment cannot" },
            { left: "Type 1", right: "Redemption arc — if only the world could be set right" },
            { left: "Type 2", right: "Devotion story — love is proven through sacrifice" },
            { left: "Type 9", right: "Pastoral — peace at all costs, conflict written out of the plot" },
          ]
        }
      },
      {
        id: "e25-2-sc", difficulty: 2,
        content: {
          type: "scenario",
          scenario: "You are telling a new friend the story of a difficult breakup from years ago. Midway through, you realize you are telling it the exact same way you always do: same villain, same lesson, same ending. It occurs to you that this version might not be the only way to read what happened.",
          question: "What does this realization point to about personal narratives?",
          options: [
            "The original story was probably wrong and needs to be corrected",
            "Retelling the same story means you have not healed from the event",
            "The narrative you repeat shapes your identity, and you can choose to reauthor it without changing the facts",
            "You should stop telling the story entirely to move on"
          ],
          correctIndex: 2,
          explanation: "You cannot change what happened. But you can change the story you tell about it. Reauthoring is not lying. It is noticing you have been reading one interpretation as the only interpretation, and recognizing you have choices."
        }
      },
      {
        id: "e25-2-s", difficulty: 3,
        content: {
          type: "socratic-prompt",
          question: "If your life so far were a book, what would the title be? And what title would you give the next chapter?",
          reflection: "The title you give the past reveals your narrative lens. The title you give the future reveals where you are headed.",
          revealLabel: "The practice",
          conceptTitle: "Reauthoring, not rewriting",
          conceptBody: "You cannot change what happened. But you can change the story you tell about it. Not by lying, not by positive thinking, but by asking: is this the only way to read these events? Your type predisposes you to a particular genre (tragedy for 4, thriller for 6, adventure for 7). Noticing the genre is the first step toward choosing it instead of being chosen by it."
        }
      },
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
      // Pattern C: concept-intro → multiple-choice → fill-in-blank → scenario → sorting
      {
        id: "e25-3-i", difficulty: 1,
        content: {
          type: "concept-intro",
          title: "Both things can be true",
          body: "You are a specific Enneagram type AND you are more than any label. Your patterns are real AND you are not defined by them. You need your defenses AND you can outgrow your dependence on them. Growth is not picking one side. It is learning to hold both."
        }
      },
      {
        id: "e25-3-mc", difficulty: 2,
        content: {
          type: "multiple-choice",
          question: "Someone tells you that your greatest strength — the quality that makes you most valuable to others — is the same quality that causes you the most suffering. They are not criticizing you. They are just observing. What is the most mature response to this observation?",
          options: [
            "Thank them, then work on eliminating the part that causes suffering while keeping the part that is useful",
            "Disagree — a genuine strength should not come with costs built in",
            "Hold both truths simultaneously: the gift and the cost are the same thing, and maturity is knowing that",
            "Conclude that the strength is not worth it if it also causes suffering"
          ],
          correctIndex: 2,
          explanation: "Young thinking wants to keep the benefit and eliminate the cost. Mature thinking recognizes they are the same thing. The 1's precision is the same quality as the self-criticism. The 8's protection is the same quality as the aggression. You cannot extract one and leave the other. You can only hold both with more awareness."
        }
      },
      {
        id: "e25-3-fib", difficulty: 2,
        content: {
          type: "fill-in-blank",
          sentence: "Psychological maturity is not the absence of contradiction — it is the ability to hold ___ without needing to resolve it.",
          options: ["tension", "certainty", "agreement"],
          correctIndex: 0,
          explanation: "The capacity to sit with unresolved tension is one of the most reliable markers of psychological development. This is not passivity. It is a hard-won skill — the ability to let two true things coexist without forcing one out."
        }
      },
      {
        id: "e25-3-sc", difficulty: 2,
        content: {
          type: "scenario",
          scenario: "You are having dinner with someone who knows you well. They say something that is both a compliment and a criticism: 'You care so deeply about things that it exhausts everyone around you, including you.' You feel seen and stung at the same time. You want to defend yourself and also agree.",
          question: "What is the most mature response to this kind of feedback?",
          options: [
            "Reject the criticism and hold onto the compliment",
            "Accept the criticism and downplay the compliment",
            "Hold both the gift and the cost without needing to resolve the contradiction",
            "Decide to change the trait they described"
          ],
          correctIndex: 2,
          explanation: "Your pattern is both a gift and a cost. Maturity is not resolving the contradiction. It is inhabiting it with open eyes. The same quality that makes you extraordinary is the one that makes you suffer. That is not a problem to fix. It is a paradox to hold."
        }
      },
      {
        id: "e25-3-so", difficulty: 2,
        content: {
          type: "sorting",
          instruction: "Sort each statement into whether it reflects mature paradox-holding or immature either/or thinking.",
          categories: ["Mature — holds paradox", "Immature — forces a single answer"],
          items: [
            { text: "My need for connection and my need for solitude are both real", categoryIndex: 0 },
            { text: "I must be either too sensitive or not sensitive enough — I cannot be both", categoryIndex: 1 },
            { text: "I can love someone and also be genuinely frustrated with them", categoryIndex: 0 },
            { text: "If my strength also causes harm, it must not really be a strength", categoryIndex: 1 },
            { text: "I can know my pattern and still be surprised by it", categoryIndex: 0 },
            { text: "Real self-knowledge means never being caught off guard by yourself", categoryIndex: 1 }
          ]
        }
      },
    ],
  },
];
