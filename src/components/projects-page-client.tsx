"use client";

import { useSearchParams } from "next/navigation";
import { ProjectDetail } from "@/components/project-detail";
import { ProjectsDashboard } from "@/components/projects-dashboard";
import { PageHeader } from "@/components/page-shell";

export function ProjectsPageClient() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");

  if (projectId) {
    return <ProjectDetail projectId={projectId} />;
  }

  return (
    <>
      <PageHeader
        title="My projects"
        description="Your system of record for shading checks, ROI models, backup sizing, and more—stored locally in this browser."
      />
      <ProjectsDashboard />
    </>
  );
}
