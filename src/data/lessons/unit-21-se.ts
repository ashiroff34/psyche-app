// ─────────────────────────────────────────────────────────────────────────────
// Unit 21 — Extraverted Sensing (Se)
// Present-moment amplifier, full physical awareness, real-time reaction
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson } from "@/types/lessons";

const UNIT_ID = "se";

// ── Lesson 1: What IS Se? ─────────────────────────────────────────────────

const lesson1: Lesson = {
  id: "u21-l1",
  unitId: UNIT_ID,
  order: 1,
  title: "The Present-Moment Amplifier",
  subtitle: "What Extraverted Sensing feels like from the inside",
  xpReward: 20,
  exercises: [
    {
      id: "u21-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "What Is Extraverted Sensing?",
        body: "Se is full immersion in the present moment. It asks: 'What's happening RIGHT NOW?' Colors are brighter, sounds are sharper, reactions are instant. Se is the function of being completely, physically HERE — fully embodied and engaged with the real, concrete world.",
        highlight: "present moment",
      },
    },
    {
      id: "u21-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Se from the Inside",
        body: "People with strong Se describe a heightened aliveness — feeling the bass vibrate through their chest at a concert, noticing the exact moment a wave is about to break, reading a room's energy the instant they walk in. It's split-second physical intelligence that doesn't need to think before acting.",
        highlight: "heightened aliveness",
      },
    },
    {
      id: "u21-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core question that Se asks?",
        options: [
          "How does this compare to what I've experienced before?",
          "What abstract pattern is emerging here?",
          "What's happening RIGHT NOW in this moment?",
          "What does the group need from me emotionally?",
        ],
        correctIndex: 2,
        explanation: "Se is locked into the present moment. It doesn't compare to the past (Si) or project into the future (Ni) — it fully absorbs and responds to what is happening right here, right now.",
      },
    },
    {
      id: "u21-l1-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What makes Se different from just 'having good senses'?",
        options: [
          "Se users have biologically superior eyesight and hearing",
          "Se is an active engagement with the physical environment — seeking stimulation, responding in real time, and being fully embodied in the moment",
          "Se only works during athletic activities",
          "Se is the same as having good reflexes",
        ],
        correctIndex: 1,
        explanation: "Se isn't about having better senses — it's a way of ENGAGING with the world. Se users actively orient toward sensory experience, seek stimulation, and respond to the physical environment with their whole being.",
      },
    },
    {
      id: "u21-l1-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Se is classified as a _____ function.",
        options: [
          "Judging, Introverted",
          "Perceiving, Introverted",
          "Judging, Extraverted",
          "Perceiving, Extraverted",
        ],
        correctIndex: 3,
        explanation: "Se is a Perceiving function (it takes in information) with an Extraverted attitude (it engages directly with the external, physical environment rather than referencing internal impressions).",
      },
    },
    {
      id: "u21-l1-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each Se characteristic to its description.",
        pairs: [
          { left: "Present-Moment Focus", right: "Fully engaged with what's happening right now" },
          { left: "Physical Intelligence", right: "Split-second bodily reactions and spatial awareness" },
          { left: "Sensory Amplification", right: "Colors brighter, sounds sharper, textures vivid" },
          { left: "Action Orientation", right: "Responds immediately rather than deliberating" },
          { left: "Environmental Awareness", right: "Reads the energy of a room instantly" },
        ],
      },
    },
    {
      id: "u21-l1-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Se users experience the world with a kind of heightened ___ — as if the volume on all five senses has been turned up.",
        options: ["aliveness", "anxiety", "nostalgia", "abstraction"],
        correctIndex: 0,
        explanation: "Se creates an amplified experience of physical reality. Strong Se users often describe feeling intensely alive and present, as if sensory experience is richer and more vivid than it is for others.",
      },
    },
    {
      id: "u21-l1-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "A strong Se user doesn't need to ___ before reacting — their body knows what to do in the moment, whether catching a falling glass or swerving to avoid a pothole.",
        options: ["think", "remember", "plan", "ask"],
        correctIndex: 0,
        explanation: "Se's real-time processing bypasses conscious deliberation. The body responds before the mind catches up — which is why Se is the function of athletes, surgeons, firefighters, and anyone who needs split-second physical response.",
      },
    },
    {
      id: "u21-l1-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Kai is surfing. A wave rises behind them. Without consciously thinking, they read the wave's shape, shift their weight, adjust their stance, and ride it perfectly — reacting to each micro-change in the water in real time. Afterward, they can't fully explain HOW they did it.",
        question: "What cognitive function is Kai primarily using?",
        options: [
          "Si — they're comparing this wave to past waves",
          "Ti — they're logically analyzing wave physics",
          "Se — they're fully immersed in real-time physical response to the present moment",
          "Ni — they're predicting where the wave will go",
        ],
        correctIndex: 2,
        explanation: "Kai is in pure Se flow: fully engaged with the physical environment, responding in real time to constantly changing conditions, with the body acting faster than conscious thought. The inability to explain it afterward is classic — Se operates below verbal processing.",
      },
    },
    {
      id: "u21-l1-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two friends attend a live concert. Friend A says afterward: 'That was incredible — I could feel the bass in my ribcage, the lights were insane, and when the crowd surged forward I just moved with it. Pure energy.' Friend B says: 'It was good! Reminded me of that show we saw in 2019 — similar setlist, but I think the sound mixing was better back then.'",
        question: "Which friend is demonstrating Se?",
        options: [
          "Friend B — they have detailed recall of the experience",
          "Friend A — they were fully immersed in the present-moment physical experience",
          "Both are using Se equally",
          "Neither — concerts are just fun for everyone",
        ],
        correctIndex: 1,
        explanation: "Friend A demonstrates Se: fully absorbed in the present sensory experience — the physical sensations, the energy, the immediacy. Friend B demonstrates Si: automatically comparing the present concert to a stored past impression.",
      },
    },
    {
      id: "u21-l1-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these statements into Se expressions vs. NOT Se expressions.",
        categories: ["Se Expression", "Not Se"],
        items: [
          { text: "Feel that bass? This is INCREDIBLE right now", categoryIndex: 0 },
          { text: "This reminds me of something from years ago", categoryIndex: 1 },
          { text: "I just reacted — my body knew what to do", categoryIndex: 0 },
          { text: "I need to think about this more before acting", categoryIndex: 1 },
          { text: "Look at that sunset — the colors are unreal", categoryIndex: 0 },
          { text: "I wonder what this could potentially become", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u21-l1-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which types have Se as their DOMINANT (first) function?",
        options: [
          "INTJ and INFJ",
          "ISTJ and ISFJ",
          "ESTP and ESFP",
          "ENTP and ENFP",
        ],
        correctIndex: 2,
        explanation: "ESTP (Se-Ti-Fe-Ni) and ESFP (Se-Fi-Te-Ni) lead with Se as their dominant function. They are the most physically present, action-oriented, and sensorially engaged of all the types.",
      },
    },
  ],
};

// ── Lesson 2: Se in Different Stack Positions ──────────────────────────────

const lesson2: Lesson = {
  id: "u21-l2",
  unitId: UNIT_ID,
  order: 2,
  title: "Se in Your Stack",
  subtitle: "How Se looks as dominant, auxiliary, tertiary, or inferior",
  xpReward: 25,
  exercises: [
    {
      id: "u21-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Stack Position Changes Everything",
        body: "Se as a dominant function (ESTP, ESFP) creates people who are fully alive in their bodies, reacting to the world with effortless physical grace. Se as an inferior function (INTJ, INFJ) manifests as sensory overindulgence under stress — binge eating, impulsive shopping, or reckless physical behavior.",
        highlight: "Stack position changes everything",
      },
    },
    {
      id: "u21-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Beebe Model & Se",
        body: "In Beebe's archetypal model, dominant Se is the Hero — a powerful, trusted relationship with the physical world. Inferior Se is the Anima/Animus — the least conscious function. For Ni-dominant types (INTJ, INFJ), inferior Se is their greatest vulnerability: a clumsy, feast-or-famine relationship with physical reality.",
        highlight: "Hero vs. Anima/Animus",
      },
    },
    {
      id: "u21-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does DOMINANT Se (ESTP/ESFP) typically appear in everyday life?",
        options: [
          "Lost in abstract thought, detached from the physical world",
          "Effortlessly physical, action-oriented, and intensely present in every situation",
          "Carefully comparing present experiences to detailed past memories",
          "Quietly developing long-term strategic visions",
        ],
        correctIndex: 1,
        explanation: "Dominant Se users move through the world with remarkable physical ease. They're the first to act, the most aware of their surroundings, and the most engaged with the immediate sensory environment.",
      },
    },
    {
      id: "u21-l2-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "When Se is the AUXILIARY (second) function, as in ISTP and ISFP, how does it typically show up?",
        options: [
          "As the primary way they engage with the world",
          "As a supporting engagement tool that brings their inner judgments into physical reality",
          "As an unconscious, overwhelming force",
          "As something they fear and avoid",
        ],
        correctIndex: 1,
        explanation: "Auxiliary Se gives ISTPs and ISFPs a hands-on, physical way to express their inner Ti or Fi. ISTPs use Se to engage with mechanical and physical systems; ISFPs use Se to create tangible art and physical self-expression.",
      },
    },
    {
      id: "u21-l2-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which types have Se as their INFERIOR (fourth) function?",
        options: [
          "ESTP and ESFP",
          "ISTP and ISFP",
          "INTJ and INFJ",
          "ISTJ and ISFJ",
        ],
        correctIndex: 2,
        explanation: "INTJ (Ni-Te-Fi-Se) and INFJ (Ni-Fe-Ti-Se) have Se in the inferior position. These future-oriented visionaries often have an uncomfortable, feast-or-famine relationship with physical reality and present-moment experience.",
      },
    },
    {
      id: "u21-l2-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each stack position to how Se manifests.",
        pairs: [
          { left: "Dominant (ESTP/ESFP)", right: "Effortless physical presence and real-time response" },
          { left: "Auxiliary (ISTP/ISFP)", right: "Hands-on engagement supporting inner judgment" },
          { left: "Tertiary (ENTJ/ENFJ)", right: "Growing appreciation for physical experience" },
          { left: "Inferior (INTJ/INFJ)", right: "Sensory overindulgence or physical clumsiness under stress" },
        ],
      },
    },
    {
      id: "u21-l2-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "An INFJ under extreme stress may experience their inferior Se as sudden ___ — impulsive shopping sprees, binge eating, or reckless physical decisions.",
        options: ["sensory overindulgence", "abstract theorizing", "social withdrawal", "logical analysis"],
        correctIndex: 0,
        explanation: "When inferior Se erupts in Ni-dominant types, it flips from deprivation to excess. The normally cerebral, future-focused INFJ suddenly craves intense physical experience — but without the skill to moderate it.",
      },
    },
    {
      id: "u21-l2-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "INTJs and INFJs with inferior Se often describe feeling ___ in their own bodies — as if they're living more in their head than in physical reality.",
        options: ["disconnected", "powerful", "hyperaware", "grounded"],
        correctIndex: 0,
        explanation: "Inferior Se creates a disconnect from the body. Ni-dominant types often forget to eat, bump into furniture, or feel like they're observing physical reality from behind glass — until stress forces Se to erupt with full intensity.",
      },
    },
    {
      id: "u21-l2-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Yuki, an INTJ strategist, has been working 80-hour weeks on a business plan. One evening, she suddenly abandons her work, drives to an expensive mall, and spends $2,000 on clothes, shoes, and luxury candles she doesn't need. The next morning, she stares at the bags in confusion: 'What came over me? This isn't like me at all.'",
        question: "What is happening psychologically?",
        options: [
          "She is using healthy Se to enjoy life",
          "Her inferior Se erupted — deprived of physical experience for weeks, it exploded into impulsive sensory indulgence",
          "She is developing her dominant Ni further",
          "Her Te is driving her to acquire resources",
        ],
        correctIndex: 1,
        explanation: "This is classic inferior Se in an INTJ. After prolonged Se deprivation (all work, no physical pleasure), the inferior function erupts as uncontrolled sensory indulgence. The confusion afterward ('This isn't like me') confirms the behavior came from the unconscious.",
      },
    },
    {
      id: "u21-l2-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two people both enjoy cooking. Person A (ESFP) cooks by feel — tasting constantly, adjusting in real time, improvising based on what looks and smells right. They've never written down a recipe. Person B (INFJ) occasionally gets an intense urge to spend an entire weekend in the kitchen, cooking elaborate meals, then doesn't cook again for months.",
        question: "What explains the difference in their relationship to the physical act of cooking?",
        options: [
          "Person A is a better cook",
          "Person A has dominant Se and naturally lives in physical engagement; Person B has inferior Se and experiences it in intense, irregular bursts",
          "Person B doesn't actually enjoy cooking",
          "There is no meaningful difference — cooking is just a hobby",
        ],
        correctIndex: 1,
        explanation: "Dominant Se enables a smooth, continuous relationship with physical activity — it's just part of life. Inferior Se creates an all-or-nothing pattern: long periods of ignoring physical engagement followed by intense bursts of sensory immersion.",
      },
    },
    {
      id: "u21-l2-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these experiences into Dominant Se vs. Inferior Se.",
        categories: ["Dominant Se", "Inferior Se"],
        items: [
          { text: "Effortlessly physical, always aware of surroundings", categoryIndex: 0 },
          { text: "Binge eating after weeks of forgetting to eat properly", categoryIndex: 1 },
          { text: "Reacts instantly in emergencies without thinking", categoryIndex: 0 },
          { text: "Trips over things and bumps into furniture regularly", categoryIndex: 1 },
          { text: "Naturally seeks physical thrills and sensory experiences", categoryIndex: 0 },
          { text: "Impulsive shopping spree after months of sensory deprivation", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u21-l2-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "True or false: Se works the same way regardless of its position in someone's cognitive stack.",
        options: [
          "True — Se is Se",
          "False — stack position dramatically changes how Se manifests",
          "True — but only for extraverts",
          "False — but only because of personality differences",
        ],
        correctIndex: 1,
        explanation: "Stack position is crucial. Dominant Se is effortless physical mastery. Inferior Se is a clumsy, feast-or-famine relationship with the physical world that can erupt as overindulgence under stress. Same function, completely different experience.",
      },
    },
  ],
};

// ── Lesson 3: Se in Real Life ──────────────────────────────────────────────

const lesson3: Lesson = {
  id: "u21-l3",
  unitId: UNIT_ID,
  order: 3,
  title: "Se in the Wild",
  subtitle: "Relationships, work, stress, and creativity through the Se lens",
  xpReward: 25,
  exercises: [
    {
      id: "u21-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Se in Relationships",
        body: "Se users show love through shared experiences: road trips, cooking together, dancing, physical affection. They're fully present with you — not checking their phone or drifting into thought. Their gift is making ordinary moments feel vivid and alive through their infectious energy.",
        highlight: "shared experiences",
      },
    },
    {
      id: "u21-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Se Under Stress",
        body: "When stressed, Se users may escalate physical stimulation — driving faster, partying harder, taking bigger risks. In extreme stress (the 'grip'), ESTPs flip to inferior Ni, becoming paranoid about hidden meanings and convinced of conspiracy-like interpretations. ESFPs may descend into dark, doom-filled visions of the future.",
        highlight: "grip",
      },
    },
    {
      id: "u21-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does Se typically show love in close relationships?",
        options: [
          "Writing long reflective letters about their feelings",
          "Shared physical experiences — cooking together, adventures, being fully present and engaged",
          "Developing a long-term strategic plan for the relationship",
          "Remembering exact details from years of shared history",
        ],
        correctIndex: 1,
        explanation: "Se shows love through being fully, physically present. Se users want to DO things together — experience life side by side in real time. Their full attention in the moment is their love language.",
      },
    },
    {
      id: "u21-l3-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What happens to an ESTP in an 'Ni grip' (extreme stress)?",
        options: [
          "They become quiet, still, and physically withdrawn",
          "They become paranoid about hidden meanings, convinced that people have secret negative intentions",
          "They become obsessively organized and detail-focused",
          "They start caring deeply about everyone's feelings",
        ],
        correctIndex: 1,
        explanation: "The ESTP's inferior function is Ni. In a grip, the normally grounded, here-and-now ESTP becomes haunted by dark interpretations and hidden meanings — seeing conspiracies and sinister patterns that aren't there.",
      },
    },
    {
      id: "u21-l3-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "In the workplace, what does a healthy Se user most contribute?",
        options: [
          "Long-range strategic planning and abstract theorizing",
          "Real-time problem-solving, crisis response, and the ability to act decisively under pressure",
          "Detailed documentation of past procedures",
          "Abstract brainstorming about future possibilities",
        ],
        correctIndex: 1,
        explanation: "Se users are at their best when things need to happen NOW. Emergency rooms, kitchens, trading floors, construction sites — anywhere that rewards real-time physical response and the ability to stay calm under pressure.",
      },
    },
    {
      id: "u21-l3-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each life domain to how Se shows up in it.",
        pairs: [
          { left: "Relationships", right: "Fully present, physical affection, shared adventures" },
          { left: "Work", right: "Crisis response, real-time problem-solving, hands-on skill" },
          { left: "Stress", right: "Escalating stimulation, risk-taking, paranoid Ni grip" },
          { left: "Creativity", right: "Performing, physical art, craftsmanship, cooking" },
          { left: "Play", right: "Sports, dancing, travel, anything physically engaging" },
        ],
      },
    },
    {
      id: "u21-l3-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Se users thrive in careers that demand ___ — surgeons, chefs, athletes, firefighters, and performers all rely heavily on Se.",
        options: ["real-time physical response", "long-range planning", "abstract theorizing", "detailed record-keeping"],
        correctIndex: 0,
        explanation: "Se is the function of split-second physical intelligence. Careers that demand immediate, embodied response to a changing environment — where hesitation could mean failure — are where Se users shine brightest.",
      },
    },
    {
      id: "u21-l3-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Se-driven creativity tends to be ___ — performance, physical craft, cooking, dance — rather than purely conceptual or theoretical.",
        options: ["embodied", "abstract", "retrospective", "solitary"],
        correctIndex: 0,
        explanation: "Se creativity lives in the body and in the material world. Se artists sculpt, dance, cook, perform, and build. Their art exists in physical space and engages the senses directly, rather than living primarily on a page or in theory.",
      },
    },
    {
      id: "u21-l3-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Chef Tomás is in the middle of a dinner rush. Three orders come in simultaneously, a sauce is about to burn, and a prep cook just cut their finger. Without missing a beat, Tomás pulls the sauce off the heat, directs the prep cook to first aid, calls out the new orders, and tastes a dish — all within thirty seconds.",
        question: "What Se ability is Tomás demonstrating?",
        options: [
          "Si — he's recalling how he handled past rushes",
          "Se — real-time environmental awareness and instant physical response to multiple simultaneous demands",
          "Te — he's organizing the kitchen efficiently",
          "Fe — he's managing the team's emotions",
        ],
        correctIndex: 1,
        explanation: "Tomás is in full Se flow: simultaneously aware of multiple physical stimuli (sauce, injury, orders) and responding to all of them in real time. This kind of multi-track physical awareness and instant response is pure Se mastery.",
      },
    },
    {
      id: "u21-l3-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "After a breakup, an ESFP named Rina starts going out every night, staying out until 4 AM, bungee jumping on weekends, and drinking more than usual. Her friend says, 'You seem like you're having fun.' But Rina's inner experience is one of desperate numbness — she's using sensation to avoid feeling the pain.",
        question: "What is happening with Se here?",
        options: [
          "Rina is using healthy Se to enjoy life",
          "Rina is using Se as an escape mechanism — escalating physical stimulation to drown out emotional pain she doesn't want to face",
          "This has nothing to do with Se — she's just partying",
          "Rina is developing her inferior Ni",
        ],
        correctIndex: 1,
        explanation: "Se under stress can become a numbing agent. Instead of processing difficult emotions, the Se user escalates sensory stimulation — louder music, faster speeds, stronger drinks — using physical intensity to overwhelm the pain.",
      },
    },
    {
      id: "u21-l3-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these workplace situations into 'Se-friendly' vs. 'Se-hostile.'",
        categories: ["Se-Friendly", "Se-Hostile"],
        items: [
          { text: "Hands-on work with immediate, tangible results", categoryIndex: 0 },
          { text: "Sitting in a cubicle writing reports about abstract strategies", categoryIndex: 1 },
          { text: "Fast-paced environment where you react to what's happening now", categoryIndex: 0 },
          { text: "Years-long project with no visible progress", categoryIndex: 1 },
          { text: "Physical craft, tools, and materials you can touch", categoryIndex: 0 },
          { text: "Endless meetings discussing hypothetical future scenarios", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u21-l3-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which of these is a common strength of Se in everyday life?",
        options: [
          "Developing ten-year strategic plans",
          "Staying fully present and responding instantly to what's happening right now",
          "Remembering exactly how things were done in the past",
          "Seeing abstract patterns that others miss",
        ],
        correctIndex: 1,
        explanation: "Se's greatest everyday strength is presence. In a world where most people are distracted, Se users are fully HERE — noticing, reacting, engaging. This makes them invaluable in emergencies, performance, and any situation that demands real-time physical response.",
      },
    },
  ],
};

// ── Lesson 4: Spotting Se & Common Confusions ──────────────────────────────

const lesson4: Lesson = {
  id: "u21-l4",
  unitId: UNIT_ID,
  order: 4,
  title: "Se vs. the Imposters",
  subtitle: "Spotting Se in others and distinguishing it from similar functions",
  xpReward: 30,
  exercises: [
    {
      id: "u21-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Critical Distinction: Se vs. Ne",
        body: "Se and Ne are BOTH extraverted perceiving functions, but they engage with different realities. Se perceives concrete, physical reality — what IS. Ne perceives abstract possibilities — what COULD BE. Se says 'Look at this!' Ne says 'Imagine if this were...'",
        highlight: "IS vs. COULD BE",
      },
    },
    {
      id: "u21-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Other Common Confusions",
        body: "Se is often confused with Si because both are 'sensing' functions. But Se is locked into NOW — the immediate physical environment. Si is locked into THEN — the stored impressions of past experience. Se is also confused with thrill-seeking in general, but not all Se users are adrenaline junkies. Se is simply full engagement with physical reality, whether that's cooking, gardening, or surgery.",
        highlight: "NOW vs. THEN",
      },
    },
    {
      id: "u21-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the KEY difference between Se and Ne?",
        options: [
          "Se is smarter, Ne is more creative",
          "Se engages with concrete physical reality, Ne engages with abstract possibilities",
          "Se is for extraverts, Ne is for introverts",
          "Se is about the body, Ne is about emotions",
        ],
        correctIndex: 1,
        explanation: "Both Se and Ne are extraverted perceiving, but Se perceives what IS (the tangible, physical world) while Ne perceives what COULD BE (the intangible web of possibilities). Concrete reality vs. abstract potential.",
      },
    },
    {
      id: "u21-l4-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Someone walks into a room and instantly notices: the lighting is warm, the music is at the wrong tempo for the mood, and the host is wearing an incredible outfit. Which function is this?",
        options: [
          "Ne — they're generating possibilities about the room",
          "Si — they're comparing to past rooms they've been in",
          "Se — they're absorbing the concrete sensory details of the present environment",
          "Fe — they're reading the group's emotions",
        ],
        correctIndex: 2,
        explanation: "Immediately absorbing the concrete physical details of a space — lighting, music, visual aesthetics — is textbook Se. Si would compare to a past room, Ne would imagine what the room could become, and Fe would focus on the social-emotional atmosphere.",
      },
    },
    {
      id: "u21-l4-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Why is Se sometimes unfairly stereotyped as 'shallow' or 'just about partying'?",
        options: [
          "Because Se users genuinely don't think deeply",
          "Because Se's focus on the physical and present can look like superficiality to abstract thinkers, when it's actually a profound engagement with concrete reality",
          "Because Se users don't care about anything beyond pleasure",
          "Because Se is objectively the most basic function",
        ],
        correctIndex: 1,
        explanation: "Se's depth lies in its engagement with PHYSICAL reality — the surgeon's precise cut, the chef's perfect timing, the firefighter's instant response. This is not shallow; it's a different KIND of depth that abstract-dominant types sometimes fail to appreciate.",
      },
    },
    {
      id: "u21-l4-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each statement to whether it reflects Se or Ne.",
        pairs: [
          { left: "Se", right: "'Look at the way that light hits the water right now'" },
          { left: "Ne", right: "'What if water could conduct data like fiber optics?'" },
          { left: "Se", right: "'Taste this — the salt and acid are perfectly balanced'" },
          { left: "Ne", right: "'This recipe reminds me of twelve other things we could try'" },
        ],
      },
    },
    {
      id: "u21-l4-e7",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort these behaviors into Se vs. Ne.",
        categories: ["Se", "Ne"],
        items: [
          { text: "Catches a ball without thinking — pure reflex", categoryIndex: 0 },
          { text: "Sees a ball and imagines ten new games you could invent", categoryIndex: 1 },
          { text: "Describes exactly what a dish tastes like in precise sensory detail", categoryIndex: 0 },
          { text: "Wonders what would happen if you combined this cuisine with another", categoryIndex: 1 },
          { text: "Notices the exact color shift in a sunset as it happens", categoryIndex: 0 },
          { text: "The sunset makes them think of a poem, which reminds them of a friend, which sparks a business idea", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u21-l4-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Se can be confused with Si because both involve sensing, but Se is oriented toward the ___ environment while Si is oriented toward ___ impressions.",
        options: ["present external / stored internal", "abstract / concrete", "emotional / logical", "future / present"],
        correctIndex: 0,
        explanation: "Se engages with the external physical world as it exists right now. Si references an internal library of stored past experience. Same raw material (sensory data), but Se looks outward to now and Si looks inward to then.",
      },
    },
    {
      id: "u21-l4-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two people are exploring a farmers' market. Person A picks up a peach, examines its color, smells it deeply, squeezes it gently, and says, 'This one is perfect — ripe, fragrant, firm but yielding. I'm getting this.' Person B picks up a peach and says, 'Ooh, what if we made a peach-lavender sorbet? Or a grilled peach salad! Actually, peaches would be amazing in that Thai curry recipe I've been thinking about.'",
        question: "Which person is demonstrating Se and which Ne?",
        options: [
          "Person A = Ne, Person B = Se",
          "Person A = Se, Person B = Ne",
          "Both are using Se",
          "Both are using Ne",
        ],
        correctIndex: 1,
        explanation: "Person A is in pure Se mode: engaging with the concrete, physical qualities of the peach RIGHT NOW — its color, scent, texture. Person B is in Ne mode: the peach triggers a cascade of abstract possibilities about what it COULD become.",
      },
    },
    {
      id: "u21-l4-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two athletes describe their experience during competition. Athlete A: 'When I'm playing, everything else disappears. I see the ball, I feel my body move, and I just REACT. It's like time slows down.' Athlete B: 'Before a match, I visualize every scenario that could unfold and prepare a response for each. During the game, I'm executing my internal playbook.'",
        question: "Which athlete is primarily using Se?",
        options: [
          "Athlete B — they're more strategic",
          "Athlete A — they're fully immersed in real-time physical response without conscious deliberation",
          "Both are using Se equally",
          "Neither — sports isn't about cognitive functions",
        ],
        correctIndex: 1,
        explanation: "Athlete A describes classic Se flow: present-moment immersion, body-first response, time distortion from pure engagement. Athlete B is using more Ni-Te — pre-visualizing scenarios and executing planned strategies. Both can be effective athletes, but A's experience is Se-dominant.",
      },
    },
    {
      id: "u21-l4-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "You're trying to decide if someone uses Se or is just an active person who likes exercise. They go to the gym regularly and enjoy sports.",
        question: "What's the best way to distinguish genuine Se from simply being physically active?",
        options: [
          "Se users engage with the QUALITY of physical experience — they notice sensory details, respond to environmental changes in real time, and are fully embodied, not just going through the motions",
          "There is no difference — exercise IS Se",
          "Se users only like extreme sports",
          "Se users are always the most athletic person in the room",
        ],
        correctIndex: 0,
        explanation: "The key differentiator is QUALITY OF ENGAGEMENT. Anyone can exercise, but Se users are fully immersed in the physical experience — noticing how their body feels, responding to environmental changes, and present in a way that goes beyond just completing a workout.",
      },
    },
    {
      id: "u21-l4-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Quick review: Se is best described as...",
        options: [
          "An internal archive of past sensory memories",
          "Full immersion in the present moment — real-time physical engagement with concrete reality",
          "A possibility generator that sees what things could become",
          "A pattern recognizer that predicts future events",
        ],
        correctIndex: 1,
        explanation: "Se is the present-moment amplifier. It is a perceiving function that fully engages with the concrete, physical world as it exists right now — bringing heightened sensory awareness, instant reaction, and complete embodied presence.",
      },
    },
  ],
};

export const unit21Lessons: Lesson[] = [lesson1, lesson2, lesson3, lesson4];
