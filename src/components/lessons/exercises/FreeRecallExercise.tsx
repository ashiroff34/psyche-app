"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, ArrowRight, CheckCircle } from "lucide-react";
import type { FreeRecallContent } from "@/types/lessons";

interface Props {
  content: FreeRecallContent;
  onContinue: () => void;
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter((w) => w.length > 0).length;
}

function highlightKeyTerms(text: string, found: string[], missed: string[]) {
  // Build a regex that matches all key terms (case-insensitive)
  const all = [...found, ...missed];
  if (all.length === 0) return <span>{text}</span>;

  const escaped = all.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        const lower = part.toLowerCase();
        const isFound = found.some((t) => t.toLowerCase() === lower);
        const isMissed = missed.some((t) => t.toLowerCase() === lower);
        if (isFound) {
          return (
            <span
              key={i}
              className="font-bold px-0.5 py-0.5 rounded"
              style={{ color: "#34d399", background: "rgba(52,211,153,0.15)" }}
            >
              {part}
            </span>
          );
        }
        if (isMissed) {
          return (
            <span
              key={i}
              className="font-bold px-0.5 py-0.5 rounded"
              style={{ color: "#fbbf24", background: "rgba(251,191,36,0.15)" }}
            >
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default function FreeRecallExercise({ content, onContinue }: Props) {
  const { prompt, keyTerms, minWords, modelAnswer } = content;
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const wordCount = countWords(answer);
  const meetsMinimum = wordCount >= minWords;

  // After submission: figure out which key terms user mentioned
  const foundTerms = submitted
    ? keyTerms.filter((term) =>
        answer.toLowerCase().includes(term.toLowerCase())
      )
    : [];
  const missedTerms = submitted
    ? keyTerms.filter(
        (term) => !answer.toLowerCase().includes(term.toLowerCase())
      )
    : [];

  const handleSubmit = () => {
    if (!meetsMinimum) return;
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col h-full overflow-y-auto"
      style={{ color: "rgba(255,255,255,0.9)" }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}
          >
            <PenLine className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "rgba(139,92,246,0.9)" }}>
              In Your Own Words
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              Free recall — no multiple choice
            </p>
          </div>
        </div>

        {/* Prompt */}
        <div
          className="rounded-2xl p-4"
          style={{
            background: "rgba(139,92,246,0.12)",
            border: "1px solid rgba(139,92,246,0.3)",
          }}
        >
          <p className="text-base font-medium leading-relaxed" style={{ color: "rgba(255,255,255,0.9)" }}>
            {prompt}
          </p>
        </div>
      </div>

      {/* Text area or submitted answer */}
      <div className="px-5 pb-3 flex-1 flex flex-col gap-3">
        {!submitted ? (
          <>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full rounded-2xl p-4 text-sm leading-relaxed resize-none outline-none"
              style={{
                minHeight: 120,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.85)",
              }}
            />
            {/* Word count */}
            <div className="flex justify-end">
              <span
                className="text-xs font-medium"
                style={{
                  color: meetsMinimum ? "rgba(52,211,153,0.9)" : "rgba(255,255,255,0.4)",
                }}
              >
                {wordCount} / {minWords} words minimum
                {meetsMinimum && " ✓"}
              </span>
            </div>
          </>
        ) : (
          <>
            {/* User's answer with key term highlights */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                Your Answer
              </p>
              <div
                className="rounded-2xl p-4 text-sm leading-relaxed"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {highlightKeyTerms(answer, foundTerms, missedTerms)}
              </div>
            </div>

            {/* Score */}
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{
                background: "rgba(52,211,153,0.1)",
                border: "1px solid rgba(52,211,153,0.25)",
              }}
            >
              <CheckCircle className="w-5 h-5 shrink-0" style={{ color: "#34d399" }} />
              <span className="text-sm font-semibold" style={{ color: "#34d399" }}>
                You mentioned {foundTerms.length} of {keyTerms.length} key concepts
              </span>
            </div>

            {/* Key term legend */}
            <div className="flex flex-wrap gap-2">
              {keyTerms.map((term) => {
                const isFound = foundTerms.includes(term);
                return (
                  <span
                    key={term}
                    className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{
                      background: isFound ? "rgba(52,211,153,0.15)" : "rgba(251,191,36,0.15)",
                      color: isFound ? "#34d399" : "#fbbf24",
                      border: `1px solid ${isFound ? "rgba(52,211,153,0.3)" : "rgba(251,191,36,0.3)"}`,
                    }}
                  >
                    {isFound ? "✓" : "○"} {term}
                  </span>
                );
              })}
            </div>

            {/* Model answer */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                Model Answer
              </p>
              <div
                className="rounded-2xl p-4 text-sm leading-relaxed"
                style={{
                  background: "rgba(139,92,246,0.1)",
                  border: "1px solid rgba(139,92,246,0.25)",
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                {modelAnswer}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Action button */}
      <div className="px-5 pb-8 pt-2">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.button
              key="submit"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: meetsMinimum ? 1 : 0.4, y: 0 }}
              whileTap={meetsMinimum ? { scale: 0.97 } : {}}
              onClick={handleSubmit}
              disabled={!meetsMinimum}
              className="w-full py-4 rounded-2xl font-bold text-white text-base"
              style={{
                background: meetsMinimum
                  ? "linear-gradient(135deg, #8b5cf6, #d946ef)"
                  : "rgba(255,255,255,0.1)",
                boxShadow: meetsMinimum ? "0 4px 20px rgba(139,92,246,0.35)" : "none",
                cursor: meetsMinimum ? "pointer" : "not-allowed",
              }}
            >
              Submit
            </motion.button>
          ) : (
            <motion.button
              key="continue"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.97 }}
              onClick={onContinue}
              className="w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
                boxShadow: "0 4px 20px rgba(139,92,246,0.35)",
              }}
            >
              Continue <ArrowRight className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
