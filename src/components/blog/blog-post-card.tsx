"use client";

import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { useBlogIndexToolLaunch } from "@/components/blog/blog-index-tool-launch";
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
  return name.length > 32 ? `${name.slice(0, 29)}…` : name;
}

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
  className?: string;
}

/** Compact light-glass card for the blog index grid */
export function BlogPostCard({
  post,
  featured = false,
  className,
}: BlogPostCardProps) {
  const { openToolForPost } = useBlogIndexToolLaunch();
  const theme = getBlogCategoryTheme(post.category);
  const href = `/blog/${post.slug}/`;
  const toolName = getToolDisplayName(post);
  const includesLabel = `Includes: ${toolName}`;

  const handleOpenTool = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openToolForPost(post);
  };

  return (
    <article
      className={cn(
        "blog-post-card group relative flex h-full flex-col overflow-hidden rounded-2xl",
        "border border-white/10 bg-white/40 shadow-sm backdrop-blur-[10px]",
        "transition-[transform,box-shadow,border-color] duration-300",
        "hover:-translate-y-0.5 hover:border-white/20 hover:shadow-md",
        "dark:bg-white/[0.04] dark:shadow-none",
        featured ? "min-h-[240px] sm:min-h-[200px]" : "min-h-[220px]",
        className
      )}
    >
      <Link
        href={href}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Read ${post.title}`}
      />

      <div
        className={cn(
          "relative shrink-0 overflow-hidden",
          featured ? "h-[5.5rem] sm:h-[5rem]" : "h-[4.5rem]"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-90",
            theme.gradient
          )}
        />
        <div className="relative flex h-full items-start justify-between gap-2 p-3">
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
          {featured ? (
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/90 drop-shadow-sm">
              Featured guide
            </span>
          ) : null}
        </div>
      </div>

      <div className="relative flex flex-1 flex-col p-3">
        <h2
          className={cn(
            "blog-post-card__title font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary",
            featured ? "text-base sm:text-lg" : "text-sm"
          )}
        >
          {post.title}
        </h2>

        <p
          className={cn(
            "mt-1.5 line-clamp-2 leading-relaxed text-muted-foreground",
            featured ? "text-sm" : "text-xs"
          )}
        >
          {post.description}
        </p>

        <div className="relative z-20 mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 text-[10px] font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Calendar className="size-3 shrink-0 opacity-70" aria-hidden />
            <time dateTime={post.publishedAt}>
              {formatPublishedDate(post.publishedAt)}
            </time>
          </span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3 shrink-0 opacity-70" aria-hidden />
            {post.readMinutes} min
          </span>
          <span aria-hidden>·</span>
          <button
            type="button"
            onClick={handleOpenTool}
            className={cn(
              "blog-tool-tag inline-flex max-w-full items-center rounded-md border border-white/10",
              "bg-white/30 px-1.5 py-0.5 text-[10px] font-medium text-foreground/90 backdrop-blur-[10px]",
              "transition-colors hover:border-cyan-500/35 hover:bg-cyan-500/15 hover:text-primary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
              "dark:bg-white/[0.08] dark:hover:bg-cyan-500/10"
            )}
            title={`Open ${toolName} calculator`}
          >
            <span className="blog-tool-tag__label truncate">{includesLabel}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
