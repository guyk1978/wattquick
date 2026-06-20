import Link from "next/link";
import { FileText } from "lucide-react";
import { BlueprintHubShell } from "@/components/blueprint/blueprint-hub-shell";
import { BlueprintListNav } from "@/components/blueprint/blueprint-list-nav";
import { GuideLandingArticle } from "@/components/landing/guide-landing-article";
import {
  getGuideLandingsByCategory,
} from "@/lib/calculators/calculator-landings-registry";
import type { GuideLandingDefinition } from "@/lib/calculators/landing-types";

interface GuideLandingBlueprintPageProps {
  landing: GuideLandingDefinition;
}

export function GuideLandingBlueprintPage({ landing }: GuideLandingBlueprintPageProps) {
  const navItems = getGuideLandingsByCategory(landing.calculatorCategory).map((item) => ({
    id: item.slug,
    href: item.href,
    label: item.title,
    icon: FileText,
  }));

  return (
    <BlueprintHubShell
      activeCategory={landing.calculatorCategory}
      statsTrailing={
        <Link href={landing.toolHref} className="calculator-blueprint-stats__link">
          Open calculator
        </Link>
      }
      rightNav={
        <BlueprintListNav
          title="Guides"
          items={navItems}
          activeId={landing.slug}
          emptyMessage="No guides in this category."
        />
      }
    >
      <Link
        href={landing.toolHref}
        className="calculator-page-header__back mb-1 inline-flex text-muted-foreground hover:text-foreground"
      >
        ← Open calculator
      </Link>

      <header className="guide-landing-header guide-landing-header--blueprint">
        <p className="guide-landing-header__eyebrow">Guide</p>
        <h1 className="guide-landing-header__title">{landing.title}</h1>
        <p className="guide-landing-header__description">{landing.description}</p>
      </header>

      <article className="blueprint-prose-body guide-landing-body min-w-0">
        <GuideLandingArticle landing={landing} />
      </article>
    </BlueprintHubShell>
  );
}
