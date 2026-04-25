import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 1;
const typeB = 3;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 1 and 3 Compatibility — The Reformer & The Achiever | Thyself",
  description: "Explore the Enneagram Type 1 and Type 3 compatibility. Both are driven, high-achieving, and oriented toward excellence — the One through principle, the Three through performance. Full analysis of their powerful pairing, the authenticity question, and how both grow.",
  openGraph: {
    title: "Enneagram 1 and 3 Compatibility — The Reformer & The Achiever",
    description: "Type 1 pursues excellence through standards; Type 3 pursues it through results. Both driven toward achievement — explore their effective pairing and where principle meets performance.",
    url: "https://thyself.app/compatibility/enneagram-1/enneagram-3",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-1/enneagram-3" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 1 and 3 Compatibility — The Reformer & The Achiever",
  description: "A full analysis of the Enneagram Type 1 and Type 3 relationship: shared drive for excellence, principle vs. performance tension, authenticity challenges, and growth edges for both types.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-1/enneagram-3",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-1/enneagram-3" },
};

export default function Enneagram1and3Page() {
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
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>3</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 1 &amp; Type 3</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">Two of the Enneagram&rsquo;s most driven types in a single pairing. The One pursues excellence through principle and correctness; the Three pursues it through results and recognition. Together they are a high-functioning, outwardly impressive pair. The deeper question this pairing must answer: is the excellence they share built on integrity, or on performance?</p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-14">
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Who Are They?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorA }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 1</p>
                <p className="mb-3 text-xl font-bold">{nameA}</p>
                <p className="text-sm leading-relaxed opacity-90">Ones are principled, disciplined, and driven by an internalized standard of right and wrong. They hold themselves and others to high ethical expectations and express love through reliability, honesty, and quality. Their shadow: the inner critic can turn outward as judgment, and the pursuit of correctness can crowd out warmth and flexibility.</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 3</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">Threes are driven, adaptive, and oriented toward success and admiration. They are capable, energetic, and gifted at knowing what a situation requires and delivering it. Their shadow: they can lose track of who they actually are beneath the performance, and confuse being admired with being loved.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">Both types respect competence and are repelled by mediocrity. The One is drawn to the Three&rsquo;s genuine capability, confidence, and the energy with which the Three moves through the world. The Three doesn&rsquo;t make excuses; the Three delivers — and this resonates deeply with the One&rsquo;s own standard of quality. The Three looks like someone who takes excellence seriously, which is the One&rsquo;s primary language of value.</p>
            <p className="leading-relaxed text-gray-700">The Three is drawn to the One&rsquo;s principled integrity and groundedness. The Three, who is often acutely aware of their own tendency to adapt and perform, finds the One&rsquo;s moral clarity genuinely appealing — almost restful. The One seems to know who they are without needing to figure out what the situation demands. This stability is attractive to a Three who privately wonders what they would be if they stopped performing.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Shared Drive for Excellence", body: "Both types hold high standards and are genuinely capable of sustained, high-quality effort. Together they build things that work — not just impressively, but well. The One provides the principled quality standard; the Three provides the execution energy and adaptability. In professional and creative partnership, this is one of the Enneagram&rsquo;s most effective pairings." },
                { title: "Mutual Respect for Competence", body: "Both types are repelled by sloppiness and energized by genuine skill. They share a work ethic that neither has to justify to the other — both understand why things should be done properly. This mutual respect creates an unusual ease: neither has to convince the other that effort matters." },
                { title: "Three Warms the One", body: "The Three&rsquo;s social fluency, optimism, and genuine charm can draw the One out of the rigid self-expectation that often isolates them. The Three makes things feel possible, even enjoyable — and the One, who can lose the pleasure of good work in the anxiety about correctness, benefits from the Three&rsquo;s capacity to celebrate what&rsquo;s been done." },
                { title: "One Grounds the Three", body: "The One&rsquo;s principled moral center offers the Three a rare kind of stability. The Three doesn&rsquo;t have to perform for the One; the One cares about who the Three actually is, not just what they&rsquo;ve accomplished. Over time, the One&rsquo;s consistent ethical groundedness invites the Three toward the authenticity they privately long for." },
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
                { title: "Principle vs. Pragmatism", body: "The One holds to principle even when it&rsquo;s costly; the Three adapts to what works. When the Three cuts a corner the One considers essential, or modifies the truth to achieve a result, the One&rsquo;s judgment activates. The Three isn&rsquo;t being dishonest — they&rsquo;re being efficient. The One isn&rsquo;t being rigid — they&rsquo;re being principled. Neither is wrong, but neither can easily see the other&rsquo;s framing." },
                { title: "Correction vs. Admiration", body: "The One corrects; the Three needs to be admired. When the One offers honest feedback — as care, as a form of quality — the Three can experience it as a threat to the image they&rsquo;ve built. The Three may respond by becoming more polished rather than more honest. The One experiences the polish as evasion. The correction deepens; the performance intensifies. Neither reaches the other." },
                { title: "Authenticity Question", body: "The One&rsquo;s directness and principled stance can unmask the Three&rsquo;s performance — sometimes helpfully, sometimes woundingly. The One sees through the Three&rsquo;s adaptations and calls the person underneath, which can be the most intimate experience the Three ever has. But if the Three hasn&rsquo;t chosen to be seen, this exposure feels like an attack rather than an invitation." },
                { title: "Work-Life Imbalance Risk", body: "Both types are driven and can over-invest in external achievement — the One through relentless quality standards, the Three through the next goal. Together they risk building an impressive life that lacks genuine intimacy and rest. Neither type naturally stops; neither naturally invites vulnerability. The relationship can become a well-run partnership without becoming a real bond." },
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
                  {["Distinguishing the Three&rsquo;s adaptability from dishonesty — pragmatism is not the same as inauthenticity", "Leading with appreciation before correction — the Three needs to feel received before they can receive feedback", "Inviting the Three&rsquo;s authentic self rather than exposing the performance through criticism", "Softening the standard enough to allow rest, celebration, and genuine intimacy in the relationship"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 3 grows by</p>
                <ul className="space-y-3">
                  {["Receiving the One&rsquo;s honest feedback as care rather than threat — the One offers it because they take the relationship seriously", "Using the One&rsquo;s moral clarity as an invitation toward authenticity rather than deflecting it with more polish", "Sharing what is hard and uncertain, not just what is working — the One is drawn to who the Three actually is", "Resisting the drive to make everything look good; allowing imperfection in the relationship as a form of genuine intimacy"].map((item, i) => (
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
                { label: "Self-Preservation", body: "SP 1 and SP 3 are both practical and private. This is a quietly functional pairing — both are responsible, both are reliable, and both manage their household and professional life with competence. The risk: neither invests deeply in explicit emotional connection. The relationship runs well but may lack genuine intimacy." },
                { label: "Social", body: "Social 1 and social 3 are both community-facing — the One through reform and accountability, the Three through leadership and vision. This is a natural public-impact pairing. Together they mobilize groups, build organizations, and produce results. The risk: the social domain becomes the primary investment and the private dyad is undersustained." },
                { label: "Sexual / One-to-One", body: "SX 1 brings passionate idealism and intense standards to the relationship; SX 3 brings passionate desire for significance in the beloved&rsquo;s eyes. This is the most charged version — the One&rsquo;s standards and the Three&rsquo;s hunger for admiration create a complex, high-stakes dynamic. At their best: a deeply committed pair driven by shared intensity. At their worst: the correction-performance loop runs at maximum." },
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
            <p className="leading-relaxed text-gray-700">When both are growing, the 1+3 pairing becomes one of the Enneagram&rsquo;s most effectively excellent combinations — and genuinely human beneath the excellence. The One has learned to lead with appreciation, to celebrate what the Three has built, and to invite the authentic person rather than expose the performance. The Three has found in the One a relationship where being real is valued more than being impressive, and has let themselves be known rather than just admired. The One is less corrective; the Three is more honest. Together they build things that are both principled and effective — and they do it as two people who genuinely know each other.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "One: lead with appreciation", body: "Before any feedback or correction, name something the Three did that genuinely impressed you. Not as a formula — as a genuine recognition. The Three needs to feel received before they can receive. Appreciation first transforms the feedback that follows from a threat into a gift." },
                { num: "02", title: "Three: share a failure", body: "Once a week, share something that didn&rsquo;t go perfectly — something uncertain, something hard, something you&rsquo;re not sure about. The One is drawn to your authentic self, not your polished self. Sharing imperfection in this relationship is not a risk; it is the path to the depth you privately want." },
                { num: "03", title: "Build deliberate off-stage time", body: "Both types default to high engagement and output. Create explicit contexts where neither type is performing or improving — a walk, a movie, a dinner with nowhere to be. The relationship needs space that isn&rsquo;t a project, a collaboration, or a growth opportunity. It needs to just be." },
                { num: "04", title: "Name the authenticity invitation", body: "When the One wants to offer feedback, frame it as an invitation rather than a correction: &ldquo;I&rsquo;m more interested in who you actually are in this situation than in the polished version — can you tell me what it&rsquo;s really like?&rdquo; This reframes the One&rsquo;s directness from threat to curiosity." },
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
              {[{ label: "Type 1 — The Reformer", href: "/enneagram/type-1" }, { label: "Type 3 — The Achiever", href: "/enneagram/type-3" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "1 + 2", href: "/compatibility/enneagram-1/enneagram-2" }, { label: "3 + 6", href: "/compatibility/enneagram-3/enneagram-6" }, { label: "1 + 7", href: "/compatibility/enneagram-1/enneagram-7" }].map((link) => (
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
