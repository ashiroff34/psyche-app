// ─────────────────────────────────────────────────────────────────────────────
// Unit 20, Introverted Sensing (Si)
// Living archive, detailed sensory memory, past-to-present comparison
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson } from "@/types/lessons";

const UNIT_ID = "si";

// ── Lesson 1: What IS Si? ─────────────────────────────────────────────────

const lesson1: Lesson = {
  id: "u20-l1",
  unitId: UNIT_ID,
  order: 1,
  title: "The Living Archive",
  subtitle: "What Introverted Sensing feels like from the inside",
  xpReward: 20,
  exercises: [
    {
      id: "u20-l1-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "What Is Introverted Sensing?",
        body: "Si is a rich internal archive of past sensory experience. It asks: 'How does this compare to what I've experienced before?' Every new moment is automatically cross-referenced with stored impressions, not just facts, but how things FELT, tasted, sounded, and smelled.",
        highlight: "internal archive",
      },
    },
    {
      id: "u20-l1-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Si from the Inside",
        body: "People with strong Si describe vivid re-experiencing of past moments, the exact warmth of a childhood kitchen, the texture of a favorite blanket, the way rain sounded on a particular afternoon. It's not dry recall; it's reliving with full emotional and sensory texture.",
        highlight: "vivid re-experiencing",
      },
    },
    {
      id: "u20-l1-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the core question that Si asks?",
        options: [
          "What exciting new possibility is out there?",
          "How does this compare to what I've experienced before?",
          "What is the most logical explanation?",
          "What is happening right now in this moment?",
        ],
        correctIndex: 1,
        explanation: "Si constantly compares present experience to stored past impressions. It's a past-to-present comparison engine that brings the depth of prior experience into every new moment.",
      },
    },
    {
      id: "u20-l1-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does Si store memories differently from a simple factual record?",
        options: [
          "It only stores visual images like photographs",
          "It stores the full sensory and emotional texture of experiences, how things FELT, not just what happened",
          "It stores memories in strict chronological order like a timeline",
          "It only stores negative experiences as warnings",
        ],
        correctIndex: 1,
        explanation: "Si memories are rich, multi-sensory impressions. A Si user doesn't just remember a holiday dinner, they remember the exact taste of the stuffing, the warmth of the room, and the feeling of contentment in their chest.",
      },
    },
    {
      id: "u20-l1-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Si is classified as a _____ function.",
        options: [
          "Judging, Extraverted",
          "Perceiving, Extraverted",
          "Judging, Introverted",
          "Perceiving, Introverted",
        ],
        correctIndex: 3,
        explanation: "Si is a Perceiving function (it takes in and processes information) with an Introverted attitude (it references an internal library of stored impressions rather than the external environment).",
      },
    },
    {
      id: "u20-l1-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each Si characteristic to its description.",
        pairs: [
          { left: "Sensory Memory", right: "Vivid recall of how things felt, tasted, sounded" },
          { left: "Comparison Engine", right: "Constantly cross-references present with past" },
          { left: "Reliability", right: "Trust in what has been proven to work before" },
          { left: "Emotional Texture", right: "Memories include the feelings, not just facts" },
          { left: "Detail Orientation", right: "Notices when something is different from before" },
        ],
      },
    },
    {
      id: "u20-l1-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Si stores experiences as rich ___, not just what happened, but the full sensory and emotional quality of the moment.",
        options: ["impressions", "photographs", "theories", "predictions"],
        correctIndex: 0,
        explanation: "Jung used the term 'impressions' to describe how Si stores experience. These are holistic recordings that include sensory data, emotional tone, and bodily sensations, far more than simple factual memory.",
      },
    },
    {
      id: "u20-l1-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "When a Si user walks into their grandmother's house after years away, they might be flooded with ___ memories triggered by familiar smells and textures.",
        options: ["vivid sensory", "abstract theoretical", "future-oriented", "logically structured"],
        correctIndex: 0,
        explanation: "Si memories are deeply anchored to sensory triggers. A familiar scent, texture, or sound can instantly transport a Si user back to a past experience with remarkable vividness and emotional intensity.",
      },
    },
    {
      id: "u20-l1-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Maya visits a coffee shop she hasn't been to in five years. The moment she walks in, she notices the espresso machine has been replaced, the chairs are different, and the barista is using a new milk steaming technique. She thinks, 'This isn't the same, something about the atmosphere has shifted.'",
        question: "What cognitive function is Maya primarily using?",
        options: [
          "Se, she's immersed in the present-moment sensory experience",
          "Si, she's automatically comparing the current experience to her stored impression of the original",
          "Ni, she's predicting how the coffee shop will change in the future",
          "Ne, she's brainstorming possibilities for why the shop changed",
        ],
        correctIndex: 1,
        explanation: "Maya is doing classic Si work: she has a detailed stored impression of how the coffee shop was, and she's automatically comparing the present reality to that internal archive. She notices discrepancies because her Si holds a vivid record.",
      },
    },
    {
      id: "u20-l1-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two friends are cooking together. Friend A tastes the soup and says, 'This needs more salt, last time we made this, we used about a teaspoon more and it was perfect.' Friend B tastes it and says, 'Interesting flavor, what if we tried adding something totally unexpected, like miso paste?'",
        question: "Which friend is demonstrating Si?",
        options: [
          "Friend B, they're being creative with flavors",
          "Friend A, they're referencing a specific past experience to guide the present",
          "Both are using Si equally",
          "Neither is using Si, this is just cooking",
        ],
        correctIndex: 1,
        explanation: "Friend A demonstrates Si by referencing a specific past experience ('last time we made this') and using that stored impression to guide current action. Friend B is more likely using Ne, exploring novel possibilities.",
      },
    },
    {
      id: "u20-l1-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these statements into Si expressions vs. NOT Si expressions.",
        categories: ["Si Expression", "Not Si"],
        items: [
          { text: "This reminds me exactly of that time we...", categoryIndex: 0 },
          { text: "What if we tried something completely new?", categoryIndex: 1 },
          { text: "Last time we did it this way and it worked perfectly", categoryIndex: 0 },
          { text: "I have a hunch about where this is all heading", categoryIndex: 1 },
          { text: "Something about this smells different than usual", categoryIndex: 0 },
          { text: "Let's just see what happens in the moment", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u20-l1-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which types have Si as their DOMINANT (first) function?",
        options: [
          "ENTP and ENFP",
          "ISTJ and ISFJ",
          "ESTP and ESFP",
          "INTJ and INFJ",
        ],
        correctIndex: 1,
        explanation: "ISTJ (Si-Te-Fi-Ne) and ISFJ (Si-Fe-Ti-Ne) lead with Si as their dominant function. Their entire worldview is organized around their rich internal library of past experience.",
      },
    },
  ],
};

// ── Lesson 2: Si in Different Stack Positions ──────────────────────────────

const lesson2: Lesson = {
  id: "u20-l2",
  unitId: UNIT_ID,
  order: 2,
  title: "Si in Your Stack",
  subtitle: "How Si looks as dominant, auxiliary, tertiary, or inferior",
  xpReward: 25,
  exercises: [
    {
      id: "u20-l2-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Stack Position Changes Everything",
        body: "Si as a dominant function (ISTJ, ISFJ) creates people with an extraordinarily detailed internal world of stored experience. Si as an inferior function (ENTP, ENFP) manifests as health anxiety, nostalgic spirals, or suddenly obsessing over bodily sensations they usually ignore.",
        highlight: "Stack position changes everything",
      },
    },
    {
      id: "u20-l2-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Beebe Model & Si",
        body: "In Beebe's archetypal model, dominant Si is the Hero, trusted and well-developed. Inferior Si is the Anima/Animus, the least conscious function. For Ne-dominant types (ENTP, ENFP), inferior Si emerges as their greatest vulnerability: an anxious fixation on physical sensations and past failures.",
        highlight: "Hero vs. Anima/Animus",
      },
    },
    {
      id: "u20-l2-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does DOMINANT Si (ISTJ/ISFJ) typically appear in everyday life?",
        options: [
          "Constantly chasing new experiences and novel ideas",
          "Drawing on a vast internal library of past experience to navigate present situations reliably",
          "Reacting instantly to physical stimuli in the environment",
          "Generating abstract theories about the future",
        ],
        correctIndex: 1,
        explanation: "Dominant Si users live within their archive. They approach the present through the lens of what they've experienced before, making them reliable, thorough, and deeply knowledgeable about what works.",
      },
    },
    {
      id: "u20-l2-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "When Si is the AUXILIARY (second) function, as in ESTJ and ESFJ, how does it typically show up?",
        options: [
          "As the primary lens for all experience",
          "As a supporting database that informs their dominant judging function's decisions",
          "As an unconscious, anxiety-driven force",
          "As something they actively resist and avoid",
        ],
        correctIndex: 1,
        explanation: "Auxiliary Si provides ESTJs and ESFJs with a rich experiential database that supports their leading Te or Fe. It's their internal reference library, 'Here's what worked before', feeding reliable data to their decision-making.",
      },
    },
    {
      id: "u20-l2-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which types have Si as their INFERIOR (fourth) function?",
        options: [
          "ISTJ and ISFJ",
          "ESTJ and ESFJ",
          "ENTP and ENFP",
          "ESTP and ESFP",
        ],
        correctIndex: 2,
        explanation: "ENTP (Ne-Ti-Fe-Si) and ENFP (Ne-Fi-Te-Si) have Si in the inferior position. It is their least conscious and most vulnerable function, which is why they can struggle with routines, health maintenance, and getting stuck in past regrets.",
      },
    },
    {
      id: "u20-l2-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each stack position to how Si manifests.",
        pairs: [
          { left: "Dominant (ISTJ/ISFJ)", right: "Rich internal world of stored impressions guides all decisions" },
          { left: "Auxiliary (ESTJ/ESFJ)", right: "Reliable experiential database supporting judgment" },
          { left: "Tertiary (INTP/INFP)", right: "Growing comfort with routines and personal traditions" },
          { left: "Inferior (ENTP/ENFP)", right: "Health anxiety, nostalgia spirals, sensory overwhelm" },
        ],
      },
    },
    {
      id: "u20-l2-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "An ENFP under extreme stress may experience their inferior Si as obsessive ___, Googling symptoms, convinced something is physically wrong.",
        options: ["health anxiety", "brainstorming", "social performance", "logical analysis"],
        correctIndex: 0,
        explanation: "When inferior Si grips Ne-dominant types, it often manifests as hypochondria or health anxiety. The normally future-focused, possibility-loving ENFP becomes fixated on bodily sensations and worst-case physical scenarios.",
      },
    },
    {
      id: "u20-l2-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "ENTPs and ENFPs with inferior Si often struggle with maintaining consistent ___, even when they know these habits are good for them.",
        options: ["routines", "friendships", "theories", "creativity"],
        correctIndex: 0,
        explanation: "Inferior Si makes consistent routines feel stifling and boring to Ne-dominant types. They know they should eat regularly, exercise consistently, and keep a schedule, but their Ne constantly pulls them toward novelty instead.",
      },
    },
    {
      id: "u20-l2-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Dani, an ENTP inventor, has been working on a new project for weeks with barely any sleep. Suddenly, they spiral into panic: 'What's this pain in my chest? I think I'm having a heart attack. Actually, three years ago I had a similar feeling, what if it's been something serious this whole time?' They spend the next four hours on WebMD.",
        question: "What is happening psychologically?",
        options: [
          "They are developing their dominant Ne further",
          "Their inferior Si is erupting, fixating on bodily sensations and past physical experiences with anxiety",
          "They are using healthy Ti to logically analyze their health",
          "Their Fe is making them worry about others",
        ],
        correctIndex: 1,
        explanation: "This is classic inferior Si in an ENTP. The normally idea-obsessed Ne-dominant becomes hijacked by physical sensations and past-referencing anxiety. The WebMD spiral is practically a signature of inferior Si under stress.",
      },
    },
    {
      id: "u20-l2-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two people both value family traditions. Person A (ISFJ) says: 'We've always done Christmas Eve dinner with grandma's exact recipe. I remember exactly how the kitchen smelled when she made it, I want to recreate that feeling.' Person B (ENFP) says: 'I love Christmas traditions! Well, usually. Sometimes I change them up. But when I'm really stressed, I desperately want everything to be EXACTLY like it was when I was little.'",
        question: "What explains the difference in their relationship to tradition?",
        options: [
          "Person A doesn't really care about tradition",
          "Person A has dominant Si and naturally treasures stored impressions; Person B has inferior Si and tradition emerges mainly under stress as a comfort-seeking grip",
          "Person B is more mature about tradition",
          "There is no real difference, both are just sentimental",
        ],
        correctIndex: 1,
        explanation: "Dominant Si naturally and comfortably weaves past impressions into daily life. Inferior Si has an unstable relationship with the past, sometimes dismissing tradition, sometimes desperately clinging to it when stressed.",
      },
    },
    {
      id: "u20-l2-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these experiences into Dominant Si vs. Inferior Si.",
        categories: ["Dominant Si", "Inferior Si"],
        items: [
          { text: "Comfortably maintains detailed routines and traditions", categoryIndex: 0 },
          { text: "Panic-Googling symptoms at 3 AM", categoryIndex: 1 },
          { text: "Naturally compares present experience to rich past impressions", categoryIndex: 0 },
          { text: "Sudden nostalgia spiral when overwhelmed", categoryIndex: 1 },
          { text: "Reliably remembers how things were done before", categoryIndex: 0 },
          { text: "Obsessing over a minor physical sensation", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u20-l2-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "True or false: Si works the same way regardless of its position in someone's cognitive stack.",
        options: [
          "True, Si is Si",
          "False, stack position dramatically changes how Si manifests",
          "True, but only for sensing types",
          "False, but only because of age differences",
        ],
        correctIndex: 1,
        explanation: "Stack position is crucial. Dominant Si is a trusted, detailed archive. Inferior Si is an anxiety-prone blind spot that can erupt as hypochondria or desperate nostalgia. Same function, completely different experience.",
      },
    },
  ],
};

// ── Lesson 3: Si in Real Life ──────────────────────────────────────────────

const lesson3: Lesson = {
  id: "u20-l3",
  unitId: UNIT_ID,
  order: 3,
  title: "Si in the Wild",
  subtitle: "Relationships, work, stress, and creativity through the Si lens",
  xpReward: 25,
  exercises: [
    {
      id: "u20-l3-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Si in Relationships",
        body: "Si users show love through remembering: your favorite coffee order, the story you told them three years ago, the exact way you like your eggs. They build relationships through shared history and feel most connected when traditions and rituals are honored.",
        highlight: "remembering",
      },
    },
    {
      id: "u20-l3-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Si Under Stress",
        body: "When stressed, Si users may become rigid, clinging to 'how things have always been done' and resisting any change. In extreme stress (the 'grip'), ISFJs flip to inferior Ne, catastrophizing about all the terrible things that COULD go wrong. ISTJs may spiral into worst-case-scenario thinking.",
        highlight: "grip",
      },
    },
    {
      id: "u20-l3-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "How does Si typically show love in close relationships?",
        options: [
          "Grand spontaneous gestures and surprises",
          "Remembering specific details about you, your preferences, your stories, your history together",
          "Debating ideas passionately into the night",
          "Pushing you to try exciting new experiences",
        ],
        correctIndex: 1,
        explanation: "Si shows love through detailed memory and consistency. Remembering your exact coffee order, the anniversary of your first date, or a story you told once, this is Si saying 'You matter enough for me to store every detail.'",
      },
    },
    {
      id: "u20-l3-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What happens to an ISFJ in an 'Ne grip' (extreme stress)?",
        options: [
          "They become intensely focused on physical sensations",
          "They catastrophize about all the terrible things that could go wrong, seeing doom in every possibility",
          "They become loud, aggressive, and confrontational",
          "They withdraw into abstract philosophical thinking",
        ],
        correctIndex: 1,
        explanation: "The ISFJ's inferior function is Ne. In a grip, ISFJs flip from their grounded, past-based reliability to anxious future-thinking, imagining worst-case scenarios for every situation.",
      },
    },
    {
      id: "u20-l3-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "In the workplace, what does a healthy Si user most contribute?",
        options: [
          "Radical innovation and paradigm-shifting ideas",
          "Institutional memory, quality control, and reliable processes that actually work",
          "Spontaneous brainstorming and idea generation",
          "Aggressive deadline pressure and competitive energy",
        ],
        correctIndex: 1,
        explanation: "Si users are the organizational backbone. They remember what was tried before, maintain quality standards, and ensure proven processes are followed. Without Si, organizations repeat mistakes and lose institutional knowledge.",
      },
    },
    {
      id: "u20-l3-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each life domain to how Si shows up in it.",
        pairs: [
          { left: "Relationships", right: "Remembers every detail and builds shared history" },
          { left: "Work", right: "Institutional memory and reliable quality control" },
          { left: "Stress", right: "Rigidity, clinging to routine, catastrophizing" },
          { left: "Creativity", right: "Perfecting and refining within proven forms" },
          { left: "Health", right: "Attentive to body signals and consistent self-care" },
        ],
      },
    },
    {
      id: "u20-l3-e7",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Si users often serve as the ___ of their organizations, remembering what was tried before, what worked, and what failed.",
        options: ["institutional memory", "creative spark", "devil's advocate", "social glue"],
        correctIndex: 0,
        explanation: "Si users are walking archives of organizational history. They prevent teams from reinventing the wheel or repeating past mistakes, because they remember exactly how things went the last time.",
      },
    },
    {
      id: "u20-l3-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Si-driven creativity tends to involve ___ existing forms and traditions rather than inventing entirely new ones, think of a baker perfecting a recipe over decades.",
        options: ["refining", "abandoning", "ignoring", "theorizing about"],
        correctIndex: 0,
        explanation: "Si creativity is iterative and detail-oriented. Rather than throwing everything out and starting fresh, Si users make things better through countless small refinements informed by past experience.",
      },
    },
    {
      id: "u20-l3-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Kenji has been making his family's miso soup recipe for 30 years. Each time, he notices subtle differences, 'The dashi is slightly stronger today, the tofu is a different texture than last month's brand.' He's made hundreds of tiny adjustments over the decades, and everyone says his version is now better than the original.",
        question: "What Si process is Kenji demonstrating?",
        options: [
          "Mindless repetition of tradition",
          "Rich past-to-present comparison enabling continuous, detail-level refinement",
          "Se present-moment immersion in the cooking experience",
          "Ne exploration of new cooking possibilities",
        ],
        correctIndex: 1,
        explanation: "Kenji's process is pure Si mastery: each batch is compared to hundreds of stored impressions, and tiny differences are noticed and adjusted. This isn't mindless repetition, it's deeply attentive refinement powered by an extraordinary sensory archive.",
      },
    },
    {
      id: "u20-l3-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Elena, an ISTJ nurse, notices that a patient's skin color looks slightly different from yesterday. Her colleague says, 'They look fine to me.' Elena insists on running additional tests, which reveal an early-stage infection that would have been dangerous if caught later.",
        question: "What Si strength saved the patient?",
        options: [
          "Elena's logical analysis of the situation",
          "Elena's detailed sensory memory noticed a subtle change that didn't match her stored impression of the patient's baseline",
          "Elena's gut intuition about the future",
          "Elena's desire to maintain social harmony on the ward",
        ],
        correctIndex: 1,
        explanation: "Si's ability to notice 'something is different from before' is a literal lifesaver in healthcare. Elena's internal archive of the patient's previous appearance flagged a discrepancy that a less Si-oriented person might miss.",
      },
    },
    {
      id: "u20-l3-e11",
      difficulty: 3,
      content: {
        type: "sorting",
        instruction: "Sort these workplace situations into 'Si-friendly' vs. 'Si-hostile.'",
        categories: ["Si-Friendly", "Si-Hostile"],
        items: [
          { text: "Clear procedures that have been refined over time", categoryIndex: 0 },
          { text: "Constant restructuring with no respect for what worked before", categoryIndex: 1 },
          { text: "Your experience and institutional knowledge are valued", categoryIndex: 0 },
          { text: "'Forget everything you know, we're starting from scratch'", categoryIndex: 1 },
          { text: "Detailed documentation and standard operating procedures", categoryIndex: 0 },
          { text: "Chaos, no records, and a new system every month", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u20-l3-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Which of these is a common strength of Si in everyday life?",
        options: [
          "Generating wildly original ideas",
          "Noticing subtle changes because something doesn't match a stored impression",
          "Making split-second physical reactions in emergencies",
          "Reading the emotional atmosphere of a room instantly",
        ],
        correctIndex: 1,
        explanation: "Si's greatest everyday strength is its comparison engine. Because Si users carry such detailed internal records, they notice when something is even slightly off, a skill invaluable in quality control, healthcare, cooking, and relationships.",
      },
    },
  ],
};

// ── Lesson 4: Spotting Si & Common Confusions ──────────────────────────────

const lesson4: Lesson = {
  id: "u20-l4",
  unitId: UNIT_ID,
  order: 4,
  title: "Si vs. the Imposters",
  subtitle: "Spotting Si in others and distinguishing it from similar functions",
  xpReward: 30,
  exercises: [
    {
      id: "u20-l4-e1",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "The Critical Distinction: Si vs. Se",
        body: "Si and Se are BOTH sensing functions, but they face opposite directions. Si asks 'How does this compare to before?', it's a past-oriented comparison. Se asks 'What's happening right NOW?', it's present-moment immersion. Si savors the memory of a sunset; Se is fully absorbed in watching it.",
        highlight: "opposite directions",
      },
    },
    {
      id: "u20-l4-e2",
      difficulty: 1,
      content: {
        type: "concept-intro",
        title: "Other Common Confusions",
        body: "Si is often confused with Ni because both are introverted perceiving functions, quiet internal processing. But Si stores concrete, detailed impressions ('I remember exactly how it felt'), while Ni synthesizes abstract patterns ('I sense where this is heading'). Si is also NOT the same as having a good memory, it's specifically sensory-experiential recall.",
        highlight: "impressions vs. patterns",
      },
    },
    {
      id: "u20-l4-e3",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "What is the KEY difference between Si and Se?",
        options: [
          "Si is for introverts, Se is for extroverts",
          "Si references stored past impressions, Se immerses in the present-moment sensory environment",
          "Si is deeper, Se is shallower",
          "Si is about thinking, Se is about feeling",
        ],
        correctIndex: 1,
        explanation: "The i/e distinction is about TIME ORIENTATION. Si is past-referencing, it compares now to then. Se is present-immersing, it fully engages with what's happening right now. Both can be equally rich and detailed.",
      },
    },
    {
      id: "u20-l4-e4",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Someone says: 'I just had a feeling that something about this situation was off, and then I realized it's heading toward disaster.' Which function is this?",
        options: [
          "Si, they're comparing to the past",
          "Se, they're reading the present environment",
          "Ni, they're synthesizing patterns into a future prediction",
          "Ne, they're brainstorming possibilities",
        ],
        correctIndex: 2,
        explanation: "Sensing 'where this is heading' from unconscious pattern synthesis is Ni. Si would say 'This reminds me of last time, when things went badly', the reference is to a specific stored past experience, not an abstract convergent insight.",
      },
    },
    {
      id: "u20-l4-e5",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Why is Si sometimes unfairly stereotyped as 'boring' or 'traditional'?",
        options: [
          "Because Si users genuinely have no creativity",
          "Because Si's respect for the past and preference for proven methods can look like resistance to change from the outside",
          "Because Si users don't experience emotions",
          "Because Si is objectively the least interesting function",
        ],
        correctIndex: 1,
        explanation: "Si's value for experience, tradition, and refinement can look like rigidity from the outside, especially to Ne or Se users who crave novelty. In reality, Si offers extraordinary depth, rich inner experience, and masterful attention to detail.",
      },
    },
    {
      id: "u20-l4-e6",
      difficulty: 2,
      content: {
        type: "matching-pairs",
        instruction: "Match each statement to whether it reflects Si or Ni.",
        pairs: [
          { left: "Si", right: "'This reminds me exactly of what happened in 2019'" },
          { left: "Ni", right: "'I can just sense where this trend is heading'" },
          { left: "Si", right: "'The texture of this bread is different from last batch'" },
          { left: "Ni", right: "'Something is converging, I can't explain it yet'" },
        ],
      },
    },
    {
      id: "u20-l4-e7",
      difficulty: 2,
      content: {
        type: "sorting",
        instruction: "Sort these behaviors into Si vs. Se.",
        categories: ["Si", "Se"],
        items: [
          { text: "Notices the restaurant changed their recipe since last visit", categoryIndex: 0 },
          { text: "Fully immersed in the flavor of what they're eating right now", categoryIndex: 1 },
          { text: "Prefers to revisit a beloved vacation spot", categoryIndex: 0 },
          { text: "Wants to explore a brand new destination every trip", categoryIndex: 1 },
          { text: "Remembers exactly how a song sounded at a concert years ago", categoryIndex: 0 },
          { text: "Gets chills from the live music reverberating through their body right now", categoryIndex: 1 },
        ],
      },
    },
    {
      id: "u20-l4-e8",
      difficulty: 2,
      content: {
        type: "fill-in-blank",
        sentence: "Si can be confused with Ni because both involve quiet internal processing, but Si stores concrete ___ while Ni synthesizes abstract ___.",
        options: ["impressions / patterns", "theories / memories", "feelings / values", "data / emotions"],
        correctIndex: 0,
        explanation: "Si's internal world is full of specific, vivid sensory impressions from past experience. Ni's internal world is full of abstract patterns, symbols, and convergent insights. Similar inward orientation, completely different content.",
      },
    },
    {
      id: "u20-l4-e9",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "At a wine tasting, Person A takes a sip and says, 'This reminds me of a Barolo I had in Piedmont eight years ago, same earthy undertone, but this one has less tannin.' Person B takes a sip and says, 'Wow, taste that acidity! Feel how it dries out the sides of your tongue right now. This is incredible.'",
        question: "Which person is demonstrating Si and which Se?",
        options: [
          "Person A = Se, Person B = Si",
          "Person A = Si, Person B = Se",
          "Both are using Si",
          "Both are using Se",
        ],
        correctIndex: 1,
        explanation: "Person A is doing classic Si: comparing the present wine to a specific stored sensory memory from eight years ago. Person B is doing classic Se: fully immersed in the present-moment physical sensation of the wine right now.",
      },
    },
    {
      id: "u20-l4-e10",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "Two managers are dealing with a new business challenge. Manager A says: 'We faced something similar in 2018, here's exactly what we did and how it turned out. Let's use that as our starting point.' Manager B says: 'I have a strong sense that the market is shifting in a new direction. I can't point to specifics, but I know we need to pivot.'",
        question: "Which manager is using Si and which is using Ni?",
        options: [
          "Manager A = Ni, Manager B = Si",
          "Manager A = Si, Manager B = Ni",
          "Both are using Si",
          "Both are using Ni",
        ],
        correctIndex: 1,
        explanation: "Manager A references a specific past experience with concrete details, textbook Si. Manager B describes a convergent feeling about the future that they can't fully articulate, textbook Ni. Both are valid approaches, but they draw from different sources.",
      },
    },
    {
      id: "u20-l4-e11",
      difficulty: 3,
      content: {
        type: "scenario",
        scenario: "You're trying to decide if someone uses Si or just has a naturally good memory. They can recall incredibly specific details about past events, colors, textures, smells, exactly how things felt.",
        question: "What's the best way to distinguish genuine Si from just having a good memory?",
        options: [
          "Si users actively USE their stored impressions to navigate the present, comparing, evaluating, and guiding decisions based on past experience",
          "There is no difference, good memory IS Si",
          "Si users only remember negative experiences",
          "Si users have photographic memory, which is totally different from regular memory",
        ],
        correctIndex: 0,
        explanation: "The key differentiator is FUNCTIONAL USE. Si isn't just storage, it's an active perceiving process that continuously compares present experience to the past and uses those comparisons to guide behavior. Everyone has memory; Si is a way of perceiving through memory.",
      },
    },
    {
      id: "u20-l4-e12",
      difficulty: 1,
      content: {
        type: "multiple-choice",
        question: "Quick review: Si is best described as...",
        options: [
          "A present-moment sensory amplifier",
          "An internal archive of vivid past impressions used to navigate the present",
          "An abstract pattern recognizer that predicts the future",
          "A possibility generator that sees connections everywhere",
        ],
        correctIndex: 1,
        explanation: "Si is the living archive. It is a perceiving function that stores rich, detailed impressions of past experience and continuously compares them to the present, providing reliability, depth, and extraordinary attention to detail.",
      },
    },
  ],
};

export const unit20Lessons: Lesson[] = [lesson1, lesson2, lesson3, lesson4];
