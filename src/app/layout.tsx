import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { getAllCalculatorMeta } from "@/lib/calculators";
import { createPageMetadata, SITE_URL } from "@/lib/seo";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const calculatorCount = getAllCalculatorMeta().length;

const GA_MEASUREMENT_ID = "G-MVWDC4SXZG";

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
      </head>
      <body className="site-ambient flex min-h-full flex-col">
        <ThemeProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ThemeProvider>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Script src="/assets/js/vendor/fuse.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/site-search.js" strategy="afterInteractive" />
        <Script src="/assets/js/app.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
