"use client";

import { cn } from "@/lib/utils";

interface EbikeBatteryCRateVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for E-Bike Battery C-Rating [VIZ].
 * I_max = Ah × C.
 * Sample: 10 Ah · 2C → 20 A continuous (18 A motor within rating).
 */
export function EbikeBatteryCRateViz({ className }: EbikeBatteryCRateVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ebike-battery-c-rate", className)}
      aria-label="E-bike battery C-rating visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">E-Bike Battery C-Rating</h3>
        <p className="tool-viz__subtitle">
          Pack amp-hours times continuous C-rating sets the max safe amps for
          your controller — stay under that ceiling to protect the cells.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ebike-battery-c-rate-viz"
          role="img"
          aria-labelledby="ebcr-viz-title ebcr-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ebcr-viz-title">
            E-bike battery C-rating animated conversion diagram
          </title>
          <desc id="ebcr-viz-desc">
            Pack capacity in amp-hours multiplied by continuous C-rating yields
            maximum continuous current in amperes. Sample: 10 amp-hours at 2 C
            equals 20 amperes continuous.
          </desc>

          <defs>
            <pattern
              id="ebcr-viz-grid"
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
              id="ebcr-viz-arrow"
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
              id="ebcr-viz-pulse"
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
              id="ebcr-viz-bar"
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
            fill="url(#ebcr-viz-grid)"
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
            Ah × C → A
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
              PACK CAPACITY
            </text>
            <text
              className="ebcr-viz-ah-value"
              x="56"
              y="148"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10 Ah
            </text>
            <text
              x="56"
              y="178"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              lithium pack
            </text>
            <text
              x="56"
              y="200"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              nameplate amp-hours
            </text>
          </g>

          {/* —— INPUT: C-rating —— */}
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
              CONTINUOUS C-RATING
            </text>
            <text
              className="ebcr-viz-c-value"
              x="56"
              y="318"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              2 C
            </text>
            <text
              x="56"
              y="348"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              discharge class
            </text>
            <text
              x="56"
              y="370"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              typical 1C–3C e-bike
            </text>
          </g>

          {/* —— Flow —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 147 L 320 147"
            fill="none"
            stroke="url(#ebcr-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebcr-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 317 L 320 317"
            fill="none"
            stroke="url(#ebcr-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebcr-viz-arrow)"
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
              DISCHARGE PATH
            </text>

            {/* Ah node */}
            <g transform="translate(360, 120)">
              <circle
                className="ebcr-viz-node"
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <text
                x="40"
                y="34"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                Ah
              </text>
              <text
                className="ebcr-viz-ah-chip"
                x="40"
                y="52"
                textAnchor="middle"
                fill="#ededed"
                fontSize="16"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                10
              </text>
            </g>

            <text
              x="470"
              y="168"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              ×
            </text>

            {/* C node */}
            <g transform="translate(510, 120)">
              <circle
                className="ebcr-viz-node"
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <text
                x="40"
                y="34"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                C
              </text>
              <text
                className="ebcr-viz-c-chip"
                x="40"
                y="52"
                textAnchor="middle"
                fill="#ededed"
                fontSize="16"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                2
              </text>
            </g>

            <path
              className="tool-viz-flow__pulse"
              d="M 490 210 L 490 238"
              fill="none"
              stroke="url(#ebcr-viz-pulse)"
              strokeWidth="2"
              markerEnd="url(#ebcr-viz-arrow)"
            />

            {/* Current rail */}
            <g transform="translate(380, 248)">
              <rect
                x="0"
                y="0"
                width="200"
                height="50"
                rx="3"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <path
                className="ebcr-viz-current-flow"
                d="M 24 25 H 176"
                fill="none"
                stroke="url(#ebcr-viz-pulse)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle
                className="ebcr-viz-node"
                cx="24"
                cy="25"
                r="4"
                fill="currentColor"
              />
              <circle
                className="ebcr-viz-node"
                cx="176"
                cy="25"
                r="4"
                fill="currentColor"
              />
              <text
                className="ebcr-viz-a-chip"
                x="100"
                y="44"
                textAnchor="middle"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                20 A
              </text>
            </g>

            {/* Motor compare */}
            <text
              x="340"
              y="330"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              MOTOR DRAW vs LIMIT
            </text>
            <text
              x="340"
              y="352"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              18 A motor
            </text>
            <rect
              x="430"
              y="342"
              width="200"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="ebcr-viz-motor-bar"
              x="432"
              y="344"
              width="160"
              height="6"
              rx="1"
              fill="url(#ebcr-viz-bar)"
            />
            <text
              className="ebcr-viz-math-value"
              x="340"
              y="378"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10 × 2 = 20 A · OK (+10%)
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 232 L 700 232"
            fill="none"
            stroke="url(#ebcr-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebcr-viz-arrow)"
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
              MAX CONTINUOUS
            </text>
            <text
              className="ebcr-viz-output-value"
              x="720"
              y="155"
              fill="#ededed"
              fontSize="40"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              20
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
              className="ebcr-viz-output-bar"
              x="722"
              y="204"
              width="150"
              height="8"
              rx="1"
              fill="url(#ebcr-viz-bar)"
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
              className="ebcr-viz-detail-value"
              x="720"
              y="278"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10 Ah × 2 C
            </text>
            <text
              x="720"
              y="310"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              controller ceiling
            </text>
            <text
              x="720"
              y="348"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              heat · cell life
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
              I_max = Ah × C
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
              10 Ah · 2 C → 20 A
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
