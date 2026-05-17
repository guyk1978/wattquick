import type { Metadata } from "next";
import { PageHeader, PageShell } from "@/components/page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "How WattQuick handles data when you use our free battery and power calculators.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PageShell narrow>
      <PageHeader
        title="Privacy Policy"
        description={`Last updated: March 2026`}
      />
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Overview</h2>
          <p>
            WattQuick provides free online calculators. We collect minimal data and
            do not require user accounts. This policy explains what information may
            be processed when you visit our site.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">
            Information we collect
          </h2>
          <p>
            Calculator inputs are processed in your browser to produce results. We
            do not store the values you enter on our servers. Standard web server
            and analytics logs may include IP address, browser type, pages visited,
            and referring URL.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Cookies</h2>
          <p>
            We may use essential cookies for site functionality and analytics
            cookies to understand aggregate usage. You can control cookies through
            your browser settings.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Third parties</h2>
          <p>
            If we embed analytics or hosting services, those providers process data
            under their own privacy policies. We do not sell personal information.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Contact</h2>
          <p>
            Privacy questions: hello@wattquick.com
          </p>
        </section>
      </div>
    </PageShell>
  );
}
