import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 1;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];
const canonical = "https://thyself.app/enneagram/type-1/friendship";

export const metadata: Metadata = {
  title: "Enneagram Type 1 in Friendship — The Reformer as a Friend | Thyself",
  description:
    "How the Enneagram Type 1 shows up in friendship: what they bring, the patterns they fall into, and what helps a friendship with a One thrive.",
  alternates: { canonical },
  openGraph: {
    title: "Enneagram Type 1 in Friendship — The Reformer as a Friend",
    description:
      "How the One shows up as a friend, the gifts they bring, the challenges, and what helps these friendships flourish.",
    url: canonical,
    type: "article",
  },
};

const traits = [
  {
    title: "Honest even when honesty costs something",
    body: "Ones will tell you what they actually think, not the comfortable version.",
  },
  {
    title: "Reliable and consistent",
    body: "They follow through on what they say, remember commitments, and take the friendship seriously.",
  },
  {
    title: "Genuinely invested in your growth",
    body: "Not in a patronizing way, but in the way that people who take you seriously push you toward who you are capable of being.",
  },
  {
    title: "Principled in how they show up",
    body: "They bring the same ethical seriousness to friendship that they bring to everything else.",
  },
];

const challenges = [
  {
    title: "Correction over presence",
    body: "Can correct or critique rather than simply be present — the inner critic externalizes, and friends can feel like they are always slightly falling short.",
  },
  {
    title: "Difficulty relaxing into low-stakes time",
    body: "The One's sense that things should be done properly can make casual friendship feel effortful.",
  },
  {
    title: "Unstated high expectations",
    body: "When a friend doesn't meet a standard the One didn't communicate, resentment can build quietly.",
  },
];

export default function Type1FriendshipPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Enneagram Type 1 in Friendship — The Reformer as a Friend",
    description:
      "How the Enneagram Type 1 shows up in friendship, the gifts and challenges they bring, and what helps these friendships thrive.",
    datePublished: "2026-04-25",
    dateModified: "2026-04-25",
    author: { "@type": "Organization", name: "Thyself" },
    publisher: {
      "@type": "Organization",
      name: "Thyself",
      url: "https://thyself.app",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white">
        <section
          className="px-6 py-16 sm:py-20"
          style={{ backgroundColor: color }}
        >
          <div className="mx-auto max-w-3xl text-white">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-2xl font-bold">
              {typeNum}
            </div>
            <h1 className="text-4xl font-bold sm:text-5xl">
              Type {typeNum} in Friendship
            </h1>
            <p className="mt-2 text-xl text-white/90">{typeName}</p>
            <p className="mt-6 text-lg leading-relaxed text-white/95">
              The One is among the most loyal and trustworthy friends available
              — consistent, honest, and genuinely present for the people they
              care about. Friendship with a One has a quality of reliability
              that is rare.
            </p>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">
              What Type {typeNum} Brings to Friendship
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-gray-700">
              <p>
                Ones bring integrity to friendship in a way that is almost
                unconditional — they will not tell you what you want to hear if
                it is not true, and they will not pretend a problem does not
                exist because naming it would be uncomfortable. Their honesty,
                while sometimes bracing, is always genuine.
              </p>
              <p>
                The One&apos;s loyalty is also substantial. When they commit to
                a friendship, they mean it — they show up, they follow through,
                and they take the relationship seriously as something that
                requires attention and care. They are not fair-weather friends.
                They will be there in the difficult moments, and they will tell
                you the truth in those moments even when it costs them your
                approval.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">
              As a Friend, Type {typeNum}...
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {traits.map((t) => (
                <div
                  key={t.title}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >
                  <h3
                    className="text-lg font-semibold"
                    style={{ color }}
                  >
                    {t.title}
                  </h3>
                  <p className="mt-3 text-gray-700">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">
              Friendship Challenges
            </h2>
            <div className="mt-8 space-y-5">
              {challenges.map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-700">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-gray-700">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">
              Friendship Growth
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3
                  className="text-lg font-semibold"
                  style={{ color }}
                >
                  At their best
                </h3>
                <p className="mt-3 text-gray-700">
                  The One friend who has done their inner work becomes someone
                  genuinely rare — honest, loyal, and capable of accepting the
                  full humanity of the people they care about without needing to
                  improve them.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">
                  What helps
                </h3>
                <p className="mt-3 text-gray-700">
                  Being with people who can receive their honesty as care and
                  who can gently point back when the critic is running, so
                  friendship can be restorative rather than corrective for both
                  parties.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">Keep exploring</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Link
                href={`/enneagram/type-${typeNum}`}
                className="rounded-xl border border-gray-200 p-5 transition hover:border-gray-300 hover:bg-gray-50"
              >
                <div className="text-sm text-gray-500">Type overview</div>
                <div className="mt-1 font-semibold text-gray-900">
                  Type {typeNum}: {typeName}
                </div>
              </Link>
              <Link
                href={`/enneagram/type-${typeNum}/relationships`}
                className="rounded-xl border border-gray-200 p-5 transition hover:border-gray-300 hover:bg-gray-50"
              >
                <div className="text-sm text-gray-500">Relationships</div>
                <div className="mt-1 font-semibold text-gray-900">
                  Type {typeNum} in Relationships
                </div>
              </Link>
              <Link
                href={`/enneagram/type-${typeNum}/communication`}
                className="rounded-xl border border-gray-200 p-5 transition hover:border-gray-300 hover:bg-gray-50"
              >
                <div className="text-sm text-gray-500">Communication</div>
                <div className="mt-1 font-semibold text-gray-900">
                  Type {typeNum} Communication Style
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto max-w-3xl">
            <div
              className="rounded-3xl p-8 text-center text-white sm:p-12"
              style={{ backgroundColor: color }}
            >
              <h2 className="text-3xl font-bold">
                Not sure if you&apos;re a Type {typeNum}?
              </h2>
              <p className="mt-3 text-lg text-white/95">
                Take the Thyself Enneagram Assessment to find your type.
              </p>
              <Link
                href="/assessments"
                className="mt-6 inline-block rounded-full bg-white px-8 py-3 font-semibold transition hover:bg-white/90"
                style={{ color }}
              >
                Take the assessment
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
