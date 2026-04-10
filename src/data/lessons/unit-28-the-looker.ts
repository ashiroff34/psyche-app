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
    exercises: [
      { id: "e28-1-i", difficulty: 1, content: { type: "concept-intro", title: "A strange experiment", body: "You have spent this entire app studying yourself. Your type. Your patterns. Your defenses. Now try something different: instead of studying the contents of your mind, try to find the one who is studying them. Not think about the observer. Actually look for it. Turn your attention around 180 degrees and try to find the thing that is aware right now. What do you find?" } },
      { id: "e28-1-s", difficulty: 2, content: { type: "socratic-prompt", question: "Right now, close your eyes for 10 seconds. Try to find the center of your awareness. Where is the 'you' that is looking? Can you locate it?", reflection: "Most people expect to find something, a point, a location, a feeling of 'me.' What they actually find is harder to describe.", revealLabel: "What most people find", conceptTitle: "The looker cannot be found", conceptBody: "When you turn attention around to look for the one who is aware, you don't find a thing. You find... openness. Space. Awareness without a center. This is not a failure of the exercise. It IS the exercise. The observer you have been strengthening throughout this app is real, it works, it helps you catch your patterns. But when you look for it directly, it doesn't have the solidity you expected. It is more like a mirror than a face." } },
      { id: "e28-1-f", difficulty: 3, content: { type: "free-recall", prompt: "Describe what you found (or didn't find) when you looked for the one who is looking. Use whatever words feel honest.", keyTerms: ["nothing", "space", "open", "couldn't", "awareness", "empty", "there"], minWords: 15, modelAnswer: "Whatever you wrote is valid. This is not about getting the 'right' answer. Some people find nothing. Some find spaciousness. Some find that the question itself dissolves. All of these are worth sitting with." } },
      { id: "e28-1-sc1", difficulty: 2, content: { type: "scenario", scenario: "You are sitting alone in a quiet room. You try the experiment: turn your attention around and look for the one who is aware. You expect to find something solid, a point behind your eyes, a center, a 'me.' Instead, you find something you cannot quite name. It is not nothing. But it is not a thing either. It feels more like open space than like a person.", question: "What does this experience suggest about the nature of the observer?", options: ["The exercise failed because you should have found a clear sense of self", "Your awareness has a fixed center that you simply could not locate yet", "The observer is real and functional, but when you look for it directly, it does not have the solidity of a thing", "This means you do not exist and the self is an illusion"], correctIndex: 2, explanation: "The observer works. You use it every time you notice a pattern or catch a reaction. But when you turn attention around to look at the observer itself, it is more like a mirror than a face. It is real without being solid. This is not a failure of the exercise. It is the discovery." } },
      { id: "e28-1-fr2", difficulty: 3, content: { type: "free-recall", prompt: "After trying the experiment, what surprised you most? Did you expect to find something specific? What was it like when the looking itself was all there was?", keyTerms: ["surprised", "expected", "looking", "found", "nothing", "space", "awareness"], minWords: 20, modelAnswer: "Most people are surprised by the gap between what they expected and what they found. The expectation is usually a solid center, a 'me' located somewhere behind the eyes. The finding is usually more open than that. This gap between expectation and experience is itself the insight." } },
    ],
  },
  {
    id: "looker-emotions",
    unitId: "the-looker",
    order: 2,
    title: "Look for the one who is angry",
    subtitle: "Applying the investigation to real feelings",
    xpReward: 30,
    exercises: [
      { id: "e28-2-i", difficulty: 1, content: { type: "concept-intro", title: "Now try it with a feeling", body: "The last lesson was abstract. This one is personal. Think of the last time you felt a strong emotion, anger, sadness, anxiety, longing. Now ask: who felt that? Not 'why did I feel that' (you already know, your type predisposes you to it). But WHO is the one who felt it? Can you find that person? Or do you just find... the feeling, arising in awareness, with no fixed owner?" } },
      { id: "e28-2-s", difficulty: 2, content: { type: "socratic-prompt", question: "Remember the last time your type's core emotion fired (your passion, your fixation). Now look: is there a 'you' behind the emotion, or is there just the emotion appearing in open space?", reflection: "This is the investigation. Not a belief to adopt. An experiment to repeat.", revealLabel: "What this changes", conceptTitle: "Emotions without an owner", conceptBody: "When you look for the one who is angry, you find anger. When you look for the one who is afraid, you find fear. The emotion is real. But the solid, fixed 'self' who supposedly owns it is harder to locate than you expected. This does not mean you don't exist. It means your existence might be more fluid, more spacious, and less confined than your type structure suggests. The Enneagram says you are a Type X. This experiment says: maybe you are the space in which Type X happens." } },
      { id: "e28-2-f", difficulty: 3, content: { type: "free-recall", prompt: "Try the experiment with YOUR type's core emotion. Look for the one who feels it. Write what you notice.", keyTerms: ["notice", "found", "feeling", "space", "just", "awareness", "no one", "it"], minWords: 20, modelAnswer: "This is a practice, not a conclusion. You may need to do this dozens of times before anything shifts. The value is in the looking, not in reaching a particular answer. Some days you will find a solid self. Some days you won't. Both are honest." } },
      { id: "e28-2-sc1", difficulty: 2, content: { type: "scenario", scenario: "You are furious at a friend who cancelled plans at the last minute. The anger is hot and vivid. In the middle of it, you remember the experiment and ask: who is angry right now? You look for the one behind the anger. For a brief moment, there is just anger, arising in something open, with no fixed owner. The anger does not disappear, but something about it shifts.", question: "What happened in that moment of looking?", options: ["You suppressed the anger by intellectualizing it", "You dissociated from a healthy emotion you should have felt fully", "You briefly saw the emotion as an experience arising in awareness rather than as something owned by a fixed self", "You proved that anger is not real and should be ignored"], correctIndex: 2, explanation: "The emotion is completely real. The investigation does not make it less real. What shifts is the sense of ownership. Instead of 'I am angry,' there is 'anger is happening.' The feeling stays. The grip loosens. That is the difference between being consumed by an emotion and being aware of it." } },
      { id: "e28-2-fr2", difficulty: 3, content: { type: "free-recall", prompt: "Think of the last strong emotion you felt. Now ask: where was 'you' in that experience? Were you the emotion, the one watching it, or something else entirely?", keyTerms: ["emotion", "watching", "where", "you", "felt", "who", "inside"], minWords: 20, modelAnswer: "This question does not have a clean answer. That is the point. When you look closely, the boundary between 'the one who feels' and 'the feeling' starts to blur. That blurring is not confusion. It is a more accurate picture of what is actually happening in any moment of experience." } },
    ],
  },
  {
    id: "looker-daily",
    unitId: "the-looker",
    order: 3,
    title: "Dropping in",
    subtitle: "A 10-second practice you can do anytime",
    xpReward: 30,
    exercises: [
      { id: "e28-3-i", difficulty: 1, content: { type: "concept-intro", title: "The practice is 10 seconds long", body: "This is not meditation. You do not need to sit down, close your eyes, or set a timer. The practice is: at any moment during your day, turn your attention around. Just for a moment. Instead of looking OUT at the world, look back at the one who is looking. What is here? Not what you think. What you find. This takes 10 seconds. It can happen on the bus, in a meeting, while brushing your teeth. The brevity is the point." } },
      { id: "e28-3-s", difficulty: 2, content: { type: "socratic-prompt", question: "Try it right now. 10 seconds. Look for the looker. What is the texture of your awareness right now, before you add a label to it?", reflection: "Before you add 'I am a Type X' to this moment. Before you add 'I am feeling Y.' What is here before the labels?", revealLabel: "The unlabeled moment", conceptTitle: "Before the story", conceptBody: "There is a moment, very brief, before your type pattern activates, before the defense fires, before the narrative begins. In that moment, there is just awareness. No type. No pattern. No story. Just this. That moment is always available. It is not a state you achieve. It is the background that is always here, usually obscured by the foreground of personality. The 10-second practice is about glimpsing it, not holding it." } },
      { id: "e28-3-f", difficulty: 3, content: { type: "free-recall", prompt: "What is here before the labels? Describe the moment before your type activates.", keyTerms: ["before", "quiet", "space", "awareness", "nothing", "open", "here"], minWords: 15, modelAnswer: "If you found even a half-second of unlabeled awareness, you have done the practice. That half-second is not a lesser version of enlightenment. It is the thing itself. Brief, ordinary, and always available." } },
      { id: "e28-3-sc1", difficulty: 2, content: { type: "scenario", scenario: "You are washing dishes. Your mind is somewhere else entirely, replaying an argument, planning tomorrow, judging yourself. Then for a moment, you feel the water on your hands. Just the water. No story, no type, no label. A brief gap in the commentary. Then the thoughts rush back in.", question: "What was that gap?", options: ["A meaningless lapse in concentration", "A sign that you should meditate more to sustain it longer", "A moment of awareness before the narrative machinery restarted, which is always available and does not need to be prolonged to be real", "Proof that thinking is the enemy and should be stopped"], correctIndex: 2, explanation: "That gap is what the 10 second practice points toward. It is not a state you achieve through effort. It is the background that is always here, briefly visible when the foreground of narrative pauses. The brevity is not a flaw. A half second of unlabeled awareness is not a lesser version. It is the thing itself." } },
      { id: "e28-3-fr2", difficulty: 3, content: { type: "free-recall", prompt: "Can you recall a moment today, even a brief one, when you were simply aware without narrating your experience? What was it like? What brought the narration back?", keyTerms: ["moment", "aware", "quiet", "narrating", "brief", "back", "gap"], minWords: 20, modelAnswer: "These moments happen more often than you think. They are just quiet enough that the narrative mind does not flag them as important. The practice is not creating more of them. It is noticing the ones that are already happening, scattered throughout your ordinary day." } },
    ],
  },
];
