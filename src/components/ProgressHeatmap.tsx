"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  activityData: Record<string, number>; // YYYY-MM-DD → XP earned
  goalXP?: number; // XP threshold to count as "goal met" (full color)
}

const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", "Sun"];

function getDateKey(date: Date): string {
  // Use local calendar date (en-CA gives YYYY-MM-DD) to match the rest of the app
  return new Intl.DateTimeFormat("en-CA").format(date);
}

function getDayOfWeek(date: Date): number {
  // 0=Sun,1=Mon,...,6=Sat → convert to Mon=0
  return (date.getDay() + 6) % 7;
}

function getOpacity(xp: number, goalXP: number): number {
  if (xp === 0) return 0;
  if (xp >= goalXP) return 1;
  if (xp >= goalXP * 0.5) return 0.5;
  return 0.2;
}

export default function ProgressHeatmap({
  activityData,
  goalXP = 50,
}: Props) {
  const [tooltip, setTooltip] = useState<{
    date: string;
    xp: number;
    x: number;
    y: number;
  } | null>(null);

  // Build 52-week grid (364 days) ending today
  const { weeks, totalXP, activeDays, maxXP } = useMemo(() => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    // Find start: 364 days ago, aligned to Monday
    const start = new Date(today);
    start.setDate(start.getDate() - 363);
    // Move back to the most recent Monday
    const dow = getDayOfWeek(start);
    if (dow !== 0) start.setDate(start.getDate() - dow);

    const weeks: Array<Array<{ date: string; xp: number }>> = [];
    let currentWeek: Array<{ date: string; xp: number }> = [];
    let cur = new Date(start);

    while (cur <= today) {
      const key = getDateKey(cur);
      const xp = activityData[key] ?? 0;
      currentWeek.push({ date: key, xp });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      cur.setDate(cur.getDate() + 1);
    }

    // Fill final partial week
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: "", xp: 0 });
      }
      weeks.push(currentWeek);
    }

    const allXP = Object.values(activityData);
    const totalXP = allXP.reduce((a, b) => a + b, 0);
    const activeDays = allXP.filter((x) => x > 0).length;
    const maxXP = allXP.length > 0 ? Math.max(...allXP) : 0;

    return { weeks, totalXP, activeDays, maxXP };
  }, [activityData]);

  const CELL_SIZE = 11;
  const CELL_GAP = 3;
  const STEP = CELL_SIZE + CELL_GAP;

  return (
    <div className="p-5 rounded-3xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
            Activity Heatmap
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
            Last 52 weeks
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm font-mono font-bold" style={{ color: "#a78bfa" }}>{totalXP.toLocaleString()}</div>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>Total XP</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-mono font-bold" style={{ color: "rgba(255,255,255,0.7)" }}>{activeDays}</div>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>Active Days</div>
          </div>
        </div>
      </div>

      {/* Grid wrapper */}
      <div className="overflow-x-auto pb-2">
        <div className="relative" style={{ minWidth: weeks.length * STEP + 30 }}>
          {/* Day labels (left side) */}
          <div
            className="absolute left-0 top-0 flex flex-col"
            style={{ gap: CELL_GAP, paddingTop: 0 }}
          >
            {DAY_LABELS.map((label, i) => (
              <div
                key={i}
                style={{
                  height: CELL_SIZE,
                  fontSize: 9,
                  color: "rgba(255,255,255,0.25)",
                  lineHeight: `${CELL_SIZE}px`,
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* SVG heatmap */}
          <svg
            width={weeks.length * STEP}
            height={7 * STEP}
            style={{ display: "block", marginLeft: 28, overflow: "visible" }}
          >
            {weeks.map((week, wIdx) =>
              week.map((day, dIdx) => {
                if (!day.date) return null;
                const opacity = getOpacity(day.xp, goalXP);
                const isFuture = day.date > getDateKey(new Date());

                return (
                  <motion.rect
                    key={`${wIdx}-${dIdx}`}
                    x={wIdx * STEP}
                    y={dIdx * STEP}
                    width={CELL_SIZE}
                    height={CELL_SIZE}
                    rx={2}
                    ry={2}
                    fill={day.xp > 0 ? "#8b5cf6" : "rgba(255,255,255,0.04)"}
                    fillOpacity={isFuture ? 0 : opacity || 0.04}
                    style={{ cursor: day.xp > 0 ? "pointer" : "default" }}
                    initial={false}
                    whileHover={day.xp > 0 ? { scale: 1.3 } : {}}
                    onMouseEnter={(e) => {
                      if (day.xp === 0) return; // skip zero-activity days
                      const svgEl = (e.target as SVGElement).closest("svg");
                      const rect = svgEl?.getBoundingClientRect();
                      if (rect) {
                        setTooltip({
                          date: day.date,
                          xp: day.xp,
                          x: rect.left + wIdx * STEP + CELL_SIZE / 2,
                          y: rect.top + dIdx * STEP,
                        });
                      }
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                );
              })
            )}
          </svg>

          {/* Tooltip */}
          {tooltip && (
            <div
              className="fixed z-50 pointer-events-none px-3 py-2 rounded-xl text-xs"
              style={{
                background: "rgba(15,10,30,0.95)",
                border: "1px solid rgba(139,92,246,0.4)",
                color: "rgba(255,255,255,0.9)",
                left: tooltip.x,
                top: tooltip.y - 48,
                transform: "translateX(-50%)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                whiteSpace: "nowrap",
              }}
            >
              <span className="font-medium">{tooltip.date}</span>
              <span className="ml-2" style={{ color: "#a78bfa" }}>
                {tooltip.xp > 0 ? `+${tooltip.xp} XP` : "No activity"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3">
        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>Less</span>
        {[0, 0.2, 0.5, 0.75, 1].map((op, i) => (
          <div
            key={i}
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              borderRadius: 2,
              background: op === 0 ? "rgba(255,255,255,0.04)" : "#8b5cf6",
              opacity: op === 0 ? 1 : op,
            }}
          />
        ))}
        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>More</span>
        {maxXP > 0 && (
          <span className="ml-auto text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>
            Peak: {maxXP} XP
          </span>
        )}
      </div>
    </div>
  );
}
