import Link from "next/link";
import { ArrowUpRight, Lightbulb } from "lucide-react";
import { ContentToolLaunchLink } from "@/components/content/content-tool-launch-link";
import { calculators } from "@/data/calculators";
import type { CalculatorId } from "@/lib/calculators";
import { buildCalculatorUrl } from "@/lib/content-tool-link";
import { isCalculatorId } from "@/lib/calculators/utils";
import { cn } from "@/lib/utils";

interface CalculatorSpotlightProps {
  slug: string;
  articleSlug?: string;
  className?: string;
  compact?: boolean;
}

export function CalculatorSpotlight({
  slug,
  articleSlug,
  className,
  compact = false,
}: CalculatorSpotlightProps) {
  const calc = calculators.find((c) => c.slug === slug);
  if (!calc || !isCalculatorId(calc.slug)) return null;

  const calculatorId: CalculatorId = calc.slug;
  const href = buildCalculatorUrl(calc.href);
  const action = (
    <>
      Open calculator
      <ArrowUpRight className="size-4" strokeWidth={2.5} aria-hidden />
    </>
  );

  return (
    <aside
      className={cn(
        "blog-tool-card not-prose",
        compact && "blog-tool-card--compact",
        className
      )}
    >
      <div className="blog-tool-card__header">
        <span className="blog-tool-card__icon blog-tool-card__icon--muted" aria-hidden>
          <Lightbulb className="size-5" strokeWidth={2} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="blog-tool-card__eyebrow">Tool spotlight</p>
          <p className="blog-tool-card__title">{calc.title}</p>
          <p
            className={cn(
              "blog-tool-card__description",
              compact && "text-sm"
            )}
          >
            Put this guide into practice with live inputs and instant results.
          </p>
        </div>
      </div>

      {articleSlug ? (
        <ContentToolLaunchLink
          calculatorHref={calc.href}
          calculatorId={calculatorId}
          articleSlug={articleSlug}
          className="blog-tool-card__action"
        >
          {action}
        </ContentToolLaunchLink>
      ) : (
        <Link href={href} className="blog-tool-card__action">
          {action}
        </Link>
      )}
    </aside>
  );
}
