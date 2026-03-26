"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, XCircle, Heart, Zap, Trophy, ArrowRight, Star, BookOpen, Timer } from "lucide-react";
import ChibiSprite from "@/components/ChibiSprite";
import type { ChibiState } from "@/components/ChibiSprite";

interface Question {
  id: string;
  q: string;
  opts: string[];
  ans: number;
  exp: string;
  difficulty: 1 | 2 | 3;
  module: string;
  tags: string[];
}

interface Props {
  questions: Question[];
  currentIdx: number;
  selected: number | null;
  showExp: boolean;
  answers: boolean[];
  onAnswer: (idx: number) => void;
  onNext: () => void;
  onQuit: () => void;
  moduleName: string;
  sessionXP: number;
  completed?: boolean;
  // Engagement features
  hearts?: number;          // real game-state hearts (0–5); falls back to session calc if omitted
  maxHearts?: number;       // default 5
  heartsRefillTime?: string | null; // ISO timestamp when refill timer started
  xpBonusLabel?: string | null; // e.g. "2x BONUS!" shown as a flash
  longestStreak?: number;   // personal best for self-competition screen
  currentStreak?: number;
  enneagramType?: number;   // for chibi sprite
  instinct?: string;        // e.g. "sp", "so", "sx"
  onBuyHearts?: () => void;
}

export default function QuizFullscreen({
  questions,
  currentIdx,
  selected,
  showExp,
  answers,
  onAnswer,
  onNext,
  onQuit,
  moduleName,
  sessionXP,
  completed,
  hearts: realHearts,
  maxHearts = 5,
  heartsRefillTime,
  xpBonusLabel,
  longestStreak = 0,
  currentStreak = 0,
  enneagramType = 5,
  instinct = "sp",
  onBuyHearts,
}: Props) {
  const router = useRouter();
  const q = questions[currentIdx];

  // ── Countdown to next heart ────────────────────────────────────────────────
  const [nextHeartSecs, setNextHeartSecs] = useState<number | null>(null);
  useEffect(() => {
    if (!heartsRefillTime || realHearts === undefined || realHearts >= maxHearts) {
      setNextHeartSecs(null);
      return;
    }
    const REFILL_MS = 10 * 60 * 1000;
    const refillStart = new Date(heartsRefillTime).getTime();
    const calcSecs = () => {
      const elapsed = Date.now() - refillStart;
      const msIntoInterval = elapsed % REFILL_MS;
      return Math.max(0, Math.ceil((REFILL_MS - msIntoInterval) / 1000));
    };
    setNextHeartSecs(calcSecs());
    const interval = setInterval(() => {
      const secs = calcSecs();
      setNextHeartSecs(secs);
    }, 1000);
    return () => clearInterval(interval);
  }, [heartsRefillTime, realHearts, maxHearts]);

  // ── Completion screen ──────────────────────────────────────────────────────
  if (completed) {
    const correctCount = answers.filter(Boolean).length;
    const totalCount = questions.length;
    const pct = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    const isPerfect = correctCount === totalCount;
    const beatPersonalBest = currentStreak > 0 && longestStreak > 0 && currentStreak >= longestStreak;

    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center px-6" style={{ maxWidth: 640, margin: "0 auto" }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="flex flex-col items-center text-center w-full max-w-xs"
        >
          {/* Trophy / chibi */}
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ background: isPerfect ? "linear-gradient(135deg, #fbbf24, #f59e0b)" : "linear-gradient(135deg, #8b5cf6, #d946ef)" }}>
              <Trophy className="w-12 h-12 text-white" />
            </div>
            {beatPersonalBest && (
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center shadow-lg"
              >
                <Star className="w-5 h-5 text-white fill-white" />
              </motion.div>
            )}
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {isPerfect ? "Perfect!" : "Complete!"}
          </h2>
          <p className="text-slate-500 text-base mb-6">{moduleName}</p>

          {/* Score row */}
          <div className="flex items-center gap-6 mb-5">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-slate-800">{correctCount}<span className="text-slate-400 text-2xl">/{totalCount}</span></span>
              <span className="text-xs text-slate-400 mt-1 uppercase tracking-wide">Correct</span>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-amber-500">{pct}<span className="text-2xl">%</span></span>
              <span className="text-xs text-slate-400 mt-1 uppercase tracking-wide">Accuracy</span>
            </div>
            {sessionXP > 0 && (
              <>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold text-violet-600">+{sessionXP}</span>
                  <span className="text-xs text-slate-400 mt-1 uppercase tracking-wide flex items-center gap-0.5"><Zap className="w-3 h-3" />XP</span>
                </div>
              </>
            )}
          </div>

          {/* Self-competition badge */}
          {longestStreak > 0 && (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`w-full px-4 py-2.5 rounded-xl mb-5 flex items-center gap-2 ${
                beatPersonalBest
                  ? "bg-amber-50 border border-amber-200"
                  : "bg-slate-50 border border-slate-100"
              }`}
            >
              <Star className={`w-4 h-4 shrink-0 ${beatPersonalBest ? "text-amber-500 fill-amber-500" : "text-slate-300"}`} />
              <span className={`text-sm font-medium ${beatPersonalBest ? "text-amber-700" : "text-slate-500"}`}>
                {beatPersonalBest
                  ? `New personal best! ${currentStreak}-day streak 🎉`
                  : `Personal best: ${longestStreak}-day streak. Keep going!`}
              </span>
            </motion.div>
          )}

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onQuit}
            className="w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #d946ef)", boxShadow: "0 4px 20px rgba(139,92,246,0.4)" }}
          >
            Back to Path <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!q) return null;

  const isCorrect = selected === q.ans;

  // Hearts: use real game-state hearts if provided, else cosmetic session hearts
  const displayHearts = realHearts !== undefined ? realHearts : Math.max(0, 3 - answers.filter(a => !a).length);
  const heartsTotal = realHearts !== undefined ? maxHearts : 3;

  const progress = Math.round(((currentIdx) / questions.length) * 100);
  const diffLabel = q.difficulty === 1 ? "Beginner" : q.difficulty === 2 ? "Intermediate" : "Advanced";
  const optionLetters = ["A", "B", "C", "D"];

  // Chibi state based on last answer
  const chibiState: ChibiState = selected !== null ? (isCorrect ? "happy" : "hurt") : "idle";

  // ── Out of hearts screen ───────────────────────────────────────────────────
  if (realHearts === 0) {
    const fmtCountdown = (secs: number) => {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return `${m}:${String(s).padStart(2, "0")}`;
    };

    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center px-6" style={{ maxWidth: 640, margin: "0 auto" }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="flex flex-col items-center text-center w-full max-w-xs"
        >
          {/* Hearts row */}
          <div className="flex gap-1.5 mb-4">
            {Array.from({ length: maxHearts }).map((_, i) => (
              <Heart key={i} className="w-6 h-6 text-slate-200 fill-slate-100" />
            ))}
          </div>

          <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center mb-5">
            <Heart className="w-10 h-10 text-rose-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Out of Hearts</h2>

          {/* Countdown timer */}
          {nextHeartSecs !== null && (
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-2xl px-5 py-3 mb-4">
              <Timer className="w-4 h-4 text-rose-400 shrink-0" />
              <p className="text-sm font-semibold text-rose-700">
                Next heart in{" "}
                <span className="font-mono text-rose-600">{fmtCountdown(nextHeartSecs)}</span>
              </p>
            </div>
          )}

          <p className="text-slate-500 text-sm mb-6 max-w-xs leading-relaxed">
            Hearts refill 1 every 10 minutes. Or pass the time exploring the reading library — your hearts keep refilling while you read!
          </p>

          <div className="flex flex-col gap-3 w-full">
            {/* Go Read CTA */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => { onQuit(); router.push("/read"); }}
              className="w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 20px rgba(99,102,241,0.3)" }}
            >
              <BookOpen className="w-5 h-5" />
              Read &amp; Explore Types
            </motion.button>

            {/* Buy with tokens */}
            {onBuyHearts && (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onBuyHearts}
                className="w-full py-3.5 rounded-2xl font-semibold text-amber-700 text-base bg-amber-50 hover:bg-amber-100 border border-amber-200 flex items-center justify-center gap-2 transition"
              >
                <Zap className="w-4 h-4 text-amber-500" />
                Refill with 20 tokens
              </motion.button>
            )}

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onQuit}
              className="w-full py-3 rounded-2xl font-medium text-slate-500 text-sm bg-slate-50 hover:bg-slate-100 transition"
            >
              Come back later
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Main quiz screen ───────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col" style={{ maxWidth: 640, margin: "0 auto" }}>

      {/* ── XP Bonus flash ── */}
      <AnimatePresence>
        {xpBonusLabel && (
          <motion.div
            key={xpBonusLabel}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute top-16 left-1/2 z-10 -translate-x-1/2 flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-400 text-white font-bold text-sm shadow-lg shadow-amber-200 pointer-events-none"
          >
            <Zap className="w-4 h-4 fill-white" />
            {xpBonusLabel.replace("daily-quiz ", "")}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Top bar: X | progress | hearts ── */}
      <div className="flex items-center gap-3 px-4 pt-safe pt-4 pb-3">
        <button
          onClick={onQuit}
          className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition shrink-0"
        >
          <X className="w-4 h-4 text-slate-500" />
        </button>

        {/* Progress bar */}
        <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #8b5cf6, #d946ef)" }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-0.5 shrink-0">
          {Array.from({ length: Math.min(heartsTotal, 5) }).map((_, i) => (
            <motion.div
              key={i}
              animate={i === displayHearts && selected !== null && !isCorrect ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={`w-5 h-5 transition-colors ${i < displayHearts ? "text-rose-500 fill-rose-500" : "text-slate-200 fill-slate-200"}`}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 overflow-y-auto px-5 pt-2 pb-2">

        {/* Module + difficulty + XP */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{moduleName}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span className={`text-xs font-medium ${
            q.difficulty === 1 ? "text-emerald-500" : q.difficulty === 2 ? "text-amber-500" : "text-rose-500"
          }`}>{diffLabel}</span>
          {sessionXP > 0 && (
            <>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="flex items-center gap-0.5 text-xs font-medium text-amber-500">
                <Zap className="w-3 h-3" />+{sessionXP}
              </span>
            </>
          )}
        </div>

        {/* Chibi + Question row */}
        <div className="flex items-start gap-3 mb-6">
          {/* Chibi sprite (small, left-aligned) */}
          <div className="shrink-0 mt-1">
            <ChibiSprite
              type={enneagramType}
              instinct={instinct}
              size={52}
              state={chibiState}
            />
          </div>

          {/* Question bubble */}
          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="flex-1 bg-slate-50 rounded-2xl rounded-tl-sm px-4 py-3"
            >
              <p className="text-base font-bold text-slate-900 leading-snug">
                {q.q}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Answer options */}
        <div className="space-y-3">
          {q.opts.map((opt, i) => {
            const isThisSelected = i === selected;
            const isThisCorrect = i === q.ans;
            const revealed = selected !== null;

            let borderColor = "border-slate-200";
            let bgColor = "bg-white";
            let textColor = "text-slate-800";
            let letterBg = "bg-slate-100 text-slate-500";

            if (revealed) {
              if (isThisCorrect) {
                borderColor = "border-emerald-400";
                bgColor = "bg-emerald-50";
                textColor = "text-emerald-800";
                letterBg = "bg-emerald-400 text-white";
              } else if (isThisSelected && !isThisCorrect) {
                borderColor = "border-rose-400";
                bgColor = "bg-rose-50";
                textColor = "text-rose-800";
                letterBg = "bg-rose-400 text-white";
              }
            } else if (isThisSelected) {
              borderColor = "border-violet-400";
              bgColor = "bg-violet-50";
              textColor = "text-violet-800";
              letterBg = "bg-violet-400 text-white";
            }

            return (
              <motion.button
                key={i}
                whileTap={!revealed ? { scale: 0.98 } : {}}
                onClick={() => !revealed && onAnswer(i)}
                disabled={revealed}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${borderColor} ${bgColor}`}
              >
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-all ${letterBg}`}>
                  {optionLetters[i]}
                </span>
                <span className={`text-sm font-medium leading-snug ${textColor}`}>{opt}</span>
                {revealed && isThisCorrect && (
                  <CheckCircle className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />
                )}
                {revealed && isThisSelected && !isThisCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 ml-auto shrink-0" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── Bottom feedback sheet ── */}
      <AnimatePresence>
        {showExp && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className={`px-5 pt-5 pb-safe pb-8 border-t-2 ${
              isCorrect ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {isCorrect
                ? <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                : <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
              <span className={`font-bold text-base ${isCorrect ? "text-emerald-700" : "text-rose-700"}`}>
                {isCorrect ? "Correct!" : "Not quite."}
              </span>
              {!isCorrect && displayHearts > 0 && (
                <span className="ml-auto text-xs text-rose-400 font-medium flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-rose-400" />{displayHearts} left
                </span>
              )}
            </div>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">{q.exp}</p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onNext}
              className={`w-full py-4 rounded-2xl font-bold text-white text-base ${
                isCorrect
                  ? "bg-emerald-500 hover:bg-emerald-600"
                  : "bg-rose-500 hover:bg-rose-600"
              } transition-colors`}
            >
              {currentIdx + 1 >= questions.length ? "See Results" : "Continue"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
