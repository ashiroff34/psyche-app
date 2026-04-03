"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Coins, Zap, CheckCircle, Trophy, CalendarDays } from "lucide-react";

interface WeeklyChallengeData {
  id: string;
  name: string;
  emoji: string;
  description: string;
  goal: number;
  xpReward: number;
  tokenReward: number;
  progress: number;
  completed: boolean;
  rewardClaimed: boolean;
}

interface Props {
  challenge: WeeklyChallengeData;
  onClaim: () => void;
}

export default function WeeklyChallengeCard({ challenge, onClaim }: Props) {
  const { name, emoji, description, goal, xpReward, tokenReward, progress, completed, rewardClaimed } = challenge;
  const pct = Math.min(100, Math.round((progress / goal) * 100));
  const clampedProgress = Math.min(progress, goal);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.33, type: "spring", damping: 22, stiffness: 260 }}
      className="mb-6"
    >
      <div
        className={`relative rounded-2xl overflow-hidden border ${
          rewardClaimed
            ? "border-emerald-200 bg-emerald-50"
            : completed
            ? "border-amber-300"
            : "border-violet-100 bg-white/80 backdrop-blur-sm shadow-sm"
        }`}
        style={
          completed && !rewardClaimed
            ? { background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 60%, #fef9c3 100%)" }
            : undefined
        }
      >
        {/* Shimmer on completed */}
        {completed && !rewardClaimed && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1 }}
          />
        )}

        <div className="relative p-4">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-base ${
              rewardClaimed ? "bg-emerald-100" : completed ? "bg-amber-200" : "bg-violet-100"
            }`}>
              {rewardClaimed ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  rewardClaimed ? "text-emerald-600" : completed ? "text-amber-700" : "text-violet-600"
                }`}>
                  <CalendarDays className="w-3 h-3 inline mr-0.5" />Weekly Challenge
                </span>
                {rewardClaimed && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">DONE</span>
                )}
                {completed && !rewardClaimed && (
                  <motion.span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-300 text-amber-900"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  >CLAIM NOW!</motion.span>
                )}
              </div>
              <p className={`text-sm font-bold leading-tight ${
                rewardClaimed ? "text-emerald-700" : completed ? "text-amber-900" : "text-slate-800"
              }`}>
                {name}
              </p>
            </div>
            {/* Reward pills */}
            <div className="flex flex-col items-end gap-0.5 shrink-0">
              <span className="flex items-center gap-0.5 text-[10px] font-bold text-violet-600">
                <Zap className="w-2.5 h-2.5" />+{xpReward}
              </span>
              <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-600">
                <Coins className="w-2.5 h-2.5" />+{tokenReward}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className={`text-xs mb-3 leading-relaxed ${rewardClaimed ? "text-emerald-600" : completed ? "text-amber-800" : "text-slate-500"}`}>
            {rewardClaimed ? "Challenge complete, great work this week! 🎉" : description}
          </p>

          {/* Progress */}
          {!rewardClaimed && (
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className={`text-[10px] font-semibold ${completed ? "text-amber-700" : "text-slate-400"}`}>
                  {clampedProgress} / {goal}
                </span>
                <span className={`text-[10px] font-bold ${completed ? "text-amber-700" : "text-violet-500"}`}>
                  {pct}%
                </span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden bg-slate-100">
                <motion.div
                  className={`h-full rounded-full ${completed ? "bg-gradient-to-r from-amber-400 to-yellow-300" : "bg-gradient-to-r from-violet-500 to-fuchsia-400"}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          )}

          {/* Claim button */}
          <AnimatePresence>
            {completed && !rewardClaimed && (
              <motion.button
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClaim}
                className="mt-3 w-full py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #f59e0b, #fbbf24)", boxShadow: "0 4px 16px rgba(245,158,11,0.4)" }}
              >
                <Trophy className="w-4 h-4" />
                Claim Reward, +{xpReward} XP &amp; +{tokenReward} tokens!
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
