// ─────────────────────────────────────────────────────────────────────────────
// Unit 1: What Is the Enneagram?
// 5 lessons introducing the Enneagram from scratch for complete beginners.
// Content grounded in Riso-Hudson, Naranjo, and Chestnut.
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson } from "@/types/lessons";

const UNIT_ID = "what-is-enneagram";

// ── Lesson 1: Nine Ways of Seeing ─────────────────────────────────────────

const lesson1: Lesson = {
  id: "nine-ways-of-seeing",
  unitId: UNIT_ID,
  order: 1,
  title: "Nine Ways of Seeing",
  subtitle: "The Enneagram is a map of nine personality types",
  xpReward: 20,
  exercises: [
    // ── E1: concept-intro (difficulty 1) ──
    {
      id: "u1-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Welcome to the Enneagram",
        body: "The Enneagram is a personality system that describes nine distinct ways people see the world. Each type has a different core motivation, a deep, often unconscious drive that shapes how you think, feel, and act.",
        highlight: "core motivation",
      },
    },
    // ── E2: concept-intro (difficulty 1) ──
    {
      id: "u1-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Motivation, Not Behavior",
        body: "Two people can do the exact same thing for completely different reasons. The Enneagram focuses on WHY you do things, not WHAT you do. That's what makes it so powerful for self-understanding.",
        highlight: "WHY you do things",
      },
    },
    // ── E3: multiple-choice (difficulty 1) ──
    {
      id: "u1-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How many personality types does the Enneagram describe?",
        options: ["Four", "Nine", "Sixteen", "Twelve"],
        correctIndex: 1,
        explanation:
          "The Enneagram describes exactly nine personality types. The word 'Enneagram' comes from the Greek 'ennea' (nine) and 'gramma' (figure).",
      },
    },
    // ── E4: multiple-choice (difficulty 1) ──
    {
      id: "u1-l1-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What does the Enneagram focus on most?",
        options: [
          "What hobbies you enjoy",
          "Why you do what you do",
          "How smart you are",
          "What career fits you best",
        ],
        correctIndex: 1,
        explanation:
          "The Enneagram is all about motivation, the deep inner 'why' behind your patterns. It's not about surface behaviors or preferences.",
      },
    },
    // ── E5: multiple-choice (difficulty 1) ──
    {
      id: "u1-l1-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "What is a 'core motivation' in the Enneagram?",
        options: [
          "Your favorite way to relax",
          "A deep, often unconscious drive that shapes how you think and act",
          "The career path you feel drawn to",
          "A habit you picked up in childhood",
        ],
        correctIndex: 1,
        explanation:
          "A core motivation is the deep inner drive behind your personality patterns. It's often so automatic you don't even notice it, like an invisible engine running in the background.",
      },
    },
    // ── E6: matching-pairs (difficulty 2) ──
    {
      id: "u1-l1-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction:
          "Match each Enneagram type to the one-word drive that best captures it.",
        pairs: [
          { left: "Type 1, The Reformer", right: "Integrity" },
          { left: "Type 2, The Helper", right: "Love" },
          { left: "Type 7, The Enthusiast", right: "Freedom" },
          { left: "Type 8, The Challenger", right: "Strength" },
        ],
      },
    },
    // ── E7: fill-in-blank (difficulty 2) ──
    {
      id: "u1-l1-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "The Enneagram focuses on your ___, not your behavior.",
        options: ["motivation", "intelligence", "age", "appearance"],
        correctIndex: 0,
        explanation:
          "Motivation is the heart of the Enneagram. Two people who behave identically may be driven by completely different core motivations.",
      },
    },
    // ── E8: matching-pairs (difficulty 2) ──
    {
      id: "u1-l1-e8",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction:
          "Match each Enneagram type to the one-word drive that best captures it.",
        pairs: [
          { left: "Type 3, The Achiever", right: "Worth" },
          { left: "Type 4, The Individualist", right: "Identity" },
          { left: "Type 5, The Investigator", right: "Knowledge" },
          { left: "Type 6, The Loyalist", right: "Security" },
        ],
      },
    },
    // ── E9: scenario (difficulty 3) ──
    {
      id: "u1-l1-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Alex and Jordan both volunteer at a soup kitchen every weekend. Alex volunteers because they feel a deep need to be seen as a good, helpful person. Jordan volunteers because they want to make sure their community is safe and supported.",
        question:
          "What does this example illustrate about the Enneagram?",
        options: [
          "Alex and Jordan are the same Enneagram type",
          "Same behavior can come from different motivations",
          "Volunteering means you're a Type 2",
          "Behavior is more important than motivation",
        ],
        correctIndex: 1,
        explanation:
          "This is exactly why the Enneagram looks at motivation, not behavior. Alex might be driven by a need for worth (Type 3), while Jordan might be driven by security (Type 6), same action, different engines.",
      },
    },
    // ── E10: scenario (difficulty 3) ──
    {
      id: "u1-l1-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Sam organizes their desk every morning before starting work. Their friend thinks Sam is just 'being neat,' but Sam says, 'If my space isn't ordered, I feel like something is wrong with me.'",
        question:
          "Sam's need for order seems connected to which kind of core motivation?",
        options: [
          "A desire for fun and excitement",
          "A desire for integrity and doing things right",
          "A desire for love and connection",
          "A desire for power and control",
        ],
        correctIndex: 1,
        explanation:
          "Sam's drive to keep things ordered isn't just about tidiness, it comes from a deep desire to be good and do things the right way, a hallmark of Type 1's core motivation.",
      },
    },
    // ── E11: multiple-choice (difficulty 3) ──
    {
      id: "u1-l1-e11",
      difficulty: 3,
      content: {
        type: "multiple-choice",
        question:
          "Why can't you determine someone's Enneagram type just by watching their behavior?",
        options: [
          "Because the Enneagram isn't a real system",
          "Because people act differently on weekends",
          "Because the same behavior can be driven by different core motivations",
          "Because everyone is the same deep down",
        ],
        correctIndex: 2,
        explanation:
          "This is the key insight! A person who works hard could be driven by a need for perfection (Type 1), a need for achievement (Type 3), a need for security (Type 6), or many other motivations.",
      },
    },
    // ── E12: multiple-choice closer (difficulty 1) ──
    {
      id: "u1-l1-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "The Enneagram is a system of ___ personality types, each with a unique core ___.",
        options: [
          "9 ... motivation",
          "12 ... behavior",
          "4 ... temperament",
          "16 ... preference",
        ],
        correctIndex: 0,
        explanation:
          "The Enneagram describes nine types, each defined by a unique core motivation. You've got the foundation down!",
      },
    },
  ],
};

// ── Lesson 2: Three Brains, Head, Heart, Gut ─────────────────────────────

const lesson2: Lesson = {
  id: "three-brains",
  unitId: UNIT_ID,
  order: 2,
  title: "Three Brains: Head, Heart, Gut",
  subtitle: "The nine types group into three intelligence centers",
  xpReward: 20,
  exercises: [
    {
      id: "u1-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Three Centers of Intelligence",
        body: "The nine Enneagram types are organized into three groups called Centers, or Triads. Each center processes life through a different kind of intelligence: instinct, emotion, or analysis.",
        highlight: "Centers",
      },
    },
    {
      id: "u1-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Meet the Three Centers",
        body: "The Gut Center (Types 8, 9, 1) processes through instinct and deals with anger. The Heart Center (Types 2, 3, 4) processes through emotion and deals with shame. The Head Center (Types 5, 6, 7) processes through analysis and deals with fear.",
        highlight: "Gut, Heart, Head",
      },
    },
    {
      id: "u1-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How many Centers (or Triads) are there in the Enneagram?",
        options: ["Two", "Three", "Four", "Nine"],
        correctIndex: 1,
        explanation:
          "There are three Centers: Gut (Body), Heart (Feeling), and Head (Thinking). Each contains three of the nine types.",
      },
    },
    {
      id: "u1-l2-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which emotion is at the core of the Heart Center?",
        options: ["Fear", "Anger", "Shame", "Joy"],
        correctIndex: 2,
        explanation:
          "The Heart Center types (2, 3, 4) all grapple with shame and questions about their identity and self-worth, even though each type handles it differently.",
      },
    },
    {
      id: "u1-l2-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which Center processes through instinct and deals with anger?",
        options: [
          "Head Center",
          "Heart Center",
          "Gut Center",
          "Spirit Center",
        ],
        correctIndex: 2,
        explanation:
          "The Gut (Body) Center, Types 8, 9, and 1, processes through instinct. Their core emotional challenge is anger, though each type expresses or suppresses it differently.",
      },
    },
    {
      id: "u1-l2-e6",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort each type into its correct Center.",
        categories: ["Gut Center", "Heart Center", "Head Center"],
        items: [
          { text: "Type 8, The Challenger", categoryIndex: 0 },
          { text: "Type 2, The Helper", categoryIndex: 1 },
          { text: "Type 5, The Investigator", categoryIndex: 2 },
          { text: "Type 1, The Reformer", categoryIndex: 0 },
          { text: "Type 4, The Individualist", categoryIndex: 1 },
          { text: "Type 7, The Enthusiast", categoryIndex: 2 },
        ],
      },
    },
    {
      id: "u1-l2-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "The Head Center types (5, 6, 7) deal primarily with the emotion of ___.",
        options: ["anger", "shame", "fear", "sadness"],
        correctIndex: 2,
        explanation:
          "The Head Center types are all trying to manage fear and anxiety. Type 5 fears being overwhelmed, Type 6 fears being unsupported, and Type 7 fears being trapped in pain.",
      },
    },
    {
      id: "u1-l2-e8",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each Center to its core emotion and intelligence style.",
        pairs: [
          { left: "Gut Center (8, 9, 1)", right: "Anger / Instinct" },
          { left: "Heart Center (2, 3, 4)", right: "Shame / Emotion" },
          { left: "Head Center (5, 6, 7)", right: "Fear / Analysis" },
        ],
      },
    },
    {
      id: "u1-l2-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "When Riley's friend cancels plans, Riley's first reaction is a gut feeling of irritation, almost like a physical tension in their body. They don't analyze it or get sad. They just feel an instinctive 'that's not okay.'",
        question: "Based on this reaction, which Center does Riley most likely operate from?",
        options: [
          "Head Center, they're analyzing the situation",
          "Heart Center, they're feeling hurt about their image",
          "Gut Center, they're responding with instinctive anger",
          "None, everyone reacts this way",
        ],
        correctIndex: 2,
        explanation:
          "Riley's immediate, body-based, anger-tinged response is characteristic of the Gut Center. These types feel things in their body first and process through instinct before thought or emotion.",
      },
    },
    {
      id: "u1-l2-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "When faced with a big decision, Morgan's first instinct is to research everything. They make pros-and-cons lists, read reviews, and think through every possible outcome before committing.",
        question: "Which Center does Morgan most likely lead with?",
        options: [
          "Gut Center, they trust their instincts",
          "Heart Center, they care about how it looks",
          "Head Center, they analyze before acting",
          "All Centers equally",
        ],
        correctIndex: 2,
        explanation:
          "Morgan's research-first, analyze-everything approach is classic Head Center. These types manage anxiety by trying to think their way to certainty before acting.",
      },
    },
    {
      id: "u1-l2-e11",
      difficulty: 3,
      content: {
        type: "multiple-choice",
        question:
          "Type 9 (The Peacemaker) is in the Gut Center but seems very calm. How is that possible?",
        options: [
          "Type 9 isn't really in the Gut Center",
          "Type 9 suppresses their anger to maintain peace",
          "Type 9 doesn't feel anger at all",
          "The Center system doesn't apply to every type",
        ],
        correctIndex: 1,
        explanation:
          "Great catch! Each type in a Center has a different relationship to its core emotion. Type 8 externalizes anger, Type 1 internalizes it as resentment, and Type 9 'falls asleep' to their anger, suppressing it to avoid conflict.",
      },
    },
    {
      id: "u1-l2-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which types belong to the Heart Center?",
        options: [
          "Types 8, 9, 1",
          "Types 2, 3, 4",
          "Types 5, 6, 7",
          "Types 1, 2, 3",
        ],
        correctIndex: 1,
        explanation:
          "Types 2, 3, and 4 make up the Heart Center. They process life through emotion and are especially attuned to questions of identity, image, and self-worth.",
      },
    },
  ],
};

// ── Lesson 3: What Drives You? ────────────────────────────────────────────

const lesson3: Lesson = {
  id: "what-drives-you",
  unitId: UNIT_ID,
  order: 3,
  title: "What Drives You?",
  subtitle: "Core fears, desires, and motivations",
  xpReward: 20,
  exercises: [
    {
      id: "u1-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Engine Under the Hood",
        body: "Every Enneagram type has three key ingredients: a core fear (what you avoid), a core desire (what you long for), and a core motivation (the strategy you use to get the desire and avoid the fear).",
        highlight: "core fear, core desire, core motivation",
      },
    },
    {
      id: "u1-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Fear and Desire in Action",
        body: "Take Type 1, the Reformer: they fear being corrupt or defective, and desire integrity. Or Type 7, the Enthusiast: they fear being trapped in pain, and desire freedom and satisfaction. These drives shape everything.",
        highlight: "fear and desire",
      },
    },
    {
      id: "u1-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is a 'core fear' in the Enneagram?",
        options: [
          "A phobia, like fear of spiders",
          "A deep, often unconscious dread that drives your personality patterns",
          "Something you were scared of as a child",
          "A weakness you need to fix",
        ],
        correctIndex: 1,
        explanation:
          "A core fear isn't about spiders or heights, it's a deep psychological dread. For example, Type 3's core fear is being worthless apart from their achievements. It operates in the background, shaping decisions you don't even realize you're making.",
      },
    },
    {
      id: "u1-l3-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the relationship between core fear and core desire?",
        options: [
          "They are the same thing",
          "They are opposites, the desire is what you long for, the fear is what you avoid",
          "Core fear is stronger than core desire",
          "They are unrelated",
        ],
        correctIndex: 1,
        explanation:
          "Core fear and core desire are two sides of the same coin. Type 2 fears being unwanted (the fear) and longs to feel loved (the desire). Your motivation is the strategy you use to move toward the desire and away from the fear.",
      },
    },
    {
      id: "u1-l3-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Type 1, the Reformer, fears being corrupt or defective. What do they desire most?",
        options: [
          "To be powerful",
          "To be loved",
          "To have integrity and be good",
          "To be unique",
        ],
        correctIndex: 2,
        explanation:
          "Type 1's core desire is to be good, to have integrity, and to be balanced. This is the flip side of their fear of being corrupt or defective, they strive for moral excellence.",
      },
    },
    {
      id: "u1-l3-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each type to its core fear.",
        pairs: [
          { left: "Type 1, The Reformer", right: "Being corrupt or defective" },
          { left: "Type 4, The Individualist", right: "Having no identity or significance" },
          { left: "Type 7, The Enthusiast", right: "Being trapped in pain" },
          { left: "Type 8, The Challenger", right: "Being controlled by others" },
        ],
      },
    },
    {
      id: "u1-l3-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Type 7's core fear is being deprived and trapped in pain. Their core desire is to be ___ and content.",
        options: ["powerful", "perfect", "satisfied", "unique"],
        correctIndex: 2,
        explanation:
          "Type 7 longs to feel satisfied and fulfilled. This desire drives their pursuit of exciting experiences, they're trying to stay ahead of the fear that they'll be stuck in pain or boredom.",
      },
    },
    {
      id: "u1-l3-e8",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each type to its core desire.",
        pairs: [
          { left: "Type 2, The Helper", right: "To feel loved and wanted" },
          { left: "Type 3, The Achiever", right: "To feel valuable and worthwhile" },
          { left: "Type 5, The Investigator", right: "To be capable and competent" },
          { left: "Type 6, The Loyalist", right: "To have security and support" },
        ],
      },
    },
    {
      id: "u1-l3-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Taylor always needs to be the best in every project at work. They stay late, obsess over presentations, and feel devastated when a coworker gets praised instead of them. 'If I'm not achieving, what am I even worth?' Taylor once confided to a friend.",
        question: "Which core fear seems to be driving Taylor?",
        options: [
          "Fear of being corrupt (Type 1)",
          "Fear of being worthless without achievements (Type 3)",
          "Fear of being abandoned (Type 6)",
          "Fear of being ordinary (Type 4)",
        ],
        correctIndex: 1,
        explanation:
          "Taylor's statement, 'If I'm not achieving, what am I even worth?', is the hallmark of Type 3's core fear: that without accomplishments, they have no inherent value as a person.",
      },
    },
    {
      id: "u1-l3-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Casey reads three books on every topic before forming an opinion. They withdraw from social events when they feel unprepared, saying, 'I just need to understand this better before I can engage.' Their friends say Casey always knows everything but never seems confident enough to act on it.",
        question: "Which core fear and desire pair best fits Casey?",
        options: [
          "Fear of being helpless / Desire to be competent (Type 5)",
          "Fear of being unloved / Desire to be wanted (Type 2)",
          "Fear of being trapped / Desire to be free (Type 7)",
          "Fear of being wrong / Desire for integrity (Type 1)",
        ],
        correctIndex: 0,
        explanation:
          "Casey's pattern of intense research and withdrawal when unprepared is classic Type 5. They fear being helpless or incapable, so they stockpile knowledge as a way to feel safe in the world.",
      },
    },
    {
      id: "u1-l3-e11",
      difficulty: 3,
      content: {
        type: "multiple-choice",
        question:
          "Someone says, 'I just want everyone to get along. Conflict makes me feel like I'm falling apart.' Which core fear does this most suggest?",
        options: [
          "Fear of being corrupt (Type 1)",
          "Fear of loss and separation (Type 9)",
          "Fear of being without support (Type 6)",
          "Fear of being worthless (Type 3)",
        ],
        correctIndex: 1,
        explanation:
          "Type 9's core fear is loss, separation, and fragmentation. Their deep desire for inner peace and harmony drives them to avoid conflict, not because they don't care, but because conflict threatens their sense of wholeness.",
      },
    },
    {
      id: "u1-l3-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "Every Enneagram type has a core fear, a core desire, and a core ___.",
        options: ["hobby", "motivation", "color", "planet"],
        correctIndex: 1,
        explanation:
          "Fear, desire, and motivation, these are the three pillars of every Enneagram type. The motivation is the strategy you unconsciously use to get your desire and avoid your fear.",
      },
    },
  ],
};

// ── Lesson 4: The Enneagram Isn't a Box ───────────────────────────────────

const lesson4: Lesson = {
  id: "not-a-box",
  unitId: UNIT_ID,
  order: 4,
  title: "The Enneagram Isn't a Box",
  subtitle: "Wings, lines, and levels make every person unique",
  xpReward: 20,
  exercises: [
    {
      id: "u1-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "More Than a Label",
        body: "Your Enneagram type is just the starting point. Wings (the types next to yours), stress and growth lines, and levels of health all add layers. Two people of the same type can look very different!",
        highlight: "wings, lines, and levels",
      },
    },
    {
      id: "u1-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "A Tool for Growth, Not a Box",
        body: "The Enneagram isn't meant to limit you. It's a mirror that reveals your automatic patterns so you can grow beyond them. Riso and Hudson called it 'a framework for liberation, not imprisonment.'",
        highlight: "growth",
      },
    },
    {
      id: "u1-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What are 'wings' in the Enneagram?",
        options: [
          "The types you wish you were",
          "The two types directly adjacent to yours on the Enneagram circle",
          "Your weakest personality traits",
          "The types you're most incompatible with",
        ],
        correctIndex: 1,
        explanation:
          "Your wings are the two types sitting next to yours on the Enneagram circle. For example, a Type 4 has a 3-wing and a 5-wing. One or both wings 'flavor' your core type, adding nuance.",
      },
    },
    {
      id: "u1-l4-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "What do 'stress and growth lines' refer to?",
        options: [
          "How tall you are under stress",
          "Types you move toward when stressed or growing",
          "Your best and worst days",
          "Lines on the Enneagram symbol that are just decorative",
        ],
        correctIndex: 1,
        explanation:
          "Under stress, you take on some patterns of a specific other type (your stress line). In growth, you integrate healthy qualities of a different type (your growth line). This creates dynamic movement, not a fixed box.",
      },
    },
    {
      id: "u1-l4-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What are 'levels of health' in the Enneagram?",
        options: [
          "Your physical fitness level",
          "How well you're doing in life overall",
          "A spectrum from healthy to average to unhealthy within your type",
          "How long you've known your type",
        ],
        correctIndex: 2,
        explanation:
          "Riso and Hudson identified levels of development within each type. A healthy Type 8 looks very different from an unhealthy Type 8, same core motivation, very different expression.",
      },
    },
    {
      id: "u1-l4-e6",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "A Type 6 with a 7-wing (6w7) would be called 'The Buddy' and might appear more ___ than a 6w5.",
        options: ["withdrawn", "playful", "angry", "perfectionistic"],
        correctIndex: 1,
        explanation:
          "The 7-wing adds enthusiasm and sociability to the 6's core loyalty, creating a more outgoing, playful expression. A 6w5 ('The Defender') would lean more toward caution and analysis.",
      },
    },
    {
      id: "u1-l4-e7",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each concept to what it explains about the Enneagram.",
        pairs: [
          { left: "Wings", right: "Types adjacent to yours that flavor your personality" },
          { left: "Stress line", right: "The type you move toward under pressure" },
          { left: "Growth line", right: "The type whose healthy traits you integrate" },
          { left: "Levels of health", right: "The spectrum from healthy to unhealthy within a type" },
        ],
      },
    },
    {
      id: "u1-l4-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "The Enneagram is best understood as a tool for ___, not a label that limits you.",
        options: ["prediction", "growth", "dating", "competition"],
        correctIndex: 1,
        explanation:
          "The purpose of the Enneagram is self-awareness and personal development. When used well, it helps you see your blind spots and grow beyond your automatic patterns.",
      },
    },
    {
      id: "u1-l4-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Maria and Jun are both Type 4 (The Individualist). Maria is a bold, expressive artist who craves the spotlight. Jun is a quiet, introspective poet who prefers deep one-on-one conversations.",
        question:
          "How could they both be Type 4?",
        options: [
          "One of them must be mistyped",
          "Maria likely has a 3-wing and Jun likely has a 5-wing",
          "Type 4 is too vague to be meaningful",
          "They were probably typed by different tests",
        ],
        correctIndex: 1,
        explanation:
          "Wings explain this perfectly! Maria's 3-wing adds ambition and expressiveness, while Jun's 5-wing adds introspection and withdrawal. Both share the same core desire (to find their identity and significance) but express it differently.",
      },
    },
    {
      id: "u1-l4-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "You read about Type 1 (The Reformer) and think, 'That doesn't sound like me at all, I'm not critical or rigid!' But when you read about a healthy Type 1, you see: 'Wise, tolerant, accepting, discerning.' That feels much closer.",
        question: "What concept explains this?",
        options: [
          "You're probably not a Type 1",
          "Levels of health, a healthy Type 1 looks different from an average or unhealthy one",
          "Wings change your type completely",
          "The Enneagram doesn't really work",
        ],
        correctIndex: 1,
        explanation:
          "Levels of health are crucial! Most type descriptions lean toward average levels. A healthy Type 1 is wise, accepting, and serene, quite different from the rigid perfectionist you might picture. Always consider health levels when typing.",
      },
    },
    {
      id: "u1-l4-e11",
      difficulty: 3,
      content: {
        type: "multiple-choice",
        question:
          "Why is it harmful to use the Enneagram as a rigid label?",
        options: [
          "Because it makes you feel special",
          "Because it ignores the dynamic aspects, wings, lines, levels, that make every person unique",
          "Because labels are always negative",
          "Because no personality system is accurate",
        ],
        correctIndex: 1,
        explanation:
          "Reducing someone to 'just a Type 3' ignores the rich complexity of wings, integration/disintegration lines, and health levels. The Enneagram is a living, dynamic map, not a static label.",
      },
    },
    {
      id: "u1-l4-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "Two people of the same Enneagram type can look very different because of:",
        options: [
          "Different wings, health levels, and stress/growth lines",
          "Different zodiac signs",
          "Different favorite colors",
          "Nothing, same type always means same personality",
        ],
        correctIndex: 0,
        explanation:
          "Wings, health levels, and stress/growth lines create enormous variety within each type. The Enneagram is a nuanced, dynamic system, not a one-size-fits-all box.",
      },
    },
  ],
};

// ── Lesson 5: Finding Your Type ───────────────────────────────────────────

const lesson5: Lesson = {
  id: "finding-your-type",
  unitId: UNIT_ID,
  order: 5,
  title: "Finding Your Type",
  subtitle: "How to discover your true Enneagram type",
  xpReward: 25,
  exercises: [
    {
      id: "u1-l5-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Self-Identification Is Key",
        body: "According to Riso-Hudson and David Daniels, the most reliable way to find your type is self-identification: reading about each type's motivations and honestly asking, 'Which one describes my deepest patterns?' Tests are a starting point, not the final word.",
        highlight: "self-identification",
      },
    },
    {
      id: "u1-l5-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Look at Motivation, Not Behavior",
        body: "When exploring your type, don't ask 'What do I do?' Ask 'Why do I do it?' You might be organized (like Type 1) but for a totally different reason, maybe for efficiency (Type 3) or to ease anxiety (Type 6).",
        highlight: "Why do I do it?",
      },
    },
    {
      id: "u1-l5-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "What is the most reliable way to discover your Enneagram type, according to leading experts?",
        options: [
          "An online quiz",
          "Having a friend tell you your type",
          "Self-identification through reading about core motivations",
          "Looking at your birth chart",
        ],
        correctIndex: 2,
        explanation:
          "Riso-Hudson and David Daniels both emphasize that self-identification, honestly reading about each type's inner world, is the gold standard. Tests help narrow it down, but only you truly know your inner motivations.",
      },
    },
    {
      id: "u1-l5-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "When trying to find your type, what should you focus on?",
        options: [
          "Your behavior and habits",
          "Your core motivations and fears",
          "What your friends say about you",
          "Your favorite activities",
        ],
        correctIndex: 1,
        explanation:
          "Behavior is the surface. Motivation is the depth. The same behavior (e.g., helping others) can come from very different motivations, so always look deeper.",
      },
    },
    {
      id: "u1-l5-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "Which common misconception should you avoid when typing yourself?",
        options: [
          "That you should choose the type that sounds nicest",
          "That you should read about motivations",
          "That tests can be a starting point",
          "That self-reflection matters",
        ],
        correctIndex: 0,
        explanation:
          "A big mistake is picking the type you WANT to be rather than the one that describes your deepest patterns. Your type isn't a compliment or an insult, it's a mirror for self-understanding.",
      },
    },
    {
      id: "u1-l5-e6",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "To find your Enneagram type, focus on your core ___, not your behavior.",
        options: ["motivation", "talent", "hobby", "memory"],
        correctIndex: 0,
        explanation:
          "Core motivation is the key. Two people might both be 'helpers,' but one does it because they need love (Type 2) and another because they want harmony (Type 9). The motivation reveals the type.",
      },
    },
    {
      id: "u1-l5-e7",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction:
          "Match each typing pitfall to why it's misleading.",
        pairs: [
          { left: "Picking the 'nicest' type", right: "Your type is about truth, not flattery" },
          { left: "Relying only on a test", right: "Tests measure behavior, not deep motivation" },
          { left: "Typing based on career", right: "Any type can do any job for different reasons" },
          { left: "Letting others type you", right: "Only you know your inner motivations" },
        ],
      },
    },
    {
      id: "u1-l5-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "You don't ___ your Enneagram type, you discover it.",
        options: ["choose", "create", "earn", "lose"],
        correctIndex: 0,
        explanation:
          "Your type isn't a preference or aspiration. It's the pattern that has been running since early in your life. Discovery requires honesty and self-reflection, not wish fulfillment.",
      },
    },
    {
      id: "u1-l5-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Avery takes an online Enneagram test and gets Type 7. They're excited, 'I love the sound of being the Enthusiast!' But when they read the deeper description, including the fear of pain and tendency to avoid difficult emotions, Avery thinks, 'That doesn't really resonate. I actually spend a lot of time analyzing problems, maybe I should look at Type 5 or 6.'",
        question: "What is Avery doing right?",
        options: [
          "Ignoring the test entirely",
          "Going beyond the test result and honestly reflecting on which motivation fits",
          "Choosing the type they like least",
          "Asking a friend for their opinion instead",
        ],
        correctIndex: 1,
        explanation:
          "Avery is doing exactly what experts recommend: using the test as a starting point, then reading about motivations with honest self-reflection. The type that 'sounds cool' isn't always the right one.",
      },
    },
    {
      id: "u1-l5-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Blake says, 'I'm definitely a Type 8 because I'm a leader at work.' But at home, Blake is actually quite anxious, constantly planning for worst-case scenarios, and looking for reassurance from their partner.",
        question: "Why might Blake be mistyped?",
        options: [
          "Blake is focusing on work behavior, not core motivation",
          "Blake can't be a leader and be anxious",
          "Type 8s never work in leadership",
          "Blake needs a better test",
        ],
        correctIndex: 0,
        explanation:
          "Blake typed based on behavior (leadership) rather than motivation. Their underlying pattern of anxiety, worst-case planning, and seeking reassurance sounds more like Type 6. Remember: look at WHY, not WHAT.",
      },
    },
    {
      id: "u1-l5-e11",
      difficulty: 3,
      content: {
        type: "multiple-choice",
        question:
          "Why is honest self-reflection more important than test results when typing?",
        options: [
          "Because tests are always wrong",
          "Because only you have access to your true inner motivations, tests can only measure what you report",
          "Because self-reflection is faster",
          "Because experts don't believe in tests",
        ],
        correctIndex: 1,
        explanation:
          "Tests rely on self-reported behavior, which can be influenced by mood, social desirability, and self-image. Only deep self-reflection can reveal the core motivations that define your type.",
      },
    },
    {
      id: "u1-l5-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "What's the best mindset to bring to discovering your Enneagram type?",
        options: [
          "Pick the type that sounds coolest",
          "Honest curiosity about your deepest patterns",
          "Skepticism that any system could describe you",
          "Let someone else decide for you",
        ],
        correctIndex: 1,
        explanation:
          "Honest curiosity is the perfect starting point. The Enneagram rewards self-honesty, it's not about finding a flattering label, it's about understanding yourself more deeply so you can grow.",
      },
    },
  ],
};

export const unit01Lessons: Lesson[] = [lesson1, lesson2, lesson3, lesson4, lesson5];
