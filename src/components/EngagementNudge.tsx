"use client";

// ─── EngagementNudge ──────────────────────────────────────────────────────────
//
// Shows contextual prompts to keep the user engaged:
//  - Re-entry prompt: when the user comes back after 24+ hours away
//  - Idle prompt: after 3 minutes of no mouse/touch activity on the page
//  - Pet health warning: when pet health drops below 30
//
// Prompts are dismissible and don't repeat the same message within a session.
//
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { acquireNotificationLock, releaseNotificationLock } from "@/lib/notificationLock";
import Link from "next/link";
import { X, Flame, Heart, Zap, ArrowRight, Star } from "lucide-react";

interface Nudge {
  id: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  cta: string;
  href: string;
  accentClass: string; // tailwind gradient classes for the icon bg
}

const IDLE_MINUTES = 3; // show idle nudge after this many minutes

// ── Contextual nudge pools ────────────────────────────────────────────────────

function buildNudges(
  profile: Record<string, unknown>,
  petHealth: number,
  streakCount: number,
  daysSinceVisit: number,
  doneStreakToday: boolean
): Nudge[] {
  const nudges: Nudge[] = [];

  // Pet health critical
  if (petHealth > 0 && petHealth < 30) {
    nudges.push({
      id: "pet-hungry",
      icon: null,
      title: "Your pet is starving!",
      body: `Health: ${petHealth}%. Feed them in the Game Hub before it's too late.`,
      cta: "Feed now",
      href: "/game",
      accentClass: "from-rose-400 to-orange-400",
    });
  }

  // Pet dead
  if (petHealth === 0) {
    nudges.push({
      id: "pet-dead",
      icon: null,
      title: "Your pet didn't make it…",
      body: "Use 100 tokens in the shop to revive them.",
      cta: "Revive pet",
      href: "/game",
      accentClass: "from-slate-400 to-slate-600",
    });
  }

  // Streak about to break, only if they haven't done their practice today yet
  if (streakCount > 0 && !doneStreakToday) {
    const streakUrgencyMap: Record<number, string> = {
      1: `Your ${streakCount}-day streak isn't perfect yet, keep going.`,
      2: `Your ${streakCount}-day streak shows your dedication. Don't let it slip.`,
      3: `Don't let that ${streakCount}-day streak fall off your stats.`,
      4: `${streakCount} days of meaningful practice, too beautiful to break.`,
      5: `${streakCount} consecutive days of learning is worth protecting.`,
      6: `You've stayed consistent for ${streakCount} days. One more keeps the pattern.`,
      7: `Your ${streakCount}-day streak is on the line, keep the adventure going!`,
      8: `You've built ${streakCount} days straight. Don't let anything stop you now.`,
      9: `${streakCount} days of peaceful consistency, keep the harmony alive.`,
    };
    const streakMsg = (profile.enneagramType && streakUrgencyMap[profile.enneagramType as number])
      ? streakUrgencyMap[profile.enneagramType as number]
      : `Your ${streakCount}-day streak is at risk!`;
    nudges.push({
      id: "streak-at-risk",
      icon: <Flame className="w-4 h-4 text-white" />,
      title: streakMsg,
      body: "Log any activity today to keep it alive.",
      cta: "Keep streak",
      href: "/daily",
      accentClass: "from-orange-400 to-rose-500",
    });
  }

  // No enneagram type yet
  if (!profile.enneagramType) {
    nudges.push({
      id: "no-enneagram",
      icon: <Zap className="w-4 h-4 text-white" />,
      title: "You haven't found your type yet",
      body: "Take the 5-minute assessment to unlock your full profile.",
      cta: "Find my type",
      href: "/enneagram/assess",
      accentClass: "from-sky-400 to-indigo-500",
    });
  }

  // Has enneagram, no cognitive
  if (profile.enneagramType && !profile.cognitiveType && !profile.mbtiType) {
    nudges.push({
      id: "no-cognitive",
      icon: <Star className="w-4 h-4 text-white" />,
      title: "Complete your profile",
      body: "Your cognitive function stack pairs perfectly with your Enneagram type.",
      cta: "Take cognitive test",
      href: "/cognitive/assess",
      accentClass: "from-violet-400 to-indigo.500",
    });
  }

  // Long absence (3+ days)
  if (daysSinceVisit >= 3) {
    nudges.push({
      id: "long-absence",
      icon: <Heart className="w-4 h-4 text-white" />,
      title: "Welcome back! We missed you",
      body: `You've been away for ${daysSinceVisit} days. Your daily insight is waiting.`,
      cta: "See today's insight",
      href: "/profile",
      accentClass: "from-pink-400 to-violet-500",
    });
  }

  // Idle fallback, personalized by type when available
  const typeNudgeMap: Record<number, { title: string; body: string }> = {
    1: { title: "Your standards are slipping", body: "Don't let your streak fall short of perfect. Daily practice awaits." },
    2: { title: "Someone needs your insight", body: "Your reflection today could help you show up better for the people you care about." },
    3: { title: "Your progress is stalling", body: "Keep your stats climbing, today's practice resets at midnight." },
    4: { title: "Something meaningful awaits", body: "Today's insight was written with your type in mind. Don't miss it." },
    5: { title: "New knowledge is waiting", body: "Your daily deep-dive resets at midnight. Feed your curiosity." },
    6: { title: "Stay consistent", body: "Consistency builds security. Your daily practice is ready." },
    7: { title: "New adventure inside", body: "Today's lesson has something fresh, don't let it expire." },
    8: { title: "Take charge of your growth", body: "Your daily challenge resets at midnight. Stay in control." },
    9: { title: "Keep the momentum going", body: "A little practice today keeps your streak alive. Don't let it fade." },
  };
  const typeNudge = profile.enneagramType ? typeNudgeMap[profile.enneagramType as number] : null;
  nudges.push({
    id: "idle-explore",
    icon: <Zap className="w-4 h-4 text-white" />,
    title: typeNudge?.title ?? "Still there?",
    body: typeNudge?.body ?? "Your daily growth challenge resets at midnight. Don't miss it.",
    cta: "Open today's insight",
    href: "/daily",
    accentClass: "from-sky-400 to-indigo-500",
  });

  return nudges;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function EngagementNudge() {
  const [nudge, setNudge] = useState<Nudge | null>(null);
  const [shown, setShown] = useState<Set<string>>(new Set());
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const dismissedRef = useRef<Set<string>>(new Set());

  const showNextNudge = useCallback(
    (nudges: Nudge[], reason: "idle" | "reentry" | "pet") => {
      const candidate = nudges.find(
        (n) => !dismissedRef.current.has(n.id) && !shown.has(n.id)
      );
      if (!candidate) return;
      // Don't show if another notification is already visible
      if (!acquireNotificationLock("engagement-nudge")) return;
      setShown((prev) => new Set([...prev, candidate.id]));
      setNudge(candidate);
    },
    [shown]
  );

  const dismiss = useCallback(() => {
    if (nudge) {
      dismissedRef.current.add(nudge.id);
      releaseNotificationLock("engagement-nudge");
    }
    setNudge(null);
  }, [nudge]);

  useEffect(() => {
    // Only run client-side
    try {
      const profileRaw = localStorage.getItem("psyche-profile");
      if (!profileRaw) return; // new user, no nudges

      // Don't show until onboarding/tutorial is complete
      if (localStorage.getItem("psyche-tutorial-complete") !== "true") return;

      const profile = JSON.parse(profileRaw) as Record<string, unknown>;

      // Calculate days since last visit
      const lastVisit = profile.lastVisitDate as string | undefined;
      const daysSinceVisit = lastVisit
        ? Math.floor((Date.now() - new Date(lastVisit).getTime()) / 86400000)
        : 0;

      // Update last visit
      localStorage.setItem(
        "psyche-profile",
        JSON.stringify({ ...profile, lastVisitDate: new Date().toISOString().split("T")[0] })
      );

      // Get pet health, streak, and today's activity from game state
      let petHealth = 100;
      let streakCount = 0;
      let doneStreakToday = false;
      try {
        const gs = localStorage.getItem("psyche-game-state");
        if (gs) {
          const parsed = JSON.parse(gs);
          petHealth = parsed.petHealth ?? 100;
          streakCount = parsed.streakCount ?? 0;
          const today = new Date().toISOString().split("T")[0];
          doneStreakToday = parsed.lastActivityDate === today;
        }
      } catch {}

      const nudges = buildNudges(profile, petHealth, streakCount, daysSinceVisit, doneStreakToday);

      // Re-entry nudge: show after 1.5s if absent 1+ day
      if (daysSinceVisit >= 1) {
        const timer = setTimeout(() => showNextNudge(nudges, "reentry"), 1500);
        return () => clearTimeout(timer);
      }

      // Pet critical: check immediately
      if (petHealth < 30) {
        const timer = setTimeout(() => showNextNudge(nudges, "pet"), 2000);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Idle detection, reset on any user activity
  useEffect(() => {
    const IDLE_MS = IDLE_MINUTES * 60 * 1000;

    const resetIdle = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      if (nudge) return; // already showing one

      idleTimer.current = setTimeout(() => {
        try {
          const profileRaw = localStorage.getItem("psyche-profile");
          if (!profileRaw) return;
          const profile = JSON.parse(profileRaw) as Record<string, unknown>;
          let petHealth = 100;
          let streakCount = 0;
          let doneToday = false;
          try {
            const gs = localStorage.getItem("psyche-game-state");
            if (gs) {
              const p = JSON.parse(gs);
              petHealth = p.petHealth ?? 100;
              streakCount = p.streakCount ?? 0;
              const today = new Date().toISOString().split("T")[0];
              doneToday = p.lastActivityDate === today;
            }
          } catch {}
          const nudges = buildNudges(profile, petHealth, streakCount, 0, doneToday);
          showNextNudge(nudges, "idle");
        } catch {}
      }, IDLE_MS);
    };

    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
    events.forEach((e) => window.addEventListener(e, resetIdle, { passive: true }));
    resetIdle(); // start timer immediately

    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      events.forEach((e) => window.removeEventListener(e, resetIdle));
    };
  }, [nudge, showNextNudge]);

  return (
    <AnimatePresence>
      {nudge && (
        <motion.div
          key={nudge.id}
          initial={{ opacity: 0, x: 120, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 120, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="fixed bottom-6 right-5 z-[60] w-80 rounded-3xl overflow-hidden"
          style={{ background: "rgba(20,14,40,0.97)", border: "1px solid rgba(139,92,246,0.2)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
        >
          {/* Colored top accent bar */}
          <div className={`h-1 w-full bg-gradient-to-r ${nudge.accentClass}`} />

          <div className="p-4">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${nudge.accentClass} flex items-center justify-center flex-shrink-0 shadow-md`}>
                {nudge.icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-snug" style={{ color: "rgba(255,255,255,0.92)" }}>{nudge.title}</p>
                <p className="text-xs mt-0.5 leading-snug" style={{ color: "rgba(255,255,255,0.5)" }}>{nudge.body}</p>
              </div>

              {/* Dismiss */}
              <button
                onClick={dismiss}
                className="transition-opacity flex-shrink-0 -mt-0.5 hover:opacity-100"
                style={{ color: "rgba(255,255,255,0.3)" }}
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* CTA */}
            <Link
              href={nudge.href}
              onClick={dismiss}
              className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl text-sm font-medium transition-all group text-white"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {nudge.cta}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" style={{ color: "rgba(167,139,250,0.8)" }} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
