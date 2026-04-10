// Unit 23: The Observer
//
// Universal metacognition unit. Builds the skill of noticing your own
// patterns without being controlled by them. No philosophy labels. Just
// the cognitive moves, presented as practices.
//
// Grounded: your Enneagram type never goes away. What changes is whether
// it runs you or you run it. This unit builds the muscle for that shift.

import type { Lesson } from "@/types/lessons";

export const unit23Lessons: Lesson[] = [
  {
    id: "observer-noticing",
    unitId: "the-observer",
    order: 1,
    title: "Noticing without changing",
    subtitle: "The first skill of self-knowledge",
    xpReward: 30,
    exercises: [
      {
        id: "e23-1-intro",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "You can watch your thoughts without being them",
          body: "Right now, you are thinking. But there is also a part of you that knows you are thinking. That part, the one that watches, does not judge. It does not push. It just notices. Strengthening this observer is the most practical thing self-knowledge can give you.",
        },
      },
      {
        id: "e23-1-sp1",
        difficulty: 2,
        content: {
          type: "socratic-prompt",
          question: "Right now, what is the loudest thought in your head? Can you name it without following it?",
          reflection: "The moment you name a thought, you are no longer inside it. You are beside it. That tiny distance is the entire practice.",
          revealLabel: "See the insight",
          conceptTitle: "Naming is distance",
          conceptBody: "People across many traditions have noticed: the act of labeling a mental event ('that is worry,' 'that is planning,' 'that is my inner critic') creates just enough space to choose what happens next. You are still the same type. You still have the same patterns. But you are no longer on autopilot.",
        },
      },
      {
        id: "e23-1-fr1",
        difficulty: 3,
        content: {
          type: "free-recall",
          prompt: "Describe a moment this week where you caught yourself mid-pattern. What were you doing? What did you notice?",
          keyTerms: ["noticed", "caught", "realized", "paused", "automatic"],
          minWords: 20,
          modelAnswer: "The 'catch' is the practice. It does not matter if you changed the behavior. The noticing itself rewires the relationship between you and the pattern.",
        },
      },
      {
        id: "e23-1-sc1",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario: "You are in a conversation and you feel yourself getting defensive. Your chest tightens. A sharp reply forms in your mind before the other person even finishes talking.",
          question: "What would 'noticing without changing' look like in this exact moment?",
          options: [
            "Suppress the defensiveness and respond calmly",
            "Notice the tightness and the sharp reply forming, without acting on either",
            "Analyze why you feel defensive",
            "Tell the other person you need a minute",
          ],
          correctIndex: 1,
          explanation: "Noticing without changing means observing the reaction as it forms, the tightness, the sharp reply, without suppressing it, analyzing it, or acting on it. Just seeing it. That seeing creates the space.",
        },
      },
      {
        id: "e23-1-fr2",
        difficulty: 3,
        content: {
          type: "free-recall",
          prompt: "Right now, close your eyes for 10 seconds. Then describe what you noticed happening in your mind during those 10 seconds. Not what you think SHOULD have happened. What actually happened.",
          keyTerms: ["thought", "noticed", "wandered", "came", "went", "quiet", "busy"],
          minWords: 25,
          modelAnswer: "Whatever happened is the right answer. Busy mind, quiet mind, planning, worrying, nothing. The point was not to have a particular experience. The point was to watch what was already happening.",
        },
      },
    ],
  },
  {
    id: "observer-inner-critic",
    unitId: "the-observer",
    order: 2,
    title: "The voice that narrates",
    subtitle: "Your inner critic is not you",
    xpReward: 30,
    exercises: [
      {
        id: "e23-2-intro",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "The narrator has an agenda",
          body: "There is a voice in your head that comments on everything you do. It evaluates, compares, warns, and judges. This voice feels like 'you,' but it is actually a specific part of your personality structure doing a specific job: trying to keep you safe. Noticing its agenda is the beginning of freedom.",
        },
      },
      {
        id: "e23-2-sp1",
        difficulty: 2,
        content: {
          type: "socratic-prompt",
          question: "What does your inner narrator most often say? Is it a warning, a comparison, a judgment, or a plan?",
          reflection: "Each Enneagram type has a characteristic inner voice. Knowing yours means you can hear it without obeying it.",
          revealLabel: "See the type connection",
          conceptTitle: "Your type's narrator",
          conceptBody: "Type 1's narrator corrects. Type 2's narrator monitors whether you are loved. Type 3's narrator tracks whether you are winning. Type 4's narrator compares you to an ideal self. Type 5's narrator warns about depletion. Type 6's narrator scans for danger. Type 7's narrator plans the next escape. Type 8's narrator watches for threats to autonomy. Type 9's narrator smooths over disruption. Knowing which voice is yours makes it less automatic.",
        },
      },
      {
        id: "e23-2-fr1",
        difficulty: 3,
        content: {
          type: "free-recall",
          prompt: "Write down the most common sentence your inner narrator says. Then write: 'I notice that voice. It is trying to keep me safe by ___.'",
          keyTerms: ["voice", "says", "trying", "safe", "protect"],
          minWords: 15,
          modelAnswer: "When you complete the sentence 'It is trying to keep me safe by ___,' you have identified the function of your defense structure. Not the content. The function. That distinction is the entire Enneagram in one move.",
        },
      },
      {
        id: "e23-2-fr2",
        difficulty: 3,
        content: {
          type: "free-recall",
          prompt: "Have a brief conversation with your inner narrator. Write: 'Narrator, what are you worried about right now?' Then write what it says back.",
          keyTerms: ["worried", "says", "afraid", "might", "what if", "should"],
          minWords: 25,
          modelAnswer: "You just externalized the narrator. That is the move. When the voice is inside, it feels like truth. When you write it down as dialogue, it becomes one perspective among many. That shift is worth repeating.",
        },
      },
      {
        id: "e23-2-sc1",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario: "You wake up and immediately your mind starts listing everything you need to do today. The list feels urgent. Your body tenses.",
          question: "The narrator just activated. Which response represents 'observing the narrator' rather than 'obeying the narrator'?",
          options: [
            "Start working on the list immediately",
            "Tell yourself the list is not important",
            "Notice: 'The planning voice just turned on. It does this every morning.'",
            "Make a better, more organized list",
          ],
          correctIndex: 2,
          explanation: "Observing means naming what is happening ('the planning voice turned on') without following it or fighting it. This is the skill: seeing the narrator as a narrator, not as reality.",
        },
      },
    ],
  },
  {
    id: "observer-space",
    unitId: "the-observer",
    order: 3,
    title: "The space between stimulus and response",
    subtitle: "Where freedom lives",
    xpReward: 30,
    exercises: [
      {
        id: "e23-3-intro",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "There is a gap, and you can widen it",
          body: "Something happens. You react. But between those two moments, there is a space. Most of the time it is so small you don't notice it. The entire practice of self-knowledge is about widening that space, so you have room to choose instead of just react.",
        },
      },
      {
        id: "e23-3-sp1",
        difficulty: 2,
        content: {
          type: "socratic-prompt",
          question: "Think of a recent time you reacted before you chose to. What happened in that tiny gap, if anything?",
          reflection: "The gap exists even when it feels like it doesn't. You are training yourself to notice it.",
          revealLabel: "See the practice",
          conceptTitle: "Widening the gap",
          conceptBody: "The gap widens with practice, not willpower. Each time you notice a pattern without acting on it immediately, the space grows slightly. This is not about suppressing reactions. It is about having one extra moment to ask: 'Is this the pattern running me, or is this a real choice?'",
        },
      },
      {
        id: "e23-3-fr1",
        difficulty: 3,
        content: {
          type: "free-recall",
          prompt: "Describe one situation this week where you wish you had paused before reacting. What would you have done differently with two more seconds?",
          keyTerms: ["wish", "pause", "differently", "reacted", "automatic"],
          minWords: 20,
          modelAnswer: "Two seconds is all it takes. The goal is not perfection. The goal is to go from noticing after the fact (which you just did by writing this) to noticing in the moment. That shift happens gradually, with repetition, not with effort.",
        },
      },
      {
        id: "e23-3-fr2",
        difficulty: 3,
        content: {
          type: "free-recall",
          prompt: "Write a letter to yourself from the perspective of the observer, the part that watches. What does it see? What does it want you to know?",
          keyTerms: ["see", "notice", "you", "always", "here", "watching", "okay"],
          minWords: 30,
          modelAnswer: "You just gave voice to the observer. Most people have never done this. The observer does not judge. It does not fix. It just sees. And it has been seeing your whole life, even when you forgot it was there.",
        },
      },
      {
        id: "e23-3-sc1",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario: "Someone criticizes your work. You feel a flash of hurt. Then anger. Then the urge to defend yourself or withdraw.",
          question: "Where is 'the space between stimulus and response' in this sequence?",
          options: [
            "Between the criticism and the hurt",
            "Between the hurt and the anger",
            "Between the anger and the urge to act",
            "All of the above, there is a space between each step",
          ],
          correctIndex: 3,
          explanation: "There is a gap between every step: stimulus to sensation, sensation to emotion, emotion to impulse, impulse to action. Each gap is a place where awareness can enter. You do not need to catch the first one. Any gap will do.",
        },
      },
    ],
  },
];
