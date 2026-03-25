"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Trophy, BarChart3 } from "lucide-react";
import { typeQuizQuestions } from "@/data/type-quizzes";
import { enneagramTypes } from "@/data/enneagram";
import DailyQuiz from "@/components/DailyQuiz";

function QuizContent() {
  const searchParams = useSearchParams();
  const typeParam = parseInt(searchParams.get("type") ?? "0");
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const typeData = enneagramTypes.find((t) => t.number === typeParam);
  const questions = useMemo(
    () => typeQuizQuestions.filter((q) => q.type === typeParam).sort((a, b) => a.difficulty - b.difficulty || a.id - b.id),
    [typeParam]
  );

  // Save best score & load previous best
  useEffect(() => {
    if (finished) {
      try {
        const key = `thyself-quiz-best-${typeParam}`;
        const prev = parseInt(localStorage.getItem(key) ?? "0");
        setBestScore(prev);
        if (finalScore > prev) {
          localStorage.setItem(key, String(finalScore));
          setBestScore(finalScore);
        }
      } catch {}
    }
  }, [finished, finalScore, typeParam]);

  if (!typeData || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-serif font-bold text-slate-800 mb-2">Select a Type</h2>
          <p className="text-slate-500 mb-6">Choose an Enneagram type to take its full 50-question quiz.</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {enneagramTypes.map((t) => (
              <Link
                key={t.number}
                href={`/enneagram/quiz?type=${t.number}`}
                className="px-4 py-2 rounded-xl text-sm font-medium border border-slate-200 hover:border-sky-300 hover:bg-sky-50 transition-all"
                style={{ borderColor: `${t.color}40` }}
              >
                <span className="mr-1">{t.icon}</span> {t.number}. {t.name.replace("The ", "")}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((finalScore / finalTotal) * 100);
    const best = bestScore;

    // Score breakdown by difficulty
    const byDifficulty: Record<number, { correct: number; total: number }> = {};
    questions.forEach((q, i) => {
      if (!byDifficulty[q.difficulty]) byDifficulty[q.difficulty] = { correct: 0, total: 0 };
      byDifficulty[q.difficulty].total++;
    });

    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div
              className="w-20 h-20 rounded-3xl mx-auto mb-4 flex items-center justify-center text-white text-3xl font-serif font-bold shadow-lg"
              style={{ backgroundColor: typeData.color }}
            >
              {typeData.number}
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-1">
              {typeData.name} Quiz Complete
            </h2>
            <p className="text-slate-500">
              You scored <strong className="text-slate-800">{finalScore}/{finalTotal}</strong> ({pct}%)
            </p>
            {finalScore > best && best > 0 && (
              <p className="text-amber-600 font-semibold mt-1">New personal best!</p>
            )}
          </div>

          <div className="flex gap-3 mb-8">
            <Link
              href={`/enneagram/quiz?type=${typeParam}`}
              onClick={() => { setFinished(false); setFinalScore(0); }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold shadow-lg transition-all active:scale-[0.97]"
            >
              Retry Quiz
            </Link>
            <Link
              href="/enneagram/learn"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-medium transition-all hover:bg-slate-50"
            >
              Back to Learn
            </Link>
          </div>

          {/* Try other types */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Try another type</h3>
            <div className="flex flex-wrap gap-2">
              {enneagramTypes.filter((t) => t.number !== typeParam).map((t) => (
                <Link
                  key={t.number}
                  href={`/enneagram/quiz?type=${t.number}`}
                  onClick={() => { setFinished(false); setFinalScore(0); }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border hover:shadow-sm transition-all"
                  style={{ borderColor: `${t.color}40`, color: t.color }}
                >
                  {t.number}. {t.name.replace("The ", "")}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/enneagram/learn" className="p-2 rounded-xl hover:bg-slate-100 transition">
            <ArrowLeft className="w-5 h-5 text-slate-500" />
          </Link>
          <div>
            <h1 className="text-lg font-serif font-bold text-slate-900">
              Type {typeData.number}: {typeData.name}
            </h1>
            <p className="text-xs text-slate-400">{questions.length} questions &middot; All difficulty levels</p>
          </div>
          <div
            className="ml-auto w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: typeData.color }}
          >
            {typeData.number}
          </div>
        </div>

        <DailyQuiz
          questions={questions}
          trackName={`Full Quiz: ${typeData.name}`}
          onComplete={(score, total, tokens, _answers) => {
            setFinalScore(score);
            setFinalTotal(total);
            setFinished(true);
          }}
        />
      </div>
    </div>
  );
}

export default function EnneagramQuizPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
      </div>
    }>
      <QuizContent />
    </Suspense>
  );
}
