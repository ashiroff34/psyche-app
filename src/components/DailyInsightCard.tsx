"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Copy, Check } from "lucide-react";
import { getDailyInsight } from "@/data/daily-insights";

interface DailyInsightCardProps {
  typeNumber: number;
  typeColor: string;
}

export default function DailyInsightCard({
  typeNumber,
  typeColor,
}: DailyInsightCardProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const [tokensAwarded, setTokensAwarded] = useState(false);
  const [tokenPop, setTokenPop] = useState(false);

  const insight = getDailyInsight(typeNumber);
  const dateKey = new Date().toISOString().slice(0, 10);
  const shareKey = `psyche-last-insight-share-${dateKey}`;

  const awardTokens = useCallback(() => {
    if (tokensAwarded) return;
    try {
      if (typeof localStorage === "undefined") return;
      if (localStorage.getItem(shareKey)) return; // already awarded today
      localStorage.setItem(shareKey, "1");

      const raw = localStorage.getItem("psyche-game-state");
      const gs = raw ? JSON.parse(raw) : {};
      gs.tokens = (typeof gs.tokens === "number" ? gs.tokens : 0) + 5;
      localStorage.setItem("psyche-game-state", JSON.stringify(gs));

      setTokensAwarded(true);
      setTokenPop(true);
      setTimeout(() => setTokenPop(false), 2000);
    } catch {
      // silent. localStorage may not be available
    }
  }, [tokensAwarded, shareKey]);

  const handleShare = useCallback(async () => {
    const shareText = `"${insight.text}"\n\n— thyself.app`;
    try {
      await navigator.clipboard.writeText(shareText);
      setCopyState("copied");
      awardTokens();
      setTimeout(() => setCopyState("idle"), 2500);
    } catch {
      // fallback: try execCommand
      try {
        const el = document.createElement("textarea");
        el.value = shareText;
        el.style.position = "fixed";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopyState("copied");
        awardTokens();
        setTimeout(() => setCopyState("idle"), 2500);
      } catch {
        // nothing more we can do
      }
    }
  }, [insight.text, awardTokens]);

  // Already awarded today?
  const alreadySharedToday =
    typeof localStorage !== "undefined" && !!localStorage.getItem(shareKey);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-sm mx-auto"
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-3xl blur-2xl opacity-20 pointer-events-none"
        style={{ backgroundColor: typeColor }}
      />

      {/* Card */}
      <div
        className="relative rounded-3xl overflow-hidden border"
        style={{
          background: "linear-gradient(160deg, #1a0f2e 0%, #110a20 60%, #0d0818 100%)",
          borderColor: `${typeColor}30`,
          boxShadow: `0 0 0 1px ${typeColor}18, 0 24px 48px -12px rgba(0,0,0,0.7), inset 0 1px 0 ${typeColor}20`,
        }}
      >
        {/* Decorative top accent bar */}
        <div
          className="h-[2px] w-full"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${typeColor}80 40%, ${typeColor} 50%, ${typeColor}80 60%, transparent 100%)`,
          }}
        />

        {/* Decorative blobs */}
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
          style={{ backgroundColor: typeColor }}
        />
        <div
          className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full opacity-[0.04] blur-2xl pointer-events-none"
          style={{ backgroundColor: typeColor }}
        />

        <div className="relative px-7 pt-8 pb-7">
          {/* Header */}
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-2.5">
              {/* Type badge */}
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white"
                style={{
                  background: `linear-gradient(135deg, ${typeColor} 0%, ${typeColor}99 100%)`,
                  boxShadow: `0 2px 8px ${typeColor}50`,
                }}
              >
                {typeNumber}
              </div>
              <span
                className="text-[10px] font-semibold tracking-[0.18em] uppercase"
                style={{ color: `${typeColor}cc` }}
              >
                Daily Insight
              </span>
            </div>
            <span className="text-[10px] font-medium text-white/20 tracking-widest uppercase">
              thyself
            </span>
          </div>

          {/* Ornament */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="h-px flex-1 opacity-20"
              style={{ backgroundColor: typeColor }}
            />
            <span className="text-white/15 text-[10px]">✦</span>
            <div
              className="h-px flex-1 opacity-20"
              style={{ backgroundColor: typeColor }}
            />
          </div>

          {/* Insight text */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18, duration: 0.6 }}
            className="font-serif italic text-white leading-relaxed mb-5"
            style={{ fontSize: "clamp(1.05rem, 3.5vw, 1.2rem)" }}
          >
            {insight.text}
          </motion.blockquote>

          {/* Divider */}
          <div
            className="h-px mb-4 opacity-10"
            style={{ backgroundColor: typeColor }}
          />

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.32, duration: 0.5 }}
            className="text-xs leading-relaxed"
            style={{ color: `${typeColor}99` }}
          >
            {insight.subtext}
          </motion.p>

          {/* Bottom row */}
          <div className="flex items-center justify-between mt-6">
            {/* Token indicator */}
            <AnimatePresence mode="wait">
              {tokenPop ? (
                <motion.span
                  key="awarded"
                  initial={{ opacity: 0, scale: 0.7, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="text-[11px] font-semibold text-emerald-400"
                >
                  +5 tokens
                </motion.span>
              ) : (
                <motion.span
                  key="info"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-medium"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  {alreadySharedToday || tokensAwarded
                    ? "shared today"
                    : "share for +5 tokens"}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Share button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all"
              style={{
                background:
                  copyState === "copied"
                    ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                    : `linear-gradient(135deg, ${typeColor}cc 0%, ${typeColor}99 100%)`,
                boxShadow:
                  copyState === "copied"
                    ? "0 2px 12px rgba(16,185,129,0.35)"
                    : `0 2px 12px ${typeColor}35`,
              }}
            >
              <AnimatePresence mode="wait">
                {copyState === "copied" ? (
                  <motion.span
                    key="check"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Copied!
                  </motion.span>
                ) : (
                  <motion.span
                    key="share"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Share
                    <Share2 className="w-3 h-3 opacity-70" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
