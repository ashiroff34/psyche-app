import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 5;
const color = TYPE_COLORS[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 5 at Work — The Investigator in the Workplace | Thyself",
  description:
    "How Enneagram Type 5 operates professionally: their analytical depth and expertise, the pattern of hoarding knowledge and avoiding exposure, leadership style, and where they thrive. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 5 at Work — The Investigator in the Workplace",
    description:
      "The Type 5 is the deepest expert in any room they choose to master. The professional challenge is sharing what they know — emerging from behind the expertise to engage, contribute, and actually influence the outcome.",
    url: "https://thyself.app/enneagram/type-5/work",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-5/work" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 5 at Work — The Investigator in the Workplace",
  description: "How the Enneagram Type 5 operates professionally: analytical depth, knowledge patterns, leadership, and ideal environments.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-5/work",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-5/work" },
};

export default function Type5Work() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type 5</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Investigator at Work</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Type 5s are the people who actually understand the system — not at the surface level, but at the level of first principles. They read what no one else read, they know what the data actually says, and they can hold a complexity in their head that would overwhelm a less analytically oriented mind. Their challenge is not competence; it is the willingness to put that competence into the world.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Type 5 as a Professional</h2>
            <p className="leading-relaxed text-gray-700">
              In professional environments, Type 5s are defined by depth. Where others acquire enough knowledge to function, the Five acquires enough to understand. They go back to primary sources, they question received wisdom, they build mental models from the ground up rather than accepting inherited frameworks. The result is a kind of expertise that is genuinely different from what most people mean by the word — not familiarity with the standard content, but a real structural understanding of why things work the way they do.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              This makes them invaluable in roles that require real analysis — research, technical development, systems design, strategy, financial analysis, scientific work. They are the person whose perspective changes the conversation when they finally share it, whose objections are worth taking seriously, whose understanding of the problem runs deeper than the meeting allows for. Organizations with strong Fives make better decisions because someone in the room actually understands what they are deciding.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The professional challenge is the gap between the Five&apos;s knowledge and their output. The Five who is preparing — who needs to know more before they are ready to contribute — can accumulate vast understanding while leaving their organization&apos;s actual problems unaddressed. Learning to share knowledge that is incomplete, to contribute to a conversation before they have fully processed it, and to be useful in real time rather than in the perfectly prepared presentation is a core professional development for the Five.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Key Professional Traits</h2>
            <div className="space-y-4">
              {[
                { title: "Deep analytical capability", body: "The Five&apos;s capacity for analysis is extraordinary. They are not just processing more information than others — they are building more sophisticated models. Their thinking operates at a level of abstraction and structural depth that gives them genuine insight into complex systems, problems, and decisions." },
                { title: "Independence and self-sufficiency", body: "Type 5s do not need much from their colleagues to function. They can work autonomously for extended periods, self-direct their learning and their output, and produce excellent work without requiring significant management or social input. This independence makes them very valuable in roles that require sustained solitary focus." },
                { title: "Reluctance to engage before feeling ready", body: "The Five&apos;s tendency to prepare before contributing means they sometimes miss the moment. By the time they have fully thought through a problem, the meeting has moved on, the decision has been made, the opportunity has passed. Learning to contribute in real time — to say &quot;I have a preliminary thought&quot; rather than waiting until the thought is perfect — is an important professional skill for the Five." },
                { title: "Energy conservation as a professional pattern", body: "Fives manage their energy carefully, and their professional engagement reflects this. They may be highly productive during focused work periods and less available during periods of depletion. Colleagues who do not understand this may experience the Five as inconsistent or remote. Understanding that the Five&apos;s withdrawal is functional rather than relational helps manage the dynamic." },
                { title: "Struggle with organizational politics", body: "Most Fives have little patience for organizational politics — the management of impressions, the coalition-building, the investment in relationships that do not seem to serve the actual work. This can leave them professionally undervalued relative to their actual contribution, because the people who get credit are often those who are better at managing visibility." },
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
                  Type 5 leaders are intellectually rigorous and highly competent. They set high standards for analytical quality, communicate with precision, and create environments where careful thinking is valued. The challenge is emotional availability — Fives can be remote in ways that leave their teams feeling unsupported and uncertain. Developing regular, genuine contact with their team — not just about the work, but about the people doing it — is a key leadership development for the Five.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">Ideal environment</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Type 5s thrive in environments where genuine expertise is valued — where depth of knowledge matters more than political skill, where there is room for sustained focus and original thinking. They struggle in fast-paced, highly social environments that require constant real-time responsiveness. Autonomy, clear scope, time for preparation, and colleagues who take intellectual quality seriously are the conditions under which the Five does their best work.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Common Professions</h2>
            <p className="leading-relaxed text-gray-700">
              Type 5s gravitate toward fields that reward depth of expertise: scientific research, engineering and technical development, mathematics and statistics, philosophy and academia, financial analysis, data science, cybersecurity, medicine, systems architecture, investigative journalism, and academic writing. Many Fives find their professional home in fields that allow for deep specialization and sustained intellectual engagement with a complex problem.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 — The Investigator</Link>
              <Link href="/enneagram/type-5/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 in Relationships</Link>
              <Link href="/enneagram/5w4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">5w4 — The Iconoclast</Link>
              <Link href="/enneagram/5w6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">5w6 — The Problem Solver</Link>
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
