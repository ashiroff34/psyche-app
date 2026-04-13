"use client";

// "You and 0.3%" Rarity Card
//
// Shareable stat card that computes the joint rarity of the user's
// cross-framework profile (Enneagram × Instinct × MBTI × Attachment) and
// renders a branded chibi card ready for IG stories / Twitter / TikTok.
//
// Differentiation moat: no competitor can compute cross-framework rarity
// because none of them have all four frameworks in one app.

import { useRef, useState, useEffect } from "react";
import { Share2, Download, Check } from "lucide-react";
import ChibiSprite from "@/components/ChibiSprite";
import { computeRarity } from "@/data/type-prevalence";
import { enneagramTypes } from "@/data/enneagram";
import { getReferralShareUrl } from "@/lib/referral";
import { posthog } from "@/lib/posthog";

interface Props {
  enneagramType: number;
  instinct?: "sp" | "sx" | "so" | null;
  mbti?: string | null;
  attachment?: string | null;
  displayName?: string | null;
}

export default function RarityCard({ enneagramType, instinct, mbti, attachment, displayName }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const rarity = computeRarity({ enneagramType, instinct, mbti, attachment });
  const typeData = enneagramTypes.find(t => t.number === enneagramType);
  const typeColor = typeData?.color ?? "#a78bfa";

  async function handleShare() {
    if (!ref.current) return;
    setStatus("Rendering...");
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(ref.current, { cacheBust: true, pixelRatio: 3, backgroundColor: "transparent" });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `thyself-rarity-${enneagramType}.png`, { type: "image/png" });
      const text = `I'm a ${rarity.components.join(" · ")}, that's ${rarity.label}. 1 in ${rarity.oneIn}. Find your cross-framework rarity:`;
      const url = getReferralShareUrl();
      if (navigator.share && (navigator as any).canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text, url, title: "My Thyself rarity" });
        setStatus("Shared");
      } else if (navigator.share) {
        await navigator.share({ text: `${text} ${url}`, title: "My Thyself rarity" });
        setStatus("Shared");
      } else {
        await navigator.clipboard.writeText(`${text} ${url}`);
        setStatus("Link copied");
      }
      try { posthog.capture("rarity_card_shared", { percent: rarity.percent, oneIn: rarity.oneIn }); } catch {}
    } catch (e) {
      console.error("Rarity share failed:", e);
      setStatus("Try again");
    } finally {
      setTimeout(() => { if (mountedRef.current) setStatus(null); }, 2200);
    }
  }

  async function handleDownload() {
    if (!ref.current) return;
    setStatus("Rendering...");
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(ref.current, { cacheBust: true, pixelRatio: 3, backgroundColor: "transparent" });
      const link = document.createElement("a");
      link.download = `thyself-rarity-${enneagramType}.png`;
      link.href = dataUrl;
      link.click();
      setStatus("Saved");
      try { posthog.capture("rarity_card_downloaded", { percent: rarity.percent }); } catch {}
    } catch (e) {
      console.error(e);
      setStatus("Try again");
    } finally {
      setTimeout(() => { if (mountedRef.current) setStatus(null); }, 2200);
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div
        ref={ref}
        className="relative rounded-3xl overflow-hidden p-8 text-center"
        style={{
          background: `linear-gradient(160deg, ${typeColor}22 0%, #0a0614 60%, #0a0614 100%)`,
          border: `1px solid ${typeColor}44`,
          minHeight: 420,
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 20%, ${typeColor}1a 0%, transparent 70%)`,
        }} />
        <div className="relative">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: `${typeColor}cc` }}>
            Thyself · Cross-framework rarity
          </p>
          <div className="flex justify-center mb-3">
            <ChibiSprite type={enneagramType} instinct={instinct ?? undefined} size={140} />
          </div>
          <p className="text-[11px] opacity-60 mb-1">
            {rarity.components.join("  ·  ")}
          </p>
          <p className="text-4xl font-black mb-1" style={{ color: "white", textShadow: `0 2px 20px ${typeColor}66` }}>
            {rarity.label}
          </p>
          <p className="text-sm opacity-70 mb-5">
            1 in {rarity.oneIn.toLocaleString()}
          </p>
          <div className="inline-block px-4 py-2 rounded-full" style={{ background: `${typeColor}18`, border: `1px solid ${typeColor}35` }}>
            <p className="text-xs font-semibold" style={{ color: "white" }}>
              {displayName ? `${displayName} is distinctive` : "You are distinctive"}
            </p>
          </div>
          <p className="text-[9px] opacity-40 mt-6">
            Based on joint prevalence across frameworks (Riso-Hudson, MBTI Manual, Bartholomew &amp; Horowitz).
          </p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          onClick={handleShare}
          className="py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 text-white"
          style={{ background: `linear-gradient(135deg, ${typeColor}, #4f46e5)` }}
        >
          {status === "Shared" ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
          {status ?? "Share"}
        </button>
        <button
          onClick={handleDownload}
          className="py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.85)" }}
        >
          <Download className="w-4 h-4" />
          Save
        </button>
      </div>
    </div>
  );
}
