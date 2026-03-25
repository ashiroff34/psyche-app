import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

/**
 * POST /api/subscribe-reminders
 * Saves reminder subscription preferences.
 * Accepts: { email: string, time: "morning" | "afternoon" | "evening", enabled: boolean }
 *
 * For now, stores subscriptions in a local JSON file.
 * In production, this would connect to a database + cron scheduler.
 */

const REMINDERS_FILE = path.join(process.cwd(), "reminder-subscriptions.json");

interface ReminderSubscription {
  email: string;
  time: "morning" | "afternoon" | "evening";
  enabled: boolean;
  updatedAt: string;
}

async function getSubscriptions(): Promise<ReminderSubscription[]> {
  try {
    const data = await fs.readFile(REMINDERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveSubscriptions(subs: ReminderSubscription[]) {
  await fs.writeFile(REMINDERS_FILE, JSON.stringify(subs, null, 2));
}

const VALID_TIMES = ["morning", "afternoon", "evening"];

export async function POST(req: NextRequest) {
  try {
    const { email, time, enabled } = await req.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate time
    if (!VALID_TIMES.includes(time)) {
      return new Response(
        JSON.stringify({ error: "Invalid time. Must be morning, afternoon, or evening" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate enabled
    if (typeof enabled !== "boolean") {
      return new Response(
        JSON.stringify({ error: "enabled must be a boolean" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const subs = await getSubscriptions();
    const existing = subs.find(
      (s) => s.email.toLowerCase() === email.toLowerCase()
    );

    if (existing) {
      existing.time = time;
      existing.enabled = enabled;
      existing.updatedAt = new Date().toISOString();
    } else {
      subs.push({
        email: email.toLowerCase().trim(),
        time,
        enabled,
        updatedAt: new Date().toISOString(),
      });
    }

    await saveSubscriptions(subs);

    console.log(
      `[subscribe-reminders] ${enabled ? "Subscribed" : "Unsubscribed"}: ${email} (${time})`
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: enabled
          ? `Reminder set for ${time}`
          : "Reminders disabled",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Subscribe reminders error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update reminder preferences" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
