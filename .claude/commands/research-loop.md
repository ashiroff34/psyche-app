---
description: Run N iterations of the Karpathy auto-research loop on Thyself's src/ directory. Each iteration finds one slop pattern, fixes it, verifies tsc passes, and logs the result.
argument-hint: <N iterations, default 3>
---

# /research-loop — autonomous slop reduction

Run the Karpathy-style auto-research loop on Thyself's source code. Each iteration: find one issue → fix it → verify → log.

## Parse $ARGUMENTS

- A number → run that many iterations
- Empty → run 3 iterations

## Slop targets (priority order)

1. `as any` casts → replace with proper types
2. `key={index}` in JSX lists → replace with stable IDs
3. `new Date("YYYY-MM-DD")` → replace with `Intl.DateTimeFormat("en-CA")`
4. `TYPE_COLORS = {` redefined outside `src/data/enneagram.ts` → import instead
5. Hardcoded `https://thyself.app` domain → replace with relative paths or env var
6. Magic number `999` as sentinel → replace with `Infinity` or `null`
7. Dead `console.log` statements in src/ → remove
8. Unused imports → remove

## Per-iteration workflow

### 1. Find next issue
```bash
cd "/Users/ariannashiroff/Documents/Thyself/psyche-app 2" && grep -rn "as any" src/ --include="*.ts" --include="*.tsx" | grep -v "node_modules" | head -3
```
(Cycle through all targets until one is found.)

### 2. Fix it
Make the minimal change. Read the file first, understand context, then edit.

### 3. Verify
```bash
cd "/Users/ariannashiroff/Documents/Thyself/psyche-app 2" && npx tsc --noEmit 2>&1 | tail -5
```
If tsc fails → revert the change, log as BLOCKED, move to next target.

### 4. Log to research state
Append to `.claude/research-state.md`:
```
## Iteration <N> — <timestamp>
Target: <slop type>
File: <path:line>
Fix: <what changed>
TSC: PASS / FAIL
```

## After all iterations

Run the final tally:
```
RESEARCH LOOP COMPLETE
Iterations: <N>
Fixed: <count>
Blocked: <count>
TSC: PASS / FAIL
Next targets: <remaining slop types>
```

## Rules

- Never fix more than one issue per iteration (keeps diffs small)
- Always verify tsc before moving on
- If you run out of targets before N iterations: stop and report clean
- Never reformat or restructure — minimal targeted edits only
