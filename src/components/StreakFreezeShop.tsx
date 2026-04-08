"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Shield, Zap, X } from "lucide-react";

interface Props {
  onClose: () => void;
}

function getTomorrowISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function getMonthKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function getTokens(): number {
  try {
    const raw = localStorage.getItem("psyche-game-state");
    if (!raw) return 0;
    const gs = JSON.parse(raw);
    return typeof gs.tokens === "number" ? gs.tokens : 0;
  } catch {
    return 0;
  }
}

function deductTokens(amount: number): boolean {
  try {
    const raw = localStorage.getItem("psyche-game-state");
    const gs = raw ? JSON.parse(raw) : {};
    const current = typeof gs.tokens === "number" ? gs.tokens : 0;
    if (current < amount) return false;
    gs.tokens = current - amount;
    localStorage.setItem("psyche-game-state", JSON.stringify(gs));
    return true;
  } catch {
    return false;
  }
}

function getStreakCount(): number {
  try {
    const raw = localStorage.getItem("psyche-game-state");
    if (!raw) return 0;
    const gs = JSON.parse(raw);
    return typeof gs.streakCount === "number" ? gs.streakCount : 0;
  } catch {
    return 0;
  }
}

export default function StreakFreezeShop({ onClose }: Props) {
  const [tokens, setTokens] = useState(0);
  const [streak, setStreak] = useState(0);
  const [freezeActive, setFreezeActive] = useState(false);
  const [doubleXPActive, setDoubleXPActive] = useState(false);
  const [repairUsedThisMonth, setRepairUsedThisMonth] = useState(false);
  const [justPurchased, setJustPurchased] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = getTomorrowISO();
    const monthKey = getMonthKey();

    setTokens(getTokens());
    setStreak(getStreakCount());

    try {
      const freezeFlag = localStorage.getItem("psyche-streak-freeze-active");
      const freezeExpires = localStorage.getItem("psyche-streak-freeze-expires");
      setFreezeActive(freezeFlag === "true" && !!freezeExpires && freezeExpires >= today);

      const xpExpires = localStorage.getItem("psyche-double-xp-expires");
      setDoubleXPActive(!!xpExpires && xpExpires >= today);

      const repairKey = `psyche-streak-repair-used-${monthKey}`;
      setRepairUsedThisMonth(localStorage.getItem(repairKey) === "true");
    } catch {}
  }, []);

  function buyStreakFreeze() {
    const cost = 50;
    if (tokens < cost) return;
    if (!deductTokens(cost)) return;
    const tomorrow = getTomorrowISO();
    try {
      localStorage.setItem("psyche-streak-freeze-active", "true");
      localStorage.setItem("psyche-streak-freeze-expires", tomorrow);
    } catch {}
    setTokens((t) => t - cost);
    setFreezeActive(true);
    setJustPurchased("freeze");
    setTimeout(() => setJustPurchased(null), 2000);
  }

  function buyDoubleXP() {
    const cost = 75;
    if (tokens < cost) return;
    if (!deductTokens(cost)) return;
    const tomorrow = getTomorrowISO();
    try {
      localStorage.setItem("psyche-double-xp-expires", tomorrow);
    } catch {}
    setTokens((t) => t - cost);
    setDoubleXPActive(true);
    setJustPurchased("xp");
    setTimeout(() => setJustPurchased(null), 2000);
  }

  function buyStreakRepair() {
    const cost = 150;
    if (tokens < cost) return;
    if (repairUsedThisMonth) return;
    if (!deductTokens(cost)) return;
    const monthKey = getMonthKey();
    try {
      localStorage.setItem(`psyche-streak-repair-used-${monthKey}`, "true");
      const raw = localStorage.getItem("psyche-game-state");
      const gs = raw ? JSON.parse(raw) : {};
      gs.streakCount = (typeof gs.streakCount === "number" ? gs.streakCount : 0) + 1;
      localStorage.setItem("psyche-game-state", JSON.stringify(gs));
    } catch {}
    setTokens((t) => t - cost);
    setStreak((s) => s + 1);
    setRepairUsedThisMonth(true);
    setJustPurchased("repair");
    setTimeout(() => setJustPurchased(null), 2000);
  }

  const items = [
    {
      id: "freeze",
      icon: <Shield className="w-5 h-5 text-sky-500" />,
      name: "Streak Freeze",
      description: "Protects your streak for 1 day if you miss your practice.",
      cost: 50,
      active: freezeActive,
      activeLabel: "Active until tomorrow",
      disabled: freezeActive || tokens < 50,
      onBuy: buyStreakFreeze,
      color: "sky",
    },
    {
      id: "xp",
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      name: "Double XP Day",
      description: "Earn 2x tokens for the next 24 hours.",
      cost: 75,
      active: doubleXPActive,
      activeLabel: "Active until tomorrow",
      disabled: doubleXPActive || tokens < 75,
      onBuy: buyDoubleXP,
      color: "amber",
    },
    {
      id: "repair",
      icon: <Flame className="w-5 h-5 text-orange-500" />,
      name: "Streak Repair",
      description: "Restore a broken streak. Once per month.",
      cost: 150,
      active: repairUsedThisMonth,
      activeLabel: "Used this month",
      disabled: repairUsedThisMonth || tokens < 150,
      onBuy: buyStreakRepair,
      color: "orange",
    },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      style={{ background: "rgba(10,5,25,0.82)", backdropFilter: "blur(12px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: "linear-gradient(145deg, #1a0f3a, #0f0a1e)", border: "1px solid rgba(255,255,255,0.1)" }}
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 16 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white">Streak Shop</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-orange-300 font-bold text-sm">{streak}-day streak</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)" }}>
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-300 font-bold text-sm">{tokens}</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <X className="w-4 h-4 text-white/60" />
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="px-4 pb-6 flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl p-4 flex items-center gap-4"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-white font-bold text-sm">{item.name}</span>
                  {item.active && (
                    <span
                      className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{ background: "rgba(134,239,172,0.15)", color: "#86efac" }}
                    >
                      {item.activeLabel}
                    </span>
                  )}
                </div>
                <p className="text-white/50 text-xs leading-relaxed">{item.description}</p>
              </div>
              <AnimatePresence mode="wait">
                {justPurchased === item.id ? (
                  <motion.div
                    key="done"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    className="text-green-400 text-lg font-black flex-shrink-0"
                  >
                    ✓
                  </motion.div>
                ) : (
                  <motion.button
                    key="buy"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={item.disabled ? undefined : item.onBuy}
                    disabled={item.disabled}
                    className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95"
                    style={
                      item.active
                        ? { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.25)", cursor: "default" }
                        : tokens < item.cost
                        ? { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.2)", cursor: "not-allowed" }
                        : {
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            color: "#fff",
                            boxShadow: "0 2px 12px rgba(99,102,241,0.4)",
                          }
                    }
                  >
                    {item.active ? "Owned" : `${item.cost} ⚡`}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
