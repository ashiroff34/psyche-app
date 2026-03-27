// ─────────────────────────────────────────────────────────────────────────────
// Unit 17 — Extraverted Thinking (Te)
// Results machine, external organization, measurable effectiveness
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson } from "@/types/lessons";

const UNIT_ID = "te";

// ── Lesson 1: What IS Te? ─────────────────────────────────────────────────

const lesson1: Lesson = {
  id: "u17-l1",
  unitId: UNIT_ID,
  order: 1,
  title: "The Results Machine",
  subtitle: "What Extraverted Thinking feels like from the inside",
  xpReward: 20,
  exercises: [
    {
      id: "u17-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "What Is Extraverted Thinking?",
        body: "Te is an organizing force that structures the external world for efficiency and measurable results. It asks: 'What works? What do the results show? What's the most effective path to the outcome?' Te doesn't care about elegant theory — it cares about getting things done.",
        highlight: "measurable results",
      },
    },
    {
      id: "u17-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Te from the Inside",
        body: "People with strong Te describe an almost involuntary drive to organize, optimize, and execute. They walk into a messy room and see systems to fix. They hear a plan and immediately spot inefficiencies. Not doing something about it feels physically uncomfortable.",
        highlight: "organize, optimize, execute",
      },
    },
    {
      id: "u17-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core question Te asks?",
        options: [
          "How do I feel about this?",
          "Is this internally consistent?",
          "What works and what do the results show?",
          "What are all the possibilities?",
        ],
        correctIndex: 2,
        explanation: "Te is laser-focused on effectiveness. It measures success by external, verifiable results — not by how elegant the theory is, not by how it feels, but by what actually WORKS.",
      },
    },
    {
      id: "u17-l1-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which best describes Te's relationship to theory?",
        options: [
          "Te loves building elaborate theories",
          "Te values theory only insofar as it produces practical results",
          "Te rejects all forms of thinking",
          "Te and theory are the same thing",
        ],
        correctIndex: 1,
        explanation: "Te is pragmatic about theory. A beautiful theoretical framework that doesn't produce results is worthless to Te. A simple, ugly approach that gets measurable outcomes is preferable.",
      },
    },
    {
      id: "u17-l1-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which types have Te as their DOMINANT function?",
        options: [
          "INTP and ISTP",
          "ENTJ and ESTJ",
          "INFP and ISFP",
          "ENFP and ENTP",
        ],
        correctIndex: 1,
        explanation: "ENTJ (Te-Ni-Se-Fi) and ESTJ (Te-Si-Ne-Fi) lead with Te. Their primary engagement with the world is organizing it for maximum effectiveness.",
      },
    },
    {
      id: "u17-l1-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each Te characteristic to its description.",
        pairs: [
          { left: "Results Orientation", right: "Success measured by tangible outcomes" },
          { left: "Systems Building", right: "Creates external structures for efficiency" },
          { left: "Delegation", right: "Assigns tasks to maximize overall output" },
          { left: "Decisiveness", right: "Makes quick calls based on available data" },
          { left: "Accountability", right: "Holds self and others to measurable standards" },
        ],
      },
    },
    {
      id: "u17-l1-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Te organizes the ___ world for efficiency, while Ti organizes the ___ world for logical consistency.",
        options: ["external / internal", "internal / external", "social / personal", "past / future"],
        correctIndex: 0,
        explanation: "The i/e distinction is about direction. Te faces outward — organizing systems, processes, and people in the external world. Ti faces inward — organizing ideas, models, and logical frameworks in the internal world.",
      },
    },
    {
      id: "u17-l1-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Te users often have a natural ability to ___ — breaking complex goals into actionable steps with deadlines.",
        options: ["create action plans", "build theories", "read emotions", "generate ideas"],
        correctIndex: 0,
        explanation: "Te excels at turning abstract goals into concrete, step-by-step plans with deadlines and accountability. This is the function behind project management, business strategy, and operational efficiency.",
      },
    },
    {
      id: "u17-l1-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "A team is planning a charity event. One member immediately starts creating a project timeline, assigning roles, setting a budget, and establishing success metrics. When someone suggests a more creative but untested approach, they respond: 'That sounds fun, but show me data that it works. We have one shot at this.'",
        question: "What Te behavior is this person demonstrating?",
        options: [
          "Being controlling and rigid",
          "Using Te to organize resources, measure outcomes, and demand evidence-based decisions",
          "Using Si to rely on past experiences",
          "Using Fe to manage the team dynamic",
        ],
        correctIndex: 1,
        explanation: "This is pure Te in action: creating structure (timeline, roles, budget), defining success (metrics), and demanding evidence ('show me data'). It's not about being controlling — it's about ensuring the effort produces measurable results.",
      },
    },
    {
      id: "u17-l1-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two students prepare for the same exam. Student A reads every textbook chapter twice, takes detailed notes, and builds study guides. Student B skips the textbook, finds a YouTube video that summarizes the key concepts, does practice tests to identify gaps, and studies only what they get wrong.",
        question: "Which student is demonstrating Te?",
        options: [
          "Student A — they're more thorough",
          "Student B — they optimized for the RESULT (passing the exam) using the most efficient path",
          "Both equally",
          "Neither — this is just study habits",
        ],
        correctIndex: 1,
        explanation: "Student B is using Te logic: What's the goal? (pass the exam) What's the most efficient path? (target weak areas) What measures progress? (practice tests). Student A's thoroughness might reflect Si or Ti — understanding everything, not just what's needed.",
      },
    },
    {
      id: "u17-l1-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these into Te expressions vs. NOT Te expressions.",
        categories: ["Te Expression", "Not Te"],
        items: [
          { text: "What gets measured gets managed", categoryIndex: 0 },
          { text: "I need to understand the underlying theory first", categoryIndex: 1 },
          { text: "Let's set clear KPIs and review weekly", categoryIndex: 0 },
          { text: "How does this align with my personal values?", categoryIndex: 1 },
          { text: "If it ain't broke, don't fix it — but if it IS broke, fix it NOW", categoryIndex: 0 },
          { text: "I need more time to think about all the possibilities", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u17-l1-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Te is MOST concerned with...",
        options: [
          "Internal logical consistency",
          "Group emotional harmony",
          "External measurable results and efficiency",
          "Personal value alignment",
        ],
        correctIndex: 2,
        explanation: "Te's bottom line is: Did it work? Can you measure it? Was it efficient? Everything else is secondary to producing verifiable results in the external world.",
      },
    },
  ],
};

// ── Lesson 2: Te in Different Stack Positions ──────────────────────────────

const lesson2: Lesson = {
  id: "u17-l2",
  unitId: UNIT_ID,
  order: 2,
  title: "Te in Your Stack",
  subtitle: "How Te looks as dominant, auxiliary, tertiary, or inferior",
  xpReward: 25,
  exercises: [
    {
      id: "u17-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Dominant Te: The Commander",
        body: "Te-dominant types (ENTJ, ESTJ) are natural organizers and leaders. They see the world as systems to be optimized and instinctively take charge. Their identity is built around competence, achievement, and making things happen.",
        highlight: "natural organizers",
      },
    },
    {
      id: "u17-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Inferior Te: The Productivity Prison",
        body: "Te-inferior types (INFP, ISFP) can experience Te as a harsh inner critic. Under stress, they may become obsessively focused on productivity metrics, create elaborate organizational systems they never follow, or harshly judge themselves for not 'achieving enough.'",
        highlight: "harsh inner critic",
      },
    },
    {
      id: "u17-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does dominant Te (ENTJ/ESTJ) show up in everyday life?",
        options: [
          "Constant philosophical contemplation",
          "Instinctively organizing people, systems, and processes toward measurable goals",
          "Deep emotional processing in solitude",
          "Exploring many abstract possibilities without commitment",
        ],
        correctIndex: 1,
        explanation: "Te-dominant types can't help organizing. They see inefficiency everywhere and feel compelled to fix it. They naturally think in terms of goals, timelines, delegations, and metrics.",
      },
    },
    {
      id: "u17-l2-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which types have Te as their INFERIOR function?",
        options: [
          "ENTJ and ESTJ",
          "INTP and ISTP",
          "INFP and ISFP",
          "ENFJ and ESFJ",
        ],
        correctIndex: 2,
        explanation: "INFP (Fi-Ne-Si-Te) and ISFP (Fi-Se-Ni-Te) have Te in the inferior position. External organizing and measurable achievement are their most vulnerable areas.",
      },
    },
    {
      id: "u17-l2-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does auxiliary Te (in INTJ/ISTJ) typically function?",
        options: [
          "As the primary drive for all behavior",
          "As an external execution engine that implements the dominant perceiving function's insights",
          "As an unconscious, anxious force",
          "As something the person avoids using",
        ],
        correctIndex: 1,
        explanation: "Auxiliary Te in INTJs takes Ni's convergent insights and implements them efficiently. In ISTJs, it takes Si's detailed experiential knowledge and organizes it into effective systems. Te serves as the 'doer' for the perceiver.",
      },
    },
    {
      id: "u17-l2-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each stack position to how Te manifests.",
        pairs: [
          { left: "Dominant (ENTJ/ESTJ)", right: "Core identity as an organizer and achiever" },
          { left: "Auxiliary (INTJ/ISTJ)", right: "Execution engine for dominant perception" },
          { left: "Tertiary (ENFP/ESFP)", right: "Developing ability to structure and follow through" },
          { left: "Inferior (INFP/ISFP)", right: "Obsessive productivity criticism under stress" },
        ],
      },
    },
    {
      id: "u17-l2-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "An INFP under stress may experience inferior Te as a harsh inner voice saying: 'You're not ___ enough. Everyone else is getting things done and you're falling behind.'",
        options: ["productive", "creative", "social", "spiritual"],
        correctIndex: 0,
        explanation: "Inferior Te in Fi-dominant types manifests as brutal self-criticism about PRODUCTIVITY and ACHIEVEMENT — the exact domain they normally don't prioritize. It's their own Te turning against them with Te standards they can't meet.",
      },
    },
    {
      id: "u17-l2-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "ENFPs with tertiary Te often develop better ___ as they mature, learning to follow through on their many ideas.",
        options: ["organizational skills", "emotional depth", "sensory awareness", "logical analysis"],
        correctIndex: 0,
        explanation: "Tertiary Te develops through adulthood. ENFPs who mature well learn to harness Te to actually implement their Ne ideas — turning from chronic idea-starters into effective idea-completers.",
      },
    },
    {
      id: "u17-l2-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Maya, an INFP artist, hasn't been able to create anything for months. Instead of painting, she's been obsessively reorganizing her studio, creating detailed spreadsheets of art supplies, and researching 'productivity systems for creatives.' She feels worse with each passing day.",
        question: "What's happening psychologically?",
        options: [
          "Maya is becoming more organized and mature",
          "Her inferior Te has taken over — she's using productivity as a substitute for the authentic creative expression she needs",
          "Maya is developing a healthy Te",
          "She's experiencing an Ni grip",
        ],
        correctIndex: 1,
        explanation: "Classic inferior Te grip in an INFP. Instead of creating from her authentic Fi values, Maya has been captured by Te's shadow: obsessive organizing, metric-tracking, and productivity systems that actually prevent the creative work her Fi needs.",
      },
    },
    {
      id: "u17-l2-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Compare two approaches to a career setback. Person A (ESTJ) immediately creates a new action plan: 'Okay, what went wrong? Here's what I'll do differently. I have three months to hit these new targets.' Person B (INFP) spirals: 'Maybe I'm just not good enough. Everyone else seems to have it together. I need to be more organized, more disciplined, more...' and trails off, feeling overwhelmed.",
        question: "How does Te feel different as dominant vs. inferior?",
        options: [
          "They're using Te the same way",
          "Dominant Te is empowering and action-oriented; inferior Te is paralyzing and self-attacking",
          "Person B isn't using Te at all",
          "Person A is less affected by the setback",
        ],
        correctIndex: 1,
        explanation: "Dominant Te faces setbacks with agency: create a plan, execute, measure. Inferior Te faces setbacks with self-attack: I'm not productive enough, organized enough, disciplined enough. Same function, opposite psychological effects.",
      },
    },
    {
      id: "u17-l2-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these experiences into Dominant Te vs. Inferior Te.",
        categories: ["Dominant Te", "Inferior Te"],
        items: [
          { text: "Natural ability to organize and delegate effectively", categoryIndex: 0 },
          { text: "Creates elaborate systems they never actually follow", categoryIndex: 1 },
          { text: "Setbacks trigger immediate action planning", categoryIndex: 0 },
          { text: "Harsh inner critic about productivity and achievement", categoryIndex: 1 },
          { text: "Feels energized by checking things off lists", categoryIndex: 0 },
          { text: "Downloads 12 productivity apps and uses none", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u17-l2-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "True or false: Inferior Te means the person can never be organized.",
        options: [
          "True — they're destined to be messy",
          "False — they can develop Te, but it will always feel like more effort than it does for Te-dominant types",
          "True — only Te-dominant types can organize",
          "False — inferior Te is actually more powerful than dominant Te",
        ],
        correctIndex: 1,
        explanation: "Inferior Te can be developed through conscious effort and maturity. But it will never feel as natural or effortless as it does for ENTJ/ESTJ types. The key is learning to use Te without letting it become a self-attacking force.",
      },
    },
  ],
};

// ── Lesson 3: Te in Real Life ──────────────────────────────────────────────

const lesson3: Lesson = {
  id: "u17-l3",
  unitId: UNIT_ID,
  order: 3,
  title: "Te in the Wild",
  subtitle: "Relationships, work, leadership, and the shadow side of Te",
  xpReward: 25,
  exercises: [
    {
      id: "u17-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Te in Relationships",
        body: "Te users show love through ACTION — solving your problems, fixing your broken appliance, creating systems that make your life easier. They struggle when partners want emotional validation rather than solutions. 'I fixed it for you' IS their love language.",
        highlight: "love through action",
      },
    },
    {
      id: "u17-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Te's Shadow Side",
        body: "Unhealthy Te becomes controlling, dismissive of emotions, and obsessed with productivity at the expense of everything else. It can treat people as resources to be optimized rather than humans to be understood. The phrase 'nothing personal, just business' is often Te's shadow.",
        highlight: "controlling",
      },
    },
    {
      id: "u17-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does Te typically show love?",
        options: [
          "Deep emotional conversations about feelings",
          "Solving practical problems and creating systems that improve their partner's life",
          "Writing poetry and creating art",
          "Giving lots of space and independence",
        ],
        correctIndex: 1,
        explanation: "Te's love language is practical action. They show they care by DOING — fixing things, organizing things, solving problems, making your life more efficient. It's not romantic in a traditional sense, but it's deeply caring.",
      },
    },
    {
      id: "u17-l3-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is Te's biggest blind spot in relationships?",
        options: [
          "Being too emotional",
          "Trying to 'fix' emotional situations with solutions when the partner just needs to be heard",
          "Being too passive and indecisive",
          "Focusing too much on the past",
        ],
        correctIndex: 1,
        explanation: "Te instinctively responds to problems with solutions. But emotional pain often doesn't need solving — it needs witnessing. Te's 'Let me fix this' can feel dismissive to a partner who needs 'I hear you and I'm here.'",
      },
    },
    {
      id: "u17-l3-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "In leadership, what makes Te effective?",
        options: [
          "Creating emotional safety for the team",
          "Clear expectations, defined metrics, decisive action, and accountability",
          "Allowing the team to work however they want",
          "Building theoretical models for decision-making",
        ],
        correctIndex: 1,
        explanation: "Te leaders excel at what organizations need most: clarity of direction, measurable standards, efficient delegation, and consistent follow-through. They create structure that enables results.",
      },
    },
    {
      id: "u17-l3-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each life domain to how Te shows up.",
        pairs: [
          { left: "Relationships", right: "Shows love through solving problems and practical help" },
          { left: "Work", right: "Creates systems, sets metrics, drives results" },
          { left: "Parenting", right: "Structure, schedules, clear expectations and consequences" },
          { left: "Conflict", right: "Cuts to the point: 'Here's the problem, here's the fix'" },
          { left: "Stress", right: "Overworks, becomes controlling, dismisses emotions" },
        ],
      },
    },
    {
      id: "u17-l3-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Unhealthy Te can treat people as ___ to be optimized rather than humans to be understood.",
        options: ["resources", "theories", "emotions", "puzzles"],
        correctIndex: 0,
        explanation: "Te's shadow reduces people to their utility. 'What value do you add?' becomes the only question. This is why Te integration with Fi is crucial — Fi reminds Te that people have intrinsic worth beyond their productivity.",
      },
    },
    {
      id: "u17-l3-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "The phrase 'time is money' perfectly captures Te's tendency to ___ everything, including relationships and rest.",
        options: ["quantify", "spiritualize", "ignore", "beautify"],
        correctIndex: 0,
        explanation: "Te naturally quantifies — turning everything into measurable units. This is powerful for business but can be destructive when applied to things that resist measurement, like love, creativity, and personal growth.",
      },
    },
    {
      id: "u17-l3-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "An ENTJ CEO has built a hugely successful company but realizes she hasn't taken a vacation in 5 years, her marriage is strained, and her children say 'Mom only cares about work.' She responds by creating a 'family optimization plan' with scheduled quality time and measurable bonding milestones.",
        question: "What's happening here?",
        options: [
          "She's successfully applying Te to her personal life",
          "She's applying Te to a domain (relationships) that requires Fi — you can't schedule and measure love",
          "She doesn't care about her family",
          "She needs to work harder on her business",
        ],
        correctIndex: 1,
        explanation: "This is Te trying to solve an Fi problem. You can't fix a relationship with a spreadsheet. Her family doesn't need optimized quality time — they need her authentic emotional presence (Fi). Te tools don't work for every problem.",
      },
    },
    {
      id: "u17-l3-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two people handle a layoff differently. Person A immediately updates their resume, contacts recruiters, and creates a job search spreadsheet with application tracking. Person B takes a week to process their emotions, reflects on what they actually WANT next, and only then begins looking. Person A gets a new job in 3 weeks. Person B takes 3 months but ends up in a role they love.",
        question: "What does this reveal about Te's strengths and limitations?",
        options: [
          "Te is always better because Person A recovered faster",
          "Te excels at efficient action but may skip the deeper question of 'What do I actually want?' — which Fi provides",
          "Person B was lazy for taking so long",
          "Te and Fi produce identical outcomes",
        ],
        correctIndex: 1,
        explanation: "Te is unmatched for efficient execution. But 'getting a job fast' isn't always the best outcome. Person B's Fi process (What do I want? What aligns with my values?) led to a better long-term fit. The ideal is Te AND Fi working together.",
      },
    },
    {
      id: "u17-l3-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these into Healthy Te vs. Unhealthy Te.",
        categories: ["Healthy Te", "Unhealthy Te"],
        items: [
          { text: "Clear standards that help everyone succeed", categoryIndex: 0 },
          { text: "Treating people as replaceable productivity units", categoryIndex: 1 },
          { text: "Decisive action based on available evidence", categoryIndex: 0 },
          { text: "Dismissing emotions as 'inefficient' and irrelevant", categoryIndex: 1 },
          { text: "Creating systems that serve human needs", categoryIndex: 0 },
          { text: "Measuring your self-worth solely by achievements", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u17-l3-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What does healthy Te development require?",
        options: [
          "Eliminating all emotions from decision-making",
          "Integrating Fi — remembering that people and values matter alongside results",
          "Working harder and longer hours",
          "Only focusing on measurable outcomes",
        ],
        correctIndex: 1,
        explanation: "Healthy Te integrates Fi — personal values, emotional awareness, and recognition that not everything valuable can be measured. Without Fi, Te becomes a machine that optimizes for metrics while missing what truly matters.",
      },
    },
  ],
};

// ── Lesson 4: Spotting Te & Common Confusions ──────────────────────────────

const lesson4: Lesson = {
  id: "u17-l4",
  unitId: UNIT_ID,
  order: 4,
  title: "Te vs. the Imposters",
  subtitle: "Spotting Te in others and distinguishing it from similar functions",
  xpReward: 30,
  exercises: [
    {
      id: "u17-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Te vs. Ti: The Doer vs. The Thinker",
        body: "Te and Ti both think logically, but Te thinks to DO and Ti thinks to UNDERSTAND. Te asks: 'What's the most effective action?' Ti asks: 'What's the most accurate model?' Te produces results; Ti produces frameworks. Both are valuable; neither is more 'logical.'",
        highlight: "do vs. understand",
      },
    },
    {
      id: "u17-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Te vs. Se: Action vs. Reaction",
        body: "Te and Se are both action-oriented, but differently. Te acts to achieve PLANNED outcomes — it's strategic. Se acts in response to PRESENT circumstances — it's tactical. Te plans the war; Se wins the fight. Both get things done, but through different mechanisms.",
        highlight: "strategic vs. tactical",
      },
    },
    {
      id: "u17-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Someone builds a detailed project plan with milestones, deadlines, and KPIs before starting any work. Is this Te or Ti?",
        options: [
          "Ti — they're being thorough and logical",
          "Te — they're organizing EXTERNAL structures for measurable results",
          "Both equally",
          "Neither — this is just good planning",
        ],
        correctIndex: 1,
        explanation: "Project plans with milestones, deadlines, and KPIs are textbook Te. They organize the EXTERNAL world for measurable achievement. Ti would be more like building an internal model to understand HOW the project works.",
      },
    },
    {
      id: "u17-l4-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Someone values 'best practices,' industry standards, and proven methodologies. Which function?",
        options: [
          "Ti — they respect logical rigor",
          "Te — they trust externally validated, results-proven approaches",
          "Si — they value tradition",
          "Ni — they see the pattern",
        ],
        correctIndex: 1,
        explanation: "Te trusts what has been PROVEN to work externally — best practices, industry standards, expert consensus. Ti would want to verify these from first principles. Te accepts external validation; Ti demands personal verification.",
      },
    },
    {
      id: "u17-l4-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Why might a Ti user get frustrated working with a Te user?",
        options: [
          "Because Te users are unintelligent",
          "Because Te moves to action before Ti feels the underlying logic has been fully worked out",
          "Because Te users have no opinions",
          "Because Ti users don't value results",
        ],
        correctIndex: 1,
        explanation: "Ti wants to fully understand before acting. Te wants to act and iterate. To Ti, Te seems reckless ('You haven't thought this through!'). To Te, Ti seems paralyzed ('Stop overthinking and just DO something!').",
      },
    },
    {
      id: "u17-l4-e6",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort these approaches into Te vs. Ti.",
        categories: ["Te", "Ti"],
        items: [
          { text: "Let's try it and see what the results tell us", categoryIndex: 0 },
          { text: "Let me think through all the implications first", categoryIndex: 1 },
          { text: "What do the industry benchmarks say?", categoryIndex: 0 },
          { text: "I don't care what experts say — does it make logical sense?", categoryIndex: 1 },
          { text: "We need to ship by Friday, good enough is good enough", categoryIndex: 0 },
          { text: "I'd rather delay than ship something I don't fully understand", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u17-l4-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Te's motto is 'Does it ___?' while Ti's motto is 'Is it ___?'",
        options: ["work / true", "true / work", "feel / think", "look / sound"],
        correctIndex: 0,
        explanation: "Te = effectiveness (does this produce the desired result?). Ti = accuracy (is the underlying logic sound?). You can have something that works without being fully understood (Te win), or something fully understood but never implemented (Ti win).",
      },
    },
    {
      id: "u17-l4-e8",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each 'Te confusion' to why it's wrong.",
        pairs: [
          { left: "Te = bossy", right: "Wrong: organizing others isn't the same as dominating them" },
          { left: "Te = no feelings", right: "Wrong: Te has feelings, it just doesn't lead with them" },
          { left: "Te = intelligence", right: "Wrong: Te is a style of thinking, not a level of intelligence" },
          { left: "Te = always right", right: "Wrong: efficiency without wisdom can optimize the wrong goals" },
        ],
      },
    },
    {
      id: "u17-l4-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "At a startup, the CTO (INTP) and CEO (ENTJ) clash constantly. The CTO says: 'We can't launch — the architecture has fundamental flaws I need to redesign.' The CEO says: 'Customers don't care about architecture — they care about features. Ship it, learn from users, iterate.'",
        question: "What function clash is happening?",
        options: [
          "Fe vs. Fi",
          "Ti (deep understanding before action) vs. Te (results first, refine later)",
          "Ni vs. Ne",
          "Se vs. Si",
        ],
        correctIndex: 1,
        explanation: "Classic Ti vs. Te clash. The Ti user can't ship something with known logical flaws. The Te user prioritizes real-world feedback over theoretical perfection. Both have valid points — the best outcomes usually involve compromise between these orientations.",
      },
    },
    {
      id: "u17-l4-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "You're trying to determine if your coworker uses Te or is just a 'Type A personality.' They're organized, driven, and results-focused — but is that Te specifically?",
        question: "What would confirm Te specifically rather than just general ambition?",
        options: [
          "They work long hours",
          "They naturally organize SYSTEMS and STRUCTURES (not just themselves) and measure success by external, quantifiable outcomes",
          "They're competitive with coworkers",
          "They arrive to work early",
        ],
        correctIndex: 1,
        explanation: "Te is specifically about EXTERNAL organization and MEASURABLE results. Being personally ambitious could come from any function. Te creates systems, structures processes, and insists on quantifiable metrics — it organizes the external world, not just the self.",
      },
    },
    {
      id: "u17-l4-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two people both say 'That's wrong.' Person A means: 'That's factually incorrect — the data doesn't support it.' Person B means: 'That's logically incoherent — there's a contradiction in the reasoning.'",
        question: "Which is Te and which is Ti?",
        options: [
          "Person A = Ti, Person B = Te",
          "Both are Te",
          "Person A = Te (external data), Person B = Ti (internal logical consistency)",
          "Both are Ti",
        ],
        correctIndex: 2,
        explanation: "Person A references EXTERNAL evidence (data, facts) — Te's standard of proof. Person B references INTERNAL logical coherence (contradictions in reasoning) — Ti's standard of proof. Both are valid forms of 'wrong' but from different thinking orientations.",
      },
    },
    {
      id: "u17-l4-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Quick review: Te is best described as...",
        options: [
          "An internal logic engine that builds frameworks for understanding",
          "A social thermostat that manages group emotions",
          "An external organizing force that structures the world for measurable results",
          "An inner value compass that judges authenticity",
        ],
        correctIndex: 2,
        explanation: "Te is the results machine. It organizes the external world — systems, processes, people, resources — to produce measurable, verifiable outcomes as efficiently as possible.",
      },
    },
  ],
};

export const teLessons: Lesson[] = [lesson1, lesson2, lesson3, lesson4];
