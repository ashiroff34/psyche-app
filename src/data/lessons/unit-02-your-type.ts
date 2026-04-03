// ─────────────────────────────────────────────────────────────────────────────
// Unit 2: Your Type
// 5 personalized lessons using template tokens that are replaced at runtime
// with the user's actual Enneagram type data.
// Tokens: {{typeName}}, {{typeNumber}}, {{coreFear}}, {{coreDesire}},
//         {{coreMotivation}}, {{passion}}, {{virtue}}
// Content grounded in Riso-Hudson, Naranjo, and Chestnut.
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson } from "@/types/lessons";

const UNIT_ID = "your-type";

// ── Lesson 1: Meet Your Type ──────────────────────────────────────────────

const lesson1: Lesson = {
  id: "meet-your-type",
  unitId: UNIT_ID,
  order: 1,
  title: "Meet Your Type",
  subtitle: "Your core motivation, fear, and desire",
  xpReward: 20,
  personalized: true,
  personalizeFor: "enneagramType",
  exercises: [
    {
      id: "u2-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "You Are {{typeName}}",
        body: "As a Type {{typeNumber}}, your core motivation is: {{coreMotivation}}. This drive operates in the background of your life, influencing decisions you may not even realize you're making.",
        highlight: "core motivation",
      },
    },
    {
      id: "u2-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Your Fear and Desire",
        body: "Your core fear is: {{coreFear}}. Your core desire is: {{coreDesire}}. These two forces pull you in opposite directions, your personality is the strategy you developed to move toward your desire and away from your fear.",
        highlight: "fear and desire",
      },
    },
    {
      id: "u2-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core fear of {{typeName}} (Type {{typeNumber}})?",
        options: [
          "{{coreFear}}",
          "Of being trapped in pain and deprivation",
          "Of having no identity or personal significance",
          "Of being harmed or controlled by others",
        ],
        correctIndex: 0,
        explanation:
          "Your core fear, {{coreFear}}, is the deep dread that unconsciously drives many of your automatic patterns. Recognizing it is the first step toward freedom from it.",
      },
    },
    {
      id: "u2-l1-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core desire of {{typeName}}?",
        options: [
          "To be admired by everyone",
          "{{coreDesire}}",
          "To have power over others",
          "To avoid all responsibility",
        ],
        correctIndex: 1,
        explanation:
          "Your core desire, {{coreDesire}}, is the deep longing that drives your most positive qualities. When you pursue this desire in healthy ways, you're at your best.",
      },
    },
    {
      id: "u2-l1-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "Your core motivation shapes how you approach life. Which best describes the motivation of {{typeName}}?",
        options: [
          "{{coreMotivation}}",
          "To avoid all pain and seek only pleasure",
          "To control everyone around them",
          "To never have to make decisions",
        ],
        correctIndex: 0,
        explanation:
          "This motivation runs like an operating system in the background. Most of the time you don't consciously choose it, it just happens. Self-awareness starts with noticing it in action.",
      },
    },
    {
      id: "u2-l1-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each component of your type to its description.",
        pairs: [
          { left: "Core Fear", right: "{{coreFear}}" },
          { left: "Core Desire", right: "{{coreDesire}}" },
          { left: "Core Motivation", right: "{{coreMotivation}}" },
          { left: "Type Name", right: "{{typeName}}" },
        ],
      },
    },
    {
      id: "u2-l1-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "As {{typeName}}, your core fear is {{coreFear}}, and your core desire is ___.",
        options: [
          "{{coreDesire}}",
          "to be the most powerful person",
          "to never feel anything",
          "to be liked by everyone",
        ],
        correctIndex: 0,
        explanation:
          "Your core desire, {{coreDesire}}, is the positive longing that your personality structure is built around. When pursued with self-awareness, it leads to genuine fulfillment.",
      },
    },
    {
      id: "u2-l1-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "The Enneagram says that Type {{typeNumber}}'s personality is a ___ for getting the core desire and avoiding the core fear.",
        options: ["strategy", "punishment", "gift", "accident"],
        correctIndex: 0,
        explanation:
          "Your personality is not random, it's a strategy you developed early in life to get what you most need ({{coreDesire}}) and avoid what you most dread ({{coreFear}}). Understanding this gives you freedom to choose consciously.",
      },
    },
    {
      id: "u2-l1-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "You're in a meeting and a colleague presents an idea that conflicts with something important to you. You notice a strong emotional reaction rising, something beyond simple disagreement. It feels personal, almost threatening.",
        question:
          "As {{typeName}}, this reaction is likely connected to which part of your personality structure?",
        options: [
          "Your core fear being triggered, {{coreFear}}",
          "Your preference for a certain meeting room",
          "Your opinion about the colleague's outfit",
          "A random mood swing unrelated to your type",
        ],
        correctIndex: 0,
        explanation:
          "When a reaction feels disproportionately strong, it's often your core fear being triggered. For {{typeName}}, that fear, {{coreFear}}, can get activated in situations that seem to threaten what matters most to you.",
      },
    },
    {
      id: "u2-l1-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "A friend asks you what you really want from life. After thinking deeply, you notice that most of your goals, relationships, and choices circle back to one underlying theme.",
        question: "For {{typeName}}, that underlying theme is most likely:",
        options: [
          "{{coreDesire}}",
          "Accumulating the most money possible",
          "Being famous",
          "Avoiding all human contact",
        ],
        correctIndex: 0,
        explanation:
          "When you look honestly at the pattern behind your choices, you'll often find your core desire, {{coreDesire}}, at the center. This isn't a limitation; it's a compass for understanding yourself.",
      },
    },
    {
      id: "u2-l1-e11",
      difficulty: 3,
      content: {
        type: "multiple-choice",
        question:
          "Knowing your core fear and desire is valuable because:",
        options: [
          "It tells you exactly what to do in every situation",
          "It helps you notice when your automatic patterns are running the show",
          "It means you can predict the future",
          "It gives you an excuse for bad behavior",
        ],
        correctIndex: 1,
        explanation:
          "Self-awareness is the gift of the Enneagram. When you can notice 'Oh, my fear of {{coreFear}} is driving me right now,' you create a pause, and in that pause, you can choose a healthier response.",
      },
    },
    {
      id: "u2-l1-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "As {{typeName}} (Type {{typeNumber}}), your personality is organized around:",
        options: [
          "A core fear, a core desire, and a core motivation",
          "Your zodiac sign and birth order",
          "Whatever mood you're in that day",
          "Your childhood nickname",
        ],
        correctIndex: 0,
        explanation:
          "Your core fear ({{coreFear}}), core desire ({{coreDesire}}), and core motivation form the foundation of your personality structure. Now you know the engine, next you'll learn how it runs day to day.",
      },
    },
  ],
};

// ── Lesson 2: Your Passion & Virtue ───────────────────────────────────────

const lesson2: Lesson = {
  id: "passion-and-virtue",
  unitId: UNIT_ID,
  order: 2,
  title: "Your Passion & Virtue",
  subtitle: "The emotional habit and its healthy antidote",
  xpReward: 20,
  personalized: true,
  personalizeFor: "enneagramType",
  exercises: [
    {
      id: "u2-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "What Is a Passion?",
        body: "In the Enneagram tradition (from Claudio Naranjo), each type has a 'passion', an emotional habit or reactive pattern that keeps you stuck. It's not something you choose; it's an automatic emotional response that distorts your experience.",
        highlight: "passion",
      },
    },
    {
      id: "u2-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "What Is a Virtue?",
        body: "The virtue is the healthy opposite of your passion. It's not something you force, it naturally emerges when you become aware of your passion and stop fueling it. Think of it as what you become when you get out of your own way.",
        highlight: "virtue",
      },
    },
    {
      id: "u2-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "In the Enneagram, what is a 'passion'?",
        options: [
          "Something you love doing",
          "An automatic emotional habit that keeps you stuck in your type's patterns",
          "A talent you were born with",
          "A goal you're working toward",
        ],
        correctIndex: 1,
        explanation:
          "Naranjo used the word 'passion' in the classical sense, like the 'passions' of medieval theology. It's an emotional vice or habit that runs on autopilot and keeps you trapped in your type's unhealthy patterns.",
      },
    },
    {
      id: "u2-l2-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does the virtue relate to the passion?",
        options: [
          "The virtue is the healthy quality that naturally emerges when the passion is recognized",
          "The virtue is something you have to force yourself to do",
          "The virtue and passion are the same thing",
          "The virtue replaces your Enneagram type entirely",
        ],
        correctIndex: 0,
        explanation:
          "The virtue isn't effort, it's what flows naturally when you stop being run by your passion. For example, when Type 1 lets go of their passion of anger/resentment, serenity naturally arises.",
      },
    },
    {
      id: "u2-l2-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "Why is awareness of your passion important for growth?",
        options: [
          "So you can eliminate your personality entirely",
          "So you can catch yourself when it's running on autopilot and make a conscious choice",
          "So you can judge yourself for having it",
          "So you can avoid other people who trigger it",
        ],
        correctIndex: 1,
        explanation:
          "The goal isn't to destroy your passion, it's to become aware of it. When you notice it in real time, you create space to respond differently. That's where the virtue lives.",
      },
    },
    {
      id: "u2-l2-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each Enneagram type to its passion (emotional habit).",
        pairs: [
          { left: "Type 1, The Reformer", right: "Anger (resentment)" },
          { left: "Type 2, The Helper", right: "Pride (flattery)" },
          { left: "Type 3, The Achiever", right: "Deceit (vanity)" },
          { left: "Type 4, The Individualist", right: "Envy" },
          { left: "Type 7, The Enthusiast", right: "Gluttony" },
        ],
      },
    },
    {
      id: "u2-l2-e7",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each Enneagram type to its virtue (healthy quality).",
        pairs: [
          { left: "Type 1, The Reformer", right: "Serenity" },
          { left: "Type 2, The Helper", right: "Humility" },
          { left: "Type 4, The Individualist", right: "Equanimity" },
          { left: "Type 8, The Challenger", right: "Innocence" },
          { left: "Type 9, The Peacemaker", right: "Action" },
        ],
      },
    },
    {
      id: "u2-l2-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "The virtue is not forced, it naturally ___ when you become aware of your passion and stop fueling it.",
        options: ["emerges", "disappears", "intensifies", "breaks"],
        correctIndex: 0,
        explanation:
          "This is a key Enneagram insight: virtues aren't achieved through willpower. They emerge organically when the automatic grip of the passion loosens through awareness and self-compassion.",
      },
    },
    {
      id: "u2-l2-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "You notice that in conversations, you keep mentally comparing yourself to others, their success, their relationships, their confidence. It's not a conscious choice; it just happens automatically, and it leaves you feeling inadequate.",
        question:
          "This automatic comparison pattern is an example of which Enneagram concept?",
        options: [
          "A core desire",
          "A passion, an automatic emotional habit",
          "A wing influence",
          "A growth line",
        ],
        correctIndex: 1,
        explanation:
          "This kind of automatic, involuntary emotional pattern is exactly what the Enneagram means by 'passion.' The comparison and feeling of inadequacy is particularly associated with Type 4's passion of envy, but every type has its own version of this autopilot pattern.",
      },
    },
    {
      id: "u2-l2-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "After months of self-reflection, you start noticing when your automatic emotional pattern kicks in. Instead of being swept away by it, you can pause and say, 'Oh, there's that pattern again.' Something shifts, you feel calmer, more grounded, more free.",
        question: "What is happening in this moment?",
        options: [
          "You're suppressing your emotions",
          "Your virtue is naturally emerging through awareness of your passion",
          "You're changing your Enneagram type",
          "You're losing your personality",
        ],
        correctIndex: 1,
        explanation:
          "This is the Enneagram's promise: when you bring awareness to your passion without judgment, the virtue emerges naturally. You don't force it, it's who you are when the autopilot switches off.",
      },
    },
    {
      id: "u2-l2-e11",
      difficulty: 3,
      content: {
        type: "multiple-choice",
        question:
          "Which of these is NOT true about the passion-virtue dynamic?",
        options: [
          "The passion is an automatic emotional habit",
          "The virtue emerges naturally through awareness",
          "You can eliminate your passion permanently and never experience it again",
          "Every type has both a passion and a virtue",
        ],
        correctIndex: 2,
        explanation:
          "The passion doesn't disappear forever, it's part of your type's structure. Growth means you catch it faster, get hooked less often, and recover more quickly. The virtue becomes your more frequent home base, but the passion will still visit.",
      },
    },
    {
      id: "u2-l2-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "The passion is your emotional ___, and the virtue is what emerges when you become ___ of it.",
        options: [
          "habit ... aware",
          "strength ... afraid",
          "hobby ... bored",
          "talent ... jealous",
        ],
        correctIndex: 0,
        explanation:
          "The passion is an automatic emotional habit, and the virtue emerges through awareness. This simple framework is one of the most powerful tools in the Enneagram for personal growth.",
      },
    },
  ],
};

// ── Lesson 3: Your Wings ─────────────────────────────────────────────────

const lesson3: Lesson = {
  id: "your-wings",
  unitId: UNIT_ID,
  order: 3,
  title: "Your Wings",
  subtitle: "The types next door that flavor your personality",
  xpReward: 20,
  personalized: true,
  personalizeFor: "enneagramType",
  exercises: [
    {
      id: "u2-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Wings: Your Personality's Seasoning",
        body: "As Type {{typeNumber}}, your wings are the types on either side of you on the Enneagram circle. One or both of these neighbors add unique qualities to your core type, like seasoning that gives the same dish different flavors.",
        highlight: "wings",
      },
    },
    {
      id: "u2-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "How Wings Work",
        body: "Most people lean more toward one wing than the other, though both can be active at different times. Your wing doesn't change your core type, it adds texture. A Type 4 with a 3-wing looks noticeably different from a Type 4 with a 5-wing.",
        highlight: "lean toward one wing",
      },
    },
    {
      id: "u2-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What are wings in the Enneagram?",
        options: [
          "Types you transform into under stress",
          "The two types adjacent to yours on the Enneagram circle",
          "Your best and worst personality traits",
          "Types that are opposite to yours",
        ],
        correctIndex: 1,
        explanation:
          "Wings are your immediate neighbors on the Enneagram circle. They add nuance and variety to your core type, which is why two people of the same type can look and feel quite different.",
      },
    },
    {
      id: "u2-l3-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Do wings change your core type?",
        options: [
          "Yes, they replace it entirely",
          "No, they add flavor and nuance to your core type",
          "Yes, you become a hybrid of three types",
          "Only during full moons",
        ],
        correctIndex: 1,
        explanation:
          "Your core type stays the same, your fundamental motivation doesn't change. Wings add texture and complexity, like different spices on the same base dish. Your core fear and desire remain those of Type {{typeNumber}}.",
      },
    },
    {
      id: "u2-l3-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How many wings does each Enneagram type have?",
        options: ["One", "Two", "Three", "Nine"],
        correctIndex: 1,
        explanation:
          "Every type has exactly two possible wings, the types immediately on either side. Most people have a dominant wing, but both can influence you at different times in life.",
      },
    },
    {
      id: "u2-l3-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each type to its two possible wings.",
        pairs: [
          { left: "Type 1", right: "9-wing or 2-wing" },
          { left: "Type 4", right: "3-wing or 5-wing" },
          { left: "Type 7", right: "6-wing or 8-wing" },
          { left: "Type 9", right: "8-wing or 1-wing" },
        ],
      },
    },
    {
      id: "u2-l3-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Your wing adds ___ to your core type without changing your fundamental motivation.",
        options: ["texture", "a new type", "confusion", "weakness"],
        correctIndex: 0,
        explanation:
          "Wings add texture, color, and nuance. Think of your core type as the canvas and your wing as the particular palette of colors you paint with. The subject (your motivation) stays the same.",
      },
    },
    {
      id: "u2-l3-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "A Type 8 with a 7-wing (8w7) is called 'The Maverick' and tends to be more ___ than an 8w9.",
        options: ["withdrawn", "energetic", "anxious", "compliant"],
        correctIndex: 1,
        explanation:
          "The 7-wing adds enthusiasm, adventurousness, and high energy to the 8's natural intensity. An 8w9 ('The Bear') would be more grounded and steady, with the 9-wing's calming influence.",
      },
    },
    {
      id: "u2-l3-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Two Type 2s work at the same company. One (2w1) is organized, principled, and volunteers for causes they believe in. The other (2w3) is charming, socially adept, and focuses on being the most helpful person in the office.",
        question: "What explains the difference between these two Type 2s?",
        options: [
          "One of them is mistyped",
          "Their different wings (1 vs 3) give each one a different flavor",
          "They're just having different days",
          "Type 2 is too vague to be useful",
        ],
        correctIndex: 1,
        explanation:
          "Both share the same core desire (to feel loved and wanted), but the 1-wing adds principled structure while the 3-wing adds charm and achievement-orientation. Wings make the difference!",
      },
    },
    {
      id: "u2-l3-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "You're {{typeName}} and you notice that some descriptions of your type feel very accurate while others feel off. The descriptions that feel 'off' often describe qualities that actually belong to one of your wing types.",
        question: "What does this suggest about finding your wing?",
        options: [
          "You should change your core type",
          "The descriptions that resonate beyond your core type likely point to your dominant wing",
          "Wings don't matter",
          "All descriptions should fit perfectly",
        ],
        correctIndex: 1,
        explanation:
          "This is a great way to identify your wing! When you read about both neighboring types, the one that adds qualities you recognize in yourself is likely your dominant wing. It explains the parts of you that go beyond your core type description.",
      },
    },
    {
      id: "u2-l3-e11",
      difficulty: 3,
      content: {
        type: "multiple-choice",
        question:
          "Can your dominant wing change over the course of your life?",
        options: [
          "No, it's fixed from birth",
          "Yes, many people find that one wing is stronger in certain life phases than others",
          "Yes, you get a completely new personality every decade",
          "Only if you take a different Enneagram test",
        ],
        correctIndex: 1,
        explanation:
          "Riso and Hudson noted that people can develop their less-dominant wing over time. Life experiences, personal growth, and changing circumstances can shift which wing is more active. Both are always available to you.",
      },
    },
    {
      id: "u2-l3-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "Your wings are the types ___ to yours and they add ___ to your core personality.",
        options: [
          "adjacent ... nuance",
          "opposite ... confusion",
          "random ... weakness",
          "identical ... nothing",
        ],
        correctIndex: 0,
        explanation:
          "Wings are the types next to yours on the circle, and they add nuance and variety. They're one of the key reasons why every person of the same type is still unique.",
      },
    },
  ],
};

// ── Lesson 4: Under Stress & In Growth ────────────────────────────────────

const lesson4: Lesson = {
  id: "stress-and-growth",
  unitId: UNIT_ID,
  order: 4,
  title: "Under Stress & In Growth",
  subtitle: "How your type shifts under pressure and in health",
  xpReward: 25,
  personalized: true,
  personalizeFor: "enneagramType",
  exercises: [
    {
      id: "u2-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "You're Not Static",
        body: "Your Enneagram type isn't a fixed state. Under stress, you take on some of the unhealthy patterns of another specific type (your stress line). In growth, you integrate the healthy qualities of a different type (your growth line).",
        highlight: "stress line and growth line",
      },
    },
    {
      id: "u2-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Disintegration and Integration",
        body: "The technical terms are 'disintegration' (stress) and 'integration' (growth). These lines are shown as arrows on the Enneagram symbol. When you're stressed, you move in the direction of disintegration. When you're healthy and growing, you move toward integration.",
        highlight: "disintegration and integration",
      },
    },
    {
      id: "u2-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "What happens when you move along your stress line (disintegration)?",
        options: [
          "You become a completely different Enneagram type",
          "You take on some unhealthy patterns of a specific other type",
          "You lose your personality entirely",
          "Nothing, your type never changes",
        ],
        correctIndex: 1,
        explanation:
          "Under stress, you don't become the other type entirely, you borrow some of its less healthy patterns. It's like your personality reaches for new (but unhelpful) coping strategies when your usual ones aren't working.",
      },
    },
    {
      id: "u2-l4-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "What happens when you move along your growth line (integration)?",
        options: [
          "You change your type permanently",
          "You integrate the healthy qualities of a specific other type",
          "You stop being your type",
          "You only experience positive emotions",
        ],
        correctIndex: 1,
        explanation:
          "Integration means you're accessing the best qualities of another type while staying rooted in your own. It's a sign of health and growth, you're expanding your range as a person.",
      },
    },
    {
      id: "u2-l4-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "The arrows on the Enneagram symbol show:",
        options: [
          "Which types are compatible for dating",
          "The direction of stress (disintegration) and growth (integration) for each type",
          "Which types are the same",
          "Random connections between types",
        ],
        correctIndex: 1,
        explanation:
          "The arrows map the specific movement patterns for each type. Every type has one stress direction and one growth direction, these lines are fundamental to understanding Enneagram dynamics.",
      },
    },
    {
      id: "u2-l4-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each type to the type it moves toward in GROWTH (integration).",
        pairs: [
          { left: "Type 1 grows toward", right: "Type 7 (spontaneity, joy)" },
          { left: "Type 2 grows toward", right: "Type 4 (self-awareness, authenticity)" },
          { left: "Type 5 grows toward", right: "Type 8 (decisiveness, action)" },
          { left: "Type 9 grows toward", right: "Type 3 (self-development, energy)" },
        ],
      },
    },
    {
      id: "u2-l4-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Under stress, your type takes on some of the ___ patterns of another type. In growth, you integrate the ___ qualities.",
        options: ["unhealthy ... healthy", "random ... random", "healthy ... unhealthy", "same ... same"],
        correctIndex: 0,
        explanation:
          "Stress pulls you toward the unhealthy side of your connected type, while growth lets you access the healthy side of a different connected type. This is why stress and growth lines point to different types.",
      },
    },
    {
      id: "u2-l4-e8",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each type to the type it moves toward under STRESS (disintegration).",
        pairs: [
          { left: "Type 3 under stress", right: "Type 9 (disengagement, numbness)" },
          { left: "Type 6 under stress", right: "Type 3 (image-conscious, calculating)" },
          { left: "Type 7 under stress", right: "Type 1 (critical, rigid)" },
          { left: "Type 8 under stress", right: "Type 5 (withdrawn, secretive)" },
        ],
      },
    },
    {
      id: "u2-l4-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "A Type 1 (The Reformer) who is usually principled and controlled has been under enormous work pressure for months. Lately, they've become unusually moody, withdrawn, and fixated on what's missing in their life, almost envious of others who seem to have it easier.",
        question: "What's happening to this Type 1?",
        options: [
          "They've permanently changed types",
          "They're moving toward their stress line (Type 4) and taking on unhealthy Type 4 patterns",
          "They were never really a Type 1",
          "Stress has nothing to do with the Enneagram",
        ],
        correctIndex: 1,
        explanation:
          "Type 1 disintegrates toward Type 4 under stress, taking on moodiness, envy, and a sense of deprivation. This is a signal to address the stress, not evidence that they're the wrong type.",
      },
    },
    {
      id: "u2-l4-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "A Type 5 (The Investigator) who typically stays in their head and avoids confrontation has been in therapy for a year. Lately, they've been more decisive, willing to take charge in group settings, and comfortable using their knowledge to lead. Friends say, 'You seem more confident and grounded!'",
        question: "What's happening to this Type 5?",
        options: [
          "They've become a Type 8",
          "They're integrating toward their growth line (Type 8) and accessing healthy Type 8 qualities",
          "They're under extreme stress",
          "The Enneagram got their type wrong",
        ],
        correctIndex: 1,
        explanation:
          "Type 5 integrates toward Type 8 in health, accessing decisiveness, confidence, and the ability to act on their knowledge. They're still a Type 5 at core, they've just expanded their range through growth.",
      },
    },
    {
      id: "u2-l4-e11",
      difficulty: 3,
      content: {
        type: "multiple-choice",
        question:
          "How can you use knowledge of your stress line practically?",
        options: [
          "Avoid all stressful situations forever",
          "Recognize the early signs that you're disintegrating and use them as a warning to care for yourself",
          "Blame your behavior on the Enneagram",
          "Try to become the other type instead",
        ],
        correctIndex: 1,
        explanation:
          "Your stress line patterns are like an early warning system. When you notice yourself acting like your stress type, it's a signal that you're overwhelmed and need to address what's draining you, not a judgment on your character.",
      },
    },
    {
      id: "u2-l4-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "Under stress you move toward ___ patterns, and in growth you integrate ___ qualities.",
        options: [
          "unhealthy ... healthy",
          "healthy ... unhealthy",
          "random ... random",
          "no ... no",
        ],
        correctIndex: 0,
        explanation:
          "Stress pulls you toward unhealthy patterns of one connected type, while growth lets you access the healthy qualities of another. Understanding this dynamic is a powerful tool for self-awareness.",
      },
    },
  ],
};

// ── Lesson 5: Your Type at Three Levels ───────────────────────────────────

const lesson5: Lesson = {
  id: "three-levels",
  unitId: UNIT_ID,
  order: 5,
  title: "Your Type at Three Levels",
  subtitle: "Healthy, average, and unhealthy expressions of {{typeName}}",
  xpReward: 25,
  personalized: true,
  personalizeFor: "enneagramType",
  exercises: [
    {
      id: "u2-l5-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Levels of Development",
        body: "Riso and Hudson discovered that each Enneagram type has levels of development, from healthy to average to unhealthy. Your type doesn't change, but HOW you express it varies enormously depending on your psychological health.",
        highlight: "levels of development",
      },
    },
    {
      id: "u2-l5-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Same Type, Very Different Person",
        body: "A healthy {{typeName}} and an unhealthy {{typeName}} can seem like completely different people. The core motivation ({{coreMotivation}}) stays the same, but healthy versions pursue it with wisdom, while unhealthy versions pursue it with desperation.",
        highlight: "same motivation, different expression",
      },
    },
    {
      id: "u2-l5-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What stays the same across all levels of health for your type?",
        options: [
          "Your behavior",
          "Your core motivation",
          "Your mood",
          "Your daily routine",
        ],
        correctIndex: 1,
        explanation:
          "Your core motivation, {{coreMotivation}}, is the constant thread. At healthy levels, you pursue it with self-awareness and balance. At unhealthy levels, the same motivation becomes compulsive and distorted.",
      },
    },
    {
      id: "u2-l5-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How many simplified levels of health does the Riso-Hudson framework use?",
        options: [
          "Two: good and bad",
          "Three: healthy, average, and unhealthy",
          "Nine: one for each type",
          "None, health isn't part of the Enneagram",
        ],
        correctIndex: 1,
        explanation:
          "Riso-Hudson originally identified nine levels but grouped them into three broad bands: healthy (levels 1-3), average (levels 4-6), and unhealthy (levels 7-9). Most people spend their time in the average range.",
      },
    },
    {
      id: "u2-l5-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Where do most people operate most of the time?",
        options: [
          "Healthy levels",
          "Average levels",
          "Unhealthy levels",
          "All levels equally",
        ],
        correctIndex: 1,
        explanation:
          "Most of us spend the majority of our time in the average range. That's completely normal! The goal of the Enneagram is to help you spend more time in the healthy range by increasing self-awareness.",
      },
    },
    {
      id: "u2-l5-e6",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort these Type 1 (Reformer) traits into the correct health level.",
        categories: ["Healthy", "Average", "Unhealthy"],
        items: [
          { text: "Wise and discerning", categoryIndex: 0 },
          { text: "Critical and judgmental", categoryIndex: 1 },
          { text: "Intolerant and punitive", categoryIndex: 2 },
          { text: "Morally heroic", categoryIndex: 0 },
          { text: "Rigid and impersonal", categoryIndex: 1 },
          { text: "Self-righteous and obsessive", categoryIndex: 2 },
        ],
      },
    },
    {
      id: "u2-l5-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "At healthy levels, {{typeName}} pursues their core desire with ___. At unhealthy levels, the same desire becomes ___.",
        options: [
          "wisdom ... compulsive",
          "anger ... peaceful",
          "fear ... brave",
          "nothing ... everything",
        ],
        correctIndex: 0,
        explanation:
          "This is the crucial distinction. The desire itself ({{coreDesire}}) is not the problem, it's how you pursue it. Wisdom versus compulsion is the difference between healthy and unhealthy levels.",
      },
    },
    {
      id: "u2-l5-e8",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort these Type 7 (Enthusiast) traits into the correct health level.",
        categories: ["Healthy", "Average", "Unhealthy"],
        items: [
          { text: "Joyful and grateful", categoryIndex: 0 },
          { text: "Scattered and restless", categoryIndex: 1 },
          { text: "Impulsive and escapist", categoryIndex: 2 },
          { text: "Present and accomplished", categoryIndex: 0 },
          { text: "Acquisitive and excessive", categoryIndex: 1 },
          { text: "Manic and addictive", categoryIndex: 2 },
        ],
      },
    },
    {
      id: "u2-l5-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "A Type 3 (The Achiever) has been promoted three times in two years. At first they were genuinely inspiring, lifting others up and being authentically confident. Lately, they've become increasingly focused on image, taking credit for team work, and measuring every interaction by 'What does this do for my brand?'",
        question:
          "What's happening with this Type 3's level of health?",
        options: [
          "They've changed types",
          "They've moved from healthy levels (authentic, inspiring) to average levels (image-conscious, self-promoting)",
          "This is normal Type 3 behavior at all levels",
          "They're at their healthiest because they're getting promoted",
        ],
        correctIndex: 1,
        explanation:
          "This Type 3 has shifted from healthy (genuine, inspiring, self-accepting) to average (image-focused, competitive, self-promoting). The core motivation to feel valuable is the same, but the expression has become less healthy.",
      },
    },
    {
      id: "u2-l5-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "A Type 9 (The Peacemaker) has been in therapy for two years. They used to go along with everyone else's plans and never express preferences. Now they're setting boundaries, pursuing personal goals, and occasionally having healthy conflicts. Their partner says, 'You're so much more alive lately!'",
        question: "What level shift is this Type 9 experiencing?",
        options: [
          "Moving from average levels (complacent, disengaged) to healthy levels (self-possessed, dynamic)",
          "Becoming a Type 3",
          "Moving from healthy to unhealthy",
          "Losing their Type 9 qualities",
        ],
        correctIndex: 0,
        explanation:
          "This Type 9 is moving up the health levels. Their core desire for peace hasn't changed, but now they pursue it through genuine engagement rather than passive avoidance. A healthy Type 9 is dynamic, present, and connected.",
      },
    },
    {
      id: "u2-l5-e11",
      difficulty: 3,
      content: {
        type: "multiple-choice",
        question:
          "What's the most helpful way to use levels of health in your own life?",
        options: [
          "Judge yourself harshly when you're at average or unhealthy levels",
          "Notice which level you're operating from and use it as a compass for self-care",
          "Try to stay at healthy levels 100% of the time",
          "Ignore your unhealthy patterns and focus only on the positive",
        ],
        correctIndex: 1,
        explanation:
          "The levels are a compass, not a report card. When you notice yourself at average or unhealthy levels, it's useful information, a signal to slow down, reflect, and practice self-care. No one is at their healthiest all the time.",
      },
    },
    {
      id: "u2-l5-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "A healthy and unhealthy version of the same type share the same core ___ but differ in how they ___ it.",
        options: [
          "motivation ... express",
          "behavior ... think about",
          "hobby ... enjoy",
          "friend group ... text",
        ],
        correctIndex: 0,
        explanation:
          "Same motivation, different expression, that's the key insight of levels of health. Your core motivation ({{coreMotivation}}) doesn't change, but your health level determines whether it drives wisdom or compulsion.",
      },
    },
  ],
};

export const unit02Lessons: Lesson[] = [lesson1, lesson2, lesson3, lesson4, lesson5];
