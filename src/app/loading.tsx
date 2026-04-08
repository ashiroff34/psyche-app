"use client";

import { motion } from "framer-motion";

// Full-screen loading splash. uses the actual ouroboros SVG image
// with expanding pulse rings and staggered "Thyself" letter reveal.

const LETTERS = "Thyself".split("");

const PULSE_RINGS = [
  { size: 160, delay: 0,   duration: 3.0 },
  { size: 240, delay: 0.9, duration: 3.0 },
  { size: 320, delay: 1.8, duration: 3.0 },
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
      {/* Expanding pulse rings */}
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

      {/* Soft inner glow */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.2, 0.4] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 140,
          height: 140,
          background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(139,92,246,0.12) 55%, transparent 80%)",
        }}
      />

      {/* Ouroboros SVG image. breathing scale + slow rotation */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <motion.img
          src="/thyself-logo.svg"
          alt="Thyself"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 96,
            height: 96,
            borderRadius: "22%",
            boxShadow: "0 0 32px rgba(139,92,246,0.55), 0 0 64px rgba(99,102,241,0.25)",
          }}
        />
      </motion.div>

      {/* "Thyself" letters stagger in */}
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
