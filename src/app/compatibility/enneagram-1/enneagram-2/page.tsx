import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 1;
const typeB = 2;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 1 and 2 Compatibility — The Reformer & The Helper | Thyself",
  description: "Explore the Enneagram Type 1 and Type 2 compatibility. The Reformer and the Helper both want to make the world better — one through standards, one through care. Full analysis of their complementary strengths, honesty tension, and shared growth path.",
  openGraph: {
    title: "Enneagram 1 and 2 Compatibility — The Reformer & The Helper",
    description: "Type 1 improves through standards; Type 2 improves through care. Both driven to make things better — explore their complementary dynamic and where criticism meets sensitivity.",
    url: "https://thyself.app/compatibility/enneagram-1/enneagram-2",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-1/enneagram-2" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 1 and 2 Compatibility — The Reformer & The Helper",
  description: "A full analysis of the Enneagram Type 1 and Type 2 relationship: complementary improvement orientations, honesty vs. sensitivity tension, and growth edges for both types.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-1/enneagram-2",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-1/enneagram-2" },
};

export default function Enneagram1and2Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16" style={{ backgroundColor: colorA }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>1</span>
              <span className="text-2xl font-light text-white opacity-60">+</span>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>2</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 1 &amp; Type 2</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">Both types are fundamentally driven to make things better — the One through principled improvement, the Two through generous care. They share a genuine ethical impulse and a desire to contribute. The friction: the One&rsquo;s honesty can wound the Two&rsquo;s need for appreciation; the Two&rsquo;s indirect giving can frustrate the One&rsquo;s need for directness.</p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-14">
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Who Are They?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorA }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 1</p>
                <p className="mb-3 text-xl font-bold">{nameA}</p>
                <p className="text-sm leading-relaxed opacity-90">Ones are principled, disciplined, and driven to do what&rsquo;s right. They hold themselves and others to high standards and express love through quality, reliability, and honesty. Their shadow: a relentless inner critic that can turn outward as judgment or correction.</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 2</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">Twos are warm, generous, and deeply attuned to others&rsquo; needs. They express love through giving and care, and need to feel needed and appreciated. Their shadow: they suppress their own needs and become indirectly manipulative when their giving goes unacknowledged.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">Both types are fundamentally oriented toward contributing — making the world and the people around them better. The One appreciates the Two&rsquo;s genuine warmth and relational intelligence; being around a Two softens the One&rsquo;s rigid self-expectation and brings emotional contact the One often denies themselves. The Two appreciates the One&rsquo;s integrity and reliability — the One does what they say, which is deeply reassuring to a Two whose giving is often strategic and therefore suspicious of others&rsquo; motivations.</p>
            <p className="leading-relaxed text-gray-700">The Two also intuitively senses what the One needs — and the One, who rarely asks for care, finds the Two&rsquo;s attentiveness quietly nourishing. They share a genuine desire to be good people and to be of service. This common ethical ground creates a foundation of values that sustains the relationship through friction.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Shared Service Orientation", body: "Both types want to contribute and care. The One improves systems; the Two improves people. Together they make committed, effective partners in any shared endeavor — the One ensuring quality and integrity, the Two ensuring warmth and relational care. Their shared giving ethic creates genuine partnership." },
                { title: "Integrity Meets Warmth", body: "The One&rsquo;s principled reliability is exactly what a Two finds trustworthy. The Two doesn&rsquo;t have to wonder whether the One&rsquo;s care is conditional or strategic — it isn&rsquo;t. The One&rsquo;s unconditional follow-through is the kind of dependability the Two&rsquo;s giving is always quietly testing for in others." },
                { title: "Two Softens the One", body: "The Two&rsquo;s warmth, attentiveness, and genuine interest in the One&rsquo;s inner life creates a space where the One can relax the internal critic. Being genuinely received — not judged, not corrected — is rare for a One, and the Two does this naturally. Over time this deepens the One&rsquo;s emotional access and flexibility." },
                { title: "Complementary Strengths", body: "In shared projects and home life, the One provides structure and quality; the Two provides warmth and relationship. They run complementary domains naturally — the One handles the systems; the Two handles the people. Neither feels squeezed out of their natural lane." },
              ].map((card) => (
                <div key={card.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                  <h3 className="mb-2 font-bold text-gray-900">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: card.body }} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Tensions</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Correction vs. Sensitivity", body: "The One&rsquo;s corrective impulse meets the Two&rsquo;s acute need for appreciation and approval. The One&rsquo;s feedback — genuinely intended to improve — can land as rejection or ingratitude to the Two who has given so much. The Two may respond with wounded withdrawal; the One, baffled, redoubles the correction." },
                { title: "Directness vs. Indirectness", body: "The One values and practices directness — saying what is true, even when it&rsquo;s uncomfortable. The Two often gives indirectly, withholds their real needs, and expresses displeasure through emotional tone rather than explicit statement. These different communication styles create significant friction: the One can&rsquo;t navigate what isn&rsquo;t said; the Two can&rsquo;t receive what feels like criticism." },
                { title: "Appreciation", body: "The Two needs to feel appreciated — and the One, absorbed in improvement and correctness, may rarely pause to express gratitude for what the Two contributes. The Two&rsquo;s quiet resentment builds; when it surfaces, the One is genuinely surprised. The One gave honest feedback; why isn&rsquo;t that evidence of caring?" },
                { title: "Standards and Freedom", body: "The One&rsquo;s high standards apply to the household, the relationship, and the Two&rsquo;s behavior. The Two, who needs to feel free to give and be received rather than constantly evaluated, can experience the One&rsquo;s standards as a pervasive assessment. Neither is wrong about what they need; they need to build a container where both can coexist." },
              ].map((card) => (
                <div key={card.title} className="rounded-2xl border border-red-100 bg-red-50 p-6">
                  <h3 className="mb-2 font-bold text-gray-900">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: card.body }} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth Edges</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>Type 1 grows by</p>
                <ul className="space-y-3">
                  {["Pausing to name what the Two contributes before offering what could be improved", "Asking for input rather than delivering verdicts — curiosity before correction", "Receiving the Two&rsquo;s care without deflecting or immediately reciprocating in kind", "Recognizing that appreciation is not flattery but fuel — the Two runs on it"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 2 grows by</p>
                <ul className="space-y-3">
                  {["Expressing needs directly rather than expecting the One to intuit them", "Receiving the One&rsquo;s honest feedback as care rather than rejection", "Distinguishing the One&rsquo;s standards from disapproval — the One holds the world to the same standard they hold themselves", "Naming appreciation requests explicitly: &ldquo;I worked hard on this and I&rsquo;d love to hear what you noticed&rdquo;"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorB }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">How Subtypes Shape the Dynamic</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Self-Preservation", body: "SP 1 and SP 2 are both security-oriented and domestic. This is a highly functional pairing for building a stable home — the One ensures quality and routine; the Two ensures warmth and comfort. The risk: both may over-focus on role-fulfillment rather than genuine emotional contact." },
                { label: "Social", body: "Social 1 and social 2 are both community-oriented — the One toward reform and justice, the Two toward service and belonging. This pairing can build impressive shared projects and community engagement. They&rsquo;re both trying to make the world better, just with different emphasis." },
                { label: "Sexual / One-to-One", body: "SX 1 brings passionate idealism and intensity to the relationship; SX 2 brings passionate giving and can become possessive. This is a highly charged combination — both want something deep and real from the relationship. The One&rsquo;s standards and the Two&rsquo;s hunger for appreciation create the most intense version of this pairing&rsquo;s friction." },
              ].map((card) => (
                <div key={card.label} className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">{card.label}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{card.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">At Their Best</h2>
            <p className="leading-relaxed text-gray-700">When both are growing, the 1+2 pairing becomes a genuinely good-making force — in the relationship, in the home, and in the wider community. The One has learned to receive and celebrate the Two&rsquo;s giving; the Two has learned to ask directly and to receive honest feedback as an act of respect rather than rejection. Together they build with integrity and warmth, in equal measure. The One is less rigid; the Two is more honest. Both are more themselves, and both make the world slightly better simply by being together.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "One: lead with appreciation", body: "Before any feedback, name something specific the Two did well. Not as a formula but as a genuine practice of noticing. The Two&rsquo;s nervous system relaxes when it&rsquo;s been seen positively first — and they&rsquo;ll be far more able to receive the honest observation that follows." },
                { num: "02", title: "Two: make requests explicit", body: "Instead of giving in hopes of receiving, ask: &ldquo;I&rsquo;d really love acknowledgment for this — can you tell me what you noticed?&rdquo; The One is not naturally attuned to recognition rituals; they need the request to respond to it. Explicit requests remove the guessing game for both." },
                { num: "03", title: "Separate improvement from appreciation", body: "Build two different kinds of conversations: one for honest feedback and improvement (the One&rsquo;s natural language), and one for celebration and appreciation (the Two&rsquo;s fuel). Don&rsquo;t mix them in the same sitting — each needs its own container." },
                { num: "04", title: "Name the shared ethical foundation", body: "Both types care deeply about being good people and contributing to others. Naming this explicitly — &ldquo;I appreciate that we both genuinely care about X&rdquo; — reinforces the common ground that sustains the relationship through friction." },
              ].map((item) => (
                <div key={item.num} className="flex gap-5 rounded-2xl border border-gray-100 p-6">
                  <span className="shrink-0 text-2xl font-bold text-gray-200">{item.num}</span>
                  <div><h3 className="mb-1 font-bold text-gray-900">{item.title}</h3><p className="text-sm leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: item.body }} /></div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore These Types</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "Type 1 — The Reformer", href: "/enneagram/type-1" }, { label: "Type 2 — The Helper", href: "/enneagram/type-2" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "1 + 4", href: "/compatibility/enneagram-1/enneagram-4" }, { label: "1 + 7", href: "/compatibility/enneagram-1/enneagram-7" }, { label: "2 + 8", href: "/compatibility/enneagram-2/enneagram-8" }, { label: "2 + 9", href: "/compatibility/enneagram-2/enneagram-9" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: colorA }}>
            <h2 className="mb-3 text-2xl font-bold">Understand your Enneagram type</h2>
            <p className="mb-6 text-base opacity-90">Take the free Thyself Enneagram Assessment. 15 minutes, no email required. Grounded in Ichazo and Naranjo&rsquo;s original framework.</p>
            <Link href="/assessments" className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90" style={{ color: colorA }}>Start the assessment</Link>
          </section>
        </div>
      </main>
    </>
  );
}
