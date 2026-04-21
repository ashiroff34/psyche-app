"use client";

import { useState, useRef, useEffect } from "react";
import { MS_PER_DAY } from "@/lib/date-utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { assetPath } from "@/lib/assetPath";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Compass,
  UserCircle,
  Flame,
  Coins,
  ChevronLeft,
  Bug,
  Settings,
  BookOpen,
  Target,
  Sprout,
  MoreHorizontal,
  Heart,
  MessageCircle,
  ShoppingBag,
  Layers,
  TrendingUp,
  Users,
  Star,
  Video,
  UserPlus,
} from "lucide-react";
import OuroborosLogo from "@/components/OuroborosLogo";
import SearchComponent from "@/components/Search";

// ── Bottom Tab Bar (5 main tabs, Duolingo-style) ──────────────────────────


// ── Nav Wheel spokes ──────────────────────────────────────────────────────────
// 6 destinations arranged in a fan above the center button.
// Labels match the BRIEFING redesign: Know / Learn / Practice / Explore / Grow / You

const WHEEL_SPOKES = [
  { href: "/assessments", label: "Know",     icon: Target,      color: "#8b5cf6" },
  { href: "/daily",       label: "Practice", icon: Flame,       color: "#d946ef" },
  { href: "/mirrors",     label: "Mirrors",  icon: Layers,      color: "#a855f7" },
  { href: "/store",       label: "Store",    icon: ShoppingBag, color: "#fbbf24" },
  { href: "/profile",     label: "You",      icon: UserCircle,  color: "#a78bfa" },
] as const;


// ── Persistent bottom tab bar. 1-tap navigation, always highlighted ──────────
function BottomTabBar({
  pathname,
  onNavClick,
  tokenCount,
}: {
  pathname: string;
  onNavClick: (e: React.MouseEvent, href: string) => void;
  tokenCount: number;
}) {
  const router = useRouter();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "rgba(8,4,18,0.98)",
        backdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(139,92,246,0.22)",
        paddingBottom: "max(env(safe-area-inset-bottom, 0px), 8px)",
      }}
    >
      <div className="flex items-center justify-around max-w-md mx-auto px-2 py-1.5">
        {WHEEL_SPOKES.map((spoke) => {
          const Icon = spoke.icon;
          // Root "/" and "/dashboard" map to Know; /enneagram routes also map to Know (merged)
          const effectivePath = (pathname === "/" || pathname === "/dashboard" || pathname.startsWith("/enneagram"))
            ? "/assessments"
            : pathname;
          const isActive =
            effectivePath === spoke.href ||
            effectivePath.startsWith(spoke.href + "/") ||
            (spoke.href.length > 1 && effectivePath.startsWith(spoke.href));
          const isPractice = spoke.href === "/daily";

          return (
            <motion.button
              key={spoke.href}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                onNavClick(e as unknown as React.MouseEvent, spoke.href);
                if (!e.defaultPrevented) router.push(spoke.href);
              }}
              className="relative flex flex-col items-center gap-1 flex-1 py-2"
              style={{ minWidth: 56 }}
            >
              {/* Active indicator pill */}
              {isActive && (
                <motion.div
                  layoutId="tab-active-pill"
                  className="absolute inset-x-1 inset-y-0 rounded-2xl"
                  style={{
                    background: `${spoke.color}20`,
                    border: `1px solid ${spoke.color}40`,
                    boxShadow: `0 0 16px ${spoke.color}30`,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}

              {/* Icon */}
              <div
                className={`relative z-10 flex items-center justify-center rounded-xl transition-all ${isPractice ? "w-12 h-12" : "w-10 h-10"}`}
                style={{
                  background: isActive && isPractice ? `${spoke.color}30` : "transparent",
                  boxShadow: isActive && isPractice ? `0 0 20px ${spoke.color}50` : "none",
                }}
              >
                <Icon
                  style={{
                    color: isActive ? spoke.color : "rgba(255,255,255,0.35)",
                    filter: isActive ? `drop-shadow(0 0 8px ${spoke.color}90)` : "none",
                    width: isPractice ? "1.5rem" : "1.25rem",
                    height: isPractice ? "1.5rem" : "1.25rem",
                  }}
                />
                {/* Token count badge on Store tab */}
                {spoke.href === "/store" && tokenCount >= 50 && !isActive && (
                  <span
                    className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full text-[9px] font-black flex items-center justify-center animate-pulse"
                    style={{ background: "#fbbf24", color: "#000", lineHeight: 1 }}
                  >
                    {tokenCount >= 1000 ? `${Math.floor(tokenCount / 1000)}k` : tokenCount}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className="text-[10px] font-bold relative z-10 tracking-wide transition-all"
                style={{
                  color: isActive ? spoke.color : "rgba(255,255,255,0.3)",
                  textShadow: isActive ? `0 0 8px ${spoke.color}60` : "none",
                }}
              >
                {spoke.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ── "More" items. grouped into 3 sections ─────────────────────────────────
// Items are gated by account age (progressive disclosure):
//   Day 0-6:  Core only (Curriculum Map, Progress, Assessments, Enneagram, Cognitive)
//   Day 7+:   + Inner Work, Compare Types, Correlations
//   Day 14+:  + History & Origins

type MoreItem = { href: string; label: string; icon: React.ElementType; unlocksDay?: number };
type MoreGroup = { label: string; items: MoreItem[] };

const ALL_MORE_GROUPS: MoreGroup[] = [
  {
    label: "Mirrors",
    items: [
      { href: "/mirrors", label: "Three Mirrors", icon: Layers },
      { href: "/drift", label: "Drift Graph", icon: TrendingUp },
      { href: "/selves", label: "Selves (Work/Home/Love)", icon: Users },
      { href: "/relational", label: "Relational You", icon: Heart },
      { href: "/rarity", label: "Your Rarity", icon: Star },
    ],
  },
  {
    label: "Share",
    items: [
      { href: "/tiktok", label: "TikTok Studio", icon: Video },
      { href: "/pair", label: "Pair Challenge", icon: UserPlus },
    ],
  },
  {
    label: "Pro",
    items: [
      { href: "/pricing", label: "Pricing", icon: Star },
      { href: "/mastery", label: "Mastery Map", icon: TrendingUp },
      { href: "/data-usage", label: "Your Data", icon: Layers },
    ],
  },
  {
    label: "Explore",
    items: [
      { href: "/compatibility", label: "Compare Types", icon: Heart },
      { href: "/confessions", label: "Type Confessions", icon: MessageCircle },
      { href: "/arcs", label: "Growth Arcs", icon: Flame },
    ],
  },
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
  // null = not yet loaded; treat as "show all" until we know the account age
  const [daysSinceCreated, setDaysSinceCreated] = useState<number | null>(null);
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
          const days = Math.floor((Date.now() - created) / MS_PER_DAY);
          setDaysSinceCreated(days);
        }
      }
    } catch {}
  }, []);

  // Filter groups by account age. items without unlocksDay are always shown
  const moreGroups = ALL_MORE_GROUPS.map(group => ({
    ...group,
    // null means account age not yet loaded — show all items (safe default)
    items: group.items.filter(item => !item.unlocksDay || daysSinceCreated === null || daysSinceCreated >= item.unlocksDay),
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
        <MoreHorizontal className="w-4 h-4" />
        <span className="hidden sm:inline">More</span>
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
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const blockedRef = useRef(false);

  const tabOrder = ["/assessments", "/daily", "/mirrors", "/store", "/profile"];

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      // Respect opt-out on any ancestor of the touch target. Any scrollable
      // horizontal carousel, draggable card, modal, or overlay can mark its
      // container with data-no-swipe-nav to disable tab swipe for that region.
      const target = e.target as Element | null;
      blockedRef.current = !!target?.closest?.("[data-no-swipe-nav]");
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (blockedRef.current) return;
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
  const pathnameRaw = usePathname();
  const pathname = pathnameRaw ?? "/"; // usePathname is never null in App Router but TS types say otherwise
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
  const [storeUnlocked, setStoreUnlocked] = useState(false);
  const [storeLockToast, setStoreLockToast] = useState(false);
  const [tokenCount, setTokenCount] = useState(0);
  const isGoingBackRef = useRef(false);

  useEffect(() => {
    function readTokens() {
      try {
        const raw = localStorage.getItem("psyche-game-state");
        if (!raw) return;
        const gs = JSON.parse(raw);
        const tokens = (gs.tokens as number) ?? 0;
        setTokenCount(tokens);
        let days = Infinity; // unknown age → always show store
        if (gs.accountCreated) {
          days = Math.floor((Date.now() - new Date(gs.accountCreated).getTime()) / MS_PER_DAY);
        }
        setStoreUnlocked(tokens > 0 || days >= 2);
      } catch {}
    }
    readTokens();
    // Re-read whenever game state changes (e.g. after earning tokens)
    const handler = () => readTokens();
    window.addEventListener("psyche-game-state-change", handler);
    window.addEventListener("psyche-profile-change", handler); // also refresh on profile change for safety
    return () => {
      window.removeEventListener("psyche-game-state-change", handler);
      window.removeEventListener("psyche-profile-change", handler);
    };
  }, [pathname]);

  // Store page history in localStorage so back button always works
  useEffect(() => {
    // Skip pushing onto history when this navigation was triggered by goBack()
    if (isGoingBackRef.current) {
      isGoingBackRef.current = false;
      return;
    }
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
        isGoingBackRef.current = true; // prevent history effect from re-adding this destination
        router.push(prev);
        setHasPrevPage(history.length > 1);
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
    }
  };

  const hideChrome = isOnboarding || isNewUser;

  if (isNewUser) return null; // Completely hide nav for brand-new users, fullscreen intro

  return (
    <>
      {/* ── Swipe detection for tab navigation ─────────────────────────── */}
      {!hideChrome && <SwipeNavigator />}

      {/* ── Top Bar (minimal. logo, back, level, more) ───────────────────── */}
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
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all active:scale-95"
                style={{
                  background: tokenCount >= 50 ? "rgba(251,191,36,0.18)" : "rgba(251,191,36,0.09)",
                  border: tokenCount >= 50 ? "1px solid rgba(251,191,36,0.45)" : "1px solid rgba(251,191,36,0.22)",
                  boxShadow: tokenCount >= 100 ? "0 0 14px rgba(251,191,36,0.25)" : "none",
                }}
              >
                <Coins className="w-3.5 h-3.5" style={{ color: "#fbbf24" }} />
                <span className="text-xs font-bold tabular-nums" style={{ color: "#fbbf24" }}>
                  {tokenCount > 0 ? tokenCount.toLocaleString() : "Shop"}
                </span>
                {/* Pulsing badge when enough to spend */}
                {tokenCount >= 50 && (
                  <span
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-pulse"
                    style={{ background: "#fbbf24", boxShadow: "0 0 6px rgba(251,191,36,0.8)" }}
                  />
                )}
              </Link>
              <SearchComponent />
              <MoreMenu pathname={pathname} />
            </div>
          </div>
        </div>
      </nav>

      {/* ── Bottom Tab Bar. persistent, 1-tap navigation ─────────────── */}
      {!hideChrome && (
        <BottomTabBar
          pathname={pathname}
          onNavClick={handleNavClick}
          tokenCount={tokenCount}
        />
      )}

    </>
  );
}
