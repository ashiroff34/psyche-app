import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 4;
const typeB = 6;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 4 and 6 Compatibility — The Individualist & The Loyalist | Thyself",
  description: "Explore the Enneagram Type 4 and Type 6 compatibility. The Individualist brings emotional depth and a longing to be seen; the Loyalist brings anxious loyalty and a need for certainty. Full analysis of their intense dynamic, the testing vs. sensitivity tension, and how both grow.",
  openGraph: {
    title: "Enneagram 4 and 6 Compatibility — The Individualist & The Loyalist",
    description: "Type 4 needs to be seen as unique; Type 6 needs certainty before trust. Both intense and loyal — explore their depth-seeking dynamic and where anxiety meets emotional sensitivity.",
    url: "https://thyself.app/compatibility/enneagram-4/enneagram-6",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-4/enneagram-6" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 4 and 6 Compatibility — The Individualist & The Loyalist",
  description: "A full analysis of the Enneagram Type 4 and Type 6 relationship: depth vs. certainty, emotional sensitivity and anxious testing, the loyalty they both seek, and growth edges for both types.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-4/enneagram-6",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-4/enneagram-6" },
};

export default function Enneagram4and6Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16" style={{ backgroundColor: colorA }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>4</span>
              <span className="text-2xl font-light text-white opacity-60">+</span>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>6</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 4 &amp; Type 6</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">Both types are intensely loyal and intensely self-doubting — the Four doubting whether they will ever truly be known; the Six doubting whether what they see can be trusted. They are drawn together by a shared emotional seriousness and a hunger for real, committed relationship. The friction: the Four&rsquo;s sensitivity is triggered exactly by the Six&rsquo;s testing, and the Six&rsquo;s anxiety is triggered exactly by the Four&rsquo;s volatility.</p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-14">
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Who Are They?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorA }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 4</p>
                <p className="mb-3 text-xl font-bold">{nameA}</p>
                <p className="text-sm leading-relaxed opacity-90">Fours orient toward depth, authenticity, and the longing to be truly seen and known. They are emotionally intense, creative, and acutely attuned to what is missing. Their shadow: they can become lost in the story of their own uniqueness and withdraw when connection doesn&rsquo;t meet their ideal of depth.</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 6</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">Sixes orient toward loyalty, security, and the detection of hidden threats. They are warm, responsible, and deeply committed once trust is established. Their shadow: anxiety drives perpetual testing — even of what is real and dependable — making genuine rest inside a relationship difficult to sustain.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">Both types want what the other offers most naturally. The Four is drawn to the Six&rsquo;s genuine loyalty — once a Six is committed, they are deeply, reliably there, and this is exactly the kind of steadfast presence the Four has always longed for. The Six&rsquo;s thoroughness in knowing the Four feels like being truly seen rather than glanced at.</p>
            <p className="leading-relaxed text-gray-700">The Six is drawn to the Four&rsquo;s emotional honesty and depth. Sixes are sensitive to inauthenticity and can detect performance from a distance. The Four rarely performs — they live openly in the full register of their emotional life, and this genuineness is profoundly reassuring to a Six whose radar is tuned for what&rsquo;s hidden. The Four is what they appear to be. This is a rare relief for the Six&rsquo;s vigilance.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Mutual Depth and Seriousness", body: "Neither type is drawn to superficiality. Both take relationships seriously, take emotional truth seriously, and are capable of sustained intimate engagement. They can meet each other in depth that neither finds easily with other types — conversations that go somewhere real, a shared willingness to stay with what is hard." },
                { title: "Shared Hunger for Real Loyalty", body: "The Four longs for a love that is chosen, sustained, and particular. The Six&rsquo;s committed loyalty — once established — is exactly that. The Six doesn&rsquo;t stay out of inertia; they stay because they have decided. This kind of deliberate, maintained commitment is the most nourishing experience available to a Four." },
                { title: "Four Grounds Six in Feeling", body: "The Six&rsquo;s anxiety often lives in the thinking center — perpetual scanning, projection, what-ifs. The Four&rsquo;s comfort with emotional reality offers the Six a different orientation: what is actually felt, not just feared. The Four&rsquo;s emotional fluency can help the Six move from anxious thinking into genuine feeling, which often calms rather than escalates." },
                { title: "Six Provides Stable Ground", body: "The Four&rsquo;s emotional landscape is variable — highs and lows, longing and fulfillment, presence and withdrawal. The Six&rsquo;s characteristic steadiness — their reliable return, their consistent presence — provides exactly the stable ground the Four needs to weather their own emotional tides without catastrophizing about the relationship." },
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
                { title: "Testing Wounds the Four", body: "The Six&rsquo;s anxiety expresses itself through testing — watching to see what the Four will do, questioning motivations, probing for reliability. To the Four, whose deepest wound is not being truly seen or valued, the Six&rsquo;s questioning doesn&rsquo;t read as caution — it reads as doubt that the Four is worthy of trust. The Four doesn&rsquo;t fail the test; they experience the test as a verdict already delivered." },
                { title: "Four&rsquo;s Volatility Activates Six&rsquo;s Anxiety", body: "The Four&rsquo;s emotional variability — the withdrawals, the intensity swings, the periods of melancholy — is existentially frightening to the Six whose security depends on predictability. The Six reads the Four&rsquo;s withdrawal as a threat signal and responds with heightened vigilance, questions, and testing. This is exactly what makes the Four withdraw further. The loop is self-sealing." },
                { title: "Sensitivity vs. Skepticism", body: "The Four takes emotional responses seriously and reads relational tone as meaningful information. The Six approaches relational data skeptically — they investigate before concluding. The Four&rsquo;s emotional interpretation moves fast; the Six&rsquo;s verification process moves deliberately. The Four concludes something has changed; the Six is still gathering evidence. Both are trying to know what&rsquo;s real, but their epistemologies are incompatible in the moment." },
                { title: "Uniqueness and Normalcy", body: "The Four orients toward what is singular, particular, and distinct. The Six often finds comfort in what is shared, communal, and reliable. The Six&rsquo;s appeal to norms or group consensus can feel to the Four like a failure of genuine engagement. The Four&rsquo;s insistence on their own particularity can feel to the Six like instability or self-absorption. Neither can easily access the other&rsquo;s orientation at first." },
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>Type 4 grows by</p>
                <ul className="space-y-3">
                  {["Understanding that the Six&rsquo;s testing is not a verdict on the Four&rsquo;s worth — it is the Six&rsquo;s anxious love expressed through caution", "Staying present during the Six&rsquo;s questioning rather than withdrawing — withdrawal reads as confirmation of the Six&rsquo;s worst fear", "Naming emotional states directly rather than expressing them through tone shifts or withdrawal that the Six can&rsquo;t navigate", "Receiving the Six&rsquo;s consistent loyalty as the particular form of love it actually is — not glamorous, but real"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 6 grows by</p>
                <ul className="space-y-3">
                  {["Recognizing that the Four&rsquo;s emotional variability is not instability in the relationship — it is the Four&rsquo;s internal weather, not a relational verdict", "Naming anxiety as anxiety rather than expressing it through testing or interrogation that wounds the Four", "Receiving the Four&rsquo;s emotional honesty as the trust signal it is — the Four shows what is real rather than managing how they appear", "Distinguishing emotional intensity from unreliability — the Four&rsquo;s depth of feeling is one of the relationship&rsquo;s gifts, not its threat"].map((item, i) => (
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
                { label: "Self-Preservation", body: "SP 4 and SP 6 are both relatively private and concerned with personal security. This is the most contained version of this pairing — neither is particularly public about their emotional life. The SP 4&rsquo;s quiet endurance meets the SP 6&rsquo;s practical reliability. The testing and sensitivity dynamic is present but less dramatically expressed." },
                { label: "Social", body: "Social 4 and social 6 are both community-conscious — the Four through aesthetic and cultural contribution, the Six through group loyalty and responsibility. They can find genuine common ground in causes, community projects, or shared ideals. The tension: the Four&rsquo;s need for recognition as unique sits uneasily with the Six&rsquo;s orientation toward the group." },
                { label: "Sexual / One-to-One", body: "SX 4 and SX 6 are both intensely focused on the beloved and both prone to extremes in the relationship. The SX 4&rsquo;s passionate idealization meets the SX 6&rsquo;s intense loyalty testing. This is the most volatile version — both types at their most activated. But it is also the most potentially transformative: the SX 6&rsquo;s eventual committed love and the SX 4&rsquo;s need to be chosen are a perfect match when both can get through the fear." },
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
            <p className="leading-relaxed text-gray-700">When both are growing, the 4+6 pairing achieves a quality of committed, emotionally honest love that is genuinely rare. The Four has found someone whose loyalty is real — not poetic or conditional, but steady and repeatedly chosen. The Six has found someone whose emotional authenticity makes the anxious scanning unnecessary — what you see is what is actually there. The Four is less withdrawn; the Six is less watchful. Both types have moved toward what they most feared: the Four toward trusting that the relationship won&rsquo;t disappear; the Six toward trusting that what they see is real. The result is a deeply bonded pair, serious about each other, serious about their life together, and capable of a sustained intimacy that neither achieves easily elsewhere.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "Six: name the test before running it", body: "When you notice you&rsquo;re watching to see what the Four will do, say so: &ldquo;I realize I&rsquo;m waiting to see if you&rsquo;ll follow through here — can I just tell you I need that directly?&rdquo; This replaces the indirect test with a direct request the Four can actually respond to, and it stops the wound before it forms." },
                { num: "02", title: "Four: stay when you want to withdraw", body: "When the Six&rsquo;s questioning activates the Four&rsquo;s shame response, the instinct is to withdraw. Practice staying instead — even briefly: &ldquo;I&rsquo;m feeling stung right now and I want to disappear, but I&rsquo;m staying.&rdquo; This single act is more reassuring to the Six than almost anything else the Four can say." },
                { num: "03", title: "Build a shared vocabulary for the cycles", body: "Name the loop when you&rsquo;re in it: &ldquo;I think we&rsquo;re doing the thing where you test and I retreat.&rdquo; Shared pattern recognition, named with some humor and without blame, interrupts the cycle at the pattern level rather than the content level. This is a couples&rsquo; therapy tool that works especially well for this pairing." },
                { num: "04", title: "Celebrate the Six&rsquo;s loyalty explicitly", body: "The Four runs on being seen and valued for what is particular about them. The Six&rsquo;s loyalty — their reliability, their return, their choosing — is particular and real. The Four grows by learning to receive this as the form of love it is: &ldquo;You always come back. I notice that. It matters.&rdquo;" },
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
              {[{ label: "Type 4 — The Individualist", href: "/enneagram/type-4" }, { label: "Type 6 — The Loyalist", href: "/enneagram/type-6" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "4 + 5", href: "/compatibility/enneagram-4/enneagram-5" }, { label: "4 + 9", href: "/compatibility/enneagram-4/enneagram-9" }, { label: "3 + 6", href: "/compatibility/enneagram-3/enneagram-6" }].map((link) => (
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
