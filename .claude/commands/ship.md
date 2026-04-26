---
description: Quality gate + commit + push. Runs tsc, checks for slop, commits with the given message, and pushes. The only correct way to ship Thyself code.
argument-hint: <commit message, e.g. "fix: streak timezone bug">
---

# /ship — quality gate and push

Ship Thyself code safely. No skipping steps.

## Step 1 — TypeScript check

```bash
cd "/Users/ariannashiroff/Documents/Thyself/psyche-app 2" && npx tsc --noEmit 2>&1
```

If tsc fails: **STOP**. Report errors. Do not commit.

## Step 2 — Slop scan

Quick scan before committing:
```bash
cd "/Users/ariannashiroff/Documents/Thyself/psyche-app 2" && grep -rn "as any" src/ --include="*.ts" --include="*.tsx" | grep -v "node_modules" | head -5
```

Report count. If count > 0, warn but don't block (unless Arianna says to).

## Step 3 — Commit

Message format: `$ARGUMENTS` as provided. If empty, ask for a message.

Rules:
- Lowercase type prefix: `fix:` / `refactor:` / `chore:`
- No `Co-Authored-By` trailer
- No `feat:` unless Arianna explicitly approved a new feature

```bash
cd "/Users/ariannashiroff/Documents/Thyself/psyche-app 2" && git add -A && git commit -m "$ARGUMENTS"
```

## Step 4 — Push

```bash
cd "/Users/ariannashiroff/Documents/Thyself/psyche-app 2" && git push origin main
```

## Step 5 — Confirm

Report: commit hash, files changed, push status.

## Hard rules

- Never commit if tsc fails
- Never skip the tsc check
- Never add Co-Authored-By
- If $ARGUMENTS is empty → ask for commit message before proceeding
