"use client";

import { useState } from "react";
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

// ─── Animations ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.05 } },
};

const cardItem = {
  initial: { opacity: 1, y: 0, scale: 1 },
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
  { icon: Eye, label: "Ad-free experience" },
  { icon: Palette, label: "10 exclusive avatar outfits & backgrounds" },
  { icon: Brain, label: "Unlimited AI coaching sessions" },
  { icon: Target, label: "Advanced type analysis reports" },
  { icon: Zap, label: "Priority access to new features" },
  { icon: Coins, label: "500 bonus tokens every month" },
];

const FREE_EARN = [
  { icon: Flame, label: "Complete daily goal", tokens: 15, color: "from-orange-400 to-red-500" },
  { icon: Trophy, label: "Level up (level × 5)", tokens: 5, color: "from-amber-400 to-yellow-500", isBonus: true },
  { icon: Flame, label: "7-day streak bonus", tokens: 25, color: "from-orange-500 to-amber-600", isBonus: true },
  { icon: Star, label: "Unlock a badge", tokens: 10, color: "from-violet-400 to-purple-500" },
  { icon: Crown, label: "Starting bonus", tokens: 50, color: "from-amber-500 to-yellow-600", isBonus: true },
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

export default function StorePage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [purchaseToast, setPurchaseToast] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-slate-50">
      {/* Decorative orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-amber-200/30 to-orange-200/20 blur-3xl" />
        <div className="absolute top-1/3 -left-48 w-80 h-80 rounded-full bg-gradient-to-br from-sky-200/25 to-indigo-200/15 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-gradient-to-br from-purple-200/20 to-rose-200/15 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {/* Back nav */}
        <motion.div {...fadeUp} className="mb-6">
          <Link
            href="/game"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Game
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.div {...fadeUp} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200/60 mb-4">
            <Coins className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-700">Token Store</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-800 mb-3">
            Power Up Your <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Journey</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Get tokens to unlock pets, outfits, and streak freezes &mdash; or go Pro for the ultimate Thyself experience.
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════════
           SECTION 1: Token Packs
           ══════════════════════════════════════════════════════════════════════ */}
        <motion.section {...fadeUp} transition={{ delay: 0.1 }} className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-200/40">
              <Coins className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-800">Token Packs</h2>
          </div>
          <p className="text-slate-500 text-sm mb-6 ml-[52px]">
            In-app currency for pet food, avatar outfits, streak freezes, hints & revivals.
          </p>

          {/* Token uses ribbon */}
          <div className="flex flex-wrap gap-2 mb-8 ml-[52px]">
            {TOKEN_USES.map((u) => (
              <span
                key={u.label}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-amber-100 text-xs font-medium text-slate-600"
              >
                <u.icon className="w-3.5 h-3.5 text-amber-500" />
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
                className={`relative rounded-3xl bg-white/80 backdrop-blur-md border border-white/40 p-6 cursor-pointer shadow-lg ${pack.shadow} transition-shadow hover:shadow-xl`}
              >
                {pack.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-bold tracking-wide uppercase shadow-md shadow-orange-200/60">
                    {pack.badge}
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pack.color} flex items-center justify-center mb-4 shadow-md ${pack.shadow}`}>
                  <pack.icon className="w-7 h-7 text-white" />
                </div>

                {/* Name */}
                <h3 className="font-bold text-slate-800 text-lg mb-1">{pack.name}</h3>

                {/* Token amount */}
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="text-2xl font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                    {pack.tokens.toLocaleString()}
                  </span>
                  <span className="text-sm font-medium text-slate-500">tokens</span>
                </div>

                {/* Bonus */}
                {pack.bonus > 0 && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 mb-3">
                    <Gift className="w-3 h-3 text-emerald-500" />
                    <span className="text-xs font-semibold text-emerald-600">+{pack.bonus} bonus</span>
                  </div>
                )}
                {pack.bonus === 0 && <div className="h-[26px] mb-3" />}

                {/* Price & Buy */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                  <span className="text-xl font-bold text-slate-800">{pack.price}</span>
                  <button
                    onClick={() => {
                      setPurchaseToast(`${pack.name} — payment integration coming soon!`);
                      setTimeout(() => setPurchaseToast(null), 3000);
                    }}
                    className={`px-5 py-2 rounded-xl bg-gradient-to-r ${pack.color} text-white text-sm font-bold shadow-md ${pack.shadow} hover:shadow-lg transition-all active:scale-95`}
                  >
                    Buy
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════════════
           SECTION 2: Premium Subscription — Thyself Pro
           ══════════════════════════════════════════════════════════════════════ */}
        <motion.section {...fadeUp} transition={{ delay: 0.2 }} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200/40">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-800">Thyself Pro</h2>
          </div>

          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-rose-500 rounded-3xl" />
            <div className="relative m-[2px] rounded-[22px] bg-white/95 backdrop-blur-xl p-8 sm:p-10">
              {/* Top banner */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-6 h-6 text-purple-500" />
                    <h3 className="text-2xl font-serif font-bold text-slate-800">Premium Subscription</h3>
                  </div>
                  <p className="text-slate-500">Unlock the full Thyself experience with Pro.</p>
                </div>

                {/* Billing toggle */}
                <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200/60">
                  <button
                    onClick={() => setBillingCycle("monthly")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      billingCycle === "monthly"
                        ? "bg-white text-slate-800 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle("annual")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      billingCycle === "annual"
                        ? "bg-white text-slate-800 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Annual
                    <span className="ml-1.5 px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-600 text-[10px] font-bold">
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
                    className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-br from-indigo-50/60 to-purple-50/40 border border-indigo-100/50"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <feat.icon className="w-4.5 h-4.5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 leading-snug pt-1.5">{feat.label}</span>
                  </div>
                ))}
              </div>

              {/* Price & CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100/50">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-800">
                      {billingCycle === "monthly" ? "$4.99" : "$39.99"}
                    </span>
                    <span className="text-slate-500 font-medium">
                      /{billingCycle === "monthly" ? "month" : "year"}
                    </span>
                  </div>
                  {billingCycle === "annual" && (
                    <p className="text-sm text-emerald-600 font-semibold mt-1">
                      That&apos;s just $3.33/month &mdash; save $19.89/year
                    </p>
                  )}
                </div>
                <button className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-base shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:shadow-indigo-300/50 transition-all active:scale-[0.97]">
                  {billingCycle === "monthly" ? "Subscribe Monthly" : "Subscribe Annually (Save 33%)"}
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
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200/40">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-800">How to Earn Free Tokens</h2>
          </div>
          <p className="text-slate-500 text-sm mb-6 ml-[52px]">
            No purchase needed &mdash; earn tokens just by learning and staying consistent.
          </p>

          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {FREE_EARN.map((item) => (
              <motion.div
                key={item.label}
                variants={cardItem}
                whileHover={{ y: -4 }}
                className="relative rounded-3xl bg-white/80 backdrop-blur-md border border-white/40 p-5 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 shadow-sm`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>

                <p className="text-sm font-medium text-slate-700 mb-2 leading-snug">{item.label}</p>

                <div className="flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-amber-500" />
                  <span className="text-lg font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                    +{item.tokens}
                  </span>
                  <span className="text-xs font-medium text-slate-400">
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
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-400 to-rose-500 flex items-center justify-center shadow-lg shadow-purple-200/40">
              <Gem className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-800">Premium Items Preview</h2>
          </div>
          <p className="text-slate-500 text-sm mb-6 ml-[52px]">
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
                className="relative group rounded-3xl bg-white/80 backdrop-blur-md border border-white/40 p-5 shadow-md overflow-hidden"
              >
                {/* Blurred/locked overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100/60 to-slate-200/40 backdrop-blur-[2px] flex flex-col items-center justify-center z-10 transition-opacity group-hover:bg-slate-100/70">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-rose-500 flex items-center justify-center shadow-lg mb-2">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-rose-500 text-white text-[10px] font-bold uppercase tracking-wider">
                    Pro
                  </span>
                </div>

                {/* Card content (visible beneath blur) */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-rose-100 flex items-center justify-center mb-3">
                    <item.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h4 className="font-bold text-slate-700 text-sm mb-0.5">{item.name}</h4>
                  <p className="text-xs text-slate-400">{item.type}</p>
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
          className="text-center py-8 border-t border-slate-200/60"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100/80 border border-slate-200/60">
            <Shield className="w-4 h-4 text-slate-400" />
            <p className="text-xs text-slate-500">
              <span className="font-semibold">This is a demo.</span> This store page is a prototype &mdash; no real payments are processed and no charges will be made.
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
            initial={{ opacity: 1, y: 0 }}
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
