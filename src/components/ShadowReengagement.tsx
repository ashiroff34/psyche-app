"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { getLocalDateKey } from "@/lib/date-utils";

/* ─────────────────────────────────────────────────────────────────────────────
   STORAGE KEYS
───────────────────────────────────────────────────────────────────────────── */
const KEY_LAST_ACTIVE = "psyche-last-active-date";
const shownKey = (dateKey: string) => `psyche-shadow-reengagement-shown-${dateKey}`;

// Use canonical date utility — avoids UTC midnight bug
const getDateKey = getLocalDateKey;

/* ─────────────────────────────────────────────────────────────────────────────
   EXPORTED UTILITIES
───────────────────────────────────────────────────────────────────────────── */
export function shouldShowShadowReengagement(): boolean {
  try {
    const today = getDateKey();
    if (localStorage.getItem(shownKey(today))) return false;
    const lastActive = localStorage.getItem(KEY_LAST_ACTIVE);
    if (!lastActive) return false;
    const last = new Date(lastActive).getTime();
    const now = new Date(today).getTime();
    const diffDays = Math.floor((now - last) / 86400000);
    return diffDays >= 3;
  } catch {
    return false;
  }
}

export function markActive(): void {
  try {
    localStorage.setItem(KEY_LAST_ACTIVE, getLocalDateKey());
  } catch {}
}

/* ─────────────────────────────────────────────────────────────────────────────
   SHADOW PROMPTS BY ENNEAGRAM TYPE
───────────────────────────────────────────────────────────────────────────── */
const shadowPrompts: Record<number, string> = {
  1: "While you were away, your inner critic didn't rest. What standard have you been holding yourself to that you haven't examined?",
  2: "Your shadow noticed who didn't reach out while you were gone. What need of yours went unspoken?",
  3: "You stepped away from the performance. What did it feel like to not be achieving anything?",
  4: "The absence created space. What ordinary feeling did you avoid by being away?",
  5: "You retreated further than usual. What were you protecting yourself from knowing?",
  6: "The uncertainty of being away. did it feel like freedom or like something was about to go wrong?",
  7: "You were elsewhere, chasing something. What were you running from this time?",
  8: "You went quiet. What vulnerability were you refusing to show?",
  9: "You merged with the drift. What priority of yours dissolved while you weren't looking?",
};

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */
interface ShadowReengagementProps {
  typeNumber: number;
  onBeginSession: () => void;
  onDismiss: () => void;
}

export default function ShadowReengagement({
  typeNumber,
  onBeginSession,
  onDismiss,
}: ShadowReengagementProps) {
  const [daysAway, setDaysAway] = useState(3);

  useEffect(() => {
    try {
      const lastActive = localStorage.getItem(KEY_LAST_ACTIVE);
      if (lastActive) {
        const last = new Date(lastActive).getTime();
        const today = new Date(getDateKey()).getTime();
        const diff = Math.floor((today - last) / 86400000);
        if (diff > 0) setDaysAway(diff);
      }
    } catch {}
  }, []);

  const prompt = shadowPrompts[typeNumber] ?? shadowPrompts[1];
  const dateKey = getDateKey();

  function handleBeginSession() {
    try {
      // Mark modal as shown for today
      localStorage.setItem(shownKey(dateKey), "1");
      // Mark free shadow session for today
      localStorage.setItem("psyche-shadow-free-session", dateKey);
      // Award 10 tokens via psyche-game-state
      const raw = localStorage.getItem("psyche-game-state");
      if (raw) {
        const state = JSON.parse(raw);
        state.tokens = (state.tokens ?? 0) + 10;
        state.totalTokensEarned = (state.totalTokensEarned ?? 0) + 10;
        localStorage.setItem("psyche-game-state", JSON.stringify(state));
      }
    } catch {}
    onBeginSession();
  }

  function handleDismiss() {
    try {
      localStorage.setItem(shownKey(dateKey), "1");
    } catch {}
    onDismiss();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9990,
        background: "rgba(10,5,20,0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      {/* Radial glow behind the card */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(109,40,217,0.22) 0%, rgba(76,29,149,0.10) 45%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          background: "linear-gradient(160deg, #1a1030 0%, #0f0a1e 60%, #130d24 100%)",
          border: "1px solid rgba(109,40,217,0.28)",
          borderRadius: 20,
          padding: "40px 32px 36px",
          maxWidth: 440,
          width: "100%",
          textAlign: "center",
          boxShadow:
            "0 0 0 1px rgba(109,40,217,0.12), 0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Icon */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "rgba(109,40,217,0.18)",
            border: "1px solid rgba(109,40,217,0.35)",
            marginBottom: 20,
          }}
        >
          <Eye size={24} color="rgba(167,139,250,0.9)" strokeWidth={1.5} />
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 26,
            fontWeight: 600,
            color: "#ffffff",
            margin: "0 0 8px",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
          }}
        >
          Your shadow missed you.
        </h2>

        {/* Days away */}
        <p
          style={{
            fontSize: 13,
            color: "rgba(167,139,250,0.45)",
            margin: "0 0 28px",
            letterSpacing: "0.02em",
          }}
        >
          You&apos;ve been away for {daysAway} {daysAway === 1 ? "day" : "days"}
        </p>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(109,40,217,0.3), transparent)",
            margin: "0 0 24px",
          }}
        />

        {/* Type-specific shadow prompt */}
        <p
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 15,
            fontStyle: "italic",
            color: "rgba(220,210,255,0.68)",
            lineHeight: 1.65,
            margin: "0 0 36px",
          }}
        >
          &ldquo;{prompt}&rdquo;
        </p>

        {/* Begin session button */}
        <button
          onClick={handleBeginSession}
          style={{
            display: "block",
            width: "100%",
            padding: "14px 24px",
            borderRadius: 12,
            background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)",
            border: "none",
            color: "#ffffff",
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "0.01em",
            cursor: "pointer",
            boxShadow:
              "0 4px 16px rgba(109,40,217,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
            marginBottom: 14,
            transition: "opacity 0.15s ease, transform 0.15s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "1";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          }}
        >
          Begin a shadow session. free
        </button>

        {/* Dismiss */}
        <button
          onClick={handleDismiss}
          style={{
            background: "none",
            border: "none",
            color: "rgba(167,139,250,0.45)",
            fontSize: 13,
            cursor: "pointer",
            padding: "4px 8px",
            transition: "color 0.15s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(167,139,250,0.75)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(167,139,250,0.45)";
          }}
        >
          Not now
        </button>
      </motion.div>
    </motion.div>
  );
}
