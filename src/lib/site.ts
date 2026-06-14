import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorCategory,
} from "@/lib/calculators";
import { getCategoryPageHref } from "@/lib/category-routes";

export const MAIN_NAV = [
  { href: "/dashboard/", label: "Command Center" },
  { href: "/calculators/", label: "Calculators" },
  { href: "/favorites/", label: "Favorites" },
  { href: "/projects/", label: "My Projects" },
  { href: "/blog/", label: "Blog" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
] as const;

export const FOOTER_FEATURED_CATEGORIES = [
  "battery",
  "solar",
  "ev",
  "power",
  "convert",
] as const satisfies readonly CalculatorCategory[];

export const FOOTER_CALCULATOR_CATEGORIES: {
  category: CalculatorCategory;
  href: string;
}[] = FOOTER_FEATURED_CATEGORIES.map((category) => ({
  category,
  href: getCategoryPageHref(category),
}));

export const FOOTER_LINKS = {
  product: [
    { href: "/dashboard", label: "Command Center" },
    { href: "/projects", label: "My Projects" },
    { href: "/wizard", label: "WattQuick Wizard" },
    { href: "/calculators", label: "All calculators" },
    { href: "/favorites", label: "Favorites" },
    { href: "/calculators", label: "Quick search" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
} as const;

export const CONTACT_EMAIL = "hello@wattquick.com";
