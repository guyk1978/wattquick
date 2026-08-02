"use client";

import { cn } from "@/lib/utils";

interface SolarBackupCalculatorVizProps {
  className?: string;
}

/**
 * Friendly home backup energy viz for Solar Backup Calculator [VIZ].
 * Battery drains during blackout while solar can refill; surge and eco cues.
 * Sample: 10 kWh · 8 kW inverter · essentials ≈ 12+ hrs eco backup.
 */
export function SolarBackupCalculatorViz({
  className,
}: SolarBackupCalculatorVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--solar-backup-calculator", className)}
      aria-label="Home solar backup and UPS runtime overview"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — BLACKOUT BACKUP</p>
        <h3 className="tool-viz__title">Will Your Home Stay Powered?</h3>
        <p className="tool-viz__subtitle">
          Watch the battery carry essential loads through an outage — then see
          how solar and eco circuits stretch runtime.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg solar-backup-calculator-viz"
          role="img"
          aria-labelledby="sbc-viz-title sbc-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="sbc-viz-title">
            Home solar backup runtime with battery, inverter, and essential loads
          </title>
          <desc id="sbc-viz-desc">
            An animated home backup scene shows a lithium storage battery
            powering fridge and router loads during a blackout while rooftop
            solar can recharge. Sample values: 10 kilowatt-hour pack, about 9
            kilowatt-hours usable, and roughly 12 hours of essential backup.
          </desc>

          <defs>
            <linearGradient id="sbc-sky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a0c10" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>
            <linearGradient id="sbc-ground" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#301518" />
              <stop offset="100%" stopColor="#111114" />
            </linearGradient>
            <linearGradient id="sbc-battery-fill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f87171" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id="sbc-solar" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f87171" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="url(#sbc-sky)" />
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
            d="M 0 400 Q 240 340 480 380 T 960 360 L 960 560 L 0 560 Z"
            fill="url(#sbc-ground)"
            opacity="0.9"
          />
          <path
            d="M 0 460 Q 280 420 560 450 T 960 430 L 960 560 L 0 560 Z"
            fill="#0f0f12"
            opacity="0.85"
          />

          <g>
            <rect x="36" y="36" width="120" height="52" rx="6" fill="#111111" stroke="#333333" />
            <text x="48" y="56" fill="#888888" fontSize="10" letterSpacing="0.08em">PACK</text>
            <text x="48" y="76" fill="#ededed" fontSize="15" fontWeight="700">10 kWh</text>

            <rect x="168" y="36" width="120" height="52" rx="6" fill="#111111" stroke="#333333" />
            <text x="180" y="56" fill="#888888" fontSize="10" letterSpacing="0.08em">INVERTER</text>
            <text x="180" y="76" fill="#ededed" fontSize="15" fontWeight="700">8 kW</text>

            <rect x="300" y="36" width="140" height="52" rx="6" fill="#111111" stroke="#333333" />
            <text x="312" y="56" fill="#888888" fontSize="10" letterSpacing="0.08em">SOLAR</text>
            <text x="312" y="76" fill="#ededed" fontSize="15" fontWeight="700">6 kW array</text>
          </g>

          <g transform="translate(760, 36)">
            <rect
              x="0"
              y="0"
              width="164"
              height="72"
              rx="6"
              fill="#111111"
              stroke="#f87171"
              strokeOpacity="0.55"
              strokeWidth="1.25"
            />
            <text x="14" y="22" fill="#888888" fontSize="10" letterSpacing="0.1em">
              BATTERY LEFT
            </text>
            <rect x="14" y="34" width="120" height="22" rx="4" fill="#0a0a0a" stroke="#333333" />
            <rect x="134" y="40" width="6" height="10" rx="1" fill="#333333" />
            <rect
              className="sbc-viz-battery-fill"
              x="16"
              y="36"
              width="116"
              height="18"
              rx="3"
              fill="url(#sbc-battery-fill)"
            />
          </g>

          {/* House silhouette */}
          <g transform="translate(520, 160)">
            <path
              d="M 40 90 L 140 20 L 240 90 V 200 H 40 Z"
              fill="#111111"
              stroke="#f87171"
              strokeOpacity="0.55"
              strokeWidth="1.5"
            />
            <rect x="100" y="120" width="40" height="50" rx="2" fill="#1a1012" stroke="#444" />
            <rect x="160" y="110" width="36" height="28" rx="2" fill="#1a1012" stroke="#444" />
            <rect
              className="sbc-viz-solar-pulse"
              x="90"
              y="45"
              width="100"
              height="28"
              rx="2"
              fill="url(#sbc-solar)"
              opacity="0.45"
              transform="rotate(-18 140 59)"
            />
            <text x="140" y="220" textAnchor="middle" fill="#888888" fontSize="11">
              Home + rooftop solar
            </text>
          </g>

          {/* Wall battery */}
          <g transform="translate(220, 280)">
            <rect
              x="0"
              y="0"
              width="120"
              height="140"
              rx="8"
              fill="#111111"
              stroke="#f87171"
              strokeWidth="1.5"
              strokeOpacity="0.7"
            />
            <rect x="16" y="18" width="88" height="36" rx="3" fill="#0a0a0a" stroke="#333" />
            <text x="28" y="42" fill="#f87171" fontSize="14" fontWeight="700">
              9.0 kWh
            </text>
            <rect x="28" y="70" width="64" height="10" rx="2" fill="#1a1a1e" stroke="#444" />
            <rect
              className="sbc-viz-battery-fill"
              x="30"
              y="72"
              width="60"
              height="6"
              rx="1"
              fill="#f87171"
            />
            <circle cx="60" cy="110" r="10" fill="#0a0a0a" stroke="#4ade80" />
            <circle className="sbc-viz-led" cx="60" cy="110" r="4" fill="#4ade80" />
            <text x="60" y="160" textAnchor="middle" fill="#888888" fontSize="11">
              Lithium storage
            </text>
          </g>

          <path
            d="M 340 340 C 400 320, 460 280, 560 240"
            fill="none"
            stroke="#fb923c"
            strokeWidth="2"
            strokeDasharray="8 10"
            strokeOpacity="0.65"
            className="sbc-viz-flow-in"
          />

          {/* Load cards */}
          <g transform="translate(60, 200)">
            <rect x="0" y="0" width="100" height="54" rx="4" fill="#0c1510" stroke="#4ade80" strokeOpacity="0.5" />
            <text x="50" y="22" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="600">Fridge</text>
            <text x="50" y="40" textAnchor="middle" fill="#ededed" fontSize="12" fontWeight="700">150 W</text>
          </g>
          <g transform="translate(60, 270)">
            <rect x="0" y="0" width="100" height="54" rx="4" fill="#0c1510" stroke="#4ade80" strokeOpacity="0.5" />
            <text x="50" y="22" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="600">Router</text>
            <text x="50" y="40" textAnchor="middle" fill="#ededed" fontSize="12" fontWeight="700">15 W</text>
          </g>
          <g transform="translate(60, 340)">
            <rect x="0" y="0" width="100" height="54" rx="4" fill="#15100c" stroke="#fbbf24" strokeOpacity="0.55" />
            <text x="50" y="22" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="600">A/C surge</text>
            <text x="50" y="40" textAnchor="middle" fill="#ededed" fontSize="12" fontWeight="700">1500 W</text>
          </g>

          <path
            d="M 160 250 C 185 270, 200 300, 220 330"
            fill="none"
            stroke="#f87171"
            strokeWidth="2"
            strokeDasharray="6 8"
            strokeOpacity="0.65"
            className="sbc-viz-flow-out"
          />

          <g transform="translate(36, 470)">
            <rect
              x="0"
              y="0"
              width="888"
              height="58"
              rx="6"
              fill="#111111"
              stroke="#f87171"
              strokeOpacity="0.4"
            />
            <text x="20" y="24" fill="#888888" fontSize="11" letterSpacing="0.1em">
              SAMPLE ESSENTIAL BACKUP (10 KWH · ECO CIRCUITS)
            </text>
            <text
              className="sbc-viz-range-value"
              x="20"
              y="46"
              fill="#ededed"
              fontSize="22"
              fontWeight="700"
            >
              ~12 hrs eco runtime · watch A/C compressor surge
            </text>
            <text x="868" y="36" textAnchor="end" fill="#888888" fontSize="12">
              Shed non-essentials → last longer
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
