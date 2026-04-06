"use client";

import { motion } from "framer-motion";
import { Lock, CheckCircle, Star } from "lucide-react";
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
  const gradId = `grad-node-${node.id}`;
  const currGradId = `grad-curr-${node.id}`;

  return (
    <motion.button
      whileTap={{ scale: 0.93 }}
      whileHover={node.status !== "locked" ? { scale: 1.05 } : {}}
      onClick={onClick}
      className="relative flex-shrink-0"
      style={{
        width: size,
        height: size,
        filter:
          node.status === "completed"
            ? "drop-shadow(0 0 6px rgba(139,92,246,0.5))"
            : node.status === "current"
            ? "drop-shadow(0 0 10px rgba(251,146,60,0.7))"
            : "none",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id={currGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>

        {/* Locked: empty slate ring */}
        {node.status === "locked" && (
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth="3" />
        )}

        {/* Completed: full violet→pink ring */}
        {node.status === "completed" && (
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={`url(#${gradId})`} strokeWidth="3" />
        )}

        {/* Current: partial amber ring, animated */}
        {node.status === "current" && (
          <>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#ede9fe" strokeWidth="3" />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={`url(#${currGradId})`}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${circumference * 0.5} ${circumference * 0.5}`}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              animate={{ rotate: ["-90deg", "270deg"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ originX: "50%", originY: "50%" }}
            />
          </>
        )}
      </svg>

      {/* Inner fill */}
      <div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          inset: 6,
          background:
            node.status === "locked"
              ? "#f1f5f9"
              : node.status === "completed"
              ? "linear-gradient(135deg,#8b5cf6,#ec4899)"
              : "linear-gradient(135deg,#f59e0b,#f97316)",
        }}
      >
        {node.status === "locked" && (
          <Lock className="text-slate-400" style={{ width: size * 0.28, height: size * 0.28 }} />
        )}
        {node.status === "completed" && (
          <CheckCircle className="text-white" style={{ width: size * 0.32, height: size * 0.32 }} />
        )}
        {node.status === "current" && (
          <Star className="text-white fill-white" style={{ width: size * 0.3, height: size * 0.3 }} />
        )}
      </div>

      {/* START badge on current node */}
      {node.status === "current" && (
        <motion.div
          className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full text-white text-[9px] font-bold tracking-wide shadow-md whitespace-nowrap"
          style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)" }}
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
    <div
      className="pb-10 min-h-screen"
      style={{ background: "#0f0a1e" }}
    >
      {/* Sticky tab header */}
      <div
        className="sticky top-0 z-10 pt-2 pb-3 border-b border-violet-100 mb-2"
        style={{ background: "rgba(15,10,30,0.95)", backdropFilter: "blur(12px)" }}
      >
        <div className="flex gap-1 p-1 bg-violet-50 rounded-xl">
          {(["enneagram", "jungian"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab ? "text-white shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
              style={
                activeTab === tab
                  ? { background: "linear-gradient(135deg,#8b5cf6,#ec4899)" }
                  : {}
              }
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
          const isAllLocked = nodes.every((n) => n.status === "locked");
          const completedCount = nodes.filter((n) => n.status === "completed").length;
          const isFullyDone = completedCount === nodes.length;
          const pct = Math.round((completedCount / Math.max(nodes.length, 1)) * 100);

          return (
            <div key={unit.id} className="px-2">
              {/* Unit header */}
              <div
                className="relative flex items-center justify-between px-5 py-3 rounded-2xl mb-6 overflow-hidden"
                style={
                  isAllLocked
                    ? { background: "#cbd5e1", opacity: 0.6 }
                    : isFullyDone
                    ? {
                        background: "linear-gradient(135deg,#10b981,#6366f1)",
                        boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
                      }
                    : {
                        background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                        boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
                      }
                }
              >
                <div className="relative">
                  <p
                    className={`text-[10px] font-bold uppercase tracking-widest ${
                      isAllLocked ? "text-slate-500" : "text-white/70"
                    }`}
                  >
                    Unit {unitIdx + 1}
                  </p>
                  <p
                    className={`text-base font-bold ${isAllLocked ? "text-slate-500" : "text-white"}`}
                  >
                    {unit.name}
                  </p>
                </div>
                <div className="relative flex items-center gap-2">
                  {isAllLocked ? (
                    <Lock className="w-5 h-5 text-slate-400" />
                  ) : isFullyDone ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <>
                      <div
                        className="w-16 h-2 rounded-full"
                        style={{ background: "rgba(255,255,255,0.3)" }}
                      >
                        <div
                          className="h-2 rounded-full bg-white transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-white">{pct}%</span>
                    </>
                  )}
                </div>
              </div>

              {/* S-curve nodes */}
              <div className="relative">
                {nodes.map((node, nodeIdx) => {
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
                                ? "linear-gradient(to bottom,#8b5cf6,#ec4899)"
                                : "#e2e8f0",
                            opacity: node.status === "completed" ? 0.5 : 1,
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
                          <div
                            className="text-center max-w-[80px]"
                            style={{ textAlign: nodeIdx % 2 === 2 ? "right" : "left" }}
                          >
                            <p
                              className={`text-[11px] font-semibold leading-tight ${
                                node.status === "current"
                                  ? "text-orange-500 font-bold"
                                  : "text-slate-700"
                              }`}
                            >
                              {node.label}
                            </p>
                            <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                              {node.sublabel}
                            </p>
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
