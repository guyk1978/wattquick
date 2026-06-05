import type { Metadata } from "next";
import { ProjectsDashboard } from "@/components/projects-dashboard";
import { PageHeader, PageShell } from "@/components/page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "My Projects — WattQuick",
  description:
    "Save calculator snapshots to client projects and export combined PDF planning reports.",
  path: "/projects",
  keywords: [
    "energy project dashboard",
    "solar planning report",
    "calculator project save",
  ],
});

export default function ProjectsPage() {
  return (
    <PageShell className="max-w-4xl">
      <PageHeader
        title="My projects"
        description="Your system of record for shading checks, ROI models, backup sizing, and more—stored locally in this browser."
      />
      <ProjectsDashboard />
    </PageShell>
  );
}
