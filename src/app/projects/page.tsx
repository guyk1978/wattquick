import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectsPageClient } from "@/components/projects-page-client";
import { PageShell } from "@/components/page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "My Projects — WattQuick",
  description:
    "Save calculator snapshots to client projects, roll up engineering specs, and export combined PDF planning reports.",
  path: "/projects",
  keywords: [
    "energy project dashboard",
    "solar planning report",
    "calculator project save",
    "backup power BOM estimate",
  ],
});

export default function ProjectsPage() {
  return (
    <PageShell className="max-w-4xl">
      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground">Loading projects…</p>
        }
      >
        <ProjectsPageClient />
      </Suspense>
    </PageShell>
  );
}
