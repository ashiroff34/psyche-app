import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Welcome email (Day 0) — character-led, zero ask.
// "Your chibi just moved in."
//
// Day 3 and Day 7 drip follow as separate API endpoints to keep routing clean
// and allow each to be triggered independently (by cron or edge function).

export async function POST(req: NextRequest) {
  try {
    const key = process.env.RESEND_API_KEY;
    if (!key) return NextResponse.json({ error: "Resend not configured" }, { status: 503 });

    const { email, displayName, enneagramType, chibiName } = (await req.json()) as {
      email: string;
      displayName?: string;
      enneagramType?: number;
      chibiName?: string;
    };

    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const resend = new Resend(key);
    const name = displayName ?? "friend";
    const chibi = chibiName ?? "your chibi";
    const typeLabel = enneagramType ? `Type ${enneagramType}` : "your type";

    const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0f0a1e;color:white;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:480px;margin:0 auto;padding:40px 24px;">
  <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#a78bfa;margin-bottom:8px;">Thyself</p>
  <h1 style="font-size:28px;font-weight:bold;margin:0 0 16px;color:white;">${chibi} just moved in.</h1>
  <p style="font-size:15px;color:rgba(255,255,255,0.75);line-height:1.6;margin-bottom:24px;">
    Welcome, ${name}. You've identified as ${typeLabel}, and ${chibi} is settling into your phone. They'll grow as you grow.
  </p>
  <p style="font-size:15px;color:rgba(255,255,255,0.75);line-height:1.6;margin-bottom:24px;">
    Tomorrow, try opening Thyself for just 60 seconds. That's the tiny behavior that builds the habit.
  </p>
  <a href="https://psyche-app-two.vercel.app/daily" style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#8b5cf6,#d946ef);color:white;border-radius:16px;text-decoration:none;font-weight:bold;font-size:14px;">
    Open your practice
  </a>
  <p style="font-size:11px;color:rgba(255,255,255,0.3);margin-top:40px;line-height:1.5;">
    You're receiving this because you signed up on Thyself. Your personality data stays on your device, not in our database.
    <br><a href="https://psyche-app-two.vercel.app/settings" style="color:rgba(255,255,255,0.4);">Unsubscribe</a>
  </p>
</div>
</body></html>`;

    const result = await resend.emails.send({
      from: "Thyself <hello@thyself.app>",
      to: email,
      subject: `${chibi} just moved in`,
      html,
    });

    return NextResponse.json({ success: true, id: result.data?.id });
  } catch (err) {
    console.error("[send-welcome]", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
