"use client";

import { motion } from "framer-motion";
import { Lock, CheckCircle, Play, Star } from "lucide-react";
import type { PathNodeConfig } from "./NodeBottomSheet";

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
  activeTab: "enneagram" | "jungian";
  onTabChange: (tab: "enneagram" | "jungian") => void;
}

function GradientRingNode({
  node,
  size = 64,
  onClick,
}: {
  node: PathNodeConfig;
  size?: number;
  onClick: () => void;
}) {
  const r = size / 2 - 4;
  const circumference = 2 * Math.PI * r;

  return (
    <motion.button
      whileTap={{ scale: 0.93 }}
      whileHover={node.status !== "locked" ? { scale: 1.05 } : {}}
      onClick={onClick}
      className="relative flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
      >
        <defs>
          <linearGradient id={`grad-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={node.gradFrom} />
            <stop offset="100%" stopColor={node.gradTo} />
          </linearGradient>
        </defs>

        {node.status === "locked" && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="2.5"
          />
        )}

        {node.status === "completed" && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={`url(#grad-${node.id})`}
            strokeWidth="2.5"
            style={{
              filter: `drop-shadow(0 0 6px ${node.gradFrom}80)`,
            }}
          />
        )}

        {node.status === "current" && (
          <>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="#fde68a"
              strokeWidth="2.5"
              opacity={0.4}
            />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
              strokeDasharray={`${circumference * 0.7} ${circumference * 0.3}`}
              strokeLinecap="round"
              style={{ rotate: -90, originX: "50%", originY: "50%" }}
              animate={{ rotate: ["-90deg", "270deg"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </>
        )}
      </svg>

      {/* Node fill */}
      <div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          inset: 6,
          background:
            node.status === "locked"
              ? "#f1f5f9"
              : `linear-gradient(135deg, ${node.gradFrom}, ${node.gradTo})`,
          boxShadow:
            node.status === "locked"
              ? "none"
              : node.status === "completed"
              ? `0 2px 14px ${node.gradFrom}60`
              : `0 2px 14px #f59e0b60`,
        }}
      >
        {node.status === "locked" && <Lock className="text-slate-400" style={{ width: size * 0.28, height: size * 0.28 }} />}
        {node.status === "completed" && <CheckCircle className="text-white" style={{ width: size * 0.32, height: size * 0.32 }} />}
        {node.status === "current" && <Play className="text-white ml-[2px]" style={{ width: size * 0.3, height: size * 0.3 }} />}
      </div>

      {/* START badge on current node */}
      {node.status === "current" && (
        <motion.div
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-amber-400 text-white text-[9px] font-bold tracking-wide shadow-md whitespace-nowrap"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          START
        </motion.div>
      )}
    </motion.button>
  );
}

export default function PathView({ units, onNodeTap, activeTab, onTabChange }: Props) {
  return (
    <div className="pb-10">
      {/* Sticky tab header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm pt-2 pb-3 border-b border-slate-100 mb-2">
        <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
          {(["enneagram", "jungian"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab === "enneagram" ? "Enneagram" : "Jungian"}
            </button>
          ))}
        </div>
      </div>

      {/* Units */}
      <div className="space-y-2 pt-4">
        {units.map((unit, unitIdx) => {
          const nodes = unit.nodes;

          return (
            <div key={unit.id} className="px-2">
              {/* Unit header */}
              <div
                className="relative flex items-center justify-between px-5 py-3 rounded-2xl mb-6 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${unit.gradFrom}, ${unit.gradTo})`,
                  opacity: unit.nodes.every((n) => n.status === "locked") ? 0.5 : 1,
                }}
              >
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "radial-gradient(circle at 80% 50%, white 0%, transparent 60%)",
                  }}
                />
                <div className="relative">
                  <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">
                    Unit {unitIdx + 1}
                  </p>
                  <p className="text-base font-bold text-white">{unit.name}</p>
                </div>
                <div className="relative flex items-center gap-1">
                  {nodes.filter((n) => n.status === "completed").map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-white/80 fill-white/80" />
                  ))}
                  {nodes.filter((n) => n.status !== "completed").map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-white/30" />
                  ))}
                </div>
              </div>

              {/* S-curve nodes */}
              <div className="relative">
                {nodes.map((node, nodeIdx) => {
                  // Alternate left / center / right for S-curve effect
                  const positions = ["pl-4", "px-12", "pr-4 ml-auto", "px-12", "pl-4"];
                  const align = ["items-start", "items-center", "items-end", "items-center", "items-start"];
                  const pos = positions[nodeIdx % positions.length];
                  const aln = align[nodeIdx % align.length];

                  return (
                    <div key={node.id} className="relative">
                      {/* Connector line */}
                      {nodeIdx < nodes.length - 1 && (
                        <div
                          className="absolute left-1/2 -translate-x-px w-0.5"
                          style={{
                            top: 72,
                            height: 52,
                            background:
                              node.status === "completed"
                                ? `linear-gradient(to bottom, ${node.gradTo}, ${nodes[nodeIdx + 1].gradFrom})`
                                : "#e2e8f0",
                          }}
                        />
                      )}

                      {/* Node row */}
                      <div className={`flex flex-col ${aln} mb-16`}>
                        <div className={`flex flex-col ${aln} gap-2 ${pos}`}>
                          <GradientRingNode
                            node={node}
                            size={64}
                            onClick={() => onNodeTap(node)}
                          />
                          {/* Label below node */}
                          <div className="text-center max-w-[80px]" style={{ textAlign: nodeIdx % 2 === 2 ? "right" : "left" }}>
                            <p className="text-[11px] font-semibold text-slate-700 leading-tight">{node.label}</p>
                            <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{node.sublabel}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
