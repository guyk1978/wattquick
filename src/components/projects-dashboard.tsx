"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  Calculator,
  FileDown,
  FolderKanban,
  Loader2,
  Trash2,
} from "lucide-react";
import { exportProjectPDFReport } from "@/lib/project-pdf";
import {
  deleteProject,
  listProjects,
  removeSnapshotFromProject,
  type WattQuickProject,
} from "@/lib/project-store";
import { calculatorCommandBtn } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

export function ProjectsDashboard() {
  const [projects, setProjects] = useState<WattQuickProject[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [exportingId, setExportingId] = useState<string | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    setProjects(listProjects());
  }, []);

  useEffect(() => {
    refresh();
    setHydrated(true);
  }, [refresh]);

  const handleExport = async (project: WattQuickProject) => {
    setExportingId(project.id);
    setExportError(null);
    try {
      if (!project.snapshots?.length) {
        throw new Error("Project has no saved calculations to export");
      }
      await exportProjectPDFReport(project);
    } catch (error) {
      console.error("[WattQuick] Project export failed", {
        projectId: project.id,
        projectName: project.name,
        snapshotCount: project.snapshots?.length ?? 0,
        error,
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
      setExportError("Could not export project report. Please try again.");
    } finally {
      setExportingId(null);
    }
  };

  const handleDeleteProject = (projectId: string) => {
    deleteProject(projectId);
    refresh();
  };

  const handleRemoveSnapshot = (projectId: string, snapshotId: string) => {
    removeSnapshotFromProject(projectId, snapshotId);
    refresh();
  };

  if (!hydrated) {
    return (
      <p className="text-sm text-muted-foreground">Loading your projects…</p>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="rounded-none border border-dashed border-border/60 px-6 py-12 text-center">
        <FolderKanban
          className="mx-auto size-8 text-muted-foreground"
          aria-hidden
        />
        <h2 className="mt-4 text-lg font-semibold text-foreground">
          No projects yet
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Run a calculator, then use{" "}
          <span className="font-medium text-foreground">Save to project</span>{" "}
          to capture inputs and results for a client-ready report.
        </p>
        <Link
          href="/wizard/"
          className="mt-4 inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Start with the WattQuick Wizard →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {exportError ? (
        <p className="rounded-none border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {exportError}
        </p>
      ) : null}

      <ul className="grid gap-4 sm:grid-cols-2" role="list">
        {projects.map((project) => (
          <li key={project.id}>
            <article className="projects-card flex h-full flex-col rounded-none border border-border/60 bg-muted/10 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold tracking-tight text-foreground">
                    <Link
                      href={`/projects/?id=${project.id}`}
                      className="hover:text-primary hover:underline underline-offset-4"
                    >
                      {project.name}
                    </Link>
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Updated {new Date(project.updatedAt).toLocaleString()} ·{" "}
                    {project.snapshots.length} snapshot
                    {project.snapshots.length === 1 ? "" : "s"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteProject(project.id)}
                  className="inline-flex size-8 items-center justify-center text-muted-foreground hover:text-destructive"
                  aria-label={`Delete project ${project.name}`}
                >
                  <Trash2 className="size-4" aria-hidden />
                </button>
              </div>

              <ul className="mt-4 flex-1 space-y-2" role="list">
                {project.snapshots.slice(0, 5).map((snapshot) => (
                  <li
                    key={snapshot.id}
                    className="rounded-none border border-border/50 bg-background/60 px-3 py-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                          <Calculator
                            className="size-3.5 shrink-0 text-primary"
                            aria-hidden
                          />
                          <span className="truncate">{snapshot.calculatorTitle}</span>
                        </p>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {snapshot.summary}
                        </p>
                        <p className="mt-0.5 text-[0.625rem] text-muted-foreground">
                          {new Date(snapshot.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveSnapshot(project.id, snapshot.id)
                        }
                        className="shrink-0 text-xs text-muted-foreground hover:text-destructive"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
                {project.snapshots.length > 5 ? (
                  <li className="text-xs text-muted-foreground">
                    +{project.snapshots.length - 5} more snapshot
                    {project.snapshots.length - 5 === 1 ? "" : "s"}
                  </li>
                ) : null}
              </ul>

              <div className="mt-4 flex flex-col gap-2 border-t border-border/40 pt-4">
                <Link
                  href={`/projects/?id=${project.id}`}
                  className={cn(
                    calculatorCommandBtn,
                    "inline-flex h-10 w-full items-center justify-center text-sm font-semibold text-foreground"
                  )}
                >
                  Open project &amp; BOM
                </Link>
                <button
                  type="button"
                  onClick={() => void handleExport(project)}
                  disabled={
                    exportingId === project.id || project.snapshots.length === 0
                  }
                  className={cn(
                    calculatorCommandBtn,
                    "inline-flex h-10 w-full items-center justify-center gap-2 text-sm font-semibold text-foreground",
                    exportingId === project.id && "cursor-wait opacity-80"
                  )}
                >
                  {exportingId === project.id ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                  ) : (
                    <FileDown className="size-4 text-primary" aria-hidden />
                  )}
                  {exportingId === project.id
                    ? "Exporting…"
                    : "Export project report"}
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
