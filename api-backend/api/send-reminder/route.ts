import { NextRequest } from "next/server";

// Dynamic import to avoid build-time module resolution issues
function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Resend } = require("resend");
  return new Resend(process.env.RESEND_API_KEY);
}

/**
 * POST /api/send-reminder
 * Sends a daily practice reminder email using Resend.
 * Body: { email: string, displayName?: string }
 */
export async function POST(req: NextRequest) {
  try {
    const { email, displayName } = await req.json();

    const resend = getResend();
    if (!resend) {
      return new Response(
        JSON.stringify({ error: "Email service not configured. Add RESEND_API_KEY to .env.local" }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const name = displayName || "there";
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://thyself.app";

    const { data, error } = await resend.emails.send({
      from: "Thyself <onboarding@resend.dev>",
      to: email,
      subject: "Your daily practice awaits",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 480px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0ea5e9, #6366f1); padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Thyself</h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">Know thyself. Grow thyself.</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 32px 24px;">
              <p style="margin: 0 0 16px; color: #334155; font-size: 16px; line-height: 1.6;">
                Hey ${name},
              </p>
              <p style="margin: 0 0 24px; color: #475569; font-size: 15px; line-height: 1.6;">
                Your daily practice is waiting for you. A few minutes of self-reflection can transform how you understand yourself and navigate the world around you.
              </p>
              <p style="margin: 0 0 32px; color: #475569; font-size: 15px; line-height: 1.6;">
                Whether it is a quick journaling prompt, exploring your type dynamics, or checking in with your inner landscape, every small step builds deeper self-awareness.
              </p>
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${appUrl}/daily" style="display: inline-block; background: linear-gradient(135deg, #0ea5e9, #6366f1); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-size: 15px; font-weight: 600; letter-spacing: 0.2px;">
                      Start Today's Practice
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 24px; border-top: 1px solid #f1f5f9; text-align: center;">
              <p style="margin: 0; color: #94a3b8; font-size: 12px; line-height: 1.5;">
                You are receiving this because you enabled daily reminders in Thyself.
                <br>
                <a href="${appUrl}/settings" style="color: #0ea5e9; text-decoration: none;">Manage preferences</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim(),
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, messageId: data?.id }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Send reminder error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
