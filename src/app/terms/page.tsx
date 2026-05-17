import type { Metadata } from "next";
import { PageHeader, PageShell } from "@/components/page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description: "Terms of use for WattQuick battery and power micro-calculators.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PageShell narrow>
      <PageHeader
        title="Terms of Service"
        description="Last updated: March 2026"
      />
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Acceptance</h2>
          <p>
            By using WattQuick, you agree to these terms. If you do not agree,
            please do not use the site.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">
            Calculator results are estimates
          </h2>
          <p>
            All outputs are for general planning and education only. They are not
            professional engineering, electrical, or financial advice. Verify
            critical installations with qualified professionals and manufacturer
            specifications.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Use of the service</h2>
          <p>
            You may use WattQuick for personal and commercial planning. Do not
            attempt to disrupt the service, scrape at excessive rates, or
            misrepresent affiliation with WattQuick.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">
            Limitation of liability
          </h2>
          <p>
            WattQuick is provided &quot;as is&quot; without warranties. We are not liable for
            damages arising from reliance on calculator results or site
            unavailability.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Changes</h2>
          <p>
            We may update these terms or the calculators at any time. Continued use
            after changes constitutes acceptance.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
