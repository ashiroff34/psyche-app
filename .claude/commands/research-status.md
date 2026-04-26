---
description: Show current auto-research status — score, recent iterations, remaining slop targets, and suggested next action.
---

# /research-status — current slop-reduction state

## Step 1 — Read research state

```bash
cat "/Users/ariannashiroff/Documents/Thyself/psyche-app 2/.claude/research-state.md" 2>/dev/null || echo "No research state yet — run /research-loop to start"
```

## Step 2 — Quick live scan

Count current slop in src/:
```bash
cd "/Users/ariannashiroff/Documents/Thyself/psyche-app 2" && echo "as any: $(grep -rn 'as any' src/ --include='*.ts' --include='*.tsx' 2>/dev/null | grep -v node_modules | wc -l | tr -d ' ')" && echo "key={index}: $(grep -rn 'key={index}' src/ --include='*.tsx' 2>/dev/null | wc -l | tr -d ' ')" && echo "new Date string: $(grep -rn 'new Date(\"' src/ --include='*.ts' --include='*.tsx' 2>/dev/null | wc -l | tr -d ' ')" && echo "console.log: $(grep -rn 'console\.log' src/ --include='*.ts' --include='*.tsx' 2>/dev/null | grep -v node_modules | wc -l | tr -d ' ')"
```

## Step 3 — TSC status

```bash
cd "/Users/ariannashiroff/Documents/Thyself/psyche-app 2" && npx tsc --noEmit 2>&1 | tail -3
```

## Step 4 — Output

```
RESEARCH STATUS — <timestamp>

SLOP COUNTS:
  as any:          <N>
  key={index}:     <N>
  new Date string: <N>
  console.log:     <N>

TSC: PASS (0 errors) / FAIL (N errors)

RECENT ITERATIONS: <last 3 from research-state.md>

SUGGESTED NEXT: /research-loop <N> (targeting <highest-count slop type>)
```

## Rules

- Read-only — never modifies files
- If no research-state.md exists, show live scan only and suggest starting with /research-loop 3
