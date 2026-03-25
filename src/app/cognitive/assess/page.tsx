"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Brain, Scale, Sparkles } from "lucide-react";
import {
  getCognitiveQuestions,
  determineCognitiveType,
  buildFunctionStack,
  computeCognitiveConfidence,
  checkResponseConsistency,
  AXIS_LABELS,
  type AxisQuestion,
} from "@/data/cognitive-assessment-questions";

// ── Types ────────────────────────────────────────────────────────────────────

type AssessmentLength = "standard" | "full";
type Screen = "picker" | "assessment" | "calculating";

const AXIS_ORDER: AxisQuestion["axis"][] = ["Ni-Se", "Ne-Si", "Ti-Fe", "Fi-Te"];

// ── Length Picker ────────────────────────────────────────────────────────────

function LengthPicker({ onSelect }: { onSelect: (length: AssessmentLength) => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="max-w-2xl w-full mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-medium mb-4">
            <Brain className="w-3 h-3" /> Cognitive Functions Assessment
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-3">
            Choose Your Assessment
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto text-sm leading-relaxed">
            Based on Jung&apos;s cognitive function theory and Dario Nardi&apos;s neuroscience research.
            Axis-based preference questions — choose which side naturally describes you, not which
            you&apos;re better at.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* Standard */}
          <button
            onClick={() => onSelect("standard")}
            className="group relative text-left p-8 rounded-3xl bg-white border-2 border-slate-100 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100/50 transition-all duration-200"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center mb-5">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">
              Standard Assessment
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-5">
              32 questions across all 4 axes plus 4 built-in consistency checks. Identifies your
              dominant and auxiliary functions clearly.
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="px-2.5 py-1 text-xs rounded-lg bg-sky-50 text-sky-600 font-medium">
                36 questions
              </span>
              <span className="px-2.5 py-1 text-xs rounded-lg bg-slate-50 text-slate-500 font-medium">
                12–18 min
              </span>
              <span className="px-2.5 py-1 text-xs rounded-lg bg-emerald-50 text-emerald-600 font-medium">
                Consistency checks
              </span>
            </div>
            <div className="flex items-center gap-1 text-sky-500 text-sm font-medium">
              Start <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          {/* Full */}
          <button
            onClick={() => onSelect("full")}
            className="group relative text-left p-8 rounded-3xl bg-white border-2 border-slate-100 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-200"
          >
            <div className="absolute top-4 right-4 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white">
              Most Accurate
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mb-5">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">
              Full Assessment
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-5">
              64 questions covering all 8 functions in depth with IRT-informed weighting. Shows the
              complete function stack with percentage scores.
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="px-2.5 py-1 text-xs rounded-lg bg-indigo-50 text-indigo-600 font-medium">
                68 questions
              </span>
              <span className="px-2.5 py-1 text-xs rounded-lg bg-slate-50 text-slate-500 font-medium">
                22–32 min
              </span>
              <span className="px-2.5 py-1 text-xs rounded-lg bg-violet-50 text-violet-600 font-medium">
                Full 8-function stack
              </span>
            </div>
            <div className="flex items-center gap-1 text-indigo-500 text-sm font-medium">
              Start <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>

        <div className="mt-10 p-5 rounded-2xl bg-slate-50 border border-slate-100">
          <h4 className="text-xs font-mono text-sky-600 uppercase tracking-wider mb-2">
            Assessment Methodology
          </h4>
          <p className="text-sm text-slate-500 leading-relaxed">
            Grounded in Carl Jung&apos;s <em>Psychological Types</em> (1921) and Dario Nardi&apos;s EEG
            neuroscience research mapping brain activation patterns to cognitive functions. Questions
            measure preference — which way you naturally lean — not ability. Results show your full
            8-function stack with scores, not just a 4-letter code.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Assessment Component ──────────────────────────────────────────────────────

function AxisAssessment({
  questions,
  onBack,
  onComplete,
}: {
  questions: AxisQuestion[];
  onBack: () => void;
  onComplete: (scores: Record<string, number>, answers: Record<number, "A" | "B">) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [answers, setAnswers] = useState<Record<number, "A" | "B">>({});
  const [direction, setDirection] = useState<1 | -1>(1);

  const q = questions[current];
  const progress = (current / questions.length) * 100;

  // Check if this is a validity check question
  const isValidityCheck = (q as any).isValidityCheck === true;

  const choose = useCallback(
    (option: "A" | "B") => {
      const chosen = option === "A" ? q.optionA : q.optionB;
      const newScores = { ...scores };
      // Validity check questions are weighted at 1 instead of 2 — they
      // contribute less to the score but flag inconsistencies
      const weight = isValidityCheck ? 1 : 2;
      newScores[chosen.func] = (newScores[chosen.func] || 0) + weight;
      setScores(newScores);
      setAnswers((prev) => ({ ...prev, [q.id]: option }));
      setDirection(1);

      if (current < questions.length - 1) {
        setCurrent((c) => c + 1);
      } else {
        onComplete(newScores, { ...answers, [q.id]: option });
      }
    },
    [q, scores, answers, isValidityCheck, current, questions.length, onComplete]
  );

  const goBack = useCallback(() => {
    if (current > 0) {
      const prevQ = questions[current - 1];
      const prevAnswer = answers[prevQ.id];
      if (prevAnswer) {
        const prevChosen = prevAnswer === "A" ? prevQ.optionA : prevQ.optionB;
        const prevIsValidityCheck = (prevQ as any).isValidityCheck === true;
        const weight = prevIsValidityCheck ? 1 : 2;
        const newScores = { ...scores };
        newScores[prevChosen.func] = (newScores[prevChosen.func] || 0) - weight;
        setScores(newScores);
        const newAnswers = { ...answers };
        delete newAnswers[prevQ.id];
        setAnswers(newAnswers);
      }
      setDirection(-1);
      setCurrent((c) => c - 1);
    } else {
      onBack();
    }
  }, [current, questions, answers, scores, onBack]);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400">
              {current + 1} / {questions.length}
            </span>
            <span className="text-xs text-sky-500 font-medium">
              {isValidityCheck ? "Consistency check" : AXIS_LABELS[q.axis]}
            </span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Back */}
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {current === 0 ? "Change assessment" : "Previous"}
        </button>

        {/* Validity check indicator */}
        {isValidityCheck && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-400 text-center"
          >
            This question revisits a theme from earlier — answer based on your natural preference.
          </motion.div>
        )}

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: direction * 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -32 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 leading-snug text-center">
                {q.scenario}
              </h2>
            </div>

            <div className="space-y-4">
              {/* Option A */}
              <button
                onClick={() => choose("A")}
                className="w-full text-left group"
              >
                <div
                  className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                    answers[q.id] === "A"
                      ? "border-sky-400 bg-sky-50 shadow-sm"
                      : "bg-white border-slate-100 hover:border-sky-300 hover:bg-sky-50/30 group-hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition ${
                        answers[q.id] === "A"
                          ? "bg-sky-500 text-white"
                          : "bg-sky-50 group-hover:bg-sky-100"
                      }`}
                    >
                      <span className="text-sm font-mono font-bold text-sky-600"
                        style={answers[q.id] === "A" ? { color: "white" } : {}}>
                        A
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      {q.optionA.text}
                    </p>
                  </div>
                </div>
              </button>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-slate-100" />
                <span className="text-xs text-slate-300 font-medium">or</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>

              {/* Option B */}
              <button
                onClick={() => choose("B")}
                className="w-full text-left group"
              >
                <div
                  className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                    answers[q.id] === "B"
                      ? "border-indigo-400 bg-indigo-50 shadow-sm"
                      : "bg-white border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/30 group-hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition ${
                        answers[q.id] === "B"
                          ? "bg-indigo-500 text-white"
                          : "bg-indigo-50 group-hover:bg-indigo-100"
                      }`}
                    >
                      <span className="text-sm font-mono font-bold text-indigo-600"
                        style={answers[q.id] === "B" ? { color: "white" } : {}}>
                        B
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      {q.optionB.text}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Axis progress indicators */}
        <div className="mt-10 flex justify-center gap-6 flex-wrap">
          {AXIS_ORDER.map((axis) => {
            const isActive = q.axis === axis && !isValidityCheck;
            const axisQs = questions.filter((dq) => dq.axis === axis && !(dq as any).isValidityCheck);
            const answered = axisQs.filter((dq) => answers[dq.id]).length;
            return (
              <div key={axis} className="text-center">
                <div
                  className={`text-[10px] font-mono mb-1.5 ${
                    isActive ? "text-sky-600 font-bold" : "text-slate-300"
                  }`}
                >
                  {axis}
                </div>
                <div className="flex gap-0.5">
                  {axisQs.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i < answered
                          ? "bg-sky-400"
                          : isActive
                          ? "bg-sky-200"
                          : "bg-slate-100"
                      }`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Calculating Screen ────────────────────────────────────────────────────────

function CalculatingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-sm"
      >
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-3">
          Mapping Your Function Stack
        </h2>
        <p className="text-slate-500 text-sm mb-8">
          Scoring all 8 cognitive functions with IRT-informed weighting...
        </p>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden max-w-xs mx-auto">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "90%" }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}

// ── Root Page ─────────────────────────────────────────────────────────────────

export default function CognitiveAssessPage() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>("picker");
  const [length, setLength] = useState<AssessmentLength>("standard");
  const [questions, setQuestions] = useState<AxisQuestion[]>([]);

  const handleLengthSelect = (selected: AssessmentLength) => {
    const qs = getCognitiveQuestions(selected);
    setLength(selected);
    setQuestions(qs);
    setScreen("assessment");
  };

  const handleComplete = (rawScores: Record<string, number>, allAnswers: Record<number, "A" | "B">) => {
    setScreen("calculating");

    setTimeout(() => {
      const type = determineCognitiveType(rawScores);
      const functionStack = buildFunctionStack(rawScores);
      const confidence = computeCognitiveConfidence(rawScores);
      const { consistencyScore, inconsistentAxes } = checkResponseConsistency(allAnswers);

      const params = new URLSearchParams({
        func: type,
        scores: JSON.stringify(functionStack),
        assessmentLength: length,
        confidence: String(confidence),
        consistencyScore: String(consistencyScore),
        inconsistentAxes: JSON.stringify(inconsistentAxes),
      });
      router.push(`/cognitive/results?${params.toString()}`);
    }, 2200);
  };

  if (screen === "picker") {
    return <LengthPicker onSelect={handleLengthSelect} />;
  }

  if (screen === "calculating") {
    return <CalculatingScreen />;
  }

  return (
    <AxisAssessment
      questions={questions}
      onBack={() => setScreen("picker")}
      onComplete={handleComplete}
    />
  );
}
