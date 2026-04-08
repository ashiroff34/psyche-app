"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Heart, CheckCircle2 } from "lucide-react";
import { attachmentQuestions, ATTACHMENT_THRESHOLD } from "@/data/attachmentQuestions";
import { attachmentStyles, enneagramAttachmentCorrelations, type AttachmentStyle } from "@/data/attachment";
import { useProfile } from "@/hooks/useProfile";

const LIKERT_LABELS = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

const STYLE_COLORS: Record<AttachmentStyle, { bg: string; border: string; text: string; accent: string }> = {
  secure: {
    bg: "rgba(16,185,129,0.10)",
    border: "rgba(16,185,129,0.25)",
    text: "#6ee7b7",
    accent: "#10b981",
  },
  anxious: {
    bg: "rgba(236,72,153,0.10)",
    border: "rgba(236,72,153,0.25)",
    text: "#f9a8d4",
    accent: "#ec4899",
  },
  dismissive: {
    bg: "rgba(14,165,233,0.10)",
    border: "rgba(14,165,233,0.25)",
    text: "#7dd3fc",
    accent: "#0ea5e9",
  },
  fearful: {
    bg: "rgba(139,92,246,0.10)",
    border: "rgba(139,92,246,0.25)",
    text: "#c4b5fd",
    accent: "#8b5cf6",
  },
};

const GROUPS_OF_5 = [0, 1, 2, 3]; // 4 groups of 5 questions

function calculateAttachmentStyle(ratings: Record<number, number>): {
  style: AttachmentStyle;
  anxietyScore: number;
  avoidanceScore: number;
} {
  let anxietyScore = 0;
  let avoidanceScore = 0;

  attachmentQuestions.forEach((q) => {
    const raw = ratings[q.id] ?? 3;
    const score = q.reversed ? 6 - raw : raw;
    if (q.dimension === 'anxiety') anxietyScore += score;
    else avoidanceScore += score;
  });

  const highAnxiety = anxietyScore > ATTACHMENT_THRESHOLD;
  const highAvoidance = avoidanceScore > ATTACHMENT_THRESHOLD;

  let style: AttachmentStyle;
  if (!highAnxiety && !highAvoidance) style = 'secure';
  else if (highAnxiety && !highAvoidance) style = 'anxious';
  else if (!highAnxiety && highAvoidance) style = 'dismissive';
  else style = 'fearful';

  return { style, anxietyScore, avoidanceScore };
}

function ResultPage({
  style,
  anxietyScore,
  avoidanceScore,
  enneagramType,
  onRetake,
}: {
  style: AttachmentStyle;
  anxietyScore: number;
  avoidanceScore: number;
  enneagramType?: number;
  onRetake: () => void;
}) {
  const result = attachmentStyles[style];
  const colors = STYLE_COLORS[style];
  const crossMap = enneagramType ? enneagramAttachmentCorrelations[enneagramType] : null;

  const anxietyPct = Math.round(((anxietyScore - 10) / 40) * 100);
  const avoidancePct = Math.round(((avoidanceScore - 10) / 40) * 100);

  return (
    <div className="min-h-screen py-12 pb-32 px-4" style={{ background: "#0f0a1e" }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4"
            style={{ background: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.2)", color: "#f9a8d4" }}
          >
            <Heart className="w-3 h-3" /> Attachment Style Assessment
          </div>
          <h1 className="text-3xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>
            Your Result
          </h1>
        </motion.div>

        {/* Style Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl p-8 mb-6"
          style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
        >
          <div className="mb-5">
            <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: colors.text }}>
              Attachment Style
            </div>
            <h2 className="text-4xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.95)" }}>
              {result.title}
            </h2>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
            {result.description}
          </p>
        </motion.div>

        {/* Dimension Scores */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-2xl p-5 mb-6"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
        >
          <h3 className="text-sm font-semibold mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>
            Your Two Dimensions
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span style={{ color: "rgba(255,255,255,0.55)" }}>Attachment Anxiety</span>
                <span style={{ color: "rgba(255,255,255,0.55)" }}>{anxietyPct}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "#ec4899" }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${anxietyPct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <p className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                Fear of abandonment, need for reassurance, hypervigilance to relationship threat
              </p>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span style={{ color: "rgba(255,255,255,0.55)" }}>Attachment Avoidance</span>
                <span style={{ color: "rgba(255,255,255,0.55)" }}>{avoidancePct}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "#0ea5e9" }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${avoidancePct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                />
              </div>
              <p className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                Discomfort with closeness, suppression of attachment needs, preference for self-reliance
              </p>
            </div>
          </div>
          {/* 2x2 visual */}
          <div className="mt-5 grid grid-cols-2 gap-2 text-center text-[10px]">
            <div className="p-2.5 rounded-xl" style={{ background: anxietyPct <= 50 && avoidancePct <= 50 ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.05)", border: anxietyPct <= 50 && avoidancePct <= 50 ? "1px solid rgba(16,185,129,0.4)" : "1px solid rgba(255,255,255,0.08)" }}>
              <div className="font-medium" style={{ color: anxietyPct <= 50 && avoidancePct <= 50 ? "#6ee7b7" : "rgba(255,255,255,0.45)" }}>Secure</div>
              <div style={{ color: "rgba(255,255,255,0.3)" }}>Low anxiety · Low avoidance</div>
            </div>
            <div className="p-2.5 rounded-xl" style={{ background: anxietyPct > 50 && avoidancePct <= 50 ? "rgba(236,72,153,0.2)" : "rgba(255,255,255,0.05)", border: anxietyPct > 50 && avoidancePct <= 50 ? "1px solid rgba(236,72,153,0.4)" : "1px solid rgba(255,255,255,0.08)" }}>
              <div className="font-medium" style={{ color: anxietyPct > 50 && avoidancePct <= 50 ? "#f9a8d4" : "rgba(255,255,255,0.45)" }}>Anxious</div>
              <div style={{ color: "rgba(255,255,255,0.3)" }}>High anxiety · Low avoidance</div>
            </div>
            <div className="p-2.5 rounded-xl" style={{ background: anxietyPct <= 50 && avoidancePct > 50 ? "rgba(14,165,233,0.2)" : "rgba(255,255,255,0.05)", border: anxietyPct <= 50 && avoidancePct > 50 ? "1px solid rgba(14,165,233,0.4)" : "1px solid rgba(255,255,255,0.08)" }}>
              <div className="font-medium" style={{ color: anxietyPct <= 50 && avoidancePct > 50 ? "#7dd3fc" : "rgba(255,255,255,0.45)" }}>Dismissive</div>
              <div style={{ color: "rgba(255,255,255,0.3)" }}>Low anxiety · High avoidance</div>
            </div>
            <div className="p-2.5 rounded-xl" style={{ background: anxietyPct > 50 && avoidancePct > 50 ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.05)", border: anxietyPct > 50 && avoidancePct > 50 ? "1px solid rgba(139,92,246,0.4)" : "1px solid rgba(255,255,255,0.08)" }}>
              <div className="font-medium" style={{ color: anxietyPct > 50 && avoidancePct > 50 ? "#c4b5fd" : "rgba(255,255,255,0.45)" }}>Fearful</div>
              <div style={{ color: "rgba(255,255,255,0.3)" }}>High anxiety · High avoidance</div>
            </div>
          </div>
        </motion.div>

        {/* Core Pattern */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="rounded-2xl p-5 mb-4"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
        >
          <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: colors.text }}>
            Core Pattern
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
            {result.corePattern}
          </p>
        </motion.div>

        {/* In Relationships */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-2xl p-5 mb-4"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
        >
          <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: colors.text }}>
            In Relationships
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
            {result.inRelationships}
          </p>
        </motion.div>

        {/* Growth Edge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="rounded-2xl p-5 mb-6"
          style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.18)" }}
        >
          <div className="text-xs font-semibold uppercase tracking-widest mb-2 text-emerald-400">
            Growth Edge
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
            {result.growthEdge}
          </p>
        </motion.div>

        {/* Enneagram Cross-Map */}
        {crossMap && enneagramType && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="rounded-2xl p-6 mb-6"
            style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}
          >
            <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "rgba(167,139,250,0.9)" }}>
              Your Enneagram + Attachment Portrait
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>
                Type {enneagramType}
              </span>
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>+</span>
              <span className="text-lg font-serif font-semibold" style={{ color: colors.text }}>
                {attachmentStyles[style].title}
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.72)" }}>
              {crossMap.explanation}
            </p>
            {crossMap.secondary && (
              <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="text-[10px] font-medium uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Secondary tendency
                </div>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Your type also shows patterns of{" "}
                  <span className="font-medium" style={{ color: STYLE_COLORS[crossMap.secondary].text }}>
                    {attachmentStyles[crossMap.secondary].title}
                  </span>{" "}
                  attachment, depending on context and level of development.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {!enneagramType && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="rounded-2xl p-5 mb-6"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              Take an Enneagram assessment to unlock your combined Enneagram + Attachment portrait. a deeper map of your relational patterns.
            </p>
          </motion.div>
        )}

        {/* Sources */}
        <div className="p-3 rounded-xl mb-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-[10px] font-mono leading-relaxed" style={{ color: "rgba(255,255,255,0.3)" }}>
            Sources: Bowlby (1969, 1973). Attachment and Loss · Ainsworth et al. (1978). Patterns of Attachment · Bartholomew &amp; Horowitz (1991). Adult attachment styles · Main &amp; Solomon (1986). Disorganized attachment · ECR-R: Fraley, Waller &amp; Brennan (2000)
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onRetake}
            className="w-full py-3 rounded-2xl font-medium transition-all"
            style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
          >
            Retake Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AttachmentAssessmentPage() {
  const router = useRouter();
  const { profile } = useProfile();
  const [currentGroup, setCurrentGroup] = useState(0);
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [result, setResult] = useState<{ style: AttachmentStyle; anxietyScore: number; avoidanceScore: number } | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  const groupedQuestions = GROUPS_OF_5.map((g) =>
    attachmentQuestions.slice(g * 5, g * 5 + 5)
  );

  const currentQuestions = groupedQuestions[currentGroup];
  const allCurrentAnswered = currentQuestions.every((q) => ratings[q.id] !== undefined);

  const handleSubmit = () => {
    const res = calculateAttachmentStyle(ratings);
    setResult(res);
  };

  const handleRetake = () => {
    setRatings({});
    setCurrentGroup(0);
    setResult(null);
    setShowIntro(true);
  };

  if (result) {
    return (
      <ResultPage
        style={result.style}
        anxietyScore={result.anxietyScore}
        avoidanceScore={result.avoidanceScore}
        enneagramType={profile.enneagramType}
        onRetake={handleRetake}
      />
    );
  }

  if (showIntro) {
    return (
      <div className="min-h-screen py-16 px-4" style={{ background: "#0f0a1e" }}>
        <div className="max-w-xl mx-auto">
          <button
            onClick={() => router.push("/assessments")}
            className="flex items-center gap-1.5 text-sm mb-8 transition"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{ background: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.2)", color: "#f9a8d4" }}>
            <Heart className="w-3 h-3" /> Relational Psychology
          </div>

          <h1 className="text-3xl font-serif font-bold mb-4" style={{ color: "rgba(255,255,255,0.93)" }}>
            Attachment Style
          </h1>

          <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Attachment theory, developed by John Bowlby and expanded by Mary Ainsworth, proposes that the emotional bonds formed with caregivers in early childhood create an internal working model. a blueprint for how we relate in adult relationships. Your attachment style shapes how you seek closeness, respond to emotional distance, and manage vulnerability with the people who matter most.
          </p>

          <div className="space-y-3 mb-8">
            {[
              { label: "20 questions", detail: "Based on the ECR-R (Experiences in Close Relationships. Revised)" },
              { label: "~5 minutes", detail: "Rate each statement on a 5-point scale" },
              { label: "4 attachment styles", detail: "Secure · Anxious-Preoccupied · Dismissive-Avoidant · Fearful-Avoidant" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-pink-400" />
                <div>
                  <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>{item.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl mb-8" style={{ background: "rgba(236,72,153,0.07)", border: "1px solid rgba(236,72,153,0.15)" }}>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(249,168,212,0.85)" }}>
              Answer based on how you actually behave in close relationships, not how you wish you behaved. Think of your most significant adult relationships, romantic or otherwise.
            </p>
          </div>

          <button
            onClick={() => setShowIntro(false)}
            className="w-full py-4 rounded-2xl font-semibold text-white transition-all"
            style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}
          >
            Begin Assessment
          </button>
        </div>
      </div>
    );
  }

  const totalAnswered = Object.keys(ratings).length;
  const progress = (totalAnswered / attachmentQuestions.length) * 100;

  return (
    <div className="min-h-screen py-10 pb-32 px-4" style={{ background: "#0f0a1e" }}>
      <div className="max-w-xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
            <span>Questions {currentGroup * 5 + 1}–{Math.min((currentGroup + 1) * 5, 20)} of 20</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #ec4899, #8b5cf6)" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Group header */}
        <div className="mb-6">
          <div className="text-xs font-medium mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
            Section {currentGroup + 1} of 4
          </div>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            Rate how well each statement describes you in close relationships.
          </p>
        </div>

        {/* Questions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentGroup}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-5 mb-8"
          >
            {currentQuestions.map((q, qi) => {
              const rated = ratings[q.id];
              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl transition-all"
                  style={{
                    background: rated !== undefined ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
                    border: rated !== undefined ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                      style={{ background: "rgba(236,72,153,0.15)", color: "#f9a8d4" }}
                    >
                      {currentGroup * 5 + qi + 1}
                    </span>
                    <p className="text-sm leading-relaxed font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                      {q.text}
                    </p>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5">
                    {LIKERT_LABELS.map((opt) => {
                      const isSelected = rated === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setRatings((prev) => ({ ...prev, [q.id]: opt.value }))}
                          className="flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all"
                          style={
                            isSelected
                              ? { background: "rgba(236,72,153,0.25)", border: "1px solid rgba(236,72,153,0.5)" }
                              : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }
                          }
                        >
                          <span
                            className="text-sm font-bold"
                            style={{ color: isSelected ? "#f9a8d4" : "rgba(255,255,255,0.6)" }}
                          >
                            {opt.value}
                          </span>
                          <span
                            className="text-[9px] text-center leading-tight"
                            style={{ color: isSelected ? "rgba(249,168,212,0.8)" : "rgba(255,255,255,0.3)" }}
                          >
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentGroup > 0 && (
            <button
              onClick={() => setCurrentGroup((g) => g - 1)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium transition-all"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          )}

          {currentGroup < GROUPS_OF_5.length - 1 ? (
            <button
              onClick={() => setCurrentGroup((g) => g + 1)}
              disabled={!allCurrentAnswered}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold transition-all"
              style={
                allCurrentAnswered
                  ? { background: "linear-gradient(135deg, #ec4899, #8b5cf6)", color: "white" }
                  : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)" }
              }
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!allCurrentAnswered || Object.keys(ratings).length < attachmentQuestions.length}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold transition-all"
              style={
                allCurrentAnswered && Object.keys(ratings).length >= attachmentQuestions.length
                  ? { background: "linear-gradient(135deg, #ec4899, #8b5cf6)", color: "white" }
                  : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)" }
              }
            >
              See My Result <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {!allCurrentAnswered && (
          <p className="text-center text-xs mt-3" style={{ color: "rgba(255,255,255,0.3)" }}>
            Answer all questions in this section to continue
          </p>
        )}
      </div>
    </div>
  );
}
