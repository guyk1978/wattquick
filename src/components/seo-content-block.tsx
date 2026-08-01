import { cn } from "@/lib/utils";

interface SEOContentBlockProps {
  /** Visible heading above the SEO paragraphs. */
  title: string;
  /** SEO copy — a single paragraph or a list of paragraphs. */
  content: string | string[];
  className?: string;
}

/**
 * Always-open SEO text block for category hubs and overview sections.
 * Paragraphs stay fully visible in the DOM (no accordion / disclosure)
 * so crawlers and ad scanners can read the copy on first paint.
 */
export function SEOContentBlock({
  title,
  content,
  className,
}: SEOContentBlockProps) {
  const paragraphs = Array.isArray(content) ? content : [content];

  return (
    <section className={cn("seo-content-block", className)}>
      <h3 className="seo-content-block__title">{title}</h3>
      <div className="seo-content-block__body">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
