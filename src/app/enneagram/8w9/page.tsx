import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 8;
const wingNum = 9;
const color = TYPE_COLORS[typeNum];
const wingColor = TYPE_COLORS[wingNum];

export const metadata: Metadata = {
  title: "Enneagram 8w9 — The Bear: Traits, Growth & Identity | Thyself",
  description:
    "A complete guide to the Enneagram 8w9 — 'The Bear.' How the Nine wing shapes the Challenger: calmer, more patient, and deeply steady — enormous strength that does not need to announce itself. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram 8w9 — The Bear",
    description:
      "The 8w9 combines the Eight's strength and authority with the Nine's patience and groundedness. More contained and internally steady than the 8w7 — a presence of enormous force that rarely needs to raise its voice.",
    url: "https://thyself.app/enneagram/8w9",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/8w9" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 8w9 — The Bear: Traits, Growth & Identity",
  description: "How the Nine wing shapes Enneagram Type 8: calmer, more patient, and more internally grounded — enormous strength that does not announce itself.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/8w9",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/8w9" },
};

export default function Page8w9() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Wing Subtype</p>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>8</span>
              <span className="text-xl font-light opacity-60">w</span>
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: wingColor }}>9</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Bear</h1>
            <p className="text-lg leading-relaxed opacity-90">
              The 8w9 brings the Eight&apos;s enormous strength and protective instinct inward — calmer, more patient, and more grounded than the 8w7. The Nine wing does not diminish the Eight&apos;s power; it makes it quieter and more steady. The Bear does not need to roar to be felt.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Nine Wing Adds</h2>
            <p className="leading-relaxed text-gray-700">The Nine wing gives the Eight access to patience, groundedness, and a capacity to hold their force in reserve rather than constantly deploying it. The 8w9 does not lead with their strength — it is simply there, reliable and unmistakable, available when needed. This makes them often more effective than the louder 8w7: they do not need to dominate every situation, and so they are trusted in more of them.</p>
            <p className="mt-4 leading-relaxed text-gray-700">The Nine wing also makes the 8w9 more receptive and calmer in ordinary situations. They have the Eight&apos;s directness and force but are not perpetually mobilized for conflict. They can wait. They can listen. They can be in a room without needing to control it. This Nine-like capacity for presence and patience — rare in an Eight — gives the 8w9 a quality of authority that does not require aggression.</p>
            <p className="mt-4 leading-relaxed text-gray-700">The Nine wing also introduces a deeper connection to comfort, ease, and enjoyment of simple pleasures. The 8w9 is often more sensual and physically grounded than the 8w7 — they enjoy food, rest, nature, and the pleasures of ordinary life in a way that feels authentically comfortable rather than like a break from their real intensity.</p>
          </section>
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Traits of the 8w9</h2>
            <div className="space-y-4">
              {[
                { title: "Calm and steady", body: "The 8w9 does not move through the world with the 8w7&apos;s high-energy expansiveness. They are more internally settled, more patient, and more comfortable with silence. Their authority comes from groundedness rather than volume." },
                { title: "Protective without being aggressive", body: "The 8w9 is often deeply protective of the people and values they love — but their protection tends to be steady and reliable rather than confrontational. They do not pick fights; they simply hold ground when it matters." },
                { title: "Immovable under pressure", body: "The Eight&apos;s resistance to being controlled and the Nine&apos;s inertia combine into someone who is extraordinarily difficult to move once they have settled into a position. The 8w9&apos;s stubbornness is legendary." },
                { title: "Sensual and grounded in the physical world", body: "The 8w9 tends to be more connected to physical pleasure and comfort than the 8w7. They enjoy good food, physical rest, and the pleasures of a well-managed domain. Their relationship to their body tends to be more relaxed and accepting." },
                { title: "Anger that is slower to surface", body: "The Nine wing&apos;s tendency to disconnect from anger means the 8w9 can accumulate considerable frustration before it surfaces. When it does, the intensity can be surprising — but it is rarely as frequent or as immediate as the 8w7&apos;s more regularly expressed force." },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color }}>{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth and Challenge</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>Strength</p>
                <p className="text-sm leading-relaxed text-gray-700">The 8w9 often becomes the most trusted kind of authority — someone whose strength is real but not threatening, whose presence is grounding rather than dominating. They can lead without needing to control, protect without needing to conquer, and hold space without needing to fill it. This is rare and genuinely valuable.</p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: wingColor }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: wingColor }}>Challenge</p>
                <p className="text-sm leading-relaxed text-gray-700">The 8w9 can become entrenched — using the Nine wing&apos;s inertia to avoid changes they do not want to make. Their stubbornness, combined with the Eight&apos;s resistance to being controlled, can make them very difficult to move on things that have become comfortable. The capacity for patience can become the refusal to act when action is needed.</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 — The Challenger</Link>
              <Link href="/enneagram/type-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 9 — The Peacemaker</Link>
              <Link href="/enneagram/8w7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">8w7 — The Maverick</Link>
            </div>
          </section>
          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Discover your Enneagram type and wing</h2>
            <p className="mb-6 text-base opacity-90">Take the free Thyself Enneagram Assessment to find out where you actually land.</p>
            <Link href="/assessments" className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90" style={{ color }}>Start the assessment</Link>
          </section>
        </div>
      </main>
    </>
  );
}
