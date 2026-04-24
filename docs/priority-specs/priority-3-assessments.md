# Priority 3 — Proprietary Assessments: Implementation Spec

**Status:** PARTIAL — quiz infrastructure exists, proprietary branding not applied (as of 2026-04-22)
**IP importance:** CRITICAL — proprietary assessments are the #1 IP moat for acquisition
**Migration:** `supabase/migrations/20260422000003_assessments.sql` — READY TO APPLY

## TRADEMARK WARNING

**NEVER** name any assessment:
- ❌ "MBTI" or "Myers-Briggs Type Indicator"
- ❌ "RHETI" or "Riso-Hudson Enneagram Type Indicator"
- ✅ "Thyself Type Index" (16-type, replaces MBTI-style)
- ✅ "Thyself Enneagram Assessment" (9-type, replaces RHETI)

This is an existential issue for any acquisition. Acquirers' legal teams WILL check.

---

## Two assessments to build

### 1. Thyself Enneagram Assessment (9-type)

A proprietary 9-type Enneagram assessment distinct from RHETI. Uses forced-choice and situational items.

**Item types:**
- Forced-choice pairs: "Which describes you more? (A) I often feel I need to help others / (B) I often feel I need to stay independent"
- Situational: "When things go wrong at work, your first instinct is to..."
- Self-report Likert: "I feel a strong sense of responsibility to others" (1-5)

**Scoring:**
- Each item has weighted loadings on all 9 types
- Final score = type with highest total loading (with confidence metric)
- Use FSRS algorithm (`src/lib/fsrs.ts`) for adaptive item selection

**NOT a clone of RHETI.** Items must be original. Validated against Riso-Hudson type descriptions, not RHETI questions.

### 2. Thyself Type Index (16-type)

A proprietary 16-type assessment based on Jungian cognitive functions. NOT Myers-Briggs.

**Approach:** Measure the 4 dichotomies directly via behavioral scenarios:
- E/I: where do you direct attention and energy?
- S/N: how do you take in information?
- T/F: how do you make decisions?
- J/P: how do you orient to the outer world?

**DO NOT** lift questions from existing MBTI assessments. All items must be original.

---

## Routes to create

```
src/app/assessments/page.tsx          — Assessment home (lists both assessments)
src/app/assessments/enneagram/page.tsx — Thyself Enneagram Assessment flow
src/app/assessments/16type/page.tsx   — Thyself Type Index flow
src/app/research/page.tsx             — Reliability stats (diligence artifact)
```

---

## Research page (`/research`) — REQUIRED for diligence

This page is explicitly required by the AI dev instructions as a diligence artifact. It shows:
- Sample size: N users who completed the assessment
- Test-retest reliability: % who get the same result after 2 weeks
- Internal consistency (Cronbach's alpha per type)
- Correlation with external benchmarks (if any)
- Methodology notes: "Thyself assessments are developed internally and validated against established typological frameworks..."

Even with small N, having this page demonstrates rigor to acquirers.

---

## Supabase table

Apply `supabase/migrations/20260422000003_assessments.sql` first.

Key columns:
- `type` — `'thyself_9type'` or `'thyself_16type'` (never `'rheti'` or `'mbti'`)
- `raw_scores` — all type scores as JSON (enables retroactive recalculation)
- `confidence` — 0–1 calibration metric (differentiates Thyself from free quizzes)
- `is_current` — mark most recent assessment as canonical

---

## Scoring implementation (reference)

```typescript
// src/lib/assessment-scorer.ts
// Reference: src/lib/personality-scorer.ts (existing)

export interface AssessmentResult {
  type: string              // "4" for Enneagram, "INFJ" for 16-type
  scores: Record<string, number>  // raw score per type
  confidence: number        // 0-1: how clear the result is
  wing?: string             // Enneagram only: "4w5" or "4w3"
  instinct?: 'sp' | 'sx' | 'so'  // Enneagram only
}

export function scoreEnneagram(answers: AnswerVector): AssessmentResult {
  // Sum weighted loadings per type
  // Normalize to 0-1
  // Confidence = winner_score / (winner_score + runner_up_score)
  // Wing = highest adjacent type
}
```

---

## Content requirements (blinky must review)

All assessment items must be:
- Original (not copied from RHETI, MBTI, or any commercial test)
- Grounded in Ichazo → Naranjo → Riso-Hudson for Enneagram items
- Grounded in Jung → Briggs Myers for 16-type items
- Reviewed by blinky before shipping

Run `/content-audit src/app/assessments/` after writing items.

---

## PostHog events to fire

```typescript
track('assessment_started', { instrument: 'thyself_9type', source: 'assessments_page' })
track('assessment_completed', { instrument: 'thyself_9type', result: '4', confidence: 0.87 })
track('assessment_result_viewed', { instrument: 'thyself_9type', result: '4', wing: '4w5' })
```
