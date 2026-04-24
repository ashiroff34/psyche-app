import type { Metadata } from "next";
import EnneagramTypePage from "@/components/seo/EnneagramTypePage";

export const metadata: Metadata = {
  title: "Enneagram Type 4: The Individualist — Traits, Growth & Psychology | Thyself",
  description: "A deep guide to Enneagram Type 4 — the core motivation, fears, envy, wings (4w3 and 4w5), integration toward Type 1, stress toward Type 2, and the authentic growth path. Grounded in Ichazo, Naranjo, and Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 4: The Individualist",
    description: "The Individualists A deep guide to Enneagram Type 4 — the core motivation, fears, envy, wings (4w3 ...",
    url: "https://thyself.app/enneagram/type-4",
    type: "article",
    siteName: "Thyself",
    images: [
      {
        url: "https://thyself.app/og/enneagram-type-4.png",
        width: 1200,
        height: 630,
        alt: "Enneagram Type 4: The Individualist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enneagram Type 4: The Individualist | Thyself",
    description: "A deep guide to Enneagram Type 4 — the core motivation, fears, envy, wings (4w3 and 4w5), integration toward Type 1, str...",
    images: ["https://thyself.app/og/enneagram-type-4.png"],
  },
  alternates: {
    canonical: "https://thyself.app/enneagram/type-4",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 4: The Individualist — Traits, Growth & Psychology",
  description: "A deep guide to Enneagram Type 4 — the core motivation, fears, envy, wings (4w3 and 4w5), integration toward Type 1, stress toward Type 2, and the authentic growth path. Grounded in Ichazo, Naranjo, and Riso-Hudson.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-4",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-4" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://thyself.app" },
      { "@type": "ListItem", position: 2, name: "Enneagram", item: "https://thyself.app/enneagram" },
      { "@type": "ListItem", position: 3, name: "Type 4: The Individualist", item: "https://thyself.app/enneagram/type-4" },
    ],
  },
};

export default function EnneagramType4Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EnneagramTypePage typeNum={4} />
    </>
  );
}
