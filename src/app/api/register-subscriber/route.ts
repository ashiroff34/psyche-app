import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * POST /api/register-subscriber
 *
 * Stores a new subscriber in the Resend Audience so the daily drip cron
 * can find them on day 3 / 7 / 14 / 30. Also sends the welcome email.
 *
 * Body: { email, enneagramType, displayName?, chibiName? }
 * Env:  RESEND_API_KEY, RESEND_AUDIENCE_ID
 */
export async function POST(req: NextRequest) {
  try {
    const key = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!key) {
      console.warn("[register-subscriber] RESEND_API_KEY not set");
      return NextResponse.json({ ok: false, reason: "not configured" });
    }

    const { email, enneagramType, displayName, chibiName } = (await req.json()) as {
      email: string;
      enneagramType?: number;
      displayName?: string;
      chibiName?: string;
    };

    if (!email) return NextResponse.json({ ok: false, reason: "email required" }, { status: 400 });

    const resend = new Resend(key);
    const signupDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    // ── Add to Resend Audience ──────────────────────────────────────────────
    if (audienceId) {
      await resend.contacts.create({
        audienceId,
        email,
        firstName: displayName ?? "",
        unsubscribed: false,
        // Resend contacts support custom data via their API
        // We encode drip metadata in firstName/lastName fields since
        // the Contacts v1 API doesn't have arbitrary custom fields.
        // Format: "Type{N}|{chibiName}|{signupDate}"
        lastName: `${enneagramType ?? 0}|${chibiName ?? ""}|${signupDate}`,
      });
    } else {
      console.warn("[register-subscriber] RESEND_AUDIENCE_ID not set — skipping contact storage");
    }

    // ── Send welcome email ─────────────────────────────────────────────────
    const name = displayName ?? "friend";
    const chibi = chibiName ?? "your chibi";
    const typeLabel = enneagramType ? `Type ${enneagramType}` : "your type";

    const html = buildWelcomeHtml({ name, chibi, typeLabel });

    const { data, error } = await resend.emails.send({
      from: "Thyself <hello@thyself.app>",
      to: email,
      subject: `${chibi} just moved in`,
      html,
    });

    if (error) {
      console.error("[register-subscriber] send error:", error);
      return NextResponse.json({ ok: false, error: error.message });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("[register-subscriber]", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

function buildWelcomeHtml({ name, chibi, typeLabel }: { name: string; chibi: string; typeLabel: string }) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f0a1e;color:white;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:480px;margin:0 auto;padding:40px 24px;">
  <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#a78bfa;margin-bottom:8px;">Thyself</p>
  <h1 style="font-size:28px;font-weight:bold;margin:0 0 16px;color:white;">${chibi} just moved in.</h1>
  <p style="font-size:15px;color:rgba(255,255,255,0.75);line-height:1.6;margin-bottom:24px;">
    Welcome, ${name}. You've identified as ${typeLabel}, and ${chibi} is settling into your phone. They'll grow as you grow.
  </p>
  <p style="font-size:15px;color:rgba(255,255,255,0.75);line-height:1.6;margin-bottom:32px;">
    Tomorrow, open Thyself for just 60 seconds. That's the tiny habit that changes things.
  </p>
  <a href="https://psyche-app-two.vercel.app/daily"
     style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#8b5cf6,#d946ef);color:white;border-radius:16px;text-decoration:none;font-weight:bold;font-size:14px;">
    Open your practice →
  </a>
  <p style="font-size:11px;color:rgba(255,255,255,0.3);margin-top:48px;line-height:1.5;">
    You're receiving this because you signed up on Thyself. Your personality data stays on your device.<br>
    <a href="https://psyche-app-two.vercel.app/settings" style="color:rgba(255,255,255,0.4);">Unsubscribe</a>
  </p>
</div>
</body></html>`;
}
