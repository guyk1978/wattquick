import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { AnalyticsRouteTracker } from "@/components/analytics-route-tracker";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { getAllCalculatorMeta } from "@/lib/calculators";
import { createPageMetadata, SITE_URL } from "@/lib/seo";
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="stylesheet" href="/assets/css/site-search.css" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#1a1a1a" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="site-ambient flex min-h-full flex-col">
        <ThemeProvider>
          <AnalyticsRouteTracker />
          <SiteHeader />
          <main className="min-w-0 flex-1 overflow-x-clip">{children}</main>
          <SiteFooter />
          <CookieConsentBanner />
        </ThemeProvider>
        <Script src="/assets/js/vendor/fuse.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/site-search.js" strategy="afterInteractive" />
        <Script src="/assets/js/app.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
