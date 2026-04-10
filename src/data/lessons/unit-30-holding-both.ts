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
      { id: "e30-1-sc1", difficulty: 2, content: { type: "scenario", scenario: "You are explaining your Enneagram type to a close friend. They listen carefully, then say: 'That is interesting, but it does not capture the thing I love most about you.' You feel a flash of something: relief, maybe. The part of you they love is real. And the map did not include it.", question: "What does this moment reveal about the relationship between maps and territory?", options: ["The Enneagram is incomplete and should be replaced with a better framework", "Your friend does not understand personality systems well enough", "Every map is useful, but no map captures the full territory of a person; the parts the map misses are as real as the parts it names", "Personality frameworks only describe problems, not strengths"], correctIndex: 2, explanation: "A map that captured everything would be as large as the territory and therefore useless. The value of a map is its selectivity. The wisdom is remembering that the territory, you, is always richer than any description of it. Use the map. Be the territory." } },
      { id: "e30-1-fr2", difficulty: 3, content: { type: "free-recall", prompt: "What is the most alive, irreducible thing about you that you would never want flattened into a category? The part that no quiz could ever reach?", keyTerms: ["alive", "irreducible", "category", "beyond", "quiz", "real", "me"], minWords: 20, modelAnswer: "That thing you just described is the territory. It is what makes you a person instead of a profile. The frameworks you have learned are tools for understanding yourself. But the aliveness underneath them is what the tools are for. Never let the map eat the territory." } },
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
      { id: "e30-2-sc1", difficulty: 2, content: { type: "scenario", scenario: "You are in a heated argument with someone you love. Your type pattern fires: the familiar defense, the predictable reaction. You see it happening. And in the same moment, you also feel the spaciousness behind it. You are the wave and the ocean at the same time. You still react. But there is a tiny bit more room around the reaction than there used to be.", question: "What does this simultaneous experience of pattern and spaciousness represent?", options: ["A sign that you have failed to transcend your pattern", "Proof that personality types are not real and can be overridden by willpower", "The lived experience of being both a specific type and the open awareness in which that type arises, which is the integration this entire path has been building toward", "Evidence that you need more practice before you can fully stop the pattern from firing"], correctIndex: 2, explanation: "This is not a halfway point on the road to transcendence. This is the destination. Being your type and being aware of your type at the same time. The wave does not need to stop being a wave to be part of the ocean. The pattern does not need to disappear for freedom to be present." } },
      { id: "e30-2-fr2", difficulty: 3, content: { type: "free-recall", prompt: "Describe a recent moment when you were simultaneously caught in your pattern and aware that you were caught. What was it like to be both at once? Did the awareness change anything?", keyTerms: ["caught", "aware", "both", "pattern", "changed", "same time", "space"], minWords: 20, modelAnswer: "This dual awareness is the entire practice distilled into a single moment. You do not need to choose between the pattern and the freedom. They coexist. The pattern is the wave. The awareness is the ocean. You are both. That is the integration." } },
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
      { id: "e30-3-sc1", difficulty: 2, content: { type: "scenario", scenario: "A year from now, you are having a hard day. Your pattern is running at full volume. The inner critic, the anxiety, the avoidance, whatever your type does when it is stressed. In the middle of it, you remember one thing from this learning path. Not a concept. Not a framework. Just the practice: notice. Breathe. Look for the looker. For two seconds, the grip loosens.", question: "What does this moment illustrate about the nature of ongoing practice?", options: ["Two seconds of awareness is too brief to be meaningful", "The practice only works if you do it perfectly and consistently", "Even a brief moment of noticing, repeated over years, is the practice itself; there is no more advanced version", "You should have been able to stop the pattern entirely by now"], correctIndex: 2, explanation: "There is no graduation. There is no moment where the pattern stops. The practice is noticing, briefly, repeatedly, over the course of an ordinary life. Two seconds is not a failure of a longer practice. It is the whole thing. Slightly more aware, slightly lighter. That is everything." } },
      { id: "e30-3-fr2", difficulty: 3, content: { type: "free-recall", prompt: "What will you actually do differently tomorrow because of what you have learned here? Not the grand vision. The small, real, Tuesday version.", keyTerms: ["tomorrow", "differently", "small", "real", "practice", "actually", "daily"], minWords: 20, modelAnswer: "The Tuesday version is the only version that matters. Not the retreat version. Not the breakthrough version. The one where you are tired and busy and still manage to notice, for half a second, that the pattern is running. That is the practice. It looks like Tuesday. It always has." } },
    ],
  },
];
