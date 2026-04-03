// ─────────────────────────────────────────────────────────────────────────────
// Cognitive Functions Data, Expanded Edition
// Grounded in Carl Jung's "Psychological Types" (1921),
// John Beebe's 8-function model, Linda Berens' Interaction Styles,
// and David Keirsey's temperament theory.
// ─────────────────────────────────────────────────────────────────────────────

// ── Interfaces ───────────────────────────────────────────────────────────────

export interface DevelopmentStage {
  stage: string;
  description: string;
}

export interface LoopPattern {
  functions: [string, string];
  description: string;
}

export interface CognitiveFunction {
  code: string;
  name: string;
  alias: string;
  brief: string;
  description: string;
  jungianDescription: string;
  characteristics: string[];
  strengths: string[];
  blindSpots: string[];
  inDaily: string;
  color: string;
  attitude: "Extraverted" | "Introverted";
  category: "Perceiving" | "Judging";
  developmentStages: DevelopmentStage[];
  healthyExpression: string;
  unhealthyExpression: string;
  archetypeExamples: string[];
  shadowManifestation: string;
  bodyConnection: string;
}

export interface MBTIType {
  code: string;
  name: string;
  brief: string;
  stack: string[];
  fullStack: string[];
  description: string;
  cognitiveWiring: string;
  strengths: string[];
  growthAreas: string[];
  famousExamples: string[];
  journalPrompts: string[];
  color: string;
  loopPattern: LoopPattern;
  gripDescription: string;
  commonMistypes: string[];
  interactionStyle: string;
  temperament: string;
}

export interface AssessmentOption {
  text: string;
  scores: Record<string, number>;
}

export interface AssessmentQuestion {
  id: number;
  axis: string;
  text: string;
  optionA: AssessmentOption;
  optionB: AssessmentOption;
}

// ── Cognitive Functions ──────────────────────────────────────────────────────

export const cognitiveFunctions: CognitiveFunction[] = [
  {
    code: "Ni",
    name: "Introverted Intuition",
    alias: "The Visionary",
    brief: "Synthesizes information into a singular vision or insight about the future.",
    description:
      "Introverted Intuition (Ni) is a perceiving function that works by unconsciously synthesizing vast amounts of data into sudden insights, patterns, and \"aha\" moments. Ni users often experience knowing without being able to fully explain how they know. It is future-oriented and convergent, rather than exploring many possibilities, it narrows down to the most likely or meaningful one. Jung described this function as perceiving the background processes of events, the underlying archetypal patterns beneath surface reality.",
    jungianDescription:
      "In Psychological Types, Jung characterized introverted intuition as the function that perceives the background processes behind conscious reality. The introverted intuitive apprehends images arising from the a priori inherited foundations of the psyche, the archetypes. Unlike extraverted intuition, which flits from object to object seeking external novelty, Ni directs its gaze inward, toward the deep currents of the collective unconscious. Jung wrote that this type sees what is happening behind the scenes, perceiving the inner images that the present situation will eventually bring into reality. The introverted intuitive is the seer, the dreamer of archetypal dreams, the prophet whose visions often feel inevitable rather than speculative. This function operates below conscious awareness, delivering its conclusions as fully formed convictions rather than logical derivations. Jung noted that the introverted intuitive can be profoundly disconnected from external reality, living instead in a world of mythic imagery and symbolic meaning, yet their perceptions frequently prove prescient because they apprehend the latent possibilities inherent in the present configuration of events.",
    characteristics: [
      "Future-oriented thinking with a sense of 'just knowing'",
      "Convergent perception, narrows possibilities to one vision",
      "Pattern recognition across time and contexts",
      "Symbolic and metaphorical thinking",
      "Often experiences insights as sudden revelations",
    ],
    strengths: [
      "Strategic foresight",
      "Deep pattern recognition",
      "Visionary planning",
      "Symbolic understanding",
      "Focused intensity",
    ],
    blindSpots: [
      "Can be disconnected from present sensory reality",
      "May struggle to explain reasoning",
      "Risk of tunnel vision",
      "May dismiss concrete details",
    ],
    inDaily:
      "You might use Ni when you suddenly realize a relationship pattern, when you get a gut feeling about someone that proves true, or when you can envision exactly how a project will unfold.",
    color: "#6366f1",
    attitude: "Introverted",
    category: "Perceiving",
    developmentStages: [
      {
        stage: "Emerging (childhood)",
        description:
          "The child experiences Ni as vivid, sometimes unsettling premonitions, recurring dreams, and an uncanny sense that they know things before they happen. They may have imaginary scenarios that play out with eerie accuracy. The function is largely unconscious at this stage, the child cannot separate intuitive knowing from fantasy, and adults may dismiss their perceptions as an overactive imagination.",
      },
      {
        stage: "Developing (adolescence)",
        description:
          "The adolescent begins to trust these inner visions and starts deliberately focusing their perceptive lens. They develop the ability to hold a long-term goal in mind and work backward from it, and they start to recognize archetypal patterns in literature, history, and relationships. However, they may also become rigid in their convictions, confusing subjective certainty with objective truth, and can alienate peers who do not share their sense of foresight.",
      },
      {
        stage: "Mature (adulthood)",
        description:
          "The mature Ni user has learned to hold their visions lightly, with conviction but also with humility. They can articulate the patterns they perceive, test them against external feedback, and revise when necessary. They integrate sensory data (Se) to ground their visions in reality, and they serve as strategic counselors, long-range planners, and visionary leaders who translate archetypal insight into practical action.",
      },
    ],
    healthyExpression:
      "In its healthy form, Ni provides a calm, almost serene sense of direction and purpose. The individual perceives the trajectory of events with clarity, communicates their vision in ways others can understand, and remains open to revision when reality offers new data. Healthy Ni is the foundation of genuine wisdom, the ability to see through surface noise to the essential pattern beneath.",
    unhealthyExpression:
      "When pathological, Ni becomes paranoid certainty, an unshakable conviction that one's subjective vision is the only truth. The individual may become a conspiracy theorist or a cult leader, insisting that they alone can see the hidden pattern. They detach entirely from sensory reality, dismissing all concrete evidence that contradicts their inner narrative. Relationships suffer because the person cannot tolerate any perspective that challenges their singular vision.",
    archetypeExamples: [
      "The Prophet or Oracle",
      "The Hermit on the Mountain",
      "The Strategic Mastermind",
      "The Mystic or Seer",
      "The Long-Range Planner",
    ],
    shadowManifestation:
      "In the shadow, Ni manifests as paranoid pattern-seeking, seeing connections and conspiracies that do not exist. The person becomes obsessed with hidden meanings, projects sinister intent onto benign situations, and develops an oppressive sense of doom about the future. Unconscious Ni can also produce intrusive visions and nightmares that feel prophetic but are actually distortions of anxiety. The individual may become convinced of a terrible future that exists only in their unconscious projections.",
    bodyConnection:
      "Ni connects to the body through the gut, clinicians working with dominant-Ni types frequently note that these individuals describe their intuitive hits as visceral, localized sensations in the abdomen or solar plexus. There is often a characteristic stillness in the body when Ni is processing: the eyes may glaze or become unfocused, breathing slows, and the person appears to withdraw into an internal theater. Chronic tension in the stomach and difficulty staying embodied during intense intuitive episodes are common somatic correlates.",
  },
  {
    code: "Ne",
    name: "Extraverted Intuition",
    alias: "The Explorer",
    brief: "Sees connections, possibilities, and patterns across the external world.",
    description:
      "Extraverted Intuition (Ne) is a perceiving function that scans the external world for connections, possibilities, and novel interpretations. Where Ni converges, Ne diverges, it sees many potential paths and delights in brainstorming and exploring what could be. Ne users are quick to see patterns across disparate domains and are natural innovators. Jung described this as the function that perceives the potential and latent possibilities in objects and situations.",
    jungianDescription:
      "Jung described extraverted intuition as the function that perceives possibilities latent in the external object. Unlike extraverted sensing, which registers what an object is in the present moment, Ne perceives what an object might become, its unrealized potential, its hidden connections to other objects, and the web of possibilities radiating outward from any given situation. Jung noted that the extraverted intuitive is perpetually restless, moving from one possibility to the next without fully developing any of them, because the function is oriented not toward the thing itself but toward its potential. This type is the inventor, the entrepreneur, the creative visionary who senses the coming trend before it arrives. Jung observed that Ne sacrifices depth for breadth, the extraverted intuitive has an extraordinary ability to detect nascent possibilities in the environment, but may abandon each new discovery the moment it loses its novelty. The function operates through a kind of perceptual scanning, rapidly sampling the external landscape for anything that deviates from the expected, anything that hints at unrealized potential or novel configuration.",
    characteristics: [
      "Divergent thinking, generates many possibilities at once",
      "Sees connections between seemingly unrelated things",
      "Excited by novelty and what could be",
      "Rapid-fire brainstorming and ideation",
      "Comfortable with ambiguity and open-endedness",
    ],
    strengths: [
      "Creative ideation",
      "Adaptability",
      "Innovation",
      "Big-picture connections",
      "Enthusiasm for possibilities",
    ],
    blindSpots: [
      "May struggle with follow-through",
      "Can be scattered",
      "Risk of not committing to one path",
      "May overlook practical constraints",
    ],
    inDaily:
      "You might use Ne when brainstorming ideas for a project, when a casual observation sparks five new ideas, or when you naturally see how an idea from one field could revolutionize another.",
    color: "#f59e0b",
    attitude: "Extraverted",
    category: "Perceiving",
    developmentStages: [
      {
        stage: "Emerging (childhood)",
        description:
          "The child experiences Ne as an effervescent curiosity about everything, an endless series of 'what if' questions and imaginative leaps. They invent elaborate scenarios, make surprising analogies between unrelated things, and constantly ask questions that jump from topic to topic. At this stage the function can appear as hyperactivity or distractibility, and the child may frustrate adults who want linear, focused responses.",
      },
      {
        stage: "Developing (adolescence)",
        description:
          "The adolescent refines their ability to see connections across domains and begins channeling Ne into creative or intellectual projects, writing, debate, improvisation, or entrepreneurial ventures. They develop the capacity to sustain their explorations slightly longer before jumping to the next idea. However, they may struggle with academic structures that demand depth over breadth, and they can become anxious when forced to commit to a single path.",
      },
      {
        stage: "Mature (adulthood)",
        description:
          "The mature Ne user has learned to balance exploration with commitment. They can generate an abundance of possibilities and then work with their judging functions to evaluate and select the most promising ones. They become genuine innovators, not just idea generators but people who can communicate their visions to others and shepherd at least some of them to fruition. They retain their childlike wonder while developing the discipline to make ideas real.",
      },
    ],
    healthyExpression:
      "Healthy Ne is a fountain of creative energy that connects ideas across boundaries and sees opportunities where others see obstacles. The individual brainstorms generously, inspires others with enthusiasm, remains genuinely open-minded, and can translate their idea-generation into productive collaboration. They delight in learning and share that delight infectiously.",
    unhealthyExpression:
      "When pathological, Ne becomes a chaotic storm of half-formed ideas that never resolve into anything concrete. The individual cannot commit, cannot finish, and drowns in possibility. They may become manipulative, using their quick perception of others' potential to exploit rather than inspire. In extreme cases, the person lives in a perpetual state of anxious excitement, generating catastrophic 'what-if' scenarios that paralyze rather than energize, spinning from one fearful possibility to the next.",
    archetypeExamples: [
      "The Inventor or Innovator",
      "The Brainstormer",
      "The Renaissance Person",
      "The Trickster or Fool (in the Jungian sense)",
      "The Catalyst or Spark-Plug",
    ],
    shadowManifestation:
      "In the shadow, Ne manifests as catastrophic possibility-generation, the mind races through every possible negative outcome of a situation, seeing threats and dangers in benign events. The person becomes paranoid not about hidden patterns (as with shadow Ni) but about the sheer number of things that could go wrong. They may also project unrealistic potential onto people or situations, setting themselves up for inevitable disappointment when reality fails to match the fantasy.",
    bodyConnection:
      "Ne connects to the body through restless energy and peripheral awareness. Clinically, dominant-Ne types tend to fidget, gesture expansively while speaking, and have difficulty sitting still. Their eyes scan the environment actively, darting from point to point. When Ne is highly active, the person may feel a buzzing, electrical quality in the chest or head, an almost manic surge of mental energy. Somatic complaints often involve tension headaches, scattered attention that mimics ADHD symptomatology, and difficulty settling the nervous system into rest.",
  },
  {
    code: "Si",
    name: "Introverted Sensing",
    alias: "The Archivist",
    brief: "Stores and compares present sensory data with detailed internal records of past experience.",
    description:
      "Introverted Sensing (Si) is a perceiving function that internalizes sensory experience, creating detailed internal maps of past events, impressions, and bodily sensations. Si users don't just remember facts, they re-experience past sensory impressions with remarkable fidelity. This function values consistency, reliability, and learning from experience. Jung described it as the subjective component of sensation, how sense data is filtered through personal meaning.",
    jungianDescription:
      "In Psychological Types, Jung described introverted sensation as the function concerned not with the objective qualities of the sensed object but with the subjective sensation that the object evokes. Where extraverted sensation registers the intensity, quality, and texture of the external stimulus with faithful accuracy, introverted sensation overlays the stimulus with a dense subjective factor, the individual's accumulated sensory history, their bodily memory, and the psychic image that the object constellates. Jung used the example of an artist who paints not the landscape as it appears to the camera but the landscape as it resonates within the painter's subjective sensory world. This function produces an extraordinarily rich inner life of sensory impressions, tastes, textures, atmospheres, and somatic memories that persist long after the original stimulus has passed. Jung noted that the introverted sensing type may appear unremarkable on the surface, moving through the world without dramatic external engagement, yet they carry within them a vast interior archive of experience that gives them remarkable stability and depth of practical knowledge.",
    characteristics: [
      "Rich, detailed memory of past experiences",
      "Compares present to past for consistency and meaning",
      "Values tradition, routine, and proven methods",
      "Attentive to bodily sensations and internal states",
      "Learns through repetition and accumulated experience",
    ],
    strengths: [
      "Reliability",
      "Attention to detail",
      "Historical knowledge",
      "Practical wisdom",
      "Consistency",
    ],
    blindSpots: [
      "May resist change or new approaches",
      "Can over-rely on past experience",
      "Risk of nostalgia bias",
      "May struggle with unprecedented situations",
    ],
    inDaily:
      "You might use Si when you notice that a dish tastes slightly different from how you remember it, when you draw on past experience to navigate a familiar challenge, or when you maintain a detailed personal routine.",
    color: "#10b981",
    attitude: "Introverted",
    category: "Perceiving",
    developmentStages: [
      {
        stage: "Emerging (childhood)",
        description:
          "The child with emerging Si is highly attuned to comfort, familiarity, and routine. They notice immediately when something in their environment has changed, a rearranged room, a different brand of cereal, a new route to school. They may be picky eaters because they compare the present sensory experience to an internal standard. They find security in repetition and may request the same bedtime story hundreds of times, each reading reinforcing the internal sensory impression.",
      },
      {
        stage: "Developing (adolescence)",
        description:
          "The adolescent begins to consciously draw on their internal archive of experience to navigate new situations. They become the person who remembers exactly what happened last time and can warn others about potential pitfalls. They develop strong study habits based on repetition and review. However, they may become rigid in their attachment to routine and overly anxious when facing genuinely novel situations where past experience offers no guide.",
      },
      {
        stage: "Mature (adulthood)",
        description:
          "The mature Si user has developed a vast, nuanced internal library of experience that functions as genuine practical wisdom. They know which patterns are reliable and which are coincidental. They can draw on past experience without being enslaved by it, and they serve as institutional memory, the person who remembers how things were done and why certain approaches were adopted or abandoned. They integrate Ne to remain open to novelty when appropriate.",
      },
    ],
    healthyExpression:
      "Healthy Si provides a deep sense of groundedness, continuity, and practical competence. The individual draws on past experience to make wise decisions, maintains reliable routines that support wellbeing, honors meaningful traditions while remaining open to change when justified, and uses their detailed memory to care for others with remarkable attentiveness, remembering preferences, anniversaries, and the small details that make people feel seen.",
    unhealthyExpression:
      "When pathological, Si becomes a rigid prison of the past. The individual clings to routine compulsively, cannot tolerate any deviation from established patterns, and judges all present experiences against an idealized version of the past. They may develop hypochondriacal tendencies, amplifying every bodily sensation into a potential threat by comparing it to remembered experiences of illness. In extreme cases, the person retreats entirely into nostalgia, unable to engage with the present because it never matches the sanctified past.",
    archetypeExamples: [
      "The Keeper of Records",
      "The Traditionalist or Custodian",
      "The Master Craftsperson",
      "The Historian",
      "The Faithful Steward",
    ],
    shadowManifestation:
      "In the shadow, Si manifests as obsessive fixation on past negative experiences, the individual replays old wounds, grudges, and traumas with vivid sensory fidelity, re-experiencing them as if they were happening now. They may also project their past experiences onto present situations inappropriately, seeing betrayal or danger where none exists because it echoes a previous event. Shadow Si can produce psychosomatic symptoms, the body literally re-creating sensations from past injuries or illnesses as a way of expressing unprocessed emotional material.",
    bodyConnection:
      "Si has the most direct connection to the body of all eight functions. Dominant-Si types are often highly aware of their internal physiological state, hunger, fatigue, temperature, muscle tension, and digestive processes. They tend to have strong physical routines and can detect subtle changes in their body's functioning earlier than other types. Clinically, Si types may present with a heightened awareness of somatic sensation that can become hypochondriacal when the function is under stress. Their physical comfort strongly influences their cognitive and emotional state.",
  },
  {
    code: "Se",
    name: "Extraverted Sensing",
    alias: "The Experiencer",
    brief: "Engages directly with the present moment through acute sensory awareness.",
    description:
      "Extraverted Sensing (Se) is a perceiving function oriented toward direct, immediate experience of the physical world. Se users are highly attuned to their environment, they notice details, respond quickly to changes, and are drawn to sensory richness. This function is about being fully present and engaged with reality as it is right now. Jung described it as the objective component of sensation, experiencing the external world in its full sensory vividness.",
    jungianDescription:
      "Jung described extraverted sensation as the function most closely tethered to the concrete reality of the physical object. The extraverted sensing type experiences the world with extraordinary vividness and immediacy, they register every detail of the sensory environment with an accuracy that other types find almost uncanny. Jung wrote that for this type, no other function can rival the extraverted sensation in its realistic, matter-of-fact quality. The object is perceived not as a symbol, not as a carrier of hidden meaning, but as itself, in its full material presence. Jung observed that the healthy extraverted sensor is a realist par excellence, possessing a directness and vitality that keeps them grounded in the actual world. They are the connoisseurs, the athletes, the artisans whose relationship to physical reality is one of full engagement rather than detached observation. Jung noted the danger of this type lies in crude sensuality, when the function becomes one-sided, the individual may become a slave to sensation, pursuing ever more intense stimulation without reflection or restraint. But in its refined form, extraverted sensation produces an aesthetic appreciation of the physical world that is unmatched by any other function.",
    characteristics: [
      "Acute awareness of the physical environment",
      "Quick reflexes and responsiveness",
      "Drawn to sensory experiences, food, art, nature, action",
      "Lives in the present moment",
      "Practical and action-oriented",
    ],
    strengths: [
      "Presence",
      "Adaptability",
      "Physical awareness",
      "Quick reactions",
      "Aesthetic sense",
    ],
    blindSpots: [
      "May struggle with long-term planning",
      "Can be impulsive",
      "Risk of seeking overstimulation",
      "May dismiss abstract theory",
    ],
    inDaily:
      "You might use Se when you notice a subtle change in someone's expression, when you navigate a busy city street with ease, or when you're fully immersed in a physical activity or sensory experience.",
    color: "#ef4444",
    attitude: "Extraverted",
    category: "Perceiving",
    developmentStages: [
      {
        stage: "Emerging (childhood)",
        description:
          "The child with emerging Se is intensely physical, they learn by touching, tasting, climbing, and exploring. They are often the most active child in any group, drawn to movement, novelty in the physical environment, and hands-on play. They may struggle with sitting still in classrooms and prefer learning through direct experience rather than abstract instruction. Their senses are razor-sharp, and they may be unusually responsive to textures, colors, and sounds.",
      },
      {
        stage: "Developing (adolescence)",
        description:
          "The adolescent channels Se into sports, performance, fashion, social presence, or hands-on skills. They develop a keen aesthetic sense and a talent for reading physical environments and social atmospheres. They become adept at improvisation and thinking on their feet. However, they may gravitate toward risk-taking and sensation-seeking behavior, and they can struggle with academic work that is abstract or requires sustained, non-physical attention.",
      },
      {
        stage: "Mature (adulthood)",
        description:
          "The mature Se user combines their extraordinary sensory acuity with the wisdom of experience. They become masterful at reading situations in real time, responding to crises with calm effectiveness, and creating aesthetically rich environments. They have learned to balance their appetite for stimulation with periods of reflection and can channel their physical energy into disciplined pursuits. They serve as first responders, performers, artisans, and leaders who thrive in dynamic, fast-moving environments.",
      },
    ],
    healthyExpression:
      "Healthy Se manifests as vibrant, grounded presence, the individual is fully alive in the moment, responsive to their environment, and engaged with physical reality in a way that is both joyful and disciplined. They notice what is actually happening rather than what might happen or what happened before. They are adaptable, quick-thinking, and possess an aesthetic sensitivity that allows them to create beauty in their immediate surroundings.",
    unhealthyExpression:
      "When pathological, Se becomes hedonistic compulsion, an insatiable pursuit of sensory stimulation that overrides all other considerations. The individual may develop addictive behaviors related to food, substances, shopping, sex, or adrenaline. They become unable to tolerate boredom, unable to sit with quiet inner experience, and may use constant external stimulation as a defense against uncomfortable emotions. In extreme cases, they become exploitative, treating people and situations as sources of stimulation to be consumed and discarded.",
    archetypeExamples: [
      "The Warrior or Athlete",
      "The Artisan or Craftsperson",
      "The Performer",
      "The First Responder",
      "The Aesthete or Connoisseur",
    ],
    shadowManifestation:
      "In the shadow, Se manifests as being overwhelmed by sensory reality, the individual who normally lives in their head is suddenly swamped by the physical world. This can produce impulsive, reckless behavior (binge eating, excessive spending, sexual acting-out) or conversely, a phobic avoidance of sensory intensity. Shadow Se can also appear as clumsiness, spatial disorientation, or a sudden obsession with physical appearance and material possessions that is uncharacteristic of the person's usual mode of being.",
    bodyConnection:
      "Se has the most outwardly oriented body connection, dominant-Se types inhabit their bodies with ease and fluidity. They tend to have excellent proprioception, quick reflexes, and a natural kinesthetic intelligence. Their physical engagement with the world is immediate and confident. Clinically, when Se is stressed or suppressed, somatic symptoms tend to involve restlessness, a crawling-out-of-skin feeling, or conversely, a flatness and numbness where the person feels disconnected from all sensory input. Physical activity is often the most effective stress management tool for Se types.",
  },
  {
    code: "Ti",
    name: "Introverted Thinking",
    alias: "The Analyst",
    brief: "Builds precise internal logical frameworks and analyzes for consistency.",
    description:
      "Introverted Thinking (Ti) is a judging function that seeks to build precise, internally consistent logical frameworks. Ti users analyze ideas by breaking them down into components and examining how they fit together. This function values accuracy, clarity, and understanding over external standards or consensus. Jung described it as thinking oriented by the subjective factor, meaning that the individual's own logical framework takes priority over external authorities.",
    jungianDescription:
      "In Psychological Types, Jung described introverted thinking as a function oriented primarily by the subjective factor, by the individual's own internal logical principles rather than by external facts or consensus. Where extraverted thinking asks 'what do the data show?', introverted thinking asks 'what must be true for this to be internally consistent?' Jung noted that the introverted thinker creates ideas not primarily from external data but from within, the thinker develops a subjective idea that may have been stimulated by external observation but follows its own internal developmental logic. The function seeks to deepen understanding rather than to widen it. Jung observed that introverted thinking can produce systems of extraordinary logical beauty and precision, but systems that may have little connection to empirical reality if not balanced by perceiving functions. He described the introverted thinker as someone who may appear cold and unapproachable, lost in abstract thought, yet possessing a depth of understanding that more practically oriented types cannot match. The danger lies in becoming so absorbed in one's own logical system that external reality and human relationships become irrelevant.",
    characteristics: [
      "Builds precise internal models and frameworks",
      "Values logical consistency above all",
      "Seeks to understand the 'why' behind everything",
      "Independent thinker, not swayed by consensus",
      "Precise and nuanced in language and thought",
    ],
    strengths: [
      "Analytical precision",
      "Independent reasoning",
      "Troubleshooting",
      "Systematic thinking",
      "Logical clarity",
    ],
    blindSpots: [
      "May over-analyze or get lost in frameworks",
      "Can dismiss emotional considerations",
      "Risk of being overly critical",
      "May struggle to communicate complex ideas simply",
    ],
    inDaily:
      "You might use Ti when you debug a logical error in code, when you question the underlying assumptions of a popular belief, or when you spend hours perfecting a system until it makes complete internal sense.",
    color: "#0ea5e9",
    attitude: "Introverted",
    category: "Judging",
    developmentStages: [
      {
        stage: "Emerging (childhood)",
        description:
          "The child with emerging Ti is the one who constantly asks 'why?' and is unsatisfied with surface-level answers. They take things apart to understand how they work, question rules that seem arbitrary, and develop surprisingly sophisticated logical reasoning at a young age. They may frustrate teachers who expect compliance rather than comprehension, and they often prefer to figure things out independently rather than accept instruction.",
      },
      {
        stage: "Developing (adolescence)",
        description:
          "The adolescent begins constructing elaborate internal frameworks for understanding the world, philosophical systems, scientific theories, or analytical methods. They develop the ability to hold complex logical structures in mind and test them for consistency. They become skilled debaters who can dismantle arguments with precision. However, they may become intellectually arrogant, dismissive of less rigorous thinkers, and socially isolated due to their preference for ideas over people.",
      },
      {
        stage: "Mature (adulthood)",
        description:
          "The mature Ti user has refined their analytical frameworks through decades of testing against reality. They can think with extraordinary precision while remaining humble about the limits of their models. They have learned to communicate complex ideas in accessible ways and to value emotional and social intelligence alongside logical rigor. They serve as incisive analysts, diagnostic experts, and theoretical architects whose internal models illuminate rather than obscure reality.",
      },
    ],
    healthyExpression:
      "Healthy Ti produces clarity of thought that cuts through confusion and reveals the essential logic of a situation. The individual thinks independently but not dogmatically, questions assumptions without becoming nihilistic, and builds models that genuinely illuminate how things work. They communicate their understanding with precision and patience, and they remain genuinely curious, always willing to revise their frameworks when logic demands it.",
    unhealthyExpression:
      "When pathological, Ti becomes a hermetically sealed logical system that admits no external input. The individual retreats into increasingly abstract, internally consistent frameworks that have no connection to reality or human experience. They use logic as a weapon to dismantle others' ideas while protecting their own from scrutiny. They become paralyzed by analysis, unable to act because no option satisfies their impossibly exacting logical standards. In extreme cases, they develop a contempt for emotion, for practical concerns, and for anyone who cannot follow their reasoning.",
    archetypeExamples: [
      "The Philosopher",
      "The Systems Architect",
      "The Diagnostician",
      "The Independent Scholar",
      "The Logician or Puzzle-Solver",
    ],
    shadowManifestation:
      "In the shadow, Ti manifests as obsessive logical nitpicking, finding logical flaws in everything while producing nothing constructive. The person uses cold analysis as a defense against emotional vulnerability, dissecting their own feelings and others' intentions with a scalpel that destroys rather than heals. Shadow Ti can also appear as conspiracy-minded reasoning, building elaborate but unfounded logical structures to explain events in threatening ways, mistaking internal consistency for truth.",
    bodyConnection:
      "Ti connects to the body primarily through the head, dominant-Ti types often report that their thinking feels localized in the skull, and they may experience tension headaches when engaged in prolonged analysis. There is typically a characteristic stillness and economy of movement, as physical resources are redirected toward cognitive processing. Clinically, Ti types may neglect bodily signals (hunger, fatigue, pain) when absorbed in analysis. They often benefit from physical practices that connect the thinking mind to the sensing body, as this integration does not come naturally.",
  },
  {
    code: "Te",
    name: "Extraverted Thinking",
    alias: "The Director",
    brief: "Organizes the external world through logic, efficiency, and measurable results.",
    description:
      "Extraverted Thinking (Te) is a judging function that organizes the external world according to logical principles, efficiency, and measurable results. Te users think in terms of systems, processes, and outcomes. They value what works, what can be proven, and what produces tangible results. Jung described this as thinking oriented by the objective factor, meaning external data, evidence, and empirical standards guide the thinking process.",
    jungianDescription:
      "Jung described extraverted thinking as the function oriented by the objective conditions found in external data. Unlike introverted thinking, which follows the subjective thread of its own internal logic, extraverted thinking subordinates itself to the evidence, to empirical facts, and to objective intellectual standards. Jung noted that the extraverted thinker formulates principles that are derived from and can be verified by external reality. This type creates systems, establishes procedures, and organizes information according to impersonal logical criteria. Jung observed that extraverted thinking naturally tends toward the formulation of rules, laws, and general principles that apply universally, it seeks not personal understanding but objective truth as established by measurable criteria. The danger Jung identified was that extraverted thinking, when one-sided, can become tyrannically formulaic, reducing all of reality to what can be measured and organized, suppressing everything subjective, personal, or emotionally nuanced. The extraverted thinker at their worst becomes a rigid systematizer who forces human experience into logical categories that cannot contain it. At their best, however, they are reformers and organizers who bring order from chaos and translate ideas into effective action.",
    characteristics: [
      "Organizes systems for maximum efficiency",
      "Values empirical evidence and measurable outcomes",
      "Decisive and action-oriented in problem-solving",
      "Thinks in terms of goals, plans, and timelines",
      "Structures the external environment logically",
    ],
    strengths: [
      "Efficiency",
      "Organization",
      "Goal-achievement",
      "Empirical thinking",
      "Decisive leadership",
    ],
    blindSpots: [
      "May overlook subjective and emotional factors",
      "Can be blunt or dismissive",
      "Risk of valuing productivity over people",
      "May struggle with ambiguity",
    ],
    inDaily:
      "You might use Te when you organize a project timeline, when you evaluate competing options based on evidence, or when you streamline a process to eliminate wasted steps.",
    color: "#8b5cf6",
    attitude: "Extraverted",
    category: "Judging",
    developmentStages: [
      {
        stage: "Emerging (childhood)",
        description:
          "The child with emerging Te naturally organizes their toys, creates rules for games, and may try to direct other children's play. They respond well to clear instructions, reward systems, and measurable goals. They tend to ask practical questions, not 'why' but 'how does it work?' and 'what does it do?' They may appear bossy to peers and may become frustrated when others do not follow logical procedures.",
      },
      {
        stage: "Developing (adolescence)",
        description:
          "The adolescent develops the ability to plan and execute complex projects, manage time effectively, and evaluate options based on evidence. They excel in structured academic environments and may take on leadership roles in school organizations. They begin to develop a working knowledge of how systems and institutions operate. However, they can become overly focused on grades, rankings, and measurable achievements at the expense of deeper learning and emotional development.",
      },
      {
        stage: "Mature (adulthood)",
        description:
          "The mature Te user combines their organizational prowess with wisdom about when efficiency is appropriate and when it is not. They can build and manage complex systems while remaining attentive to the human beings within those systems. They have learned that not everything worth knowing can be measured, and they balance their drive for results with patience for process. They serve as effective executives, administrators, and leaders who translate vision into reality.",
      },
    ],
    healthyExpression:
      "Healthy Te brings order, clarity, and effectiveness to whatever it touches. The individual organizes information and resources efficiently, communicates clearly and directly, makes decisions based on evidence, and follows through on commitments. They empower others by creating clear structures and expectations, and they achieve results without steamrolling over people's needs and feelings.",
    unhealthyExpression:
      "When pathological, Te becomes a steamroller of control, the individual demands compliance with their systems, measures everything, and dismisses anything that cannot be quantified. They become tyrannical managers who treat people as interchangeable units of productivity. They may develop a compulsive need to organize and optimize that extends into areas of life that do not benefit from it (relationships, creative pursuits, leisure). In extreme cases, they become cold authoritarians who sacrifice all human values on the altar of efficiency.",
    archetypeExamples: [
      "The Executive or Administrator",
      "The Field Marshal",
      "The Engineer",
      "The Project Manager",
      "The Reformer or Organizer",
    ],
    shadowManifestation:
      "In the shadow, Te manifests as harsh, punitive criticism, the individual who normally leads with feeling or intuition suddenly becomes brutally efficient in their judgments, dismissing others' work as incompetent and demanding adherence to standards they would not normally impose. Shadow Te can also appear as a compulsive need to control the external environment when the inner world feels chaotic, organizing, list-making, and micromanaging as a defense against emotional overwhelm. The person may also become obsessed with credentials, rankings, and external markers of competence.",
    bodyConnection:
      "Te connects to the body through action and posture, dominant-Te types tend to carry themselves with deliberate, purposeful movement. Their physical presence often communicates authority and competence. They tend to treat the body instrumentally, as a tool to be maintained for optimal performance rather than as a source of pleasure or subjective experience. Under stress, Te types may develop tension in the jaw, shoulders, and back from the constant effort of maintaining control. They benefit from physical activities that are goal-oriented and measurable, and they often use fitness metrics and performance tracking.",
  },
  {
    code: "Fi",
    name: "Introverted Feeling",
    alias: "The Authenticator",
    brief: "Evaluates through a deep internal value system and sense of personal authenticity.",
    description:
      "Introverted Feeling (Fi) is a judging function that evaluates experiences through a deeply held internal value system. Fi users have a rich inner emotional landscape and a strong sense of what feels authentic versus inauthentic. This function is about personal integrity, staying true to one's values regardless of social pressure. Jung described it as feeling oriented by the subjective factor, an inner depth that may be invisible on the surface.",
    jungianDescription:
      "In Psychological Types, Jung described introverted feeling as perhaps the most difficult function to portray because it is by nature silent, withdrawn, and hidden behind a deceptive exterior. Jung wrote that introverted feeling is continually seeking an image that has no existence in reality, but which it has seen in a kind of vision. The function orients itself by the subjective factor, by an internal hierarchy of values so deep and so personal that the individual may struggle to articulate it. Jung noted that introverted feeling does not gush or effuse; outwardly, it often appears cold, reserved, even indifferent. But beneath this surface, there exists a depth of feeling intensity that is unmatched by extraverted feeling. Jung compared it to still waters that run deep, the emotion is there, but it flows inward rather than outward. He observed that introverted feeling types often exert a quiet, powerful influence on those around them, not through emotional expression but through the sheer force of their inner conviction. The danger is that the function, turned entirely inward, may become incomprehensible to others and may sink into a kind of mystical depth that loses all connection to shared human reality.",
    characteristics: [
      "Deep internal value system that guides decisions",
      "Strong sense of personal authenticity",
      "Rich inner emotional world",
      "Values individuality and personal meaning",
      "Sensitive to moral and ethical nuances",
    ],
    strengths: [
      "Authenticity",
      "Empathy",
      "Moral clarity",
      "Emotional depth",
      "Compassion",
    ],
    blindSpots: [
      "May struggle to articulate feelings",
      "Can be overly subjective",
      "Risk of moral rigidity",
      "May withdraw when values are challenged",
    ],
    inDaily:
      "You might use Fi when you feel deeply moved by a piece of art, when you refuse to compromise on a core value, or when you sense that something is 'off' about a situation based on your moral compass.",
    color: "#ec4899",
    attitude: "Introverted",
    category: "Judging",
    developmentStages: [
      {
        stage: "Emerging (childhood)",
        description:
          "The child with emerging Fi has intense emotional reactions that they may not be able to explain. They develop strong likes and dislikes early, have a powerful sense of fairness, and can be deeply hurt by perceived injustice or inauthenticity. They may cry easily but cannot articulate why, may attach deeply to certain objects or animals that carry symbolic emotional significance, and may become stubborn when asked to do something that violates their nascent sense of values.",
      },
      {
        stage: "Developing (adolescence)",
        description:
          "The adolescent begins to consciously articulate their value system and to shape their identity around it. They become passionate about causes, develop strong aesthetic preferences, and may express themselves through art, music, writing, or fashion. They are acutely sensitive to hypocrisy and may clash with authority figures who do not practice what they preach. However, they can become rigid in their values, judgmental of those who do not share them, and may retreat into isolation when the world feels inauthentic.",
      },
      {
        stage: "Mature (adulthood)",
        description:
          "The mature Fi user has a deeply integrated value system that guides their decisions with quiet authority. They understand that their values are personal rather than universal and can hold firm convictions while respecting others' right to different values. They have developed the ability to articulate their inner world, through conversation, creative expression, or compassionate action, and they serve as moral anchors in their communities, embodying integrity without self-righteousness.",
      },
    ],
    healthyExpression:
      "Healthy Fi is the bedrock of personal integrity. The individual has a clear, deeply felt sense of right and wrong that guides their choices with quiet certainty. They are capable of extraordinary compassion because their empathy is rooted in genuine emotional depth rather than social performance. They express their values through consistent action, maintain authenticity under pressure, and extend to others the same respect for individuality that they claim for themselves.",
    unhealthyExpression:
      "When pathological, Fi becomes self-righteous martyrdom, the individual elevates their personal feelings to the status of moral law and demands that the world conform to their internal value system. They may become chronically offended, hypersensitive to any perceived slight, and unable to distinguish between genuine ethical violations and personal preferences. They withdraw into a fortress of subjective feeling, dismissing anyone who disagrees as morally inferior. In extreme cases, they become passive-aggressive, punishing others through silence and withdrawal while insisting they are the victim.",
    archetypeExamples: [
      "The Healer or Wounded Healer",
      "The Idealist",
      "The Poet or Lyricist",
      "The Conscience or Moral Compass",
      "The Quiet Rebel",
    ],
    shadowManifestation:
      "In the shadow, Fi manifests as sudden, overwhelming waves of subjective emotion that the individual cannot understand or control. A person who normally operates through thinking or external feeling may be ambushed by intense personal feelings, jealousy, resentment, shame, or possessive love, that seem to come from nowhere. Shadow Fi can also appear as moral outrage that is disproportionate to the situation, or as a sudden, rigid attachment to a personal value that the individual did not previously know they held. The person may find themselves making irrational decisions based on feelings they cannot articulate.",
    bodyConnection:
      "Fi connects to the body through the heart space and the chest. Dominant-Fi types frequently describe their emotional experiences in cardiovascular terms, heartache, heart-swelling, chest tightness during moral distress. They are often highly attuned to the emotional atmosphere of a space through subtle bodily cues. Clinically, Fi types may hold emotion in the chest, throat, and eyes (the urge to cry). They can develop psychosomatic symptoms when they suppress their values for too long, a sense of internal suffocation or tightness that reflects the felt experience of inauthenticity.",
  },
  {
    code: "Fe",
    name: "Extraverted Feeling",
    alias: "The Harmonizer",
    brief: "Creates harmony and connection by attuning to the emotional needs of others.",
    description:
      "Extraverted Feeling (Fe) is a judging function that makes decisions based on the values, needs, and emotions of the group. Fe users are naturally attuned to social dynamics and work to create harmony, connection, and shared understanding. This function prioritizes collective wellbeing and shared values. Jung described it as feeling oriented by the objective factor, harmonizing with the collective mood and social expectations.",
    jungianDescription:
      "Jung described extraverted feeling as the function most closely adapted to objective social reality. It evaluates situations not by personal, subjective criteria but by collective values, what is appropriate, fitting, and socially harmonious. Jung noted that extraverted feeling adjusts itself to objective standards, to the values generally accepted in the surrounding community. This type possesses a remarkable ability to read and influence the emotional atmosphere of a group, and their feeling judgments tend toward what will create or maintain social harmony. Jung observed that extraverted feeling types are the social glue of civilization, the people who maintain customs, facilitate connection, and ensure that collective emotional life functions smoothly. The danger Jung identified is that extraverted feeling, when one-sided, may lose all personal authenticity, the individual becomes so attuned to what others feel and expect that they have no independent emotional life of their own. They may follow the conventional values of their social milieu without questioning them, and they may become manipulative when their desire for harmony encounters resistance. At their best, however, extraverted feeling types create environments where people feel genuinely seen, valued, and connected.",
    characteristics: [
      "Attuned to others' emotions and social atmosphere",
      "Creates harmony and group cohesion",
      "Values shared values and collective wellbeing",
      "Expressive and emotionally responsive",
      "Natural mediator and social connector",
    ],
    strengths: [
      "Social intelligence",
      "Diplomacy",
      "Empathic connection",
      "Community building",
      "Emotional expressiveness",
    ],
    blindSpots: [
      "May lose sight of personal values in favor of group harmony",
      "Can be people-pleasing",
      "Risk of emotional manipulation",
      "May struggle with internal emotional clarity",
    ],
    inDaily:
      "You might use Fe when you instinctively adjust the mood of a group, when you mediate a conflict by understanding everyone's perspective, or when you express emotions openly to connect with others.",
    color: "#f43f5e",
    attitude: "Extraverted",
    category: "Judging",
    developmentStages: [
      {
        stage: "Emerging (childhood)",
        description:
          "The child with emerging Fe is acutely sensitive to the emotional atmosphere in their environment. They notice when a parent is upset before any words are spoken, they try to cheer up sad peers, and they may modify their own behavior to maintain harmony. They are often described as 'emotionally precocious' and may take on the role of peacemaker in the family. At this stage, the function is largely reactive, the child absorbs and reflects the emotions around them without being able to differentiate their own feelings from others'.",
      },
      {
        stage: "Developing (adolescence)",
        description:
          "The adolescent begins to actively shape the social environment rather than merely responding to it. They develop social leadership skills, learn to mediate conflicts, and become adept at reading group dynamics. They may become the center of their social circle, creating events, facilitating introductions, and maintaining connections. However, they can become overly dependent on social approval, may suppress their own needs to maintain harmony, and may develop manipulative tendencies, using their emotional intelligence to control rather than connect.",
      },
      {
        stage: "Mature (adulthood)",
        description:
          "The mature Fe user has learned to create genuine harmony rather than superficial pleasantness. They can hold space for conflict when it is necessary for growth, set boundaries while maintaining connection, and distinguish between their own emotions and those they absorb from others. They serve as counselors, mediators, community leaders, and cultural custodians who maintain the emotional fabric of their relationships and institutions with both warmth and wisdom.",
      },
    ],
    healthyExpression:
      "Healthy Fe creates environments where people feel genuinely welcome, understood, and valued. The individual reads emotional atmospheres with accuracy, responds with appropriate warmth and empathy, and facilitates connection without losing their own center. They can express their own emotions authentically while remaining attuned to others, and they serve as bridges between people, creating understanding where there was isolation.",
    unhealthyExpression:
      "When pathological, Fe becomes emotional manipulation and codependency. The individual reads others' emotions not to connect but to control, using guilt, shame, and emotional pressure to maintain the social dynamics they prefer. They may become a martyr who sacrifices everything for others and then weaponizes that sacrifice. They may lose all sense of personal identity, existing only as a mirror of others' expectations. In extreme cases, they become emotionally abusive, creating dependency and then controlling through the threat of withdrawal.",
    archetypeExamples: [
      "The Counselor or Therapist",
      "The Hostess or Social Director",
      "The Diplomat or Ambassador",
      "The Caregiver",
      "The Community Elder",
    ],
    shadowManifestation:
      "In the shadow, Fe manifests as emotional outbursts that are designed to control the social environment, guilt-tripping, public shaming, or theatrical displays of emotion that serve to manipulate rather than connect. A person who normally operates through thinking may suddenly erupt with raw, unprocessed emotional demands for harmony or approval. Shadow Fe can also appear as obsessive concern with what others think, social paranoia about being judged or excluded, and an unconscious tendency to merge with others' emotional states in ways that obliterate personal boundaries.",
    bodyConnection:
      "Fe connects to the body through the face and the social surface of the body. Dominant-Fe types are often highly expressive, their faces, voices, and gestures communicate emotion fluently and continuously. They tend to be physically oriented toward others, maintaining eye contact, leaning in, and using touch to establish connection. Clinically, Fe types may hold stress in the face (jaw clenching, forced smiling) and in the muscles of social presentation. They may develop tension in the throat from suppressing their own feelings in service of group harmony. Physical wellbeing is strongly influenced by the quality of their social connections.",
  },
];

// ── Jungian Types (16 cognitive type codes) ──────────────────────────────────

export const mbtiTypes: MBTIType[] = [
  {
    code: "INTJ",
    name: "The Architect",
    brief: "Strategic, independent, and determined visionaries who see the big picture.",
    stack: ["Ni", "Te", "Fi", "Se"],
    fullStack: ["Ni", "Te", "Fi", "Se", "Ne", "Ti", "Fe", "Si"],
    description:
      "INTJs lead with Introverted Intuition (Ni), giving them a powerful ability to see patterns and envision future possibilities. Supported by Extraverted Thinking (Te), they execute their visions with logical precision and efficiency. Their tertiary Fi gives them a quiet depth of personal values, while inferior Se can make them less attuned to immediate sensory experience.",
    cognitiveWiring:
      "The INTJ mind operates as a strategic engine running perpetually beneath the surface. Dominant Ni works unconsciously, synthesizing vast amounts of information into singular, convergent visions of how things will unfold. This process is largely pre-verbal, INTJs often know where something is heading long before they can articulate why. Auxiliary Te then translates these internal visions into actionable plans, timelines, and organized systems. The INTJ is constantly asking two questions simultaneously: 'What is actually going to happen?' (Ni) and 'What is the most efficient path to get there?' (Te). Tertiary Fi provides a quiet but powerful moral compass that develops more fully in the second half of life, INTJs care more deeply about personal values than their strategic exterior suggests. Inferior Se is the function they most struggle with: the raw, immediate, sensory present. Under extreme stress, they may become uncharacteristically impulsive or overindulgent in physical pleasures. The INTJ's greatest cognitive strength is the ability to see the long-term implications of present actions with unusual clarity. Their greatest vulnerability is the assumption that their internal model of reality is reality itself.",
    strengths: [
      "Strategic planning",
      "Independent thinking",
      "Long-term vision",
      "Systematic execution",
      "Intellectual depth",
    ],
    growthAreas: [
      "Connecting with present-moment experience",
      "Expressing emotions openly",
      "Being flexible when plans change",
      "Patience with less efficient approaches",
    ],
    famousExamples: ["Nikola Tesla", "Michelle Obama", "Elon Musk"],
    journalPrompts: [
      "What vision am I working toward, and is it still aligned with my values?",
      "How can I be more present in my physical experience today?",
      "When did I last share my inner world with someone I trust?",
    ],
    color: "#6366f1",
    loopPattern: {
      functions: ["Ni", "Fi"],
      description:
        "In a Ni-Fi loop, the INTJ bypasses Te and becomes trapped in an internal cycle of subjective vision and personal values. They develop elaborate internal narratives about what will happen (Ni) and how they feel about it (Fi) without testing any of it against external reality. This can manifest as paranoid withdrawal, the INTJ becomes convinced of a negative future outcome, feels deeply upset about it, and retreats further inward rather than taking practical action or seeking external feedback.",
    },
    gripDescription:
      "Under extreme or prolonged stress, the INTJ falls into the grip of inferior Se. This manifests as uncharacteristic overindulgence in sensory experience, binge eating, excessive drinking, compulsive exercise, reckless driving, or impulsive spending. The normally controlled, future-oriented INTJ becomes fixated on immediate physical sensation, often in ways that are self-destructive. They may also become hypersensitive to their physical environment, obsessing over minor discomforts, becoming overwhelmed by noise or mess, or experiencing the physical world as oppressively, inescapably present.",
    commonMistypes: ["INFJ", "ISTJ", "INTP", "ENTJ"],
    interactionStyle: "Chart the Course",
    temperament: "NT Rational",
  },
  {
    code: "INTP",
    name: "The Logician",
    brief: "Innovative, curious thinkers driven by logical analysis and theoretical frameworks.",
    stack: ["Ti", "Ne", "Si", "Fe"],
    fullStack: ["Ti", "Ne", "Si", "Fe", "Te", "Ni", "Se", "Fi"],
    description:
      "INTPs lead with Introverted Thinking (Ti), creating precise internal logical frameworks. Supported by Extraverted Intuition (Ne), they explore vast intellectual landscapes and see novel connections. Their tertiary Si provides accumulated knowledge, while inferior Fe can make navigating social-emotional terrain challenging.",
    cognitiveWiring:
      "The INTP mind is a laboratory of ideas, perpetually constructing, testing, and refining internal models of how things work. Dominant Ti creates the skeleton, a rigorous logical framework that demands internal consistency above all else. Auxiliary Ne provides the raw material, scanning the external world for novel data points, unexpected connections, and interesting anomalies that challenge or expand the framework. The INTP's characteristic mode of thought is iterative: Ne brings in a new idea, Ti analyzes it for logical consistency, Ne generates implications and connections, Ti refines the model. This cycle can continue indefinitely, which is why INTPs are notorious for thinking without acting. Tertiary Si develops over time as a stabilizing archive, the accumulated data from past analyses that provides continuity and depth to the INTP's intellectual life. Inferior Fe is their Achilles' heel: the world of social expectations, emotional expression, and interpersonal harmony feels like a foreign language. Under stress, it erupts as awkward emotional outbursts or an overwhelming desire to be liked. The INTP's greatest gift is the ability to see the logical structure beneath surface complexity. Their greatest liability is the temptation to mistake the elegance of a theory for its truth.",
    strengths: [
      "Analytical precision",
      "Creative problem-solving",
      "Theoretical innovation",
      "Independent thought",
      "Intellectual curiosity",
    ],
    growthAreas: [
      "Emotional expression and social connection",
      "Following through on ideas",
      "Practical application of theories",
      "Being decisive under pressure",
    ],
    famousExamples: ["Albert Einstein", "Marie Curie", "Bill Gates"],
    journalPrompts: [
      "What idea have I been developing, and how might I share it with others?",
      "How can I connect more with the people around me today?",
      "What practical step can I take to bring a theory to life?",
    ],
    color: "#0ea5e9",
    loopPattern: {
      functions: ["Ti", "Si"],
      description:
        "In a Ti-Si loop, the INTP bypasses Ne and becomes trapped reviewing past data through an increasingly rigid logical framework. Instead of exploring new ideas and possibilities, they obsessively re-analyze old information, seeking logical closure that never arrives. This can manifest as intellectual paralysis, the INTP knows everything that has happened and can analyze it to exhaustion, but cannot generate new approaches or move forward. They become narrow, repetitive, and stuck.",
    },
    gripDescription:
      "Under extreme stress, the INTP falls into the grip of inferior Fe. This manifests as uncharacteristic emotional displays, they may become tearful, needy, or desperate for social approval. They may obsess over whether people like them, interpret neutral social interactions as personal rejection, and lash out emotionally in ways that shock both themselves and others. The normally detached, logical INTP becomes hypersensitive to perceived social slights and may attempt to create harmony through clumsy, heavy-handed emotional gestures.",
    commonMistypes: ["INTJ", "ISTP", "ENTP", "INFP"],
    interactionStyle: "Behind the Scenes",
    temperament: "NT Rational",
  },
  {
    code: "ENTJ",
    name: "The Commander",
    brief: "Bold, strategic leaders who organize people and resources toward ambitious goals.",
    stack: ["Te", "Ni", "Se", "Fi"],
    fullStack: ["Te", "Ni", "Se", "Fi", "Ti", "Ne", "Si", "Fe"],
    description:
      "ENTJs lead with Extraverted Thinking (Te), naturally organizing the external world for maximum efficiency. Supported by Introverted Intuition (Ni), they have a clear strategic vision. Their tertiary Se keeps them grounded in reality, while inferior Fi can make accessing deep personal emotions challenging.",
    cognitiveWiring:
      "The ENTJ mind is a command center designed for strategic execution. Dominant Te surveys the external landscape and immediately begins organizing it, identifying inefficiencies, establishing hierarchies, and creating systems to achieve objectives. Auxiliary Ni provides the strategic depth, generating a clear vision of where things need to go and an almost uncanny sense of which moves will prove decisive. Together, Te-Ni creates a leader who not only sees the endgame but knows exactly how to marshal resources to get there. This combination makes ENTJs formidable in competitive and organizational contexts. Tertiary Se develops as a valuable tactical awareness, the ability to read the room, respond to changing conditions in real time, and appreciate the concrete realities of the present situation. Inferior Fi is the function that humbles them: the world of deep personal feeling, individual values, and emotional vulnerability feels alien and threatening. ENTJs may go decades without examining what they truly feel or what they personally value as opposed to what they can achieve. Under stress, Fi erupts as hypersensitivity to criticism, a crushing sense of personal worthlessness, or an overwhelming feeling of being unloved. The ENTJ's growth journey involves learning that effectiveness without authenticity is hollow.",
    strengths: [
      "Strategic leadership",
      "Efficient execution",
      "Goal orientation",
      "Confident decision-making",
      "Organizational skill",
    ],
    growthAreas: [
      "Sensitivity to others' feelings",
      "Patience with slower processes",
      "Accessing personal emotions",
      "Flexibility in approach",
    ],
    famousExamples: ["Steve Jobs", "Margaret Thatcher", "Julius Caesar"],
    journalPrompts: [
      "Am I leading with efficiency at the expense of empathy?",
      "What personal value have I neglected in pursuit of my goals?",
      "How can I create space for others to contribute their vision?",
    ],
    color: "#8b5cf6",
    loopPattern: {
      functions: ["Te", "Se"],
      description:
        "In a Te-Se loop, the ENTJ bypasses Ni and becomes trapped in a cycle of external action without strategic direction. They become obsessively busy, controlling, organizing, and optimizing at a tactical level without any guiding vision. They may micromanage, pursue short-term wins that undermine long-term goals, and become tyrannically focused on immediate measurable results. The loop looks like workaholism without purpose, constant doing that avoids the deeper question of where it is all heading.",
    },
    gripDescription:
      "Under extreme stress, the ENTJ falls into the grip of inferior Fi. This is one of the most dramatic grip experiences of any type. The normally decisive, commanding ENTJ becomes paralyzed by overwhelming personal emotion, they may feel profoundly unloved, unappreciated, or worthless. They may interpret others' actions as deeply personal betrayals. They may withdraw from their leadership roles entirely, consumed by feelings they have no framework for processing. In some cases, the grip manifests as a hypersensitivity to perceived moral transgressions that leads to explosive, self-righteous confrontations.",
    commonMistypes: ["ESTJ", "INTJ", "ENTP", "ENFJ"],
    interactionStyle: "In Charge",
    temperament: "NT Rational",
  },
  {
    code: "ENTP",
    name: "The Debater",
    brief: "Quick-witted innovators who love intellectual challenges and creative problem-solving.",
    stack: ["Ne", "Ti", "Fe", "Si"],
    fullStack: ["Ne", "Ti", "Fe", "Si", "Ni", "Te", "Fi", "Se"],
    description:
      "ENTPs lead with Extraverted Intuition (Ne), constantly scanning for new possibilities and connections. Supported by Introverted Thinking (Ti), they analyze ideas with logical precision. Their tertiary Fe gives them social charm, while inferior Si can make routine and detailed follow-through difficult.",
    cognitiveWiring:
      "The ENTP mind is a perpetual brainstorm, a rapid-fire generator of possibilities that are immediately subjected to logical scrutiny. Dominant Ne scans the environment for novelty, anomaly, and untapped potential, generating ideas at a pace that other types find both exhilarating and exhausting. Auxiliary Ti acts as the quality filter, testing each possibility for internal logical consistency and structural soundness. The characteristic ENTP mode of engagement is the devil's advocate: they explore ideas not by accepting them but by attacking them from every angle, not out of hostility but out of a genuine drive to find what survives logical pressure. Tertiary Fe develops as social dexterity, ENTPs can be remarkably charming and persuasive when they choose to be, using their understanding of group dynamics to advance their ideas. Inferior Si is their blind spot: the world of routine, detailed procedure, and accumulated personal experience feels suffocating. They forget appointments, neglect maintenance, and may repeat past mistakes because they do not value the lessons of experience. Under stress, Si erupts as obsessive worry about physical health, compulsive nostalgia, or a rigid fixation on minor sensory details. The ENTP's journey involves learning that innovation without implementation is merely entertainment.",
    strengths: [
      "Innovation",
      "Intellectual agility",
      "Debate and persuasion",
      "Pattern recognition",
      "Entrepreneurial thinking",
    ],
    growthAreas: [
      "Follow-through on projects",
      "Routine and consistency",
      "Respecting others' emotional needs",
      "Patience with proven methods",
    ],
    famousExamples: ["Leonardo da Vinci", "Mark Twain", "Benjamin Franklin"],
    journalPrompts: [
      "What project have I started but not finished, and what would completing it give me?",
      "How can I honor tradition while still innovating?",
      "When did my love of debate hurt someone I care about?",
    ],
    color: "#f59e0b",
    loopPattern: {
      functions: ["Ne", "Fe"],
      description:
        "In a Ne-Fe loop, the ENTP bypasses Ti and becomes a social chameleon, generating possibilities based on what will please, entertain, or impress others rather than what is logically sound. They become performers rather than thinkers, constantly reading the social audience and generating content designed for reaction rather than truth. The loop looks like superficial charm without substance: the ENTP is engaging but empty, exciting but unreliable, saying whatever the moment seems to demand.",
    },
    gripDescription:
      "Under extreme stress, the ENTP falls into the grip of inferior Si. This manifests as an uncharacteristic obsession with past failures, bodily symptoms, and concrete details. The normally future-oriented, possibility-seeking ENTP becomes fixated on what went wrong before, develops hypochondriacal concerns about their health, and may withdraw into rigid routines as a way of managing anxiety. They may become uncharacteristically pessimistic, convinced that past patterns doom all future endeavors.",
    commonMistypes: ["ENFP", "INTP", "ENTJ", "ESTP"],
    interactionStyle: "Get Things Going",
    temperament: "NT Rational",
  },
  {
    code: "INFJ",
    name: "The Advocate",
    brief: "Insightful, principled idealists driven by deep empathy and a vision for humanity.",
    stack: ["Ni", "Fe", "Ti", "Se"],
    fullStack: ["Ni", "Fe", "Ti", "Se", "Ne", "Fi", "Te", "Si"],
    description:
      "INFJs lead with Introverted Intuition (Ni), perceiving deep patterns and future possibilities. Supported by Extraverted Feeling (Fe), they naturally attune to others' needs and work toward collective harmony. Their tertiary Ti provides analytical backup, while inferior Se can disconnect them from immediate physical reality.",
    cognitiveWiring:
      "The INFJ mind operates through a unique integration of pattern-perception and social attunement. Dominant Ni works beneath conscious awareness, synthesizing impressions of people, events, and possibilities into convergent insights about where things are heading, particularly in the realm of human development and potential. Auxiliary Fe orients these insights outward, toward the wellbeing of others and the harmony of the collective. The INFJ's characteristic mode is the counselor's stance: perceiving what is happening beneath the surface of a person or situation (Ni) and responding with emotional wisdom designed to facilitate growth (Fe). This makes INFJs uncannily perceptive about people, often understanding others better than those others understand themselves. Tertiary Ti provides the analytical scaffolding, INFJs can be surprisingly logical and systematic when their intuitive insights need intellectual grounding. Inferior Se is the function that grounds and humbles them: the raw, physical, sensory present can feel overwhelming, and INFJs may oscillate between ascetic withdrawal from physical experience and sudden overindulgence. The INFJ's deepest challenge is the tension between their vision of what people could become and the reality of what people are, a gap that can produce both profound compassion and bitter disillusionment.",
    strengths: [
      "Deep insight into people",
      "Visionary idealism",
      "Empathic connection",
      "Written expression",
      "Counseling others",
    ],
    growthAreas: [
      "Being present in the physical world",
      "Setting boundaries",
      "Not absorbing others' emotions",
      "Acting on insights rather than just perceiving them",
    ],
    famousExamples: ["Carl Jung", "Martin Luther King Jr.", "Fyodor Dostoevsky"],
    journalPrompts: [
      "Whose emotions am I carrying that aren't mine?",
      "What insight have I been sitting on that I need to act upon?",
      "How can I ground myself in my body today?",
    ],
    color: "#10b981",
    loopPattern: {
      functions: ["Ni", "Ti"],
      description:
        "In a Ni-Ti loop, the INFJ bypasses Fe and retreats into an internal world of intuitive vision and logical analysis that has no connection to other people. They construct elaborate internal theories about reality (Ni) and justify them with rigorous but unfounded logic (Ti), never checking their conclusions against the social world. This can manifest as conspiratorial thinking, isolation, or a cold, detached cynicism that is entirely unlike the INFJ's normal warmth. They become the isolated prophet who has given up on humanity.",
    },
    gripDescription:
      "Under extreme stress, the INFJ falls into the grip of inferior Se. This manifests similarly to the INTJ grip, overindulgence in sensory experience, but with a specifically relational quality. The INFJ may engage in impulsive, physically reckless behavior, overeat or drink excessively, become obsessed with their physical appearance, or make rash decisions based on immediate sensory desires. They may also become hypersensitive to their physical environment, experiencing sensory overload in situations that would normally be manageable.",
    commonMistypes: ["INTJ", "INFP", "ISFJ", "ENFJ"],
    interactionStyle: "Chart the Course",
    temperament: "NF Idealist",
  },
  {
    code: "INFP",
    name: "The Mediator",
    brief: "Idealistic, empathetic creatives guided by deep personal values and imagination.",
    stack: ["Fi", "Ne", "Si", "Te"],
    fullStack: ["Fi", "Ne", "Si", "Te", "Fe", "Ni", "Se", "Ti"],
    description:
      "INFPs lead with Introverted Feeling (Fi), navigating the world through a rich internal value system. Supported by Extraverted Intuition (Ne), they see possibilities and connections that others miss. Their tertiary Si grounds them in personal experience, while inferior Te can make structured execution and practical organization challenging.",
    cognitiveWiring:
      "The INFP mind is a cathedral of meaning, where every experience is evaluated against a deeply personal system of values and invested with symbolic significance. Dominant Fi creates a rich, complex inner emotional world, a continuously evolving hierarchy of what matters, what is authentic, what deserves devotion. Auxiliary Ne provides the windows of this cathedral, letting in light from the external world in the form of possibilities, connections, and new perspectives that expand and refine the value system. The INFP's characteristic mode is the seeker: exploring the world through imagination and possibility (Ne) while filtering everything through the question of whether it resonates with their deepest sense of truth (Fi). Tertiary Si develops as a reservoir of meaningful personal experiences, memories that carry emotional weight and serve as reference points for the value system. Inferior Te is the function that challenges them most: the impersonal world of efficiency, organization, measurable outcomes, and systematic execution feels foreign and sometimes oppressive. Under stress, Te erupts as harsh self-criticism, a sudden compulsive need to organize and control, or explosive confrontations delivered with an uncharacteristic bluntness. The INFP's journey involves learning to build bridges between their inner world of meaning and the outer world of practical reality.",
    strengths: [
      "Authenticity",
      "Creative expression",
      "Deep empathy",
      "Idealism",
      "Moral clarity",
    ],
    growthAreas: [
      "Practical execution of ideas",
      "Accepting imperfect realities",
      "Asserting needs directly",
      "Organizing and structuring work",
    ],
    famousExamples: ["William Shakespeare", "J.R.R. Tolkien", "Edgar Allan Poe"],
    journalPrompts: [
      "What value am I honoring in my life right now?",
      "How can I take one practical step toward my ideal vision?",
      "When did I last create something purely for the joy of it?",
    ],
    color: "#ec4899",
    loopPattern: {
      functions: ["Fi", "Si"],
      description:
        "In a Fi-Si loop, the INFP bypasses Ne and becomes trapped in an internal cycle of personal feelings and past memories. They replay old emotional experiences with vivid intensity, re-experiencing past hurts, disappointments, and losses without generating any new perspectives or possibilities. This can manifest as depression, chronic nostalgia, or a withdrawal into a private emotional world where nothing new can enter. The INFP becomes stuck in the past, mourning what was or what could have been.",
    },
    gripDescription:
      "Under extreme stress, the INFP falls into the grip of inferior Te. This manifests as uncharacteristic harsh criticism, of themselves and others. The normally gentle, accepting INFP becomes blunt, dismissive, and obsessed with efficiency and productivity. They may make cutting remarks about others' competence, engage in compulsive organizing and list-making, or become fixated on external metrics of success. They may also make rash, poorly considered decisions in an attempt to 'just get things done', decisions that contradict their values and cause later regret.",
    commonMistypes: ["INFJ", "INTP", "ISFP", "ENFP"],
    interactionStyle: "Behind the Scenes",
    temperament: "NF Idealist",
  },
  {
    code: "ENFJ",
    name: "The Protagonist",
    brief: "Charismatic, empathetic leaders who inspire others toward growth and connection.",
    stack: ["Fe", "Ni", "Se", "Ti"],
    fullStack: ["Fe", "Ni", "Se", "Ti", "Fi", "Ne", "Si", "Te"],
    description:
      "ENFJs lead with Extraverted Feeling (Fe), naturally creating harmony and inspiring others. Supported by Introverted Intuition (Ni), they have a clear vision for how people and communities can grow. Their tertiary Se keeps them engaged with reality, while inferior Ti can make detached logical analysis challenging.",
    cognitiveWiring:
      "The ENFJ mind is oriented toward human potential, perceiving who people are becoming and facilitating that transformation. Dominant Fe reads the emotional landscape with extraordinary sensitivity, attuning to the needs, feelings, and unspoken dynamics of every social situation. Auxiliary Ni provides the vision, a clear, often uncannily accurate perception of where a person, relationship, or community is heading and what it needs in order to grow. Together, Fe-Ni creates a type that is both deeply empathic and strategically visionary about human development. ENFJs do not merely comfort; they catalyze growth, often seeing in others a potential that those others have not yet recognized in themselves. Tertiary Se adds a grounded, practical dimension, mature ENFJs can translate their interpersonal vision into concrete action, responding to what is happening right now rather than only what could be. Inferior Ti is their shadow: the world of detached, impersonal logical analysis feels cold and threatening. Under stress, Ti erupts as hypercritical, nitpicking logic, the normally warm ENFJ becomes caustic, picking apart others' reasoning with a precision that serves to wound rather than illuminate. The ENFJ's growth involves learning that genuine help sometimes requires the willingness to step back and let people struggle.",
    strengths: [
      "Inspiring leadership",
      "Empathic communication",
      "Community building",
      "Mentoring others",
      "Diplomatic skill",
    ],
    growthAreas: [
      "Detached logical analysis",
      "Not over-identifying with others' feelings",
      "Setting personal boundaries",
      "Accepting that not everyone wants help",
    ],
    famousExamples: ["Barack Obama", "Oprah Winfrey", "Martin Luther King Jr."],
    journalPrompts: [
      "Am I taking care of my own needs while caring for others?",
      "What would dispassionate logic tell me about this situation?",
      "Whose growth am I invested in that might not want my help?",
    ],
    color: "#f43f5e",
    loopPattern: {
      functions: ["Fe", "Se"],
      description:
        "In a Fe-Se loop, the ENFJ bypasses Ni and becomes trapped in a cycle of reading and responding to the immediate social environment without any deeper vision. They become hyper-reactive to others' emotions and needs in the present moment, exhausting themselves with constant caretaking that has no strategic direction. The loop looks like frantic people-pleasing, the ENFJ runs from person to person, putting out emotional fires without any guiding sense of where the collective is heading or what it truly needs.",
    },
    gripDescription:
      "Under extreme stress, the ENFJ falls into the grip of inferior Ti. This manifests as harsh, nitpicking logical criticism that is entirely unlike their normal warmth. They may become obsessed with finding logical flaws in others' reasoning, withdraw into cold analytical detachment, or develop a cynical contempt for emotional considerations. They may also turn the critical lens inward, convincing themselves through relentless logical analysis that they are failures, that their caring is not genuine, or that their relationships are founded on manipulation.",
    commonMistypes: ["INFJ", "ESFJ", "ENTJ", "ENFP"],
    interactionStyle: "In Charge",
    temperament: "NF Idealist",
  },
  {
    code: "ENFP",
    name: "The Campaigner",
    brief: "Enthusiastic, creative spirits who see life as full of possibility and meaning.",
    stack: ["Ne", "Fi", "Te", "Si"],
    fullStack: ["Ne", "Fi", "Te", "Si", "Ni", "Fe", "Ti", "Se"],
    description:
      "ENFPs lead with Extraverted Intuition (Ne), seeing endless possibilities and connections in the world. Supported by Introverted Feeling (Fi), they filter these possibilities through deep personal values. Their tertiary Te helps them execute ideas, while inferior Si can make routine and detailed consistency challenging.",
    cognitiveWiring:
      "The ENFP mind is a kaleidoscope of possibilities, each one refracted through the lens of personal meaning and value. Dominant Ne engages with the world as a field of infinite potential, every person, situation, and idea radiates connections and possibilities that the ENFP perceives with infectious enthusiasm. Auxiliary Fi provides the compass, evaluating each possibility against a deeply personal value system: not just 'what could be' but 'what should be, given who I am and what I care about.' This makes ENFPs unique among the NP types, their exploration is not purely intellectual but value-driven, and they experience possibilities not just as interesting but as meaningful. Tertiary Te develops as the capacity to execute, to take the valued possibility and build it into something real through planning, organization, and directed effort. Inferior Si is their persistent challenge: the world of routine, accumulated detail, and established procedure feels like a cage. Under stress, Si erupts as pessimistic fixation on past failures, obsessive worry about physical health, or an uncharacteristic rigidity about routines and details. The ENFP's journey is learning that depth and commitment are not betrayals of their exploratory nature but the fulfillment of it.",
    strengths: [
      "Creative vision",
      "Inspiring enthusiasm",
      "Authentic connection",
      "Versatility",
      "Emotional warmth",
    ],
    growthAreas: [
      "Follow-through and consistency",
      "Routine tasks and details",
      "Not overcommitting",
      "Being present instead of always imagining what's next",
    ],
    famousExamples: ["Robin Williams", "Walt Disney", "Mark Twain"],
    journalPrompts: [
      "What possibility am I chasing, and does it align with my deepest values?",
      "What commitment would benefit from more sustained attention?",
      "How can I appreciate what I already have?",
    ],
    color: "#f97316",
    loopPattern: {
      functions: ["Ne", "Te"],
      description:
        "In a Ne-Te loop, the ENFP bypasses Fi and becomes a restless optimizer, generating possibilities and immediately trying to execute them without checking whether they align with personal values. They become scattered and productive at the same time, launching multiple projects at once without any of them carrying genuine personal meaning. The loop looks like frantic activity without soul, the ENFP is doing a lot but feeling nothing, chasing external validation through achievement rather than internal fulfillment through authentic expression.",
    },
    gripDescription:
      "Under extreme stress, the ENFP falls into the grip of inferior Si. This manifests as an uncharacteristic withdrawal into isolation and pessimistic rumination about the past. The normally forward-looking, optimistic ENFP becomes convinced that history will repeat itself, obsesses over past mistakes and missed opportunities, and may develop psychosomatic symptoms or hypochondriacal concerns. They may cling to established routines with desperate rigidity, terrified of change, the exact opposite of their normal orientation.",
    commonMistypes: ["ENTP", "INFP", "ESFP", "ENFJ"],
    interactionStyle: "Get Things Going",
    temperament: "NF Idealist",
  },
  {
    code: "ISTJ",
    name: "The Logistician",
    brief: "Dependable, thorough, and systematic individuals who value duty and tradition.",
    stack: ["Si", "Te", "Fi", "Ne"],
    fullStack: ["Si", "Te", "Fi", "Ne", "Se", "Ti", "Fe", "Ni"],
    description:
      "ISTJs lead with Introverted Sensing (Si), building a rich internal library of experience and proven methods. Supported by Extraverted Thinking (Te), they organize their world efficiently. Their tertiary Fi gives them quiet personal values, while inferior Ne can make embracing radical change or novel possibilities difficult.",
    cognitiveWiring:
      "The ISTJ mind is an archive of accumulated experience organized for practical application. Dominant Si maintains a vast, detailed internal record of past events, procedures, and sensory impressions, constantly comparing present situations to this rich database. Auxiliary Te provides the organizational framework, translating Si's experiential data into efficient systems, procedures, and hierarchies. The ISTJ's characteristic mode is the administrator: drawing on detailed knowledge of how things have been done (Si) to create reliable, effective structures in the present (Te). This combination produces individuals of remarkable dependability, they know what works because they remember in detail what has worked before, and they organize that knowledge for practical use. Tertiary Fi develops as a quiet but genuine moral center, ISTJs have strong personal values that they express through consistent action rather than emotional display. Inferior Ne is their persistent anxiety: the world of radical possibility, unpredictable change, and speculative thinking feels threatening. Under stress, Ne erupts as catastrophic imagination, the normally grounded ISTJ becomes convinced that terrible, unlikely things are about to happen. The ISTJ's growth involves learning that reliability need not become rigidity, and that some of the best paths forward have never been traveled before.",
    strengths: [
      "Reliability",
      "Thoroughness",
      "Practical wisdom",
      "Organized efficiency",
      "Duty and responsibility",
    ],
    growthAreas: [
      "Embracing new possibilities",
      "Flexibility with unproven methods",
      "Expressing emotions",
      "Tolerating ambiguity",
    ],
    famousExamples: ["George Washington", "Queen Elizabeth II", "Warren Buffett"],
    journalPrompts: [
      "What new possibility have I been dismissing that might be worth exploring?",
      "How do I feel underneath my sense of duty?",
      "What tradition serves me, and what tradition am I clinging to?",
    ],
    color: "#475569",
    loopPattern: {
      functions: ["Si", "Fi"],
      description:
        "In a Si-Fi loop, the ISTJ bypasses Te and becomes trapped in an internal cycle of past memories and personal feelings. They replay past events with vivid detail (Si) and experience intense personal emotional reactions to them (Fi), without taking any practical action or seeking external input. This can manifest as stubborn withdrawal, holding grudges, or a morose fixation on how things used to be. They become inwardly focused and outwardly rigid, unable to engage with the present situation on its own terms.",
    },
    gripDescription:
      "Under extreme stress, the ISTJ falls into the grip of inferior Ne. This manifests as uncharacteristic catastrophic thinking, the normally calm, practical ISTJ becomes convinced that disaster is imminent and generates an avalanche of worst-case scenarios. They may become paranoid about the future, see hidden threats everywhere, and develop an anxious, scattered quality that is entirely unlike their usual composed reliability. In some cases, they may impulsively pursue a wild new possibility in a desperate attempt to escape the perceived trap of their routines.",
    commonMistypes: ["ISFJ", "INTJ", "ESTJ", "ISTP"],
    interactionStyle: "Chart the Course",
    temperament: "SJ Guardian",
  },
  {
    code: "ISFJ",
    name: "The Defender",
    brief: "Warm, devoted protectors who serve others with quiet dedication and loyalty.",
    stack: ["Si", "Fe", "Ti", "Ne"],
    fullStack: ["Si", "Fe", "Ti", "Ne", "Se", "Fi", "Te", "Ni"],
    description:
      "ISFJs lead with Introverted Sensing (Si), creating detailed internal records of experiences and impressions. Supported by Extraverted Feeling (Fe), they use this knowledge to care for others. Their tertiary Ti provides quiet analytical ability, while inferior Ne can make big-picture or speculative thinking challenging.",
    cognitiveWiring:
      "The ISFJ mind is a warm archive, a detailed record of experience organized around the care and protection of loved ones. Dominant Si maintains vivid impressions of past events, especially those with emotional significance: how people looked, what they said, how a room felt, what someone needed. Auxiliary Fe directs this rich experiential data outward in the form of attentive, personalized care, the ISFJ remembers what you like, what you need, what hurt you, and what helped you, and they use this knowledge to anticipate and meet your needs before you articulate them. This combination produces the most devoted caretakers of all types. Tertiary Ti develops as a quiet analytical capacity that allows ISFJs to troubleshoot problems and evaluate situations with more logical precision than their warm exterior might suggest. Inferior Ne is the source of their deepest anxiety: the open field of possibility, change, and the unknown feels threatening. Under stress, Ne erupts as catastrophic imagination, the ISFJ becomes convinced that every possible thing that could go wrong will go wrong, especially for the people they love. The ISFJ's growth journey involves learning that the people they protect also need space to struggle, and that the unknown is not always dangerous.",
    strengths: [
      "Devoted care",
      "Reliability",
      "Detailed memory",
      "Practical support",
      "Loyalty",
    ],
    growthAreas: [
      "Advocating for own needs",
      "Embracing change and uncertainty",
      "Not over-giving",
      "Exploring new possibilities",
    ],
    famousExamples: ["Mother Teresa", "Rosa Parks", "Queen Elizabeth II"],
    journalPrompts: [
      "What need of mine have I been putting last?",
      "What change am I resisting, and what might it offer me?",
      "How can I care for myself as well as I care for others?",
    ],
    color: "#10b981",
    loopPattern: {
      functions: ["Si", "Ti"],
      description:
        "In a Si-Ti loop, the ISFJ bypasses Fe and becomes trapped in an internal cycle of past impressions and private analysis. They withdraw from social engagement and instead ruminate on past events, analyzing them with increasingly detached logic. This can manifest as quiet bitterness, the ISFJ catalogs every instance of being taken for granted or hurt, constructs a logical case for withdrawal, and retreats into a self-protective shell. They become outwardly passive but inwardly judgmental.",
    },
    gripDescription:
      "Under extreme stress, the ISFJ falls into the grip of inferior Ne. This manifests as an overwhelming flood of negative possibilities, the normally grounded, calm ISFJ becomes anxious, scattered, and convinced that catastrophe is around every corner. They may become paralyzed by the sheer number of things that could go wrong, develop irrational fears about the future, and lose their characteristic ability to manage practical details. They may also become uncharacteristically impulsive, making sudden changes in a panicked attempt to preempt the disasters they are imagining.",
    commonMistypes: ["INFJ", "ISTJ", "ESFJ", "ISFP"],
    interactionStyle: "Behind the Scenes",
    temperament: "SJ Guardian",
  },
  {
    code: "ESTJ",
    name: "The Executive",
    brief: "Organized, decisive managers who bring order and structure to every situation.",
    stack: ["Te", "Si", "Ne", "Fi"],
    fullStack: ["Te", "Si", "Ne", "Fi", "Ti", "Se", "Ni", "Fe"],
    description:
      "ESTJs lead with Extraverted Thinking (Te), naturally organizing people and systems for efficiency. Supported by Introverted Sensing (Si), they draw on proven methods and established procedures. Their tertiary Ne allows some openness to new ideas, while inferior Fi can make accessing deep personal emotions difficult.",
    cognitiveWiring:
      "The ESTJ mind is built for management, organizing resources, establishing procedures, and ensuring that things get done correctly and on time. Dominant Te surveys the external environment and immediately identifies what needs to be organized, streamlined, or corrected. Auxiliary Si provides the experiential database, a detailed record of what has worked, what procedures have been established, and what standards should be maintained. Together, Te-Si creates a type that excels at maintaining and improving existing systems based on accumulated best practices. ESTJs are the backbone of functional institutions. Tertiary Ne develops over time as a capacity for strategic innovation, the ability to see new possibilities within or beyond existing systems. Inferior Fi is their deepest challenge: the world of personal emotion, subjective values, and individual feeling feels dangerously unstructured. Under stress, Fi erupts as intense, overwhelming emotional reactions, hurt feelings that the ESTJ has no framework for processing, sudden moral outrage that seems disproportionate, or a crushing sense of personal inadequacy that contradicts their outward competence. The ESTJ's growth involves learning that the most efficient system is one that accounts for human values and individual differences.",
    strengths: [
      "Organizational leadership",
      "Efficient execution",
      "Clear communication",
      "Practical decision-making",
      "Dependability",
    ],
    growthAreas: [
      "Emotional sensitivity",
      "Flexibility with unconventional approaches",
      "Listening to personal values",
      "Patience with less structured individuals",
    ],
    famousExamples: ["Henry Ford", "Judge Judy", "Sonia Sotomayor"],
    journalPrompts: [
      "Am I organizing for efficiency or for control?",
      "What personal value have I been neglecting?",
      "How can I lead with both competence and compassion?",
    ],
    color: "#7c3aed",
    loopPattern: {
      functions: ["Te", "Ne"],
      description:
        "In a Te-Ne loop, the ESTJ bypasses Si and becomes a restless organizer without a stable foundation. They generate new systems and plans (Ne) and immediately try to implement them (Te), without drawing on past experience to evaluate whether they are sound. This can manifest as constant restructuring, changing procedures, reorganizing teams, and launching new initiatives at a pace that destabilizes rather than strengthens the organization. They lose their characteristic reliability in pursuit of efficiency-at-all-costs.",
    },
    gripDescription:
      "Under extreme stress, the ESTJ falls into the grip of inferior Fi. This manifests as overwhelming emotional sensitivity, the normally composed, decisive ESTJ becomes hypersensitive to perceived personal slights, feels unappreciated and undervalued, and may withdraw into moody isolation. They may develop an uncharacteristic preoccupation with whether people like them, interpret constructive feedback as personal attacks, and react with emotional intensity that shocks everyone, including themselves.",
    commonMistypes: ["ENTJ", "ISTJ", "ESFJ", "ESTP"],
    interactionStyle: "In Charge",
    temperament: "SJ Guardian",
  },
  {
    code: "ESFJ",
    name: "The Consul",
    brief: "Caring, sociable organizers who create harmony and look after others' wellbeing.",
    stack: ["Fe", "Si", "Ne", "Ti"],
    fullStack: ["Fe", "Si", "Ne", "Ti", "Fi", "Se", "Ni", "Te"],
    description:
      "ESFJs lead with Extraverted Feeling (Fe), naturally creating social harmony and caring for others. Supported by Introverted Sensing (Si), they draw on personal experience and tradition. Their tertiary Ne opens them to some new possibilities, while inferior Ti can make detached logical analysis challenging.",
    cognitiveWiring:
      "The ESFJ mind is organized around the emotional wellbeing of their social world. Dominant Fe reads the group's emotional temperature with remarkable accuracy, who is comfortable, who is struggling, what the unspoken tensions are, and works continuously to maintain harmony and connection. Auxiliary Si provides the foundation of this care through accumulated experience: the ESFJ remembers how things have been done, what traditions have meaning, what each person in their circle needs and prefers. Together, Fe-Si creates a type that maintains the social fabric through attentive, tradition-honoring care. ESFJs are the people who remember birthdays, maintain family rituals, and ensure that no one is left out. Tertiary Ne develops as an openness to new social possibilities, new ways of connecting, new approaches to community building. Inferior Ti is their greatest challenge: the world of detached, impersonal logical analysis feels cold and dangerous. Under stress, Ti erupts as harsh, cutting criticism, a sudden, uncharacteristic logical dissection of others' flaws or their own worth. The ESFJ's growth involves learning that genuine harmony sometimes requires honest confrontation, and that caring for others must be balanced with caring for oneself.",
    strengths: [
      "Social warmth",
      "Practical care",
      "Community building",
      "Loyalty",
      "Organizational skill",
    ],
    growthAreas: [
      "Independent logical analysis",
      "Accepting criticism",
      "Not people-pleasing",
      "Challenging traditions that no longer serve",
    ],
    famousExamples: ["Taylor Swift", "Jennifer Garner", "Larry King"],
    journalPrompts: [
      "Whose approval am I seeking, and why?",
      "What would I believe if nobody else's opinion mattered?",
      "How can I balance caring for others with caring for myself?",
    ],
    color: "#e11d48",
    loopPattern: {
      functions: ["Fe", "Ne"],
      description:
        "In a Fe-Ne loop, the ESFJ bypasses Si and becomes anxiously attuned to every possible social threat. They scan the environment for potential relational problems (Ne) and react emotionally to each one (Fe), without drawing on past experience to assess whether the threat is real. This can manifest as social paranoia, the ESFJ becomes convinced that people are upset, relationships are failing, and social disaster is imminent, generating emotional responses to imagined problems that exhaust both themselves and everyone around them.",
    },
    gripDescription:
      "Under extreme stress, the ESFJ falls into the grip of inferior Ti. This manifests as harsh, caustic logical criticism, the normally warm, accommodating ESFJ becomes cutting and analytical, picking apart others' reasoning and pointing out logical flaws with a bluntness that is entirely uncharacteristic. They may also turn this critical lens inward, constructing elaborate logical arguments for why they are failures, why their relationships are doomed, or why their caring is fundamentally inadequate. The Ti grip can also produce an uncharacteristic cold detachment that alienates the very people the ESFJ normally works so hard to connect with.",
    commonMistypes: ["ENFJ", "ISFJ", "ESTJ", "ESFP"],
    interactionStyle: "Get Things Going",
    temperament: "SJ Guardian",
  },
  {
    code: "ISTP",
    name: "The Virtuoso",
    brief: "Practical, observant problem-solvers who understand how things work.",
    stack: ["Ti", "Se", "Ni", "Fe"],
    fullStack: ["Ti", "Se", "Ni", "Fe", "Te", "Si", "Ne", "Fi"],
    description:
      "ISTPs lead with Introverted Thinking (Ti), building precise logical frameworks for understanding how things work. Supported by Extraverted Sensing (Se), they're engaged with the physical world and adept at hands-on problem-solving. Their tertiary Ni gives some foresight, while inferior Fe can make emotional and social situations challenging.",
    cognitiveWiring:
      "The ISTP mind is a precision instrument calibrated for understanding mechanical, physical, and logical systems through direct engagement. Dominant Ti constructs internal models of how things work, not abstract theories but practical, operational frameworks that can be tested against reality. Auxiliary Se provides the testing ground, engaging directly with the physical world to see whether the internal model holds up. The ISTP's characteristic mode is the diagnostic technician: they observe (Se), analyze (Ti), intervene (Se), and refine their model (Ti) in a rapid feedback loop that produces remarkable hands-on competence. This makes ISTPs the most practically skilled of the thinking types, they understand systems not theoretically but through direct manipulation. Tertiary Ni develops as a capacity for anticipation, an intuitive sense of what will happen next based on the patterns they have observed and analyzed. Inferior Fe is the function that unsettles them most: the world of social obligation, emotional expression, and interpersonal harmony feels chaotic and unpredictable. Under stress, Fe erupts as awkward emotional outbursts, the normally cool, composed ISTP becomes tearful, needy, or explosively angry in social situations. The ISTP's growth involves learning that emotional and social systems, like mechanical ones, have their own internal logic that can be understood and navigated.",
    strengths: [
      "Mechanical aptitude",
      "Logical problem-solving",
      "Calm under pressure",
      "Practical skill",
      "Adaptability",
    ],
    growthAreas: [
      "Emotional expression",
      "Long-term planning",
      "Social engagement",
      "Communicating feelings",
    ],
    famousExamples: ["Bruce Lee", "Amelia Earhart", "Clint Eastwood"],
    journalPrompts: [
      "What am I feeling underneath my logical exterior?",
      "How can I share more of my inner world with someone I trust?",
      "What long-term vision excites me?",
    ],
    color: "#64748b",
    loopPattern: {
      functions: ["Ti", "Ni"],
      description:
        "In a Ti-Ni loop, the ISTP bypasses Se and retreats into an internal world of logical analysis and intuitive pattern-seeking. They construct theories about how things work (Ti) and project these into convergent visions of the future (Ni) without testing any of it against physical reality. This can manifest as paranoid analysis, the ISTP becomes convinced they have figured out a hidden pattern or threat and builds an elaborate internal case for it, refusing to engage with concrete evidence that contradicts their conclusion.",
    },
    gripDescription:
      "Under extreme stress, the ISTP falls into the grip of inferior Fe. This manifests as uncharacteristic emotional displays, the normally stoic, private ISTP becomes emotionally volatile, hypersensitive to social rejection, and desperately seeking emotional connection in clumsy, awkward ways. They may interpret neutral social interactions as either deeply affirming or deeply hurtful, overreact to perceived slights, and make dramatic emotional gestures that they later find embarrassing. In some cases, the grip produces an oppressive need to be liked that leads to people-pleasing behavior entirely at odds with their usual independence.",
    commonMistypes: ["INTP", "ISTJ", "ESTP", "ISFP"],
    interactionStyle: "Chart the Course",
    temperament: "SP Artisan",
  },
  {
    code: "ISFP",
    name: "The Adventurer",
    brief: "Gentle, sensitive artists who live in the moment and express themselves through action.",
    stack: ["Fi", "Se", "Ni", "Te"],
    fullStack: ["Fi", "Se", "Ni", "Te", "Fe", "Si", "Ne", "Ti"],
    description:
      "ISFPs lead with Introverted Feeling (Fi), guided by deep personal values and aesthetic sensibility. Supported by Extraverted Sensing (Se), they experience the world with vivid sensory awareness. Their tertiary Ni provides occasional deeper insights, while inferior Te can make structured organization and assertive leadership challenging.",
    cognitiveWiring:
      "The ISFP mind is a finely tuned aesthetic instrument, experiencing the world through the dual lens of personal values and sensory immediacy. Dominant Fi creates a rich internal world of deeply felt values, emotions, and aesthetic preferences, the ISFP knows with quiet certainty what is beautiful, what is right, and what resonates with their authentic self. Auxiliary Se engages with the physical world directly, bringing these inner values into contact with concrete reality. The ISFP's characteristic mode is the artist: they perceive the world with sensory vividness (Se) and respond to it through the filter of personal meaning and aesthetic judgment (Fi). This produces a type that is both gentle and intensely present, they notice beauty that others miss and respond to it with an authenticity that can be deeply moving. Tertiary Ni develops as an occasional capacity for deeper insight, a sense of what is truly important beneath the surface of experience. Inferior Te is the function that challenges them most: the impersonal world of systems, organization, and assertive management feels oppressive and inauthentic. Under stress, Te erupts as harsh, controlling behavior, the normally gentle ISFP becomes blunt, critical, and rigidly focused on efficiency. The ISFP's growth involves learning that structure and assertion are not betrayals of sensitivity but vehicles for expressing their values more effectively in the world.",
    strengths: [
      "Artistic expression",
      "Sensory awareness",
      "Authenticity",
      "Compassion",
      "Living in the moment",
    ],
    growthAreas: [
      "Assertiveness",
      "Long-term planning",
      "Structured organization",
      "Confronting difficult conversations",
    ],
    famousExamples: ["Bob Dylan", "Prince", "Frida Kahlo"],
    journalPrompts: [
      "What value am I expressing through my actions today?",
      "What structure could support my creative vision?",
      "How can I assert my needs while staying true to who I am?",
    ],
    color: "#d946ef",
    loopPattern: {
      functions: ["Fi", "Ni"],
      description:
        "In a Fi-Ni loop, the ISFP bypasses Se and becomes trapped in an internal world of personal feelings and intuitive visions. They develop intense emotional convictions about the meaning of events (Ni) filtered through deeply personal values (Fi), without grounding any of it in present-moment sensory reality. This can manifest as a brooding withdrawal, the ISFP becomes moodily certain about the significance of events but cannot articulate or test their perceptions. They may develop a fatalistic emotional stance, feeling deeply about a future they believe is inevitable.",
    },
    gripDescription:
      "Under extreme stress, the ISFP falls into the grip of inferior Te. This manifests as uncharacteristic attempts to control and organize the external world with rigid efficiency. The normally flexible, gentle ISFP becomes blunt, critical, and obsessed with productivity. They may lash out at others for perceived incompetence, engage in compulsive organizing, and make harsh judgments based on efficiency rather than values. They may also become fixated on external metrics of success, grades, income, status, that they would normally dismiss as irrelevant to genuine worth.",
    commonMistypes: ["INFP", "ISTP", "ESFP", "ISFJ"],
    interactionStyle: "Behind the Scenes",
    temperament: "SP Artisan",
  },
  {
    code: "ESTP",
    name: "The Entrepreneur",
    brief: "Energetic, perceptive realists who thrive on action and live in the moment.",
    stack: ["Se", "Ti", "Fe", "Ni"],
    fullStack: ["Se", "Ti", "Fe", "Ni", "Si", "Te", "Fi", "Ne"],
    description:
      "ESTPs lead with Extraverted Sensing (Se), fully engaged with the present moment and physical reality. Supported by Introverted Thinking (Ti), they analyze situations with practical logic. Their tertiary Fe gives them social awareness, while inferior Ni can make long-term visioning and abstract planning challenging.",
    cognitiveWiring:
      "The ESTP mind is optimized for real-time engagement with the physical and social environment. Dominant Se perceives the present moment with extraordinary acuity, every detail of the physical environment, every nuance of body language, every shift in the atmosphere registers immediately. Auxiliary Ti provides the analytical engine, rapidly processing this sensory data and identifying the most effective response. The ESTP's characteristic mode is the tactical operator: they perceive what is happening right now (Se) and calculate the optimal move (Ti) with a speed that makes them formidable in crisis situations, negotiations, and competitive environments. Tertiary Fe develops as social savvy, ESTPs can be remarkably charming and persuasive, reading and influencing social dynamics with the same immediacy they bring to the physical environment. Inferior Ni is the function that haunts them: the world of long-term implications, symbolic meaning, and future consequences feels oppressively abstract. Under stress, Ni erupts as apocalyptic visions, the normally optimistic, present-focused ESTP becomes convinced of a terrible future they cannot prevent, developing an uncharacteristic brooding quality. The ESTP's growth involves learning that the present moment, however vivid, is always part of a larger pattern that deserves attention.",
    strengths: [
      "Quick thinking",
      "Practical action",
      "Persuasion",
      "Crisis management",
      "Physical awareness",
    ],
    growthAreas: [
      "Long-term consequences",
      "Abstract planning",
      "Emotional depth",
      "Patience with theory",
    ],
    famousExamples: ["Ernest Hemingway", "Madonna", "Jack Nicholson"],
    journalPrompts: [
      "What long-term consequence have I been ignoring?",
      "How can I slow down to consider the deeper meaning?",
      "What pattern in my life needs my attention?",
    ],
    color: "#dc2626",
    loopPattern: {
      functions: ["Se", "Fe"],
      description:
        "In a Se-Fe loop, the ESTP bypasses Ti and becomes a sensation-seeking social performer. They pursue immediate sensory experiences (Se) that will generate social approval and admiration (Fe), without any analytical evaluation of whether these pursuits are wise or sustainable. This can manifest as reckless showmanship, the ESTP takes escalating physical or social risks to maintain their audience's excitement, losing the practical logic that would normally keep them grounded.",
    },
    gripDescription:
      "Under extreme stress, the ESTP falls into the grip of inferior Ni. This manifests as dark, pessimistic visions of the future, the normally action-oriented, optimistic ESTP becomes convinced that their life is heading toward catastrophe and that nothing they do in the present can change the outcome. They may develop an uncharacteristic interest in mysticism or conspiracy theories, obsess over the deeper meaning of insignificant events, and withdraw into brooding isolation. The grip can also produce tunnel vision, an obsessive fixation on a single interpretation of events that excludes all other possibilities.",
    commonMistypes: ["ENTP", "ISTP", "ESFP", "ESTJ"],
    interactionStyle: "In Charge",
    temperament: "SP Artisan",
  },
  {
    code: "ESFP",
    name: "The Entertainer",
    brief: "Spontaneous, energetic performers who bring joy and live life to the fullest.",
    stack: ["Se", "Fi", "Te", "Ni"],
    fullStack: ["Se", "Fi", "Te", "Ni", "Si", "Fe", "Ti", "Ne"],
    description:
      "ESFPs lead with Extraverted Sensing (Se), living fully in the present moment. Supported by Introverted Feeling (Fi), they're guided by authentic personal values. Their tertiary Te helps them get things done practically, while inferior Ni can make long-term planning and deeper pattern recognition challenging.",
    cognitiveWiring:
      "The ESFP mind is calibrated for the fullest possible engagement with the present moment, filtered through a lens of authentic personal value. Dominant Se takes in the world with extraordinary sensory richness, colors, textures, sounds, physical sensations, and social atmospheres are perceived with an immediacy and vividness that makes the ESFP intensely present. Auxiliary Fi evaluates these experiences against a deeply personal value system: not just 'what is happening' but 'what does this mean to me, and does it align with who I am?' This combination produces a type that is both spontaneous and authentic, they engage with the world wholeheartedly while remaining true to a personal compass that others may not see. Tertiary Te develops as practical competence, the ability to organize, execute, and get things done when values demand it. Inferior Ni is the function that disturbs them: the world of long-term consequences, hidden meanings, and inevitable futures feels like a dark cloud hanging over the vibrant present. Under stress, Ni erupts as paranoid future-thinking, the normally joyful ESFP becomes convinced that something terrible is approaching, developing an uncharacteristic obsession with what it all means and where it is all heading. The ESFP's growth involves learning that anticipating the future is not a betrayal of the present but a way of protecting the joy they value so highly.",
    strengths: [
      "Performance",
      "Social warmth",
      "Practical creativity",
      "Adaptability",
      "Joyful presence",
    ],
    growthAreas: [
      "Long-term planning",
      "Deeper reflection",
      "Following through on commitments",
      "Addressing painful truths",
    ],
    famousExamples: ["Marilyn Monroe", "Elvis Presley", "Adele"],
    journalPrompts: [
      "What deeper pattern am I avoiding looking at?",
      "What long-term goal deserves my sustained attention?",
      "How can I balance living in the moment with planning for the future?",
    ],
    color: "#f97316",
    loopPattern: {
      functions: ["Se", "Te"],
      description:
        "In a Se-Te loop, the ESFP bypasses Fi and becomes a relentless doer, pursuing immediate physical experiences and executing tasks with ruthless efficiency, but without any connection to personal values or authentic feeling. This can manifest as workaholic pleasure-seeking, the ESFP fills every moment with activity (Se) and measures it by productivity (Te), losing touch with the personal meaning that normally animates their engagement with the world. They become busy but hollow.",
    },
    gripDescription:
      "Under extreme stress, the ESFP falls into the grip of inferior Ni. This manifests as an uncharacteristic fixation on dark, ominous future possibilities. The normally spontaneous, optimistic ESFP becomes brooding and fatalistic, convinced that terrible things are coming and that the patterns of their life are leading to an inescapable negative outcome. They may develop paranoid interpretations of others' behavior, see symbolic significance in random events, and withdraw from the sensory engagement that normally sustains them. The grip can be particularly frightening for ESFPs because the experience of being trapped in abstract, future-oriented anxiety is so alien to their natural way of being.",
    commonMistypes: ["ENFP", "ISFP", "ESTP", "ESFJ"],
    interactionStyle: "Get Things Going",
    temperament: "SP Artisan",
  },
];

// ── Assessment Questions (Dichotomy-Based, 24 Questions) ────────────────────

export const cognitiveQuestions: AssessmentQuestion[] = [
  // ─── Ni vs Se (Questions 1–6) ─────────────────────────────────────────────
  {
    id: 1,
    axis: "Ni-Se",
    text: "You walk into a room full of strangers at a networking event. Your mind immediately:",
    optionA: {
      text: "Starts reading the room for underlying dynamics, who has influence, what alliances exist, where the conversation is heading",
      scores: { Ni: 2 },
    },
    optionB: {
      text: "Takes in the full sensory scene, the lighting, the music, the energy, and you begin moving toward whatever feels most alive",
      scores: { Se: 2 },
    },
  },
  {
    id: 2,
    axis: "Ni-Se",
    text: "A close friend suddenly changes their behavior toward you. Your instinctive response is to:",
    optionA: {
      text: "Trace the trajectory of recent events to understand where this shift started and where it is likely heading",
      scores: { Ni: 2 },
    },
    optionB: {
      text: "Pay closer attention to their body language, tone, and facial expressions in your next interaction to read what is happening right now",
      scores: { Se: 2 },
    },
  },
  {
    id: 3,
    axis: "Ni-Se",
    text: "When making a major life decision, you tend to rely on:",
    optionA: {
      text: "A deep internal sense of where your life is supposed to go, a vision that has been forming beneath your awareness for a long time",
      scores: { Ni: 2 },
    },
    optionB: {
      text: "The concrete evidence of what is working right now, what opportunities are actually in front of you and how they feel when you engage with them",
      scores: { Se: 2 },
    },
  },
  {
    id: 4,
    axis: "Ni-Se",
    text: "You are watching a movie with a complex plot. About halfway through, you:",
    optionA: {
      text: "Have already formed a strong prediction about the ending and are watching to see if the director confirms your reading",
      scores: { Ni: 2 },
    },
    optionB: {
      text: "Are fully absorbed in the visual and emotional experience of each scene as it unfolds, letting the film carry you",
      scores: { Se: 2 },
    },
  },
  {
    id: 5,
    axis: "Ni-Se",
    text: "When you arrive at a vacation destination for the first time, you are most drawn to:",
    optionA: {
      text: "Finding a quiet spot and letting the significance of the place settle into you, sensing its character, history, and what it represents",
      scores: { Ni: 2 },
    },
    optionB: {
      text: "Immediately exploring, tasting local food, walking new streets, feeling the texture and rhythm of the place with all your senses",
      scores: { Se: 2 },
    },
  },
  {
    id: 6,
    axis: "Ni-Se",
    text: "During a heated group discussion at work, you naturally:",
    optionA: {
      text: "Stay quiet initially, processing what everyone is really saying beneath their words, then offer an insight that reframes the entire conversation",
      scores: { Ni: 2 },
    },
    optionB: {
      text: "Stay alert to the shifting energy in the room, who is getting tense, who is checked out, and respond in real time to what you observe",
      scores: { Se: 2 },
    },
  },

  // ─── Ne vs Si (Questions 7–12) ────────────────────────────────────────────
  {
    id: 7,
    axis: "Ne-Si",
    text: "You are assigned a project at work that is similar to one you completed successfully last year. You:",
    optionA: {
      text: "Immediately start thinking about how to do it differently this time, what new approaches might work, what creative angles have not been explored",
      scores: { Ne: 2 },
    },
    optionB: {
      text: "Pull up what you did last time and use it as a template, refining the proven approach based on what worked and what did not",
      scores: { Si: 2 },
    },
  },
  {
    id: 8,
    axis: "Ne-Si",
    text: "A friend tells you about a problem they are having. You find yourself:",
    optionA: {
      text: "Generating multiple possible explanations and suggesting approaches they have not considered, seeing their situation from several different angles at once",
      scores: { Ne: 2 },
    },
    optionB: {
      text: "Relating it to a similar experience you or someone you know has had, and drawing practical advice from what worked in that situation",
      scores: { Si: 2 },
    },
  },
  {
    id: 9,
    axis: "Ne-Si",
    text: "When you read an article about a new technology, your mind tends to:",
    optionA: {
      text: "Leap to ten different possible applications, in other industries, in your personal life, in hypothetical future scenarios",
      scores: { Ne: 2 },
    },
    optionB: {
      text: "Compare it to existing technologies you are familiar with, evaluating what it improves on and whether it is likely to be reliable based on similar past developments",
      scores: { Si: 2 },
    },
  },
  {
    id: 10,
    axis: "Ne-Si",
    text: "When you are cooking a meal, you are more likely to:",
    optionA: {
      text: "Improvise, substituting ingredients, experimenting with combinations, and treating the recipe as a starting point for creative exploration",
      scores: { Ne: 2 },
    },
    optionB: {
      text: "Follow the recipe carefully, perhaps adjusting based on past experience with what has produced the best results before",
      scores: { Si: 2 },
    },
  },
  {
    id: 11,
    axis: "Ne-Si",
    text: "Your daily routine tends to be:",
    optionA: {
      text: "Fluid and varied, you prefer different activities, routes, and schedules, and you feel restless when things become too predictable",
      scores: { Ne: 2 },
    },
    optionB: {
      text: "Consistent and established, you have a rhythm that works and you feel grounded when you can rely on familiar patterns",
      scores: { Si: 2 },
    },
  },
  {
    id: 12,
    axis: "Ne-Si",
    text: "When you are planning a vacation, you tend to:",
    optionA: {
      text: "Choose a destination you have never been to and leave the itinerary open, discovering things as they come is part of the adventure",
      scores: { Ne: 2 },
    },
    optionB: {
      text: "Return to a place you loved or research extensively based on others' experiences, planning specific activities so you make the most of the trip",
      scores: { Si: 2 },
    },
  },

  // ─── Ti vs Fe (Questions 13–18) ───────────────────────────────────────────
  {
    id: 13,
    axis: "Ti-Fe",
    text: "A colleague presents a proposal that the group enthusiastically supports, but you notice a logical flaw. You:",
    optionA: {
      text: "Point out the inconsistency clearly, even if it dampens the group's enthusiasm, getting the logic right matters more than preserving the mood",
      scores: { Ti: 2 },
    },
    optionB: {
      text: "Consider the group's investment in the idea and find a way to raise your concern diplomatically, or privately to the colleague after the meeting",
      scores: { Fe: 2 },
    },
  },
  {
    id: 14,
    axis: "Ti-Fe",
    text: "When a friend is going through a difficult time, you instinctively:",
    optionA: {
      text: "Analyze the situation with them, helping them see the logical structure of the problem and identify where the actual issue lies",
      scores: { Ti: 2 },
    },
    optionB: {
      text: "Focus on emotional support, making them feel heard, validating their feelings, and helping them process the emotional impact",
      scores: { Fe: 2 },
    },
  },
  {
    id: 15,
    axis: "Ti-Fe",
    text: "You are learning a new board game. Your approach is to:",
    optionA: {
      text: "Study the rulebook carefully to understand the underlying system and develop your own optimal strategy before playing",
      scores: { Ti: 2 },
    },
    optionB: {
      text: "Jump in and learn as you go with the group, enjoying the social experience and picking up strategy through shared play",
      scores: { Fe: 2 },
    },
  },
  {
    id: 16,
    axis: "Ti-Fe",
    text: "At a family gathering, a relative makes a factually incorrect statement about a topic you know well. You:",
    optionA: {
      text: "Feel compelled to correct the misinformation, because inaccuracy bothers you regardless of the social context",
      scores: { Ti: 2 },
    },
    optionB: {
      text: "Let it go to keep the peace, the relationship and the mood of the gathering matter more than being technically correct",
      scores: { Fe: 2 },
    },
  },
  {
    id: 17,
    axis: "Ti-Fe",
    text: "When choosing what to do on a weekend, you prioritize:",
    optionA: {
      text: "Activities that stimulate your mind or allow you to work on a personal project, even if it means spending time alone",
      scores: { Ti: 2 },
    },
    optionB: {
      text: "Activities that bring you together with people you care about, shared experiences and quality time are what recharge you",
      scores: { Fe: 2 },
    },
  },
  {
    id: 18,
    axis: "Ti-Fe",
    text: "You receive conflicting advice from two people you respect about an important decision. You:",
    optionA: {
      text: "Analyze both arguments on their logical merits, identifying which one is more internally consistent and better supported by evidence",
      scores: { Ti: 2 },
    },
    optionB: {
      text: "Consider both perspectives in terms of the people involved and the relationships at stake, seeking a resolution that honors everyone",
      scores: { Fe: 2 },
    },
  },

  // ─── Te vs Fi (Questions 19–24) ───────────────────────────────────────────
  {
    id: 19,
    axis: "Te-Fi",
    text: "Your team at work is falling behind on a deadline. Your instinct is to:",
    optionA: {
      text: "Reorganize the workflow, reassign tasks based on efficiency, and create a clear action plan to get back on track",
      scores: { Te: 2 },
    },
    optionB: {
      text: "Check in with team members individually to understand what is going wrong for each person, people do their best work when they feel genuinely supported",
      scores: { Fi: 2 },
    },
  },
  {
    id: 20,
    axis: "Te-Fi",
    text: "You are offered a promotion that comes with more money and status but requires doing work that feels meaningless to you. You:",
    optionA: {
      text: "Take it, the tangible benefits are clear, and meaning can be found in doing the work effectively and advancing your career goals",
      scores: { Te: 2 },
    },
    optionB: {
      text: "Decline or hesitate, doing work that does not align with what you believe in would feel like a betrayal of yourself, regardless of the external rewards",
      scores: { Fi: 2 },
    },
  },
  {
    id: 21,
    axis: "Te-Fi",
    text: "When you evaluate whether something is 'good,' you tend to focus on:",
    optionA: {
      text: "Whether it works, does it achieve its intended purpose efficiently and produce measurable results?",
      scores: { Te: 2 },
    },
    optionB: {
      text: "Whether it feels right, does it align with your personal sense of what is meaningful, beautiful, or morally sound?",
      scores: { Fi: 2 },
    },
  },
  {
    id: 22,
    axis: "Te-Fi",
    text: "During a disagreement with a partner or close friend, you tend to:",
    optionA: {
      text: "Focus on the facts of the situation, what actually happened, what the evidence shows, and what the most reasonable resolution would be",
      scores: { Te: 2 },
    },
    optionB: {
      text: "Focus on how the situation made you feel and what it means for the relationship, the emotional truth matters as much as the factual truth",
      scores: { Fi: 2 },
    },
  },
  {
    id: 23,
    axis: "Te-Fi",
    text: "You are decorating a new living space. Your approach is to:",
    optionA: {
      text: "Research best practices, compare options systematically, and create a plan that maximizes functionality and aesthetic impact for the budget",
      scores: { Te: 2 },
    },
    optionB: {
      text: "Choose each piece based on whether it speaks to you personally, you want the space to feel like an authentic expression of who you are",
      scores: { Fi: 2 },
    },
  },
  {
    id: 24,
    axis: "Te-Fi",
    text: "When you see someone making a poor decision, you are more likely to:",
    optionA: {
      text: "Offer direct, practical advice about what they should do differently, sometimes people need honest, clear guidance",
      scores: { Te: 2 },
    },
    optionB: {
      text: "Respect their right to make their own choices, your values tell you that personal autonomy matters more than optimal outcomes",
      scores: { Fi: 2 },
    },
  },
];
