// ─────────────────────────────────────────────────────────────────────────────
// Unit 13: What Are Cognitive Functions?
// 5 lessons teaching cognitive functions from absolute zero.
// No prior knowledge of Jung assumed.
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson } from "@/types/lessons";

// ── Lesson 1: Two Kinds of Brain Work ───────────────────────────────────────

const lesson1: Lesson = {
  id: "u13-l1",
  unitId: "what-are-cognitive-functions",
  order: 1,
  title: "Two Kinds of Brain Work",
  subtitle: "Perceiving and judging, the two things your brain does",
  exercises: [
    {
      id: "u13-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Your Brain Does Two Things",
        body: "At the most basic level, your brain does two kinds of work: it takes in information (called Perceiving) and it makes decisions (called Judging). Everything you think and do falls into one of these two categories.",
        highlight: "Perceiving and Judging",
      },
    },
    {
      id: "u13-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Perceiving = Taking In",
        body: "Perceiving is about gathering information, noticing what's around you, sensing patterns, remembering details, imagining possibilities. It's the 'input' side of your brain. You're perceiving right now as you read these words.",
        highlight: "Perceiving",
      },
    },
    {
      id: "u13-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which of these is an example of Perceiving (taking in information)?",
        options: [
          "Noticing the smell of coffee when you walk into a cafe",
          "Deciding whether to order a latte or a cappuccino",
          "Telling your friend which cafe is best",
          "Setting a budget for your coffee habit",
        ],
        correctIndex: 0,
        explanation: "Smelling the coffee is pure information-gathering, your brain is taking in sensory data. That's Perceiving! The other options involve making decisions (Judging).",
      },
    },
    {
      id: "u13-l1-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which of these is an example of Judging (making a decision)?",
        options: [
          "Hearing a song on the radio",
          "Noticing it's raining outside",
          "Deciding to bring an umbrella",
          "Remembering yesterday's weather",
        ],
        correctIndex: 2,
        explanation: "Deciding to bring an umbrella is a judgment call, you're evaluating information and making a decision. The others are all forms of Perceiving (taking in information).",
      },
    },
    {
      id: "u13-l1-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "In cognitive function theory, 'Judging' means:",
        options: [
          "Being judgmental or critical of others",
          "Making decisions and evaluations",
          "Going to court",
          "Being organized and punctual",
        ],
        correctIndex: 1,
        explanation: "'Judging' in this context has nothing to do with being judgmental! It simply means the brain's ability to evaluate information and reach conclusions. Everyone does it.",
      },
    },
    {
      id: "u13-l1-e6",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort each activity into Perceiving (taking in info) or Judging (making decisions):",
        categories: ["Perceiving", "Judging"],
        items: [
          { text: "Noticing a friend looks upset", categoryIndex: 0 },
          { text: "Deciding to ask if they're okay", categoryIndex: 1 },
          { text: "Reading a restaurant menu", categoryIndex: 0 },
          { text: "Choosing what to order", categoryIndex: 1 },
          { text: "Hearing thunder in the distance", categoryIndex: 0 },
          { text: "Concluding that a plan won't work", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u13-l1-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Perceiving is the 'input' side of your brain, while Judging is the '___' side.",
        options: ["decision-making", "sleeping", "forgetting", "physical"],
        correctIndex: 0,
        explanation: "Perceiving = input (gathering information). Judging = decision-making (evaluating that information and reaching conclusions). Together, they cover everything your mind does.",
      },
    },
    {
      id: "u13-l1-e8",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each example to Perceiving or Judging:",
        pairs: [
          { left: "Spotting a 'Help Wanted' sign", right: "Perceiving" },
          { left: "Deciding to apply for the job", right: "Judging" },
          { left: "Imagining what the job would be like", right: "Perceiving" },
          { left: "Evaluating if the salary is fair", right: "Judging" },
        ],
      },
    },
    {
      id: "u13-l1-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "You're walking through a farmers market. You notice the bright colors of the produce, smell fresh bread, and spot an interesting spice you've never seen before. Then you think: 'That bread is overpriced, but those tomatoes look worth it. I'll skip the spice, I wouldn't know how to use it.'",
        question: "Where did your brain switch from Perceiving to Judging?",
        options: [
          "It was all Perceiving the whole time",
          "It was all Judging the whole time",
          "Perceiving: noticing colors, smells, the spice. Judging: evaluating price, deciding what to buy",
          "The switch happened when you entered the market",
        ],
        correctIndex: 2,
        explanation: "First your brain was gathering information (Perceiving): colors, smells, new things. Then it shifted to evaluating and deciding (Judging): 'overpriced,' 'worth it,' 'I'll skip.' This back-and-forth happens constantly!",
      },
    },
    {
      id: "u13-l1-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two friends are apartment hunting. Alex walks in and immediately says, 'The layout is weird and the kitchen is too small, pass.' Jordan walks in and spends ten minutes examining every detail, opening cabinets, testing faucets, and checking the light in each room before saying anything.",
        question: "What's the difference in their approach?",
        options: [
          "Alex is smarter than Jordan",
          "Alex jumped quickly to Judging, while Jordan spent more time in Perceiving mode first",
          "Jordan is indecisive and Alex is decisive",
          "There's no cognitive difference, they just have different taste",
        ],
        correctIndex: 1,
        explanation: "Alex moved quickly from Perceiving to Judging (quick intake, fast verdict). Jordan stayed in Perceiving mode much longer (thorough information gathering). Neither approach is better, they just have different preferences for how long to gather info before deciding.",
      },
    },
    {
      id: "u13-l1-e11",
      difficulty: 3,
      content: {
        type: "multiple-choice",
        question: "Why are Perceiving and Judging called 'cognitive functions'?",
        options: [
          "Because they only happen during tests",
          "Because they're the fundamental operations of the mind, how your brain functions",
          "Because Carl Jung made up the terms randomly",
          "Because they only work when you're concentrating",
        ],
        correctIndex: 1,
        explanation: "They're called 'cognitive functions' because they are the basic functions (operations) of cognition (thinking). Your brain is always either taking in information or making decisions, these are its core jobs.",
      },
    },
    {
      id: "u13-l1-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "The two fundamental categories of cognitive functions are:",
        options: [
          "Perceiving (taking in info) and Judging (making decisions)",
          "Thinking and Feeling",
          "Left brain and Right brain",
          "Conscious and Unconscious",
        ],
        correctIndex: 0,
        explanation: "Perceiving and Judging, that's the foundation! Every cognitive function is either a way of taking in information or a way of making decisions. Simple as that.",
      },
    },
  ],
  xpReward: 20,
};

// ── Lesson 2: Four Ways to See the World (Perceiving Functions) ─────────────

const lesson2: Lesson = {
  id: "u13-l2",
  unitId: "what-are-cognitive-functions",
  order: 2,
  title: "Four Ways to See the World",
  subtitle: "The four perceiving functions",
  exercises: [
    {
      id: "u13-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Not All Perceiving Is the Same",
        body: "Remember Perceiving, taking in information? It turns out there are FOUR different ways your brain can do this. Each one gathers information in a completely different style. Think of them as four different camera lenses on the same world.",
        highlight: "four different ways",
      },
    },
    {
      id: "u13-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Meet the Four Perceiving Functions",
        body: "Se (Extraverted Sensing): lives in the present moment, tuned into physical reality. Si (Introverted Sensing): detailed memory, compares now to the past. Ne (Extraverted Intuition): sees possibilities and connections everywhere. Ni (Introverted Intuition): deep pattern recognition, a sense of 'just knowing.'",
        highlight: "Se, Si, Ne, Ni",
      },
    },
    {
      id: "u13-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which perceiving function is about being fully present in the moment, noticing sights, sounds, and textures right NOW?",
        options: [
          "Se (Extraverted Sensing)",
          "Si (Introverted Sensing)",
          "Ne (Extraverted Intuition)",
          "Ni (Introverted Intuition)",
        ],
        correctIndex: 0,
        explanation: "Se is all about the present moment and physical reality. Someone strong in Se notices what's happening right now with vivid sensory clarity, the taste of food, the feel of the breeze, the energy in a room.",
      },
    },
    {
      id: "u13-l2-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which perceiving function is about detailed memory, comparing the present to past experiences?",
        options: [
          "Se (Extraverted Sensing)",
          "Si (Introverted Sensing)",
          "Ne (Extraverted Intuition)",
          "Ni (Introverted Intuition)",
        ],
        correctIndex: 1,
        explanation: "Si stores detailed impressions from the past and constantly compares them to the present. 'This tastes just like grandma's recipe' or 'Last time we tried this, it didn't work', that's Si in action.",
      },
    },
    {
      id: "u13-l2-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which perceiving function sees possibilities, connections, and 'what if' ideas everywhere?",
        options: [
          "Se (Extraverted Sensing)",
          "Si (Introverted Sensing)",
          "Ne (Extraverted Intuition)",
          "Ni (Introverted Intuition)",
        ],
        correctIndex: 2,
        explanation: "Ne is the brainstormer, it sees connections between seemingly unrelated things and generates a flood of possibilities. 'What if we combined these two ideas?' or 'That reminds me of five other things!', that's Ne.",
      },
    },
    {
      id: "u13-l2-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each perceiving function to its description:",
        pairs: [
          { left: "Se", right: "Present-moment sensory awareness" },
          { left: "Si", right: "Detailed memory, comparing now to past" },
          { left: "Ne", right: "Brainstorming possibilities and connections" },
          { left: "Ni", right: "Deep pattern recognition and 'just knowing'" },
        ],
      },
    },
    {
      id: "u13-l2-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Someone who says 'I just have a gut feeling about how this will turn out' is likely using ___.",
        options: ["Ni (Introverted Intuition)", "Se (Extraverted Sensing)", "Si (Introverted Sensing)", "Ne (Extraverted Intuition)"],
        correctIndex: 0,
        explanation: "Ni is the 'just knowing' function, it synthesizes patterns unconsciously and delivers insights as gut feelings or sudden realizations, often without being able to explain how.",
      },
    },
    {
      id: "u13-l2-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "At a concert, someone fully absorbed in the music, lights, and energy of the crowd is using ___.",
        options: ["Se (Extraverted Sensing)", "Ni (Introverted Intuition)", "Ne (Extraverted Intuition)", "Si (Introverted Sensing)"],
        correctIndex: 0,
        explanation: "Se is about being fully immersed in present-moment sensory experience. The sights, sounds, and physical energy of a live concert are Se heaven.",
      },
    },
    {
      id: "u13-l2-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Four friends taste a new dish at a restaurant. Friend A says: 'Wow, these flavors are incredible right now.' Friend B says: 'This reminds me of something my mom used to make.' Friend C says: 'Ooh, what if we added lime? Or used this spice in tacos? Or made it into a soup?' Friend D says: 'I have a feeling this restaurant is going to blow up, there's something special about their approach.'",
        question: "Match each friend to their likely perceiving function:",
        options: [
          "A=Se, B=Si, C=Ne, D=Ni",
          "A=Ni, B=Ne, C=Si, D=Se",
          "A=Si, B=Se, C=Ni, D=Ne",
          "A=Ne, B=Ni, C=Se, D=Si",
        ],
        correctIndex: 0,
        explanation: "A is in the present moment (Se). B compares to past experience (Si). C generates possibilities and new ideas (Ne). D has an intuitive sense about the future (Ni). Same dish, four completely different ways of perceiving it!",
      },
    },
    {
      id: "u13-l2-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "You're exploring a new city. You could: (A) wander and soak in the sights, sounds, and street food, (B) compare everything to cities you've visited before, (C) brainstorm all the hidden gems and side streets you could explore, or (D) follow your gut feeling about which neighborhood 'feels right.'",
        question: "Which option represents Ne (Extraverted Intuition)?",
        options: [
          "Option A, soaking in the sights",
          "Option B, comparing to past cities",
          "Option C, brainstorming possibilities to explore",
          "Option D, following gut feeling",
        ],
        correctIndex: 2,
        explanation: "Ne is the 'what else could we explore?' function. It generates possibilities, sees connections, and wants to discover what's around every corner. Pure brainstorming energy.",
      },
    },
    {
      id: "u13-l2-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these into Sensing functions (concrete) vs. Intuition functions (abstract):",
        categories: ["Sensing (concrete, tangible)", "Intuition (abstract, patterns)"],
        items: [
          { text: "Se, present-moment awareness", categoryIndex: 0 },
          { text: "Si, detailed memory recall", categoryIndex: 0 },
          { text: "Ne, brainstorming possibilities", categoryIndex: 1 },
          { text: "Ni, deep pattern recognition", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u13-l2-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How many perceiving functions are there in total?",
        options: [
          "Two",
          "Four, Se, Si, Ne, Ni",
          "Eight",
          "One",
        ],
        correctIndex: 1,
        explanation: "There are four perceiving functions: Se (present-moment sensing), Si (memory-based sensing), Ne (possibility intuition), and Ni (pattern intuition). Four different lenses on the world!",
      },
    },
  ],
  xpReward: 20,
};

// ── Lesson 3: Four Ways to Decide (Judging Functions) ───────────────────────

const lesson3: Lesson = {
  id: "u13-l3",
  unitId: "what-are-cognitive-functions",
  order: 3,
  title: "Four Ways to Decide",
  subtitle: "The four judging functions",
  exercises: [
    {
      id: "u13-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Decisions, Decisions",
        body: "Just like there are four ways to take in information, there are four ways to make decisions. Two use logic (Thinking functions) and two use values (Feeling functions). Each has an introverted and an extraverted version.",
        highlight: "Thinking and Feeling",
      },
    },
    {
      id: "u13-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Meet the Four Judging Functions",
        body: "Te (Extraverted Thinking): external logic, efficiency, results, data. Ti (Introverted Thinking): internal logic, frameworks, first principles. Fe (Extraverted Feeling): group harmony, social awareness, reading the room. Fi (Introverted Feeling): personal values, inner compass, authenticity.",
        highlight: "Te, Ti, Fe, Fi",
      },
    },
    {
      id: "u13-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which judging function is about external efficiency, measurable results, and organizing systems?",
        options: [
          "Te (Extraverted Thinking)",
          "Ti (Introverted Thinking)",
          "Fe (Extraverted Feeling)",
          "Fi (Introverted Feeling)",
        ],
        correctIndex: 0,
        explanation: "Te is the 'let's get results' function. It focuses on efficiency, data, metrics, and organizing the external world. 'What's the most effective plan?', that's Te talking.",
      },
    },
    {
      id: "u13-l3-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which judging function is about building internal logical frameworks and understanding HOW things work?",
        options: [
          "Te (Extraverted Thinking)",
          "Ti (Introverted Thinking)",
          "Fe (Extraverted Feeling)",
          "Fi (Introverted Feeling)",
        ],
        correctIndex: 1,
        explanation: "Ti wants to understand things from the inside out. It builds mental models, questions assumptions, and asks 'But does this ACTUALLY make sense?' It cares about accuracy more than speed.",
      },
    },
    {
      id: "u13-l3-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which judging function reads the emotional temperature of a room and works to maintain group harmony?",
        options: [
          "Te (Extraverted Thinking)",
          "Ti (Introverted Thinking)",
          "Fe (Extraverted Feeling)",
          "Fi (Introverted Feeling)",
        ],
        correctIndex: 2,
        explanation: "Fe is the social harmony function. It naturally tunes into how everyone in the group is feeling and works to create connection, comfort, and shared positive emotion.",
      },
    },
    {
      id: "u13-l3-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each judging function to its description:",
        pairs: [
          { left: "Te", right: "External logic, efficiency, measurable results" },
          { left: "Ti", right: "Internal logic, frameworks, first principles" },
          { left: "Fe", right: "Group harmony, reading the room, social bonds" },
          { left: "Fi", right: "Personal values, inner compass, authenticity" },
        ],
      },
    },
    {
      id: "u13-l3-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Someone who says 'I don't care if it's efficient, it doesn't feel right to me personally' is likely using ___.",
        options: ["Fi (Introverted Feeling)", "Te (Extraverted Thinking)", "Fe (Extraverted Feeling)", "Ti (Introverted Thinking)"],
        correctIndex: 0,
        explanation: "Fi is the inner compass, it evaluates choices against deeply held personal values. When something conflicts with your core sense of right and wrong, Fi speaks up, regardless of logic or group opinion.",
      },
    },
    {
      id: "u13-l3-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "A project manager who says 'Show me the data, what approach gets us the best results fastest?' is using ___.",
        options: ["Te (Extraverted Thinking)", "Fi (Introverted Feeling)", "Ti (Introverted Thinking)", "Fe (Extraverted Feeling)"],
        correctIndex: 0,
        explanation: "Te is all about external metrics, efficiency, and results. 'What works? What's measurable? What's the fastest path to the goal?', that's pure Te.",
      },
    },
    {
      id: "u13-l3-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Four coworkers disagree about whether to fire an underperforming team member. Coworker A says: 'The numbers speak for themselves, they're not meeting targets.' Coworker B says: 'But logically, have we analyzed WHY they're underperforming? The system might be the issue.' Coworker C says: 'How is the team feeling about this? We need to handle it in a way that doesn't damage group morale.' Coworker D says: 'This doesn't sit right with me, I believe everyone deserves more support before we give up on them.'",
        question: "Match each coworker to their likely judging function:",
        options: [
          "A=Te, B=Ti, C=Fe, D=Fi",
          "A=Fi, B=Fe, C=Ti, D=Te",
          "A=Ti, B=Te, C=Fi, D=Fe",
          "A=Fe, B=Fi, C=Te, D=Ti",
        ],
        correctIndex: 0,
        explanation: "A focuses on external results/data (Te). B wants to understand the root cause logically (Ti). C considers group feelings (Fe). D references personal values (Fi). Same situation, four completely different decision-making styles!",
      },
    },
    {
      id: "u13-l3-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "You're choosing between two job offers. One pays more and has a clear promotion track (great metrics). The other is at a small nonprofit doing work that deeply aligns with your personal values but pays less.",
        question: "If you chose the nonprofit because 'it aligns with who I am,' which judging function most influenced your decision?",
        options: [
          "Te, because you evaluated the options logically",
          "Ti, because you built a framework for the decision",
          "Fe, because you considered how others would feel",
          "Fi, because you followed your personal values and inner compass",
        ],
        correctIndex: 3,
        explanation: "Choosing based on deep personal values and authenticity ('this is who I am') is classic Fi. Te might have chosen the higher-paying job; Fe might have considered how others would react; Ti might have analyzed the logical trade-offs.",
      },
    },
    {
      id: "u13-l3-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these into Thinking functions (logic) vs. Feeling functions (values):",
        categories: ["Thinking (logic-based)", "Feeling (values-based)"],
        items: [
          { text: "Te, efficiency and results", categoryIndex: 0 },
          { text: "Ti, frameworks and precision", categoryIndex: 0 },
          { text: "Fe, group harmony and social bonds", categoryIndex: 1 },
          { text: "Fi, personal values and authenticity", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u13-l3-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How many judging (decision-making) functions are there?",
        options: [
          "Two",
          "Four, Te, Ti, Fe, Fi",
          "Eight",
          "One",
        ],
        correctIndex: 1,
        explanation: "Four judging functions: Te (external logic), Ti (internal logic), Fe (group values), and Fi (personal values). Combined with the four perceiving functions, that gives us eight cognitive functions total!",
      },
    },
  ],
  xpReward: 20,
};

// ── Lesson 4: Introverted vs Extraverted ────────────────────────────────────

const lesson4: Lesson = {
  id: "u13-l4",
  unitId: "what-are-cognitive-functions",
  order: 4,
  title: "Introverted vs Extraverted",
  subtitle: "Every function has two flavors",
  exercises: [
    {
      id: "u13-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Two Versions of Every Function",
        body: "You might have noticed: every function comes in an introverted (i) and an extraverted (e) version. Thinking has Ti and Te. Feeling has Fi and Fe. Sensing has Si and Se. Intuition has Ni and Ne. Same base ability, completely different direction.",
        highlight: "introverted and extraverted",
      },
    },
    {
      id: "u13-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Inward vs Outward",
        body: "Introverted functions (Ti, Fi, Si, Ni) are directed INWARD, they process in your internal world. Extraverted functions (Te, Fe, Se, Ne) are directed OUTWARD, they engage with the external world. It's not about being shy or social, it's about which direction the function points.",
        highlight: "INWARD vs OUTWARD",
      },
    },
    {
      id: "u13-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What does 'introverted' mean when describing a cognitive function?",
        options: [
          "The person is shy and quiet",
          "The function is directed inward, processing in your internal world",
          "The function only works when you're alone",
          "The function is weaker than extraverted functions",
        ],
        correctIndex: 1,
        explanation: "'Introverted' simply means the function's energy is directed inward. Ti builds internal logical models; Fi checks against inner values; Si recalls internal impressions; Ni generates internal insights. It has nothing to do with being shy!",
      },
    },
    {
      id: "u13-l4-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What does 'extraverted' mean when describing a cognitive function?",
        options: [
          "The person is loud and outgoing",
          "The function only works in groups",
          "The function is directed outward, engaging with the external world",
          "The function is always stronger than introverted functions",
        ],
        correctIndex: 2,
        explanation: "'Extraverted' means the function engages with the outer world. Te organizes external systems; Fe manages group dynamics; Se takes in physical reality; Ne explores external possibilities. It's about direction, not personality.",
      },
    },
    {
      id: "u13-l4-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Te and Ti are both Thinking functions. What makes them different?",
        options: [
          "Te is smarter than Ti",
          "Te focuses on external systems and results; Ti focuses on internal frameworks and accuracy",
          "They're actually the same thing",
          "Ti only works in science; Te only works in business",
        ],
        correctIndex: 1,
        explanation: "Te and Ti are the same base ability (logical thinking) pointed in different directions. Te says 'What works in the real world?' Ti says 'Does this make sense in my internal framework?' Same coin, two sides.",
      },
    },
    {
      id: "u13-l4-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each function to its direction:",
        pairs: [
          { left: "Ti, internal logic", right: "Introverted (inward)" },
          { left: "Fe, group harmony", right: "Extraverted (outward)" },
          { left: "Ni, deep pattern recognition", right: "Introverted (inward)" },
          { left: "Se, present-moment awareness", right: "Extraverted (outward)" },
        ],
      },
    },
    {
      id: "u13-l4-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Fi checks against your ___ values, while Fe reads the ___ emotional temperature.",
        options: ["inner / group's", "group's / inner", "random / random", "logical / logical"],
        correctIndex: 0,
        explanation: "Fi looks inward to personal values ('What do I believe is right?'). Fe looks outward to group feelings ('How is everyone feeling?'). Same base function (Feeling), opposite directions.",
      },
    },
    {
      id: "u13-l4-e8",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort these functions by their direction:",
        categories: ["Introverted (directed inward)", "Extraverted (directed outward)"],
        items: [
          { text: "Ti, internal frameworks", categoryIndex: 0 },
          { text: "Te, external efficiency", categoryIndex: 1 },
          { text: "Fi, personal values", categoryIndex: 0 },
          { text: "Fe, group harmony", categoryIndex: 1 },
          { text: "Ni, deep inner knowing", categoryIndex: 0 },
          { text: "Ne, brainstorming possibilities", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u13-l4-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two people are both 'thinkers,' but they approach problems very differently. Person A says: 'Let me look at the data and metrics, what approach gets results?' Person B says: 'Wait, let me think this through from first principles, I need to understand WHY before I act.'",
        question: "Which thinking function is each person using?",
        options: [
          "A = Te (extraverted, external data), B = Ti (introverted, internal framework)",
          "A = Ti, B = Te",
          "Both are using the same function",
          "Neither is using a Thinking function",
        ],
        correctIndex: 0,
        explanation: "Person A is using Te, focused on external data and measurable results. Person B is using Ti, focused on building an internal logical framework. Both are 'thinking,' but in completely different directions!",
      },
    },
    {
      id: "u13-l4-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two people react to a friend's breakup. Person A immediately says: 'Are you okay? What do you need? Let me rally our friend group to support you.' Person B thinks quietly: 'This feels deeply wrong to me, they deserved better. I need to process my feelings about this privately before I can talk about it.'",
        question: "Which feeling function is each person using?",
        options: [
          "A = Fe (outward, group-focused), B = Fi (inward, personal values)",
          "A = Fi, B = Fe",
          "Both are using Fe",
          "Neither is using a Feeling function",
        ],
        correctIndex: 0,
        explanation: "Person A immediately moves outward, reading emotions, mobilizing the group, managing the social situation (Fe). Person B turns inward, checking personal values, processing privately, needing time alone with their feelings (Fi).",
      },
    },
    {
      id: "u13-l4-e11",
      difficulty: 3,
      content: {
        type: "multiple-choice",
        question: "Why is the introverted/extraverted distinction so important in cognitive function theory?",
        options: [
          "It's not important, all functions work the same way",
          "Because the same base function (like Thinking) operates in fundamentally different ways depending on its direction",
          "Because introverted functions are always better",
          "Because it determines if you're an introvert or extravert",
        ],
        correctIndex: 1,
        explanation: "The direction completely changes how a function operates. Te and Ti are both 'Thinking,' but they produce very different behaviors, priorities, and blind spots. Understanding the i/e distinction is essential to understanding the system.",
      },
    },
    {
      id: "u13-l4-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How many total cognitive functions are there (counting both introverted and extraverted versions)?",
        options: [
          "Four",
          "Six",
          "Eight, Se, Si, Ne, Ni, Te, Ti, Fe, Fi",
          "Sixteen",
        ],
        correctIndex: 2,
        explanation: "Eight total! Four perceiving (Se, Si, Ne, Ni) and four judging (Te, Ti, Fe, Fi). Each base function comes in introverted and extraverted flavors. That's the complete set.",
      },
    },
  ],
  xpReward: 20,
};

// ── Lesson 5: Your Function Stack ───────────────────────────────────────────

const lesson5: Lesson = {
  id: "u13-l5",
  unitId: "what-are-cognitive-functions",
  order: 5,
  title: "Your Function Stack",
  subtitle: "How eight functions become your unique type",
  exercises: [
    {
      id: "u13-l5-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Everyone Uses All Eight",
        body: "Here's a key insight: every person has access to all eight cognitive functions. You can use Se AND Ni, Te AND Fi. The difference between types isn't WHICH functions you have, it's the ORDER in which you prefer them. That order is called your 'function stack.'",
        highlight: "function stack",
      },
    },
    {
      id: "u13-l5-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Four Stack Positions",
        body: "Your stack has four main positions: Dominant (your superpower, automatic and effortless), Auxiliary (your helper, balances the dominant), Tertiary (your growing edge, playful but less reliable), and Inferior (your blind spot, clumsy and draining to use).",
        highlight: "Dominant, Auxiliary, Tertiary, Inferior",
      },
    },
    {
      id: "u13-l5-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is a 'function stack'?",
        options: [
          "A random assortment of cognitive functions",
          "The specific order in which you prefer and use the eight cognitive functions",
          "A stack of textbooks about psychology",
          "A test you take to determine your IQ",
        ],
        correctIndex: 1,
        explanation: "Your function stack is your personal preference order for the eight cognitive functions. It determines how you naturally think, decide, and perceive the world.",
      },
    },
    {
      id: "u13-l5-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which stack position is your strongest, most natural function?",
        options: [
          "Auxiliary",
          "Tertiary",
          "Dominant",
          "Inferior",
        ],
        correctIndex: 2,
        explanation: "The Dominant function is your strongest, it's automatic, effortless, and the first to develop. It's like your dominant hand: you don't even think about reaching for it.",
      },
    },
    {
      id: "u13-l5-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which stack position is your weakest, least developed function?",
        options: [
          "Dominant",
          "Auxiliary",
          "Tertiary",
          "Inferior",
        ],
        correctIndex: 3,
        explanation: "The Inferior function is the weakest, it's clumsy, energy-draining, and the source of stress reactions. It's the opposite of your dominant and the hardest for you to use skillfully.",
      },
    },
    {
      id: "u13-l5-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each stack position to its description:",
        pairs: [
          { left: "Dominant", right: "Your superpower, automatic and effortless" },
          { left: "Auxiliary", right: "Your helper, balances the dominant" },
          { left: "Tertiary", right: "Your growing edge, playful but unreliable" },
          { left: "Inferior", right: "Your blind spot, clumsy and draining" },
        ],
      },
    },
    {
      id: "u13-l5-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "The function stack determines your cognitive type. For example, someone with Ni-Te-Fi-Se as their stack is an ___.",
        options: ["INTJ", "ESFP", "ENFJ", "ISTP"],
        correctIndex: 0,
        explanation: "The stack Ni-Te-Fi-Se defines the INTJ type. Each of the 16 types has a unique stack order, and that order shapes their entire way of experiencing life.",
      },
    },
    {
      id: "u13-l5-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Everyone has access to all ___ cognitive functions, but uses them in a specific preference order.",
        options: ["eight", "four", "two", "sixteen"],
        correctIndex: 0,
        explanation: "All eight functions (Se, Si, Ne, Ni, Te, Ti, Fe, Fi) are available to everyone. Your type is determined by which ones you prefer and in what order, not by which ones you 'have.'",
      },
    },
    {
      id: "u13-l5-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two people walk into the same job interview. Person A (dominant Te) immediately thinks about how to present their results and achievements efficiently. Person B (dominant Fi) thinks about whether this company's values align with their personal ethics. Both are competent, they just lead with different functions.",
        question: "Why do they approach the same situation so differently?",
        options: [
          "One is more qualified than the other",
          "Their different dominant functions cause them to prioritize different things automatically",
          "One is nervous and the other isn't",
          "Cognitive functions don't actually affect behavior",
        ],
        correctIndex: 1,
        explanation: "This is the power of the function stack. Your dominant function is the lens through which you first see every situation. Te-dominant sees efficiency and results; Fi-dominant sees values and authenticity. Neither is wrong, they're just wired differently.",
      },
    },
    {
      id: "u13-l5-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Someone asks: 'If everyone uses all eight functions, why does type matter at all?' Good question!",
        question: "Why does the ORDER of functions matter so much?",
        options: [
          "It doesn't, all orders are identical in practice",
          "Because the dominant function colors everything, the auxiliary shapes your balance, and the inferior determines your stress points, order creates totally different experiences of life",
          "Because you can only use one function at a time",
          "Because the government requires you to know your type",
        ],
        correctIndex: 1,
        explanation: "The order is everything! Leading with Ni (INTJ) vs. leading with Se (ESFP) creates fundamentally different ways of experiencing reality, even though both types have access to Ni and Se. It's like how everyone has two hands, but whether you're left- or right-handed changes how you do everything.",
      },
    },
    {
      id: "u13-l5-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Put these stack positions in order from strongest to weakest:",
        categories: ["1st (Strongest)", "2nd", "3rd", "4th (Weakest)"],
        items: [
          { text: "Tertiary (growing edge)", categoryIndex: 2 },
          { text: "Dominant (superpower)", categoryIndex: 0 },
          { text: "Inferior (blind spot)", categoryIndex: 3 },
          { text: "Auxiliary (helper)", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u13-l5-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What determines your cognitive type (like INTJ or ENFP)?",
        options: [
          "Your zodiac sign",
          "The order of your function stack, which functions you prefer and in what sequence",
          "How smart you are",
          "Your favorite color",
        ],
        correctIndex: 1,
        explanation: "Your cognitive type is defined by your function stack order. That's it! The stack shapes how you perceive, decide, handle stress, and grow. Now you know the foundation of the whole system.",
      },
    },
  ],
  xpReward: 25,
};

// ── Export ───────────────────────────────────────────────────────────────────

export const unit13Lessons: Lesson[] = [lesson1, lesson2, lesson3, lesson4, lesson5];
