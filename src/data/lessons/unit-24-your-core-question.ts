// Unit 24: Your Core Question
//
// Type-specific philosophical exploration. Each type gets a different
// central question and 2 concept lessons that speak to it.
// Personalized by Enneagram type. Labels are never shown.
//
// Key grounding: you do not outgrow your type. The pattern stays.
// What changes is your capacity to hold it, see it, and choose
// around it. These concepts are tools for that, not exits.

import type { Lesson } from "@/types/lessons";

// All 9 type paths. The app filters to the user's type at render time.
// Each lesson has personalized: true and personalizeFor: "enneagramType"

const TYPE_QUESTIONS: Record<number, { question: string; lessons: Lesson[] }> = {
  1: {
    question: "How do I act rightly in an imperfect world?",
    lessons: [
      {
        id: "cq-1a", unitId: "your-core-question", order: 1, xpReward: 30,
        title: "What you can and cannot control",
        subtitle: "The distinction that creates peace",
        personalized: true, personalizeFor: "enneagramType",
        exercises: [
          { id: "cq1a-i", difficulty: 1, content: { type: "concept-intro", title: "The oldest useful distinction", body: "Some things are up to you: your judgments, your effort, your responses. Some things are not: other people, outcomes, the past. Most suffering comes from treating the second category as if it were the first." } },
          { id: "cq1a-s", difficulty: 2, content: { type: "socratic-prompt", question: "What is one thing you have been trying to control this week that is not actually up to you?", reflection: "The inner critic often assigns you responsibility for things that are outside your control.", revealLabel: "See the reframe", conceptTitle: "Responsibility has edges", conceptBody: "You are responsible for your effort and your integrity. You are not responsible for whether the world meets your standards. Recognizing the boundary is not giving up. It is precision." } },
          { id: "cq1a-f", difficulty: 3, content: { type: "free-recall", prompt: "In your own words: what is the difference between having high standards and needing the world to meet them?", keyTerms: ["standards", "control", "let go", "accept", "enough"], minWords: 20, modelAnswer: "High standards are a strength. The suffering comes when the standard becomes a demand on reality. Your type will always care about getting it right. The growth is in how you hold the caring." } },
        ],
      },
      {
        id: "cq-1b", unitId: "your-core-question", order: 2, xpReward: 30,
        title: "Good enough as a radical act",
        subtitle: "The middle path is itself a skill",
        personalized: true, personalizeFor: "enneagramType",
        exercises: [
          { id: "cq1b-i", difficulty: 1, content: { type: "concept-intro", title: "Between too much and not enough", body: "There is a point between excess and deficiency that is not a compromise but a skill. Finding it requires more wisdom than hitting either extreme. 'Good enough' is not mediocrity. It is the recognition that perfection is a direction, not a destination." } },
          { id: "cq1b-s", difficulty: 2, content: { type: "socratic-prompt", question: "When was the last time 'good enough' felt like a relief instead of a failure?", reflection: "Your type will always feel the pull toward getting it exactly right. The practice is not killing that pull. It is choosing when to follow it.", revealLabel: "The practice", conceptTitle: "Imperfection as practice", conceptBody: "Deliberately letting something be imperfect, not because you don't care but because you recognize the cost of perfecting it, is one of the hardest things for your pattern. Each time you do it, the grip loosens slightly. The type stays. The grip changes." } },
          { id: "cq1b-f", difficulty: 3, content: { type: "free-recall", prompt: "Describe one thing you could let be 'good enough' this week. What would that free up?", keyTerms: ["good enough", "let go", "free", "energy", "time"], minWords: 15, modelAnswer: "What you free up by releasing one perfection demand is not laziness. It is capacity. Your type has limited energy. Spending it on the things that actually matter, instead of on everything equally, is the growth move." } },
        ],
      },
    ],
  },
  2: {
    question: "Who am I when I am not needed?",
    lessons: [
      {
        id: "cq-2a", unitId: "your-core-question", order: 1, xpReward: 30,
        title: "You exist before you are useful",
        subtitle: "Being is not earned through giving",
        personalized: true, personalizeFor: "enneagramType",
        exercises: [
          { id: "cq2a-i", difficulty: 1, content: { type: "concept-intro", title: "You were here before you helped", body: "There is a version of you that exists independent of what you give to others. Not the helper, not the connector, not the one who holds the room together. Just you, sitting alone, with nothing to offer and no one to take care of. That version is not empty. It is the foundation." } },
          { id: "cq2a-s", difficulty: 2, content: { type: "socratic-prompt", question: "If everyone you love was perfectly fine and needed nothing from you, what would you do with your day?", reflection: "The answer to this question is often blank for your type. The blankness is not a problem to solve. It is a space to explore.", revealLabel: "See the reframe", conceptTitle: "The gift underneath the giving", conceptBody: "Your type will always orient toward others. That is not the problem. The problem is when the giving becomes the only way you know you exist. The practice is: can you sit with yourself when no one needs you, and still feel real?" } },
          { id: "cq2a-f", difficulty: 3, content: { type: "free-recall", prompt: "Describe one thing you enjoy that has nothing to do with another person.", keyTerms: ["enjoy", "alone", "myself", "just", "me"], minWords: 15, modelAnswer: "If this was hard to answer, that is the most important data point in this lesson. Your type does not lack a self. It buries the self under service. The self is still there. It just needs practice being visible." } },
        ],
      },
    ],
  },
  3: {
    question: "Am I what I achieve, or is there something underneath?",
    lessons: [
      {
        id: "cq-3a", unitId: "your-core-question", order: 1, xpReward: 30,
        title: "What happens when you stop performing",
        subtitle: "The person behind the image",
        personalized: true, personalizeFor: "enneagramType",
        exercises: [
          { id: "cq3a-i", difficulty: 1, content: { type: "concept-intro", title: "You have been playing a character", body: "There is a difference between who you are and who you present. Everyone does this to some degree. But for your pattern, the gap can become so large that you lose track of which one is real. The performance becomes the identity, and the real person waits behind it." } },
          { id: "cq3a-s", difficulty: 2, content: { type: "socratic-prompt", question: "If all your accomplishments were erased tomorrow, what would be left? Describe that person.", reflection: "This question often creates anxiety for your type. The anxiety is the data.", revealLabel: "See the insight", conceptTitle: "The self behind the resume", conceptBody: "Your type will always be drawn to achievement. That energy is real and valuable. The growth is in knowing that the person who achieves is not the same as the achievements. You were someone before the first gold star, and you will be someone after." } },
          { id: "cq3a-f", difficulty: 3, content: { type: "free-recall", prompt: "Write one sentence about who you are that does not mention anything you have done or accomplished.", keyTerms: ["I am", "feel", "care", "value"], minWords: 10, modelAnswer: "If this was difficult, you have found the growth edge. Your type builds identity on output. The practice is discovering that identity also exists in stillness." } },
        ],
      },
    ],
  },
  4: {
    question: "Why does meaning keep slipping away?",
    lessons: [
      {
        id: "cq-4a", unitId: "your-core-question", order: 1, xpReward: 30,
        title: "Depth lives in the ordinary",
        subtitle: "What if the mundane is not the enemy of meaning",
        personalized: true, personalizeFor: "enneagramType",
        exercises: [
          { id: "cq4a-i", difficulty: 1, content: { type: "concept-intro", title: "The ordinary is not the absence of depth", body: "There is a belief your pattern carries: that the real, meaningful experience is somewhere else, in the past, in the future, in someone else's life. But the people who report the deepest lives are usually the ones who found depth in what was already here. Not by making it special. By paying attention." } },
          { id: "cq4a-s", difficulty: 2, content: { type: "socratic-prompt", question: "What is one ordinary, everyday thing that you secretly find beautiful but would never tell anyone about?", reflection: "Your type tends to dismiss the ordinary as unworthy. But the things you secretly love reveal where depth already exists in your life.", revealLabel: "See the insight", conceptTitle: "Depth is attention, not content", conceptBody: "Meaning is not a property of events. It is a property of attention. The same Tuesday afternoon can be empty or profound depending on how present you are to it. Your type will always long for significance. The practice is finding it where you already are." } },
          { id: "cq4a-f", difficulty: 3, content: { type: "free-recall", prompt: "Describe one moment from this week that was completely ordinary but, if you are honest, meant something to you.", keyTerms: ["ordinary", "moment", "small", "noticed", "meant"], minWords: 20, modelAnswer: "These moments are everywhere. Your type is wired to see them but also to dismiss them as 'not enough.' Collecting them, deliberately, is the counter-practice." } },
        ],
      },
    ],
  },
  5: {
    question: "Can I engage with the world without being depleted?",
    lessons: [
      {
        id: "cq-5a", unitId: "your-core-question", order: 1, xpReward: 30,
        title: "Understanding must become participation",
        subtitle: "The map is never the territory",
        personalized: true, personalizeFor: "enneagramType",
        exercises: [
          { id: "cq5a-i", difficulty: 1, content: { type: "concept-intro", title: "Knowledge that stays in your head is not knowledge", body: "There is a point where more information does not help. It just postpones the moment of contact. Your type gathers understanding as a way to feel prepared. But preparation without action is a loop, not a path." } },
          { id: "cq5a-s", difficulty: 2, content: { type: "socratic-prompt", question: "What is one thing you understand deeply but have never actually done or tried?", reflection: "The gap between knowing and doing is where your type lives. Not because you are lazy but because doing feels like it costs something that knowing does not.", revealLabel: "See the reframe", conceptTitle: "Contact replenishes", conceptBody: "Your type assumes the world depletes. And sometimes it does. But contact with real experience, not just ideas about experience, also replenishes. The energy comes back through engagement, not just through withdrawal. The pattern says otherwise. The practice is testing that." } },
          { id: "cq5a-f", difficulty: 3, content: { type: "free-recall", prompt: "Describe one area where you could stop researching and start doing. What is the smallest possible step?", keyTerms: ["do", "start", "try", "step", "enough"], minWords: 15, modelAnswer: "The smallest step is always the right one for your type. Grand action is overwhelming. One email, one conversation, one attempt. The practice is not 'engage more.' It is 'engage once, and notice that you survived.'" } },
        ],
      },
    ],
  },
  6: {
    question: "How do I act when I cannot be certain?",
    lessons: [
      {
        id: "cq-6a", unitId: "your-core-question", order: 1, xpReward: 30,
        title: "Inhabiting doubt skillfully",
        subtitle: "Uncertainty is a condition, not a problem",
        personalized: true, personalizeFor: "enneagramType",
        exercises: [
          { id: "cq6a-i", difficulty: 1, content: { type: "concept-intro", title: "Doubt is not the enemy", body: "Your type treats uncertainty as a problem to solve: if you think hard enough, prepare well enough, consult the right people, certainty will arrive. But certainty rarely arrives. The people who act well under uncertainty are not the ones who found answers. They are the ones who learned to move without them." } },
          { id: "cq6a-s", difficulty: 2, content: { type: "socratic-prompt", question: "What would you do differently this week if you trusted that you already know enough to act?", reflection: "The question is not whether you have enough information. It almost always is. The question is whether you trust yourself to use it.", revealLabel: "See the insight", conceptTitle: "Inner authority", conceptBody: "Your type scans for external authority: experts, rules, trusted people. But the final move is always internal. You already know more than you trust. The practice is acting on your own judgment once, and noticing that the world does not collapse." } },
          { id: "cq6a-f", difficulty: 3, content: { type: "free-recall", prompt: "Describe one decision you have been postponing because you are not sure enough. What would 'good enough certainty' look like?", keyTerms: ["decision", "postpone", "enough", "trust", "act"], minWords: 15, modelAnswer: "Good enough certainty is not 100%. It is usually around 70%. Your type waits for 95% and it never comes. Acting at 70% and adjusting is not reckless. It is how most people operate. Your type can learn to do it too, without losing the careful thinking that makes you valuable." } },
        ],
      },
    ],
  },
  7: {
    question: "What am I avoiding when I reach for the next thing?",
    lessons: [
      {
        id: "cq-7a", unitId: "your-core-question", order: 1, xpReward: 30,
        title: "The difference between pain and suffering",
        subtitle: "Contact with reality is not the same as a story about it",
        personalized: true, personalizeFor: "enneagramType",
        exercises: [
          { id: "cq7a-i", difficulty: 1, content: { type: "concept-intro", title: "Pain is the signal. Suffering is the story.", body: "There is a difference between the raw feeling, the sadness, the fear, the boredom, and the narrative you wrap around it. Pain says: something is happening. Suffering says: this should not be happening, I need to escape, what is the next option. Your type moves to the story very quickly. The practice is staying with the signal." } },
          { id: "cq7a-s", difficulty: 2, content: { type: "socratic-prompt", question: "What is the feeling you move away from fastest? What do you typically reach for instead?", reflection: "The thing you reach for (a plan, a possibility, a new idea) is the tell. It reveals what you are moving AWAY from.", revealLabel: "The practice", conceptTitle: "Staying is freedom too", conceptBody: "Your type equates freedom with options. But there is another kind of freedom: the freedom to stay with one experience fully, without needing it to be different. This is harder for your pattern than almost any other. It is also the most rewarding practice, because it reveals that depth was always available. You were just moving too fast to find it." } },
          { id: "cq7a-f", difficulty: 3, content: { type: "free-recall", prompt: "Describe a time when you stayed with something uncomfortable instead of escaping it. What happened?", keyTerms: ["stayed", "uncomfortable", "felt", "through", "instead"], minWords: 20, modelAnswer: "The stay is the practice. Your type will always want to move. That energy is valuable. The growth is in choosing when to move and when to stay, instead of the movement choosing for you." } },
        ],
      },
    ],
  },
  8: {
    question: "How do I stay strong without hardening?",
    lessons: [
      {
        id: "cq-8a", unitId: "your-core-question", order: 1, xpReward: 30,
        title: "The river and the wall",
        subtitle: "Power through softness",
        personalized: true, personalizeFor: "enneagramType",
        exercises: [
          { id: "cq8a-i", difficulty: 1, content: { type: "concept-intro", title: "Softness is not weakness. It is precision.", body: "A wall stops everything. A river moves around obstacles and still reaches the ocean. Both are powerful. But the river is more adaptable, more sustainable, and harder to destroy. Your type defaults to the wall. The practice is learning the river." } },
          { id: "cq8a-s", difficulty: 2, content: { type: "socratic-prompt", question: "When was the last time you showed vulnerability to someone, and it went well?", reflection: "Your type remembers the times vulnerability went badly. But the times it went well are just as real, and usually more recent.", revealLabel: "See the insight", conceptTitle: "Vulnerability is a power move", conceptBody: "Your type equates vulnerability with weakness and weakness with danger. But the people closest to you are not waiting for you to be stronger. They are waiting for you to be reachable. Letting someone in is not the same as letting your guard down. It is choosing who gets past it." } },
          { id: "cq8a-f", difficulty: 3, content: { type: "free-recall", prompt: "Describe one relationship where you could afford to be softer. What would that look like, specifically?", keyTerms: ["softer", "let", "show", "trust", "open"], minWords: 15, modelAnswer: "Your type will always be strong. Strength is not the issue. The issue is whether strength is the only tool available. Adding softness to the toolkit does not replace the strength. It makes it more precise." } },
        ],
      },
    ],
  },
  9: {
    question: "Do I matter enough to take up space?",
    lessons: [
      {
        id: "cq-9a", unitId: "your-core-question", order: 1, xpReward: 30,
        title: "Your anger is information",
        subtitle: "It tells you what matters",
        personalized: true, personalizeFor: "enneagramType",
        exercises: [
          { id: "cq9a-i", difficulty: 1, content: { type: "concept-intro", title: "Anger is not dangerous. It is a signal.", body: "Your type has a complicated relationship with anger. You might not even feel it as anger. It shows up as inertia, stubbornness, passive withdrawal, or a vague sense that things are not right. But underneath all of that is a signal: something matters to you, and it is not being honored." } },
          { id: "cq9a-s", difficulty: 2, content: { type: "socratic-prompt", question: "What is one thing you want that you have not said out loud to anyone?", reflection: "The things you suppress are not random. They are the things your pattern says will disrupt the peace. But peace that requires you to disappear is not peace.", revealLabel: "See the reframe", conceptTitle: "Your voice belongs in the room", conceptBody: "Your type will always value harmony. That is a genuine strength. The growth is in recognizing that real harmony includes your voice, not just everyone else's. Conflict is not automatically destructive. Sometimes it is the most honest thing in the room." } },
          { id: "cq9a-f", difficulty: 3, content: { type: "free-recall", prompt: "Write down one opinion you have that you usually keep to yourself. Just write it. No one will see this.", keyTerms: ["think", "believe", "feel", "want", "opinion"], minWords: 10, modelAnswer: "Writing it is the first step. Your type does not lack opinions. It lacks practice voicing them. Each time you say what you actually think, even just to yourself, the muscle strengthens." } },
        ],
      },
    ],
  },
};

// Export all type lessons as a flat array. The app filters by user's type.
export const unit24Lessons: Lesson[] = Object.values(TYPE_QUESTIONS).flatMap(t => t.lessons);

// Export the question map for use in UI headers
export const TYPE_CORE_QUESTIONS: Record<number, string> = Object.fromEntries(
  Object.entries(TYPE_QUESTIONS).map(([k, v]) => [Number(k), v.question])
);
