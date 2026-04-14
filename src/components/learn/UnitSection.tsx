"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Lock, Crown, BookOpen, Target, Scale, Heart, Star, Pencil,
  Search, Shield, Sparkles, Flame, Wind, Brain, Lightbulb,
  Compass, Users, Layers, BarChart2, Eye, Shuffle, BookMarked, Zap, Info,
  type LucideIcon,
} from "lucide-react";

const UNIT_ICON_MAP: Record<string, LucideIcon> = {
  BookOpen, Target, Scale, Heart, Star, Pencil,
  Search, Shield, Sparkles, Flame, Wind, Brain, Lightbulb,
  Compass, Users, Layers, BarChart2, Eye, Shuffle, BookMarked, Zap,
};
import type { UnitWithStatus, LessonWithStatus } from "@/hooks/useMergedLearnState";
import ChibiSprite from "@/components/ChibiSprite";

interface Props {
  unit: UnitWithStatus;
  onNodeTap: (lesson: LessonWithStatus) => void;
  index: number;
  enneagramType?: number;
  instinct?: string;
  prevBg?: string;
  nextBg?: string;
}

// ── "Why this order?" pedagogy notes per unit order ─────────────────────────
const PEDAGOGY_NOTES: Record<number, string> = {
  1:  "We start here because knowing the 9 types is the foundation everything else builds on.",
  2:  "Wings give your core type texture — they're the first layer of nuance after the basics.",
  3:  "Once you know your type, subtypes show how it expresses in real life situations.",
  4:  "Tritype reveals which types you draw from across all three centers, rounding out your profile.",
  5:  "Levels of health show the same type across a whole spectrum — key for real self-knowledge.",
  6:  "Integration and stress lines explain how you shift under growth or pressure.",
  7:  "Growth practices are most useful once you understand your type's patterns.",
  8:  "Self-observation is where psychology becomes lived practice.",
  9:  "Somatic awareness grounds what you've learned in your body, not just your mind.",
  10: "Relationships are where type dynamics play out most visibly.",
  11: "Shadow work requires a solid grasp of your core before going deeper.",
  12: "The head center types (5, 6, 7) share a common fear theme worth exploring together.",
  13: "The heart center types (2, 3, 4) share an identity-seeking pattern.",
  14: "The gut center types (8, 9, 1) share an instinct-regulation pattern.",
  15: "Cognitive functions bridge Enneagram with Jungian typology.",
  16: "Dominant functions shape everything — they're the lens you default to.",
  17: "Auxiliary functions are your support system and secondary strength.",
  18: "Inferior and shadow functions reveal your blind spots and growth edges.",
  19: "MBTI types emerge naturally from the function stack you've been building.",
  20: "Big Five grounds these frameworks in empirically validated personality research.",
  21: "The neuroscience of personality makes the abstract concrete and scientifically credible.",
  22: "Attachment theory connects early experience to the patterns you've been studying.",
  23: "Hornevian groups (Assertive, Compliant, Withdrawn) reveal your interpersonal strategy — essential before diving into philosophy.",
  24: "Harmonic groups (Positive Outlook, Competency, Reactive) show how you cope with conflict — a critical layer of self-knowledge.",
  25: "Instinctual subtypes (sp/sx/so) are the most practical filter — they explain surface-level behavior differences within the same type.",
  26: "Ichazo's original fixations are where modern Enneagram began — historical grounding before we go deeper.",
  27: "Existentialism asks the questions your type is already living. A natural bridge from psychological to philosophical self-inquiry.",
  28: "Stoic practices map directly onto integration work — control, acceptance, and virtue align with type growth.",
  29: "Buddhism introduced non-self and impermanence — concepts that reframe type identification entirely.",
  30: "Phenomenology is the philosophy of lived experience, which is exactly what you've been developing self-awareness of.",
  31: "Depth psychology (Jung, Freud) gives theoretical grounding to everything in this curriculum.",
  32: "Eastern philosophy expands the frame beyond the Western psychological lens.",
  33: "Virtue ethics asks not 'what type am I?' but 'what kind of person am I becoming?' — a worthy final question.",
  34: "Meaning and purpose integrate all the frameworks into a lived life philosophy.",
  35: "Meta-cognition is the capstone — thinking about how you think is the ultimate tool.",
};

// Snake-path x positions (as fraction of container width)
const POSITIONS = [0.2, 0.5, 0.8, 0.5];
const NODE_SIZE = 68;
const ROW_HEIGHT_NORMAL = 110;
const ROW_HEIGHT_CURRENT = 195; // extra room for chibi + START pill

// Gradient palettes per unit index (cycles)
// bg = the full-section background color — Duolingo-style world immersion
// Keep rich/dark but clearly distinct — white text must stay legible
const UNIT_PALETTES = [
  { from: "#c084fc", to: "#7c3aed", glow: "rgba(192,132,252,0.6)", bg: "#200a4a" },  // cosmic violet
  { from: "#38bdf8", to: "#2563eb", glow: "rgba(56,189,248,0.6)",  bg: "#051e38" },  // deep ocean
  { from: "#4ade80", to: "#059669", glow: "rgba(74,222,128,0.6)",  bg: "#0a2d10" },  // forest
  { from: "#fbbf24", to: "#ea580c", glow: "rgba(251,191,36,0.6)",  bg: "#2d1800" },  // volcanic amber
  { from: "#f472b6", to: "#be185d", glow: "rgba(244,114,182,0.6)", bg: "#2d0820" },  // fuchsia
  { from: "#22d3ee", to: "#0891b2", glow: "rgba(34,211,238,0.6)",  bg: "#052828" },  // arctic teal
  { from: "#bef264", to: "#65a30d", glow: "rgba(190,242,100,0.55)", bg: "#162800" }, // jungle lime
];

function CurriculumNode({
  lesson,
  xPct,
  prevXPct,
  rowIndex,
  showChibi,
  enneagramType,
  instinct,
  onClick,
  palette,
  nodeId,
}: {
  lesson: LessonWithStatus;
  xPct: number;
  prevXPct: number | null;
  rowIndex: number;
  showChibi: boolean;
  enneagramType: number;
  instinct: string;
  onClick: () => void;
  palette: (typeof UNIT_PALETTES)[0];
  nodeId?: string;
}) {
  const isCurrent = lesson.status === "current";
  const isCompleted = lesson.status === "completed";
  const isLocked = lesson.status === "locked";
  const isInteractive = !isLocked;

  const rowHeight = isCurrent ? ROW_HEIGHT_CURRENT : ROW_HEIGHT_NORMAL;

  // Node appearance
  const nodeStyle: React.CSSProperties = isCompleted
    ? {
        background: "linear-gradient(180deg, #34d399, #10b981)",
        boxShadow: "0 0 20px rgba(52,211,153,0.5), 0 0 8px rgba(52,211,153,0.3)",
      }
    : isCurrent
    ? {
        background: `linear-gradient(180deg, ${palette.from}, ${palette.to})`,
        boxShadow: `0 0 24px ${palette.glow}, 0 0 8px ${palette.glow}`,
      }
    : lesson.status === "available"
    ? {
        background: `linear-gradient(180deg, ${palette.from}cc, ${palette.to}99)`,
        boxShadow: `0 0 12px ${palette.glow}55`,
      }
    : {
        background: "linear-gradient(180deg, #6b7280, #4b5563)",
        boxShadow: "none",
      };

  const shadowColor = isCompleted
    ? "#0d7a3b"
    : isCurrent
    ? "#5b21b6"
    : lesson.status === "available"
    ? "#3730a3"
    : "#374151";

  return (
    <div id={nodeId} className="relative" style={{ height: rowHeight }}>
      {/* SVG connector from previous node */}
      {rowIndex > 0 && prevXPct !== null && (
        <svg
          className="absolute left-0 w-full overflow-visible pointer-events-none"
          style={{ top: -48, height: 56, zIndex: 0 }}
        >
          <defs>
            <linearGradient id={`conn-grad-${rowIndex}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isCompleted ? "#34d399" : palette.from} stopOpacity="0.9" />
              <stop offset="100%" stopColor={isCompleted ? "#10b981" : palette.to} stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id={`conn-glow-${rowIndex}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isCompleted ? "rgba(52,211,153,0.3)" : palette.from} stopOpacity="0.25" />
              <stop offset="100%" stopColor={isCompleted ? "rgba(16,185,129,0.3)" : palette.to} stopOpacity="0.15" />
            </linearGradient>
          </defs>
          {/* Glow layer */}
          <line
            x1={`${prevXPct * 100}%`} y1="0"
            x2={`${xPct * 100}%`} y2="56"
            stroke={`url(#conn-glow-${rowIndex})`}
            strokeWidth="18"
            strokeLinecap="round"
          />
          {/* Main gradient line */}
          <line
            x1={`${prevXPct * 100}%`} y1="0"
            x2={`${xPct * 100}%`} y2="56"
            stroke={`url(#conn-grad-${rowIndex})`}
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Bright highlight */}
          <line
            x1={`${prevXPct * 100}%`} y1="0"
            x2={`${xPct * 100}%`} y2="56"
            stroke={isCompleted ? "rgba(110,231,183,0.7)" : `${palette.from}44`}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}

      {/* Node + chibi + label column */}
      <div
        className="absolute flex flex-col items-center"
        style={{
          left: `${xPct * 100}%`,
          transform: "translateX(-50%)",
          top: rowIndex === 0 ? 16 : 8,
          zIndex: 1,
        }}
      >
        {/* Chibi floats above current node */}
        {showChibi && (
          <motion.div
            className="absolute z-10"
            style={{ top: -88 }}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: [0, -5, 0], opacity: 1 }}
            transition={{
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.4 },
            }}
          >
            <ChibiSprite type={enneagramType} instinct={instinct} size={80} state="happy" />
          </motion.div>
        )}

        {/* Pulse rings for current — use unit palette color */}
        {isCurrent && (
          <>
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{ inset: -10, border: `2px solid ${palette.from}55` }}
              animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{ inset: -5, border: `2px solid ${palette.from}88` }}
              animate={{ scale: [1, 1.22], opacity: [0.8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
          </>
        )}

        {/* 3D node button */}
        <motion.button
          onClick={onClick}
          whileTap={{ scale: isInteractive ? 0.88 : 0.95 }}
          animate={isCurrent ? { scale: [1, 1.04, 1] } : {}}
          transition={isCurrent ? { duration: 2, repeat: Infinity } : {}}
          className="relative"
          style={{ width: NODE_SIZE, height: NODE_SIZE, cursor: "pointer" }}
        >
          {/* 3D shadow bottom layer */}
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: shadowColor, transform: "translateY(5px)" }}
          />
          {/* Main circle */}
          <div
            className="absolute inset-0 rounded-full flex items-center justify-center text-2xl"
            style={nodeStyle}
          >
            {isLocked && <Lock className="text-gray-400/60" style={{ width: 24, height: 24 }} />}
            {isCompleted && <span>✓</span>}
            {isCurrent && <span>✦</span>}
            {lesson.status === "available" && <span style={{ fontSize: 22 }}>★</span>}
          </div>
        </motion.button>

        {/* Crown badge for completed */}
        {isCompleted && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Crown className="w-4 h-4 text-yellow-400 fill-yellow-400 drop-shadow-md" />
          </div>
        )}

        {/* XP badge */}
        {isCompleted && (
          <div
            className="absolute -right-2 -bottom-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold text-white"
            style={{ background: "#059669" }}
          >
            +XP
          </div>
        )}

        {/* START pill for current */}
        {isCurrent && (
          <motion.button
            onClick={onClick}
            className="absolute px-7 py-2 rounded-2xl font-black text-sm text-white tracking-wide whitespace-nowrap"
            style={{
              top: NODE_SIZE + 12,
              background: `linear-gradient(135deg, ${palette.from}, ${palette.to})`,
              boxShadow: `0 4px 0 ${palette.to}aa, 0 6px 20px ${palette.glow}`,
            }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            START
          </motion.button>
        )}

        {/* Lesson label */}
        <p
          className="text-center leading-tight font-semibold"
          style={{
            fontSize: 11,
            maxWidth: 88,
            marginTop: isCurrent ? NODE_SIZE + 54 : 10,
            color: isCompleted
              ? "rgba(52,211,153,0.8)"
              : isCurrent
              ? "rgba(196,181,253,0.95)"
              : lesson.status === "available"
              ? "rgba(167,139,250,0.7)"
              : "rgba(100,100,130,0.6)",
          }}
        >
          {lesson.title}
        </p>
      </div>
    </div>
  );
}

export default function UnitSection({ unit, onNodeTap, index, enneagramType = 4, instinct = "sp", prevBg = "#08031a", nextBg = "#08031a" }: Props) {
  const palette = UNIT_PALETTES[index % UNIT_PALETTES.length];
  const { isLocked, lessonsWithStatus, progress } = unit;
  const [showWhy, setShowWhy] = useState(false);
  const pedagogyNote = PEDAGOGY_NOTES[unit.order];
  const pct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
  const currentIdx = lessonsWithStatus.findIndex((l) => l.status === "current");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="mb-0 relative"
      style={!isLocked ? {
        background: `linear-gradient(180deg, ${prevBg} 0%, ${palette.bg} 12%, ${palette.bg} 82%, ${nextBg} 100%)`,
        paddingTop: 24,
        paddingBottom: 8,
      } : undefined}
    >
      {/* ── World / Unit banner ────────────────────────────────────────── */}
      <div
        className="relative mx-3 mb-8 rounded-2xl overflow-hidden"
        style={{
          background: isLocked
            ? "rgba(255,255,255,0.04)"
            : `linear-gradient(135deg, ${palette.from}30, ${palette.to}18)`,
          border: isLocked
            ? "1px solid rgba(255,255,255,0.08)"
            : `1px solid ${palette.from}55`,
        }}
      >
        {/* Grain texture overlay */}
        {!isLocked && <div className="banner-grain" />}

        {/* Top accent stripe */}
        {!isLocked && (
          <div
            className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
            style={{ background: `linear-gradient(90deg, ${palette.from}, ${palette.to})` }}
          />
        )}

        <div className="flex items-center gap-4 px-4 py-4 pt-5">
          {/* Unit icon (Lucide) */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: isLocked ? "rgba(255,255,255,0.05)" : `${palette.from}33`,
              border: `1px solid ${isLocked ? "rgba(255,255,255,0.08)" : palette.from + "55"}`,
            }}
          >
            {!isLocked && (() => {
              const IconComp = unit.icon ? UNIT_ICON_MAP[unit.icon] : null;
              return IconComp
                ? <IconComp className="w-6 h-6" style={{ color: palette.from }} />
                : <span className="text-sm font-bold" style={{ color: palette.from }}>{unit.order}</span>;
            })()}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className="text-[10px] font-black uppercase tracking-widest"
                style={{ color: isLocked ? "rgba(255,255,255,0.2)" : palette.from }}
              >
                Unit {unit.order}
              </span>
              {pct === 100 && <span className="text-[10px] font-mono">(*)</span>}
            </div>
            <h3
              className="font-black text-base leading-tight mb-1"
              style={{ color: isLocked ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.95)" }}
            >
              {unit.title}
            </h3>
            <p
              className="text-xs leading-relaxed"
              style={{ color: isLocked ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.45)" }}
            >
              {unit.subtitle}
            </p>

            {/* Progress bar */}
            {progress.total > 0 && !isLocked && (
              <div className="mt-2">
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${palette.from}, ${palette.to})` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.07 }}
                  />
                </div>
                <p className="text-[9px] mt-0.5" style={{ color: "rgba(255,255,255,0.25)" }}>
                  {progress.completed}/{progress.total} complete
                </p>
              </div>
            )}

            {/* "Why this order?" toggle */}
            {!isLocked && pedagogyNote && (
              <div className="mt-2.5">
                <button
                  onClick={() => setShowWhy(!showWhy)}
                  className="flex items-center gap-1 transition-opacity hover:opacity-80 active:scale-95"
                  style={{ color: `${palette.from}bb` }}
                >
                  <Info className="w-3 h-3 flex-shrink-0" />
                  <span className="text-[10px] font-semibold">Why is this here?</span>
                </button>
                <AnimatePresence>
                  {showWhy && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[11px] leading-relaxed mt-1.5 pl-4"
                      style={{
                        color: "rgba(255,255,255,0.55)",
                        borderLeft: `2px solid ${palette.from}55`,
                      }}
                    >
                      {pedagogyNote}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Lesson nodes (snake path) ───────────────────────────────────── */}
      {!isLocked && lessonsWithStatus.length > 0 && (
        <div className="relative px-4 pb-6">
          {lessonsWithStatus.map((lesson, i) => {
            const xPct = POSITIONS[i % POSITIONS.length];
            const prevXPct = i > 0 ? POSITIONS[(i - 1) % POSITIONS.length] : null;
            return (
              <CurriculumNode
                key={lesson.id}
                lesson={lesson}
                xPct={xPct}
                prevXPct={prevXPct}
                rowIndex={i}
                showChibi={i === currentIdx}
                enneagramType={enneagramType}
                instinct={instinct}
                onClick={() => onNodeTap(lesson)}
                palette={palette}
                nodeId={lesson.status === "current" ? "current-lesson-node" : undefined}
              />
            );
          })}
        </div>
      )}

      {/* Locked placeholder */}
      {isLocked && progress.total > 0 && (
        <div className="flex justify-center mb-8">
          <div
            className="px-5 py-2.5 rounded-2xl text-xs font-medium"
            style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {progress.total} lessons · complete prerequisites to unlock
          </div>
        </div>
      )}
    </motion.div>
  );
}
