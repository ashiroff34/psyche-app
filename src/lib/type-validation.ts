// ─────────────────────────────────────────────────────────────────────────────
// Wing & Tritype Validation
// Source: Riso & Hudson "Wisdom of the Enneagram"
// ─────────────────────────────────────────────────────────────────────────────

// Valid adjacent wings for each type (types are arranged in a circle 1-9-8-7-6-5-4-3-2-1)
const VALID_WINGS: Record<number, number[]> = {
  1: [9, 2],
  2: [1, 3],
  3: [2, 4],
  4: [3, 5],
  5: [4, 6],
  6: [5, 7],
  7: [6, 8],
  8: [7, 9],
  9: [8, 1],
};

// Intelligence centers
const GUT_TYPES = [8, 9, 1];
const HEART_TYPES = [2, 3, 4];
const HEAD_TYPES = [5, 6, 7];

export type Center = "gut" | "heart" | "head";

export function getCenterForType(type: number): Center | null {
  if (GUT_TYPES.includes(type)) return "gut";
  if (HEART_TYPES.includes(type)) return "heart";
  if (HEAD_TYPES.includes(type)) return "head";
  return null;
}

export function getValidWings(coreType: number): number[] {
  return VALID_WINGS[coreType] ?? [];
}

export function validateWing(
  coreType: number,
  wing: number
): { valid: boolean; message?: string } {
  if (coreType < 1 || coreType > 9) {
    return { valid: false, message: "Core type must be between 1 and 9." };
  }
  if (wing < 1 || wing > 9) {
    return { valid: false, message: "Wing must be between 1 and 9." };
  }
  if (coreType === wing) {
    return { valid: false, message: "Wing cannot be the same as your core type." };
  }
  const validWings = VALID_WINGS[coreType];
  if (!validWings?.includes(wing)) {
    const [w1, w2] = validWings ?? [];
    return {
      valid: false,
      message: `Type ${coreType}'s wings are ${w1} and ${w2}. Type ${wing} is not adjacent on the Enneagram circle.`,
    };
  }
  return { valid: true };
}

export function validateTritype(
  t1: number,
  t2: number,
  t3: number
): { valid: boolean; message?: string } {
  const types = [t1, t2, t3];

  // All must be 1-9
  if (types.some((t) => t < 1 || t > 9)) {
    return { valid: false, message: "All tritype values must be between 1 and 9." };
  }

  // All must be distinct
  if (new Set(types).size !== 3) {
    return { valid: false, message: "Tritype cannot contain duplicate types." };
  }

  // Must have one type from each center
  const hasGut = types.some((t) => GUT_TYPES.includes(t));
  const hasHeart = types.some((t) => HEART_TYPES.includes(t));
  const hasHead = types.some((t) => HEAD_TYPES.includes(t));

  if (!hasGut) {
    return { valid: false, message: "Tritype must include one Gut type (8, 9, or 1)." };
  }
  if (!hasHeart) {
    return { valid: false, message: "Tritype must include one Heart type (2, 3, or 4)." };
  }
  if (!hasHead) {
    return { valid: false, message: "Tritype must include one Head type (5, 6, or 7)." };
  }

  return { valid: true };
}

/**
 * Parse a wing string like "4w5" and validate it.
 */
export function parseAndValidateWingString(
  wingStr: string
): { valid: boolean; coreType?: number; wing?: number; message?: string } {
  const match = wingStr.match(/^(\d)w(\d)$/i);
  if (!match) {
    return { valid: false, message: `Could not parse wing string "${wingStr}". Expected format: "4w5".` };
  }
  const coreType = parseInt(match[1], 10);
  const wing = parseInt(match[2], 10);
  const result = validateWing(coreType, wing);
  return { ...result, coreType, wing };
}

/**
 * Returns a human-readable label for a type's center.
 */
export function getCenterLabel(type: number): string {
  const center = getCenterForType(type);
  if (center === "gut") return "Gut / Body Center";
  if (center === "heart") return "Heart / Feeling Center";
  if (center === "head") return "Head / Thinking Center";
  return "Unknown";
}
