import type { CSSProperties } from "react";
import { Calendar, Clock } from "lucide-react";
import { BlogFeaturedImage } from "@/components/blog/blog-featured-image";
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
    <header className={cn("blog-article-header", className)}>
      <h1 className="blog-article-header__title">{post.title}</h1>

      {post.featuredImage ? (
        <BlogFeaturedImage
          src={post.featuredImage}
          alt={
            post.featuredImageAlt ??
            `Featured image for ${post.title}`
          }
        />
      ) : null}

      {!post.featuredImage ? (
        <p className="blog-article-header__description">{post.description}</p>
      ) : null}

      <div className="blog-article-header__meta">
        <span
          className="blog-article-header__badge blog-article-header__badge--category"
          style={{ "--cat": theme.accentFrom } as CSSProperties}
        >
          {theme.label}
        </span>
        <span className="blog-article-header__badge">
          <Calendar className="size-3.5 shrink-0 opacity-80" aria-hidden />
          <time dateTime={post.publishedAt}>{formatPublishedDate(post.publishedAt)}</time>
        </span>
        <span className="blog-article-header__badge">
          <Clock className="size-3.5 shrink-0 opacity-80" aria-hidden />
          {post.readMinutes} min read
        </span>
      </div>

      <div className="blog-article-header__divider" aria-hidden />
    </header>
  );
}
