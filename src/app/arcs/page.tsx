"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Lock,
  Calendar,
  Trophy,
  Flame,
  Share2,
  Zap,
} from "lucide-react";
import { useVerifiedShare } from "@/hooks/useVerifiedShare";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ArcProgress {
  arcId: string;
  startDate: string;
  completedDays: number[];
  currentDay: number;
}

interface Arc {
  id: string;
  title: string;
  subtitle: string;
  theme: { from: string; to: string };
  teaser: string;
  prompts?: string[];
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const ARC_1_PROMPTS: string[] = [
  // Week 1. Naming the Longing
  "Name one thing you've been longing for. Write it down without judging it.",
  "Take that longing and ask: what is one small, concrete step toward it?",
  "Notice your inner critic today. When it speaks, write down exactly what it says.",
  "Sit with an emotion you've been avoiding. Name it in one word, then three.",
  "What creative act have you been postponing? Spend 10 minutes on it. imperfectly.",
  "Write about a time you felt deeply seen. What made that possible?",
  "List three things you do beautifully that you tend to dismiss.",
  // Week 2. Turning Toward Craft
  "Choose one longing from Day 1. Describe what it would look, feel, and sound like if it were real.",
  "What is the smallest possible version of that dream you could build today?",
  "Your inner critic returns. This time, respond to it like a craftsperson. methodically, not defensively.",
  "What discipline or practice makes you feel most alive? Do 20 minutes of it now.",
  "Write about the difference between what you feel and what you make.",
  "Notice when you romanticise suffering today. Write it down without self-judgment.",
  "Take one concrete, unsexy task that moves you forward. Do it first.",
  // Week 3. The Discipline of Beauty
  "What does 'good enough' mean to you? Where do you over-demand perfection?",
  "Design a morning ritual. even five minutes. that honours both feeling and doing.",
  "Write a letter to your inner critic. Thank it for trying to protect you. Then redirect it.",
  "Complete one creative act and share it. with one person, or publicly. Notice the fear.",
  "Identify where you idealise rather than act. Write what action would look like instead.",
  "Describe your dream creative life in concrete, practical terms. not poetic ones.",
  "Do one thing today purely for craft, with no audience in mind.",
  // Week 4. Integration
  "Write about a longing that has quietly become a skill.",
  "Where have you traded depth for precision, or precision for depth? Which do you need more of now?",
  "List three daily habits that channel your intensity into craft.",
  "Write about someone you admire for their discipline. What can you borrow from them?",
  "Notice a moment today when you felt both feeling and function at once. Describe it.",
  "Revisit your Day 1 longing. What has shifted? What is clearer?",
  "Write a short manifesto. three sentences. about what you are building and why.",
  // Days 29-30. Completion
  "Look back over this arc. What surprised you most about yourself?",
  "You have turned longing into craft. Name the one thing you will keep making. and commit to it in writing.",
];

const ARCS: Arc[] = [
  {
    id: "arc-4-1",
    title: "The 4→1 Arc",
    subtitle: "Turning Longing into Craft",
    theme: { from: "#9B59B6", to: "#E74C3C" },
    teaser:
      "A 30-day journey from the depth of feeling into the precision of form. Type 4 learns from Type 1's gift: that discipline is not the enemy of beauty. it is its architecture.",
    prompts: ARC_1_PROMPTS,
  },
  {
    id: "arc-9-3",
    title: "The 9→3 Arc",
    subtitle: "From Peace to Purpose",
    theme: { from: "#95A5A6", to: "#F39C12" },
    teaser:
      "The 9's capacity for harmony meets the 3's drive for achievement. This arc guides the peacemaker to discover that showing up fully. and being seen. is its own kind of serenity.",
  },
  {
    id: "arc-5-8",
    title: "The 5→8 Arc",
    subtitle: "From Mind to Action",
    theme: { from: "#2980B9", to: "#E67E22" },
    teaser:
      "The 5's vast inner world takes its first steps into the arena. This arc helps the observer learn to act before they feel ready. and discover the power waiting on the other side of the threshold.",
  },
];

const ACTIVE_ARC = ARCS[0];
const UPCOMING_ARCS = ARCS.slice(1);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getStoredProgress(): ArcProgress | null {
  try {
    const raw = localStorage.getItem("psyche-arc-progress");
    if (!raw) return null;
    return JSON.parse(raw) as ArcProgress;
  } catch {
    return null;
  }
}

function saveProgress(progress: ArcProgress) {
  try {
    localStorage.setItem("psyche-arc-progress", JSON.stringify(progress));
  } catch {}
}

function initProgress(arcId: string): ArcProgress {
  const progress: ArcProgress = {
    arcId,
    startDate: new Date().toISOString().split("T")[0],
    completedDays: [],
    currentDay: 1,
  };
  saveProgress(progress);
  return progress;
}

function daysSinceStart(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  const diff = Math.floor(
    (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.min(diff + 1, 30); // 1-indexed, max 30
}

function awardTokens(amount: number) {
  try {
    const raw = localStorage.getItem("psyche-game-state");
    const state = raw ? JSON.parse(raw) : {};
    state.tokens = (state.tokens ?? 0) + amount;
    state.totalTokensEarned = (state.totalTokensEarned ?? 0) + amount;
    localStorage.setItem("psyche-game-state", JSON.stringify(state));
  } catch {}
}

function awardBadge(badge: { id: string; name: string; description: string; icon: string }) {
  try {
    const raw = localStorage.getItem("psyche-game-state");
    const state = raw ? JSON.parse(raw) : {};
    if (!Array.isArray(state.badges)) state.badges = [];
    const alreadyEarned = state.badges.some((b: { id: string }) => b.id === badge.id);
    if (!alreadyEarned) {
      state.badges.push({ ...badge, category: "special", earnedAt: new Date().toISOString() });
      localStorage.setItem("psyche-game-state", JSON.stringify(state));
    }
  } catch {}
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function DayCircle({
  day,
  isCompleted,
  isToday,
  isFuture,
  onClick,
  themeFrom,
  themeTo,
}: {
  day: number;
  isCompleted: boolean;
  isToday: boolean;
  isFuture: boolean;
  onClick: () => void;
  themeFrom: string;
  themeTo: string;
}) {
  const t = (day - 1) / 29;
  const r1 = parseInt(themeFrom.slice(1, 3), 16);
  const g1 = parseInt(themeFrom.slice(3, 5), 16);
  const b1 = parseInt(themeFrom.slice(5, 7), 16);
  const r2 = parseInt(themeTo.slice(1, 3), 16);
  const g2 = parseInt(themeTo.slice(3, 5), 16);
  const b2 = parseInt(themeTo.slice(5, 7), 16);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  const dayColor = `rgb(${r},${g},${b})`;

  return (
    <motion.button
      onClick={isFuture ? undefined : onClick}
      disabled={isFuture}
      whileHover={isFuture ? {} : { scale: 1.15 }}
      whileTap={isFuture ? {} : { scale: 0.93 }}
      className="relative flex items-center justify-center"
      style={{ width: 44, height: 44 }}
    >
      {/* Pulsing glow for today */}
      {isToday && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: dayColor, opacity: 0.45 }}
          animate={{ scale: [1, 1.55, 1], opacity: [0.45, 0, 0.45] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Circle body */}
      <motion.div
        className="relative flex items-center justify-center rounded-full text-xs font-bold select-none"
        style={{
          width: 36,
          height: 36,
          background: isCompleted
            ? dayColor
            : isToday
            ? `${dayColor}33`
            : "rgba(255,255,255,0.06)",
          border: isToday
            ? `2px solid ${dayColor}`
            : isCompleted
            ? "none"
            : "1.5px solid rgba(255,255,255,0.10)",
          color: isCompleted
            ? "#fff"
            : isToday
            ? dayColor
            : isFuture
            ? "rgba(255,255,255,0.25)"
            : "rgba(255,255,255,0.55)",
          cursor: isFuture ? "not-allowed" : "pointer",
        }}
        initial={false}
        animate={isCompleted ? { scale: [1, 1.18, 1] } : {}}
        transition={{ duration: 0.35 }}
      >
        {isCompleted ? (
          <Check size={14} strokeWidth={3} />
        ) : isFuture ? (
          <Lock size={10} strokeWidth={2.5} />
        ) : (
          <span>{day}</span>
        )}
      </motion.div>
    </motion.button>
  );
}

interface PromptModalProps {
  day: number;
  prompt: string;
  alreadyCompleted: boolean;
  themeFrom: string;
  themeTo: string;
  onClose: () => void;
  onComplete: () => void;
}

function PromptModal({
  day,
  prompt,
  alreadyCompleted,
  themeFrom,
  themeTo,
  onClose,
  onComplete,
}: PromptModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Sheet */}
      <motion.div
        className="relative w-full max-w-lg mx-4 mb-6 sm:mb-0 rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, rgba(25,14,50,0.97) 0%, rgba(15,10,30,0.99) 100%)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
        }}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: "spring", damping: 26, stiffness: 340 }}
      >
        {/* Gradient header strip */}
        <div
          className="h-1.5 w-full"
          style={{
            background: `linear-gradient(90deg, ${themeFrom}, ${themeTo})`,
          }}
        />

        <div className="p-6 space-y-5">
          {/* Day badge */}
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${themeFrom}33, ${themeTo}33)`,
                border: `1px solid ${themeFrom}55`,
                color: themeFrom,
              }}
            >
              Day {day}
            </span>
            {alreadyCompleted && (
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <Check size={11} strokeWidth={3} /> Completed
              </span>
            )}
          </div>

          {/* Prompt text */}
          <p
            className="text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.88)" }}
          >
            {prompt}
          </p>

          {/* Reward note */}
          {!alreadyCompleted && (
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              Completing this day awards{" "}
              <span style={{ color: themeTo }}>+10 tokens</span>
            </p>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm font-medium transition-opacity hover:opacity-70"
              style={{
                background: "rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              Close
            </button>
            {!alreadyCompleted && (
              <motion.button
                onClick={onComplete}
                whileTap={{ scale: 0.96 }}
                className="flex-[2] py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(90deg, ${themeFrom}, ${themeTo})`,
                  boxShadow: `0 4px 20px ${themeFrom}55`,
                }}
              >
                <Check size={15} strokeWidth={3} />
                Mark complete
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ArcsPage() {
  const router = useRouter();

  const [progress, setProgress] = useState<ArcProgress | null>(null);
  const [todayDay, setTodayDay] = useState(1);
  const [modalDay, setModalDay] = useState<number | null>(null);
  const [justCompleted, setJustCompleted] = useState(false);
  const [showArcBadge, setShowArcBadge] = useState(false);

  const arcShareHook = useVerifiedShare({
    shareId: "arc-complete-4-1",
    tokensPerShare: 20,
    title: "I completed a 30-day growth arc on Thyself",
    text: "Just finished the Longing into Craft arc. 30 days of inner work. Know thyself at thyself.app",
    url: "https://thyself.app/arcs",
  });

  // Load or init progress
  useEffect(() => {
    let stored = getStoredProgress();
    if (!stored || stored.arcId !== ACTIVE_ARC.id) {
      stored = initProgress(ACTIVE_ARC.id);
    }
    const day = daysSinceStart(stored.startDate);
    setTodayDay(day);
    setProgress(stored);
  }, []);

  const completedCount = progress?.completedDays.length ?? 0;
  const percentComplete = Math.round((completedCount / 30) * 100);
  const isArcComplete = completedCount >= 30;

  const handleDayClick = useCallback(
    (day: number) => {
      if (!progress) return;
      if (day > todayDay) return; // future
      setModalDay(day);
    },
    [progress, todayDay]
  );

  const handleMarkComplete = useCallback(() => {
    if (modalDay === null || !progress) return;

    const alreadyDone = progress.completedDays.includes(modalDay);
    if (alreadyDone) {
      setModalDay(null);
      return;
    }

    const newCompleted = [...progress.completedDays, modalDay];
    const updated: ArcProgress = {
      ...progress,
      completedDays: newCompleted,
      currentDay: Math.max(progress.currentDay, modalDay),
    };
    saveProgress(updated);
    setProgress(updated);

    // Award tokens
    awardTokens(10);
    setJustCompleted(true);
    setTimeout(() => setJustCompleted(false), 2000);

    // Check for arc completion
    if (newCompleted.length >= 30) {
      awardTokens(100);
      awardBadge({
        id: "arc-4-1-complete",
        name: "Longing into Craft",
        description: "Completed the 4→1 Seasonal Arc",
        icon: "🎭",
      });
      setShowArcBadge(true);
    }

    setModalDay(null);
  }, [modalDay, progress]);

  const activePrompt =
    modalDay !== null && ACTIVE_ARC.prompts
      ? ACTIVE_ARC.prompts[modalDay - 1]
      : null;

  const isModalDayCompleted =
    modalDay !== null && (progress?.completedDays.includes(modalDay) ?? false);

  return (
    <div
      className="min-h-screen pb-16"
      style={{ background: "#0f0a1e", color: "rgba(255,255,255,0.9)" }}
    >
      {/* ── Top nav ── */}
      <div className="sticky top-0 z-30 flex items-center gap-3 px-4 py-4"
        style={{ background: "rgba(15,10,30,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <motion.button
          onClick={() => router.push("/daily")}
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center w-9 h-9 rounded-xl"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}
        >
          <ArrowLeft size={18} style={{ color: "rgba(255,255,255,0.7)" }} />
        </motion.button>
        <div>
          <h1 className="text-base font-bold leading-tight" style={{ color: "rgba(255,255,255,0.92)" }}>
            Seasonal Arcs
          </h1>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            30-day typed story campaigns
          </p>
        </div>
      </div>

      <div className="px-4 space-y-6 pt-5">
        {/* ── Hero Arc Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow: `0 0 60px ${ACTIVE_ARC.theme.from}22`,
          }}
        >
          {/* Background gradient wash */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: `linear-gradient(135deg, ${ACTIVE_ARC.theme.from}, ${ACTIVE_ARC.theme.to})`,
            }}
          />

          {/* Gradient top border */}
          <div
            className="h-1 w-full"
            style={{
              background: `linear-gradient(90deg, ${ACTIVE_ARC.theme.from}, ${ACTIVE_ARC.theme.to})`,
            }}
          />

          <div className="relative p-5 space-y-4">
            {/* Active badge */}
            <div className="flex items-center gap-2">
              <span
                className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  color: ACTIVE_ARC.theme.from,
                  border: `1px solid ${ACTIVE_ARC.theme.from}44`,
                }}
              >
                <Flame size={11} />
                Active Arc
              </span>
            </div>

            {/* Title */}
            <div>
              <h2
                className="text-2xl font-black tracking-tight"
                style={{
                  background: `linear-gradient(90deg, ${ACTIVE_ARC.theme.from}, ${ACTIVE_ARC.theme.to})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {ACTIVE_ARC.title}
              </h2>
              <p className="text-base font-medium mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>
                {ACTIVE_ARC.subtitle}
              </p>
            </div>

            {/* Teaser */}
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.52)" }}>
              {ACTIVE_ARC.teaser}
            </p>

            {/* Progress bar + label */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <Calendar size={11} />
                  Day {Math.min(todayDay, 30)}/30 · {percentComplete}% complete
                </span>
                {isArcComplete && (
                  <span className="text-xs font-bold flex items-center gap-1" style={{ color: ACTIVE_ARC.theme.to }}>
                    <Trophy size={11} /> Arc complete!
                  </span>
                )}
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${ACTIVE_ARC.theme.from}, ${ACTIVE_ARC.theme.to})`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentComplete}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 30-Day Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl p-5 space-y-4"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.8)" }}>
              Your 30-Day Journey
            </h3>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              Tap a day to see its prompt
            </span>
          </div>

          {/* Grid: 6 columns × 5 rows */}
          <div className="grid grid-cols-6 gap-1.5 justify-items-center">
            {Array.from({ length: 30 }, (_, i) => {
              const day = i + 1;
              const isCompleted = progress?.completedDays.includes(day) ?? false;
              const isToday = day === Math.min(todayDay, 30);
              const isFuture = day > todayDay;
              return (
                <DayCircle
                  key={day}
                  day={day}
                  isCompleted={isCompleted}
                  isToday={isToday}
                  isFuture={isFuture}
                  onClick={() => handleDayClick(day)}
                  themeFrom={ACTIVE_ARC.theme.from}
                  themeTo={ACTIVE_ARC.theme.to}
                />
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 pt-1">
            {[
              { icon: <Check size={10} strokeWidth={3} />, label: "Completed", color: ACTIVE_ARC.theme.from },
              { icon: <span className="w-2 h-2 rounded-full inline-block" style={{ background: ACTIVE_ARC.theme.from, opacity: 0.6 }} />, label: "Today", color: ACTIVE_ARC.theme.from },
              { icon: <Lock size={10} />, label: "Locked", color: "rgba(255,255,255,0.25)" },
            ].map(({ icon, label, color }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                <span style={{ color }}>{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Token reward flash ── */}
        <AnimatePresence>
          {justCompleted && (
            <motion.div
              className="fixed top-20 left-1/2 -translate-x-1/2 z-40 px-4 py-2.5 rounded-2xl text-sm font-bold flex items-center gap-2"
              style={{
                background: `linear-gradient(90deg, ${ACTIVE_ARC.theme.from}, ${ACTIVE_ARC.theme.to})`,
                boxShadow: `0 8px 32px ${ACTIVE_ARC.theme.from}66`,
                color: "#fff",
              }}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: "spring", damping: 22, stiffness: 380 }}
            >
              <Flame size={14} /> +10 tokens
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Arc Complete Badge ── */}
        <AnimatePresence>
          {showArcBadge && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setShowArcBadge(false)}
              />
              <motion.div
                className="relative mx-4 rounded-3xl p-8 text-center space-y-4 max-w-sm w-full"
                style={{
                  background: "linear-gradient(145deg, rgba(25,14,50,0.99), rgba(15,10,30,0.99))",
                  border: `1px solid ${ACTIVE_ARC.theme.from}55`,
                  boxShadow: `0 0 80px ${ACTIVE_ARC.theme.from}44`,
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 22, stiffness: 300 }}
              >
                <div className="text-6xl">🎭</div>
                <div>
                  <h2 className="text-xl font-black" style={{
                    background: `linear-gradient(90deg, ${ACTIVE_ARC.theme.from}, ${ACTIVE_ARC.theme.to})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                    Arc Complete!
                  </h2>
                  <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                    You earned the <strong>Longing into Craft</strong> badge
                  </p>
                </div>
                <div
                  className="text-sm font-bold px-4 py-2 rounded-full inline-flex items-center gap-1.5"
                  style={{
                    background: `${ACTIVE_ARC.theme.to}22`,
                    border: `1px solid ${ACTIVE_ARC.theme.to}55`,
                    color: ACTIVE_ARC.theme.to,
                  }}
                >
                  <Trophy size={13} /> +100 bonus tokens
                </div>
                {/* Share for +20 tokens */}
                <button
                  onClick={arcShareHook.share}
                  disabled={arcShareHook.isSharing}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60"
                  style={{
                    background: arcShareHook.isVerified
                      ? "linear-gradient(90deg, #fbbf24, #f97316)"
                      : "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: arcShareHook.isVerified ? "#fff" : "rgba(255,255,255,0.7)",
                  }}
                >
                  {arcShareHook.isVerified ? (
                    <><Zap size={15} /> +20 tokens earned!</>
                  ) : (
                    <><Share2 size={15} /> Share achievement (+20t)</>
                  )}
                </button>

                <button
                  onClick={() => setShowArcBadge(false)}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white"
                  style={{
                    background: `linear-gradient(90deg, ${ACTIVE_ARC.theme.from}, ${ACTIVE_ARC.theme.to})`,
                  }}
                >
                  Claim reward
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Upcoming Arcs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3"
        >
          <h3 className="text-sm font-bold px-1" style={{ color: "rgba(255,255,255,0.55)" }}>
            Upcoming Arcs
          </h3>

          {UPCOMING_ARCS.map((arc, idx) => (
            <motion.div
              key={arc.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 + idx * 0.1 }}
              className="relative overflow-hidden rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Dimmed gradient top strip */}
              <div
                className="h-0.5 w-full opacity-50"
                style={{
                  background: `linear-gradient(90deg, ${arc.theme.from}, ${arc.theme.to})`,
                }}
              />

              {/* Frosted overlay to indicate locked state */}
              <div
                className="absolute inset-0 z-10"
                style={{ backdropFilter: "blur(0.5px)", background: "rgba(15,10,30,0.55)" }}
              />

              <div className="relative z-20 p-5 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h4
                      className="text-base font-black leading-tight"
                      style={{
                        background: `linear-gradient(90deg, ${arc.theme.from}99, ${arc.theme.to}99)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {arc.title}
                    </h4>
                    <p className="text-xs font-medium mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {arc.subtitle}
                    </p>
                  </div>
                  <div
                    className="shrink-0 flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    <Lock size={10} /> Locked
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.30)" }}>
                  {arc.teaser}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Prompt Modal ── */}
      <AnimatePresence>
        {modalDay !== null && activePrompt !== null && (
          <PromptModal
            day={modalDay}
            prompt={activePrompt}
            alreadyCompleted={isModalDayCompleted}
            themeFrom={ACTIVE_ARC.theme.from}
            themeTo={ACTIVE_ARC.theme.to}
            onClose={() => setModalDay(null)}
            onComplete={handleMarkComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
