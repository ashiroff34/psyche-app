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
import ServiceWorkerRegistrar from "@/components/ServiceWorkerRegistrar";
import PostHogProvider from "@/components/PostHogProvider";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://thyself.app"),
  title: "Thyself — Mental fitness through self-understanding",
  description:
    "Self-understanding as mental fitness. Discover the psychological patterns that drive your emotions and behavior — then grow past your defaults. Grounded in Enneagram, Jungian psychology, and behavioral science.",
  manifest: assetPath("/manifest.json"),
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Thyself",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
  },
  openGraph: {
    title: "Thyself — Mental fitness through self-understanding",
    description:
      "Self-understanding as mental fitness. Discover your psychological patterns, master your emotional defaults, and build the self-awareness that makes every other form of growth work better.",
    url: "https://thyself.app",
    siteName: "Thyself",
    type: "website",
    images: [
      {
        url: "https://thyself.app/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Thyself — Mental fitness through self-understanding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thyself — Mental fitness through self-understanding",
    description:
      "The mental fitness app built around your psychological type. Understand what drives your emotions, behavior, and relationships — then change the patterns that no longer serve you.",
    images: ["https://thyself.app/opengraph-image"],
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
        <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon-180.png" sizes="180x180" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Thyself",
                url: "https://thyself.app",
              },
              {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                name: "Thyself",
                description:
                  "Self-understanding as mental fitness. Discover the psychological patterns that drive your emotions and behavior — then grow past your defaults. Grounded in Enneagram, Jungian psychology, and behavioral science.",
                applicationCategory: "HealthApplication",
                operatingSystem: "Web, iOS, Android",
                url: "https://thyself.app",
                keywords: [
                  "mental fitness",
                  "self-awareness",
                  "psychological patterns",
                  "emotional intelligence",
                  "self-understanding",
                  "mental health",
                  "personality psychology",
                  "enneagram",
                  "jungian psychology",
                  "behavioral science",
                  "mindfulness",
                  "self-improvement",
                  "emotional regulation",
                  "shadow work",
                  "cognitive functions",
                ],
              },
            ]),
          }}
        />
        {/* Clear any stale light-mode flag from removed feature */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{localStorage.removeItem("psyche-light-mode");document.documentElement.classList.remove("light")}catch(e){}`,
          }}
        />
        <ServiceWorkerRegistrar />
        {/* OneSignal web push, set NEXT_PUBLIC_ONESIGNAL_APP_ID in env to activate */}
        {process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID && (
          <>
            <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.OneSignalDeferred=window.OneSignalDeferred||[];OneSignalDeferred.push(async function(OneSignal){await OneSignal.init({appId:"${process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID}",safari_web_id:"web.onesignal.auto.${process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID}",notifyButton:{enable:false},allowLocalhostAsSecureOrigin:true});});`,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen noise-overlay">
        {/* PostHogProvider needs Suspense because it calls useSearchParams */}
        <Suspense fallback={null}>
          <PostHogProvider />
        </Suspense>
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
        {/* pb-24 = NavWheel clearance: button h-14 (56px) + bottom-24px offset + label ~16px */}
        <main className="pt-14 pb-24">{children}</main>
        <TutorialProvider />
        <RetentionBanner />
        <EngagementNudge />
      </body>
    </html>
  );
}
