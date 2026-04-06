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
  metadataBase: new URL("https://psyche-app-two.vercel.app"),
  title: "Thyself — Know Your Enneagram Type",
  description:
    "Discover your Enneagram type through scientifically-grounded assessments. Explore 9 types, 27 subtypes, cognitive functions, and deep psychology rooted in Ichazo, Naranjo, and Riso-Hudson.",
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
  openGraph: {
    title: "Thyself — Know Your Enneagram Type",
    description:
      "Discover your Enneagram type. 9 types, 27 subtypes, 5 assessment paths. Grounded in Ichazo, Naranjo & Riso-Hudson.",
    url: "https://psyche-app-two.vercel.app",
    siteName: "Thyself",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thyself — Know Your Enneagram Type",
    description:
      "Discover your Enneagram type through 5 assessment paths. Deep psychology, 27 subtypes, cognitive functions.",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `if("serviceWorker" in navigator){navigator.serviceWorker.register("/sw.js").catch(function(){})}`,
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
          visibleToasts={2}
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
