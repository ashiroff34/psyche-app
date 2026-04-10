"use client";

// TikTok Studio
//
// Lets the user turn any insight into a branded 9:16 vertical frame ready
// for TikTok / Reels / Shorts / IG Stories. Pipeline for Ari's science
// comm account and user-generated distribution.

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Shuffle } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import TikTokFrame from "@/components/TikTokFrame";
import { TYPE_WPFA } from "@/data/wound-passion-fixation-armor";
import { useSubtypeAwareCopy } from "@/hooks/useSubtypeAwareCopy";

export default function TikTokStudioPage() {
  const { profile } = useProfile();
  const subtypeCopy = useSubtypeAwareCopy();
  const type = profile.enneagramType ?? profile.enneagramCore ?? null;
  const instinct = (profile.enneagramSubtype as "sp" | "sx" | "so" | undefined)
    ?? (profile.instinctualStacking ? profile.instinctualStacking.slice(0, 2) as "sp" | "sx" | "so" : undefined)
    ?? null;

  const [insight, setInsight] = useState<string>("");
  const [kicker, setKicker] = useState<string>("Today's reflection");

  const presets = (() => {
    if (!type) return [{ label: "Custom", kicker: "Today's reflection", text: "" }];
    const wpfa = TYPE_WPFA[type];
    return [
      { label: "Subtype growth", kicker: "Growth prompt", text: subtypeCopy("daily.growth.prompt") },
      { label: "Wound", kicker: "The wound", text: wpfa?.wound ?? "" },
      { label: "Passion", kicker: "The passion", text: wpfa?.passion ?? "" },
      { label: "Fixation", kicker: "The fixation", text: wpfa?.fixation ?? "" },
      { label: "Armor", kicker: "The armor", text: wpfa?.armor ?? "" },
      { label: "Custom", kicker: "Today's reflection", text: "" },
    ].filter(p => p.text || p.label === "Custom");
  })();

  useEffect(() => {
    if (presets.length && !insight) {
      setInsight(presets[0].text);
      setKicker(presets[0].kicker);
    }
  }, [presets, insight]);

  function randomize() {
    const real = presets.filter(p => p.text);
    if (!real.length) return;
    const pick = real[Math.floor(Math.random() * real.length)];
    setInsight(pick.text);
    setKicker(pick.kicker);
  }

  return (
    <div className="min-h-screen text-white p-6 pb-20" style={{ background: "#0a0614" }}>
      <div className="max-w-md mx-auto">
        <Link href="/daily" className="inline-flex items-center gap-2 text-sm opacity-60 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="text-3xl font-bold mb-2">TikTok Studio</h1>
        <p className="text-sm opacity-60 mb-6 leading-relaxed">
          Turn any insight into a branded 9:16 vertical frame. Drop it straight into TikTok, Reels, Shorts, or IG Stories.
        </p>

        {/* Preset picker */}
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-widest opacity-60 mb-2">Insight presets</p>
          <div className="flex flex-wrap gap-2">
            {presets.map(p => (
              <button
                key={p.label}
                onClick={() => { setInsight(p.text); setKicker(p.kicker); }}
                className="text-xs px-3 py-1.5 rounded-full transition-all"
                style={{
                  background: insight === p.text ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${insight === p.text ? "rgba(139,92,246,0.55)" : "rgba(255,255,255,0.08)"}`,
                  color: insight === p.text ? "#c4b5fd" : "rgba(255,255,255,0.75)",
                }}
              >
                {p.label}
              </button>
            ))}
            <button
              onClick={randomize}
              className="text-xs px-3 py-1.5 rounded-full flex items-center gap-1"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.75)" }}
            >
              <Shuffle className="w-3 h-3" /> Shuffle
            </button>
          </div>
        </div>

        {/* Editable insight text */}
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-widest opacity-60 mb-2">Insight text</p>
          <textarea
            value={insight}
            onChange={e => setInsight(e.target.value)}
            rows={4}
            maxLength={280}
            placeholder="Write an insight or pick a preset above"
            className="w-full text-sm py-3 px-4 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
          />
          <p className="text-[10px] opacity-50 text-right mt-1">{insight.length} / 280</p>
        </div>

        {/* Frame preview + share */}
        <TikTokFrame
          insight={insight || "A tiny act of self-honesty is enough to begin."}
          kicker={kicker}
          type={type}
          instinct={instinct}
        />

        <p className="text-[11px] opacity-50 text-center mt-6 leading-relaxed">
          Exports as 1080×1920 PNG. Open in TikTok / Reels / Stories, set as background, add audio if you want.
        </p>
      </div>
    </div>
  );
}
