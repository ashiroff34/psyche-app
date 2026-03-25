"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Share2, Link as LinkIcon, Check } from "lucide-react";

interface ShareableCardProps {
  enneagramType?: number;
  enneagramTypeName?: string;
  enneagramColor?: string;
  instinctualStacking?: string;
  tritype?: string;
  tritypeThyself?: string;
  mbtiType?: string;
  mbtiTypeName?: string;
  enneagramWing?: string;
  displayName?: string;
  asPage?: boolean; // when rendered on /profile/card page
}

export default function ShareableCard({
  enneagramType,
  enneagramTypeName,
  enneagramColor = "#3498DB",
  instinctualStacking,
  tritype,
  tritypeThyself,
  mbtiType,
  mbtiTypeName,
  enneagramWing,
  displayName,
  asPage = false,
}: ShareableCardProps) {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopyLink = async () => {
    try {
      const url = typeof window !== "undefined"
        ? `${window.location.origin}/profile/card`
        : "/profile/card";
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback silent
    }
  };

  const gradientStyle = {
    background: `linear-gradient(135deg, ${enneagramColor}15 0%, ${enneagramColor}08 40%, #f8fafc 100%)`,
  };

  const accentStyle = {
    background: `linear-gradient(135deg, ${enneagramColor} 0%, ${enneagramColor}cc 100%)`,
  };

  return (
    <div className={asPage ? "flex flex-col items-center gap-6" : ""}>
      {/* Card */}
      <div
        ref={cardRef}
        className="relative w-[340px] rounded-3xl overflow-hidden shadow-2xl border border-white/60"
        style={gradientStyle}
      >
        {/* Decorative blob */}
        <div
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-10 blur-2xl pointer-events-none"
          style={{ backgroundColor: enneagramColor }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-8 blur-xl pointer-events-none"
          style={{ backgroundColor: enneagramColor }}
        />

        <div className="relative px-8 pt-10 pb-8">
          {/* Header row */}
          <div className="flex items-start justify-between mb-8">
            <div>
              {displayName && (
                <p className="text-xs font-medium text-slate-400 tracking-widest uppercase mb-1">
                  {displayName}
                </p>
              )}
              <p className="text-xs font-medium tracking-widest uppercase mb-2" style={{ color: enneagramColor }}>
                Thyself App
              </p>
            </div>
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={accentStyle}
            >
              <span className="text-white text-sm font-bold">✦</span>
            </div>
          </div>

          {/* Type number hero */}
          {enneagramType && (
            <div className="mb-6">
              <div
                className="text-8xl font-serif font-bold leading-none mb-1"
                style={{ color: enneagramColor }}
              >
                {enneagramType}
              </div>
              {enneagramTypeName && (
                <div className="text-xl font-serif font-semibold text-slate-700 leading-tight">
                  {enneagramTypeName}
                </div>
              )}
            </div>
          )}

          {/* Badges row */}
          <div className="flex flex-wrap gap-2 mb-8">
            {enneagramWing && (
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={accentStyle}
              >
                {enneagramWing}
              </span>
            )}
            {instinctualStacking && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/10 text-slate-700">
                {instinctualStacking}
              </span>
            )}
            {tritype && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/10 text-slate-700">
                {tritype}{tritypeThyself ? ` · ${tritypeThyself}` : ""}
              </span>
            )}
            {mbtiType && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/10 text-slate-700">
                {mbtiType}{mbtiTypeName ? ` · ${mbtiTypeName.replace("The ", "")}` : ""}
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-5" />

          {/* Footer */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-slate-400 tracking-widest uppercase">
              archetypeapp.co
            </span>
            <span className="text-[10px] text-slate-300">personality type card</span>
          </div>
        </div>
      </div>

      {/* Share button */}
      {asPage && (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 text-white text-sm font-medium shadow-lg hover:bg-slate-700 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              Link copied!
            </>
          ) : (
            <>
              <LinkIcon className="w-4 h-4" />
              Copy shareable link
            </>
          )}
        </motion.button>
      )}
    </div>
  );
}

// Inline share button for use within the profile page
export function ShareCardButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      const url = typeof window !== "undefined"
        ? `${window.location.origin}/profile/card`
        : "/profile/card";
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-medium shadow hover:bg-slate-700 transition-colors"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5" />
          Share Card
        </>
      )}
    </motion.button>
  );
}
