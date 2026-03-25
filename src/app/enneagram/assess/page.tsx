"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Brain, Sparkles, Compass, BookOpen, Star } from "lucide-react";
import NextStepBanner from "@/components/NextStepBanner";
import SelfIdentification from "@/components/assessments/SelfIdentification";
import { useProfile } from "@/hooks/useProfile";
import {
  getAssessmentQuestions,
  scoreEnneagramResponses,
  computeConfidence,
  shouldShowTwoTypes,
  scoreInstinctResponses,
  instinctQuestions,
  type LikertQuestion,
} from "@/data/enneagram-assessment-questions";

// ── Types ────────────────────────────────────────────────────────────────────

type AssessmentLength = "standard" | "deep" | "self-id";
type Screen = "picker" | "assessment" | "instincts" | "calculating" | "self-id";

const LIKERT_LABELS: Record<number, string> = {
  1: "Not me at all",
  2: "Rarely me",
  3: "Sometimes me",
  4: "Often me",
  5: "Very much me",
};

// ── Length Picker ────────────────────────────────────────────────────────────

function LengthPicker({ onSelect }: { onSelect: (length: AssessmentLength) => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="max-w-2xl w-full mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-600 text-xs font-medium mb-4">
            <Sparkles className="w-3 h-3" /> Enneagram Assessment
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-3">
            Choose Your Assessment
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto text-sm leading-relaxed">
            Both paths are based on iEQ9 and WEPSS validated methodology — measuring core motivation
            and fear, not just surface behavior. Answer honestly based on how you actually are inside,
            not how you&apos;d like to be.
          </p>
        </div>

        {/* Self-Identification — Recommended */}
        <button
          onClick={() => onSelect("self-id")}
          className="group relative w-full text-left p-8 rounded-3xl bg-white border-2 border-amber-200 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-100/50 transition-all duration-200 mb-5"
        >
          <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <Star className="w-3 h-3" /> Recommended
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-5">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">
            Self-Identification
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-2">
            The method recommended by virtually every Enneagram expert — from Russ Hudson to Beatrice
            Chestnut to David Daniels at Stanford. Read detailed type descriptions with guided questions
            to help you see yourself honestly.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed mb-5">
            Why? Because the Enneagram targets your <em>blind spots</em> — the patterns you can&apos;t
            see about yourself. No test can fully access your inner motivations. Only you can.
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="px-2.5 py-1 text-xs rounded-lg bg-amber-50 text-amber-600 font-medium">
              ~10 min
            </span>
            <span className="px-2.5 py-1 text-xs rounded-lg bg-orange-50 text-orange-600 font-medium">
              Expert recommended
            </span>
          </div>
          <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
            Start <ArrowRight className="w-4 h-4" />
          </div>
        </button>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* Standard */}
          <button
            onClick={() => onSelect("standard")}
            className="group relative text-left p-8 rounded-3xl bg-white border-2 border-slate-100 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100/50 transition-all duration-200"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center mb-5">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">
              Standard Assessment
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-5">
              36 core questions covering all 9 types, plus 9 instinct variant questions. Based on
              iEQ9 and WEPSS validated methodology.
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="px-2.5 py-1 text-xs rounded-lg bg-sky-50 text-sky-600 font-medium">
                45 questions
              </span>
              <span className="px-2.5 py-1 text-xs rounded-lg bg-slate-50 text-slate-500 font-medium">
                12–18 min
              </span>
              <span className="px-2.5 py-1 text-xs rounded-lg bg-emerald-50 text-emerald-600 font-medium">
                Good accuracy
              </span>
            </div>
            <div className="flex items-center gap-1 text-sky-500 text-sm font-medium">
              Start <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          {/* Deep */}
          <button
            onClick={() => onSelect("deep")}
            className="group relative text-left p-8 rounded-3xl bg-white border-2 border-slate-100 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-200"
          >
            <div className="absolute top-4 right-4 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white">
              Most Scientific
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mb-5">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">
              Deep Assessment
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-3">
              144 questions covering motivation, integration, and disintegration patterns across all
              9 types, plus instinct variant scoring.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed mb-5">
              Based on RHETI, iEQ9, and WEPSS validated instruments — the most data-driven self-report
              option. Best for confirming your type after self-identification.
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="px-2.5 py-1 text-xs rounded-lg bg-indigo-50 text-indigo-600 font-medium">
                153 questions
              </span>
              <span className="px-2.5 py-1 text-xs rounded-lg bg-slate-50 text-slate-500 font-medium">
                50–65 min
              </span>
              <span className="px-2.5 py-1 text-xs rounded-lg bg-violet-50 text-violet-600 font-medium">
                iEQ9 + WEPSS
              </span>
            </div>
            <div className="flex items-center gap-1 text-indigo-500 text-sm font-medium">
              Start <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>

        <div className="mt-8 p-5 rounded-2xl bg-slate-50 border border-slate-100">
          <h4 className="text-xs font-mono text-sky-600 uppercase tracking-wider mb-2">
            Why This Assessment Is Different
          </h4>
          <p className="text-sm text-slate-500 leading-relaxed">
            Most Enneagram tests measure behavior ("I help others"). This assessment is based on
            iEQ9 methodology, which targets the motivation behind behavior ("My sense of worth
            depends on being needed"). Core motivation discriminates between types far more reliably
            than behavior, which many types share.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Assessment Component ──────────────────────────────────────────────────────

function LikertAssessment({
  questions,
  onBack,
  onComplete,
}: {
  questions: LikertQuestion[];
  onBack: () => void;
  onComplete: (answers: Record<number, number>) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;
  const totalAnswered = Object.keys(answers).length;

  const handleSelect = useCallback(
    (val: number) => {
      setSelectedValue(val);
      // Auto-advance after 350ms
      setTimeout(() => {
        const newAnswers = { ...answers, [q.id]: val };
        setAnswers(newAnswers);
        setSelectedValue(null);
        if (current < questions.length - 1) {
          setDirection(1);
          setCurrent((c) => c + 1);
        } else {
          onComplete(newAnswers);
        }
      }, 350);
    },
    [answers, q.id, current, questions.length, onComplete]
  );

  const goBack = useCallback(() => {
    if (current > 0) {
      setDirection(-1);
      setSelectedValue(null);
      setCurrent((c) => c - 1);
    } else {
      onBack();
    }
  }, [current, onBack]);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400">
              {current + 1} / {questions.length}
            </span>
            <span className="text-xs text-slate-400">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {current === 0 ? "Change assessment" : "Previous"}
        </button>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: direction * 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -32 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <div className="mb-10 text-center">
              <p className="text-xs font-mono text-slate-300 mb-4 tracking-wider uppercase">
                How accurately does this describe you?
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-snug max-w-xl mx-auto">
                {q.text}
              </h2>
            </div>

            {/* Likert scale */}
            <div className="space-y-2.5">
              {[1, 2, 3, 4, 5].map((val) => {
                const isSelected = selectedValue === val;
                const isPreviousAnswer = answers[q.id] === val && selectedValue === null;
                const isActive = isSelected || isPreviousAnswer;
                return (
                  <motion.button
                    key={val}
                    onClick={() => handleSelect(val)}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-150 ${
                      isActive
                        ? "border-indigo-400 bg-indigo-50 shadow-sm"
                        : "border-slate-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/30"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Numeric indicator */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-all ${
                          isActive
                            ? "bg-indigo-500 text-white"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {val}
                      </div>
                      <span
                        className={`text-sm font-medium transition-colors ${
                          isActive ? "text-indigo-900" : "text-slate-600"
                        }`}
                      >
                        {LIKERT_LABELS[val]}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Manual next button (shown when an answer exists but auto-advance hasn't fired) */}
            {answers[q.id] !== undefined && selectedValue === null && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    if (current < questions.length - 1) {
                      setDirection(1);
                      setCurrent((c) => c + 1);
                    } else {
                      onComplete(answers);
                    }
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:shadow-lg transition-all"
                >
                  {current === questions.length - 1 ? "Continue" : "Next"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Section progress dots */}
        <div className="mt-12 flex justify-center gap-1.5 flex-wrap max-w-sm mx-auto">
          {Array.from({ length: Math.min(questions.length, 36) }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i < totalAnswered
                  ? "bg-indigo-400"
                  : i === current
                  ? "bg-indigo-200 w-3"
                  : "bg-slate-100"
              }`}
            />
          ))}
          {questions.length > 36 && (
            <span className="text-xs text-slate-300 ml-1">+{questions.length - 36} more</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Instinct Assessment ───────────────────────────────────────────────────────

function InstinctAssessment({
  onComplete,
}: {
  onComplete: (answers: Record<number, number>) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

  const q = instinctQuestions[current];
  const progress = (current / instinctQuestions.length) * 100;

  const instinctLabels: Record<string, string> = {
    SP: "Self-Preservation",
    SO: "Social",
    SX: "Sexual / One-to-One",
  };

  const handleSelect = useCallback(
    (val: number) => {
      setSelectedValue(val);
      setTimeout(() => {
        const newAnswers = { ...answers, [q.id]: val };
        setAnswers(newAnswers);
        setSelectedValue(null);
        if (current < instinctQuestions.length - 1) {
          setDirection(1);
          setCurrent((c) => c + 1);
        } else {
          onComplete(newAnswers);
        }
      }, 350);
    },
    [answers, q.id, current, onComplete]
  );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-600 text-xs font-medium mb-4">
            <Compass className="w-3 h-3" /> Instinct Variant — Part 2 of 2
          </div>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            These 9 questions identify your dominant instinct — self-preservation, social, or
            one-to-one — which shapes how your type expresses itself.
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400">
              {current + 1} / {instinctQuestions.length}
            </span>
            <span className="text-xs text-violet-500 font-medium">{instinctLabels[q.instinct]}</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-400 to-indigo-500 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: direction * 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -32 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <div className="mb-10 text-center">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-snug max-w-xl mx-auto">
                {q.text}
              </h2>
            </div>

            {/* Likert scale */}
            <div className="space-y-2.5">
              {[1, 2, 3, 4, 5].map((val) => {
                const isSelected = selectedValue === val;
                const isPreviousAnswer = answers[q.id] === val && selectedValue === null;
                const isActive = isSelected || isPreviousAnswer;
                return (
                  <motion.button
                    key={val}
                    onClick={() => handleSelect(val)}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-150 ${
                      isActive
                        ? "border-violet-400 bg-violet-50 shadow-sm"
                        : "border-slate-100 bg-white hover:border-violet-200 hover:bg-violet-50/30"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-all ${
                          isActive
                            ? "bg-violet-500 text-white"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {val}
                      </div>
                      <span
                        className={`text-sm font-medium transition-colors ${
                          isActive ? "text-violet-900" : "text-slate-600"
                        }`}
                      >
                        {LIKERT_LABELS[val]}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {answers[q.id] !== undefined && selectedValue === null && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    if (current < instinctQuestions.length - 1) {
                      setDirection(1);
                      setCurrent((c) => c + 1);
                    } else {
                      onComplete(answers);
                    }
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-violet-500 to-indigo-500 text-white hover:shadow-lg transition-all"
                >
                  {current === instinctQuestions.length - 1 ? "See Results" : "Next"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dot progress */}
        <div className="mt-12 flex justify-center gap-2">
          {instinctQuestions.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${
                i < current
                  ? "w-1.5 h-1.5 bg-violet-400"
                  : i === current
                  ? "w-3 h-1.5 bg-violet-300"
                  : "w-1.5 h-1.5 bg-slate-100"
              }`}
            />
          ))}
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
          Analyzing Your Responses
        </h2>
        <p className="text-slate-500 text-sm mb-8">Scoring motivation patterns across all 9 types...</p>
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

export default function EnneagramAssessPage() {
  const router = useRouter();
  const { profile } = useProfile();
  const [screen, setScreen] = useState<Screen>("picker");
  const [length, setLength] = useState<AssessmentLength>("standard");
  const [questions, setQuestions] = useState<LikertQuestion[]>([]);
  const [typeAnswers, setTypeAnswers] = useState<Record<number, number>>({});

  const handleLengthSelect = (selected: AssessmentLength) => {
    if (selected === "self-id") {
      setLength(selected);
      setScreen("self-id");
      return;
    }
    const qs = getAssessmentQuestions(selected as "standard" | "deep");
    setLength(selected);
    setQuestions(qs);
    setScreen("assessment");
  };

  const handleTypeComplete = (answers: Record<number, number>) => {
    setTypeAnswers(answers);
    setScreen("instincts");
  };

  const handleInstinctComplete = (instinctAnswers: Record<number, number>) => {
    setScreen("calculating");

    setTimeout(() => {
      const results = scoreEnneagramResponses(typeAnswers, questions);
      const confidence = computeConfidence(results);
      const showTwo = shouldShowTwoTypes(confidence);
      const topType = results[0]?.type || "9";
      const secondType = results[1]?.type || "1";

      const instinctResults = scoreInstinctResponses(instinctAnswers);
      const dominantInstinct = instinctResults[0]?.instinct || "SP";

      const allScores = results.map((r) => ({
        key: r.type,
        score: r.score,
        percentage: r.percentage,
      }));

      const params = new URLSearchParams({
        type: topType,
        scores: JSON.stringify(allScores),
        confidence: String(confidence),
        assessmentLength: length,
        showTwo: String(showTwo),
        secondType: secondType,
        instinct: dominantInstinct,
        instinctScores: JSON.stringify(instinctResults),
      });
      router.push(`/enneagram/results?${params.toString()}`);
    }, 2200);
  };

  // Handle Self-Identification completion
  const handleSelfIdComplete = (selectedType: number) => {
    const params = new URLSearchParams({
      type: String(selectedType),
      scores: JSON.stringify([{ key: String(selectedType), score: 10, percentage: 100 }]),
      confidence: "self-id",
      assessmentLength: "self-id",
      showTwo: "false",
      secondType: "1",
      instinct: "SP",
      instinctScores: JSON.stringify([]),
    });
    router.push(`/enneagram/results?${params.toString()}`);
  };

  if (screen === "picker") {
    return (
      <>
        <LengthPicker onSelect={handleLengthSelect} />
        {profile.enneagramType && (
          <div className="max-w-2xl mx-auto px-4 pb-12">
            <NextStepBanner
              href="/profile"
              label="Go to your profile"
              sublabel={`You're Type ${profile.enneagramType} — view your full results and growth path`}
              icon={<Brain className="w-5 h-5" />}
              color="#6366f1"
              dismissKey="enneagram-assess-picker-profile"
            />
          </div>
        )}
      </>
    );
  }

  if (screen === "self-id") {
    return (
      <div className="min-h-screen">
        <div className="max-w-3xl mx-auto px-4 pt-6">
          <button onClick={() => setScreen("picker")} className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
        <SelfIdentification onComplete={handleSelfIdComplete} />
      </div>
    );
  }

  if (screen === "instincts") {
    return <InstinctAssessment onComplete={handleInstinctComplete} />;
  }

  if (screen === "calculating") {
    return <CalculatingScreen />;
  }

  return (
    <LikertAssessment
      questions={questions}
      onBack={() => setScreen("picker")}
      onComplete={handleTypeComplete}
    />
  );
}
