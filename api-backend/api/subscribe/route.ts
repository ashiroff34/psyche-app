import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

/**
 * POST /api/subscribe
 * Collects email addresses for daily insight emails.
 * Stores them in a JSON file (subscribers.json) in the project root.
 * In production, this would connect to a proper email service (Resend, SendGrid, etc.)
 */

const SUBSCRIBERS_FILE = path.join(process.cwd(), "subscribers.json");

interface Subscriber {
  email: string;
  name?: string;
  enneagramType?: number;
  cognitiveType?: string;
  subscribedAt: string;
  active: boolean;
}

async function getSubscribers(): Promise<Subscriber[]> {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveSubscribers(subs: Subscriber[]) {
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subs, null, 2));
}

export async function POST(req: NextRequest) {
  try {
    const { email, name, enneagramType, cognitiveType } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const subs = await getSubscribers();

    // Check if already subscribed
    const existing = subs.find((s) => s.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      // Reactivate if previously unsubscribed
      existing.active = true;
      if (name) existing.name = name;
      if (enneagramType) existing.enneagramType = enneagramType;
      if (cognitiveType) existing.cognitiveType = cognitiveType;
    } else {
      subs.push({
        email: email.toLowerCase().trim(),
        name: name || undefined,
        enneagramType,
        cognitiveType,
        subscribedAt: new Date().toISOString(),
        active: true,
      });
    }

    await saveSubscribers(subs);

    return new Response(
      JSON.stringify({ success: true, message: "Subscribed to daily insights!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Subscribe error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to subscribe" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
