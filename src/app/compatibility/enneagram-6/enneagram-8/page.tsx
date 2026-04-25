import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 6;
const typeB = 8;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

const tips = [
  "Eights: practice offering reassurance explicitly and early — not because you doubt the relationship, but because the Six needs to hear it from you in words, not just infer it from your continued presence.",
  "Sixes: practice taking the Eight at their word. When the Eight says they are committed, believe them. Continued testing does not increase security; it erodes the Eight's trust in the bond.",
  "Both: build explicit agreements about how you will handle conflict. The Eight fights to clear the air; the Six may retreat into anxiety. Agreeing in advance that fighting does not mean the relationship is over removes a major source of Six fear.",
  "Both: leverage your shared strength. You are both courageous, both direct, both capable of formidable loyalty. When you are aligned on something, act on it together — the 6–8 pair in full alliance is one of the most capable and committed combinations the Enneagram offers.",
];

export const metadata: Metadata = {
  title: "Enneagram 6 and 8 Compatibility — Relationship Dynamics & Growth | Thyself",
  description:
    "A deep guide to the Enneagram 6 and 8 relationship. How the Loyalist and the Challenger attract, where they clash, what each needs to grow, and what this pairing looks like at its best. Grounded in Naranjo and Riso-Hudson.",
  openGraph: {
    title: "Enneagram 6 and 8 Compatibility",
    description:
      "Two types who share skepticism, toughness, and a deep loyalty to those they trust — but who arrive at that trust through very different tests. When the protection-seeker and the protector align, they are formidable.",
    url: "https://thyself.app/compatibility/enneagram-6/enneagram-8",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-6/enneagram-8" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 6 and 8 Compatibility — Relationship Dynamics & Growth",
  description:
    "How Enneagram Type 6 and Type 8 relate: attraction, synergies, tensions, growth edges, and what this pairing looks like at its best.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-6/enneagram-8",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-6/enneagram-8" },
};

export default function Compatibility6and8Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="px-6 py-16 text-white" style={{ backgroundColor: colorA }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <div className="rounded-2xl px-5 py-3 text-white text-center" style={{ backgroundColor: colorA }}>
                <p className="text-3xl font-bold">{typeA}</p>
                <p className="text-sm opacity-90">{nameA}</p>
              </div>
              <span className="text-3xl font-light opacity-60">+</span>
              <div className="rounded-2xl px-5 py-3 text-white text-center" style={{ backgroundColor: colorB }}>
                <p className="text-3xl font-bold">{typeB}</p>
                <p className="text-sm opacity-90">{nameB}</p>
              </div>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">
              Type 6 and Type 8
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              Two types who are both skeptical of pretense, both direct when they decide to be, and both capable of fierce, unwavering loyalty. Their shared toughness and distrust of false authority creates a real bond — and the gap between the Six&apos;s anxiety and the Eight&apos;s confidence is what they must navigate.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">

          {/* Type snapshot */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">The Two Types at a Glance</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorA }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 6 — The Loyalist</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Sixes are driven by the need for security in an uncertain world. They manage fear through preparation, alliance-building, and careful testing of who can actually be trusted. They are loyal to a fault once trust is established — but establishing it takes time and evidence. They have a strong sense of fairness, distrust authority they have not personally tested, and can be either quite deferential or surprisingly confrontational depending on their subtype and development.
                </p>
              </div>
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorB }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 8 — The Challenger</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Eights are driven by the need to be strong, self-directed, and to protect what and whom they love from being dominated or betrayed. They engage the world with directness and force, and they test others through confrontation — not to wound but to see who is real and who flinches. Their loyalty, once given, is total. They value people who can stand up to them, who are honest, and who do not require constant management.
                </p>
              </div>
            </div>
          </section>

          {/* Why they attract */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why These Types Attract</h2>
            <p className="leading-relaxed text-gray-700">
              The 6–8 attraction is built on a shared skepticism of pretense and a shared respect for people who are honest about who they are. Both types are allergic to flattery and social performance — they each recognize in the other someone who says what they mean and means what they say. For the Six, the Eight&apos;s directness and strength is deeply compelling: here is someone who is genuinely not afraid, who will not buckle under pressure, who provides exactly the kind of formidable protection the Six has always been quietly seeking.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              For the Eight, the Six&apos;s loyalty is the thing they value most in another person — and the Six, once trust is established, delivers it in full. The Eight also often finds that the Six&apos;s genuine courage (particularly in the counterphobic Six) earns respect: here is someone who knows what fear is and stands up anyway. The Eight&apos;s instinct to protect finds a legitimate and willing target in the Six, and the Six&apos;s need to be protected by someone genuinely powerful finds its answer in the Eight.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Both types also share a certain distrustful relationship to authority and institutions — they prefer to discover who can actually be trusted rather than accepting status claims at face value. This creates a real basis for mutual understanding: both partners know that the other will not simply comply because they are supposed to, which means their trust, when real, is the kind that has been genuinely tested and earned.
            </p>
          </section>

          {/* Natural synergies */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Shared loyalty and commitment",
                  body: "Both types, once committed, are among the most loyal on the Enneagram. Neither abandons easily; neither treats commitment lightly. When this pairing decides it is in, it is actually, durably in — a quality both partners deeply value and rarely find.",
                },
                {
                  title: "Shared distrust of pretense",
                  body: "Neither type has patience for people who are not genuinely what they present themselves to be. Their shared preference for honest, direct engagement creates a relationship where both people can be real rather than managed. The Six does not have to perform confidence they do not feel; the Eight does not have to soften an edge they actually have.",
                },
                {
                  title: "Protection and security",
                  body: "The Eight provides the Six with something genuinely rare: a partner who is not frightened of what frightens the Six. The Eight&apos;s strength, confidence, and protective instinct creates the security the Six&apos;s anxiety has always been searching for. When the Eight is committed to the Six, the Six is among the safest-feeling people in any room.",
                },
                {
                  title: "Courage under pressure",
                  body: "Both types can be genuinely courageous in the face of difficulty — the Eight through direct confrontation, the Six (especially counterphobic) through a kind of loyalty-driven determination that surprises people who have only seen their anxiety. Together they can take on challenges and adversities that would overwhelm more defended or more fragile pairings.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color: colorA }}>{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Core tensions */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Core Tensions</h2>
            <p className="mb-6 leading-relaxed text-gray-700">
              The 6–8 pairing&apos;s deepest tension lives in the difference between anxiety and confidence. The Six scans for threat and needs reassurance; the Eight projects certainty and finds the need for reassurance frustrating. These orientations can create a parent-child dynamic if both partners are not careful.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "The Six's anxiety vs. the Eight's confidence",
                  body: "The Eight&apos;s natural mode is forward, confident, and unafraid. The Six&apos;s natural mode includes a persistent background anxiety that looks for evidence the world is safe. When the Six expresses that anxiety, the Eight&apos;s instinct is often to dismiss or override it — not from cruelty, but because the Eight genuinely does not experience the world as threatening in the same way. The Six may feel unheard; the Eight may feel burdened.",
                },
                {
                  title: "Testing and provocation",
                  body: "Both types are testers, but they test differently. Sixes test loyalty through compliance and alliance — watching to see if the person shows up consistently over time. Eights test trustworthiness through confrontation — pushing to see who holds. These testing styles can clash: the Eight&apos;s direct challenge may activate the Six&apos;s anxiety about whether the relationship is safe; the Six&apos;s loyalty-testing through doubt may activate the Eight&apos;s frustration with anyone who doubts them after everything they have demonstrated.",
                },
                {
                  title: "The authority dynamic",
                  body: "There is a risk in the 6–8 pairing of settling into a structure where the Eight is the authority figure and the Six defers. The Six&apos;s natural orientation toward finding reliable authority can orient around the Eight in a way that is ultimately disempowering for the Six — and that can breed either resentment or a dependency the healthy Eight does not actually want.",
                },
                {
                  title: "The Eight's bluntness and the Six's sensitivity to threat",
                  body: "Eights are direct, sometimes bluntly so. The Six, who has a highly tuned threat-detection system, may experience the Eight&apos;s directness as aggression even when it is not intended as such. The Eight who does not know this about their Six partner may be genuinely puzzled by the Six&apos;s defensive or anxious response to a comment the Eight experienced as straightforward.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold text-gray-900">{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Growth edges */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth Edges</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: colorA }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>For the Six</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Six&apos;s growth involves developing internal authority — not requiring the Eight to be their primary source of security, but finding solid ground in their own perception and judgment. A Six who can trust themselves does not need the Eight to keep proving they are trustworthy. The work is also to distinguish the Eight&apos;s directness from aggression, and to meet it with equal directness rather than with anxiety. The Eight respects the Six who stands up to them far more than the Six who flinches.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: colorB }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>For the Eight</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Eight&apos;s growth in this relationship involves learning to offer reassurance without experiencing it as weakness. The Six is not asking to be coddled — they are asking for the thing the Eight has already decided internally but rarely says out loud: I am here, I am not going anywhere, you can trust me. The Eight who can say these things directly and regularly, rather than assuming the Six should just know them, removes an enormous amount of anxiety from the relationship. The deeper work is at the Eight&apos;s integration point (toward Two): developing genuine tenderness and care as expressions of strength.
                </p>
              </div>
            </div>
          </section>

          {/* Instinctual variants */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Instinctual Variants in the 6–8 Pairing</h2>
            <p className="mb-4 text-sm text-gray-500">
              The three instinctual subtypes (self-preservation, sexual, and social) significantly shape how each type expresses in relationship.
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "sx/6 + sx/8",
                  body: "The sexual Six (counterphobic) brings an intensity and confrontational edge that is more Eight-like than typical Six behavior; the sexual Eight brings focused, possessive one-on-one energy. This can be a highly charged and dynamic pairing — two intense people who are both drawn to testing and to genuine depth. The risk is volatility: both subtypes are high-energy, and the conflict potential is significant if neither partner has done substantial development work.",
                },
                {
                  label: "sp/6 + sp/8",
                  body: "The self-preservation Six is oriented toward security and resource management; the self-preservation Eight — the most controlled and least outwardly aggressive of the Eight subtypes — brings a quieter kind of power and a strong focus on their own comfort and territory. Together they can build a stable, well-protected shared life. The sp/8 is somewhat more emotionally available than other Eight subtypes, which may ease the sp/6's need for reassurance.",
                },
                {
                  label: "so/6 + so/8",
                  body: "Both social subtypes are oriented toward their communities. The social Six is loyal and protective of their group; the social Eight wants to be the group&apos;s protector and to hold the power that ensures the group&apos;s safety. Together they can form a formidably committed force within a shared community — though they may compete for who sets the group&apos;s direction and who speaks for it.",
                },
              ].map(({ label, body }) => (
                <div key={label} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color: colorA }}>{label}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* At their best */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">At Their Best</h2>
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="leading-relaxed text-gray-700">
                When the Six and Eight are both growing, this pairing becomes one of the most formidably loyal and genuinely courageous combinations the Enneagram offers. The Six has found solid ground — both in their own internal authority and in the Eight&apos;s demonstrated commitment — and their anxiety has become a kind of useful vigilance rather than a constant drain. The Eight has found genuine tenderness — the Six&apos;s deep loyalty has opened the Eight to vulnerability they normally armour against, and their strength has become something they share rather than just deploy.
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                At their best, the Six and Eight are a protective, honest, and deeply committed pair. They take care of each other in practical terms. They stand up for each other in the world. They do not pretend or perform for each other — and so what they have is genuinely real. The Six&apos;s instinct for loyalty and the Eight&apos;s instinct for protection combine into something that both partners have likely searched for a long time.
              </p>
            </div>
          </section>

          {/* Practical suggestions */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions for This Pairing</h2>
            <ul className="space-y-4">
              {tips.map((tip) => (
                <li key={tip.slice(0, 30)} className="flex gap-4">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: colorA }}
                  >
                    {tips.indexOf(tip) + 1}
                  </span>
                  <p className="leading-relaxed text-gray-700">{tip}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Related types */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore the Individual Types</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 — The Loyalist</Link>
              <Link href="/enneagram/type-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 — The Challenger</Link>
            </div>
          </section>

          {/* Other compatibility pairs */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Guides</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/compatibility/enneagram-6/enneagram-7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 + Type 7</Link>
              <Link href="/compatibility/enneagram-2/enneagram-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 + Type 8</Link>
              <Link href="/compatibility/enneagram-5/enneagram-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 + Type 8</Link>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: colorA }}>
            <h2 className="mb-3 text-2xl font-bold">Know your type before exploring compatibility</h2>
            <p className="mb-6 text-base opacity-90">
              Compatibility insights are most useful when both people know their actual type — not just their favorite number. Take the free Thyself Enneagram Assessment.
            </p>
            <Link
              href="/assessments"
              className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ color: colorA }}
            >
              Start the assessment
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
