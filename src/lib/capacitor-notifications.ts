/**
 * Capacitor local notifications helper
 *
 * Thin wrapper around @capacitor/local-notifications for scheduling
 * daily reminders on native iOS/Android builds. On web, all methods
 * no-op gracefully (the web fallback is handled by the service worker
 * registered in settings/page.tsx).
 *
 * Usage:
 *   import { scheduleDailyReminder, cancelDailyReminder } from "@/lib/capacitor-notifications";
 *   await scheduleDailyReminder({ hour: 9, minute: 0, title: "Your check-in", body: "..." });
 */

const NOTIFICATION_ID = 1001; // stable ID for the daily reminder (overwrites itself)

/** Check if we're running inside a Capacitor native shell. */
function isNative(): boolean {
  if (typeof window === "undefined") return false;
  // @ts-expect-error — Capacitor injects this global on native builds
  return !!window.Capacitor?.isNativePlatform?.();
}

/** Request notification permission. Returns true if granted. */
export async function requestNativePermission(): Promise<boolean> {
  if (!isNative()) return false;
  try {
    const { LocalNotifications } = await import("@capacitor/local-notifications");
    const result = await LocalNotifications.requestPermissions();
    return result.display === "granted";
  } catch {
    return false;
  }
}

/**
 * Schedule a repeating daily reminder at the given time.
 * Calling this again replaces the existing reminder (same NOTIFICATION_ID).
 */
export async function scheduleDailyReminder(opts: {
  hour: number;
  minute?: number;
  title: string;
  body: string;
}): Promise<boolean> {
  if (!isNative()) return false;
  try {
    const { LocalNotifications } = await import("@capacitor/local-notifications");

    // Ensure permission
    const perm = await LocalNotifications.checkPermissions();
    if (perm.display !== "granted") {
      const req = await LocalNotifications.requestPermissions();
      if (req.display !== "granted") return false;
    }

    // Cancel the existing one first so it doesn't pile up
    await LocalNotifications.cancel({ notifications: [{ id: NOTIFICATION_ID }] });

    // Schedule the new one — Capacitor repeats daily when `every: "day"` is set
    await LocalNotifications.schedule({
      notifications: [
        {
          id: NOTIFICATION_ID,
          title: opts.title,
          body: opts.body,
          schedule: {
            on: {
              hour: opts.hour,
              minute: opts.minute ?? 0,
            },
            every: "day",
            allowWhileIdle: true,
          },
          smallIcon: "ic_stat_icon_config_sample",
          iconColor: "#8b5cf6",
        },
      ],
    });
    return true;
  } catch (err) {
    console.error("Failed to schedule daily reminder:", err);
    return false;
  }
}

const STREAK_WARNING_ID = 1002; // stable ID for one-time streak-at-risk notification

/** localStorage key marking that a given day's streak warning is already resolved. */
function streakWarnKey(date: Date = new Date()): string {
  return `streak-warned-${new Intl.DateTimeFormat("en-CA").format(date)}`;
}

// ── Type-aware streak warning copy ───────────────────────────────────────
// The 8pm streak warning is the only layer of the loss-aversion stack that
// reaches a user who never opens the app that day, so its framing carries
// the most weight. A single generic push wastes that: a Nine disengages
// from urgency and an Eight disengages from being nudged, so the same
// sentence that saves a Three's streak costs a Nine's. Motivations follow
// Riso-Hudson: 1 correctness, 2 connection, 3 achievement, 4 depth,
// 5 autonomy, 6 security, 7 possibility, 8 control, 9 ease. Copy mirrors
// TYPE_SAVER_COPY in StreakSaver so the push and the modal speak in one voice.

interface StreakWarningCopy {
  title: string;
  body: (streakCount: number) => string;
}

const TYPE_STREAK_WARNING: Record<number, StreakWarningCopy> = {
  1: {
    title: "Your streak record",
    body: (n) => `Your ${n} day streak ends at midnight. One lesson keeps the record intact.`,
  },
  2: {
    title: "Your practice is waiting",
    body: (n) => `Your ${n} day streak ends at midnight. One lesson, for you, not for anyone else.`,
  },
  3: {
    title: "Your run is still alive",
    body: (n) => `Your ${n} day streak ends at midnight. One lesson keeps the run going.`,
  },
  4: {
    title: "The thread still holds",
    body: (n) => `Your ${n} day streak ends at midnight. One lesson and what you built stays whole.`,
  },
  5: {
    title: "Streak resets at midnight",
    body: (n) => `Your ${n} day streak resets at midnight unless you complete a lesson. Your call.`,
  },
  6: {
    title: "Your streak tonight",
    body: (n) => `Your ${n} day streak ends at midnight. One lesson and you are covered.`,
  },
  7: {
    title: "Still time tonight",
    body: (n) => `Your ${n} day streak ends at midnight. One quick lesson and you are back in it.`,
  },
  8: {
    title: "Streak ends at midnight",
    body: (n) => `Your ${n} day streak ends at midnight unless you finish a lesson. Your call.`,
  },
  9: {
    title: "Your streak is still here",
    body: (n) => `Your ${n} day streak ends at midnight. One small lesson keeps it going. No pressure.`,
  },
};

const DEFAULT_STREAK_WARNING: StreakWarningCopy = {
  title: "Streak at risk",
  body: (n) => `Your ${n} day streak is at risk tonight. Keep it going.`,
};

/**
 * Build the 8pm streak warning title + body for the user's Enneagram type,
 * falling back to neutral copy when no type is set.
 */
export function buildStreakWarningNotification(
  streakCount: number,
  enneagramType?: number | null
): { title: string; body: string } {
  const copy =
    (enneagramType ? TYPE_STREAK_WARNING[enneagramType] : undefined) ?? DEFAULT_STREAK_WARNING;
  return { title: copy.title, body: copy.body(streakCount) };
}

/**
 * Schedule a one-time local notification for 8:00 PM today warning the user
 * their streak is at risk. Safe to call multiple times — deduplicated via
 * localStorage key `streak-warned-${today}` so only fires once per day.
 *
 * Call this as soon as the app opens with an unmet daily goal, not only in
 * the evening: the whole point of the push is to reach a user who has already
 * closed the app for the day. Cancel it with cancelStreakWarning() once the
 * daily goal is met, so nobody gets a false alarm.
 *
 * Only schedules if it is currently before 8:00 PM local time.
 */
export async function scheduleStreakWarning(
  streakCount: number,
  enneagramType?: number | null
): Promise<boolean> {
  if (!isNative()) return false;
  // Deduplicate: only warn once per calendar day
  const warnKey = streakWarnKey();
  try {
    if (typeof window !== "undefined" && localStorage.getItem(warnKey)) return false;
  } catch {
    return false;
  }
  // Only schedule if it is before 8pm
  if (new Date().getHours() >= 20) return false;
  try {
    const { LocalNotifications } = await import("@capacitor/local-notifications");
    const perm = await LocalNotifications.checkPermissions();
    if (perm.display !== "granted") {
      const req = await LocalNotifications.requestPermissions();
      if (req.display !== "granted") return false;
    }
    // Cancel any previous streak warning before scheduling a fresh one
    await LocalNotifications.cancel({ notifications: [{ id: STREAK_WARNING_ID }] });
    const warning = buildStreakWarningNotification(streakCount, enneagramType);
    // Fire at 8:00 PM today
    const fireAt = new Date();
    fireAt.setHours(20, 0, 0, 0);
    await LocalNotifications.schedule({
      notifications: [
        {
          id: STREAK_WARNING_ID,
          title: warning.title,
          body: warning.body,
          schedule: { at: fireAt, allowWhileIdle: true },
          smallIcon: "ic_stat_icon_config_sample",
          iconColor: "#F59E0B",
        },
      ],
    });
    localStorage.setItem(warnKey, "1");
    return true;
  } catch {
    return false;
  }
}

/**
 * Schedule tomorrow's 8:00 PM streak-at-risk warning ahead of time.
 *
 * scheduleStreakWarning() can only reach a user who opens the app that day —
 * which is never the user about to churn. Call this the moment today's goal is
 * met so the warning for the next day is already sitting on the device: a user
 * who does not open the app at all tomorrow still hears that their streak ends
 * tonight. Uses the same notification ID as today's warning, so
 * cancelStreakWarning() clears it when tomorrow's goal is met.
 */
export async function scheduleTomorrowStreakWarning(
  streakCount: number,
  enneagramType?: number | null
): Promise<boolean> {
  if (!isNative()) return false;
  if (streakCount <= 0) return false;
  const fireAt = new Date();
  fireAt.setDate(fireAt.getDate() + 1);
  fireAt.setHours(20, 0, 0, 0);
  const warnKey = streakWarnKey(fireAt);
  try {
    if (typeof window !== "undefined" && localStorage.getItem(warnKey)) return false;
  } catch {
    return false;
  }
  try {
    const { LocalNotifications } = await import("@capacitor/local-notifications");
    const perm = await LocalNotifications.checkPermissions();
    if (perm.display !== "granted") return false;
    await LocalNotifications.cancel({ notifications: [{ id: STREAK_WARNING_ID }] });
    const warning = buildStreakWarningNotification(streakCount, enneagramType);
    await LocalNotifications.schedule({
      notifications: [
        {
          id: STREAK_WARNING_ID,
          title: warning.title,
          body: warning.body,
          schedule: { at: fireAt, allowWhileIdle: true },
          smallIcon: "ic_stat_icon_config_sample",
          iconColor: "#F59E0B",
        },
      ],
    });
    // Mark tomorrow resolved so the next app open does not reschedule over it.
    localStorage.setItem(warnKey, "1");
    return true;
  } catch {
    return false;
  }
}

/**
 * Cancel today's pending streak-at-risk notification and mark the day resolved
 * so it cannot be rescheduled. Call this the moment the daily goal is met —
 * a warning that fires after the user has already practiced trains them to
 * ignore the notification that matters most.
 */
export async function cancelStreakWarning(): Promise<void> {
  try {
    if (typeof window !== "undefined") localStorage.setItem(streakWarnKey(), "1");
  } catch {}
  if (!isNative()) return;
  try {
    const { LocalNotifications } = await import("@capacitor/local-notifications");
    await LocalNotifications.cancel({ notifications: [{ id: STREAK_WARNING_ID }] });
  } catch {}
}

/** Cancel the scheduled daily reminder. */
export async function cancelDailyReminder(): Promise<void> {
  if (!isNative()) return;
  try {
    const { LocalNotifications } = await import("@capacitor/local-notifications");
    await LocalNotifications.cancel({ notifications: [{ id: NOTIFICATION_ID }] });
  } catch {}
}

/**
 * Map a reminder time preset to an hour value (in the user's local time).
 */
export function hourForTimePreset(preset: "morning" | "afternoon" | "evening"): number {
  switch (preset) {
    case "morning":
      return 8;
    case "afternoon":
      return 13;
    case "evening":
      return 19;
    default:
      return 9;
  }
}

// ── Type-Aware + Anchor-Aware Notification Copy ──────────────────────────
// Pulls from implementation intention anchor (Gollwitzer 1999) and
// Enneagram type for personalized, earned notification content.
// Pielot et al. 2017: rich/contextual push has 3x engagement over generic.

import { getImplementationIntent } from "@/lib/fresh-start";

const TYPE_NOTIFICATION_BODIES: Record<number, string> = {
  1: "A small act of self-honesty. 60 seconds.",
  2: "A moment just for you, nothing to give back.",
  3: "Pause the performance. Notice what's underneath.",
  4: "Ordinary is not a failure of depth. One check-in.",
  5: "60 seconds of noticing. Minimal, focused, no fluff.",
  6: "Same place, same time. Your practice is steady.",
  7: "One minute. Stay with it. The depth is here.",
  8: "Your call. 60 seconds of honest self-observation.",
  9: "Just one thing. No decisions, no pressure.",
};

/**
 * Build a personalized notification title + body based on the user's type
 * and their stored implementation intention anchor.
 */
export function buildPersonalizedNotification(enneagramType?: number | null): { title: string; body: string } {
  const intent = getImplementationIntent();
  const chibiName: string | null = typeof window !== "undefined" ? localStorage.getItem("psyche-chibi-name") : null;

  const title = intent
    ? `It's ${intent.label.toLowerCase()} time`
    : chibiName
      ? `${chibiName} is waiting`
      : "Your daily check-in";

  const body: string = (enneagramType ? TYPE_NOTIFICATION_BODIES[enneagramType] : undefined)
    ?? "Your daily check-in is ready. 60 seconds of noticing.";

  return { title, body };
}
