import { CollapsibleSection } from "@/components/collapsible-section";
import { cn } from "@/lib/utils";

interface CollapsibleSEOContentProps {
  /** Header label shown on the clickable trigger. */
  title: string;
  /** SEO copy — a single paragraph or a list of paragraphs. */
  content: string | string[];
  defaultOpen?: boolean;
  className?: string;
}

/**
 * Collapsible wrapper for long SEO text blocks on category pages.
 * The copy is always present in the HTML (hidden via max-height/opacity,
 * never display:none) so search engines index it in both states.
 */
export function CollapsibleSEOContent({
  title,
  content,
  defaultOpen = false,
  className,
}: CollapsibleSEOContentProps) {
  const paragraphs = Array.isArray(content) ? content : [content];

  return (
    <CollapsibleSection
      title={title}
      defaultOpen={defaultOpen}
      headingLevel="h3"
      className={cn("collapsible-seo-content", className)}
    >
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
      ))}
    </CollapsibleSection>
  );
}
