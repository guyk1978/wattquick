"use client";

import { cn } from "@/lib/utils";

interface BatteryCostVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Battery Cost Estimator [VIZ].
 * Cost = Ah × V × $/Wh.
 * Sample: 100 Ah · 12 V · $0.15/Wh → 1,200 Wh · $180.
 */
export function BatteryCostViz({ className }: BatteryCostVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--battery-cost", className)}
      aria-label="Battery cost estimator visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Battery Cost Estimator</h3>
        <p className="tool-viz__subtitle">
          Amp-hours and voltage set pack energy in watt-hours — multiply by
          price per Wh to compare packs fairly and estimate acquisition cost.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg battery-cost-viz"
          role="img"
          aria-labelledby="bco-viz-title bco-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="bco-viz-title">
            Battery cost estimator animated flow diagram
          </title>
          <desc id="bco-viz-desc">
            Capacity in amp-hours multiplied by voltage yields watt-hours,
            which multiply by price per watt-hour for total pack cost. Sample:
            a 100 amp-hour 12 volt pack at 15 cents per watt-hour stores 1,200
            watt-hours and costs 180 dollars.
          </desc>

          <defs>
            <pattern
              id="bco-viz-grid"
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
              id="bco-viz-arrow"
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
              id="bco-viz-pulse"
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
              id="bco-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="bco-viz-soc"
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
            fill="url(#bco-viz-grid)"
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
            Ah × V → Wh × $/Wh
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
              CAPACITY
            </text>
            <text
              className="bco-viz-ah-value"
              x="56"
              y="138"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              100 Ah
            </text>
            <text
              x="56"
              y="160"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              amp-hour rating
            </text>
          </g>

          {/* —— INPUT: Voltage —— */}
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
              VOLTAGE
            </text>
            <text
              className="bco-viz-v-value"
              x="56"
              y="254"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              12 V
            </text>
            <text
              x="56"
              y="276"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              nominal pack voltage
            </text>
          </g>

          {/* —— INPUT: Price/Wh —— */}
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
              PRICE PER WH
            </text>
            <text
              className="bco-viz-price-value"
              x="56"
              y="370"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.15
            </text>
            <text
              x="56"
              y="392"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              $/Wh · LiFePO₄ typical
            </text>
          </g>

          {/* —— Flow inputs → mid —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 122 L 320 122"
            fill="none"
            stroke="url(#bco-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#bco-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 238 L 320 238"
            fill="none"
            stroke="url(#bco-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#bco-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 354 L 320 354"
            fill="none"
            stroke="url(#bco-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#bco-viz-arrow)"
          />

          {/* —— CENTER: Energy scaling path —— */}
          <g>
            <rect
              x="320"
              y="72"
              width="340"
              height="332"
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
              ENERGY · COST PATH
            </text>

            {/* Ah × V nodes */}
            <g transform="translate(350, 120)">
              <rect
                x="0"
                y="0"
                width="72"
                height="52"
                rx="3"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <text
                x="36"
                y="22"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                Ah
              </text>
              <text
                className="bco-viz-ah-chip"
                x="36"
                y="40"
                textAnchor="middle"
                fill="#ededed"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                100
              </text>
            </g>

            <text
              x="440"
              y="152"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              ×
            </text>

            <g transform="translate(460, 120)">
              <rect
                x="0"
                y="0"
                width="72"
                height="52"
                rx="3"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <text
                x="36"
                y="22"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                V
              </text>
              <text
                className="bco-viz-v-chip"
                x="36"
                y="40"
                textAnchor="middle"
                fill="#ededed"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                12
              </text>
            </g>

            <path
              className="tool-viz-flow__pulse"
              d="M 545 146 L 575 146"
              fill="none"
              stroke="url(#bco-viz-pulse)"
              strokeWidth="2"
              markerEnd="url(#bco-viz-arrow)"
            />

            {/* Wh result + battery glyph */}
            <g transform="translate(585, 112)">
              <rect
                className="bco-viz-pack"
                x="8"
                y="12"
                width="48"
                height="64"
                rx="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="22"
                y="6"
                width="20"
                height="7"
                rx="1"
                fill="currentColor"
                opacity="0.7"
              />
              <rect
                className="bco-viz-soc-fill"
                x="12"
                y="28"
                width="40"
                height="42"
                rx="2"
                fill="url(#bco-viz-soc)"
              />
            </g>

            <text
              className="bco-viz-wh-value"
              x="490"
              y="220"
              textAnchor="middle"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,200 Wh
            </text>
            <text
              x="490"
              y="242"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              energy capacity
            </text>

            <path
              className="tool-viz-flow__pulse"
              d="M 490 258 L 490 278"
              fill="none"
              stroke="url(#bco-viz-pulse)"
              strokeWidth="2"
              markerEnd="url(#bco-viz-arrow)"
            />

            <text
              x="340"
              y="310"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              × UNIT COST
            </text>
            <text
              className="bco-viz-math-value"
              x="340"
              y="338"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,200 × $0.15
            </text>
            <rect
              x="340"
              y="356"
              width="280"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="bco-viz-scale-bar"
              x="342"
              y="358"
              width="200"
              height="8"
              rx="1"
              fill="url(#bco-viz-bar)"
            />
            <text
              x="340"
              y="390"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              compare packs by $/Wh
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 238 L 700 238"
            fill="none"
            stroke="url(#bco-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#bco-viz-arrow)"
          />

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="700"
              y="72"
              width="220"
              height="332"
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
              ESTIMATED COST
            </text>
            <text
              className="bco-viz-output-value"
              x="720"
              y="160"
              fill="#ededed"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $180
            </text>
            <text
              x="720"
              y="188"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              pack acquisition
            </text>

            <rect
              x="720"
              y="210"
              width="180"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="bco-viz-output-bar"
              x="722"
              y="212"
              width="150"
              height="8"
              rx="1"
              fill="url(#bco-viz-bar)"
            />

            <text
              x="720"
              y="256"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BREAKDOWN
            </text>
            <text
              className="bco-viz-detail-value"
              x="720"
              y="286"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,200 Wh
            </text>
            <text
              x="720"
              y="312"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              × $0.15 / Wh
            </text>
            <text
              x="720"
              y="348"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              check cycle life too
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
              Ah × V → Wh × $/Wh → pack cost
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
              100 Ah · 12 V · $0.15 → $180
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
