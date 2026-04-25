import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 4;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: `Enneagram Type 4 Communication Style — How the ${typeName} Communicates | Thyself`,
  description:
    "How Enneagram Type 4 communicates: emotional depth, attention to nuance, and the longing for authenticity. Strengths, blind spots, and how to talk with an Individualist.",
  openGraph: {
    title: `Enneagram Type 4 Communication Style — How the ${typeName} Communicates`,
    description:
      "Type 4s communicate with emotional depth and a hunger for authenticity. Understand their style, the intensity that can overwhelm, and how to meet them.",
    url: "https://thyself.app/enneagram/type-4/communication",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-4/communication" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `Enneagram Type 4 Communication Style — How the ${typeName} Communicates`,
  description:
    "How Enneagram Type 4 communicates: emotional depth, nuance, and the longing for authentic exchange. Strengths, blind spots, and tips.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-4/communication",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-4/communication" },
};

const strengths: { title: string; body: string }[] = [
  { title: "Articulates emotional nuance", body: "Fours can put words to the things other types rush past — the texture of an ambivalence, the half-felt thing in a relationship, the quality of a particular kind of sadness. This is rare and valuable." },
  { title: "Creates an atmosphere of depth", body: "When a Four is genuinely present, the conversation slows down and the surface drops away. People often find themselves speaking more honestly than they intended to." },
  { title: "Attuned to what is not said", body: "They listen between the lines. The discrepancy between what someone is saying and what they appear to feel is often the first thing the Four notices, and frequently the truest thing in the room." },
  { title: "Offers rare understanding", body: "When the Four is moved by what you are saying, the quality of their attention is unusual — they actually meet what you brought, rather than waiting for their turn or filing it into a category." },
];

const challenges: { title: string; body: string }[] = [
  { title: "Overwhelming emotional intensity", body: "What feels to the Four like genuine engagement can land on others as too much, too fast, too soon. The depth they want is not always the depth the other person can meet in that moment." },
  { title: "Self-referential drift", body: "Fours can become absorbed in their own emotional experience and lose track of the other person. The conversation that started about both of you ends up as a monologue about the Four’s inner weather." },
  { title: "Sensitive to tone", body: "A neutral comment can be experienced as dismissive or critical. The Four reads tone with such fineness that they sometimes hear what is not actually there, which can derail the exchange." },
  { title: "Idealize-devalue dynamics", body: "Communication partners can be experienced as the most attuned person the Four has ever met — and then, after one missed beat, as profoundly disappointing. The swing is often invisible to the other person." },
];

const tips: string[] = [
  "Be genuine — they can detect inauthenticity immediately, and once they do, they will disengage.",
  "Don’t rush them through emotional content to get to the point. For the Four, the emotional content is the point.",
  "Match their depth where you can — surface-level reassurance does not land and may feel like dismissal.",
  "When they are in their head about something, gently return them to the actual exchange happening between you.",
];

export default function Type4CommunicationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type {typeNum}</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">How Type {typeNum} Communicates</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Fours communicate with emotional depth and a strong orientation toward authenticity. They want conversations that are real — that go below the surface of what is being said to what is actually being felt and meant. Small talk costs them energy; genuine exchange restores it.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Communication Style</h2>
            <p className="leading-relaxed text-gray-700">
              The Four&apos;s communication style is emotionally rich, often metaphorical, and attuned to the texture of experience rather than just the facts. They are excellent at articulating nuance, ambiguity, and the felt quality of a situation — the things that other types rush past. They tend to be more comfortable with depth than brevity.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The challenge is that their communication can be intense in ways that overwhelm people who are not ready for it, and that they can become absorbed in their own emotional experience to the point of losing track of the other person&apos;s. They are also sensitive to tone and may interpret neutral communication as dismissive or critical.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Communication Strengths</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {strengths.map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color }}>{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Communication Challenges</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {challenges.map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                  <p className="mb-2 font-semibold text-gray-900">{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Communicating With a Type {typeNum}</h2>
            <p className="mb-6 leading-relaxed text-gray-700">
              The Four opens up most when the exchange is genuine and the depth is honored. These four practices help.
            </p>
            <ul className="space-y-3">
              {tips.map((tip, i) => (
                <li key={tip} className="flex gap-4 rounded-xl border-l-4 bg-gray-50 p-4" style={{ borderColor: color }}>
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: color }}>{i + 1}</span>
                  <p className="text-sm leading-relaxed text-gray-700">{tip}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href={`/enneagram/type-${typeNum}`} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type {typeNum} — {typeName}</Link>
              <Link href={`/enneagram/type-${typeNum}/relationships`} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type {typeNum} in Relationships</Link>
              <Link href={`/enneagram/type-${typeNum}/work`} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type {typeNum} at Work</Link>
            </div>
          </section>

          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Find out your Enneagram type</h2>
            <p className="mb-6 text-base opacity-90">Take the free Thyself Enneagram Assessment — and learn how your type communicates, listens, and connects.</p>
            <Link href="/assessments" className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90" style={{ color }}>Start the assessment</Link>
          </section>
        </div>
      </main>
    </>
  );
}
