import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { to, name, streak } = await req.json();

    if (!to) {
      return NextResponse.json(
        { error: "Missing required field: to" },
        { status: 400 }
      );
    }

    const displayName = name || "there";
    const currentStreak = streak || 0;

    const motivationalLine =
      currentStreak >= 30
        ? "You're on an incredible journey of self-discovery. A whole month of consistency!"
        : currentStreak >= 7
          ? "A full week of showing up for yourself. That takes real commitment."
          : currentStreak >= 3
            ? "You're building a powerful habit. Keep the momentum going."
            : "Every day you show up is a step toward deeper self-knowledge.";

    const { data, error } = await resend.emails.send({
      from: "Thyself <onboarding@resend.dev>",
      to: [to],
      subject: currentStreak > 0
        ? `Don't lose your ${currentStreak}-day streak!`
        : "Your daily moment of self-reflection awaits",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#f8fafc; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc; padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:24px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.06);">

          <!-- Header accent bar -->
          <tr>
            <td style="height:6px; background:linear-gradient(90deg, #8B5CF6, #6366F1);"></td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:40px 36px 32px;">

              <p style="margin:0 0 6px; font-size:13px; color:#94a3b8; text-transform:uppercase; letter-spacing:2px; font-weight:600;">
                Thyself App
              </p>

              <h1 style="margin:0 0 24px; font-size:22px; color:#1e293b; font-weight:700; line-height:1.3;">
                Hey ${displayName}, don't break your streak!
              </h1>

              ${currentStreak > 0 ? `
              <!-- Streak counter -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg, #8B5CF610, #6366F108); border:1px solid #8B5CF620; border-radius:16px; margin-bottom:28px;">
                <tr>
                  <td style="padding:28px 24px; text-align:center;">
                    <div style="font-size:56px; font-weight:800; color:#8B5CF6; line-height:1;">
                      ${currentStreak}
                    </div>
                    <div style="font-size:14px; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:1px; margin-top:4px;">
                      day streak
                    </div>
                  </td>
                </tr>
              </table>
              ` : ""}

              <p style="margin:0 0 24px; font-size:15px; color:#64748b; line-height:1.6;">
                ${motivationalLine}
              </p>

              <a href="https://archetypeapp.co" style="display:inline-block; background:#8B5CF6; color:#ffffff; text-decoration:none; font-size:14px; font-weight:600; padding:12px 28px; border-radius:12px;">
                Continue your journey
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:0 36px 32px;">
              <div style="height:1px; background:#e2e8f0; margin-bottom:20px;"></div>
              <p style="margin:0; font-size:11px; color:#94a3b8;">
                <span style="letter-spacing:1px; text-transform:uppercase;">archetypeapp.co</span> &middot;
                <a href="#" style="color:#94a3b8; text-decoration:underline;">Unsubscribe</a>
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
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Email remind error:", err);
    return NextResponse.json(
      { error: "Failed to send reminder email" },
      { status: 500 }
    );
  }
}
