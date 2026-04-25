import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 1;
const color = TYPE_COLORS[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 1 at Work — The Reformer in the Workplace | Thyself",
  description:
    "How Enneagram Type 1 operates professionally: their drive for quality and integrity, the perfectionism that can become a liability, leadership style, and ideal work environments. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 1 at Work — The Reformer in the Workplace",
    description:
      "The Type 1 brings high standards, meticulous attention, and genuine commitment to doing things right. Understanding their perfectionism is the key to working with them effectively.",
    url: "https://thyself.app/enneagram/type-1/work",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-1/work" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 1 at Work — The Reformer in the Workplace",
  description: "How the Enneagram Type 1 operates professionally: standards, perfectionism, leadership, and ideal environments.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-1/work",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-1/work" },
};

export default function Type1Work() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type 1</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Reformer at Work</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Type 1s bring an unusual combination of ethical clarity, attention to detail, and genuine commitment to doing things right. They are not trying to impress — they are trying to meet a standard they hold as genuinely important. This makes them some of the most reliably excellent workers in any organization.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Type 1 as a Professional</h2>
            <p className="leading-relaxed text-gray-700">
              In the workplace, Type 1s are defined by their standards. They do not cut corners. They read the documentation. They notice the error in the report that everyone else missed. Their work has a quality of thoroughness and integrity that reflects an internal standard — the One is not performing competence for an audience; they are meeting a requirement they have imposed on themselves because they believe it is right.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              This makes them extraordinarily valuable in roles that require precision, consistency, and ethical clarity. Quality assurance, legal and compliance work, financial audit, editing, research, policy development — these are environments where the One&apos;s standards are a feature rather than a source of friction. They are the person you want reviewing the work before it goes out, the person you trust to catch what was missed.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Type 1s are also often deeply principled advocates for the right way of doing things — not out of rigidity, but out of genuine belief that there is a better way and that it matters to find it. They will push back on processes that seem wrong, raise concerns that others have noticed but not said aloud, and sometimes absorb the social cost of being the person who names what no one wanted to name.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Key Professional Traits</h2>
            <div className="space-y-4">
              {[
                { title: "Meticulous and thorough", body: "The Type 1 will notice the discrepancy in the data, the inconsistency in the argument, the error in the final draft. Their attention to detail is not anxious — it is systematic. They work through things carefully because that is what quality requires." },
                { title: "Principled under pressure", body: "When organizational culture pushes for shortcuts or ethical corners, the Type 1 resists. They will raise the concern, sometimes at personal cost. They are not trying to be difficult; they are applying the same standard to professional decisions that they apply to everything else." },
                { title: "Productive but can over-invest", body: "Ones are often highly productive — but can spend too long on a task trying to make it perfect rather than good enough. The impulse toward perfection can actually reduce output if it is not managed consciously. Learning to distinguish between what requires excellence and what requires adequacy is an important professional development for the One." },
                { title: "Critical of substandard work", body: "The One&apos;s inner critic has a tendency to extend outward. They notice what is wrong with other people&apos;s work and sometimes say so in ways that land harder than they intended. They are often surprised by how their feedback is received, because they are applying the same standard to others that they apply to themselves — a standard that most people find extremely demanding." },
                { title: "Responsible and accountable", body: "Type 1s take their professional responsibilities extremely seriously. They follow through, meet deadlines, and take ownership of their errors rather than deflecting responsibility. This reliability makes them trusted colleagues and valued employees." },
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
                  Type 1 leaders set clear standards and hold their teams to them. They lead by example — doing the work to the level of quality they expect from others. They are fair, consistent, and genuinely invested in their team&apos;s development. The challenge is a tendency to over-correct rather than coach, to focus on what went wrong rather than acknowledging what went right, and to struggle to delegate tasks they fear will not be done correctly.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">Ideal environment</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Type 1s thrive in environments where quality and integrity are genuinely valued — not just as stated values, but as practiced realities. They struggle in cultures that reward cutting corners, tolerate ethical ambiguity, or treat standards as suggestions. Clear processes, ethical leadership, meaningful work with real standards, and colleagues who take their responsibilities seriously are the conditions under which the One does their best work.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Common Professions</h2>
            <p className="leading-relaxed text-gray-700">
              Type 1s gravitate toward work where standards matter and where getting things right has real consequences. Common career paths include law and compliance, academic research and writing, medicine and nursing, quality assurance and auditing, journalism and fact-checking, editing and publishing, teaching and curriculum development, policy analysis, and scientific research. Many Ones are drawn to reform-oriented work — advocacy, nonprofit leadership, environmental work — where their drive for a better way of doing things aligns with organizational mission.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-1" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 — The Reformer</Link>
              <Link href="/enneagram/type-1/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 in Relationships</Link>
              <Link href="/enneagram/1w9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">1w9 — The Idealist</Link>
              <Link href="/enneagram/1w2" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">1w2 — The Advocate</Link>
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
