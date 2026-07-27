"use client";

import { cn } from "@/lib/utils";

interface AhToWhVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Ah to Wh Converter [VIZ].
 * Wh = Ah × V.
 * Sample: 100 Ah · 12 V → 1,200 Wh (1.2 kWh).
 */
export function AhToWhViz({ className }: AhToWhVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ah-to-wh", className)}
      aria-label="Amp-hours to watt-hours conversion visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Ah to Wh Converter</h3>
        <p className="tool-viz__subtitle">
          Amp-hours rate charge; voltage sets the potential — multiply them to
          get watt-hours of stored energy for pack comparisons and load sizing.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ah-to-wh-viz"
          role="img"
          aria-labelledby="atw-viz-title atw-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="atw-viz-title">
            Amp-hours to watt-hours animated conversion diagram
          </title>
          <desc id="atw-viz-desc">
            Capacity in amp-hours multiplied by voltage yields energy in
            watt-hours. Sample: a 100 amp-hour 12 volt battery stores 1,200
            watt-hours, or 1.2 kilowatt-hours.
          </desc>

          <defs>
            <pattern
              id="atw-viz-grid"
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
              id="atw-viz-arrow"
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
              id="atw-viz-pulse"
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
              id="atw-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="atw-viz-soc"
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
            fill="url(#atw-viz-grid)"
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
            Ah × V → Wh
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

          {/* —— INPUT: Capacity —— */}
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
              CAPACITY
            </text>
            <text
              className="atw-viz-ah-value"
              x="56"
              y="148"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              100 Ah
            </text>
            <text
              x="56"
              y="178"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              charge capacity
            </text>
            <text
              x="56"
              y="200"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              amp-hours (Ah)
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
              VOLTAGE
            </text>
            <text
              className="atw-viz-v-value"
              x="56"
              y="318"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              12 V
            </text>
            <text
              x="56"
              y="348"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              system potential
            </text>
            <text
              x="56"
              y="370"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              nominal pack volts
            </text>
          </g>

          {/* —— Flow inputs → mid —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 147 L 320 147"
            fill="none"
            stroke="url(#atw-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#atw-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 317 L 320 317"
            fill="none"
            stroke="url(#atw-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#atw-viz-arrow)"
          />

          {/* —— CENTER: Conversion path —— */}
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
              CHARGE → ENERGY
            </text>

            {/* Ah node */}
            <g transform="translate(350, 130)">
              <rect
                x="0"
                y="0"
                width="80"
                height="64"
                rx="3"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <text
                x="40"
                y="24"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                Ah
              </text>
              <text
                className="atw-viz-ah-chip"
                x="40"
                y="48"
                textAnchor="middle"
                fill="#ededed"
                fontSize="18"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                100
              </text>
            </g>

            <text
              x="450"
              y="168"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              ×
            </text>

            {/* V node */}
            <g transform="translate(480, 130)">
              <rect
                x="0"
                y="0"
                width="80"
                height="64"
                rx="3"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <text
                x="40"
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
                className="atw-viz-v-chip"
                x="40"
                y="48"
                textAnchor="middle"
                fill="#ededed"
                fontSize="18"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                12
              </text>
            </g>

            <path
              className="tool-viz-flow__pulse"
              d="M 575 162 L 605 162"
              fill="none"
              stroke="url(#atw-viz-pulse)"
              strokeWidth="2"
              markerEnd="url(#atw-viz-arrow)"
            />

            {/* Battery / energy glyph */}
            <g transform="translate(615, 125)">
              <rect
                className="atw-viz-pack"
                x="4"
                y="10"
                width="44"
                height="60"
                rx="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="16"
                y="4"
                width="20"
                height="7"
                rx="1"
                fill="currentColor"
                opacity="0.7"
              />
              <rect
                className="atw-viz-soc-fill"
                x="8"
                y="24"
                width="36"
                height="40"
                rx="2"
                fill="url(#atw-viz-soc)"
              />
            </g>

            <text
              x="340"
              y="250"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              CONVERSION
            </text>
            <text
              className="atw-viz-math-value"
              x="340"
              y="282"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              100 × 12 = 1,200
            </text>
            <rect
              x="340"
              y="304"
              width="280"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="atw-viz-scale-bar"
              x="342"
              y="306"
              width="230"
              height="8"
              rx="1"
              fill="url(#atw-viz-bar)"
            />
            <text
              x="340"
              y="340"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              Wh = Ah × V
            </text>
            <text
              x="340"
              y="364"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              compare packs across voltages
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 232 L 700 232"
            fill="none"
            stroke="url(#atw-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#atw-viz-arrow)"
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
              ENERGY CAPACITY
            </text>
            <text
              className="atw-viz-output-value"
              x="720"
              y="155"
              fill="#ededed"
              fontSize="34"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,200
            </text>
            <text
              x="720"
              y="182"
              fill="#888888"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              Wh
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
              className="atw-viz-output-bar"
              x="722"
              y="204"
              width="155"
              height="8"
              rx="1"
              fill="url(#atw-viz-bar)"
            />

            <text
              x="720"
              y="248"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ALSO
            </text>
            <text
              className="atw-viz-kwh-value"
              x="720"
              y="278"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1.2 kWh
            </text>
            <text
              x="720"
              y="310"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              100 Ah × 12 V
            </text>
            <text
              x="720"
              y="348"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              match loads in watts
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
              Ah × V → Wh (÷ 1000 → kWh)
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
              100 Ah · 12 V → 1,200 Wh
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
