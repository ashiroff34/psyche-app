"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MessageCircle, BookOpen, ChevronDown, ChevronUp, Info, Brain } from "lucide-react";
import { cognitiveFunctions, mbtiTypes } from "@/data/cognitive-functions";
import { useExperienceLevel } from "@/hooks/useExperienceLevel";
import NextStepBanner from "@/components/NextStepBanner";
import CognitivePremiumGate from "@/components/CognitivePremiumGate";

function BeginnerIntro() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 rounded-2xl overflow-hidden"
      style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <Info className="w-4 h-4 text-violet-400 flex-shrink-0" />
          <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>What are cognitive functions?</span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4" style={{ color: "rgba(255,255,255,0.35)" }} />
        ) : (
          <ChevronDown className="w-4 h-4" style={{ color: "rgba(255,255,255,0.35)" }} />
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
            <div className="px-5 pb-5 space-y-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              <p>
                Carl Jung proposed that the human mind uses <strong>8 distinct mental processes</strong>, called cognitive functions, to perceive the world and make decisions. Everyone uses all 8, but in a specific order of preference.
              </p>
              <p>
                Your <em>dominant</em> function is the one you use most naturally. Your <em>inferior</em> function (the opposite of your dominant) is your biggest growth edge. The 4 shadow functions are largely unconscious.
              </p>
              <p>
                This is <strong>different from MBTI</strong>. MBTI uses four letter dichotomies (I/E, N/S, T/F, J/P). Cognitive function theory goes deeper: it looks at the actual mental processes behind those letters.
              </p>
              <p>
                <strong>Recommended starting point:</strong> Take the cognitive assessment to discover your function stack, then read your type deep-dive.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CognitivePageInner() {
  const { level, loaded } = useExperienceLevel();
  const isAdvanced = loaded && level === "advanced";
  const isBeginner = loaded && level === "beginner";

  return (
    <div className="min-h-screen" style={{ background: "#0f0a1e" }}>
      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-20 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6" style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)", color: "#a78bfa" }}>
                Jung&apos;s Framework
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4" style={{ color: "rgba(255,255,255,0.93)" }}>
                Cognitive Functions
              </h1>

              {/* Beginner: full gentle intro */}
              {isBeginner && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg leading-relaxed mb-4 max-w-2xl"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Carl Jung&apos;s theory of cognitive functions describes eight distinct ways the mind perceives information and makes judgments. Your unique stack of these functions shapes how you experience everything, from how you learn to how you handle stress.
                </motion.p>
              )}

              {/* Intermediate: standard description */}
              {!isBeginner && !isAdvanced && (
                <p className="text-lg leading-relaxed mb-4 max-w-2xl" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Carl Jung&apos;s theory of cognitive functions describes eight distinct ways the mind perceives information and makes judgments. Your unique stack of these functions shapes how you experience everything.
                </p>
              )}

              {/* Advanced: technical description */}
              {isAdvanced && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  <p className="text-lg leading-relaxed mb-4 max-w-2xl" style={{ color: "rgba(255,255,255,0.6)" }}>
                    Jung&apos;s 8-function model (Psychological Types, 1921), perceiving axes Ni/Se and Ne/Si, judging axes Ti/Fe and Te/Fi, as extended by John Beebe&apos;s archetypal shadow model (Individuation and Multiplicity, 2017).
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Ni/Se axis", "Ne/Si axis", "Ti/Fe axis", "Te/Fi axis", "Beebe's 8-position stack", "Grip reactions", "Loop dynamics"].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 text-xs rounded-lg font-mono" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.5)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/assessments"
                  className="flex items-center gap-2 px-6 py-3 text-white rounded-xl font-medium transition-all"
                  style={{ background: "linear-gradient(135deg, #8b5cf6, #d946ef)" }}
                >
                  <MessageCircle className="w-4 h-4" />
                  {isBeginner ? "Find Your Stack" : "Take Assessment"}
                </Link>
                <Link
                  href="/cognitive/learn"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.8)" }}
                >
                  <BookOpen className="w-4 h-4" />
                  {isAdvanced ? "Deep Framework Reference" : "Learn the Functions"}
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

      {/* 8 Functions Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-bold mb-3" style={{ color: "rgba(255,255,255,0.93)" }}>
            The Eight Functions
          </h2>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
            {isBeginner
              ? "Four ways to take in information (perceiving) and four ways to make decisions (judging)."
              : "Four perceiving functions (how you take in information) and four judging functions (how you make decisions)."}
          </p>

          {/* Beginner: show axes explanation */}
          {isBeginner && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl mb-8 max-w-2xl"
              style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}
            >
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                <strong>How to read the list:</strong> Each function has a letter code like &ldquo;Ni&rdquo; or &ldquo;Te&rdquo;. The capital letter is the type (N = Intuition, S = Sensing, T = Thinking, F = Feeling), and the lowercase letter is the orientation (i = introverted, e = extroverted). Click any function to learn more.
              </p>
            </motion.div>
          )}

          {/* Advanced: show function axis pairs upfront */}
          {isAdvanced && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
            >
              {[
                { axis: "Ni / Se", desc: "Abstract pattern ↔ Concrete sensation" },
                { axis: "Ne / Si", desc: "Divergent possibility ↔ Recalled experience" },
                { axis: "Ti / Fe", desc: "Internal logic ↔ External harmony" },
                { axis: "Te / Fi", desc: "External efficiency ↔ Internal values" },
              ].map((a) => (
                <div key={a.axis} className="p-3 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                  <div className="font-mono font-bold text-violet-400 text-sm mb-1">{a.axis}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{a.desc}</div>
                </div>
              ))}
            </motion.div>
          )}

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Perceiving */}
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                Perceiving Functions
              </h3>
              <div className="space-y-3">
                {cognitiveFunctions
                  .filter((f) => f.category === "Perceiving")
                  .map((func, i) => (
                    <motion.div
                      key={func.code}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={`/cognitive/learn?func=${func.code}`}
                        className="group flex items-start gap-4 p-5 rounded-2xl card-hover"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                      >
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-mono font-bold shrink-0"
                          style={{ backgroundColor: func.color }}
                        >
                          {func.code}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-0.5" style={{ color: "rgba(255,255,255,0.93)" }}>
                            {func.name}
                          </h4>
                          <p className="text-xs mb-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>{func.alias}</p>
                          <p className="text-sm line-clamp-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                            {func.brief}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Judging */}
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                Judging Functions
              </h3>
              <div className="space-y-3">
                {cognitiveFunctions
                  .filter((f) => f.category === "Judging")
                  .map((func, i) => (
                    <motion.div
                      key={func.code}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={`/cognitive/learn?func=${func.code}`}
                        className="group flex items-start gap-4 p-5 rounded-2xl card-hover"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                      >
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-mono font-bold shrink-0"
                          style={{ backgroundColor: func.color }}
                        >
                          {func.code}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-0.5" style={{ color: "rgba(255,255,255,0.93)" }}>
                            {func.name}
                          </h4>
                          <p className="text-xs mb-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>{func.alias}</p>
                          <p className="text-sm line-clamp-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                            {func.brief}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 16 Types Quick Grid */}
      <section className="py-16" style={{ background: "linear-gradient(160deg, #160f38 0%, #0f0a1e 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-bold mb-3" style={{ color: "rgba(255,255,255,0.93)" }}>
            The 16 Jungian Types
          </h2>
          <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
            {isBeginner
              ? "Each type has a unique combination (\"stack\") of the 8 cognitive functions."
              : "Each type represents a unique cognitive function stack."}
          </p>

          {/* Jungian Typology Disclaimer */}
          <div className="p-4 rounded-xl mb-8" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              <strong>A note on typology:</strong> This system is grounded in Carl Jung&apos;s original <em>Psychological Types</em> (1921), not the commercial MBTI&reg; instrument.
              The 16 type codes (INTJ, ENFP, etc.) are used here as convenient shorthand for cognitive function stacks.
              This app focuses on the cognitive functions themselves, the actual substance of Jung&apos;s theory, rather than dichotomy-based trait sorting.
              Note that 16Personalities is <em>not</em> the same as Jungian typology; it uses Big Five personality traits with type-like labels.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {mbtiTypes.map((type, i) => (
              <motion.div
                key={type.code}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  href={`/cognitive/learn?type=${type.code}`}
                  className="group block p-4 rounded-2xl transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                >
                  <div className="font-mono text-lg font-bold mb-1" style={{ color: type.color }}>
                    {type.code}
                  </div>
                  <div className="text-xs mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>{type.name}</div>
                  <div className="flex gap-1 flex-wrap">
                    {type.stack.map((f, j) => (
                      <span
                        key={f}
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${j > 1 && !isAdvanced ? "hidden" : ""}`}
                        style={j === 0
                          ? { background: "rgba(139,92,246,0.2)", color: "#a78bfa", fontWeight: 500 }
                          : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }
                        }
                      >
                        {f}
                      </span>
                    ))}
                    {!isAdvanced && type.stack.length > 2 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5" style={{ color: "rgba(255,255,255,0.2)" }}>+{type.stack.length - 2}</span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <NextStepBanner
          href="/assessments"
          label="Take the cognitive assessment"
          sublabel="Discover your personal cognitive function stack"
          icon={<Brain className="w-5 h-5" />}
          color="#6366f1"
        />
      </div>
    </div>
  );
}

export default function CognitivePage() {
  return (
    <CognitivePremiumGate>
      <CognitivePageInner />
    </CognitivePremiumGate>
  );
}
