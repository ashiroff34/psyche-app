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

  // ─── Philosophical expansion (concepts only, no tradition labels) ────────

  {
    id: "defense-was-wound",
    concept: "Your defense was the wound all along",
    theory: "The personality structure you built to protect yourself from pain is also the thing that creates the most pain. The 1's perfectionism both protects and punishes. The 8's armor both shields and isolates. This is not a design flaw. It is how defense structures work: they were built in a context where they made sense, and they kept running after the context changed. Seeing this clearly is not an attack on the defense. It is a thank-you note with a gentle question: do we still need this at full strength?",
    practice: "Name one defense you relied on this week. Thank it for what it did. Then ask: what would I lose if I loosened this by 10%?",
    practiceDuration: "this week",
  },
  {
    id: "meaning-maker",
    concept: "You are the meaning-maker",
    theory: "Events do not come pre-labeled as meaningful or meaningless. You assign meaning through attention, interpretation, and story. A Tuesday afternoon can be empty or profound depending entirely on how present you are to it. This is not nihilism. It is the opposite: if meaning is made, you are the maker. If the story shapes the life, you are the author. Your type gives you a default genre. You can choose a different one.",
    practice: "Pick one ordinary moment today, a meal, a walk, a conversation, and deliberately assign it meaning. Not fake meaning. Real attention. See what shifts.",
    practiceDuration: "once today",
  },
  {
    id: "pain-vs-suffering",
    concept: "The signal and the story",
    theory: "Pain is a signal: something happened that matters. Suffering is the narrative you wrap around it. Pain says: this hurts. Suffering says: this should not be happening, I cannot handle this, this means something about who I am. Pain lasts minutes. The story can last years. People across many cultures and centuries have noticed: the story is optional in a way the pain is not. This does not mean suppressing. It means noticing where the signal ends and the narration begins.",
    practice: "Next time you feel something painful, try to separate the raw sensation from the story. Name the sensation ('tightness in my chest'). Then notice the story ('this always happens to me'). See if you can stay with just the sensation for 30 seconds.",
    practiceDuration: "this week",
  },
  {
    id: "holding-paradox",
    concept: "Two contradictory things can both be true",
    theory: "You are a specific type AND you are more than any label. Your defenses hurt AND they once saved you. You want to change AND you are already enough. Young thinking wants one answer. Mature thinking holds the tension between two answers and does not rush to collapse it. This is not wishy-washy. It takes more precision to hold a paradox than to pick a side. Every Enneagram type has a central paradox. Learning to hold it without resolving it is the practice.",
    practice: "Name one paradox in your own life, two things that are both true and seem to contradict each other. Sit with both for 5 minutes without trying to resolve it. Just hold them.",
    practiceDuration: "once today",
  },
  {
    id: "the-narrator-agenda",
    concept: "Your inner narrator has an agenda",
    theory: "There is a voice in your head that comments on everything you do. It evaluates, compares, warns, judges. This voice feels like 'you' but it is a specific part of your personality structure doing a specific job: trying to keep you safe in a way that made sense when it was first installed. Every type has a characteristic narrator: the 1's corrects, the 6's scans for danger, the 3's tracks whether you're winning. Knowing your narrator's script is the beginning of not being scripted by it.",
    practice: "For one hour today, notice every time the internal narrator speaks. Don't argue with it. Don't agree. Just note: 'the narrator said ___.' See how often it talks, and what it talks about.",
    practiceDuration: "for an hour",
  },
  {
    id: "river-not-rock",
    concept: "You are a river, not a rock",
    theory: "You are not the same person you were five years ago. Your values shifted, your relationships changed, your understanding deepened. But your core type stayed. The type is the riverbed. The water, your behaviors, moods, and growth, flows over it. The bed shapes the flow. The flow shapes the bed. Neither is truly fixed. Growth is not becoming a different type. It is becoming more fluid within the shape you already have.",
    practice: "Think about who you were at 18. List three things that changed and one thing that stayed. The thing that stayed is probably close to your core pattern. Notice how your relationship to it changed even though the pattern didn't.",
    practiceDuration: "this week",
  },
  {
    id: "compassion-for-armor",
    concept: "Thanking the thing you want to outgrow",
    theory: "Your personality structure is not a mistake. It is a survival strategy that worked. The 2 learned that being helpful kept them safe. The 5 learned that retreating to the mind prevented overwhelm. The 9 learned that disappearing prevented conflict. These are not pathologies. They are intelligent adaptations to real conditions. The question now is not 'how do I get rid of this?' It is 'do I still need this at full strength?' You can thank a defense and still loosen it.",
    practice: "Write a short sentence to your defense, as if it were a person: 'Thank you for ___. You can relax about ___.' See how it feels to relate to your pattern as something you HAVE rather than something you ARE.",
    practiceDuration: "once today",
  },
  {
    id: "examined-life-daily",
    concept: "Self-knowledge as daily practice, not destination",
    theory: "There is no moment where you 'arrive' at self-knowledge. There is no final insight that completes the picture. The Enneagram type does not get solved. The cognitive function stack does not get mastered. What happens instead is something quieter: you get slightly faster at catching yourself, slightly more honest about what you see, and slightly more compassionate about the whole messy structure. This is what progress looks like. Not a straight line. A widening spiral.",
    practice: "At the end of today, take 60 seconds to ask: 'What did I notice about myself that I didn't notice yesterday?' One thing. That's the whole practice. Do it again tomorrow.",
    practiceDuration: "tonight",
  },
  {
    id: "freedom-within-constraint",
    concept: "The shape that makes music possible",
    theory: "A sonnet has 14 lines, a fixed rhyme scheme, and iambic pentameter. Within those constraints, Shakespeare wrote some of the most free and expressive language in history. Constraints do not kill freedom. They give it a shape. Your type is a constraint. Your cognitive stack is a constraint. But within those constraints, there is enormous range. The healthy 8 and the unhealthy 8 share the same structure. The difference is what they do inside it.",
    practice: "Pick one constraint in your life, a rule you follow, a pattern you can't seem to break, a limitation you resent. Ask: what is this constraint making possible? What could I create inside it instead of against it?",
    practiceDuration: "this week",
  },
  {
    id: "impermanence-freedom",
    concept: "Everything changes. That is not only loss.",
    theory: "The feeling that will not go away will go away. The situation that feels permanent is not. The version of yourself you are clinging to, or fleeing from, is already changing. This sounds like a platitude until you actually sit with it. Impermanence means loss, yes. But it also means: the suffering that feels like forever is not forever. The pattern that feels permanent can loosen. The mood that grips you will release. Change is not only threat. It is also the door.",
    practice: "Notice one thing today that used to bother you intensely but doesn't anymore. How did it change? You probably didn't 'fix' it. You changed around it. That is impermanence working in your favor.",
    practiceDuration: "once today",
  },
  {
    id: "question-behind-question",
    concept: "The question behind the question",
    theory: "When you ask 'Am I good enough?' the real question is often 'Am I safe?' When you ask 'Does this person like me?' the real question is often 'Will I be abandoned?' When you ask 'What should I do?' the real question is often 'Can I trust myself?' Your type generates surface questions that mask deeper ones. The surface question is answerable but unsatisfying. The deeper question is harder to answer but much more useful. The practice is learning to hear the question behind the question.",
    practice: "The next time you catch yourself asking a question internally, ask: 'What is the question behind this question?' Write down both. Notice which one you'd rather avoid answering.",
    practiceDuration: "this week",
  },
  {
    id: "dis-identification",
    concept: "You are not your type. You are the one who sees it.",
    theory: "Here is the final move in self-knowledge: you are not the pattern. You are the awareness that notices the pattern. The 4 is not their longing. They are the one who sees the longing arise. The 8 is not their anger. They are the one who watches the anger form. This distinction is tiny and enormous at the same time. When you are the pattern, it runs you. When you are the one watching the pattern, you have a choice. The type doesn't disappear. Your identification with it loosens.",
    practice: "The next time your type's signature move fires, try saying: 'I notice my [type] pattern is running.' Not 'I am [anxious/angry/performing/retreating]' but 'I notice [anxiety/anger/performance/retreat] is happening.' See what shifts in that one word change.",
    practiceDuration: "this week",
  },
];

export function getTodayTheoryPracticePair(): TheoryPracticePair {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return THEORY_PRACTICE_PAIRS[dayOfYear % THEORY_PRACTICE_PAIRS.length];
}
