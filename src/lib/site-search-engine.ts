import Fuse from "fuse.js";
import type { SiteSearchItem } from "@/lib/site-search-types";
import { SITE_SEARCH_INDEX_URL } from "@/lib/site-search-types";

export { SITE_SEARCH_INDEX_URL };

export function createSiteSearchEngine(items: SiteSearchItem[]) {
  return new Fuse(items, {
    keys: [
      { name: "title", weight: 0.45 },
      { name: "description", weight: 0.25 },
      { name: "keywords", weight: 0.15 },
      { name: "tag", weight: 0.08 },
      { name: "group", weight: 0.07 },
    ],
    threshold: 0.38,
    ignoreLocation: true,
    includeScore: true,
    minMatchCharLength: 2,
  });
}

export function searchSiteItems(
  engine: Fuse<SiteSearchItem> | null,
  items: SiteSearchItem[],
  query: string
): SiteSearchItem[] {
  const q = query.trim();
  if (!q) return [];

  if (engine) {
    return engine.search(q).map((result) => result.item);
  }

  const lower = q.toLowerCase();
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(lower) ||
      item.description.toLowerCase().includes(lower)
  );
}
