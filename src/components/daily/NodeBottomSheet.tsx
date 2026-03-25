"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play, RotateCcw, Lock, CheckCircle, Clock, Zap } from "lucide-react";

export interface PathNodeConfig {
  id: string;
  label: string;
  sublabel: string;
  status: "completed" | "current" | "locked";
  xp: number;
  questionCount: number;
  moduleId: string | null; // null for non-quiz nodes (insight/challenge)
  unitName: string;
  gradFrom: string;
  gradTo: string;
}

interface Props {
  node: PathNodeConfig | null;
  onClose: () => void;
  onStart: (node: PathNodeConfig) => void;
  isCompleted: (moduleId: string) => boolean;
}

export default function NodeBottomSheet({ node, onClose, onStart, isCompleted }: Props) {
  if (!node) return null;

  const done = node.moduleId ? isCompleted(node.moduleId) : node.status === "completed";
  const locked = node.status === "locked";

  return (
    <AnimatePresence>
      {node && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl pb-safe"
            style={{ maxWidth: 640, margin: "0 auto" }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-slate-200" />
            </div>

            <div className="px-6 pb-8 pt-2">
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  {/* Gradient ring node icon */}
                  <div className="relative w-14 h-14 shrink-0">
                    <svg width="56" height="56" viewBox="0 0 56 56" className="absolute inset-0">
                      <defs>
                        <linearGradient id="sheet-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={node.gradFrom} />
                          <stop offset="100%" stopColor={node.gradTo} />
                        </linearGradient>
                      </defs>
                      {locked ? (
                        <circle cx="28" cy="28" r="25" fill="none" stroke="#cbd5e1" strokeWidth="2.5" />
                      ) : done ? (
                        <circle cx="28" cy="28" r="25" fill="none" stroke="url(#sheet-grad)" strokeWidth="2.5" />
                      ) : (
                        <>
                          <circle cx="28" cy="28" r="25" fill="none" stroke="#fde68a" strokeWidth="2.5" opacity="0.4" />
                          <circle cx="28" cy="28" r="25" fill="none" stroke="#f59e0b" strokeWidth="2.5"
                            strokeDasharray="110 47" strokeLinecap="round"
                            style={{ transform: "rotate(-90deg)", transformOrigin: "28px 28px" }} />
                        </>
                      )}
                    </svg>
                    <div
                      className="absolute inset-[6px] rounded-full flex items-center justify-center"
                      style={{
                        background: locked
                          ? "#f1f5f9"
                          : `linear-gradient(135deg, ${node.gradFrom}, ${node.gradTo})`,
                        boxShadow: locked ? "none" : `0 2px 12px ${node.gradFrom}55`,
                      }}
                    >
                      {locked ? (
                        <Lock className="w-5 h-5 text-slate-400" />
                      ) : done ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <Play className="w-5 h-5 text-white ml-0.5" />
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                      {node.unitName}
                    </p>
                    <h3 className="text-lg font-bold text-slate-900">{node.label}</h3>
                    <p className="text-sm text-slate-500">{node.sublabel}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition shrink-0 mt-1"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Stats row */}
              {!locked && node.questionCount > 0 && (
                <div className="flex gap-3 mb-5">
                  <div className="flex-1 flex items-center gap-2 p-3 rounded-xl bg-slate-50">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">{Math.ceil(node.questionCount * 0.75)} min</span>
                  </div>
                  <div className="flex-1 flex items-center gap-2 p-3 rounded-xl bg-slate-50">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span className="text-sm text-slate-600">+{node.xp} XP</span>
                  </div>
                  <div className="flex-1 flex items-center gap-2 p-3 rounded-xl bg-slate-50">
                    <span className="text-sm text-slate-600">{node.questionCount} Qs</span>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              {locked ? (
                <div className="w-full py-4 rounded-2xl bg-slate-100 text-slate-400 text-center font-medium text-sm">
                  Complete previous lessons to unlock
                </div>
              ) : (
                <button
                  onClick={() => onStart(node)}
                  className="w-full py-4 rounded-2xl font-semibold text-white text-base transition-all active:scale-[0.98]"
                  style={{
                    background: `linear-gradient(135deg, ${node.gradFrom}, ${node.gradTo})`,
                    boxShadow: `0 4px 20px ${node.gradFrom}55`,
                  }}
                >
                  {done ? (
                    <span className="flex items-center justify-center gap-2">
                      <RotateCcw className="w-5 h-5" /> Practice Again
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Play className="w-5 h-5" /> Start
                    </span>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
