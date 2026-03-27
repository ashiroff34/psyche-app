"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import type { ConceptIntroContent } from "@/types/lessons";

interface Props {
  content: ConceptIntroContent;
  onContinue: () => void;
}

/**
 * A clean teaching card that introduces a concept with title, body, and
 * optional highlighted key term. Matches the app's violet/pink gradient aesthetic.
 */
export default function ConceptIntroCard({ content, onContinue }: Props) {
  const { title, body, highlight: highlightTerm } = content;

  // If there's a highlight term, wrap it in a styled span within the body
  const renderBody = () => {
    if (!highlightTerm) {
      return <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">{body}</p>;
    }

    const parts = body.split(new RegExp(`(${highlightTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
    return (
      <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
        {parts.map((part, i) =>
          part.toLowerCase() === highlightTerm.toLowerCase() ? (
            <span
              key={i}
              className="font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30 px-1 py-0.5 rounded"
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
      className="flex flex-col h-full"
    >
      {/* Card content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Icon badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}
        >
          <BookOpen className="w-8 h-8 text-white" />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-4"
        >
          {title}
        </motion.h2>

        {/* Body text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm max-w-sm w-full"
        >
          {renderBody()}
        </motion.div>
      </div>

      {/* Continue button */}
      <div className="px-5 pb-safe pb-8 pt-4">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          className="w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
            boxShadow: "0 4px 20px rgba(139,92,246,0.4)",
          }}
        >
          Got it <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}
