// Unit 29: What If There Is No Fixed Self?
//
// The Buddhist insight, arrived at experientially (not doctrinally).
// By this point, the user has: (a) built a strong identity through
// Enneagram + cognitive functions, (b) learned to observe their
// patterns, (c) tried looking for the observer and found... openness.
//
// This unit gently investigates whether the "self" they've been
// studying is a fixed thing or a process. NOT presented as Buddhism.
// Presented as: "here is what happens when you look closely at the
// thing you call 'me.'"
//
// Critical framing: this is not nihilism. It is not "you don't exist."
// It is "you exist differently than you thought." The self is more
// like a river than a rock. More like a verb than a noun.

import type { Lesson } from "@/types/lessons";

export const unit29Lessons: Lesson[] = [
  {
    // Pattern C: concept-intro → multiple-choice → fill-in-blank → scenario → sorting
    id: "noself-who-am-i",
    unitId: "is-there-a-self",
    order: 1,
    title: "Who are you, exactly?",
    subtitle: "The question that doesn't have the answer you expect",
    xpReward: 30,
    exercises: [
      {
        id: "e29-1-i",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "You have been studying 'yourself' for weeks. But what is a self?",
          body: "You know your type. Your instinct. Your cognitive functions. Your values. Your patterns under stress. But if someone asked: 'beyond all those descriptions, who are you?' what would you say? Not your type. Not your name. Not your roles. The thing underneath all the labels. What is it? This is not a rhetorical question. It is an investigation. And the answer may not be what you expect.",
        },
      },
      {
        id: "e29-1-mc",
        difficulty: 2,
        content: {
          type: "multiple-choice",
          question: "When you strip away every label, role, and personality trait, what most accurately describes what remains?",
          options: [
            "Nothing at all — without our descriptions, there is no self to find",
            "Your core type number, which is permanent and cannot be stripped away",
            "Something that cannot be named as a thing, more like the capacity to experience than a fixed object",
            "The sum of your memories, which are the true foundation of identity",
          ],
          correctIndex: 2,
          explanation: "Most traditions that have investigated this closely — philosophy, contemplation, modern psychology — arrive at the same surprise: when you remove all descriptions, something remains, but it is not a thing. It is more like awareness itself, the capacity to experience. That is not nothing. It is just not the kind of something we expected to find.",
        },
      },
      {
        id: "e29-1-fib",
        difficulty: 2,
        content: {
          type: "fill-in-blank",
          sentence: "A description of yourself can only capture what has already ___. The self includes what is happening right now, which is always one step ahead of any portrait.",
          options: ["happened", "changed", "disappeared"],
          correctIndex: 0,
          explanation: "Descriptions are always retrospective — they freeze a moment that has already passed. The living self is the process that keeps moving forward. That is why no description, however accurate, ever fully captures you. It is not a failure of vocabulary. It is the nature of being alive.",
        },
      },
      {
        id: "e29-1-sc1",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario: "You are filling out a profile for a new app. It asks you to describe yourself in three words. You write them quickly. Then you stare at the screen and think: is that really me? Those three words feel both accurate and completely inadequate. You could pick three different words tomorrow and they would be equally true.",
          question: "What does this dissatisfaction reveal about the self?",
          options: [
            "You need to know yourself better before you can describe yourself accurately",
            "Three words are simply too few; a longer description would capture the real you",
            "No description can fully capture the self because the self is not a fixed thing that holds still for a portrait",
            "The dissatisfaction means you are being inauthentic in your self-description",
          ],
          correctIndex: 2,
          explanation: "The feeling that any description is inadequate is not a failure of vocabulary. It is a clue about the nature of what you are trying to describe. If the self were a fixed object, the right words would eventually capture it. The fact that they never quite do suggests that the self is more like a process than a thing.",
        },
      },
      {
        id: "e29-1-sort",
        difficulty: 3,
        content: {
          type: "sorting",
          instruction: "Sort each statement into whether it describes the self as a FIXED THING or as a LIVING PROCESS.",
          categories: ["Fixed Thing", "Living Process"],
          items: [
            { text: "Your personality can be captured once and referenced forever", categoryIndex: 0 },
            { text: "Who you are shifts slightly depending on who you are with", categoryIndex: 1 },
            { text: "Your type number is the final, permanent answer to 'who are you?'", categoryIndex: 0 },
            { text: "The part of you that resists description is always one step ahead of the label", categoryIndex: 1 },
            { text: "A complete psychological profile would reveal the true, unchanging you", categoryIndex: 0 },
            { text: "Even your deepest beliefs have shifted over the years without you fully noticing", categoryIndex: 1 },
          ],
        },
      },
    ],
  },
  {
    // Pattern A: concept-intro → multiple-choice → sorting → scenario → free-recall
    id: "noself-process",
    unitId: "is-there-a-self",
    order: 2,
    title: "A process, not a thing",
    subtitle: "You are more like a river than a rock",
    xpReward: 30,
    exercises: [
      {
        id: "e29-2-i",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "What if 'self' is a verb, not a noun?",
          body: "You think of yourself as a thing, a fixed entity that has experiences. But look more carefully: every thought arises and passes. Every emotion comes and goes. Every sensation is temporary. Your body replaces its cells. Your beliefs shift over decades. Even your type, which feels so solid, manifests differently in different contexts (you've seen this in the Work You / Home You / Love You exercise). What if there is no fixed 'self' having these experiences? What if the experiences themselves are the self, continuously happening?",
        },
      },
      {
        id: "e29-2-mc",
        difficulty: 2,
        content: {
          type: "multiple-choice",
          question: "The river metaphor says the self has continuity without fixity. What does this mean for how we understand personal identity?",
          options: [
            "Identity is an illusion — you are a completely different person each year",
            "You can be recognizably yourself across time without being made of unchanging substance",
            "Only your core type stays the same; everything else about you is irrelevant",
            "Continuity requires a fixed anchor point, such as the soul or the brain",
          ],
          correctIndex: 1,
          explanation: "The river is recognizable — you can name it, return to it, know it. But no water in it is the same as yesterday. This is a third option between 'fixed thing' and 'meaningless flux.' You are continuous without being static. The shape of the riverbed persists; the water is always new. Both are the river.",
        },
      },
      {
        id: "e29-2-sort",
        difficulty: 2,
        content: {
          type: "sorting",
          instruction: "Classify each aspect of identity as SURFACE CONTENT (changes readily) or DEEPER STRUCTURE (persists more quietly across time).",
          categories: ["Surface Content", "Deeper Structure"],
          items: [
            { text: "The specific beliefs you hold about politics or religion", categoryIndex: 0 },
            { text: "The core motivation that drives you across all situations", categoryIndex: 1 },
            { text: "Your favorite music, food, or style", categoryIndex: 0 },
            { text: "The characteristic shape of how your attention moves", categoryIndex: 1 },
            { text: "The opinions you formed in your twenties", categoryIndex: 0 },
            { text: "The type of suffering that has recurred throughout your life", categoryIndex: 1 },
          ],
        },
      },
      {
        id: "e29-2-sc1",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario: "You find a journal entry from ten years ago. The person who wrote it cared about things you no longer care about, feared things that no longer scare you, and believed things you now consider naive. Yet you recognize the handwriting. You feel continuity with this person even though almost everything about them is different.",
          question: "What does this experience reveal about the nature of the self?",
          options: [
            "The old version was not really you; the current version is the real one",
            "You are a completely different person every decade, so identity is meaningless",
            "There is continuity without fixity: like a river, you have a recognizable shape without any unchanging substance",
            "Only your core type stayed the same, and everything else is irrelevant to identity",
          ],
          correctIndex: 2,
          explanation: "You recognize yourself across time without being identical to your past self. This is the river insight. There is a shape, a continuity, a recognizable pattern. But the actual substance is always moving. You are continuous without being fixed. That is not a paradox to solve. It is the nature of being alive.",
        },
      },
      {
        id: "e29-2-fr",
        difficulty: 3,
        content: {
          type: "free-recall",
          prompt: "What is one thing about you that you thought was permanent but actually changed? What does that tell you about the nature of identity?",
          keyTerms: ["changed", "thought", "permanent", "actually", "identity", "different"],
          minWords: 20,
          modelAnswer: "The things we think are permanent usually aren't. The things that actually persist (the core motivation, the basic shape of attention) are subtler than we think. The self is real. It is just not a thing. It is a process.",
        },
      },
    ],
  },
  {
    // Pattern B: concept-intro → fill-in-blank → matching-pairs → scenario → socratic-prompt
    id: "noself-freedom",
    unitId: "is-there-a-self",
    order: 3,
    title: "The freedom in not being fixed",
    subtitle: "If you are not a thing, you are not trapped",
    xpReward: 30,
    exercises: [
      {
        id: "e29-3-i",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "This is the liberating part",
          body: "If the self were truly fixed, you would be permanently trapped in your pattern. The 1 would always suffer from the inner critic. The 4 would always ache with longing. The 8 would always armor up. But you are not fixed. You are a process. And processes can shift. Not by willpower. Not by deciding to be different. But by seeing clearly. When you see the pattern as a pattern, it loses some of its grip. When you look for the self behind the pattern and find openness, the pattern has less to attach to. This is not theory. This is what you have been practicing.",
        },
      },
      {
        id: "e29-3-fib",
        difficulty: 2,
        content: {
          type: "fill-in-blank",
          sentence: "Freedom from a pattern does not mean the pattern ___. It means your relationship to it becomes spacious enough that it runs alongside you instead of through you.",
          options: ["disappears", "worsens", "solidifies"],
          correctIndex: 0,
          explanation: "This is a crucial distinction. The goal is not to become a different type or to eliminate the pattern entirely. The goal is to hold the pattern lightly enough that it does not consume the whole room. The pattern stays; the identification with it loosens. That loosening is what freedom actually feels like.",
        },
      },
      {
        id: "e29-3-mp",
        difficulty: 2,
        content: {
          type: "matching-pairs",
          instruction: "Match each type's core pattern with the specific freedom that becomes available when that pattern is seen clearly.",
          pairs: [
            { left: "The 1's inner critic demands perfection", right: "The freedom to let what is be enough" },
            { left: "The 4's longing for what is missing", right: "The freedom to belong without needing to be special" },
            { left: "The 7's escape into the next experience", right: "The freedom to find depth by staying" },
            { left: "The 6's search for external certainty", right: "The freedom to act from inner authority" },
            { left: "The 2's need to give in order to be loved", right: "The freedom to receive without earning it" },
            { left: "The 8's armoring against vulnerability", right: "The freedom to let tenderness be a doorway" },
          ],
        },
      },
      {
        id: "e29-3-sc1",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario: "You notice your type pattern firing in real time: the familiar tightness, the predictable thought, the automatic reaction beginning to form. But this time, something is different. You see it happening. And in the seeing, there is a tiny gap between the pattern and your response. You feel, for just a moment, that you are bigger than the pattern. It still fires. But it does not consume the whole room.",
          question: "What created that gap between the pattern and the response?",
          options: [
            "Willpower and self-discipline from practicing self-control",
            "The pattern is weakening and will eventually disappear with enough awareness",
            "Seeing the pattern as a pattern, rather than being identified with it, created a moment of spaciousness that is always available",
            "You have outgrown your type and are becoming a different person",
          ],
          correctIndex: 2,
          explanation: "The pattern never disappears. What changes is your relationship to it. When you see it as a pattern rather than as 'you,' a natural spaciousness opens up. That spaciousness is freedom. Not freedom from the type. Freedom within it.",
        },
      },
      {
        id: "e29-3-sp",
        difficulty: 3,
        content: {
          type: "socratic-prompt",
          question: "Has your type ever felt lighter, less controlling, less 'you'? What was happening in that moment?",
          reflection: "The moments when the type loosened its grip are evidence that you are not identical to the pattern. If you were, it could never loosen.",
          revealLabel: "The paradox",
          conceptTitle: "You are your type, and you are not your type",
          conceptBody: "This is the paradox at the heart of all of this: you are genuinely a Type X. The pattern is real, the motivation is real, the defense is real. AND you are also the awareness in which the pattern happens. Both are true simultaneously. The type never goes away. But your relationship to it can become so spacious that it runs alongside you instead of through you. That spaciousness is what people across many traditions call freedom. It does not require believing anything. It just requires looking.",
        },
      },
    ],
  },
];
