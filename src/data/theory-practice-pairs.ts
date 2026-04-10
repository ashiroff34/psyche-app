// Theory + Practice Pairs
//
// Each concept is presented in two matched halves:
// - THEORY: a short philosophical reflection on the idea (~80 words, plain language)
// - PRACTICE: a specific small experiment to try this week
//
// Concepts are chosen for their metacognitive punch, teaching the user to
// notice their own mental moves. No named traditions (no "Stoic", "Buddhist",
// etc.), just the underlying ideas.
//
// Cycle: one pair per day, rotating through the library.

export interface TheoryPracticePair {
  id: string;
  concept: string;         // short name of the concept
  theory: string;          // 1-minute read
  practice: string;        // concrete thing to try
  practiceDuration: string; // "this week", "for an hour", "once today"
}

export const THEORY_PRACTICE_PAIRS: TheoryPracticePair[] = [
  {
    id: "gap-stimulus-response",
    concept: "The gap between what happens and what you do about it",
    theory: "Something happens. A reaction forms inside you almost instantly. You tend to experience the reaction as *the* response, as if there's nothing between the event and you. But there is a space in there. Very small at first. The whole project of self-knowledge might just be about widening that space. Not eliminating the reaction. Just noticing it has a shape, and that you're the one watching it form.",
    practice: "This week, the moment you notice yourself reacting to something, any reaction, pause for one breath before acting on it. Don't try to change the reaction. Just put one breath between it and what you do next. Notice what happens in the space.",
    practiceDuration: "this week",
  },
  {
    id: "witness-vs-actor",
    concept: "The part of you that's watching",
    theory: "There's a strange thing about attention: you can watch your own thoughts. Which means the thing doing the watching is not the thoughts themselves. Most of the time we're so identified with our thinking that we forget there's a layer above it, a kind of quiet observer. When you remember this layer, for even a second, the grip of whatever you were feeling loosens. You haven't solved anything. You've just moved back one seat.",
    practice: "Three times today, ask yourself: 'Who is noticing this right now?' Don't try to answer. Just let the question create a small distance between you and whatever you were doing.",
    practiceDuration: "once today",
  },
  {
    id: "what-you-can-and-cant-control",
    concept: "The line between what's yours and what isn't",
    theory: "Some things are inside your control, what you do, what you focus on, how you respond. Most things aren't, what other people do, what happens to your body, how your day unfolds. An enormous amount of suffering comes from trying to control the second category and ignoring the first. The opposite move, paying close attention to your own moves and releasing your grip on everything else, is quiet, unglamorous, and almost always available.",
    practice: "Pick one thing that's been weighing on you. Ask: is this inside or outside my control? If inside, what's the next small move? If outside, what would it feel like to fully release your grip on it, even for an hour?",
    practiceDuration: "once today",
  },
  {
    id: "story-your-mind-tells",
    concept: "The story your mind is telling right now",
    theory: "Your mind tells a continuous story about what's happening and what it means. 'This is unfair.' 'They don't respect me.' 'I'm behind.' The story feels like reality. But if you listen carefully, it's a narrator, one interpretation among many possible interpretations. The first move of self-knowledge is to notice the story is *a* story, not *the* truth. You don't have to believe it. You just have to see that it's there.",
    practice: "Today, when you notice yourself upset about something, try to say out loud (or in your head) the sentence your mind is telling you. Just name it. 'My mind is telling me that...' See how it feels to put that frame around it.",
    practiceDuration: "once today",
  },
  {
    id: "return-to-present",
    concept: "Coming back to the room you're actually in",
    theory: "Your mind spends most of its time in two places that don't exist: the future and the past. Replaying, rehearsing, anticipating, regretting. The body, meanwhile, is always here. You can use the body as an anchor, the feeling of your feet on the floor, the weight of your hands, the temperature of the air. Returning to these things isn't 'doing nothing.' It's the opposite of nothing. It's becoming available to your actual life.",
    practice: "Five times today, do this: notice where your mind is (past? future? planning? remembering?), then feel your feet on the ground for three seconds. That's it. No big deal. Just a small return.",
    practiceDuration: "today",
  },
  {
    id: "resistance-is-the-signal",
    concept: "What you resist is information",
    theory: "Notice what you don't want to look at. The conversation you're avoiding. The email you keep re-reading but not answering. The feeling you keep pushing back down. Resistance isn't a problem to solve, it's a signal. It's pointing at something. The thing you most don't want to face is almost always the thing worth facing, because the avoidance itself is costing you more energy than the facing would.",
    practice: "Name one thing you've been avoiding. Don't commit to doing it. Just name it to yourself and notice how it feels to let it be seen. That's enough for today.",
    practiceDuration: "once today",
  },
  {
    id: "automatic-vs-chosen",
    concept: "The difference between habit and choice",
    theory: "Most of what you do each day you didn't choose, it's running automatically, on patterns formed years ago. This isn't bad; it's efficient. But the pattern runs whether or not it still fits your life. The work of self-knowledge is learning to distinguish the automatic from the chosen. Not to stop the automatic, that's impossible, but to know which is which. Once you see a pattern running, you have a choice you didn't have before.",
    practice: "Pick one small habit you do without thinking (checking your phone, a particular reaction, a routine). Today, the next time you do it, say internally: 'automatic'. Don't try to change it. Just flag it as not-chosen.",
    practiceDuration: "today",
  },
  {
    id: "the-same-pattern-everywhere",
    concept: "You're bringing the same pattern to every room",
    theory: "We think our problems are about specific situations, this person, this job, this week. But after enough situations, you start noticing that something in your reactions is constant. The context changes. The pattern doesn't. This is humbling, but also freeing. If the pattern is in you, then you can work with it. You can't change your boss, but you can get to know the thing inside you that reacts to your boss the same way it reacted to everyone before.",
    practice: "Think of a frustration from this past week. Then think of a similar frustration from a year ago. What's the same? Don't judge the pattern, just observe that it's been there longer than today's situation.",
    practiceDuration: "once today",
  },
  {
    id: "what-youre-actually-protecting",
    concept: "Behind every defense, something tender",
    theory: "Most of our strong reactions, anger, withdrawal, the impulse to impress, the need to be right, are defending something softer underneath. The anger is protecting a hurt. The performance is protecting a fear of not being enough. The withdrawal is protecting a need you don't quite trust will be met. The defense isn't the problem. But the defense forgot that the thing it's protecting is still there, still worth knowing about directly.",
    practice: "Next time you catch yourself reacting strongly to something, ask: 'what am I protecting right now?' Don't try to answer fast. Let the question sit. The answer, if it comes, is usually surprisingly gentle.",
    practiceDuration: "this week",
  },
  {
    id: "noticing-is-enough",
    concept: "Noticing is already doing the work",
    theory: "We tend to think that to change something, we have to *do* something. Analyze it, fix it, push against it. But with inner patterns, the opposite is often true: the noticing itself is the change. The moment you see a pattern clearly, without judgment, without urgency to fix, it loosens. Not all the way. But enough. This is why the work of self-knowledge is so strange. It looks like nothing. It feels like nothing. And it's doing everything.",
    practice: "Today, don't try to change anything about yourself. Just notice, whatever you notice. That's the whole practice. Trust that the noticing is the work.",
    practiceDuration: "today",
  },
];

export function getTodayTheoryPracticePair(): TheoryPracticePair {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return THEORY_PRACTICE_PAIRS[dayOfYear % THEORY_PRACTICE_PAIRS.length];
}
