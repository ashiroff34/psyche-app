"use client";

import { motion } from "framer-motion";
import { Zap, ArrowRight, Clock } from "lucide-react";
import type { PathNodeConfig } from "@/components/daily/NodeBottomSheet";

interface Props {
  nextNode: PathNodeConfig;
  onKeepGoing: () => void;
  onSkip: () => void;
}

const NODE_TYPE_LABEL: Record<string, string> = {
  quiz: "Quiz",
  reflection: "Reflection",
  challenge: "Challenge",
  bonus: "Bonus",
};

export default function KeepGoingCard({ nextNode, onKeepGoing, onSkip }: Props) {
  const estMins = nextNode.questionCount > 0
    ? Math.max(1, Math.round((nextNode.questionCount * 28) / 60))
    : 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.5, type: "spring", damping: 20, stiffness: 280 }}
      className="w-full mb-4"
    >
      {/* Momentum label */}
      <div className="flex items-center justify-center gap-1.5 mb-3">
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          className="text-lg"
        >
          🔥
        </motion.span>
        <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
          You&apos;re warmed up — don&apos;t stop now!
        </span>
      </div>

      {/* Next node card */}
      <div
        className="w-full rounded-2xl p-4 border border-violet-100"
        style={{
          background: "linear-gradient(135deg, #faf5ff 0%, #fdf4ff 100%)",
        }}
      >
        <div className="flex items-center gap-3">
          {/* Icon blob */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white text-lg font-bold shadow-md"
            style={{
              background: `linear-gradient(135deg, ${nextNode.gradFrom ?? "#8b5cf6"}, ${nextNode.gradTo ?? "#d946ef"})`,
            }}
          >
            {nextNode.nodeType === "reflection" ? "✍️" :
             nextNode.nodeType === "challenge" ? "💪" :
             nextNode.nodeType === "bonus" ? "⭐" : "🧠"}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider">
                {NODE_TYPE_LABEL[nextNode.nodeType] ?? "Next up"}
              </span>
            </div>
            <p className="text-sm font-bold text-slate-800 leading-tight truncate">{nextNode.label}</p>
            <p className="text-xs text-slate-400 truncate">{nextNode.sublabel}</p>
          </div>

          {/* XP + time badges */}
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
          whileTap={{ scale: 0.97 }}
          onClick={onKeepGoing}
          className="mt-3 w-full py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
            boxShadow: "0 4px 16px rgba(139,92,246,0.35)",
          }}
        >
          Let&apos;s go <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Skip link */}
      <button
        onClick={onSkip}
        className="w-full text-center text-xs text-slate-400 hover:text-slate-600 transition-colors mt-2 py-1"
      >
        Maybe later
      </button>
    </motion.div>
  );
}
