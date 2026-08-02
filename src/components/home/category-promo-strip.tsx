import Image from "next/image";
import Link from "next/link";
import { Gauge, Shield, Tent, Truck, Zap, type LucideIcon } from "lucide-react";
import type { CalculatorCategory } from "@/data/calculator-types";
import { cn } from "@/lib/utils";

type PromoStripConfig = {
  accentClass: string;
  titleId: string;
  headline: string;
  subhead: string;
  ctaLabel: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  Icon: LucideIcon;
};

const CATEGORY_PROMO_STRIPS: Partial<
  Record<CalculatorCategory, PromoStripConfig>
> = {
  ebike: {
    accentClass: "wq-category-promo--ebike",
    titleId: "wq-ebike-promo-title",
    headline: "Want to Know Your Real Range?",
    subhead:
      "Calculate your e-bike's true battery range, top speeds, and component lifespan based on your exact specs.",
    ctaLabel: "Calculate Now »",
    href: "/tools/e-bike/ebike-range-performance/",
    imageSrc: "/images/home/ebike-promo-rider.webp",
    imageAlt:
      "Neon illustration of a rider on an e-bike with a full battery indicator",
    Icon: Gauge,
  },
  escooter: {
    accentClass: "wq-category-promo--escooter",
    titleId: "wq-escooter-promo-title",
    headline: "What's Your Scooter's True Range?",
    subhead:
      "Calculate your electric scooter's real battery range, top speeds on hills, and tire lifespan based on your exact specs.",
    ctaLabel: "Calculate Scooter Range »",
    href: "/tools/e-scooter/escooter-range-performance/",
    imageSrc: "/images/home/escooter-promo-rider.webp",
    imageAlt:
      "Neon illustration of a rider on a high-performance electric scooter",
    Icon: Zap,
  },
  "commercial-ev": {
    accentClass: "wq-category-promo--commercial-ev",
    titleId: "wq-commercial-ev-promo-title",
    headline: "Commercial EV Fleet Range Planner",
    subhead:
      "Calculate real-world range under heavy loads, cargo weight impact, refrigeration power drain, and fleet operating costs.",
    ctaLabel: "Plan Fleet Route »",
    href: "/tools/commercial-ev/commercial-ev-planner/",
    imageSrc: "/images/home/commercial-ev-promo-van.webp",
    imageAlt: "Neon illustration of a commercial electric delivery van",
    Icon: Truck,
  },
  "rv-marine": {
    accentClass: "wq-category-promo--rv-marine",
    titleId: "wq-rv-marine-promo-title",
    headline: "RV & Off-Grid Power Station Planner",
    subhead:
      "Calculate your daily energy balance, off-grid autonomy days, solar recovery, and appliance surge limits.",
    ctaLabel: "Plan Off-Grid Power »",
    href: "/tools/rv-marine-power/power-station-planner/",
    imageSrc: "/images/home/power-station-promo.webp",
    imageAlt:
      "Neon illustration of a portable power station next to a foldable solar panel",
    Icon: Tent,
  },
  backup: {
    accentClass: "wq-category-promo--backup",
    titleId: "wq-backup-promo-title",
    headline: "Home Solar Backup & UPS Calculator",
    subhead:
      "Calculate exact blackout backup hours, inverter surge limits, battery degradation, and peak shaving savings.",
    ctaLabel: "Calculate Backup System »",
    href: "/tools/backup-power/solar-backup-calculator/",
    imageSrc: "/images/home/solar-backup-promo.webp",
    imageAlt:
      "Neon illustration of a home lithium battery storage unit with rooftop solar",
    Icon: Shield,
  },
};

interface CategoryPromoStripProps {
  category: CalculatorCategory;
  className?: string;
}

/**
 * Slim horizontal promo strip for selected category landing pages.
 */
export function CategoryPromoStrip({
  category,
  className,
}: CategoryPromoStripProps) {
  const promo = CATEGORY_PROMO_STRIPS[category];
  if (!promo) return null;

  const { Icon } = promo;

  return (
    <aside
      className={cn("wq-category-promo", promo.accentClass, className)}
      aria-labelledby={promo.titleId}
    >
      <div className="wq-category-promo__inner">
        <div className="wq-category-promo__art">
          <Image
            src={promo.imageSrc}
            alt={promo.imageAlt}
            width={320}
            height={320}
            className="wq-category-promo__art-img"
            sizes="(max-width: 768px) 7rem, 9rem"
            priority={false}
          />
        </div>

        <div className="wq-category-promo__copy">
          <span className="wq-category-promo__icon" aria-hidden>
            <Icon className="size-4" strokeWidth={1.75} />
          </span>
          <div className="wq-category-promo__text">
            <h2 id={promo.titleId} className="wq-category-promo__headline">
              {promo.headline}
            </h2>
            <p className="wq-category-promo__subhead">{promo.subhead}</p>
          </div>
        </div>

        <Link
          href={promo.href}
          prefetch={false}
          className="wq-category-promo__cta"
        >
          {promo.ctaLabel}
        </Link>
      </div>
    </aside>
  );
}

export function hasCategoryPromoStrip(category: CalculatorCategory): boolean {
  return category in CATEGORY_PROMO_STRIPS;
}
