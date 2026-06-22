"use client";

import {
  BookOpen,
  FileText,
  FolderKanban,
  Info,
  Mail,
  ScrollText,
  Shield,
  type LucideIcon,
} from "lucide-react";
import type { BlueprintListNavIconKey } from "@/lib/blueprint-list-nav-icon-keys";

const ICONS: Record<BlueprintListNavIconKey, LucideIcon> = {
  "book-open": BookOpen,
  "file-text": FileText,
  "folder-kanban": FolderKanban,
  info: Info,
  mail: Mail,
  shield: Shield,
  "scroll-text": ScrollText,
};

export function resolveBlueprintListNavIcon(
  key: BlueprintListNavIconKey | undefined
): LucideIcon | undefined {
  if (!key) return undefined;
  return ICONS[key];
}
