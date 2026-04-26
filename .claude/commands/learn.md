---
description: Log this session's work to AI_COORDINATION.md in the standard format. Run at the end of any work session to keep the project log current.
argument-hint: <session title, e.g. "Streak timezone fix">
---

# /learn — log this session to AI_COORDINATION.md

## Format

Append to `.claude/AI_COORDINATION.md`:

```
**<N>. $ARGUMENTS** — <today's date>

What was done:
- <bullet 1>
- <bullet 2>

Files modified:
- `<path>`
- `<path>`

Known issues:
- <any open items or regressions introduced>
```

## Step 1 — Gather session summary

Review what happened this session:
- What files were edited?
- What was fixed or changed?
- Any regressions or open issues?

## Step 2 — Get the next entry number

```bash
grep -c "^\*\*[0-9]" "/Users/ariannashiroff/Documents/Thyself/psyche-app 2/.claude/AI_COORDINATION.md" 2>/dev/null || echo 0
```

Increment by 1 for the new entry.

## Step 3 — Append the entry

```bash
cat >> "/Users/ariannashiroff/Documents/Thyself/psyche-app 2/.claude/AI_COORDINATION.md" << 'EOF'
<formatted entry>
EOF
```

## Step 4 — Confirm

Report: entry number, title, file count logged.

## Rules

- If $ARGUMENTS is empty, use "Session <date>" as the title
- Known issues section is optional — omit if clean
- Never overwrite existing entries
- Keep bullets concise (one line each)
