# Incident Response Runbook — Thyself

**Last updated:** 2026-04-22
**For:** Production issues, outages, data incidents

---

## Severity levels

| Level | Description | SLA | Example |
|---|---|---|---|
| P0 | Total outage — all users affected | Respond within 15 min | Site returns 500, auth broken |
| P1 | Major degradation — most users affected | Respond within 1 hour | Lessons not loading, streaks not saving |
| P2 | Partial degradation — some users affected | Respond within 4 hours | One type's content missing, SEO pages 404 |
| P3 | Minor issue — few users affected | Next business day | Cosmetic bug, single user data issue |

---

## First response (any P0/P1)

### 1. Verify the incident

```bash
# Check Vercel deployment status
# → https://vercel.com/ariannashiroff/thyself-app

# Check Supabase status
# → https://status.supabase.com

# Quick smoke test
curl -I https://thyself.app  # should return 200

# Check recent deploys
git log --oneline -5
```

### 2. Check logs

**Vercel function logs:**
→ Vercel dashboard → Functions → Runtime Logs → filter by time of incident

**Supabase logs:**
→ Supabase dashboard → Logs → API logs / Postgres logs

**PostHog (if live):**
→ Look for error events or sudden drop in pageview events (signals user-facing errors)

### 3. Common causes and fixes

| Symptom | Likely cause | Fix |
|---|---|---|
| 500 on all routes | Bad deploy, env var missing | Rollback in Vercel dashboard |
| Auth failures | Supabase JWT secret changed | Check Supabase Auth settings |
| Blank page | Build error in Next.js | Check Vercel build logs |
| Lessons not loading | Supabase API limit hit | Check Supabase dashboard usage |
| App Store rejection | Compliance issue | Review App Store Connect notes |

---

## Rollback procedure

**Web (Vercel):**
1. Vercel dashboard → Deployments
2. Find last known-good deployment
3. Click "..." → "Redeploy" (Instant Rollback — no rebuild)
4. Verify https://thyself.app returns 200 within 60 seconds

**Mobile:**
Mobile apps cannot be force-rolled back once live. For a bad release:
1. Submit an emergency patch build to App Store (use 24-hour expedited review if needed)
2. In App Store Connect, you can "remove" the current version — this takes the app offline, not recommended unless P0

---

## Data incidents

### User data leak (RLS misconfiguration)

1. Immediately revoke the Supabase service role key in Supabase dashboard → Settings → API
2. Issue a new key — update all Vercel environment variables
3. Redeploy to pick up the new key
4. Audit which rows were accessible: check Supabase Postgres logs for the time window
5. Notify affected users if PII was exposed

### Accidental data delete

1. Do NOT run further queries against the affected table
2. Contact Supabase support (support@supabase.io) for PITR (point-in-time recovery)
3. Supabase Free tier has limited PITR — Pro tier has 7-day PITR

---

## Contact / escalation

| Resource | Link/Contact |
|---|---|
| Vercel status | https://www.vercel-status.com |
| Supabase status | https://status.supabase.com |
| Supabase support | https://supabase.com/support |
| Apple App Store Connect | https://appstoreconnect.apple.com |
| Google Play Console | https://play.google.com/console |

---

## Post-incident

After any P0 or P1:
1. Write a brief post-mortem (what happened, timeline, root cause, fix, prevention)
2. Save it to `docs/analytics/incidents/YYYY-MM-DD-title.md`
3. Update this runbook if a new failure mode was discovered
4. If the fix required a code change, add a regression test

---

## What NOT to do in an incident

- Do NOT run raw `UPDATE` or `DELETE` without a `WHERE` clause against production
- Do NOT rotate keys without updating ALL deployment environments simultaneously
- Do NOT roll back a database migration without testing the rollback on staging first
- Do NOT escalate to users until you have a mitigation — false alarm worse than silence
