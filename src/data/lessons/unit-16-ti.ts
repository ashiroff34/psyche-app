// ─────────────────────────────────────────────────────────────────────────────
// Unit 16 — Introverted Thinking (Ti)
// Internal logic engine, first-principles reasoning, framework building
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson } from "@/types/lessons";

const UNIT_ID = "ti";

// ── Lesson 1: What IS Ti? ─────────────────────────────────────────────────

const lesson1: Lesson = {
  id: "u16-l1",
  unitId: UNIT_ID,
  order: 1,
  title: "The Internal Logic Engine",
  subtitle: "What Introverted Thinking feels like from the inside",
  xpReward: 20,
  exercises: [
    {
      id: "u16-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "What Is Introverted Thinking?",
        body: "Ti is an internal logic engine that builds and refines personal frameworks for understanding. It asks: 'Is this logically consistent within MY model of how things work?' Ti doesn't care about external credentials or popular opinion — only internal coherence.",
        highlight: "internal logic engine",
      },
    },
    {
      id: "u16-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Ti from the Inside",
        body: "Ti users describe a constant internal process of categorizing, defining, and refining ideas. They need to fully UNDERSTAND something before they can use it. They'll spend hours building a mental model that 'clicks' — and once it does, they own that knowledge deeply.",
        highlight: "fully understand",
      },
    },
    {
      id: "u16-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core question Ti asks?",
        options: [
          "What do the results show?",
          "Is this logically consistent within my understanding?",
          "What does the group think about this?",
          "What could this become?",
        ],
        correctIndex: 1,
        explanation: "Ti is concerned with internal logical consistency. It builds personal models and constantly checks: Does this make sense? Are there contradictions? Does every piece fit together coherently?",
      },
    },
    {
      id: "u16-l1-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does Ti differ from simply 'being smart'?",
        options: [
          "It doesn't — Ti is intelligence",
          "Ti is a specific STYLE of thinking: building internal logical frameworks from first principles, regardless of intelligence level",
          "Ti is only for scientists and engineers",
          "Ti is the opposite of intelligence — it overcomplicates things",
        ],
        correctIndex: 1,
        explanation: "Ti is not intelligence itself but a cognitive STYLE. A Ti user builds understanding from the ground up using internal logic. You can be brilliant without Ti, and you can have Ti without being a genius.",
      },
    },
    {
      id: "u16-l1-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which types have Ti as their DOMINANT function?",
        options: [
          "ENTJ and ESTJ",
          "INFP and ISFP",
          "INTP and ISTP",
          "ENFJ and ESFJ",
        ],
        correctIndex: 2,
        explanation: "INTP (Ti-Ne-Si-Fe) and ISTP (Ti-Se-Ni-Fe) lead with Ti. Their primary engagement with the world is through internal logical analysis and framework building.",
      },
    },
    {
      id: "u16-l1-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each Ti characteristic to its description.",
        pairs: [
          { left: "First Principles", right: "Builds understanding from the ground up" },
          { left: "Internal Consistency", right: "Every piece must fit logically together" },
          { left: "Precision", right: "Exact definitions and distinctions matter" },
          { left: "Skepticism", right: "Doesn't accept claims without internal verification" },
          { left: "Framework Building", right: "Creates mental models to explain how things work" },
        ],
      },
    },
    {
      id: "u16-l1-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Ti users need to fully ___ something from the ground up before they feel comfortable using or teaching it.",
        options: ["understand", "monetize", "socialize", "experience"],
        correctIndex: 0,
        explanation: "Ti demands deep understanding. A Ti user won't just memorize a formula — they need to know WHY it works. They build knowledge from first principles, which takes longer but creates robust understanding.",
      },
    },
    {
      id: "u16-l1-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Ti is a ___ function — it evaluates and decides based on internal logical criteria.",
        options: ["judging", "perceiving", "extraverted", "unconscious"],
        correctIndex: 0,
        explanation: "Ti is a Judging function with an Introverted attitude. It makes evaluations and decisions, but its criteria are internal (personal logical frameworks) rather than external (measurable results).",
      },
    },
    {
      id: "u16-l1-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "A friend explains a popular productivity system they love. Sam listens carefully, then says: 'Okay, but step 3 contradicts step 7. And the whole thing assumes linear progress, which doesn't account for creative work. The underlying model is flawed.' The friend says, 'It works for millions of people!' Sam shrugs: 'Popular doesn't mean logically sound.'",
        question: "What Ti process is Sam demonstrating?",
        options: [
          "Being unnecessarily critical",
          "Analyzing the internal logical consistency of a framework, independent of its popularity",
          "Using Te to measure results",
          "Using Ne to brainstorm alternatives",
        ],
        correctIndex: 1,
        explanation: "Pure Ti. Sam doesn't care that the system is popular (that's external validation, which Ti ignores). Sam cares that the internal logic is consistent and the model is coherent. Finding contradictions between steps is Ti precision at work.",
      },
    },
    {
      id: "u16-l1-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two programmers approach debugging differently. Programmer A reads the error message and tries fixes until something works. Programmer B stops, traces the logic flow from the beginning, builds a mental model of what SHOULD happen, and identifies where the model breaks.",
        question: "Which programmer is demonstrating Ti?",
        options: [
          "Programmer A — trial and error is logical",
          "Programmer B — building an internal model and tracing logic is classic Ti",
          "Both equally",
          "Neither — this is just programming, not cognitive functions",
        ],
        correctIndex: 1,
        explanation: "Programmer B's approach is quintessential Ti: build an internal model of how the system works, trace the logic step by step, find where the model breaks. Programmer A's trial-and-error approach is more Te-like (just find what works).",
      },
    },
    {
      id: "u16-l1-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these into Ti expressions vs. NOT Ti expressions.",
        categories: ["Ti Expression", "Not Ti"],
        items: [
          { text: "Needing to understand WHY before accepting HOW", categoryIndex: 0 },
          { text: "Implementing whatever gets results fastest", categoryIndex: 1 },
          { text: "Spotting logical contradictions in arguments", categoryIndex: 0 },
          { text: "Adjusting communication to serve group harmony", categoryIndex: 1 },
          { text: "Building a personal mental model from scratch", categoryIndex: 0 },
          { text: "Relying on expert authority and credentials", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u16-l1-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Ti is MOST concerned with...",
        options: [
          "External measurable results",
          "Group emotional harmony",
          "Internal logical consistency and coherence",
          "Future pattern recognition",
        ],
        correctIndex: 2,
        explanation: "Ti's primary drive is internal logical consistency. Every idea, belief, and model must be coherent within its own framework. Contradictions are intolerable to Ti.",
      },
    },
  ],
};

// ── Lesson 2: Ti in Different Stack Positions ──────────────────────────────

const lesson2: Lesson = {
  id: "u16-l2",
  unitId: UNIT_ID,
  order: 2,
  title: "Ti in Your Stack",
  subtitle: "How Ti looks as dominant, auxiliary, tertiary, or inferior",
  xpReward: 25,
  exercises: [
    {
      id: "u16-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Dominant Ti: The Framework Architect",
        body: "Ti-dominant types (INTP, ISTP) live inside their logical models. They are natural systems thinkers who see the world as a puzzle to be understood. Their greatest joy is the moment a complex framework 'clicks' into coherence.",
        highlight: "framework architect",
      },
    },
    {
      id: "u16-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Inferior Ti: The Logic Trap",
        body: "Ti-inferior types (ENFJ, ESFJ) can fall into 'bad logic loops' under stress — obsessively trying to analyze situations with flawed reasoning, becoming paralyzed by pseudo-logical arguments, or making cutting criticisms they later regret.",
        highlight: "bad logic loops",
      },
    },
    {
      id: "u16-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does dominant Ti (INTP/ISTP) typically manifest in everyday life?",
        options: [
          "Constantly organizing external systems for efficiency",
          "Living inside mental models, always analyzing and refining frameworks for understanding",
          "Prioritizing group emotional dynamics above all else",
          "Focusing on concrete sensory details in the present moment",
        ],
        correctIndex: 1,
        explanation: "Ti-dominant types are perpetual analysts. Their inner world is a workshop of models, frameworks, and logical structures that they constantly refine. Understanding is their primary motivation.",
      },
    },
    {
      id: "u16-l2-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which types have Ti as their INFERIOR function?",
        options: [
          "INTP and ISTP",
          "ENTP and ESTP",
          "ENFJ and ESFJ",
          "INTJ and INFJ",
        ],
        correctIndex: 2,
        explanation: "ENFJ (Fe-Ni-Se-Ti) and ESFJ (Fe-Si-Ne-Ti) have Ti in the inferior position. Internal logical analysis is their least conscious, most vulnerable area.",
      },
    },
    {
      id: "u16-l2-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "When Ti is auxiliary (ENTP/ESTP), how does it typically serve?",
        options: [
          "As the primary lens for all experiences",
          "As an internal analyzer that refines what the dominant perceiving function collects",
          "As an unconscious, anxious process",
          "As an occasional afterthought",
        ],
        correctIndex: 1,
        explanation: "Auxiliary Ti analyzes and structures what the dominant function perceives. ENTPs use Ti to analyze Ne's many possibilities. ESTPs use Ti to make sense of Se's real-time data.",
      },
    },
    {
      id: "u16-l2-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each stack position to how Ti manifests.",
        pairs: [
          { left: "Dominant (INTP/ISTP)", right: "Core identity as a logical analyst" },
          { left: "Auxiliary (ENTP/ESTP)", right: "Internal refiner of externally gathered data" },
          { left: "Tertiary (INFJ/ISFJ)", right: "Growing analytical capacity supporting insight" },
          { left: "Inferior (ENFJ/ESFJ)", right: "Bad logic loops and cutting criticisms under stress" },
        ],
      },
    },
    {
      id: "u16-l2-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "An ESFJ in a Ti grip might suddenly become obsessed with finding the 'logically correct' answer to an emotional problem, producing ___ that sound convincing but are fundamentally flawed.",
        options: ["arguments", "emotions", "visions", "plans"],
        correctIndex: 0,
        explanation: "Inferior Ti in Fe-dominant types produces pseudo-logical arguments that feel compelling from the inside but lack the rigor of developed Ti. The person may build elaborate 'logical' cases that are really emotional reactions in disguise.",
      },
    },
    {
      id: "u16-l2-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "The difference between INTP and ISTP is their auxiliary function: INTP uses Ti with ___ while ISTP uses Ti with ___.",
        options: ["Ne / Se", "Se / Ne", "Fe / Fi", "Ni / Si"],
        correctIndex: 0,
        explanation: "INTP (Ti-Ne) uses Ti to analyze abstract possibilities. ISTP (Ti-Se) uses Ti to analyze concrete, real-time physical data. Same Ti engine, different inputs.",
      },
    },
    {
      id: "u16-l2-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Lena, an ENFJ therapist, gets into a heated argument with her partner. Instead of using her usual empathetic approach, she suddenly becomes cold and says: 'If we analyze this logically, your position makes no sense because of X, Y, and Z.' Her partner is shocked. Later Lena says, 'I don't know what came over me — I was trying to be logical but I think I was just being cruel.'",
        question: "What happened?",
        options: [
          "Lena discovered her true Te nature",
          "Her inferior Ti erupted under stress, producing harsh pseudo-logic that was actually an emotional reaction",
          "She was correctly using Ti to resolve the conflict",
          "Her Fe was functioning normally",
        ],
        correctIndex: 1,
        explanation: "Classic inferior Ti eruption. Under stress, Fe-dominant types can flip to cold, cutting 'logic' that feels alien to their usual warm approach. The logic is often flawed — it's emotion wearing a logic mask.",
      },
    },
    {
      id: "u16-l2-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two people both take apart a broken appliance. Person A (ISTP) methodically tests each component, builds a mental model of the circuit, and identifies the exact failure point. Person B (INTP) looks at the appliance, starts thinking about the underlying engineering principles, and gets sidetracked into a 2-hour rabbit hole about electromagnetic theory.",
        question: "How does their auxiliary function change how they use Ti?",
        options: [
          "It doesn't — Ti works identically in both",
          "ISTP's Se keeps Ti grounded in concrete physical reality; INTP's Ne pulls Ti into abstract theoretical exploration",
          "Person B isn't using Ti at all",
          "Person A is using Te, not Ti",
        ],
        correctIndex: 1,
        explanation: "The auxiliary function shapes what Ti has to work with. ISTP's Se feeds Ti concrete sensory data (this wire, this component). INTP's Ne feeds Ti abstract possibilities (how does electromagnetism really work?). Both are Ti — differently fed.",
      },
    },
    {
      id: "u16-l2-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these into Dominant Ti vs. Inferior Ti experiences.",
        categories: ["Dominant Ti", "Inferior Ti"],
        items: [
          { text: "Effortlessly spots logical inconsistencies", categoryIndex: 0 },
          { text: "Gets trapped in circular reasoning under stress", categoryIndex: 1 },
          { text: "Builds robust frameworks that withstand scrutiny", categoryIndex: 0 },
          { text: "Uses 'logic' as a weapon during emotional conflicts", categoryIndex: 1 },
          { text: "Enjoys complexity and nuance for their own sake", categoryIndex: 0 },
          { text: "Obsessively tries to find the 'right' answer to subjective questions", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u16-l2-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "The biggest difference between dominant Ti and inferior Ti is:",
        options: [
          "Dominant Ti users are smarter",
          "Dominant Ti produces reliable frameworks; inferior Ti produces flawed logic that feels convincing",
          "Inferior Ti is faster than dominant Ti",
          "There is no meaningful difference",
        ],
        correctIndex: 1,
        explanation: "Dominant Ti is well-calibrated — its logical models are tested and refined. Inferior Ti is unreliable — it produces arguments that FEEL logical but often contain serious flaws the person can't see.",
      },
    },
  ],
};

// ── Lesson 3: Ti in Real Life ──────────────────────────────────────────────

const lesson3: Lesson = {
  id: "u16-l3",
  unitId: UNIT_ID,
  order: 3,
  title: "Ti in the Wild",
  subtitle: "Relationships, work, stress, and learning through the Ti lens",
  xpReward: 25,
  exercises: [
    {
      id: "u16-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Ti in Relationships",
        body: "Ti users show love by understanding you deeply — analyzing what makes you tick, remembering your reasoning, and offering precise insights. They struggle with 'just listening' when they see logical solutions. Their love language is often solving your problems.",
        highlight: "understanding you deeply",
      },
    },
    {
      id: "u16-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Ti at Work",
        body: "Ti users thrive in roles requiring deep analysis, troubleshooting, and systems understanding. They struggle in roles requiring social performance, arbitrary rules they can't question, or work that prioritizes speed over accuracy. They are the 'why' people — always asking why.",
        highlight: "the 'why' people",
      },
    },
    {
      id: "u16-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does Ti typically create friction in relationships?",
        options: [
          "By being too social and overwhelming their partner",
          "By trying to logically solve emotional problems instead of just listening",
          "By being overly focused on group harmony",
          "By constantly seeking new experiences",
        ],
        correctIndex: 1,
        explanation: "Ti's instinct is to analyze and solve. When a partner says 'I had a terrible day,' Ti jumps to: 'Here's what you should do.' But often the partner just wants to be heard. This Ti-Fe tension is one of the most common relationship challenges.",
      },
    },
    {
      id: "u16-l3-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What kind of work environment is most Ti-hostile?",
        options: [
          "One with complex problems requiring deep analysis",
          "One with arbitrary rules you're not allowed to question and speed prioritized over understanding",
          "One with lots of independent research time",
          "One that values precision and accuracy",
        ],
        correctIndex: 1,
        explanation: "Ti needs to understand WHY. Environments where you must follow rules without questioning them, where speed trumps accuracy, and where 'because I said so' is an acceptable answer are torturous for Ti users.",
      },
    },
    {
      id: "u16-l3-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Ti users are often described as 'the ___' in a group.",
        options: [
          "Life of the party",
          "Devil's advocate",
          "Group cheerleader",
          "Action hero",
        ],
        correctIndex: 1,
        explanation: "Ti's love of logical consistency makes Ti users natural devil's advocates. They can't help pointing out flaws in arguments, even popular ones. This is often received as contrarianism but is actually Ti's drive for logical coherence.",
      },
    },
    {
      id: "u16-l3-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each life domain to how Ti shows up.",
        pairs: [
          { left: "Learning", right: "Must understand from first principles, not just memorize" },
          { left: "Relationships", right: "Shows love through deep analysis and problem-solving" },
          { left: "Work", right: "Excels at troubleshooting and systems thinking" },
          { left: "Communication", right: "Precise word choice, definitions matter" },
          { left: "Conflict", right: "Dissects arguments for logical flaws" },
        ],
      },
    },
    {
      id: "u16-l3-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Ti users often struggle in school systems that reward ___ over genuine understanding.",
        options: ["memorization", "creativity", "collaboration", "physical activity"],
        correctIndex: 0,
        explanation: "Ti demands deep understanding. School systems that reward rote memorization and regurgitation of facts frustrate Ti users who need to know WHY something works, not just THAT it works.",
      },
    },
    {
      id: "u16-l3-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Under chronic stress, Ti can become ___ — endlessly refining mental models without ever producing external results.",
        options: ["paralyzed by analysis", "socially aggressive", "impulsive", "emotionally expressive"],
        correctIndex: 0,
        explanation: "Analysis paralysis is Ti's shadow. The drive for perfect logical coherence can prevent action — if the model isn't perfect yet, how can you act on it? This trap keeps Ti users stuck in their heads.",
      },
    },
    {
      id: "u16-l3-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Devon, an INTP software architect, has been working on a system design for three weeks. His manager asks for an update and Devon says: 'I've identified twelve edge cases that the original specification didn't account for. I need another week to make the model internally consistent.' The manager says: 'We need something that WORKS by Friday, not something perfect.'",
        question: "What Ti pattern is creating tension here?",
        options: [
          "Devon is procrastinating",
          "Ti's drive for internal logical consistency is conflicting with Te's demand for timely, workable results",
          "Devon doesn't understand the project",
          "The manager is being unreasonable",
        ],
        correctIndex: 1,
        explanation: "Classic Ti vs. Te tension. Ti wants the model to be logically perfect before implementation. Te wants something that WORKS, even if imperfect. Both approaches have value, but they create real-world friction in time-pressured environments.",
      },
    },
    {
      id: "u16-l3-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "An ISTP mechanic is asked to explain how an engine works to a customer. Instead of saying 'It turns gas into motion,' the ISTP launches into a detailed explanation of combustion chambers, compression ratios, and thermodynamic principles. The customer's eyes glaze over.",
        question: "What Ti tendency is at play here?",
        options: [
          "The ISTP is showing off their knowledge",
          "Ti's drive for precision makes it hard to simplify without feeling like they're lying",
          "The ISTP has poor social skills unrelated to Ti",
          "This is Te behavior, not Ti",
        ],
        correctIndex: 1,
        explanation: "Ti prizes precision. Simplifying feels like leaving out crucial information — like lying by omission. Ti users often struggle to 'dumb things down' because their internal model includes all the nuance, and removing it feels wrong.",
      },
    },
    {
      id: "u16-l3-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these into Ti-friendly vs. Ti-hostile environments.",
        categories: ["Ti-Friendly", "Ti-Hostile"],
        items: [
          { text: "Time to deeply understand problems before solving them", categoryIndex: 0 },
          { text: "'Don't overthink it, just follow the process'", categoryIndex: 1 },
          { text: "Freedom to question assumptions and methods", categoryIndex: 0 },
          { text: "Arbitrary rules with no logical justification", categoryIndex: 1 },
          { text: "Complex problems that reward precision", categoryIndex: 0 },
          { text: "Constantly shifting priorities with no coherent framework", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u16-l3-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "The greatest strength of Ti in everyday life is:",
        options: [
          "Reading social dynamics effortlessly",
          "The ability to see through flawed reasoning and build robust understanding from first principles",
          "Organizing external systems for maximum efficiency",
          "Generating new creative possibilities",
        ],
        correctIndex: 1,
        explanation: "Ti's superpower is seeing through bad logic. While others accept things at face value, Ti users detect hidden contradictions, flawed assumptions, and logical gaps — building reliable understanding in their place.",
      },
    },
  ],
};

// ── Lesson 4: Spotting Ti & Common Confusions ──────────────────────────────

const lesson4: Lesson = {
  id: "u16-l4",
  unitId: UNIT_ID,
  order: 4,
  title: "Ti vs. the Imposters",
  subtitle: "Spotting Ti in others and distinguishing it from Te and other functions",
  xpReward: 30,
  exercises: [
    {
      id: "u16-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Critical Distinction: Ti vs. Te",
        body: "Ti and Te are BOTH thinking functions, but they face opposite directions. Ti asks 'Is this internally consistent?' — it builds personal frameworks. Te asks 'Does this work in the real world?' — it measures external results. Ti values understanding; Te values effectiveness.",
        highlight: "understanding vs. effectiveness",
      },
    },
    {
      id: "u16-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Ti vs. Fi: Thinking vs. Feeling Introversion",
        body: "Ti and Fi can look similar — both are introverted judging functions that produce strong internal convictions. The difference: Ti's convictions are LOGICAL ('This is true because it's logically consistent'). Fi's convictions are VALUES-based ('This is right because it aligns with who I am').",
        highlight: "logical vs. values-based",
      },
    },
    {
      id: "u16-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the KEY difference between Ti and Te?",
        options: [
          "Ti is smarter than Te",
          "Ti cares about internal logical consistency; Te cares about external measurable results",
          "Ti is for introverts, Te is for extroverts",
          "Ti is fast, Te is slow",
        ],
        correctIndex: 1,
        explanation: "Ti and Te are both logical, but they optimize for different things. Ti optimizes for UNDERSTANDING (does my model make sense?). Te optimizes for RESULTS (does this approach work?).",
      },
    },
    {
      id: "u16-l4-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Someone says: 'I don't care about the theory — show me the results. If it works, it works.' Which function?",
        options: [
          "Ti — they're being logical",
          "Te — they're prioritizing external results over internal understanding",
          "Se — they're being present-focused",
          "Fi — they're being authentic",
        ],
        correctIndex: 1,
        explanation: "Pure Te. 'Show me the results' is the Te mantra. Ti would say the opposite: 'I don't care if it works — I need to understand WHY it works.'",
      },
    },
    {
      id: "u16-l4-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How can you tell if someone's strong conviction comes from Ti or Fi?",
        options: [
          "Ask them to explain their reasoning — Ti will give logical steps, Fi will reference personal values and identity",
          "Ti convictions are always right, Fi convictions are always wrong",
          "You can't tell — they're the same thing",
          "Ti users never have convictions, only Fi users do",
        ],
        correctIndex: 0,
        explanation: "When pressed, Ti users justify their stance through logical reasoning ('This must be true because A leads to B which implies C'). Fi users justify through values and identity ('This is who I am and what I stand for').",
      },
    },
    {
      id: "u16-l4-e6",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort these approaches into Ti vs. Te.",
        categories: ["Ti", "Te"],
        items: [
          { text: "Why does this work? I need to understand the mechanism", categoryIndex: 0 },
          { text: "It works — ship it and move to the next thing", categoryIndex: 1 },
          { text: "Your argument has a logical contradiction in step 3", categoryIndex: 0 },
          { text: "The data shows a 40% improvement — that's all I need", categoryIndex: 1 },
          { text: "Let me build a model that explains ALL the edge cases", categoryIndex: 0 },
          { text: "What's the most efficient process to achieve this outcome?", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u16-l4-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Ti says 'Is this ___?' Te says 'Does this ___?'",
        options: ["true / work", "work / true", "good / right", "right / good"],
        correctIndex: 0,
        explanation: "The simplest distinction: Ti cares about TRUTH (internal logical consistency). Te cares about RESULTS (external real-world effectiveness). A solution can be theoretically true but not work, or work without being understood.",
      },
    },
    {
      id: "u16-l4-e8",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each 'Ti confusion' to why it's wrong.",
        pairs: [
          { left: "Ti = being cold", right: "Wrong: Ti has emotions; it just processes them differently" },
          { left: "Ti = overthinking", right: "Wrong: what looks like overthinking IS Ti's natural process" },
          { left: "Ti = arrogance", right: "Wrong: questioning ideas isn't the same as dismissing people" },
          { left: "Ti = Te", right: "Wrong: Ti seeks understanding, Te seeks results" },
        ],
      },
    },
    {
      id: "u16-l4-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two project managers review a failed initiative. Manager A says: 'The project failed because we didn't hit our revenue targets. Here's the revised plan with measurable milestones.' Manager B says: 'The project failed because our underlying assumptions about user behavior were flawed. Here's a revised model that better accounts for how people actually think.'",
        question: "Which manager is using Ti and which Te?",
        options: [
          "Manager A = Ti, Manager B = Te",
          "Manager A = Te (measuring results), Manager B = Ti (analyzing the underlying model)",
          "Both are using Te",
          "Both are using Ti",
        ],
        correctIndex: 1,
        explanation: "Manager A focuses on measurable outcomes (revenue targets, milestones) — Te. Manager B focuses on the accuracy of the underlying model (assumptions about user behavior) — Ti. Same problem, completely different analytical orientations.",
      },
    },
    {
      id: "u16-l4-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "In an online debate, someone makes a popular but logically flawed argument. Three people respond. Person A: 'That argument makes people feel good but it contains a false equivalence in paragraph 2.' Person B: 'That opinion hurts people and goes against what we should stand for as a society.' Person C: 'That strategy won't work — the data clearly shows otherwise.'",
        question: "Which response is Ti, which is Fi, and which is Te?",
        options: [
          "A = Fi, B = Ti, C = Te",
          "A = Te, B = Fi, C = Ti",
          "A = Ti (logical flaw), B = Fi (values), C = Te (data/results)",
          "A = Ti, B = Fe, C = Te",
        ],
        correctIndex: 2,
        explanation: "Person A identifies a LOGICAL FLAW (Ti). Person B references what WE SHOULD STAND FOR — personal values about what's right (Fi). Person C points to DATA AND RESULTS (Te). Three different thinking/judging functions, three different critiques.",
      },
    },
    {
      id: "u16-l4-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "You're trying to determine if a quiet, analytical person uses Ti or is just introverted with Te. Both seem logical and thoughtful.",
        question: "What's the BEST question to distinguish Ti from introverted Te?",
        options: [
          "'Are you an introvert?'",
          "'Would you rather fully understand something or get effective results, if you had to choose one?'",
          "'Do you like math?'",
          "'Are you good at your job?'",
        ],
        correctIndex: 1,
        explanation: "The Ti user will choose understanding — they need the model to be coherent. The Te user will choose results — they need the outcome to be achieved. This forced choice reveals which form of logic they truly prioritize.",
      },
    },
    {
      id: "u16-l4-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Quick review: Ti is best described as...",
        options: [
          "An external results machine that organizes for efficiency",
          "An internal logic engine that builds and refines frameworks for understanding",
          "A social thermostat that reads group dynamics",
          "An inner value compass that evaluates authenticity",
        ],
        correctIndex: 1,
        explanation: "Ti is the internal logic engine. It builds personal frameworks, demands logical consistency, and won't accept anything it hasn't verified through its own analytical process.",
      },
    },
  ],
};

export const tiLessons: Lesson[] = [lesson1, lesson2, lesson3, lesson4];
