import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { CalculatorAdSlots } from "@/components/calculator/calculator-ad-slots";
import { SiteBlueprintHeader } from "@/components/site/site-blueprint-header";
import { SiteBlueprintLayout } from "@/components/site/site-blueprint-layout";
import { CONTACT_EMAIL } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description: "Contact the WattQuick team for feedback, partnerships, or calculator suggestions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <SiteBlueprintLayout activeId="contact">
      <SiteBlueprintHeader
        icon={Mail}
        title="Contact"
        description="Questions, feedback, or ideas—we'd love to hear from you."
      />

      <CalculatorAdSlots />

      <div className="site-contact-panel">
        <span className="site-contact-panel__icon" aria-hidden>
          <Mail className="size-3.5" strokeWidth={2.25} />
        </span>
        <div className="site-contact-panel__body">
          <p>
            For general inquiries, calculator suggestions, or bug reports, email us
            directly. We typically respond within a few business days.
          </p>
          <Link href={`mailto:${CONTACT_EMAIL}`} className="site-contact-panel__email">
            {CONTACT_EMAIL}
          </Link>
        </div>
      </div>
    </SiteBlueprintLayout>
  );
}
