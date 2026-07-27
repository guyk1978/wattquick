"use client";

import { cn } from "@/lib/utils";

interface HomeInsulationSavingsVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Home Insulation Savings [VIZ].
 * Baseline envelope U / heat loss vs advanced + Low-E upgrade → HVAC $ saved.
 * Sample: 120 m² · standard walls · double glass · moderate · $0.14
 * → U 0.83→0.37 · 0.64→0.29 kW · $665.70/yr.
 */
export function HomeInsulationSavingsViz({
  className,
}: HomeInsulationSavingsVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--home-insulation-savings", className)}
      aria-label="Home insulation savings visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Home Insulation Savings</h3>
        <p className="tool-viz__subtitle">
          Floor area and climate set HVAC intensity. Upgrading walls and
          windows lowers composite U-value and design heat loss — cutting
          annual heating and cooling kilowatt-hours and cost.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg home-insulation-savings-viz"
          role="img"
          aria-labelledby="his-viz-title his-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="his-viz-title">
            Home insulation savings animated flow diagram
          </title>
          <desc id="his-viz-desc">
            Conditioned floor area, current wall insulation, and window glazing
            set a baseline composite U-value and design heat loss. Upgrading to
            advanced insulation and Low-E glass reduces thermal transmittance
            and annual HVAC energy. Sample: 120 square meters, standard walls,
            double glazing, moderate climate at 14 cents per kilowatt-hour
            saves about 666 dollars per year with U falling from 0.83 to 0.37
            and heat loss from 0.64 to 0.29 kilowatts.
          </desc>

          <defs>
            <pattern
              id="his-viz-grid"
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
              id="his-viz-arrow"
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
              id="his-viz-pulse"
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
              id="his-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="his-viz-fill"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.45" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.12" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#his-viz-grid)"
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
            BEFORE → AFTER
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

          {/* —— INPUT: Floor area —— */}
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
              FLOOR AREA
            </text>
            <text
              x="56"
              y="134"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              120 m²
            </text>
            <text
              x="56"
              y="158"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              conditioned space
            </text>
          </g>

          {/* —— INPUT: Insulation —— */}
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
              WALL INSULATION
            </text>
            <text
              x="56"
              y="250"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Standard
            </text>
            <text
              x="56"
              y="274"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              upgrade → advanced
            </text>
          </g>

          {/* —— INPUT: Climate / rate —— */}
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
              CLIMATE · RATE
            </text>
            <text
              x="56"
              y="362"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Moderate
            </text>
            <text
              x="56"
              y="388"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              $0.14/kWh · double glass
            </text>
          </g>

          {/* —— Flow inputs → mid —— */}
          <path
            d="M 270 122 L 320 122"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#his-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 122 L 320 122"
            fill="none"
            stroke="url(#his-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 238 L 295 238 L 295 200 L 320 200"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#his-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 270 238 L 295 238 L 295 200 L 320 200"
            fill="none"
            stroke="url(#his-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 354 L 295 354 L 295 280 L 320 280"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#his-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 354 L 295 354 L 295 280 L 320 280"
            fill="none"
            stroke="url(#his-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— MID: Before —— */}
          <g>
            <rect
              x="330"
              y="72"
              width="280"
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
              BASELINE ENVELOPE
            </text>
            <text
              x="346"
              y="128"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              Composite U
            </text>
            <text
              x="346"
              y="158"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="his-viz-u-before"
            >
              0.83
            </text>
            <text
              x="430"
              y="158"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              W/m²·K
            </text>
            <text
              x="346"
              y="188"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              Design heat loss
            </text>
            <text
              x="346"
              y="210"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.64 kW
            </text>
            <rect
              x="470"
              y="198"
              width="120"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="his-viz-before-bar"
              x="472"
              y="200"
              width="100"
              height="6"
              rx="1"
              fill="url(#his-viz-bar)"
            />
          </g>

          {/* —— MID: After upgrade house glyph —— */}
          <g>
            <rect
              x="330"
              y="240"
              width="280"
              height="170"
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
              UPGRADED ENVELOPE
            </text>

            {/* House outline with thicker insulation */}
            <g transform="translate(360, 286)">
              <path
                className="his-viz-house"
                d="M 8 52 L 48 18 L 88 52 V 88 H 8 Z"
                fill="url(#his-viz-fill)"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <rect
                x="38"
                y="58"
                width="20"
                height="30"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              {/* Insulation thickness rings */}
              <path
                className="his-viz-shell"
                d="M 2 54 L 48 12 L 94 54"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                opacity="0.7"
              />
              <path
                className="tool-viz-flow__pulse"
                d="M 100 50 L 130 50"
                fill="none"
                stroke="url(#his-viz-pulse)"
                strokeWidth="2"
                markerEnd="url(#his-viz-arrow)"
              />
            </g>

            <text
              x="500"
              y="310"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              Advanced + Low-E
            </text>
            <text
              x="500"
              y="340"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="his-viz-u-after"
            >
              U 0.37
            </text>
            <text
              x="500"
              y="368"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              0.29 kW loss
            </text>
            <text
              x="500"
              y="392"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              −55% HVAC kWh
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            d="M 610 147 L 680 147"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#his-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 610 147 L 680 147"
            fill="none"
            stroke="url(#his-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 610 325 L 645 325 L 645 220 L 680 220"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#his-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
            d="M 610 325 L 645 325 L 645 220 L 680 220"
            fill="none"
            stroke="url(#his-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="690"
              y="72"
              width="230"
              height="352"
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
              ANNUAL HVAC SAVINGS
            </text>
            <text
              x="706"
              y="152"
              fill="#ededed"
              fontSize="34"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="his-viz-output-value"
            >
              $665.70
            </text>
            <text
              x="706"
              y="180"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              ≈ $55.48 / month
            </text>

            <rect
              x="706"
              y="200"
              width="198"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="his-viz-savings-bar"
              x="708"
              y="202"
              width="160"
              height="8"
              rx="1"
              fill="url(#his-viz-bar)"
            />

            <text
              x="706"
              y="248"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ENERGY CUT
            </text>
            <text
              x="706"
              y="280"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              8,640 → 3,885
            </text>
            <text
              x="706"
              y="304"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              kWh/yr · 55% less
            </text>

            <text
              x="706"
              y="340"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BILL BEFORE → AFTER
            </text>
            <text
              x="706"
              y="370"
              fill="#ededed"
              fontSize="15"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              $1,209.60 → $543.90
            </text>
            <text
              x="706"
              y="398"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              score 7.8 → 9.7 / 10
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
              area × climate × U-multiplier → kWh × $/kWh → savings
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
              120 m² · standard → advanced · $666/yr
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
