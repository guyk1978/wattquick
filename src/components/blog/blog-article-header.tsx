import { Calendar, Clock } from "lucide-react";
import { getBlogCategoryTheme } from "@/lib/blog-category-theme";
import type { BlogPost } from "@/lib/blog/posts";
import { cn } from "@/lib/utils";

function formatPublishedDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface BlogArticleHeaderProps {
  post: BlogPost;
  className?: string;
}

export function BlogArticleHeader({ post, className }: BlogArticleHeaderProps) {
  const theme = getBlogCategoryTheme(post.category);

  return (
    <header className={cn("mb-10 sm:mb-12", className)}>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl md:leading-[1.1]">
        {post.title}
      </h1>

      <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400 md:text-xl">
        {post.description}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span
          className={cn(
            "rounded-none border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
            theme.bg,
            theme.text,
            theme.border
          )}
        >
          {theme.label}
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400">
          <Calendar className="size-4 shrink-0 opacity-70" aria-hidden />
          <time dateTime={post.publishedAt}>{formatPublishedDate(post.publishedAt)}</time>
        </span>
        <span className="text-slate-300 dark:text-slate-600" aria-hidden>
          •
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400">
          <Clock className="size-4 shrink-0 opacity-70" aria-hidden />
          {post.readMinutes} min read
        </span>
      </div>

      <div
        className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700"
        aria-hidden
      />
    </header>
  );
}
