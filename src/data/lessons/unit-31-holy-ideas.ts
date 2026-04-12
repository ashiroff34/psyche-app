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
    // Pattern B: concept-intro → fill-in-blank → matching-pairs → scenario → socratic-prompt
    id: "holy-intro",
    unitId: "holy-ideas",
    order: 1,
    title: "The gift hidden inside the pattern",
    subtitle: "What becomes available when the fixation relaxes",
    xpReward: 40,
    personalized: true,
    personalizeFor: "enneagramType",
    exercises: [
      {
        id: "h31-1-i",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "Your pattern is a distortion of something beautiful",
          body: "Every Enneagram type's fixation, the thing that causes the most suffering, is actually a distorted version of a genuine perception of reality. The 1's perfectionism is a distortion of the perception that reality is already whole. The 7's escape is a distortion of the perception that depth lives in staying. When the distortion relaxes, the original perception becomes available. That is the hidden gift.",
        },
      },
      {
        id: "h31-1-fib",
        difficulty: 2,
        content: {
          type: "fill-in-blank",
          sentence: "The type's fixation and its hidden gift are two sides of the same ___. The intensity of the suffering often points to the depth of what is available underneath it.",
          options: ["coin", "pattern", "story"],
          correctIndex: 0,
          explanation: "If the gift and the suffering were unrelated, understanding the suffering would not help you access the gift. But they are connected — the same energy that drives the compulsion is the energy available when the compulsion relaxes. The 1's relentless drive for correctness, when it settles, becomes the capacity to see wholeness. The coin flips.",
        },
      },
      {
        id: "h31-1-mp",
        difficulty: 2,
        content: {
          type: "matching-pairs",
          instruction: "Match each type's core fixation with the hidden gift that lives underneath it — the perception that becomes available when the distortion relaxes.",
          pairs: [
            { left: "The 1's inner critic demanding perfection", right: "Perceiving reality as already whole" },
            { left: "The 2's need to give in order to be loved", right: "Perceiving love as unconditional and prior to action" },
            { left: "The 5's need to understand before engaging", right: "Perceiving reality through direct contact, not models" },
            { left: "The 7's compulsion to seek the next experience", right: "Perceiving depth as found by staying, not moving" },
            { left: "The 9's self-erasure to preserve peace", right: "Perceiving one's own presence as necessary to real harmony" },
          ],
        },
      },
      {
        id: "h31-1-sc",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario: "A Type 3 has spent their career achieving at a relentless pace. In a quiet moment, someone who loves them says: 'I don't love you for what you do. I love you for who you are when you stop performing.' The Type 3 feels both threatened and deeply relieved by this. The threat is to the pattern. The relief is something older.",
          question: "What does the relief point toward?",
          options: [
            "The Type 3 secretly wants to quit working and needs permission",
            "The relief is a sign of the hidden gift — the perception that being has value independent of doing, which the fixation has been obscuring",
            "The Type 3 is exhausted and needs rest, not a philosophical insight",
            "The person's words have removed the Type 3's motivation structure",
          ],
          correctIndex: 1,
          explanation: "The relief is not about rest. It is about recognition. Something in the Type 3 already knows that being has value without doing — the fixation just keeps that perception buried under urgency and performance. When someone speaks to what is underneath, the body responds before the mind can argue. That response is the gift announcing itself.",
        },
      },
      {
        id: "h31-1-sp",
        difficulty: 3,
        content: {
          type: "socratic-prompt",
          question: "What is the most painful part of your type's pattern? Can you imagine what it might be a distortion of?",
          reflection: "The suffering and the gift are two sides of the same coin. The intensity of the suffering often points to the depth of the gift.",
          revealLabel: "Your type's hidden gift",
          conceptTitle: "The perception underneath the pattern",
          conceptBody: "Each type's fixation distorts a specific way of seeing reality. When the fixation loosens, not disappears but loosens, the original perception re-emerges. This is not something you achieve. It is something you stop blocking.",
        },
      },
    ],
  },
  {
    // Pattern C: concept-intro → multiple-choice → fill-in-blank → scenario → sorting
    id: "holy-practice",
    unitId: "holy-ideas",
    order: 2,
    title: "The practice that fits your type",
    subtitle: "A contemplative exercise matched to your pattern",
    xpReward: 40,
    personalized: true,
    personalizeFor: "enneagramType",
    exercises: [
      {
        id: "h31-2-i",
        difficulty: 1,
        content: {
          type: "concept-intro",
          title: "Not all practices work the same for all types",
          body: "A practice that transforms a Type 3 might bore a Type 7. An exercise that grounds a Type 6 might frustrate a Type 8. The contemplative traditions figured this out centuries ago: the medicine must match the disease. Your type has a specific practice that addresses its specific distortion.",
        },
      },
      {
        id: "h31-2-mc",
        difficulty: 2,
        content: {
          type: "multiple-choice",
          question: "Why does a useful contemplative practice for your type often feel slightly uncomfortable or even threatening?",
          options: [
            "Because effective practices are inherently painful and discomfort signals progress",
            "Because the practice asks you to do the exact thing your pattern has been avoiding, which the pattern experiences as dangerous",
            "Because unfamiliar practices always feel uncomfortable until they become habit",
            "Because the discomfort means you have chosen the wrong practice for your type",
          ],
          correctIndex: 1,
          explanation: "The practice targets the specific move your type refuses to make. For the 5, direct embodied contact without analysis. For the 2, receiving without giving. For the 6, acting without external confirmation. The pattern calls these moves dangerous. The practice says: try anyway. The discomfort is not a red flag. It is the address of the gift.",
        },
      },
      {
        id: "h31-2-fib",
        difficulty: 2,
        content: {
          type: "fill-in-blank",
          sentence: "The practice always asks you to do the thing your pattern says is ___. That is how you know it is the right practice.",
          options: ["dangerous", "boring", "impossible"],
          correctIndex: 0,
          explanation: "Each type has built an elaborate defense around one specific move. The 8's armor says vulnerability is dangerous. The 9's fading says assertion is dangerous. The 4's longing says ordinary belonging is dangerous. The right practice walks directly toward that declared danger and discovers it was never what the pattern said it was.",
        },
      },
      {
        id: "h31-2-sc",
        difficulty: 2,
        content: {
          type: "scenario",
          scenario: "A Type 6 is given a practice: make one small decision today without consulting anyone or researching further. Just act from what you already know. The Type 6 starts the practice and immediately feels the pull to check one more source, ask one more person. They pause. They feel the groundlessness. Then they decide anyway. Nothing catastrophic happens. For a moment, they feel something unfamiliar: solid.",
          question: "What has just occurred in this practice moment?",
          options: [
            "The Type 6 has suppressed their natural caution, which could lead to poor decisions",
            "The Type 6 has discovered their hidden gift — that inner authority exists and does not require external confirmation to be real",
            "The practice has worked by making the Type 6 feel confident, which is the goal of all growth",
            "The Type 6 has temporarily overridden their type, which will revert under pressure",
          ],
          correctIndex: 1,
          explanation: "The groundlessness the Type 6 feared turned out to be survivable. And inside the groundlessness was something solid: their own knowing. The gift of the 6 is courage — not the absence of fear, but the discovery that inner authority is real and does not need external scaffolding. The practice created the conditions for that discovery.",
        },
      },
      {
        id: "h31-2-sort",
        difficulty: 3,
        content: {
          type: "sorting",
          instruction: "Sort each description of a practice moment into whether it reflects THE PATTERN DEFENDING ITSELF or THE GIFT BEGINNING TO EMERGE.",
          categories: ["Pattern Defending", "Gift Emerging"],
          items: [
            { text: "A Type 2 sits quietly doing nothing helpful and notices: 'I am still here. I am still enough.'", categoryIndex: 1 },
            { text: "A Type 7 stays with one experience longer and feels the familiar urge to move on to something better", categoryIndex: 0 },
            { text: "A Type 1 looks at a messy room and feels, briefly, that nothing here actually needs correcting", categoryIndex: 1 },
            { text: "A Type 8 is about to share something vulnerable and pulls back, deciding it would make them look weak", categoryIndex: 0 },
            { text: "A Type 9 states a preference out loud and notices the world does not end", categoryIndex: 1 },
            { text: "A Type 5 touches a wall and immediately starts analyzing the texture instead of just feeling it", categoryIndex: 0 },
          ],
        },
      },
    ],
  },
];
