import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { getBlogCategoryTheme } from "@/lib/blog-category-theme";
import type { BlogPost } from "@/lib/blog/posts";
import { getCalculatorMeta } from "@/lib/calculators/registry";
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
  className?: string;
}

/** Compact light-glass card for the blog index grid */
export function BlogPostCard({ post, className }: BlogPostCardProps) {
  const theme = getBlogCategoryTheme(post.category);
  const href = `/blog/${post.slug}/`;
  const toolName = getToolDisplayName(post);
  const includesLabel = `Includes: ${toolName}`;

  return (
    <article
      className={cn(
        "blog-post-card group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl",
        "border border-white/10 bg-white/40 shadow-sm backdrop-blur-[10px]",
        "transition-[transform,box-shadow,border-color] duration-300",
        "hover:-translate-y-0.5 hover:border-white/20 hover:shadow-md",
        "dark:bg-white/[0.04] dark:shadow-none",
        className
      )}
    >
      <Link
        href={href}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Read ${post.title}`}
      />

      <div className="relative h-[4.5rem] shrink-0 overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-90",
            theme.gradient
          )}
        />
        <div className="relative flex h-full items-start p-3">
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
              theme.bg,
              theme.text,
              theme.border
            )}
          >
            {theme.label}
          </span>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col p-3 pb-10">
        <h2 className="blog-post-card__title line-clamp-3 text-sm font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
          {post.title}
        </h2>

        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {post.description}
        </p>

        <div className="mt-auto pt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Calendar className="size-3 shrink-0 opacity-70" aria-hidden />
            <time dateTime={post.publishedAt}>{formatPublishedDate(post.publishedAt)}</time>
          </span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3 shrink-0 opacity-70" aria-hidden />
            {post.readMinutes} min
          </span>
        </div>
      </div>

      <span
        className={cn(
          "blog-tool-tag pointer-events-none absolute bottom-2.5 right-2.5 z-[1] max-w-[calc(100%-1.25rem)]",
          "rounded-lg border border-white/10 bg-white/30 px-2 py-1 text-[10px] font-medium",
          "text-foreground/90 backdrop-blur-[10px]",
          "dark:border-white/10 dark:bg-white/[0.08] dark:text-slate-200"
        )}
        title={includesLabel}
      >
        <span className="blog-tool-tag__label block truncate">{includesLabel}</span>
      </span>
    </article>
  );
}
