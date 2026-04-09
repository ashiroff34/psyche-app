"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, X, BookOpen, Brain, ClipboardList, Lightbulb, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { searchIndex, type SearchItem } from "@/data/searchIndex";

const CATEGORY_META: Record<
  SearchItem["category"],
  { label: string; color: string; bg: string; icon: React.ReactNode }
> = {
  type: {
    label: "Type",
    color: "#a78bfa",
    bg: "rgba(139,92,246,0.12)",
    icon: <Tag className="w-3 h-3" />,
  },
  function: {
    label: "Function",
    color: "#38bdf8",
    bg: "rgba(14,165,233,0.12)",
    icon: <Brain className="w-3 h-3" />,
  },
  lesson: {
    label: "Lesson",
    color: "#34d399",
    bg: "rgba(52,211,153,0.12)",
    icon: <BookOpen className="w-3 h-3" />,
  },
  assessment: {
    label: "Assessment",
    color: "#fb923c",
    bg: "rgba(251,146,60,0.12)",
    icon: <ClipboardList className="w-3 h-3" />,
  },
  concept: {
    label: "Concept",
    color: "#f472b6",
    bg: "rgba(244,114,182,0.12)",
    icon: <Lightbulb className="w-3 h-3" />,
  },
};

function matchesQuery(item: SearchItem, query: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return false;
  const haystack = [
    item.title,
    item.subtitle ?? "",
    item.preview,
    ...item.keywords,
  ]
    .join(" ")
    .toLowerCase();
  // Direct substring match (works for "5", "type", "perfect", etc.)
  if (haystack.includes(q)) return true;
  // Word-boundary match: helps single-digit and short queries match standalone words
  const words = haystack.split(/[\s.,;:!?\-/()]+/).filter(Boolean);
  return words.some((w) => w.startsWith(q));
}

export default function SearchComponent() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results =
    query.trim().length >= 1
      ? searchIndex.filter((item) => matchesQuery(item, query)).slice(0, 12)
      : [];

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 80);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  const handleSelect = (item: SearchItem) => {
    router.push(item.href);
    handleClose();
  };

  // Close on click outside
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleClose();
      }
    }
    if (open) {
      document.addEventListener("mousedown", onMouseDown);
    }
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open, handleClose]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  return (
    <div ref={containerRef} className="relative">
      {/* Search trigger button */}
      <button
        onClick={handleOpen}
        aria-label="Search"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all"
        style={{ color: "rgba(255,255,255,0.55)" }}
      >
        <SearchIcon className="w-4 h-4" />
        <span className="hidden sm:inline">Search</span>
      </button>

      {/* Expanded search panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl overflow-hidden z-50"
            style={{
              background: "rgba(22,12,48,0.97)",
              border: "1px solid rgba(139,92,246,0.18)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.1)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Input */}
            <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <SearchIcon className="w-4 h-4 flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search types, functions, concepts..."
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "rgba(255,255,255,0.9)", caretColor: "#a78bfa" }}
              />
              {query && (
                <button onClick={() => setQuery("")} style={{ color: "rgba(255,255,255,0.35)" }}>
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div className="py-1 max-h-96 overflow-y-auto">
                {results.map((item) => {
                  const meta = CATEGORY_META[item.category];
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className="w-full text-left px-4 py-3 flex items-start gap-3 transition-colors"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(139,92,246,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                      }}
                    >
                      {/* Category pill */}
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold mt-0.5 flex-shrink-0"
                        style={{ background: meta.bg, color: meta.color }}
                      >
                        {meta.icon}
                        {meta.label}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: "rgba(255,255,255,0.88)" }}>
                          {item.title}
                        </p>
                        <p className="text-xs leading-relaxed mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                          {item.preview}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Empty state */}
            {query.trim().length >= 2 && results.length === 0 && (
              <div className="px-4 py-8 text-center">
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                  No results for &ldquo;{query}&rdquo;
                </p>
              </div>
            )}

            {/* Hint when no query */}
            {query.trim().length < 2 && (
              <div className="px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: "rgba(167,139,250,0.5)" }}>
                  Try searching for
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Type 4", "INFJ", "Tritype", "Wing", "Ni", "Shadow", "Keirsey", "Big Five"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="text-xs px-2 py-1 rounded-lg transition-colors"
                      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
