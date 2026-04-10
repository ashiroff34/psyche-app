"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Sparkles, Lock, FileText, Eraser, ArrowRight, AlertCircle, ChevronDown,
  Info, Shield, BookOpen, Trash2,
} from "lucide-react";
import { scorePersonalityFromText, type ScoringResult } from "@/lib/personality-scorer";
import { mirrorV2Extras } from "@/lib/mirror-v2";
import { SCHWARTZ_VALUES } from "@/data/psychometrics/schwartz-values";
import { attachmentStyles } from "@/data/attachment";
import BigFiveRadar from "@/components/BigFiveRadar";
import { enneagramTypes } from "@/data/enneagram";
import { TYPE_WPFA } from "@/data/wound-passion-fixation-armor";
import { posthog, EVENTS } from "@/lib/posthog";

const TYPE_COLORS: Record<number, string> = {
  1: "#E74C3C", 2: "#E91E8C", 3: "#F39C12", 4: "#9B59B6",
  5: "#2980B9", 6: "#27AE60", 7: "#1ABC9C", 8: "#E67E22", 9: "#95A5A6",
};

const EXAMPLE_TEXT = `I don't know why I did it that way. Thinking back, there was probably a better path, but in the moment I just moved. I've always trusted my gut more than my head, which has cost me a few times but also saved me more than I can count.

What's weird is I can explain the reasoning after the fact. Like the explanation shows up once it's safe to think about it. My friends say I'm "decisive" but from the inside it feels less like a choice and more like an alignment. I feel the right thing and move toward it.

I wonder sometimes if I'm missing something the careful people see. But then I watch someone agonize over a decision for three weeks and I'm glad I'm not them.`;

export default function MirrorPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ScoringResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResearch, setShowResearch] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  // Analytics: mirror_viewed on first mount
  useEffect(() => {
    try { posthog.capture(EVENTS.MIRROR_VIEWED); } catch {}
  }, []);

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  function handleAnalyze() {
    if (wordCount < 30) return;
    setAnalyzing(true);
    // Simulate a tiny delay for perceived "analysis" feel
    setTimeout(() => {
      const r = scorePersonalityFromText(text);
      setResult(r);
      setAnalyzing(false);
      // Analytics: mirror_analyzed with confidence and top type
      try {
        posthog.capture(EVENTS.MIRROR_ANALYZED, {
          wordCount: r.wordCount,
          confidence: r.confidence,
          topType: r.enneagramEstimate.topType,
          topTypeScore: r.enneagramEstimate.topTypeScore,
          runnerUpType: r.enneagramEstimate.runnerUpType,
        });
      } catch {}
    }, 600);
  }

  function handleClear() {
    setText("");
    setResult(null);
  }

  function handleUseExample() {
    setText(EXAMPLE_TEXT);
  }

  return (
    <div className="min-h-screen pb-32 pt-20" style={{ background: "#0f0a1e" }}>
      <div className="max-w-2xl mx-auto px-4">

        {/* ── Header ── */}
        <div className="mb-6 text-center">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4"
            style={{
              background: "rgba(139,92,246,0.15)",
              border: "1px solid rgba(139,92,246,0.3)",
              color: "#c4b5fd",
            }}
          >
            <Sparkles className="w-3 h-3" />
            Experimental · The Mirror
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>
            What your own words say about you
          </h1>
          <p className="text-sm max-w-lg mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Paste something you&apos;ve written, a journal entry, an email, an old message. Your language contains patterns that quizzes can&apos;t catch. This tool reads those patterns and offers an <em>independent</em> second opinion on your type.
          </p>
        </div>

        {/* ── Privacy banner ── absolutely mandatory ── */}
        <div
          className="mb-6 p-3.5 rounded-2xl flex items-start gap-3"
          style={{
            background: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.25)",
          }}
        >
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(16,185,129,0.15)" }}>
            <Lock className="w-3.5 h-3.5" style={{ color: "#34d399" }} />
          </div>
          <div className="flex-1 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            <p className="font-bold mb-0.5" style={{ color: "#6ee7b7" }}>Your text never leaves your browser.</p>
            <p>Everything runs on your device, no servers, no uploads, no API calls. Close this tab and the text is gone. We don&apos;t see it. No one does.</p>
          </div>
        </div>

        {/* ── Input card ── */}
        {!result && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="px-4 pt-4 pb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.5)" }} />
                <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Paste your text
                </span>
              </div>
              <button
                onClick={handleUseExample}
                className="text-[11px] font-semibold transition-colors"
                style={{ color: "rgba(167,139,250,0.7)" }}
              >
                try an example
              </button>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste 250+ words of something you've written recently. A journal entry, a long message, a blog post, an email. The more authentic and the longer, the better the signal."
              className="w-full px-4 py-3 text-sm resize-none focus:outline-none"
              rows={10}
              style={{
                background: "transparent",
                color: "rgba(255,255,255,0.9)",
                fontFamily: "inherit",
              }}
            />

            <div
              className="px-4 py-3 flex items-center justify-between"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-3 text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                <span>
                  <span className={wordCount < 250 ? "text-amber-400" : "text-emerald-400"}>{wordCount}</span>
                  {" "}/ 250+ words
                </span>
                {wordCount >= 30 && wordCount < 250 && (
                  <span className="text-amber-400">· below reliable threshold</span>
                )}
                {wordCount >= 250 && wordCount < 750 && (
                  <span className="text-emerald-400">· minimum reached</span>
                )}
                {wordCount >= 750 && (
                  <span className="text-emerald-400">· good length</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {text && (
                  <button
                    onClick={handleClear}
                    className="flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-lg transition-colors"
                    style={{ color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.05)" }}
                  >
                    <Eraser className="w-3 h-3" />
                    clear
                  </button>
                )}
                <button
                  onClick={handleAnalyze}
                  disabled={wordCount < 30 || analyzing}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold text-white transition-all disabled:opacity-30"
                  style={{
                    background: wordCount >= 30 && !analyzing
                      ? "linear-gradient(135deg, #8b5cf6, #d946ef)"
                      : "rgba(255,255,255,0.08)",
                    boxShadow: wordCount >= 30 && !analyzing ? "0 4px 16px rgba(139,92,246,0.3)" : "none",
                  }}
                >
                  {analyzing ? "Reading…" : "Analyze"}
                  {!analyzing && <ArrowRight className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Results ── */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >

              {/* Heavy caveat banner at the top */}
              <div
                className="p-4 rounded-2xl flex items-start gap-3"
                style={{
                  background: result.confidence === "very low" || result.confidence === "low"
                    ? "rgba(251,146,60,0.1)"
                    : "rgba(167,139,250,0.08)",
                  border: result.confidence === "very low" || result.confidence === "low"
                    ? "1px solid rgba(251,146,60,0.3)"
                    : "1px solid rgba(167,139,250,0.25)",
                }}
              >
                <AlertCircle
                  className="w-4 h-4 shrink-0 mt-0.5"
                  style={{
                    color: result.confidence === "very low" || result.confidence === "low"
                      ? "#fb923c"
                      : "#c4b5fd",
                  }}
                />
                <div className="flex-1 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                  <p className="font-bold mb-1" style={{ color: "#ffffff" }}>
                    Confidence: {result.confidence}
                  </p>
                  <p>{result.confidenceNote}</p>
                </div>
              </div>

              {/* Mirror V2 synthesis line + attachment + values inference */}
              {(() => {
                const extras = mirrorV2Extras(result.bigFive, result.wordCount);
                return (
                  <div
                    className="p-4 rounded-2xl mb-4"
                    style={{ background: "rgba(217,70,239,0.08)", border: "1px solid rgba(217,70,239,0.25)" }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#f0abfc" }}>
                      Deeper Read (Mirror V2)
                    </p>
                    <p className="text-base font-bold mb-3" style={{ color: "rgba(255,255,255,0.95)" }}>
                      {extras.synthesisLine}
                    </p>
                    <div className="mb-3">
                      <p className="text-[10px] uppercase opacity-60 mb-1">Inferred attachment</p>
                      <p className="text-sm font-semibold">{attachmentStyles[extras.inferredAttachment.style].title}</p>
                      <p className="text-[11px] opacity-70 leading-snug">{extras.inferredAttachment.reasoning}</p>
                    </div>
                    <div className="mb-2">
                      <p className="text-[10px] uppercase opacity-60 mb-1">Inferred values (top 3)</p>
                      <p className="text-xs opacity-80">
                        {extras.inferredTopValues
                          .map(v => SCHWARTZ_VALUES.find(x => x.key === v)?.name)
                          .join(", ")}
                      </p>
                    </div>
                    <p className="text-[10px] opacity-50 leading-snug mt-2">
                      These are heuristic inferences from your text, not validated measurements. Take the full assessments at /mirrors for the measured versions.
                    </p>
                  </div>
                );
              })()}

              {/* Big Five radar */}
              <div
                className="p-4 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(167,139,250,0.7)" }}>
                  Your Big Five profile (from text)
                </p>
                <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Based on {result.wordCount} words · scored via LIWC-category correlations from Yarkoni (2010)
                </p>
                <div className="flex justify-center mb-4">
                  <BigFiveRadar scores={result.bigFive} size={320} />
                </div>

                {/* Trait interpretations */}
                <div className="space-y-2 mt-4">
                  {result.interpretations.map((i) => (
                    <div
                      key={i.trait}
                      className="flex items-start gap-3 px-3 py-2 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <div
                        className="w-8 text-center text-[10px] font-black uppercase py-1 rounded-md shrink-0"
                        style={{
                          background: i.level === "high" ? "rgba(236,72,153,0.2)" : i.level === "low" ? "rgba(14,165,233,0.2)" : "rgba(167,139,250,0.18)",
                          color: i.level === "high" ? "#f472b6" : i.level === "low" ? "#38bdf8" : "#c4b5fd",
                        }}
                      >
                        {i.level}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.45)" }}>
                          {i.label}
                        </p>
                        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                          {i.signal}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enneagram cross-validation */}
              <div
                className="p-4 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(167,139,250,0.7)" }}>
                  Enneagram cross-validation
                </p>

                {(() => {
                  const topType = result.enneagramEstimate.topType;
                  const runnerUp = result.enneagramEstimate.runnerUpType;
                  const topTypeData = enneagramTypes.find((t) => t.number === topType);
                  const runnerUpData = enneagramTypes.find((t) => t.number === runnerUp);
                  const topColor = TYPE_COLORS[topType];

                  return (
                    <div className="space-y-3">
                      <div
                        className="p-4 rounded-2xl"
                        style={{ background: `${topColor}14`, border: `1px solid ${topColor}35` }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                            style={{ background: topColor }}
                          >
                            {topType}
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: topColor }}>
                              Closest match
                            </p>
                            <p className="text-sm font-serif font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>
                              Type {topType}, {topTypeData?.name}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-black" style={{ color: topColor }}>
                              {result.enneagramEstimate.topTypeScore}%
                            </p>
                            <p className="text-[9px] font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>
                              match
                            </p>
                          </div>
                        </div>
                        {TYPE_WPFA[topType] && (
                          <p className="text-xs leading-relaxed italic" style={{ color: "rgba(255,255,255,0.6)" }}>
                            {TYPE_WPFA[topType].armor}
                          </p>
                        )}
                      </div>

                      <div
                        className="p-3 rounded-xl flex items-center gap-3"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                          style={{ background: TYPE_COLORS[runnerUp] }}
                        >
                          {runnerUp}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] uppercase tracking-wider font-semibold" style={{ color: "rgba(255,255,255,0.35)" }}>
                            runner-up
                          </p>
                          <p className="text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
                            Type {runnerUp}, {runnerUpData?.name}
                          </p>
                        </div>
                        <span className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.45)" }}>
                          {result.enneagramEstimate.runnerUpScore}%
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Top signals (transparency) */}
              <details
                className="rounded-2xl overflow-hidden"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <summary
                  className="px-4 py-3 cursor-pointer flex items-center justify-between text-xs font-semibold"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  <span className="flex items-center gap-2">
                    <Info className="w-3.5 h-3.5" />
                    What drove your score? (transparency)
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 transition-transform" />
                </summary>
                <div className="px-4 pb-4 space-y-2">
                  <p className="text-[11px] mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Top word categories in your text (sorted by frequency):
                  </p>
                  {result.topCategories.map((c) => (
                    <div key={c.category} className="flex items-center gap-3 text-xs">
                      <div className="flex-1 min-w-0 truncate" style={{ color: "rgba(255,255,255,0.7)" }}>
                        {c.label}
                      </div>
                      <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            background: "linear-gradient(90deg, #8b5cf6, #d946ef)",
                            width: `${Math.min(100, c.percent * 20)}%`,
                          }}
                        />
                      </div>
                      <span className="w-10 text-right font-mono" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {c.percent.toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </details>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={handleClear}
                  className="flex-1 py-3 rounded-2xl text-sm font-semibold transition-all active:scale-95 flex items-center justify-center gap-2"
                  style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear and try again
                </button>
                <Link
                  href="/assessments/quick"
                  className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white transition-all active:scale-95 flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, #8b5cf6, #d946ef)", boxShadow: "0 4px 20px rgba(139,92,246,0.3)" }}
                >
                  Re-take the quiz
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Caveats / drop-downs (always visible, collapsed) ── */}
        <div className="mt-8 space-y-2">

          <details
            className="rounded-2xl overflow-hidden"
            style={{ background: "rgba(251,146,60,0.05)", border: "1px solid rgba(251,146,60,0.2)" }}
            onToggle={(e) => setShowHowItWorks((e.currentTarget as HTMLDetailsElement).open)}
          >
            <summary className="px-4 py-3 cursor-pointer flex items-center justify-between text-xs font-semibold" style={{ color: "#fdba74" }}>
              <span className="flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5" />
                Why you should NOT fully trust this
              </span>
              <ChevronDown className="w-3.5 h-3.5 transition-transform" style={{ transform: showHowItWorks ? "rotate(180deg)" : "none" }} />
            </summary>
            <div className="px-4 pb-4 text-xs leading-relaxed space-y-2" style={{ color: "rgba(255,255,255,0.65)" }}>
              <p>• This is a <strong>lightweight approximation</strong> of a model type personality researchers use, not the real thing. It runs on ~30 word categories. Real LIWC uses 6,400+.</p>
              <p>• Expected accuracy is around <strong>40,55%</strong>. Even state-of-the-art deep-learning models on the same task top out around 60,70%.</p>
              <p>• <strong>Short texts are noise.</strong> Under 250 words = unreliable. Under 100 = meaningless.</p>
              <p>• <strong>Language bias</strong>: the published correlations are from English blog text by college-aged Americans. If you write in another style, the model will miss.</p>
              <p>• <strong>State-dependent:</strong> if you wrote the text on a particularly bad day, the model will read your mood, not your personality.</p>
              <p className="font-semibold pt-1" style={{ color: "rgba(255,255,255,0.8)" }}>
                Treat this as a second opinion, not a verdict. Read the type descriptions and trust your own recognition more than any algorithm.
              </p>
            </div>
          </details>

          <details
            className="rounded-2xl overflow-hidden"
            style={{ background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.2)" }}
          >
            <summary className="px-4 py-3 cursor-pointer flex items-center justify-between text-xs font-semibold" style={{ color: "#c4b5fd" }}>
              <span className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5" />
                How does this work? (the research)
              </span>
              <ChevronDown className="w-3.5 h-3.5" />
            </summary>
            <div className="px-4 pb-4 text-xs leading-relaxed space-y-2" style={{ color: "rgba(255,255,255,0.65)" }}>
              <p>
                The analyzer counts how often your words fall into ~30 psycholinguistic categories (pronouns, emotion words, negations, etc.), then weights each category by its published correlation with the Big Five traits.
              </p>
              <p>
                The correlation coefficients come from <strong>Yarkoni (2010)</strong>, &ldquo;Personality in 100,000 words,&rdquo; a large-scale study of blog text from authors who also took personality questionnaires. Neuroticism ↑ with first-person singular and negations, Agreeableness ↑ with family + positive emotion words, Extraversion ↑ with social words, and so on.
              </p>
              <p>
                The Big Five → Enneagram mapping uses trait profiles from <strong>Newgent et al. (2004)</strong> and subsequent research: Type 1 scores highest on Conscientiousness, Type 5 is the most introverted, Type 2 &amp; 9 score highest on Agreeableness, etc.
              </p>
              <p>
                Your text is tokenized, counted, and scored <strong>entirely in your browser</strong>. No API calls, no uploads. Close the tab, the text is gone.
              </p>
            </div>
          </details>

          <details
            className="rounded-2xl overflow-hidden"
            style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)" }}
            onToggle={(e) => setShowResearch((e.currentTarget as HTMLDetailsElement).open)}
          >
            <summary className="px-4 py-3 cursor-pointer flex items-center justify-between text-xs font-semibold" style={{ color: "#6ee7b7" }}>
              <span className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5" />
                Privacy, where your text goes
              </span>
              <ChevronDown className="w-3.5 h-3.5" style={{ transform: showResearch ? "rotate(180deg)" : "none" }} />
            </summary>
            <div className="px-4 pb-4 text-xs leading-relaxed space-y-2" style={{ color: "rgba(255,255,255,0.65)" }}>
              <p>
                <strong>Nothing is uploaded.</strong> Your text is tokenized and scored by JavaScript running in your browser. There are no network requests, no telemetry, no analytics on what you paste.
              </p>
              <p>
                When you close this tab or navigate away, the text is gone from memory. Nothing is stored in localStorage either, the only thing saved is the Big Five / Enneagram score result, if you choose to save it.
              </p>
              <p>
                This is the opposite of Cambridge Analytica. Your data stays yours. The only beneficiary of this analysis is you.
              </p>
            </div>
          </details>

        </div>

      </div>
    </div>
  );
}
