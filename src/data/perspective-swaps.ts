// Perspective Swap (Galinsky et al. 2008)
//
// Present a scenario, then show how the user's integration type would
// see it. Reduces egocentric bias. Uses existing integration line data.

import { INTEGRATION_TYPE } from "./integration-messages";

export interface PerspectiveSwap {
  scenario: string;
  yourLens: string; // how user's type sees it
  integrationLens: string; // how integration type sees it
  reflection: string;
}

export const PERSPECTIVE_SWAPS: Record<number, PerspectiveSwap[]> = {
  1: [
    { scenario: "A colleague submits work that is clearly below standard.",
      yourLens: "Type 1: This needs to be corrected. The standard exists for a reason.",
      integrationLens: "Integration toward 7: What if the standard is less urgent than the relationship? What would playfulness look like here?",
      reflection: "Your instinct to correct is real. The question is whether correction is the most useful move right now." },
  ],
  2: [
    { scenario: "A friend is going through a hard time and hasn't asked for help.",
      yourLens: "Type 2: I should reach out. I can sense what they need.",
      integrationLens: "Integration toward 4: What if their experience is theirs to hold? What if not helping is a form of respect?",
      reflection: "Your impulse to help is genuine. The question is whether it serves them or serves your need to be needed." },
  ],
  3: [
    { scenario: "You have a free weekend with no plans and no obligations.",
      yourLens: "Type 3: I should use this time productively. I'll fall behind.",
      integrationLens: "Integration toward 6: What if resting is not falling behind? What if trust means trusting that you are enough without producing?",
      reflection: "Your drive to produce is a strength. The question is whether it's running you or you're running it." },
  ],
  4: [
    { scenario: "Everyone around you seems content and you feel like the only one struggling.",
      yourLens: "Type 4: Something is wrong with me. They have something I don't.",
      integrationLens: "Integration toward 1: What if the struggle is not special? What if the next right action is more useful than the feeling?",
      reflection: "Your depth of feeling is real. The question is whether comparison is serving you or consuming you." },
  ],
  5: [
    { scenario: "Someone asks you to collaborate on a project that excites you intellectually.",
      yourLens: "Type 5: I'd rather work on this alone. Collaboration drains me.",
      integrationLens: "Integration toward 8: What if engagement gives energy instead of taking it? What would bold participation look like?",
      reflection: "Your need for autonomy is valid. The question is whether retreat is a choice or an automatic defense." },
  ],
  6: [
    { scenario: "You are offered a new opportunity that excites you but feels risky.",
      yourLens: "Type 6: What could go wrong? I need to think through all the scenarios.",
      integrationLens: "Integration toward 9: What if you trusted that it will work out? What would peace with uncertainty feel like?",
      reflection: "Your caution is intelligent. The question is whether the scanning is proportional to the actual risk." },
  ],
  7: [
    { scenario: "You are in the middle of a project that has become tedious.",
      yourLens: "Type 7: There must be something more exciting I could be doing. This is boring.",
      integrationLens: "Integration toward 5: What if depth lives inside the boredom? What would focused attention reveal here?",
      reflection: "Your desire for stimulation is natural. The question is whether you're leaving because the work is done or because the novelty wore off." },
  ],
  8: [
    { scenario: "Someone you care about tells you they feel hurt by something you said.",
      yourLens: "Type 8: I was just being direct. They need to toughen up.",
      integrationLens: "Integration toward 2: What if their hurt is valid? What would tenderness look like right now?",
      reflection: "Your directness is a strength. The question is whether it served the relationship or only served your comfort." },
  ],
  9: [
    { scenario: "Your group of friends is making plans you disagree with.",
      yourLens: "Type 9: I'll go along. It's not worth the conflict.",
      integrationLens: "Integration toward 3: What if your voice adds value? What would decisive engagement look like?",
      reflection: "Your peacemaking is genuine. The question is whether it comes from harmony or from hiding." },
  ],
};

export function getTodaysPerspectiveSwap(type: number): PerspectiveSwap | null {
  const swaps = PERSPECTIVE_SWAPS[type];
  if (!swaps?.length) return null;
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return swaps[dayOfYear % swaps.length];
}

export { INTEGRATION_TYPE };
