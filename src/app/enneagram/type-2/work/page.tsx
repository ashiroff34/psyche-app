import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 2;
const color = TYPE_COLORS[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 2 in the Workplace — The Helper as a Colleague | Thyself",
  description:
    "How Enneagram Type 2 operates professionally: their gift for relationships and support, the pattern of over-involvement, leadership style, and where they thrive at work. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 2 in the Workplace — The Helper as a Colleague",
    description:
      "The Type 2 builds the relational fabric of any organization. Understanding their need to be needed — and the resentment that builds when it goes unacknowledged — is essential to working with them well.",
    url: "https://thyself.app/enneagram/type-2/work",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-2/work" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 2 in the Workplace — The Helper as a Colleague",
  description: "How the Enneagram Type 2 operates professionally: relational gifts, over-involvement patterns, leadership style, and ideal work environments.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-2/work",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-2/work" },
};

export default function Type2Work() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type 2</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Helper at Work</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Type 2s are the people who hold organizations together in ways that no one fully perceives until they leave. They build the relational infrastructure — the goodwill, the trust, the informal support networks — that enable everything else to function. Their professional challenge is learning to receive recognition, set limits, and work from genuine purpose rather than from the need to be indispensable.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Type 2 as a Professional</h2>
            <p className="leading-relaxed text-gray-700">
              In the workplace, Type 2s are defined by their attention to the people around them. They notice who is struggling, who needs support, who has been overlooked. They build genuine relationships across organizational levels — not strategically, but because they are genuinely interested in people. This relational intelligence is one of the most undervalued professional assets, and organizations with strong Twos tend to have better morale, lower turnover, and more functional communication than those without.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Two&apos;s gift for anticipating others&apos; needs translates directly into excellent support and service roles. They are often found in teaching, healthcare, social work, human resources, counseling, and organizational roles where their attunement to people is directly useful. But they also function well in client-facing and leadership roles, where their relationship-building capacity creates loyalty and trust that more task-focused types cannot easily generate.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              What the Two needs to be careful of professionally is the drift toward over-function — taking on more than their role requires, doing things for others that those people could do themselves, and building an identity around being indispensable in ways that create resentment when the indispensability goes unacknowledged.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Key Professional Traits</h2>
            <div className="space-y-4">
              {[
                { title: "Exceptional interpersonal intelligence", body: "Type 2s read the room better than anyone in most organizations. They know who is unhappy before the manager does, they understand the interpersonal dynamics that are invisible to task-focused colleagues, and they navigate political complexity with a kind of social fluency that is genuinely rare." },
                { title: "Collaborative and generous", body: "Twos are among the most genuinely collaborative workers. They share credit, support their colleagues&apos; success, and bring warmth to group dynamics that can become cold under professional pressure. They are often the person who makes a team actually function as a team rather than a collection of competing individuals." },
                { title: "Service orientation that can become over-extension", body: "The Two&apos;s impulse to help can lead them to take on work that is not theirs, to stay late to help colleagues who have not asked for help, and to accumulate obligations that leave them depleted and resentful. Learning to help from genuine choice rather than from anxious necessity is a key professional development for the Two." },
                { title: "Struggle with direct self-advocacy", body: "Twos are excellent advocates for others but often poor advocates for themselves. They find it difficult to ask for what they need — resources, recognition, time, compensation — and may wait for it to be offered rather than requesting it directly. This can leave them professionally under-compensated and frustrated." },
                { title: "Sensitive to feeling unappreciated", body: "The Two who feels their contributions are being taken for granted will become subtly less engaged, warmer in person but less invested behind the scenes, and eventually may exit entirely — often surprising colleagues who did not realize how much the Two was contributing because it was done so quietly and without self-promotion." },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color }}>{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Leadership Style and Work Environment</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>As a leader</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Type 2 leaders are relational leaders — they invest in their people, know their teams well, and create environments of genuine trust and warmth. Their teams tend to feel cared for and supported. The challenge is setting clear expectations and holding people accountable — the Two&apos;s discomfort with conflict can lead to overlooking underperformance in order to preserve the relationship, which ultimately serves no one.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">Ideal environment</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Type 2s thrive in environments where their relational contributions are recognized and valued — where people genuinely matter, not just as resources, but as people. They struggle in purely transactional, metric-driven cultures where human connection is treated as irrelevant to performance. Recognition, gratitude, and a sense that their work has genuine impact on actual people are the conditions under which the Two does their best work.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Common Professions</h2>
            <p className="leading-relaxed text-gray-700">
              Type 2s are drawn to work where they can directly help people. Common career paths include nursing and medicine, social work and counseling, teaching and educational leadership, human resources, nonprofit management, client services and account management, organizational development, coaching, and community organizing. Many Twos also find their way into supporting roles in organizations whose mission they believe in — where they can use their relational skills in service of a purpose that matters to them.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-2" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 — The Helper</Link>
              <Link href="/enneagram/type-2/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 in Relationships</Link>
              <Link href="/enneagram/2w1" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">2w1 — The Servant</Link>
              <Link href="/enneagram/2w3" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">2w3 — The Host</Link>
            </div>
          </section>

          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Find out your Enneagram type</h2>
            <p className="mb-6 text-base opacity-90">Take the free Thyself Enneagram Assessment — understand what drives you at work and everywhere else.</p>
            <Link href="/assessments" className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90" style={{ color }}>Start the assessment</Link>
          </section>
        </div>
      </main>
    </>
  );
}
