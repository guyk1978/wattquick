"use client";

import { cn } from "@/lib/utils";

interface BatteryDepthOfDischargeVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Battery Depth of Discharge [VIZ].
 * DoD % = (used Wh ÷ total Wh) × 100.
 * Sample: 600 Wh used · 1,200 Wh pack → 50% DoD · 50% SoC remaining.
 */
export function BatteryDepthOfDischargeViz({
  className,
}: BatteryDepthOfDischargeVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--battery-depth-of-discharge", className)}
      aria-label="Battery depth of discharge visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Battery Depth of Discharge</h3>
        <p className="tool-viz__subtitle">
          Energy drawn from the pack over total capacity sets DoD % — how deep
          you cycle, and how much state of charge remains.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg battery-depth-of-discharge-viz"
          role="img"
          aria-labelledby="bdod-viz-title bdod-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="bdod-viz-title">
            Battery depth of discharge animated flow diagram
          </title>
          <desc id="bdod-viz-desc">
            Energy used in watt-hours divided by total pack capacity times 100
            yields depth of discharge percent. Sample: 600 watt-hours drawn from
            a 1,200 watt-hour pack is 50 percent DoD, leaving 50 percent state
            of charge.
          </desc>

          <defs>
            <pattern
              id="bdod-viz-grid"
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
              id="bdod-viz-arrow"
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
              id="bdod-viz-pulse"
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
              id="bdod-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="bdod-viz-soc"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="bdod-viz-used"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.55" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#bdod-viz-grid)"
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
            USED ÷ TOTAL → DoD %
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

          {/* —— INPUT: Energy used —— */}
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
              ENERGY USED
            </text>
            <text
              className="bdod-viz-used-value"
              x="56"
              y="148"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              600 Wh
            </text>
            <text
              x="56"
              y="178"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              drawn this cycle
            </text>
            <text
              x="56"
              y="200"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              shunt / load log
            </text>
          </g>

          {/* —— INPUT: Total capacity —— */}
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
              TOTAL CAPACITY
            </text>
            <text
              className="bdod-viz-total-value"
              x="56"
              y="318"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,200 Wh
            </text>
            <text
              x="56"
              y="348"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              nameplate full charge
            </text>
            <text
              x="56"
              y="370"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              same Wh basis as used
            </text>
          </g>

          {/* —— Flow inputs → mid —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 147 L 320 147"
            fill="none"
            stroke="url(#bdod-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#bdod-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 317 L 320 317"
            fill="none"
            stroke="url(#bdod-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#bdod-viz-arrow)"
          />

          {/* —— CENTER: Proportion / pack drawdown —— */}
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
              PACK DRAWDOWN
            </text>

            {/* Battery pack with used (top) + remaining (bottom) */}
            <g transform="translate(380, 120)">
              <rect
                className="bdod-viz-pack"
                x="0"
                y="8"
                width="80"
                height="140"
                rx="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="28"
                y="0"
                width="24"
                height="8"
                rx="1"
                fill="currentColor"
                opacity="0.7"
              />
              {/* Used slice — top half depleting */}
              <rect
                className="bdod-viz-used-fill"
                x="6"
                y="16"
                width="68"
                height="64"
                rx="2"
                fill="url(#bdod-viz-used)"
              />
              {/* Remaining SoC — bottom half */}
              <rect
                className="bdod-viz-soc-fill"
                x="6"
                y="80"
                width="68"
                height="60"
                rx="2"
                fill="url(#bdod-viz-soc)"
              />
              <line
                x1="6"
                y1="80"
                x2="74"
                y2="80"
                stroke="#ededed"
                strokeWidth="1"
                opacity="0.5"
              />
              <text
                x="40"
                y="168"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                PACK
              </text>
            </g>

            {/* Proportion labels */}
            <g transform="translate(500, 130)">
              <text
                x="0"
                y="20"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                USED
              </text>
              <text
                className="bdod-viz-used-chip"
                x="0"
                y="44"
                fill="#ededed"
                fontSize="18"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                600 Wh
              </text>
              <text
                x="0"
                y="88"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                REMAINING
              </text>
              <text
                className="bdod-viz-remain-chip"
                x="0"
                y="112"
                fill="#ededed"
                fontSize="18"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                600 Wh
              </text>
            </g>

            <text
              x="340"
              y="300"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              RATIO
            </text>
            <text
              className="bdod-viz-math-value"
              x="340"
              y="328"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              600 ÷ 1,200 × 100
            </text>
            <rect
              x="340"
              y="348"
              width="280"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="bdod-viz-scale-bar"
              x="342"
              y="350"
              width="140"
              height="8"
              rx="1"
              fill="url(#bdod-viz-bar)"
            />
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 232 L 700 232"
            fill="none"
            stroke="url(#bdod-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#bdod-viz-arrow)"
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
              DEPTH OF DISCHARGE
            </text>
            <text
              className="bdod-viz-output-value"
              x="720"
              y="155"
              fill="#ededed"
              fontSize="40"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              50.0
            </text>
            <text
              x="720"
              y="182"
              fill="#888888"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              % DoD
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
              className="bdod-viz-output-bar"
              x="722"
              y="204"
              width="90"
              height="8"
              rx="1"
              fill="url(#bdod-viz-bar)"
            />

            <text
              x="720"
              y="248"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              STATE OF CHARGE
            </text>
            <text
              className="bdod-viz-soc-value"
              x="720"
              y="278"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              50% SoC
            </text>
            <text
              x="720"
              y="310"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              600 of 1,200 Wh
            </text>
            <text
              x="720"
              y="348"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              SoC ≈ 100 − DoD
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
              DoD % = (used Wh ÷ total Wh) × 100
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
              600 ÷ 1,200 → 50% DoD
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
