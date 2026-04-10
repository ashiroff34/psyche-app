// Attachment Style Assessment Questions
// Inspired by the ECR-R (Experiences in Close Relationships. Revised)
// Brennan, Clark & Shaver (1998); Fraley, Waller & Brennan (2000)
//
// SCORING MODEL:
// anxiety: measures fear of abandonment, hypervigilance to relationship threat
// avoidance: measures discomfort with closeness, suppression of attachment needs
//
// Deriving the four styles from two dimensions:
// Low anxiety + low avoidance = Secure
// High anxiety + low avoidance = Anxious-Preoccupied
// Low anxiety + high avoidance = Dismissive-Avoidant
// High anxiety + high avoidance = Fearful-Avoidant
//
// Scale: 1 (Strongly Disagree) → 5 (Strongly Agree)
// reversed: if true, score is inverted (6 - rating) before adding to dimension

export interface AttachmentQuestion {
  id: number;
  text: string;
  dimension: 'anxiety' | 'avoidance';
  reversed: boolean;
}

export const attachmentQuestions: AttachmentQuestion[] = [
  // ANXIETY DIMENSION. fear of abandonment, need for reassurance, hypervigilance
  {
    id: 1,
    text: "I worry that romantic partners won't care about me as much as I care about them.",
    dimension: 'anxiety',
    reversed: false,
  },
  {
    id: 2,
    text: "I often worry that my partner will leave me.",
    dimension: 'anxiety',
    reversed: false,
  },
  {
    id: 3,
    text: "I find myself frequently seeking reassurance that I matter to the people close to me.",
    dimension: 'anxiety',
    reversed: false,
  },
  {
    id: 4,
    text: "I become anxious when a partner doesn't respond to me as quickly as I'd expect.",
    dimension: 'anxiety',
    reversed: false,
  },
  {
    id: 5,
    text: "When I'm not in a close relationship, I feel anxious and incomplete.",
    dimension: 'anxiety',
    reversed: false,
  },
  {
    id: 6,
    text: "I often feel that my desire for closeness scares people away.",
    dimension: 'anxiety',
    reversed: false,
  },
  {
    id: 7,
    text: "I rarely worry about my partner leaving me or not loving me enough.",
    dimension: 'anxiety',
    reversed: true,
  },
  {
    id: 8,
    text: "I don't often worry about being abandoned.",
    dimension: 'anxiety',
    reversed: true,
  },
  {
    id: 9,
    text: "I find it hard to stop thinking about problems in my relationships. they stay with me.",
    dimension: 'anxiety',
    reversed: false,
  },
  {
    id: 10,
    text: "When I sense a partner pulling away, I tend to pursue harder rather than give them space.",
    dimension: 'anxiety',
    reversed: false,
  },

  // AVOIDANCE DIMENSION. discomfort with closeness, suppression of needs, self-reliance
  {
    id: 11,
    text: "I prefer not to show partners how I feel deep down.",
    dimension: 'avoidance',
    reversed: false,
  },
  {
    id: 12,
    text: "I find it difficult to allow myself to depend on romantic partners.",
    dimension: 'avoidance',
    reversed: false,
  },
  {
    id: 13,
    text: "I am comfortable sharing my thoughts and feelings with people close to me.",
    dimension: 'avoidance',
    reversed: true,
  },
  {
    id: 14,
    text: "I find it relatively easy to get close to others.",
    dimension: 'avoidance',
    reversed: true,
  },
  {
    id: 15,
    text: "I feel uncomfortable when others want to be very emotionally close to me.",
    dimension: 'avoidance',
    reversed: false,
  },
  {
    id: 16,
    text: "I prefer to rely on myself rather than on other people.",
    dimension: 'avoidance',
    reversed: false,
  },
  {
    id: 17,
    text: "I'm not comfortable opening up to partners, even ones I've been with a long time.",
    dimension: 'avoidance',
    reversed: false,
  },
  {
    id: 18,
    text: "When a partner wants to talk about what we mean to each other, I feel uncomfortable.",
    dimension: 'avoidance',
    reversed: false,
  },
  {
    id: 19,
    text: "I'm fairly comfortable with the idea of someone deeply knowing me.",
    dimension: 'avoidance',
    reversed: true,
  },
  {
    id: 20,
    text: "I find it easy to lean on others when I'm struggling.",
    dimension: 'avoidance',
    reversed: true,
  },
];

// Thresholds for deriving style from raw dimension scores
// Each dimension: 10 items, 1,5 scale → min 10, max 50
// Midpoint = 30; "high" = above midpoint
export const ATTACHMENT_THRESHOLD = 30;
