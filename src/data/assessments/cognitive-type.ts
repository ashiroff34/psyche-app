// Advanced Jungian Cognitive Functions Assessment
// 80 items (10 per function) assessing all 8 cognitive functions individually.
// Goes beyond standard MBTI to measure Se, Si, Ne, Ni, Te, Ti, Fe, Fi.

export interface CognitiveItem {
  id: number;
  text: string;
  scores: Record<string, number>;
  category: 'perceiving' | 'judging';
}

export interface FunctionDescription {
  code: string;
  name: string;
  description: string;
  strengths: string[];
  blindSpots: string[];
}

// ---------------------------------------------------------------------------
// 80 Assessment Items (10 per cognitive function)
// ---------------------------------------------------------------------------

export const cognitiveTypeItems: CognitiveItem[] = [
  // =========================================================================
  // Se (Extraverted Sensing) -- Items 1-10
  // Present-moment awareness, physical engagement, sensory details, action
  // =========================================================================
  {
    id: 1,
    text: 'I notice small changes in my physical environment that others tend to overlook.',
    scores: { Se: 3, Si: 1, Ni: -1 },
    category: 'perceiving',
  },
  {
    id: 2,
    text: 'I feel most alive when I am physically active or immersed in a hands-on experience.',
    scores: { Se: 3, Fi: -1 },
    category: 'perceiving',
  },
  {
    id: 3,
    text: 'I prefer to act first and reflect later rather than planning everything in advance.',
    scores: { Se: 3, Ni: -1, Te: -1 },
    category: 'perceiving',
  },
  {
    id: 4,
    text: 'I am drawn to vivid sensory experiences such as great food, live music, or striking scenery.',
    scores: { Se: 3, Si: -1 },
    category: 'perceiving',
  },
  {
    id: 5,
    text: 'When something exciting is happening around me I want to jump right in rather than watch from the sidelines.',
    scores: { Se: 3, Si: -1, Ti: -1 },
    category: 'perceiving',
  },
  {
    id: 6,
    text: 'I can quickly read a physical situation and react to what is happening in real time.',
    scores: { Se: 3, Ne: -1 },
    category: 'perceiving',
  },
  {
    id: 7,
    text: 'I get restless when I have to sit still for too long without any physical engagement.',
    scores: { Se: 3, Si: -1 },
    category: 'perceiving',
  },
  {
    id: 8,
    text: 'I enjoy pushing my physical limits through sports, adventure, or hands-on challenges.',
    scores: { Se: 3, Ni: -1 },
    category: 'perceiving',
  },
  {
    id: 9,
    text: 'I pay close attention to textures, colors, and spatial details in my surroundings.',
    scores: { Se: 3, Si: 1, Ne: -1 },
    category: 'perceiving',
  },
  {
    id: 10,
    text: 'I thrive in fast-paced environments that demand quick physical responses.',
    scores: { Se: 3, Ni: -1, Si: -1 },
    category: 'perceiving',
  },

  // =========================================================================
  // Si (Introverted Sensing) -- Items 11-20
  // Past experience recall, tradition, detail memory, comfort with familiar
  // =========================================================================
  {
    id: 11,
    text: 'I have a vivid and detailed memory of past experiences that I can recall almost like reliving them.',
    scores: { Si: 3, Se: -1 },
    category: 'perceiving',
  },
  {
    id: 12,
    text: 'I prefer routines and established methods because they provide a sense of security and reliability.',
    scores: { Si: 3, Ne: -1 },
    category: 'perceiving',
  },
  {
    id: 13,
    text: 'I am quick to notice when something is different from how it was before, even minor details.',
    scores: { Si: 3, Se: 1, Ne: -1 },
    category: 'perceiving',
  },
  {
    id: 14,
    text: 'I trust information more when it has been verified through personal experience or a reliable track record.',
    scores: { Si: 3, Ne: -1, Ni: -1 },
    category: 'perceiving',
  },
  {
    id: 15,
    text: 'Traditions and customs are meaningful to me because they connect the present with the past.',
    scores: { Si: 3, Ne: -1 },
    category: 'perceiving',
  },
  {
    id: 16,
    text: 'I maintain careful records, files, or personal systems to keep track of important details.',
    scores: { Si: 3, Te: 1, Ne: -1 },
    category: 'perceiving',
  },
  {
    id: 17,
    text: 'I am very aware of internal bodily sensations like hunger, fatigue, or physical discomfort.',
    scores: { Si: 3, Se: -1 },
    category: 'perceiving',
  },
  {
    id: 18,
    text: 'When learning something new I compare it with what I already know to see how it fits.',
    scores: { Si: 3, Ti: 1, Ne: -1 },
    category: 'perceiving',
  },
  {
    id: 19,
    text: 'I feel unsettled when familiar processes or environments are changed without clear reason.',
    scores: { Si: 3, Ne: -2 },
    category: 'perceiving',
  },
  {
    id: 20,
    text: 'I can easily recall specific facts, dates, and sequential details from past events.',
    scores: { Si: 3, Se: -1, Ne: -1 },
    category: 'perceiving',
  },

  // =========================================================================
  // Ne (Extraverted Intuition) -- Items 21-30
  // Pattern connections, brainstorming, possibilities, novelty-seeking
  // =========================================================================
  {
    id: 21,
    text: 'My mind naturally jumps from one idea to the next, generating a web of related possibilities.',
    scores: { Ne: 3, Si: -1, Ni: -1 },
    category: 'perceiving',
  },
  {
    id: 22,
    text: 'I am energized by brainstorming sessions where many ideas can be explored without immediate judgment.',
    scores: { Ne: 3, Te: -1, Si: -1 },
    category: 'perceiving',
  },
  {
    id: 23,
    text: 'I frequently see unexpected connections between seemingly unrelated topics or fields.',
    scores: { Ne: 3, Si: -1 },
    category: 'perceiving',
  },
  {
    id: 24,
    text: 'I get bored quickly with routine tasks and constantly seek out new experiences or ideas.',
    scores: { Ne: 3, Si: -2 },
    category: 'perceiving',
  },
  {
    id: 25,
    text: 'When faced with a problem I prefer to explore multiple creative solutions rather than using a proven method.',
    scores: { Ne: 3, Si: -1, Te: -1 },
    category: 'perceiving',
  },
  {
    id: 26,
    text: 'I enjoy playing with hypothetical scenarios and asking "what if" questions.',
    scores: { Ne: 3, Si: -1 },
    category: 'perceiving',
  },
  {
    id: 27,
    text: 'I often start more projects than I finish because new ideas keep capturing my attention.',
    scores: { Ne: 3, Si: -1, Te: -1 },
    category: 'perceiving',
  },
  {
    id: 28,
    text: 'I find patterns and analogies across very different domains and use them to understand new situations.',
    scores: { Ne: 3, Ni: 1, Si: -1 },
    category: 'perceiving',
  },
  {
    id: 29,
    text: 'I am drawn to unconventional ideas and enjoy challenging established assumptions.',
    scores: { Ne: 3, Si: -1, Fe: -1 },
    category: 'perceiving',
  },
  {
    id: 30,
    text: 'When someone shares an idea I immediately think of ways it could be extended, modified, or combined with something else.',
    scores: { Ne: 3, Si: -1 },
    category: 'perceiving',
  },

  // =========================================================================
  // Ni (Introverted Intuition) -- Items 31-40
  // Convergent insights, future vision, symbolic thinking, "just knowing"
  // =========================================================================
  {
    id: 31,
    text: 'I often have sudden insights or realizations that seem to come from nowhere, and they usually turn out to be accurate.',
    scores: { Ni: 3, Se: -1 },
    category: 'perceiving',
  },
  {
    id: 32,
    text: 'I naturally think in terms of long-range implications and where things are heading.',
    scores: { Ni: 3, Se: -1, Si: -1 },
    category: 'perceiving',
  },
  {
    id: 33,
    text: 'I am drawn to symbolism, metaphor, and deeper meanings behind surface-level events.',
    scores: { Ni: 3, Se: -1 },
    category: 'perceiving',
  },
  {
    id: 34,
    text: 'I can sense what is going to happen before it unfolds, even when I cannot explain why.',
    scores: { Ni: 3, Se: -1, Ti: -1 },
    category: 'perceiving',
  },
  {
    id: 35,
    text: 'When considering a topic my mind converges on a single powerful insight rather than diverging into many options.',
    scores: { Ni: 3, Ne: -2 },
    category: 'perceiving',
  },
  {
    id: 36,
    text: 'I spend a lot of time contemplating abstract concepts and envisioning future possibilities.',
    scores: { Ni: 3, Se: -1 },
    category: 'perceiving',
  },
  {
    id: 37,
    text: 'I often know the answer to a problem before I can articulate the logical steps behind it.',
    scores: { Ni: 3, Te: -1, Se: -1 },
    category: 'perceiving',
  },
  {
    id: 38,
    text: 'My dreams and subconscious often provide meaningful insights that inform my waking decisions.',
    scores: { Ni: 3, Se: -1 },
    category: 'perceiving',
  },
  {
    id: 39,
    text: 'I am good at seeing through surface appearances to identify underlying patterns or motives.',
    scores: { Ni: 3, Se: -1, Ne: -1 },
    category: 'perceiving',
  },
  {
    id: 40,
    text: 'I have a strong sense of personal mission or destiny that guides my long-term choices.',
    scores: { Ni: 3, Se: -1, Fi: 1 },
    category: 'perceiving',
  },

  // =========================================================================
  // Te (Extraverted Thinking) -- Items 41-50
  // Efficiency, systems, measurable results, organizing external world
  // =========================================================================
  {
    id: 41,
    text: 'I evaluate ideas primarily by their practical outcomes and measurable results.',
    scores: { Te: 3, Ti: -1, Fi: -1 },
    category: 'judging',
  },
  {
    id: 42,
    text: 'I naturally organize people and resources to achieve goals in the most efficient way possible.',
    scores: { Te: 3, Fi: -1 },
    category: 'judging',
  },
  {
    id: 43,
    text: 'I prefer clear hierarchies, procedures, and accountability structures in teams or organizations.',
    scores: { Te: 3, Ti: -1, Fe: -1 },
    category: 'judging',
  },
  {
    id: 44,
    text: 'When making decisions I rely on objective data and evidence rather than gut feelings.',
    scores: { Te: 3, Fi: -1, Ni: -1 },
    category: 'judging',
  },
  {
    id: 45,
    text: 'I am frustrated by inefficiency and feel compelled to streamline processes when I see waste.',
    scores: { Te: 3, Fi: -1 },
    category: 'judging',
  },
  {
    id: 46,
    text: 'I set specific, measurable goals and track my progress toward them systematically.',
    scores: { Te: 3, Ti: -1, Ne: -1 },
    category: 'judging',
  },
  {
    id: 47,
    text: 'I value direct, concise communication and become impatient with vague or roundabout explanations.',
    scores: { Te: 3, Fe: -1 },
    category: 'judging',
  },
  {
    id: 48,
    text: 'I think in terms of action steps, timelines, and deliverables when approaching a project.',
    scores: { Te: 3, Ti: -1, Ne: -1 },
    category: 'judging',
  },
  {
    id: 49,
    text: 'I am comfortable making tough decisions quickly when the facts clearly point in one direction.',
    scores: { Te: 3, Fi: -1, Fe: -1 },
    category: 'judging',
  },
  {
    id: 50,
    text: 'I believe the best argument is the one backed by verifiable evidence and logical consistency.',
    scores: { Te: 3, Ti: 1, Fi: -1 },
    category: 'judging',
  },

  // =========================================================================
  // Ti (Introverted Thinking) -- Items 51-60
  // Internal logical frameworks, precision, categorization, truth-seeking
  // =========================================================================
  {
    id: 51,
    text: 'I enjoy taking complex systems apart mentally to understand how each piece works.',
    scores: { Ti: 3, Fe: -1 },
    category: 'judging',
  },
  {
    id: 52,
    text: 'I am bothered by logical inconsistencies even when they do not have practical consequences.',
    scores: { Ti: 3, Te: -1, Fe: -1 },
    category: 'judging',
  },
  {
    id: 53,
    text: 'I prefer to build my own understanding from first principles rather than accepting established explanations.',
    scores: { Ti: 3, Si: -1, Te: -1 },
    category: 'judging',
  },
  {
    id: 54,
    text: 'Precision in language matters to me and I often correct definitions or clarify terms in conversations.',
    scores: { Ti: 3, Fe: -1 },
    category: 'judging',
  },
  {
    id: 55,
    text: 'I create internal mental models and frameworks that help me categorize and analyze information.',
    scores: { Ti: 3, Te: -1 },
    category: 'judging',
  },
  {
    id: 56,
    text: 'I would rather have a deep understanding of one topic than a surface-level knowledge of many.',
    scores: { Ti: 3, Ne: -1 },
    category: 'judging',
  },
  {
    id: 57,
    text: 'I question widely accepted beliefs if they do not hold up under rigorous logical analysis.',
    scores: { Ti: 3, Fe: -1, Si: -1 },
    category: 'judging',
  },
  {
    id: 58,
    text: 'I find it satisfying to identify the exact flaw in an argument or the root cause of a problem.',
    scores: { Ti: 3, Fe: -1 },
    category: 'judging',
  },
  {
    id: 59,
    text: 'I often spend a long time thinking through a problem internally before discussing it with others.',
    scores: { Ti: 3, Te: -1, Fe: -1 },
    category: 'judging',
  },
  {
    id: 60,
    text: 'I value internal logical coherence even if the resulting conclusion is impractical or unpopular.',
    scores: { Ti: 3, Te: -1, Fe: -1 },
    category: 'judging',
  },

  // =========================================================================
  // Fe (Extraverted Feeling) -- Items 61-70
  // Group harmony, social cues, consensus, emotional atmosphere management
  // =========================================================================
  {
    id: 61,
    text: 'I instinctively sense the emotional atmosphere of a room the moment I walk in.',
    scores: { Fe: 3, Ti: -1 },
    category: 'judging',
  },
  {
    id: 62,
    text: 'I feel personally responsible for maintaining harmony and resolving conflicts within a group.',
    scores: { Fe: 3, Ti: -1, Fi: -1 },
    category: 'judging',
  },
  {
    id: 63,
    text: 'I naturally adapt my communication style to make others feel comfortable and included.',
    scores: { Fe: 3, Ti: -1 },
    category: 'judging',
  },
  {
    id: 64,
    text: 'Making decisions that could hurt someone feelings is very difficult for me, even when the decision is logical.',
    scores: { Fe: 3, Te: -1, Ti: -1 },
    category: 'judging',
  },
  {
    id: 65,
    text: 'I often prioritize group consensus and cooperation over individual preferences, including my own.',
    scores: { Fe: 3, Fi: -2 },
    category: 'judging',
  },
  {
    id: 66,
    text: 'I am skilled at encouraging others and bringing out the best in people through emotional support.',
    scores: { Fe: 3, Ti: -1 },
    category: 'judging',
  },
  {
    id: 67,
    text: 'I feel uncomfortable when social norms are violated, even when no one is directly harmed.',
    scores: { Fe: 3, Ti: -1, Fi: -1 },
    category: 'judging',
  },
  {
    id: 68,
    text: 'I express my emotions openly and find it easy to talk about how I feel with others.',
    scores: { Fe: 3, Ti: -1, Fi: -1 },
    category: 'judging',
  },
  {
    id: 69,
    text: 'I consider the impact on relationships before making any significant decision.',
    scores: { Fe: 3, Te: -1 },
    category: 'judging',
  },
  {
    id: 70,
    text: 'I find it rewarding to organize social events or create experiences that bring people together.',
    scores: { Fe: 3, Ti: -1 },
    category: 'judging',
  },

  // =========================================================================
  // Fi (Introverted Feeling) -- Items 71-80
  // Personal values, authenticity, moral compass, emotional depth
  // =========================================================================
  {
    id: 71,
    text: 'I have a strong inner sense of right and wrong that guides my decisions regardless of external pressure.',
    scores: { Fi: 3, Fe: -1, Te: -1 },
    category: 'judging',
  },
  {
    id: 72,
    text: 'Authenticity is extremely important to me; I would rather be disliked for who I am than liked for who I am not.',
    scores: { Fi: 3, Fe: -2 },
    category: 'judging',
  },
  {
    id: 73,
    text: 'I experience emotions deeply and intensely, even if I do not always show them outwardly.',
    scores: { Fi: 3, Fe: -1, Te: -1 },
    category: 'judging',
  },
  {
    id: 74,
    text: 'I am strongly affected when I see someone treated unfairly, even if I am not personally involved.',
    scores: { Fi: 3, Te: -1 },
    category: 'judging',
  },
  {
    id: 75,
    text: 'I need to feel that my work aligns with my personal values for it to be fulfilling.',
    scores: { Fi: 3, Te: -1 },
    category: 'judging',
  },
  {
    id: 76,
    text: 'I find it difficult to conform to social expectations that conflict with my deeply held beliefs.',
    scores: { Fi: 3, Fe: -2 },
    category: 'judging',
  },
  {
    id: 77,
    text: 'I spend time reflecting on my own emotions and motivations to understand myself better.',
    scores: { Fi: 3, Te: -1 },
    category: 'judging',
  },
  {
    id: 78,
    text: 'I feel a deep personal connection to causes or issues that resonate with my core values.',
    scores: { Fi: 3, Fe: -1 },
    category: 'judging',
  },
  {
    id: 79,
    text: 'I have difficulty compromising on matters that touch my fundamental sense of ethics.',
    scores: { Fi: 3, Fe: -1, Te: -1 },
    category: 'judging',
  },
  {
    id: 80,
    text: 'I evaluate people and situations through a deeply personal moral lens rather than shared social standards.',
    scores: { Fi: 3, Fe: -2 },
    category: 'judging',
  },
];

// ---------------------------------------------------------------------------
// Cognitive Function Descriptions
// ---------------------------------------------------------------------------

export const functionDescriptions: FunctionDescription[] = [
  {
    code: 'Se',
    name: 'Extraverted Sensing',
    description:
      'Focuses on immediate sensory experience and the external physical world. Se users are attuned to what is happening right now and respond quickly to concrete realities.',
    strengths: [
      'Acute awareness of the physical environment',
      'Quick reflexes and adaptability in the moment',
      'Strong aesthetic sense and appreciation for sensory detail',
      'Ability to stay grounded and present',
      'Natural skill in hands-on, physical activities',
    ],
    blindSpots: [
      'May overlook long-term consequences in favor of immediate action',
      'Can become restless or bored without sufficient stimulation',
      'May struggle with abstract or theoretical planning',
      'Risk of overindulgence in sensory pleasures',
      'Can miss deeper symbolic or hidden meanings',
    ],
  },
  {
    code: 'Si',
    name: 'Introverted Sensing',
    description:
      'Stores and recalls detailed impressions of past experiences, creating a rich internal library. Si users compare present situations against this archive to guide decisions and maintain continuity.',
    strengths: [
      'Excellent detailed memory and recall of past events',
      'Reliability and consistency in following through on commitments',
      'Strong sense of tradition and established best practices',
      'Keen awareness of internal bodily states and well-being',
      'Ability to notice subtle changes or discrepancies from the norm',
    ],
    blindSpots: [
      'May resist change or new approaches when familiar methods exist',
      'Can become overly attached to "how things have always been done"',
      'May struggle to generate novel or unconventional ideas',
      'Risk of being too cautious or conservative',
      'Can have difficulty adapting when the environment shifts rapidly',
    ],
  },
  {
    code: 'Ne',
    name: 'Extraverted Intuition',
    description:
      'Scans the external world for patterns, possibilities, and connections between ideas. Ne users see potential everywhere and thrive on generating alternatives and exploring the unknown.',
    strengths: [
      'Exceptional brainstorming and idea generation',
      'Ability to see hidden connections across disparate fields',
      'Comfort with ambiguity and open-ended exploration',
      'Strong capacity for innovation and creative problem-solving',
      'Enthusiasm that inspires others to explore new directions',
    ],
    blindSpots: [
      'May struggle to follow through on ideas once the novelty fades',
      'Can become scattered by pursuing too many possibilities at once',
      'May overlook practical details and implementation requirements',
      'Risk of undervaluing proven methods in favor of untested ones',
      'Can find routine or repetitive tasks deeply draining',
    ],
  },
  {
    code: 'Ni',
    name: 'Introverted Intuition',
    description:
      'Synthesizes information beneath conscious awareness into convergent insights about the future. Ni users experience "aha" moments and have a strong sense of how things will unfold.',
    strengths: [
      'Powerful ability to foresee trends and long-term outcomes',
      'Deep insight that often proves accurate even without clear evidence',
      'Talent for distilling complexity into a single guiding vision',
      'Comfort with symbolic and abstract thinking',
      'Strong strategic and visionary planning capacity',
    ],
    blindSpots: [
      'May have difficulty explaining how they arrived at a conclusion',
      'Can become too detached from present-moment realities',
      'Risk of tunnel vision when fixated on a single interpretation',
      'May dismiss concrete data that contradicts their intuitive sense',
      'Can appear enigmatic or inaccessible to others',
    ],
  },
  {
    code: 'Te',
    name: 'Extraverted Thinking',
    description:
      'Organizes the external world through logic, structure, and efficiency. Te users focus on measurable outcomes, clear processes, and getting things done in the most effective way.',
    strengths: [
      'Excellent at creating and optimizing systems and processes',
      'Strong capacity for decisive action based on objective criteria',
      'Natural ability to organize people and resources toward goals',
      'Comfort with data-driven decision making',
      'Clear, direct, and efficient communication style',
    ],
    blindSpots: [
      'May undervalue subjective or emotional considerations in decisions',
      'Can come across as overly blunt or impersonal',
      'Risk of prioritizing efficiency over the well-being of individuals',
      'May struggle with ambiguity or situations that lack clear metrics',
      'Can be overly focused on control and structure',
    ],
  },
  {
    code: 'Ti',
    name: 'Introverted Thinking',
    description:
      'Builds precise internal logical frameworks to understand how things work. Ti users seek consistency, accuracy, and deep comprehension, often analyzing systems from first principles.',
    strengths: [
      'Exceptional analytical and problem-solving abilities',
      'Strong capacity for independent, rigorous thinking',
      'Talent for identifying logical flaws and inconsistencies',
      'Ability to construct elegant, coherent mental models',
      'Deep understanding of complex systems and concepts',
    ],
    blindSpots: [
      'May over-analyze at the expense of taking timely action',
      'Can struggle to communicate complex ideas in accessible terms',
      'Risk of dismissing others ideas if they are not logically airtight',
      'May neglect social or emotional dimensions of a situation',
      'Can become isolated by spending too much time in internal analysis',
    ],
  },
  {
    code: 'Fe',
    name: 'Extraverted Feeling',
    description:
      'Attunes to the emotional states and social dynamics of others to create harmony and connection. Fe users naturally manage group morale and navigate interpersonal situations.',
    strengths: [
      'Highly skilled at reading and responding to others emotions',
      'Natural talent for creating inclusive, harmonious environments',
      'Strong communication and conflict-resolution abilities',
      'Ability to motivate and inspire groups toward shared goals',
      'Genuine warmth and responsiveness to others needs',
    ],
    blindSpots: [
      'May suppress personal needs to maintain group harmony',
      'Can become overly dependent on external validation',
      'Risk of being manipulative when harmony is prioritized above honesty',
      'May struggle to make decisions that disappoint others',
      'Can lose sight of personal identity when focused on social dynamics',
    ],
  },
  {
    code: 'Fi',
    name: 'Introverted Feeling',
    description:
      'Evaluates everything through a deeply personal value system and moral compass. Fi users have intense emotional depth and a strong drive toward authenticity and personal integrity.',
    strengths: [
      'Unwavering commitment to personal values and ethics',
      'Deep empathy and compassion rooted in personal experience',
      'Strong sense of individual identity and authenticity',
      'Ability to stand firm on principles under pressure',
      'Rich inner emotional life that fuels creative expression',
    ],
    blindSpots: [
      'May have difficulty articulating feelings or values to others',
      'Can appear stubborn or uncompromising on ethical matters',
      'Risk of withdrawing from situations that conflict with core values',
      'May take criticism of beliefs very personally',
      'Can struggle with group expectations that feel inauthentic',
    ],
  },
];

// ---------------------------------------------------------------------------
// Type Stacks (Dominant, Auxiliary, Tertiary, Inferior)
// ---------------------------------------------------------------------------

export const typeStacks: Record<string, string[]> = {
  INTJ: ['Ni', 'Te', 'Fi', 'Se'],
  INTP: ['Ti', 'Ne', 'Si', 'Fe'],
  ENTJ: ['Te', 'Ni', 'Se', 'Fi'],
  ENTP: ['Ne', 'Ti', 'Fe', 'Si'],
  INFJ: ['Ni', 'Fe', 'Ti', 'Se'],
  INFP: ['Fi', 'Ne', 'Si', 'Te'],
  ENFJ: ['Fe', 'Ni', 'Se', 'Ti'],
  ENFP: ['Ne', 'Fi', 'Te', 'Si'],
  ISTJ: ['Si', 'Te', 'Fi', 'Ne'],
  ISFJ: ['Si', 'Fe', 'Ti', 'Ne'],
  ESTJ: ['Te', 'Si', 'Ne', 'Fi'],
  ESFJ: ['Fe', 'Si', 'Ne', 'Ti'],
  ISTP: ['Ti', 'Se', 'Ni', 'Fe'],
  ISFP: ['Fi', 'Se', 'Ni', 'Te'],
  ESTP: ['Se', 'Ti', 'Fe', 'Ni'],
  ESFP: ['Se', 'Fi', 'Te', 'Ni'],
};
