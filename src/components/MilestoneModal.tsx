"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { streakMilestones, type StreakMilestone } from "@/data/streakMilestones";

interface MilestoneModalProps {
  streakCount: number;
  enneagramType?: number | null;
}

function getSeenKey(days: number) {
  return `thyself-milestone-seen-${days}`;
}

function hasSeenMilestone(days: number): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(getSeenKey(days)) === "true";
}

function markMilestoneSeen(days: number) {
  if (typeof window === "undefined") return;
  localStorage.setItem(getSeenKey(days), "true");
}

export default function MilestoneModal({ streakCount, enneagramType }: MilestoneModalProps) {
  const [activeMilestone, setActiveMilestone] = useState<StreakMilestone | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Find the highest milestone that applies and hasn't been seen
    const pending = streakMilestones
      .filter((m) => streakCount >= m.days && !hasSeenMilestone(m.days))
      .sort((a, b) => b.days - a.days);
    if (pending.length > 0) {
      setActiveMilestone(pending[0]);
    }
  }, [streakCount]);

  if (!activeMilestone) return null;

  const message = enneagramType
    ? (activeMilestone.messages[enneagramType] ?? activeMilestone.genericMessage)
    : activeMilestone.genericMessage;

  const handleDismiss = () => {
    markMilestoneSeen(activeMilestone.days);
    setActiveMilestone(null);
  };

  const handleJournal = () => {
    markMilestoneSeen(activeMilestone.days);
    setActiveMilestone(null);
    router.push("/journal");
  };

  return (
    <AnimatePresence>
      {activeMilestone && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
          />

          {/* Modal */}
          <motion.div
            className="fixed z-50 left-0 right-0 bottom-0 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-md w-full"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
          >
            <div
              className="rounded-t-3xl sm:rounded-3xl p-8 mx-0 sm:mx-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(145deg, #1a1035, #0f0a1e)",
                border: "1px solid rgba(139,92,246,0.25)",
                boxShadow: "0 0 60px rgba(139,92,246,0.15), 0 24px 64px rgba(0,0,0,0.5)",
              }}
            >
              {/* Decorative glow */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 70%)", top: "-16px" }}
              />

              {/* Handle indicator */}
              <div className="flex justify-center mb-6 sm:hidden">
                <div className="w-8 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
              </div>

              {/* Milestone badge */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}
                >
                  ✦
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: "rgba(139,92,246,0.8)" }}>
                    Streak Milestone
                  </div>
                  <div className="text-xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.93)" }}>
                    {activeMilestone.title}
                  </div>
                </div>
              </div>

              {/* Streak count */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
                style={{ background: "rgba(251,146,60,0.12)", border: "1px solid rgba(251,146,60,0.25)" }}
              >
                <span className="text-base">★</span>
                <span className="text-sm font-bold" style={{ color: "rgba(251,146,60,0.9)" }}>
                  {streakCount} day streak
                </span>
              </div>

              {/* Message */}
              <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.7)" }}>
                {message}
              </p>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleJournal}
                  className="w-full py-3.5 rounded-2xl text-sm font-semibold transition-all"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                    color: "rgba(255,255,255,0.95)",
                    boxShadow: "0 4px 20px rgba(124,58,237,0.3)",
                  }}
                >
                  Journal This
                </button>
                <button
                  onClick={handleDismiss}
                  className="w-full py-3 rounded-2xl text-sm font-medium transition-all"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.5)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  Keep Going
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
