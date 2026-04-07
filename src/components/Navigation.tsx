"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { assetPath } from "@/lib/assetPath";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Compass,
  Beaker,
  X,
  UserCircle,
  Flame,
  Coins,
  ChevronLeft,
  Zap,
  Moon,
  Bug,
  Settings,
  Grid3x3,
  BookOpen,
} from "lucide-react";
import OuroborosLogo from "@/components/OuroborosLogo";
import SearchComponent from "@/components/Search";

// ── Bottom Tab Bar (5 main tabs, Duolingo-style) ──────────────────────────


// ── Nav Wheel spokes ──────────────────────────────────────────────────────────
// 6 destinations arranged in a fan above the center button.
// Labels match the BRIEFING redesign: Know / Learn / Practice / Explore / Grow / You

const WHEEL_SPOKES = [
  { href: "/assessments", label: "Know",     icon: Zap,        color: "#8b5cf6" },
  { href: "/daily",       label: "Practice", icon: Flame,      color: "#d946ef" },
  { href: "/enneagram",   label: "Explore",  icon: Compass,    color: "#0ea5e9" },
  { href: "/journal",     label: "Grow",     icon: Beaker,     color: "#10b981" },
  { href: "/profile",     label: "You",      icon: UserCircle, color: "#a78bfa" },
] as const;

// Spoke positions: fan of ±50° from straight-up, r=130px — 5 spokes
const SPOKE_OFFSETS = [-50, -25, 0, 25, 50].map((angleDeg) => {
  const r = 130;
  const rad = (angleDeg * Math.PI) / 180;
  return { x: r * Math.sin(rad), y: -r * Math.cos(rad) };
});

function NavWheel({
  pathname,
  storeUnlocked,
  storeNotifVisible,
  storeLockToast,
  onNavClick,
  onStoreLockDismiss,
}: {
  pathname: string;
  storeUnlocked: boolean;
  storeNotifVisible: boolean;
  storeLockToast: boolean;
  onNavClick: (e: React.MouseEvent, href: string) => void;
  onStoreLockDismiss: () => void;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Close wheel on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Close on outside tap
  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-nav-wheel]")) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    document.addEventListener("touchstart", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("touchstart", handle);
    };
  }, [open]);

  function handleSpokeTap(e: React.MouseEvent, href: string) {
    onNavClick(e, href);
    if (!e.defaultPrevented) {
      setOpen(false);
      router.push(href);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="wheel-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(10,6,20,0.72)", backdropFilter: "blur(4px)" }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Wheel container — fixed, centered at bottom */}
      <div
        data-nav-wheel
        className="fixed z-50"
        style={{ bottom: 24, left: "50%", transform: "translateX(-50%)" }}
      >
        {/* Spokes */}
        <AnimatePresence>
          {open && WHEEL_SPOKES.map((spoke, i) => {
            const { x, y } = SPOKE_OFFSETS[i];
            const Icon = spoke.icon;
            const isActive = pathname === spoke.href || (spoke.href !== "/" as string && pathname.startsWith(spoke.href));

            return (
              <motion.button
                key={spoke.href}
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={{ x, y, scale: 1, opacity: 1 }}
                exit={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 24,
                  delay: open ? i * 0.03 : (WHEEL_SPOKES.length - 1 - i) * 0.02,
                }}
                onClick={(e) => handleSpokeTap(e as unknown as React.MouseEvent, spoke.href)}
                className="absolute flex flex-col items-center gap-1.5"
                style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}
              >
                {/* Icon bubble */}
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{
                    background: isActive
                      ? spoke.color
                      : `${spoke.color}22`,
                    border: `1px solid ${spoke.color}${isActive ? "ff" : "55"}`,
                    boxShadow: isActive ? `0 0 18px ${spoke.color}55` : "none",
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: isActive ? "#fff" : spoke.color }} />
                </motion.div>
                {/* Label */}
                <span
                  className="text-[10px] font-bold uppercase tracking-wide leading-none"
                  style={{ color: isActive ? spoke.color : "rgba(255,255,255,0.55)" }}
                >
                  {spoke.label}
                </span>
              </motion.button>
            );
          })}
        </AnimatePresence>

        {/* Center button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setOpen(v => !v)}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
          style={{
            background: open
              ? "rgba(139,92,246,0.25)"
              : "linear-gradient(135deg, #7c3aed, #4f46e5)",
            border: `2px solid ${open ? "rgba(139,92,246,0.6)" : "rgba(139,92,246,0.4)"}`,
            boxShadow: open ? "0 0 32px rgba(139,92,246,0.4)" : "0 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-5 h-5 text-violet-300" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -45, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Grid3x3 className="w-5 h-5 text-white" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Store lock toast */}
        <AnimatePresence>
          {storeLockToast && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: -80 }}
              exit={{ opacity: 0 }}
              onClick={onStoreLockDismiss}
              className="absolute left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl text-xs font-medium text-white whitespace-nowrap cursor-pointer"
              style={{ background: "rgba(22,12,48,0.97)", border: "1px solid rgba(139,92,246,0.3)", boxShadow: "0 4px 16px rgba(0,0,0,0.4)" }}
            >
              Complete a lesson to unlock the Store
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

// ── "More" items — grouped into 3 sections ─────────────────────────────────
// Items are gated by account age (progressive disclosure):
//   Day 0-6:  Core only (Curriculum Map, Progress, Assessments, Enneagram, Cognitive)
//   Day 7+:   + Inner Work, Compare Types, Correlations
//   Day 14+:  + History & Origins

type MoreItem = { href: string; label: string; icon: React.ElementType; unlocksDay?: number };
type MoreGroup = { label: string; items: MoreItem[] };

const ALL_MORE_GROUPS: MoreGroup[] = [
  {
    label: "App",
    items: [
      { href: "/settings", label: "Settings", icon: Settings },
      { href: "/sources", label: "Sources & Research", icon: BookOpen },
    ],
  },
];

// ── More Menu (slide-up sheet on mobile, dropdown on desktop) ───────────────

function MoreMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [hasSeenExplore, setHasSeenExplore] = useState(true);
  const [daysSinceCreated, setDaysSinceCreated] = useState(999); // default shows all
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const seen = localStorage.getItem("psyche-explore-seen");
      if (!seen) setHasSeenExplore(false);
    } catch {
      // private browsing / storage blocked
    }
    // Read account age for progressive disclosure
    try {
      const raw = localStorage.getItem("psyche-game-state");
      if (raw) {
        const gs = JSON.parse(raw);
        if (gs.accountCreated) {
          const created = new Date(gs.accountCreated).getTime();
          const days = Math.floor((Date.now() - created) / 86400000);
          setDaysSinceCreated(days);
        }
      }
    } catch {}
  }, []);

  // Filter groups by account age — items without unlocksDay are always shown
  const moreGroups = ALL_MORE_GROUPS.map(group => ({
    ...group,
    items: group.items.filter(item => !item.unlocksDay || daysSinceCreated >= item.unlocksDay),
  })).filter(group => group.items.length > 0);

  const handleOpen = () => {
    setOpen(!open);
    if (!hasSeenExplore) {
      try {
        localStorage.setItem("psyche-explore-seen", "true");
      } catch {
        // private browsing / storage blocked
      }
      setHasSeenExplore(true);
    }
  };

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={handleOpen}
        className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all"
        style={{ color: "rgba(255,255,255,0.8)" }}
      >
        <Compass className="w-4 h-4" />
        <span className="hidden sm:inline">Explore</span>
        {!hasSeenExplore && (
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" title="New feature available" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-64 rounded-2xl overflow-hidden z-50"
            style={{ background: "rgba(22,12,48,0.97)", border: "1px solid rgba(139,92,246,0.18)", boxShadow: "0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.1)", backdropFilter: "blur(24px)" }}
          >
            <div className="p-2 max-h-[70vh] overflow-y-auto">
              {moreGroups.map((group, gi) => (
                <div key={group.label} className={gi > 0 ? "mt-1 pt-1" : ""} style={gi > 0 ? { borderTop: "1px solid rgba(255,255,255,0.07)" } : undefined}>
                  <p className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5" style={{ color: "rgba(167,139,250,0.5)" }}>{group.label}</p>
                  {group.items.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all"
                        style={{
                          background: isActive ? "rgba(139,92,246,0.18)" : "transparent",
                          color: isActive ? "#c4b5fd" : "rgba(255,255,255,0.7)",
                        }}
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              ))}
              {/* Utilities */}
              <div className="mt-1 pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <button
                  onClick={() => {
                    document.documentElement.classList.toggle("light");
                    try {
                      const isLight = document.documentElement.classList.contains("light");
                      localStorage.setItem("psyche-light-mode", isLight ? "true" : "false");
                    } catch {}
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  <Moon className="w-4 h-4" />
                  Light Mode
                </button>
                <button
                  onClick={() => {
                    setOpen(false);
                    let email = "support@thyself.app";
                    try {
                      const raw = localStorage.getItem("psyche-profile");
                      if (raw) {
                        const parsed = JSON.parse(raw);
                        if (parsed.email) email = parsed.email;
                      }
                    } catch {}
                    const subject = encodeURIComponent("Thyself Bug Report");
                    const body = encodeURIComponent(
                      "Describe the bug:\n\nSteps to reproduce:\n\nExpected behavior:\n\nDevice/Browser:"
                    );
                    window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_self");
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  <Bug className="w-4 h-4" />
                  Report a Bug
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Swipe detection overlay for tab navigation ──────────────────────────────

function SwipeNavigator() {
  const pathname = usePathname();
  const router = useRouter();
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const tabOrder = ["/", "/daily", "/avatar", "/store", "/profile"];

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;
      if (Math.abs(deltaX) < 80 || Math.abs(deltaX) < Math.abs(deltaY) * 1.5) return;

      const currentIdx = tabOrder.indexOf(pathname);
      if (currentIdx === -1) return; // not on a main tab page

      if (deltaX < 0 && currentIdx < tabOrder.length - 1) {
        router.push(tabOrder[currentIdx + 1]);
      } else if (deltaX > 0 && currentIdx > 0) {
        router.push(tabOrder[currentIdx - 1]);
      }
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [pathname, router]);

  return null; // No overlay needed, listeners are on document
}

// ── Main Navigation Component ───────────────────────────────────────────────

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  // Don't show nav on onboarding or for brand-new users
  const isOnboarding = pathname === "/onboarding";
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    try {
      const profile = localStorage.getItem("psyche-profile");
      const onboardingDone = localStorage.getItem("psyche-onboarding-complete");
      if (!profile && !onboardingDone) setIsNewUser(true);
      else setIsNewUser(false);
    } catch { setIsNewUser(false); }
  }, [pathname]);

  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [storeNotifVisible, setStoreNotifVisible] = useState(false);
  const [storeUnlocked, setStoreUnlocked] = useState(false);
  const [accountDays, setAccountDays] = useState(999);
  const [storeLockToast, setStoreLockToast] = useState(false);

  // Show pulsing Store dot only when user has >= 50 tokens and hasn't visited yet
  // Also gate Store tab visibility until user has earned their first tokens (Day 2+)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("psyche-game-state");
      if (!raw) return;
      const gs = JSON.parse(raw);
      const tokens = (gs.tokens as number) ?? 0;

      // Account age
      let days = 999;
      if (gs.accountCreated) {
        days = Math.floor((Date.now() - new Date(gs.accountCreated).getTime()) / 86400000);
      }
      setAccountDays(days);

      // Store is unlocked if they have tokens OR have been around 2+ days
      setStoreUnlocked(tokens > 0 || days >= 2);

      // Pulsing dot: tokens >= 50 and haven't visited
      const visited = localStorage.getItem("psyche-store-visited");
      if (!visited && tokens >= 50) setStoreNotifVisible(true);
      else setStoreNotifVisible(false);
    } catch {}
  }, [pathname]); // re-check whenever route changes (tokens may have just been awarded)
  void accountDays; // used above, referenced to avoid lint warning

  // Store page history in localStorage so back button always works
  useEffect(() => {
    try {
      const history: string[] = JSON.parse(localStorage.getItem("psyche-page-history") || "[]");
      // Don't add duplicates
      if (history[history.length - 1] !== pathname) {
        history.push(pathname);
        // Keep last 20 pages
        if (history.length > 20) history.shift();
        localStorage.setItem("psyche-page-history", JSON.stringify(history));
      }
      setHasPrevPage(history.length > 1);
    } catch {
      setHasPrevPage(false);
    }
  }, [pathname]);

  const goBack = () => {
    try {
      const history: string[] = JSON.parse(localStorage.getItem("psyche-page-history") || "[]");
      if (history.length > 1) {
        history.pop(); // Remove current page
        const prev = history[history.length - 1];
        localStorage.setItem("psyche-page-history", JSON.stringify(history));
        router.push(prev);
        return;
      }
    } catch {}
    router.back();
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href === "/store") {
      if (!storeUnlocked) {
        e.preventDefault();
        setStoreLockToast(true);
        setTimeout(() => setStoreLockToast(false), 2500);
        return;
      }
      try { localStorage.setItem("psyche-store-visited", "true"); } catch {}
      setStoreNotifVisible(false);
    }
  };

  const hideChrome = isOnboarding || isNewUser;

  if (isNewUser) return null; // Completely hide nav for brand-new users, fullscreen intro

  return (
    <>
      {/* ── Swipe detection for tab navigation ─────────────────────────── */}
      {!hideChrome && <SwipeNavigator />}

      {/* ── Top Bar (minimal — logo, back, level, more) ───────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Left: Back button (always present) + Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {!hideChrome && hasPrevPage && (
                <button
                  onClick={goBack}
                  className="flex items-center gap-1 px-2 py-1.5 -ml-2 rounded-xl transition-all active:scale-95"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                  aria-label="Go back"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="text-sm font-medium hidden sm:inline">Back</span>
                </button>
              )}
              <Link href="/" className="flex items-center gap-2 group">
                <div className="rounded-xl overflow-hidden shadow-lg flex-shrink-0" style={{ width: 32, height: 32, boxShadow: "0 4px 12px rgba(124,58,237,0.4)" }}>
                  <OuroborosLogo size={32} />
                </div>
                <span className="text-lg font-serif font-semibold tracking-tight" style={{ color: "rgba(255,255,255,0.92)" }}>
                  Thyself
                </span>
              </Link>
            </div>

            {/* Right side: store chip + search + more menu */}
            <div className="flex items-center gap-1.5">
              <Link
                href="/store"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all"
                style={{
                  background: "rgba(251,191,36,0.12)",
                  border: "1px solid rgba(251,191,36,0.28)",
                }}
              >
                <Coins className="w-3.5 h-3.5" style={{ color: "#fbbf24" }} />
                <span className="text-xs font-bold" style={{ color: "#fbbf24" }}>Store</span>
              </Link>
              <SearchComponent />
              <MoreMenu pathname={pathname} />
            </div>
          </div>
        </div>
      </nav>

      {/* ── Nav Wheel ─────────────────────────────────────────────────────── */}
      {!hideChrome && (
        <NavWheel
          pathname={pathname}
          storeUnlocked={storeUnlocked}
          storeNotifVisible={storeNotifVisible}
          storeLockToast={storeLockToast}
          onNavClick={handleNavClick}
          onStoreLockDismiss={() => setStoreLockToast(false)}
        />
      )}

    </>
  );
}
