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
