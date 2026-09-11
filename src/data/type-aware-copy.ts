// Type-Aware Copy Library
//
// Every copy string has 9 variants (one per Enneagram type) + a default
// fallback for users without a set type.
//
// Based on the Matz/Kosinski (2017) psychological-targeting research:
//   Personality-matched copy resulted in +40% more clicks and +50% more
//   purchases vs generic or mismatched copy.
//   https://www.pnas.org/doi/10.1073/pnas.1710966114
//
// Motivation frames per type are grounded in the Enneagram core-motivation
// research (Riso-Hudson, Naranjo, Palmer):
//   - Type 1: integrity, "done right"
//   - Type 2: being of service, loving well
//   - Type 3: mastery, excellence, winning
//   - Type 4: depth, authenticity, uniqueness
//   - Type 5: understanding, competence, mastery of knowledge
//   - Type 6: trusted guidance, preparedness, consistency
//   - Type 7: freedom, novelty, possibility
//   - Type 8: autonomy, control, impact
//   - Type 9: ease, peace, one clear path
//
// ETHICAL GUARDRAIL: never target a type's core wound. Never exploit Type 6
// abandonment fears, Type 4 "ordinary" feelings, Type 7 FOMO, etc. All copy
// here is meant to serve the user's stated goal (self-knowledge), not
// manipulate against it.

export interface TypeAwareCopyEntry {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  default: string;
}

export const TYPE_AWARE_COPY: Record<string, TypeAwareCopyEntry> = {
  // ─────────────────────────────────────────────────────────────────────
  // SURFACE 1: Daily "Start here" CTA on HubView
  // ─────────────────────────────────────────────────────────────────────
  "hub.start.headline": {
    1: "Pick up where you left off, steady progress",
    2: "Your daily practice, a little space for you",
    3: "Next step, ready, keep the momentum",
    4: "Something only you would notice today",
    5: "Short, focused, no fluff",
    6: "Same place, same time, ready for you",
    7: "Today's fresh concept is open",
    8: "Your call, the next move is here",
    9: "Just one thing, no decisions",
    default: "Start today's practice",
  },
  "hub.start.sub": {
    1: "A small consistent step forward",
    2: "Just for you, nothing to give back",
    3: "One more win on the record",
    4: "The kind of thing most people miss",
    5: "All the detail, none of the noise",
    6: "Consistent structure, trusted path",
    7: "New, fun, optional",
    8: "Your pace. Your rules.",
    9: "Pre-chosen. Pre-set.",
    default: "Begin where you left off",
  },

  // ─────────────────────────────────────────────────────────────────────
  // SURFACE 2: Type reveal welcome message (below the type name)
  // ─────────────────────────────────────────────────────────────────────
  "reveal.welcome": {
    1: "You hold yourself to a standard almost no one else sees. This space is for meeting yourself without the critic in the room.",
    2: "You're the person others come to. This is about learning to come to yourself first, without needing to earn it.",
    3: "You're built to succeed. Now learn who you are when no one's watching the scoreboard.",
    4: "You've always felt different. There's a reason for that, and it's not a deficiency. This space is built for depth.",
    5: "You've protected your inner world carefully. You're safe here. Read at your own pace. Nothing costs anything you weren't already going to spend.",
    6: "You've been preparing for something your whole life. This might be the preparation that actually matters. Trusted sources throughout.",
    7: "Most people skim the surface. You're about to find out what's actually underneath, and it's more interesting than the surface was.",
    8: "No one here is going to tell you what to do. The work is yours. So is the payoff.",
    9: "Everything you need, in one place. No decisions. Just the path.",
    default: "A space for noticing yourself, one quiet step at a time.",
  },

  // ─────────────────────────────────────────────────────────────────────
  // SURFACE 3: Token pack headlines
  // ─────────────────────────────────────────────────────────────────────
  "store.pack.starter": {
    1: "A sensible starting point",
    2: "Just enough to share with yourself",
    3: "Get in the game",
    4: "Just enough to explore",
    5: "Try before you commit",
    6: "Low-risk starter",
    7: "Dip in, no walls",
    8: "No commitment, start now",
    9: "An easy first step",
    default: "Start small",
  },
  "store.pack.popular": {
    1: "The sensible middle choice",
    2: "The one most people pick",
    3: "Most popular, what serious users get",
    4: "For those who want to go a little deeper",
    5: "Best value per token, by the math",
    6: "What most trusted users pick",
    7: "Most freedom for the token",
    8: "Best bang for your buck",
    9: "The simple, common choice",
    default: "Most popular",
  },
  "store.pack.mega": {
    1: "Do it right, do it once",
    2: "Enough to give and to keep",
    3: "Pro-level access",
    4: "For those who go all in",
    5: "Comprehensive coverage, calculated",
    6: "Everything you might need, prepared",
    7: "Unlock everything, never hit a wall",
    8: "Full control, no gates",
    9: "Covers everything, no worries",
    default: "Comprehensive",
  },
  "store.pack.ultimate": {
    1: "The complete, correct investment",
    2: "Enough for you and everyone you care about",
    3: "The top tier, of course",
    4: "For the truly devoted",
    5: "Total access to the full framework",
    6: "Maximum security, nothing missed",
    7: "The everything pack",
    8: "Total access. No gatekeeping.",
    9: "All of it, done",
    default: "Maximum value",
  },

  // ─────────────────────────────────────────────────────────────────────
  // SURFACE 4: Journal empty state
  // ─────────────────────────────────────────────────────────────────────
  "journal.empty.headline": {
    1: "A structured place for reflection",
    2: "A private space, just for you",
    3: "Start tracking your growth",
    4: "Your interior life lives here",
    5: "A clean archive for observations",
    6: "A reliable, private place to record",
    7: "A fresh, open canvas",
    8: "Your words, your rules",
    9: "A simple place, whenever you want",
    default: "Your journal is empty",
  },
  "journal.empty.sub": {
    1: "Write the first entry when you're ready. Small and consistent beats perfect and rare.",
    2: "No performance needed. This is the one space not for anyone else.",
    3: "The people who grow the most are the ones who track what's changing.",
    4: "Start when something lands. Depth comes from noticing the specific, not the general.",
    5: "No obligations. Write when you've observed something worth filing away.",
    6: "Same place each time. Nothing gets lost.",
    7: "Write when something sparks, skip when it doesn't. No rules.",
    8: "No one sees this. No one asks. No one judges.",
    9: "Just a sentence is fine. Or nothing at all. The space is here.",
    default: "Write your first reflection, or do today's practice to generate prompts.",
  },

  // ─────────────────────────────────────────────────────────────────────
  // SURFACE 5: Re-engagement card (shown when user returns after absence)
  // ─────────────────────────────────────────────────────────────────────
  "reengagement.headline": {
    1: "Pick up where you left off",
    2: "Come back when you're ready, this is for you",
    3: "You've got ground to reclaim",
    4: "Some patterns only show when you're looking",
    5: "Everything is still here, your pace",
    6: "Your daily structure is still here, consistent",
    7: "New concepts have landed since you were last here",
    8: "Your practice, your timing",
    9: "Just open the app, that's all",
    default: "Welcome back",
  },
  "reengagement.sub": {
    1: "Progress is preserved. Resuming is easy.",
    2: "No pressure, no guilt. Just the space.",
    3: "The system is built for comeback momentum.",
    4: "This is the place to go inward again.",
    5: "Nothing you noticed before has been lost.",
    6: "Same structure, same citations, same ground.",
    7: "Fresh material is waiting, see what's new.",
    8: "Pick up exactly where you stopped. No fuss.",
    9: "No decisions. Just start.",
    default: "Continue your practice",
  },

  // ─────────────────────────────────────────────────────────────────────
  // SURFACE 6: Quiz completion celebration
  // ─────────────────────────────────────────────────────────────────────
  "quiz.complete.headline": {
    1: "You did that thoughtfully, it shows",
    2: "You showed up for yourself, that matters",
    3: "Done, and well done",
    4: "That was a start, the deeper work is ahead",
    5: "Data's in, now read the framework carefully",
    6: "Solid first step, you can re-take anytime",
    7: "Fast and fun, now more unlocked",
    8: "Done, now own it",
    9: "Easy, onto the next thing",
    default: "Quiz complete",
  },
  // ─────────────────────────────────────────────────────────────────────
  // SURFACE 7: Enneagram Growth Path unlock gate (/growth)
  //
  // A 300 token spend is a real decision, and the gate was pitching all
  // nine types the same paragraph. The promise underneath is identical;
  // only the reason it matters to this user changes.
  // ─────────────────────────────────────────────────────────────────────
  "growth.gate.headline": {
    1: "A growth path with a clear method",
    2: "Growth that is yours, not for anyone else",
    3: "A growth path you can actually measure",
    4: "A growth path shaped to your specific pattern",
    5: "The growth material, without the filler",
    6: "A growth path you can rely on",
    7: "A growth path that keeps opening up",
    8: "Your growth, on your terms",
    9: "One simple path, no pressure",
    default: "Enneagram Growth Path",
  },
  "growth.gate.sub": {
    1: "Integration practices and daily prompts built on the Enneagram tradition, so the work is grounded rather than improvised.",
    2: "Integration practices and daily prompts for your type, in a space where nobody needs anything from you.",
    3: "Integration practices, daily prompts, and tracked growth edges, so progress is visible rather than assumed.",
    4: "Integration practices and daily prompts written for your type specifically, not the same page every Four has already read.",
    5: "Integration practices and daily prompts drawn from the primary Enneagram sources. Dense, specific, no padding.",
    6: "Integration practices and daily prompts from the established Enneagram tradition, in the same place every day.",
    7: "Integration practices, daily prompts, perspective swaps, and shadow dialogues. New material every day.",
    8: "Integration practices and daily prompts for your type. Unlock it once, use it how you want, no subscription.",
    9: "Integration practices and one daily prompt for your type. Nothing to decide, nothing stacking up.",
    default: "Type specific growth prompts, integration practices, and daily reflection rooted in the Enneagram tradition.",
  },

  // ─────────────────────────────────────────────────────────────────────
  // SURFACE 8: Next-assessment recommendation on /assessments
  //
  // The hub recommends the next unmapped dimension and explains why it is
  // worth the time. That reason was identical for all nine types, and the
  // instinct variant illustrated the point with a Type 5 even when the
  // reader was already typed as something else. The assessment being
  // recommended does not change; the reason it matters to this person does.
  //
  // Only the branches where the type is already known are personalized.
  // The first recommendation runs before typing, so it keeps the default.
  // ─────────────────────────────────────────────────────────────────────
  "assessments.why.instinct": {
    1: "You have your type. The subtype is where it gets precise. Your instinctual stacking decides which arena your standards actually fire in, and two Ones with different stackings correct entirely different things.",
    2: "You have your type. The subtype is where it gets personal. Your instinctual stacking decides who you move toward and what being needed looks like, and two Twos with different stackings give in completely different ways.",
    3: "You have your type. The subtype is where the picture sharpens. Your instinctual stacking decides what counts as winning to you, and two Threes with different stackings chase different scoreboards entirely.",
    4: "You have your type. The subtype is what makes the reading yours rather than every Four's. Your instinctual stacking shapes how longing actually shows up, and two Fours with different stackings can feel like different people.",
    5: "You have your type. The subtype is the next real variable. Your instinctual stacking determines what you conserve and where you spend, and two Fives with different stackings guard entirely different resources.",
    6: "You have your type. The subtype is what makes the model hold up. Your instinctual stacking decides where you look for security, and two Sixes with different stackings handle the same threat in opposite ways.",
    7: "You have your type. The subtype is the layer that keeps opening. Your instinctual stacking decides which possibilities pull hardest, and two Sevens with different stackings want completely different things.",
    8: "You have your type. The subtype is where the read gets accurate. Your instinctual stacking decides what you take control of first, and two Eights with different stackings protect different territory.",
    9: "You have your type. The subtype is one short step from here. Your instinctual stacking shapes what you merge with and what you go numb to, and two Nines with different stackings check out over different things.",
    default: "You have your type. Now find your subtype. Your instinctual stacking shapes which version of your type you actually live. Two Type 5s with different stackings can feel like entirely different people.",
  },
  "assessments.why.tritype": {
    1: "Your tritype names which type you lead with in each of the three centers. It explains why your standards land the way they do in relationships and under pressure, and where the correction reflex is actually coming from.",
    2: "Your tritype names which type you lead with in each of the three centers. It explains why your way of caring looks different from other Twos, and which part of you takes over when you are running on empty.",
    3: "Your tritype names which type you lead with in each of the three centers. It is the layer that explains performance patterns the core type alone cannot account for, and it sharpens the whole profile.",
    4: "Your tritype names which type you lead with in each of the three centers. It is the most specific thing the system can tell you, and it is why two Fours can share a type and almost nothing else.",
    5: "Your tritype names which type you lead with in each of the three centers. It adds real resolution to the model rather than restating your core type in new words.",
    6: "Your tritype names which type you lead with in each of the three centers. It explains which strategy you reach for when doubt arrives, and it comes from Fauvre's forced-choice method rather than guesswork.",
    7: "Your tritype names which type you lead with in each of the three centers. Three types instead of one, and it explains why the same Seven can look so different depending on the room.",
    8: "Your tritype names which type you lead with in each of the three centers. It shows what is under the directness, and where the intensity is actually sourced.",
    9: "Your tritype names which type you lead with in each of the three centers. Twenty seven questions, forced choice, nothing to weigh up on your own.",
    default: "Your tritype reveals which type from each intelligence center you draw on most. It explains why two people of the same type can feel so different in relationships and under stress.",
  },
  "assessments.why.cognitive": {
    1: "Your Enneagram type explains what you are correcting for. The Jungian function stack explains the machinery doing it, and the overlap is where the pattern becomes specific enough to work with.",
    2: "Your Enneagram type explains why you move toward people. The Jungian function stack explains how you read them, and together they show where attunement turns into losing track of yourself.",
    3: "Your Enneagram type explains what you are driving at. The Jungian function stack explains how you process and decide, and the intersection is where the profile gets genuinely hard to argue with.",
    4: "Your Enneagram type explains what you feel. The Jungian function stack explains how that feeling gets processed, and the intersection is the most specific portrait the app can build of you.",
    5: "Your Enneagram type explains the motivation. The Jungian function stack explains the mechanism. Jung's original model, Beebe's shadow work, and the point where the two systems intersect.",
    6: "Your Enneagram type explains what you are scanning for. The Jungian function stack explains how you process what you find, and both come from the primary sources rather than a repackaged version.",
    7: "Your Enneagram type explains what pulls you forward. The Jungian function stack explains how your mind actually moves, and it is a genuinely different lens rather than the same material again.",
    8: "Your Enneagram type explains what you protect. The Jungian function stack explains how you take in information and decide, and the overlap is where the blind spot usually sits.",
    9: "Your Enneagram type explains what you keep smooth. The Jungian function stack explains how you process, and it is a study format rather than another long questionnaire.",
    default: "Adding your cognitive type reveals the 'how' behind your Enneagram 'why.' The intersection of your Jungian function stack and your Enneagram fixation is where the deepest patterns become visible.",
  },
  "assessments.why.bigfive": {
    1: "The Big Five is the empirically validated layer. It checks the rest of your profile against trait data rather than self report alone, which is the difference between a description you agree with and one that holds up.",
    2: "The Big Five adds the measured layer. It shows where your warmth sits relative to everyone else, which is hard to see from inside a pattern built on reading other people.",
    3: "The Big Five is the scientific gold standard, and it is the part of your profile that would survive outside scrutiny. It cross validates everything else you have mapped.",
    4: "The Big Five is the layer that is not about self perception. It places your profile against population data, and the gaps between how you score and how you see yourself are usually the interesting part.",
    5: "The Big Five is the most rigorously validated model in personality psychology. One hundred twenty IPIP NEO items, facet level resolution, and it cross checks the motivation based frameworks you have already completed.",
    6: "The Big Five is the part of your profile with the strongest evidence base behind it. It cross validates your other results rather than asking you to take them on faith.",
    7: "The Big Five is a completely different lens on the same person. Trait level rather than motivation based, with facet detail your Enneagram results cannot reach.",
    8: "The Big Five is the layer nobody can wave away. Validated instrument, population norms, and a straight answer about where you actually sit.",
    9: "The Big Five completes the map. It is the last dimension, it cross checks everything else, and then the profile is done.",
    default: "You've mapped your Enneagram and cognitive picture. The Big Five adds the empirically validated layer. It cross-validates your other results and surfaces trait-level nuance that motivation-based frameworks miss.",
  },
};


// ─── Helper: get the right variant based on type ────────────────────────

export function getTypeAwareCopy(
  key: string,
  type: number | null | undefined
): string {
  const entry = TYPE_AWARE_COPY[key];
  if (!entry) return "";
  if (type && type >= 1 && type <= 9) {
    return entry[type as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9];
  }
  return entry.default;
}
