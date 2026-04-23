"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Local Browser Embeddings via @xenova/transformers
// Runs entirely in the browser via WASM — no API key required.
// Model: Xenova/all-MiniLM-L6-v2 (~25MB, cached after first load)
// ─────────────────────────────────────────────────────────────────────────────

type EmbedderPipeline = (
  text: string,
  opts: Record<string, unknown>
) => Promise<{ data: Float32Array }>;

let _pipeline: EmbedderPipeline | null = null;
let _loading = false;
let _loadPromise: Promise<EmbedderPipeline> | null = null;

export async function getEmbedder(): Promise<EmbedderPipeline> {
  if (_pipeline) return _pipeline;
  if (_loadPromise) return _loadPromise;

  _loading = true;
  _loadPromise = import("@xenova/transformers").then(async ({ pipeline }) => {
    const p = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
    _pipeline = p as unknown as EmbedderPipeline;
    _loading = false;
    return _pipeline;
  });

  return _loadPromise;
}

export async function embed(text: string): Promise<number[]> {
  const p = await getEmbedder();
  const out = await p(text, { pooling: "mean", normalize: true });
  return Array.from(out.data);
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb);
  return denom === 0 ? 0 : dot / denom;
}

