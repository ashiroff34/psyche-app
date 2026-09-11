import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PRO_TRIAL_DAYS } from "@/data/pro-pricing";

// Price IDs are set per environment in Stripe Dashboard.
// Map pack IDs to Stripe Price IDs via env vars.
const PACK_PRICES: Record<string, { priceId: string; tokens: number; bonus: number; label: string }> = {
  starter:  { priceId: process.env.STRIPE_PRICE_TOKENS_STARTER  ?? "", tokens: 100,  bonus: 0,   label: "Starter Pack (100 tokens)" },
  popular:  { priceId: process.env.STRIPE_PRICE_TOKENS_POPULAR  ?? "", tokens: 500,  bonus: 50,  label: "Popular Pack (550 tokens)" },
  mega:     { priceId: process.env.STRIPE_PRICE_TOKENS_MEGA     ?? "", tokens: 1200, bonus: 200, label: "Mega Pack (1400 tokens)" },
  ultimate: { priceId: process.env.STRIPE_PRICE_TOKENS_ULTIMATE ?? "", tokens: 3000, bonus: 800, label: "Ultimate Pack (3800 tokens)" },
  // Pro subscriptions
  pro_monthly: { priceId: process.env.STRIPE_PRICE_PRO_MONTHLY  ?? "", tokens: 500,  bonus: 0, label: "Thyself Pro (Monthly)" },
  pro_annual:  { priceId: process.env.STRIPE_PRICE_PRO_ANNUAL   ?? "", tokens: 500,  bonus: 0, label: "Thyself Pro (Annual)" },
};

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key, { apiVersion: "2025-03-31.basil" });
}

export async function POST(req: NextRequest) {
  try {
    const { packId, userId, email } = await req.json() as {
      packId: string;
      userId: string;
      email?: string;
    };

    const pack = PACK_PRICES[packId];
    if (!pack) {
      return NextResponse.json({ error: "Unknown pack" }, { status: 400 });
    }
    if (!pack.priceId) {
      return NextResponse.json(
        { error: `Stripe price not configured for pack: ${packId}` },
        { status: 503 }
      );
    }

    const stripe = getStripe();
    const origin = req.headers.get("origin") ?? "https://thyself.app";

    const isSubscription = packId.startsWith("pro_");

    const session = await stripe.checkout.sessions.create({
      mode: isSubscription ? "subscription" : "payment",
      line_items: [{ price: pack.priceId, quantity: 1 }],
      // Pass the device UUID so the webhook / verify route can link the session
      client_reference_id: userId,
      metadata: {
        packId,
        tokens: String(pack.tokens + pack.bonus),
        label: pack.label,
      },
      // Free trial on Pro subscriptions — 7 days outperforms 14 on commitment
      // speed. The length is imported, not literal: /pricing, /store and the
      // post-assessment upsell all promise this number to the user, and the
      // one place that actually sets it must not be able to drift away from
      // the promise the way the Pro price once did.
      ...(isSubscription
        ? { subscription_data: { trial_period_days: PRO_TRIAL_DAYS } }
        : {}),
      // Pre-fill email if we have it
      ...(email ? { customer_email: email } : {}),
      // Redirect back into the app after payment
      success_url: `${origin}/store/success?session_id={CHECKOUT_SESSION_ID}&pack=${packId}`,
      // Abandoned Pro checkout returns to /pricing (type-personalized headline,
      // therapy anchor, 7-day trial CTA) — never dump Pro intent into the token
      // store. Token-pack cancels return to /store. Mirrors the leak fixed in 4ac0843.
      cancel_url: isSubscription
        ? `${origin}/pricing?checkout=cancelled`
        : `${origin}/store?cancelled=1`,
      // Allow promotion codes
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[/api/checkout]", err);
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
