/**
 * Enneagram Instinctual Subtype Entity Data
 *
 * Source: Enneagram_Complete_Reference (2).docx — Part XII: The 27 Instinctual Subtypes
 * Primary sources: Ichazo (Arica protoanalysis, c.1970), Naranjo (SAT lectures 1971/2004),
 * Chestnut (Complete Enneagram, 2013), Maitri, Lapid-Bogda.
 *
 * Used to generate SEO pages at /enneagram/subtypes/[slug].
 * All content grounded in primary source material — no invented type descriptions.
 */

export type Instinct = "SP" | "SO" | "SX";

export interface SubtypeEntity {
  slug: string;                // URL slug, e.g. "type-4-sp"
  type: number;                // 1–9
  instinct: Instinct;
  typeName: string;            // e.g. "The Individualist"
  typeAlias: string;           // e.g. "The Romantic"
  typeColor: string;           // hex, from TYPE_COLORS
  passion: string;             // e.g. "Envy"
  fixation: string;
  holyIdea: string;
  virtue: string;
  integrationLine: number;
  disintegrationLine: number;
  ichazoKeyword: string;       // Original Spanish/English keyword
  modernLabel: string;         // Naranjo / Chestnut revision if different
  isCountertype: boolean;
  countertypeReason?: string;  // Why it's counterpassional
  mechanism: string;           // How instinct modifies the passion
  primaryMistype: string;      // Most common misidentification
  // Content sections
  intro: string;               // 2–3 sentence hook (core tension)
  profile: string;             // Full behavioral profile (3–4 sentences)
  somatic: string;             // Body/physical presentation
  healthy: string;             // Integrated expression
  unhealthy: string;           // Disintegrated expression
  growth: string;              // Growth path (1–2 sentences)
  // SEO
  metaDescription: string;     // ≤155 chars
  relatedSlugs: string[];      // 5+ slugs for internal linking
}

// ─── Type base data (for cross-referencing) ──────────────────────────────────

const TYPE_NAMES: Record<number, { typeName: string; typeAlias: string; passion: string; fixation: string; holyIdea: string; virtue: string; integrationLine: number; disintegrationLine: number; typeColor: string }> = {
  1: { typeName: "The Reformer",   typeAlias: "The Perfectionist", passion: "Anger",    fixation: "Resentment", holyIdea: "Holy Perfection",   virtue: "Serenity",        integrationLine: 7, disintegrationLine: 4, typeColor: "#B85C38" },
  2: { typeName: "The Helper",     typeAlias: "The Giver",         passion: "Pride",    fixation: "Flattery",   holyIdea: "Holy Freedom",      virtue: "Humility",        integrationLine: 4, disintegrationLine: 8, typeColor: "#C47B3A" },
  3: { typeName: "The Achiever",   typeAlias: "The Performer",     passion: "Deceit",   fixation: "Vanity",     holyIdea: "Holy Harmony",      virtue: "Authenticity",    integrationLine: 6, disintegrationLine: 9, typeColor: "#BFA23E" },
  4: { typeName: "The Individualist", typeAlias: "The Romantic",   passion: "Envy",     fixation: "Melancholy", holyIdea: "Holy Origin",       virtue: "Equanimity",      integrationLine: 1, disintegrationLine: 2, typeColor: "#7B6EA8" },
  5: { typeName: "The Investigator", typeAlias: "The Observer",    passion: "Avarice",  fixation: "Retention",  holyIdea: "Holy Omniscience",  virtue: "Non-Attachment",  integrationLine: 8, disintegrationLine: 7, typeColor: "#3D7EA6" },
  6: { typeName: "The Loyalist",   typeAlias: "The Skeptic",       passion: "Fear",     fixation: "Cowardice",  holyIdea: "Holy Faith",        virtue: "Courage",         integrationLine: 9, disintegrationLine: 3, typeColor: "#4A90A4" },
  7: { typeName: "The Enthusiast", typeAlias: "The Epicure",       passion: "Gluttony", fixation: "Planning",   holyIdea: "Holy Wisdom",       virtue: "Sobriety",        integrationLine: 5, disintegrationLine: 1, typeColor: "#6BA87A" },
  8: { typeName: "The Challenger", typeAlias: "The Protector",     passion: "Lust",     fixation: "Vengeance",  holyIdea: "Holy Truth",        virtue: "Innocence",       integrationLine: 2, disintegrationLine: 5, typeColor: "#C04040" },
  9: { typeName: "The Peacemaker", typeAlias: "The Mediator",      passion: "Sloth",    fixation: "Indolence",  holyIdea: "Holy Love",         virtue: "Action",          integrationLine: 3, disintegrationLine: 6, typeColor: "#7B9E7A" },
};

// ─── All 27 subtypes ───────────────────────────────────────────────────────────

export const ENNEAGRAM_SUBTYPES: SubtypeEntity[] = [
  // ── TYPE 1 ──────────────────────────────────────────────────────────────────
  {
    slug: "type-1-sp",
    type: 1, instinct: "SP",
    ...TYPE_NAMES[1],
    ichazoKeyword: "Anxiety / Angustia",
    modernLabel: "Worry",
    isCountertype: false,
    mechanism: "Anger is channeled fully inward through reaction formation: the survival instinct meets anger and converts it into hyper-vigilant conscientiousness and warmth",
    primaryMistype: "SP-6 (shared anxiety and vigilance); SP-3 (shared work ethic)",
    intro: "The SP-1 is the most anxious of all twenty-seven subtypes. Their anger has been so thoroughly transmuted by reaction formation that it has become warmth — a conscientious, scrupulous gentleness that conceals a precise internal terror that something will go wrong unless every detail is managed. They are not perfectionistic in the conventional sense; they are existentially vigilant.",
    profile: "SP-1s are the stabilizing presence in any environment — meticulous, reliable, gentle, and quietly self-sacrificing. Chestnut notes that they have often carried excess responsibility from childhood, becoming the competent anchor in chaotic or demanding families long before it was appropriate. Their perfectionism channels entirely into the domain of survival and control: everything must be planned, safeguarded, and prepared against possible failure. The warm surface masks a persistent terror of blame. They are simultaneously the most likeable and the most anxious of all Type 1 expressions.",
    somatic: "Bound anger shows in the body: tense jaw, drawn shoulders, controlled gestures, carefully measured voice. Despite this musculature of restraint, the surface presentation is warm and appealing — a mismatch that is the somatic signature of reaction formation at work.",
    healthy: "At their best, the SP-1 is an ethical steward who models serenity and genuine warmth; they can accept imperfection in themselves and others without the underlying terror driving their behavior.",
    unhealthy: "At their worst: obsessive-compulsive rituals, hypochondria, martyred over-functioning, psychosomatic illness from chronic suppression of an anger that has no outlet.",
    growth: "Growth for the SP-1 means accessing the spontaneous joy of type 7 — discovering that the world does not collapse when control is released, and that imperfection can be met with serenity rather than dread.",
    metaDescription: "The SP-1 subtype turns anger into warmth through reaction formation — the most anxious, conscientious, and self-perfecting expression of Enneagram Type 1.",
    relatedSlugs: ["type-1-so", "type-1-sx", "type-6-sp", "type-4-sp", "type-3-sp"],
  },
  {
    slug: "type-1-so",
    type: 1, instinct: "SO",
    ...TYPE_NAMES[1],
    ichazoKeyword: "Non-Adaptability / Inadaptability",
    modernLabel: "Rigidity / Inadaptability-Superiority",
    isCountertype: false,
    mechanism: "Anger intellectualized and cooled: the social instinct's drive to adapt to the group is inverted — the SO-1 demands the group adapt to their standards instead",
    primaryMistype: "Type 5 (intellectual detachment); SO-6 Duty",
    intro: "Where the SP-1's anger becomes warmth, the SO-1's anger becomes cold. The heat transmutes into intellectual certainty — the conviction that one is already correct, already the model of proper conduct. Naranjo's formulation is precise: a 'passion for feeling I'm right and you're wrong.' This is not the SP-1's anxious self-doubt but the SO-1's imperturbable sense of already having arrived at correctness.",
    profile: "Chestnut's memorable formulation: 'Where the SP-1 is a true perfectionist, the SO-1 is perfect.' The SO-1 does not experience anxiety about whether they are right — they know they are. This teacher mentality extends into a felt need to represent the correct way of being. They are condescending toward intellectual inferiors, above-it-all in conflict, and have a know-it-all quality that can read as arrogance. Naranjo invokes the Inquisition as historical archetype: sincere in the belief of serving a higher good while imposing a moral framework on others. The SO-1's 'apparent morality is nothing more than moralism.'",
    somatic: "Cool, upright, controlled, formal; minimal gesture; measured speech; the body held as a model of propriety. Anger is present in the stiffness and precision of the body but entirely absent from the facial presentation, which reads as composed and slightly distant.",
    healthy: "Principled teacher, ethical guide, and model of fair-minded rigor — someone whose standards serve others rather than control them.",
    unhealthy: "Dogmatic fanatic, contemptuous judge, intellectual bully — the Inquisitor archetype at its extreme, enforcing moral frameworks with self-righteous certainty.",
    growth: "Growth means moving toward type 7's spontaneous joy — releasing the grip of certainty enough to allow genuine curiosity and delight in imperfection.",
    metaDescription: "The SO-1 turns anger cold: intellectual superiority and moral rigidity define this counterintuitive 'perfectionist who feels already perfect' expression of Enneagram Type 1.",
    relatedSlugs: ["type-1-sp", "type-1-sx", "type-6-so", "type-5-so", "type-3-so"],
  },
  {
    slug: "type-1-sx",
    type: 1, instinct: "SX",
    ...TYPE_NAMES[1],
    ichazoKeyword: "Jealousy / Celo",
    modernLabel: "Zeal / Vehemence",
    isCountertype: true,
    countertypeReason: "The only Type 1 expression where anger flows outward directly rather than being converted by reaction formation",
    mechanism: "Anger does NOT flow through reaction formation — instead fuses with SX desire, potentiating both into reforming zeal and jealous entitlement toward the intimate other or ideological object",
    primaryMistype: "Type 8 (assertive, visible anger); SX-6, SX-4",
    intro: "Ichazo's original Spanish word celo carries multiple simultaneous meanings: the fervor of religious zeal, the heat of an animal in season, and the jealous vigilance of a lover guarding union. The SX-1 is the only expression of Type 1 where anger is not converted by reaction formation — instead, anger fuses with desire and flows directly. The result is a reformer who does not merely want change; they feel entitled to impose it.",
    profile: "Chestnut: 'These Ones are avengers; they are not afraid of confrontation.' The SX-1 is impulsive, invasive, vehement, impatient, and often unaware of the depth of their own anger. Where SP-1 and SO-1 suppress or intellectualize anger, the SX-1 acts from it. They direct the drive to perfect not inward (SP-1) nor upward as a model (SO-1) but outward — toward perfecting intimate partners, students, and society. The conquistador metaphor Naranjo uses captures the self-righteous certainty: because they hold a higher truth, they feel they have the right to impose it. Chestnut identifies a characteristic trap-door pattern: the moral crusader who violates their own code in private, discharging the split between anger and suppressed pain.",
    somatic: "Energetic, forward-leaning, flushed, charged — the body of barely-contained anger and desire. Mistypes as Type 8 primarily because the anger is visible and the intensity is present. Chestnut's key distinction: 'Ones are over-social, Eights are under-social.'",
    healthy: "The reformer who inspires rather than imposes; passionate advocacy grounded in genuine serenity; the ability to want change without the entitled certainty that their version of change is the only valid one.",
    unhealthy: "The crusading moralist who transgresses their own code; the reformer who becomes what they seek to dismantle; intimate relationships consumed by the drive to improve the partner.",
    growth: "Growth means learning that the object of reform — the partner, the student, the system — is allowed to be imperfect without becoming the target of the SX-1's righteous energy.",
    metaDescription: "The SX-1 is the countertype: anger flows outward as vehement reforming zeal, not inward as anxiety. The crusader and avenger face of Enneagram Type 1.",
    relatedSlugs: ["type-1-sp", "type-1-so", "type-8-sx", "type-4-sx", "type-6-sx"],
  },

  // ── TYPE 2 ──────────────────────────────────────────────────────────────────
  {
    slug: "type-2-sp",
    type: 2, instinct: "SP",
    ...TYPE_NAMES[2],
    ichazoKeyword: "Privilege / Privilegio",
    modernLabel: "Me-First",
    isCountertype: true,
    countertypeReason: "Goes against the typical Two's pattern of active giving and seducing — instead claims care by performing need",
    mechanism: "Pride + survival instinct → claiming priority through childlike endearment rather than adult seduction; 'I deserve care for simply existing'",
    primaryMistype: "SP-6 (warmth and ambivalence); SP-4; Type 7 (self-indulgence)",
    intro: "The SP-2 seduces by performing need rather than offering care. Pride, normally expressed through generous giving, turns inward here — claiming priority not by being indispensable but by being adorable, sweet, helplessly appealing. Chestnut: 'What is prominent in the SP-2 is this pure, young need for love.' This is the Two who does not look like a Two.",
    profile: "SP-2s present as youthful regardless of biological age: soft features, animated gestures, bright eyes, an appealing vulnerability that invites protection. They are more fearful and ambivalent about relationships than the other Twos — the childlike persona is partly a defense against the terror of abandonment. Warmth alternates with petulance; generosity alternates with demands. Naranjo uses the term 'infantile' — not pejoratively but descriptively: the developmental arrest is at the level of the privileged young child whose needs are met simply because they are young and beloved. The translation of that early experience into adult life produces the SP-2's characteristic blend of charm, self-indulgence, and periodic tantrums when care is not forthcoming.",
    somatic: "Youthful presentation, soft gestures, bright open eyes. Body language that communicates receptivity and vulnerability rather than the expansive warmth of the SO-2 or the magnetism of the SX-2.",
    healthy: "Warm, genuinely vulnerable, and capable of receiving as freely as giving — the ability to ask for what they want directly without performing need.",
    unhealthy: "Manipulative helplessness, parasitic dependency, addictive self-soothing around 'deserved' pleasures, tantrums when care is withheld.",
    growth: "Growth involves moving toward type 4's interiority — accessing their own emotional reality and needs directly rather than through the performance of childlike helplessness.",
    metaDescription: "The SP-2 countertype claims care through adorable vulnerability rather than giving — the 'Two who doesn't look like a Two,' driven by Pride turned inward.",
    relatedSlugs: ["type-2-so", "type-2-sx", "type-6-sp", "type-4-sp", "type-7-sp"],
  },
  {
    slug: "type-2-so",
    type: 2, instinct: "SO",
    ...TYPE_NAMES[2],
    ichazoKeyword: "Ambition / Ambición",
    modernLabel: "Ambition",
    isCountertype: false,
    mechanism: "Pride + social instinct → superiority over the group; giving deployed as strategic instrument of social conquest and group leadership",
    primaryMistype: "Type 3 SO (Prestige); Type 8 SO (Solidarity)",
    intro: "The SO-2 is the most ambitious of the three Type 2 expressions. Pride fuses with the social instinct to produce a drive not merely to help individuals but to be indispensable to groups — the natural teacher, mentor, and leader who gives in ways that simultaneously build influence. Where other Twos seduce individuals, the SO-2 seduces the crowd.",
    profile: "The SO-2 gives strategically: their generosity is real, but it operates in service of positioning within the group hierarchy. Naranjo's deepest observation is that the SO-2's giving is a form of power — they create dependency networks that reinforce their central importance. They are drawn to roles that formalize their caretaking: teacher, manager, therapist, leader. The social instinct supplies the audience that pride requires, and the SO-2 performs for it — often brilliantly. They can be genuinely inspiring and effective, but at lower health ranges the giving becomes controlling, the mentorship becomes manipulation of those who are now obligated.",
    somatic: "Expansive presence, warm but somewhat formal, conveys authority and approachability simultaneously. The body of someone who expects to be listened to.",
    healthy: "Genuinely inspiring teacher and leader whose giving creates autonomy rather than dependency; real investment in others' growth without the need for credit.",
    unhealthy: "Controlling philanthropist, manipulative mentor, the powerful helper who makes themselves indispensable and punishes ingratitude.",
    growth: "Growth involves accessing type 4's genuine emotional interiority — distinguishing what they actually feel from what they perform for the group, and giving without agenda.",
    metaDescription: "The SO-2 deploys pride as social ambition — the mentor and leader whose giving builds influence. Most visibly 'successful helper' expression of Enneagram Type 2.",
    relatedSlugs: ["type-2-sp", "type-2-sx", "type-3-so", "type-8-so", "type-6-so"],
  },
  {
    slug: "type-2-sx",
    type: 2, instinct: "SX",
    ...TYPE_NAMES[2],
    ichazoKeyword: "Aggression / Agresión",
    modernLabel: "Seduction",
    isCountertype: false,
    mechanism: "Pride + SX instinct → drive to be irresistible and unforgettable to a specific other; feeding pride through securing devoted, exclusive attachment",
    primaryMistype: "SX-4 (emotional intensity and seductiveness); SX-8 (aggression); SX-3",
    intro: "Ichazo's keyword is paradoxical: 'Aggression' for a type not typically associated with force. The aggression here is not hostile but magnetic — an intense, forward-moving energy directed at securing the undivided attention and devotion of a specific person. The SX-2 seduces not by being helpful (SO-2) nor by being childlike (SP-2) but by being utterly, compulsively irresistible.",
    profile: "Naturally attractive, glamorous, intense, sexually magnetic. The femme fatale archetype operates here regardless of gender — an ability to make another person feel they are the only one in the room. Naranjo's most important observation: the SX-2 confuses being desired with being loved. The pride mechanism ensures that what feels like deep relational investment is actually the pursuit of confirmation that they are wanted. The aggression is real — there is a force and insistence to the SX-2's pursuit of the beloved that can tip into possessiveness and manipulation when the desired attachment is threatened.",
    somatic: "Magnetic, glamorous, openly attractive presentation; expressive with touch and gesture; the body actively engaged in the project of being desirable.",
    healthy: "Passionate, devoted, genuinely generous intimate who combines warmth and intensity without the underlying need to confirm their irresistibility.",
    unhealthy: "Manipulative seducer, possessive partner, the one who withholds care when the desired response is not forthcoming.",
    growth: "Growth means distinguishing being loved from being desired — learning to receive love that is not contingent on their performance of irresistibility.",
    metaDescription: "The SX-2 pursues irresistibility over helpfulness — the seductive, intensely magnetic expression of Enneagram Type 2 that confuses being desired with being loved.",
    relatedSlugs: ["type-2-sp", "type-2-so", "type-4-sx", "type-8-sx", "type-3-sx"],
  },

  // ── TYPE 3 ──────────────────────────────────────────────────────────────────
  {
    slug: "type-3-sp",
    type: 3, instinct: "SP",
    ...TYPE_NAMES[3],
    ichazoKeyword: "Security / Seguridad",
    modernLabel: "Security",
    isCountertype: true,
    countertypeReason: "Vanity is most hidden — denied at surface while operated unconsciously through workaholic self-sufficiency",
    mechanism: "Vanity + SP instinct → paradox: 'vanity for having no vanity'; image-concern denied at surface while operated entirely through the domain of practical achievement and self-reliance",
    primaryMistype: "Type 1 SP (shared work ethic, modesty, discipline); Type 6 SP; Type 5",
    intro: "Naranjo's formulation is exact: 'Just as the proud of the SP subtype do not seem proud, the vain of conservation do not seem vain.' The SP-3 is the countertype because their vanity has gone underground — hidden so thoroughly in a performance of self-sufficiency and practical competence that they genuinely believe they do not care about image. But the compulsive work, the need to be seen as needing no one, the refusal of vulnerability — this is vanity operating below the level of recognition.",
    profile: "Workaholic, self-reliant, 'one-person army' quality; history often involves childhood environments where self-sufficiency was rewarded and need was penalized. The SP-3 does not seek applause — they often genuinely resist it. What they seek instead is the visceral security of knowing they have provided for every contingency through their own effort. Chestnut: they are vain about having no vanity. The denial itself is the vanity — the image of the person who needs no image is carefully maintained.",
    somatic: "Often presents as more introverted and unadorned than other Threes — the anti-glamour that paradoxically becomes its own image. Efficient movement, purposeful posture, no wasted gesture.",
    healthy: "Genuinely productive, humble, grounded achiever who leads by example and whose work speaks without needing to announce itself.",
    unhealthy: "Isolated workaholic who cannot ask for help, cannot acknowledge need, cannot rest without the cover of productivity — the image of self-sufficiency maintained even at enormous personal cost.",
    growth: "Growth means accessing type 6's genuine relational loyalty — allowing vulnerability and acknowledging that self-sufficiency can be a defense against connection.",
    metaDescription: "The SP-3 countertype: vanity turned into denial of vanity. The workaholic, self-reliant 'un-Three' who is vain about needing nothing and no one.",
    relatedSlugs: ["type-3-so", "type-3-sx", "type-1-sp", "type-6-sp", "type-5-sp"],
  },
  {
    slug: "type-3-so",
    type: 3, instinct: "SO",
    ...TYPE_NAMES[3],
    ichazoKeyword: "Prestige / Prestigio",
    modernLabel: "Prestige",
    isCountertype: false,
    mechanism: "Vanity + social instinct → most direct expression of vanity: need to shine before the broadest possible audience, to be recognized as valuable by the group",
    primaryMistype: "Type 7 (polished, active, positive affect); Type 8 (competitive leadership)",
    intro: "The SO-3 is the 'Three-est Three' — the most canonical expression of the type's vanity. The social instinct supplies the audience that vanity requires, and the result is someone whose identity is built entirely on public recognition. Naranjo's deepest critique: the SO-3 is the embodiment of what Fromm called the 'Marketing Orientation' — the self experienced as a commodity whose value is determined by what the market returns for it.",
    profile: "The biggest chameleon of the Threes: reads each new context for its valued characteristics and becomes what is most admired in that context. Corporate boardroom, artistic scene, academic department — the SO-3 recalibrates quickly and performs effectively. The performance is often genuinely excellent; the problem is that the performer has gradually disappeared behind it. They excel at packaging themselves for optimal audience reception. At average health, they produce results but have lost track of what they actually want or feel beneath the performance.",
    somatic: "Polished, carefully presented, attuned to the aesthetic expectations of the current context; posture and dress adjusted to convey the valued characteristics of the current audience.",
    healthy: "Inspiring communicator, effective motivator, leader whose genuine accomplishments match their self-presentation — authenticity and achievement aligned.",
    unhealthy: "Pathological impostor, the one who performs competence without substance, who adjusts identity for each new audience until no stable core remains.",
    growth: "Growth means integrating toward type 6's loyal commitment — finding stable relationships where the mask can come off, where being loved without performance is possible.",
    metaDescription: "The SO-3 needs the broadest possible audience to confirm their value — the most archetypal 'Marketing Orientation' expression of Enneagram Type 3.",
    relatedSlugs: ["type-3-sp", "type-3-sx", "type-7-so", "type-8-so", "type-2-so"],
  },
  {
    slug: "type-3-sx",
    type: 3, instinct: "SX",
    ...TYPE_NAMES[3],
    ichazoKeyword: "Masculinity-Femininity / Masculinidad-Feminidad",
    modernLabel: "Charisma",
    isCountertype: false,
    mechanism: "Vanity + SX instinct → drive to be maximally attractive to a specific significant other through role-conformist gender appeal; the image performed for one person rather than a crowd",
    primaryMistype: "Type 2 (helping and pleasing orientation); SX-7 (enthusiasm and charm); SP-9",
    intro: "Naranjo EXPLICITLY RENAMED this subtype — the only one of all twenty-seven he overrode entirely. The original Ichazo keyword 'Masculinity-Femininity' captured something precise: the Three's vanity, fused with the SX instinct's drive toward one-to-one intensity, produces an image calibrated not for a crowd (SO-3) but for the specific beloved. Naranjo's 'Charisma' retains the magnetic quality while generalizing beyond gender-role performance.",
    profile: "Naturally attractive in a conventionally appealing way; graceful; stage presence — but directed toward the significant other rather than the audience. The least self-focused of the Threes: the SX-3's energy goes outward, into the beloved, making them feel seen and supported in ways that can read as strikingly generous for a type organized around vanity. The image here is performed not for admiration but for deep connection — though beneath the attentiveness lives the same Three mechanism: am I valued enough by this specific person? Chestnut: 'the most relationship-oriented Three.'",
    somatic: "Naturally appealing, graceful, attuned to the aesthetic and emotional preferences of the significant other; often conventionally attractive with an easy, relaxed magnetism.",
    healthy: "Charismatic champion of loved ones, effective supporter, magnetic presence whose care for the partner is genuine and whose image is not armor but expression.",
    unhealthy: "The Three who deceives in intimate relationships, who shape-shifts to remain desired by the partner, who loses authentic self in the project of being perfectly appealing.",
    growth: "Growth means distinguishing genuine care for the other from performance of care — loving someone for who they are rather than for the confirmation of being needed by them.",
    metaDescription: "The SX-3 performs charisma for one person not a crowd — the most intimate, relationship-focused expression of Enneagram Type 3. The only subtype Naranjo renamed.",
    relatedSlugs: ["type-3-sp", "type-3-so", "type-2-sx", "type-7-sx", "type-4-sx"],
  },

  // ── TYPE 4 ──────────────────────────────────────────────────────────────────
  {
    slug: "type-4-sp",
    type: 4, instinct: "SP",
    ...TYPE_NAMES[4],
    ichazoKeyword: "Reckless / Dauntless",
    modernLabel: "Tenacity",
    isCountertype: true,
    countertypeReason: "The Four who does NOT display suffering; stoic endurance inverts the expected envy-display pattern",
    mechanism: "Envy + SP instinct → envy introjected as self-demand; suffering swallowed as private currency of endurance rather than displayed for sympathy or relational leverage",
    primaryMistype: "Type 1 (self-discipline, inner critic); SP-3 ('sunny' exterior); Type 7",
    intro: "Naranjo's famous triad for Type 4: 'Social Fours suffer, Self-Preservation Fours are long-suffering, Sexual Fours make others suffer.' The SP-4 is the Four who has turned envy entirely inward — not displaying the wound but carrying it as private ballast, enduring difficulty without complaint, and presenting to the world a competent, often sunny surface that conceals an interior organized around melancholy and deprivation.",
    profile: "Chestnut: 'more masochistic than melodramatic.' Often 'sunny' on the outside — competent, functional, seemingly content — while internally carrying a chronic sense of deficiency and sorrow. Keyword history is the most convoluted of all twenty-seven: Lilly & Hart (1975) rendered Ichazo's original as 'Reckless/Dauntless'; Naranjo settled on 'Dauntlessness'; Chestnut explicitly renamed to 'Tenacity' in 2013, correcting the misread that Ichazo was describing recklessness. Tenacity is precise: the SP-4 endures without display, grinding through difficulty with a grim and private stoicism that has its own form of pride — the pride of the one who does not complain.",
    somatic: "Often physically compact, grounded, self-contained. Less expressive and dramatic than the SX-4; the body holds the melancholy internally rather than gesturing toward it.",
    healthy: "Genuinely resilient, deeply compassionate from lived suffering, able to endure difficulty without being consumed by it — the wounded healer who has metabolized the wound.",
    unhealthy: "Chronic martyrdom, masochistic self-denial, stoic endurance of circumstances that should be changed, inner life so compressed it becomes inaccessible.",
    growth: "Growth means moving toward type 1's clarity and principled action — finding external structure that can hold the internal depth without suppressing it.",
    metaDescription: "The SP-4 countertype: envy turned inward as tenacious, stoic endurance. The 'sunny Four' who carries melancholy silently rather than displaying it.",
    relatedSlugs: ["type-4-so", "type-4-sx", "type-1-sp", "type-3-sp", "type-6-sp"],
  },
  {
    slug: "type-4-so",
    type: 4, instinct: "SO",
    ...TYPE_NAMES[4],
    ichazoKeyword: "Shame / Vergüenza",
    modernLabel: "Shame",
    isCountertype: false,
    mechanism: "Envy + social instinct → envy displayed publicly as visible suffering and deficiency; competing in the social field through the performance of inferiority",
    primaryMistype: "Type 2 (emotional expressiveness); Type 6 (anxiety and social fear)",
    intro: "The SO-4 is the most recognizable expression of Type 4 — the one whose envy is worn as visible suffering, whose sense of deficiency is brought into the social field and displayed. Where the SP-4 swallows suffering, the SO-4 shows it. Naranjo observed that SO-4s compete through their inferiority: shame becomes the currency with which they bid for attention, recognition, and connection.",
    profile: "The SO-4 is deeply attuned to their own and others' suffering and uses this attunement both to connect and to display their own wound. They can be extraordinarily empathic and insightful — the depth of their engagement with pain makes them genuine companions to others in difficulty. At average health, the suffering becomes a presentation, a way of claiming moral authority through having suffered most or suffered most nobly. The social instinct's need for group belonging fuses with envy to produce someone who belongs through their wound — their pain is their ticket of admission, their claim on others' attention and care.",
    somatic: "More expressively melancholic than SP-4; eyes that convey depth of feeling; gesture and posture that communicate emotional weight and interiority.",
    healthy: "Profound empathy, authentic emotional intelligence, the ability to hold space for suffering without needing to make it their own — genuine service through depth of understanding.",
    unhealthy: "Competitive suffering, emotional manipulation through display of pain, the martyrdom that demands others bear witness and respond.",
    growth: "Growth means integrating toward type 1's capacity for principled, consistent action — channeling depth of feeling into disciplined creative work rather than consuming relational energy.",
    metaDescription: "The SO-4 wears envy as visible shame — the most recognizably melancholic expression of Enneagram Type 4, competing through the display of suffering.",
    relatedSlugs: ["type-4-sp", "type-4-sx", "type-2-so", "type-6-so", "type-9-so"],
  },
  {
    slug: "type-4-sx",
    type: 4, instinct: "SX",
    ...TYPE_NAMES[4],
    ichazoKeyword: "Competition / Hate",
    modernLabel: "Competition",
    isCountertype: false,
    mechanism: "Envy + SX intensity → aggressive pursuit of what is wanted, often through direct competition with rivals for the desired person or position",
    primaryMistype: "Type 8 (assertion and intensity); Type 2 (relational intensity)",
    intro: "Naranjo: 'Sexual Fours make others suffer.' The SX-4's envy is not the quiet internal ache of the SP-4 nor the public display of the SO-4 — it is an active, aggressive force directed outward. The SX instinct amplifies envy into competitive heat: what others have, they want; what is in the way, they challenge. This is the most assertive and the most intense of the three Four expressions.",
    profile: "The SX-4 is intensely emotionally alive, easily provoked to passion, and not afraid of confrontation. Their envy expresses as directness — sometimes as the artist who competes openly with peers, sometimes as the partner who claims with fierceness. The keyword 'Hate' in Naranjo's formulation is arresting: it points to the activation energy of envy when SX instinct supercharges it — not chronic hatred but the specific heat of wanting what another has so intensely that it becomes antagonistic. SX-4s can be extraordinarily compelling, creatively prolific, and erotically charged — but relationships are frequently turbulent because the same intensity that makes them magnetic makes them combustible.",
    somatic: "Intense, expressive, emotionally charged; the Four's characteristic beauty combined with the SX instinct's magnetism; capable of great emotional range in brief time windows.",
    healthy: "Creative force, passionate advocate, able to channel competitive intensity into work that transforms rather than exhausts relationships.",
    unhealthy: "Chronic drama, emotional volatility, destructive envy that poisons relationships with competition and comparison.",
    growth: "Growth means accessing type 1's calm discernment — the ability to channel intensity through principled form rather than being consumed by it.",
    metaDescription: "The SX-4 turns envy into active, aggressive competition — the most intense, assertive, and combustible expression of Enneagram Type 4.",
    relatedSlugs: ["type-4-sp", "type-4-so", "type-8-sx", "type-2-sx", "type-1-sx"],
  },

  // ── TYPE 5 ──────────────────────────────────────────────────────────────────
  {
    slug: "type-5-sp",
    type: 5, instinct: "SP",
    ...TYPE_NAMES[5],
    ichazoKeyword: "Castle / Home",
    modernLabel: "Castle",
    isCountertype: false,
    mechanism: "Avarice + SP instinct → avarice for privacy and physical space; the self-preservation instinct's drive for home and territory becomes the hermit's fortress",
    primaryMistype: "Type 9 (withdrawal and merging); Type 1 (precision and self-containment)",
    intro: "The SP-5 has organized their life around a castle — a carefully maintained territory of privacy and self-sufficiency that requires minimal intrusion from the outer world. Where other types seek security through connection, competence, or comfort, the SP-5 finds it through the hermit's logic: the less contact with the world, the less depletion.",
    profile: "Most withdrawn and self-sufficient of the Five expressions. Often eccentric in domestic arrangements — the scholar's study, the artist's studio, the programmer's lair — spaces that function as fortresses of interiority. Reich's schizoid character structure maps directly here: emotional withdrawal, isolation of affect, a disconnection between rich inner experience and minimal outer expression. SP-5s can go days without social contact without distress and may find most social interaction genuinely exhausting rather than mildly costly. They are paradoxically deeply invested in their private world — the castle is not empty but richly furnished internally.",
    somatic: "Often physically contracted, minimal use of space, careful management of proximity to others. Voice measured, eye contact limited, gesture minimal — all serving the project of taking up as little of others' energy as possible while protecting their own.",
    healthy: "The independent scholar or artist whose solitude produces genuine original work; capable of real intimacy in trusted one-to-one relationships despite the general withdrawal.",
    unhealthy: "Complete hermit, paranoid about intrusion, unable to maintain any consistent relational contact, inner world so sealed it becomes a prison.",
    growth: "Growth means integrating toward type 8's embodied presence and decisive action — bringing the rich interior into direct contact with the world rather than observing from behind the castle wall.",
    metaDescription: "The SP-5 builds a fortress of privacy — the hermit expression of Enneagram Type 5, hoarding space and solitude as the primary survival resource.",
    relatedSlugs: ["type-5-so", "type-5-sx", "type-9-sp", "type-1-sp", "type-4-sp"],
  },
  {
    slug: "type-5-so",
    type: 5, instinct: "SO",
    ...TYPE_NAMES[5],
    ichazoKeyword: "Totem",
    modernLabel: "Totem",
    isCountertype: false,
    mechanism: "Avarice + social instinct → avarice for the prestige-knowledge that confers group status; hoarding wisdom as a form of belonging through being the acknowledged expert",
    primaryMistype: "Type 3 SO (seeking prestige and recognition); Type 1 (principled precision)",
    intro: "The keyword 'Totem' is one of Ichazo's most evocative: the totem is the sacred object around which the tribe organizes. The SO-5 seeks to become this object — to hold a body of knowledge so specialized and authoritative that the group cannot function without their expertise. Avarice here is not for things but for the knowledge that confers indispensable status.",
    profile: "The SO-5 is the most socially engaged of the Five expressions, though engagement remains mediated through intellectual authority. They are drawn to roles that formalize their expertise: the professor, the specialist consultant, the curator, the domain expert whose knowledge is both their gift and their barrier to genuine connection. Unlike the SP-5 who withdraws from groups entirely, the SO-5 engages with groups — but always from behind the protected distance of expert status. Their avarice expresses as a drive to accumulate the knowledge that makes them the totem: irreplaceable, consulted, never interchangeable.",
    somatic: "More socially present than SP-5 but still typically reserved; often formal in presentation; the expert's bearing of someone who expects their knowledge to be the primary point of contact.",
    healthy: "The genuine mentor whose expertise is shared generously and whose knowledge creates autonomy in others rather than dependency on themselves.",
    unhealthy: "The knowledge hoarder who withholds expertise to maintain indispensability; the isolated expert who mistakes being consulted for being known.",
    growth: "Growth toward type 8 means bringing the knowledge into direct contact — speaking from authority into action rather than from observation into theory.",
    metaDescription: "The SO-5 hoards knowledge for group status — the expert-mentor expression of Enneagram Type 5 who seeks belonging by becoming the indispensable totem.",
    relatedSlugs: ["type-5-sp", "type-5-sx", "type-3-so", "type-1-so", "type-6-so"],
  },
  {
    slug: "type-5-sx",
    type: 5, instinct: "SX",
    ...TYPE_NAMES[5],
    ichazoKeyword: "Confidence / Trust",
    modernLabel: "Confidence",
    isCountertype: true,
    countertypeReason: "Romantic intensity and drive for deep connection inverts the Five's characteristic avarice — opens up rather than closes down in intimate bonds",
    mechanism: "Avarice partially suspended in intense one-to-one connection; the SX instinct's drive toward deep bonding overrides the Five's habitual withdrawal",
    primaryMistype: "Type 4 (romantic idealism and depth); SX-7 (enthusiasm and intensity)",
    intro: "The SX-5 is the countertype: the avarice that governs all Five expressions is suspended in the context of intense one-to-one bonding. Where the SP-5 retreats to the castle and the SO-5 retreats behind expertise, the SX-5 reaches toward the beloved with a romantic idealism that looks nothing like the Five's characteristic avarice. They are more open, more emotionally expressive, and more willing to risk depletion in the service of deep connection.",
    profile: "Often the most 'Four-looking' of the Fives: romantic, depth-seeking, drawn to the mystical and esoteric, capable of intense intimate engagement. Chestnut observes that SX-5s bring genuine emotional availability to their one-to-one relationships that the other Five subtypes rarely access. The avarice is not gone but redirected: they hoard not energy or knowledge but the bond itself — the trust and confidence that Ichazo named. They seek a partner who can access their interior world, and once found, that bond receives an investment of energy that surprises those who know Fives primarily through the other expressions.",
    somatic: "More expressive, more willing to make and maintain eye contact, more present physically than other Fives; in intimate contexts the withdrawal drops away and a striking emotional intensity emerges.",
    healthy: "The Five who can genuinely love — bringing depth, curiosity, and sustained presence to intimate relationships without draining or withdrawing.",
    unhealthy: "Romantic idealization followed by withdrawal when reality fails to match the ideal; the bond becomes another form of hoarding — held so tightly it becomes possessive.",
    growth: "Growth means accessing type 8's embodied decisiveness — bringing the depth and feeling of intimate connection into direct action in the world rather than keeping it sequestered in the inner life.",
    metaDescription: "The SX-5 countertype: romantic idealism opens the Five up rather than closing them down. The most emotionally available expression of Enneagram Type 5.",
    relatedSlugs: ["type-5-sp", "type-5-so", "type-4-sx", "type-7-sx", "type-8-sx"],
  },

  // ── TYPE 6 ──────────────────────────────────────────────────────────────────
  {
    slug: "type-6-sp",
    type: 6, instinct: "SP",
    ...TYPE_NAMES[6],
    ichazoKeyword: "Warmth / Affection",
    modernLabel: "Warmth",
    isCountertype: false,
    mechanism: "Fear + SP instinct → fear managed through alliance with a protective person or structure; warmth is the strategy for securing closeness with those who can provide safety",
    primaryMistype: "Type 2 (warmth and alliance-building); Type 9 (accommodation and desire for peace)",
    intro: "The SP-6 manages fear by becoming warm — cultivating close, protective bonds that serve as living fortifications against the world's threats. Unlike the SX-6 who meets fear with counterphobic aggression, the SP-6 meets it with affection: drawing people in, making themselves likeable, ensuring that the people around them are motivated to protect and support them.",
    profile: "Most anxious of the three Six expressions in the phobic mode — the classic Type 6 picture of vigilant, warm, ambivalent alliance-seeking. SP-6s are genuinely likeable and often deeply loyal; the warmth they offer is real even if fear is its engine. They read people carefully for signs of threat or betrayal, maintaining an internal threat-detection system running beneath a friendly surface. They are often exquisitely sensitive to inconsistency in others' behavior — a slight shift in tone can trigger the Six's characteristic suspicion. The warmth strategy is most effective when trusted — when the alliance holds, the SP-6 can be extraordinarily dedicated and supportive.",
    somatic: "Warm, open, physically approachable; often moves toward people rather than away; but close observation reveals the vigilance behind the warmth — scanning eyes, careful listening.",
    healthy: "Genuinely loyal, warm friend and colleague whose care is unconditional rather than strategic; moves beyond the need for the alliance to feel safe.",
    unhealthy: "The Six who clings, tests, doubts, and pushes away the very people whose closeness they need; chronic ambivalence about whether anyone can actually be trusted.",
    growth: "Growth toward type 9 means finding genuine peace — the security that does not depend on alliance or vigilance but arises from a deeper, quieter trust.",
    metaDescription: "The SP-6 meets fear with warmth — the most anxiously affectionate, alliance-seeking expression of Enneagram Type 6. Loyal and vigilant in equal measure.",
    relatedSlugs: ["type-6-so", "type-6-sx", "type-2-sp", "type-9-sp", "type-4-sp"],
  },
  {
    slug: "type-6-so",
    type: 6, instinct: "SO",
    ...TYPE_NAMES[6],
    ichazoKeyword: "Duty",
    modernLabel: "Duty",
    isCountertype: false,
    mechanism: "Fear + social instinct → fear managed through adherence to group rules, institutions, and duty; belonging to the system as the anxiety management strategy",
    primaryMistype: "Type 1 (principled rule-following); Type 3 (responsible performance)",
    intro: "The SO-6 manages fear through the systematic performance of duty. Where the SP-6 manages fear through personal alliance, the SO-6 manages it through institutional belonging — adhering faithfully to the rules, expectations, and hierarchies of whatever system they belong to. The system becomes the protective structure.",
    profile: "The most institutionally committed of the Sixes: reliable, responsible, rule-following, and genuinely invested in the proper functioning of the structures they inhabit. They can be excellent administrators, officials, and loyal members of organizations — their adherence to procedure is not cynical but genuinely felt. The fear that drives them is the fear of what happens when systems fail, when rules are violated, when the authority structures that should protect everyone break down. They often have conflicted relationships with authority — wanting its protection while suspecting its reliability — which can produce the characteristic Six ambivalence: dependent on authority while chronically doubting it.",
    somatic: "Responsible bearing, careful dress in accordance with context expectations, steady and reliable physical presence — the body language of someone who does their part.",
    healthy: "The trustworthy institutional steward whose adherence to duty arises from genuine principle rather than fear; able to challenge authority when it fails its own standards.",
    unhealthy: "The bureaucrat whose rule-following becomes rigidity, whose institutional loyalty becomes the cover for moral abdication — 'following orders' as the Six pathology.",
    growth: "Growth toward type 9 means discovering peace that does not require institutional endorsement — belonging to oneself before belonging to the system.",
    metaDescription: "The SO-6 manages fear through dutiful adherence to systems and institutions — the most institutionally loyal and responsible expression of Enneagram Type 6.",
    relatedSlugs: ["type-6-sp", "type-6-sx", "type-1-so", "type-3-so", "type-9-so"],
  },
  {
    slug: "type-6-sx",
    type: 6, instinct: "SX",
    ...TYPE_NAMES[6],
    ichazoKeyword: "Strength / Beauty",
    modernLabel: "Strength",
    isCountertype: true,
    countertypeReason: "Counterphobic: fear is met by attacking it directly rather than by managing or avoiding it",
    mechanism: "Fear + SX instinct → fear confronted head-on; the SX instinct's drive toward intensity fuses with fear to produce aggression, provocation, and direct challenge to the threatening source",
    primaryMistype: "Type 8 (assertive, aggressive, confrontational); SX-1 (righteous confrontation)",
    intro: "The SX-6 is the counterphobic face of the Enneagram: fear met not with warmth (SP-6), duty (SO-6), or avoidance, but with direct, aggressive attack. The SX instinct's intensity fuses with fear to produce someone who runs toward what frightens rather than away from it — making them appear, paradoxically, like the least fearful type of all.",
    profile: "Most aggressive, most confrontational, most likely to rebel against authority of all Six expressions. Chestnut: they 'attack the source of their fear rather than flee from it.' The keyword 'Strength/Beauty' reflects Ichazo's observation that the SX-6 projects an image of strength and beauty — cultivated as a defense against the underlying fear. They challenge, provoke, and test; they seek the reassurance of safety through the assurance of their own capacity to fight. They are often charismatic and magnetic in precisely the way the counterphobic logic predicts: the one who faces what others fear is compelling. But the aggression is fear's displaced expression — the threat-detection system of the Six running at maximum sensitivity, producing attack rather than withdrawal.",
    somatic: "Strong, assertive physical presence; direct eye contact; forward-leaning posture; the body of someone prepared for confrontation even in non-confrontational contexts.",
    healthy: "Genuine courage — the Six who has integrated their fear deeply enough that they no longer need to attack it in order to manage it; acts from strength rather than performing it.",
    unhealthy: "Paranoid aggressor, the one who creates the conflict they fear by acting from the premise that attack is always imminent; isolates through the intensity of their challenge.",
    growth: "Growth toward type 9 means finding a peace that does not require constant vigilance — the serenity that does not need to assert itself to be real.",
    metaDescription: "The SX-6 countertype attacks fear directly — the most aggressive, counterphobic, and paradoxically fearless-looking expression of Enneagram Type 6.",
    relatedSlugs: ["type-6-sp", "type-6-so", "type-8-sx", "type-1-sx", "type-4-sx"],
  },

  // ── TYPE 7 ──────────────────────────────────────────────────────────────────
  {
    slug: "type-7-sp",
    type: 7, instinct: "SP",
    ...TYPE_NAMES[7],
    ichazoKeyword: "Keepers of the Castle / Family",
    modernLabel: "Keepers",
    isCountertype: false,
    mechanism: "Gluttony + SP instinct → practical networking and strategic alliance-building; the survival instinct gives gluttony a pragmatic focus: accumulate the connections and resources that provide security",
    primaryMistype: "Type 3 (networking and ambition); Type 2 (warmth and service to others)",
    intro: "The SP-7 pursues pleasure with a strategic intelligence: they cultivate relationships and resources not only for the joy of them but as a form of survival architecture. The keyword 'Keepers' points to the Seven's characteristic accumulation directed toward a specific practical end — maintaining the network of people, opportunities, and resources that keeps life filled and options open.",
    profile: "Naranjo describes the SP-7 as 'opportunistic' — not cynically, but in the precise sense that they are expert at recognizing and exploiting opportunities that others miss. They are genuinely warm and fun, excellent networkers and host figures, but beneath the pleasure-seeking lives a strategic intelligence about which relationships provide value. They maintain networks with the same attention to cultivation that others might bring to investment portfolios. The most practical and materialistic of the Sevens; often genuinely good at money and resources because the SP instinct gives their gluttony a concrete, survival-oriented focus.",
    somatic: "Warm, energetic, socially ease; often comfortable in their body; enjoy the pleasures of food, drink, physical comfort. The Seven's characteristic enthusiasm tempered by a certain pragmatic groundedness.",
    healthy: "The genuine community builder, the one who creates abundance for everyone in their network; warm, inclusive, materially generous.",
    unhealthy: "The opportunist whose relationships are maintained only as long as they are useful; accumulates people and resources as anxiety management without genuine investment.",
    growth: "Growth means integrating toward type 5's depth and capacity for sustained focus — discovering that depth of engagement is more satisfying than breadth of acquisition.",
    metaDescription: "The SP-7 combines gluttony with strategic survival intelligence — the networker and keeper who accumulates connections and resources as a practical pleasure strategy.",
    relatedSlugs: ["type-7-so", "type-7-sx", "type-3-sp", "type-2-sp", "type-6-sp"],
  },
  {
    slug: "type-7-so",
    type: 7, instinct: "SO",
    ...TYPE_NAMES[7],
    ichazoKeyword: "Sacrifice / Social Limitation",
    modernLabel: "Sacrifice",
    isCountertype: true,
    countertypeReason: "Anti-gluttonous self-sacrifice inverts the Seven's characteristic pleasure-seeking; gives up personal satisfaction in service of group ideals",
    mechanism: "Gluttony + social instinct → counter-passional: pleasure-seeking is redirected into sacrifice for the group; 'I am not selfish' becomes the governing identity",
    primaryMistype: "Type 2 (self-sacrificing service); Type 1 (principled idealism)",
    intro: "The SO-7 is the countertype: the Seven who has turned their gluttony against itself, converting pleasure-seeking into service and sacrifice. They are genuinely the least Seven-looking Seven — their behavior can be indistinguishable from a Two's generosity or a One's principled commitment. Naranjo: the SO-7 has 'sacrificed themselves to sacrifice itself.'",
    profile: "The SO-7 is genuinely committed to anti-hedonism as an identity — they do not indulge, they serve; they do not accumulate for themselves, they give. This counter-passional stance is maintained with real conviction. But the gluttony is not gone — it has been redirected. The SO-7 may be excessively idealistic, grandiose about their sacrifice, driven by a subtle pleasure in being the self-denying one. Chestnut: 'the anti-gluttony of the SO-7 is a form of gluttony for being good.' The sacrifice is real; the pleasure in being sacrificial is also real. Growth means distinguishing genuine service from the satisfaction of the sacrificial identity.",
    somatic: "Often subdued or serious in presentation; may resist the Seven's characteristic lightness and humor as a form of self-denial; conveys commitment and seriousness.",
    healthy: "Genuine altruist whose sacrifice arises from love rather than identity — able to give without needing the role of the giver.",
    unhealthy: "Idealistic martyr, grandiose in sacrifice, subtly superior about self-denial; the pleasure of being the self-sacrificing one disguised as virtue.",
    growth: "Growth means reclaiming the joy the SO-7 has sacrificed — integrating toward type 5's genuine sobriety, which is different from the forced renunciation of gluttony.",
    metaDescription: "The SO-7 countertype sacrifices pleasure for group ideals — the anti-gluttonous Seven who seems more like a One or Two than a Seven.",
    relatedSlugs: ["type-7-sp", "type-7-sx", "type-2-so", "type-1-so", "type-5-so"],
  },
  {
    slug: "type-7-sx",
    type: 7, instinct: "SX",
    ...TYPE_NAMES[7],
    ichazoKeyword: "Suggestibility / Fascination",
    modernLabel: "Fascination",
    isCountertype: false,
    mechanism: "Gluttony + SX instinct → gluttony for intense experience and enchantment; the drive to fascinate and be fascinated, to create hypnotic enthusiasm in one-to-one and aesthetic encounters",
    primaryMistype: "Type 4 (romantic idealism and depth); SX-3 (charm and magnetism); Type 2",
    intro: "The SX-7 is the dreamer — the Seven whose gluttony for experience becomes an enchanting romantic idealism. Where the SP-7 collects connections and the SO-7 collects sacrifice, the SX-7 collects fascinations: people, ideas, aesthetics, and experiences that sparkle with the promise of deep meaning.",
    profile: "Naranjo's keyword 'Suggestibility' captures something precise: the SX-7 is easily enchanted — they enter states of fascination with ideas, people, and beauty that function almost hypnotically. They are idealistic, imaginative, and capable of creating an entrancing world around themselves and their beloved. The Seven's characteristic future-orientation becomes a romantic vision — the perfect relationship, the transformative journey, the revelatory encounter. In relationships, they can be remarkably devoted while the enchantment holds; the Seven's characteristic problem is what happens when it fades. This is the most 'artistic' of the Seven expressions — drawn to beauty and meaning in ways that can look strikingly like a Four.",
    somatic: "Vibrant, expressive, often aesthetically attuned; the Seven's characteristic energy focused and softened by the SX instinct's drive toward intensity and beauty.",
    healthy: "The creative visionary who sustains enchantment with depth — able to commit to the project or relationship long enough to discover what is real beneath the initial fascination.",
    unhealthy: "The eternal romantic who moves from one enchantment to the next, unable to remain present when the sparkle dims; Peter Pan refusing to land.",
    growth: "Growth means accessing type 5's depth and sustained focus — discovering that the deepest fascinations require staying with what is difficult, not escaping into the next shining thing.",
    metaDescription: "The SX-7 is driven by fascination and enchantment — the most romantic, idealistic, and aesthetically alive expression of Enneagram Type 7.",
    relatedSlugs: ["type-7-sp", "type-7-so", "type-4-sx", "type-5-sx", "type-3-sx"],
  },

  // ── TYPE 8 ──────────────────────────────────────────────────────────────────
  {
    slug: "type-8-sp",
    type: 8, instinct: "SP",
    ...TYPE_NAMES[8],
    ichazoKeyword: "Satisfaction / Survival",
    modernLabel: "Satisfaction",
    isCountertype: false,
    mechanism: "Lust + SP instinct → immediate gratification of impulses; survival drives are intensified by lust into raw, animalistic directness about physical needs and wants",
    primaryMistype: "Type 7 (hedonism and pleasure-seeking); Type 9 (basic needs orientation)",
    intro: "The SP-8 is the most purely instinctual of the Eight expressions — lust and the survival drive operating at maximum directness, without the social mediation of the SO-8 or the relational intensity of the SX-8. Naranjo describes the SP-8 as the most 'animalistic' expression of the type: their lust is for immediate satisfaction of whatever impulse is present.",
    profile: "The SP-8 satisfies impulses as they arise — hunger, desire, anger, rest — with a directness that can be refreshing and alarming in equal measure. They are intensely present in the body and often genuinely unconcerned with social judgment of their appetites. The survival instinct sharpens lust into a pragmatic relationship with power: they accumulate the resources — material, social, territorial — that guarantee their survival and the survival of those they protect. Often highly independent, unwilling to be constrained by convention, and genuinely indifferent to others' opinions of their choices. Their directness can be disarming: what you see is what you get, amplified.",
    somatic: "Strong physical presence, comfortable in their body, direct in physical expression; often either imposing or surprisingly relaxed — the lion at ease versus alert.",
    healthy: "The Eight whose directness becomes genuine generosity — using their strength and resources without agenda, protecting others without needing to control them.",
    unhealthy: "Impulse without restraint; the one who satisfies their appetites regardless of impact; territorial aggression about survival resources.",
    growth: "Growth toward type 2 means discovering that the tenderest form of strength is in service — that real power includes the vulnerability of genuine care.",
    metaDescription: "The SP-8 satisfies impulses immediately and directly — the most raw, instinctual, and animalistic expression of Enneagram Type 8.",
    relatedSlugs: ["type-8-so", "type-8-sx", "type-7-sp", "type-9-sp", "type-5-sp"],
  },
  {
    slug: "type-8-so",
    type: 8, instinct: "SO",
    ...TYPE_NAMES[8],
    ichazoKeyword: "Solidarity / Friendship",
    modernLabel: "Solidarity",
    isCountertype: false,
    mechanism: "Lust + social instinct → lust redirected to group protection and solidarity; becomes the fierce champion of the marginalized rather than the dominator",
    primaryMistype: "Type 2 SO (protective service); Type 7 SO (social enthusiasm)",
    intro: "The SO-8 is the countertype: the Eight whose lust has been redirected from personal domination into fierce group protection. They are the big brother or sister, the rebel-with-a-cause, the one who fights not for themselves but for those who cannot fight for themselves. This is the most 'tender' of the Eight expressions — without losing any of the power.",
    profile: "Chestnut: the SO-8 is 'the least Eight-looking of the Eights' — their energy goes into the group rather than into personal territory. They are rebels against injustice, advocates for the marginalized, people who direct their considerable force into systems and power structures that oppress others. The lust is real but redirected: they can be extraordinarily fierce on behalf of others while remaining comparatively uninterested in personal accumulation of power. They often have deep loyal friendships — the 'solidarity' of Ichazo's keyword is real — and these friendships can be the primary focus of their protective instinct. They are not soft: the Eight's directness, intensity, and refusal to be bullied remain fully present.",
    somatic: "Powerful physical presence combined with a warmth or openness not typically associated with Eight energy; often commanding but approachable; the body language of someone who protects rather than merely dominates.",
    healthy: "The genuinely protective leader whose power serves others — the Eight who has nothing to prove and everything to give.",
    unhealthy: "The protector who becomes controlling, the advocate whose zeal tips into domination of those they claim to protect, the rebellion that becomes its own hierarchy.",
    growth: "Growth toward type 2 means learning to receive as well as give — allowing others to protect and care for them without experiencing it as vulnerability to be defended against.",
    metaDescription: "The SO-8 countertype redirects lust into fierce group protection — the social justice champion, the rebel-with-a-cause, the most tender expression of Enneagram Type 8.",
    relatedSlugs: ["type-8-sp", "type-8-sx", "type-2-so", "type-7-so", "type-6-so"],
  },
  {
    slug: "type-8-sx",
    type: 8, instinct: "SX",
    ...TYPE_NAMES[8],
    ichazoKeyword: "Possession / Surrender",
    modernLabel: "Possession",
    isCountertype: true,
    countertypeReason: "The surrender dimension of 'Possession/Surrender' is counter-passional — the Eight's characteristic armor and refusal of vulnerability is inverted in the sx/8's drive toward total intimate merger and yielding to the beloved",
    mechanism: "Lust + SX instinct → lust for total possession of and total surrender to the beloved; all-or-nothing intensity in intimate bonds",
    primaryMistype: "Type 4 SX (intensity and emotional depth); SX-3 (magnetism)",
    intro: "The SX-8's lust flows toward the specific beloved with a totalizing intensity: they want possession — complete, undivided, real — and they offer the same. This is the Eight who loves with their full force, which is considerable. The keyword 'Possession/Surrender' contains the paradox: they seek to possess and to surrender simultaneously, which makes their intimate relationships among the most intense of all twenty-seven subtypes.",
    profile: "The most openly intense of the Eight expressions. Where the SP-8 is broadly physical and the SO-8 is protectively fierce, the SX-8 directs the full force of Eight energy into the intimate bond. They are all-or-nothing in love: the beloved receives everything and is held to a reciprocal standard of totality. This is simultaneously deeply bonding and potentially suffocating — the SX-8's intensity can make partners feel seen and chosen in a way that is rare, and can also overwhelm with the sheer force of the demand for complete reciprocity. The lust extends beyond sex into every dimension of the bond: they want to know everything, inhabit everything, miss nothing.",
    somatic: "The Eight's strong presence amplified by the SX instinct's intensity; direct, forceful eye contact; the body actively engaged in the project of connection rather than the broader Eight project of territory.",
    healthy: "The Eight who can love fully without needing to possess — powerful enough to be genuinely vulnerable, surrendered without losing self.",
    unhealthy: "Possessive, controlling in intimate relationships, the one who cannot tolerate any part of the beloved remaining outside their orbit.",
    growth: "Growth toward type 2 means discovering that real intimacy cannot be held by force — that love requires release as much as possession.",
    metaDescription: "The SX-8 pursues total possession and surrender in love — the most intensely intimate, all-or-nothing expression of Enneagram Type 8.",
    relatedSlugs: ["type-8-sp", "type-8-so", "type-4-sx", "type-6-sx", "type-2-sx"],
  },

  // ── TYPE 9 ──────────────────────────────────────────────────────────────────
  {
    slug: "type-9-sp",
    type: 9, instinct: "SP",
    ...TYPE_NAMES[9],
    ichazoKeyword: "Appetite",
    modernLabel: "Appetite",
    isCountertype: false,
    mechanism: "Sloth + SP instinct → self-forgetting through physical pleasures, routines, and sensory absorption; anesthesia through appetite for comfort",
    primaryMistype: "Type 7 (pleasure-seeking, sensory absorption); Type 5 (withdrawal and self-containment)",
    intro: "The SP-9 is the most literally 'slothful' of the Nine expressions — in the original theological sense that Naranjo and Ichazo both insisted was more accurate than ordinary laziness. Acedia: the soul's failure to care about what is genuinely important, anesthetized by physical pleasures and repetitive comforts. The SP-9 sedates through appetite — food, drink, routines, physical sensation — not because they are weak but because the Self has withdrawn so completely that only the body's simple pleasures remain as reliable ground.",
    profile: "The most overtly comfort-seeking and routine-dependent of the Nine expressions. SP-9s often have deep, almost devotional attachments to comfort rituals — the particular chair, the specific food, the established routine of the day — which function as the external structure for a self that has forgotten its own internal structure. Naranjo observes that the SP-9's 'appetite' is not primarily for sensation but for the self-forgetting that sensation enables: the physical pleasure is a vehicle for the Nine's fundamental escape from the demands of self-assertion. They can appear content and easy — and often genuinely are, within the domain of their comforts — but the contentment may mask a profound absence of genuine self-engagement.",
    somatic: "Often physically comfortable and comforting to others — soft, warm, easy to be around; may have literal appetite for food and physical comfort that manifests visibly; frequently physically large or physically settled.",
    healthy: "The genuinely present, embodied Nine who is in contact with simple pleasures and does not need them for escape; peaceful and grounded in a way that nourishes rather than narcotizes.",
    unhealthy: "The anesthetized Nine who cannot be reached through the layers of physical comfort; chronic passivity, addiction to comfort routines, inability to engage with the demands of genuine self-assertion.",
    growth: "Growth toward type 3 means discovering the energy and engagement of self-directed action — the pleasure of actually wanting something and moving toward it.",
    metaDescription: "The SP-9 self-forgets through appetite and sensory comfort — the most physically comfort-seeking and routine-dependent expression of Enneagram Type 9.",
    relatedSlugs: ["type-9-so", "type-9-sx", "type-7-sp", "type-5-sp", "type-1-sp"],
  },
  {
    slug: "type-9-so",
    type: 9, instinct: "SO",
    ...TYPE_NAMES[9],
    ichazoKeyword: "Participation",
    modernLabel: "Participation",
    isCountertype: true,
    countertypeReason: "Hyperactive participation and busyness inverts the Nine's characteristic sloth — the Nine who looks like a Three or a Two",
    mechanism: "Sloth + social instinct → self-forgetting through hyperactive participation in group activities; merging with the group's agenda as an escape from one's own",
    primaryMistype: "Type 2 (active service to group); Type 3 (busy productivity)",
    intro: "The SO-9 is the countertype: the Nine who self-forgets not through inactivity but through constant, exhausting participation in group life. Chestnut: 'the workaholic Nine.' They are always doing — for the group, the community, the organization, the family — and this doing is precisely the sloth in disguise: they are busy with others' agendas because engaging with their own would require the Nine's most difficult work: knowing what they actually want and asserting it.",
    profile: "The SO-9 can appear to be the most energetic Nine — often genuinely productive, warm, and engaged with community. But the busyness is driven by self-forgetting, not self-expression: they do not know what they want because they have dissolved so thoroughly into the group's needs that the question does not arise. Naranjo's observation is precise: 'the sloth of the SO-9 is in not attending to themselves.' The most extroverted and socially present of the Nine expressions, which makes them the easiest to mistake for other types — they can read as a Two (service-oriented), a Three (busy and productive), or a Six (loyal to the group). What distinguishes them is the characteristic Nine quality of not quite being there — present to others, absent to self.",
    somatic: "Often the most physically active and expressive of the Nines; warm, approachable, the person others seek out for their easy presence — but close attention reveals the characteristic Nine blankness when asked directly about their own preferences.",
    healthy: "The genuinely community-engaged Nine who participates because they genuinely want to — present to others and to themselves simultaneously.",
    unhealthy: "The one who can never say no, never names their own needs, runs on others' agendas until exhausted and resentful; the self dissolved so completely into group life that it cannot be found.",
    growth: "Growth toward type 3 means discovering what they actually want and pursuing it with real energy — the pleasure of self-directed accomplishment.",
    metaDescription: "The SO-9 countertype self-forgets through constant participation — the busiest, most active-looking Nine who appears like a Two or Three.",
    relatedSlugs: ["type-9-sp", "type-9-sx", "type-2-so", "type-3-so", "type-6-so"],
  },
  {
    slug: "type-9-sx",
    type: 9, instinct: "SX",
    ...TYPE_NAMES[9],
    ichazoKeyword: "Fusion / Union",
    modernLabel: "Union",
    isCountertype: false,
    mechanism: "Sloth + SX instinct → self-forgetting through merging with the beloved; the boundaries of self dissolve into the intimate bond, which becomes the Nine's primary reality",
    primaryMistype: "Type 2 (merging with beloved); Type 4 (romantic depth and longing)",
    intro: "The SX-9 self-forgets through union — merging so completely with the beloved that the question of their own desires, preferences, and identity effectively dissolves. The SX instinct's drive toward intense one-to-one bonding fuses with the Nine's foundational sloth to produce the most thorough dissolution of self available in the subtype system.",
    profile: "The most sensitive, most merging, and most relationally oriented of the Nine expressions. SX-9s are exquisitely attuned to the inner life of the beloved — their merging is so complete that they often know what the other person feels before the other person does. This empathic capacity is genuine and valuable; the problem is that it operates through a dissolution of the boundary between self and other. They lose track of where they end and the beloved begins. Opinions form in response to the beloved's opinions; preferences emerge in the shape of whatever the other prefers. The sloth is in this: the SX-9 does not need to know what they want because they have merged with someone who already knows, and that knowing becomes their own.",
    somatic: "Warm, physically yielding, easily attuned to the physical presence and comfort of the other; often physically affectionate and comfortable with sustained closeness.",
    healthy: "The Nine whose empathy arises from genuine presence rather than self-dissolution — deeply attuned to others without losing the thread of their own experience.",
    unhealthy: "Codependent merger, loss of identity in the partner's orbit, chronic confusion between their own feelings and the partner's feelings, inability to locate a self outside the bond.",
    growth: "Growth toward type 3 means developing a self that exists independently of the bond — discovering their own genuine desires and pursuing them with real investment.",
    metaDescription: "The SX-9 loses self through merging with the beloved — the most empathic, boundary-dissolving expression of Enneagram Type 9.",
    relatedSlugs: ["type-9-sp", "type-9-so", "type-2-sx", "type-4-sx", "type-6-sx"],
  },
];

// ─── Lookup helpers ───────────────────────────────────────────────────────────

export function getSubtypeBySlug(slug: string): SubtypeEntity | undefined {
  return ENNEAGRAM_SUBTYPES.find((s) => s.slug === slug);
}

export function getSubtypesByType(type: number): SubtypeEntity[] {
  return ENNEAGRAM_SUBTYPES.filter((s) => s.type === type);
}

export function getSubtypesByInstinct(instinct: Instinct): SubtypeEntity[] {
  return ENNEAGRAM_SUBTYPES.filter((s) => s.instinct === instinct);
}

export function getCountertypes(): SubtypeEntity[] {
  return ENNEAGRAM_SUBTYPES.filter((s) => s.isCountertype);
}

export const INSTINCT_LABELS: Record<Instinct, string> = {
  SP: "Self-Preservation",
  SO: "Social",
  SX: "Sexual / One-to-One",
};

export const INSTINCT_DESCRIPTIONS: Record<Instinct, string> = {
  SP: "The self-preservation instinct governs survival, material security, physical comfort, and the maintenance of the body. In the enneagram, it modifies each type's passion toward the domain of personal survival and physical wellbeing.",
  SO: "The social instinct governs group belonging, status within communities, and the maintenance of social bonds. It modifies each type's passion toward the domain of group dynamics and collective standing.",
  SX: "The sexual or one-to-one instinct governs intense bonding, attraction, and the drive toward complete merger with a significant other. It modifies each type's passion toward the domain of intimate connection and one-to-one intensity.",
};
