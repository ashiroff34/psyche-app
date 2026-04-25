import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 7;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];
const canonical = "https://thyself.app/enneagram/type-7/friendship";

export const metadata: Metadata = {
  title:
    "Enneagram Type 7 in Friendship — The Enthusiast as a Friend | Thyself",
  description:
    "How the Enneagram Type 7 shows up in friendship: what they bring, the patterns they fall into, and what helps a friendship with a Seven thrive.",
  alternates: { canonical },
  openGraph: {
    title: "Enneagram Type 7 in Friendship — The Enthusiast as a Friend",
    description:
      "How the Seven shows up as a friend, the gifts they bring, the challenges, and what helps these friendships flourish.",
    url: canonical,
    type: "article",
  },
};

const traits = [
  {
    title: "Makes life more fun",
    body: "The Seven friend is the one who turns an ordinary evening into something memorable.",
  },
  {
    title: "Enthusiastic and encouraging",
    body: "They celebrate your ideas and plans with genuine excitement.",
  },
  {
    title: "Optimistic in useful ways",
    body: "Can genuinely help when a friend is stuck in despair.",
  },
  {
    title: "Non-judgmental about life choices",
    body: "The Seven is among the least likely types to moralize or restrict.",
  },
];

const challenges = [
  {
    title: "Avoidance of depth and difficulty",
    body: "May redirect away from hard conversations before they complete.",
  },
  {
    title: "Inconsistency in sustained presence",
    body: "The Seven is wonderful at intense engagement and may struggle with the maintenance between highlights.",
  },
  {
    title: "Over-promising",
    body: "The enthusiasm in conversation doesn't always translate to follow-through.",
  },
];

export default function Type7FriendshipPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Enneagram Type 7 in Friendship — The Enthusiast as a Friend",
    description:
      "How the Enneagram Type 7 shows up in friendship, the gifts and challenges they bring, and what helps these friendships thrive.",
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
              The Seven is among the most fun and energizing friends available —
              endlessly generating plans, making ordinary moments feel like
              adventures, and bringing a quality of joy to the friendship that
              is genuinely rare.
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
                Sevens bring enthusiasm and genuine warmth to friendship — they
                are excited to see you, inventive about what you might do
                together, and among the most fun people to spend time with when
                they are fully engaged. Their optimism, which can be annoying in
                more difficult contexts, is often exactly what a friend needs
                when they are struggling.
              </p>
              <p>
                The challenge is that Seven friendship can be more present in
                the fun than in the difficulty. The Seven&apos;s avoidance of
                pain — their tendency to reframe, redirect, or simply move on —
                can mean that the harder conversations never quite happen, and
                the friendship, while warm, stays somewhat at the surface.
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
                  The Seven who has developed their capacity for presence
                  becomes a friend who can hold the full range — the joy AND the
                  difficulty — without needing to manage toward positivity.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">
                  What helps
                </h3>
                <p className="mt-3 text-gray-700">
                  Explicit invitations to go deeper, and friends who name when
                  the reframe isn&apos;t what they need.
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
