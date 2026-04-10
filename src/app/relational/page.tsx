"use client";

// Unified Relational Profile
//
// Combines Enneagram × Attachment × Big Five Aspects into one view of
// how you show up in relationships. Three lenses because a single one
// misses too much, e.g., a counter-phobic 6 with dismissive attachment
// looks completely different from a 6 with anxious attachment, even
// though they share a core type.

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Heart } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { usePsychometrics } from "@/hooks/usePsychometrics";
import { attachmentStyles, type AttachmentStyle } from "@/data/attachment";
import { ASPECTS } from "@/data/psychometrics/big-five-aspects";

// Enneagram × Attachment intersection insights
// Based on research: Cottraux & Hauser (2010), Henry et al. (2015),
// and Chestnut's clinical observations on how instinctual patterns
// interact with attachment strategies.
const INTERSECTION_INSIGHTS: Record<string, string> = {
  "1-anxious": "You seek to be right AND to be reassured. The inner critic becomes a voice that scans for abandonment. Growth: let imperfection be safe.",
  "1-dismissive": "You manage the discomfort of needing others by focusing on standards and correctness instead. Growth: the rules are not a substitute for contact.",
  "1-secure": "Your standards are not weaponized against connection. You repair well.",
  "2-anxious": "Helping is a way to stay close. You may give more than you have to keep the other from leaving. Growth: notice the ask underneath the gift.",
  "2-dismissive": "Rare. You give strategically but keep your actual needs at arm's length, even from intimates. Growth: let someone in on the weather inside.",
  "2-secure": "Your care is freely given, not a down payment on being loved.",
  "3-anxious": "The image you project is scanning for approval. Rejection reads as devastation. Growth: love that is earned is not love.",
  "3-dismissive": "You prove yourself in the world instead of risking the vulnerability of closeness. Growth: achievement will not make you feel loved.",
  "3-secure": "You can set aside the image and be ordinary with one person.",
  "4-anxious": "Push-pull on overdrive. You long for closeness and then recoil when it arrives. Growth: the longing is the wound, not the answer.",
  "4-dismissive": "Rare. You romanticize unavailability and avoid the mess of real intimacy. Growth: ordinary love is not a failure of depth.",
  "4-secure": "You can feel deeply without drowning the other person in it.",
  "5-anxious": "Surprising but common. You need closeness but cannot tolerate engulfment, so you pull back to protect your energy. Growth: small, predictable doses build trust.",
  "5-dismissive": "The most natural attachment pattern for 5s. You retreat into the inner world when intimacy becomes demanding. Growth: being reachable is a practice.",
  "5-secure": "You can be alone and be met without confusing the two.",
  "6-anxious": "Double anxiety, hypervigilant for signs the other is leaving. You test constantly. Growth: the worst case is not the most likely.",
  "6-dismissive": "Counter-phobic avoidance, you push others away before they can disappoint you. Growth: the threat is inside, not outside.",
  "6-secure": "You know you are held even when you cannot see the hand.",
  "7-anxious": "Rare combination. Beneath the planning of the next thing is a fear that THIS will not hold. Growth: staying is not the same as being trapped.",
  "7-dismissive": "You use novelty to avoid the intensity of intimate connection. Growth: the next thing will not be better.",
  "7-secure": "You can stay with one person and still feel free.",
  "8-anxious": "Rare. Vulnerability feels like annihilation, so you push hard to stay in control even inside closeness. Growth: the soft part is the point.",
  "8-dismissive": "The natural 8 pattern, you armor up and call it strength. Growth: softness is precision, not weakness.",
  "8-secure": "You can be powerful and held without it feeling like contradiction.",
  "9-anxious": "You merge to stay close, losing yourself in the other's rhythm. Growth: your preferences are not a threat to the relationship.",
  "9-dismissive": "Rare. You check out to avoid conflict and call it peace. Growth: numbing is not the same as calm.",
  "9-secure": "You show up as yourself without fearing the disruption.",
};

export default function RelationalPage() {
  const { profile } = useProfile();
  const { aspects } = usePsychometrics();
  const [attachmentStyle, setAttachmentStyle] = useState<AttachmentStyle | null>(null);

  // Try reading a persisted attachment result if it exists
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("psyche-attachment-style");
    if (saved && ["secure", "anxious", "dismissive", "fearful"].includes(saved)) {
      setAttachmentStyle(saved as AttachmentStyle);
    }
  }, []);

  const saveAttachment = (s: AttachmentStyle) => {
    setAttachmentStyle(s);
    if (typeof window !== "undefined") localStorage.setItem("psyche-attachment-style", s);
  };

  const type = profile.enneagramType ?? profile.enneagramCore ?? null;
  const intersectionKey = type && attachmentStyle ? `${type}-${attachmentStyle}` : null;
  const intersectionInsight = intersectionKey ? INTERSECTION_INSIGHTS[intersectionKey] : null;

  // Aspect-level relational implications
  const relationalAspects = aspects
    ? [
        { name: "Compassion", score: aspects.scores.compassion, meaning: "emotional attunement to others" },
        { name: "Politeness", score: aspects.scores.politeness, meaning: "willingness to defer in conflict" },
        { name: "Enthusiasm", score: aspects.scores.enthusiasm, meaning: "warmth and desire for closeness" },
        { name: "Withdrawal", score: aspects.scores.withdrawal, meaning: "tendency to retreat under stress" },
      ]
    : [];

  return (
    <div className="min-h-screen text-white p-6 pb-20" style={{ background: "#0a0614" }}>
      <div className="max-w-md mx-auto">
        <Link href="/compatibility" className="inline-flex items-center gap-2 text-sm opacity-60 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-fuchsia-300" />
            <h1 className="text-3xl font-bold">Relational You</h1>
          </div>
          <p className="text-sm opacity-60 mb-6 leading-relaxed">
            How you show up in love and closeness. Three lenses: your motivation (Enneagram), your attachment pattern, and your trait-level warmth and withdrawal.
          </p>
        </motion.div>

        {/* Enneagram lens */}
        <div className="mb-4 p-4 rounded-2xl" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.22)" }}>
          <p className="text-[10px] uppercase tracking-widest text-violet-300 font-bold mb-1">Motivation</p>
          {type ? (
            <>
              <p className="text-lg font-bold">Type {type}{profile.enneagramSubtype ? ` · ${profile.enneagramSubtype.toUpperCase()}` : ""}</p>
              <p className="text-xs opacity-70 mt-1">
                What pulls you toward and away from closeness, independent of your behavior.
              </p>
            </>
          ) : (
            <Link href="/assessments" className="text-sm text-violet-300 underline">Take the Enneagram assessment</Link>
          )}
        </div>

        {/* Attachment lens */}
        <div className="mb-4 p-4 rounded-2xl" style={{ background: "rgba(217,70,239,0.08)", border: "1px solid rgba(217,70,239,0.22)" }}>
          <p className="text-[10px] uppercase tracking-widest text-fuchsia-300 font-bold mb-1">Attachment</p>
          {attachmentStyle ? (
            <>
              <p className="text-lg font-bold">{attachmentStyles[attachmentStyle].title}</p>
              <p className="text-xs opacity-70 mt-1 leading-snug">{attachmentStyles[attachmentStyle].corePattern}</p>
              <button onClick={() => setAttachmentStyle(null)} className="text-[11px] text-fuchsia-300 underline mt-2">Change</button>
            </>
          ) : (
            <>
              <p className="text-xs opacity-70 mb-2">Pick your style, or take the full assessment.</p>
              <div className="grid grid-cols-2 gap-2">
                {(["secure", "anxious", "dismissive", "fearful"] as const).map(s => (
                  <button key={s} onClick={() => saveAttachment(s)}
                    className="py-2 px-3 rounded-xl text-xs font-semibold"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    {attachmentStyles[s].title}
                  </button>
                ))}
              </div>
              <Link href="/assessments/attachment" className="text-[11px] text-fuchsia-300 underline mt-3 inline-block">
                Or take the full assessment
              </Link>
            </>
          )}
        </div>

        {/* Aspects lens */}
        <div className="mb-4 p-4 rounded-2xl" style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.22)" }}>
          <p className="text-[10px] uppercase tracking-widest text-purple-300 font-bold mb-2">Trait lens</p>
          {aspects ? (
            <div className="space-y-2">
              {relationalAspects.map(a => (
                <div key={a.name}>
                  <div className="flex justify-between items-baseline">
                    <p className="text-xs font-semibold">{a.name}</p>
                    <span className="text-[11px] font-mono opacity-70">{a.score}</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden mb-1" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div className="h-full" style={{ width: `${a.score}%`, background: "linear-gradient(90deg,#8b5cf6,#d946ef)" }} />
                  </div>
                  <p className="text-[10px] opacity-50">{a.meaning}</p>
                </div>
              ))}
            </div>
          ) : (
            <Link href="/assessments/aspects" className="text-sm text-purple-300 underline">Take the Aspects assessment</Link>
          )}
        </div>

        {/* Intersection insight */}
        {intersectionInsight && (
          <div className="mb-6 p-4 rounded-2xl" style={{ background: "rgba(234,179,8,0.06)", border: "1px solid rgba(234,179,8,0.25)" }}>
            <p className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: "#fde68a" }}>
              Type {type} × {attachmentStyle && attachmentStyles[attachmentStyle].title}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.9)" }}>{intersectionInsight}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Link href="/compatibility" className="p-3 rounded-xl text-center text-sm font-semibold"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            Compatibility
          </Link>
          <Link href="/mirrors" className="p-3 rounded-xl text-center text-sm font-semibold"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            All mirrors
          </Link>
        </div>
      </div>
    </div>
  );
}
