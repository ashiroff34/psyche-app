"use client";

interface RadarChartProps {
  labels: string[];
  values: number[]; // 0-100
  color?: string;
  size?: number;
  secondaryValues?: number[];
  secondaryColor?: string;
}

export default function RadarChart({
  labels,
  values,
  color = "#0ea5e9",
  size = 280,
  secondaryValues,
  secondaryColor = "#8b5cf6",
}: RadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.35;
  const n = labels.length;
  const levels = 4;

  const getPoint = (index: number, value: number) => {
    const angle = (index / n) * Math.PI * 2 - Math.PI / 2;
    const dist = (value / 100) * r;
    return { x: cx + dist * Math.cos(angle), y: cy + dist * Math.sin(angle) };
  };

  const getPolygonPoints = (vals: number[]) =>
    vals.map((v, i) => {
      const p = getPoint(i, v);
      return `${p.x},${p.y}`;
    }).join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      {/* Grid circles */}
      {Array.from({ length: levels }).map((_, i) => {
        const levelR = (r / levels) * (i + 1);
        const points = Array.from({ length: n }).map((_, j) => {
          const angle = (j / n) * Math.PI * 2 - Math.PI / 2;
          return `${cx + levelR * Math.cos(angle)},${cy + levelR * Math.sin(angle)}`;
        }).join(" ");
        return (
          <polygon key={i} points={points} fill="none" stroke="#e2e8f0" strokeWidth="1" opacity={0.6} />
        );
      })}

      {/* Axis lines */}
      {labels.map((_, i) => {
        const p = getPoint(i, 100);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#e2e8f0" strokeWidth="1" opacity="0.4" />;
      })}

      {/* Secondary data polygon */}
      {secondaryValues && (
        <polygon
          points={getPolygonPoints(secondaryValues)}
          fill={secondaryColor}
          fillOpacity="0.1"
          stroke={secondaryColor}
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />
      )}

      {/* Primary data polygon */}
      <polygon
        points={getPolygonPoints(values)}
        fill={color}
        fillOpacity="0.15"
        stroke={color}
        strokeWidth="2"
      />

      {/* Data points */}
      {values.map((v, i) => {
        const p = getPoint(i, v);
        return (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill={color} stroke="white" strokeWidth="2" />
        );
      })}

      {/* Labels */}
      {labels.map((label, i) => {
        const p = getPoint(i, 120);
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="10"
            fontWeight="500"
            fontFamily="Inter, sans-serif"
            fill="#64748b"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}
