import { BlogPostCard } from "@/components/blog/blog-post-card";
import type { BlogPost } from "@/lib/blog/posts";
import { cn } from "@/lib/utils";

interface BlogPostGridProps {
  posts: BlogPost[];
}

export function BlogPostGrid({ posts }: BlogPostGridProps) {
  const [featured, ...rest] = posts;

  return (
    <ul className="blog-hub__grid list-none p-0">
      {featured ? (
        <li className={cn("min-h-0", "blog-hub__grid-featured")}>
          <BlogPostCard post={featured} featured className="h-full" />
        </li>
      ) : null}
      {rest.map((post) => (
        <li key={post.slug} className="blog-hub__grid-cell">
          <BlogPostCard post={post} className="h-full" />
        </li>
      ))}
    </ul>
  );
}
