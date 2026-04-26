---
description: Pick the next acquisition-readiness task. Rotates through the 5 acquisition buckets and suggests the highest-value action for the current bucket.
---

# /acq-rotation — acquisition-readiness task picker

Thyself's north star: become acquisition-ready for Truity, Integrative9, or Enneagram Institute.

## The 5 acquisition buckets

1. **Content defensibility** — unique, accurate psychological content that can't be scraped
2. **Differentiated IP** — features or data that competitors don't have
3. **Engagement proof** — streaks, retention, completion rates, DAU signals
4. **Code quality** — tsc cleanliness, no slop, security, performance
5. **Polish & brand** — visual consistency, UI copy, no rough edges

## Step 1 — Read current state

Check what's been done recently:
- Read `.claude/AI_COORDINATION.md` (last 5 entries)
- Read `~/.claude/daily-log.md` (last autonomous pass)

## Step 2 — Pick the underserved bucket

Identify which of the 5 buckets has the LEAST recent attention. That's the target for this rotation.

## Step 3 — Generate 3 concrete tasks

For the chosen bucket, suggest 3 specific, actionable tasks that:
- Can be completed in one session
- Move the needle on acquisition-readiness
- Follow the "no new features" rule (polish/fix/refactor)

## Step 4 — Output

```
CURRENT ROTATION: Bucket <N> — <name>

WHY: <1 sentence on why this bucket is underserved>

TASKS (pick one):
1. <concrete task with file reference if known>
2. <concrete task>
3. <concrete task>

SUGGESTED: <task 1> — <1-line reason it's highest value>
```

After the user picks, route to the appropriate agent (linky for code, pinky/blinky for content, dinky for polish).
