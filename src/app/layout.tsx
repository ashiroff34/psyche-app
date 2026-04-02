import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import RetentionBanner from "@/components/RetentionBanner";
import ComebackModal from "@/components/ComebackModal";
import EngagementNudge from "@/components/EngagementNudge";
import TutorialProvider from "@/components/TutorialProvider";
import { assetPath } from "@/lib/assetPath";
import { RewardAnchors } from "@/components/Rewards";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Thyself — Discover Your Mind",
  description:
    "Explore your personality through the Enneagram and Carl Jung's Cognitive Functions. Interactive assessments, deep learning resources, and growth tools.",
  manifest: assetPath("/manifest.json"),
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Thyself",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0a1e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={assetPath("/favicon-32.png")} sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href={assetPath("/apple-icon-180.png")} sizes="180x180" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("psyche-light-mode")==="true")document.documentElement.classList.add("light")}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-screen">
        <Navigation />
        <ComebackModal />
        <Toaster
          position="top-center"
          toastOptions={{
            unstyled: true,
            classNames: { toast: "w-full flex justify-center" },
          }}
          gap={8}
        />
        <RewardAnchors />
        <main className="pt-14 pb-20">{children}</main>
        <TutorialProvider />
        <RetentionBanner />
        <EngagementNudge />
      </body>
    </html>
  );
}
