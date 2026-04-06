"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Zap, Brain, ArrowRight, Layers, Eye, Activity } from "lucide-react";
import Link from "next/link";

const UNLOCK_KEY = "psyche-cognitive-unlocked";
const UNLOCK_COST = 300;

const FEATURES = [
  { icon: Brain, label: "8 cognitive function deep-dives", sub: "Se, Si, Ne, Ni, Fe, Fi, Te, Ti" },
  { icon: Layers, label: "Your full function stack", sub: "Dominant → Tertiary → Inferior → Shadow" },
  { icon: Eye, label: "Shadow & grip states", sub: "How stress distorts your perception" },
  { icon: Activity, label: "Function loops explained", sub: "The patterns that keep you stuck" },
];

interface Props {
  children: React.ReactNode;
}

export default function CognitivePremiumGate({ children }: Props) {
  const router = useRouter();
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [spending, setSpending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const isUnlocked = localStorage.getItem(UNLOCK_KEY) === "true";
      setUnlocked(isUnlocked);

      const gsRaw = localStorage.getItem("psyche-game-state");
      const gs = gsRaw ? JSON.parse(gsRaw) : {};
      setTokenBalance(typeof gs.tokens === "number" ? gs.tokens : 0);
    } catch {
      setUnlocked(false);
    }
  }, []);

  const handleUnlock = () => {
    if (tokenBalance < UNLOCK_COST) {
      setError(`You need ${UNLOCK_COST - tokenBalance} more tokens. Earn them through daily practice or get them in the Store.`);
      return;
    }

    setSpending(true);
    try {
      const gsRaw = localStorage.getItem("psyche-game-state");
      const gs = gsRaw ? JSON.parse(gsRaw) : {};
      const newBalance = (typeof gs.tokens === "number" ? gs.tokens : 0) - UNLOCK_COST;
      localStorage.setItem("psyche-game-state", JSON.stringify({ ...gs, tokens: newBalance }));
      localStorage.setItem(UNLOCK_KEY, "true");
      setUnlocked(true);
    } catch {
      setError("Something went wrong. Please try again.");
      setSpending(false);
    }
  };

  // Loading state
  if (unlocked === null) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f0a1e" }}>
        <div className="w-6 h-6 rounded-full border-2 border-violet-600 border-t-violet-300 animate-spin" />
      </div>
    );
  }

  // Unlocked — show content
  if (unlocked) return <>{children}</>;

  // Paywall
  const canAfford = tokenBalance >= UNLOCK_COST;

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#0f0a1e" }}>
      {/* Ambient orbs */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-80px] left-[-60px] w-96 h-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-[-40px] w-80 h-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(217,70,239,0.10) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-md mx-auto px-5 py-12 flex flex-col items-center text-center">

        {/* Lock badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 16, stiffness: 280 }}
          className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 relative"
          style={{
            background: "linear-gradient(135deg, rgba(109,40,217,0.25), rgba(79,70,229,0.2))",
            border: "1px solid rgba(139,92,246,0.35)",
            boxShadow: "0 0 40px rgba(139,92,246,0.25)",
          }}
        >
          <Lock className="w-9 h-9 text-violet-400" />
          <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center">
            <span className="text-[9px] font-black text-amber-900">$</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
            style={{ color: "rgba(167,139,250,0.65)" }}>
            Premium Section
          </p>
          <h1 className="text-3xl font-serif font-bold mb-3" style={{ color: "rgba(255,255,255,0.95)" }}>
            Cognitive Functions
          </h1>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
            Jung's 8 mental functions, your unique stack, shadow states, and grip experiences. The deepest layer of the system.
          </p>
        </motion.div>

        {/* Feature list */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="w-full space-y-3 mb-8"
        >
          {FEATURES.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-left"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(139,92,246,0.15)" }}>
                <Icon className="w-4 h-4 text-violet-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-snug" style={{ color: "rgba(255,255,255,0.85)" }}>
                  {label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{sub}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Token balance display */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          className="w-full"
        >
          <div className="flex items-center justify-between px-4 py-3 rounded-xl mb-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Your token balance</span>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-sm font-bold text-amber-400">{tokenBalance.toLocaleString()}</span>
            </div>
          </div>

          {error && (
            <p className="text-xs text-rose-400 text-center mb-3 leading-snug">{error}</p>
          )}

          {/* Unlock CTA */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleUnlock}
            disabled={spending}
            className="w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2 mb-3 transition-all"
            style={{
              background: canAfford
                ? "linear-gradient(135deg, #7c3aed, #4f46e5)"
                : "rgba(255,255,255,0.06)",
              boxShadow: canAfford ? "0 8px 28px rgba(124,58,237,0.45)" : "none",
              color: canAfford ? "#fff" : "rgba(255,255,255,0.35)",
              cursor: canAfford ? "pointer" : "not-allowed",
            }}
          >
            {spending ? (
              <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Unlock for {UNLOCK_COST} tokens
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>

          {!canAfford && (
            <Link href="/store"
              className="block w-full text-center py-3 rounded-2xl text-sm font-semibold transition-all"
              style={{
                background: "rgba(245,158,11,0.12)",
                border: "1px solid rgba(245,158,11,0.25)",
                color: "#fcd34d",
              }}
            >
              Get tokens in the Store →
            </Link>
          )}

          <Link href="/daily"
            className="block text-center text-xs mt-4 transition-colors"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Back to daily practice
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
