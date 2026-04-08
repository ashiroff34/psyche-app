import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * POST /api/webhook
 *
 * Stripe webhook endpoint. Handles checkout.session.completed events.
 *
 * Current behaviour: logs the event and records it for future server-side
 * wallet support. Token crediting is currently handled on the client side
 * via /api/verify-purchase after the Stripe redirect.
 *
 * Future: once a server-side user DB is added, this is where you grant Pro
 * access and token balances persistently.
 *
 * Setup in Stripe Dashboard:
 *   - Add endpoint: https://thyself.app/api/webhook
 *   - Select events: checkout.session.completed, customer.subscription.deleted,
 *     customer.subscription.updated, invoice.payment_failed
 */

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key, { apiVersion: "2025-03-31.basil" });
}

// Stripe requires raw body for signature verification
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[webhook] STRIPE_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  const body = await req.text();
  const sig  = req.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("[webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // ── Handle events ────────────────────────────────────────────────────────────

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const packId      = session.metadata?.packId ?? "unknown";
      const tokens      = session.metadata?.tokens ?? "0";
      const userId      = session.client_reference_id ?? "anonymous";
      const email       = session.customer_details?.email ?? null;
      const amountTotal = session.amount_total ?? 0;

      console.log(
        `[webhook] checkout.session.completed | user=${userId} pack=${packId} tokens=${tokens} email=${email} amount=${amountTotal / 100}`
      );

      // TODO: When a server-side wallet is added:
      // 1. Look up or create user by userId (UUID)
      // 2. Credit parseInt(tokens) to their balance
      // 3. If packId.startsWith("pro_"), mark user as Pro
      // 4. Send receipt email via Resend

      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      console.log(`[webhook] subscription.deleted | subscriptionId=${sub.id}`);
      // TODO: Revoke Pro access for the associated user
      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      console.log(`[webhook] subscription.updated | status=${sub.status} subscriptionId=${sub.id}`);
      // TODO: Handle reactivations / downgrades
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`[webhook] invoice.payment_failed | customer=${invoice.customer}`);
      // TODO: Notify user their Pro subscription payment failed
      break;
    }

    default:
      // Ignore unhandled event types
      break;
  }

  return NextResponse.json({ received: true });
}
