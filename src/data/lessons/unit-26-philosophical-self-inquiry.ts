// Unit 26: Philosophical Self-Inquiry
//
// Standalone philosophical introspection unit. Not type-specific. These
// are universal concepts about being human, framed as personal practices
// rather than academic philosophy. No tradition names unless the user
// asks. Concepts only.
//
// Progression: from examining your own experience → examining your
// relationship to suffering → examining your relationship to meaning.
//
// Exercise pattern rotation: A → B → C → A
// Pattern A: concept-intro → multiple-choice → sorting → scenario → free-recall
// Pattern B: concept-intro → fill-in-blank → matching-pairs → scenario → socratic-prompt
// Pattern C: concept-intro → multiple-choice → fill-in-blank → scenario → sorting

import type { Lesson } from "@/types/lessons";

export const unit26Lessons: Lesson[] = [
  {
    // ── LESSON 1: Pattern A ──
    id: "phi-examined-life",
    unitId: "philosophical-self-inquiry",
    order: 1,
    title: "The examined life",
    subtitle: "Self-knowledge as a daily discipline",
    xpReward: 30,
    exercises: [
      { id: "phi1-i", difficulty: 1, content: { type: "concept-intro", title: "The unexamined life is not worth living. But what does that actually mean?", body: "It does not mean you need to think about yourself all the time. It means: pay attention to your own experience on purpose. Not to fix yourself. Not to optimize. Just to notice. The practice of daily self-observation, even 60 seconds, changes your relationship to everything you do. Not because it gives you answers. Because it gives you honesty." } },
      { id: "phi1-mc", difficulty: 2, content: { type: "multiple-choice", question: "What is the primary purpose of 'examining your life' in this context?", options: ["Identifying your flaws so you can fix them", "Optimizing your daily routines for productivity", "Paying deliberate attention to your own experience without trying to change it", "Comparing your inner life to a theoretical ideal"], correctIndex: 2, explanation: "The examined life is not about self-improvement. It is about self-honesty. The practice is noticing what is already happening, not engineering what should happen. That distinction is the foundation of everything that follows." } },
      { id: "phi1-sort", difficulty: 2, content: { type: "sorting", instruction: "Sort these activities into whether they are 'examining your life' or 'optimizing your life'", categories: ["Examining", "Optimizing"], items: [{ text: "Noticing you feel anxious without trying to fix it", categoryIndex: 0 }, { text: "Setting a goal to be less reactive this week", categoryIndex: 1 }, { text: "Recognizing that you check your phone every morning without judging it", categoryIndex: 0 }, { text: "Making a plan to replace bad habits with good ones", categoryIndex: 1 }, { text: "Observing that you avoid certain conversations", categoryIndex: 0 }, { text: "Creating a morning routine to maximize focus", categoryIndex: 1 }] } },
      { id: "phi1-sc1", difficulty: 2, content: { type: "scenario", scenario: "Every morning for years, you check your phone within 30 seconds of waking up. You have never asked yourself why. One morning the phone is dead, and you sit in bed for five minutes feeling a low hum of discomfort you cannot name. It occurs to you that the phone was keeping something at bay.", question: "What does this moment of discomfort most likely reveal?", options: ["Phone addiction that requires a digital detox plan", "A sign of anxiety disorder that needs professional treatment", "An autopilot behavior that was serving as a defense against something you had not examined", "Nothing meaningful; habits are just habits"], correctIndex: 2, explanation: "The things we do without thinking are often the most revealing. The discomfort that surfaces when the habit breaks is a clue to what the habit was protecting you from. The examined life begins with noticing these invisible routines." } },
      { id: "phi1-fr", difficulty: 3, content: { type: "free-recall", prompt: "What is one small, daily habit you suspect is hiding something deeper? What do you think it might be protecting you from?", keyTerms: ["habit", "hiding", "protecting", "deeper", "daily", "avoid"], minWords: 20, modelAnswer: "The habits that feel most automatic often serve the most important psychological functions. Examining them is not about stopping them. It is about understanding what they are doing for you, so you relate to them with awareness instead of being run by them." } },
    ],
  },
  {
    // ── LESSON 2: Pattern B ──
    id: "phi-pain-suffering",
    unitId: "philosophical-self-inquiry",
    order: 2,
    title: "Pain is not suffering",
    subtitle: "The signal and the story",
    xpReward: 30,
    exercises: [
      { id: "phi2-i", difficulty: 1, content: { type: "concept-intro", title: "The feeling and the narrative are two different things", body: "Pain is a signal: something happened that matters. Suffering is the narrative you wrap around it: this should not be happening, I cannot handle this, this means something about me. Pain is fast. Suffering is slow, because the story keeps replaying. Across many traditions, people have noticed that the suffering is optional in a way that the pain is not." } },
      { id: "phi2-fib1", difficulty: 2, content: { type: "fill-in-blank", sentence: "Pain is the ___. Suffering is the ___ you wrap around it.", options: ["signal / narrative", "weakness / strength", "problem / solution", "past / future"], correctIndex: 0, explanation: "Pain is a direct signal that something matters. Suffering is the story you build on top of it. The signal is fast and honest. The narrative is slow and often exaggerates." } },
      { id: "phi2-match", difficulty: 2, content: { type: "matching-pairs", instruction: "Match each experience to whether it is pain (the signal) or suffering (the narrative)", pairs: [{ left: "A friend cancels plans and you feel a pang of disappointment", right: "Pain" }, { left: "You replay the cancellation for three days, deciding they don't care about you", right: "Suffering" }, { left: "You receive critical feedback and your stomach drops", right: "Pain" }, { left: "You spend the weekend convinced you're incompetent and will be fired", right: "Suffering" }, { left: "A relationship ends and you feel grief", right: "Pain" }, { left: "You tell yourself you will never be loved and something is fundamentally wrong with you", right: "Suffering" }] } },
      { id: "phi2-sc1", difficulty: 2, content: { type: "scenario", scenario: "You receive a short, neutral text from someone you care about: 'Can we talk later?' Within seconds, your stomach drops. Your mind races through a dozen catastrophic interpretations: they are angry, they are leaving, you did something wrong. An hour later, they call to ask for a restaurant recommendation.", question: "What does the gap between the text and the spiral reveal?", options: ["You have trust issues that need to be worked through", "The pain was in the signal, the neutral text itself", "The suffering was generated almost entirely by the narrative you constructed, not by the event", "Neutral messages are inherently threatening and your response was reasonable"], correctIndex: 2, explanation: "The text was four words. The suffering was an hour of narrative. This is the distinction between pain (the brief pang of uncertainty) and suffering (the elaborate story your mind built on top of it). The signal was small. The story was enormous." } },
      { id: "phi2-sp", difficulty: 3, content: { type: "socratic-prompt", question: "Think of a recent painful experience. Can you separate the raw feeling from the story you told yourself about it? How long did the feeling last versus the story?", reflection: "The feeling lasted minutes. The story lasted days. That difference is the key.", revealLabel: "The distinction", conceptTitle: "Signal vs narrative", conceptBody: "This is not about suppressing pain or pretending it does not hurt. The pain is real and deserves attention. The practice is noticing when the story takes over: when 'I feel sad' becomes 'I always feel sad, nothing ever works, I am fundamentally broken.' The first is contact with reality. The second is a pattern running." } },
    ],
  },
  {
    // ── LESSON 3: Pattern C ──
    id: "phi-meaning-making",
    unitId: "philosophical-self-inquiry",
    order: 3,
    title: "You are the meaning-maker",
    subtitle: "Nothing has inherent meaning. You assign it.",
    xpReward: 30,
    exercises: [
      { id: "phi3-i", difficulty: 1, content: { type: "concept-intro", title: "Meaning is something you make, not something you find", body: "Events do not come pre-labeled as meaningful or meaningless. You assign meaning through attention, interpretation, and story. This is not nihilism. It is the opposite: it means you are more powerful than you think. If meaning is made, you are the maker. If the story shapes the life, you are the author." } },
      { id: "phi3-mc", difficulty: 2, content: { type: "multiple-choice", question: "If meaning is constructed rather than discovered, what does that imply about moments that feel meaningless?", options: ["They are genuinely meaningless and should be avoided", "They are waiting for someone to assign them meaning, and you are that someone", "Meaning only exists in dramatic or peak experiences", "Some events have inherent meaning and others do not"], correctIndex: 1, explanation: "If meaning is made and not found, then no moment is inherently meaningless. It is waiting for your attention, your framing, your story. That is not a burden. It is a superpower." } },
      { id: "phi3-fib", difficulty: 2, content: { type: "fill-in-blank", sentence: "Your Enneagram type predisposes you toward certain kinds of ___. But you are not limited to your type's ___.", options: ["meaning / default", "suffering / pattern", "behavior / defense", "growth / ceiling"], correctIndex: 0, explanation: "Each type gravitates toward particular sources of meaning: 1s toward integrity, 4s toward depth, 8s toward impact. But you can choose to find meaning beyond your type's default. That choice is itself meaningful." } },
      { id: "phi3-sc1", difficulty: 2, content: { type: "scenario", scenario: "Two people work at the same job. One finds it deeply meaningful; the other finds it soul crushing. The tasks are identical. The pay is the same. The hours match. The only difference is the story each person tells about what the work means.", question: "What does this difference reveal about meaning?", options: ["One person has the right attitude and the other has the wrong one", "Meaning is inherent in certain jobs and absent from others", "Meaning is not found in the situation itself; it is constructed by the person experiencing it", "The person who finds it meaningful is simply in denial about the reality of the work"], correctIndex: 2, explanation: "Events do not come pre-labeled as meaningful or meaningless. You assign meaning through attention, interpretation, and story. This is not a comforting platitude. It is a statement about the structure of human experience. If meaning is made, you are the maker." } },
      { id: "phi3-sort", difficulty: 3, content: { type: "sorting", instruction: "Sort these into 'meaning I chose' versus 'meaning I inherited'", categories: ["Chose deliberately", "Inherited from pattern/culture"], items: [{ text: "Valuing hard work because your family equated worth with productivity", categoryIndex: 1 }, { text: "Deciding to prioritize creativity after reflecting on what energizes you", categoryIndex: 0 }, { text: "Feeling guilty when you rest because you were taught rest is laziness", categoryIndex: 1 }, { text: "Choosing to invest in a friendship because you value depth over breadth", categoryIndex: 0 }, { text: "Pursuing prestige because your environment rewarded status", categoryIndex: 1 }, { text: "Committing to honesty after realizing how much dishonesty costs you", categoryIndex: 0 }] } },
    ],
  },
  {
    // ── LESSON 4: Pattern A (rotated back) ──
    id: "phi-compassion-defenses",
    unitId: "philosophical-self-inquiry",
    order: 4,
    title: "Compassion for your armor",
    subtitle: "Your defenses kept you alive. You can thank them and loosen them.",
    xpReward: 30,
    exercises: [
      { id: "phi4-i", difficulty: 1, content: { type: "concept-intro", title: "Your personality structure is not a mistake", body: "Every Enneagram type is a defense that once made sense. The 1 learned that being good kept them safe. The 6 learned that vigilance prevented disaster. The 9 learned that disappearing prevented conflict. These are not pathologies. They are survival strategies that worked. The question now is not 'how do I get rid of this?' It is 'do I still need this level of protection?'" } },
      { id: "phi4-mc", difficulty: 2, content: { type: "multiple-choice", question: "What is the healthiest way to relate to your personality defenses?", options: ["Fight them until they go away", "Analyze their childhood origins to eliminate them", "Thank them for their service and gently test whether you still need them at full strength", "Accept them completely and never question them"], correctIndex: 2, explanation: "Your defenses are not enemies. They are old survival strategies that worked. You do not dismantle them by fighting. You soften them by acknowledging what they did for you, then asking whether the emergency is over." } },
      { id: "phi4-sort", difficulty: 2, content: { type: "sorting", instruction: "Sort these approaches to your defenses into 'helpful' versus 'counterproductive'", categories: ["Helpful", "Counterproductive"], items: [{ text: "Noticing when the defense activates without judging it", categoryIndex: 0 }, { text: "Forcing yourself to do the opposite of your pattern every time", categoryIndex: 1 }, { text: "Acknowledging that the defense once protected you from something real", categoryIndex: 0 }, { text: "Criticizing yourself for still having the defense", categoryIndex: 1 }, { text: "Gently testing whether you still need maximum protection", categoryIndex: 0 }, { text: "Treating your pattern as a character flaw to overcome", categoryIndex: 1 }] } },
      { id: "phi4-sc1", difficulty: 2, content: { type: "scenario", scenario: "A colleague gives you unexpected praise in front of the team. Instead of feeling good, your body tenses. A voice inside says: 'They do not really mean it. If they knew the real you, they would not say that.' You recognize this voice. It has been with you since you were young. It once protected you from the pain of believing something good and having it taken away.", question: "What is the wisest way to relate to this inner voice?", options: ["Override it with positive affirmations until it goes away", "Analyze its origins in childhood to understand and eliminate it", "Recognize it as a defense that once served you, thank it, and gently test whether you still need it at full strength", "Accept that the voice is right and you should not trust the praise"], correctIndex: 2, explanation: "Your defenses are not your enemies. They are old strategies that worked in a different context. The practice is not fighting them or obeying them. It is thanking them for their service and gently asking whether the emergency is over." } },
      { id: "phi4-fr", difficulty: 3, content: { type: "free-recall", prompt: "Write a short message to your defense structure, as if it were a person. Thank it for something specific. Then tell it one place where it can relax.", keyTerms: ["thank", "relax", "safe", "enough", "protected"], minWords: 20, modelAnswer: "This is not silly. This is the practice. Relating to your pattern as something you have rather than something you are creates the distance that growth requires. The type stays. The relationship to it changes. That is the whole game." } },
    ],
  },
];
