// Instinctual Variants & Subtypes based on Beatrice Chestnut's framework
// and corroborated by Claudio Naranjo's character and neurosis work

export interface InstinctualVariant {
  code: "sp" | "sx" | "so";
  name: string;
  fullName: string;
  description: string;
  coreDrive: string;
  focus: string[];
  strengths: string[];
  blindSpots: string[];
}

export interface Subtype {
  type: number;
  instinct: "sp" | "sx" | "so";
  name: string;
  chestnutName: string; // Beatrice Chestnut's specific name
  isCountertype: boolean;
  description: string;
  keyPatterns: string[];
  howTheyDiffer: string; // How this subtype differs from the other subtypes of the same type
  growthPath: string;
}

export interface InstinctualStacking {
  code: string;
  name: string;
  description: string;
  dominant: string;
  secondary: string;
  blind: string;
  characteristics: string[];
}

export const instinctualVariants: InstinctualVariant[] = [
  {
    code: "sp",
    name: "Self-Preservation",
    fullName: "Self-Preservation Instinct",
    description: "The self-preservation instinct orients attention toward physical survival, material security, comfort, health, and practical wellbeing. SP-dominant individuals are attuned to their bodies, their environment, and the resources needed to sustain life. This is the most grounded and practically oriented of the three instincts.",
    coreDrive: "Ensuring physical survival, comfort, security, and material wellbeing.",
    focus: [
      "Physical health, energy levels, and bodily comfort",
      "Financial security, resources, and material stability",
      "Home environment — safety, warmth, nourishment",
      "Routines and habits that maintain wellbeing",
      "Self-sufficiency and practical preparedness"
    ],
    strengths: ["Grounded and practical", "Self-sufficient", "Good at resource management", "Attuned to physical needs", "Reliable and steady"],
    blindSpots: ["May neglect social connections or intimate bonding", "Can become overly focused on comfort/security", "May hoard resources or energy", "Risk of insularity or self-containment"]
  },
  {
    code: "sx",
    name: "Sexual / One-to-One",
    fullName: "Sexual (One-to-One) Instinct",
    description: "The sexual instinct (also called one-to-one or intimate) drives attention toward intense connection, chemistry, attraction, and fusion with another person or experience. SX-dominant individuals seek intensity, aliveness, and deep energetic exchange. They are drawn to what is compelling, magnetic, and transformative. This instinct is about merging, not necessarily romance — it seeks the spark of vital connection in all domains.",
    coreDrive: "Seeking intense connection, chemistry, attraction, and experiences of aliveness and fusion.",
    focus: [
      "Intensity of experience and energetic charge",
      "Deep one-to-one bonds and intimate connection",
      "Attraction, magnetism, and chemistry with others",
      "Transformation and experiences that feel alive",
      "Being chosen, desired, or deeply seen by another"
    ],
    strengths: ["Passionate and intense", "Deeply present in connections", "Charismatic and magnetic", "Transformative energy", "Courage to pursue what they desire"],
    blindSpots: ["May neglect practical matters for intensity", "Can become obsessive or consuming in relationships", "May struggle with group dynamics", "Risk of burnout from constant intensity-seeking"]
  },
  {
    code: "so",
    name: "Social",
    fullName: "Social Instinct",
    description: "The social instinct orients attention toward the group, community, belonging, social roles, and one's place in the larger social structure. SO-dominant individuals are attuned to group dynamics, hierarchies, shared values, and their contribution to something larger than themselves. This is not simply being 'sociable' — it is about reading social systems and finding where one belongs.",
    coreDrive: "Securing belonging, understanding social systems, contributing to community, and finding one's role in the group.",
    focus: [
      "Group dynamics, social hierarchies, and belonging",
      "Contribution to community and shared purpose",
      "Social roles, status, and influence",
      "Reading the room — sensing group needs and norms",
      "Building networks and maintaining social bonds"
    ],
    strengths: ["Socially aware and adaptive", "Community-minded", "Good at reading group dynamics", "Collaborative and inclusive", "Oriented toward shared purpose"],
    blindSpots: ["May lose individual identity in group", "Can be overly concerned with social position", "May neglect intimate one-to-one depth", "Risk of conformity or people-reading exhaustion"]
  }
];

export const instinctualStackings: InstinctualStacking[] = [
  {
    code: "sp/sx",
    name: "Self-Preservation / Sexual",
    description: "Grounded intensity. These individuals build secure foundations from which they pursue deep, intimate connections. They are selective and private, preferring depth over breadth in relationships. They combine practical self-sufficiency with passionate inner lives.",
    dominant: "Self-Preservation",
    secondary: "Sexual",
    blind: "Social",
    characteristics: [
      "Private and selective about who gets close",
      "Build secure material foundations, then seek deep intimacy",
      "May appear reserved publicly but are intensely passionate privately",
      "Can be oblivious to group dynamics or social expectations",
      "Prefer one-on-one connections over social gatherings",
      "Often described as 'a private world of two'"
    ]
  },
  {
    code: "sp/so",
    name: "Self-Preservation / Social",
    description: "The builder and contributor. These individuals secure their own wellbeing and then orient toward group contribution. They are responsible community members who ensure practical needs are met. They tend to be reliable, steady, and focused on creating stable social structures.",
    dominant: "Self-Preservation",
    secondary: "Social",
    blind: "Sexual",
    characteristics: [
      "Responsible and community-oriented from a practical base",
      "Focus on building stable systems that serve the group",
      "May struggle with intense one-to-one intimacy",
      "Prefer structured social engagement over chaotic intensity",
      "Value reliability, contribution, and mutual support",
      "Can appear warm but maintain emotional boundaries"
    ]
  },
  {
    code: "sx/sp",
    name: "Sexual / Self-Preservation",
    description: "Intense and grounded. These individuals lead with passionate intensity but have a strong self-preservation backup that keeps them resourced and sustainable. They pursue deep connections while maintaining physical and material boundaries. They are magnetic but self-contained.",
    dominant: "Sexual",
    secondary: "Self-Preservation",
    blind: "Social",
    characteristics: [
      "Intensely passionate but with practical grounding",
      "Seek transformative connections while maintaining boundaries",
      "Can be fiercely independent despite craving intimacy",
      "May be oblivious to social norms or group expectations",
      "Combine magnetism with self-sufficiency",
      "Tend to live outside conventional social structures"
    ]
  },
  {
    code: "sx/so",
    name: "Sexual / Social",
    description: "Charismatic and connected. These individuals lead with intensity and passion but direct it outward into social contexts. They are often the most visibly charismatic of all stackings — bringing sexual energy into group settings. They seek to be deeply seen and to have impact on their communities.",
    dominant: "Sexual",
    secondary: "Social",
    blind: "Self-Preservation",
    characteristics: [
      "Charismatic presence that commands attention in groups",
      "Bring intensity and passion to social causes or communities",
      "May neglect physical self-care or practical matters",
      "Seek deep connections AND broad social impact",
      "Often drawn to leadership, performance, or activism",
      "Can burn bright but struggle with sustainability"
    ]
  },
  {
    code: "so/sp",
    name: "Social / Self-Preservation",
    description: "The responsible social architect. These individuals read social systems expertly and combine this with practical self-sufficiency. They build stable communities and institutions. They are often the backbone of organizations — reliable, connected, and purpose-driven.",
    dominant: "Social",
    secondary: "Self-Preservation",
    blind: "Sexual",
    characteristics: [
      "Skilled at building and maintaining social structures",
      "Combine social awareness with practical reliability",
      "May struggle with intense intimate vulnerability",
      "Focus on contribution, duty, and social responsibility",
      "Value community stability and shared resources",
      "Can appear warm and engaged but emotionally measured"
    ]
  },
  {
    code: "so/sx",
    name: "Social / Sexual",
    description: "The passionate connector. These individuals navigate social systems with an intensity and depth that goes beyond surface-level belonging. They bring charisma to group settings and seek meaningful, transformative social bonds. They want to be deeply known within their communities.",
    dominant: "Social",
    secondary: "Sexual",
    blind: "Self-Preservation",
    characteristics: [
      "Seek deep, meaningful connections within groups",
      "Bring passion and intensity to social engagement",
      "May neglect practical self-care for social/intimate pursuits",
      "Want to be deeply known and valued in community",
      "Combine social awareness with magnetic presence",
      "Often drawn to causes that fuse personal passion with group impact"
    ]
  }
];

// 27 Subtypes based on Beatrice Chestnut's Complete Enneagram framework
// and Claudio Naranjo's character and neurosis descriptions
export const subtypes: Subtype[] = [
  // ===== TYPE 1 =====
  {
    type: 1,
    instinct: "sp",
    name: "SP One — Worry",
    chestnutName: "Worry",
    isCountertype: false,
    description: "The self-preservation One channels their inner critic toward anxiety about getting things right in the material world. Rather than expressing anger outward, they worry — constantly reviewing whether they have done enough, prepared enough, or lived up to their own standards. They are the most anxious of the Ones, resembling Sixes in their vigilance. Chestnut describes them as the true perfectionist — they are hard on themselves internally and manage their anger through self-control and worry rather than overt criticism of others.",
    keyPatterns: [
      "Intense inner critic focused on personal conduct and preparedness",
      "Anxiety expressed as worry, over-preparation, and self-doubt",
      "Controlled, contained anger — rarely expressed outwardly",
      "Focus on material security, health, and doing things correctly",
      "Can appear warm and accommodating despite internal rigidity",
      "Resemble Type 6 in their vigilance and anticipatory anxiety"
    ],
    howTheyDiffer: "Unlike Social Ones who focus on being right in the eyes of the group, or Sexual Ones who reform others, SP Ones direct their perfectionism inward as worry and self-monitoring.",
    growthPath: "Learning to tolerate imperfection, recognizing that worry is a form of controlled anger, and allowing themselves to relax into 'good enough.'"
  },
  {
    type: 1,
    instinct: "sx",
    name: "SX One — Zeal",
    chestnutName: "Zeal",
    isCountertype: true,
    description: "The sexual One is the countertype — they express their reforming energy outward with intensity and passion. Rather than containing their anger like the other Ones, they feel entitled to express it in service of improving others and the world. They have a missionary quality, wanting to perfect the people closest to them. Chestnut describes this as the One who is more openly angry and who focuses their reforming zeal on intimate relationships and close others. They can resemble Type 8 in their directness.",
    keyPatterns: [
      "Countertype: more openly expressive of anger and reforming energy",
      "Zeal and passion directed at improving others, especially intimates",
      "More intense and assertive than other Ones — can resemble Type 8",
      "Feel entitled to express frustration when standards aren't met",
      "Missionary quality — want to reform through passionate engagement",
      "More willing to challenge others directly"
    ],
    howTheyDiffer: "The countertype of One — while SP Ones worry internally and SO Ones model correctness, SX Ones actively try to reform others with passionate intensity.",
    growthPath: "Recognizing that their zeal can overwhelm others, learning that acceptance is as powerful as reform, and channeling intensity into self-improvement rather than other-improvement."
  },
  {
    type: 1,
    instinct: "so",
    name: "SO One — Inadaptability",
    chestnutName: "Inadaptability / Non-Adaptability",
    isCountertype: false,
    description: "The social One focuses their perfectionism on being the model of correct behavior in social contexts. They embody the superego of the group — representing the right way to do things, the proper standards, and the moral high ground. Chestnut describes them as rigid in their adherence to social norms and standards, making themselves the example others should follow. They have difficulty adapting to situations that conflict with their principles.",
    keyPatterns: [
      "Focus on being the model of correct behavior for the group",
      "Rigid adherence to social norms, standards, and principles",
      "Represent the superego — the moral authority in social settings",
      "Difficulty adapting when situations conflict with their values",
      "Teacher/preacher energy — instructing others through example",
      "Can become self-righteous or inflexible in group contexts"
    ],
    howTheyDiffer: "While SP Ones worry internally and SX Ones reform intimates, SO Ones position themselves as the moral exemplar for the broader community.",
    growthPath: "Learning flexibility, recognizing that multiple valid perspectives exist, and allowing others to find their own right way."
  },

  // ===== TYPE 2 =====
  {
    type: 2,
    instinct: "sp",
    name: "SP Two — Privilege",
    chestnutName: "Privilege / Me-First",
    isCountertype: true,
    description: "The self-preservation Two is the countertype — rather than giving to get love, they charm others into giving to them. This is the most childlike and entitled of the Twos. Chestnut describes them as having learned early that being cute, charming, or helpless gets their needs met without having to ask directly. They have an implicit expectation that others should take care of them. They can resemble Type 7 in their light, playful energy and avoidance of heaviness.",
    keyPatterns: [
      "Countertype: seeks to receive rather than give — uses charm to get needs met",
      "Childlike, playful, and endearing — ambivalent about growing up",
      "Implicit entitlement — expects care without asking directly",
      "Fear of being burdened or overwhelmed by others' needs",
      "Can resemble Type 7 in lightness and avoidance of pain",
      "Uses attractiveness and helplessness as strategies"
    ],
    howTheyDiffer: "The countertype — while SX Twos seduce and SO Twos serve the group, SP Twos reverse the giving pattern entirely, positioning themselves as the one who should be taken care of.",
    growthPath: "Learning to ask directly for what they need, developing genuine self-sufficiency, and recognizing the manipulation in being 'helplessly' charming."
  },
  {
    type: 2,
    instinct: "sx",
    name: "SX Two — Seduction",
    chestnutName: "Seduction / Aggression-Seduction",
    isCountertype: false,
    description: "The sexual Two is the seducer — they use emotional and sometimes physical attraction to draw people in and create irresistible bonds. This is the most emotionally intense and powerful Two. Chestnut describes them as having a wild, passionate quality. They attract others through their emotional generosity and personal magnetism, but underneath is a drive to be the most important person in someone's life. They can resemble Type 8 in their forcefulness.",
    keyPatterns: [
      "Uses emotional intensity and attraction to create bonds",
      "Most powerful and willful of the Twos — can resemble Type 8",
      "Seduces through emotional generosity, warmth, and magnetism",
      "Driven need to be the most important person in someone's life",
      "Wild, passionate quality — more overtly assertive than other Twos",
      "Can become possessive or controlling in intimate relationships"
    ],
    howTheyDiffer: "SX Twos are the most intense and directly seductive — while SP Twos charm passively and SO Twos serve ambitiously, SX Twos actively pursue deep emotional conquest.",
    growthPath: "Learning that love doesn't require conquest, developing the ability to receive love without earning it through seduction, and finding self-worth independent of being desired."
  },
  {
    type: 2,
    instinct: "so",
    name: "SO Two — Ambition",
    chestnutName: "Ambition",
    isCountertype: false,
    description: "The social Two gains love and approval by being indispensable to powerful people, groups, and institutions. They are strategic helpers who position themselves at the center of social networks. Chestnut describes them as the most ambitious of the Twos — they give strategically to gain influence, status, and connection to power. They can resemble Type 3 in their drive for achievement and social positioning.",
    keyPatterns: [
      "Strategic giving aimed at gaining social influence and status",
      "Positions themselves as indispensable to powerful people/groups",
      "Most ambitious and socially strategic of the Twos",
      "Can resemble Type 3 in their achievement orientation",
      "Builds networks through generosity and helpfulness",
      "Power behind the throne — influences through service"
    ],
    howTheyDiffer: "SO Twos channel their giving toward social power and influence, while SP Twos seek to receive and SX Twos seek intimate conquest.",
    growthPath: "Recognizing the strategic motivation behind their giving, learning to contribute without expecting status in return, and owning their ambition directly."
  },

  // ===== TYPE 3 =====
  {
    type: 3,
    instinct: "sp",
    name: "SP Three — Security",
    chestnutName: "Security",
    isCountertype: true,
    description: "The self-preservation Three is the countertype — they work hard but don't want to be seen doing it. They are the most modest and self-effacing of the Threes, driven to achieve material security through quiet, efficient effort. Chestnut describes them as wanting to appear good without appearing vain. They are workhorses who deny their desire for recognition, which makes them look less like typical Threes. They can resemble Types 1 or 6 in their conscientiousness.",
    keyPatterns: [
      "Countertype: achieves without wanting to appear vain or image-focused",
      "Most modest and self-effacing of the Threes",
      "Driven by material security rather than visible status",
      "Works extremely hard but downplays accomplishments",
      "Can resemble Type 1 (conscientiousness) or Type 6 (anxiety about security)",
      "Denies vanity — uncomfortable with self-promotion"
    ],
    howTheyDiffer: "The countertype — while SX Threes project an attractive image and SO Threes seek prestige, SP Threes achieve quietly and deny their desire for recognition.",
    growthPath: "Owning their accomplishments, recognizing that modesty can be its own form of image management, and learning to be seen authentically."
  },
  {
    type: 3,
    instinct: "sx",
    name: "SX Three — Charisma",
    chestnutName: "Charisma / Masculinity-Femininity",
    isCountertype: false,
    description: "The sexual Three focuses on projecting an attractive, desirable image in intimate contexts. They shape-shift to become what their desired person finds most appealing. Chestnut describes them as focused on being attractive according to cultural ideals of masculinity or femininity. They have natural charisma and use it to win over specific individuals. They can lose themselves entirely in the image they project for others.",
    keyPatterns: [
      "Projects an attractive, desirable image tailored to specific people",
      "Natural charisma used to win over desired individuals",
      "Shape-shifts to embody cultural ideals of attractiveness",
      "Can lose authentic self entirely in projected image",
      "Most personally charming and seductive of the Threes",
      "Focused on being chosen, desired, and admired one-to-one"
    ],
    howTheyDiffer: "SX Threes project their image for intimate conquest, while SP Threes achieve quietly and SO Threes seek group prestige.",
    growthPath: "Discovering who they actually are beneath the projected image, learning that authentic vulnerability is more attractive than performance."
  },
  {
    type: 3,
    instinct: "so",
    name: "SO Three — Prestige",
    chestnutName: "Prestige",
    isCountertype: false,
    description: "The social Three is the classic achiever archetype — driven by status, prestige, and social recognition. They are acutely aware of how they appear in the eyes of the group and craft their image accordingly. Chestnut describes them as the most competitive and status-conscious of the Threes. They seek to climb social hierarchies and be recognized as successful by their community. They are the prototype of the Three description.",
    keyPatterns: [
      "Driven by status, prestige, and public recognition",
      "Most competitive and socially ambitious of the Threes",
      "Acutely aware of social hierarchies and positioning",
      "Crafts image for maximum social impact and credibility",
      "Prototype of the classic Three description",
      "Measures worth through external markers of success"
    ],
    howTheyDiffer: "SO Threes are the most visibly status-driven, while SP Threes achieve modestly and SX Threes project charisma one-on-one.",
    growthPath: "Recognizing that status and worth are not the same thing, learning to value internal satisfaction over external recognition."
  },

  // ===== TYPE 4 =====
  {
    type: 4,
    instinct: "sp",
    name: "SP Four — Tenacity",
    chestnutName: "Tenacity / Dauntless",
    isCountertype: true,
    description: "The self-preservation Four is the countertype — rather than dramatizing their suffering, they endure it silently with stoic toughness. They are the least emotionally expressive of the Fours, learning to do without and to bear pain without complaint. Chestnut describes them as having a masochistic quality — they prove their worth through their ability to suffer and endure. They can resemble Type 1 in their self-discipline or Type 5 in their containment.",
    keyPatterns: [
      "Countertype: endures suffering silently rather than expressing it",
      "Stoic, tough, and self-disciplined — least 'emotional' of the Fours",
      "Proves worth through capacity to endure hardship without complaining",
      "Can resemble Type 1 (self-discipline) or Type 5 (emotional containment)",
      "Learns to do without — denies themselves pleasure or comfort",
      "Masochistic quality — suffering as a badge of authenticity"
    ],
    howTheyDiffer: "The countertype — while SX Fours express suffering intensely and SO Fours compare themselves to others, SP Fours internalize suffering and endure it stoically.",
    growthPath: "Allowing themselves to have needs and comfort, recognizing that endurance is not the same as authenticity, and learning to ask for support."
  },
  {
    type: 4,
    instinct: "sx",
    name: "SX Four — Competition",
    chestnutName: "Competition / Hate",
    isCountertype: false,
    description: "The sexual Four is the most intense and emotionally volatile of the Fours. Rather than internalizing their pain like SP Fours, they externalize it — making others feel their suffering through intensity, competition, and sometimes rage. Chestnut describes them as having an envious, competitive quality that drives them to make others feel inferior. They can resemble Type 8 in their intensity and willingness to confront. This is the 'hate' subtype — they express the anger of envy outwardly.",
    keyPatterns: [
      "Most emotionally intense and volatile of the Fours",
      "Externalizes suffering — makes others feel their pain",
      "Competitive and envious — driven to prove superiority",
      "Can resemble Type 8 in intensity and confrontational energy",
      "Expresses the anger of envy outwardly — the 'hate' subtype",
      "Demands to be seen as special through emotional force"
    ],
    howTheyDiffer: "SX Fours externalize their pain through intensity and competition, while SP Fours endure silently and SO Fours suffer through social comparison.",
    growthPath: "Learning that intensity is not the same as depth, channeling competitive energy into creative expression rather than interpersonal drama."
  },
  {
    type: 4,
    instinct: "so",
    name: "SO Four — Shame",
    chestnutName: "Shame",
    isCountertype: false,
    description: "The social Four experiences their core wound through the lens of social comparison — constantly measuring themselves against others and finding themselves lacking. They carry deep shame about their perceived deficiency. Chestnut describes them as focused on what they don't have that others do, leading to chronic feelings of inadequacy in social settings. They tend to be more sensitive and openly emotional than SP Fours, but less aggressive than SX Fours.",
    keyPatterns: [
      "Chronic social comparison — measuring self against others",
      "Deep shame about perceived deficiency or inadequacy",
      "Focused on what they lack that others seem to have",
      "More openly emotional and vulnerable than SP Fours",
      "Tends toward melancholy and wistful longing in groups",
      "Can become stuck in the victim role through social comparison"
    ],
    howTheyDiffer: "SO Fours experience their core wound through social comparison, while SP Fours endure silently and SX Fours externalize through competition.",
    growthPath: "Recognizing that comparison is a trap, learning to appreciate their unique gifts without measuring against others, and finding belonging despite feeling different."
  },

  // ===== TYPE 5 =====
  {
    type: 5,
    instinct: "sp",
    name: "SP Five — Castle",
    chestnutName: "Castle / Home",
    isCountertype: false,
    description: "The self-preservation Five builds walls — both literal and metaphorical — to protect their limited energy and resources. They are the most withdrawn and boundaried of the Fives, needing clear physical and emotional space. Chestnut describes them as having a 'castle' mentality — they create safe, contained environments where they can retreat from the demands of the world. They are highly aware of what they need to survive and minimize their requirements to maintain maximum independence.",
    keyPatterns: [
      "Builds strong boundaries — literal and metaphorical walls",
      "Most withdrawn and private of the Fives",
      "Creates a 'castle' — a safe, contained personal environment",
      "Minimizes needs to maintain independence from others",
      "Highly aware of energy expenditure and resource conservation",
      "Can become extremely isolated and self-contained"
    ],
    howTheyDiffer: "SP Fives are the most withdrawn and boundaried, while SX Fives seek intensity through intimate sharing and SO Fives connect through intellectual communities.",
    growthPath: "Learning to let others into their castle, recognizing that connection doesn't deplete — it can actually replenish."
  },
  {
    type: 5,
    instinct: "sx",
    name: "SX Five — Confidence",
    chestnutName: "Confidence / Confidentiality",
    isCountertype: true,
    description: "The sexual Five is the countertype — rather than withdrawing from all connection, they seek one or two deeply intimate relationships where they can share their rich inner world. This is the most emotionally connected and romantically oriented Five. Chestnut describes them as seeking a trusted confidant with whom they can share everything — their deepest thoughts, their vulnerabilities, their secret inner landscape. They can resemble Type 4 in their emotional depth and desire for authentic connection.",
    keyPatterns: [
      "Countertype: seeks deep intimate connection rather than total withdrawal",
      "Searches for one trusted confidant to share their entire inner world",
      "Most emotionally connected and romantically oriented Five",
      "Can resemble Type 4 in emotional depth and authenticity seeking",
      "Shares their hidden inner landscape with select intimates",
      "Idealizes the perfect intimate connection — the one who truly understands"
    ],
    howTheyDiffer: "The countertype — while SP Fives build walls and SO Fives connect intellectually, SX Fives seek intense one-to-one intimacy and emotional sharing.",
    growthPath: "Learning to expand their circle of trust beyond one or two people, recognizing that no single person can be their entire emotional world."
  },
  {
    type: 5,
    instinct: "so",
    name: "SO Five — Totem",
    chestnutName: "Totem / Symbols",
    isCountertype: false,
    description: "The social Five connects to the group through knowledge, expertise, and shared intellectual frameworks. They seek belonging through being the expert or the one who holds specialized knowledge for the community. Chestnut describes them as drawn to group ideals, ideologies, and systems of meaning — they connect socially through ideas rather than emotions. They can resemble Type 6 in their orientation toward group ideologies and shared belief systems.",
    keyPatterns: [
      "Connects to groups through expertise and shared knowledge",
      "Drawn to ideologies, systems, and group intellectual frameworks",
      "Seeks belonging by being the expert or knowledge-holder",
      "Connects socially through ideas rather than emotions",
      "Can resemble Type 6 in orientation toward group belief systems",
      "Values shared meaning-making and intellectual community"
    ],
    howTheyDiffer: "SO Fives connect through intellectual community and expertise, while SP Fives withdraw into their castle and SX Fives seek intimate sharing.",
    growthPath: "Learning to engage emotionally — not just intellectually — with groups, and recognizing that belonging doesn't require being the expert."
  },

  // ===== TYPE 6 =====
  {
    type: 6,
    instinct: "sp",
    name: "SP Six — Warmth",
    chestnutName: "Warmth",
    isCountertype: false,
    description: "The self-preservation Six manages their anxiety by building warm, reliable alliances and being endearing to others. They deal with fear through affiliation — making themselves likable and unthreatening so others will protect them. Chestnut describes them as the most phobic and friendly of the Sixes. They use warmth and personal charm to create safety through connection. They can resemble Type 2 in their warmth and desire to be liked.",
    keyPatterns: [
      "Manages anxiety through warmth, charm, and building alliances",
      "Most phobic and people-pleasing of the Sixes",
      "Uses friendliness to ensure others won't be threatening",
      "Can resemble Type 2 in warmth and desire to be liked",
      "Seeks safety through personal connection and loyalty",
      "Insecurity masked by an appealing, warm exterior"
    ],
    howTheyDiffer: "SP Sixes use warmth and personal charm to manage fear, while SX Sixes confront fear directly and SO Sixes seek safety through group authority.",
    growthPath: "Learning to trust themselves rather than depending on others' protection, and recognizing that warmth can be a fear-avoidance strategy."
  },
  {
    type: 6,
    instinct: "sx",
    name: "SX Six — Strength/Beauty",
    chestnutName: "Strength / Beauty",
    isCountertype: true,
    description: "The sexual Six is the countertype — they manage their fear by going directly toward it with strength and intimidation. This is the counterphobic Six — rather than seeking safety, they prove their courage by confronting danger. Chestnut describes them as having a fierce, aggressive quality. They project strength and beauty (physical or psychological) as a way of warding off threats. They can strongly resemble Type 8 in their confrontational energy and apparent fearlessness.",
    keyPatterns: [
      "Countertype: confronts fear through strength and intimidation",
      "Counterphobic — moves toward danger rather than away from it",
      "Projects physical or psychological strength and beauty",
      "Can strongly resemble Type 8 in confrontational energy",
      "Uses intimidation as a defense against being intimidated",
      "Most openly aggressive and challenging of the Sixes"
    ],
    howTheyDiffer: "The countertype — while SP Sixes use warmth and SO Sixes use group authority, SX Sixes confront fear directly through counterphobic aggression and displays of strength.",
    growthPath: "Recognizing that bravado is a fear response, not the absence of fear. Learning to be vulnerable, which is actually the greatest courage."
  },
  {
    type: 6,
    instinct: "so",
    name: "SO Six — Duty",
    chestnutName: "Duty",
    isCountertype: false,
    description: "The social Six manages anxiety by aligning with rules, authority, and group structures. They find safety by knowing and following the rules, understanding the hierarchy, and being a reliable, dutiful member of the system. Chestnut describes them as the most rule-oriented and authority-referencing of the Sixes. They can resemble Type 1 in their adherence to principles and duty.",
    keyPatterns: [
      "Manages anxiety through alignment with rules and authority",
      "Most rule-oriented and duty-conscious of the Sixes",
      "Finds safety in knowing the hierarchy and following procedures",
      "Can resemble Type 1 in principle-adherence and conscientiousness",
      "Reliable, responsible, and institutionally loyal",
      "May oscillate between trusting and questioning authority"
    ],
    howTheyDiffer: "SO Sixes seek safety through group authority and rules, while SP Sixes use personal warmth and SX Sixes confront fear aggressively.",
    growthPath: "Learning to develop inner authority rather than relying on external structures, and recognizing when duty becomes a cage."
  },

  // ===== TYPE 7 =====
  {
    type: 7,
    instinct: "sp",
    name: "SP Seven — Keepers of the Castle",
    chestnutName: "Keepers of the Castle / Family",
    isCountertype: false,
    description: "The self-preservation Seven channels their desire for pleasure and stimulation toward creating networks of like-minded people who share resources and opportunities. They are the most practical of the Sevens. Chestnut describes them as focused on finding allies and creating a 'family' of people who look out for each other. They are opportunistic in a collaborative way — building alliances that ensure continued access to good experiences and mutual support.",
    keyPatterns: [
      "Builds networks and alliances for mutual benefit and shared pleasure",
      "Most practical and grounded of the Sevens",
      "Creates a 'family' of like-minded allies and collaborators",
      "Opportunistic but in a collaborative, network-building way",
      "Focused on ensuring continued access to good experiences",
      "Charming and strategic in building resource-sharing relationships"
    ],
    howTheyDiffer: "SP Sevens build practical alliances and networks, while SX Sevens seek fascination through idealism and SO Sevens sacrifice for the group.",
    growthPath: "Learning to be present with what they have rather than always networking for more, and deepening existing connections rather than expanding the circle."
  },
  {
    type: 7,
    instinct: "sx",
    name: "SX Seven — Suggestibility",
    chestnutName: "Suggestibility / Fascination",
    isCountertype: false,
    description: "The sexual Seven is the dreamer and idealist — they see the world through rose-colored glasses and are easily fascinated by new people, experiences, and possibilities. They have a suggestible, enthusiastic quality that makes everything seem more magical than it might actually be. Chestnut describes them as the most idealistic of the Sevens, prone to seeing people and situations as better than they are. They can resemble Type 4 in their romanticism.",
    keyPatterns: [
      "Idealistic and fascinated — sees the world through rose-colored glasses",
      "Most romantic and dreamy of the Sevens",
      "Easily fascinated by new people and possibilities",
      "Suggestible — tends to idealize people and experiences",
      "Can resemble Type 4 in romanticism and emotional intensity",
      "Lives in a world of enchanted possibility and imagination"
    ],
    howTheyDiffer: "SX Sevens are the most idealistic and romantically oriented, while SP Sevens are practical networkers and SO Sevens sacrifice for group ideals.",
    growthPath: "Learning to see people and situations clearly rather than through idealization, and finding that reality can be just as beautiful as fantasy."
  },
  {
    type: 7,
    instinct: "so",
    name: "SO Seven — Sacrifice",
    chestnutName: "Sacrifice",
    isCountertype: true,
    description: "The social Seven is the countertype — they consciously sacrifice their own desires for the good of the group. This is the most idealistic and self-sacrificing Seven, motivated by a desire to be seen as good and to serve the collective. Chestnut describes them as having a hidden agenda beneath their sacrifice — by giving up pleasure, they earn the moral high ground and the admiration of others. They can resemble Type 2 in their service orientation.",
    keyPatterns: [
      "Countertype: sacrifices personal desires for the good of the group",
      "Most idealistic and service-oriented of the Sevens",
      "Earns moral high ground through visible self-sacrifice",
      "Can resemble Type 2 in service orientation and giving",
      "Hidden agenda: sacrifice earns admiration and moral authority",
      "Postpones personal pleasure for a greater cause or ideal"
    ],
    howTheyDiffer: "The countertype — while SP Sevens network for pleasure and SX Sevens idealize, SO Sevens counterintuitively sacrifice pleasure for group benefit and moral standing.",
    growthPath: "Recognizing the self-serving motivation beneath their sacrifice, learning to enjoy pleasure without guilt, and serving others without needing to be admired for it."
  },

  // ===== TYPE 8 =====
  {
    type: 8,
    instinct: "sp",
    name: "SP Eight — Satisfaction",
    chestnutName: "Satisfaction / Survival",
    isCountertype: false,
    description: "The self-preservation Eight is the most directly powerful and materially focused of the Eights. They are driven to satisfy their needs and ensure their survival through the acquisition of resources, territory, and physical comfort. Chestnut describes them as having a survivalist quality — they are practical, direct, and unapologetically focused on getting what they need. They are the most 'earthy' of the Eights, resembling a force of nature.",
    keyPatterns: [
      "Most directly powerful and materially focused Eight",
      "Driven to satisfy needs through acquiring resources and territory",
      "Survivalist quality — practical, direct, and unapologetic",
      "Most 'earthy' and physically grounded of the Eights",
      "Takes what they need without apology or excessive justification",
      "Resembles a force of nature — focused on concrete survival"
    ],
    howTheyDiffer: "SP Eights are the most focused on material survival and direct satisfaction, while SX Eights rebel and possess, and SO Eights protect groups.",
    growthPath: "Learning that strength includes softness, and that satisfying every need immediately is not the same as being powerful."
  },
  {
    type: 8,
    instinct: "sx",
    name: "SX Eight — Possession",
    chestnutName: "Possession / Surrender",
    isCountertype: false,
    description: "The sexual Eight is the most emotionally intense and possessive of the Eights. They seek to possess and be possessed by the people they are drawn to — creating intense, all-consuming bonds. Chestnut describes them as rebels and provocateurs who test the strength of others through confrontation. They have a charismatic, magnetic quality that draws others in and then demands total loyalty. They can be the most emotionally vulnerable of the Eights, though they often hide this behind provocation.",
    keyPatterns: [
      "Most emotionally intense and possessive of the Eights",
      "Seeks to possess and be possessed in intimate bonds",
      "Rebel and provocateur — tests others' strength through confrontation",
      "Charismatic and magnetic — draws others in then demands loyalty",
      "Most emotionally vulnerable Eight (hidden behind intensity)",
      "Creates intense, all-consuming intimate relationships"
    ],
    howTheyDiffer: "SX Eights focus on intense intimate possession and rebellion, while SP Eights seek material satisfaction and SO Eights protect groups.",
    growthPath: "Learning that love doesn't require possession, and that vulnerability can be shown directly rather than through provocation and testing."
  },
  {
    type: 8,
    instinct: "so",
    name: "SO Eight — Solidarity",
    chestnutName: "Solidarity / Social Friendship",
    isCountertype: true,
    description: "The social Eight is the countertype — they channel their power and protectiveness toward groups, communities, and social causes. Rather than using power for personal dominance, they protect the underdog and fight for justice. Chestnut describes them as the most loyal, community-oriented, and socially conscious of the Eights. They can resemble Type 2 in their protectiveness and service, but their energy is distinctly Eight — fierce, direct, and uncompromising in defense of those they protect.",
    keyPatterns: [
      "Countertype: channels power toward protecting groups and causes",
      "Most loyal and community-oriented of the Eights",
      "Protects the underdog and fights for social justice",
      "Can resemble Type 2 in protectiveness and service to others",
      "Fierce and uncompromising in defense of their community",
      "Softens Eight's typical self-focus through group loyalty"
    ],
    howTheyDiffer: "The countertype — while SP Eights seek personal satisfaction and SX Eights possess intimates, SO Eights direct their power toward community protection.",
    growthPath: "Recognizing when protection becomes control, learning to empower others rather than always being the protector."
  },

  // ===== TYPE 9 =====
  {
    type: 9,
    instinct: "sp",
    name: "SP Nine — Appetite",
    chestnutName: "Appetite",
    isCountertype: false,
    description: "The self-preservation Nine numbs their awareness through physical comforts — food, sleep, routines, television, and other forms of self-soothing. They merge with physical activities and sensory experiences rather than addressing their own priorities. Chestnut describes them as having a concrete, grounded quality but also the most likely to 'narcotize' — using physical pleasures to avoid the discomfort of asserting themselves. They are the most stubbornly inert of the Nines.",
    keyPatterns: [
      "Numbs awareness through physical comforts and routines",
      "Most prone to 'narcotization' — food, sleep, TV, habits",
      "Merges with physical activities rather than asserting priorities",
      "Most stubbornly inert and change-resistant of the Nines",
      "Grounded and concrete but avoids emotional engagement",
      "Replaces essential needs with non-essential comforts"
    ],
    howTheyDiffer: "SP Nines narcotize through physical comfort, while SX Nines merge with others and SO Nines work tirelessly for the group.",
    growthPath: "Learning to distinguish real needs from comfort-seeking, developing awareness of their own priorities and desires, and choosing engagement over numbing."
  },
  {
    type: 9,
    instinct: "sx",
    name: "SX Nine — Fusion",
    chestnutName: "Fusion / Union",
    isCountertype: false,
    description: "The sexual Nine merges with the identity, desires, and priorities of their intimate partner or the person they are closest to. They lose themselves in the relationship, taking on their partner's interests, opinions, and even personality traits. Chestnut describes them as the most relationship-oriented of the Nines, seeking union with another person as a way of avoiding the work of developing their own identity. They can resemble Type 4 in their longing for deep connection.",
    keyPatterns: [
      "Merges with intimate partner's identity, desires, and priorities",
      "Most relationship-oriented of the Nines",
      "Loses own identity through fusion with another person",
      "Takes on partner's interests, opinions, and personality traits",
      "Can resemble Type 4 in longing for deep connection",
      "Seeks union as a way of avoiding self-development"
    ],
    howTheyDiffer: "SX Nines merge with intimate partners, while SP Nines narcotize through comforts and SO Nines lose themselves in group participation.",
    growthPath: "Learning to maintain a separate sense of self within intimate relationships, and discovering their own desires independent of their partner."
  },
  {
    type: 9,
    instinct: "so",
    name: "SO Nine — Participation",
    chestnutName: "Participation",
    isCountertype: true,
    description: "The social Nine is the countertype — rather than being obviously lazy or disengaged, they are tireless workers for the group. They channel their energy into group activities, community participation, and social contribution, which can make them look unlike typical Nines. Chestnut describes them as the most energetic and hardworking of the Nines, but their workaholism for the group is actually a way of avoiding their own personal agenda. They can resemble Type 3 in their productivity.",
    keyPatterns: [
      "Countertype: tireless worker for groups and communities",
      "Most energetic and outwardly productive of the Nines",
      "Channels energy into group participation rather than personal goals",
      "Can resemble Type 3 in productivity and achievement",
      "Workaholism for the group masks avoidance of personal agenda",
      "Finds identity through group roles rather than personal development"
    ],
    howTheyDiffer: "The countertype — while SP Nines narcotize and SX Nines merge with partners, SO Nines appear active and productive but still avoid their own priorities.",
    growthPath: "Learning to direct energy toward personal goals, recognizing that group participation can be a form of self-avoidance."
  }
];
