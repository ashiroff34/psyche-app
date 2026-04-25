import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 5;
const wingNum = 4;
const color = TYPE_COLORS[typeNum];
const wingColor = TYPE_COLORS[wingNum];

export const metadata: Metadata = {
  title: "Enneagram 5w4 — The Iconoclast: Traits, Growth & Identity | Thyself",
  description:
    "A complete guide to the Enneagram 5w4 — 'The Iconoclast.' How the Four wing shapes the Investigator: more emotionally intense, aesthetically driven, and unconventional — seeking knowledge that is also personally meaningful. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram 5w4 — The Iconoclast",
    description:
      "The 5w4 combines the Five's intellectual intensity with the Four's emotional depth and originality. More inward, sensitive, and unconventional than the 5w6 — the Iconoclast seeks understanding that is also personally meaningful.",
    url: "https://thyself.app/enneagram/5w4",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/5w4" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 5w4 — The Iconoclast: Traits, Growth & Identity",
  description: "How the Four wing shapes Enneagram Type 5: more emotionally intense, aesthetically oriented, and unconventional in their pursuit of knowledge.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/5w4",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/5w4" },
};

export default function Page5w4() {
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
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: wingColor }}>4</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Iconoclast</h1>
            <p className="text-lg leading-relaxed opacity-90">
              The 5w4 combines the Five&apos;s deep need to understand with the Four&apos;s emotional intensity and originality. Knowledge must be personally meaningful, not just accurate. This is one of the Enneagram&apos;s most genuinely unconventional subtypes — thinkers who do not only break down established ideas, but feel something about doing so.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Four Wing Adds</h2>
            <p className="leading-relaxed text-gray-700">The Four wing gives the Five&apos;s intellectual world an emotional and aesthetic dimension. Where the 5w6 is oriented toward practical, systematic knowledge-building, the 5w4 is drawn toward ideas that carry personal meaning — philosophy, art, literature, psychology, spirituality, cultural criticism. They are not content to simply know things; they want to know things that matter, that illuminate the texture of existence.</p>
            <p className="mt-4 leading-relaxed text-gray-700">The Four wing also introduces a deeper interiority and emotional sensitivity than most Fives naturally access. The 5w4 has feelings about their ideas — sometimes strong ones. They can be moved by beauty, disturbed by ugliness, exhilarated by an elegant theory or depressed by intellectual stagnation in a way the more detached 5w6 may not experience as viscerally.</p>
            <p className="mt-4 leading-relaxed text-gray-700">Originality matters enormously to the 5w4. They resist conventional frameworks, orthodoxies, and received wisdom with a combination of the Five&apos;s skepticism and the Four&apos;s need to be irreplaceable. They want to think thoughts that no one else has quite thought in the same way. This can produce genuine innovation — or, at its worst, contrarianism for its own sake.</p>
          </section>
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Traits of the 5w4</h2>
            <div className="space-y-4">
              {[
                { title: "Aesthetically sensitive", body: "The 5w4 often has a highly developed aesthetic sense — a strong response to beauty and ugliness in art, music, writing, and design. The Four wing makes them more attuned to the aesthetic dimension of ideas, not just their logical structure." },
                { title: "Unconventional", body: "The 5w4 does not naturally defer to authority, tradition, or consensus. They approach ideas from unusual angles, question premises others take for granted, and often arrive at conclusions that the mainstream has not considered." },
                { title: "More emotionally complex than typical Fives", body: "The Four wing gives the 5w4 access to emotional states that the more defended 5w6 may not frequently encounter. They can be melancholic, passionate about their work, and occasionally openly expressive of feeling — particularly in creative or intellectual contexts." },
                { title: "Difficulty with practical demands", body: "The double-withdrawal pattern (Five&apos;s energetic withdrawal + Four&apos;s emotional inwardness) can make the 5w4 particularly challenged by the ordinary demands of the practical world. Routine, administration, and social obligation can feel like interruptions to the real work." },
                { title: "Creative output", body: "Many 5w4s find their natural expression in creative intellectual work — writing, music, visual art, philosophy, film, or any domain where ideas and aesthetic sensibility meet. Their work often has a distinctive, unmistakable character." },
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
                <p className="text-sm leading-relaxed text-gray-700">The 5w4 produces genuinely original intellectual and creative work. Their refusal to accept conventional frameworks, combined with their emotional investment in ideas, gives their output an unusual depth and authenticity. They are the Enneagram&apos;s most natural iconoclasts — in the best sense.</p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: wingColor }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: wingColor }}>Challenge</p>
                <p className="text-sm leading-relaxed text-gray-700">The 5w4 can become so thoroughly inward — so fully immersed in their own intellectual and emotional world — that they lose connection with the external world and the people in it. The combination of Five&apos;s self-sufficiency and Four&apos;s emotional withdrawal can produce genuine isolation, even when what they most want is to be known.</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 — The Investigator</Link>
              <Link href="/enneagram/type-4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 — The Individualist</Link>
              <Link href="/enneagram/5w6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">5w6 — The Problem Solver</Link>
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
