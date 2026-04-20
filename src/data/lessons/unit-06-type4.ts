// ─────────────────────────────────────────────────────────────────────────────
// Unit 6. Type 4: The Individualist / The Romantic
// 4 lessons × 12 exercises each
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson, ExerciseContent, FreeRecallContent, InterleavingExerciseContent } from "@/types/lessons";
import type { DiscriminationContent } from "@/components/lessons/exercises/DiscriminationExercise";

// ── Lesson 1: Core Motivation, Fear & Desire ──────────────────────────────

const lesson1: Lesson = {
  id: "u6-l1",
  scaffoldStep: 2 as const,
  unitId: "type-4",
  order: 1,
  title: "The Search for Self",
  subtitle: "Core motivation, fear, and desire of Type 4",
  xpReward: 20,
  exercises: [
    {
      id: "u6-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Meet the Individualist",
        body: "Type 4s are driven by a deep need for identity, authenticity, and significance. They feel fundamentally different from others, and both treasure and suffer from that sense of being unique. Their emotional life is rich, intense, and central to who they are.",
        highlight: "identity and authenticity",
      },
    },
    {
      id: "u6-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Fear, Desire & Motivation",
        body: "The core fear of Type 4 is having no identity, being fundamentally flawed or insignificant. Their core desire is to find themselves and their personal significance. The haunting question: 'Who am I, and why do I feel like something essential is missing?'",
        highlight: "something essential is missing",
      },
    },
    {
      id: "u6-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core fear of Type 4?",
        options: [
          "Being controlled by others",
          "Being without support or guidance",
          "Having no identity or personal significance",
          "Being trapped in pain",
        ],
        correctIndex: 2,
        explanation:
          "Fours fear that they have no real identity, that they're somehow missing something essential that everyone else seems to have. This creates both their creative depth and their suffering.",
      },
    },
    {
      id: "u6-l1-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core desire of Type 4?",
        options: [
          "To be safe and secure",
          "To find themselves and their significance",
          "To be the most successful",
          "To be needed by others",
        ],
        correctIndex: 1,
        explanation:
          "Fours are on a lifelong quest to discover who they truly are and what makes them significant. They want to find and express their authentic, unique self.",
      },
    },
    {
      id: "u6-l1-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What makes Type 4 unique in the Heart triad (2, 3, 4)?",
        options: [
          "They don't experience shame",
          "They internalize shame as a feeling of being fundamentally flawed",
          "They project shame outward onto others",
          "They avoid shame through achievement",
        ],
        correctIndex: 1,
        explanation:
          "While Twos cope with shame by becoming needed and Threes cope by becoming successful, Fours absorb shame directly, turning it into a sense of being uniquely defective. 'Something is wrong with me that nobody else has.'",
      },
    },
    {
      id: "u6-l1-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each Type 4 concept to its description.",
        pairs: [
          { left: "Core Fear", right: "Having no identity or significance" },
          { left: "Core Desire", right: "To find and express authentic self" },
          { left: "Key Feeling", right: "Something essential is missing" },
          { left: "Coping Strategy", right: "Creating a unique identity through depth" },
        ],
      },
    },
    {
      id: "u6-l1-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Fours often feel that others possess something ___ that they themselves are missing.",
        options: ["powerful", "essential", "dangerous", "boring"],
        correctIndex: 1,
        explanation:
          "This sense that others have something you lack, ease, happiness, belonging, normalcy, is central to the Four's inner world. It fuels both their longing and their creativity.",
      },
    },
    {
      id: "u6-l1-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Type 4s build their identity around being ___ and emotionally deep.",
        options: ["successful", "logical", "authentic", "powerful"],
        correctIndex: 2,
        explanation:
          "Authenticity is the Four's organizing principle. They'd rather be painfully real than comfortably fake. This commitment to emotional truth is both their gift and their burden.",
      },
    },
    {
      id: "u6-l1-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "At a party, everyone seems to be having fun. Jamie is standing to the side, watching, thinking: 'They all seem so effortlessly happy. Why can't I just be normal? There's something fundamentally different about me.' Jamie feels a bittersweet mixture of loneliness and a strange pride in their depth.",
        question: "What Type 4 dynamic is at work here?",
        options: [
          "Simple social anxiety",
          "The simultaneous suffering and identity-building from feeling different, 'I'm flawed, but at least I'm deep'",
          "Type 5 withdrawal for energy conservation",
          "Type 9 disengagement",
        ],
        correctIndex: 1,
        explanation:
          "This is quintessential Four, the painful feeling of being different, combined with a subtle pride in that difference. They suffer from not belonging, but belonging too easily would feel like losing themselves.",
      },
    },
    {
      id: "u6-l1-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Alex creates a deeply personal playlist for a friend's birthday. Each song was chosen for its emotional significance and connection to shared memories. When the friend says 'Cool playlist, thanks!' and moves on, Alex is crushed, feeling like their emotional depth was completely missed.",
        question: "What's happening for Alex?",
        options: [
          "Alex is overreacting to a normal response",
          "Alex invested their sense of identity and significance into the gift, and the casual response felt like their depth was invisible",
          "Alex is being controlling about how people respond to gifts",
          "This is a Type 2 pattern of giving for love",
        ],
        correctIndex: 1,
        explanation:
          "Fours pour their identity into what they create. When it's received casually, it doesn't just feel unappreciated, it feels like they themselves are unseen. The playlist wasn't just music; it was Alex's inner world on display.",
      },
    },
    {
      id: "u6-l1-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Morgan scrolls through social media seeing friends' engagement photos, vacation pics, and career milestones. Instead of feeling happy for them, Morgan feels a hollow ache and thinks: 'Everyone else got the manual for life. Why do I always feel like I'm on the outside looking in?'",
        question: "This illustrates which central Four experience?",
        options: [
          "Jealousy, Morgan wants what they have",
          "The sense of fundamental deficiency, others have what Fours feel they're missing",
          "Depression unrelated to type",
          "Type 3 competitive comparison",
        ],
        correctIndex: 1,
        explanation:
          "This goes deeper than jealousy. It's the Four's existential sense of lack, not wanting specific things, but feeling that others possess a fundamental ease of being that the Four was denied. It's about identity, not stuff.",
      },
    },
    {
      id: "u6-l1-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Type 4 belongs to which Enneagram triad?",
        options: [
          "Body/Gut Center (instinct)",
          "Head Center (thinking)",
          "Heart/Feeling Center (image/shame)",
          "They transcend all triads",
        ],
        correctIndex: 2,
        explanation:
          "Fours are in the Heart triad alongside Types 2 and 3. Their core issue is identity and shame, but while Twos and Threes try to escape shame, Fours dive straight into it.",
      },
    },
  ],
};

// ── Lesson 2: Passion & Virtue + Health Levels ────────────────────────────

const lesson2: Lesson = {
  id: "u6-l2",
  scaffoldStep: 2 as const,
  unitId: "type-4",
  order: 2,
  title: "Envy to Equanimity",
  subtitle: "The passion, virtue, and health levels of Type 4",
  xpReward: 25,
  exercises: [
    {
      id: "u6-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Passion: Envy",
        body: "Naranjo identified the Four's passion as Envy, not wanting someone's specific possessions, but a deep sense that others have something essential you lack. It's existential envy: 'They have an ease of being that was denied to me.'",
        highlight: "Envy",
      },
    },
    {
      id: "u6-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Virtue: Equanimity",
        body: "The antidote is Equanimity, emotional balance and the recognition that you already have what you need. Healthy Fours stop chasing what's missing and discover that the present moment, exactly as it is, can be enough.",
        highlight: "Equanimity",
      },
    },
    {
      id: "u6-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the passion of Type 4?",
        options: ["Pride", "Anger", "Envy", "Sloth"],
        correctIndex: 2,
        explanation:
          "Envy in the Enneagram sense isn't about wanting someone's car or job, it's the deep feeling that everyone else got something essential that you didn't. It's a longing for what seems permanently out of reach.",
      },
    },
    {
      id: "u6-l2-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What virtue does a healthy Type 4 embody?",
        options: ["Serenity", "Equanimity", "Humility", "Truthfulness"],
        correctIndex: 1,
        explanation:
          "Equanimity is emotional balance, the ability to be present with what is, rather than longing for what's missing. Healthy Fours discover that completeness was always available; they just couldn't see it through the haze of envy.",
      },
    },
    {
      id: "u6-l2-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does the Four's Envy differ from ordinary jealousy?",
        options: [
          "It doesn't, they're the same thing",
          "It's about existential lack, not specific possessions",
          "It's less intense than regular jealousy",
          "It only applies to romantic relationships",
        ],
        correctIndex: 1,
        explanation:
          "Regular jealousy is 'I want your promotion.' Four-type envy is 'I want your ability to just... be okay. Everyone else seems to know how to be normal and happy, and I don't.' It's about being, not having.",
      },
    },
    {
      id: "u6-l2-e6",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort these Type 4 traits by health level.",
        categories: ["Healthy", "Average", "Unhealthy"],
        items: [
          { text: "Inspired and creative", categoryIndex: 0 },
          { text: "Self-absorbed and temperamental", categoryIndex: 1 },
          { text: "Depressive and self-destructive", categoryIndex: 2 },
          { text: "Profoundly transformative", categoryIndex: 0 },
          { text: "Melancholic and envious", categoryIndex: 1 },
          { text: "Alienated and emotionally turbulent", categoryIndex: 2 },
        ],
      },
    },
    {
      id: "u6-l2-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "The Four's passion of Envy creates a persistent focus on what is ___.",
        options: ["present", "missing", "powerful", "logical"],
        correctIndex: 1,
        explanation:
          "Fours have a radar for absence. Their attention is magnetically drawn to what's lacking, distant, or lost, in relationships, in themselves, in life. The full glass always looks half-empty.",
      },
    },
    {
      id: "u6-l2-e8",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each health level to how the Four relates to emotions.",
        pairs: [
          { left: "Healthy", right: "Channels depth into creative expression" },
          { left: "Average", right: "Indulges in melancholy as identity" },
          { left: "Unhealthy", right: "Drowns in emotional turbulence" },
          { left: "Virtue (Equanimity)", right: "Finds balance without losing depth" },
        ],
      },
    },
    {
      id: "u6-l2-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Taylor is a talented painter. When they finish a piece that captures exactly what they felt, they experience a brief moment of wholeness. Then it fades, replaced by the familiar feeling: 'This still isn't quite right. Something is still missing.' Taylor starts the next painting chasing that feeling again.",
        question: "What passion dynamic is this?",
        options: [
          "Healthy creative drive",
          "The Envy cycle, brief contact with completeness, then back to focusing on what's missing",
          "Type 3 perfectionism about their work",
          "Type 1 inner critic about quality",
        ],
        correctIndex: 1,
        explanation:
          "This is the Four's core loop. They briefly touch what they're searching for (usually through creation or intense experience), but the passion of Envy pulls them back to 'not enough.' The search itself becomes the identity.",
      },
    },
    {
      id: "u6-l2-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Sam used to spend hours analyzing why they felt sad, often canceling plans to stay home and journal. After working on growth, Sam now notices the sadness, acknowledges it, and then goes to meet friends anyway. Sam tells a therapist: 'I used to think my sadness was who I am. Now I see it's just one color in the palette.'",
        question: "What growth is Sam demonstrating?",
        options: [
          "Sam is suppressing their emotions, this isn't healthy",
          "Sam is accessing Equanimity, emotional balance without losing depth",
          "Sam is becoming a Type 7, just avoiding pain",
          "Sam is no longer a Type 4",
        ],
        correctIndex: 1,
        explanation:
          "This is Equanimity in action. Sam hasn't lost their emotional depth, they've gained the ability to hold it without being consumed by it. The sadness is welcomed but no longer runs the show.",
      },
    },
    {
      id: "u6-l2-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Jordan has been spiraling for weeks. They've pushed away friends, convinced nobody truly understands them, and spend hours listening to the same sad songs on repeat. Jordan has started romanticizing their suffering, posting cryptic quotes about beautiful pain. The isolation feels both terrible and somehow right.",
        question: "What health level is Jordan at?",
        options: [
          "Healthy, they're processing emotions deeply",
          "Average, melancholy has become an identity and they're indulging it",
          "Unhealthy, complete emotional turbulence",
          "This is between average and unhealthy, the romanticizing of suffering is a warning sign",
        ],
        correctIndex: 3,
        explanation:
          "Jordan is sliding from average toward unhealthy. The romanticizing of pain ('beautiful pain') is a key marker, the Four has started using suffering as identity fuel. When isolation feels 'right,' the pattern has become self-reinforcing.",
      },
    },
    {
      id: "u6-l2-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Equanimity for a Four means:",
        options: [
          "Suppressing all emotions to be calm",
          "Emotional balance, appreciating what's present instead of longing for what's missing",
          "Becoming emotionally numb",
          "Always being happy",
        ],
        correctIndex: 1,
        explanation:
          "Equanimity isn't numbness or forced positivity, it's the genuine ability to be at peace with what is. For Fours, it means discovering that wholeness was always available in the present moment.",
      },
    },
    {
      id: "u6-l2-e13",
      difficulty: 3,
      content: {
        type: "free-recall",
        prompt: "In your own words, explain what Type 4s mean when they say they feel 'different' from others. What's the psychological reality beneath that?",
        keyTerms: ["identity", "envy", "missing", "longing", "defective", "ordinary", "authentic"],
        minWords: 15,
        modelAnswer: "When Fours say they feel different, they're describing something more profound than just having unusual tastes. At the core is a sense that something essential is missing in them. that others possess a fundamental wholeness or belonging that the Four lacks. This feeling of being defective or incomplete drives the Four to seek an authentic, intensely personal identity that compensates. The irony is that envy fuels this: Fours constantly notice what others have that they don't. The longing for what's absent becomes central to how they understand themselves, and ordinary contentment can feel like giving up on who they truly are.",
      } as FreeRecallContent,
    },
  ],
};

// ── Lesson 3: Wings, Stress Line & Growth Line ───────────────────────────

const lesson3: Lesson = {
  id: "u6-l3",
  scaffoldStep: 4 as const,
  unitId: "type-4",
  order: 3,
  title: "How Fours Shift",
  subtitle: "Wings, stress, and growth lines of Type 4",
  xpReward: 25,
  exercises: [
    {
      id: "u6-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Two Wings of Type 4",
        body: "A 4w3 (The Aristocrat) combines emotional depth with ambition, they want to be unique AND successful, and are more image-aware. A 4w5 (The Bohemian) combines emotional depth with intellectual withdrawal, they're more eccentric, reclusive, and unconventional.",
        highlight: "4w3 vs 4w5",
      },
    },
    {
      id: "u6-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Stress & Growth Lines",
        body: "Under stress, Fours move to Type 2, becoming clingy, people-pleasing, and over-involved in others' lives to escape their own pain. In growth, Fours move to Type 1, becoming principled, disciplined, and action-oriented instead of wallowing in feelings.",
        highlight: "Stress → 2, Growth → 1",
      },
    },
    {
      id: "u6-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What are the two wings of Type 4?",
        options: [
          "4w3 (The Aristocrat) and 4w5 (The Bohemian)",
          "4w2 (The Helper) and 4w6 (The Loyalist)",
          "4w3 (The Performer) and 4w5 (The Observer)",
          "4w5 (The Iconoclast) and 4w3 (The Star)",
        ],
        correctIndex: 0,
        explanation:
          "The 4w3 (Aristocrat) is more ambitious and image-aware, they want their uniqueness recognized. The 4w5 (Bohemian) is more withdrawn and cerebral, they create in solitude without needing an audience.",
      },
    },
    {
      id: "u6-l3-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Under stress, Type 4 moves to which type?",
        options: ["Type 1", "Type 2", "Type 5", "Type 7"],
        correctIndex: 1,
        explanation:
          "Stressed Fours suddenly become clingy and people-pleasing, like unhealthy Twos. They abandon their independence and latch onto others, hoping connection will fill the emptiness they feel.",
      },
    },
    {
      id: "u6-l3-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "In growth, Type 4 moves toward which type?",
        options: ["Type 1", "Type 2", "Type 7", "Type 8"],
        correctIndex: 0,
        explanation:
          "Growing Fours access healthy One energy, they become disciplined, principled, and action-oriented. Instead of endlessly processing emotions, they channel their depth into constructive creation and commitment.",
      },
    },
    {
      id: "u6-l3-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each wing or line to its description.",
        pairs: [
          { left: "4w3 (The Aristocrat)", right: "Ambitious and image-aware" },
          { left: "4w5 (The Bohemian)", right: "Withdrawn and intellectual" },
          { left: "Stress → Type 2", right: "Clingy and people-pleasing" },
          { left: "Growth → Type 1", right: "Disciplined and action-oriented" },
        ],
      },
    },
    {
      id: "u6-l3-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "A 4w5 is called The ___ because they combine emotional depth with intellectual eccentricity.",
        options: ["Aristocrat", "Bohemian", "Romantic", "Artist"],
        correctIndex: 1,
        explanation:
          "The 4w5 (Bohemian) lives in a rich inner world of feelings and ideas. They're the avant-garde artists, the unconventional thinkers, more comfortable in their own strange universe than in the mainstream.",
      },
    },
    {
      id: "u6-l3-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "The Four's growth move to Type 1 helps them channel emotions into ___ action.",
        options: ["scattered", "aggressive", "disciplined", "passive"],
        correctIndex: 2,
        explanation:
          "One energy gives Fours what they most need: structure, discipline, and the ability to act rather than just feel. The emotional depth stays, but now it has a container and a purpose.",
      },
    },
    {
      id: "u6-l3-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "After a painful breakup, Quinn, usually fiercely independent, suddenly starts texting friends constantly, showing up uninvited, bringing gifts, and saying things like 'You're the only person who really gets me. Please don't leave me too.' This is very unlike Quinn's usual behavior.",
        question: "What's happening?",
        options: [
          "Quinn discovered they're actually a Type 2",
          "Quinn is moving to their stress point (Type 2), becoming clingy and over-attaching",
          "Quinn is growing into healthy One energy",
          "This is Quinn's 4w3 wing emerging",
        ],
        correctIndex: 1,
        explanation:
          "Under intense stress, Fours abandon their signature independence and become Two-like, desperate for connection, clingy, and seeking reassurance through over-giving. The fear of abandonment overrides the need for authenticity.",
      },
    },
    {
      id: "u6-l3-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Reese, a talented songwriter who used to spend days lost in emotional process, has started waking up at 6am to write for two hours before work. They set a goal of finishing one song per week and stick to it. Reese says: 'I used to wait for inspiration. Now I show up and work, and the depth is still there, but it actually becomes something.'",
        question: "What growth line is Reese accessing?",
        options: [
          "Stress move to Type 2",
          "Growth to Type 1, channeling depth into disciplined practice",
          "Wing shift to 4w3, becoming more ambitious",
          "This means Reese is losing their Four identity",
        ],
        correctIndex: 1,
        explanation:
          "This is the Four-to-One growth move at its best. Reese hasn't lost their emotional depth, they've added structure and discipline. The feelings now serve the work instead of the work serving the feelings.",
      },
    },
    {
      id: "u6-l3-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Two Fours are both creative artists. One showcases work at galleries, has a strong social media presence, and cares deeply about building a unique personal brand. The other creates intensely personal work in a home studio, rarely shows anyone, and reads philosophy books between painting sessions.",
        question: "How do their wings differ?",
        options: [
          "First is 4w3 (Aristocrat, ambitious, image-aware), second is 4w5 (Bohemian, withdrawn, intellectual)",
          "First is 4w5, second is 4w3",
          "Both are 4w3, all artists want recognition",
          "Wings don't affect creative expression",
        ],
        correctIndex: 0,
        explanation:
          "The 4w3 wants their uniqueness recognized by the world, they combine Four depth with Three ambition. The 4w5 creates primarily for themselves, they combine Four depth with Five intellectual withdrawal.",
      },
    },
    {
      id: "u6-l3-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "The Four's growth toward Type 1 primarily helps with:",
        options: [
          "Becoming more social and outgoing",
          "Adding discipline and action to their emotional depth",
          "Suppressing their feelings",
          "Becoming more competitive",
        ],
        correctIndex: 1,
        explanation:
          "One energy doesn't flatten the Four's depth, it gives it structure. Growing Fours learn that showing up consistently and taking principled action can express their inner world more powerfully than emotional processing alone.",
      },
    },
  ],
};

// ── Lesson 4: Spotting This Type + Common Mistypes ────────────────────────

const lesson4: Lesson = {
  id: "u6-l4",
  scaffoldStep: 1 as const,
  unitId: "type-4",
  order: 4,
  title: "Spotting the Four",
  subtitle: "Real-world recognition and common mistypes",
  xpReward: 30,
  exercises: [
    {
      id: "u6-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "How to Spot a Type 4",
        body: "Fours often have a distinctive personal style, they express their identity through clothing, aesthetic choices, and creative expression. They're drawn to deep conversations, dislike small talk, and have an emotional intensity that can fill a room.",
        highlight: "distinctive personal style",
      },
    },
    {
      id: "u6-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Common Mistypes",
        body: "Type 4 is often confused with Type 5 (both withdrawn and introspective) and Type 9 (both withdrawn and dreamy). Key difference: Fours seek emotional depth; Fives seek intellectual depth; Nines seek inner peace. Fours amplify feelings; Nines dampen them.",
        highlight: "amplify vs. dampen",
      },
    },
    {
      id: "u6-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which behavior is most characteristic of Type 4?",
        options: [
          "Keeping conversations light and upbeat",
          "Wearing a distinctive personal style that expresses their inner world",
          "Following trends to fit in with their social group",
          "Avoiding emotional topics in conversation",
        ],
        correctIndex: 1,
        explanation:
          "Fours use external aesthetics to express internal identity. Their clothing, living space, and creative choices are deeply personal statements, never just about looking good, always about being authentic.",
      },
    },
    {
      id: "u6-l4-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Type 4 is most commonly confused with which type?",
        options: ["Type 3", "Type 5", "Type 7", "Type 8"],
        correctIndex: 1,
        explanation:
          "Both Fours and Fives are withdrawn, introspective, and live rich inner lives. But Fours dive into emotions (wanting to feel deeply), while Fives dive into ideas (wanting to understand deeply).",
      },
    },
    {
      id: "u6-l4-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What's the key difference between Type 4 and Type 9?",
        options: [
          "Fours are lazy, Nines are emotional",
          "Fours amplify emotions to feel alive; Nines dampen emotions to stay comfortable",
          "There's no meaningful difference",
          "Fours are extroverted, Nines are introverted",
        ],
        correctIndex: 1,
        explanation:
          "This is the crucial distinction. Fours turn up the emotional volume, they want to feel everything intensely. Nines turn it down, they want to smooth everything out. Both are withdrawn, but for opposite reasons.",
      },
    },
    {
      id: "u6-l4-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each type to how they relate to their inner world.",
        pairs: [
          { left: "Type 4", right: "Dives into emotional depth" },
          { left: "Type 5", right: "Dives into intellectual understanding" },
          { left: "Type 9", right: "Smooths over inner experience" },
          { left: "Type 2", right: "Focuses outward on others' emotions" },
        ],
      },
    },
    {
      id: "u6-l4-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Fours ___ their emotions, while Nines ___ their emotions.",
        options: [
          "amplify / dampen",
          "hide / express",
          "analyze / ignore",
          "project / absorb",
        ],
        correctIndex: 0,
        explanation:
          "This single distinction is the fastest way to tell a Four from a Nine. Fours crank up the intensity dial; Nines turn it down. Fours feel too much; Nines feel too little. Opposite strategies for dealing with the same inner pain.",
      },
    },
    {
      id: "u6-l4-e8",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort these behaviors: Type 4 or Type 5?",
        categories: ["More likely Type 4", "More likely Type 5"],
        items: [
          {
            text: "Cries during a meaningful movie scene",
            categoryIndex: 0,
          },
          {
            text: "Analyzes why the movie scene was constructed to elicit emotion",
            categoryIndex: 1,
          },
          {
            text: "Decorates their space to reflect their emotional state",
            categoryIndex: 0,
          },
          {
            text: "Keeps their space minimal to reduce distraction",
            categoryIndex: 1,
          },
          {
            text: "Writes poetry to process a breakup",
            categoryIndex: 0,
          },
          {
            text: "Reads psychology books to understand why breakups are painful",
            categoryIndex: 1,
          },
        ],
      },
    },
    {
      id: "u6-l4-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Two friends are both quiet and introspective. Person A often disappears for days, then returns with an intense poem about how nobody understands them. Person B disappears for days, then returns having read three books on quantum physics. Both say they 'needed space.'",
        question: "Which is more likely a Four, and which a Five?",
        options: [
          "A is Type 4 (retreats into emotions), B is Type 5 (retreats into knowledge)",
          "A is Type 5, B is Type 4",
          "Both are Type 4, they both need alone time",
          "Both are Type 5, they both withdraw",
        ],
        correctIndex: 0,
        explanation:
          "Same behavior (withdrawal), totally different inner process. The Four retreated to feel; the Five retreated to think. The output tells the story: emotional expression vs. intellectual accumulation.",
      },
    },
    {
      id: "u6-l4-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Someone says: 'I just feel like nobody really sees me. I'm tired of pretending to be okay when everything inside me feels so intense and complicated. I wish people could handle the real me.'",
        question: "Is this more likely a Four or a Nine?",
        options: [
          "Type 9, they feel unseen too",
          "Type 4, the desire to be seen in their full emotional complexity, plus frustration at having to tone it down",
          "Could be either, both feel misunderstood",
          "This is a Type 2 pattern",
        ],
        correctIndex: 1,
        explanation:
          "The key phrase is 'everything inside me feels so intense and complicated.' A Nine would more likely say 'I don't even know what I feel.' The Four knows exactly how complex their inner world is, they just can't find anyone who can hold it.",
      },
    },
    {
      id: "u6-l4-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "You're trying to determine if someone is a Type 4 or a Type 9. Both seem dreamy and somewhat withdrawn. You ask: 'What really makes you angry?' The person pauses and says: 'When people are inauthentic. When they pretend everything is fine when it's not. Surface-level existence makes me want to scream.'",
        question: "What does this response suggest?",
        options: [
          "Type 9, they're angry about conflict",
          "Type 4, anger about inauthenticity and superficiality is a strong Four signal",
          "Could be either type",
          "This is actually a Type 1 response",
        ],
        correctIndex: 1,
        explanation:
          "Fours have a visceral reaction to inauthenticity and superficiality. A Nine, when asked what makes them angry, would more likely struggle to answer at all, or say something about people being mean to each other.",
      },
    },
    {
      id: "u6-l4-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "The fastest way to identify a Type 4 in conversation is:",
        options: [
          "They talk about their achievements",
          "They steer toward emotional depth and authenticity",
          "They ask about your plans and goals",
          "They keep things light and humorous",
        ],
        correctIndex: 1,
        explanation:
          "Fours naturally pull conversations toward depth, meaning, and emotional honesty. Small talk feels like a waste to them, they want to know how you really feel, what you really think, who you really are.",
      },
    },
    {
      id: "u6-l4-e13",
      difficulty: 3,
      content: {
        type: "interleaving",
        title: "Types 4, 2 & 9. Identify the motivation",
        typeNumbers: [4, 2, 9],
        items: [
          {
            statement: "Withdraws into melancholy after a social gathering, convinced that everyone else belongs somewhere they don't. drawn toward the feeling itself as proof of their uniqueness.",
            correctType: 4,
            explanation: "The Four romanticizes their separateness. Longing and feeling different become a source of identity.",
          },
          {
            statement: "Suppresses their frustration about a decision that affected them, redirecting energy into helping the person who made the decision feel better.",
            correctType: 2,
            explanation: "The Two turns away from their own needs and toward caretaking. keeping the relationship intact is the priority.",
          },
          {
            statement: "Lets go of their preferred outcome in a group decision because the conflict of asserting it feels worse than not getting what they wanted.",
            correctType: 9,
            explanation: "The Nine erases their own desire to maintain peace. The discomfort of conflict outweighs the loss.",
          },
        ],
      } as InterleavingExerciseContent,
    },
  ],
};

// ── Lesson 5: Near-Neighbor Discrimination. Type 4 vs Type 6 ─────────────

const lesson5: Lesson = {
  id: "u6-l5",
  scaffoldStep: 3 as const,
  unitId: "type-4",
  order: 5,
  title: "Type 4 vs Type 6",
  subtitle: "Telling apart two emotionally intense types",
  xpReward: 25,
  exercises: [
    {
      id: "u6-l5-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Why 4 and 6 Are Confused",
        body: "Types 4 and 6 both experience high emotional intensity and can present as anxious or troubled. The difference: Type 4's anxiety is existential. a feeling of being fundamentally deficient or different. Type 6's anxiety is threat-based. a scanning for what might go wrong externally.",
        highlight: "existential deficiency vs. external threat",
      },
    },
    {
      id: "u6-l5-e2",
      difficulty: 2,
      content: {
        type: "discrimination",
        typeA: 4,
        typeB: 6,
        prompt: "Each statement below belongs to either Type 4 (The Individualist) or Type 6 (The Loyalist). Tap the correct type for each.",
        items: [
          {
            text: "Feels that something fundamental is missing or wrong with them at the core. not that things will go badly, but that they themselves are inherently lacking.",
            answer: "A",
            explanation: "Type 4's wound is at the identity level. an existential ache about who they are, not a situational threat assessment.",
          },
          {
            text: "Runs worst-case scenarios in their mind before undertaking anything new. imagining obstacles feels like preparation, not pessimism.",
            answer: "B",
            explanation: "Type 6's anticipatory scanning is a safety strategy. Thinking through what could go wrong feels protective.",
          },
          {
            text: "Feels misunderstood even by close relationships. suspects that no one can fully grasp the depth or uniqueness of their inner experience.",
            answer: "A",
            explanation: "Type 4's sense of being uniquely different means connection always feels partial. No one quite gets it.",
          },
          {
            text: "Tests loyalty before extending full trust. creates ambiguous situations to see how someone responds before committing.",
            answer: "B",
            explanation: "Type 6's testing behavior is about detecting whether people are reliable. Loyalty and authority are the key questions.",
          },
        ],
      } as DiscriminationContent,
    },
    {
      id: "u6-l5-e3",
      difficulty: 3,
      content: {
        type: "multiple-choice",
        question: "Which inner experience is most characteristic of Type 4 (not Type 6)?",
        options: [
          "A persistent scan for what might go wrong in a situation",
          "Loyalty-testing to find out who can really be trusted",
          "A sense that something essential is fundamentally missing in oneself",
          "Anxiety about breaking rules or failing to meet expectations",
        ],
        correctIndex: 2,
        explanation: "Type 4's core experience is an existential ache. the sense that they are somehow missing what others naturally have. Type 6 experiences threat from outside, not deficiency from within.",
      },
    },
  ],
};

export const type4Lessons: Lesson[] = [lesson1, lesson2, lesson3, lesson4, lesson5];
