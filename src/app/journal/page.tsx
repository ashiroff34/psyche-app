"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FlaskConical,
  Ghost,
  Activity,
  RefreshCw,
  BarChart3,
  Eye,
  Zap,
  TrendingUp,
  Shield,
  Skull,
  Crown,
  Baby,
  Heart,
  Swords,
  AlertTriangle,
  HelpCircle,
  Flame,
  Brain,
  Lightbulb,
  Target,
  Compass,
  Plus,
  X,
  ChevronDown,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { cognitiveFunctions, mbtiTypes } from "@/data/cognitive-functions";
import NextStepBanner from "@/components/NextStepBanner";
import PetCompanion from "@/components/PetCompanion";
import {
  shadowPositions,
  functionLoops,
  gripExperiences,
} from "@/data/deep-cognitive";
import Link from "next/link";
import { useGameState } from "@/hooks/useGameState";

// ============================================================
// Types
// ============================================================

type TabId = "shadow" | "dynamics" | "reframe" | "patterns" | "journal";

interface PatternLog {
  id: string;
  functionCode: string;
  note: string;
  timestamp: string;
  date: string;
}

// Enneagram Journal types
type TopicTag = "growth" | "stress" | "relationships" | "shadow";

interface EnneagramJournalEntry {
  id: string;
  text: string;
  typeTags: number[];
  topicTags: TopicTag[];
  timestamp: string;
  date: string;
}

const TOPIC_LABELS: Record<TopicTag, string> = {
  growth: "Growth",
  stress: "Stress",
  relationships: "Relationships",
  shadow: "Shadow",
};

const TOPIC_COLORS: Record<TopicTag, string> = {
  growth: "#22c55e",
  stress: "#ef4444",
  relationships: "#3b82f6",
  shadow: "#a78bfa",
};

interface ShadowEntry {
  ego: string;
  shadow: string;
}

// ============================================================
// Constants
// ============================================================

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "shadow", label: "Shadow Work", icon: <Ghost className="w-4 h-4" /> },
  {
    id: "dynamics",
    label: "Dynamics",
    icon: <Activity className="w-4 h-4" />,
  },
  {
    id: "reframe",
    label: "Reframe",
    icon: <RefreshCw className="w-4 h-4" />,
  },
  {
    id: "patterns",
    label: "Patterns",
    icon: <BarChart3 className="w-4 h-4" />,
  },
  {
    id: "journal",
    label: "Journal",
    icon: <MessageSquare className="w-4 h-4" />,
  },
];

const archetypeIcons: Record<number, React.ReactNode> = {
  1: <Crown className="w-4 h-4" />,
  2: <Shield className="w-4 h-4" />,
  3: <Baby className="w-4 h-4" />,
  4: <Heart className="w-4 h-4" />,
  5: <Swords className="w-4 h-4" />,
  6: <AlertTriangle className="w-4 h-4" />,
  7: <HelpCircle className="w-4 h-4" />,
  8: <Skull className="w-4 h-4" />,
};

const functionColorMap: Record<string, string> = {};
cognitiveFunctions.forEach((f) => {
  functionColorMap[f.code] = f.color;
});

function getFullStack(stack: string[]): string[] {
  const opposites: Record<string, string> = {
    Ni: "Ne",
    Ne: "Ni",
    Si: "Se",
    Se: "Si",
    Ti: "Te",
    Te: "Ti",
    Fi: "Fe",
    Fe: "Fi",
  };
  return [...stack, ...stack.map((f) => opposites[f])];
}

function getFunctionColor(code: string): string {
  return functionColorMap[code] || "#64748b";
}

function getFunctionData(code: string) {
  return cognitiveFunctions.find((f) => f.code === code);
}

// ============================================================
// Lens Data for Reframe Tool
// ============================================================

interface LensConfig {
  position: string;
  label: string;
  question: (fnName: string, fnCode: string) => string;
  reframe: (fnName: string) => string;
}

const lensConfigs: LensConfig[] = [
  {
    position: "Dominant",
    label: "Your Comfort Zone",
    question: (name, code) =>
      `How would your ${name} (${code}) naturally approach this? What does your strongest perspective reveal?`,
    reframe: (name) =>
      `Through the lens of ${name}, you instinctively see...`,
  },
  {
    position: "Auxiliary",
    label: "Your Support System",
    question: (name, code) =>
      `What balancing perspective does ${name} (${code}) offer? How does your supportive function add nuance?`,
    reframe: (name) =>
      `${name} adds a crucial balancing layer by showing you...`,
  },
  {
    position: "Tertiary",
    label: "Your Playful Edge",
    question: (name, code) =>
      `What creative or unexpected angle does ${name} (${code}) suggest? Where is the playful, less-developed perspective?`,
    reframe: (name) =>
      `Your developing ${name} offers a fresh, creative take...`,
  },
  {
    position: "Inferior",
    label: "Your Growth Frontier",
    question: (name, code) =>
      `What would ${name} (${code}) reveal if you dared to listen? What uncomfortable truth might your weakest function show?`,
    reframe: (name) =>
      `Your inferior ${name} whispers something profound...`,
  },
];

// ============================================================
// localStorage helpers
// ============================================================

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or blocked
  }
}

// ============================================================
// Type Grid Component
// ============================================================

function TypeGrid({
  selected,
  onSelect,
  compact,
}: {
  selected: string;
  onSelect: (code: string) => void;
  compact?: boolean;
}) {
  const groups = [
    { label: "Analysts", types: ["INTJ", "INTP", "ENTJ", "ENTP"] },
    { label: "Diplomats", types: ["INFJ", "INFP", "ENFJ", "ENFP"] },
    { label: "Sentinels", types: ["ISTJ", "ISFJ", "ESTJ", "ESFJ"] },
    { label: "Explorers", types: ["ISTP", "ISFP", "ESTP", "ESFP"] },
  ];

  return (
    <div className={`grid grid-cols-4 ${compact ? "gap-1.5" : "gap-2"}`}>
      {groups.map((group) =>
        group.types.map((code) => {
          const t = mbtiTypes.find((mt) => mt.code === code);
          const isSelected = selected === code;
          return (
            <motion.button
              key={code}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(code)}
              className={`relative ${compact ? "px-2 py-1.5" : "px-3 py-2.5"} rounded-xl font-mono text-xs font-semibold transition-all duration-200 ${
                isSelected
                  ? "text-white shadow-lg shadow-indigo-200/50 ring-2 ring-white/50"
                  : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/[0.09]"
              }`}
              style={
                isSelected
                  ? {
                      background: `linear-gradient(135deg, ${t?.color || "#6366f1"}, ${t?.color || "#6366f1"}dd)`,
                    }
                  : undefined
              }
            >
              {code}
              {isSelected && (
                <motion.div
                  layoutId="type-indicator"
                  className="absolute inset-0 rounded-xl ring-2 ring-white/30"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })
      )}
    </div>
  );
}

// ============================================================
// SECTION 1: Shadow Work Explorer
// ============================================================

function ShadowWorkExplorer() {
  const [selectedType, setSelectedType] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [dialogue, setDialogue] = useState<ShadowEntry>({
    ego: "",
    shadow: "",
  });
  const [savedDialogues, setSavedDialogues] = useState<
    (ShadowEntry & { date: string; position: number; type: string })[]
  >([]);

  useEffect(() => {
    setSavedDialogues(loadFromStorage("psyche-shadow-dialogues", []));
  }, []);

  const typeData = mbtiTypes.find((t) => t.code === selectedType);
  const fullStack = typeData ? getFullStack(typeData.stack) : [];

  const shadowPrompts: Record<number, string[]> = {
    5: [
      "When do you feel your worldview being challenged in a way that makes you dig in?",
      "Recall a time you were stubbornly oppositional. What felt threatened?",
      "How does your Opposing Personality show up in conflicts?",
    ],
    6: [
      "What is the harshest judgment you hold about yourself? Where did it come from?",
      "When do you become unexpectedly critical of others?",
      "How does your inner Critical Parent try to protect you?",
    ],
    7: [
      "Think of a time you were confused by your own behavior. What function might the Trickster have been using?",
      "Where in your life do you encounter recurring blind spots?",
      "What double-binds keep appearing in your relationships?",
    ],
    8: [
      "What is the most destructive pattern you fall into under extreme stress?",
      "What would it look like to transform your Demon function into an ally?",
      "What deeply buried truth does your Demon function guard?",
    ],
  };

  const handleSaveDialogue = () => {
    if (
      !dialogue.ego.trim() &&
      !dialogue.shadow.trim()
    )
      return;
    if (selectedPosition === null) return;
    const entry = {
      ...dialogue,
      date: new Date().toISOString(),
      position: selectedPosition,
      type: selectedType,
    };
    const updated = [entry, ...savedDialogues];
    setSavedDialogues(updated);
    saveToStorage("psyche-shadow-dialogues", updated);
    setDialogue({ ego: "", shadow: "" });
  };

  return (
    <div className="space-y-8">
      {/* Type Selector */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-3xl backdrop-blur-xl shadow-lg"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
      >
        <h3 className="font-serif font-bold text-lg text-white mb-1">
          Select Your Type
        </h3>
        <p className="text-sm text-white/60 mb-4">
          Choose your cognitive type to explore your 8-function shadow stack
        </p>
        <TypeGrid selected={selectedType} onSelect={setSelectedType} />
      </motion.div>

      {/* 8-Function Stack */}
      <AnimatePresence mode="wait">
        {typeData && (
          <motion.div
            key={selectedType + "-stack"}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 rounded-3xl backdrop-blur-xl shadow-lg"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
          >
            <h3 className="font-serif font-bold text-lg text-white mb-1">
              {selectedType} Full Cognitive Stack
            </h3>
            <p className="text-sm text-white/60 mb-5">
              Click any shadow function (5-8) to explore it
            </p>

            <div className="space-y-2.5">
              {fullStack.map((fnCode, i) => {
                const pos = i + 1;
                const sp = shadowPositions[i];
                const fn = getFunctionData(fnCode);
                const isShadow = pos >= 5;
                const isActive = selectedPosition === pos;

                return (
                  <motion.button
                    key={fnCode + pos}
                    initial={{ opacity: 1, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() =>
                      isShadow
                        ? setSelectedPosition(isActive ? null : pos)
                        : undefined
                    }
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-200 border ${
                      isActive
                        ? "border-violet-500/30 shadow-md"
                        : isShadow
                          ? "border-white/[0.09] hover:border-violet-500/20 cursor-pointer"
                          : "border-white/[0.09]"
                    }`}
                    style={
                      isActive
                        ? { background: "rgba(139,92,246,0.15)" }
                        : { background: "rgba(255,255,255,0.04)" }
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isShadow ? "opacity-80" : ""
                        }`}
                        style={{
                          background: `linear-gradient(135deg, ${getFunctionColor(fnCode)}22, ${getFunctionColor(fnCode)}44)`,
                          color: getFunctionColor(fnCode),
                        }}
                      >
                        {archetypeIcons[pos]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="font-mono text-sm font-bold"
                            style={{ color: getFunctionColor(fnCode) }}
                          >
                            {fnCode}
                          </span>
                          <span className="text-xs text-white/60">
                            {fn?.name}
                          </span>
                          <span
                            className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                              isShadow
                                ? "bg-purple-500/15 text-purple-300"
                                : "bg-violet-500/15 text-violet-300"
                            }`}
                          >
                            {sp?.archetype}
                          </span>
                        </div>
                        <p className="text-xs text-white/35 mt-0.5 truncate">
                          {sp?.role}
                        </p>
                      </div>
                      {isShadow && (
                        <ChevronDown
                          className={`w-4 h-4 text-white/35 transition-transform ${isActive ? "rotate-180" : ""}`}
                        />
                      )}
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-white/[0.09] space-y-3">
                            <p className="text-sm text-white/80 leading-relaxed">
                              {sp?.description}
                            </p>
                            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                              <p className="text-xs font-medium text-indigo-400 mb-1">
                                How it feels:
                              </p>
                              <p className="text-xs text-white/60 leading-relaxed">
                                {sp?.experienceDescription}
                              </p>
                            </div>
                            {shadowPrompts[pos] && (
                              <div className="space-y-2">
                                <p className="text-xs font-semibold text-white/80">
                                  Exploration Prompts:
                                </p>
                                {shadowPrompts[pos].map((prompt, pi) => (
                                  <div
                                    key={pi}
                                    className="flex items-start gap-2 p-2 rounded-lg bg-purple-500/10"
                                  >
                                    <Sparkles className="w-3 h-3 text-purple-400 mt-0.5 shrink-0" />
                                    <p className="text-xs text-white/60 italic leading-relaxed">
                                      {prompt}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shadow Dialogue */}
      {typeData && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-3xl backdrop-blur-xl shadow-lg"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-5 h-5 text-indigo-400" />
            <h3 className="font-serif font-bold text-lg text-white">
              Shadow Dialogue
            </h3>
          </div>
          <p className="text-sm text-white/60 mb-5">
            Active Imagination: Write as your ego on the left, let your shadow
            respond on the right
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-violet-300 mb-2">
                <Eye className="w-3.5 h-3.5" /> Your Ego (Conscious)
              </label>
              <textarea
                value={dialogue.ego}
                onChange={(e) =>
                  setDialogue((d) => ({ ...d, ego: e.target.value }))
                }
                placeholder="Speak from your conscious self... What are you struggling with? What do you want?"
                className="w-full h-48 p-4 rounded-2xl text-sm text-white/80 leading-relaxed placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none transition"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-purple-300 mb-2">
                <Ghost className="w-3.5 h-3.5" /> Your Shadow (Unconscious)
              </label>
              <textarea
                value={dialogue.shadow}
                onChange={(e) =>
                  setDialogue((d) => ({ ...d, shadow: e.target.value }))
                }
                placeholder="Let your shadow speak... What does it want you to see? What have you been avoiding?"
                className="w-full h-48 p-4 rounded-2xl text-sm text-white/80 leading-relaxed placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none transition"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
              />
            </div>
          </div>

          <div className="flex items-center justify-end mt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSaveDialogue}
              disabled={!dialogue.ego.trim() && !dialogue.shadow.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium disabled:opacity-40 hover:shadow-lg hover:shadow-indigo-200/50 transition-all"
            >
              Save Dialogue
            </motion.button>
          </div>

          {savedDialogues.length > 0 && (
            <div className="mt-6 pt-6 border-t border-white/[0.09]">
              <p className="text-xs font-semibold text-white/60 mb-3">
                Past Dialogues ({savedDialogues.length})
              </p>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {savedDialogues.slice(0, 5).map((d, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl text-xs"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/35">
                        {new Date(d.date).toLocaleDateString()}
                      </span>
                      <span className="font-mono text-indigo-400">
                        {d.type}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-lg bg-violet-500/10">
                        <p className="text-white/60 line-clamp-2">{d.ego}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-purple-500/10">
                        <p className="text-white/60 line-clamp-2">
                          {d.shadow}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

// ============================================================
// SECTION 2: Type Dynamics Simulator
// ============================================================

function TypeDynamicsSimulator() {
  const [selectedType, setSelectedType] = useState("");
  const [mode, setMode] = useState<"normal" | "stress" | "growth">("normal");

  const typeData = mbtiTypes.find((t) => t.code === selectedType);
  const loopData = functionLoops.find((l) => l.type === selectedType);
  const gripData = gripExperiences.find((g) => g.type === selectedType);

  const energyLevels: Record<string, { normal: number; stress: number; growth: number }> = typeData
    ? {
        [typeData.stack[0]]: { normal: 90, stress: 60, growth: 85 },
        [typeData.stack[1]]: { normal: 70, stress: 30, growth: 80 },
        [typeData.stack[2]]: { normal: 45, stress: 75, growth: 60 },
        [typeData.stack[3]]: { normal: 20, stress: 85, growth: 45 },
      }
    : {};

  const positionLabels = ["Dominant", "Auxiliary", "Tertiary", "Inferior"];

  return (
    <div className="space-y-8">
      {/* Type Selector */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-3xl backdrop-blur-xl shadow-lg"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
      >
        <h3 className="font-serif font-bold text-lg text-white mb-1">
          Select Your Type
        </h3>
        <p className="text-sm text-white/60 mb-4">
          See how your cognitive functions behave under different conditions
        </p>
        <TypeGrid selected={selectedType} onSelect={(code) => { setSelectedType(code); setMode("normal"); }} />
      </motion.div>

      <AnimatePresence mode="wait">
        {typeData && (
          <motion.div
            key={selectedType + "-dynamics"}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Mode Switches */}
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                {
                  id: "normal" as const,
                  label: "Balanced",
                  icon: <Compass className="w-4 h-4" />,
                  color: "from-sky-400 to-blue-500",
                },
                {
                  id: "stress" as const,
                  label: "Stress Mode",
                  icon: <Zap className="w-4 h-4" />,
                  color: "from-orange-400 to-red-500",
                },
                {
                  id: "growth" as const,
                  label: "Growth Mode",
                  icon: <TrendingUp className="w-4 h-4" />,
                  color: "from-emerald-400 to-teal-500",
                },
              ].map((m) => (
                <motion.button
                  key={m.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setMode(m.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                    mode === m.id
                      ? `bg-gradient-to-r ${m.color} text-white shadow-lg`
                      : "bg-white/5 text-white/60 border border-white/[0.09] hover:bg-white/10"
                  }`}
                >
                  {m.icon}
                  {m.label}
                </motion.button>
              ))}
            </div>

            {/* Function Dashboard */}
            <motion.div
              layout
              className="p-6 rounded-3xl backdrop-blur-xl shadow-lg"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
            >
              <h3 className="font-serif font-bold text-lg text-white mb-5">
                Function Energy Dashboard
              </h3>

              <div className="space-y-5">
                {typeData.stack.map((fnCode, i) => {
                  const fn = getFunctionData(fnCode);
                  const energy = energyLevels[fnCode]?.[mode] || 50;
                  const isStressOveractive = mode === "stress" && i >= 2;
                  const isStressUnderactive = mode === "stress" && i <= 1;

                  return (
                    <motion.div
                      key={fnCode}
                      layout
                      className="space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="font-mono text-sm font-bold"
                            style={{ color: getFunctionColor(fnCode) }}
                          >
                            {fnCode}
                          </span>
                          <span className="text-xs text-white/60">
                            {fn?.name}
                          </span>
                          <span className="text-xs text-white/35">
                            ({positionLabels[i]})
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {isStressOveractive && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 animate-pulse">
                              overactive
                            </span>
                          )}
                          {isStressUnderactive && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400">
                              suppressed
                            </span>
                          )}
                          <span className="text-xs font-mono text-white/35 w-8 text-right">
                            {energy}%
                          </span>
                        </div>
                      </div>
                      <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${energy}%` }}
                          transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 15,
                            delay: i * 0.1,
                          }}
                          className={`h-full rounded-full ${
                            isStressOveractive
                              ? "animate-pulse"
                              : ""
                          }`}
                          style={{
                            background: `linear-gradient(90deg, ${getFunctionColor(fnCode)}aa, ${getFunctionColor(fnCode)})`,
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Mode-specific Content */}
            <AnimatePresence mode="wait">
              {mode === "stress" && (
                <motion.div
                  key="stress-content"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {/* Tertiary Loop */}
                  {loopData && (
                    <div className="p-6 rounded-3xl backdrop-blur-xl border border-orange-500/30 shadow-lg" style={{ background: "rgba(249,115,22,0.08)" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-500/15 flex items-center justify-center">
                          <Flame className="w-4 h-4 text-orange-400" />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-white">
                            Tertiary Loop: {loopData.loop}
                          </h4>
                          <p className="text-xs text-orange-400">
                            Bypassing auxiliary function
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-white/80 leading-relaxed mb-4">
                        {loopData.description}
                      </p>
                      <div className="space-y-2 mb-4">
                        <p className="text-xs font-semibold text-white/80">
                          Warning Signs:
                        </p>
                        {loopData.signs.map((sign, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-xs text-white/60"
                          >
                            <AlertTriangle className="w-3 h-3 text-orange-400 mt-0.5 shrink-0" />
                            {sign}
                          </div>
                        ))}
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <p className="text-xs font-semibold text-emerald-400 mb-1">
                          Resolution Path:
                        </p>
                        <p className="text-xs text-white/60 leading-relaxed">
                          {loopData.resolution}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Inferior Grip */}
                  {gripData && (
                    <div className="p-6 rounded-3xl backdrop-blur-xl border border-red-500/30 shadow-lg" style={{ background: "rgba(239,68,68,0.08)" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-red-400" />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-white">
                            Inferior Grip: {gripData.inferiorFunction}
                          </h4>
                          <p className="text-xs text-red-400">
                            When your weakest function takes over
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-white/80 leading-relaxed mb-4">
                        {gripData.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        <div>
                          <p className="text-xs font-semibold text-white/80 mb-2">
                            Triggers:
                          </p>
                          {gripData.triggers.map((t, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 text-xs text-white/60 mb-1"
                            >
                              <Zap className="w-3 h-3 text-red-400 mt-0.5 shrink-0" />
                              {t}
                            </div>
                          ))}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white/80 mb-2">
                            Manifestations:
                          </p>
                          {gripData.manifestation.map((m, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 text-xs text-white/60 mb-1"
                            >
                              <AlertTriangle className="w-3 h-3 text-orange-400 mt-0.5 shrink-0" />
                              {m}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <p className="text-xs font-semibold text-emerald-400 mb-1">
                          Recovery:
                        </p>
                        <p className="text-xs text-white/60 leading-relaxed">
                          {gripData.recovery}
                        </p>
                      </div>
                    </div>
                  )}

                  {!loopData && !gripData && (
                    <div className="p-6 rounded-3xl backdrop-blur-xl text-center" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                      <p className="text-sm text-white/60">
                        Detailed stress data for {selectedType} is coming soon.
                        The general pattern is: your tertiary and inferior
                        functions become overactive while your dominant and
                        auxiliary are suppressed.
                      </p>
                    </div>
                  )}

                  {/* Stress Reflection Questions */}
                  <div className="p-6 rounded-3xl backdrop-blur-xl shadow-lg" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                    <h4 className="font-serif font-bold text-white mb-3">
                      Stress Reflection
                    </h4>
                    <div className="space-y-2">
                      {[
                        "When was the last time you felt 'not yourself'? Which shadow function might have been driving?",
                        "What recurring stress pattern do you notice in your life?",
                        "How does your body signal that you're entering a grip experience?",
                      ].map((q, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-orange-400 mt-0.5 shrink-0" />
                          <p className="text-xs text-white/60 italic">{q}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {mode === "growth" && (
                <motion.div
                  key="growth-content"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="p-6 rounded-3xl backdrop-blur-xl border border-emerald-500/30 shadow-lg" style={{ background: "rgba(16,185,129,0.08)" }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                      </div>
                      <h4 className="font-serif font-bold text-white">
                        Integration Path for {selectedType}
                      </h4>
                    </div>

                    <div className="space-y-4">
                      {typeData.stack.map((fnCode, i) => {
                        const fn = getFunctionData(fnCode);
                        const growthTips: Record<number, string> = {
                          0: `Your ${fn?.name} is your superpower. Growth means using it with wisdom, not just strength. Avoid over-relying on it.`,
                          1: `Develop your ${fn?.name} to balance your dominant. This is your path to maturity and effectiveness.`,
                          2: `Your ${fn?.name} is your playful edge. Consciously developing it brings creativity and relief. Don't let it run unsupervised.`,
                          3: `Your ${fn?.name} is your greatest growth frontier. Small, conscious steps here yield the most transformative results.`,
                        };
                        return (
                          <div
                            key={fnCode}
                            className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className="font-mono text-sm font-bold"
                                style={{ color: getFunctionColor(fnCode) }}
                              >
                                {fnCode}
                              </span>
                              <span className="text-xs text-white/60">
                                {positionLabels[i]}
                              </span>
                            </div>
                            <p className="text-xs text-white/80 leading-relaxed">
                              {growthTips[i]}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl backdrop-blur-xl shadow-lg" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                    <h4 className="font-serif font-bold text-white mb-3">
                      Growth Reflections
                    </h4>
                    <div className="space-y-2">
                      {typeData.growthAreas.map((area, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                        >
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                          <p className="text-xs text-white/80">{area}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl backdrop-blur-xl shadow-lg" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                    <h4 className="font-serif font-bold text-white mb-3">
                      Growth Questions
                    </h4>
                    <div className="space-y-2">
                      {[
                        `How can you consciously exercise your inferior ${getFunctionData(typeData.stack[3])?.name} today?`,
                        `What would it look like to use your ${getFunctionData(typeData.stack[0])?.name} with more restraint?`,
                        "When was the last time you stepped outside your cognitive comfort zone? What happened?",
                      ].map((q, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                          <p className="text-xs text-white/60 italic">{q}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {mode === "normal" && (
                <motion.div
                  key="normal-content"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-6 rounded-3xl backdrop-blur-xl shadow-lg"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center">
                      <Compass className="w-4 h-4 text-indigo-400" />
                    </div>
                    <h4 className="font-serif font-bold text-white">
                      Balanced State
                    </h4>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed mb-4">
                    {typeData.description}
                  </p>
                  <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <p className="text-xs font-semibold text-indigo-400 mb-2">
                      Core Strengths:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {typeData.strengths.map((s, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full bg-white/5 text-xs text-white/60 border border-indigo-500/20"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-white/35 mt-4 italic">
                    Try switching to Stress Mode or Growth Mode to see how your
                    functions shift under different conditions.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// SECTION 3: Cognitive Reframe Tool
// ============================================================

// Cognitive reframe engine, generates personalized responses based on situation + type
function generateAIReframe(situation: string, fnCode: string, fnName: string, position: string, typeCode: string): string {
  const sit = situation.toLowerCase();
  const isConflict = sit.includes("conflict") || sit.includes("argument") || sit.includes("disagree") || sit.includes("fight");
  const isDecision = sit.includes("decision") || sit.includes("choose") || sit.includes("decide") || sit.includes("stuck");
  const isRelationship = sit.includes("relationship") || sit.includes("friend") || sit.includes("partner") || sit.includes("family");
  const isWork = sit.includes("work") || sit.includes("career") || sit.includes("job") || sit.includes("boss");
  const isAnxiety = sit.includes("anxious") || sit.includes("worry") || sit.includes("fear") || sit.includes("scared") || sit.includes("overwhelm");
  const isSelf = sit.includes("myself") || sit.includes("identity") || sit.includes("who i am") || sit.includes("lost");

  const reframes: Record<string, Record<string, string>> = {
    Ni: {
      conflict: `Your Ni as ${position} can see where this conflict is actually heading. Step back from the immediate tension and ask: what is the deeper pattern here? This isn't really about the surface issue, your intuition is likely already sensing the underlying dynamic. Trust that knowing. What does your gut tell you about what this person actually needs?`,
      decision: `As a ${typeCode} with Ni ${position === "Dominant" ? "leading" : "supporting"}, you don't make decisions through pros-and-cons lists. You synthesize. Let yourself sit with this. The answer is forming in your unconscious right now. Instead of forcing a choice, ask: "Which path feels like it leads somewhere meaningful?" Your Ni converges on truth, let it.`,
      relationship: `Your Ni can see the long trajectory of this relationship. Rather than reacting to what's happening now, ask: where is this actually going? Your ${position} Ni gives you the rare ability to see whether this person is growing or contracting. The question isn't "what do I feel right now?", it's "what do I know, deep down, about where this is heading?"`,
      work: `Your Ni as ${position} gives you strategic vision that most people don't have. If work feels stagnant, it's because you can already see that the current path leads somewhere you don't want to be. What vision keeps pulling at you? That persistent internal image of "where things should go" is your Ni's gift, stop dismissing it as impractical.`,
      anxiety: `When Ni-doms feel anxious, it's often because your intuition has detected something the conscious mind hasn't processed yet. Instead of fighting the feeling, get curious: what is your unconscious trying to tell you? Write down the first three images that come to mind about this situation. Your Ni communicates in symbols and metaphors, listen to them.`,
      self: `Your Ni is your identity's foundation, you ARE your vision. If you feel lost, it's because you've been cut off from your deepest intuitive knowing. Reconnect: what image of your future keeps returning, unbidden? That persistent pull toward a particular path IS your Ni telling you who you're meant to become.`,
      default: `Through your ${position} Ni: this situation has a deeper pattern your unconscious has already detected. Instead of analyzing the surface, ask yourself, what does your intuition say is really going on here? As a ${typeCode}, your Ni gives you access to a convergent knowing that goes beyond logic. Trust what emerges when you sit with this quietly.`,
    },
    Ne: {
      conflict: `Your Ne as ${position} sees this conflict is actually full of untapped possibilities. What if this disagreement is pointing toward a third option neither of you have considered? Brainstorm: what are five completely different ways this could resolve? Your Ne's gift is seeing connections others miss, there's a creative solution here.`,
      decision: `As a ${typeCode} with Ne in ${position} position, you're not stuck, you're overwhelmed by options. Your Ne sees too many possibilities, which feels paralyzing. Try this: set a timer for 5 minutes and list every option without editing. Then ask: which one makes your body feel expansive rather than contracted?`,
      relationship: `Your Ne sees the potential in this person and this relationship, but are you in love with who they actually are, or who they could be? Your ${position} Ne is brilliant at seeing possibility, but can miss what's actually present. Ground yourself: what is real about this relationship right now, not what could be?`,
      default: `Your ${position} Ne is showing you that this situation has more dimensions than you're currently seeing. What unexpected connections can you make? What would happen if you approached this from a completely different angle? As a ${typeCode}, your Ne gives you the ability to reframe any problem as an opportunity for creative exploration.`,
    },
    Ti: {
      conflict: `Your Ti as ${position} wants to dissect this conflict logically. Strip away the emotions for a moment and ask: what is the actual structural problem here? Not who's right, what's the logical inconsistency in the situation itself? Your Ti can find the precise point where the reasoning breaks down, and that's where the solution lives.`,
      decision: `Your ${position} Ti approaches decisions by building an internal logical framework. Don't trust the surface options, deconstruct them. What are the first principles at play? As a ${typeCode}, your strength is cutting through noise to find the underlying logic. What does this situation look like when you strip it to its simplest form?`,
      default: `Through your ${position} Ti: analyze the internal logic of this situation. As a ${typeCode}, your Ti cuts through emotional noise to find structural truth. What assumptions are you making that haven't been examined? Take the situation apart piece by piece, where does the logic actually break down?`,
    },
    Te: {
      conflict: `Your Te as ${position} sees this as a systems problem. What's the most efficient path to resolution? Don't get lost in feelings about the conflict, what's the measurable outcome you need? Create a plan: step 1, step 2, step 3. Your Te turns chaos into structure.`,
      decision: `As a ${typeCode} with ${position} Te, you decide based on what works. Gather the external evidence: what do the facts say? What has the best track record? Your Te cuts through indecision by asking: "What is the most effective action I can take right now?" Take that action, then adjust.`,
      default: `Your ${position} Te asks: what is the most effective course of action here? As a ${typeCode}, you have the ability to see through complexity to find what actually works. What measurable steps can you take? What's the plan? Your Te transforms problems into actionable solutions.`,
    },
    Fi: {
      conflict: `Your Fi as ${position} is telling you something important about this conflict. What value of yours is being violated? Not what you think you should feel, what do you actually feel, deep in your core? That authentic reaction is information. Your Fi's moral compass is precise, listen to it.`,
      relationship: `Your ${position} Fi knows, with absolute certainty, whether this relationship aligns with your deepest values. Stop second-guessing that knowing. The question isn't whether you can make it work, it's whether it's authentic. Does being with this person allow you to be who you truly are?`,
      self: `Your Fi IS your identity, your values, your authenticity, your deepest sense of self. If you feel lost, you've been compromising your values to fit in. Reconnect: what matters to you so deeply that you'd fight for it? What makes you feel like your truest self? That's your Fi speaking.`,
      default: `Through your ${position} Fi: check in with your deepest values. What does your authentic self actually feel about this situation, not what others think you should feel? As a ${typeCode}, your Fi gives you access to a precise internal moral compass. Trust what it's telling you.`,
    },
    Fe: {
      conflict: `Your Fe as ${position} is attuned to the relational damage this conflict is causing. But here's the reframe: harmony maintained at the cost of truth isn't real harmony. What does this situation need, your peacemaking skill, or your honest voice? Sometimes the most Fe thing you can do is name the elephant in the room.`,
      relationship: `Your ${position} Fe makes you exquisitely sensitive to what others need. The growth question: what do YOU need? Your Fe is so good at creating harmony that it can lose itself in others' emotional worlds. Pause and ask: in this relationship, where does their world end and yours begin?`,
      default: `Your ${position} Fe reads the emotional landscape of this situation with remarkable precision. What is the group dynamic telling you? What does the emotional atmosphere need? As a ${typeCode}, your Fe can create the conditions for everyone to feel heard, but make sure you include yourself in "everyone."`,
    },
    Se: {
      decision: `Your Se as ${position} says: stop overthinking and act. What does your body want to do right now? Se trusts real-time data over abstract analysis. Try one option, you'll learn more from 5 minutes of action than 5 hours of deliberation.`,
      anxiety: `Your ${position} Se is the antidote to anxiety. Get into your body: go for a run, cook something, engage your senses fully. Anxiety lives in the head; Se lives in the present moment. What can you see, hear, feel, taste RIGHT NOW? Ground yourself in sensory reality.`,
      default: `Your ${position} Se asks: what is actually happening right here, right now? Not what you're imagining or fearing, what is the concrete, tangible reality of this situation? As a ${typeCode}, your Se gives you the ability to respond to what IS rather than what might be. Engage your senses and trust your real-time read.`,
    },
    Si: {
      conflict: `Your Si as ${position} remembers how similar situations played out before. What worked last time? What didn't? Your experiential database is rich, don't ignore it. But also check: are you applying a past template to a genuinely new situation? Sometimes Si needs to let go of what was to see what is.`,
      decision: `Your ${position} Si has a wealth of past experience to draw on. What does your personal history tell you about choices like this? But here's the growth edge: is there a pattern you keep repeating? Sometimes the most Si-honoring choice is deliberately choosing the unfamiliar.`,
      default: `Your ${position} Si holds the wisdom of your lived experience. What precedent exists for this situation? What worked before that might apply here? As a ${typeCode}, your Si gives you stability and grounding, trust the lessons you've already learned.`,
    },
  };

  const fnReframes = reframes[fnCode] || reframes["Ni"]!;
  if (isConflict && fnReframes.conflict) return fnReframes.conflict;
  if (isDecision && fnReframes.decision) return fnReframes.decision;
  if (isRelationship && fnReframes.relationship) return fnReframes.relationship;
  if (isWork && fnReframes.work) return fnReframes.work;
  if (isAnxiety && fnReframes.anxiety) return fnReframes.anxiety;
  if (isSelf && fnReframes.self) return fnReframes.self;
  return fnReframes.default || `Through your ${position} ${fnCode}: examine this situation through the lens of ${fnName}. What does this function see that your other functions might miss?`;
}

function CognitiveReframeTool() {
  const [selectedType, setSelectedType] = useState("");
  const [situation, setSituation] = useState("");
  const [activeLens, setActiveLens] = useState(0);
  const [isExploring, setIsExploring] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const typeData = mbtiTypes.find((t) => t.code === selectedType);

  const handleExplore = async () => {
    if (!situation.trim() || !typeData) return;
    setIsGenerating(true);
    setActiveLens(0);
    setAiResponse("");
    setAiLoading(true);

    // Static reframe, no AI needed
    setAiResponse("");
    setAiLoading(false);

    setIsExploring(true);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-3xl backdrop-blur-xl shadow-lg"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
      >
        <h3 className="font-serif font-bold text-lg text-white mb-1">
          Cognitive Reframe Tool
        </h3>
        <p className="text-sm text-white/60 mb-5">
          See your situation through each of your four cognitive lenses
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-white/60 mb-2 block">
              Your type:
            </label>
            <TypeGrid
              selected={selectedType}
              onSelect={(code) => {
                setSelectedType(code);
                setIsExploring(false);
              }}
              compact
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-white/60 mb-2 block">
              Describe a situation or problem you are facing:
            </label>
            <textarea
              value={situation}
              onChange={(e) => {
                setSituation(e.target.value);
                setIsExploring(false);
              }}
              placeholder="I'm struggling with a decision about... / I feel stuck because... / I'm dealing with a conflict where..."
              className="w-full h-32 p-4 rounded-2xl text-sm text-white/80 leading-relaxed placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none transition"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExplore}
            disabled={!situation.trim() || !selectedType}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white text-sm font-semibold disabled:opacity-40 hover:shadow-lg hover:shadow-indigo-200/50 transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
                Analyzing through your cognitive stack...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4" />
                Reframe Through All 4 Lenses
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {isExploring && typeData && (
          <div className="space-y-4">
            {/* AI-powered response (when available) */}
            {(aiResponse || aiLoading) && (
              <div className="p-6 rounded-3xl bg-indigo-500/10 border border-indigo-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                    <Brain className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-indigo-300">Reframe</span>
                </div>
                {aiResponse ? (
                  <div className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap font-serif">
                    {aiResponse}
                    {aiLoading && <span className="inline-block w-0.5 h-4 bg-indigo-400 ml-0.5 animate-pulse" />}
                  </div>
                ) : (
                  <div className="space-y-2 animate-pulse">
                    <div className="h-3 bg-indigo-500/20 rounded-full w-full" />
                    <div className="h-3 bg-indigo-500/20 rounded-full w-11/12" />
                    <div className="h-3 bg-indigo-500/20 rounded-full w-4/5" />
                  </div>
                )}
              </div>
            )}

            {/* Static fallback lens tabs (shown when AI unavailable) */}
            {!aiResponse && !aiLoading && (
              <>
            {/* Lens Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {typeData.stack.map((fnCode, i) => {
                const fn = getFunctionData(fnCode);
                return (
                  <motion.button
                    key={fnCode}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveLens(i)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                      activeLens === i
                        ? "text-white shadow-lg"
                        : "bg-white/5 text-white/60 border border-white/[0.09] hover:bg-white/10"
                    }`}
                    style={
                      activeLens === i
                        ? {
                            background: `linear-gradient(135deg, ${getFunctionColor(fnCode)}, ${getFunctionColor(fnCode)}cc)`,
                          }
                        : undefined
                    }
                  >
                    <span className="font-mono">{fnCode}</span>
                    <span className="hidden sm:inline">{lensConfigs[i].position} Lens</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Active Lens Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLens}
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-3xl backdrop-blur-xl shadow-lg"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
              >
                {(() => {
                  const fnCode = typeData.stack[activeLens];
                  const fn = getFunctionData(fnCode);
                  const lens = lensConfigs[activeLens];
                  if (!fn) return null;

                  return (
                    <div className="space-y-5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${getFunctionColor(fnCode)}22, ${getFunctionColor(fnCode)}44)`,
                          }}
                        >
                          {activeLens === 0 && (
                            <Crown
                              className="w-5 h-5"
                              style={{ color: getFunctionColor(fnCode) }}
                            />
                          )}
                          {activeLens === 1 && (
                            <Shield
                              className="w-5 h-5"
                              style={{ color: getFunctionColor(fnCode) }}
                            />
                          )}
                          {activeLens === 2 && (
                            <Lightbulb
                              className="w-5 h-5"
                              style={{ color: getFunctionColor(fnCode) }}
                            />
                          )}
                          {activeLens === 3 && (
                            <Target
                              className="w-5 h-5"
                              style={{ color: getFunctionColor(fnCode) }}
                            />
                          )}
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-white">
                            {lens.position} Lens:{" "}
                            <span
                              style={{ color: getFunctionColor(fnCode) }}
                            >
                              {fn.name}
                            </span>
                          </h4>
                          <p className="text-xs text-white/60">
                            {lens.label}, {fn.alias}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                          <p className="text-xs font-semibold text-indigo-300">
                            {fn.name} Perspective
                          </p>
                        </div>
                        <p className="text-sm text-white/80 leading-relaxed">
                          {generateAIReframe(
                            situation,
                            fnCode,
                            fn.name,
                            lens.position || (activeLens === 0 ? "Dominant" : activeLens === 1 ? "Auxiliary" : activeLens === 2 ? "Tertiary" : "Inferior"),
                            selectedType
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-white/80 mb-2">
                          This lens asks you:
                        </p>
                        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                          <p className="text-sm text-indigo-300 italic leading-relaxed">
                            {lens.question(fn.name, fnCode)}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-white/80 mb-2">
                          How {fn.code} approaches problems:
                        </p>
                        <div className="space-y-1.5">
                          {fn.characteristics.map((c, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 text-xs text-white/60"
                            >
                              <div
                                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                                style={{
                                  backgroundColor: getFunctionColor(fnCode),
                                }}
                              />
                              {c}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                          <p className="text-xs font-semibold text-emerald-400 mb-1.5">
                            Strengths of this lens:
                          </p>
                          {fn.strengths.slice(0, 3).map((s, i) => (
                            <p
                              key={i}
                              className="text-xs text-white/60 mb-0.5"
                            >
                              {s}
                            </p>
                          ))}
                        </div>
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                          <p className="text-xs font-semibold text-amber-400 mb-1.5">
                            Blind spots:
                          </p>
                          {fn.blindSpots.slice(0, 3).map((b, i) => (
                            <p
                              key={i}
                              className="text-xs text-white/60 mb-0.5"
                            >
                              {b}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
              </>
            )}
          </div>
        )}
    </div>
  );
}

// ============================================================
// SECTION 4: Pattern Tracker
// ============================================================

interface DailyReflectionEntry {
  id: string;
  date: string;
  nodeId: string;
  nodeLabel: string;
  prompt: string;
  text: string;
}

function DailyReflections() {
  const [entries, setEntries] = useState<DailyReflectionEntry[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("psyche-reflections");
      if (raw) setEntries(JSON.parse(raw));
    } catch {}
  }, []);

  if (entries.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-3xl backdrop-blur-xl shadow-lg mb-6"
      style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-4 h-4" style={{ color: "#a78bfa" }} />
        <h3 className="font-serif font-bold text-lg text-white">Daily Reflections</h3>
        <span className="text-xs px-2 py-0.5 rounded-full ml-auto" style={{ background: "rgba(124,58,237,0.2)", color: "#c4b5fd" }}>
          {entries.length}
        </span>
      </div>
      <div className="space-y-3">
        {entries.slice(0, 10).map((entry) => (
          <div
            key={entry.id}
            className="rounded-2xl overflow-hidden cursor-pointer"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
          >
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{entry.nodeLabel}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{entry.date}</p>
              </div>
              <ChevronDown
                className="w-4 h-4 transition-transform"
                style={{ color: "rgba(255,255,255,0.3)", transform: expanded === entry.id ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </div>
            {expanded === entry.id && (
              <div className="px-4 pb-4 space-y-2">
                {entry.prompt && (
                  <p className="text-xs italic" style={{ color: "rgba(255,255,255,0.35)" }}>{entry.prompt}</p>
                )}
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{entry.text}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function PatternTracker() {
  const [logs, setLogs] = useState<PatternLog[]>([]);
  const [selectedFunction, setSelectedFunction] = useState("");
  const [note, setNote] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setLogs(loadFromStorage("psyche-pattern-logs", []));
  }, []);

  const addLog = useCallback(() => {
    if (!selectedFunction) return;
    const log: PatternLog = {
      id: Date.now().toString(),
      functionCode: selectedFunction,
      note: note.trim(),
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    };
    const updated = [log, ...logs];
    setLogs(updated);
    saveToStorage("psyche-pattern-logs", updated);
    setSelectedFunction("");
    setNote("");
    setShowForm(false);
  }, [selectedFunction, note, logs]);

  // Build heatmap data
  const functionCounts: Record<string, number> = {};
  cognitiveFunctions.forEach((f) => {
    functionCounts[f.code] = 0;
  });
  logs.forEach((log) => {
    functionCounts[log.functionCode] =
      (functionCounts[log.functionCode] || 0) + 1;
  });
  const maxCount = Math.max(1, ...Object.values(functionCounts));

  // Get recent 7 days
  const last7Days: { label: string; date: string }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    last7Days.push({
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    });
  }

  // Build weekly grid data
  const weeklyGrid: Record<string, Record<string, number>> = {};
  cognitiveFunctions.forEach((f) => {
    weeklyGrid[f.code] = {};
    last7Days.forEach((day) => {
      weeklyGrid[f.code][day.date] = 0;
    });
  });
  logs.forEach((log) => {
    if (weeklyGrid[log.functionCode]?.[log.date] !== undefined) {
      weeklyGrid[log.functionCode][log.date]++;
    }
  });

  const clearLogs = () => {
    setLogs([]);
    saveToStorage("psyche-pattern-logs", []);
  };

  return (
    <div className="space-y-8">
      {/* Daily reflections from the path */}
      <DailyReflections />

      {/* Header + Add */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-3xl backdrop-blur-xl shadow-lg"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
      >
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-serif font-bold text-lg text-white">
            Pattern Tracker
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            className="w-8 h-8 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white flex items-center justify-center shadow-md"
          >
            {showForm ? (
              <X className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </motion.button>
        </div>
        <p className="text-sm text-white/60 mb-4">
          Log moments when you notice yourself using specific cognitive functions
        </p>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-3 mb-4">
                <div>
                  <label className="text-xs font-semibold text-white/60 mb-2 block">
                    Which function did you notice?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {cognitiveFunctions.map((f) => (
                      <motion.button
                        key={f.code}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedFunction(f.code)}
                        className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all ${
                          selectedFunction === f.code
                            ? "text-white shadow-md"
                            : "bg-white/5 text-white/60 border border-white/[0.09]"
                        }`}
                        style={
                          selectedFunction === f.code
                            ? {
                                background: `linear-gradient(135deg, ${f.color}, ${f.color}cc)`,
                              }
                            : undefined
                        }
                      >
                        {f.code}
                      </motion.button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-white/60 mb-2 block">
                    What happened? (optional)
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g. Had a sudden insight about my project direction"
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
                    onKeyDown={(e) => e.key === "Enter" && addLog()}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addLog}
                  disabled={!selectedFunction}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white text-sm font-semibold disabled:opacity-40 transition-all"
                >
                  Log Observation
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Function Usage Bars */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-white/60">
            All-Time Function Usage ({logs.length} observations)
          </p>
          {cognitiveFunctions.map((f) => {
            const count = functionCounts[f.code];
            const pct = maxCount > 0 ? (count / maxCount) * 100 : 0;
            return (
              <div key={f.code} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-xs font-bold w-6"
                      style={{ color: f.color }}
                    >
                      {f.code}
                    </span>
                    <span className="text-xs text-white/35 hidden sm:inline">
                      {f.alias}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-white/35">
                    {count}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                    }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${f.color}88, ${f.color})`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Weekly Heatmap */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-3xl backdrop-blur-xl shadow-lg"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
      >
        <h3 className="font-serif font-bold text-white mb-4">
          Weekly Heatmap
        </h3>
        <div className="overflow-x-auto">
          <div className="min-w-[400px]">
            {/* Day headers */}
            <div className="grid grid-cols-[60px_repeat(7,1fr)] gap-1 mb-1">
              <div />
              {last7Days.map((day) => (
                <div
                  key={day.date}
                  className="text-center text-xs text-white/35"
                >
                  {day.label}
                </div>
              ))}
            </div>
            {/* Grid rows */}
            {cognitiveFunctions.map((f) => (
              <div
                key={f.code}
                className="grid grid-cols-[60px_repeat(7,1fr)] gap-1 mb-1"
              >
                <div
                  className="font-mono text-xs font-bold flex items-center"
                  style={{ color: f.color }}
                >
                  {f.code}
                </div>
                {last7Days.map((day) => {
                  const count = weeklyGrid[f.code]?.[day.date] || 0;
                  const intensity = count > 0 ? Math.min(count / 3, 1) : 0;
                  return (
                    <motion.div
                      key={day.date}
                      whileHover={{ scale: 1.2 }}
                      className="aspect-square rounded-lg flex items-center justify-center text-xs transition-all cursor-default"
                      style={{
                        backgroundColor:
                          count > 0
                            ? `${f.color}${Math.round(intensity * 200 + 30)
                                .toString(16)
                                .padStart(2, "0")}`
                            : "rgba(255,255,255,0.05)",
                        color: count > 0 ? "white" : "transparent",
                      }}
                      title={`${f.code}: ${count} on ${day.date}`}
                    >
                      {count > 0 ? count : ""}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Recent Logs */}
      {logs.length > 0 && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-3xl backdrop-blur-xl shadow-lg"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-bold text-white">
              Recent Observations
            </h3>
            <button
              onClick={clearLogs}
              className="text-xs text-white/35 hover:text-red-400 transition"
            >
              Clear all
            </button>
          </div>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {logs.slice(0, 20).map((log) => {
              const fn = getFunctionData(log.functionCode);
              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 1, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-mono text-xs font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${getFunctionColor(log.functionCode)}, ${getFunctionColor(log.functionCode)}cc)`,
                    }}
                  >
                    {log.functionCode}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/60 truncate">
                      {log.note || fn?.alias || log.functionCode}
                    </p>
                    <p className="text-xs text-white/35">{log.date}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ============================================================
// Enneagram Journal
// ============================================================

const ENNEAGRAM_TYPE_COLORS: Record<number, string> = {
  1: "#e67e22",
  2: "#e74c3c",
  3: "#f39c12",
  4: "#8e44ad",
  5: "#2980b9",
  6: "#27ae60",
  7: "#16a085",
  8: "#c0392b",
  9: "#7f8c8d",
};

function loadJournalEntries(): EnneagramJournalEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("psyche-enneagram-journal");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveJournalEntries(entries: EnneagramJournalEntry[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("psyche-enneagram-journal", JSON.stringify(entries));
  } catch {}
}

function EnneagramJournal() {
  const [entries, setEntries] = useState<EnneagramJournalEntry[]>([]);
  const [text, setText] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<TopicTag[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [patternsOpen, setPatternsOpen] = useState(true);
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const [userType, setUserType] = useState<number | null>(null);
  const { incrementGrowthStreak } = useGameState();

  useEffect(() => {
    setEntries(loadJournalEntries());
    try {
      const raw = localStorage.getItem("psyche-profile");
      if (raw) {
        const p = JSON.parse(raw);
        if (p.enneagramType) setUserType(Number(p.enneagramType));
      }
    } catch {}
  }, []);

  const toggleType = (t: number) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const toggleTopic = (topic: TopicTag) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((x) => x !== topic) : [...prev, topic]
    );
  };

  const saveEntry = useCallback(() => {
    if (!text.trim()) return;
    const now = new Date();
    const entry: EnneagramJournalEntry = {
      id: Date.now().toString(),
      text: text.trim(),
      typeTags: selectedTypes,
      topicTags: selectedTopics,
      timestamp: now.toISOString(),
      date: now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    const updated = [entry, ...entries];
    setEntries(updated);
    saveJournalEntries(updated);
    incrementGrowthStreak();
    // Award XP for journaling
    try {
      const gsRaw = localStorage.getItem("psyche-game-state");
      const gs = gsRaw ? JSON.parse(gsRaw) : {};
      const current = (gs.xp as number) ?? 0;
      localStorage.setItem("psyche-game-state", JSON.stringify({
        ...gs,
        xp: current + 10,
      }));
    } catch {}
    setText("");
    setSelectedTypes([]);
    setSelectedTopics([]);
    setShowEditor(false);
  }, [text, selectedTypes, selectedTopics, entries, incrementGrowthStreak]);

  // Build pattern data
  const typeCounts: Record<number, number> = {};
  const topicCounts: Record<string, number> = {};
  entries.forEach((e) => {
    e.typeTags.forEach((t) => {
      typeCounts[t] = (typeCounts[t] || 0) + 1;
    });
    e.topicTags.forEach((topic) => {
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    });
  });

  const topTypes = Object.entries(typeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  const topTopics = Object.entries(topicCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const dominantTopic = topTopics[0]?.[0] as TopicTag | undefined;

  const topicSectionMap: Record<TopicTag, string> = {
    stress: "Growth Path",
    growth: "Growth Path",
    relationships: "Relationships",
    shadow: "Overview",
  };

  const suggestion =
    dominantTopic && topicCounts[dominantTopic] >= 2 && userType
      ? {
          text: `You've journaled about ${TOPIC_LABELS[dominantTopic].toLowerCase()} ${topicCounts[dominantTopic]} times.`,
          link: `/enneagram/${userType}`,
          linkLabel: `See the ${topicSectionMap[dominantTopic]} section for Type ${userType}`,
        }
      : null;

  return (
    <div className="space-y-6">
      {/* Patterns Section */}
      {entries.length > 0 && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl overflow-hidden"
          style={{ background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.2)" }}
        >
          <button
            onClick={() => setPatternsOpen((v) => !v)}
            className="w-full flex items-center justify-between px-5 py-4"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" style={{ color: "#a78bfa" }} />
              <span className="font-serif font-bold text-white text-sm">Your Patterns</span>
            </div>
            <ChevronDown
              className="w-4 h-4 transition-transform duration-200"
              style={{
                color: "rgba(255,255,255,0.4)",
                transform: patternsOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>
          <AnimatePresence initial={false}>
            {patternsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 space-y-4">
                  {topTypes.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                        Types you reflect on most
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {topTypes.map(([type, count]) => (
                          <Link
                            key={type}
                            href={`/enneagram/${type}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-opacity hover:opacity-80"
                            style={{
                              background: `${ENNEAGRAM_TYPE_COLORS[Number(type)]}22`,
                              border: `1px solid ${ENNEAGRAM_TYPE_COLORS[Number(type)]}44`,
                              color: ENNEAGRAM_TYPE_COLORS[Number(type)],
                            }}
                          >
                            Type {type}
                            <span
                              className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                              style={{ background: `${ENNEAGRAM_TYPE_COLORS[Number(type)]}33` }}
                            >
                              {count}×
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {topTopics.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                        Topics that come up most
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {topTopics.map(([topic, count]) => (
                          <span
                            key={topic}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                            style={{
                              background: `${TOPIC_COLORS[topic as TopicTag]}18`,
                              border: `1px solid ${TOPIC_COLORS[topic as TopicTag]}35`,
                              color: TOPIC_COLORS[topic as TopicTag],
                            }}
                          >
                            {TOPIC_LABELS[topic as TopicTag]}
                            <span className="opacity-70">{count}×</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {suggestion && (
                    <div
                      className="rounded-xl p-3"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                    >
                      <p className="text-xs leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.65)" }}>
                        {suggestion.text}{" "}
                      </p>
                      <Link
                        href={suggestion.link}
                        className="text-xs font-semibold underline underline-offset-2 transition-opacity hover:opacity-80"
                        style={{ color: "#a78bfa" }}
                      >
                        {suggestion.linkLabel} →
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Editor */}
      {!showEditor ? (
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setShowEditor(true)}
          className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-left transition-all"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 flex items-center justify-center shrink-0">
            <Plus className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">New entry</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Write and tag a reflection</p>
          </div>
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-5 space-y-4"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">New Reflection</p>
            <button onClick={() => setShowEditor(false)} style={{ color: "rgba(255,255,255,0.4)" }}>
              <X className="w-4 h-4" />
            </button>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What are you noticing about yourself today?"
            rows={5}
            className="w-full rounded-xl px-4 py-3 text-sm resize-none focus:outline-none"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.85)",
            }}
          />

          {/* Type tag pills */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
              Tag a type (optional)
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((t) => {
                const active = selectedTypes.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() => toggleType(t)}
                    className="w-8 h-8 rounded-xl text-xs font-bold transition-all"
                    style={{
                      background: active
                        ? ENNEAGRAM_TYPE_COLORS[t]
                        : `${ENNEAGRAM_TYPE_COLORS[t]}18`,
                      color: active ? "#fff" : ENNEAGRAM_TYPE_COLORS[t],
                      border: `1px solid ${ENNEAGRAM_TYPE_COLORS[t]}44`,
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Topic tag pills */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
              Tag a topic (optional)
            </p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(TOPIC_LABELS) as TopicTag[]).map((topic) => {
                const active = selectedTopics.includes(topic);
                return (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                    style={{
                      background: active ? `${TOPIC_COLORS[topic]}30` : `${TOPIC_COLORS[topic]}10`,
                      color: TOPIC_COLORS[topic],
                      border: active
                        ? `1px solid ${TOPIC_COLORS[topic]}60`
                        : `1px solid ${TOPIC_COLORS[topic]}25`,
                    }}
                  >
                    {TOPIC_LABELS[topic]}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={saveEntry}
            disabled={!text.trim()}
            className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              boxShadow: text.trim() ? "0 4px 16px rgba(124,58,237,0.35)" : "none",
            }}
          >
            Save Entry<span className="text-xs text-violet-300/70 ml-1 font-normal">+10 XP</span>
          </button>
        </motion.div>
      )}

      {/* Entries list */}
      {entries.length === 0 && !showEditor && (
        <p className="text-sm text-center py-8" style={{ color: "rgba(255,255,255,0.3)" }}>
          No entries yet. Write your first reflection above.
        </p>
      )}

      {entries.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
            {entries.length} {entries.length === 1 ? "entry" : "entries"}
          </p>
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-2xl overflow-hidden cursor-pointer"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              onClick={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm text-white/80 truncate leading-snug"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {entry.text.slice(0, 80)}{entry.text.length > 80 ? "…" : ""}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {entry.date}
                    </span>
                    {entry.typeTags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-1.5 py-0.5 rounded-md font-bold"
                        style={{
                          background: `${ENNEAGRAM_TYPE_COLORS[t]}22`,
                          color: ENNEAGRAM_TYPE_COLORS[t],
                        }}
                      >
                        T{t}
                      </span>
                    ))}
                    {entry.topicTags.map((topic) => (
                      <span
                        key={topic}
                        className="text-[10px] px-1.5 py-0.5 rounded-md font-semibold"
                        style={{
                          background: `${TOPIC_COLORS[topic]}18`,
                          color: TOPIC_COLORS[topic],
                        }}
                      >
                        {TOPIC_LABELS[topic]}
                      </span>
                    ))}
                  </div>
                </div>
                <ChevronDown
                  className="w-4 h-4 ml-3 shrink-0 transition-transform"
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    transform: expandedEntry === entry.id ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </div>
              {expandedEntry === entry.id && (
                <div className="px-4 pb-4">
                  <div className="h-px mb-3" style={{ background: "rgba(255,255,255,0.07)" }} />
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.72)", fontFamily: "'Georgia', serif", lineHeight: "1.7" }}
                  >
                    {entry.text}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Main Page
// ============================================================

export default function InnerWorkLabPage() {
  const [activeTab, setActiveTab] = useState<TabId>("shadow");
  const [enneagramType, setEnneagramType] = useState<number>(4);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("psyche-profile");
      if (raw) {
        const profile = JSON.parse(raw);
        if (profile.enneagramType) setEnneagramType(Number(profile.enneagramType));
      }
    } catch {}
  }, []);

  return (
    <div className="min-h-screen py-12 sm:py-16" style={{ background: "linear-gradient(160deg, #160f38 0%, #0f0a1e 100%)" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/15 backdrop-blur-sm border border-violet-500/30 text-violet-300 text-xs font-semibold mb-4 shadow-sm"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            Inner Work Lab
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">
            Your Inner Work Lab
          </h1>
          <p className="text-white/60 max-w-lg mx-auto text-sm leading-relaxed">
            Interactive tools for cognitive self-discovery. Explore your shadow,
            simulate type dynamics, reframe problems, and track patterns.
          </p>
        </motion.div>

        {/* Pet Companion */}
        <div className="flex items-center gap-3 rounded-2xl px-4 py-2.5 mb-6 mx-auto max-w-lg" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
          <PetCompanion type={enneagramType} size={40} />
          <span className="text-xs text-white/60 italic">Your companion sits with you in reflection</span>
        </div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-1 p-1.5 rounded-2xl backdrop-blur-xl shadow-sm mb-8 overflow-x-auto" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-white"
                  : "text-white/60 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab-bg"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 shadow-lg shadow-indigo-200/50"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </span>
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === "shadow" && <ShadowWorkExplorer />}
            {activeTab === "dynamics" && <TypeDynamicsSimulator />}
            {activeTab === "reframe" && <CognitiveReframeTool />}
            {activeTab === "patterns" && <PatternTracker />}
            {activeTab === "journal" && <EnneagramJournal />}
          </motion.div>
        </AnimatePresence>

        <NextStepBanner
          href="/game"
          label="Track Your Progress"
          sublabel="See your learning path and unlock new topics"
          color="#6366f1"
          dismissKey="journal-game"
        />
      </div>
    </div>
  );
}
