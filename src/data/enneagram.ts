export interface EnneagramType {
  number: number;
  name: string;
  alias: string;
  brief: string;
  description: string;
  coreMotivation: string;
  coreFear: string;
  coreDesire: string;
  keyTraits: string[];
  healthyTraits: string[];
  averageTraits: string[];
  unhealthyTraits: string[];
  wings: { left: string; right: string };
  integrationLine: number;
  disintegrationLine: number;
  growthTips: string[];
  journalPrompts: string[];
  color: string;
  icon: string;
}

export const enneagramTypes: EnneagramType[] = [
  {
    number: 1,
    name: "The Reformer",
    alias: "The Perfectionist",
    brief: "Principled, purposeful, self-controlled, and perfectionistic.",
    description: "Ones are conscientious and ethical, with a strong sense of right and wrong. They are teachers, crusaders, and advocates for change: always striving to improve things, but afraid of making a mistake. Well-organized, orderly, and fastidious, they try to maintain high standards, but can slip into being critical and perfectionistic. They typically have problems with resentment and impatience.",
    coreMotivation: "To be right, to strive higher and improve everything, to be consistent with their ideals, to justify themselves, to be beyond criticism.",
    coreFear: "Of being corrupt, evil, or defective.",
    coreDesire: "To be good, to have integrity, to be balanced.",
    keyTraits: ["Principled", "Orderly", "Self-disciplined", "Ethical", "Responsible"],
    healthyTraits: ["Wise", "Discerning", "Realistic", "Noble", "Morally heroic"],
    averageTraits: ["Orderly", "Impersonal", "Rigid", "Critical", "Judgmental"],
    unhealthyTraits: ["Intolerant", "Obsessive", "Contradictory", "Punitive", "Self-righteous"],
    wings: { left: "1w9 — The Idealist", right: "1w2 — The Advocate" },
    integrationLine: 7,
    disintegrationLine: 4,
    growthTips: [
      "Learn to relax and let go of the need for perfection.",
      "Practice self-compassion when you make mistakes.",
      "Channel your critical voice toward constructive feedback rather than judgment.",
      "Allow yourself to experience joy and spontaneity (integration to 7).",
      "Recognize that your inner critic is not the voice of truth."
    ],
    journalPrompts: [
      "What standard am I holding myself to right now? Is it realistic?",
      "When did I last allow myself to be imperfect without guilt?",
      "What would it look like to approach today with curiosity instead of critique?",
      "How can I show myself the same compassion I show others?",
      "What brings me genuine joy when I let go of the need to improve it?"
    ],
    color: "#E74C3C",
    icon: ""
  },
  {
    number: 2,
    name: "The Helper",
    alias: "The Giver",
    brief: "Generous, demonstrative, people-pleasing, and possessive.",
    description: "Twos are empathetic, sincere, and warm-hearted. They are friendly, generous, and self-sacrificing, but can also be sentimental, flattering, and people-pleasing. They are well-meaning and driven to be close to others, but can slip into doing things for others in order to be needed. They typically have problems with possessiveness and with acknowledging their own needs.",
    coreMotivation: "To feel loved, to express their feelings for others, to be needed and appreciated.",
    coreFear: "Of being unwanted, unworthy of being loved.",
    coreDesire: "To feel loved and wanted.",
    keyTraits: ["Caring", "Interpersonal", "Generous", "Warm", "Empathetic"],
    healthyTraits: ["Unconditionally loving", "Altruistic", "Giving", "Nurturing", "Joyful"],
    averageTraits: ["People-pleasing", "Possessive", "Intrusive", "Demonstrative", "Hovering"],
    unhealthyTraits: ["Manipulative", "Self-deceptive", "Entitled", "Coercive", "Victimized"],
    wings: { left: "2w1 — The Servant", right: "2w3 — The Host" },
    integrationLine: 4,
    disintegrationLine: 8,
    growthTips: [
      "Practice identifying and expressing your own needs.",
      "Notice when you're giving to get something in return.",
      "Set healthy boundaries without feeling guilty.",
      "Connect with your own emotions (integration to 4).",
      "Remember that your worth isn't dependent on being needed."
    ],
    journalPrompts: [
      "What do I need right now that I haven't asked for?",
      "Am I helping because I genuinely want to, or because I want to feel valued?",
      "What boundary could I set this week that would serve my wellbeing?",
      "How do I feel when someone doesn't need my help?",
      "What would self-love look like for me today?"
    ],
    color: "#27AE60",
    icon: ""
  },
  {
    number: 3,
    name: "The Achiever",
    alias: "The Performer",
    brief: "Adaptable, excelling, driven, and image-conscious.",
    description: "Threes are self-assured, attractive, and charming. Ambitious, competent, and energetic, they can also be status-conscious and highly driven for advancement. They are diplomatic and poised, but can also be overly concerned with their image and what others think of them. They typically have problems with workaholism and competitiveness.",
    coreMotivation: "To be affirmed, to distinguish themselves from others, to have attention, to be admired.",
    coreFear: "Of being worthless or without inherent value apart from achievements.",
    coreDesire: "To feel valuable and worthwhile.",
    keyTraits: ["Adaptable", "Ambitious", "Competent", "Energetic", "Driven"],
    healthyTraits: ["Authentic", "Self-accepting", "Charitable", "Genuine", "Inspiring"],
    averageTraits: ["Image-conscious", "Competitive", "Calculating", "Self-promoting", "Grandiose"],
    unhealthyTraits: ["Deceptive", "Narcissistic", "Vindictive", "Exploitative", "Malicious"],
    wings: { left: "3w2 — The Charmer", right: "3w4 — The Professional" },
    integrationLine: 6,
    disintegrationLine: 9,
    growthTips: [
      "Practice being authentic even when it doesn't serve your image.",
      "Slow down and notice what you actually feel versus what you project.",
      "Develop loyalty and commitment to others (integration to 6).",
      "Learn that your worth exists independent of your achievements.",
      "Allow yourself to be vulnerable with trusted people."
    ],
    journalPrompts: [
      "Who am I when no one is watching?",
      "What achievement am I chasing right now, and what's really driving it?",
      "When did I last do something purely for enjoyment, not accomplishment?",
      "What would I do differently if I knew nobody would judge me?",
      "How can I show up authentically in my relationships today?"
    ],
    color: "#F39C12",
    icon: ""
  },
  {
    number: 4,
    name: "The Individualist",
    alias: "The Romantic",
    brief: "Expressive, dramatic, self-absorbed, and temperamental.",
    description: "Fours are self-aware, sensitive, and reserved. They are emotionally honest, creative, and personal, but can also be moody and self-conscious. Withholding themselves from others due to feeling vulnerable and defective, they can also feel disdainful and exempt from ordinary ways of living. They typically have problems with melancholy, self-indulgence, and self-pity.",
    coreMotivation: "To express themselves and their individuality, to create and surround themselves with beauty, to maintain certain moods and feelings.",
    coreFear: "Of having no identity or personal significance.",
    coreDesire: "To find themselves and their significance, to create an identity.",
    keyTraits: ["Creative", "Sensitive", "Introspective", "Expressive", "Authentic"],
    healthyTraits: ["Inspired", "Creative", "Self-renewing", "Transformative", "Profound"],
    averageTraits: ["Self-absorbed", "Temperamental", "Melancholic", "Envious", "Withdrawn"],
    unhealthyTraits: ["Depressive", "Alienated", "Self-destructive", "Emotionally turbulent", "Hopeless"],
    wings: { left: "4w3 — The Aristocrat", right: "4w5 — The Bohemian" },
    integrationLine: 1,
    disintegrationLine: 2,
    growthTips: [
      "Channel your emotional depth into disciplined creative practice (integration to 1).",
      "Recognize that ordinary moments can be just as meaningful as peak experiences.",
      "Practice gratitude to counter the pull toward melancholy.",
      "Build consistent routines that ground your emotional life.",
      "Remember that your identity doesn't depend on being different."
    ],
    journalPrompts: [
      "What emotion am I holding onto right now? What would happen if I let it go?",
      "What ordinary moment brought me unexpected beauty today?",
      "Am I comparing my inner world to others' outer appearances?",
      "What would my life look like if I stopped searching for what's missing?",
      "How can I use my sensitivity as a strength rather than a burden?"
    ],
    color: "#8E44AD",
    icon: ""
  },
  {
    number: 5,
    name: "The Investigator",
    alias: "The Observer",
    brief: "Perceptive, innovative, secretive, and isolated.",
    description: "Fives are alert, insightful, and curious. They are able to concentrate and focus on developing complex ideas and skills. Independent, innovative, and inventive, they can also become preoccupied with their thoughts and imaginary constructs. They become detached, yet high-strung and intense. They typically have problems with eccentricity, nihilism, and isolation.",
    coreMotivation: "To possess knowledge, to understand the environment, to have everything figured out as a way of defending the self from threats.",
    coreFear: "Of being useless, helpless, or incapable.",
    coreDesire: "To be capable and competent.",
    keyTraits: ["Analytical", "Perceptive", "Innovative", "Independent", "Cerebral"],
    healthyTraits: ["Visionary", "Pioneering", "Perceptive", "Mindful", "Open-minded"],
    averageTraits: ["Detached", "Provocative", "Cerebral", "Eccentric", "Isolated"],
    unhealthyTraits: ["Nihilistic", "Reclusive", "Unstable", "Delusional", "Schizoid"],
    wings: { left: "5w4 — The Iconoclast", right: "5w6 — The Problem Solver" },
    integrationLine: 8,
    disintegrationLine: 7,
    growthTips: [
      "Practice stepping into action rather than endless preparation (integration to 8).",
      "Share your knowledge and inner world with trusted people.",
      "Engage your body through physical activity to balance cerebral tendencies.",
      "Set limits on information gathering — act on what you know.",
      "Allow yourself to need others without seeing it as weakness."
    ],
    journalPrompts: [
      "What am I avoiding by retreating into my mind?",
      "When did I last share something personal with someone I trust?",
      "What would it feel like to act on my knowledge rather than just accumulating more?",
      "How can I be more present in my body today?",
      "What's one way I could engage with the world that excites me?"
    ],
    color: "#3498DB",
    icon: ""
  },
  {
    number: 6,
    name: "The Loyalist",
    alias: "The Skeptic",
    brief: "Engaging, responsible, anxious, and suspicious.",
    description: "Sixes are reliable, hard-working, responsible, and trustworthy. Excellent troubleshooters, they foresee problems and foster cooperation, but can also become defensive, evasive, and anxious—running on stress while complaining about it. They can be cautious and indecisive, but also reactive, defiant, and rebellious. They typically have problems with self-doubt and suspicion.",
    coreMotivation: "To have security and support, to have certainty and reassurance, to test the attitudes of others toward them.",
    coreFear: "Of being without support and guidance, of being unable to survive on their own.",
    coreDesire: "To have security and support.",
    keyTraits: ["Loyal", "Responsible", "Vigilant", "Committed", "Courageous"],
    healthyTraits: ["Self-reliant", "Courageous", "Trusting", "Cooperative", "Stable"],
    averageTraits: ["Anxious", "Suspicious", "Indecisive", "Reactive", "Defensive"],
    unhealthyTraits: ["Paranoid", "Panicky", "Punitive", "Divisive", "Self-defeating"],
    wings: { left: "6w5 — The Defender", right: "6w7 — The Buddy" },
    integrationLine: 9,
    disintegrationLine: 3,
    growthTips: [
      "Practice trusting yourself and your own inner guidance.",
      "Notice when anxiety is driving your decisions rather than wisdom.",
      "Cultivate inner peace and acceptance (integration to 9).",
      "Challenge worst-case-scenario thinking with evidence.",
      "Build self-reliance by taking small risks and celebrating courage."
    ],
    journalPrompts: [
      "What am I afraid of right now? Is this fear based on reality or projection?",
      "When did I last trust myself fully on a decision?",
      "What would courage look like for me today?",
      "How can I distinguish between healthy caution and anxiety?",
      "What support system am I grateful for, and how can I lean into self-trust?"
    ],
    color: "#2C3E50",
    icon: ""
  },
  {
    number: 7,
    name: "The Enthusiast",
    alias: "The Epicure",
    brief: "Spontaneous, versatile, acquisitive, and scattered.",
    description: "Sevens are extroverted, optimistic, versatile, and spontaneous. Playful, high-spirited, and practical, they can also misapply their many talents, becoming over-extended, scattered, and undisciplined. They constantly seek new and exciting experiences, but can become distracted and exhausted by staying on the go. They typically have problems with impatience and impulsiveness.",
    coreMotivation: "To maintain their freedom and happiness, to avoid missing out on worthwhile experiences, to keep themselves excited and occupied.",
    coreFear: "Of being deprived and trapped in pain.",
    coreDesire: "To be satisfied and content, to have their needs fulfilled.",
    keyTraits: ["Enthusiastic", "Versatile", "Spontaneous", "Optimistic", "Adventurous"],
    healthyTraits: ["Joyful", "Grateful", "Accomplished", "Satisfied", "Present"],
    averageTraits: ["Scattered", "Acquisitive", "Excessive", "Restless", "Distracted"],
    unhealthyTraits: ["Impulsive", "Escapist", "Manic", "Addictive", "Reckless"],
    wings: { left: "7w6 — The Entertainer", right: "7w8 — The Realist" },
    integrationLine: 5,
    disintegrationLine: 1,
    growthTips: [
      "Practice staying with one thing deeply rather than moving to the next (integration to 5).",
      "Allow yourself to sit with discomfort instead of distracting from it.",
      "Cultivate gratitude for what you have rather than craving what's next.",
      "Develop focus and follow-through on commitments.",
      "Recognize that true fulfillment comes from depth, not breadth."
    ],
    journalPrompts: [
      "What am I running from by staying so busy?",
      "What would happen if I sat still with my thoughts for 10 minutes?",
      "What commitment have I been avoiding, and what's really holding me back?",
      "What do I already have that I haven't fully appreciated?",
      "When was the last time I felt truly present and satisfied in a moment?"
    ],
    color: "#E67E22",
    icon: ""
  },
  {
    number: 8,
    name: "The Challenger",
    alias: "The Protector",
    brief: "Self-confident, decisive, willful, and confrontational.",
    description: "Eights are self-confident, strong, and assertive. Protective, resourceful, straight-talking, and decisive, but can also be ego-centric and domineering. Eights feel they must control their environment, especially people, sometimes becoming confrontational and intimidating. They typically have problems with their tempers and with allowing themselves to be vulnerable.",
    coreMotivation: "To protect themselves, to determine their own course in life, to be strong and resist weakness.",
    coreFear: "Of being harmed or controlled by others.",
    coreDesire: "To protect themselves and be in control of their own life.",
    keyTraits: ["Powerful", "Decisive", "Protective", "Direct", "Self-confident"],
    healthyTraits: ["Magnanimous", "Heroic", "Merciful", "Forbearing", "Courageous"],
    averageTraits: ["Domineering", "Confrontational", "Intimidating", "Combative", "Willful"],
    unhealthyTraits: ["Ruthless", "Dictatorial", "Destructive", "Vengeful", "Megalomaniacal"],
    wings: { left: "8w7 — The Maverick", right: "8w9 — The Bear" },
    integrationLine: 2,
    disintegrationLine: 5,
    growthTips: [
      "Practice vulnerability with people you trust.",
      "Channel your power into caring for others (integration to 2).",
      "Notice when you're using control to avoid feeling vulnerable.",
      "Develop patience and listen before reacting.",
      "Recognize that true strength includes tenderness."
    ],
    journalPrompts: [
      "What am I protecting myself from right now?",
      "When did I last let someone see my vulnerable side?",
      "How can I use my strength to empower others today?",
      "What would gentleness look like in my current situation?",
      "Am I controlling because I'm strong, or because I'm afraid?"
    ],
    color: "#C0392B",
    icon: ""
  },
  {
    number: 9,
    name: "The Peacemaker",
    alias: "The Mediator",
    brief: "Receptive, reassuring, agreeable, and complacent.",
    description: "Nines are accepting, trusting, and stable. They are usually creative, optimistic, and supportive, but can also be too willing to go along with others to keep the peace. They want everything to go smoothly and be without conflict, but they can also tend to be complacent, simplifying problems and minimizing anything upsetting. They typically have problems with inertia and stubbornness.",
    coreMotivation: "To have inner stability, peace of mind, to create harmony in their environment, to avoid conflict.",
    coreFear: "Of loss and separation, of annihilation.",
    coreDesire: "To have inner stability and peace of mind.",
    keyTraits: ["Peaceful", "Easygoing", "Receptive", "Agreeable", "Supportive"],
    healthyTraits: ["Self-possessed", "Dynamic", "Healing", "Serene", "Connected"],
    averageTraits: ["Complacent", "Passive-aggressive", "Disengaged", "Stubborn", "Numb"],
    unhealthyTraits: ["Neglectful", "Dissociated", "Helpless", "Depersonalized", "Obstinate"],
    wings: { left: "9w8 — The Referee", right: "9w1 — The Dreamer" },
    integrationLine: 3,
    disintegrationLine: 6,
    growthTips: [
      "Practice asserting your own needs and preferences.",
      "Take action on your goals rather than merging with others' agendas (integration to 3).",
      "Notice when you're numbing out or going on autopilot.",
      "Develop your own passions and sense of purpose.",
      "Recognize that healthy conflict can lead to deeper connection."
    ],
    journalPrompts: [
      "What do I actually want, separate from what others want for me?",
      "Where in my life am I on autopilot?",
      "What conflict am I avoiding, and what would happen if I addressed it?",
      "What goal have I been putting off that matters to me?",
      "How can I show up more fully and energetically today?"
    ],
    color: "#1ABC9C",
    icon: ""
  }
];

// Questionnaire based on discriminating constructs from Riso-Hudson (RHETI validation),
// Naranjo's character & neurosis, and Wagner Enneagram Personality Style Scales (WEPSS).
// Items target core motivations, defense mechanisms, and fixations rather than
// surface behaviors, which reduces social desirability bias and cross-type contamination.
export const enneagramQuestions = [
  {
    id: 1,
    text: "When you look honestly at what drives most of your behavior, which is closest?",
    options: [
      { text: "A need to avoid being wrong, corrupt, or falling short of my own standards", scores: { 1: 3 } },
      { text: "A need to feel that specific people love and need me personally", scores: { 2: 3 } },
      { text: "A need to feel valuable through what I accomplish and how I'm perceived", scores: { 3: 3 } },
      { text: "A need to find and express my authentic identity, distinct from everyone else", scores: { 4: 3 } }
    ]
  },
  {
    id: 2,
    text: "Continuing — which of these core drives feels most honest?",
    options: [
      { text: "A need to understand how things work so I feel prepared for the world", scores: { 5: 3 } },
      { text: "A need for certainty, security, and knowing where I stand", scores: { 6: 3 } },
      { text: "A need to stay free, stimulated, and never trapped in pain or deprivation", scores: { 7: 3 } },
      { text: "A need to be strong, autonomous, and never at the mercy of others", scores: { 8: 3 } }
    ]
  },
  {
    id: 3,
    text: "When you are most stressed, which pattern do you fall into?",
    options: [
      { text: "I become rigidly critical — of myself and everyone around me", scores: { 1: 3 } },
      { text: "I become possessive and intrusive — I need to be needed more intensely", scores: { 2: 3 } },
      { text: "I merge with others' agendas and go numb to my own desires and anger", scores: { 9: 3 } },
      { text: "I become scattered and impulsive — I grab at whatever promises relief", scores: { 7: 3 } }
    ]
  },
  {
    id: 4,
    text: "Which inner experience feels most chronically present for you?",
    options: [
      { text: "A constant inner evaluator comparing what IS to what SHOULD BE", scores: { 1: 3 } },
      { text: "A sense that others have something essential that I'm missing", scores: { 4: 3 } },
      { text: "A scanning vigilance — checking for hidden threats or inconsistencies", scores: { 6: 3 } },
      { text: "A feeling that the world is intrusive and I must protect my inner resources", scores: { 5: 3 } }
    ]
  },
  {
    id: 5,
    text: "Which describes your relationship with anger most honestly?",
    options: [
      { text: "I experience anger as simmering resentment that I try to control because expressing it feels wrong", scores: { 1: 3 } },
      { text: "I express anger directly and forcefully — I'd rather be too much than too weak", scores: { 8: 3 } },
      { text: "I rarely feel angry — I tend to go along with things and avoid rocking the boat", scores: { 9: 3 } },
      { text: "My anger comes out as anxious reactivity — I get defensive before I realize I'm angry", scores: { 6: 3 } }
    ]
  },
  {
    id: 6,
    text: "When you receive criticism, what is your deepest internal response?",
    options: [
      { text: "I feel shame that I wasn't good enough and redouble my effort to be beyond reproach", scores: { 1: 3 } },
      { text: "I feel hurt that my giving and caring wasn't recognized or valued", scores: { 2: 3 } },
      { text: "I feel threatened — is this person trustworthy? What are they really after?", scores: { 6: 3 } },
      { text: "I feel exposed — like they've seen something deficient in me that I can't fix", scores: { 4: 3 } }
    ]
  },
  {
    id: 7,
    text: "Which defense mechanism do you recognize most in yourself?",
    options: [
      { text: "Transforming unacceptable impulses into their opposite — wanting to be lazy but becoming compulsively productive", scores: { 1: 3 } },
      { text: "Pushing my own needs out of awareness so I can focus on being there for others", scores: { 2: 3 } },
      { text: "Becoming so identified with my role or image that I lose track of my actual feelings", scores: { 3: 3 } },
      { text: "Separating my thinking from my feeling — I can analyze emotions without actually experiencing them", scores: { 5: 3 } }
    ]
  },
  {
    id: 8,
    text: "Which defense mechanism do you recognize most in yourself?",
    options: [
      { text: "Absorbing emotional experiences and making them part of my identity rather than processing and releasing them", scores: { 4: 3 } },
      { text: "Attributing my own inner states onto others — seeing my fears or aggression as coming from them", scores: { 6: 3 } },
      { text: "Using mental agility to reframe negatives as positives, finding silver linings to avoid sitting with pain", scores: { 7: 3 } },
      { text: "Refusing to acknowledge vulnerability, tenderness, or the impact of my intensity on others", scores: { 8: 3 } }
    ]
  },
  {
    id: 9,
    text: "Which statement about your self-image is most true?",
    options: [
      { text: "I see myself as a reasonable, principled person who maintains higher standards than most", scores: { 1: 3 } },
      { text: "I see myself as a generous, caring person who is more attuned to others' needs than most people are", scores: { 2: 3 } },
      { text: "I see myself as a competent, effective person who can succeed at whatever I set my mind to", scores: { 3: 3 } },
      { text: "I see myself as a unique, emotionally complex person who experiences life more deeply than most", scores: { 4: 3 } }
    ]
  },
  {
    id: 10,
    text: "Which statement about your self-image is most true?",
    options: [
      { text: "I see myself as a perceptive, independent thinker who understands things others miss", scores: { 5: 3 } },
      { text: "I see myself as a loyal, responsible person who anticipates problems before they happen", scores: { 6: 3 } },
      { text: "I see myself as an enthusiastic, versatile person who makes the most of life's possibilities", scores: { 7: 3 } },
      { text: "I see myself as a strong, direct person who protects the people and causes I believe in", scores: { 8: 3 } }
    ]
  },
  {
    id: 11,
    text: "What happens when you feel overwhelmed?",
    options: [
      { text: "I detach emotionally and retreat into my mind to analyze the situation from a safe distance", scores: { 5: 3 } },
      { text: "I numb out through comfortable routines — food, TV, sleep — anything to avoid the intensity", scores: { 9: 3 } },
      { text: "I get busy — I channel the overwhelm into productive action so I don't have to feel it", scores: { 3: 3 } },
      { text: "I seek out someone who can absorb my emotional intensity and hold space for me", scores: { 4: 2, 6: 1 } }
    ]
  },
  {
    id: 12,
    text: "What is the deepest fear you avoid confronting?",
    options: [
      { text: "That I am fundamentally flawed or corrupt at my core", scores: { 1: 3 } },
      { text: "That without my helpfulness, nobody would actually want me around", scores: { 2: 3 } },
      { text: "That beneath my accomplishments, I have no inherent value as a person", scores: { 3: 3 } },
      { text: "That I am fundamentally deficient — that everyone else got something I was denied", scores: { 4: 3 } }
    ]
  },
  {
    id: 13,
    text: "What is the deepest fear you avoid confronting?",
    options: [
      { text: "That the world will overwhelm and deplete me if I don't vigilantly guard my resources", scores: { 5: 3 } },
      { text: "That I can't trust my own judgment and am unable to survive on my own", scores: { 6: 3 } },
      { text: "That if I stop moving and face my inner experience, I'll be trapped in unbearable pain", scores: { 7: 3 } },
      { text: "That showing vulnerability will allow others to control or destroy me", scores: { 8: 3 } }
    ]
  },
  {
    id: 14,
    text: "Which describes your experience of personal identity most accurately?",
    options: [
      { text: "I have a strong moral identity — I know what's right, and that certainty defines me", scores: { 1: 3 } },
      { text: "My identity shifts depending on context — I become what the situation needs me to be", scores: { 3: 2, 9: 1 } },
      { text: "My identity is built on being different, authentic, and emotionally deep", scores: { 4: 3 } },
      { text: "I sometimes feel like I don't have a clear identity at all — I merge with others' perspectives", scores: { 9: 3 } }
    ]
  },
  {
    id: 15,
    text: "How do you relate to the concept of 'enough'?",
    options: [
      { text: "Nothing is ever quite good enough — there's always a way it could be better", scores: { 1: 3 } },
      { text: "I never give enough — I could always do more for the people I care about", scores: { 2: 3 } },
      { text: "I never achieve enough — there's always the next level to reach", scores: { 3: 3 } },
      { text: "I never have enough depth — ordinary experience feels insufficient", scores: { 4: 3 } }
    ]
  },
  {
    id: 16,
    text: "How do you relate to the concept of 'enough'?",
    options: [
      { text: "I never know enough — there's always more I need to understand before I can act", scores: { 5: 3 } },
      { text: "I'm never certain enough — there's always another variable I haven't accounted for", scores: { 6: 3 } },
      { text: "I never have enough options — closing a door feels like losing a possibility forever", scores: { 7: 3 } },
      { text: "Nothing is ever intense enough — I keep pushing for more impact, more life, more everything", scores: { 8: 3 } }
    ]
  },
  {
    id: 17,
    text: "When a close relationship ends, what is your most immediate internal response?",
    options: [
      { text: "I analyze what went wrong — where did I fail to live up to the standard?", scores: { 1: 2, 5: 1 } },
      { text: "I feel abandoned and unlovable — clearly I wasn't needed enough", scores: { 2: 3 } },
      { text: "I immediately start building a narrative about what I lost — the beautiful tragedy of it", scores: { 4: 3 } },
      { text: "I distract myself quickly — I don't want to sit in this pain", scores: { 7: 2, 3: 1 } }
    ]
  },
  {
    id: 18,
    text: "When a close relationship ends, what is your most immediate internal response?",
    options: [
      { text: "I withdraw and need extensive alone time to process — people are exhausting right now", scores: { 5: 3 } },
      { text: "I question everything — was this person ever really trustworthy?", scores: { 6: 3 } },
      { text: "I get angry — no one walks away from me without consequences", scores: { 8: 3 } },
      { text: "I feel the loss but try to be okay with it — getting upset won't help anyone", scores: { 9: 3 } }
    ]
  },
];

