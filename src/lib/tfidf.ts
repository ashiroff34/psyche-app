// ─────────────────────────────────────────────────────────────────────────────
// TF-IDF Search Engine
// Lightweight in-memory implementation for lesson content search.
// ─────────────────────────────────────────────────────────────────────────────

export interface SearchDocument {
  id: string;
  title: string;
  content: string;
  unitId: string;
  unitTitle: string;
  url?: string;
}

// Simple stemming: strip common English suffixes
function stem(word: string): string {
  if (word.length <= 3) return word;
  if (word.endsWith("ing") && word.length > 6) return word.slice(0, -3);
  if (word.endsWith("tion") && word.length > 6) return word.slice(0, -4);
  if (word.endsWith("ed") && word.length > 4) return word.slice(0, -2);
  if (word.endsWith("ly") && word.length > 4) return word.slice(0, -2);
  if (word.endsWith("er") && word.length > 4) return word.slice(0, -2);
  if (word.endsWith("ness") && word.length > 5) return word.slice(0, -4);
  if (word.endsWith("ment") && word.length > 5) return word.slice(0, -4);
  if (word.endsWith("s") && word.length > 3 && !word.endsWith("ss")) return word.slice(0, -1);
  return word;
}

const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "with", "by", "from", "is", "are", "was", "were", "be", "been",
  "being", "have", "has", "had", "do", "does", "did", "will", "would",
  "could", "should", "may", "might", "can", "this", "that", "these",
  "those", "it", "its", "as", "if", "up", "out", "you", "we", "they",
  "he", "she", "your", "our", "their", "i", "me", "my", "not", "so",
  "about", "into", "than", "then", "also", "more", "when", "what",
  "how", "all", "any", "each", "both", "few", "other", "such", "which",
  "there", "through", "very", "just", "no", "nor",
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w))
    .map(stem);
}

export class TFIDFIndex {
  private documents: SearchDocument[];
  private idf: Map<string, number>;
  private tokenizedDocs: string[][];

  constructor(documents: SearchDocument[]) {
    this.documents = documents;
    this.tokenizedDocs = documents.map((doc) =>
      tokenize(`${doc.title} ${doc.title} ${doc.content}`) // title weighted 2x
    );
    this.idf = this.buildIDF();
  }

  private buildIDF(): Map<string, number> {
    const docCount = this.documents.length;
    const termDocFreq = new Map<string, number>();

    for (const tokens of this.tokenizedDocs) {
      const seen = new Set<string>();
      for (const token of tokens) {
        if (!seen.has(token)) {
          seen.add(token);
          termDocFreq.set(token, (termDocFreq.get(token) ?? 0) + 1);
        }
      }
    }

    const idf = new Map<string, number>();
    for (const [term, freq] of termDocFreq) {
      idf.set(term, Math.log((docCount + 1) / (freq + 1)) + 1);
    }
    return idf;
  }

  private tfScore(tokens: string[], term: string): number {
    let count = 0;
    for (const t of tokens) {
      if (t === term) count++;
    }
    return count / Math.max(tokens.length, 1);
  }

  search(query: string, topK = 5): Array<SearchDocument & { score: number }> {
    const queryTokens = tokenize(query);
    if (queryTokens.length === 0) return [];

    const scores: number[] = this.documents.map((_, docIdx) => {
      const docTokens = this.tokenizedDocs[docIdx];
      let score = 0;
      for (const qToken of queryTokens) {
        const tf = this.tfScore(docTokens, qToken);
        const idf = this.idf.get(qToken) ?? 0;
        score += tf * idf;
      }
      return score;
    });

    return this.documents
      .map((doc, i) => ({ ...doc, score: scores[i] }))
      .filter((d) => d.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }
}

// ── Lesson Index Builder ─────────────────────────────────────────────────────

let _index: TFIDFIndex | null = null;

export async function buildLessonIndex(): Promise<TFIDFIndex> {
  if (_index) return _index;

  // Dynamic import to avoid SSR issues
  const { LESSON_UNITS } = await import("@/data/lessons/index");

  const docs: SearchDocument[] = [];
  for (const unit of LESSON_UNITS) {
    // Index unit itself
    docs.push({
      id: `unit-${unit.id}`,
      title: unit.title,
      content: `${unit.subtitle ?? ""} ${unit.tipCard?.bullets?.join(" ") ?? ""}`,
      unitId: unit.id,
      unitTitle: unit.title,
      url: `/learn`,
    });

    // Index each lesson within the unit
    if (Array.isArray(unit.lessons)) {
      for (const lesson of unit.lessons) {
        const lessonAny = lesson as unknown as Record<string, unknown>;
        const lessonContent = [
          lesson.title ?? "",
          String(lessonAny.content ?? ""),
          String(lessonAny.description ?? ""),
          String(lessonAny.explanation ?? ""),
        ]
          .filter(Boolean)
          .join(" ");

        docs.push({
          id: `lesson-${unit.id}-${lesson.id}`,
          title: lesson.title ?? unit.title,
          content: lessonContent,
          unitId: unit.id,
          unitTitle: unit.title,
          url: `/learn`,
        });
      }
    }
  }

  _index = new TFIDFIndex(docs);
  return _index;
}
