"use client";

import { cn } from "@/lib/utils";

interface SolarArrayCurrentVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Solar Array Current [VIZ].
 * I = W ÷ V.
 * Sample: 1,200 W · 48 V → 25 A.
 */
export function SolarArrayCurrentViz({ className }: SolarArrayCurrentVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--solar-array-current", className)}
      aria-label="Solar array current visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Solar Array Current</h3>
        <p className="tool-viz__subtitle">
          Array watts divided by bus voltage yields DC current — so you can size
          fuses, cables, and charge controllers for the string.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg solar-array-current-viz"
          role="img"
          aria-labelledby="sac-viz-title sac-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="sac-viz-title">
            Solar array current animated conversion diagram
          </title>
          <desc id="sac-viz-desc">
            Array power in watts divided by operating voltage in volts yields
            array current in amperes. Sample: 1,200 watts at 48 volts equals 25
            amperes.
          </desc>

          <defs>
            <pattern
              id="sac-viz-grid"
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
              id="sac-viz-arrow"
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
              id="sac-viz-pulse"
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
              id="sac-viz-bar"
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
            fill="url(#sac-viz-grid)"
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
            W ÷ V → A
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

          {/* —— INPUT: Array watts —— */}
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
              ARRAY WATTS
            </text>
            <text
              className="sac-viz-w-value"
              x="56"
              y="148"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,200 W
            </text>
            <text
              x="56"
              y="178"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              total panel STC
            </text>
            <text
              x="56"
              y="200"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              string / array rating
            </text>
          </g>

          {/* —— INPUT: Voltage —— */}
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
              OPERATING VOLTAGE
            </text>
            <text
              className="sac-viz-v-value"
              x="56"
              y="318"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              48 V
            </text>
            <text
              x="56"
              y="348"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              DC bus / battery
            </text>
            <text
              x="56"
              y="370"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              12 / 24 / 48 V systems
            </text>
          </g>

          {/* —— Flow inputs → mid —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 147 L 320 147"
            fill="none"
            stroke="url(#sac-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#sac-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 317 L 320 317"
            fill="none"
            stroke="url(#sac-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#sac-viz-arrow)"
          />

          {/* —— CENTER: PV → divide —— */}
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
              ARRAY ÷ BUS
            </text>

            {/* Panel array glyph */}
            <g transform="translate(360, 118)">
              <rect
                className="sac-viz-panel"
                x="0"
                y="0"
                width="88"
                height="56"
                rx="2"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="0"
                y1="18"
                x2="88"
                y2="18"
                stroke="currentColor"
                strokeWidth="0.75"
                opacity="0.55"
              />
              <line
                x1="0"
                y1="36"
                x2="88"
                y2="36"
                stroke="currentColor"
                strokeWidth="0.75"
                opacity="0.55"
              />
              <line
                x1="29"
                y1="0"
                x2="29"
                y2="56"
                stroke="currentColor"
                strokeWidth="0.75"
                opacity="0.55"
              />
              <line
                x1="58"
                y1="0"
                x2="58"
                y2="56"
                stroke="currentColor"
                strokeWidth="0.75"
                opacity="0.55"
              />
              <text
                className="sac-viz-w-chip"
                x="44"
                y="74"
                textAnchor="middle"
                fill="#ededed"
                fontSize="13"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                1,200 W
              </text>
            </g>

            <text
              x="480"
              y="150"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              ÷
            </text>

            {/* Voltage node */}
            <g transform="translate(520, 118)">
              <circle
                className="sac-viz-node"
                cx="44"
                cy="28"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <text
                x="44"
                y="24"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                V
              </text>
              <text
                className="sac-viz-v-chip"
                x="44"
                y="40"
                textAnchor="middle"
                fill="#ededed"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                48
              </text>
              <text
                x="44"
                y="74"
                textAnchor="middle"
                fill="#888888"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                bus
              </text>
            </g>

            <path
              className="tool-viz-flow__pulse"
              d="M 490 220 L 490 248"
              fill="none"
              stroke="url(#sac-viz-pulse)"
              strokeWidth="2"
              markerEnd="url(#sac-viz-arrow)"
            />

            {/* Current flow rail */}
            <g transform="translate(380, 258)">
              <rect
                x="0"
                y="0"
                width="200"
                height="44"
                rx="3"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <path
                className="sac-viz-current-flow"
                d="M 24 22 H 176"
                fill="none"
                stroke="url(#sac-viz-pulse)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle
                className="sac-viz-node"
                cx="24"
                cy="22"
                r="4"
                fill="currentColor"
              />
              <circle
                className="sac-viz-node"
                cx="176"
                cy="22"
                r="4"
                fill="currentColor"
              />
              <text
                className="sac-viz-a-chip"
                x="100"
                y="38"
                textAnchor="middle"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                25 A
              </text>
            </g>

            <text
              className="sac-viz-math-value"
              x="340"
              y="348"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,200 ÷ 48 = 25
            </text>
            <rect
              x="340"
              y="362"
              width="280"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="sac-viz-scale-bar"
              x="342"
              y="364"
              width="200"
              height="6"
              rx="1"
              fill="url(#sac-viz-bar)"
            />
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 232 L 700 232"
            fill="none"
            stroke="url(#sac-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#sac-viz-arrow)"
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
              ARRAY CURRENT
            </text>
            <text
              className="sac-viz-output-value"
              x="720"
              y="155"
              fill="#ededed"
              fontSize="40"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              25
            </text>
            <text
              x="720"
              y="182"
              fill="#888888"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              A
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
              className="sac-viz-output-bar"
              x="722"
              y="204"
              width="130"
              height="8"
              rx="1"
              fill="url(#sac-viz-bar)"
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
              className="sac-viz-detail-value"
              x="720"
              y="278"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,200 W ÷ 48 V
            </text>
            <text
              x="720"
              y="310"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              size fuses ~30 A
            </text>
            <text
              x="720"
              y="348"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              DC · continuous
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
              I = W ÷ V
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
              1,200 W · 48 V → 25 A
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
