import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy · Thyself",
  description: "How Thyself handles your data. Spoiler: most of it never leaves your device.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pb-32 pt-20" style={{ background: "#0f0a1e" }}>
      <div className="max-w-2xl mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold mb-6 transition-colors"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </Link>

        <div className="mb-8">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.25em] mb-2"
            style={{ color: "rgba(167,139,250,0.75)" }}
          >
            The short version
          </p>
          <h1
            className="text-3xl font-serif font-bold mb-4"
            style={{ color: "rgba(255,255,255,0.93)" }}
          >
            Privacy Policy
          </h1>
          <p
            className="text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Most of your data never leaves your device. We don&apos;t sell anything.
            We don&apos;t track you across other apps. We tell you exactly what we
            collect and why, in plain language. If you want to delete everything,
            you can, one tap, at any time.
          </p>
        </div>

        <div
          className="rounded-2xl p-6 mb-6 space-y-8"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* 1 */}
          <section>
            <h2 className="text-lg font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
              1. What stays on your device (most of it)
            </h2>
            <div className="text-sm leading-relaxed space-y-2" style={{ color: "rgba(255,255,255,0.65)" }}>
              <p>
                The following data is stored only in your browser&apos;s localStorage or on your phone&apos;s local storage. We never see it:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your Enneagram type, subtype, wing, tritype, cognitive type</li>
                <li>Your journal entries and reflections</li>
                <li>Your chibi companion state (health, happiness, outfits)</li>
                <li>Your daily practice progress, streaks, XP, tokens</li>
                <li>Anything you paste into the Mirror feature</li>
                <li>Quiz progress and answers</li>
              </ul>
              <p className="pt-2">
                <strong style={{ color: "rgba(255,255,255,0.85)" }}>Closing the app or clearing your browser data = this data is gone.</strong>{" "}
                Nothing is backed up to a server unless you explicitly opt in (see Section 2).
              </p>
            </div>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
              2. What we store on our servers (only if you opt in)
            </h2>
            <div className="text-sm leading-relaxed space-y-2" style={{ color: "rgba(255,255,255,0.65)" }}>
              <p>
                If you give us your email address to receive the weekly reflection digest, we store the following in our database (Supabase, hosted in the US):
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your email address</li>
                <li>Your display name (if you entered one)</li>
                <li>Your Enneagram type (so we can send the right reflection)</li>
                <li>Your opt-in status for the weekly digest</li>
                <li>A timestamp of when you signed up</li>
              </ul>
              <p className="pt-2">
                We use this only to send you the weekly email you opted into. We never share it with anyone, ever. You can delete it any time (see Section 6).
              </p>
            </div>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
              3. Analytics (anonymous, aggregate)
            </h2>
            <div className="text-sm leading-relaxed space-y-2" style={{ color: "rgba(255,255,255,0.65)" }}>
              <p>
                We use PostHog (hosted in the US) to understand how people use the app in aggregate. This helps us improve it. PostHog receives:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Which pages you visit (not the content you type)</li>
                <li>Events like &ldquo;quiz completed&rdquo;, &ldquo;identity card shared&rdquo;, &ldquo;daily check-in done&rdquo;</li>
                <li>Your Enneagram type as a person property (so we can see retention per type)</li>
                <li>Device/browser info (for debugging)</li>
              </ul>
              <p className="pt-2">
                We do <strong style={{ color: "rgba(255,255,255,0.85)" }}>not</strong> send your journal entries, reflections, Mirror analyses, or any text content you type. We do <strong style={{ color: "rgba(255,255,255,0.85)" }}>not</strong> track you across other websites.
              </p>
              <p>
                You can opt out of analytics entirely in the app Settings.
              </p>
            </div>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
              4. The Mirror feature (zero data leaves your device)
            </h2>
            <div className="text-sm leading-relaxed space-y-2" style={{ color: "rgba(255,255,255,0.65)" }}>
              <p>
                The Mirror is our client-side psychometric analyzer. When you paste text into it, the entire analysis runs in JavaScript in your browser. <strong style={{ color: "rgba(255,255,255,0.85)" }}>No text is uploaded. No API is called. Nothing is logged.</strong> When you navigate away, the text is discarded.
              </p>
              <p>
                You can verify this by opening your browser&apos;s Network tab before analyzing text, there should be zero network requests.
              </p>
            </div>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
              5. Payments (Stripe)
            </h2>
            <div className="text-sm leading-relaxed space-y-2" style={{ color: "rgba(255,255,255,0.65)" }}>
              <p>
                If you purchase tokens or a Pro subscription, the payment is processed by Stripe. We never see your credit card number. Stripe sees the transaction and your billing details. Stripe&apos;s privacy policy is at{" "}
                <a
                  href="https://stripe.com/privacy"
                  className="underline"
                  style={{ color: "rgba(167,139,250,0.85)" }}
                >
                  stripe.com/privacy
                </a>
                .
              </p>
            </div>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
              6. Your rights, delete everything, any time
            </h2>
            <div className="text-sm leading-relaxed space-y-2" style={{ color: "rgba(255,255,255,0.65)" }}>
              <p>You can at any time:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong style={{ color: "rgba(255,255,255,0.85)" }}>Delete all local data</strong>: go to Settings → Clear my data. This removes everything on your device.
                </li>
                <li>
                  <strong style={{ color: "rgba(255,255,255,0.85)" }}>Delete your account</strong>: if you gave us your email, go to Settings → Delete my account. We remove your row from our database within 7 days.
                </li>
                <li>
                  <strong style={{ color: "rgba(255,255,255,0.85)" }}>Export your data</strong>: go to Settings → Export my data. We send you everything we have on you in JSON.
                </li>
                <li>
                  <strong style={{ color: "rgba(255,255,255,0.85)" }}>Opt out of analytics</strong>: Settings → Analytics → off.
                </li>
                <li>
                  <strong style={{ color: "rgba(255,255,255,0.85)" }}>Unsubscribe from emails</strong>: every email has an unsubscribe link.
                </li>
              </ul>
              <p className="pt-2">
                Under GDPR (if you&apos;re in the EU), CCPA (California), and similar laws elsewhere, you also have the right to know what we hold, correct it, and complain to a regulator. Email us at privacy@thyself.app and we&apos;ll respond within 30 days.
              </p>
            </div>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
              7. What we will never do
            </h2>
            <ul className="text-sm leading-relaxed list-disc pl-5 space-y-1" style={{ color: "rgba(255,255,255,0.65)" }}>
              <li>Sell your data to advertisers or data brokers</li>
              <li>Train models on your journal entries or Mirror analyses</li>
              <li>Use your data for anything other than what&apos;s described here</li>
              <li>Share your Enneagram type with employers, insurers, or anyone else</li>
              <li>Show you ads inside the app</li>
              <li>Track you across other apps or websites</li>
            </ul>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
              8. Children
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Thyself is not designed for children under 13. We do not knowingly collect data from anyone under 13. If you believe a child has used Thyself, contact us at privacy@thyself.app and we&apos;ll delete any data.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-lg font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
              9. Changes to this policy
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              If we change this policy, we&apos;ll post the updated version here and update the &ldquo;Last updated&rdquo; date below. Material changes will also be communicated via an in-app banner.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-lg font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
              10. Contact
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Questions about privacy? Email{" "}
              <a href="mailto:privacy@thyself.app" className="underline" style={{ color: "rgba(167,139,250,0.85)" }}>
                privacy@thyself.app
              </a>
              . We read every message and respond within a week.
            </p>
          </section>
        </div>

        <p className="text-[10px] text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
          Last updated: April 8, 2026
        </p>
      </div>
    </div>
  );
}
