"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, RotateCcw, ChevronRight } from "lucide-react";
import { tritypeQuestions } from "@/data/tritypeQuestions";
import {
  tritypes,
  getCenter,
  getCanonicalTritypeCode,
  getOrderedTritypeThyself,
  type Tritype,
} from "@/data/tritypes";
import { useProfile } from "@/hooks/useProfile";

type Phase = "intro" | "gut" | "gut-to-heart" | "heart" | "heart-to-head" | "head" | "results";

const CENTER_ORDER: Array<"gut" | "heart" | "head"> = ["gut", "heart", "head"];

const CENTER_META = {
  gut: {
    label: "Gut Center",
    types: "8, 9, 1",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.25)",
    question: "How do you relate to anger, power, and self-assertion?",
    description:
      "The gut center governs instinct, anger, autonomy, and boundaries. Your gut type reveals your deepest strategy for asserting yourself and managing power.",
  },
  heart: {
    label: "Heart Center",
    types: "2, 3, 4",
    color: "#ec4899",
    bg: "rgba(236,72,153,0.12)",
    border: "rgba(236,72,153,0.25)",
    question: "How do you construct and protect your sense of worth and identity?",
    description:
      "The heart center governs self-image, identity, and how you seek recognition. Your heart type reveals how you construct your sense of who you are.",
  },
  head: {
    label: "Head Center",
    types: "5, 6, 7",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.25)",
    question: "How do you manage fear and uncertainty?",
    description:
      "The head center governs how you process anxiety and navigate the unknown. Your head type reveals your primary mental strategy for dealing with a threatening world.",
  },
};

export default function TritypeAssessmentPage() {
  const { profile, updateProfile } = useProfile();
  const [phase, setPhase] = useState<Phase>("intro");
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const gutQs = useMemo(() => tritypeQuestions.filter((q) => q.center === "gut"), []);
  const heartQs = useMemo(() => tritypeQuestions.filter((q) => q.center === "heart"), []);
  const headQs = useMemo(() => tritypeQuestions.filter((q) => q.center === "head"), []);

  const currentQuestions: typeof tritypeQuestions =
    phase === "gut" ? gutQs : phase === "heart" ? heartQs : phase === "head" ? headQs : [];

  const answeredInPhase = currentQuestions.filter((q) => answers[q.id] !== undefined).length;
  const allInPhaseAnswered = answeredInPhase === currentQuestions.length;

  // ── Scoring ────────────────────────────────────────────────────────────────
  const results = useMemo(() => {
    if (phase !== "results") return null;

    const scores: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
    for (const q of tritypeQuestions) {
      const chosen = answers[q.id];
      if (chosen !== undefined) scores[chosen] = (scores[chosen] ?? 0) + 1;
    }

    const gutWinner = [8, 9, 1].reduce((best, t) => (scores[t] > scores[best] ? t : best), 8);
    const heartWinner = [2, 3, 4].reduce((best, t) => (scores[t] > scores[best] ? t : best), 2);
    const headWinner = [5, 6, 7].reduce((best, t) => (scores[t] > scores[best] ? t : best), 5);

    // Order by score descending to build the tritype code
    const centerResults = [
      { center: "gut" as const, type: gutWinner, score: scores[gutWinner] },
      { center: "heart" as const, type: heartWinner, score: scores[heartWinner] },
      { center: "head" as const, type: headWinner, score: scores[headWinner] },
    ].sort((a, b) => b.score - a.score);

    const ordered: [number, number, number] = [
      centerResults[0].type,
      centerResults[1].type,
      centerResults[2].type,
    ];
    const code = ordered.join("");
    const canonical = getCanonicalTritypeCode(ordered);
    const tritypeData = tritypes.find((t) => t.code === canonical);
    const archetype = getOrderedTritypeThyself(ordered, tritypes);

    return { scores, gutWinner, heartWinner, headWinner, ordered, code, tritypeData, archetype, centerResults };
  }, [phase, answers]);

  // ── Save to profile ────────────────────────────────────────────────────────
  const saveResults = () => {
    if (!results) return;
    updateProfile({
      tritypeGut: results.gutWinner,
      tritypeHeart: results.heartWinner,
      tritypeHead: results.headWinner,
      tritype: results.code,
      tritypeFirst: results.centerResults[0].type,
      tritypeSecond: results.centerResults[1].type,
      tritypeThird: results.centerResults[2].type,
    });
  };

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleAnswer = (questionId: number, type: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: type }));
  };

  const advancePhase = () => {
    if (phase === "gut") setPhase("gut-to-heart");
    else if (phase === "gut-to-heart") setPhase("heart");
    else if (phase === "heart") setPhase("heart-to-head");
    else if (phase === "heart-to-head") setPhase("head");
    else if (phase === "head") {
      setPhase("results");
      setTimeout(saveResults, 100);
    }
  };

  const restart = () => {
    setAnswers({});
    setPhase("intro");
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  if (phase === "intro") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20" style={{ background: "#0f0a1e" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)", color: "#a78bfa" }}>
              Tritype Assessment · 27 Questions
            </div>
            <h1 className="text-3xl font-serif font-bold mb-4" style={{ color: "rgba(255,255,255,0.93)" }}>
              Discover Your Tritype
            </h1>
            <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Tritype identifies your dominant Enneagram type in each of the three centers of
              intelligence — gut, heart, and head. Together, they form a three-digit code that
              captures more of who you are than a single type alone.
            </p>
          </div>

          {/* Center Overview */}
          <div className="space-y-3 mb-8">
            {CENTER_ORDER.map((c) => {
              const m = CENTER_META[c];
              return (
                <div key={c} className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: m.bg, border: `1px solid ${m.border}` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: m.bg, color: m.color }}>
                    {m.types}
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: m.color }}>{m.label}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{m.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl mb-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-xs leading-relaxed text-center" style={{ color: "rgba(255,255,255,0.5)" }}>
              Answer honestly based on your <strong style={{ color: "rgba(255,255,255,0.7)" }}>deepest patterns</strong>, not your ideals or how you wish you were.
              The most accurate results come from choosing what is most true about you, even if it is uncomfortable.
            </p>
          </div>

          <button
            onClick={() => setPhase("gut")}
            className="w-full py-4 rounded-2xl text-base font-semibold flex items-center justify-center gap-2 transition-all active:scale-98"
            style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "white" }}
          >
            Begin Assessment
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    );
  }

  // Center Transition Screens
  if (phase === "gut-to-heart" || phase === "heart-to-head") {
    const nextCenter = phase === "gut-to-heart" ? "heart" : "head";
    const m = CENTER_META[nextCenter];
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20" style={{ background: "#0f0a1e" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: m.bg, border: `2px solid ${m.border}` }}>
            <span className="text-2xl font-bold" style={{ color: m.color }}>
              {nextCenter === "heart" ? "♥" : "◆"}
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ background: m.bg, color: m.color }}>
            <CheckCircle2 className="w-3.5 h-3.5" />
            {phase === "gut-to-heart" ? "Gut Center Complete" : "Heart Center Complete"}
          </div>
          <h2 className="text-2xl font-serif font-bold mb-3" style={{ color: "rgba(255,255,255,0.93)" }}>
            {m.label}
          </h2>
          <p className="text-sm leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>
            {m.description}
          </p>
          <p className="text-sm font-medium mb-8" style={{ color: m.color }}>
            {m.question}
          </p>
          <button
            onClick={advancePhase}
            className="w-full py-4 rounded-2xl text-base font-semibold flex items-center justify-center gap-2 transition-all"
            style={{ background: `linear-gradient(135deg, ${m.color}cc, ${m.color}88)`, color: "white" }}
          >
            Continue to {m.label}
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    );
  }

  // Question screens
  if (phase === "gut" || phase === "heart" || phase === "head") {
    const m = CENTER_META[phase];
    return (
      <div className="min-h-screen py-16 pb-32 px-4" style={{ background: "#0f0a1e" }}>
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3"
              style={{ background: m.bg, color: m.color }}>
              {m.label} · Types {m.types}
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
              {m.question}
            </p>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                {answeredInPhase} / {currentQuestions.length}
              </span>
              <span className="text-xs font-medium" style={{ color: m.color }}>
                {Math.round((answeredInPhase / currentQuestions.length) * 100)}%
              </span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: m.color }}
                animate={{ width: `${(answeredInPhase / currentQuestions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {currentQuestions.map((q) => {
              const chosen = answers[q.id];
              return (
                <div key={q.id} className="rounded-2xl overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="p-4 space-y-2">
                    {[q.optionA, q.optionB].map((opt) => {
                      const isChosen = chosen === opt.type;
                      return (
                        <button
                          key={opt.type}
                          onClick={() => handleAnswer(q.id, opt.type)}
                          className="w-full text-left p-4 rounded-xl transition-all text-sm leading-relaxed"
                          style={isChosen
                            ? { background: m.bg, border: `1.5px solid ${m.border}`, color: "rgba(255,255,255,0.9)" }
                            : { background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}
                        >
                          {isChosen && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold mb-1 mr-2"
                              style={{ color: m.color }}>
                              <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                            </span>
                          )}
                          {opt.text}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Continue */}
          {allInPhaseAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <button
                onClick={advancePhase}
                className="w-full py-4 rounded-2xl text-base font-semibold flex items-center justify-center gap-2 transition-all"
                style={{ background: `linear-gradient(135deg, ${m.color}cc, ${m.color}88)`, color: "white" }}
              >
                {phase === "head" ? "See My Results" : `Continue to ${phase === "gut" ? "Heart" : "Head"} Center`}
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // Results Screen
  if (phase === "results" && results) {
    const { ordered, code, tritypeData, archetype, centerResults, scores } = results;

    return (
      <div className="min-h-screen py-16 pb-32 px-4" style={{ background: "#0f0a1e" }}>
        <div className="max-w-xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
                style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)", color: "#a78bfa" }}>
                <CheckCircle2 className="w-3.5 h-3.5" /> Assessment Complete
              </div>
              <h1 className="text-4xl font-bold font-mono mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>
                {code}
              </h1>
              {archetype && (
                <p className="text-xl font-serif font-semibold mb-2" style={{ color: "#a78bfa" }}>
                  {archetype}
                </p>
              )}
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                Your Tritype
              </p>
            </div>

            {/* Center Breakdown */}
            <div className="space-y-3 mb-6">
              {centerResults.map((cr, i) => {
                const m = CENTER_META[cr.center];
                const centerQs = cr.center === "gut" ? gutQs : cr.center === "heart" ? heartQs : headQs;
                const maxScore = centerQs.length;
                return (
                  <div key={cr.center} className="p-4 rounded-xl flex items-center gap-4"
                    style={{ background: m.bg, border: `1px solid ${m.border}` }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold flex-shrink-0"
                      style={{ background: "rgba(0,0,0,0.2)", color: m.color }}>
                      {cr.type}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold" style={{ color: m.color }}>{m.label}</span>
                        {i === 0 && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                            style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)" }}>
                            Dominant
                          </span>
                        )}
                      </div>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                        Type {cr.type} · {cr.score}/{maxScore} resonances
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold font-mono" style={{ color: m.color }}>{cr.type}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tritype Description */}
            {tritypeData && (
              <div className="p-5 rounded-2xl mb-6"
                style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}>
                <h3 className="text-base font-serif font-bold mb-3" style={{ color: "rgba(255,255,255,0.93)" }}>
                  About Your Tritype
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>
                  {tritypeData.description}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)" }}>
                    <p className="text-xs font-semibold mb-2 text-emerald-400">Strengths</p>
                    <ul className="space-y-1">
                      {tritypeData.strengths.map((s) => (
                        <li key={s} className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                          · {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}>
                    <p className="text-xs font-semibold mb-2 text-red-400">Challenges</p>
                    <ul className="space-y-1">
                      {tritypeData.challenges.map((c) => (
                        <li key={c} className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                          · {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* All type scores */}
            <div className="p-4 rounded-2xl mb-6"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-xs font-semibold mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                All Type Scores
              </p>
              <div className="grid grid-cols-3 gap-2">
                {([8, 9, 1] as number[]).concat([2, 3, 4], [5, 6, 7]).map((t) => {
                  const center = getCenter(t);
                  const m = CENTER_META[center];
                  const centerQs = center === "gut" ? gutQs : center === "heart" ? heartQs : headQs;
                  const max = centerQs.filter(
                    (q) => q.optionA.type === t || q.optionB.type === t
                  ).length;
                  const pct = max > 0 ? Math.round(((scores[t] ?? 0) / max) * 100) : 0;
                  const isWinner = [results.gutWinner, results.heartWinner, results.headWinner].includes(t);
                  return (
                    <div key={t} className="p-2 rounded-lg text-center"
                      style={isWinner
                        ? { background: m.bg, border: `1px solid ${m.border}` }
                        : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="text-sm font-bold" style={{ color: isWinner ? m.color : "rgba(255,255,255,0.5)" }}>
                        Type {t}
                      </div>
                      <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{scores[t] ?? 0}/{max}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Saved notice */}
            <div className="p-3 rounded-xl mb-6 text-center"
              style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)" }}>
              <p className="text-xs text-emerald-400">
                Saved to your profile as tritype <strong>{code}</strong>
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={restart}
                className="flex-1 py-3.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
              >
                <RotateCcw className="w-4 h-4" /> Retake
              </button>
              <Link
                href="/profile"
                className="flex-2 flex-1 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "white" }}
              >
                View Profile <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}
