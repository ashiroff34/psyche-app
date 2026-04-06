"use client";

import React, { useState, useEffect, useRef } from "react";
import { enneagramTypes } from "@/data/enneagram";

interface EnneagramCircleProps {
  selectedType?: number;
  onTypeSelect?: (type: number) => void;
  size?: number;
  showLabels?: boolean;
  interactive?: boolean;
}

// Traditional Enneagram angles (degrees from top, clockwise)
const TYPE_ANGLES: Record<number, number> = {
  9: 0,
  1: 40,
  2: 80,
  3: 120,
  4: 160,
  5: 200,
  6: 240,
  7: 280,
  8: 320,
};

// Inner triangle connections: 9→3→6→9
const TRIANGLE_CONNECTIONS: [number, number][] = [
  [9, 3],
  [3, 6],
  [6, 9],
];

// Hexad connections: 1→4→2→8→5→7→1
const HEXAD_CONNECTIONS: [number, number][] = [
  [1, 4],
  [4, 2],
  [2, 8],
  [8, 5],
  [5, 7],
  [7, 1],
];

// Integration lines (growth)
const INTEGRATION_LINES: Record<number, number> = {
  1: 7,
  2: 4,
  3: 6,
  4: 1,
  5: 8,
  6: 9,
  7: 5,
  8: 2,
  9: 3,
};

// Disintegration lines (stress)
const DISINTEGRATION_LINES: Record<number, number> = {
  1: 4,
  2: 8,
  3: 9,
  4: 2,
  5: 7,
  6: 3,
  7: 1,
  8: 5,
  9: 6,
};

function degToRad(deg: number): number {
  // 0° = top, going clockwise → subtract 90 to align
  return ((deg - 90) * Math.PI) / 180;
}

function getPoint(
  angleDeg: number,
  radius: number,
  cx: number,
  cy: number
): { x: number; y: number } {
  const rad = degToRad(angleDeg);
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

function hexToRgba(hex: string, alpha: number): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return `rgba(255,255,255,${alpha})`;
  return `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)},${alpha})`;
}

// Build an arrow path from one point toward another, stopping short of the target node
function arrowPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  stopShort: number
): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist === 0) return "";
  const ratio = (dist - stopShort - 4) / dist;
  const ex = from.x + dx * ratio;
  const ey = from.y + dy * ratio;
  return `M ${from.x} ${from.y} L ${ex} ${ey}`;
}

export default function EnneagramCircle({
  selectedType,
  onTypeSelect,
  size = 320,
  showLabels = true,
  interactive = true,
}: EnneagramCircleProps) {
  const [hoveredType, setHoveredType] = useState<number | null>(null);
  const [visibleNodes, setVisibleNodes] = useState<Set<number>>(new Set());
  const [linesDrawn, setLinesDrawn] = useState(false);
  const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cx = size / 2;
  const cy = size / 2;
  const circleRadius = size * 0.40625; // 130 / 320
  const labelGap = size * 0.075;

  // Node sizes (scaled to size)
  const scale = size / 320;
  const NODE_R_DEFAULT = 18 * scale;
  const NODE_R_HOVERED = 20 * scale;
  const NODE_R_SELECTED = 22 * scale;

  useEffect(() => {
    const ORDER = [9, 1, 2, 3, 4, 5, 6, 7, 8];
    ORDER.forEach((typeNum, i) => {
      setTimeout(() => {
        setVisibleNodes((prev) => new Set([...prev, typeNum]));
      }, 150 + i * 80);
    });
    setTimeout(() => setLinesDrawn(true), 250);
  }, []);

  const activeType = hoveredType ?? selectedType ?? null;

  function getNodeRadius(typeNum: number): number {
    if (typeNum === selectedType) return NODE_R_SELECTED;
    if (typeNum === hoveredType) return NODE_R_HOVERED;
    return NODE_R_DEFAULT;
  }

  function getNodeColor(typeNum: number): string {
    const type = enneagramTypes.find((t) => t.number === typeNum);
    if (!type) return "#888";
    const alpha =
      typeNum === selectedType || typeNum === hoveredType ? 1 : 0.8;
    return hexToRgba(type.color, alpha);
  }

  function getInnerLineOpacity(a: number, b: number): number {
    if (activeType === null) return 1;
    return a === activeType || b === activeType ? 0.6 : 0.1;
  }

  const integrationTo =
    activeType !== null ? INTEGRATION_LINES[activeType] : null;
  const disintegrationTo =
    activeType !== null ? DISINTEGRATION_LINES[activeType] : null;

  // For stroke-dasharray line draw animation
  const maxLineLen = circleRadius * 4;

  function lineDrawStyle(drawn: boolean): React.CSSProperties {
    return {
      strokeDasharray: maxLineLen,
      strokeDashoffset: drawn ? 0 : maxLineLen,
      transition: drawn ? "stroke-dashoffset 1.1s ease-out" : "none",
    };
  }

  const tooltipTypeData =
    hoveredType !== null
      ? enneagramTypes.find((t) => t.number === hoveredType)
      : null;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <style>{`
        @keyframes enneagram-dash-forward {
          to { stroke-dashoffset: -24; }
        }
        @keyframes enneagram-dash-reverse {
          to { stroke-dashoffset: 24; }
        }
        .enneagram-integration-arrow {
          animation: enneagram-dash-forward 0.55s linear infinite;
        }
        .enneagram-disintegration-arrow {
          animation: enneagram-dash-reverse 0.55s linear infinite;
        }
      `}</style>

      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        aria-label="Interactive Enneagram Circle"
        role="img"
      >
        <defs>
          <marker
            id="ec-arrow-green"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill="rgba(52,211,153,0.9)" />
          </marker>
          <marker
            id="ec-arrow-red"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill="rgba(248,113,113,0.9)" />
          </marker>
          {enneagramTypes.map((t) => (
            <filter
              key={`ecglow-${t.number}`}
              id={`ec-glow-${t.number}`}
              x="-60%"
              y="-60%"
              width="220%"
              height="220%"
            >
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
        </defs>

        {/* Outer circle */}
        <circle
          cx={cx}
          cy={cy}
          r={circleRadius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={1.5}
        />

        {/* Triangle lines (9-3-6) */}
        {TRIANGLE_CONNECTIONS.map(([a, b]) => {
          const pa = getPoint(TYPE_ANGLES[a], circleRadius, cx, cy);
          const pb = getPoint(TYPE_ANGLES[b], circleRadius, cx, cy);
          return (
            <line
              key={`tri-${a}-${b}`}
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              stroke="rgba(139,92,246,0.3)"
              strokeWidth={1.5}
              opacity={getInnerLineOpacity(a, b)}
              style={{
                ...lineDrawStyle(linesDrawn),
                transition: [
                  linesDrawn
                    ? "stroke-dashoffset 1.1s ease-out"
                    : "",
                  "opacity 0.3s ease",
                ]
                  .filter(Boolean)
                  .join(", "),
              }}
            />
          );
        })}

        {/* Hexad lines (1-4-2-8-5-7) */}
        {HEXAD_CONNECTIONS.map(([a, b]) => {
          const pa = getPoint(TYPE_ANGLES[a], circleRadius, cx, cy);
          const pb = getPoint(TYPE_ANGLES[b], circleRadius, cx, cy);
          return (
            <line
              key={`hex-${a}-${b}`}
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              stroke="rgba(99,102,241,0.25)"
              strokeWidth={1.5}
              opacity={getInnerLineOpacity(a, b)}
              style={{
                ...lineDrawStyle(linesDrawn),
                transition: [
                  linesDrawn
                    ? "stroke-dashoffset 1.1s ease-out"
                    : "",
                  "opacity 0.3s ease",
                ]
                  .filter(Boolean)
                  .join(", "),
              }}
            />
          );
        })}

        {/* Integration arrow (green dashed animated) */}
        {activeType !== null && integrationTo !== null && (() => {
          const from = getPoint(
            TYPE_ANGLES[activeType],
            circleRadius,
            cx,
            cy
          );
          const to = getPoint(
            TYPE_ANGLES[integrationTo],
            circleRadius,
            cx,
            cy
          );
          return (
            <path
              d={arrowPath(from, to, getNodeRadius(integrationTo))}
              fill="none"
              stroke="rgba(52,211,153,0.85)"
              strokeWidth={2}
              strokeDasharray="8 5"
              strokeLinecap="round"
              markerEnd="url(#ec-arrow-green)"
              className="enneagram-integration-arrow"
            />
          );
        })()}

        {/* Disintegration arrow (red dashed animated) */}
        {activeType !== null && disintegrationTo !== null && (() => {
          const from = getPoint(
            TYPE_ANGLES[activeType],
            circleRadius,
            cx,
            cy
          );
          const to = getPoint(
            TYPE_ANGLES[disintegrationTo],
            circleRadius,
            cx,
            cy
          );
          return (
            <path
              d={arrowPath(from, to, getNodeRadius(disintegrationTo))}
              fill="none"
              stroke="rgba(248,113,113,0.85)"
              strokeWidth={2}
              strokeDasharray="8 5"
              strokeLinecap="round"
              markerEnd="url(#ec-arrow-red)"
              className="enneagram-disintegration-arrow"
            />
          );
        })()}

        {/* Type nodes */}
        {enneagramTypes.map((type) => {
          const angle = TYPE_ANGLES[type.number];
          const pos = getPoint(angle, circleRadius, cx, cy);
          const r = getNodeRadius(type.number);
          const isSelected = type.number === selectedType;
          const isHovered = type.number === hoveredType;
          const nodeOpacity = visibleNodes.has(type.number) ? 1 : 0;
          const nodeColor = getNodeColor(type.number);
          const glowColor = hexToRgba(type.color, 0.28);

          // Label positioned beyond node radially
          const labelRad = degToRad(angle);
          const labelDist = circleRadius + labelGap + r;
          const labelX = cx + labelDist * Math.cos(labelRad);
          const labelY = cy + labelDist * Math.sin(labelRad);

          return (
            <g
              key={type.number}
              onClick={() => {
                if (interactive && onTypeSelect) onTypeSelect(type.number);
              }}
              onMouseEnter={() => {
                if (!interactive) return;
                if (tooltipTimerRef.current)
                  clearTimeout(tooltipTimerRef.current);
                setHoveredType(type.number);
              }}
              onMouseLeave={() => {
                if (!interactive) return;
                tooltipTimerRef.current = setTimeout(
                  () => setHoveredType(null),
                  90
                );
              }}
              style={{
                cursor: interactive ? "pointer" : "default",
                transition: "opacity 0.38s ease",
                opacity: nodeOpacity,
              }}
            >
              {/* Selected glow ring */}
              {isSelected && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={r + 9}
                  fill="none"
                  stroke={glowColor}
                  strokeWidth={7}
                />
              )}

              {/* Node */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={r}
                fill={nodeColor}
                filter={
                  isSelected || isHovered
                    ? `url(#ec-glow-${type.number})`
                    : undefined
                }
                style={{ transition: "r 0.18s ease" }}
              />

              {/* Type number */}
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={11 * scale}
                fontWeight="700"
                fill="white"
                style={{ pointerEvents: "none", userSelect: "none" }}
              >
                {type.number}
              </text>

              {/* Type name label */}
              {showLabels && (
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={8.5 * scale}
                  fill={
                    isSelected || isHovered
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(255,255,255,0.55)"
                  }
                  style={{
                    pointerEvents: "none",
                    userSelect: "none",
                    transition: "fill 0.2s ease",
                  }}
                >
                  {type.name.replace("The ", "")}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Floating tooltip */}
      {interactive && tooltipTypeData && hoveredType !== null && (() => {
        const angle = TYPE_ANGLES[hoveredType];
        const rad = degToRad(angle);
        const nodeX = cx + circleRadius * Math.cos(rad);
        const nodeY = cy + circleRadius * Math.sin(rad);

        const isLeft = nodeX < cx;
        const tooltipW = 168;
        const tooltipH = 68;
        const gap = 28 * scale;

        let tx = isLeft ? nodeX - gap - tooltipW : nodeX + gap;
        let ty = nodeY - tooltipH / 2;

        // Clamp
        tx = Math.max(4, Math.min(size - tooltipW - 4, tx));
        ty = Math.max(4, Math.min(size - tooltipH - 4, ty));

        const intTypeNum = INTEGRATION_LINES[hoveredType];
        const disTypeNum = DISINTEGRATION_LINES[hoveredType];

        return (
          <div
            style={{
              position: "absolute",
              left: tx,
              top: ty,
              width: tooltipW,
              background: "rgba(12,10,26,0.93)",
              border: `1px solid ${hexToRgba(tooltipTypeData.color, 0.4)}`,
              borderRadius: 9,
              padding: "8px 10px",
              pointerEvents: "none",
              backdropFilter: "blur(10px)",
              zIndex: 20,
              boxShadow: `0 6px 24px ${hexToRgba(tooltipTypeData.color, 0.18)}`,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 11.5,
                color: tooltipTypeData.color,
                marginBottom: 3,
                letterSpacing: "0.01em",
              }}
            >
              {tooltipTypeData.number} — {tooltipTypeData.name}
            </div>
            <div
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.45,
                marginBottom: 5,
              }}
            >
              {tooltipTypeData.brief}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <span style={{ fontSize: 9, color: "rgba(52,211,153,0.9)" }}>
                Growth → {intTypeNum}
              </span>
              <span style={{ fontSize: 9, color: "rgba(248,113,113,0.9)" }}>
                Stress → {disTypeNum}
              </span>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
