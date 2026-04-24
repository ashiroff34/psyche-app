"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  visible: boolean;
  streak: number;
  freezeTokens: number;
  onSave: () => void;      // consume a freeze token
  onLetBreak: () => void;  // acknowledge, reset streak
  onDismiss: () => void;   // close without deciding (e.g. still have time)
}

export default function StreakSaver({ visible, streak, freezeTokens, onSave, onLetBreak, onDismiss }: Props) {
  const hasFreezes = freezeTokens > 0;

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
                {hasFreezes
                  ? "Use a streak save to protect it. You can earn more by staying active."
                  : "You missed yesterday. Your streak will reset at midnight unless you complete a lesson now."}
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
