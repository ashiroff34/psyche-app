"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "psyche-bookmarks";

export interface Bookmark {
  id: string;
  type: "lesson" | "glossary" | "concept";
  title: string;
  subtitle?: string;
  unitId?: string;
  savedAt: string; // ISO date
}

function loadBookmarks(): Bookmark[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Bookmark[];
  } catch {
    // intentionally silent — malformed JSON or private browsing
    return [];
  }
}

function saveBookmarks(bookmarks: Bookmark[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  } catch {
    // intentionally silent — quota exceeded or private browsing
  }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setBookmarks(loadBookmarks());
    setLoaded(true);
  }, []);

  const addBookmark = useCallback((bookmark: Omit<Bookmark, "savedAt">) => {
    setBookmarks((prev) => {
      if (prev.some((b) => b.id === bookmark.id)) return prev;
      const next = [
        { ...bookmark, savedAt: new Date().toISOString() },
        ...prev,
      ];
      saveBookmarks(next);
      return next;
    });
  }, []);

  const removeBookmark = useCallback((id: string) => {
    setBookmarks((prev) => {
      const next = prev.filter((b) => b.id !== id);
      saveBookmarks(next);
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (id: string) => bookmarks.some((b) => b.id === id),
    [bookmarks]
  );

  const toggleBookmark = useCallback(
    (bookmark: Omit<Bookmark, "savedAt">) => {
      if (bookmarks.some((b) => b.id === bookmark.id)) {
        removeBookmark(bookmark.id);
      } else {
        addBookmark(bookmark);
      }
    },
    [bookmarks, addBookmark, removeBookmark]
  );

  return { bookmarks, addBookmark, removeBookmark, isBookmarked, toggleBookmark, loaded };
}
