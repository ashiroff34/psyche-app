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
  Menu,
  X,
  Home,
  UserCircle,
  ArrowLeftRight,
  BookOpen,
  Flame,
  Gamepad2,
  Clock,
  Coins,
  Cat,
  ChevronLeft,
  MoreHorizontal,
  Trophy,
  Zap,
  Moon,
  RotateCcw,
  Bug,
  Settings,
} from "lucide-react";
import OuroborosLogo from "@/components/OuroborosLogo";

// ── Bottom Tab Bar (5 main tabs — Duolingo-style) ──────────────────────────

const bottomTabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/daily", label: "Daily", icon: Flame },
  { href: "/avatar", label: "Pet", icon: Cat },
  { href: "/store", label: "Store", icon: Coins },
  { href: "/profile", label: "Profile", icon: UserCircle },
];

// ── "More" items (accessible from top bar) ─────────────────────────────────

const moreItems = [
  { href: "/lessons", label: "Lessons", icon: BookOpen },
  { href: "/game", label: "Progress & Badges", icon: Trophy },
  { href: "/enneagram", label: "Enneagram", icon: Compass },
  { href: "/cognitive", label: "Cognitive Functions", icon: Brain },
  { href: "/assessments", label: "Type Assessments", icon: Zap },
  { href: "/enneagram/learn", label: "Learn Enneagram", icon: BookOpen },
  { href: "/cognitive/learn", label: "Learn Cognitive", icon: Brain },
  { href: "/journal", label: "Inner Work", icon: Beaker },
  { href: "/compare", label: "Compare Types", icon: BookOpen },
  { href: "/correlations", label: "Correlations", icon: ArrowLeftRight },
  { href: "/history", label: "History & Origins", icon: Clock },
  { href: "/dashboard", label: "Dashboard", icon: Gamepad2 },
];

// ── More Menu (slide-up sheet on mobile, dropdown on desktop) ───────────────

function MoreMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [hasSeenExplore, setHasSeenExplore] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const seen = localStorage.getItem("psyche-explore-seen");
    if (!seen) setHasSeenExplore(false);
  }, []);

  const handleOpen = () => {
    setOpen(!open);
    if (!hasSeenExplore) {
      localStorage.setItem("psyche-explore-seen", "true");
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
        className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-500 hover:bg-slate-100 text-sm font-medium transition-all"
      >
        <Compass className="w-4 h-4" />
        <span className="hidden sm:inline">Explore</span>
        {!hasSeenExplore && (
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden z-50"
          >
            <div className="p-2 max-h-[60vh] overflow-y-auto">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">All Features</p>
              {moreItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                      isActive ? "bg-sky-50 text-sky-700 font-medium" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
              {/* Settings & utilities */}
              <div className="border-t border-slate-100 mt-1 pt-1">
                <Link
                  href="/settings"
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                    pathname === "/settings" ? "bg-sky-50 text-sky-700 font-medium" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
                <button
                  onClick={() => {
                    document.documentElement.classList.toggle("dark");
                    try {
                      const isDark = document.documentElement.classList.contains("dark");
                      localStorage.setItem("psyche-dark-mode", isDark ? "true" : "false");
                    } catch {}
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-all"
                >
                  <Moon className="w-4 h-4" />
                  Dark Mode
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
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-all"
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

  return null; // No overlay needed — listeners are on document
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

  // Show pulsing Store dot only when user has >= 50 tokens and hasn't visited yet
  useEffect(() => {
    try {
      const visited = localStorage.getItem("psyche-store-visited");
      if (visited) { setStoreNotifVisible(false); return; }
      const raw = localStorage.getItem("psyche-game-state");
      if (!raw) return;
      const gs = JSON.parse(raw);
      const tokens = (gs.tokens as number) ?? 0;
      setStoreNotifVisible(tokens >= 50);
    } catch {}
  }, [pathname]); // re-check whenever route changes (tokens may have just been awarded)

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

  const handleNavClick = (_e: React.MouseEvent, href: string) => {
    if (href === "/store") {
      try { localStorage.setItem("psyche-store-visited", "true"); } catch {}
      setStoreNotifVisible(false);
    }
  };

  const hideChrome = isOnboarding || isNewUser;

  if (isNewUser) return null; // Completely hide nav for brand-new users — fullscreen intro

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
                  className="flex items-center gap-1 px-2 py-1.5 -ml-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all active:scale-95"
                  aria-label="Go back"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="text-sm font-medium hidden sm:inline">Back</span>
                </button>
              )}
              <Link href="/" className="flex items-center gap-2 group">
                <img src={assetPath("/icon-192.png")} alt="Thyself" className="w-8 h-8 rounded-xl shadow-lg shadow-sky-200/50" />
                <span className="text-lg font-serif font-semibold text-slate-800 tracking-tight">
                  Thyself
                </span>
              </Link>
            </div>

            {/* Right side: more menu */}
            <div className="flex items-center gap-1.5">
              <MoreMenu pathname={pathname} />
            </div>
          </div>
        </div>
      </nav>

      {/* ── Bottom Tab Bar (Duolingo-style) ──────────────────────────────── */}
      {!hideChrome && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-100 safe-area-bottom">
          <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-1">
            {bottomTabs.map((tab) => {
              const isActive =
                tab.href === "/"
                  ? pathname === "/"
                  : pathname === tab.href || pathname.startsWith(tab.href);
              const Icon = tab.icon;
              const isStore = tab.href === "/store";

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  onClick={(e) => handleNavClick(e, tab.href)}
                  className={`relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl min-w-[56px] transition-all ${
                    isActive
                      ? "text-sky-600"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {/* Highlight dot for active tab */}
                  {isActive && (
                    <motion.div
                      layoutId="bottom-tab-indicator"
                      className="absolute -top-1 w-5 h-1 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <div className={`relative ${isStore ? "p-1 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100" : ""}`}>
                    <Icon className={`w-5 h-5 ${isStore && !isActive ? "text-amber-600" : ""}`} />
                    {/* Store gets a subtle glow — only when tokens ≥ 50 and never visited */}
                    {isStore && !isActive && storeNotifVisible && (
                      <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    )}
                  </div>
                  <span className={`text-[10px] font-medium ${isActive ? "text-sky-600" : ""}`}>
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

    </>
  );
}
