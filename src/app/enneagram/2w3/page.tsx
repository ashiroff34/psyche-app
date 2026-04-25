import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 2;
const wingNum = 3;
const color = TYPE_COLORS[typeNum];
const wingColor = TYPE_COLORS[wingNum];

export const metadata: Metadata = {
  title: "Enneagram 2w3 — The Host: Traits, Growth & Identity | Thyself",
  description:
    "A complete guide to the Enneagram 2w3 — 'The Host.' How the Three wing shapes the Helper: more socially adept, achievement-oriented, and outwardly warm — someone who gives generously and thrives in the spotlight. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram 2w3 — The Host",
    description:
      "The 2w3 combines the Two's desire to help and connect with the Three's drive for success and social recognition. More outgoing, charming, and professionally ambitious than the 2w1.",
    url: "https://thyself.app/enneagram/2w3",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/2w3" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 2w3 — The Host: Traits, Growth & Identity",
  description:
    "How the Three wing shapes Enneagram Type 2: more socially adept, outgoing, and professionally driven, while still fundamentally oriented toward connection and helping others.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/2w3",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/2w3" },
};

export default function Page2w3() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Wing Subtype</p>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>2</span>
              <span className="text-xl font-light opacity-60">w</span>
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: wingColor }}>3</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">
              The Host
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              The 2w3 combines Type Two&apos;s warm, generous desire to connect and help with Type Three&apos;s drive for success, recognition, and social effectiveness. More outgoing and professionally ambitious than the 2w1, the Host moves through the world with confidence and charm — giving freely and thriving in the attention that follows.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">

          {/* What the wing adds */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Three Wing Adds</h2>
            <p className="leading-relaxed text-gray-700">
              The Three wing pulls the Two&apos;s giving into the social arena and gives it an achievement dimension. Where the 2w1 may serve quietly and from principle, the 2w3 performs their generosity in the world — hosting events, building networks, reaching people at scale. Their giving is real, but it is also part of a larger social project. Being known as generous, warm, and effective matters to the 2w3 in a way the 2w1 would find slightly uncomfortable.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Three wing brings social fluency and adaptability. The 2w3 reads their audience easily, adjusts their presentation instinctively, and tends to know what a room needs from them before being told. They are natural connectors and entertainers — people who make social situations feel effortless. This is partly Two&apos;s relational attunement and partly Three&apos;s capacity for effective self-presentation.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Three wing also introduces a stronger drive toward professional achievement. Many 2w3s build careers in fields that combine service and visibility — counseling, consulting, public relations, teaching, leadership, hospitality. They want to help and they want to be recognized for helping well. The 2w3 who achieves significant professional success is rarely surprised by it — they have been building toward it deliberately.
            </p>
          </section>

          {/* Core traits */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Traits of the 2w3</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Socially masterful",
                  body: "The 2w3 moves through social environments with ease. They know how to welcome people, how to make introductions, how to create connection in a room. Their warmth is genuine and their effectiveness is real — a rare combination.",
                },
                {
                  title: "Ambitious in service",
                  body: "The 2w3 does not simply want to help one person at a time — they often want to help at scale. Many are drawn to leadership, organizational work, or public-facing roles where their care can reach more people and be more visible.",
                },
                {
                  title: "Image-conscious",
                  body: "The Three wing makes the 2w3 more aware of how they are perceived than the 2w1. They care about being seen as competent, warm, and successful. The image of the giving, capable helper is one they consciously inhabit and protect.",
                },
                {
                  title: "Risk of conditional giving",
                  body: "Because the Three wing links giving with recognition, the 2w3 faces a subtle trap: their generosity can become more conditional than they consciously realize. When giving stops producing appreciation or recognition, the 2w3 may experience it as subtly unfair — even if they would not frame it that way.",
                },
                {
                  title: "Energized by connection",
                  body: "Unlike the more introverted 2w1, the 2w3 tends to be genuinely energized by social contact. They are often the person who orchestrates gatherings, remembers everyone&apos;s names, and moves through a large group making each individual feel seen.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color }}>{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Growth */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth and Challenge</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>Strength</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  At their best, the 2w3 creates warmth at scale — they are the person who makes large organizations feel human, who builds cultures of care, who ensures no one falls through the cracks. Their social intelligence and genuine warmth, combined with Three&apos;s effectiveness, produce remarkable results in service-oriented environments.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: wingColor }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: wingColor }}>Challenge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The 2w3&apos;s deepest challenge is distinguishing their genuine desire to help from their need for the recognition that follows. When helping is primarily a vehicle for being loved and admired, the giving loses its authenticity — and the 2w3 can eventually find themselves exhausted by a giving dynamic that does not actually feed them. Real growth involves learning to receive as well as give.
                </p>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-2" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 — The Helper</Link>
              <Link href="/enneagram/type-3" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 — The Achiever</Link>
              <Link href="/enneagram/2w1" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">2w1 — The Servant</Link>
              <Link href="/compatibility/enneagram-2/enneagram-3" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 + Type 3 Compatibility</Link>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Discover your Enneagram type and wing</h2>
            <p className="mb-6 text-base opacity-90">
              Wing subtypes are most meaningful when you know your core type with confidence. Take the free Thyself Enneagram Assessment to find out where you actually land.
            </p>
            <Link
              href="/assessments"
              className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ color }}
            >
              Start the assessment
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
