// ─────────────────────────────────────────────────────────────────────────────
// Unit 34. Instinctual Subtypes
// Based on Oscar Ichazo's original instinct theory, developed by Claudio
// Naranjo, and detailed in Beatrice Chestnut's "The Complete Enneagram" (2013).
// 5 lessons × 7 exercises each. xpReward: 20.
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson } from "@/types/lessons";

// ── Lesson 1: The Three Instincts ────────────────────────────────────────────

const lesson1: Lesson = {
  id: "u34-l1",
  unitId: "instinctual-subtypes",
  order: 1,
  title: "The Three Instincts",
  subtitle: "Primal drives that predate personality type",
  xpReward: 20,
  exercises: [
    {
      id: "u34-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Before the Type, There Is the Instinct",
        body: "Ichazo's original system identified three primal biological drives present in all humans: self-preservation (sp), sexual or one-to-one (sx), and social (so). These instincts predate Enneagram type — they are survival mechanisms that the type structure then overlays and distorts. According to Beatrice Chestnut in 'The Complete Enneagram' (2013), understanding your dominant instinct is as important as knowing your type.",
        highlight: "three primal instincts",
      },
    },
    {
      id: "u34-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "27 Variations",
        body: "Because each of the nine Enneagram types can be filtered through any of the three instincts, the result is 27 distinct character variations. A Type 4 with a dominant self-preservation instinct looks quite different from a Type 4 with a dominant sexual instinct. Claudio Naranjo, who did the foundational clinical work on subtypes, emphasized that these 27 variations require distinct descriptions — you cannot simply combine the type and instinct descriptions.",
        highlight: "27 distinct variations",
      },
    },
    {
      id: "u34-l1-e3",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Dominant, Secondary, and Least-Used",
        body: "Each person has all three instincts, but they are not equally developed. One instinct dominates — receiving the most attention and energy. A second instinct is auxiliary. The third, sometimes called the 'blind spot,' receives the least conscious focus. Chestnut notes that the least-used instinct often represents an area of genuine growth and challenge for the individual.",
        highlight: "dominant instinct",
      },
    },
    {
      id: "u34-l1-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How many distinct character variations does the combination of 9 Enneagram types and 3 instincts produce?",
        options: [
          "9",
          "18",
          "27",
          "81",
        ],
        correctIndex: 2,
        explanation:
          "9 types × 3 instincts = 27 distinct subtype variations. Beatrice Chestnut argues that each of these 27 subtypes has a unique character structure that cannot be derived simply by combining the type description with the instinct description.",
      },
    },
    {
      id: "u34-l1-e5",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "According to Ichazo's system, where do the three instincts originate?",
        options: [
          "They are learned behaviors shaped entirely by culture and upbringing",
          "They are primal biological survival drives that predate the Enneagram type structure",
          "They are identical to the three Hornevian groups mapped by Riso and Hudson",
          "They are derived from the three centers of intelligence (head, heart, body)",
        ],
        correctIndex: 1,
        explanation:
          "Ichazo's original framework treats the three instincts as primal biological drives — not cultural or psychological constructs. The Enneagram type structure overlays and distorts these drives. The instincts come first; the type's ego structure then shapes how they are expressed.",
      },
    },
    {
      id: "u34-l1-e6",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "What does a person's 'blind spot' instinct typically represent?",
        options: [
          "Their dominant instinct that receives the most energy",
          "An area of exceptional strength they have developed over time",
          "The least-used instinct — an area of genuine challenge and potential growth",
          "The instinct associated with their Enneagram wing",
        ],
        correctIndex: 2,
        explanation:
          "Beatrice Chestnut describes the least-used instinct as the 'blind spot' — the area that receives least conscious focus and often represents genuine challenges. Growth frequently involves developing a more conscious relationship with this neglected instinct.",
      },
    },
    {
      id: "u34-l1-e7",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two people are both typed as Enneagram Type 2. One is constantly focused on whether there is enough food in the house, whether her health insurance is adequate, and whether she has saved enough for emergencies. The other barely thinks about such things — she is consumed instead by the intensity of her romantic relationships and the question of whether she is truly known and desired by the people closest to her.",
        question: "What does this contrast between two Type 2s best illustrate?",
        options: [
          "One of them is mistyped — they cannot both be Type 2",
          "The difference between healthy and unhealthy levels within the same type",
          "The impact of dominant instinct — the same type looks markedly different depending on whether self-preservation or sexual instinct dominates",
          "The difference between Type 2 wings — one has a Type 1 wing, the other a Type 3 wing",
        ],
        correctIndex: 2,
        explanation:
          "This is a clear illustration of how dominant instinct shapes the expression of the same Enneagram type. Both are Type 2s, but their dominant instinct (sp vs. sx) creates very different character profiles — exactly what Chestnut's 'The Complete Enneagram' documents through distinct subtype descriptions.",
      },
    },
  ],
};

// ── Lesson 2: Self-Preservation Subtype ──────────────────────────────────────

const lesson2: Lesson = {
  id: "u34-l2",
  unitId: "instinctual-subtypes",
  order: 2,
  title: "Self-Preservation Subtype",
  subtitle: "Security, resources, and physical wellbeing",
  xpReward: 20,
  exercises: [
    {
      id: "u34-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The SP Drive",
        body: "The self-preservation instinct (sp) is the most fundamental survival drive: maintaining physical safety, securing resources, managing health, and ensuring material comfort. According to Chestnut, sp-dominant individuals have a pervasive concern with 'having enough' — enough money, food, warmth, time, energy. This is not necessarily anxiety; it is simply what their attention naturally gravitates toward.",
        highlight: "self-preservation instinct",
      },
    },
    {
      id: "u34-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "SP Character Patterns",
        body: "Chestnut notes that sp-dominant types tend to be more practical, grounded, and often quieter than their sx or so counterparts. They prioritize concrete needs over symbolic or relational ones. They are often the most self-contained of the three subtypes within any given type. The classic sp focus: Is my environment safe? Are my needs met? Do I have what I need to survive and thrive materially?",
        highlight: "practical, grounded, self-contained",
      },
    },
    {
      id: "u34-l2-e3",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "SP as the Least Socially Oriented",
        body: "Of the three instincts, self-preservation is typically described as the most withdrawn from the social world. SP types often prefer routines, familiar environments, and manageable demands on their energy. This doesn't mean they are antisocial — it means their primary attention is on maintaining the physical and material conditions that make life feel secure and sustainable.",
        highlight: "most withdrawn from social world",
      },
    },
    {
      id: "u34-l2-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core focus of the self-preservation instinct?",
        options: [
          "Belonging, hierarchy, and role within a group",
          "Intensity, chemistry, and depth in one-to-one relationships",
          "Physical safety, material security, health, and having enough resources",
          "Achieving social status and influencing the group",
        ],
        correctIndex: 2,
        explanation:
          "The self-preservation instinct centers on maintaining physical safety and material security — having enough food, money, health, time, and energy. This is the most physically and practically oriented of the three instincts.",
      },
    },
    {
      id: "u34-l2-e5",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "Compared to sx and so subtypes of the same Enneagram type, sp subtypes tend to be:",
        options: [
          "More emotionally expressive and dramatic",
          "More focused on group dynamics and their social role",
          "More practical, quieter, and self-contained — focused on concrete physical needs",
          "More intense and focused on the depth of individual relationships",
        ],
        correctIndex: 2,
        explanation:
          "Chestnut's descriptions consistently show sp subtypes as more grounded, practical, and quieter than their sx or so counterparts within the same type. Their attention naturally goes to material conditions rather than relational dynamics or group positioning.",
      },
    },
    {
      id: "u34-l2-e6",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "Which scenario best illustrates a dominant self-preservation instinct?",
        options: [
          "Tomas spends his weekends planning elaborate dinners for his extended family and loves coordinating the group's social calendar",
          "Layla finds herself most alive in the first weeks of a new romantic relationship, when everything feels electric and charged",
          "Wei tracks her monthly budget carefully, keeps a well-stocked pantry, has a solid emergency fund, and feels anxious when any of these feel disrupted",
          "Darius constantly thinks about his reputation in the community and whether people see him as a person of integrity",
        ],
        correctIndex: 2,
        explanation:
          "Wei's attention to budget, provisions, emergency savings, and anxiety when these feel threatened is a clear expression of the self-preservation instinct — the practical focus on 'having enough' that Chestnut identifies as central to sp-dominant individuals.",
      },
    },
    {
      id: "u34-l2-e7",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two colleagues are both Type 7. Mia (sp 7) constantly talks about finding the best deals on travel, making sure she has saved enough to afford adventures, and perfecting her home environment. She loves planning experiences and gets anxious if her finances feel uncertain. Ben (sx 7) barely thinks about money — he is consumed by the search for connection that feels electric and alive. He wants experiences that crackle with intensity and chemistry.",
        question: "What does this contrast illustrate about self-preservation vs. sexual subtypes within the same type?",
        options: [
          "Mia is a healthier Type 7 than Ben because she is more responsible",
          "Both individuals are probably mistyped — real Type 7s don't care about money",
          "The dominant instinct shapes how the type's core motivation gets expressed: sp 7 channels Type 7's desire for pleasure into material security and practical planning; sx 7 channels it into relational intensity",
          "Mia is a Type 1 with Type 7 wing, and Ben is a pure Type 7",
        ],
        correctIndex: 2,
        explanation:
          "This contrast shows how the same Enneagram type (7) expresses differently depending on the dominant instinct. SP 7 channels the Type 7 desire for pleasure and abundance into securing material comfort and practical enjoyment. SX 7 channels it into the intensity of connection. This is the core insight of subtype theory.",
      },
    },
  ],
};

// ── Lesson 3: Sexual (One-to-One) Subtype ─────────────────────────────────────

const lesson3: Lesson = {
  id: "u34-l3",
  unitId: "instinctual-subtypes",
  order: 3,
  title: "Sexual (One-to-One) Subtype",
  subtitle: "Intensity, connection, and the search for chemistry",
  xpReward: 20,
  exercises: [
    {
      id: "u34-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The SX Drive",
        body: "The sexual or one-to-one instinct (sx) is not simply about sexuality — it is the drive for intensity, connection, chemistry, and depth. Ichazo identified this as the instinct concerned with the attraction and merging of energies between individuals. SX-dominant people feel most alive when there is charge in the air — in relationships, creative work, or any encounter that crackles with energy.",
        highlight: "intensity, connection, chemistry",
      },
    },
    {
      id: "u34-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "SX Character Patterns",
        body: "Chestnut describes sx-dominant individuals as the most energetically intense of the three subtypes. They crave depth over breadth — a few profound connections over a wide social network. They are often drawn to the feeling of merging with another person, idea, or creative work. The sx drive can express itself in romantic relationships, but also in creative obsession, mentorship, or the pursuit of any experience that feels transcendent.",
        highlight: "depth over breadth",
      },
    },
    {
      id: "u34-l3-e3",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "SX and the Search for the Ideal",
        body: "Naranjo's clinical work noted that sx-dominant individuals often carry an idealized image of what connection should feel like — and they are constantly seeking (and sometimes disappointed by) reality's failure to match it. This creates an ongoing inner tension: the desire for profound union alongside the frustration that no actual relationship or experience quite measures up. This idealization varies by type but is a structural feature of the sx instinct.",
        highlight: "idealization and disappointment",
      },
    },
    {
      id: "u34-l3-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "The sexual (one-to-one) instinct is primarily about:",
        options: [
          "Physical safety and material resource acquisition",
          "Belonging, social hierarchy, and group contribution",
          "Intensity, chemistry, depth of connection, and the drive to merge with another",
          "Establishing routines and managing everyday comfort",
        ],
        correctIndex: 2,
        explanation:
          "The sx instinct is the drive for intensity and depth of connection — not narrowly about sexuality. Chestnut and Naranjo both describe it as the instinct oriented toward individual-to-individual charge, merging, and the search for profound connection.",
      },
    },
    {
      id: "u34-l3-e5",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "Which of the following best describes how sx subtypes differ from so subtypes within the same Enneagram type?",
        options: [
          "SX subtypes are more interested in broad group belonging; SO subtypes seek one profound connection",
          "SX subtypes focus on intensity and depth in individual connections; SO subtypes focus on their role and belonging within the group",
          "SX subtypes are always more extroverted; SO subtypes are always more introverted",
          "There is no meaningful difference between sx and so subtypes",
        ],
        correctIndex: 1,
        explanation:
          "The core contrast: sx subtypes orient toward the depth and intensity of individual relationships (one-to-one), while so subtypes orient toward group dynamics, belonging, and their social role. The same Enneagram type will express these foci very differently.",
      },
    },
    {
      id: "u34-l3-e6",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "A person who finds themselves most alive in the early stages of any new relationship or project — when everything feels charged and possible — but who repeatedly feels disappointed when the intensity fades is likely demonstrating:",
        options: [
          "The self-preservation instinct's focus on resource acquisition",
          "The social instinct's focus on group belonging",
          "The sexual instinct's characteristic cycle of idealization and disappointment in the search for intense connection",
          "A Reactive Harmonic Group response to ongoing stress",
        ],
        correctIndex: 2,
        explanation:
          "Naranjo's clinical work on the sx instinct identified this pattern: the sx drive generates an idealized image of what connection should feel like, and the natural fading of intensity over time creates recurring disappointment. This is structural to the sx instinct, not a character flaw.",
      },
    },
    {
      id: "u34-l3-e7",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Isabelle is a Type 5. Most descriptions of Type 5 emphasize detachment, analytical distance, and comfort with solitude. But Isabelle is nothing like this in relationships: she becomes intensely preoccupied with a small number of people, wants to understand them completely, feels devastated when a close bond is disrupted, and uses her analytical mind not to stay cool but to decode the emotional dynamics between herself and others she cares about.",
        question: "How does subtype theory help explain Isabelle's character?",
        options: [
          "Isabelle is probably not a Type 5 — this description doesn't fit the type at all",
          "Isabelle is demonstrating that Type 5s can be emotionally warm when healthy",
          "Isabelle is an sx-dominant Type 5. The sexual instinct channels the Type 5's characteristic depth and analytical intensity into the pursuit of profound connection rather than detached observation",
          "Isabelle is demonstrating the social subtype of Type 5, which is known for emotional intensity",
        ],
        correctIndex: 2,
        explanation:
          "Isabelle is an example of the sx 5 subtype. Her sx instinct channels the Type 5's natural depth, analysis, and focus into the one-to-one relational domain — producing a character who is intensely focused on connection rather than the cool detachment associated with the classic sp 5 description. Chestnut documents this as one of the more surprising subtype profiles.",
      },
    },
  ],
};

// ── Lesson 4: Social Subtype ──────────────────────────────────────────────────

const lesson4: Lesson = {
  id: "u34-l4",
  unitId: "instinctual-subtypes",
  order: 4,
  title: "Social Subtype",
  subtitle: "Belonging, hierarchy, and contribution to the group",
  xpReward: 20,
  exercises: [
    {
      id: "u34-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The SO Drive",
        body: "The social instinct (so) orients attention toward group belonging, social hierarchy, role within the community, and the question of contribution. SO-dominant individuals are acutely aware of the social field they are in — who is powerful, who is respected, what the group values, and where they fit. This instinct is concerned with the survival of the individual within the tribe.",
        highlight: "social instinct",
      },
    },
    {
      id: "u34-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "SO Character Patterns",
        body: "Chestnut describes so-dominant individuals as the most attuned to social context — the rules, norms, and dynamics of whatever group they are in. They think in terms of collective identity, shared purpose, and social contribution. Unlike sx types who want depth with one person, so types want meaningful participation in the group. They are often excellent at reading group dynamics and shaping collective experience.",
        highlight: "attuned to social context",
      },
    },
    {
      id: "u34-l4-e3",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "SO and Hierarchy",
        body: "Naranjo emphasized that the social instinct is not just about friendship — it involves a sophisticated awareness of social hierarchy and one's rank or role within it. SO-dominant types often think about status, influence, and whether they are respected or visible within their communities. This can be expressed as leadership, service, reputation management, or a pervasive concern with how one is seen by the group.",
        highlight: "social hierarchy and rank",
      },
    },
    {
      id: "u34-l4-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core focus of the social instinct?",
        options: [
          "Physical safety, health, and having sufficient resources",
          "Intensity, chemistry, and depth in one-to-one relationships",
          "Belonging, role in the group, hierarchy, and social contribution",
          "The pursuit of new experiences and the avoidance of boredom",
        ],
        correctIndex: 2,
        explanation:
          "The social instinct centers on the individual's relationship to the group — belonging, hierarchy, role, reputation, and contribution. Chestnut and Naranjo both describe it as the most socially and politically aware of the three instincts.",
      },
    },
    {
      id: "u34-l4-e5",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "Which of the following most clearly illustrates a dominant social instinct?",
        options: [
          "Keiko feels most anxious when her pantry is low and she hasn't had time to prepare healthy meals for the week",
          "Rafael feels electric and alive in the first stages of any intense new friendship or romance",
          "Amara constantly thinks about whether she is contributing enough to her community, how she is perceived by colleagues, and whether her social circle reflects her values",
          "Jonas prefers to stay home and recharge rather than attend social events",
        ],
        correctIndex: 2,
        explanation:
          "Amara's constant awareness of her contribution, reputation, and social positioning is a clear expression of the dominant social instinct — the ongoing attunement to where one stands within the group.",
      },
    },
    {
      id: "u34-l4-e6",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "How does the social subtype differ from a simple preference for socializing or extroversion?",
        options: [
          "Social subtypes are always extroverted; SP and SX subtypes are always introverted",
          "The social instinct is about group awareness and hierarchy, not just enjoying social activity — even an introvert can have a dominant social instinct",
          "Social subtypes prefer large groups; sx subtypes prefer one-on-one connections; sp subtypes avoid all social contact",
          "There is no meaningful difference — social instinct and social preference are the same thing",
        ],
        correctIndex: 1,
        explanation:
          "The social instinct is about attunement to group dynamics, belonging, and hierarchy — not simply enjoying socializing. An introverted person can have a dominant social instinct if their primary attention goes to their role, reputation, and contribution within their community. Extroversion and the social instinct are correlated but distinct.",
      },
    },
    {
      id: "u34-l4-e7",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Three people are all typed as Enneagram Type 9. Petra (sp 9) seems content to stay home, tend to her routines, and exist in simple comfort — she rarely thinks about her place in any group. Lena (sx 9) is quietly obsessed with the dynamics of her closest friendships, merging deeply with others and rarely aware of the broader social picture. Tomoko (so 9) is deeply invested in her community — she volunteers, runs the neighborhood association, and feels genuinely pained when the group is in conflict.",
        question: "What does this comparison among three Type 9s demonstrate?",
        options: [
          "Only Tomoko is a true Type 9 — the others are mistyped",
          "Healthy Type 9s become more social over time; Petra and Lena are at lower developmental levels",
          "The dominant instinct fundamentally shapes how the same Enneagram type is expressed — three Type 9s can look quite different based on whether sp, sx, or so dominates",
          "Wing differences explain the contrast: Petra has an 8 wing, Lena has a 1 wing, Tomoko has neither wing",
        ],
        correctIndex: 2,
        explanation:
          "This is a classic demonstration of subtype variation. All three are Type 9s with the same core motivation (harmony, avoiding conflict), but their dominant instinct shapes where that motivation gets expressed. SP 9 finds peace in routine and physical comfort. SX 9 finds peace through merging with close others. SO 9 finds peace through harmony within the group.",
      },
    },
  ],
};

// ── Lesson 5: The Countertype ─────────────────────────────────────────────────

const lesson5: Lesson = {
  id: "u34-l5",
  unitId: "instinctual-subtypes",
  order: 5,
  title: "The Countertype",
  subtitle: "The subtype that looks least like its own type",
  xpReward: 20,
  exercises: [
    {
      id: "u34-l5-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "What Is the Countertype?",
        body: "Within each Enneagram type, one of the three subtypes expresses the type's passion in a way that looks like the opposite of the classic description. Beatrice Chestnut calls this the countertype. Rather than directly expressing the type's characteristic pattern, the countertype reacts against it — sometimes appearing to belong to a completely different type. The countertype is often the most mistyped of all 27 subtypes.",
        highlight: "countertype",
      },
    },
    {
      id: "u34-l5-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Why Countertypes Emerge",
        body: "According to Chestnut, countertypes arise when the dominant instinct creates a pressure that works against the type's usual expression. For example, the social instinct in Type 7 — which is normally pleasure-seeking and future-oriented — generates a character that looks like a serious, self-denying Type 1. The so 7 countertype must be responsible for the group, which means constraining the pleasures that define Type 7. The passion is the same; the expression is inverted.",
        highlight: "passion is the same; expression is inverted",
      },
    },
    {
      id: "u34-l5-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What defines a countertype subtype?",
        options: [
          "A subtype that perfectly matches the classic textbook description of its type",
          "A subtype that expresses the type's passion in a way that looks like the opposite of the classic description — often appearing to be a different type entirely",
          "A subtype that has switched to using a different Enneagram type's strategy under stress",
          "The healthiest version of any given subtype",
        ],
        correctIndex: 1,
        explanation:
          "A countertype expresses the same underlying passion as its type but in an inverted form. Chestnut describes countertypes as the subtypes most likely to be mistyped because their surface behavior contradicts the classic description of their type.",
      },
    },
    {
      id: "u34-l5-e4",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "The SP 6 ('Warmth') is often called the countertype of Type 6. Which of the following best explains why it is the countertype?",
        options: [
          "SP 6 manages fear by appearing strong and aggressive, directly confronting threats — this is why it can resemble Type 8",
          "SP 6 looks least like the anxious Type 6 stereotype because it expresses fear through warmth, loyalty, and alliance-building rather than visible anxiety — the fear is still the driver, but it is channeled into trust-seeking rather than open worry",
          "SP 6s do not actually experience fear — they have overcome it through discipline",
          "The SP instinct eliminates fear and replaces it with self-confidence",
        ],
        correctIndex: 1,
        explanation:
          "Per Beatrice Chestnut's 'The Complete Enneagram,' the SP 6 ('Warmth') is the countertype because it looks least like the classic anxious Six. SP 6 manages fear by building warm, loyal alliances and seeking trustworthy relationships — it appears less visibly anxious than the other two Six subtypes. It is the SX 6 ('Strength/Beauty'), not the SP 6, that is counterphobic: the SX 6 goes toward the feared object, appearing tough, intimidating, and can resemble Type 8.",
      },
    },
    {
      id: "u34-l5-e5",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "Which of the following pairs correctly identifies a countertype and its frequently mistyped lookalike?",
        options: [
          "SX 2 (countertype) often mistyped as Type 7 because of its social energy",
          "SO 7 (countertype) often mistyped as Type 1 because of its seriousness and sense of duty",
          "SP 9 (countertype) often mistyped as Type 3 because of its ambition",
          "SX 5 (countertype) often mistyped as Type 9 because of its comfort with solitude",
        ],
        correctIndex: 1,
        explanation:
          "Chestnut identifies the SO 7 as the countertype of Type 7. Where Type 7 is typically pleasure-seeking, spontaneous, and future-oriented, SO 7 channels the social instinct into a serious concern for the group — appearing self-denying, dutiful, and responsible in ways that resemble Type 1.",
      },
    },
    {
      id: "u34-l5-e6",
      difficulty: 2,
      content: {
        type: "multiple-choice",
        question: "The SX 2 is the countertype of Type 2. Where sp 2 and so 2 openly express warmth and helpfulness, the SX 2 can appear more seductive, intense, and self-focused. What type is SX 2 most often confused with?",
        options: [
          "Type 8, because of its assertiveness and intensity",
          "Type 4, because of its focus on connection, longing, and emotional depth",
          "Type 9, because of its tendency to merge with others",
          "Type 3, because of its desire to be seen and admired",
        ],
        correctIndex: 1,
        explanation:
          "Chestnut identifies the SX 2 as the countertype of Type 2, often confused with Type 4. The SX instinct drives Type 2's need for love into an intense focus on the individual relationship — the SX 2 wants to be deeply known and desired by a specific person, which can produce the moody, longing quality associated with Type 4.",
      },
    },
    {
      id: "u34-l5-e7",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "All nine Enneagram types have one countertype subtype. Here are four examples from Chestnut's 'The Complete Enneagram': SP 1 countertype looks less perfectionistic than SO or SX 1 — more focused on personal anxiety and worry than overt criticism of others. SP 4 countertype is the most stoic and least outwardly dramatic of the Type 4 subtypes, sometimes mistyped as Type 1 or Type 5. SX 6 countertype ('Strength/Beauty') is counterphobic — it goes toward the feared object, appearing tough or intimidating, often mistyped as Type 8. SO 7 countertype appears serious and self-sacrificing rather than pleasure-seeking, often mistyped as Type 1.",
        question: "What do these four countertype examples share in common that explains why they are countertypes?",
        options: [
          "All four are in the self-preservation stacking, which automatically creates countertype behavior",
          "All four have learned to overcome their type's core passion through spiritual practice",
          "All four express their type's underlying passion in a form that inverts or contradicts the classic outward expression of their type — the same drive, differently channeled",
          "All four are mistyped — they actually belong to the types they resemble",
        ],
        correctIndex: 2,
        explanation:
          "What unites all countertypes is the same underlying logic: the core passion is present, but the dominant instinct channels it into an expression that inverts the typical outward presentation. SX 6 is still driven by fear — but it expresses as toughness and confrontation. SO 7 is still driven by gluttony — but it expresses as self-denial for the group. The fire is the same; the flame looks different.",
      },
    },
  ],
};

// ── Export ────────────────────────────────────────────────────────────────────

export const unit34Lessons: Lesson[] = [
  lesson1,
  lesson2,
  lesson3,
  lesson4,
  lesson5,
];
