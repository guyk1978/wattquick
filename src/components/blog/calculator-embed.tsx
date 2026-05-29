import { CalculatorSpotlight } from "@/components/blog/calculator-spotlight";
import { cn } from "@/lib/utils";

interface CalculatorEmbedProps {
  slug: string;
  className?: string;
}

/** In-article interactive tool callout — matches hub calculator CTA styling */
export function CalculatorEmbed({ slug, className }: CalculatorEmbedProps) {
  return (
    <CalculatorSpotlight
      slug={slug}
      className={cn("my-10 sm:my-12", className)}
    />
  );
}
