"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Zap, ArrowRight } from "lucide-react";
import Confetti from "@/components/Confetti";

interface Props {
  score: number; // 0–100
  xpEarned: number;
  perfectRun: boolean;
  lessonTitle: string;
  onContinue: () => void;
}

export default function LessonComplete({ score, xpEarned, perfectRun, lessonTitle, onContinue }: Props) {
  const [countedScore, setCountedScore] = useState(0);
  const [countedXP, setCountedXP] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [countDone, setCountDone] = useState(false);

  const passed = score >= 80;

  // Count-up animation
  useEffect(() => {
    const DURATION = 800;
    const steps = 35;
    const interval = DURATION / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCountedScore(Math.round(eased * score));
      setCountedXP(Math.round(eased * xpEarned));

      if (step >= steps) {
        clearInterval(timer);
        setCountedScore(score);
        setCountedXP(xpEarned);
        setCountDone(true);

        // Trigger confetti after count finishes
        if (passed) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
      }
    }, interval);

    return () => clearInterval(timer);
  }, [score, xpEarned, passed]);

  // SVG circular progress ring
  const ringSize = 140;
  const strokeWidth = 8;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (countedScore / 100) * circumference;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
      style={{
        maxWidth: 640,
        margin: "0 auto",
        background: perfectRun
          ? "linear-gradient(180deg, #fffbeb 0%, #ffffff 40%)"
          : passed
          ? "linear-gradient(180deg, #f0fdf4 0%, #ffffff 40%)"
          : "white",
      }}
    >
      {/* Confetti */}
      <Confetti
        active={showConfetti && perfectRun}
        duration={3000}
        particleCount={80}
        colors={["#fbbf24", "#f59e0b", "#fcd34d", "#fde68a", "#ffffff"]}
      />
      <Confetti
        active={showConfetti && passed && !perfectRun}
        duration={2500}
        particleCount={50}
        colors={["#8b5cf6", "#d946ef", "#a78bfa", "#ec4899", "#f0abfc"]}
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="flex flex-col items-center text-center w-full max-w-xs"
      >
        {/* Circular score ring */}
        <div className="relative mb-6">
          <svg width={ringSize} height={ringSize} className="transform -rotate-90">
            {/* Background ring */}
            <circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={radius}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth={strokeWidth}
            />
            {/* Progress ring */}
            <motion.circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={radius}
              fill="none"
              stroke={perfectRun ? "url(#goldGrad)" : passed ? "url(#greenGrad)" : "url(#purpleGrad)"}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#d946ef" />
              </linearGradient>
            </defs>
          </svg>

          {/* Score text in center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-slate-900">
              {countedScore}%
            </span>
          </div>

          {/* Perfect badge */}
          {perfectRun && countDone && (
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)" }}
            >
              <Star className="w-5 h-5 text-white fill-white" />
            </motion.div>
          )}
        </div>

        {/* Title */}
        <motion.h2
          animate={perfectRun && countDone ? { scale: [1, 1.08, 1] } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-bold text-slate-900 mb-1"
        >
          {perfectRun ? "Perfect!" : passed ? "Great job!" : "Lesson Complete"}
        </motion.h2>

        {/* Lesson name */}
        <p className="text-slate-500 text-base mb-6">{lessonTitle}</p>

        {/* XP earned */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-violet-50 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-700 mb-8"
        >
          <Zap className="w-5 h-5 text-violet-500 fill-violet-500" />
          <span className="text-2xl font-bold text-violet-700 dark:text-violet-300">
            +{countDone ? xpEarned : countedXP}
          </span>
          <span className="text-sm font-medium text-violet-500 dark:text-violet-400 uppercase tracking-wide">
            XP
          </span>
        </motion.div>

        {/* Perfect badge callout */}
        {perfectRun && countDone && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="w-full px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2 mb-6"
          >
            <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
            <span className="text-sm font-semibold text-amber-700">
              Perfect run bonus! No mistakes at all.
            </span>
          </motion.div>
        )}

        {/* Continue button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          className="w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
            boxShadow: "0 4px 20px rgba(139,92,246,0.4)",
          }}
        >
          Continue <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}
