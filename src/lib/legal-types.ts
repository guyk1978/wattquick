export type LegalDocId = "privacy" | "terms";

export type LegalSection = {
  id: string;
  title: string;
};

export type LegalDocument = {
  id: LegalDocId;
  title: string;
  updated: string;
  eyebrow: string;
  markdown: string;
  sections: LegalSection[];
};

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function isLegalDocId(value: string): value is LegalDocId {
  return value === "privacy" || value === "terms";
}
