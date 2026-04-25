import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 3;
const typeB = 8;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 3 and 8 Compatibility — The Achiever & The Challenger | Thyself",
  description: "Explore the Enneagram Type 3 and Type 8 compatibility. Both are driven, ambitious, and powerful — the Three through visible achievement, the Eight through direct force. Full analysis of their high-impact pairing, the authenticity and control tension, and how both grow.",
  openGraph: {
    title: "Enneagram 3 and 8 Compatibility — The Achiever & The Challenger",
    description: "Type 3 moves through achievement; Type 8 moves through power. Both ambitious and effective — explore their formidable pairing and where performance meets force.",
    url: "https://thyself.app/compatibility/enneagram-3/enneagram-8",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-3/enneagram-8" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 3 and 8 Compatibility — The Achiever & The Challenger",
  description: "A full analysis of the Enneagram Type 3 and Type 8 relationship: shared ambition and effectiveness, authenticity vs. image, control dynamics, and growth edges for both types.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-3/enneagram-8",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-3/enneagram-8" },
};

export default function Enneagram3and8Page() {
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
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>8</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 3 &amp; Type 8</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">One of the Enneagram&rsquo;s most naturally high-impact pairings. Both types are driven, decisive, and oriented toward making things happen — the Three through impressive achievement, the Eight through direct power. Together they are formidable. The friction: the Eight&rsquo;s directness pierces the Three&rsquo;s carefully managed image, while the Three&rsquo;s adaptability reads to the Eight as inauthenticity. Both value the real thing; they just look for it differently.</p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-14">
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Who Are They?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorA }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 3</p>
                <p className="mb-3 text-xl font-bold">{nameA}</p>
                <p className="text-sm leading-relaxed opacity-90">Threes are achievement-oriented, adaptive, and driven by a need to succeed and be admired. They read what a situation requires and deliver it effectively. Their shadow: they can lose touch with who they actually are beneath the performance and confuse being admired with being genuinely known.</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 8</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">Eights are powerful, direct, and driven by a need to protect themselves and those they claim from vulnerability. They act from gut instinct and force of will. Their shadow: the drive for control can preclude the vulnerability that genuine intimacy requires — the Eight&rsquo;s protective armor keeps what is most real carefully hidden.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">Both types are drawn to competence, confidence, and the capacity to move things. The Three is drawn to the Eight&rsquo;s direct power, decisiveness, and the fact that the Eight doesn&rsquo;t need to manage anyone&rsquo;s impression. The Eight doesn&rsquo;t perform — they force. For a Three who is acutely aware of their own image management, the Eight&rsquo;s unfiltered directness is simultaneously terrifying and attractive.</p>
            <p className="leading-relaxed text-gray-700">The Eight is drawn to the Three&rsquo;s effectiveness, capability, and social fluency. The Eight can move things; the Three can present things. The Three&rsquo;s capacity to navigate social contexts that the Eight blows through is genuinely useful and impressive to the Eight. The Three also doesn&rsquo;t fold under the Eight&rsquo;s force — they adapt and push back in their own register, which the Eight respects far more than capitulation.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "High-Impact Partnership", body: "Together the Three and Eight can accomplish things at a scale and speed that neither achieves alone. The Eight provides the force and the refusal to be obstructed; the Three provides the effectiveness, social navigation, and presentation. They are a natural power couple — in professional contexts, community engagement, and shared projects, their combined impact is genuinely impressive." },
                { title: "Mutual Respect for Effectiveness", body: "Both types deeply respect the capacity to get things done, to not make excuses, and to deliver results under pressure. They recognize this quality in each other immediately and it creates a baseline of genuine mutual respect that sustains the pairing through significant friction." },
                { title: "Eight Calls the Three Into Authenticity", body: "The Eight&rsquo;s directness and intolerance of performance can be the most clarifying relationship the Three has ever had. The Eight doesn&rsquo;t respond to the Three&rsquo;s polished image — they see through it and respond to what&rsquo;s actually there. This can feel like an attack to the Three, but for a Three capable of growth, the Eight&rsquo;s directness is an invitation toward the authenticity the Three most deeply wants." },
                { title: "Three Offers the Eight Precision", body: "The Eight&rsquo;s force is powerful and sometimes blunt to the point of counterproductive. The Three&rsquo;s precision about how things land, what a situation actually requires, and how to achieve results in complex social environments offers the Eight a form of strategic intelligence the Eight often lacks. The Three&rsquo;s effectiveness complements the Eight&rsquo;s force in ways that expand what both can do." },
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
                { title: "Authenticity vs. Image", body: "The Eight is acutely sensitive to inauthenticity and will call it out directly when they see it. The Three&rsquo;s natural adaptation — reading what a situation requires and delivering it — looks to the Eight like performance rather than genuineness. The Eight&rsquo;s blunt exposure of the Three&rsquo;s image management can wound the Three deeply. The Three&rsquo;s response is often more sophisticated image management — which the Eight reads as confirmation of the original charge." },
                { title: "Control Dynamics", body: "Both types are oriented toward control in their domain: the Three through managing how things appear and what is delivered; the Eight through direct force over what happens. When their control orientations conflict, both types push — the Three with increasing sophistication, the Eight with increasing force. Neither yields easily, and the conflict can escalate past the point where either is still acting from their best self." },
                { title: "Vulnerability Avoidance", body: "Both types avoid genuine vulnerability: the Three through performance, the Eight through protective force. Together they risk a powerful, impressive, emotionally defended relationship — admired from outside, isolated on the inside. Neither type naturally creates the conditions for genuine tenderness, and without deliberate work both remain armored." },
                { title: "Speed and Depth", body: "Both types move fast — the Three toward the next goal, the Eight toward the next confrontation. Together they maintain a very high pace that is genuinely effective but rarely creates the space for the depth, reflection, and genuine self-disclosure that sustains long-term intimacy. The relationship is full of action; it may be thin on understanding." },
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
                  {["Receiving the Eight&rsquo;s directness as an invitation to authenticity rather than an attack on image — the Eight is calling the real person forward", "Sharing what is failing and uncertain directly rather than presenting only the polished version — the Eight respects reality", "Accepting that the Eight&rsquo;s force is love in the Eight&rsquo;s register — the Eight doesn&rsquo;t protect what they don&rsquo;t value", "Practicing direct emotional expression rather than managing the relational atmosphere — directness is the Eight&rsquo;s language"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 8 grows by</p>
                <ul className="space-y-3">
                  {["Distinguishing the Three&rsquo;s adaptability from dishonesty — the Three is reading the situation, not betraying a principle", "Moderating the force of exposure — naming what they see in the Three without weaponizing it", "Receiving the Three&rsquo;s effectiveness as its own form of genuine competence rather than requiring the Three to prove authenticity through directness", "Practicing the vulnerability the Three&rsquo;s growth invites — allowing the Eight&rsquo;s own genuine tenderness to show rather than staying in protective force"].map((item, i) => (
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
                { label: "Self-Preservation", body: "SP 3 and SP 8 are both practically powerful and privately managed. This is a quietly formidable pairing — both are effective, both are self-sufficient, and both protect their private life carefully. The risk: both maintain such strong internal boundaries that genuine emotional intimacy never fully develops." },
                { label: "Social", body: "Social 3 and social 8 are both oriented toward impact and leadership. Together they are a natural leadership pairing — the Three manages the context and the presentation; the Eight provides the force and the will. They can build significant things together in organizational and community contexts." },
                { label: "Sexual / One-to-One", body: "SX 3 and SX 8 are both intensely focused on the relationship and both seeking something genuine at close range. The SX 3&rsquo;s hunger to be truly seen meets the SX 8&rsquo;s fierce protective claiming. This is the most potentially intimate and most potentially explosive version — the Eight&rsquo;s directness is most piercing here; the Three&rsquo;s invitation to authenticity is most available. Both are capable of a depth of genuine contact that neither reaches easily in other combinations." },
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
            <p className="leading-relaxed text-gray-700">When both are growing, the 3+8 pairing becomes one of the Enneagram&rsquo;s most genuinely powerful and genuinely real combinations. The Three has found in the Eight someone whose force calls the Three&rsquo;s authentic self forward — and has discovered that being seen is more nourishing than being admired. The Eight has found in the Three someone whose effectiveness and precision extends the Eight&rsquo;s capacity for impact — and has allowed the Three&rsquo;s growing authenticity to invite the Eight&rsquo;s own genuine tenderness forward. The Three is less performed; the Eight is more vulnerable. Together they are formidable in the world and genuinely connected in the relationship. That combination is rare.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "Eight: name what you see, not what you judge", body: "When you see the Three&rsquo;s image management, try: &ldquo;I see you performing right now — I&rsquo;d rather talk to the person underneath.&rdquo; This is an invitation, not an indictment. The Three responds to being called forward; they contract under force. The distinction matters." },
                { num: "02", title: "Three: say what is actually true", body: "Once a day, tell the Eight something real — not the polished version, but the actual version. What you&rsquo;re unsure about. What you&rsquo;re afraid of. What didn&rsquo;t work. The Eight is drawn to what is real and will protect and respect it fiercely. Your authenticity is your greatest asset with this person — not your performance." },
                { num: "03", title: "Find causes worth fighting for together", body: "The 3+8 combination produces real force in the world when directed outward. Find something that matters to both of you and pursue it together. The Eight provides the will; the Three provides the strategy and presentation. Together they accomplish things neither could alone." },
                { num: "04", title: "Build private space for genuine rest", body: "Both types are at high performance almost continuously. Create explicit contexts where neither has to achieve or to be fierce — a quiet evening, a trip without an agenda. The relationship needs space that isn&rsquo;t a project or a confrontation. It needs to just be two people, neither performing, neither forcing." },
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
              {[{ label: "Type 3 — The Achiever", href: "/enneagram/type-3" }, { label: "Type 8 — The Challenger", href: "/enneagram/type-8" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "2 + 8", href: "/compatibility/enneagram-2/enneagram-8" }, { label: "5 + 8", href: "/compatibility/enneagram-5/enneagram-8" }, { label: "3 + 6", href: "/compatibility/enneagram-3/enneagram-6" }].map((link) => (
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
