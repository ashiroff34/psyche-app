"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Star, Zap, Trophy } from "lucide-react";

interface Props {
  show: boolean;
  streak: number;
  xpEarned: number;
  onDismiss: () => void;
}

export default function DailyCompleteOverlay({ show, streak, xpEarned, onDismiss }: Props) {
  // Auto-dismiss after 6 seconds
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onDismiss, 6000);
    return () => clearTimeout(t);
  }, [show, onDismiss]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center px-6"
          style={{
            background: "linear-gradient(180deg, #0f0a1e 0%, #1a0a2e 40%, #0f0a1e 100%)",
          }}
          onClick={onDismiss}
        >
          {/* Star particles */}
          {[...Array(16)].map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const radius = 120 + Math.random() * 60;
            return (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  background: i % 3 === 0 ? "#fbbf24" : i % 3 === 1 ? "#a855f7" : "#34d399",
                }}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  x: Math.cos(angle) * radius,
                  y: Math.sin(angle) * radius,
                  scale: [0, 1.4, 1, 0],
                }}
                transition={{ duration: 2.4, delay: 0.3 + i * 0.06, ease: "easeOut" }}
              />
            );
          })}

          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 18, stiffness: 260, delay: 0.1 }}
            className="flex flex-col items-center text-center max-w-xs"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Trophy icon with bounce */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, -5, 5, 0],
              }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut", repeat: 2, repeatType: "loop" }}
              className="text-8xl mb-4 select-none"
            >
              🏆
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-3xl font-black text-white mb-1"
            >
              Daily Goal Done!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="text-purple-300 text-sm font-medium mb-8"
            >
              You crushed every quest today ✨
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="flex items-center gap-6 mb-8"
            >
              {/* Streak */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(251,146,60,0.15)", border: "1.5px solid rgba(251,146,60,0.3)" }}>
                  <Flame className="w-6 h-6 text-orange-400" />
                </div>
                <span className="text-white font-black text-lg leading-none">{streak}</span>
                <span className="text-purple-400 text-xs font-medium">day streak</span>
              </div>

              {/* XP */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(250,204,21,0.15)", border: "1.5px solid rgba(250,204,21,0.3)" }}>
                  <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                </div>
                <span className="text-white font-black text-lg leading-none">+{xpEarned}</span>
                <span className="text-purple-400 text-xs font-medium">XP earned</span>
              </div>

              {/* Trophy */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(168,85,247,0.15)", border: "1.5px solid rgba(168,85,247,0.3)" }}>
                  <Trophy className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-white font-black text-lg leading-none">4/4</span>
                <span className="text-purple-400 text-xs font-medium">quests done</span>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              whileTap={{ scale: 0.96 }}
              onClick={onDismiss}
              className="w-full py-4 rounded-2xl font-black text-white text-base flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
                boxShadow: "0 8px 32px rgba(139,92,246,0.5)",
              }}
            >
              <Zap className="w-5 h-5 fill-white" />
              Keep the streak going!
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="text-purple-500 text-xs mt-3 font-medium"
            >
              Tap anywhere to close
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
