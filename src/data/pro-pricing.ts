// Canonical Thyself Pro pricing — single source of truth.
//
// Pro was priced in two places with two different numbers: /pricing showed
// $7.99/mo and $47/yr, /store showed $4.99/mo and $39.99/yr, and both checked
// out through the same two Stripe price IDs (pro_monthly, pro_annual). One of
// those screens was quoting a price the user would never actually be charged.
//
// That is worse than a cosmetic bug. A user who meets $4.99 in the store and
// then $7.99 on the paywall reads it as a price hike, and perceived
// bait-and-switch is the fastest way to lose a subscription sale that was
// already won. It also breaks the anchoring the paywall is built on: the
// annual card only reads as "best value" if monthly is genuinely $7.99.
//
// Every surface that displays a Pro price imports from here. The displayed
// numbers must match the live Stripe prices behind STRIPE_PRICE_PRO_MONTHLY
// and STRIPE_PRICE_PRO_ANNUAL — if those change, change them here, not in a
// component.

/** Monthly Pro, in dollars. */
export const PRO_MONTHLY_PRICE = 7.99;

/** Annual Pro, in dollars. */
export const PRO_ANNUAL_PRICE = 47;

/** Free trial length applied to every pro_* pack in /api/checkout. */
export const PRO_TRIAL_DAYS = 7;

/** Annual billing expressed per month, for like-for-like comparison. */
export const PRO_ANNUAL_PER_MONTH = PRO_ANNUAL_PRICE / 12;

/** Dollars saved by paying annually instead of twelve monthly charges. */
export const PRO_ANNUAL_SAVINGS = PRO_MONTHLY_PRICE * 12 - PRO_ANNUAL_PRICE;

/** Percent saved by paying annually, rounded for display. */
export const PRO_ANNUAL_SAVINGS_PERCENT = Math.round(
  (PRO_ANNUAL_SAVINGS / (PRO_MONTHLY_PRICE * 12)) * 100,
);

/** "$7.99" / "$47" — trailing ".00" dropped so whole dollars read cleanly. */
export function formatPrice(dollars: number): string {
  return Number.isInteger(dollars) ? `$${dollars}` : `$${dollars.toFixed(2)}`;
}
