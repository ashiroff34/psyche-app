export interface TypeParagraph {
  typeNumber: number;
  paragraph: string;
}

export interface NarrowingQuestion {
  types: number[];
  question: string;
  options: { text: string; scores: Record<number, number> }[];
}

export const essentialParagraphs: TypeParagraph[] = [
  {
    typeNumber: 1,
    paragraph: 'I have a deep sense of purpose rooted in doing what is right and improving the world around me.  There is an inner voice that continually measures reality against an ideal standard, and I feel a strong responsibility to close that gap.  I work hard, pay attention to details, and hold myself to the same high expectations I have for everything else.  Frustration or resentment can build when others seem careless or when I suppress my own needs in favor of duty.  In relationships I am dependable and principled, though I sometimes struggle to relax and accept things as they are.',
  },
  {
    typeNumber: 2,
    paragraph: 'Connecting with people and being genuinely helpful is at the center of who I am.  I instinctively sense what others need, often before they ask, and I find deep satisfaction in being someone people can count on.  My own worth sometimes feels tied to how much I am appreciated, and I can become hurt or resentful when my efforts go unrecognized.  I tend to put others first and may have difficulty identifying or expressing my own needs directly.  In relationships I am warm, generous, and emotionally attuned, yet I sometimes give more than is healthy for me.',
  },
  {
    typeNumber: 3,
    paragraph: 'I am naturally driven to achieve, excel, and present the best version of myself to the world.  Goals energize me; I adapt quickly, read the room, and know how to make things happen efficiently.  My sense of identity can become entangled with my accomplishments, and I sometimes lose touch with what I genuinely feel beneath the image I project.  Slowing down feels uncomfortable because stillness confronts me with the question of who I am apart from what I do.  In relationships I am enthusiastic and motivating, though I may unconsciously prioritize appearances over emotional depth.',
  },
  {
    typeNumber: 4,
    paragraph: 'I experience life through a rich and intense emotional landscape, and authenticity matters to me more than almost anything.  There is a persistent sense that something essential is missing — a longing I cannot always name but that shapes everything.  I am drawn to beauty, meaning, and depth, and I find the ordinary or superficial difficult to tolerate for long.  Envy, in the Enneagram sense, is part of my structure: a painful awareness that others seem to have something I lack.  I build my identity around what makes me unique, and I can swing between feeling special and feeling fundamentally deficient.  In relationships I seek depth and true understanding, yet I often push people away when they get close — afraid that being fully known will reveal the deficiency I most fear.  I would rather feel something real than nothing at all.',
  },
  {
    typeNumber: 5,
    paragraph: 'Understanding how things work is my primary way of engaging with the world, and I need ample time alone to think, observe, and recharge.  I tend to conserve my energy and resources, preferring to be self-sufficient rather than dependent on others.  Emotional demands and intrusions into my private space feel draining, so I instinctively create boundaries that protect my inner world.  I gather knowledge in depth and feel most confident when I have thoroughly mastered a subject before acting.  In relationships I am loyal and insightful but can appear detached, because I process feelings internally rather than expressing them in the moment.',
  },
  {
    typeNumber: 6,
    paragraph: 'I have a vigilant mind that is constantly scanning for what could go wrong, which makes me both a reliable troubleshooter and someone who wrestles with doubt.  Trust is something I build carefully; I test situations and people before I fully commit, yet once my loyalty is given it is fierce.  I can oscillate between caution and bold, sometimes defiant, action -- especially when I feel cornered or when my anxiety becomes intolerable.  Authority is complicated for me: I may question it outwardly, seek it for reassurance, or do both at different times.  In relationships I am warm, witty, and deeply committed, though my tendency to anticipate worst-case scenarios can create tension.',
  },
  {
    typeNumber: 7,
    paragraph: 'I am drawn to possibilities, new experiences, and the sheer variety life has to offer, and I keep my options open whenever I can.  My mind moves quickly, connecting ideas and generating plans that keep the future feeling bright and stimulating.  Sitting with pain, limitation, or boredom is genuinely difficult for me, so I instinctively reframe negatives and seek the next adventure.  I can overcommit, spread myself thin, or leave things unfinished when the initial excitement fades.  In relationships I am playful, energizing, and optimistic, but I may avoid the heavier emotional conversations that intimacy sometimes requires.',
  },
  {
    typeNumber: 8,
    paragraph: 'I move through the world with intensity, directness, and a determination to protect myself and the people I care about.  I trust my gut instincts, act decisively, and have little patience for indirectness or manipulation.  I learned early — or simply know in my bones — that the world is tough and you must be tougher to survive it.  Vulnerability feels dangerous, so I test people, push against limits, and confront rather than accommodate.  The anger and force that others find overwhelming is, for me, simply the energy of being fully alive.  Beneath the power is a tenderness I rarely show, because showing it feels like handing someone a weapon.  I protect the people I love fiercely, sometimes more than they want.  In relationships I am loyal and magnetic, but I struggle to let anyone see the softer self I guard so carefully.',
  },
  {
    typeNumber: 9,
    paragraph: 'Harmony and inner peace are what I value most, and I have a natural ability to see every side of a situation without judgment.  I tend to merge with the preferences and agendas of the people around me, sometimes losing sight of my own priorities in the process.  Conflict and pressure feel deeply uncomfortable, so I may numb out, procrastinate, or go along to get along rather than assert what I truly want.  There is a quiet stubbornness beneath my easygoing surface -- I resist being pushed even as I avoid open confrontation.  In relationships I am accepting, patient, and a calming presence, yet I struggle to stay awake to my own desires and take direct action on my own behalf.',
  },
];

export const narrowingQuestions: NarrowingQuestion[] = [
  {
    types: [1, 6],
    question: 'When you notice something is wrong in a situation, what is your first inner response?',
    options: [
      { text: 'I feel an immediate impulse to correct it and bring things back to the right standard.', scores: { '1': 2 } },
      { text: 'I worry about the implications, scan for danger, and look for who is responsible.', scores: { '6': 2 } },
    ],
  },
  {
    types: [2, 9],
    question: 'When a friend is going through a hard time, how do you typically respond?',
    options: [
      { text: 'I step in actively — I call them, bring them something, and make sure they know I am there.', scores: { '2': 2 } },
      { text: 'I am present and supportive but follow their lead, letting them set the pace.', scores: { '9': 2 } },
    ],
  },
  {
    types: [3, 7],
    question: 'What drives your busy, high-energy lifestyle more?',
    options: [
      { text: 'The desire to accomplish meaningful goals and be recognized for my results.', scores: { '3': 2 } },
      { text: 'The thrill of possibilities and keeping life stimulating and full of options.', scores: { '7': 2 } },
    ],
  },
  {
    types: [4, 6],
    question: 'When you feel anxious or unsettled, where does your attention go?',
    options: [
      { text: 'Inward — I examine my emotions, search for what feels missing, and try to understand myself more deeply.', scores: { '4': 2 } },
      { text: 'Outward — I look for reassurance, analyze threats, or try to stay alert to what could go wrong.', scores: { '6': 2 } },
    ],
  },
  {
    types: [5, 9],
    question: 'When you withdraw from social interaction, what is usually happening inside?',
    options: [
      { text: 'My mind is highly active — I am analyzing, researching, or deeply focused on something I find fascinating.', scores: { '5': 2 } },
      { text: 'I feel a comfortable inner stillness; I am just recovering and letting my mind go quiet.', scores: { '9': 2 } },
    ],
  },
  {
    types: [2, 6],
    question: 'What is the main reason you put so much effort into being there for others?',
    options: [
      { text: 'I genuinely need to feel loved and appreciated, and helping others is how I earn that closeness.', scores: { '2': 2 } },
      { text: 'I want to be reliable and trustworthy — knowing people can count on me feels safe.', scores: { '6': 2 } },
    ],
  },
  {
    types: [4, 9],
    question: 'How would you describe your relationship with your own emotions?',
    options: [
      { text: 'My emotions are vivid and central to my identity — I would rather feel pain than feel nothing at all.', scores: { '4': 2 } },
      { text: 'I often feel a gentle numbness; my emotions are there but I can tune them out to keep the peace.', scores: { '9': 2 } },
    ],
  },
  {
    types: [1, 3],
    question: 'When you complete a project, what matters most to you about the result?',
    options: [
      { text: 'That it was done correctly and meets a high ethical or quality standard, regardless of recognition.', scores: { '1': 2 } },
      { text: 'That it achieved impressive results and others can see the quality of my work.', scores: { '3': 2 } },
    ],
  },
  {
    types: [3, 8],
    question: 'In a group setting, what role do you naturally gravitate toward?',
    options: [
      { text: 'The achiever who sets the pace, rallies the team, and makes sure we hit our targets.', scores: { '3': 2 } },
      { text: 'The one who takes charge directly, removes obstacles, and refuses to be pushed around.', scores: { '8': 2 } },
    ],
  },
  {
    types: [1, 5],
    question: 'When you have strong opinions, how do you typically handle them?',
    options: [
      { text: 'I feel compelled to share them because I believe things should be done the right way.', scores: { '1': 2 } },
      { text: 'I hold them privately, preferring to think them through fully before speaking.', scores: { '5': 2 } },
    ],
  },
  {
    types: [6, 9],
    question: 'When a big decision looms, what slows you down the most?',
    options: [
      { text: 'I keep imagining what could go wrong and question whether I have enough information to commit.', scores: { '6': 2 } },
      { text: 'I feel overwhelmed by the options and naturally drift toward whatever requires the least disruption.', scores: { '9': 2 } },
    ],
  },
  {
    types: [7, 9],
    question: 'When life gets stressful, what is your go-to coping strategy?',
    options: [
      { text: 'I plan something exciting, pivot to a new project, or reframe the situation so it feels more positive.', scores: { '7': 2 } },
      { text: 'I withdraw, slow down, zone out, or fall back into a comfortable routine.', scores: { '9': 2 } },
    ],
  },
  {
    types: [2, 4],
    question: 'When you feel unappreciated, what rises to the surface first?',
    options: [
      { text: 'I feel hurt that my giving was not returned and I become more insistent about being needed.', scores: { '2': 2 } },
      { text: 'I feel a deep sadness and a sense of not being truly seen for who I really am.', scores: { '4': 2 } },
    ],
  },
  {
    types: [1, 8],
    question: 'When you feel angry, how does it typically come out?',
    options: [
      { text: 'I try to contain it and channel it into measured, justified criticism — losing control feels wrong.', scores: { '1': 2 } },
      { text: 'It comes out directly and intensely — I confront the issue head-on without holding back.', scores: { '8': 2 } },
    ],
  },
];