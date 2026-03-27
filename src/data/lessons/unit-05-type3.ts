// ─────────────────────────────────────────────────────────────────────────────
// Unit 5 — Type 3: The Achiever / The Performer
// 4 lessons × 12 exercises each
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson } from "@/types/lessons";

// ── Lesson 1: Core Motivation, Fear & Desire ──────────────────────────────

const lesson1: Lesson = {
  id: "u5-l1",
  unitId: "type-3",
  order: 1,
  title: "The Mask of Success",
  subtitle: "Core motivation, fear, and desire of Type 3",
  xpReward: 20,
  exercises: [
    {
      id: "u5-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Meet the Achiever",
        body: "Type 3s are driven by a deep need to succeed and be admired. They are the chameleons of the Enneagram — adapting their image to whatever their environment values most, sometimes losing touch with who they really are underneath.",
        highlight: "chameleons",
      },
    },
    {
      id: "u5-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Fear, Desire & Motivation",
        body: "The core fear of Type 3 is being worthless — having no inherent value apart from achievements. Their core desire is to feel valuable and successful. The deepest wound: believing 'I am only worth what I accomplish.'",
        highlight: "worthless",
      },
    },
    {
      id: "u5-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core fear of Type 3?",
        options: [
          "Being abandoned by loved ones",
          "Being corrupt or morally flawed",
          "Being worthless or without inherent value",
          "Being overwhelmed and helpless",
        ],
        correctIndex: 2,
        explanation:
          "Threes carry the deep belief that they have no inherent worth — that their value comes entirely from what they achieve. Without accomplishments, they fear they're nothing.",
      },
    },
    {
      id: "u5-l1-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Why are Type 3s called 'chameleons'?",
        options: [
          "They change their hair color frequently",
          "They adapt their image to match what's valued in each environment",
          "They're shy and try to blend in",
          "They can't make up their mind",
        ],
        correctIndex: 1,
        explanation:
          "Threes unconsciously read the room and become what's valued there. At work they're the star employee; at a creative gathering they're the artist; at a fitness class they're the most dedicated. The persona shifts, but the drive stays the same.",
      },
    },
    {
      id: "u5-l1-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Type 3 is in which center of intelligence?",
        options: [
          "Body/Gut Center",
          "Head Center",
          "Heart/Feeling Center",
          "All three equally",
        ],
        correctIndex: 2,
        explanation:
          "Like Types 2 and 4, Threes are in the Heart triad — their core issue is identity and shame. Threes cope with shame by becoming whatever earns admiration, burying their authentic self under the successful image.",
      },
    },
    {
      id: "u5-l1-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each Type 3 concept to its description.",
        pairs: [
          { left: "Core Fear", right: "Being worthless without achievements" },
          { left: "Core Desire", right: "To feel valuable and successful" },
          { left: "Chameleon Pattern", right: "Adapting image to each context" },
          { left: "Core Wound", right: "'I am only worth what I accomplish'" },
        ],
      },
    },
    {
      id: "u5-l1-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Type 3s fear that without their ___, they have no inherent value.",
        options: ["relationships", "knowledge", "achievements", "moral code"],
        correctIndex: 2,
        explanation:
          "Achievements are the Three's proof of worth. Strip away the resume, the titles, the accolades, and the Three faces their deepest terror: 'Am I anyone without all this?'",
      },
    },
    {
      id: "u5-l1-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "The Three's biggest challenge is losing touch with their ___ self underneath the image they project.",
        options: ["authentic", "creative", "intellectual", "social"],
        correctIndex: 0,
        explanation:
          "Threes become so good at performing the successful version of themselves that they can lose access to who they genuinely are — their real feelings, desires, and identity.",
      },
    },
    {
      id: "u5-l1-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Jordan just got a major promotion and immediately posted about it on LinkedIn, updated their bio on all social platforms, and started name-dropping the new title in conversations. When a friend asks 'But are you happy?', Jordan pauses and genuinely doesn't know how to answer.",
        question: "What Type 3 dynamic is this illustrating?",
        options: [
          "Jordan is just excited about the promotion",
          "Jordan is so focused on the image of success that they've lost touch with their actual feelings",
          "Jordan is a narcissist",
          "This is a Type 7 seeking stimulation",
        ],
        correctIndex: 1,
        explanation:
          "The promotion IS the feeling for a Three — or at least, that's how it's supposed to work. The fact that Jordan can't answer 'Are you happy?' reveals the gap between the successful image and the person underneath it.",
      },
    },
    {
      id: "u5-l1-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "At a dinner party, Sam effortlessly shifts between groups: with the tech founders, Sam talks startups; with the artists, Sam discusses gallery shows; with the parents, Sam shares parenting wins. Each group thinks Sam is 'one of them.' Afterward, Sam's partner asks: 'Who were you tonight?'",
        question: "What does Sam's partner's question reveal?",
        options: [
          "Sam is just a good conversationalist",
          "The chameleon pattern — Sam becomes whatever is valued, but the partner notices the real Sam disappeared",
          "Sam is being dishonest and manipulative",
          "Sam has social anxiety",
        ],
        correctIndex: 1,
        explanation:
          "This is the Three's chameleon gift — and curse. They're genuine in each interaction (they're not lying), but they're performing a version of themselves tailored to each audience. The partner's question points to the missing center.",
      },
    },
    {
      id: "u5-l1-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "After being laid off, Taylor spirals. They can't bring themselves to tell friends or family, avoid social events, and feel a deep, unfamiliar emptiness. Taylor thinks: 'If I'm not the successful one, I'm nobody.'",
        question: "What is Taylor experiencing?",
        options: [
          "Normal sadness about job loss",
          "The Three's core fear surfacing: without achievements, they feel worthless",
          "Clinical depression unrelated to Enneagram type",
          "The stress move to Type 9",
        ],
        correctIndex: 1,
        explanation:
          "Job loss hits Threes differently because their identity IS their achievements. This isn't just losing a job — it's losing the proof that they have value. The shame of the Heart triad floods in with full force.",
      },
    },
    {
      id: "u5-l1-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core desire of Type 3?",
        options: [
          "To be loved unconditionally",
          "To be valuable and successful",
          "To understand how things work",
          "To be unique and authentic",
        ],
        correctIndex: 1,
        explanation:
          "Threes want to matter — to be seen as valuable, successful, and worthy of admiration. Everything they do is oriented toward proving their worth through accomplishment.",
      },
    },
  ],
};

// ── Lesson 2: Passion & Virtue + Health Levels ────────────────────────────

const lesson2: Lesson = {
  id: "u5-l2",
  unitId: "type-3",
  order: 2,
  title: "Deceit to Truthfulness",
  subtitle: "The passion, virtue, and health levels of Type 3",
  xpReward: 25,
  exercises: [
    {
      id: "u5-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Passion: Deceit (Vanity)",
        body: "Naranjo identified the Three's passion as Deceit or Vanity — not outward lying, but self-deception. Threes become so identified with their successful image that they lose touch with who they really are. They 'become the mask.'",
        highlight: "self-deception",
      },
    },
    {
      id: "u5-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Virtue: Truthfulness (Authenticity)",
        body: "The antidote is Truthfulness — radical honesty about who you are beneath the performance. Healthy Threes learn to show up as themselves, even when it's not the most impressive version, and discover they're valued anyway.",
        highlight: "Truthfulness",
      },
    },
    {
      id: "u5-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the passion of Type 3 according to Naranjo?",
        options: ["Anger", "Pride", "Deceit/Vanity", "Avarice"],
        correctIndex: 2,
        explanation:
          "Deceit doesn't mean Threes are liars — it means they deceive themselves. They become so good at projecting success that they lose track of what's real vs. performance.",
      },
    },
    {
      id: "u5-l2-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "The Three's 'Deceit' is primarily directed at:",
        options: [
          "Other people — they lie to get ahead",
          "Themselves — they lose touch with their authentic self",
          "Authority figures — they fake competence",
          "Family — they hide their true career",
        ],
        correctIndex: 1,
        explanation:
          "The deepest deception is internal. Threes aren't trying to con people — they've conned themselves into believing the image IS who they are. When asked 'Who are you really?', they may genuinely not know.",
      },
    },
    {
      id: "u5-l2-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the virtue of Type 3?",
        options: ["Humility", "Serenity", "Truthfulness/Authenticity", "Equanimity"],
        correctIndex: 2,
        explanation:
          "Truthfulness is the Three's path to freedom. It means showing up as who you really are — messy, uncertain, imperfect — and trusting that you have inherent worth beyond your accomplishments.",
      },
    },
    {
      id: "u5-l2-e6",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort these Type 3 traits by health level.",
        categories: ["Healthy", "Average", "Unhealthy"],
        items: [
          { text: "Authentic and self-accepting", categoryIndex: 0 },
          { text: "Image-conscious and competitive", categoryIndex: 1 },
          { text: "Deceptive and narcissistic", categoryIndex: 2 },
          { text: "Genuine and inspiring to others", categoryIndex: 0 },
          { text: "Self-promoting and calculating", categoryIndex: 1 },
          { text: "Exploitative and vindictive", categoryIndex: 2 },
        ],
      },
    },
    {
      id: "u5-l2-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "A healthy Three embodies ___ — showing up as their real self rather than performing.",
        options: ["Serenity", "Truthfulness", "Humility", "Non-Attachment"],
        correctIndex: 1,
        explanation:
          "When Threes access Truthfulness, they become genuinely inspiring — not because of what they've achieved, but because of who they authentically are. Their natural charisma serves connection instead of image.",
      },
    },
    {
      id: "u5-l2-e8",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each health level to how Type 3 relates to identity.",
        pairs: [
          { left: "Healthy", right: "Knows who they are apart from achievements" },
          { left: "Average", right: "Identity merges with image and role" },
          { left: "Unhealthy", right: "Will deceive and exploit to maintain image" },
          { left: "Virtue (Truthfulness)", right: "Radical honesty about the real self" },
        ],
      },
    },
    {
      id: "u5-l2-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Alex is a successful lawyer who has been in therapy for a year. At a dinner party, when someone asks what they do, Alex says: 'I'm a lawyer, but honestly, I've been questioning whether I chose this career because I wanted it or because it impressed people. I'm still figuring that out.' There's a vulnerable pause.",
        question: "What's happening for Alex?",
        options: [
          "Alex is having a midlife crisis",
          "Alex is accessing Truthfulness — being honest about the gap between image and self",
          "Alex is fishing for compliments",
          "Alex is moving to their stress point",
        ],
        correctIndex: 1,
        explanation:
          "This is a Three practicing radical Truthfulness — admitting uncertainty and vulnerability instead of performing success. That 'vulnerable pause' is the sound of a mask being set down, which takes enormous courage.",
      },
    },
    {
      id: "u5-l2-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Riley's social media is a perfectly curated highlight reel: promotions, exotic vacations, gym selfies. In private, Riley feels empty and disconnected. When a friend comments 'Your life looks amazing!', Riley smiles but thinks: 'If you only knew.'",
        question: "Which aspect of the Three's passion is this?",
        options: [
          "Healthy self-presentation",
          "The self-deception of Vanity — the image has become more real than the person",
          "Normal social media behavior",
          "Type 4 melancholy, not Type 3",
        ],
        correctIndex: 1,
        explanation:
          "Riley has 'become the mask' — the online persona looks successful, but the person behind it feels hollow. The passion of Deceit/Vanity has created a gap between image and reality that Riley can feel but can't bridge.",
      },
    },
    {
      id: "u5-l2-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "A colleague caught exaggerating their sales numbers gets defensive: 'Everyone inflates a little — it's just how the game is played. Besides, I would have hit those numbers next quarter anyway.' They seem to genuinely believe their own spin.",
        question: "What unhealthy Three pattern is this?",
        options: [
          "Normal workplace behavior",
          "Self-deception — they've rationalized dishonesty to protect their image of success",
          "Healthy competitive drive",
          "Type 8 power-seeking",
        ],
        correctIndex: 1,
        explanation:
          "At unhealthy levels, the Three's self-deception can cross into actual deception. The key marker: they genuinely believe their own rationalization. The line between image and reality has completely blurred.",
      },
    },
    {
      id: "u5-l2-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "The phrase 'becoming the mask' refers to:",
        options: [
          "Type 4's emotional depth",
          "Type 3's self-deception — losing the real self behind the image",
          "Type 9's merging with others",
          "Type 7's avoidance of pain",
        ],
        correctIndex: 1,
        explanation:
          "This is the Three's signature struggle. They perform success so convincingly that even they forget there's a person underneath. The mask IS the face — until they start doing the work of Truthfulness.",
      },
    },
  ],
};

// ── Lesson 3: Wings, Stress Line & Growth Line ───────────────────────────

const lesson3: Lesson = {
  id: "u5-l3",
  unitId: "type-3",
  order: 3,
  title: "How Threes Shift",
  subtitle: "Wings, stress, and growth lines of Type 3",
  xpReward: 25,
  exercises: [
    {
      id: "u5-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Two Wings of Type 3",
        body: "A 3w2 (The Charmer) combines ambition with warmth and people-skills — they succeed through personal connection. A 3w4 (The Professional) combines ambition with introspection — they're more serious, artistic, and focused on craft over charm.",
        highlight: "3w2 vs 3w4",
      },
    },
    {
      id: "u5-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Stress & Growth Lines",
        body: "Under stress, Threes move to Type 9 — becoming disengaged, numbed out, and losing their drive. In growth, Threes move to Type 6 — becoming loyal, cooperative, and less focused on personal image.",
        highlight: "Stress → 9, Growth → 6",
      },
    },
    {
      id: "u5-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What are the two wings of Type 3?",
        options: [
          "3w2 (The Charmer) and 3w4 (The Professional)",
          "3w1 (The Reformer) and 3w5 (The Investigator)",
          "3w2 (The Helper) and 3w4 (The Individualist)",
          "3w4 (The Artist) and 3w2 (The Socialite)",
        ],
        correctIndex: 0,
        explanation:
          "The 3w2 (Charmer) is warmer, more people-oriented and uses charisma to succeed. The 3w4 (Professional) is more introspective, artistic, and focused on quality and craft.",
      },
    },
    {
      id: "u5-l3-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Under stress, Type 3 moves to which type?",
        options: ["Type 6", "Type 7", "Type 9", "Type 1"],
        correctIndex: 2,
        explanation:
          "Stressed Threes suddenly lose their trademark drive and become Nine-like: disengaged, numb, binge-watching TV instead of conquering the world. It's like someone pulled the plug on their energy.",
      },
    },
    {
      id: "u5-l3-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "In growth, Type 3 moves toward which type?",
        options: ["Type 9", "Type 6", "Type 1", "Type 4"],
        correctIndex: 1,
        explanation:
          "Growing Threes access healthy Six energy — they become genuinely loyal, commit to something bigger than their personal brand, and value cooperation over competition.",
      },
    },
    {
      id: "u5-l3-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each wing or line to its description.",
        pairs: [
          { left: "3w2 (The Charmer)", right: "Warm, people-oriented, uses charisma" },
          { left: "3w4 (The Professional)", right: "Introspective, artistic, craft-focused" },
          { left: "Stress → Type 9", right: "Disengaged, numbed out, loses drive" },
          { left: "Growth → Type 6", right: "Loyal, cooperative, team-focused" },
        ],
      },
    },
    {
      id: "u5-l3-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Under stress, the usually driven Type 3 becomes ___ and loses their characteristic energy.",
        options: ["aggressive", "anxious", "disengaged", "scattered"],
        correctIndex: 2,
        explanation:
          "The move to Nine is startling for Threes and the people around them. The go-getter suddenly can't get off the couch. It's the psyche's emergency brake — when the performance engine overheats, it just shuts down.",
      },
    },
    {
      id: "u5-l3-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "A 3w4 is called The ___ because they combine drive with introspection and artistic sensibility.",
        options: ["Charmer", "Professional", "Achiever", "Performer"],
        correctIndex: 1,
        explanation:
          "The 3w4 (Professional) is the more serious, inner-focused version of the Three. They care about craft and substance, not just appearances — think of the surgeon who wants to be the best at their specialty, not just famous.",
      },
    },
    {
      id: "u5-l3-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Quinn, a high-performing sales manager, has been working 70-hour weeks for months. One weekend, Quinn can't get out of bed. They spend three days binge-watching reality TV, ignoring emails, and feeling strangely detached from everything. Their partner is alarmed — this isn't like Quinn at all.",
        question: "What's happening to Quinn?",
        options: [
          "Quinn has clinical depression",
          "Quinn is moving to their stress point (Type 9) — shutting down after overperformance",
          "Quinn is growing into healthy Six energy",
          "Quinn is just tired and needs rest",
        ],
        correctIndex: 1,
        explanation:
          "This is the Three's stress move to Nine. After pushing too hard for too long, the system crashes. The numbness, disengagement, and inability to mobilize are all Nine territory — the body forcing the Three to stop.",
      },
    },
    {
      id: "u5-l3-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "After years of climbing the corporate ladder, Reese took a step back and joined a nonprofit. Reese says: 'I realized I was building my resume, not building anything that mattered. Now I care more about our mission than my title. I don't need to be the star — I need to be useful.'",
        question: "What growth line is Reese accessing?",
        options: [
          "Stress move to Type 9 — giving up ambition",
          "Growth to Type 6 — loyalty, commitment to something bigger than self-image",
          "Wing shift to 3w4 — becoming more artistic",
          "This isn't a Three anymore",
        ],
        correctIndex: 1,
        explanation:
          "Reese is accessing healthy Six energy — genuine commitment to a cause, team loyalty, and willingness to serve rather than star. The ambition hasn't disappeared; it's been redirected toward something meaningful.",
      },
    },
    {
      id: "u5-l3-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Two Threes run their own businesses. One is a real estate agent who thrives on client relationships, throws lavish open houses, and is known for their magnetic personality. The other is a software architect who stays up late perfecting code, presents at conferences with polished slides, and cares deeply about building elegant systems.",
        question: "How would you distinguish their wings?",
        options: [
          "First is 3w2 (Charmer — people-oriented), second is 3w4 (Professional — craft-oriented)",
          "First is 3w4, second is 3w2",
          "Both are 3w2 — they're both successful",
          "Wings don't explain this difference",
        ],
        correctIndex: 0,
        explanation:
          "The 3w2 succeeds through people and warmth — they charm their way to the top. The 3w4 succeeds through mastery and substance — they earn respect through depth of skill. Same drive, different fuel.",
      },
    },
    {
      id: "u5-l3-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "The Three's growth toward Type 6 helps them develop:",
        options: [
          "More ambition and drive",
          "Loyalty and commitment to something beyond personal image",
          "Better emotional expression",
          "Stronger boundaries",
        ],
        correctIndex: 1,
        explanation:
          "Six energy gives Threes what they most need: the ability to commit to something real rather than performing. Loyalty to people, causes, and communities rather than personal brand.",
      },
    },
  ],
};

// ── Lesson 4: Spotting This Type + Common Mistypes ────────────────────────

const lesson4: Lesson = {
  id: "u5-l4",
  unitId: "type-3",
  order: 4,
  title: "Spotting the Three",
  subtitle: "Real-world recognition and common mistypes",
  xpReward: 30,
  exercises: [
    {
      id: "u5-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "How to Spot a Type 3",
        body: "Threes are energetic, efficient, and focused. They steer conversations toward accomplishments, keep things moving, and have little patience for inefficiency. They dress for the context, have polished social skills, and radiate confidence.",
        highlight: "polished and efficient",
      },
    },
    {
      id: "u5-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Common Mistypes",
        body: "Type 3 is often confused with Type 7 (both energetic and positive) and Type 8 (both assertive and driven). Key differences: Threes are goal-focused and image-aware; Sevens are experience-focused and spontaneous; Eights are power-focused and don't care about image.",
        highlight: "goal-focused vs. experience-focused vs. power-focused",
      },
    },
    {
      id: "u5-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which behavior is most characteristic of Type 3?",
        options: [
          "Getting lost in deep philosophical questions",
          "Steering conversations toward accomplishments and results",
          "Avoiding social situations to recharge",
          "Worrying about worst-case scenarios",
        ],
        correctIndex: 1,
        explanation:
          "Threes naturally gravitate toward talking about what they've done, what they're working on, and what they're going to achieve next. Results and accomplishments are their native language.",
      },
    },
    {
      id: "u5-l4-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Type 3 is commonly mistyped as which type?",
        options: ["Type 2", "Type 4", "Type 7", "Type 9"],
        correctIndex: 2,
        explanation:
          "Both Threes and Sevens are high-energy, positive, and future-oriented. But Threes are driven by goals and image; Sevens are driven by new experiences and avoiding pain.",
      },
    },
    {
      id: "u5-l4-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What distinguishes Type 3 from Type 8?",
        options: [
          "Threes are stronger than Eights",
          "Threes care about image; Eights care about power and don't worry about what others think",
          "Eights are more ambitious than Threes",
          "There's no meaningful difference",
        ],
        correctIndex: 1,
        explanation:
          "Both are assertive go-getters, but Threes constantly calibrate to how they're perceived. Eights couldn't care less about appearances — they want impact and control, not applause.",
      },
    },
    {
      id: "u5-l4-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each type to what drives their energy.",
        pairs: [
          { left: "Type 3", right: "Achieving goals and being admired" },
          { left: "Type 7", right: "Seeking new experiences and avoiding pain" },
          { left: "Type 8", right: "Exerting power and maintaining control" },
          { left: "Type 1", right: "Meeting internal moral standards" },
        ],
      },
    },
    {
      id: "u5-l4-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "While Threes pursue goals for ___, Sevens pursue experiences for stimulation.",
        options: ["safety", "admiration", "knowledge", "connection"],
        correctIndex: 1,
        explanation:
          "Admiration is the Three's fuel. They want to be seen as successful, capable, and impressive. Sevens, on the other hand, just want to have a good time — they don't particularly care who's watching.",
      },
    },
    {
      id: "u5-l4-e8",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort these behaviors: Type 3 or Type 7?",
        categories: ["More likely Type 3", "More likely Type 7"],
        items: [
          {
            text: "Creates a five-year career plan with milestones",
            categoryIndex: 0,
          },
          {
            text: "Books a spontaneous trip to a country they've never visited",
            categoryIndex: 1,
          },
          {
            text: "Updates LinkedIn profile after every accomplishment",
            categoryIndex: 0,
          },
          {
            text: "Starts three new hobbies in one month",
            categoryIndex: 1,
          },
          {
            text: "Dresses specifically for the audience they're meeting",
            categoryIndex: 0,
          },
          {
            text: "Gets bored midway through a project and pivots to something new",
            categoryIndex: 1,
          },
        ],
      },
    },
    {
      id: "u5-l4-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Two colleagues both seem driven and successful. Person A tracks their quarterly metrics religiously and adjusts their personal brand based on company values. Person B challenges the CEO in meetings, doesn't care about office politics, and says 'I don't need anyone's approval — I just need results.'",
        question: "Which is more likely a Three, and which an Eight?",
        options: [
          "A is Type 3 (image-aware goal pursuit), B is Type 8 (power-driven, unconcerned with image)",
          "A is Type 8, B is Type 3",
          "Both are Type 3 — just different styles",
          "Both are Type 8 — just different intensities",
        ],
        correctIndex: 0,
        explanation:
          "Person A adjusts to what's valued (Three's image-management). Person B bulldozes regardless of perception (Eight's power drive). Both are effective, but the relationship to image is completely different.",
      },
    },
    {
      id: "u5-l4-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Your friend is energetic, always has exciting plans, and seems to be thriving. You're trying to figure out if they're a Three or a Seven. You ask: 'What's most important to you about this new project?' They answer: 'I love that it's something nobody in our industry has tried — it's going to be an adventure!'",
        question: "What does this response suggest?",
        options: [
          "Definitely a Three — they want to be first",
          "More likely a Seven — the excitement is about novelty and experience, not achievement or recognition",
          "Could be either — need more information",
          "This is actually a Type 4 response",
        ],
        correctIndex: 1,
        explanation:
          "The Seven answer focuses on novelty ('nobody has tried it') and experience ('an adventure'). A Three answer would more likely emphasize outcomes: 'This could put us on the map' or 'I think we can dominate this space.'",
      },
    },
    {
      id: "u5-l4-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "You observe someone at a networking event. They shake hands confidently, hand out business cards, and share a polished 30-second pitch. But when someone asks about their weekend, they seem momentarily lost — then quickly redirect to a work accomplishment.",
        question: "Which Type 3 pattern is visible here?",
        options: [
          "Healthy confidence and social skills",
          "The struggle to connect outside of the 'achiever' persona — personal identity is underdeveloped",
          "Normal introversion",
          "Type 8 dominance behavior",
        ],
        correctIndex: 1,
        explanation:
          "The hesitation when asked a personal (non-achievement) question is a telltale Three sign. They're fluent in the language of accomplishment but may stumble when asked to just be a person rather than a performer.",
      },
    },
    {
      id: "u5-l4-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "The most reliable way to distinguish a Three from other driven types is:",
        options: [
          "How much money they make",
          "Whether they care about how their success is perceived by others",
          "How many hours they work",
          "Whether they're introverted or extroverted",
        ],
        correctIndex: 1,
        explanation:
          "Image-awareness is the Three's fingerprint. Eights don't care what you think. Sevens don't care if it looks impressive. Ones care if it's right. Only Threes are tracking how their success looks to the audience.",
      },
    },
  ],
};

export const type3Lessons: Lesson[] = [lesson1, lesson2, lesson3, lesson4];
