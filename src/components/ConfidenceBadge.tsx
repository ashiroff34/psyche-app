"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, X, ChevronRight, CheckCircle, Circle } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/navigation";

const ASSESSMENT_CONFIG = [
  {
    id: "quick",
    label: "Quick Type Finder",
    desc: "8-question triage assessment",
    points: "Baseline",
    pointsNum: 0,
  },
  {
    id: "essential-enneagram",
    label: "Essential Enneagram",
    desc: "Stanford paragraph method",
    points: "+15%",
    pointsNum: 15,
  },
  {
    id: "self-id",
    label: "Self-Identification",
    desc: "Read all 9 type descriptions",
    points: "+15%",
    pointsNum: 15,
  },
  {
    id: "integrative",
    label: "Integrative Assessment",
    desc: "175-item Likert scale",
    points: "+20%",
    pointsNum: 20,
  },
  {
    id: "deep",
    label: "Deep Assessment",
    desc: "iEQ9-inspired 144 questions",
    points: "+25%",
    pointsNum: 25,
  },
];

interface ConfidenceBadgeProps {
  /** Override confidence value (e.g. from URL params on results page) */
  confidenceOverride?: number;
}

export default function ConfidenceBadge({ confidenceOverride }: ConfidenceBadgeProps) {
  const { profile } = useProfile();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const confidence = confidenceOverride ?? profile.typeConfidence ?? 0;
  const taken = profile.assessmentsTaken ?? [];
  const isContested = profile.isTypeContested ?? false;
  const contestedRunnerUp = profile.contestedRunnerUp;

  if (!profile.enneagramType && confidenceOverride === undefined) return null;

  // Contested overrides the normal color to amber regardless of raw confidence
  const color = isContested
    ? "#f59e0b"
    : confidence >= 70 ? "#22c55e" : confidence >= 45 ? "#f59e0b" : "#ef4444";
  const label = isContested
    ? "Split"
    : confidence >= 70 ? "High" : confidence >= 45 ? "Moderate" : "Low";

  const completed = ASSESSMENT_CONFIG.filter((a) => taken.includes(a.id));
  const remaining = ASSESSMENT_CONFIG.filter((a) => !taken.includes(a.id));
  const potentialGain = remaining.reduce((sum, a) => sum + a.pointsNum, 0);

  return (
    <>
      {/* Badge pill */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all active:scale-95"
        style={{
          background: `${color}18`,
          border: `1px solid ${color}40`,
        }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: color }}
        />
        <span className="text-xs font-semibold" style={{ color }}>
          {label} · {confidence}%
        </span>
        <Info className="w-3 h-3 flex-shrink-0" style={{ color: `${color}90` }} />
      </button>

      {/* Bottom sheet */}
      <AnimatePresence>
        {open && (
          <>
            {/* Scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              style={{ background: "rgba(0,0,0,0.65)" }}
              onClick={() => setOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl px-5 pt-5 pb-10"
              style={{
                background: "#160f2a",
                border: "1px solid rgba(255,255,255,0.1)",
                maxHeight: "85vh",
                overflowY: "auto",
              }}
            >
              {/* Handle */}
              <div
                className="w-10 h-1 rounded-full mx-auto mb-5"
                style={{ background: "rgba(255,255,255,0.15)" }}
              />

              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-5 right-5"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <X className="w-5 h-5" />
              </button>

              <h3
                className="text-lg font-serif font-bold mb-1"
                style={{ color: "rgba(255,255,255,0.92)" }}
              >
                Type Confidence
              </h3>

              {/* Big number */}
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-black" style={{ color }}>
                  {confidence}%
                </span>
                <span className="text-sm font-semibold" style={{ color }}>
                  {label} confidence
                </span>
              </div>

              {/* Contested result callout */}
              {isContested && contestedRunnerUp && (
                <div
                  className="mb-4 p-3 rounded-2xl"
                  style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)" }}
                >
                  <p className="text-xs font-semibold mb-1" style={{ color: "#f59e0b" }}>
                    ⚡ Your results are split
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Your assessments don't fully agree — they're divided between your current type and{" "}
                    <strong style={{ color: "rgba(255,255,255,0.8)" }}>Type {contestedRunnerUp}</strong>.
                    The heavier assessment is currently winning, but take another to resolve it.
                  </p>
                </div>
              )}

              <p
                className="text-sm mb-6 leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {taken.length === 0
                  ? "You haven't taken any assessments yet. Start with the Quick Type Finder."
                  : taken.length === 1
                  ? "The quick test gives you a starting point, not a final answer. Each additional assessment that confirms your type significantly increases accuracy."
                  : isContested
                  ? "Your assessments are conflicting. The type shown is the weighted winner — but more assessments will settle it."
                  : `Based on ${taken.length} assessments. Each one that confirms the same type compounds your accuracy.`}
                {!isContested && potentialGain > 0 &&
                  ` You can gain up to +${potentialGain}% more.`}
              </p>

              {/* Completed */}
              {completed.length > 0 && (
                <div className="mb-4">
                  <p
                    className="text-[10px] font-semibold mb-2 uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    Completed
                  </p>
                  <div className="space-y-2">
                    {completed.map((a) => (
                      <div
                        key={a.id}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-2xl"
                        style={{
                          background: "rgba(34,197,94,0.08)",
                          border: "1px solid rgba(34,197,94,0.18)",
                        }}
                      >
                        <CheckCircle
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: "#22c55e" }}
                        />
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-sm font-medium"
                            style={{ color: "rgba(255,255,255,0.85)" }}
                          >
                            {a.label}
                          </p>
                          <p
                            className="text-xs"
                            style={{ color: "rgba(255,255,255,0.38)" }}
                          >
                            {a.desc}
                          </p>
                        </div>
                        <span
                          className="text-xs font-bold flex-shrink-0"
                          style={{ color: "#22c55e" }}
                        >
                          {a.points}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Remaining */}
              {remaining.length > 0 && (
                <div className="mb-5">
                  <p
                    className="text-[10px] font-semibold mb-2 uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    Increase your confidence
                  </p>
                  <div className="space-y-2">
                    {remaining.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => {
                          setOpen(false);
                          router.push("/assessments");
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all active:scale-[0.98]"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <Circle
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: "rgba(255,255,255,0.2)" }}
                        />
                        <div className="flex-1 min-w-0 text-left">
                          <p
                            className="text-sm font-medium"
                            style={{ color: "rgba(255,255,255,0.7)" }}
                          >
                            {a.label}
                          </p>
                          <p
                            className="text-xs"
                            style={{ color: "rgba(255,255,255,0.33)" }}
                          >
                            {a.desc}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {a.pointsNum > 0 && (
                            <span
                              className="text-xs font-bold"
                              style={{ color: "rgba(167,139,250,0.85)" }}
                            >
                              {a.points}
                            </span>
                          )}
                          <ChevronRight
                            className="w-3.5 h-3.5"
                            style={{ color: "rgba(255,255,255,0.2)" }}
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Change type */}
              <button
                onClick={() => {
                  setOpen(false);
                  router.push("/profile");
                }}
                className="w-full py-3 rounded-2xl text-sm font-medium transition-all active:scale-[0.98]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                Think your type is wrong? Change it →
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
