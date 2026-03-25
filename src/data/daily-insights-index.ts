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
