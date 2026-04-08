import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * POST /api/send-receipt
 *
 * Sends a purchase receipt email via Resend after a verified Stripe payment.
 * Called by the /store/success page once the purchase is verified.
 */

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Email is optional — don't hard-fail if not configured
    console.warn("[send-receipt] RESEND_API_KEY not set, skipping email");
    return NextResponse.json({ sent: false, reason: "not configured" });
  }

  try {
    const {
      email,
      packLabel,
      tokens,
      amountTotal,
      currency = "usd",
      isPro = false,
    } = await req.json() as {
      email: string;
      packLabel: string;
      tokens: number;
      amountTotal: number;   // cents
      currency?: string;
      isPro?: boolean;
    };

    if (!email) {
      return NextResponse.json({ sent: false, reason: "no email" });
    }

    const resend = new Resend(apiKey);
    const amount = (amountTotal / 100).toLocaleString("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    });

    const subject = isPro
      ? "Welcome to Thyself Pro! Your subscription is active."
      : `Your Thyself purchase: ${packLabel}`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; background: #0f0a1e; color: #e2e8f0; margin: 0; padding: 40px 16px; }
    .card { max-width: 480px; margin: 0 auto; background: #1a1035; border-radius: 24px; overflow: hidden; border: 1px solid rgba(139,92,246,0.2); }
    .header { background: linear-gradient(135deg, #6366f1, #7c3aed); padding: 32px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; font-weight: 800; color: #fff; }
    .header p  { margin: 8px 0 0; color: rgba(255,255,255,0.75); font-size: 15px; }
    .body { padding: 32px; }
    .row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); }
    .row:last-child { border-bottom: none; }
    .label { color: rgba(255,255,255,0.5); font-size: 13px; }
    .value { font-weight: 700; font-size: 15px; color: #fff; }
    .tokens { color: #fbbf24; }
    .footer { padding: 24px 32px; text-align: center; color: rgba(255,255,255,0.3); font-size: 12px; }
    .cta { display: inline-block; margin: 24px auto 0; padding: 14px 32px; background: linear-gradient(135deg, #6366f1, #7c3aed); color: #fff; font-weight: 700; font-size: 15px; border-radius: 14px; text-decoration: none; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>${isPro ? "Welcome to Pro!" : "Purchase confirmed"}</h1>
      <p>${isPro ? "Your Thyself Pro subscription is now active." : "Your tokens are ready to spend."}</p>
    </div>
    <div class="body">
      <div class="row">
        <span class="label">Product</span>
        <span class="value">${packLabel}</span>
      </div>
      ${!isPro ? `<div class="row">
        <span class="label">Tokens added</span>
        <span class="value tokens">+${tokens.toLocaleString()} tokens</span>
      </div>` : `<div class="row">
        <span class="label">Monthly bonus</span>
        <span class="value tokens">+500 tokens/month</span>
      </div>`}
      <div class="row">
        <span class="label">Amount charged</span>
        <span class="value">${amount}</span>
      </div>
      <div style="text-align:center">
        <a class="cta" href="https://thyself.app/store">Open Thyself</a>
      </div>
    </div>
    <div class="footer">
      Thyself &middot; Know thyself.<br />
      Questions? Reply to this email and we&apos;ll help.
    </div>
  </div>
</body>
</html>`;

    const { data, error } = await resend.emails.send({
      from: "Thyself <receipts@thyself.app>",
      to: [email],
      subject,
      html,
    });

    if (error) {
      console.error("[send-receipt] Resend error:", error);
      return NextResponse.json({ sent: false, error: error.message });
    }

    return NextResponse.json({ sent: true, id: data?.id });
  } catch (err) {
    console.error("[send-receipt] error:", err);
    return NextResponse.json({ sent: false, error: String(err) }, { status: 500 });
  }
}
