import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AnalyticsRouteTracker } from "@/components/analytics-route-tracker";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { DeferredAdSense } from "@/components/deferred-adsense";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { GridPinnedCalculatorProvider } from "@/components/grid-modal/grid-pinned-calculator-context";
import { LegacyUrlSanitizer } from "@/components/legacy-url-sanitizer";
import { NavigationLoadingOverlay } from "@/components/navigation-loading-overlay";
import { PageTransition } from "@/components/transitions/PageTransition";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import { getAllCalculatorMeta } from "@/lib/calculators";
import { createPageMetadata, FACEBOOK_APP_ID, SITE_URL } from "@/lib/seo";
import { consentInitScript } from "@/lib/consent-init";
import { legacyQueryInitScript } from "@/lib/legacy-query";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const calculatorCount = getAllCalculatorMeta().length;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...createPageMetadata({
    title: "WattQuick — Battery & Power Calculators",
    description:
      `Ultra-fast battery, solar, EV, and power micro-calculators. ${calculatorCount} free tools with instant results and minimal inputs.`,
    path: "",
  }),
  title: {
    default: "WattQuick — Battery & Power Calculators",
    template: "%s | WattQuick",
  },
};

export default function RootLayout({
  children,
  jsonLd,
}: Readonly<{
  children: React.ReactNode;
  jsonLd: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: consentInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: legacyQueryInitScript }} />
        {jsonLd}
        {/* Non-critical search chrome — defer apply so mobile FCP isn't blocked. */}
        <link
          rel="preload"
          href="/assets/css/site-search.css"
          as="style"
        />
        <link
          id="wq-site-search-css"
          rel="stylesheet"
          href="/assets/css/site-search.css"
          media="print"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.getElementById("wq-site-search-css");if(!l)return;if(l.sheet){l.media="all";return;}l.addEventListener("load",function(){l.media="all"});})();`,
          }}
        />
        <noscript>
          <link rel="stylesheet" href="/assets/css/site-search.css" />
        </noscript>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta property="fb:app_id" content={FACEBOOK_APP_ID} />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="site-ambient flex min-h-full flex-col bg-bg-primary text-text-primary">
        <ThemeProvider>
          <GridPinnedCalculatorProvider>
            <LegacyUrlSanitizer />
            <NavigationLoadingOverlay />
            <AnalyticsRouteTracker />
            <SiteHeader />
            <PageTransition>
              <main className="min-w-0 flex-1 overflow-x-clip">{children}</main>
            </PageTransition>
            <SiteFooter />
            <CookieConsentBanner />
            <DeferredAdSense />
            <ServiceWorkerRegistration />
          </GridPinnedCalculatorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
