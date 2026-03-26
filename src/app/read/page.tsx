"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Heart,
  Brain,
  Layers,
  GitBranch,
  Clock,
  Sparkles,
  ScrollText,
  Users,
  ChevronRight,
  Check,
} from "lucide-react";
import { useGameState } from "@/hooks/useGameState";

/* ── Reading sections ──────────────────────────────────────────────────────── */
const READING_SECTIONS = [
  {
    id: "enneagram",
    title: "Enneagram Types",
    subtitle: "Core types, wings, subtypes & deep psychology",
    href: "/enneagram/learn",
    icon: Layers,
    color: "from-rose-400 to-pink-500",
    bg: "from-rose-50 to-pink-50",
    border: "border-rose-100",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
  },
  {
    id: "cognitive",
    title: "Jungian Functions",
    subtitle: "The 8 cognitive functions & 16 type stacks",
    href: "/cognitive/learn",
    icon: Brain,
    color: "from-indigo-400 to-violet-500",
    bg: "from-indigo-50 to-violet-50",
    border: "border-indigo-100",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    id: "compare",
    title: "Compare Types",
    subtitle: "Side-by-side Enneagram & cognitive type comparisons",
    href: "/compare",
    icon: Users,
    color: "from-sky-400 to-cyan-500",
    bg: "from-sky-50 to-cyan-50",
    border: "border-sky-100",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
  },
  {
    id: "correlations",
    title: "Cross-System Correlations",
    subtitle: "How Enneagram & cognitive types interrelate",
    href: "/correlations",
    icon: GitBranch,
    color: "from-emerald-400 to-teal-500",
    bg: "from-emerald-50 to-teal-50",
    border: "border-emerald-100",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    id: "history",
    title: "History of Typology",
    subtitle: "Jung, Ichazo, Naranjo — the lineage of type theory",
    href: "/history",
    icon: ScrollText,
    color: "from-amber-400 to-orange-500",
    bg: "from-amber-50 to-orange-50",
    border: "border-amber-100",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    id: "sources",
    title: "Sources & Research",
    subtitle: "The academic foundations behind Thyself",
    href: "/sources",
    icon: BookOpen,
    color: "from-slate-400 to-slate-600",
    bg: "from-slate-50 to-slate-100",
    border: "border-slate-100",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
  },
];

const EARN_INTERVAL_MS = 3 * 60 * 1000; // 3 minutes reading = 1 heart

/* ── Page ──────────────────────────────────────────────────────────────────── */
export default function ReadPage() {
  const { state, loaded, gainHeart } = useGameState();

  const [earnedThisVisit, setEarnedThisVisit] = useState(0);
  const [showHeartToast, setShowHeartToast] = useState(false);
  const startRef = useRef<number>(Date.now());
  const earnedRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer: award 1 heart every 3 minutes of reading
  useEffect(() => {
    if (!loaded) return;
    startRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const heartsEarnable = Math.floor(elapsed / EARN_INTERVAL_MS);
      if (heartsEarnable > earnedRef.current) {
        earnedRef.current = heartsEarnable;
        setEarnedThisVisit(heartsEarnable);
        gainHeart();
        setShowHeartToast(true);
        setTimeout(() => setShowHeartToast(false), 3000);
      }
    }, 5000); // check every 5s

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [loaded, gainHeart]);

  const hearts = loaded ? (state.hearts ?? 0) : 0;
  const maxHearts = loaded ? (state.maxHearts ?? 5) : 5;
  const isFull = hearts >= maxHearts;

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50/60 via-white to-white pt-20 pb-32 px-4">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Pass the time while your hearts refill
          </div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 mb-2">
            Read &amp; Explore
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
            Deepen your understanding while your hearts restore. Every 3 minutes of reading earns you a ❤️.
          </p>
        </div>

        {/* Hearts status bar */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-400" />
              <span className="text-sm font-semibold text-slate-700">
                {isFull ? "Hearts full!" : `${hearts} / ${maxHearts} hearts`}
              </span>
            </div>
            {!isFull && (
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3 h-3" />
                <span>+1 heart per 3 min reading</span>
              </div>
            )}
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: maxHearts }).map((_, i) => (
              <motion.div
                key={i}
                animate={i < hearts ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Heart
                  className={`w-6 h-6 transition-colors ${
                    i < hearts
                      ? "text-rose-500 fill-rose-400"
                      : "text-slate-200 fill-slate-100"
                  }`}
                />
              </motion.div>
            ))}
          </div>
          {earnedThisVisit > 0 && (
            <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
              <Check className="w-3 h-3" />
              +{earnedThisVisit} heart{earnedThisVisit > 1 ? "s" : ""} earned this session
            </p>
          )}
        </div>

        {/* Reading sections grid */}
        <div className="space-y-3">
          {READING_SECTIONS.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link href={section.href} className="block group">
                  <div
                    className={`flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r ${section.bg} border ${section.border} hover:shadow-md transition-all`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${section.iconBg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-6 h-6 ${section.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm">{section.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{section.subtitle}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Token shop hint */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-100 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-amber-800 mb-0.5">Need hearts faster?</p>
            <p className="text-xs text-amber-600 leading-relaxed mb-2">
              Spend 20 tokens in the store to instantly refill all hearts — no waiting.
            </p>
            <Link
              href="/store"
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl transition-colors"
            >
              Visit Store
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Heart earned toast */}
      <AnimatePresence>
        {showHeartToast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-28 left-4 right-4 z-50 max-w-xs mx-auto"
          >
            <div className="bg-slate-900 text-white rounded-2xl px-5 py-4 flex items-center gap-3 shadow-xl">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-300 shrink-0" />
              <div>
                <p className="text-sm font-semibold">Heart earned!</p>
                <p className="text-xs text-slate-400">Keep reading for more</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
