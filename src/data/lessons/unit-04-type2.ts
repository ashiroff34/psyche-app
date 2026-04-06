// ─────────────────────────────────────────────────────────────────────────────
// Unit 4 — Type 2: The Helper / The Giver
// 4 lessons × 12 exercises each
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson, SocraticPromptContent, InterleavingExerciseContent } from "@/types/lessons";

// ── Lesson 1: Core Motivation, Fear & Desire ──────────────────────────────

const lesson1: Lesson = {
  id: "u4-l1",
  scaffoldStep: 2 as const,
  unitId: "type-2",
  order: 1,
  title: "The Need to Be Needed",
  subtitle: "Core motivation, fear, and desire of Type 2",
  xpReward: 20,
  exercises: [
    {
      id: "u4-l1-e0",
      difficulty: 1,
      content: {
        type: "socratic-prompt",
        question: "Think of someone who always seems to know what others need before they ask. What do you think drives that? Is it pure generosity — or could there be something else underneath?",
        reflection: "Think about what it would actually feel like to live that way — always attuned to others. What would that person need in return?",
        revealLabel: "See the insight",
        conceptTitle: "The Hidden Equation",
        conceptBody: "For the Two, giving is not optional — it's how they stay safe. At the deepest level, Twos believe that being needed is the only reliable guarantee of being loved. What looks like selflessness is actually a sophisticated survival strategy: if I make myself indispensable, I cannot be abandoned.",
        highlight: "indispensable",
      } as SocraticPromptContent,
    },
    {
      id: "u4-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Meet the Helper",
        body: "Type 2s are driven by a deep need to be loved and needed. They orient their entire lives around relationships, often sensing what others need before being asked, and stepping in to provide it.",
        highlight: "loved and needed",
      },
    },
    {
      id: "u4-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Fear, Desire & Motivation",
        body: "The core fear of Type 2 is being unlovable or unwanted. Their core desire is to be loved unconditionally. The tragic irony: by constantly giving to earn love, they can push away the unconditional love they crave.",
        highlight: "unlovable",
      },
    },
    {
      id: "u4-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core fear of Type 2?",
        options: [
          "Being incompetent or incapable",
          "Being unlovable or unwanted",
          "Being trapped in pain",
          "Being controlled by others",
        ],
        correctIndex: 1,
        explanation:
          "Twos carry a deep, often unconscious belief that they are not inherently lovable, that they must earn love through giving, helping, and being indispensable.",
      },
    },
    {
      id: "u4-l1-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core desire of Type 2?",
        options: [
          "To be the most successful person in the room",
          "To understand how everything works",
          "To be loved unconditionally",
          "To maintain inner peace",
        ],
        correctIndex: 2,
        explanation:
          "Twos long for love that doesn't come with conditions, love they don't have to earn. The paradox is that their helping strategy is itself a condition they impose on relationships.",
      },
    },
    {
      id: "u4-l1-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "What makes Type 2's helping different from simple generosity?",
        options: [
          "It's always selfish and manipulative",
          "It often comes with an unconscious expectation of being loved in return",
          "It's purely altruistic with no strings attached",
          "It's motivated by a desire for power",
        ],
        correctIndex: 1,
        explanation:
          "Two's helping isn't fake, the care is genuine. But underneath it often runs an unconscious bargain: 'I give to you, so you'll love and need me.' Twos are frequently unaware of this dynamic.",
      },
    },
    {
      id: "u4-l1-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each Type 2 concept to its description.",
        pairs: [
          { left: "Core Fear", right: "Being unlovable or unwanted" },
          { left: "Core Desire", right: "To be loved unconditionally" },
          { left: "Hidden Pattern", right: "Giving to earn love in return" },
          { left: "Blind Spot", right: "Denial of their own needs" },
        ],
      },
    },
    {
      id: "u4-l1-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Type 2s are in the Heart/Feeling center, meaning their core emotion is ___.",
        options: ["anger", "fear", "shame", "envy"],
        correctIndex: 2,
        explanation:
          "Types 2, 3, and 4 form the Heart triad. Their core issue is shame, a feeling of not being enough as they are. Twos cope with shame by becoming indispensable to others.",
      },
    },
    {
      id: "u4-l1-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "A Type 2's biggest blind spot is often the denial of their own ___.",
        options: ["talents", "needs", "anger", "intelligence"],
        correctIndex: 1,
        explanation:
          "Twos are remarkably attuned to everyone else's needs, but can be almost completely blind to their own. Ask a Two what they need and you might get a blank stare.",
      },
    },
    {
      id: "u4-l1-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Jamie always remembers everyone's birthdays, brings soup when someone is sick, and stays late to help coworkers finish projects. But when Jamie got sick, nobody checked in, and Jamie was devastated, thinking, 'After everything I do for everyone, nobody cares about me.'",
        question: "What Type 2 dynamic is playing out here?",
        options: [
          "Jamie is simply a generous person having a bad day",
          "The unconscious bargain: 'I give, so I expect to receive'",
          "Jamie is actually a Type 6 seeking security",
          "Jamie is manipulating people for attention",
        ],
        correctIndex: 1,
        explanation:
          "This is the Two's painful trap. The giving is real, but so is the unspoken expectation. When the love doesn't flow back equally, the Two feels betrayed, revealing the hidden contract they didn't know they'd written.",
      },
    },
    {
      id: "u4-l1-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Riley is at a party and notices someone standing alone looking uncomfortable. Without thinking, Riley walks over, introduces themselves, gets the person a drink, and spends the next hour making them feel included, completely forgetting they came to the party to relax and have fun.",
        question: "What core Two pattern does this illustrate?",
        options: [
          "Social anxiety masked as helpfulness",
          "Automatic orientation toward others' needs while neglecting their own",
          "Healthy extroversion and social skills",
          "People-pleasing driven by a desire for status",
        ],
        correctIndex: 1,
        explanation:
          "Twos have an almost radar-like ability to sense who needs help. It's genuinely caring, but notice how Riley's own needs (relaxation, fun) vanished the moment someone else had a need. That's the pattern.",
      },
    },
    {
      id: "u4-l1-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "When asked 'What do you want for dinner?', Kim always says 'Whatever you want!' When pressed, Kim genuinely seems unable to identify a preference. But later that night, Kim feels vaguely frustrated without knowing why.",
        question: "What's happening beneath the surface for this Type 2?",
        options: [
          "Kim is easygoing and doesn't care about food",
          "Kim has suppressed their own desires so deeply they can't access them",
          "Kim is being passive-aggressive",
          "Kim is a Type 9, not a Type 2",
        ],
        correctIndex: 1,
        explanation:
          "This is one of the Two's most poignant struggles. They've spent so long tuning into what others want that they've lost the signal of their own desires. The frustration is the unmet need they can't name.",
      },
    },
    {
      id: "u4-l1-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Type 2 belongs to which center of intelligence?",
        options: [
          "Body/Gut Center (instinct)",
          "Head Center (thinking)",
          "Heart/Feeling Center (image/shame)",
          "None, they use all equally",
        ],
        correctIndex: 2,
        explanation:
          "Type 2 is in the Heart triad (2, 3, 4), where the core issue is identity and shame. Twos build their identity around being the loving, giving person, the one everyone needs.",
      },
    },
  ],
};

// ── Lesson 2: Passion & Virtue + Health Levels ────────────────────────────

const lesson2: Lesson = {
  id: "u4-l2",
  scaffoldStep: 2 as const,
  unitId: "type-2",
  order: 2,
  title: "Pride to Humility",
  subtitle: "The passion, virtue, and health levels of Type 2",
  xpReward: 25,
  exercises: [
    {
      id: "u4-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Passion: Pride",
        body: "In Naranjo's framework, the Two's passion is Pride, not arrogance, but an inflated sense of being needed and a denial of their own needs. It's the belief 'I don't have needs, I'm the one who meets needs.'",
        highlight: "Pride",
      },
    },
    {
      id: "u4-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Virtue: Humility",
        body: "The antidote to Pride is Humility, honestly acknowledging both your own needs and the limits of your helping. Healthy Twos can say 'I need help too' without it feeling like a failure.",
        highlight: "Humility",
      },
    },
    {
      id: "u4-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core passion of Type 2 according to Naranjo?",
        options: ["Anger", "Pride", "Vanity", "Envy"],
        correctIndex: 1,
        explanation:
          "Pride in this context means an inflated self-image as the helper/giver, combined with a denial that you yourself have needs. It's not bragging, it's a blind spot about your own neediness.",
      },
    },
    {
      id: "u4-l2-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What virtue does a healthy Type 2 embody?",
        options: ["Serenity", "Non-Attachment", "Humility", "Truthfulness"],
        correctIndex: 2,
        explanation:
          "Humility allows Twos to honestly see themselves, including their own needs, limitations, and the hidden strings attached to their giving.",
      },
    },
    {
      id: "u4-l2-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "The Two's 'Pride' is best understood as:",
        options: [
          "Thinking they're better than everyone",
          "An inflated sense of being needed plus denial of own needs",
          "Taking credit for others' work",
          "Refusing to apologize",
        ],
        correctIndex: 1,
        explanation:
          "Naranjo's Pride isn't vanity, it's the belief that you're the one everyone depends on and that you don't have needs of your own. It's a self-deception about the giving dynamic.",
      },
    },
    {
      id: "u4-l2-e6",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction:
          "Sort these Type 2 traits into the correct health level.",
        categories: ["Healthy", "Average", "Unhealthy"],
        items: [
          { text: "Unconditionally loving and altruistic", categoryIndex: 0 },
          { text: "People-pleasing and possessive", categoryIndex: 1 },
          { text: "Manipulative and entitled", categoryIndex: 2 },
          { text: "Joyful and genuinely nurturing", categoryIndex: 0 },
          { text: "Intrusive and hovering", categoryIndex: 1 },
          { text: "Coercive and self-deceptive", categoryIndex: 2 },
        ],
      },
    },
    {
      id: "u4-l2-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "The Two's passion of Pride manifests as an inflated sense of being ___ by others.",
        options: ["admired", "feared", "needed", "understood"],
        correctIndex: 2,
        explanation:
          "The Two's Pride centers on being needed, 'What would they do without me?' This inflation of their role as helper is the core distortion that keeps them stuck.",
      },
    },
    {
      id: "u4-l2-e8",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction:
          "Match each health level to how Type 2 shows up in relationships.",
        pairs: [
          {
            left: "Healthy",
            right: "Gives freely without expecting return",
          },
          {
            left: "Average",
            right: "Gives with hidden strings attached",
          },
          {
            left: "Unhealthy",
            right: "Manipulates through guilt and obligation",
          },
          {
            left: "Virtue (Humility)",
            right: "Acknowledges own needs honestly",
          },
        ],
      },
    },
    {
      id: "u4-l2-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Avery volunteers at a homeless shelter every week. When asked why, Avery says: 'I just love helping people. I honestly don't need anything in return.' But Avery gets visibly upset when the shelter newsletter doesn't mention their contributions.",
        question: "What does this reveal about the Two's Pride?",
        options: [
          "Avery is just a narcissist pretending to care",
          "Avery's helping is genuine, but the Pride creates a blind spot about wanting recognition",
          "Avery is a healthy Two practicing Humility",
          "This is a Type 3 pattern, not Type 2",
        ],
        correctIndex: 1,
        explanation:
          "The Two's Pride isn't fake caring, it's real caring with an unconscious attachment to being recognized as the caring one. Avery genuinely wants to help AND wants to be seen as the helper. The blind spot is not seeing the second part.",
      },
    },
    {
      id: "u4-l2-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Pat has been in therapy and recently told a friend: 'I realized I've been exhausting myself taking care of everyone because I was terrified that if I stopped, no one would love me. I'm learning to ask for help and set boundaries, and it's the scariest thing I've ever done.'",
        question: "Where is Pat on the Type 2 health spectrum?",
        options: [
          "Unhealthy, Pat is being selfish by setting boundaries",
          "Average, Pat is just complaining",
          "Moving toward health, accessing Humility and acknowledging their own needs",
          "Pat is no longer a Type 2",
        ],
        correctIndex: 2,
        explanation:
          "This is beautiful Two growth. Pat is accessing the virtue of Humility, seeing the Pride pattern, acknowledging their own needs, and taking the terrifying step of not earning love through giving.",
      },
    },
    {
      id: "u4-l2-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Dana's adult child wants to make their own decisions about career and relationships. Dana responds by saying 'After everything I've sacrificed for you, this is how you repay me?' and uses guilt to maintain control, insisting they know what's best.",
        question: "What health level is Dana operating from?",
        options: [
          "Healthy, Dana is just being a caring parent",
          "Average, Dana is being a bit overbearing",
          "Unhealthy, using guilt, manipulation, and entitlement",
          "This is a Type 8 pattern, not Type 2",
        ],
        correctIndex: 2,
        explanation:
          "This is an unhealthy Two: the giving has become a tool of control, and the Pride has hardened into entitlement. 'I gave to you, so you owe me.' The genuine love is buried under manipulation.",
      },
    },
    {
      id: "u4-l2-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "The opposite of the Two's passion (Pride) is their virtue. What is it?",
        options: ["Courage", "Humility", "Serenity", "Truthfulness"],
        correctIndex: 1,
        explanation:
          "Humility is the virtue that frees the Two. It means honestly seeing yourself, including your needs, your motivations for helping, and the fact that you deserve love without earning it.",
      },
    },
  ],
};

// ── Lesson 3: Wings, Stress Line & Growth Line ───────────────────────────

const lesson3: Lesson = {
  id: "u4-l3",
  scaffoldStep: 4 as const,
  unitId: "type-2",
  order: 3,
  title: "How Twos Shift",
  subtitle: "Wings, stress, and growth lines of Type 2",
  xpReward: 25,
  exercises: [
    {
      id: "u4-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Two Wings of Type 2",
        body: "A 2w1 (The Servant) combines helping with principled standards, they're more critical, duty-bound, and quietly service-oriented. A 2w3 (The Host/Hostess) combines helping with charm, they're more outgoing, image-conscious, and socially polished.",
        highlight: "2w1 vs 2w3",
      },
    },
    {
      id: "u4-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Stress & Growth Lines",
        body: "Under stress, Twos move to Type 8, becoming aggressive, domineering, and demanding that their sacrifices be acknowledged. In growth, Twos move to Type 4, getting in touch with their authentic emotions and learning to express their own inner world.",
        highlight: "Stress → 8, Growth → 4",
      },
    },
    {
      id: "u4-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What are the two wings of Type 2?",
        options: [
          "2w1 (The Servant) and 2w3 (The Host)",
          "2w3 (The Charmer) and 2w4 (The Romantic)",
          "2w9 (The Peacemaker) and 2w1 (The Servant)",
          "2w1 (The Reformer) and 2w3 (The Achiever)",
        ],
        correctIndex: 0,
        explanation:
          "Type 2's wings are 1 and 3. The 2w1 (Servant) is more principled and self-critical; the 2w3 (Host) is more charming and socially adept.",
      },
    },
    {
      id: "u4-l3-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Under stress, Type 2 moves to which type?",
        options: ["Type 4", "Type 6", "Type 8", "Type 9"],
        correctIndex: 2,
        explanation:
          "When stressed, the usually soft and giving Two suddenly becomes aggressive and confrontational like an unhealthy Eight, demanding recognition and blowing up at perceived ingratitude.",
      },
    },
    {
      id: "u4-l3-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "In growth, Type 2 moves toward which type?",
        options: ["Type 1", "Type 4", "Type 7", "Type 8"],
        correctIndex: 1,
        explanation:
          "Growing Twos access healthy Four energy, they turn inward, get honest about their feelings, and develop authentic self-expression rather than defining themselves through others.",
      },
    },
    {
      id: "u4-l3-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each wing or line to its description.",
        pairs: [
          { left: "2w1 (The Servant)", right: "More principled and duty-bound" },
          { left: "2w3 (The Host)", right: "More charming and image-conscious" },
          { left: "Stress → Type 8", right: "Aggressive and domineering" },
          { left: "Growth → Type 4", right: "Authentic emotional expression" },
        ],
      },
    },
    {
      id: "u4-l3-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "A 2w3 is called The ___ because they combine warmth with social charm.",
        options: ["Servant", "Host", "Advocate", "Helper"],
        correctIndex: 1,
        explanation:
          "The 2w3 (Host/Hostess) brings together the Two's desire to care for people with the Three's social polish. They're often the life of the party who makes sure everyone is comfortable.",
      },
    },
    {
      id: "u4-l3-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Under stress, a Type 2 moves to Type 8 and becomes ___ and demanding.",
        options: ["withdrawn", "anxious", "aggressive", "scattered"],
        correctIndex: 2,
        explanation:
          "The sweet, accommodating Two under enough stress can become shockingly forceful, 'After everything I've done for you!' The suppressed anger finally erupts with Eight-like intensity.",
      },
    },
    {
      id: "u4-l3-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Casey has been the 'office mom' for years, bringing treats, covering shifts, remembering birthdays. After being passed over for a promotion, Casey storms into the manager's office and says 'I do more for this team than anyone, and this is the thanks I get? You'd all fall apart without me!'",
        question: "What Enneagram dynamic explains Casey's outburst?",
        options: [
          "Casey is actually a Type 8",
          "Casey is moving to their stress point (Type 8)",
          "Casey is growing into healthy Type 4",
          "Casey's 2w3 wing is showing",
        ],
        correctIndex: 1,
        explanation:
          "Classic Two-to-Eight stress move. The accumulated resentment from giving without receiving finally erupts in aggressive, forceful confrontation. The usually gentle Two becomes surprisingly intimidating.",
      },
    },
    {
      id: "u4-l3-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Morgan used to define themselves entirely through their relationships. Recently, they've started journaling, taking art classes alone, and exploring what they actually feel, not what others need them to feel. They told a friend: 'I'm finally getting to know who I am when I'm not taking care of someone.'",
        question: "What's happening in Morgan's growth?",
        options: [
          "Morgan is becoming self-absorbed and selfish",
          "Morgan is accessing their growth line (Type 4), developing authentic self-awareness",
          "Morgan is moving to their stress point",
          "Morgan is losing their Type 2 identity",
        ],
        correctIndex: 1,
        explanation:
          "This is healthy Two growth into Four territory. Morgan is developing their own inner world, authentic feelings, and identity separate from being the helper. This isn't selfish, it's essential.",
      },
    },
    {
      id: "u4-l3-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Two friends are both Type 2. One organizes charity events with military precision, keeps detailed volunteer schedules, and gets frustrated when people don't follow through on commitments. The other hosts lavish dinner parties, remembers everyone's favorite wine, and charms donors into writing bigger checks.",
        question: "How do their wings differ?",
        options: [
          "First is 2w1 (Servant, principled and organized), second is 2w3 (Host, charming and socially skilled)",
          "First is 2w3, second is 2w1",
          "Both are 2w1",
          "Wings don't create these differences",
        ],
        correctIndex: 0,
        explanation:
          "The 2w1 brings the One's organization and moral seriousness to their helping. The 2w3 brings the Three's social charm and image-awareness. Same core desire to be loved, very different styles.",
      },
    },
    {
      id: "u4-l3-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "When a Type 2 'goes to 8' under stress, what's the most surprising change?",
        options: [
          "They become withdrawn and quiet",
          "They become aggressive and demanding",
          "They become analytical and detached",
          "They become anxious and worried",
        ],
        correctIndex: 1,
        explanation:
          "It can be shocking to see a usually sweet, accommodating Two suddenly become forceful and confrontational. That's the Eight energy, and it usually means the Two has been overgiving for way too long.",
      },
    },
  ],
};

// ── Lesson 4: Spotting This Type + Common Mistypes ────────────────────────

const lesson4: Lesson = {
  id: "u4-l4",
  scaffoldStep: 1 as const,
  unitId: "type-2",
  order: 4,
  title: "Spotting the Two",
  subtitle: "Real-world recognition and common mistypes",
  xpReward: 30,
  exercises: [
    {
      id: "u4-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "How to Spot a Type 2",
        body: "Twos are warm, approachable, and often physically affectionate. They remember personal details, ask how you're doing (and really mean it), and tend to move toward people in need. Watch for the person who's always the first to offer help.",
        highlight: "first to offer help",
      },
    },
    {
      id: "u4-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Common Mistypes",
        body: "Type 2 is often confused with Type 9 (both are accommodating and warm) and Type 6 (both are loyal and devoted). Key difference: Twos actively give to be needed; Nines passively merge to avoid conflict; Sixes commit out of loyalty for security.",
        highlight: "actively give to be needed",
      },
    },
    {
      id: "u4-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which behavior is most characteristic of Type 2?",
        options: [
          "Researching a topic exhaustively before forming an opinion",
          "Remembering personal details and offering help before being asked",
          "Setting ambitious career goals and tracking progress",
          "Seeking exciting new experiences and adventures",
        ],
        correctIndex: 1,
        explanation:
          "Twos have an almost supernatural ability to remember that your dog's name is Biscuit, your mom had surgery last week, and you like your coffee with oat milk. It's genuine caring, and it's how they stay connected.",
      },
    },
    {
      id: "u4-l4-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Type 2 is most commonly confused with which type?",
        options: ["Type 1", "Type 5", "Type 9", "Type 7"],
        correctIndex: 2,
        explanation:
          "Both Twos and Nines are warm, accommodating, and don't like conflict. But Twos move toward people (active giving), while Nines merge with others' agendas (passive accommodation).",
      },
    },
    {
      id: "u4-l4-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "What's the key difference between Type 2 and Type 6 loyalty?",
        options: [
          "Twos are loyal, Sixes are not",
          "Twos give to be loved; Sixes commit for security and belonging",
          "Sixes are more emotional than Twos",
          "There's no difference, they're the same pattern",
        ],
        correctIndex: 1,
        explanation:
          "Both are deeply loyal, but the engine is different. The Two's loyalty says 'I'll take care of you so you'll love me.' The Six's loyalty says 'I'll be devoted to you so I'll be safe and supported.'",
      },
    },
    {
      id: "u4-l4-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each type to their style of accommodation.",
        pairs: [
          { left: "Type 2", right: "Actively gives to be needed and loved" },
          { left: "Type 9", right: "Passively merges to avoid conflict" },
          { left: "Type 6", right: "Commits loyally for security" },
          { left: "Type 3", right: "Adapts image to be admired" },
        ],
      },
    },
    {
      id: "u4-l4-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence:
          "Twos move ___ people to help, while Nines ___ with people to keep peace.",
        options: [
          "toward / merge",
          "away from / connect",
          "toward / compete",
          "against / merge",
        ],
        correctIndex: 0,
        explanation:
          "Direction of energy is key. Twos actively approach others with help and care. Nines dissolve their own preferences and blend into whatever the group wants. Both look accommodating, but the mechanism is completely different.",
      },
    },
    {
      id: "u4-l4-e8",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort these behaviors: Type 2 or Type 9?",
        categories: ["More likely Type 2", "More likely Type 9"],
        items: [
          {
            text: "Brings you soup when you're sick without being asked",
            categoryIndex: 0,
          },
          {
            text: "Says 'I'm fine with whatever you want' about dinner",
            categoryIndex: 1,
          },
          {
            text: "Gets upset when their help isn't acknowledged",
            categoryIndex: 0,
          },
          {
            text: "Falls asleep on the couch to avoid a difficult conversation",
            categoryIndex: 1,
          },
          {
            text: "Knows everyone's food allergies and dietary preferences",
            categoryIndex: 0,
          },
          {
            text: "Goes along with plans they don't enjoy to avoid rocking the boat",
            categoryIndex: 1,
          },
        ],
      },
    },
    {
      id: "u4-l4-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Two people are both supportive friends. Person A actively organizes care, meal trains, hospital visits, emotional check-ins. When the crisis passes, Person A feels hurt if you don't explicitly thank them. Person B quietly goes along with whatever the group decides, smooths over disagreements, and doesn't seem to have strong preferences.",
        question: "Which is more likely a Two, and which a Nine?",
        options: [
          "A is Type 2 (active helping + need for recognition), B is Type 9 (passive merging)",
          "A is Type 9, B is Type 2",
          "Both are Type 2, same pattern, different intensity",
          "Both are Type 9, same pattern, different expression",
        ],
        correctIndex: 0,
        explanation:
          "Person A shows the Two's active, organized caring plus the telltale need for acknowledgment. Person B shows the Nine's gentle merging without strong personal preferences. Energy and direction differ completely.",
      },
    },
    {
      id: "u4-l4-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "Your coworker always volunteers for extra tasks, stays late to help the team, and seems to genuinely enjoy being the go-to person. You're not sure if they're a Type 2 or a Type 6.",
        question:
          "What question would best help you distinguish between the two types?",
        options: [
          "'Do you like your job?'",
          "'When you help, is it because you want to be loved or because you want to feel secure?'",
          "'Are you an introvert or extrovert?'",
          "'Do you prefer working alone or in teams?'",
        ],
        correctIndex: 1,
        explanation:
          "The core motivation separates them. A Two helps to feel loved and needed, it's personal and relational. A Six helps to maintain group cohesion and security, it's about loyalty and not letting the team down.",
      },
    },
    {
      id: "u4-l4-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario:
          "At a fundraiser, someone effusively thanks every donor, makes personal connections, and seems to glow with warmth. Your friend says 'That's such a Two.' But you're not sure, the person also seems very polished, tracks how much each person gave, and is visibly excited when the total surpasses their personal goal.",
        question: "Could this person be a type other than 2?",
        options: [
          "No, this is clearly a Type 2",
          "Yes, the goal-tracking and polish suggest a Type 3 who's learned to be charming",
          "Yes, this could be a 2w3 or a 3w2, which look very similar from the outside",
          "This is obviously a Type 7 seeking stimulation",
        ],
        correctIndex: 2,
        explanation:
          "The 2w3 and 3w2 can look nearly identical from the outside. Both are warm, charming, and socially skilled. Ask about motivation: Is the giving about being loved (2w3) or about achieving a successful event (3w2)?",
      },
    },
    {
      id: "u4-l4-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question:
          "The most reliable way to distinguish Type 2 from similar types is to look at:",
        options: [
          "Their behavior",
          "Their underlying motivation",
          "Their career choice",
          "Their hobbies",
        ],
        correctIndex: 1,
        explanation:
          "This is true for the whole Enneagram, but especially for Type 2. Many types can be warm and helpful, what matters is WHY. Twos help to be loved. That's the signature.",
      },
    },
    {
      id: "u4-l4-e13",
      difficulty: 3,
      content: {
        type: "interleaving",
        title: "Types 2, 3 & 9 — Identify the motivation",
        typeNumbers: [2, 3, 9],
        items: [
          {
            statement: "Anticipates what their friend needs before being asked, then quietly provides it — driven by the felt need to be seen as indispensable.",
            correctType: 2,
            explanation: "The Two gives to secure their place in the relationship. Being needed feels like being safe from abandonment.",
          },
          {
            statement: "Goes along with the group's plan even though it's not what they wanted — keeping the peace feels more important than asserting themselves.",
            correctType: 9,
            explanation: "The Nine merges with others' agendas to avoid conflict and maintain harmony, not to earn love.",
          },
          {
            statement: "Takes on extra responsibility at work not to be helpful, but because succeeding at a visible project will earn them recognition.",
            correctType: 3,
            explanation: "The Three performs and achieves to be seen as successful, not to make others feel cared for.",
          },
        ],
      } as InterleavingExerciseContent,
    },
  ],
};

export const type2Lessons: Lesson[] = [lesson1, lesson2, lesson3, lesson4];
