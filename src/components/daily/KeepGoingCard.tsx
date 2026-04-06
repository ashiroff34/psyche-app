"use client";

import { motion } from "framer-motion";
import { Zap, ArrowRight, Clock, Coins } from "lucide-react";
import type { PathNodeConfig } from "@/components/daily/NodeBottomSheet";

interface Props {
  nextNode: PathNodeConfig;
  onKeepGoing: () => void;
  onSkip: () => void;
  sessionDurationSecs?: number;
  correctCount?: number;
  totalCount?: number;
}

const NODE_TYPE_LABEL: Record<string, string> = {
  quiz: "Quiz",
  reflection: "Reflection",
  challenge: "Challenge",
  bonus: "Bonus",
};

const NODE_TYPE_EMOJI: Record<string, string> = {
  reflection: "✍️",
  challenge: "💪",
  bonus: "⭐",
  quiz: "🧠",
};

export default function KeepGoingCard({
  nextNode,
  onKeepGoing,
  onSkip,
  sessionDurationSecs = 0,
  correctCount,
  totalCount,
}: Props) {
  const estMins = nextNode.questionCount > 0
    ? Math.max(1, Math.round((nextNode.questionCount * 28) / 60))
    : 3;

  // Format elapsed time nicely
  const elapsedMins = Math.max(1, Math.round(sessionDurationSecs / 60));
  const elapsedLabel = elapsedMins === 1 ? "1 minute" : `${elapsedMins} minutes`;

  // Perfect score hook
  const isPerfect = correctCount !== undefined && totalCount !== undefined && correctCount === totalCount && totalCount > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.5, type: "spring", damping: 20, stiffness: 280 }}
      className="w-full mb-4"
    >
      {/* "Can't stop now" hook line */}
      <div className="flex items-center justify-center gap-1.5 mb-3">
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          className="text-base"
        >
          {isPerfect ? "⚡" : "🔥"}
        </motion.span>
        <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
          {isPerfect
            ? "Perfect score, keep the momentum!"
            : `That took ${elapsedLabel}, don't stop now!`}
        </span>
      </div>

      {/* Next node card */}
      <div
        className="w-full rounded-2xl overflow-hidden border border-violet-100"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        {/* Token bonus banner */}
        <div
          className="flex items-center justify-center gap-1.5 px-4 py-2"
          style={{ background: "linear-gradient(90deg, #f59e0b22, #f97316 18%, #f59e0b22)" }}
        >
          <Coins className="w-3 h-3 text-amber-600" />
          <span className="text-[11px] font-bold text-amber-700">
            Finish one more module for a bonus token drop 🎁
          </span>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-3">
            {/* Icon blob */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-lg shadow-md"
              style={{
                background: `linear-gradient(135deg, ${nextNode.gradFrom ?? "#8b5cf6"}, ${nextNode.gradTo ?? "#d946ef"})`,
              }}
            >
              {NODE_TYPE_EMOJI[nextNode.nodeType] ?? "🧠"}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider">
                {NODE_TYPE_LABEL[nextNode.nodeType] ?? "Next up"}
              </span>
              <p className="text-sm font-bold text-slate-800 leading-tight truncate">{nextNode.label}</p>
              <p className="text-xs text-slate-400 truncate">{nextNode.sublabel}</p>
            </div>

            {/* XP + time */}
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="flex items-center gap-0.5 text-xs font-bold text-violet-600">
                <Zap className="w-3 h-3" />+{nextNode.xp} XP
              </span>
              <span className="flex items-center gap-0.5 text-[10px] text-slate-400">
                <Clock className="w-2.5 h-2.5" />~{estMins} min
              </span>
            </div>
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onKeepGoing}
            className="mt-3 w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
              boxShadow: "0 4px 16px rgba(139,92,246,0.35)",
            }}
          >
            Keep going <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Skip link */}
      <button
        onClick={onSkip}
        className="w-full text-center text-xs text-slate-400 hover:text-slate-600 transition-colors mt-2.5 py-1"
      >
        I&apos;m done for now
      </button>
    </motion.div>
  );
}
