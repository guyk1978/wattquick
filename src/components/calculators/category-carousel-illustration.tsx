import type { ReactNode } from "react";
import type { CalculatorCategory } from "@/data/calculator-types";
import { cn } from "@/lib/utils";

interface CategoryCarouselIllustrationProps {
  category: CalculatorCategory;
  className?: string;
}

const svgProps = {
  viewBox: "0 0 64 64",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
};

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Simple thin-line icons — tight fit inside carousel cards. */
export function CategoryCarouselIllustration({
  category,
  className,
}: CategoryCarouselIllustrationProps) {
  return (
    <svg
      {...svgProps}
      className={cn("category-carousel-illustration", className)}
    >
      {ILLUSTRATIONS[category]}
    </svg>
  );
}

const ILLUSTRATIONS: Record<CalculatorCategory, ReactNode> = {
  battery: (
    <>
      <rect x="20" y="14" width="24" height="38" rx="2" {...stroke} />
      <path d="M28 14V10h8v4" {...stroke} />
      <path d="M26 28h12M26 36h8" {...stroke} />
    </>
  ),
  sizing: (
    <>
      <rect x="18" y="16" width="28" height="36" rx="2" {...stroke} />
      <path d="M26 16V12h12v4" {...stroke} />
      <path d="M12 30h6M12 27v6" {...stroke} />
      <path d="M46 42h6M46 39v6" {...stroke} />
    </>
  ),
  backup: (
    <>
      <rect x="16" y="14" width="32" height="38" rx="2" {...stroke} />
      <path d="M32 26v16M26 32h12" {...stroke} />
      <path d="M44 20c3 2 5 5 5 8" {...stroke} />
    </>
  ),
  power: (
    <>
      <path d="M36 10L22 34h10l-6 16 18-24H34l2-16z" {...stroke} />
    </>
  ),
  solar: (
    <>
      <path d="M16 40h32l-16-18-16 18z" {...stroke} />
      <path d="M22 40v14h20V40" {...stroke} />
      <rect x="20" y="18" width="24" height="10" rx="1" {...stroke} />
      <path d="M26 18v10M32 18v10M38 18v10M20 23h24" {...stroke} />
    </>
  ),
  ev: (
    <>
      <path d="M12 38h40l-5-12H17l-5 12z" {...stroke} />
      <circle cx="20" cy="40" r="4" {...stroke} />
      <circle cx="44" cy="40" r="4" {...stroke} />
      <path d="M26 26h6v6h-6z" {...stroke} />
    </>
  ),
  "commercial-ev": (
    <>
      <rect x="10" y="26" width="30" height="16" rx="1" {...stroke} />
      <path d="M40 30h12l4 6v6H40V30z" {...stroke} />
      <circle cx="18" cy="44" r="4" {...stroke} />
      <circle cx="46" cy="44" r="4" {...stroke} />
    </>
  ),
  ebike: (
    <>
      <circle cx="17" cy="44" r="10" {...stroke} />
      <circle cx="47" cy="44" r="10" {...stroke} />
      <path d="M17 44h11l6-12h5" {...stroke} />
      <path d="M34 32l3-10h8" {...stroke} />
      <path d="M37 22h9" {...stroke} />
      <path d="M34 32l-6 12" {...stroke} />
    </>
  ),
  escooter: (
    <>
      <circle cx="45" cy="45" r="9" {...stroke} />
      <circle cx="15" cy="47" r="7" {...stroke} />
      <path d="M15 47h26" {...stroke} />
      <path d="M37 47V28" {...stroke} />
      <path d="M31 28h12" {...stroke} />
    </>
  ),
  "rv-marine": (
    <>
      <path d="M10 42c10-8 34-8 44 0" {...stroke} />
      <path d="M32 42V18" {...stroke} />
      <path d="M32 18 14 42" {...stroke} />
      <path d="M32 22l16 18" {...stroke} />
    </>
  ),
  appliance: (
    <>
      <rect x="20" y="12" width="24" height="40" rx="2" {...stroke} />
      <path d="M20 30h24" {...stroke} />
      <circle cx="26" cy="38" r="1.5" {...stroke} />
      <circle cx="32" cy="38" r="1.5" {...stroke} />
    </>
  ),
  "green-home": (
    <>
      <path d="M32 12 14 32h8v20h20V32h8L32 12z" {...stroke} />
      <path d="M28 52v-20" {...stroke} />
      <path d="M42 24c2 2 3 4 3 7" {...stroke} />
    </>
  ),
  pool: (
    <>
      <ellipse cx="32" cy="40" rx="22" ry="8" {...stroke} />
      <path d="M14 40c4 3 36 3 40 0" {...stroke} />
      <path d="M32 16v14M28 20h8" {...stroke} />
    </>
  ),
  tou: (
    <>
      <circle cx="32" cy="32" r="18" {...stroke} />
      <path d="M32 32V20" {...stroke} />
      <path d="M32 32l10 6" {...stroke} />
    </>
  ),
  cost: (
    <>
      <circle cx="32" cy="32" r="18" {...stroke} />
      <path d="M32 24v16M28 28h6a4 4 0 100 8h-4" {...stroke} />
    </>
  ),
  convert: (
    <>
      <path d="M14 26h18M32 26l-4-4M32 26l-4 4" {...stroke} />
      <path d="M50 38H32M32 38l4-4M32 38l4 4" {...stroke} />
    </>
  ),
};
