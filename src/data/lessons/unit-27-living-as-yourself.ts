// Unit 27: Living as Yourself
//
// Bridge unit. The user has mapped their type, explored their core question,
// and built the observer. This unit consolidates: what does it look like to
// actually LIVE from self-knowledge? Not as a project. Not as optimization.
// Just as a way of being.
//
// This unit intentionally builds UP the sense of self — "you know who you
// are, now live from that" — so the later units (28-30) can investigate
// whether that self is as solid as it seems. The arc only works if the
// identity is first felt as real and valuable.

import type { Lesson } from "@/types/lessons";

export const unit27Lessons: Lesson[] = [
  {
    id: "living-alignment",
    unitId: "living-as-yourself",
    order: 1,
    title: "What alignment actually feels like",
    subtitle: "Not perfection. Just less friction.",
    xpReward: 30,
    exercises: [
      { id: "e27-1-i", difficulty: 1, content: { type: "concept-intro", title: "You know your pattern. Now what?", body: "You have mapped your type, your instinct, your core question, your defenses. That is a lot of self-knowledge. But knowledge about yourself is not the same as living from it. Living from it means: when the pattern fires, you notice it faster. When the defense activates, you hold it more lightly. When the core fear whispers, you hear it as a whisper instead of as the truth. That is alignment. Not perfection. Just less automatic suffering." } },
      { id: "e27-1-s", difficulty: 2, content: { type: "socratic-prompt", question: "When was the last time you felt like you were 'in your own skin,' not performing, not defending, just being? What were you doing?", reflection: "The moments of alignment are already in your life. They just tend to be quiet, unremarkable, easy to overlook.", revealLabel: "See the insight", conceptTitle: "Alignment is quiet", conceptBody: "Most people expect alignment to feel dramatic, like a breakthrough or a peak experience. But in practice, it feels more like a sigh. A moment where nothing is being managed. These moments exist in every day. The practice is noticing them instead of reaching past them for something more impressive." } },
      { id: "e27-1-f", difficulty: 3, content: { type: "free-recall", prompt: "Describe what 'being yourself without effort' looks like on a Tuesday. Not the ideal version. The real one.", keyTerms: ["ordinary", "easy", "natural", "just", "simple"], minWords: 20, modelAnswer: "The real version is always less impressive and more true than the ideal. Living as yourself is not a destination you arrive at. It is a quality of attention you bring to what is already happening." } },
      { id: "e27-1-sc1", difficulty: 2, content: { type: "scenario", scenario: "You are at a party and realize you have been performing all evening: laughing a little too loudly, agreeing with things you do not actually believe, monitoring how others perceive you. On the drive home, you exhale and feel your shoulders drop. In the silence of the car, you feel more like yourself than you did all night.", question: "What does this contrast reveal about alignment?", options: ["You are an introvert and should avoid parties", "The performing self is fake and the car self is the real you", "Alignment often arrives in the quiet, unmanaged moments, not in the effortful ones", "Social situations always prevent you from being authentic"], correctIndex: 2, explanation: "Alignment is not a dramatic experience. It is what remains when the managing stops. Most people expect it to feel like a breakthrough. In practice, it feels more like a sigh. The moments where nothing is being performed are the moments you are closest to yourself." } },
      { id: "e27-1-fr2", difficulty: 3, content: { type: "free-recall", prompt: "When was the last time you caught yourself performing a version of yourself for someone else? What did it feel like to stop? What was underneath the performance?", keyTerms: ["performing", "stopped", "underneath", "real", "dropped", "mask"], minWords: 20, modelAnswer: "The performance is not always bad. Sometimes it is necessary. But knowing when you are doing it changes your relationship to it. The goal is not to stop performing entirely. It is to notice the gap between the performance and what is underneath, and to narrow that gap when you can." } },
    ],
  },
  {
    id: "living-values",
    unitId: "living-as-yourself",
    order: 2,
    title: "Acting from values, not from fear",
    subtitle: "The difference changes everything",
    xpReward: 30,
    exercises: [
      { id: "e27-2-i", difficulty: 1, content: { type: "concept-intro", title: "Every action has two possible engines", body: "You can do the same thing from two completely different places. You can be generous because you value generosity, or because you fear being unloved. You can work hard because the work matters, or because stopping feels like death. The behavior looks identical. The inner experience is completely different. Your type tends to default to the fear engine. The practice is finding the values engine for the same behavior." } },
      { id: "e27-2-s", difficulty: 2, content: { type: "socratic-prompt", question: "Pick one thing you do every day. Are you doing it because you want to, or because you are afraid of what happens if you don't?", reflection: "This is not a trick question. The answer might be 'both.' But knowing the ratio matters.", revealLabel: "The shift", conceptTitle: "Same action, different fuel", conceptBody: "You do not need to change what you do. You need to notice WHY you are doing it. When the 1 acts from integrity instead of from fear of being wrong, the behavior looks the same but the inner suffering drops. When the 7 pursues something new from curiosity instead of from avoidance, the experience deepens. The action stays. The fuel changes. That is what living as yourself looks like." } },
      { id: "e27-2-f", difficulty: 3, content: { type: "free-recall", prompt: "Name one behavior you do from fear that you could also do from choice. What would it feel like to do the same thing, but from the other engine?", keyTerms: ["fear", "choice", "same", "different", "feel"], minWords: 20, modelAnswer: "This distinction is the most practical thing the Enneagram offers. You are not trying to stop being your type. You are trying to run the same software from a different power source." } },
      { id: "e27-2-sc1", difficulty: 2, content: { type: "scenario", scenario: "You stay late at work every night. Your manager praises your dedication. But when you are honest with yourself, you realize you are not staying because you love the work. You are staying because you are terrified of what it means if you stop. The behavior is identical from the outside. The inner experience is completely different.", question: "What is the most important insight here?", options: ["You should stop staying late to prove you are not driven by fear", "The behavior itself is the problem and needs to change", "The same action can come from values or from fear, and the inner experience, not the visible behavior, is what determines whether it costs you", "Fear is always a bad motivator and should be eliminated"], correctIndex: 2, explanation: "You do not need to change what you do. You need to notice why you are doing it. When you act from values instead of fear, the behavior might look the same, but the suffering drops. The action stays. The fuel changes." } },
      { id: "e27-2-fr2", difficulty: 3, content: { type: "free-recall", prompt: "Think of something you do regularly that others admire. Be honest: is the engine behind it love for the thing, or fear of what happens if you stop? What would it feel like to do it purely from desire?", keyTerms: ["admire", "engine", "fear", "love", "honest", "desire", "stop"], minWords: 20, modelAnswer: "This is not about judging yourself for being fear driven. Almost everyone is, for at least some of their core behaviors. The point is noticing the fuel source, because when you shift from fear to values, the same life suddenly feels different from the inside." } },
    ],
  },
  {
    id: "living-enough",
    unitId: "living-as-yourself",
    order: 3,
    title: "You are already who you need to be",
    subtitle: "This is the foundation for everything that comes next",
    xpReward: 30,
    exercises: [
      { id: "e27-3-i", difficulty: 1, content: { type: "concept-intro", title: "Self-knowledge is not self-improvement", body: "There is a subtle trap in all of this: using self-knowledge as another way to fix yourself. Learning your type to become a 'better' version. Mapping your defenses to eliminate them. This misses the point entirely. You are not broken. Your pattern is not a bug. The Enneagram does not show you what is wrong with you. It shows you the shape of your particular way of being human. That shape is not a problem to solve. It is a structure to inhabit with more awareness." } },
      { id: "e27-3-s", difficulty: 2, content: { type: "socratic-prompt", question: "If nothing about you changed from this moment forward, would that be okay?", reflection: "This question is designed to reveal how much of your engagement with self-knowledge is driven by the hope of becoming someone else.", revealLabel: "The foundation", conceptTitle: "Enough, as-is", conceptBody: "Before we go any further, this needs to be established: you are enough as you are. Not 'enough once you grow.' Not 'enough when you integrate.' Right now, with all your patterns intact, all your defenses running, all your blind spots unresolved. You are a complete human being. Everything that follows in this app is built on that foundation, not on the premise that you need fixing." } },
      { id: "e27-3-f", difficulty: 3, content: { type: "free-recall", prompt: "Write one sentence that is true about you right now, that does not need to change.", keyTerms: ["I am", "true", "enough", "already", "now"], minWords: 10, modelAnswer: "Hold onto this sentence. What comes next in the learning path is going to question some things you take for granted about identity. This sentence is your anchor. The self you described is real and valuable, even as we investigate what 'self' actually means." } },
      { id: "e27-3-sc1", difficulty: 2, content: { type: "scenario", scenario: "You finish a personality workshop feeling energized. You make a list of everything you want to change about yourself: be less reactive, be more present, stop procrastinating, express anger more cleanly. A week later, you realize the list is itself your pattern running: using self-knowledge as another self-improvement project.", question: "What trap does this situation illustrate?", options: ["Self-improvement is always harmful and should be avoided", "The list was fine; the problem is that you did not follow through", "Using self-knowledge as a tool to fix yourself can become another expression of the pattern it was supposed to address", "Personality workshops give false hope and are not useful"], correctIndex: 2, explanation: "Self-knowledge is not self-improvement. The subtle trap is using everything you learn as ammunition against yourself. You are not broken. Your pattern is not a bug. The point is not to become a better version. It is to inhabit the version you already are with more awareness." } },
      { id: "e27-3-fr2", difficulty: 3, content: { type: "free-recall", prompt: "Have you ever used self-knowledge as a weapon against yourself? A way to catalog everything that is wrong with you? What would it look like to hold the same knowledge with gentleness instead of judgment?", keyTerms: ["weapon", "wrong", "gentle", "judgment", "knowledge", "enough", "kind"], minWords: 20, modelAnswer: "The shift from self-knowledge as self-improvement to self-knowledge as self-acceptance is one of the most important transitions in the entire practice. You are not a project. You are a person. The knowledge is meant to help you live, not to give you a longer list of things to fix." } },
    ],
  },
];
