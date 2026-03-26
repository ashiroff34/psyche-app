export interface MistypePair {
  typeA: number;
  typeB: number;
  commonConfusion: string;
  questions: {
    text: string;
    optionA: { text: string; leansToward: number };
    optionB: { text: string; leansToward: number };
  }[];
}

export const mistypePairs: MistypePair[] = [
  {
    typeA: 1,
    typeB: 6,
    commonConfusion: 'Both types are dutiful, rule-following, and anxious. Both experience a strong inner critic and feel compelled to do the right thing. The key difference is SOURCE: Ones generate their standards internally from a sense of moral clarity, while Sixes adopt external standards because the world feels dangerous and they need structure for security. Ones are angry that the world isn\'t good enough; Sixes are afraid that the world isn\'t safe enough.',
    questions: [
      {
        text: 'When you follow rules, what is the primary feeling driving you?',
        optionA: { text: 'Moral conviction — I follow rules because they align with my internal sense of what is right, and I feel righteous anger when others break them', leansToward: 1 },
        optionB: { text: 'Security seeking — I follow rules because they create a predictable structure that keeps me safe, and I feel anxious when others break them', leansToward: 6 },
      },
      {
        text: 'When you notice you\'ve made an error, what is your immediate internal experience?',
        optionA: { text: 'Self-directed frustration — I should have known better; I hold myself to a high standard and falling short triggers my inner critic', leansToward: 1 },
        optionB: { text: 'Worry about consequences — what will happen because of this mistake? Will people lose trust in me? What\'s the worst-case scenario?', leansToward: 6 },
      },
      {
        text: 'How do you relate to your own anger?',
        optionA: { text: 'It simmers constantly beneath the surface as a sense of frustration with imperfection — I often don\'t call it anger, I call it being \'right\'', leansToward: 1 },
        optionB: { text: 'It comes out reactively when I feel threatened or cornered — my anger is more like a fight response triggered by fear than a steady moral indignation', leansToward: 6 },
      },
      {
        text: 'When facing a major life decision, what is your process?',
        optionA: { text: 'I consult my own principles and conscience — I know what\'s right and the challenge is having the discipline to follow through', leansToward: 1 },
        optionB: { text: 'I oscillate between options and seek input from trusted people — I second-guess my own judgment and look for external confirmation', leansToward: 6 },
      },
      {
        text: 'What is your relationship with doubt?',
        optionA: { text: 'I rarely doubt what\'s right or wrong — my struggle is more with the discipline to live up to my clear standards and contain my frustration when others don\'t', leansToward: 1 },
        optionB: { text: 'Doubt is the background noise of my life — I constantly question whether I\'m making the right call, whether people are trustworthy, whether I\'m safe', leansToward: 6 },
      },
    ],
  },
  {
    typeA: 2,
    typeB: 9,
    commonConfusion: 'Both types are warm, accommodating, and focused on others. Both suppress their own needs and can appear selfless. The key difference is ENERGY: Twos actively move toward others with a specific agenda of being needed and loved, while Nines passively merge with others because asserting themselves feels like it would create intolerable conflict. Twos know what they want (to be loved) but deny it; Nines genuinely lose contact with what they want.',
    questions: [
      {
        text: 'When you put others first, what is really happening inside you?',
        optionA: { text: 'I\'m very aware of what I\'m giving — I track my generosity and I feel hurt and resentful when it isn\'t reciprocated, even if I don\'t say so', leansToward: 2 },
        optionB: { text: 'I genuinely lose track of my own preferences — I merge so completely with what others want that I often can\'t tell where they end and I begin', leansToward: 9 },
      },
      {
        text: 'How do you experience your own desires and needs?',
        optionA: { text: 'I have strong desires but I channel them through helping others — deep down I know exactly what I want but I feel I have to earn it by giving first', leansToward: 2 },
        optionB: { text: 'My desires feel foggy and hard to access — when asked what I want, I often draw a blank or default to whatever will cause the least friction', leansToward: 9 },
      },
      {
        text: 'What is your energy level like in social situations?',
        optionA: { text: 'High and directed — I actively move toward people, initiate care, and seek out those who need help; I\'m emotionally proactive', leansToward: 2 },
        optionB: { text: 'Steady and diffuse — I\'m pleasant and agreeable but I don\'t actively seek people out; I go along with the flow of the group', leansToward: 9 },
      },
      {
        text: 'When you\'re angry, how does it typically emerge?',
        optionA: { text: 'As pointed emotional confrontation — I can become quite forceful about reminding people of everything I\'ve sacrificed for them', leansToward: 2 },
        optionB: { text: 'As stubborn withdrawal — I become quietly uncooperative, procrastinate, or dig in passively rather than directly expressing anger', leansToward: 9 },
      },
      {
        text: 'What is your relationship with being \'special\' to someone?',
        optionA: { text: 'It\'s essential — I need to be the irreplaceable person in someone\'s life, the one they turn to above all others', leansToward: 2 },
        optionB: { text: 'It\'s not something I actively pursue — I\'d rather everyone feel comfortable and included than be singled out as special', leansToward: 9 },
      },
    ],
  },
  {
    typeA: 3,
    typeB: 7,
    commonConfusion: 'Both types are energetic, optimistic, forward-moving, and accomplished. Both avoid negative feelings and maintain a positive exterior. The key difference is FOCUS: Threes are laser-focused on specific goals and how they appear to others while achieving them, while Sevens are expansively focused on keeping all options open and experiencing as much as possible. Threes fear being worthless; Sevens fear being trapped in pain.',
    questions: [
      {
        text: 'When you accomplish something significant, what is most satisfying?',
        optionA: { text: 'The recognition — knowing that others see me as successful and admirable makes the effort worthwhile', leansToward: 3 },
        optionB: { text: 'The experience itself — the thrill of doing something exciting, and the fact that it opens doors to even more possibilities', leansToward: 7 },
      },
      {
        text: 'How do you handle a project that has become boring and tedious?',
        optionA: { text: 'I push through with discipline — if completing it will enhance my reputation or move me toward success, I can grind through anything', leansToward: 3 },
        optionB: { text: 'I struggle to stay engaged — my mind starts generating exciting alternatives and I feel an almost physical pull toward something new', leansToward: 7 },
      },
      {
        text: 'What is your relationship with failure?',
        optionA: { text: 'It\'s devastating to my identity — failure means I\'m not as valuable as I believed, and I\'ll do almost anything to avoid being seen as unsuccessful', leansToward: 3 },
        optionB: { text: 'I reframe it quickly — I spin failures into learning experiences and move on fast because dwelling on negativity feels suffocating', leansToward: 7 },
      },
      {
        text: 'How do you present yourself to the world?',
        optionA: { text: 'Strategically — I carefully curate my image to match what will earn admiration in my current context; I\'m a chameleon of competence', leansToward: 3 },
        optionB: { text: 'Enthusiastically — I share my ideas, adventures, and visions freely; I want people to see how exciting life can be', leansToward: 7 },
      },
      {
        text: 'When you feel empty or sad inside, what do you do?',
        optionA: { text: 'I set a new goal and work toward it — achievement fills the void and reminds me that I have worth', leansToward: 3 },
        optionB: { text: 'I seek stimulation and variety — I book a trip, start a project, call friends, or brainstorm new plans to keep the good feelings flowing', leansToward: 7 },
      },
    ],
  },
  {
    typeA: 4,
    typeB: 6,
    commonConfusion: 'Both types experience intense inner turbulence, self-doubt, and emotional reactivity. Both can be contrarian and feel like outsiders. The key difference is OBJECT OF FIXATION: Fours are fixated on their own identity and what\'s missing from their sense of self, while Sixes are fixated on external threats and what could go wrong in the environment. Fours ask \'Who am I?\'; Sixes ask \'Is it safe?\'',
    questions: [
      {
        text: 'When you wake up with a sense of dread, what is it usually about?',
        optionA: { text: 'A feeling of existential emptiness — something is missing from my life, I\'m not living authentically, or I\'m fundamentally flawed in a way I can\'t fix', leansToward: 4 },
        optionB: { text: 'A feeling of impending threat — something bad could happen today, I\'m not prepared enough, or someone I depend on might let me down', leansToward: 6 },
      },
      {
        text: 'How do you experience your emotional intensity?',
        optionA: { text: 'As something that makes me special — my depth of feeling is part of my identity and I wouldn\'t trade it, even when it\'s painful', leansToward: 4 },
        optionB: { text: 'As something I wish I could control — my emotional turbulence feels like a threat to my stability and I\'d prefer to feel more grounded', leansToward: 6 },
      },
      {
        text: 'When you feel like an outsider in a group, what is the underlying experience?',
        optionA: { text: 'A bittersweet sense of being fundamentally different — I don\'t fit in because I\'m wired differently, and there\'s a strange pride mixed with my pain', leansToward: 4 },
        optionB: { text: 'Anxiety about trust and belonging — I scan the group dynamics, wonder if I\'m truly accepted, and question whether these people have my back', leansToward: 6 },
      },
      {
        text: 'What do you do when you feel most distressed?',
        optionA: { text: 'I go deep into my feelings — I listen to music that matches my mood, journal, create art, or amplify the emotion to find meaning in it', leansToward: 4 },
        optionB: { text: 'I seek reassurance or take action — I call a trusted person, research the problem, or create a plan to manage the threat I\'m perceiving', leansToward: 6 },
      },
      {
        text: 'What is your relationship with envy?',
        optionA: { text: 'It\'s a constant companion — I\'m painfully aware of what others have that I lack, especially qualities like ease, belonging, or wholeness', leansToward: 4 },
        optionB: { text: 'I experience it occasionally, but my more persistent emotion is suspicion — I\'m less focused on what I lack and more focused on what could threaten me', leansToward: 6 },
      },
    ],
  },
  {
    typeA: 5,
    typeB: 9,
    commonConfusion: 'Both types are withdrawn, quiet, conflict-avoidant, and can appear emotionally detached. Both retreat from the demands of the external world. The key difference is INNER ACTIVITY: Fives withdraw to intensely engage with their inner mental world — their minds are highly active and focused. Nines withdraw to disengage and numb — their minds become diffuse and unfocused. Fives detach to think more; Nines detach to think less.',
    questions: [
      {
        text: 'When you\'re alone, what is happening in your mind?',
        optionA: { text: 'Intense mental activity — I\'m reading, researching, analyzing, or building complex frameworks; my mind is working at full capacity', leansToward: 5 },
        optionB: { text: 'Comfortable drift — I\'m puttering, watching something familiar, daydreaming, or doing routine tasks; my mind is pleasantly unfocused', leansToward: 9 },
      },
      {
        text: 'Why do you avoid conflict?',
        optionA: { text: 'It\'s draining and inefficient — emotional confrontations deplete my limited energy reserves and I\'d rather solve problems through analysis', leansToward: 5 },
        optionB: { text: 'It threatens my inner peace — conflict creates painful tension and I\'d rather smooth things over or pretend the problem doesn\'t exist', leansToward: 9 },
      },
      {
        text: 'How do you experience your own needs?',
        optionA: { text: 'I\'m very aware of them but I deliberately minimize them — I know what I need, I just reduce my requirements so I won\'t have to depend on anyone', leansToward: 5 },
        optionB: { text: 'I\'m genuinely out of touch with them — I often substitute small comforts and other people\'s agendas for my own deeper desires, which feel unclear', leansToward: 9 },
      },
      {
        text: 'What is your experience of time passing?',
        optionA: { text: 'I lose track of time because I\'m deeply absorbed — hours vanish when I\'m engaged with an intellectually stimulating project or subject', leansToward: 5 },
        optionB: { text: 'I lose track of time because I\'m zoning out — hours vanish on autopilot activities that require no real engagement or decision-making', leansToward: 9 },
      },
      {
        text: 'How do others typically describe your detachment?',
        optionA: { text: 'Cerebral and intense — people sense that my withdrawal is purposeful and that there\'s a sharp, active mind behind my quiet exterior', leansToward: 5 },
        optionB: { text: 'Easygoing and checked out — people sense that I\'ve just kind of disappeared, and my withdrawal feels more like absence than concentration', leansToward: 9 },
      },
    ],
  },
  {
    typeA: 2,
    typeB: 6,
    commonConfusion: 'Both types are relationship-oriented, anxious about being unsupported, and focused on loyalty and connection. Both can be warm, helpful, and deeply committed to their people. The key difference is MOTIVATION FOR CONNECTION: Twos connect to be needed and to earn love through indispensability, while Sixes connect to build alliances against a threatening world. Twos give to receive love; Sixes give to maintain the security of trusted bonds.',
    questions: [
      {
        text: 'When you do something generous for someone, what\'s the deeper motivation?',
        optionA: { text: 'I want to be loved and indispensable — my generosity creates an emotional debt that ensures they\'ll value me and keep me close', leansToward: 2 },
        optionB: { text: 'I want to strengthen our alliance — my generosity builds mutual trust and ensures I have a reliable support system when I need it', leansToward: 6 },
      },
      {
        text: 'What makes you anxious in relationships?',
        optionA: { text: 'Being replaced or not needed — if someone else fills the role I play in their life, I feel panicked about losing my special position', leansToward: 2 },
        optionB: { text: 'Being betrayed or abandoned — I worry about whether the people I\'ve trusted will actually come through when things get difficult', leansToward: 6 },
      },
      {
        text: 'How do you typically approach new people?',
        optionA: { text: 'With warmth and attention — I intuitively sense what they need and offer it, creating an immediate personal connection', leansToward: 2 },
        optionB: { text: 'With caution and assessment — I observe them carefully, test their character, and slowly decide whether they\'re trustworthy enough to let in', leansToward: 6 },
      },
      {
        text: 'What is your experience of pride?',
        optionA: { text: 'I take secret pride in how much people depend on me — being the one everyone turns to makes me feel worthy and powerful', leansToward: 2 },
        optionB: { text: 'Pride isn\'t a dominant feeling for me — I\'m more likely to feel doubt about whether I\'m handling things correctly than pride in my importance', leansToward: 6 },
      },
      {
        text: 'When you feel overwhelmed, what do you turn to?',
        optionA: { text: 'Other people\'s needs — helping someone else distracts me from my own problems and restores my sense of value and purpose', leansToward: 2 },
        optionB: { text: 'Problem-solving and worst-case planning — I analyze what could go wrong, build contingency plans, or seek guidance from someone I trust', leansToward: 6 },
      },
    ],
  },
  {
    typeA: 4,
    typeB: 9,
    commonConfusion: 'Both types can be dreamy, withdrawn, and creative. Both struggle with inertia and can feel like they\'re waiting for something to happen. The key difference is EMOTIONAL STANCE: Fours amplify their emotions and hold onto pain because it feels meaningful and identity-confirming, while Nines dampen their emotions and avoid pain because it threatens their inner peace. Fours feel too much; Nines feel too little.',
    questions: [
      {
        text: 'How do you relate to your own sadness?',
        optionA: { text: 'I\'m drawn to it — sadness feels authentic and meaningful, and I\'d rather feel deeply sad than numb and disconnected', leansToward: 4 },
        optionB: { text: 'I avoid it — I\'d rather stay comfortable and even-keeled; intense sadness feels threatening to my sense of peace', leansToward: 9 },
      },
      {
        text: 'When you daydream, what is the quality of your inner world?',
        optionA: { text: 'Vivid, emotionally intense, and often melancholy — I fantasize about idealized versions of my life and mourn what\'s missing', leansToward: 4 },
        optionB: { text: 'Pleasant, low-key, and comforting — I drift into familiar scenarios, simple pleasures, or peaceful landscapes that soothe me', leansToward: 9 },
      },
      {
        text: 'How do you experience your sense of identity?',
        optionA: { text: 'It\'s central to my existence — I\'m constantly exploring, questioning, and refining who I am, and I have a strong sense of being unique', leansToward: 4 },
        optionB: { text: 'It\'s somewhat blurry — I tend to absorb the identities and preferences of people around me and I often struggle to articulate who I distinctly am', leansToward: 9 },
      },
      {
        text: 'When a conflict arises between you and someone you love, what do you do?',
        optionA: { text: 'I express my feelings — sometimes dramatically; I need the other person to understand the depth of my emotional experience', leansToward: 4 },
        optionB: { text: 'I minimize it — I smooth things over, say it\'s fine, or distract myself until the uncomfortable tension fades away', leansToward: 9 },
      },
      {
        text: 'What is your relationship with the idea of being \'ordinary\'?',
        optionA: { text: 'It terrifies me — being ordinary would mean I have nothing special to offer and my suffering has been for nothing', leansToward: 4 },
        optionB: { text: 'It\'s fine with me — I don\'t need to stand out; I\'m content being part of the whole and I find peace in simplicity', leansToward: 9 },
      },
    ],
  },
  {
    typeA: 1,
    typeB: 3,
    commonConfusion: 'Both types are competent, hardworking, and driven by high standards. Both are action-oriented and can seem polished and put-together. The key difference is STANDARD SOURCE: Ones are driven by internal moral principles and care about being good regardless of who\'s watching, while Threes are driven by external success metrics and care about appearing impressive to others. Ones pursue moral correctness; Threes pursue perceived excellence.',
    questions: [
      {
        text: 'What motivates you to work hard?',
        optionA: { text: 'The conviction that it should be done right — I hold myself to an internal standard of correctness that has nothing to do with whether anyone notices', leansToward: 1 },
        optionB: { text: 'The desire to succeed and be recognized — I\'m motivated by outcomes, achievement, and the way others perceive my competence', leansToward: 3 },
      },
      {
        text: 'How do you feel when you do excellent work that nobody sees or acknowledges?',
        optionA: { text: 'Satisfied — the quality of the work itself is what matters to me; I did it right and that\'s enough, even if no one noticed', leansToward: 1 },
        optionB: { text: 'Frustrated — excellent work that nobody recognizes feels like wasted effort; I need the impact and the acknowledgment', leansToward: 3 },
      },
      {
        text: 'When you make a mistake, what troubles you most?',
        optionA: { text: 'That I violated my own principles — I feel morally compromised, even if the mistake had no practical consequences', leansToward: 1 },
        optionB: { text: 'That it makes me look incompetent — I worry about the damage to my reputation and how to recover my image', leansToward: 3 },
      },
      {
        text: 'How do you relate to shortcuts and efficiency hacks?',
        optionA: { text: 'I\'m suspicious of them — cutting corners feels morally wrong even if the result looks the same; the process matters as much as the outcome', leansToward: 1 },
        optionB: { text: 'I embrace them — if I can achieve the same result faster, that\'s smart; what matters is the end product and the impression it creates', leansToward: 3 },
      },
      {
        text: 'What is your relationship with image and appearance?',
        optionA: { text: 'I care about looking proper and correct but I\'d never sacrifice my principles for image — authenticity to my values comes first', leansToward: 1 },
        optionB: { text: 'Image is a tool — I consciously manage how I\'m perceived and I can adapt my presentation to different audiences to maximize my impact', leansToward: 3 },
      },
    ],
  },
  {
    typeA: 6,
    typeB: 9,
    commonConfusion: 'Both types can be loyal, self-doubting, conflict-avoidant, and focused on maintaining stability. Both can seem indecisive and both value security. The key difference is INNER ACTIVITY: Sixes are internally hyperactive — their minds race with worry, doubt, and worst-case scenarios. Nines are internally hypoactive — their minds go diffuse, merging with comfort and avoiding any thought that might create disturbance. Sixes can\'t stop thinking; Nines can\'t start.',
    questions: [
      {
        text: 'What does your mind do when you\'re trying to fall asleep?',
        optionA: { text: 'It races with worries — I replay the day\'s events, anticipate tomorrow\'s problems, and scan for threats I might have missed', leansToward: 6 },
        optionB: { text: 'It goes pleasantly blank — I drift into comfortable numbness or repetitive, soothing thoughts and fall asleep without much difficulty', leansToward: 9 },
      },
      {
        text: 'How do you experience indecision?',
        optionA: { text: 'As agonizing mental activity — I weigh every option against possible dangers, seek others\' opinions, and still doubt my choice afterward', leansToward: 6 },
        optionB: { text: 'As comfortable avoidance — I don\'t feel anguished about not deciding; I just don\'t, and I fill the time with easier activities', leansToward: 9 },
      },
      {
        text: 'What is your experience of loyalty?',
        optionA: { text: 'It\'s tested and deliberate — I\'ve carefully evaluated who deserves my loyalty through questioning and testing, and I stand by them fiercely', leansToward: 6 },
        optionB: { text: 'It\'s automatic and unquestioned — I\'m loyal to the people and groups I\'m already connected to simply because they\'re part of my world', leansToward: 9 },
      },
      {
        text: 'When the world feels overwhelming, what is your instinct?',
        optionA: { text: 'To problem-solve — I create contingency plans, seek reassurance from trusted authorities, or prepare for the worst-case scenario', leansToward: 6 },
        optionB: { text: 'To check out — I numb myself with routines, comfort activities, or passive entertainment until the overwhelming feeling passes', leansToward: 9 },
      },
      {
        text: 'How do people closest to you describe your energy?',
        optionA: { text: 'Anxious and vigilant — they notice that I worry a lot, ask many \'what if\' questions, and have difficulty relaxing', leansToward: 6 },
        optionB: { text: 'Calm and unflappable — they see me as the steady one who rarely gets ruffled, even if they sometimes wish I\'d engage more', leansToward: 9 },
      },
    ],
  },
  {
    typeA: 3,
    typeB: 8,
    commonConfusion: 'Both types are assertive, action-oriented, and confident. Both are natural leaders who can dominate a room. The key difference is WHAT THEY SEEK: Threes seek admiration and validation — they want to be seen as successful and impressive. Eights seek autonomy and control — they want to be powerful and uncontrollable. Threes shape-shift to impress; Eights refuse to shape-shift for anyone.',
    questions: [
      {
        text: 'What matters more to you — being admired or being respected?',
        optionA: { text: 'Being admired — I want people to see me as impressive, successful, and aspirational; their positive perception drives me', leansToward: 3 },
        optionB: { text: 'Being respected — I want people to take me seriously and not cross me; admiration without respect feels hollow and weak', leansToward: 8 },
      },
      {
        text: 'How do you handle situations where you need to influence others?',
        optionA: { text: 'I adapt — I read the audience, adjust my presentation style, and become whatever version of myself will be most persuasive', leansToward: 3 },
        optionB: { text: 'I\'m direct — I state what I want plainly, use my presence and force of personality, and don\'t bother adapting to others\' preferences', leansToward: 8 },
      },
      {
        text: 'What is your experience of vulnerability?',
        optionA: { text: 'I hide it behind competence — showing vulnerability would make me look like a failure, so I maintain a polished, capable exterior', leansToward: 3 },
        optionB: { text: 'I hide it behind strength — showing vulnerability would give others power over me, so I project toughness and intensity', leansToward: 8 },
      },
      {
        text: 'When you encounter an obstacle, what is your primary response?',
        optionA: { text: 'I find a way around it — I\'m strategic and flexible; I\'ll adjust my approach or redefine success if I need to', leansToward: 3 },
        optionB: { text: 'I go through it — I confront it head-on with force and will; obstacles are meant to be broken, not circumnavigated', leansToward: 8 },
      },
      {
        text: 'How do you feel about showing emotions publicly?',
        optionA: { text: 'I show emotions strategically — I\'ll express feelings when it serves my purpose but I control which emotions others see', leansToward: 3 },
        optionB: { text: 'My emotions come out raw and unfiltered — especially anger; I don\'t curate my emotional expression, I just express what\'s there', leansToward: 8 },
      },
    ],
  },
  {
    typeA: 5,
    typeB: 4,
    commonConfusion: 'Both types are withdrawn, introspective, and feel different from others. Both have rich inner worlds and can be unconventional. The key difference is RELATIONSHIP TO FEELING: Fives detach from emotions to achieve clarity — feelings are data to be analyzed rather than experienced. Fours immerse in emotions to achieve authenticity — feelings are the core of identity and must be fully felt. Fives think about feelings; Fours feel through thinking.',
    questions: [
      {
        text: 'When you experience a strong emotion, what do you do?',
        optionA: { text: 'I step back to analyze it — I observe the emotion with detachment, categorize it, and try to understand its cause before I let myself fully feel it', leansToward: 5 },
        optionB: { text: 'I dive into it — I want to fully experience and express the emotion because suppressing it would feel like a betrayal of who I am', leansToward: 4 },
      },
      {
        text: 'What is your sense of being \'different\' from others based on?',
        optionA: { text: 'My mind — I think differently, I know things others don\'t, and my analytical depth sets me apart from the mainstream', leansToward: 5 },
        optionB: { text: 'My heart — I feel differently, I experience emotions at depths others can\'t access, and my sensitivity sets me apart', leansToward: 4 },
      },
      {
        text: 'When you withdraw from people, what are you seeking?',
        optionA: { text: 'Mental space and energy conservation — I need to recharge and engage with ideas without the drain of social interaction', leansToward: 5 },
        optionB: { text: 'Emotional authenticity — I withdraw because social situations feel false and I need to reconnect with my true feelings', leansToward: 4 },
      },
      {
        text: 'How do you relate to the concept of \'meaning\' in life?',
        optionA: { text: 'I seek understanding — meaning comes from comprehending how things work and building frameworks that explain complexity', leansToward: 5 },
        optionB: { text: 'I seek significance — meaning comes from feeling deeply, creating beauty, and finding the emotional truth beneath surface appearances', leansToward: 4 },
      },
      {
        text: 'What is your relationship with envy?',
        optionA: { text: 'I don\'t feel much envy — I\'m more likely to feel contempt for what others value or to feel that I simply need different things than most people', leansToward: 5 },
        optionB: { text: 'Envy is a persistent undercurrent — I\'m painfully aware of what others have that I don\'t, especially ease, belonging, and wholeness', leansToward: 4 },
      },
    ],
  },
  {
    typeA: 1,
    typeB: 4,
    commonConfusion: 'Both types are idealistic, feel that something is missing or wrong, and can be critical and melancholy. Both have strong aesthetic sensibilities and hold themselves to high standards. The key difference is WHERE THE FLAW LIVES: Ones see the flaw in the external world and in behavior — things should be better and must be corrected. Fours see the flaw in themselves — they feel inherently deficient in a way that effort can\'t fix. Ones try to fix; Fours try to feel.',
    questions: [
      {
        text: 'When you notice something is \'wrong,\' where do you locate the problem?',
        optionA: { text: 'In the external world — things aren\'t being done correctly, people aren\'t living up to standards, and systems need improvement', leansToward: 1 },
        optionB: { text: 'In myself — something essential is missing from who I am, and the world\'s ordinariness reflects a deeper personal emptiness', leansToward: 4 },
      },
      {
        text: 'How do you relate to the idea of self-improvement?',
        optionA: { text: 'It\'s essential — I believe disciplined effort can make me better and I hold myself accountable to concrete standards of improvement', leansToward: 1 },
        optionB: { text: 'It feels beside the point — my issue isn\'t about effort or discipline; it\'s about a fundamental quality of being that can\'t be fixed with hard work', leansToward: 4 },
      },
      {
        text: 'What is your experience of anger?',
        optionA: { text: 'It\'s a constant undertone — a simmering frustration with imperfection that I try to channel into productive correction and self-control', leansToward: 1 },
        optionB: { text: 'It flares when I feel misunderstood — my anger is more like a painful reaction to not being seen, often mixed with sadness and shame', leansToward: 4 },
      },
      {
        text: 'When you create something, what standard do you hold it to?',
        optionA: { text: 'Objective correctness — is it well-made, properly executed, and meeting the standard of how it should be done?', leansToward: 1 },
        optionB: { text: 'Emotional authenticity — does it capture something true about my inner experience and express something meaningful and unique?', leansToward: 4 },
      },
      {
        text: 'How do you experience dissatisfaction?',
        optionA: { text: 'As moral frustration — the world falls short of how it should be, and I feel compelled to work toward correcting it', leansToward: 1 },
        optionB: { text: 'As existential longing — life falls short of what it could be, and I ache for something beautiful that feels perpetually out of reach', leansToward: 4 },
      },
    ],
  },
  {
    typeA: 7,
    typeB: 9,
    commonConfusion: 'Both types are optimistic, conflict-avoidant, and avoid negative experiences. Both can seem easygoing and pleasant. The key difference is ENERGY LEVEL: Sevens are hyperactive — they avoid pain by filling their lives with stimulation, plans, and exciting possibilities. Nines are hypoactive — they avoid pain by numbing out, merging with routine, and reducing their engagement with life. Sevens run from pain; Nines go to sleep in it.',
    questions: [
      {
        text: 'How do you typically spend a Saturday with no obligations?',
        optionA: { text: 'I fill it with plans — brunch, a museum, calling friends, starting a project; an empty day feels wasteful and I want maximum experience', leansToward: 7 },
        optionB: { text: 'I let it unfold — I might putter around the house, watch something, nap, or do small comfortable tasks; having no agenda feels peaceful', leansToward: 9 },
      },
      {
        text: 'When someone asks what you want to do, what happens?',
        optionA: { text: 'I instantly have multiple options — my mind generates exciting possibilities and the challenge is narrowing down from too many ideas', leansToward: 7 },
        optionB: { text: 'I draw a blank — I genuinely struggle to locate a preference and I often defer to whatever the other person suggests', leansToward: 9 },
      },
      {
        text: 'What is your relationship with boredom?',
        optionA: { text: 'It\'s intolerable — boredom feels like a kind of death and I\'ll do almost anything to stimulate my mind and keep the energy flowing', leansToward: 7 },
        optionB: { text: 'I barely notice it — I can spend long periods in routine activities without feeling restless; the sameness is soothing', leansToward: 9 },
      },
      {
        text: 'How do you deal with painful feelings?',
        optionA: { text: 'I reframe and redirect — I quickly find the silver lining, make new plans, or shift my attention to something positive and exciting', leansToward: 7 },
        optionB: { text: 'I numb and merge — I tune out the pain by sinking into comfortable routines or passive activities until the feeling passes', leansToward: 9 },
      },
      {
        text: 'What is your tempo in life?',
        optionA: { text: 'Fast and varied — I move quickly between interests, conversations, and activities; I like a full, stimulating, multi-track life', leansToward: 7 },
        optionB: { text: 'Slow and steady — I move at my own gentle pace and I resist being rushed; I prefer consistency over excitement', leansToward: 9 },
      },
    ],
  },
  {
    typeA: 2,
    typeB: 4,
    commonConfusion: 'Both types are emotionally intense, relationship-focused, and can feel unappreciated. Both are part of the Heart center and struggle with identity and shame. The key difference is DIRECTION OF ATTENTION: Twos focus outward on others\' emotional needs and derive identity from being helpful, while Fours focus inward on their own emotional experience and derive identity from being unique. Twos lose themselves in others; Fours lose themselves in themselves.',
    questions: [
      {
        text: 'When you feel emotionally empty, what is your instinct?',
        optionA: { text: 'To find someone who needs me — helping others fills the void and gives me a sense of purpose and worth', leansToward: 2 },
        optionB: { text: 'To explore the emptiness itself — I sit with the feeling, turn it over, and try to understand what it means about who I am', leansToward: 4 },
      },
      {
        text: 'How do you relate to other people\'s emotions?',
        optionA: { text: 'I absorb them — I feel what others feel almost automatically, and I\'m more attuned to their emotional states than my own', leansToward: 2 },
        optionB: { text: 'I compare them to mine — I notice how others process emotions and I often feel that my own emotional experience is deeper or more complex', leansToward: 4 },
      },
      {
        text: 'What is your experience of pride?',
        optionA: { text: 'I take secret pride in how much people depend on me — being the one everyone turns to makes me feel worthy', leansToward: 2 },
        optionB: { text: 'I feel proud of my depth and uniqueness — even when it\'s painful, I value my ability to feel things that most people can\'t access', leansToward: 4 },
      },
      {
        text: 'When a relationship ends, what consumes you?',
        optionA: { text: 'Whether I gave enough — I replay what I did for them and wonder if being even more generous would have kept them', leansToward: 2 },
        optionB: { text: 'Whether I was truly seen — I grieve the loss of someone who might have understood my depths, and the absence feels like proof I\'m fundamentally alone', leansToward: 4 },
      },
      {
        text: 'How do you seek connection with others?',
        optionA: { text: 'By anticipating and meeting their needs — I make myself essential by being the person who remembers, cares for, and shows up', leansToward: 2 },
        optionB: { text: 'By sharing my authentic emotional world — I reveal my inner landscape and hope someone will resonate with its depth and complexity', leansToward: 4 },
      },
    ],
  },
  {
    typeA: 8,
    typeB: 6,
    commonConfusion: 'Both types can be confrontational, rebellious, and focused on power dynamics. Both can appear tough and challenging. The key difference is RELATIONSHIP TO FEAR: Eights genuinely do not experience much conscious fear — they move toward danger instinctively and use aggression as their primary stance. Sixes are fundamentally driven by fear and either submit to it or counterphobically charge at it to prove they\'re not afraid. Eights are naturally fearless; counterphobic Sixes are defiantly fearful.',
    questions: [
      {
        text: 'When you sense danger, what is your very first internal experience?',
        optionA: { text: 'Energized readiness — danger activates my body and I feel a surge of power; I instinctively move toward the threat to confront it', leansToward: 8 },
        optionB: { text: 'A flash of fear followed by aggressive action — I feel the danger first, then I override my fear by charging at it to prove I won\'t be intimidated', leansToward: 6 },
      },
      {
        text: 'How do you relate to the concept of trust?',
        optionA: { text: 'I trust my gut and my strength — I don\'t spend much time worrying about whether people are loyal because I know I can handle any betrayal', leansToward: 8 },
        optionB: { text: 'Trust is earned slowly through testing — I\'m always evaluating whether people are reliable, and I vacillate between deep loyalty and deep suspicion', leansToward: 6 },
      },
      {
        text: 'When you challenge authority, what drives you?',
        optionA: { text: 'A refusal to be controlled — I challenge authority because no one has the right to dominate me, and I trust my own power over anyone else\'s rules', leansToward: 8 },
        optionB: { text: 'A need to test legitimacy — I challenge authority to see if it\'s trustworthy; if it proves reliable and fair, I may choose to follow it', leansToward: 6 },
      },
      {
        text: 'What is your experience of anxiety?',
        optionA: { text: 'I rarely feel anxious — I convert potential anxiety into action immediately; fear doesn\'t have time to build because I\'m already addressing the problem', leansToward: 8 },
        optionB: { text: 'Anxiety is a constant undercurrent — even when I look tough on the outside, my mind is running through worst-case scenarios underneath', leansToward: 6 },
      },
      {
        text: 'How do you experience your own toughness?',
        optionA: { text: 'It\'s my natural state — I\'ve always been strong and dominant; it doesn\'t require effort or intentional posturing', leansToward: 8 },
        optionB: { text: 'It\'s armor I\'ve built — I\'ve developed my toughness as a defense against a threatening world, and maintaining it takes conscious effort', leansToward: 6 },
      },
    ],
  },
];