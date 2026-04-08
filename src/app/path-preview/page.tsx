"use client";

import { useState } from "react";
import PathView, { type PathUnit } from "@/components/daily/PathView";
import PathIteration1 from "@/components/daily/PathIteration1";
import PathIteration2 from "@/components/daily/PathIteration2";
import PathIteration3 from "@/components/daily/PathIteration3";
import PathIteration4 from "@/components/daily/PathIteration4";
import type { PathNodeConfig } from "@/components/daily/NodeBottomSheet";

// ── Sample data to preview all states ───────────────────────────────────────

const sampleUnits: PathUnit[] = [
  {
    id: "foundations",
    name: "Daily Foundations",
    gradFrom: "#8b5cf6",
    gradTo: "#ec4899",
    nodes: [
      { id: "n1", label: "Warmup", sublabel: "5 questions", status: "completed", nodeType: "quiz", xp: 50, questionCount: 5, moduleId: "warmup", unitName: "Foundations", gradFrom: "#8b5cf6", gradTo: "#ec4899" },
      { id: "n2", label: "Type Deep Dive", sublabel: "20 questions", status: "completed", nodeType: "quiz", xp: 100, questionCount: 20, moduleId: "type", unitName: "Foundations", gradFrom: "#8b5cf6", gradTo: "#ec4899" },
      { id: "n3", label: "Reflection", sublabel: "Journal", status: "current", nodeType: "reflection", xp: 40, questionCount: 0, moduleId: null, unitName: "Foundations", gradFrom: "#8b5cf6", gradTo: "#ec4899", prompt: "Reflect on your type" },
      { id: "n4", label: "Cognitive", sublabel: "15 questions", status: "locked", nodeType: "quiz", xp: 75, questionCount: 15, moduleId: "cognitive", unitName: "Foundations", gradFrom: "#8b5cf6", gradTo: "#ec4899" },
    ],
  },
  {
    id: "mind",
    name: "Mind & Functions",
    gradFrom: "#6366f1",
    gradTo: "#8b5cf6",
    nodes: [
      { id: "n5", label: "Cross-System", sublabel: "12 questions", status: "locked", nodeType: "quiz", xp: 90, questionCount: 12, moduleId: "cross", unitName: "Mind", gradFrom: "#6366f1", gradTo: "#8b5cf6" },
      { id: "n6", label: "Growth Challenge", sublabel: "Real-world", status: "locked", nodeType: "challenge", xp: 50, questionCount: 0, moduleId: null, unitName: "Mind", gradFrom: "#6366f1", gradTo: "#8b5cf6", prompt: "Try something new" },
    ],
  },
  {
    id: "depth",
    name: "Deep Knowledge",
    gradFrom: "#f59e0b",
    gradTo: "#f97316",
    nodes: [
      { id: "n7", label: "History", sublabel: "12 questions", status: "locked", nodeType: "quiz", xp: 75, questionCount: 12, moduleId: "history", unitName: "Depth", gradFrom: "#f59e0b", gradTo: "#f97316" },
      { id: "n8", label: "Bonus Round", sublabel: "12 questions", status: "locked", nodeType: "bonus", xp: 60, questionCount: 12, moduleId: "cross-bonus", unitName: "Depth", gradFrom: "#f59e0b", gradTo: "#f97316" },
    ],
  },
];

const handleNodeTap = (node: PathNodeConfig) => {
  alert(`Tapped: ${node.label} (${node.status})`);
};

export default function PathPreviewPage() {
  const [iteration, setIteration] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [activeTab, setActiveTab] = useState<"enneagram" | "jungian">("enneagram");

  return (
    <div className="min-h-screen">
      {/* Iteration selector. sticky top */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 px-4 py-3">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Path Iteration Preview</p>
        <div className="flex gap-2">
          {[
            { id: 0, label: "Current", color: "bg-slate-500" },
            { id: 1, label: "1: Classic Duo", color: "bg-green-500" },
            { id: 2, label: "2: Premium Dark", color: "bg-violet-500" },
            { id: 3, label: "3: Faithful + Thyself", color: "bg-amber-500" },
            { id: 4, label: "4: Dark + Bold Lines", color: "bg-purple-600" },
          ].map((it) => (
            <button
              key={it.id}
              onClick={() => setIteration(it.id as 0 | 1 | 2 | 3 | 4)}
              className={`py-2 px-2 rounded-lg text-[10px] font-bold transition-all ${
                iteration === it.id
                  ? `${it.color} text-white shadow-md`
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {it.label}
            </button>
          ))}
        </div>
      </div>

      {/* Render selected iteration */}
      {iteration === 0 && (
        <PathView
          units={sampleUnits}
          onNodeTap={handleNodeTap}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      )}
      {iteration === 1 && (
        <PathIteration1 units={sampleUnits} onNodeTap={handleNodeTap} />
      )}
      {iteration === 2 && (
        <PathIteration2 units={sampleUnits} onNodeTap={handleNodeTap} />
      )}
      {iteration === 3 && (
        <PathIteration3 units={sampleUnits} onNodeTap={handleNodeTap} streak={12} />
      )}
      {iteration === 4 && (
        <PathIteration4 units={sampleUnits} onNodeTap={handleNodeTap} />
      )}
    </div>
  );
}
