// ─────────────────────────────────────────────────────────────────────────────
// Unit 9, Type 7: The Enthusiast
// 4 lessons × 12 exercises each
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson, SocraticPromptContent, InterleavingExerciseContent } from "@/types/lessons";

// ── Lesson 1: Core Motivation, Fear & Desire ────────────────────────────────

const lesson1: Lesson = {
  id: "u9-l1",
  scaffoldStep: 2 as const,
  unitId: "type-7",
  order: 1,
  title: "The Enthusiast's Core",
  subtitle: "Who is Type 7? Motivation, fear, and desire",
  xpReward: 20,
  exercises: [
    {
      id: "u9-l1-e0",
      difficulty: 1,
      content: {
        type: "socratic-prompt",
        question: "Think about someone who always has five plans in motion, always moving to the next thing. What do you think they might be avoiding? What would happen if they had to just... stop?",
        reflection: "Imagine the stillness. What might come up if there were no next thing to plan, no escape hatch, no open future to run toward?",
        revealLabel: "See the insight",
        conceptTitle: "The Open Future as Defense",
        conceptBody: "Sevens keep the future full of possibility as a defense against the present — specifically against pain, limitation, and the felt sense of deprivation. The constant forward motion isn't enthusiasm for life (though it looks like that) — it's anxiety managed through options. If there's always something better coming, you never have to fully feel what's here.",
        highlight: "anxiety managed through options",
      } as SocraticPromptContent,
    },
    {
      id: "u9-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Meet the Enthusiast",
        body: "Type 7 is driven by a need for freedom, stimulation, and happiness. They are the most future-oriented type, always planning the next adventure, brainstorming possibilities, and keeping their options open. Beneath their optimism lies a deep need to avoid pain.",
        highlight: "freedom",
      },
    },
    {
      id: "u9-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Core Fear",
        body: "Sevens fear being trapped in pain, deprivation, or boredom. This isn't just disliking discomfort, it's a deep dread that if they stop moving and face their inner experience, they'll be overwhelmed by unbearable suffering.",
        highlight: "trapped in pain",
      },
    },
    {
      id: "u9-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core desire of Type 7?",
        options: [
          "To be needed and appreciated",
          "To be in control of their environment",
          "To be happy, fulfilled, and free",
          "To find their true identity",
        ],
        correctIndex: 2,
        explanation:
          "Sevens desire happiness, fulfillment, and freedom above all. They organize their lives around maximizing positive experiences and keeping all options open.",
      },
    },
    {
      id: "u9-l1-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core fear of Type 7?",
        options: [
          "Being without support or guidance",
          "Being trapped in pain, deprivation, or boredom",
          "Being worthless without achievements",
          "Being controlled by others",
        ],
        correctIndex: 1,
        explanation:
          "Sevens' deepest fear is being stuck in suffering with no escape. This drives their relentless pursuit of stimulation and their avoidance of anything that feels limiting or painful.",
      },
    },
    {
      id: "u9-l1-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "Which phrase best captures the Seven's inner drive?",
        options: [
          "'I must be perfect.'",
          "'I must be needed.'",
          "'I must stay free and keep my options open.'",
          "'I must be strong and never show weakness.'",
        ],
        correctIndex: 2,
        explanation:
          "Sevens resist anything that narrows their freedom. Commitments, limitations, and painful emotions all feel like traps that could lock them into suffering.",
      },
    },
    {
      id: "u9-l1-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each Type 7 trait to its description.",
        pairs: [
          { left: "Reframing", right: "Turning negatives into positives mentally" },
          { left: "Future-orientation", right: "Always planning the next experience" },
          { left: "FOMO", right: "Fear of missing out on possibilities" },
          { left: "Scattered energy", right: "Starting many things, finishing few" },
          { left: "Optimism", right: "Focusing on silver linings" },
        ],
      },
    },
    {
      id: "u9-l1-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Type 7's optimism is actually a defense mechanism: they instinctively ___ painful experiences to avoid sitting with discomfort.",
        options: ["amplify", "reframe", "ignore completely", "project onto others"],
        correctIndex: 1,
        explanation:
          "Reframing is the Seven's signature defense: they rapidly turn negatives into positives, finding silver linings and lessons. This keeps pain at arm's length but can prevent genuine processing.",
      },
    },
    {
      id: "u9-l1-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Sevens keep their options open because closing a door feels like losing a ___ forever.",
        options: ["relationship", "possibility", "competition", "standard"],
        correctIndex: 1,
        explanation:
          "For Sevens, every closed door represents a lost possibility for happiness. This is why they resist commitment and keep juggling multiple plans, projects, and experiences.",
      },
    },
    {
      id: "u9-l1-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Mia has 14 browser tabs open: flight deals, a pottery class, a coding bootcamp, and three restaurant reservations for the same evening. She hasn't finished the book she started last week or the podcast series she was 'obsessed with' on Monday.",
        question: "Which Seven pattern is Mia demonstrating?",
        options: [
          "Procrastination from laziness",
          "The scatter pattern, pursuing many options to avoid the pain of limitation",
          "Strategic planning for future success",
          "Healthy curiosity and breadth of interest",
        ],
        correctIndex: 1,
        explanation:
          "Mia's scattered attention is classic Seven: every new option feels like a potential source of happiness, and narrowing down feels like deprivation. The result is breadth without depth.",
      },
    },
    {
      id: "u9-l1-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "After a painful breakup, Tyler immediately books a solo trip, signs up for three social events, and tells friends he's 'actually relieved, this is the best thing that could have happened.' Two months later, the grief hits him all at once.",
        question: "What Seven defense is Tyler using?",
        options: [
          "Rationalization, reframing pain as a positive to avoid processing it",
          "Projection, blaming the partner for everything",
          "Isolation, cutting off from all emotions",
          "Sublimation, channeling pain into creative work",
        ],
        correctIndex: 0,
        explanation:
          "Tyler is using the Seven's core defense: rationalization through reframing. By turning the breakup into a 'positive,' he avoids the grief, but it doesn't disappear; it just gets delayed.",
      },
    },
    {
      id: "u9-l1-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Jordan can't decide between three job offers. Each one has something exciting. Their friends say 'just pick one,' but Jordan keeps finding new pros and cons, afraid that choosing one means giving up the others permanently.",
        question: "What core Seven fear is driving Jordan's indecision?",
        options: [
          "Fear of failure at the chosen job",
          "Fear of missing out, closing doors means losing potential happiness",
          "Fear of what others will think of their choice",
          "Fear of being controlled by an employer",
        ],
        correctIndex: 1,
        explanation:
          "Jordan's paralysis is driven by the Seven's core fear: choosing one thing means being 'trapped' and losing other possibilities. For Sevens, options themselves feel like freedom.",
      },
    },
    {
      id: "u9-l1-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "Type 7 is also called 'The Epicure.' Why?",
        options: [
          "They only care about food",
          "They have a hunger for varied experiences, not just food",
          "They are the most disciplined type",
          "They focus exclusively on luxury",
        ],
        correctIndex: 1,
        explanation:
          "The alias 'Epicure' captures the Seven's appetite for the full buffet of life, experiences, ideas, plans, and possibilities. It's an insatiable hunger for MORE, not just food.",
      },
    },
  ],
};

// ── Lesson 2: Passion & Virtue + Health Levels ──────────────────────────────

const lesson2: Lesson = {
  id: "u9-l2",
  scaffoldStep: 2 as const,
  unitId: "type-7",
  order: 2,
  title: "Gluttony, Sobriety & Health",
  subtitle: "Naranjo's passion, the virtue of sobriety, and three health levels",
  xpReward: 25,
  exercises: [
    {
      id: "u9-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Passion: Gluttony",
        body: "In Naranjo's system, Seven's emotional passion is Gluttony, but not just for food. It's a gluttony for experiences, plans, ideas, and options. Sevens consume life in excess, always wanting more, never feeling quite satisfied with what they have.",
        highlight: "Gluttony",
      },
    },
    {
      id: "u9-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Virtue: Sobriety",
        body: "The antidote to Gluttony is Sobriety, being fully present with what IS rather than always reaching for what's next. Sobriety for a Seven means finding genuine satisfaction in the current moment instead of needing more.",
        highlight: "Sobriety",
      },
    },
    {
      id: "u9-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is Naranjo's emotional passion for Type 7?",
        options: ["Lust", "Vanity", "Gluttony", "Fear"],
        correctIndex: 2,
        explanation:
          "Gluttony is the Seven's passion. It's the compulsive overconsumption of experiences, stimulation, and possibilities, an inability to be satisfied with enough.",
      },
    },
    {
      id: "u9-l2-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What does 'Sobriety' mean as the Seven's virtue?",
        options: [
          "Never drinking alcohol",
          "Being serious and joyless",
          "Being present with what is, rather than always craving more",
          "Giving up all pleasurable activities",
        ],
        correctIndex: 2,
        explanation:
          "Sobriety doesn't mean giving up joy, it means finding deep satisfaction in the present moment instead of compulsively reaching for the next experience.",
      },
    },
    {
      id: "u9-l2-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "Why is 'Gluttony' counterintuitive as a name for the Seven's passion?",
        options: [
          "Sevens are usually thin",
          "People expect Gluttony to be only about food, but for Sevens it's about consuming excess experiences",
          "Sevens are actually very disciplined",
          "Gluttony is usually associated with Type 9",
        ],
        correctIndex: 1,
        explanation:
          "Naranjo's 'Gluttony' expands beyond food: it's the compulsive consumption of ideas, plans, stimulation, and novelty, the Seven's way of staying ahead of pain.",
      },
    },
    {
      id: "u9-l2-e6",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort these Type 7 traits into the correct health level.",
        categories: ["Healthy", "Average", "Unhealthy"],
        items: [
          { text: "Joyful, grateful, and present", categoryIndex: 0 },
          { text: "Accomplished and deeply satisfied", categoryIndex: 0 },
          { text: "Scattered and overextended", categoryIndex: 1 },
          { text: "Restless and acquisitive", categoryIndex: 1 },
          { text: "Impulsive and escapist", categoryIndex: 2 },
          { text: "Manic and addictive", categoryIndex: 2 },
        ],
      },
    },
    {
      id: "u9-l2-e7",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match the health level to its Seven behavior.",
        pairs: [
          { left: "Healthy", right: "Deeply grateful, present, accomplished" },
          { left: "Average", right: "Scattered, overbooked, always planning next thing" },
          { left: "Unhealthy", right: "Impulsive, addictive, manic escape from pain" },
          { left: "Passion (Gluttony)", right: "Compulsive overconsumption of experiences" },
          { left: "Virtue (Sobriety)", right: "Present-moment satisfaction with enough" },
        ],
      },
    },
    {
      id: "u9-l2-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "A Seven practicing the virtue of Sobriety learns to find deep ___ in the present moment instead of always reaching for more.",
        options: ["excitement", "satisfaction", "control", "analysis"],
        correctIndex: 1,
        explanation:
          "Sobriety is about genuine satisfaction, discovering that this moment, this experience, this relationship is enough. It's the opposite of the gluttony that says 'more, more, more.'",
      },
    },
    {
      id: "u9-l2-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Ava planned an amazing vacation, five cities in ten days. By day seven, she's exhausted but can't slow down. Skipping a planned activity feels like wasting the trip. She takes hundreds of photos but barely remembers actually being there.",
        question: "What Seven passion is Ava caught in?",
        options: [
          "Fear, she's anxious about safety",
          "Gluttony, she's consuming experiences without being present for any of them",
          "Vanity, she wants great photos for social media",
          "Lust, she's driven by intensity",
        ],
        correctIndex: 1,
        explanation:
          "Ava is deep in Gluttony: consuming experiences ravenously without actually savoring them. The quantity of experiences replaces the quality of presence.",
      },
    },
    {
      id: "u9-l2-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "After years of constantly chasing the next thrill, Kai takes a meditation retreat. It's excruciating at first, the silence feels like suffocation. But gradually, they start noticing beauty in small things: sunlight on a wall, the taste of plain rice. They feel more alive sitting still than they did traveling the world.",
        question: "What shift is Kai experiencing?",
        options: [
          "Moving from Sobriety to Gluttony",
          "Moving from Gluttony toward Sobriety, finding presence",
          "Becoming unhealthy by withdrawing from life",
          "Losing their natural Seven enthusiasm",
        ],
        correctIndex: 1,
        explanation:
          "Kai is discovering Sobriety: the richness available in simply being present. This doesn't kill Seven's joy, it deepens it by replacing compulsive consuming with genuine savoring.",
      },
    },
    {
      id: "u9-l2-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Riley has been cycling through increasingly intense experiences: extreme sports, substance use, constant travel, risky financial decisions. Each thrill fades faster, and they need something bigger next time. Friends are worried but Riley says, 'I'm just living life to the fullest.'",
        question: "Where is Riley on the health spectrum?",
        options: [
          "Healthy, they're embracing life",
          "Average, scattered but functional",
          "Unhealthy, the Gluttony has become addictive and escalating",
          "Growing, they're developing Sobriety",
        ],
        correctIndex: 2,
        explanation:
          "Riley is in unhealthy Seven territory: the Gluttony has escalated into addiction patterns. The need for increasingly intense experiences and the inability to be satisfied are warning signs.",
      },
    },
    {
      id: "u9-l2-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "Does practicing Sobriety mean a Seven must give up joy and fun?",
        options: [
          "Yes, Sobriety requires seriousness",
          "No, Sobriety means finding deeper joy through presence, not eliminating fun",
          "Yes, they need to become more like a Type 5",
          "No, Sobriety only applies to substance use",
        ],
        correctIndex: 1,
        explanation:
          "Sobriety doesn't kill joy, it transforms it. Instead of the frantic chase for more, Sevens discover that real happiness comes from being fully present with what's here now.",
      },
    },
  ],
};

// ── Lesson 3: Wings, Stress Line & Growth Line ──────────────────────────────

const lesson3: Lesson = {
  id: "u9-l3",
  scaffoldStep: 4 as const,
  unitId: "type-7",
  order: 3,
  title: "Wings & Lines",
  subtitle: "7w6 vs 7w8, stress to 1, growth to 5",
  xpReward: 25,
  exercises: [
    {
      id: "u9-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Wings: 7w6 and 7w8",
        body: "7w6 (The Entertainer) blends Seven's enthusiasm with Six's loyalty and anxiety, they're funnier, more connected to groups, but also more nervous. 7w8 (The Realist) blends Seven's appetite with Eight's assertiveness, they're bolder, more materialistic, and go after what they want with force.",
        highlight: "7w6 vs 7w8",
      },
    },
    {
      id: "u9-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Stress and Growth Lines",
        body: "Under stress, Sevens move to the unhealthy side of Type 1: becoming critical, rigid, and perfectionistic. In growth, they move to the healthy side of Type 5: becoming focused, deep, and genuinely content with less.",
        highlight: "stress to 1, growth to 5",
      },
    },
    {
      id: "u9-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Where does Type 7 move under stress?",
        options: ["To 5", "To 3", "To 1", "To 9"],
        correctIndex: 2,
        explanation:
          "Under stress, Sevens take on unhealthy One traits: they become rigid, critical, judgmental, and perfectionistic, the opposite of their usual easygoing nature.",
      },
    },
    {
      id: "u9-l3-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Where does Type 7 move in growth?",
        options: ["To 1", "To 8", "To 3", "To 5"],
        correctIndex: 3,
        explanation:
          "In growth, Sevens gain healthy Five qualities: the ability to focus deeply, sit with one thing at a time, and find richness in depth rather than breadth.",
      },
    },
    {
      id: "u9-l3-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What distinguishes 7w6 from 7w8?",
        options: [
          "7w6 is more loyal and anxious; 7w8 is more assertive and bold",
          "7w6 is more withdrawn; 7w8 is more emotional",
          "7w6 is healthier than 7w8",
          "There is no meaningful difference between them",
        ],
        correctIndex: 0,
        explanation:
          "The Six wing adds loyalty, humor, and a touch of anxiety to the Seven. The Eight wing adds assertiveness, boldness, and a go-getter intensity.",
      },
    },
    {
      id: "u9-l3-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each wing or line to its description.",
        pairs: [
          { left: "7w6, The Entertainer", right: "Funnier, more loyal, slightly anxious" },
          { left: "7w8, The Realist", right: "Bolder, more assertive, materialistic" },
          { left: "Stress to 1", right: "Becomes critical, rigid, perfectionistic" },
          { left: "Growth to 5", right: "Becomes focused, deep, content with less" },
        ],
      },
    },
    {
      id: "u9-l3-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "When a normally easygoing Seven starts snapping at people for small mistakes and insisting everything be done 'the right way,' they are likely moving to their ___ point.",
        options: ["growth", "wing", "stress", "integration"],
        correctIndex: 2,
        explanation:
          "This rigidity and critical behavior is the Seven's stress move to Type 1. The usually flexible Seven becomes unexpectedly perfectionistic and judgmental.",
      },
    },
    {
      id: "u9-l3-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "A growing Seven develops the ability to ___ deeply rather than constantly skipping to the next exciting thing.",
        options: ["withdraw", "control others", "focus", "perform"],
        correctIndex: 2,
        explanation:
          "The growth move to 5 gives Sevens the gift of focus and depth. Instead of surface-level sampling of everything, they learn to go deep into fewer things and find genuine richness there.",
      },
    },
    {
      id: "u9-l3-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Usually fun-loving and flexible, Pat has been under pressure at work for weeks. Now they're snapping at their partner for leaving dishes in the sink, insisting on a rigid morning routine, and criticizing coworkers for being 'sloppy.' Their partner says, 'Who are you right now?'",
        question: "What is happening to Pat?",
        options: [
          "They are growing into a healthier version of themselves",
          "They are moving to their stress point at Type 1, becoming critical and rigid",
          "They are expressing their 7w6 wing more strongly",
          "They have always been a Type 1, not a Type 7",
        ],
        correctIndex: 1,
        explanation:
          "Pat is in their stress line to Type 1. Under prolonged pressure, Sevens can flip to the shadow side of One: rigid standards, harsh criticism, and a joyless insistence on perfection.",
      },
    },
    {
      id: "u9-l3-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "After years of bouncing between hobbies, Morgan commits to learning guitar seriously. They practice daily, read music theory, and resist the urge to also start drums and piano. Six months in, they feel a satisfaction deeper than any of their previous short-lived enthusiasms.",
        question: "What growth line is Morgan accessing?",
        options: [
          "Stress to 1, becoming disciplined out of anxiety",
          "Growth to 5, developing focus, depth, and contentment with fewer things",
          "Wing shift to 7w8, pursuing goals assertively",
          "Disintegration, losing their natural Seven traits",
        ],
        correctIndex: 1,
        explanation:
          "Morgan is moving into healthy Five territory: choosing depth over breadth, resisting the impulse to scatter, and discovering that true satisfaction comes from mastery rather than novelty.",
      },
    },
    {
      id: "u9-l3-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these behaviors by whether they belong to 7w6 or 7w8.",
        categories: ["7w6, The Entertainer", "7w8, The Realist"],
        items: [
          { text: "Uses humor to bond with groups", categoryIndex: 0 },
          { text: "Goes after what they want with force", categoryIndex: 1 },
          { text: "More anxious underneath the fun exterior", categoryIndex: 0 },
          { text: "More materialistic and acquisitive", categoryIndex: 1 },
          { text: "Deeply loyal to their inner circle", categoryIndex: 0 },
          { text: "Comfortable with confrontation", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u9-l3-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "When a Seven becomes rigid and perfectionistic, this is a sign of:",
        options: [
          "Healthy growth",
          "Natural Seven behavior",
          "Stress, moving to the unhealthy side of Type 1",
          "A mistype, they're actually a Type 1",
        ],
        correctIndex: 2,
        explanation:
          "Rigidity and perfectionism in a normally flexible Seven signals stress. They're unconsciously adopting unhealthy Type 1 patterns to cope with overwhelming anxiety.",
      },
    },
  ],
};

// ── Lesson 4: Spotting This Type + Common Mistypes ──────────────────────────

const lesson4: Lesson = {
  id: "u9-l4",
  scaffoldStep: 1 as const,
  unitId: "type-7",
  order: 4,
  title: "Recognizing the Enthusiast",
  subtitle: "Spotting Type 7 in the wild and avoiding common mistypes",
  xpReward: 25,
  exercises: [
    {
      id: "u9-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Spotting a Seven",
        body: "Sevens light up when brainstorming possibilities. They struggle with follow-through, keep multiple plans going, and instinctively reframe bad news. Watch for the person who always has an exciting idea, a backup plan, and a story about their next adventure.",
        highlight: "brainstorming possibilities",
      },
    },
    {
      id: "u9-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Common Mistypes",
        body: "Sevens are most confused with Type 3 (both energetic and upbeat, but 3s chase goals while 7s chase experiences) and Type 2 (both gregarious, but 2s give to be needed, while 7s connect for stimulation and fun).",
        highlight: "Type 3 and Type 2",
      },
    },
    {
      id: "u9-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "Which behavior is MOST characteristic of a Seven?",
        options: [
          "Creating a detailed five-year plan and sticking to it",
          "Brainstorming ten new ideas before finishing the first one",
          "Withdrawing to process emotions alone",
          "Focusing intently on one project until it's perfect",
        ],
        correctIndex: 1,
        explanation:
          "Sevens generate ideas rapidly and get excited about each one. The challenge is follow-through, the next idea always seems more exciting than the current one.",
      },
    },
    {
      id: "u9-l4-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "How do you tell a Seven from a Three?",
        options: [
          "Sevens chase experiences; Threes chase achievements and status",
          "Sevens are introverted; Threes are extroverted",
          "Sevens are emotional; Threes are logical",
          "There's no real difference between them",
        ],
        correctIndex: 0,
        explanation:
          "Both types are energetic and upbeat, but their drives differ: Threes are motivated by success and admiration, while Sevens are motivated by freedom and experience.",
      },
    },
    {
      id: "u9-l4-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "What conversational habit is a strong Seven signal?",
        options: [
          "Consistently steering conversation toward accomplishments",
          "Rapidly jumping between topics with infectious enthusiasm",
          "Carefully analyzing every statement for logical consistency",
          "Quietly listening and rarely contributing",
        ],
        correctIndex: 1,
        explanation:
          "Sevens are associative thinkers whose conversations bounce from topic to topic. Their enthusiasm is contagious, and they connect ideas in surprising, often entertaining ways.",
      },
    },
    {
      id: "u9-l4-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction:
          "Match the behavior to the correct type, Seven or its common mistype.",
        pairs: [
          { left: "Energized by possibilities and experiences", right: "Type 7" },
          { left: "Energized by goals and achievements", right: "Type 3" },
          { left: "Social because they enjoy stimulation", right: "Type 7" },
          { left: "Social because they need to feel needed", right: "Type 2" },
        ],
      },
    },
    {
      id: "u9-l4-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "When something bad happens, a Seven's instinct is to immediately ___ rather than sit with the painful feelings.",
        options: ["reframe it as positive", "blame someone", "withdraw completely", "seek revenge"],
        correctIndex: 0,
        explanation:
          "Reframing is the Seven's signature coping strategy. 'Everything happens for a reason' and 'look on the bright side' are their automatic responses to pain.",
      },
    },
    {
      id: "u9-l4-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Both Sevens and Twos are gregarious, but Sevens connect for ___ while Twos connect to feel needed.",
        options: ["status", "control", "stimulation and fun", "security"],
        correctIndex: 2,
        explanation:
          "This is the key distinction: Sevens are social because people are a source of excitement and stimulation. Twos are social because relationships fulfill their need to be needed and loved.",
      },
    },
    {
      id: "u9-l4-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Two friends both seem to live exciting lives on Instagram. One posts about promotions, awards, and networking events with captions about hustle and success. The other posts about spontaneous road trips, quirky restaurants, and five different hobby attempts this month.",
        question: "Which friend is more likely the Seven?",
        options: [
          "The first, they seem more excited about life",
          "The second, they're chasing varied experiences, not achievements",
          "Both are Sevens with different wings",
          "Neither, Sevens don't use social media",
        ],
        correctIndex: 1,
        explanation:
          "The first friend shows Three patterns (achievement, status, hustle). The second shows Seven patterns (variety, spontaneity, experience-collecting). Both are energetic but driven by different things.",
      },
    },
    {
      id: "u9-l4-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "At a dinner party, one guest dominates conversation by jumping from a travel story to a business idea to a joke to a podcast recommendation, all in five minutes. Another guest is equally talkative but keeps steering conversation toward themselves: their latest achievement, their connections, their plans for success.",
        question: "Which guest is the Seven?",
        options: [
          "The first, their associative, enthusiasm-driven conversation is classic Seven",
          "The second, their energy matches Seven's",
          "Both are Sevens",
          "Neither is a Seven",
        ],
        correctIndex: 0,
        explanation:
          "The first guest's rapid topic-jumping and infectious enthusiasm is quintessentially Seven. The second guest's self-promotional focus points more to Type 3.",
      },
    },
    {
      id: "u9-l4-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Sam and Alex both throw great parties. Sam makes sure every guest feels welcomed and personally attended to, checking in on everyone and anticipating needs. Alex fills the party with games, music, unexpected surprises, and keeps the energy high, but might not notice a wallflower in the corner.",
        question: "Who is the Seven?",
        options: [
          "Sam, their people skills indicate Seven",
          "Alex, they're focused on stimulation and fun, not individual emotional needs",
          "Both, they're just different Seven wings",
          "Neither, Sevens prefer small gatherings",
        ],
        correctIndex: 1,
        explanation:
          "Alex is the Seven: focused on generating excitement and variety. Sam is more likely a Two: focused on each person's emotional experience. Both are social, but for different reasons.",
      },
    },
    {
      id: "u9-l4-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "What's the BEST single clue that someone might be a Type 7?",
        options: [
          "They always finish what they start",
          "They instinctively reframe negatives as positives and resist sitting with pain",
          "They prefer routine and predictability",
          "They focus deeply on one interest at a time",
        ],
        correctIndex: 1,
        explanation:
          "The most reliable Seven signal is the reframe reflex: when something painful happens, they immediately find the silver lining. This keeps them moving forward, and away from pain.",
      },
    },
    {
      id: "u9-l4-e13",
      difficulty: 3,
      content: {
        type: "interleaving",
        title: "Types 7, 3 & 2 — Identify the motivation",
        typeNumbers: [7, 3, 2],
        items: [
          {
            statement: "Reframes a difficult situation almost immediately into what can be learned from it — not to process it, but to escape the weight of the feeling.",
            correctType: 7,
            explanation: "The Seven uses positive reframing as a flight from pain. The move to 'silver lining' is anxiety management.",
          },
          {
            statement: "Offers help to a struggling colleague because seeing them struggle makes them feel needed — and being needed feels like a guarantee of connection.",
            correctType: 2,
            explanation: "The Two is moved by the prospect of being indispensable, not just by generosity.",
          },
          {
            statement: "Announces a new project before it's finished — motivated more by wanting to be seen as innovative and ahead of the curve than by the project itself.",
            correctType: 3,
            explanation: "The Three performs for admiration. The announcement is about image, not just enthusiasm.",
          },
        ],
      } as InterleavingExerciseContent,
    },
  ],
};

export const unit09Lessons: Lesson[] = [lesson1, lesson2, lesson3, lesson4];
