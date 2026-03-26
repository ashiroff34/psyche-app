import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  // Only set basePath/assetPrefix for GitHub Pages deployment
  ...(isGithubPages && {
    basePath: "/psyche-app",
    assetPrefix: "/psyche-app",
  }),
};

export default nextConfig;
