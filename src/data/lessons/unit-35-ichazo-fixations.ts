// ─────────────────────────────────────────────────────────────────────────────
// Unit 35. Passions & Fixations
// Based directly on Oscar Ichazo's Enneagram of Fixations and Passions —
// the foundational psychospiritual map of the nine ego trances.
// 4 lessons × 6 exercises each. xpReward: 15.
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson } from "@/types/lessons";

// ── Lesson 1: Passions and Fixations ─────────────────────────────────────────

const lesson1: Lesson = {
  id: "u35-l1",
  unitId: "ichazo-fixations",
  order: 1,
  title: "Passions and Fixations",
  subtitle: "Ichazo's map of the nine ego trances",
  xpReward: 15,
  exercises: [
    {
      id: "u35-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Ichazo's Foundational Contribution",
        body: "In the 1970s, Oscar Ichazo described the nine Enneagram types in terms of two interlocking ego mechanisms: the Passion and the Fixation. The Passion is the emotional habit of the lower self — a distorted feeling that drives behavior compulsively. The Fixation is the mental habit — a distorted belief or mental pattern that maintains the ego structure. Together they create what Ichazo called the 'ego trance': the automatic, unconscious loop the personality runs on.",
        highlight: "ego trance",
      },
    },
    {
      id: "u35-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Two Levels of the Ego Structure",
        body: "Ichazo distinguished the emotional level (Passion) from the mental level (Fixation). Claudio Naranjo later developed this framework clinically and Riso-Hudson incorporated it into their Levels of Development. The Passion is felt in the body and emotional system — it moves the person toward automatic behavior. The Fixation is the mental story or belief that justifies and perpetuates the Passion. One without the other would collapse; together, they form a self-sustaining loop.",
        highlight: "self-sustaining loop",
      },
    },
    {
      id: "u35-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "In Ichazo's system, what is the Passion?",
        options: [
          "A positive emotion each type expresses when healthy",
          "The emotional habit of the lower self — a distorted feeling that drives behavior compulsively",
          "The mental belief pattern that maintains the ego structure",
          "A spiritual gift unique to each Enneagram type",
        ],
        correctIndex: 1,
        explanation:
          "Ichazo defined the Passion as the emotional habit of the lower self — a chronic, distorted emotional pattern that drives compulsive behavior. It is felt, not thought. The Fixation is its mental counterpart.",
      },
    },
    {
      id: "u35-l1-e4",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "What is the relationship between Passion and Fixation?",
        options: [
          "They are the same concept described in two different ways",
          "The Passion is the mental level; the Fixation is the emotional level",
          "The Passion is the emotional habit; the Fixation is the mental habit — together they form a self-sustaining ego loop",
          "The Fixation always comes first and generates the Passion",
        ],
        correctIndex: 2,
        explanation:
          "Ichazo's framework is a two-level model: Passion operates at the emotional level (felt experience driving behavior), Fixation operates at the mental level (the belief or story). They reinforce each other in a self-sustaining loop that Ichazo called the ego trance.",
      },
    },
    {
      id: "u35-l1-e5",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Rafael is a Type 3. He constantly feels an underlying anxiety that he is not good enough unless he is succeeding — a feeling of shame that he has never quite examined. To quiet this feeling, he works compulsively, shapes his presentation to whatever will impress others, and avoids any situation where he might fail visibly. He has a mental belief that runs beneath everything: 'I am my achievements. Without success, I am nothing.'",
        question: "In Ichazo's framework, how would you describe what is happening for Rafael?",
        options: [
          "Rafael's Passion is Vanity (the emotional drive to be seen as successful) and his Fixation is Deceit (the mental habit of shaping reality to match a desired image). Together they create the Type 3 ego trance.",
          "Rafael's Passion is Pride and his Fixation is Flattery — he is clearly a Type 2 who helps others to feel valued",
          "Rafael has no Fixation — he is simply a motivated person who enjoys success",
          "Rafael's ego trance will resolve automatically once he achieves enough success",
        ],
        correctIndex: 0,
        explanation:
          "Rafael's underlying anxiety about worth maps to the Type 3 Passion (Vanity/Deceit — the emotional need to be valued through image and achievement) and his mental habit of identity-through-achievement maps to the Type 3 Fixation (Vanity). Together they form the Type 3 ego trance as Ichazo described it.",
      },
    },
    {
      id: "u35-l1-e6",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "Why did Ichazo call the Passion-Fixation loop an 'ego trance'?",
        options: [
          "Because it can be cured through hypnosis",
          "Because it operates automatically and unconsciously — the person is 'asleep' to the pattern while inside it",
          "Because it is a meditative state of focused attention",
          "Because it only activates during sleep and dreaming",
        ],
        correctIndex: 1,
        explanation:
          "Ichazo's term 'ego trance' captures the automatic, unconscious nature of these loops. When someone is inside their Passion-Fixation loop, they are not choosing it — they are being run by it. Awareness is the first step toward waking up from the trance.",
      },
    },
  ],
};

// ── Lesson 2: The Nine Passions ───────────────────────────────────────────────

const lesson2: Lesson = {
  id: "u35-l2",
  unitId: "ichazo-fixations",
  order: 2,
  title: "The Nine Passions",
  subtitle: "The emotional habits of the nine types",
  xpReward: 15,
  exercises: [
    {
      id: "u35-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Passions: Emotional Habits of the Lower Self",
        body: "Ichazo identified one Passion for each type: Type 1: Anger (resentment held below the surface), Type 2: Pride (believing others need you specifically), Type 3: Deceit/Vanity (shaping identity around image and achievement), Type 4: Envy (feeling that something essential is missing), Type 5: Avarice (hoarding energy, knowledge, and resources), Type 6: Fear/Cowardice (chronic anxiety about the future and safety), Type 7: Gluttony (insatiable appetite for experience and stimulation), Type 8: Lust/Excess (desire for intensity and power), Type 9: Sloth/Indolence (forgetting oneself and one's priorities).",
        highlight: "nine Passions",
      },
    },
    {
      id: "u35-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Passions Are Not Vices",
        body: "Ichazo's Passions are often translated using traditional terms — Anger, Pride, Envy, Gluttony — but they are not moral judgments. They are structural emotional habits: the automatic feeling-tone that colors each type's experience of reality. Riso and Hudson emphasize that the Passion is not something the person chooses; it is what they find themselves feeling before any conscious deliberation. Recognizing your Passion is the beginning of freedom from it.",
        highlight: "structural emotional habits",
      },
    },
    {
      id: "u35-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the Passion of Type 4, according to Ichazo's system?",
        options: [
          "Pride — believing they are uniquely gifted and special",
          "Gluttony — wanting more experiences and stimulation",
          "Envy — a chronic sense that something essential is missing in themselves",
          "Sloth — forgetting the self and merging with others' priorities",
        ],
        correctIndex: 2,
        explanation:
          "Ichazo identified Envy as the Passion of Type 4. This is not simply jealousy of others' possessions — it is a structural sense that something essential is missing in oneself, that others have a wholeness or belonging that Type 4 lacks.",
      },
    },
    {
      id: "u35-l2-e4",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "Type 1's Passion is Anger — but it rarely looks like explosive rage. Why?",
        options: [
          "Type 1s have eliminated anger through ethical discipline",
          "Type 1 anger is typically held beneath the surface as chronic low-grade resentment and frustration — often expressed as criticism or self-righteousness rather than open rage",
          "Type 1s actually have Pride as their Passion, not Anger",
          "Anger is only present in unhealthy Type 1s; healthy ones feel no anger at all",
        ],
        correctIndex: 1,
        explanation:
          "Ichazo and Naranjo both describe the Type 1 Passion as anger that is suppressed into chronic resentment, righteous indignation, and criticism. The anger is real but rarely expressed directly — it leaks out as moral frustration and perfectionism.",
      },
    },
    {
      id: "u35-l2-e5",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Yolanda is a Type 8. In any important meeting, negotiation, or confrontation, she notices something come alive in her — an appetite for the intensity of the moment, a push toward more impact, more directness, more force. When things feel soft, vague, or carefully managed, she feels something close to contempt. She wants the real thing — the raw truth, the full power of the exchange.",
        question: "Which Passion is Yolanda demonstrating, and how does it manifest?",
        options: [
          "Pride — she believes she is better than others in the room",
          "Avarice — she is hoarding the group's energy for herself",
          "Lust/Excess — the Type 8 Passion as Ichazo described it: an appetite for intensity, power, and the unmediated force of reality",
          "Anger — she is simply an angry person who has not done inner work",
        ],
        correctIndex: 2,
        explanation:
          "Ichazo named the Type 8 Passion Lust or Excess — not sexual lust, but an appetite for intensity, impact, and raw power. Yolanda's experience of coming alive in confrontation and disdain for softness is a clear expression of this Passion as it manifests in the Type 8 character.",
      },
    },
    {
      id: "u35-l2-e6",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "Which of the following correctly pairs all nine types with their Passions?",
        options: [
          "1: Anger, 2: Pride, 3: Deceit, 4: Envy, 5: Avarice, 6: Fear, 7: Gluttony, 8: Lust, 9: Sloth",
          "1: Pride, 2: Anger, 3: Envy, 4: Deceit, 5: Gluttony, 6: Avarice, 7: Sloth, 8: Fear, 9: Lust",
          "1: Anger, 2: Envy, 3: Pride, 4: Deceit, 5: Fear, 6: Avarice, 7: Lust, 8: Gluttony, 9: Sloth",
          "1: Sloth, 2: Pride, 3: Vanity, 4: Envy, 5: Avarice, 6: Lust, 7: Gluttony, 8: Fear, 9: Anger",
        ],
        correctIndex: 0,
        explanation:
          "The nine Passions as defined by Ichazo: Type 1 = Anger, Type 2 = Pride, Type 3 = Deceit/Vanity, Type 4 = Envy, Type 5 = Avarice, Type 6 = Fear/Cowardice, Type 7 = Gluttony, Type 8 = Lust/Excess, Type 9 = Sloth/Indolence.",
      },
    },
  ],
};

// ── Lesson 3: The Nine Fixations ──────────────────────────────────────────────

const lesson3: Lesson = {
  id: "u35-l3",
  unitId: "ichazo-fixations",
  order: 3,
  title: "The Nine Fixations",
  subtitle: "The mental habits that maintain the ego structure",
  xpReward: 15,
  exercises: [
    {
      id: "u35-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Fixations: Mental Habits of the Lower Self",
        body: "Where Passions are emotional, Fixations are mental. Ichazo identified one Fixation per type: Type 1: Resentment (preoccupation with imperfection and what is wrong), Type 2: Flattery (manipulating others through pleasing), Type 3: Vanity (identification with image and success), Type 4: Melancholy (dwelling in a sense of loss and longing), Type 5: Stinginess (withholding energy and resources), Type 6: Cowardice (mental rehearsal of danger and doubt), Type 7: Planning (generating future options to escape the present), Type 8: Vengeance (readiness to retaliate against betrayal), Type 9: Indolence (mental drift away from one's own priorities).",
        highlight: "nine Fixations",
      },
    },
    {
      id: "u35-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Fixation vs. Passion: The Critical Distinction",
        body: "The Fixation and the Passion can share similar names but operate differently. Type 3's Passion is Deceit — an emotional drive to shape and perform a desirable image. Type 3's Fixation is Vanity — the mental belief that 'I am my image and achievements.' The Passion is felt; the Fixation is believed. Type 1's Passion is Anger (emotional resentment) while the Fixation is Resentment (the mental habit of cataloguing what is wrong). The feeling and the thought reinforce each other.",
        highlight: "Passion is felt; Fixation is believed",
      },
    },
    {
      id: "u35-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the Fixation of Type 7, according to Ichazo?",
        options: [
          "Gluttony — the insatiable appetite for experience",
          "Planning — the mental generation of future options and possibilities to escape present discomfort",
          "Indolence — drifting away from one's own priorities",
          "Cowardice — chronic mental rehearsal of worst-case scenarios",
        ],
        correctIndex: 1,
        explanation:
          "Ichazo identified Planning as the Fixation of Type 7. This is not practical planning — it is the habitual mental activity of generating options, alternatives, and future possibilities as a way of escaping or reframing present discomfort. The Passion (Gluttony) provides the emotional fuel; the Fixation (Planning) is the mental mechanism.",
      },
    },
    {
      id: "u35-l3-e4",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "How does the Type 5 Fixation of Stinginess differ from the Type 5 Passion of Avarice?",
        options: [
          "They are identical — Fixation and Passion are the same thing for Type 5",
          "Avarice is the emotional habit (the felt sense of needing to protect and hoard energy and resources); Stinginess is the mental habit (the belief that giving is dangerous and one's resources are always insufficient)",
          "Avarice is the mental habit; Stinginess is the emotional habit — they are simply described in reverse order",
          "Only one of them is actually present in Type 5 — the other is a misattribution from an earlier version of the system",
        ],
        correctIndex: 1,
        explanation:
          "In Ichazo's two-level framework, Avarice (Passion) is the felt emotional experience — the anxiety of scarcity, the hoarding of energy, knowledge, and time. Stinginess (Fixation) is the mental counterpart — the belief that giving of oneself is dangerous and that resources are never sufficient. The feeling drives the thought; the thought justifies the feeling.",
      },
    },
    {
      id: "u35-l3-e5",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Claudia is a Type 6. Throughout any given day, her mind is constantly running threat assessments: What if this colleague is not actually trustworthy? What if I make the wrong decision and regret it? What if the thing I'm afraid of is actually happening but I can't see it yet? She finds it almost impossible to simply trust her own judgment and act without extensive checking, questioning, and seeking reassurance.",
        question: "Which Fixation is Claudia demonstrating, and how does it relate to the Type 6 Passion?",
        options: [
          "Fixation: Vengeance. Passion: Fear. She is prepared to retaliate if her fears come true.",
          "Fixation: Cowardice (chronic mental rehearsal of danger, doubt, and worst-case scenarios). Passion: Fear (the underlying emotional anxiety driving the mental activity). Together they form the Type 6 ego trance.",
          "Fixation: Planning. Passion: Gluttony. She is a Type 7 countertype that resembles Type 6.",
          "Fixation: Melancholy. Passion: Envy. She is dwelling in loss and longing, which resembles Type 4.",
        ],
        correctIndex: 1,
        explanation:
          "Claudia is demonstrating the Type 6 Fixation (Cowardice — the mental habit of constantly scanning for danger, doubting, and rehearsing worst-case scenarios) and Passion (Fear — the underlying emotional anxiety that fuels the mental scanning). The Passion generates the emotional urgency; the Fixation gives it mental form.",
      },
    },
    {
      id: "u35-l3-e6",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "Which of the following correctly pairs all nine types with their Fixations?",
        options: [
          "1: Resentment, 2: Flattery, 3: Vanity, 4: Melancholy, 5: Stinginess, 6: Cowardice, 7: Planning, 8: Vengeance, 9: Indolence",
          "1: Anger, 2: Pride, 3: Deceit, 4: Envy, 5: Avarice, 6: Fear, 7: Gluttony, 8: Lust, 9: Sloth",
          "1: Resentment, 2: Pride, 3: Vanity, 4: Envy, 5: Stinginess, 6: Fear, 7: Planning, 8: Lust, 9: Indolence",
          "1: Flattery, 2: Resentment, 3: Cowardice, 4: Vengeance, 5: Melancholy, 6: Indolence, 7: Vanity, 8: Stinginess, 9: Planning",
        ],
        correctIndex: 0,
        explanation:
          "The nine Fixations as defined by Ichazo: Type 1 = Resentment, Type 2 = Flattery, Type 3 = Vanity, Type 4 = Melancholy, Type 5 = Stinginess, Type 6 = Cowardice, Type 7 = Planning, Type 8 = Vengeance, Type 9 = Indolence. Note that the second option lists the Passions, not the Fixations.",
      },
    },
  ],
};

// ── Lesson 4: Virtues — The Antidote ─────────────────────────────────────────

const lesson4: Lesson = {
  id: "u35-l4",
  unitId: "ichazo-fixations",
  order: 4,
  title: "Virtues: The Antidote",
  subtitle: "What becomes available when the Passion quiets",
  xpReward: 15,
  exercises: [
    {
      id: "u35-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Virtue as Natural Expression",
        body: "Alongside each Passion, Ichazo identified a Virtue — the natural expression of the Essential Self when the Passion quiets. Virtues are not achievements to strive for. They are not the opposite of the Passion in a moralistic sense. Rather, they are what spontaneously emerges when the ego trance relaxes — the natural emotional quality of the type's true nature, uncorrupted by the ego structure. The Virtue is not added; it is revealed.",
        highlight: "Virtue: revealed, not achieved",
      },
    },
    {
      id: "u35-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Nine Virtues",
        body: "Ichazo's nine Virtues: Type 1: Serenity (the peace of accepting what is), Type 2: Humility (helping freely, without pride or agenda), Type 3: Authenticity (acting from genuine self rather than image), Type 4: Equanimity (stability that does not require intensifying feeling), Type 5: Non-attachment (sharing freely without fear of depletion), Type 6: Courage (acting despite fear rather than being controlled by it), Type 7: Sobriety (presence in this moment without needing more), Type 8: Innocence (openness without armor or the need for control), Type 9: Right Action (remembering oneself and acting from one's own priorities).",
        highlight: "nine Virtues",
      },
    },
    {
      id: "u35-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the Virtue of Type 4, according to Ichazo's system?",
        options: [
          "Serenity — a peaceful acceptance of what is",
          "Courage — acting despite fear",
          "Equanimity — a stable emotional ground that does not require intensifying feeling to feel real",
          "Authenticity — acting from genuine self rather than image",
        ],
        correctIndex: 2,
        explanation:
          "Ichazo identified Equanimity as the Virtue of Type 4. Where the Passion (Envy) creates a chronic sense of lack and the need to intensify emotion to feel real, Equanimity is the stable, groundedness that exists when the ego trance quiets — presence without the craving for intensity.",
      },
    },
    {
      id: "u35-l4-e4",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "Why does Ichazo's framework describe Virtues as 'revealed' rather than 'achieved'?",
        options: [
          "Because Virtues require years of disciplined practice before they can be accessed",
          "Because Virtues are not something you build through effort — they are what naturally emerges when the Passion is no longer running the show. They are the Essential Self, uncovered rather than constructed.",
          "Because Virtues are revealed to us by others, not developed internally",
          "Because Virtues can only be accessed through specific religious or spiritual traditions",
        ],
        correctIndex: 1,
        explanation:
          "In Ichazo's psychospiritual framework, Virtues are not moral achievements but the natural qualities of the Essential Self. They emerge when the ego trance — the Passion-Fixation loop — relaxes. This is why they are revealed, not achieved: the work is not to build the Virtue but to relax the structure that conceals it.",
      },
    },
    {
      id: "u35-l4-e5",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Gabe is a Type 8. For most of his adult life, he has moved through the world armored — projecting strength, testing people's trustworthiness before lowering his guard, and interpreting vulnerability as weakness. During a long period of genuine introspection, he begins to notice moments when the armor drops: he feels genuinely moved by something small and beautiful, he trusts someone without needing proof first, and he acts generously without calculating what he'll get in return. These moments feel both unfamiliar and completely natural.",
        question: "What Virtue is Gabe accessing, and what does its emergence tell us about Ichazo's framework?",
        options: [
          "Gabe is accessing Courage — learning to act despite fear like a healthy Type 6",
          "Gabe is accessing Innocence — the Type 8 Virtue that emerges when the armoring and need for control relaxes, allowing openness, trust, and genuine receptivity",
          "Gabe is accessing Humility — realizing he is not better than others",
          "Gabe is accessing Serenity — the Type 1 Virtue, suggesting he is actually a Type 1",
        ],
        correctIndex: 1,
        explanation:
          "Gabe is accessing Innocence — the Virtue Ichazo identified for Type 8. When the Type 8 Passion (Lust/Excess) and Fixation (Vengeance) quiet, what naturally emerges is openness without armor: the capacity to be genuinely moved, to trust without needing to control, and to encounter the world with fresh receptivity. This is the Essential quality that was always present beneath the ego structure.",
      },
    },
    {
      id: "u35-l4-e6",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "Which of the following correctly pairs all nine types with their Virtues?",
        options: [
          "1: Courage, 2: Serenity, 3: Humility, 4: Authenticity, 5: Equanimity, 6: Non-attachment, 7: Right Action, 8: Sobriety, 9: Innocence",
          "1: Serenity, 2: Humility, 3: Authenticity, 4: Equanimity, 5: Non-attachment, 6: Courage, 7: Sobriety, 8: Innocence, 9: Right Action",
          "1: Serenity, 2: Authenticity, 3: Humility, 4: Non-attachment, 5: Equanimity, 6: Innocence, 7: Courage, 8: Right Action, 9: Sobriety",
          "1: Right Action, 2: Courage, 3: Sobriety, 4: Innocence, 5: Serenity, 6: Humility, 7: Non-attachment, 8: Equanimity, 9: Authenticity",
        ],
        correctIndex: 1,
        explanation:
          "Ichazo's nine Virtues: Type 1 = Serenity, Type 2 = Humility, Type 3 = Authenticity, Type 4 = Equanimity, Type 5 = Non-attachment, Type 6 = Courage, Type 7 = Sobriety, Type 8 = Innocence, Type 9 = Right Action.",
      },
    },
  ],
};

// ── Export ────────────────────────────────────────────────────────────────────

export const unit35Lessons: Lesson[] = [
  lesson1,
  lesson2,
  lesson3,
  lesson4,
];
