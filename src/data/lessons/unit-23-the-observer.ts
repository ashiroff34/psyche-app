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
        id: "e23-1-mc1",
        difficulty: 2,
        content: {
          type: "multiple-choice",
          question: "You catch yourself mid-pattern — you are doing the thing your type always does, and you see it happening. Which of the following is true at that exact moment?",
          options: [
            "You have failed, because a healthy person would not have started the pattern at all",
            "You are already outside the pattern in some sense, because something in you stepped back to look",
            "The noticing is only useful if it leads to immediate behavior change",
            "The pattern will repeat regardless, so the noticing has no practical value",
          ],
          correctIndex: 1,
          explanation: "The moment of noticing is not a failure — it is the practice itself succeeding. To see a pattern, something in you had to step back from it. That stepping-back is the observer activating. The pattern may continue, but you are no longer fully inside it. That tiny distance is everything. It is where choice can enter.",
        },
      },
      {
        id: "e23-1-sort1",
        difficulty: 2,
        content: {
          type: "sorting",
          instruction: "Sort these responses into two groups: responses that use the observer skill, and responses that are still inside the pattern.",
          categories: ["Using the observer", "Still inside the pattern"],
          items: [
            { text: "I notice I am getting defensive right now — that familiar tightening in my chest", categoryIndex: 0 },
            { text: "This person is wrong and I need to make sure they understand that", categoryIndex: 1 },
            { text: "I see the urge to fix this situation forming before I have all the information", categoryIndex: 0 },
            { text: "I have to do something about this immediately or it will spiral", categoryIndex: 1 },
            { text: "There is that voice again — the one that says I am not doing enough", categoryIndex: 0 },
            { text: "If I just work harder, I will stop feeling this way", categoryIndex: 1 },
          ],
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
            "Analyze why you feel defensive before responding",
            "Tell the other person you need a minute to collect yourself",
          ],
          correctIndex: 1,
          explanation: "Noticing without changing means observing the reaction as it forms — the tightness, the sharp reply — without suppressing it, analyzing it, or acting on it. Just seeing it. That seeing creates the space. Suppression is still inside the pattern, fighting it. Analysis is a step removed but still effortful. The pure noticing is different: it is witnessing without agenda.",
        },
      },
      {
        id: "e23-1-fr1",
        difficulty: 3,
        content: {
          type: "free-recall",
          prompt: "Describe a moment this week where you caught yourself mid-pattern. What were you doing? What did the noticing feel like — was it sudden, gradual, uncomfortable, or something else?",
          keyTerms: ["noticed", "caught", "realized", "paused", "automatic", "pattern"],
          minWords: 20,
          modelAnswer: "The 'catch' is the practice. It does not matter if you changed the behavior. The noticing itself begins to rewire the relationship between you and the pattern. Over time, the catch comes earlier — not after the pattern runs, but while it is forming, and eventually before it starts.",
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
        id: "e23-2-fib1",
        difficulty: 2,
        content: {
          type: "fill-in-blank",
          sentence: "The inner narrator feels like 'you' speaking the truth. But it is more accurately described as a ___ doing a specific protective job.",
          options: ["random anxiety", "part of the personality structure", "memory system", "moral compass"],
          correctIndex: 1,
          explanation: "Calling it a 'part' rather than 'you' is not a semantic trick — it is a structural shift in perspective. Parts have agendas, histories, and functions. When you see the narrator as a part, you can be curious about what it is protecting you from. When you mistake it for 'you,' you simply obey it.",
        },
      },
      {
        id: "e23-2-match1",
        difficulty: 2,
        content: {
          type: "matching-pairs",
          instruction: "Match each Enneagram type's characteristic inner narrator with its underlying protective function.",
          pairs: [
            { left: "Type 1: 'You did that wrong. Do it again.'", right: "Protecting against being seen as bad or corrupt" },
            { left: "Type 3: 'Are you impressive enough? Are you winning?'", right: "Protecting against being seen as worthless or ordinary" },
            { left: "Type 6: 'What could go wrong here? Have you prepared?'", right: "Protecting against being caught off guard by danger" },
            { left: "Type 4: 'No one really understands you. You are fundamentally different.'", right: "Protecting against the pain of being ordinary and unseen" },
            { left: "Type 9: 'Don't make this into a thing. It's fine. Let it go.'", right: "Protecting against the disruption of conflict and disconnection" },
          ],
        },
      },
      {
        id: "e23-2-sc1",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario: "You wake up and immediately your mind starts listing everything you need to do today. The list feels urgent. Your body tenses. You check your phone before your feet hit the floor.",
          question: "The narrator just activated. Which response represents 'observing the narrator' rather than 'obeying the narrator'?",
          options: [
            "Start working on the list immediately so the urgency feeling goes away",
            "Tell yourself the list is not important and try to relax",
            "Notice: 'The planning voice just turned on. It does this every morning. I see it.'",
            "Make a more organized, prioritized list to reduce the overwhelm",
          ],
          correctIndex: 2,
          explanation: "Observing means naming what is happening — 'the planning voice turned on' — without following it or fighting it. Acting on the list is obeying. Dismissing it is fighting. Making a better list is a more sophisticated form of obeying. Only the naming moves you into the observer position, where you can decide what to do next rather than just reacting.",
        },
      },
      {
        id: "e23-2-sp1",
        difficulty: 2,
        content: {
          type: "socratic-prompt",
          question: "What does your inner narrator most often say — and if you had to finish the sentence 'It is trying to protect me from ___,' what would you write?",
          reflection: "Each Enneagram type has a characteristic inner voice. Knowing yours means you can hear it without obeying it. The protective function is the key — it is not malicious. It is just outdated.",
          revealLabel: "See the type connection",
          conceptTitle: "Your type's narrator",
          conceptBody: "Type 1's narrator corrects. Type 2's narrator monitors whether you are loved. Type 3's narrator tracks whether you are winning. Type 4's narrator compares you to an ideal self. Type 5's narrator warns about depletion. Type 6's narrator scans for danger. Type 7's narrator plans the next escape. Type 8's narrator watches for threats to autonomy. Type 9's narrator smooths over disruption. When you complete the sentence 'It is trying to protect me from ___,' you have identified the function. That is the entire Enneagram in one move.",
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
        id: "e23-3-mc1",
        difficulty: 2,
        content: {
          type: "multiple-choice",
          question: "Viktor Frankl wrote: 'Between stimulus and response, there is a space. In that space is our power to choose our response.' What does the Enneagram add to this idea?",
          options: [
            "It teaches you to eliminate the automatic response entirely through enough self-work",
            "It maps which automatic response each type is most likely to produce, making the space easier to notice",
            "It argues that some types have a naturally wider gap than others and cannot change this",
            "It replaces Frankl's insight with a more structured framework for behavior change",
          ],
          correctIndex: 1,
          explanation: "The Enneagram does not contradict Frankl — it extends him. Knowing your type means you know what is likely to appear in the gap before you look. A 6 will probably find anxiety. A 3 will probably find image-management. A 9 will probably find the urge to avoid. That map makes the automatic response easier to name when it shows up, which is what makes the space wider.",
        },
      },
      {
        id: "e23-3-fib1",
        difficulty: 2,
        content: {
          type: "fill-in-blank",
          sentence: "The gap between stimulus and response widens primarily through ___, not through willpower or trying harder.",
          options: ["therapy", "practice and repetition", "understanding the theory", "life experience"],
          correctIndex: 1,
          explanation: "This distinction matters. Willpower is white-knuckling — forcing a different response while the automatic one is still running underneath. Practice is different: each time you notice the pattern without immediately following it, the noticing becomes slightly more available next time. The gap grows because the skill of noticing is being exercised, not because you are trying harder.",
        },
      },
      {
        id: "e23-3-sc1",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario: "Someone criticizes your work. You feel a flash of hurt. Then anger. Then the urge to defend yourself or withdraw completely.",
          question: "Where is 'the space between stimulus and response' in this sequence?",
          options: [
            "Between the criticism and the hurt — that is the only real gap",
            "Between the hurt and the anger — catching the emotion before it compounds",
            "Between the anger and the urge to act — that is where you can intervene",
            "All of the above — there is a space between each step in the sequence",
          ],
          correctIndex: 3,
          explanation: "There is a gap between every step: criticism to sensation, sensation to emotion, emotion to impulse, impulse to action. Each gap is a place where awareness can enter. You do not need to catch the first one — the gap between sensation and emotion is very fast. Any gap will do. Most people find it easiest to catch the gap between emotion and impulse, because that is where the urge to act forms and is still not yet action.",
        },
      },
      {
        id: "e23-3-sort1",
        difficulty: 2,
        content: {
          type: "sorting",
          instruction: "Sort these moments into two groups: moments where the person caught a gap and used it, and moments where the gap closed before they could use it.",
          categories: ["Gap caught and used", "Gap closed — pattern ran automatically"],
          items: [
            { text: "Felt the familiar pull to say 'yes' and paused to ask: do I actually want this?", categoryIndex: 0 },
            { text: "Sent the sharp text and felt bad about it an hour later", categoryIndex: 1 },
            { text: "Noticed the impulse to withdraw and chose to stay in the conversation instead", categoryIndex: 0 },
            { text: "Worked three extra hours to manage the anxiety instead of addressing it", categoryIndex: 1 },
            { text: "Recognized the defensive story forming and said 'I want to think about that before I respond'", categoryIndex: 0 },
            { text: "Immediately reassured the other person even though they had not asked for reassurance", categoryIndex: 1 },
          ],
        },
      },
    ],
  },
];
