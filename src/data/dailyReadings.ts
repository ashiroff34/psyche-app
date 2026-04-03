// ─── Daily Readings ───────────────────────────────────────────────────────────
//
// Rotating reading pool. Each reading is ~2–3 min at normal pace.
// Organized into stages:
//   stage 1 (days 1–7):  Your own type deep-dives
//   stage 2 (days 8–14): Wings and instinct variants
//   stage 3 (days 15+):  Cross-type, cognitive stack, growth
//
// Each entry has a `typeFilter` array: which Enneagram types it's shown to.
// Empty typeFilter = shown to all types.
// ─────────────────────────────────────────────────────────────────────────────

export interface Reading {
  id: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  stage: 1 | 2 | 3;
  typeFilter: number[]; // empty = all types
  paragraphs: { bold?: string; text: string }[];
  reflection: string;
  tokenReward: number;
  xpReward: number;
}

export const dailyReadings: Reading[] = [
  // ── Stage 1: Core type deep-dives ─────────────────────────────────────────

  {
    id: "type1-core",
    title: "The Reformer's Inner World",
    subtitle: "Understanding Type 1 from the inside",
    estimatedMinutes: 3,
    stage: 1,
    typeFilter: [1],
    paragraphs: [
      {
        bold: "The constant inner critic.",
        text: " Ones don't choose to be perfectionistic, it's not discipline, it's anxiety. Inside every Type 1 runs a voice that constantly evaluates: this could be better, that wasn't right, you should have done it differently. This voice isn't cruel by design, it genuinely believes that if everything were correct and good, the world would be safe.",
      },
      {
        bold: "Resentment as unspoken anger.",
        text: " Ones typically believe that anger is wrong, so they suppress it. But suppressed anger doesn't disappear; it becomes resentment. Ones often carry a simmering frustration that others don't try as hard, don't care as much, or don't hold themselves to the same standards. This can leak out as criticism, sighing, or withdrawal.",
      },
      {
        bold: "The gap between real and ideal.",
        text: " Ones live in constant tension between how things ARE and how they SHOULD be. This gap is the source of both their drive and their suffering. When they manage to close that gap, when something is truly done right, it brings a rare, deep satisfaction. But the gap always reopens.",
      },
      {
        bold: "Growth means learning to rest.",
        text: " For Ones, growth isn't about becoming MORE disciplined, it's about learning that imperfection is safe. Healthy Ones discover that the present moment, exactly as it is, is enough. They integrate toward Type 7: playful, spontaneous, and able to enjoy life without needing it to be perfect first.",
      },
    ],
    reflection: "When did your inner critic last speak loudest? What was it actually afraid of?",
    tokenReward: 25,
    xpReward: 15,
  },

  {
    id: "type2-core",
    title: "The Helper's Hidden Need",
    subtitle: "Understanding Type 2 from the inside",
    estimatedMinutes: 3,
    stage: 1,
    typeFilter: [2],
    paragraphs: [
      {
        bold: "Giving as a survival strategy.",
        text: " Twos give because it feels good, but also because a deep part of them believes that being needed is the only secure way to be loved. The giving isn't selfless at its core; it's a bid for connection and reassurance. This doesn't make Twos manipulative, it makes them human, operating from a genuine wound.",
      },
      {
        bold: "The pride that won't ask.",
        text: " Twos are often unaware of their own needs, and even when they are, asking feels dangerous. What if the answer is no? What if they're seen as needy? So they give in hopes of receiving without having to ask. This leads to resentment when giving isn't reciprocated, and exhaustion from constantly pouring out.",
      },
      {
        bold: "Flattery and image management.",
        text: " Twos often unconsciously shift their personality depending on who they're with, becoming what each person needs them to be. This adaptability is a gift, but it can leave Twos unsure of who they actually are when no one needs anything from them.",
      },
      {
        bold: "Growth means receiving.",
        text: " Healthy Twos discover they are lovable without earning it. They learn to acknowledge their own needs, ask directly for help, and give freely without keeping score. They integrate toward Type 4, connecting with their own depth, individuality, and emotional truth.",
      },
    ],
    reflection: "Think of a recent situation where you gave something. What were you hoping to receive in return, even unconsciously?",
    tokenReward: 25,
    xpReward: 15,
  },

  {
    id: "type3-core",
    title: "The Achiever's Performance",
    subtitle: "Understanding Type 3 from the inside",
    estimatedMinutes: 3,
    stage: 1,
    typeFilter: [3],
    paragraphs: [
      {
        bold: "The original wound: being loved for doing, not being.",
        text: " Threes learned early that love and attention came when they succeeded. Not for who they were, but for what they accomplished. So they became very, very good at accomplishing things, and in the process, lost touch with who they were beneath the achievements.",
      },
      {
        bold: "The vanity trap.",
        text: " Threes don't just want to succeed, they want to be seen succeeding. Image management is constant. They calibrate their presentation to whatever audience they're with, shifting effortlessly between roles. This adaptability is one of Threes' great strengths, but it comes at a cost: they often don't know which version of themselves is real.",
      },
      {
        bold: "Deceit as self-deception.",
        text: " The passion of Type 3 isn't lying to others, it's lying to themselves. Threes can become so absorbed in a role or goal that they genuinely believe they feel things they don't, and genuinely don't notice feelings they do have. The busyness serves as a buffer from the emptiness underneath.",
      },
      {
        bold: "Growth means stillness.",
        text: " Healthy Threes discover that being, not doing, is enough. They integrate toward Type 6: becoming loyal, committed, and genuinely collaborative rather than always competing. They find that real connection requires vulnerability, not performance.",
      },
    ],
    reflection: "If you couldn't tell anyone about your achievements for a year, how would you feel about yourself?",
    tokenReward: 25,
    xpReward: 15,
  },

  {
    id: "type4-core",
    title: "The Individualist's Longing",
    subtitle: "Understanding Type 4 from the inside",
    estimatedMinutes: 3,
    stage: 1,
    typeFilter: [4],
    paragraphs: [
      {
        bold: "The sense of being fundamentally different.",
        text: " Fours have a persistent feeling that something essential is missing in them, some quality that others seem to have naturally. This feeling of deficiency isn't a conclusion they reached logically; it's a background sense of not quite belonging, of watching life through glass while others seem to be fully inside it.",
      },
      {
        bold: "Envy as a constant companion.",
        text: " Fours are the type most prone to envy, not jealousy (wanting what someone else has) but envy (feeling that others have what Fours lack by nature). This envy pulls them toward idealization of what's missing and devaluation of what's present. The grass is always greener.",
      },
      {
        bold: "The romance with suffering.",
        text: " Fours often identify strongly with their emotional pain. Sadness, longing, and melancholy feel more authentic than happiness. There's a fear that if the suffering ends, so does their depth and uniqueness. This can create an unconscious resistance to healing.",
      },
      {
        bold: "Growth means showing up.",
        text: " Healthy Fours discover their depth doesn't require suffering to be real. They integrate toward Type 1: becoming disciplined, focused, and able to bring their rich inner world into practical form. They learn that they are not special because of their wounds, but because of what they do with them.",
      },
    ],
    reflection: "What is the 'missing thing' you most long for? Does having it ever feel possible, or does the longing feel more familiar than having would?",
    tokenReward: 25,
    xpReward: 15,
  },

  {
    id: "type5-core",
    title: "The Investigator's Retreat",
    subtitle: "Understanding Type 5 from the inside",
    estimatedMinutes: 3,
    stage: 1,
    typeFilter: [5],
    paragraphs: [
      {
        bold: "The world as overwhelming.",
        text: " Fives experience the world as intrusive and depleting. Interactions, even enjoyable ones, cost energy. The response to this is strategic withdrawal: a retreat into the mind where everything can be processed safely, at their own pace, without anyone demanding more than they have to give.",
      },
      {
        bold: "Hoarding as safety.",
        text: " Fives hoard resources: time, energy, knowledge, privacy. They give very little away for free, because they never feel they have enough to spare. This isn't greed, it's fear. Fear that if they give too much, they'll be left with nothing. This creates a paradox: the more they hold back, the more isolated and depleted they actually become.",
      },
      {
        bold: "Detachment from feelings.",
        text: " Fives often experience their emotions on a time delay. They don't feel things in real time, they process them later, alone. This can make them seem cold or unaffected, when in reality they're simply storing the experience for later analysis. Sometimes the analysis happens; sometimes feelings get permanently shelved.",
      },
      {
        bold: "Growth means engagement.",
        text: " Healthy Fives discover that engaging with life doesn't deplete them, it energizes them. They integrate toward Type 8: becoming confident, decisive, and willing to step forward into the world. They find that their mind is most alive when it's connected to lived experience, not just theory.",
      },
    ],
    reflection: "What do you most guard yourself from, time demands, emotional demands, physical presence? What would it feel like to be less guarded there?",
    tokenReward: 25,
    xpReward: 15,
  },

  {
    id: "type6-core",
    title: "The Loyalist's Vigilance",
    subtitle: "Understanding Type 6 from the inside",
    estimatedMinutes: 3,
    stage: 1,
    typeFilter: [6],
    paragraphs: [
      {
        bold: "The mind that never stops scanning.",
        text: " Sixes have a hyperactive threat-detection system. Their mind constantly asks: what could go wrong here? Who can I trust? What's the worst case? This isn't pessimism, it's preparation. If they can see every danger in advance, they can be ready. The anxiety is the price of feeling safe.",
      },
      {
        bold: "Authority: the push-pull.",
        text: " Sixes have a complicated relationship with authority. They seek out trustworthy authorities and structures, but then test and question them. They want to believe, but they're terrified of being wrong about who to believe in. This can create a cycle of seeking, doubting, and abandoning guides and institutions.",
      },
      {
        bold: "Phobic and counterphobic.",
        text: " Some Sixes (phobic) move away from threat, they become cautious, deferential, and approval-seeking. Others (counterphobic) move TOWARD threat, becoming defiant, reckless, or aggressive as a way to prove the threat doesn't scare them. Both are responses to the same underlying anxiety.",
      },
      {
        bold: "Growth means trusting yourself.",
        text: " Healthy Sixes discover that the guidance they've been seeking externally was within them all along. They integrate toward Type 9: becoming calm, grounded, and able to rest in uncertainty without needing to resolve it. They find that real security isn't the absence of threat, it's confidence in their own ability to respond.",
      },
    ],
    reflection: "Think of a recent decision you overthought. What were you most afraid of getting wrong?",
    tokenReward: 25,
    xpReward: 15,
  },

  {
    id: "type7-core",
    title: "The Enthusiast's Escape",
    subtitle: "Understanding Type 7 from the inside",
    estimatedMinutes: 3,
    stage: 1,
    typeFilter: [7],
    paragraphs: [
      {
        bold: "Anxiety disguised as adventure.",
        text: " Sevens are one of the anxiety types, but they've found a brilliant way to manage it: keep moving. If you're always planning the next exciting thing, always in motion, always anticipating, there's no space for the pain and deprivation you're fleeing. The constant activity isn't enthusiasm, it's escape velocity.",
      },
      {
        bold: "The trap of options.",
        text: " Sevens love possibilities more than actualities. The plan is always more exciting than the execution. Commitment feels like loss, every time they choose one thing, they're giving up the others. So they resist commitment, keep options open, and scatter their energy across too many fronts to go deep in any of them.",
      },
      {
        bold: "Reframing pain.",
        text: " Sevens have an extraordinary ability to reframe any negative experience into a positive one. This is a gift in many situations, but it becomes a liability when pain needs to be felt, not reframed. Grief, loss, and failure all have important information. Sevens often process these on fast-forward.",
      },
      {
        bold: "Growth means depth.",
        text: " Healthy Sevens discover that the richest experiences come from going deep, not wide. They integrate toward Type 5: becoming focused, contemplative, and genuinely present. They find that sitting with discomfort doesn't destroy them, it connects them to a fullness that no amount of planning can provide.",
      },
    ],
    reflection: "What feeling have you been avoiding lately by staying busy or planning ahead?",
    tokenReward: 25,
    xpReward: 15,
  },

  {
    id: "type8-core",
    title: "The Challenger's Armor",
    subtitle: "Understanding Type 8 from the inside",
    estimatedMinutes: 3,
    stage: 1,
    typeFilter: [8],
    paragraphs: [
      {
        bold: "The original decision: never be weak again.",
        text: " Eights typically made a decision early in life, often in response to being hurt or betrayed, that vulnerability was dangerous. The solution was to become strong. Hard. Someone no one could push around. The armor that was built in childhood became the personality that runs their adult life.",
      },
      {
        bold: "Control as survival.",
        text: " Eights need to be in control of their environment because their deepest fear is being controlled by others. This isn't about power for its own sake, it's about safety. If they're in charge, they can't be blindsided. If they set the terms, they can't be exploited. Every situation is assessed through this lens.",
      },
      {
        bold: "The tenderness underneath.",
        text: " Eights are one of the most genuinely caring types in the Enneagram, but they hide it ferociously. Their tenderness is reserved for a small inner circle of people they've chosen to trust. For everyone else, the armor stays on. This is why Eights can seem brutal to strangers and fiercely protective to close friends.",
      },
      {
        bold: "Growth means softening.",
        text: " Healthy Eights discover that true strength includes the courage to be vulnerable. They integrate toward Type 2: becoming warm, nurturing, and willing to need others. They find that the people who love them most aren't drawn to their power, they're drawn to the tenderness they usually protect.",
      },
    ],
    reflection: "When did you last let someone see you struggling without trying to manage how it looked?",
    tokenReward: 25,
    xpReward: 15,
  },

  {
    id: "type9-core",
    title: "The Peacemaker's Disappearance",
    subtitle: "Understanding Type 9 from the inside",
    estimatedMinutes: 3,
    stage: 1,
    typeFilter: [9],
    paragraphs: [
      {
        bold: "The numbing of self.",
        text: " Nines learned early that the safest way to maintain peace was to minimize their own needs, preferences, and presence. If they didn't want much, they couldn't be disappointed. If they didn't insist on anything, no one would be disturbed. Over time, this becomes an unconscious habit: they genuinely struggle to know what they want.",
      },
      {
        bold: "Merging with others.",
        text: " Nines have a remarkable ability to take on the perspectives, preferences, and energy of the people around them. This makes them enormously empathetic and easy to be with, but it also means they can lose track of themselves entirely. After time with a strong personality, a Nine may not know where the other person ends and they begin.",
      },
      {
        bold: "Passive resistance.",
        text: " Nines rarely say no directly, it feels too confrontational. Instead, they use passive strategies: forgetting, delaying, going along but not following through, redirecting attention. This 'passive aggression' is often unconscious, Nines genuinely don't realize they're resisting. But the resistance is real.",
      },
      {
        bold: "Growth means showing up.",
        text: " Healthy Nines discover that their presence, their actual opinions, needs, and energy, is a gift to the world, not a burden. They integrate toward Type 3: becoming focused, energized, and able to act on their own behalf. They learn that peace built on self-erasure isn't peace at all.",
      },
    ],
    reflection: "What's one opinion or preference you've been keeping quiet to avoid disrupting the peace? What would happen if you said it?",
    tokenReward: 25,
    xpReward: 15,
  },

  // ── Stage 2: Wings & Instinct Variants ────────────────────────────────────

  {
    id: "wings-explained",
    title: "Your Wing: The Type Next Door",
    subtitle: "How wings shape your Enneagram expression",
    estimatedMinutes: 2,
    stage: 2,
    typeFilter: [],
    paragraphs: [
      {
        bold: "Not a second type, a flavor.",
        text: " Your wing is the Enneagram type adjacent to yours that colors how your core type expresses itself. A Type 4 with a 3 wing (4w3) is more ambitious and image-conscious than a 4w5, which tends to be more withdrawn and intellectual. The core motivation stays the same, only the expression changes.",
      },
      {
        bold: "Most people have one dominant wing.",
        text: " While both adjacent types technically influence you, most people find one wing much more prominent than the other. Some people show both wings depending on context, this is normal. A few rare individuals show almost no wing influence and are sometimes called 'arrow types.'",
      },
      {
        bold: "Wings can shift across life stages.",
        text: " It's common to lean into one wing heavily in your 20s, then find the other becoming more prominent in your 40s or 50s. This isn't a type change, it's development. As you grow, you integrate qualities from both adjacent types.",
      },
      {
        bold: "The key question.",
        text: " To identify your wing, look at the two types adjacent to yours and ask: which one's BEHAVIORS (not motivations) do I notice more in myself? Not which one you admire or aspire to, which one actually shows up in your everyday patterns.",
      },
    ],
    reflection: "Which of your two adjacent types do you see more in your actual behavior, not your ideals, but your patterns?",
    tokenReward: 25,
    xpReward: 15,
  },

  {
    id: "instincts-explained",
    title: "The Three Instincts: Your Hidden Driver",
    subtitle: "SP, SO, and SX, and why they matter",
    estimatedMinutes: 3,
    stage: 2,
    typeFilter: [],
    paragraphs: [
      {
        bold: "Three survival drives, one dominant.",
        text: " Every human has three biological instincts: Self-Preservation (SP), Social (SO), and Sexual/One-to-One (SX). These aren't personality traits, they're pre-cognitive drives. Your dominant instinct runs beneath your Enneagram type and filters how it expresses itself. Two Type 4s with different instincts can look like completely different people.",
      },
      {
        bold: "Self-Preservation (SP): safety and comfort.",
        text: " SP-dominant people are focused on physical wellbeing: health, financial security, home, routines, and resources. They tend to be practical, grounded, and private. They're the people who always have snacks, always check the exits, and would rather have a comfortable home than an impressive one.",
      },
      {
        bold: "Social (SO): belonging and status.",
        text: " SO-dominant people are focused on their position in groups: where they fit, how they're perceived, and whether they're contributing meaningfully. They're often the most culturally aware subtype, attuned to norms, hierarchies, and collective meaning. This doesn't mean they're extroverted; introverts can be SO-dominant.",
      },
      {
        bold: "Sexual / One-to-One (SX): intensity and connection.",
        text: " SX-dominant people are focused on depth of connection and aliveness. They want intense, merging experiences, whether in relationships, creative work, or ideas. They're drawn to whatever feels most alive. They tend to be charismatic, restless, and somewhat all-or-nothing in their attachments.",
      },
    ],
    reflection: "Which of the three descriptions, SP, SO, or SX, matches the lens through which you most naturally see the world?",
    tokenReward: 25,
    xpReward: 15,
  },

  // ── Stage 3: Cross-framework & Growth ─────────────────────────────────────

  {
    id: "stress-growth-lines",
    title: "Stress and Growth: The Lines of the Enneagram",
    subtitle: "Where you go under pressure, and where you're headed",
    estimatedMinutes: 3,
    stage: 3,
    typeFilter: [],
    paragraphs: [
      {
        bold: "The Enneagram moves.",
        text: " Unlike many type systems, the Enneagram isn't static. Each type is connected to two others by lines that show where you GO, psychologically, under stress (disintegration) and in growth (integration). These connections reveal your full range, not just your home base.",
      },
      {
        bold: "Disintegration: under stress.",
        text: " Under prolonged stress or when your coping strategies fail, you unconsciously adopt the LOWER qualities of another type. A Type 7 under stress moves toward Type 1: becoming perfectionistic, critical, and rigid. A Type 4 under stress moves toward Type 2: becoming needy and manipulative. Recognizing this pattern is the first step to interrupting it.",
      },
      {
        bold: "Integration: in growth.",
        text: " As you become healthier and more conscious, you begin to naturally take on the HIGHER qualities of another type. A Type 7 integrating toward Type 5 becomes focused, contemplative, and genuinely present. A Type 4 integrating toward Type 1 becomes disciplined, grounded, and purposeful. Integration isn't forced, it emerges as a natural byproduct of inner work.",
      },
      {
        bold: "Both directions are always available.",
        text: " You're not stuck on one path. At any moment, you can ask yourself: am I moving toward my stress type right now, or toward my growth type? This simple question, practiced over time, is one of the most powerful tools the Enneagram offers.",
      },
    ],
    reflection: "Think of a recent stressful period. Can you see yourself taking on qualities of your stress type? What triggered it?",
    tokenReward: 25,
    xpReward: 15,
  },

  {
    id: "cognitive-enneagram-bridge",
    title: "Your Enneagram Type and Cognitive Functions",
    subtitle: "How the two frameworks connect",
    estimatedMinutes: 3,
    stage: 3,
    typeFilter: [],
    paragraphs: [
      {
        bold: "Two maps of the same territory.",
        text: " The Enneagram and cognitive functions describe the same person from different angles. The Enneagram tells you WHY you do what you do, your core fear, desire, and motivation. Cognitive functions tell you HOW you process the world, the specific mental tools you use most naturally. Together, they give you a much richer picture.",
      },
      {
        bold: "Motivation vs. mechanism.",
        text: " Two people with the same cognitive type (say, INTJ, Ni/Te/Fi/Se) can be very different Enneagram types. One might be a Type 5 (investigating from fear of incompetence), another a Type 1 (systematizing from fear of error), another a Type 3 (strategizing to achieve status). Same cognitive tools, entirely different engines driving them.",
      },
      {
        bold: "Why your dominant function shows up differently than you'd expect.",
        text: " Your Enneagram type shapes HOW you use your dominant cognitive function. A Type 9 with dominant Introverted Intuition (Ni) will use their deep pattern-recognition to maintain peace and avoid conflict. A Type 8 with the same Ni will use it to see through people's intentions and stay in control. Same function, different flavor.",
      },
      {
        bold: "The most useful question.",
        text: " Rather than asking 'what type am I?' in either system, try asking: 'What am I trying to get, and how am I going about getting it?' The first part is your Enneagram. The second part is your cognitive style. The overlap is where real self-knowledge lives.",
      },
    ],
    reflection: "Can you see your Enneagram motivation showing up in how you use your strongest cognitive function? What does that look like in practice?",
    tokenReward: 25,
    xpReward: 15,
  },

  {
    id: "healthy-vs-unhealthy",
    title: "Levels of Development: The Full Spectrum",
    subtitle: "Your type across healthy, average, and stressed states",
    estimatedMinutes: 2,
    stage: 3,
    typeFilter: [],
    paragraphs: [
      {
        bold: "Every type has a full range.",
        text: " No Enneagram type is inherently good or bad. Every type, including the ones with the worst reputations, can be deeply healthy, deeply unhealthy, or anywhere in between. The question isn't which type you are, but which level you're currently operating at.",
      },
      {
        bold: "Healthy levels: your type's gifts.",
        text: " At healthy levels, every type expresses remarkable strengths. Healthy Eights are genuinely protective and magnanimous. Healthy Fours are deeply creative and emotionally wise. Healthy Twos are genuinely selfless and nurturing. The strengths are real, they just require consciousness and growth to access consistently.",
      },
      {
        bold: "Average levels: the autopilot.",
        text: " Most people operate at average levels most of the time, functioning well enough, but running on automatic. Average behavior is recognizable as your type, but involves more unconscious reaction, more coping strategies, and less genuine choice.",
      },
      {
        bold: "What moves you between levels?",
        text: " Levels of development aren't fixed. Stress, sleep deprivation, major life events, and unprocessed pain pull you down. Genuine self-awareness, therapy, meditation, meaningful relationships, and this kind of reflection push you up. The goal isn't to become a different type, it's to become a healthier version of the one you are.",
      },
    ],
    reflection: "In which area of your life do you most consistently show up at your type's healthy level? Where do you most often slip into average or stressed patterns?",
    tokenReward: 25,
    xpReward: 15,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Get today's reading for a user based on their type and days since joining */
export function getDailyReading(
  enneagramType: number | null,
  daysSinceJoin: number,
  completedReadingIds: string[]
): Reading | null {
  const stage: 1 | 2 | 3 =
    daysSinceJoin <= 7 ? 1 : daysSinceJoin <= 14 ? 2 : 3;

  // Filter by stage and type
  const eligible = dailyReadings.filter((r) => {
    if (r.stage !== stage) return false;
    if (r.typeFilter.length > 0 && enneagramType && !r.typeFilter.includes(enneagramType)) return false;
    return true;
  });

  // Prefer unread ones
  const unread = eligible.filter((r) => !completedReadingIds.includes(r.id));
  const pool = unread.length > 0 ? unread : eligible;

  // Deterministic daily pick based on day index
  if (pool.length === 0) return dailyReadings[daysSinceJoin % dailyReadings.length];
  return pool[daysSinceJoin % pool.length];
}
