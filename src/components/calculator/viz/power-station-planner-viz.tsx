"use client";

import { cn } from "@/lib/utils";

interface PowerStationPlannerVizProps {
  className?: string;
}

/**
 * Friendly campsite energy balance viz for Power Station Planner [VIZ].
 * Solar fills the station while camping loads drain it; autonomy and surge cues.
 * Sample: 1000 Wh · 200W solar · fridge + Starlink ≈ multi-day buffer on sunny days.
 */
export function PowerStationPlannerViz({
  className,
}: PowerStationPlannerVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--power-station-planner", className)}
      aria-label="Portable power station off-grid energy balance overview"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — OFF-GRID BALANCE</p>
        <h3 className="tool-viz__title">Will Your Station Last the Trip?</h3>
        <p className="tool-viz__subtitle">
          Watch solar and alternator refill the pack while camping loads drain
          it — then check autonomy days and surge headroom.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg power-station-planner-viz"
          role="img"
          aria-labelledby="psp-viz-title psp-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="psp-viz-title">
            Power station daily energy balance with solar recharge and camping loads
          </title>
          <desc id="psp-viz-desc">
            An animated campsite scene shows a portable power station charged by
            a foldable solar panel while fridge and kettle icons draw energy.
            Sample values: 1000 watt-hour pack, about 850 watt-hours usable, 200
            watt solar, and roughly 2.5 days of autonomy on a sunny day.
          </desc>

          <defs>
            <linearGradient id="psp-sky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0c1520" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>
            <linearGradient id="psp-ground" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#152030" />
              <stop offset="100%" stopColor="#111114" />
            </linearGradient>
            <linearGradient id="psp-battery-fill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id="psp-solar" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="url(#psp-sky)" />
          <rect
            x="12"
            y="12"
            width="936"
            height="536"
            fill="none"
            stroke="#262626"
            strokeWidth="1"
            rx="4"
          />

          <path
            d="M 0 380 Q 200 320 420 360 T 960 340 L 960 560 L 0 560 Z"
            fill="url(#psp-ground)"
            opacity="0.9"
          />
          <path
            d="M 0 440 Q 260 400 520 430 T 960 410 L 960 560 L 0 560 Z"
            fill="#0f0f12"
            opacity="0.85"
          />

          <g>
            <rect
              x="36"
              y="36"
              width="120"
              height="52"
              rx="6"
              fill="#111111"
              stroke="#333333"
            />
            <text
              x="48"
              y="56"
              fill="#888888"
              fontSize="10"
              letterSpacing="0.08em"
            >
              PACK
            </text>
            <text x="48" y="76" fill="#ededed" fontSize="15" fontWeight="700">
              1000 Wh
            </text>

            <rect
              x="168"
              y="36"
              width="120"
              height="52"
              rx="6"
              fill="#111111"
              stroke="#333333"
            />
            <text
              x="180"
              y="56"
              fill="#888888"
              fontSize="10"
              letterSpacing="0.08em"
            >
              SOLAR
            </text>
            <text x="180" y="76" fill="#ededed" fontSize="15" fontWeight="700">
              200 W
            </text>

            <rect
              x="300"
              y="36"
              width="150"
              height="52"
              rx="6"
              fill="#111111"
              stroke="#333333"
            />
            <text
              x="312"
              y="56"
              fill="#888888"
              fontSize="10"
              letterSpacing="0.08em"
            >
              WEATHER
            </text>
            <text x="312" y="76" fill="#ededed" fontSize="15" fontWeight="700">
              Sunny 100%
            </text>
          </g>

          <g transform="translate(760, 36)">
            <rect
              x="0"
              y="0"
              width="164"
              height="72"
              rx="6"
              fill="#111111"
              stroke="#60a5fa"
              strokeOpacity="0.55"
              strokeWidth="1.25"
            />
            <text
              x="14"
              y="22"
              fill="#888888"
              fontSize="10"
              letterSpacing="0.1em"
            >
              BATTERY LEFT
            </text>
            <rect
              x="14"
              y="34"
              width="120"
              height="22"
              rx="4"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect x="134" y="40" width="6" height="10" rx="1" fill="#333333" />
            <rect
              className="psp-viz-battery-fill"
              x="16"
              y="36"
              width="116"
              height="18"
              rx="3"
              fill="url(#psp-battery-fill)"
            />
          </g>

          {/* Sun rays */}
          <g className="psp-viz-sun" transform="translate(720, 140)">
            <circle cx="0" cy="0" r="22" fill="#fbbf24" fillOpacity="0.85" />
            <g
              stroke="#fbbf24"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.7"
            >
              <line x1="0" y1="-34" x2="0" y2="-42" />
              <line x1="24" y1="-24" x2="30" y2="-30" />
              <line x1="34" y1="0" x2="42" y2="0" />
              <line x1="24" y1="24" x2="30" y2="30" />
              <line x1="0" y1="34" x2="0" y2="42" />
            </g>
          </g>

          {/* Solar panel */}
          <g transform="translate(560, 200)">
            <rect
              x="0"
              y="0"
              width="140"
              height="90"
              rx="4"
              fill="#0b1520"
              stroke="#60a5fa"
              strokeOpacity="0.65"
              transform="skewY(-8)"
            />
            <g stroke="#38bdf8" strokeOpacity="0.45" strokeWidth="1">
              <line x1="35" y1="2" x2="35" y2="78" />
              <line x1="70" y1="0" x2="70" y2="72" />
              <line x1="105" y1="-2" x2="105" y2="66" />
              <line x1="8" y1="28" x2="132" y2="18" />
              <line x1="10" y1="52" x2="134" y2="42" />
            </g>
            <rect
              className="psp-viz-solar-pulse"
              x="12"
              y="12"
              width="116"
              height="56"
              rx="2"
              fill="url(#psp-solar)"
              opacity="0.25"
              transform="skewY(-8)"
            />
            <text
              x="70"
              y="108"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
            >
              Portable solar
            </text>
          </g>

          {/* Energy flow line solar → station */}
          <path
            d="M 560 250 C 480 270, 420 300, 360 330"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="2"
            strokeDasharray="8 10"
            strokeOpacity="0.7"
            className="psp-viz-flow-in"
          />

          {/* Power station */}
          <g transform="translate(250, 300)">
            <rect
              x="0"
              y="0"
              width="160"
              height="100"
              rx="8"
              fill="#111111"
              stroke="#60a5fa"
              strokeWidth="1.5"
              strokeOpacity="0.7"
            />
            <rect
              x="14"
              y="14"
              width="72"
              height="28"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text x="22" y="33" fill="#60a5fa" fontSize="12" fontWeight="700">
              850 Wh
            </text>
            <circle cx="120" cy="28" r="8" fill="#0a0a0a" stroke="#4ade80" />
            <circle cx="120" cy="28" r="3" fill="#4ade80" className="psp-viz-led" />
            <rect
              x="20"
              y="58"
              width="28"
              height="18"
              rx="2"
              fill="#1a1a1e"
              stroke="#444"
            />
            <rect
              x="58"
              y="58"
              width="28"
              height="18"
              rx="2"
              fill="#1a1a1e"
              stroke="#444"
            />
            <rect
              x="96"
              y="58"
              width="40"
              height="18"
              rx="2"
              fill="#1a1a1e"
              stroke="#444"
            />
            <text
              x="80"
              y="118"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
            >
              Power station
            </text>
          </g>

          {/* Load icons draining */}
          <g transform="translate(90, 220)">
            <rect
              x="0"
              y="0"
              width="88"
              height="54"
              rx="4"
              fill="#0c1510"
              stroke="#4ade80"
              strokeOpacity="0.5"
            />
            <text
              x="44"
              y="22"
              textAnchor="middle"
              fill="#4ade80"
              fontSize="10"
              fontWeight="600"
            >
              Fridge
            </text>
            <text
              x="44"
              y="40"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontWeight="700"
            >
              50 W
            </text>
          </g>
          <g transform="translate(90, 290)">
            <rect
              x="0"
              y="0"
              width="88"
              height="54"
              rx="4"
              fill="#15100c"
              stroke="#fbbf24"
              strokeOpacity="0.55"
            />
            <text
              x="44"
              y="22"
              textAnchor="middle"
              fill="#fbbf24"
              fontSize="10"
              fontWeight="600"
            >
              Kettle
            </text>
            <text
              x="44"
              y="40"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontWeight="700"
            >
              1200 W
            </text>
          </g>

          <path
            d="M 178 250 C 210 270, 230 300, 250 340"
            fill="none"
            stroke="#f87171"
            strokeWidth="2"
            strokeDasharray="6 8"
            strokeOpacity="0.65"
            className="psp-viz-flow-out"
          />

          <g transform="translate(36, 470)">
            <rect
              x="0"
              y="0"
              width="888"
              height="58"
              rx="6"
              fill="#111111"
              stroke="#60a5fa"
              strokeOpacity="0.4"
            />
            <text
              x="20"
              y="24"
              fill="#888888"
              fontSize="11"
              letterSpacing="0.1em"
            >
              SAMPLE AUTONOMY (SUNNY + 200 W SOLAR)
            </text>
            <text
              className="psp-viz-range-value"
              x="20"
              y="46"
              fill="#ededed"
              fontSize="22"
              fontWeight="700"
            >
              ~2.5 days off-grid · watch kettle surge vs inverter
            </text>
            <text x="868" y="36" textAnchor="end" fill="#888888" fontSize="12">
              Cut loads or add panels → stay longer
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
