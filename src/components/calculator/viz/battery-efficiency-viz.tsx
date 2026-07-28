"use client";

import { cn } from "@/lib/utils";

interface BatteryEfficiencyVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Battery Efficiency [VIZ].
 * Efficiency % = (energy out ÷ energy in) × 100.
 * Sample: 950 Wh out · 1,000 Wh in → 95.0% · 50 Wh lost.
 */
export function BatteryEfficiencyViz({ className }: BatteryEfficiencyVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--battery-efficiency", className)}
      aria-label="Battery round-trip efficiency visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Battery Efficiency</h3>
        <p className="tool-viz__subtitle">
          Energy recovered on discharge over energy put in on charge sets
          round-trip efficiency — the gap is heat, BMS, and conversion loss.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg battery-efficiency-viz"
          role="img"
          aria-labelledby="bef-viz-title bef-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="bef-viz-title">
            Battery round-trip efficiency animated flow diagram
          </title>
          <desc id="bef-viz-desc">
            Energy out divided by energy in times 100 yields round-trip
            efficiency percent. Sample: 950 watt-hours recovered from 1,000
            watt-hours charged is 95 percent efficient, with 50 watt-hours lost.
          </desc>

          <defs>
            <pattern
              id="bef-viz-grid"
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
              id="bef-viz-arrow"
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
              id="bef-viz-pulse"
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
              id="bef-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="bef-viz-soc"
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
            fill="url(#bef-viz-grid)"
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
            IN → PACK → OUT
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

          {/* —— INPUT: Energy out —— */}
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
              ENERGY OUT
            </text>
            <text
              className="bef-viz-out-value"
              x="56"
              y="148"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              950 Wh
            </text>
            <text
              x="56"
              y="178"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              recovered on discharge
            </text>
            <text
              x="56"
              y="200"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              usable to loads
            </text>
          </g>

          {/* —— INPUT: Energy in —— */}
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
              ENERGY IN
            </text>
            <text
              className="bef-viz-in-value"
              x="56"
              y="318"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,000 Wh
            </text>
            <text
              x="56"
              y="348"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              charged into pack
            </text>
            <text
              x="56"
              y="370"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              from charger / grid
            </text>
          </g>

          {/* —— Flow inputs → mid —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 147 L 320 147"
            fill="none"
            stroke="url(#bef-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#bef-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 317 L 320 317"
            fill="none"
            stroke="url(#bef-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#bef-viz-arrow)"
          />

          {/* —— CENTER: Round-trip path —— */}
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
              ROUND-TRIP CYCLE
            </text>

            {/* Charge in */}
            <g transform="translate(350, 120)">
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
                IN
              </text>
              <text
                className="bef-viz-in-chip"
                x="35"
                y="42"
                textAnchor="middle"
                fill="#ededed"
                fontSize="13"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                1,000
              </text>
            </g>

            <path
              className="bef-viz-charge-path"
              d="M 430 148 L 470 148"
              fill="none"
              stroke="url(#bef-viz-pulse)"
              strokeWidth="2"
              markerEnd="url(#bef-viz-arrow)"
            />

            {/* Pack */}
            <g transform="translate(485, 112)">
              <rect
                className="bef-viz-pack"
                x="0"
                y="8"
                width="60"
                height="80"
                rx="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="20"
                y="0"
                width="20"
                height="8"
                rx="1"
                fill="currentColor"
                opacity="0.7"
              />
              <rect
                className="bef-viz-soc-fill"
                x="6"
                y="22"
                width="48"
                height="58"
                rx="2"
                fill="url(#bef-viz-soc)"
              />
              {/* Loss rays */}
              <path
                className="bef-viz-loss"
                d="M 68 30 Q 82 20 96 30"
                fill="none"
                stroke="#666666"
                strokeWidth="1.25"
              />
              <path
                className="bef-viz-loss"
                d="M 68 48 Q 82 38 96 48"
                fill="none"
                stroke="#666666"
                strokeWidth="1.25"
                opacity="0.7"
              />
              <text
                x="100"
                y="44"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                loss
              </text>
            </g>

            <path
              className="bef-viz-discharge-path"
              d="M 555 148 L 595 148"
              fill="none"
              stroke="url(#bef-viz-pulse)"
              strokeWidth="2"
              markerEnd="url(#bef-viz-arrow)"
            />

            {/* Out */}
            <g transform="translate(605, 120)">
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
                OUT
              </text>
              <text
                className="bef-viz-out-chip"
                x="35"
                y="42"
                textAnchor="middle"
                fill="#ededed"
                fontSize="13"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                950
              </text>
            </g>

            {/* Comparison bars */}
            <text
              x="340"
              y="240"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              ENERGY COMPARE
            </text>
            <text
              x="340"
              y="268"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              IN
            </text>
            <rect
              x="370"
              y="256"
              width="230"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="bef-viz-in-bar"
              x="372"
              y="258"
              width="220"
              height="6"
              rx="1"
              fill="url(#bef-viz-bar)"
            />
            <text
              x="340"
              y="298"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              OUT
            </text>
            <rect
              x="370"
              y="286"
              width="230"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="bef-viz-out-bar"
              x="372"
              y="288"
              width="209"
              height="6"
              rx="1"
              fill="url(#bef-viz-bar)"
            />

            <text
              className="bef-viz-math-value"
              x="340"
              y="340"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              950 ÷ 1,000 × 100
            </text>
            <text
              x="340"
              y="368"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              50 Wh lost as heat / BMS
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 232 L 700 232"
            fill="none"
            stroke="url(#bef-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#bef-viz-arrow)"
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
              EFFICIENCY
            </text>
            <text
              className="bef-viz-output-value"
              x="720"
              y="155"
              fill="#ededed"
              fontSize="40"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              95.0
            </text>
            <text
              x="720"
              y="182"
              fill="#888888"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              % round-trip
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
              className="bef-viz-output-bar"
              x="722"
              y="204"
              width="170"
              height="8"
              rx="1"
              fill="url(#bef-viz-bar)"
            />

            <text
              x="720"
              y="248"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              LOSS
            </text>
            <text
              className="bef-viz-loss-value"
              x="720"
              y="278"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              50 Wh
            </text>
            <text
              x="720"
              y="310"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              5% of input
            </text>
            <text
              x="720"
              y="348"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              Li often 95%+
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
              Efficiency % = (Wh out ÷ Wh in) × 100
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
              950 ÷ 1,000 → 95.0%
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
