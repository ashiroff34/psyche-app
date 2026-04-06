"use client";

import { useCallback } from "react";
import { useReward } from "react-rewards";
import { toast } from "sonner";
import { Zap, Star, Trophy, Flame } from "lucide-react";

// ── Reward Hook ─────────────────────────────────────────────────────────────
// Wraps react-rewards + sonner into a single API for the whole app.

export function useRewards() {
  // Confetti burst (quiz correct, module complete)
  const { reward: confettiBurst, isAnimating: confettiAnimating } = useReward(
    "reward-confetti",
    "confetti",
    {
      elementCount: 30,
      spread: 70,
      startVelocity: 25,
      decay: 0.94,
      lifetime: 200,
      colors: ["#6366f1", "#0ea5e9", "#f59e0b", "#ec4899", "#10b981", "#8b5cf6"],
    }
  );

  // Big confetti (perfect score, level up)
  const { reward: bigConfetti } = useReward("reward-confetti", "confetti", {
    elementCount: 60,
    spread: 90,
    startVelocity: 35,
    decay: 0.92,
    lifetime: 300,
    colors: ["#fbbf24", "#f59e0b", "#fcd34d", "#fde68a", "#ffffff"],
  });

  // Emoji rain (streak, badges)
  const { reward: emojiRain } = useReward("reward-emoji", "emoji", {
    elementCount: 12,
    spread: 80,
    startVelocity: 20,
    decay: 0.94,
    lifetime: 250,
    emoji: ["★", "★", "✦"],
  });

  // Balloon burst (big achievements)
  const { reward: balloonBurst } = useReward("reward-balloon", "balloons", {
    elementCount: 8,
    spread: 60,
    startVelocity: 15,
    lifetime: 300,
  });

  // ── Toast Helpers ─────────────────────────────────────────────────────────

  const xpToast = useCallback((amount: number, source: string) => {
    const isBonus = source.includes("BONUS") || source.includes("bonus");
    toast.custom(
      (id) => (
        <div
          onClick={() => toast.dismiss(id)}
          className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl cursor-pointer ${
            isBonus
              ? "bg-gradient-to-r from-amber-400 to-orange-500 shadow-amber-200/40"
              : "bg-gradient-to-r from-sky-500 to-indigo-500 shadow-sky-200/40"
          }`}
        >
          {isBonus ? (
            <Star className="w-5 h-5 text-white animate-pulse" />
          ) : (
            <Zap className="w-5 h-5 text-white" />
          )}
          <div>
            <div className="text-lg font-bold text-white">+{amount} XP</div>
            <div className="text-[10px] text-white/70 font-medium uppercase tracking-wide">
              {source}
            </div>
          </div>
        </div>
      ),
      { duration: 2500, position: "top-center" }
    );
  }, []);

  const streakToast = useCallback((count: number) => {
    toast.custom(
      (id) => (
        <div
          onClick={() => toast.dismiss(id)}
          className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 shadow-xl shadow-orange-200/40 cursor-pointer"
        >
          <Flame className="w-5 h-5 text-white" />
          <div>
            <div className="text-lg font-bold text-white">{count}-Day Streak!</div>
            <div className="text-[10px] text-white/70 font-medium uppercase tracking-wide">
              Keep it going
            </div>
          </div>
        </div>
      ),
      { duration: 3000, position: "top-center" }
    );
  }, []);

  const badgeToast = useCallback((badgeName: string, emoji: string) => {
    toast.custom(
      (id) => (
        <div
          onClick={() => toast.dismiss(id)}
          className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 shadow-xl shadow-violet-200/40 cursor-pointer"
        >
          <Trophy className="w-5 h-5 text-white" />
          <div>
            <div className="text-lg font-bold text-white">
              {emoji} {badgeName}
            </div>
            <div className="text-[10px] text-white/70 font-medium uppercase tracking-wide">
              New badge earned
            </div>
          </div>
        </div>
      ),
      { duration: 3500, position: "top-center" }
    );
  }, []);

  return {
    // Particle effects
    confettiBurst,
    bigConfetti,
    emojiRain,
    balloonBurst,
    confettiAnimating,
    // Toasts
    xpToast,
    streakToast,
    badgeToast,
  };
}

// ── Anchor Elements ─────────────────────────────────────────────────────────
// Drop these invisible spans wherever you want particles to originate from.
// The react-rewards library fires particles from the element matching the ID.

export function RewardAnchors() {
  return (
    <>
      <span id="reward-confetti" className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] pointer-events-none" />
      <span id="reward-emoji" className="fixed top-1/3 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none" />
      <span id="reward-balloon" className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] pointer-events-none" />
    </>
  );
}
