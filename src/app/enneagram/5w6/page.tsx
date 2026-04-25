import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 5;
const wingNum = 6;
const color = TYPE_COLORS[typeNum];
const wingColor = TYPE_COLORS[wingNum];

export const metadata: Metadata = {
  title: "Enneagram 5w6 — The Problem Solver: Traits, Growth & Identity | Thyself",
  description:
    "A complete guide to the Enneagram 5w6 — 'The Problem Solver.' How the Six wing shapes the Investigator: more systematic, collaborative, and concerned with real-world application — knowledge in service of reliability and security. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram 5w6 — The Problem Solver",
    description:
      "The 5w6 combines the Five's analytical depth with the Six's reliability and concern for real-world application. More systematic, collaborative, and pragmatically oriented than the 5w4.",
    url: "https://thyself.app/enneagram/5w6",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/5w6" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 5w6 — The Problem Solver: Traits, Growth & Identity",
  description: "How the Six wing shapes Enneagram Type 5: more systematic, collaborative, and concerned with real-world application of knowledge.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/5w6",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/5w6" },
};

export default function Page5w6() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Wing Subtype</p>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>5</span>
              <span className="text-xl font-light opacity-60">w</span>
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: wingColor }}>6</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Problem Solver</h1>
            <p className="text-lg leading-relaxed opacity-90">
              The 5w6 brings the Five&apos;s analytical depth and self-sufficiency together with the Six&apos;s systematic thinking and concern for reliability. More pragmatic and collaborative than the 5w4, the Problem Solver wants knowledge that actually works — that can be tested, applied, and trusted.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Six Wing Adds</h2>
            <p className="leading-relaxed text-gray-700">The Six wing gives the Five&apos;s intellectual pursuit a more systematic and application-oriented character. Where the 5w4 is drawn toward ideas that are personally meaningful and aesthetically rich, the 5w6 is drawn toward ideas that are reliable and useful — that can be verified, that have clear foundations, and that can help them navigate the world with greater security and competence.</p>
            <p className="mt-4 leading-relaxed text-gray-700">The Six wing also makes the 5w6 somewhat more collaborative and socially engaged than the 5w4. They are more likely to work within institutions, to value the accumulated wisdom of communities and traditions (even while also questioning them), and to build networks of trusted advisors and sources. The Six&apos;s relational orientation tempers the Five&apos;s pure self-sufficiency — they actually want allies, even if they do not admit this easily.</p>
            <p className="mt-4 leading-relaxed text-gray-700">The Six wing also brings more active anxiety management to the Five&apos;s already cautious worldview. The 5w6 tends to be more aware of potential threats and failure modes than the 5w4 — they are drawn to contingency planning, worst-case scenario analysis, and building redundant systems for managing uncertainty. At their best, this produces exceptional reliability. At their worst, it feeds a paranoid tendency to see threats everywhere.</p>
          </section>
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Traits of the 5w6</h2>
            <div className="space-y-4">
              {[
                { title: "Systematic and methodical", body: "The 5w6 builds knowledge carefully and systematically. They do not like to rush to conclusions, skip steps, or work from hunches. They want a solid foundation — verified, consistent, and replicable." },
                { title: "Practically oriented", body: "The Six wing makes the 5w6 more concerned with application than the 5w4. They want to know things that can actually be used — to solve problems, to navigate situations, to build something that works." },
                { title: "More collaborative than typical Fives", body: "The 5w6 is more willing to work within teams, institutions, and shared frameworks than the more iconoclastic 5w4. They value trusted relationships and may seek out mentors, advisors, and reliable colleagues as part of their knowledge-building strategy." },
                { title: "Highly competent", body: "The combination of the Five&apos;s depth of knowledge and the Six&apos;s reliability and follow-through makes the 5w6 one of the most practically competent subtypes on the Enneagram. They do what they say they will do, and they know what they are doing." },
                { title: "Anxious about uncertainty", body: "The Six wing amplifies the Five&apos;s natural caution into something closer to active vigilance. The 5w6 can be quite worried about things going wrong — which drives their careful preparation, but can also produce decision paralysis when the uncertainty cannot be eliminated." },
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
                <p className="text-sm leading-relaxed text-gray-700">The 5w6 is often extraordinarily reliable and competent — someone whose analytical depth is matched by follow-through and real-world effectiveness. They are natural engineers, scientists, researchers, and technical experts who deliver what they promise.</p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: wingColor }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: wingColor }}>Challenge</p>
                <p className="text-sm leading-relaxed text-gray-700">The 5w6&apos;s combination of Five&apos;s caution and Six&apos;s anxiety can produce significant hesitation and risk-aversion. They can prepare endlessly without acting, analyze without concluding, and protect against failure so thoroughly that they never launch the thing they have been building toward.</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 — The Investigator</Link>
              <Link href="/enneagram/type-6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 — The Loyalist</Link>
              <Link href="/enneagram/5w4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">5w4 — The Iconoclast</Link>
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
