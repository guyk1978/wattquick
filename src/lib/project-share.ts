import { resolveProjectCurrency, type ProjectCurrency } from "@/lib/project-currency";
import type { ProjectSnapshot, WattQuickProject } from "@/lib/project-store";

const SHARE_VERSION = 1;
const HASH_PREFIX = "d=";

export interface ProjectSharePayload {
  v: typeof SHARE_VERSION;
  id: string;
  name: string;
  currency: ProjectCurrency;
  costPrices: Record<string, string>;
  updatedAt: string;
  createdAt: string;
  snapshots: ProjectSnapshot[];
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(encoded: string): Uint8Array {
  const padded = encoded.replace(/-/g, "+").replace(/_/g, "/");
  const padLen = (4 - (padded.length % 4)) % 4;
  const base64 = padded + "=".repeat(padLen);
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export function projectToSharePayload(project: WattQuickProject): ProjectSharePayload {
  return {
    v: SHARE_VERSION,
    id: project.id,
    name: project.name,
    currency: resolveProjectCurrency(project.currency),
    costPrices: { ...project.costPrices },
    updatedAt: project.updatedAt,
    createdAt: project.createdAt,
    snapshots: project.snapshots.map((snapshot) => ({ ...snapshot })),
  };
}

export function sharePayloadToProject(payload: ProjectSharePayload): WattQuickProject {
  return {
    id: payload.id,
    name: payload.name,
    createdAt: payload.createdAt,
    updatedAt: payload.updatedAt,
    currency: resolveProjectCurrency(payload.currency),
    costPrices: { ...payload.costPrices },
    snapshots: payload.snapshots.map((snapshot) => ({ ...snapshot })),
  };
}

export function encodeSharePayload(project: WattQuickProject): string {
  const json = JSON.stringify(projectToSharePayload(project));
  return toBase64Url(new TextEncoder().encode(json));
}

export function decodeSharePayload(encoded: string): ProjectSharePayload | null {
  try {
    const json = new TextDecoder().decode(fromBase64Url(encoded));
    const parsed = JSON.parse(json) as ProjectSharePayload;
    if (
      !parsed ||
      parsed.v !== SHARE_VERSION ||
      typeof parsed.id !== "string" ||
      typeof parsed.name !== "string" ||
      !Array.isArray(parsed.snapshots)
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function buildProjectShareUrl(
  project: WattQuickProject,
  origin = typeof window !== "undefined" ? window.location.origin : "https://wattquick.com"
): string {
  const encoded = encodeSharePayload(project);
  const base = origin.replace(/\/$/, "");
  return `${base}/projects/share/${project.id}/#${HASH_PREFIX}${encoded}`;
}

export function readShareHashPayload(): string | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash.startsWith(HASH_PREFIX)) return null;
  return hash.slice(HASH_PREFIX.length);
}

const SESSION_PREFIX = "wq-share:";

/** Cache encoded payload in sessionStorage for same-tab recovery. */
export function cacheSharePayload(project: WattQuickProject): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(
    `${SESSION_PREFIX}${project.id}`,
    encodeSharePayload(project)
  );
}

export function readCachedSharePayload(projectId: string): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(`${SESSION_PREFIX}${projectId}`);
}

export function resolveSharedProject(
  projectId: string,
  hashEncoded?: string | null
): WattQuickProject | null {
  const encoded =
    hashEncoded ??
    readShareHashPayload() ??
    readCachedSharePayload(projectId);
  if (!encoded) return null;

  const payload = decodeSharePayload(encoded);
  if (!payload) return null;

  // Static hosts may rewrite unknown UUID paths to /proposal/ while keeping hash data.
  if (payload.id !== projectId && projectId !== "proposal") {
    return null;
  }

  return sharePayloadToProject(payload);
}
