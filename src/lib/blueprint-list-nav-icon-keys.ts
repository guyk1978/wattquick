export const BLUEPRINT_LIST_NAV_ICON_KEYS = [
  "book-open",
  "file-text",
  "folder-kanban",
  "info",
  "mail",
  "shield",
  "scroll-text",
] as const;

export type BlueprintListNavIconKey = (typeof BLUEPRINT_LIST_NAV_ICON_KEYS)[number];
