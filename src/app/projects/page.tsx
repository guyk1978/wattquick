import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectsBlueprintPage } from "@/components/projects/projects-blueprint-page";
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
    <Suspense
      fallback={
        <p className="hub-blueprint__loading px-4 py-10">Loading projects…</p>
      }
    >
      <ProjectsBlueprintPage />
    </Suspense>
  );
}
