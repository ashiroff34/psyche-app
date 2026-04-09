"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Heart, Gift, Copy, Check } from "lucide-react";
import TypeIdentityCard from "@/components/TypeIdentityCard";
import { useProfile } from "@/hooks/useProfile";
import { posthog, EVENTS } from "@/lib/posthog";
import { getOrCreateReferralCode, getReferralShareUrl } from "@/lib/referral";

export default function IdentityPage() {
  const { profile, loaded } = useProfile();
  const [ready, setReady] = useState(false);
  const [refCode, setRefCode] = useState("");
  const [refUrl, setRefUrl] = useState("");
  const [refCopied, setRefCopied] = useState(false);

  useEffect(() => {
    if (loaded) {
      setReady(true);
      setRefCode(getOrCreateReferralCode());
      setRefUrl(getReferralShareUrl());
      // Analytics: identity_card_viewed with type context
      try {
        const t = profile.enneagramType ?? profile.enneagramCore ?? null;
        posthog.capture(EVENTS.IDENTITY_CARD_VIEWED, {
          enneagramType: t,
          has_type: !!t,
        });
      } catch {}
    }
  }, [loaded, profile]);

  async function copyRefUrl() {
    try {
      await navigator.clipboard.writeText(refUrl);
      setRefCopied(true);
      setTimeout(() => setRefCopied(false), 2000);
    } catch {}
  }

  const type = profile.enneagramType ?? profile.enneagramCore ?? 0;
  const instinct = profile.instinctualStacking?.split("/")?.[0];
  const tritype = profile.tritype;
  const cognitiveType = profile.cognitiveType ?? profile.mbtiType;
  const displayName = profile.displayName;
  // enneagramWing comes through as a string like "4" or "4w5" — extract the wing number
  const wingNumber = profile.enneagramWing
    ? parseInt(String(profile.enneagramWing).replace(/[^0-9]/g, ""), 10) || undefined
    : undefined;

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f0a1e" }}>
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Loading your identity…
        </motion.div>
      </div>
    );
  }

  if (!type) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: "#0f0a1e" }}>
        <h1 className="text-2xl font-serif font-bold mb-3" style={{ color: "rgba(255,255,255,0.9)" }}>
          No type yet
        </h1>
        <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
          Take the quiz to discover your type — then come back to claim your identity card.
        </p>
        <Link
          href="/assessments/quick"
          className="px-5 py-3 rounded-2xl text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg, #8b5cf6, #d946ef)" }}
        >
          Find my type →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32 pt-20" style={{ background: "#0f0a1e" }}>
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <div className="mb-6 text-center">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.25em] mb-2"
            style={{ color: "rgba(167,139,250,0.75)" }}
          >
            Your Identity
          </p>
          <h1
            className="text-2xl md:text-3xl font-serif font-bold mb-2"
            style={{ color: "rgba(255,255,255,0.93)" }}
          >
            A card for the parts of you that can&apos;t fit in a sentence
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Your type, your subtype, your cognitive profile — in one shareable piece.
            Tap the card to see what&apos;s underneath.
          </p>
        </div>

        {/* The card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="my-8"
        >
          <TypeIdentityCard
            type={type}
            instinct={instinct}
            tritype={tritype}
            cognitiveType={cognitiveType}
            displayName={displayName}
            wingNumber={wingNumber}
          />
        </motion.div>

        {/* Meaning of sharing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 p-4 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(236,72,153,0.15)" }}
            >
              <Heart className="w-4 h-4 text-pink-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold mb-1" style={{ color: "rgba(255,255,255,0.8)" }}>
                Why share it?
              </p>
              <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                Most people can&apos;t name the thing that drives them. Naming yours —
                and letting others see it — is part of how you stop being defined by
                the armor. Not because it&apos;s cute to share. Because what you show
                becomes easier to see clearly in yourself.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Invite friends card — the referral loop */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-4 p-4 rounded-2xl overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, rgba(251,191,36,0.1), rgba(245,158,11,0.05))",
            border: "1px solid rgba(251,191,36,0.25)",
          }}
        >
          <div className="flex items-start gap-3 mb-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(251,191,36,0.18)" }}
            >
              <Gift className="w-4 h-4" style={{ color: "#fbbf24" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold mb-1" style={{ color: "#fbbf24" }}>
                Invite a friend, you both get tokens
              </p>
              <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                When someone joins via your link, they get a welcome bonus and you earn tokens too.
                The Share and Download buttons above already include your personal referral link.
              </p>
            </div>
          </div>

          {refUrl && (
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl mt-2"
              style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(251,191,36,0.2)" }}
            >
              <code
                className="flex-1 text-[10px] font-mono truncate min-w-0"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                {refUrl}
              </code>
              <button
                onClick={copyRefUrl}
                className="shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all active:scale-95"
                style={{
                  background: refCopied ? "rgba(52,211,153,0.2)" : "rgba(251,191,36,0.18)",
                  color: refCopied ? "#6ee7b7" : "#fbbf24",
                  border: refCopied ? "1px solid rgba(52,211,153,0.4)" : "1px solid rgba(251,191,36,0.3)",
                }}
              >
                {refCopied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
              </button>
            </div>
          )}

          {refCode && (
            <p className="mt-2 text-[10px] text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
              Your code: <strong style={{ color: "rgba(251,191,36,0.7)" }}>{refCode}</strong>
            </p>
          )}
        </motion.div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link
            href="/daily"
            className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to daily practice
          </Link>
        </div>
      </div>
    </div>
  );
}
