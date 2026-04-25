import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 9;
const wingNum = 1;
const color = TYPE_COLORS[typeNum];
const wingColor = TYPE_COLORS[wingNum];

export const metadata: Metadata = {
  title: "Enneagram 9w1 — The Dreamer: Traits, Growth & Identity | Thyself",
  description:
    "A complete guide to the Enneagram 9w1 — 'The Dreamer.' How the One wing shapes the Peacemaker: more principled, idealistic, and concerned with doing what is right — while still fundamentally seeking inner peace and harmony. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram 9w1 — The Dreamer",
    description:
      "The 9w1 combines the Nine's desire for peace with the One's idealism and ethical concern. More inward, refined, and principled than the 9w8 — and more likely to be guided by a quiet but firm sense of what ought to be.",
    url: "https://thyself.app/enneagram/9w1",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/9w1" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 9w1 — The Dreamer: Traits, Growth & Identity",
  description:
    "How the One wing shapes Enneagram Type 9: more principled, idealistic, and ethically concerned, while still fundamentally seeking peace and harmony.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/9w1",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/9w1" },
};

export default function Page9w1() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Wing Subtype</p>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>9</span>
              <span className="text-xl font-light opacity-60">w</span>
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: wingColor }}>1</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">
              The Dreamer
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              The 9w1 combines Type Nine&apos;s deep longing for peace and harmony with Type One&apos;s ethical idealism and principled orientation. Quieter and more inwardly refined than the 9w8, the Dreamer is guided by a clear sense of how things ought to be — even if they rarely impose that vision on others.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">

          {/* What the wing adds */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the One Wing Adds</h2>
            <p className="leading-relaxed text-gray-700">
              The One wing gives the Nine access to a moral and aesthetic compass that the type often lacks on its own. Where the pure Nine can dissolve into whatever their environment asks of them — losing themselves in others&apos; agendas, opinions, and needs — the 9w1 maintains an inner standard. They know what they think is right. They have a sense of how things should be, what constitutes a good life, what matters. This One-wing idealism gives the Nine a quiet backbone.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The One wing also brings refinement and attention to quality. The 9w1 is often drawn to beauty, order, and craftsmanship — in their environment, their work, and their relationships. They are not the sprawling, expansive Nine who can be comfortable with chaos; they prefer things arranged well. There is a stillness and an aesthetic sensitivity in many 9w1s that reflects the One&apos;s perfectionist attention combined with the Nine&apos;s appreciation for calm.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The One wing also introduces a more developed conscience. The 9w1 is not only oriented toward peace — they are oriented toward the right kind of peace. They are less able than the 9w8 to simply accommodate whatever is in front of them. There are things they simply cannot do because it would violate their sense of what is acceptable, even if they do not loudly announce this.
            </p>
          </section>

          {/* Core traits */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Traits of the 9w1</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Principled and idealistic",
                  body: "The 9w1 holds quiet but firm ethical standards. They may not impose these on others, but they live by them. Integrity — doing what they believe is right, even when it is inconvenient — matters to them in a way that reflects the One wing's deep concern with goodness.",
                },
                {
                  title: "Inwardly refined",
                  body: "Many 9w1s have an aesthetic or spiritual sensibility that they have developed quietly and carefully. They are drawn to beauty, order, and meaning — in art, in nature, in ideas, in their personal space. The One wing's perfectionism appears here not as harsh self-criticism but as an eye for quality.",
                },
                {
                  title: "Diplomatic and conflict-averse",
                  body: "More than the 9w8, the 9w1 tends to avoid direct confrontation. The One wing adds an additional layer of conflict-aversion: not only does the Nine dislike disrupting harmony, but the One doesn't want to be seen as unkind or judgmental. The result is someone who communicates indirectly and often suppresses their own displeasure.",
                },
                {
                  title: "Slow to anger, but judgment is present",
                  body: "The 9w1 does not often express anger directly — but the One wing's critical faculty is active beneath the surface. They notice when things are wrong. They have opinions about how people should behave. They simply tend not to voice these as directly as the 9w8 might.",
                },
                {
                  title: "Drawn toward service and purpose",
                  body: "The combination of the Nine's care for others and the One's drive toward meaningful contribution often leads the 9w1 toward service, teaching, counseling, or other work that allows them to contribute to something larger than themselves while maintaining a quiet, purposeful role.",
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
                  The 9w1 often embodies a kind of ethical gentleness that is rare and genuinely valuable. They bring care, integrity, and a quiet nobility to everything they do. They are among the most naturally trustworthy of the Nine subtypes — their inner compass is real, and they act from it consistently.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: wingColor }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: wingColor }}>Challenge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The 9w1 can become quietly resentful — holding standards they do not express, accumulating disappointments they do not voice. The combination of the Nine&apos;s suppressed anger and the One&apos;s internalized criticism creates someone who can seem perfectly calm while carrying significant unexpressed frustration. Learning to surface these feelings directly is a core growth task.
                </p>
              </div>
            </div>
          </section>

          {/* How to identify */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">How to Identify a 9w1</h2>
            <p className="leading-relaxed text-gray-700">
              The 9w1 can look like a relaxed, gentle One — someone principled but without the One&apos;s typical edge of frustration or urgency. The distinction is in the fundamental motivation: the One is driven by the need to be good and to make things right; the 9w1 is driven by the need for inner and outer peace. The One&apos;s criticism is usually more visible, more urgent, and more directed outward. The 9w1 holds their standards inwardly and is far less likely to voice them directly.
            </p>
          </section>

          {/* Navigation */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 9 — The Peacemaker</Link>
              <Link href="/enneagram/type-1" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 — The Reformer</Link>
              <Link href="/enneagram/9w8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">9w8 — The Referee</Link>
              <Link href="/compatibility/enneagram-9/enneagram-1" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 9 + Type 1 Compatibility</Link>
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
