"use client";

import { BlogPostCard } from "@/components/blog/blog-post-card";
import { BlogIndexToolLaunch } from "@/components/blog/blog-index-tool-launch";
import type { BlogPost } from "@/lib/blog/posts";
import { cn } from "@/lib/utils";

interface BlogPostGridProps {
  posts: BlogPost[];
}

export function BlogPostGrid({ posts }: BlogPostGridProps) {
  const [featured, ...rest] = posts;

  return (
    <BlogIndexToolLaunch>
      <ul className="blog-compact-grid list-none p-0">
        {featured ? (
          <li className={cn("min-h-0", "blog-grid-featured")}>
            <BlogPostCard post={featured} featured className="h-full" />
          </li>
        ) : null}
        {rest.map((post) => (
          <li key={post.slug} className="min-h-0">
            <BlogPostCard post={post} className="h-full" />
          </li>
        ))}
      </ul>
    </BlogIndexToolLaunch>
  );
}
