import type { Metadata } from "next";
import { Shield } from "lucide-react";
import { SiteBlueprintHeader } from "@/components/site/site-blueprint-header";
import { SiteBlueprintLayout } from "@/components/site/site-blueprint-layout";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "How WattQuick handles data when you use our free battery and power calculators.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <SiteBlueprintLayout activeId="privacy">
      <SiteBlueprintHeader
        icon={Shield}
        title="Privacy Policy"
        description="Last updated: March 2026"
        label="Legal"
      />

      <div className="blueprint-prose-body site-page-body min-w-0">
        <h2>Overview</h2>
        <p>
          WattQuick provides free online calculators. We collect minimal data and
          do not require user accounts. This policy explains what information may
          be processed when you visit our site.
        </p>

        <h2>Information we collect</h2>
        <p>
          Calculator inputs are processed in your browser to produce results. We
          do not store the values you enter on our servers. Standard web server
          and analytics logs may include IP address, browser type, pages visited,
          and referring URL.
        </p>

        <h2>Cookies</h2>
        <p>
          We may use essential cookies for site functionality and analytics
          cookies to understand aggregate usage. You can control cookies through
          your browser settings.
        </p>

        <h2>Third parties</h2>
        <p>
          If we embed analytics or hosting services, those providers process data
          under their own privacy policies. We do not sell personal information.
        </p>

        <h2>Contact</h2>
        <p>Privacy questions: hello@wattquick.com</p>
      </div>
    </SiteBlueprintLayout>
  );
}
