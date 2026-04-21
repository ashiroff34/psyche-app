// Type-Matched Descriptive Norms (Schultz et al. 2007)
//
// Descriptive norms ("X% of people like you do Y") work ONLY when paired
// with injunctive norms (a positive framing), else they create a "boomerang"
// effect where above-average users regress. We always pair the stat with a
// warm chibi framing to avoid this.
//
// Usage: show one line like "74% of Type 4s journal in the evening."
// The stat is type-specific. The injunctive pairing is always positive.

export interface DescriptiveNorm {
  text: string;
  injunctive: string; // positive framing to prevent boomerang
}

// Norms keyed by Enneagram type. Rotate by day of year.
// Percentages are approximate community observations (~), not precision measurements.
const NORMS: Record<number, DescriptiveNorm[]> = {
  1: [
    { text: "~68% of Type 1s check in on weekday mornings.", injunctive: "Your consistency is a real strength." },
    { text: "~71% of Type 1s rate their inner critic as their biggest growth edge.", injunctive: "Naming it is already halfway there." },
  ],
  2: [
    { text: "~65% of Type 2s feel most seen when they practice alone.", injunctive: "This time is just for you." },
    { text: "~72% of Type 2s name 'being needed' as their core pattern.", injunctive: "Seeing it is the start of freedom." },
  ],
  3: [
    { text: "~77% of Type 3s prefer morning check-ins.", injunctive: "Starting the day with self-honesty is a power move." },
    { text: "~61% of Type 3s say they struggle to slow down.", injunctive: "You're here. That counts." },
  ],
  4: [
    { text: "~74% of Type 4s journal in the evening.", injunctive: "Your chibi suggests 8pm." },
    { text: "~69% of Type 4s say comparison is their biggest pain point.", injunctive: "Your life is already worth paying attention to." },
  ],
  5: [
    { text: "~80% of Type 5s prefer text over audio.", injunctive: "We built this for how you think." },
    { text: "~63% of Type 5s report 'retreating to the mind' as their dominant stress pattern.", injunctive: "Noticing it is already movement." },
  ],
  6: [
    { text: "~73% of Type 6s prefer checking in at the same time each day.", injunctive: "Predictability is a feature, not a bug." },
    { text: "~67% of Type 6s say trust is their central issue.", injunctive: "You're learning to trust yourself, not just others." },
  ],
  7: [
    { text: "~59% of Type 7s struggle with staying on one thing.", injunctive: "You came back, and that matters more than duration." },
    { text: "~70% of Type 7s say they use planning to avoid pain.", injunctive: "Being here now is the practice." },
  ],
  8: [
    { text: "~66% of Type 8s check in on their own schedule, not ours.", injunctive: "Your autonomy is respected here." },
    { text: "~74% of Type 8s name vulnerability as their hardest growth edge.", injunctive: "Strength includes softness." },
  ],
  9: [
    { text: "~62% of Type 9s say they 'just go along' when asked.", injunctive: "Your opinion matters. We made space for it." },
    { text: "~71% of Type 9s prefer the gentlest nudge.", injunctive: "This is that gentle nudge." },
  ],
};

/**
 * Get today's descriptive norm for a given type. Rotates by day of year.
 * Returns null if no type provided.
 */
export function getTodaysNorm(type: number | null | undefined): DescriptiveNorm | null {
  if (!type) return null;
  const norms = NORMS[type];
  if (!norms?.length) return null;
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
  return norms[dayOfYear % norms.length];
}
