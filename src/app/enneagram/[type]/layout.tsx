import type { Metadata } from "next";
import { enneagramTypes } from "@/data/enneagram";

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return Array.from({ length: 9 }, (_, i) => ({ type: String(i + 1) }));
}

// ─── Per-type SEO metadata ─────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const typeNum = parseInt(type, 10);
  const typeData = enneagramTypes.find((t) => t.number === typeNum);

  if (!typeData) {
    return {
      title: "Enneagram Type | Thyself",
      description: "Explore all nine Enneagram types with Thyself.",
    };
  }

  // Trim brief to ~155 chars for meta description
  const rawBrief = typeData.brief.replace(/\s+/g, " ").trim();
  const metaDescription =
    rawBrief.length > 155 ? rawBrief.slice(0, 152) + "..." : rawBrief;

  const title = `Enneagram Type ${typeNum}: ${typeData.name} (${typeData.alias}) | Thyself`;
  const url = `https://thyself.app/enneagram/${typeNum}`;

  return {
    title,
    description: metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description: metaDescription,
      siteName: "Thyself",
      images: [
        {
          url: `https://thyself.app/og/enneagram-type-${typeNum}.png`,
          width: 1200,
          height: 630,
          alt: `Enneagram Type ${typeNum}: ${typeData.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: metaDescription,
      images: [`https://thyself.app/og/enneagram-type-${typeNum}.png`],
    },
  };
}

// ─── Layout with JSON-LD ───────────────────────────────────────────────────────

export default async function TypeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const typeNum = parseInt(type, 10);
  const typeData = enneagramTypes.find((t) => t.number === typeNum);

  // Build related types: wings + integration + disintegration + neighbors
  const relatedNums = typeData
    ? Array.from(
        new Set([
          typeData.integrationLine,
          typeData.disintegrationLine,
          typeNum === 1 ? 9 : typeNum - 1,
          typeNum === 9 ? 1 : typeNum + 1,
        ])
      ).filter((n) => n !== typeNum)
    : [];

  const relatedTypes = relatedNums.map((n) => {
    const t = enneagramTypes.find((x) => x.number === n);
    return t ? { number: n, name: t.name, alias: t.alias } : null;
  }).filter(Boolean);

  const jsonLd = typeData
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `Enneagram Type ${typeNum}: ${typeData.name}`,
        description: typeData.brief,
        url: `https://thyself.app/enneagram/${typeNum}`,
        author: {
          "@type": "Organization",
          name: "Thyself",
          url: "https://thyself.app",
        },
        publisher: {
          "@type": "Organization",
          name: "Thyself",
          url: "https://thyself.app",
          logo: {
            "@type": "ImageObject",
            url: "https://thyself.app/icon.png",
          },
        },
        about: [
          {
            "@type": "Thing",
            name: `Enneagram Type ${typeNum}`,
            description: typeData.description,
          },
          {
            "@type": "Thing",
            name: "Enneagram",
            sameAs: "https://en.wikipedia.org/wiki/Enneagram_of_Personality",
          },
        ],
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://thyself.app/enneagram/${typeNum}`,
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://thyself.app",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Enneagram",
              item: "https://thyself.app/enneagram",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: `Type ${typeNum}: ${typeData.name}`,
              item: `https://thyself.app/enneagram/${typeNum}`,
            },
          ],
        },
        mentions: relatedTypes.map((t) => ({
          "@type": "Thing",
          name: `Enneagram Type ${t!.number}: ${t!.name}`,
          url: `https://thyself.app/enneagram/${t!.number}`,
        })),
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
