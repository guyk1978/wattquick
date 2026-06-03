import { CalculatorEmbed } from "@/components/blog/calculator-embed";
import { BlogMarkdown } from "@/components/blog/blog-markdown";
import { ToolPreview } from "@/components/content/tool-preview";
import { parseBlogContent } from "@/lib/blog/parse-content";
import { isCalculatorId } from "@/lib/calculators/utils";

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  const segments = parseBlogContent(content);

  return (
    <div className="blog-article-body space-y-2">
      {segments.map((segment, index) => {
        if (segment.type === "embed") {
          return (
            <CalculatorEmbed
              key={`embed-${segment.slug}-${index}`}
              slug={segment.slug}
            />
          );
        }
        if (segment.type === "toolPreview") {
          if (!isCalculatorId(segment.toolId)) return null;
          return (
            <ToolPreview
              key={`preview-${segment.toolId}-${index}`}
              toolId={segment.toolId}
            />
          );
        }
        return (
          <BlogMarkdown key={`md-${index}`} content={segment.content} />
        );
      })}
    </div>
  );
}
