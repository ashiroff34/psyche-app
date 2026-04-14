"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, ChevronDown, ChevronUp, BookOpen, X, Bookmark, BookmarkCheck } from "lucide-react";
import { useSmartBack } from "@/hooks/useSmartBack";
import { GLOSSARY, groupGlossaryAlphabetically, searchGlossary, type GlossaryEntry } from "@/data/glossary";
import { useBookmarks } from "@/hooks/useBookmarks";

// ── Glossary Entry Card ───────────────────────────────────────────────────────

function GlossaryCard({
  entry,
  isExpanded,
  onToggle,
  onRelatedClick,
  isBookmarked,
  onBookmark,
}: {
  entry: GlossaryEntry;
  isExpanded: boolean;
  onToggle: () => void;
  onRelatedClick: (term: string) => void;
  isBookmarked: boolean;
  onBookmark: () => void;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: isExpanded
          ? "rgba(139,92,246,0.08)"
          : "rgba(255,255,255,0.04)",
        border: isExpanded
          ? "1px solid rgba(139,92,246,0.25)"
          : "1px solid rgba(255,255,255,0.07)",
        transition: "all 0.2s ease",
      }}
    >
      {/* Header row */}
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between px-5 py-4 text-left"
      >
        <div className="flex-1 min-w-0 pr-3">
          <div className="font-semibold text-sm leading-snug" style={{ color: "rgba(255,255,255,0.93)" }}>
            {entry.term}
          </div>
          <div className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            {entry.shortDef}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookmark();
            }}
            className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-violet-400" />
            ) : (
              <Bookmark className="w-4 h-4" style={{ color: "rgba(255,255,255,0.25)" }} />
            )}
          </button>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" style={{ color: "rgba(255,255,255,0.3)" }} />
          ) : (
            <ChevronDown className="w-4 h-4" style={{ color: "rgba(255,255,255,0.3)" }} />
          )}
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 space-y-4">
              {/* Long definition */}
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                {entry.longDef}
              </p>

              {/* Source */}
              <div
                className="text-xs px-3 py-2 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                <span className="font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>Source: </span>
                {entry.source}
              </div>

              {/* Related terms */}
              {entry.relatedTerms.length > 0 && (
                <div>
                  <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Related Terms
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {entry.relatedTerms.map((rt) => (
                      <button
                        key={rt}
                        onClick={() => onRelatedClick(rt)}
                        className="text-xs px-3 py-1.5 rounded-full transition-all hover:scale-105"
                        style={{
                          background: "rgba(139,92,246,0.12)",
                          border: "1px solid rgba(139,92,246,0.25)",
                          color: "#a78bfa",
                        }}
                      >
                        {rt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function GlossaryPage() {
  const goBack = useSmartBack("/settings");
  const [query, setQuery] = useState("");
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const filteredEntries = useMemo(
    () => searchGlossary(query),
    [query]
  );

  const grouped = useMemo(() => {
    if (query.trim()) {
      return { "Results": filteredEntries };
    }
    return groupGlossaryAlphabetically();
  }, [query, filteredEntries]);

  const sortedLetters = Object.keys(grouped).sort();

  const handleRelatedClick = (term: string) => {
    setQuery("");
    // Find the entry and expand it
    const entry = GLOSSARY.find((e) => e.term.toLowerCase().includes(term.toLowerCase()));
    if (entry) {
      setExpandedTerm(entry.term);
      // Scroll to it after a tick
      setTimeout(() => {
        const el = document.getElementById(`glossary-${entry.term}`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 200);
    }
  };

  return (
    <div
      className="min-h-screen pb-24"
      style={{ background: "#0f0a1e" }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-30 px-5 pt-safe"
        style={{
          background: "rgba(15,10,30,0.96)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-2xl mx-auto pt-4 pb-3">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={goBack}
              className="p-2 rounded-xl transition-colors hover:bg-white/8"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(139,92,246,0.18)" }}
              >
                <BookOpen className="w-4 h-4 text-violet-400" />
              </div>
              <div>
                <h1 className="text-lg font-serif font-bold leading-tight" style={{ color: "rgba(255,255,255,0.93)" }}>
                  Glossary
                </h1>
                <p className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {GLOSSARY.length} terms
                </p>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative mb-1">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "rgba(255,255,255,0.25)" }}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search terms, concepts, functions…"
              className="w-full pl-10 pr-10 py-3 rounded-2xl text-sm outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.88)",
                caretColor: "#a78bfa",
              }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.35)" }} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-5 pt-6 space-y-8">
        {sortedLetters.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              No terms matching &ldquo;{query}&rdquo;
            </p>
          </div>
        )}

        {sortedLetters.map((letter) => (
          <motion.div
            key={letter}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Letter heading */}
            <div
              className="text-xs font-black uppercase tracking-widest mb-3 px-1"
              style={{ color: "rgba(139,92,246,0.7)" }}
            >
              {letter}
            </div>

            {/* Entries */}
            <div className="space-y-2">
              {grouped[letter].map((entry) => (
                <div key={entry.term} id={`glossary-${entry.term}`}>
                  <GlossaryCard
                    entry={entry}
                    isExpanded={expandedTerm === entry.term}
                    onToggle={() =>
                      setExpandedTerm((prev) =>
                        prev === entry.term ? null : entry.term
                      )
                    }
                    onRelatedClick={handleRelatedClick}
                    isBookmarked={isBookmarked(`glossary-${entry.term}`)}
                    onBookmark={() =>
                      toggleBookmark({
                        id: `glossary-${entry.term}`,
                        type: "glossary",
                        title: entry.term,
                        subtitle: entry.shortDef,
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Footer note */}
        {!query && (
          <div className="text-center pb-4">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
              All definitions sourced from established academic and clinical psychology literature.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
