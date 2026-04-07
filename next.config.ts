import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

// On Vercel and local dev, use standard Next.js (SSR + dynamic routes).
// Only use static export for GitHub Pages.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(isGithubPages ? { output: "export" } : {}),
  images: {
    unoptimized: true,
  },
  // Memory optimizations for low-RAM dev environments
  experimental: {
    webpackMemoryOptimizations: true,
    preloadEntriesOnStart: false,
  },
  webpack: (config, { dev }) => {
    // Disable webpack cache in dev to avoid memory bloat
    if (dev) config.cache = false;
    return config;
  },
  // Only set basePath/assetPrefix for GitHub Pages deployment
  ...(isGithubPages && {
    basePath: "/psyche-app",
    assetPrefix: "/psyche-app",
  }),
};

export default nextConfig;
