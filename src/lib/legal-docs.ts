import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  slugifyHeading,
  type LegalDocId,
  type LegalDocument,
  type LegalSection,
} from "@/lib/legal-types";

export type { LegalDocId, LegalDocument, LegalSection } from "@/lib/legal-types";
export { isLegalDocId, slugifyHeading } from "@/lib/legal-types";

const LEGAL_DIR = path.join(process.cwd(), "src/content/legal");

const DOC_FILES: Record<LegalDocId, string> = {
  privacy: "privacy.md",
  terms: "terms.md",
};

function extractSections(markdown: string): LegalSection[] {
  const sections: LegalSection[] = [];
  const seen = new Map<string, number>();

  for (const line of markdown.split("\n")) {
    const match = /^##\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const title = match[1].trim();
    const base = slugifyHeading(title);
    const count = seen.get(base) ?? 0;
    const id = count > 0 ? `${base}-${count + 1}` : base;
    seen.set(base, count + 1);
    sections.push({ id, title });
  }

  return sections;
}

/** Server-only: reads Markdown legal documents from disk. */
export function getLegalDocument(id: LegalDocId): LegalDocument {
  const filePath = path.join(LEGAL_DIR, DOC_FILES[id]);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const markdown = content.trim();

  return {
    id,
    title: String(
      data.title ?? (id === "privacy" ? "Privacy Policy" : "Terms of Service")
    ),
    updated: String(data.updated ?? ""),
    eyebrow: String(data.eyebrow ?? "Legal"),
    markdown,
    sections: extractSections(markdown),
  };
}

export function getAllLegalDocuments(): Record<LegalDocId, LegalDocument> {
  return {
    privacy: getLegalDocument("privacy"),
    terms: getLegalDocument("terms"),
  };
}
