"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Calculator,
  FileDown,
  Loader2,
  Trash2,
} from "lucide-react";
import { ProjectCostWorksheet } from "@/components/project-cost-worksheet";
import { ProjectCurrencySelector } from "@/components/project-currency-selector";
import { ProjectShareLinkButton } from "@/components/project-share-link-button";
import { ProjectEngineeringRollup } from "@/components/project-engineering-rollup";
import { getProjectCurrency } from "@/lib/project-currency";
import { exportProjectPDFReport } from "@/lib/project-pdf";
import { computeEngineeringRollup } from "@/lib/project-rollup";
import {
  getProject,
  removeSnapshotFromProject,
  updateProjectCostPrice,
  updateProjectCurrency,
  type ProjectCurrency,
  type WattQuickProject,
} from "@/lib/project-store";
import { calculatorCommandBtn } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface ProjectDetailProps {
  projectId: string;
}

export function ProjectDetail({ projectId }: ProjectDetailProps) {
  const [project, setProject] = useState<WattQuickProject | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    setProject(getProject(projectId));
  }, [projectId]);

  useEffect(() => {
    refresh();
    setHydrated(true);
  }, [refresh]);

  const rollup = useMemo(
    () => (project ? computeEngineeringRollup(project) : null),
    [project]
  );

  const handleExport = async () => {
    if (!project) return;
    setExporting(true);
    setExportError(null);
    try {
      await exportProjectPDFReport(project);
    } catch {
      setExportError("Could not export project report. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const handleUnitPriceChange = (lineId: string, value: string) => {
    const updated = updateProjectCostPrice(projectId, lineId, value);
    if (updated) setProject(updated);
  };

  const handleCurrencyChange = (currency: ProjectCurrency) => {
    const updated = updateProjectCurrency(projectId, currency);
    if (updated) setProject(updated);
  };

  const handleRemoveSnapshot = (snapshotId: string) => {
    const updated = removeSnapshotFromProject(projectId, snapshotId);
    if (updated) setProject(updated);
  };

  if (!hydrated) {
    return (
      <p className="text-sm text-muted-foreground">Loading project…</p>
    );
  }

  if (!project) {
    return (
      <div className="rounded-none border border-dashed border-border/60 px-6 py-12 text-center">
        <p className="text-sm text-muted-foreground">Project not found in this browser.</p>
        <Link
          href="/projects/"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/projects/"
            className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            All projects
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {project.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {project.snapshots.length} snapshot
            {project.snapshots.length === 1 ? "" : "s"} · Updated{" "}
            {new Date(project.updatedAt).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <ProjectCurrencySelector
            value={getProjectCurrency(project)}
            onChange={handleCurrencyChange}
          />
          <ProjectShareLinkButton project={project} />
          <button
            type="button"
            onClick={() => void handleExport()}
            disabled={exporting || project.snapshots.length === 0}
            className={cn(
              calculatorCommandBtn,
              "inline-flex h-11 items-center gap-2 px-5 text-sm font-semibold text-foreground",
              exporting && "cursor-wait opacity-80"
            )}
          >
            {exporting ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <FileDown className="size-4 text-primary" aria-hidden />
            )}
            {exporting ? "Exporting…" : "Export project report"}
          </button>
        </div>
      </div>

      {exportError ? (
        <p className="rounded-none border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {exportError}
        </p>
      ) : null}

      {rollup ? (
        <>
          <ProjectEngineeringRollup rollup={rollup} />
          <ProjectCostWorksheet
            rollup={rollup}
            costPrices={project.costPrices ?? {}}
            currency={getProjectCurrency(project)}
            onUnitPriceChange={handleUnitPriceChange}
          />
        </>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Saved calculations
        </h2>
        {project.snapshots.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No snapshots yet. Run a calculator and use{" "}
            <span className="font-medium text-foreground">Save to project</span>.
          </p>
        ) : (
          <ul className="space-y-2" role="list">
            {project.snapshots.map((snapshot) => (
              <li
                key={snapshot.id}
                className="rounded-none border border-border/50 bg-muted/10 px-4 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                      <Calculator
                        className="size-3.5 shrink-0 text-primary"
                        aria-hidden
                      />
                      {snapshot.calculatorTitle}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {snapshot.summary}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(snapshot.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveSnapshot(snapshot.id)}
                    className="shrink-0 text-xs text-muted-foreground hover:text-destructive"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
