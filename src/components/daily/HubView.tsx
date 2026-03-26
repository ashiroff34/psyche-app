"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Zap, Heart, ArrowRight, Sparkles, BookOpen, CheckCircle, Target, Star } from "lucide-react";
import PetSprite from "@/components/PetSprite";
import type { PathNodeConfig } from "./NodeBottomSheet";

interface InsightData {
  quote: string;
  author: string;
  reflection: string;
  category: string;
}

interface PetWidget {
  name: string;
  petType: number;
  health: number;
  hunger: number;
  isAlive: boolean;
}

interface Props {
  streak: number;
  totalXP: number;
  xpProgress: number; // 0-100
  xpLabel: string;
  xpToNext: number | null;
  nextMilestoneLabel: string | null;
  enneagramType: number;
  enneagramTypeName: string;
  jungianType: string;
  completedToday: number;
  totalNodes: number;
  petWidget: PetWidget | null;
  insightData: InsightData | null;
  activePathTab: "enneagram" | "jungian";
  onPathTabChange: (tab: "enneagram" | "jungian") => void;
  onContinuePath: () => void;
  onNodeTap: (node: PathNodeConfig) => void;
  miniPathNodes: PathNodeConfig[];
  nextNode: PathNodeConfig | null;
  streakFreezes: number;
  // New engagement props
  longestStreak?: number;
  questionsAnsweredToday?: number;
  warmupDoneToday?: boolean;
  dailyXPEarned?: number;
  readingDoneToday?: boolean;
  onStartReading?: () => void;
}

export default function HubView({
  streak,
  totalXP,
  xpProgress,
  xpLabel,
  xpToNext,
  nextMilestoneLabel,
  enneagramType,
  enneagramTypeName,
  jungianType,
  completedToday,
  totalNodes,
  petWidget,
  insightData,
  activePathTab,
  onPathTabChange,
  onContinuePath,
  onNodeTap,
  miniPathNodes,
  nextNode,
  streakFreezes,
  longestStreak = 0,
  questionsAnsweredToday = 0,
  warmupDoneToday = false,
  dailyXPEarned = 0,
  readingDoneToday = false,
  onStartReading,
}: Props) {
  const overallProgress = Math.round((completedToday / Math.max(totalNodes, 1)) * 100);
  const ringCircumference = 2 * Math.PI * 52;

  // Endowed progress: show a "head start" banner on first hub visit if user has XP from assessments
  const [showHeadStart, setShowHeadStart] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = "psyche-hub-welcomed";
    if (!localStorage.getItem(key) && totalXP > 0 && questionsAnsweredToday === 0) {
      setShowHeadStart(true);
      localStorage.setItem(key, "true");
      setTimeout(() => setShowHeadStart(false), 4000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(160deg, #faf5ff 0%, #fdf4ff 50%, #fff1f2 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto px-4 pt-10 pb-32">

        {/* ── Endowed progress banner ── */}
        <AnimatePresence>
          {showHeadStart && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              className="mb-5 flex items-center gap-3 px-4 py-3 rounded-2xl text-white font-medium text-sm"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #d946ef)", boxShadow: "0 4px 16px rgba(139,92,246,0.35)" }}
            >
              <Zap className="w-5 h-5 shrink-0 fill-white" />
              <span>You&apos;ve already earned <strong>{totalXP} XP</strong> — you&apos;re ahead of the starting line!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          {/* Streak */}
          <div className="relative flex flex-col items-center px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm border border-orange-100">
            <Flame className="w-5 h-5 text-orange-500 mb-0.5" />
            <span className="text-xl font-bold text-slate-800 leading-none">{streak}</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-wide mt-0.5">streak</span>
            {longestStreak > streak && longestStreak > 0 && (
              <span className="text-[8px] text-amber-500 font-medium mt-0.5">best: {longestStreak}</span>
            )}
            {streak > 0 && streak >= longestStreak && longestStreak > 0 && (
              <Star className="absolute -top-1.5 -left-1.5 w-4 h-4 text-amber-400 fill-amber-400" />
            )}
            {streakFreezes > 0 && (
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center shadow-sm">
                <span className="text-white text-[9px] font-bold">{streakFreezes}</span>
              </div>
            )}
          </div>

          {/* XP */}
          <div className="flex flex-col items-center px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm border border-amber-100">
            <Zap className="w-5 h-5 text-amber-500 mb-0.5" />
            <span className="text-xl font-bold text-slate-800 leading-none">{totalXP.toLocaleString()}</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-wide mt-0.5">{xpLabel}</span>
          </div>

          {/* Hearts / daily done */}
          <div className="flex flex-col items-center px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm border border-rose-100">
            <Heart className="w-5 h-5 text-rose-500 mb-0.5" />
            <span className="text-xl font-bold text-slate-800 leading-none">{completedToday}/{totalNodes}</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-wide mt-0.5">done today</span>
          </div>
        </motion.div>

        {/* ── Gradient progress ring + pet ── */}
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="relative">
            {/* Outer glow */}
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-30"
              style={{
                background: "radial-gradient(circle, #8b5cf6, #ec4899)",
                transform: "scale(1.15)",
              }}
            />

            <svg width="152" height="152" viewBox="0 0 152 152" className="relative">
              <defs>
                <linearGradient id="hub-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#d946ef" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              {/* Background track */}
              <circle
                cx="76"
                cy="76"
                r="52"
                fill="none"
                stroke="#e9d5ff"
                strokeWidth="6"
              />
              {/* Progress arc */}
              <motion.circle
                cx="76"
                cy="76"
                r="52"
                fill="none"
                stroke="url(#hub-ring-grad)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={ringCircumference}
                initial={{ strokeDashoffset: ringCircumference }}
                animate={{
                  strokeDashoffset:
                    ringCircumference - (ringCircumference * overallProgress) / 100,
                }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "76px 76px",
                  filter: "drop-shadow(0 0 8px rgba(139,92,246,0.5))",
                }}
              />
            </svg>

            {/* Center content — pet or % */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {petWidget?.isAlive ? (
                <div className="flex flex-col items-center">
                  <PetSprite type={petWidget.petType} size={52} />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-slate-800">{overallProgress}%</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wide">today</span>
                </div>
              )}
            </div>
          </div>

          {/* XP progress bar */}
          {xpToNext !== null && nextMilestoneLabel && (
            <div className="mt-4 w-48">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                <span>{xpLabel}</span>
                <span>{xpToNext} to {nextMilestoneLabel}</span>
              </div>
              <div className="h-1.5 bg-violet-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #8b5cf6, #ec4899)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Continue Path button ── */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-7"
        >
          <button
            onClick={onContinuePath}
            className="w-full flex items-center justify-between px-6 py-4 rounded-2xl text-white font-semibold text-base transition-all active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #d946ef, #ec4899)",
              boxShadow: "0 4px 20px rgba(139,92,246,0.4)",
            }}
          >
            <div className="text-left">
              <p className="font-bold text-lg leading-tight">Continue Path</p>
              <p className="text-white/70 text-sm mt-0.5">
                {nextNode ? nextNode.label : "All done for today!"}
              </p>
            </div>
            <ArrowRight className="w-5 h-5 shrink-0" />
          </button>
        </motion.div>

        {/* ── Enneagram / Jungian tab toggle ── */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mb-5"
        >
          <div className="flex gap-1 p-1 bg-violet-50 rounded-xl">
            {(["enneagram", "jungian"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => onPathTabChange(tab)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activePathTab === tab
                    ? "text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                }`}
                style={
                  activePathTab === tab
                    ? { background: "linear-gradient(135deg, #8b5cf6, #d946ef)" }
                    : {}
                }
              >
                {tab === "enneagram" ? "Enneagram" : "Jungian"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Mini path preview ── */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 p-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm border border-white"
        >
          <div className="flex items-center justify-between mb-3 px-1">
            {nextNode && (
              <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">
                UP NEXT — {nextNode.unitName}
              </p>
            )}
          </div>

          {/* Horizontal nodes row — design #11 style */}
          <div className="flex items-center justify-between px-1">
            {miniPathNodes.slice(0, 5).map((node, i) => (
              <div key={node.id} className="flex items-center flex-1">
                {/* Connector line */}
                {i > 0 && (
                  <div
                    className="flex-1 h-px mx-1"
                    style={{
                      background:
                        miniPathNodes[i - 1].status === "completed"
                          ? "linear-gradient(to right,#8b5cf6,#ec4899)"
                          : "#e2e8f0",
                      opacity: miniPathNodes[i - 1].status === "completed" ? 0.5 : 1,
                    }}
                  />
                )}

                {/* Mini node */}
                <button
                  onClick={() => onNodeTap(node)}
                  className="relative flex flex-col items-center gap-1 flex-shrink-0"
                  style={{
                    filter:
                      node.status === "completed"
                        ? "drop-shadow(0 0 4px rgba(139,92,246,0.5))"
                        : node.status === "current"
                        ? "drop-shadow(0 0 6px rgba(251,146,60,0.7))"
                        : "none",
                  }}
                >
                  <div className="relative" style={{ width: 40, height: 40 }}>
                    <svg width="40" height="40" viewBox="0 0 40 40" className="absolute inset-0">
                      <defs>
                        <linearGradient id={`mini-vp-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                        <linearGradient id={`mini-am-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#f97316" />
                        </linearGradient>
                      </defs>
                      {node.status === "locked" && (
                        <circle cx="20" cy="20" r="17" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
                      )}
                      {node.status === "completed" && (
                        <circle cx="20" cy="20" r="17" fill="none" stroke={`url(#mini-vp-${node.id})`} strokeWidth="2.5" />
                      )}
                      {node.status === "current" && (
                        <>
                          <circle cx="20" cy="20" r="17" fill="none" stroke="#ede9fe" strokeWidth="2.5" />
                          <circle cx="20" cy="20" r="17" fill="none" stroke={`url(#mini-am-${node.id})`}
                            strokeWidth="2.5" strokeLinecap="round"
                            strokeDasharray="53 54"
                            style={{ transform: "rotate(-90deg)", transformOrigin: "20px 20px" }} />
                        </>
                      )}
                    </svg>
                    {/* Inner fill */}
                    <div
                      className="absolute rounded-full flex items-center justify-center"
                      style={{
                        inset: 5,
                        background:
                          node.status === "locked"
                            ? "#f1f5f9"
                            : node.status === "completed"
                            ? "linear-gradient(135deg,#8b5cf6,#ec4899)"
                            : "linear-gradient(135deg,#f59e0b,#f97316)",
                      }}
                    >
                      {node.status === "completed" && (
                        <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {node.status === "current" && (
                        <Star className="w-3 h-3 text-white fill-white" />
                      )}
                      {node.status === "locked" && (
                        <svg className="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="5" y="11" width="14" height="10" rx="2" />
                          <path d="M8 11V7a4 4 0 018 0v4" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span
                    className={`text-[9px] font-medium leading-tight text-center max-w-[40px] ${
                      node.status === "current"
                        ? "text-orange-500 font-bold"
                        : node.status === "completed"
                        ? "text-slate-400"
                        : "text-gray-300"
                    }`}
                  >
                    {node.status === "current" ? "Now" : node.label.split(" ")[0]}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Daily Quests ── */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.37 }}
          className="mb-6 p-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm border border-white"
        >
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-violet-500" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Today&apos;s Quests</p>
          </div>
          {[
            {
              label: "Answer 5 questions",
              done: questionsAnsweredToday >= 5,
              progress: Math.min(questionsAnsweredToday, 5),
              total: 5,
              reward: "+10 XP bonus",
            },
            {
              label: "Complete the warm-up",
              done: warmupDoneToday,
              progress: warmupDoneToday ? 1 : 0,
              total: 1,
              reward: "+5 tokens",
            },
            {
              label: "Earn 50 XP today",
              done: dailyXPEarned >= 50,
              progress: Math.min(dailyXPEarned, 50),
              total: 50,
              reward: "+15 XP bonus",
            },
            {
              label: "Complete today's reading",
              done: readingDoneToday,
              progress: readingDoneToday ? 1 : 0,
              total: 1,
              reward: "+25 tokens",
            },
          ].map((quest, i) => (
            <div key={i} className={`flex items-center gap-3 py-2 ${i < 3 ? "border-b border-slate-50" : ""}`}>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                quest.done ? "border-emerald-400 bg-emerald-400" : "border-slate-200 bg-white"
              }`}>
                {quest.done && <CheckCircle className="w-3.5 h-3.5 text-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium leading-tight ${quest.done ? "text-slate-400 line-through" : "text-slate-700"}`}>
                  {quest.label}
                </p>
                {!quest.done && quest.total > 1 && (
                  <div className="mt-1 h-1 bg-slate-100 rounded-full overflow-hidden w-full">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-400 to-pink-400 transition-all"
                      style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                    />
                  </div>
                )}
              </div>
              <span className={`text-xs font-medium shrink-0 ${quest.done ? "text-emerald-500" : "text-amber-500"}`}>
                {quest.reward}
              </span>
            </div>
          ))}

          {/* Full Day bonus */}
          {(() => {
            const allDone = questionsAnsweredToday >= 5 && warmupDoneToday && dailyXPEarned >= 50 && readingDoneToday;
            return (
              <div className={`mt-3 pt-3 border-t border-slate-100 flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                allDone ? "bg-amber-50" : "bg-slate-50/60"
              }`}>
                <Star className={`w-4 h-4 shrink-0 ${allDone ? "text-amber-500" : "text-slate-300"}`} />
                <div className="flex-1">
                  <p className={`text-xs font-semibold ${allDone ? "text-amber-700" : "text-slate-400"}`}>Full Day Bonus</p>
                  <p className="text-[10px] text-slate-400">Complete all 4 quests for a bonus reward</p>
                </div>
                <span className={`text-xs font-bold ${allDone ? "text-amber-600" : "text-slate-300"}`}>+20 tokens</span>
              </div>
            );
          })()}
        </motion.div>

        {/* ── Today's Reading card ── */}
        {onStartReading && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.39 }}
            className="mb-6"
          >
            <button
              onClick={onStartReading}
              className={`w-full text-left p-4 rounded-2xl border transition-all ${
                readingDoneToday
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-white/80 backdrop-blur-sm border-indigo-100/60 shadow-sm hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  readingDoneToday
                    ? "bg-emerald-100"
                    : "bg-gradient-to-br from-indigo-100 to-violet-100"
                }`}>
                  {readingDoneToday
                    ? <CheckCircle className="w-5 h-5 text-emerald-500" />
                    : <BookOpen className="w-5 h-5 text-indigo-500" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className={`text-[10px] font-bold uppercase tracking-wide ${readingDoneToday ? "text-emerald-600" : "text-indigo-600"}`}>
                      Today&apos;s Reading
                    </span>
                    {!readingDoneToday && (
                      <span className="px-1.5 py-0.5 text-[9px] font-semibold rounded-full bg-amber-100 text-amber-700">+25 tokens</span>
                    )}
                  </div>
                  <p className={`text-sm font-medium ${readingDoneToday ? "text-emerald-700" : "text-slate-700"}`}>
                    {readingDoneToday ? "Reading complete — great work!" : "Tap to read today's insight"}
                  </p>
                </div>
                {!readingDoneToday && (
                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </div>
            </button>
          </motion.div>
        )}

        {/* ── Daily insight card ── */}
        {insightData && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="relative overflow-hidden p-5 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm border border-indigo-100/60"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-violet-100/40 to-transparent rounded-bl-full" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #ede9fe, #ddd6fe)" }}
                >
                  <BookOpen className="w-3.5 h-3.5 text-violet-600" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-violet-600 uppercase tracking-wide flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Today&apos;s Insight
                  </div>
                  <div className="text-[9px] text-slate-400 capitalize">{insightData.category}</div>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed font-serif text-[14px] italic mb-1.5">
                &ldquo;{insightData.quote}&rdquo;
              </p>
              <p className="text-xs text-slate-400 mb-2">— {insightData.author}</p>
              <p className="text-slate-600 text-sm leading-relaxed">{insightData.reflection}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
