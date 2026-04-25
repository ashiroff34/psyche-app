import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 4;
const color = TYPE_COLORS[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 4 at Work — The Individualist in the Workplace | Thyself",
  description:
    "How Enneagram Type 4 operates professionally: their creative depth and need for meaningful work, the pattern of comparing and feeling deficient, leadership style, and where they thrive. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 4 at Work — The Individualist in the Workplace",
    description:
      "The Type 4 brings originality, depth, and an unwillingness to produce anything generic. The professional challenge is channeling their emotional intensity into sustained, practical output — rather than waiting for inspiration.",
    url: "https://thyself.app/enneagram/type-4/work",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-4/work" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 4 at Work — The Individualist in the Workplace",
  description: "How the Enneagram Type 4 operates professionally: creative depth, comparative thinking, leadership, and ideal environments.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-4/work",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-4/work" },
};

export default function Type4Work() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type 4</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Individualist at Work</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Type 4s bring something to the workplace that no amount of efficiency optimization produces: originality. They refuse to produce the generic version of anything, they bring their whole emotional intelligence to bear on their work, and the things they create — at their best — have a quality of authenticity and depth that distinguishes them immediately from the standard output.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Type 4 as a Professional</h2>
            <p className="leading-relaxed text-gray-700">
              Type 4s need their work to mean something. They cannot sustain themselves in roles that feel generic, routine, or disconnected from what they care about. When they find work that engages their depth — creative work, therapeutic work, research that feels genuinely original, design that allows for real aesthetic investment — they can be extraordinary: producing work of uncommon quality and bringing a level of commitment that purely externally motivated workers cannot match.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Four&apos;s emotional intelligence is a genuine professional asset in the right roles. They understand nuance, they read beneath what is being said, and they bring a depth of human understanding to their interactions and their work that more cognitively oriented types miss. In fields where understanding the human experience is central — therapy, narrative work, design, research into human behavior, teaching — this is irreplaceable.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The professional challenge is the Four&apos;s relationship to productivity. They tend to work in waves — periods of intense engagement followed by periods where inspiration has not yet arrived and the work feels forced and inauthentic. Learning to work consistently — to meet professional obligations even when inspiration is absent — is one of the most important practical developments for the Type 4 professional.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Key Professional Traits</h2>
            <div className="space-y-4">
              {[
                { title: "Deeply creative and original", body: "Type 4s resist the template. They will find the angle that has not been taken, the approach that distinguishes the work from everything else in the field. This creative originality is their primary professional contribution and is what makes the Four&apos;s best work genuinely irreplaceable." },
                { title: "High standards for authenticity", body: "Fours apply their standard of authenticity to their work as well as to their identity. They will not produce work they consider shallow, generic, or dishonest — which makes them resistant to certain kinds of organizational pressure, and valuable as a corrective to the drive toward the safe and marketable." },
                { title: "Emotionally perceptive", body: "The Four&apos;s emotional intelligence gives them access to layers of meaning and human complexity that more analytically oriented types do not perceive. This translates into work that resonates at a level below the explicit, and into interpersonal interactions that feel genuinely attuned rather than merely competent." },
                { title: "Vulnerability to comparison and envy", body: "Fours have a tendency to compare their work and their position to others, and to find themselves deficient in the comparison. This can generate both productive drive and counterproductive despair — the sense that everyone else is further along, more successful, more naturally gifted. Managing this tendency is an ongoing professional task for the Four." },
                { title: "Struggles with routine and the ordinary", body: "The parts of professional life that are repetitive, bureaucratic, or devoid of meaning are genuinely difficult for Fours. Administrative tasks, rote deliverables, and processes that do not engage their depth feel like a kind of slow suffocation. They need to find meaning in their work, or at least in enough of their work to sustain them through the parts that lack it." },
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
                  Type 4 leaders bring genuine vision, emotional attunement, and a refusal to settle for the ordinary. They create space for authenticity and depth in their teams, and they see their people at a level of individuality that more task-focused leaders miss. The challenge is managing the emotional intensity that can make their leadership feel unpredictable, and developing the practical consistency that teams need alongside the inspiration the Four naturally provides.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">Ideal environment</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Type 4s thrive in environments that value originality, depth, and authenticity — where the standard output is not sufficient and something more is expected and valued. They struggle in highly regimented, production-line environments where individual expression is irrelevant. Autonomy, meaningful work, room for creative investment, and colleagues who engage seriously rather than superficially are the conditions under which the Four&apos;s best work emerges.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Common Professions</h2>
            <p className="leading-relaxed text-gray-700">
              Type 4s gravitate toward work that allows for creative depth and authentic expression: fine arts, writing, design and architecture, music and performance, psychotherapy and counseling, film and narrative media, photography, research and academia (particularly humanities and interpretive social sciences), and any field where the goal is to produce something genuinely new rather than to execute on an established template.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 — The Individualist</Link>
              <Link href="/enneagram/type-4/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 in Relationships</Link>
              <Link href="/enneagram/4w3" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">4w3 — The Aristocrat</Link>
              <Link href="/enneagram/4w5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">4w5 — The Bohemian</Link>
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
