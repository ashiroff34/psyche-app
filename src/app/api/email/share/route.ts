import { Resend } from "resend";
import { NextResponse } from "next/server";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not configured");
  return new Resend(key);
}

const ENNEAGRAM_NAMES: Record<number, string> = {
  1: "The Reformer",
  2: "The Helper",
  3: "The Achiever",
  4: "The Individualist",
  5: "The Investigator",
  6: "The Loyalist",
  7: "The Enthusiast",
  8: "The Challenger",
  9: "The Peacemaker",
};

const ENNEAGRAM_COLORS: Record<number, string> = {
  1: "#6366F1",
  2: "#EC4899",
  3: "#F59E0B",
  4: "#8B5CF6",
  5: "#3B82F6",
  6: "#14B8A6",
  7: "#F97316",
  8: "#EF4444",
  9: "#22C55E",
};

export async function POST(req: Request) {
  try {
    const { to, fromName, enneagramType, cognitiveType, instinctualStacking } =
      await req.json();

    if (!to || !enneagramType) {
      return NextResponse.json(
        { error: "Missing required fields: to, enneagramType" },
        { status: 400 }
      );
    }

    const typeName = ENNEAGRAM_NAMES[enneagramType] || `Type ${enneagramType}`;
    const color = ENNEAGRAM_COLORS[enneagramType] || "#3498DB";
    const senderName = fromName || "Someone";

    const { data, error } = await getResend().emails.send({
      from: "Thyself <onboarding@resend.dev>",
      to: [to],
      subject: `${senderName} shared their personality results with you`,
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
            <td style="height:6px; background:linear-gradient(90deg, ${color}, ${color}99);"></td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:40px 36px 32px;">

              <!-- Intro -->
              <p style="margin:0 0 6px; font-size:13px; color:#94a3b8; text-transform:uppercase; letter-spacing:2px; font-weight:600;">
                Thyself App
              </p>
              <h1 style="margin:0 0 24px; font-size:22px; color:#1e293b; font-weight:700; line-height:1.3;">
                ${senderName} shared their personality type with you
              </h1>

              <!-- Type card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:${color}0A; border:1px solid ${color}20; border-radius:16px; margin-bottom:28px;">
                <tr>
                  <td style="padding:28px 24px;">
                    <div style="font-size:64px; font-weight:800; color:${color}; line-height:1; margin-bottom:4px;">
                      ${enneagramType}
                    </div>
                    <div style="font-size:20px; font-weight:700; color:#334155; margin-bottom:16px;">
                      ${typeName}
                    </div>

                    <!-- Badges -->
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        ${cognitiveType ? `
                        <td style="padding-right:8px; padding-bottom:8px;">
                          <span style="display:inline-block; background:${color}18; color:${color}; font-size:13px; font-weight:600; padding:6px 14px; border-radius:20px;">
                            ${cognitiveType}
                          </span>
                        </td>
                        ` : ""}
                        ${instinctualStacking ? `
                        <td style="padding-right:8px; padding-bottom:8px;">
                          <span style="display:inline-block; background:#f1f5f9; color:#475569; font-size:13px; font-weight:600; padding:6px 14px; border-radius:20px;">
                            ${instinctualStacking}
                          </span>
                        </td>
                        ` : ""}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <p style="margin:0 0 20px; font-size:15px; color:#64748b; line-height:1.6;">
                Curious about your own type? Discover your Enneagram, cognitive functions, and instinctual stacking.
              </p>

              <a href="https://archetypeapp.co" style="display:inline-block; background:${color}; color:#ffffff; text-decoration:none; font-size:14px; font-weight:600; padding:12px 28px; border-radius:12px;">
                Discover your type
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:0 36px 32px;">
              <div style="height:1px; background:#e2e8f0; margin-bottom:20px;"></div>
              <p style="margin:0; font-size:11px; color:#94a3b8; letter-spacing:1px; text-transform:uppercase;">
                archetypeapp.co &middot; know thyself
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
    console.error("Email share error:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
