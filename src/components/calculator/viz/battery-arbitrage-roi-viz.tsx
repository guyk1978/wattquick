"use client";

import { cn } from "@/lib/utils";

interface BatteryArbitrageRoiVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Home Battery Arbitrage ROI [VIZ].
 * Daily $ = kWh × RTE × (peak − night) × cycles.
 * Sample: 10 kWh · 90% · $0.09→$0.38 · 1 cycle → $2.61/day · $78/mo · $953/yr.
 */
export function BatteryArbitrageRoiViz({
  className,
}: BatteryArbitrageRoiVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--battery-arbitrage-roi", className)}
      aria-label="Home battery arbitrage ROI visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Home Battery Arbitrage ROI</h3>
        <p className="tool-viz__subtitle">
          Charge the pack on cheap night rates, then discharge into peak
          pricing — round-trip efficiency and cycle count turn the tariff
          spread into daily profit.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg battery-arbitrage-roi-viz"
          role="img"
          aria-labelledby="bar-viz-title bar-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="bar-viz-title">
            Home battery arbitrage ROI animated flow diagram
          </title>
          <desc id="bar-viz-desc">
            Usable battery kilowatt-hours times round-trip efficiency times the
            peak-minus-night rate spread times cycles per day yields daily
            profit. Sample: a 10 kilowatt-hour pack at 90 percent efficiency
            charging at 9 cents and discharging at 38 cents once per day earns
            2 dollars and 61 cents per day, about 78 dollars per month or 953
            dollars per year.
          </desc>

          <defs>
            <pattern
              id="bar-viz-grid"
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
              id="bar-viz-arrow"
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
              id="bar-viz-pulse"
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
              id="bar-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="bar-viz-soc"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#bar-viz-grid)"
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
            rx="2"
          />

          <text
            x="48"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            INPUTS
          </text>
          <text
            x="340"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            CHARGE → DISCHARGE PATH
          </text>
          <text
            x="700"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            OUTPUT
          </text>

          {/* —— INPUT: Usable battery —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="95"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="96"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              USABLE BATTERY
            </text>
            <text
              className="bar-viz-kwh-value"
              x="56"
              y="132"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10 kWh
            </text>
            <text
              x="56"
              y="154"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              storage capacity
            </text>
          </g>

          {/* —— INPUT: RTE —— */}
          <g>
            <rect
              x="40"
              y="181"
              width="230"
              height="95"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="205"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ROUND-TRIP EFF.
            </text>
            <text
              className="bar-viz-rte-value"
              x="56"
              y="241"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              90%
            </text>
            <text
              x="56"
              y="263"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              charge → discharge losses
            </text>
          </g>

          {/* —— INPUT: Rates + cycles —— */}
          <g>
            <rect
              x="40"
              y="290"
              width="230"
              height="114"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="314"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              TARIFF · CYCLES
            </text>
            <text
              className="bar-viz-rates-value"
              x="56"
              y="346"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.09 → $0.38
            </text>
            <text
              className="bar-viz-cycles-value"
              x="56"
              y="372"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1 cycle / day
            </text>
            <text
              x="56"
              y="392"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              night buy · peak sell
            </text>
          </g>

          {/* —— Flow inputs → mid —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 120 L 320 120"
            fill="none"
            stroke="url(#bar-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#bar-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 228 L 320 228"
            fill="none"
            stroke="url(#bar-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#bar-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 347 L 320 347"
            fill="none"
            stroke="url(#bar-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#bar-viz-arrow)"
          />

          {/* —— CENTER: Charge / discharge cycle —— */}
          <g>
            <rect
              x="320"
              y="72"
              width="340"
              height="332"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="340"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              OFF-PEAK CHARGE → PEAK DISCHARGE
            </text>

            {/* Night rate node */}
            <g transform="translate(350, 130)">
              <rect
                x="0"
                y="0"
                width="70"
                height="56"
                rx="3"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <text
                x="35"
                y="22"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                NIGHT
              </text>
              <text
                className="bar-viz-night-value"
                x="35"
                y="42"
                textAnchor="middle"
                fill="#ededed"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                $0.09
              </text>
            </g>

            {/* Charge path into battery */}
            <path
              className="bar-viz-charge-path"
              d="M 430 158 L 470 158"
              fill="none"
              stroke="url(#bar-viz-pulse)"
              strokeWidth="2"
              markerEnd="url(#bar-viz-arrow)"
            />

            {/* Battery pack with SOC fill */}
            <g transform="translate(485, 120)">
              <rect
                className="bar-viz-pack"
                x="0"
                y="8"
                width="70"
                height="90"
                rx="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="26"
                y="0"
                width="18"
                height="8"
                rx="1"
                fill="currentColor"
                opacity="0.7"
              />
              <rect
                className="bar-viz-soc-fill"
                x="6"
                y="28"
                width="58"
                height="62"
                rx="2"
                fill="url(#bar-viz-soc)"
              />
              <text
                x="35"
                y="120"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                PACK
              </text>
            </g>

            {/* Discharge path to peak */}
            <path
              className="bar-viz-discharge-path"
              d="M 565 158 L 605 158"
              fill="none"
              stroke="url(#bar-viz-pulse)"
              strokeWidth="2"
              markerEnd="url(#bar-viz-arrow)"
            />

            {/* Peak rate node */}
            <g transform="translate(615, 130)">
              <rect
                x="0"
                y="0"
                width="70"
                height="56"
                rx="3"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <text
                x="35"
                y="22"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                PEAK
              </text>
              <text
                className="bar-viz-peak-value"
                x="35"
                y="42"
                textAnchor="middle"
                fill="#ededed"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                $0.38
              </text>
            </g>

            {/* Energy packet traveling night → pack → peak */}
            <circle
              className="bar-viz-energy-packet"
              cx="0"
              cy="0"
              r="6"
              fill="currentColor"
            />

            {/* Math */}
            <text
              x="340"
              y="260"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              SPREAD × RTE × CAPACITY
            </text>
            <text
              className="bar-viz-math-value"
              x="340"
              y="290"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10 × 0.90 × $0.29 × 1
            </text>
            <text
              x="340"
              y="316"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              $0.38 − $0.09 = $0.29 / kWh spread
            </text>
            <rect
              x="340"
              y="334"
              width="280"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="bar-viz-scale-bar"
              x="342"
              y="336"
              width="210"
              height="8"
              rx="1"
              fill="url(#bar-viz-bar)"
            />
            <text
              x="340"
              y="372"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              9 kWh delivered after 10% RTE loss
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 238 L 700 238"
            fill="none"
            stroke="url(#bar-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#bar-viz-arrow)"
          />

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="700"
              y="72"
              width="220"
              height="332"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="720"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              DAILY PROFIT
            </text>
            <text
              className="bar-viz-output-value"
              x="720"
              y="155"
              fill="#ededed"
              fontSize="34"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $2.61
            </text>
            <text
              x="720"
              y="182"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              /day arbitrage
            </text>

            <rect
              x="720"
              y="202"
              width="180"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="bar-viz-output-bar"
              x="722"
              y="204"
              width="145"
              height="8"
              rx="1"
              fill="url(#bar-viz-bar)"
            />

            <text
              x="720"
              y="246"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MONTHLY
            </text>
            <text
              className="bar-viz-month-value"
              x="720"
              y="274"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $78/mo
            </text>
            <text
              x="720"
              y="304"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ANNUAL ROI
            </text>
            <text
              className="bar-viz-year-value"
              x="720"
              y="332"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $953/yr
            </text>
            <text
              x="720"
              y="362"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              tariff spread only
            </text>
          </g>

          {/* —— Legend —— */}
          <g transform="translate(40, 448)">
            <rect
              x="0"
              y="0"
              width="880"
              height="80"
              rx="4"
              fill="#0f0f0f"
              stroke="#262626"
              strokeWidth="1"
            />
            <text
              x="20"
              y="28"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PATH
            </text>
            <text
              x="20"
              y="52"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              kWh × RTE × (peak − night) × cycles → daily $
            </text>
            <text
              x="520"
              y="28"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SAMPLE
            </text>
            <text
              x="520"
              y="52"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              10 kWh · 90% · $0.29 spread → $2.61/day
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
