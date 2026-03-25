"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

interface NextStepBannerProps {
  href: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  color?: string;
  dismissKey?: string; // unique key for sessionStorage
}

export default function NextStepBanner({
  href,
  label,
  sublabel,
  icon,
  color = "#6366f1",
  dismissKey,
}: NextStepBannerProps) {
  const storageKey = `psyche-next-step-dismissed-${dismissKey || label}`;
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (sessionStorage.getItem(storageKey) === "1") {
        setDismissed(true);
      }
    } catch {}
  }, [storageKey]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDismissed(true);
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {}
  };

  // Don't render on server or if dismissed
  if (!mounted || dismissed) return null;

  return (
    <div className="mt-10 mb-2">
      <Link
        href={href}
        className="group relative flex items-center gap-4 w-full rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden px-5 py-4"
        style={{ borderLeftColor: color, borderLeftWidth: 4 }}
      >
        {/* Left color accent */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
          style={{ backgroundColor: color }}
        />

        {/* Icon */}
        {icon && (
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ml-1"
            style={{ backgroundColor: `${color}18` }}
          >
            <span style={{ color }}>{icon}</span>
          </div>
        )}

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div
            className="text-[10px] font-semibold uppercase tracking-widest mb-0.5"
            style={{ color }}
          >
            Up next
          </div>
          <div className="font-bold text-slate-800 text-sm leading-snug">{label}</div>
          {sublabel && (
            <div className="text-xs text-slate-400 mt-0.5 leading-snug">{sublabel}</div>
          )}
        </div>

        {/* Arrow */}
        <div
          className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
          style={{ backgroundColor: `${color}15` }}
        >
          <ArrowRight className="w-4 h-4" style={{ color }} />
        </div>

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-slate-500 hover:bg-slate-100 transition-all -mr-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </Link>
    </div>
  );
}
