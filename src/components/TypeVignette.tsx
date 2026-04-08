"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { TypeVignette } from "@/data/vignettes";

type VignetteKey = "healthy" | "average" | "stress" | "relationship";

interface VignetteCardProps {
  title: string;
  story: string;
  mood: VignetteKey;
  defaultOpen?: boolean;
}

const moodConfig: Record<
  VignetteKey,
  { label: string; barColor: string; labelColor: string; bgColor: string; borderColor: string }
> = {
  healthy: {
    label: "At Their Best",
    barColor: "#22c55e",
    labelColor: "#86efac",
    bgColor: "rgba(34,197,94,0.06)",
    borderColor: "rgba(34,197,94,0.18)",
  },
  average: {
    label: "Day to Day",
    barColor: "#f59e0b",
    labelColor: "#fcd34d",
    bgColor: "rgba(245,158,11,0.06)",
    borderColor: "rgba(245,158,11,0.18)",
  },
  stress: {
    label: "Under Pressure",
    barColor: "#ef4444",
    labelColor: "#fca5a5",
    bgColor: "rgba(239,68,68,0.06)",
    borderColor: "rgba(239,68,68,0.18)",
  },
  relationship: {
    label: "In Relationship",
    barColor: "#3b82f6",
    labelColor: "#93c5fd",
    bgColor: "rgba(59,130,246,0.06)",
    borderColor: "rgba(59,130,246,0.18)",
  },
};

function VignetteCard({ title, story, mood, defaultOpen = false }: VignetteCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const config = moodConfig[mood];

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: config.bgColor,
        border: `1px solid ${config.borderColor}`,
      }}
    >
      {/* Mood bar */}
      <div className="h-1 w-full" style={{ background: config.barColor, opacity: 0.7 }} />

      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-5 py-4"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: config.labelColor }}
            >
              {config.label}
            </span>
            <span
              className="text-sm font-serif font-semibold"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              {title}
            </span>
          </div>
          <ChevronDown
            className="w-4 h-4 shrink-0 transition-transform duration-200"
            style={{
              color: "rgba(255,255,255,0.3)",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <div
                className="h-px w-full mb-4"
                style={{ background: "rgba(255,255,255,0.07)" }}
              />
              <p
                className="text-sm leading-relaxed italic"
                style={{
                  color: "rgba(255,255,255,0.72)",
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  lineHeight: "1.8",
                }}
              >
                {story}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface TypeVigetteProps {
  vignette: TypeVignette;
}

export default function TypeVignetteSection({ vignette }: TypeVigetteProps) {
  const moods: VignetteKey[] = ["healthy", "average", "stress", "relationship"];

  return (
    <div className="space-y-3">
      <p
        className="text-sm leading-relaxed mb-5"
        style={{ color: "rgba(255,255,255,0.45)" }}
      >
        Short portraits of this type across different situations. written in close third-person
        to show the inner world in motion.
      </p>
      {moods.map((mood, i) => (
        <VignetteCard
          key={mood}
          mood={mood}
          title={vignette[mood].title}
          story={vignette[mood].story}
          defaultOpen={i === 0}
        />
      ))}
    </div>
  );
}
