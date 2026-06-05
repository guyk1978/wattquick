import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorCategory,
} from "@/lib/calculators";

export const MAIN_NAV = [
  { href: "/dashboard", label: "Command Center" },
  { href: "/calculators", label: "Calculators" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_CALCULATOR_CATEGORIES: {
  category: CalculatorCategory;
  href: string;
}[] = (
  Object.keys(CALCULATOR_CATEGORY_LABELS) as CalculatorCategory[]
).map((category) => ({
  category,
  href: `/category/${category}`,
}));

export const FOOTER_LINKS = {
  product: [
    { href: "/dashboard", label: "Command Center" },
    { href: "/wizard", label: "WattQuick Wizard" },
    { href: "/calculators", label: "All calculators" },
    { href: "/#calculators", label: "Quick search" },
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
