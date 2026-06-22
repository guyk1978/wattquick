import type { BlueprintListNavIconKey } from "@/lib/blueprint-list-nav-icon-keys";

export interface SiteBlueprintNavItem {
  id: SiteBlueprintPageId;
  href: string;
  label: string;
  iconKey: BlueprintListNavIconKey;
}

export type SiteBlueprintPageId = "about" | "contact" | "privacy" | "terms";

export const SITE_BLUEPRINT_NAV_ITEMS: SiteBlueprintNavItem[] = [
  { id: "about", href: "/about/", label: "About WattQuick", iconKey: "info" },
  { id: "contact", href: "/contact/", label: "Contact", iconKey: "mail" },
  { id: "privacy", href: "/privacy/", label: "Privacy Policy", iconKey: "shield" },
  { id: "terms", href: "/terms/", label: "Terms of Service", iconKey: "scroll-text" },
];
