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
    // Pattern A: concept-intro → multiple-choice → sorting → scenario → free-recall
    id: "both-map-territory",
    unitId: "holding-both",
    order: 1,
    title: "The map and the territory",
    subtitle: "The Enneagram is a map. You are the territory.",
    xpReward: 40,
    exercises: [
      {
        id: "e30-1-i",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "Every map is useful. No map is the thing itself.",
          body: "The Enneagram gave you a map of your motivation structure. The Big Five gave you a map of your traits. The cognitive functions gave you a map of how you think. These maps are genuinely useful. They help you navigate yourself. But you are not a map. You are the territory. The territory is messier, more alive, more contradictory, and more beautiful than any map can capture. Wisdom is using the map without mistaking it for the land.",
        },
      },
      {
        id: "e30-1-mc",
        difficulty: 2,
        content: {
          type: "multiple-choice",
          question: "Why can no personality framework, however sophisticated, ever fully capture a person?",
          options: [
            "Because current frameworks are not yet advanced enough — a perfect model will eventually be built",
            "Because personality is random and therefore unpredictable by any system",
            "Because a map that captured everything would have to be as large as the territory, making it useless as a map",
            "Because people are too emotional to be described objectively",
          ],
          correctIndex: 2,
          explanation: "A map is useful precisely because it is selective — it leaves things out. The moment it tries to capture everything, it ceases to be a map and becomes the territory itself. The Enneagram's usefulness and its incompleteness are the same fact. Every map leaves the aliveness out. That aliveness is you.",
        },
      },
      {
        id: "e30-1-sort",
        difficulty: 2,
        content: {
          type: "sorting",
          instruction: "Sort each statement into whether it belongs to MAP THINKING (treating the framework as complete) or TERRITORY THINKING (staying aware that you exceed any framework).",
          categories: ["Map Thinking", "Territory Thinking"],
          items: [
            { text: "'My type explains why I do this, so there's no point questioning it further'", categoryIndex: 0 },
            { text: "'My type is one lens — it shows me something real and misses something real'", categoryIndex: 1 },
            { text: "'If someone doesn't fit the framework, they must be mistyped'", categoryIndex: 0 },
            { text: "'The parts of me the framework cannot name are just as real as the parts it does'", categoryIndex: 1 },
            { text: "'I can predict exactly how I will behave because I know my type'", categoryIndex: 0 },
            { text: "'Knowing my type makes me more curious about myself, not less'", categoryIndex: 1 },
          ],
        },
      },
      {
        id: "e30-1-sc1",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario: "You are explaining your Enneagram type to a close friend. They listen carefully, then say: 'That is interesting, but it does not capture the thing I love most about you.' You feel a flash of something: relief, maybe. The part of you they love is real. And the map did not include it.",
          question: "What does this moment reveal about the relationship between maps and territory?",
          options: [
            "The Enneagram is incomplete and should be replaced with a better framework",
            "Your friend does not understand personality systems well enough",
            "Every map is useful, but no map captures the full territory of a person; the parts the map misses are as real as the parts it names",
            "Personality frameworks only describe problems, not strengths",
          ],
          correctIndex: 2,
          explanation: "A map that captured everything would be as large as the territory and therefore useless. The value of a map is its selectivity. The wisdom is remembering that the territory, you, is always richer than any description of it. Use the map. Be the territory.",
        },
      },
      {
        id: "e30-1-fr",
        difficulty: 3,
        content: {
          type: "free-recall",
          prompt: "What is one thing about you that no personality framework has captured? Something that exists in the territory but not on any map?",
          keyTerms: ["beyond", "more", "can't", "capture", "map", "just", "real"],
          minWords: 20,
          modelAnswer: "Whatever you just described is as real as your type number. The map is useful. The territory is alive. You are the territory.",
        },
      },
    ],
  },
  {
    // Pattern B: concept-intro → fill-in-blank → matching-pairs → scenario → socratic-prompt
    id: "both-paradox",
    unitId: "holding-both",
    order: 2,
    title: "You are a type. You are not a type.",
    subtitle: "Both are true. Both are useful.",
    xpReward: 40,
    exercises: [
      {
        id: "e30-2-i",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "The final integration",
          body: "Here is everything at once: you are a specific Enneagram type with a real motivation structure, real defenses, and a real pattern that will never fully disappear. AND you are the open awareness in which that pattern arises and passes, which is not confined to any type, not fixed, and not threatened by anything your personality does. Both are true. At the same time. Always. The type is the wave. The awareness is the ocean. The wave is real. It just isn't separate from the ocean.",
        },
      },
      {
        id: "e30-2-fib",
        difficulty: 2,
        content: {
          type: "fill-in-blank",
          sentence: "The type is the wave. The awareness is the ___. The wave does not need to stop being a wave to be part of it.",
          options: ["ocean", "shore", "current"],
          correctIndex: 0,
          explanation: "The ocean metaphor holds both truths without collapsing them. The wave is distinct, has its own shape and force, crashes in its own way. And it is entirely made of ocean. You are entirely your type AND entirely the awareness that holds it. Neither cancels the other.",
        },
      },
      {
        id: "e30-2-mp",
        difficulty: 2,
        content: {
          type: "matching-pairs",
          instruction: "Match each half-truth with its corresponding completing truth. Real wisdom holds both sides simultaneously.",
          pairs: [
            { left: "I am my Enneagram type", right: "I am also the awareness that sees my type" },
            { left: "My pattern is real and will not fully disappear", right: "My relationship to the pattern can become spacious" },
            { left: "The map is genuinely useful for navigation", right: "I am the territory the map points to, not the map" },
            { left: "The self is a continuous, recognizable shape", right: "No fixed substance underlies that continuity" },
            { left: "Growth means the pattern loosens its grip", right: "Growth does not mean the pattern disappears" },
          ],
        },
      },
      {
        id: "e30-2-sc1",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario: "You are in a heated argument with someone you love. Your type pattern fires: the familiar defense, the predictable reaction. You see it happening. And in the same moment, you also feel the spaciousness behind it. You are the wave and the ocean at the same time. You still react. But there is a tiny bit more room around the reaction than there used to be.",
          question: "What does this simultaneous experience of pattern and spaciousness represent?",
          options: [
            "A sign that you have failed to transcend your pattern",
            "Proof that personality types are not real and can be overridden by willpower",
            "The lived experience of being both a specific type and the open awareness in which that type arises, which is the integration this entire path has been building toward",
            "Evidence that you need more practice before you can fully stop the pattern from firing",
          ],
          correctIndex: 2,
          explanation: "This is not a halfway point on the road to transcendence. This is the destination. Being your type and being aware of your type at the same time. The wave does not need to stop being a wave to be part of the ocean. The pattern does not need to disappear for freedom to be present.",
        },
      },
      {
        id: "e30-2-sp",
        difficulty: 3,
        content: {
          type: "socratic-prompt",
          question: "Can you be your type and be free of your type at the same time? What would that look like today?",
          reflection: "Freedom from the type is not the same as not having the type. It is having the type without being had by it.",
          revealLabel: "The practice going forward",
          conceptTitle: "This is the ongoing practice",
          conceptBody: "There is no graduation from this. There is no moment where you 'arrive' and the pattern dissolves. The practice is daily, unglamorous, and always available: notice the pattern, feel its pull, remember the spaciousness behind it, choose. Sometimes you will choose the pattern. That is fine. The noticing is what matters, not the choosing. Over years, the noticing becomes more natural and the grip becomes lighter. Not zero. Lighter. That is what growth looks like in the Enneagram. Not transformation. Lightening.",
        },
      },
    ],
  },
  {
    // Pattern C: concept-intro → multiple-choice → fill-in-blank → scenario → sorting
    id: "both-continue",
    unitId: "holding-both",
    order: 3,
    title: "What now",
    subtitle: "The practice continues. It just looks different.",
    xpReward: 40,
    exercises: [
      {
        id: "e30-3-i",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "You are not done. You are just starting differently.",
          body: "This is the end of the structured learning path, but it is not the end of the practice. The daily check-ins, the pattern noticing, the 10-second looking, the philosophical provocations, these continue. The difference is that now you hold them in a bigger context. You know your type. You know your observer. You know the question behind the question. And you know that the one asking is bigger than the answer. That is enough. That is more than most people ever get. Use it lightly.",
        },
      },
      {
        id: "e30-3-mc",
        difficulty: 2,
        content: {
          type: "multiple-choice",
          question: "What does genuine psychological growth actually look like over years of practice with a framework like the Enneagram?",
          options: [
            "The pattern eventually disappears entirely and is replaced by a healthier default",
            "You become a different type as you grow into your true self",
            "The pattern persists but the grip loosens — you gain more room around it without eliminating it",
            "You transcend personality altogether and operate from pure awareness",
          ],
          correctIndex: 2,
          explanation: "Growth in the Enneagram is not transcendence. It is lightening. The 1 still notices the inner critic — but it has slightly less authority. The 4 still feels the ache — but it doesn't swallow everything. The pattern is the riverbed; the water keeps moving. The bed shifts slowly, over years. That is enough.",
        },
      },
      {
        id: "e30-3-fib",
        difficulty: 2,
        content: {
          type: "fill-in-blank",
          sentence: "The practice does not look like a breakthrough. It looks like ___: ordinary days where you notice, briefly, and that noticing accumulates into something.",
          options: ["Tuesday", "progress", "success"],
          correctIndex: 0,
          explanation: "Tuesday is the whole practice. Not the retreat. Not the breakthrough. Not the dramatic moment of transformation. The moment you notice the pattern for half a second on an ordinary tired day — that is it. That is everything. It accumulates over years into a life that is slightly more free.",
        },
      },
      {
        id: "e30-3-sc1",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario: "A year from now, you are having a hard day. Your pattern is running at full volume. The inner critic, the anxiety, the avoidance, whatever your type does when it is stressed. In the middle of it, you remember one thing from this learning path. Not a concept. Not a framework. Just the practice: notice. Breathe. Look for the looker. For two seconds, the grip loosens.",
          question: "What does this moment illustrate about the nature of ongoing practice?",
          options: [
            "Two seconds of awareness is too brief to be meaningful",
            "The practice only works if you do it perfectly and consistently",
            "Even a brief moment of noticing, repeated over years, is the practice itself; there is no more advanced version",
            "You should have been able to stop the pattern entirely by now",
          ],
          correctIndex: 2,
          explanation: "There is no graduation. There is no moment where the pattern stops. The practice is noticing, briefly, repeatedly, over the course of an ordinary life. Two seconds is not a failure of a longer practice. It is the whole thing. Slightly more aware, slightly lighter. That is everything.",
        },
      },
      {
        id: "e30-3-sort",
        difficulty: 3,
        content: {
          type: "sorting",
          instruction: "Sort each description into whether it reflects ARRIVAL THINKING (believing there is a final destination) or PRACTICE THINKING (understanding growth as ongoing and ordinary).",
          categories: ["Arrival Thinking", "Practice Thinking"],
          items: [
            { text: "'Once I understand myself completely, I will stop repeating the pattern'", categoryIndex: 0 },
            { text: "'Noticing the pattern for two seconds on a hard day counts as the practice'", categoryIndex: 1 },
            { text: "'I need a breakthrough experience to really change'", categoryIndex: 0 },
            { text: "'The small daily moment of awareness is the whole thing — there is no more advanced version'", categoryIndex: 1 },
            { text: "'If I am still struggling with my type, the tools have not worked'", categoryIndex: 0 },
            { text: "'Growth looks like the grip being slightly lighter, not gone'", categoryIndex: 1 },
          ],
        },
      },
    ],
  },
];
