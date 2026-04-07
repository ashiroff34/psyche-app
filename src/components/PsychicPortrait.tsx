"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Share2, Download } from "lucide-react";

// ─── Type color palette ───────────────────────────────────────────────────────

const TYPE_COLOR: Record<number, string> = {
  1: "#94a3b8",
  2: "#f9a8d4",
  3: "#fbbf24",
  4: "#a78bfa",
  5: "#93c5fd",
  6: "#6ee7b7",
  7: "#34d399",
  8: "#f87171",
  9: "#cbd5e1",
};

const TYPE_NAMES: Record<number, string> = {
  1: "The Reformer",
  2: "The Helper",
  3: "The Achiever",
  4: "The Individualist",
  5: "The Observer",
  6: "The Loyalist",
  7: "The Enthusiast",
  8: "The Challenger",
  9: "The Peacemaker",
};

// Cognitive type → orbital angle offset (degrees, spread around the Enneagram)
const COGNITIVE_ANGLE: Record<string, number> = {
  INTJ: 0,  INTP: 40,  ENTJ: 80,  ENTP: 120,
  INFJ: 160, INFP: 200, ENFJ: 240, ENFP: 280,
  ISTJ: 20, ISFJ: 60,  ESTJ: 100, ESFJ: 140,
  ISTP: 180, ISFP: 220, ESTP: 260, ESFP: 300,
};

// Instinct → orbital ring radius multiplier
const INSTINCT_RADIUS: Record<string, number> = {
  "sp/sx": 1.0, "sp/so": 1.05, "sx/sp": 1.0,
  "sx/so": 1.05, "so/sp": 1.05, "so/sx": 1.0,
};

// ─── Geometry helpers ─────────────────────────────────────────────────────────

function polar(cx: number, cy: number, r: number, angleDeg: number): [number, number] {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

// Enneagram type → position on the 9-point circle
function typeAngle(t: number): number {
  return ((t - 1) / 9) * 360;
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  enneagramType?: number;
  enneagramWing?: string;       // e.g. "5w4" or just "4"
  tritype?: [number, number, number] | null;
  cognitiveType?: string;       // MBTI code e.g. "INTJ"
  instinctualStacking?: string; // e.g. "sp/sx"
  completedLessons?: number;    // 0-100, how many lessons done
  displayName?: string;
}

export default function PsychicPortrait({
  enneagramType,
  enneagramWing,
  tritype,
  cognitiveType,
  instinctualStacking,
  completedLessons = 0,
  displayName,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [copied, setCopied] = useState(false);

  const CX = 160;
  const CY = 160;
  const R_CORE = 52;       // core type orbit radius
  const R_INSTINCT = 80;   // instinct ring radius
  const R_COGNITIVE = 108; // cognitive constellation orbit

  const coreType = enneagramType ?? 0;
  const coreColor = TYPE_COLOR[coreType] ?? "#8b5cf6";
  const progress = Math.min(1, completedLessons / 100);

  // Wing number
  const wingNum = (() => {
    if (!enneagramWing) return null;
    const match = enneagramWing.match(/\d+w(\d+)/);
    if (match) return parseInt(match[1]);
    const plain = parseInt(enneagramWing);
    return isNaN(plain) ? null : plain;
  })();

  // Cognitive type position
  const cogAngle = cognitiveType ? (COGNITIVE_ANGLE[cognitiveType] ?? 0) : null;
  const instRadius = instinctualStacking
    ? R_INSTINCT * (INSTINCT_RADIUS[instinctualStacking] ?? 1)
    : R_INSTINCT;

  // Glow intensity based on progress
  const glowOpacity = 0.3 + progress * 0.5;

  // Share string
  const shareStr = [
    coreType ? `Type ${coreType}` : null,
    wingNum ? `w${wingNum}` : null,
    tritype ? tritype.join("-") : null,
    cognitiveType ?? null,
    instinctualStacking ?? null,
  ].filter(Boolean).join(" · ");

  function handleCopyShare() {
    const text = `My Type Map: ${shareStr} — via Thyself`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }

  if (!coreType) return null;

  const [cx0, cy0] = polar(CX, CY, R_CORE, typeAngle(coreType));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      {/* Label */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
            Type Constellation
          </p>
          <p className="text-lg font-serif font-bold" style={{ color: "rgba(255,255,255,0.88)" }}>
            {displayName ? `${displayName}'s Profile` : "Your Type Map"}
          </p>
        </div>
        <button
          onClick={handleCopyShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: copied ? "#6ee7b7" : "rgba(255,255,255,0.5)",
          }}
        >
          <Share2 className="w-3.5 h-3.5" />
          {copied ? "Copied!" : "Share"}
        </button>
      </div>

      {/* Card */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(139,92,246,0.12) 0%, rgba(15,10,30,0.98) 70%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: `0 0 60px ${coreColor}20`,
        }}
      >
        {/* SVG constellation */}
        <div className="flex justify-center pt-4 pb-2">
          <svg
            ref={svgRef}
            width={320}
            height={320}
            viewBox="0 0 320 320"
            style={{ overflow: "visible" }}
          >
            <defs>
              {/* Core glow */}
              <radialGradient id="pp-core-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={coreColor} stopOpacity={glowOpacity} />
                <stop offset="100%" stopColor={coreColor} stopOpacity={0} />
              </radialGradient>
              {/* Star sharp glow */}
              <filter id="pp-star-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="pp-soft-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background ambient glow at center */}
            <circle
              cx={CX} cy={CY} r={90}
              fill="url(#pp-core-glow)"
              opacity={0.6}
            />

            {/* ── Instinctual stacking ring ── */}
            {instinctualStacking && (
              <motion.circle
                cx={CX} cy={CY} r={instRadius}
                fill="none"
                stroke={coreColor}
                strokeWidth={0.5}
                strokeDasharray="3 6"
                opacity={0.25}
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              />
            )}

            {/* ── Cognitive type orbit ring ── */}
            {cognitiveType && (
              <circle
                cx={CX} cy={CY} r={R_COGNITIVE}
                fill="none"
                stroke="rgba(99,102,241,0.15)"
                strokeWidth={0.5}
              />
            )}

            {/* ── 9-point Enneagram circle (faint) ── */}
            <circle
              cx={CX} cy={CY} r={R_CORE}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={0.5}
            />

            {/* ── Wing connection line ── */}
            {wingNum && (() => {
              const [wingX, wingY] = polar(CX, CY, R_CORE, typeAngle(wingNum));
              return (
                <motion.line
                  x1={cx0} y1={cy0}
                  x2={wingX} y2={wingY}
                  stroke={coreColor}
                  strokeWidth={0.6}
                  strokeOpacity={0.3}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                />
              );
            })()}

            {/* ── Tritype triangle ── */}
            {tritype && tritype.length === 3 && (() => {
              const [t1, t2, t3] = tritype;
              const p1 = polar(CX, CY, R_CORE, typeAngle(t1));
              const p2 = polar(CX, CY, R_CORE, typeAngle(t2));
              const p3 = polar(CX, CY, R_CORE, typeAngle(t3));
              return (
                <motion.polygon
                  points={`${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]}`}
                  fill={`${coreColor}08`}
                  stroke={coreColor}
                  strokeWidth={0.5}
                  strokeOpacity={0.35}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                />
              );
            })()}

            {/* ── All 9 type dots (faint) ── */}
            {[1,2,3,4,5,6,7,8,9].map(t => {
              const [x, y] = polar(CX, CY, R_CORE, typeAngle(t));
              const isActive = t === coreType || t === wingNum || tritype?.includes(t);
              return (
                <circle
                  key={t}
                  cx={x} cy={y} r={isActive ? 0 : 1.5}
                  fill="rgba(255,255,255,0.12)"
                />
              );
            })}

            {/* ── Wing star ── */}
            {wingNum && (() => {
              const [wx, wy] = polar(CX, CY, R_CORE, typeAngle(wingNum));
              const wColor = TYPE_COLOR[wingNum] ?? "#fff";
              return (
                <motion.circle
                  cx={wx} cy={wy} r={5}
                  fill={wColor}
                  opacity={0.55}
                  filter="url(#pp-star-glow)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 12 }}
                  style={{ transformOrigin: `${wx}px ${wy}px` }}
                />
              );
            })()}

            {/* ── Tritype stars (2nd and 3rd) ── */}
            {tritype && tritype.slice(1).map((t, i) => {
              const [tx, ty] = polar(CX, CY, R_CORE, typeAngle(t));
              const tColor = TYPE_COLOR[t] ?? "#fff";
              return (
                <motion.circle
                  key={t}
                  cx={tx} cy={ty} r={4}
                  fill={tColor}
                  opacity={0.4}
                  filter="url(#pp-star-glow)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.65 + i * 0.1, type: "spring", stiffness: 180, damping: 14 }}
                  style={{ transformOrigin: `${tx}px ${ty}px` }}
                />
              );
            })}

            {/* ── Cognitive type star ── */}
            {cogAngle !== null && (() => {
              const [cogX, cogY] = polar(CX, CY, R_COGNITIVE, cogAngle);
              return (
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 160, damping: 14 }}
                  style={{ transformOrigin: `${cogX}px ${cogY}px` }}
                >
                  {/* Orbit line from center to cognitive star */}
                  <line
                    x1={CX} y1={CY}
                    x2={cogX} y2={cogY}
                    stroke="rgba(99,102,241,0.12)"
                    strokeWidth={0.5}
                    strokeDasharray="2 5"
                  />
                  <circle
                    cx={cogX} cy={cogY} r={6}
                    fill="#6366f1"
                    opacity={0.7}
                    filter="url(#pp-star-glow)"
                  />
                  <text
                    x={cogX} y={cogY - 11}
                    textAnchor="middle"
                    fontSize="8"
                    fill="rgba(99,102,241,0.8)"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {cognitiveType}
                  </text>
                </motion.g>
              );
            })()}

            {/* ── Core type star (largest, brightest) ── */}
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 160, damping: 12 }}
              style={{ transformOrigin: `${cx0}px ${cy0}px` }}
            >
              {/* Outer glow */}
              <circle
                cx={cx0} cy={cy0} r={18}
                fill={coreColor}
                opacity={0.12}
                filter="url(#pp-soft-glow)"
              />
              {/* Progress ring */}
              <circle
                cx={cx0} cy={cy0} r={12}
                fill="none"
                stroke={coreColor}
                strokeWidth={1.5}
                strokeOpacity={0.25}
              />
              {progress > 0 && (
                <motion.circle
                  cx={cx0} cy={cy0} r={12}
                  fill="none"
                  stroke={coreColor}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 12}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 12 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 12 * (1 - progress) }}
                  transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
                  style={{ transform: "rotate(-90deg)", transformOrigin: `${cx0}px ${cy0}px` }}
                />
              )}
              {/* Star body */}
              <circle
                cx={cx0} cy={cy0} r={7}
                fill={coreColor}
                filter="url(#pp-star-glow)"
              />
              {/* Type number */}
              <text
                x={cx0} y={cy0 + 3}
                textAnchor="middle"
                fontSize="7"
                fill="#0f0a1e"
                fontWeight="bold"
                fontFamily="serif"
              >
                {coreType}
              </text>
            </motion.g>

            {/* ── Center dot ── */}
            <circle cx={CX} cy={CY} r={2} fill="rgba(255,255,255,0.15)" />

          </svg>
        </div>

        {/* Identity string */}
        <div className="px-5 pb-5 text-center">
          <p className="font-mono text-sm font-semibold tracking-wide mb-0.5" style={{ color: coreColor }}>
            {[
              coreType ? `Type ${coreType}${wingNum ? `w${wingNum}` : ""}` : null,
              tritype ? tritype.join("-") : null,
              cognitiveType ?? null,
              instinctualStacking ?? null,
            ].filter(Boolean).join(" · ")}
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            {TYPE_NAMES[coreType]}
            {progress > 0 ? ` · ${Math.round(progress * 100)}% explored` : ""}
          </p>
        </div>

        {/* Legend */}
        <div
          className="flex flex-wrap gap-3 px-5 pb-5 pt-0"
        >
          {[
            { label: "Core type", color: coreColor, size: 7 },
            wingNum ? { label: "Wing", color: TYPE_COLOR[wingNum] ?? "#fff", size: 5, opacity: 0.55 } : null,
            tritype ? { label: "Tritype", color: coreColor, size: 4, opacity: 0.4 } : null,
            cognitiveType ? { label: cognitiveType, color: "#6366f1", size: 6 } : null,
            instinctualStacking ? { label: instinctualStacking, color: coreColor, dashed: true } : null,
          ].filter(Boolean).map((item, i) => item && (
            <div key={i} className="flex items-center gap-1.5">
              {item.dashed ? (
                <svg width="14" height="6">
                  <line x1="0" y1="3" x2="14" y2="3" stroke={item.color} strokeWidth="1" strokeDasharray="2 3" opacity={0.4} />
                </svg>
              ) : (
                <div
                  className="rounded-full shrink-0"
                  style={{
                    width: (item.size ?? 6) * 2,
                    height: (item.size ?? 6) * 2,
                    background: item.color,
                    opacity: item.opacity ?? 1,
                  }}
                />
              )}
              <span className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
