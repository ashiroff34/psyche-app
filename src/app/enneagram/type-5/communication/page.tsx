import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 5;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: `Enneagram Type 5 Communication Style — How the ${typeName} Communicates | Thyself`,
  description:
    "How Enneagram Type 5 communicates: precise, sparing, and on their own terms. Strengths, blind spots, and how to actually be in dialogue with an Investigator.",
  openGraph: {
    title: `Enneagram Type 5 Communication Style — How the ${typeName} Communicates`,
    description:
      "Type 5s communicate with precision and economy. Understand their style, why they withhold under pressure, and how to engage them substantively.",
    url: "https://thyself.app/enneagram/type-5/communication",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-5/communication" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `Enneagram Type 5 Communication Style — How the ${typeName} Communicates`,
  description:
    "How Enneagram Type 5 communicates: precise, sparing, and on their own terms. Strengths, blind spots, and tips for engaging the Investigator.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-5/communication",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-5/communication" },
};

const strengths: { title: string; body: string }[] = [
  { title: "Exceptional precision and depth", body: "When a Five says something, it has typically been thought through. Their sentences carry more information per word than most types’ do, and their analysis tends to hold up under scrutiny." },
  { title: "Thinks before speaking", body: "Fives do not improvise carelessly. The pause before they respond is the work of integration, not hesitation, and it usually produces a more accurate answer than a faster one would." },
  { title: "Honest under social pressure", body: "What other types soften to keep the social temperature comfortable, the Five will often state plainly. Their honesty is not shaped by the room, which makes it useful when accuracy matters." },
  { title: "Substantive contribution", body: "When the topic interests them, Fives bring information, distinctions, and perspectives that genuinely move the conversation forward. They tend to add signal rather than noise." },
];

const challenges: { title: string; body: string }[] = [
  { title: "Perceived as withholding", body: "The Five’s economy can land as distance. They share what they have worked out rather than what is in process, which can leave others feeling like they are getting only the polished surface." },
  { title: "Under-communicates the relational layer", body: "In contexts where the relational register matters as much as the content, the Five can come across as flat. They are not uninterested — they simply do not naturally speak in that channel." },
  { title: "Struggles with social communication", body: "Small talk, social rituals, and exchanges whose purpose is connection rather than information can feel like effort with no return. They may withdraw rather than participate." },
  { title: "Processes before responding", body: "The pause that precedes a Five’s response can be misread as disengagement, disagreement, or being elsewhere. Often it is just the Five thinking, but the silence costs them in real-time conversations." },
];

const tips: string[] = [
  "Give them time to think — the pause before they respond is processing, not hesitation, and rushing them produces worse answers.",
  "Engage on substantive topics — they are much more present in conversations that interest them intellectually.",
  "Don’t interpret their brevity as dismissal; it often means they are being efficient, not cold.",
  "Respect their need for conversational endings — they may disengage abruptly when they have said what they have to say, and this is not personal.",
];

export default function Type5CommunicationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type {typeNum}</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">How Type {typeNum} Communicates</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Fives communicate precisely, sparingly, and on their own terms. They speak when they have something worth saying, think before they speak, and prefer conversations that engage the mind rather than simply fill silence. They bring exceptional clarity and depth to substantive discussion.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Communication Style</h2>
            <p className="leading-relaxed text-gray-700">
              The Five&apos;s communication is characterized by precision, economy, and intellectual substance. They do not chat — they talk, and when they do, it is often worth listening to. They are uncomfortable with small talk, social rituals of communication, and conversations whose purpose is relational maintenance rather than actual exchange.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              They may communicate less than they know, sharing only what they have worked out rather than what is still in process — which can make them seem more reserved than they actually are. Under pressure to communicate quickly or in socially saturated environments, they withdraw rather than contribute, processing internally and returning with a fully formed position.
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
              The Five engages most when the exchange is on their terms — substantive, paced for thought, and free of social pressure. These four practices help.
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
