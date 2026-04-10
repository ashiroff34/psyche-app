"use client";

// TikTok-Ready 9:16 vertical frame export
//
// Takes any insight text + (optionally) the user's type and renders a
// branded 1080×1920 card ready to drop into TikTok, Reels, Shorts, or
// IG Stories. Works as a pipeline for Ari's science comm account and
// also as user-generated distribution.

import { useRef, useState } from "react";
import { Share2, Download, Check } from "lucide-react";
import ChibiSprite from "@/components/ChibiSprite";
import { enneagramTypes } from "@/data/enneagram";
import { getReferralShareUrl } from "@/lib/referral";
import { posthog } from "@/lib/posthog";

interface Props {
  insight: string; // main text
  kicker?: string; // short eyebrow label
  type?: number | null;
  instinct?: "sp" | "sx" | "so" | null;
  source?: string; // "Thyself daily reflection", etc.
  ctaText?: string; // "Take the quiz" etc.
}

export default function TikTokFrame({
  insight,
  kicker = "Today's reflection",
  type = null,
  instinct = null,
  source = "Thyself",
  ctaText = "Find your type",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<string | null>(null);

  const typeData = type ? enneagramTypes.find(t => t.number === type) : null;
  const typeColor = typeData?.color ?? "#a78bfa";

  async function render(): Promise<string | null> {
    if (!ref.current) return null;
    try {
      const { toPng } = await import("html-to-image");
      return await toPng(ref.current, {
        cacheBust: true,
        pixelRatio: 2, // pre-scaled to 1080x1920 from 540x960 base
        backgroundColor: "#000",
      });
    } catch (e) {
      console.error("TikTok frame render failed:", e);
      return null;
    }
  }

  async function handleShare() {
    setStatus("Rendering...");
    const dataUrl = await render();
    if (!dataUrl) { setStatus("Try again"); return; }
    try {
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `thyself-tiktok.png`, { type: "image/png" });
      const text = `${insight}\n\n${ctaText}:`;
      const url = getReferralShareUrl();
      if (navigator.share && (navigator as any).canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text, url });
        setStatus("Shared");
      } else {
        await navigator.clipboard.writeText(`${text} ${url}`);
        setStatus("Link copied");
      }
      try { posthog.capture("tiktok_frame_shared", { has_type: !!type }); } catch {}
    } catch (e) {
      console.error(e);
      setStatus("Try again");
    } finally {
      setTimeout(() => setStatus(null), 2200);
    }
  }

  async function handleDownload() {
    setStatus("Rendering...");
    const dataUrl = await render();
    if (!dataUrl) { setStatus("Try again"); return; }
    const link = document.createElement("a");
    link.download = "thyself-tiktok.png";
    link.href = dataUrl;
    link.click();
    setStatus("Saved");
    try { posthog.capture("tiktok_frame_downloaded", { has_type: !!type }); } catch {}
    setTimeout(() => setStatus(null), 2200);
  }

  return (
    <div className="w-full max-w-xs mx-auto">
      {/* 9:16 vertical frame. Base 540x960, scaled 2x on export → 1080x1920 */}
      <div
        ref={ref}
        className="relative rounded-3xl overflow-hidden mx-auto"
        style={{
          width: "100%",
          aspectRatio: "9 / 16",
          background: `linear-gradient(180deg, #0a0514 0%, ${typeColor}14 50%, #0a0514 100%)`,
        }}
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 30%, ${typeColor}2a 0%, transparent 70%)`,
        }} />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center px-5 py-6">
          {/* Top: brand kicker */}
          <div className="w-full flex justify-between items-baseline mb-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.25em]" style={{ color: `${typeColor}cc` }}>
              {source}
            </p>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-60">
              thyself.app
            </p>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: `${typeColor}aa` }}>
            {kicker}
          </p>

          {/* Chibi */}
          {type && (
            <div className="my-2">
              <ChibiSprite type={type} instinct={instinct ?? undefined} size={110} />
            </div>
          )}

          {/* Insight */}
          <p className="text-center font-serif text-lg leading-snug flex-1 flex items-center"
            style={{ color: "rgba(255,255,255,0.95)", textShadow: `0 1px 20px ${typeColor}44` }}>
            {insight}
          </p>

          {/* Footer CTA */}
          <div className="w-full mt-4">
            <div className="text-center px-4 py-2.5 rounded-full" style={{ background: `${typeColor}1a`, border: `1px solid ${typeColor}44` }}>
              <p className="text-xs font-bold" style={{ color: "white" }}>{ctaText}</p>
            </div>
            <p className="text-[9px] text-center mt-1.5 opacity-40">@thyself.app</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          onClick={handleShare}
          className="py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 text-white"
          style={{ background: `linear-gradient(135deg, ${typeColor}, #4f46e5)` }}
        >
          {status === "Shared" ? <Check className="w-3 h-3" /> : <Share2 className="w-3 h-3" />}
          {status ?? "Share to TikTok"}
        </button>
        <button
          onClick={handleDownload}
          className="py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.85)" }}
        >
          <Download className="w-3 h-3" />
          Save 1080×1920
        </button>
      </div>
    </div>
  );
}
