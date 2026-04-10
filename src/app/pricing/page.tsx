"use client";

// Pricing page with Ariely's 3-tier decoy pattern
//
// Decoy effect (asymmetric dominance, Ariely 2008): when you add a third
// option that is dominated by one but not the other, people shift toward
// the dominator. Pro Quarterly ($24) is dominated by Pro Annual ($47/yr
// = $3.92/mo), making Annual look like a steal vs. Monthly ($7.99/mo).
//
// Anchors between Finch Plus ($44/yr) and Calm ($69/yr).
//
// Loss-aversion at cancel and trust-based pricing (no scarcity
// countdowns, no hidden annual-only tiers) follows the wellness-space
// ethical standard post-Noom FTC settlement.

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
    name: "Pro Quarterly",
    price: "$24",
    period: "/ 3 months",
    perMonth: "$8.00/mo",
    features: [
      "Everything in Free",
      "Shadow Work lab",
      "Tritype deep-dive",
      "Audio reflections",
      "Advanced assessments",
      "Priority new features",
    ],
    packId: "pro_quarterly",
    highlighted: false,
    badge: "",
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

export default function PricingPage() {
  const { profile } = useProfile();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleCheckout(packId: string) {
    if (!packId) return; // free tier
    setLoading(packId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packId,
          userId: profile.email ?? "anonymous",
          email: profile.email ?? undefined,
        }),
      });
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
          <h1 className="text-3xl font-bold mb-2">Choose your depth</h1>
          <p className="text-sm opacity-60 mb-8 leading-relaxed">
            Free gets you far. Pro unlocks the layers that take years off the self-discovery curve.
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
