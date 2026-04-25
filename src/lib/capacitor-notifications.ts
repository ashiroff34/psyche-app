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

/**
 * Schedule a one-time local notification for 8:00 PM today warning the user
 * their streak is at risk. Safe to call multiple times — deduplicated via
 * localStorage key `streak-warned-${today}` so only fires once per day.
 *
 * Only schedules if it is currently before 8:00 PM local time.
 */
export async function scheduleStreakWarning(streakCount: number): Promise<boolean> {
  if (!isNative()) return false;
  // Deduplicate: only warn once per calendar day
  const today = new Intl.DateTimeFormat("en-CA").format(new Date());
  const warnKey = `streak-warned-${today}`;
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
    // Fire at 8:00 PM today
    const fireAt = new Date();
    fireAt.setHours(20, 0, 0, 0);
    await LocalNotifications.schedule({
      notifications: [
        {
          id: STREAK_WARNING_ID,
          title: "Streak at risk",
          body: `Your ${streakCount}-day streak is at risk tonight. Keep it going.`,
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
