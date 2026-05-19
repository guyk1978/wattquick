import { CalculatorEmbed } from "@/components/blog/calculator-embed";
import { BlogMarkdown } from "@/components/blog/blog-markdown";
import { parseBlogContent } from "@/lib/blog/parse-content";

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  const segments = parseBlogContent(content);

  return (
    <div className="space-y-6">
      {segments.map((segment, index) =>
        segment.type === "embed" ? (
          <CalculatorEmbed key={`embed-${segment.slug}-${index}`} slug={segment.slug} />
        ) : (
          <div key={`md-${index}`} className="space-y-4">
            <BlogMarkdown content={segment.content} />
          </div>
        )
      )}
    </div>
  );
}
