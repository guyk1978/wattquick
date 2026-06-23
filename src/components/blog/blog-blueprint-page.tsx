"use client";

import { useMemo } from "react";
import { BlogBlueprintHeader } from "@/components/blog/blog-blueprint-header";
import { BlogPostList } from "@/components/blog/blog-post-list";
import { CalculatorAdSlots } from "@/components/calculator/calculator-ad-slots";
import { BlueprintHubShell } from "@/components/blueprint/blueprint-hub-shell";
import { BlueprintListNav } from "@/components/blueprint/blueprint-list-nav";
import type { BlogPost } from "@/lib/blog/posts";

interface BlogBlueprintPageProps {
  posts: BlogPost[];
}

export function BlogBlueprintPage({ posts }: BlogBlueprintPageProps) {
  const navItems = useMemo(
    () =>
      posts.map((post) => ({
        id: post.slug,
        href: `/blog/${post.slug}/`,
        label: post.title,
        iconKey: "book-open" as const,
      })),
    [posts]
  );

  return (
    <BlueprintHubShell
      rightNav={
        <BlueprintListNav
          title="Articles"
          items={navItems}
          emptyMessage="No articles yet."
        />
      }
    >
      <BlogBlueprintHeader articleCount={posts.length} />

      <CalculatorAdSlots />

      <div className="blog-hub blog-hub--blueprint">
        {posts.length === 0 ? (
          <div className="blog-hub__empty blog-hub__empty--blueprint" role="status">
            <p className="blog-hub__empty-title">No articles yet</p>
            <p className="blog-hub__empty-text">Check back soon for new guides.</p>
          </div>
        ) : (
          <BlogPostList posts={posts} />
        )}
      </div>
    </BlueprintHubShell>
  );
}
