import {
  DEFAULT_PROJECT_CURRENCY,
  resolveProjectCurrency,
  type ProjectCurrency,
} from "@/lib/project-currency";

export const PROJECTS_STORAGE_KEY = "wattquick_projects";

export type { ProjectCurrency };

export interface ProjectSnapshot {
  id: string;
  calculatorSlug: string;
  calculatorTitle: string;
  inputs: Record<string, string>;
  inputLabels: Record<string, string>;
  results: Record<string, string>;
  summary: string;
  timestamp: string;
}

export interface WattQuickProject {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  snapshots: ProjectSnapshot[];
  /** Per BOM line unit prices keyed by BomLineId */
  costPrices?: Record<string, string>;
  /** Quote currency for BOM worksheet and PDF export */
  currency?: ProjectCurrency;
}

export type ProjectSavePayload = {
  calculatorSlug: string;
  calculatorTitle: string;
  values: Record<string, string>;
  fieldLabels: Record<string, string>;
  results: Record<string, string>;
  summary: string;
};

function readProjectsRaw(): WattQuickProject[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as WattQuickProject[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (project) =>
          project &&
          typeof project.id === "string" &&
          typeof project.name === "string" &&
          Array.isArray(project.snapshots)
      )
      .map((project) => ({
        ...project,
        currency: resolveProjectCurrency(project.currency),
      }));
  } catch {
    return [];
  }
}

function writeProjects(projects: WattQuickProject[]): void {
  window.localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
}

function newId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `wq-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function listProjects(): WattQuickProject[] {
  return readProjectsRaw().sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function getProject(projectId: string): WattQuickProject | null {
  return listProjects().find((project) => project.id === projectId) ?? null;
}

export function createProject(name: string): WattQuickProject {
  const trimmed = name.trim();
  if (!trimmed) {
    throw new Error("Project name is required");
  }

  const now = new Date().toISOString();
  const project: WattQuickProject = {
    id: newId(),
    name: trimmed,
    createdAt: now,
    updatedAt: now,
    snapshots: [],
    currency: DEFAULT_PROJECT_CURRENCY,
  };

  const projects = listProjects();
  projects.unshift(project);
  writeProjects(projects);
  return project;
}

export function renameProject(projectId: string, name: string): WattQuickProject | null {
  const trimmed = name.trim();
  if (!trimmed) return null;

  const projects = listProjects();
  const index = projects.findIndex((project) => project.id === projectId);
  if (index < 0) return null;

  projects[index] = {
    ...projects[index]!,
    name: trimmed,
    updatedAt: new Date().toISOString(),
  };
  writeProjects(projects);
  return projects[index]!;
}

export function deleteProject(projectId: string): void {
  writeProjects(listProjects().filter((project) => project.id !== projectId));
}

export function addSnapshotToProject(
  projectId: string,
  payload: ProjectSavePayload
): WattQuickProject | null {
  const projects = listProjects();
  const index = projects.findIndex((project) => project.id === projectId);
  if (index < 0) return null;

  const snapshot: ProjectSnapshot = {
    id: newId(),
    calculatorSlug: payload.calculatorSlug,
    calculatorTitle: payload.calculatorTitle,
    inputs: { ...payload.values },
    inputLabels: { ...payload.fieldLabels },
    results: { ...payload.results },
    summary: payload.summary,
    timestamp: new Date().toISOString(),
  };

  projects[index] = {
    ...projects[index]!,
    updatedAt: snapshot.timestamp,
    snapshots: [snapshot, ...projects[index]!.snapshots],
  };
  writeProjects(projects);
  return projects[index]!;
}

export function updateProjectCurrency(
  projectId: string,
  currency: ProjectCurrency
): WattQuickProject | null {
  const projects = listProjects();
  const index = projects.findIndex((project) => project.id === projectId);
  if (index < 0) return null;

  projects[index] = {
    ...projects[index]!,
    currency,
    updatedAt: new Date().toISOString(),
  };
  writeProjects(projects);
  return projects[index]!;
}

export function updateProjectCostPrice(
  projectId: string,
  lineId: string,
  unitPrice: string
): WattQuickProject | null {
  const projects = listProjects();
  const index = projects.findIndex((project) => project.id === projectId);
  if (index < 0) return null;

  projects[index] = {
    ...projects[index]!,
    costPrices: {
      ...projects[index]!.costPrices,
      [lineId]: unitPrice,
    },
    updatedAt: new Date().toISOString(),
  };
  writeProjects(projects);
  return projects[index]!;
}

export function removeSnapshotFromProject(
  projectId: string,
  snapshotId: string
): WattQuickProject | null {
  const projects = listProjects();
  const index = projects.findIndex((project) => project.id === projectId);
  if (index < 0) return null;

  const nextSnapshots = projects[index]!.snapshots.filter(
    (snapshot) => snapshot.id !== snapshotId
  );

  projects[index] = {
    ...projects[index]!,
    snapshots: nextSnapshots,
    updatedAt: new Date().toISOString(),
  };
  writeProjects(projects);
  return projects[index]!;
}

export function buildProjectResults(
  resultLabel: string,
  value: string | null,
  unit?: string,
  detail?: string | null,
  extra?: Record<string, string>
): Record<string, string> {
  const results: Record<string, string> = { ...extra };
  if (value !== null && value !== "") {
    results[resultLabel] = unit ? `${value} ${unit}`.trim() : value;
  }
  if (detail) {
    results.Notes = detail;
  }
  return results;
}

export function buildProjectSavePayloadFromRows({
  calculatorSlug,
  calculatorTitle,
  values,
  fieldLabels,
  rows,
}: {
  calculatorSlug: string;
  calculatorTitle: string;
  values: Record<string, string>;
  fieldLabels: Record<string, string>;
  rows: { label: string; value: string; unit?: string }[];
}): ProjectSavePayload | null {
  if (rows.length === 0) return null;

  const results: Record<string, string> = {};
  for (const row of rows) {
    results[row.label] = row.unit ? `${row.value} ${row.unit}`.trim() : row.value;
  }

  const primary = rows[0]!;
  const summary = primary.unit
    ? `${primary.value} ${primary.unit}`.trim()
    : primary.value;

  return {
    calculatorSlug,
    calculatorTitle,
    values,
    fieldLabels,
    results,
    summary,
  };
}
