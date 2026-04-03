export interface AdaptiveRound {
  id: string;
  title: string;
  description: string;
  questions: {
    text: string;
    options: { text: string; scores: Record<string, number> }[];
  }[];
}

export const adaptiveRounds: AdaptiveRound[] = [
  {
    id: 'round-1-center',
    title: 'Your Core Center',
    description: 'These questions identify your dominant intelligence center, whether you lead with thinking, feeling, or instinct.',
    questions: [
      {
        text: 'When you face an unexpected crisis, what is your very first internal reaction before you consciously decide what to do?',
        options: [
          { text: 'A surge of energy in my body, I feel compelled to act, resist, or take control of the situation immediately', scores: { "T1": 2, "T8": 2, "T9": 2 } },
          { text: 'A wave of feeling, I immediately sense how this affects me and others emotionally', scores: { "T2": 2, "T3": 2, "T4": 2 } },
          { text: 'A rush of thoughts, my mind races to analyze what happened and figure out what it means', scores: { "T5": 2, "T6": 2, "T7": 2 } },
        ],
      },
      {
        text: 'Which of these three emotions do you struggle with most, not necessarily the one you show, but the one that secretly runs in the background of your life?',
        options: [
          { text: 'Anger or frustration, whether I express it outwardly, suppress it, or barely notice it, it shapes many of my reactions', scores: { "T1": 2, "T8": 2, "T9": 2 } },
          { text: 'Shame or concern about my worth, I\'m more affected than I\'d like to admit by how others perceive me', scores: { "T2": 2, "T3": 2, "T4": 2 } },
          { text: 'Fear or anxiety, I spend a lot of energy preparing for what could go wrong or escaping into plans and ideas', scores: { "T5": 2, "T6": 2, "T7": 2 } },
        ],
      },
      {
        text: 'When you think about your sense of identity, who you really are, where does it primarily come from?',
        options: [
          { text: 'My convictions and my ability to stand my ground, I know who I am through what I stand for and against', scores: { "T1": 2, "T8": 2, "T9": 2 } },
          { text: 'My emotional life and my connections, I know who I am through what I feel and how I relate to others', scores: { "T2": 2, "T3": 2, "T4": 2 } },
          { text: 'My mind and my understanding, I know who I am through what I think, know, or envision', scores: { "T5": 2, "T6": 2, "T7": 2 } },
        ],
      },
      {
        text: 'In relationships, what is the deepest issue you grapple with?',
        options: [
          { text: 'Maintaining my autonomy, I worry about being controlled, compromised, or losing my independence', scores: { "T1": 2, "T8": 2, "T9": 2 } },
          { text: 'Being truly seen, I long to be valued for who I actually am, not a role I play', scores: { "T2": 2, "T3": 2, "T4": 2 } },
          { text: 'Feeling secure, I need to know where I stand and whether I can trust the other person\'s intentions', scores: { "T5": 2, "T6": 2, "T7": 2 } },
        ],
      },
      {
        text: 'When someone disagrees with you about something important, what happens inside you first?',
        options: [
          { text: 'I feel a visceral, gut-level resistance, my body tenses and I feel an impulse to push back or hold firm', scores: { "T1": 2, "T8": 2, "T9": 2 } },
          { text: 'I feel hurt or misunderstood, their disagreement feels like a rejection of something personal', scores: { "T2": 2, "T3": 2, "T4": 2 } },
          { text: 'I feel confused or threatened, I immediately start questioning whether I\'m wrong or building a counterargument', scores: { "T5": 2, "T6": 2, "T7": 2 } },
        ],
      },
      {
        text: 'What do you most need from others in order to feel at ease?',
        options: [
          { text: 'Respect for my boundaries and space, I need to know others won\'t overstep or try to dominate me', scores: { "T1": 2, "T8": 2, "T9": 2 } },
          { text: 'Emotional acknowledgment, I need to feel that my feelings and my presence genuinely matter to them', scores: { "T2": 2, "T3": 2, "T4": 2 } },
          { text: 'Reliability and clarity, I need to know they\'re trustworthy and that I can predict what to expect', scores: { "T5": 2, "T6": 2, "T7": 2 } },
        ],
      },
      {
        text: 'When you\'re overwhelmed, what is your default way of coping?',
        options: [
          { text: 'I either take forceful action, shut down and withdraw into numbness, or become rigid and controlled', scores: { "T1": 2, "T8": 2, "T9": 2 } },
          { text: 'I focus on others\' needs, work harder to prove myself, or retreat into my inner emotional world', scores: { "T2": 2, "T3": 2, "T4": 2 } },
          { text: 'I overthink, seek reassurance, or distract myself with new plans and possibilities', scores: { "T5": 2, "T6": 2, "T7": 2 } },
        ],
      },
      {
        text: 'Which of these core life questions resonates most deeply with you?',
        options: [
          { text: '"Am I in control of my own life and world?"', scores: { "T1": 2, "T8": 2, "T9": 2 } },
          { text: '"Am I loved and valued for who I truly am?"', scores: { "T2": 2, "T3": 2, "T4": 2 } },
          { text: '"Am I safe and prepared for what\'s coming?"', scores: { "T5": 2, "T6": 2, "T7": 2 } },
        ],
      },
    ],
  },
  {
    id: 'round-2-narrowing',
    title: 'Narrowing Your Type',
    description: 'Now we explore the specific patterns within your dominant center to identify your core type.',
    questions: [
      {
        text: 'In social situations, where does your attention naturally go?',
        options: [
          { text: 'To what others need, I automatically sense who\'s struggling and move toward them', scores: { "T2": 3 } },
          { text: 'To how I\'m being perceived, I\'m aware of the impression I\'m making and adjust accordingly', scores: { "T3": 3 } },
          { text: 'To what feels authentic, I notice when things feel forced or shallow and I pull back', scores: { "T4": 3 } },
        ],
      },
      {
        text: 'When you feel unappreciated, what is your deepest reaction?',
        options: [
          { text: 'I feel indispensable, I\'ve given so much, how can they not see how much they need me?', scores: { "T2": 3 } },
          { text: 'I feel like a failure, if they don\'t value me, maybe I haven\'t achieved enough', scores: { "T3": 3 } },
          { text: 'I feel fundamentally different, their inability to appreciate me confirms that nobody truly understands me', scores: { "T4": 3 } },
        ],
      },
      {
        text: 'How do you relate to the emotion of sadness?',
        options: [
          { text: 'I feel it most when others are suffering, their pain becomes my pain, and I push my own sadness aside', scores: { "T2": 3 } },
          { text: 'I avoid it, sadness feels unproductive and I quickly redirect my energy into doing something', scores: { "T3": 3 } },
          { text: 'I\'m drawn to it, there\'s a bittersweet depth in melancholy that feels more real than ordinary happiness', scores: { "T4": 3 } },
        ],
      },
      {
        text: 'What drives your behavior when you meet someone new?',
        options: [
          { text: 'I try to make them feel comfortable and cared for, I want them to feel warmth from me', scores: { "T2": 3 } },
          { text: 'I present my best self, I want them to see someone competent, impressive, and put-together', scores: { "T3": 3 } },
          { text: 'I hold back and observe, I don\'t want to pretend to be something I\'m not just to fit in', scores: { "T4": 3 } },
        ],
      },
      {
        text: 'What is the self-image you most want to maintain?',
        options: [
          { text: 'That I\'m generous, caring, and that people couldn\'t manage without me', scores: { "T2": 3 } },
          { text: 'That I\'m successful, admirable, and capable of achieving anything I set my mind to', scores: { "T3": 3 } },
          { text: 'That I\'m unique, deep, and possess an emotional richness that most people lack', scores: { "T4": 3 } },
        ],
      },
      {
        text: 'When you feel empty or lost inside, what do you do?',
        options: [
          { text: 'I reach out to help someone, feeling needed fills the void and gives me purpose', scores: { "T2": 3 } },
          { text: 'I set a goal and pursue it, accomplishing something tangible restores my sense of self', scores: { "T3": 3 } },
          { text: 'I go inward, I explore the feeling, trying to understand what\'s missing and longing for something meaningful', scores: { "T4": 3 } },
        ],
      },
      {
        text: 'When you encounter something you don\'t understand, what is your instinct?',
        options: [
          { text: 'I want to study it deeply and privately until I\'ve mastered it, knowledge is my security', scores: { "T5": 3 } },
          { text: 'I want to test it and question it, I need to figure out if it\'s trustworthy before I commit', scores: { "T6": 3 } },
          { text: 'I want to explore its possibilities, not knowing is exciting because it could lead somewhere new', scores: { "T7": 3 } },
        ],
      },
      {
        text: 'What happens when you feel anxious?',
        options: [
          { text: 'I withdraw, I need time alone to process and restore my depleted inner resources', scores: { "T5": 3 } },
          { text: 'I scan for threats, I look for what could go wrong and prepare for worst-case scenarios', scores: { "T6": 3 } },
          { text: 'I reframe, I redirect my attention toward something positive, exciting, or full of possibility', scores: { "T7": 3 } },
        ],
      },
      {
        text: 'How do you relate to the concept of commitment?',
        options: [
          { text: 'I\'m cautious, I need to be sure I can maintain my independence and won\'t be drained', scores: { "T5": 3 } },
          { text: 'I\'m torn, I want security but I also question whether I can trust what I\'m committing to', scores: { "T6": 3 } },
          { text: 'I\'m reluctant, commitment can feel limiting and I worry about missing out on other options', scores: { "T7": 3 } },
        ],
      },
      {
        text: 'When a group looks to you for guidance, what is your internal experience?',
        options: [
          { text: 'I feel drained, I\'d rather contribute my expertise privately than be in the center of group dynamics', scores: { "T5": 3 } },
          { text: 'I feel conflicted, part of me wants to lead and part of me doubts whether I should be trusted with that responsibility', scores: { "T6": 3 } },
          { text: 'I feel energized, I enjoy inspiring people and painting a vision of what we could accomplish together', scores: { "T7": 3 } },
        ],
      },
      {
        text: 'What is your relationship with your inner world of ideas and thoughts?',
        options: [
          { text: 'It\'s my sanctuary, I can spend hours absorbed in complex systems and frameworks', scores: { "T5": 3 } },
          { text: 'It\'s a battleground, my mind generates both brilliant insights and crippling doubts', scores: { "T6": 3 } },
          { text: 'It\'s a playground, my mind is always generating exciting ideas, connections, and plans', scores: { "T7": 3 } },
        ],
      },
      {
        text: 'What do you fear most about the future?',
        options: [
          { text: 'Being overwhelmed by demands that deplete me, not having enough inner resources to cope', scores: { "T5": 3 } },
          { text: 'Being caught unprepared, something terrible happening that I failed to anticipate', scores: { "T6": 3 } },
          { text: 'Being trapped in pain or boredom, being stuck in a situation with no way to find joy or stimulation', scores: { "T7": 3 } },
        ],
      },
      {
        text: 'How do you experience anger in your daily life?',
        options: [
          { text: 'I express it directly and unapologetically, anger feels like raw power and I use it to get things done', scores: { "T8": 3 } },
          { text: 'I barely notice it, I tend to go along with things and only realize I was angry after the fact', scores: { "T9": 3 } },
          { text: 'I feel it as constant low-level irritation, things are always not quite right and it smolders beneath my self-control', scores: { "T1": 3 } },
        ],
      },
      {
        text: 'What is your instinctive response when someone tries to control you?',
        options: [
          { text: 'I push back hard, nobody tells me what to do, and I will fight to maintain my power', scores: { "T8": 3 } },
          { text: 'I quietly resist, I may seem agreeable but I stubbornly disengage or go my own way passively', scores: { "T9": 3 } },
          { text: 'I evaluate their authority, if they\'re wrong I\'ll resist on principle, but if they have a point I\'ll comply', scores: { "T1": 3 } },
        ],
      },
      {
        text: 'When you look at the world, what do you most consistently notice?',
        options: [
          { text: 'Who has power and who doesn\'t, I see the dynamics of strength, vulnerability, and justice', scores: { "T8": 3 } },
          { text: 'Where there\'s harmony and where there\'s conflict, I\'m attuned to peace and tension in my environment', scores: { "T9": 3 } },
          { text: 'What\'s right and what\'s wrong, I see errors, improvements needed, and how things should be', scores: { "T1": 3 } },
        ],
      },
      {
        text: 'What is your relationship with vulnerability?',
        options: [
          { text: 'I avoid it fiercely, showing weakness invites others to take advantage, so I project strength', scores: { "T8": 3 } },
          { text: 'I\'m disconnected from it, I minimize my own needs and focus on keeping everything comfortable', scores: { "T9": 3 } },
          { text: 'I transform it into effort, when I feel vulnerable I double down on doing the right thing', scores: { "T1": 3 } },
        ],
      },
      {
        text: 'How do you approach decision-making?',
        options: [
          { text: 'I decide quickly and boldly, I trust my gut and I\'d rather act decisively and adjust later', scores: { "T8": 3 } },
          { text: 'I avoid deciding, I see merit in all perspectives and choosing one feels like creating conflict', scores: { "T9": 3 } },
          { text: 'I decide carefully, I weigh what is the objectively correct and responsible choice', scores: { "T1": 3 } },
        ],
      },
      {
        text: 'What gives you the deepest sense of purpose?',
        options: [
          { text: 'Protecting people I care about and fighting injustice, using my strength to shield the vulnerable', scores: { "T8": 3 } },
          { text: 'Creating unity and peace, bringing people together and helping everyone feel included and at ease', scores: { "T9": 3 } },
          { text: 'Living with integrity and improving the world, striving to be good and make things better', scores: { "T1": 3 } },
        ],
      },
    ],
  },
  {
    id: 'round-3-wings',
    title: 'Wing Influence',
    description: 'These questions identify which adjacent type flavors your personality, your wing adds a secondary dimension to your core type.',
    questions: [
      {
        text: 'If you resonate with being principled and improvement-oriented: when you see something wrong, what pulls you more?',
        options: [
          { text: 'I want to fix it quietly and systematically, I prefer to improve things through calm, thoughtful effort rather than confrontation', scores: {  } },
          { text: 'I want to fix it by rallying others, I feel compelled to teach, advocate, and personally help people do better', scores: {  } },
        ],
      },
      {
        text: 'If you identify as someone with strong inner standards: what does your inner world look like?',
        options: [
          { text: 'Detached and idealistic, I have a rich philosophical inner life and can seem aloof while processing moral complexity', scores: {  } },
          { text: 'Warm but demanding, I genuinely care about people and channel my standards into helping them improve', scores: {  } },
        ],
      },
      {
        text: 'If you resonate with being caring and relationship-focused: what motivates your generosity?',
        options: [
          { text: 'A sense of duty, I feel morally compelled to help, and I have clear principles about the right way to serve others', scores: {  } },
          { text: 'A desire to be valued, I want my help to be noticed and appreciated, and I enjoy the social connection it brings', scores: {  } },
        ],
      },
      {
        text: 'If you identify as someone who gives a lot in relationships: how do you handle it when your help is refused?',
        options: [
          { text: 'I feel morally frustrated, I know what they need and it bothers me that they won\'t accept what\'s clearly good for them', scores: {  } },
          { text: 'I feel personally rejected, I wonder if I\'ve lost my appeal and I quickly redirect my energy to someone who appreciates me', scores: {  } },
        ],
      },
      {
        text: 'If you resonate with being driven and success-oriented: what kind of success matters most?',
        options: [
          { text: 'Social success, I want to be admired, well-liked, and seen as someone who helps others succeed too', scores: {  } },
          { text: 'Personal distinction, I want to stand out as uniquely accomplished, with achievements that reflect my authentic self', scores: {  } },
        ],
      },
      {
        text: 'If you identify as someone who adapts to excel: what happens in your private moments?',
        options: [
          { text: 'I feel restless, I start thinking about who else I should connect with and what I should do next to stay visible', scores: {  } },
          { text: 'I feel melancholy, a wave of self-doubt surfaces about whether my achievements reflect who I really am inside', scores: {  } },
        ],
      },
      {
        text: 'If you resonate with being emotionally deep and identity-focused: how do you express your uniqueness?',
        options: [
          { text: 'Through creation and presentation, I want my inner world to be seen and appreciated by others through art, style, or achievement', scores: {  } },
          { text: 'Through solitary exploration, I dive into my inner world privately and don\'t need an audience to validate my depth', scores: {  } },
        ],
      },
      {
        text: 'If you identify as someone who feels fundamentally different from others: how do you handle that feeling?',
        options: [
          { text: 'I channel it into ambition, I\'ll prove my worth through visible creative accomplishment', scores: {  } },
          { text: 'I retreat into it, I become more cerebral, withdrawn, and build intricate internal worlds', scores: {  } },
        ],
      },
      {
        text: 'If you resonate with being analytical and knowledge-seeking: what draws you to understanding?',
        options: [
          { text: 'The beauty of ideas, I\'m attracted to unconventional, creative, and emotionally resonant frameworks', scores: {  } },
          { text: 'The reliability of systems, I\'m drawn to logical, well-tested, and practically useful knowledge', scores: {  } },
        ],
      },
      {
        text: 'If you identify as someone who conserves energy and observes from the margins: what is your social style?',
        options: [
          { text: 'Eccentric and intense, when I do engage, I\'m drawn to unusual people and deep, unconventional topics', scores: {  } },
          { text: 'Cautious but loyal, I slowly build trust with a small circle and value dependability in relationships', scores: {  } },
        ],
      },
      {
        text: 'If you resonate with being vigilant and security-oriented: how do you manage your anxiety?',
        options: [
          { text: 'I analyze and prepare, I become more cerebral, withdrawn, and systematic in my threat assessment', scores: {  } },
          { text: 'I seek reassurance and distraction, I reach out to allies or redirect into humor and positive activity', scores: {  } },
        ],
      },
      {
        text: 'If you identify as someone who questions authority and seeks guidance: what\'s your social energy like?',
        options: [
          { text: 'Reserved and skeptical, I observe carefully and share my analysis only with people I deeply trust', scores: {  } },
          { text: 'Warm and engaging, I\'m more outgoing and use humor and charm to build the alliances I need', scores: {  } },
        ],
      },
      {
        text: 'If you resonate with being enthusiastic and future-oriented: what keeps you grounded?',
        options: [
          { text: 'My relationships, I\'m loyal to my people and my anxiety about losing them keeps me more committed', scores: {  } },
          { text: 'My willpower, I push through obstacles with intensity and I\'m not afraid to be forceful when needed', scores: {  } },
        ],
      },
      {
        text: 'If you identify as someone who avoids pain through possibility: how do you handle conflict?',
        options: [
          { text: 'I get nervous and try to defuse it, I use humor, charm, or negotiation to keep things friendly', scores: {  } },
          { text: 'I get assertive, I don\'t back down easily and I can be surprisingly forceful when challenged', scores: {  } },
        ],
      },
      {
        text: 'If you resonate with being powerful and protective: what is your energy like in a room?',
        options: [
          { text: 'Bold and expansive, I fill the space with my intensity, charisma, and drive for action and experience', scores: {  } },
          { text: 'Grounded and immovable, I\'m a quiet, steady force that people sense without me needing to dominate the conversation', scores: {  } },
        ],
      },
      {
        text: 'If you identify as someone who confronts the world directly: how do you use your strength?',
        options: [
          { text: 'To seize opportunities, I\'m entrepreneurial, fast-moving, and I want to experience everything life has to offer', scores: {  } },
          { text: 'To create stability, I protect my people and my territory with patient, unwavering endurance', scores: {  } },
        ],
      },
      {
        text: 'If you resonate with being easygoing and harmony-seeking: what happens when you\'re finally pushed too far?',
        options: [
          { text: 'I erupt with surprising force, my anger is blunt, physical, and catches everyone off guard', scores: {  } },
          { text: 'I become quietly critical, I start pointing out what\'s wrong in a measured, principled way', scores: {  } },
        ],
      },
      {
        text: 'If you identify as someone who merges with others and avoids conflict: what gives you a sense of substance?',
        options: [
          { text: 'Physical comfort and quiet strength, I have a sturdy presence and I enjoy simple, grounding pleasures', scores: {  } },
          { text: 'Doing the right thing, I find purpose through quiet service, routine, and living according to my ideals', scores: {  } },
        ],
      },
    ],
  },
  {
    id: 'round-4-instincts',
    title: 'Instinctual Drives',
    description: 'These questions identify your dominant instinctual variant, the biological drive that most shapes where your energy and attention flow.',
    questions: [
      {
        text: 'How much mental energy do you spend on practical survival concerns, your health, finances, food, shelter, and physical comfort?',
        options: [
          { text: 'A great deal, these concerns are always running in the background and I feel uneasy if they\'re not handled', scores: {  } },
          { text: 'Some, but my real energy goes to my closest bonds and the intensity of one-on-one connection', scores: {  } },
          { text: 'Less than most people, I\'m more focused on my social world, my role, and where I belong in the group', scores: {  } },
        ],
      },
      {
        text: 'When you\'re stressed, what do you instinctively do to self-soothe?',
        options: [
          { text: 'I attend to physical comforts, eating something warm, making my space cozy, or managing a practical task', scores: {  } },
          { text: 'I seek intense connection, I want to talk deeply with someone I trust or lose myself in a passionate experience', scores: {  } },
          { text: 'I reach out to my network, I want to feel connected to my community and know where I stand socially', scores: {  } },
        ],
      },
      {
        text: 'What makes you feel most anxious in daily life?',
        options: [
          { text: 'The sense that my foundation is unstable, financial worries, health scares, or not having enough resources', scores: {  } },
          { text: 'The sense that I\'m not deeply connected, lacking intimacy, chemistry, or someone who truly sees me', scores: {  } },
          { text: 'The sense that I don\'t belong, feeling excluded, losing social standing, or not contributing meaningfully', scores: {  } },
        ],
      },
      {
        text: 'How do you typically spend your free time?',
        options: [
          { text: 'On practical self-care, cooking, organizing, exercising, researching health or finances, making my environment right', scores: {  } },
          { text: 'On immersive experiences, deep conversations, creative projects, or anything that makes me feel intensely alive', scores: {  } },
          { text: 'On social engagement, group activities, community events, staying informed about what\'s happening around me', scores: {  } },
        ],
      },
      {
        text: 'What is your relationship with your physical body and material surroundings?',
        options: [
          { text: 'Very attentive, I\'m keenly aware of my body\'s needs and I invest significant effort in my living space', scores: {  } },
          { text: 'Variable, I can neglect basics when I\'m caught up in an intense relationship or creative pursuit', scores: {  } },
          { text: 'Functional, I keep things presentable but I\'m more focused on how I appear and contribute socially', scores: {  } },
        ],
      },
      {
        text: 'When entering a new environment, what do you scan for first?',
        options: [
          { text: 'Practical details, exits, temperature, where to sit, whether the food is good, if the space feels safe', scores: {  } },
          { text: 'Magnetic energy, who is interesting, who do I feel drawn to, where is the most alive conversation', scores: {  } },
          { text: 'Social dynamics, who knows whom, what groups exist, what the unspoken rules and hierarchies are', scores: {  } },
        ],
      },
      {
        text: 'What kind of energy do you most crave in your life?',
        options: [
          { text: 'Stability and sufficiency, I want to feel like I have enough and that my world is solid', scores: {  } },
          { text: 'Intensity and chemistry, I want to feel alive, transformed, and deeply merged with someone or something', scores: {  } },
          { text: 'Belonging and participation, I want to feel like I matter to my community and have a meaningful role', scores: {  } },
        ],
      },
      {
        text: 'In close relationships, what matters most to you?',
        options: [
          { text: 'Reliability and practical partnership, we take care of each other\'s real-world needs', scores: {  } },
          { text: 'Depth and transformation, the relationship must challenge and change us both at a fundamental level', scores: {  } },
          { text: 'Shared values and mutual respect, we\'re each other\'s allies in navigating the social world', scores: {  } },
        ],
      },
      {
        text: 'How do you experience attraction, not just romantic, but attraction to ideas, people, or experiences?',
        options: [
          { text: 'Cautiously, I assess whether something will be beneficial and sustainable before investing', scores: {  } },
          { text: 'Intensely, when something or someone captivates me, I feel pulled toward them with magnetic force', scores: {  } },
          { text: 'Broadly, I\'m attracted to movements, communities, and ideas that are bigger than any one person', scores: {  } },
        ],
      },
      {
        text: 'What drains you the most?',
        options: [
          { text: 'Chaos and instability, too much unpredictability exhausts my need for a solid foundation', scores: {  } },
          { text: 'Mediocrity and lukewarmness, superficial interactions and a lack of passion make me feel dead inside', scores: {  } },
          { text: 'Isolation and irrelevance, being cut off from the group and having no sense of shared purpose', scores: {  } },
        ],
      },
      {
        text: 'When you feel disconnected from yourself, what do you seek?',
        options: [
          { text: 'Grounding rituals, familiar routines, physical sensations, and practical activities that anchor me', scores: {  } },
          { text: 'An intense experience, something that shakes me awake, whether through connection, art, or risk', scores: {  } },
          { text: 'Community re-engagement, returning to my group, catching up with friends, or contributing to a cause', scores: {  } },
        ],
      },
      {
        text: 'How do others typically experience your presence?',
        options: [
          { text: 'Grounded and dependable, people see me as steady, practical, and someone who has their life in order', scores: {  } },
          { text: 'Intense and magnetic, people either feel deeply drawn to me or somewhat overwhelmed by my energy', scores: {  } },
          { text: 'Socially aware and engaged, people see me as connected, informed, and attuned to group dynamics', scores: {  } },
        ],
      },
      {
        text: 'What gives your life the most meaning?',
        options: [
          { text: 'Personal well-being and security, taking care of myself and building a comfortable, sustainable life', scores: {  } },
          { text: 'Passionate bonds, the depth and intensity of my closest relationships and creative pursuits', scores: {  } },
          { text: 'Contributing to something larger, my role in community, making a difference, and being part of the bigger picture', scores: {  } },
        ],
      },
      {
        text: 'How aware are you of social hierarchies and group dynamics?',
        options: [
          { text: 'Not very, I\'m more focused on my own needs and whether my personal resources are adequate', scores: {  } },
          { text: 'Somewhat, but I care more about the depth of individual connections than about group politics', scores: {  } },
          { text: 'Very, I naturally read the room, track social dynamics, and understand who holds influence and why', scores: {  } },
        ],
      },
      {
        text: 'When you think about your legacy, what matters most?',
        options: [
          { text: 'That I built something lasting and practical, a home, a savings, a body of work that endures', scores: {  } },
          { text: 'That I loved and was loved intensely, that my deepest bonds left a permanent mark on those people', scores: {  } },
          { text: 'That I made a difference, that my community or the world is better because of my contribution', scores: {  } },
        ],
      },
      {
        text: 'What role do you naturally gravitate toward in groups?',
        options: [
          { text: 'The practical one, I handle logistics, resources, and make sure real needs are met', scores: {  } },
          { text: 'The catalyst, I spark deeper conversations and push for more authenticity and intensity', scores: {  } },
          { text: 'The connector, I read the group, build bridges between people, and help everyone feel included', scores: {  } },
        ],
      },
      {
        text: 'How do you feel about social obligations and invitations?',
        options: [
          { text: 'They often feel draining, I\'d rather stay home in my comfortable space', scores: {  } },
          { text: 'It depends entirely on who will be there, if someone I deeply connect with will attend, I\'m in', scores: {  } },
          { text: 'I feel pulled to attend, staying connected to my network and maintaining relationships feels important', scores: {  } },
        ],
      },
      {
        text: 'What kind of conversations energize you?',
        options: [
          { text: 'Practical and specific, discussing real plans, useful information, and tangible next steps', scores: {  } },
          { text: 'Deep and personal, sharing vulnerable truths, exploring the hidden layers of someone\'s inner world', scores: {  } },
          { text: 'Big-picture and collective, discussing ideas that affect communities, society, or the common good', scores: {  } },
        ],
      },
    ],
  },
  {
    id: 'round-5-movement',
    title: 'Growth & Stress Patterns',
    description: 'These questions confirm your type by testing how you change under stress and during growth, the signature movement patterns of each Enneagram type.',
    questions: [
      {
        text: 'When you\'re burned out from trying to do everything perfectly, do you sometimes become moody, withdrawn, and envious of others who seem to live freely? And when you\'re at your healthiest, do you become more spontaneous, joyful, and open to imperfection?',
        options: [
          { text: 'Yes, this describes a real pattern in my life, I oscillate between rigid self-control and emotional collapse, and my best moments are when I let go and enjoy life', scores: { "T1": 4 } },
          { text: 'This doesn\'t match my experience, my stress and growth look different', scores: { "T1": 0 } },
        ],
      },
      {
        text: 'When you\'ve been giving too much and feeling taken for granted, do you sometimes become aggressive, controlling, and demanding? And at your best, do you become more emotionally honest about your own needs and creative in self-expression?',
        options: [
          { text: 'Yes, this is me, when I\'m depleted I can become shockingly forceful, and my healthiest moments are when I acknowledge my own feelings and needs', scores: { "T2": 4 } },
          { text: 'This doesn\'t match my experience, my stress and growth look different', scores: { "T2": 0 } },
        ],
      },
      {
        text: 'When your drive for success leaves you exhausted, do you sometimes zone out, become apathetic, and lose all motivation? And at your best, do you become more loyal, team-oriented, and willing to work for the group rather than personal glory?',
        options: [
          { text: 'Yes, this captures it, I can crash into total numbness after burnout, and I\'m healthiest when I stop performing and commit genuinely to others', scores: { "T3": 4 } },
          { text: 'This doesn\'t match my experience, my stress and growth look different', scores: { "T3": 0 } },
        ],
      },
      {
        text: 'When your melancholy and sense of deficiency become overwhelming, do you sometimes become clingy, people-pleasing, and desperate for someone to rescue you? And at your healthiest, do you become more disciplined, principled, and able to act on your values regardless of mood?',
        options: [
          { text: 'Yes, I recognize this, when I\'m drowning in emotion I grasp at others for rescue, but my best self is grounded, purposeful, and acts despite how I feel', scores: { "T4": 4 } },
          { text: 'This doesn\'t match my experience, my stress and growth look different', scores: { "T4": 0 } },
        ],
      },
      {
        text: 'When your isolation and mental intensity become too much, do you sometimes become scattered, hyperactive, and compulsively seeking stimulation? And at your healthiest, do you become more decisive, embodied, and willing to take bold action in the world?',
        options: [
          { text: 'Yes, I see this clearly, when overwhelmed I scatter into frantic distraction, and I\'m at my best when I step into my power and act with confidence', scores: { "T5": 4 } },
          { text: 'This doesn\'t match my experience, my stress and growth look different', scores: { "T5": 0 } },
        ],
      },
      {
        text: 'When your anxiety becomes unmanageable, do you sometimes become image-conscious, competitive, and focused on proving yourself through achievement? And at your healthiest, do you become more peaceful, trusting, and able to quiet your inner alarm system?',
        options: [
          { text: 'Yes, this is my pattern, under extreme stress I start performing and posturing, but my best moments are when I can finally relax and trust that things will be okay', scores: { "T6": 4 } },
          { text: 'This doesn\'t match my experience, my stress and growth look different', scores: { "T6": 0 } },
        ],
      },
      {
        text: 'When you can\'t escape pain or boredom, do you sometimes become rigid, critical, and perfectionistic, lashing out at others for being imperfect? And at your healthiest, do you become more focused, contemplative, and able to sit with depth rather than constantly seeking the next experience?',
        options: [
          { text: 'Yes, exactly, trapped pain turns me brittle and judgmental, but my growth edge is learning to be still, go deep, and find richness in one thing rather than everything', scores: { "T7": 4 } },
          { text: 'This doesn\'t match my experience, my stress and growth look different', scores: { "T7": 0 } },
        ],
      },
      {
        text: 'When you feel betrayed or overwhelmed by the world\'s resistance, do you sometimes withdraw completely, becoming secretive, cerebral, and emotionally shut down? And at your healthiest, do you become more tender, open-hearted, and genuinely nurturing toward others?',
        options: [
          { text: 'Yes, this is real for me, deep hurt makes me retreat into cold isolation, and my truest growth is when I let my guard down and care for others with vulnerability', scores: { "T8": 4 } },
          { text: 'This doesn\'t match my experience, my stress and growth look different', scores: { "T8": 0 } },
        ],
      },
      {
        text: 'When your comfortable numbness is threatened, do you sometimes become anxious, suspicious, and reactive, suddenly worrying about everything that could go wrong? And at your healthiest, do you become more assertive, energized, and able to pursue your own goals with confidence?',
        options: [
          { text: 'Yes, I know this pattern, disruption makes me anxious and reactive, but at my best I find my own voice, take action, and shine with a quiet personal power', scores: { "T9": 4 } },
          { text: 'This doesn\'t match my experience, my stress and growth look different', scores: { "T9": 0 } },
        ],
      },
    ],
  },
  {
    id: 'round-6-mistype',
    title: 'Mistype Verification',
    description: 'These final questions distinguish between commonly confused types by targeting the precise motivational differences that separate them.',
    questions: [
      {
        text: 'You follow rules and feel anxious when things aren\'t right. But WHERE does that drive come from?',
        options: [
          { text: 'From my own internal compass, I have a clear sense of right and wrong that I developed myself, and I\'m frustrated when reality falls short of my ideals', scores: { "T1": 4 } },
          { text: 'From a need for external security, I follow rules because the world feels dangerous and structure keeps me safe from unpredictable threats', scores: { "T6": 4 } },
        ],
      },
      {
        text: 'When authority figures make mistakes, what is your gut reaction?',
        options: [
          { text: 'Moral outrage, they should be held to a higher standard and their failure to do right is personally offensive to me', scores: { "T1": 4 } },
          { text: 'Betrayed trust, I depended on them for guidance and their failure makes the world feel less safe and predictable', scores: { "T6": 4 } },
        ],
      },
      {
        text: 'You tend to put others first. But what is really happening beneath the surface?',
        options: [
          { text: 'I\'m strategically giving, I want to be needed and loved, and I\'m very aware of what I\'ve done for people and whether they appreciate it', scores: { "T2": 4 } },
          { text: 'I\'m merging and disappearing, I lose track of my own wants entirely and go along with others because asserting myself feels like it would create unbearable conflict', scores: { "T9": 4 } },
        ],
      },
      {
        text: 'When you help someone, what happens if they don\'t acknowledge your effort?',
        options: [
          { text: 'I feel resentful and hurt, I gave from the heart but I also expect to be recognized and valued for it', scores: { "T2": 4 } },
          { text: 'I barely notice, I wasn\'t keeping track of whether they appreciated it because I was just going with the flow', scores: { "T9": 4 } },
        ],
      },
      {
        text: 'You\'re energetic and always moving toward the next thing. What DRIVES that momentum?',
        options: [
          { text: 'The need to succeed and be admired, I\'m focused on goals, image, and proving my worth through achievement', scores: { "T3": 4 } },
          { text: 'The need to stay stimulated and avoid pain, I\'m focused on exciting possibilities and keeping negative feelings at bay', scores: { "T7": 4 } },
        ],
      },
      {
        text: 'When a project becomes tedious and unglamorous, what do you do?',
        options: [
          { text: 'I push through, if it will lead to a successful outcome and recognition, I can grind through anything', scores: { "T3": 4 } },
          { text: 'I lose interest, I\'m drawn to the next exciting idea and I struggle to stay with something that\'s become boring', scores: { "T7": 4 } },
        ],
      },
      {
        text: 'You experience intense inner turbulence. What is at the CENTER of that turbulence?',
        options: [
          { text: 'My identity, who am I really? Why do I feel fundamentally different from everyone else? What is missing in me?', scores: { "T4": 4 } },
          { text: 'My safety, what could go wrong? Who can I trust? Am I prepared for the worst-case scenario?', scores: { "T6": 4 } },
        ],
      },
      {
        text: 'When you feel most distressed, what do you long for?',
        options: [
          { text: 'To be truly understood, someone who sees my unique depth and doesn\'t try to fix or minimize my feelings', scores: { "T4": 4 } },
          { text: 'To feel safe, someone or something that provides solid ground and reassurance that everything will be okay', scores: { "T6": 4 } },
        ],
      },
      {
        text: 'You tend to withdraw from the world. But what is the NATURE of your withdrawal?',
        options: [
          { text: 'Active and intentional, I withdraw to think, research, and build mastery; my mind is intensely engaged even when I\'m alone', scores: { "T5": 4 } },
          { text: 'Passive and numbing, I withdraw into comfort and routine; I merge with simple pleasures and let my mind go diffuse to avoid being disturbed', scores: { "T9": 4 } },
        ],
      },
      {
        text: 'How do you experience your own needs and desires?',
        options: [
          { text: 'I\'m acutely aware of them but I minimize them, I know exactly what I need but I reduce my needs so I won\'t depend on anyone', scores: { "T5": 4 } },
          { text: 'I\'m genuinely disconnected from them, I often don\'t know what I want and I substitute other people\'s priorities for my own', scores: { "T9": 4 } },
        ],
      },
      {
        text: 'You tend to avoid discomfort and maintain a positive outlook. How do you DO that?',
        options: [
          { text: 'Through active stimulation, I fill my life with plans, ideas, experiences, and possibilities so there\'s no room for pain', scores: { "T7": 4 } },
          { text: 'Through passive disengagement, I numb out, go on autopilot, and merge with comfortable routines so I don\'t have to face what\'s difficult', scores: { "T9": 4 } },
        ],
      },
      {
        text: 'When someone asks you what you want, what happens internally?',
        options: [
          { text: 'I light up with options, I immediately have multiple exciting ideas and the challenge is choosing just one', scores: { "T7": 4 } },
          { text: 'I go blank, I genuinely struggle to locate my own desire and I might default to asking what they want instead', scores: { "T9": 4 } },
        ],
      },
    ],
  },
];