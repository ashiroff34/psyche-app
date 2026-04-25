import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 6;
const wingNum = 5;
const color = TYPE_COLORS[typeNum];
const wingColor = TYPE_COLORS[wingNum];

export const metadata: Metadata = {
  title: "Enneagram 6w5 — The Defender: Traits, Growth & Identity | Thyself",
  description:
    "A complete guide to the Enneagram 6w5 — 'The Defender.' How the Five wing shapes the Loyalist: more introverted, analytical, and self-reliant — building security through knowledge and careful preparation rather than alliances alone. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram 6w5 — The Defender",
    description:
      "The 6w5 combines the Six's search for security and loyalty with the Five's analytical self-sufficiency. More inward and intellectually rigorous than the 6w7, the Defender prepares carefully and trusts selectively.",
    url: "https://thyself.app/enneagram/6w5",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/6w5" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 6w5 — The Defender: Traits, Growth & Identity",
  description: "How the Five wing shapes Enneagram Type 6: more introverted, analytical, and self-reliant in building security and trust.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/6w5",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/6w5" },
};

export default function Page6w5() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Wing Subtype</p>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>6</span>
              <span className="text-xl font-light opacity-60">w</span>
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: wingColor }}>5</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Defender</h1>
            <p className="text-lg leading-relaxed opacity-90">
              The 6w5 builds security through knowledge, preparation, and careful selection of trustworthy allies. More inward and analytically self-reliant than the 6w7, the Defender does not seek reassurance through social warmth — they seek it through competence, information, and systematic preparation.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Five Wing Adds</h2>
            <p className="leading-relaxed text-gray-700">The Five wing gives the Six an intellectual dimension to their security-building. Where the 6w7 manages anxiety through social warmth and forward momentum, the 6w5 manages it through research, analysis, and accumulated knowledge. They want to understand how things work, what the real risks are, and what can be done to prepare. Information is security.</p>
            <p className="mt-4 leading-relaxed text-gray-700">The Five wing also makes the 6w5 more introverted and self-reliant than the socially oriented 6w7. They are less likely to reach for connection when anxious — more likely to retreat into analysis. They trust their own research and conclusions more readily than they trust the reassurances of others. This gives them a certain independence of mind, even as the Six in them continues to doubt that mind.</p>
            <p className="mt-4 leading-relaxed text-gray-700">The Five wing introduces a tendency to be more guarded and selective in trust. The 6w5 does not extend loyalty widely — they build it slowly, carefully, to a small circle of people they have thoroughly assessed. Once that trust is established, it is genuine and durable. But it takes longer to earn, and the screening process is more rigorous than the warmer 6w7 would apply.</p>
          </section>
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Traits of the 6w5</h2>
            <div className="space-y-4">
              {[
                { title: "Analytically oriented", body: "The 6w5 manages fear through thinking. They research, analyze, and build mental models of how things work — as a way of making the world predictable and therefore manageable. Their intellectual life is inseparable from their security strategy." },
                { title: "Introverted and reserved", body: "Less socially outgoing than the 6w7. The 6w5 tends to be more selective about who they open up to, more comfortable in small groups or one-on-one settings, and more likely to need solitude to process and recover." },
                { title: "Highly competent and prepared", body: "The combination of Six&apos;s conscientiousness and Five&apos;s knowledge depth makes the 6w5 exceptionally thorough in their preparation. They often know more about their area of concern than anyone expects, and their planning accounts for contingencies others would miss." },
                { title: "Skeptical and questioning", body: "The 6w5 does not easily accept what they are told. They want to understand why something is true, what the underlying assumptions are, and whether the authority making the claim can be trusted. This can make them excellent critical thinkers and genuinely difficult to manipulate." },
                { title: "Loyal within a carefully selected circle", body: "Once the 6w5 has extended genuine trust to someone, they are fiercely loyal — perhaps more consistently than any other Six subtype. But the circle of trust is small and the selection process is slow." },
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
                <p className="text-sm leading-relaxed text-gray-700">The 6w5 combines genuine intellectual depth with exceptional reliability. Their careful, systematic approach to trust and commitment means that when they give their loyalty, it means something real. They are among the most dependable and well-prepared of the Enneagram types.</p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: wingColor }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: wingColor }}>Challenge</p>
                <p className="text-sm leading-relaxed text-gray-700">The 6w5 can become isolated in their vigilance — researching threats so thoroughly and screening relationships so carefully that genuine connection rarely happens. The Five wing&apos;s withdrawal combines with the Six&apos;s doubt to produce someone who is very hard to get close to, even though they genuinely want connection.</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 — The Loyalist</Link>
              <Link href="/enneagram/type-5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 — The Investigator</Link>
              <Link href="/enneagram/6w7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">6w7 — The Buddy</Link>
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
