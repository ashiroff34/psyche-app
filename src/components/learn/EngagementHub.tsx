"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Heart, Star, Zap } from "lucide-react";
import type { GameState } from "@/hooks/useGameState";

interface Props {
  gameState: GameState;
  streak: number;
  totalXP: number;
  onTodaysChallenge?: () => void;
  onPracticeQuestions?: () => void;
}

function HeartDisplay({ hearts, maxHearts }: { hearts: number; maxHearts: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxHearts }).map((_, i) => (
        <Heart
          key={i}
          className={`w-4 h-4 transition-all ${
            i < hearts
              ? "text-red-400 fill-red-400"
              : "text-white/20"
          }`}
        />
      ))}
    </div>
  );
}

export default function EngagementHub({ gameState, streak, totalXP, onTodaysChallenge, onPracticeQuestions }: Props) {
  const hubRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const hearts = gameState.hearts ?? 5;
  const maxHearts = gameState.maxHearts ?? 5;
  const dailyXP = gameState.dailyXPEarned ?? 0;
  const tokens = gameState.tokens ?? 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setCollapsed(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-60px 0px 0px 0px" }
    );
    if (hubRef.current) observer.observe(hubRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Full hub */}
      <div
        ref={hubRef}
        className="relative overflow-hidden rounded-2xl mx-4 mt-4 mb-2"
        style={{
          background: "linear-gradient(135deg, rgba(88,28,235,0.35) 0%, rgba(124,58,237,0.25) 50%, rgba(15,10,30,0.9) 100%)",
          border: "1px solid rgba(139,92,246,0.25)",
        }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.12) 0%, transparent 60%)",
          }}
        />

        <div className="relative p-4">
          {/* Stats row */}
          <div className="flex items-center justify-between mb-4">
            {/* Streak */}
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(251,146,60,0.2)", border: "1px solid rgba(251,146,60,0.3)" }}
              >
                <Flame className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-none">{streak}</div>
                <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>day streak</div>
              </div>
            </div>

            {/* Hearts */}
            <div className="flex flex-col items-center gap-1">
              <HeartDisplay hearts={hearts} maxHearts={maxHearts} />
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>{hearts}/{maxHearts} hearts</span>
            </div>

            {/* XP today */}
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(251,191,36,0.2)", border: "1px solid rgba(251,191,36,0.3)" }}
              >
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-none">+{dailyXP}</div>
                <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>XP today</div>
              </div>
            </div>

            {/* Tokens */}
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(52,211,153,0.2)", border: "1px solid rgba(52,211,153,0.3)" }}
              >
                <Zap className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-none">{tokens}</div>
                <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>tokens</div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={onTodaysChallenge}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-95"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
              }}
            >
              Today&apos;s Challenge
            </button>
            <button
              onClick={onPracticeQuestions}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95"
              style={{
                background: "rgba(139,92,246,0.15)",
                border: "1px solid rgba(139,92,246,0.3)",
                color: "#c4b5fd",
              }}
            >
              Practice Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Sticky collapsed bar (shown when hub scrolls out of view) */}
      <AnimatePresence>
        {collapsed && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 left-0 right-0 z-30 px-4 py-2"
            style={{
              background: "rgba(15,10,30,0.96)",
              borderBottom: "1px solid rgba(139,92,246,0.15)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="max-w-md mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="text-white font-bold text-sm">{streak}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                  <span className="text-white font-bold text-sm">{hearts}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-bold text-sm">+{dailyXP}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={onTodaysChallenge}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
                  style={{ background: "rgba(124,58,237,0.7)" }}
                >
                  Challenge
                </button>
                <button
                  onClick={onPracticeQuestions}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                  style={{ color: "#c4b5fd", background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}
                >
                  Quiz
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
