"use client";

import { useState, useEffect, useCallback } from "react";
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
  RotateCcw,
  Trash2,
  FileText,
  Shield,
  Bug,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Check,
  AlertTriangle,
  Info,
} from "lucide-react";
import { useProfile } from "@/hooks/useProfile";

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
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-50 to-indigo-50 flex items-center justify-center">
            <Icon className="w-4 h-4 text-sky-600" />
          </div>
          <span className="font-semibold text-slate-800">{title}</span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
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
        <p className="text-sm font-medium text-slate-700">{label}</p>
        {description && (
          <p className="text-xs text-slate-400 mt-0.5">{description}</p>
        )}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
          checked ? "bg-sky-500" : "bg-slate-200"
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
            className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  danger
                    ? "bg-red-50 text-red-500"
                    : "bg-amber-50 text-amber-500"
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-800">{title}</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{message}</p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
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
          className="fixed bottom-24 left-4 right-4 z-[60] flex items-center gap-3 px-5 py-4 bg-slate-900 text-white rounded-2xl shadow-xl"
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
  const { profile, loaded, updateProfile } = useProfile();

  // Form state
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameEdited, setNameEdited] = useState(false);
  const [emailEdited, setEmailEdited] = useState(false);

  // Notification prefs
  const [notifPrefs, setNotifPrefs] = useState<NotificationPrefs>({
    dailyReminders: false,
    reminderTime: "morning",
    weeklySummary: false,
  });

  // Dark mode
  const [isDark, setIsDark] = useState(false);

  // Dialogs
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Toast
  const [toast, setToast] = useState("");
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
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

    // Preferences saved locally — push notifications handled natively by Capacitor
    if ("dailyReminders" in updates) {
      showToast(updates.dailyReminders ? "Reminders enabled ✓" : "Reminders turned off");
    }
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
            data[key] = JSON.parse(localStorage.getItem(key) || "");
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
        <div className="w-8 h-8 border-2 border-sky-200 border-t-sky-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20 pb-32 px-4">
      <div className="max-w-lg mx-auto space-y-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-serif font-bold text-slate-800">
            Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Customize your Thyself experience
          </p>
        </div>

        {/* ── Section 1: Profile ──────────────────────────────────────────── */}
        <ExpandableSection title="Profile" icon={User} defaultOpen>
          {/* Display Name */}
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
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
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
              />
              {nameEdited && (
                <button
                  onClick={saveName}
                  className="px-3 py-2 rounded-xl bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition-colors"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
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
                className={`flex-1 px-3 py-2 rounded-xl border text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 transition-all ${
                  emailError
                    ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                    : "border-slate-200 focus:ring-sky-200 focus:border-sky-400"
                }`}
              />
              {emailEdited && (
                <button
                  onClick={saveEmail}
                  className="px-3 py-2 rounded-xl bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition-colors"
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
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Your Types
            </p>
            <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-slate-50">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-sky-500" />
                <span className="text-sm text-slate-700">
                  {profile.enneagramType
                    ? `Enneagram Type ${profile.enneagramType}${profile.enneagramWing ? ` (${profile.enneagramWing})` : ""}`
                    : "Not yet determined"}
                </span>
              </div>
              <Link
                href="/enneagram/assess"
                className="text-xs font-medium text-sky-500 hover:text-sky-600"
              >
                {profile.enneagramType ? "Change" : "Take Assessment"}
              </Link>
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-slate-50">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-indigo-500" />
                <span className="text-sm text-slate-700">
                  {profile.cognitiveType
                    ? `Cognitive Type: ${profile.cognitiveType}`
                    : "Not yet determined"}
                </span>
              </div>
              <Link
                href="/cognitive/assess"
                className="text-xs font-medium text-sky-500 hover:text-sky-600"
              >
                {profile.cognitiveType ? "Change" : "Take Assessment"}
              </Link>
            </div>
          </div>
        </ExpandableSection>

        {/* ── Section 2: Notifications ────────────────────────────────────── */}
        <ExpandableSection title="Notifications" icon={Bell}>
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
                          ? "bg-sky-50 text-sky-700 border border-sky-200 font-medium"
                          : "bg-slate-50 text-slate-500 border border-transparent hover:bg-slate-100"
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium">{opt.label}</span>
                      <span className="text-[10px] text-slate-400">
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
            label="Weekly progress summary"
            description="Receive a summary of your weekly activity"
          />

          <p className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
            <Info className="w-3 h-3 flex-shrink-0" />
            Push notifications are coming soon. Your preferences are saved and ready.
          </p>
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-sm text-slate-700 font-medium transition-colors"
          >
            <Download className="w-4 h-4 text-slate-500" />
            Export My Data
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

        {/* ── Section 4: Account ──────────────────────────────────────────── */}
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
              href="/sources"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              Sources &amp; References
              <ExternalLink className="w-3 h-3 text-slate-300 ml-auto" />
            </Link>
          </div>

          {/* Bug Report */}
          <button
            onClick={openBugReport}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-sm text-slate-700 font-medium transition-colors"
          >
            <Bug className="w-4 h-4 text-slate-500" />
            Report a Bug
          </button>

          {/* App Version */}
          <div className="text-center pt-2">
            <p className="text-xs text-slate-400">Thyself v1.0.0</p>
          </div>
        </ExpandableSection>
      </div>

      {/* ── Dialogs ───────────────────────────────────────────────────────── */}
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
