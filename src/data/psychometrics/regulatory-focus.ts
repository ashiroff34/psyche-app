// Regulatory Focus Theory (Higgins, 1997)
//
// People pursue goals in two distinct ways:
//   - Promotion focus: aspirations, gains, ideals, growth. Motivation by the
//     possibility of a positive outcome.
//   - Prevention focus: responsibilities, losses, oughts, safety. Motivation
//     by the avoidance of a negative outcome.
//
// Higgins's "regulatory fit" research (Higgins, 2000, 2005) shows that
// when message framing matches a person's focus, persuasion and follow-
// through jump by roughly 30%. The fit itself creates positive affect
// that gets mis-attributed to the message.
//
// Fit with Enneagram:
//   - 6s, 1s, and 9s tend to skew prevention
//   - 3s, 7s, and 8s tend to skew promotion
//   - 2s, 4s, 5s vary
//
// We use a short 6-item version adapted from Higgins's RFQ, then store
// a dominant focus that gets consulted wherever we frame a CTA or prompt.

export type RegulatoryFocus = "promotion" | "prevention" | "balanced";

export interface RegulatoryFocusItem {
  id: string;
  text: string;
  focus: "promotion" | "prevention";
  reverse: boolean;
}

export const RF_ITEMS: RegulatoryFocusItem[] = [
  { id: "rf1", text: "I often think about the person I would ideally like to be.", focus: "promotion", reverse: false },
  { id: "rf2", text: "My major goal right now is to achieve my ambitions.", focus: "promotion", reverse: false },
  { id: "rf3", text: "I typically focus on the good that can come from a new opportunity.", focus: "promotion", reverse: false },
  { id: "rf4", text: "I often think about the person I am afraid of becoming.", focus: "prevention", reverse: false },
  { id: "rf5", text: "My major goal right now is to avoid failures.", focus: "prevention", reverse: false },
  { id: "rf6", text: "I worry about making mistakes.", focus: "prevention", reverse: false },
];

export function scoreRegulatoryFocus(answers: Record<string, number>): {
  promotion: number;
  prevention: number;
  dominant: RegulatoryFocus;
} {
  let promoSum = 0, promoN = 0, prevSum = 0, prevN = 0;
  for (const item of RF_ITEMS) {
    const raw = answers[item.id];
    if (typeof raw !== "number") continue;
    const adj = item.reverse ? 6 - raw : raw;
    if (item.focus === "promotion") {
      promoSum += adj;
      promoN++;
    } else {
      prevSum += adj;
      prevN++;
    }
  }
  const promotion = promoN ? Math.round(((promoSum / promoN - 1) / 4) * 100) : 50;
  const prevention = prevN ? Math.round(((prevSum / prevN - 1) / 4) * 100) : 50;
  const gap = promotion - prevention;
  const dominant: RegulatoryFocus =
    gap > 10 ? "promotion" : gap < -10 ? "prevention" : "balanced";
  return { promotion, prevention, dominant };
}

/**
 * Pick the message variant that matches the user's regulatory focus. Falls
 * back to promotion (the more common default in consumer copy) if no focus
 * is set. Based on Higgins's regulatory fit principle.
 */
export function pickByFocus<T>(
  focus: RegulatoryFocus | null | undefined,
  variants: { promotion: T; prevention: T; balanced?: T }
): T {
  if (focus === "prevention") return variants.prevention;
  if (focus === "balanced" && variants.balanced !== undefined) return variants.balanced;
  return variants.promotion;
}
