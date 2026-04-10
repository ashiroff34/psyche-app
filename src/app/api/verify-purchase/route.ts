import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key, { apiVersion: "2025-03-31.basil" });
}

/**
 * GET /api/verify-purchase?session_id=cs_xxx
 *
 * Called by the /store/success page after Stripe redirects back.
 * Verifies the session is paid, returns pack details so the client
 * can credit tokens to localStorage.
 *
 * Note: We only return data on a genuine paid session (payment_status = "paid"
 * or subscription status = "active"). No tokens are stored server-side ,
 * the client immediately writes to localStorage. For a future server-side
 * wallet the webhook at /api/webhook should be used instead.
 */
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    // Only hand out tokens for genuinely completed payments
    const paid =
      session.payment_status === "paid" ||
      session.status === "complete";

    if (!paid) {
      return NextResponse.json({ error: "Payment not complete" }, { status: 402 });
    }

    const packId  = session.metadata?.packId ?? "";
    const tokens  = parseInt(session.metadata?.tokens ?? "0", 10);
    const label   = session.metadata?.label ?? "";
    const userId  = session.client_reference_id ?? "";
    const isPro   = packId.startsWith("pro_");

    // Customer email for receipt (Stripe collects it during checkout)
    const customerEmail =
      session.customer_details?.email ?? null;

    return NextResponse.json({
      ok: true,
      packId,
      tokens,
      label,
      userId,
      isPro,
      customerEmail,
      amountTotal: session.amount_total,   // cents
      currency: session.currency,
    });
  } catch (err) {
    console.error("[/api/verify-purchase]", err);
    const message = err instanceof Error ? err.message : "Verification failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
