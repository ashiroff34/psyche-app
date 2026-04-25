import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 2;
const wingNum = 1;
const color = TYPE_COLORS[typeNum];
const wingColor = TYPE_COLORS[wingNum];

export const metadata: Metadata = {
  title: "Enneagram 2w1 — The Servant: Traits, Growth & Identity | Thyself",
  description:
    "A complete guide to the Enneagram 2w1 — 'The Servant.' How the One wing shapes the Helper: more principled, self-disciplined, and service-oriented, with a clearer sense of what real help looks like. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram 2w1 — The Servant",
    description:
      "The 2w1 combines the Two's warmth and generosity with the One's ethical idealism. More selfless and principle-driven than the 2w3, the Servant gives from conviction, not just from the desire to be needed.",
    url: "https://thyself.app/enneagram/2w1",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/2w1" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 2w1 — The Servant: Traits, Growth & Identity",
  description:
    "How the One wing shapes Enneagram Type 2: more principled, self-disciplined, and service-oriented, with a clearer sense of ethical purpose.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/2w1",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/2w1" },
};

export default function Page2w1() {
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
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: wingColor }}>1</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">
              The Servant
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              The 2w1 combines Type Two&apos;s warmth, generosity, and desire to help with Type One&apos;s ethical idealism and sense of duty. More selfless and principle-driven than the 2w3, the Servant helps not only because they want to be needed, but because they genuinely believe service is what a good person does.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">

          {/* What the wing adds */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the One Wing Adds</h2>
            <p className="leading-relaxed text-gray-700">
              The One wing gives the Two&apos;s helping a principled dimension. While all Twos want to be needed and valued, the 2w1 also wants to help in the right way — to serve well, to give what is actually needed rather than what earns approval. There is a genuine ethical conviction beneath the helpfulness: they believe that caring for others is not merely a strategy for connection, but a moral responsibility.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The One wing also introduces greater self-discipline and orderliness. The 2w1 is often more organized, more structured, and more controlled than the 2w3. They are less likely to perform their giving in social settings and more likely to show up quietly, consistently, and without fanfare. Service for the 2w1 tends to be a private act rather than a public one.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The One wing also brings a more developed capacity for self-criticism. The 2w1 can be harder on themselves than on others — holding themselves to the standards that the One wing generates, and judging their own helpfulness, adequacy, and goodness more rigorously than most people around them would think to.
            </p>
          </section>

          {/* Core traits */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Traits of the 2w1</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Service from principle",
                  body: "The 2w1 helps because they believe in it, not only because it earns them connection. The One wing grounds their giving in a sense of ethical duty that the pure Two or 2w3 may not have as consistently.",
                },
                {
                  title: "Self-disciplined and organized",
                  body: "More structured and controlled than the 2w3. The 2w1 often brings considerable orderliness to their caregiving — they plan, follow through, and hold themselves accountable in ways that make them highly reliable.",
                },
                {
                  title: "Less flamboyant in their giving",
                  body: "Where the 2w3 may give with a theatrical quality — making their generosity visible — the 2w1 tends to help more quietly. The performance instinct of the Three wing is absent; the One wing would actually find overt self-promotion in giving slightly distasteful.",
                },
                {
                  title: "Self-critical",
                  body: "The 2w1 holds themselves to the One&apos;s high standard of goodness. They may feel genuine guilt about moments when they failed to help, were less than kind, or did not live up to their own conception of what a good person does.",
                },
                {
                  title: "Repression of personal needs",
                  body: "Like all Twos, the 2w1 has significant difficulty acknowledging and asking for what they themselves need. The One wing reinforces this: needing things can feel indulgent, selfish, or weak. The result is someone who can give enormously to others while quietly running on empty.",
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
                  The 2w1&apos;s giving is often the most genuinely selfless of the Two subtypes. Because their service is grounded in ethical conviction, it tends to be more sustainable, more consistent, and less dependent on receiving appreciation in return. They are among the most quietly reliable and trustworthy caregivers the Enneagram produces.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: wingColor }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: wingColor }}>Challenge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The 2w1 can become a martyr — someone who gives until they are depleted, and then turns that depletion into quiet resentment or self-righteous suffering. The One wing&apos;s internalized standards can make it very difficult to acknowledge the resentment directly, because resenting others for not reciprocating feels ungenerous. The unexpressed need accumulates.
                </p>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-2" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 — The Helper</Link>
              <Link href="/enneagram/type-1" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 — The Reformer</Link>
              <Link href="/enneagram/2w3" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">2w3 — The Host</Link>
              <Link href="/compatibility/enneagram-1/enneagram-2" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 + Type 2 Compatibility</Link>
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
