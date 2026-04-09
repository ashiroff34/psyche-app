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
