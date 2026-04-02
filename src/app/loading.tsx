"use client";

import { motion } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Loading — full-screen splash shown by Next.js during route transitions.
//
// CSS ouroboros: a conic-gradient arc (the snake body, fading from tail to head)
// rotates counter-clockwise continuously. A glowing "head" dot sits at the top.
// Multiple ambient pulse rings grow outward from the center.
// Inspired by: conic-gradient spinners, radial pulse loaders, breathing orbs.
// ─────────────────────────────────────────────────────────────────────────────

const LETTERS = "Thyself".split("");

// How many outer ambient rings to render
const PULSE_RINGS = [
  { size: 180, delay: 0,   duration: 3.2 },
  { size: 260, delay: 0.8, duration: 3.2 },
  { size: 340, delay: 1.6, duration: 3.2 },
];

export default function Loading() {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center select-none overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 42%, #1a0838 0%, #0d0a1a 58%, #060410 100%)",
        zIndex: 9999,
      }}
    >
      {/* ── Expanding pulse rings ─────────────────────────────────────────── */}
      {PULSE_RINGS.map((ring, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: [0, 0.18, 0] }}
          transition={{
            duration: ring.duration,
            repeat: Infinity,
            delay: ring.delay,
            ease: "easeOut",
          }}
          style={{
            width: ring.size,
            height: ring.size,
            border: "1.5px solid rgba(139,92,246,0.5)",
            boxShadow: "0 0 12px rgba(99,102,241,0.2)",
          }}
        />
      ))}

      {/* ── Soft inner glow (static, behind the ring) ─────────────────────── */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.25, 0.5] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 130,
          height: 130,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.45) 0%, rgba(139,92,246,0.15) 55%, transparent 80%)",
        }}
      />

      {/* ── Ouroboros — counter-clockwise spinning arc ────────────────────── */}
      {/*
          Design principle (inspired by conic-gradient spinners on CodePen/GitHub):
          The outer div has a conic-gradient as its background.
          An inner div with the page's dark background creates the ring "hole."
          A separate head-dot element sits at the top (0° mark) where the visible
          arc's leading edge terminates — evoking the snake's head eating its tail.

          The whole thing spins counter-clockwise (animate: rotate -360°),
          which is the "correct" direction for a snake consuming itself.
      */}
      <motion.div
        className="relative"
        animate={{ rotate: -360 }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
        style={{ width: 114, height: 114, flexShrink: 0 }}
      >
        {/* Snake body: the conic gradient arc */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            /* from 0deg = 12 o'clock.
               0–18% transparent = the "mouth" gap at the top.
               18–20% = tail fades in (near-transparent indigo).
               20–55% = mid body.
               55–75% = thickening / brightest body.
               75–95% = neck and head approaching the gap.
               95–100% = head brightness fading slightly as it enters the mouth. */
            background: [
              "conic-gradient(",
              "from 0deg,",
              "transparent            0%,",
              "transparent            18%,",
              "rgba(55,48,163,0.15)   19%,",
              "rgba(67,56,202,0.35)   25%,",
              "rgba(99,102,241,0.65)  40%,",
              "rgba(139,92,246,0.90)  58%,",
              "rgba(167,139,250,1)    74%,",
              "rgba(196,181,253,1)    88%,",
              "rgba(216,208,255,0.85) 96%,",
              "transparent           100%",
              ")",
            ].join(" "),
            padding: "11px",
            boxSizing: "border-box" as const,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Dark inner fill — creates ring illusion */}
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at center, #130922 45%, #0d0a1a 100%)",
            }}
          />
        </div>

        {/* Snake head: bright glowing dot at top center (0° = 12 o'clock).
            The conic gradient's leading edge (the head) arrives here just
            before re-entering the transparent gap — visually = biting its tail. */}
        <div
          style={{
            position: "absolute",
            width: 13,
            height: 13,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #f5f0ff 0%, #d8b4fe 45%, #8b5cf6 100%)",
            boxShadow:
              "0 0 8px rgba(216,180,254,1), 0 0 18px rgba(167,139,250,0.9), 0 0 36px rgba(139,92,246,0.5)",
            /* Position: top center, offset by half dot width + half ring thickness
               so it sits on the ring's outer edge at 12 o'clock */
            top: 0,
            left: "50%",
            transform: "translate(-50%, -1px)",
          }}
        />
      </motion.div>

      {/* ── App name — letters stagger in ──────────────────────────────────── */}
      <div className="mt-10 flex flex-col items-center gap-3.5">
        <div className="flex items-center">
          {LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 9 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.12 + i * 0.065,
                duration: 0.32,
                ease: "easeOut",
              }}
              className="text-[27px] font-bold"
              style={{
                color: "#fff",
                letterSpacing: "-0.5px",
                lineHeight: 1,
                textShadow: "0 0 24px rgba(167,139,250,0.35)",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Three animated dots */}
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="rounded-full"
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.2, 0.7] }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                delay: i * 0.22,
                ease: "easeInOut",
              }}
              style={{
                width: 5,
                height: 5,
                background: "linear-gradient(135deg, #a78bfa, #6366f1)",
                boxShadow: "0 0 6px rgba(167,139,250,0.5)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
