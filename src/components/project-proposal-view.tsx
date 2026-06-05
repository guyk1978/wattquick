"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Calculator, Zap } from "lucide-react";
import { ProjectCostWorksheet } from "@/components/project-cost-worksheet";
import { ProjectEngineeringRollup } from "@/components/project-engineering-rollup";
import { getProjectCurrency } from "@/lib/project-currency";
import { computeEngineeringRollup } from "@/lib/project-rollup";
import { readShareHashPayload, resolveSharedProject } from "@/lib/project-share";
import type { WattQuickProject } from "@/lib/project-store";

interface ProjectProposalViewProps {
  projectId: string;
}

export function ProjectProposalView({ projectId }: ProjectProposalViewProps) {
  const [project, setProject] = useState<WattQuickProject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const pathMatch = window.location.pathname.match(
      /\/projects\/share\/([^/]+)\/?$/
    );
    const resolvedId = pathMatch?.[1] ?? projectId;
    const hashPayload = readShareHashPayload();
    const resolved = resolveSharedProject(resolvedId, hashPayload);
    if (resolved) {
      setProject(resolved);
      setError(null);
    } else {
      setError(
        "This proposal link is missing data or has expired. Ask your technician to send a fresh share link."
      );
    }
    setHydrated(true);
  }, [projectId]);

  const rollup = useMemo(
    () => (project ? computeEngineeringRollup(project) : null),
    [project]
  );

  if (!hydrated) {
    return (
      <p className="text-sm text-muted-foreground">Loading proposal…</p>
    );
  }

  if (error || !project) {
    return (
      <div className="rounded-none border border-dashed border-border/60 px-6 py-12 text-center">
        <p className="text-sm text-muted-foreground">{error}</p>
        <Link
          href="/"
          className="mt-4 inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Visit WattQuick →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="border-b border-border/50 pb-6">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
          <Zap className="size-4" aria-hidden />
          WattQuick
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Project proposal
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {project.name}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Engineering summary and materials estimate ·{" "}
          {project.snapshots.length} calculation
          {project.snapshots.length === 1 ? "" : "s"} · Prepared{" "}
          {new Date(project.updatedAt).toLocaleDateString()}
        </p>
      </header>

      {rollup ? (
        <>
          <ProjectEngineeringRollup rollup={rollup} />
          <ProjectCostWorksheet
            rollup={rollup}
            costPrices={project.costPrices ?? {}}
            currency={getProjectCurrency(project)}
            readOnly
          />
        </>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Included calculations
        </h2>
        <ul className="space-y-2" role="list">
          {project.snapshots.map((snapshot) => (
            <li
              key={snapshot.id}
              className="rounded-none border border-border/50 bg-muted/10 px-4 py-3"
            >
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
            </li>
          ))}
        </ul>
      </section>

      <footer className="border-t border-border/40 pt-6 text-center text-xs text-muted-foreground">
        Prepared with{" "}
        <Link
          href="/"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          WattQuick
        </Link>{" "}
        — professional energy planning tools.
      </footer>
    </div>
  );
}
