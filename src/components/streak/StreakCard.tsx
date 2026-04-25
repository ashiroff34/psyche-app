"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { TYPE_COLORS } from "@/data/enneagram";
import { scheduleStreakWarning } from "@/lib/capacitor-notifications";

interface Props {
  streak: number;
  longest: number;
  freezeTokens: number;
  enneagramType?: number;
  /** If true, the user already completed today's activity — no streak warning needed */
  dailyCompleted?: boolean;
  /** Optional click handler — e.g. open the freeze shop */
  onClick?: () => void;
}

export default function StreakCard({ streak, longest, freezeTokens, enneagramType, dailyCompleted, onClick }: Props) {
  const flameColor = enneagramType ? (TYPE_COLORS[enneagramType] ?? "#f59e0b") : "#f59e0b";
  const prevStreak = useRef(streak);

  // Spring-animate the count on increment
  const springVal = useSpring(streak, { stiffness: 300, damping: 30 });
  const display = useTransform(springVal, (v) => Math.round(v));

  useEffect(() => {
    if (streak !== prevStreak.current) {
      springVal.set(streak);
      prevStreak.current = streak;
    }
  }, [streak, springVal]);

  const atRisk = streak > 0 && new Date().getHours() >= 18;

  // Fire a one-time evening push notification when streak becomes at-risk
  useEffect(() => {
    if (!atRisk || dailyCompleted) return;
    // scheduleStreakWarning deduplicates via localStorage (once per calendar day)
    scheduleStreakWarning(streak).catch(() => undefined);
  }, [atRisk, dailyCompleted, streak]);

  return (
    <motion.div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") onClick(); } : undefined}
      whileTap={onClick ? { scale: 0.97 } : undefined}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${atRisk ? "rgba(239,68,68,0.35)" : "rgba(255,255,255,0.09)"}`,
        borderRadius: "16px",
        padding: "1.1rem 1.25rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        cursor: onClick ? "pointer" : "default",
        userSelect: "none",
      }}
    >
      {/* Flame icon */}
      <motion.div
        animate={streak > 0 ? { scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          fontSize: "2.2rem",
          lineHeight: 1,
          filter: streak === 0 ? "grayscale(1) opacity(0.4)" : undefined,
        }}
      >
        {streak === 0 ? "(*)" : "(*)"}
      </motion.div>

      {/* Main count + label */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.35rem" }}>
          <motion.span
            style={{
              fontSize: "1.8rem",
              fontWeight: 800,
              color: streak === 0 ? "rgba(255,255,255,0.25)" : atRisk ? "#fca5a5" : flameColor,
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {display}
          </motion.span>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: atRisk ? "rgba(239,68,68,0.8)" : "rgba(255,255,255,0.5)" }}>
            {atRisk && streak > 0 ? "at risk tonight" : "day streak"}
          </span>
        </div>

        <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginTop: "0.2rem", margin: "0.2rem 0 0" }}>
          best: {longest} day{longest !== 1 ? "s" : ""}
          {freezeTokens > 0 && (
            <span style={{ marginLeft: "0.75rem", color: "rgba(234,179,8,0.7)" }}>
              {freezeTokens} save{freezeTokens !== 1 ? "s" : ""} available
            </span>
          )}
        </p>
      </div>
    </motion.div>
  );
}
