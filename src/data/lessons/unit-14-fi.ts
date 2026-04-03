// ─────────────────────────────────────────────────────────────────────────────
// Unit 14, Introverted Feeling (Fi)
// Inner value compass, deep personal authenticity, ethical individualism
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson } from "@/types/lessons";

const UNIT_ID = "fi";

// ── Lesson 1: What IS Fi? ─────────────────────────────────────────────────

const lesson1: Lesson = {
  id: "u14-l1",
  unitId: UNIT_ID,
  order: 1,
  title: "The Inner Value Compass",
  subtitle: "What Introverted Feeling feels like from the inside",
  xpReward: 20,
  exercises: [
    {
      id: "u14-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "What Is Introverted Feeling?",
        body: "Fi is an internal compass that evaluates everything against deeply held personal values. It asks: 'How do I truly FEEL about this? Does this align with who I am?' Fi operates quietly beneath the surface, producing convictions that feel non-negotiable.",
        highlight: "personal values",
      },
    },
    {
      id: "u14-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Fi from the Inside",
        body: "People with strong Fi describe an inner 'gut sense' of rightness or wrongness that doesn't need external justification. It's not about logic or social norms, it's a felt sense of authenticity. When something violates their values, they feel it physically.",
        highlight: "felt sense of authenticity",
      },
    },
    {
      id: "u14-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core question that Fi asks?",
        options: [
          "What does the group need right now?",
          "How do I truly feel about this, does it align with who I am?",
          "What is the most logically consistent explanation?",
          "What do the measurable results show?",
        ],
        correctIndex: 1,
        explanation: "Fi is an internal evaluative process. It constantly checks experiences against a personal value system, asking whether something feels authentic and aligned with the individual's core identity.",
      },
    },
    {
      id: "u14-l1-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which best describes how Fi processes emotions?",
        options: [
          "It mirrors the emotions of those around it",
          "It suppresses emotions in favor of logic",
          "It experiences deep, private emotional responses that may not show on the surface",
          "It expresses emotions loudly to influence the group mood",
        ],
        correctIndex: 2,
        explanation: "Fi processes emotions internally. Strong Fi users often have an intense inner emotional world that others can't see. They may appear calm while experiencing profound feelings underneath.",
      },
    },
    {
      id: "u14-l1-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Fi is classified as a _____ function.",
        options: [
          "Perceiving, Extraverted",
          "Judging, Introverted",
          "Perceiving, Introverted",
          "Judging, Extraverted",
        ],
        correctIndex: 1,
        explanation: "Fi is a Judging function (it evaluates and decides) with an Introverted attitude (it references internal criteria rather than external standards).",
      },
    },
    {
      id: "u14-l1-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each Fi characteristic to its description.",
        pairs: [
          { left: "Value Compass", right: "Internal sense of right and wrong" },
          { left: "Authenticity", right: "Need to be true to oneself" },
          { left: "Depth of feeling", right: "Rich inner emotional world" },
          { left: "Individualism", right: "Personal ethics over social norms" },
          { left: "Conviction", right: "Beliefs that feel non-negotiable" },
        ],
      },
    },
    {
      id: "u14-l1-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Fi evaluates experiences against deeply held ___, producing convictions that feel non-negotiable.",
        options: ["personal values", "social expectations", "logical frameworks", "past experiences"],
        correctIndex: 0,
        explanation: "Fi is fundamentally about personal values, an internal system of what matters most to the individual, independent of what others think or what logic dictates.",
      },
    },
    {
      id: "u14-l1-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "A person with strong Fi may appear calm on the outside while experiencing ___ emotional responses inside.",
        options: ["intense", "absent", "borrowed", "logical"],
        correctIndex: 0,
        explanation: "Fi's introverted nature means emotions are processed privately. The inner world can be extremely rich and intense, even when little shows externally.",
      },
    },
    {
      id: "u14-l1-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Jordan's company announces a new policy that conflicts with something Jordan deeply believes in. Their coworkers seem fine with it. Jordan's manager says, 'Everyone else is on board, what's the issue?'",
        question: "How would someone with strong Fi most likely respond internally?",
        options: [
          "They'd immediately agree to avoid conflict with the group",
          "They'd feel a deep, visceral resistance regardless of what others think",
          "They'd create a spreadsheet of pros and cons to decide objectively",
          "They'd poll other coworkers to see if anyone else is uncomfortable",
        ],
        correctIndex: 1,
        explanation: "Fi doesn't care what the group consensus is. If something violates personal values, the Fi user feels it as an internal resistance that can't simply be argued away by social pressure.",
      },
    },
    {
      id: "u14-l1-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two friends are debating whether it's okay to lie to spare someone's feelings. One friend says it depends on the situation and what the group expects. The other says, 'I just can't, it goes against everything I stand for, no matter what.'",
        question: "Which friend is most clearly demonstrating Fi?",
        options: [
          "The first friend, who considers the situation contextually",
          "The second friend, who references an internal moral standard",
          "Neither, this is a thinking function debate",
          "Both equally, they're both using feeling",
        ],
        correctIndex: 1,
        explanation: "The second friend demonstrates Fi by referencing an internal, personal moral standard ('everything I stand for') rather than adapting to situational or social expectations.",
      },
    },
    {
      id: "u14-l1-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these statements into Fi expressions vs. NOT Fi expressions.",
        categories: ["Fi Expression", "Not Fi"],
        items: [
          { text: "I need to be true to myself, even if others disagree", categoryIndex: 0 },
          { text: "Let me check what the data says before deciding", categoryIndex: 1 },
          { text: "This just feels wrong to me on a deep level", categoryIndex: 0 },
          { text: "What does the group need me to do here?", categoryIndex: 1 },
          { text: "I can't compromise on this, it's who I am", categoryIndex: 0 },
          { text: "Let's organize this for maximum efficiency", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u14-l1-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which types have Fi as their DOMINANT (first) function?",
        options: [
          "INFP and ISFP",
          "ENFJ and ESFJ",
          "ESTJ and ENTJ",
          "INTP and ISTP",
        ],
        correctIndex: 0,
        explanation: "INFP (Fi-Ne-Si-Te) and ISFP (Fi-Se-Ni-Te) lead with Fi as their dominant function. It is their primary way of engaging with the world.",
      },
    },
  ],
};

// ── Lesson 2: Fi in Different Stack Positions ──────────────────────────────

const lesson2: Lesson = {
  id: "u14-l2",
  unitId: UNIT_ID,
  order: 2,
  title: "Fi in Your Stack",
  subtitle: "How Fi looks as dominant, auxiliary, tertiary, or inferior",
  xpReward: 25,
  exercises: [
    {
      id: "u14-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Stack Position Changes Everything",
        body: "Fi as a dominant function (INFP, ISFP) creates people whose entire worldview is filtered through personal values. Fi as an inferior function (ESTJ, ENTJ) manifests as value confusion, sudden emotional eruptions, or a secret fear of being inauthentic.",
        highlight: "Stack position changes everything",
      },
    },
    {
      id: "u14-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Beebe Model & Fi",
        body: "In Beebe's archetypal model, your dominant function is the Hero, the most developed and trusted. Your inferior function is the Anima/Animus, the least conscious, most vulnerable, and potentially most transformative when integrated.",
        highlight: "Hero vs. Anima/Animus",
      },
    },
    {
      id: "u14-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does DOMINANT Fi (INFP/ISFP) typically appear in everyday life?",
        options: [
          "Loudly advocating for group harmony",
          "Quietly filtering all decisions through personal values and authenticity",
          "Organizing external systems for maximum efficiency",
          "Rapidly generating new ideas and possibilities",
        ],
        correctIndex: 1,
        explanation: "Dominant Fi users live inside their value system. Every decision, relationship, and experience is filtered through the question: 'Does this feel authentic to who I am?'",
      },
    },
    {
      id: "u14-l2-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "When Fi is the AUXILIARY (second) function, as in ENFP and ESFP, how does it typically show up?",
        options: [
          "As the primary lens for all experiences",
          "As a supporting inner check on the dominant function's impulses",
          "As an unconscious, unpredictable force",
          "As something the person actively avoids",
        ],
        correctIndex: 1,
        explanation: "Auxiliary Fi serves as an inner value-check for the dominant perceiving function. ENFPs use Fi to evaluate which of Ne's many possibilities truly matter; ESFPs use Fi to give their Se experiences personal meaning.",
      },
    },
    {
      id: "u14-l2-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which types have Fi as their INFERIOR (fourth) function?",
        options: [
          "INFP and ISFP",
          "ENFP and ESFP",
          "ESTJ and ENTJ",
          "INTP and ISTP",
        ],
        correctIndex: 2,
        explanation: "ESTJ (Te-Si-Ne-Fi) and ENTJ (Te-Ni-Se-Fi) have Fi in the inferior position. It is their least conscious, most vulnerable function.",
      },
    },
    {
      id: "u14-l2-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each stack position to how Fi manifests.",
        pairs: [
          { left: "Dominant (INFP/ISFP)", right: "Core identity built on personal values" },
          { left: "Auxiliary (ENFP/ESFP)", right: "Inner value-check supporting perception" },
          { left: "Tertiary (ISTJ/INTJ)", right: "Growing sense of personal conviction" },
          { left: "Inferior (ESTJ/ENTJ)", right: "Value confusion, sudden emotional eruptions" },
        ],
      },
    },
    {
      id: "u14-l2-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "An ENTJ under extreme stress may experience their inferior Fi as sudden ___ after years of prioritizing efficiency and results.",
        options: ["emotional eruptions", "logical analysis", "sensory overload", "brainstorming sessions"],
        correctIndex: 0,
        explanation: "When inferior Fi erupts in Te-dominant types, it often manifests as intense, overwhelming emotional experiences that feel alien and uncontrollable, precisely because these feelings have been suppressed.",
      },
    },
    {
      id: "u14-l2-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "In Beebe's model, the inferior function is called the ___, the least conscious but potentially most transformative part of the psyche.",
        options: ["Anima/Animus", "Hero", "Trickster", "Senex"],
        correctIndex: 0,
        explanation: "Beebe associates the inferior function with the Anima/Animus archetype. It represents our most vulnerable psychological area, but also our greatest potential for growth when consciously integrated.",
      },
    },
    {
      id: "u14-l2-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Marcus, an ESTJ executive, has spent 20 years building his career through efficiency and results. After a health scare at 50, he suddenly breaks down crying and says, 'I don't even know what I actually CARE about anymore. I've been so busy achieving I forgot to ask what matters to me.'",
        question: "What is happening psychologically?",
        options: [
          "He is developing his dominant Te further",
          "His inferior Fi is demanding attention after years of neglect",
          "He is experiencing a Se grip",
          "His auxiliary Si is malfunctioning",
        ],
        correctIndex: 1,
        explanation: "This is a classic inferior Fi emergence. Te-dominant types who neglect their Fi for decades often face a midlife confrontation with their values. The question 'What do I actually care about?' is pure Fi breaking through.",
      },
    },
    {
      id: "u14-l2-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Consider two people who both refuse to attend a social event. Person A (INFP) says: 'It doesn't feel right, the host said something last week that crossed a line for me.' Person B (ENTJ) says: 'I don't know why, but I just can't go. Something about it makes me uncomfortable and I can't explain it.'",
        question: "What explains the difference in their self-awareness about their Fi?",
        options: [
          "Person B is just being difficult",
          "Person A has dominant Fi and can articulate values clearly; Person B has inferior Fi and the feeling is vague and hard to name",
          "Person A is using Fe, not Fi",
          "There is no real difference, both are Fi",
        ],
        correctIndex: 1,
        explanation: "Dominant Fi users have precise access to their value system and can explain why something feels wrong. Inferior Fi users experience the same discomfort but can't easily articulate it, the feeling is murky and confusing.",
      },
    },
    {
      id: "u14-l2-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these experiences into Dominant Fi vs. Inferior Fi.",
        categories: ["Dominant Fi", "Inferior Fi"],
        items: [
          { text: "Clear, articulate sense of personal values", categoryIndex: 0 },
          { text: "Sudden emotional flooding that feels alien", categoryIndex: 1 },
          { text: "Naturally filters all decisions through authenticity", categoryIndex: 0 },
          { text: "Confusion about what they actually care about", categoryIndex: 1 },
          { text: "Values feel like a core part of identity", categoryIndex: 0 },
          { text: "Harsh self-judgment: 'I'm a bad person'", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u14-l2-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "True or false: Fi works the same way regardless of its position in someone's cognitive stack.",
        options: [
          "True, Fi is Fi",
          "False, stack position dramatically changes how Fi manifests",
          "True, but only for introverts",
          "False, but only because of age differences",
        ],
        correctIndex: 1,
        explanation: "Stack position is crucial. Dominant Fi is a well-developed inner compass. Inferior Fi is a blind spot that can erupt unpredictably. Same function, completely different experience.",
      },
    },
  ],
};

// ── Lesson 3: Fi in Real Life ──────────────────────────────────────────────

const lesson3: Lesson = {
  id: "u14-l3",
  unitId: UNIT_ID,
  order: 3,
  title: "Fi in the Wild",
  subtitle: "Relationships, work, stress, and creativity through the Fi lens",
  xpReward: 25,
  exercises: [
    {
      id: "u14-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Fi in Relationships",
        body: "Fi users need relationships that honor their authentic self. They are deeply loyal to those they've 'let in' but may withdraw from people who repeatedly violate their values. They show love through understanding you as an individual, not through grand social gestures.",
        highlight: "authentic self",
      },
    },
    {
      id: "u14-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Fi Under Stress",
        body: "When stressed, Fi users may withdraw completely into their inner world, becoming uncommunicative. In extreme stress (the 'grip'), they can flip to their inferior function, for INFPs this means obsessive, harsh Te self-criticism about productivity and competence.",
        highlight: "grip",
      },
    },
    {
      id: "u14-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does Fi typically show love in close relationships?",
        options: [
          "Organizing social events and group activities",
          "Deep one-on-one conversations that honor the other person's individuality",
          "Creating efficient systems for shared tasks",
          "Constant verbal affirmation in public settings",
        ],
        correctIndex: 1,
        explanation: "Fi shows love through deep, personal understanding. Fi users want to know the real you, your values, dreams, and inner world, and they offer the same vulnerability in return.",
      },
    },
    {
      id: "u14-l3-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What happens to an INFP in a 'Te grip' (extreme stress)?",
        options: [
          "They become social butterflies",
          "They obsessively organize, criticize their own productivity, and feel incompetent",
          "They become extremely physically active",
          "They start seeing patterns and conspiracies everywhere",
        ],
        correctIndex: 1,
        explanation: "The INFP's inferior function is Te. In a grip, INFPs flip from their natural value-driven approach to harsh, critical self-judgment about efficiency, productivity, and measurable outcomes.",
      },
    },
    {
      id: "u14-l3-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "In the workplace, what does a healthy Fi user most need?",
        options: [
          "Constant social interaction and team bonding",
          "Work that aligns with their personal values and allows authenticity",
          "Strict hierarchical structure and clear rules",
          "Competition and measurable performance metrics",
        ],
        correctIndex: 1,
        explanation: "Fi users thrive when their work feels meaningful to them personally. They struggle in environments that force them to act against their values, even if the pay and status are excellent.",
      },
    },
    {
      id: "u14-l3-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each life domain to how Fi shows up in it.",
        pairs: [
          { left: "Relationships", right: "Deep loyalty to those who pass the values test" },
          { left: "Work", right: "Needs meaning and alignment with personal ethics" },
          { left: "Stress", right: "Withdrawal into inner world, becoming uncommunicative" },
          { left: "Creativity", right: "Authentic self-expression as a core drive" },
          { left: "Conflict", right: "Quiet resistance rather than loud confrontation" },
        ],
      },
    },
    {
      id: "u14-l3-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Fi users often experience a 'values ___', once someone crosses a deeply held line, it can be very difficult to repair the relationship.",
        options: ["door slam", "explosion", "negotiation", "compromise"],
        correctIndex: 0,
        explanation: "The Fi 'door slam' (especially associated with INFPs and ISFPs) happens when someone repeatedly violates the Fi user's core values. The relationship can feel permanently damaged, because the violation was against something fundamental.",
      },
    },
    {
      id: "u14-l3-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Fi-driven creativity tends to be deeply ___, drawing from the creator's own emotional experience rather than external trends.",
        options: ["personal", "commercial", "collaborative", "systematic"],
        correctIndex: 0,
        explanation: "Fi creativity is autobiographical at its core. Fi artists, writers, and musicians create work that expresses their inner world, think of singer-songwriters who pour their personal pain into their art.",
      },
    },
    {
      id: "u14-l3-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Priya works at a marketing firm. She's offered a huge promotion, but the role involves promoting a product she believes is harmful to consumers. Her colleagues say, 'It's just business, don't take it personally.'",
        question: "What will a strong Fi user most likely do?",
        options: [
          "Take the promotion and compartmentalize their feelings",
          "Decline the promotion or negotiate to change the product's positioning, because the values conflict is unbearable",
          "Conduct a cost-benefit analysis to decide objectively",
          "Ask the team to vote on whether the product is ethical",
        ],
        correctIndex: 1,
        explanation: "Strong Fi users genuinely cannot compartmentalize values conflicts. 'It's just business' doesn't compute, everything IS personal when your identity is built on your values. The inner dissonance would be intolerable.",
      },
    },
    {
      id: "u14-l3-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Alex, an ISFP photographer, has been shooting commercial stock photos for months to pay the bills. They notice themselves becoming increasingly irritable, unfocused, and exhausted, even though the work isn't physically demanding.",
        question: "What is most likely causing Alex's distress?",
        options: [
          "They need more social interaction",
          "Their Fi is starving, the work lacks personal meaning and authentic expression",
          "They need a more structured schedule",
          "They are experiencing sensory overload from too many images",
        ],
        correctIndex: 1,
        explanation: "When Fi-dominant types are forced into work that doesn't engage their values or allow authentic expression, they experience a kind of spiritual malnutrition. The energy drain comes from inauthenticity, not from the work itself.",
      },
    },
    {
      id: "u14-l3-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these workplace situations into 'Fi-friendly' vs. 'Fi-hostile.'",
        categories: ["Fi-Friendly", "Fi-Hostile"],
        items: [
          { text: "Freedom to do work that aligns with personal values", categoryIndex: 0 },
          { text: "Forced to promote something you don't believe in", categoryIndex: 1 },
          { text: "Room for individual creative expression", categoryIndex: 0 },
          { text: "Mandatory enthusiasm and team spirit performances", categoryIndex: 1 },
          { text: "Your unique perspective is valued", categoryIndex: 0 },
          { text: "Told 'leave your feelings at the door'", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u14-l3-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which of these is a common strength of Fi in everyday life?",
        options: [
          "Organizing large group events",
          "Staying true to convictions even under social pressure",
          "Making quick, pragmatic decisions based on data",
          "Reading the emotional temperature of a room instantly",
        ],
        correctIndex: 1,
        explanation: "Fi's greatest strength is moral courage, the ability to stay true to personal convictions regardless of external pressure. This is what makes Fi users the conscience of their communities.",
      },
    },
  ],
};

// ── Lesson 4: Spotting Fi & Common Confusions ──────────────────────────────

const lesson4: Lesson = {
  id: "u14-l4",
  unitId: UNIT_ID,
  order: 4,
  title: "Fi vs. the Imposters",
  subtitle: "Spotting Fi in others and distinguishing it from similar functions",
  xpReward: 30,
  exercises: [
    {
      id: "u14-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Critical Distinction: Fi vs. Fe",
        body: "Fi and Fe are BOTH feeling functions, but they face opposite directions. Fi asks 'What do I value?', it's an inner compass. Fe asks 'What does the group need?', it's a social thermostat. Fi can seem selfish to Fe users; Fe can seem fake to Fi users.",
        highlight: "opposite directions",
      },
    },
    {
      id: "u14-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Other Common Confusions",
        body: "Fi can be confused with Ni (both are 'internal knowing'), but Fi knows what it VALUES while Ni knows what WILL HAPPEN. Fi is also confused with emotions in general, but everyone has emotions. Fi is specifically a judging function that structures identity around values.",
        highlight: "judging function",
      },
    },
    {
      id: "u14-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the KEY difference between Fi and Fe?",
        options: [
          "Fi is for introverts, Fe is for extroverts",
          "Fi references internal values, Fe references group emotional dynamics",
          "Fi is deeper, Fe is shallower",
          "Fi is about thinking, Fe is about feeling",
        ],
        correctIndex: 1,
        explanation: "The i/e distinction is about DIRECTION, not depth. Fi evaluates against internal, personal values. Fe evaluates against external, social-emotional dynamics. Both can be equally deep and meaningful.",
      },
    },
    {
      id: "u14-l4-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Someone says: 'I adjusted my honest opinion because I could see it was hurting the group dynamic.' Which function is this?",
        options: [
          "Fi, they're being emotionally aware",
          "Fe, they're adjusting to serve group harmony",
          "Ti, they're thinking about social logic",
          "Ni, they're predicting consequences",
        ],
        correctIndex: 1,
        explanation: "Adjusting your own expression to maintain group harmony is textbook Fe. An Fi user would more likely think: 'I have to say what I really believe, even if it's uncomfortable.'",
      },
    },
    {
      id: "u14-l4-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Why might an Fe user perceive an Fi user as 'selfish'?",
        options: [
          "Because Fi users are genuinely selfish",
          "Because Fi prioritizes personal values over group consensus, which looks selfish through an Fe lens",
          "Because Fi users don't have empathy",
          "Because Fi users are always focused on money",
        ],
        correctIndex: 1,
        explanation: "Fi's insistence on personal authenticity can look like selfishness to Fe users who prioritize group harmony. It's not selfish, it's a different orientation. Fi users have deep empathy, but they won't sacrifice their core values for social comfort.",
      },
    },
    {
      id: "u14-l4-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each response to whether it reflects Fi or Fe.",
        pairs: [
          { left: "Fi", right: "'I can't support this, it goes against who I am'" },
          { left: "Fe", right: "'Let's find something everyone can agree on'" },
          { left: "Fi", right: "'I don't care if everyone else is okay with it'" },
          { left: "Fe", right: "'Can you sense the tension in this room?'" },
        ],
      },
    },
    {
      id: "u14-l4-e7",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort these behaviors into Fi vs. Fe.",
        categories: ["Fi", "Fe"],
        items: [
          { text: "Stays quiet but internally refuses to compromise", categoryIndex: 0 },
          { text: "Adjusts their tone to match the group's mood", categoryIndex: 1 },
          { text: "Wears what feels authentic regardless of trends", categoryIndex: 0 },
          { text: "Makes sure everyone at the table feels included", categoryIndex: 1 },
          { text: "Walks away from a lucrative job over a values conflict", categoryIndex: 0 },
          { text: "Smooths over an awkward silence with a joke", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u14-l4-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Fi can be confused with Ni because both involve internal 'knowing,' but Fi knows what it ___ while Ni knows what will ___.",
        options: ["values / happen", "thinks / feel", "sees / remember", "wants / forget"],
        correctIndex: 0,
        explanation: "Fi produces value-based certainty ('I know this is wrong'). Ni produces pattern-based certainty ('I know this is where things are heading'). Similar feeling of conviction, completely different content.",
      },
    },
    {
      id: "u14-l4-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "At a dinner party, the host makes a casually racist joke. Person A immediately says to the group, 'Hey, that's not cool, we don't talk like that here.' Person B says nothing at dinner but later privately tells the host, 'That joke crossed a line for me and I want you to know that.'",
        question: "Which person is demonstrating Fi and which Fe?",
        options: [
          "Person A = Fi, Person B = Fe",
          "Person A = Fe, Person B = Fi",
          "Both are Fi",
          "Both are Fe",
        ],
        correctIndex: 1,
        explanation: "Person A addresses the group dynamic publicly ('we don't talk like that here'), classic Fe managing the social environment. Person B addresses it privately and personally ('crossed a line for me'), classic Fi honoring individual values.",
      },
    },
    {
      id: "u14-l4-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two artists explain their creative process. Artist 1: 'I create what I need to express from within, if others connect with it, great, but that's not why I make it.' Artist 2: 'I create to move people emotionally, I'm always thinking about how the audience will feel.'",
        question: "Which artist is using Fi and which is using Fe in their creative process?",
        options: [
          "Artist 1 = Fe, Artist 2 = Fi",
          "Artist 1 = Fi, Artist 2 = Fe",
          "Both are using Fi",
          "Both are using Fe",
        ],
        correctIndex: 1,
        explanation: "Artist 1's motivation is internal self-expression (Fi). Artist 2's motivation is external emotional impact on the audience (Fe). Both are valid creative approaches, but they originate from opposite directions.",
      },
    },
    {
      id: "u14-l4-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "You're observing someone who seems to have strong convictions and rarely changes their mind. They feel things deeply. You're trying to determine if they use Fi or are just stubborn.",
        question: "What's the best way to distinguish genuine Fi from simple stubbornness?",
        options: [
          "Fi users can articulate the values behind their stance; stubborn people just don't want to be wrong",
          "There is no difference, Fi IS stubbornness",
          "Fi users are always calm; stubborn people get angry",
          "Fi users only care about moral issues; stubborn people care about everything",
        ],
        correctIndex: 0,
        explanation: "The key differentiator is VALUES-based reasoning. Fi users hold positions because those positions connect to their core identity and ethics. Simple stubbornness is ego-driven resistance to change without a coherent value system underneath.",
      },
    },
    {
      id: "u14-l4-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Quick review: Fi is best described as...",
        options: [
          "A social thermostat that reads group emotions",
          "An internal compass that evaluates against personal values",
          "A logic engine that builds internal frameworks",
          "A possibility generator that sees connections everywhere",
        ],
        correctIndex: 1,
        explanation: "Fi is the inner value compass. It is a judging function that evaluates all of experience through the lens of deeply held personal values and authenticity.",
      },
    },
  ],
};

export const fiLessons: Lesson[] = [lesson1, lesson2, lesson3, lesson4];
