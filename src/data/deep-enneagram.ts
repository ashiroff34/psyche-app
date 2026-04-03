// Deep Enneagram Psychology
// Sources: Claudio Naranjo (Character and Neurosis), Oscar Ichazo (Arica School),
// Don Richard Riso & Russ Hudson (Wisdom of the Enneagram, Personality Types),
// Beatrice Chestnut (The Complete Enneagram), Sandra Maitri (The Spiritual Dimension),
// A.H. Almaas (Facets of Unity)

// ============================================================
// NARANJO'S PASSION / FIXATION / VIRTUE FRAMEWORK
// The passion is the emotional driver (vice), the fixation is the
// cognitive distortion, and the virtue is the transformed quality
// when the type is healthy. From Ichazo's protoanalysis and
// Naranjo's character and neurosis work.
// ============================================================

export interface NaranjoFramework {
  type: number;
  passion: string; // Emotional vice / driving emotion
  passionDescription: string;
  fixation: string; // Cognitive distortion / mental habit
  fixationDescription: string;
  virtue: string; // Healthy transformation
  virtueDescription: string;
  holyIdea: string; // Ichazo's Holy Idea, the objective truth the type has lost contact with
  holyIdeaDescription: string;
  trap: string; // The specific trap that keeps the type stuck
  trapDescription: string;
  defenseM: string; // Primary defense mechanism
  defenseMDescription: string;
}

export const naranjoFramework: NaranjoFramework[] = [
  {
    type: 1,
    passion: "Anger (Resentment)",
    passionDescription: "Not the explosive anger of an Eight, but a simmering, controlled resentment. Ones experience chronic frustration that reality doesn't match their standards. This anger is typically suppressed and experienced as righteous indignation, moral outrage, or irritability. Naranjo identified this as a reaction formation, the One channels anger into being 'good' and 'right,' which paradoxically makes them more angry because they can never fully achieve their impossible standards.",
    fixation: "Judging / Resentment",
    fixationDescription: "The mental habit of constantly evaluating everything against an internal standard of perfection. The One's mind works like an automatic comparator, measuring what IS against what SHOULD BE and finding reality perpetually lacking. This creates a constant inner monologue of criticism directed both inward and outward.",
    virtue: "Serenity",
    virtueDescription: "When healthy, the One's compulsive judging relaxes into acceptance. Serenity is not passivity, it is the deep recognition that reality is already perfect in its imperfection. The One discovers that their relentless striving was driven by the false belief that they and the world are fundamentally flawed.",
    holyIdea: "Holy Perfection",
    holyIdeaDescription: "The objective truth that reality is already perfect, not in the sense that nothing needs to change, but that existence itself is inherently whole and complete. When the One loses contact with this, they become trapped in the belief that everything needs to be fixed and improved.",
    trap: "Perfection",
    trapDescription: "The One's specific trap is the belief that if they could just get everything right, if they could be perfectly good, perfectly moral, perfectly correct, they would finally feel at peace. But perfection is asymptotic; it can never be fully achieved, so the One is trapped in perpetual striving.",
    defenseM: "Reaction Formation",
    defenseMDescription: "Ones transform their 'unacceptable' impulses (anger, desire, selfishness) into their opposite. A One who is furious will present as controlled and reasonable. One who wants to be lazy will become compulsively productive. This defense mechanism is why Ones often appear virtuous on the surface while seething underneath."
  },
  {
    type: 2,
    passion: "Pride",
    passionDescription: "Not vanity or boastfulness, but a subtle inflation of self-importance through being needed. The Two's pride manifests as the unconscious belief that they know what others need better than others know themselves. Naranjo described this as a 'false generosity', the Two gives in order to maintain the self-image of being indispensable, loving, and selfless. Their pride makes them unable to acknowledge their own neediness.",
    fixation: "Flattery / Ingratiation",
    fixationDescription: "The mental habit of reading others' needs and strategically positioning oneself as the perfect helper. The Two's mind is constantly scanning for how to be useful, attractive, and needed. This involves a subtle distortion of reality, they inflate others' dependency on them while denying their own dependency.",
    virtue: "Humility",
    virtueDescription: "Genuine humility allows the Two to recognize their own needs without shame. It is the honest acknowledgment that they are just as needy and human as everyone else, and that this is not a flaw but a natural part of being alive. Healthy Twos can receive as freely as they give.",
    holyIdea: "Holy Will / Holy Freedom",
    holyIdeaDescription: "The understanding that love flows freely and doesn't need to be earned through service. Each person has their own will and path. When Twos lose contact with this, they become trapped in the belief that they must actively make love happen through their interventions.",
    trap: "Freedom (through helping)",
    trapDescription: "The Two believes that by making themselves indispensable, they will be free from the terror of being unwanted. But the more they give to be needed, the more trapped they become in relationships built on obligation rather than genuine love.",
    defenseM: "Repression",
    defenseMDescription: "Twos repress their own needs, desires, and especially their anger. They push their genuine feelings out of awareness and replace them with an idealized self-image of the selfless helper. This is why Twos can be genuinely unaware of their own manipulativeness, their real motivations are repressed."
  },
  {
    type: 3,
    passion: "Vanity (Deceit)",
    passionDescription: "Naranjo identified the Three's core passion as deceit, specifically, self-deceit. Threes become so identified with their crafted image that they lose contact with their authentic feelings and desires. The vanity is not surface-level narcissism but a deep disconnection from the real self. They deceive themselves into believing they ARE the image they project. This is the most fundamental self-deception in the Enneagram.",
    fixation: "Vanity / Go-Getting",
    fixationDescription: "The mental habit of constantly monitoring how one appears to others and adjusting performance accordingly. The Three's mind is like a perpetual marketing department, crafting, testing, and refining the image for maximum impact. They think in terms of efficiency, outcomes, and impressions rather than authentic experience.",
    virtue: "Truthfulness / Authenticity",
    virtueDescription: "When healthy, Threes develop the courage to be honest about who they actually are, including their failures, uncertainties, and real feelings. Authenticity means being willing to be seen as imperfect, which for a Three is genuinely terrifying because their entire identity has been built on performing perfection.",
    holyIdea: "Holy Harmony / Holy Law / Holy Hope",
    holyIdeaDescription: "The understanding that value is intrinsic, you are valuable simply because you exist, not because of what you achieve. When Threes lose contact with this, they become trapped in the belief that they must constantly prove their worth through accomplishment.",
    trap: "Efficiency",
    trapDescription: "The Three's trap is the belief that optimal performance will finally make them feel real. They become efficient machines of achievement, but efficiency without authenticity is hollow. The more efficiently they perform, the further they get from their actual selves.",
    defenseM: "Identification",
    defenseMDescription: "Threes identify with their role, image, or persona so completely that they lose the boundary between performance and self. A Three who is playing the role of successful executive genuinely experiences themselves as that role. This is not conscious lying, they have fully merged with the mask."
  },
  {
    type: 4,
    passion: "Envy",
    passionDescription: "Not simple jealousy of possessions, but a deep, existential envy, the feeling that others possess something essential that the Four lacks. This creates a perpetual sense of deficiency and longing. Naranjo described this as a 'painful sense of lack' that drives the Four to search endlessly for what is missing in themselves. The Four looks at others and sees wholeness, completeness, and belonging that feels permanently out of reach.",
    fixation: "Melancholy / Fantasized Self",
    fixationDescription: "The mental habit of focusing on what is absent rather than what is present. The Four's mind is drawn to loss, longing, and the idealized version of experiences they don't have. They construct elaborate internal narratives about their unique suffering and specialness. This fixation creates a preference for intensity and emotional drama over ordinary contentment.",
    virtue: "Equanimity (Emotional Balance)",
    virtueDescription: "Equanimity is the capacity to experience all emotions without being dominated by any of them. Healthy Fours discover that they are not their emotions, that feelings arise and pass like weather. They can be present to both joy and sorrow without needing to amplify or cling to either.",
    holyIdea: "Holy Origin",
    holyIdeaDescription: "The understanding that we all come from the same source and are all equally connected to it. Nothing essential is missing from anyone. When Fours lose contact with this truth, they become trapped in the belief that they are fundamentally different, deficient, or abandoned by the source.",
    trap: "Authenticity",
    trapDescription: "The Four's trap is the belief that if they could just find and express their 'true self,' the sense of deficiency would finally heal. But they define authenticity as intensity and emotional depth, which keeps them cycling through dramatic emotional states rather than discovering the peace that lies beneath.",
    defenseM: "Introjection",
    defenseMDescription: "Fours internalize and absorb emotional experiences, both their own and others'. Rather than processing and releasing emotions, they take them in and make them part of their identity. This is why Fours often feel 'heavy' with emotional content and why they can become stuck in emotional states long after the triggering event has passed."
  },
  {
    type: 5,
    passion: "Avarice (Withholding)",
    passionDescription: "Not greed for material things, but a deep withholding of self, energy, time, knowledge, emotions, and presence. Naranjo described the Five's avarice as a contraction, a pulling inward of all resources because they believe there isn't enough to go around. The Five hoards their inner life as a hedge against a world they experience as depleting and intrusive. This creates a profound stinginess not just with money but with engagement itself.",
    fixation: "Stinginess / Detachment",
    fixationDescription: "The mental habit of minimizing needs, compartmentalizing experience, and maintaining emotional distance. The Five's mind operates through reduction, stripping away what they consider non-essential to conserve energy. They observe rather than participate, think rather than feel, and prepare rather than act. This creates a systematic detachment from direct experience.",
    virtue: "Non-Attachment (Generosity)",
    virtueDescription: "Paradoxically, the Five's virtue is non-attachment, which is different from their habitual detachment. Detachment is a fearful withdrawal; non-attachment is a spacious openness. Healthy Fives discover that engaging with the world doesn't deplete them, that there is actually an infinite supply of energy available when they stop hoarding. True non-attachment allows them to give freely because they know they won't be diminished.",
    holyIdea: "Holy Omniscience / Holy Transparency",
    holyIdeaDescription: "The understanding that all knowledge is already available, that reality is transparent and knowable through direct engagement, not through hoarding information at a distance. When Fives lose contact with this, they believe they must accumulate enough knowledge before they can safely engage with the world.",
    trap: "Observer",
    trapDescription: "The Five's trap is the belief that by observing and understanding everything from a safe distance, they will eventually feel prepared enough to fully engage. But observation without participation is inherently incomplete, you cannot understand life by watching it. The more they observe, the more they need to observe.",
    defenseM: "Isolation (of affect)",
    defenseMDescription: "Fives separate their thinking from their feeling. They can analyze an emotional situation with perfect clarity while being completely disconnected from the emotional experience itself. This defense allows them to process threatening content intellectually without being overwhelmed by it, but it also cuts them off from the vitality that emotions provide."
  },
  {
    type: 6,
    passion: "Fear (Anxiety / Cowardice)",
    passionDescription: "The Six's passion is fear itself, not fear of specific things, but a pervasive, anticipatory anxiety about what could go wrong. Naranjo described two expressions: phobic Sixes who flee from fear (seeking protection), and counterphobic Sixes who charge toward it (proving they're not afraid). Both are equally driven by fear, they simply handle it differently. The Six's fear is existential, it's about the fundamental uncertainty of existence.",
    fixation: "Doubt / Cowardice",
    fixationDescription: "The mental habit of questioning, testing, and scanning for hidden threats. The Six's mind is like an internal security system that never turns off. They doubt their own judgments, doubt others' motives, and doubt the stability of their environment. This creates a state of chronic vigilance that is exhausting but feels necessary for survival. Even their own courage is doubted.",
    virtue: "Courage",
    virtueDescription: "The Six's virtue is not the absence of fear but the willingness to act in spite of it. Healthy Sixes discover that they have always possessed inner strength, that the authority they sought externally was within them all along. True courage means trusting themselves and moving forward without guarantees.",
    holyIdea: "Holy Strength / Holy Faith",
    holyIdeaDescription: "The understanding that existence itself is supportive, that there is a fundamental ground beneath us that will not give way. When Sixes lose contact with this faith, they become trapped in the belief that they must constantly vigilate against catastrophe because the ground could collapse at any moment.",
    trap: "Security",
    trapDescription: "The Six's trap is the belief that if they could just find enough certainty, the right authority, the right system, the right plan, they would finally feel safe. But absolute security is impossible, so the Six is trapped in an endless search for certainty in an inherently uncertain world.",
    defenseM: "Projection",
    defenseMDescription: "Sixes project their own inner states, especially aggression and authority, onto the external world. A Six who is angry may perceive others as threatening. A Six with leadership capacity may project authority onto institutions or individuals. This is why Sixes often have complicated relationships with authority, they are seeing their own disowned power in others."
  },
  {
    type: 7,
    passion: "Gluttony",
    passionDescription: "Not just physical gluttony, but a voracious appetite for experience, stimulation, ideas, and pleasure. Naranjo described this as the Seven's strategy for avoiding pain, by filling themselves with positive experiences, they hope to outrun the anxiety and emptiness lurking beneath. The gluttony is a compulsive need for MORE, more options, more experiences, more plans. It's a form of psychological consumption that prevents them from fully digesting any single experience.",
    fixation: "Planning / Idealization",
    fixationDescription: "The mental habit of future-oriented thinking, reframing negatives as positives, and keeping multiple options open simultaneously. The Seven's mind is a perpetual brainstorming machine that generates exciting possibilities faster than they can be realized. This creates a pattern of starting many things and finishing few, because the anticipation of an experience is often more satisfying than the experience itself.",
    virtue: "Sobriety",
    virtueDescription: "Sobriety is the capacity to be fully present to reality as it is, including pain, loss, and limitation, without needing to escape into fantasy or pleasure. Healthy Sevens discover that depth and commitment bring more lasting satisfaction than breadth and variety. True sobriety is not deprivation but focused presence.",
    holyIdea: "Holy Wisdom / Holy Work / Holy Plan",
    holyIdeaDescription: "The understanding that reality unfolds according to a deeper intelligence, and that each moment, including painful ones, contains everything needed for growth. When Sevens lose contact with this, they become trapped in the belief that they must manufacture their own happiness by pursuing positive experiences.",
    trap: "Idealism",
    trapDescription: "The Seven's trap is the belief that the ideal experience is just around the corner, that happiness lies in the next adventure, the next idea, the next relationship. This keeps them perpetually chasing a future satisfaction that recedes as they approach it.",
    defenseM: "Rationalization",
    defenseMDescription: "Sevens use their considerable mental agility to reframe negative experiences as positive ones, find silver linings in every cloud, and explain away pain with clever interpretations. This defense makes them remarkably resilient but also prevents them from fully processing difficult emotions. They can rationalize almost anything into a positive narrative."
  },
  {
    type: 8,
    passion: "Lust (Excess)",
    passionDescription: "Not primarily sexual lust, but a lust for intensity, impact, and excess in all things. Naranjo described the Eight's passion as an insatiable appetite for life lived at full volume. Eights push against limits, they eat, work, love, fight, and live excessively. This lust is a defense against vulnerability; by being the biggest, strongest, and most impactful force in the room, the Eight ensures they will never be the one who gets hurt.",
    fixation: "Vengeance / Justice",
    fixationDescription: "The mental habit of dividing the world into strong and weak, and positioning oneself firmly on the side of strength. The Eight's mind operates through a lens of power dynamics, who has it, who's abusing it, who needs protection from it. They have a keen sense of injustice but their 'corrections' often involve disproportionate force.",
    virtue: "Innocence",
    virtueDescription: "The Eight's virtue is a return to the innocence and tenderness they armored over in childhood. Healthy Eights discover that vulnerability is not weakness, that their most powerful moments come when they allow themselves to be gentle, open, and undefended. Innocence means meeting each moment freshly, without the assumption that attack is imminent.",
    holyIdea: "Holy Truth",
    holyIdeaDescription: "The understanding that truth is a force that operates on its own, it doesn't need the Eight's enforcement. When Eights lose contact with this, they believe they must personally ensure justice and truth through the exercise of their own power.",
    trap: "Justice",
    trapDescription: "The Eight's trap is the belief that they are the ones who must make things right, that without their force, injustice will prevail. This creates a self-reinforcing cycle: the more they fight, the more opposition they create, which confirms their belief that the world is a battleground.",
    defenseM: "Denial",
    defenseMDescription: "Eights deny their own vulnerability, tenderness, and need for others. They also deny the impact of their intensity on others. This is a blunt defense, rather than transforming or rationalizing their tender feelings, Eights simply refuse to acknowledge they exist. 'I'm fine' from an Eight often means 'I am absolutely not fine but will die before admitting it.'"
  },
  {
    type: 9,
    passion: "Sloth (Self-Forgetting)",
    passionDescription: "Not physical laziness but a spiritual/psychological sloth, a falling asleep to one's own priorities, desires, and anger. Naranjo described this as 'acedia', a loss of interiority, a going numb to one's own inner life. The Nine's sloth manifests as a fundamental reluctance to be fully present to their own experience, especially anger and desire. They 'forget' themselves by merging with others' agendas, comfortable routines, or anything that doesn't require them to assert a separate self.",
    fixation: "Indolence / Self-Forgetting",
    fixationDescription: "The mental habit of losing focus on one's own priorities by merging with the environment. The Nine's attention diffuses outward, taking on others' perspectives, losing themselves in tasks or routines, and numbing out through physical comforts. Their thinking becomes circular and unfocused when it comes to their own goals, though they can be remarkably focused on others' agendas.",
    virtue: "Right Action",
    virtueDescription: "Right action is the capacity to know what you want and to pursue it with focused, appropriate effort. Healthy Nines discover their own agenda and act on it, not reactively, not to please others, but from a clear sense of inner purpose. This is the most powerful transformation in the Enneagram: the Nine who wakes up to their own life force becomes a formidable agent of change.",
    holyIdea: "Holy Love",
    holyIdeaDescription: "The understanding that we are all already connected and that love doesn't require the dissolution of individual identity. When Nines lose contact with this, they believe that maintaining their own separate self will destroy the harmony and connection they crave, so they sacrifice self for union.",
    trap: "Seeking comfort / Indolence",
    trapDescription: "The Nine's trap is the belief that peace requires the absence of conflict and desire. They pursue comfort and harmony at the cost of their own vitality, not realizing that true peace includes the dynamic tension of desire, assertion, and even conflict.",
    defenseM: "Narcotization",
    defenseMDescription: "Nines numb themselves, through food, television, routine, busywork, sleep, or any activity that prevents them from fully contacting their own inner experience. This defense is so pervasive that Nines are often unaware it's happening. They're not suppressing specific feelings (like Ones) but rather dampening their entire emotional register to avoid the discomfort of being fully awake."
  }
];

// ============================================================
// HORNEVIAN GROUPS (Karen Horney's framework adapted by Riso-Hudson)
// How each type relates to getting their needs met
// ============================================================

export interface HornevianGroup {
  name: string;
  strategy: string;
  description: string;
  types: number[];
  horneyDescription: string;
}

export const hornevianGroups: HornevianGroup[] = [
  {
    name: "Assertive (Moving Against)",
    strategy: "Demand that others meet their needs",
    description: "Types 3, 7, and 8 respond to frustration by going after what they want directly. They are ego-expansive, they enlarge themselves to fill space, take charge, and insist on getting their needs met. They have the most difficulty with genuine vulnerability and receptivity.",
    types: [3, 7, 8],
    horneyDescription: "Karen Horney described the 'moving against' strategy as a way of managing anxiety by becoming dominant and powerful. These types cope with the fundamental insecurity of existence by becoming bigger, faster, and more impactful than the threats around them."
  },
  {
    name: "Compliant (Moving Toward)",
    strategy: "Earn love by meeting others' needs first",
    description: "Types 1, 2, and 6 respond to frustration by trying harder to do what they believe is expected. They follow the rules (1), serve others (2), or seek guidance and partnership (6). They are superego-driven, oriented toward duty, responsibility, and earning approval. They struggle most with genuine autonomy and self-direction.",
    types: [1, 2, 6],
    horneyDescription: "Horney's 'moving toward' strategy involves managing anxiety by becoming indispensable, dutiful, or perfectly aligned with authority. These types cope by making themselves useful and morally unassailable."
  },
  {
    name: "Withdrawn (Moving Away)",
    strategy: "Retreat inward to meet their own needs",
    description: "Types 4, 5, and 9 respond to frustration by withdrawing, into imagination (4), intellect (5), or comfortable routines (9). They manage their needs internally rather than engaging with the external world directly. They struggle most with decisive, sustained engagement with external reality.",
    types: [4, 5, 9],
    horneyDescription: "Horney's 'moving away' strategy involves managing anxiety by reducing engagement with the threatening external world. These types cope by creating rich inner lives that substitute for, or protect against, the demands of outer reality."
  }
];

// ============================================================
// HARMONIC GROUPS (Riso-Hudson)
// How each type handles conflict and difficulty
// ============================================================

export interface HarmonicGroup {
  name: string;
  response: string;
  description: string;
  types: number[];
}

export const harmonicGroups: HarmonicGroup[] = [
  {
    name: "Positive Outlook",
    response: "Reframe problems positively; focus on the bright side",
    description: "Types 2, 7, and 9 manage difficulty by emphasizing the positive. Twos focus on others' needs (avoiding their own pain), Sevens reframe everything optimistically, and Nines minimize problems and smooth things over. These types resist acknowledging negativity, they want to maintain an upbeat, harmonious reality. Their shadow work involves facing the darkness they've been avoiding.",
    types: [2, 7, 9]
  },
  {
    name: "Competency",
    response: "Suppress emotions and solve problems objectively",
    description: "Types 1, 3, and 5 manage difficulty by setting feelings aside and finding efficient solutions. Ones apply standards, Threes perform, and Fives analyze. These types detach from their emotional response in favor of competent action. Their shadow work involves allowing themselves to feel incompetent, messy, and emotionally affected.",
    types: [1, 3, 5]
  },
  {
    name: "Reactive (Emotional Realness)",
    response: "Express their emotional reaction and need others to respond",
    description: "Types 4, 6, and 8 manage difficulty by having a strong emotional reaction and needing others to engage with it. Fours express hurt and need empathy, Sixes express anxiety and need reassurance, and Eights express anger and need direct engagement. These types need their reality to be witnessed and responded to. Their shadow work involves self-soothing rather than requiring external emotional processing.",
    types: [4, 6, 8]
  }
];

// ============================================================
// OBJECT RELATIONS GROUPS (Riso-Hudson based on object relations theory)
// How each type relates to attachment and primary caregivers
// ============================================================

export interface ObjectRelationsGroup {
  name: string;
  relationship: string;
  description: string;
  types: number[];
  psychodynamics: string;
}

export const objectRelationsGroups: ObjectRelationsGroup[] = [
  {
    name: "Attachment (Connected to nurturing figure)",
    relationship: "Over-connected to the protective/nurturing figure",
    description: "Types 3, 6, and 9 are attachment types, they adapted by bonding strongly with the figure who represented safety. Threes attached to the nurturing figure through performance, Sixes through loyalty and obedience, Nines through compliance and merger. As adults, they struggle with identity because so much of their sense of self was constructed in relation to this attachment.",
    types: [3, 6, 9],
    psychodynamics: "These types developed their strategies in close relation to a caregiver. Their core issue is identity: Who am I when I'm not performing for (3), protecting against threats from (6), or merging with (9) the people I'm attached to?"
  },
  {
    name: "Frustration (Disconnected from nurturing figure)",
    relationship: "Frustrated, didn't get enough from the nurturing figure",
    description: "Types 1, 4, and 7 are frustration types, they experienced a gap between what they needed and what they received. Ones responded by trying to be perfect to earn love, Fours by believing they were inherently flawed, and Sevens by seeking fulfillment elsewhere. As adults, they carry a chronic sense that something essential is missing.",
    types: [1, 4, 7],
    psychodynamics: "These types experienced a deficit in early nurturing. Their core issue is fulfillment: Why can't I find satisfaction? The One seeks it through perfection, the Four through emotional authenticity, the Seven through new experiences, but all are chasing a fullness that was missing from the beginning."
  },
  {
    name: "Rejection (Disconnected from both figures)",
    relationship: "Rejected, learned to reject their own needs",
    description: "Types 2, 5, and 8 are rejection types, they experienced a fundamental rejection of their essential self and responded by rejecting part of themselves in return. Twos rejected their own needs, Fives rejected the external world, and Eights rejected their vulnerability. As adults, they have the most difficulty with genuine openness and receptivity.",
    types: [2, 5, 8],
    psychodynamics: "These types learned early that their core self was unwelcome. Their response was to become self-sufficient in a distorted way: Twos by becoming selflessly giving (rejecting their own needs), Fives by becoming self-contained (rejecting the world's demands), Eights by becoming invulnerable (rejecting their tenderness)."
  }
];

// ============================================================
// CENTERS OF INTELLIGENCE (expanded)
// ============================================================

export interface CenterOfIntelligence {
  name: string;
  types: number[];
  coreEmotion: string;
  description: string;
  dominantType: string;
  overExpressed: string;
  underExpressed: string;
}

export const centersOfIntelligence: CenterOfIntelligence[] = [
  {
    name: "Gut / Body Center (8-9-1)",
    types: [8, 9, 1],
    coreEmotion: "Anger / Rage",
    description: "The gut center types share a core relationship with anger and autonomy. They are concerned with resistance, boundaries, and control. Eight expresses anger outwardly and overtly. Nine suppresses anger and falls asleep to it. One internalizes anger as a perfectionist inner critic. Their intelligence is somatic, they know through their bodies, through gut instinct and physical sensation.",
    dominantType: "Nine is the core type, anger is most suppressed and therefore most foundational",
    overExpressed: "Eight, anger is expressed outwardly as assertive force",
    underExpressed: "One, anger is repressed and transformed into critical judgment"
  },
  {
    name: "Heart / Feeling Center (2-3-4)",
    types: [2, 3, 4],
    coreEmotion: "Shame / Image",
    description: "The heart center types share a core relationship with shame and identity. They are concerned with self-image, emotional connections, and worthiness. Two projects a helpful image. Three projects a successful image. Four projects a unique image. Their intelligence is emotional, they understand through feelings, empathy, and interpersonal attunement.",
    dominantType: "Three is the core type, shame is most buried under performance and image",
    overExpressed: "Two, feelings are directed outward toward others' emotional needs",
    underExpressed: "Four, feelings are internalized and amplified into personal identity"
  },
  {
    name: "Head / Thinking Center (5-6-7)",
    types: [5, 6, 7],
    coreEmotion: "Fear / Anxiety",
    description: "The head center types share a core relationship with fear and security. They are concerned with finding safety, certainty, and guidance. Five retreats into knowledge. Six scans for threats. Seven escapes into positive possibilities. Their intelligence is cognitive, they process through analysis, planning, and conceptual frameworks.",
    dominantType: "Six is the core type, fear is most directly experienced as anxiety and doubt",
    overExpressed: "Seven, fear is masked by optimism and the pursuit of positive experiences",
    underExpressed: "Five, fear drives withdrawal into the safety of observation and knowledge"
  }
];

// ============================================================
// MISIDENTIFICATION PAIRS
// Common types that get confused with each other and how to tell them apart
// Based on Riso-Hudson and empirical typing data
// ============================================================

export interface Misidentification {
  types: [number, number];
  whyConfused: string;
  keyDifference: string;
  testQuestion: string;
}

export const misidentifications: Misidentification[] = [
  { types: [1, 6], whyConfused: "Both are rule-oriented, dutiful, and anxious. Both have active superegos.", keyDifference: "Ones are certain about their standards (their inner critic IS the authority). Sixes doubt their own judgment and look externally for authority. A One says 'I know what's right.' A Six says 'What if I'm wrong?'", testQuestion: "When you follow rules, is it because you genuinely believe they're correct (1), or because breaking them makes you anxious (6)?" },
  { types: [2, 9], whyConfused: "Both are warm, accommodating, and focused on others. Both avoid conflict and merge.", keyDifference: "Twos merge to be needed and loved (it's strategic, even if unconscious). Nines merge to avoid the effort of asserting a separate self. Twos know what they want (you to need them). Nines often don't know what they want at all.", testQuestion: "Do you lose yourself in others because you want to be indispensable to them (2), or because having your own agenda feels overwhelming (9)?" },
  { types: [3, 7], whyConfused: "Both are energetic, optimistic, and achievement-oriented. Both avoid negative feelings.", keyDifference: "Threes perform to be admired (image-focused). Sevens explore to stay stimulated (experience-focused). A Three needs you to watch and validate. A Seven doesn't care if you're watching, they're having too much fun.", testQuestion: "Is your energy driven by how others perceive you (3), or by your own desire for stimulation and freedom (7)?" },
  { types: [4, 5], whyConfused: "Both are withdrawn, introspective, and can be intense. Both feel different from others.", keyDifference: "Fours withdraw into their emotions, they FEEL intensely. Fives withdraw into their minds, they THINK intensely. Fours want to be understood emotionally. Fives want to understand intellectually.", testQuestion: "When you withdraw, is it to process intense feelings (4), or to conserve energy and gain understanding (5)?" },
  { types: [5, 9], whyConfused: "Both are withdrawn, quiet, and can seem detached. Both minimize their needs.", keyDifference: "Fives withdraw deliberately to protect their energy, they're acutely aware of intrusion. Nines withdraw passively, they're barely aware they're doing it. Fives are intense behind their wall. Nines are genuinely mellow.", testQuestion: "Is your detachment intentional and protective (5), or does it just sort of happen without you noticing (9)?" },
  { types: [6, 8], whyConfused: "Counterphobic Sixes can look very Eight-like, aggressive, confrontational, testing.", keyDifference: "Eights confront from a position of genuine self-confidence (even if it's covering vulnerability). Sixes confront from anxiety, they're trying to prove they're NOT afraid. An Eight's aggression is steady. A Six's aggression has an anxious, reactive quality.", testQuestion: "When you confront, do you feel powerful and certain (8), or are you secretly terrified and overcompensating (6)?" },
  { types: [3, 8], whyConfused: "Both are assertive, goal-oriented, and commanding. Both are in the 'moving against' group.", keyDifference: "Threes want to be admired for their accomplishments (heart center, image). Eights want to have impact and control (gut center, power). A Three adjusts their approach based on audience. An Eight doesn't care what you think.", testQuestion: "Would you rather be respected for your achievements (3), or feared for your power (8)?" },
  { types: [1, 5], whyConfused: "Both are competent, analytical, and value precision. Both can be emotionally contained.", keyDifference: "Ones judge reality against standards (gut center anger). Fives observe reality to understand it (head center fear). Ones feel compelled to correct what's wrong. Fives feel compelled to understand what's happening.", testQuestion: "When you see something wrong, is your instinct to fix it (1), or to understand why it's wrong (5)?" },
  { types: [2, 7], whyConfused: "SP Twos can look like Sevens, playful, charming, wants to receive rather than give.", keyDifference: "Twos (even SP Twos) are fundamentally oriented toward relationships and being lovable. Sevens are oriented toward experiences and avoiding pain. A Two's charm is relational. A Seven's charm is experiential.", testQuestion: "Is your energy directed at making connections with specific people (2), or at creating fun and stimulating experiences (7)?" },
  { types: [4, 6], whyConfused: "Both are reactive types who can be anxious, emotionally intense, and self-doubting.", keyDifference: "Fours' anxiety is about identity (Am I special enough? Am I authentic?). Sixes' anxiety is about security (Am I safe? Can I trust this?). Fours fear being ordinary. Sixes fear being unsupported.", testQuestion: "Is your core anxiety about who you are (4), or about what might go wrong (6)?" },
];
