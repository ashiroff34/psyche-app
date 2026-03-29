"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { TERM_GLOSSARY, useExperienceLevel } from "@/hooks/useExperienceLevel";

// Inline tooltip that explains a term
export function TermTooltip({ term, children }: { term: string; children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { level } = useExperienceLevel();
  const glossary = TERM_GLOSSARY[term];

  // Advanced users don't need tooltips
  if (level === "advanced" || !glossary) {
    return <>{children || term}</>;
  }

  return (
    <span className="relative inline-flex items-center gap-1">
      {children || term}
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        aria-label={`What is ${term}?`}
        className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sky-100 hover:bg-sky-200 transition shrink-0"
      >
        <HelpCircle className="w-3 h-3 text-sky-500" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 bottom-full mb-2 left-0 w-64 sm:w-80 p-3 rounded-xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100"
            onClick={() => setOpen(false)}
          >
            <div className="text-xs font-semibold text-sky-700 mb-1">{term}</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {level === "beginner" ? glossary.full : glossary.short}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

// Experience level toggle widget
export function ExperienceLevelToggle({ compact = false }: { compact?: boolean }) {
  const { level, setExperienceLevel } = useExperienceLevel();

  const levels = [
    { value: "beginner" as const, label: "Beginner", emoji: "", description: "Show explanations for all terms" },
    { value: "intermediate" as const, label: "Intermediate", emoji: "", description: "Show brief tooltips" },
    { value: "advanced" as const, label: "Advanced", emoji: "", description: "Hide tooltips, show raw data" },
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100">
        {levels.map((l) => (
          <button
            key={l.value}
            onClick={() => setExperienceLevel(l.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              level === l.value
                ? "bg-white text-sky-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {l.emoji} {l.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
      <div className="text-sm font-medium text-slate-700 mb-3">Experience Level</div>
      <div className="space-y-2">
        {levels.map((l) => (
          <button
            key={l.value}
            onClick={() => setExperienceLevel(l.value)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
              level === l.value
                ? "bg-sky-50 border-2 border-sky-300"
                : "bg-slate-50 border-2 border-transparent hover:border-slate-200"
            }`}
          >
            <span className="text-xl">{l.emoji}</span>
            <div>
              <div className={`text-sm font-medium ${level === l.value ? "text-sky-700" : "text-slate-700"}`}>
                {l.label}
              </div>
              <div className="text-xs text-slate-500">{l.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
