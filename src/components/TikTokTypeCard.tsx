"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Download, X, Coins } from "lucide-react";

// ─── Type data ────────────────────────────────────────────────────────────────

const TYPE_COLORS: Record<number, string> = {
  1: "#E74C3C", 2: "#E91E8C", 3: "#F39C12",
  4: "#9B59B6", 5: "#2980B9", 6: "#27AE60",
  7: "#1ABC9C", 8: "#E67E22", 9: "#95A5A6",
};

const TYPE_NAMES: Record<number, string> = {
  1: "The Reformer", 2: "The Helper", 3: "The Achiever",
  4: "The Individualist", 5: "The Investigator", 6: "The Loyalist",
  7: "The Enthusiast", 8: "The Challenger", 9: "The Peacemaker",
};

const TYPE_TAGLINES: Record<number, string> = {
  1: "Principled. Purposeful. Self-controlled.",
  2: "Caring. Interpersonal. Generous.",
  3: "Success-oriented. Adaptable. Driven.",
  4: "Expressive. Dramatic. Self-absorbed.",
  5: "Perceptive. Innovative. Secretive.",
  6: "Engaging. Responsible. Anxious.",
  7: "Spontaneous. Versatile. Scattered.",
  8: "Self-confident. Decisive. Willful.",
  9: "Receptive. Reassuring. Agreeable.",
};

// TikTok hashtags by type — general + type-specific
const TYPE_HASHTAGS: Record<number, string[]> = {
  1: ["#enneagram", "#enneagramtype1", "#type1enneagram", "#personalitytype", "#selfawareness"],
  2: ["#enneagram", "#enneagramtype2", "#type2enneagram", "#personalitytype", "#psychology"],
  3: ["#enneagram", "#enneagramtype3", "#type3enneagram", "#personalitytype", "#selfimprovement"],
  4: ["#enneagram", "#enneagramtype4", "#type4enneagram", "#personalitytype", "#psychology"],
  5: ["#enneagram", "#enneagramtype5", "#type5enneagram", "#personalitytype", "#selfawareness"],
  6: ["#enneagram", "#enneagramtype6", "#type6enneagram", "#personalitytype", "#psychology"],
  7: ["#enneagram", "#enneagramtype7", "#type7enneagram", "#personalitytype", "#selfimprovement"],
  8: ["#enneagram", "#enneagramtype8", "#type8enneagram", "#personalitytype", "#psychology"],
  9: ["#enneagram", "#enneagramtype9", "#type9enneagram", "#personalitytype", "#selfawareness"],
};

const GLOBAL_HASHTAGS = [
  "#enneagramcommunity",
  "#knowyourself",
  "#personalitytypes",
  "#typology",
  "#innergrowth",
];

const TYPE_SHARE_HOOKS: Record<number, string> = {
  1: "I correct autocorrect.",
  2: "I know everyone's coffee order but I have no idea what I actually want.",
  3: "I reinvent myself every 6 months. The performance never stops.",
  4: "I've been processing my childhood since 2012.",
  5: "I researched this for 4 months, made a spreadsheet, and still haven't decided.",
  6: "I've already planned for 7 different worst-case scenarios today.",
  7: "I have 43 tabs open and a feeling I'm missing something.",
  8: "I don't start fights. I finish them.",
  9: "I have very strong opinions that I keep almost entirely to myself.",
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface TikTokTypeCardProps {
  enneagramType: number;
  wing?: string;
  instinct?: string;
  tritype?: string;
  mbtiType?: string;
  displayName?: string;
  onClose: () => void;
  onTokensEarned?: (amount: number) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TikTokTypeCard({
  enneagramType,
  wing,
  instinct,
  tritype,
  mbtiType,
  displayName,
  onClose,
  onTokensEarned,
}: TikTokTypeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [sharing, setSharing] = useState(false);
  const [shared, setShared] = useState(false);
  const [tokensAwarded, setTokensAwarded] = useState(false);

  const typeColor = TYPE_COLORS[enneagramType] ?? "#8b5cf6";
  const typeName = TYPE_NAMES[enneagramType] ?? "";
  const tagline = TYPE_TAGLINES[enneagramType] ?? "";
  const hashtags = [
    ...(TYPE_HASHTAGS[enneagramType] ?? []),
    ...GLOBAL_HASHTAGS,
  ];
  const hashtagString = hashtags.join(" ");
  const hook = TYPE_SHARE_HOOKS[enneagramType] ?? `I am Enneagram Type ${enneagramType} ${typeName}`;
  const shareText = `${hook}\n\nEnneagram Type ${enneagramType}: ${typeName}.\nFind your type free at thyself.app\n\n${hashtagString}`;

  const awardShareTokens = useCallback(() => {
    if (tokensAwarded) return;
    try {
      const dateKey = new Date().toISOString().slice(0, 10);
      const lastShareKey = `psyche-last-share-${dateKey}`;
      if (localStorage.getItem(lastShareKey)) return; // already shared today
      localStorage.setItem(lastShareKey, "1");

      const raw = localStorage.getItem("psyche-game-state");
      if (raw) {
        const gs = JSON.parse(raw);
        gs.tokens = (gs.tokens ?? 0) + 15;
        localStorage.setItem("psyche-game-state", JSON.stringify(gs));
      }
      setTokensAwarded(true);
      onTokensEarned?.(15);
    } catch {}
  }, [tokensAwarded, onTokensEarned]);

  const handleShare = useCallback(async () => {
    setSharing(true);
    try {
      // Try native Web Share API first (opens TikTok, Instagram, etc. on mobile)
      if (typeof navigator !== "undefined" && navigator.share) {
        // Generate image from the card element
        const { toPng } = await import("html-to-image");
        if (cardRef.current) {
          const dataUrl = await toPng(cardRef.current, { quality: 0.95, pixelRatio: 2 });
          const blob = await (await fetch(dataUrl)).blob();
          const file = new File([blob], `thyself-type-${enneagramType}.png`, { type: "image/png" });
          await navigator.share({
            title: `I am Enneagram Type ${enneagramType} ${typeName}`,
            text: shareText,
            files: [file],
          });
          setShared(true);
          awardShareTokens();
        }
      } else {
        // Fallback: download the image
        await handleDownload();
      }
    } catch (err) {
      // User cancelled or share not supported — fall back to download
      if ((err as Error)?.name !== "AbortError") {
        await handleDownload();
      }
    } finally {
      setSharing(false);
    }
  }, [enneagramType, typeName, shareText, awardShareTokens]);

  const handleDownload = useCallback(async () => {
    try {
      const { toPng } = await import("html-to-image");
      if (cardRef.current) {
        const dataUrl = await toPng(cardRef.current, { quality: 0.95, pixelRatio: 2 });
        const link = document.createElement("a");
        link.download = `thyself-type-${enneagramType}.png`;
        link.href = dataUrl;
        link.click();
        setShared(true);
        awardShareTokens();
      }
    } catch {}
  }, [enneagramType, awardShareTokens]);

  const handleIShared = useCallback(() => {
    setShared(true);
    awardShareTokens();
  }, [awardShareTokens]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center px-4"
      style={{ background: "rgba(10,6,20,0.92)", backdropFilter: "blur(12px)" }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <X className="w-5 h-5" style={{ color: "rgba(255,255,255,0.6)" }} />
      </button>

      {/* Label */}
      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
        Your Type Card
      </p>

      {/* ── The Card ─────────────────────────────────────────────────────── */}
      <div
        ref={cardRef}
        className="relative w-[300px] rounded-3xl overflow-hidden flex flex-col"
        style={{
          background: `linear-gradient(160deg, #0f0a1e 0%, #1a0f38 50%, #0f0a1e 100%)`,
          border: `1px solid ${typeColor}33`,
          boxShadow: `0 0 60px ${typeColor}22, inset 0 0 60px rgba(0,0,0,0.4)`,
          minHeight: 420,
        }}
      >
        {/* Glow blobs */}
        <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${typeColor}30 0%, transparent 70%)` }} />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${typeColor}20 0%, transparent 70%)` }} />

        <div className="relative flex flex-col flex-1 px-7 pt-8 pb-7">

          {/* Top row */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: `${typeColor}99` }}>Thyself</span>
              <span className="text-[8px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>thyself.app</span>
            </div>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${typeColor}22`, border: `1px solid ${typeColor}44` }}>
              <span className="text-xs font-black" style={{ color: typeColor }}>{enneagramType}</span>
            </div>
          </div>

          {/* Type number hero */}
          <div className="mb-1">
            <div
              className="font-serif font-black leading-none"
              style={{
                fontSize: 100,
                lineHeight: 1,
                color: typeColor,
                textShadow: `0 0 60px ${typeColor}66`,
              }}
            >
              {enneagramType}
            </div>
          </div>

          {/* Type name */}
          <div className="mb-2">
            <p className="text-xl font-serif font-bold leading-tight" style={{ color: "rgba(255,255,255,0.95)" }}>
              {typeName}
            </p>
            <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
              {tagline}
            </p>
          </div>

          {/* Badges */}
          {(wing || instinct || tritype || mbtiType) && (
            <div className="flex flex-wrap gap-1.5 my-4">
              {wing && (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: `${typeColor}22`, color: typeColor, border: `1px solid ${typeColor}33` }}>
                  {wing}
                </span>
              )}
              {instinct && (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {instinct.toUpperCase()}
                </span>
              )}
              {tritype && (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {tritype}
                </span>
              )}
              {mbtiType && (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {mbtiType}
                </span>
              )}
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Divider */}
          <div className="h-px my-4" style={{ background: `linear-gradient(90deg, transparent, ${typeColor}33, transparent)` }} />

          {/* Hashtags */}
          <p className="text-[8px] leading-relaxed" style={{ color: "rgba(255,255,255,0.2)" }}>
            {hashtags.slice(0, 5).join(" ")}
          </p>

          {/* CTA */}
          <p className="text-[9px] mt-2 font-semibold" style={{ color: `${typeColor}88` }}>
            Discover your type at thyself.app
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-col items-center gap-3 w-full max-w-xs">
        {/* Primary share */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleShare}
          disabled={sharing}
          className="w-full py-3.5 rounded-2xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all"
          style={{ background: sharing ? "rgba(139,92,246,0.4)" : "linear-gradient(135deg, #7c3aed, #d946ef)", boxShadow: sharing ? "none" : "0 4px 20px rgba(124,58,237,0.4)" }}
        >
          <Share2 className="w-4 h-4" />
          {sharing ? "Generating..." : "Share to TikTok"}
        </motion.button>

        {/* Download fallback */}
        <button
          onClick={handleDownload}
          className="w-full py-2.5 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.5)" }}
        >
          <Download className="w-3.5 h-3.5" />
          Save image
        </button>

        {/* Token reward state */}
        <AnimatePresence>
          {shared && !tokensAwarded && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={handleIShared}
              className="w-full py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2"
              style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)", color: "#fbbf24" }}
            >
              <Coins className="w-3.5 h-3.5" />
              I shared it  claim 15 tokens
            </motion.button>
          )}
          {tokensAwarded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)" }}
            >
              <Coins className="w-3.5 h-3.5" style={{ color: "#fbbf24" }} />
              <span className="text-xs font-bold" style={{ color: "#fbbf24" }}>+15 tokens earned for sharing</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Caption copy */}
        <CaptionCopy text={shareText} />
      </div>
    </motion.div>
  );
}

// ─── Caption copy helper ──────────────────────────────────────────────────────

function CaptionCopy({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <button
      onClick={copy}
      className="text-[10px] underline underline-offset-2 transition-colors"
      style={{ color: copied ? "#34d399" : "rgba(255,255,255,0.25)" }}
    >
      {copied ? "Caption copied!" : "Copy TikTok caption with hashtags"}
    </button>
  );
}
