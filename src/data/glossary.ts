// ─────────────────────────────────────────────────────────────────────────────
// Glossary Data
// Sources: Riso & Hudson "Wisdom of the Enneagram" (2000),
//          Carl Jung "Psychological Types" (1921),
//          Isabel Briggs Myers "Gifts Differing" (1980),
//          Claudio Naranjo "Character and Neurosis" (1994)
// ─────────────────────────────────────────────────────────────────────────────

export interface GlossaryEntry {
  term: string;
  shortDef: string;
  longDef: string;
  relatedTerms: string[];
  source: string;
  unitIds?: string[];
}

export const GLOSSARY: GlossaryEntry[] = [
  // ── Enneagram Type Names ──────────────────────────────────────────────────
  {
    term: "Type 1 — The Reformer",
    shortDef: "Core fear: being wrong or corrupt; core desire: to have integrity and be good.",
    longDef:
      "Type 1s are principled, purposeful, self-controlled, and perfectionistic. They have a strong inner critic and an ongoing sense that things could be improved. Their passion is resentment — a smoldering anger at imperfection — and their virtue is serenity, found when they accept the world as it is.",
    relatedTerms: ["Perfectionism", "Resentment", "Inner critic", "Integration", "Disintegration"],
    source: "Riso & Hudson, Wisdom of the Enneagram",
    unitIds: ["what-is-enneagram", "type-1"],
  },
  {
    term: "Type 2 — The Helper",
    shortDef: "Core fear: being unloved or unwanted; core desire: to feel loved.",
    longDef:
      "Type 2s are empathetic, sincere, warm-hearted, and self-sacrificing. They have a strong need to be needed and can struggle with acknowledging their own needs. Their passion is pride — an inflation of self-importance through giving — and their virtue is humility.",
    relatedTerms: ["Passion", "Humility", "Hornevian groups", "Instinctual subtype"],
    source: "Riso & Hudson, Wisdom of the Enneagram",
    unitIds: ["what-is-enneagram", "type-2"],
  },
  {
    term: "Type 3 — The Achiever",
    shortDef: "Core fear: being worthless or a failure; core desire: to feel valuable and admired.",
    longDef:
      "Type 3s are adaptable, excelling, driven, and image-conscious. They are often high performers who can lose touch with their authentic self in pursuit of success. Their passion is deceit — particularly self-deception about who they really are — and their virtue is authenticity.",
    relatedTerms: ["Persona", "Shadow", "Tritype", "Wing"],
    source: "Riso & Hudson, Wisdom of the Enneagram",
    unitIds: ["what-is-enneagram", "type-3"],
  },
  {
    term: "Type 4 — The Individualist",
    shortDef: "Core fear: being ordinary or without identity; core desire: to be uniquely themselves.",
    longDef:
      "Type 4s are self-aware, sensitive, reserved, and temperamental. They have an enduring sense that something fundamental is missing from their lives. Their passion is envy — a longing for what others have and they lack — and their virtue is equanimity.",
    relatedTerms: ["Envy", "Longing", "Mistype", "Integration"],
    source: "Riso & Hudson, Wisdom of the Enneagram",
    unitIds: ["what-is-enneagram", "type-4"],
  },
  {
    term: "Type 5 — The Investigator",
    shortDef: "Core fear: being helpless or incompetent; core desire: to be capable and knowledgeable.",
    longDef:
      "Type 5s are perceptive, innovative, secretive, and isolated. They manage their energy carefully and retreat to a world of inner competence. Their passion is avarice — hoarding of time, energy, and resources — and their virtue is nonattachment.",
    relatedTerms: ["Cognitive functions", "Ti", "Ni", "Hornevian groups"],
    source: "Riso & Hudson, Wisdom of the Enneagram",
    unitIds: ["what-is-enneagram", "type-5"],
  },
  {
    term: "Type 6 — The Loyalist",
    shortDef: "Core fear: being without support or guidance; core desire: security and trust.",
    longDef:
      "Type 6s are engaging, responsible, anxious, and suspicious. They are motivated by a search for reliable alliances and can oscillate between fearful avoidance and courageous confrontation of danger. Their passion is fear — or cowardice — and their virtue is courage.",
    relatedTerms: ["Counterphobic", "Phobic", "Harmonic groups", "Tritype"],
    source: "Riso & Hudson, Wisdom of the Enneagram",
    unitIds: ["what-is-enneagram", "type-6"],
  },
  {
    term: "Type 7 — The Enthusiast",
    shortDef: "Core fear: being deprived or in pain; core desire: happiness and satisfaction.",
    longDef:
      "Type 7s are spontaneous, versatile, acquisitive, and scattered. They use relentless optimism and pursuit of experience to avoid pain. Their passion is gluttony — an insatiable hunger for stimulation — and their virtue is sobriety.",
    relatedTerms: ["Gluttony", "Instinctual subtype", "Wing", "Harmonic groups"],
    source: "Riso & Hudson, Wisdom of the Enneagram",
    unitIds: ["what-is-enneagram", "type-7"],
  },
  {
    term: "Type 8 — The Challenger",
    shortDef: "Core fear: being controlled or harmed; core desire: to protect themselves and be self-reliant.",
    longDef:
      "Type 8s are self-confident, decisive, willful, and confrontational. They use intensity and dominance to create a safe perimeter. Their passion is lust — an excess of vitality and intensity — and their virtue is innocence.",
    relatedTerms: ["Lust", "Tritype", "Instinctual subtype", "Integration"],
    source: "Riso & Hudson, Wisdom of the Enneagram",
    unitIds: ["what-is-enneagram", "type-8"],
  },
  {
    term: "Type 9 — The Peacemaker",
    shortDef: "Core fear: loss and separation; core desire: inner stability and peace of mind.",
    longDef:
      "Type 9s are accepting, trusting, stable, and complacent. They tend to merge with others' agendas and can lose track of their own priorities. Their passion is sloth — a spiritual inertia or self-forgetting — and their virtue is right action.",
    relatedTerms: ["Sloth", "Merge", "Hornevian groups", "Mistype"],
    source: "Riso & Hudson, Wisdom of the Enneagram",
    unitIds: ["what-is-enneagram", "type-9"],
  },

  // ── Enneagram Structural Concepts ─────────────────────────────────────────
  {
    term: "Wing",
    shortDef: "The adjacent type on the Enneagram circle that flavors your core type.",
    longDef:
      "Every type has two neighboring types on the circle — wings. While your core type is primary, one wing typically influences your personality more than the other. For example, a Type 4 with a 3 wing (4w3) is more outward and image-conscious than a 4w5.",
    relatedTerms: ["Tritype", "Type 1 — The Reformer", "Integration", "Disintegration"],
    source: "Riso & Hudson, Wisdom of the Enneagram",
    unitIds: ["what-is-enneagram"],
  },
  {
    term: "Tritype",
    shortDef: "Your dominant type from each of the three centers (Gut, Heart, Head).",
    longDef:
      "The tritype framework holds that everyone uses one type from each of the three intelligence centers — gut (8/9/1), heart (2/3/4), and head (5/6/7). Together these three types form a distinct archetypal pattern. The order reflects dominance: the first number is your core type.",
    relatedTerms: ["Wing", "Instinctual subtype", "Hornevian groups"],
    source: "Katherine Fauvre, Enneagram Explorations",
    unitIds: ["what-is-enneagram"],
  },
  {
    term: "Instinctual subtype",
    shortDef: "One of three survival drives (Self-Preservation, Social, Sexual) that shapes expression of your type.",
    longDef:
      "The three instinctual subtypes — self-preservation (sp), social (so), and sexual/one-to-one (sx) — are evolutionary drives for survival. The dominant instinct interacts with your Enneagram type to create 27 distinct subtypes. The sx subtype is often confused with different types altogether.",
    relatedTerms: ["Tritype", "Wing", "Mistype"],
    source: "Claudio Naranjo, Character and Neurosis; Riso & Hudson",
    unitIds: ["instinctual-subtypes"],
  },
  {
    term: "Integration",
    shortDef: "The path of growth — movement toward the positive qualities of another type.",
    longDef:
      "Integration (sometimes called 'the direction of growth') describes which type's healthy qualities a given type moves toward when growing. For example, Type 1 integrates to 7, becoming more joyful and spontaneous. These lines follow fixed arrows on the Enneagram symbol.",
    relatedTerms: ["Disintegration", "Wing", "Hornevian groups"],
    source: "Riso & Hudson, Wisdom of the Enneagram",
    unitIds: ["what-is-enneagram"],
  },
  {
    term: "Disintegration",
    shortDef: "Movement toward the unhealthy patterns of another type under stress.",
    longDef:
      "Disintegration (the 'direction of stress') describes which type's unhealthy qualities a given type takes on when stressed or destabilized. For example, Type 1 disintegrates to 4, becoming moody and self-pitying. These arrows are opposite to integration lines.",
    relatedTerms: ["Integration", "Stress", "Wing"],
    source: "Riso & Hudson, Wisdom of the Enneagram",
    unitIds: ["what-is-enneagram"],
  },
  {
    term: "Passion",
    shortDef: "The ruling emotional drive or vice specific to each Enneagram type.",
    longDef:
      "Drawn from Ichazo's work, the Passions are the emotional 'stain' on consciousness that shapes each type's suffering: Anger (1), Pride (2), Vanity/Deceit (3), Envy (4), Avarice (5), Fear (6), Gluttony (7), Lust (8), Sloth (9). They are subtler and more pervasive than simple emotions.",
    relatedTerms: ["Fixation", "Virtue", "Holy ideas", "Type 1 — The Reformer"],
    source: "Oscar Ichazo; Claudio Naranjo, Character and Neurosis",
    unitIds: ["ichazo-fixations"],
  },
  {
    term: "Fixation",
    shortDef: "The chronic mental preoccupation or cognitive trap associated with each type.",
    longDef:
      "Fixations are the mental counterpart to the Passions. Where passions are emotional, fixations are cognitive — the recurring thought pattern that reinforces each type's limited worldview: Resentment (1), Flattery (2), Vanity (3), Melancholy (4), Stinginess (5), Cowardice (6), Planning (7), Vengeance (8), Indolence (9).",
    relatedTerms: ["Passion", "Virtue", "Holy ideas"],
    source: "Oscar Ichazo; Riso & Hudson",
    unitIds: ["ichazo-fixations"],
  },
  {
    term: "Virtue",
    shortDef: "The higher quality that emerges when a type transcends its passion.",
    longDef:
      "Virtues are the positive counterpart to Passions — the awakened state that becomes accessible when a type loosens its grip on its ruling emotional stance: Serenity (1), Humility (2), Authenticity (3), Equanimity (4), Nonattachment (5), Courage (6), Sobriety (7), Innocence (8), Right Action (9).",
    relatedTerms: ["Passion", "Fixation", "Holy ideas", "Integration"],
    source: "Oscar Ichazo; Riso & Hudson",
    unitIds: ["ichazo-fixations"],
  },
  {
    term: "Holy ideas",
    shortDef: "The higher worldview or spiritual truth associated with each type's essential nature.",
    longDef:
      "Holy Ideas represent the objective spiritual reality that each type has partially lost access to. When a type reconnects with its Holy Idea, the core fear dissolves. Examples: Holy Perfection (1), Holy Will/Freedom (7), Holy Love (2).",
    relatedTerms: ["Virtue", "Fixation", "Passion"],
    source: "Oscar Ichazo; A.H. Almaas, Facets of Unity",
    unitIds: ["holy-ideas"],
  },
  {
    term: "Hornevian groups",
    shortDef: "Three groupings of types based on Karen Horney's theory of coping styles: Compliant, Withdrawn, Assertive.",
    longDef:
      "Hornevian groups (named after psychoanalyst Karen Horney) describe how types cope with their core wounds: Compliant types (1, 2, 6) move toward others; Withdrawn types (4, 5, 9) move away from others; Assertive types (3, 7, 8) move against others. This shapes interpersonal style and stress responses.",
    relatedTerms: ["Harmonic groups", "Tritype", "Instinctual subtype"],
    source: "Riso & Hudson, Wisdom of the Enneagram; Karen Horney",
    unitIds: ["hornevian-groups"],
  },
  {
    term: "Harmonic groups",
    shortDef: "Three groupings based on how types respond to conflict and difficulty.",
    longDef:
      "The three Harmonic groups describe a type's characteristic response when things don't go their way: Positive Outlook types (2, 7, 9) emphasize the positive; Competency types (1, 3, 5) focus on being objective and competent; Reactive types (4, 6, 8) react intensely and look to others to respond.",
    relatedTerms: ["Hornevian groups", "Passion", "Fixation"],
    source: "Riso & Hudson, Wisdom of the Enneagram",
    unitIds: ["harmonic-groups"],
  },
  {
    term: "Mistype",
    shortDef: "Identifying as an Enneagram type that is not actually your core type.",
    longDef:
      "Mistyping is common because types share surface behaviors. The key to accurate typing is identifying core motivation (fear and desire), not behavior. For example, 9s who identify as 4s often mistake emotional numbness for melancholy. Reading mistype warnings helps clarify your true type.",
    relatedTerms: ["Self-identification", "Wing", "Tritype"],
    source: "Riso & Hudson, Wisdom of the Enneagram",
    unitIds: ["your-type", "am-i-typed-correctly"],
  },
  {
    term: "Self-identification",
    shortDef: "The process of recognizing your own Enneagram type through inner resonance.",
    longDef:
      "In the Enneagram tradition, the most valid way to identify your type is through inner recognition — a felt sense that a type description captures your core motivation, not just behavior. Assessment scores are a starting point; self-study and honest reflection are required for confirmation.",
    relatedTerms: ["Mistype", "Passion", "Core fear"],
    source: "Riso & Hudson, Wisdom of the Enneagram",
    unitIds: ["your-type"],
  },

  // ── Cognitive Functions ────────────────────────────────────────────────────
  {
    term: "Ne (Extraverted Intuition)",
    shortDef: "Explores external possibilities, connections, and patterns in an open, divergent way.",
    longDef:
      "Ne scans the environment for novelty, connections between ideas, and potential meanings. It is excited by possibilities and tends to generate many options before settling. Ne types (ENTP, ENFP as dominants) often shift rapidly between ideas and resist closure.",
    relatedTerms: ["Ni (Introverted Intuition)", "Se (Extraverted Sensing)", "MBTI", "Dominant function"],
    source: "Carl Jung, Psychological Types (1921); Isabel Briggs Myers, Gifts Differing",
    unitIds: ["what-are-cognitive-functions", "ne"],
  },
  {
    term: "Ni (Introverted Intuition)",
    shortDef: "Converges on deep insight and long-range vision through unconscious pattern synthesis.",
    longDef:
      "Ni processes information through the unconscious, synthesizing disparate data into sudden, holistic insights. Ni-dominant types (INTJ, INFJ) tend toward forecasting, symbolism, and a sense of inevitable direction. They often know things without knowing how they know them.",
    relatedTerms: ["Ne (Extraverted Intuition)", "Si (Introverted Sensing)", "Dominant function", "Shadow"],
    source: "Carl Jung, Psychological Types (1921); Isabel Briggs Myers, Gifts Differing",
    unitIds: ["what-are-cognitive-functions", "ni"],
  },
  {
    term: "Se (Extraverted Sensing)",
    shortDef: "Engages fully with the present sensory environment, seizing concrete opportunities.",
    longDef:
      "Se is oriented toward the immediate, tangible world. It notices sensory detail, aesthetics, and physical experience with high fidelity. Se-dominant types (ESTP, ESFP) are action-oriented, opportunistic, and thrive in the present moment.",
    relatedTerms: ["Si (Introverted Sensing)", "Ne (Extraverted Intuition)", "Dominant function"],
    source: "Carl Jung, Psychological Types (1921); Isabel Briggs Myers, Gifts Differing",
    unitIds: ["what-are-cognitive-functions", "se"],
  },
  {
    term: "Si (Introverted Sensing)",
    shortDef: "Stores and compares subjective sensory impressions, building rich inner libraries of past experience.",
    longDef:
      "Si does not simply recall facts — it stores subjective impressions of how things felt, looked, and meant. Si-dominant types (ISTJ, ISFJ) use this store to evaluate the present by comparison with past experience, valuing consistency and reliability.",
    relatedTerms: ["Se (Extraverted Sensing)", "Ni (Introverted Intuition)", "Dominant function", "Auxiliary function"],
    source: "Carl Jung, Psychological Types (1921); Isabel Briggs Myers, Gifts Differing",
    unitIds: ["what-are-cognitive-functions", "si"],
  },
  {
    term: "Te (Extraverted Thinking)",
    shortDef: "Organizes the external world through systems, plans, and objective criteria.",
    longDef:
      "Te externalizes logic — it applies structure to the environment to achieve measurable outcomes. Te-dominant types (ENTJ, ESTJ) are decisive, metrics-oriented, and comfortable managing systems and people. They prioritize efficiency and clear goals.",
    relatedTerms: ["Ti (Introverted Thinking)", "Fe (Extraverted Feeling)", "Dominant function"],
    source: "Carl Jung, Psychological Types (1921); Isabel Briggs Myers, Gifts Differing",
    unitIds: ["what-are-cognitive-functions", "te"],
  },
  {
    term: "Ti (Introverted Thinking)",
    shortDef: "Builds precise internal frameworks and definitions to understand how things truly work.",
    longDef:
      "Ti seeks internal consistency and precision. It tends to define, categorize, and refine its own logical system independently of external authority. Ti-dominant types (INTP, ISTP) are analytical, skeptical, and deeply concerned with accuracy over speed.",
    relatedTerms: ["Te (Extraverted Thinking)", "Fi (Introverted Feeling)", "Dominant function", "Inferior function"],
    source: "Carl Jung, Psychological Types (1921); Isabel Briggs Myers, Gifts Differing",
    unitIds: ["what-are-cognitive-functions", "ti"],
  },
  {
    term: "Fe (Extraverted Feeling)",
    shortDef: "Attunes to and manages the emotional atmosphere of groups and relationships.",
    longDef:
      "Fe is oriented toward collective emotional harmony. It reads social cues, adjusts to group values, and works to ensure everyone feels included and positive. Fe-dominant types (ENFJ, ESFJ) are warm, socially skilled, and motivated by relational connection.",
    relatedTerms: ["Fi (Introverted Feeling)", "Te (Extraverted Thinking)", "Dominant function"],
    source: "Carl Jung, Psychological Types (1921); Isabel Briggs Myers, Gifts Differing",
    unitIds: ["what-are-cognitive-functions", "fe"],
  },
  {
    term: "Fi (Introverted Feeling)",
    shortDef: "Navigates by a deep, individualized value system and personal sense of meaning.",
    longDef:
      "Fi is an inner compass of authenticity. It evaluates everything against deeply held personal values and seeks congruence between inner truth and outer action. Fi-dominant types (INFP, ISFP) have intense inner emotional lives, though they may appear reserved externally.",
    relatedTerms: ["Fe (Extraverted Feeling)", "Ti (Introverted Thinking)", "Dominant function", "Shadow"],
    source: "Carl Jung, Psychological Types (1921); Isabel Briggs Myers, Gifts Differing",
    unitIds: ["what-are-cognitive-functions", "fi"],
  },
  {
    term: "Dominant function",
    shortDef: "The primary cognitive function you use most naturally and fluently.",
    longDef:
      "The dominant function is the leading process in Jung's type model — the one that feels most natural and expressive. It is the lens through which a person primarily perceives and judges. Developing the dominant is the first task of psychological maturity.",
    relatedTerms: ["Auxiliary function", "Inferior function", "Shadow", "Individuation"],
    source: "Carl Jung, Psychological Types (1921); Isabel Briggs Myers, Gifts Differing",
    unitIds: ["what-are-cognitive-functions", "your-mind"],
  },
  {
    term: "Auxiliary function",
    shortDef: "The secondary cognitive function that supports and balances the dominant.",
    longDef:
      "The auxiliary function operates in the opposite attitude (introvert vs. extravert) to the dominant, providing balance. For example, an INTJ (dominant Ni) has auxiliary Te. The auxiliary develops more fully in adulthood and helps the person engage effectively with the outer world.",
    relatedTerms: ["Dominant function", "Inferior function", "Tertiary function"],
    source: "Carl Jung, Psychological Types (1921); Isabel Briggs Myers, Gifts Differing",
    unitIds: ["what-are-cognitive-functions", "your-mind"],
  },
  {
    term: "Inferior function",
    shortDef: "The least developed function — often the source of stress reactions and unconscious projections.",
    longDef:
      "The inferior function is the opposite of the dominant and remains the least consciously developed. It emerges in stress, fatigue, or moments of relaxation, often in childlike or exaggerated form. Integrating the inferior is central to Jungian individuation — the 'inferior function is the door to the unconscious.'",
    relatedTerms: ["Dominant function", "Auxiliary function", "Shadow", "Individuation"],
    source: "Carl Jung, Psychological Types (1921); Marie-Louise von Franz, The Inferior Function",
    unitIds: ["your-mind"],
  },

  // ── Jungian Concepts ──────────────────────────────────────────────────────
  {
    term: "Shadow",
    shortDef: "The unconscious parts of the psyche that the ego disowns and projects onto others.",
    longDef:
      "Jung's shadow consists of qualities, desires, and impulses that conflict with the persona and conscious self-image. The shadow is not only negative — it may contain repressed gifts. Integrating the shadow through honest self-inquiry is essential for psychological wholeness.",
    relatedTerms: ["Persona", "Projection", "Individuation", "Inferior function"],
    source: "Carl Jung, Aion (1951); John Sanford, The Shadow",
    unitIds: ["the-observer"],
  },
  {
    term: "Persona",
    shortDef: "The social mask we adopt to meet the world's expectations.",
    longDef:
      "The persona (Latin for mask) is the role or identity we present publicly. It is a necessary social adaptation but becomes problematic when confused with the total self. Over-identification with the persona leaves the shadow unexamined and blocks authentic self-expression.",
    relatedTerms: ["Shadow", "Individuation", "Projection", "Archetype"],
    source: "Carl Jung, Two Essays on Analytical Psychology (1953)",
    unitIds: ["the-observer"],
  },
  {
    term: "Anima",
    shortDef: "The unconscious feminine dimension within a man's psyche.",
    longDef:
      "The anima is the internal representation of the feminine principle in men. It typically appears in dreams as a female figure and is often projected onto women. Integration of the anima leads to greater emotional depth, creativity, and relational capacity in men.",
    relatedTerms: ["Animus", "Shadow", "Projection", "Archetype"],
    source: "Carl Jung, Aion (1951); Emma Jung, Animus and Anima",
    unitIds: ["the-observer"],
  },
  {
    term: "Animus",
    shortDef: "The unconscious masculine dimension within a woman's psyche.",
    longDef:
      "The animus is the internal representation of the masculine principle in women. It often manifests as opinions, arguments, and a drive toward intellectual assertion. When integrated, the animus provides women with clarity of mind and inner strength rather than appearing as possession.",
    relatedTerms: ["Anima", "Shadow", "Projection", "Archetype"],
    source: "Carl Jung, Aion (1951); Emma Jung, Animus and Anima",
    unitIds: ["the-observer"],
  },
  {
    term: "Individuation",
    shortDef: "The lifelong process of becoming one's whole, authentic self by integrating all parts of the psyche.",
    longDef:
      "Individuation is Jung's term for the central psychological journey — the gradual integration of unconscious contents (shadow, anima/animus, archetypes) into conscious awareness. It does not mean isolation; rather, becoming an individual means realizing one's unique potential while remaining connected to the collective.",
    relatedTerms: ["Shadow", "Persona", "Inferior function", "Archetype"],
    source: "Carl Jung, The Archetypes and the Collective Unconscious (1959)",
    unitIds: ["identity-in-motion", "living-as-yourself"],
  },
  {
    term: "Projection",
    shortDef: "Unconsciously attributing your own disowned qualities to other people or objects.",
    longDef:
      "Projection is a defense mechanism in which unacceptable inner contents (especially shadow material) are perceived as belonging to others rather than oneself. Strong emotional reactions to another person — positive or negative — often signal projection. Withdrawing projections is a key task of psychological maturity.",
    relatedTerms: ["Shadow", "Persona", "Anima", "Complex"],
    source: "Carl Jung, Psychological Types (1921); Marie-Louise von Franz",
    unitIds: ["the-observer"],
  },
  {
    term: "Archetype",
    shortDef: "A universal, inherited pattern of the collective unconscious — a primordial image.",
    longDef:
      "Archetypes are structural patterns that organize psychic energy across cultures and history. They are not inherited images but inherited predispositions to form images. Common archetypes include the Hero, the Great Mother, the Trickster, the Wise Old Man, and the Self.",
    relatedTerms: ["Collective unconscious", "Shadow", "Individuation", "Persona"],
    source: "Carl Jung, The Archetypes and the Collective Unconscious (1959)",
    unitIds: ["the-observer"],
  },
  {
    term: "Complex",
    shortDef: "An emotionally charged cluster of associations organized around an archetypal core.",
    longDef:
      "A complex is a fragment of the psyche split off from consciousness, usually through trauma or moral conflict. Complexes have a certain autonomy — they can 'take over' behavior temporarily. Examples include mother complex, father complex, and inferiority complex.",
    relatedTerms: ["Shadow", "Archetype", "Projection", "Individuation"],
    source: "Carl Jung, The Structure and Dynamics of the Psyche (1960)",
    unitIds: ["the-observer"],
  },

  // ── Personality Frameworks ────────────────────────────────────────────────
  {
    term: "MBTI",
    shortDef: "Myers-Briggs Type Indicator — a four-letter personality typology based on Jung's cognitive functions.",
    longDef:
      "The MBTI, developed by Isabel Briggs Myers and Katharine Cook Briggs, classifies personalities into 16 types using four dichotomies: E/I (extraversion/introversion), S/N (sensing/intuition), T/F (thinking/feeling), J/P (judging/perceiving). It is widely used but differs from academic models like the Big Five.",
    relatedTerms: ["Dominant function", "Cognitive functions", "Big Five", "Enneagram"],
    source: "Isabel Briggs Myers, Gifts Differing (1980)",
    unitIds: ["what-are-cognitive-functions", "your-mind"],
  },
  {
    term: "Enneagram",
    shortDef: "A map of nine fundamental personality types defined by core motivations, fears, and desires.",
    longDef:
      "The Enneagram is both a typology and a spiritual map. Its nine types describe distinct worldviews shaped by core motivations rather than behaviors. Modern Enneagram psychology draws from Sufism, Gurdjieff's Work, Oscar Ichazo's Arica school, and Claudio Naranjo's psychiatric synthesis.",
    relatedTerms: ["Passion", "Fixation", "Wing", "Instinctual subtype", "Tritype"],
    source: "Riso & Hudson, Wisdom of the Enneagram; Claudio Naranjo",
    unitIds: ["what-is-enneagram"],
  },
  {
    term: "Big Five",
    shortDef: "The OCEAN model — five broad dimensions of personality supported by empirical research.",
    longDef:
      "The Big Five (or OCEAN model) measures Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. It is the most well-validated personality model in academic psychology, based on factor analysis of personality descriptors across languages and cultures.",
    relatedTerms: ["MBTI", "Enneagram", "Self-identification"],
    source: "Costa & McCrae, NEO Personality Inventory; John & Srivastava",
    unitIds: ["your-mind"],
  },
  {
    term: "OCEAN",
    shortDef: "Acronym for the Big Five dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism.",
    longDef:
      "OCEAN describes five continuously distributed personality traits. High Openness correlates with intuition and creativity; high Conscientiousness with reliability; Extraversion with sociability; Agreeableness with cooperativeness; high Neuroticism with emotional instability.",
    relatedTerms: ["Big Five", "MBTI", "Enneagram"],
    source: "Costa & McCrae, NEO Personality Inventory",
    unitIds: ["your-mind"],
  },

  // ── Attachment Styles ─────────────────────────────────────────────────────
  {
    term: "Secure attachment",
    shortDef: "A relational style characterized by comfort with intimacy and independence.",
    longDef:
      "Securely attached individuals feel comfortable being close to others while also being comfortable alone. They trust that relationships can survive conflict and don't require constant reassurance. Secure attachment forms the foundation for healthy relationships and emotional regulation.",
    relatedTerms: ["Anxious attachment", "Avoidant attachment", "Disorganized attachment"],
    source: "John Bowlby, Attachment and Loss; Mary Ainsworth",
    unitIds: ["your-core-question"],
  },
  {
    term: "Anxious attachment",
    shortDef: "A relational style marked by fear of abandonment and high need for reassurance.",
    longDef:
      "Anxiously attached individuals crave closeness but fear it will be taken away. They may be hyper-vigilant to relational signals and prone to seeking reassurance. This style often originates in caregiving that was inconsistent or unpredictable.",
    relatedTerms: ["Secure attachment", "Avoidant attachment", "Type 6 — The Loyalist", "Type 2 — The Helper"],
    source: "John Bowlby, Attachment and Loss; Hazan & Shaver",
    unitIds: ["your-core-question"],
  },
  {
    term: "Avoidant attachment",
    shortDef: "A relational style that values independence and minimizes the importance of closeness.",
    longDef:
      "Avoidantly attached individuals have learned to suppress attachment needs and maintain distance. They may feel uncomfortable with emotional closeness and prefer self-reliance. This style often develops when early caregivers were emotionally unavailable or rejecting.",
    relatedTerms: ["Secure attachment", "Anxious attachment", "Type 5 — The Investigator"],
    source: "John Bowlby, Attachment and Loss; Hazan & Shaver",
    unitIds: ["your-core-question"],
  },
  {
    term: "Disorganized attachment",
    shortDef: "A relational style with no consistent strategy — both desiring and fearing connection.",
    longDef:
      "Disorganized attachment arises when the caregiver is simultaneously a source of fear and comfort. The person has no coherent strategy for managing closeness, showing conflicting behaviors. It is associated with trauma and is linked to higher risk of relational difficulties.",
    relatedTerms: ["Secure attachment", "Anxious attachment", "Avoidant attachment", "Shadow"],
    source: "Mary Main & Judith Solomon; John Bowlby",
    unitIds: ["your-core-question"],
  },

  // ── Additional Key Terms ──────────────────────────────────────────────────
  {
    term: "Counterphobic",
    shortDef: "A Type 6 subtype that moves toward what is feared rather than away from it.",
    longDef:
      "The counterphobic 6 reacts to fear by confronting it aggressively — appearing more like a Type 8. This can make counterphobic 6s difficult to identify. The underlying anxiety is the same; the strategy is the opposite of the classic phobic 6 response.",
    relatedTerms: ["Type 6 — The Loyalist", "Instinctual subtype", "Mistype"],
    source: "Riso & Hudson, Wisdom of the Enneagram",
    unitIds: ["type-6"],
  },
  {
    term: "Inner critic",
    shortDef: "The internalized voice of judgment and standards — most pronounced in Type 1.",
    longDef:
      "The inner critic is the internal monologue that evaluates actions against an ideal standard. While present in all types, it is the defining feature of Type 1. Learning to observe rather than be driven by the inner critic is central to Type 1 growth work.",
    relatedTerms: ["Type 1 — The Reformer", "Resentment", "Perfectionism", "Shadow"],
    source: "Riso & Hudson, Wisdom of the Enneagram",
    unitIds: ["type-1"],
  },
];

// ── Utility: Alphabetical grouping ───────────────────────────────────────────

export function groupGlossaryAlphabetically(): Record<string, GlossaryEntry[]> {
  const groups: Record<string, GlossaryEntry[]> = {};
  for (const entry of GLOSSARY) {
    const firstLetter = entry.term[0].toUpperCase();
    if (!groups[firstLetter]) groups[firstLetter] = [];
    groups[firstLetter].push(entry);
  }
  // Sort entries within each group
  for (const letter of Object.keys(groups)) {
    groups[letter].sort((a, b) => a.term.localeCompare(b.term));
  }
  return groups;
}

export function searchGlossary(query: string): GlossaryEntry[] {
  if (!query.trim()) return GLOSSARY;
  const q = query.toLowerCase();
  return GLOSSARY.filter(
    (e) =>
      e.term.toLowerCase().includes(q) ||
      e.shortDef.toLowerCase().includes(q) ||
      e.longDef.toLowerCase().includes(q) ||
      e.relatedTerms.some((t) => t.toLowerCase().includes(q))
  );
}
