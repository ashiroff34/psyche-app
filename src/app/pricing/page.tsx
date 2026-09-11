"use client";

// Pricing page — Annual + Monthly + Free with 7-day trial on Pro
//
// Card order is deliberate: the highest total price (Annual $47) is read first
// so Monthly and Free are judged against it. Leading with Free ($0) anchors the
// page low and makes every paid tier read as a markup.
//
// Annual anchors against Monthly — annual is the highlighted "best value"
// option. The 7-day free trial reduces activation friction without the
// dishonesty of a 14-day trial people forget to cancel.
//
// Every price on this page comes from @/data/pro-pricing, which /store reads
// too. They used to be hardcoded separately and had drifted apart, so the same
// subscription was quoted at two different prices in one app.
//
// Anchors between Finch Plus ($44/yr) and Calm ($69/yr).
//
// Trust-based pricing (no scarcity countdowns, no hidden annual-only tiers)
// follows the wellness-space ethical standard post-Noom FTC settlement.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Shield, Star, Zap } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { Analytics, type Framework } from "@/lib/analytics";
import { getPaywallCopy } from "@/data/type-paywall-copy";
import {
  PRO_ANNUAL_PER_MONTH,
  PRO_ANNUAL_PRICE,
  PRO_ANNUAL_SAVINGS,
  PRO_ANNUAL_SAVINGS_PERCENT,
  PRO_MONTHLY_PRICE,
  PRO_TRIAL_DAYS,
  formatPrice,
} from "@/data/pro-pricing";

interface PlanProps {
  name: string;
  price: string;
  period: string;
  perMonth: string;
  badge?: string;
  /**
   * Quantified saving vs. the monthly card. "Best value" is a claim the reader
   * has to verify by multiplying $7.99 by twelve; stating the delta does that
   * arithmetic for them, which is the whole point of an anchor.
   */
  savingsNote?: string;
  ctaLabel?: string;
  features: string[];
  packId: string;
  highlighted: boolean;
  isFree?: boolean;
  /** Numeric price, for checkout_initiated. */
  priceValue: number;
  /** Billing period, for checkout_initiated. */
  billingPeriod: "monthly" | "annual" | "lifetime";
}

const PLANS: PlanProps[] = [
  {
    name: "Pro Annual",
    price: formatPrice(PRO_ANNUAL_PRICE),
    period: "/ year",
    perMonth: `$${PRO_ANNUAL_PER_MONTH.toFixed(2)}/mo`,
    badge: "Best value",
    savingsNote: `Save $${PRO_ANNUAL_SAVINGS.toFixed(2)} a year \u2014 ${PRO_ANNUAL_SAVINGS_PERCENT}% off monthly`,
    ctaLabel: `Try Free for ${PRO_TRIAL_DAYS} Days`,
    features: [
      "Everything in Free",
      "Shadow Work lab",
      "Tritype deep-dive",
      "Audio reflections",
      "Advanced assessments",
      "Priority new features",
      "500 bonus tokens",
    ],
    packId: "pro_annual",
    highlighted: true,
    priceValue: PRO_ANNUAL_PRICE,
    billingPeriod: "annual",
  },
  {
    name: "Pro Monthly",
    price: formatPrice(PRO_MONTHLY_PRICE),
    period: "/ month",
    perMonth: `${formatPrice(PRO_MONTHLY_PRICE)}/mo`,
    // Monthly carries the same 7-day free trial as Annual (checkout applies it
    // to every pro_* pack). Trial-framed CTA reverses the risk instead of
    // signalling an immediate charge — matches the page's "No charge until day 7".
    ctaLabel: `Try Free for ${PRO_TRIAL_DAYS} Days`,
    features: [
      "Everything in Free",
      "Shadow Work lab",
      "Tritype deep-dive",
      "Audio reflections",
      "Advanced assessments",
    ],
    packId: "pro_monthly",
    highlighted: false,
    priceValue: PRO_MONTHLY_PRICE,
    billingPeriod: "monthly",
  },
  {
    name: "Free",
    price: "$0",
    period: "forever",
    perMonth: "$0/mo",
    features: [
      "Full Enneagram assessment",
      "Daily practice + streaks",
      "Chibi companion",
      "Big Five + Attachment",
      "3 Mirror frameworks",
      "Identity card + sharing",
    ],
    packId: "",
    highlighted: false,
    isFree: true,
    priceValue: 0,
    billingPeriod: "monthly",
  },
];

// Bump this whenever the page's psychology changes, so PostHog can compare
// conversion across variants. v2 = highest price first (anchoring).
const PAYWALL_VARIANT = "pricing_annual_first_v2";
const LESSON_COUNT_KEY = "lessons-completed-count";
// Same key /store reads. /store already refuses to sell Pro twice; /pricing did
// not, so a paying subscriber arriving here (15 surfaces link to /pricing) was
// offered a free trial they have already used and could open a second Stripe
// subscription for the same account.
const PRO_UNLOCK_KEY = "psyche-pro-unlocked";

/** Reads how many lessons this device has finished, for funnel segmentation. */
function readLessonCount(): number {
  try {
    const raw = localStorage.getItem(LESSON_COUNT_KEY);
    const n = raw !== null ? parseInt(raw, 10) : 0;
    return isNaN(n) ? 0 : n;
  } catch {
    return 0;
  }
}

export default function PricingPage() {
  const { profile, loaded } = useProfile();
  const [loading, setLoading] = useState<string | null>(null);
  // Where the user came from, so paywall_view and checkout_initiated share a
  // trigger and the funnel can be segmented by entry point.
  const triggerRef = useRef<string>("direct");
  const viewTracked = useRef(false);
  // Someone who opened Stripe and backed out is the highest-intent visitor on
  // this page — they already clicked buy. Returning them to an unchanged page
  // answers none of the doubt that stopped them.
  const [abandonedCheckout, setAbandonedCheckout] = useState(false);
  // A checkout that fails silently is the most expensive failure on this page:
  // the user has already decided to pay. /store surfaces the same failure with
  // a toast; /pricing swallowed it and reset the button, so the highest-intent
  // click in the funnel looked to the user like the button simply did nothing.
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  // Existing subscriber. Starts false so a genuine prospect never has the offer
  // withheld while localStorage is read; the effect below corrects it on mount.
  const [proUnlocked, setProUnlocked] = useState(false);

  useEffect(() => {
    try {
      setProUnlocked(localStorage.getItem(PRO_UNLOCK_KEY) === "true");
    } catch {
      // treat an unreadable store as "not subscribed" and show the offer
    }
  }, []);

  const framework: Framework = profile.enneagramType
    ? "enneagram"
    : profile.cognitiveType
      ? "mbti"
      : "mixed";

  // paywall_view — the first step of the conversion funnel the admin dashboard
  // charts. Without it, checkout_initiated and subscription_start have no
  // denominator and conversion rate is unmeasurable.
  useEffect(() => {
    // A subscriber viewing this page is not a paywall impression. Counting them
    // deflates conversion rate against a denominator that can never convert.
    if (!loaded || proUnlocked || viewTracked.current) return;
    viewTracked.current = true;
    try {
      const params = new URLSearchParams(window.location.search);
      const cancelled = params.get("checkout") === "cancelled";
      setAbandonedCheckout(cancelled);
      triggerRef.current =
        params.get("from") ?? (cancelled ? "checkout_abandoned" : "direct");
    } catch {
      // keep the "direct" default
    }
    Analytics.paywallView({
      trigger_event: triggerRef.current,
      paywall_variant: PAYWALL_VARIANT,
      framework,
      user_lessons_completed: readLessonCount(),
    });
  }, [loaded, proUnlocked, framework]);

  // Headline, loss frame, and benefit line all adapt to the user's type. The
  // headline alone was doing the personalization work while the argument
  // underneath it stayed identical for all nine types.
  const paywallCopy = getPaywallCopy(profile.enneagramType);

  async function handleCheckout(plan: PlanProps) {
    const packId = plan.packId;
    if (!packId) return; // free tier
    if (proUnlocked) return; // already subscribed — never open a second subscription
    Analytics.checkoutInitiated({
      product_id: packId,
      price: plan.priceValue,
      period: plan.billingPeriod,
      trigger: triggerRef.current,
    });
    setLoading(packId);
    setCheckoutError(null);
    try {
      const ctrl = new AbortController();
      const timeout = setTimeout(() => ctrl.abort(), 15000);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packId,
          userId: profile.email ?? "anonymous",
          email: profile.email ?? undefined,
        }),
        signal: ctrl.signal,
      });
      clearTimeout(timeout);
      const data = await res.json() as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      reportCheckoutFailure(plan, data.error ?? "no_checkout_url");
    } catch (e) {
      console.error("Checkout failed:", e);
      reportCheckoutFailure(plan, e instanceof Error ? e.message : "network_error");
    } finally {
      setLoading(null);
    }
  }

  /** Tells the user what happened and makes the drop-off visible in the funnel. */
  function reportCheckoutFailure(plan: PlanProps, reason: string) {
    // Without this event, every technical checkout failure is indistinguishable
    // from a user changing their mind — the largest step-down in the funnel
    // (checkout_initiated to subscription_start) has no attribution.
    Analytics.checkoutFailed({
      product_id: plan.packId,
      price: plan.priceValue,
      period: plan.billingPeriod,
      trigger: triggerRef.current,
      reason,
    });
    setCheckoutError(
      reason.includes("not configured")
        ? "Checkout is not open yet. Your trial is still waiting when it is."
        : "Checkout did not open. Nothing was charged \u2014 try again, or email support@thyself.app.",
    );
  }

  return (
    <div className="min-h-screen text-white p-6 pb-20" style={{ background: "#0a0614" }}>
      <div className="max-w-lg mx-auto">
        <Link href="/daily" className="inline-flex items-center gap-2 text-sm opacity-60 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        {/* Returning from an abandoned Stripe checkout. The objection at that
            moment is almost always "am I about to be charged" — so lead with
            the answer, not with the offer again. Risk reversal restated at the
            exact point the hesitation happened. */}
        {abandonedCheckout && !proUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl mb-5 flex items-start gap-3"
            style={{
              background: "rgba(139,92,246,0.12)",
              border: "1px solid rgba(139,92,246,0.35)",
            }}
          >
            <Shield className="w-4 h-4 mt-0.5 shrink-0 text-violet-300" />
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "rgba(255,255,255,0.92)" }}>
                Nothing was charged.
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                Your {PRO_TRIAL_DAYS} days are free either way. Start the trial, look around, and
                if the deeper layers are not for you, cancel before day {PRO_TRIAL_DAYS} and you pay
                nothing.
              </p>
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-base font-semibold mb-2 leading-snug" style={{ color: "rgba(255,255,255,0.9)" }}>
            {paywallCopy.headline}
          </p>
          <h1 className="text-3xl font-bold mb-1">Choose your depth</h1>
          <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.32)" }}>
            Built on Ichazo, Naranjo, and Riso-Hudson &mdash; not pop psychology
          </p>
          {/* Everything from here to the trial promise is an argument aimed at
              someone deciding whether to pay. A subscriber reading "without Pro
              this stays out of reach" is being sold something they already own,
              which reads as the product not knowing who they are. */}
          {proUnlocked ? (
            <p className="text-sm mb-3 leading-relaxed" style={{ color: "rgba(167,139,250,0.9)" }}>
              Pro is active on this device. Every depth below is already yours.
            </p>
          ) : (
            <>
          <p className="text-xs mb-3 flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Star className="w-3 h-3 text-violet-400 shrink-0" /> Thousands are mapping their psyche with Thyself
          </p>
          <p className="text-sm opacity-60 mb-2 leading-relaxed">
            Free gets you far. {paywallCopy.proBenefit}
          </p>
          {/* Loss frame — names what stays unchanged without Pro. Losses are
              weighted heavier than equivalent gains (Kahneman & Tversky), and
              the results-screen upsell already leads with this framing. */}
          <p className="text-sm mb-2 leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>
            {paywallCopy.lossFrame}
          </p>
          <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
            One therapy session is $200. A year of Thyself is {formatPrice(PRO_ANNUAL_PRICE)}.
          </p>
          <p className="text-xs font-semibold mb-2" style={{ color: "rgba(167,139,250,0.9)" }}>
            {PRO_TRIAL_DAYS} days free, then keep it or cancel. No charge until day {PRO_TRIAL_DAYS}.
          </p>
            </>
          )}
          {/* A risk-reversal promise the reader cannot act on is not risk
              reversal. The page told people to cancel before day 7 without
              saying anywhere how, and support email is currently the only
              cancellation path in the product. Naming it removes the unanswered
              "how do I get out of this" objection at the decision point. */}
          <p className="text-xs mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
            To cancel, email{" "}
            <a
              href="mailto:support@thyself.app?subject=Cancel%20my%20Thyself%20Pro%20subscription"
              className="underline"
              style={{ color: "rgba(167,139,250,0.8)" }}
            >
              support@thyself.app
            </a>{" "}
            and we will take care of it. No forms, no phone call.
          </p>
        </motion.div>

        {checkoutError && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="p-4 rounded-2xl mb-4 flex items-start gap-3"
            style={{
              background: "rgba(244,63,94,0.1)",
              border: "1px solid rgba(244,63,94,0.3)",
            }}
          >
            <Shield className="w-4 h-4 mt-0.5 shrink-0 text-rose-300" />
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
              {checkoutError}
            </p>
          </motion.div>
        )}

        <div className="space-y-4">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`p-5 rounded-2xl relative ${plan.highlighted ? "ring-2 ring-violet-400" : ""}`}
              style={{
                background: plan.highlighted
                  ? "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(217,70,239,0.1))"
                  : "rgba(255,255,255,0.03)",
                border: `1px solid ${plan.highlighted ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              {plan.badge && (
                <span className="absolute -top-2.5 right-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ background: "linear-gradient(135deg,#8b5cf6,#d946ef)", color: "white" }}>
                  {plan.badge}
                </span>
              )}
              <div className="flex items-baseline justify-between mb-3">
                <div>
                  <p className="text-lg font-bold">{plan.name}</p>
                  <p className="text-xs opacity-60">{plan.perMonth}</p>
                  {plan.savingsNote && (
                    <p className="text-[11px] font-semibold mt-0.5" style={{ color: "#34d399" }}>
                      {plan.savingsNote}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black">{plan.price}</p>
                  <p className="text-[10px] opacity-50">{plan.period}</p>
                </div>
              </div>
              <ul className="space-y-1.5 mb-4">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs">
                    <Check className="w-3 h-3 text-violet-400 shrink-0" />
                    <span style={{ color: "rgba(255,255,255,0.75)" }}>{f}</span>
                  </li>
                ))}
              </ul>
              {plan.isFree ? (
                <Link href="/daily" className="block w-full py-2.5 text-center rounded-xl text-sm font-semibold"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}>
                  {proUnlocked ? "Included in Pro" : "Current plan"}
                </Link>
              ) : (
                <button
                  onClick={() => handleCheckout(plan)}
                  disabled={!!loading || proUnlocked}
                  className="w-full py-2.5 rounded-xl text-sm font-bold transition-all active:scale-[0.98] disabled:opacity-50"
                  style={{
                    background: plan.highlighted
                      ? "linear-gradient(135deg,#8b5cf6,#d946ef)"
                      : "rgba(139,92,246,0.15)",
                    border: plan.highlighted ? "none" : "1px solid rgba(139,92,246,0.3)",
                    color: "white",
                  }}
                >
                  {proUnlocked
                    ? "Pro active"
                    : loading === plan.packId
                      ? "Opening checkout..."
                      : (plan.ctaLabel ?? `Get ${plan.name}`)}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-8 space-y-3 text-center">
          <div className="flex items-center justify-center gap-4 text-[11px] opacity-50">
            <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Cancel anytime</span>
            <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> No data sold, ever</span>
          </div>
          <p className="text-[10px] opacity-40 leading-relaxed max-w-xs mx-auto">
            Thyself processes personality data on your device. A subscription unlocks premium content and features, not access to your data.
          </p>
        </div>
      </div>
    </div>
  );
}
