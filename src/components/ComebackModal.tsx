"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Heart, X, Zap, Snowflake, Coins } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PetSprite from "@/components/PetSprite";
import { acquireNotificationLock, releaseNotificationLock } from "@/lib/notificationLock";

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
  const router = useRouter();
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
    if (daysSince < 1) return;

    const petType = typeof petState?.type === "number" ? petState.type : null;

    // Determine user type label
    const enneagramType = typeof profile.enneagramType === "number" ? profile.enneagramType : null;
    const cognitiveType = typeof profile.cognitiveType === "string" ? profile.cognitiveType : null;
    const userType = cognitiveType ?? (enneagramType ? `Type ${enneagramType}` : null);

    // Only show if no other notification is currently visible
    if (!acquireNotificationLock("comeback-modal")) return;

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

  const handleClose = () => {
    releaseNotificationLock("comeback-modal");
    setShow(false);
  };

  const handleClaim = () => {
    const today = getDateKey();
    const daysSince = data?.daysSince ?? 0;

    // Progressive ladder (Dai/Milkman/Riis fresh-start effect + Neff self-compassion):
    //   1-3 days = gentle  (no bonus, warm framing, no pressure)
    //   4-13 days = moderate (+25 tokens, +50 xp, +1 streak freeze)
    //   14-29 days = empathetic (+40 tokens, +75 xp, +2 freezes, warmer copy, no shame)
    //   30+ days = freshStart (+75 tokens, +100 xp, +3 freezes, fresh-start framing)
    const tokenBonus = daysSince >= 30 ? 75 : daysSince >= 14 ? 40 : daysSince >= 4 ? 25 : 0;

    // Apply all rewards in a single read-modify-write to avoid overwriting earlier changes
    if (daysSince >= 4 || tokenBonus > 0) {
      try {
        const raw = localStorage.getItem("psyche-game-state");
        const gs = raw ? JSON.parse(raw) : {};
        if (daysSince >= 4) {
          const xpBoost = daysSince >= 30 ? 100 : daysSince >= 14 ? 75 : 50;
          const freezeBoost = daysSince >= 30 ? 3 : daysSince >= 14 ? 2 : 1;
          gs.xp = (gs.xp ?? 0) + xpBoost;
          gs.totalXPEarned = (gs.totalXPEarned ?? 0) + xpBoost;
          gs.streakFreezes = (gs.streakFreezes ?? 0) + freezeBoost;
        }
        if (tokenBonus > 0) {
          gs.tokens = ((gs.tokens as number) ?? 0) + tokenBonus;
          gs.totalTokensEarned = ((gs.totalTokensEarned as number) ?? 0) + tokenBonus;
        }
        localStorage.setItem("psyche-game-state", JSON.stringify(gs));
      } catch {}
    }

    // Mark claimed
    sessionStorage.setItem("comeback-claimed-date", today);

    setClaimed(true);
    setTimeout(() => {
      releaseNotificationLock("comeback-modal");
      setShow(false);
      router.push("/daily");
    }, 1200);
  };

  if (!data) return null;

  const { daysSince } = data;

  // Segment ladder: gentle (1-3), moderate (4-13), empathetic (14-29), freshStart (30+)
  type Segment = "gentle" | "moderate" | "empathetic" | "freshStart";
  const segment: Segment =
    daysSince >= 30 ? "freshStart"
    : daysSince >= 14 ? "empathetic"
    : daysSince >= 4 ? "moderate"
    : "gentle";
  // Any long-away tier triggers the token/reward paths that used to be "winback"
  const isLongAway: boolean = segment === "empathetic" || segment === "freshStart";

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

  // Heading / subtext / CTA copy per segment
  const headingText =
    segment === "freshStart"
      ? "A fresh start is always available."
      : segment === "empathetic"
      ? "No streak to catch up on. Just you, here."
      : isLongAway
      ? "Your growth path is waiting."
      : data.petName !== "Your pet"
      ? `${data.petName} missed you.`
      : data.userType
      ? `We missed you, ${data.userType}.`
      : "We missed you.";

  const subtextEl =
    segment === "gentle" ? (
      <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
        You were away for {daysSince === 1 ? "1 day" : `${daysSince} days`}. let&apos;s pick up where you left off.
      </p>
    ) : segment === "freshStart" ? (
      <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
        It&apos;s been {daysSince} days. That&apos;s a long break, and that&apos;s okay. Research shows returning after a long absence is a temporal landmark, a fresh start window. You can begin again, clean. No streak pressure.
      </p>
    ) : segment === "empathetic" ? (
      <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
        {daysSince} days. Life takes over sometimes. Nothing you built here went away. Your type is still yours, and what you learned is still there. Come back at your pace.
      </p>
    ) : isLongAway ? (
      <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
        You&apos;ve been away {daysSince} days.{data.userType ? ` ${data.userType}s` : " People"} who return after a break often have the deepest breakthroughs.
      </p>
    ) : (
      <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
        {daysSince === 1
          ? "You were away for 1 day. come back strong."
          : `You were away for ${daysSince} days. Your chibi is still here waiting.`}
      </p>
    );

  const ctaLabel =
    segment === "gentle" ? "Continue →"
    : segment === "freshStart" ? "Begin again →"
    : segment === "empathetic" ? "I'm back →"
    : isLongAway ? "Return to your journey →"
    : null; // moderate uses icon+text button
  void isLongAway;

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
            <div className="pointer-events-auto w-full max-w-sm rounded-3xl overflow-hidden" style={{ background: "rgba(18,12,36,0.98)", border: "1px solid rgba(139,92,246,0.25)", boxShadow: "0 24px 60px rgba(0,0,0,0.6)" }}>
              {/* Header gradient strip */}
              <div className={`h-1.5 ${segment === "gentle" ? "bg-gradient-to-r from-slate-500 via-indigo-500 to-slate-500" : isLongAway ? "bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-400" : "bg-gradient-to-r from-violet-400 via-indigo-500 to-sky-400"}`} />

              <div className="p-7 relative">
                {/* Close button */}
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  className="absolute top-4 right-4 p-2.5 rounded-xl transition"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Heading */}
                <div className="text-center mb-5">
                  <h2 className="text-2xl font-serif font-bold mb-0.5" style={{ color: "rgba(255,255,255,0.95)" }}>
                    {headingText}
                  </h2>
                  {subtextEl}
                  {/* Urgency line. only for moderate/winback */}
                  {segment !== "gentle" && (
                    data.petHealth !== null && data.petHealth < 80 ? (
                      <p className="text-xs mt-2 font-medium" style={{ color: "#fb923c" }}>
                        Your pet&apos;s health dropped while you were away
                      </p>
                    ) : (data.petHealth === null || data.petHealth >= 80) && daysSince > 0 ? (
                      <p className="text-xs mt-2 font-medium" style={{ color: "#f87171" }}>
                        Your streak reset. start a new one today
                      </p>
                    ) : null
                  )}
                </div>

                {/* Comeback bonus card. only for moderate (4-13) and win-back (14+) */}
                {segment !== "gentle" && (
                  <div className="p-4 rounded-2xl mb-4" style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.2)" }}>
                    <p className="text-xs font-semibold tracking-wide mb-3 uppercase" style={{ color: "#a78bfa" }}>
                      Comeback Bonus
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(251,191,36,0.15)" }}>
                          <Zap className="w-4 h-4" style={{ color: "#fbbf24" }} />
                        </div>
                        <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.82)" }}>+50 XP</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(56,189,248,0.15)" }}>
                          <Snowflake className="w-4 h-4" style={{ color: "#38bdf8" }} />
                        </div>
                        <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.82)" }}>+1 Streak Freeze</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(52,211,153,0.15)" }}>
                          <Coins className="w-4 h-4" style={{ color: "#34d399" }} />
                        </div>
                        <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.82)" }}>
                          {isLongAway
                            ? <>+50 tokens <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>win-back bonus</span></>
                            : <>2× tokens today <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>+25 bonus</span></>
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pet status (if pet exists). show for moderate and winback */}
                {segment !== "gentle" && (data.petName !== "Your pet" || data.petHealth !== null) ? (
                  <div className="p-4 rounded-2xl mb-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="flex items-center gap-3 mb-3">
                      <PetSprite type={data.petType} size={60} />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>
                          {data.petName} missed you!
                        </p>
                        {!data.petAlive && (
                          <div>
                            <p className="text-xs font-medium" style={{ color: "#f87171" }}>Needs revival</p>
                            <Link href="/avatar" onClick={handleClose} className="text-xs font-semibold" style={{ color: "#fb7185" }}>
                              Go revive →
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                    {data.petHealth !== null && data.petAlive && (
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" /> Health
                            </span>
                            <span>{data.petHealth}%</span>
                          </div>
                          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                            <div
                              className={`h-full rounded-full transition-all ${petHealthColor}`}
                              style={{ width: `${data.petHealth}%` }}
                            />
                          </div>
                        </div>
                        {data.petHunger !== null && (
                          <div>
                            <div className="flex justify-between text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                              <span>Hunger</span>
                              <span>{data.petHunger}%</span>
                            </div>
                            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
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
                ) : segment !== "gentle" ? null : null}

                {/* Claim / Continue button */}
                <motion.button
                  onClick={handleClaim}
                  disabled={claimed}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all text-white"
                  style={claimed
                    ? { background: "rgba(52,211,153,0.15)", color: "#34d399", cursor: "default" }
                    : segment === "gentle"
                    ? { background: "rgba(99,102,241,0.35)", border: "1px solid rgba(99,102,241,0.4)" }
                    : { background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 8px 24px rgba(124,58,237,0.4)" }
                  }
                >
                  {claimed ? (
                    <>Bonus Claimed!</>
                  ) : segment === "gentle" ? (
                    <>{ctaLabel}</>
                  ) : isLongAway ? (
                    <>{ctaLabel}</>
                  ) : (
                    <>
                      <Trophy className="w-4 h-4" />
                      Claim your 25 tokens →
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
