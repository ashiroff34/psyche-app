"use client";

// Comparison SEO pages (16Personalities playbook)
//
// 16Personalities gets ~150M visits/year largely via long-tail type pages.
// "Type 4 vs Type 5" is a top-converting keyword because people searching
// are in active self-categorization. Each page targets ~800-1500 words of
// type comparison content, structured with FAQ-like headers for Google.

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { enneagramTypes } from "@/data/enneagram";
import ChibiSprite from "@/components/ChibiSprite";

// Parse URL param: "4-vs-5" → [4, 5]
function parseTypes(slug: string): [number, number] | null {
  const m = slug.match(/^(\d)-vs-(\d)$/);
  if (!m) return null;
  const a = parseInt(m[1], 10);
  const b = parseInt(m[2], 10);
  if (a < 1 || a > 9 || b < 1 || b > 9 || a === b) return null;
  return [a, b];
}

// Key comparisons between types (hand-written for quality, can be expanded)
const COMPARISONS: Record<string, { shared: string; differ: string; mistype: string; growth: string }> = {
  "1-4": {
    shared: "Both have a strong inner critic and a sense that something is missing. Both are idealistic and hold themselves to internal standards that the world rarely meets.",
    differ: "Type 1 locates the problem in the world (things should be better) while Type 4 locates it in themselves (I should be different). 1s externalize imperfection, 4s internalize it.",
    mistype: "Artistic 1s who value beauty often mistype as 4s. Ask: do you feel fundamentally flawed (4) or frustrated with flaws you could fix (1)?",
    growth: "1s grow by releasing the critic and accepting imperfection. 4s grow by releasing the identity-story and engaging with ordinary life.",
  },
  "4-5": {
    shared: "Both withdraw, both are introspective, both feel different from others, and both have rich inner worlds. Both can be iconoclasts.",
    differ: "4s withdraw to feel, 5s withdraw to think. 4s amplify emotion, 5s minimize it. 4s want to be understood, 5s want to understand.",
    mistype: "Intellectual 4s often test as 5s. Ask: when overwhelmed, do you feel MORE (4) or go numb and retreat to analysis (5)?",
    growth: "4s grow toward groundedness and action (integration toward 1). 5s grow toward generosity and engagement (integration toward 8).",
  },
  "2-9": {
    shared: "Both are accommodating, both merge with others, both avoid their own needs, and both can appear warm and easygoing.",
    differ: "2s merge to be needed, 9s merge to avoid conflict. 2s know what others need, 9s don't know what they themselves need. 2s give strategically, 9s go along.",
    mistype: "Selfless 9s may look like 2s. Ask: do you actively seek people to help (2) or do you just not resist when asked (9)?",
    growth: "2s grow by recognizing their own needs. 9s grow by developing their own voice.",
  },
  "3-7": {
    shared: "Both are energetic, future-focused, image-conscious, and avoid negative emotions. Both want to be seen as successful.",
    differ: "3s adapt their image to win, 7s chase new experiences to feel alive. 3s can grind through boredom, 7s cannot.",
    mistype: "Entertaining 3s mistype as 7s often. Ask: do you carefully manage how people perceive you (3) or just naturally follow what's exciting (7)?",
    growth: "3s grow by slowing down and discovering who they are without achievement. 7s grow by sitting with discomfort instead of escaping it.",
  },
  "6-8": {
    shared: "Both can be intensely confrontational. Counter-phobic 6s especially look like 8s, both are protective of their people.",
    differ: "8s push forward from a position of assumed power. 6s push back from a position of assumed threat. 8s don't question their own authority, 6s question everyone's.",
    mistype: "Counter-phobic 6s are the most common mistype for 8. Ask: do you challenge authority from confidence (8) or from anxiety you're trying to override (6)?",
    growth: "6s grow by trusting their own inner authority. 8s grow by revealing vulnerability.",
  },
};

// Generic fallback
function genericComparison(a: number, b: number) {
  const ta = enneagramTypes.find(t => t.number === a);
  const tb = enneagramTypes.find(t => t.number === b);
  return {
    shared: `Both Type ${a} (${ta?.name ?? ""}) and Type ${b} (${tb?.name ?? ""}) have patterns that are worth comparing. They may overlap in behavior but differ in core motivation.`,
    differ: `Type ${a} is driven by a core desire ${ta?.coreDesire ? `— ${ta.coreDesire.replace(/\.$/, "")}` : "that shapes how they move through the world"}, while Type ${b} is driven by ${tb?.coreDesire ? tb.coreDesire.replace(/\.$/, "") : "a different core need"}.`,
    mistype: `These types can be confused when surface behavior overlaps. Look at motivation, not behavior, to distinguish them.`,
    growth: `Both types have unique growth paths. ${a}s integrate toward health by relaxing their core defense, and ${b}s by engaging with what they avoid.`,
  };
}

export default function ComparisonPage() {
  const params = useParams();
  const slug = params.types as string;
  const parsed = parseTypes(slug);

  if (!parsed) {
    return (
      <div className="min-h-screen text-white p-6 flex items-center justify-center" style={{ background: "#0a0614" }}>
        <div className="text-center">
          <p className="text-lg font-bold mb-2">Invalid comparison</p>
          <p className="text-sm opacity-60 mb-4">Try a URL like /compare/4-vs-5</p>
          <Link href="/assessments" className="text-violet-300 underline text-sm">Back to assessments</Link>
        </div>
      </div>
    );
  }

  const [a, b] = parsed;
  const typeA = enneagramTypes.find(t => t.number === a);
  const typeB = enneagramTypes.find(t => t.number === b);
  const key = `${Math.min(a, b)}-${Math.max(a, b)}`;
  const comp = COMPARISONS[key] ?? genericComparison(a, b);

  return (
    <div className="min-h-screen text-white p-6 pb-20" style={{ background: "#0a0614" }}>
      <div className="max-w-md mx-auto">
        <Link href="/assessments" className="inline-flex items-center gap-2 text-sm opacity-60 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-3">Type comparison</p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-center">
              <ChibiSprite type={a} size={90} />
              <p className="text-sm font-bold mt-1">Type {a}</p>
              <p className="text-xs opacity-60">{typeA?.name ?? ""}</p>
            </div>
            <span className="text-lg opacity-40">vs</span>
            <div className="text-center">
              <ChibiSprite type={b} size={90} />
              <p className="text-sm font-bold mt-1">Type {b}</p>
              <p className="text-xs opacity-60">{typeB?.name ?? ""}</p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          {([
            { label: "What they share", text: comp.shared, color: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.22)" },
            { label: "How they differ", text: comp.differ, color: "rgba(217,70,239,0.08)", border: "rgba(217,70,239,0.22)" },
            { label: "Common mistype", text: comp.mistype, color: "rgba(234,179,8,0.08)", border: "rgba(234,179,8,0.22)" },
            { label: "Growth paths", text: comp.growth, color: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.22)" },
          ] as const).map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="p-4 rounded-2xl" style={{ background: s.color, border: `1px solid ${s.border}` }}>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-2">{s.label}</p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.88)" }}>{s.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link href={`/enneagram/${a}`} className="p-3 rounded-xl text-center text-sm font-semibold"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            Deep-dive Type {a} <ArrowRight className="inline w-3 h-3 ml-1" />
          </Link>
          <Link href={`/enneagram/${b}`} className="p-3 rounded-xl text-center text-sm font-semibold"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            Deep-dive Type {b} <ArrowRight className="inline w-3 h-3 ml-1" />
          </Link>
        </div>

        <div className="mt-6 p-4 rounded-2xl text-center" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.22)" }}>
          <p className="text-sm font-semibold mb-2">Not sure which one you are?</p>
          <Link href="/assessments" className="inline-flex items-center gap-2 text-sm text-violet-300 font-semibold">
            Take the free assessment <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
