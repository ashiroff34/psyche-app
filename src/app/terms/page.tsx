import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service · Thyself",
  description: "The rules of using Thyself. Short and human.",
};

export default function TermsPage() {
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
          <h1 className="text-3xl font-serif font-bold mb-4" style={{ color: "rgba(255,255,255,0.93)" }}>
            Terms of Service
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
            By using Thyself you agree to be decent to yourself and to us. We provide the app, you use it responsibly. Nothing in this app is medical or psychological treatment. Don&apos;t rely on it to make life-or-death decisions.
          </p>
        </div>

        <div
          className="rounded-2xl p-6 mb-6 space-y-8"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <section>
            <h2 className="text-lg font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
              1. What Thyself is (and isn&apos;t)
            </h2>
            <div className="text-sm leading-relaxed space-y-2" style={{ color: "rgba(255,255,255,0.65)" }}>
              <p>
                Thyself is a self-reflection and personality exploration app grounded in the Enneagram, Jungian cognitive functions, and the Big Five model. It&apos;s for learning about yourself.
              </p>
              <p>
                Thyself <strong style={{ color: "rgba(255,255,255,0.85)" }}>is not</strong>:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Medical advice or mental health treatment</li>
                <li>A diagnostic tool</li>
                <li>A substitute for a therapist, counselor, or doctor</li>
                <li>A replacement for professional help if you are in crisis</li>
              </ul>
              <p className="pt-2">
                <strong style={{ color: "rgba(255,255,255,0.85)" }}>If you are in crisis</strong> or having thoughts of harming yourself, please contact your local emergency services or a crisis line (US: 988, UK: 116 123, or find yours at <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "rgba(167,139,250,0.85)" }}>findahelpline.com</a>).
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
              2. Account and access
            </h2>
            <div className="text-sm leading-relaxed space-y-2" style={{ color: "rgba(255,255,255,0.65)" }}>
              <p>
                Most of Thyself is free and works without an account. You&apos;re responsible for anything you do in the app. Don&apos;t use it to harass, impersonate, or harm anyone, including yourself.
              </p>
              <p>
                If you create an account with an email, you&apos;re responsible for keeping access to that email secure.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
              3. Purchases and refunds
            </h2>
            <div className="text-sm leading-relaxed space-y-2" style={{ color: "rgba(255,255,255,0.65)" }}>
              <p>
                If you buy tokens or a subscription, the purchase is processed by Stripe (or Apple/Google if in-app). All purchases are final unless required by law or platform policy.
              </p>
              <p>
                If something went wrong with a purchase, email <a href="mailto:support@thyself.app" className="underline" style={{ color: "rgba(167,139,250,0.85)" }}>support@thyself.app</a> within 30 days and we&apos;ll make it right.
              </p>
              <p>
                Subscriptions auto-renew until cancelled. You can cancel any time in your account settings or in the App Store / Google Play.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
              4. Your content stays yours
            </h2>
            <div className="text-sm leading-relaxed space-y-2" style={{ color: "rgba(255,255,255,0.65)" }}>
              <p>
                Anything you write in Thyself, journal entries, reflections, Mirror analyses, is yours. We don&apos;t claim ownership of any of it. We don&apos;t train AI on it. We don&apos;t share it.
              </p>
              <p>
                If you share an Identity Card publicly (e.g., to Instagram), that&apos;s your choice and your public post. We just generate the image.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
              5. The accuracy caveat (important)
            </h2>
            <div className="text-sm leading-relaxed space-y-2" style={{ color: "rgba(255,255,255,0.65)" }}>
              <p>
                The Enneagram, MBTI-style cognitive functions, and the Big Five are frameworks, not scientific diagnoses. Any type we give you is a starting point for self-exploration, not a verdict on who you are.
              </p>
              <p>
                The Mirror feature is an <em>approximation</em> based on published research (Yarkoni 2010, Newgent 2004). It&apos;s a second signal, not a second opinion from a psychologist. Don&apos;t make major life decisions based on what any quiz or any app tells you about yourself. Decisions like &ldquo;should I take this job&rdquo; or &ldquo;should I leave this relationship&rdquo; deserve more than an algorithm.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
              6. Limitation of liability
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Thyself is provided &ldquo;as is&rdquo;, without warranty. We&apos;re not liable for damages arising from your use of the app, to the maximum extent permitted by law. This is standard language, we mean it kindly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
              7. Changes
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              If we update these terms, we&apos;ll post the updated version here and update the date below. Material changes get an in-app notice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
              8. Contact
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Questions? <a href="mailto:support@thyself.app" className="underline" style={{ color: "rgba(167,139,250,0.85)" }}>support@thyself.app</a>. We read every message.
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
