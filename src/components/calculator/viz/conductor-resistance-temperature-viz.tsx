"use client";

import { cn } from "@/lib/utils";

interface ConductorResistanceTemperatureVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Conductor Resistance & Temperature [VIZ].
 * R(T) = (ρ L / A) × [1 + α(T − 20)].
 * Sample: Cu · 6 mm² · 15 m · 25°C → R₂₀ 0.0438 Ω · R(T) 0.0446 Ω.
 */
export function ConductorResistanceTemperatureViz({
  className,
}: ConductorResistanceTemperatureVizProps) {
  return (
    <section
      className={cn(
        "tool-viz tool-viz--conductor-resistance-temperature",
        className
      )}
      aria-label="Conductor resistance and temperature visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">
          Conductor Resistance & Temperature
        </h3>
        <p className="tool-viz__subtitle">
          Resistivity and geometry set resistance at 20°C — then temperature
          coefficients scale that base as the wire heats above reference.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg conductor-resistance-temperature-viz"
          role="img"
          aria-labelledby="crt-viz-title crt-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="crt-viz-title">
            Conductor resistance and temperature animated flow diagram
          </title>
          <desc id="crt-viz-desc">
            Copper or aluminum resistivity times length over cross-section
            yields resistance at 20 degrees Celsius. A temperature factor then
            scales that base to the operating temperature. Sample: copper 6
            square millimeters over 15 meters at 25 degrees Celsius gives 0.0438
            ohms at 20 degrees and 0.0446 ohms at operating temperature.
          </desc>

          <defs>
            <pattern
              id="crt-viz-grid"
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
              id="crt-viz-arrow"
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
              id="crt-viz-pulse"
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
              id="crt-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="crt-viz-heat"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.75" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#crt-viz-grid)"
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
            ρL/A → TEMP SCALE
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

          {/* —— INPUT: Material —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="94"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MATERIAL
            </text>
            <text
              className="crt-viz-mat-value"
              x="56"
              y="124"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Copper (Cu)
            </text>
          </g>

          {/* —— INPUT: Cross-section —— */}
          <g>
            <rect
              x="40"
              y="156"
              width="230"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="178"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CROSS-SECTION
            </text>
            <text
              className="crt-viz-area-value"
              x="56"
              y="208"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              6 mm²
            </text>
          </g>

          {/* —— INPUT: Length + Temp —— */}
          <g>
            <rect
              x="40"
              y="240"
              width="230"
              height="152"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="262"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              LENGTH · TEMP
            </text>
            <text
              className="crt-viz-len-value"
              x="56"
              y="298"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              15 m
            </text>
            <text
              className="crt-viz-temp-value"
              x="56"
              y="334"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              25°C
            </text>
            <text
              x="56"
              y="368"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              one-way run · field temp
            </text>
          </g>

          {/* —— Flow inputs → mid —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 108 L 320 108"
            fill="none"
            stroke="url(#crt-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#crt-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 192 L 320 192"
            fill="none"
            stroke="url(#crt-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#crt-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 316 L 320 316"
            fill="none"
            stroke="url(#crt-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#crt-viz-arrow)"
          />

          {/* —— CENTER: Thermal-electrical path —— */}
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
              CONDUCTOR · THERMAL PATH
            </text>

            {/* Wire cross-section glyph */}
            <g transform="translate(360, 120)">
              <circle
                className="crt-viz-wire"
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle
                className="crt-viz-core"
                cx="40"
                cy="40"
                r="18"
                fill="url(#crt-viz-heat)"
                stroke="currentColor"
                strokeWidth="1"
              />
              <text
                x="40"
                y="96"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                A · Cu
              </text>
            </g>

            {/* Heat waves */}
            <path
              className="crt-viz-heat-wave"
              d="M 460 130 Q 472 118 484 130"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
            />
            <path
              className="crt-viz-heat-wave"
              d="M 460 148 Q 472 136 484 148"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              opacity="0.7"
            />
            <path
              className="crt-viz-heat-wave"
              d="M 460 166 Q 472 154 484 166"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              opacity="0.45"
            />

            <path
              className="tool-viz-flow__pulse"
              d="M 500 160 L 540 160"
              fill="none"
              stroke="url(#crt-viz-pulse)"
              strokeWidth="2"
              markerEnd="url(#crt-viz-arrow)"
            />

            {/* R20 box */}
            <g transform="translate(550, 125)">
              <rect
                x="0"
                y="0"
                width="90"
                height="70"
                rx="3"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <text
                x="45"
                y="24"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                R₂₀
              </text>
              <text
                className="crt-viz-r20-chip"
                x="45"
                y="48"
                textAnchor="middle"
                fill="#ededed"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                0.0438
              </text>
            </g>

            <text
              x="340"
              y="250"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              BASE · ρL/A
            </text>
            <text
              className="crt-viz-base-math"
              x="340"
              y="276"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.0175 × 15 ÷ 6
            </text>

            <text
              x="340"
              y="308"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              TEMP FACTOR · 1 + α(T−20)
            </text>
            <text
              className="crt-viz-factor-math"
              x="340"
              y="334"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              × 1.0196 @ 25°C
            </text>
            <rect
              x="340"
              y="352"
              width="280"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="crt-viz-scale-bar"
              x="342"
              y="354"
              width="210"
              height="8"
              rx="1"
              fill="url(#crt-viz-bar)"
            />
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 232 L 700 232"
            fill="none"
            stroke="url(#crt-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#crt-viz-arrow)"
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
              R AT TEMP
            </text>
            <text
              className="crt-viz-output-value"
              x="720"
              y="150"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.0446
            </text>
            <text
              x="720"
              y="176"
              fill="#888888"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              Ω @ 25°C
            </text>

            <rect
              x="720"
              y="196"
              width="180"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="crt-viz-output-bar"
              x="722"
              y="198"
              width="140"
              height="8"
              rx="1"
              fill="url(#crt-viz-bar)"
            />

            <text
              x="720"
              y="240"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              R AT 20°C
            </text>
            <text
              className="crt-viz-r20-value"
              x="720"
              y="270"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.0438 Ω
            </text>
            <text
              x="720"
              y="302"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              Cu · 6 mm² · 15 m
            </text>
            <text
              x="720"
              y="340"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              hot wire → higher I²R
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
              R₂₀ = ρL/A · R(T) = R₂₀ × [1 + α(T−20)]
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
              Cu · 6 mm² · 15 m · 25°C → 0.0446 Ω
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
