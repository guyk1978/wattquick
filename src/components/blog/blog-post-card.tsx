import type { CSSProperties } from "react";
import Link from "next/link";
import { Calendar, Clock, Zap } from "lucide-react";
import { calculators } from "@/data/calculators";
import { getBlogCategoryTheme } from "@/lib/blog-category-theme";
import type { BlogPost } from "@/lib/blog/posts";
import { glassNeon, glassSurface } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

function formatPublishedDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getCalculatorCtaLabel(slug: string): string | null {
  const calc = calculators.find((c) => c.slug === slug);
  if (!calc) return "Includes interactive calculator";
  const short =
    calc.title.length > 44 ? `${calc.title.slice(0, 41)}…` : calc.title;
  return `Includes ${short}`;
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
  const primaryCalc = post.calculatorSlugs[0];
  const ctaLabel = primaryCalc ? getCalculatorCtaLabel(primaryCalc) : null;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl",
        glassSurface,
        glassNeon,
        "border border-slate-200/80 bg-white shadow-md",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg",
        "dark:border-slate-700/60 dark:bg-slate-900/80 dark:shadow-[0_0_40px_-12px_var(--blog-glow)]",
        featured && "md:grid md:min-h-[300px] md:grid-cols-2 md:gap-0",
        className
      )}
      style={
        {
          "--blog-glow": theme.glow,
          "--neon-from": theme.accentFrom,
          "--neon-to": theme.accentTo,
          "--neon-glow": theme.glow,
        } as CSSProperties
      }
    >
      <Link
        href={href}
        className="absolute inset-0 z-10 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Read ${post.title}`}
      />

      <div
        className={cn(
          "relative overflow-hidden",
          featured ? "min-h-[200px] md:min-h-full" : "h-36 sm:h-40"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105",
            theme.gradient
          )}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/0.35),transparent_55%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/0.08),transparent_55%)]"
        />
        <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
          <span
            className={cn(
              "relative z-[1] w-fit rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide",
              theme.bg,
              theme.text,
              theme.border
            )}
          >
            {theme.label}
          </span>
          {featured ? (
            <span className="relative z-[1] text-xs font-semibold uppercase tracking-widest text-white/90 drop-shadow-sm dark:text-white/70">
              Featured guide
            </span>
          ) : null}
        </div>
      </div>

      <div
        className={cn(
          "relative flex flex-1 flex-col",
          featured ? "p-6 sm:p-8 md:justify-center" : "p-5 sm:p-6"
        )}
      >
        <h2
          className={cn(
            "font-bold tracking-tight text-foreground transition-colors group-hover:text-primary",
            featured ? "text-2xl sm:text-3xl" : "text-xl md:text-2xl"
          )}
        >
          {post.title}
        </h2>

        <p
          className={cn(
            "mt-3 leading-relaxed text-slate-500 dark:text-slate-400",
            featured ? "text-base sm:text-lg" : "text-sm sm:text-base"
          )}
        >
          {post.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5 shrink-0 opacity-70" aria-hidden />
            <time dateTime={post.publishedAt}>{formatPublishedDate(post.publishedAt)}</time>
          </span>
          <span aria-hidden className="text-slate-300 dark:text-slate-600">
            •
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5 shrink-0 opacity-70" aria-hidden />
            {post.readMinutes} min read
          </span>
        </div>

        {ctaLabel ? (
          <p
            className={cn(
              "relative z-[1] mt-4 inline-flex w-fit max-w-full items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold",
              theme.bg,
              theme.text,
              theme.border
            )}
          >
            <Zap className="size-3.5 shrink-0" aria-hidden />
            <span>{ctaLabel}</span>
          </p>
        ) : null}
      </div>
    </article>
  );
}
