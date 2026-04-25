import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 7;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: `Enneagram Type 7 Communication Style — How the ${typeName} Communicates | Thyself`,
  description:
    "How Enneagram Type 7 communicates: energy, breadth, and the gift for generative association. Strengths, blind spots, and how to keep an Enthusiast in the room.",
  openGraph: {
    title: `Enneagram Type 7 Communication Style — How the ${typeName} Communicates`,
    description:
      "Type 7s communicate with energy, speed, and infectious enthusiasm. Understand their style, the reframing that avoids difficulty, and how to engage them at depth.",
    url: "https://thyself.app/enneagram/type-7/communication",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-7/communication" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `Enneagram Type 7 Communication Style — How the ${typeName} Communicates`,
  description:
    "How Enneagram Type 7 communicates: energy, breadth, and rapid association. Strengths, blind spots, and tips for engaging the Enthusiast.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-7/communication",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-7/communication" },
};

const strengths: { title: string; body: string }[] = [
  { title: "High energy that lifts conversation", body: "Sevens bring an enlivening force to dialogue. They start things, fuel them, and make participation feel like a generative act rather than an obligation." },
  { title: "Rapid associative thinking", body: "Their minds make connections fast — between fields, ideas, people, possibilities. The unexpected link the Seven offers can open a conversation in directions no one anticipated." },
  { title: "Naturally optimistic", body: "Sevens find the angle that has hope in it. In groups stuck in problem-mode, they often lift the room without forcing it, because their optimism is genuine rather than performed." },
  { title: "Engaging and inclusive", body: "Sevens make space at the table. They notice who has not spoken, fold them in, and tend to communicate in a way that gathers people in rather than excluding them." },
];

const challenges: { title: string; body: string }[] = [
  { title: "Moves too quickly to land", body: "The Seven’s pace can outrun the topic. By the time anyone has caught up to one idea, the Seven is already three associations downstream, and the original thread is lost." },
  { title: "Reframes away from difficulty", body: "When the conversation turns to something painful or stuck, the Seven often pivots to the silver lining or the next plan. The reframing is real coping, but it can leave the difficult thing un-met." },
  { title: "Over-promises in conversation", body: "The plan the Seven generates so enthusiastically in the moment is not always the plan they will execute. The energy of the conversation can be mistaken by both parties for commitment." },
  { title: "Hard to stay in stillness", body: "Conversations that require staying in one place — sitting with grief, waiting in not-knowing, holding a complaint without solving it — can feel constraining and the Seven may exit them prematurely." },
];

const tips: string[] = [
  "Bring energy — they communicate best with people who can match their pace and play with their associations.",
  "If you need them to stay on a difficult topic, say so explicitly before they pivot. They will honor the request when it is named.",
  "Be specific about what you are asking for — they have a high capacity for scope and need to know the parameters of the conversation.",
  "Appreciate their enthusiasm without assuming it translates directly into commitment. The plan made in conversation is not always the plan that gets executed.",
];

export default function Type7CommunicationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type {typeNum}</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">How Type {typeNum} Communicates</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Sevens communicate with energy, speed, and infectious enthusiasm. Their minds move quickly across topics, their associations are rapid and creative, and their communication style tends to be more expansive than linear. Conversations with Sevens are often fun and generative — and sometimes hard to bring to a conclusion.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Communication Style</h2>
            <p className="leading-relaxed text-gray-700">
              The Seven&apos;s communication is characterized by energy, breadth, and a natural gift for generating ideas and making connections. They are quick starters of conversations, enthusiastic contributors to any topic that interests them, and skilled at finding the positive angle in almost any situation — which makes them pleasant but sometimes unrealistic interlocutors.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The limitation is that their speed and breadth can work against depth: conversations that require staying in one place can feel constraining. They may also use reframing and redirection to avoid conversations that are emotionally difficult — pivoting to the positive or the future before the difficult thing has been fully addressed.
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
              The Seven engages most when the conversation is alive and the parameters are clear. These four practices help.
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
