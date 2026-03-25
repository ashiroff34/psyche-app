"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, MessageCircle, BookOpen, ChevronDown, ChevronUp, Info } from "lucide-react";
import NextStepBanner from "@/components/NextStepBanner";
import { enneagramTypes } from "@/data/enneagram";
import EnneagramCircle from "@/components/EnneagramCircle";
import { useExperienceLevel } from "@/hooks/useExperienceLevel";
import { useProfile } from "@/hooks/useProfile";

function BeginnerIntro() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 rounded-2xl bg-sky-50/80 border border-sky-100 overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <Info className="w-4 h-4 text-sky-500 flex-shrink-0" />
          <span className="text-sm font-semibold text-sky-800">What is the Enneagram?</span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-sky-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-sky-400" />
        )}
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
            <div className="px-5 pb-5 space-y-3 text-sm text-sky-900 leading-relaxed">
              <p>
                The Enneagram is a personality system that describes <strong>9 core types</strong>, each defined by a central motivation, fear, and pattern of behavior. Unlike simpler systems, it focuses on the <em>why</em> behind what you do — not just surface traits.
              </p>
              <p>
                Each type has a number (1–9), a name (like "The Reformer" or "The Helper"), and a rich set of psychological layers: wings, integration lines, instinctual subtypes, and developmental levels.
              </p>
              <p>
                <strong>Recommended starting point:</strong> Take the Enneagram assessment to find your type, then read your type&apos;s deep-dive to understand its full psychology.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function EnneagramPage() {
  const [circleSelected, setCircleSelected] = useState<number | null>(null);
  const router = useRouter();
  const { level, loaded } = useExperienceLevel();
  const { profile } = useProfile();
  const myType = profile.enneagramType ?? null;

  const isAdvanced = loaded && level === "advanced";
  const isBeginner = loaded && level === "beginner";

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 right-20 w-80 h-80 bg-sky-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-600 text-xs font-medium mb-6">
                The Nine Types
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-4">
                The Enneagram
              </h1>

              {/* Beginner: full intro paragraph */}
              {isBeginner && (
                <motion.p
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-slate-500 leading-relaxed mb-4 max-w-2xl"
                >
                  An ancient system mapping nine distinct personality patterns — each with unique motivations, fears, and paths to growth. The Enneagram reveals not just <em>what</em> you do, but <em>why</em> you do it.
                </motion.p>
              )}

              {/* Intermediate/Advanced: shorter description */}
              {!isBeginner && (
                <p className="text-lg text-slate-500 leading-relaxed mb-4 max-w-2xl">
                  Nine personality structures defined by core motivations and fears — with subtypes, tritypes, instinctual stackings, and clinical depth from Naranjo, Chestnut, and Riso-Hudson.
                </p>
              )}

              {/* Advanced: show raw framework tags */}
              {isAdvanced && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {["Naranjo/Ichazo Passions", "Riso-Hudson Levels", "Chestnut Subtypes", "Hornevian Groups", "Harmonic Groups", "Object Relations"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-500 font-mono">
                      {tag}
                    </span>
                  ))}
                </motion.div>
              )}

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/enneagram/assess"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-xl font-medium shadow-lg shadow-sky-200/40 hover:shadow-xl transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  {isBeginner ? "Find Your Type" : "Take Assessment"}
                </Link>
                <Link
                  href="/enneagram/learn"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-xl font-medium border border-slate-200 hover:border-sky-200 hover:bg-sky-50/50 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  {isAdvanced ? "Deep Framework Reference" : "Learn the System"}
                </Link>
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
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2 text-center">
              Explore the Symbol
            </h2>
            <p className="text-sm text-slate-500 mb-8 text-center">
              {isBeginner
                ? "Click any number on the circle to read about that type."
                : "Click any type to view its full framework. Green lines = growth direction, red lines = stress direction."}
            </p>
            <EnneagramCircle
              selected={circleSelected}
              onSelect={(n) => {
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
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8">
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
                <Link
                  href={`/enneagram/learn?type=${type.number}`}
                  className={`group block p-6 rounded-2xl bg-white border-2 card-hover transition-all ${isMyType ? "shadow-md" : "border-slate-100"}`}
                  style={isMyType ? { borderColor: type.color, boxShadow: `0 0 0 1px ${type.color}30, 0 4px 16px ${type.color}18` } : undefined}
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
                          className="absolute -top-2 -right-2 text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full leading-none shadow-sm"
                          style={{ backgroundColor: type.color }}
                        >
                          MY TYPE
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-serif font-semibold text-slate-800 mb-1">
                        {type.name}
                      </h3>
                      <p className="text-xs text-slate-400 mb-2">{type.alias}</p>

                      {/* Beginner: friendly brief, no extra stats */}
                      {!isAdvanced && (
                        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                          {type.brief}
                        </p>
                      )}

                      {/* Advanced: show key traits as tags immediately */}
                      {isAdvanced && (
                        <>
                          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-2">
                            {type.brief}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {type.keyTraits.map((trait) => (
                              <span
                                key={trait}
                                className="px-2 py-0.5 text-xs rounded-md font-mono"
                                style={{ backgroundColor: `${type.color}15`, color: type.color }}
                              >
                                {trait}
                              </span>
                            ))}
                          </div>
                        </>
                      )}

                      {/* Beginner/intermediate: softer trait pills */}
                      {!isAdvanced && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {type.keyTraits.slice(0, 3).map((trait) => (
                            <span
                              key={trait}
                              className="px-2 py-0.5 text-xs rounded-md bg-slate-50 text-slate-500"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-sky-500 mt-4 group-hover:gap-2 transition-all">
                    {isAdvanced ? "View full framework" : "Learn more"}{" "}
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </motion.div>
            );})}
          </div>

          {/* Next Step Banner — shown only if user hasn't typed themselves yet */}
          {!myType && (
            <div className="mt-8">
              <NextStepBanner
                href="/enneagram/assess"
                label="Ready to find your type?"
                sublabel="Take the validated assessment — results in 12–65 min depending on depth"
                icon={<MessageCircle className="w-5 h-5" />}
                color="#0ea5e9"
                dismissKey="enneagram-hub-assess"
              />
            </div>
          )}
        </div>
      </section>

      {/* Enneagram Basics — shown to beginner/intermediate only */}
      {!isAdvanced && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8">
              Understanding the Enneagram
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Core Motivations",
                  text: "Each type is driven by a core motivation — a fundamental desire that shapes behavior, decisions, and relationships. Understanding your core motivation unlocks deep self-awareness.",
                },
                {
                  title: "Wings",
                  text: "Your dominant type is influenced by the types on either side of it on the Enneagram circle. These 'wings' add nuance and complexity to your personality expression.",
                },
                {
                  title: "Integration & Disintegration",
                  text: "Under growth, each type moves toward the healthy traits of another type (integration). Under stress, they take on the unhealthy traits of a different type (disintegration).",
                },
                {
                  title: "Levels of Development",
                  text: "Each type expresses itself across a spectrum from healthy to average to unhealthy. Growth means moving toward the healthier expression of your type.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-100"
                >
                  <h3 className="font-serif font-semibold text-slate-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Advanced: raw framework reference panel */}
      {isAdvanced && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4">
              Framework Reference
            </h2>
            <p className="text-sm text-slate-500 mb-8">
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
                <div key={item.label} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] font-mono text-sky-500 uppercase tracking-wider mb-1">{item.source}</div>
                  <p className="text-sm text-slate-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
