"use client";

import { cn } from "@/lib/utils";

interface SolarInverterEfficiencyVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Solar Inverter Efficiency [VIZ].
 * Efficiency % = (AC ÷ DC) × 100.
 * Sample: 4,600 W AC · 5,000 W DC → 92.0% · 400 W lost.
 */
export function SolarInverterEfficiencyViz({
  className,
}: SolarInverterEfficiencyVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--solar-inverter-efficiency", className)}
      aria-label="Solar inverter efficiency visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Solar Inverter Efficiency</h3>
        <p className="tool-viz__subtitle">
          DC array power enters the inverter; conversion and heat leave a
          smaller AC stream — efficiency is how much of the DC makes it to the
          loads.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg solar-inverter-efficiency-viz"
          role="img"
          aria-labelledby="sie-viz-title sie-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="sie-viz-title">
            Solar inverter efficiency animated conversion diagram
          </title>
          <desc id="sie-viz-desc">
            AC output watts divided by DC input watts times 100 yields inverter
            efficiency percent. Sample: 4,600 watts AC from 5,000 watts DC is
            92 percent efficient, with 400 watts lost as heat.
          </desc>

          <defs>
            <pattern
              id="sie-viz-grid"
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
              id="sie-viz-arrow"
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
              id="sie-viz-pulse"
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
              id="sie-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="sie-viz-heat"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#sie-viz-grid)"
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
            DC → INV → AC
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

          {/* —— INPUT: AC output —— */}
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
              AC OUTPUT
            </text>
            <text
              className="sie-viz-ac-value"
              x="56"
              y="148"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              4,600 W
            </text>
            <text
              x="56"
              y="178"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              usable grid / loads
            </text>
            <text
              x="56"
              y="200"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              measured AC watts
            </text>
          </g>

          {/* —— INPUT: DC input —— */}
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
              DC INPUT
            </text>
            <text
              className="sie-viz-dc-value"
              x="56"
              y="318"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              5,000 W
            </text>
            <text
              x="56"
              y="348"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              array / MPPT feed
            </text>
            <text
              x="56"
              y="370"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              DC bus power
            </text>
          </g>

          {/* —— Flow inputs → mid —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 147 L 320 147"
            fill="none"
            stroke="url(#sie-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#sie-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 317 L 320 317"
            fill="none"
            stroke="url(#sie-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#sie-viz-arrow)"
          />

          {/* —— CENTER: Inverter conversion —— */}
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
              INVERTER PATH
            </text>

            {/* DC rail */}
            <g transform="translate(340, 118)">
              <rect
                x="0"
                y="0"
                width="100"
                height="70"
                rx="3"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <text
                x="12"
                y="22"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                DC IN
              </text>
              <text
                className="sie-viz-dc-chip"
                x="12"
                y="48"
                fill="#ededed"
                fontSize="16"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                5,000
              </text>
              {/* Mini panel glyph */}
              <rect
                x="68"
                y="18"
                width="22"
                height="28"
                rx="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="sie-viz-panel"
              />
              <line
                x1="68"
                y1="27"
                x2="90"
                y2="27"
                stroke="currentColor"
                strokeWidth="0.75"
                opacity="0.6"
              />
              <line
                x1="68"
                y1="36"
                x2="90"
                y2="36"
                stroke="currentColor"
                strokeWidth="0.75"
                opacity="0.6"
              />
            </g>

            <path
              className="tool-viz-flow__pulse sie-viz-dc-path"
              d="M 440 153 L 470 153"
              fill="none"
              stroke="url(#sie-viz-pulse)"
              strokeWidth="2"
              markerEnd="url(#sie-viz-arrow)"
            />

            {/* Inverter body */}
            <g transform="translate(470, 108)">
              <rect
                className="sie-viz-inverter"
                x="0"
                y="0"
                width="120"
                height="110"
                rx="4"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <text
                x="60"
                y="24"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.1em"
              >
                INVERTER
              </text>
              {/* DC→AC symbol */}
              <path
                className="sie-viz-convert"
                d="M 28 48 H 52 M 68 48 H 92"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                className="sie-viz-convert"
                d="M 68 40 Q 80 48 68 56 Q 56 48 68 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="28"
                y="40"
                width="18"
                height="16"
                rx="1"
                fill="none"
                stroke="#555555"
                strokeWidth="1"
              />
              {/* Heat / loss plume */}
              <path
                className="sie-viz-heat"
                d="M 50 78 Q 45 68 50 58 Q 55 68 50 78 M 60 82 Q 55 70 60 60 Q 65 70 60 82 M 70 78 Q 65 68 70 58 Q 75 68 70 78"
                fill="none"
                stroke="url(#sie-viz-heat)"
                strokeWidth="1.5"
              />
              <text
                className="sie-viz-loss-chip"
                x="60"
                y="100"
                textAnchor="middle"
                fill="#ededed"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                −400 W
              </text>
            </g>

            <path
              className="tool-viz-flow__pulse sie-viz-ac-path"
              d="M 590 153 L 620 153"
              fill="none"
              stroke="url(#sie-viz-pulse)"
              strokeWidth="2"
              markerEnd="url(#sie-viz-arrow)"
            />

            {/* AC rail */}
            <g transform="translate(620, 118)">
              <rect
                x="0"
                y="0"
                width="100"
                height="70"
                rx="3"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <text
                x="12"
                y="22"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                AC OUT
              </text>
              <text
                className="sie-viz-ac-chip"
                x="12"
                y="48"
                fill="#ededed"
                fontSize="16"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                4,600
              </text>
            </g>

            {/* Stacked bars: DC vs AC */}
            <text
              x="340"
              y="230"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              POWER COMPARE
            </text>
            <text
              x="340"
              y="252"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              DC
            </text>
            <rect
              x="370"
              y="242"
              width="270"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="sie-viz-dc-bar"
              x="372"
              y="244"
              width="266"
              height="6"
              rx="1"
              fill="url(#sie-viz-bar)"
            />
            <text
              x="340"
              y="278"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              AC
            </text>
            <rect
              x="370"
              y="268"
              width="270"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="sie-viz-ac-bar"
              x="372"
              y="270"
              width="244"
              height="6"
              rx="1"
              fill="url(#sie-viz-bar)"
            />

            <text
              x="340"
              y="318"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              EFF = AC ÷ DC × 100
            </text>
            <text
              className="sie-viz-math-value"
              x="340"
              y="348"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              4,600 ÷ 5,000 = 92.0%
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
              className="sie-viz-scale-bar"
              x="342"
              y="364"
              width="250"
              height="6"
              rx="1"
              fill="url(#sie-viz-bar)"
            />
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 232 L 700 232"
            fill="none"
            stroke="url(#sie-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#sie-viz-arrow)"
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
              className="sie-viz-output-value"
              x="720"
              y="155"
              fill="#ededed"
              fontSize="40"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              92.0
            </text>
            <text
              x="720"
              y="182"
              fill="#888888"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              %
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
              className="sie-viz-output-bar"
              x="722"
              y="204"
              width="160"
              height="8"
              rx="1"
              fill="url(#sie-viz-bar)"
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
              className="sie-viz-detail-value"
              x="720"
              y="278"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              4,600 ÷ 5,000 W
            </text>
            <text
              className="sie-viz-loss-value"
              x="720"
              y="310"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              400 W lost
            </text>
            <text
              x="720"
              y="348"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              heat · switching
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
              Eff % = (AC ÷ DC) × 100
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
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              4,600 W AC · 5,000 W DC → 92%
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
