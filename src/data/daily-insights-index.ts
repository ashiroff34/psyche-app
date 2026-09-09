// Central index for all 1,000 daily insights
// Split across 4 files to keep each manageable

import { insights1, type DailyInsight } from "./daily-insights-1";
import { insights2 } from "./daily-insights-2";
import { insights3 } from "./daily-insights-3";
import { insights4 } from "./daily-insights-4";

export type { DailyInsight };

export const allInsights: DailyInsight[] = [
  ...insights1,
  ...insights2,
  ...insights3,
  ...insights4,
];

/**
 * Get today's insight based on the day of the year.
 * Cycles through all 1,000 insights over ~2.7 years, then repeats.
 */
export function getTodayInsight(): DailyInsight {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  // Use year offset so it doesn't repeat the same insight on Jan 1 every year
  const yearOffset = (now.getFullYear() - 2026) * 365;
  const index = (dayOfYear + yearOffset) % allInsights.length;
  return allInsights[index] || allInsights[0];
}

/**
 * Get a specific insight by its ID (1-1000)
 */
export function getInsightById(id: number): DailyInsight | undefined {
  return allInsights.find((i) => i.id === id);
}

/**
 * The `category` field was authored over time and drifted: the same tradition
 * appears as "jung", "jungian", and "Jungian psychology", and presence
 * material is split across "mindfulness" and "Buddhist wisdom". Normalizing
 * here keeps the affinity lists below honest without rewriting 1,000 entries.
 */
const CATEGORY_ALIASES: Record<string, string> = {
  "socratic philosophy": "philosophy",
  "buddhist wisdom": "mindfulness",
  "growth mindset": "growth",
  "emotional intelligence": "emotional-intelligence",
  "jungian psychology": "jungian",
  jung: "jungian",
  "enneagram wisdom": "enneagram",
};

function normalizeCategory(category: string): string {
  const key = category.trim().toLowerCase();
  return CATEGORY_ALIASES[key] ?? key;
}

/**
 * Category affinities per Enneagram type.
 *
 * The insights are drawn from a dozen traditions. Which tradition lands for a
 * reader is not random: a Five reaches for the explanatory frame, a Nine for
 * the settling one, an Eight for the one that respects agency. The affinities
 * below map each type's core motivation (Riso-Hudson core desire, Naranjo's
 * passion structure) onto the traditions most likely to meet it.
 *
 * This selects which existing insight surfaces. It does not rewrite the
 * insight, and it never narrows the pool to a single voice: every list spans
 * well over a hundred insights, so a reader sees a genuinely different quote
 * each day for years. Enneagram material is in every list, since it is the
 * shared language of the app.
 */
const TYPE_CATEGORY_AFFINITY: Record<number, string[]> = {
  // Integrity and the corrected self: Stoic discipline, growth, first principles
  1: ["stoicism", "growth", "philosophy", "enneagram"],
  // Love, need, and being needed: the relational and self-observing traditions
  2: ["relationships", "emotional-intelligence", "self-awareness", "wisdom", "enneagram"],
  // Achievement, and worth beyond performance
  3: ["growth", "psychology", "stoicism", "enneagram"],
  // Depth, meaning, and the authentic self: existential and Jungian material
  4: ["existentialism", "jungian", "self-awareness", "enneagram"],
  // Understanding as safety: the explanatory traditions
  5: ["neuroscience", "psychology", "philosophy", "enneagram"],
  // Certainty and trustworthy ground: steadiness, alliance, present-moment
  6: ["stoicism", "relationships", "mindfulness", "enneagram"],
  // Possibility without escape: presence, open horizons, distilled wisdom
  7: ["mindfulness", "existentialism", "wisdom", "enneagram"],
  // Strength and self-possession: the agency-centered traditions
  8: ["stoicism", "philosophy", "growth", "enneagram"],
  // Ease and unforced presence: the quiet traditions
  9: ["mindfulness", "wisdom", "self-awareness", "enneagram"],
};

const insightPoolCache = new Map<number, DailyInsight[]>();

/**
 * The insights matching a type's affinity categories, in stable id order.
 * Falls back to the full library if a pool is ever too small to rotate on,
 * so a future data edit cannot strand a type on a handful of quotes.
 */
function getInsightPoolForType(type: number): DailyInsight[] {
  const cached = insightPoolCache.get(type);
  if (cached) return cached;

  const categories = TYPE_CATEGORY_AFFINITY[type];
  if (!categories) return allInsights;

  const wanted = new Set(categories);
  const pool = allInsights.filter((i) => wanted.has(normalizeCategory(i.category)));
  const resolved = pool.length >= 60 ? pool : allInsights;
  insightPoolCache.set(type, resolved);
  return resolved;
}

/**
 * Today's insight, drawn from the traditions that speak to this type.
 *
 * Deterministic per day, so the insight is stable across a session and across
 * both surfaces that render it. The type offsets the rotation phase, so two
 * people of different types are not reading the same library in lockstep.
 *
 * Passing null or undefined returns the untyped rotation, so a user who has
 * not typed yet still sees the full library.
 */
export function getTodayInsightForType(type: number | null | undefined): DailyInsight {
  if (!type || !TYPE_CATEGORY_AFFINITY[type]) return getTodayInsight();

  const pool = getInsightPoolForType(type);
  if (pool.length === 0) return getTodayInsight();

  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / oneDay);
  const yearOffset = (now.getFullYear() - 2026) * 365;
  // Offset by type so the nine types run out of phase with each other.
  const index = (dayOfYear + yearOffset + type * 37) % pool.length;
  return pool[index] || pool[0];
}
