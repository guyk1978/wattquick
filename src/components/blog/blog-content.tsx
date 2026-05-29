import { CalculatorEmbed } from "@/components/blog/calculator-embed";
import { BlogMarkdown } from "@/components/blog/blog-markdown";
import { parseBlogContent } from "@/lib/blog/parse-content";

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  const segments = parseBlogContent(content);

  return (
    <div className="blog-article-body space-y-2">
      {segments.map((segment, index) =>
        segment.type === "embed" ? (
          <CalculatorEmbed key={`embed-${segment.slug}-${index}`} slug={segment.slug} />
        ) : (
          <BlogMarkdown key={`md-${index}`} content={segment.content} />
        )
      )}
    </div>
  );
}
