"use client";

import { cn } from "@/lib/utils";

interface EbikeWeightPerformanceVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for E-Bike Weight vs Performance [VIZ].
 * Wh/km scales with mass^1.15 × terrain; range = Wh ÷ Wh/km.
 * Sample: 500 Wh · 95 kg · flat → ~11.4 Wh/km · 44.0 km
 * (vs 50 km at 85 kg reference).
 */
export function EbikeWeightPerformanceViz({
  className,
}: EbikeWeightPerformanceVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ebike-weight-performance", className)}
      aria-label="E-bike weight versus performance visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Weight vs Performance</h3>
        <p className="tool-viz__subtitle">
          Heavier rider, bike, and cargo raise Wh per kilometer — the same pack
          covers fewer kilometers as mass climbs.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ebike-weight-performance-viz"
          role="img"
          aria-labelledby="ebwp-viz-title ebwp-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ebwp-viz-title">
            E-bike weight versus performance animated diagram
          </title>
          <desc id="ebwp-viz-desc">
            Battery watt-hours and total mass yield adjusted energy per
            kilometer and riding range. Sample: 500 watt-hours at 95 kilograms
            on flat terrain is about 11.4 watt-hours per kilometer and 44
            kilometers of range.
          </desc>

          <defs>
            <pattern
              id="ebwp-viz-grid"
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
              id="ebwp-viz-arrow"
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
              id="ebwp-viz-pulse"
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
              id="ebwp-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#ebwp-viz-grid)"
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
            MASS → Wh/km
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

          {/* —— INPUT: Battery —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="150"
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
              BATTERY CAPACITY
            </text>
            <text
              className="ebwp-viz-wh-value"
              x="56"
              y="148"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              500 Wh
            </text>
            <text
              x="56"
              y="178"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              usable pack energy
            </text>
            <text
              x="56"
              y="200"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              nameplate Wh
            </text>
          </g>

          {/* —— INPUT: Mass —— */}
          <g>
            <rect
              x="40"
              y="242"
              width="230"
              height="150"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="268"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              TOTAL MASS
            </text>
            <text
              className="ebwp-viz-kg-value"
              x="56"
              y="318"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              95 kg
            </text>
            <text
              x="56"
              y="348"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              rider + bike + gear
            </text>
            <text
              x="56"
              y="370"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ref 85 kg · flat
            </text>
          </g>

          {/* —— Flow —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 147 L 320 147"
            fill="none"
            stroke="url(#ebwp-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebwp-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 317 L 320 317"
            fill="none"
            stroke="url(#ebwp-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebwp-viz-arrow)"
          />

          {/* —— CENTER —— */}
          <g>
            <rect
              x="320"
              y="72"
              width="340"
              height="320"
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
              LOAD SCALING
            </text>

            {/* Mass scale glyph */}
            <g transform="translate(360, 120)">
              <rect
                className="ebwp-viz-mass"
                x="0"
                y="20"
                width="100"
                height="70"
                rx="4"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                className="ebwp-viz-mass"
                x1="50"
                y1="0"
                x2="50"
                y2="20"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                className="ebwp-viz-mass"
                x1="30"
                y1="0"
                x2="70"
                y2="0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <text
                x="50"
                y="50"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                MASS
              </text>
              <text
                className="ebwp-viz-kg-chip"
                x="50"
                y="72"
                textAnchor="middle"
                fill="#ededed"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                95 kg
              </text>
            </g>

            <path
              className="tool-viz-flow__pulse"
              d="M 460 155 L 490 155"
              fill="none"
              stroke="url(#ebwp-viz-pulse)"
              strokeWidth="2"
              markerEnd="url(#ebwp-viz-arrow)"
            />

            {/* Consumption chip */}
            <g transform="translate(490, 120)">
              <rect
                className="ebwp-viz-whkm"
                x="0"
                y="10"
                width="130"
                height="80"
                rx="4"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <text
                x="16"
                y="36"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                CONSUMPTION
              </text>
              <text
                className="ebwp-viz-whkm-chip"
                x="16"
                y="62"
                fill="#ededed"
                fontSize="18"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                11.4 Wh/km
              </text>
              <text
                x="16"
                y="80"
                fill="#666666"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                vs 10 @ 85 kg
              </text>
            </g>

            {/* Compare bars: light vs heavy range */}
            <text
              x="340"
              y="240"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              RANGE COMPARE
            </text>
            <text
              x="340"
              y="264"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              REF
            </text>
            <rect
              x="390"
              y="254"
              width="240"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="ebwp-viz-ref-bar"
              x="392"
              y="256"
              width="230"
              height="6"
              rx="1"
              fill="url(#ebwp-viz-bar)"
            />
            <text
              x="630"
              y="264"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              50 km
            </text>
            <text
              x="340"
              y="292"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              NOW
            </text>
            <rect
              x="390"
              y="282"
              width="240"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="ebwp-viz-now-bar"
              x="392"
              y="284"
              width="202"
              height="6"
              rx="1"
              fill="url(#ebwp-viz-bar)"
            />
            <text
              x="600"
              y="292"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              44 km
            </text>

            {/* Climb path hint */}
            <path
              className="ebwp-viz-climb"
              d="M 360 330 L 420 330 L 470 310 L 530 340 L 600 320"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            <text
              className="ebwp-viz-math-value"
              x="340"
              y="372"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              500 Wh ÷ 11.4 = 44.0 km
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 232 L 700 232"
            fill="none"
            stroke="url(#ebwp-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebwp-viz-arrow)"
          />

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="700"
              y="72"
              width="220"
              height="320"
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
              ADJUSTED RANGE
            </text>
            <text
              className="ebwp-viz-output-value"
              x="720"
              y="155"
              fill="#ededed"
              fontSize="40"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              44.0
            </text>
            <text
              x="720"
              y="182"
              fill="#888888"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              km
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
              className="ebwp-viz-output-bar"
              x="722"
              y="204"
              width="150"
              height="8"
              rx="1"
              fill="url(#ebwp-viz-bar)"
            />

            <text
              x="720"
              y="248"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              DETAIL
            </text>
            <text
              className="ebwp-viz-detail-value"
              x="720"
              y="278"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              11.4 Wh/km · Flat
            </text>
            <text
              x="720"
              y="310"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              −6 km vs 85 kg
            </text>
            <text
              x="720"
              y="348"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              hills raise Wh/km more
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
              range = Wh ÷ (Wh/km × mass^1.15)
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
              500 Wh · 95 kg → 44.0 km
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
