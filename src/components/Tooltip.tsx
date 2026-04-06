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
            className="absolute z-50 bottom-full mb-2 left-0 w-64 sm:w-80 p-3 rounded-xl shadow-xl" style={{ background: "rgba(20,15,40,0.97)", border: "1px solid rgba(255,255,255,0.12)" }}
            onClick={() => setOpen(false)}
          >
            <div className="text-xs font-semibold mb-1" style={{ color: "rgba(56,189,248,0.9)" }}>{term}</div>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
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
      <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.07)" }}>
        {levels.map((l) => (
          <button
            key={l.value}
            onClick={() => setExperienceLevel(l.value)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={level === l.value ? { background: "rgba(139,92,246,0.3)", color: "rgba(167,139,250,0.95)" } : { color: "rgba(255,255,255,0.5)" }}
          >
            {l.emoji} {l.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 rounded-2xl shadow-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="text-sm font-medium mb-3" style={{ color: "rgba(255,255,255,0.75)" }}>Experience Level</div>
      <div className="space-y-2">
        {levels.map((l) => (
          <button
            key={l.value}
            onClick={() => setExperienceLevel(l.value)}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all border-2"
            style={level === l.value ? { background: "rgba(14,165,233,0.12)", borderColor: "rgba(14,165,233,0.4)" } : { background: "rgba(255,255,255,0.03)", borderColor: "transparent" }}
          >
            <span className="text-xl">{l.emoji}</span>
            <div>
              <div className="text-sm font-medium" style={{ color: level === l.value ? "rgba(56,189,248,0.9)" : "rgba(255,255,255,0.75)" }}>
                {l.label}
              </div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{l.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
