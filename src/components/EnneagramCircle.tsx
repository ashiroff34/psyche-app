"use client";

import { useState } from "react";
import { enneagramTypes } from "@/data/enneagram";

const SIZE = 360;
const CENTER = SIZE / 2;
const RADIUS = 140;
const NODE_R = 24;

// Positions for 9 points on the circle (starting from top, going clockwise)
function getPosition(index: number) {
  const angle = ((index - 1) * 40 - 90) * (Math.PI / 180);
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

// Integration lines (growth arrows)
const integrationLines = [
  [1, 7], [7, 5], [5, 8], [8, 2], [2, 4], [4, 1],
  [3, 6], [6, 9], [9, 3],
];

export default function EnneagramCircle({
  selected,
  onSelect,
  size = SIZE,
}: {
  selected?: number | null;
  onSelect?: (type: number) => void;
  size?: number;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const scale = size / SIZE;

  const active = hovered || selected;
  const activeType = active ? enneagramTypes.find((t) => t.number === active) : null;

  // Find integration/disintegration for active type
  const activeIntegration = activeType?.integrationLine;
  const activeDisintegration = activeType?.disintegrationLine;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width={size}
        height={size}
        className="drop-shadow-lg"
      >
        {/* Background circle */}
        <circle cx={CENTER} cy={CENTER} r={RADIUS + 30} fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="#e2e8f0" strokeWidth="1" opacity="0.3" />

        {/* Integration/disintegration lines */}
        {integrationLines.map(([from, to]) => {
          const p1 = getPosition(from);
          const p2 = getPosition(to);
          const isActiveGrowth = active === from && activeIntegration === to;
          const isActiveStress = active === from && activeDisintegration === to;
          const isRelevant = active === from || active === to;

          return (
            <line
              key={`${from}-${to}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke={
                isActiveGrowth ? "#10b981" :
                isActiveStress ? "#f43f5e" :
                isRelevant ? "#94a3b8" :
                "#e2e8f0"
              }
              strokeWidth={isActiveGrowth || isActiveStress ? 2.5 : 1}
              strokeDasharray={isActiveStress ? "6 4" : "none"}
              opacity={active ? (isRelevant ? 1 : 0.2) : 0.4}
              style={{ transition: "all 0.3s ease" }}
            />
          );
        })}

        {/* Type nodes */}
        {enneagramTypes.map((type) => {
          const pos = getPosition(type.number);
          const isSelected = selected === type.number;
          const isHovered = hovered === type.number;
          const isActive = isSelected || isHovered;
          const isGrowthTarget = active && activeIntegration === type.number;
          const isStressTarget = active && activeDisintegration === type.number;

          return (
            <g
              key={type.number}
              onClick={() => onSelect?.(type.number)}
              onMouseEnter={() => setHovered(type.number)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer", transition: "all 0.3s ease" }}
            >
              {/* Glow ring */}
              {isActive && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={NODE_R + 6}
                  fill="none"
                  stroke={type.color}
                  strokeWidth="2"
                  opacity="0.3"
                />
              )}
              {isGrowthTarget && (
                <circle cx={pos.x} cy={pos.y} r={NODE_R + 5} fill="none" stroke="#10b981" strokeWidth="2" opacity="0.5" />
              )}
              {isStressTarget && (
                <circle cx={pos.x} cy={pos.y} r={NODE_R + 5} fill="none" stroke="#f43f5e" strokeWidth="2" opacity="0.5" strokeDasharray="4 3" />
              )}

              {/* Main circle */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isActive ? NODE_R + 2 : NODE_R}
                fill={isActive ? type.color : "white"}
                stroke={type.color}
                strokeWidth={isActive ? 0 : 2}
                style={{ transition: "all 0.2s ease" }}
              />

              {/* Number */}
              <text
                x={pos.x}
                y={pos.y + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="14"
                fontWeight="700"
                fontFamily="Playfair Display, serif"
                fill={isActive ? "white" : type.color}
                style={{ transition: "all 0.2s ease" }}
              >
                {type.number}
              </text>

              {/* Name label */}
              <text
                x={pos.x}
                y={pos.y + NODE_R + 14}
                textAnchor="middle"
                fontSize="9"
                fontWeight="500"
                fontFamily="Inter, sans-serif"
                fill={isActive ? type.color : "#94a3b8"}
                style={{ transition: "all 0.2s ease" }}
              >
                {type.name.split("The ")[1]}
              </text>
            </g>
          );
        })}

        {/* Center info */}
        {activeType && (
          <g>
            <text x={CENTER} y={CENTER - 8} textAnchor="middle" fontSize="11" fontWeight="600" fontFamily="Inter, sans-serif" fill="#334155">
              {activeType.icon} Type {activeType.number}
            </text>
            <text x={CENTER} y={CENTER + 8} textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif" fill="#94a3b8">
              {activeType.name}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
