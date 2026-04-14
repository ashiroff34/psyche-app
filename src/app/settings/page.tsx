"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Compass,
  Brain,
  Bell,
  BellOff,
  Clock,
  Sun,
  Moon,
  Download,
  Upload,
  RotateCcw,
  RefreshCw,
  Trash2,
  FileText,
  Shield,
  Bug,
  BookOpen,
  Flag,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Check,
  AlertTriangle,
  Info,
  ArrowLeft,
} from "lucide-react";
import { useProfile, notifyProfileChanged } from "@/hooks/useProfile";
import { useSmartBack } from "@/hooks/useSmartBack";

// ── Collapsible Section ──────────────────────────────────────────────────────

function ExpandableSection({
  title,
  icon: Icon,
  defaultOpen = false,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/5"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(139,92,246,0.15)" }}>
            <Icon className="w-4 h-4 text-violet-400" />
          </div>
          <span className="font-semibold" style={{ color: "rgba(255,255,255,0.93)" }}>{title}</span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4" style={{ color: "rgba(255,255,255,0.35)" }} />
        ) : (
          <ChevronDown className="w-4 h-4" style={{ color: "rgba(255,255,255,0.35)" }} />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 space-y-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Toggle Switch ────────────────────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>{label}</p>
        {description && (
          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{description}</p>
        )}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
          checked ? "bg-violet-500" : "bg-white/10"
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

// ── Notification Preferences ─────────────────────────────────────────────────

interface NotificationPrefs {
  dailyReminders: boolean;
  reminderTime: "morning" | "afternoon" | "evening";
  weeklySummary: boolean;
  muteAll?: boolean;
}

const TIME_OPTIONS: { value: NotificationPrefs["reminderTime"]; label: string; desc: string }[] = [
  { value: "morning", label: "Morning", desc: "8:00 AM" },
  { value: "afternoon", label: "Afternoon", desc: "1:00 PM" },
  { value: "evening", label: "Evening", desc: "7:00 PM" },
];

function loadNotificationPrefs(): NotificationPrefs {
  try {
    const raw = localStorage.getItem("psyche-notification-prefs");
    if (raw) return JSON.parse(raw);
  } catch {}
  return { dailyReminders: false, reminderTime: "morning", weeklySummary: false };
}

function saveNotificationPrefs(prefs: NotificationPrefs) {
  try {
    localStorage.setItem("psyche-notification-prefs", JSON.stringify(prefs));
  } catch {}
}

// ── Flagged Questions Section ────────────────────────────────────────────────

function FlaggedQuestionsSection() {
  const [count, setCount] = useState(0);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("psyche-flagged-questions");
      if (raw) {
        const parsed = JSON.parse(raw) as string[];
        setCount(parsed.length);
      }
    } catch {}
  }, []);

  const handleClear = () => {
    try {
      localStorage.removeItem("psyche-flagged-questions");
      setCount(0);
      setCleared(true);
      setTimeout(() => setCleared(false), 2000);
    } catch {}
  };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
      <div className="px-5 py-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(239,68,68,0.12)" }}>
            <Flag className="w-4 h-4 text-red-400" />
          </div>
          <span className="font-semibold" style={{ color: "rgba(255,255,255,0.93)" }}>Flagged Questions</span>
          {count > 0 && (
            <span className="ml-auto text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: "rgba(239,68,68,0.15)", color: "#f87171" }}>
              {count} flagged
            </span>
          )}
        </div>
        {count === 0 ? (
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
            {cleared ? "Cleared!" : "No flagged questions. Tap 🚩 on any quiz question to flag it for review."}
          </p>
        ) : (
          <div className="space-y-2">
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              You have flagged {count} question{count !== 1 ? "s" : ""} for review.
            </p>
            <button
              onClick={handleClear}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors"
              style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}
            >
              <Flag className="w-3.5 h-3.5" />
              Clear all flagged questions
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Confirmation Dialog ──────────────────────────────────────────────────────

function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  danger,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="rounded-2xl shadow-xl max-w-sm w-full p-6 space-y-4"
            style={{ background: "#1a1030", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  danger
                    ? "bg-red-500/10 text-red-400"
                    : "bg-amber-500/10 text-amber-400"
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-semibold" style={{ color: "rgba(255,255,255,0.93)" }}>{title}</h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{message}</p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                style={{ color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.08)" }}
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-colors ${
                  danger
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-amber-500 hover:bg-amber-600"
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Toast ────────────────────────────────────────────────────────────────────

function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 left-4 right-4 z-[60] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl"
          style={{ background: "#1a1030", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.93)" }}
        >
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <p className="text-sm">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Main Settings Page ───────────────────────────────────────────────────────

export default function SettingsPage() {
  const router = useRouter();
  const goBack = useSmartBack("/daily");
  const { profile, loaded, updateProfile } = useProfile();

  // Form state
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameEdited, setNameEdited] = useState(false);
  const [emailEdited, setEmailEdited] = useState(false);
  const [showManualTypePicker, setShowManualTypePicker] = useState(false);

  // Notification prefs
  const [notifPrefs, setNotifPrefs] = useState<NotificationPrefs>({
    dailyReminders: false,
    reminderTime: "morning",
    weeklySummary: false,
  });

  // Native push notification permission
  const [notifPermission, setNotifPermission] = useState<NotificationPermission | "unsupported">("default");
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setNotifPermission(Notification.permission);
    } else {
      setNotifPermission("unsupported");
    }
  }, []);

  const registerServiceWorker = async () => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    try {
      const reg = await navigator.serviceWorker.register("/sw-notifications.js", { scope: "/" });
      // Request periodic sync if supported
      if ("periodicSync" in reg) {
        try {
          // @ts-expect-error periodicSync is not in all TS lib versions yet
          await reg.periodicSync.register("daily-reminder", { minInterval: 60 * 60 * 1000 });
        } catch {
          // periodicSync permission denied or unavailable. silent fallback
        }
      }
    } catch {
      // SW registration failed (dev environment, http, etc.). silent fallback
    }
  };

  const requestNotificationPermission = async () => {
    if (notifPermission === "unsupported" || notifPermission === "denied") return;
    try {
      const result = await Notification.requestPermission();
      setNotifPermission(result);
      if (result === "granted") {
        // Register SW for background reminders
        await registerServiceWorker();
        // Save preference
        try {
          localStorage.setItem("psyche-notif-enabled", "true");
        } catch {}
        // Confirmation notification
        new Notification("Thyself", {
          body: "Daily reminders are on! We'll nudge you so you never lose your streak.",
          icon: "/icons/icon-192x192.png",
        });
      }
    } catch {}
  };

  // Dark mode
  const [isDark, setIsDark] = useState(false);

  // Dialogs
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showClearCacheDialog, setShowClearCacheDialog] = useState(false);

  // Import file input ref
  const importInputRef = useRef<HTMLInputElement>(null);

  // Toast
  const [toast, setToast] = useState("");
  const toastTimerRef = useRef<NodeJS.Timeout>(undefined);
  const showToast = useCallback((msg: string) => {
    clearTimeout(toastTimerRef.current);
    setToast(msg);
    toastTimerRef.current = setTimeout(() => setToast(""), 2500);
  }, []);

  // Load initial state
  useEffect(() => {
    if (!loaded) return;
    setDisplayName(profile.displayName || "");
    setEmail(profile.email || "");
    setNotifPrefs(loadNotificationPrefs());
    try {
      setIsDark(document.documentElement.classList.contains("dark"));
    } catch {}
  }, [loaded, profile.displayName, profile.email]);

  // ── Profile Handlers ─────────────────────────────────────────────────────

  const saveName = () => {
    updateProfile({ displayName: displayName.trim() });
    setNameEdited(false);
    showToast("Display name updated");
  };

  const saveEmail = () => {
    const trimmed = email.trim();
    if (trimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    updateProfile({ email: trimmed });
    setEmailEdited(false);
    showToast("Email updated");
  };

  // ── Notification Handlers ────────────────────────────────────────────────

  const updateNotifPrefs = (updates: Partial<NotificationPrefs>) => {
    const updated = { ...notifPrefs, ...updates };
    setNotifPrefs(updated);
    saveNotificationPrefs(updated);

    // Preferences saved locally, push notifications handled natively by Capacitor
    if ("dailyReminders" in updates) {
      showToast(updates.dailyReminders ? "Reminders enabled ✓" : "Reminders turned off");
    }

    // Schedule/cancel Capacitor local notifications on native builds
    // (no-ops on web; web is handled by service worker above)
    (async () => {
      try {
        const { scheduleDailyReminder, cancelDailyReminder, hourForTimePreset } = await import("@/lib/capacitor-notifications");
        if (updated.dailyReminders) {
          await scheduleDailyReminder({
            hour: hourForTimePreset(updated.reminderTime),
            minute: 0,
            title: "Thyself",
            body: "Your daily check-in is ready. 60 seconds of noticing.",
          });
        } else {
          await cancelDailyReminder();
        }
      } catch {}
    })();
  };

  // ── Dark Mode ────────────────────────────────────────────────────────────

  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    try {
      localStorage.setItem("psyche-dark-mode", newDark ? "true" : "false");
    } catch {}
  };

  // ── Export Data ──────────────────────────────────────────────────────────

  const exportData = () => {
    try {
      const data: Record<string, unknown> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("psyche-")) {
          try {
            try { const v = localStorage.getItem(key); if (v) data[key] = JSON.parse(v); } catch {}
          } catch {
            data[key] = localStorage.getItem(key);
          }
        }
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `thyself-data-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("Data exported successfully");
    } catch {
      showToast("Failed to export data");
    }
  };

  // ── Import Data ──────────────────────────────────────────────────────────

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const raw = ev.target?.result as string;
        const data = JSON.parse(raw);
        let count = 0;
        Object.entries(data).forEach(([key, value]) => {
          if (key.startsWith("psyche-")) {
            try {
              localStorage.setItem(
                key,
                typeof value === "string" ? value : JSON.stringify(value)
              );
              count++;
            } catch {}
          }
        });
        showToast(`Imported ${count} item${count !== 1 ? "s" : ""} — reloading…`);
        setTimeout(() => window.location.reload(), 1800);
      } catch {
        showToast("Import failed — invalid or corrupted file");
      }
    };
    reader.readAsText(file);
    // reset so same file can be chosen again
    e.target.value = "";
  };

  // ── Clear Cache ──────────────────────────────────────────────────────────

  const clearCache = async () => {
    try {
      // Clear service worker / browser caches
      if ("caches" in window) {
        const names = await caches.keys();
        await Promise.all(names.map((n) => caches.delete(n)));
      }
      // Remove transient psyche- keys but preserve core data
      const preserveKeys = new Set([
        "psyche-profile",
        "psyche-lesson-progress",
        "psyche-game-state",
        "psyche-notif-enabled",
        "psyche-notif-prefs",
        "psyche-dark-mode",
        "psyche-beta-access",
        "psyche-enneagram-growth-unlocked",
        "psyche-onboarding-complete",
        "psyche-type-votes",
      ]);
      const toRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("psyche-") && !preserveKeys.has(key)) {
          toRemove.push(key);
        }
      }
      toRemove.forEach((k) => { try { localStorage.removeItem(k); } catch {} });
      showToast("Cache cleared ✓");
    } catch {
      showToast("Cache cleared ✓");
    }
    setShowClearCacheDialog(false);
  };

  // ── Reset Progress ───────────────────────────────────────────────────────

  const resetProgress = () => {
    try {
      const keysToRemove = [
        "psyche-game-state",
        "psyche-tutorial-complete",
        "psyche-daily-streak",
      ];
      keysToRemove.forEach((k) => {
        try {
          localStorage.removeItem(k);
        } catch {}
      });
      // Reset XP and badges in profile but keep type info
      updateProfile({
        xp: 0,
        badges: [],
        streakCount: 0,
        completedQuizzes: [],
        journalEntries: 0,
      });
      showToast("Progress has been reset");
    } catch {}
    setShowResetDialog(false);
  };

  // ── Delete All Data ──────────────────────────────────────────────────────

  const deleteAllData = () => {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("psyche-")) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => {
        try {
          localStorage.removeItem(k);
        } catch {}
      });
      router.push("/");
    } catch {}
    setShowDeleteDialog(false);
  };

  // ── Bug Report ───────────────────────────────────────────────────────────

  const openBugReport = () => {
    const to = "support@thyself.app";
    const subject = encodeURIComponent("Thyself Bug Report");
    const userEmail = profile.email ? `\nYour email: ${profile.email}\n` : "\nYour email (optional): \n";
    const body = encodeURIComponent(
      `Describe the bug:\n\nSteps to reproduce:\n\nExpected behavior:\n\nDevice/Browser:\n${userEmail}`
    );
    window.open(`mailto:${to}?subject=${subject}&body=${body}`, "_self");
  };

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-800 border-t-violet-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-32 px-4" style={{ background: "#0f0a1e" }}>
      <div className="max-w-lg mx-auto space-y-4">
        {/* Back button */}
        <button
          onClick={goBack}
          className="flex items-center gap-1 text-sm mb-4 transition-colors"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.93)" }}>
            Settings
          </h1>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
            Customize your Thyself experience
          </p>
        </div>

        {/* ── Section 1: Profile ──────────────────────────────────────────── */}
        <ExpandableSection title="Profile" icon={User} defaultOpen>
          {/* Display Name */}
          <div>
            <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>
              Display Name
            </label>
            <div className="flex gap-2 mt-1.5">
              <input
                type="text"
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                  setNameEdited(true);
                }}
                placeholder="Your name"
                className="flex-1 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}
              />
              {nameEdited && (
                <button
                  onClick={saveName}
                  className="px-3 py-2 rounded-xl text-white text-sm font-medium transition-all hover:-translate-y-0.5 active:scale-95" style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 4px 14px rgba(124,58,237,0.4)" }}
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>
              Email
            </label>
            <div className="flex gap-2 mt-1.5">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailEdited(true);
                  setEmailError("");
                }}
                placeholder="your@email.com"
                className={`flex-1 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                  emailError
                    ? "focus:ring-red-500/40"
                    : "focus:ring-violet-500/40"
                }`}
                style={{ background: "rgba(255,255,255,0.06)", border: emailError ? "1px solid rgba(239,68,68,0.4)" : "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}
              />
              {emailEdited && (
                <button
                  onClick={saveEmail}
                  className="px-3 py-2 rounded-xl text-white text-sm font-medium transition-all hover:-translate-y-0.5 active:scale-95" style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 4px 14px rgba(124,58,237,0.4)" }}
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
            {emailError && (
              <p className="text-xs text-red-500 mt-1">{emailError}</p>
            )}
          </div>

          {/* Current Types (read-only) */}
          <div className="space-y-2 pt-2">
            <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>
              Your Types
            </p>
            <div className="flex items-center justify-between py-2 px-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-violet-400" />
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {profile.enneagramType
                    ? `Enneagram Type ${profile.enneagramType}${profile.enneagramWing ? ` (${profile.enneagramWing})` : ""}`
                    : "Not yet determined"}
                </span>
              </div>
              <Link
                href="/enneagram/assess"
                className="text-xs font-medium text-violet-400 hover:text-violet-300"
              >
                {profile.enneagramType ? "Change" : "Take Assessment"}
              </Link>
            </div>
            {/* Manual type override */}
            <div>
              <button
                onClick={() => setShowManualTypePicker(v => !v)}
                className="text-xs mt-1 px-2 py-1 rounded-lg transition-colors"
                style={{ color: "rgba(255,255,255,0.35)", background: "transparent" }}
              >
                {showManualTypePicker ? "▲ Hide" : "▾ Change type manually"}
              </button>
              <AnimatePresence>
                {showManualTypePicker && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 pb-1">
                      <p className="text-[11px] mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                        Advanced: manually set your Enneagram type. Retaking the assessment is the recommended way.
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {[1,2,3,4,5,6,7,8,9].map(t => (
                          <button
                            key={t}
                            onClick={() => {
                              updateProfile({ enneagramType: t });
                              notifyProfileChanged();
                              setShowManualTypePicker(false);
                            }}
                            className="py-2 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
                            style={{
                              background: profile.enneagramType === t ? "rgba(139,92,246,0.3)" : "rgba(139,92,246,0.1)",
                              border: `1px solid ${profile.enneagramType === t ? "rgba(139,92,246,0.6)" : "rgba(139,92,246,0.2)"}`,
                              color: profile.enneagramType === t ? "#c4b5fd" : "#a78bfa",
                            }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Instinctual subtype (sp/sx/so) — drives subtype-aware content */}
            <div className="flex items-center justify-between py-2 px-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-violet-400" />
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {profile.enneagramSubtype
                    ? `Instinct: ${profile.enneagramSubtype.toUpperCase()}`
                    : profile.instinctualStacking
                      ? `Stacking: ${profile.instinctualStacking.toUpperCase()}`
                      : "Instinct not set"}
                </span>
              </div>
              <Link
                href="/assessments/instinctual"
                className="text-xs font-medium text-violet-400 hover:text-violet-300"
              >
                {profile.enneagramSubtype || profile.instinctualStacking ? "Change" : "Assess"}
              </Link>
            </div>
            {/* Quick manual subtype picker */}
            <div className="grid grid-cols-3 gap-2">
              {(["sp","sx","so"] as const).map(code => {
                const active = profile.enneagramSubtype === code;
                const label = code === "sp" ? "Self-Pres" : code === "sx" ? "Sexual" : "Social";
                return (
                  <button
                    key={code}
                    onClick={() => { updateProfile({ enneagramSubtype: code }); notifyProfileChanged(); }}
                    className="py-2 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      background: active ? "rgba(139,92,246,0.3)" : "rgba(139,92,246,0.08)",
                      border: `1px solid ${active ? "rgba(139,92,246,0.6)" : "rgba(139,92,246,0.18)"}`,
                      color: active ? "#c4b5fd" : "#a78bfa",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-violet-400" />
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {profile.cognitiveType
                    ? `Cognitive Type: ${profile.cognitiveType}`
                    : "Not yet determined"}
                </span>
              </div>
              <Link
                href="/cognitive/assess"
                className="text-xs font-medium text-violet-400 hover:text-violet-300"
              >
                {profile.cognitiveType ? "Change" : "Take Assessment"}
              </Link>
            </div>
          </div>
        </ExpandableSection>

        {/* ── Section 2: Notifications ────────────────────────────────────── */}
        <ExpandableSection title="Notifications" icon={Bell}>
          <Toggle
            checked={!notifPrefs.muteAll}
            onChange={(val) => updateNotifPrefs({ muteAll: !val })}
            label="In-app alerts"
            description="Streak warnings, pet alerts, and daily nudges. Turn off to silence all banners."
          />

          <Toggle
            checked={notifPrefs.dailyReminders}
            onChange={(val) => updateNotifPrefs({ dailyReminders: val })}
            label="Daily practice reminders"
            description="Get a gentle nudge to keep your practice going"
          />

          {/* Time picker (visible when reminders are on) */}
          <AnimatePresence>
            {notifPrefs.dailyReminders && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex gap-2 pt-1">
                  {TIME_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        updateNotifPrefs({ reminderTime: opt.value })
                      }
                      className={`flex-1 flex flex-col items-center gap-0.5 px-3 py-2.5 rounded-xl text-sm transition-all ${
                        notifPrefs.reminderTime === opt.value
                          ? "font-medium"
                          : "hover:bg-white/5"
                      }`}
                      style={notifPrefs.reminderTime === opt.value
                        ? { background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.35)", color: "#a78bfa" }
                        : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.5)" }}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium">{opt.label}</span>
                      <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {opt.desc}
                      </span>
                    </button>
                  ))}
                </div>
                {!email && !profile.email && (
                  <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    Add your email above to receive reminders
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <Toggle
            checked={notifPrefs.weeklySummary}
            onChange={(val) => updateNotifPrefs({ weeklySummary: val })}
            label="Weekly reflection email"
            description="A Sunday digest of what you noticed this week, sent to your email."
          />
          {notifPrefs.weeklySummary && !email && !profile.email && (
            <div className="pl-4 pt-1">
              <p className="text-[11px] flex items-center gap-1" style={{ color: "#fbbf24" }}>
                <Info className="w-3 h-3 flex-shrink-0" />
                Add your email above to receive the weekly digest
              </p>
            </div>
          )}
          {notifPrefs.weeklySummary && (email || profile.email) && (
            <div className="pl-4 pt-1">
              <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                We&apos;ll send the first digest on the next Sunday. You can unsubscribe anytime from any email.
              </p>
            </div>
          )}

          {/* Native push notification enable */}
          <div className="pt-1">
            {notifPermission === "unsupported" && (
              <p className="text-xs flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                <Info className="w-3 h-3 flex-shrink-0" />
                Browser notifications not supported on this device.
              </p>
            )}
            {notifPermission === "granted" && (
              <p className="text-xs flex items-center gap-1.5 text-emerald-400/80">
                <Check className="w-3 h-3 flex-shrink-0" />
                Device notifications enabled. we&apos;ll remind you daily.
              </p>
            )}
            {notifPermission === "denied" && (
              <p className="text-xs flex items-center gap-1.5 text-amber-400/80">
                <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                Notifications blocked. Enable them in your browser settings.
              </p>
            )}
            {notifPermission === "default" && (
              <button
                onClick={requestNotificationPermission}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all active:scale-98"
                style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.35)", color: "#c4b5fd" }}
              >
                <Bell className="w-4 h-4" />
                Enable daily reminders on this device
              </button>
            )}
          </div>
        </ExpandableSection>

        {/* ── Section 3: App Preferences ──────────────────────────────────── */}
        <ExpandableSection title="App Preferences" icon={Sun}>
          {/* Dark Mode */}
          <Toggle
            checked={isDark}
            onChange={toggleDarkMode}
            label="Dark mode"
            description="Switch between light and dark themes"
          />

          {/* Export Data */}
          <button
            onClick={exportData}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}
          >
            <Download className="w-4 h-4" style={{ color: "rgba(255,255,255,0.35)" }} />
            Export My Data
          </button>

          {/* Import Data */}
          <button
            onClick={() => importInputRef.current?.click()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}
          >
            <Upload className="w-4 h-4" style={{ color: "rgba(255,255,255,0.35)" }} />
            Import Data
          </button>
          <input
            ref={importInputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={importData}
          />

          {/* Clear Cache */}
          <button
            onClick={() => setShowClearCacheDialog(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}
          >
            <RefreshCw className="w-4 h-4" style={{ color: "rgba(255,255,255,0.35)" }} />
            Clear Cache
          </button>

          {/* Reset Progress */}
          <button
            onClick={() => setShowResetDialog(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-sm text-amber-700 font-medium transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-amber-500" />
            Reset Progress
          </button>
        </ExpandableSection>

        {/* ── Section 4: Flagged Questions ─────────────────────────────── */}
        <FlaggedQuestionsSection />

        {/* ── Section 5: Account ──────────────────────────────────────────── */}
        <ExpandableSection title="Account" icon={Shield}>
          {/* Delete All Data */}
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 hover:bg-red-100 text-sm text-red-600 font-medium transition-colors border border-red-100"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
            Delete All Data
          </button>

          {/* Links */}
          <div className="space-y-1 pt-1">
            <Link
              href="/glossary"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors hover:bg-white/5"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              <BookOpen className="w-4 h-4" style={{ color: "rgba(255,255,255,0.35)" }} />
              Glossary &amp; Definitions
              <ExternalLink className="w-3 h-3 ml-auto" style={{ color: "rgba(255,255,255,0.2)" }} />
            </Link>
            <Link
              href="/sources"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors hover:bg-white/5"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              <FileText className="w-4 h-4" style={{ color: "rgba(255,255,255,0.35)" }} />
              Sources &amp; References
              <ExternalLink className="w-3 h-3 ml-auto" style={{ color: "rgba(255,255,255,0.2)" }} />
            </Link>
          </div>

          {/* Bug Report */}
          <button
            onClick={openBugReport}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}
          >
            <Bug className="w-4 h-4" style={{ color: "rgba(255,255,255,0.35)" }} />
            Report a Bug
          </button>

          {/* App Version */}
          <div className="text-center pt-2">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Thyself v1.0.0</p>

            {/* Beta access code */}
            <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Beta access</p>
              <div className="flex gap-2">
                <input
                  placeholder="Enter beta code"
                  maxLength={20}
                  className="flex-1 text-xs px-3 py-2 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const input = e.currentTarget;
                      const code = input.value.trim().toUpperCase();
                      if (code === "THYSELF-BETA" || code === "THYSELF_BETA" || code === "THYSELFBETA") {
                        try {
                          localStorage.setItem("psyche-beta-access", "true");
                          // Grant unlimited tokens + unlock everything
                          const gs = JSON.parse(localStorage.getItem("psyche-game-state") || "{}");
                          gs.tokens = 99999;
                          gs.totalTokensEarned = 99999;
                          gs.hearts = 999;
                          gs.maxHearts = 999;
                          gs.streakFreezes = 99;
                          localStorage.setItem("psyche-game-state", JSON.stringify(gs));
                          // Unlock growth path
                          localStorage.setItem("psyche-enneagram-growth-unlocked", "true");
                          // Mark as Pro
                          input.value = "";
                          alert("Beta access activated. All features unlocked. Unlimited hearts and tokens.");
                          window.location.reload();
                        } catch {}
                      } else {
                        input.value = "";
                        input.placeholder = "Invalid code";
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </ExpandableSection>
      </div>

      {/* ── Dialogs ───────────────────────────────────────────────────────── */}
      <ConfirmDialog
        open={showClearCacheDialog}
        title="Clear Cache"
        message="This will clear temporary app data and browser caches. Your profile, progress, and saved types will not be affected."
        confirmLabel="Clear Cache"
        onConfirm={clearCache}
        onCancel={() => setShowClearCacheDialog(false)}
      />

      <ConfirmDialog
        open={showResetDialog}
        title="Reset Progress"
        message="This will clear your XP, badges, streak, and completed quizzes. Your personality type results will be preserved."
        confirmLabel="Reset"
        onConfirm={resetProgress}
        onCancel={() => setShowResetDialog(false)}
      />

      <ConfirmDialog
        open={showDeleteDialog}
        title="Delete All Data"
        message="Are you sure? This cannot be undone. All your Thyself data including personality types, progress, and preferences will be permanently deleted."
        confirmLabel="Delete Everything"
        danger
        onConfirm={deleteAllData}
        onCancel={() => setShowDeleteDialog(false)}
      />

      {/* Toast */}
      <Toast message={toast} visible={!!toast} />
    </div>
  );
}
