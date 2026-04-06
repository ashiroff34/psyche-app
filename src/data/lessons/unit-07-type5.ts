// ─────────────────────────────────────────────────────────────────────────────
// Unit 7, Type 5: The Investigator
// 4 lessons × 12 exercises each
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson, ExerciseContent, FreeRecallContent, InterleavingExerciseContent } from "@/types/lessons";
import type { DiscriminationContent } from "@/components/lessons/exercises/DiscriminationExercise";

// ── Lesson 1: Core Motivation, Fear & Desire ──────────────────────────────

const lesson1: Lesson = {
  id: "u7-l1",
  scaffoldStep: 2 as const,
  unitId: "type-5",
  order: 1,
  title: "The Need to Know",
  subtitle: "Core motivation, fear, and desire of Type 5",
  xpReward: 20,
  exercises: [
    {
      id: "u7-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Meet the Investigator",
        body: "Type 5s are driven by a deep need to understand the world and conserve their inner resources. They feel they have limited energy for engagement and must carefully manage what they give. Knowledge is both their shield and their source of competence.",
        highlight: "understand and conserve",
      },
    },
    {
      id: "u7-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Fear, Desire & the Limited Battery",
        body: "The core fear of Type 5 is being useless, helpless, or overwhelmed by the world's demands. Their core desire is to be competent and capable. Fives operate with a 'limited battery' metaphor, they feel they have finite energy for social interaction and emotional engagement, and must recharge alone.",
        highlight: "limited battery",
      },
    },
    {
      id: "u7-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core fear of Type 5?",
        options: [
          "Being abandoned by loved ones",
          "Being useless, helpless, or overwhelmed by the world's demands",
          "Being controlled by others",
          "Being seen as ordinary or unremarkable",
        ],
        correctIndex: 1,
        explanation:
          "Fives fear being incapable, overwhelmed, or depleted. The world feels demanding, and they worry they don't have enough inner resources to meet those demands, so they retreat to build competence and conserve energy.",
      },
    },
    {
      id: "u7-l1-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core desire of Type 5?",
        options: [
          "To be loved unconditionally",
          "To achieve success and admiration",
          "To be competent, capable, and to understand how things work",
          "To maintain peace and avoid conflict",
        ],
        correctIndex: 2,
        explanation:
          "Fives want mastery and understanding above all. If they can comprehend how something works, from quantum physics to human behavior, they feel equipped to handle the world. Knowledge is their safety net.",
      },
    },
    {
      id: "u7-l1-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What does the 'limited battery' metaphor describe about Fives?",
        options: [
          "They are physically weak and tire easily",
          "They feel they have finite energy for engagement and must recharge alone",
          "They prefer working with electronics",
          "They have short attention spans",
        ],
        correctIndex: 1,
        explanation:
          "Fives experience social and emotional engagement as genuinely draining, not laziness, but a felt sense that their inner resources are limited. They need solitude to recharge in a way other types may not fully understand.",
      },
    },
    {
      id: "u7-l1-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each Type 5 concept to its description.",
        pairs: [
          { left: "Core Fear", right: "Being helpless or overwhelmed" },
          { left: "Core Desire", right: "To be competent and capable" },
          { left: "Limited Battery", right: "Finite energy for engagement" },
          { left: "Coping Strategy", right: "Withdrawing to observe and understand" },
        ],
      },
    },
    {
      id: "u7-l1-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Fives cope with the world's demands by ___ to observe and build competence.",
        options: ["attacking", "withdrawing", "complaining", "performing"],
        correctIndex: 1,
        explanation:
          "Withdrawal is the Five's primary strategy. They step back from the world to watch, analyze, and accumulate knowledge, building an internal fortress of understanding before engaging.",
      },
    },
    {
      id: "u7-l1-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "For a Five, ___ is both a shield against the world and a source of confidence.",
        options: ["wealth", "popularity", "knowledge", "physical strength"],
        correctIndex: 2,
        explanation:
          "Knowledge serves a dual purpose for Fives: it protects them from feeling incompetent (their core fear) and gives them the sense of mastery they crave. Understanding something makes it less threatening.",
      },
    },
    {
      id: "u7-l1-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "At a team meeting, everyone is brainstorming loudly and energetically. Kai sits quietly, taking mental notes but saying nothing. Afterward, Kai goes back to their desk feeling exhausted and puts on headphones. Later that evening, Kai sends a detailed email with a fully formed analysis of the problem, better than anything discussed in the meeting.",
        question: "What Type 5 dynamic is at work here?",
        options: [
          "Kai is being passive-aggressive about the meeting",
          "The limited battery in action, Kai conserves energy in group settings, then contributes from the safety of solitude",
          "Kai is a Type 9 avoiding conflict",
          "Kai is simply an introvert, not necessarily a Five",
        ],
        correctIndex: 1,
        explanation:
          "This is classic Five behavior. Group engagement drains their battery rapidly, so they observe rather than participate in real time. Their best thinking happens alone, where they can process without the energy cost of social interaction.",
      },
    },
    {
      id: "u7-l1-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "River's partner says: 'You never share what you're feeling. I have to guess what's going on with you.' River genuinely doesn't understand the complaint, they feel like they share plenty. But River's idea of sharing is explaining their theory about why a situation happened, not expressing how it made them feel.",
        question: "What Five pattern does this illustrate?",
        options: [
          "River is being emotionally manipulative",
          "River replaces emotional engagement with intellectual analysis, understanding substitutes for feeling",
          "River is a Type 3 avoiding vulnerability",
          "This is normal behavior for everyone, not type-specific",
        ],
        correctIndex: 1,
        explanation:
          "Fives often genuinely believe they're being open when they share their analysis. They process the world through thinking, and emotions feel like an expensive energy expenditure. 'I explained why it happened' feels equivalent to 'I told you how I feel.'",
      },
    },
    {
      id: "u7-l1-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Drew has been invited to a weekend cabin trip with friends. Instead of feeling excited, Drew feels a knot of dread: two full days of constant social interaction with no escape route. Drew wants to go, they care about these people, but starts strategizing: 'Maybe I can take a long walk alone Saturday afternoon. I'll need at least a few hours to recharge.'",
        question: "What core Five experience is Drew dealing with?",
        options: [
          "Social anxiety disorder",
          "The fundamental feeling that their energy is finite and must be rationed, even for people they love",
          "Drew doesn't actually like their friends",
          "Type 6 worry about what could go wrong",
        ],
        correctIndex: 1,
        explanation:
          "Drew genuinely cares but experiences togetherness as a resource drain. This isn't dislike or anxiety, it's the Five's core experience that engagement costs energy they may not be able to replenish. Planning escape routes is survival strategy, not rejection.",
      },
    },
    {
      id: "u7-l1-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Type 5 belongs to which Enneagram triad?",
        options: [
          "Body/Gut Center (instinct)",
          "Heart/Feeling Center (image/shame)",
          "Head Center (thinking/fear)",
          "They transcend all triads",
        ],
        correctIndex: 2,
        explanation:
          "Fives are in the Head triad alongside Types 6 and 7. Their core issue is fear, specifically, fear of being overwhelmed and incompetent. They manage this fear by retreating into their minds to observe and understand.",
      },
    },
  ],
};

// ── Lesson 2: Passion & Virtue + Health Levels ────────────────────────────

const lesson2: Lesson = {
  id: "u7-l2",
  scaffoldStep: 2 as const,
  unitId: "type-5",
  order: 2,
  title: "Avarice to Non-Attachment",
  subtitle: "The passion, virtue, and health levels of Type 5",
  xpReward: 25,
  exercises: [
    {
      id: "u7-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Passion: Avarice",
        body: "Naranjo identified the Five's passion as Avarice, but not greed for money. It's the hoarding of time, energy, knowledge, and personal space. Fives feel they never have 'enough' inner resources, so they clutch what they have and minimize what they give out.",
        highlight: "Avarice",
      },
    },
    {
      id: "u7-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Virtue: Non-Attachment",
        body: "The antidote is Non-Attachment, the generous sharing of self, time, and knowledge without fear of depletion. Healthy Fives discover that giving doesn't empty them; it actually creates more energy. Engagement replenishes rather than drains.",
        highlight: "Non-Attachment",
      },
    },
    {
      id: "u7-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the passion of Type 5?",
        options: ["Envy", "Avarice", "Sloth", "Anger"],
        correctIndex: 1,
        explanation:
          "Avarice in the Enneagram sense isn't about money, it's the hoarding of inner resources. Fives cling to their time, energy, space, and knowledge because they feel these are in permanently short supply.",
      },
    },
    {
      id: "u7-l2-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What virtue does a healthy Type 5 embody?",
        options: ["Equanimity", "Non-Attachment", "Humility", "Courage"],
        correctIndex: 1,
        explanation:
          "Non-Attachment allows Fives to share freely, their knowledge, their time, their presence, without the constant fear of being depleted. They discover that generosity of self actually generates more energy, not less.",
      },
    },
    {
      id: "u7-l2-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does Five-type Avarice differ from ordinary greed?",
        options: [
          "It doesn't, they're the same thing",
          "It's about hoarding time, energy, and space, not material wealth",
          "It's less intense than regular greed",
          "It only applies to knowledge",
        ],
        correctIndex: 1,
        explanation:
          "A Five might live in a tiny apartment and own very little, yet be intensely 'greedy' about their time and solitude. Avarice here means clutching your inner resources, not your bank account.",
      },
    },
    {
      id: "u7-l2-e6",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort these Type 5 traits by health level.",
        categories: ["Healthy", "Average", "Unhealthy"],
        items: [
          { text: "Visionary and pioneering thinker", categoryIndex: 0 },
          { text: "Detached and cerebral observer", categoryIndex: 1 },
          { text: "Isolated, paranoid, and nihilistic", categoryIndex: 2 },
          { text: "Deeply insightful, shares knowledge generously", categoryIndex: 0 },
          { text: "Minimizes needs, compartmentalizes life", categoryIndex: 1 },
          { text: "Completely withdrawn from reality", categoryIndex: 2 },
        ],
      },
    },
    {
      id: "u7-l2-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "The Five's passion of Avarice creates a persistent need to ___ their inner resources.",
        options: ["share", "hoard", "display", "ignore"],
        correctIndex: 1,
        explanation:
          "Fives guard their time, energy, and space with fierce protectiveness. Every request for engagement feels like a withdrawal from a bank account that never quite has enough in it.",
      },
    },
    {
      id: "u7-l2-e8",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each health level to how the Five relates to the world.",
        pairs: [
          { left: "Healthy", right: "Engages boldly, shares insights generously" },
          { left: "Average", right: "Observes from a distance, rations energy" },
          { left: "Unhealthy", right: "Cuts off from reality entirely" },
          { left: "Virtue (Non-Attachment)", right: "Gives freely without fear of depletion" },
        ],
      },
    },
    {
      id: "u7-l2-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Morgan has spent three years becoming an expert on climate science. A colleague asks Morgan to give a talk at an internal conference. Morgan's first instinct is resistance: 'If I share everything I know, what will I have left? They'll take my ideas and I'll have given away my advantage.' Morgan almost declines, not from stage fright, but from the feeling of being emptied out.",
        question: "What passion dynamic is this?",
        options: [
          "Healthy boundary-setting about intellectual property",
          "Avarice, the fear that sharing knowledge will deplete a finite internal resource",
          "Type 3 competitiveness about being the best",
          "Type 6 suspicion of colleagues' motives",
        ],
        correctIndex: 1,
        explanation:
          "This is Avarice in its purest form. Morgan experiences knowledge as a limited resource that will be 'used up' if shared. The fear isn't about credit or competition, it's the gut feeling that giving away what you know leaves you with less.",
      },
    },
    {
      id: "u7-l2-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "After years of living like a hermit, Dr. Chen, a brilliant researcher, starts mentoring graduate students, giving public lectures, and even hosting dinner parties. A friend says: 'You seem so different.' Dr. Chen replies: 'I realized that sharing my work doesn't drain me, it actually energizes me. The more I give, the more I have.'",
        question: "What growth is Dr. Chen demonstrating?",
        options: [
          "Dr. Chen is suppressing their Five nature, this won't last",
          "Dr. Chen is accessing Non-Attachment, discovering that generosity creates rather than depletes",
          "Dr. Chen is becoming a Type 2",
          "Dr. Chen was never really a Five",
        ],
        correctIndex: 1,
        explanation:
          "This is Non-Attachment in action. Dr. Chen hasn't lost their depth or need for solitude, they've discovered the paradox at the heart of Five growth: giving away knowledge and presence actually generates more energy than hoarding ever did.",
      },
    },
    {
      id: "u7-l2-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Alex hasn't left their apartment in two weeks. They've stopped answering calls, convinced that people only want something from them. The apartment is full of books and research, but Alex has stopped eating properly. Alex thinks: 'None of it matters anyway. The universe is indifferent and human connection is just mutual exploitation.'",
        question: "What health level is Alex at?",
        options: [
          "Healthy, they're deep in focused research",
          "Average, normal Five withdrawal",
          "Unhealthy, isolation has become paranoid withdrawal with nihilistic thinking",
          "This is between average and unhealthy, the nihilism is a warning sign",
        ],
        correctIndex: 2,
        explanation:
          "Alex is in unhealthy Five territory. The paranoia ('people only want something'), physical neglect, complete isolation, and nihilistic worldview are all markers of a Five who has withdrawn so far that they've lost connection with reality and their own needs.",
      },
    },
    {
      id: "u7-l2-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Non-Attachment for a Five means:",
        options: [
          "Not caring about anything",
          "Sharing freely, time, energy, knowledge, without fear of being depleted",
          "Giving up all possessions",
          "Becoming emotionally detached",
        ],
        correctIndex: 1,
        explanation:
          "Non-Attachment isn't indifference or detachment, it's the freedom to give generously because you've discovered that your inner resources aren't as limited as you feared. It's openness, not emptiness.",
      },
    },
    {
      id: "u7-l2-e13",
      difficulty: 3,
      content: {
        type: "free-recall",
        prompt: "In your own words, describe why Type 5s withdraw. What are they protecting and what do they fear?",
        keyTerms: ["energy", "depletion", "overwhelm", "privacy", "competence", "intrusion", "resources"],
        minWords: 15,
        modelAnswer: "Type 5s withdraw because they experience the world as deeply draining. Their core fear is that they don't have enough inner resources — energy, time, knowledge — to meet the demands that others and life will place on them. By retreating into privacy and observation, they protect what little they have. They fear being intruded upon, overwhelmed, or forced to engage before they feel sufficiently prepared or competent. Withdrawal is a conservation strategy: if they can limit what goes out, they might have enough left to function. The tragedy is that this aloofness prevents the very connection that might replenish them.",
      } as FreeRecallContent,
    },
  ],
};

// ── Lesson 3: Wings, Stress Line & Growth Line ───────────────────────────

const lesson3: Lesson = {
  id: "u7-l3",
  scaffoldStep: 4 as const,
  unitId: "type-5",
  order: 3,
  title: "How Fives Shift",
  subtitle: "Wings, stress, and growth lines of Type 5",
  xpReward: 25,
  exercises: [
    {
      id: "u7-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Two Wings of Type 5",
        body: "A 5w4 (The Iconoclast) combines intellectual depth with emotional intensity, they're more creative, idiosyncratic, and drawn to the unconventional. A 5w6 (The Problem Solver) combines intellectual depth with practical loyalty, they're more systematic, community-oriented, and focused on real-world applications.",
        highlight: "5w4 vs 5w6",
      },
    },
    {
      id: "u7-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Stress & Growth Lines",
        body: "Under stress, Fives move to Type 7, becoming scattered, hyperactive, and escapist, chasing stimulation instead of focused depth. In growth, Fives move to Type 8, becoming decisive, action-oriented, confident, and engaging with the world powerfully instead of just observing it.",
        highlight: "Stress → 7, Growth → 8",
      },
    },
    {
      id: "u7-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What are the two wings of Type 5?",
        options: [
          "5w4 (The Iconoclast) and 5w6 (The Problem Solver)",
          "5w3 (The Achiever) and 5w7 (The Enthusiast)",
          "5w4 (The Bohemian) and 5w6 (The Loyalist)",
          "5w6 (The Guardian) and 5w4 (The Artist)",
        ],
        correctIndex: 0,
        explanation:
          "The 5w4 (Iconoclast) is more creative and emotionally intense, they combine Five's analytical depth with Four's uniqueness. The 5w6 (Problem Solver) is more practical and loyal, they combine Five's depth with Six's reliability.",
      },
    },
    {
      id: "u7-l3-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Under stress, Type 5 moves to which type?",
        options: ["Type 1", "Type 4", "Type 7", "Type 8"],
        correctIndex: 2,
        explanation:
          "Stressed Fives suddenly become scattered and overstimulated, like unhealthy Sevens. Instead of their usual focused depth, they jump between topics, binge consume media, and chase distractions, manic activity replacing contemplative calm.",
      },
    },
    {
      id: "u7-l3-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "In growth, Type 5 moves toward which type?",
        options: ["Type 1", "Type 4", "Type 7", "Type 8"],
        correctIndex: 3,
        explanation:
          "Growing Fives access healthy Eight energy, they become decisive, bold, and action-oriented. Instead of endlessly preparing and observing, they step into the world with confidence and make things happen.",
      },
    },
    {
      id: "u7-l3-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each wing or line to its description.",
        pairs: [
          { left: "5w4 (The Iconoclast)", right: "Creative, idiosyncratic, emotionally intense" },
          { left: "5w6 (The Problem Solver)", right: "Practical, loyal, systematic" },
          { left: "Stress → Type 7", right: "Scattered, escapist, manic activity" },
          { left: "Growth → Type 8", right: "Decisive, confident, engages powerfully" },
        ],
      },
    },
    {
      id: "u7-l3-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "A 5w4 is called The ___ because they combine intellectual depth with creative nonconformity.",
        options: ["Problem Solver", "Iconoclast", "Observer", "Scholar"],
        correctIndex: 1,
        explanation:
          "The 5w4 (Iconoclast) blends the Five's analytical mind with the Four's emotional intensity and individuality. They're the original thinkers, the ones who challenge paradigms, often brilliant and eccentric.",
      },
    },
    {
      id: "u7-l3-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "The Five's growth move to Type 8 helps them move from ___ to action.",
        options: ["feeling", "observation", "fear", "planning"],
        correctIndex: 1,
        explanation:
          "Eight energy gives Fives what they most need: the courage to stop watching and start doing. The knowledge and insight stay, but now they're applied decisively in the real world rather than just accumulated internally.",
      },
    },
    {
      id: "u7-l3-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "After a stressful week at work, Jordan, usually focused and methodical, can't sit still. They start three different books without finishing any, open dozens of browser tabs on random topics, binge a TV series, then suddenly decide to research starting a podcast. Their partner says: 'This isn't like you at all.'",
        question: "What's happening?",
        options: [
          "Jordan discovered they're actually a Type 7",
          "Jordan is moving to their stress point (Type 7), becoming scattered and seeking stimulation to escape anxiety",
          "Jordan is growing into healthy Eight energy",
          "Jordan is just taking a mental health break",
        ],
        correctIndex: 1,
        explanation:
          "Under stress, Fives lose their signature focus and become Seven-like, chasing novelty, consuming without depth, and scattering their attention. It's an attempt to outrun the anxiety through stimulation instead of their usual strategy of focused withdrawal.",
      },
    },
    {
      id: "u7-l3-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Dr. Patel, a quiet researcher who usually avoids confrontation, walks into a board meeting and firmly says: 'This project is going in the wrong direction. Here's what needs to change.' They present a clear, decisive plan and don't back down when challenged. Colleagues are shocked, this is a side of Dr. Patel they've never seen.",
        question: "What growth line is Dr. Patel accessing?",
        options: [
          "Stress move to Type 7",
          "Growth to Type 8, stepping into decisive, confident engagement with the world",
          "Wing shift to 5w6, becoming more loyal to the team",
          "This means Dr. Patel is losing their Five identity",
        ],
        correctIndex: 1,
        explanation:
          "This is the Five-to-Eight growth move at its best. Dr. Patel hasn't lost their depth of knowledge, they've added the Eight's courage, directness, and willingness to act on what they know. Observation has become leadership.",
      },
    },
    {
      id: "u7-l3-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Two Fives are both brilliant in their fields. One writes surreal, genre-defying novels that blend philosophy with dark emotional landscapes, and lives alone in a cabin. The other works at a cybersecurity firm, builds reliable systems, and is known as the person everyone calls when something breaks, steady, trusted, methodical.",
        question: "How do their wings differ?",
        options: [
          "First is 5w4 (Iconoclast, creative, emotionally intense), second is 5w6 (Problem Solver, practical, systematic)",
          "First is 5w6, second is 5w4",
          "Both are 5w4, all Fives are creative",
          "Wings don't affect how Fives express their intelligence",
        ],
        correctIndex: 0,
        explanation:
          "The 5w4 channels their intellect through creative, unconventional expression, the surreal novelist. The 5w6 channels their intellect through practical, reliable systems, the trusted problem solver. Same core type, very different flavor.",
      },
    },
    {
      id: "u7-l3-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "The Five's growth toward Type 8 primarily helps with:",
        options: [
          "Becoming more emotional and sensitive",
          "Moving from observation to decisive, confident action",
          "Avoiding all conflict",
          "Accumulating more knowledge",
        ],
        correctIndex: 1,
        explanation:
          "Eight energy doesn't replace the Five's depth, it activates it. Growing Fives learn that knowledge without action is hoarding, and that stepping boldly into the world is the ultimate expression of competence.",
      },
    },
  ],
};

// ── Lesson 4: Spotting This Type + Common Mistypes ────────────────────────

const lesson4: Lesson = {
  id: "u7-l4",
  scaffoldStep: 1 as const,
  unitId: "type-5",
  order: 4,
  title: "Spotting the Five",
  subtitle: "Real-world recognition and common mistypes",
  xpReward: 30,
  exercises: [
    {
      id: "u7-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "How to Spot a Type 5",
        body: "Fives often have minimal social energy, deep expertise in niche areas, and a default 'observer mode.' They value privacy intensely, speak precisely, and tend to know a staggering amount about a few specific topics. They watch before participating, and may never participate at all.",
        highlight: "observer mode",
      },
    },
    {
      id: "u7-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Common Mistypes",
        body: "Type 5 is often confused with Type 4 (both introspective and withdrawn), Type 9 (both withdrawn and quiet), and Type 1 (both cerebral and precise). Key difference: Fives seek intellectual depth; Fours seek emotional depth; Nines seek inner peace; Ones follow internal moral standards.",
        highlight: "intellectual depth",
      },
    },
    {
      id: "u7-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which behavior is most characteristic of Type 5?",
        options: [
          "Working the room at a party, making connections",
          "Deep expertise in niche areas combined with minimal social energy",
          "Expressing emotions dramatically and authentically",
          "Following rules and maintaining high standards",
        ],
        correctIndex: 1,
        explanation:
          "Fives are the niche experts, the person who knows everything about mycology, or medieval weaponry, or a specific programming language. They go deep, not wide, and social energy is always rationed carefully.",
      },
    },
    {
      id: "u7-l4-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What's the key difference between Type 5 and Type 4?",
        options: [
          "Fives are introverts, Fours are extroverts",
          "Both are introspective, Fives seek intellectual depth, Fours seek emotional depth",
          "There's no meaningful difference",
          "Fives are creative, Fours are analytical",
        ],
        correctIndex: 1,
        explanation:
          "Both types live rich inner lives and can appear withdrawn. But a Five processes the world through thinking and analysis, while a Four processes it through feeling and emotional experience. Head vs. heart.",
      },
    },
    {
      id: "u7-l4-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What's the key difference between Type 5 and Type 9?",
        options: [
          "Fives are lazy, Nines are intellectual",
          "Both are withdrawn, Fives are actively thinking and analyzing, Nines are actively numbing and disengaging",
          "There's no meaningful difference",
          "Fives avoid conflict, Nines seek it",
        ],
        correctIndex: 1,
        explanation:
          "Both types can look quiet and checked-out from the outside. But inside, they're doing opposite things: the Five's mind is racing with analysis and frameworks, while the Nine's mind is deliberately smoothing everything flat to avoid disturbance.",
      },
    },
    {
      id: "u7-l4-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each type to how they use their inner world.",
        pairs: [
          { left: "Type 5", right: "Builds internal frameworks to understand" },
          { left: "Type 4", right: "Explores emotional landscape for identity" },
          { left: "Type 9", right: "Numbs inner experience for comfort" },
          { left: "Type 1", right: "Follows internal standards for correctness" },
        ],
      },
    },
    {
      id: "u7-l4-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Fives build internal ___, while Ones follow internal ___.",
        options: [
          "frameworks / standards",
          "emotions / rules",
          "walls / paths",
          "theories / feelings",
        ],
        correctIndex: 0,
        explanation:
          "Both Fives and Ones are cerebral, but their mental activity serves different purposes. Fives construct models and frameworks to understand reality. Ones apply standards and principles to judge what's right. Understanding vs. evaluating.",
      },
    },
    {
      id: "u7-l4-e8",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort these behaviors: Type 5 or Type 4?",
        categories: ["More likely Type 5", "More likely Type 4"],
        items: [
          {
            text: "Reads three books on grief after a loss",
            categoryIndex: 0,
          },
          {
            text: "Writes poetry about grief after a loss",
            categoryIndex: 1,
          },
          {
            text: "Explains their feelings using a psychological framework",
            categoryIndex: 0,
          },
          {
            text: "Feels their emotions are too complex for words",
            categoryIndex: 1,
          },
          {
            text: "Keeps personal space minimal and functional",
            categoryIndex: 0,
          },
          {
            text: "Decorates personal space to reflect inner emotional state",
            categoryIndex: 1,
          },
        ],
      },
    },
    {
      id: "u7-l4-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Two colleagues are both quiet in meetings. Person A is mentally building a comprehensive model of the problem being discussed and will later produce a detailed technical analysis. Person B is drifting, not really tracking the conversation, thinking about lunch and vaguely agreeing with whoever spoke last.",
        question: "Which is more likely a Five, and which a Nine?",
        options: [
          "A is Type 5 (actively analyzing), B is Type 9 (passively disengaging)",
          "A is Type 9, B is Type 5",
          "Both are Type 5, they're both quiet",
          "Both are Type 9, they're both withdrawn",
        ],
        correctIndex: 0,
        explanation:
          "Same external behavior (quiet in meetings), completely different inner processes. The Five is intensely active internally, building frameworks, analyzing data. The Nine has checked out, their quiet comes from disengagement, not deep processing.",
      },
    },
    {
      id: "u7-l4-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Someone says: 'I need to understand this completely before I can act on it. I've been researching for months and I'm almost ready. I just need a bit more data before I can commit to a decision. Also, could we not discuss this at dinner? I've used up my people energy for today.'",
        question: "Is this more likely a Five or a One?",
        options: [
          "Type 1, they want to get it right before acting",
          "Type 5, the need to understand completely before acting, combined with the 'people energy' comment, is distinctly Five",
          "Could be either, both are thorough",
          "This is a Type 6 pattern of doubt",
        ],
        correctIndex: 1,
        explanation:
          "The 'people energy' comment is the giveaway. A One might also research thoroughly, but they'd frame it as wanting to do the right thing, not as running out of social battery. The Five's need isn't about correctness, it's about competence and energy conservation.",
      },
    },
    {
      id: "u7-l4-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "You're trying to determine if someone is a Type 5 or a Type 4. Both seem withdrawn and introspective. You ask: 'What do you do when you're really stressed?' Person replies: 'I go to my room and read. I need to understand what's happening. If I can build a mental model of the situation, it stops being so threatening. Feelings just cloud the analysis.'",
        question: "What does this response suggest?",
        options: [
          "Type 4, they're retreating into their inner world",
          "Type 5, retreating into intellectual understanding and explicitly deprioritizing feelings is a strong Five signal",
          "Could be either type",
          "This is actually a Type 1 response",
        ],
        correctIndex: 1,
        explanation:
          "The phrase 'feelings just cloud the analysis' is the Five signature. A Four under stress would dive into their feelings, not away from them. The Five's stress response is to think harder, understand more, and treat emotions as interference rather than information.",
      },
    },
    {
      id: "u7-l4-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "The fastest way to distinguish a Type 5 from other withdrawn types is:",
        options: [
          "Fives are always the smartest person in the room",
          "Fives withdraw to think and understand, their inner world is analytical, not emotional or peaceful",
          "Fives never have any emotions",
          "Fives are always reading books",
        ],
        correctIndex: 1,
        explanation:
          "The key is what's happening inside the withdrawal. Fives withdraw to analyze and build understanding. Fours withdraw to feel and process emotions. Nines withdraw to find peace and avoid disturbance. Same behavior, different engines.",
      },
    },
    {
      id: "u7-l4-e13",
      difficulty: 3,
      content: {
        type: "interleaving",
        title: "Types 5, 1 & 4 — Identify the motivation",
        typeNumbers: [5, 1, 4],
        items: [
          {
            statement: "Declines a last-minute invitation, not because they dislike the people, but because unplanned social demands feel depleting and they need to protect their energy.",
            correctType: 5,
            explanation: "The Five conserves resources. Unplanned demands feel like intrusions that threaten their limited supply of inner energy.",
          },
          {
            statement: "Crafts a lengthy response to an email to make sure every nuance is precisely worded — because an imprecise reply would feel like a failure of their own standards.",
            correctType: 1,
            explanation: "The One's precision comes from an internalized standard of correctness. Getting it right matters in principle.",
          },
          {
            statement: "Experiences a powerful sense of connection during a film and then feels melancholy afterward, aware of the gap between that feeling and ordinary life.",
            correctType: 4,
            explanation: "The Four lives in the gap between the ideal and the real. Emotional intensity followed by longing is their signature.",
          },
        ],
      } as InterleavingExerciseContent,
    },
  ],
};

// ── Lesson 5: Near-Neighbor Discrimination — Type 5 vs Type 9 ─────────────

const lesson5: Lesson = {
  id: "u7-l5",
  scaffoldStep: 3 as const,
  unitId: "type-5",
  order: 5,
  title: "Type 5 vs Type 9",
  subtitle: "Two withdrawn types with very different inner engines",
  xpReward: 25,
  exercises: [
    {
      id: "u7-l5-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Why 5 and 9 Are Confused",
        body: "Both Type 5 and Type 9 are withdrawn and private. The difference: Type 5 withdraws deliberately to conserve energy and protect inner resources. Type 9 fades into the background through a dissolution of self — they don't withdraw so much as disappear.",
        highlight: "energy conservation vs. self-dissolution",
      },
    },
    {
      id: "u7-l5-e2",
      difficulty: 2,
      content: ({
        type: "discrimination",
        typeA: 5,
        typeB: 9,
        prompt: "Each statement below belongs to either Type 5 (The Investigator) or Type 9 (The Peacemaker). Tap the correct type for each.",
        items: [
          {
            text: "Experiences social interaction as depleting — needs time alone afterward to process and restore, even when the interaction was pleasant.",
            answer: "A",
            explanation: "Type 5 experiences the world as demanding more than they can give. Social contact is energetically costly.",
          },
          {
            text: "Loses track of their own wants and needs when around others — other people's presence dilutes their sense of self.",
            answer: "B",
            explanation: "Type 9 merges with the field of others. This is not introversion — it is a dissolution of self-boundary.",
          },
          {
            text: "Compartmentalizes life carefully — keeps different domains separate and reveals only what is necessary in each context.",
            answer: "A",
            explanation: "Type 5's compartmentalization is resource-management. Each domain gets only its allotted portion.",
          },
          {
            text: "Agrees to things without accessing their actual preference — then feels quietly resentful about situations they technically consented to.",
            answer: "B",
            explanation: "Type 9's passive resistance emerges when suppressed preferences finally surface as resentment. They said yes without accessing their no.",
          },
        ],
      } as DiscriminationContent) as unknown as ExerciseContent,
    },
    {
      id: "u7-l5-e3",
      difficulty: 3,
      content: {
        type: "multiple-choice",
        question: "What is the key difference between Type 5 and Type 9 withdrawal?",
        options: [
          "Type 5 withdraws to feel emotions; Type 9 withdraws to gather data",
          "Type 5 withdraws to conserve resources; Type 9 fades out through self-dissolution",
          "Type 5 is more social than Type 9 overall",
          "Type 9 is more analytical during withdrawal than Type 5",
        ],
        correctIndex: 1,
        explanation: "Type 5's withdrawal is an active, boundaried strategy to protect limited energy. Type 9's disappearing is a passive merging — their presence simply diminishes as others fill the space.",
      },
    },
  ],
};

export const unit07Lessons: Lesson[] = [lesson1, lesson2, lesson3, lesson4, lesson5];
