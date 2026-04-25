import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 7;
const color = TYPE_COLORS[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 7 at Work — The Enthusiast in the Workplace | Thyself",
  description:
    "How Enneagram Type 7 operates professionally: their generative energy and vision, the pattern of starting more than finishing, leadership style, and where they thrive at work. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 7 at Work — The Enthusiast in the Workplace",
    description:
      "The Type 7 generates more ideas and more energy than almost any other type. The professional challenge is converting that generative capacity into sustained execution — finishing what they started.",
    url: "https://thyself.app/enneagram/type-7/work",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-7/work" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 7 at Work — The Enthusiast in the Workplace",
  description: "How the Enneagram Type 7 operates professionally: generative energy, follow-through challenges, leadership style, and ideal environments.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-7/work",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-7/work" },
};

export default function Type7Work() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type 7</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Enthusiast at Work</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Type 7s are among the most generative and energizing professionals on the Enneagram. They see possibilities everywhere, they move fast, and their enthusiasm is genuinely contagious. The professional question is whether they can stay with a project long enough to see it through — whether the execution can match the vision.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Type 7 as a Professional</h2>
            <p className="leading-relaxed text-gray-700">
              In professional environments, Type 7s are energizing forces. They generate ideas at a pace that most organizations cannot keep up with, they make connections between things that others have not connected, and they communicate with an infectious enthusiasm that creates momentum and buy-in. When a project or organization is stuck, bringing in a strong Seven often unsticks it.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Seven&apos;s ability to synthesize across domains is a genuine cognitive advantage. They are quick, associative thinkers who make connections between fields and disciplines in ways that generate novel approaches. In creative industries, entrepreneurial environments, innovation roles, and any context where new thinking is the primary deliverable, the Seven is often the most productive person in the room.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The professional challenge is follow-through. The Seven who generates ten ideas and executes on zero is less valuable than the Seven who generates three ideas and executes on two. The excitement of the new project fades quickly once the implementation work begins — once the actual, repetitive, detail-oriented labor of making the thing real replaces the generative pleasure of imagining it. Learning to stay engaged through the implementation phase is the central professional development for the Type 7.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Key Professional Traits</h2>
            <div className="space-y-4">
              {[
                { title: "Exceptional idea generation", body: "The Seven&apos;s cognitive speed and associative range make them among the most generative thinkers in any professional environment. They see angles others miss, make connections across domains, and produce a volume of ideas that keeps teams and organizations from becoming stagnant. The challenge is selecting among the ideas, not generating them." },
                { title: "High energy and positive orientation", body: "Sevens bring energy to their work environments in ways that elevate the people around them. Their enthusiasm is contagious, their optimism is stabilizing in difficult moments, and their capacity to find the opportunity in a setback keeps teams moving forward when more pessimistic colleagues might become stuck." },
                { title: "Versatility and adaptability", body: "Sevens move across domains with unusual ease. They are not precious about expertise, not overly specialized, and not threatened by the unfamiliar. This versatility makes them valuable in rapidly changing environments and in organizations that need people who can span multiple functions." },
                { title: "Struggle with sustained focus on implementation", body: "The Seven&apos;s most characteristic professional limitation is the gap between ideation and execution. Once the exciting early phase of a project is over and the grinding implementation work begins, the Seven&apos;s attention tends to drift toward the next exciting thing. Managing this tendency — finding ways to stay engaged through implementation — is the Seven&apos;s most important professional challenge." },
                { title: "Conflict avoidance through reframing", body: "Sevens are reluctant to stay with professional conflict or difficulty. When a project is running into problems, they may reframe rather than address — finding the positive angle on a situation that actually requires a hard conversation, a difficult decision, or the acceptance of a genuinely bad outcome. This can leave problems unaddressed until they become crises." },
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
                  Type 7 leaders are vision-setters and energizers. They create organizational cultures that feel alive and future-oriented, attract talented people who want to be part of something exciting, and communicate vision with a compelling clarity that inspires commitment. The challenge is the operational follow-through — making sure the excitement translates into execution, that the team is not just inspired but also supported, and that the hard realities of implementation are actually managed rather than reframed away.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">Ideal environment</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Type 7s thrive in environments that are fast-moving, dynamic, and open to new ideas — where they can generate and explore and are not locked into rigid processes. They struggle in highly structured, repetitive, or rule-bound environments where the possibilities are constrained. Variety, autonomy, exposure to new challenges, and the freedom to follow interesting problems wherever they lead are the conditions under which the Seven&apos;s capacity is best expressed.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Common Professions</h2>
            <p className="leading-relaxed text-gray-700">
              Type 7s are drawn to fields where energy, ideas, and novelty are rewarded: entrepreneurship and venture capital, marketing and advertising, consulting, journalism and media, entertainment, innovation and product development, event production, travel and hospitality, and any role that involves generating new approaches rather than refining existing ones. Many Sevens find that their best professional expression is entrepreneurial — building something new — rather than operating within established institutional structures.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 — The Enthusiast</Link>
              <Link href="/enneagram/type-7/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 in Relationships</Link>
              <Link href="/enneagram/7w6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">7w6 — The Entertainer</Link>
              <Link href="/enneagram/7w8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">7w8 — The Realist</Link>
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
