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
  // Type-specific wisdom with 3 philosophical tiers (Horton & Wohl parasocial)
  // Tier 1 (totalDays < 21): descriptive, friendly
  // Tier 2 (21-70): observational, pattern-calling
  // Tier 3 (70+): philosophical, dis-identification
  (d) => {
    const tier = d.totalDays >= 70 ? 3 : d.totalDays >= 21 ? 2 : 1;
    const TIERED_WISDOM: Record<number, Record<1 | 2 | 3, string[]>> = {
      1: {
        1: ["Perfection is a compass, not a destination.", "Good enough is a radical act."],
        2: ["You corrected something today that didn't need correcting. The critic is loud.", "Your standards are a gift. The suffering is optional."],
        3: ["The inner critic learned your voice so well you think it's yours.", "What if 'good enough' is the harder standard?"],
      },
      2: {
        1: ["You are allowed to need things directly.", "Helping is not love. Love is love."],
        2: ["You gave before anyone asked today. Notice what you hoped to get back.", "Your needs don't disappear when you stop naming them."],
        3: ["Giving without being asked is sometimes taking in disguise.", "Who are you when no one needs you? That person is also real."],
      },
      3: {
        1: ["Rest is not failure.", "Who are you when you stop performing?"],
        2: ["You checked who was watching before you started. The performance runs deep.", "Efficiency is a beautiful way to avoid being present."],
        3: ["The mask fits so well you forgot you put it on.", "What would you do if no one could see you doing it?"],
      },
      4: {
        1: ["Ordinary is not a failure of depth.", "The longing is the wound, not the answer."],
        2: ["You dismissed something ordinary today that actually mattered to you.", "The comparison pulled you away from what was already here."],
        3: ["The ordinary moment you're dismissing contains everything you're searching for.", "What if you're already who you're becoming?"],
      },
      5: {
        1: ["Being reachable is a practice.", "Give one thing away today."],
        2: ["You researched instead of acted today. The preparation loop is running.", "Understanding something is not the same as letting it touch you."],
        3: ["Knowledge hoarded is wisdom refused.", "The boundary that protects you is also the wall."],
      },
      6: {
        1: ["The worst case is not the most likely.", "You know more than you trust."],
        2: ["You scanned for danger in a safe room today. The vigilance doesn't check context.", "Trust isn't certainty. It's acting without it."],
        3: ["Your worst-case rehearsal is loyalty to a danger that already passed.", "The doubt is not protecting you. It is the thing you need protecting from."],
      },
      7: {
        1: ["Staying is also freedom.", "The next thing is not automatically better."],
        2: ["You reached for a new plan to avoid what you were feeling. The escape hatch opened.", "Depth requires the boredom you keep escaping."],
        3: ["Freedom that avoids pain is its own cage.", "The next experience can't give you what this moment is offering."],
      },
      8: {
        1: ["Softness is precision.", "The soft part is the point."],
        2: ["You armored up in a conversation that didn't require it. Notice who you were protecting.", "Control is vulnerability's most convincing costume."],
        3: ["The softness you protect is the strongest thing about you.", "You guard the door to a room you've never entered."],
      },
      9: {
        1: ["Your voice belongs in the room.", "Choosing is not the same as losing."],
        2: ["You went along with something today you didn't agree with. The merging happened before you noticed.", "Your anger didn't leave. It just went quiet."],
        3: ["Disappearing is not the same as peace.", "Your harmony has a price and someone else is paying it."],
      },
    };
    const lines = TIERED_WISDOM[d.type]?.[tier] ?? TIERED_WISDOM[d.type]?.[1] ?? [];
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
