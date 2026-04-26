"use client";

// Pricing page — Annual + Monthly + Free with 7-day trial on Pro
//
// Annual ($47/yr = $3.92/mo) anchors against Monthly ($7.99/mo) — annual is
// the highlighted "best value" option. 7-day free trial reduces activation
// friction without the dishonesty of a 14-day trial people forget to cancel.
//
// Anchors between Finch Plus ($44/yr) and Calm ($69/yr).
//
// Trust-based pricing (no scarcity countdowns, no hidden annual-only tiers)
// follows the wellness-space ethical standard post-Noom FTC settlement.

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Sparkles, Shield, Star, Zap } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";

interface PlanProps {
  name: string;
  price: string;
  period: string;
  perMonth: string;
  badge?: string;
  features: string[];
  packId: string;
  highlighted: boolean;
  isFree?: boolean;
}

const PLANS: PlanProps[] = [
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
  },
  {
    name: "Pro Annual",
    price: "$47",
    period: "/ year",
    perMonth: "$3.92/mo",
    badge: "Best value",
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
  },
  {
    name: "Pro Monthly",
    price: "$7.99",
    period: "/ month",
    perMonth: "$7.99/mo",
    features: [
      "Everything in Free",
      "Shadow Work lab",
      "Tritype deep-dive",
      "Audio reflections",
      "Advanced assessments",
    ],
    packId: "pro_monthly",
    highlighted: false,
  },
];

const TYPE_PAYWALL_HEADLINES: Record<number, string> = {
  1: "Stop settling for a life that doesn't match your values.",
  2: "Understand the people you love — and yourself — more deeply.",
  3: "Know exactly what drives you, and what gets in the way.",
  4: "Finally make sense of why you feel what you feel.",
  5: "Go deeper into the framework than any book can take you.",
  6: "Build the self-trust you've always wanted.",
  7: "Stop running. Discover what you actually want.",
  8: "Understand your power — and when to use it.",
  9: "Find yourself without losing the peace.",
};

export default function PricingPage() {
  const { profile } = useProfile();
  const [loading, setLoading] = useState<string | null>(null);

  const paywallHeadline =
    profile.enneagramType && TYPE_PAYWALL_HEADLINES[profile.enneagramType]
      ? TYPE_PAYWALL_HEADLINES[profile.enneagramType]
      : "Understand why you are the way you are.";

  async function handleCheckout(packId: string) {
    if (!packId) return; // free tier
    setLoading(packId);
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
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) {
      console.error("Checkout failed:", e);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen text-white p-6 pb-20" style={{ background: "#0a0614" }}>
      <div className="max-w-lg mx-auto">
        <Link href="/daily" className="inline-flex items-center gap-2 text-sm opacity-60 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-base font-semibold mb-2 leading-snug" style={{ color: "rgba(255,255,255,0.9)" }}>
            {paywallHeadline}
          </p>
          <h1 className="text-3xl font-bold mb-1">Choose your depth</h1>
          <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.32)" }}>
            Built on Ichazo, Naranjo, and Riso-Hudson &mdash; not pop psychology
          </p>
          <p className="text-sm opacity-60 mb-2 leading-relaxed">
            Free gets you far. Pro unlocks the layers that take years off the self-discovery curve.
          </p>
          <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
            One therapy session is $200. A year of Thyself is $47.
          </p>
          <p className="text-xs font-semibold mb-8" style={{ color: "rgba(167,139,250,0.9)" }}>
            7 days free, then keep it or cancel. No charge until day 7.
          </p>
        </motion.div>

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
                  Current plan
                </Link>
              ) : (
                <button
                  onClick={() => handleCheckout(plan.packId)}
                  disabled={!!loading}
                  className="w-full py-2.5 rounded-xl text-sm font-bold transition-all active:scale-[0.98] disabled:opacity-50"
                  style={{
                    background: plan.highlighted
                      ? "linear-gradient(135deg,#8b5cf6,#d946ef)"
                      : "rgba(139,92,246,0.15)",
                    border: plan.highlighted ? "none" : "1px solid rgba(139,92,246,0.3)",
                    color: "white",
                  }}
                >
                  {loading === plan.packId ? "Opening checkout..." : `Get ${plan.name}`}
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
