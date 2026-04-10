// Unit 30: Holding Both
//
// Integration unit. The capstone of the philosophical arc. The user has:
// 1. Built a strong identity (Enneagram + cognitive functions)
// 2. Explored whether that identity is correct (Unit 22)
// 3. Learned to observe their patterns (Unit 23)
// 4. Connected their type to philosophical questions (Unit 24)
// 5. Understood identity as process (Unit 25)
// 6. Done the examined life (Unit 26)
// 7. Learned to live from values instead of fear (Unit 27)
// 8. Looked for the looker and found openness (Unit 28)
// 9. Investigated whether the self is fixed (Unit 29)
//
// This unit integrates everything: the self is real AND it is not fixed.
// The type is true AND you are more than the type. Both simultaneously.
// The app gives you a map. Wisdom is knowing you are not the map.

import type { Lesson } from "@/types/lessons";

export const unit30Lessons: Lesson[] = [
  {
    id: "both-map-territory",
    unitId: "holding-both",
    order: 1,
    title: "The map and the territory",
    subtitle: "The Enneagram is a map. You are the territory.",
    xpReward: 40,
    exercises: [
      { id: "e30-1-i", difficulty: 1, content: { type: "concept-intro", title: "Every map is useful. No map is the thing itself.", body: "The Enneagram gave you a map of your motivation structure. The Big Five gave you a map of your traits. The cognitive functions gave you a map of how you think. These maps are genuinely useful. They help you navigate yourself. But you are not a map. You are the territory. The territory is messier, more alive, more contradictory, and more beautiful than any map can capture. Wisdom is using the map without mistaking it for the land." } },
      { id: "e30-1-s", difficulty: 2, content: { type: "socratic-prompt", question: "Has there been a moment in this app where you felt reduced by a description? Where the map felt too small for what you actually are?", reflection: "That feeling of being 'more than the description' is not a failure of the description. It is evidence that you are the territory, not the map.", revealLabel: "Holding the distinction", conceptTitle: "Use the map. Be the territory.", conceptBody: "You can use the Enneagram every day and still know that you are not captured by it. You can study your type deeply and still feel the spaciousness beyond it. These are not contradictions. They are what mature self-knowledge looks like: precise about the patterns, humble about the totality." } },
      { id: "e30-1-f", difficulty: 3, content: { type: "free-recall", prompt: "What is one thing about you that no personality framework has captured? Something that exists in the territory but not on any map?", keyTerms: ["beyond", "more", "can't", "capture", "map", "just", "real"], minWords: 20, modelAnswer: "Whatever you just described is as real as your type number. The map is useful. The territory is alive. You are the territory." } },
    ],
  },
  {
    id: "both-paradox",
    unitId: "holding-both",
    order: 2,
    title: "You are a type. You are not a type.",
    subtitle: "Both are true. Both are useful.",
    xpReward: 40,
    exercises: [
      { id: "e30-2-i", difficulty: 1, content: { type: "concept-intro", title: "The final integration", body: "Here is everything at once: you are a specific Enneagram type with a real motivation structure, real defenses, and a real pattern that will never fully disappear. AND you are the open awareness in which that pattern arises and passes, which is not confined to any type, not fixed, and not threatened by anything your personality does. Both are true. At the same time. Always. The type is the wave. The awareness is the ocean. The wave is real. It just isn't separate from the ocean." } },
      { id: "e30-2-s", difficulty: 2, content: { type: "socratic-prompt", question: "Can you be your type and be free of your type at the same time? What would that look like today?", reflection: "Freedom from the type is not the same as not having the type. It is having the type without being had by it.", revealLabel: "The practice going forward", conceptTitle: "This is the ongoing practice", conceptBody: "There is no graduation from this. There is no moment where you 'arrive' and the pattern dissolves. The practice is daily, unglamorous, and always available: notice the pattern, feel its pull, remember the spaciousness behind it, choose. Sometimes you will choose the pattern. That is fine. The noticing is what matters, not the choosing. Over years, the noticing becomes more natural and the grip becomes lighter. Not zero. Lighter. That is what growth looks like in the Enneagram. Not transformation. Lightening." } },
      { id: "e30-2-f", difficulty: 3, content: { type: "free-recall", prompt: "What is the single most useful thing you have learned about yourself in this app? And what is one thing you learned that is bigger than yourself?", keyTerms: ["learned", "useful", "bigger", "pattern", "awareness", "both"], minWords: 20, modelAnswer: "The thing about yourself is the map. The thing bigger than yourself is the territory. You need both. The map gets you through the day. The territory reminds you what day it is." } },
    ],
  },
  {
    id: "both-continue",
    unitId: "holding-both",
    order: 3,
    title: "What now",
    subtitle: "The practice continues. It just looks different.",
    xpReward: 40,
    exercises: [
      { id: "e30-3-i", difficulty: 1, content: { type: "concept-intro", title: "You are not done. You are just starting differently.", body: "This is the end of the structured learning path, but it is not the end of the practice. The daily check-ins, the pattern noticing, the 10-second looking, the philosophical provocations, these continue. The difference is that now you hold them in a bigger context. You know your type. You know your observer. You know the question behind the question. And you know that the one asking is bigger than the answer. That is enough. That is more than most people ever get. Use it lightly." } },
      { id: "e30-3-s", difficulty: 2, content: { type: "socratic-prompt", question: "If the daily practice continues but nothing dramatic changes, would that be okay? What if 'slightly more aware' is the entire result?", reflection: "If your type demanded more (a breakthrough, a transformation, an arrival), notice that demand as one more expression of the pattern. Then let it go.", revealLabel: "The last word", conceptTitle: "Slightly more aware is everything", conceptBody: "The entire arc of this app, from the first quiz question to this sentence, has been about one thing: becoming slightly more aware of what is already happening. That is not a small achievement. That is the practice that every contemplative tradition for 2,500 years has pointed toward. You did not need to go on a retreat, join a monastery, or read a library. You just needed to keep showing up, keep looking, and keep being honest. You did that. The practice continues. It looks like Tuesday." } },
      { id: "e30-3-f", difficulty: 3, content: { type: "free-recall", prompt: "Write one sentence you want to carry with you from this entire experience. Not a lesson. A truth.", keyTerms: ["truth", "carry", "remember", "I", "am", "practice", "aware"], minWords: 10, modelAnswer: "That sentence is yours. Not your type's. Not the app's. Yours. Keep it somewhere you will see it. The practice continues." } },
    ],
  },
];
