import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 4;
const typeB = 8;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

const tips = [
  "Eights: practice slowing down before speaking when you are frustrated. The Four will hear the tone before the content, and a blunt delivery can cause a wound that takes days to repair.",
  "Fours: practice distinguishing the Eight's directness from rejection. Direct communication is how the Eight shows respect — they only soften with people they have decided are not strong enough to handle reality.",
  "Both: build in explicit repair rituals. When conflict happens — and it will — agree in advance on how you will come back together. The 4–8 storm can be intense, but the repair can be equally powerful.",
  "Both: honor the integration direction. The Four grows toward principled, grounded action (toward One); the Eight grows toward genuine care and vulnerability (toward Two). When you each move in your growth direction, you are paradoxically moving toward each other.",
];

export const metadata: Metadata = {
  title: "Enneagram 4 and 8 Compatibility — Relationship Dynamics & Growth | Thyself",
  description:
    "A deep guide to the Enneagram 4 and 8 relationship. How the Individualist and the Challenger attract, where they clash, what each needs to grow, and what this pairing looks like at its best. Grounded in Naranjo and Riso-Hudson.",
  openGraph: {
    title: "Enneagram 4 and 8 Compatibility",
    description:
      "Two intensely authentic types who refuse the ordinary — one who moves inward through feeling, one who moves outward through force. When the container meets the depth, the result is electric.",
    url: "https://thyself.app/compatibility/enneagram-4/enneagram-8",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-4/enneagram-8" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 4 and 8 Compatibility — Relationship Dynamics & Growth",
  description:
    "How Enneagram Type 4 and Type 8 relate: attraction, synergies, tensions, growth edges, and what this pairing looks like at its best.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-4/enneagram-8",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-4/enneagram-8" },
};

export default function Compatibility4and8Page() {
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
              Type 4 and Type 8
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              Two types who refuse the ordinary, refuse pretense, and refuse to shrink themselves for anyone. The Four goes deep inward; the Eight goes wide outward. When they meet, the chemistry can be one of the most alive experiences the Enneagram has to offer.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">

          {/* Type snapshot */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">The Two Types at a Glance</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorA }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 4 — The Individualist</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Fours are driven by an intense longing to be fully known and to find what makes them irreplaceably themselves. They experience life through a heightened emotional register — beauty, loss, meaning, and longing are not background noise but the primary data of existence. Their core fear is being ordinary or invisible. They do not apologize for their emotional reality and are often drawn to what others find too dark, too melancholic, or too intense.
                </p>
              </div>
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorB }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 8 — The Challenger</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Eights are driven by the need to be strong, self-reliant, and in control of their own domain. They engage the world with force and directness, and they do not hide their power or apologize for it. Their core fear is being controlled or betrayed. They value authenticity fiercely — they would rather have an honest enemy than a flattering friend — and they protect what and whom they love with everything they have.
                </p>
              </div>
            </div>
          </section>

          {/* Why they attract */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why These Types Attract</h2>
            <p className="leading-relaxed text-gray-700">
              The 4–8 attraction is primal. Both types are intense, both avoid the ordinary, and both have strong desires they do not edit or minimize. There is an immediate recognition between them: here is someone who does not require me to be smaller. The Four is drawn to the Eight&apos;s strength and directness — here is someone who will not flinch from the Four&apos;s emotional depth, who will not be swamped by it, who provides a solid and formidable presence in which the Four can finally exhale. The Eight is drawn to the Four&apos;s emotional world — here is someone who is genuinely, unreservedly alive, who can lead the Eight into a territory of feeling they normally keep under lock and key.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              There is also a shared refusal to pretend. Neither type is interested in social nicety for its own sake. They both find inauthenticity exhausting and prefer the sharpness of a real exchange — even a difficult one — over the numbness of managed pleasantness. When a Four and an Eight decide to trust each other, the conversations that follow tend to have a rare quality: honest, unguarded, and free of performance.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The sexual subtype version of this pairing — sx/4 and sx/8 — can be one of the most explosively alive combinations on the Enneagram. Both of these subtypes bring a one-on-one intensity that is almost impossible to ignore. The sx/Four&apos;s longing for total emotional merger meets the sx/Eight&apos;s appetite for conquest and intensity. The result is a pairing that burns very bright and requires both partners to have significant personal development to sustain it without consuming each other.
            </p>
          </section>

          {/* Natural synergies */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Shared refusal of pretense",
                  body: "Both types are allergic to falseness. They value directness and genuine expression above social comfort, which means their bond is built on something real. There is very little performance in a healthy 4–8 relationship — what you see is what is actually there.",
                },
                {
                  title: "Complementary emotional access",
                  body: "Eights often carry significant emotional armoring — their strength is real, but it can wall off vulnerability. Fours have direct, willing access to the emotional interior. The Four can become the person who genuinely reaches the Eight: not by forcing it, but by modeling what it looks like to live without emotional armor. This is a genuine gift.",
                },
                {
                  title: "The container and the depth",
                  body: "Fours often feel their emotional intensity has no safe landing place in the world. The Eight&apos;s solidity provides exactly the container the Four needs — someone who will not collapse under the weight of the Four&apos;s feeling, who can hold it without needing it to stop. This is deeply reassuring to the Four.",
                },
                {
                  title: "Intensity and appetite for experience",
                  body: "Both types are drawn toward strong, vivid, real experience rather than moderation and safety. Together they tend to create a relationship that is anything but dull — charged with aesthetic intensity, emotional honesty, and a refusal to settle for less than what is actually alive.",
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
              The 4–8 pairing&apos;s central challenge lives in the collision between inward and outward processing. The Four turns feeling into identity; the Eight turns impulse into action. These two orientations can clash violently under stress.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Inward processing vs. outward force",
                  body: "When something goes wrong, the Four tends to go inward — ruminating, feeling, finding the emotional meaning. The Eight tends to go outward — confronting, acting, resolving. The Four may experience the Eight as bulldozing through something that needed to be felt. The Eight may experience the Four as indulgent, stuck in a feeling that could simply be addressed and moved past.",
                },
                {
                  title: "Vulnerability vs. armor",
                  body: "The Four&apos;s strength lives in emotional openness; the Eight&apos;s strength lives in emotional fortification. The Four may read the Eight&apos;s armor as coldness or unavailability. The Eight may read the Four&apos;s vulnerability as weakness, though this reaction often signals the Eight&apos;s own discomfort with the feelings the Four is openly carrying.",
                },
                {
                  title: "Wanting to be seen vs. wanting uncomplicated presence",
                  body: "Fours want to be known in their full complexity — the shading, the ambivalence, the layers. Eights tend to prefer direct, uncomplicated presence in a relationship: are you with me or not? The Four&apos;s need to be understood in all their particularity can feel like a demand for emotional labor the Eight has limited patience for.",
                },
                {
                  title: "The Eight&apos;s anger and the Four&apos;s sensitivity",
                  body: "Eights are one of the Enneagram&apos;s most anger-forward types — not necessarily explosive, but direct and impactful. Fours are highly sensitive to tone and to the emotional subtext of words. An Eight who speaks too bluntly can wound a Four far more than intended. A Four who retreats or becomes wounded can trigger the Eight&apos;s frustration with what they perceive as excessive sensitivity.",
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>For the Four</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Four&apos;s growth in this relationship involves learning to trust the Eight&apos;s love even when it does not arrive in the emotionally articulate form the Four might prefer. Eights show love through protection, presence, and action — not always through words or emotional attunement. The Four who can receive this form of love, rather than interpreting its bluntness as rejection, gains a partner of remarkable depth and loyalty. The work is also to develop some skin: not to abandon sensitivity, but to distinguish between the Eight&apos;s directness and genuine cruelty, which are not the same thing.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: colorB }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>For the Eight</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Eight&apos;s growth in this relationship involves allowing the Four&apos;s emotional world to actually land — not managing it from a safe distance, but being genuinely moved by it. The Eight who can sit with the Four&apos;s feeling without rushing to fix it, who can say &ldquo;I hear you&rdquo; before &ldquo;here is what to do about it,&rdquo; gives the Four something irreplaceable. The deeper work is at the Eight&apos;s integration point (toward Two): learning that care, vulnerability, and emotional attentiveness are forms of strength, not departures from it.
                </p>
              </div>
            </div>
          </section>

          {/* Instinctual variants */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Instinctual Variants in the 4–8 Pairing</h2>
            <p className="mb-4 text-sm text-gray-500">
              The three instinctual subtypes (self-preservation, sexual, and social) significantly shape how each type expresses in relationship. Naranjo identified specific variants that create distinct dynamics.
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "sx/4 + sx/8",
                  body: "This is the most electric version of this pairing and one of the most intensely alive combinations on the entire Enneagram. The sexual Four brings idealization and a hunger for total emotional merger; the sexual Eight brings possession, conquest, and an equally all-in energy. The chemistry can be extraordinary, but both subtypes are volatile, and the relationship requires high personal development to avoid becoming a power struggle where the Eight tries to possess what the Four needs to keep free.",
                },
                {
                  label: "sp/4 + sp/8",
                  body: "This is a more grounded and sustainable version of the pairing. The self-preservation Four is less emotionally dramatic than other Four subtypes; the self-preservation Eight — often called the most controlled and least overtly aggressive of the Three Eight subtypes — is more measured in their force. Together they can build a rich, quietly intense domestic life with strong shared values and mutual loyalty.",
                },
                {
                  label: "so/4 + so/8",
                  body: "Both social subtypes are oriented toward influence and community impact. The social Four wants to be recognized as a carrier of meaning and aesthetic truth; the social Eight wants to be the protective force within a group. Together they can be a formidable presence in their communities — though they may also compete for whose vision defines the shared world.",
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
                When the Four and Eight are both growing, they produce something rare: a relationship where strength and vulnerability are genuinely integrated. The Eight becomes capable of emotional depth they previously armored against; the Four becomes capable of grounded action and self-possession they previously lacked. Each partner contributes what the other needs to become more whole. The Four learns that they can be strong without abandoning their feeling; the Eight learns that they can feel without losing their strength.
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                This pairing at its best has an unmistakable quality: it is vivid, genuine, protective, and deeply alive. Neither type settles, and so neither type allows the other to. The relationship holds both people accountable to the full version of themselves — not the defended, contracted version, but the one that was always capable of this much intensity and this much love.
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
              <Link href="/enneagram/type-4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 — The Individualist</Link>
              <Link href="/enneagram/type-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 — The Challenger</Link>
            </div>
          </section>

          {/* Other compatibility pairs */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Guides</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/compatibility/enneagram-4/enneagram-5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 + Type 5</Link>
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
