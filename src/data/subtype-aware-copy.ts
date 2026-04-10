// Subtype-Aware Copy Library
//
// Extends type-aware copy with instinctual subtype variants (sp/sx/so).
// Based on Beatrice Chestnut's "The Complete Enneagram" and Claudio Naranjo's
// 27 character structures. Each Enneagram type has three instinctual variants
// with meaningfully different growth paths, daily needs, and language.
//
// Key insight: an sp-4 (tenacity) and an so-4 (shame) look almost nothing
// alike behaviorally, even though they share a core type. Subtype-aware
// copy respects that difference.
//
// Usage:
//   const copy = useSubtypeAwareCopy();
//   const headline = copy("daily.growth.prompt");
//   // Falls back to type-only copy, then to default, if subtype not set.

export type Instinct = "sp" | "sx" | "so";

export interface SubtypeAwareCopyEntry {
  // 27 entries, keyed "{type}-{instinct}" e.g., "4-sp"
  [key: string]: string;
}

// Helper to construct a 27-variant entry with a default.
function build(
  defaultText: string,
  variants: Partial<Record<`${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}-${Instinct}`, string>>
): SubtypeAwareCopyEntry {
  return { default: defaultText, ...variants };
}

export const SUBTYPE_AWARE_COPY: Record<string, SubtypeAwareCopyEntry> = {
  // ─────────────────────────────────────────────────────────────────────
  // Daily growth prompt, the single most-used surface for personalization
  // ─────────────────────────────────────────────────────────────────────
  "daily.growth.prompt": build("What is one small act of self-honesty today?", {
    // Type 1
    "1-sp": "Where are you silently worrying instead of acting? Name one worry and release it.",
    "1-sx": "Where did your reforming energy land on someone today? Could acceptance be the move instead?",
    "1-so": "Where are you modeling correctness at the cost of connection? Soften one rule.",
    // Type 2
    "2-sp": "Where are you charming to avoid asking directly? Name one real need.",
    "2-sx": "Where are you pursuing a specific person's favor? What would it feel like to rest?",
    "2-so": "Where are you giving strategically? Notice the ambition under the help.",
    // Type 3
    "3-sp": "Where are you working hard to look modest? Can you own one accomplishment out loud?",
    "3-sx": "Where are you shape-shifting for someone's attention? What is actually yours?",
    "3-so": "Where are you performing status? Name one value that matters more than prestige.",
    // Type 4
    "4-sp": "Where did you endure in silence today? Tenacity is a strength, but it is not the only one. Ask for help.",
    "4-sx": "Where did comparison or envy flare? What would it mean to honor your own life as enough?",
    "4-so": "Where did shame pull you into suffering as identity? Name one ordinary thing you actually love.",
    // Type 5
    "5-sp": "Where are you guarding resources or time? What would sharing one thing feel like?",
    "5-sx": "Where are you seeking the one person who truly understands? Start with being understood in small ways.",
    "5-so": "Where are you hoarding knowledge as status? Who could you actually teach?",
    // Type 6
    "6-sp": "Where is anxiety running the show? Name the worst case, then one smaller real next step.",
    "6-sx": "Where are you pushing against fear with force (counter-phobic)? What is the quiet fear underneath?",
    "6-so": "Where are you seeking an authority to settle your doubt? What do you already know?",
    // Type 7
    "7-sp": "Where are you planning the next escape? Stay with one thing for five more minutes than usual.",
    "7-sx": "Where are you idealizing something just out of reach? What is already good here?",
    "7-so": "Where are you sacrificing your own pleasure to look generous? Name one real want.",
    // Type 8
    "8-sp": "Where are you hardening to protect your turf? Where could softness actually win?",
    "8-sx": "Where did intensity overwhelm connection? What would vulnerability look like here?",
    "8-so": "Where are you fighting on behalf of others to avoid your own needs? Name one for yourself.",
    // Type 9
    "9-sp": "Where did you merge with a routine to avoid a decision? Pick one thing you actually want.",
    "9-sx": "Where did you merge with another person's wants? Name one that is yours.",
    "9-so": "Where did you go along to belong? What would your real opinion be?",
  }),

  // ─────────────────────────────────────────────────────────────────────
  // Hub greeting (reinforces identity + path, subtype-specific energy)
  // ─────────────────────────────────────────────────────────────────────
  "hub.subtype.greeting": build("Your practice is here.", {
    "1-sp": "Worry is not wisdom. Good enough is a practice.",
    "1-sx": "Your passion is real. So is the person in front of you.",
    "1-so": "Your standards are not the only valid ones. Flexibility is integrity too.",
    "2-sp": "You are allowed to need things directly. No charm required.",
    "2-sx": "Love that is earned is not love. Try unearning it.",
    "2-so": "You can be helpful without being indispensable.",
    "3-sp": "Quiet achievement is still image. You are allowed to be seen.",
    "3-sx": "You are more than the reflection in their eyes.",
    "3-so": "Status fades. What do you actually value?",
    "4-sp": "Tenacity is not the same as suffering well. Rest is allowed.",
    "4-sx": "Envy is information, not identity.",
    "4-so": "Shame is a feeling, not a self. Ordinary is not a failure.",
    "5-sp": "Resources can be replenished. Give one thing away.",
    "5-sx": "Deep connection starts with being reachable.",
    "5-so": "Knowledge without relationship is hoarding.",
    "6-sp": "Worst case is not most likely. What is most likely?",
    "6-sx": "Counter-phobic courage is still fear. Meet it instead of fighting it.",
    "6-so": "You know more than you trust.",
    "7-sp": "Staying is also freedom.",
    "7-sx": "The next thing is not automatically better.",
    "7-so": "You are allowed to want for yourself.",
    "8-sp": "Softness is not weakness. It is precision.",
    "8-sx": "Intensity can frighten the people you love. Gentleness wins here.",
    "8-so": "Your own needs are not a distraction from the fight.",
    "9-sp": "Routine is not rest. Choose one thing today.",
    "9-sx": "Their life is not your life. What is yours?",
    "9-so": "Agreement is not harmony. Your voice belongs in the room.",
  }),

  // ─────────────────────────────────────────────────────────────────────
  // Growth focus, the single thing this subtype needs most (Chestnut)
  // ─────────────────────────────────────────────────────────────────────
  "growth.focus": build("Self-honesty.", {
    "1-sp": "Tolerating imperfection.",
    "1-sx": "Letting others be.",
    "1-so": "Flexibility in principles.",
    "2-sp": "Asking directly.",
    "2-sx": "Receiving without seducing.",
    "2-so": "Owning ambition honestly.",
    "3-sp": "Allowing visibility.",
    "3-sx": "Finding the self under the image.",
    "3-so": "Prioritizing values over status.",
    "4-sp": "Accepting support.",
    "4-sx": "Separating envy from identity.",
    "4-so": "Releasing shame as identity.",
    "5-sp": "Sharing resources and time.",
    "5-sx": "Being reachable in connection.",
    "5-so": "Teaching instead of hoarding.",
    "6-sp": "Acting despite anxiety.",
    "6-sx": "Meeting fear, not fighting it.",
    "6-so": "Trusting inner guidance.",
    "7-sp": "Staying through discomfort.",
    "7-sx": "Accepting the current moment.",
    "7-so": "Claiming personal pleasure.",
    "8-sp": "Allowing vulnerability.",
    "8-sx": "Titrating intensity with care.",
    "8-so": "Recognizing own needs.",
    "9-sp": "Making active choices.",
    "9-sx": "Distinguishing self from other.",
    "9-so": "Speaking dissent.",
  }),
};

/**
 * Resolve a subtype-aware copy key. Falls back in this order:
 *   1. "{type}-{instinct}" exact match
 *   2. "default" on the entry
 *   3. The provided fallback string
 *
 * @param key Copy key
 * @param type Enneagram core type (1-9) or null
 * @param instinct Dominant instinct (sp/sx/so) or null
 * @param fallback Final fallback if key missing entirely
 */
export function getSubtypeAwareCopy(
  key: string,
  type: number | null | undefined,
  instinct: Instinct | null | undefined,
  fallback = ""
): string {
  const entry = SUBTYPE_AWARE_COPY[key];
  if (!entry) return fallback;
  if (type && instinct) {
    const exact = entry[`${type}-${instinct}`];
    if (exact) return exact;
  }
  return entry.default ?? fallback;
}
