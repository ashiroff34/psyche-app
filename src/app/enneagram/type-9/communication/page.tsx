import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 9;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: `Enneagram Type 9 Communication Style — How the ${typeName} Communicates | Thyself`,
  description:
    "How Enneagram Type 9 communicates: ease, acceptance, and the quiet self-erasure of their own perspective. Strengths, blind spots, and how to actually hear a Peacemaker.",
  openGraph: {
    title: `Enneagram Type 9 Communication Style — How the ${typeName} Communicates`,
    description:
      "Type 9s communicate with ease and acceptance. Understand their style, why their own perspective stays hidden, and how to make space for what they actually think.",
    url: "https://thyself.app/enneagram/type-9/communication",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-9/communication" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `Enneagram Type 9 Communication Style — How the ${typeName} Communicates`,
  description:
    "How Enneagram Type 9 communicates: ease, acceptance, and the self-erasure that hides their own perspective. Strengths, blind spots, and tips.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-9/communication",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-9/communication" },
};

const strengths: { title: string; body: string }[] = [
  { title: "Exceptional listening", body: "Nines listen in a way that few people do — without an agenda, without waiting to interject, without filing your words into a category. Their attention is genuinely receptive." },
  { title: "Creates safety to speak", body: "The atmosphere a Nine generates makes other people feel safe to say what they actually think. Their non-reactive presence lowers the social temperature in a way that opens others up." },
  { title: "Patient and non-reactive", body: "They do not flare. The Nine can stay steady through emotional intensity, conflict, and pressure that would knock other types off their footing — and that steadiness is itself a kind of communication." },
  { title: "Holds complexity without rushing", body: "Where other types want to resolve a conversation, the Nine can let it stay complicated. They are comfortable with ambiguity and willing to sit in it longer than most, which often produces better outcomes." },
];

const challenges: { title: string; body: string }[] = [
  { title: "Under-communicates their perspective", body: "The Nine’s own view is often the last thing to enter the conversation, if it enters at all. They may agree with a position they privately disagree with rather than introduce friction." },
  { title: "Difficulty saying no directly", body: "“Maybe,” “I’ll think about it,” “sure, I guess” — these are often the Nine’s way of saying no without saying no. The vagueness is a way of declining without conflict, but it can confuse the other person." },
  { title: "Passive resistance", body: "When a Nine disagrees but cannot say it, the disagreement leaks out as forgetting, slowness, or quiet non-cooperation. The communication is real but indirect, and the Nine themselves may not consciously connect it to the disagreement." },
  { title: "So accommodating no one knows what they want", body: "Their habit of merging with others’ preferences can leave the people around them genuinely unsure what the Nine actually wants — and the Nine, often, does not know either, until they are pushed to find out." },
];

const tips: string[] = [
  "Ask them directly what they think — don’t assume their agreement is genuine. They will rarely volunteer disagreement; you have to invite it.",
  "Give them time; they process at their own pace and may have a response that surfaces hours after the conversation has moved on.",
  "Make it safe to disagree — tell them you want to know what they actually think, not what they think you want to hear.",
  "Don’t mistake their calm for indifference — they may feel something strongly without showing it on the surface.",
];

export default function Type9CommunicationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type {typeNum}</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">How Type {typeNum} Communicates</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Nines communicate with a quality of ease and acceptance that makes others feel immediately comfortable. They are excellent listeners, slow to impose their own agenda on a conversation, and genuinely interested in the other person&apos;s perspective. The shadow of this communication style is that it can make the Nine nearly invisible as a communicant — present as receiver, nearly absent as sender.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Communication Style</h2>
            <p className="leading-relaxed text-gray-700">
              The Nine&apos;s communication style is warm, unhurried, and attuned to the other person. They make excellent conversational partners — they listen, they are interested, they do not interrupt, and they create a space in which others feel genuinely heard. The limitation is that they communicate their own perspective rarely and indirectly.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              They may agree with a position they privately disagree with rather than introduce conflict. They may express their preferences through passive resistance rather than direct statement. Their actual opinions, when they finally emerge, can be surprisingly firm — the Nine is not as neutral as they appear; they have simply been waiting to feel safe enough to say what they think.
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
              The Nine emerges most fully when the conversation is patient and the invitation to disagree is real. These four practices help.
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
