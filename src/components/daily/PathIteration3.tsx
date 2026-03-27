"use client";

/**
 * ITERATION 3: "Duolingo Faithful + Thyself Flavor"
 *
 * Closest to actual Duolingo but with personality psychology theming:
 * - Bright white background with colorful section bands
 * - BIG nodes (76px) — truly chunky, satisfying to tap
 * - 3D "button" effect: darker bottom border makes them look pressable
 * - Completed = bright green with golden star inside
 * - Current = glowing violet-blue with animated sparkle + bouncy START below
 * - Locked = light gray with subtle lock, NOT pressable
 * - Thick dashed connector lines between nodes (playful, like Duolingo)
 * - Chibi character on a little "speech bubble" platform next to current node
 * - Section labels are fun/themed ("🔥 Type Deep Dive", "🧠 Mind & Functions")
 * - No unit boxes/cards — just colored background bands that flow
 * - Streak flame counter floating in top-right
 */

import { motion } from "framer-motion";
import { Lock, Star, Sparkles, Flame } from "lucide-react";
import type { PathNodeConfig } from "./NodeBottomSheet";
import ChibiSprite from "@/components/ChibiSprite";

export interface PathUnit {
  id: string;
  name: string;
  gradFrom: string;
  gradTo: string;
  nodes: PathNodeConfig[];
}

interface Props {
  units: PathUnit[];
  onNodeTap: (node: PathNodeConfig) => void;
  streak?: number;
}

const SECTION_THEMES = [
  { bg: "#ddf4dd", accent: "#58cc02", emoji: "☀️" },
  { bg: "#e8d5f5", accent: "#ce82ff", emoji: "🧠" },
  { bg: "#d0f0e4", accent: "#00cd9c", emoji: "🔗" },
  { bg: "#ffecd2", accent: "#ff9600", emoji: "📚" },
  { bg: "#d6eeff", accent: "#1cb0f6", emoji: "⭐" },
];

function ChunkyNode({
  node,
  onClick,
  accent,
}: {
  node: PathNodeConfig;
  onClick: () => void;
  accent: string;
}) {
  const size = 76;

  const fills = {
    completed: { main: "#58cc02", shadow: "#46a302", icon: <Star className="text-yellow-300 fill-yellow-300" style={{ width: 32, height: 32 }} /> },
    current: { main: accent, shadow: darken(accent), icon: <Sparkles className="text-white" style={{ width: 32, height: 32 }} /> },
    locked: { main: "#e5e7eb", shadow: "#d1d5db", icon: <Lock className="text-gray-400" style={{ width: 28, height: 28 }} /> },
  };

  const { main, shadow, icon } = fills[node.status];

  return (
    <div className="relative">
      {/* Glow ring for current */}
      {node.status === "current" && (
        <motion.div
          className="absolute -inset-3 rounded-full"
          style={{ background: `${accent}20` }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <motion.button
        whileTap={node.status !== "locked" ? { scale: 0.92, y: 3 } : {}}
        onClick={node.status !== "locked" ? onClick : undefined}
        className="relative block"
        style={{ width: size, height: size + 5, cursor: node.status === "locked" ? "default" : "pointer" }}
      >
        {/* 3D shadow bottom */}
        <div
          className="absolute rounded-full"
          style={{
            left: 0, right: 0, top: 5, bottom: 0,
            width: size, height: size,
            background: shadow,
          }}
        />
        {/* Main circle face */}
        <div
          className="absolute rounded-full flex items-center justify-center"
          style={{
            width: size, height: size,
            background: main,
            top: 0,
          }}
        >
          {icon}
        </div>
      </motion.button>

      {/* Big START button */}
      {node.status === "current" && (
        <motion.button
          onClick={onClick}
          className="absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="px-8 py-3 rounded-2xl font-black text-base tracking-wider text-white relative"
            style={{
              background: accent,
              boxShadow: `0 5px 0 ${darken(accent)}, 0 8px 24px ${accent}44`,
            }}
          >
            START
          </div>
        </motion.button>
      )}
    </div>
  );
}

function darken(hex: string): string {
  // Simple hex darken
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, ((num >> 16) & 0xff) - 35);
  const g = Math.max(0, ((num >> 8) & 0xff) - 35);
  const b = Math.max(0, (num & 0xff) - 35);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export default function PathIteration3({ units, onNodeTap, streak = 0 }: Props) {
  // Flatten all nodes with section metadata
  const sections: { node: PathNodeConfig; unitIdx: number; isFirstInSection: boolean }[] = [];
  units.forEach((unit, ui) => {
    unit.nodes.forEach((node, ni) => {
      sections.push({ node, unitIdx: ui, isFirstInSection: ni === 0 });
    });
  });

  const currentIdx = sections.findIndex((s) => s.node.status === "current");
  const positions = [0.22, 0.5, 0.78, 0.5];

  return (
    <div className="min-h-screen pb-24 relative" style={{ background: "#ffffff" }}>
      {/* Floating streak counter */}
      {streak > 0 && (
        <div className="sticky top-2 z-20 flex justify-end px-4">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white shadow-md border border-orange-100">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span className="text-sm font-black text-orange-500">{streak}</span>
          </div>
        </div>
      )}

      <div className="relative pt-6">
        {sections.map(({ node, unitIdx, isFirstInSection }, idx) => {
          const theme = SECTION_THEMES[unitIdx % SECTION_THEMES.length];
          const xPct = positions[idx % positions.length];
          const showChibi = idx === currentIdx;
          const rowHeight = node.status === "current" ? 180 : 130;

          return (
            <div key={node.id} className="relative" style={{ height: rowHeight }}>
              {/* Section background band */}
              {isFirstInSection && (
                <div
                  className="absolute -left-0 -right-0 -top-6"
                  style={{
                    height: units[unitIdx].nodes.length * rowHeight + 40,
                    background: `linear-gradient(180deg, ${theme.bg} 0%, ${theme.bg}88 100%)`,
                    zIndex: 0,
                  }}
                />
              )}

              {/* Section label */}
              {isFirstInSection && (
                <div className="relative z-[1] flex items-center justify-center gap-2 pb-4 pt-2">
                  <span className="text-lg">{theme.emoji}</span>
                  <span
                    className="text-xs font-black uppercase tracking-[0.15em]"
                    style={{ color: theme.accent }}
                  >
                    {units[unitIdx].name}
                  </span>
                </div>
              )}

              {/* Dashed connector line */}
              {idx > 0 && (
                <svg
                  className="absolute -top-10 left-0 w-full overflow-visible"
                  height="50"
                  style={{ zIndex: 1 }}
                >
                  <line
                    x1={`${positions[(idx - 1) % positions.length] * 100}%`}
                    y1="0"
                    x2={`${xPct * 100}%`}
                    y2="50"
                    stroke={
                      sections[idx - 1]?.node.status === "completed"
                        ? "#58cc02"
                        : "#e5e7eb"
                    }
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray="8 8"
                  />
                </svg>
              )}

              {/* Node */}
              <div
                className="absolute flex flex-col items-center"
                style={{
                  left: `${xPct * 100}%`,
                  transform: "translateX(-50%)",
                  top: isFirstInSection ? 40 : 4,
                  zIndex: 2,
                }}
              >
                {/* Chibi with speech bubble */}
                {showChibi && (
                  <motion.div
                    className="absolute -left-20 -top-6 flex flex-col items-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                  >
                    {/* Speech bubble */}
                    <div className="relative bg-white rounded-xl px-2 py-1 shadow-md border border-gray-100 mb-1">
                      <span className="text-[10px] font-bold text-slate-600">Let&apos;s go!</span>
                      <div className="absolute -bottom-1 right-3 w-2 h-2 bg-white border-r border-b border-gray-100 rotate-45" />
                    </div>
                    <ChibiSprite type={4} size={44} state="happy" />
                  </motion.div>
                )}

                <ChunkyNode node={node} onClick={() => onNodeTap(node)} accent={theme.accent} />

                {/* Label */}
                <p
                  className={`text-[11px] font-bold text-center max-w-[100px] leading-tight ${
                    node.status === "current"
                      ? "text-slate-800"
                      : node.status === "completed"
                      ? "text-green-700"
                      : "text-gray-400"
                  }`}
                  style={{ marginTop: node.status === "current" ? 56 : 12 }}
                >
                  {node.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
