"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, MessageCircle, BookOpen, ChevronDown, ChevronUp, Info } from "lucide-react";
import NextStepBanner from "@/components/NextStepBanner";
import { enneagramTypes } from "@/data/enneagram";
import EnneagramCircle from "@/components/EnneagramCircle";
import { useExperienceLevel } from "@/hooks/useExperienceLevel";
import { useProfile } from "@/hooks/useProfile";
import { getMasteryLevel } from "@/hooks/useGameState";

function BeginnerIntro() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 rounded-2xl overflow-hidden"
      style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <Info className="w-4 h-4 flex-shrink-0" style={{ color: "#38bdf8" }} />
          <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>New to the Enneagram? Start here</span>
        </div>
        {open
          ? <ChevronUp className="w-4 h-4" style={{ color: "rgba(255,255,255,0.3)" }} />
          : <ChevronDown className="w-4 h-4" style={{ color: "rgba(255,255,255,0.3)" }} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              <p>The Enneagram describes <strong style={{ color: "rgba(255,255,255,0.85)" }}>9 core personality types</strong>, each defined by a central motivation, fear, and pattern of attention. Unlike simpler systems, it focuses on the <em>why</em> behind what you do, not just surface traits.</p>
              <p>Each type has a number (1–9), a name, and rich psychological layers: wings, integration lines, instinctual subtypes, and developmental levels.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { title: "Core Motivations", text: "Each type is driven by a fundamental desire that shapes all behavior and decisions." },
                  { title: "Wings", text: "The types on either side of yours influence how your core type expresses itself." },
                  { title: "Integration & Disintegration", text: "Under growth you move toward one type; under stress, toward another." },
                  { title: "Instinctual Subtypes", text: "Each type has 3 subtypes (sp/sx/so) that create 27 distinct personality variants." },
                ].map((item) => (
                  <div key={item.title} className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: "rgba(255,255,255,0.75)" }}>{item.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function getCenterTint(typeNum: number): string {
  if ([1, 8, 9].includes(typeNum)) return "rgba(184, 92, 56, 0.05)";
  if ([2, 3, 4].includes(typeNum)) return "rgba(196, 96, 122, 0.05)";
  return "rgba(61, 107, 156, 0.05)"; // 5, 6, 7
}

function TypeCard({ type, isMyType, isAdvanced, masteryPoints }: { type: typeof enneagramTypes[number]; isMyType: boolean; isAdvanced: boolean; masteryPoints: number }) {
  const [expanded, setExpanded] = useState(false);
  // Extract 2-3 sentences from fullDescription for the preview
  const previewText = type.fullDescription
    ? type.fullDescription.split(". ").slice(0, 2).join(". ") + "."
    : "";
  const masteryLabel = masteryPoints > 0 ? getMasteryLevel(masteryPoints) : null;

  return (
    <div
      className="rounded-2xl transition-all"
      style={isMyType
        ? { background: `linear-gradient(135deg, ${getCenterTint(type.number)}, ${getCenterTint(type.number)}), ${type.color}12`, border: `2px solid ${type.color}50`, boxShadow: `0 4px 20px ${type.color}20` }
        : { background: `linear-gradient(135deg, ${getCenterTint(type.number)}, rgba(255,255,255,0.04))`, border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <Link
        href={`/enneagram/learn?type=${type.number}`}
        className="group block p-6 pb-3 transition-all hover:-translate-y-0.5"
      >
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-serif font-bold"
              style={{ backgroundColor: type.color }}
            >
              {type.number}
            </div>
            {isMyType && (
              <span
                className="absolute -top-2 -right-2 text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full leading-none"
                style={{ backgroundColor: type.color }}
              >
                MY TYPE
              </span>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.88)" }}>
                {type.name}
              </h3>
              {isMyType && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(139,92,246,0.25)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.4)" }}>Your type</span>
              )}
            </div>
            <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>{type.alias}</p>
            <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "rgba(255,255,255,0.5)" }}>
              {type.brief}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {type.keyTraits.slice(0, isAdvanced ? 5 : 3).map((trait) => (
                <span
                  key={trait}
                  className="px-2 py-0.5 text-xs rounded-md"
                  style={{ backgroundColor: `${type.color}18`, color: type.color }}
                >
                  {trait}
                </span>
              ))}
              {masteryLabel && (
                <span
                  className="px-2 py-0.5 text-xs rounded-md font-semibold"
                  style={{ backgroundColor: `${type.color}30`, color: type.color, border: `1px solid ${type.color}50` }}
                >
                  {masteryLabel}
                </span>
              )}
            </div>
            {isMyType && masteryPoints > 0 && (
              <p className="text-[10px] mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                {Math.min(100, Math.round((masteryPoints / 500) * 100))}% explored
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-sky-500 mt-4 group-hover:gap-2 transition-all">
          {isAdvanced ? "View full framework" : "View full profile"}{" "}
          <ArrowRight className="w-3 h-3" />
        </div>
      </Link>

      {isMyType && type.integrationLine && (
        <div className="px-6 pb-4 pt-1">
          <Link
            href={`/enneagram/learn?type=${type.integrationLine}`}
            className="inline-flex items-center gap-1 text-xs font-medium transition-all hover:gap-2"
            style={{ color: "#34d399" }}
          >
            View integration line (Type {type.integrationLine}) →
          </Link>
        </div>
      )}

      {/* Inline expand button */}
      {type.fullDescription && (
        <div className="px-6 pb-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs font-medium transition-all"
            style={{ color: `${type.color}cc` }}
          >
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {expanded ? "Show less" : "Learn more"}
          </button>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="mt-3 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {previewText}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default function EnneagramPage() {
  const [circleSelected, setCircleSelected] = useState<number | null>(null);
  const [typeMastery, setTypeMastery] = useState<Record<string, number>>({});
  const router = useRouter();
  const { level, loaded } = useExperienceLevel();
  const { profile } = useProfile();
  const myType = profile.enneagramType ?? null;

  const isAdvanced = loaded && level === "advanced";
  const isBeginner = loaded && level === "beginner";

  // Load type mastery from game state
  useEffect(() => {
    try {
      const raw = localStorage.getItem("psyche-game-state");
      if (raw) {
        const state = JSON.parse(raw);
        setTypeMastery(state.typeMastery ?? {});
      }
    } catch {}
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#0f0a1e" }}>
      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0, opacity: 0.06 }}>
          <svg viewBox="0 0 400 400" className="absolute" style={{ width: '420px', height: '420px', top: '-60px', right: '-60px' }}>
            <g fill="none" stroke="rgba(167,139,250,1)" strokeWidth="0.8">
              {/* Outer ring */}
              <circle cx="200" cy="200" r="190" strokeWidth="0.5" />
              <circle cx="200" cy="200" r="140" strokeWidth="0.4" />
              <circle cx="200" cy="200" r="90" strokeWidth="0.4" />
              {/* 9-star: connect every point skipping 4 */}
              {[0,1,2,3,4,5,6,7,8].map((i) => {
                const a1 = ((i * 40) - 90) * Math.PI / 180;
                const a2 = (((i + 4) % 9) * 40 - 90) * Math.PI / 180;
                return (
                  <line key={i}
                    x1={200 + 190 * Math.cos(a1)} y1={200 + 190 * Math.sin(a1)}
                    x2={200 + 190 * Math.cos(a2)} y2={200 + 190 * Math.sin(a2)}
                    strokeWidth="0.7"
                  />
                );
              })}
              {/* Spokes from center */}
              {[0,1,2,3,4,5,6,7,8].map((i) => {
                const a = ((i * 40) - 90) * Math.PI / 180;
                return (
                  <line key={`s${i}`}
                    x1={200} y1={200}
                    x2={200 + 90 * Math.cos(a)} y2={200 + 90 * Math.sin(a)}
                    strokeWidth="0.4"
                  />
                );
              })}
              {/* 9 dots on outer ring */}
              {[0,1,2,3,4,5,6,7,8].map((i) => {
                const a = ((i * 40) - 90) * Math.PI / 180;
                return <circle key={`d${i}`} cx={200 + 190 * Math.cos(a)} cy={200 + 190 * Math.sin(a)} r="3" fill="rgba(167,139,250,1)" stroke="none" />;
              })}
            </g>
          </svg>
        </div>
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-10 right-20 w-80 h-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" }} />
          <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
                style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", color: "rgba(167,139,250,0.9)" }}>
                The Nine Types
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4" style={{ color: "rgba(255,255,255,0.92)" }}>
                The Enneagram
              </h1>

              {isBeginner && (
                <p className="text-lg leading-relaxed mb-4 max-w-2xl" style={{ color: "rgba(255,255,255,0.5)" }}>
                  An ancient system mapping nine distinct personality patterns, each with unique motivations, fears, and paths to growth. The Enneagram reveals not just <em>what</em> you do, but <em>why</em> you do it.
                </p>
              )}
              {!isBeginner && (
                <p className="text-lg leading-relaxed mb-4 max-w-2xl" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Nine personality structures defined by core motivations and fears, with subtypes, tritypes, instinctual stackings, and clinical depth from Naranjo, Chestnut, and Riso-Hudson.
                </p>
              )}

              {isAdvanced && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Naranjo/Ichazo Passions", "Riso-Hudson Levels", "Chestnut Subtypes", "Hornevian Groups", "Harmonic Groups", "Object Relations"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-xs rounded-lg font-mono"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Link href="/onboarding?fromEnter=true"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 8px 24px rgba(124,58,237,0.4)" }}>
                  <MessageCircle className="w-4 h-4" />
                  {isBeginner ? "Find Your Type" : "Take Assessment"}
                </Link>
                {isAdvanced && (
                  <Link href="/enneagram/learn"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:-translate-y-0.5"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.75)" }}>
                    <BookOpen className="w-4 h-4" />
                    Deep Framework Reference
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Beginner expandable explainer */}
      {isBeginner && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-4">
          <BeginnerIntro />
        </div>
      )}

      {/* Interactive Circle */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-serif font-bold mb-2 text-center" style={{ color: "rgba(255,255,255,0.92)" }}>
              Explore the Symbol
            </h2>
            <p className="text-sm mb-8 text-center" style={{ color: "rgba(255,255,255,0.4)" }}>
              {isBeginner
                ? "Click any number on the circle to read about that type."
                : "Click any type to view its full framework. Green lines = growth direction, red lines = stress direction."}
            </p>
            <EnneagramCircle
              selectedType={circleSelected ?? undefined}
              onTypeSelect={(n) => {
                setCircleSelected(n);
                router.push(`/enneagram/learn?type=${n}`);
              }}
              size={340}
            />
          </div>
        </div>
      </section>

      {/* Type Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-bold mb-8" style={{ color: "rgba(255,255,255,0.92)" }}>
            The Nine Types
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {enneagramTypes.map((type, i) => {
              const isMyType = myType === type.number;
              return (
              <motion.div
                key={type.number}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <TypeCard type={type} isMyType={isMyType} isAdvanced={isAdvanced} masteryPoints={typeMastery[String(type.number)] ?? 0} />
              </motion.div>
            );})}
          </div>

          {/* Next Step Banner. shown only if user hasn't typed themselves yet */}
          {!myType && (
            <div className="mt-8">
              <NextStepBanner
                href="/onboarding?fromEnter=true"
                label="Ready to find your type?"
                sublabel="8 questions · ~3 minutes · instant result"
                icon={<MessageCircle className="w-5 h-5" />}
                color="#0ea5e9"
                dismissKey="enneagram-hub-assess"
              />
            </div>
          )}
        </div>
      </section>


      {/* Advanced: raw framework reference panel */}
      {isAdvanced && (
        <section className="py-16" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: "rgba(255,255,255,0.92)" }}>
              Framework Reference
            </h2>
            <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
              Quick reference for the clinical layers used throughout Thyself.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { source: "Naranjo/Ichazo", label: "Passions, Fixations, Virtues, Holy Ideas, Traps, Defense Mechanisms" },
                { source: "Riso-Hudson", label: "9 Levels of Development per type, integration/disintegration lines" },
                { source: "Beatrice Chestnut", label: "27 subtypes (3 per type × 3 instincts), countertype identification" },
                { source: "Karen Horney", label: "Hornevian groups: Assertive, Withdrawn, Compliant" },
                { source: "Riso-Hudson", label: "Harmonic groups: Positive Outlook, Competency, Reactive" },
                { source: "Object Relations", label: "Attachment, Frustration, Rejection groups" },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                  <div className="text-[10px] font-mono text-sky-500 uppercase tracking-wider mb-1">{item.source}</div>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Go deeper ── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.25)" }}>
            Go deeper
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: "/cognitive", label: "Cognitive Functions", sub: "Jungian function stacks", color: "#6366f1" },
              { href: "/history", label: "History & Origins", sub: "Roots of the system", color: "#0ea5e9" },
            ].map(({ href, label, sub, color }) => (
              <Link
                key={href}
                href={href}
                className="p-4 rounded-2xl transition-all hover:-translate-y-0.5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="w-7 h-7 rounded-xl flex items-center justify-center mb-2" style={{ background: `${color}20` }}>
                  <ArrowRight className="w-3.5 h-3.5" style={{ color }} />
                </div>
                <p className="text-xs font-semibold mb-0.5" style={{ color: "rgba(255,255,255,0.8)" }}>{label}</p>
                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>{sub}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
