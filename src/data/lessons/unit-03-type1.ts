// ─────────────────────────────────────────────────────────────────────────────
// Unit 3 — Type 1: The Perfectionist / The Reformer
// 4 lessons × 12 exercises each
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson } from "@/types/lessons";

// ── Lesson 1: Core Motivation, Fear & Desire ──────────────────────────────

const lesson1: Lesson = {
  id: "u3-l1",
  unitId: "type-1",
  order: 1,
  title: "The Inner Critic",
  subtitle: "Core motivation, fear, and desire of Type 1",
  xpReward: 20,
  exercises: [
    {
      id: "u3-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Meet the Perfectionist",
        body: "Type 1s are driven by a deep need to be good, right, and ethical. They have an ever-present inner voice — often called the Inner Critic — that constantly evaluates whether they and the world are measuring up.",
        highlight: "Inner Critic",
      },
    },
    {
      id: "u3-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Fear, Desire & Motivation",
        body: "The core fear of Type 1 is being corrupt, evil, or defective. Their core desire is to have integrity and be good. Everything they do is filtered through the question: 'Is this the right thing to do?'",
        highlight: "integrity",
      },
    },
    {
      id: "u3-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core fear of Type 1?",
        options: [
          "Being abandoned by loved ones",
          "Being corrupt, evil, or defective",
          "Being worthless or without achievements",
          "Being controlled by others",
        ],
        correctIndex: 1,
        explanation:
          "Ones fear being morally flawed at their core. This fear drives their relentless pursuit of doing the right thing.",
      },
    },
    {
      id: "u3-l1-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core desire of Type 1?",
        options: [
          "To be loved unconditionally",
          "To be successful and admired",
          "To have integrity and be good",
          "To be safe and secure",
        ],
        correctIndex: 2,
        explanation:
          "Ones deeply desire goodness and integrity. They want to live up to their own high ethical standards and be beyond reproach.",
      },
    },
    {
      id: "u3-l1-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "The Type 1's persistent internal voice is commonly called:",
        options: [
          "The Inner Child",
          "The Inner Critic",
          "The Inner Dreamer",
          "The Inner Helper",
        ],
        correctIndex: 1,
        explanation:
          "The Inner Critic is the hallmark of Type 1. It's a relentless internal evaluator comparing what IS to what SHOULD BE — running practically 24/7.",
      },
    },
    {
      id: "u3-l1-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each Type 1 concept to its description.",
        pairs: [
          { left: "Core Fear", right: "Being corrupt or defective" },
          { left: "Core Desire", right: "Having integrity and being good" },
          { left: "Inner Critic", right: "Constant internal evaluator" },
          { left: "Core Motivation", right: "To be right and improve things" },
        ],
      },
    },
    {
      id: "u3-l1-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Type 1s are driven by the need to be ___, right, and ethical.",
        options: ["loved", "good", "powerful", "unique"],
        correctIndex: 1,
        explanation:
          "Goodness is the central organizing principle for Type 1. Their entire personality structure revolves around being a morally upright person.",
      },
    },
    {
      id: "u3-l1-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "The Type 1's Inner Critic constantly compares what IS to what ___.",
        options: ["WAS", "COULD BE", "SHOULD BE", "WILL BE"],
        correctIndex: 2,
        explanation:
          "The Inner Critic operates on 'shoulds' — an idealized version of reality. This gap between what is and what should be creates the chronic tension Ones feel.",
      },
    },
    {
      id: "u3-l1-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Alex just finished a big presentation at work. Their coworkers are congratulating them, saying it went great. But Alex can't stop thinking about the one slide where they stumbled over a word and the moment they forgot to mention a key statistic.",
        question: "Which Type 1 pattern is Alex demonstrating?",
        options: [
          "The need to be admired by others",
          "The Inner Critic fixating on imperfections",
          "Fear of being abandoned by coworkers",
          "Desire to compete with others",
        ],
        correctIndex: 1,
        explanation:
          "Classic Type 1 — even when things go well, the Inner Critic zeroes in on what went wrong. Ones have a hard time celebrating success because their attention is magnetically drawn to imperfections.",
      },
    },
    {
      id: "u3-l1-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Jordan is organizing a community volunteer event. They've rewritten the schedule five times, agonizing over whether the breaks are too long or the tasks aren't distributed fairly. The deadline to send it out was yesterday.",
        question: "What core Type 1 dynamic is at play here?",
        options: [
          "Fear of being seen as incompetent",
          "Desire for control over others",
          "The need to get it 'right' overriding practical deadlines",
          "Anxiety about what could go wrong",
        ],
        correctIndex: 2,
        explanation:
          "Ones can get paralyzed by their own standards. The drive to make things perfect can actually work against their equally strong sense of responsibility — creating real internal conflict.",
      },
    },
    {
      id: "u3-l1-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Sam notices their roommate left dishes in the sink again. Sam doesn't say anything but feels a rising wave of frustration. They clean the dishes themselves, feeling resentful the entire time, thinking 'Why can't anyone else just do things properly?'",
        question:
          "This illustrates which key aspect of how Type 1s experience anger?",
        options: [
          "They express anger explosively and immediately",
          "They suppress anger as resentment because expressing it feels 'wrong'",
          "They project their anger onto others",
          "They are rarely bothered by other people's habits",
        ],
        correctIndex: 1,
        explanation:
          "Ones sit in the Gut/Body triad and have a complicated relationship with anger. Since anger feels 'bad,' they suppress it — but it leaks out as resentment, rigidity, and passive-aggressive tension.",
      },
    },
    {
      id: "u3-l1-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "Type 1 belongs to which center of intelligence in the Enneagram?",
        options: [
          "Heart Center (feeling)",
          "Head Center (thinking)",
          "Body/Gut Center (instinct)",
          "None — they use all equally",
        ],
        correctIndex: 2,
        explanation:
          "Type 1 is in the Body/Gut triad alongside Types 8 and 9. Their core emotion is anger — though unlike 8s who express it openly, Ones try to control and suppress it.",
      },
    },
  ],
};

// ── Lesson 2: Passion & Virtue + Health Levels ────────────────────────────

const lesson2: Lesson = {
  id: "u3-l2",
  unitId: "type-1",
  order: 2,
  title: "Anger to Serenity",
  subtitle: "The passion, virtue, and health levels of Type 1",
  xpReward: 25,
  exercises: [
    {
      id: "u3-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Passion: Anger",
        body: "In Naranjo's system, every type has a 'passion' — a core emotional habit that distorts perception. For Type 1, it's Anger. Not explosive rage, but a chronic tension: suppressed frustration that the world isn't as it should be.",
        highlight: "Anger",
      },
    },
    {
      id: "u3-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Virtue: Serenity",
        body: "The antidote to anger is Serenity — the ability to accept imperfection without losing inner peace. When healthy, Ones move from 'everything must be fixed' to 'things can be imperfect and still be okay.'",
        highlight: "Serenity",
      },
    },
    {
      id: "u3-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "According to Naranjo, what is the core 'passion' (emotional habit) of Type 1?",
        options: ["Pride", "Envy", "Anger", "Fear"],
        correctIndex: 2,
        explanation:
          "Anger is the passion of Type 1. It manifests as a simmering undercurrent of resentment, irritation, and tension — not usually as outward rage.",
      },
    },
    {
      id: "u3-l2-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the virtue (growth direction) of Type 1?",
        options: ["Humility", "Serenity", "Truthfulness", "Non-Attachment"],
        correctIndex: 1,
        explanation:
          "Serenity is the state Ones access when they let go of the need to fix everything. It's acceptance without resignation — peace with imperfection.",
      },
    },
    {
      id: "u3-l2-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "How does Type 1's anger typically manifest, according to Enneagram theory?",
        options: [
          "Explosive outbursts directed at others",
          "Suppressed resentment, tension, and rigidity",
          "Passive withdrawal from relationships",
          "Redirected into competitive drive",
        ],
        correctIndex: 1,
        explanation:
          "Because Ones believe anger is 'bad,' they suppress it. But it doesn't disappear — it shows up as bodily tension, judgmental thoughts, irritability, and that signature One resentment.",
      },
    },
    {
      id: "u3-l2-e6",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction:
          "Sort these Type 1 traits into the correct health level (Riso-Hudson model).",
        categories: ["Healthy", "Average", "Unhealthy"],
        items: [
          { text: "Wise and discerning", categoryIndex: 0 },
          { text: "Rigid and critical", categoryIndex: 1 },
          { text: "Self-righteous and punitive", categoryIndex: 2 },
          { text: "Morally heroic", categoryIndex: 0 },
          { text: "Impersonal and judgmental", categoryIndex: 1 },
          { text: "Obsessive and contradictory", categoryIndex: 2 },
        ],
      },
    },
    {
      id: "u3-l2-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "A healthy Type 1 embodies ___, accepting imperfection with inner peace.",
        options: ["Serenity", "Pride", "Humility", "Detachment"],
        correctIndex: 0,
        explanation:
          "Serenity is the virtue that healthy Ones access. It's not apathy — it's the wisdom to know that imperfection is part of life, and that's genuinely okay.",
      },
    },
    {
      id: "u3-l2-e8",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction:
          "Match each health level to how Type 1's anger shows up.",
        pairs: [
          {
            left: "Healthy",
            right: "Accepts imperfection; channels ideals constructively",
          },
          {
            left: "Average",
            right: "Simmering resentment; critical and rigid",
          },
          {
            left: "Unhealthy",
            right: "Punitive and self-righteous; obsessive control",
          },
          {
            left: "Virtue (Serenity)",
            right: "Inner peace without needing to fix everything",
          },
        ],
      },
    },
    {
      id: "u3-l2-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Morgan is a team lead. When a junior employee makes an error in a report, Morgan calmly helps them fix it, explains why accuracy matters, and acknowledges their effort. Morgan doesn't dwell on the mistake afterward.",
        question: "Which health level is Morgan operating from?",
        options: [
          "Unhealthy — Morgan is suppressing their real feelings",
          "Average — Morgan is being rigidly proper",
          "Healthy — Morgan channels their standards constructively with grace",
          "This doesn't sound like a Type 1 at all",
        ],
        correctIndex: 2,
        explanation:
          "This is a healthy One — they still care about getting it right, but they bring wisdom and patience instead of harsh criticism. They've found the balance between standards and compassion.",
      },
    },
    {
      id: "u3-l2-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Taylor keeps a mental list of every time their partner doesn't load the dishwasher 'correctly.' Taylor hasn't said anything directly, but makes sighing sounds and occasionally reloads the dishwasher in front of their partner. Inside, Taylor is seething.",
        question: "What pattern from Type 1 is Taylor caught in?",
        options: [
          "Healthy expression of standards",
          "Average-level resentment and passive criticism",
          "Growth toward Serenity",
          "Unhealthy obsessive control",
        ],
        correctIndex: 1,
        explanation:
          "This is textbook average-level One behavior: suppressed anger leaking out as passive-aggressive resentment. Taylor has a 'right way' to do things but won't express the anger directly because that feels wrong too.",
      },
    },
    {
      id: "u3-l2-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Chris has become convinced they are the only person who truly understands ethics. They publicly shame coworkers for minor infractions, keep detailed records of others' mistakes, and feel justified punishing anyone who falls short.",
        question: "What health level does this represent for a Type 1?",
        options: [
          "Healthy — Chris has strong moral convictions",
          "Average — Chris is just being a perfectionist",
          "Unhealthy — self-righteous, punitive, and obsessive",
          "This is actually a Type 8 pattern",
        ],
        correctIndex: 2,
        explanation:
          "This is an unhealthy One: the inner critic has become externalized into a punishing crusade. The passion of anger has overtaken any serenity, and the need to be 'right' has turned cruel.",
      },
    },
    {
      id: "u3-l2-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "In the Enneagram, a 'passion' refers to:",
        options: [
          "Something you're enthusiastic about",
          "A core emotional habit that distorts your perception",
          "Your greatest strength",
          "A romantic tendency",
        ],
        correctIndex: 1,
        explanation:
          "In Naranjo's framework, each type has a 'passion' — an automatic emotional pattern that keeps you stuck in your type's fixation. For Ones, that passion is Anger.",
      },
    },
  ],
};

// ── Lesson 3: Wings, Stress Line & Growth Line ───────────────────────────

const lesson3: Lesson = {
  id: "u3-l3",
  unitId: "type-1",
  order: 3,
  title: "How Ones Shift",
  subtitle: "Wings, stress, and growth lines of Type 1",
  xpReward: 25,
  exercises: [
    {
      id: "u3-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Two Wings of Type 1",
        body: "Every type is flavored by its neighboring types. A 1w9 (The Idealist) is more cerebral, detached, and quietly principled. A 1w2 (The Advocate) is more people-oriented, warm, and crusading for causes.",
        highlight: "1w9 vs 1w2",
      },
    },
    {
      id: "u3-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Stress & Growth Lines",
        body: "Under stress, Ones move to Type 4 — becoming moody, emotionally volatile, and melancholic. In growth, Ones move to Type 7 — becoming spontaneous, joyful, and able to relax their rigid standards.",
        highlight: "Stress → 4, Growth → 7",
      },
    },
    {
      id: "u3-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What are the two wings of Type 1?",
        options: [
          "1w9 (The Idealist) and 1w2 (The Advocate)",
          "1w2 (The Helper) and 1w3 (The Achiever)",
          "1w8 (The Challenger) and 1w2 (The Advocate)",
          "1w9 (The Peacemaker) and 1w3 (The Performer)",
        ],
        correctIndex: 0,
        explanation:
          "Wings are always the numbers on either side. For Type 1, that's 9 and 2. The 1w9 is called The Idealist, and the 1w2 is The Advocate.",
      },
    },
    {
      id: "u3-l3-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "When a Type 1 is under significant stress, they take on traits of which type?",
        options: ["Type 7", "Type 4", "Type 8", "Type 2"],
        correctIndex: 1,
        explanation:
          "Under stress, Ones move to the lower side of Type 4 — they become moody, self-pitying, and emotionally volatile. The usual composure cracks and intense feelings pour through.",
      },
    },
    {
      id: "u3-l3-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "In growth, Type 1 moves toward which type's healthy qualities?",
        options: ["Type 4", "Type 7", "Type 9", "Type 3"],
        correctIndex: 1,
        explanation:
          "Growing Ones access healthy Type 7 energy — becoming spontaneous, joyful, and playful. They learn that life doesn't have to be an endless improvement project.",
      },
    },
    {
      id: "u3-l3-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction:
          "Match each Type 1 wing or line to its description.",
        pairs: [
          { left: "1w9 (The Idealist)", right: "More cerebral and detached" },
          { left: "1w2 (The Advocate)", right: "More warm and crusading" },
          { left: "Stress → Type 4", right: "Moody and emotionally volatile" },
          { left: "Growth → Type 7", right: "Spontaneous and joyful" },
        ],
      },
    },
    {
      id: "u3-l3-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "A 1w2 is called The ___ because they channel their idealism into helping others.",
        options: ["Idealist", "Advocate", "Reformer", "Perfectionist"],
        correctIndex: 1,
        explanation:
          "The 1w2 combines the One's principled nature with the Two's people-orientation, creating someone who crusades for causes and fights for what's right on behalf of others.",
      },
    },
    {
      id: "u3-l3-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Under stress, a Type 1 moves to Type 4 and becomes more ___ and emotionally volatile.",
        options: ["aggressive", "moody", "scattered", "withdrawn"],
        correctIndex: 1,
        explanation:
          "The stress move to 4 brings up all the emotions Ones usually suppress. They can become self-pitying, dramatic, and fixated on how they feel rather than what they should do.",
      },
    },
    {
      id: "u3-l3-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Priya is usually composed and principled. But after months of overwork and conflict with management, she's started crying at random moments, writing bitter journal entries about how nobody understands her, and withdrawing from friends to sit alone with sad music.",
        question:
          "What Enneagram dynamic explains Priya's shift?",
        options: [
          "She's discovered she's actually a Type 4",
          "She's moving to her stress point (Type 4)",
          "She's growing into healthy Type 7 energy",
          "Her 1w2 wing is becoming dominant",
        ],
        correctIndex: 1,
        explanation:
          "This is the classic One-to-Four stress move. Under prolonged pressure, the emotional floodgates open: moodiness, melancholy, and a sense of being misunderstood replace the usual composed exterior.",
      },
    },
    {
      id: "u3-l3-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Derek, normally a rule-following perfectionist, has been working on personal growth. Lately he's been trying new restaurants without reading reviews first, laughing at his own mistakes, and signed up for an improv comedy class — something that would have terrified him a year ago.",
        question: "What's happening in Derek's Enneagram journey?",
        options: [
          "He's moving to his stress point (Type 4)",
          "He's becoming more like his 1w9 wing",
          "He's accessing his growth line (Type 7)",
          "He's losing his Type 1 identity",
        ],
        correctIndex: 2,
        explanation:
          "Derek is accessing healthy Seven energy — spontaneity, joy, and the freedom to be imperfect. This is what growth looks like for a One: loosening up without abandoning their values.",
      },
    },
    {
      id: "u3-l3-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Two people are both Type 1, but they handle their perfectionism differently. One is quiet, reserved, and channels their standards into personal study and internal philosophizing. The other is outspoken, volunteers for social justice causes, and feels compelled to help fix what's wrong in other people's lives.",
        question: "How would you explain the difference?",
        options: [
          "The first is a 1w9 (Idealist), the second is a 1w2 (Advocate)",
          "The first is unhealthy, the second is healthy",
          "The first is a 1w2, the second is a 1w9",
          "They're actually different types entirely",
        ],
        correctIndex: 0,
        explanation:
          "Wings flavor how the core type is expressed. The 1w9 turns inward — more cerebral and detached. The 1w2 turns outward — more people-focused and crusading. Same core drive for goodness, different expression.",
      },
    },
    {
      id: "u3-l3-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "True or false: A Type 1's wing must be either 9 or 2.",
        options: [
          "True — wings are always adjacent numbers",
          "False — you can have any type as a wing",
          "False — wings don't exist for Type 1",
          "True — but only if you're an introvert",
        ],
        correctIndex: 0,
        explanation:
          "Wings are always the numbers directly next to your core type on the Enneagram circle. For Type 1, that's 9 and 2 — no exceptions.",
      },
    },
  ],
};

// ── Lesson 4: Spotting This Type + Common Mistypes ────────────────────────

const lesson4: Lesson = {
  id: "u3-l4",
  unitId: "type-1",
  order: 4,
  title: "Spotting the One",
  subtitle: "Real-world recognition and common mistypes",
  xpReward: 30,
  exercises: [
    {
      id: "u3-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "How to Spot a Type 1",
        body: "Ones often have a composed, controlled demeanor. They use precise language, correct small errors (even other people's grammar), and carry tension in their body. They're the ones who straighten the crooked picture frame.",
        highlight: "composed and controlled",
      },
    },
    {
      id: "u3-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Common Mistypes",
        body: "Type 1 is most often confused with Type 6 (both are dutiful and responsible) and Type 5 (both are cerebral and precise). The key difference: Ones follow internal standards of right/wrong, while Sixes seek external security, and Fives seek knowledge.",
        highlight: "internal standards",
      },
    },
    {
      id: "u3-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which behavior is most characteristic of Type 1?",
        options: [
          "Constantly checking if others like them",
          "Correcting small errors others wouldn't notice",
          "Seeking thrilling new experiences",
          "Avoiding conflict at all costs",
        ],
        correctIndex: 1,
        explanation:
          "Ones notice imperfections like a radar — a typo in an email, a misaligned picture, a grammatical error. Their attention is automatically drawn to what could be corrected.",
      },
    },
    {
      id: "u3-l4-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Type 1 is most commonly mistyped as which other type?",
        options: ["Type 3", "Type 6", "Type 7", "Type 8"],
        correctIndex: 1,
        explanation:
          "Ones and Sixes look similar on the surface — both are responsible, dutiful, and follow rules. But Ones follow their internal standards of right/wrong, while Sixes follow rules for security and belonging.",
      },
    },
    {
      id: "u3-l4-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "What's the key difference between a Type 1 and a Type 5?",
        options: [
          "Ones are emotional, Fives are not",
          "Ones judge by internal moral standards, Fives seek knowledge for competence",
          "Ones are introverted, Fives are extroverted",
          "There's no meaningful difference",
        ],
        correctIndex: 1,
        explanation:
          "Both can be cerebral and precise, but their motivations differ completely. Ones want to be morally correct; Fives want to be intellectually capable. One asks 'Is this right?' while Five asks 'Do I understand this?'",
      },
    },
    {
      id: "u3-l4-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction:
          "Match each type to what drives their 'responsible' behavior.",
        pairs: [
          { left: "Type 1", right: "Internal moral standards" },
          { left: "Type 6", right: "Need for external security" },
          { left: "Type 3", right: "Desire to appear successful" },
          { left: "Type 5", right: "Need for intellectual competence" },
        ],
      },
    },
    {
      id: "u3-l4-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "While Type 6 follows rules for ___, Type 1 follows rules because they're the right thing to do.",
        options: ["fun", "security", "attention", "power"],
        correctIndex: 1,
        explanation:
          "This is the crucial distinction. Sixes are dutiful because it creates safety and belonging. Ones are dutiful because their inner moral compass demands it — even when it's personally costly.",
      },
    },
    {
      id: "u3-l4-e8",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort these behaviors: which suggest Type 1 vs Type 6?",
        categories: ["More likely Type 1", "More likely Type 6"],
        items: [
          {
            text: "Corrects others' grammar without being asked",
            categoryIndex: 0,
          },
          {
            text: "Asks multiple people for advice before deciding",
            categoryIndex: 1,
          },
          {
            text: "Feels resentful when others cut ethical corners",
            categoryIndex: 0,
          },
          {
            text: "Worries about worst-case scenarios",
            categoryIndex: 1,
          },
          {
            text: "Has a strong internal sense of 'should'",
            categoryIndex: 0,
          },
          {
            text: "Looks to authorities or trusted friends for reassurance",
            categoryIndex: 1,
          },
        ],
      },
    },
    {
      id: "u3-l4-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Two coworkers both refuse to cut corners on a project. Person A says: 'It's just not right — we committed to doing quality work.' Person B says: 'What if the client finds out? We could lose the account and our reputation.'",
        question: "Which person is more likely a Type 1, and which a Type 6?",
        options: [
          "A is Type 1 (internal standards), B is Type 6 (fear of consequences)",
          "A is Type 6 (loyalty), B is Type 1 (perfectionism)",
          "Both are Type 1 — same motivation",
          "Both are Type 6 — same motivation",
        ],
        correctIndex: 0,
        explanation:
          "Person A is motivated by internal ethics ('it's not right'), classic Type 1. Person B is motivated by fear of negative outcomes ('what if they find out'), classic Type 6. Same behavior, completely different engines.",
      },
    },
    {
      id: "u3-l4-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "At a dinner party, someone shares a hot take about politics. One person at the table feels a surge of irritation — not because of the politics, but because the argument was logically sloppy and factually incorrect. They can't let it go.",
        question:
          "Is this more likely a Type 1 or a Type 5 reaction, and why?",
        options: [
          "Type 1 — they're upset because the person is morally wrong",
          "Type 5 — they're upset because the argument is intellectually sloppy",
          "Could be either — need to know if they're upset about ethics or logic",
          "Neither — this is a Type 8 reaction",
        ],
        correctIndex: 2,
        explanation:
          "Great instinct if you picked C! Both Ones and Fives can react this way, but for different reasons. A One is bothered by moral incorrectness; a Five is bothered by intellectual incorrectness. The WHY matters more than the WHAT.",
      },
    },
    {
      id: "u3-l4-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "You're trying to figure out if your friend is a Type 1 or Type 3. Both are high-achieving and organized. Your friend says: 'I don't care if people are impressed — I just need to know I did it the right way.'",
        question: "What does this statement suggest?",
        options: [
          "Definitely Type 3 — they're image-managing",
          "Definitely Type 1 — internal standards matter more than external validation",
          "Could be either — Threes also care about quality",
          "Neither — this sounds like a Type 6",
        ],
        correctIndex: 1,
        explanation:
          "This is a strong One signal. Threes care about how their work is perceived by others. Ones care about whether the work meets their own internal standard of rightness — even if nobody ever sees it.",
      },
    },
    {
      id: "u3-l4-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "What body language cue often signals a Type 1?",
        options: [
          "Relaxed, slouchy posture",
          "Exaggerated gestures and expressiveness",
          "Upright posture, controlled movements, and physical tension",
          "Nervous fidgeting and rapid speech",
        ],
        correctIndex: 2,
        explanation:
          "Ones literally hold tension in their body — their suppressed anger and self-control show up as rigidity, stiff posture, and controlled movements. The body is a map of the type's inner world.",
      },
    },
  ],
};

export const type1Lessons: Lesson[] = [lesson1, lesson2, lesson3, lesson4];
