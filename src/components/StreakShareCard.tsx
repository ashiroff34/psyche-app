"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, X, Share2, Copy, Check, Zap, Crown } from "lucide-react";
import { assetPath } from "@/lib/assetPath";
import ChibiSprite from "@/components/ChibiSprite";
import { useVerifiedShare } from "@/hooks/useVerifiedShare";

interface Props {
  streak: number;
  longestStreak?: number;
  level: number;
  league: string;
  totalXP: number;
  enneagramType?: number;
  cognitiveType?: string;
  instinct?: string;
  onClose: () => void;
}

// Color palette per Enneagram type
const TYPE_COLORS: Record<number, { from: string; to: string; label: string }> = {
  1: { from: "#6366f1", to: "#8b5cf6", label: "The Reformer" },
  2: { from: "#ec4899", to: "#f43f5e", label: "The Helper" },
  3: { from: "#f97316", to: "#eab308", label: "The Achiever" },
  4: { from: "#8b5cf6", to: "#6366f1", label: "The Individualist" },
  5: { from: "#3b82f6", to: "#06b6d4", label: "The Investigator" },
  6: { from: "#10b981", to: "#14b8a6", label: "The Loyalist" },
  7: { from: "#f59e0b", to: "#f97316", label: "The Enthusiast" },
  8: { from: "#ef4444", to: "#dc2626", label: "The Challenger" },
  9: { from: "#64748b", to: "#475569", label: "The Peacemaker" },
};

const LEAGUE_LABELS: Record<string, string> = {
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
  platinum: "Platinum",
  diamond: "Diamond",
  obsidian: "Obsidian",
};

export default function StreakShareCard({
  streak,
  longestStreak,
  level,
  league,
  totalXP,
  enneagramType,
  cognitiveType,
  instinct,
  onClose,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [tokenToast, setTokenToast] = useState(0);

  const typeColor = enneagramType ? TYPE_COLORS[enneagramType] : null;
  const gradFrom = typeColor?.from ?? "#6366f1";
  const gradTo = typeColor?.to ?? "#8b5cf6";
  const typeLabel = enneagramType ? `Type ${enneagramType} · ${typeColor?.label}` : null;
  const leagueLabel = LEAGUE_LABELS[league] ?? league;

  const shareText = [
    `${streak}-day streak on Thyself!`,
    cognitiveType && enneagramType
      ? `${cognitiveType}, Type ${enneagramType}, Level ${level} ${leagueLabel}`
      : `Level ${level} in the ${leagueLabel} league`,
    `${totalXP.toLocaleString()} XP earned`,
    "",
    "Building self-knowledge one day at a time",
    "thyself.app",
  ]
    .filter(Boolean)
    .join("\n");

  const { share: verifiedShare, copy: verifiedCopy, status: shareStatus, tokensAwarded } = useVerifiedShare({
    shareId: `streak-card-${streak}`,
    tokensPerShare: 15,
    title: `${streak}-day streak on Thyself!`,
    text: shareText,
    url: "https://thyself.app",
    onVerified: (t) => {
      if (t > 0) {
        setTokenToast(t);
        setTimeout(() => setTokenToast(0), 2800);
      }
    },
    onCopy: () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    },
  });

  void tokensAwarded; // used via onVerified callback

  const handleShare = verifiedShare;
  const handleCopy = verifiedCopy;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ type: "spring", damping: 24, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm"
        >
          {/* ── The shareable card itself ────────────────────────────────── */}
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{ background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})` }}
          >
            {/* Background texture blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-20"
                style={{ background: "white" }}
              />
              <div
                className="absolute -bottom-20 -left-16 w-64 h-64 rounded-full opacity-10"
                style={{ background: "white" }}
              />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            <div className="relative p-8 pb-6">
              {/* Brand */}
              <div className="flex items-center gap-2 mb-6">
                <img
                  src={assetPath("/thyself-logo.svg")}
                  alt="Thyself"
                  className="w-7 h-7 rounded-lg shadow-lg"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <span className="text-white/90 text-sm font-semibold tracking-wide">Thyself</span>
              </div>

              {/* Streak hero, chibi + streak count */}
              <div className="flex items-center gap-4 mb-5">
                {enneagramType ? (
                  <div className="relative shrink-0">
                    <ChibiSprite
                      type={enneagramType}
                      instinct={instinct}
                      size={88}
                      state="happy"
                      className="drop-shadow-xl"
                    />
                    {/* Streak badge on chibi */}
                    <div
                      className="absolute -bottom-1 -right-1 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-black"
                      style={{ background: "rgba(0,0,0,0.6)", color: "#fff", backdropFilter: "blur(4px)" }}
                    >
                      <Flame className="w-2.5 h-2.5" style={{ color: "#fb923c" }} />
                      {streak}
                    </div>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex flex-col items-center justify-center shadow-lg shrink-0">
                    <Flame className="w-8 h-8 text-white mb-0.5" />
                    <span className="text-2xl font-extrabold text-white leading-none">{streak}</span>
                  </div>
                )}
                <div>
                  <p className="text-white font-extrabold text-3xl leading-tight">
                    {streak === 1 ? "1 day" : `${streak} days`}
                  </p>
                  <p className="text-white/75 text-sm font-medium">learning streak ★</p>
                  {longestStreak && longestStreak > streak && (
                    <p className="text-white/50 text-xs mt-1">Best: {longestStreak} days</p>
                  )}
                </div>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Crown className="w-3.5 h-3.5 text-white" />
                  <span className="text-white text-xs font-bold">Lv {level} · {leagueLabel}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Zap className="w-3.5 h-3.5 text-white" />
                  <span className="text-white text-xs font-bold">{totalXP.toLocaleString()} XP</span>
                </div>
              </div>

              {/* Type pill */}
              {(typeLabel || cognitiveType) && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {typeLabel && (
                    <span className="px-3 py-1 rounded-full bg-white/25 text-white text-xs font-semibold backdrop-blur-sm">
                      {typeLabel}
                    </span>
                  )}
                  {cognitiveType && (
                    <span className="px-3 py-1 rounded-full bg-white/25 text-white text-xs font-bold font-mono backdrop-blur-sm">
                      {cognitiveType}
                    </span>
                  )}
                </div>
              )}

              {/* Tagline */}
              <p className="text-white/60 text-xs">
                Building self-knowledge one day at a time · thyself.app
              </p>
            </div>
          </div>

          {/* ── Action buttons below card ────────────────────────────────── */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl active:scale-95 transition-all"
              style={{ background: "#fff", color: "#1e1b4b" }}
            >
              {shareStatus === "verified" ? (
                <><Check className="w-4 h-4 text-emerald-500" /> Shared!</>
              ) : (
                <>
                  <Share2 className="w-4 h-4" /> Share
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(245,158,11,0.15)", color: "#b45309" }}>+15t</span>
                </>
              )}
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 active:scale-95 transition-all"
            >
              {copied ? (
                <><Check className="w-4 h-4" /> Copied</>
              ) : (
                <><Copy className="w-4 h-4" /> Copy</>
              )}
            </button>
          </div>

          {/* Token award toast */}
          <AnimatePresence>
            {tokenToast > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex items-center justify-center gap-1.5 mt-3"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-bold text-amber-300">+{tokenToast} tokens earned for sharing!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {!tokenToast && (
            <p className="text-center text-white/40 text-xs mt-3">
              Screenshot this card to share on Instagram or Stories
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
