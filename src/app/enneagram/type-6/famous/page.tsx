import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 6;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Famous Enneagram Type 6s — The Loyalist in Public Life | Thyself",
  description:
    "Notable public figures frequently cited as Enneagram Type 6: the Loyalist's loyalty, questioning mind, relationship to authority, anxiety, and humor visible in their work and lives.",
  openGraph: {
    title: "Famous Enneagram Type 6s — The Loyalist",
    description:
      "Public figures who exemplify the Type 6 pattern: loyal, questioning, anxious about security, and often using humor to manage uncertainty.",
    url: "https://thyself.app/enneagram/type-6/famous",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-6/famous" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Famous Enneagram Type 6s — The Loyalist in Public Life",
  description: "Notable public figures frequently cited as Enneagram Type 6 and what their lives reveal about the Loyalist pattern.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-6/famous",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-6/famous" },
};

const examples = [
  {
    name: "Woody Allen",
    years: "b. 1935",
    body: "Allen's entire creative output is a study in the Six's relationship to anxiety. His early films — Take the Money and Run, Sleeper, Annie Hall — made anxiety itself the subject matter, and the comic frame the only survivable response to it. His persona, across decades of work, is the intellectual who cannot find solid ground, who questions everything including his own questioning, and who relates to authority (psychiatrists, God, death, women) with a mixture of deference, skepticism, and compulsive return. The humor is characteristically Six: wit as a way of surviving what cannot be controlled.",
  },
  {
    name: "Malala Yousafzai",
    years: "b. 1997",
    body: "Yousafzai demonstrates the counterphobic Six — the type who moves toward the feared object rather than away from it. Her decision to continue advocating publicly for girls' education after being shot by the Taliban, and to do so with increasing rather than diminishing commitment, reflects the Six's ability to transform fear into courage when the cause is clear enough. She is also a deeply loyal person — to her community, her faith, and her father's early encouragement — which is the Six's most sustaining quality.",
  },
  {
    name: "Tom Hanks",
    years: "b. 1956",
    body: "Hanks is frequently cited by Enneagram educators as a Six. His appeal rests precisely on the qualities Sixes offer at their best: genuine reliability, warmth, and the capacity to make the people around them feel held. He is one of the most consistently liked people in American public life, which reflects the Six's investment in building trust carefully over time. His film choices also tend toward stories of ordinary courage and loyalty — the qualities the Six values most deeply.",
  },
  {
    name: "Mark Twain",
    years: "1835–1910",
    body: "Twain's work is saturated with the Six's characteristic skepticism — a distrust of authority, a sharp eye for hypocrisy, and a refusal to be comforted by easy answers. Adventures of Huckleberry Finn is, at its core, a story about what happens when loyalty to a person conflicts with loyalty to a system, and a Six's answer: the person wins. His public persona — the self-deprecating humorist who could speak truth to power because he wrapped it in a joke — is a Six's survival strategy refined into art.",
  },
];

export default function Type6FamousPage() {
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
              Type 6s in public life are recognizable by their loyalty, their questioning mind, and the way they use humor to manage what cannot be controlled. They often champion causes or communities rather than purely personal success — and their courage, when it appears, tends to be the courage of someone who is afraid but acts anyway.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What to Look For</h2>
            <p className="leading-relaxed text-gray-700">
              The Type 6 pattern in public figures tends to show up as: a body of work that questions authority, exposes hypocrisy, or examines the gap between what systems promise and what they deliver; a public persona that is more comfortable supporting others than occupying the center alone; humor as a coping mechanism for uncertainty; and a loyalty to communities, causes, or individuals that is sustained over long periods without fanfare.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Sixes come in two broad orientations: phobic (moving away from threats, seeking safety in systems and authorities) and counterphobic (moving toward threats as a way of managing the fear). Both are Sixes; the counterphobic can look like an Eight to casual observation. The integration direction is toward Type 9 — at their best, Sixes find genuine inner peace. Disintegration moves toward Type 3 — under stress, the authentic six may become image-conscious and performative.
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
              Enneagram type is determined by core motivation and inner structure — not behavior alone. Typing public figures is always interpretive: we can observe their patterns, but we cannot know their inner experience. The examples here represent people widely discussed in Enneagram literature and education as illustrating the Type 6 pattern. They are offered as lenses for understanding the type, not as definitive classifications.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Type 6</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 Overview</Link>
              <Link href="/enneagram/type-6/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 in Relationships</Link>
              <Link href="/enneagram/type-6/work" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 at Work</Link>
              <Link href="/enneagram/subtypes/sp-6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 Subtypes</Link>
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
