// ─────────────────────────────────────────────────────────────────────────────
// Unit 10, Type 8: The Challenger
// 4 lessons × 12 exercises each
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson, FreeRecallContent, InterleavingExerciseContent } from "@/types/lessons";

// ── Lesson 1: Core Motivation, Fear & Desire ────────────────────────────────

const lesson1: Lesson = {
  id: "u10-l1",
  scaffoldStep: 2 as const,
  unitId: "type-8",
  order: 1,
  title: "The Challenger's Core",
  subtitle: "Who is Type 8? Motivation, fear, and desire",
  xpReward: 20,
  exercises: [
    {
      id: "u10-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Meet the Challenger",
        body: "Type 8 is driven by a need for control, autonomy, and the protection of the vulnerable. They are the most assertive and powerful of all types, direct, decisive, and willing to confront anyone. Beneath this strength lies a deep refusal to ever be controlled or harmed again.",
        highlight: "control and autonomy",
      },
    },
    {
      id: "u10-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Core Fear",
        body: "Eights fear being controlled, violated, or harmed by others. Many Eights learned early that the world is unjust and that vulnerability leads to being taken advantage of. Their strength is a fortress built around a tender core they refuse to expose.",
        highlight: "being controlled",
      },
    },
    {
      id: "u10-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core desire of Type 8?",
        options: [
          "To be loved and appreciated",
          "To self-protect and be in control of their own life",
          "To achieve success and admiration",
          "To find inner peace and harmony",
        ],
        correctIndex: 1,
        explanation:
          "Eights desire self-protection and control. They want to determine their own course in life and never be at the mercy of anyone else.",
      },
    },
    {
      id: "u10-l1-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core fear of Type 8?",
        options: [
          "Being without support and guidance",
          "Being trapped in pain or boredom",
          "Being controlled, violated, or harmed",
          "Being corrupt or morally flawed",
        ],
        correctIndex: 2,
        explanation:
          "Eights' deepest fear is losing autonomy, being controlled, manipulated, or harmed by others. This drives their fierce independence and confrontational stance.",
      },
    },
    {
      id: "u10-l1-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "Why is Type 8 also called 'The Protector'?",
        options: [
          "They protect their own image",
          "They naturally extend their strength to defend vulnerable people and causes",
          "They protect their intellectual privacy",
          "They protect their emotions by being overly sentimental",
        ],
        correctIndex: 1,
        explanation:
          "Eights have a strong protective instinct. Having often experienced injustice themselves, they use their power to champion underdogs and defend those who can't defend themselves.",
      },
    },
    {
      id: "u10-l1-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each Type 8 trait to its description.",
        pairs: [
          { left: "Directness", right: "Says exactly what they mean, no sugarcoating" },
          { left: "Protectiveness", right: "Defends vulnerable people and causes" },
          { left: "Control", right: "Needs to determine their own course" },
          { left: "Intensity", right: "Approaches everything with full force" },
          { left: "Denial of vulnerability", right: "Refuses to show weakness or tenderness" },
        ],
      },
    },
    {
      id: "u10-l1-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Eights build a fortress of strength because they believe that showing ___ will allow others to control or hurt them.",
        options: ["ambition", "vulnerability", "intelligence", "creativity"],
        correctIndex: 1,
        explanation:
          "The Eight's armor of toughness is built to hide vulnerability. They've decided, often unconsciously, that tenderness is dangerous and strength is the only safe option.",
      },
    },
    {
      id: "u10-l1-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Unlike types who seek external validation, Eights are primarily motivated by ___, the ability to determine their own path.",
        options: ["admiration", "autonomy", "belonging", "knowledge"],
        correctIndex: 1,
        explanation:
          "Autonomy is the Eight's oxygen. They'd rather make a mistake on their own terms than succeed under someone else's direction.",
      },
    },
    {
      id: "u10-l1-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "At a restaurant, the server gets Dani's order wrong. Dani immediately calls them over, speaks firmly: 'This isn't what I ordered. I need this fixed now.' Their dinner companion is embarrassed, but Dani doesn't see the problem, 'I'm just being direct. Why would I eat something I didn't order?'",
        question: "Which Eight pattern is Dani displaying?",
        options: [
          "Rude behavior unrelated to type",
          "Eight directness, they say exactly what they mean and expect action",
          "Passive-aggressive manipulation",
          "Anxious overreaction to a small problem",
        ],
        correctIndex: 1,
        explanation:
          "Dani's directness is classic Eight. They don't see it as rude, they see it as honest. Eights often can't understand why others don't just say what they want.",
      },
    },
    {
      id: "u10-l1-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Marcus notices his quiet coworker is being talked over in every meeting. Without being asked, Marcus interrupts the next meeting to say, 'Hey, Priya had the floor. Let her finish.' He does this consistently, even when Priya doesn't ask for help.",
        question: "What core Eight motivation drives Marcus?",
        options: [
          "A need to be admired as a leader",
          "Protectiveness, using his power to defend someone vulnerable",
          "A need to control the meeting",
          "Anxiety about conflict in the group",
        ],
        correctIndex: 1,
        explanation:
          "Marcus is expressing the Eight's protective instinct. Eights are natural champions of the underdog, they instinctively use their power to shield those who can't or won't fight for themselves.",
      },
    },
    {
      id: "u10-l1-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "After a vulnerable conversation where Rosa accidentally cried in front of a colleague, she spends the next week overcompensating, being extra tough, taking on massive projects, and shutting down any personal conversations. She's furious at herself for 'losing control.'",
        question: "What core Eight fear was triggered?",
        options: [
          "Fear of not being successful enough",
          "Fear of being seen as vulnerable, which means being controllable",
          "Fear of losing friends",
          "Fear of not being unique",
        ],
        correctIndex: 1,
        explanation:
          "Rosa's reaction reveals the Eight's deepest fear: vulnerability equals danger. She showed her soft side and now her defense system is in overdrive to rebuild the wall.",
      },
    },
    {
      id: "u10-l1-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "What lies beneath the Eight's tough exterior?",
        options: [
          "Nothing, they are exactly as tough as they appear",
          "A tender, vulnerable core they work hard to protect",
          "A desire to be the center of attention",
          "Intellectual curiosity they're hiding",
        ],
        correctIndex: 1,
        explanation:
          "Beneath every Eight's armor is a tender heart. Their toughness isn't absence of feeling, it's a fierce protection of deep feeling they've learned to hide.",
      },
    },
  ],
};

// ── Lesson 2: Passion & Virtue + Health Levels ──────────────────────────────

const lesson2: Lesson = {
  id: "u10-l2",
  scaffoldStep: 2 as const,
  unitId: "type-8",
  order: 2,
  title: "Lust, Innocence & Health",
  subtitle: "Naranjo's passion, the virtue of innocence, and three health levels",
  xpReward: 25,
  exercises: [
    {
      id: "u10-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Passion: Lust",
        body: "In Naranjo's system, Eight's emotional passion is Lust, but NOT sexual desire. Lust here means intensity, excess, and going big in everything: big emotions, big reactions, big appetites. Eights approach life at full throttle and can't stand anything that feels half-hearted or lukewarm.",
        highlight: "Lust",
      },
    },
    {
      id: "u10-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Virtue: Innocence",
        body: "The antidote to Lust is Innocence, a return to openness, tenderness, and simplicity. Healthy Eights discover that they don't need to dominate every situation. They can let their guard down, be gentle, and experience life without needing to control it.",
        highlight: "Innocence",
      },
    },
    {
      id: "u10-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What does 'Lust' mean as the Eight's passion in Naranjo's system?",
        options: [
          "Sexual desire",
          "A craving for power over others",
          "Intensity and excess in all things, going big, living at full throttle",
          "Laziness disguised as ambition",
        ],
        correctIndex: 2,
        explanation:
          "Naranjo's Lust is about intensity, not sex. Eights approach everything, work, play, conflict, love, with maximum force. Anything lukewarm feels inauthentic to them.",
      },
    },
    {
      id: "u10-l2-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What does 'Innocence' mean as the Eight's virtue?",
        options: [
          "Being naive and gullible",
          "Openness, tenderness, and letting the guard down",
          "Returning to childhood behavior",
          "Avoiding all conflict",
        ],
        correctIndex: 1,
        explanation:
          "Innocence for an Eight means recovering the openness and tenderness they armored over. It's not naivety, it's the courage to be gentle and receptive.",
      },
    },
    {
      id: "u10-l2-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "Why is 'Lust' a counterintuitive name for the Eight's passion?",
        options: [
          "Because Eights don't feel passionate about anything",
          "Because people assume it means sexual desire, but it actually refers to a lust for intensity and aliveness in everything",
          "Because Eights are usually calm and measured",
          "Because Lust is usually associated with Type 2",
        ],
        correctIndex: 1,
        explanation:
          "The word 'Lust' misleads people into thinking it's about sex. Naranjo means a lust for LIFE, for intensity, impact, volume, and full-throttle engagement with everything.",
      },
    },
    {
      id: "u10-l2-e6",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort these Type 8 traits into the correct health level.",
        categories: ["Healthy", "Average", "Unhealthy"],
        items: [
          { text: "Magnanimous and heroic", categoryIndex: 0 },
          { text: "Merciful and self-restrained", categoryIndex: 0 },
          { text: "Domineering and confrontational", categoryIndex: 1 },
          { text: "Intimidating and willful", categoryIndex: 1 },
          { text: "Ruthless and dictatorial", categoryIndex: 2 },
          { text: "Vengeful and destructive", categoryIndex: 2 },
        ],
      },
    },
    {
      id: "u10-l2-e7",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match the health level to its Eight behavior.",
        pairs: [
          { left: "Healthy", right: "Uses power to empower others, magnanimous" },
          { left: "Average", right: "Domineering, confrontational, must be in charge" },
          { left: "Unhealthy", right: "Ruthless, destructive, crushes opposition" },
          { left: "Passion (Lust)", right: "Compulsive intensity and excess in everything" },
          { left: "Virtue (Innocence)", right: "Openness, gentleness, dropping the armor" },
        ],
      },
    },
    {
      id: "u10-l2-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "An Eight's Lust shows up not just in anger but in everything, they love ___, fight hard, work intensely, and feel deeply.",
        options: ["cautiously", "fiercely", "analytically", "passively"],
        correctIndex: 1,
        explanation:
          "The Eight's Lust is all-encompassing intensity. They don't do anything halfway, their love is fierce, their anger is powerful, their play is intense.",
      },
    },
    {
      id: "u10-l2-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Alex runs a startup. When things go well, the celebrations are huge, expensive dinners, big bonuses. When a competitor threatens them, Alex works 18-hour days, takes every meeting as a battle, and tells the team they're 'going to war.' Everything is at maximum volume, all the time.",
        question: "What Eight passion is driving Alex?",
        options: [
          "Vanity, they want to appear successful",
          "Gluttony, they can't get enough experiences",
          "Lust, they approach everything with maximum intensity and excess",
          "Fear, they're anxious about the competition",
        ],
        correctIndex: 2,
        explanation:
          "Alex is deep in the passion of Lust: everything is dialed to maximum. Celebrations are huge, threats are existential, and the only acceptable volume is full blast.",
      },
    },
    {
      id: "u10-l2-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "After a health scare, tough-as-nails CEO Jordan starts showing a different side. They write heartfelt thank-you notes to employees, admit mistakes publicly, and tell their children 'I love you' for the first time in years. Their team is stunned but deeply moved.",
        question: "What virtue is Jordan discovering?",
        options: [
          "Courage, becoming braver",
          "Innocence, opening up to tenderness and vulnerability",
          "Sobriety, becoming more restrained",
          "Right Action, becoming more productive",
        ],
        correctIndex: 1,
        explanation:
          "Jordan is touching the Eight's virtue of Innocence: letting the armor drop, allowing tenderness to come through, and discovering that vulnerability isn't weakness, it's the deepest kind of strength.",
      },
    },
    {
      id: "u10-l2-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Carmen was once a principled leader who used her power to advocate for her team. After a series of betrayals, she became increasingly controlling: firing anyone who disagreed, threatening vendors, and destroying the reputation of a former partner. She says, 'If you cross me, I will end you.'",
        question: "What health level shift has Carmen undergone?",
        options: [
          "She moved from average to healthy by becoming more assertive",
          "She moved from healthy to unhealthy, her power has become destructive and vengeful",
          "She stayed at the same level but changed tactics",
          "She's expressing healthy Eight directness",
        ],
        correctIndex: 1,
        explanation:
          "Carmen has moved down the health levels. Her once-protective strength has degraded into ruthless domination. Unhealthy Eights use power to destroy rather than defend.",
      },
    },
    {
      id: "u10-l2-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "A healthy Eight is best described as:",
        options: [
          "Someone who dominates every room",
          "Someone who uses their power to empower others and can be genuinely tender",
          "Someone who avoids all confrontation",
          "Someone who hides their strength",
        ],
        correctIndex: 1,
        explanation:
          "Healthy Eights are magnanimous leaders who use their strength to uplift others. They've learned that true power includes the ability to be gentle, merciful, and open-hearted.",
      },
    },
    {
      id: "u10-l2-e13",
      difficulty: 3,
      content: {
        type: "free-recall",
        prompt: "In your own words, explain what vulnerability means to a Type 8 and why they avoid it so fiercely.",
        keyTerms: ["control", "betrayal", "weakness", "trust", "armor", "tender", "protection"],
        minWords: 15,
        modelAnswer: "For a Type 8, vulnerability is not just uncomfortable — it feels genuinely dangerous. At the core is a belief that being soft or open gives others power over you, and that this will inevitably lead to betrayal or harm. Often stemming from early experiences where trust was violated, Eights developed armor: project strength, maintain control, never let anyone see the tender interior that could be exploited. What's beneath that armor is usually a surprisingly soft, even childlike core that the Eight has decided must be protected at all costs. The deepest growth for an Eight is learning that genuine strength includes the capacity to trust — and to be touched.",
      } as FreeRecallContent,
    },
  ],
};

// ── Lesson 3: Wings, Stress Line & Growth Line ──────────────────────────────

const lesson3: Lesson = {
  id: "u10-l3",
  scaffoldStep: 4 as const,
  unitId: "type-8",
  order: 3,
  title: "Wings & Lines",
  subtitle: "8w7 vs 8w9, stress to 5, growth to 2",
  xpReward: 25,
  exercises: [
    {
      id: "u10-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Wings: 8w7 and 8w9",
        body: "8w7 (The Maverick) combines Eight's power with Seven's energy, they're entrepreneurial, outgoing, and always in motion. 8w9 (The Bear) combines Eight's strength with Nine's groundedness, they're calmer, more patient, and their power is quieter but immovable.",
        highlight: "8w7 vs 8w9",
      },
    },
    {
      id: "u10-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Stress and Growth Lines",
        body: "Under stress, Eights move to the unhealthy side of Type 5: becoming withdrawn, secretive, and cerebral, retreating from the world they usually dominate. In growth, they move to the healthy side of Type 2: becoming nurturing, caring, and open-hearted.",
        highlight: "stress to 5, growth to 2",
      },
    },
    {
      id: "u10-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Where does Type 8 move under stress?",
        options: ["To 2", "To 7", "To 5", "To 1"],
        correctIndex: 2,
        explanation:
          "Under stress, Eights move to the unhealthy side of 5: they withdraw, become secretive, and retreat into their minds, the opposite of their usual expansive, confrontational energy.",
      },
    },
    {
      id: "u10-l3-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Where does Type 8 move in growth?",
        options: ["To 5", "To 2", "To 9", "To 3"],
        correctIndex: 1,
        explanation:
          "In growth, Eights take on healthy Two qualities: becoming nurturing, genuinely caring for others' well-being, and allowing their natural tenderness to show.",
      },
    },
    {
      id: "u10-l3-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What distinguishes 8w7 from 8w9?",
        options: [
          "8w7 is more outgoing and entrepreneurial; 8w9 is calmer and more grounded",
          "8w7 is more intellectual; 8w9 is more emotional",
          "8w7 is unhealthy; 8w9 is healthy",
          "There is no significant difference",
        ],
        correctIndex: 0,
        explanation:
          "The Seven wing adds energy, adventurousness, and an entrepreneurial streak. The Nine wing adds patience, groundedness, and a steadier, more contained power.",
      },
    },
    {
      id: "u10-l3-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each wing or line to its description.",
        pairs: [
          { left: "8w7, The Maverick", right: "Outgoing, entrepreneurial, high-energy" },
          { left: "8w9, The Bear", right: "Quiet strength, grounded, patient" },
          { left: "Stress to 5", right: "Withdraws, becomes secretive and cerebral" },
          { left: "Growth to 2", right: "Becomes nurturing, caring, open-hearted" },
        ],
      },
    },
    {
      id: "u10-l3-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "When an usually dominant Eight suddenly becomes withdrawn, secretive, and isolated, they are likely moving to their ___ point at Type 5.",
        options: ["growth", "wing", "stress", "integration"],
        correctIndex: 2,
        explanation:
          "Withdrawal is the Eight's stress signal. When overwhelmed, they retreat into Five-like isolation, the opposite of their usual expansive, in-charge presence.",
      },
    },
    {
      id: "u10-l3-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "A growing Eight learns to channel their power into ___ others rather than controlling them.",
        options: ["analyzing", "impressing", "nurturing", "competing with"],
        correctIndex: 2,
        explanation:
          "The growth move to 2 transforms Eight's power from domination to nurturing. Instead of controlling people, they start genuinely caring for them.",
      },
    },
    {
      id: "u10-l3-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "After a major business setback, normally bold and visible CEO Taylor goes silent. They stop attending meetings, lock themselves in their office, obsessively analyze financial data alone, and refuse to talk to anyone about what's happening. The team is confused, this isn't the Taylor they know.",
        question: "What is happening to Taylor?",
        options: [
          "Taylor is showing healthy Eight self-reliance",
          "Taylor is moving to their stress point at Type 5, withdrawing and becoming cerebral",
          "Taylor is showing their 8w9 wing",
          "Taylor has always been a Type 5, not an Eight",
        ],
        correctIndex: 1,
        explanation:
          "Taylor is in their stress line to Type 5. Under extreme pressure, Eights can withdraw completely, retreating into analysis and secrecy instead of their usual take-charge approach.",
      },
    },
    {
      id: "u10-l3-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "A tough-as-nails sports coach known for being demanding and confrontational starts mentoring struggling athletes after hours, driving players to doctor's appointments, and quietly paying for a team member's school supplies. They still coach hard, but there's genuine warmth underneath.",
        question: "What growth line is this coach accessing?",
        options: [
          "Stress to 5, becoming more analytical about coaching",
          "Growth to 2, channeling power into genuine care and nurturing",
          "Wing shift to 8w9, becoming calmer",
          "Losing their Eight edge, becoming too soft",
        ],
        correctIndex: 1,
        explanation:
          "This coach is accessing their growth line to Type 2: using their power and resources to genuinely nurture and care for others. This is the Eight at their best, strong AND tender.",
      },
    },
    {
      id: "u10-l3-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these behaviors by whether they belong to 8w7 or 8w9.",
        categories: ["8w7, The Maverick", "8w9, The Bear"],
        items: [
          { text: "Entrepreneurial, always launching new ventures", categoryIndex: 0 },
          { text: "Quiet authority, doesn't need to prove their power", categoryIndex: 1 },
          { text: "High energy, outgoing, life of the party", categoryIndex: 0 },
          { text: "Patient, grounded, immovable when challenged", categoryIndex: 1 },
          { text: "Restless, always in motion", categoryIndex: 0 },
          { text: "Steady presence, calm under pressure", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u10-l3-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "When a normally bold Eight becomes withdrawn and secretive, this is a sign of:",
        options: [
          "Healthy growth",
          "Natural Eight behavior",
          "Stress, moving to the shadow side of Type 5",
          "A mistype, they're actually a Type 5",
        ],
        correctIndex: 2,
        explanation:
          "Withdrawal and secrecy in a normally expansive Eight signals stress. They're unconsciously adopting unhealthy Type 5 patterns of isolation and cerebral retreat.",
      },
    },
  ],
};

// ── Lesson 4: Spotting This Type + Common Mistypes ──────────────────────────

const lesson4: Lesson = {
  id: "u10-l4",
  scaffoldStep: 1 as const,
  unitId: "type-8",
  order: 4,
  title: "Recognizing the Challenger",
  subtitle: "Spotting Type 8 in the wild and avoiding common mistypes",
  xpReward: 25,
  exercises: [
    {
      id: "u10-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Spotting an Eight",
        body: "Eights fill a room with their presence. They speak directly, make decisions fast, push back immediately when they disagree, and have little patience for indirectness or weakness. They're also fiercely protective of the people they care about.",
        highlight: "fills a room",
      },
    },
    {
      id: "u10-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Common Mistypes",
        body: "Eights are most confused with counterphobic Sixes (both confrontational, but Eights are naturally dominant while counterphobic 6s fight their fear) and Type 3 (both driven, but 8s seek control while 3s seek admiration).",
        highlight: "counterphobic 6 and Type 3",
      },
    },
    {
      id: "u10-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "Which behavior is MOST characteristic of an Eight?",
        options: [
          "Carefully researching every option before deciding",
          "Making quick, decisive calls and expecting others to keep up",
          "Seeking consensus and avoiding conflict",
          "Curating a polished public image",
        ],
        correctIndex: 1,
        explanation:
          "Eights are decisive and action-oriented. They make calls quickly, expect others to match their pace, and have little patience for endless deliberation.",
      },
    },
    {
      id: "u10-l4-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "How do you distinguish an Eight from a counterphobic Six?",
        options: [
          "Eights are never aggressive",
          "Eights are naturally dominant; counterphobic Sixes are fighting against their inner fear",
          "Counterphobic Sixes are stronger than Eights",
          "There is no meaningful difference",
        ],
        correctIndex: 1,
        explanation:
          "The key distinction: Eights don't experience the same anxious inner dialogue. Their dominance is natural, not a reaction to fear. Counterphobic Sixes feel the fear and charge at it anyway.",
      },
    },
    {
      id: "u10-l4-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "In a conflict, how does an Eight typically respond?",
        options: [
          "They avoid it entirely",
          "They analyze it from a distance",
          "They confront it head-on, immediately and directly",
          "They seek consensus before taking a position",
        ],
        correctIndex: 2,
        explanation:
          "Eights don't avoid conflict, they walk straight into it. For Eights, direct confrontation feels honest and efficient. Avoiding conflict feels dishonest and weak.",
      },
    },
    {
      id: "u10-l4-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction:
          "Match the behavior to the correct type, Eight or its common mistype.",
        pairs: [
          { left: "Confrontational because they're naturally powerful", right: "Type 8" },
          { left: "Confrontational because they're fighting inner fear", right: "Counterphobic 6" },
          { left: "Driven by desire for control and autonomy", right: "Type 8" },
          { left: "Driven by desire for admiration and success", right: "Type 3" },
        ],
      },
    },
    {
      id: "u10-l4-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "An Eight tests people through ___, while a Six tests people through questioning and skepticism.",
        options: ["flattery", "confrontation", "withdrawal", "helpfulness"],
        correctIndex: 1,
        explanation:
          "Eights test people by pushing against them, if you can stand up to an Eight without crumbling, they respect you. Sixes test through questioning and doubt.",
      },
    },
    {
      id: "u10-l4-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Both Eights and Threes are driven and high-energy, but Eights want ___ while Threes want admiration.",
        options: ["peace", "knowledge", "control", "uniqueness"],
        correctIndex: 2,
        explanation:
          "Eights and Threes can look similar on the surface, but their core drives differ completely: Eights need control and autonomy, while Threes need recognition and status.",
      },
    },
    {
      id: "u10-l4-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Two leaders both demand a lot from their teams. Leader A says, 'We need to hit these numbers, our reputation depends on it. Let's make sure our presentation blows them away.' Leader B says, 'I don't care what they think. We're doing this my way because I know it's right, and anyone who has a problem with that can talk to me directly.'",
        question: "Which leader is more likely the Eight?",
        options: [
          "Leader A, they're demanding and driven",
          "Leader B, they're focused on control, directness, and autonomy, not image",
          "Both are Eights with different wings",
          "Neither is an Eight",
        ],
        correctIndex: 1,
        explanation:
          "Leader A sounds like a Three (image-conscious, reputation-focused). Leader B is more Eight: unconcerned with image, focused on autonomy, and inviting direct confrontation.",
      },
    },
    {
      id: "u10-l4-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Two coworkers both pushed back in a heated meeting. Afterward, one goes home and replays the argument anxiously: 'Did I go too far? Will there be consequences? What if they come after me now?' The other goes home and doesn't think about it again, the confrontation felt natural and necessary.",
        question: "Which one is the Eight?",
        options: [
          "The first, their intensity signals Eight energy",
          "The second, the confrontation felt natural, not fear-driven",
          "Both are Eights who process differently",
          "Neither, Eights don't attend meetings",
        ],
        correctIndex: 1,
        explanation:
          "The second coworker is the Eight: confrontation feels as natural as breathing. The first is likely a counterphobic Six: they charge at conflict but then the underlying fear catches up.",
      },
    },
    {
      id: "u10-l4-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "At a family gathering, Uncle Ray takes over the grill without being asked, decides the seating arrangement, settles a dispute between two cousins with one firm sentence, and then quietly slips money into a struggling nephew's jacket pocket when no one is looking.",
        question: "What makes this classic Eight behavior?",
        options: [
          "Controlling behavior without any redeeming qualities (unhealthy pattern)",
          "The combination of taking charge, directness, and quiet protectiveness of the vulnerable",
          "People-pleasing through generosity (Type 2)",
          "Performing for family approval (Type 3)",
        ],
        correctIndex: 1,
        explanation:
          "Uncle Ray shows the full Eight picture: taking charge naturally, cutting through conflict directly, and using his power to protect someone vulnerable, all without seeking recognition.",
      },
    },
    {
      id: "u10-l4-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "What's the BEST single clue that someone might be a Type 8?",
        options: [
          "They avoid all forms of conflict",
          "They take control of situations naturally and push back immediately when challenged",
          "They seek reassurance before making decisions",
          "They curate a perfect public image",
        ],
        correctIndex: 1,
        explanation:
          "The most reliable Eight signal is the immediate, natural response to challenge: they push back. Eights don't calculate, they act. And they take charge as naturally as breathing.",
      },
    },
    {
      id: "u10-l4-e13",
      difficulty: 3,
      content: {
        type: "interleaving",
        title: "Types 8, 3 & 6 — Identify the motivation",
        typeNumbers: [8, 3, 6],
        items: [
          {
            statement: "Takes charge of a chaotic situation immediately — not to impress anyone, but because surrendering control feels genuinely dangerous.",
            correctType: 8,
            explanation: "The Eight asserts control because vulnerability is a threat. Power is protection, not performance.",
          },
          {
            statement: "Stays late to solve a problem at work — primarily because resolving it will position them as the indispensable person who saves the day.",
            correctType: 3,
            explanation: "The Three acts for impact and recognition. Their effort is audience-aware.",
          },
          {
            statement: "Defers to the official procedure even when they disagree with it — because following the established structure feels safer than acting on their own judgment.",
            correctType: 6,
            explanation: "The Six uses external structures to manage anxiety. The authority of the procedure provides safety.",
          },
        ],
      } as InterleavingExerciseContent,
    },
  ],
};

export const unit10Lessons: Lesson[] = [lesson1, lesson2, lesson3, lesson4];
