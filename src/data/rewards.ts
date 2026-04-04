export const REWARDS = {
  CORRECT_ANSWER: 10,           // tokens per correct answer
  PERFECT_DAILY_QUIZ: 50,       // bonus for 5/5 on either track
  DAILY_PRACTICE_COMPLETE: 15,  // completing the growth prompt
  STREAK_BONUS_3: 25,           // 3-day streak bonus
  STREAK_BONUS_7: 75,           // 7-day streak bonus
  STREAK_BONUS_30: 500,         // 30-day streak bonus
} as const;

export type RewardKey = keyof typeof REWARDS;

/** Get today's date as YYYY-MM-DD string */
export function getTodayKey(): string {
  return new Intl.DateTimeFormat("en-CA").format(new Date());
}

/** Check if two date strings are consecutive days */
export function isConsecutiveDay(dateA: string, dateB: string): boolean {
  const a = new Date(dateA);
  const b = new Date(dateB);
  const diff = Math.abs(a.getTime() - b.getTime());
  return diff >= 86400000 * 0.5 && diff <= 86400000 * 1.5;
}

/** Type study sequence: core type first, then wings, stress/growth lines, remaining */
export function buildTypeSequence(coreType: number): number[] {
  // Wing numbers (adjacent on the circle)
  const wing1 = coreType === 1 ? 9 : coreType - 1;
  const wing2 = coreType === 9 ? 1 : coreType + 1;

  // Stress and growth lines
  const stressLines: Record<number, number> = { 1: 4, 2: 8, 3: 9, 4: 2, 5: 7, 6: 3, 7: 1, 8: 5, 9: 6 };
  const growthLines: Record<number, number> = { 1: 7, 2: 4, 3: 6, 4: 1, 5: 8, 6: 9, 7: 5, 8: 2, 9: 3 };

  const stressType = stressLines[coreType] ?? 1;
  const growthType = growthLines[coreType] ?? 1;

  const priority = [coreType, wing1, wing2, stressType, growthType];
  const remaining = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((t) => !priority.includes(t));

  return [...priority, ...remaining];
}
