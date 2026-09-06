// Type-Aware Paywall Copy
//
// The paywall is the one surface where knowing the user's Enneagram type is
// worth real money. A Two and a Five are not weighing the same purchase: the
// Two is buying a way to be closer to people, the Five is buying depth of
// understanding. Selling both of them "unlock more features" wastes the only
// thing this app knows that a generic wellness app does not.
//
// Each entry has three parts, used together on /pricing and on the
// results-screen upsell:
//   headline   the identity-level promise, read first
//   lossFrame  what stays unchanged if they don't go deeper (losses are
//              weighted heavier than equivalent gains, Kahneman & Tversky)
//   proBenefit what Pro concretely gives, stated in that type's motivation
//
// Motivations follow Riso-Hudson's core-desire framing, not pop-psych traits.
// Keep every line free of dashes, emoji, and mystical language per the UI copy
// rules; this text ships verbatim to users.

export interface TypePaywallCopy {
  headline: string;
  lossFrame: string;
  proBenefit: string;
}

export const DEFAULT_PAYWALL_COPY: TypePaywallCopy = {
  headline: "Understand why you are the way you are.",
  lossFrame:
    "Knowing your type is the easy part. Without the subtype, tritype, and shadow layers, the pattern you just recognized keeps running anyway.",
  proBenefit:
    "Pro opens the layers that take years off the self-discovery curve.",
};

export const TYPE_PAYWALL_COPY: Record<number, TypePaywallCopy> = {
  1: {
    headline: "Stop settling for a life that doesn't match your values.",
    lossFrame:
      "You can already name the inner critic. Naming it has never once quieted it. Without the subtype and shadow layers, the standard keeps setting itself.",
    proBenefit:
      "Pro shows you exactly where your correction reflex fires, and what to do in the half second before it does.",
  },
  2: {
    headline: "Understand the people you love, and yourself, more deeply.",
    lossFrame:
      "You can read everyone else in the room. The person you still guess at is you, and that gap is what turns giving into resentment.",
    proBenefit:
      "Pro gives you the subtype and relational layers, so you can stay close to people without disappearing into them.",
  },
  3: {
    headline: "Know exactly what drives you, and what gets in the way.",
    lossFrame:
      "Surface-level typing is another badge. It does not touch the part of you that keeps performing when nobody asked.",
    proBenefit:
      "Pro turns self-knowledge into something measurable: tracked growth edges, shadow work, and a profile that gets sharper the longer you use it.",
  },
  4: {
    headline: "Finally make sense of why you feel what you feel.",
    lossFrame:
      "A type number is the least specific thing about you. Without the subtype and tritype layers, you get the same description as every other Four.",
    proBenefit:
      "Pro takes you to the 27 subtype structures, where the description finally stops being generic and starts being yours.",
  },
  5: {
    headline: "Go deeper into the framework than any book can take you.",
    lossFrame:
      "You have the map of the nine types. The actual material is in the 27 subtypes, the tritype architecture, and the shadow functions, and none of that is in the free tier.",
    proBenefit:
      "Pro is the full source material: Naranjo's 27 character structures, tritype deep-dives, and shadow work, with nothing dumbed down.",
  },
  6: {
    headline: "Build the self-trust you've always wanted.",
    lossFrame:
      "One assessment result is a data point, not certainty. Doubting it is exactly what your type does with every answer it gets.",
    proBenefit:
      "Pro cross-checks your type across multiple assessments and shows the reasoning, so the conclusion is one you can actually stand on.",
  },
  7: {
    headline: "Stop running. Discover what you actually want.",
    lossFrame:
      "You could take nine more free tests this month. Variety is the pattern, not the escape from it.",
    proBenefit:
      "Pro is the part that goes down instead of sideways: shadow work, subtypes, and the one question you have been staying busy enough to avoid.",
  },
  8: {
    headline: "Understand your power, and when to use it.",
    lossFrame:
      "Half a picture of yourself is a blind spot, and blind spots are the only thing that has ever actually cost you control.",
    proBenefit:
      "Pro hands you the full read on yourself: subtypes, shadow, and the tritype stack, with no part of it withheld.",
  },
  9: {
    headline: "Find yourself without losing the peace.",
    lossFrame:
      "Nothing bad happens if you close this. That is the pattern. The years pass and the question of what you actually want stays unopened.",
    proBenefit:
      "Pro is a slow, unhurried path through the deeper layers. A few minutes a day, no pressure, and it waits for you.",
  },
};

/** Paywall copy for a type, falling back to the untyped default. */
export function getPaywallCopy(
  enneagramType?: number | null
): TypePaywallCopy {
  return (enneagramType && TYPE_PAYWALL_COPY[enneagramType]) || DEFAULT_PAYWALL_COPY;
}
