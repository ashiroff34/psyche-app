"use client";

import { motion } from "framer-motion";
import ChibiSprite, { type ChibiState } from "@/components/ChibiSprite";

// ─── Scene: a soft light container for the chibi ────────────────────────────
// Fixes the apparent-transparency issue where pale chibi pixels blend into
// the dark app background. The scene gives the chibi a "floor" and backlight.

interface Props {
  type: number;
  instinct?: string;
  size?: number;         // container size (sprite is 80% of this)
  state?: ChibiState;
  variant?: "soft" | "radiant" | "dawn" | "dusk";  // background variants
  className?: string;
  showShadow?: boolean;
}

const SCENE_BACKGROUNDS: Record<string, string> = {
  soft: "linear-gradient(180deg, #f4efff 0%, #e3d9ff 60%, #d4c6f5 100%)",
  radiant: "linear-gradient(180deg, #fff8e7 0%, #ffe3c4 55%, #ffcfa4 100%)",
  dawn: "linear-gradient(180deg, #ffd9e8 0%, #f4c2e0 50%, #dda4c8 100%)",
  dusk: "linear-gradient(180deg, #c4b5fd 0%, #a78bfa 55%, #7c3aed 100%)",
};

const SCENE_BORDERS: Record<string, string> = {
  soft: "rgba(196, 181, 253, 0.4)",
  radiant: "rgba(251, 191, 36, 0.4)",
  dawn: "rgba(244, 114, 182, 0.4)",
  dusk: "rgba(139, 92, 246, 0.5)",
};

export default function ChibiScene({
  type,
  instinct,
  size = 200,
  state = "idle",
  variant = "soft",
  className = "",
  showShadow = true,
}: Props) {
  const spriteSize = Math.round(size * 0.82);
  const bg = SCENE_BACKGROUNDS[variant];
  const border = SCENE_BORDERS[variant];

  return (
    <div
      className={`relative inline-flex items-end justify-center ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: "28%",
        background: bg,
        border: `2px solid ${border}`,
        boxShadow: `
          inset 0 -20px 40px rgba(139, 92, 246, 0.15),
          inset 0 10px 30px rgba(255, 255, 255, 0.4),
          0 6px 32px rgba(139, 92, 246, 0.25)
        `,
        overflow: "hidden",
      }}
    >
      {/* Soft light from above */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "50%",
          background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(255,255,255,0.5), transparent)",
        }}
      />

      {/* Floor/ground subtle shadow */}
      {showShadow && (
        <div
          className="absolute bottom-[10%] left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "50%",
            height: "6%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(91, 33, 182, 0.35), transparent 70%)",
            filter: "blur(4px)",
          }}
        />
      )}

      {/* Chibi */}
      <motion.div
        className="relative"
        style={{ marginBottom: "6%", zIndex: 2 }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChibiSprite
          type={type}
          instinct={instinct}
          size={spriteSize}
          state={state}
        />
      </motion.div>
    </div>
  );
}
