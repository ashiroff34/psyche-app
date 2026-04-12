// Unit 28: The Looker
//
// Sam Harris-style direct investigation of consciousness. The key move:
// instead of THINKING about whether there is a self, you LOOK for one.
// This is experiential, not philosophical. The user is guided through
// exercises that point attention back at the one who is paying attention.
//
// This is NOT presented as Buddhism. It is presented as: "here is an
// experiment you can do right now with your own attention." The tradition
// is available via the opt-in "where does this come from?" layer.
//
// Prerequisite: Unit 27 (Living as Yourself) must be complete. The user
// needs a strong, felt sense of self before investigating whether that
// self is as solid as it seems. Without the foundation, this unit is
// just intellectually destabilizing. With it, it is freeing.

import type { Lesson } from "@/types/lessons";

export const unit28Lessons: Lesson[] = [
  {
    id: "looker-intro",
    unitId: "the-looker",
    order: 1,
    title: "Look for the one who is looking",
    subtitle: "An experiment, not a belief",
    xpReward: 30,
    // Pattern B: concept-intro → fill-in-blank → matching-pairs → scenario → socratic-prompt
    exercises: [
      {
        id: "e28-1-i",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "A strange experiment",
          body: "You have spent this entire app studying yourself. Your type. Your patterns. Your defenses. Now try something different: instead of studying the contents of your mind, try to find the one who is studying them. Not think about the observer. Actually look for it. Turn your attention around 180 degrees and try to find the thing that is aware right now. What do you find?",
        },
      },
      {
        id: "e28-1-fib",
        difficulty: 2,
        content: {
          type: "fill-in-blank",
          sentence:
            "The experiment in this lesson asks you to turn your attention ___ at the one who is paying attention, rather than at the contents of the mind.",
          options: ["outward", "inward", "around", "away"],
          correctIndex: 2,
          explanation:
            "The move is 180 degrees: instead of attention flowing outward toward objects, thoughts, or feelings, you turn it around to look at the source of attention itself. This is not a metaphor. It is a literal experiment you can do right now.",
        },
      },
      {
        id: "e28-1-mp",
        difficulty: 2,
        content: {
          type: "matching-pairs",
          instruction:
            "Match each description to what it is describing — the ordinary mode of attention or the looker experiment.",
          pairs: [
            {
              left: "Noticing what you are thinking about",
              right: "Ordinary mode: attention on contents",
            },
            {
              left: "Looking for the one who is noticing",
              right: "The experiment: attention turned around",
            },
            {
              left: "Analyzing your type's defense patterns",
              right: "Ordinary mode: attention on contents",
            },
            {
              left: "Trying to locate the center of your awareness",
              right: "The experiment: attention turned around",
            },
            {
              left: "Observing an emotion as it arises",
              right: "Ordinary mode: attention on contents",
            },
            {
              left: "Finding openness instead of a fixed point",
              right: "The experiment: attention turned around",
            },
          ],
        },
      },
      {
        id: "e28-1-sc",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario:
            "You are sitting alone in a quiet room. You try the experiment: turn your attention around and look for the one who is aware. You expect to find something solid — a point behind your eyes, a center, a 'me.' Instead, you find something you cannot quite name. It is not nothing. But it is not a thing either. It feels more like open space than like a person.",
          question:
            "What does this experience suggest about the nature of the observer?",
          options: [
            "The exercise failed because you should have found a clear sense of self",
            "Your awareness has a fixed center that you simply could not locate yet",
            "The observer is real and functional, but when you look for it directly, it does not have the solidity of a thing",
            "This means you do not exist and the self is an illusion",
          ],
          correctIndex: 2,
          explanation:
            "The observer works. You use it every time you notice a pattern or catch a reaction. But when you turn attention around to look at the observer itself, it is more like a mirror than a face. It is real without being solid. This is not a failure of the exercise. It is the discovery.",
        },
      },
      {
        id: "e28-1-sp",
        difficulty: 3,
        content: {
          type: "socratic-prompt",
          question:
            "Right now, close your eyes for 10 seconds. Try to find the center of your awareness. Where is the 'you' that is looking? Can you locate it?",
          reflection:
            "Most people expect to find something — a point, a location, a feeling of 'me.' What they actually find is harder to describe.",
          revealLabel: "What most people find",
          conceptTitle: "The looker cannot be found",
          conceptBody:
            "When you turn attention around to look for the one who is aware, you don't find a thing. You find... openness. Space. Awareness without a center. This is not a failure of the exercise. It IS the exercise. The observer you have been strengthening throughout this app is real — it works, it helps you catch your patterns. But when you look for it directly, it doesn't have the solidity you expected. It is more like a mirror than a face.",
        },
      },
    ],
  },
  {
    id: "looker-emotions",
    unitId: "the-looker",
    order: 2,
    title: "Look for the one who is angry",
    subtitle: "Applying the investigation to real feelings",
    xpReward: 30,
    // Pattern C: concept-intro → multiple-choice → fill-in-blank → scenario → sorting
    exercises: [
      {
        id: "e28-2-i",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "Now try it with a feeling",
          body: "The last lesson was abstract. This one is personal. Think of the last time you felt a strong emotion — anger, sadness, anxiety, longing. Now ask: who felt that? Not 'why did I feel that' (you already know — your type predisposes you to it). But WHO is the one who felt it? Can you find that person? Or do you just find... the feeling, arising in awareness, with no fixed owner?",
        },
      },
      {
        id: "e28-2-mc",
        difficulty: 2,
        content: {
          type: "multiple-choice",
          question:
            "When you look for the one who is angry — the person behind the emotion — what does the investigation typically reveal?",
          options: [
            "A clear, stable self located behind the eyes that is experiencing the anger",
            "Nothing at all — the self and the emotion are both unreal",
            "The emotion is vivid and real, but the fixed self who supposedly owns it is harder to locate than expected",
            "That anger belongs to the Enneagram type, not to the person",
          ],
          correctIndex: 2,
          explanation:
            "The emotion is completely real. The investigation does not make it less real. What becomes harder to locate is the solid, fixed owner of the emotion. Instead of a person who has anger, you find anger arising in something more open. The feeling stays. The grip on a fixed 'me' loosens.",
        },
      },
      {
        id: "e28-2-fib",
        difficulty: 2,
        content: {
          type: "fill-in-blank",
          sentence:
            "The Enneagram says you are a Type X. This experiment suggests you might be the ___ in which Type X happens.",
          options: ["story", "body", "space", "cause"],
          correctIndex: 2,
          explanation:
            "This is the shift the looker investigation points toward. Your type is real — it shapes how emotions arise, what they feel like, what triggers them. But the experiment suggests that you might be something larger than the type: the open awareness in which the type's patterns arise and pass away.",
        },
      },
      {
        id: "e28-2-sc",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario:
            "You are furious at a friend who cancelled plans at the last minute. The anger is hot and vivid. In the middle of it, you remember the experiment and ask: who is angry right now? You look for the one behind the anger. For a brief moment, there is just anger — arising in something open, with no fixed owner. The anger does not disappear, but something about it shifts.",
          question: "What happened in that moment of looking?",
          options: [
            "You suppressed the anger by intellectualizing it",
            "You dissociated from a healthy emotion you should have felt fully",
            "You briefly saw the emotion as an experience arising in awareness rather than as something owned by a fixed self",
            "You proved that anger is not real and should be ignored",
          ],
          correctIndex: 2,
          explanation:
            "The emotion is completely real. The investigation does not make it less real. What shifts is the sense of ownership. Instead of 'I am angry,' there is 'anger is happening.' The feeling stays. The grip loosens. That is the difference between being consumed by an emotion and being aware of it.",
        },
      },
      {
        id: "e28-2-so",
        difficulty: 2,
        content: {
          type: "sorting",
          instruction:
            "Sort these statements into 'fused with the emotion' or 'aware of the emotion' — based on whether the person is identified with the feeling or observing it in open space.",
          categories: ["Fused with the emotion", "Aware of the emotion"],
          items: [
            {
              text: "I am an anxious person — this is just who I am",
              categoryIndex: 0,
            },
            {
              text: "There is anxiety here right now, arising and passing",
              categoryIndex: 1,
            },
            {
              text: "I can't help it — I just get angry, it takes over",
              categoryIndex: 0,
            },
            {
              text: "Anger is here. I can see it happening without becoming it",
              categoryIndex: 1,
            },
            {
              text: "The sadness is me — I have been sad for years",
              categoryIndex: 0,
            },
            {
              text: "Something sad is moving through awareness right now",
              categoryIndex: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "looker-daily",
    unitId: "the-looker",
    order: 3,
    title: "Dropping in",
    subtitle: "A 10-second practice you can do anytime",
    xpReward: 30,
    // Pattern A: concept-intro → multiple-choice → sorting → scenario → free-recall
    exercises: [
      {
        id: "e28-3-i",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "The practice is 10 seconds long",
          body: "This is not meditation. You do not need to sit down, close your eyes, or set a timer. The practice is: at any moment during your day, turn your attention around. Just for a moment. Instead of looking OUT at the world, look back at the one who is looking. What is here? Not what you think. What you find. This takes 10 seconds. It can happen on the bus, in a meeting, while brushing your teeth. The brevity is the point.",
        },
      },
      {
        id: "e28-3-mc",
        difficulty: 2,
        content: {
          type: "multiple-choice",
          question:
            "What does a successful 10-second 'drop in' look like in practice?",
          options: [
            "Achieving a sustained state of no-thought for the full 10 seconds",
            "Briefly turning attention around — glimpsing the background awareness before the narrative resumes",
            "Confirming that you have no fixed self and feel completely at peace",
            "Setting a timer, closing your eyes, and entering a light meditative state",
          ],
          correctIndex: 1,
          explanation:
            "The practice is a glimpse, not a sustained state. Turning attention around for a moment — even half a second — before the narrative machinery restarts is the practice working correctly. The brevity is not a flaw. It is the format.",
        },
      },
      {
        id: "e28-3-so",
        difficulty: 2,
        content: {
          type: "sorting",
          instruction:
            "Sort these moments into 'a natural drop-in opportunity' or 'probably not the moment' — based on whether there is a natural pause where the 10-second practice could fit.",
          categories: [
            "A natural drop-in opportunity",
            "Probably not the moment",
          ],
          items: [
            {
              text: "Waiting for the elevator to arrive",
              categoryIndex: 0,
            },
            {
              text: "In the middle of a difficult negotiation",
              categoryIndex: 1,
            },
            {
              text: "The few seconds after you set down your coffee cup",
              categoryIndex: 0,
            },
            {
              text: "While driving in heavy traffic requiring full attention",
              categoryIndex: 1,
            },
            {
              text: "The pause before you open a new browser tab",
              categoryIndex: 0,
            },
            {
              text: "Mid-sentence during an important conversation",
              categoryIndex: 1,
            },
          ],
        },
      },
      {
        id: "e28-3-sc",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario:
            "You are washing dishes. Your mind is somewhere else entirely — replaying an argument, planning tomorrow, judging yourself. Then for a moment, you feel the water on your hands. Just the water. No story, no type, no label. A brief gap in the commentary. Then the thoughts rush back in.",
          question: "What was that gap?",
          options: [
            "A meaningless lapse in concentration",
            "A sign that you should meditate more to sustain it longer",
            "A moment of awareness before the narrative machinery restarted — which is always available and does not need to be prolonged to be real",
            "Proof that thinking is the enemy and should be stopped",
          ],
          correctIndex: 2,
          explanation:
            "That gap is what the 10-second practice points toward. It is not a state you achieve through effort. It is the background that is always here, briefly visible when the foreground of narrative pauses. The brevity is not a flaw. A half second of unlabeled awareness is not a lesser version. It is the thing itself.",
        },
      },
      {
        id: "e28-3-fr",
        difficulty: 3,
        content: {
          type: "free-recall",
          prompt:
            "What is here before the labels? Try the 10-second drop-in right now, then describe what you found — or did not find — before your type pattern activated.",
          keyTerms: [
            "before",
            "quiet",
            "space",
            "awareness",
            "nothing",
            "open",
            "here",
          ],
          minWords: 15,
          modelAnswer:
            "If you found even a half-second of unlabeled awareness, you have done the practice. That half-second is not a lesser version of enlightenment. It is the thing itself. Brief, ordinary, and always available.",
        },
      },
    ],
  },
];
