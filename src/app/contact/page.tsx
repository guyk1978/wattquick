import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { PageHeader, PageShell } from "@/components/page-shell";
import { CONTACT_EMAIL } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description: "Contact the WattQuick team for feedback, partnerships, or calculator suggestions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageShell narrow>
      <PageHeader
        title="Contact"
        description="Questions, feedback, or ideas—we'd love to hear from you."
      />
      <div className="rounded-2xl border border-border/60 bg-card/50 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Mail className="size-5" aria-hidden />
          </span>
          <div className="space-y-3">
            <p className="text-sm leading-relaxed text-muted-foreground">
              For general inquiries, calculator suggestions, or bug reports, email us
              directly. We typically respond within a few business days.
            </p>
            <Link
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex text-base font-medium text-primary hover:underline"
            >
              {CONTACT_EMAIL}
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
