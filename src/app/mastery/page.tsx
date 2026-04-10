"use client";

// Mastery Map (SDT competence, Csikszentmihalyi flow)
//
// Replaces streak-centricity with a visible competence map. Deci & Ryan's
// Self-Determination Theory: autonomy, competence, relatedness. This surfaces
// competence. Deci 1971 crowd-out: extrinsic rewards (tokens/XP) on already-
// intrinsic behaviors (self-reflection) decrease engagement when removed.
// The mastery map keeps competence signals without extrinsic poisoning.

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, Check, Star } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { usePsychometrics } from "@/hooks/usePsychometrics";

interface Domain {
  id: string;
  name: string;
  description: string;
  unlockThreshold: number; // 0-100 mastery needed to unlock
  href: string;
  color: string;
}

const DOMAINS: Domain[] = [
  { id: "core", name: "Core Type", description: "Your Enneagram type, wing, and instinctual variant.", unlockThreshold: 0, href: "/enneagram", color: "#8b5cf6" },
  { id: "values", name: "Values", description: "Schwartz Basic Values, what you prioritize.", unlockThreshold: 10, href: "/assessments/values", color: "#d946ef" },
  { id: "aspects", name: "Big Five Aspects", description: "10-aspect personality trait profile.", unlockThreshold: 15, href: "/assessments/aspects", color: "#a78bfa" },
  { id: "subtypes", name: "Subtypes", description: "27 instinctual subtypes, how your type expresses differently.", unlockThreshold: 25, href: "/enneagram/learn", color: "#f59e0b" },
  { id: "shadow", name: "Shadow Work", description: "Jungian cognitive shadow, grip states, function loops.", unlockThreshold: 40, href: "/journal", color: "#ef4444" },
  { id: "relationships", name: "Relationships", description: "Attachment, relational patterns, compatibility dynamics.", unlockThreshold: 30, href: "/relational", color: "#ec4899" },
  { id: "drift", name: "Drift", description: "Longitudinal tracking of who you're becoming.", unlockThreshold: 35, href: "/drift", color: "#10b981" },
  { id: "selves", name: "Context Selves", description: "Work, home, and love variants of who you are.", unlockThreshold: 45, href: "/selves", color: "#06b6d4" },
  { id: "triangulation", name: "Three Mirrors", description: "Full triangulation, where your lenses disagree.", unlockThreshold: 50, href: "/mirrors", color: "#eab308" },
];

export default function MasteryPage() {
  const { profile } = useProfile();
  const { schwartz, aspects } = usePsychometrics();
  const [mastery, setMastery] = useState(0);

  useEffect(() => {
    // Compute mastery score from completed actions
    let m = 0;
    if (profile.enneagramType) m += 15;
    if (profile.enneagramSubtype || profile.instinctualStacking) m += 5;
    if (profile.cognitiveType) m += 10;
    if (profile.bigFiveScores?.length) m += 10;
    if (schwartz) m += 10;
    if (aspects) m += 10;
    if (profile.assessmentsTaken?.length) m += Math.min(profile.assessmentsTaken.length * 5, 20);
    const stateHistory = (() => {
      try { const r = localStorage.getItem("psyche-state-history"); return r ? JSON.parse(r) : []; } catch { return []; }
    })();
    m += Math.min(stateHistory.length * 2, 10);
    setMastery(Math.min(m, 100));
  }, [profile, schwartz, aspects]);

  return (
    <div className="min-h-screen text-white p-6 pb-20" style={{ background: "#0a0614" }}>
      <div className="max-w-md mx-auto">
        <Link href="/daily" className="inline-flex items-center gap-2 text-sm opacity-60 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-2">Mastery Map</h1>
          <p className="text-sm opacity-60 mb-2 leading-relaxed">
            Self-knowledge domains you've explored. No time pressure, no streaks. Just depth.
          </p>
          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-[10px] uppercase tracking-widest opacity-60 font-bold">Overall mastery</span>
              <span className="text-sm font-bold">{mastery}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
              <motion.div className="h-full" initial={{ width: 0 }} animate={{ width: `${mastery}%` }} transition={{ duration: 1 }}
                style={{ background: "linear-gradient(90deg,#8b5cf6,#d946ef)" }} />
            </div>
          </div>
        </motion.div>

        <div className="space-y-3">
          {DOMAINS.map((d, i) => {
            const unlocked = mastery >= d.unlockThreshold;
            return (
              <motion.div key={d.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                {unlocked ? (
                  <Link href={d.href} className="block p-4 rounded-2xl transition-all active:scale-[0.98]"
                    style={{ background: `${d.color}12`, border: `1px solid ${d.color}35` }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${d.color}25` }}>
                        {mastery >= d.unlockThreshold + 20 ? <Star className="w-4 h-4" style={{ color: d.color }} /> : <Check className="w-4 h-4" style={{ color: d.color }} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold">{d.name}</p>
                        <p className="text-[11px] opacity-60">{d.description}</p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="p-4 rounded-2xl opacity-50" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <Lock className="w-4 h-4 opacity-50" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold">{d.name}</p>
                        <p className="text-[10px] opacity-50">Unlocks at {d.unlockThreshold}% mastery</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
