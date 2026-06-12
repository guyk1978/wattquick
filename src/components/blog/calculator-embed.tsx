import { BlogToolCard } from "@/components/blog/blog-tool-card";
import { CalculatorSpotlight } from "@/components/blog/calculator-spotlight";
import { isCalculatorId } from "@/lib/calculators/utils";
import type { CalculatorId } from "@/lib/calculators";
import { cn } from "@/lib/utils";

interface CalculatorEmbedProps {
  slug: string;
  articleSlug: string;
  className?: string;
}

/** In-article calculator callout — links to the full calculator page */
export function CalculatorEmbed({ slug, articleSlug, className }: CalculatorEmbedProps) {
  if (isCalculatorId(slug)) {
    return (
      <BlogToolCard
        calculatorId={slug as CalculatorId}
        articleSlug={articleSlug}
        variant="embed"
        className={cn("my-8 sm:my-10", className)}
      />
    );
  }
  return (
    <CalculatorSpotlight
      slug={slug}
      articleSlug={articleSlug}
      className={cn("my-8 sm:my-10", className)}
    />
  );
}
