import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 3;
const typeB = 6;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 3 and 6 Compatibility — The Achiever & The Loyalist | Thyself",
  description:
    "Explore the Enneagram Type 3 and Type 6 compatibility. The Achiever and the Loyalist are connected by integration arrows — Type 3 grows toward Type 6. Full analysis of their trust dynamic, success vs. loyalty tension, and how authenticity becomes the shared growth edge.",
  openGraph: {
    title: "Enneagram 3 and 6 Compatibility — The Achiever & The Loyalist",
    description: "Type 3 pursues success; Type 6 seeks loyalty and safety. Connected by integration lines — explore the trust dynamic at the heart of this pairing and how each grows through the other.",
    url: "https://thyself.app/compatibility/enneagram-3/enneagram-6",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-3/enneagram-6" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 3 and 6 Compatibility — The Achiever & The Loyalist",
  description: "A full analysis of the Enneagram Type 3 and Type 6 relationship: integration line connection, trust as the central issue, the image vs. authenticity tension, and growth edges for both types.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-3/enneagram-6",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-3/enneagram-6" },
};

export default function Enneagram3and6Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16" style={{ backgroundColor: colorA }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>3</span>
              <span className="text-2xl font-light text-white opacity-60">+</span>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>6</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 3 &amp; Type 6</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">
              The Three and Six are connected by one of the Enneagram&rsquo;s integration arrows — the Three grows toward Six qualities in health. This makes the Six a mirror of the Three&rsquo;s own growing edge: loyalty, authenticity, and the courage to be real rather than just successful.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-14">
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Who Are They?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorA }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 3</p>
                <p className="mb-3 text-xl font-bold">{nameA}</p>
                <p className="text-sm leading-relaxed opacity-90">Threes are driven by a need to succeed and be admired. They are adaptable, efficient, and gifted at reading what a given environment values — then becoming that. Their gift is an extraordinary capacity for achievement and inspiration. Their shadow: they can lose track of who they actually are beneath the performance, substituting image for identity.</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 6</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">Sixes seek safety through loyalty, preparation, and trusted relationships. They are responsible, perceptive about hidden motives, and deeply committed to those they trust. Their gift is reliability and a kind of courageous loyalty. Their shadow: anxiety and doubt can make them hypervigilant, second-guess themselves, and project threat onto people or systems they haven&rsquo;t yet fully trusted.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">Because Type 3 integrates toward Type 6, a healthy Three is actively developing Six qualities — loyalty, emotional authenticity, and the willingness to be real rather than just successful. The Six in the relationship represents this direction: they embody what the Three is reaching toward. This creates a deep, often unconscious pull.</p>
            <p className="leading-relaxed text-gray-700">The Three is drawn to the Six&rsquo;s loyalty and groundedness — two things the Three can&rsquo;t manufacture through performance. The Six&rsquo;s commitment is earned, not given, which means it means more than the casual admiration the Three usually receives. The Six, in turn, is drawn to the Three&rsquo;s confidence and capability. The Three models a way of moving through the world without the anxiety that plagues the Six — and that is genuinely appealing.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Complementary Orientations", body: "The Three drives toward achievement; the Six provides the loyalty and groundedness that makes achievement sustainable. In collaborative projects, this pairing is formidable — the Three provides vision, energy, and execution; the Six provides preparation, problem-anticipation, and steadfast support. Together they accomplish more than either alone." },
                { title: "Integration Line Depth", body: "Because Three grows toward Six, the Six in the relationship models the Three&rsquo;s own psychological development. When the Three is growing, they naturally develop the Six&rsquo;s qualities — loyalty, cooperative teamwork, emotional authenticity. This gives the Six&rsquo;s natural traits a particular resonance and developmental significance for the Three." },
                { title: "Shared Competence", body: "Both types are oriented toward doing well. Threes excel at performance and results; Sixes excel at preparation and reliability. They share a work ethic and a desire to be genuinely useful that creates productive harmony. Neither is content with half-effort." },
                { title: "Mutual Protection", body: "The Three, at their best, becomes a protector of the Six&rsquo;s security — using their capability and social positioning to create safety. The Six, at their best, becomes a fierce advocate for the Three&rsquo;s authentic self — refusing to accept the performance and calling the real person forward. Both protect something the other needs." },
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
                { title: "Image vs. Authenticity", body: "The Six has a finely tuned radar for inauthenticity — they can smell performance and it activates distrust. The Three&rsquo;s natural mode is to adapt and present the most successful version of themselves. This creates direct friction: the more the Three performs, the less the Six trusts them. The Three may feel unfairly scrutinized; the Six may feel they can never relax into the relationship." },
                { title: "Success vs. Loyalty", body: "The Three measures worth through achievement and external recognition; the Six measures worth through loyalty and reliability. These value systems can clash in priorities, resource allocation, and what gets celebrated. The Three may pursue opportunities that the Six experiences as destabilizing. The Six&rsquo;s caution may read as lacking ambition to the Three." },
                { title: "Six&rsquo;s Anxiety", body: "The Three is constitutionally optimistic and forward-moving; the Six tends toward doubt, worst-case thinking, and hypervigilance. The Three may experience the Six&rsquo;s anxiety as an obstacle rather than wisdom. The Six may experience the Three&rsquo;s confidence as bypassing legitimate concerns. Both are often right — and both often feel misunderstood." },
                { title: "Trust Is Slow", body: "The Six does not give trust quickly or easily — it is tested repeatedly before it is granted. The Three, accustomed to positive reception, can find this prolonged testing exhausting or insulting. But there&rsquo;s no shortcut: the Three must demonstrate loyalty over time, not perform it in a moment." },
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>Type 3 grows by</p>
                <ul className="space-y-3">
                  {["Letting the Six&rsquo;s loyalty radar be a mirror for authenticity — where the Six senses performance, something real is being hidden", "Practicing consistency rather than excellence — doing what they said they would do, even when no one is watching", "Allowing the Six&rsquo;s anxiety to inform rather than irritate — the Six often sees real risks the Three&rsquo;s optimism glosses over", "Recognizing that earning the Six&rsquo;s trust is the most meaningful validation they&rsquo;ll receive — more than any external achievement"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 6 grows by</p>
                <ul className="space-y-3">
                  {["Distinguishing the Three&rsquo;s image-management from dishonesty — performance is a defense, not always deception", "Practicing trust before certainty — not waiting until all doubt is resolved to commit", "Using the Three&rsquo;s confidence as a model for moving forward without complete security", "Expressing doubt and concern directly rather than testing the Three indirectly through loaded questions or withdrawal"].map((item, i) => (
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
                { label: "Self-Preservation", body: "SP 3 and SP 6 are both security-oriented — the Three through achievement and resources, the Six through preparation and support networks. This can be a highly functional domestic pairing, both working toward shared security. Trust builds through demonstrated reliability over time." },
                { label: "Social", body: "Social 3 and social 6 are both oriented toward community standing — the Three through status and recognition, the Six through belonging and group loyalty. This pairing can build impressive community presence, though the Three&rsquo;s image focus and the Six&rsquo;s suspicion of status can create friction in group settings." },
                { label: "Sexual / One-to-One", body: "SX 3 brings passionate desire and a deep need to be the most impressive person in the beloved&rsquo;s eyes; SX 6 brings intense loyalty and tests trust most rigorously. This is the most challenging subtype combination — the Three&rsquo;s charm and performance triggers the Six&rsquo;s alarm system most acutely. Requires genuine authenticity to sustain." },
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
            <p className="leading-relaxed text-gray-700">When both are growing, the 3+6 pairing becomes one of the Enneagram&rsquo;s most reliable and deeply bonded combinations. The Three has found something they can&rsquo;t manufacture: genuine earned trust. The Six has found something they rarely allow: confidence in another person&rsquo;s reliability. Together they build toward shared goals with the Three&rsquo;s energy and the Six&rsquo;s steadfastness, and the relationship itself becomes a demonstration that success and loyalty are not in contradiction. The Three is more real. The Six is less anxious. Both are more themselves.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "Three: be consistent in the small things", body: "The Six builds trust through pattern recognition — are you who you say you are over time? Call when you said you would. Show up when it&rsquo;s inconvenient. Follow through on minor commitments. These build the evidentiary record the Six needs more than any grand gesture." },
                { num: "02", title: "Six: name the testing pattern", body: "Sixes sometimes test trust indirectly — through provocative questions, withholding, or waiting to see what happens. Make it explicit instead: &ldquo;I notice I&rsquo;m waiting to see if you&rsquo;ll follow through on this. I&rsquo;d rather just tell you that&rsquo;s what I need from you.&rdquo; Directness replaces the exhausting guessing game." },
                { num: "03", title: "Build in non-performance time", body: "Create contexts where the Three isn&rsquo;t performing — where imperfection is allowed, where failure is survivable, where they can just be without needing to succeed. The Six relaxes most when the Three drops the polished presentation. A vacation, a shared creative project, or a standing dinner with no agenda can provide this." },
                { num: "04", title: "Acknowledge the anxiety without solving it", body: "When the Six expresses worry or doubt, the Three&rsquo;s instinct is to solve or reassure — to make the anxiety go away. What the Six often needs first is to feel heard: &ldquo;That sounds really stressful. Tell me more.&rdquo; Presence before problem-solving." },
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
              {[{ label: "Type 3 — The Achiever", href: "/enneagram/type-3" }, { label: "Type 6 — The Loyalist", href: "/enneagram/type-6" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "3 + 9", href: "/compatibility/enneagram-3/enneagram-9" }, { label: "3 + 4", href: "/compatibility/enneagram-3/enneagram-4" }, { label: "1 + 7", href: "/compatibility/enneagram-1/enneagram-7" }].map((link) => (
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
