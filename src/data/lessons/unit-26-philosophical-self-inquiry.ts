// Unit 26: Philosophical Self-Inquiry
//
// Standalone philosophical introspection unit. Not type-specific. These
// are universal concepts about being human, framed as personal practices
// rather than academic philosophy. No tradition names unless the user
// asks. Concepts only.
//
// Progression: from examining your own experience → examining your
// relationship to suffering → examining your relationship to meaning.

import type { Lesson } from "@/types/lessons";

export const unit26Lessons: Lesson[] = [
  {
    id: "phi-examined-life",
    unitId: "philosophical-self-inquiry",
    order: 1,
    title: "The examined life",
    subtitle: "Self-knowledge as a daily discipline",
    xpReward: 30,
    exercises: [
      { id: "phi1-i", difficulty: 1, content: { type: "concept-intro", title: "The unexamined life is not worth living. But what does that actually mean?", body: "It does not mean you need to think about yourself all the time. It means: pay attention to your own experience on purpose. Not to fix yourself. Not to optimize. Just to notice. The practice of daily self-observation, even 60 seconds, changes your relationship to everything you do. Not because it gives you answers. Because it gives you honesty." } },
      { id: "phi1-s", difficulty: 2, content: { type: "socratic-prompt", question: "What is one thing you do every day without ever asking yourself why?", reflection: "The things we do on autopilot are often the most revealing. Not because they are wrong but because they are invisible.", revealLabel: "The practice", conceptTitle: "Noticing the invisible", conceptBody: "Most of your life runs on autopilot. Your type has a specific autopilot: a set of default reactions, default interpretations, default moves. The examined life is not about stopping the autopilot. It is about knowing when it is on." } },
      { id: "phi1-f", difficulty: 3, content: { type: "free-recall", prompt: "What is the most honest thing you could say about yourself right now, that you would not normally say?", keyTerms: ["honest", "normally", "admit", "actually", "really"], minWords: 15, modelAnswer: "Radical honesty with yourself is the foundation. You do not have to share it with anyone. You just have to know it. That knowing changes everything that comes after." } },
    ],
  },
  {
    id: "phi-pain-suffering",
    unitId: "philosophical-self-inquiry",
    order: 2,
    title: "Pain is not suffering",
    subtitle: "The signal and the story",
    xpReward: 30,
    exercises: [
      { id: "phi2-i", difficulty: 1, content: { type: "concept-intro", title: "The feeling and the narrative are two different things", body: "Pain is a signal: something happened that matters. Suffering is the narrative you wrap around it: this should not be happening, I cannot handle this, this means something about me. Pain is fast. Suffering is slow, because the story keeps replaying. Across many traditions, people have noticed that the suffering is optional in a way that the pain is not." } },
      { id: "phi2-s", difficulty: 2, content: { type: "socratic-prompt", question: "Think of a recent painful experience. Can you separate the raw feeling from the story you told yourself about it?", reflection: "The feeling lasted minutes. The story lasted days. That difference is the key.", revealLabel: "The distinction", conceptTitle: "Signal vs narrative", conceptBody: "This is not about suppressing pain or pretending it does not hurt. The pain is real and deserves attention. The practice is noticing when the story takes over: when 'I feel sad' becomes 'I always feel sad, nothing ever works, I am fundamentally broken.' The first is contact with reality. The second is a pattern running." } },
      { id: "phi2-f", difficulty: 3, content: { type: "free-recall", prompt: "Write about a time when the story you told about a painful event was worse than the event itself.", keyTerms: ["story", "worse", "told", "actually", "event"], minWords: 20, modelAnswer: "Most suffering lives in the gap between what happened and what you told yourself about what happened. Closing that gap, even slightly, is one of the most practical things self-knowledge can do." } },
    ],
  },
  {
    id: "phi-meaning-making",
    unitId: "philosophical-self-inquiry",
    order: 3,
    title: "You are the meaning-maker",
    subtitle: "Nothing has inherent meaning. You assign it.",
    xpReward: 30,
    exercises: [
      { id: "phi3-i", difficulty: 1, content: { type: "concept-intro", title: "Meaning is something you make, not something you find", body: "Events do not come pre-labeled as meaningful or meaningless. You assign meaning through attention, interpretation, and story. This is not nihilism. It is the opposite: it means you are more powerful than you think. If meaning is made, you are the maker. If the story shapes the life, you are the author." } },
      { id: "phi3-s", difficulty: 2, content: { type: "socratic-prompt", question: "What gives your life meaning right now? And did you choose it, or did it choose you?", reflection: "Sometimes the most meaningful things were not chosen. They were inherited, stumbled into, or forced upon you. That does not make them less real.", revealLabel: "The question underneath", conceptTitle: "Choosing your meaning", conceptBody: "Your Enneagram type predisposes you toward certain kinds of meaning: 1s find meaning in integrity, 4s in depth, 8s in impact. But you are not limited to your type's default. You can choose to find meaning in something your pattern would never suggest. That act of choosing is itself the most meaningful thing." } },
      { id: "phi3-f", difficulty: 3, content: { type: "free-recall", prompt: "If you had to choose one word for what gives your life meaning, what would it be? Why that word?", keyTerms: ["word", "meaning", "because", "matters", "life"], minWords: 15, modelAnswer: "The word you chose is a window into your values, your type, and your current life stage. It may change. That is fine. What matters is that you chose it deliberately, instead of inheriting it from your pattern." } },
    ],
  },
  {
    id: "phi-compassion-defenses",
    unitId: "philosophical-self-inquiry",
    order: 4,
    title: "Compassion for your armor",
    subtitle: "Your defenses kept you alive. You can thank them and loosen them.",
    xpReward: 30,
    exercises: [
      { id: "phi4-i", difficulty: 1, content: { type: "concept-intro", title: "Your personality structure is not a mistake", body: "Every Enneagram type is a defense that once made sense. The 1 learned that being good kept them safe. The 6 learned that vigilance prevented disaster. The 9 learned that disappearing prevented conflict. These are not pathologies. They are survival strategies that worked. The question now is not 'how do I get rid of this?' It is 'do I still need this level of protection?'" } },
      { id: "phi4-s", difficulty: 2, content: { type: "socratic-prompt", question: "What is the oldest defense you have? The one that has been with you longest? Can you see how it once served you?", reflection: "Your defense is not your enemy. It is an old friend who does not know the emergency is over.", revealLabel: "The reframe", conceptTitle: "Thanking the defense", conceptBody: "You do not dismantle a defense structure by fighting it. You do it by thanking it for what it did, acknowledging that it worked, and then gently testing whether you still need it at full strength. Your type will always be your type. But the defense can soften from a wall to a door." } },
      { id: "phi4-f", difficulty: 3, content: { type: "free-recall", prompt: "Write a short message to your defense structure, as if it were a person. Thank it for something specific. Then tell it one place where it can relax.", keyTerms: ["thank", "relax", "safe", "enough", "protected"], minWords: 20, modelAnswer: "This is not silly. This is the practice. Relating to your pattern as something you have rather than something you are creates the distance that growth requires. The type stays. The relationship to it changes. That is the whole game." } },
    ],
  },
];
