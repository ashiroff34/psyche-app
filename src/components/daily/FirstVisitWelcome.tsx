"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Sparkles,
  Eye,
  Target,
  Moon,
  BookOpen,
  ArrowRight,
  Share2,
} from "lucide-react";
import ChibiSprite from "@/components/ChibiSprite";
import { safeSet } from "@/lib/safe-storage";
import { TYPE_WPFA } from "@/data/wound-passion-fixation-armor";

// ─── Constants ──────────────────────────────────────────────────────────────

const TYPE_COLORS: Record<number, string> = {
  1: "#E74C3C", 2: "#E91E8C", 3: "#F39C12", 4: "#9B59B6",
  5: "#2980B9", 6: "#27AE60", 7: "#1ABC9C", 8: "#E67E22", 9: "#95A5A6",
};

const TYPE_GRADIENTS: Record<number, [string, string]> = {
  1: ["#E74C3C", "#C0392B"],
  2: ["#E91E8C", "#AD1457"],
  3: ["#F39C12", "#D68910"],
  4: ["#9B59B6", "#6C3483"],
  5: ["#2980B9", "#1B4F72"],
  6: ["#27AE60", "#186A3B"],
  7: ["#1ABC9C", "#117A65"],
  8: ["#E67E22", "#A04000"],
  9: ["#95A5A6", "#5D6D7E"],
};

const ICONIC_LINES: Record<number, string> = {
  1: "There is a right way. I will find it.",
  2: "I see what you need before you do.",
  3: "If it's worth doing, it's worth winning.",
  4: "I was never going to be like them.",
  5: "The world is loud. The mind is quiet.",
  6: "I'll be ready for whatever comes.",
  7: "There is always another door.",
  8: "No one tells me what I am.",
  9: "The still point holds everything.",
};

const TOTAL_CARDS = 4;

// ─── Props ──────────────────────────────────────────────────────────────────

interface FirstVisitWelcomeProps {
  type: number;
  instinct?: string;
  displayName?: string;
  chibiName?: string;
  onComplete: () => void;
}

// ─── Slide variants ─────────────────────────────────────────────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

// ─── Component ──────────────────────────────────────────────────────────────

export default function FirstVisitWelcome({
  type,
  instinct,
  displayName,
  chibiName,
  onComplete,
}: FirstVisitWelcomeProps) {
  const [cardIndex, setCardIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const color = TYPE_COLORS[type] ?? "#a78bfa";
  const gradient = TYPE_GRADIENTS[type] ?? ["#a78bfa", "#7c3aed"];
  const iconic = ICONIC_LINES[type] ?? "";
  const wpfa = TYPE_WPFA[type];

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= TOTAL_CARDS) return;
      setDirection(next > cardIndex ? 1 : -1);
      setCardIndex(next);
    },
    [cardIndex],
  );

  const handleComplete = useCallback(() => {
    safeSet("psyche-first-visit-complete", "true");
    onComplete();
  }, [onComplete]);

  const handleShare = useCallback(async () => {
    const text = `I'm a Type ${type} -- "${iconic}" \nDiscover yours at thyself.app`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "My Thyself Type", text });
      } catch {
        /* user cancelled */
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        /* clipboard not available */
      }
    }
  }, [type, iconic]);

  // Swipe handling
  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      const swipe = info.offset.x + info.velocity.x * 0.5;
      if (swipe < -50 && cardIndex < TOTAL_CARDS - 1) {
        goTo(cardIndex + 1);
      } else if (swipe > 50 && cardIndex > 0) {
        goTo(cardIndex - 1);
      }
    },
    [cardIndex, goTo],
  );

  // ── Card renderers ──

  const renderCard1 = () => (
    <div className="flex flex-col items-center text-center gap-5 px-4">
      {/* Type number with glow */}
      <div className="relative">
        <div
          className="absolute inset-0 blur-3xl opacity-40 rounded-full"
          style={{ background: `radial-gradient(circle, ${color}, transparent)` }}
        />
        <span
          className="relative text-8xl font-black"
          style={{
            background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {type}
        </span>
      </div>

      {/* Chibi */}
      <ChibiSprite type={type} size={120} />

      {/* Greeting + iconic line */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          {displayName ? `${displayName}, you're a Type ${type}` : `You're a Type ${type}`}
        </h1>
        <p className="mt-2 text-gray-300 italic text-lg">&ldquo;{iconic}&rdquo;</p>
      </div>

      {/* Wound & Armor bullets */}
      {wpfa && (
        <div className="w-full text-left space-y-3 mt-2">
          <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Wound</p>
            <p className="text-sm text-gray-300">{wpfa.wound}</p>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Armor</p>
            <p className="text-sm text-gray-300">{wpfa.armor}</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderCard2 = () => (
    <div className="flex flex-col items-center text-center gap-5 px-4">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${gradient[0]}33, ${gradient[1]}33)` }}
      >
        <Sparkles className="w-8 h-8" style={{ color }} />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-white">Your daily practice</h1>
        <p className="mt-1 text-lg text-gray-400">60 seconds a day</p>
      </div>

      <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
        Each day, Thyself gives you a type-aware check-in, an observation to carry
        with you, and a challenge that stretches your pattern. It takes less than a
        minute.
      </p>

      <div className="w-full space-y-3 mt-2">
        {[
          { icon: Eye, label: "Morning observation" },
          { icon: Target, label: "Daily challenge" },
          { icon: Moon, label: "Evening reflection" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3"
          >
            <Icon className="w-5 h-5 flex-shrink-0" style={{ color }} />
            <span className="text-sm text-gray-200">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCard3 = () => (
    <div className="flex flex-col items-center text-center gap-5 px-4">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${gradient[0]}33, ${gradient[1]}33)` }}
      >
        <BookOpen className="w-8 h-8" style={{ color }} />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-white">Your learning path</h1>
        <p className="mt-1 text-lg text-gray-400">31 units. Start with yours.</p>
      </div>

      <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
        Your type has a deep-dive unit waiting. Learn what drives your pattern,
        where it came from, and how to hold it with more awareness.
      </p>

      <div
        className="mt-2 rounded-xl border px-5 py-4 text-left w-full"
        style={{ borderColor: `${color}44`, background: `${color}0a` }}
      >
        <p className="text-sm text-gray-400 mb-1">Recommended first</p>
        <p className="text-base font-semibold text-white flex items-center gap-2">
          Unit {type}: Type {type} Deep Dive
          <ArrowRight className="w-4 h-4" style={{ color }} />
        </p>
      </div>
    </div>
  );

  const renderCard4 = () => (
    <div className="flex flex-col items-center text-center gap-5 px-4">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${gradient[0]}33, ${gradient[1]}33)` }}
      >
        <Share2 className="w-8 h-8" style={{ color }} />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-white">Share your type</h1>
        <p className="mt-2 text-gray-300 text-sm leading-relaxed max-w-xs">
          Your Type Identity Card is ready. Share it and earn tokens.
        </p>
      </div>

      {/* Mini preview card */}
      <div
        className="rounded-2xl border-2 px-6 py-5 w-full max-w-[260px] flex flex-col items-center gap-2"
        style={{ borderColor: color, background: "#0f0a1e" }}
      >
        <span
          className="text-5xl font-black"
          style={{
            background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {type}
        </span>
        <p className="text-xs text-gray-400 italic">&ldquo;{iconic}&rdquo;</p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 w-full mt-2">
        <button
          onClick={handleShare}
          className="flex-1 py-3 rounded-xl font-semibold text-sm text-white transition-all"
          style={{
            background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
          }}
        >
          Share now
        </button>
        <button
          onClick={handleComplete}
          className="flex-1 py-3 rounded-xl font-semibold text-sm text-gray-300 bg-white/10 hover:bg-white/15 transition-all"
        >
          Maybe later
        </button>
      </div>
    </div>
  );

  const cards = [renderCard1, renderCard2, renderCard3, renderCard4];

  return (
    <div className="fixed inset-0 z-[300] bg-[#08031a] flex flex-col">
      {/* Card area */}
      <div className="flex-1 flex items-start justify-center overflow-y-auto py-6" style={{ WebkitOverflowScrolling: "touch" }}>
        <div className="w-full max-w-md mx-auto px-4">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={cardIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              className="w-full"
            >
              {cards[cardIndex]()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="pb-10 pt-4 flex flex-col items-center gap-4 px-6">
        {/* Dot indicators */}
        <div className="flex gap-2">
          {Array.from({ length: TOTAL_CARDS }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: i === cardIndex ? color : "rgba(255,255,255,0.2)",
                transform: i === cardIndex ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* Next / Let's go button */}
        {cardIndex < TOTAL_CARDS - 1 ? (
          <button
            onClick={() => goTo(cardIndex + 1)}
            className="w-full max-w-md py-3.5 rounded-xl font-semibold text-sm text-white transition-all"
            style={{
              background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
            }}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleComplete}
            className="w-full max-w-md py-3.5 rounded-xl font-semibold text-sm text-white transition-all"
            style={{
              background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
            }}
          >
            Let&apos;s go
          </button>
        )}
      </div>
    </div>
  );
}
