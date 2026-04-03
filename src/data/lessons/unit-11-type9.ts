// ─────────────────────────────────────────────────────────────────────────────
// Unit 11, Type 9: The Peacemaker
// 4 lessons × 12 exercises each
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson } from "@/types/lessons";

// ── Lesson 1: Core Motivation, Fear & Desire ────────────────────────────────

const lesson1: Lesson = {
  id: "u11-l1",
  unitId: "type-9",
  order: 1,
  title: "The Peacemaker's Core",
  subtitle: "Who is Type 9? Motivation, fear, and desire",
  xpReward: 20,
  exercises: [
    {
      id: "u11-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Meet the Peacemaker",
        body: "Type 9 is driven by a deep need for inner peace, harmony, and stability. They are the most accepting and easygoing of all types, but this comes at a cost: they often 'fall asleep' to their own desires, anger, and priorities in order to maintain peace.",
        highlight: "inner peace",
      },
    },
    {
      id: "u11-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Core Fear",
        body: "Nines fear loss, separation, conflict, and fragmentation. At the deepest level, they fear that asserting themselves will cause disconnection from people they love, so they erase their own needs to stay connected.",
        highlight: "loss and separation",
      },
    },
    {
      id: "u11-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core desire of Type 9?",
        options: [
          "To be successful and admired",
          "To be unique and emotionally deep",
          "To have inner stability and peace of mind",
          "To be powerful and in control",
        ],
        correctIndex: 2,
        explanation:
          "Nines desire inner stability and peace of mind above all. Their entire strategy, merging, accommodating, avoiding conflict, is built to preserve this sense of inner calm.",
      },
    },
    {
      id: "u11-l1-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core fear of Type 9?",
        options: [
          "Being trapped in pain or boredom",
          "Loss, separation, conflict, and fragmentation",
          "Being without support or guidance",
          "Being controlled by others",
        ],
        correctIndex: 1,
        explanation:
          "Nines' deepest fear is that conflict or self-assertion will break their connections and destroy the harmony they need to feel whole.",
      },
    },
    {
      id: "u11-l1-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "What does 'merging' mean for a Nine?",
        options: [
          "Combining two ideas into one",
          "Losing their own preferences by adopting others' agendas and priorities",
          "Being assertive about what they want",
          "Intellectually analyzing other perspectives",
        ],
        correctIndex: 1,
        explanation:
          "Merging is the Nine's signature pattern: they absorb other people's preferences, opinions, and priorities so completely that they lose track of their own.",
      },
    },
    {
      id: "u11-l1-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each Type 9 trait to its description.",
        pairs: [
          { left: "Merging", right: "Absorbing others' agendas as your own" },
          { left: "Numbing out", right: "Tuning out of one's own feelings and needs" },
          { left: "Stubbornness", right: "Passive resistance when pushed too hard" },
          { left: "Peacemaking", right: "Smoothing conflict to maintain harmony" },
          { left: "Self-forgetting", right: "Losing track of personal desires and priorities" },
        ],
      },
    },
    {
      id: "u11-l1-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Nines avoid conflict not out of weakness, but because they genuinely fear that asserting themselves will cause ___ in their relationships.",
        options: ["admiration", "separation", "excitement", "growth"],
        correctIndex: 1,
        explanation:
          "The Nine's conflict avoidance isn't cowardice, it's driven by a deep fear that standing up for themselves will push people away and break the bonds they depend on for wholeness.",
      },
    },
    {
      id: "u11-l1-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "When asked 'What do YOU want?', many Nines genuinely struggle to answer because they've spent so long ___ with others' preferences.",
        options: ["arguing", "competing", "merging", "analyzing"],
        correctIndex: 2,
        explanation:
          "Nines merge so deeply with others that they genuinely lose track of their own desires. 'What do you want for dinner?' can feel like an existential question.",
      },
    },
    {
      id: "u11-l1-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Lee's partner asks where they want to eat. Lee says, 'I'm fine with whatever you want.' The partner pushes: 'But what do YOU want?' Lee pauses and genuinely cannot come up with an answer. They're not being polite, they actually don't know.",
        question: "Which Nine pattern is Lee demonstrating?",
        options: [
          "Deliberate people-pleasing to gain approval",
          "Self-forgetting, they've merged so deeply with others that they've lost access to their own preferences",
          "Strategic ambiguity to avoid commitment",
          "Intellectual detachment from bodily needs",
        ],
        correctIndex: 1,
        explanation:
          "Lee isn't being polite or strategic, they genuinely don't know what they want. This is Nine's self-forgetting: years of merging have made their own desires invisible to them.",
      },
    },
    {
      id: "u11-l1-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Quinn's roommate keeps leaving dishes in the sink. Quinn says nothing for weeks, then months. Friends tell Quinn to say something, but Quinn insists 'it's not a big deal' and 'I don't want to make it weird.' Eventually Quinn moves out without ever mentioning it, telling the roommate a different reason.",
        question: "What Nine dynamic is at play?",
        options: [
          "Healthy conflict resolution",
          "Conflict avoidance driven by fear of separation, suppressing their own needs to maintain peace",
          "Genuine indifference to the dishes",
          "Strategic manipulation to control the living situation",
        ],
        correctIndex: 1,
        explanation:
          "Quinn would rather move out than have an uncomfortable conversation. This is the Nine pattern: the cost of speaking up (potential conflict) feels greater than the cost of abandoning their own needs.",
      },
    },
    {
      id: "u11-l1-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "At work, Jamie's manager asks who wants to lead the new project. Jamie has a great idea and the skills to lead, but stays silent. A less qualified colleague volunteers and gets the role. Jamie feels a dull ache but tells themselves, 'It doesn't matter. I'm happy to support.'",
        question: "What core Nine pattern explains Jamie's behavior?",
        options: [
          "Strategic patience, waiting for a better opportunity",
          "Narcissism, they secretly want to be asked",
          "Self-erasure, suppressing their own ambitions to avoid the discomfort of standing out",
          "Genuine lack of interest in leading",
        ],
        correctIndex: 2,
        explanation:
          "Jamie is performing the Nine's signature move: erasing their own desires to avoid standing out, competing, or potentially disrupting the group dynamic. The 'dull ache' is their buried anger.",
      },
    },
    {
      id: "u11-l1-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "Type 9 is also called 'The Mediator.' Why?",
        options: [
          "They enjoy legal mediation as a career",
          "They naturally see all perspectives and smooth over conflict between others",
          "They meditate frequently",
          "They always take sides in conflicts",
        ],
        correctIndex: 1,
        explanation:
          "Nines can genuinely see every perspective in a conflict. This makes them natural mediators, but it also makes it hard for them to hold their OWN position.",
      },
    },
  ],
};

// ── Lesson 2: Passion & Virtue + Health Levels ──────────────────────────────

const lesson2: Lesson = {
  id: "u11-l2",
  unitId: "type-9",
  order: 2,
  title: "Sloth, Right Action & Health",
  subtitle: "Naranjo's passion, the virtue of right action, and three health levels",
  xpReward: 25,
  exercises: [
    {
      id: "u11-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Passion: Sloth",
        body: "In Naranjo's system, Nine's emotional passion is Sloth, but NOT laziness. Nines can be incredibly hardworking. Sloth here means 'falling asleep' to their own priorities, desires, and anger. It's a self-forgetting: going on autopilot regarding what THEY actually want and need.",
        highlight: "Sloth",
      },
    },
    {
      id: "u11-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Virtue: Right Action",
        body: "The antidote to Sloth is Right Action, engaging with life purposefully, knowing what you want, and pursuing it. For a Nine, this means waking up to their own desires and taking decisive action toward their own goals, not just supporting everyone else's.",
        highlight: "Right Action",
      },
    },
    {
      id: "u11-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What does 'Sloth' mean as the Nine's passion in Naranjo's system?",
        options: [
          "Physical laziness, not wanting to work",
          "Falling asleep to their own desires, anger, and priorities, a self-forgetting",
          "Being unintelligent or slow",
          "Deliberately refusing to participate in life",
        ],
        correctIndex: 1,
        explanation:
          "Naranjo's Sloth is NOT about laziness. Many Nines are extremely hardworking, but they're often working on OTHER people's agendas. The Sloth is about forgetting their own inner life.",
      },
    },
    {
      id: "u11-l2-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the Nine's virtue of Right Action?",
        options: [
          "Always doing the morally correct thing",
          "Engaging with life purposefully and pursuing their own goals and desires",
          "Taking quick, decisive action in emergencies",
          "Following rules and procedures precisely",
        ],
        correctIndex: 1,
        explanation:
          "Right Action for a Nine means waking up from autopilot, knowing what they want, and pursuing it with energy and purpose, not just drifting along supporting others.",
      },
    },
    {
      id: "u11-l2-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "Why is 'Sloth' counterintuitive for Type 9?",
        options: [
          "Because Nines are always the hardest workers",
          "Because people expect Sloth to mean laziness, but Nines can be very busy, they're just asleep to their OWN priorities",
          "Because Sloth usually describes Type 7",
          "Because Nines never rest",
        ],
        correctIndex: 1,
        explanation:
          "A Nine can work 60-hour weeks and still be in Sloth, if that work is all for other people's goals. The Sloth is about neglecting their own inner life, not about lacking energy.",
      },
    },
    {
      id: "u11-l2-e6",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort these Type 9 traits into the correct health level.",
        categories: ["Healthy", "Average", "Unhealthy"],
        items: [
          { text: "Self-possessed, dynamic, and connected", categoryIndex: 0 },
          { text: "Healing presence, serene and grounded", categoryIndex: 0 },
          { text: "Complacent and passive-aggressive", categoryIndex: 1 },
          { text: "Disengaged and stubborn", categoryIndex: 1 },
          { text: "Neglectful and dissociated", categoryIndex: 2 },
          { text: "Helpless and depersonalized", categoryIndex: 2 },
        ],
      },
    },
    {
      id: "u11-l2-e7",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match the health level to its Nine behavior.",
        pairs: [
          { left: "Healthy", right: "Self-possessed, dynamic, engaged with own goals" },
          { left: "Average", right: "Goes along to get along, numbs out with routines" },
          { left: "Unhealthy", right: "Completely dissociated, neglectful, helpless" },
          { left: "Passion (Sloth)", right: "Falling asleep to own desires and anger" },
          { left: "Virtue (Right Action)", right: "Engaging purposefully with own goals" },
        ],
      },
    },
    {
      id: "u11-l2-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "A Nine practicing Right Action learns to ___ their own desires and pursue them, even when it risks disrupting harmony.",
        options: ["suppress", "acknowledge", "forget", "rationalize"],
        correctIndex: 1,
        explanation:
          "Right Action starts with simply noticing 'I want something.' For Nines, this acknowledgment is the revolutionary first step, followed by the even harder step of pursuing it.",
      },
    },
    {
      id: "u11-l2-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Dana works tirelessly at their job, always helping coworkers with their projects, staying late to support the team. But when asked about their own career goals, they go blank. They haven't updated their resume in years. They realize they've been so focused on supporting everyone else that they have no idea what THEY want to do with their career.",
        question: "What Nine passion is Dana caught in?",
        options: [
          "Fear, they're anxious about career change",
          "Sloth, they've fallen asleep to their own professional desires while being busy for others",
          "Vanity, they want to be seen as a team player",
          "Gluttony, they're overcommitting to too many things",
        ],
        correctIndex: 1,
        explanation:
          "Dana embodies Naranjo's Sloth perfectly: they're NOT lazy, they work extremely hard. But all their energy goes toward others' agendas while their own dreams remain unexamined.",
      },
    },
    {
      id: "u11-l2-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "After a wake-up call from a therapist, Pat starts a daily practice of asking themselves, 'What do I actually want today?' At first the question feels impossible. Gradually, small preferences emerge: 'I want Thai food, not pizza.' 'I want to take a walk alone.' Pat starts making choices based on their own desires, even small ones.",
        question: "What shift is Pat experiencing?",
        options: [
          "Moving from Right Action to Sloth",
          "Moving from Sloth toward Right Action, waking up to their own desires",
          "Becoming selfish and losing their Nine gifts",
          "Stress, becoming anxious about making decisions",
        ],
        correctIndex: 1,
        explanation:
          "Pat is discovering Right Action: the revolutionary act of knowing what they want and choosing it. For a Nine, 'I want Thai food' is a small victory against a lifetime of self-erasure.",
      },
    },
    {
      id: "u11-l2-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Taylor used to be a warm, supportive presence who held their friend group together. Over time, they became increasingly checked out: binge-watching TV for hours, ignoring texts, letting bills pile up, and forgetting appointments. When a friend asks if they're okay, Taylor says, 'I'm fine. Everything's fine,' while clearly it isn't.",
        question: "Where is Taylor on the health spectrum?",
        options: [
          "Healthy, they're prioritizing self-care",
          "Average, they're complacent but functional",
          "Unhealthy, the Sloth has deepened into dissociation and neglect",
          "Growing, they're developing independence",
        ],
        correctIndex: 2,
        explanation:
          "Taylor has moved into unhealthy Nine territory: the Sloth has become full dissociation. They're not just forgetting their desires, they're checking out of life entirely.",
      },
    },
    {
      id: "u11-l2-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "Can a Nine be a hard worker and still be in the passion of Sloth?",
        options: [
          "No, Sloth means laziness, so hard workers can't be in Sloth",
          "Yes, they can work very hard on others' agendas while neglecting their own desires and priorities",
          "No, working hard automatically means they've overcome Sloth",
          "Yes, but only if they work in the wrong career",
        ],
        correctIndex: 1,
        explanation:
          "This is the most important thing to understand about Nine's Sloth: it's not about work ethic. A Nine can be exhausted from helping everyone else while being completely asleep to their own needs.",
      },
    },
  ],
};

// ── Lesson 3: Wings, Stress Line & Growth Line ──────────────────────────────

const lesson3: Lesson = {
  id: "u11-l3",
  unitId: "type-9",
  order: 3,
  title: "Wings & Lines",
  subtitle: "9w8 vs 9w1, stress to 6, growth to 3",
  xpReward: 25,
  exercises: [
    {
      id: "u11-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Wings: 9w8 and 9w1",
        body: "9w8 (The Referee) has more gut energy, they're more assertive, earthy, and willing to push back when necessary. 9w1 (The Dreamer) has more idealism, they're more orderly, principled, and drawn to imagining a better world, though they may struggle to act on that vision.",
        highlight: "9w8 vs 9w1",
      },
    },
    {
      id: "u11-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Stress and Growth Lines",
        body: "Under stress, Nines move to the unhealthy side of Type 6: becoming anxious, reactive, and prone to worst-case thinking. In growth, they move to the healthy side of Type 3: becoming energized, self-developing, and action-oriented.",
        highlight: "stress to 6, growth to 3",
      },
    },
    {
      id: "u11-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Where does Type 9 move under stress?",
        options: ["To 3", "To 6", "To 1", "To 5"],
        correctIndex: 1,
        explanation:
          "Under stress, Nines take on unhealthy Six qualities: anxiety, reactivity, worst-case thinking, and suspicious vigilance, a shocking contrast to their usual calm.",
      },
    },
    {
      id: "u11-l3-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Where does Type 9 move in growth?",
        options: ["To 6", "To 1", "To 3", "To 7"],
        correctIndex: 2,
        explanation:
          "In growth, Nines gain healthy Three qualities: they become energized, goal-directed, and willing to develop themselves and pursue their own ambitions.",
      },
    },
    {
      id: "u11-l3-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What distinguishes 9w8 from 9w1?",
        options: [
          "9w8 is more assertive and earthy; 9w1 is more idealistic and orderly",
          "9w8 is more withdrawn; 9w1 is more outgoing",
          "9w8 is unhealthy; 9w1 is healthy",
          "There is no meaningful difference",
        ],
        correctIndex: 0,
        explanation:
          "The Eight wing gives Nines more gut energy, assertiveness, and earthiness. The One wing gives them more idealism, structure, and a sense of right and wrong.",
      },
    },
    {
      id: "u11-l3-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each wing or line to its description.",
        pairs: [
          { left: "9w8, The Referee", right: "More assertive, earthy, willing to push back" },
          { left: "9w1, The Dreamer", right: "More idealistic, orderly, principled" },
          { left: "Stress to 6", right: "Becomes anxious, reactive, worst-case thinking" },
          { left: "Growth to 3", right: "Becomes energized, goal-oriented, self-developing" },
        ],
      },
    },
    {
      id: "u11-l3-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "When a usually calm Nine suddenly becomes anxious, suspicious, and prone to catastrophizing, they are likely moving to their ___ point at Type 6.",
        options: ["growth", "wing", "stress", "integration"],
        correctIndex: 2,
        explanation:
          "Anxiety and worst-case thinking in a normally peaceful Nine signals their stress move to 6. It's often the first sign that a Nine is overwhelmed.",
      },
    },
    {
      id: "u11-l3-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "A growing Nine develops the ability to set ___ and pursue them with the energy and focus of a healthy Three.",
        options: ["boundaries", "goals", "records", "standards"],
        correctIndex: 1,
        explanation:
          "The growth move to 3 gives Nines something transformative: the ability to identify their own goals and pursue them with energy. This is the antidote to their self-forgetting pattern.",
      },
    },
    {
      id: "u11-l3-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Usually chill and unbothered, Alex has been under pressure from a family conflict. Now they can't sleep, keep imagining worst-case outcomes, and start questioning whether their friends are really reliable. Their partner says, 'You're not acting like yourself at all.'",
        question: "What is happening to Alex?",
        options: [
          "Alex is growing into a healthier version of themselves",
          "Alex is moving to their stress point at Type 6, becoming anxious and suspicious",
          "Alex has always been a Six, not a Nine",
          "Alex is expressing their 9w1 wing more strongly",
        ],
        correctIndex: 1,
        explanation:
          "Alex is in their stress line to Type 6. Under prolonged pressure, Nines can suddenly become anxious, vigilant, and suspicious, the opposite of their usual trusting calm.",
      },
    },
    {
      id: "u11-l3-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "After years of going with the flow, Morgan signs up for a marathon, creates a training schedule, and sticks to it. They start saying 'no' to social obligations that conflict with training. Friends are surprised, Morgan has never been this focused on a personal goal before.",
        question: "What growth line is Morgan accessing?",
        options: [
          "Stress to 6, becoming anxious about fitness",
          "Growth to 3, becoming goal-oriented, energized, and self-developing",
          "Wing shift to 9w8, becoming more assertive",
          "Losing their Nine nature, becoming too competitive",
        ],
        correctIndex: 1,
        explanation:
          "Morgan is moving into healthy Three territory: setting a personal goal, developing discipline, and prioritizing their own development. This is Nine growth in action.",
      },
    },
    {
      id: "u11-l3-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these behaviors by whether they belong to 9w8 or 9w1.",
        categories: ["9w8, The Referee", "9w1, The Dreamer"],
        items: [
          { text: "Can be surprisingly assertive when pushed", categoryIndex: 0 },
          { text: "Drawn to idealistic visions of how things should be", categoryIndex: 1 },
          { text: "More earthy, physical, grounded presence", categoryIndex: 0 },
          { text: "More orderly, structured in daily habits", categoryIndex: 1 },
          { text: "Will push back firmly when a line is crossed", categoryIndex: 0 },
          { text: "Has a quiet inner critic about right and wrong", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u11-l3-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "When a normally peaceful Nine becomes anxious and suspicious, this is a sign of:",
        options: [
          "Healthy growth",
          "Natural Nine behavior",
          "Stress, moving to the anxious side of Type 6",
          "A mistype, they're actually a Type 6",
        ],
        correctIndex: 2,
        explanation:
          "Anxiety and suspicion in a usually calm Nine is their stress signal. They're unconsciously adopting unhealthy Type 6 patterns of vigilance and worst-case thinking.",
      },
    },
  ],
};

// ── Lesson 4: Spotting This Type + Common Mistypes ──────────────────────────

const lesson4: Lesson = {
  id: "u11-l4",
  unitId: "type-9",
  order: 4,
  title: "Recognizing the Peacemaker",
  subtitle: "Spotting Type 9 in the wild and avoiding common mistypes",
  xpReward: 25,
  exercises: [
    {
      id: "u11-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Spotting a Nine",
        body: "Nines are often the calmest person in the room. They deflect questions about their own preferences, agree easily, and have a soothing presence. Watch for the person who says 'I'm fine with whatever' most often, and seems to genuinely mean it.",
        highlight: "I'm fine with whatever",
      },
    },
    {
      id: "u11-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Common Mistypes",
        body: "Nines are most confused with Type 5 (both withdrawn, but 5s are actively thinking and analyzing, while 9s are numbing out) and Type 2 (both accommodating, but 2s give to feel needed, while 9s merge passively to avoid conflict).",
        highlight: "Type 5 and Type 2",
      },
    },
    {
      id: "u11-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "Which behavior is MOST characteristic of a Nine?",
        options: [
          "Taking charge of group decisions",
          "Deferring to others and going along with the group's preference",
          "Obsessively analyzing every option",
          "Performing for an audience",
        ],
        correctIndex: 1,
        explanation:
          "Nines naturally defer. They're the last to state a preference and the first to say 'I don't mind', not because they're weak, but because maintaining harmony feels more important than personal preferences.",
      },
    },
    {
      id: "u11-l4-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "How do you tell a withdrawn Nine from a withdrawn Type 5?",
        options: [
          "Nines are smarter than Fives",
          "Fives withdraw to actively think and analyze; Nines withdraw to numb out and avoid",
          "Fives are more social than Nines",
          "There is no meaningful difference",
        ],
        correctIndex: 1,
        explanation:
          "Both types can look withdrawn, but for completely different reasons. A Five's mind is racing with analysis; a Nine's mind is going quiet, tuning out rather than tuning in.",
      },
    },
    {
      id: "u11-l4-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "How does a Nine's anger typically manifest?",
        options: [
          "Explosive rage directed at specific people",
          "Passive-aggressive stubbornness and quiet resistance",
          "Analytical criticism of others' logic",
          "Dramatic emotional outbursts",
        ],
        correctIndex: 1,
        explanation:
          "Nines rarely express anger directly. Instead, it leaks out as passive-aggression: procrastination, stubbornness, 'forgetting' to do things, and quiet resistance that others find maddening.",
      },
    },
    {
      id: "u11-l4-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction:
          "Match the behavior to the correct type, Nine or its common mistype.",
        pairs: [
          { left: "Withdraws to numb out and avoid discomfort", right: "Type 9" },
          { left: "Withdraws to analyze and think deeply", right: "Type 5" },
          { left: "Accommodates others to avoid conflict", right: "Type 9" },
          { left: "Accommodates others to feel needed and loved", right: "Type 2" },
        ],
      },
    },
    {
      id: "u11-l4-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Both Nines and Twos are accommodating, but the key difference is that Nines merge ___ while Twos give actively to feel needed.",
        options: ["aggressively", "passively", "intellectually", "competitively"],
        correctIndex: 1,
        explanation:
          "Nines accommodate by passively absorbing others' agendas. Twos accommodate by actively doing things for people. The Nine disappears; the Two inserts themselves.",
      },
    },
    {
      id: "u11-l4-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "A Nine's stubbornness is often surprising because it seems to contradict their easygoing nature, but it's actually their ___ leaking out indirectly.",
        options: ["ambition", "creativity", "buried anger", "intelligence"],
        correctIndex: 2,
        explanation:
          "Nine's stubbornness is their suppressed anger finding an outlet. Since they won't express anger directly, it emerges as immovable passive resistance.",
      },
    },
    {
      id: "u11-l4-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Two coworkers both seem quiet and reserved. One spends their lunch break reading dense research papers, takes meticulous notes in meetings, and asks probing analytical questions. The other spends lunch scrolling their phone, agrees with whatever is discussed in meetings, and when asked for their opinion says, 'Yeah, I think everyone's made good points.'",
        question: "Which coworker is more likely a Nine?",
        options: [
          "The first, their quietness signals Nine energy",
          "The second, they're checked out, merging with the group, and avoiding having a position",
          "Both are Nines with different wings",
          "Neither is a Nine",
        ],
        correctIndex: 1,
        explanation:
          "The first coworker is likely a Five (actively analytical, probing). The second is more Nine: disengaged, merging with others' views, and avoiding the assertiveness of having their own position.",
      },
    },
    {
      id: "u11-l4-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "At a party, one guest quietly makes sure everyone's glass is full, asks people how they're feeling, and checks in on the shy person in the corner. Another guest sits comfortably on the couch, laughs at everyone's jokes, and seems perfectly content without initiating any conversation or activity.",
        question: "Who is the Nine?",
        options: [
          "The first guest, their quiet care signals Nine",
          "The second guest, they're passively comfortable without needing to DO anything or be needed",
          "Both are Nines",
          "Neither is a Nine",
        ],
        correctIndex: 1,
        explanation:
          "The first guest is more likely a Two (actively caring for others' feelings). The second guest shows Nine energy: contentedly blending into the environment without needing to act, give, or stand out.",
      },
    },
    {
      id: "u11-l4-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Your friend group is debating where to go on vacation. After 30 minutes of discussion, someone asks Sam for their vote. Sam says, 'Honestly, I'm happy with all three options. They all sound great.' Later, in the car, Sam's partner says, 'You wanted the beach trip. I saw your face light up when it was mentioned. Why didn't you say so?' Sam shrugs: 'It didn't matter that much.'",
        question: "What makes this classic Nine behavior?",
        options: [
          "Sam is being strategically diplomatic (Type 3)",
          "Sam is gathering information before deciding (Type 5)",
          "Sam is genuinely unable to prioritize their own desire over group harmony, self-forgetting in action (Type 9)",
          "Sam doesn't actually care about the vacation (disinterest)",
        ],
        correctIndex: 2,
        explanation:
          "Sam DID have a preference, the beach. But Nine's self-forgetting is so automatic that they couldn't advocate for it. The desire registered ('their face lit up') but was immediately suppressed.",
      },
    },
    {
      id: "u11-l4-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "What's the BEST single clue that someone might be a Type 9?",
        options: [
          "They are always generating new ideas",
          "They consistently deflect questions about what THEY want and go along with others",
          "They are intensely focused on achieving goals",
          "They question everything before trusting",
        ],
        correctIndex: 1,
        explanation:
          "The most reliable Nine signal is the consistent inability (or unwillingness) to state their own preference. 'I'm fine with whatever you want' is the Nine's catchphrase, and they usually believe it themselves.",
      },
    },
  ],
};

export const unit11Lessons: Lesson[] = [lesson1, lesson2, lesson3, lesson4];
