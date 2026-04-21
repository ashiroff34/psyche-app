"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ArrowRight, BookOpen, Layers, Target, Brain, Compass, Zap } from "lucide-react";
import Image from "next/image";
import { enneagramTypes } from "@/data/enneagram";

// ── Brief card shape ─────────────────────────────────────────────────────────

interface BriefCard {
  title: string;
  body: string;
  highlight?: string;
  learnMore: {
    label: string;
    content: string;
  };
  icon: "layers" | "target" | "brain" | "compass" | "zap" | "arrow";
}

// ── Per-module card data ─────────────────────────────────────────────────────
// Cards are written to directly teach what the quiz will test.

function getCards(moduleId: string, enneagramType?: number): BriefCard[] {

  // ── Warm-Up, teaches exactly what the warmup quiz tests ──────────────────
  if (moduleId === "warmup") {
    return [
      {
        icon: "layers" as const,
        title: "Three Centers of Intelligence",
        body: "The 9 types split into three groups: Body (8, 9, 1) leads with gut instinct. Heart (2, 3, 4) leads with emotion and identity. Head (5, 6, 7) leads with thinking and anxiety.",
        highlight: "Body · Heart · Head",
        learnMore: {
          label: "Why does this matter?",
          content:
            "Each center has a dominant emotion it struggles with:\n\nBody center → Anger (8 expresses it, 1 suppresses it, 9 ignores it)\nHeart center → Shame (2 avoids it by helping, 3 by achieving, 4 by being unique)\nHead center → Fear (5 retreats, 6 doubts, 7 escapes)\n\nKnowing the centers helps you quickly identify which group a type belongs to.",
        },
      },
      {
        icon: "arrow" as const,
        title: "Growth & Stress Arrows",
        body: "Each type has two arrows on the Enneagram symbol, one direction you move when growing (integration) and one when stressed (disintegration). These are specific and fixed.",
        highlight: "growth and stress arrows",
        learnMore: {
          label: "The full arrow map",
          content:
            "Growth directions: 1→7, 2→4, 3→6, 4→1, 5→8, 6→9, 7→5, 8→2, 9→3\nStress directions: 1→4, 2→8, 3→9, 4→2, 5→7, 6→3, 7→1, 8→5, 9→6\n\nExample: A Type 5 (Investigator) grows toward the confidence of Type 8, and under stress takes on the scattered energy of Type 7. These arrows appear in quiz questions.",
        },
      },
      {
        icon: "compass" as const,
        title: "Instinctual Subtypes",
        body: "Every type has three instinctual variants: Self-preservation (sp) focuses on safety and resources. Social (so) focuses on belonging. Sexual/One-to-One (sx) focuses on intensity and connection.",
        highlight: "Self-preservation · Social · Sexual",
        learnMore: {
          label: "How subtypes work",
          content:
            "You have all three instincts, but one dominates. The dominant subtype changes how your type expresses itself, a sp-5 hoards resources and time, an so-5 teaches and shares knowledge in groups, an sx-5 is more intense and focused on one deep connection.\n\nSubtype questions in the quiz describe how a type behaves in specific life situations, watch for those context clues.",
        },
      },
    ];
  }

  // ── Type Deep Dive, personalized to the user's actual type ───────────────
  if (moduleId === "type") {
    const t = enneagramType ? enneagramTypes.find((e) => e.number === enneagramType) : null;

    if (t) {
      const growthTypeName = enneagramTypes.find((e) => e.number === t.integrationLine)?.name ?? `Type ${t.integrationLine}`;
      const stressTypeName = enneagramTypes.find((e) => e.number === t.disintegrationLine)?.name ?? `Type ${t.disintegrationLine}`;
      return [
        {
          icon: "target" as const,
          title: `${t.name}: The Essentials`,
          body: `Core fear: ${t.coreFear} Core desire: ${t.coreDesire}`,
          highlight: t.name.replace("The ", ""),
          learnMore: {
            label: "Core motivation in depth",
            content: `Core motivation: ${t.coreMotivation}\n\n${t.description}`,
          },
        },
        {
          icon: "arrow" as const,
          title: "Your Growth & Stress Arrows",
          body: `Growing toward health, Type ${t.number} takes on qualities of ${growthTypeName}. Under stress, they shift toward ${stressTypeName}. The quiz will also test ALL types' arrows, so learn the full map below.`,
          highlight: "growth and stress",
          learnMore: {
            label: "Full arrow map (all 9 types)",
            content: `Your type: ${t.number}→${t.integrationLine} (growth), ${t.number}→${t.disintegrationLine} (stress)\n\nAll types:\nGrowth: 1→7, 2→4, 3→6, 4→1, 5→8, 6→9, 7→5, 8→2, 9→3\nStress: 1→4, 2→8, 3→9, 4→2, 5→7, 6→3, 7→1, 8→5, 9→6\n\nTo find "which type grows toward Type X", find X on the growth line and trace back. E.g., "which type grows toward 1?" → 4 (because 4→1).`,
          },
        },
        {
          icon: "brain" as const,
          title: "How They Show Up",
          body: `Key traits: ${t.keyTraits.slice(0, 4).join(", ")}. The quiz will ask you to recognize these patterns in real scenarios, relationships, and communication.`,
          highlight: t.keyTraits[0],
          learnMore: {
            label: "Healthy vs. unhealthy range",
            content: `Healthy: ${t.healthyTraits.join(", ")}.\n\nAverage: ${t.averageTraits.join(", ")}.\n\nUnhealthy: ${t.unhealthyTraits.join(", ")}.\n\nWings: ${t.wings.left} / ${t.wings.right}`,
          },
        },
      ];
    }

    // Generic fallback, no enneagramType set yet
    return [
      {
        icon: "target" as const,
        title: "About the Nine Types",
        body: "Each Enneagram type is defined by a core fear and core desire, not by behavior, but by what drives the behavior. Two people can do the same thing for completely different reasons.",
        highlight: "core fear and core desire",
        learnMore: {
          label: "Quick type overview",
          content:
            "1, Reformer: fears being corrupt. 2, Helper: fears being unloved. 3, Achiever: fears being worthless. 4, Individualist: fears having no identity. 5, Investigator: fears being incompetent. 6, Loyalist: fears losing support. 7, Enthusiast: fears being trapped. 8, Challenger: fears being controlled. 9, Peacemaker: fears conflict and loss of peace.",
        },
      },
      {
        icon: "arrow" as const,
        title: "Growth & Stress Arrows",
        body: "Each type has an integration line (growth) and a disintegration line (stress). The quiz will ask: 'Which type's growth arrow points toward Type X?', so memorize the direction.",
        highlight: "integration and disintegration",
        learnMore: {
          label: "Full arrow map",
          content:
            "Growth: 1→7, 2→4, 3→6, 4→1, 5→8, 6→9, 7→5, 8→2, 9→3\nStress: 1→4, 2→8, 3→9, 4→2, 5→7, 6→3, 7→1, 8→5, 9→6\n\nTo find 'which type grows toward Type X', find X in the growth column and look at which type points to it.",
        },
      },
      {
        icon: "layers" as const,
        title: "Centers & Wings",
        body: "Body types (8, 9, 1) lead with instinct. Heart types (2, 3, 4) lead with emotion. Head types (5, 6, 7) lead with thinking. Wings are the adjacent types that flavor your core type.",
        highlight: "Body · Heart · Head",
        learnMore: {
          label: "Wings explained",
          content:
            "Your wing is one of the two types neighboring your core type on the circle. A Type 5 can have a 4-wing (more artistic, withdrawn) or a 6-wing (more anxious, loyal). Wings don't change your core type, they add texture to it. Quiz questions sometimes reference wing behavior.",
        },
      },
    ];
  }

  // ── Cognitive Functions, teaches what the cognitive quiz tests ───────────
  if (moduleId === "cognitive") {
    return [
      {
        icon: "brain" as const,
        title: "The 8 Cognitive Functions",
        body: "There are 4 perceiving functions (Ni, Ne, Si, Se) and 4 judging functions (Fi, Fe, Ti, Te). Each has an introverted (inward-focused) and extraverted (outward-focused) version.",
        highlight: "perceiving and judging",
        learnMore: {
          label: "What each function does",
          content:
            "Ne, brainstorms possibilities, connects patterns outward\nNi, synthesizes insights, sees patterns inward\nSe, lives in the present moment, takes in sensory data\nSi, recalls past experiences, values consistency\n\nFe, reads group emotions, prioritizes harmony\nFi, holds personal values, deep individual ethics\nTe, organizes external systems, values efficiency\nTi, builds internal logic frameworks, precision-focused",
        },
      },
      {
        icon: "layers" as const,
        title: "Function Stacks",
        body: "Everyone uses all 8 functions, but in a ranked order called a 'stack.' Your dominant (1st) is most natural. Your inferior (4th) is your blind spot and stress trigger.",
        highlight: "dominant and inferior",
        learnMore: {
          label: "Example stacks",
          content:
            "INTJ: Ni → Te → Fi → Se (Ni-dominant, Se inferior, great long-term vision, struggles with present-moment awareness)\n\nENFP: Ne → Fi → Te → Si (Ne-dominant, Si inferior, generates ideas easily, struggles with follow-through and routine)\n\nThe quiz tests your ability to recognize function behavior in real-life scenarios.",
        },
      },
      {
        icon: "zap" as const,
        title: "Introverted vs. Extraverted",
        body: "An introverted function processes inward (subjective, personal). An extraverted function engages outward (objective, external). This determines how and where the function is applied.",
        highlight: "introverted vs. extraverted",
        learnMore: {
          label: "Fi vs. Fe example",
          content:
            "Fi (introverted feeling): 'Does this align with MY values?', personal ethics, emotional self-sufficiency, hard to read externally.\n\nFe (extraverted feeling): 'What does the GROUP need emotionally?', reads the room, adjusts tone for harmony, expressive with emotions.\n\nBoth are 'feeling functions' but they operate in opposite directions.",
        },
      },
    ];
  }

  // ── Cross-system / bonus ───────────────────────────────────────────────────
  return [
    {
      icon: "layers" as const,
      title: "Two Lenses, One Person",
      body: "The Enneagram reveals your core motivation and emotional patterns. Cognitive functions reveal how your mind processes information. Together they explain both the WHY and the HOW.",
      highlight: "WHY and the HOW",
      learnMore: {
        label: "How they overlap",
        content:
          "A Type 5 (fears incompetence) with Ti-dominant will spend hours building a private logical framework no one sees. A Type 5 with Te-dominant will organize knowledge into external systems, writing, teaching, structuring. Same fear, different cognitive strategy. The quiz tests whether you can spot both layers at once.",
      },
    },
    {
      icon: "compass" as const,
      title: "Common Type,Function Pairings",
      body: "While no type perfectly predicts a cognitive type, patterns exist. Type 5 often shows Ti or Ni dominance. Type 3 often shows Te or Se. Type 4 often shows Fi or Ni.",
      highlight: "patterns exist",
      learnMore: {
        label: "More pairings",
        content:
          "Type 1 → Si or Te dominant (systematic, principled)\nType 2 → Fe dominant (attuned to others' needs)\nType 6 → Si or Ne dominant (security-seeking, pattern-watching)\nType 7 → Ne dominant (idea-hopping, future-focused)\nType 8 → Se or Te dominant (decisive, present-tense, direct)\nType 9 → Si or Fe dominant (harmonious, routine-seeking)",
      },
    },
    {
      icon: "target" as const,
      title: "What the Quiz Tests",
      body: "You'll be given real-life scenarios and asked to identify both the Enneagram motivation AND the cognitive function at play. Look for: what drives the behavior + how information is being processed.",
      highlight: "motivation AND the cognitive function",
      learnMore: {
        label: "Quiz strategy",
        content:
          "Step 1: Ask 'What does this person WANT or FEAR?' → that points to Enneagram type.\nStep 2: Ask 'How are they processing, inward or outward? Feeling or thinking? Past or future?' → that points to the function.\n\nEliminate answers where either layer doesn't match the scenario.",
      },
    },
  ];
}

// ── Accordion content renderer ───────────────────────────────────────────────
// Detects structured patterns in content strings and renders each as a
// visually distinct element rather than dumping raw text.

function renderLearnContent(raw: string) {
  // Pre-process: split inline type lists "1, Name: desc. 2, Name: desc." into lines
  const preprocessed = raw.replace(/\. (\d. [A-Z])/g, ".\n$1");

  const paragraphs = preprocessed.split("\n\n");

  return (
    <div>
      {paragraphs.map((para, pIdx) => {
        const lines = para.split("\n").filter((l) => l.trim());
        if (lines.length === 0) return null;

        return (
          <div key={pIdx} className={pIdx > 0 ? "mt-4" : ""}>
            {lines.map((line, lIdx) => {
              line = line.trim();
              if (!line) return null;

              const gap = lIdx > 0 ? "mt-2" : "";

              // ── Arrow map lines: "Growth: 1→7, 2→4, …" or "Stress: …" ──
              if (/^(Growth|Stress)[^:]*:/i.test(line)) {
                const colonIdx = line.indexOf(":");
                const label = line.slice(0, colonIdx).trim();
                const pairsRaw = line.slice(colonIdx + 1).trim();
                const pairs = pairsRaw.split(",").map((s) => s.trim()).filter(Boolean);
                const isGrowth = /growth/i.test(label);
                const accentColor = isGrowth ? "#059669" : "#dc2626";
                const chipBg = isGrowth ? "rgba(5,150,105,0.09)" : "rgba(220,38,38,0.07)";
                const chipColor = isGrowth ? "#065f46" : "#991b1b";
                const chipBorder = isGrowth ? "rgba(5,150,105,0.22)" : "rgba(220,38,38,0.18)";
                return (
                  <div key={lIdx} className={gap}>
                    <span
                      className="text-[10px] font-black uppercase tracking-widest"
                      style={{ color: accentColor, letterSpacing: "0.08em" }}
                    >
                      {label}
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {pairs.map((p, pi) => (
                        <span
                          key={pi}
                          className="px-2 py-0.5 rounded-md text-[11px] font-bold"
                          style={{
                            background: chipBg,
                            color: chipColor,
                            border: `1px solid ${chipBorder}`,
                            fontFamily: "ui-monospace, monospace",
                            opacity: 0.95,
                          }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              }

              // ── "Your type:" callout ──
              if (line.startsWith("Your type:")) {
                const detail = line.slice("Your type:".length).trim();
                return (
                  <div
                    key={lIdx}
                    className={`px-3 py-2.5 rounded-xl ${gap}`}
                    style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(167,139,250,0.25)" }}
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#a78bfa" }}>
                      Your type
                    </span>
                    <p
                      className="text-sm font-semibold mt-0.5"
                      style={{ color: "#e9d5ff", fontFamily: "ui-monospace, monospace" }}
                    >
                      {detail}
                    </p>
                  </div>
                );
              }

              // ── "All types:" section label ──
              if (line.toLowerCase() === "all types:") {
                return (
                  <p
                    key={lIdx}
                    className={`text-[10px] font-black uppercase tracking-widest ${gap}`}
                    style={{ color: "#7c3aed" }}
                  >
                    All types
                  </p>
                );
              }

              // ── Center lines: "Body center → Anger (…)" ──
              if (/^(Body|Heart|Head) center/i.test(line)) {
                const arrowIdx = line.indexOf("→");
                const centerLabel = arrowIdx > -1 ? line.slice(0, arrowIdx).trim() : line;
                const rest = arrowIdx > -1 ? line.slice(arrowIdx + 1).trim() : "";
                const emoMatch = rest.match(/^(\w+)(.*)/);
                const emotion = emoMatch?.[1] ?? rest;
                const detail = emoMatch?.[2]?.trim() ?? "";

                const CENTER_STYLES: Record<string, { bg: string; badge: string; text: string }> = {
                  "Body center":  { bg: "rgba(239,68,68,0.07)",  badge: "#ef4444", text: "#7f1d1d" },
                  "Heart center": { bg: "rgba(236,72,153,0.07)", badge: "#ec4899", text: "#831843" },
                  "Head center":  { bg: "rgba(59,130,246,0.07)", badge: "#3b82f6", text: "#1e3a8a" },
                };
                const s = CENTER_STYLES[centerLabel] ?? { bg: "#ede9fe", badge: "#7c3aed", text: "#4c1d95" };

                return (
                  <div
                    key={lIdx}
                    className={`flex items-start gap-2.5 px-3 py-2 rounded-xl ${gap}`}
                    style={{ background: s.bg }}
                  >
                    <span
                      className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded-md text-white flex-shrink-0 mt-0.5 tracking-wide"
                      style={{ background: s.badge }}
                    >
                      {centerLabel.split(" ")[0]}
                    </span>
                    <div className="leading-snug">
                      <span className="text-sm font-bold" style={{ color: s.text }}>{emotion} </span>
                      {detail && (
                        <span className="text-xs" style={{ color: s.text, opacity: 0.75 }}>{detail}</span>
                      )}
                    </div>
                  </div>
                );
              }

              // ── Trait lines: "Healthy: …", "Average: …", "Unhealthy: …", "Wings: …" ──
              const traitMatch = line.match(/^(Healthy|Average|Unhealthy|Wings): (.+)/i);
              if (traitMatch) {
                const TRAIT_STYLES: Record<string, { bg: string; badge: string; text: string }> = {
                  healthy:   { bg: "rgba(5,150,105,0.07)",  badge: "#10b981", text: "#065f46" },
                  average:   { bg: "rgba(245,158,11,0.07)", badge: "#f59e0b", text: "#92400e" },
                  unhealthy: { bg: "rgba(239,68,68,0.07)",  badge: "#ef4444", text: "#991b1b" },
                  wings:     { bg: "rgba(124,58,237,0.07)", badge: "#7c3aed", text: "#4c1d95" },
                };
                const key = traitMatch[1].toLowerCase();
                const s = TRAIT_STYLES[key] ?? TRAIT_STYLES.wings;
                return (
                  <div
                    key={lIdx}
                    className={`px-3 py-2.5 rounded-xl ${gap}`}
                    style={{ background: s.bg }}
                  >
                    <span
                      className="text-[10px] font-black uppercase tracking-widest text-white inline-block px-1.5 py-0.5 rounded-md mb-1"
                      style={{ background: s.badge }}
                    >
                      {traitMatch[1]}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: s.text }}>
                      {traitMatch[2]}
                    </p>
                  </div>
                );
              }

              // ── "Core motivation:" callout ──
              if (/^core motivation:/i.test(line)) {
                const text = line.replace(/^core motivation:\s*/i, "");
                return (
                  <div
                    key={lIdx}
                    className={`px-3 py-2.5 rounded-xl ${gap}`}
                    style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(167,139,250,0.25)" }}
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#a78bfa" }}>
                      Core motivation
                    </span>
                    <p className="text-sm leading-relaxed mt-0.5" style={{ color: "rgba(233,213,255,0.85)" }}>{text}</p>
                  </div>
                );
              }

              // ── MBTI stack lines: "INTJ: Ni → Te → Fi → Se (note)" ──
              const stackMatch = line.match(/^([A-Z]{4}): (.+?) \((.+)\)/);
              if (stackMatch) {
                const mbti = stackMatch[1];
                const fnList = stackMatch[2].split("→").map((s) => s.trim());
                const note = stackMatch[3];
                return (
                  <div
                    key={lIdx}
                    className={`px-3 py-2.5 rounded-xl ${gap}`}
                    style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(167,139,250,0.2)" }}
                  >
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className="text-sm font-black" style={{ color: "#e9d5ff" }}>{mbti}</span>
                      <div className="flex items-center gap-1 flex-wrap">
                        {fnList.map((fn, fi) => (
                          <div key={fi} className="flex items-center gap-1">
                            {fi > 0 && (
                              <span style={{ color: "#c4b5fd", fontSize: 11 }}>›</span>
                            )}
                            <span
                              className="px-1.5 py-0.5 rounded text-[11px] font-bold"
                              style={{
                                fontFamily: "ui-monospace, monospace",
                                background: fi === 0 ? "#7c3aed" : fi === fnList.length - 1 ? "#f1f0ff" : "#ede9fe",
                                color: fi === 0 ? "#fff" : fi === fnList.length - 1 ? "#a78bfa" : "#5b21b6",
                                boxShadow: fi === 0 ? "0 1px 4px rgba(124,58,237,0.3)" : "none",
                              }}
                            >
                              {fn}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(216,180,254,0.75)" }}>{note}</p>
                  </div>
                );
              }

              // ── Function badge lines: "Ne, description" or "Fi, description" ──
              const funcMatch = line.match(/^([A-Z][a-z]?) [,] (.+)/);
              if (funcMatch) {
                const fn = funcMatch[1];
                const desc = funcMatch[2];
                const isPerceiving = ["Ni", "Ne", "Si", "Se"].includes(fn);
                return (
                  <div key={lIdx} className={`flex gap-2.5 items-start ${gap}`}>
                    <span
                      className="px-1.5 py-0.5 rounded text-[11px] font-bold flex-shrink-0 mt-0.5"
                      style={{
                        fontFamily: "ui-monospace, monospace",
                        background: isPerceiving ? "#dbeafe" : "#ede9fe",
                        color: isPerceiving ? "#1e40af" : "#5b21b6",
                        border: `1px solid ${isPerceiving ? "#bfdbfe" : "#ddd6fe"}`,
                      }}
                    >
                      {fn}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(216,180,254,0.78)" }}>{desc}</p>
                  </div>
                );
              }

              // ── Function detail: "Fi (introverted feeling): '…', …" ──
              const funcDetail = line.match(/^([A-Z][a-z]?) \(([^)]+)\): (.+)/);
              if (funcDetail) {
                const fn = funcDetail[1];
                const fullName = funcDetail[2];
                const content = funcDetail[3];
                const isPerceiving = ["Ni", "Ne", "Si", "Se"].includes(fn);
                return (
                  <div key={lIdx} className={gap}>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="px-1.5 py-0.5 rounded text-[11px] font-bold"
                        style={{
                          fontFamily: "ui-monospace, monospace",
                          background: isPerceiving ? "#dbeafe" : "#ede9fe",
                          color: isPerceiving ? "#1e40af" : "#5b21b6",
                        }}
                      >
                        {fn}
                      </span>
                      <span className="text-xs font-semibold" style={{ color: "#7c3aed" }}>
                        {fullName}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed pl-0.5" style={{ color: "rgba(216,180,254,0.78)" }}>{content}</p>
                  </div>
                );
              }

              // ── Type-function pairings: "Type 1 → Si or Te dominant (…)" ──
              const typeFuncMatch = line.match(/^Type (\d) → (.+)/);
              if (typeFuncMatch) {
                return (
                  <div key={lIdx} className={`flex gap-2.5 items-start ${gap}`}>
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5"
                      style={{
                        background: "#ede9fe",
                        color: "#5b21b6",
                        border: "1px solid #ddd6fe",
                      }}
                    >
                      {typeFuncMatch[1]}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(216,180,254,0.78)" }}>
                      {typeFuncMatch[2]}
                    </p>
                  </div>
                );
              }

              // ── Single type entry: "5, Investigator: fears being incompetent." ──
              const typeLineMatch = line.match(/^(\d). ([A-Z][^:]+): (.+)/);
              if (typeLineMatch) {
                return (
                  <div key={lIdx} className={`flex gap-2.5 items-start ${gap}`}>
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5"
                      style={{ background: "#ede9fe", color: "#5b21b6", border: "1px solid #ddd6fe" }}
                    >
                      {typeLineMatch[1]}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(216,180,254,0.78)" }}>
                      <span className="font-semibold" style={{ color: "#4c1d95" }}>
                        {typeLineMatch[2]}:{" "}
                      </span>
                      {typeLineMatch[3]}
                    </p>
                  </div>
                );
              }

              // ── Step lines: "Step 1: …" ──
              const stepMatch = line.match(/^Step (\d+): (.+)/);
              if (stepMatch) {
                return (
                  <div key={lIdx} className={`flex gap-2.5 items-start ${gap}`}>
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-black text-white"
                      style={{ background: "#7c3aed" }}
                    >
                      {stepMatch[1]}
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(216,180,254,0.78)" }}>
                      {stepMatch[2]}
                    </p>
                  </div>
                );
              }

              // ── Fallthrough: plain paragraph text ──
              return (
                <p key={lIdx} className={`text-sm leading-relaxed ${gap}`} style={{ color: "rgba(216,180,254,0.78)" }}>
                  {line}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// ── Props ────────────────────────────────────────────────────────────────────

interface Props {
  moduleId: string;
  moduleName: string;
  enneagramType?: number;
  onBeginQuiz: () => void;
  onSkip: () => void;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function LessonBriefOverlay({
  moduleId,
  moduleName,
  enneagramType,
  onBeginQuiz,
  onSkip,
}: Props) {
  const cards = getCards(moduleId, enneagramType);
  const [cardIdx, setCardIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const card = cards[cardIdx];
  const isLast = cardIdx === cards.length - 1;

  const goNext = () => {
    if (isLast) {
      onBeginQuiz();
      return;
    }
    setDirection(1);
    setExpanded(false);
    setCardIdx((i) => i + 1);
  };

  const goBack = () => {
    if (cardIdx === 0) return;
    setDirection(-1);
    setExpanded(false);
    setCardIdx((i) => i - 1);
  };

  const ICON_MAP = {
    layers: Layers,
    target: Target,
    brain: Brain,
    compass: Compass,
    zap: Zap,
    arrow: ArrowRight,
  };

  const CardIcon = ICON_MAP[card.icon] ?? Layers;

  // Chibi for the header — derive instinct prefix from profile so sx/so users get the right sprite
  const chibiSrc = (() => {
    if (!enneagramType) return "/sprites/chibi/5-sp5.png?v=2";
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("psyche-profile") : null;
      if (raw) {
        const p = JSON.parse(raw);
        const subtype: string = p.enneagramSubtype ?? p.instinctualStacking ?? "";
        // instinctualStacking is like "sp/sx" — take the first segment
        const instinct = subtype.split("/")[0]?.toLowerCase() ?? "sp";
        const prefix = ["sp", "sx", "so"].includes(instinct) ? instinct : "sp";
        return `/sprites/chibi/${enneagramType}-${prefix}${enneagramType}.png?v=2`;
      }
    } catch {}
    return `/sprites/chibi/${enneagramType}-sp${enneagramType}.png?v=2`;
  })();

  const renderBody = (body: string, highlight?: string) => {
    if (!highlight) return <span>{body}</span>;
    const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = body.split(new RegExp(`(${escaped})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight?.toLowerCase() ? (
            <span key={i} style={{ color: "#c4b5fd", fontWeight: 600 }}>{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex flex-col"
      style={{ background: "#0f0a1e" }}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 260 }}
    >
      {/* ── Dark header with chibi ────────────────────────────────────────── */}
      <div
        className="relative flex-shrink-0 px-5 pt-12 pb-6"
        style={{ background: "linear-gradient(160deg, #160f38 0%, #1e1548 100%)" }}
      >
        {/* Skip */}
        <button
          onClick={onSkip}
          className="absolute top-12 right-5 text-sm font-medium flex items-center gap-1"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Skip <ArrowRight size={13} />
        </button>

        {/* Tag */}
        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          style={{ background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.25)", color: "#a78bfa" }}
        >
          <BookOpen size={11} />
          Before you quiz
        </div>

        {/* Module name + chibi row */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white leading-tight">{moduleName}</h2>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              Quick primer · {cards.length} ideas
            </p>
          </div>
          <Image
            src={chibiSrc}
            alt=""
            width={64}
            height={64}
            className="object-contain flex-shrink-0"
            style={{ filter: "drop-shadow(0 0 12px rgba(167,139,250,0.5))" }}
          />
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2 mt-5">
          {cards.map((_, i) => (
            <motion.div
              key={i}
              className="h-1 rounded-full"
              animate={{
                width: i === cardIdx ? 22 : 7,
                opacity: i <= cardIdx ? 1 : 0.25,
              }}
              style={{
                background: i === cardIdx ? "linear-gradient(90deg,#a78bfa,#818cf8)" : "rgba(255,255,255,0.3)",
              }}
              transition={{ duration: 0.25 }}
            />
          ))}
        </div>
      </div>

      {/* ── Card area ─────────────────────────────────────────────────────── */}
      <div className="flex-1 px-5 pt-5 pb-4 overflow-y-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={cardIdx}
            custom={direction}
            initial={{ opacity: 0, x: direction * 36 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -36 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col"
          >
            {/* Card */}
            <div
              className="rounded-2xl p-5 flex-shrink-0"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(139,92,246,0.2)",
                boxShadow: "0 2px 24px rgba(139,92,246,0.08)",
              }}
            >
              {/* Icon + counter */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(167,139,250,0.25)" }}
                >
                  <CardIcon size={18} style={{ color: "#a78bfa" }} />
                </div>
                <span
                  className="text-xs font-bold rounded-full px-2.5 py-0.5"
                  style={{ background: "rgba(139,92,246,0.15)", color: "#c4b5fd", border: "1px solid rgba(167,139,250,0.25)" }}
                >
                  {cardIdx + 1} / {cards.length}
                </span>
              </div>

              <h3 className="text-lg font-bold mb-2.5 leading-snug" style={{ color: "rgba(255,255,255,0.95)" }}>
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                {renderBody(card.body, card.highlight)}
              </p>
            </div>

            {/* Learn More accordion */}
            <div className="mt-3">
              <button
                onClick={() => setExpanded((v) => !v)}
                className="flex items-center gap-2 w-full text-left px-4 py-3 rounded-xl transition-colors"
                style={{ background: expanded ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.03)", border: "1px solid rgba(139,92,246,0.15)" }}
              >
                <BookOpen size={14} style={{ color: "#a78bfa" }} className="flex-shrink-0" />
                <span className="text-sm font-semibold flex-1" style={{ color: "#c4b5fd" }}>
                  {card.learnMore.label}
                </span>
                {expanded
                  ? <ChevronUp size={14} style={{ color: "#a78bfa" }} />
                  : <ChevronDown size={14} style={{ color: "#a78bfa" }} />
                }
              </button>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div
                      className="mx-1 px-4 pb-4 pt-3 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(139,92,246,0.12)" }}
                    >
                      {renderLearnContent(card.learnMore.content)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom nav ────────────────────────────────────────────────────── */}
      <div className="px-5 pb-8 pt-4 flex items-center gap-3">
        {cardIdx > 0 && (
          <button
            onClick={goBack}
            className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(167,139,250,0.3)", color: "#c4b5fd" }}
          >
            <ArrowRight size={18} className="rotate-180" />
          </button>
        )}

        <motion.button
          onClick={goNext}
          whileTap={{ scale: 0.97 }}
          className="flex-1 h-14 rounded-2xl font-bold text-white flex items-center justify-center gap-2 text-base"
          style={{
            background: isLast
              ? "linear-gradient(135deg, #7c3aed, #4f46e5)"
              : "linear-gradient(135deg, #2d1f6e, #1e1548)",
            boxShadow: isLast ? "0 6px 20px rgba(124,58,237,0.3)" : "none",
          }}
        >
          {isLast ? "Begin Quiz" : <>Next <ArrowRight size={16} /></>}
        </motion.button>
      </div>
    </motion.div>
  );
}
