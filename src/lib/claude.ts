/**
 * Thyself — Claude API helper
 *
 * All content generation goes through generateContent().
 * The system prompt is automatically injected on every call.
 *
 * Usage:
 *   import { generateContent } from "@/lib/claude";
 *   const result = await generateContent("Generate a Type 4 description for sp subtype");
 */

import Anthropic from "@anthropic-ai/sdk";
import { THYSELF_SYSTEM_PROMPT } from "@/lib/prompts/thyself-system";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ContentModel = "fast" | "quality";

export interface GenerateContentOptions {
  /** Override the default model tier. Defaults to "quality". */
  model?: ContentModel;
  /** Max tokens. Defaults to 2048. */
  maxTokens?: number;
  /** Optional conversation history for multi-turn generation. */
  messages?: Anthropic.MessageParam[];
}

export interface ContentResult {
  text: string;
  inputTokens: number;
  outputTokens: number;
}

// ---------------------------------------------------------------------------
// Model map
// ---------------------------------------------------------------------------

const MODELS: Record<ContentModel, string> = {
  /** Type descriptions, lesson narratives, rich content — highest accuracy */
  quality: "claude-opus-4-5",
  /** Quiz questions, short prompts, quick lookups — faster & cheaper */
  fast: "claude-haiku-3-5",
};

// ---------------------------------------------------------------------------
// Client (singleton)
// ---------------------------------------------------------------------------

let _client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!_client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error(
        "ANTHROPIC_API_KEY is not set. Add it to your .env.local file."
      );
    }
    _client = new Anthropic({ apiKey });
  }
  return _client;
}

// ---------------------------------------------------------------------------
// Core function
// ---------------------------------------------------------------------------

/**
 * Generate Thyself content via Claude.
 *
 * @param userPrompt  The specific content request (e.g. "Type 4 sp description")
 * @param options     Optional overrides for model, token limit, or message history
 */
export async function generateContent(
  userPrompt: string,
  options: GenerateContentOptions = {}
): Promise<ContentResult> {
  const { model = "quality", maxTokens = 2048, messages = [] } = options;

  const client = getClient();

  const response = await client.messages.create({
    model: MODELS[model],
    max_tokens: maxTokens,
    system: THYSELF_SYSTEM_PROMPT,
    messages: [
      ...messages,
      { role: "user", content: userPrompt },
    ],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Claude returned no text content");
  }

  return {
    text: textBlock.text,
    inputTokens: response.usage.input_tokens,
    outputTokens: response.usage.output_tokens,
  };
}

// ---------------------------------------------------------------------------
// Convenience wrappers
// ---------------------------------------------------------------------------

/** Generate a type description (uses quality model) */
export async function generateTypeDescription(
  type: number,
  instinct: "sp" | "sx" | "so"
): Promise<string> {
  const { text } = await generateContent(
    `Generate a full Type ${type} description for a ${instinct} instinctual variant user. ` +
      `Include: core fixation and passion (Ichazo), character structure (Naranjo), ` +
      `Levels of Development arc (Riso & Hudson), instinctual variant coloring, ` +
      `and practical self-development guidance. Cite your sources inline.`
  );
  return text;
}

/** Generate quiz questions for a given topic (uses fast model) */
export async function generateQuizQuestions(
  topic: string,
  count: number = 5
): Promise<string> {
  const { text } = await generateContent(
    `Generate ${count} multiple-choice quiz questions about: ${topic}. ` +
      `Apply spaced repetition principles — vary difficulty, include retrieval practice, ` +
      `and write distractors that address common misconceptions. ` +
      `Return valid JSON: [{ question, options: string[], correctIndex: number, explanation }]`,
    { model: "fast" }
  );
  return text;
}

/** Generate a daily lesson card (uses quality model) */
export async function generateLessonCard(
  unitTitle: string,
  lessonTitle: string,
  enneagramType?: number
): Promise<string> {
  const personalization = enneagramType
    ? ` Lightly personalize for a Type ${enneagramType} learner (max 20% customization).`
    : "";
  const { text } = await generateContent(
    `Generate a microlearning lesson card for: "${unitTitle} — ${lessonTitle}".` +
      personalization +
      ` Structure it as: hook (1 sentence), core concept (2-3 sentences), ` +
      `reflection question, and one actionable takeaway. Keep it under 150 words total.`
  );
  return text;
}
