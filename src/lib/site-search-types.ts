export type SiteSearchItemType = "calculator" | "blog" | "page" | "guide";

export interface SiteSearchItem {
  id: string;
  type: SiteSearchItemType;
  category: string;
  group?: string;
  title: string;
  description: string;
  href: string;
  tag?: string;
  keywords?: string[];
}

export interface SiteSearchIndex {
  version: number;
  generatedAt: string;
  popular: SiteSearchItem[];
  items: SiteSearchItem[];
}

export const SITE_SEARCH_CATEGORY_ORDER = [
  "Calculators",
  "Blog Articles",
  "Site",
] as const;

export const SITE_SEARCH_INDEX_URL = "/data/search-index.json";
