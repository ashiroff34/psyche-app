"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Zap, Droplets, ShoppingBag } from "lucide-react";
import Link from "next/link";
import ChibiSprite from "@/components/ChibiSprite";
import { usePetState } from "@/hooks/usePetState";
import { useProfile } from "@/hooks/useProfile";

const TYPE_COLORS: Record<number, string> = {
  1: "#E74C3C", 2: "#E91E8C", 3: "#F39C12", 4: "#9B59B6",
  5: "#2980B9", 6: "#27AE60", 7: "#1ABC9C", 8: "#E67E22", 9: "#95A5A6",
};

const PET_NAMES: Record<number, string> = {
  1: "Athena", 2: "Clover", 3: "Blaze", 4: "Luna",
  5: "Corvus", 6: "Scout", 7: "Zippy", 8: "Ember", 9: "Mochi",
};

function StatBar({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${Math.round((value / max) * 100)}%` }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      />
    </div>
  );
}

export default function PetPage() {
  const { profile } = useProfile();
  const enneagramType = profile.enneagramType ?? profile.enneagramCore ?? 5;
  const { petState, feedPet, playWithPet } = usePetState(enneagramType);
  const [fed, setFed] = useState(false);
  const [played, setPlayed] = useState(false);

  const instinct = profile.instinctualStacking?.split("/")?.[0] ?? "sp";
  const color = TYPE_COLORS[enneagramType] ?? "#8b5cf6";
  const petName = petState?.name ?? PET_NAMES[enneagramType] ?? "your companion";

  const health = petState?.health ?? 80;
  const hunger = petState?.hunger ?? 60;
  const isAlive = petState?.isAlive !== false;

  const mood = !isAlive ? "hurt"
    : health > 70 && hunger > 60 ? "happy"
    : health < 30 || hunger < 20 ? "hurt"
    : "idle";

  // Dummy token check, feed/play are free on the pet page
  const freeSpend = () => true;

  function handleFeed() {
    if (fed) return;
    feedPet(freeSpend);
    setFed(true);
    setTimeout(() => setFed(false), 4000);
  }

  function handlePlay() {
    if (played) return;
    playWithPet(freeSpend);
    setPlayed(true);
    setTimeout(() => setPlayed(false), 4000);
  }

  return (
    <div className="min-h-screen pb-32 pt-16" style={{ background: "#0f0a1e" }}>
      <div className="max-w-md mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-2 pt-6">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: `${color}99` }}>
            Type {enneagramType} Companion
          </p>
          <h1 className="text-2xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.92)" }}>
            {petName}
          </h1>
        </div>

        {/* Pet scene */}
        <div className="flex flex-col items-center py-8">
          {/* Glow behind chibi */}
          <div
            className="absolute w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background: `radial-gradient(circle, ${color}, transparent)` }}
          />

          {/* Chibi with bounce animation */}
          <motion.div
            animate={mood === "happy" || fed || played
              ? { y: [0, -14, 0, -8, 0], scale: [1, 1.06, 1] }
              : { y: [0, -6, 0] }
            }
            transition={mood === "happy" || fed || played
              ? { duration: 0.6, repeat: fed || played ? 3 : Infinity }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }
            className="relative"
          >
            <ChibiSprite
              type={enneagramType}
              instinct={instinct}
              size={140}
              state={mood}
            />
          </motion.div>

          {/* Shadow */}
          <div
            className="w-20 h-3 rounded-full -mt-2"
            style={{ background: `radial-gradient(ellipse, ${color}40, transparent)` }}
          />

          {/* Speech bubble (shows on feed/play) */}
          <AnimatePresence>
            {(fed || played) && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.9 }}
                className="mt-4 px-4 py-2 rounded-2xl text-sm font-semibold"
                style={{ background: `${color}22`, border: `1px solid ${color}44`, color: "rgba(255,255,255,0.85)" }}
              >
                {fed ? "(^_^) thank you!" : "(o^_^o) yay!"}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stats */}
        <div
          className="rounded-2xl p-4 mb-5"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>Health</span>
                </div>
                <span className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.5)" }}>{health}/100</span>
              </div>
              <StatBar value={health} color="linear-gradient(90deg, #f43f5e, #fb7185)" />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>Hunger</span>
                </div>
                <span className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.5)" }}>{hunger}/100</span>
              </div>
              <StatBar value={hunger} color="linear-gradient(90deg, #3b82f6, #60a5fa)" />
            </div>
          </div>
        </div>

        {/* Care buttons */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleFeed}
            disabled={fed || !isAlive}
            className="py-3.5 rounded-2xl text-sm font-bold text-white transition-all disabled:opacity-40"
            style={{ background: fed ? "rgba(255,255,255,0.06)" : `linear-gradient(135deg, ${color}cc, ${color}88)` }}
          >
            {fed ? "(-_-) full" : "Feed"}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handlePlay}
            disabled={played || !isAlive}
            className="py-3.5 rounded-2xl text-sm font-bold text-white transition-all disabled:opacity-40"
            style={{ background: played ? "rgba(255,255,255,0.06)" : "rgba(139,92,246,0.3)" }}
          >
            {played ? "(-_-) tired" : "Play"}
          </motion.button>
        </div>

        {/* Info card */}
        <div
          className="p-4 rounded-2xl mb-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.25)" }}>About your companion</p>
          <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            {petName} reflects your inner life. Complete daily practice to keep them healthy, they thrive when you do. Earn tokens through lessons to unlock accessories and backgrounds in the store.
          </p>
        </div>

        {/* Store link */}
        <Link
          href="/store"
          className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium transition-all"
          style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.8)" }}
        >
          <ShoppingBag className="w-4 h-4" />
          Accessories in the store
        </Link>

      </div>
    </div>
  );
}
