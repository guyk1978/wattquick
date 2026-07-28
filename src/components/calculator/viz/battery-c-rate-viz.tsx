"use client";

import { cn } from "@/lib/utils";

interface BatteryCRateVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Battery C-Rate [VIZ].
 * C-rate = discharge A ÷ capacity Ah.
 * Sample: 50 A · 100 Ah → 0.50 C · ~2.0 h to empty.
 */
export function BatteryCRateViz({ className }: BatteryCRateVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--battery-c-rate", className)}
      aria-label="Battery C-rate discharge visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Battery C-Rate</h3>
        <p className="tool-viz__subtitle">
          Discharge current divided by pack amp-hours sets the C-rate —
          how hard you pull relative to capacity, and how fast the tank
          empties.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg battery-c-rate-viz"
          role="img"
          aria-labelledby="bcr-viz-title bcr-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="bcr-viz-title">
            Battery C-rate animated discharge flow diagram
          </title>
          <desc id="bcr-viz-desc">
            Discharge current in amperes divided by battery capacity in
            amp-hours yields C-rate. Sample: 50 amperes from a 100 amp-hour
            pack is 0.5 C, about 2 hours to empty at constant current.
          </desc>

          <defs>
            <pattern
              id="bcr-viz-grid"
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
              id="bcr-viz-arrow"
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
              id="bcr-viz-pulse"
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
              id="bcr-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="bcr-viz-soc"
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
            fill="url(#bcr-viz-grid)"
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
            A ÷ Ah → C
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
              BATTERY CAPACITY
            </text>
            <text
              className="bcr-viz-ah-value"
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
              pack amp-hours
            </text>
            <text
              x="56"
              y="200"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              1C = 100 A reference
            </text>
          </g>

          {/* —— INPUT: Discharge current —— */}
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
              DISCHARGE CURRENT
            </text>
            <text
              className="bcr-viz-amps-value"
              x="56"
              y="318"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              50 A
            </text>
            <text
              x="56"
              y="348"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              continuous load
            </text>
            <text
              x="56"
              y="370"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              check datasheet max
            </text>
          </g>

          {/* —— Flow inputs → mid —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 147 L 320 147"
            fill="none"
            stroke="url(#bcr-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#bcr-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 317 L 320 317"
            fill="none"
            stroke="url(#bcr-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#bcr-viz-arrow)"
          />

          {/* —— CENTER: Discharge path —— */}
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
              CURRENT ÷ CAPACITY
            </text>

            {/* Pack */}
            <g transform="translate(360, 125)">
              <rect
                className="bcr-viz-pack"
                x="0"
                y="8"
                width="70"
                height="100"
                rx="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="24"
                y="0"
                width="22"
                height="8"
                rx="1"
                fill="currentColor"
                opacity="0.7"
              />
              <rect
                className="bcr-viz-soc-fill"
                x="6"
                y="30"
                width="58"
                height="70"
                rx="2"
                fill="url(#bcr-viz-soc)"
              />
              <text
                x="35"
                y="128"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                100 Ah
              </text>
            </g>

            {/* Current flow arrows out */}
            <path
              className="bcr-viz-current-path"
              d="M 450 175 L 520 175"
              fill="none"
              stroke="url(#bcr-viz-pulse)"
              strokeWidth="2.5"
              markerEnd="url(#bcr-viz-arrow)"
            />
            <circle
              className="bcr-viz-current-dot"
              cx="0"
              cy="0"
              r="5"
              fill="currentColor"
            />

            {/* Load / amps node */}
            <g transform="translate(540, 145)">
              <rect
                x="0"
                y="0"
                width="90"
                height="60"
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
                LOAD
              </text>
              <text
                className="bcr-viz-load-chip"
                x="45"
                y="46"
                textAnchor="middle"
                fill="#ededed"
                fontSize="16"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                50 A
              </text>
            </g>

            <text
              x="340"
              y="280"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              RATIO
            </text>
            <text
              className="bcr-viz-math-value"
              x="340"
              y="310"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              50 A ÷ 100 Ah
            </text>
            <rect
              x="340"
              y="328"
              width="280"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="bcr-viz-scale-bar"
              x="342"
              y="330"
              width="140"
              height="8"
              rx="1"
              fill="url(#bcr-viz-bar)"
            />
            <text
              x="340"
              y="364"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              half of 1C · ~2 h empty
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 232 L 700 232"
            fill="none"
            stroke="url(#bcr-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#bcr-viz-arrow)"
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
              DISCHARGE C-RATE
            </text>
            <text
              className="bcr-viz-output-value"
              x="720"
              y="155"
              fill="#ededed"
              fontSize="40"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.50
            </text>
            <text
              x="720"
              y="182"
              fill="#888888"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              C
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
              className="bcr-viz-output-bar"
              x="722"
              y="204"
              width="90"
              height="8"
              rx="1"
              fill="url(#bcr-viz-bar)"
            />

            <text
              x="720"
              y="248"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              TIME TO EMPTY
            </text>
            <text
              className="bcr-viz-runtime-value"
              x="720"
              y="278"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              ~2.0 h
            </text>
            <text
              x="720"
              y="310"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              120 min @ constant A
            </text>
            <text
              x="720"
              y="348"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ideal · ignore Peukert
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
              C-rate = A ÷ Ah · hours ≈ 1 / C
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
              50 A · 100 Ah → 0.50 C
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
