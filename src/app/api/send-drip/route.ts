import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Drip emails (Day 3 + Day 7 + Day 14 + Day 30)
//
// Day 3: "What your Type [X] looks like under stress" — Zeigarnik cliffhanger.
// Day 7: "The one question Type [X]s avoid" — deeper parasocial hook.
// Day 14: Growth edge teaser — Shadow Dialogue, Predictive Self, Blind Spot Radar.
// Day 30: Celebration — 30 days of self-knowledge, share your identity card.
//
// Called by a cron or edge function with { email, day, enneagramType }.
// Day 30 uses a universal subject instead of per-type subjects.

const DAY_3_CONTENT: Record<number, { subject: string; hook: string }> = {
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

const DAY_14_CONTENT: Record<number, { subject: string; hook: string }> = {
  1: { subject: "Your growth edge as a Type 1", hook: "Growth for a 1 isn't about being less disciplined — it's about letting the standard shift. Your growth dashboard tracks the edge between your inner critic and your actual self, using tools like Shadow Dialogue, Predictive Self, and Blind Spot Radar." },
  2: { subject: "The thing Type 2s never ask for", hook: "Growth for a 2 isn't about giving less — it's about wanting something for yourself without guilt. Your growth dashboard maps the gap between what you offer and what you swallow, using tools like Shadow Dialogue, Predictive Self, and Blind Spot Radar." },
  3: { subject: "What happens when Type 3 stops performing", hook: "Growth for a 3 isn't about achieving less — it's about existing without an audience. Your growth dashboard reveals the space between your image and your interior, using tools like Shadow Dialogue, Predictive Self, and Blind Spot Radar." },
  4: { subject: "The ordinary depth Type 4s overlook", hook: "Growth for a 4 isn't about feeling less — it's about finding depth in the ordinary. Your growth dashboard tracks the edge between longing and presence, using tools like Shadow Dialogue, Predictive Self, and Blind Spot Radar." },
  5: { subject: "The step Type 5 keeps postponing", hook: "Growth for a 5 isn't about knowing more — it's about stepping into the room before you feel ready. Your growth dashboard maps the gap between observation and participation, using tools like Shadow Dialogue, Predictive Self, and Blind Spot Radar." },
  6: { subject: "What Type 6 looks like when they trust themselves", hook: "Growth for a 6 isn't about being less cautious — it's about trusting the voice that already knows. Your growth dashboard tracks the edge between scanning and settling, using tools like Shadow Dialogue, Predictive Self, and Blind Spot Radar." },
  7: { subject: "What Type 7 finds when they stay", hook: "Growth for a 7 isn't about wanting less — it's about staying with one thing long enough for it to get deep. Your growth dashboard maps the space between stimulation and stillness, using tools like Shadow Dialogue, Predictive Self, and Blind Spot Radar." },
  8: { subject: "The door behind Type 8's armor", hook: "Growth for an 8 isn't about being less strong — it's about letting someone see the part you protect. Your growth dashboard tracks the edge between control and vulnerability, using tools like Shadow Dialogue, Predictive Self, and Blind Spot Radar." },
  9: { subject: "What happens when Type 9 speaks up", hook: "Growth for a 9 isn't about being louder — it's about wanting something enough to risk discomfort. Your growth dashboard maps the gap between merging and asserting, using tools like Shadow Dialogue, Predictive Self, and Blind Spot Radar." },
};

const DAY_7_CONTENT: Record<number, { subject: string; hook: string }> = {
  1: { subject: "The one question Type 1s avoid", hook: "Am I angry? Really angry? Not frustrated or disappointed. Angry. Most 1s go their whole lives without admitting the answer." },
  2: { subject: "The one question Type 2s avoid", hook: "What do I actually need? Not what others need from me. Not what would make me lovable. What do I need, right now, for myself alone?" },
  3: { subject: "The one question Type 3s avoid", hook: "Who am I when no one is watching? Not the version for LinkedIn, for the partner, for the family. Just the one in the room alone." },
  4: { subject: "The one question Type 4s avoid", hook: "What if I'm not as different as I think? What if the ordinariness I fear is actually where connection lives?" },
  5: { subject: "The one question Type 5s avoid", hook: "Do I actually know enough to act, or am I using 'I need more data' to avoid the vulnerability of being wrong?" },
  6: { subject: "The one question Type 6s avoid", hook: "What if I already know the answer, and I'm scanning for authorities because trusting myself feels like a free fall?" },
  7: { subject: "The one question Type 7s avoid", hook: "What am I running from? Not what I'm running toward, I know that list. What's behind me?" },
  8: { subject: "The one question Type 8s avoid", hook: "What would happen if I was soft in front of someone? Not strong-but-vulnerable. Just soft. No armor." },
  9: { subject: "The one question Type 9s avoid", hook: "What do I actually want? Not what would keep the peace. Not what's easy. What do I want?" },
};

export async function POST(req: NextRequest) {
  try {
    const key = process.env.RESEND_API_KEY;
    if (!key) return NextResponse.json({ error: "Resend not configured" }, { status: 503 });

    const { email, day, enneagramType, displayName, chibiName } = (await req.json()) as {
      email: string;
      day: 3 | 7 | 14 | 30;
      enneagramType: number;
      displayName?: string;
      chibiName?: string;
    };

    if (!email || !enneagramType) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const contentMap: Record<number, Record<number, { subject: string; hook: string }>> = {
      3: DAY_3_CONTENT,
      7: DAY_7_CONTENT,
      14: DAY_14_CONTENT,
    };

    // Day 30 uses a universal subject + celebration body
    if (day === 30) {
      const resend = new Resend(key);
      const name = displayName ?? "friend";
      const chibi = chibiName ?? "your chibi";
      const subject = "30 days of self-knowledge";

      const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0f0a1e;color:white;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:480px;margin:0 auto;padding:40px 24px;">
  <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#a78bfa;margin-bottom:8px;">Thyself · Day 30</p>
  <h1 style="font-size:24px;font-weight:bold;margin:0 0 16px;color:white;">30 days of self-knowledge</h1>
  <p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.7;margin-bottom:24px;">
    You've been practicing self-knowledge for a month. That puts you ahead of 95% of people who take a personality quiz and never look at it again.
  </p>
  <p style="font-size:14px;color:rgba(255,255,255,0.6);line-height:1.6;margin-bottom:24px;">
    ${chibi} has been with you through all of it. Share your identity card and let someone else start their journey.
  </p>
  <a href="https://psyche-app-two.vercel.app/identity" style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#8b5cf6,#d946ef);color:white;border-radius:16px;text-decoration:none;font-weight:bold;font-size:14px;">
    Share your identity card →
  </a>
  <p style="font-size:11px;color:rgba(255,255,255,0.3);margin-top:40px;line-height:1.5;">
    You're receiving this because you signed up on Thyself.
    <br><a href="https://psyche-app-two.vercel.app/settings" style="color:rgba(255,255,255,0.4);">Unsubscribe</a>
  </p>
</div>
</body></html>`;

      const result = await resend.emails.send({
        from: "Thyself <hello@thyself.app>",
        to: email,
        subject,
        html,
      });

      return NextResponse.json({ success: true, id: result.data?.id });
    }

    const content = contentMap[day]?.[enneagramType];
    if (!content) return NextResponse.json({ error: "No content for type" }, { status: 400 });

    const resend = new Resend(key);
    const name = displayName ?? "friend";
    const chibi = chibiName ?? "your chibi";

    const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0f0a1e;color:white;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:480px;margin:0 auto;padding:40px 24px;">
  <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#a78bfa;margin-bottom:8px;">Thyself · Day ${day}</p>
  <h1 style="font-size:24px;font-weight:bold;margin:0 0 16px;color:white;">${content.subject}</h1>
  <p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.7;margin-bottom:24px;">
    ${content.hook}
  </p>
  <p style="font-size:14px;color:rgba(255,255,255,0.6);line-height:1.6;margin-bottom:24px;">
    ${day === 14
      ? `Your growth dashboard is waiting. See what Shadow Dialogue, Predictive Self, and Blind Spot Radar have uncovered about your edge.`
      : `${chibi} noticed something about this in your profile. Open your practice to see the full picture.`}
  </p>
  <a href="${day === 14 ? "https://psyche-app-two.vercel.app/growth" : "https://psyche-app-two.vercel.app/daily"}" style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#8b5cf6,#d946ef);color:white;border-radius:16px;text-decoration:none;font-weight:bold;font-size:14px;">
    ${day === 14 ? "See your growth edge →" : `See what ${chibi} found`}
  </a>
  <p style="font-size:11px;color:rgba(255,255,255,0.3);margin-top:40px;line-height:1.5;">
    You're receiving this because you signed up on Thyself.
    <br><a href="https://psyche-app-two.vercel.app/settings" style="color:rgba(255,255,255,0.4);">Unsubscribe</a>
  </p>
</div>
</body></html>`;

    const result = await resend.emails.send({
      from: "Thyself <hello@thyself.app>",
      to: email,
      subject: content.subject,
      html,
    });

    return NextResponse.json({ success: true, id: result.data?.id });
  } catch (err) {
    console.error("[send-drip]", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
