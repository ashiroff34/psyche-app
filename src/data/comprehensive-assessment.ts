// Comprehensive Enneagram Assessment
// Modeled after validated instruments (iEQ9, TAS, Wagner Enneagram Personality Style Scales)
// Uses forced-choice pairs and Likert scale statements
// Covers: core type, wing, instinctual variant, tritype center preferences
// 80+ items for statistical reliability

export interface AssessmentStatement {
  id: number;
  text: string;
  section: "core" | "instinct" | "tritype";
  scores: Record<string, number>; // type numbers or instinct codes
}

export interface ForcedChoicePair {
  id: number;
  section: "core" | "wing" | "instinct";
  a: { text: string; scores: Record<string, number> };
  b: { text: string; scores: Record<string, number> };
}

// Section 1: Core Type, Forced Choice Pairs
// Each pair contrasts two types. 36 pairs covers all pairwise comparisons of 9 types.
export const coreTypePairs: ForcedChoicePair[] = [
  // 1 vs 2
  { id: 1, section: "core", a: { text: "I tend to be idealistic and principled, I have a strong sense of right and wrong", scores: { "1": 1 } }, b: { text: "I tend to be warm and giving, I'm most fulfilled when I'm helping someone", scores: { "2": 1 } } },
  // 1 vs 3
  { id: 2, section: "core", a: { text: "I am more concerned with doing things correctly than with being successful", scores: { "1": 1 } }, b: { text: "I am more concerned with being successful than with doing things 'perfectly'", scores: { "3": 1 } } },
  // 1 vs 4
  { id: 3, section: "core", a: { text: "I tend to be disciplined, organized, and follow rules", scores: { "1": 1 } }, b: { text: "I tend to be emotional, intuitive, and follow my heart", scores: { "4": 1 } } },
  // 1 vs 5
  { id: 4, section: "core", a: { text: "I have strong opinions about what's right and feel compelled to correct what's wrong", scores: { "1": 1 } }, b: { text: "I prefer to observe and understand rather than correct or intervene", scores: { "5": 1 } } },
  // 1 vs 6
  { id: 5, section: "core", a: { text: "My anxiety comes from not living up to my own standards", scores: { "1": 1 } }, b: { text: "My anxiety comes from not knowing what might go wrong or who to trust", scores: { "6": 1 } } },
  // 1 vs 7
  { id: 6, section: "core", a: { text: "I tend to deny myself pleasure until my responsibilities are fulfilled", scores: { "1": 1 } }, b: { text: "I tend to seek pleasure and stimulation, life is too short to be rigid", scores: { "7": 1 } } },
  // 1 vs 8
  { id: 7, section: "core", a: { text: "I express my anger through criticism and high standards", scores: { "1": 1 } }, b: { text: "I express my anger directly and forcefully, I don't sugarcoat", scores: { "8": 1 } } },
  // 1 vs 9
  { id: 8, section: "core", a: { text: "I feel a constant inner tension about things not being right", scores: { "1": 1 } }, b: { text: "I feel a deep desire for inner peace and tend to avoid conflict", scores: { "9": 1 } } },
  // 2 vs 3
  { id: 9, section: "core", a: { text: "My self-worth comes from how much I help and care for others", scores: { "2": 1 } }, b: { text: "My self-worth comes from my achievements and how successful I appear", scores: { "3": 1 } } },
  // 2 vs 4
  { id: 10, section: "core", a: { text: "I focus more on others' feelings and needs than my own", scores: { "2": 1 } }, b: { text: "I focus deeply on my own emotional experience and inner world", scores: { "4": 1 } } },
  // 2 vs 5
  { id: 11, section: "core", a: { text: "I move toward people, connection energizes me", scores: { "2": 1 } }, b: { text: "I move away from people, solitude energizes me", scores: { "5": 1 } } },
  // 2 vs 6
  { id: 12, section: "core", a: { text: "I'm driven by the desire to be loved and appreciated", scores: { "2": 1 } }, b: { text: "I'm driven by the desire to feel safe and supported", scores: { "6": 1 } } },
  // 2 vs 7
  { id: 13, section: "core", a: { text: "I show love by anticipating what others need before they ask", scores: { "2": 1 } }, b: { text: "I show love by sharing exciting experiences and keeping things fun", scores: { "7": 1 } } },
  // 2 vs 8
  { id: 14, section: "core", a: { text: "I influence others through warmth, charm, and emotional connection", scores: { "2": 1 } }, b: { text: "I influence others through directness, strength, and force of will", scores: { "8": 1 } } },
  // 2 vs 9
  { id: 15, section: "core", a: { text: "I actively seek out people who need help, I want to be needed", scores: { "2": 1 } }, b: { text: "I'm easygoing and accepting, I want everyone to get along", scores: { "9": 1 } } },
  // 3 vs 4
  { id: 16, section: "core", a: { text: "I adapt who I am based on what will be most effective in the situation", scores: { "3": 1 } }, b: { text: "I refuse to be anyone other than my authentic self, even if it costs me", scores: { "4": 1 } } },
  // 3 vs 5
  { id: 17, section: "core", a: { text: "I'm action-oriented, I'd rather do than think", scores: { "3": 1 } }, b: { text: "I'm thought-oriented, I'd rather think than do", scores: { "5": 1 } } },
  // 3 vs 6
  { id: 18, section: "core", a: { text: "I'm confident in my ability to succeed at almost anything", scores: { "3": 1 } }, b: { text: "I often doubt myself and look for reassurance before acting", scores: { "6": 1 } } },
  // 3 vs 7
  { id: 19, section: "core", a: { text: "I'm focused and goal-driven, I finish what I start", scores: { "3": 1 } }, b: { text: "I'm excited by beginnings, finishing is harder because new things call", scores: { "7": 1 } } },
  // 3 vs 8
  { id: 20, section: "core", a: { text: "I want to be admired for what I've accomplished", scores: { "3": 1 } }, b: { text: "I want to be respected for my strength and independence", scores: { "8": 1 } } },
  // 3 vs 9
  { id: 21, section: "core", a: { text: "I have a clear sense of my goals and work efficiently toward them", scores: { "3": 1 } }, b: { text: "I often lose track of my own goals and merge with what others want", scores: { "9": 1 } } },
  // 4 vs 5
  { id: 22, section: "core", a: { text: "I understand the world primarily through my feelings and emotional impressions", scores: { "4": 1 } }, b: { text: "I understand the world primarily through observation and analysis", scores: { "5": 1 } } },
  // 4 vs 6
  { id: 23, section: "core", a: { text: "I fear being ordinary or having no personal significance", scores: { "4": 1 } }, b: { text: "I fear being without support or guidance in a dangerous world", scores: { "6": 1 } } },
  // 4 vs 7
  { id: 24, section: "core", a: { text: "I'm drawn to what's deep, melancholic, and emotionally profound", scores: { "4": 1 } }, b: { text: "I'm drawn to what's exciting, novel, and full of possibility", scores: { "7": 1 } } },
  // 4 vs 8
  { id: 25, section: "core", a: { text: "When hurt, I withdraw into my feelings and process internally", scores: { "4": 1 } }, b: { text: "When hurt, I get angry and confront whoever hurt me", scores: { "8": 1 } } },
  // 4 vs 9
  { id: 26, section: "core", a: { text: "I amplify my emotions, I want to feel everything deeply", scores: { "4": 1 } }, b: { text: "I dampen my emotions, I prefer emotional equilibrium", scores: { "9": 1 } } },
  // 5 vs 6
  { id: 27, section: "core", a: { text: "I deal with uncertainty by gathering more information", scores: { "5": 1 } }, b: { text: "I deal with uncertainty by seeking allies and testing loyalties", scores: { "6": 1 } } },
  // 5 vs 7
  { id: 28, section: "core", a: { text: "I go deep into a few subjects, depth over breadth", scores: { "5": 1 } }, b: { text: "I explore many subjects, breadth over depth", scores: { "7": 1 } } },
  // 5 vs 8
  { id: 29, section: "core", a: { text: "I protect myself by creating distance and boundaries", scores: { "5": 1 } }, b: { text: "I protect myself by being strong enough that nothing can threaten me", scores: { "8": 1 } } },
  // 5 vs 9
  { id: 30, section: "core", a: { text: "I withdraw to conserve energy, the world feels depleting", scores: { "5": 1 } }, b: { text: "I withdraw to avoid effort, my own desires feel overwhelming", scores: { "9": 1 } } },
  // 6 vs 7
  { id: 31, section: "core", a: { text: "I prepare for what could go wrong, I'm a worst-case thinker", scores: { "6": 1 } }, b: { text: "I focus on what could go right, I'm a best-case thinker", scores: { "7": 1 } } },
  // 6 vs 8
  { id: 32, section: "core", a: { text: "I question authority before trusting it, loyalty must be earned", scores: { "6": 1 } }, b: { text: "I AM the authority, I don't wait for permission to act", scores: { "8": 1 } } },
  // 6 vs 9
  { id: 33, section: "core", a: { text: "My mind is active and anxious, I'm always scanning for problems", scores: { "6": 1 } }, b: { text: "My mind is calm and diffuse, I tend to space out and merge with my surroundings", scores: { "9": 1 } } },
  // 7 vs 8
  { id: 34, section: "core", a: { text: "I avoid pain by seeking pleasure and reframing negatives", scores: { "7": 1 } }, b: { text: "I avoid pain by being so strong that nothing can hurt me", scores: { "8": 1 } } },
  // 7 vs 9
  { id: 35, section: "core", a: { text: "I'm energetic and enthusiastic, I need stimulation and variety", scores: { "7": 1 } }, b: { text: "I'm steady and low-key, I need routine and comfort", scores: { "9": 1 } } },
  // 8 vs 9
  { id: 36, section: "core", a: { text: "I assert myself forcefully, I'd rather be too much than too little", scores: { "8": 1 } }, b: { text: "I minimize myself, I'd rather blend in than create waves", scores: { "9": 1 } } },
];

// Section 2: Likert Scale Statements (1-5 how much this resonates)
// 45 statements, 5 per type, designed to measure core motivations
export const likertStatements: AssessmentStatement[] = [
  // Type 1
  { id: 101, text: "I have a strong inner voice that tells me what I should and shouldn't do.", section: "core", scores: { "1": 1 } },
  { id: 102, text: "I become frustrated when people don't try to do things the right way.", section: "core", scores: { "1": 1 } },
  { id: 103, text: "I hold myself to very high standards and feel guilty when I fall short.", section: "core", scores: { "1": 1 } },
  { id: 104, text: "I notice errors and inconsistencies that others seem to miss.", section: "core", scores: { "1": 1 } },
  { id: 105, text: "I believe there is usually one best way to do things.", section: "core", scores: { "1": 1 } },
  // Type 2
  { id: 201, text: "I can sense what other people need, sometimes before they know it themselves.", section: "core", scores: { "2": 1 } },
  { id: 202, text: "I feel hurt when my helpfulness isn't acknowledged or appreciated.", section: "core", scores: { "2": 1 } },
  { id: 203, text: "I have difficulty saying no to people who ask for my help.", section: "core", scores: { "2": 1 } },
  { id: 204, text: "I often put others' needs ahead of my own, sometimes without realizing it.", section: "core", scores: { "2": 1 } },
  { id: 205, text: "I feel most alive and valuable when I know someone depends on me.", section: "core", scores: { "2": 1 } },
  // Type 3
  { id: 301, text: "I'm acutely aware of how I come across to other people.", section: "core", scores: { "3": 1 } },
  { id: 302, text: "I feel uncomfortable when I'm not being productive or accomplishing something.", section: "core", scores: { "3": 1 } },
  { id: 303, text: "I naturally adjust my presentation based on who I'm talking to.", section: "core", scores: { "3": 1 } },
  { id: 304, text: "My value as a person feels connected to my achievements and status.", section: "core", scores: { "3": 1 } },
  { id: 305, text: "I can be so focused on goals that I lose touch with how I actually feel.", section: "core", scores: { "3": 1 } },
  // Type 4
  { id: 401, text: "I often feel fundamentally different from other people.", section: "core", scores: { "4": 1 } },
  { id: 402, text: "I'm drawn to beauty, depth, and emotional intensity in art and life.", section: "core", scores: { "4": 1 } },
  { id: 403, text: "I tend to focus on what's missing from my life rather than what's present.", section: "core", scores: { "4": 1 } },
  { id: 404, text: "My emotional life is very rich and complex, I feel things deeply.", section: "core", scores: { "4": 1 } },
  { id: 405, text: "I sometimes romanticize sadness or melancholy, it feels authentic.", section: "core", scores: { "4": 1 } },
  // Type 5
  { id: 501, text: "I need significant alone time to recharge, social interaction drains me.", section: "core", scores: { "5": 1 } },
  { id: 502, text: "I prefer to observe and understand before participating.", section: "core", scores: { "5": 1 } },
  { id: 503, text: "I feel most comfortable when I have deep expertise in a subject.", section: "core", scores: { "5": 1 } },
  { id: 504, text: "I minimize my needs and desires to maintain independence.", section: "core", scores: { "5": 1 } },
  { id: 505, text: "I experience the world as intrusive and overwhelming if I don't create boundaries.", section: "core", scores: { "5": 1 } },
  // Type 6
  { id: 601, text: "I tend to scan for potential problems and prepare for worst-case scenarios.", section: "core", scores: { "6": 1 } },
  { id: 602, text: "I have a complicated relationship with authority, I both seek and question it.", section: "core", scores: { "6": 1 } },
  { id: 603, text: "I need to know where I stand with people, ambiguity makes me anxious.", section: "core", scores: { "6": 1 } },
  { id: 604, text: "When things are going well, I often wait for the other shoe to drop.", section: "core", scores: { "6": 1 } },
  { id: 605, text: "I'm deeply loyal to the people and causes I believe in.", section: "core", scores: { "6": 1 } },
  // Type 7
  { id: 701, text: "I naturally reframe negative experiences to find the positive angle.", section: "core", scores: { "7": 1 } },
  { id: 702, text: "I have many interests and find it hard to commit to just one thing.", section: "core", scores: { "7": 1 } },
  { id: 703, text: "I feel anxious when I have too few options or feel trapped.", section: "core", scores: { "7": 1 } },
  { id: 704, text: "Planning future activities is sometimes more exciting than the activities themselves.", section: "core", scores: { "7": 1 } },
  { id: 705, text: "I avoid pain, boredom, and limitation, I want to stay stimulated and free.", section: "core", scores: { "7": 1 } },
  // Type 8
  { id: 801, text: "I have a strong instinct for who has power in a room and how it's being used.", section: "core", scores: { "8": 1 } },
  { id: 802, text: "I'd rather be too direct than beat around the bush.", section: "core", scores: { "8": 1 } },
  { id: 803, text: "I have difficulty showing vulnerability, even with people I trust.", section: "core", scores: { "8": 1 } },
  { id: 804, text: "I feel most alive when I'm taking decisive action against injustice.", section: "core", scores: { "8": 1 } },
  { id: 805, text: "People describe me as intense, strong-willed, or intimidating.", section: "core", scores: { "8": 1 } },
  // Type 9
  { id: 901, text: "I often go along with what others want because asserting myself feels hard.", section: "core", scores: { "9": 1 } },
  { id: 902, text: "I tend to see all sides of an issue, which makes it hard to take a firm position.", section: "core", scores: { "9": 1 } },
  { id: 903, text: "I numb out or distract myself rather than dealing with uncomfortable feelings.", section: "core", scores: { "9": 1 } },
  { id: 904, text: "I often don't know what I want until someone asks, then I have to think about it.", section: "core", scores: { "9": 1 } },
  { id: 905, text: "I value harmony and peace above almost everything, conflict is deeply upsetting.", section: "core", scores: { "9": 1 } },
];

// Section 3: Instinctual Variant Assessment (15 forced-choice pairs)
export const instinctPairs: ForcedChoicePair[] = [
  { id: 1001, section: "instinct", a: { text: "I'm most focused on my physical comfort, health, and financial security", scores: { "sp": 1 } }, b: { text: "I'm most focused on finding intense one-on-one connection and chemistry", scores: { "sx": 1 } } },
  { id: 1002, section: "instinct", a: { text: "I'm most focused on my role in groups and my social standing", scores: { "so": 1 } }, b: { text: "I'm most focused on my physical wellbeing and material resources", scores: { "sp": 1 } } },
  { id: 1003, section: "instinct", a: { text: "I seek deep, transformative one-on-one bonds", scores: { "sx": 1 } }, b: { text: "I seek belonging and contribution within a community", scores: { "so": 1 } } },
  { id: 1004, section: "instinct", a: { text: "I feel most anxious about my physical safety and resources", scores: { "sp": 1 } }, b: { text: "I feel most anxious about finding someone who truly sees me", scores: { "sx": 1 } } },
  { id: 1005, section: "instinct", a: { text: "I feel most anxious about my place in the social group", scores: { "so": 1 } }, b: { text: "I feel most anxious about my health and material security", scores: { "sp": 1 } } },
  { id: 1006, section: "instinct", a: { text: "I'm drawn to people who are magnetic and intense", scores: { "sx": 1 } }, b: { text: "I'm drawn to people who are well-connected and socially aware", scores: { "so": 1 } } },
  { id: 1007, section: "instinct", a: { text: "In relationships, I need consistency and reliability above all", scores: { "sp": 1 } }, b: { text: "In relationships, I need passion and emotional intensity above all", scores: { "sx": 1 } } },
  { id: 1008, section: "instinct", a: { text: "I spend significant mental energy on practical concerns, food, shelter, money, health", scores: { "sp": 1 } }, b: { text: "I spend significant mental energy on social dynamics, who's connected to whom, group politics", scores: { "so": 1 } } },
  { id: 1009, section: "instinct", a: { text: "I light up in intimate, one-on-one settings", scores: { "sx": 1 } }, b: { text: "I light up when I'm contributing meaningfully to a group", scores: { "so": 1 } } },
  { id: 1010, section: "instinct", a: { text: "My home environment is extremely important to me, it needs to feel safe and comfortable", scores: { "sp": 1 } }, b: { text: "The quality of my close relationships is extremely important, I need depth and intensity", scores: { "sx": 1 } } },
  { id: 1011, section: "instinct", a: { text: "I'm selective about who I let into my space, I value privacy", scores: { "sp": 1 } }, b: { text: "I'm attuned to social hierarchies, I notice status and group dynamics", scores: { "so": 1 } } },
  { id: 1012, section: "instinct", a: { text: "When stressed, I focus on getting my basic needs met", scores: { "sp": 1 } }, b: { text: "When stressed, I seek out someone who can hold intensity with me", scores: { "sx": 1 } } },
  { id: 1013, section: "instinct", a: { text: "When stressed, I reach out to my broader network or community", scores: { "so": 1 } }, b: { text: "When stressed, I retreat to the comfort and safety of my personal space", scores: { "sp": 1 } } },
  { id: 1014, section: "instinct", a: { text: "I have a strong physical awareness, I notice my body's needs and signals", scores: { "sp": 1 } }, b: { text: "I have a strong chemistry radar, I sense the energetic charge between people", scores: { "sx": 1 } } },
  { id: 1015, section: "instinct", a: { text: "I naturally read group dynamics and social expectations", scores: { "so": 1 } }, b: { text: "I naturally notice what's compelling, attractive, and magnetic", scores: { "sx": 1 } } },
];

// Section 4: Tritype Center Assessment (9 forced-choice items, 3 per center)
export const tritypePairs: ForcedChoicePair[] = [
  // Head Center: 5 vs 6 vs 7
  { id: 2001, section: "core", a: { text: "When afraid, I withdraw to think and analyze", scores: { "5": 1 } }, b: { text: "When afraid, I seek allies and test for loyalty", scores: { "6": 1 } } },
  { id: 2002, section: "core", a: { text: "When afraid, I distract myself with positive plans and possibilities", scores: { "7": 1 } }, b: { text: "When afraid, I prepare extensively for every possible scenario", scores: { "6": 1 } } },
  { id: 2003, section: "core", a: { text: "I manage uncertainty through knowledge and understanding", scores: { "5": 1 } }, b: { text: "I manage uncertainty through reframing and finding the upside", scores: { "7": 1 } } },
  // Heart Center: 2 vs 3 vs 4
  { id: 2004, section: "core", a: { text: "I manage my self-image by being needed and helpful", scores: { "2": 1 } }, b: { text: "I manage my self-image by being successful and accomplished", scores: { "3": 1 } } },
  { id: 2005, section: "core", a: { text: "I manage my self-image by being unique and authentic", scores: { "4": 1 } }, b: { text: "I manage my self-image by being indispensable to others", scores: { "2": 1 } } },
  { id: 2006, section: "core", a: { text: "My identity is built on achievements and effectiveness", scores: { "3": 1 } }, b: { text: "My identity is built on emotional depth and personal significance", scores: { "4": 1 } } },
  // Gut Center: 8 vs 9 vs 1
  { id: 2007, section: "core", a: { text: "I handle anger by expressing it forcefully and directly", scores: { "8": 1 } }, b: { text: "I handle anger by suppressing it and maintaining peace", scores: { "9": 1 } } },
  { id: 2008, section: "core", a: { text: "I handle anger by channeling it into principled criticism", scores: { "1": 1 } }, b: { text: "I handle anger by taking control of the situation", scores: { "8": 1 } } },
  { id: 2009, section: "core", a: { text: "I tend to go along with others to avoid conflict", scores: { "9": 1 } }, b: { text: "I tend to correct others when they're doing things wrong", scores: { "1": 1 } } },
];
