"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  visible: boolean;
  streak: number;
  freezeTokens: number;
  enneagramType?: number;
  onSave: () => void;      // consume a freeze token
  onLetBreak: () => void;  // acknowledge, reset streak
  onDismiss: () => void;   // close without deciding (e.g. still have time)
}

// ── Type-aware loss-aversion copy ────────────────────────────────────────
// The streak-saver modal is the highest-emotion moment in the retention
// loop, so the framing that lands differs sharply by core motivation:
// a Nine disengages from urgency, an Eight disengages from being nudged.
// Motivations follow Riso-Hudson: 1 correctness, 2 connection,
// 3 achievement, 4 depth, 5 autonomy, 6 security, 7 possibility,
// 8 control, 9 ease.

interface SaverCopy {
  withFreeze: string;
  withoutFreeze: string;
}

const TYPE_SAVER_COPY: Record<number, SaverCopy> = {
  1: {
    withFreeze: "Use a streak save to keep the record intact. You can earn more by staying active.",
    withoutFreeze: "You missed yesterday. One lesson before midnight keeps the record intact.",
  },
  2: {
    withFreeze: "Use a streak save. This is the practice you keep for yourself.",
    withoutFreeze: "You missed yesterday. One lesson before midnight, for you, not for anyone else.",
  },
  3: {
    withFreeze: "Use a streak save and keep the run alive. You can earn more by staying active.",
    withoutFreeze: "You missed yesterday. One lesson before midnight and the run stays alive.",
  },
  4: {
    withFreeze: "Use a streak save. What you have been building is worth keeping.",
    withoutFreeze: "You missed yesterday. That happens. One lesson before midnight and the thread holds.",
  },
  5: {
    withFreeze: "A streak save costs one token and protects the streak. Your call.",
    withoutFreeze: "You missed yesterday. The streak resets at midnight unless you complete a lesson.",
  },
  6: {
    withFreeze: "Use a streak save. You have a backup for exactly this.",
    withoutFreeze: "You missed yesterday. One lesson before midnight and you are covered.",
  },
  7: {
    withFreeze: "Use a streak save and keep the run going. Plenty more ahead.",
    withoutFreeze: "You missed yesterday. One quick lesson before midnight and you are back in it.",
  },
  8: {
    withFreeze: "Use a streak save. Your streak, your call.",
    withoutFreeze: "You missed yesterday. Complete a lesson before midnight or it resets. Your call.",
  },
  9: {
    withFreeze: "Use a streak save. It is already there waiting, no pressure.",
    withoutFreeze: "You missed yesterday. One small lesson keeps it going. No pressure either way.",
  },
};

const DEFAULT_SAVER_COPY: SaverCopy = {
  withFreeze: "Use a streak save to protect it. You can earn more by staying active.",
  withoutFreeze: "You missed yesterday. Your streak will reset at midnight unless you complete a lesson now.",
};

export default function StreakSaver({ visible, streak, freezeTokens, enneagramType, onSave, onLetBreak, onDismiss }: Props) {
  const hasFreezes = freezeTokens > 0;
  const copy = (enneagramType ? TYPE_SAVER_COPY[enneagramType] : undefined) ?? DEFAULT_SAVER_COPY;
  const body = hasFreezes ? copy.withFreeze : copy.withoutFreeze;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="streak-saver-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 65,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(5px)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            style={{
              background: "#1a1035",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "20px",
              padding: "1.75rem",
              width: "100%",
              maxWidth: "380px",
              marginBottom: "env(safe-area-inset-bottom, 1rem)",
            }}
          >
            {/* Icon + headline */}
            <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.65rem" }}>(*)</div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "rgba(255,255,255,0.95)", marginBottom: "0.4rem" }}>
                Your {streak}-day streak is at risk
              </h2>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                {body}
              </p>
            </div>

            {/* Freeze token count badge */}
            {hasFreezes && (
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                background: "rgba(234,179,8,0.1)",
                border: "1px solid rgba(234,179,8,0.2)",
                borderRadius: "999px",
                padding: "0.35rem 0.9rem",
                marginBottom: "1.25rem",
              }}>
                <span style={{ color: "#fbbf24", fontSize: "0.8rem", fontWeight: 600 }}>
                  {freezeTokens} streak save{freezeTokens !== 1 ? "s" : ""} available
                </span>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {hasFreezes && (
                <button
                  onClick={onSave}
                  style={{
                    width: "100%",
                    padding: "0.85rem",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #d97706, #f59e0b)",
                    boxShadow: "0 4px 16px rgba(245,158,11,0.3)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Use a streak save
                </button>
              )}

              <button
                onClick={onLetBreak}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "14px",
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "rgba(252,165,165,0.9)",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                Let it break
              </button>

              <button
                onClick={onDismiss}
                style={{
                  width: "100%",
                  padding: "0.65rem",
                  background: "transparent",
                  border: "none",
                  color: "rgba(255,255,255,0.3)",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
