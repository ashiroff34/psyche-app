"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  streak: number | null;  // null = not showing
  onDismiss: () => void;
}

const BONUS_TOKENS: Record<number, number> = {
  7: 20,
  14: 30,
  30: 50,
  60: 75,
  100: 100,
  365: 250,
};

function bonusFor(streak: number): number {
  // Find the highest milestone that applies
  const milestones = Object.keys(BONUS_TOKENS)
    .map(Number)
    .sort((a, b) => b - a);
  for (const m of milestones) {
    if (streak >= m) return BONUS_TOKENS[m];
  }
  return 20;
}

export default function MilestoneCelebration({ streak, onDismiss }: Props) {
  return (
    <AnimatePresence>
      {streak !== null && (
        <motion.div
          key="milestone-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 70,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
              background: "#1a1035",
              border: "1px solid rgba(251,191,36,0.3)",
              borderRadius: "20px",
              padding: "2rem 1.75rem",
              maxWidth: "320px",
              width: "100%",
              textAlign: "center",
            }}
          >
            {/* Flame visual */}
            <motion.div
              animate={{ scale: [1, 1.12, 1], rotate: [-3, 3, -3] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ fontSize: "3.5rem", marginBottom: "1rem", lineHeight: 1 }}
            >
              (*)
            </motion.div>

            {/* Headline */}
            <h2 style={{
              fontSize: "2rem",
              fontWeight: 900,
              color: "#fbbf24",
              lineHeight: 1.1,
              marginBottom: "0.5rem",
            }}>
              {streak} Days
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
              Incredible consistency.
            </p>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem", marginBottom: "1.5rem", lineHeight: 1.5 }}>
              You&apos;ve built a real habit. This is how growth works.
            </p>

            {/* Bonus tokens */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "rgba(251,191,36,0.1)",
              border: "1px solid rgba(251,191,36,0.25)",
              borderRadius: "999px",
              padding: "0.4rem 1rem",
              marginBottom: "1.5rem",
            }}>
              <span style={{ color: "#fbbf24", fontWeight: 700, fontSize: "0.9rem" }}>
                +{bonusFor(streak)} bonus tokens
              </span>
            </div>

            {/* Dismiss */}
            <button
              onClick={onDismiss}
              style={{
                width: "100%",
                padding: "0.85rem",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #d97706, #f59e0b)",
                boxShadow: "0 4px 20px rgba(245,158,11,0.35)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Keep going
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
