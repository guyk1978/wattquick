import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { getBlogCategoryTheme } from "@/lib/blog-category-theme";
import type { BlogPost } from "@/lib/blog/posts";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { buildCalculatorUrl } from "@/lib/content-tool-link";
import { cn } from "@/lib/utils";

function formatPublishedDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getToolDisplayName(post: BlogPost): string {
  const meta = getCalculatorMeta(post.relatedToolId);
  const name = meta.title.replace(/\s*calculator\s*/gi, "").trim();
  return name.length > 36 ? `${name.slice(0, 33)}…` : name;
}

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
  className?: string;
}

export function BlogPostCard({
  post,
  featured = false,
  className,
}: BlogPostCardProps) {
  const theme = getBlogCategoryTheme(post.category);
  const href = `/blog/${post.slug}/`;
  const toolMeta = getCalculatorMeta(post.relatedToolId);
  const toolHref = buildCalculatorUrl(toolMeta.href, { fromArticle: post.slug });
  const toolName = getToolDisplayName(post);

  return (
    <article
      className={cn(
        "blog-post-card group relative flex h-full min-h-[15rem] flex-col",
        featured && "blog-post-card--featured",
        className
      )}
      style={
        {
          "--blog-accent": theme.accentFrom,
        } as CSSProperties
      }
    >
      <Link
        href={href}
        className="absolute inset-0 z-10 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Read ${post.title}`}
      />

      <div className="blog-post-card__top">
        <span className="blog-post-card__category">{theme.label}</span>
        <div className="blog-post-card__badges">
          <span className="blog-post-card__badge">
            <Calendar className="size-3.5" aria-hidden />
            <time dateTime={post.publishedAt}>
              {formatPublishedDate(post.publishedAt)}
            </time>
          </span>
          <span className="blog-post-card__badge">
            <Clock className="size-3.5" aria-hidden />
            {post.readMinutes} min read
          </span>
        </div>
      </div>

      <div className="blog-post-card__body">
        <h2 className="blog-post-card__title">{post.title}</h2>
        <p className="blog-post-card__description">{post.description}</p>
      </div>

      <div className="blog-post-card__footer">
        <Link href={toolHref} className="blog-post-card__tool-link relative z-20">
          <span className="truncate">Tool: {toolName}</span>
          <ArrowUpRight className="size-3.5 shrink-0" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
