/**
 * Enneagram Knowledge Base
 *
 * Parsed from: Enneagram_Complete_Reference.docx
 * Primary sources: Ichazo, Naranjo, Riso-Hudson, Almaas, Fauvre, Chestnut
 *
 * STATIC DATA — never regenerated at runtime. No API calls in production.
 * This file is the single authoritative Enneagram knowledge base for the app.
 */

// ─── Quick-reference table ───────────────────────────────────────────────────

export const TYPE_QUICK_REF = {
  1: { egoName: "Ego-Resent", fixation: "Resentment", passion: "Anger",    virtue: "Serenity",         holyIdea: "Holy Perfection",                      trap: "Perfection",   integration: 7, disintegration: 4 },
  2: { egoName: "Ego-Flat",   fixation: "Flattery",    passion: "Pride",    virtue: "Humility",          holyIdea: "Holy Freedom / Holy Will",             trap: "Freedom",      integration: 4, disintegration: 8 },
  3: { egoName: "Ego-Go",     fixation: "Vanity",      passion: "Deceit",   virtue: "Authenticity",      holyIdea: "Holy Hope / Holy Harmony / Holy Law",  trap: "Efficiency",   integration: 6, disintegration: 9 },
  4: { egoName: "Ego-Melan",  fixation: "Melancholy",  passion: "Envy",     virtue: "Equanimity",        holyIdea: "Holy Origin",                          trap: "Authenticity", integration: 1, disintegration: 2 },
  5: { egoName: "Ego-Stinge", fixation: "Retention",   passion: "Avarice",  virtue: "Non-Attachment",    holyIdea: "Holy Omniscience / Holy Transparency", trap: "Observer",     integration: 8, disintegration: 7 },
  6: { egoName: "Ego-Cow",    fixation: "Cowardice",   passion: "Fear",     virtue: "Courage",           holyIdea: "Holy Faith / Holy Strength",           trap: "Security",     integration: 9, disintegration: 3 },
  7: { egoName: "Ego-Plan",   fixation: "Planning",    passion: "Gluttony", virtue: "Sobriety",          holyIdea: "Holy Wisdom / Holy Plan / Holy Work",  trap: "Idealism",     integration: 5, disintegration: 1 },
  8: { egoName: "Ego-Venge",  fixation: "Vengeance",   passion: "Lust",     virtue: "Innocence",         holyIdea: "Holy Truth",                           trap: "Justice",      integration: 2, disintegration: 5 },
  9: { egoName: "Ego-Indol",  fixation: "Indolence",   passion: "Sloth",    virtue: "Action",            holyIdea: "Holy Love",                            trap: "Seeker",       integration: 3, disintegration: 6 },
} as const;

// ─── Full type data ───────────────────────────────────────────────────────────

export const ENNEAGRAM_TYPES = {
  1: {
    type: 1,
    name: "The Reformer",
    egoName: "Ego-Resent",
    instinctZone: "Historical Ego (Conservation/Self-Preservation)",
    horneyGroup: "Moving Against (Expansive/Mastery Solution)",
    fixation: "Resentment",
    passion: "Anger",
    virtue: "Serenity",
    holyIdea: "Holy Perfection",
    trap: "Perfection",
    defenseMechanism: "Reaction Formation",
    dsmCorrelation: "Obsessive-Compulsive Personality Disorder (OCPD)",
    integration: 7,
    disintegration: 4,
    ichazoArc: {
      passion: "Anger is the passion of type 1, and it must be understood as a pervasive undercurrent rather than as episodic rage. The 1's anger is continuous — a chronic, low-grade frustration arising from the gap between how things are and how they should be. This gap is everywhere and always — in other people's behavior, in the state of institutions, in the quality of work, and in the type's own performance. The anger is rarely expressed directly; instead, it is channeled and transformed through the characteristic defense mechanism of reaction formation into resentment, criticism, and the enforcement of principles.",
      fixation: "Resentment is the cognitive structure through which anger operates — a chronic sense of grievance and indignation at imperfection, wrongdoing, and the failure of things to meet their proper standard. The mind of type 1 is organized around noticing what is wrong, what falls short, and what ought to be corrected. This is not malicious — the type is typically sincere in their desire for improvement — but it means the mental atmosphere is dominated by a critical eye that finds imperfection wherever it looks.",
      trap: "The trap for type 1 is perfection itself. In attempting to transcend anger and resentment by becoming truly perfect — by doing things correctly enough, by being principled enough, by reforming enough — the 1 becomes increasingly enslaved to an impossible standard. The trap is that perfection, as the ego constructs it, is never attainable. Every achievement reveals new areas of inadequacy. The pursuit of perfection keeps the resentment alive because nothing ever fully measures up.",
      holyIdea: "Holy Perfection is the recognition that reality, as it is, already participates in a divine perfection — that the universe is complete and functioning according to its own inherent order, not requiring the ego's correction. Perfection is not imposed from without but is inherent to the unfolding of reality. In Facets of Unity, Almaas describes Holy Perfection as the direct perception that everything is, in every moment, perfect in the sense that it is exactly what it is — ontological perfection rather than moral perfectionism. When this is lost, the type 1 ego constructs a world of imperfection that requires correction.",
      virtue: "Serenity as the virtue for type 1 is the calm equanimity that arises when the chronic anger and resentment have been released — not the forced pleasantness of someone suppressing irritation, but the genuine quiet that comes from accepting what is without the compulsive need to fix it. The serene 1 can still act toward improvement but from a place of acceptance rather than indignation.",
    },
    naranjoStructure: {
      summary: "Naranjo's chapter is titled 'Resentment, Perfectionism, and the Overcorrect Character.' The core character structure is organized around the internalization of a harsh inner critic — a tyrannical superego that has been so thoroughly introjected that it functions as if it were the type's own voice. The type 1 has converted their instinctual anger into principled action through reaction formation, making it difficult to recognize the anger beneath the righteousness.",
      keyTraits: [
        "Perfectionism — the compulsive drive toward correctness, quality, and getting it right",
        "Resentment — chronic low-grade irritation at imperfection and wrongdoing",
        "Self-control — managing of impulse through principled discipline",
        "Criticality — automatic noticing of what is wrong or could be improved",
        "Righteousness — strong sense of moral authority, often expressed as moralizing",
        "Orderliness — need for structure, rules, and systems",
        "Suppressed anger expressed as sarcasm, irritability, or sanctimonious behavior",
      ],
      defenseMechanism: "Reaction formation — anger is converted into its opposite in conscious expression, becoming principled behavior, self-discipline, and righteous indignation. The underlying anger is transformed into a preoccupation with correctness that functions as its socially acceptable expression.",
    },
    subtypes: {
      SP: {
        name: "Anxiety",
        description: "The SP One is the most overtly anxious of the three subtypes — the worry-centered One who expresses the perfectionism as a chronic concern about getting practical things right. This One is focused on material security and the management of concrete life circumstances, and their perfectionism manifests as anxiety about whether they are doing enough, have planned sufficiently, and are managing their resources correctly. They can look like type 6 in their anxiety and anticipatory worrying. The anger of type 1 is most suppressed in this subtype and most likely to emerge as psychosomatic symptoms or as unexpected explosions after prolonged containment.",
        countertype: false,
      },
      SO: {
        name: "Non-Adaptability / Perfect Model",
        description: "The SO One is the most explicitly principled and socially reformist of the three subtypes — a person whose perfectionism extends to the social order and whose mission is to embody and promote correct behavior in the collective. This One functions as a standard-bearer — someone who models right conduct and expects others to meet a high bar. They are more overtly critical of social norms that fail to measure up, and they can be the most openly moralistic of the three subtypes. Their anger tends to be most directly expressed as indignation at social injustice, institutional failure, or moral compromise.",
        countertype: false,
      },
      SX: {
        name: "Zeal",
        description: "The SX One is the countertype — the most passionate and emotionally intense of the three subtypes, and the most difficult to identify as a One. The sexual instinct pushes against the type's characteristic self-control, producing a One who is fervent, zealous, and capable of intense one-to-one engagement. This One is the most visibly angry and most capable of expressing that anger directly in the context of intimate relationships or causes they are devoted to. They have a missionary quality — a burning conviction that they must persuade those close to them of the rightness of their vision. This One can look like type 4 in their emotional intensity or type 8 in their directness.",
        countertype: true,
      },
    },
  },

  2: {
    type: 2,
    name: "The Helper",
    egoName: "Ego-Flat",
    instinctZone: "Image Ego (Relation/Social)",
    horneyGroup: "Moving Toward (Compliant/Self-Effacing Solution)",
    fixation: "Flattery",
    passion: "Pride",
    virtue: "Humility",
    holyIdea: "Holy Freedom / Holy Will",
    trap: "Freedom",
    defenseMechanism: "Repression",
    dsmCorrelation: "Histrionic Personality Disorder / Dependent Personality Disorder",
    integration: 4,
    disintegration: 8,
    ichazoArc: {
      passion: "Pride is the passion of type 2, and it operates in a counterintuitive way: this is not the obvious grandiosity of self-importance but a pride organized around the specialness of the type's giving. The type 2's pride is the belief that they alone know what others need, that their love is uniquely necessary, and that their worth is demonstrated through their capacity to give what others cannot give themselves. Pride in Ichazo's sense means the substitution of an inflated self-image for genuine contact with the self — and the type 2's inflated self-image is organized around being indispensable, loving, and needed.",
      fixation: "Flattery is the cognitive expression of pride — the type's habitual mode of managing their image through the generous projection of positive qualities onto others. The type 2 flatters others not purely as a manipulation (though it can function that way) but as the natural expression of their relational orientation: they see what is best in people and offer it back to them. This flattery also functions as the type's primary interpersonal currency — the implicit exchange in which appreciation and love are given in hopes of receiving them back.",
      trap: "Freedom is the trap for type 2. In attempting to transcend the pride and the conditionality of their giving — by becoming genuinely freely loving, by giving without expectation of return — the type 2 becomes increasingly enslaved to the image of the free giver. Freedom becomes another form of self-definition, another way the type organizes its identity around the performance of selflessness.",
      holyIdea: "Holy Freedom is the recognition that the soul is inherently free — that its existence and worth are not contingent on what it provides to others, and that the will of Being supports each individual existence unconditionally. Holy Will is the related recognition that the will of Being — the fundamental tendency of reality — supports each form of existence from within. The loss of these perceptions leads to the type 2's ego organizing around the premise that love must be earned and the self must be useful to be acceptable.",
      virtue: "Humility as the virtue for type 2 is the simple recognition of one's own genuine needs — the capacity to know what one wants and to receive care as well as give it. The humble 2 does not inflate their own importance or their necessity to others, and they do not perform selflessness while secretly keeping score. They can give and receive without the transaction.",
    },
    naranjoStructure: {
      summary: "Naranjo's chapter is titled 'Pride, Seduction, and the Histrionic Character.' The core structure is organized around a fundamental need for love that is managed through the performance of lovability rather than through direct expression of need. The type 2 has repressed their genuine needs and feelings and replaced them with an orientation toward others' needs and feelings, becoming the expert on what others need while remaining largely unaware of what they themselves need.",
      keyTraits: [
        "Helpfulness and service as the primary mode of relating",
        "Seductiveness — a gift for reading what others want and providing it",
        "Possessiveness — difficulty allowing close others to have needs the type cannot meet",
        "Intrusion — tending to give what they think is needed rather than what is asked for",
        "Flattery — generous attribution of positive qualities to those they are attached to",
        "Pride — conviction of their own specialness in loving",
        "Repression of genuine needs — chronic unawareness of their own wants and feelings",
      ],
      defenseMechanism: "Repression — genuine needs, feelings of anger, and awareness of the type's own vulnerability are systematically kept out of conscious awareness, replaced by the orientation toward others' needs. The repression is so thorough that the type typically does not experience themselves as repressed but as genuinely selfless.",
    },
    subtypes: {
      SP: {
        name: "Privilege",
        description: "The SP Two is the countertype — the most materially self-interested of the three subtypes and the one who looks least like a Two. This Two's pride takes the form of a sense of entitlement and a belief that their service and specialness justify special treatment and provision. They are more openly self-focused than the other subtypes, more concerned with their own comfort and well-being, and more likely to expect concrete forms of appreciation and reciprocation. They can look like type 3 in their self-confidence or like type 8 in their sense of entitlement. The seductiveness is most clearly expressed as the expectation of being looked after in return for the care they provide.",
        countertype: true,
      },
      SO: {
        name: "Ambition",
        description: "The SO Two is the classic Two presentation in the social domain — a person whose service is directed toward public life, organizations, institutions, and causes. This Two is often charismatic and publicly visible, using their warmth and relational genius to advance both their cause and their position within the social hierarchy. They want to be seen as good, helpful, and indispensable within their community or organization. This subtype's pride is most explicitly organized around social recognition and the visible expression of their generous nature.",
        countertype: false,
      },
      SX: {
        name: "Aggressive Seduction",
        description: "The SX Two directs their giving, seduction, and relational focus intensely toward specific individuals in one-to-one connection. This Two is the most overtly seductive in the sexual-instinctual sense — not necessarily sexually, but in the broader sense of deploying every interpersonal gift to capture and hold the attention and devotion of a specific other. They can be fiery, passionate, and directly demanding in their pursuit of the beloved. This subtype is the most visibly possessive and the most likely to experience their needs directly in the context of intimate relationships.",
        countertype: false,
      },
    },
  },

  3: {
    type: 3,
    name: "The Achiever",
    egoName: "Ego-Go",
    instinctZone: "Image Ego (Relation/Social)",
    horneyGroup: "Moving Against (Expansive/Mastery Solution)",
    fixation: "Vanity",
    passion: "Deceit",
    virtue: "Authenticity",
    holyIdea: "Holy Hope / Holy Harmony / Holy Law",
    trap: "Efficiency",
    defenseMechanism: "Identification (with Role and Image)",
    dsmCorrelation: "Narcissistic Personality Disorder",
    integration: 6,
    disintegration: 9,
    ichazoArc: {
      passion: "Deceit is the passion of type 3 — not primarily calculated lying, but a more fundamental and less conscious process: living for appearances rather than from genuine experience. The type 3 has lost touch with their own authentic experience, replacing it with the management of image. The deceit operates first against the self, making it difficult for the 3 to know what they genuinely feel, value, or want when this is not already structured around a performance goal.",
      fixation: "Vanity is the cognitive structure through which the deceit operates — a passionate concern for one's image, for how one appears to others, and for the performance of excellence and achievement. The mind of type 3 is oriented toward a 'generalized other' — the imagined audience whose approval, admiration, and recognition the type is continuously managing. Achievement matters not for its intrinsic satisfaction but for the value it confers in the eyes of this audience.",
      trap: "The trap for type 3 is efficiency. In attempting to transcend vanity through genuine accomplishment, the 3 becomes increasingly focused on being efficient — getting things done, cutting through obstacles, optimizing the process of achievement. Efficiency itself becomes the new image. The trap ensures the fixation continues because efficiency in service of image is still image.",
      holyIdea: "Holy Hope is the recognition that there is already a divine order, a natural unfolding of reality, that does not require the ego's management and performance to be real or worthwhile. Holy Harmony points to the natural flow of reality as already harmonious. Holy Law is the perception that reality functions according to its own inherent nature without requiring ego management. The loss of Holy Harmony produces a felt inner deadness — a sense that without the doing and achieving, there is nothing there.",
      virtue: "Authenticity as the virtue for type 3 means the recovery of genuine contact with one's own inner experience — feelings, values, preferences, and reactions that are not organized around how they will appear to others. The authentic 3 can be genuine rather than performed, can fail without this constituting a threat to identity, and can be with others in actual relationship.",
    },
    naranjoStructure: {
      summary: "Naranjo's chapter is titled 'Vanity, Inauthenticity, and the Marketing Orientation.' He takes his central framing from Erich Fromm's concept of the marketing orientation — a character structure in which the self is experienced primarily as a commodity whose value depends on how well it is packaged and sold in the marketplace. The type 3 has replaced authentic being with the performance of being — they do not simply have an image, they are their image.",
      keyTraits: [
        "Achievement orientation — continuous drive toward success, status, and visible excellence",
        "Adaptability — ability to read what is valued in a given context and become that",
        "Efficiency and pragmatism — getting results in the most effective way possible",
        "Competitiveness — sensitivity to being seen as less than or behind comparison others",
        "Emotional inauthenticity — difficulty accessing genuine emotion",
        "Image consciousness — attention to how one is perceived is constant and automatic",
        "Workaholism — work and achievement as primary medium of self-expression and self-worth",
      ],
      defenseMechanism: "Identification — specifically identification with the role and the image. Where most people have a self that plays roles, the type 3 has become the role so thoroughly that they cannot easily step outside it.",
    },
    subtypes: {
      SP: {
        name: "Security / Vanity About Having No Vanity",
        description: "The SP Three is the countertype and the most difficult Three to identify as a Three because their vanity expresses as a vanity about not having vanity. This Three wants to be seen as successful and effective, but emphatically does not want to be seen as someone who cares about image. They are the most one-ish of the Threes — practical, self-sufficient, hard-working, and genuinely focused on doing things well rather than looking like they do them well. The image management is still operative, but organized around the image of a person who does not need image management. SP Threes may have even less access to their genuine emotional life than the others precisely because the image of self-sufficiency requires that emotion be managed invisibly.",
        countertype: true,
      },
      SO: {
        name: "Prestige",
        description: "The SO Three is the classic Three that most people think of when they encounter the type description. This Three is explicitly motivated by recognition, status, and the admiration of the group or organization. They need to be seen as successful and will actively work to position themselves advantageously. SO Threes are often charismatic, confident, and visible, extremely sensitive to being made to look bad or being surpassed. This Three has the hardest time with genuine vulnerability.",
        countertype: false,
      },
      SX: {
        name: "Charisma / Achievement for the Beloved",
        description: "The SX Three achieves in service of important others and can be the most emotional and relationally oriented of the three subtypes. This Three excels at attracting specific individuals — their charisma and polish are deployed in the service of securing the admiration and devotion of one-to-one objects. They can be shy as persons while being outwardly impressive in presentation. They tend to support and promote others — particularly specific beloved others — with great dedication. This can make them look like type 2 in their relational focus, but the underlying motivation remains about the image they project and the admiration they receive.",
        countertype: false,
      },
    },
  },

  4: {
    type: 4,
    name: "The Individualist",
    egoName: "Ego-Melan",
    instinctZone: "Image Ego (Relation/Social)",
    horneyGroup: "Moving Away (Resigned/Detachment Solution — with self-effacing elements)",
    fixation: "Melancholy",
    passion: "Envy",
    virtue: "Equanimity",
    holyIdea: "Holy Origin",
    trap: "Authenticity",
    defenseMechanism: "Introjection",
    dsmCorrelation: "Depressive / Masochistic / Borderline Personality Disorder",
    integration: 1,
    disintegration: 2,
    ichazoArc: {
      passion: "Envy is the passion of type 4, operating as a continuous felt sense of lack relative to others — a painful awareness that others seem to have something the type 4 does not: happiness, belonging, a natural ease with life. This is not simple jealousy over specific possessions. It is a more pervasive orientation: others seem to have what one lacks, and what one lacks is fundamental — something about the basic fabric of one's own being seems deficient, incomplete, or damaged relative to the wholeness others seem to possess.",
      fixation: "Melancholy is the cognitive manifestation of envy — the habitual attunement to what is missing, what has been lost, what cannot be recovered, and what will never be. The mind of type 4 dwells in a space between the real and the ideal, acutely sensitive to the gap and prone to romanticizing what is absent and devaluing what is present. What is here tends to lose its appeal; what is there — in memory, in imagination, in an idealized future — seems more real and more valuable.",
      trap: "The trap for type 4 is authenticity. In attempting to transcend melancholy and envy by finding their true self, the type 4 becomes increasingly preoccupied with cultivating authenticity. But the search for authenticity is itself driven by the ego: the authentic self that the type 4 is looking for is another image, another object of idealization that will always be just out of reach. The real inner experience — including the suffering — is sometimes mistaken for authenticity itself, making the suffering paradoxically precious and resistant to resolution.",
      holyIdea: "Holy Origin is the recognition that the self already has a source — that its identity is not something to be created or discovered through searching but something that already exists, already belongs to it, and is not contingent on comparison with others. The loss of contact with Holy Origin produces the type 4's specific delusion: the sense of being fundamentally different from others, cut off from the source that others seem to possess naturally. The specific difficulty is a felt deficiency of being — not just feeling bad, but feeling that one's very being is somehow less real, less whole, than it should be.",
      virtue: "Equanimity as the virtue for type 4 is not the suppression of emotion or unfeeling calm, but genuine emotional balance — the capacity to be with whatever emotion arises without being overwhelmed by it, without dramatizing it, and without needing to interpret it as evidence of one's fundamental nature. The equanimous 4 can feel deeply without the feeling defining them.",
    },
    naranjoStructure: {
      summary: "Naranjo's chapter on type 4 is titled 'Envy, Self-Deficiency, and a Depressive-Masochistic Character.' He emphasizes that the most characteristic feature, alongside envious motivation, is the tendency toward self-victimization and frustration. The type 4 is the enneagram's foremost sufferer — not in the sense of suffering the most objectively, but in the sense of having constructed an identity that is deeply organized around suffering.",
      keyTraits: [
        "Emotional intensity — feelings experienced and expressed with unusual depth and force",
        "Self-absorption — the inner world is rich and compelling, sometimes to the exclusion of genuine outer contact",
        "Aesthetic sensitivity — gift for beauty, nuance, and the expression of complex emotional states",
        "Self-pity and self-criticism — chronic tendency to find oneself lacking",
        "Romantic longing — orientation toward the absent, the lost, and the idealized",
        "Competitiveness — particularly in the SX subtype — urgency to be most intense, most authentic",
        "Masochism — tendency to sustain and even deepen suffering rather than resolve it",
      ],
      defenseMechanism: "Introjection — the internalization of painful experiences, particularly the experience of being rejected, abandoned, or found lacking. Rather than experiencing loss as something that happened to them, the type 4 takes the loss inside: 'I lost because I am deficient. The problem is me.' This converts external grief into internal self-attack.",
    },
    subtypes: {
      SP: {
        name: "Tenacity / Reckless Courage",
        description: "The SP Four is the countertype and the most frequently mistyped — many people who cannot find themselves in the enneagram turn out to be SP Fours, because this type does not display the expected emotional expressiveness and melodrama. The SP Four does not suffer out loud. They are stoic, self-disciplined, and self-contained — more masochistic than melodramatic. They challenge themselves to endure pain without flinching and often make a virtue of their capacity to sustain hardship. These are tougher, more austere Fours who can look like type 1 in their self-discipline or type 5 in their reserve. The suffering is real and intense, but it is silent.",
        countertype: true,
      },
      SO: {
        name: "Shame / Tragic Romantic",
        description: "The SO Four embodies the classic type 4 presentation: emotionally sensitive, prone to lamentation, deeply attuned to their own suffering and to what they lack relative to others. The SO Four tends to take on the victim role and to compare themselves unfavorably with others in the social context. Unlike the SX Four, the SO Four is not competitive but instead self-abasing — there is a tendency toward self-recrimination and shame. The suffering is worn relatively openly and can attract compassion from others, though it can also become self-perpetuating.",
        countertype: false,
      },
      SX: {
        name: "Competition / Assertive Envy",
        description: "The SX Four is assertive, competitive, and prone to expressing envious anger openly. Where the SO Four suffers through shame, and the SP Four suffers in silence, the SX Four makes others suffer — or at least is not shy about asserting their own needs and desires in ways that can push against others. They are shameless in expressing what they want, competitive in a way that is unusual for the type, and prone to voicing needs and expectations directly. This Four can resemble type 8 in their intensity and willingness to confront, or type 2 in their relational intensity.",
        countertype: false,
      },
    },
  },

  5: {
    type: 5,
    name: "The Investigator",
    egoName: "Ego-Stinge",
    instinctZone: "Adaptation Ego (Adaptation/Sexual)",
    horneyGroup: "Moving Away (Detachment/Resigned Solution)",
    fixation: "Retention",
    passion: "Avarice",
    virtue: "Non-Attachment",
    holyIdea: "Holy Omniscience / Holy Transparency",
    trap: "Observer",
    defenseMechanism: "Isolation of Affect",
    dsmCorrelation: "Schizoid Personality Disorder / Schizotypal",
    integration: 8,
    disintegration: 7,
    ichazoArc: {
      passion: "Avarice is the passion of type 5, and it must be understood at its psychological root rather than in its surface manifestation as material hoarding. Avarice is the conviction that the self has a finite and limited supply of inner resources — energy, attention, time, knowledge, emotional reserves — and that contact with the world depletes this supply. The strategic response is to minimize outflow and maximize inward accumulation. This is not greed in the ordinary sense: the type 5 is often materially modest. It is a fundamental orientation to existence as costly.",
      fixation: "Retention is the cognitive expression of avarice — the mind's clinging to what has been gathered. Ideas, observations, experiences, and inner material are accumulated but not discharged. The inner world becomes elaborated, complex, and rich, while the outer world receives only a carefully managed portion of what the type actually contains. The fixation also involves a specific temporal dynamic: processing happens after experience, in private solitude, rather than in the moment.",
      trap: "The trap for type 5 is the observer position. In attempting to understand the world fully before engaging with it, the type 5 withdraws into an observational stance — watching, analyzing, categorizing — which itself becomes the permanent relationship to life. The observer position feels like the preparation for eventual full engagement, but it functions as a permanent substitute for it.",
      holyIdea: "Holy Omniscience is the recognition that knowledge of reality is available through participation and immersion in it, not through detached observation. Holy Transparency is the recognition that reality is already penetrable, already transparent to direct perception, without the mediation of accumulated knowledge structures. The type 5's specific delusion is that consciousness is fundamentally separate from the world — that to know something is to stand outside it and observe. The specific difficulty is a felt sense of profound inner emptiness — the paradox being that the type with the most accumulated content is often the most deeply aware of an existential hollowness beneath all the accumulation.",
      virtue: "Non-attachment as the virtue for type 5 must be carefully distinguished from the detachment that is already the type's characteristic defense. Detachment is a pulling back from contact. Non-attachment is the capacity to be fully present in experience without clinging to or hoarding it. The non-attached 5 can engage generously, give what they have, and allow the encounter with the world to be what it is — including costly — without this constituting a threat to survival.",
    },
    naranjoStructure: {
      summary: "Naranjo's chapter on type 5 is titled 'Avarice and Pathological Detachment.' The core structure is organized around a radical withdrawal from the world of people and relationships and an investment instead in the inner world of thought, observation, and private experience. The internal atmosphere is one of quietness and the characteristic stance is one of calm, controlled, minimally expressive containment.",
      keyTraits: [
        "Intellectual orientation — thinking and knowledge as the primary medium of engagement",
        "Emotional detachment — systematic separation of thought from affect",
        "Minimalism — needs kept small to reduce dependency",
        "Privacy and boundaries — strong protection of inner space and time",
        "Introversion — energy flows inward",
        "Tendency to specialize — deep engagement with narrow domains of interest",
        "Difficulty with anger — felt rarely and expressed even more rarely",
        "Dry or sardonic humor — when present at all",
      ],
      defenseMechanism: "Isolation of affect — the separation of thought from feeling. An idea can be entertained, analyzed, and integrated intellectually without the corresponding emotional charge being present. This allows the type 5 to engage with almost any content at the intellectual level without being destabilized.",
    },
    subtypes: {
      SP: {
        name: "Castle / Sanctuary",
        description: "The SP Five has the most pronounced withdrawal of any of the twenty-seven subtypes. The dominant expression of avarice in the self-preservation domain is the need for hiddenness, sanctuary, and total control over personal space and time. This Five is the most reclusive, the most physically minimalist, and the most explicitly focused on reducing dependency to zero. They need a space — physical, temporal, relational — that is entirely their own, where no demands can reach them. Even within close relationships, the SP Five maintains a sanctuary that cannot be entered.",
        countertype: false,
      },
      SO: {
        name: "Totem / Super Ideals",
        description: "The SO Five is somewhat more socially engaged than the other two subtypes, but the engagement is always mediated through knowledge and intellectual contribution. This Five relates to groups through expertise — they become the repository of a particular kind of rare or specialized knowledge that makes them the authority on a specific domain. They do not relate to the group as persons but to what is most exceptional and outstanding within the group. The SO Five is motivated by a search for meaning that transcends ordinary existence; the knowledge they accumulate and transmit is not merely practical but oriented toward the profound and the significant.",
        countertype: false,
      },
      SX: {
        name: "Confidence / Romantic Longing",
        description: "The SX Five is the countertype and the Five that most departs from the type stereotype. The sexual instinct pushes hard against the avarice, demanding intensity, depth, and merger with a specific chosen other. This is one of the most romantic of the twenty-seven subtypes, with a vibrant and intense inner life organized around the possibility of finding the one person they can trust completely with their inner world. The SX Five does open — they can be surprisingly passionate, emotionally expressive, and deeply invested in intimate connection — but the opening is highly selective. This Five can look like a Four in their romanticism and emotional depth.",
        countertype: true,
      },
    },
  },

  6: {
    type: 6,
    name: "The Loyalist",
    egoName: "Ego-Cow",
    instinctZone: "Adaptation Ego (Adaptation/Sexual)",
    horneyGroup: "Complex / Moving Toward and Against (Ambivalent)",
    fixation: "Cowardice",
    passion: "Fear",
    virtue: "Courage",
    holyIdea: "Holy Faith / Holy Strength",
    trap: "Security",
    defenseMechanism: "Projection",
    dsmCorrelation: "Paranoid Personality Disorder",
    integration: 9,
    disintegration: 3,
    ichazoArc: {
      passion: "Fear as a passion is not a specific fear of a specific thing but a general orientation to reality as threatening and unreliable. The 6's fundamental experience is one of profound doubt — doubt in their own judgment, doubt in others' motives, doubt in the stability of any given situation. This pervasive doubt means that the world never feels fully safe, that allies may become enemies, that support may be withdrawn, and that the self may be discovered to be inadequate when the moment of truth arrives.",
      fixation: "Cowardice, in Ichazo's specific sense, is not moral weakness or simple timidity. It is the habitual shrinking from one's own authority and judgment — the cognitive pattern of deferring to external structures, authorities, and allies rather than trusting the self. This can produce phobic behavior (avoiding what is feared) or counterphobic behavior (attacking what is feared pre-emptively) — both are expressions of the same underlying structure.",
      trap: "The trap is security. In attempting to overcome the fear through the establishment of safe structures, reliable alliances, and tested systems, the type 6 becomes increasingly devoted to the maintenance of security. But the security is always provisional — always one threat away from collapse — because it is external and structural rather than arising from genuine internal groundedness.",
      holyIdea: "Holy Faith is the recognition that reality is fundamentally trustworthy — that the ground of Being provides real support and that the ego does not need to constantly manufacture and maintain its own security. Holy Strength is the direct perception that the soul's nature includes an inherent capacity — not the ego's competence but an ontological strength that is simply part of what the soul is. The specific delusion of type 6 is that strength and security must be obtained from outside.",
      virtue: "Courage as the virtue for type 6 is not the absence of fear but the capacity to act from one's own genuine judgment even in the presence of fear. The courageous 6 does not need external authority to validate their perceptions, does not need certainty before acting, and does not need to eliminate all threats before moving forward.",
    },
    naranjoStructure: {
      summary: "Naranjo's analysis of type 6 is complex because the type expresses in two apparently opposite forms — phobic (shrinking from threat) and counterphobic (attacking toward it) — that are expressions of the same underlying structure. The core is an acute sensitivity to danger combined with a fundamental lack of trust in the self's own authority.",
      keyTraits: [
        "Loyalty and commitment to chosen allies, groups, or systems",
        "Skepticism and questioning — doubt is the cognitive default",
        "Hypervigilance — scanning for threat is constant",
        "Authority ambivalence — simultaneous need for and resistance to authority figures",
        "Self-doubt — chronic questioning of one's own perceptions and judgments",
        "Intelligence in systems thinking — exceptional ability to see how systems function and where vulnerabilities exist",
        "Courage under genuine external threat — paradoxically remarkable bravery when a real external danger is identified",
      ],
      defenseMechanism: "Projection — attributing to the outer world the threatening qualities that actually originate in the type's own inner dynamics. The 6 projects their own aggression, their own ambivalence, their own doubt onto others, and then responds to the threat as if it came from outside.",
    },
    subtypes: {
      SP: {
        name: "Warmth / Affection",
        description: "The SP Six manages fear through seeking the warm embrace of family and friends. In a world they perceive as dangerous, they construct safety through becoming embedded in a network of close, trustworthy relationships. They work to be friendly, reliable, and deeply supportive. This Six is more openly warm and relationally oriented than the other subtypes, and their fear manifests primarily as insecurity and anxiety about whether the protective relationships will remain stable. They can look like Twos in their warmth and investment in relationships.",
        countertype: false,
      },
      SO: {
        name: "Duty / Prussian",
        description: "The SO Six manages fear by adhering to rules, codes, and ideological frameworks. This is the most legalistic of the Sixes — a person who finds security not in individual relationships or in their own judgment but in the impersonal authority of agreed-upon principles and systems. They need to know what the rules are and to follow them precisely. Naranjo described this subtype as having a 'Prussian' quality — efficient, dutiful, and devoted to the code. They can be strict, even rigid, in their application of principles.",
        countertype: false,
      },
      SX: {
        name: "Strength / Intimidation",
        description: "The SX Six is the most counterphobic of the Sixes and the countertype of the triad — the type that most goes against the expected presentation of type 6. Where the phobic expressions of 6 shrink from danger, the SX Six moves toward it. Their program is that the best defense is a strong offense, and they manage fear by developing strength, skill, and the capacity to intimidate. This Six can look like an Eight — assertive, bold, provocative — but the underlying motivation is fear-management rather than the 8's desire for autonomy and control.",
        countertype: true,
      },
    },
  },

  7: {
    type: 7,
    name: "The Enthusiast",
    egoName: "Ego-Plan",
    instinctZone: "Adaptation Ego (Adaptation/Sexual)",
    horneyGroup: "Moving Away (Resigned) with Strong Expansive Elements",
    fixation: "Planning / Charlatanism",
    passion: "Gluttony",
    virtue: "Sobriety",
    holyIdea: "Holy Wisdom / Holy Plan / Holy Work",
    trap: "Idealism",
    defenseMechanism: "Rationalization / Intellectualization",
    dsmCorrelation: "Narcissistic Personality Disorder (distinct from type 3)",
    integration: 5,
    disintegration: 1,
    ichazoArc: {
      passion: "Gluttony as a passion must be understood at its psychological depth rather than as simple pleasure-seeking. Ichazo defined gluttony as the belief that all good and desirable things exist outside of the self, and that the self must go out and acquire them. This arises from a deeply felt sense of interior emptiness. The type takes a pleasant current experience and projects it forward into an imagined future ecstasy — more of this would be extraordinary. The tragedy is structural: the more the type attempts to fill the interior with external experience, the less capable they become of finding the fulfillment they seek.",
      fixation: "Planning as the fixation is the mind's continuous production of alternative futures. The cognitive landscape of type 7 is always populated with possibilities, projects, and anticipated experiences. Naranjo observed that 'planning' is actually an inadequate label because planning appears prominently in types 1 and 3 as well. Charlatanism carries the additional dimensions: the expressive capacity, the role of persuader, and the manipulation through words that exceeds the limits of actual knowledge.",
      trap: "The trap is idealism. The type 7 is concerned with manipulating the present so that the future will perfectly fulfill their ideals. When the future becomes the present, they are disappointed — and must immediately begin working toward a new ideal. This structural loop is guaranteed, not accidental: the ideal future cannot survive contact with actuality because its function was never fulfillment but escape.",
      holyIdea: "Holy Wisdom is the direct perception that reality exists as a succession of present moments, and that it is only by existing in the present — rather than in imagined futures — that the constant unfolding of the cosmos can actually be experienced. Holy Work is the recognition that conscious, sustained engagement with what is actually in front of one — including through difficulty and tedium — is the source of the deepest satisfaction available. Holy Plan is the recognition that there is already a natural order unfolding in this moment.",
      virtue: "Sobriety as the virtue for type 7 is not joylessness, restraint, or ascetic denial — these would be 7-ish misreadings. Ichazo's sobriety is the state of being fully awake, clear, and in unmediated contact with immediate experience — present without the overlay of anticipation, alert without excitement, satisfied without needing a particular experience to be the source of that satisfaction.",
    },
    naranjoStructure: {
      summary: "Naranjo's analysis of type 7 describes a character organized around hedonism, narcissism, and the systematic avoidance of pain through the generation of pleasurable experience. He emphasized the distinctness of type 7's narcissism from type 3's: where the 3's narcissism is performance-based and oriented toward achievement in the eyes of others, the 7's narcissism is more directly self-referential — the world is evaluated primarily in terms of what it offers to the self's experience.",
      keyTraits: [
        "Gluttony for experience — appetite for stimulation, ideas, and new encounters",
        "Optimism and reframing — genuine cognitive gift for finding the positive angle",
        "Narcissistic entitlement — implicit assumption that one's desires should take priority",
        "Impulsiveness — action and decision driven by excitement rather than deliberation",
        "Charm and likeability — social facility and genuine warmth in initial encounter",
        "Difficulty with commitment — any commitment thins the buffer of open futures",
        "Avoidance of depth — conversations, relationships, and projects that become heavy activate the escape mechanism",
      ],
      defenseMechanism: "Rationalization — the extraordinary capacity to produce convincing intellectual reasons for doing what they want to do regardless. Closely related is intellectualization — converting emotional material into abstract intellectual content so that it loses its charge and can be engaged with without the accompanying feeling.",
    },
    subtypes: {
      SP: {
        name: "Keepers of the Castle / Family",
        description: "The SP Seven manages gluttony through building a network of reliable allies, trusted companions, and a comfortable material world. This Seven is pragmatic and materialistic — oriented toward securing pleasure through concrete, tangible experience rather than idealized futures. They form alliances and collect around themselves a kind of chosen family that they can rely on exclusively, resisting dependence on others they do not trust while being generous and engaged within their inner circle. Of the three Seven subtypes, this one is the most grounded and practical.",
        countertype: false,
      },
      SO: {
        name: "Sacrifice / Counter-Gluttony",
        description: "The SO Seven is the countertype and the Seven who looks least like a Seven — sometimes confused with type 2, type 1, or type 6. The social instinct fuses with the gluttony in an unexpected way: the SO Seven sublimates personal pleasure-seeking and focuses instead on supporting the group, alleviating collective suffering, and embodying an ideal of selfless contribution. The gluttony does not disappear — it relocates from personal pleasure to collective ideals and the vision of a better world. This Seven can appear almost self-denying and has a moralistic edge unusual for the type.",
        countertype: true,
      },
      SX: {
        name: "Fascination / Suggestion",
        description: "The SX Seven is an idealist and dreamer who focuses the gluttony on the fascinating qualities of a specific person or ideal. This is a gluttony for the higher — for idealization, for the feeling of being in love with a person, an idea, or a possibility. They look at things with the optimism of someone perpetually enchanted, and they tend to embellish reality with their enthusiastic imagination. The SX Seven can look like a Four in their romantic intensity and focus on an idealized other, but the mechanism is different: where the 4 is organized around deficiency and what is absent, the 7 is organized around inflation and what could be.",
        countertype: false,
      },
    },
  },

  8: {
    type: 8,
    name: "The Challenger",
    egoName: "Ego-Venge",
    instinctZone: "Historical Ego (Conservation/Self-Preservation)",
    horneyGroup: "Moving Against — Vindictive Solution",
    fixation: "Vengeance",
    passion: "Lust",
    virtue: "Innocence",
    holyIdea: "Holy Truth",
    trap: "Justice",
    defenseMechanism: "Denial",
    dsmCorrelation: "Antisocial Personality Disorder / Sadistic",
    integration: 2,
    disintegration: 5,
    ichazoArc: {
      passion: "Lust as the passion of type 8 must be understood broadly, beyond the sexual dimension. It refers to an intense, forceful appetite for experience — a quality of excess in engagement with life. The type 8 meets the world with full force: their desires, their appetites, their anger, their affections are all experienced and expressed with an intensity and directness that other types moderate. The lust also has a specific quality of wanting to know the truth of a situation — to strip away pretense and falseness and encounter what is real.",
      fixation: "Vengeance as the fixation is not the conscious desire for revenge but a more fundamental cognitive orientation: the world is divided into the strong and the weak, the just and the unjust, the trustworthy and the untrustworthy, and those who have wronged others must be made to account. Justice — the real righting of genuine wrongs — is the driving concern. The mind of type 8 is alert to injustice, exploitation, and the abuse of power.",
      trap: "The trap is justice. In attempting to correct the vengeance and the anger, the type 8 becomes devoted to justice — to making things right, to protecting the vulnerable, to punishing the abusive. This is a genuinely more mature expression of the type's energy, but it is still a trap because the demand for justice is still fueled by the same underlying lust and anger.",
      holyIdea: "Holy Truth is the recognition that reality is transparent — that the nature of things is already revealed to direct perception and does not require force to uncover. The type 8's belief that truth must be seized, that the world is full of falseness and pretense, that power is required to strip away the surface, is a distortion of this direct perception. The specific delusion of type 8 is that only what is forced into the open is real.",
      virtue: "Innocence as the virtue for type 8 is perhaps the most surprising of the nine virtues — the association between an 8 and innocence is counterintuitive. But Ichazo's innocence is the quality of engaging with the world without the pre-armored expectation of threat, betrayal, and the need for force. The innocent 8 meets each situation freshly, without the defensive overlay of past betrayals.",
    },
    naranjoStructure: {
      summary: "Naranjo's chapter on type 8 is titled 'Sadistic Character and Lust.' He describes the core as excess in the service of dominance — a fundamental orientation toward the world in terms of power, strength, and the assertion of will. The type 8 is the most openly aggressive of the nine types and the one who most clearly expresses Horney's vindictive character.",
      keyTraits: [
        "Dominance and authority — automatic orientation toward leading and controlling situations",
        "Directness — what is thought is said, usually without social filtering",
        "Impulsiveness in action — acting on desire without excessive deliberation",
        "Protectiveness — genuine care for those under their protection, combined with ferocity toward anything threatening them",
        "Denial of weakness — vulnerability, need, and tenderness are actively suppressed",
        "Boundary testing — other people's limits are regularly pushed",
        "A quality of aliveness — often among the most vitally present of all the types",
      ],
      defenseMechanism: "Denial — specifically denial of vulnerability, weakness, tenderness, and need. The type 8 does not suppress these qualities through reaction formation but simply denies their existence: 'I don't need anything, I am not afraid, I don't get hurt.' This denial can be so thorough that the type 8 loses genuine access to these dimensions of their experience.",
    },
    subtypes: {
      SP: {
        name: "Survival / Satisfactory",
        description: "The SP Eight expresses lust most directly as the drive to get what is theirs — to secure what they need for survival with speed and force, without excessive negotiation or justification. They have a strong intolerance of frustration and a powerful need for immediate satisfaction of material needs and desires. This Eight is the most self-contained and armored of the three subtypes — the most purely self-interested in a material sense. They do not talk much about what they want; they simply go and get it.",
        countertype: false,
      },
      SO: {
        name: "Solidarity / Complicity",
        description: "The SO Eight is the countertype — the Eight who goes most against the typical Eight expression. This Eight is motivated by loyalty and the protection of the group, rather than personal dominance. The violence of this subtype, when it occurs, is a violence of solidarity — acting forcefully in defense of those they are loyal to. Naranjo described the archetype as the child who becomes violent in protecting the mother from an abusive father: a violence born of commitment, not personal aggression. The SO Eight is less openly aggressive and less visibly dominating than the other two subtypes.",
        countertype: true,
      },
      SX: {
        name: "Possession / Surrender",
        description: "The SX Eight has the strongest antisocial tendency and is the most openly rebellious of the three subtypes. They are out front with their values, their dissatisfactions, and their refusal to comply with norms they find unjust or inauthentic. This Eight is the most colorful and emotionally intense of the three — passionate, energetic, and capable of filling a room with their presence. They use their force to take over the entire scene — to make their reality the dominant reality of any encounter. Their lust is most directly expressed in one-to-one intensity and the demand for total honesty and engagement in their intimate connections.",
        countertype: false,
      },
    },
  },

  9: {
    type: 9,
    name: "The Peacemaker",
    egoName: "Ego-Indol",
    instinctZone: "Historical Ego (Conservation/Self-Preservation)",
    horneyGroup: "Moving Away (Resigned/Detachment) with moving toward elements",
    fixation: "Indolence",
    passion: "Sloth / Accidia",
    virtue: "Action",
    holyIdea: "Holy Love",
    trap: "Seeker",
    defenseMechanism: "Narcotization / Numbing",
    dsmCorrelation: "Passive-Aggressive / Dependent Personality Disorder",
    integration: 3,
    disintegration: 6,
    ichazoArc: {
      passion: "Naranjo draws attention to the inadequacy of the word 'sloth' as a translation of the original term accidia. In its ancient theological sense, accidia refers not to physical laziness but to a loss of interest in spiritual values, a failure of love toward the divine and toward one's own soul. The sloth of type 9 is fundamentally a sloth toward the self — a failure to take one's own existence, desires, and priorities seriously. Not physical laziness (which may or may not be present) but a laziness of being — a disinclination to assert, to prioritize, to insist on the reality of one's own experience.",
      fixation: "Indolence as the fixation is the cognitive pattern of psychological inertia — a resistance to movement that operates at the level of inner experience. The mind of type 9 tends not to initiate: thoughts, feelings, priorities, and positions don't arise spontaneously from within but are drawn out by the external environment or by others. There is a 'paucity of inner experience' (Naranjo's phrase) — the inner world is relatively quiet not because it is peaceful but because the type has habituated to not attending to it.",
      trap: "The trap for type 9 is the seeker. In attempting to recover connection with their own aliveness and depth, the type 9 becomes a seeker of experiences, teachings, and systems that will provide what they cannot generate from within. But the seeking is itself another form of the problem: it maintains the orientation that the answer lies outside the self. No amount of seeking will resolve this because the problem is not the absence of good enough experiences but the habitual non-engagement with whatever experience is present.",
      holyIdea: "Holy Love is the recognition that love — in its most fundamental sense — is the inherent nature of reality, and that the self is already held within that love, already participated in it, already of value within the fabric of being. The 9's ego is organized around the complete absence of this recognition. Holy Love contradicts this: the self is already loved, already of consequence, already real. The specific difficulty is a felt sense of being fundamentally unimportant and unloved — not dramatically, as in type 4, but with a quiet resignation that has become so habitual that it is rarely felt as suffering.",
      virtue: "Action as the virtue for type 9 means the willingness to engage from one's own center — to initiate, to prioritize, to insist on the reality of one's own experience and desires without waiting for external permission or impetus. The active 9 does not mean an anxious or driven 9, but rather one who is genuinely present: who allows themselves to want things, to matter to themselves, to make their existence felt in the world.",
    },
    naranjoStructure: {
      summary: "Naranjo's chapter on type 9 is titled 'Sloth, Over-Adjustment, and the Self-Forgetting Character.' He describes the core as a syndrome of psychological inertia, a loss of interiority, and a resigned and abnegated character that results in a good-hearted but fundamentally self-absent orientation to life. The type 9 is the 'most forgotten' of the types — they forget themselves, they are forgotten by the popular imagination.",
      keyTraits: [
        "Comfort with routine and familiarity — the known and manageable is deeply preferred",
        "Conflict avoidance — harmony maintained through suppression of one's own needs and positions",
        "Distractibility — attention moves easily to peripheral matters as a way of avoiding the central",
        "Stubbornness — while appearing yielding, the type 9 can be immovable when pressured directly",
        "Identification with others' agendas — in absence of clear access to one's own priorities, others' preferences fill the space",
        "Groundedness and equanimity — genuine at its best, but partly the equanimity of reduced engagement",
        "Diligence as compensation — 'insane industry' (Naranjo) working in service of others' priorities rather than their own",
      ],
      defenseMechanism: "Narcotization — the numbing of inner experience through absorption in comfortable, low-stakes activity. Eating, television, mild exercise, routine tasks — activities that provide a comfortable texture of engagement without requiring genuine inner mobilization. The narcotization works against boredom, against the awareness of one's own absence, and against the grief that would arise if the full extent of the self-forgetting were to become conscious.",
    },
    subtypes: {
      SP: {
        name: "Appetite",
        description: "The SP Nine manages sloth through absorption in physical routines and comfortable familiar activities — eating, sleeping, habitual exercise, reading, doing crossword puzzles. The comfort and merging is with experience rather than with people: losing oneself in the texture of physical sensation and familiar routine is the most immediate form of the type's dissipation of self. This Nine tends to be more solitary than the other subtypes, more clearly preferring the comfortable and familiar to the novel or demanding.",
        countertype: false,
      },
      SO: {
        name: "Participation",
        description: "The SO Nine is the countertype of the three Nines — the one who goes most against the expected presentation of the type. Where the SP Nine withdraws into comfortable physical activity, the SO Nine leans in and participates actively in groups and communities. They work hard and unselfishly in service of the group, often taking on the role of mediator, facilitator, or quiet backbone of the collective. This Nine can look like a Three in their productivity and group investment, or like a Two in their service orientation. The sloth operates here at the level of their own priorities being perpetually subordinated to the group's.",
        countertype: true,
      },
      SX: {
        name: "Union / Fusion",
        description: "The SX Nine manages sloth through fusing with a specific other person — borrowing their passion for living, their priorities, and their agenda as a substitute for their own. These Nines try to gain a sense of being not found inside themselves by merging with someone who is important to them. They may not realize they are living through specific others — the merging is unconscious and can feel like deep love and compatibility rather than self-substitution. SX Nines tend to be tender, sweet, and deeply kind, with a quality of soft attentiveness to the beloved.",
        countertype: false,
      },
    },
  },
} as const;

// ─── Wings ────────────────────────────────────────────────────────────────────

export const WINGS = {
  "1w9": { name: "The Idealist", description: "The 9 wing adds a more detached, philosophical, and internally focused quality to the 1. This One is quieter and more contemplative, their perfectionism more inwardly directed and less interpersonally expressed. They can be profoundly principled but less visibly righteous. There is a quality of measured wisdom and principle without the heat of the more overtly reformist expressions." },
  "1w2": { name: "The Advocate", description: "The 2 wing adds warmth, interpersonal orientation, and a genuine care for others to the 1's principled structure. This One is more outwardly engaged, directing their reform energy through relationship and helping. They can be both more compassionate and more morally demanding of others, with a quality of devoted service to an ethical vision." },
  "2w1": { name: "The Servant", description: "The 1 wing adds moral structure, self-discipline, and principled criteria to the 2's service orientation. This Two tends to be more restrained and formal, giving according to clear principles of what is genuinely good for the other rather than purely in response to emotional impulse. They can be more critical and less unconditionally affirming." },
  "2w3": { name: "The Host/Hostess", description: "The 3 wing adds social ambition, image consciousness, and achievement orientation to the 2's relational focus. This Two is more socially prominent, more explicitly concerned with being seen as helpful and good, and often moves in public-facing roles where their giving is visible. They can be more driven, competitive, and image-aware." },
  "3w2": { name: "The Charmer", description: "The 2 wing adds interpersonal warmth, relational investment, and genuine care for specific others to the 3's achievement drive. This Three is more personally engaging, more emotionally present in relationships, and tends to achieve in contexts that involve direct human connection and support of others." },
  "3w4": { name: "The Professional", description: "The 4 wing adds depth, self-awareness, and aesthetic sensibility to the 3's performance orientation. This Three has more access to genuine feeling, more capacity for creative expression, and a tendency to be concerned with the quality and authenticity of their work, not just its reception. They can be more introspective and less straightforwardly adaptable." },
  "4w3": { name: "The Aristocrat", description: "The 3 wing adds achievement orientation, social engagement, and image consciousness to the 4's emotional depth. This Four is more publicly visible, more concerned with how their uniqueness is expressed and recognized in the world, and more capable of sustained action in service of their creative vision." },
  "4w5": { name: "The Bohemian", description: "The 5 wing adds intellectual depth, withdrawal, and a rich interior life that goes beyond emotion to the 4's characteristic intensity. This Four tends to be quieter, more privately organized, more eccentric, and more oriented toward esoteric knowledge and private creative work. They can be among the most intellectually original of the types." },
  "5w4": { name: "The Iconoclast", description: "The 4 wing adds emotional depth, aesthetic sensitivity, and a quality of romanticism and personal expression to the 5's intellectual orientation. This Five tends to be more creative, more invested in the communication of their inner experience, and more emotionally present — though still fundamentally withdrawn compared to most types." },
  "5w6": { name: "The Problem Solver", description: "The 6 wing adds loyalty, system-orientation, and a quality of collaborative contribution to the 5's knowledge accumulation. This Five is more oriented toward practical application of knowledge, more socially embedded in specific trusted communities, and less purely individualistic than the 5w4." },
  "6w5": { name: "The Defender", description: "The 5 wing adds intellectual depth, analytical precision, and a withdrawn quality to the 6's vigilance. This Six tends to be more self-reliant, more analytically capable, and more comfortable in solitary research and problem-solving. They are less interpersonally warm than the 6w7 but more capable of independent judgment." },
  "6w7": { name: "The Buddy", description: "The 7 wing adds warmth, spontaneity, and social engagement to the 6's loyalty and vigilance. This Six is more openly friendly and engaged, more capable of humor and lightness, and often more overtly likeable. They can be more impulsive and less systematically analytical than the 6w5." },
  "7w6": { name: "The Entertainer", description: "The 6 wing adds loyalty, commitment, and a quality of genuine relational investment to the 7's enthusiasm. This Seven is somewhat more grounded, more likely to sustain engagement with specific people and projects over time, and more aware of systemic risks and dangers. They can be more anxious than the 7w8." },
  "7w8": { name: "The Realist", description: "The 8 wing adds force, directness, and a pragmatic worldliness to the 7's idealism and enthusiasm. This Seven is more confident, more action-oriented, more willing to pursue pleasure through direct assertion rather than charm and planning. They can be more overtly aggressive and less concerned with maintaining the good opinion of others." },
  "8w7": { name: "The Maverick", description: "The 7 wing adds expansiveness, vision, and an entrepreneurial quality to the 8's power orientation. This Eight tends toward big ideas, wide domains of influence, and a quality of enthusiasm for new ventures. They are often the most extroverted of the Eights and the most capable of genuine pleasure and play." },
  "8w9": { name: "The Bear", description: "The 9 wing adds groundedness, patience, and a quality of steady, immovable presence to the 8's forcefulness. This Eight tends to be quieter and less overtly combative, but can be more deeply stubborn and implacable. They often have a quality of deeply reliable protectiveness that makes them trusted by those close to them." },
  "9w8": { name: "The Referee", description: "The 8 wing adds assertiveness, physical presence, and a capacity for direct action and conflict to the 9's accommodation. This Nine is more capable of standing their ground and asserting their position when necessary, and tends to be more physically oriented and less primarily mental." },
  "9w1": { name: "The Dreamer", description: "The 1 wing adds idealism, internal principle, and a quality of philosophical contemplation to the 9's easy-going nature. This Nine tends to be more conscientious, more concerned with right action, and more likely to have a developed inner life of moral and philosophical reflection. They can be more quietly self-critical than the 9w8." },
} as const;

// ─── Tritypes ─────────────────────────────────────────────────────────────────

export const TRITYPES: Record<string, { name: string; description: string }> = {
  "125": { name: "The Mentor",          description: "Combines the 1's principled perfectionism, the 2's interpersonal warmth and service orientation, and the 5's analytical depth. Focused on improvement through both relationship and knowledge — a teacher, advisor, or guide who wants to help others become their best." },
  "126": { name: "The Supporter",       description: "Combines principled action, warm service, and loyal collaboration. A highly conscientious helper who wants to do what is right, serve those they care for, and uphold the systems and alliances that protect the group." },
  "127": { name: "The Teacher",         description: "Combines perfectionist idealism with generous service and enthusiastic vision. An optimistic mentor who wants to inspire, improve, and make learning and growth joyful." },
  "135": { name: "The Strategist",      description: "Produces an intensely self-reliant, intellectually capable, and achievement-oriented character focused on competence, correctness, and mastery. Often the most self-contained and driven of the 1-based tritypes." },
  "136": { name: "The Taskmaster",      description: "Combines the drive for correctness with achievement ambition and systematic loyalty. Highly responsible, reliable, and concerned with both quality and security." },
  "137": { name: "The Systems Builder", description: "Combines principled action, achievement, and enthusiastic vision. A driven, optimistic, and highly capable type who wants to make the ideal real through sustained effort and intelligent strategy." },
  "145": { name: "The Researcher",      description: "Produces a deeply interior, melancholic, and intellectually intense character focused on the search for authentic truth. Often highly creative, private, and critical of anything that falls short of a very high standard." },
  "146": { name: "The Philosopher",     description: "Combines idealism, emotional depth, and vigilant questioning. A probing, concerned, and sincere character simultaneously drawn to deep feeling and cautious analysis." },
  "147": { name: "The Visionary",       description: "Produces a romantic, idealistic, and creatively expansive character who seeks to make the world match their vision of beauty and meaning. The most creatively ambitious of the 1-based tritypes." },
  "258": { name: "The Strategist",      description: "Combines warm relational service with intellectual depth and forceful protectiveness. A powerful, knowledgeable, and intensely loyal type who provides both care and protection." },
  "259": { name: "The Peacekeeper",     description: "Produces a warm, quiet, gentle, and deeply caring character who prefers to support from the background and maintains peace through both empathy and wisdom." },
  "268": { name: "The Rescuer",         description: "Combines the drive to help with vigilant protectiveness and forceful advocacy. One of the most actively protective tritypes — caring for others through active defense of their wellbeing." },
  "269": { name: "The Good Samaritan",  description: "The most conventionally 'nice' of the tritypes — deeply warm, loyal, and conflict-avoiding, oriented toward everyone's needs and everyone's comfort." },
  "278": { name: "The Messenger",       description: "Combines enthusiastic generosity, visionary enthusiasm, and forceful impact. A bold, inspiring, and warmly assertive type who wants to uplift others through confident action." },
  "279": { name: "The Peacemaker",      description: "Warm, optimistic, accommodating, and deeply invested in harmony and positive connection for all." },
  "358": { name: "The Solution Master", description: "Combines achievement ambition, intellectual mastery, and forceful execution. One of the most practically powerful tritypes — strategic, independent, and results-driven." },
  "359": { name: "The Thinker",         description: "Combines achievement with intellectual depth and a calm, accommodating groundedness. A quietly effective type who prefers to let results speak for themselves." },
  "368": { name: "The Justice Fighter", description: "Combines achievement ambition with vigilant protectiveness and forceful advocacy for what is right. Driven, reliable, and willing to fight for worthy causes." },
  "369": { name: "The Mediator",        description: "A highly adaptable, relationally oriented, and conscientiously helpful character. The most 'chameleon-like' of the tritypes — genuinely able to read and respond to diverse contexts." },
  "378": { name: "The Mover Shaker",    description: "Combines achievement drive, enthusiastic vision, and bold assertiveness. One of the most overtly ambitious and action-oriented tritypes — strategic, charismatic, and forceful." },
  "379": { name: "The Ambassador",      description: "Combines achievement with optimism and a gentle, accommodating nature. An effective and personable type who accomplishes goals through positive energy and social ease." },
  "458": { name: "The Scholar",         description: "Combines emotional depth, intellectual intensity, and forceful will. One of the most powerfully individualistic and creatively serious tritypes — deeply interior but capable of forceful assertion." },
  "459": { name: "The Contemplative",   description: "Perhaps the most withdrawn, reflective, and introverted of the twenty-seven archetypes — deeply interior, quietly observant, and seeking meaning through solitude and understanding." },
  "468": { name: "The Truth Teller",    description: "Combines emotional intensity, questioning vigilance, and forceful directness. Deeply concerned with authenticity and injustice, and willing to confront both." },
  "469": { name: "The Seeker",          description: "Deeply feeling, sensitive, questioning, and relationally oriented — one of the most openly emotionally complex of the twenty-seven archetypes." },
  "478": { name: "The Messenger",       description: "Combines romantic depth, enthusiastic idealism, and forceful will. A passionate, dramatic, and intensely alive type who pursues their vision with total commitment." },
  "479": { name: "The Gentle Spirit",   description: "Imaginative, romantic, accommodating, and quietly deep — one of the more gentle and spiritually oriented of the tritypes." },
};

// ─── Instinctual stacking ─────────────────────────────────────────────────────

export const INSTINCT_DESCRIPTIONS = {
  SP: {
    name: "Self-Preservation",
    domain: "Physical survival, security, comfort, health, and resource management",
    dominant: "Preoccupied with practical matters: finances, health, housing, food, comfort, and the material conditions for a secure life. Often pragmatic, grounded, and attentive to concrete details of daily existence.",
    repressed: "Tends to be neglectful of their own material needs, health, and basic security. May ignore bodily signals, neglect finances, or be chronically uncomfortable in their physical environment without attending to this.",
    coreQuestion: "Am I safe? Do I have what I need? Is my environment secure and comfortable?",
  },
  SO: {
    name: "Social",
    domain: "Belonging, position within groups, social role, status, and navigation of collective dynamics",
    dominant: "Preoccupied with how they fit into the social fabric: who is in their group, what their role is, what norms govern their collective, and what their standing is.",
    repressed: "Tends to be relationally isolated, unaware of their social impact or position, and often struggling with a sense of not belonging that they cannot easily articulate. May be socially clumsy without being aware of it.",
    coreQuestion: "Do I belong? What is my role in the group? Am I accepted and valued by my community?",
  },
  SX: {
    name: "Sexual / One-to-One",
    domain: "Intense intimate connection, attraction, and the drive for deep merging",
    dominant: "Preoccupied with the quality and depth of their most important connections and with what is exciting, compelling, and vivid in their experience.",
    repressed: "Tends to be emotionally flat, less passionate about both people and ideas, and often unaware of what genuinely moves them or of the intensity of what others feel for them.",
    coreQuestion: "Am I fully alive? Is there genuine connection and intensity in my life? Am I truly known and seen by those closest to me?",
  },
} as const;

export const STACKING_ORDERS = {
  "SP/SO": "Practical and grounded with secondary social investment. The most conventional and stable stacking: focused on material security and reliable group participation. Less likely to seek intensity or drama. Often highly functional and reliable.",
  "SP/SX": "Practical and private, with intense selectivity in close connection. Self-sufficient on the surface with a strong one-to-one depth in specific chosen relationships. Can appear very independent and reserved while being privately deeply invested in a small number of people. Often creative, inward, and intense in private.",
  "SO/SP": "Group-oriented with a strong practical foundation. Concerned with their role and status in communities while maintaining material security. Often more conventionally social and socially competent than SO/SX. The most 'mainstream' stacking in many respects.",
  "SO/SX": "Group-oriented with strong one-to-one intensity. Often the most charismatic and publicly engaging stacking — socially invested and emotionally intense. Can be powerful cultural figures, activists, or community leaders.",
  "SX/SP": "Intensely one-to-one with a strong private foundation. Deeply intimate with specific others, fiercely private and self-sufficient otherwise. Often creative and interior, with a strong need for both intense connection and equally intense solitude.",
  "SX/SO": "Intensely relational and socially engaged, with the one-to-one intensity coloring the entire social presence. Often magnetic and culturally influential. The most outwardly energized stacking — both the social and sexual instincts are directed outward.",
} as const;

// ─── Centers of intelligence ──────────────────────────────────────────────────

export const CENTERS = {
  gut: {
    name: "Gut / Body / Instinctual Center",
    types: [8, 9, 1] as const,
    dominantEmotion: "Anger",
    egoZone: "Historical Ego",
    description: "The three types of the gut center share a primary orientation to the world through bodily intelligence, instinctual response, and the domain of autonomy and will. The underlying emotion driving this center is anger — though each type relates to anger differently. Type 8 expresses anger overtly and powerfully. Type 9 suppresses and diffuses anger through merging and withdrawal. Type 1 converts anger into resentment and principled action through reaction formation.",
    healthyCapacity: "Embodied knowing, direct response to environment, and the assertion of presence and boundary.",
    distortedExpression: "Excessive reactivity, physical tension, and difficulty moving from automatic response to reflective choice.",
  },
  heart: {
    name: "Heart / Feeling / Emotional Center",
    types: [2, 3, 4] as const,
    dominantEmotion: "Shame",
    egoZone: "Image Ego",
    description: "The three types of the heart center share a primary orientation to the world through feeling, relationship, and the domain of identity and image. The underlying emotion is shame — a deep concern about worth, lovability, and identity. Type 2 manages shame through pride and the performance of lovability. Type 3 manages shame through achievement and the replacement of genuine identity with successful image. Type 4 manages shame through the cultivation of a special and unique identity.",
    healthyCapacity: "Genuine emotional intelligence — the capacity to feel what one feels, to empathize accurately with others, and to relate to others from genuine care.",
    distortedExpression: "Emotional experience becomes organized around whether one is acceptable, valuable, or lovable, rather than being available for genuine contact and empathy.",
  },
  head: {
    name: "Head / Thinking / Mental Center",
    types: [5, 6, 7] as const,
    dominantEmotion: "Fear",
    egoZone: "Adaptation Ego",
    description: "The three types of the head center share a primary orientation to the world through thought, strategy, and the domain of security and certainty. The underlying emotion is fear — anxiety about one's capacity to cope with the world and to find safety within it. Type 5 manages fear through withdrawal, accumulation, and the observer position. Type 6 manages fear through vigilance, alliances, and the ongoing scanning for threat. Type 7 manages fear through forward movement, planning, and the inflation of possibilities.",
    healthyCapacity: "Genuine mental clarity — the capacity to perceive reality directly, to think creatively and strategically without the distortion of anxiety.",
    distortedExpression: "Thinking becomes defensive rather than exploratory.",
  },
} as const;

export const HORNEVIAN_GROUPS = {
  compliant: {
    name: "The Compliant Group (Moving Toward)",
    types: [1, 2, 6] as const,
    description: "These types seek security and support through compliance with internal rules (1), with others' needs (2), or with established structures and authorities (6). They tend to subordinate their own needs to relational or structural demands.",
  },
  assertive: {
    name: "The Assertive Group (Moving Against)",
    types: [3, 7, 8] as const,
    description: "These types seek security through taking charge of their situation, asserting their will, and moving toward goals. They tend to trust themselves and to resist dependency.",
  },
  withdrawn: {
    name: "The Withdrawn Group (Moving Away)",
    types: [4, 5, 9] as const,
    description: "These types seek security through withdrawal from full engagement with the outer world, moving into inner space and away from the demands of direct engagement.",
  },
} as const;

export const HARMONIC_GROUPS = {
  positiveOutlook: {
    name: "The Positive Outlook Group",
    types: [2, 7, 9] as const,
    description: "These types respond to difficulty by maintaining a positive frame, minimizing the negative, and focusing on what is hopeful, pleasant, or manageable. They resist being drawn into conflict or suffering.",
  },
  competency: {
    name: "The Competency Group",
    types: [1, 3, 5] as const,
    description: "These types respond to difficulty by relying on their competence, solving the problem, and maintaining functional efficiency. They resist acknowledging the emotional dimension of difficulty and focus on objective problem-solving.",
  },
  reactive: {
    name: "The Reactive Group",
    types: [4, 6, 8] as const,
    description: "These types respond to difficulty by reacting intensely and expressing their emotional response. They need to be met in their feeling before they can move to problem-solving. They resist minimizing or bypassing the emotional reality.",
  },
} as const;

// ─── Lines of connection ──────────────────────────────────────────────────────

export const LINES_OF_CONNECTION = {
  structure: "The enneagram figure contains two sets of internal lines: the triangle connecting points 3, 6, and 9, and the hexagonal figure connecting points 1-4-2-8-5-7. Each type is connected to two other types by these lines.",
  connections: {
    1: [4, 7], 2: [4, 8], 3: [6, 9], 4: [1, 2], 5: [7, 8], 6: [3, 9], 7: [1, 5], 8: [2, 5], 9: [3, 6],
  } as Record<number, [number, number]>,
  integration: { 1: 7, 2: 4, 3: 6, 4: 1, 5: 8, 6: 9, 7: 5, 8: 2, 9: 3 } as Record<number, number>,
  disintegration: { 1: 4, 2: 8, 3: 9, 4: 2, 5: 7, 6: 3, 7: 1, 8: 5, 9: 6 } as Record<number, number>,
  keyMovements: [
    { type: 1, direction: "integration",    toward: 7, description: "The principled, controlled 1 accesses the spontaneity, enthusiasm, and joy of type 7 — becoming less rigid and more genuinely playful and accepting of imperfection." },
    { type: 1, direction: "disintegration", toward: 4, description: "Under stress, the 1 becomes moody, self-pitying, and irrationally emotional — the anger that was managed through perfectionism now breaks through as melancholic suffering." },
    { type: 5, direction: "integration",    toward: 8, description: "The withdrawn, intellectual 5 accesses the embodied presence, groundedness, and leadership capacity of type 8 — moving from observation into decisive action." },
    { type: 7, direction: "integration",    toward: 5, description: "The scattered, enthusiastic 7 accesses the depth, focus, and intellectual seriousness of type 5 — finding genuine satisfaction in sustained, deep engagement." },
    { type: 9, direction: "integration",    toward: 3, description: "The self-forgetting, inert 9 accesses the self-development, energy, and goal-directed engagement of type 3 — becoming genuinely invested in their own achievement and growth." },
  ],
  debate: "Claudio Naranjo, who originally developed the integration/disintegration concept, later modified and ultimately distanced himself from the theory as it became standardized in Riso-Hudson's work. His view evolved toward seeing the connections as indicating character relationships and influences rather than sequential developmental movements. Ichazo's original position was that the enneagram's lines indicate the principal psychological connections between types — the ways in which the ego structures relate to and draw from each other. Empirical evidence for directional movement along the lines is limited. The theory is useful as a heuristic but should not be taken as a precise psychological law.",
} as const;

// ─── Holy ideas in depth ──────────────────────────────────────────────────────

export const HOLY_IDEAS = {
  1: {
    name: "Holy Perfection",
    ichazo: "The perception that reality, as it is, already participates in a divine perfection — that the universe is complete and functioning according to its own inherent order, not requiring the ego's correction.",
    almaas: "Holy Perfection is the direct perception that everything is, in every moment, perfect in the sense that it is exactly what it is — that every phenomenon is the precise expression of its own nature. This is not moral perfectionism but ontological perfection: the recognition that Being is always fully and completely what it is. When this is lost, the type 1 ego constructs a world of imperfection that requires correction — substituting an ideal of how things should be for the direct perception of how things already are.",
  },
  2: {
    name: "Holy Freedom / Holy Will",
    ichazo: "The perception that the soul is inherently free — that its existence and worth are not contingent on what it provides to others, and that the will of Being supports each individual existence unconditionally.",
    almaas: "Holy Freedom is the recognition that the soul's nature includes an inherent freedom — a capacity to simply be without the requirement of earning or justifying its existence through service. The loss of this perception leads to the type 2's ego organizing around the premise that love must be earned. Holy Will is the related recognition that the will of Being — the fundamental tendency of reality — supports each form of existence from within.",
  },
  3: {
    name: "Holy Harmony / Holy Hope / Holy Law",
    ichazo: "The perception that there is already a divine order, harmony, or law governing the unfolding of reality — that the self does not need to create value or impose order but can participate in what is already real and already harmonious.",
    almaas: "Holy Law is the perception that reality functions according to its own inherent nature — that things are what they are and function as they function without requiring the ego's management or performance. Holy Harmony is the recognition that reality already flows smoothly as an expression of its inherent nature. The loss of this produces the type 3's belief that the self must make itself happen.",
  },
  4: {
    name: "Holy Origin",
    ichazo: "The perception that the self already has a source — that identity arises from and is rooted in Being itself, and is not something to be created or discovered through searching and suffering.",
    almaas: "Holy Origin is the recognition that the soul has a genuine ground — that it emerges from and remains rooted in the fundamental nature of Being, not as an isolated fragment but as an expression of the whole. The loss of this perception produces the type 4's sense of being fundamentally separate from the source that others seem to possess naturally, and the resulting preoccupation with constructing and maintaining a unique identity as a substitute for the genuine ground.",
  },
  5: {
    name: "Holy Omniscience / Holy Transparency",
    ichazo: "The perception that reality is already knowable — that knowledge is not acquired through distance and accumulation but through participation and presence.",
    almaas: "Holy Omniscience is the perception that consciousness and reality are not fundamentally separate — that to know is not to stand outside but to participate in. Holy Transparency is the recognition that reality is already open and available to direct perception without the mediation of accumulated knowledge structures. The loss of these perceptions produces the type 5's belief that consciousness must be isolated to be safe.",
  },
  6: {
    name: "Holy Faith / Holy Strength",
    ichazo: "The perception that reality is fundamentally trustworthy — that the ground of Being provides genuine support, and that the self's inherent capacity is real and sufficient.",
    almaas: "Holy Strength is the direct perception of the soul's inherent capacity — not the ego's competence but an ontological strength that is simply part of what the soul is. Holy Faith is the recognition that this strength is trustworthy — that reality's fundamental nature is supportive rather than threatening. The loss of these perceptions produces the type 6's pervasive doubt and the resulting vigilance and alliance-seeking as substitutes for genuine internal grounding.",
  },
  7: {
    name: "Holy Wisdom / Holy Plan / Holy Work",
    ichazo: "The perception that reality unfolds in each present moment as the optimal experience, and that genuine satisfaction arises from conscious engagement with what is actually present rather than anticipation of what is imagined.",
    almaas: "Holy Wisdom is the awareness that reality exists as a succession of present moments, and that it is only by being in the present that the unfolding of the cosmos can actually be experienced. The type 7's entire strategy of planning and future-inflation is based on the premise that the present is insufficient; Holy Wisdom reveals that the present is itself the site of the fullness being sought. Holy Work is the recognition that sustained engagement with what is actually present — including when it is difficult — is the source of genuine depth and satisfaction.",
  },
  8: {
    name: "Holy Truth",
    ichazo: "The perception that reality is already real — that truth does not need to be forced into the open but is simply there, available to direct perception without the application of power.",
    almaas: "Holy Truth is the recognition that reality is inherently truthful — that the nature of things is not hidden and does not require force to reveal. The type 8's belief that truth must be seized, that the world will cover itself in pretense unless confronted with power, is a distortion of this direct perception. When Holy Truth is recovered, the type 8's capacity for directness and genuine encounter is freed from its armoring in aggression and dominance.",
  },
  9: {
    name: "Holy Love",
    ichazo: "The perception that love — in the fundamental sense of the inherent value and regard of Being for each particular existence — is the basic nature of reality, and that the self is already held within this love.",
    almaas: "Holy Love is the recognition that reality itself is intrinsically loving — not sentimental or conditional, but a basic fact about the nature of Being: it is supportive, accepting, and unconditionally sustaining of each particular form of existence. The type 9's ego has organized around the absence of this recognition — around the experience of not being loved enough for one's own existence to matter. Holy Love contradicts the premise: the self's existence is already of consequence, already held, already real in the fabric of Being.",
  },
} as const;

// ─── Cross-system correlations ────────────────────────────────────────────────

export const CROSS_SYSTEM = {
  bigFive: {
    note: "Moderate correlations (r = 0.61–0.73) have been found between the two models, suggesting they measure related but distinct aspects of personality. These are probabilistic tendencies, not deterministic rules.",
    typeCorrelations: {
      1: "High Conscientiousness, moderate Neuroticism, moderate Agreeableness. The perfectionism and self-discipline of type 1 map strongly onto Conscientiousness; the underlying anxiety onto Neuroticism.",
      2: "High Agreeableness, moderate Extraversion, moderate Conscientiousness. The relational orientation and helpfulness of type 2 are the strongest Big Five signature.",
      3: "High Extraversion, high Conscientiousness, low Neuroticism. The achiever's energy, social confidence, and emotional management map onto these dimensions.",
      4: "High Neuroticism, high Openness to Experience, lower Extraversion. The emotional intensity, aesthetic sensitivity, and inwardness of type 4.",
      5: "High Openness, low Extraversion, low Agreeableness (particularly in lower health ranges). The intellectual orientation, introversion, and self-containment.",
      6: "High Neuroticism, moderate Conscientiousness, moderate Agreeableness. The anxiety and vigilance of type 6 are the most distinctive Big Five feature.",
      7: "High Extraversion, high Openness, low Neuroticism. The enthusiasm, novelty-seeking, and positive affect of type 7.",
      8: "High Extraversion, low Agreeableness, high Dominance (facet of Extraversion). The assertiveness, directness, and low compliance of type 8.",
      9: "High Agreeableness, low Conscientiousness, lower Extraversion. The accommodating, easy-going, and self-effacing qualities of type 9.",
    },
    caveat: "These correlations are based on surface-trait overlap and may not accurately capture the motivational distinctions that enneagram theory considers primary. A type 1 and a type 6 may have similar Big Five profiles (both high Conscientiousness and Neuroticism) despite having very different core motivations.",
  },
  jungianMBTI: {
    note: "Correlations between enneagram types and MBTI types are among the most frequently discussed in the popular enneagram community and among the least systematically validated. The two systems measure different constructs: MBTI/Jungian cognitive functions describe patterns of information processing, while the enneagram describes motivational structure.",
    tendencies: {
      introversion: "Types 4, 5, 9 show stronger correlations with Introversion",
      extraversion: "Types 2, 3, 7, 8 show stronger correlations with Extraversion",
      intuition: "Types 4, 5, 7 show stronger correlations with iNtuition",
      sensing: "Types 1, 6, 9 show stronger correlations with Sensing",
    },
    conceptualParallels: "Jungian psychology and the enneagram share the concept of shadow — Jung's shadow being the unconscious repository of disowned qualities, corresponding loosely to the fixation and passion structure of the enneagram. The concept of psychological individuation in Jung has structural parallels to the enneagram's integration movement — the development toward a more whole, less ego-constrained personality. These conceptual parallels are genuinely interesting but should not be treated as evidence of systematic equivalence.",
  },
  horney: {
    movingToward: { types: [2, 6] as const, note: "2 (pride/service), 6 (cowardice/alliance), and partially 9 (sloth/merging)" },
    movingAgainst: { types: [1, 3, 8] as const, note: "1 (resentment/mastery), 3 (vanity/achievement), and 8 (vengeance/dominance)" },
    movingAway: { types: [4, 5, 7] as const, note: "4 (melancholy/resigned suffering), 5 (avarice/detachment), and 7 (planning/escape into ideation)" },
    note: "Naranjo drew explicitly on Karen Horney's work in developing his clinical descriptions of the ennea-types. Her descriptions of the vindictive character (type 8), the masochistic character (type 4), the narcissistic character (type 3), and the resignation type (type 9) are among the most precise clinical portraits available.",
  },
  reich: {
    note: "Wilhelm Reich's character analysis — particularly his concept of character armor — is relevant to several enneagram types. Naranjo drew on Reich's character types directly.",
    correlations: {
      1: "Reich's Compulsive Character: orderliness, reliability, obstinacy, parsimony, chronic muscular tightening particularly in the jaw, neck, and upper back.",
      8: "Reich's Phallic-Narcissistic Character: exhibitionism, forcefulness, confidence, and the belief in one's own exceptional potency. Reich described this type as often outwardly self-confident but covering deep vulnerability.",
      5: "Reich's Schizoid Character: extreme emotional withdrawal, isolation of affect, and a disconnection between inner experience and outer expression.",
    },
  },
  attachment: {
    note: "These correlations are based on clinical observation and theory rather than systematic research and should be held cautiously. Attachment style and enneagram type are distinct constructs.",
    anxiousPreoccupied: { types: [2, 6, 4] as const, description: "Types organized around fears of abandonment and the need for constant relational reassurance." },
    dismissiveAvoidant: { types: [5, 1, 3] as const, description: "Types that maintain distance, self-sufficiency, and cool emotional management in relationships." },
    secure: { description: "Associated with integrated or healthy expressions of all types, particularly those with strong type 9 presence (comfort, stability) or healthy type 7 (genuine openness and enthusiasm)." },
  },
} as const;

// ─── Sources ──────────────────────────────────────────────────────────────────

export const SOURCES = {
  ichazo: {
    name: "Oscar Ichazo",
    role: "Creator of the Enneagram of Personality as a psychological framework. Founder of Arica Institute. Developed Protoanalysis.",
    keyContributions: ["Nine ego fixations (ennea-types)", "Passions (vices)", "Virtues", "Holy Ideas", "Traps", "Three instincts (SP/SO/SX) as ego zones", "Trialectic logic", "Integration/disintegration directions (original framework)"],
  },
  naranjo: {
    name: "Claudio Naranjo",
    role: "Chilean psychiatrist who brought the Enneagram to Western psychology. Student of Ichazo at Arica.",
    keyContributions: ["Instinctual subtypes — the 27 subtypes", "DSM correlations for each type", "Defense mechanisms for each type", "Horney trend mapping", "Clinical character descriptions in Character and Neurosis"],
  },
  risoHudson: {
    name: "Don Richard Riso and Russ Hudson",
    role: "Enneagram researchers and teachers. Founded the Enneagram Institute.",
    keyContributions: ["Levels of Development (9 levels per type)", "Wing theory (18 combinations)", "Integration/disintegration theory (standardized)", "Hornevian and Harmonic group frameworks", "Extensive type profiles"],
  },
  almaas: {
    name: "A.H. Almaas (Hameed Ali)",
    role: "Philosopher and spiritual teacher. Founder of the Diamond Approach. Author of Facets of Unity.",
    keyContributions: ["Expanded Holy Ideas in Facets of Unity", "Specific delusion, difficulty, and reaction for each type", "Integration of enneagram with spiritual psychology"],
  },
  fauvre: {
    name: "Katherine Fauvre",
    role: "Independent enneagram researcher. Developer of tritype theory.",
    keyContributions: ["Tritype concept (27 archetypes)", "Tritype archetype names and descriptions", "Instinctual stacking elaborations"],
  },
} as const;

// ─── Glossary ─────────────────────────────────────────────────────────────────

export const GLOSSARY: Record<string, string> = {
  "Accidia": "The original Latin/Greek theological term for what the enneagram calls 'sloth' in type 9. In the Desert Father tradition, accidia referred to a spiritual torpor or indifference — a failure of the soul to care about what is genuinely important. Naranjo and Ichazo both insisted that accidia captures the type 9's passion more accurately than the modern word 'sloth.'",
  "Centers of Intelligence": "The three primary domains of human functioning in enneagram theory: the Gut/Body/Instinctual Center (types 8, 9, 1), the Heart/Feeling/Emotional Center (types 2, 3, 4), and the Head/Thinking/Mental Center (types 5, 6, 7). Each center has a dominant emotion — anger (gut), shame (heart), and fear (head) — that characterizes its distorted operation.",
  "Character Armor": "Term from Wilhelm Reich's character analysis, referring to the chronic muscular tensions and psychological rigidity that the ego develops to manage anxiety and suppress unacceptable impulses. Reich argued that character structure and physical posture are inseparable. Naranjo used this concept in several ennea-type descriptions, particularly for types 1, 5, and 8.",
  "Countertype": "For each of the nine types, one of the three instinctual subtype expressions goes against the expected flow of the passion — producing a character that looks least like the typical type description and is therefore the most likely to be mistyped. The countertypes are: SX1 (Zeal), SP2, SP3, SP4, SX5 (Confidence), SX6 (counterphobic), SO7 (Sacrifice), SO8 (Solidarity), SO9 (Participation).",
  "Defense Mechanism": "A concept from psychoanalytic theory referring to the psychological operations by which the ego protects itself from anxiety. Naranjo identified a characteristic primary defense mechanism for each ennea-type: reaction formation (1), repression (2), identification with role (3), introjection (4), isolation of affect (5), projection (6), rationalization (7), denial (8), narcotization (9).",
  "Ego Fixation": "The central concept of Ichazo's Protoanalysis. A fixation is a specific cognitive distortion — a mental preoccupation or habitual pattern of thought — that arises as the core of the ego's self-image. The nine fixations: resentment (1), flattery (2), vanity (3), melancholy (4), retention (5), cowardice (6), planning/charlatanism (7), vengeance (8), indolence (9).",
  "Holy Idea": "Ichazo's term for the objective view of reality — the undistorted cognitive perception — that corresponds to each type position. Holy Ideas are not ideals or aspirations but descriptions of how reality actually is when perceived without the filtering of the ego fixation. The loss of contact with the Holy Idea is understood as the cognitive event from which the fixation arises.",
  "Instinctual Stack": "The ordered ranking of the three instincts (SP, SO, SX) from most dominant to most repressed for a given individual. The stacking order modifies the expression of the core enneagram type. There are six possible stacking orders: SP/SO, SP/SX, SO/SP, SO/SX, SX/SP, SX/SO.",
  "Integration / Disintegration": "Terms used by Riso and Hudson for the psychological movement that occurs along the enneagram's internal lines. Disintegration (stress movement): type exhibits less healthy qualities of one connected type under stress. Integration (growth movement): type accesses healthier qualities of the other connected type in security or development.",
  "Narcotization": "The defense mechanism Naranjo identified for type 9: the numbing of inner experience through absorption in comfortable, low-stakes, familiar activity. Eating, habitual television, routine tasks, and similar activities provide a texture of engagement that narcotizes the awareness of one's own absence from one's life.",
  "Passion": "In Ichazo's Protoanalysis, the passions are the emotional survival systems of the ego — the dominant emotional energy that sustains and is sustained by the fixation. Each of the nine types has a characteristic passion corresponding to one of the classical seven deadly sins (anger, pride, envy, avarice, gluttony, lust, sloth), plus fear and deceit — Ichazo's additions. The passions are pre-conscious and habitual.",
  "Protoanalysis": "'First Analysis' — Ichazo's complete theory and method for the analysis of the human psyche, of which the enneagram of ego fixations is one component. Protoanalysis includes trialectic logic, the three instincts, the ego fixations, holy ideas, passions, virtues, traps, and a complete framework for understanding human consciousness.",
  "Reaction Formation": "The psychoanalytic defense mechanism in which an unacceptable impulse is converted into its opposite in conscious experience and behavior. Most characteristically associated with type 1: anger is converted into righteous principled behavior; desire is converted into self-discipline and inhibition.",
  "Trap": "In Ichazo's framework, the trap is the strategy each type employs in attempting to transcend the fixation — which, paradoxically, keeps the fixation in place. The traps: perfection (1), freedom (2), efficiency (3), authenticity (4), observer (5), security (6), idealism (7), justice (8), seeker (9).",
  "Trialectic / Trialectic Logic": "Ichazo's philosophical logic system underlying Protoanalysis. Where classical Aristotelian logic operates on two values (true/false), trialectic logic operates on three simultaneous, mutually defining principles. This corresponds to the three-part structure of the enneagram's groupings.",
  "Tritype": "Katherine Fauvre's concept describing the combination of a person's dominant type in each of the three Centers of Intelligence. The tritype is a three-digit number representing the dominant gut type (8, 9, or 1), heart type (2, 3, or 4), and head type (5, 6, or 7). Each tritype combination has a consistent character theme.",
  "Virtue": "The positive emotional quality that becomes available when the passion subsides — the ego's genuine emotional nature when not distorted by the fixation and passion. The virtues: serenity (1), humility (2), authenticity/truthfulness (3), equanimity (4), non-attachment (5), courage (6), sobriety (7), innocence (8), action (9).",
  "Wing": "The two enneagram types adjacent to one's core type on the enneagram circle. Most theories hold that one wing is dominant and modifies the core type's expression. Riso and Hudson developed the most systematic wing theory, including specific character profiles for each of the 18 wing combinations. Empirical support for wing theory is limited — best understood as a useful interpretive framework.",
};

// ─── Helper functions ─────────────────────────────────────────────────────────

export type EnneagramTypeNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type InstinctType = "SP" | "SO" | "SX";

/** Get full type data */
export function getTypeData(type: EnneagramTypeNum) {
  return ENNEAGRAM_TYPES[type];
}

/** Get quick-reference row for a type */
export function getTypeQuickRef(type: EnneagramTypeNum) {
  return TYPE_QUICK_REF[type];
}

/** Get subtype description */
export function getSubtype(type: EnneagramTypeNum, instinct: InstinctType) {
  return ENNEAGRAM_TYPES[type].subtypes[instinct];
}

/** Get wing data — e.g. "5w4" */
export function getWing(type: EnneagramTypeNum, wing: EnneagramTypeNum) {
  const key = `${type}w${wing}` as keyof typeof WINGS;
  return WINGS[key] ?? null;
}

/** Get holy idea for a type */
export function getHolyIdea(type: EnneagramTypeNum) {
  return HOLY_IDEAS[type];
}

/** Get integration and disintegration directions */
export function getLines(type: EnneagramTypeNum) {
  return {
    integration: LINES_OF_CONNECTION.integration[type],
    disintegration: LINES_OF_CONNECTION.disintegration[type],
    connections: LINES_OF_CONNECTION.connections[type],
  };
}

/** Get tritype archetype name and description */
export function getTritype(tritype: string) {
  return TRITYPES[tritype] ?? null;
}

/** Get glossary definition */
export function glossary(term: string): string | null {
  return GLOSSARY[term] ?? null;
}
