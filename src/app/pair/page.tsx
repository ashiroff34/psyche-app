"use client";

// Pair Challenge
//
// Social commitment device + Berger social currency. User invites a friend.
// The friend lands on this page via a pair link, takes a quick 6-item mini
// assessment, and both land on the compatibility result together.
//
// Ethically designed:
//   - Both parties must opt in individually.
//   - No scraping contacts.
//   - No "invite N friends to unlock" hard wall. Reward is purely unlocked
//     for the inviter when the friend completes, both get a free week.

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Heart, Share2, Check } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { getOrCreateReferralCode, getReferralShareUrl } from "@/lib/referral";
import { enneagramTypes } from "@/data/enneagram";
import ChibiSprite from "@/components/ChibiSprite";
import { posthog } from "@/lib/posthog";

// Ultra-short pair assessment (6 questions, one per triad center pair)
const PAIR_QUESTIONS: Array<{ text: string; scores: Record<number, number> }> = [
  {
    text: "When something goes wrong in a project, my first instinct is to...",
    scores: {
      1: 3, // fix what's wrong
      3: 2, // recover the win
      5: 1, // analyze what went wrong
      6: 3, // worry about what might still go wrong
    },
  },
  {
    text: "In a group of friends, I tend to...",
    scores: {
      2: 3, // take care of everyone
      7: 3, // bring the energy
      8: 2, // take charge
      9: 2, // go with what the group wants
    },
  },
  {
    text: "When I feel misunderstood, I...",
    scores: {
      4: 3, // withdraw into my feelings
      5: 3, // withdraw into my head
      1: 1, // state the correct version clearly
      8: 1, // push back
    },
  },
  {
    text: "I would describe my inner life as...",
    scores: {
      4: 3, // emotionally rich
      5: 3, // intellectually driven
      7: 2, // full of options
      9: 2, // quietly peaceful
    },
  },
  {
    text: "When I am at my best, I am...",
    scores: {
      1: 2, // principled
      2: 2, // generous
      3: 2, // effective
      6: 2, // reliable
      8: 2, // powerful
    },
  },
  {
    text: "Under stress, I...",
    scores: {
      1: 2, // get rigid
      2: 1, // feel hurt
      3: 2, // power through
      4: 2, // sink
      5: 1, // retreat
      6: 3, // catastrophize
      7: 2, // scatter
      8: 3, // harden
      9: 2, // numb out
    },
  },
];

function PairInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { profile } = useProfile();
  const fromType = searchParams.get("from");
  const fromCode = searchParams.get("code");

  const myType = profile.enneagramType ?? profile.enneagramCore ?? null;
  const [mode, setMode] = useState<"inviter" | "invitee">(fromType ? "invitee" : "inviter");
  const [idx, setIdx] = useState(0);
  const [scores, setScores] = useState<Record<number, number>>({});
  const [pickedFriendType, setPickedFriendType] = useState<number | null>(null);
  const [shareStatus, setShareStatus] = useState<string | null>(null);

  useEffect(() => {
    if (fromCode && typeof window !== "undefined") {
      try {
        const existing = localStorage.getItem("psyche-referral-code");
        if (!existing) localStorage.setItem("psyche-referral-code", fromCode);
      } catch {}
    }
  }, [fromCode]);

  function answer(_yesNo: boolean | null, optionScores: Record<number, number>) {
    const next = { ...scores };
    for (const [t, v] of Object.entries(optionScores)) {
      next[Number(t)] = (next[Number(t)] ?? 0) + v;
    }
    setScores(next);
    if (idx < PAIR_QUESTIONS.length - 1) {
      setIdx(idx + 1);
    } else {
      // Compute top type
      const sorted = Object.entries(next).sort(([, a], [, b]) => b - a);
      const topType = sorted.length ? Number(sorted[0][0]) : 9;
      setPickedFriendType(topType);
      try { posthog.capture("pair_mini_completed", { friendType: topType, fromType }); } catch {}
    }
  }

  async function handleInviteShare() {
    if (!myType) return;
    const code = getOrCreateReferralCode();
    const origin = typeof window !== "undefined" ? window.location.origin : "https://psyche-app-two.vercel.app";
    const pairUrl = `${origin}/pair?from=${myType}&code=${code}`;
    const text = `I'm a Type ${myType} on Thyself. Take this 1-minute quiz and see our compatibility.`;
    try {
      if (navigator.share) {
        await navigator.share({ text, url: pairUrl, title: "See our compatibility" });
        setShareStatus("Shared");
      } else {
        await navigator.clipboard.writeText(`${text}\n${pairUrl}`);
        setShareStatus("Link copied");
      }
      try { posthog.capture("pair_invite_sent", { from_type: myType }); } catch {}
    } catch (e) {
      setShareStatus("Try again");
    } finally {
      setTimeout(() => setShareStatus(null), 2200);
    }
  }

  // ── Invitee: take the mini quiz, then show compatibility ────────────────
  if (mode === "invitee" && fromType) {
    const friendTypeNum = Number(fromType);
    const friendTypeData = enneagramTypes.find(t => t.number === friendTypeNum);
    if (pickedFriendType) {
      // Show compat result. Deep-link to /compatibility with both types set.
      return (
        <div className="min-h-screen text-white p-6" style={{ background: "#0a0614" }}>
          <div className="max-w-md mx-auto text-center pt-12">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-[10px] uppercase tracking-widest opacity-60 mb-3">Your result</p>
              <div className="flex items-center justify-center gap-4 mb-4">
                <ChibiSprite type={pickedFriendType} size={110} />
                <div className="flex flex-col items-center">
                  <Heart className="w-5 h-5 text-fuchsia-300 mb-1" />
                  <span className="text-[10px] opacity-60">&amp;</span>
                </div>
                <ChibiSprite type={friendTypeNum} size={110} />
              </div>
              <h1 className="text-3xl font-bold mb-2">Type {pickedFriendType} + Type {friendTypeNum}</h1>
              <p className="text-sm opacity-70 mb-6 leading-relaxed">
                You took the short version. See the full compatibility breakdown, strengths, growth edges, and relational dynamics.
              </p>
              <button
                onClick={() => router.push(`/compatibility?myType=${pickedFriendType}&friend=${friendTypeNum}`)}
                className="w-full py-3 rounded-2xl font-semibold text-white mb-3"
                style={{ background: "linear-gradient(135deg,#8b5cf6,#d946ef)" }}
              >
                See full compatibility
              </button>
              <Link href="/" className="text-sm text-violet-300 underline">Or start my own full assessment</Link>
            </motion.div>
          </div>
        </div>
      );
    }

    const q = PAIR_QUESTIONS[idx];
    const options: Array<{ label: string; scores: Record<number, number> }> = [];
    // Build 4 options per question from the scores dict. Each option maps to one type.
    const entries = Object.entries(q.scores).sort(([, a], [, b]) => b - a).slice(0, 4);
    for (const [t, v] of entries) {
      const tn = Number(t);
      const td = enneagramTypes.find(x => x.number === tn);
      options.push({
        label: td?.name ?? `Type ${tn}`,
        scores: { [tn]: v, ...(v > 2 ? {} : {}) },
      });
    }

    return (
      <div className="min-h-screen text-white p-6" style={{ background: "#0a0614" }}>
        <div className="max-w-md mx-auto">
          <p className="text-[10px] uppercase tracking-widest opacity-60 mb-2">A friend invited you</p>
          <div className="flex items-center gap-2 mb-6">
            <ChibiSprite type={friendTypeNum} size={40} />
            <p className="text-sm opacity-80">
              A Type {friendTypeNum}{friendTypeData ? `, ${friendTypeData.name}` : ""} wants to see your compatibility.
            </p>
          </div>
          <div className="h-1 rounded-full overflow-hidden mb-6" style={{ background: "rgba(255,255,255,0.08)" }}>
            <motion.div className="h-full" style={{ background: "linear-gradient(90deg,#8b5cf6,#d946ef)" }}
              animate={{ width: `${((idx + 1) / PAIR_QUESTIONS.length) * 100}%` }} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <p className="text-base leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.92)" }}>{q.text}</p>
              <div className="space-y-2">
                {options.map((o, i) => (
                  <button key={i} onClick={() => answer(null, o.scores)}
                    className="w-full py-3 px-4 rounded-xl text-left text-sm font-medium transition-all active:scale-[0.98]"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)" }}>
                    {o.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // ── Inviter: send the link ──────────────────────────────────────────────
  return (
    <div className="min-h-screen text-white p-6" style={{ background: "#0a0614" }}>
      <div className="max-w-md mx-auto">
        <Link href="/daily" className="inline-flex items-center gap-2 text-sm opacity-60 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-fuchsia-300" />
          <h1 className="text-3xl font-bold">Pair challenge</h1>
        </div>
        <p className="text-sm opacity-60 mb-6 leading-relaxed">
          Invite one person. They take a 1-minute mini quiz. You both see the full compatibility, and both get one week of Pro for free.
        </p>

        {!myType && (
          <div className="p-4 rounded-2xl mb-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-sm opacity-70">Take your own assessment first, then come back to invite someone.</p>
            <Link href="/assessments" className="text-sm text-violet-300 underline mt-2 inline-block">Start here</Link>
          </div>
        )}

        {myType && (
          <>
            <div className="flex items-center justify-center gap-4 mb-6 py-6">
              <ChibiSprite type={myType} size={120} />
              <div className="flex flex-col items-center">
                <Heart className="w-6 h-6 text-fuchsia-300 mb-1" />
                <span className="text-xs opacity-50">?</span>
              </div>
              <div className="w-[120px] h-[120px] rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.2)" }}>
                <span className="text-3xl opacity-40">?</span>
              </div>
            </div>

            <button
              onClick={handleInviteShare}
              className="w-full py-4 rounded-2xl font-bold text-white mb-3 flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg,#8b5cf6,#d946ef)" }}
            >
              {shareStatus === "Shared" || shareStatus === "Link copied" ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              {shareStatus ?? "Share my pair link"}
            </button>

            <div className="p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-xs uppercase tracking-widest opacity-60 mb-2">Both of you get</p>
              <ul className="text-sm space-y-1 opacity-85">
                <li>✓ Full cross-type compatibility breakdown</li>
                <li>✓ 1 week of Pro, free</li>
                <li>✓ A shared chibi card you can save</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function PairPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: "#0a0614" }} />}>
      <PairInner />
    </Suspense>
  );
}
