// ─────────────────────────────────────────────────────────────────────────────
// Unit 18 — Introverted Intuition (Ni)
// Unconscious pattern synthesis, convergent insight, "just knowing"
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson } from "@/types/lessons";

const UNIT_ID = "ni";

// ── Lesson 1: What IS Ni? ─────────────────────────────────────────────────

const lesson1: Lesson = {
  id: "u18-l1",
  unitId: UNIT_ID,
  order: 1,
  title: "The Lightning Bolt",
  subtitle: "What Introverted Intuition feels like from the inside",
  xpReward: 20,
  exercises: [
    {
      id: "u18-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "What Is Introverted Intuition?",
        body: "Ni is an unconscious pattern-synthesis engine that takes in many scattered inputs and converges them into a single, fully-formed insight. It asks: 'What is this REALLY about? Where is this heading?' The result often arrives as a sudden 'aha' — a knowing without knowing how you know.",
        highlight: "convergent insight",
      },
    },
    {
      id: "u18-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Ni from the Inside",
        body: "People with strong Ni describe insights that appear fully formed, like mental lightning bolts. They can't always explain the steps that got them there — the processing happens beneath conscious awareness. It's the hardest cognitive function to explain because it literally works in the dark.",
        highlight: "mental lightning bolts",
      },
    },
    {
      id: "u18-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core question that Ni asks?",
        options: [
          "What am I physically experiencing right now?",
          "What is this REALLY about? Where is this heading?",
          "What does the group need me to feel?",
          "What have I experienced before that's similar to this?",
        ],
        correctIndex: 1,
        explanation: "Ni cuts beneath surface appearances to find the underlying meaning or trajectory. It's always asking about the deeper significance and future direction of things.",
      },
    },
    {
      id: "u18-l1-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Why is Ni often called the hardest cognitive function to explain?",
        options: [
          "Because it's extremely rare",
          "Because it processes information unconsciously and delivers insights without a clear trail of reasoning",
          "Because only geniuses have it",
          "Because it requires years of meditation to develop",
        ],
        correctIndex: 1,
        explanation: "Ni works below conscious awareness. The pattern-matching and synthesis happen in the background, so Ni users often 'just know' something without being able to show their work. This makes it mysterious even to those who use it.",
      },
    },
    {
      id: "u18-l1-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does Ni process information differently from most other functions?",
        options: [
          "It relies on external data and measurable facts",
          "It takes many scattered inputs and converges them into one unified insight",
          "It generates as many possibilities as possible from a single idea",
          "It catalogs past experiences for future reference",
        ],
        correctIndex: 1,
        explanation: "Ni is convergent — many inputs funnel down into a single insight. This is the opposite of Ne, which diverges outward from one idea into many possibilities.",
      },
    },
    {
      id: "u18-l1-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each Ni characteristic to its description.",
        pairs: [
          { left: "Convergent thinking", right: "Many inputs become one insight" },
          { left: "Unconscious processing", right: "Works beneath awareness" },
          { left: "Future orientation", right: "Sees where things are heading" },
          { left: "Pattern synthesis", right: "Connects dots you didn't know existed" },
          { left: "'Aha' moments", right: "Insights arrive fully formed" },
        ],
      },
    },
    {
      id: "u18-l1-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Ni takes many scattered inputs and ___ them into a single, fully-formed insight.",
        options: ["converges", "diverges", "catalogs", "debates"],
        correctIndex: 0,
        explanation: "Convergence is Ni's signature move. While Ne diverges outward into possibilities, Ni funnels everything inward toward one unified understanding.",
      },
    },
    {
      id: "u18-l1-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Ni users often describe their insights as arriving like ___ — sudden, complete, and difficult to trace back to a source.",
        options: ["lightning bolts", "slow calculations", "group discussions", "memorized facts"],
        correctIndex: 0,
        explanation: "The 'lightning bolt' metaphor captures how Ni delivers its conclusions: suddenly, without warning, and fully formed. The processing happened unconsciously, so the insight seems to appear from nowhere.",
      },
    },
    {
      id: "u18-l1-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Maya is sitting in a meeting where the team is discussing a new business strategy. Halfway through, she suddenly says, 'This isn't going to work — I can feel it.' When pressed for specifics, she struggles to articulate exactly why. Two months later, the strategy fails for exactly the reasons she sensed but couldn't explain.",
        question: "What cognitive function is Maya most likely using?",
        options: [
          "Te — she analyzed the data and found logical flaws",
          "Si — she remembered a similar past failure",
          "Ni — her unconscious pattern recognition detected the problem before she could articulate it",
          "Fe — she sensed the group's emotional resistance to the plan",
        ],
        correctIndex: 2,
        explanation: "This is textbook Ni: a strong conviction about what will happen, arriving before conscious reasoning can explain it. Ni users often 'just know' but can't show their work, which frustrates others (and sometimes themselves).",
      },
    },
    {
      id: "u18-l1-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two friends are watching a movie. Twenty minutes in, Friend A says, 'The butler did it.' Friend B asks, 'How can you possibly know that already?' Friend A says, 'I don't know — something about the way the story is set up just points there.' At the end, Friend A is right.",
        question: "What is happening in Friend A's mind?",
        options: [
          "They've seen this movie before and remember the ending",
          "Their Ni is synthesizing narrative patterns unconsciously, producing a convergent prediction",
          "They're making a lucky random guess",
          "They're using Te to logically deduce the answer from clues",
        ],
        correctIndex: 1,
        explanation: "Ni picks up on patterns — narrative structure, character archetypes, subtle foreshadowing — and synthesizes them unconsciously into a prediction. The person can't always explain the clues because the processing happened below awareness.",
      },
    },
    {
      id: "u18-l1-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these experiences into Ni expressions vs. NOT Ni expressions.",
        categories: ["Ni Expression", "Not Ni"],
        items: [
          { text: "A sudden conviction about where a situation is heading", categoryIndex: 0 },
          { text: "Carefully reviewing last year's sales data", categoryIndex: 1 },
          { text: "Knowing something without knowing how you know it", categoryIndex: 0 },
          { text: "Brainstorming 20 different business ideas in one sitting", categoryIndex: 1 },
          { text: "An insight that arrives fully formed after days of unconscious processing", categoryIndex: 0 },
          { text: "Following a step-by-step recipe exactly as written", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u18-l1-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which types have Ni as their DOMINANT (first) function?",
        options: [
          "INTJ and INFJ",
          "ENTP and ENFP",
          "ESTP and ESFP",
          "ISTJ and ISFJ",
        ],
        correctIndex: 0,
        explanation: "INTJ (Ni-Te-Fi-Se) and INFJ (Ni-Fe-Ti-Se) lead with Ni as their dominant function. They live in a world of convergent pattern recognition and future vision.",
      },
    },
  ],
};

// ── Lesson 2: Ni in Different Stack Positions ──────────────────────────────

const lesson2: Lesson = {
  id: "u18-l2",
  unitId: UNIT_ID,
  order: 2,
  title: "Ni in Your Stack",
  subtitle: "How Ni looks as dominant, auxiliary, tertiary, or inferior",
  xpReward: 25,
  exercises: [
    {
      id: "u18-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Stack Position Changes Everything",
        body: "Ni as a dominant function (INTJ, INFJ) creates people who naturally live in a world of deep pattern recognition and future vision. Ni as an inferior function (ESTP, ESFP) manifests as paranoid catastrophizing, obsessive tunnel vision, or a terrifying sense that 'everything is doomed.'",
        highlight: "Stack position changes everything",
      },
    },
    {
      id: "u18-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Beebe Model & Ni",
        body: "In Beebe's archetypal model, dominant Ni is the Hero — trusted foresight that guides decisions. Inferior Ni is the Anima/Animus — the least conscious function that can hijack the personality under stress, turning an action-oriented ESTP into a doom-spiraling fortune teller.",
        highlight: "Hero vs. Anima/Animus",
      },
    },
    {
      id: "u18-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does DOMINANT Ni (INTJ/INFJ) typically appear in everyday life?",
        options: [
          "Constantly brainstorming new possibilities out loud",
          "A quiet, focused vision of where things are heading, often seeing outcomes before others do",
          "Intense focus on physical sensations and present-moment details",
          "Organizing people toward group harmony",
        ],
        correctIndex: 1,
        explanation: "Dominant Ni users have an almost eerie ability to see where things are going. They tend to be focused, strategic, and future-oriented — often quietly confident about outcomes before evidence is available.",
      },
    },
    {
      id: "u18-l2-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "When Ni is the AUXILIARY (second) function, as in ENTJ and ENFJ, how does it typically show up?",
        options: [
          "As their primary way of navigating the world",
          "As a supporting inner vision that guides their dominant extraverted function",
          "As an unconscious, terrifying force",
          "As something they actively distrust",
        ],
        correctIndex: 1,
        explanation: "Auxiliary Ni serves the dominant function. ENTJs use Ni to give their Te strategic foresight; ENFJs use Ni to give their Fe a deeper understanding of where people and relationships are heading.",
      },
    },
    {
      id: "u18-l2-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which types have Ni as their INFERIOR (fourth) function?",
        options: [
          "INTJ and INFJ",
          "ENTJ and ENFJ",
          "ESTP and ESFP",
          "ENTP and ENFP",
        ],
        correctIndex: 2,
        explanation: "ESTP (Se-Ti-Fe-Ni) and ESFP (Se-Fi-Te-Ni) have Ni in the inferior position. These action-oriented, present-focused types have the hardest relationship with long-term vision and abstract foresight.",
      },
    },
    {
      id: "u18-l2-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each stack position to how Ni manifests.",
        pairs: [
          { left: "Dominant (INTJ/INFJ)", right: "Trusted foresight, strategic vision" },
          { left: "Auxiliary (ENTJ/ENFJ)", right: "Inner compass guiding external action" },
          { left: "Tertiary (ISTP/ISFP)", right: "Growing hunches about meaning and direction" },
          { left: "Inferior (ESTP/ESFP)", right: "Paranoid catastrophizing under stress" },
        ],
      },
    },
    {
      id: "u18-l2-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "An ESTP under extreme stress may experience their inferior Ni as obsessive ___ — becoming convinced that something terrible is going to happen.",
        options: ["catastrophizing", "brainstorming", "reminiscing", "organizing"],
        correctIndex: 0,
        explanation: "When inferior Ni erupts in Se-dominant types, it often manifests as dark, paranoid visions of the future. The normally action-oriented, live-in-the-moment person becomes paralyzed by a single terrifying 'what if.'",
      },
    },
    {
      id: "u18-l2-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Dominant Ni users often frustrate others because they 'just know' things but struggle to ___ how they arrived at their conclusions.",
        options: ["explain", "forget", "celebrate", "deny"],
        correctIndex: 0,
        explanation: "Since Ni processes information unconsciously, dominant Ni users often deliver conclusions without being able to retrace the logical steps. This 'trust me, I just know' quality can be maddening for others who need evidence.",
      },
    },
    {
      id: "u18-l2-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Jake, an ESTP, is normally the life of the party — spontaneous, action-oriented, fully in the moment. But after a series of setbacks, he starts saying things like, 'I can see where all of this is going and it's nowhere good. Everything is falling apart and there's nothing I can do.' He becomes withdrawn and fixated on worst-case scenarios.",
        question: "What is happening psychologically?",
        options: [
          "He's developing his dominant Se further",
          "His inferior Ni has him in its grip — he's experiencing paranoid future-catastrophizing",
          "He's using Fe to read the group's emotions",
          "He's maturely integrating his auxiliary Ti",
        ],
        correctIndex: 1,
        explanation: "This is a classic inferior Ni grip. The Se-dominant person, normally grounded in the present, gets hijacked by the unconscious Ni — producing dark, tunnel-vision predictions that feel absolutely certain and inescapable.",
      },
    },
    {
      id: "u18-l2-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two people both predict that a friend's new business will fail. Person A (INFJ) says: 'Something about the whole picture doesn't add up — I can sense the trajectory and it's off.' Person B (ESFP under stress) says: 'It's all going to crash and burn. Everything always does. I can just FEEL the doom.'",
        question: "What explains the difference in how their Ni operates?",
        options: [
          "Person A is smarter than Person B",
          "Person A has dominant Ni giving measured foresight; Person B has inferior Ni producing catastrophic, all-or-nothing doom",
          "Person A is using Fe, not Ni",
          "There is no real difference — both are Ni",
        ],
        correctIndex: 1,
        explanation: "Dominant Ni produces nuanced, measured foresight — a sense of trajectory. Inferior Ni produces extreme, all-or-nothing doom visions. Same function, dramatically different maturity levels.",
      },
    },
    {
      id: "u18-l2-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these experiences into Dominant Ni vs. Inferior Ni.",
        categories: ["Dominant Ni", "Inferior Ni"],
        items: [
          { text: "Calm, strategic sense of where things are heading", categoryIndex: 0 },
          { text: "Paranoid tunnel vision: 'Everything is doomed'", categoryIndex: 1 },
          { text: "Nuanced pattern recognition that guides decisions", categoryIndex: 0 },
          { text: "Fixation on a single catastrophic outcome", categoryIndex: 1 },
          { text: "Insights that arrive with quiet confidence", categoryIndex: 0 },
          { text: "Sudden dark premonitions during times of stress", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u18-l2-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "True or false: Ni works the same way regardless of its position in someone's cognitive stack.",
        options: [
          "True — Ni is Ni",
          "False — stack position dramatically changes how Ni manifests",
          "True — but only for introverts",
          "False — but only because of personality differences",
        ],
        correctIndex: 1,
        explanation: "Stack position is crucial. Dominant Ni is trusted strategic foresight. Inferior Ni is paranoid catastrophizing. Same function, completely different experience.",
      },
    },
  ],
};

// ── Lesson 3: Ni in Real Life ──────────────────────────────────────────────

const lesson3: Lesson = {
  id: "u18-l3",
  unitId: UNIT_ID,
  order: 3,
  title: "Ni in the Wild",
  subtitle: "Relationships, work, stress, and creativity through the Ni lens",
  xpReward: 25,
  exercises: [
    {
      id: "u18-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Ni in Relationships",
        body: "Ni users often feel like they can 'see through' people — sensing hidden motivations and future intentions. This makes them deeply perceptive partners, but it can also lead to frustration when they 'know' something is wrong but their partner hasn't caught up yet.",
        highlight: "see through people",
      },
    },
    {
      id: "u18-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Ni Under Stress",
        body: "When stressed, dominant Ni users can fall into a 'grip' of their inferior function Se. For INTJs and INFJs, this means sudden overindulgence in sensory experiences — binge eating, impulsive shopping, or reckless physical behavior that feels completely out of character.",
        highlight: "Se grip",
      },
    },
    {
      id: "u18-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does Ni typically show up at work?",
        options: [
          "Constantly socializing and building team rapport",
          "Strategic planning, predicting market shifts, and seeing the long game",
          "Meticulously organizing files and following standard procedures",
          "Generating dozens of brainstormed ideas in every meeting",
        ],
        correctIndex: 1,
        explanation: "Ni excels at strategic, long-term thinking. Ni users are often the ones who say 'here's where this industry is heading in five years' — and they're frequently right.",
      },
    },
    {
      id: "u18-l3-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What happens to an INTJ in an 'Se grip' (extreme stress)?",
        options: [
          "They become hyper-social and emotionally expressive",
          "They overindulge in sensory experiences — binge eating, impulsive spending, or reckless behavior",
          "They start making elaborate spreadsheets and to-do lists",
          "They retreat into nostalgic memories of the past",
        ],
        correctIndex: 1,
        explanation: "The INTJ's inferior function is Se. In a grip, INTJs flip from their natural strategic, future-focused approach to uncharacteristic sensory overindulgence — a desperate attempt to 'ground' themselves.",
      },
    },
    {
      id: "u18-l3-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the classic Ni 'I told you so' experience?",
        options: [
          "Remembering a specific past event that matches the current situation",
          "Having predicted an outcome long before others could see it, then watching it unfold",
          "Doing careful research and presenting data-backed conclusions",
          "Asking the group how they feel about a decision",
        ],
        correctIndex: 1,
        explanation: "Ni users frequently see outcomes far in advance. The 'I told you so' moment happens when an insight they couldn't fully explain at the time is eventually validated by reality — sometimes months or years later.",
      },
    },
    {
      id: "u18-l3-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each life domain to how Ni shows up in it.",
        pairs: [
          { left: "Relationships", right: "Sensing hidden motivations and future dynamics" },
          { left: "Work", right: "Strategic vision and long-term planning" },
          { left: "Stress", right: "Se grip: impulsive sensory overindulgence" },
          { left: "Creativity", right: "Symbolic, layered work with hidden meanings" },
          { left: "Conflict", right: "Already predicted this fight would happen" },
        ],
      },
    },
    {
      id: "u18-l3-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Ni-driven creativity tends to be deeply ___, using metaphor and symbolism to express insights that can't be communicated literally.",
        options: ["symbolic", "spontaneous", "collaborative", "data-driven"],
        correctIndex: 0,
        explanation: "Ni naturally thinks in symbols and archetypes. Ni creative work — writing, art, music — often has layers of meaning beneath the surface, sometimes even hidden from the creator's own conscious awareness.",
      },
    },
    {
      id: "u18-l3-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "One of Ni's greatest workplace strengths is the ability to see ___ — anticipating shifts that data-driven analysis might miss.",
        options: ["around corners", "past mistakes", "group emotions", "physical details"],
        correctIndex: 0,
        explanation: "Ni's unconscious pattern synthesis allows it to pick up on trends and trajectories before they become obvious. This 'seeing around corners' quality makes Ni users valuable strategists.",
      },
    },
    {
      id: "u18-l3-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Elena, an INFJ therapist, has a new client who presents a cheerful, everything-is-fine exterior. After just one session, Elena has an unshakable gut feeling that something much deeper is going on — possibly trauma the client hasn't disclosed. She has no concrete evidence for this.",
        question: "What is most likely happening with Elena's Ni?",
        options: [
          "She's projecting her own issues onto the client",
          "Her Ni is synthesizing micro-signals — body language, word choice, tone — into a convergent insight about what's really going on",
          "She's using Te to logically analyze the client's statements",
          "She's remembering a similar client from the past (Si)",
        ],
        correctIndex: 1,
        explanation: "Ni picks up on patterns that the conscious mind doesn't register individually — tiny inconsistencies, micro-expressions, word choices — and synthesizes them into a unified insight. Elena 'just knows' because her Ni connected dots she couldn't consciously identify.",
      },
    },
    {
      id: "u18-l3-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "David, an INTJ software architect, keeps telling his team they need to rebuild the core infrastructure now, even though the current system works fine. 'Trust me,' he says, 'if we don't do this now, we'll be in serious trouble in two years.' The team resists because there's no visible problem. Two years later, the system crashes under scale exactly as David predicted.",
        question: "What does this reveal about Ni in professional settings?",
        options: [
          "Ni users are always right about predictions",
          "Ni's foresight can be frustratingly hard to justify to others because it arrives before the evidence does",
          "David was using Si — he remembered a past system failure",
          "David was lucky — anyone could have made that prediction",
        ],
        correctIndex: 1,
        explanation: "Ni's greatest professional challenge is the 'Cassandra problem': seeing what's coming but being unable to convince others because the evidence doesn't exist yet. The insight is real, but the justification lags behind.",
      },
    },
    {
      id: "u18-l3-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these workplace situations into 'Ni-friendly' vs. 'Ni-hostile.'",
        categories: ["Ni-Friendly", "Ni-Hostile"],
        items: [
          { text: "Long-term strategic planning roles", categoryIndex: 0 },
          { text: "Must justify every decision with immediate data", categoryIndex: 1 },
          { text: "Freedom to follow hunches and develop vision", categoryIndex: 0 },
          { text: "Rapid task-switching with no time for deep thinking", categoryIndex: 1 },
          { text: "Valued for pattern recognition and foresight", categoryIndex: 0 },
          { text: "Told 'just focus on what's right in front of you'", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u18-l3-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which of these is a common strength of Ni in everyday life?",
        options: [
          "Being the most fun person at a party",
          "Predicting outcomes and seeing where things are heading before others do",
          "Remembering every detail of past events",
          "Generating dozens of creative ideas per minute",
        ],
        correctIndex: 1,
        explanation: "Ni's superpower is foresight — the ability to see trajectories and outcomes that others can't yet perceive. This makes Ni users natural strategists, advisors, and visionaries.",
      },
    },
  ],
};

// ── Lesson 4: Spotting Ni & Common Confusions ──────────────────────────────

const lesson4: Lesson = {
  id: "u18-l4",
  unitId: UNIT_ID,
  order: 4,
  title: "Ni vs. the Imposters",
  subtitle: "Spotting Ni in others and distinguishing it from similar functions",
  xpReward: 30,
  exercises: [
    {
      id: "u18-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Critical Distinction: Ni vs. Ne",
        body: "Ni and Ne are BOTH intuitive functions, but they work in opposite directions. Ni converges: many inputs funnel into ONE insight. Ne diverges: one input explodes into MANY possibilities. Ni asks 'what will happen?' — Ne asks 'what COULD happen?'",
        highlight: "converges vs. diverges",
      },
    },
    {
      id: "u18-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Ni vs. Si: The Other Confusion",
        body: "Ni and Si are both introverted perceiving functions, so they can look similar from the outside — both involve 'internal knowing.' But Ni knows what WILL happen (future patterns), while Si knows what HAS happened (past experience). Ni synthesizes; Si catalogs.",
        highlight: "future patterns vs. past memories",
      },
    },
    {
      id: "u18-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the KEY difference between Ni and Ne?",
        options: [
          "Ni is smarter than Ne",
          "Ni converges (many → one insight), Ne diverges (one → many possibilities)",
          "Ni is for introverts, Ne is for extroverts",
          "Ni is about the future, Ne is about the past",
        ],
        correctIndex: 1,
        explanation: "The direction of information flow is the critical distinction. Ni funnels many scattered inputs into a single convergent insight. Ne takes a single input and explodes it outward into a web of possibilities.",
      },
    },
    {
      id: "u18-l4-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Someone says: 'I had this feeling for weeks that something was off with the project, and then it clicked — the entire approach is wrong and here's what we should do instead.' Which function is this?",
        options: [
          "Ne — they're exploring possibilities",
          "Ni — they had a slow-building convergent insight that crystallized into clarity",
          "Si — they're comparing to past projects",
          "Te — they're organizing external data",
        ],
        correctIndex: 1,
        explanation: "The slow build followed by sudden crystallization is classic Ni. The insight coalesced over time beneath conscious awareness, then emerged fully formed. Ne would generate many alternatives; Ni arrives at THE answer.",
      },
    },
    {
      id: "u18-l4-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Why might someone confuse Ni with Si?",
        options: [
          "Both are extraverted perceiving functions",
          "Both involve an internal sense of 'knowing' something, but Ni knows the future trajectory while Si knows the past experience",
          "Both generate multiple possibilities",
          "Both are judging functions",
        ],
        correctIndex: 1,
        explanation: "Ni and Si both produce an internal sense of certainty. But the content is different: Ni's certainty is about where things are GOING (pattern synthesis), while Si's certainty is about where things have BEEN (experiential memory).",
      },
    },
    {
      id: "u18-l4-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each statement to the correct cognitive function.",
        pairs: [
          { left: "Ni", right: "'I just know this is where it's heading'" },
          { left: "Ne", right: "'Oh, that reminds me of 5 other things this could be!'" },
          { left: "Si", right: "'Last time we did it this way, here's what happened'" },
          { left: "Ni", right: "'All the pieces clicked and now I see the whole picture'" },
        ],
      },
    },
    {
      id: "u18-l4-e7",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort these thinking patterns into Ni vs. Ne.",
        categories: ["Ni", "Ne"],
        items: [
          { text: "Many inputs converge into one insight", categoryIndex: 0 },
          { text: "One input diverges into many possibilities", categoryIndex: 1 },
          { text: "Arrives at THE answer after unconscious processing", categoryIndex: 0 },
          { text: "Generates a web of 'what if?' connections", categoryIndex: 1 },
          { text: "Focused, laser-like vision of where things lead", categoryIndex: 0 },
          { text: "Excited jumping between tangentially related ideas", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u18-l4-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Ni can be confused with Si because both involve internal 'knowing,' but Ni knows what will ___ while Si knows what has ___.",
        options: ["happen / happened", "feel / felt", "think / thought", "change / changed"],
        correctIndex: 0,
        explanation: "Ni is future-oriented pattern synthesis: 'I know where this is going.' Si is past-oriented experiential recall: 'I know what happened before.' Both produce conviction, but about entirely different things.",
      },
    },
    {
      id: "u18-l4-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two people are asked to brainstorm about a new restaurant concept. Person A says: 'What about a restaurant that's also a bookstore? Or a floating restaurant? Or one where you cook your own food? Or a mystery dinner concept?' Person B listens quietly, then says: 'It should be a farm-to-table restaurant with seasonal menus. That's where food culture is heading in this city.'",
        question: "Which person is using Ni and which is using Ne?",
        options: [
          "Person A = Ni, Person B = Ne",
          "Person A = Ne, Person B = Ni",
          "Both are using Ni",
          "Both are using Ne",
        ],
        correctIndex: 1,
        explanation: "Person A diverges from one prompt into many possibilities (Ne). Person B converges many inputs (food trends, city culture, etc.) into one focused vision of what will work (Ni). Classic Ne divergence vs. Ni convergence.",
      },
    },
    {
      id: "u18-l4-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "A manager is warned about a potential problem. Manager A says: 'This reminds me of exactly what happened at my last company — we should do what worked then.' Manager B says: 'I have a sense of where this is going, and it's not anywhere we've been before. We need a completely new approach.'",
        question: "Which manager is using Ni and which is using Si?",
        options: [
          "Manager A = Ni, Manager B = Si",
          "Manager A = Si, Manager B = Ni",
          "Both are using Ni",
          "Both are using Si",
        ],
        correctIndex: 1,
        explanation: "Manager A references a specific past experience and wants to replicate what worked (Si). Manager B has a forward-looking insight about an unprecedented trajectory and insists on a novel approach (Ni). Past vs. future orientation.",
      },
    },
    {
      id: "u18-l4-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "You're observing someone who seems to have strong 'gut instincts' about people and situations. They're often right. You're trying to determine if they use Ni or are just highly experienced (Si).",
        question: "What is the best way to tell the difference?",
        options: [
          "Ask them to explain their reasoning — Ni users will reference patterns and trajectories; Si users will reference specific past experiences",
          "There is no difference — intuition is intuition",
          "Ni users are always right; Si users are sometimes wrong",
          "Ni users are introverts; Si users are extroverts",
        ],
        correctIndex: 0,
        explanation: "The key differentiator is SOURCE. Ni users will say things like 'I can see where this is going' (future pattern). Si users will say 'this is just like the time when...' (past experience). Both produce accurate gut feelings, but from different origins.",
      },
    },
    {
      id: "u18-l4-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Quick review: Ni is best described as...",
        options: [
          "A possibility generator that sees connections everywhere",
          "An unconscious pattern-synthesis engine that converges many inputs into a single insight",
          "A detailed catalog of past experiences and memories",
          "A social thermostat that reads group emotions",
        ],
        correctIndex: 1,
        explanation: "Ni is the convergent insight engine. It works beneath conscious awareness, taking in scattered inputs and synthesizing them into a unified vision of where things are heading.",
      },
    },
  ],
};

export const unit18Lessons: Lesson[] = [lesson1, lesson2, lesson3, lesson4];
