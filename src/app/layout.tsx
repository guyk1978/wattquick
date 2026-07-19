import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AnalyticsRouteTracker } from "@/components/analytics-route-tracker";
import { ArticlePortalRoot } from "@/components/article-portal/article-portal-root";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { NavigationLoadingOverlay } from "@/components/navigation-loading-overlay";
import { PageTransition } from "@/components/transitions/PageTransition";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import { getAllCalculatorMeta } from "@/lib/calculators";
import { ADSENSE_SCRIPT_SRC } from "@/lib/adsense";
import { createPageMetadata, FACEBOOK_APP_ID, SITE_URL } from "@/lib/seo";
import { consentInitScript } from "@/lib/consent-init";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const calculatorCount = getAllCalculatorMeta().length;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        <script async src={ADSENSE_SCRIPT_SRC} crossOrigin="anonymous" />
        {jsonLd}
        <link rel="stylesheet" href="/assets/css/site-search.css" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta property="fb:app_id" content={FACEBOOK_APP_ID} />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="site-ambient flex min-h-full flex-col bg-bg-primary text-text-primary">
        <ThemeProvider>
          <ArticlePortalRoot>
            <NavigationLoadingOverlay />
            <AnalyticsRouteTracker />
            <SiteHeader />
            <PageTransition>
              <main className="min-w-0 flex-1 overflow-x-clip">{children}</main>
            </PageTransition>
            <SiteFooter />
            <CookieConsentBanner />
            <ServiceWorkerRegistration />
          </ArticlePortalRoot>
        </ThemeProvider>
      </body>
    </html>
  );
}
