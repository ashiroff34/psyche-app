---
description: Fact-check a file for psychological accuracy using blinky. Checks Enneagram type descriptions, subtypes, cognitive functions, and any typology claims.
argument-hint: <file path to audit, e.g. src/data/tritypes.ts>
---

# /content-audit — psychological accuracy check

Route the target file to blinky for a full fact-check.

## Parse $ARGUMENTS

- A file path → audit that specific file
- A directory → audit all `.ts`, `.tsx`, `.md` files in that directory
- Empty → ask which file to check

## Step 1 — Read the file

Read the target file to extract all psychological claims:
- Type descriptions (motivations, fears, desires, behaviors)
- Subtype descriptions (sp/sx/so)
- Tritype descriptions
- Integration/disintegration references
- Passion, fixation, holy idea, virtue references
- Cognitive function descriptions

## Step 2 — Invoke blinky

Pass each claim to blinky with:
- The claim text
- The file path and line number
- The context (what is this copy used for?)

## Step 3 — Compile results

Collect all blinky findings and compile:

```
CONTENT AUDIT — <file>
Date: <today>

ISSUES FOUND: <N>

BLOCKERS:
  <file:line — claim — correction>

WARNINGS:
  <file:line — claim — correction>

PASSED: <N claims verified accurate>

VERDICT: ACCURATE / NEEDS REVISION
```

## Step 4 — Next action

If issues found: surface them for Arianna or route to pinky to rewrite the flagged sections.
If clean: log to AI_COORDINATION.md that this file passed audit.

## Rules

- Never auto-fix content — flag only
- If the file contains no psychological claims, say so and stop
- Any WRONG or INVENTED finding is a BLOCKER
