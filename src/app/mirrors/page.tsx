"use client";

// Three Mirrors Triangulation Dashboard
//
// Shows Enneagram motivation + Big Five Aspects + Schwartz Values side-by-side.
// The interesting insight is where the three lenses disagree.

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Compass, Layers, Heart, Sparkles } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { usePsychometrics } from "@/hooks/usePsychometrics";
import { SCHWARTZ_VALUES, type SchwartzValue } from "@/data/psychometrics/schwartz-values";
import { ASPECTS } from "@/data/psychometrics/big-five-aspects";

// Enneagram → expected values (rough mapping based on core motivation)
// Used only to flag places where the user's measured values diverge from
// what their type would typically emphasize, that's the interesting content.
const TYPE_EXPECTED_VALUES: Record<number, { high: SchwartzValue[]; low: SchwartzValue[] }> = {
  1: { high: ["conformity", "tradition", "security"], low: ["hedonism", "stimulation"] },
  2: { high: ["benevolence", "universalism"], low: ["power"] },
  3: { high: ["achievement", "power"], low: ["tradition"] },
  4: { high: ["selfDirection", "universalism"], low: ["conformity", "tradition"] },
  5: { high: ["selfDirection", "universalism"], low: ["power", "conformity"] },
  6: { high: ["security", "tradition", "conformity"], low: ["stimulation", "power"] },
  7: { high: ["stimulation", "hedonism", "selfDirection"], low: ["tradition", "conformity"] },
  8: { high: ["power", "selfDirection"], low: ["conformity", "tradition"] },
  9: { high: ["benevolence", "conformity", "tradition"], low: ["power", "achievement"] },
};

// Enneagram → expected aspects (rough motivational mapping)
const TYPE_EXPECTED_ASPECTS: Record<number, { high: string[]; low: string[] }> = {
  1: { high: ["industriousness", "orderliness", "politeness"], low: ["volatility"] },
  2: { high: ["compassion", "enthusiasm"], low: ["assertiveness"] },
  3: { high: ["industriousness", "assertiveness", "enthusiasm"], low: ["withdrawal"] },
  4: { high: ["opennessProper", "withdrawal"], low: ["orderliness"] },
  5: { high: ["intellect", "withdrawal"], low: ["enthusiasm", "politeness"] },
  6: { high: ["withdrawal", "politeness", "orderliness"], low: ["assertiveness"] },
  7: { high: ["enthusiasm", "assertiveness", "opennessProper"], low: ["orderliness", "politeness"] },
  8: { high: ["assertiveness", "volatility"], low: ["politeness", "compassion"] },
  9: { high: ["politeness", "compassion"], low: ["volatility", "assertiveness"] },
};

export default function MirrorsPage() {
  const { profile } = useProfile();
  const { schwartz, aspects } = usePsychometrics();

  const type = profile.enneagramType ?? profile.enneagramCore ?? null;
  const hasAll = !!(type && schwartz && aspects);

  // Generate divergence insights
  const insights: { title: string; body: string }[] = [];
  if (hasAll && type) {
    const expectedVals = TYPE_EXPECTED_VALUES[type];
    const expectedAspects = TYPE_EXPECTED_ASPECTS[type];

    // Does the measured top value match what the type predicts?
    const typeExpectedButAbsent = expectedVals.high.filter(v => !schwartz.topValues.includes(v));
    const typeExpectedLowButHigh = expectedVals.low.filter(v => schwartz.topValues.includes(v));

    if (typeExpectedButAbsent.length > 0) {
      const missing = typeExpectedButAbsent[0];
      const def = SCHWARTZ_VALUES.find(v => v.key === missing)!;
      insights.push({
        title: `A Type ${type} often emphasizes ${def.name}. Yours doesn't.`,
        body: `${def.definition} Your measured top values are different, which is worth paying attention to. Either your type is more nuanced than the standard profile, or you're living out of alignment with what your core motivation actually wants.`,
      });
    }
    if (typeExpectedLowButHigh.length > 0) {
      const surprising = typeExpectedLowButHigh[0];
      const def = SCHWARTZ_VALUES.find(v => v.key === surprising)!;
      insights.push({
        title: `Your ${def.name} is higher than most Type ${type}s.`,
        body: `${def.definition} This is a distinctive feature of how you show up. Honor it rather than flattening it.`,
      });
    }

    // Aspect disagreement with type prediction
    for (const expectedHigh of expectedAspects.high) {
      const score = aspects.scores[expectedHigh as keyof typeof aspects.scores];
      if (typeof score === "number" && score < 40) {
        const def = ASPECTS.find(a => a.key === expectedHigh);
        if (def) {
          insights.push({
            title: `Type ${type}s usually score high on ${def.name}. You scored ${score}.`,
            body: `${def.high} That's what the type predicts, but your measured score is on the other side. This is one of the most interesting kinds of data: motivation (type) pulls one way, trait (aspect) another. Growth here looks like honoring both signals instead of forcing one to fit the other.`,
          });
          break; // only surface one aspect divergence to keep it focused
        }
      }
    }

    // Split-aspect insight
    if (aspects.splitAspects.length > 0) {
      const split = aspects.splitAspects[0];
      const hi = ASPECTS.find(a => a.key === split.high)!;
      const lo = ASPECTS.find(a => a.key === split.low)!;
      insights.push({
        title: `You're split on ${split.factor}.`,
        body: `High ${hi.name}, low ${lo.name}. This is why the factor-level label doesn't fit: the two aspects inside it are pulling in different directions. Most single-factor Big Five tests would miss this.`,
      });
    }
  }

  return (
    <div className="min-h-screen text-white p-6 pb-20" style={{ background: "#0a0614" }}>
      <div className="max-w-md mx-auto">
        <Link href="/daily" className="inline-flex items-center gap-2 text-sm opacity-60 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-2">The Three Mirrors</h1>
          <p className="text-sm opacity-60 mb-6 leading-relaxed">
            Three independent lenses on your psychological pattern. The deepest self-knowledge lives where they disagree.
          </p>
        </motion.div>

        {/* ── Mirror 1: Enneagram (motivation) ── */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.25)" }}>
          <div className="flex items-center gap-2 mb-2">
            <Compass className="w-4 h-4 text-violet-300" />
            <p className="text-xs uppercase tracking-widest text-violet-300 font-bold">Mirror 1, Motivation</p>
          </div>
          <p className="text-lg font-bold">Enneagram</p>
          {type ? (
            <p className="text-sm opacity-80 mt-1">
              Type {type}{profile.enneagramWing ? ` (${profile.enneagramWing})` : ""}{profile.enneagramSubtype ? ` · ${profile.enneagramSubtype.toUpperCase()}` : ""}
            </p>
          ) : (
            <Link href="/assessments" className="text-sm text-violet-300 underline mt-1 inline-block">
              Start the assessment
            </Link>
          )}
          <p className="text-[11px] opacity-50 mt-2 leading-snug">
            Why you do what you do. Core fear, core desire, core motivation.
          </p>
        </motion.div>

        {/* ── Mirror 2: Big Five Aspects (trait) ── */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.25)" }}>
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-purple-300" />
            <p className="text-xs uppercase tracking-widest text-purple-300 font-bold">Mirror 2, Trait</p>
          </div>
          <p className="text-lg font-bold">Big Five Aspects</p>
          {aspects ? (
            <div className="mt-2">
              <p className="text-sm opacity-80">
                Top: {aspects.highestAspects.map(a => ASPECTS.find(x => x.key === a)?.name).join(", ")}
              </p>
              {aspects.splitAspects.length > 0 && (
                <p className="text-xs text-fuchsia-300 mt-1">
                  {aspects.splitAspects.length} split factor{aspects.splitAspects.length > 1 ? "s" : ""}
                </p>
              )}
              <Link href="/assessments/aspects" className="text-xs text-purple-300 underline mt-2 inline-block">
                Retake
              </Link>
            </div>
          ) : (
            <Link href="/assessments/aspects" className="text-sm text-purple-300 underline mt-1 inline-block">
              Start the assessment, 30 items, ~3 min
            </Link>
          )}
          <p className="text-[11px] opacity-50 mt-2 leading-snug">
            How you consistently behave. 10 aspects, because most people are split within a factor.
          </p>
        </motion.div>

        {/* ── Mirror 3: Schwartz Values ── */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="mb-6 p-5 rounded-2xl" style={{ background: "rgba(217,70,239,0.08)", border: "1px solid rgba(217,70,239,0.25)" }}>
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-fuchsia-300" />
            <p className="text-xs uppercase tracking-widest text-fuchsia-300 font-bold">Mirror 3, Values</p>
          </div>
          <p className="text-lg font-bold">Schwartz Values</p>
          {schwartz ? (
            <div className="mt-2">
              <p className="text-sm opacity-80">
                Top: {schwartz.topValues.map(v => SCHWARTZ_VALUES.find(x => x.key === v)?.name).join(", ")}
              </p>
              <Link href="/assessments/values" className="text-xs text-fuchsia-300 underline mt-2 inline-block">
                Retake
              </Link>
            </div>
          ) : (
            <Link href="/assessments/values" className="text-sm text-fuchsia-300 underline mt-1 inline-block">
              Start the assessment, 20 items, ~2 min
            </Link>
          )}
          <p className="text-[11px] opacity-50 mt-2 leading-snug">
            What you actually prioritize. 10 universal values, validated across 49 cultures.
          </p>
        </motion.div>

        {/* ── Divergence insights ── */}
        {hasAll && insights.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <p className="text-xs uppercase tracking-widest text-yellow-300 font-bold">Where the mirrors disagree</p>
            </div>
            {insights.slice(0, 3).map((ins, i) => (
              <div key={i} className="mb-3 p-4 rounded-2xl" style={{ background: "rgba(234,179,8,0.06)", border: "1px solid rgba(234,179,8,0.2)" }}>
                <p className="text-sm font-bold mb-1" style={{ color: "#fde68a" }}>{ins.title}</p>
                <p className="text-xs opacity-75 leading-relaxed">{ins.body}</p>
              </div>
            ))}
          </motion.div>
        )}

        {hasAll && insights.length === 0 && (
          <div className="mb-6 p-4 rounded-2xl text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-sm opacity-70">Your three mirrors are coherent. That's rare, and it means your motivation, traits, and values are genuinely aligned, not just performing alignment.</p>
          </div>
        )}

        {!hasAll && (
          <div className="mb-6 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-sm opacity-70 leading-relaxed">
              Complete all three mirrors to see divergence insights. The most useful patterns emerge where your motivation, traits, and values pull in different directions.
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Link href="/drift" className="p-3 rounded-xl text-center text-sm font-semibold"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            Drift graph <ArrowRight className="inline w-3 h-3 ml-1" />
          </Link>
          <Link href="/selves" className="p-3 rounded-xl text-center text-sm font-semibold"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            Selves <ArrowRight className="inline w-3 h-3 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
