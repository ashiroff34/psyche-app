"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Timer, Zap, CheckCircle, XCircle, Trophy, ArrowRight, Flame, Star } from "lucide-react";
import { useGameState } from "@/hooks/useGameState";
import { typeQuizQuestions } from "@/data/type-quizzes";
import PetCompanion from "@/components/PetCompanion";
import { stableShuffleOptions } from "@/lib/shuffleOptions";

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
  typeNum: number;
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

  // Stable shuffle of current question's options per question ID
  const { shuffledSprintOpts, shuffledSprintAnswer } = useMemo(() => {
    if (!currentQ) return { shuffledSprintOpts: [] as { letter: string; text: string }[], shuffledSprintAnswer: "" };
    const correctIdx = currentQ.options.findIndex(o => o.letter === currentQ.answer);
    const { shuffled } = stableShuffleOptions(currentQ.options, correctIdx, String(currentQ.id));
    const LETTERS = ["A", "B", "C", "D"];
    const newAnswerIdx = shuffled.findIndex(o => o.letter === currentQ.answer);
    return {
      shuffledSprintOpts: shuffled,
      shuffledSprintAnswer: LETTERS[newAnswerIdx] ?? currentQ.answer,
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQ?.id]);

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

    const isCorrect = letter === shuffledSprintAnswer;
    const newStreak = isCorrect ? streak + 1 : 0;
    const newBest = Math.max(bestStreak, newStreak);

    let xp = isCorrect ? XP_PER_CORRECT : 0;
    if (isCorrect && newStreak >= 3) xp += XP_STREAK_BONUS;

    setStreak(newStreak);
    setBestStreak(newBest);
    setTotalXP((prev) => prev + xp);
    setAnswers((prev) => [...prev, { correct: isCorrect, xpEarned: xp, typeNum: currentQ.type }]);

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
      ? "border-rose-500/40"
      : timeLeft <= 20
      ? "border-amber-500/40"
      : "border-emerald-500/40";

  const timerBgStyle =
    timeLeft <= 10
      ? "rgba(239,68,68,0.12)"
      : timeLeft <= 20
      ? "rgba(245,158,11,0.12)"
      : "rgba(52,211,153,0.12)";

  // ─── Intro ─────────────────────────────────────────────────────────────────

  if (phase === "intro") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0f0a1e" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 mx-auto" style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)" }}>
            <Timer className="w-9 h-9 text-white" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="text-3xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.92)" }}>Sprint Mode</h1>
            <PetCompanion type={petType} size={48} />
          </div>
          <p className="text-sm mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            Answer as many questions as you can in <strong style={{ color: "rgba(255,255,255,0.7)" }}>60 seconds</strong>.<br/>
            Build streaks for bonus XP. No hearts lost, just go fast.
          </p>

          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { label: "60 sec", sub: "Time limit", icon: "(:)" },
              { label: "+8 XP", sub: "Per correct", icon: "(+)" },
              { label: "+4 bonus", sub: "On 3x streak", icon: "(*)" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <div className="text-lg mb-1 font-mono" style={{ color: "rgba(167,139,250,0.8)" }}>{s.icon}</div>
                <div className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.85)" }}>{s.label}</div>
                <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>{s.sub}</div>
              </div>
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={startGame}
            className="w-full py-4 rounded-2xl text-white font-bold text-lg transition-all"
            style={{ background: "linear-gradient(to right, #7c3aed, #6366f1)" }}
          >
            Start Sprint
          </motion.button>

          <Link href="/game" className="mt-4 block text-sm transition-colors" style={{ color: "rgba(255,255,255,0.3)" }}>
            Back to Game
          </Link>
        </motion.div>
      </div>
    );
  }

  // ─── Finished ──────────────────────────────────────────────────────────────

  if (phase === "finished") {
    const grade =
      accuracy >= 90 ? { label: "Brilliant", gradient: "from-emerald-400 to-teal-500", color: "#34d399" } :
      accuracy >= 70 ? { label: "Solid", gradient: "from-sky-400 to-indigo-500", color: "#38bdf8" } :
      accuracy >= 50 ? { label: "Good effort", gradient: "from-violet-400 to-purple-500", color: "#a78bfa" } :
      { label: "Keep practicing", gradient: "from-amber-400 to-orange-500", color: "#fbbf24" };

    // Per-type accuracy breakdown
    const typeBreakdown = Array.from({ length: 9 }, (_, i) => {
      const t = i + 1;
      const forType = answers.filter((a) => a.typeNum === t);
      const typeCorrect = forType.filter((a) => a.correct).length;
      return { type: t, total: forType.length, correct: typeCorrect };
    }).filter((r) => r.total > 0);

    return (
      <div className="min-h-screen px-4 py-8" style={{ background: "#0f0a1e" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md mx-auto"
        >
          {/* Header */}
          <div
            className="rounded-3xl p-6 text-center mb-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
          >
            <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
              Sprint complete
            </p>
            <h2 className="text-3xl font-serif font-bold mb-1" style={{ color: grade.color }}>
              {grade.label}
            </h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              {answers.length} question{answers.length !== 1 ? "s" : ""} in 60 seconds
            </p>

            {/* Accuracy bar */}
            <div className="mt-4 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${grade.gradient}`}
                initial={{ width: "0%" }}
                animate={{ width: `${accuracy}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <p className="text-xs mt-1.5 font-mono font-semibold" style={{ color: grade.color }}>
              {accuracy}% accuracy
            </p>
          </div>

          {/* Stats grid */}
          <div
            className="rounded-2xl p-5 mb-4 grid grid-cols-2 gap-3"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
          >
            {[
              { label: "Correct", value: correct, color: "#34d399" },
              { label: "Wrong", value: wrong, color: "#f87171" },
              { label: "Best streak", value: `${bestStreak}×`, color: "#fbbf24" },
              { label: "XP earned", value: `+${totalXP}`, color: "#a78bfa" },
            ].map((s) => (
              <div
                key={s.label}
                className="p-3 rounded-xl text-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="text-xl font-bold font-mono mb-0.5" style={{ color: s.color }}>{s.value}</div>
                <div className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Per-type breakdown */}
          {typeBreakdown.length > 0 && (
            <div
              className="rounded-2xl p-4 mb-4"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
                Accuracy by type
              </p>
              <div className="space-y-2">
                {typeBreakdown.map(({ type: t, total, correct: tc }) => {
                  const pct = Math.round((tc / total) * 100);
                  const barColor = pct >= 70 ? "#34d399" : pct >= 40 ? "#fbbf24" : "#f87171";
                  return (
                    <div key={t} className="flex items-center gap-2">
                      <span className="text-[10px] font-mono w-8 shrink-0" style={{ color: "rgba(255,255,255,0.4)" }}>T{t}</span>
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: barColor }}
                          initial={{ width: "0%" }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 * (t - 1) }}
                        />
                      </div>
                      <span className="text-[10px] font-mono w-10 text-right shrink-0" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {tc}/{total}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pet reaction */}
          <div
            className="rounded-2xl p-4 mb-4 flex items-center gap-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
          >
            <PetCompanion type={petType} size={52} state="happy" />
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
              {accuracy >= 90
                ? "Outstanding precision."
                : accuracy >= 50
                ? "Solid session. Keep going."
                : "Every sprint builds the pattern."}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={startGame}
              className="flex-1 py-3.5 rounded-2xl font-bold text-sm"
              style={{ background: `linear-gradient(to right, #7c3aed, #6366f1)`, color: "white" }}
            >
              Play Again
            </button>
            <Link
              href="/game"
              className="flex-1 py-3.5 rounded-2xl font-semibold text-sm text-center"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
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
    <div className="min-h-screen px-4 py-6 flex flex-col max-w-lg mx-auto" style={{ background: "#0f0a1e" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        {/* Timer */}
        <div
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border font-mono font-bold text-lg ${timerBg} ${timerColor} ${timeLeft <= 10 ? "animate-pulse" : ""}`}
          style={{ background: timerBgStyle }}
        >
          <Timer className="w-4 h-4" />
          {timeLeft}s
        </div>

        {/* Streak */}
        <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
          <Flame className="w-4 h-4 text-orange-400" />
          <span className="font-bold text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>{streak}</span>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>streak</span>
        </div>

        {/* Score */}
        <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
          <Zap className="w-4 h-4 text-violet-400" />
          <span className="font-bold text-sm" style={{ color: "#a78bfa" }}>{totalXP} XP</span>
        </div>
      </div>

      {/* Timer bar */}
      <div className="h-1.5 rounded-full mb-6 overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4" style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa" }}>
            <Star className="w-3 h-3" />
            Type {currentQ.type} {currentQ.category}
          </div>

          <h2 className="text-lg font-semibold leading-snug mb-6" style={{ color: "rgba(255,255,255,0.9)" }}>
            {currentQ.question}
          </h2>

          {/* Answer options */}
          {(() => {
            const SPRINT_LETTERS = ["A", "B", "C", "D"];
            return (
              <div className="space-y-3">
                {shuffledSprintOpts.map((opt, idx) => {
                  const visualLetter = SPRINT_LETTERS[idx];
                  const isSelected = selected === visualLetter;
                  const isCorrectAnswer = visualLetter === shuffledSprintAnswer;
                  const showResult = selected !== null;

                  const btnBg = showResult && isCorrectAnswer
                    ? "rgba(52,211,153,0.12)"
                    : showResult && isSelected && !isCorrectAnswer
                    ? "rgba(248,113,113,0.12)"
                    : "rgba(255,255,255,0.05)";
                  const btnBorder = showResult && isCorrectAnswer
                    ? "rgba(52,211,153,0.5)"
                    : showResult && isSelected && !isCorrectAnswer
                    ? "rgba(248,113,113,0.5)"
                    : "rgba(255,255,255,0.1)";
                  const btnColor = showResult && isCorrectAnswer
                    ? "#34d399"
                    : showResult && isSelected && !isCorrectAnswer
                    ? "#f87171"
                    : "rgba(255,255,255,0.8)";

                  return (
                    <motion.button
                      key={opt.letter}
                      whileTap={{ scale: selected === null ? 0.98 : 1 }}
                      onClick={() => handleAnswer(visualLetter)}
                      disabled={selected !== null}
                      className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${selected === null ? "cursor-pointer" : "cursor-default"}`}
                      style={{ background: btnBg, borderColor: btnBorder, color: btnColor }}
                    >
                      <span className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
                        {visualLetter}
                      </span>
                      <span className="text-sm font-medium leading-snug">{opt.text}</span>
                      {showResult && isCorrectAnswer && <CheckCircle className="w-4 h-4 text-emerald-400 ml-auto shrink-0" />}
                      {showResult && isSelected && !isCorrectAnswer && <XCircle className="w-4 h-4 text-rose-400 ml-auto shrink-0" />}
                    </motion.button>
                  );
                })}
              </div>
            );
          })()}

          {/* XP pop */}
          <AnimatePresence>
            {showXPPop !== null && (
              <motion.div
                key="xp"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -20 }}
                exit={{ opacity: 0 }}
                className="fixed top-24 right-6 text-lg font-bold pointer-events-none"
                style={{ color: "#a78bfa" }}
              >
                +{showXPPop} XP
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Progress footer */}
      <div className="mt-6 flex items-center justify-between text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
        <span>{answers.length} answered</span>
        <span>{correct} correct  {wrong} wrong</span>
      </div>
    </div>
  );
}
