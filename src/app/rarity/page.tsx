"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import RarityCard from "@/components/RarityCard";

export default function RarityPage() {
  const { profile } = useProfile();
  const [attachment, setAttachment] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const s = localStorage.getItem("psyche-attachment-style");
    if (s) setAttachment(s);
  }, []);

  const type = profile.enneagramType ?? profile.enneagramCore ?? null;
  const instinct = (profile.enneagramSubtype as "sp" | "sx" | "so" | undefined)
    ?? (profile.instinctualStacking ? profile.instinctualStacking.slice(0, 2) as "sp" | "sx" | "so" : undefined)
    ?? null;

  return (
    <div className="min-h-screen text-white p-6 pb-20" style={{ background: "#0a0614" }}>
      <div className="max-w-md mx-auto">
        <Link href="/daily" className="inline-flex items-center gap-2 text-sm opacity-60 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="text-3xl font-bold mb-2">Your rarity</h1>
        <p className="text-sm opacity-60 mb-6 leading-relaxed">
          The joint probability of your cross-framework profile. No other personality app can compute this because no other app combines all four frameworks in one place.
        </p>

        {type ? (
          <RarityCard
            enneagramType={type}
            instinct={instinct}
            mbti={profile.cognitiveType ?? null}
            attachment={attachment}
            displayName={profile.displayName ?? null}
          />
        ) : (
          <div className="p-6 rounded-2xl text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-sm opacity-70 mb-3">Take the Enneagram assessment first to see your rarity.</p>
            <Link href="/assessments" className="text-violet-300 underline text-sm">Start here</Link>
          </div>
        )}

        {type && (
          <div className="mt-6 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-xs opacity-60 leading-relaxed">
              The more frameworks you complete, the more distinctive (and more accurate) your rarity becomes. Each added framework multiplies the specificity.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
