"use client";

import { motion } from "framer-motion";
import type { BadgeProgress } from "@/hooks/useGameState";

interface Props {
  badges: BadgeProgress[];
}

export default function BadgeProgressCard({ badges }: Props) {
  if (badges.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="w-full mb-5"
    >
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 text-center">
        You&apos;re getting closer to…
      </p>
      <div className="flex flex-col gap-3">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100"
          >
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
              style={{ background: "linear-gradient(135deg, #f3e8ff, #fce7f3)" }}>
              {badge.icon}
            </div>

            {/* Text + bar */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-slate-800 truncate">{badge.name}</span>
                <span className="text-xs font-semibold text-violet-500 ml-2 shrink-0">{badge.pct}%</span>
              </div>
              <p className="text-[11px] text-slate-400 mb-1.5">{badge.label}</p>
              {/* Progress bar */}
              <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${badge.pct}%` }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #8b5cf6, #d946ef)" }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
