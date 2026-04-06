"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ArrowRight, BookOpen } from "lucide-react";
import type { SocraticPromptContent } from "@/types/lessons";

interface Props {
  content: SocraticPromptContent;
  onContinue: () => void;
}

export default function SocraticPrompt({ content, onContinue }: Props) {
  const { question, reflection, revealLabel, conceptTitle, conceptBody, highlight } = content;
  const [revealed, setRevealed] = useState(false);

  // Render conceptBody with optional highlight term styled distinctly
  const renderConceptBody = () => {
    if (!highlight) {
      return (
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
          {conceptBody}
        </p>
      );
    }
    const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = conceptBody.split(new RegExp(`(${escaped})`, "gi"));
    return (
      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span
              key={i}
              className="font-bold px-1 py-0.5 rounded"
              style={{
                color: "#c084fc",
                background: "rgba(192,132,252,0.15)",
              }}
            >
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </p>
    );
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
      {/* Phase 1: Question */}
      <div className="flex-1 flex flex-col px-5 pt-5 pb-3 gap-4">
        {/* Icon + label */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "rgba(99,102,241,0.9)" }}>
              Think First
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              Reflect before seeing the insight
            </p>
          </div>
        </div>

        {/* Question */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.3)",
          }}
        >
          <p className="text-base font-medium leading-relaxed" style={{ color: "rgba(255,255,255,0.9)" }}>
            {question}
          </p>
        </div>

        {/* Reflection framing */}
        <p className="text-sm text-center leading-relaxed px-2" style={{ color: "rgba(255,255,255,0.45)" }}>
          {reflection}
        </p>

        {/* Take a moment note */}
        <div
          className="rounded-xl px-4 py-3 text-center"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p className="text-xs italic" style={{ color: "rgba(255,255,255,0.35)" }}>
            Take a moment to sit with this before revealing.
          </p>
        </div>

        {/* Revealed concept */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {/* Concept header */}
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}
                >
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>
                  {conceptTitle}
                </p>
              </div>
              {/* Concept body */}
              <div className="px-4 py-4">
                {renderConceptBody()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action button */}
      <div className="px-5 pb-8 pt-2">
        {!revealed ? (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setRevealed(true)}
            className="w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              boxShadow: "0 4px 20px rgba(99,102,241,0.35)",
            }}
          >
            <Lightbulb className="w-5 h-5" />
            {revealLabel}
          </motion.button>
        ) : (
          <motion.button
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
            Got it <ArrowRight className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
