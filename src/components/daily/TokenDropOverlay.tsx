"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TokenDrop {
  amount: number;
  tier: "common" | "rare" | "epic";
}

interface Props {
  drop: TokenDrop | null;
  onClaim: (amount: number) => void;
}

const TIER_CONFIG = {
  common: {
    label: "Lucky find!",
    chest: "🎁",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.4)",
    gradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
  },
  rare: {
    label: "Lucky Drop! 💎",
    chest: "💎",
    color: "#0ea5e9",
    glow: "rgba(14,165,233,0.5)",
    gradient: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
  },
  epic: {
    label: "JACKPOT! 🌟",
    chest: "🌟",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.6)",
    gradient: "linear-gradient(135deg, #f59e0b, #fcd34d)",
  },
};

export function rollTokenDrop(sessionsSince: number): TokenDrop | null {
  const dropChance = sessionsSince >= 3 ? 0.6 : 0.4;
  if (Math.random() > dropChance) return null;

  const tierRoll = Math.random();
  if (tierRoll < 0.1) {
    // Epic (10%)
    const amount = Math.floor(Math.random() * 26) + 75; // 75–100
    return { amount, tier: "epic" };
  } else if (tierRoll < 0.3) {
    // Rare (20%)
    const amount = Math.floor(Math.random() * 16) + 25; // 25–40
    return { amount, tier: "rare" };
  } else {
    // Common (70%)
    const amount = Math.floor(Math.random() * 11) + 5; // 5–15
    return { amount, tier: "common" };
  }
}

export default function TokenDropOverlay({ drop, onClaim }: Props) {
  const [opened, setOpened] = useState(false);
  const [claimed, setClaimed] = useState(false);

  // Reset when a new drop appears
  useEffect(() => {
    if (drop) {
      setOpened(false);
      setClaimed(false);
    }
  }, [drop]);

  if (!drop) return null;

  const cfg = TIER_CONFIG[drop.tier];

  const handleTap = () => {
    if (opened || claimed) return;
    setOpened(true);
    setTimeout(() => {
      setClaimed(true);
      onClaim(drop.amount);
    }, 900);
  };

  return (
    <AnimatePresence>
      {!claimed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end justify-center pb-32 px-6"
          style={{ pointerEvents: "none" }}
        >
          {/* Backdrop blur only on epic/rare */}
          {drop.tier !== "common" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
              style={{ pointerEvents: "auto" }}
            />
          )}

          <motion.div
            initial={{ y: 80, scale: 0.7, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 18, stiffness: 280 }}
            className="relative z-10 flex flex-col items-center"
            style={{ pointerEvents: "auto" }}
          >
            {/* Glow ring */}
            <motion.div
              animate={opened ? { scale: [1, 2.5], opacity: [0.7, 0] } : { scale: [1, 1.08, 1] }}
              transition={opened
                ? { duration: 0.5, ease: "easeOut" }
                : { repeat: Infinity, duration: 1.6, ease: "easeInOut" }
              }
              className="absolute inset-0 rounded-full"
              style={{ background: cfg.glow, filter: `blur(20px)`, zIndex: -1 }}
            />

            {/* Chest button */}
            {!opened ? (
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={handleTap}
                className="flex flex-col items-center gap-2"
              >
                <motion.div
                  animate={{ rotate: [-4, 4, -4] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl shadow-2xl"
                  style={{
                    background: cfg.gradient,
                    boxShadow: `0 8px 32px ${cfg.glow}`,
                  }}
                >
                  🎁
                </motion.div>
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  className="text-sm font-bold text-white px-3 py-1 rounded-full"
                  style={{ background: cfg.gradient }}
                >
                  Tap to open!
                </motion.div>
              </motion.button>
            ) : (
              /* Opened state — burst + reveal */
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 14, stiffness: 260 }}
                className="flex flex-col items-center gap-2"
              >
                {/* Burst particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                    animate={{
                      x: Math.cos((i / 8) * Math.PI * 2) * 60,
                      y: Math.sin((i / 8) * Math.PI * 2) * 60,
                      scale: 0,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute w-3 h-3 rounded-full"
                    style={{ background: cfg.color }}
                  />
                ))}

                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl shadow-2xl"
                  style={{
                    background: cfg.gradient,
                    boxShadow: `0 8px 32px ${cfg.glow}`,
                  }}
                >
                  {cfg.chest}
                </div>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="flex flex-col items-center gap-0.5"
                >
                  <span className="text-3xl font-black text-white"
                    style={{ textShadow: `0 2px 12px ${cfg.glow}` }}>
                    +{drop.amount} 🪙
                  </span>
                  <span className="text-sm font-bold text-white/90">{cfg.label}</span>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
