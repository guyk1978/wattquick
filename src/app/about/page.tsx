import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, PageShell } from "@/components/page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About WattQuick",
  description:
    "WattQuick is a free platform of ultra-fast battery, solar, and power micro-calculators built for clarity and speed.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        title="About WattQuick"
        description="Fast, focused tools for anyone who works with batteries and power."
      />
      <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
        <p className="text-base leading-relaxed">
          WattQuick started with a simple idea: battery math shouldn&apos;t require a
          spreadsheet or a 20-minute YouTube tutorial. Whether you&apos;re sizing a
          solar bank, estimating EV charging cost, or checking how long a UPS will
          last, you deserve an answer in seconds.
        </p>
        <p className="text-base leading-relaxed">
          Every calculator uses one to three inputs, updates live as you type, and
          shows a clear result—no accounts, no ads in your face, no submit buttons.
        </p>
        <h2 className="text-lg font-semibold text-foreground">What we cover</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
          <li>Battery runtime, charging, and capacity conversions</li>
          <li>Solar panel and battery bank sizing</li>
          <li>EV home charging time and cost</li>
          <li>Appliance energy and electricity cost</li>
          <li>Electrical unit conversions (W, A, kVA, HP)</li>
        </ul>
        <p className="text-sm leading-relaxed">
          Have feedback or a calculator request?{" "}
          <Link href="/contact" className="text-primary hover:underline">
            Get in touch
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
