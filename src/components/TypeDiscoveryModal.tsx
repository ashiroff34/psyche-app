"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { enneagramTypes } from "@/data/enneagram";

const STORAGE_KEY = "psyche-type-intro-seen";

interface Props {
  typeNum: number;
  isFirstDiscovery: boolean;
}

export default function TypeDiscoveryModal({ typeNum, isFirstDiscovery }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isFirstDiscovery) return;
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (!seen) setVisible(true);
    } catch {}
  }, [isFirstDiscovery]);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setVisible(false);
  }

  const typeData = enneagramTypes.find((t) => t.number === typeNum);
  if (!typeData) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-8"
          style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }}
          onClick={dismiss}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="w-full max-w-lg rounded-3xl overflow-hidden"
            style={{ background: "#100c22", border: "1px solid rgba(255,255,255,0.1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Color band */}
            <div
              className="h-1.5 w-full"
              style={{ background: typeData.color }}
            />

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Type discovered
                  </p>
                  <h2 className="text-3xl font-serif font-bold" style={{ color: typeData.color }}>
                    Type {typeNum}
                  </h2>
                  <p className="text-base font-medium mt-0.5" style={{ color: "rgba(255,255,255,0.75)" }}>
                    {typeData.name} · {typeData.alias}
                  </p>
                </div>
                <button
                  onClick={dismiss}
                  className="p-2 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                >
                  <X className="w-4 h-4" style={{ color: "rgba(255,255,255,0.4)" }} />
                </button>
              </div>

              {/* Core motivation */}
              <div
                className="p-4 rounded-2xl mb-4"
                style={{ background: `${typeData.color}12`, border: `1px solid ${typeData.color}25` }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: `${typeData.color}99` }}>
                  Core motivation
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {typeData.coreMotivation}
                </p>
              </div>

              {/* Virtue & Fear row */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div
                  className="p-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Core desire
                  </p>
                  <p className="text-xs leading-snug" style={{ color: "rgba(255,255,255,0.62)" }}>
                    {typeData.coreDesire}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Core fear
                  </p>
                  <p className="text-xs leading-snug" style={{ color: "rgba(255,255,255,0.62)" }}>
                    {typeData.coreFear}
                  </p>
                </div>
              </div>

              {/* Next step hint */}
              <div
                className="flex items-center justify-between p-3.5 rounded-2xl mb-4"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Your next step
                  </p>
                  <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.62)" }}>
                    Instinctual Stacking. discover your subtype
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 shrink-0" style={{ color: "rgba(255,255,255,0.3)" }} />
              </div>

              <button
                onClick={dismiss}
                className="w-full py-3.5 rounded-2xl font-semibold text-sm"
                style={{ background: typeData.color, color: "#0f0a1e" }}
              >
                Explore my type
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
