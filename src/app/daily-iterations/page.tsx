"use client";

import { useState } from "react";
import {
  Flame, Zap, Star, CheckCircle, Lock, Trophy, Lightbulb,
  Brain, Compass, Heart, BookOpen, Target, ChevronRight,
  Crown, Sparkles, GraduationCap, Shield, Dumbbell,
  ArrowRight, Play, Gift, Layers
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED DATA for all iterations
   ═══════════════════════════════════════════════════════════════════════════ */
const UNITS = [
  {
    id: 1,
    title: "Foundations",
    subtitle: "Know your core type",
    color: "emerald",
    nodes: [
      { id: "1-1", title: "Your Core Fear", status: "completed" as const, xp: 50, icon: Heart },
      { id: "1-2", title: "Your Core Desire", status: "completed" as const, xp: 50, icon: Star },
      { id: "1-3", title: "Passion & Fixation", status: "completed" as const, xp: 75, icon: Flame },
      { id: "1-4", title: "Unit Review", status: "completed" as const, xp: 100, icon: Trophy, isChest: true },
    ],
  },
  {
    id: 2,
    title: "Wings & Lines",
    subtitle: "Expand your understanding",
    color: "indigo",
    nodes: [
      { id: "2-1", title: "Your Wing Types", status: "completed" as const, xp: 50, icon: Compass },
      { id: "2-2", title: "Integration Line", status: "completed" as const, xp: 75, icon: ArrowRight },
      { id: "2-3", title: "Stress Line", status: "current" as const, xp: 75, icon: Shield },
      { id: "2-4", title: "Wing Balance", status: "locked" as const, xp: 50, icon: Layers },
      { id: "2-5", title: "Unit Challenge", status: "locked" as const, xp: 150, icon: Crown, isChest: true },
    ],
  },
  {
    id: 3,
    title: "Instinctual Variants",
    subtitle: "sp, sx, so subtypes",
    color: "violet",
    nodes: [
      { id: "3-1", title: "Self-Preservation", status: "locked" as const, xp: 50, icon: Shield },
      { id: "3-2", title: "Sexual/One-to-One", status: "locked" as const, xp: 50, icon: Heart },
      { id: "3-3", title: "Social", status: "locked" as const, xp: 50, icon: Target },
      { id: "3-4", title: "Your Stacking", status: "locked" as const, xp: 75, icon: Layers },
      { id: "3-5", title: "Variant Mastery", status: "locked" as const, xp: 150, icon: Trophy, isChest: true },
    ],
  },
  {
    id: 4,
    title: "Cognitive Functions",
    subtitle: "Jung's 8 functions",
    color: "sky",
    nodes: [
      { id: "4-1", title: "Perceiving Functions", status: "locked" as const, xp: 50, icon: Brain },
      { id: "4-2", title: "Judging Functions", status: "locked" as const, xp: 50, icon: Target },
      { id: "4-3", title: "Your Stack", status: "locked" as const, xp: 75, icon: Layers },
      { id: "4-4", title: "Shadow Functions", status: "locked" as const, xp: 100, icon: Shield },
      { id: "4-5", title: "Function Mastery", status: "locked" as const, xp: 150, icon: Crown, isChest: true },
    ],
  },
];

const nodeStatusStyles = {
  completed: "bg-emerald-400 text-white border-emerald-500 shadow-emerald-200",
  current: "bg-gradient-to-br from-amber-400 to-orange-400 text-white border-amber-500 shadow-amber-200 ring-4 ring-amber-100 animate-pulse",
  locked: "bg-slate-100 text-slate-300 border-slate-200",
};

/* ═══════════════════════════════════════════════════════════════════════════ */

export default function DailyIterationsPage() {
  const [activeIteration, setActiveIteration] = useState(1);

  const iterations = [
    { id: 1, name: "Winding Path", desc: "Classic Duolingo S-curve with nodes" },
    { id: 2, name: "Vertical Stack", desc: "Units stacked top-down, nodes inline" },
    { id: 3, name: "Island Map", desc: "Each unit is a floating island" },
    { id: 4, name: "Timeline", desc: "Left-aligned timeline with branches" },
    { id: 5, name: "Card Path", desc: "Cards in a winding grid layout" },
    { id: 6, name: "Constellation", desc: "Nodes as stars with connecting lines" },
    { id: 7, name: "River Flow", desc: "Flowing river with stepping stones" },
    { id: 8, name: "Tree Growth", desc: "Growing tree with branches per unit" },
    { id: 9, name: "Spiral", desc: "Spiral path from center outward" },
    { id: 10, name: "Hybrid", desc: "Best elements combined" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="max-w-md mx-auto px-4 pt-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-serif font-bold text-slate-900">Daily Tab Iterations</h1>
          <p className="text-slate-400 text-sm mt-1">10 Duolingo-inspired layouts for the Daily page</p>
        </div>

        {/* Iteration Selector */}
        <div className="flex overflow-x-auto gap-2 pb-3 mb-6 -mx-4 px-4 no-scrollbar">
          {iterations.map(it => (
            <button
              key={it.id}
              onClick={() => setActiveIteration(it.id)}
              className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeIteration === it.id
                  ? "bg-slate-800 text-white shadow-lg"
                  : "bg-white text-slate-500 border border-slate-200 hover:border-slate-300"
              }`}
            >
              #{it.id} {it.name}
            </button>
          ))}
        </div>

        {/* Active Iteration Description */}
        <div className="mb-4 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
          <p className="text-sm text-indigo-700 font-medium">
            {iterations[activeIteration - 1].name}: {iterations[activeIteration - 1].desc}
          </p>
        </div>

        {/* ═══════ SHARED HEADER (appears in all iterations) ═══════ */}
        <SharedHeader />

        {/* ═══════ ITERATIONS ═══════ */}
        {activeIteration === 1 && <Iteration1 />}
        {activeIteration === 2 && <Iteration2 />}
        {activeIteration === 3 && <Iteration3 />}
        {activeIteration === 4 && <Iteration4 />}
        {activeIteration === 5 && <Iteration5 />}
        {activeIteration === 6 && <Iteration6 />}
        {activeIteration === 7 && <Iteration7 />}
        {activeIteration === 8 && <Iteration8 />}
        {activeIteration === 9 && <Iteration9 />}
        {activeIteration === 10 && <Iteration10 />}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED HEADER, streak, XP, daily insight (present in all iterations)
   ═══════════════════════════════════════════════════════════════════════════ */
function SharedHeader() {
  return (
    <div className="mb-6 space-y-3">
      {/* Top bar: streak + gems + hearts */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-orange-500">
            <Flame className="w-5 h-5" />
            <span className="font-bold text-sm">12</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-500">
            <Zap className="w-5 h-5" />
            <span className="font-bold text-sm">1,250</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-rose-400">
          <Heart className="w-5 h-5 fill-current" />
          <span className="font-bold text-sm">5</span>
        </div>
      </div>

      {/* Daily Insight Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 via-sky-50 to-violet-50 border border-indigo-100/60">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-semibold text-indigo-600">Today&apos;s Insight</span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed italic">
          &ldquo;Until you make the unconscious conscious, it will direct your life and you will call it fate.&rdquo;
        </p>
        <p className="text-xs text-slate-400 mt-1">Carl Jung</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ITERATION 1: WINDING PATH (classic Duolingo S-curve)
   ═══════════════════════════════════════════════════════════════════════════ */
function Iteration1() {
  return (
    <div className="space-y-2">
      {UNITS.map((unit, unitIdx) => (
        <div key={unit.id}>
          {/* Unit Header */}
          <div className={`p-4 rounded-2xl mb-4 bg-gradient-to-r ${
            unit.color === "emerald" ? "from-emerald-500 to-teal-500" :
            unit.color === "indigo" ? "from-indigo-500 to-blue-500" :
            unit.color === "violet" ? "from-violet-500 to-purple-500" :
            "from-sky-500 to-cyan-500"
          } text-white`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-white/60 uppercase tracking-wider">Unit {unit.id}</div>
                <h3 className="font-serif font-bold text-lg">{unit.title}</h3>
                <p className="text-sm text-white/70">{unit.subtitle}</p>
              </div>
              <BookOpen className="w-8 h-8 text-white/30" />
            </div>
          </div>

          {/* Winding S-curve nodes */}
          <div className="relative pb-8">
            {unit.nodes.map((node, i) => {
              const isEven = i % 2 === 0;
              const offset = isEven
                ? unitIdx % 2 === 0 ? "ml-8" : "ml-auto mr-8"
                : unitIdx % 2 === 0 ? "ml-auto mr-8" : "ml-8";

              return (
                <div key={node.id} className={`relative flex flex-col items-center w-20 mb-6 ${offset}`}>
                  {/* Connecting line */}
                  {i > 0 && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-200" />
                  )}
                  {/* Node circle */}
                  <button
                    className={`w-16 h-16 rounded-full flex items-center justify-center border-[3px] shadow-lg transition-transform hover:scale-105 ${
                      nodeStatusStyles[node.status]
                    }`}
                    disabled={node.status === "locked"}
                  >
                    {node.status === "locked" ? (
                      <Lock className="w-5 h-5" />
                    ) : node.status === "completed" ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : node.isChest ? (
                      <Gift className="w-6 h-6" />
                    ) : (
                      <node.icon className="w-6 h-6" />
                    )}
                  </button>
                  {/* Label */}
                  <span className={`text-[11px] mt-1.5 text-center font-medium leading-tight ${
                    node.status === "locked" ? "text-slate-300" : "text-slate-600"
                  }`}>
                    {node.title}
                  </span>
                  {/* XP badge */}
                  {node.status !== "locked" && (
                    <span className="text-[10px] text-amber-500 font-semibold mt-0.5">+{node.xp} XP</span>
                  )}
                  {/* START label on current */}
                  {node.status === "current" && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-white rounded-md text-[10px] font-bold text-amber-600 shadow-sm border border-amber-200 uppercase tracking-wider">
                      Start
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ITERATION 2: VERTICAL STACK (clean top-down, nodes as horizontal cards)
   ═══════════════════════════════════════════════════════════════════════════ */
function Iteration2() {
  return (
    <div className="space-y-6">
      {UNITS.map((unit) => (
        <div key={unit.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Unit Header */}
          <div className={`p-4 bg-gradient-to-r ${
            unit.color === "emerald" ? "from-emerald-500 to-teal-500" :
            unit.color === "indigo" ? "from-indigo-500 to-blue-500" :
            unit.color === "violet" ? "from-violet-500 to-purple-500" :
            "from-sky-500 to-cyan-500"
          } text-white`}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-white/60 uppercase tracking-wider">Unit {unit.id}</span>
                <h3 className="font-serif font-bold">{unit.title}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-white/60">
                  {unit.nodes.filter(n => n.status === "completed").length}/{unit.nodes.length}
                </span>
                <div className="h-1.5 w-20 bg-white/20 rounded-full mt-1">
                  <div
                    className="h-full bg-white rounded-full"
                    style={{ width: `${(unit.nodes.filter(n => n.status === "completed").length / unit.nodes.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Node List */}
          <div className="divide-y divide-slate-50">
            {unit.nodes.map((node, i) => (
              <button
                key={node.id}
                disabled={node.status === "locked"}
                className={`w-full flex items-center gap-4 p-4 transition-colors ${
                  node.status === "locked" ? "opacity-40" :
                  node.status === "current" ? "bg-amber-50" : "hover:bg-slate-50"
                }`}
              >
                {/* Step number / status */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  node.status === "completed" ? "bg-emerald-100 text-emerald-600" :
                  node.status === "current" ? "bg-amber-100 text-amber-600" :
                  "bg-slate-100 text-slate-300"
                }`}>
                  {node.status === "completed" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : node.status === "locked" ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </div>
                {/* Title */}
                <div className="flex-1 text-left">
                  <p className={`text-sm font-medium ${
                    node.status === "locked" ? "text-slate-300" : "text-slate-700"
                  }`}>{node.title}</p>
                  <p className="text-xs text-slate-400">{node.xp} XP</p>
                </div>
                {/* Arrow */}
                {node.status !== "locked" && (
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                )}
                {node.status === "current" && (
                  <span className="px-2 py-0.5 bg-amber-400 text-white text-[10px] rounded-full font-bold uppercase">
                    Next
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ITERATION 3: ISLAND MAP (each unit = floating island)
   ═══════════════════════════════════════════════════════════════════════════ */
function Iteration3() {
  const islandGradients = [
    "from-emerald-400 via-green-300 to-emerald-500",
    "from-indigo-400 via-blue-300 to-indigo-500",
    "from-violet-400 via-purple-300 to-violet-500",
    "from-sky-400 via-cyan-300 to-sky-500",
  ];

  return (
    <div className="relative space-y-12 py-4">
      {/* Dotted connecting line between islands */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-slate-200" />

      {UNITS.map((unit, idx) => (
        <div
          key={unit.id}
          className={`relative ${idx % 2 === 0 ? "mr-8" : "ml-8"}`}
        >
          <div className={`relative bg-gradient-to-br ${islandGradients[idx]} rounded-[2rem] p-6 shadow-xl`}>
            {/* Island "ground" shadow */}
            <div className="absolute -bottom-2 inset-x-4 h-4 bg-black/10 rounded-[2rem] blur-md" />

            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs text-white/60 uppercase tracking-wider font-medium">Island {unit.id}</span>
                  <h3 className="font-serif font-bold text-white text-lg">{unit.title}</h3>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white font-bold text-sm">
                    {unit.nodes.filter(n => n.status === "completed").length}/{unit.nodes.length}
                  </span>
                </div>
              </div>

              {/* Nodes as "buildings" on the island */}
              <div className="flex flex-wrap gap-3 justify-center">
                {unit.nodes.map((node) => (
                  <button
                    key={node.id}
                    disabled={node.status === "locked"}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform hover:scale-110 ${
                      node.status === "completed" ? "bg-white text-emerald-500 shadow-md" :
                      node.status === "current" ? "bg-white text-amber-500 shadow-lg ring-2 ring-amber-300 animate-bounce" :
                      "bg-white/20 text-white/40 backdrop-blur-sm"
                    }`}
                  >
                    {node.status === "locked" ? <Lock className="w-4 h-4" /> :
                     node.status === "completed" ? <CheckCircle className="w-5 h-5" /> :
                     <node.icon className="w-5 h-5" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ITERATION 4: TIMELINE (left-aligned with milestone markers)
   ═══════════════════════════════════════════════════════════════════════════ */
function Iteration4() {
  return (
    <div className="relative pl-8">
      {/* Main vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 via-indigo-400 to-slate-200" />

      {UNITS.map((unit) => (
        <div key={unit.id} className="relative mb-10">
          {/* Unit marker */}
          <div className={`absolute -left-8 w-8 h-8 rounded-full flex items-center justify-center ${
            unit.color === "emerald" ? "bg-emerald-500" :
            unit.color === "indigo" ? "bg-indigo-500" :
            unit.color === "violet" ? "bg-violet-500" :
            "bg-sky-500"
          } text-white font-bold text-sm shadow-lg`}>
            {unit.id}
          </div>

          {/* Unit Title */}
          <div className="mb-4">
            <h3 className="font-serif font-bold text-slate-800">{unit.title}</h3>
            <p className="text-xs text-slate-400">{unit.subtitle}</p>
          </div>

          {/* Nodes */}
          <div className="space-y-2">
            {unit.nodes.map((node) => (
              <button
                key={node.id}
                disabled={node.status === "locked"}
                className={`relative w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  node.status === "completed" ? "bg-emerald-50 border border-emerald-100" :
                  node.status === "current" ? "bg-amber-50 border-2 border-amber-300 shadow-md" :
                  "bg-slate-50 border border-slate-100 opacity-50"
                }`}
              >
                {/* Connector dot */}
                <div className="absolute -left-[2.35rem] w-2.5 h-2.5 rounded-full bg-white border-2 border-slate-300" />

                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  node.status === "completed" ? "bg-emerald-400 text-white" :
                  node.status === "current" ? "bg-amber-400 text-white" :
                  "bg-slate-200 text-slate-400"
                }`}>
                  {node.status === "locked" ? <Lock className="w-3.5 h-3.5" /> :
                   node.status === "completed" ? <CheckCircle className="w-4 h-4" /> :
                   <node.icon className="w-4 h-4" />}
                </div>
                <div className="flex-1 text-left">
                  <span className="text-sm font-medium text-slate-700">{node.title}</span>
                </div>
                {node.status === "current" && (
                  <span className="px-2 py-1 bg-amber-400 text-white text-[10px] rounded-full font-bold">START</span>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ITERATION 5: CARD PATH (winding grid of cards)
   ═══════════════════════════════════════════════════════════════════════════ */
function Iteration5() {
  return (
    <div className="space-y-8">
      {UNITS.map((unit) => (
        <div key={unit.id}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
              unit.color === "emerald" ? "bg-emerald-500" :
              unit.color === "indigo" ? "bg-indigo-500" :
              unit.color === "violet" ? "bg-violet-500" :
              "bg-sky-500"
            }`}>{unit.id}</div>
            <div>
              <h3 className="font-serif font-bold text-sm text-slate-800">{unit.title}</h3>
              <p className="text-[11px] text-slate-400">{unit.subtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {unit.nodes.map((node) => (
              <button
                key={node.id}
                disabled={node.status === "locked"}
                className={`p-4 rounded-2xl text-center transition-all ${
                  node.status === "completed"
                    ? "bg-white border-2 border-emerald-200 shadow-sm"
                    : node.status === "current"
                    ? "bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 shadow-md"
                    : "bg-slate-50 border border-slate-100 opacity-40"
                } ${node.isChest ? "col-span-2" : ""}`}
              >
                <div className={`w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center ${
                  node.status === "completed" ? "bg-emerald-100 text-emerald-500" :
                  node.status === "current" ? "bg-amber-100 text-amber-600" :
                  "bg-slate-100 text-slate-300"
                }`}>
                  {node.status === "locked" ? <Lock className="w-5 h-5" /> :
                   node.status === "completed" ? <CheckCircle className="w-6 h-6" /> :
                   <node.icon className="w-6 h-6" />}
                </div>
                <p className={`text-xs font-medium ${
                  node.status === "locked" ? "text-slate-300" : "text-slate-700"
                }`}>{node.title}</p>
                {node.status !== "locked" && (
                  <p className="text-[10px] text-amber-500 font-semibold mt-1">+{node.xp} XP</p>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ITERATION 6: CONSTELLATION (nodes as stars connected by lines)
   ═══════════════════════════════════════════════════════════════════════════ */
function Iteration6() {
  return (
    <div className="space-y-10">
      {UNITS.map((unit) => (
        <div key={unit.id}>
          <div className="text-center mb-4">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">Unit {unit.id}</span>
            <h3 className="font-serif font-bold text-slate-800">{unit.title}</h3>
          </div>

          {/* Star field */}
          <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 min-h-[200px] overflow-hidden">
            {/* Background stars */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${(i * 37 + 13) % 90 + 5}%`,
                  top: `${(i * 43 + 7) % 85 + 5}%`,
                }}
              />
            ))}

            {/* Node constellation */}
            <div className="relative flex flex-wrap gap-6 justify-center items-center">
              {unit.nodes.map((node, i) => (
                <div key={node.id} className="relative">
                  {/* Connection line to next */}
                  {i < unit.nodes.length - 1 && (
                    <div className="absolute top-1/2 -right-4 w-4 h-0.5 bg-white/10" />
                  )}
                  <button
                    disabled={node.status === "locked"}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                      node.status === "completed"
                        ? "bg-emerald-400/80 text-white shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                        : node.status === "current"
                        ? "bg-amber-400 text-white shadow-[0_0_20px_rgba(251,191,36,0.6)] animate-pulse"
                        : "bg-white/10 text-white/20"
                    }`}
                  >
                    {node.status === "locked" ? <Lock className="w-4 h-4" /> :
                     node.status === "completed" ? <CheckCircle className="w-5 h-5" /> :
                     <node.icon className="w-5 h-5" />}
                  </button>
                  <p className="text-[10px] text-white/50 text-center mt-1 max-w-[60px]">{node.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ITERATION 7: RIVER FLOW (flowing path with stepping stones)
   ═══════════════════════════════════════════════════════════════════════════ */
function Iteration7() {
  return (
    <div className="space-y-2">
      {UNITS.map((unit, unitIdx) => (
        <div key={unit.id} className="relative">
          {/* River background */}
          <div className={`rounded-3xl p-5 mb-4 ${
            unit.color === "emerald" ? "bg-gradient-to-br from-emerald-50 to-green-100" :
            unit.color === "indigo" ? "bg-gradient-to-br from-indigo-50 to-blue-100" :
            unit.color === "violet" ? "bg-gradient-to-br from-violet-50 to-purple-100" :
            "bg-gradient-to-br from-sky-50 to-cyan-100"
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className={`w-4 h-4 ${
                unit.color === "emerald" ? "text-emerald-600" :
                unit.color === "indigo" ? "text-indigo-600" :
                unit.color === "violet" ? "text-violet-600" :
                "text-sky-600"
              }`} />
              <span className={`text-sm font-bold ${
                unit.color === "emerald" ? "text-emerald-800" :
                unit.color === "indigo" ? "text-indigo-800" :
                unit.color === "violet" ? "text-violet-800" :
                "text-sky-800"
              }`}>{unit.title}</span>
            </div>

            {/* Stepping stones */}
            <div className="flex flex-col gap-3">
              {unit.nodes.map((node, i) => {
                const offset = i % 3 === 0 ? "ml-0" : i % 3 === 1 ? "ml-12" : "ml-6";
                return (
                  <button
                    key={node.id}
                    disabled={node.status === "locked"}
                    className={`${offset} w-fit flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                      node.status === "completed"
                        ? "bg-white shadow-sm border border-emerald-200"
                        : node.status === "current"
                        ? "bg-white shadow-lg border-2 border-amber-400 ring-4 ring-amber-100"
                        : "bg-white/50 border border-slate-200/50"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      node.status === "completed" ? "bg-emerald-400 text-white" :
                      node.status === "current" ? "bg-amber-400 text-white" :
                      "bg-slate-100 text-slate-300"
                    }`}>
                      {node.status === "locked" ? <Lock className="w-4 h-4" /> :
                       node.status === "completed" ? <CheckCircle className="w-5 h-5" /> :
                       <node.icon className="w-5 h-5" />}
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-medium ${node.status === "locked" ? "text-slate-300" : "text-slate-700"}`}>
                        {node.title}
                      </p>
                      {node.status === "current" && (
                        <p className="text-[10px] text-amber-500 font-bold uppercase">Continue</p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ITERATION 8: TREE GROWTH (vertical tree with branches)
   ═══════════════════════════════════════════════════════════════════════════ */
function Iteration8() {
  return (
    <div className="relative">
      {/* Trunk */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-amber-700 via-amber-600 to-slate-200 rounded-full" />

      {UNITS.map((unit, unitIdx) => (
        <div key={unit.id} className="relative mb-12">
          {/* Branch label */}
          <div className={`relative z-10 mx-auto w-fit px-4 py-2 rounded-full shadow-md text-white font-bold text-sm mb-6 ${
            unit.color === "emerald" ? "bg-emerald-500" :
            unit.color === "indigo" ? "bg-indigo-500" :
            unit.color === "violet" ? "bg-violet-500" :
            "bg-sky-500"
          }`}>
            {unit.title}
          </div>

          {/* Branches (nodes alternate left/right) */}
          {unit.nodes.map((node, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={node.id} className={`relative flex items-center gap-3 mb-4 ${
                isLeft ? "flex-row pr-[52%]" : "flex-row-reverse pl-[52%]"
              }`}>
                {/* Branch line */}
                <div className={`absolute top-1/2 ${isLeft ? "right-[48%]" : "left-[48%]"} w-[4%] h-0.5 ${
                  node.status === "locked" ? "bg-slate-200" : "bg-amber-400"
                }`} />

                {/* Leaf/node */}
                <button
                  disabled={node.status === "locked"}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl w-full transition-all ${
                    node.status === "completed"
                      ? "bg-emerald-50 border border-emerald-200"
                      : node.status === "current"
                      ? "bg-amber-50 border-2 border-amber-400 shadow-lg"
                      : "bg-slate-50 border border-slate-100 opacity-40"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    node.status === "completed" ? "bg-emerald-400 text-white" :
                    node.status === "current" ? "bg-amber-400 text-white" :
                    "bg-slate-200 text-slate-400"
                  }`}>
                    {node.status === "locked" ? <Lock className="w-4 h-4" /> :
                     node.status === "completed" ? <CheckCircle className="w-4 h-4" /> :
                     <node.icon className="w-4 h-4" />}
                  </div>
                  <div className={isLeft ? "text-left" : "text-right"}>
                    <p className="text-xs font-medium text-slate-700">{node.title}</p>
                    {node.status !== "locked" && <p className="text-[10px] text-amber-500">+{node.xp} XP</p>}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ITERATION 9: SPIRAL (nodes in an expanding spiral)
   ═══════════════════════════════════════════════════════════════════════════ */
function Iteration9() {
  const allNodes = UNITS.flatMap(u => u.nodes.map(n => ({ ...n, unitColor: u.color, unitTitle: u.title })));

  return (
    <div className="space-y-8">
      {UNITS.map((unit) => (
        <div key={unit.id}>
          <div className={`p-4 rounded-2xl mb-3 ${
            unit.color === "emerald" ? "bg-emerald-50 border border-emerald-100" :
            unit.color === "indigo" ? "bg-indigo-50 border border-indigo-100" :
            unit.color === "violet" ? "bg-violet-50 border border-violet-100" :
            "bg-sky-50 border border-sky-100"
          }`}>
            <h3 className={`font-serif font-bold ${
              unit.color === "emerald" ? "text-emerald-800" :
              unit.color === "indigo" ? "text-indigo-800" :
              unit.color === "violet" ? "text-violet-800" :
              "text-sky-800"
            }`}>{unit.title}</h3>
            <p className="text-xs text-slate-400">{unit.subtitle}</p>
          </div>

          {/* Circular/spiral arrangement */}
          <div className="relative h-48 flex items-center justify-center">
            {unit.nodes.map((node, i) => {
              const angle = (i / unit.nodes.length) * Math.PI * 1.5 - Math.PI / 2;
              const radius = 60 + i * 8;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <button
                  key={node.id}
                  disabled={node.status === "locked"}
                  className={`absolute w-12 h-12 rounded-full flex items-center justify-center transition-all border-2 ${
                    node.status === "completed"
                      ? "bg-emerald-400 text-white border-emerald-500 shadow-lg"
                      : node.status === "current"
                      ? "bg-amber-400 text-white border-amber-500 shadow-xl animate-pulse ring-4 ring-amber-100"
                      : "bg-slate-100 text-slate-300 border-slate-200"
                  }`}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                >
                  {node.status === "locked" ? <Lock className="w-4 h-4" /> :
                   node.status === "completed" ? <CheckCircle className="w-5 h-5" /> :
                   <node.icon className="w-5 h-5" />}
                </button>
              );
            })}
            {/* Center label */}
            <div className={`absolute w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl ${
              unit.color === "emerald" ? "bg-emerald-500" :
              unit.color === "indigo" ? "bg-indigo-500" :
              unit.color === "violet" ? "bg-violet-500" :
              "bg-sky-500"
            }`}>
              {unit.id}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ITERATION 10: HYBRID (best of all, Duo path + clean cards + gamification)
   ═══════════════════════════════════════════════════════════════════════════ */
function Iteration10() {
  return (
    <div className="space-y-6">
      {/* Daily Challenge Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-500 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Dumbbell className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Daily Challenge</span>
            </div>
            <p className="text-sm text-white/80">Complete today&apos;s growth exercise for 50 bonus XP</p>
          </div>
          <button className="shrink-0 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-sm font-bold hover:bg-white/30 transition">
            Go
          </button>
        </div>
      </div>

      {/* Path with S-curve AND clean cards */}
      {UNITS.map((unit) => {
        const completedCount = unit.nodes.filter(n => n.status === "completed").length;
        const progress = Math.round((completedCount / unit.nodes.length) * 100);

        return (
          <div key={unit.id}>
            {/* Unit header with progress */}
            <div className={`p-4 rounded-2xl mb-3 bg-gradient-to-r ${
              unit.color === "emerald" ? "from-emerald-500 to-teal-500" :
              unit.color === "indigo" ? "from-indigo-500 to-blue-500" :
              unit.color === "violet" ? "from-violet-500 to-purple-500" :
              "from-sky-500 to-cyan-500"
            } text-white shadow-lg`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-[10px] text-white/50 uppercase tracking-widest">Unit {unit.id}</span>
                  <h3 className="font-serif font-bold">{unit.title}</h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold">{progress}%</span>
                </div>
              </div>
              <div className="h-2 bg-white/20 rounded-full">
                <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Winding path nodes */}
            <div className="relative px-4 pb-4">
              {unit.nodes.map((node, i) => {
                // S-curve positioning
                const positions = ["ml-4", "ml-auto mr-4", "mx-auto", "ml-auto mr-4", "ml-4"];
                const pos = positions[i % positions.length];

                return (
                  <div key={node.id} className={`flex flex-col items-center w-fit mb-4 ${pos}`}>
                    {/* Connecting dotted line */}
                    {i > 0 && (
                      <div className="w-0.5 h-4 border-l-2 border-dashed border-slate-200 mb-1" />
                    )}

                    <button
                      disabled={node.status === "locked"}
                      className={`relative w-16 h-16 rounded-full flex items-center justify-center border-[3px] transition-all hover:scale-105 ${
                        node.status === "completed"
                          ? "bg-emerald-400 text-white border-emerald-500 shadow-lg shadow-emerald-200"
                          : node.status === "current"
                          ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white border-amber-500 shadow-lg shadow-amber-200 ring-4 ring-amber-100"
                          : "bg-slate-100 text-slate-300 border-slate-200"
                      }`}
                    >
                      {node.status === "locked" ? <Lock className="w-5 h-5" /> :
                       node.status === "completed" ? <CheckCircle className="w-6 h-6" /> :
                       node.isChest ? <Gift className="w-6 h-6" /> :
                       <node.icon className="w-6 h-6" />}

                      {node.status === "current" && (
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full uppercase shadow-md whitespace-nowrap">
                          Start
                        </span>
                      )}
                    </button>

                    <span className={`text-[11px] mt-2 font-medium text-center max-w-[80px] ${
                      node.status === "locked" ? "text-slate-300" : "text-slate-600"
                    }`}>{node.title}</span>

                    {node.status !== "locked" && (
                      <span className="text-[10px] text-amber-500 font-bold">+{node.xp} XP</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Bottom motivational */}
      <div className="text-center py-6">
        <p className="text-sm text-slate-400">Keep going! You&apos;re building real self-knowledge.</p>
      </div>
    </div>
  );
}
