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
  metadataBase: new URL("https://psyche-app-two.vercel.app"),
  title: "Thyself. Know thyself.",
  description:
    "Know thyself. Discover your Enneagram type through 5 assessment paths. 9 types, 27 subtypes, cognitive functions, and deep psychology rooted in Ichazo, Naranjo, and Riso-Hudson.",
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
    title: "Thyself. Know thyself.",
    description:
      "Know thyself. 9 types, 27 subtypes, 5 assessment paths. Grounded in Ichazo, Naranjo & Riso-Hudson.",
    url: "https://psyche-app-two.vercel.app",
    siteName: "Thyself",
    type: "website",
    images: [
      {
        url: "https://psyche-app-two.vercel.app/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Thyself. Know thyself.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thyself. Know thyself.",
    description:
      "Know thyself. Discover your Enneagram type through 5 assessment paths. Deep psychology, 27 subtypes, cognitive functions.",
    images: ["https://psyche-app-two.vercel.app/opengraph-image"],
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
        <link rel="icon" href="/icon.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("psyche-light-mode")==="true")document.documentElement.classList.add("light")}catch(e){}`,
          }}
        />
        <ServiceWorkerRegistrar />
        {/* OneSignal web push — set NEXT_PUBLIC_ONESIGNAL_APP_ID in env to activate */}
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
