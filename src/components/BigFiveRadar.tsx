"use client";

import { motion } from "framer-motion";
import type { BigFiveScores } from "@/lib/personality-scorer";

interface Props {
  scores: BigFiveScores;
  size?: number;
}

// ─── Big Five Radar Chart ────────────────────────────────────────────────
// Pure SVG, no external dependencies. Renders a pentagon radar with the
// user's Big Five scores (0-100) plotted as a filled polygon.

const TRAITS: { key: keyof BigFiveScores; label: string; shortLabel: string }[] = [
  { key: "O", label: "Openness",          shortLabel: "Open"   },
  { key: "C", label: "Conscientiousness", shortLabel: "Consc"  },
  { key: "E", label: "Extraversion",      shortLabel: "Extra"  },
  { key: "A", label: "Agreeableness",     shortLabel: "Agree"  },
  { key: "N", label: "Emotional",         shortLabel: "Emote"  },
];

export default function BigFiveRadar({ scores, size = 320 }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.38;
  const labelRadius = maxRadius + 26;

  // Compute pentagon vertex angles (starting at top, going clockwise)
  const angles = TRAITS.map((_, i) => (Math.PI * 2 * i) / TRAITS.length - Math.PI / 2);

  // Background grid rings (20%, 40%, 60%, 80%, 100%)
  const rings = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Compute data points for user's scores
  const dataPoints = TRAITS.map((t, i) => {
    const r = (scores[t.key] / 100) * maxRadius;
    return {
      x: cx + r * Math.cos(angles[i]),
      y: cy + r * Math.sin(angles[i]),
      score: scores[t.key],
    };
  });

  const polygonPath = dataPoints.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ") + " Z";

  // Gradient id (unique for multiple charts on one page)
  const gradId = `bigfive-grad-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#d946ef" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Background rings */}
      {rings.map((r, i) => {
        const points = TRAITS.map((_, ti) => {
          const rad = r * maxRadius;
          const x = cx + rad * Math.cos(angles[ti]);
          const y = cy + rad * Math.sin(angles[ti]);
          return `${x},${y}`;
        }).join(" ");
        return (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={1}
          />
        );
      })}

      {/* Axis lines */}
      {TRAITS.map((_, i) => {
        const x = cx + maxRadius * Math.cos(angles[i]);
        const y = cy + maxRadius * Math.sin(angles[i]);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={1}
          />
        );
      })}

      {/* User's data polygon */}
      <motion.path
        d={polygonPath}
        fill={`url(#${gradId})`}
        stroke="rgba(139,92,246,0.85)"
        strokeWidth={2}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* Data point dots */}
      {dataPoints.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={4}
          fill="#a78bfa"
          stroke="#fff"
          strokeWidth={1.5}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.08, duration: 0.35 }}
        />
      ))}

      {/* Trait labels */}
      {TRAITS.map((t, i) => {
        const x = cx + labelRadius * Math.cos(angles[i]);
        const y = cy + labelRadius * Math.sin(angles[i]);
        return (
          <g key={t.key}>
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(255,255,255,0.75)"
              fontSize={11}
              fontWeight="700"
              style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
            >
              {t.shortLabel}
            </text>
            <text
              x={x}
              y={y + 13}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(167,139,250,0.9)"
              fontSize={13}
              fontWeight="800"
            >
              {scores[t.key]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
