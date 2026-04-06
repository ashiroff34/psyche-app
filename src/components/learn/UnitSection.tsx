"use client";

import { motion } from "framer-motion";
import { Lock, Crown } from "lucide-react";
import type { UnitWithStatus, LessonWithStatus } from "@/hooks/useMergedLearnState";
import ChibiSprite from "@/components/ChibiSprite";

interface Props {
  unit: UnitWithStatus;
  onNodeTap: (lesson: LessonWithStatus) => void;
  index: number;
  enneagramType?: number;
  instinct?: string;
}

// Snake-path x positions (as fraction of container width)
const POSITIONS = [0.2, 0.5, 0.8, 0.5];
const NODE_SIZE = 68;
const ROW_HEIGHT_NORMAL = 110;
const ROW_HEIGHT_CURRENT = 195; // extra room for chibi + START pill

// Gradient palettes per unit index (cycles)
const UNIT_PALETTES = [
  { from: "#7c3aed", to: "#4f46e5", glow: "rgba(124,58,237,0.5)" },
  { from: "#0ea5e9", to: "#6366f1", glow: "rgba(14,165,233,0.5)" },
  { from: "#10b981", to: "#0ea5e9", glow: "rgba(16,185,129,0.5)" },
  { from: "#f59e0b", to: "#ef4444", glow: "rgba(245,158,11,0.5)" },
  { from: "#ec4899", to: "#a855f7", glow: "rgba(236,72,153,0.5)" },
  { from: "#6366f1", to: "#06b6d4", glow: "rgba(99,102,241,0.5)" },
  { from: "#84cc16", to: "#10b981", glow: "rgba(132,204,22,0.45)" },
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
    <div className="relative" style={{ height: rowHeight }}>
      {/* SVG connector from previous node */}
      {rowIndex > 0 && prevXPct !== null && (
        <svg
          className="absolute left-0 w-full overflow-visible pointer-events-none"
          style={{ top: -48, height: 56, zIndex: 0 }}
        >
          {/* Glow layer */}
          <line
            x1={`${prevXPct * 100}%`} y1="0"
            x2={`${xPct * 100}%`} y2="56"
            stroke={isCompleted ? "rgba(52,211,153,0.35)" : "rgba(139,92,246,0.15)"}
            strokeWidth="18"
            strokeLinecap="round"
          />
          {/* Main thick line */}
          <line
            x1={`${prevXPct * 100}%`} y1="0"
            x2={`${xPct * 100}%`} y2="56"
            stroke={isCompleted ? "#34d399" : "rgba(139,92,246,0.35)"}
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Bright highlight */}
          <line
            x1={`${prevXPct * 100}%`} y1="0"
            x2={`${xPct * 100}%`} y2="56"
            stroke={isCompleted ? "rgba(110,231,183,0.7)" : "rgba(167,139,250,0.18)"}
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

        {/* Pulse rings for current */}
        {isCurrent && (
          <>
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{ inset: -10, border: "2px solid rgba(139,92,246,0.3)" }}
              animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{ inset: -5, border: "2px solid rgba(139,92,246,0.5)" }}
              animate={{ scale: [1, 1.22], opacity: [0.8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
          </>
        )}

        {/* 3D node button */}
        <motion.button
          onClick={isInteractive ? onClick : undefined}
          whileTap={isInteractive ? { scale: 0.88 } : {}}
          animate={isCurrent ? { scale: [1, 1.04, 1] } : {}}
          transition={isCurrent ? { duration: 2, repeat: Infinity } : {}}
          className="relative"
          style={{ width: NODE_SIZE, height: NODE_SIZE, cursor: isInteractive ? "pointer" : "default" }}
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

export default function UnitSection({ unit, onNodeTap, index, enneagramType = 4, instinct = "sp" }: Props) {
  const palette = UNIT_PALETTES[index % UNIT_PALETTES.length];
  const { isLocked, lessonsWithStatus, progress } = unit;
  const pct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
  const currentIdx = lessonsWithStatus.findIndex((l) => l.status === "current");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="mb-2"
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
        {/* Top accent stripe */}
        {!isLocked && (
          <div
            className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
            style={{ background: `linear-gradient(90deg, ${palette.from}, ${palette.to})` }}
          />
        )}

        <div className="flex items-center gap-4 px-4 py-4 pt-5">
          {/* Big emoji icon */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{
              background: isLocked ? "rgba(255,255,255,0.05)" : `${palette.from}33`,
              border: `1px solid ${isLocked ? "rgba(255,255,255,0.08)" : palette.from + "55"}`,
            }}
          >
            {isLocked ? "" : unit.icon ?? "★"}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className="text-[10px] font-black uppercase tracking-widest"
                style={{ color: isLocked ? "rgba(255,255,255,0.2)" : palette.from }}
              >
                Unit {unit.order}
              </span>
              {pct === 100 && <span className="text-[10px]">★</span>}
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
