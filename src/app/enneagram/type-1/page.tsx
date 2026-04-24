import type { Metadata } from "next";
import EnneagramTypePage from "@/components/seo/EnneagramTypePage";

export const metadata: Metadata = {
  title: "Enneagram Type 1: The Reformer — Traits, Growth & Psychology | Thyself",
  description: "A deep guide to Enneagram Type 1 — the core motivation, perfectionism, anger, wings (1w9 and 1w2), integration toward Type 7, stress toward Type 4, and the authentic growth path. Grounded in Ichazo, Naranjo, and Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 1: The Reformer",
    description: "The Reformers A deep guide to Enneagram Type 1 — the core motivation, perfectionism, anger, wi...",
    url: "https://thyself.app/enneagram/type-1",
    type: "article",
    siteName: "Thyself",
    images: [
      {
        url: "https://thyself.app/og/enneagram-type-1.png",
        width: 1200,
        height: 630,
        alt: "Enneagram Type 1: The Reformer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enneagram Type 1: The Reformer | Thyself",
    description: "A deep guide to Enneagram Type 1 — the core motivation, perfectionism, anger, wings (1w9 and 1w2), integration toward Ty...",
    images: ["https://thyself.app/og/enneagram-type-1.png"],
  },
  alternates: {
    canonical: "https://thyself.app/enneagram/type-1",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 1: The Reformer — Traits, Growth & Psychology",
  description: "A deep guide to Enneagram Type 1 — the core motivation, perfectionism, anger, wings (1w9 and 1w2), integration toward Type 7, stress toward Type 4, and the authentic growth path. Grounded in Ichazo, Naranjo, and Riso-Hudson.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-1",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-1" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://thyself.app" },
      { "@type": "ListItem", position: 2, name: "Enneagram", item: "https://thyself.app/enneagram" },
      { "@type": "ListItem", position: 3, name: "Type 1: The Reformer", item: "https://thyself.app/enneagram/type-1" },
    ],
  },
};

export default function EnneagramType1Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EnneagramTypePage typeNum={1} />
    </>
  );
}
