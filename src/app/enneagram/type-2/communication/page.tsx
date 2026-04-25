import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 2;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: `Enneagram Type 2 Communication Style — How the ${typeName} Communicates | Thyself`,
  description:
    "How Enneagram Type 2 communicates: warmth first, attunement to the other, and the indirectness around their own needs. Strengths, challenges, and how to talk with a Helper.",
  openGraph: {
    title: `Enneagram Type 2 Communication Style — How the ${typeName} Communicates`,
    description:
      "Type 2s communicate with warmth and personal attention. Understand their style, the indirectness around their own needs, and how to actually be in dialogue with the Helper.",
    url: "https://thyself.app/enneagram/type-2/communication",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-2/communication" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `Enneagram Type 2 Communication Style — How the ${typeName} Communicates`,
  description:
    "How Enneagram Type 2 communicates: warmth, attunement, and the indirectness that can leave their own needs unspoken. Strengths, challenges, and tips.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-2/communication",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-2/communication" },
};

const strengths: { title: string; body: string }[] = [
  { title: "Exceptional warmth", body: "Twos make people feel welcomed in conversation. There is a quality of personal attention they bring that is rare and that, when sincere, opens the other person up." },
  { title: "Genuinely seen and valued", body: "They notice what others overlook — the small detail, the under-the-surface mood, the thing the other person did not quite say. They reflect it back, and the other person feels recognized." },
  { title: "Reads emotional undercurrents", body: "Twos have a natural antenna for what is happening between people beneath the words. In group conversations they often track who is left out, who is hurting, who needs an in." },
  { title: "Remembers the personal detail", body: "They keep a quiet record of what matters to you — a sibling&apos;s name, a worry you mentioned in passing — and they bring it back, which makes their communication feel particular and caring." },
];

const challenges: { title: string; body: string }[] = [
  { title: "Indirect about their own needs", body: "Twos rarely just say what they want. They communicate it through hints, through doing the thing they wish was being done for them, through suggestions framed as for the other person’s benefit." },
  { title: "Frames their wants as your needs", body: "“I just thought you might want some company” is sometimes a true statement and sometimes a Two saying they themselves want company. The framing protects them from the vulnerability of asking." },
  { title: "Resists transactional exchange", body: "Conversations that are purely informational, with no relational warmth, can feel cold or wrong to the Two. They tend to add a personal layer even where it is not needed, which can puzzle more transactional types." },
  { title: "Passive-aggressive when unmet", body: "When the unspoken expectation is not met, the Two can become subtly wounded or cold without naming what happened — leaving the other person unsure what they did but knowing the warmth has left the room." },
];

const tips: string[] = [
  "Reciprocate personal attention — ask about them, not just the topic. They notice when the warmth flows only one way.",
  "When you appreciate what they did, say so specifically. They notice when their giving is taken for granted.",
  "If you need them to be direct, give them explicit permission: “what do you actually want?” lands differently than “tell me if you need anything.”",
  "Do not assume their warmth means agreement — they may be accommodating a position they privately disagree with.",
];

export default function Type2CommunicationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type {typeNum}</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">How Type {typeNum} Communicates</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Twos communicate with warmth first. The relational dimension of any conversation is primary for them — they are always attending to how the other person is feeling, what they need, and whether the connection between them is intact. Information and ideas are secondary to the quality of the exchange.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Communication Style</h2>
            <p className="leading-relaxed text-gray-700">
              The Two&apos;s communication style is warm, personal, and attentive to the other&apos;s emotional state. They ask questions, offer encouragement, and track how you are feeling throughout a conversation with unusual care. They are often excellent at making people feel heard and valued — which makes them naturally effective communicators in most social contexts.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The shadow of this style is that it can be indirect: the Two often communicates what they want or need through hints, suggestions, and doing things for others rather than simply stating the need. When the unspoken expectation is not met, the communication can shift from warm to subtly wounded — and the Two may still not say directly what went wrong.
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
              The Two opens up most when the warmth is mutual and the relational track is honored. These four practices help.
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
