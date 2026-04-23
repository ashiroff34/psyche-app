"use client";

/**
 * ITERATION 1: "Classic Duolingo"
 *
 * - Big solid-color circles (72px), NO gradient rings, NO SVG strokes
 * - Green = complete (with gold crown), Gold = current (pulsing glow + big START), Gray = locked
 * - Thick curved connector lines (4px)
 * - Background color bands per section
 * - Chibi sprite peeks out next to current node
 * - No unit headers at all, one continuous flow
 * - Labels below nodes, clean and minimal
 */

import { motion } from "framer-motion";
import { Lock, Crown, Star, Zap } from "lucide-react";
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
}

const SECTION_COLORS = ["#58cc02", "#ce82ff", "#00cd9c", "#ff9600", "#1cb0f6", "#ff4b4b"];

// Flatten all units into one continuous node list
function flattenNodes(units: PathUnit[]): (PathNodeConfig & { sectionColor: string })[] {
  return units.flatMap((unit, i) =>
    unit.nodes.map((n) => ({ ...n, sectionColor: SECTION_COLORS[i % SECTION_COLORS.length] }))
  );
}

function DuoNode({
  node,
  onClick,
  sectionColor,
}: {
  node: PathNodeConfig;
  onClick: () => void;
  sectionColor: string;
}) {
  const size = 72;

  const bgColor =
    node.status === "completed"
      ? "#58cc02"
      : node.status === "current"
      ? "#ffc800"
      : "#e5e5e5";

  const borderColor =
    node.status === "completed"
      ? "#46a302"
      : node.status === "current"
      ? "#e5b000"
      : "#d4d4d4";

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className="relative"
        style={{ width: size, height: size }}
      >
        {/* Outer shadow/border ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: borderColor,
            transform: "translateY(4px)",
          }}
        />

        {/* Main circle */}
        <motion.div
          className="absolute inset-0 rounded-full flex items-center justify-center"
          style={{ background: bgColor }}
          animate={
            node.status === "current"
              ? { boxShadow: ["0 0 0 0px rgba(255,200,0,0.4)", "0 0 0 12px rgba(255,200,0,0)", "0 0 0 0px rgba(255,200,0,0.4)"] }
              : {}
          }
          transition={node.status === "current" ? { duration: 2, repeat: Infinity } : {}}
        >
          {node.status === "locked" && (
            <Lock className="text-gray-400" style={{ width: 28, height: 28 }} />
          )}
          {node.status === "completed" && (
            <Crown className="text-yellow-300" style={{ width: 30, height: 30 }} />
          )}
          {node.status === "current" && (
            <Star className="text-white fill-white" style={{ width: 30, height: 30 }} />
          )}
        </motion.div>
      </motion.button>

      {/* Big bouncing START button below current node */}
      {node.status === "current" && (
        <motion.button
          onClick={onClick}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-6 py-2 rounded-xl font-black text-sm text-white tracking-wider shadow-lg"
          style={{ background: "#ffc800", color: "#4a3700", boxShadow: "0 4px 0 #e5b000" }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          START
        </motion.button>
      )}
    </div>
  );
}

export default function PathIteration1({ units, onNodeTap }: Props) {
  const allNodes = flattenNodes(units);

  // Find index of current node for chibi placement
  const currentIdx = allNodes.findIndex((n) => n.status === "current");

  return (
    <div className="pb-20 min-h-screen overflow-hidden" style={{ background: "#0f0a1e" }}>
      {/* Nodes */}
      <div className="relative pt-8 px-6">
        {allNodes.map((node, idx) => {
          // S-curve positioning: left → center → right → center → repeat
          const positions = [0.2, 0.5, 0.8, 0.5];
          const xPct = positions[idx % positions.length];

          // Section background band
          const unitIdx = units.findIndex((u) => u.nodes.some((n) => n.id === node.id));
          const sectionBg = SECTION_COLORS[unitIdx % SECTION_COLORS.length];

          const showChibi = idx === currentIdx;

          return (
            <div key={node.id} className="relative" style={{ height: node.status === "current" ? 160 : 120 }}>
              {/* Section background band */}
              {idx === 0 || allNodes[idx - 1]?.sectionColor !== node.sectionColor ? (
                <div
                  className="absolute -left-6 -right-6 -top-4 bottom-0 opacity-[0.06] rounded-3xl"
                  style={{ background: sectionBg }}
                />
              ) : null}

              {/* Connector line */}
              {idx > 0 && (
                <svg
                  className="absolute"
                  style={{
                    top: -50,
                    left: 0,
                    width: "100%",
                    height: 70,
                    overflow: "visible",
                  }}
                >
                  <line
                    x1={`${positions[(idx - 1) % positions.length] * 100}%`}
                    y1="10"
                    x2={`${xPct * 100}%`}
                    y2="60"
                    stroke={allNodes[idx - 1].status === "completed" ? "#58cc02" : "#e5e5e5"}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              )}

              {/* Node positioned along S-curve */}
              <div
                className="absolute flex flex-col items-center"
                style={{
                  left: `${xPct * 100}%`,
                  transform: "translateX(-50%)",
                  top: 8,
                }}
              >
                {/* Chibi peeks next to current node */}
                {showChibi && (
                  <motion.div
                    className="absolute -right-20 -top-2"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <ChibiSprite
                      type={4}
                      instinct="sp"
                      size={48}
                      state="happy"
                    />
                  </motion.div>
                )}

                <DuoNode node={node} onClick={() => onNodeTap(node)} sectionColor={node.sectionColor} />

                {/* Label */}
                <p
                  className={`text-xs font-bold mt-2 text-center max-w-[90px] leading-tight ${
                    node.status === "current"
                      ? "text-amber-600"
                      : node.status === "completed"
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                  style={{ marginTop: node.status === "current" ? 48 : 8 }}
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
