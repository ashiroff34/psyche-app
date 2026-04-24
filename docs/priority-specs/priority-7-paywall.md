# Priority 7 — Paywall (RevenueCat): Implementation Spec

**Status:** NOT STARTED (as of 2026-04-22)
**Strategic note:** Revenue proof is a TOP diligence signal. Even 100 paid subscribers with $7.99/mo = $9,600 ARR, which shows pricing power and demand validation.

---

## Products to create in RevenueCat

Log in to https://app.revenuecat.com → create these products:

### iOS (App Store Connect)
```
thyself_pro_monthly     — $7.99/month
thyself_pro_annual      — $49.99/year ($4.17/mo — save 48%)
thyself_pro_lifetime    — $149.99 one-time
```

### Android (Google Play Console)
Same products, same prices (Google enforces price parity).

### RevenueCat entitlements
Create one entitlement: `pro` — this is what the app checks.
Map all 3 products to the `pro` entitlement.

---

## Environment setup

```env
# .env.local — add these:
NEXT_PUBLIC_REVENUECAT_API_KEY=rcb_YOUR_KEY  # Public API key (not the secret)
```

Vercel: add `NEXT_PUBLIC_REVENUECAT_API_KEY` to production env vars.

---

## Implementation

### 1. Install SDK

```bash
npm install @revenuecat/purchases-capacitor
```

> Note: RevenueCat has a Capacitor SDK that works for both web (via Stripe) and native iOS/Android. For web, it routes through Stripe. For native, it uses StoreKit / Google Play Billing.

### 2. Initialize (`src/lib/revenuecat.ts`)

```typescript
import Purchases, { LOG_LEVEL } from '@revenuecat/purchases-capacitor'

const RC_KEY = process.env.NEXT_PUBLIC_REVENUECAT_API_KEY ?? ''

let initialized = false

export async function initRevenueCat(userId: string) {
  if (typeof window === 'undefined' || !RC_KEY || initialized) return
  initialized = true
  
  await Purchases.setLogLevel({ level: LOG_LEVEL.ERROR })
  await Purchases.configure({ apiKey: RC_KEY, appUserID: userId })
}

export async function checkProStatus(): Promise<boolean> {
  try {
    const { customerInfo } = await Purchases.getCustomerInfo()
    return typeof customerInfo.entitlements.active['pro'] !== 'undefined'
  } catch {
    return false  // fail open — never block on RevenueCat error
  }
}

export async function getOfferings() {
  try {
    const { current } = await Purchases.getOfferings()
    return current
  } catch {
    return null
  }
}
```

### 3. Hook: `usePro` (`src/hooks/usePro.ts`)

```typescript
import { useState, useEffect } from 'react'
import { checkProStatus } from '@/lib/revenuecat'
import { useProfile } from '@/hooks/useProfile'

export function usePro() {
  const { userId } = useProfile()
  const [isPro, setIsPro] = useState(false)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    if (!userId) { setLoading(false); return }
    checkProStatus().then(status => {
      setIsPro(status)
      setLoading(false)
    })
  }, [userId])
  
  return { isPro, loading }
}
```

---

## Paywall trigger points

### Trigger 1: After assessment completion
In `src/app/enneagram/results/page.tsx` or assessment flow:
```typescript
const { isPro } = usePro()
// After type is revealed — show paywall if not pro
if (!isPro) showPaywall('post_assessment')
```

### Trigger 2: After 3 lessons
In lesson completion logic:
```typescript
if (completedLessonsCount >= 3 && !isPro) showPaywall('lesson_gate')
```

### Trigger 3: Compatibility feature
Whole feature is pro-only:
```typescript
if (!isPro) showPaywall('compatibility_gate')
```

### Trigger 4: Advanced journal prompts
Basic prompts free; advanced (difficulty 2-3) require pro:
```typescript
if (prompt.difficulty > 1 && !isPro) showPaywall('journal_advanced')
```

---

## Paywall UI component

```
src/components/paywall/PaywallSheet.tsx
```

Bottom sheet with:
- Headline: "Unlock Thyself Pro"
- 3 benefits specific to the trigger point (e.g., "Unlimited compatibility insights" for the compatibility gate)
- Price pills: Monthly / Annual (highlight annual as "Best Value") / Lifetime
- "Try 7 days free" for monthly (if RevenueCat intro offer is set up)
- "Restore purchases" link at the bottom
- No "X" button — must dismiss by tapping outside

---

## Webhook (Supabase sync)

RevenueCat sends webhooks when subscriptions change. Handle in `src/app/api/webhook/route.ts`:

```typescript
// Events to handle:
// INITIAL_PURCHASE — user subscribed
// RENEWAL — subscription renewed
// CANCELLATION — will expire at period end
// EXPIRATION — pro expired, revert to free

// Update profiles.is_pro column (add this column to profiles table)
await supabase.from('profiles').update({ is_pro: true }).eq('user_id', userId)
```

Add to profiles table migration (separate SQL):
```sql
alter table profiles add column if not exists is_pro boolean not null default false;
alter table profiles add column if not exists pro_expires_at timestamptz;
```

---

## PostHog events

```typescript
track('paywall_viewed', { trigger: 'post_assessment' | 'lesson_gate' | 'compatibility_gate' | 'journal_advanced' })
track('purchase_initiated', { product_id: 'thyself_pro_monthly', price: 7.99 })
track('purchase_completed', { product_id: 'thyself_pro_monthly', amount: 7.99 })
track('purchase_failed', { product_id: 'thyself_pro_monthly', error: 'cancelled' })
```

---

## Diligence note

The RevenueCat dashboard provides real-time MRR, churn rate, LTV, and cohort data. Once live, share the RevenueCat dashboard with acquirers as revenue proof. Screenshot before any demo.
