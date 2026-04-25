import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 1;
const typeB = 6;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 1 and 6 Compatibility — The Reformer & The Loyalist | Thyself",
  description: "Explore the Enneagram Type 1 and Type 6 compatibility. Both are responsible, reliable, and oriented toward doing what is right — the One through personal standards, the Six through loyalty and community. Full analysis of their trustworthy pairing, the anxiety meets criticism dynamic, and how both grow.",
  openGraph: {
    title: "Enneagram 1 and 6 Compatibility — The Reformer & The Loyalist",
    description: "Type 1 holds to principle; Type 6 holds to loyalty. Both responsible and community-minded — explore their trustworthy pairing and where criticism meets anxiety.",
    url: "https://thyself.app/compatibility/enneagram-1/enneagram-6",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-1/enneagram-6" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 1 and 6 Compatibility — The Reformer & The Loyalist",
  description: "A full analysis of the Enneagram Type 1 and Type 6 relationship: shared responsibility and reliability, the anxiety and criticism dynamic, community building, and growth edges for both types.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-1/enneagram-6",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-1/enneagram-6" },
};

export default function Enneagram1and6Page() {
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
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>6</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 1 &amp; Type 6</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">Both types are fundamentally responsible — the One through principled personal standards, the Six through loyal community commitment. They share a seriousness about doing what is right and a genuine work ethic that each recognizes and respects in the other. The tension arises when the One&rsquo;s corrective precision triggers the Six&rsquo;s anxiety, or when the Six&rsquo;s anxious questioning triggers the One&rsquo;s impatience.</p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-14">
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Who Are They?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorA }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 1</p>
                <p className="mb-3 text-xl font-bold">{nameA}</p>
                <p className="text-sm leading-relaxed opacity-90">Ones are principled, disciplined, and driven by an internalized standard of right and wrong. They are reliable, honest, and oriented toward doing things correctly. Their shadow: the inner critic runs constantly and can turn outward as judgment or correction that the people they love find exhausting.</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 6</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">Sixes are loyal, warm, and deeply committed to those who earn their trust. They are responsible and perceptive about hidden motives, and they test reliability before fully committing. Their shadow: anxiety can keep them in perpetual doubt — scanning for threats even inside relationships that have proven themselves trustworthy.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">The One and Six share a bedrock of reliability that each finds immediately trustworthy in the other. The Six, who tests dependability before granting trust, encounters in the One someone who does exactly what they say — whose word and action are perfectly aligned. For a Six whose anxiety stems from not knowing whether things can be counted on, the One&rsquo;s consistency is profoundly settling.</p>
            <p className="leading-relaxed text-gray-700">The One is drawn to the Six&rsquo;s genuine loyalty and their shared sense of responsibility. The Six doesn&rsquo;t take commitment lightly — and neither does the One. Both types take their obligations seriously, follow through, and care genuinely about doing right by the people they are committed to. This shared ethical seriousness creates a foundation that both types find rare and trustworthy.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Shared Reliability", body: "Both types follow through. Neither makes promises lightly, and neither abandons what they have committed to. The One&rsquo;s principled follow-through and the Six&rsquo;s loyal consistency create a relationship with an unusual degree of genuine trustworthiness — a bedrock quality that both types value highly and rarely find without qualification." },
                { title: "Community and Responsibility", body: "Both types are oriented toward contributing beyond themselves — the One through improving systems and standards, the Six through loyal participation in community. Together they can build impressive shared investments in family, neighborhood, and community structures. Both take these investments seriously and sustain them reliably." },
                { title: "Six Grounds One&rsquo;s Standards", body: "The One&rsquo;s inner critic applies an absolute standard; the Six&rsquo;s anxiety applies a contextual, social standard. The Six&rsquo;s questioning — &ldquo;but what will others think?&rdquo; — can sometimes surface the One&rsquo;s blind spot about how their standards land on people. The Six&rsquo;s perspective adds a social dimension the One&rsquo;s principled orientation sometimes misses." },
                { title: "One&rsquo;s Clarity Reassures Six", body: "The One&rsquo;s principled clarity — their clear articulation of what is right and why — is a genuine source of reassurance for the anxiety-prone Six. The One knows what they think and why; the One doesn&rsquo;t change positions to manage social impression; the One&rsquo;s ethical center is stable. This stability is exactly what the Six&rsquo;s scanning for reliability wants to find." },
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
                { title: "Correction Triggers Anxiety", body: "The One&rsquo;s corrective impulse — intended as a quality service — lands on the Six&rsquo;s anxiety as evidence that something is wrong, that the Six has failed, that the One&rsquo;s regard for them has shifted. The Six&rsquo;s anxiety spirals; they begin testing for further signs; the One, reading the testing as ingratitude or irrationality, corrects further. The loop compounds." },
                { title: "Anxiety Triggers Impatience", body: "The Six&rsquo;s chronic anxiety and worst-case thinking can feel irrational to the One who sees clearly what is true and what the right action is. The One&rsquo;s impatience with what they experience as unnecessary worry is palpable — and the Six&rsquo;s radar for disapproval reads it as judgment immediately. The Six&rsquo;s anxiety intensifies; the One&rsquo;s impatience intensifies." },
                { title: "Certainty vs. Doubt", body: "The One&rsquo;s certainty about what is right is a function of their internalized standard. The Six&rsquo;s doubt is a function of their scanning process. These orientations are structurally opposite: the One concludes and acts; the Six continues to gather evidence. The One can experience the Six&rsquo;s ongoing questions as a failure to trust; the Six can experience the One&rsquo;s certainty as a failure to think." },
                { title: "Shared Rigidity Risk", body: "Both types can be rigid — the One through principle, the Six through loyalty to established structures. Together they can build a relationship that is very reliable and very stuck — neither type naturally questioning whether the rules they have built still serve them. Growth requires deliberate disruption of patterns both types prefer to maintain." },
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
                  {["Recognizing that the Six&rsquo;s anxiety is not irrationality but a pattern of care — the Six worries about what matters to them", "Offering reassurance before correction — the Six&rsquo;s nervous system needs settling before it can receive feedback", "Softening certainty enough to genuinely listen to the Six&rsquo;s questions — sometimes they surface something the One missed", "Distinguishing the Six&rsquo;s loyalty testing from ingratitude — the Six only tests what they value"].map((item) => (
                    <li key={item.slice(0, 30)} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 6 grows by</p>
                <ul className="space-y-3">
                  {["Receiving the One&rsquo;s correction as the ethical care it actually is — the One holds the Six to the same standard they hold themselves", "Naming anxiety as anxiety rather than expressing it through questions or testing that the One experiences as doubt", "Trusting the One&rsquo;s principled consistency as evidence of reliability rather than continuing to test past the point where trust has been earned", "Distinguishing the One&rsquo;s impatience with their anxiety from disapproval of them as a person"].map((item) => (
                    <li key={item.slice(0, 30)} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorB }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">How Subtypes Shape the Dynamic</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Self-Preservation", body: "SP 1 and SP 6 are both security-oriented and domestic. This is a highly functional pairing for building a stable household — the One ensures quality and routine; the Six manages practical security. The risk: both can become overly rigid about how things are done, and neither naturally disrupts the patterns they have built." },
                { label: "Social", body: "Social 1 and social 6 are both community-facing — the One through reform and accountability, the Six through group loyalty and responsibility. This can be a powerfully effective pairing for shared community engagement. Together they are the people who show up, follow through, and hold others accountable. The tension: both can over-invest in the group at the expense of the relationship." },
                { label: "Sexual / One-to-One", body: "SX 1 brings passionate principled idealism; SX 6 brings intense loyalty and testing. This is the most charged version — the One&rsquo;s standards and the Six&rsquo;s anxiety are both at maximum intensity. The correction-anxiety loop is most acute here. But the SX 6&rsquo;s eventual committed love and the SX 1&rsquo;s passionate idealism are also at their most alive." },
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
            <p className="leading-relaxed text-gray-700">When both are growing, the 1+6 pairing becomes one of the Enneagram&rsquo;s most genuinely trustworthy bonds. The One has learned to offer reassurance before correction, to recognize the Six&rsquo;s anxiety as love rather than irrationality, and to soften certainty enough to genuinely listen. The Six has learned to trust the One&rsquo;s consistency as earned evidence rather than perpetually testing it, and to name anxiety directly rather than expressing it through questioning. Both types relax out of their shadow: the One is less corrective; the Six is less scanning. What remains is a relationship of real reliability, real commitment, and the quiet confidence of two people who have both chosen and earned each other.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "One: reassure first, correct second", body: "Before offering feedback, name something the Six is doing right: &ldquo;I can see how much care you put into this.&rdquo; The Six&rsquo;s nervous system needs to feel safe before it can receive input. Reassurance first is not flattery — it is the setup that makes honest feedback actually useful rather than anxiety-producing." },
                { num: "02", title: "Six: name anxiety as anxiety", body: "When worry is rising, name it directly: &ldquo;I&rsquo;m feeling anxious about X — not because anything is actually wrong, but because my mind goes there.&rdquo; This replaces indirect testing with honest self-disclosure that the One can actually respond to, and that prevents the correction-anxiety loop from starting." },
                { num: "03", title: "Celebrate shared accomplishment", body: "Both types are so oriented toward what is next, what is wrong, and what needs fixing that they rarely pause to recognize what has been built. Build a regular ritual of naming what you have done together — what you have created, sustained, or contributed. Both types need this acknowledgment and neither naturally provides it." },
                { num: "04", title: "Question the shared rules together", body: "Periodically examine the norms you have built as a couple: are they serving you, or just persisting? Both types can maintain rules out of habit rather than conviction. Deliberately reviewing your shared structures — how you make decisions, divide responsibilities, handle conflict — keeps the relationship dynamic rather than rigid." },
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
              {[{ label: "Type 1 — The Reformer", href: "/enneagram/type-1" }, { label: "Type 6 — The Loyalist", href: "/enneagram/type-6" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "1 + 2", href: "/compatibility/enneagram-1/enneagram-2" }, { label: "3 + 6", href: "/compatibility/enneagram-3/enneagram-6" }, { label: "6 + 9", href: "/compatibility/enneagram-6/enneagram-9" }].map((link) => (
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
