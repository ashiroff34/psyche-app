"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, Layers, Compass, Zap, Brain, Map } from "lucide-react";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────────────────────
// OnboardingOverlay, shown exactly once on first visit.
// No emojis. Clean icons + chibi mascot. Dark gradient theme.
// ─────────────────────────────────────────────────────────────────────────────

const CENTERS = [
  { label: "Body", types: "8 · 9 · 1", emotion: "Anger", color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.25)" },
  { label: "Heart", types: "2 · 3 · 4", emotion: "Shame", color: "#f43f5e", bg: "rgba(244,63,94,0.12)", border: "rgba(244,63,94,0.25)" },
  { label: "Head", types: "5 · 6 · 7", emotion: "Fear", color: "#818cf8", bg: "rgba(129,140,248,0.12)", border: "rgba(129,140,248,0.25)" },
];

const ARROWS = [
  { t: "1", g: "7", s: "4" }, { t: "2", g: "4", s: "8" }, { t: "3", g: "6", s: "9" },
  { t: "4", g: "1", s: "2" }, { t: "5", g: "8", s: "7" }, { t: "6", g: "9", s: "3" },
  { t: "7", g: "5", s: "1" }, { t: "8", g: "2", s: "5" }, { t: "9", g: "3", s: "6" },
];

const FUNCTIONS = [
  { fn: "Ne", desc: "Possibilities", color: "#a78bfa" },
  { fn: "Ni", desc: "Insight", color: "#818cf8" },
  { fn: "Se", desc: "Present", color: "#fbbf24" },
  { fn: "Si", desc: "Memory", color: "#fb923c" },
  { fn: "Te", desc: "Systems", color: "#60a5fa" },
  { fn: "Ti", desc: "Logic", color: "#38bdf8" },
  { fn: "Fe", desc: "Harmony", color: "#f472b6" },
  { fn: "Fi", desc: "Values", color: "#fb7185" },
];

const SLIDE_ICONS = [Layers, Compass, Zap, Brain, Map];

interface Slide {
  tag: string;
  title: string;
  body: string;
  highlight?: string;
  visual: "none" | "centers" | "arrows" | "functions" | "path";
}

const SLIDES: Slide[] = [
  {
    tag: "Welcome",
    title: "This isn't a vibe quiz",
    body: "Thyself is built on the two deepest personality frameworks ever developed, the Enneagram and Jungian cognitive functions. Real science. Real self-knowledge.",
    highlight: "deepest personality frameworks",
    visual: "none",
  },
  {
    tag: "The Enneagram",
    title: "Nine core motivations",
    body: "9 types. Each driven by a different core fear and desire that shapes everything you do. The Enneagram asks WHY you do things, not just what.",
    highlight: "core fear and desire",
    visual: "centers",
  },
  {
    tag: "Growth & Stress",
    title: "You move between types",
    body: "Each type has two arrow lines. One direction you grow toward when healthy. One you slide toward under stress. These arrows are specific and fixed.",
    highlight: "grow and slide",
    visual: "arrows",
  },
  {
    tag: "Cognitive Functions",
    title: "How your mind processes",
    body: "Carl Jung described 8 mental processes we all use, but in different orders. Your dominant function feels effortless. Your inferior is your blind spot.",
    highlight: "dominant and inferior",
    visual: "functions",
  },
  {
    tag: "Your Practice",
    title: "Learn before you quiz",
    body: "Before every quiz, you'll get a quick lesson so you're never tested cold. Complete your daily path to earn XP, build your streak, and go deeper every day.",
    highlight: "never tested cold",
    visual: "path",
  },
];

interface Props {
  onComplete: () => void;
}

export default function OnboardingOverlay({ onComplete }: Props) {
  const [slideIdx, setSlideIdx] = useState(0);
  const [direction, setDirection] = useState(1);

  const isLast = slideIdx === SLIDES.length - 1;
  const slide = SLIDES[slideIdx];
  const SlideIcon = SLIDE_ICONS[slideIdx];

  const goNext = () => {
    if (isLast) { onComplete(); return; }
    setDirection(1);
    setSlideIdx((i) => i + 1);
  };

  const goBack = () => {
    if (slideIdx === 0) return;
    setDirection(-1);
    setSlideIdx((i) => i - 1);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0 }),
  };

  function renderBody(body: string, highlight?: string) {
    if (!highlight) return <span>{body}</span>;
    const parts = body.split(highlight);
    return (
      <>
        {parts.map((part, i) =>
          i < parts.length - 1 ? (
            <span key={i}>
              {part}
              <span style={{ color: "#c4b5fd", fontWeight: 600 }}>{highlight}</span>
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex flex-col"
      style={{ background: "linear-gradient(160deg, #0d0a1a 0%, #160f38 55%, #0d0d1e 100%)" }}
    >
      {/* Ambient glow that shifts per slide */}
      <motion.div
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 55% 35% at 50% 30%, rgba(99,102,241,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Top nav */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-14 pb-2">
        <button
          onClick={goBack}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-opacity ${slideIdx === 0 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <ChevronLeft className="w-4 h-4 text-white/50" />
        </button>

        {/* Progress */}
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: i === slideIdx ? 22 : 6, opacity: i <= slideIdx ? 1 : 0.25 }}
              transition={{ duration: 0.3 }}
              className="h-1 rounded-full"
              style={{ background: i === slideIdx ? "linear-gradient(90deg,#a78bfa,#818cf8)" : "rgba(255,255,255,0.25)" }}
            />
          ))}
        </div>

        <button onClick={onComplete} className="text-xs font-medium px-1 py-2" style={{ color: "rgba(255,255,255,0.3)" }}>
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-hidden flex flex-col">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={slideIdx}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            className="absolute inset-0 flex flex-col items-center justify-start pt-4 px-6"
          >
            {/* Tag + icon */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.25)" }}
            >
              <SlideIcon className="w-3.5 h-3.5" style={{ color: "#a78bfa" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#a78bfa" }}>
                {slide.tag}
              </span>
            </motion.div>

            {/* Chibi mascot. only on welcome slide */}
            {slideIdx === 0 && (
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.08, type: "spring", stiffness: 280 }}
                className="mb-4"
              >
                <Image
                  src="/sprites/chibi/5-sp5.png?v=2"
                  alt="mascot"
                  width={80}
                  height={80}
                  className="object-contain"
                  style={{ filter: "drop-shadow(0 0 16px rgba(167,139,250,0.4))" }}
                />
              </motion.div>
            )}

            {/* Icon for non-welcome slides */}
            {slideIdx > 0 && (
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.08, type: "spring", stiffness: 280 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{
                  background: "rgba(167,139,250,0.1)",
                  border: "1px solid rgba(167,139,250,0.2)",
                  boxShadow: "0 0 24px rgba(99,102,241,0.15)",
                }}
              >
                <SlideIcon className="w-7 h-7" style={{ color: "#a78bfa" }} />
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.12 }}
              className="text-[26px] font-bold text-center leading-tight mb-3"
              style={{ color: "#fff", letterSpacing: "-0.3px" }}
            >
              {slide.title}
            </motion.h1>

            {/* Body */}
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.16 }}
              className="text-sm text-center leading-relaxed mb-7 max-w-[290px]"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {renderBody(slide.body, slide.highlight)}
            </motion.p>

            {/* Visuals */}
            {slide.visual === "centers" && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex gap-2.5 w-full max-w-[300px]"
              >
                {CENTERS.map((c) => (
                  <div
                    key={c.label}
                    className="flex-1 rounded-2xl p-3 text-center"
                    style={{ background: c.bg, border: `1px solid ${c.border}` }}
                  >
                    <div className="text-[10px] font-black uppercase tracking-widest mb-1.5" style={{ color: c.color }}>
                      {c.label}
                    </div>
                    <div className="text-base font-bold text-white">{c.types}</div>
                    <div className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {c.emotion}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {slide.visual === "arrows" && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-3 gap-2 w-full max-w-[300px]"
              >
                {ARROWS.map((row) => (
                  <div
                    key={row.t}
                    className="rounded-xl px-2 py-2 flex items-center justify-between"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <span className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.45)" }}>T{row.t}</span>
                    <span className="text-xs font-bold" style={{ color: "#4ade80" }}>↑{row.g}</span>
                    <span className="text-xs font-bold" style={{ color: "#f87171" }}>↓{row.s}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {slide.visual === "functions" && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-2 max-w-[290px]"
              >
                {FUNCTIONS.map((f, i) => (
                  <motion.div
                    key={f.fn}
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.22 + i * 0.04 }}
                    className="flex flex-col items-center rounded-2xl px-3 py-2 min-w-[60px]"
                    style={{ background: `${f.color}15`, border: `1px solid ${f.color}35` }}
                  >
                    <span className="text-sm font-black" style={{ color: f.color }}>{f.fn}</span>
                    <span className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{f.desc}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {slide.visual === "path" && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-2 w-full max-w-[290px]"
              >
                {[
                  { Icon: Brain, label: "Quick lesson", sub: "Learn the concept before you quiz", color: "#a78bfa" },
                  { Icon: Zap, label: "Quiz it", sub: "Test your recall and earn XP", color: "#fbbf24" },
                  { Icon: Layers, label: "Go deeper", sub: "Unlock harder levels as you improve", color: "#4ade80" },
                  { Icon: Map, label: "Build your map", sub: "Understand yourself more every day", color: "#60a5fa" },
                ].map(({ Icon, label, sub, color }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.22 + i * 0.07 }}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                    >
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color }}>{label}</div>
                      <div className="text-[11px] leading-snug" style={{ color: "rgba(255,255,255,0.35)" }}>{sub}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className="relative z-10 px-6 pb-10 pt-4">
        <motion.button
          onClick={goNext}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2"
          style={{
            background: isLast
              ? "linear-gradient(135deg, #10b981, #6366f1)"
              : "linear-gradient(135deg, #7c3aed, #4f46e5)",
            boxShadow: "0 8px 28px rgba(99,102,241,0.35)",
          }}
        >
          {isLast ? "Begin Your Practice" : <>Continue <ArrowRight className="w-4 h-4" /></>}
        </motion.button>
      </div>
    </motion.div>
  );
}
