"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, XCircle, Heart, Zap, Trophy, ArrowRight } from "lucide-react";

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
}: Props) {
  const q = questions[currentIdx];

  // ── Completion screen ──
  if (completed) {
    const correctCount = answers.filter(Boolean).length;
    const totalCount = questions.length;
    const pct = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    const isPerfect = correctCount === totalCount;

    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center px-6" style={{ maxWidth: 640, margin: "0 auto" }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="flex flex-col items-center text-center"
        >
          {/* Trophy */}
          <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
            style={{ background: isPerfect ? "linear-gradient(135deg, #fbbf24, #f59e0b)" : "linear-gradient(135deg, #8b5cf6, #d946ef)" }}>
            <Trophy className="w-12 h-12 text-white" />
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {isPerfect ? "Perfect!" : "Complete!"}
          </h2>
          <p className="text-slate-500 text-base mb-8">{moduleName}</p>

          {/* Score */}
          <div className="flex items-center gap-6 mb-8">
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

          {/* Back to Path button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onQuit}
            className="w-full max-w-xs py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2"
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
  const hearts = Math.max(0, 3 - answers.filter(a => !a).length);
  const progress = Math.round(((currentIdx) / questions.length) * 100);
  const diffLabel = q.difficulty === 1 ? "Beginner" : q.difficulty === 2 ? "Intermediate" : "Advanced";

  const optionLetters = ["A", "B", "C", "D"];

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col" style={{ maxWidth: 640, margin: "0 auto" }}>

      {/* ── Top bar: X | progress bar | hearts ── */}
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
          {[0, 1, 2].map(i => (
            <Heart
              key={i}
              className={`w-5 h-5 ${i < hearts ? "text-rose-500 fill-rose-500" : "text-slate-200 fill-slate-200"}`}
            />
          ))}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-2">

        {/* Module + difficulty */}
        <div className="flex items-center gap-2 mb-5">
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

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.p
            key={q.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="text-xl font-bold text-slate-900 leading-snug mb-8"
          >
            {q.q}
          </motion.p>
        </AnimatePresence>

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
