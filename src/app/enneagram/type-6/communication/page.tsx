import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 6;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: `Enneagram Type 6 Communication Style — How the ${typeName} Communicates | Thyself`,
  description:
    "How Enneagram Type 6 communicates: questioning, vigilant, and unusually attuned to inconsistency. Strengths, blind spots, and how to talk with a Loyalist.",
  openGraph: {
    title: `Enneagram Type 6 Communication Style — How the ${typeName} Communicates`,
    description:
      "Type 6s communicate with a probing intelligence and sharp eye for inconsistency. Understand their style, the testing dynamic, and how to build trust through conversation.",
    url: "https://thyself.app/enneagram/type-6/communication",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-6/communication" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `Enneagram Type 6 Communication Style — How the ${typeName} Communicates`,
  description:
    "How Enneagram Type 6 communicates: questioning, vigilant, and attuned to inconsistency. Strengths, blind spots, and tips for the Loyalist.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-6/communication",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-6/communication" },
};

const strengths: { title: string; body: string }[] = [
  { title: "Probing intelligence", body: "Sixes ask the question that has not been asked. They identify the assumption everyone else accepted, the contingency no one planned for, the inconsistency under the surface — and the conversation is better for it." },
  { title: "Alert to inconsistency", body: "What other types miss, the Six catches. The mismatch between what someone said last week and what they are saying now lands in the Six’s memory and shapes how they listen." },
  { title: "Loyal once trust is established", body: "When a Six trusts you, the communication becomes warm, devoted, and characterized by unusual care. They show up consistently, follow through on what they said, and have your back in conversations you are not in." },
  { title: "Sharp humor", body: "The Six’s wit is often genuinely funny — sardonic, self-deprecating, observant of the absurd. It is also a communication strategy, a way of testing whether the environment is safe enough to relax in." },
];

const challenges: { title: string; body: string }[] = [
  { title: "Interrogating before trust", body: "Before they trust you, the Six’s probing can feel like cross-examination. The questions are not hostile; they are how the Six finds out whether you are real and reliable. But it can land as suspicion." },
  { title: "Reassurance that does not stick", body: "When anxiety is high, the Six may seek reassurance from a partner or colleague — but the reassurance they receive does not actually settle the underlying anxiety, so the loop repeats." },
  { title: "Anxiety blocks the point", body: "When the Six is running high on worry, they may take a long time to get to the actual question because they are covering all the contingencies first. Listeners can lose the thread." },
  { title: "Testing as a relational pattern", body: "The Six may set up small tests of commitment — a complaint to see how you respond, a contradiction to see if you push back — without realizing they are doing it. The testing is how they verify the relationship is real." },
];

const tips: string[] = [
  "Be consistent — the Six notices and remembers any inconsistency between what you say and what you do, and the gap erodes trust quickly.",
  "Don’t dismiss their concerns as excessive — engage with them seriously, even if you think the worry is unfounded. Dismissal confirms the worst-case story.",
  "Humor works well; they respond to wit and use it themselves, and a shared joke often does what reassurance cannot.",
  "Be patient with the testing — it is how they establish whether the relationship is trustworthy, not a sign that they distrust you in particular.",
];

export default function Type6CommunicationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type {typeNum}</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">How Type {typeNum} Communicates</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Sixes communicate with a questioning intelligence and a sharp attention to what might go wrong. They think out loud, examine all sides of a question, and are unusually attuned to inconsistency and unreliability in others. Their communication reflects both their loyalty and their vigilance.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Communication Style</h2>
            <p className="leading-relaxed text-gray-700">
              The Six&apos;s communication is often characterized by a questioning, testing quality — they probe positions, look for inconsistency, and need to understand not just what is being said but whether it can be trusted. They can be excellent communicators when they feel secure, offering insight, humor, and genuine warmth.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Under pressure or in unfamiliar situations, their communication can become more anxious — cycling through worst-case scenarios, seeking reassurance that doesn&apos;t stick, or being unable to get to the point because they are covering all the contingencies first. Their humor, which is often genuinely funny, is also a communication strategy: wit as a way of testing whether the environment is safe.
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
              The Six relaxes into communication when consistency, patience, and shared humor are present. These four practices help.
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
