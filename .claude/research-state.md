# Slop Reduction Research State

Last updated: 2026-04-22 (baseline scan)
Metric: total slop count (lower = better)

## Current slop counts (as of 2026-04-22)

| Pattern | Count | Risk |
|---|---|---|
| `as any` | 4 | HIGH — TypeScript unsafe, reviewer flag |
| `key={index}` | 1 | MEDIUM — React list reconciliation bug risk |
| `new Date("YYYY-MM-DD")` | 2 | HIGH — UTC date parsing bug in non-UTC timezones |
| `console.log` | 5 | LOW — debug noise in production |

**Total slop: 12**

## Iteration log

*(No research-loop iterations run yet. Run `/research-loop 5` to start.)*

---

## How the loop works

Each iteration:
1. Picks the highest-risk pattern from the table above
2. Finds one instance → fixes it → verifies tsc passes → logs here
3. Updates the count table

Run: `/research-loop 5` (5 iterations) or `/research-loop 1` (single pass)
Status: `/research-status`
