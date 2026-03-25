"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ChibiState = "idle" | "happy" | "sleeping" | "hurt";

interface ChibiSpriteProps {
  type: number;
  instinct: string;
  size?: number;
  state?: ChibiState;
  className?: string;
  onClick?: () => void;
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const IDLE_ANIMATE = { y: [0, -6, 0] as number[] };
const IDLE_TRANSITION = { repeat: Infinity, duration: 3, ease: "easeInOut" as const };

const SLEEPING_ANIMATE = { rotate: [-2, 2, -2] as number[] };
const SLEEPING_TRANSITION = { repeat: Infinity, duration: 4, ease: "easeInOut" as const };

const HAPPY_ANIMATE = { y: [0, -14, 0] as number[] };
const HAPPY_TRANSITION = { repeat: 3, duration: 0.4, ease: "easeOut" as const };

const HURT_ANIMATE = { x: [-6, 6, -6, 6, 0] as number[] };
const HURT_TRANSITION = { repeat: 0, duration: 0.4, ease: "easeInOut" as const };

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChibiSprite({
  type,
  instinct,
  size = 256,
  state: spriteState = "idle",
  className = "",
  onClick,
}: ChibiSpriteProps) {
  const [imgError, setImgError] = useState(false);
  const [currentState, setCurrentState] = useState<ChibiState>(spriteState);

  useEffect(() => {
    setCurrentState(spriteState);
  }, [spriteState]);

  useEffect(() => {
    if (spriteState === "happy" || spriteState === "hurt") {
      const duration = spriteState === "happy" ? 0.4 * 3 * 1000 + 200 : 0.4 * 1000 + 200;
      const timer = setTimeout(() => setCurrentState("idle"), duration);
      return () => clearTimeout(timer);
    }
  }, [spriteState]);

  // Build path: e.g. /sprites/chibi/5-so5.png
  const inst = instinct?.toLowerCase().slice(0, 2) || "sp";
  const src = `/sprites/chibi/${type}-${inst}${type}.png`;

  let animate: Record<string, number[]> = IDLE_ANIMATE;
  let transition: Record<string, unknown> = IDLE_TRANSITION;
  let opacity = 1;

  if (currentState === "happy") {
    animate = HAPPY_ANIMATE;
    transition = HAPPY_TRANSITION;
  } else if (currentState === "sleeping") {
    animate = SLEEPING_ANIMATE;
    transition = SLEEPING_TRANSITION;
    opacity = 0.85;
  } else if (currentState === "hurt") {
    animate = HURT_ANIMATE;
    transition = HURT_TRANSITION;
  }

  if (imgError) {
    // Fallback: show type number in a styled circle
    return (
      <motion.div
        className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 ${className}`}
        style={{ width: size, height: size, cursor: onClick ? "pointer" : "default" }}
        animate={animate}
        transition={transition}
        onClick={onClick}
      >
        <span className="text-slate-400 font-serif font-bold" style={{ fontSize: size * 0.35 }}>
          {type}
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size, opacity, cursor: onClick ? "pointer" : "default" }}
      animate={animate}
      transition={transition}
      onClick={onClick}
    >
      <img
        src={src}
        alt={`Type ${type} ${inst.toUpperCase()} chibi`}
        width={size}
        height={size}
        className="object-contain w-full h-full drop-shadow-lg"
        draggable={false}
        onError={() => setImgError(true)}
      />
    </motion.div>
  );
}
