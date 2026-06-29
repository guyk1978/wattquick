import type { Metadata } from "next";
import { ScrollText } from "lucide-react";
import { CalculatorAdSlots } from "@/components/calculator/calculator-ad-slots";
import { SiteBlueprintHeader } from "@/components/site/site-blueprint-header";
import { SiteBlueprintLayout } from "@/components/site/site-blueprint-layout";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description: "Terms of use for WattQuick battery and power micro-calculators.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <SiteBlueprintLayout activeId="terms">
      <SiteBlueprintHeader
        icon={ScrollText}
        title="Terms of Service"
        description="Last updated: March 2026"
        label="Legal"
      />

      <CalculatorAdSlots />

      <div className="blueprint-prose-body site-page-body min-w-0">
        <h2>Acceptance</h2>
        <p>
          By using WattQuick, you agree to these terms. If you do not agree,
          please do not use the site.
        </p>

        <h2>Calculator results are estimates</h2>
        <p>
          All outputs are for general planning and education only. They are not
          professional engineering, electrical, or financial advice. Verify
          critical installations with qualified professionals and manufacturer
          specifications.
        </p>

        <h2>Use of the service</h2>
        <p>
          You may use WattQuick for personal and commercial planning. Do not
          attempt to disrupt the service, scrape at excessive rates, or
          misrepresent affiliation with WattQuick.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          WattQuick is provided &quot;as is&quot; without warranties. We are not liable for
          damages arising from reliance on calculator results or site
          unavailability.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms or the calculators at any time. Continued use
          after changes constitutes acceptance.
        </p>
      </div>
    </SiteBlueprintLayout>
  );
}
