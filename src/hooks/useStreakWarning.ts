"use client";

import { useEffect } from "react";
import {
  cancelStreakWarning,
  scheduleStreakWarning,
  scheduleTomorrowStreakWarning,
} from "@/lib/capacitor-notifications";

/**
 * Arm the 8pm streak-at-risk push as soon as any screen renders with an unmet
 * daily goal, and pre-arm tomorrow's once today is done.
 *
 * This lived inside StreakCard, which only renders on the daily hub. That meant
 * the one notification designed to reach a user who has closed the app could
 * only be armed by a user who had already navigated two screens in — never the
 * absent user it exists for. Any screen that knows the streak and whether today
 * is done can call this; the underlying scheduler refuses after 8pm and
 * deduplicates to once per calendar day, so extra callers are free.
 */
export function useStreakWarning(
  streak: number,
  dailyCompleted: boolean,
  enneagramType?: number | null
): void {
  useEffect(() => {
    if (streak <= 0) return;
    if (dailyCompleted) {
      cancelStreakWarning()
        .then(() => scheduleTomorrowStreakWarning(streak, enneagramType))
        .catch(() => undefined);
      return;
    }
    scheduleStreakWarning(streak, enneagramType).catch(() => undefined);
  }, [dailyCompleted, streak, enneagramType]);
}
