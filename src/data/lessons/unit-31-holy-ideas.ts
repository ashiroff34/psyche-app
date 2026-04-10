// Unit 31: Your Type's Hidden Gift (The Holy Ideas)
//
// Based on Oscar Ichazo's original Enneagram map. Each type's fixation is
// a distortion of a specific perception of reality (the "Holy Idea").
// When the fixation relaxes, the Holy Idea becomes available naturally.
//
// This is the Enneagram's own contemplative endgame, not imported from
// another tradition. Presented as concepts, no labels, with opt-in lineage.
//
// Prerequisite: Unit 30 (Holding Both). The user has already built the
// capacity to hold "type AND awareness" simultaneously.

import type { Lesson } from "@/types/lessons";

const HOLY_IDEAS: Record<number, { idea: string; concept: string; practice: string; liberation: string }> = {
  1: {
    idea: "Reality is already whole",
    concept: "Your pattern says the world is broken and needs fixing. The hidden gift is the perception that reality, including you, is already complete. Not perfect in the way the critic means. Complete in the way a forest is complete: messy, alive, and not missing anything.",
    practice: "Spend 5 minutes looking at something natural: a tree, the sky, your own hands. Ask: what if nothing here needs correcting?",
    liberation: "Serenity. Not the absence of standards, but standards held lightly, without the suffering of demanding that reality conform.",
  },
  2: {
    idea: "Love does not need to be earned",
    concept: "Your pattern says you must give to be loved. The hidden gift is the perception that love, the real kind, is not transactional. It exists before you do anything. You were loved before you were useful.",
    practice: "Sit for 3 minutes and do nothing helpful. Notice the discomfort. Then notice: you are still here. You are still lovable.",
    liberation: "Humility. Not self-effacement, but the quiet recognition that you are worthy of love without earning it.",
  },
  3: {
    idea: "Being has value without doing",
    concept: "Your pattern says you are what you achieve. The hidden gift is the perception that existence itself, just being here, has value independent of any output. The oak tree does not perform. It is.",
    practice: "Spend 5 minutes doing nothing productive. Not resting to be more productive later. Just being. Notice what arises.",
    liberation: "Truthfulness. Not just honesty with others, but the capacity to be real, to drop the image, to exist without a performance.",
  },
  4: {
    idea: "You are already connected",
    concept: "Your pattern says you are fundamentally separate, missing something essential that others have. The hidden gift is the perception that you were never actually disconnected. The longing itself is evidence of the connection. You cannot miss what you never had.",
    practice: "Notice one moment today where you felt genuinely part of something. Not special within it. Part of it.",
    liberation: "Equanimity. Not the absence of deep feeling, but the ability to feel deeply without being destroyed by it.",
  },
  5: {
    idea: "Reality can be contacted directly",
    concept: "Your pattern says you need to understand everything before you can engage with it. The hidden gift is the perception that reality is accessible through direct contact, not just through mental models. The map is never the territory. At some point, you walk.",
    practice: "Touch something physical: a wall, fabric, water. Stay with the raw sensation for 30 seconds without interpreting it. That contact is knowledge too.",
    liberation: "Non-attachment. Not detachment (which is the defense) but the ability to engage fully without needing to control the outcome through understanding.",
  },
  6: {
    idea: "Groundlessness is not dangerous",
    concept: "Your pattern says you need certainty to be safe. The hidden gift is the perception that groundlessness, not knowing, having no authority to lean on, is actually the natural condition of being alive. And it is not dangerous. It is free.",
    practice: "Make one small decision today without consulting anyone or researching further. Act from what you already know. Notice what happens.",
    liberation: "Courage. Not the absence of fear, but the capacity to act from inner authority without needing external validation.",
  },
  7: {
    idea: "Depth is found by staying",
    concept: "Your pattern says the next experience will be better than this one. The hidden gift is the perception that depth, satisfaction, and richness come from staying with one thing fully, not from sampling many things partially. The symphony is in the sustained note, not the chord progression.",
    practice: "Choose one experience today and stay with it 10% longer than your instinct says. Notice what opens up in the extra time.",
    liberation: "Sobriety. Not the absence of joy, but joy that does not depend on novelty or escape.",
  },
  8: {
    idea: "Vulnerability is the doorway",
    concept: "Your pattern says softness is weakness and the world requires armor. The hidden gift is the perception that your vulnerability, the tender thing you protect behind all that force, is not a liability. It is the only doorway to the intimacy and trust you actually want.",
    practice: "Tell one person one small truth you would normally withhold. Not a dramatic confession. Just something honest that your armor would usually filter out.",
    liberation: "Innocence. Not naivety, but the capacity to meet the world without preemptive defense.",
  },
  9: {
    idea: "Your presence matters",
    concept: "Your pattern says you do not matter enough to disrupt the peace. The hidden gift is the perception that your presence, your voice, your preferences, your anger, are not a threat to harmony. They are a necessary part of it. Real harmony includes you. Not a muted version. The actual you.",
    practice: "State one preference out loud today that you would normally suppress. Not a demand. A preference. Notice that the world does not end.",
    liberation: "Right action. Not passivity, but the capacity to act from your own center without needing permission.",
  },
};

export const unit31Lessons: Lesson[] = [
  {
    id: "holy-intro",
    unitId: "holy-ideas",
    order: 1,
    title: "The gift hidden inside the pattern",
    subtitle: "What becomes available when the fixation relaxes",
    xpReward: 40,
    personalized: true,
    personalizeFor: "enneagramType",
    exercises: [
      { id: "h31-1-i", difficulty: 1, content: { type: "concept-intro", title: "Your pattern is a distortion of something beautiful", body: "Every Enneagram type's fixation, the thing that causes the most suffering, is actually a distorted version of a genuine perception of reality. The 1's perfectionism is a distortion of the perception that reality is already whole. The 7's escape is a distortion of the perception that depth lives in staying. When the distortion relaxes, the original perception becomes available. That is the hidden gift." } },
      { id: "h31-1-s", difficulty: 2, content: { type: "socratic-prompt", question: "What is the most painful part of your type's pattern? Can you imagine what it might be a distortion of?", reflection: "The suffering and the gift are two sides of the same coin. The intensity of the suffering often points to the depth of the gift.", revealLabel: "Your type's hidden gift", conceptTitle: "The perception underneath the pattern", conceptBody: "Each type's fixation distorts a specific way of seeing reality. When the fixation loosens, not disappears but loosens, the original perception re-emerges. This is not something you achieve. It is something you stop blocking." } },
      { id: "h31-1-f", difficulty: 3, content: { type: "free-recall", prompt: "In your own words, what is the thing your type is most afraid of? And what would become possible if that fear loosened its grip by 10%?", keyTerms: ["afraid", "fear", "loosen", "possible", "if"], minWords: 20, modelAnswer: "The fear and the gift are connected. The 1's fear of being wrong hides the gift of accepting what is. The 4's fear of being ordinary hides the gift of belonging. Whatever you wrote about the fear points directly at the gift." } },
    ],
  },
  {
    id: "holy-practice",
    unitId: "holy-ideas",
    order: 2,
    title: "The practice that fits your type",
    subtitle: "A contemplative exercise matched to your pattern",
    xpReward: 40,
    personalized: true,
    personalizeFor: "enneagramType",
    exercises: [
      { id: "h31-2-i", difficulty: 1, content: { type: "concept-intro", title: "Not all practices work the same for all types", body: "A practice that transforms a Type 3 might bore a Type 7. An exercise that grounds a Type 6 might frustrate a Type 8. The contemplative traditions figured this out centuries ago: the medicine must match the disease. Your type has a specific practice that addresses its specific distortion." } },
      { id: "h31-2-s", difficulty: 2, content: { type: "socratic-prompt", question: "What is one practice or habit that has actually helped you loosen your pattern's grip, even a little? What made it work?", reflection: "The things that have already worked for you likely share a structure with the practices contemplative traditions recommend for your type.", revealLabel: "Your practice", conceptTitle: "The exercise for your type", conceptBody: "Each type benefits from a specific contemplative move. For some, it is stillness. For others, engagement. For others, honesty. The common thread: the practice always asks you to do the thing your pattern says is dangerous." } },
      { id: "h31-2-f", difficulty: 3, content: { type: "free-recall", prompt: "Try your type's practice right now (or commit to trying it today). Then write what you noticed, or what you anticipate noticing.", keyTerms: ["tried", "noticed", "felt", "practice", "different", "hard"], minWords: 20, modelAnswer: "The practice is meant to feel slightly uncomfortable, because it asks you to relax the very defense your type considers essential. That discomfort is the signal that it is working. Not because pain is good, but because the pattern's comfort zone IS the limitation." } },
    ],
  },
];
