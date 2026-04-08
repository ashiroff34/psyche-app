"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const REFERRAL_TOKEN_REWARD = 50;
const LIMITED_TIME_BONUS = 100;
const TOTAL_REWARD = REFERRAL_TOKEN_REWARD + LIMITED_TIME_BONUS;

function ReferralContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code") ?? "";

  useEffect(() => {
    if (!code) return;
    try {
      const existing = localStorage.getItem("psyche-referral-code");
      if (!existing) {
        localStorage.setItem("psyche-referral-code", code);
        localStorage.setItem("psyche-referral-at", new Date().toISOString());
        // Flag limited-time bonus so useProfile can award it
        localStorage.setItem("psyche-referral-limited-bonus", "true");
      }
    } catch {}
  }, [code]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "linear-gradient(160deg, #0f0a1e 0%, #1a0f38 50%, #0f0a1e 100%)" }}
    >
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 260 }}
        className="relative max-w-sm w-full flex flex-col items-center gap-6"
      >
        {/* Limited time banner */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full px-4 py-2 rounded-xl text-center"
          style={{ background: "linear-gradient(90deg, rgba(239,68,68,0.15), rgba(245,158,11,0.15))", border: "1px solid rgba(239,68,68,0.3)" }}
        >
          <span className="text-xs font-black uppercase tracking-wider" style={{ color: "#f87171" }}>
            ⚡ Limited time offer
          </span>
          <span className="text-xs font-bold ml-2" style={{ color: "rgba(255,255,255,0.6)" }}>
           . new users get +{TOTAL_REWARD} tokens today
          </span>
        </motion.div>

        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black font-mono"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #d946ef)",
            boxShadow: "0 8px 32px rgba(124,58,237,0.45)",
            color: "white",
          }}
        >
          (*)
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(167,139,250,0.6)" }}>
            You were invited
          </p>
          <h1 className="text-3xl font-serif font-black text-white leading-tight">
            Discover who<br />you actually are.
          </h1>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            Thyself maps your Enneagram type, instinctual subtype, tritype, and cognitive style. free.
          </p>
        </div>

        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.25, type: "spring", damping: 14, stiffness: 240 }}
          className="w-full flex flex-col gap-1.5 px-4 py-3 rounded-2xl"
          style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)" }}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-mono font-bold" style={{ color: "#fbbf24" }}>(+)</span>
            <span className="text-sm font-bold" style={{ color: "#fbbf24" }}>
              +{REFERRAL_TOKEN_REWARD} tokens. friend referral bonus
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-mono font-bold" style={{ color: "#f87171" }}>(+)</span>
            <span className="text-sm font-bold" style={{ color: "#f87171" }}>
              +{LIMITED_TIME_BONUS} tokens. limited time bonus
            </span>
          </div>
          <div className="mt-1 pt-1.5" style={{ borderTop: "1px solid rgba(245,158,11,0.2)" }}>
            <span className="text-base font-black" style={{ color: "#fbbf24" }}>
              = +{TOTAL_REWARD} tokens total on first assessment
            </span>
          </div>
        </motion.div>

        <div className="w-full space-y-2.5">
          {[
            "Core Enneagram type. motivation not just behavior",
            "Instinctual subtype. sp, sx, or so",
            "Tritype. your 3-center combination",
            "Cognitive style. Jungian functions overlay",
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.08 }}
              className="flex items-start gap-2.5 text-left"
            >
              <span className="text-xs font-mono font-bold mt-0.5 shrink-0" style={{ color: "#a78bfa" }}>(+)</span>
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{item}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/assessments/quick")}
          className="w-full py-4 rounded-2xl font-black text-white text-base"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #d946ef)",
            boxShadow: "0 8px 32px rgba(124,58,237,0.45)",
          }}
        >
          Find my type. free
        </motion.button>

        <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          No account required. Stored locally on your device.
        </p>
      </motion.div>
    </div>
  );
}

export default function ReferralPage() {
  return (
    <Suspense>
      <ReferralContent />
    </Suspense>
  );
}
