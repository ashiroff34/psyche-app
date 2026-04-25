import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 2;
const typeB = 3;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 2 and 3 Compatibility — The Helper & The Achiever | Thyself",
  description: "Explore the Enneagram Type 2 and Type 3 compatibility. Both live in the heart triad — both navigate image, love, and identity. Full analysis of their high-achieving warmth, the enabling risk, and how genuine care develops between them.",
  openGraph: {
    title: "Enneagram 2 and 3 Compatibility — The Helper & The Achiever",
    description: "Type 2 gives care; Type 3 pursues success. Both heart triad types — explore the warm high-achieving dynamic, the image-sharing shadow, and what authentic love looks like between them.",
    url: "https://thyself.app/compatibility/enneagram-2/enneagram-3",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-2/enneagram-3" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 2 and 3 Compatibility — The Helper & The Achiever",
  description: "A full analysis of the Enneagram Type 2 and Type 3 relationship: shared heart triad dynamics, the enabling risk, image and authenticity, and growth edges for both types.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-2/enneagram-3",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-2/enneagram-3" },
};

export default function Enneagram2and3Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16" style={{ backgroundColor: colorA }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>2</span>
              <span className="text-2xl font-light text-white opacity-60">+</span>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>3</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 2 &amp; Type 3</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">Both types live in the heart triad and both navigate the question of love and image — the Two by being needed, the Three by being admired. They can make an extraordinarily warm and socially effective pair. The shadow question: is the care real, or is it two image-managers supporting each other&rsquo;s performance?</p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-14">
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Who Are They?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorA }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 2</p>
                <p className="mb-3 text-xl font-bold">{nameA}</p>
                <p className="text-sm leading-relaxed opacity-90">Twos express love through giving and care. They are warm, perceptive about others&rsquo; needs, and driven by a need to be needed. Their shadow: they can lose themselves in giving and become indirectly manipulative when their underlying need for love goes unacknowledged.</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 3</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">Threes express worth through achievement and being admired. They are capable, energetic, and gifted at inspiring others. Their shadow: they can lose track of who they actually are beneath the performance and confuse success with being loved.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">Both types are socially skilled and relationally attuned — they make an effortlessly warm, high-performing couple. The Two is drawn to the Three&rsquo;s confidence, ambition, and the sense that life with a Three will be full of possibility and admiration. The Three is drawn to the Two&rsquo;s genuine warmth and attentiveness — the Two makes the Three feel cared for in a way that doesn&rsquo;t require performance. The Two&rsquo;s giving feels restful rather than demanding.</p>
            <p className="leading-relaxed text-gray-700">Both types also share a social fluency and a desire to be positively regarded by the world around them. This creates easy coordination in social settings and a shared understanding of the importance of presentation and relationship. They present well together and feel understood by each other in their shared orientation toward the relational world.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Social Effectiveness", body: "Both types are gifted in social settings. The Three impresses; the Two includes. Together they are a natural social unit — people are drawn to them, feel welcomed by them, and remember them. In professional and community contexts this pairing is often genuinely powerful." },
                { title: "Warm High Achievement", body: "The Three&rsquo;s ambition is channeled warmly by the Two&rsquo;s relational intelligence. The Two&rsquo;s giving is energized by the Three&rsquo;s momentum and drive. Together they can build things that are both effective and humanly meaningful — neither purely cold achievement nor purely warm sentiment." },
                { title: "Mutual Understanding of Image", body: "Both types understand the relational importance of presentation. Neither is confused by the other&rsquo;s attention to how things look — they share this orientation, even if expressed differently. This creates an unusual mutual understanding: neither judges the other for caring about image." },
                { title: "Two Grounds the Three", body: "The Two&rsquo;s genuine care — not transactional, not competitive — provides the Three with a rare experience of being received rather than evaluated. The Two loves the Three before they&rsquo;ve succeeded at anything in a given moment. For a Three whose sense of worth is tightly bound to performance, this is genuinely healing." },
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
                { title: "The Image Double-Bind", body: "Both types manage image — the Two through being selflessly giving, the Three through being impressively successful. In their shadow forms, neither is fully authentic. The relationship can become a mutual performance rather than a genuine encounter — both supporting the other&rsquo;s image rather than meeting the person beneath it." },
                { title: "The Enabling Risk", body: "The Two&rsquo;s natural inclination is to support and enable. With a Three, this can slide into enabling inauthenticity — the Two accepts and reinforces the Three&rsquo;s performance rather than calling the real person forward. The Three never gets the honest mirror they need for growth; the Two&rsquo;s giving quietly sustains a pattern that doesn&rsquo;t serve either of them." },
                { title: "Three&rsquo;s Self-Absorption", body: "The Three moves fast and focuses on the goal. In periods of high achievement-orientation, the Three can become absorbed in their own success narrative and stop attending to the Two. The Two, giving constantly and receiving little acknowledgment, builds resentment. When it surfaces, the Three is genuinely surprised — they thought things were fine." },
                { title: "Two&rsquo;s Hidden Needs", body: "The Two suppresses their own needs while giving to the Three. The Three, who is not naturally attuned to what hasn&rsquo;t been said explicitly, misses the Two&rsquo;s subtle signals. The Two&rsquo;s resentment compounds; their eventual expression of it feels disproportionate to a Three who received no warning." },
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>Type 2 grows by</p>
                <ul className="space-y-3">
                  {["Naming needs directly rather than waiting for the Three to notice them", "Offering honest mirror rather than unconditional support — asking the Three &ldquo;who are you when you&rsquo;re not performing?&rdquo;", "Receiving the Three&rsquo;s achievements as real care for the relationship rather than self-promotion", "Developing their own life and goals rather than living through the Three&rsquo;s success"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 3 grows by</p>
                <ul className="space-y-3">
                  {["Actively attending to the Two&rsquo;s needs rather than assuming the Two is fine because they haven&rsquo;t said otherwise", "Letting the Two&rsquo;s genuine care invite authenticity — sharing what&rsquo;s hard, not just what&rsquo;s working", "Expressing appreciation for the Two&rsquo;s giving explicitly and specifically — not as performance but as genuine receipt", "Distinguishing the Two&rsquo;s support from enabling — asking for honest mirror rather than unconditional backing"].map((item, i) => (
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
                { label: "Self-Preservation", body: "SP 2 and SP 3 are both relatively private and focused on personal security. This pairing builds a reliable, functional domestic life. The risk: both manage image even at home — the household becomes a performance without genuine rest." },
                { label: "Social", body: "Social 2 and social 3 are both community-oriented. Together they are a natural power couple in community settings — the Two warms the room; the Three leads it. The risk: both can over-invest in the social presentation and under-invest in private intimacy." },
                { label: "Sexual / One-to-One", body: "SX 2 and SX 3 are both intensely focused on their beloved. The Two&rsquo;s passionate giving meets the Three&rsquo;s passionate desire for significance in the relationship. This is the most intimate and potentially most authentic version of this pairing — and the one where the enabling risk is most acute." },
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
            <p className="leading-relaxed text-gray-700">When both are growing, the 2+3 pairing becomes genuinely warm and genuinely effective — not as a performance of those qualities but as their actual expression. The Two has found their voice, asking directly for what they need and offering honest mirror rather than unconditional approval. The Three has found genuine safety, dropping the performance in a relationship where they&rsquo;re accepted before they&rsquo;ve succeeded at anything. Both types relax out of their shadow: the Two is less indirectly manipulative; the Three is less performatively optimized. What remains is two people who care about the world, care about each other, and build together with both warmth and capability.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "Build &ldquo;off-stage&rdquo; time", body: "Deliberately create contexts where neither type is performing — private evenings, low-stakes activities, conversations about uncertainty and failure. This is where the genuine relationship lives, and both types need structure to find it." },
                { num: "02", title: "Two: ask directly", body: "Name what you need before the resentment builds: &ldquo;I&rsquo;d love some attention today — can we do something just for me?&rdquo; The Three responds well to clear direction; they can&rsquo;t manage what hasn&rsquo;t been named." },
                { num: "03", title: "Three: check in actively", body: "Once a week, ask the Two directly: &ldquo;What do you need from me that you&rsquo;re not getting?&rdquo; Then receive the answer without defending or problem-solving immediately. This single practice addresses the Two&rsquo;s core pattern." },
                { num: "04", title: "Name the image dynamic with humor", body: "When both of you notice you&rsquo;re performing — for each other, for the room — learn to name it gently and laugh. &ldquo;We&rsquo;re doing the thing again.&rdquo; Shared self-awareness about the pattern breaks its power without creating shame." },
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
              {[{ label: "Type 2 — The Helper", href: "/enneagram/type-2" }, { label: "Type 3 — The Achiever", href: "/enneagram/type-3" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "2 + 8", href: "/compatibility/enneagram-2/enneagram-8" }, { label: "3 + 6", href: "/compatibility/enneagram-3/enneagram-6" }, { label: "3 + 4", href: "/compatibility/enneagram-3/enneagram-4" }].map((link) => (
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
