// ─────────────────────────────────────────────────────────────────────────────
// Unit 8, Type 6: The Loyalist
// 4 lessons × 12 exercises each
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson, ExerciseContent, SocraticPromptContent, InterleavingExerciseContent } from "@/types/lessons";
import type { DiscriminationContent } from "@/components/lessons/exercises/DiscriminationExercise";

// ── Lesson 1: Core Motivation, Fear & Desire ────────────────────────────────

const lesson1: Lesson = {
  id: "u8-l1",
  scaffoldStep: 2 as const,
  unitId: "type-6",
  order: 1,
  title: "The Loyalist's Core",
  subtitle: "Who is Type 6? Motivation, fear, and desire",
  xpReward: 20,
  exercises: [
    {
      id: "u8-l1-e0",
      difficulty: 1,
      content: {
        type: "socratic-prompt",
        question: "Think about what it would feel like to genuinely not know if the people in your life would show up for you when it mattered. How would that change how you moved through the world day to day?",
        reflection: "Sit with that uncertainty. What would you do to protect yourself? What would you start to look for in people?",
        revealLabel: "See the insight",
        conceptTitle: "The Question That Never Resolves",
        conceptBody: "Sixes live in chronic uncertainty about whether they can trust. their environment, other people, and especially themselves. This isn't paranoia; it's a learned vigilance from early experiences where the ground shifted. The Six compensates by seeking certainty in structures, authorities, and systems. anything that promises to be reliably there.",
        highlight: "learned vigilance",
      } as SocraticPromptContent,
    },
    {
      id: "u8-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Meet the Loyalist",
        body: "Type 6 is driven by a deep need for security, certainty, and support. They are the most loyal and committed of all types, but their inner world is shaped by vigilance, constantly scanning for what could go wrong.",
        highlight: "security",
      },
    },
    {
      id: "u8-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Core Fear",
        body: "Sixes fear being without support or guidance, being unable to survive on their own. This isn't about physical survival; it's a deep anxiety about navigating an unpredictable world without a reliable safety net.",
        highlight: "without support",
      },
    },
    {
      id: "u8-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core desire of Type 6?",
        options: [
          "To be admired and successful",
          "To have security and support",
          "To be unique and authentic",
          "To be powerful and in control",
        ],
        correctIndex: 1,
        explanation:
          "Sixes desire security and support above all. Their decisions, relationships, and worldview revolve around building and maintaining a sense of safety.",
      },
    },
    {
      id: "u8-l1-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "What best describes the core fear of Type 6?",
        options: [
          "Being trapped in pain or boredom",
          "Being corrupt or morally flawed",
          "Being without support and unable to survive alone",
          "Losing their personal identity",
        ],
        correctIndex: 2,
        explanation:
          "The Six's deepest fear is being left without guidance, support, or the inner resources to navigate life's dangers alone.",
      },
    },
    {
      id: "u8-l1-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "What drives most of a Six's behavior?",
        options: [
          "A need for freedom and stimulation",
          "A need for certainty and reassurance",
          "A need for emotional depth",
          "A need for perfection",
        ],
        correctIndex: 1,
        explanation:
          "Sixes are fundamentally motivated by a need for certainty and reassurance. They test people, systems, and ideas to determine what is reliable.",
      },
    },
    {
      id: "u8-l1-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each Type 6 trait to its description.",
        pairs: [
          { left: "Vigilance", right: "Scanning for potential threats" },
          { left: "Loyalty", right: "Deep commitment to trusted people" },
          { left: "Worst-case thinking", right: "Imagining what could go wrong" },
          { left: "Testing", right: "Checking if others are trustworthy" },
          { left: "Responsibility", right: "Taking duties seriously" },
        ],
      },
    },
    {
      id: "u8-l1-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Type 6 is called The Loyalist because their core drive for ___ leads them to form deep, committed bonds with people and groups they trust.",
        options: ["power", "security", "uniqueness", "perfection"],
        correctIndex: 1,
        explanation:
          "The name 'Loyalist' reflects how Sixes channel their need for security into fierce loyalty to trusted people, institutions, and belief systems.",
      },
    },
    {
      id: "u8-l1-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Sixes often struggle with self-doubt because they have difficulty trusting their own ___.",
        options: ["emotions", "inner guidance", "creativity", "ambition"],
        correctIndex: 1,
        explanation:
          "A hallmark of Type 6 is doubting their own inner authority. They look outward for reassurance because they struggle to trust their own judgment.",
      },
    },
    {
      id: "u8-l1-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Jordan is offered a great new job at a startup. Instead of excitement, their first reaction is to research every possible risk: What if the company fails? What if the team is dysfunctional? They ask five different friends for advice, then still feel uncertain.",
        question: "Which Type 6 pattern is Jordan displaying?",
        options: [
          "Seeking validation through achievement",
          "Avoiding emotional vulnerability",
          "Scanning for threats and seeking external reassurance",
          "Withdrawing to protect their energy",
        ],
        correctIndex: 2,
        explanation:
          "Jordan is showing classic Six behavior: worst-case thinking, exhaustive research, and seeking multiple outside opinions instead of trusting their own judgment.",
      },
    },
    {
      id: "u8-l1-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "At work, Sam notices their manager seems distant this week. Sam immediately wonders: Did I do something wrong? Are they unhappy with my work? Is there a reorganization happening that I don't know about?",
        question: "What Six mechanism is at play here?",
        options: [
          "Image management, worrying about how others perceive them",
          "Projection, attributing their own anxiety to external sources",
          "Repression, pushing their needs out of awareness",
          "Rationalization, reframing negatives as positives",
        ],
        correctIndex: 1,
        explanation:
          "Sixes often use projection: their inner anxiety gets attributed to external circumstances. Sam's own insecurity is projected onto the manager's neutral behavior.",
      },
    },
    {
      id: "u8-l1-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Maya has been with the same company for 12 years. She's had better offers, but stays because she trusts her team, knows the culture, and feels safe there. When friends suggest she's 'settling,' she feels defensive.",
        question: "What core Six motivation explains Maya's behavior?",
        options: [
          "Fear of failure in a new environment",
          "Loyalty born from the deep need for security and trusted support",
          "Laziness and resistance to change",
          "Desire to be seen as a dedicated employee",
        ],
        correctIndex: 1,
        explanation:
          "Maya's loyalty to her company reflects the Six's core pattern: once they find a reliable support system, they commit deeply. This isn't laziness, it's the security drive in action.",
      },
    },
    {
      id: "u8-l1-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "True or false: Type 6 is sometimes called 'The Skeptic' because they question and test before trusting.",
        options: [
          "True, questioning is how Sixes build trust",
          "False, Sixes trust easily",
          "False, only unhealthy Sixes question things",
          "True, but only toward authority figures",
        ],
        correctIndex: 0,
        explanation:
          "The alias 'Skeptic' captures how Sixes naturally question and test people and situations. This isn't cynicism, it's their way of determining what's genuinely trustworthy.",
      },
    },
  ],
};

// ── Lesson 2: Passion & Virtue + Health Levels ──────────────────────────────

const lesson2: Lesson = {
  id: "u8-l2",
  scaffoldStep: 2 as const,
  unitId: "type-6",
  order: 2,
  title: "Fear, Courage & Health",
  subtitle: "Naranjo's passion, the virtue of courage, and three health levels",
  xpReward: 25,
  exercises: [
    {
      id: "u8-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Passion: Fear",
        body: "In Naranjo's system, Six's emotional passion is Fear, not just occasional worry but a chronic scanning for danger. This anxious vigilance shapes how Sixes perceive the world: as fundamentally unreliable and requiring constant threat-assessment.",
        highlight: "Fear",
      },
    },
    {
      id: "u8-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Virtue: Courage",
        body: "The antidote to chronic fear is Courage, not the absence of fear, but the willingness to act despite it. Healthy Sixes learn to trust themselves and move forward without needing absolute certainty first.",
        highlight: "Courage",
      },
    },
    {
      id: "u8-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is Naranjo's emotional passion for Type 6?",
        options: ["Anger", "Fear", "Sloth", "Envy"],
        correctIndex: 1,
        explanation:
          "Fear is the Six's passion, a persistent, underlying anxiety that goes beyond normal worry. It's the emotional engine driving their vigilance and need for certainty.",
      },
    },
    {
      id: "u8-l2-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "What virtue counterbalances the Six's passion of Fear?",
        options: ["Innocence", "Sobriety", "Courage", "Right Action"],
        correctIndex: 2,
        explanation:
          "Courage is the Six's virtue. Growth for a Six means learning to act on their own inner guidance without requiring external guarantees of safety.",
      },
    },
    {
      id: "u8-l2-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "How does the Six's passion of Fear differ from ordinary worry?",
        options: [
          "It only shows up during real danger",
          "It's a chronic baseline state that colors their entire worldview",
          "It makes them unable to function",
          "It only affects their work life",
        ],
        correctIndex: 1,
        explanation:
          "The passion of Fear isn't situational anxiety, it's a persistent undercurrent that shapes how Sixes interpret relationships, decisions, and the future.",
      },
    },
    {
      id: "u8-l2-e6",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort these Type 6 traits into the correct health level.",
        categories: ["Healthy", "Average", "Unhealthy"],
        items: [
          { text: "Self-reliant and courageous", categoryIndex: 0 },
          { text: "Trusting and cooperative", categoryIndex: 0 },
          { text: "Anxious and indecisive", categoryIndex: 1 },
          { text: "Suspicious and reactive", categoryIndex: 1 },
          { text: "Paranoid and panicky", categoryIndex: 2 },
          { text: "Self-defeating and divisive", categoryIndex: 2 },
        ],
      },
    },
    {
      id: "u8-l2-e7",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match the health level to its Six behavior.",
        pairs: [
          { left: "Healthy", right: "Trusts own judgment, takes courageous action" },
          { left: "Average", right: "Seeks reassurance, tests loyalty of others" },
          { left: "Unhealthy", right: "Becomes paranoid, sees enemies everywhere" },
          { left: "Passion (Fear)", right: "Chronic anxious scanning for threats" },
          { left: "Virtue (Courage)", right: "Acting despite uncertainty" },
        ],
      },
    },
    {
      id: "u8-l2-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "For a Six, courage doesn't mean having no fear, it means being willing to ___ without needing absolute certainty.",
        options: ["retreat", "analyze more", "act", "seek permission"],
        correctIndex: 2,
        explanation:
          "The Six's growth path is learning to act on their own inner knowing, even when they can't guarantee the outcome. This is what Courage means for this type.",
      },
    },
    {
      id: "u8-l2-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Priya is considering speaking up about a problem at work. She has all the evidence she needs, but she keeps finding reasons to wait: maybe she should gather more data, talk to more people, wait for a better time. Weeks pass.",
        question: "Which Six dynamic is keeping Priya stuck?",
        options: [
          "Her passion of Fear, needing certainty before she can act",
          "Her desire for power, waiting for the right moment to dominate",
          "Her need for attention, wanting a bigger audience",
          "Her perfectionism, the presentation isn't polished enough",
        ],
        correctIndex: 0,
        explanation:
          "Priya's endless preparation is the passion of Fear in action. Sixes often delay action while seeking more certainty, even when they already have enough information.",
      },
    },
    {
      id: "u8-l2-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "After years of anxiety-driven decision-making, Carlos starts a mindfulness practice. He notices his fearful thoughts but stops treating every worry as a real threat. He begins making choices based on what he values rather than what he fears.",
        question: "What is Carlos moving toward?",
        options: [
          "The passion of Fear, becoming more vigilant",
          "The virtue of Courage, trusting himself to navigate uncertainty",
          "Disintegration, losing his natural caution",
          "Withdrawal, disconnecting from the world",
        ],
        correctIndex: 1,
        explanation:
          "Carlos is developing the Six's virtue of Courage: learning to distinguish between genuine danger and habitual anxiety, and choosing values over fear.",
      },
    },
    {
      id: "u8-l2-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Kim used to be a trusting, cooperative team member. After a painful betrayal by a manager, she now sees hidden agendas everywhere. She documents everything, trusts no one's motives, and has become isolated from colleagues who find her exhausting.",
        question: "What Riso-Hudson health shift has Kim undergone?",
        options: [
          "She moved from average to healthy by becoming more cautious",
          "She moved from healthy to unhealthy, her vigilance has become paranoia",
          "She moved from unhealthy to average by protecting herself",
          "She stayed at the same level but changed her strategy",
        ],
        correctIndex: 1,
        explanation:
          "Kim has moved down the health levels. Healthy Six vigilance (cooperative caution) has degraded into unhealthy paranoia where everyone is a potential threat.",
      },
    },
    {
      id: "u8-l2-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "A healthy Six is best described as:",
        options: [
          "Someone who never feels anxiety",
          "Someone who is self-reliant, trusting, and courageous",
          "Someone who avoids all risk",
          "Someone who always follows authority",
        ],
        correctIndex: 1,
        explanation:
          "Healthy Sixes don't eliminate fear, they develop self-reliance and courage. They become stable, trusting, and capable of decisive action.",
      },
    },
  ],
};

// ── Lesson 3: Wings, Stress Line & Growth Line ──────────────────────────────

const lesson3: Lesson = {
  id: "u8-l3",
  scaffoldStep: 4 as const,
  unitId: "type-6",
  order: 3,
  title: "Wings & Lines",
  subtitle: "6w5 vs 6w7, phobic vs counterphobic, stress to 3, growth to 9",
  xpReward: 25,
  exercises: [
    {
      id: "u8-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Two Faces of Six: Phobic vs Counterphobic",
        body: "Type 6 has a unique split. Phobic Sixes respond to fear by seeking safety, being compliant, and avoiding conflict. Counterphobic Sixes confront their fear head-on, they charge toward what scares them, looking bold and aggressive (often mistaken for Type 8).",
        highlight: "Counterphobic",
      },
    },
    {
      id: "u8-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Wings: 6w5 and 6w7",
        body: "6w5 (The Defender) is more withdrawn, serious, and intellectual, they research threats carefully. 6w7 (The Buddy) is more outgoing, playful, and sociable, they manage anxiety through connection and humor.",
        highlight: "6w5 vs 6w7",
      },
    },
    {
      id: "u8-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What distinguishes a counterphobic Six from a phobic Six?",
        options: [
          "Counterphobic Sixes have no fear",
          "Counterphobic Sixes confront their fear head-on rather than avoiding it",
          "Counterphobic Sixes are a different type entirely",
          "Phobic Sixes are healthier than counterphobic Sixes",
        ],
        correctIndex: 1,
        explanation:
          "Both phobic and counterphobic Sixes are driven by fear. The difference is their response: phobic Sixes avoid what scares them, while counterphobic Sixes charge toward it.",
      },
    },
    {
      id: "u8-l3-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Where does Type 6 move under stress?",
        options: ["To 9", "To 1", "To 3", "To 8"],
        correctIndex: 2,
        explanation:
          "Under stress, Sixes move to the unhealthy side of Type 3: they become image-conscious, competitive, and focused on appearing successful to manage their anxiety.",
      },
    },
    {
      id: "u8-l3-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Where does Type 6 move in growth?",
        options: ["To 3", "To 9", "To 5", "To 7"],
        correctIndex: 1,
        explanation:
          "In growth, Sixes take on the healthy qualities of Type 9: becoming relaxed, trusting, peaceful, and able to let go of anxious hypervigilance.",
      },
    },
    {
      id: "u8-l3-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match the Six subtype or wing to its description.",
        pairs: [
          { left: "Phobic Six", right: "Seeks safety, avoids conflict, compliant" },
          { left: "Counterphobic Six", right: "Charges toward fear, looks aggressive" },
          { left: "6w5, The Defender", right: "Withdrawn, intellectual, researches threats" },
          { left: "6w7, The Buddy", right: "Outgoing, playful, manages anxiety socially" },
        ],
      },
    },
    {
      id: "u8-l3-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Under stress, a Six moves to Type 3 and may become overly focused on ___ and appearing successful.",
        options: ["solitude", "their image", "emotional depth", "spiritual growth"],
        correctIndex: 1,
        explanation:
          "The Six's stress move to 3 shows up as increased focus on image management, workaholism, and trying to project confidence to mask inner anxiety.",
      },
    },
    {
      id: "u8-l3-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "In growth, a Six moves to Type 9 and becomes more ___, trusting, and able to let go of constant vigilance.",
        options: ["competitive", "withdrawn", "relaxed", "controlling"],
        correctIndex: 2,
        explanation:
          "The growth line to 9 brings Sixes the peace they deeply crave. They learn to relax, trust the process, and stop scanning for threats.",
      },
    },
    {
      id: "u8-l3-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "When Alex feels scared of public speaking, they immediately sign up for an open-mic night. Their friends are surprised, they seem so brave! But internally, Alex is terrified. They just can't stand sitting with the fear.",
        question: "What Six pattern is Alex demonstrating?",
        options: [
          "Phobic Six, running from the threat",
          "Counterphobic Six, confronting fear by running toward it",
          "Growth to 9, becoming relaxed about challenges",
          "Stress to 3, performing for an audience",
        ],
        correctIndex: 1,
        explanation:
          "Alex is a classic counterphobic Six. They aren't fearless, they're driven to confront the very thing that terrifies them. The fear is the same; only the response differs.",
      },
    },
    {
      id: "u8-l3-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "During a stressful quarter at work, Jamie, usually a thoughtful, cautious team member, starts obsessing over their LinkedIn profile, buying new professional clothes, and name-dropping their accomplishments in meetings.",
        question: "What Six dynamic explains this shift?",
        options: [
          "Growth to 9, finding new inner peace",
          "Stress to 3, compensating for anxiety with image and achievement",
          "Wing influence of 7, seeking excitement",
          "Natural Six loyalty, trying to impress their team",
        ],
        correctIndex: 1,
        explanation:
          "Jamie is moving to their stress point at 3. When Six anxiety peaks, they may try to manage it by projecting success and competence, the 3 strategy for feeling secure.",
      },
    },
    {
      id: "u8-l3-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction:
          "Sort these behaviors by whether they belong to a 6w5 or 6w7.",
        categories: ["6w5, The Defender", "6w7, The Buddy"],
        items: [
          { text: "Researches exhaustively before deciding", categoryIndex: 0 },
          { text: "Manages anxiety through humor and socializing", categoryIndex: 1 },
          { text: "Prefers a small, trusted inner circle", categoryIndex: 0 },
          { text: "Uses charm and playfulness to defuse tension", categoryIndex: 1 },
          { text: "Tends to be more serious and private", categoryIndex: 0 },
          { text: "Seeks reassurance from many friends", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u8-l3-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "A counterphobic Six can often be mistaken for which other type?",
        options: ["Type 2", "Type 4", "Type 8", "Type 9"],
        correctIndex: 2,
        explanation:
          "Counterphobic Sixes charge toward danger and can appear bold and confrontational, traits associated with Type 8. The key difference: 8s are naturally dominant, while counterphobic 6s are fighting their fear.",
      },
    },
  ],
};

// ── Lesson 4: Spotting This Type + Common Mistypes ──────────────────────────

const lesson4: Lesson = {
  id: "u8-l4",
  scaffoldStep: 1 as const,
  unitId: "type-6",
  order: 4,
  title: "Recognizing the Loyalist",
  subtitle: "Spotting Type 6 in the wild and avoiding common mistypes",
  xpReward: 25,
  exercises: [
    {
      id: "u8-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Spotting a Six",
        body: "Sixes often ask a lot of questions, play devil's advocate, and want to know the worst-case scenario before committing. They're the ones who read reviews, check escape routes, and ask 'but what if...?' They're also fiercely loyal once trust is earned.",
        highlight: "devil's advocate",
      },
    },
    {
      id: "u8-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Common Mistypes",
        body: "Sixes are most often confused with Type 1 (both dutiful, but 1s follow internal standards while 6s reference external authority) and Type 8 (counterphobic 6s look aggressive, but 8s are naturally dominant while 6s are fighting fear).",
        highlight: "Type 1 and Type 8",
      },
    },
    {
      id: "u8-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "Which behavior is MOST characteristic of a Six in everyday life?",
        options: [
          "Constantly striving to be the best",
          "Playing devil's advocate and asking 'what could go wrong?'",
          "Withdrawing to be alone with their thoughts",
          "Seeking new experiences and adventures",
        ],
        correctIndex: 1,
        explanation:
          "Sixes are the natural devil's advocates. Their vigilance compels them to spot potential problems and question assumptions, it's how they build a sense of security.",
      },
    },
    {
      id: "u8-l4-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "How do you distinguish a dutiful Six from a dutiful Type 1?",
        options: [
          "Sixes are never dutiful",
          "Type 1 follows internal moral standards; Type 6 references external authority and group norms",
          "Type 1 is more anxious than Type 6",
          "There is no meaningful difference",
        ],
        correctIndex: 1,
        explanation:
          "Both types can be responsible and rule-following, but for different reasons. Ones have an inner critic setting standards; Sixes look to trusted authorities and systems for guidance.",
      },
    },
    {
      id: "u8-l4-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "Which social media habit is most characteristic of a Six?",
        options: [
          "Curating a perfect aesthetic feed",
          "Checking news obsessively and sharing warnings with friends",
          "Posting inspirational self-improvement content",
          "Avoiding social media entirely",
        ],
        correctIndex: 1,
        explanation:
          "Sixes' vigilance often extends to media: they track news, share safety warnings, and want their trusted circle to be informed about potential threats.",
      },
    },
    {
      id: "u8-l4-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction:
          "Match the behavior to the correct type, Six or its common mistype.",
        pairs: [
          { left: "Confronts fear by charging at it", right: "Counterphobic 6" },
          { left: "Naturally dominant, doesn't think about fear", right: "Type 8" },
          { left: "Dutiful because of internal moral standards", right: "Type 1" },
          { left: "Dutiful because of trust in external authority", right: "Type 6" },
        ],
      },
    },
    {
      id: "u8-l4-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "A counterphobic Six and a Type 8 may both seem confrontational, but the key difference is that a counterphobic Six is ___ their fear, while an 8 is naturally dominant.",
        options: ["avoiding", "unaware of", "fighting against", "indifferent to"],
        correctIndex: 2,
        explanation:
          "The critical distinction: counterphobic Sixes are highly aware of their fear and fight against it. Eights genuinely don't experience the same kind of inner fear, they feel naturally powerful.",
      },
    },
    {
      id: "u8-l4-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "When a Six says 'I'm just being realistic,' they are often expressing their tendency toward ___ thinking.",
        options: ["optimistic", "worst-case", "creative", "abstract"],
        correctIndex: 1,
        explanation:
          "Sixes often frame their anxiety-driven vigilance as 'being realistic.' Their worst-case thinking feels like common sense to them, even when others see it as excessive worry.",
      },
    },
    {
      id: "u8-l4-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Two coworkers both push back on a risky new project. One says, 'This violates our quality standards, we shouldn't cut corners.' The other says, 'What happens if this fails? Have we thought about the fallout? Who's going to be responsible?'",
        question: "Which coworker is more likely a Six?",
        options: [
          "The first, they have clear standards",
          "The second, they're focused on risk, consequences, and accountability",
          "Both are equally likely to be Sixes",
          "Neither is a Six, Sixes wouldn't speak up",
        ],
        correctIndex: 1,
        explanation:
          "The first coworker sounds like a Type 1 (internal standards, quality). The second is more Six: focused on what could go wrong, consequences, and who's responsible, all threat-assessment.",
      },
    },
    {
      id: "u8-l4-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Nadia and Diego are both assertive leaders. Nadia charges into conflicts because she can't stand feeling afraid and wants to prove she's tough. Diego charges into conflicts because he genuinely believes he's the strongest person in the room and someone needs to take charge.",
        question: "Who is the counterphobic Six?",
        options: [
          "Nadia, she's fighting her fear by confronting it",
          "Diego, his confidence is a mask for anxiety",
          "Both are Sixes with different wings",
          "Neither, both are Type 8",
        ],
        correctIndex: 0,
        explanation:
          "Nadia is the counterphobic Six: her aggression is a response to fear she wants to overcome. Diego is likely a Type 8: his dominance comes naturally, not from fighting inner anxiety.",
      },
    },
    {
      id: "u8-l4-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Your friend group is planning a trip. One friend researches every detail, insurance policies, reviews of the rental, weather forecasts, emergency contacts. They create a shared doc with backup plans for backup plans. Everyone groans, but when the rental falls through, that friend already has a Plan B ready.",
        question: "What makes this classic Six behavior?",
        options: [
          "The need for control and dominance (Type 8)",
          "The need for perfection in planning (Type 1)",
          "Vigilance and preparedness driven by anxiety about what could go wrong (Type 6)",
          "The need to be needed by the group (Type 2)",
        ],
        correctIndex: 2,
        explanation:
          "This is quintessential Six: the exhaustive contingency planning isn't about perfection or control, it's about managing anxiety by preparing for every possible threat.",
      },
    },
    {
      id: "u8-l4-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "What is the BEST single clue that someone might be a Type 6?",
        options: [
          "They are always the life of the party",
          "They habitually think about what could go wrong before committing",
          "They avoid all social interaction",
          "They are focused on being the most successful person in the room",
        ],
        correctIndex: 1,
        explanation:
          "The most reliable Six signal is habitual worst-case thinking. Before any commitment, a Six mentally rehearses what could go wrong, and prepares accordingly.",
      },
    },
    {
      id: "u8-l4-e13",
      difficulty: 3,
      content: {
        type: "interleaving",
        title: "Types 6, 1 & 5. Identify the motivation",
        typeNumbers: [6, 1, 5],
        items: [
          {
            statement: "Fact-checks an authority's claim. not from intellectual curiosity, but from an undercurrent of vigilance about whether this person should actually be trusted.",
            correctType: 6,
            explanation: "The Six's questioning is threat-detection. They scan authorities for hidden agendas or signs of untrustworthiness.",
          },
          {
            statement: "Researches a topic exhaustively before forming an opinion. needing to understand it fully from the inside before feeling qualified to say anything.",
            correctType: 5,
            explanation: "The Five builds knowledge as a resource and protective buffer. Competence before engagement.",
          },
          {
            statement: "Corrects a colleague's minor word choice in a meeting. not to embarrass them, but because using the wrong term feels like a violation of accuracy.",
            correctType: 1,
            explanation: "The One corrects from principle. Inaccuracy itself is the problem.",
          },
        ],
      } as InterleavingExerciseContent,
    },
  ],
};

// ── Lesson 5: Near-Neighbor Discrimination. Type 6 vs Type 1 ─────────────

const lesson5: Lesson = {
  id: "u8-l5",
  scaffoldStep: 3 as const,
  unitId: "type-6",
  order: 5,
  title: "Type 6 vs Type 1",
  subtitle: "Two rule-oriented types with different motivations",
  xpReward: 25,
  exercises: [
    {
      id: "u8-l5-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Why 6 and 1 Are Confused",
        body: "Types 6 and 1 both follow rules carefully and can appear equally responsible. The key difference: Type 6 follows rules to reduce anxiety about what might happen if they don't. Type 1 follows rules because they reflect what is internally right and good.",
        highlight: "anxiety reduction vs. internal moral standard",
      },
    },
    {
      id: "u8-l5-e2",
      difficulty: 2,
      content: ({
        type: "discrimination",
        typeA: 6,
        typeB: 1,
        prompt: "Each statement below belongs to either Type 6 (The Loyalist) or Type 1 (The Reformer). Tap the correct type for each.",
        items: [
          {
            text: "Checks the rules before acting, not because they personally believe in every rule, but because uncertainty about the correct procedure creates anxiety.",
            answer: "A",
            explanation: "Type 6 uses rules as an external anchor against anxiety. They need to know what is expected so they feel safe.",
          },
          {
            text: "Holds themselves to the same ethical standard they hold others to. often their own harshest judge.",
            answer: "B",
            explanation: "Type 1's inner critic applies most intensely to themselves. Their standards are self-referential, not just socially derived.",
          },
          {
            text: "Questions whether authorities and institutions can be trusted. looks for evidence of hidden motives or unreliability before committing.",
            answer: "A",
            explanation: "Type 6's vigilance is fundamentally about trustworthiness. Questioning authority is how they evaluate safety.",
          },
          {
            text: "Experiences resentment when others fail to uphold ethical standards. feels it as a moral offense, not a personal betrayal.",
            answer: "B",
            explanation: "Type 1's resentment is moral, not relational. The standard was violated. that is the problem, independent of who violated it.",
          },
        ],
      } as DiscriminationContent) as unknown as ExerciseContent,
    },
    {
      id: "u8-l5-e3",
      difficulty: 3,
      content: {
        type: "multiple-choice",
        question: "A Type 6 and a Type 1 both follow company procedures carefully. What most distinguishes their inner experience?",
        options: [
          "The Type 6 is more concerned with praise, the Type 1 with accuracy",
          "The Type 6 follows procedures to manage anxiety; the Type 1 follows them because they reflect what is right",
          "The Type 1 is more anxious about consequences; the Type 6 is more moralistic",
          "There is no meaningful difference. both are equally rule-oriented for the same reasons",
        ],
        correctIndex: 1,
        explanation: "Same behavior, different engines. Type 6: rule-following reduces anxiety about what happens if rules are broken. Type 1: rule-following expresses their internal standard of goodness.",
      },
    },
  ],
};

export const unit08Lessons: Lesson[] = [lesson1, lesson2, lesson3, lesson4, lesson5];
