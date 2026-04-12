"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface CalozSection {
  id: number;
  theme: string;
  description: string;
  statements: { type: number; text: string }[];
}

export default function StructuredAssessment({
  sections,
  onComplete,
}: {
  sections: CalozSection[];
  onComplete: (result: { topResult: string; allScores: { key: string; score: number; percentage: number }[] }) => void;
}) {
  const [sectionIdx, setSectionIdx] = useState(0);
  const [ratings, setRatings] = useState<Record<string, Record<number, number>>>({});

  const section = sections[sectionIdx];
  const sectionKey = `s${section.id}`;
  const currentRatings = ratings[sectionKey] || {};
  const allRated = section.statements.every((s) => currentRatings[s.type] !== undefined);

  const rate = (typeNum: number, value: number) => {
    setRatings({
      ...ratings,
      [sectionKey]: { ...currentRatings, [typeNum]: value },
    });
  };

  const nextSection = () => {
    if (sectionIdx < sections.length - 1) {
      setSectionIdx(sectionIdx + 1);
    } else {
      // Calculate final scores from all sections (ratings already includes current section)
      const typeScores: Record<number, number> = {};
      Object.values(ratings).forEach((sectionRatings) => {
        Object.entries(sectionRatings).forEach(([type, val]) => {
          typeScores[parseInt(type, 10)] = (typeScores[parseInt(type, 10)] || 0) + val;
        });
      });

      const sorted = Object.entries(typeScores).sort(([, a], [, b]) => b - a);
      const maxScore = sorted[0]?.[1] || 1;
      onComplete({
        topResult: sorted[0][0],
        allScores: sorted.map(([key, score]) => ({
          key,
          score,
          percentage: Math.round((score / maxScore) * 100),
        })),
      });
    }
  };

  const progress = ((sectionIdx + 1) / sections.length) * 100;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
          <span>Section {sectionIdx + 1}: {section.theme}</span>
          <span>{sectionIdx + 1} of {sections.length}</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
          <motion.div
            className="h-full bg-gradient-to-r from-violet-400 to-purple-500 rounded-full"
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={sectionIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <div className="mb-6">
            <h2 className="text-xl font-serif font-semibold mb-1" style={{ color: "rgba(255,255,255,0.9)" }}>{section.theme}</h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{section.description}</p>
          </div>

          <div className="space-y-3">
            {section.statements.map((stmt) => {
              const rating = currentRatings[stmt.type];
              return (
                <div
                  key={stmt.type}
                  className="p-4 rounded-2xl border-2 transition-all"
                  style={{
                    background: rating !== undefined ? "rgba(139,92,246,0.1)" : "rgba(255,255,255,0.04)",
                    borderColor: rating !== undefined ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.1)",
                  }}
                >
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.8)" }}>{stmt.text}</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        onClick={() => rate(stmt.type, val)}
                        className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                          rating === val
                            ? "bg-violet-500 text-white"
                            : "hover:bg-violet-500/20 hover:text-violet-300"
                        }`}
                        style={rating !== val ? { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" } : {}}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => sectionIdx > 0 && setSectionIdx(sectionIdx - 1)}
              disabled={sectionIdx === 0}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium disabled:opacity-30 transition hover:opacity-80"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={nextSection}
              disabled={!allRated}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-violet-500 to-purple-500 text-white disabled:opacity-50 hover:shadow-lg transition-all"
            >
              {sectionIdx === sections.length - 1 ? "See Results" : "Next Section"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
