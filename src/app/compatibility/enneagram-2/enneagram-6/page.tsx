import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 2;
const typeB = 6;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 2 and 6 Compatibility — The Helper & The Loyalist | Thyself",
  description: "Explore the Enneagram Type 2 and Type 6 compatibility. Both types are warm, caring, and oriented toward community and belonging. Full analysis of their mutual support, the anxiety and trust dynamic, and how this reliable pairing grows.",
  openGraph: {
    title: "Enneagram 2 and 6 Compatibility — The Helper & The Loyalist",
    description: "Type 2 gives care; Type 6 gives loyalty. Both warm and community-oriented — explore their complementary support dynamic and where testing meets giving in this reliable pairing.",
    url: "https://thyself.app/compatibility/enneagram-2/enneagram-6",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-2/enneagram-6" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 2 and 6 Compatibility — The Helper & The Loyalist",
  description: "A full analysis of the Enneagram Type 2 and Type 6 relationship: shared warmth and community values, trust-testing dynamics, anxiety management, and growth edges for both types.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-2/enneagram-6",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-2/enneagram-6" },
};

export default function Enneagram2and6Page() {
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
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>6</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 2 &amp; Type 6</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">Both types are warm, community-oriented, and driven by care — the Two through giving, the Six through loyalty. They are natural allies, natural supporters of others, and natural builders of the relational networks that make life feel safe. The challenge: the Six&rsquo;s testing can exhaust the Two&rsquo;s giving.</p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-14">
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Who Are They?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorA }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 2</p>
                <p className="mb-3 text-xl font-bold">{nameA}</p>
                <p className="text-sm leading-relaxed opacity-90">Twos give love warmly, generously, and perceptively. They are attuned to others&rsquo; needs and driven by a need to be needed and appreciated. Their shadow: they suppress their own needs and become indirectly manipulative when their giving goes unreciprocated.</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 6</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">Sixes are loyal, warm, and deeply committed to those who earn their trust. They are responsible and perceptive about hidden motives, and they test reliability before fully committing. Their shadow: anxiety can keep them in a perpetual state of doubt, making genuine trust difficult to sustain even after it&rsquo;s been earned.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">The Two and Six share a genuine warmth, a care for community, and a sense of responsibility toward others. They are both oriented toward belonging and toward making those around them feel supported. The initial connection often forms easily — both are friendly, warm, and attuned to others&rsquo; comfort.</p>
            <p className="leading-relaxed text-gray-700">The Two is drawn to the Six&rsquo;s loyalty and genuine commitment — once the Six is in, they&rsquo;re truly in, and this is exactly what a Two longs for. The Six is drawn to the Two&rsquo;s warmth and attentiveness — a Two in the room feels like safety, like someone who will notice and respond to what&rsquo;s needed. Both types relax in each other&rsquo;s company in a way they don&rsquo;t always find elsewhere.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Mutual Care and Loyalty", body: "Both types genuinely care for those they love and demonstrate it through steady, reliable action. The Two gives attention, care, and warmth; the Six gives loyalty, reliability, and protective vigilance. Together they create a relationship of real mutual support — both partners feel genuinely looked after." },
                { title: "Community Building", body: "Both types are naturally community-oriented. The Two builds connections; the Six builds trusted networks. Together they tend to be at the center of strong relational communities — the kind of people others turn to, gather around, and trust. The Two warms the room; the Six holds it accountable." },
                { title: "Two Reassures the Six", body: "The Two&rsquo;s consistent warmth and attentiveness is reassuring to the Six who is always scanning for signs of unreliability. The Two shows up consistently; the Two remembers things; the Two cares visibly. Over time this accumulated evidence genuinely settles the Six&rsquo;s anxiety." },
                { title: "Six Grounds the Two", body: "The Six&rsquo;s loyal commitment — once established — gives the Two the consistent, dependable love they are always quietly seeking. The Six isn&rsquo;t going anywhere. This is genuinely healing for a Two whose giving is often motivated by an underlying fear of being unloved." },
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
                { title: "Testing Exhausts Giving", body: "The Six tests reliability before granting trust — and continues testing even after trust is established. The Two gives and gives, expecting that this generosity will eventually be received without further qualification. When the Two&rsquo;s giving is still met with Six&rsquo;s doubt or testing, the Two eventually erupts in resentment. The Six is confused: they thought they were being careful, not ungrateful." },
                { title: "Anxiety and Warmth", body: "The Two&rsquo;s orientation is warm and forward-moving; the Six&rsquo;s orientation includes chronic anxiety and worst-case thinking. The Two may experience the Six&rsquo;s anxiety as exhausting or as a failure to appreciate what they have. The Six may experience the Two&rsquo;s warm reassurance as not taking their concerns seriously." },
                { title: "Both Suppress Needs", body: "Both types have difficulty expressing their own needs directly. The Two suppresses through giving; the Six suppresses through responsibility and vigilance. In this relationship, both may be waiting for the other to intuit what they need. Without explicit communication, both can feel unseen despite genuine mutual care." },
                { title: "Two&rsquo;s Indirect Manipulation", body: "When the Two&rsquo;s giving goes unacknowledged, they can become indirectly manipulative — emotional tone shifts, strategic withholding, guilt signals. The Six&rsquo;s finely tuned radar for hidden motives picks this up immediately and activates their distrust. The Two may not even consciously know they&rsquo;re doing it; the Six experiences it as a significant betrayal." },
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
                  {["Naming needs explicitly rather than giving in hopes of receiving in return", "Recognizing that the Six&rsquo;s testing is not ingratitude but a pattern of love — the Six only tests what matters to them", "Staying honest rather than managing the Six through strategic warmth or guilt signals", "Allowing the Six&rsquo;s earned loyalty to be received as the love it is"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 6 grows by</p>
                <ul className="space-y-3">
                  {["Receiving the Two&rsquo;s consistent giving as trustworthy evidence rather than perpetually testing for exceptions", "Naming anxiety explicitly rather than expressing it through loaded questions or indirect testing", "Expressing appreciation directly and specifically for what the Two provides", "Distinguishing the Two&rsquo;s occasional indirect manipulation from general dishonesty — pointing it out directly rather than distancing"].map((item, i) => (
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
                { label: "Self-Preservation", body: "SP 2 and SP 6 are both oriented toward practical security and domestic stability. This is a reliable, functional pairing for building a secure home life. Both are responsible; both manage. The risk: neither may express needs with enough emotional directness, and both quietly accumulate unexpressed expectations." },
                { label: "Social", body: "Social 2 and social 6 are a natural community-building team. The Two connects people; the Six organizes and holds them accountable. Together they create the kind of relational infrastructure that communities depend on. The tension: both can over-invest in others at the expense of the dyad." },
                { label: "Sexual / One-to-One", body: "SX 2 and SX 6 are both intensely focused on the beloved. The Two&rsquo;s passionate giving meets the Six&rsquo;s intense loyalty testing. This is the most charged combination — the Six&rsquo;s radar for authenticity is at full intensity with the SX subtype, and the Two&rsquo;s indirect giving habits are most likely to trigger it." },
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
            <p className="leading-relaxed text-gray-700">When both are growing, the 2+6 pairing becomes one of the Enneagram&rsquo;s most genuinely supportive bonds. The Two has found in the Six a person whose loyalty is real, earned, and deeply committed — the love the Two has always given so generously to others is finally flowing back with full force. The Six has found in the Two a person whose warmth is proven through consistent behavior — not just performed, but actual. Both types relax out of their shadow: the Two is more honest and direct; the Six is less anxiously testing and more openly trusting. What remains is two people genuinely caring for each other, building together, and holding the community around them with remarkable warmth and reliability.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "Two: ask directly for appreciation", body: "&ldquo;I worked hard on this — can you tell me what you noticed?&rdquo; The Six responds well to explicit requests; they can&rsquo;t always recognize when appreciation is needed from subtle signals. The direct request removes the guessing game and lets the Six actually give what the Two needs." },
                { num: "02", title: "Six: name the test before running it", body: "When you notice you&rsquo;re watching to see what the Two will do, say so: &ldquo;I realize I&rsquo;m waiting to see if you&rsquo;ll follow through here. I&rsquo;d rather just tell you that&rsquo;s what I need.&rdquo; This replaces the exhausting indirect testing with direct communication that the Two can actually respond to." },
                { num: "03", title: "Build explicit appreciation rituals", body: "Both types thrive on feeling genuinely appreciated. Build a regular ritual — weekly, brief — where each person names something specific the other did that mattered to them. This systematizes the appreciation both need without requiring either to perform or to guess." },
                { num: "04", title: "When anxiety spikes, name it together", body: "When the Six&rsquo;s anxiety rises and the Two&rsquo;s giving intensifies in response, name the pattern together: &ldquo;I notice we&rsquo;re in a loop right now.&rdquo; This shared naming breaks the loop and turns a reactive cycle into a conscious conversation." },
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
              {[{ label: "Type 2 — The Helper", href: "/enneagram/type-2" }, { label: "Type 6 — The Loyalist", href: "/enneagram/type-6" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "2 + 9", href: "/compatibility/enneagram-2/enneagram-9" }, { label: "3 + 6", href: "/compatibility/enneagram-3/enneagram-6" }, { label: "6 + 9", href: "/compatibility/enneagram-6/enneagram-9" }].map((link) => (
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
