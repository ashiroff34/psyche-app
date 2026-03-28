"use client";

/**
 * ITERATION 4: "Premium Dark + Bold Lines"
 *
 * Premium Dark aesthetic with thick, glowing connector lines:
 * - Deep purple/navy background with glowing nodes
 * - Completed = emerald with crown badge, Current = violet with pulse rings
 * - Locked = frosted dark gray
 * - THICK glowing lines (6px + glow filter) connecting nodes
 * - Completed lines glow emerald, locked lines glow faint purple
 * - Chibi sits on top of current node, pet floats alongside
 * - Section dividers with gradient lines
 * - XP indicators on completed nodes
 */

import { motion } from "framer-motion";
import { Lock, Crown, Sparkles } from "lucide-react";
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
  /** Enneagram type number (1-9) for chibi/pet display */
  enneagramType?: number;
  /** Instinctual variant for chibi display */
  instinct?: string;
  /** Pet component to render alongside the path */
  petSlot?: React.ReactNode;
}

function PremiumNode({
  node,
  onClick,
}: {
  node: PathNodeConfig;
  onClick: () => void;
}) {
  const size = 68;

  return (
    <div className="relative">
      {/* Pulse rings for current node */}
      {node.status === "current" && (
        <>
          <motion.div
            className="absolute rounded-full"
            style={{
              inset: -8,
              border: "2px solid rgba(139,92,246,0.3)",
            }}
            animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              inset: -4,
              border: "2px solid rgba(139,92,246,0.5)",
            }}
            animate={{ scale: [1, 1.2], opacity: [0.8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          />
        </>
      )}

      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={onClick}
        className="relative"
        style={{ width: size, height: size }}
      >
        {/* Bottom shadow layer (3D press effect) */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              node.status === "completed"
                ? "#0d7a3b"
                : node.status === "current"
                ? "#5b21b6"
                : "#374151",
            transform: "translateY(5px)",
          }}
        />

        {/* Main circle */}
        <div
          className="absolute inset-0 rounded-full flex items-center justify-center"
          style={{
            background:
              node.status === "completed"
                ? "linear-gradient(180deg, #34d399, #10b981)"
                : node.status === "current"
                ? "linear-gradient(180deg, #a78bfa, #8b5cf6)"
                : "linear-gradient(180deg, #6b7280, #4b5563)",
          }}
        >
          {node.status === "locked" && (
            <Lock className="text-gray-400/60" style={{ width: 26, height: 26 }} />
          )}
          {node.status === "completed" && (
            <span className="text-xl">✓</span>
          )}
          {node.status === "current" && (
            <Sparkles className="text-white" style={{ width: 28, height: 28 }} />
          )}
        </div>
      </motion.button>

      {/* Crown badge floating above completed nodes */}
      {node.status === "completed" && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Crown className="w-5 h-5 text-yellow-400 fill-yellow-400 drop-shadow-md" />
        </div>
      )}

      {/* XP indicator on completed */}
      {node.status === "completed" && (
        <div className="absolute -right-2 -bottom-1 px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[8px] font-bold shadow-sm">
          +{node.xp}
        </div>
      )}

      {/* START pill below current */}
      {node.status === "current" && (
        <motion.button
          onClick={onClick}
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-8 py-2.5 rounded-2xl font-black text-sm text-white tracking-wide whitespace-nowrap"
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
            boxShadow: "0 4px 0 #6d28d9, 0 6px 20px rgba(139,92,246,0.4)",
          }}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          START
        </motion.button>
      )}
    </div>
  );
}

export default function PathIteration4({ units, onNodeTap, enneagramType, instinct, petSlot }: Props) {
  const allNodes = units.flatMap((u) => u.nodes);
  const currentIdx = allNodes.findIndex((n) => n.status === "current");

  const positions = [0.25, 0.5, 0.75, 0.5];

  return (
    <div
      className="pb-20 min-h-screen"
      style={{ background: "linear-gradient(180deg, #0f0a1e 0%, #1a1035 50%, #0f172a 100%)" }}
    >

      {/* SVG glow filter definitions */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="glow-emerald" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>

      {/* Section dividers */}
      <div className="relative pt-10 px-6">
        {allNodes.map((node, idx) => {
          const xPct = positions[idx % positions.length];
          const unitIdx = units.findIndex((u) => u.nodes.some((n) => n.id === node.id));
          const isFirstInUnit =
            idx === 0 || !units[unitIdx]?.nodes.some((n) => n.id === allNodes[idx - 1]?.id);

          const showChibi = idx === currentIdx;
          const rowHeight = node.status === "current" ? 210 : 120;

          // Previous node position for connector
          const prevXPct = idx > 0 ? positions[(idx - 1) % positions.length] : 0;
          const isCompletedLine = idx > 0 && allNodes[idx - 1]?.status === "completed";

          return (
            <div key={node.id} className="relative" style={{ height: rowHeight }}>
              {/* Section label for first node in unit */}
              {isFirstInUnit && (
                <div className="flex items-center gap-3 mb-4 -mt-2">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400/60">
                    {units[unitIdx]?.name}
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
                </div>
              )}

              {/* THICK glowing connector lines */}
              {idx > 0 && (
                <svg
                  className="absolute -top-12 left-0 w-full overflow-visible"
                  height="60"
                  style={{ zIndex: 0 }}
                >
                  {/* Glow layer (wide, blurred) */}
                  <line
                    x1={`${prevXPct * 100}%`}
                    y1="0"
                    x2={`${xPct * 100}%`}
                    y2="60"
                    stroke={
                      isCompletedLine
                        ? "rgba(52,211,153,0.35)"
                        : "rgba(139,92,246,0.15)"
                    }
                    strokeWidth="16"
                    strokeLinecap="round"
                    filter={isCompletedLine ? "url(#glow-emerald)" : "url(#glow-purple)"}
                  />
                  {/* Main thick line */}
                  <line
                    x1={`${prevXPct * 100}%`}
                    y1="0"
                    x2={`${xPct * 100}%`}
                    y2="60"
                    stroke={
                      isCompletedLine
                        ? "#34d399"
                        : "rgba(139,92,246,0.3)"
                    }
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  {/* Bright center highlight */}
                  <line
                    x1={`${prevXPct * 100}%`}
                    y1="0"
                    x2={`${xPct * 100}%`}
                    y2="60"
                    stroke={
                      isCompletedLine
                        ? "rgba(110,231,183,0.7)"
                        : "rgba(167,139,250,0.15)"
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}

              {/* Node positioned along curve */}
              <div
                className="absolute flex flex-col items-center"
                style={{
                  left: `${xPct * 100}%`,
                  transform: "translateX(-50%)",
                  top: isFirstInUnit ? 32 : 8,
                  zIndex: 1,
                }}
              >
                {/* Chibi sits on current node */}
                {showChibi && (
                  <motion.div
                    className="absolute -top-24 z-10"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: [0, -5, 0], opacity: 1 }}
                    transition={{ y: { duration: 2, repeat: Infinity }, opacity: { duration: 0.5 } }}
                  >
                    <ChibiSprite type={enneagramType ?? 4} instinct={instinct ?? "sp"} size={96} state="happy" />
                  </motion.div>
                )}
                {/* Pet companion floats next to chibi */}
                {showChibi && petSlot && (
                  <motion.div
                    className="absolute -top-14 z-10"
                    style={{ left: 56 }}
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ y: [0, -3, 0], opacity: 1 }}
                    transition={{ y: { duration: 2.5, repeat: Infinity, delay: 0.5 }, opacity: { duration: 0.6 } }}
                  >
                    {petSlot}
                  </motion.div>
                )}

                <PremiumNode node={node} onClick={() => onNodeTap(node)} />

                {/* Label */}
                <p
                  className={`text-[11px] font-semibold mt-2 text-center max-w-[100px] leading-tight ${
                    node.status === "current"
                      ? "text-violet-300"
                      : node.status === "completed"
                      ? "text-emerald-400/70"
                      : "text-slate-600"
                  }`}
                  style={{ marginTop: node.status === "current" ? 52 : 8 }}
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
