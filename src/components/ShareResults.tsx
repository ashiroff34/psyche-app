"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Check, AlertCircle } from "lucide-react";

interface ShareResultsProps {
  enneagramType?: number;
  enneagramTypeName?: string;
  cognitiveType?: string;
  instinctualStacking?: string;
  fromName?: string;
}

const ENNEAGRAM_NAMES: Record<number, string> = {
  1: "The Reformer",
  2: "The Helper",
  3: "The Achiever",
  4: "The Individualist",
  5: "The Investigator",
  6: "The Loyalist",
  7: "The Enthusiast",
  8: "The Challenger",
  9: "The Peacemaker",
};

export default function ShareResults({
  enneagramType,
  enneagramTypeName,
  cognitiveType,
  instinctualStacking,
  fromName,
}: ShareResultsProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const typeName = enneagramTypeName || (enneagramType ? ENNEAGRAM_NAMES[enneagramType] : "");

  const buildEmailBody = () => {
    const lines: string[] = [];
    lines.push(fromName ? `${fromName} shared their personality results with you!` : "Check out my personality results!");
    lines.push("");
    if (enneagramType) {
      lines.push(`Enneagram: Type ${enneagramType}${typeName ? ` - ${typeName}` : ""}`);
    }
    if (cognitiveType) {
      lines.push(`Cognitive Type: ${cognitiveType}`);
    }
    if (instinctualStacking) {
      lines.push(`Instinctual Stacking: ${instinctualStacking}`);
    }
    lines.push("");
    lines.push("Discover your own type at https://archetypeapp.co");
    return lines.join("\n");
  };

  const buildMailtoLink = () => {
    const subject = encodeURIComponent(
      fromName
        ? `${fromName} shared their personality results`
        : "My personality results from Thyself"
    );
    const body = encodeURIComponent(buildEmailBody());
    return `mailto:?subject=${subject}&body=${body}`;
  };

  const handleSendViaApi = async () => {
    if (!email || !enneagramType) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/email/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          fromName: fromName || "A friend",
          enneagramType,
          cognitiveType,
          instinctualStacking,
        }),
      });

      if (res.ok) {
        setStatus("sent");
        setEmail("");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="space-y-4">
      {/* API-powered send (works in dev / Vercel) */}
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Friend's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendViaApi()}
          className="flex-1 px-4 py-2.5 rounded-xl bg-white/80 border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-shadow"
        />
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSendViaApi}
          disabled={!email || status === "sending"}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-white text-sm font-medium shadow hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "sending" ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : status === "sent" ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : status === "error" ? (
            <AlertCircle className="w-4 h-4 text-red-400" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {status === "sent" ? "Sent!" : status === "error" ? "Failed" : "Send"}
        </motion.button>
      </div>

      {/* Mailto fallback (works everywhere, including static export) */}
      <a
        href={buildMailtoLink()}
        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 transition-colors"
      >
        <Mail className="w-4 h-4" />
        Or share via your email app
      </a>
    </div>
  );
}
