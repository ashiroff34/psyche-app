"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Bookmark, BookOpen, Tag, Brain, Trash2, BookmarkX } from "lucide-react";
import Link from "next/link";
import { useSmartBack } from "@/hooks/useSmartBack";
import { useBookmarks, type Bookmark as BookmarkItem } from "@/hooks/useBookmarks";

const TYPE_ICONS: Record<BookmarkItem["type"], React.ComponentType<{ className?: string }>> = {
  lesson: BookOpen,
  glossary: Tag,
  concept: Brain,
};

const TYPE_LABELS: Record<BookmarkItem["type"], string> = {
  lesson: "Lesson",
  glossary: "Glossary",
  concept: "Concept",
};

function BookmarkCard({
  bookmark,
  onRemove,
}: {
  bookmark: BookmarkItem;
  onRemove: (id: string) => void;
}) {
  const Icon = TYPE_ICONS[bookmark.type];
  const savedDate = new Date(bookmark.savedAt);
  const dateLabel = savedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const href =
    bookmark.type === "glossary"
      ? `/glossary`
      : bookmark.type === "lesson"
      ? `/learn`
      : `/daily`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center gap-4 px-4 py-3.5 rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Icon */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: "rgba(139,92,246,0.15)" }}
      >
        <Icon className="w-4 h-4 text-violet-400" />
      </div>

      {/* Content */}
      <Link href={href} className="flex-1 min-w-0">
        <div className="text-sm font-medium leading-snug truncate" style={{ color: "rgba(255,255,255,0.88)" }}>
          {bookmark.title}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className="text-[10px] uppercase tracking-wider"
            style={{ color: "rgba(139,92,246,0.7)" }}
          >
            {TYPE_LABELS[bookmark.type]}
          </span>
          {bookmark.subtitle && (
            <>
              <span className="w-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
              <span className="text-xs truncate" style={{ color: "rgba(255,255,255,0.35)" }}>
                {bookmark.subtitle}
              </span>
            </>
          )}
        </div>
      </Link>

      {/* Date + remove */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
          {dateLabel}
        </span>
        <button
          onClick={() => onRemove(bookmark.id)}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Remove bookmark"
        >
          <Trash2 className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.25)" }} />
        </button>
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function BookmarksPage() {
  const goBack = useSmartBack("/daily");
  const { bookmarks, removeBookmark, loaded } = useBookmarks();
  const [filter, setFilter] = useState<BookmarkItem["type"] | "all">("all");

  const filtered =
    filter === "all" ? bookmarks : bookmarks.filter((b) => b.type === filter);

  const counts = {
    all: bookmarks.length,
    lesson: bookmarks.filter((b) => b.type === "lesson").length,
    glossary: bookmarks.filter((b) => b.type === "glossary").length,
    concept: bookmarks.filter((b) => b.type === "concept").length,
  };

  return (
    <div className="min-h-screen pb-24" style={{ background: "#0f0a1e" }}>
      {/* Header */}
      <div
        className="sticky top-0 z-30 px-5"
        style={{
          background: "rgba(15,10,30,0.96)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-2xl mx-auto pt-4 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={goBack}
              className="p-2 rounded-xl hover:bg-white/8 transition-colors"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(139,92,246,0.18)" }}
              >
                <Bookmark className="w-4 h-4 text-violet-400" />
              </div>
              <div>
                <h1 className="text-lg font-serif font-bold" style={{ color: "rgba(255,255,255,0.93)" }}>
                  Bookmarks
                </h1>
                <p className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {bookmarks.length} saved
                </p>
              </div>
            </div>
          </div>

          {/* Filter pills */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {(["all", "lesson", "glossary", "concept"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                style={
                  filter === f
                    ? {
                        background: "rgba(139,92,246,0.25)",
                        border: "1px solid rgba(139,92,246,0.5)",
                        color: "#c4b5fd",
                      }
                    : {
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.45)",
                      }
                }
              >
                {f === "all" ? "All" : TYPE_LABELS[f]} ({counts[f]})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-5 pt-6">
        {!loaded ? (
          <div className="flex justify-center py-16">
            <div className="w-6 h-6 border-2 border-violet-400/30 border-t-violet-400 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <BookmarkX className="w-12 h-12 mx-auto mb-4" style={{ color: "rgba(255,255,255,0.12)" }} />
            <p className="text-base font-medium mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
              {filter === "all" ? "No bookmarks yet" : `No ${TYPE_LABELS[filter as BookmarkItem["type"]]} bookmarks`}
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
              Tap the bookmark icon on lessons or glossary terms to save them here.
            </p>
            <Link
              href="/glossary"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl text-sm font-medium"
              style={{
                background: "rgba(139,92,246,0.15)",
                border: "1px solid rgba(139,92,246,0.3)",
                color: "#c4b5fd",
              }}
            >
              <BookOpen className="w-4 h-4" /> Browse Glossary
            </Link>
          </motion.div>
        ) : (
          <motion.div className="space-y-2" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((bookmark) => (
                <BookmarkCard
                  key={bookmark.id}
                  bookmark={bookmark}
                  onRemove={removeBookmark}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
