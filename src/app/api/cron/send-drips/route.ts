import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * GET /api/cron/send-drips
 *
 * Vercel Cron — runs daily at 10:00 UTC.
 * Fetches all subscribers from the Resend Audience, finds who signed up
 * exactly 3 / 7 / 14 / 30 days ago, and sends the appropriate drip.
 *
 * Secured with CRON_SECRET so only Vercel's cron runner can call it.
 * Env: RESEND_API_KEY, RESEND_AUDIENCE_ID, CRON_SECRET
 */

const DRIP_DAYS = [3, 7, 14, 30] as const;

// ── Drip content (mirrors /api/send-drip) ──────────────────────────────────

const DAY_3: Record<number, { subject: string; hook: string }> = {
  1: { subject: "What Type 1 looks like under stress", hook: "Under stress, the inner critic doesn't get louder, it gets mean. 1s in grip look less like perfectionists and more like the thing they judge: chaotic, impulsive, indulgent." },
  2: { subject: "What Type 2 looks like under stress", hook: "Under stress, the giving inverts. 2s in grip don't help more, they manipulate more. The warmth turns strategic, and the resentment seeps out sideways." },
  3: { subject: "What Type 3 looks like under stress", hook: "Under stress, the achiever doesn't try harder, they detach. 3s in grip withdraw, become apathetic, and secretly feel like frauds." },
  4: { subject: "What Type 4 looks like under stress", hook: "Under stress, the emotional depth collapses into numbness. 4s in grip don't feel more, they feel nothing, and start obsessively doing things to fill the void." },
  5: { subject: "What Type 5 looks like under stress", hook: "Under stress, the thinker doesn't think deeper, they scatter. 5s in grip become impulsive, hyper-stimulated, and unable to focus on the one thing that matters." },
  6: { subject: "What Type 6 looks like under stress", hook: "Under stress, the vigilant mind doesn't get more careful, it freezes. 6s in grip either shut down entirely or charge forward recklessly." },
  7: { subject: "What Type 7 looks like under stress", hook: "Under stress, the optimist doesn't plan more, they criticize more. 7s in grip become perfectionistic, critical, and rigidly focused on what's wrong." },
  8: { subject: "What Type 8 looks like under stress", hook: "Under stress, the challenger doesn't push harder, they withdraw. 8s in grip pull inward, become secretive, and hoard vulnerability like a 5." },
  9: { subject: "What Type 9 looks like under stress", hook: "Under stress, the peacemaker doesn't get calmer, they fragment. 9s in grip become anxious, scattered, and unable to trust their own judgment." },
};

const DAY_7: Record<number, { subject: string; hook: string }> = {
  1: { subject: "The one question Type 1s avoid", hook: "Am I angry? Really angry? Not frustrated or disappointed. Angry. Most 1s go their whole lives without admitting the answer." },
  2: { subject: "The one question Type 2s avoid", hook: "What do I actually need? Not what others need from me. Not what would make me lovable. What do I need, right now, for myself alone?" },
  3: { subject: "The one question Type 3s avoid", hook: "Who am I when no one is watching? Not the version for LinkedIn, for the partner, for the family. Just the one in the room alone." },
  4: { subject: "The one question Type 4s avoid", hook: "What if I'm not as different as I think? What if the ordinariness I fear is actually where connection lives?" },
  5: { subject: "The one question Type 5s avoid", hook: "Do I actually know enough to act, or am I using 'I need more data' to avoid the vulnerability of being wrong?" },
  6: { subject: "The one question Type 6s avoid", hook: "What if I already know the answer, and I'm scanning for authorities because trusting myself feels like a free fall?" },
  7: { subject: "The one question Type 7s avoid", hook: "What am I running from? Not what I'm running toward — I know that list. What's behind me?" },
  8: { subject: "The one question Type 8s avoid", hook: "What would happen if I was soft in front of someone? Not strong-but-vulnerable. Just soft. No armor." },
  9: { subject: "The one question Type 9s avoid", hook: "What do I actually want? Not what would keep the peace. Not what's easy. What do I want?" },
};

const DAY_14: Record<number, { subject: string; hook: string }> = {
  1: { subject: "Your growth edge as a Type 1", hook: "Growth for a 1 isn't about being less disciplined — it's about letting the standard shift. Your growth dashboard tracks the edge between your inner critic and your actual self." },
  2: { subject: "The thing Type 2s never ask for", hook: "Growth for a 2 isn't about giving less — it's about wanting something for yourself without guilt. Your growth dashboard maps the gap between what you offer and what you swallow." },
  3: { subject: "What happens when Type 3 stops performing", hook: "Growth for a 3 isn't about achieving less — it's about existing without an audience. Your growth dashboard reveals the space between your image and your interior." },
  4: { subject: "The ordinary depth Type 4s overlook", hook: "Growth for a 4 isn't about feeling less — it's about finding depth in the ordinary. Your growth dashboard tracks the edge between longing and presence." },
  5: { subject: "The step Type 5 keeps postponing", hook: "Growth for a 5 isn't about knowing more — it's about stepping into the room before you feel ready. Your growth dashboard maps the gap between observation and participation." },
  6: { subject: "What Type 6 looks like when they trust themselves", hook: "Growth for a 6 isn't about being less cautious — it's about trusting the voice that already knows. Your growth dashboard tracks the edge between scanning and settling." },
  7: { subject: "What Type 7 finds when they stay", hook: "Growth for a 7 isn't about wanting less — it's about staying with one thing long enough for it to get deep. Your growth dashboard maps the space between stimulation and stillness." },
  8: { subject: "The door behind Type 8's armor", hook: "Growth for an 8 isn't about being less strong — it's about letting someone see the part you protect. Your growth dashboard tracks the edge between control and vulnerability." },
  9: { subject: "What happens when Type 9 speaks up", hook: "Growth for a 9 isn't about being louder — it's about wanting something enough to risk discomfort. Your growth dashboard maps the gap between merging and asserting." },
};

// ── HTML builder ────────────────────────────────────────────────────────────

function buildDripHtml({
  day,
  name,
  chibi,
  subject,
  hook,
}: {
  day: number;
  name: string;
  chibi: string;
  subject: string;
  hook: string;
}) {
  const cta = day === 14
    ? { label: "See your growth edge →", url: "https://psyche-app-two.vercel.app/growth" }
    : { label: `Open your practice`, url: "https://psyche-app-two.vercel.app/daily" };

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f0a1e;color:white;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:480px;margin:0 auto;padding:40px 24px;">
  <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#a78bfa;margin-bottom:8px;">Thyself · Day ${day}</p>
  <h1 style="font-size:24px;font-weight:bold;margin:0 0 16px;color:white;">${subject}</h1>
  <p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.7;margin-bottom:24px;">${hook}</p>
  <p style="font-size:14px;color:rgba(255,255,255,0.55);line-height:1.6;margin-bottom:32px;">
    ${day === 14
      ? `${chibi} has been watching. Your growth dashboard has more.`
      : `${chibi} noticed something about this. Open your practice to see the full picture.`}
  </p>
  <a href="${cta.url}"
     style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#8b5cf6,#d946ef);color:white;border-radius:16px;text-decoration:none;font-weight:bold;font-size:14px;">
    ${cta.label}
  </a>
  <p style="font-size:11px;color:rgba(255,255,255,0.3);margin-top:48px;line-height:1.5;">
    You're receiving this because you signed up on Thyself.<br>
    <a href="https://psyche-app-two.vercel.app/settings" style="color:rgba(255,255,255,0.4);">Unsubscribe</a>
  </p>
</div>
</body></html>`;
}

function buildDay30Html({ name, chibi }: { name: string; chibi: string }) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f0a1e;color:white;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:480px;margin:0 auto;padding:40px 24px;">
  <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#a78bfa;margin-bottom:8px;">Thyself · Day 30</p>
  <h1 style="font-size:24px;font-weight:bold;margin:0 0 16px;color:white;">30 days of self-knowledge.</h1>
  <p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.7;margin-bottom:24px;">
    You've been practicing self-knowledge for a month, ${name}. That puts you ahead of 95% of people who take a personality test and never look at it again.
  </p>
  <p style="font-size:14px;color:rgba(255,255,255,0.55);line-height:1.6;margin-bottom:32px;">
    ${chibi} has been with you through all of it. Share your identity card and let someone else start their journey.
  </p>
  <a href="https://psyche-app-two.vercel.app/identity"
     style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#8b5cf6,#d946ef);color:white;border-radius:16px;text-decoration:none;font-weight:bold;font-size:14px;">
    Share your identity card →
  </a>
  <p style="font-size:11px;color:rgba(255,255,255,0.3);margin-top:48px;line-height:1.5;">
    You're receiving this because you signed up on Thyself.<br>
    <a href="https://psyche-app-two.vercel.app/settings" style="color:rgba(255,255,255,0.4);">Unsubscribe</a>
  </p>
</div>
</body></html>`;
}

// ── Date helpers ─────────────────────────────────────────────────────────────

function daysAgoDate(n: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  // Verify cron secret
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const key = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!key || !audienceId) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const resend = new Resend(key);

  // Fetch all contacts from the audience
  const { data: contactsData, error: listErr } = await resend.contacts.list({ audienceId });
  if (listErr || !contactsData) {
    console.error("[cron/send-drips] Failed to list contacts:", listErr);
    return NextResponse.json({ error: "Failed to list contacts" }, { status: 500 });
  }

  const contacts = contactsData.data ?? [];
  const targetDates = Object.fromEntries(DRIP_DAYS.map(d => [d, daysAgoDate(d)]));

  let sent = 0;
  const errors: string[] = [];

  for (const contact of contacts) {
    if (contact.unsubscribed) continue;

    // Parse encoded metadata from last_name: "{enneagramType}|{chibiName}|{signupDate}"
    const parts = (contact.last_name ?? "").split("|");
    const enneagramType = parseInt(parts[0] ?? "0", 10);
    const chibiName = parts[1] ?? "";
    const signupDate = parts[2] ?? "";

    if (!signupDate || !enneagramType) continue;

    const name = contact.first_name || "friend";
    const chibi = chibiName || "your chibi";

    for (const day of DRIP_DAYS) {
      if (signupDate !== targetDates[day]) continue;

      try {
        let subject: string;
        let html: string;

        if (day === 30) {
          subject = "30 days of self-knowledge";
          html = buildDay30Html({ name, chibi });
        } else {
          const contentMap = { 3: DAY_3, 7: DAY_7, 14: DAY_14 } as const;
          const content = contentMap[day as 3 | 7 | 14][enneagramType];
          if (!content) continue;
          subject = content.subject;
          html = buildDripHtml({ day, name, chibi, subject, hook: content.hook });
        }

        await resend.emails.send({
          from: "Thyself <hello@thyself.app>",
          to: contact.email,
          subject,
          html,
        });

        sent++;
        console.log(`[cron/send-drips] Day ${day} → ${contact.email}`);
      } catch (err) {
        const msg = `${contact.email} day${day}: ${String(err)}`;
        errors.push(msg);
        console.error("[cron/send-drips]", msg);
      }
    }
  }

  return NextResponse.json({ ok: true, sent, errors });
}
