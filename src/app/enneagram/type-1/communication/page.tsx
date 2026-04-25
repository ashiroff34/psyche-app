import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 1;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: `Enneagram Type 1 Communication Style — How the ${typeName} Communicates | Thyself`,
  description:
    "How Enneagram Type 1 communicates: precision, principle, and the inner critic at work. Strengths, challenges, and how to talk with a Reformer so you actually reach them.",
  openGraph: {
    title: `Enneagram Type 1 Communication Style — How the ${typeName} Communicates`,
    description:
      "Type 1s communicate with clarity and precision. Understand their style, their blind spots, and how to be heard by the Reformer.",
    url: "https://thyself.app/enneagram/type-1/communication",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-1/communication" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `Enneagram Type 1 Communication Style — How the ${typeName} Communicates`,
  description:
    "How Enneagram Type 1 communicates: precision, principle, and the inner critic at work. Strengths, challenges, and tips for talking with a Reformer.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-1/communication",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-1/communication" },
};

const strengths: { title: string; body: string }[] = [
  { title: "Clarity and precision", body: "Ones use language carefully. They state their position with structure, choose words deliberately, and rarely leave their meaning open to interpretation. In settings that reward accuracy, this is a real gift." },
  { title: "Strong argumentation", body: "They build a case the way an editor builds a paragraph — premise, evidence, conclusion. When the topic matters to them, they can lay out reasoning that is hard to dismiss because it has been thought through." },
  { title: "Follow-through on what is said", body: "If a One says they will do something in a conversation, they treat that as a commitment. Their word and their action are unusually aligned, and partners and colleagues come to trust this." },
  { title: "Honest even when uncomfortable", body: "Ones will say the difficult thing rather than the easy thing. They are not built to flatter or to soften the truth for social comfort, which makes them rare and valuable interlocutors when accuracy matters." },
];

const challenges: { title: string; body: string }[] = [
  { title: "Perceived as critical or correcting", body: "What feels to the One like helpful precision often lands on others as correction. Pointing out a small inaccuracy in someone’s sentence is, for the One, a service to clarity — for the listener, it can feel like being graded." },
  { title: "Difficulty with the emotional layer", body: "Ones often want to establish what is factually true before engaging with how someone feels. In conversations where the feeling is the point, this sequencing can leave the other person feeling unmet." },
  { title: "Indirect signals of displeasure", body: "Rather than say “I am angry,” the One may sigh, become terse, or go quiet in a particular way that signals storm without naming it. The repressed anger of the One often shows up first in tone." },
  { title: "Preachy when values are ignored", body: "When the One feels their core values are being trampled, the inner critic turns outward and they can become lecturing — explaining what is right at length, with a moral edge that closes down the exchange rather than opening it." },
];

const tips: string[] = [
  "Be precise and accurate — the One notices imprecision, and it distracts them from the content of what you are saying.",
  "Don’t interpret their directness as harshness. It is simply how they communicate; it is not aimed at you personally.",
  "If they are correcting you, it usually means they care about getting the thing right, not that they are dismissing you as a person.",
  "Give them time to process. Ones often need to think before they speak, and the pause is the work, not hesitation.",
];

export default function Type1CommunicationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type {typeNum}</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">How Type {typeNum} Communicates</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Ones communicate with precision and principle. They say what they mean, mean what they say, and have little tolerance for ambiguity, vagueness, or saying things for the sake of appearance. Communication is a vehicle for accuracy and for getting things right.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Communication Style</h2>
            <p className="leading-relaxed text-gray-700">
              The One&apos;s communication style is characterized by clarity and directness — they state their position, back it with reasoning, and expect the same from others. They tend to be more comfortable with formal or structured communication than with open-ended social exchange. They are also excellent listeners when the subject is substantive, but may disengage from conversation that they experience as superficial or without purpose.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Their inner critic shapes how they communicate: they often revise, reconsider, and refine before speaking, which can make them seem slow to respond or overly measured. When the inner critic is externalized, they can become corrective or lecturing — pointing out imprecision, inconsistency, or error in others&apos; speech or reasoning without realizing how this lands.
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
              If you want to be heard by a One — and to actually hear them in return — these four practices change the quality of the exchange.
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
