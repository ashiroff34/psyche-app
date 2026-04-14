"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { SearchDocument } from "@/lib/tfidf";

export interface SearchResult extends SearchDocument {
  score: number;
}

export function useSemanticSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modelReady, setModelReady] = useState(false);

  // Refs for the indices / embeddings
  const tfidfIndexRef = useRef<import("@/lib/tfidf").TFIDFIndex | null>(null);
  const docEmbeddingsRef = useRef<Array<{ doc: SearchDocument; embedding: number[] }>>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Bootstrap TF-IDF index on mount ─────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    import("@/lib/tfidf").then(({ buildLessonIndex }) =>
      buildLessonIndex().then((index) => {
        if (!cancelled) tfidfIndexRef.current = index;
      })
    );
    return () => { cancelled = true; };
  }, []);

  // ── Bootstrap embedder in background ─────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    // Only load in browser
    if (typeof window === "undefined") return;

    import("@/lib/local-embed")
      .then(({ getEmbedder }) => getEmbedder())
      .then(async () => {
        if (cancelled) return;
        setModelReady(true);

        // Pre-embed documents for semantic search if index is ready
        if (!tfidfIndexRef.current) return;
        const { buildLessonIndex } = await import("@/lib/tfidf");
        const { embed } = await import("@/lib/local-embed");
        const index = await buildLessonIndex();

        // Access documents via a search-all trick — embed top-level concepts
        const { LESSON_UNITS } = await import("@/data/lessons/index");
        const docs: SearchDocument[] = LESSON_UNITS.map((unit) => ({
          id: `unit-${unit.id}`,
          title: unit.title,
          content: unit.subtitle ?? "",
          unitId: unit.id,
          unitTitle: unit.title,
          url: "/learn",
        }));

        const embeddings: typeof docEmbeddingsRef.current = [];
        for (const doc of docs) {
          if (cancelled) return;
          try {
            const embedding = await embed(`${doc.title} ${doc.content}`);
            embeddings.push({ doc, embedding });
          } catch {
            // skip failed embeddings
          }
        }
        if (!cancelled) {
          docEmbeddingsRef.current = embeddings;
        }

        // Suppress unused variable warning
        void index;
      })
      .catch(() => {
        // Embedder unavailable — TF-IDF only mode
      });

    return () => { cancelled = true; };
  }, []);

  // ── Search function ───────────────────────────────────────────────────────
  const runSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Step 1: TF-IDF search (immediate)
    let tfidfResults: SearchResult[] = [];
    if (tfidfIndexRef.current) {
      tfidfResults = tfidfIndexRef.current.search(q, 10);
    }

    // If we have any results, show them immediately
    if (tfidfResults.length > 0) {
      setResults(tfidfResults);
    }

    // Step 2: Semantic search (if embedder ready) — upgrades results in place
    if (modelReady && docEmbeddingsRef.current.length > 0) {
      try {
        const { embed, cosineSimilarity } = await import("@/lib/local-embed");
        const queryEmbedding = await embed(q);
        const semanticResults: SearchResult[] = docEmbeddingsRef.current
          .map(({ doc, embedding }) => ({
            ...doc,
            score: cosineSimilarity(queryEmbedding, embedding),
          }))
          .filter((r) => r.score > 0.25)
          .sort((a, b) => b.score - a.score)
          .slice(0, 8);

        // Merge: semantic results first, then any TF-IDF results not already included
        const seenIds = new Set(semanticResults.map((r) => r.id));
        const merged: SearchResult[] = [
          ...semanticResults,
          ...tfidfResults.filter((r) => !seenIds.has(r.id)).slice(0, 4),
        ];
        setResults(merged);
      } catch {
        // Semantic failed — keep TF-IDF results
      }
    }

    setIsLoading(false);
  }, [modelReady]);

  // ── Debounced query watcher ───────────────────────────────────────────────
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      runSearch(query);
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, runSearch]);

  return { query, setQuery, results, isLoading, modelReady };
}
