import {
  BookOpen,
  Briefcase,
  Calculator,
  Info,
  LayoutDashboard,
  Mail,
  Star,
  type LucideIcon,
} from "lucide-react";

export const MAIN_NAV_ICON_MAP: Record<string, LucideIcon> = {
  "/dashboard": LayoutDashboard,
  "/calculators": Calculator,
  "/favorites": Star,
  "/projects": Briefcase,
  "/blog": BookOpen,
  "/about": Info,
  "/contact": Mail,
};
