import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 3;
const wingNum = 2;
const color = TYPE_COLORS[typeNum];
const wingColor = TYPE_COLORS[wingNum];

export const metadata: Metadata = {
  title: "Enneagram 3w2 — The Charmer: Traits, Growth & Identity | Thyself",
  description:
    "A complete guide to the Enneagram 3w2 — 'The Charmer.' How the Two wing shapes the Achiever: more interpersonally warm, relationally invested, and genuinely oriented toward others — while still driven by achievement and image. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram 3w2 — The Charmer",
    description:
      "The 3w2 combines the Three's drive for success and recognition with the Two's warmth and people-orientation. The most interpersonally magnetic of the Three subtypes — charming, generous, and effective.",
    url: "https://thyself.app/enneagram/3w2",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/3w2" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 3w2 — The Charmer: Traits, Growth & Identity",
  description: "How the Two wing shapes Enneagram Type 3: warmer, more relationally invested, and genuinely oriented toward others while still driven by achievement.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/3w2",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/3w2" },
};

export default function Page3w2() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Wing Subtype</p>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>3</span>
              <span className="text-xl font-light opacity-60">w</span>
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: wingColor }}>2</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Charmer</h1>
            <p className="text-lg leading-relaxed opacity-90">
              The 3w2 brings Type Three&apos;s drive for achievement and recognition together with Type Two&apos;s genuine warmth and people-orientation. The most interpersonally magnetic of the Three subtypes — someone whose success is built through relationships as much as through competence.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Two Wing Adds</h2>
            <p className="leading-relaxed text-gray-700">The Two wing gives the Three access to genuine warmth. The 3w2 is not just effective — they are likable, and they know it. They care about the people around them in a real way, not only as means to achievement. The Two wing introduces a genuine orientation toward others: remembering details, offering help, making people feel seen. This interpersonal attunement is one of the 3w2&apos;s most valuable assets.</p>
            <p className="mt-4 leading-relaxed text-gray-700">The Two wing also links the Three&apos;s drive for success to the desire to be loved, not just admired. The 3w2 wants to win — but they want people to love them while they win. This is a more vulnerable ambition than the pure Three&apos;s, and it often makes the 3w2 more attractive as a person even as it creates more complexity in their relationship with success.</p>
            <p className="mt-4 leading-relaxed text-gray-700">Many 3w2s are drawn to people-facing professions where success is measured in terms of relationships and human outcomes: sales, leadership, politics, coaching, entertainment, public service. The blend of Three&apos;s effectiveness and Two&apos;s relational intelligence makes them formidable in any field that requires winning people over.</p>
          </section>
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Traits of the 3w2</h2>
            <div className="space-y-4">
              {[
                { title: "Interpersonally magnetic", body: "The 3w2 attracts people naturally. Their combination of competence, warmth, and genuine interest in others creates a powerful social presence. They move through rooms with ease, leaving people feeling valued." },
                { title: "Achievement through relationship", body: "The 3w2 often builds success through their network rather than through solo effort. They understand that people help people they like, and they invest in being likable with real intelligence." },
                { title: "Genuinely generous", body: "The Two wing introduces real generosity — not just as a strategy, but as a genuine orientation. The 3w2 remembers what people need, volunteers help, and genuinely cares about others&apos; success within their own success orbit." },
                { title: "Image-conscious about warmth itself", body: "The 3w2 can become image-conscious about their generosity and warmth — presenting the appearance of caring even when the genuine feeling has faded. This is one of the more subtle traps of this subtype: performing connection rather than inhabiting it." },
                { title: "Emotional availability is real but selective", body: "Unlike the pure Three who may disconnect from emotion entirely, the 3w2 has more access to feeling — particularly feelings related to connection and approval. They are genuinely moved by appreciation and genuinely hurt by rejection, in ways that the 3w4 may not be." },
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
                <p className="text-sm leading-relaxed text-gray-700">At their best, the 3w2 is genuinely transformative in people-facing roles. Their warmth is real, their competence is real, and their ability to make others feel seen while getting things done is rare. They build organizations, movements, and communities that work — and that people want to be part of.</p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: wingColor }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: wingColor }}>Challenge</p>
                <p className="text-sm leading-relaxed text-gray-700">The 3w2 risks becoming a very effective surface — charming and successful in ways that do not require genuine contact with their own interior. The Two wing&apos;s need for approval and the Three&apos;s disconnection from feeling can combine into a presentation of warmth and care that has lost touch with what it was originally grounded in.</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-3" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 — The Achiever</Link>
              <Link href="/enneagram/type-2" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 — The Helper</Link>
              <Link href="/enneagram/3w4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">3w4 — The Professional</Link>
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
