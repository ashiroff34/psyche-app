"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: { text: string; scores: Record<string, number> }[];
}

interface QuizResults {
  scores: Record<string, number>;
  topResult: string;
  allScores: { key: string; score: number; percentage: number }[];
}

export default function QuizAssessment({
  questions,
  type,
  onComplete,
}: {
  questions: Question[];
  type: "enneagram" | "cognitive";
  onComplete: (results: QuizResults) => void;
}) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const progress = ((currentQ + 1) / questions.length) * 100;
  const question = questions[currentQ];

  const selectOption = (optionIdx: number) => {
    setSelectedOption(optionIdx);
  };

  const nextQuestion = () => {
    if (selectedOption === null) return;

    const newAnswers = { ...answers, [question.id]: selectedOption };
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Calculate scores
      const scores: Record<string, number> = {};
      Object.entries(newAnswers).forEach(([qId, optIdx]) => {
        const q = questions.find((qu) => qu.id === parseInt(qId));
        if (q) {
          const option = q.options[optIdx];
          Object.entries(option.scores).forEach(([key, value]) => {
            scores[key] = (scores[key] || 0) + value;
          });
        }
      });

      const maxScore = Math.max(...Object.values(scores));
      const topResult = Object.entries(scores).sort(
        ([, a], [, b]) => b - a
      )[0][0];

      const allScores = Object.entries(scores)
        .map(([key, score]) => ({
          key,
          score,
          percentage: Math.round((score / maxScore) * 100),
        }))
        .sort((a, b) => b.score - a.score);

      onComplete({ scores, topResult, allScores });
    }
  };

  const prevQuestion = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      setSelectedOption(answers[questions[currentQ - 1].id] ?? null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>
            Question {currentQ + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-xl font-serif font-semibold text-slate-800 mb-8">
            {question.text}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => selectOption(idx)}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                  selectedOption === idx
                    ? "border-sky-400 bg-sky-50 shadow-sm"
                    : "border-slate-100 bg-white hover:border-sky-200 hover:bg-sky-50/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      selectedOption === idx
                        ? "border-sky-500 bg-sky-500"
                        : "border-slate-300"
                    }`}
                  >
                    {selectedOption === idx && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span
                    className={`text-sm leading-relaxed ${
                      selectedOption === idx
                        ? "text-sky-900 font-medium"
                        : "text-slate-600"
                    }`}
                  >
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10">
        <button
          onClick={prevQuestion}
          disabled={currentQ === 0}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={nextQuestion}
          disabled={selectedOption === null}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-sky-500 to-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
        >
          {currentQ === questions.length - 1 ? "See Results" : "Next"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
