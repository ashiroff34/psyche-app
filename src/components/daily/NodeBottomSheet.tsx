"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, RotateCcw, Lock, CheckCircle, Clock, Zap, PenLine, Target, Sparkles } from "lucide-react";

export interface PathNodeConfig {
  id: string;
  label: string;
  sublabel: string;
  status: "completed" | "current" | "locked";
  nodeType: "quiz" | "reflection" | "challenge" | "bonus";
  xp: number;
  questionCount: number;
  moduleId: string | null;
  unitName: string;
  gradFrom: string;
  gradTo: string;
  prompt?: string; // for reflection/challenge nodes
}

interface Props {
  node: PathNodeConfig | null;
  onClose: () => void;
  onStart: (node: PathNodeConfig) => void;
  onCompleteNonQuiz: (node: PathNodeConfig, text: string) => void;
  isCompleted: (nodeId: string) => boolean;
}

const MIN_WORDS = 50;
const BONUS_TIER_1 = 100; // +25% XP
const BONUS_TIER_2 = 200; // +50% XP

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function getXpMultiplier(wordCount: number): number {
  if (wordCount >= BONUS_TIER_2) return 1.5;
  if (wordCount >= BONUS_TIER_1) return 1.25;
  return 1;
}

function getWordCountMessage(wordCount: number): { text: string; color: string } | null {
  if (wordCount >= BONUS_TIER_2) return { text: "+50% bonus XP! Deep reflection unlocked!", color: "text-amber-500" };
  if (wordCount >= BONUS_TIER_1) return { text: "+25% bonus XP for thoughtful reflection!", color: "text-amber-500" };
  if (wordCount >= MIN_WORDS) return { text: "Minimum reached! Keep going for bonus XP", color: "text-emerald-600" };
  return null;
}

export default function NodeBottomSheet({ node, onClose, onStart, onCompleteNonQuiz, isCompleted }: Props) {
  const [reflectionText, setReflectionText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!node) return null;

  const done = isCompleted(node.id);
  const locked = node.status === "locked";
  const isNonQuiz = node.nodeType === "reflection" || node.nodeType === "challenge";
  const wordCount = countWords(reflectionText);
  const wordsMet = wordCount >= MIN_WORDS;

  const NodeIcon = node.nodeType === "reflection" ? PenLine
    : node.nodeType === "challenge" ? Target
    : node.nodeType === "bonus" ? Sparkles
    : Play;

  const xpMultiplier = getXpMultiplier(wordCount);
  const bonusXp = Math.round(node.xp * xpMultiplier);
  const wordCountMsg = getWordCountMessage(wordCount);

  const handleSubmitReflection = () => {
    if (!wordsMet) return;
    setSubmitted(true);
    // Pass the node with multiplied XP when bonus applies
    const submissionNode = xpMultiplier > 1
      ? { ...node, xp: bonusXp }
      : node;
    onCompleteNonQuiz(submissionNode, reflectionText);
    setTimeout(() => {
      setSubmitted(false);
      setReflectionText("");
      onClose();
    }, 1200);
  };

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
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl shadow-2xl"
            style={{ maxWidth: 640, margin: "0 auto", maxHeight: "85vh", overflowY: "auto", background: "rgba(20,15,40,0.98)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1 sticky top-0 z-10" style={{ background: "rgba(20,15,40,0.98)" }}>
              <div className="w-10 h-1 rounded-full bg-slate-200" />
            </div>

            <div className="px-6 pb-10 pt-2">
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
                        <NodeIcon className="w-5 h-5 text-white" />
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

              {/* Stats row for quiz nodes */}
              {!locked && node.nodeType !== "reflection" && node.nodeType !== "challenge" && node.questionCount > 0 && (
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

              {/* XP pill for non-quiz nodes */}
              {!locked && isNonQuiz && (
                <div className="flex gap-3 mb-5">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span className="text-sm text-slate-600">+{node.xp} XP for completing</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50">
                    <PenLine className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">Min. {MIN_WORDS} words</span>
                  </div>
                </div>
              )}

              {/* Locked state */}
              {locked && (
                <div className="w-full py-4 rounded-2xl bg-slate-100 text-slate-400 text-center font-medium text-sm">
                  Complete previous lessons to unlock
                </div>
              )}

              {/* Quiz node — Start / Practice Again */}
              {!locked && !isNonQuiz && (
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

              {/* Reflection / Challenge node — textarea + word count */}
              {!locked && isNonQuiz && !done && !submitted && (
                <div className="space-y-3">
                  {node.prompt && (
                    <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl italic">
                      &ldquo;{node.prompt}&rdquo;
                    </p>
                  )}
                  <textarea
                    className="w-full h-36 p-4 rounded-2xl border border-slate-200 text-sm text-slate-800 placeholder-slate-300 resize-none focus:outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100 transition"
                    placeholder="Write your reflection here..."
                    value={reflectionText}
                    onChange={(e) => setReflectionText(e.target.value)}
                  />
                  <div className="flex flex-col gap-1 px-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${
                        wordCount >= BONUS_TIER_2 ? "text-amber-500" :
                        wordCount >= BONUS_TIER_1 ? "text-amber-500" :
                        wordsMet ? "text-emerald-600" : "text-slate-400"
                      }`}>
                        {wordCount}/{MIN_WORDS} words {wordsMet && "✓"}
                      </span>
                      {!wordsMet && (
                        <span className="text-xs text-slate-400">{MIN_WORDS - wordCount} more to go</span>
                      )}
                    </div>
                    {wordCountMsg && (
                      <motion.span
                        key={wordCountMsg.text}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-xs font-semibold ${wordCountMsg.color}`}
                      >
                        {wordCount >= BONUS_TIER_2 ? "★" : wordCount >= BONUS_TIER_1 ? "✦" : "✓"} {wordCountMsg.text}
                      </motion.span>
                    )}
                  </div>
                  <button
                    disabled={!wordsMet}
                    onClick={handleSubmitReflection}
                    className={`w-full py-4 rounded-2xl font-semibold text-white text-base transition-all ${
                      wordsMet ? "active:scale-[0.98]" : "opacity-40 cursor-not-allowed"
                    }`}
                    style={wordsMet ? {
                      background: `linear-gradient(135deg, ${node.gradFrom}, ${node.gradTo})`,
                      boxShadow: `0 4px 20px ${node.gradFrom}55`,
                    } : { background: "#94a3b8" }}
                  >
                    Mark Complete
                  </button>
                </div>
              )}

              {/* Already done non-quiz */}
              {!locked && isNonQuiz && done && (
                <div className="w-full py-4 rounded-2xl bg-emerald-50 text-emerald-700 text-center font-semibold text-sm flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Completed today
                </div>
              )}

              {/* Submitted animation */}
              {submitted && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-full py-4 rounded-2xl bg-emerald-50 text-emerald-700 text-center font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" /> Saved! +{bonusXp} XP{xpMultiplier > 1 && ` (${Math.round((xpMultiplier - 1) * 100)}% bonus!)`}
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
