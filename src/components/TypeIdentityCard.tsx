"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Share2, Copy, RotateCw, Check, Sparkles } from "lucide-react";
import ChibiSprite from "@/components/ChibiSprite";
import { TYPE_WPFA } from "@/data/wound-passion-fixation-armor";
import { enneagramTypes } from "@/data/enneagram";
import { posthog, EVENTS } from "@/lib/posthog";
import { getReferralShareUrl } from "@/lib/referral";

// ─── Type identity card ──────────────────────────────────────────────────
// Shareable beautiful card showing the user's full type identity.
// Front: chibi, type number, name, subtype, tritype, one iconic line
// Back: Wound / Passion / Fixation / Armor bullets
//
// Exportable as PNG via html-to-image. Shareable via Web Share API
// with fallback to copy.

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

interface Props {
  type: number;
  instinct?: string;
  tritype?: string;
  cognitiveType?: string;
  displayName?: string;
  wingNumber?: number;
}

export default function TypeIdentityCard({
  type,
  instinct,
  tritype,
  cognitiveType,
  displayName,
  wingNumber,
}: Props) {
  const [flipped, setFlipped] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [hasFlipped, setHasFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  function handleFlip() {
    setFlipped((v) => !v);
    if (!hasFlipped) {
      setHasFlipped(true);
      try { posthog.capture(EVENTS.IDENTITY_CARD_FLIPPED, { enneagramType: type }); } catch {}
    }
  }

  const typeData = enneagramTypes.find((t) => t.number === type);
  const typeName = typeData?.name ?? `Type ${type}`;
  const color = TYPE_COLORS[type] ?? "#8b5cf6";
  const [gradStart, gradEnd] = TYPE_GRADIENTS[type] ?? ["#8b5cf6", "#4f46e5"];
  const wpfa = TYPE_WPFA[type];
  const iconic = ICONIC_LINES[type] ?? "";

  // Build the subtype label: "sp/sx 5w4 549" style
  const wingLabel = wingNumber ? `${type}w${wingNumber}` : `${type}`;
  const tritypeLabel = tritype ? tritype.replace(/[^\d]/g, "") : "";

  async function handleDownload() {
    if (!cardRef.current) return;
    setSaving(true);
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "transparent",
      });
      const link = document.createElement("a");
      link.download = `thyself-type-${type}-${instinct ?? "identity"}.png`;
      link.href = dataUrl;
      link.click();
      setSavedMessage("Downloaded!");
      // Analytics
      try { posthog.capture(EVENTS.IDENTITY_CARD_DOWNLOADED, { enneagramType: type, instinct: instinct ?? null }); } catch {}
      setTimeout(() => setSavedMessage(null), 2200);
    } catch (e) {
      console.error("Failed to export card:", e);
      setSavedMessage("Failed, try again");
      setTimeout(() => setSavedMessage(null), 2200);
    } finally {
      setSaving(false);
    }
  }

  async function handleShare() {
    if (!cardRef.current) return;
    setSaving(true);
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "transparent",
      });

      // Convert data URL → Blob → File for native share
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `thyself-type-${type}.png`, { type: "image/png" });

      const referralUrl = getReferralShareUrl();
      const shareText = `I'm ${instinct ? instinct.toUpperCase() + " " : ""}Type ${type}, ${typeName}.`;

      let shareMethod: "native_file" | "native_text" | "clipboard" = "clipboard";
      // Try Web Share API with file (modern mobile)
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "My Thyself Type",
          text: shareText,
          url: referralUrl,
        });
        shareMethod = "native_file";
        setSavedMessage("Shared!");
      } else if (navigator.share) {
        // Fallback: share text only (still includes referral URL)
        await navigator.share({
          title: "My Thyself Type",
          text: shareText,
          url: referralUrl,
        });
        shareMethod = "native_text";
        setSavedMessage("Shared!");
      } else {
        // Ultimate fallback: copy text + referral link to clipboard
        await navigator.clipboard.writeText(`${shareText} ${referralUrl}`);
        setSavedMessage("Copied with your referral link");
      }
      // Analytics
      try {
        posthog.capture(EVENTS.IDENTITY_CARD_SHARED, {
          enneagramType: type,
          instinct: instinct ?? null,
          method: shareMethod,
        });
      } catch {}
      setTimeout(() => setSavedMessage(null), 2200);
    } catch (e) {
      // User cancelled or failed
      if ((e as Error).name !== "AbortError") {
        console.error("Share failed:", e);
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(getReferralShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <div className="flex flex-col items-center">
      {/* ── The card (flippable 3D perspective) ── */}
      <div
        className="relative mb-5"
        style={{ perspective: "1500px", width: 320, height: 480 }}
      >
        <motion.div
          className="relative w-full h-full cursor-pointer"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleFlip}
        >
          {/* ── FRONT of card ── */}
          <div
            ref={cardRef}
            className="absolute inset-0 rounded-3xl overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              background: `linear-gradient(160deg, ${gradStart} 0%, ${gradEnd} 50%, #0f0a1e 110%)`,
              boxShadow: `0 20px 60px ${color}40, 0 0 0 1px rgba(255,255,255,0.08)`,
            }}
          >
            {/* Decorative star pattern background */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 1px, transparent 1px), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle at 40% 60%, rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "40px 40px, 50px 50px, 30px 30px",
              }}
            />

            {/* Thyself brand mark top */}
            <div className="absolute top-5 left-0 right-0 flex items-center justify-between px-6 z-10">
              <span
                className="text-[9px] font-bold uppercase tracking-[0.25em]"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Thyself
              </span>
              <span
                className="text-[9px] font-bold uppercase tracking-[0.2em]"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Identity
              </span>
            </div>

            {/* Chibi, the hero */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10">
              <ChibiSprite
                type={type}
                instinct={instinct}
                size={170}
                state="happy"
              />
            </div>

            {/* Type label block */}
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-20 z-10">
              {/* Gradient fade over bottom for text legibility */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 40%, transparent 100%)",
                }}
              />

              <div className="relative">
                {/* Big type number + name */}
                <p
                  className="text-[9px] font-bold uppercase tracking-[0.22em] mb-1"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  Type {type}
                </p>
                <h2
                  className="text-[26px] font-serif font-bold leading-none mb-2"
                  style={{ color: "rgba(255,255,255,0.98)" }}
                >
                  {typeName}
                </h2>

                {/* Iconic line */}
                <p
                  className="text-[12px] italic font-serif leading-snug mb-3"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  &ldquo;{iconic}&rdquo;
                </p>

                {/* Subtype chips row */}
                <div className="flex flex-wrap gap-1.5">
                  {instinct && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider"
                      style={{ background: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.95)" }}
                    >
                      {instinct}
                    </span>
                  )}
                  <span
                    className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider"
                    style={{ background: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.95)" }}
                  >
                    {wingLabel}
                  </span>
                  {tritypeLabel && tritypeLabel.length >= 3 && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider"
                      style={{ background: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.95)" }}
                    >
                      {tritypeLabel}
                    </span>
                  )}
                  {cognitiveType && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider font-mono"
                      style={{ background: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.95)" }}
                    >
                      {cognitiveType}
                    </span>
                  )}
                </div>

                {displayName && (
                  <p
                    className="text-[10px] mt-3"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {displayName} · thyself.app
                  </p>
                )}
                {!displayName && (
                  <p
                    className="text-[9px] mt-3"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    thyself.app
                  </p>
                )}
              </div>
            </div>

            {/* Flip hint */}
            <div
              className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-sm z-20"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <RotateCw className="w-3 h-3" style={{ color: "rgba(255,255,255,0.8)" }} />
            </div>
          </div>

          {/* ── BACK of card, W/P/F/A depth ── */}
          <div
            className="absolute inset-0 rounded-3xl overflow-hidden p-6"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: `linear-gradient(160deg, #0f0a1e 0%, ${gradEnd}40 100%)`,
              boxShadow: `0 20px 60px ${color}30, 0 0 0 1px rgba(255,255,255,0.08)`,
              border: `1px solid ${color}30`,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-[9px] font-bold uppercase tracking-[0.25em]"
                style={{ color }}
              >
                Type {type} · Under the armor
              </span>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-sm"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <RotateCw className="w-3 h-3" style={{ color: "rgba(255,255,255,0.6)" }} />
              </div>
            </div>

            {wpfa && (
              <div className="space-y-3">
                {(["wound", "passion", "fixation", "armor"] as const).map((key) => (
                  <div key={key}>
                    <p
                      className="text-[8.5px] font-bold uppercase tracking-[0.2em] mb-1"
                      style={{ color: `${color}dd` }}
                    >
                      {key}
                    </p>
                    <p
                      className="text-[11.5px] leading-snug font-serif italic"
                      style={{ color: "rgba(255,255,255,0.82)" }}
                    >
                      {wpfa[key]}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div
              className="absolute bottom-4 left-0 right-0 text-center"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.3em]">
                thyself.app
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Flip instruction */}
      <p
        className="text-[11px] mb-4 flex items-center gap-1.5"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        <RotateCw className="w-3 h-3" />
        Tap the card to see what&apos;s underneath
      </p>

      {/* Action buttons */}
      <div className="flex gap-2 w-full max-w-sm">
        <button
          onClick={handleShare}
          disabled={saving}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl text-xs font-bold text-white transition-all active:scale-95 disabled:opacity-50"
          style={{
            background: `linear-gradient(135deg, ${gradStart}, ${gradEnd})`,
            boxShadow: `0 4px 20px ${color}40`,
          }}
        >
          <Share2 className="w-3.5 h-3.5" />
          Share
        </button>
        <button
          onClick={handleDownload}
          disabled={saving}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl text-xs font-bold transition-all active:scale-95 disabled:opacity-50"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          <Download className="w-3.5 h-3.5" />
          Download
        </button>
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center w-12 rounded-2xl text-xs font-bold transition-all active:scale-95"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.7)",
          }}
          aria-label="Copy link"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Ephemeral status message */}
      <AnimatePresence>
        {savedMessage && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-3 px-3 py-1.5 rounded-full text-[11px] font-semibold"
            style={{
              background: "rgba(16,185,129,0.15)",
              border: "1px solid rgba(16,185,129,0.3)",
              color: "#6ee7b7",
            }}
          >
            <Sparkles className="w-3 h-3 inline mr-1" />
            {savedMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
