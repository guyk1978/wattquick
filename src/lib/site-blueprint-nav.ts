import { Info, Mail, ScrollText, Shield, type LucideIcon } from "lucide-react";

export interface SiteBlueprintNavItem {
  id: SiteBlueprintPageId;
  href: string;
  label: string;
  icon: LucideIcon;
}

export type SiteBlueprintPageId = "about" | "contact" | "privacy" | "terms";

export const SITE_BLUEPRINT_NAV_ITEMS: SiteBlueprintNavItem[] = [
  { id: "about", href: "/about/", label: "About WattQuick", icon: Info },
  { id: "contact", href: "/contact/", label: "Contact", icon: Mail },
  { id: "privacy", href: "/privacy/", label: "Privacy Policy", icon: Shield },
  { id: "terms", href: "/terms/", label: "Terms of Service", icon: ScrollText },
];
