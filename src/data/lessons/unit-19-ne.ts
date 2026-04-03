// ─────────────────────────────────────────────────────────────────────────────
// Unit 19, Extraverted Intuition (Ne)
// Possibility generator, connections everywhere, brainstorming engine
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson } from "@/types/lessons";

const UNIT_ID = "ne";

// ── Lesson 1: What IS Ne? ─────────────────────────────────────────────────

const lesson1: Lesson = {
  id: "u19-l1",
  unitId: UNIT_ID,
  order: 1,
  title: "The Possibility Engine",
  subtitle: "What Extraverted Intuition feels like from the inside",
  xpReward: 20,
  exercises: [
    {
      id: "u19-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "What Is Extraverted Intuition?",
        body: "Ne is a possibility generator that looks at any single thing and immediately sees what ELSE it could be, what it connects to, and where it could go. It asks: 'What COULD this be? What else connects to this?' Ne is the '47 open browser tabs' function, every idea spawns five more.",
        highlight: "possibility generator",
      },
    },
    {
      id: "u19-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Ne from the Inside",
        body: "People with strong Ne describe a mind that never stops making connections. A conversation about breakfast leads to a thought about nutrition, which leads to an idea about farming, which leads to a business concept. It's exhilarating, and exhausting. 'Oh, that reminds me...' is Ne's catchphrase.",
        highlight: "never stops making connections",
      },
    },
    {
      id: "u19-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core question that Ne asks?",
        options: [
          "What is this REALLY about deep down?",
          "What COULD this be? What else connects to this?",
          "What does the data objectively show?",
          "What happened last time we tried this?",
        ],
        correctIndex: 1,
        explanation: "Ne is always looking outward at possibilities. It doesn't want the one answer, it wants the entire landscape of 'what ifs' and hidden connections between seemingly unrelated things.",
      },
    },
    {
      id: "u19-l1-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Why is Ne often compared to having '47 open browser tabs'?",
        options: [
          "Because Ne users spend a lot of time on the internet",
          "Because Ne constantly generates new threads of possibility, each one spawning more connections",
          "Because Ne users have trouble with technology",
          "Because Ne users prefer reading to talking",
        ],
        correctIndex: 1,
        explanation: "The browser tab metaphor captures Ne's divergent nature perfectly. Every idea opens up new ideas, which open up more ideas. The Ne mind is a branching tree of possibilities that keeps growing.",
      },
    },
    {
      id: "u19-l1-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does Ne process information differently from Ni?",
        options: [
          "Ne converges many inputs into one insight",
          "Ne takes one input and diverges it into many possibilities",
          "Ne focuses on past experiences",
          "Ne processes emotions internally",
        ],
        correctIndex: 1,
        explanation: "Ne diverges, one idea becomes many. Ni converges, many ideas become one. This is THE critical distinction between the two intuitive functions.",
      },
    },
    {
      id: "u19-l1-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each Ne characteristic to its description.",
        pairs: [
          { left: "Divergent thinking", right: "One idea spawns many possibilities" },
          { left: "Tangential leaps", right: "'Oh, that reminds me of...'" },
          { left: "Pattern connections", right: "Sees links between unrelated things" },
          { left: "Novelty seeking", right: "Drawn to new ideas over routine" },
          { left: "Brainstorming", right: "Energized by generating options" },
        ],
      },
    },
    {
      id: "u19-l1-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Ne takes one input and ___ it into many possibilities, connections, and 'what ifs.'",
        options: ["diverges", "converges", "memorizes", "suppresses"],
        correctIndex: 0,
        explanation: "Divergence is Ne's signature move. While Ni converges many inputs into one insight, Ne does the opposite, exploding a single idea outward into a web of related possibilities.",
      },
    },
    {
      id: "u19-l1-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Ne users are often drawn to ___ because every idea energizes them with a burst of exciting potential before the next shiny idea appears.",
        options: ["novelty", "routine", "solitude", "precision"],
        correctIndex: 0,
        explanation: "Ne thrives on newness. The initial spark of a new idea, connection, or possibility is where Ne feels most alive. The challenge is that the next spark is always more exciting than following through on the last one.",
      },
    },
    {
      id: "u19-l1-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "At a team meeting about improving customer service, Sam suddenly says, 'What if we gamified the whole experience? Actually, wait, what if customers could rate us in real-time like Uber? Oh, and that makes me think, what if we built a community forum where customers help each other? That could also work for...' The team leader cuts Sam off: 'Can we just pick ONE idea?'",
        question: "What cognitive function is Sam demonstrating?",
        options: [
          "Te, organizing systems efficiently",
          "Ni, converging on a single strategic vision",
          "Ne, generating a rapid-fire web of divergent possibilities from one starting point",
          "Se, responding to the immediate physical environment",
        ],
        correctIndex: 2,
        explanation: "This is textbook Ne: one prompt (customer service) triggers an expanding web of possibilities, each one spawning the next. Ne users often get told to 'pick one' because their idea generation outpaces everyone else's ability to process.",
      },
    },
    {
      id: "u19-l1-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "During a road trip, Alex sees a billboard for a zoo. Within sixty seconds, Alex has said: 'Zoos are interesting, did you know some zoos are doing virtual reality experiences now? VR is going to change education completely. Imagine VR history classes where you WALK through ancient Rome. Actually, that's a startup idea. We should write that down. Also, ancient Rome reminds me, have you watched that new documentary?'",
        question: "What is happening in Alex's mind?",
        options: [
          "Alex has ADHD and can't focus",
          "Alex's Ne is making rapid associative leaps, each idea triggers connections to the next in an expanding web",
          "Alex is using Si to recall past memories",
          "Alex is nervous and filling silence",
        ],
        correctIndex: 1,
        explanation: "This rapid chain of associations, zoo to VR to education to Rome to documentary, is classic Ne. Each idea triggers unexpected connections to the next. It looks scattered from the outside, but there IS a thread connecting each leap.",
      },
    },
    {
      id: "u19-l1-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these experiences into Ne expressions vs. NOT Ne expressions.",
        categories: ["Ne Expression", "Not Ne"],
        items: [
          { text: "Seeing five potential uses for an everyday object", categoryIndex: 0 },
          { text: "Following a proven step-by-step procedure", categoryIndex: 1 },
          { text: "Conversations that hop between seemingly random topics", categoryIndex: 0 },
          { text: "A quiet, focused vision of a single future outcome", categoryIndex: 1 },
          { text: "Getting excited about a new idea before finishing the last one", categoryIndex: 0 },
          { text: "Carefully reviewing what worked in the past", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u19-l1-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which types have Ne as their DOMINANT (first) function?",
        options: [
          "INTJ and INFJ",
          "ENTP and ENFP",
          "ISTJ and ISFJ",
          "ESTP and ESFP",
        ],
        correctIndex: 1,
        explanation: "ENTP (Ne-Ti-Fe-Si) and ENFP (Ne-Fi-Te-Si) lead with Ne as their dominant function. They are the quintessential brainstormers and possibility-seekers.",
      },
    },
  ],
};

// ── Lesson 2: Ne in Different Stack Positions ──────────────────────────────

const lesson2: Lesson = {
  id: "u19-l2",
  unitId: UNIT_ID,
  order: 2,
  title: "Ne in Your Stack",
  subtitle: "How Ne looks as dominant, auxiliary, tertiary, or inferior",
  xpReward: 25,
  exercises: [
    {
      id: "u19-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Stack Position Changes Everything",
        body: "Ne as a dominant function (ENTP, ENFP) creates people who live in a constant stream of possibilities and connections. Ne as an inferior function (ISTJ, ISFJ) manifests as catastrophic 'what if' spirals, paranoid worst-case scenarios that feel paralyzing and inescapable.",
        highlight: "Stack position changes everything",
      },
    },
    {
      id: "u19-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Beebe Model & Ne",
        body: "In Beebe's archetypal model, dominant Ne is the Hero, the trusted possibility-spotter that sees potential everywhere. Inferior Ne is the Anima/Animus, producing terrifying 'what if' catastrophes instead of exciting possibilities when it erupts under stress.",
        highlight: "Hero vs. Anima/Animus",
      },
    },
    {
      id: "u19-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does DOMINANT Ne (ENTP/ENFP) typically appear in everyday life?",
        options: [
          "Methodical, detail-oriented, following proven procedures",
          "Constantly generating ideas, making unexpected connections, and seeing potential in everything",
          "Quietly focused on a single long-term vision",
          "Carefully maintaining traditions and routines",
        ],
        correctIndex: 1,
        explanation: "Dominant Ne users are the quintessential idea people. They see possibilities everywhere, make surprising connections between unrelated things, and are energized by novelty and brainstorming.",
      },
    },
    {
      id: "u19-l2-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "When Ne is the AUXILIARY (second) function, as in INTP and INFP, how does it typically show up?",
        options: [
          "As the primary driver of their personality",
          "As a supporting exploration engine that serves the dominant introverted judging function",
          "As an unconscious, frightening force",
          "As something they actively suppress",
        ],
        correctIndex: 1,
        explanation: "Auxiliary Ne supports the dominant function. INTPs use Ne to feed their Ti with new ideas to analyze; INFPs use Ne to explore possibilities that resonate with their Fi values.",
      },
    },
    {
      id: "u19-l2-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which types have Ne as their INFERIOR (fourth) function?",
        options: [
          "ENTP and ENFP",
          "INTP and INFP",
          "ISTJ and ISFJ",
          "INTJ and INFJ",
        ],
        correctIndex: 2,
        explanation: "ISTJ (Si-Te-Fi-Ne) and ISFJ (Si-Fe-Ti-Ne) have Ne in the inferior position. These stability-oriented, detail-focused types have the hardest relationship with open-ended possibilities.",
      },
    },
    {
      id: "u19-l2-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each stack position to how Ne manifests.",
        pairs: [
          { left: "Dominant (ENTP/ENFP)", right: "Endless idea generation, sees potential everywhere" },
          { left: "Auxiliary (INTP/INFP)", right: "Exploration engine serving inner judgment" },
          { left: "Tertiary (ESTJ/ESFJ)", right: "Growing appreciation for new approaches" },
          { left: "Inferior (ISTJ/ISFJ)", right: "Catastrophic 'what if' spirals under stress" },
        ],
      },
    },
    {
      id: "u19-l2-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "An ISTJ under extreme stress may experience their inferior Ne as paralyzing 'what if' ___, imagining every possible thing that could go wrong.",
        options: ["spirals", "celebrations", "routines", "frameworks"],
        correctIndex: 0,
        explanation: "When inferior Ne erupts in Si-dominant types, possibilities become THREATS instead of opportunities. The normally grounded, practical person becomes overwhelmed by an avalanche of worst-case scenarios.",
      },
    },
    {
      id: "u19-l2-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Dominant Ne sees possibilities as ___; inferior Ne sees possibilities as ___.",
        options: ["exciting / terrifying", "boring / interesting", "logical / emotional", "past / future"],
        correctIndex: 0,
        explanation: "This is the core difference between healthy and inferior Ne. Dominant Ne users are energized and excited by the endless web of 'what if.' Inferior Ne users are paralyzed and terrified by it.",
      },
    },
    {
      id: "u19-l2-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Margaret, an ISFJ, is normally calm, reliable, and grounded. But when she finds out her adult son is moving to a different country, she spirals: 'What if the plane crashes? What if he gets sick and there's no good hospital? What if he can't find work? What if he's lonely? What if there's a war?' She can't sleep for days, trapped in an escalating loop of catastrophic possibilities.",
        question: "What is happening psychologically?",
        options: [
          "She's using her dominant Si to remember past dangers",
          "Her inferior Ne has her in its grip, possibilities have become threats",
          "She's using Fe to worry about group harmony",
          "She's developing healthy Ne by exploring possibilities",
        ],
        correctIndex: 1,
        explanation: "This is a classic inferior Ne grip. The Si-dominant person, normally grounded in concrete reality, gets hijacked by Ne, but instead of exciting possibilities, it generates an endless cascade of terrifying 'what ifs' that feel completely real.",
      },
    },
    {
      id: "u19-l2-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two people are told their company might restructure. Person A (ENFP) says: 'Ooh, restructuring! Maybe I could switch departments, or maybe this is a sign to finally start that side project, or maybe they'll create a whole new role that's perfect for me!' Person B (ISTJ) says: 'Restructuring? What if I lose my job? What if the whole department gets cut? What if I can't find something else at my age?'",
        question: "What explains the difference in their responses?",
        options: [
          "Person A is just more optimistic than Person B",
          "Person A has dominant Ne (possibilities = exciting); Person B has inferior Ne (possibilities = catastrophic)",
          "Person A is using Ni, Person B is using Si",
          "Person B is more realistic than Person A",
        ],
        correctIndex: 1,
        explanation: "Same trigger, opposite Ne experiences. Dominant Ne sees open-ended change as thrilling, full of potential and opportunity. Inferior Ne sees open-ended change as terrifying, full of unpredictable threats.",
      },
    },
    {
      id: "u19-l2-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these experiences into Dominant Ne vs. Inferior Ne.",
        categories: ["Dominant Ne", "Inferior Ne"],
        items: [
          { text: "Excited brainstorming: 'What if we tried THIS?'", categoryIndex: 0 },
          { text: "Paralyzed by worst-case scenarios", categoryIndex: 1 },
          { text: "Seeing potential and opportunity in every change", categoryIndex: 0 },
          { text: "Catastrophic 'what if' loops at 3am", categoryIndex: 1 },
          { text: "Energized by novelty and open-ended situations", categoryIndex: 0 },
          { text: "Feeling overwhelmed by too many unknown variables", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u19-l2-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "True or false: Ne works the same way regardless of its position in someone's cognitive stack.",
        options: [
          "True, Ne is Ne",
          "False, stack position dramatically changes how Ne manifests",
          "True, but only for extroverts",
          "False, but only because of intelligence differences",
        ],
        correctIndex: 1,
        explanation: "Stack position is crucial. Dominant Ne is exciting possibility generation. Inferior Ne is catastrophic worst-case spiraling. Same function, completely different experience.",
      },
    },
  ],
};

// ── Lesson 3: Ne in Real Life ──────────────────────────────────────────────

const lesson3: Lesson = {
  id: "u19-l3",
  unitId: UNIT_ID,
  order: 3,
  title: "Ne in the Wild",
  subtitle: "Relationships, work, stress, and creativity through the Ne lens",
  xpReward: 25,
  exercises: [
    {
      id: "u19-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Ne in Relationships",
        body: "Ne users bring excitement, novelty, and spontaneity to relationships. They see their partner's hidden potential and get genuinely thrilled by it. The downside: they can struggle with follow-through, get bored by routine, and accidentally make partners feel like 'just another interesting idea.'",
        highlight: "hidden potential",
      },
    },
    {
      id: "u19-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Ne Under Stress",
        body: "When stressed, dominant Ne users can fall into a 'grip' of their inferior function Si. For ENTPs and ENFPs, this means obsessive focus on past mistakes, physical symptoms, and a suffocating feeling that nothing will ever change, the exact opposite of their normal expansive optimism.",
        highlight: "Si grip",
      },
    },
    {
      id: "u19-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does Ne typically show up at work?",
        options: [
          "Following standard operating procedures to the letter",
          "Brainstorming, innovating, seeing opportunities others miss, and connecting dots across departments",
          "Quietly focusing on one task until it's perfect",
          "Managing everyone's emotions and maintaining group harmony",
        ],
        correctIndex: 1,
        explanation: "Ne excels at innovation, brainstorming, and cross-pollination of ideas. Ne users are the ones who say 'what if we combined THIS department's approach with THAT one's problem?', seeing connections across silos.",
      },
    },
    {
      id: "u19-l3-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What happens to an ENFP in an 'Si grip' (extreme stress)?",
        options: [
          "They become even more scattered and idea-driven",
          "They obsess over past mistakes, fixate on physical symptoms, and feel trapped in hopeless routine",
          "They become hyper-organized and efficiency-focused",
          "They start making dark predictions about the future",
        ],
        correctIndex: 1,
        explanation: "The ENFP's inferior function is Si. In a grip, ENFPs flip from expansive optimism to a dark fixation on the past, ruminating over mistakes, noticing every bodily ache, and feeling like nothing will ever be new or exciting again.",
      },
    },
    {
      id: "u19-l3-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Why do Ne users often struggle with follow-through?",
        options: [
          "They're lazy",
          "The initial spark of a new idea is always more exciting than the hard work of implementing the last one",
          "They lack intelligence",
          "They don't care about results",
        ],
        correctIndex: 1,
        explanation: "Ne is energized by NOVELTY. The moment an idea stops being new, Ne wants to move on to the next shiny possibility. This makes Ne users brilliant starters but often reluctant finishers.",
      },
    },
    {
      id: "u19-l3-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each life domain to how Ne shows up in it.",
        pairs: [
          { left: "Relationships", right: "Sees partner's potential, brings spontaneity" },
          { left: "Work", right: "Brainstorming engine, cross-pollinates ideas" },
          { left: "Stress", right: "Si grip: fixation on past mistakes and physical symptoms" },
          { left: "Creativity", right: "Mashups, unexpected combinations, genre-bending" },
          { left: "Conflict", right: "Reframes the problem into new possibilities" },
        ],
      },
    },
    {
      id: "u19-l3-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Ne-driven creativity tends to be about unexpected ___, combining ideas from different domains in ways nobody expected.",
        options: ["combinations", "memories", "hierarchies", "schedules"],
        correctIndex: 0,
        explanation: "Ne creativity is combinatorial. It mashes together ideas from different worlds, a cooking show meets a detective story, jazz meets electronic music, psychology meets game design. The magic is in the unexpected connections.",
      },
    },
    {
      id: "u19-l3-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Ne users often excel at ___ because they can think on their feet, make unexpected connections, and turn anything into something entertaining.",
        options: ["improv comedy", "detailed accounting", "silent meditation", "repetitive assembly"],
        correctIndex: 0,
        explanation: "Improv comedy is basically Ne in performance mode: take any input, make surprising connections, generate something nobody expected. The 'yes, and...' principle of improv IS how Ne naturally thinks.",
      },
    },
    {
      id: "u19-l3-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Raj, an ENTP, has started 12 different side projects in the past two years. Each one began with intense excitement: 'THIS is the one!' But within weeks, he'd spot a new opportunity and pivot. His partner is frustrated: 'You never finish anything.' Raj says, 'But each new idea is genuinely better than the last!'",
        question: "What is happening with Raj's Ne?",
        options: [
          "He's being irresponsible and needs more discipline",
          "His dominant Ne is working as designed, constantly generating more exciting possibilities, but without a developed auxiliary (Ti), he lacks the filter to commit",
          "He's in an Ni grip",
          "He's using Se to chase sensory thrills",
        ],
        correctIndex: 1,
        explanation: "This is Ne's classic blessing and curse. The function WORKS, it genuinely does find exciting new possibilities. The problem isn't the idea generation; it's the lack of a developed judging function to evaluate which ideas deserve commitment.",
      },
    },
    {
      id: "u19-l3-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Kim, an ENFP, has been in the same job for five years. Lately she describes feeling 'dead inside', the role is stable and pays well, but every day feels identical. She's started getting headaches, obsessing over a mistake she made three years ago, and telling friends, 'I feel like I'm suffocating.'",
        question: "What is most likely causing Kim's distress?",
        options: [
          "She needs a vacation",
          "Her Ne is starving from lack of novelty, and she's falling into an Si grip, fixating on the past and physical symptoms",
          "She needs to work harder at her current job",
          "She's developing healthy Si by appreciating stability",
        ],
        correctIndex: 1,
        explanation: "When Ne-dominant types are trapped in unstimulating routine, their Ne starves. The inferior Si starts taking over, manifesting as obsessive rumination about past mistakes, hypochondriac symptoms, and a crushing sense that nothing will ever change.",
      },
    },
    {
      id: "u19-l3-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these workplace situations into 'Ne-friendly' vs. 'Ne-hostile.'",
        categories: ["Ne-Friendly", "Ne-Hostile"],
        items: [
          { text: "Brainstorming sessions with no bad ideas", categoryIndex: 0 },
          { text: "Strict adherence to one established method", categoryIndex: 1 },
          { text: "Cross-functional projects with diverse teams", categoryIndex: 0 },
          { text: "Repetitive daily tasks with zero variation", categoryIndex: 1 },
          { text: "Freedom to explore unconventional solutions", categoryIndex: 0 },
          { text: "Told 'we've always done it this way'", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u19-l3-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which of these is a common strength of Ne in everyday life?",
        options: [
          "Following through on long-term projects",
          "Seeing potential and hidden connections that others miss entirely",
          "Maintaining consistent daily routines",
          "Focusing deeply on one thing for hours without distraction",
        ],
        correctIndex: 1,
        explanation: "Ne's superpower is seeing what COULD be, potential, connections, and possibilities that are invisible to other functions. This makes Ne users natural innovators, entrepreneurs, and creative problem-solvers.",
      },
    },
  ],
};

// ── Lesson 4: Spotting Ne & Common Confusions ──────────────────────────────

const lesson4: Lesson = {
  id: "u19-l4",
  unitId: UNIT_ID,
  order: 4,
  title: "Ne vs. the Imposters",
  subtitle: "Spotting Ne in others and distinguishing it from similar functions",
  xpReward: 30,
  exercises: [
    {
      id: "u19-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Critical Distinction: Ne vs. Se",
        body: "Ne and Se are BOTH extraverted perceiving functions, but they perceive completely different things. Ne perceives abstract possibilities, what COULD be. Se perceives concrete reality, what IS. Ne sees the potential in a run-down building; Se sees the crumbling walls.",
        highlight: "possibilities vs. reality",
      },
    },
    {
      id: "u19-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Ne vs. Ni: Revisited",
        body: "Ne and Ni are both intuition, but they diverge and converge in opposite ways. Ne brainstorms 20 ideas and wants to explore all of them. Ni processes 20 inputs and delivers one conclusion. Ne is a searchlight scanning the horizon; Ni is a laser beam drilling into one point.",
        highlight: "searchlight vs. laser beam",
      },
    },
    {
      id: "u19-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the KEY difference between Ne and Se?",
        options: [
          "Ne is faster than Se",
          "Ne perceives abstract possibilities, Se perceives concrete present-moment reality",
          "Ne is for introverts, Se is for extroverts",
          "Ne is about thinking, Se is about feeling",
        ],
        correctIndex: 1,
        explanation: "Both are extraverted perceiving functions, but they perceive different domains. Ne looks at the world and sees what COULD be (abstract). Se looks at the world and sees what IS (concrete). Same direction, different content.",
      },
    },
    {
      id: "u19-l4-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Someone walks into an abandoned warehouse and says: 'This could be a co-working space! Or a climbing gym! Or an art gallery! Or all three!' Which function is this?",
        options: [
          "Se, they're taking in the physical environment",
          "Ne, they're generating possibilities from a single stimulus",
          "Ni, they're having a convergent insight",
          "Si, they're recalling past warehouse experiences",
        ],
        correctIndex: 1,
        explanation: "Taking one input (abandoned warehouse) and immediately generating multiple possibilities for what it COULD become is pure Ne. An Se user would notice the exposed brick, the echo, the temperature. An Ni user would sense what the space 'wants to be.'",
      },
    },
    {
      id: "u19-l4-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Why is Ne sometimes confused with ADHD?",
        options: [
          "Because Ne users literally have ADHD",
          "Because Ne's rapid idea-hopping and difficulty with follow-through can look like inattention, even when it's a cognitive preference",
          "Because Ne users can't focus on anything ever",
          "Because ADHD is actually just Ne",
        ],
        correctIndex: 1,
        explanation: "Ne's rapid associative thinking, jumping from idea to idea, struggling with routine tasks, getting bored easily, can mimic ADHD symptoms. However, Ne is a cognitive PREFERENCE, not a disorder. Some people have both, but they're not the same thing.",
      },
    },
    {
      id: "u19-l4-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each response to the correct cognitive function.",
        pairs: [
          { left: "Ne", right: "'What if we tried it this way? Or this way? Or...'" },
          { left: "Se", right: "'Look at that sunset, the colors are incredible right now'" },
          { left: "Ni", right: "'I see where all of this is heading'" },
          { left: "Ne", right: "'That's like when you combine X with Y and get Z!'" },
        ],
      },
    },
    {
      id: "u19-l4-e7",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort these perceiving experiences into Ne vs. Se.",
        categories: ["Ne", "Se"],
        items: [
          { text: "Seeing potential in a run-down neighborhood", categoryIndex: 0 },
          { text: "Noticing the texture and smell of fresh bread", categoryIndex: 1 },
          { text: "Connecting a news story to an unrelated business idea", categoryIndex: 0 },
          { text: "Reacting instantly to a ball thrown at your head", categoryIndex: 1 },
          { text: "Seeing metaphors and double meanings in everything", categoryIndex: 0 },
          { text: "Fully absorbed in the physical thrill of a rollercoaster", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u19-l4-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Ne is like a ___ scanning the horizon for possibilities; Ni is like a ___ drilling into one point of insight.",
        options: ["searchlight / laser beam", "camera / mirror", "book / movie", "speaker / microphone"],
        correctIndex: 0,
        explanation: "The searchlight vs. laser beam metaphor captures the core difference. Ne casts a wide beam, illuminating many possibilities at once. Ni focuses all energy into a single penetrating point of understanding.",
      },
    },
    {
      id: "u19-l4-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two friends visit a farmers' market. Friend A says: 'These heirloom tomatoes are gorgeous, feel how heavy this one is! And smell that basil!' Friend B says: 'Ooh, heirloom tomatoes! You know what would be amazing? A subscription box for heritage vegetables. Or a cooking show where every episode uses ONE ingredient 10 different ways. Actually, that reminds me of a podcast I heard about...'",
        question: "Which friend is using Ne and which is using Se?",
        options: [
          "Friend A = Ne, Friend B = Se",
          "Friend A = Se, Friend B = Ne",
          "Both are using Ne",
          "Both are using Se",
        ],
        correctIndex: 1,
        explanation: "Friend A is fully present in the sensory experience, touch, sight, smell (Se). Friend B immediately launches from the physical tomatoes into abstract possibilities and connections (Ne). Same market, completely different experiences.",
      },
    },
    {
      id: "u19-l4-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "During a strategy meeting, two people respond to a new competitor entering the market. Person A says: 'We need to differentiate, what if we pivoted to a premium model? Or partnered with Company X? Or targeted a totally different demographic? Let me brainstorm ten options.' Person B says: 'I've been sensing this was coming for months. The whole market is converging toward one model, and we need to be the first to get there.'",
        question: "Which person is using Ne and which is using Ni?",
        options: [
          "Person A = Ni, Person B = Ne",
          "Person A = Ne, Person B = Ni",
          "Both are using Ne",
          "Both are using Ni",
        ],
        correctIndex: 1,
        explanation: "Person A generates multiple divergent possibilities from one stimulus (Ne). Person B has a convergent insight about where the entire market is heading, one unified vision (Ni). Divergence vs. convergence in action.",
      },
    },
    {
      id: "u19-l4-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "You're trying to determine if someone uses Ne or is just 'creative.' They constantly have new ideas and get excited about them, but they also frequently abandon projects mid-way.",
        question: "What is the best way to tell if this is Ne specifically?",
        options: [
          "Ask if their ideas emerge from connecting seemingly UNRELATED things, Ne makes associative leaps across domains, while general creativity can be methodical",
          "There is no difference, creativity IS Ne",
          "Check if they're an extrovert, only extroverts have Ne",
          "Ne users never finish anything; creative people always do",
        ],
        correctIndex: 0,
        explanation: "The hallmark of Ne is ASSOCIATIVE leaping, connecting ideas across domains that don't obviously belong together. General creativity can be systematic and focused. Ne creativity is specifically about unexpected cross-domain connections and divergent possibility generation.",
      },
    },
    {
      id: "u19-l4-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Quick review: Ne is best described as...",
        options: [
          "An unconscious pattern-synthesis engine that converges on one insight",
          "A possibility generator that takes one input and diverges into many connections",
          "A detailed sensory awareness of the present moment",
          "An internal compass that evaluates against personal values",
        ],
        correctIndex: 1,
        explanation: "Ne is the divergent possibility engine. It takes any single input and explodes it outward into a web of 'what ifs,' connections, and potential, seeing what COULD be rather than what is.",
      },
    },
  ],
};

export const unit19Lessons: Lesson[] = [lesson1, lesson2, lesson3, lesson4];
