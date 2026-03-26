import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Static export for GitHub Pages
  ...(isGithubPages && {
    output: "export",
    basePath: "/psyche-app",
    assetPrefix: "/psyche-app",
  }),
};

export default nextConfig;
