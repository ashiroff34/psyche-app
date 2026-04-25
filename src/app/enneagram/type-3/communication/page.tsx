import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 3;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: `Enneagram Type 3 Communication Style — How the ${typeName} Communicates | Thyself`,
  description:
    "How Enneagram Type 3 communicates: efficient, persuasive, and tuned to the audience. Strengths, blind spots, and how to reach a Three beneath the polished surface.",
  openGraph: {
    title: `Enneagram Type 3 Communication Style — How the ${typeName} Communicates`,
    description:
      "Type 3s communicate efficiently and persuasively. Understand their style, the cost of impression-management, and how to reach them at depth.",
    url: "https://thyself.app/enneagram/type-3/communication",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-3/communication" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `Enneagram Type 3 Communication Style — How the ${typeName} Communicates`,
  description:
    "How Enneagram Type 3 communicates: efficient, persuasive, and audience-aware. Strengths, blind spots, and tips for reaching the Achiever.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-3/communication",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-3/communication" },
};

const strengths: { title: string; body: string }[] = [
  { title: "Clear, confident, compelling", body: "Threes speak with the kind of confidence that makes ideas easy to follow and easy to believe. They package complex content into a story you can act on." },
  { title: "Excellent at framing", body: "They are unusually skilled at presenting an idea in the form most likely to be received. The same content, framed by a Three, feels more accessible and more credible than it might from someone else." },
  { title: "Efficient and to-the-point", body: "Threes do not waste the listener’s time. They get to the headline quickly, give you what you need, and stop. In meetings and presentations this is a real gift." },
  { title: "Reads the room and adapts", body: "They have an almost unconscious sense of what the audience wants to hear and what register the moment calls for. Their communication shape-shifts to fit the context, often without their noticing." },
];

const challenges: { title: string; body: string }[] = [
  { title: "Impression over accuracy", body: "The Three’s instinct to optimize for the response can shade — sometimes without intent — into telling people what they want to hear rather than what is precisely true." },
  { title: "Hard to communicate failure", body: "Talking about a project that did not work, or an outcome they did not hit, is uniquely difficult for a Three. The communication tends to reframe, soften, or skip past the failure rather than sit with it." },
  { title: "Discomfort with no clear outcome", body: "Conversations that are exploratory, ambiguous, or just for the sake of being together can feel inefficient or pointless. The Three keeps trying to move the exchange toward a conclusion." },
  { title: "Polished version of the inner life", body: "When asked how they really are, the Three often answers with a presentable version of their experience rather than the actual one. The packaging happens automatically, even with people they trust." },
];

const tips: string[] = [
  "They communicate best when there is a clear purpose — tell them upfront what the conversation is for.",
  "Appreciate their efficiency; don’t interpret it as coldness. The directness is the care.",
  "To reach them at depth, create a context where the performance is explicitly off — “I’m not asking how it’s going, I’m asking how you actually are.”",
  "Be direct about what you need from the conversation — they are more comfortable with clarity than with open-ended ambiguity.",
];

export default function Type3CommunicationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type {typeNum}</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">How Type {typeNum} Communicates</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Threes communicate efficiently and effectively. They are naturally persuasive, know how to read an audience, and adapt their communication style to whatever will be most effective in the moment. For the Three, communication is often a means to an end — the end being successful accomplishment or a particular impression.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Communication Style</h2>
            <p className="leading-relaxed text-gray-700">
              The Three&apos;s communication is characterized by efficiency, persuasiveness, and an almost unconscious attunement to what the listener wants to hear. They get to the point quickly, package their ideas compellingly, and deliver information with confidence that makes it easy to believe. They are natural presenters.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The limitation of this style is that it can shade into telling people what they want to hear rather than what is accurate — not dishonesty exactly, but a tendency to optimize for the response rather than the truth. In intimate contexts, the Three may struggle to communicate what they are actually experiencing, as opposed to the version of experience that comes across well.
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
              The Three is most reachable when the conversation has a clear shape and the performance is explicitly off. These four practices help.
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
