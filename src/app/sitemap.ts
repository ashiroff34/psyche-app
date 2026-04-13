import type { MetadataRoute } from "next";

const BASE = "https://psyche-app-two.vercel.app";

// All 31 unit IDs
const UNIT_IDS = [
  "what-is-enneagram",
  "your-type",
  "type-1", "type-2", "type-3", "type-4", "type-5",
  "type-6", "type-7", "type-8", "type-9",
  "your-mind",
  "what-are-cognitive-functions",
  "fi", "fe", "ti", "te", "ni", "ne", "si", "se",
  "am-i-typed-correctly",
  "the-observer",
  "your-core-question",
  "identity-in-motion",
  "philosophical-self-inquiry",
  "living-as-yourself",
  "the-looker",
  "is-there-a-self",
  "holding-both",
  "holy-ideas",
];

const ENNEAGRAM_TYPES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Core pages
  const core: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/daily`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/lessons`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/assessments`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/growth`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/profile`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/enneagram`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/beta`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/sources`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];

  // Enneagram type pages
  const typePages: MetadataRoute.Sitemap = ENNEAGRAM_TYPES.map((t) => ({
    url: `${BASE}/enneagram/${t}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Unit lesson pages
  const unitPages: MetadataRoute.Sitemap = UNIT_IDS.map((id) => ({
    url: `${BASE}/lessons/${id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Assessment pages
  const assessmentPages: MetadataRoute.Sitemap = [
    "quick", "essential-enneagram", "personality-path", "ieq9-integrative",
    "self-id", "instinctual", "tritype", "big-five", "attachment",
    "values", "regulatory-focus", "decentering", "cognitive-type",
    "this-or-that", "mistype-investigator",
  ].map((slug) => ({
    url: `${BASE}/assessments/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...core, ...typePages, ...unitPages, ...assessmentPages];
}
