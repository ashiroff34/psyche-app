/**
 * POST /api/generate
 *
 * Server-side content generation endpoint.
 * Keeps ANTHROPIC_API_KEY server-only (never sent to the browser).
 *
 * Request body:
 *   { type: "typeDescription" | "quiz" | "lesson", payload: { ... } }
 *
 * Response:
 *   { text: string }
 */

import { NextRequest, NextResponse } from "next/server";
import {
  generateTypeDescription,
  generateQuizQuestions,
  generateLessonCard,
} from "@/lib/claude";

export const runtime = "nodejs"; // needs Node.js crypto, not Edge

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type GenerateRequest =
  | { type: "typeDescription"; payload: { enneagramType: number; instinct: "sp" | "sx" | "so" } }
  | { type: "quiz"; payload: { topic: string; count?: number } }
  | { type: "lesson"; payload: { unitTitle: string; lessonTitle: string; enneagramType?: number } };

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    const body: GenerateRequest = await req.json();

    let text: string;

    switch (body.type) {
      case "typeDescription": {
        const { enneagramType, instinct } = body.payload;
        text = await generateTypeDescription(enneagramType, instinct);
        break;
      }
      case "quiz": {
        const { topic, count } = body.payload;
        text = await generateQuizQuestions(topic, count);
        break;
      }
      case "lesson": {
        const { unitTitle, lessonTitle, enneagramType } = body.payload;
        text = await generateLessonCard(unitTitle, lessonTitle, enneagramType);
        break;
      }
      default:
        return NextResponse.json({ error: "Unknown generation type" }, { status: 400 });
    }

    return NextResponse.json({ text });
  } catch (err) {
    console.error("[/api/generate]", err);
    const message = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
