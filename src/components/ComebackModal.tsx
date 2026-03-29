"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Heart, X, Zap, Snowflake } from "lucide-react";
import PetSprite from "@/components/PetSprite";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getDateKey() {
  return new Date().toISOString().split("T")[0];
}

function daysBetween(isoA: string, isoB: string): number {
  const a = new Date(isoA).getTime();
  const b = new Date(isoB).getTime();
  return Math.max(0, Math.floor(Math.abs(b - a) / 86400000));
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface ModalData {
  petName: string;
  petType: number;
  petHealth: number | null;
  petHunger: number | null;
  petAlive: boolean;
  daysSince: number;
  userType: string | null;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ComebackModal() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<ModalData | null>(null);
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    const today = getDateKey();

    // Only show once per session
    if (sessionStorage.getItem("comeback-shown") === "true") return;

    // Don't show until onboarding/tutorial is complete
    if (localStorage.getItem("psyche-tutorial-complete") !== "true") return;

    let profile: Record<string, unknown> = {};
    let petState: Record<string, unknown> | null = null;

    try {
      const raw = localStorage.getItem("psyche-profile");
      if (raw) profile = JSON.parse(raw);
    } catch {}

    try {
      const raw = localStorage.getItem("psyche-pet-state");
      if (raw) petState = JSON.parse(raw);
    } catch {}

    const lastVisitDate = typeof profile.lastVisitDate === "string" ? profile.lastVisitDate : null;
    if (!lastVisitDate || lastVisitDate === today) return;

    const daysSince = daysBetween(lastVisitDate, today);
    if (daysSince < 3) return;

    const petType = typeof petState?.type === "number" ? petState.type : null;

    // Determine user type label
    const enneagramType = typeof profile.enneagramType === "number" ? profile.enneagramType : null;
    const cognitiveType = typeof profile.cognitiveType === "string" ? profile.cognitiveType : null;
    const userType = cognitiveType ?? (enneagramType ? `Type ${enneagramType}` : null);

    setData({
      petName: typeof petState?.name === "string" ? petState.name : "Your pet",
      petType: (petState?.type ?? enneagramType ?? 1) as number,
      petHealth: typeof petState?.health === "number" ? petState.health : null,
      petHunger: typeof petState?.hunger === "number" ? petState.hunger : null,
      petAlive: petState?.isAlive !== false,
      daysSince,
      userType,
    });

    setShow(true);
    sessionStorage.setItem("comeback-shown", "true");
  }, []);

  const handleClaim = () => {
    const today = getDateKey();

    // Add 50 XP and 1 streak freeze to psyche-game-state (authoritative source)
    try {
      const raw = localStorage.getItem("psyche-game-state");
      const gameState = raw ? JSON.parse(raw) : {};
      gameState.xp = (gameState.xp ?? 0) + 50;
      gameState.totalXPEarned = (gameState.totalXPEarned ?? 0) + 50;
      gameState.streakFreezes = (gameState.streakFreezes ?? 0) + 1;
      localStorage.setItem("psyche-game-state", JSON.stringify(gameState));
    } catch {}

    // Mark claimed
    sessionStorage.setItem("comeback-claimed-date", today);

    setClaimed(true);
    setTimeout(() => setShow(false), 1200);
  };

  const handleClose = () => setShow(false);

  if (!data) return null;

  const petHealthColor =
    data.petHealth === null
      ? "bg-slate-200"
      : data.petHealth < 20
      ? "bg-red-400"
      : data.petHealth < 50
      ? "bg-orange-400"
      : "bg-emerald-400";

  const petHungerColor =
    data.petHunger === null
      ? "bg-slate-200"
      : data.petHunger < 30
      ? "bg-orange-400"
      : "bg-sky-400";

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            key="comeback-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="comeback-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-sm bg-white rounded-3xl shadow-2xl shadow-indigo-200/40 overflow-hidden">
              {/* Header gradient strip */}
              <div className="h-1.5 bg-gradient-to-r from-violet-400 via-indigo-500 to-sky-400" />

              <div className="p-7 relative">
                {/* Close button */}
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  className="absolute top-4 right-4 p-2.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Heading */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-serif font-bold text-slate-900 mb-0.5">
                    Welcome back{data.userType ? `, ${data.userType}` : ""}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {data.daysSince === 1
                      ? "You were away for 1 day"
                      : `You were away for ${data.daysSince} days`}
                  </p>
                </div>

                {/* Comeback bonus card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 mb-4">
                  <p className="text-xs font-semibold text-violet-600 tracking-wide mb-3 uppercase">
                    Comeback Bonus
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-amber-600" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">+50 XP</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center">
                        <Snowflake className="w-4 h-4 text-sky-600" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">+1 Streak Freeze</span>
                    </div>
                  </div>
                </div>

                {/* Pet status (if pet exists) */}
                {data.petName !== "Your pet" || data.petHealth !== null ? (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-5">
                    <div className="flex items-center gap-3 mb-3">
                      <PetSprite type={data.petType} size={60} />
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {data.petName} missed you!
                        </p>
                        {!data.petAlive && (
                          <p className="text-xs text-red-500 font-medium">Needs revival</p>
                        )}
                      </div>
                    </div>
                    {data.petHealth !== null && data.petAlive && (
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" /> Health
                            </span>
                            <span>{data.petHealth}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${petHealthColor}`}
                              style={{ width: `${data.petHealth}%` }}
                            />
                          </div>
                        </div>
                        {data.petHunger !== null && (
                          <div>
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                              <span>Hunger</span>
                              <span>{data.petHunger}%</span>
                            </div>
                            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${petHungerColor}`}
                                style={{ width: `${data.petHunger}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Claim button */}
                <motion.button
                  onClick={handleClaim}
                  disabled={claimed}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                    claimed
                      ? "bg-emerald-100 text-emerald-700 cursor-default"
                      : "bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white shadow-lg shadow-violet-200/50"
                  }`}
                >
                  {claimed ? (
                    <>Bonus Claimed!</>
                  ) : (
                    <>
                      <Trophy className="w-4 h-4" />
                      Claim Bonus &amp; Continue
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
