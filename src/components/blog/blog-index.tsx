"use client";

import { BlogPostList } from "@/components/blog/blog-post-list";
import type { BlogPost } from "@/lib/blog/posts";

interface BlogIndexProps {
  posts: BlogPost[];
}

export function BlogIndex({ posts }: BlogIndexProps) {
  return (
    <div className="blog-hub">
      {posts.length === 0 ? (
        <div className="blog-hub__empty" role="status">
          <p className="blog-hub__empty-title">No articles yet</p>
          <p className="blog-hub__empty-text">Check back soon for new guides.</p>
        </div>
      ) : (
        <BlogPostList posts={posts} />
      )}
    </div>
  );
}
