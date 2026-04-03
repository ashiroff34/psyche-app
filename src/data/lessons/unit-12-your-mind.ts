// ─────────────────────────────────────────────────────────────────────────────
// Unit 12: Your Mind
// 5 personalized lessons about the user's cognitive function stack.
// Uses template tokens replaced at runtime by personalizeExercises().
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson } from "@/types/lessons";

// ── Lesson 1: Your Mental Home Base (Dominant Function) ─────────────────────

const lesson1: Lesson = {
  id: "u12-l1",
  unitId: "your-mind",
  order: 1,
  title: "Your Mental Home Base",
  subtitle: "Discover your dominant cognitive function",
  exercises: [
    {
      id: "u12-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Everyone Has a Superpower",
        body: "Your brain has a default mode, one cognitive function it reaches for first, automatically, like a dominant hand. For you, that function is {{dominantFunctionName}} ({{dominantFunction}}). It's your mental home base.",
        highlight: "{{dominantFunctionName}}",
      },
    },
    {
      id: "u12-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "What 'Dominant' Really Means",
        body: "Your dominant function isn't just something you're good at, it's the lens through which you see everything. It developed first, it's the most natural, and it's usually running in the background even when you're not aware of it.",
        highlight: "dominant function",
      },
    },
    {
      id: "u12-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What does it mean for {{dominantFunctionName}} to be your dominant function?",
        options: [
          "It's the function you use most naturally and automatically",
          "It's the function you only use at work",
          "It's a function you have to practice every day to maintain",
          "It's the function you'll develop last in life",
        ],
        correctIndex: 0,
        explanation: "Your dominant function is like breathing, it happens naturally, without effort. {{dominantFunctionName}} is your default mode of engaging with the world.",
      },
    },
    {
      id: "u12-l1-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Your cognitive type is {{cognitiveType}}. Which function is your dominant?",
        options: [
          "{{dominantFunctionName}} ({{dominantFunction}})",
          "{{auxiliaryFunctionName}} ({{auxiliaryFunction}})",
          "{{tertiaryFunctionName}} ({{tertiaryFunction}})",
          "{{inferiorFunctionName}} ({{inferiorFunction}})",
        ],
        correctIndex: 0,
        explanation: "As a {{cognitiveType}}, your dominant function is {{dominantFunctionName}} ({{dominantFunction}}). It's the captain of your cognitive ship!",
      },
    },
    {
      id: "u12-l1-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "When did your dominant function ({{dominantFunction}}) start developing?",
        options: [
          "In your 30s",
          "In early childhood, it was the first to develop",
          "During college",
          "It hasn't developed yet",
        ],
        correctIndex: 1,
        explanation: "Your dominant function is the earliest to develop, usually emerging in childhood. It's the foundation on which your entire cognitive stack is built.",
      },
    },
    {
      id: "u12-l1-e6",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Your dominant function is like your brain's ___, it's the mode you default to without thinking.",
        options: ["home base", "emergency exit", "spare tire", "backup plan"],
        correctIndex: 0,
        explanation: "Your dominant function is your home base, the place your mind goes naturally, effortlessly, and most comfortably.",
      },
    },
    {
      id: "u12-l1-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "As a {{cognitiveType}}, your dominant function {{dominantFunctionName}} developed ___ in your life.",
        options: ["first", "second", "third", "last"],
        correctIndex: 0,
        explanation: "The dominant function is the first to develop in the cognitive stack. It's your earliest and most reliable mental tool.",
      },
    },
    {
      id: "u12-l1-e8",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each concept to its description:",
        pairs: [
          { left: "Dominant function", right: "Your automatic default mode" },
          { left: "Auxiliary function", right: "Your helpful sidekick" },
          { left: "Tertiary function", right: "Your developing edge" },
          { left: "Inferior function", right: "Your blind spot" },
        ],
      },
    },
    {
      id: "u12-l1-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "You're at a party where you don't know many people. Without even thinking about it, your mind immediately starts doing what feels most natural, using {{dominantFunctionName}}.",
        question: "Why does your mind default to {{dominantFunction}} in new situations?",
        options: [
          "Because it's your dominant function, your automatic first response",
          "Because parties are stressful and you're in grip mode",
          "Because you consciously chose to use that function",
          "Because it's the only function available in social settings",
        ],
        correctIndex: 0,
        explanation: "In any new situation, your brain reaches for its dominant function first. It's automatic, like reaching with your dominant hand. {{dominantFunctionName}} is simply how you process the world by default.",
      },
    },
    {
      id: "u12-l1-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "A friend tells you: 'I don't understand how your brain works, you always seem to approach things through {{dominantFunctionName}}.' You realize they're noticing something about you that you barely notice yourself.",
        question: "Why might you not notice how much you use {{dominantFunction}}?",
        options: [
          "Because you rarely use it",
          "Because it's so natural it feels invisible, like breathing",
          "Because it only activates during emergencies",
          "Because you actively suppress it in social settings",
        ],
        correctIndex: 1,
        explanation: "The dominant function is so automatic that we often don't even realize we're using it. Other people may notice your {{dominantFunctionName}} tendencies before you do!",
      },
    },
    {
      id: "u12-l1-e11",
      difficulty: 3,
      content: {
        type: "multiple-choice",
        question: "If someone with a DIFFERENT dominant function watched you think through a problem, what would they likely notice?",
        options: [
          "Nothing, everyone thinks the same way",
          "That you lean heavily on {{dominantFunctionName}} in ways they don't",
          "That you're using all eight functions equally",
          "That you deliberately avoid using {{dominantFunction}}",
        ],
        correctIndex: 1,
        explanation: "People with different dominant functions literally process reality differently. Your heavy reliance on {{dominantFunctionName}} would stand out to someone who leads with a different function.",
      },
    },
    {
      id: "u12-l1-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Quick check: As a {{cognitiveType}}, your mental home base is…",
        options: [
          "{{dominantFunctionName}} ({{dominantFunction}})",
          "{{inferiorFunctionName}} ({{inferiorFunction}})",
          "A random function that changes daily",
          "None, you don't have a dominant function",
        ],
        correctIndex: 0,
        explanation: "You got it! {{dominantFunctionName}} ({{dominantFunction}}) is your mental home base. It's the foundation of how you experience and interact with the world.",
      },
    },
  ],
  xpReward: 20,
  personalized: true,
  personalizeFor: "cognitiveType",
};

// ── Lesson 2: Your Sidekick (Auxiliary Function) ────────────────────────────

const lesson2: Lesson = {
  id: "u12-l2",
  unitId: "your-mind",
  order: 2,
  title: "Your Sidekick",
  subtitle: "Meet your auxiliary function",
  exercises: [
    {
      id: "u12-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Every Hero Needs a Sidekick",
        body: "Your dominant function ({{dominantFunction}}) doesn't work alone. It has a partner: {{auxiliaryFunctionName}} ({{auxiliaryFunction}}). This auxiliary function balances your dominant, covering its blind spots and giving you a second perspective.",
        highlight: "{{auxiliaryFunctionName}}",
      },
    },
    {
      id: "u12-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Balancing Act",
        body: "If your dominant function is introverted, your auxiliary is extraverted (and vice versa). This gives you balance, one function looks inward while the other engages the outer world. Together, {{dominantFunction}} and {{auxiliaryFunction}} form your core cognitive partnership.",
        highlight: "balance",
      },
    },
    {
      id: "u12-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "As a {{cognitiveType}}, which function is your auxiliary (sidekick)?",
        options: [
          "{{auxiliaryFunctionName}} ({{auxiliaryFunction}})",
          "{{dominantFunctionName}} ({{dominantFunction}})",
          "{{inferiorFunctionName}} ({{inferiorFunction}})",
          "{{tertiaryFunctionName}} ({{tertiaryFunction}})",
        ],
        correctIndex: 0,
        explanation: "Your auxiliary function is {{auxiliaryFunctionName}} ({{auxiliaryFunction}}). It partners with your dominant to give you a well-rounded approach to life.",
      },
    },
    {
      id: "u12-l2-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "When does the auxiliary function typically develop?",
        options: [
          "In early childhood, alongside the dominant",
          "During the teenage years and into your 20s",
          "Only after age 50",
          "It's fully developed from birth",
        ],
        correctIndex: 1,
        explanation: "The auxiliary function develops during adolescence and into your 20s. It's the second function to come online, complementing your dominant.",
      },
    },
    {
      id: "u12-l2-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Why is the auxiliary called a 'balancing' function?",
        options: [
          "It contradicts the dominant function",
          "It has the opposite attitude (introverted vs. extraverted) from the dominant",
          "It replaces the dominant when you're tired",
          "It only works during meditation",
        ],
        correctIndex: 1,
        explanation: "The auxiliary function always has the opposite attitude from the dominant. If your dominant is introverted, your auxiliary is extraverted. This creates balance between your inner and outer worlds.",
      },
    },
    {
      id: "u12-l2-e6",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Your dominant {{dominantFunction}} handles one side of life, while your auxiliary {{auxiliaryFunction}} covers the ___ side.",
        options: ["opposite", "identical", "irrelevant", "weakest"],
        correctIndex: 0,
        explanation: "The auxiliary covers the opposite attitude. Together, your dominant and auxiliary give you access to both your inner world and the outer world.",
      },
    },
    {
      id: "u12-l2-e7",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each role in the cognitive stack:",
        pairs: [
          { left: "{{dominantFunction}}", right: "The captain, your default mode" },
          { left: "{{auxiliaryFunction}}", right: "The first mate, your balancing partner" },
          { left: "{{tertiaryFunction}}", right: "The developing crew member" },
          { left: "{{inferiorFunction}}", right: "The stowaway, least conscious" },
        ],
      },
    },
    {
      id: "u12-l2-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "The auxiliary function typically develops during your ___ and into your 20s.",
        options: ["teenage years", "infancy", "retirement", "30s"],
        correctIndex: 0,
        explanation: "The auxiliary comes online during adolescence. This is when many people start to feel more balanced and capable, they now have two strong cognitive tools instead of just one.",
      },
    },
    {
      id: "u12-l2-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "You're making a big decision, say, choosing a career path. Your dominant function ({{dominantFunction}}) kicks in first and gives you its take. But then {{auxiliaryFunction}} chimes in with a different angle, adding information your dominant might miss.",
        question: "What is the auxiliary function doing here?",
        options: [
          "Overriding the dominant function",
          "Providing a complementary perspective that balances the dominant's view",
          "Causing confusion and indecision",
          "Nothing useful, only the dominant matters",
        ],
        correctIndex: 1,
        explanation: "This is exactly how the dominant-auxiliary partnership works. {{dominantFunction}} leads, but {{auxiliaryFunction}} adds balance, giving you a more complete picture than either function alone could provide.",
      },
    },
    {
      id: "u12-l2-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "A teenager who is a {{cognitiveType}} seems to be 'growing into themselves' around age 16-17. They're becoming more balanced and less one-dimensional than they were as a child.",
        question: "What's likely happening cognitively?",
        options: [
          "Their inferior function is taking over",
          "Their auxiliary function ({{auxiliaryFunction}}) is developing, creating more balance",
          "They're losing their dominant function",
          "All eight functions are developing simultaneously",
        ],
        correctIndex: 1,
        explanation: "The mid-teens is exactly when the auxiliary function starts coming online. For a {{cognitiveType}}, this means {{auxiliaryFunctionName}} is developing, giving them a second strong tool alongside their dominant {{dominantFunction}}.",
      },
    },
    {
      id: "u12-l2-e11",
      difficulty: 3,
      content: {
        type: "multiple-choice",
        question: "What happens when someone relies ONLY on their dominant function and neglects their auxiliary?",
        options: [
          "They become perfectly balanced",
          "They become one-sided, either too inward-focused or too outward-focused",
          "Nothing, the auxiliary isn't important",
          "They develop their inferior function faster",
        ],
        correctIndex: 1,
        explanation: "Without the auxiliary's balancing effect, a person becomes lopsided. The auxiliary provides access to the other attitude (introversion or extraversion), preventing you from getting stuck in one mode.",
      },
    },
    {
      id: "u12-l2-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Your dynamic duo as a {{cognitiveType}} is:",
        options: [
          "{{dominantFunction}} + {{auxiliaryFunction}}",
          "{{tertiaryFunction}} + {{inferiorFunction}}",
          "{{dominantFunction}} + {{inferiorFunction}}",
          "{{auxiliaryFunction}} + {{tertiaryFunction}}",
        ],
        correctIndex: 0,
        explanation: "{{dominantFunction}} and {{auxiliaryFunction}} are your core partnership. The captain and the first mate, working together to navigate the world!",
      },
    },
  ],
  xpReward: 20,
  personalized: true,
  personalizeFor: "cognitiveType",
};

// ── Lesson 3: The Growing Edge (Tertiary Function) ──────────────────────────

const lesson3: Lesson = {
  id: "u12-l3",
  unitId: "your-mind",
  order: 3,
  title: "The Growing Edge",
  subtitle: "Your tertiary function and hidden creativity",
  exercises: [
    {
      id: "u12-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Your Third Function",
        body: "Below your dominant and auxiliary sits a third function: {{tertiaryFunctionName}} ({{tertiaryFunction}}). It's less developed than your top two, but it's far from useless, it often shows up during play, relaxation, and creative moments.",
        highlight: "{{tertiaryFunctionName}}",
      },
    },
    {
      id: "u12-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Playful Function",
        body: "Jung and later theorists noticed that the tertiary function has a childlike quality. It's where you go for fun, comfort, and relief. When you're relaxed and not under pressure, {{tertiaryFunction}} gets to come out and play.",
        highlight: "childlike quality",
      },
    },
    {
      id: "u12-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "As a {{cognitiveType}}, your tertiary function is:",
        options: [
          "{{tertiaryFunctionName}} ({{tertiaryFunction}})",
          "{{dominantFunctionName}} ({{dominantFunction}})",
          "{{auxiliaryFunctionName}} ({{auxiliaryFunction}})",
          "{{inferiorFunctionName}} ({{inferiorFunction}})",
        ],
        correctIndex: 0,
        explanation: "Your tertiary is {{tertiaryFunctionName}} ({{tertiaryFunction}}), the third function in your stack, with a playful, developing quality.",
      },
    },
    {
      id: "u12-l3-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "When does the tertiary function tend to show up most?",
        options: [
          "During high-pressure work situations",
          "During relaxation, play, and creative moments",
          "Only in emergencies",
          "Never, it's completely dormant",
        ],
        correctIndex: 1,
        explanation: "The tertiary function has a playful, relief-seeking quality. It tends to emerge when you're relaxed, having fun, or engaged in creative activities.",
      },
    },
    {
      id: "u12-l3-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Why is the tertiary function described as 'childlike'?",
        options: [
          "Because only children have it",
          "Because it's less mature and developed than the top two functions",
          "Because it makes you act immaturely",
          "Because it only works when you're around kids",
        ],
        correctIndex: 1,
        explanation: "The tertiary function is 'childlike' because it's less developed, it has a naive, playful quality. It's eager but not yet refined, which can make it both charming and unreliable.",
      },
    },
    {
      id: "u12-l3-e6",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "The tertiary function ({{tertiaryFunction}}) often emerges during ___ rather than high-pressure situations.",
        options: ["play and relaxation", "deep sleep", "arguments", "exams"],
        correctIndex: 0,
        explanation: "Your tertiary function shows up when you're at ease. It's your 'play mode' function, less pressure means more room for this developing part of you to express itself.",
      },
    },
    {
      id: "u12-l3-e7",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each function position to when it typically develops:",
        pairs: [
          { left: "Dominant ({{dominantFunction}})", right: "Childhood, earliest to develop" },
          { left: "Auxiliary ({{auxiliaryFunction}})", right: "Teens/20s, second to develop" },
          { left: "Tertiary ({{tertiaryFunction}})", right: "30s/40s, midlife development" },
          { left: "Inferior ({{inferiorFunction}})", right: "Ongoing challenge, least developed" },
        ],
      },
    },
    {
      id: "u12-l3-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Developing your tertiary function {{tertiaryFunction}} can be a source of ___ and personal growth.",
        options: ["creativity", "stress", "exhaustion", "boredom"],
        correctIndex: 0,
        explanation: "The tertiary function is a growth edge. As you develop {{tertiaryFunctionName}}, it becomes a source of creativity, new perspectives, and personal enrichment.",
      },
    },
    {
      id: "u12-l3-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "After a long, stressful week at work where you leaned heavily on your dominant ({{dominantFunction}}) and auxiliary ({{auxiliaryFunction}}), you finally have a lazy Saturday. You find yourself drawn to activities that engage {{tertiaryFunctionName}} in a relaxed, unstructured way.",
        question: "Why does your tertiary function come out on your day off?",
        options: [
          "Because your dominant and auxiliary are 'resting,' leaving room for the tertiary",
          "Because stress always activates the tertiary",
          "Because the tertiary only works on weekends",
          "Because you've lost access to your dominant function",
        ],
        correctIndex: 0,
        explanation: "When the pressure is off and your top two functions can relax, there's space for the tertiary to emerge. It's like how you might try new hobbies on vacation that you'd never attempt during a workday.",
      },
    },
    {
      id: "u12-l3-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "A {{cognitiveType}} in their 30s notices they're becoming interested in activities that engage {{tertiaryFunctionName}}, things they never cared about in their 20s. Friends comment that they seem more well-rounded.",
        question: "What's happening developmentally?",
        options: [
          "They're losing their dominant function",
          "Their tertiary function is naturally developing, adding new dimensions to their personality",
          "They're having a midlife crisis",
          "Their type is changing completely",
        ],
        correctIndex: 1,
        explanation: "The tertiary function naturally develops in the 30s and 40s. This is a normal, healthy part of cognitive development, the person isn't changing type, they're becoming a fuller version of their type.",
      },
    },
    {
      id: "u12-l3-e11",
      difficulty: 3,
      content: {
        type: "multiple-choice",
        question: "What's the difference between a well-developed tertiary function and a dominant function?",
        options: [
          "No difference, all functions work the same way",
          "The tertiary is playful and creative but less reliable; the dominant is automatic and dependable",
          "The tertiary is always stronger than the dominant",
          "The dominant is only for children; adults use the tertiary",
        ],
        correctIndex: 1,
        explanation: "Even when well-developed, the tertiary retains its playful, slightly unreliable quality. Your dominant ({{dominantFunction}}) is rock-solid; your tertiary ({{tertiaryFunction}}) is more like a fun hobby, enjoyable but not your main tool.",
      },
    },
    {
      id: "u12-l3-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Your tertiary function as a {{cognitiveType}} is:",
        options: [
          "{{tertiaryFunctionName}} ({{tertiaryFunction}})",
          "{{dominantFunctionName}} ({{dominantFunction}})",
          "{{inferiorFunctionName}} ({{inferiorFunction}})",
          "{{auxiliaryFunctionName}} ({{auxiliaryFunction}})",
        ],
        correctIndex: 0,
        explanation: "{{tertiaryFunctionName}} ({{tertiaryFunction}}) is your growing edge, the playful, creative third function in your stack!",
      },
    },
  ],
  xpReward: 20,
  personalized: true,
  personalizeFor: "cognitiveType",
};

// ── Lesson 4: Your Blind Spot (Inferior Function) ───────────────────────────

const lesson4: Lesson = {
  id: "u12-l4",
  unitId: "your-mind",
  order: 4,
  title: "Your Blind Spot",
  subtitle: "Understanding your inferior function",
  exercises: [
    {
      id: "u12-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Function You Struggle With",
        body: "Every type has a function that feels awkward, draining, and unreliable. For you as a {{cognitiveType}}, that's {{inferiorFunctionName}} ({{inferiorFunction}}). It's your inferior function, the opposite of your dominant, and the one most likely to trip you up.",
        highlight: "{{inferiorFunctionName}}",
      },
    },
    {
      id: "u12-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "What Happens Under Stress",
        body: "Here's the surprising part: under extreme stress, your inferior function can 'take over' in clumsy, exaggerated ways. This is called being 'in the grip.' When {{inferiorFunction}} grips you, it doesn't work smoothly, it erupts awkwardly, like a beginner forced to perform on stage.",
        highlight: "in the grip",
      },
    },
    {
      id: "u12-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "As a {{cognitiveType}}, your inferior function is:",
        options: [
          "{{inferiorFunctionName}} ({{inferiorFunction}})",
          "{{dominantFunctionName}} ({{dominantFunction}})",
          "{{auxiliaryFunctionName}} ({{auxiliaryFunction}})",
          "{{tertiaryFunctionName}} ({{tertiaryFunction}})",
        ],
        correctIndex: 0,
        explanation: "Your inferior function is {{inferiorFunctionName}} ({{inferiorFunction}}), the function at the bottom of your stack, and the opposite of your dominant.",
      },
    },
    {
      id: "u12-l4-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Why is the inferior function called your 'blind spot'?",
        options: [
          "Because you literally can't see when using it",
          "Because it's the least developed and hardest to use skillfully",
          "Because it doesn't exist in your stack",
          "Because other people can't see it in you",
        ],
        correctIndex: 1,
        explanation: "The inferior function is your least developed cognitive tool. You CAN use it, but it takes tremendous energy and the results are often clumsy compared to your dominant.",
      },
    },
    {
      id: "u12-l4-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is a 'grip experience'?",
        options: [
          "When you feel physically tense",
          "When extreme stress causes your inferior function to take over in exaggerated, clumsy ways",
          "When you hold something tightly",
          "When your dominant function is extra strong",
        ],
        correctIndex: 1,
        explanation: "A grip experience happens when prolonged stress exhausts your dominant function, and the inferior rushes in to fill the void, but without skill or finesse.",
      },
    },
    {
      id: "u12-l4-e6",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "The inferior function is the ___ of the dominant function, they are cognitive opposites.",
        options: ["mirror image", "twin", "copy", "upgrade"],
        correctIndex: 0,
        explanation: "The inferior and dominant are polar opposites. Your dominant {{dominantFunction}} is strong and natural; your inferior {{inferiorFunction}} is the mirror image, weak and effortful.",
      },
    },
    {
      id: "u12-l4-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "When a {{cognitiveType}} is 'in the grip,' their ___ takes over in clumsy, exaggerated ways.",
        options: [
          "inferior function ({{inferiorFunction}})",
          "dominant function ({{dominantFunction}})",
          "auxiliary function ({{auxiliaryFunction}})",
          "tertiary function ({{tertiaryFunction}})",
        ],
        correctIndex: 0,
        explanation: "Grip experiences involve the inferior function erupting under extreme stress. For you, that means {{inferiorFunctionName}} shows up in ways that feel out of character.",
      },
    },
    {
      id: "u12-l4-e8",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match the concept to its definition:",
        pairs: [
          { left: "Inferior function", right: "Least developed, opposite of dominant" },
          { left: "Grip experience", right: "Stress causes inferior to erupt clumsily" },
          { left: "Dominant function", right: "Most natural, strongest function" },
          { left: "Blind spot", right: "Area of low awareness and skill" },
        ],
      },
    },
    {
      id: "u12-l4-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "You've been under intense stress for weeks, barely sleeping, overwhelmed by deadlines. Suddenly you find yourself acting in ways that feel completely unlike you. You're behaving in an exaggerated, clumsy version of {{inferiorFunctionName}}.",
        question: "What's happening to you?",
        options: [
          "You're experiencing an inferior function grip, {{inferiorFunction}} is taking over under stress",
          "You've permanently changed personality types",
          "Your dominant function has gotten even stronger",
          "You're developing a new cognitive function",
        ],
        correctIndex: 0,
        explanation: "This is a classic grip experience. When stress exhausts your dominant ({{dominantFunction}}), your inferior ({{inferiorFunction}}) erupts, but without the skill or nuance it would have if it were someone else's dominant function.",
      },
    },
    {
      id: "u12-l4-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "A friend who also studies cognitive functions notices you acting strangely after a terrible week. They say: 'You're in the grip of {{inferiorFunction}} right now.' You feel defensive at first, but realize they might be right.",
        question: "What's the healthiest response to recognizing a grip state?",
        options: [
          "Try to push through and work even harder",
          "Recognize the stress, reduce it, and return to your dominant function's strengths",
          "Permanently avoid your inferior function forever",
          "Pretend everything is fine",
        ],
        correctIndex: 1,
        explanation: "The best response to a grip state is self-compassion and stress reduction. Once the pressure eases, your dominant function naturally reasserts itself. The grip isn't permanent, it's a signal that you need rest.",
      },
    },
    {
      id: "u12-l4-e11",
      difficulty: 3,
      content: {
        type: "multiple-choice",
        question: "Can you ever develop your inferior function ({{inferiorFunction}}) into a strength?",
        options: [
          "No, it will always be your weakest function",
          "Yes, with conscious effort it can become more accessible, though never as strong as your dominant",
          "Yes, you can make it stronger than your dominant",
          "No, you should completely ignore it",
        ],
        correctIndex: 1,
        explanation: "With intentional practice, the inferior function becomes more accessible over time. It will never rival your dominant, but it can grow from a liability into a useful (if still somewhat clumsy) tool.",
      },
    },
    {
      id: "u12-l4-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Your inferior function as a {{cognitiveType}} is:",
        options: [
          "{{inferiorFunctionName}} ({{inferiorFunction}})",
          "{{dominantFunctionName}} ({{dominantFunction}})",
          "{{tertiaryFunctionName}} ({{tertiaryFunction}})",
          "{{auxiliaryFunctionName}} ({{auxiliaryFunction}})",
        ],
        correctIndex: 0,
        explanation: "{{inferiorFunctionName}} ({{inferiorFunction}}) is your inferior, your blind spot and the source of grip experiences. Knowing this is powerful self-knowledge!",
      },
    },
  ],
  xpReward: 20,
  personalized: true,
  personalizeFor: "cognitiveType",
};

// ── Lesson 5: Your Full Stack in Action ─────────────────────────────────────

const lesson5: Lesson = {
  id: "u12-l5",
  unitId: "your-mind",
  order: 5,
  title: "Your Full Stack in Action",
  subtitle: "How all four functions work as a system",
  exercises: [
    {
      id: "u12-l5-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Full Picture",
        body: "You now know all four functions in your stack: {{dominantFunction}} (dominant), {{auxiliaryFunction}} (auxiliary), {{tertiaryFunction}} (tertiary), and {{inferiorFunction}} (inferior). Together, they form a dynamic system that shapes how you think, decide, and experience life.",
        highlight: "dynamic system",
      },
    },
    {
      id: "u12-l5-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "A Team, Not a List",
        body: "Your stack isn't just a ranked list, it's a team. {{dominantFunction}} leads, {{auxiliaryFunction}} supports, {{tertiaryFunction}} adds creativity, and even {{inferiorFunction}} has gifts to offer when you're not under stress. The goal isn't to make all four equal, but to appreciate what each contributes.",
        highlight: "team",
      },
    },
    {
      id: "u12-l5-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the correct order of your {{cognitiveType}} function stack?",
        options: [
          "{{dominantFunction}} → {{auxiliaryFunction}} → {{tertiaryFunction}} → {{inferiorFunction}}",
          "{{inferiorFunction}} → {{tertiaryFunction}} → {{auxiliaryFunction}} → {{dominantFunction}}",
          "{{auxiliaryFunction}} → {{dominantFunction}} → {{inferiorFunction}} → {{tertiaryFunction}}",
          "{{tertiaryFunction}} → {{inferiorFunction}} → {{dominantFunction}} → {{auxiliaryFunction}}",
        ],
        correctIndex: 0,
        explanation: "Your stack goes from strongest to weakest: {{dominantFunction}} (dominant) → {{auxiliaryFunction}} (auxiliary) → {{tertiaryFunction}} (tertiary) → {{inferiorFunction}} (inferior).",
      },
    },
    {
      id: "u12-l5-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How many cognitive functions does everyone actually use?",
        options: [
          "Only their dominant, one function",
          "Just the top two",
          "All eight, but in a specific preference order",
          "It varies randomly from day to day",
        ],
        correctIndex: 2,
        explanation: "Everyone uses all eight cognitive functions! But your type determines the order of preference. Your top four form your primary stack, and the other four operate in the shadow.",
      },
    },
    {
      id: "u12-l5-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Why do different types experience the same situation differently?",
        options: [
          "Because they have completely different brains",
          "Because they lead with different dominant functions and have different stack orders",
          "Because some people are smarter than others",
          "They don't, everyone experiences things the same way",
        ],
        correctIndex: 1,
        explanation: "The function stack order is what creates different 'flavors' of personality. A type that leads with {{dominantFunction}} will process the same event very differently from someone who leads with {{inferiorFunction}}.",
      },
    },
    {
      id: "u12-l5-e6",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort your functions from strongest (top) to weakest (bottom):",
        categories: ["1st (Dominant)", "2nd (Auxiliary)", "3rd (Tertiary)", "4th (Inferior)"],
        items: [
          { text: "{{tertiaryFunction}}", categoryIndex: 2 },
          { text: "{{dominantFunction}}", categoryIndex: 0 },
          { text: "{{inferiorFunction}}", categoryIndex: 3 },
          { text: "{{auxiliaryFunction}}", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u12-l5-e7",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each function to its role in your stack:",
        pairs: [
          { left: "{{dominantFunctionName}}", right: "Your automatic superpower" },
          { left: "{{auxiliaryFunctionName}}", right: "Your balancing partner" },
          { left: "{{tertiaryFunctionName}}", right: "Your playful creative side" },
          { left: "{{inferiorFunctionName}}", right: "Your blind spot (grip under stress)" },
        ],
      },
    },
    {
      id: "u12-l5-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "The cognitive stack determines your type. Your stack ({{dominantFunction}}-{{auxiliaryFunction}}-{{tertiaryFunction}}-{{inferiorFunction}}) makes you a ___.",
        options: ["{{cognitiveType}}", "generic thinker", "random type", "non-type"],
        correctIndex: 0,
        explanation: "Your specific stack order is what makes you a {{cognitiveType}}. Change the order, and you get a completely different type!",
      },
    },
    {
      id: "u12-l5-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "You're planning a vacation with friends. Your dominant {{dominantFunction}} takes the lead in how you approach the planning. Your auxiliary {{auxiliaryFunction}} kicks in to balance things out. When you're daydreaming about the trip, your tertiary {{tertiaryFunction}} adds some creative ideas. And your inferior {{inferiorFunction}}? It might cause you some anxiety about aspects of the trip you're less comfortable with.",
        question: "What does this scenario illustrate about your function stack?",
        options: [
          "You should only use your dominant function for planning",
          "All four functions contribute to how you experience life, each in its own way",
          "The inferior function ruins everything",
          "Only the top two functions matter in real life",
        ],
        correctIndex: 1,
        explanation: "This is the stack in action! Each function plays its role, leading, supporting, playing, and challenging. That's the richness of being a {{cognitiveType}}.",
      },
    },
    {
      id: "u12-l5-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Someone with the OPPOSITE function stack from you (their dominant is your inferior, and vice versa) approaches a problem. You watch them and feel a mix of admiration and frustration, they make your weakest function look effortless, but they seem to struggle with things that come naturally to you.",
        question: "What explains this dynamic?",
        options: [
          "They're a better person than you",
          "Their dominant is your inferior and vice versa, you have mirror-image strengths and weaknesses",
          "They must be faking their abilities",
          "Cognitive functions don't actually affect how people think",
        ],
        correctIndex: 1,
        explanation: "This is one of the most fascinating aspects of type theory. Someone whose dominant is {{inferiorFunction}} will find effortless what you find exhausting, and they'll struggle with what comes naturally to you ({{dominantFunction}}).",
      },
    },
    {
      id: "u12-l5-e11",
      difficulty: 3,
      content: {
        type: "multiple-choice",
        question: "What's the ultimate goal of understanding your function stack?",
        options: [
          "To prove your type is the best",
          "To avoid ever using your weaker functions",
          "To gain self-awareness, knowing your strengths, growth areas, and stress patterns",
          "To change your type to a better one",
        ],
        correctIndex: 2,
        explanation: "Understanding your stack is about self-awareness, not self-limitation. Knowing that you lead with {{dominantFunction}} and struggle with {{inferiorFunction}} helps you leverage your strengths and be compassionate about your challenges.",
      },
    },
    {
      id: "u12-l5-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "As a {{cognitiveType}}, your complete function stack is:",
        options: [
          "{{dominantFunction}} → {{auxiliaryFunction}} → {{tertiaryFunction}} → {{inferiorFunction}}",
          "{{inferiorFunction}} → {{dominantFunction}} → {{auxiliaryFunction}} → {{tertiaryFunction}}",
          "{{auxiliaryFunction}} → {{tertiaryFunction}} → {{dominantFunction}} → {{inferiorFunction}}",
          "{{tertiaryFunction}} → {{dominantFunction}} → {{inferiorFunction}} → {{auxiliaryFunction}}",
        ],
        correctIndex: 0,
        explanation: "Nailed it! Your {{cognitiveType}} stack: {{dominantFunction}} (dominant) → {{auxiliaryFunction}} (auxiliary) → {{tertiaryFunction}} (tertiary) → {{inferiorFunction}} (inferior). You know your mind!",
      },
    },
  ],
  xpReward: 25,
  personalized: true,
  personalizeFor: "cognitiveType",
};

// ── Export ───────────────────────────────────────────────────────────────────

export const unit12Lessons: Lesson[] = [lesson1, lesson2, lesson3, lesson4, lesson5];
