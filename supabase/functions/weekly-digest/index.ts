// Weekly Digest Email — Supabase Edge Function
//
// Runs once a week (via pg_cron or Supabase scheduled trigger) and sends
// a type-aware weekly reflection email to every user who opted in.
//
// ENV VARS REQUIRED (set in Supabase dashboard → Edge Functions → Secrets):
//   RESEND_API_KEY      — from https://resend.com/api-keys
//   RESEND_FROM_EMAIL   — verified sending domain (e.g. "reflections@thyself.app")
//   SUPABASE_URL        — auto-provided
//   SUPABASE_SERVICE_ROLE_KEY — auto-provided
//
// DEPLOY:
//   supabase functions deploy weekly-digest
//
// SCHEDULE (run from psql or Supabase dashboard):
//   SELECT cron.schedule(
//     'weekly-digest',
//     '0 14 * * 0',  -- Every Sunday at 2pm UTC
//     $$ SELECT net.http_post(
//       'https://<project>.supabase.co/functions/v1/weekly-digest',
//       '{}'::jsonb,
//       '{"Authorization": "Bearer <anon-key>"}'::jsonb
//     ); $$
//   );

// @ts-expect-error — Deno runtime types, not a Node module
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ─── Type-aware email subjects ──────────────────────────────────────────
const SUBJECTS: Record<number, string> = {
  1: "Your week, by the standard",
  2: "Who did you carry this week?",
  3: "The version of you that landed — and the one that didn't",
  4: "The feeling you didn't quite name",
  5: "What you rationed this week",
  6: "What your brain kept checking for",
  7: "What you almost kept running from",
  8: "What you protected this week",
  9: "What got smoothed over",
};

// ─── Weekly reflection prompts per type ─────────────────────────────────
const REFLECTIONS: Record<number, string> = {
  1: "This past week, where did you notice your inner critic running louder than it needed to? What did it protect you from — and what did it cost?",
  2: "This past week, whose needs did you read before reading your own? Who showed up for you — really — and did you let them?",
  3: "This past week, what did you perform for people whose approval you don't actually need? What would you have done if no one was watching?",
  4: "This past week, what did you long for that was already in front of you? What did you turn into an aesthetic that didn't need to be beautiful?",
  5: "This past week, what did you retreat from that was safer than you expected? What did you hold back that could have been shared without cost?",
  6: "This past week, what did your mind rehearse that never happened? Who did you trust more than your gut said you should?",
  7: "This past week, what did you keep moving past that wanted you to stay? What feeling did the next plan help you outrun?",
  8: "This past week, where did you bring more force than the moment needed? Where did you let softness show — and what happened?",
  9: "This past week, what did you not say out loud? What did you want that you almost forgot you wanted?",
};

// ─── Email HTML template ────────────────────────────────────────────────
function buildEmailHtml(type: number, displayName: string | null): string {
  const subject = SUBJECTS[type] ?? "Your weekly reflection";
  const prompt = REFLECTIONS[type] ?? REFLECTIONS[5];
  const greeting = displayName ? `Hey ${displayName},` : "Hey,";

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#0f0a1e;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#0f0a1e;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;background:#1a1130;border-radius:24px;padding:32px;border:1px solid rgba(139,92,246,0.15);">
          <tr>
            <td>
              <p style="color:#a78bfa;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:0.15em;margin:0 0 12px 0;">
                Thyself · Your Sunday reflection
              </p>
              <h1 style="color:rgba(255,255,255,0.95);font-family:Georgia,serif;font-size:26px;line-height:1.3;margin:0 0 16px 0;">
                ${subject}
              </h1>
              <p style="color:rgba(255,255,255,0.7);font-size:15px;line-height:1.6;margin:0 0 20px 0;">
                ${greeting}
              </p>
              <p style="color:rgba(255,255,255,0.8);font-size:16px;line-height:1.65;font-family:Georgia,serif;font-style:italic;margin:0 0 24px 0;padding:20px;background:rgba(139,92,246,0.08);border-left:3px solid #8b5cf6;border-radius:4px;">
                ${prompt}
              </p>
              <p style="color:rgba(255,255,255,0.55);font-size:14px;line-height:1.6;margin:0 0 24px 0;">
                You don&rsquo;t have to answer it in writing. Just sit with it for a moment. That&rsquo;s the practice.
              </p>
              <div style="text-align:center;margin:32px 0 24px 0;">
                <a href="https://psyche-app-two.vercel.app/journal" style="display:inline-block;background:linear-gradient(135deg,#8b5cf6,#d946ef);color:#fff;text-decoration:none;font-size:14px;font-weight:bold;padding:14px 28px;border-radius:14px;">
                  Write in your journal →
                </a>
              </div>
              <p style="color:rgba(255,255,255,0.35);font-size:12px;line-height:1.6;text-align:center;margin:32px 0 0 0;padding-top:20px;border-top:1px solid rgba(255,255,255,0.08);">
                You're getting this because you opted in to weekly reflections.<br/>
                <a href="https://psyche-app-two.vercel.app/settings" style="color:rgba(167,139,250,0.5);">Manage preferences</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Supabase Edge Function handler ─────────────────────────────────────
// @ts-expect-error — Deno runtime
Deno.serve(async (_req: Request) => {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const RESEND_FROM = Deno.env.get("RESEND_FROM_EMAIL") ?? "reflections@thyself.app";
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!RESEND_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return new Response(
      JSON.stringify({ error: "Missing env vars (RESEND_API_KEY, SUPABASE_URL, or SUPABASE_SERVICE_ROLE_KEY)" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  // Fetch users who opted in for weekly digest
  // Expects a `profiles` table with columns: email, enneagram_type, display_name, weekly_digest_opt_in
  const { data: users, error } = await supabase
    .from("profiles")
    .select("email, enneagram_type, display_name")
    .eq("weekly_digest_opt_in", true)
    .not("email", "is", null)
    .not("enneagram_type", "is", null);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  if (!users || users.length === 0) {
    return new Response(JSON.stringify({ sent: 0, message: "No opt-in users found" }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // Send one email per user via Resend
  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const user of users) {
    const type = user.enneagram_type as number;
    const subject = SUBJECTS[type] ?? "Your weekly reflection";
    const html = buildEmailHtml(type, user.display_name ?? null);

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `Thyself <${RESEND_FROM}>`,
          to: [user.email],
          subject,
          html,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        errors.push(`${user.email}: ${res.status} ${body}`);
        failed++;
      } else {
        sent++;
      }
    } catch (e) {
      errors.push(`${user.email}: ${(e as Error).message}`);
      failed++;
    }
  }

  return new Response(
    JSON.stringify({ sent, failed, errors: errors.slice(0, 10) }),
    { headers: { "Content-Type": "application/json" } }
  );
});
