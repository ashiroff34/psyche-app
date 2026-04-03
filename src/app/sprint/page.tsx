"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Timer, Zap, CheckCircle, XCircle, Trophy, ArrowRight, Flame, Star } from "lucide-react";
import { useGameState } from "@/hooks/useGameState";
import { typeQuizQuestions } from "@/data/type-quizzes";
import PetCompanion from "@/components/PetCompanion";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Types ────────────────────────────────────────────────────────────────────

type GamePhase = "intro" | "playing" | "answered" | "finished";

interface SprintAnswer {
  correct: boolean;
  xpEarned: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SPRINT_DURATION = 60; // seconds
const XP_PER_CORRECT = 8;
const XP_STREAK_BONUS = 4; // extra XP per question when on a 3+ streak

// ─── Component ────────────────────────────────────────────────────────────────

export default function SprintPage() {
  const { earnXP, unlockBadge, recordQuizComplete } = useGameState();

  const [phase, setPhase] = useState<GamePhase>("intro");
  const [questions, setQuestions] = useState<typeof typeQuizQuestions>([]);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(SPRINT_DURATION);
  const [answers, setAnswers] = useState<SprintAnswer[]>([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [showXPPop, setShowXPPop] = useState<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const [petType, setPetType] = useState<number>(4);

  // Read enneagram type from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("psyche-profile");
      if (raw) {
        const profile = JSON.parse(raw);
        if (profile.type && typeof profile.type === "number") {
          setPetType(profile.type);
        }
      }
    } catch {}
  }, []);

  const currentQ = questions[qIndex];
  const correct = answers.filter((a) => a.correct).length;
  const wrong = answers.filter((a) => !a.correct).length;
  const accuracy = answers.length > 0 ? Math.round((correct / answers.length) * 100) : 0;

  // ── Timer ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== "playing") return;
    if (timeLeft <= 0) {
      finishGame();
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, timeLeft]);

  // ── Game Logic ─────────────────────────────────────────────────────────────

  const startGame = () => {
    const q = shuffleArray(typeQuizQuestions).slice(0, 40); // cap at 40 for UX
    setQuestions(q);
    setQIndex(0);
    setSelected(null);
    setTimeLeft(SPRINT_DURATION);
    setAnswers([]);
    setStreak(0);
    setBestStreak(0);
    setTotalXP(0);
    startTimeRef.current = Date.now();
    setPhase("playing");
  };

  const finishGame = useCallback(() => {
    setPhase("finished");
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    // Speed demon badge, finished a quiz under 60s (used all time perfectly or got through questions fast)
    if (elapsed < 60 && correct >= 5) {
      unlockBadge("speed-demon");
    }
    recordQuizComplete(elapsed, accuracy);
  }, [correct, accuracy, unlockBadge, recordQuizComplete]);

  const handleAnswer = (letter: string) => {
    if (selected !== null || phase !== "playing") return;
    setSelected(letter);
    setPhase("answered");

    const isCorrect = letter === currentQ.answer;
    const newStreak = isCorrect ? streak + 1 : 0;
    const newBest = Math.max(bestStreak, newStreak);

    let xp = isCorrect ? XP_PER_CORRECT : 0;
    if (isCorrect && newStreak >= 3) xp += XP_STREAK_BONUS;

    setStreak(newStreak);
    setBestStreak(newBest);
    setTotalXP((prev) => prev + xp);
    setAnswers((prev) => [...prev, { correct: isCorrect, xpEarned: xp }]);

    if (xp > 0) {
      setShowXPPop(xp);
      setTimeout(() => setShowXPPop(null), 700);
    }

    // Brief pause then advance
    setTimeout(() => {
      const nextIdx = qIndex + 1;
      if (nextIdx >= questions.length || timeLeft <= 0) {
        finishGame();
      } else {
        setQIndex(nextIdx);
        setSelected(null);
        setPhase("playing");
      }
    }, 500);
  };

  // Award XP on finish (once)
  const xpAwarded = useRef(false);
  useEffect(() => {
    if (phase === "finished" && !xpAwarded.current && totalXP > 0) {
      xpAwarded.current = true;
      earnXP(totalXP, "Sprint Mode");
    }
  }, [phase, totalXP, earnXP]);

  // ── Timer color ────────────────────────────────────────────────────────────

  const timerColor =
    timeLeft <= 10
      ? "text-rose-500"
      : timeLeft <= 20
      ? "text-amber-500"
      : "text-emerald-500";

  const timerBg =
    timeLeft <= 10
      ? "bg-rose-50 border-rose-200"
      : timeLeft <= 20
      ? "bg-amber-50 border-amber-200"
      : "bg-emerald-50 border-emerald-200";

  // ─── Intro ─────────────────────────────────────────────────────────────────

  if (phase === "intro") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-violet-50 via-white to-sky-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-xl shadow-violet-200/60 mb-6 mx-auto">
            <Timer className="w-9 h-9 text-white" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="text-3xl font-serif font-bold text-slate-900">Sprint Mode</h1>
            <PetCompanion type={petType} size={48} />
          </div>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            Answer as many questions as you can in <strong>60 seconds</strong>.<br/>
            Build streaks for bonus XP. No hearts lost, just go fast.
          </p>

          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { label: "60 sec", sub: "Time limit", icon: "⏱️" },
              { label: "+8 XP", sub: "Per correct", icon: "⚡" },
              { label: "+4 bonus", sub: "On 3× streak", icon: "🔥" },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-sm font-bold text-slate-800">{s.label}</div>
                <div className="text-[10px] text-slate-400">{s.sub}</div>
              </div>
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={startGame}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold text-lg shadow-lg shadow-violet-200/60 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Start Sprint
          </motion.button>

          <Link href="/game" className="mt-4 block text-sm text-slate-400 hover:text-slate-600 transition-colors">
            ← Back to Game
          </Link>
        </motion.div>
      </div>
    );
  }

  // ─── Finished ──────────────────────────────────────────────────────────────

  if (phase === "finished") {
    const grade =
      accuracy >= 90 ? { label: "Brilliant!", color: "text-emerald-600", bg: "from-emerald-400 to-teal-500" } :
      accuracy >= 70 ? { label: "Solid!", color: "text-sky-600", bg: "from-sky-400 to-indigo-500" } :
      accuracy >= 50 ? { label: "Nice try!", color: "text-violet-600", bg: "from-violet-400 to-purple-500" } :
      { label: "Keep practicing!", color: "text-amber-600", bg: "from-amber-400 to-orange-500" };

    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-violet-50 via-white to-sky-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className={`rounded-3xl bg-gradient-to-r ${grade.bg} p-8 text-center text-white mb-4 shadow-xl`}>
            <div className="text-4xl mb-2">🏁</div>
            <h2 className="text-2xl font-serif font-bold mb-1">{grade.label}</h2>
            <p className="text-white/70 text-sm">{answers.length} questions in 60 seconds</p>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Correct", value: correct, icon: "✅" },
                { label: "Wrong", value: wrong, icon: "❌" },
                { label: "Accuracy", value: `${accuracy}%`, icon: "🎯" },
                { label: "Best Streak", value: `${bestStreak}×`, icon: "🔥" },
              ].map((s) => (
                <div key={s.label} className="text-center p-3 rounded-2xl bg-slate-50">
                  <div className="text-xl mb-1">{s.icon}</div>
                  <div className="text-xl font-bold text-slate-800">{s.value}</div>
                  <div className="text-xs text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pet reaction */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-4 flex items-center gap-4">
            <PetCompanion type={petType} size={56} state="happy" />
            <p className="text-sm font-medium text-slate-600">
              {accuracy >= 90
                ? "Your companion is proud!"
                : accuracy >= 50
                ? "Your companion cheers you on!"
                : "Your companion believes in you!"}
            </p>
          </div>

          {/* XP earned */}
          <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-2xl border border-indigo-100 p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-500" />
              <span className="font-semibold text-indigo-700">XP Earned</span>
            </div>
            <span className="text-2xl font-bold text-indigo-600">+{totalXP}</span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={startGame}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold shadow-md hover:shadow-lg transition-all"
            >
              Play Again
            </button>
            <Link
              href="/game"
              className="flex-1 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold text-center hover:border-slate-300 transition-all"
            >
              Game Hub
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Playing / Answered ────────────────────────────────────────────────────

  if (!currentQ) return null;

  const timerPct = (timeLeft / SPRINT_DURATION) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-sky-50 px-4 py-6 flex flex-col max-w-lg mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        {/* Timer */}
        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border font-mono font-bold text-lg ${timerBg} ${timerColor} ${timeLeft <= 10 ? "animate-pulse" : ""}`}>
          <Timer className="w-4 h-4" />
          {timeLeft}s
        </div>

        {/* Streak */}
        <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white border border-orange-100">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="font-bold text-slate-700 text-sm">{streak}</span>
          <span className="text-xs text-slate-400">streak</span>
        </div>

        {/* Score */}
        <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white border border-indigo-100">
          <Zap className="w-4 h-4 text-indigo-500" />
          <span className="font-bold text-indigo-600 text-sm">{totalXP} XP</span>
        </div>
      </div>

      {/* Timer bar */}
      <div className="h-1.5 bg-slate-100 rounded-full mb-6 overflow-hidden">
        <motion.div
          animate={{ width: `${timerPct}%` }}
          transition={{ duration: 0.5 }}
          className={`h-full rounded-full ${
            timeLeft <= 10 ? "bg-rose-400" : timeLeft <= 20 ? "bg-amber-400" : "bg-emerald-400"
          }`}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={qIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.15 }}
          className="flex-1"
        >
          {/* Category tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-600 text-xs font-medium mb-4">
            <Star className="w-3 h-3" />
            Type {currentQ.type} · {currentQ.category}
          </div>

          <h2 className="text-lg font-semibold text-slate-800 leading-snug mb-6">
            {currentQ.question}
          </h2>

          {/* Answer options */}
          <div className="space-y-3">
            {currentQ.options.map((opt) => {
              const isSelected = selected === opt.letter;
              const isCorrectAnswer = opt.letter === currentQ.answer;
              const showResult = selected !== null;

              let style = "bg-white border-slate-200 text-slate-700";
              if (showResult && isCorrectAnswer) style = "bg-emerald-50 border-emerald-400 text-emerald-700";
              else if (showResult && isSelected && !isCorrectAnswer) style = "bg-rose-50 border-rose-400 text-rose-700";

              return (
                <motion.button
                  key={opt.letter}
                  whileTap={{ scale: selected === null ? 0.98 : 1 }}
                  onClick={() => handleAnswer(opt.letter)}
                  disabled={selected !== null}
                  className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${style} ${selected === null ? "hover:border-violet-300 hover:bg-violet-50 cursor-pointer" : "cursor-default"}`}
                >
                  <span className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-bold shrink-0 text-slate-500">
                    {opt.letter}
                  </span>
                  <span className="text-sm font-medium leading-snug">{opt.text}</span>
                  {showResult && isCorrectAnswer && <CheckCircle className="w-4 h-4 text-emerald-500 ml-auto shrink-0" />}
                  {showResult && isSelected && !isCorrectAnswer && <XCircle className="w-4 h-4 text-rose-500 ml-auto shrink-0" />}
                </motion.button>
              );
            })}
          </div>

          {/* XP pop */}
          <AnimatePresence>
            {showXPPop !== null && (
              <motion.div
                key="xp"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -20 }}
                exit={{ opacity: 0 }}
                className="fixed top-24 right-6 text-lg font-bold text-indigo-600 pointer-events-none"
              >
                +{showXPPop} XP
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Progress footer */}
      <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
        <span>{answers.length} answered</span>
        <span>{correct} correct · {wrong} wrong</span>
      </div>
    </div>
  );
}
