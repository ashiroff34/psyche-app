import { LESSON_UNITS } from "@/data/lessons";
import LessonPageClient from "./LessonPageClient";

// ── Generate static params for all available lessons ─────────────────────────

export function generateStaticParams() {
  const params: { unitId: string; lessonId: string }[] = [];
  for (const unit of LESSON_UNITS) {
    if (unit.lessons.length === 0) continue;
    for (const lesson of unit.lessons) {
      params.push({ unitId: unit.id, lessonId: lesson.id });
    }
  }
  return params;
}

// ── Server Page — delegates to client component ─────────────────────────────

export default function LessonPage({
  params,
}: {
  params: Promise<{ unitId: string; lessonId: string }>;
}) {
  return <LessonPageClient params={params} />;
}
