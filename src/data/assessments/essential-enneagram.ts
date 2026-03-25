// ---------------------------------------------------------------------------
// Essential Enneagram -- Paragraph Identification Assessment
// Inspired by the Daniels / Price "Essential Enneagram" approach.
// Paragraphs are ORIGINAL compositions grounded in Riso-Hudson, Naranjo, and
// Daniels theory. They do NOT name the type so the reader self-identifies
// without bias.
// ---------------------------------------------------------------------------

export interface TypeParagraph {
  typeNumber: number;
  paragraph: string;
}

export const essentialParagraphs: TypeParagraph[] = [
  {
    typeNumber: 1,
    paragraph:
      'I have a deep sense of purpose rooted in doing what is right and improving the world around me. ' +
      'There is an inner voice that continually measures reality against an ideal standard, and I feel a strong responsibility to close that gap. ' +
      'I work hard, pay attention to details, and hold myself to the same high expectations I have for everything else. ' +
      'Frustration or resentment can build when others seem careless or when I suppress my own needs in favor of duty. ' +
      'In relationships I am dependable and principled, though I sometimes struggle to relax and accept things as they are.',
  },
  {
    typeNumber: 2,
    paragraph:
      'Connecting with people and being genuinely helpful is at the center of who I am. ' +
      'I instinctively sense what others need, often before they ask, and I find deep satisfaction in being someone people can count on. ' +
      'My own worth sometimes feels tied to how much I am appreciated, and I can become hurt or resentful when my efforts go unrecognized. ' +
      'I tend to put others first and may have difficulty identifying or expressing my own needs directly. ' +
      'In relationships I am warm, generous, and emotionally attuned, yet I sometimes give more than is healthy for me.',
  },
  {
    typeNumber: 3,
    paragraph:
      'I am naturally driven to achieve, excel, and present the best version of myself to the world. ' +
      'Goals energize me; I adapt quickly, read the room, and know how to make things happen efficiently. ' +
      'My sense of identity can become entangled with my accomplishments, and I sometimes lose touch with what I genuinely feel beneath the image I project. ' +
      'Slowing down feels uncomfortable because stillness confronts me with the question of who I am apart from what I do. ' +
      'In relationships I am enthusiastic and motivating, though I may unconsciously prioritize appearances over emotional depth.',
  },
  {
    typeNumber: 4,
    paragraph:
      'I experience life through a rich and intense emotional landscape, and authenticity matters to me more than almost anything. ' +
      'There is a persistent sense that something essential is missing, which fuels both my creativity and a longing I cannot always name. ' +
      'I am drawn to beauty, meaning, and depth, and I find the ordinary or superficial difficult to tolerate for long. ' +
      'My moods can shift dramatically; I may withdraw when I feel misunderstood or when envy of others\' seemingly easier lives surfaces. ' +
      'In relationships I crave deep emotional connection and am profoundly empathic, though I can become absorbed in my own inner world.',
  },
  {
    typeNumber: 5,
    paragraph:
      'Understanding how things work is my primary way of engaging with the world, and I need ample time alone to think, observe, and recharge. ' +
      'I tend to conserve my energy and resources, preferring to be self-sufficient rather than dependent on others. ' +
      'Emotional demands and intrusions into my private space feel draining, so I instinctively create boundaries that protect my inner world. ' +
      'I gather knowledge in depth and feel most confident when I have thoroughly mastered a subject before acting. ' +
      'In relationships I am loyal and insightful but can appear detached, because I process feelings internally rather than expressing them in the moment.',
  },
  {
    typeNumber: 6,
    paragraph:
      'I have a vigilant mind that is constantly scanning for what could go wrong, which makes me both a reliable troubleshooter and someone who wrestles with doubt. ' +
      'Trust is something I build carefully; I test situations and people before I fully commit, yet once my loyalty is given it is fierce. ' +
      'I can oscillate between caution and bold, sometimes defiant, action -- especially when I feel cornered or when my anxiety becomes intolerable. ' +
      'Authority is complicated for me: I may question it outwardly, seek it for reassurance, or do both at different times. ' +
      'In relationships I am warm, witty, and deeply committed, though my tendency to anticipate worst-case scenarios can create tension.',
  },
  {
    typeNumber: 7,
    paragraph:
      'I am drawn to possibilities, new experiences, and the sheer variety life has to offer, and I keep my options open whenever I can. ' +
      'My mind moves quickly, connecting ideas and generating plans that keep the future feeling bright and stimulating. ' +
      'Sitting with pain, limitation, or boredom is genuinely difficult for me, so I instinctively reframe negatives and seek the next adventure. ' +
      'I can overcommit, spread myself thin, or leave things unfinished when the initial excitement fades. ' +
      'In relationships I am playful, energizing, and optimistic, but I may avoid the heavier emotional conversations that intimacy sometimes requires.',
  },
  {
    typeNumber: 8,
    paragraph:
      'I move through the world with intensity, directness, and a determination to protect myself and the people I care about. ' +
      'I trust my gut instincts, act decisively, and have little patience for indirectness or manipulation. ' +
      'Control matters to me -- not for its own sake, but because vulnerability feels dangerous and I refuse to be at anyone\'s mercy. ' +
      'My energy can be overwhelming to others, and I sometimes realize too late that I have steamrolled someone I did not intend to hurt. ' +
      'In relationships I am fiercely loyal and protective, and I respect those who stand their ground with me rather than backing down.',
  },
  {
    typeNumber: 9,
    paragraph:
      'Harmony and inner peace are what I value most, and I have a natural ability to see every side of a situation without judgment. ' +
      'I tend to merge with the preferences and agendas of the people around me, sometimes losing sight of my own priorities in the process. ' +
      'Conflict and pressure feel deeply uncomfortable, so I may numb out, procrastinate, or go along to get along rather than assert what I truly want. ' +
      'There is a quiet stubbornness beneath my easygoing surface -- I resist being pushed even as I avoid open confrontation. ' +
      'In relationships I am accepting, patient, and a calming presence, yet I struggle to stay awake to my own desires and take direct action on my own behalf.',
  },
];

// ---------------------------------------------------------------------------
// Narrowing questions -- used after the user picks their top 2-3 paragraphs
// to disambiguate commonly confused types.
// ---------------------------------------------------------------------------

export interface NarrowingQuestion {
  /** Which types this question helps distinguish between */
  types: number[];
  question: string;
  options: { text: string; scores: Record<number, number> }[];
}

export const narrowingQuestions: NarrowingQuestion[] = [
  // ---- 1 vs 6 ----
  {
    types: [1, 6],
    question:
      'When you notice something is wrong in a situation, what is your first inner response?',
    options: [
      {
        text: 'I feel an immediate impulse to correct it and bring things back to the right standard.',
        scores: { 1: 2, 6: 0 },
      },
      {
        text: 'I start thinking about the potential risks and who I can trust to help address it.',
        scores: { 1: 0, 6: 2 },
      },
      {
        text: 'I feel both -- a desire to fix it and anxiety about the consequences.',
        scores: { 1: 1, 6: 1 },
      },
    ],
  },

  // ---- 2 vs 9 ----
  {
    types: [2, 9],
    question:
      'When a friend is going through a hard time, how do you typically respond?',
    options: [
      {
        text: 'I step in actively -- I call them, bring them something, and make sure they know I am there.',
        scores: { 2: 2, 9: 0 },
      },
      {
        text: 'I create a calm, accepting space for them and let them come to me when they are ready.',
        scores: { 2: 0, 9: 2 },
      },
      {
        text: 'I offer support but tend to mirror whatever energy they bring rather than leading with my own.',
        scores: { 2: 0, 9: 2 },
      },
    ],
  },

  // ---- 3 vs 7 ----
  {
    types: [3, 7],
    question:
      'What drives your busy, high-energy lifestyle more?',
    options: [
      {
        text: 'The desire to accomplish meaningful goals and be recognized for my results.',
        scores: { 3: 2, 7: 0 },
      },
      {
        text: 'The excitement of new experiences, ideas, and keeping life interesting.',
        scores: { 3: 0, 7: 2 },
      },
      {
        text: 'A mix -- I want to succeed AND keep things fun and stimulating.',
        scores: { 3: 1, 7: 1 },
      },
    ],
  },

  // ---- 4 vs 6 ----
  {
    types: [4, 6],
    question:
      'When you feel anxious or unsettled, where does your attention go?',
    options: [
      {
        text: 'Inward -- I examine my emotions, search for what feels missing, and try to understand myself more deeply.',
        scores: { 4: 2, 6: 0 },
      },
      {
        text: 'Outward -- I scan the environment for threats, seek reassurance, or prepare contingency plans.',
        scores: { 4: 0, 6: 2 },
      },
      {
        text: 'Both, but I usually start by questioning whether I can trust the situation.',
        scores: { 4: 0, 6: 2 },
      },
    ],
  },

  // ---- 5 vs 9 ----
  {
    types: [5, 9],
    question:
      'When you withdraw from social interaction, what is usually happening inside?',
    options: [
      {
        text: 'My mind is highly active -- I am analyzing, researching, or deeply focused on something I find fascinating.',
        scores: { 5: 2, 9: 0 },
      },
      {
        text: 'I am seeking comfort and peace -- I drift into familiar routines, daydreams, or low-key activities.',
        scores: { 5: 0, 9: 2 },
      },
      {
        text: 'I want to conserve energy, though I am not sure if it is to think more or just to decompress.',
        scores: { 5: 1, 9: 1 },
      },
    ],
  },

  // ---- 2 vs 6 ----
  {
    types: [2, 6],
    question:
      'What is the main reason you put so much effort into being there for others?',
    options: [
      {
        text: 'I genuinely need to feel loved and appreciated, and helping others is how I earn that closeness.',
        scores: { 2: 2, 6: 0 },
      },
      {
        text: 'Loyalty and mutual support are central to my values -- I show up because I want to know others would do the same for me.',
        scores: { 2: 0, 6: 2 },
      },
      {
        text: 'Both feel true, but if I am honest the fear of being abandoned drives me more than anything.',
        scores: { 2: 1, 6: 1 },
      },
    ],
  },

  // ---- 4 vs 9 ----
  {
    types: [4, 9],
    question:
      'How would you describe your relationship with your own emotions?',
    options: [
      {
        text: 'My emotions are vivid and central to my identity -- I would rather feel pain than feel nothing at all.',
        scores: { 4: 2, 9: 0 },
      },
      {
        text: 'I tend to dampen or set aside strong emotions to keep my inner equilibrium and avoid disruption.',
        scores: { 4: 0, 9: 2 },
      },
      {
        text: 'I feel things deeply but often do not act on them because it feels like too much effort or conflict.',
        scores: { 4: 1, 9: 1 },
      },
    ],
  },

  // ---- 1 vs 3 ----
  {
    types: [1, 3],
    question:
      'When you complete a project, what matters most to you about the result?',
    options: [
      {
        text: 'That it was done correctly and meets a high ethical or quality standard, regardless of recognition.',
        scores: { 1: 2, 3: 0 },
      },
      {
        text: 'That it is impressive, successful, and seen as excellent by the people whose opinions I value.',
        scores: { 1: 0, 3: 2 },
      },
      {
        text: 'Both quality and impact matter, but I notice I adjust my standards based on what will be most effective.',
        scores: { 1: 0, 3: 2 },
      },
    ],
  },

  // ---- 3 vs 8 ----
  {
    types: [3, 8],
    question:
      'In a group setting, what role do you naturally gravitate toward?',
    options: [
      {
        text: 'The achiever who sets the pace, rallies the team, and makes sure we hit our targets.',
        scores: { 3: 2, 8: 0 },
      },
      {
        text: 'The one who takes charge, protects the group, and confronts obstacles head-on.',
        scores: { 3: 0, 8: 2 },
      },
      {
        text: 'I lead, but my style shifts depending on whether influence or control is more useful in the moment.',
        scores: { 3: 1, 8: 1 },
      },
    ],
  },

  // ---- 5 vs 1 ----
  {
    types: [1, 5],
    question:
      'When you have strong opinions, how do you typically handle them?',
    options: [
      {
        text: 'I feel compelled to share them because I believe things should be done the right way.',
        scores: { 1: 2, 5: 0 },
      },
      {
        text: 'I keep them mostly to myself unless someone specifically asks or I feel fully prepared to defend my position.',
        scores: { 1: 0, 5: 2 },
      },
      {
        text: 'I share selectively -- only when I feel both knowledgeable and morally justified.',
        scores: { 1: 1, 5: 1 },
      },
    ],
  },

  // ---- 6 vs 9 ----
  {
    types: [6, 9],
    question:
      'When a big decision looms, what slows you down the most?',
    options: [
      {
        text: 'I keep imagining what could go wrong and question whether I have enough information to commit.',
        scores: { 6: 2, 9: 0 },
      },
      {
        text: 'I lose track of what I actually want because every option seems equally valid -- or equally unimportant.',
        scores: { 6: 0, 9: 2 },
      },
      {
        text: 'I feel a mix of worry about the outcome and a desire to just avoid the whole decision.',
        scores: { 6: 1, 9: 1 },
      },
    ],
  },

  // ---- 7 vs 9 ----
  {
    types: [7, 9],
    question:
      'When life gets stressful, what is your go-to coping strategy?',
    options: [
      {
        text: 'I plan something exciting, pivot to a new project, or reframe the situation so it feels more positive.',
        scores: { 7: 2, 9: 0 },
      },
      {
        text: 'I tune out -- I might binge a show, snack, or lose myself in a comforting routine until it passes.',
        scores: { 7: 0, 9: 2 },
      },
      {
        text: 'I distract myself either way, but my distractions tend to be stimulating rather than soothing.',
        scores: { 7: 2, 9: 0 },
      },
    ],
  },

  // ---- 2 vs 4 ----
  {
    types: [2, 4],
    question:
      'When you feel unappreciated, what rises to the surface first?',
    options: [
      {
        text: 'I feel hurt that my giving was not returned and I become more insistent about being needed.',
        scores: { 2: 2, 4: 0 },
      },
      {
        text: 'I feel a deep sense of being fundamentally different or flawed, and I withdraw into melancholy.',
        scores: { 2: 0, 4: 2 },
      },
      {
        text: 'I oscillate between reaching out more intensely and pulling away to nurse my emotional wounds.',
        scores: { 2: 1, 4: 1 },
      },
    ],
  },

  // ---- 8 vs 1 ----
  {
    types: [1, 8],
    question:
      'When you feel angry, how does it typically come out?',
    options: [
      {
        text: 'I try to contain it and channel it into measured, justified criticism -- losing control feels wrong.',
        scores: { 1: 2, 8: 0 },
      },
      {
        text: 'I express it openly and directly -- suppressing anger feels dishonest and weak.',
        scores: { 1: 0, 8: 2 },
      },
      {
        text: 'I express it forcefully but believe it is righteous -- I am fighting for what is fair.',
        scores: { 1: 1, 8: 1 },
      },
    ],
  },
];
