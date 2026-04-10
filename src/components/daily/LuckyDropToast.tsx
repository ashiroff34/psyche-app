"use client";

// Lucky Drop Toast. Variable reinforcement reveal.
// Skinner partial schedule: not every action is rewarded, and the reward
// amount varies. Self-compassion framing only.

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, Sparkles } from "lucide-react";
import { rollLuckyDrop, isBonusDayToday } from "@/lib/variable-rewards";

interface Props {
  actionId: string; // unique per day, e.g., "warmup-complete", "reading-done"
  onDismiss?: () => void;
}

function addTokens(n: number) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem("psyche-game-state");
    const gs = raw ? JSON.parse(raw) : {};
    const current = (gs.tokens as number) ?? 0;
    localStorage.setItem("psyche-game-state", JSON.stringify({
      ...gs,
      tokens: current + n,
      totalTokensEarned: ((gs.totalTokensEarned as number) ?? 0) + n,
    }));
  } catch {}
}

export default function LuckyDropToast({ actionId, onDismiss }: Props) {
  const [reward, setReward] = useState<{ tokens: number; label: string } | null>(null);

  useEffect(() => {
    const roll = rollLuckyDrop(actionId);
    if (roll.kind === "lucky") {
      const bonus = isBonusDayToday() ? roll.tokens * 2 : roll.tokens;
      addTokens(bonus);
      setReward({ tokens: bonus, label: roll.label });
      const t = setTimeout(() => {
        setReward(null);
        onDismiss?.();
      }, 4500);
      return () => clearTimeout(t);
    }
  }, [actionId, onDismiss]);

  return (
    <AnimatePresence>
      {reward && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(234,179,8,0.95), rgba(217,70,239,0.9))",
            border: "1px solid rgba(255,255,255,0.3)",
            maxWidth: "90vw",
          }}
        >
          <motion.div
            initial={{ rotate: -15 }}
            animate={{ rotate: [0, -15, 15, 0] }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"
          >
            <Sparkles className="w-5 h-5 text-white" />
          </motion.div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/90">
              {reward.label}
            </p>
            <p className="text-base font-bold text-white flex items-center gap-1">
              +{reward.tokens} <Coins className="w-4 h-4" />
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
