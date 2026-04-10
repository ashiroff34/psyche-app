"use client";

// Context-Dependent Selves (Work / Home / Love)
//
// Same items, answered three times with context primes. Produces three
// chibi-linked variants. Solves the "I'm different at work" complaint
// that breaks trust in single-result apps.
//
// Context-dependent personality is validated research (Mischel &
// Shoda, 1995; Heller, Perunovic, Reichman, 2009). Most self-report
// captures "global self" and misses the variance that comes from roles.

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Briefcase, Home, Heart } from "lucide-react";
import { usePsychometrics } from "@/hooks/usePsychometrics";
import { useProfile } from "@/hooks/useProfile";
import ChibiSprite from "@/components/ChibiSprite";

type Context = "work" | "home" | "love";

// 6 items, one per key aspect, phrased neutrally so context primes carry the weight.
const CONTEXT_ITEMS = [
  { id: "asrt", text: "I speak up and take charge.", aspect: "assertiveness" },
  { id: "enth", text: "I am warm and sociable.", aspect: "enthusiasm" },
  { id: "vol", text: "I feel irritable or reactive.", aspect: "volatility" },
  { id: "wd", text: "I feel worried or withdrawn.", aspect: "withdrawal" },
  { id: "ind", text: "I follow through on what I intend.", aspect: "industriousness" },
  { id: "comp", text: "I attune to others' feelings.", aspect: "compassion" },
];

const CONTEXT_PRIMES: Record<Context, { title: string; prime: string; icon: typeof Briefcase }> = {
  work: {
    title: "Work You",
    prime: "Think about how you are at work, with colleagues, managers, or clients. Answer each statement as the version of you who shows up there.",
    icon: Briefcase,
  },
  home: {
    title: "Home You",
    prime: "Think about how you are alone or with close family at home. Answer each statement as the version of you who shows up there.",
    icon: Home,
  },
  love: {
    title: "Love You",
    prime: "Think about how you are with a romantic partner or closest intimate person. Answer each statement as the version of you who shows up there.",
    icon: Heart,
  },
};

const SCALE = [1, 2, 3, 4, 5];

export default function SelvesPage() {
  const { profile } = useProfile();
  const { contextSelves, saveContextSelf } = usePsychometrics();
  const [activeCtx, setActiveCtx] = useState<Context | null>(null);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const type = profile.enneagramType ?? null;

  function startContext(ctx: Context) {
    setActiveCtx(ctx);
    setIdx(0);
    setAnswers({});
  }

  function answer(v: number) {
    const next = { ...answers, [CONTEXT_ITEMS[idx].id]: v };
    setAnswers(next);
    if (idx < CONTEXT_ITEMS.length - 1) {
      setTimeout(() => setIdx(idx + 1), 120);
    } else {
      if (activeCtx) saveContextSelf(activeCtx, next);
      setTimeout(() => {
        setActiveCtx(null);
      }, 150);
    }
  }

  const divergence = useMemo(() => {
    const contexts: Context[] = ["work", "home", "love"];
    const available = contexts.filter(c => contextSelves[c]);
    if (available.length < 2) return [];
    const divs: { item: string; max: number; min: number; gap: number; maxCtx: Context; minCtx: Context }[] = [];
    for (const item of CONTEXT_ITEMS) {
      const vals: Array<[Context, number]> = available.map(c => [c, contextSelves[c]![item.id] ?? 3]);
      vals.sort(([, a], [, b]) => b - a);
      const gap = vals[0][1] - vals[vals.length - 1][1];
      if (gap >= 2) {
        divs.push({
          item: item.text,
          max: vals[0][1],
          min: vals[vals.length - 1][1],
          gap,
          maxCtx: vals[0][0],
          minCtx: vals[vals.length - 1][0],
        });
      }
    }
    return divs.sort((a, b) => b.gap - a.gap);
  }, [contextSelves]);

  if (activeCtx) {
    const ctxDef = CONTEXT_PRIMES[activeCtx];
    const Icon = ctxDef.icon;
    const item = CONTEXT_ITEMS[idx];
    const progress = ((idx + 1) / CONTEXT_ITEMS.length) * 100;

    return (
      <div className="min-h-screen text-white p-6" style={{ background: "#0a0614" }}>
        <div className="max-w-md mx-auto">
          <button onClick={() => setActiveCtx(null)} className="inline-flex items-center gap-2 text-sm opacity-60 mb-6">
            <ArrowLeft className="w-4 h-4" /> Cancel
          </button>
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-5 h-5 text-violet-300" />
            <p className="text-[11px] uppercase tracking-widest text-violet-300 font-bold">{ctxDef.title}</p>
          </div>
          {idx === 0 && (
            <p className="text-sm opacity-70 mb-6 leading-relaxed">{ctxDef.prime}</p>
          )}
          <div className="h-1 rounded-full overflow-hidden mb-6" style={{ background: "rgba(255,255,255,0.08)" }}>
            <motion.div className="h-full" style={{ background: "linear-gradient(90deg,#8b5cf6,#d946ef)" }} animate={{ width: `${progress}%` }} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
              <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.92)" }}>{item.text}</p>
              <div className="flex gap-2 mb-1">
                {SCALE.map(v => (
                  <button key={v} onClick={() => answer(v)}
                    className="flex-1 py-3 rounded-xl text-sm font-bold transition-all active:scale-95"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.85)",
                    }}>
                    {v}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-[10px] opacity-50">
                <span>Not at all</span>
                <span>Very much</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-6 pb-20" style={{ background: "#0a0614" }}>
      <div className="max-w-md mx-auto">
        <Link href="/mirrors" className="inline-flex items-center gap-2 text-sm opacity-60 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-2">Selves</h1>
          <p className="text-sm opacity-60 mb-6 leading-relaxed">
            You are not one self. Most people show up differently at work, at home, and in love. Mapping the difference is the point.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {(["work", "home", "love"] as const).map(ctx => {
            const ctxDef = CONTEXT_PRIMES[ctx];
            const Icon = ctxDef.icon;
            const done = !!contextSelves[ctx];
            return (
              <button key={ctx} onClick={() => startContext(ctx)}
                className="p-4 rounded-2xl flex flex-col items-center gap-2 transition-all active:scale-95"
                style={{
                  background: done ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${done ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.08)"}`,
                }}>
                <div className="relative">
                  {type && done ? (
                    <ChibiSprite type={type} size={48} />
                  ) : (
                    <Icon className="w-6 h-6 text-violet-300" />
                  )}
                </div>
                <p className="text-xs font-bold">{ctxDef.title}</p>
                <p className="text-[10px] opacity-60">{done ? "Mapped" : "Start"}</p>
              </button>
            );
          })}
        </div>

        {/* Divergence insights */}
        {divergence.length > 0 && (
          <div className="mb-6">
            <p className="text-[10px] uppercase tracking-widest opacity-60 mb-3">Where your selves diverge most</p>
            {divergence.slice(0, 3).map((d, i) => (
              <div key={i} className="mb-3 p-4 rounded-2xl" style={{ background: "rgba(217,70,239,0.06)", border: "1px solid rgba(217,70,239,0.2)" }}>
                <p className="text-sm font-bold text-fuchsia-300 mb-1">{d.item}</p>
                <p className="text-xs opacity-75 leading-snug">
                  {CONTEXT_PRIMES[d.maxCtx].title}: {d.max}/5 · {CONTEXT_PRIMES[d.minCtx].title}: {d.min}/5 · gap of {d.gap}
                </p>
              </div>
            ))}
          </div>
        )}

        {divergence.length === 0 && Object.keys(contextSelves).filter(k => k !== "updatedAt").length < 2 && (
          <div className="p-4 rounded-2xl text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
            <p className="text-sm opacity-70 leading-relaxed">
              Map at least two selves to see where they diverge. That gap is the most interesting content.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
