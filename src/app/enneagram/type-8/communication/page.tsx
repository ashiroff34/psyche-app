import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 8;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: `Enneagram Type 8 Communication Style — How the ${typeName} Communicates | Thyself`,
  description:
    "How Enneagram Type 8 communicates: direct, powerful, and unfiltered. Strengths, blind spots, and how to talk with a Challenger without losing yourself or them.",
  openGraph: {
    title: `Enneagram Type 8 Communication Style — How the ${typeName} Communicates`,
    description:
      "Type 8s communicate boldly and without softening. Understand their style, why their force can overwhelm, and how to engage them without folding.",
    url: "https://thyself.app/enneagram/type-8/communication",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-8/communication" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `Enneagram Type 8 Communication Style — How the ${typeName} Communicates`,
  description:
    "How Enneagram Type 8 communicates: direct, powerful, and unfiltered. Strengths, blind spots, and tips for engaging the Challenger.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-8/communication",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-8/communication" },
};

const strengths: { title: string; body: string }[] = [
  { title: "Radical clarity and directness", body: "Eights say the thing. They do not bury the lede, hedge the position, or wrap an inconvenient truth in social cushioning. The conversation moves faster because nothing is hidden." },
  { title: "Holds position under pressure", body: "When pushed, the Eight does not collapse and does not become defensive — they hold. Their stability under challenge makes them reliable in high-stakes conversations where weaker stances would fold." },
  { title: "Communicates with authority", body: "There is a presence to how the Eight speaks that commands attention. People listen to them, and they tend to use that bandwidth to say things that need to be said rather than to fill the room." },
  { title: "Gets to the truth quickly", body: "Eights have a low tolerance for evasion and a sharp instinct for what is actually going on. In their company, conversations cut to the real issue faster than they otherwise would." },
];

const challenges: { title: string; body: string }[] = [
  { title: "Overwhelming or intimidating", body: "What feels to the Eight like an honest, engaged exchange can land on others as aggression. Their natural force is larger than they realize, and softer types often pull back from it." },
  { title: "Doesn’t register impact", body: "Eights are often genuinely surprised that they came across as harsh. They were operating in their normal register; they did not perceive that the room had shifted around them." },
  { title: "Closes down indirection", body: "Indirect or ambiguous communication, which other types use to soften a difficult topic, can feel evasive to the Eight. Their impatience with it can shut down the exchange before the other person has gotten there." },
  { title: "Hard to soften the force", body: "Even when the situation calls for tenderness, the Eight may struggle to modulate. The force is the default; softness — though real and present in them — is harder for them to put into words." },
];

const tips: string[] = [
  "Be direct — the Eight respects people who say what they think and gets impatient with anything that feels like avoidance.",
  "Don’t fold under their pushback if you are right; they respect people who hold their ground and tend to lose respect for those who collapse.",
  "Don’t take their directness personally — they communicate this way with everyone, and the force is not aimed at you.",
  "If you need them to modulate, say so explicitly — they often genuinely don’t know they are coming across as overwhelming, and they will dial it back when told.",
];

export default function Type8CommunicationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type {typeNum}</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">How Type {typeNum} Communicates</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Eights communicate directly, powerfully, and without softening their position for the listener&apos;s comfort. They say what they mean immediately, expect the same from others, and have little patience for ambiguity, indirection, or saying the acceptable thing rather than the true one. For the Eight, directness is respect.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Communication Style</h2>
            <p className="leading-relaxed text-gray-700">
              The Eight&apos;s communication style is bold, confident, and often blunt. They get to the point immediately, hold their position under challenge, and communicate with a presence that is hard to ignore. They respect people who communicate the same way — who push back, have their own positions, and do not fold under the Eight&apos;s force.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The limitation is that their communication can be experienced as overwhelming or dismissive by people who do not share their relationship to directness — what the Eight experiences as honest and engaged can land as aggressive or domineering. Their softness, which is real, is rarely communicated directly; it tends to show up in action rather than words.
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
              The Eight engages most when the other person is direct and unafraid. These four practices help.
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
