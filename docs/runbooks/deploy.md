# Deployment Runbook — Thyself

**Last updated:** 2026-04-22
**Stack:** Next.js 15 / TypeScript / Supabase / Vercel / Capacitor

---

## Web (Vercel)

### Pre-flight checklist

Before any production deploy:

1. `npx tsc --noEmit` — must return 0 errors. Block deploy if it fails.
2. Check for `.env.local` values that differ from production env (Vercel dashboard → Settings → Environment Variables)
3. Run `npm run build` locally if any Next.js config changed (catches build-time errors tsc misses)
4. Verify Supabase: no pending schema migrations that haven't been applied to prod

### Deploy steps

```bash
# From psyche-app 2/
git add <specific files>
git commit -m "fix: <description>"   # conventional lowercase, no Co-Authored-By
git push origin main                  # push to GitHub (pre-authorized)
npx vercel --prod --yes               # manual deploy to Vercel production
```

> **Note:** Vercel is NOT connected to GitHub for auto-deploy. Production deploys are manual via `npx vercel --prod --yes`. This is intentional — review before deploying. Check deployment status at: https://vercel.com/ariannashiroff/thyself-app

### Verify deployment

After deploy:
1. Visit https://thyself.app — confirm no white screen or 500
2. Check `/api/health` if it exists — should return `{ "status": "ok" }`
3. Open Vercel → Functions → check for any function errors in last 5 minutes
4. Check PostHog → see if pageview events are streaming in (within 2–3 min)

### Rollback

```bash
# In Vercel dashboard: Deployments → find last good deploy → Redeploy (Instant Rollback)
# Or from CLI (requires vercel CLI):
vercel rollback [deployment-id]
```

---

## Mobile (Capacitor → App Store / Google Play)

> **Current state (April 2026):** Web app runs in Capacitor shell. Mobile deploys are manual.

### iOS build

```bash
npm run build          # Next.js static export
npx cap copy ios       # sync web assets to ios/
npx cap open ios       # open Xcode
```

In Xcode: increment build number → Archive → distribute via App Store Connect.

### Android build

```bash
npm run build
npx cap copy android
npx cap open android   # open Android Studio
```

In Android Studio: Build → Generate Signed APK/AAB → upload to Google Play Console.

### App Store metadata (current)
- Bundle ID: `com.thyself.app`
- Team: Arianna Shiroff (personal account)
- App Store Connect: [login required]

---

## Environment variables (production)

| Variable | Where set | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Vercel env | Public — safe to log |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Vercel env | Public — safe to log |
| `SUPABASE_SERVICE_ROLE_KEY` | Vercel env | **SECRET** — never log |
| `NEXT_PUBLIC_POSTHOG_KEY` | Vercel env | Public analytics key |
| `REVENUECAT_*` | Vercel env | When RevenueCat is integrated |

---

## Known issues / gotchas

- `new Date("YYYY-MM-DD")` parses as UTC midnight — causes off-by-one streak bugs in non-UTC timezones. Use `Intl.DateTimeFormat("en-CA")` instead.
- Capacitor web view caches aggressively. After a mobile deploy, test on a fresh install.
- Supabase RLS policies must be reviewed before adding any new table — missing RLS = data leak.
