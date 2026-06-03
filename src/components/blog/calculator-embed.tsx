"use client";

import { ToolPreview } from "@/components/content/tool-preview";
import { isCalculatorId } from "@/lib/calculators/utils";
import { CalculatorSpotlight } from "@/components/blog/calculator-spotlight";
import { cn } from "@/lib/utils";

interface CalculatorEmbedProps {
  slug: string;
  className?: string;
}

/** In-article tool callout — uses ToolPreview when inside ToolLaunchProvider */
export function CalculatorEmbed({ slug, className }: CalculatorEmbedProps) {
  if (isCalculatorId(slug)) {
    return <ToolPreview toolId={slug} className={cn("my-10 sm:my-12", className)} />;
  }
  return (
    <CalculatorSpotlight slug={slug} className={cn("my-10 sm:my-12", className)} />
  );
}
