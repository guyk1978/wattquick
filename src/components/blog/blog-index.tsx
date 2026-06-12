"use client";

import { useMemo, useState } from "react";
import { BlogFilter, type BlogFilterValue } from "@/components/blog/blog-filter";
import { BlogPostGrid } from "@/components/blog/blog-post-grid";
import type { BlogCategory, BlogPost } from "@/lib/blog/posts";

interface BlogIndexProps {
  posts: BlogPost[];
}

function sortCategories(categories: Iterable<BlogCategory>): BlogCategory[] {
  return [...new Set(categories)].sort((a, b) => a.localeCompare(b));
}

export function BlogIndex({ posts }: BlogIndexProps) {
  const [selected, setSelected] = useState<BlogFilterValue>("All");

  const categories = useMemo(
    () => sortCategories(posts.map((post) => post.category)),
    [posts]
  );

  const filteredPosts = useMemo(() => {
    if (selected === "All") return posts;
    return posts.filter((post) => post.category === selected);
  }, [posts, selected]);

  return (
    <div className="blog-hub">
      <BlogFilter
        categories={categories}
        selected={selected}
        onSelect={setSelected}
      />

      {filteredPosts.length === 0 ? (
        <div className="blog-hub__empty" role="status">
          <p className="blog-hub__empty-title">No articles in this category</p>
          <p className="blog-hub__empty-text">Try another filter to browse more guides.</p>
        </div>
      ) : (
        <>
          <p className="blog-hub__count">
            {filteredPosts.length} article{filteredPosts.length === 1 ? "" : "s"}
          </p>
          <BlogPostGrid posts={filteredPosts} />
        </>
      )}
    </div>
  );
}
