"use client";

import { cn } from "@/lib/utils";

interface V2gFinancialReturnVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for V2G Grid Buyback Revenue [VIZ].
 * Revenue = kWh/session × buyback $/kWh × sessions/mo.
 * Sample: 15 kWh · $0.25 · 12 sessions → $45/mo · $540/yr.
 */
export function V2gFinancialReturnViz({
  className,
}: V2gFinancialReturnVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--v2g-financial-return", className)}
      aria-label="V2G grid buyback revenue visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">V2G Grid Buyback Revenue</h3>
        <p className="tool-viz__subtitle">
          Discharge EV battery reserves into the grid at the utility buyback
          rate — session energy times tariff times monthly frequency sets
          recurring export revenue.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg v2g-financial-return-viz"
          role="img"
          aria-labelledby="v2g-viz-title v2g-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="v2g-viz-title">
            V2G grid buyback revenue animated flow diagram
          </title>
          <desc id="v2g-viz-desc">
            Kilowatt-hours exported per session multiplied by the utility
            buyback rate and sessions per month yields monthly revenue. Sample:
            15 kilowatt-hours at 25 cents per kilowatt-hour across 12 sessions
            earns 45 dollars per month, or about 540 dollars per year.
          </desc>

          <defs>
            <pattern
              id="v2g-viz-grid"
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
              id="v2g-viz-arrow"
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
              id="v2g-viz-pulse"
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
              id="v2g-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="v2g-viz-batt"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.85" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#v2g-viz-grid)"
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
            EV → GRID BUYBACK PATH
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

          {/* —— INPUT: kWh/session —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="100"
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
              KWH / SESSION
            </text>
            <text
              className="v2g-viz-kwh-value"
              x="56"
              y="138"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              15 kWh
            </text>
            <text
              x="56"
              y="160"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              exported per discharge
            </text>
          </g>

          {/* —— INPUT: Buyback rate —— */}
          <g>
            <rect
              x="40"
              y="188"
              width="230"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="214"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BUYBACK RATE
            </text>
            <text
              className="v2g-viz-rate-value"
              x="56"
              y="254"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.25
            </text>
            <text
              x="56"
              y="276"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              $/kWh · utility credit
            </text>
          </g>

          {/* —— INPUT: Sessions —— */}
          <g>
            <rect
              x="40"
              y="304"
              width="230"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="330"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SESSIONS / MONTH
            </text>
            <text
              className="v2g-viz-sessions-value"
              x="56"
              y="370"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              12×
            </text>
            <text
              x="56"
              y="392"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              peak-hour export events
            </text>
          </g>

          {/* —— Flow inputs → mid —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 122 L 320 122"
            fill="none"
            stroke="url(#v2g-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#v2g-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 238 L 320 238"
            fill="none"
            stroke="url(#v2g-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#v2g-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 354 L 320 354"
            fill="none"
            stroke="url(#v2g-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#v2g-viz-arrow)"
          />

          {/* —— CENTER: Bidirectional EV ↔ Grid —— */}
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
              BIDIRECTIONAL EXPORT
            </text>

            {/* EV glyph */}
            <g transform="translate(360, 140)">
              <rect
                className="v2g-viz-ev"
                x="0"
                y="20"
                width="90"
                height="40"
                rx="6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="22" cy="66" r="10" fill="none" stroke="#333333" strokeWidth="1.5" />
              <circle cx="68" cy="66" r="10" fill="none" stroke="#333333" strokeWidth="1.5" />
              <rect
                x="12"
                y="28"
                width="28"
                height="16"
                rx="2"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <rect
                className="v2g-viz-batt-fill"
                x="14"
                y="30"
                width="18"
                height="12"
                rx="1"
                fill="url(#v2g-viz-batt)"
              />
              <text
                x="45"
                y="12"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                EV PACK
              </text>
            </g>

            {/* Bidirectional energy path */}
            <path
              className="v2g-viz-export-path"
              d="M 460 170 L 560 170"
              fill="none"
              stroke="url(#v2g-viz-pulse)"
              strokeWidth="2.5"
              markerEnd="url(#v2g-viz-arrow)"
            />
            <path
              className="v2g-viz-return-path"
              d="M 560 190 L 460 190"
              fill="none"
              stroke="#444444"
              strokeWidth="1.25"
              strokeDasharray="4 5"
              markerEnd="url(#v2g-viz-arrow)"
            />
            <text
              x="510"
              y="158"
              textAnchor="middle"
              fill="#ededed"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="v2g-viz-flow-label"
            >
              EXPORT
            </text>
            <text
              x="510"
              y="212"
              textAnchor="middle"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              CHARGE
            </text>

            {/* Traveling energy packet EV → grid */}
            <circle
              className="v2g-viz-energy-packet"
              cx="0"
              cy="0"
              r="6"
              fill="currentColor"
            />

            {/* Grid tower glyph */}
            <g transform="translate(575, 130)">
              <line
                className="v2g-viz-grid-tower"
                x1="30"
                y1="10"
                x2="30"
                y2="70"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M 10 30 L 30 10 L 50 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line x1="18" y1="45" x2="42" y2="45" stroke="currentColor" strokeWidth="1.25" />
              <line x1="14" y1="58" x2="46" y2="58" stroke="currentColor" strokeWidth="1.25" />
              <circle
                className="v2g-viz-grid-dot"
                cx="30"
                cy="10"
                r="4"
                fill="currentColor"
              />
              <text
                x="30"
                y="90"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                GRID
              </text>
            </g>

            {/* Math */}
            <text
              x="340"
              y="280"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              SESSION × RATE × COUNT
            </text>
            <text
              className="v2g-viz-math-value"
              x="340"
              y="310"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              15 × $0.25 × 12
            </text>
            <rect
              x="340"
              y="330"
              width="280"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="v2g-viz-scale-bar"
              x="342"
              y="332"
              width="200"
              height="8"
              rx="1"
              fill="url(#v2g-viz-bar)"
            />
            <text
              x="340"
              y="368"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              $3.75 / session · peak export
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 238 L 700 238"
            fill="none"
            stroke="url(#v2g-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#v2g-viz-arrow)"
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
              MONTHLY REVENUE
            </text>
            <text
              className="v2g-viz-output-value"
              x="720"
              y="160"
              fill="#ededed"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $45.00
            </text>
            <text
              x="720"
              y="188"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              /mo grid buyback
            </text>

            <rect
              x="720"
              y="210"
              width="180"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="v2g-viz-output-bar"
              x="722"
              y="212"
              width="140"
              height="8"
              rx="1"
              fill="url(#v2g-viz-bar)"
            />

            <text
              x="720"
              y="256"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ANNUAL
            </text>
            <text
              className="v2g-viz-annual-value"
              x="720"
              y="286"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $540/yr
            </text>
            <text
              x="720"
              y="316"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              180 kWh exported / mo
            </text>
            <text
              x="720"
              y="348"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              battery wear not modeled
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
              kWh × $/kWh × sessions → monthly $ revenue
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
              15 kWh · $0.25 · 12× → $45/mo
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
