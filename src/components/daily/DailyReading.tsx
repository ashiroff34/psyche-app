"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, Coins, Zap, CheckCircle, ChevronLeft, Sparkles } from "lucide-react";
import type { Reading } from "@/data/dailyReadings";

interface DailyReadingProps {
  reading: Reading;
  onComplete: (tokenReward: number, xpReward: number) => void;
  onBack: () => void;
  alreadyCompleted?: boolean;
}

const MIN_READ_SECONDS = 45;
const SCROLL_THRESHOLD = 0.88; // 88% scroll depth required

export default function DailyReading({ reading, onComplete, onBack, alreadyCompleted = false }: DailyReadingProps) {
  const [scrollPct, setScrollPct] = useState(0);
  const [secondsOnPage, setSecondsOnPage] = useState(0);
  const [unlocked, setUnlocked] = useState(alreadyCompleted);
  const [collected, setCollected] = useState(alreadyCompleted);
  const [showConfetti, setShowConfetti] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Track time on page
  useEffect(() => {
    if (alreadyCompleted) return;
    timerRef.current = setInterval(() => {
      setSecondsOnPage((s) => s + 1);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [alreadyCompleted]);

  // Track scroll depth
  const handleScroll = useCallback(() => {
    const el = contentRef.current;
    if (!el) return;
    const scrolled = el.scrollTop + el.clientHeight;
    const total = el.scrollHeight;
    const pct = scrolled / total;
    setScrollPct(Math.min(pct, 1));
  }, []);

  // Unlock when both conditions met
  useEffect(() => {
    if (alreadyCompleted) return;
    if (scrollPct >= SCROLL_THRESHOLD && secondsOnPage >= MIN_READ_SECONDS) {
      setUnlocked(true);
    }
  }, [scrollPct, secondsOnPage, alreadyCompleted]);

  const handleCollect = () => {
    setCollected(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
    onComplete(reading.tokenReward, reading.xpReward);
  };

  const scrollProgress = Math.min(scrollPct / SCROLL_THRESHOLD, 1);
  const timeProgress = Math.min(secondsOnPage / MIN_READ_SECONDS, 1);
  const overallProgress = (scrollProgress + timeProgress) / 2;

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 shrink-0">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-slate-500" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-medium text-indigo-600">Today&apos;s Reading</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span>~{reading.estimatedMinutes} min</span>
        </div>
      </div>

      {/* Progress bar (scroll + time combined) */}
      {!collected && (
        <div className="px-4 pb-2 shrink-0">
          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
            <span>Reading progress</span>
            <span>{Math.round(overallProgress * 100)}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-violet-500"
              animate={{ width: `${overallProgress * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {!unlocked && (
            <p className="text-[10px] text-slate-400 mt-1">
              {scrollPct < SCROLL_THRESHOLD
                ? "Keep reading — scroll to the bottom"
                : secondsOnPage < MIN_READ_SECONDS
                ? `Take your time — ${MIN_READ_SECONDS - secondsOnPage}s remaining`
                : "Almost there!"}
            </p>
          )}
        </div>
      )}

      {/* Scrollable content */}
      <div
        ref={contentRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 pb-4"
      >
        {/* Title block */}
        <div className="mb-6 pt-2">
          <h1 className="text-2xl font-serif font-bold text-slate-900 leading-tight mb-1">
            {reading.title}
          </h1>
          <p className="text-sm text-slate-400">{reading.subtitle}</p>
        </div>

        {/* Paragraphs */}
        <div className="space-y-5">
          {reading.paragraphs.map((p, i) => (
            <p key={i} className="text-[15px] text-slate-700 leading-relaxed">
              {p.bold && <strong className="text-slate-900">{p.bold}</strong>}
              {p.text}
            </p>
          ))}
        </div>

        {/* Reflection prompt */}
        <div className="mt-8 p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Reflect</span>
          </div>
          <p className="text-sm text-indigo-800 leading-relaxed italic">{reading.reflection}</p>
        </div>

        {/* Reward section */}
        <div className="mt-6 mb-2">
          <AnimatePresence mode="wait">
            {collected ? (
              <motion.div
                key="collected"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center"
              >
                <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-emerald-700">Reading complete!</p>
                <p className="text-xs text-emerald-600 mt-0.5">+{reading.tokenReward} tokens · +{reading.xpReward} XP earned</p>
              </motion.div>
            ) : unlocked ? (
              <motion.div
                key="unlocked"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Reward preview */}
                <div className="flex items-center justify-center gap-4 mb-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200">
                    <Coins className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-semibold text-amber-700">+{reading.tokenReward} tokens</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200">
                    <Zap className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm font-semibold text-indigo-700">+{reading.xpReward} XP</span>
                  </div>
                </div>
                <button
                  onClick={handleCollect}
                  className="w-full py-4 rounded-2xl text-white font-bold text-base bg-gradient-to-r from-indigo-500 to-violet-500 shadow-lg shadow-indigo-200/60 hover:shadow-xl transition-all active:scale-[0.98]"
                >
                  Collect Reward ✓
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="locked"
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"
              >
                <div className="flex items-center justify-center gap-3 text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Coins className="w-4 h-4" />
                    <span className="text-sm">+{reading.tokenReward} tokens</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm">+{reading.xpReward} XP</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">Finish reading to collect your reward</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Confetti burst */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                animate={{
                  opacity: 0,
                  y: -120 - Math.random() * 80,
                  x: (Math.random() - 0.5) * 200,
                  scale: 0,
                  rotate: Math.random() * 360,
                }}
                transition={{ duration: 1.2, delay: i * 0.05 }}
                className="absolute w-3 h-3 rounded-sm"
                style={{
                  backgroundColor: ["#6366f1", "#a855f7", "#f59e0b", "#10b981", "#f43f5e"][i % 5],
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
