"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FolderKanban } from "lucide-react";
import { BlueprintHubShell } from "@/components/blueprint/blueprint-hub-shell";
import { BlueprintListNav } from "@/components/blueprint/blueprint-list-nav";
import { ProjectDetail } from "@/components/project-detail";
import { ProjectsBlueprintHeader } from "@/components/projects/projects-blueprint-header";
import { ProjectsDashboard } from "@/components/projects-dashboard";
import { listProjects } from "@/lib/project-store";

export function ProjectsBlueprintPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");
  const [hydrated, setHydrated] = useState(false);
  const [projectCount, setProjectCount] = useState(0);

  const refreshProjects = useCallback(() => {
    setProjectCount(listProjects().length);
    setHydrated(true);
  }, []);

  useEffect(() => {
    refreshProjects();
  }, [refreshProjects]);

  const navItems = useMemo(() => {
    if (!hydrated) return [];
    return listProjects().map((project) => ({
      id: project.id,
      href: `/projects/?id=${project.id}`,
      label: project.name,
      icon: FolderKanban,
    }));
  }, [hydrated, projectCount, projectId]);

  return (
    <BlueprintHubShell
      rightNav={
        <BlueprintListNav
          title="Projects"
          items={navItems}
          activeId={projectId}
          emptyMessage="No projects saved yet."
        />
      }
    >
      {projectId ? (
        <ProjectDetail projectId={projectId} />
      ) : (
        <>
          <ProjectsBlueprintHeader
            projectCount={hydrated ? projectCount : undefined}
          />
          {!hydrated ? (
            <p className="hub-blueprint__loading">Loading projects…</p>
          ) : (
            <ProjectsDashboard onProjectsChange={refreshProjects} />
          )}
        </>
      )}
    </BlueprintHubShell>
  );
}
