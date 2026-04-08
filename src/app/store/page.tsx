"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Coins,
  Crown,
  Zap,
  Gift,
  Star,
  Lock,
  Sparkles,
  Shield,
  Flame,
  Brain,
  BookOpen,
  Users,
  Trophy,
  Target,
  ChevronRight,
  Check,
  Gem,
  Palette,
  Heart,
  Eye,
  Wand2,
  ArrowLeft,
  Gamepad2,
} from "lucide-react";
import NextStepBanner from "@/components/NextStepBanner";
import FirstVisitTooltip from "@/components/FirstVisitTooltip";

// ─── Animations ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.05 } },
};

const cardItem = {
  initial: { opacity: 0, y: 12, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { type: "spring", stiffness: 260, damping: 24 },
};

// ─── Data ────────────────────────────────────────────────────────────────────

const TOKEN_PACKS = [
  {
    id: "starter",
    name: "Starter Pack",
    tokens: 100,
    bonus: 0,
    price: "$0.99",
    priceNum: 0.99,
    icon: Coins,
    color: "from-amber-400 to-yellow-500",
    shadow: "shadow-amber-200/40",
    badge: null,
  },
  {
    id: "popular",
    name: "Popular Pack",
    tokens: 500,
    bonus: 50,
    price: "$3.99",
    priceNum: 3.99,
    icon: Zap,
    color: "from-amber-500 to-orange-500",
    shadow: "shadow-orange-200/50",
    badge: "Most Popular",
  },
  {
    id: "mega",
    name: "Mega Pack",
    tokens: 1200,
    bonus: 200,
    price: "$7.99",
    priceNum: 7.99,
    icon: Star,
    color: "from-orange-500 to-rose-500",
    shadow: "shadow-rose-200/40",
    badge: "Best Value",
  },
  {
    id: "ultimate",
    name: "Ultimate Pack",
    tokens: 3000,
    bonus: 800,
    price: "$14.99",
    priceNum: 14.99,
    icon: Crown,
    color: "from-rose-500 to-purple-600",
    shadow: "shadow-purple-200/50",
    badge: null,
  },
];

const TOKEN_USES = [
  { icon: Heart, label: "Pet Food & Care" },
  { icon: Palette, label: "Avatar Outfits" },
  { icon: Shield, label: "Streak Freezes" },
  { icon: Brain, label: "Hint Tokens" },
  { icon: Sparkles, label: "Revivals" },
];

const PRO_FEATURES = [
  { icon: Brain, label: "Inner Work Lab. Jungian shadow work, type dynamics, cognitive reframing" },
  { icon: Eye, label: "Ad-free experience" },
  { icon: Palette, label: "10 exclusive avatar outfits & backgrounds" },
  { icon: Target, label: "Advanced type analysis reports" },
  { icon: Zap, label: "Priority access to new features" },
  { icon: Coins, label: "500 bonus tokens every month" },
];

// localStorage key for Pro unlock (simulated. real payment not wired yet)
const PRO_UNLOCK_KEY = "psyche-pro-unlocked";

const FREE_EARN = [
  { icon: Flame, label: "Daily practice", tokens: 15, color: "from-orange-400 to-red-500" },
  { icon: Trophy, label: "7-day streak bonus", tokens: 25, color: "from-orange-500 to-amber-600", isBonus: true },
  { icon: Crown, label: "Level up reward", tokens: 5, color: "from-amber-400 to-yellow-500", isBonus: true },
];

const PREMIUM_ITEMS = [
  { name: "Golden Halo Frame", type: "Avatar Frame", icon: Crown },
  { name: "Nebula Background", type: "Background", icon: Sparkles },
  { name: "Phoenix Companion", type: "Exclusive Pet", icon: Flame },
  { name: "Crystal Aura", type: "Special Effect", icon: Gem },
  { name: "Astral Crown", type: "Avatar Frame", icon: Star },
  { name: "Mystic Fox", type: "Exclusive Pet", icon: Heart },
  { name: "Aurora Trail", type: "Special Effect", icon: Wand2 },
  { name: "Celestial Wings", type: "Avatar Frame", icon: Shield },
];

// ─── Component ───────────────────────────────────────────────────────────────

// ─── Growth Path Data ─────────────────────────────────────────────────────────

const TYPE_FEARS: Record<number, string> = {
  1: "Exploring your fear of being flawed or wrong",
  2: "Exploring your fear of being unwanted or unloved",
  3: "Exploring your fear of failure and worthlessness",
  4: "Exploring your fear of being ordinary or without identity",
  5: "Exploring your fear of incompetence and uselessness",
  6: "Exploring your fear of uncertainty and being without support",
  7: "Exploring your fear of pain, deprivation, and limitation",
  8: "Exploring your fear of being controlled or betrayed",
  9: "Exploring your fear of conflict and disconnection",
};

const TYPE_INTEGRATION: Record<number, string> = {
  1: "Practicing Type 7's joy and spontaneity without losing discernment",
  2: "Practicing Type 4's self-awareness and emotional depth",
  3: "Practicing Type 6's loyalty and collaborative commitment",
  4: "Practicing Type 1's discernment and principled action",
  5: "Practicing Type 8's decisive action and embodied presence",
  6: "Practicing Type 9's grounded acceptance and inner trust",
  7: "Practicing Type 5's depth, focus, and contemplative presence",
  8: "Practicing Type 2's vulnerability and genuine care for others",
  9: "Practicing Type 3's purposeful engagement and self-expression",
};

// ─── Growth Path Section ──────────────────────────────────────────────────────

function GrowthPathSection({ tokenBalance }: { tokenBalance: number | null }) {
  const [enneagramType, setEnneagramType] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("psyche-profile");
      if (raw) {
        const p = JSON.parse(raw);
        if (typeof p.enneagramType === "number") setEnneagramType(p.enneagramType);
      }
    } catch {}
  }, []);

  const typeLabel = enneagramType ? `Type ${enneagramType}` : null;
  const week13Desc = enneagramType ? (TYPE_FEARS[enneagramType] ?? "Understanding your core fear") : "Understanding your core fear";
  const week46Desc = enneagramType ? (TYPE_INTEGRATION[enneagramType] ?? "Growth direction practice") : "Growth direction practice";
  const hasEnoughTokens = tokenBalance !== null && tokenBalance >= 1200;

  return (
    <motion.section {...fadeUp} transition={{ delay: 0.07 }} className="mb-10">
      <div className="rounded-3xl overflow-hidden" style={{ background: "rgba(18,10,40,0.97)", border: "1px solid rgba(139,92,246,0.25)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
        {/* Header */}
        <div className="px-6 py-5" style={{ background: "linear-gradient(135deg, rgba(109,40,217,0.45) 0%, rgba(79,70,229,0.35) 100%)", borderBottom: "1px solid rgba(139,92,246,0.2)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(139,92,246,0.3)", border: "1px solid rgba(139,92,246,0.4)" }}>
              <Lock className="w-4 h-4" style={{ color: "#c4b5fd" }} />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold" style={{ color: "rgba(255,255,255,0.95)" }}>
                Your 90-Day{typeLabel ? ` ${typeLabel}` : ""} Growth Path
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                A structured journey tailored to your type
              </p>
            </div>
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          {/* Row 1. unlocked */}
          <div className="flex items-start gap-3 px-6 py-4">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)" }}>
              <Check className="w-3.5 h-3.5" style={{ color: "#34d399" }} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Week 1–3 · Foundation</p>
              <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.82)" }}>{week13Desc}</p>
            </div>
          </div>

          {/* Row 2. unlocked */}
          <div className="flex items-start gap-3 px-6 py-4">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)" }}>
              <Check className="w-3.5 h-3.5" style={{ color: "#34d399" }} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Week 4–6 · Integration</p>
              <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.82)" }}>{week46Desc}</p>
            </div>
          </div>

          {/* Row 3. locked/blurred */}
          <div className="flex items-start gap-3 px-6 py-4 relative overflow-hidden">
            <div className="absolute inset-0" style={{ backdropFilter: "blur(2px)", background: "rgba(10,5,25,0.35)" }} />
            <div className="relative w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.25)" }}>
              <Lock className="w-3.5 h-3.5" style={{ color: "#a78bfa" }} />
            </div>
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Week 7–12 · Shadow Work</p>
              <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>Disintegration awareness &amp; pattern interruption</p>
            </div>
          </div>

          {/* Row 4. locked/blurred */}
          <div className="flex items-start gap-3 px-6 py-4 relative overflow-hidden">
            <div className="absolute inset-0" style={{ backdropFilter: "blur(2px)", background: "rgba(10,5,25,0.45)" }} />
            <div className="relative w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.25)" }}>
              <Lock className="w-3.5 h-3.5" style={{ color: "#a78bfa" }} />
            </div>
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Advanced · Subtypes &amp; Relationships</p>
              <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>Advanced subtypes deep-dive &amp; relationship patterns</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 py-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {hasEnoughTokens ? (
            <button
              className="w-full py-3.5 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 8px 24px rgba(124,58,237,0.4)" }}
            >
              <Sparkles className="w-4 h-4" />
              Claim Your Growth Path →
            </button>
          ) : (
            <div>
              <button
                disabled
                className="w-full py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 mb-2"
                style={{ background: "rgba(139,92,246,0.15)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(139,92,246,0.2)", cursor: "default" }}
              >
                <Lock className="w-4 h-4" />
                Unlock Full Path. 1200 tokens
              </button>
              <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                Your balance: <span style={{ color: "#fbbf24", fontWeight: 600 }}>{tokenBalance ?? 0} tokens</span>
                {tokenBalance !== null && tokenBalance < 1200 && (
                  <> · {1200 - tokenBalance} more needed</>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}

// ─── Checkout helper ─────────────────────────────────────────────────────────

function getOrCreateDeviceId(): string {
  try {
    const KEY = "psyche-device-id";
    let id = localStorage.getItem(KEY);
    if (!id) { id = crypto.randomUUID(); localStorage.setItem(KEY, id); }
    return id;
  } catch { return "anon"; }
}

async function startCheckout(packId: string, setPurchaseToast: (m: string | null) => void) {
  try {
    const userId = getOrCreateDeviceId();
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ packId, userId }),
    });
    const data = await res.json() as { url?: string; error?: string };
    if (data.url) {
      window.location.href = data.url;
    } else {
      // Stripe not configured yet (no price IDs) — show friendly notice
      setPurchaseToast(data.error?.includes("not configured")
        ? "Payment coming soon! Check back shortly."
        : (data.error ?? "Something went wrong. Please try again."));
      setTimeout(() => setPurchaseToast(null), 3500);
    }
  } catch {
    setPurchaseToast("Could not connect to payment server. Please try again.");
    setTimeout(() => setPurchaseToast(null), 3500);
  }
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function StorePage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [purchaseToast, setPurchaseToast] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [proUnlocked, setProUnlocked] = useState(false);
  const [checkingOut, setCheckingOut] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("psyche-game-state");
      const gs = raw ? JSON.parse(raw) : {};
      setTokenBalance((gs.tokens as number) ?? 0);
      setProUnlocked(localStorage.getItem(PRO_UNLOCK_KEY) === "true");
    } catch {
      setTokenBalance(0);
    }
    setMounted(true);

    // Show cancelled notice if Stripe redirected back with ?cancelled=1
    if (typeof window !== "undefined" && window.location.search.includes("cancelled=1")) {
      setPurchaseToast("Purchase cancelled. No charge was made.");
      setTimeout(() => setPurchaseToast(null), 3500);
      // Clean up the URL param
      const url = new URL(window.location.href);
      url.searchParams.delete("cancelled");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  const handleTokenPackPurchase = async (packId: string) => {
    setCheckingOut(packId);
    await startCheckout(packId, setPurchaseToast);
    setCheckingOut(null);
  };

  const handleProPurchase = async () => {
    const packId = billingCycle === "monthly" ? "pro_monthly" : "pro_annual";
    setCheckingOut(packId);
    await startCheckout(packId, setPurchaseToast);
    setCheckingOut(null);
  };

  if (!mounted) return (
    <div className="min-h-screen" style={{ background: "#0f0a1e" }}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)" }} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: "#0f0a1e" }}>
      {/* Aurora orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)" }} />
        <div className="absolute top-1/3 -left-48 w-80 h-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }} />
      </div>

      <FirstVisitTooltip
        storageKey="psyche-visited-store"
        message="Earn free tokens daily by completing your practice, no purchase needed!"
        icon="(+)"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {/* Back nav */}
        <motion.div {...fadeUp} className="mb-6">
          <Link
            href="/game"
            className="inline-flex items-center gap-2 transition-colors text-sm font-medium"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Game
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.div {...fadeUp} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4" style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.2)" }}>
            <Coins className="w-4 h-4" style={{ color: "#fbbf24" }} />
            <span className="text-sm font-semibold" style={{ color: "#fbbf24" }}>Token Store</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-3" style={{ color: "rgba(255,255,255,0.95)" }}>
            Power Up Your{" "}
            <span style={{ background: "linear-gradient(135deg, #fbbf24, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Journey
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
            Two tiers of content. Enneagram tools unlock with tokens you earn for free. Jungian depth tools require Pro.
          </p>
          {/* Two-tier explainer */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <div className="flex-1 flex items-start gap-3 p-3.5 rounded-2xl text-left"
              style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <Zap className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" />
              <div>
                <p className="text-xs font-bold text-emerald-400 mb-0.5">Enneagram · Tokens</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Growth path, advanced learn tabs. earn tokens free through daily practice</p>
              </div>
            </div>
            <div className="flex-1 flex items-start gap-3 p-3.5 rounded-2xl text-left"
              style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
              <Crown className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#818cf8" }} />
              <div>
                <p className="text-xs font-bold mb-0.5" style={{ color: "#818cf8" }}>Jungian · Pro</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Inner Work Lab, shadow work, type dynamics. requires Pro subscription</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Growth Path Locked Preview ──────────────────────────────────────── */}
        <GrowthPathSection tokenBalance={tokenBalance} />

        {/* ── Token Balance Bar ────────────────────────────────────────────────── */}
        {tokenBalance !== null && (
          <motion.div {...fadeUp} transition={{ delay: 0.05 }} className="mb-10">
            {tokenBalance === 0 ? (
              /* Zero-state */
              <div className="flex flex-col sm:flex-row items-center gap-5 p-6 rounded-3xl" style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.18)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #f59e0b, #f97316)", boxShadow: "0 8px 20px rgba(245,158,11,0.3)" }}>
                  <Coins className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="font-bold mb-0.5" style={{ color: "rgba(255,255,255,0.9)" }}>You have 0 tokens right now</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Complete your daily practice to earn tokens for free, then come back to spend them!
                  </p>
                </div>
                <Link
                  href="/daily"
                  className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-2xl text-white text-sm font-bold transition-all active:scale-95"
                  style={{ background: "linear-gradient(135deg, #f59e0b, #f97316)", boxShadow: "0 4px 16px rgba(245,158,11,0.35)" }}
                >
                  <Flame className="w-4 h-4" />
                  Go earn tokens
                </Link>
              </div>
            ) : (
              /* Has tokens: show balance */
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl w-fit" style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.18)" }}>
                <Coins className="w-5 h-5" style={{ color: "#fbbf24" }} />
                <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>Your balance:</span>
                <span className="text-lg font-extrabold" style={{ background: "linear-gradient(135deg, #fbbf24, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {tokenBalance.toLocaleString()} tokens
                </span>
              </div>
            )}
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
           SECTION 1: Token Packs
           ══════════════════════════════════════════════════════════════════════ */}
        <motion.section {...fadeUp} transition={{ delay: 0.1 }} className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #f59e0b, #eab308)", boxShadow: "0 4px 16px rgba(245,158,11,0.3)" }}>
              <Coins className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.95)" }}>Token Packs</h2>
          </div>
          <p className="text-sm mb-6 ml-[52px]" style={{ color: "rgba(255,255,255,0.45)" }}>
            In-app currency for pet food, avatar outfits, streak freezes, hints & revivals.
          </p>

          {/* Token uses ribbon */}
          <div className="flex flex-wrap gap-2 mb-8 ml-[52px]">
            {TOKEN_USES.map((u) => (
              <span
                key={u.label}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.65)" }}
              >
                <u.icon className="w-3.5 h-3.5" style={{ color: "#fbbf24" }} />
                {u.label}
              </span>
            ))}
          </div>

          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {TOKEN_PACKS.map((pack) => (
              <motion.div
                key={pack.id}
                variants={cardItem}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative rounded-3xl p-6 cursor-pointer transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
              >
                {pack.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-white text-[11px] font-bold tracking-wide uppercase" style={{ background: "linear-gradient(135deg, #f59e0b, #f97316)", boxShadow: "0 4px 12px rgba(245,158,11,0.4)" }}>
                    {pack.badge}
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pack.color} flex items-center justify-center mb-4`} style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}>
                  <pack.icon className="w-7 h-7 text-white" />
                </div>

                {/* Name */}
                <h3 className="font-bold text-lg mb-1" style={{ color: "rgba(255,255,255,0.92)" }}>{pack.name}</h3>

                {/* Token amount */}
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="text-2xl font-extrabold" style={{ background: "linear-gradient(135deg, #fbbf24, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {pack.tokens.toLocaleString()}
                  </span>
                  <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>tokens</span>
                </div>

                {/* Bonus */}
                {pack.bonus > 0 && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full mb-3" style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.2)" }}>
                    <Gift className="w-3 h-3" style={{ color: "#34d399" }} />
                    <span className="text-xs font-semibold" style={{ color: "#34d399" }}>+{pack.bonus} bonus</span>
                  </div>
                )}
                {pack.bonus === 0 && <div className="h-[26px] mb-3" />}

                {/* Price & Buy */}
                <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="text-xl font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>{pack.price}</span>
                  <button
                    onClick={() => handleTokenPackPurchase(pack.id)}
                    disabled={checkingOut === pack.id}
                    className={`px-5 py-2 rounded-xl bg-gradient-to-r ${pack.color} text-white text-sm font-bold transition-all active:scale-95 disabled:opacity-70`}
                    style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.3)", minWidth: 64 }}
                  >
                    {checkingOut === pack.id ? (
                      <span className="flex items-center gap-1.5"><Gamepad2 className="w-3.5 h-3.5 animate-spin" />...</span>
                    ) : "Buy"}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════════════
           SECTION 2: Premium Subscription, Thyself Pro
           ══════════════════════════════════════════════════════════════════════ */}
        <motion.section {...fadeUp} transition={{ delay: 0.2 }} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366f1, #7c3aed)", boxShadow: "0 4px 16px rgba(99,102,241,0.35)" }}>
              <Crown className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.95)" }}>Thyself Pro</h2>
          </div>

          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-3xl" style={{ background: "linear-gradient(135deg, #6366f1, #7c3aed, #ec4899)" }} />
            <div className="relative m-[2px] rounded-[22px] p-8 sm:p-10" style={{ background: "rgba(18,10,40,0.97)" }}>
              {/* Top banner */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-6 h-6" style={{ color: "#a78bfa" }} />
                    <h3 className="text-2xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.95)" }}>Premium Subscription</h3>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.5)" }}>Unlock the full Thyself experience with Pro.</p>
                </div>

                {/* Billing toggle */}
                <div className="inline-flex items-center gap-1 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <button
                    onClick={() => setBillingCycle("monthly")}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                    style={billingCycle === "monthly"
                      ? { background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.95)" }
                      : { color: "rgba(255,255,255,0.4)" }}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle("annual")}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                    style={billingCycle === "annual"
                      ? { background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.95)" }
                      : { color: "rgba(255,255,255,0.4)" }}
                  >
                    Annual
                    <span className="ml-1.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold" style={{ background: "rgba(52,211,153,0.15)", color: "#34d399" }}>
                      -33%
                    </span>
                  </button>
                </div>
              </div>

              {/* Features grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {PRO_FEATURES.map((feat) => (
                  <div
                    key={feat.label}
                    className="flex items-start gap-3 p-4 rounded-2xl"
                    style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)" }}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #6366f1, #7c3aed)" }}>
                      <feat.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium leading-snug pt-1.5" style={{ color: "rgba(255,255,255,0.75)" }}>{feat.label}</span>
                  </div>
                ))}
              </div>

              {/* Price & CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold" style={{ color: "rgba(255,255,255,0.95)" }}>
                      {billingCycle === "monthly" ? "$4.99" : "$39.99"}
                    </span>
                    <span className="font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                      /{billingCycle === "monthly" ? "month" : "year"}
                    </span>
                  </div>
                  {billingCycle === "annual" && (
                    <p className="text-sm font-semibold mt-1" style={{ color: "#34d399" }}>
                      That&apos;s just $3.33/month. Save $19.89/year.
                    </p>
                  )}
                </div>
                <button
                  onClick={handleProPurchase}
                  disabled={proUnlocked || checkingOut === "pro_monthly" || checkingOut === "pro_annual"}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-white font-bold text-base transition-all active:scale-[0.97] disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg, #6366f1, #7c3aed)", boxShadow: "0 8px 24px rgba(99,102,241,0.4)" }}
                >
                  {proUnlocked
                    ? "Pro Active"
                    : (checkingOut === "pro_monthly" || checkingOut === "pro_annual")
                      ? "Redirecting..."
                      : billingCycle === "monthly"
                        ? "Subscribe Monthly"
                        : "Subscribe Annually (Save 33%)"}
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════════════
           SECTION 3: How to Earn Free Tokens
           ══════════════════════════════════════════════════════════════════════ */}
        <motion.section {...fadeUp} transition={{ delay: 0.3 }} className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #10b981, #0d9488)", boxShadow: "0 4px 16px rgba(16,185,129,0.3)" }}>
              <Gift className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.95)" }}>How to Earn Free Tokens</h2>
          </div>
          <p className="text-sm mb-6 ml-[52px]" style={{ color: "rgba(255,255,255,0.45)" }}>
            No purchase needed. Earn tokens just by learning and staying consistent.
          </p>

          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="flex gap-4"
          >
            {FREE_EARN.map((item) => (
              <motion.div
                key={item.label}
                variants={cardItem}
                whileHover={{ y: -4 }}
                className="relative flex-1 rounded-3xl p-4 transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
              >
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3`}>
                  <item.icon className="w-4 h-4 text-white" />
                </div>

                <p className="text-xs font-medium mb-2 leading-snug" style={{ color: "rgba(255,255,255,0.78)" }}>{item.label}</p>

                <div className="flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5" style={{ color: "#fbbf24" }} />
                  <span className="text-base font-extrabold" style={{ background: "linear-gradient(135deg, #fbbf24, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    +{item.tokens}
                  </span>
                  <span className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {item.isBonus ? "bonus" : "tokens"}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════════════
           SECTION 4: Premium Items Preview
           ══════════════════════════════════════════════════════════════════════ */}
        <motion.section {...fadeUp} transition={{ delay: 0.4 }} className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", boxShadow: "0 4px 16px rgba(168,85,247,0.3)" }}>
              <Gem className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.95)" }}>Premium Items Preview</h2>
          </div>
          <p className="text-sm mb-6 ml-[52px]" style={{ color: "rgba(255,255,255,0.45)" }}>
            Exclusive items available with Thyself Pro. Subscribe to unlock them all.
          </p>

          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {PREMIUM_ITEMS.map((item) => (
              <motion.div
                key={item.name}
                variants={cardItem}
                whileHover={{ y: -4 }}
                className="relative group rounded-3xl p-5 overflow-hidden"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
              >
                {/* Locked overlay */}
                <div className="absolute inset-0 backdrop-blur-[2px] flex flex-col items-center justify-center z-10 transition-opacity" style={{ background: "rgba(10,5,25,0.55)" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)", boxShadow: "0 4px 16px rgba(124,58,237,0.4)" }}>
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-white text-[10px] font-bold uppercase tracking-wider" style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}>
                    Pro
                  </span>
                </div>

                {/* Card content */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: "rgba(168,85,247,0.15)" }}>
                    <item.icon className="w-6 h-6" style={{ color: "#c084fc" }} />
                  </div>
                  <h4 className="font-bold text-sm mb-0.5" style={{ color: "rgba(255,255,255,0.8)" }}>{item.name}</h4>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{item.type}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════════════
           Disclaimer
           ══════════════════════════════════════════════════════════════════════ */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.5 }}
          className="text-center py-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
            <Shield className="w-4 h-4" style={{ color: "rgba(255,255,255,0.35)" }} />
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              <span className="font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>This is a demo.</span> No real payments are processed and no charges will be made.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Next Step */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <NextStepBanner
          href="/game"
          label="Back to your journey"
          sublabel="Track XP, maintain your streak, and level up"
          icon={<Gamepad2 className="w-5 h-5" />}
          color="#10b981"
        />
      </div>

      {/* Purchase toast */}
      <AnimatePresence>
        {purchaseToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl bg-slate-800 text-white text-sm font-medium shadow-xl"
          >
            {purchaseToast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
