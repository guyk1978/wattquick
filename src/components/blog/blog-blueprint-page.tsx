"use client";

import { useMemo, useState } from "react";
import { BookOpen } from "lucide-react";
import { BlogFilter, type BlogFilterValue } from "@/components/blog/blog-filter";
import { BlogBlueprintHeader } from "@/components/blog/blog-blueprint-header";
import { BlogPostGrid } from "@/components/blog/blog-post-grid";
import { BlueprintHubShell } from "@/components/blueprint/blueprint-hub-shell";
import { BlueprintListNav } from "@/components/blueprint/blueprint-list-nav";
import type { BlogCategory, BlogPost } from "@/lib/blog/posts";

interface BlogBlueprintPageProps {
  posts: BlogPost[];
}

function sortCategories(categories: Iterable<BlogCategory>): BlogCategory[] {
  return [...new Set(categories)].sort((a, b) => a.localeCompare(b));
}

export function BlogBlueprintPage({ posts }: BlogBlueprintPageProps) {
  const [selected, setSelected] = useState<BlogFilterValue>("All");

  const categories = useMemo(
    () => sortCategories(posts.map((post) => post.category)),
    [posts]
  );

  const filteredPosts = useMemo(() => {
    if (selected === "All") return posts;
    return posts.filter((post) => post.category === selected);
  }, [posts, selected]);

  const navItems = useMemo(
    () =>
      filteredPosts.map((post) => ({
        id: post.slug,
        href: `/blog/${post.slug}/`,
        label: post.title,
        icon: BookOpen,
      })),
    [filteredPosts]
  );

  return (
    <BlueprintHubShell
      rightNav={
        <BlueprintListNav
          title="Articles"
          items={navItems}
          emptyMessage="No articles in this filter."
        />
      }
    >
      <BlogBlueprintHeader articleCount={posts.length} />

      <div className="blog-hub blog-hub--blueprint">
        <BlogFilter
          categories={categories}
          selected={selected}
          onSelect={setSelected}
        />

        {filteredPosts.length === 0 ? (
          <div className="blog-hub__empty blog-hub__empty--blueprint" role="status">
            <p className="blog-hub__empty-title">No articles in this category</p>
            <p className="blog-hub__empty-text">
              Try another filter to browse more guides.
            </p>
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
    </BlueprintHubShell>
  );
}
