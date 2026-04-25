import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 8;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Famous Enneagram Type 8s — The Challenger in Public Life | Thyself",
  description:
    "Notable public figures frequently cited as Enneagram Type 8: the Challenger's power, directness, protectiveness, vulnerability armor, and commanding presence visible in their work and lives.",
  openGraph: {
    title: "Famous Enneagram Type 8s — The Challenger",
    description:
      "Public figures who exemplify the Type 8 pattern: powerful, direct, protective, and committed to never being controlled.",
    url: "https://thyself.app/enneagram/type-8/famous",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-8/famous" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Famous Enneagram Type 8s — The Challenger in Public Life",
  description: "Notable public figures frequently cited as Enneagram Type 8 and what their lives reveal about the Challenger pattern.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-8/famous",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-8/famous" },
};

const examples = [
  {
    name: "Winston Churchill",
    years: "1874–1965",
    body: "Churchill embodies the Eight in their full ambiguity: a commanding force for good in one historical moment, a deeply problematic wielder of power in others. What is consistent is the Eight's relationship to force itself — Churchill was most fully alive when the stakes were existential, and the direct application of his full strength was called for. His drinking, his depression, his impossible interpersonal style, and his refusal to manage himself for others' comfort are all Eight characteristics. So is his willingness to say what no one else would say when saying it mattered most.",
  },
  {
    name: "Serena Williams",
    years: "b. 1981",
    body: "Williams is one of the clearest examples of the Eight's protectiveness combined with raw power. She has protected her right to compete on her own terms against enormous institutional resistance — the body policing, the drug testing, the dress codes — with a directness that makes many people uncomfortable and inspires many others. Her protectiveness extends to her family with the same force she brings to the court. The Eight does not distinguish between domains: the willingness to fight for what matters is the same regardless of the arena.",
  },
  {
    name: "Franklin D. Roosevelt",
    years: "1882–1945",
    body: "FDR's response to the Great Depression and World War II reflects the Eight at their most generative: using power in service of protection on a massive scale. His directness — the Fireside Chats, the willingness to confront both the economic and military crises without minimizing them — gave people what the Eight at their best always gives: the sense that the force available is adequate to the threat. His disability, largely hidden from the public, also reflects the Eight's relationship to vulnerability: it was real, it was managed privately, and it did not reduce his authority.",
  },
  {
    name: "Toni Morrison",
    years: "1931–2019",
    body: "Morrison brought the Eight's directness and refusal to diminish to literary territory that required exactly those qualities. Her fiction does not soften the experience of slavery, of racism, or of the particular cruelties that systems inflict on the people they marginalize. She famously refused to 'write for the white gaze' — an Eight's refusal to make oneself smaller or more palatable to avoid discomfort. Her Nobel lecture, her public positions, and her private mentorship all reflect the Eight's protectiveness extended toward a community she felt fierce responsibility for.",
  },
];

export default function Type8FamousPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type {typeNum}</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">
              Famous {typeName}s
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              Type 8s in public life are recognizable by the quality of their presence — the sense that there is more force in the room than usual, that things will be said directly, and that the person in front of you is not managing their impact for your comfort. Their protectiveness, when it is working, is among the most sustaining forces available.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What to Look For</h2>
            <p className="leading-relaxed text-gray-700">
              The Type 8 pattern in public figures tends to show up as: a directness that can be uncomfortable for those who are not used to it; a protectiveness toward people or communities they claim as their own; a discomfort with being controlled or managed by systems or individuals with authority; and a softness that is real but carefully guarded — only those who have earned trust get to see it.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Eight&apos;s integration direction is toward Type 2 — at their best, they move from raw power toward genuine service, using their force to care for others in tangible, direct ways. Their disintegration direction is toward Type 5 — under stress, the usually engaged Eight withdraws, becomes secretive, and cuts themselves off from the engagement that normally sustains them.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Cited Examples</h2>
            <div className="space-y-6">
              {examples.map(({ name, years, body }) => (
                <div key={name} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="mb-3 flex items-baseline gap-3">
                    <h3 className="text-lg font-bold text-gray-900">{name}</h3>
                    <span className="text-sm text-gray-400">{years}</span>
                  </div>
                  <p className="leading-relaxed text-gray-700 text-sm">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border-l-4 bg-gray-50 p-6" style={{ borderColor: color }}>
            <h2 className="mb-3 text-lg font-bold text-gray-900">A Note on Typing Public Figures</h2>
            <p className="text-sm leading-relaxed text-gray-700">
              Enneagram type is determined by core motivation and inner structure — not behavior alone. Typing public figures is always interpretive: we can observe their patterns, but we cannot know their inner experience. The examples here represent people widely discussed in Enneagram literature and education as illustrating the Type 8 pattern. They are offered as lenses for understanding the type, not as definitive classifications.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Type 8</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 Overview</Link>
              <Link href="/enneagram/type-8/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 in Relationships</Link>
              <Link href="/enneagram/type-8/work" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 at Work</Link>
              <Link href="/enneagram/subtypes/sp-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 Subtypes</Link>
            </div>
          </section>

          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Find your own type</h2>
            <p className="mb-6 text-base opacity-90">Recognition through famous examples is a starting point. The Thyself assessment goes deeper — uncovering the motivational structure beneath the behavior.</p>
            <Link href="/assessments" className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90" style={{ color }}>Start the assessment</Link>
          </section>
        </div>
      </main>
    </>
  );
}
