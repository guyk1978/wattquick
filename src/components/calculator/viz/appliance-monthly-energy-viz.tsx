"use client";

import { cn } from "@/lib/utils";

interface ApplianceMonthlyEnergyVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Appliance Monthly Energy [VIZ] tab.
 * Monthly kWh = (W × hrs/day × 30) ÷ 1000.
 * Sample: 200 W · 5 hrs · 30 days → 30 kWh/mo.
 */
export function ApplianceMonthlyEnergyViz({
  className,
}: ApplianceMonthlyEnergyVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--appliance-monthly-energy", className)}
      aria-label="Appliance monthly energy visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Appliance Monthly Energy</h3>
        <p className="tool-viz__subtitle">
          Daily watt-hours accumulate across a 30-day billing cycle to show how
          much energy each appliance adds to the month.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg appliance-monthly-energy-viz"
          role="img"
          aria-labelledby="ame-viz-title ame-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ame-viz-title">
            Appliance monthly energy animated flow diagram
          </title>
          <desc id="ame-viz-desc">
            Appliance power in watts multiplied by hours per day and thirty days
            yields monthly kilowatt-hours. Sample: a 200 watt television running
            5 hours per day uses 30 kilowatt-hours per month.
          </desc>

          <defs>
            <pattern
              id="ame-viz-grid"
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
              id="ame-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#a3e635" />
            </marker>
            <linearGradient
              id="ame-viz-pulse"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0" />
              <stop offset="50%" stopColor="#a3e635" stopOpacity="1" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="ame-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#ame-viz-grid)"
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
            x="350"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            30-DAY ACCUMULATION
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

          {/* —— INPUT: Watts —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="160"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              POWER DRAW
            </text>
            <text
              x="56"
              y="148"
              fill="#a3e635"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              200 W
            </text>
            <text
              x="56"
              y="184"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              TV / set-top load
            </text>
            <g className="ame-viz-appliance" transform="translate(180, 120)">
              <rect
                x="0"
                y="0"
                width="52"
                height="36"
                rx="2"
                fill="none"
                stroke="#a3e635"
                strokeWidth="1.5"
              />
              <line
                x1="10"
                y1="42"
                x2="42"
                y2="42"
                stroke="#555555"
                strokeWidth="1.5"
              />
              <line
                x1="26"
                y1="36"
                x2="26"
                y2="42"
                stroke="#555555"
                strokeWidth="1.5"
              />
            </g>
          </g>

          {/* —— INPUT: Hours —— */}
          <g>
            <rect
              x="40"
              y="250"
              width="230"
              height="178"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="276"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              HOURS / DAY
            </text>
            <text
              x="56"
              y="324"
              fill="#a3e635"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              5.0 hrs
            </text>
            <text
              x="56"
              y="360"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              evening schedule
            </text>
            <text
              x="56"
              y="396"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              × 30-day cycle
            </text>
          </g>

          {/* —— Flow: inputs → mid —— */}
          <path
            d="M 270 152 L 320 152"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#ame-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 152 L 320 152"
            fill="none"
            stroke="url(#ame-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 339 L 300 339 L 300 210 L 320 210"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#ame-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 339 L 300 339 L 300 210 L 320 210"
            fill="none"
            stroke="url(#ame-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Daily Wh —— */}
          <g>
            <rect
              x="330"
              y="72"
              width="300"
              height="150"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              DAILY ENERGY
            </text>
            <text
              x="346"
              y="124"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              W × hrs ÷ 1000
            </text>
            <text
              x="346"
              y="164"
              fill="#a3e635"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="ame-viz-daily-value"
            >
              1.0 kWh/day
            </text>
            <text
              x="346"
              y="196"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              200 × 5 ÷ 1000
            </text>
          </g>

          {/* —— FLOW: 30-day stack —— */}
          <g>
            <rect
              x="330"
              y="240"
              width="300"
              height="188"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="266"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MONTHLY STACK
            </text>
            <text
              x="346"
              y="296"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              daily kWh × 30
            </text>

            {/* Calendar / day ticks */}
            <g transform="translate(360, 320)">
              {Array.from({ length: 10 }).map((_, i) => (
                <rect
                  key={i}
                  className="ame-viz-day-tick"
                  x={i * 18}
                  y={0}
                  width="12"
                  height="28"
                  rx="1"
                  fill={i < 7 ? "#a3e635" : "#333333"}
                  opacity={i < 7 ? 0.35 + i * 0.08 : 0.5}
                />
              ))}
              <text
                x="0"
                y="52"
                fill="#888888"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                days accumulate →
              </text>
            </g>

            <rect
              x="346"
              y="392"
              width="240"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="ame-viz-accum-bar"
              x="348"
              y="394"
              width="200"
              height="8"
              rx="1"
              fill="url(#ame-viz-bar)"
            />
          </g>

          {/* —— Flow mid → output —— */}
          <path
            d="M 630 147 L 680 147"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#ame-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 147 L 680 147"
            fill="none"
            stroke="url(#ame-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 630 334 L 655 334 L 655 230 L 680 230"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#ame-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 334 L 655 334 L 655 230 L 680 230"
            fill="none"
            stroke="url(#ame-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="690"
              y="72"
              width="230"
              height="356"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="706"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MONTHLY ENERGY
            </text>
            <text
              x="706"
              y="168"
              fill="#a3e635"
              fontSize="48"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="ame-viz-output-value"
            >
              30
            </text>
            <text
              x="706"
              y="204"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
            >
              kWh/mo
            </text>

            <rect
              x="706"
              y="228"
              width="198"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="ame-viz-month-bar"
              x="708"
              y="230"
              width="160"
              height="8"
              rx="1"
              fill="url(#ame-viz-bar)"
            />

            <text
              x="706"
              y="280"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BREAKDOWN
            </text>
            <text
              x="706"
              y="312"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              1.0 kWh × 30 days
            </text>
            <text
              x="706"
              y="344"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              200 W × 5 h × 30
            </text>
            <text
              x="706"
              y="368"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              ÷ 1000 = 30.0
            </text>
            <text
              x="706"
              y="404"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              billable month factor
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
              (W × hrs × 30) ÷ 1000 → kWh/mo
            </text>
            <text
              x="480"
              y="28"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SAMPLE
            </text>
            <text
              x="480"
              y="52"
              fill="#a3e635"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              200 W · 5 h/day · 30 d → 30 kWh/mo
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
