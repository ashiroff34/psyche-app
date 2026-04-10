// Variable Reinforcement Schedules (Skinner, 1957)
//
// Partial reinforcement produces the highest response persistence and
// slowest extinction. Applied to consumer apps: Duolingo's XP chests,
// Co-Star's unpredictable pushes, Twitter's pull-to-refresh.
//
// We add three layers of variable reward on top of the existing fixed
// 10-per-correct-answer token economy:
//
//   1. Lucky drop: small chance on any completed daily action to roll
//      a bonus token drop (5-25 tokens) with a celebratory reveal.
//   2. Golden question: one question per day has a 12% chance of being
//      a "golden" variant that pays 3x tokens.
//   3. Bonus day: one day in ~8 is a "bonus day" where the full daily
//      practice pays double, announced at the start of the day.
//
// All three fire independently so each session has a fresh possibility.
// None of them are NEGATIVE (no loss aversion) — this is variable reward
// only, never variable punishment. Self-compassion framing throughout.

export type RewardRoll =
  | { kind: "none" }
  | { kind: "lucky"; tokens: number; label: string }
  | { kind: "golden"; multiplier: number; label: string }
  | { kind: "bonusDay"; label: string };

// Per-day deterministic roll so refreshing doesn't re-roll
function hashDay(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  return Math.abs(h);
}

function getDateKey(): string {
  return new Intl.DateTimeFormat("en-CA").format(new Date());
}

/**
 * Roll a "lucky drop" after a completed daily action. 8% chance per call.
 * Not deterministic by day, fires on individual action completion. Each
 * fire writes to localStorage with a session-unique key to prevent spam.
 *
 * Returns the reward if it triggered, otherwise null.
 */
export function rollLuckyDrop(actionId: string): RewardRoll {
  if (typeof window === "undefined") return { kind: "none" };
  const today = getDateKey();
  const key = `psyche-lucky-drop-${today}-${actionId}`;
  if (localStorage.getItem(key)) return { kind: "none" };

  // Cap at 2 lucky drops per day total
  const dailyCountKey = `psyche-lucky-drop-count-${today}`;
  const dailyCount = parseInt(localStorage.getItem(dailyCountKey) ?? "0", 10);
  if (dailyCount >= 2) return { kind: "none" };

  const roll = Math.random();
  if (roll < 0.08) {
    // Tiered token drop: 70% small, 25% medium, 5% big
    const tier = Math.random();
    const tokens = tier < 0.7 ? 5 : tier < 0.95 ? 15 : 25;
    const label = tier < 0.7
      ? "A little something extra"
      : tier < 0.95
      ? "Nice drop"
      : "Big drop, rare";
    localStorage.setItem(key, "1");
    localStorage.setItem(dailyCountKey, String(dailyCount + 1));
    return { kind: "lucky", tokens, label };
  }
  return { kind: "none" };
}

/**
 * Check if today is a "bonus day" (1 in 8, deterministic by date).
 * When true, daily practice rewards are doubled.
 */
export function isBonusDayToday(): boolean {
  const today = getDateKey();
  const h = hashDay(`bonus-${today}`);
  return h % 8 === 0;
}

/**
 * Check if a given question ID rolled a "golden" variant today.
 * Deterministic by question+day so it's consistent across refreshes.
 * Roughly 12% of questions per day will be golden.
 */
export function isGoldenQuestion(questionId: string): boolean {
  const today = getDateKey();
  const h = hashDay(`golden-${today}-${questionId}`);
  return h % 100 < 12;
}

export const GOLDEN_MULTIPLIER = 3;
