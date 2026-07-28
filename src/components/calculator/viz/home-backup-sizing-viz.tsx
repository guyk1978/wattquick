"use client";

import { cn } from "@/lib/utils";

interface HomeBackupSizingVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Home Backup Battery Sizing [VIZ].
 * Wh needed = (W × hrs) ÷ η; bank Wh = Wh ÷ (DoD/100); Ah = bank Wh ÷ V.
 * Sample: 600 W · 10 h · 48 V · 80% DoD · 92% η → 6,522 Wh · 8,152 Wh · 170 Ah.
 */
export function HomeBackupSizingViz({ className }: HomeBackupSizingVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--home-backup-sizing", className)}
      aria-label="Home backup battery sizing visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Backup Load → Bank Size</h3>
        <p className="tool-viz__subtitle">
          Essential watts times hours become energy demand; inverter loss and
          DoD inflate that into the minimum Ah / kWh bank you need.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg home-backup-sizing-viz"
          role="img"
          aria-labelledby="hbs-viz-title hbs-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="hbs-viz-title">
            Home backup battery sizing animated capacity diagram
          </title>
          <desc id="hbs-viz-desc">
            Essential load watts times backup hours divided by inverter
            efficiency yields watt-hours needed; dividing by depth of discharge
            and system voltage sizes the battery bank. Sample: 600 watts for 10
            hours at 48 volts, 80 percent DoD, and 92 percent inverter
            efficiency requires about 6,522 watt-hours delivered, an 8,152
            watt-hour bank, or 170 amp-hours.
          </desc>

          <defs>
            <pattern
              id="hbs-viz-grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="#262626"
                strokeWidth="0.75"
              />
            </pattern>
            <marker
              id="hbs-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
            </marker>
            <linearGradient
              id="hbs-viz-pulse"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="hbs-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="hbs-viz-fill"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#hbs-viz-grid)"
            opacity="0.55"
          />
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

          {/* —— INPUTS —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="220"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="64"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ESSENTIAL LOAD
            </text>
            <text
              className="hbs-viz-load-value"
              x="56"
              y="102"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              600 W
            </text>

            <rect
              x="40"
              y="140"
              width="220"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="164"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BACKUP TIME
            </text>
            <text
              className="hbs-viz-hrs-value"
              x="56"
              y="196"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10 hrs
            </text>

            <rect
              x="40"
              y="224"
              width="220"
              height="136"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="248"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SYSTEM · DoD · η
            </text>
            <text
              className="hbs-viz-sys-value"
              x="56"
              y="284"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              48 V
            </text>
            <text
              className="hbs-viz-dod-value"
              x="56"
              y="314"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              80% DoD · 92% η
            </text>
            <text
              x="56"
              y="340"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              fridge · lights · internet
            </text>
          </g>

          {/* Flow → accumulation */}
          <path
            d="M 260 90 L 310 90"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#hbs-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 90 L 310 90"
            fill="none"
            stroke="url(#hbs-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 176 L 290 176 L 290 140 L 310 140"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#hbs-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 176 L 290 176 L 290 140 L 310 140"
            fill="none"
            stroke="url(#hbs-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 290 L 290 290 L 290 220 L 310 220"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#hbs-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 290 L 290 290 L 290 220 L 310 220"
            fill="none"
            stroke="url(#hbs-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Capacity stack —— */}
          <g>
            <rect
              x="320"
              y="40"
              width="340"
              height="320"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="336"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              POWER → CAPACITY PATH
            </text>

            {/* Step bars */}
            <text
              x="336"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              1 · LOAD ENERGY
            </text>
            <rect
              x="336"
              y="108"
              width="308"
              height="16"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="hbs-viz-step1-bar"
              x="336"
              y="108"
              width="180"
              height="16"
              rx="2"
              fill="url(#hbs-viz-bar)"
            />
            <text
              className="hbs-viz-step1-chip"
              x="348"
              y="120"
              fill="#0a0a0a"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              600 × 10 = 6,000 Wh
            </text>

            <text
              x="336"
              y="152"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              2 · ÷ INVERTER η
            </text>
            <rect
              x="336"
              y="162"
              width="308"
              height="16"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="hbs-viz-step2-bar"
              x="336"
              y="162"
              width="196"
              height="16"
              rx="2"
              fill="url(#hbs-viz-bar)"
            />
            <text
              className="hbs-viz-step2-chip"
              x="348"
              y="174"
              fill="#0a0a0a"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              6,000 ÷ 0.92 = 6,522 Wh
            </text>

            <text
              x="336"
              y="206"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              3 · ÷ DoD → BANK Wh
            </text>
            <rect
              x="336"
              y="216"
              width="308"
              height="16"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="hbs-viz-step3-bar"
              x="336"
              y="216"
              width="244"
              height="16"
              rx="2"
              fill="url(#hbs-viz-bar)"
            />
            <text
              className="hbs-viz-step3-chip"
              x="348"
              y="228"
              fill="#0a0a0a"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              6,522 ÷ 0.80 = 8,152 Wh
            </text>

            {/* Battery bank icon */}
            <rect
              className="hbs-viz-pack"
              x="400"
              y="256"
              width="180"
              height="72"
              rx="5"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="2"
            />
            <rect
              x="470"
              y="248"
              width="40"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#444444"
            />
            <rect
              className="hbs-viz-pack-fill"
              x="412"
              y="268"
              width="156"
              height="48"
              rx="3"
              fill="url(#hbs-viz-fill)"
            />
            <text
              className="hbs-viz-math-value"
              x="490"
              y="298"
              textAnchor="middle"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              8.2 kWh bank
            </text>
            <text
              x="490"
              y="348"
              textAnchor="middle"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              Ah = bank Wh ÷ 48 V
            </text>
          </g>

          {/* Flow → outputs */}
          <path
            d="M 660 160 L 700 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#hbs-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 160 L 700 160"
            fill="none"
            stroke="url(#hbs-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 660 280 L 680 280 L 680 290 L 700 290"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#hbs-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 660 280 L 680 280 L 680 290 L 700 290"
            fill="none"
            stroke="url(#hbs-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Ah —— */}
          <g>
            <rect
              x="710"
              y="40"
              width="210"
              height="180"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MINIMUM BANK
            </text>
            <text
              className="hbs-viz-output-value"
              x="726"
              y="120"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              170 Ah
            </text>
            <text
              x="726"
              y="148"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              at 48 V bus
            </text>
            <rect
              x="726"
              y="168"
              width="162"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="hbs-viz-ah-bar"
              x="726"
              y="168"
              width="130"
              height="12"
              rx="2"
              fill="url(#hbs-viz-bar)"
            />
            <text
              className="hbs-viz-detail-value"
              x="726"
              y="202"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              8,152 Wh nameplate
            </text>
          </g>

          {/* —— OUTPUT: Recommended —— */}
          <g>
            <rect
              x="710"
              y="236"
              width="210"
              height="124"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="262"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              LOAD ENERGY
            </text>
            <text
              className="hbs-viz-wh-out"
              x="726"
              y="304"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              6,522 Wh
            </text>
            <rect
              x="726"
              y="324"
              width="162"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="hbs-viz-wh-bar"
              x="726"
              y="324"
              width="104"
              height="10"
              rx="2"
              fill="url(#hbs-viz-bar)"
            />
            <text
              x="726"
              y="348"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              incl. inverter loss
            </text>
          </g>

          {/* —— Footer —— */}
          <g>
            <rect
              x="40"
              y="388"
              width="880"
              height="132"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="416"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MORE HOURS OR WATTS · LARGER BANK · ADD 10–20% AGING MARGIN
            </text>

            <text
              x="56"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              0 kWh
            </text>
            <rect
              x="120"
              y="442"
              width="520"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="hbs-viz-kwh-bar"
              x="120"
              y="442"
              width="340"
              height="14"
              rx="2"
              fill="url(#hbs-viz-bar)"
            />
            <text
              x="420"
              y="452"
              fill="#0a0a0a"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              8.2 kWh
            </text>
            <text
              x="652"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              12.5 kWh
            </text>

            <path
              className="hbs-viz-timeline-pulse"
              d="M 56 490 L 880 490"
              fill="none"
              stroke="url(#hbs-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text
              x="56"
              y="514"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              essential circuits only · not whole-house
            </text>
            <text
              className="hbs-viz-detail-value"
              x="880"
              y="514"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              170 Ah · 8,152 Wh · 6,522 Wh load
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
