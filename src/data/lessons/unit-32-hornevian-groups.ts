// ─────────────────────────────────────────────────────────────────────────────
// Unit 32. Hornevian Groups
// Based on Karen Horney's "Our Inner Conflicts" (1945) and the Riso-Hudson
// mapping described in "The Wisdom of the Enneagram" (1999).
// 5 lessons × 6 exercises each. xpReward: 15.
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson } from "@/types/lessons";

// ── Lesson 1: Horney's Three Trends ──────────────────────────────────────────

const lesson1: Lesson = {
  id: "u32-l1",
  unitId: "hornevian-groups",
  order: 1,
  title: "Horney's Three Trends",
  subtitle: "Moving toward, against, and away from people",
  xpReward: 15,
  exercises: [
    {
      id: "u32-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Karen Horney's Neurotic Trends",
        body: "In 'Our Inner Conflicts' (1945), Karen Horney identified three broad coping strategies people use to manage interpersonal anxiety: moving toward people (compliance), moving against people (assertion), and moving away from people (withdrawal). Each represents a different answer to the question: 'How do I stay safe in a world I can't control?'",
        highlight: "three neurotic trends",
      },
    },
    {
      id: "u32-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Riso-Hudson's Enneagram Mapping",
        body: "Don Riso and Russ Hudson mapped Horney's three trends onto the Enneagram types in 'The Wisdom of the Enneagram' (1999). Compliant types (1, 2, 6) move toward people. Assertive types (3, 7, 8) move against people. Withdrawn types (4, 5, 9) move away from people. These groupings are sometimes called the Hornevian Groups.",
        highlight: "Hornevian Groups",
      },
    },
    {
      id: "u32-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Karen Horney identified three neurotic coping strategies. Which of the following is NOT one of them?",
        options: [
          "Moving toward people (compliance)",
          "Moving against people (assertion)",
          "Moving beneath people (submission)",
          "Moving away from people (withdrawal)",
        ],
        correctIndex: 2,
        explanation:
          "Horney's three trends are: moving toward people, moving against people, and moving away from people. 'Moving beneath people' is not one of them.",
      },
    },
    {
      id: "u32-l1-e4",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "According to Riso and Hudson's mapping, which set of Enneagram types belongs to the 'assertive' Hornevian group?",
        options: [
          "Types 1, 2, and 6",
          "Types 4, 5, and 9",
          "Types 3, 7, and 8",
          "Types 2, 4, and 7",
        ],
        correctIndex: 2,
        explanation:
          "Riso and Hudson place Types 3, 7, and 8 in the assertive group. These types characteristically move against the world — meeting it with energy, ambition, and forward momentum.",
      },
    },
    {
      id: "u32-l1-e5",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Marcus, a Type 5, has just had a frustrating meeting with his team. Rather than arguing with his colleagues or trying to win people over, he leaves the meeting early and retreats to his office to think through the problem on his own. He tells himself he'll figure out the solution independently and present it later.",
        question: "Which Hornevian coping strategy is Marcus demonstrating?",
        options: [
          "Moving toward people — seeking support and compliance",
          "Moving against people — asserting his position forcefully",
          "Moving away from people — withdrawing to manage the conflict internally",
          "A combination of all three trends simultaneously",
        ],
        correctIndex: 2,
        explanation:
          "Marcus is demonstrating the withdrawal strategy — moving away from people. According to Riso-Hudson, withdrawn types (4, 5, 9) disengage from conflict and retreat into their inner world to manage interpersonal stress.",
      },
    },
    {
      id: "u32-l1-e6",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "Which Hornevian group do Types 1, 2, and 6 belong to?",
        options: [
          "Assertive — they meet the world with energy and push outward",
          "Compliant — they move toward people and seek connection",
          "Withdrawn — they retreat into their inner world",
          "Reactive — they amplify emotional responses to get a response",
        ],
        correctIndex: 1,
        explanation:
          "Types 1, 2, and 6 are the compliant group. Horney described this as 'moving toward people' — seeking connection and security through pleasing, helping, and cooperating.",
      },
    },
  ],
};

// ── Lesson 2: The Compliant Types (1, 2, 6) ───────────────────────────────────

const lesson2: Lesson = {
  id: "u32-l2",
  unitId: "hornevian-groups",
  order: 2,
  title: "The Compliant Types",
  subtitle: "Types 1, 2, and 6: moving toward people",
  xpReward: 15,
  exercises: [
    {
      id: "u32-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Moving Toward People",
        body: "According to Riso and Hudson's application of Horney's framework, compliant types (1, 2, and 6) manage anxiety by moving toward people. They seek approval, connection, and alliance. They suppress their own needs in order to maintain harmony and feel safe within relationships. Conflict feels threatening to the compliant strategy.",
        highlight: "moving toward people",
      },
    },
    {
      id: "u32-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Internalized Conflict",
        body: "Riso and Hudson observe that compliant types tend to internalize conflict rather than express it outwardly. Type 1 turns frustration into self-criticism. Type 2 turns resentment into more helpfulness. Type 6 turns anxiety into hyper-vigilance and loyalty testing. The strategy: if I am good enough, cooperative enough, and helpful enough, I will be safe.",
        highlight: "internalize conflict",
      },
    },
    {
      id: "u32-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What do Types 1, 2, and 6 share as compliant types in Horney's framework?",
        options: [
          "They push outward and assert their needs without apology",
          "They retreat into their imagination when under stress",
          "They move toward people and suppress their own needs to maintain connection",
          "They reframe difficulty as positive to avoid processing pain",
        ],
        correctIndex: 2,
        explanation:
          "Compliant types manage anxiety by moving toward people. This involves suppressing their own needs and desires in order to maintain connection and approval — the core of Horney's compliance strategy.",
      },
    },
    {
      id: "u32-l2-e4",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "A Type 2 who feels deeply unappreciated at work responds by working harder, doing more favors, and being even more generous. This is best described as:",
        options: [
          "Healthy self-assertion in the face of difficulty",
          "A withdrawal response — retreating into helpfulness",
          "The compliant strategy reinforcing itself — internalizing resentment and expressing it as more compliance",
          "The assertive strategy of pushing outward to meet the environment",
        ],
        correctIndex: 2,
        explanation:
          "This is the compliant strategy in action. Rather than expressing the resentment directly (assertive) or withdrawing (withdrawn), the Type 2 intensifies their compliance — a classic pattern Riso and Hudson describe for the compliant group.",
      },
    },
    {
      id: "u32-l2-e5",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Priya is a Type 6. Her boss asks her to take on a project that she privately believes is poorly conceived and likely to fail. Instead of voicing her concern directly, she agrees, then spends the next week seeking reassurance from colleagues, checking in with her boss twice a day, and mentally rehearsing worst-case scenarios.",
        question: "How does Priya's response illustrate the compliant coping strategy?",
        options: [
          "She moves against the situation by working extra hard to make the project succeed",
          "She moves away by emotionally detaching from the outcome",
          "She moves toward people — seeking alliance and reassurance to manage her anxiety rather than expressing disagreement",
          "She reframes the difficulty as an opportunity, minimizing her genuine concern",
        ],
        correctIndex: 2,
        explanation:
          "Priya demonstrates the compliant strategy: instead of asserting her doubts (moving against) or disengaging (withdrawal), she intensifies her relational moves — seeking reassurance, checking in, and building alliances. This is how Type 6 internalizes conflict through the compliant lens.",
      },
    },
    {
      id: "u32-l2-e6",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "Which of the following best distinguishes the compliant group (1, 2, 6) from the withdrawn group (4, 5, 9)?",
        options: [
          "Compliant types seek connection outward; withdrawn types retreat inward",
          "Compliant types are more emotionally expressive than withdrawn types",
          "Compliant types always agree with authority; withdrawn types never do",
          "Compliant types avoid all conflict while withdrawn types confront it directly",
        ],
        correctIndex: 0,
        explanation:
          "The key distinction is directional. Compliant types (1, 2, 6) manage anxiety by moving toward people and seeking relational safety. Withdrawn types (4, 5, 9) manage anxiety by retreating into their inner world, imagination, or solitude.",
      },
    },
  ],
};

// ── Lesson 3: The Assertive Types (3, 7, 8) ───────────────────────────────────

const lesson3: Lesson = {
  id: "u32-l3",
  unitId: "hornevian-groups",
  order: 3,
  title: "The Assertive Types",
  subtitle: "Types 3, 7, and 8: moving against people",
  xpReward: 15,
  exercises: [
    {
      id: "u32-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Moving Against People",
        body: "Riso and Hudson's assertive types (3, 7, and 8) manage anxiety by moving against the world — meeting it with energy, confidence, and forward momentum. Unlike Horney's original 'neurotic' framing, these types aren't necessarily hostile; they simply engage reality head-on. They believe in their own agency and project outward rather than inward.",
        highlight: "moving against the world",
      },
    },
    {
      id: "u32-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Externalized Conflict",
        body: "Assertive types tend to externalize conflict rather than suppress or retreat from it. Type 3 channels conflict into performance — competing and succeeding. Type 7 channels it into forward motion — planning and seeking the next experience. Type 8 channels it into direct confrontation — pushing back and asserting power. The strategy: I will dominate or outrun my circumstances.",
        highlight: "externalize conflict",
      },
    },
    {
      id: "u32-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What characterizes the assertive Hornevian group (Types 3, 7, 8)?",
        options: [
          "They retreat into rich inner worlds when stressed",
          "They seek alliance and approval from others to feel safe",
          "They meet the world with forward energy and externalize conflict",
          "They reframe difficulty positively to maintain good feelings",
        ],
        correctIndex: 2,
        explanation:
          "Assertive types characteristically move against the world — engaging it with energy, confidence, and forward motion. They externalize rather than suppress or retreat from conflict.",
      },
    },
    {
      id: "u32-l3-e4",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "A Type 8 executive is told by the board that her strategy is wrong. She immediately pushes back, presents counter-evidence, and asserts her position confidently. This illustrates:",
        options: [
          "The compliant strategy — seeking alignment with authority",
          "The withdrawn strategy — retreating to reconsider independently",
          "The assertive strategy — meeting the world head-on and externalizing conflict",
          "The positive outlook strategy — reframing the criticism constructively",
        ],
        correctIndex: 2,
        explanation:
          "The Type 8's immediate, confident counter-assertion is a textbook display of the assertive strategy. Rather than capitulating (compliant) or retreating to think it through (withdrawn), she meets the challenge directly.",
      },
    },
    {
      id: "u32-l3-e5",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Jordan is a Type 7. He's just been laid off unexpectedly. Within an hour, he has called three contacts, researched two new business ideas, booked a trip he'd been postponing, and told himself this is actually a great opportunity for something better. He feels energized rather than devastated.",
        question: "How does Jordan's response reflect the assertive Hornevian strategy?",
        options: [
          "He is suppressing his pain to please others around him",
          "He is withdrawing inward to process what happened privately",
          "He is externalizing the difficulty — moving forward into action and possibilities rather than sitting with the loss",
          "He is seeking validation from others to reassure himself he is okay",
        ],
        correctIndex: 2,
        explanation:
          "Jordan is demonstrating the assertive strategy: he meets difficulty by moving outward and forward, generating momentum. This is how Type 7 externalizes conflict — through planning, action, and reframing as opportunity rather than sitting with discomfort.",
      },
    },
    {
      id: "u32-l3-e6",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "Which of the following best distinguishes assertive types (3, 7, 8) from compliant types (1, 2, 6)?",
        options: [
          "Assertive types move outward toward goals and meet conflict directly; compliant types move toward people and suppress needs for connection",
          "Assertive types never feel anxiety; compliant types are constantly anxious",
          "Assertive types are always louder and more extroverted than compliant types",
          "Assertive types avoid relationships; compliant types are relationship-focused",
        ],
        correctIndex: 0,
        explanation:
          "The core distinction: assertive types manage anxiety by moving against the world — engaging it through action, assertion, and forward momentum. Compliant types manage anxiety by moving toward people — seeking alliance and suppressing their own needs.",
      },
    },
  ],
};

// ── Lesson 4: The Withdrawn Types (4, 5, 9) ───────────────────────────────────

const lesson4: Lesson = {
  id: "u32-l4",
  unitId: "hornevian-groups",
  order: 4,
  title: "The Withdrawn Types",
  subtitle: "Types 4, 5, and 9: moving away from people",
  xpReward: 15,
  exercises: [
    {
      id: "u32-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Moving Away From People",
        body: "Riso and Hudson's withdrawn types (4, 5, and 9) manage anxiety by moving away from people — retreating into their inner worlds of imagination, analysis, or inertia. This is not the same as shyness or introversion (though those may coexist). It's a coping strategy: when the outer world becomes overwhelming, they disengage and go inward.",
        highlight: "moving away from people",
      },
    },
    {
      id: "u32-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Three Flavors of Withdrawal",
        body: "Each withdrawn type retreats differently. Type 4 retreats into emotion, imagination, and longing — searching for a sense of unique identity. Type 5 retreats into the mind — analyzing, observing, and hoarding knowledge. Type 9 retreats into merger and routine — numbing the self and going on autopilot. All three disengage from conflict rather than meeting it directly.",
        highlight: "disengage from conflict",
      },
    },
    {
      id: "u32-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What do Types 4, 5, and 9 share as the withdrawn Hornevian group?",
        options: [
          "They suppress their needs to maintain approval from others",
          "They move outward and meet difficulty with forward energy",
          "They retreat into their inner worlds to manage interpersonal stress",
          "They amplify emotional reactions to get a response from others",
        ],
        correctIndex: 2,
        explanation:
          "Withdrawn types (4, 5, 9) manage anxiety by disengaging — retreating into imagination, analysis, or routine rather than moving toward or against the world.",
      },
    },
    {
      id: "u32-l4-e4",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "How does a Type 9's withdrawal typically differ from a Type 5's withdrawal?",
        options: [
          "Type 9 withdraws into analytical thinking; Type 5 withdraws into emotional sensitivity",
          "Type 9 withdraws into routine and merger — losing themselves in comfort; Type 5 withdraws into the mind and independent thinking",
          "Type 9 withdraws aggressively; Type 5 withdraws passively",
          "There is no meaningful difference — both types withdraw identically",
        ],
        correctIndex: 1,
        explanation:
          "While both are withdrawn types, their retreats differ. Type 9 tends to merge with comfort, routine, and others' agendas — losing a sense of self. Type 5 retreats into mental autonomy, seeking to think things through independently with enough knowledge to feel competent.",
      },
    },
    {
      id: "u32-l4-e5",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Camille is a Type 4 artist. After a painful argument with her partner, she doesn't call a friend or confront her partner again. Instead, she spends the evening alone writing in her journal, listening to music that matches her mood, and imagining what she would have said if she had spoken her truth. By midnight she feels both deeply sad and strangely more herself.",
        question: "How does Camille's response reflect the withdrawn coping strategy?",
        options: [
          "She is moving toward people — seeking emotional connection through her writing and music",
          "She is moving against the situation by imagining a stronger version of herself",
          "She is moving away — retreating into her emotional and imaginative inner world to process the conflict",
          "She is using the positive outlook strategy to reframe the pain as meaningful",
        ],
        correctIndex: 2,
        explanation:
          "Camille demonstrates the withdrawn strategy: rather than confronting or seeking support, she retreats inward — into emotion, imagination, and self-reflection. This is the characteristic Type 4 form of withdrawal: finding meaning and identity in the feeling itself.",
      },
    },
    {
      id: "u32-l4-e6",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "Which of these correctly pairs a withdrawn type with its characteristic inner retreat?",
        options: [
          "Type 4 → analysis and logical frameworks; Type 5 → emotional depth and longing",
          "Type 9 → aggressive confrontation; Type 4 → numbing through routine",
          "Type 4 → emotional imagination and longing; Type 5 → mental analysis and knowledge; Type 9 → routine and self-forgetting",
          "All three withdrawn types retreat in exactly the same way",
        ],
        correctIndex: 2,
        explanation:
          "Each withdrawn type retreats differently: Type 4 into emotional depth and identity-seeking, Type 5 into intellectual analysis and observation, Type 9 into routine, comfort, and the numbing of the self.",
      },
    },
  ],
};

// ── Lesson 5: When Your Strategy Backfires ────────────────────────────────────

const lesson5: Lesson = {
  id: "u32-l5",
  unitId: "hornevian-groups",
  order: 5,
  title: "When Your Strategy Backfires",
  subtitle: "How each coping group creates the problem it fears most",
  xpReward: 15,
  exercises: [
    {
      id: "u32-l5-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Paradox of Coping",
        body: "Horney observed that neurotic coping strategies are self-defeating: each strategy creates the very condition it was designed to prevent. The compliant type's suppression of needs breeds resentment, damaging the connection they crave. The assertive type's constant forward push can exhaust relationships and leave them feeling empty. The withdrawn type's retreat prevents the intimacy they secretly long for.",
        highlight: "self-defeating",
      },
    },
    {
      id: "u32-l5-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Shadow of Each Strategy",
        body: "Riso and Hudson elaborate on this in the Levels of Development: at lower levels, each type's coping strategy intensifies and produces its opposite. The compliant Type 2 becomes manipulative — the helper who demands gratitude. The assertive Type 8 becomes tyrannical — the protector who domineers. The withdrawn Type 5 becomes isolated — the observer who loses all contact with others.",
        highlight: "intensifies and produces its opposite",
      },
    },
    {
      id: "u32-l5-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "According to Horney's framework, what happens when a coping strategy is overused under stress?",
        options: [
          "It becomes more effective over time through practice",
          "It creates the very condition it was trying to prevent",
          "It transforms smoothly into one of the other two strategies",
          "It has no effect — coping strategies are neutral",
        ],
        correctIndex: 1,
        explanation:
          "Horney argued that neurotic coping strategies are paradoxically self-defeating. When overused, they amplify and produce the opposite of their intended effect — the very problem they were meant to solve.",
      },
    },
    {
      id: "u32-l5-e4",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "A Type 6 increasingly tests the loyalty of their closest friends, interrogates their motives, and demands constant reassurance. Over time, friends pull away. The Type 6 becomes more anxious. This illustrates:",
        options: [
          "The assertive strategy working effectively under stress",
          "The compliant strategy backfiring — the effort to secure connection drives it away",
          "A successful withdrawal that protects the Type 6 from betrayal",
          "The positive outlook group maintaining optimism",
        ],
        correctIndex: 1,
        explanation:
          "This is the compliant strategy's shadow. Type 6 moves toward people to feel safe, but the intensity of loyalty-testing pushes people away — creating the very insecurity and disconnection the strategy was meant to prevent.",
      },
    },
    {
      id: "u32-l5-e5",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Derek is a Type 5. He has spent years building a private world of books, research, and solitary projects because he feels overwhelmed by people's demands on his energy. Now, at 42, he realizes he has almost no close relationships. His extensive knowledge feels meaningless without anyone to share it with. He wants connection but doesn't know how to re-enter the social world.",
        question: "What does Derek's situation illustrate about the withdrawn coping strategy?",
        options: [
          "Withdrawal successfully protected Derek from all harm",
          "The withdrawn strategy backfired — the retreat meant to preserve his resources has cost him the connection that would make those resources meaningful",
          "Derek should have used the assertive strategy instead",
          "Derek's isolation is unrelated to his Hornevian group — it is purely a personal choice",
        ],
        correctIndex: 1,
        explanation:
          "Derek's situation is the shadow side of the withdrawal strategy. Type 5 retreats to protect energy and autonomy, but the strategy, when overused, produces profound isolation — the loss of the very connection and belonging that might have made life rich.",
      },
    },
    {
      id: "u32-l5-e6",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "Which of the following best describes the growth opportunity for all three Hornevian groups?",
        options: [
          "Each group should learn to use all three strategies interchangeably",
          "Compliant types should become assertive; assertive types should become withdrawn",
          "Each group's growth involves recognizing when its strategy is running automatically and creating space to choose a different response",
          "The withdrawn strategy is healthiest; all types should move toward it",
        ],
        correctIndex: 2,
        explanation:
          "Growth within Horney's framework is not about switching strategies wholesale, but about developing awareness of when the automatic coping response is running — and having enough internal freedom to choose something different. This is consistent with Riso-Hudson's Levels of Development approach.",
      },
    },
  ],
};

// ── Export ────────────────────────────────────────────────────────────────────

export const unit32Lessons: Lesson[] = [
  lesson1,
  lesson2,
  lesson3,
  lesson4,
  lesson5,
];
