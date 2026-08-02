"use client";

import { cn } from "@/lib/utils";

interface CommercialEvPlannerVizProps {
  className?: string;
}

/**
 * Friendly fleet route map for Commercial EV Fleet Range Planner [VIZ].
 * Delivery van travels a route while battery drains; markers for payload / aux impact.
 * Sample: 100 kWh · urban multi-stop · reefer light ≈ 220 km under load.
 */
export function CommercialEvPlannerViz({
  className,
}: CommercialEvPlannerVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--commercial-ev-planner", className)}
      aria-label="Commercial EV fleet range visual route overview"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — FLEET ROUTE</p>
        <h3 className="tool-viz__title">Will This Van Finish the Route?</h3>
        <p className="tool-viz__subtitle">
          Watch usable range shrink under cargo and refrigeration — then compare
          energy cost to a diesel fleet baseline.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg commercial-ev-planner-viz"
          role="img"
          aria-labelledby="cep-viz-title cep-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="cep-viz-title">
            Commercial EV range route map with payload and aux markers
          </title>
          <desc id="cep-viz-desc">
            An animated delivery van travels an urban route while a battery
            gauge drains. Markers show empty range near 310 kilometers, loaded
            range near 250 kilometers, and loaded plus refrigeration near 220
            kilometers on a sample 100 kilowatt-hour pack.
          </desc>

          <defs>
            <linearGradient id="cep-sky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0c1520" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>
            <linearGradient id="cep-hill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#152030" />
              <stop offset="100%" stopColor="#111114" />
            </linearGradient>
            <linearGradient id="cep-road" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2a3340" />
              <stop offset="100%" stopColor="#1a1a1e" />
            </linearGradient>
            <linearGradient id="cep-battery-fill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.45" />
            </linearGradient>
            <path
              id="cep-ride-path"
              d="M 70 410 C 180 410, 220 355, 310 350 S 430 400, 520 385 S 640 320, 740 335 S 840 385, 900 370"
            />
          </defs>

          <rect width="960" height="560" fill="url(#cep-sky)" />
          <rect x="12" y="12" width="936" height="536" fill="none" stroke="#262626" strokeWidth="1" rx="4" />

          <path
            d="M 0 360 Q 140 285 260 330 T 520 300 T 760 285 T 960 320 L 960 560 L 0 560 Z"
            fill="url(#cep-hill)"
            opacity="0.9"
          />
          <path
            d="M 0 420 Q 180 360 340 400 T 660 370 T 960 400 L 960 560 L 0 560 Z"
            fill="#0f0f12"
            opacity="0.85"
          />

          <g>
            <rect x="36" y="36" width="110" height="52" rx="6" fill="#111111" stroke="#333333" />
            <text x="48" y="56" fill="#888888" fontSize="10" letterSpacing="0.08em">PACK</text>
            <text x="48" y="76" fill="#ededed" fontSize="15" fontWeight="700">100 kWh</text>

            <rect x="158" y="36" width="130" height="52" rx="6" fill="#111111" stroke="#333333" />
            <text x="170" y="56" fill="#888888" fontSize="10" letterSpacing="0.08em">CARGO</text>
            <text x="170" y="76" fill="#ededed" fontSize="15" fontWeight="700">1,200 kg</text>

            <rect x="300" y="36" width="140" height="52" rx="6" fill="#111111" stroke="#333333" />
            <text x="312" y="56" fill="#888888" fontSize="10" letterSpacing="0.08em">AUX</text>
            <text x="312" y="76" fill="#ededed" fontSize="15" fontWeight="700">Reefer 4.5 kW</text>
          </g>

          <g transform="translate(760, 36)">
            <rect x="0" y="0" width="164" height="72" rx="6" fill="#111111" stroke="#38bdf8" strokeOpacity="0.55" strokeWidth="1.25" />
            <text x="14" y="22" fill="#888888" fontSize="10" letterSpacing="0.1em">BATTERY LEFT</text>
            <rect x="14" y="34" width="120" height="22" rx="4" fill="#0a0a0a" stroke="#333333" />
            <rect x="134" y="40" width="6" height="10" rx="1" fill="#333333" />
            <rect className="cep-viz-battery-fill" x="16" y="36" width="116" height="18" rx="3" fill="url(#cep-battery-fill)" />
          </g>

          <use href="#cep-ride-path" fill="none" stroke="url(#cep-road)" strokeWidth="28" strokeLinecap="round" />
          <use href="#cep-ride-path" fill="none" stroke="#3a4555" strokeWidth="2" strokeDasharray="14 16" strokeLinecap="round" className="cep-viz-dashes" />

          <g>
            <g transform="translate(340, 318)">
              <line x1="0" y1="0" x2="0" y2="-36" stroke="#4ade80" strokeWidth="1.5" strokeOpacity="0.7" />
              <circle cx="0" cy="0" r="5" fill="#4ade80" />
              <rect x="-44" y="-68" width="88" height="34" rx="4" fill="#0c1510" stroke="#4ade80" strokeOpacity="0.55" />
              <text x="0" y="-52" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="600">Empty</text>
              <text x="0" y="-38" textAnchor="middle" fill="#ededed" fontSize="12" fontWeight="700">~310 km</text>
            </g>
            <g transform="translate(540, 350)">
              <line x1="0" y1="0" x2="0" y2="-36" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
              <circle cx="0" cy="0" r="5" fill="currentColor" />
              <rect x="-44" y="-68" width="88" height="34" rx="4" fill="#111111" stroke="currentColor" strokeOpacity="0.55" />
              <text x="0" y="-52" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="600">Loaded</text>
              <text x="0" y="-38" textAnchor="middle" fill="#ededed" fontSize="12" fontWeight="700">~250 km</text>
            </g>
            <g transform="translate(850, 348)">
              <line x1="0" y1="0" x2="0" y2="-36" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />
              <circle cx="0" cy="0" r="5" fill="#38bdf8" />
              <rect x="-48" y="-68" width="96" height="34" rx="4" fill="#0b1520" stroke="#38bdf8" strokeOpacity="0.55" />
              <text x="0" y="-52" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="600">+ Reefer</text>
              <text x="0" y="-38" textAnchor="middle" fill="#ededed" fontSize="12" fontWeight="700">~220 km</text>
            </g>
          </g>

          <g className="cep-viz-van">
            <animateMotion dur="8s" repeatCount="indefinite" rotate="auto" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1">
              <mpath href="#cep-ride-path" />
            </animateMotion>
            <g transform="translate(-34, -28)" fill="none" stroke="#ededed" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="8" y="8" width="52" height="24" rx="3" />
              <path d="M8 20 H0 V32 H8" />
              <circle className="cep-viz-wheel" cx="16" cy="34" r="6" />
              <circle className="cep-viz-wheel" cx="52" cy="34" r="6" />
              <circle cx="16" cy="34" r="1.8" fill="#38bdf8" stroke="none" />
              <circle cx="52" cy="34" r="1.8" fill="#38bdf8" stroke="none" />
              <ellipse className="cep-viz-glow" cx="34" cy="40" rx="30" ry="4" fill="#38bdf8" stroke="none" opacity="0.28" />
            </g>
          </g>

          <g transform="translate(36, 470)">
            <rect x="0" y="0" width="888" height="58" rx="6" fill="#111111" stroke="#38bdf8" strokeOpacity="0.4" />
            <text x="20" y="24" fill="#888888" fontSize="11" letterSpacing="0.1em">
              REAL-WORLD RANGE (LOADED + REEFER)
            </text>
            <text className="cep-viz-range-value" x="20" y="46" fill="#ededed" fontSize="22" fontWeight="700">
              ~220 km · energy ~35% cheaper than diesel
            </text>
            <text x="868" y="36" textAnchor="end" fill="#888888" fontSize="12">
              Cut aux or cargo → go farther
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
