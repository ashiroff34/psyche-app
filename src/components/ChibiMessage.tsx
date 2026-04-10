"use client";

// Chibi Narration / Parasocial Voice (Horton & Wohl 1956)
//
// Parasocial attachment is built through *specificity*, not generic warmth.
// Finch's 40%+ D30 retention lift comes from the bird *talking* to the user
// with personal callbacks. The chibi should reference something specific the
// user did. Never fake memory, only reference things in localStorage.
//
// This component reads profile + game state + recent activity from
// localStorage and generates a specific, warm, type-aware message.
// Shows as a small speech bubble below the chibi in HubView.

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "@/hooks/useProfile";

interface Props {
  enneagramType: number;
  className?: string;
}

// Chibi message library. Each function takes profile data and returns
// a specific message or null (skip). First non-null wins.
type MessageGenerator = (data: {
  type: number;
  chibiName: string;
  streak: number;
  daysSinceLastVisit: number;
  displayName: string | null;
  totalDays: number;
  stateCheckIns: number;
  assessmentCount: number;
}) => string | null;

const GENERATORS: MessageGenerator[] = [
  // Streak milestone
  (d) => {
    if (d.streak === 7) return `${d.chibiName} is proud. Seven days, ${d.displayName ?? "friend"}.`;
    if (d.streak === 30) return `Thirty days. ${d.chibiName} has never been this healthy.`;
    return null;
  },
  // After a break
  (d) => {
    if (d.daysSinceLastVisit >= 3 && d.daysSinceLastVisit < 14)
      return `${d.chibiName} noticed you were gone. Glad you're back.`;
    if (d.daysSinceLastVisit >= 14)
      return `${d.chibiName} kept your place. No judgment, just glad to see you.`;
    return null;
  },
  // State check-in milestone
  (d) => {
    if (d.stateCheckIns === 7) return `Seven state check-ins. ${d.chibiName} can start to see patterns now.`;
    if (d.stateCheckIns >= 14 && d.stateCheckIns % 7 === 0) return `${d.stateCheckIns} check-ins. ${d.chibiName} knows you better than most apps ever will.`;
    return null;
  },
  // Assessment encouragement
  (d) => {
    if (d.assessmentCount === 1) return `One assessment down. ${d.chibiName} wants to know more.`;
    if (d.assessmentCount === 3) return `Three assessments. The triangulation is getting interesting.`;
    return null;
  },
  // Type-specific daily wisdom (rotates by day)
  (d) => {
    const DAILY_WISDOM: Record<number, string[]> = {
      1: ["Perfection is a compass, not a destination.", "Good enough is a radical act."],
      2: ["You are allowed to need things directly.", "Helping is not love. Love is love."],
      3: ["Rest is not failure.", "Who are you when you stop performing?"],
      4: ["Ordinary is not a failure of depth.", "The longing is the wound, not the answer."],
      5: ["Being reachable is a practice.", "Give one thing away today."],
      6: ["The worst case is not the most likely.", "You know more than you trust."],
      7: ["Staying is also freedom.", "The next thing is not automatically better."],
      8: ["Softness is precision.", "The soft part is the point."],
      9: ["Your voice belongs in the room.", "Choosing is not the same as losing."],
    };
    const lines = DAILY_WISDOM[d.type] ?? [];
    if (!lines.length) return null;
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return `${d.chibiName} says: "${lines[dayOfYear % lines.length]}"`;
  },
];

export default function ChibiMessage({ enneagramType, className }: Props) {
  const { profile } = useProfile();
  const [message, setMessage] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Collect data
    const chibiName = localStorage.getItem("psyche-chibi-name") ?? "Your chibi";
    const gsRaw = localStorage.getItem("psyche-game-state");
    const gs = gsRaw ? JSON.parse(gsRaw) : {};
    const stateHistoryRaw = localStorage.getItem("psyche-state-history");
    const stateHistory = stateHistoryRaw ? JSON.parse(stateHistoryRaw) : [];
    const streak = gs.streakCount ?? gs.streak ?? 0;
    const totalDays = gs.totalDaysVisited ?? 0;
    const lastVisit = gs.lastActivityDate ?? gs.lastVisitDate;
    const daysSinceLastVisit = lastVisit
      ? Math.floor((Date.now() - new Date(lastVisit).getTime()) / 86400000)
      : 0;

    const data = {
      type: enneagramType,
      chibiName,
      streak,
      daysSinceLastVisit,
      displayName: profile.displayName ?? null,
      totalDays,
      stateCheckIns: stateHistory.length,
      assessmentCount: profile.assessmentsTaken?.length ?? 0,
    };

    // First non-null message wins
    for (const gen of GENERATORS) {
      const msg = gen(data);
      if (msg) {
        setMessage(msg);
        return;
      }
    }
    // Fallback: always show something
    setMessage(`${chibiName} is here.`);
  }, [enneagramType, profile]);

  if (dismissed || !message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        className={`px-4 py-2.5 rounded-2xl relative ${className ?? ""}`}
        style={{
          background: "rgba(139,92,246,0.08)",
          border: "1px solid rgba(139,92,246,0.2)",
        }}
        onClick={() => setDismissed(true)}
      >
        <p className="text-xs leading-snug" style={{ color: "rgba(255,255,255,0.82)" }}>
          {message}
        </p>
        <span className="absolute top-1.5 right-2.5 text-[9px] opacity-40">tap to dismiss</span>
      </motion.div>
    </AnimatePresence>
  );
}
