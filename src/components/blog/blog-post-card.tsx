"use client";

import type { CSSProperties } from "react";
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

/** Flat, sharp blog index card */
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
        "blog-post-card group relative flex h-full flex-col overflow-hidden rounded-none",
        "bg-card transition-colors duration-150 hover:bg-muted/30",
        "dark:bg-[rgb(6_10_22/0.72)] dark:hover:bg-[rgb(8_14_28/0.85)]",
        featured ? "min-h-[200px] sm:min-h-[180px]" : "min-h-[180px]",
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
        className="absolute inset-0 z-10 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Read ${post.title}`}
      />

      <div className="relative flex shrink-0 items-center justify-between gap-2 border-b border-border/40 px-2.5 py-2">
        <span className="blog-post-card__label text-[0.625rem] font-semibold uppercase tracking-widest text-muted-foreground">
          {theme.label}
        </span>
        {featured ? (
          <span className="text-[0.625rem] font-semibold uppercase tracking-widest text-muted-foreground/80">
            Featured guide
          </span>
        ) : null}
      </div>

      <div className="relative flex flex-1 flex-col px-2.5 py-2.5">
        <h2
          className={cn(
            "blog-post-card__title font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary",
            featured ? "text-base" : "text-sm"
          )}
        >
          {post.title}
        </h2>

        <p
          className={cn(
            "mt-1 line-clamp-2 leading-relaxed text-muted-foreground",
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
              "blog-tool-tag inline-flex max-w-full items-center rounded-none border border-border/50",
              "bg-transparent px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground",
              "transition-colors hover:border-border hover:bg-muted/40 hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-1"
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
