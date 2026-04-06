"use client";

import { useMemo } from "react";
import { enneagramTypes } from "@/data/enneagram";

interface HistoryEntry {
  id: string;
  name: string;
  result: string;
  completedAt: string;
  topType?: number;
  confidence?: number;
}

const ASSESSMENT_DISPLAY_NAMES: Record<string, string> = {
  "quick": "Quick Type Finder",
  "essential-enneagram": "Essential Enneagram",
  "self-id": "Self-Identification",
  "integrative": "Integrative Assessment",
  "deep": "Deep Psychology",
  "this-or-that": "This or That",
  "michael-caloz": "Michael Caloz Style",
  "personality-path": "Personality Path",
  "mistype-investigator": "Mistype Investigator",
  "attachment": "Attachment Style",
  "instinctual": "Instinctual Stacking",
};

function getTypeName(typeNum?: number): string {
  if (!typeNum) return "Unknown";
  const t = enneagramTypes.find((t) => t.number === typeNum);
  return t ? `Type ${typeNum} — ${t.name}` : `Type ${typeNum}`;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

const TYPE_COLORS: Record<number, string> = {
  1: "#E74C3C", 2: "#E67E22", 3: "#F1C40F",
  4: "#1ABC9C", 5: "#3498DB", 6: "#9B59B6",
  7: "#2ECC71", 8: "#E74C3C", 9: "#1ABC9C",
};

export default function AssessmentHistory({ history }: { history: HistoryEntry[] }) {
  const sorted = useMemo(
    () => [...history].sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()),
    [history]
  );

  const first = sorted[0];
  const latest = sorted[sorted.length - 1];
  const typeChanged = sorted.length >= 2 && first?.topType !== latest?.topType;

  if (sorted.length === 0) {
    return (
      <div style={{ padding: "24px", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
        No assessments taken yet. Take your first assessment to start tracking your journey.
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Before / After comparison — only when 2+ assessments */}
      {sorted.length >= 2 && (
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: "20px 24px",
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", marginBottom: 16, textTransform: "uppercase" }}>
            Your Assessment Journey
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            {/* First result */}
            <div style={{
              flex: 1,
              minWidth: 140,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 12,
              padding: "14px 16px",
              borderLeft: `3px solid ${TYPE_COLORS[first?.topType ?? 1] ?? "#6366f1"}`,
            }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>Started as</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>
                {getTypeName(first?.topType)}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{formatDate(first.completedAt)}</div>
            </div>

            {/* Arrow */}
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>→</div>

            {/* Latest result */}
            <div style={{
              flex: 1,
              minWidth: 140,
              background: typeChanged ? "rgba(99,102,241,0.12)" : "rgba(34,197,94,0.08)",
              borderRadius: 12,
              padding: "14px 16px",
              borderLeft: `3px solid ${typeChanged ? "#6366f1" : "#22c55e"}`,
            }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {typeChanged ? "Shifted to" : "Confirmed as"}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>
                {getTypeName(latest?.topType)}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{formatDate(latest.completedAt)}</div>
            </div>
          </div>

          <div style={{ marginTop: 14, fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
            {typeChanged
              ? `After ${sorted.length} assessments, your type shifted from Type ${first?.topType} to Type ${latest?.topType}. This is common — Enneagram self-knowledge deepens significantly after learning the theory.`
              : `Your type has stayed consistent across all ${sorted.length} assessments. This consistency is a good signal of accurate self-identification.`}
          </div>
        </div>
      )}

      {/* Timeline */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", marginBottom: 12, textTransform: "uppercase" }}>
          Timeline
        </div>
        {sorted.map((entry, i) => {
          const typeColor = TYPE_COLORS[entry.topType ?? 0] ?? "#6366f1";
          return (
            <div key={entry.id + i} style={{ display: "flex", gap: 16, position: "relative" }}>
              {/* Line */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 28 }}>
                <div style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: typeColor,
                  marginTop: 16, flexShrink: 0,
                  boxShadow: `0 0 8px ${typeColor}80`,
                }} />
                {i < sorted.length - 1 && (
                  <div style={{ flex: 1, width: 1, background: "rgba(255,255,255,0.08)", marginTop: 4 }} />
                )}
              </div>

              {/* Content */}
              <div style={{ paddingBottom: 20, paddingTop: 10, flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 4 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
                      {ASSESSMENT_DISPLAY_NAMES[entry.id] ?? entry.name ?? entry.id}
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
                      Result: {getTypeName(entry.topType)}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    {entry.confidence != null && (
                      <div style={{
                        fontSize: 11, padding: "2px 8px", borderRadius: 99,
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.5)",
                      }}>
                        {entry.confidence}% confidence
                      </div>
                    )}
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                      {formatDate(entry.completedAt)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
