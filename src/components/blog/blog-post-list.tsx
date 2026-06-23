import Link from "next/link";
import { getBlogCategoryTheme } from "@/lib/blog-category-theme";
import type { BlogPost } from "@/lib/blog/posts";
import { cn } from "@/lib/utils";

const SITE_HOST = "wattquick.com";

function formatPublishedDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface BlogPostListProps {
  posts: BlogPost[];
  className?: string;
}

export function BlogPostList({ posts, className }: BlogPostListProps) {
  return (
    <ul className={cn("blog-results-list", className)}>
      {posts.map((post) => {
        const href = `/blog/${post.slug}/`;
        const theme = getBlogCategoryTheme(post.category);

        return (
          <li key={post.slug} className="blog-result">
            <Link href={href} className="blog-result__title">
              {post.title}
            </Link>
            <p className="blog-result__url">
              {SITE_HOST}
              <span aria-hidden> › </span>
              blog
              <span aria-hidden> › </span>
              {post.slug}
              <span aria-hidden> · </span>
              {theme.label}
              <span aria-hidden> · </span>
              <time dateTime={post.publishedAt}>{formatPublishedDate(post.publishedAt)}</time>
              <span aria-hidden> · </span>
              {post.readMinutes} min read
            </p>
            <p className="blog-result__snippet">{post.description}</p>
          </li>
        );
      })}
    </ul>
  );
}
