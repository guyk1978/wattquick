"use client";

import { cn } from "@/lib/utils";

interface EvBatteryDepletionValueLossVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for EV Battery Depletion & Value Loss [VIZ].
 * Fade → SoH; $ lost ≈ MSRP × 38% pack share × capacity loss %.
 * Sample: $45,000 · 52k mi · 4 yr · rarely
 * → SoH 87.1% · −$2,206 · current $42,794.
 */
export function EvBatteryDepletionValueLossViz({
  className,
}: EvBatteryDepletionValueLossVizProps) {
  return (
    <section
      className={cn(
        "tool-viz tool-viz--ev-battery-depletion-value-loss",
        className
      )}
      aria-label="EV battery depletion and value loss visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Battery Value Loss</h3>
        <p className="tool-viz__subtitle">
          Age and miles fade pack capacity — that SoH gap times the battery
          share of purchase price is the dollars left on the table.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ev-battery-depletion-value-loss-viz"
          role="img"
          aria-labelledby="ebv-viz-title ebv-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ebv-viz-title">
            EV battery depletion and value loss animated diagram
          </title>
          <desc id="ebv-viz-desc">
            Purchase price, mileage, age, and DC fast-charging habits estimate
            state of health, then convert capacity fade into battery value lost
            and estimated current value. Sample: 45,000 dollars purchase, 52,000
            miles, 4 years, rare fast charging yields about 87.1 percent SoH,
            2,206 dollars lost, and 42,794 dollars remaining.
          </desc>

          <defs>
            <pattern
              id="ebv-viz-grid"
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
              id="ebv-viz-arrow"
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
              id="ebv-viz-pulse"
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
              id="ebv-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="ebv-viz-fade"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.75" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.12" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#ebv-viz-grid)"
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
            FADE → $
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

          {/* —— INPUT: Purchase —— */}
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
              y="96"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PURCHASE PRICE
            </text>
            <text
              className="ebv-viz-price-value"
              x="56"
              y="140"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $45,000
            </text>
          </g>

          {/* —— INPUT: Mileage —— */}
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
              y="212"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CURRENT MILEAGE
            </text>
            <text
              className="ebv-viz-mi-value"
              x="56"
              y="256"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              52,000 mi
            </text>
          </g>

          {/* —— INPUT: Age / DCFC —— */}
          <g>
            <rect
              x="40"
              y="304"
              width="230"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="328"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              AGE · DCFC
            </text>
            <text
              className="ebv-viz-age-value"
              x="56"
              y="362"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              4 yr · rarely
            </text>
          </g>

          {/* —— Flow —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 122 L 320 122"
            fill="none"
            stroke="url(#ebv-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebv-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 238 L 320 238"
            fill="none"
            stroke="url(#ebv-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebv-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 348 L 320 348"
            fill="none"
            stroke="url(#ebv-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebv-viz-arrow)"
          />

          {/* —— CENTER: Depreciation path —— */}
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
              DEPRECIATION PATH
            </text>

            {/* MSRP chip */}
            <g transform="translate(340, 118)">
              <rect
                className="ebv-viz-msrp-card"
                x="0"
                y="0"
                width="110"
                height="70"
                rx="3"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <text
                x="12"
                y="24"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                MSRP
              </text>
              <text
                className="ebv-viz-msrp-chip"
                x="12"
                y="50"
                fill="#ededed"
                fontSize="16"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                $45k
              </text>
            </g>

            <path
              className="tool-viz-flow__pulse"
              d="M 450 153 L 480 153"
              fill="none"
              stroke="url(#ebv-viz-pulse)"
              strokeWidth="2"
              markerEnd="url(#ebv-viz-arrow)"
            />

            {/* Fade / SoH */}
            <g transform="translate(480, 118)">
              <rect
                className="ebv-viz-soh-card"
                x="0"
                y="0"
                width="110"
                height="70"
                rx="3"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <text
                x="12"
                y="24"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                SoH
              </text>
              <text
                className="ebv-viz-soh-chip"
                x="12"
                y="50"
                fill="#ededed"
                fontSize="16"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                87.1%
              </text>
            </g>

            {/* Fade factors */}
            <text
              x="340"
              y="220"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              CAPACITY FADE · 12.9%
            </text>
            <text
              x="340"
              y="242"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              cal 9.2% · mi 1.7% · DCFC 2.0%
            </text>

            {/* Value bars: purchase vs remaining */}
            <text
              x="340"
              y="272"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              ASSET VALUE
            </text>
            <text
              x="340"
              y="296"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              NEW
            </text>
            <rect
              x="390"
              y="286"
              width="240"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="ebv-viz-new-bar"
              x="392"
              y="288"
              width="236"
              height="6"
              rx="1"
              fill="url(#ebv-viz-bar)"
            />
            <text
              x="340"
              y="324"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              NOW
            </text>
            <rect
              x="390"
              y="314"
              width="240"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="ebv-viz-now-bar"
              x="392"
              y="316"
              width="224"
              height="6"
              rx="1"
              fill="url(#ebv-viz-fade)"
            />

            <text
              className="ebv-viz-math-value"
              x="340"
              y="356"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $45k × 38% × 12.9% ≈ $2,206
            </text>
            <text
              x="340"
              y="378"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              pack share × capacity fade
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 232 L 700 232"
            fill="none"
            stroke="url(#ebv-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebv-viz-arrow)"
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
              CURRENT VALUE
            </text>
            <text
              className="ebv-viz-output-value"
              x="720"
              y="150"
              fill="#ededed"
              fontSize="30"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $42,794
            </text>
            <text
              x="720"
              y="176"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              estimated
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
              className="ebv-viz-output-bar"
              x="722"
              y="198"
              width="160"
              height="8"
              rx="1"
              fill="url(#ebv-viz-bar)"
            />

            <text
              x="720"
              y="240"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BATTERY VALUE LOST
            </text>
            <text
              className="ebv-viz-loss-value"
              x="720"
              y="272"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              −$2,206
            </text>
            <text
              className="ebv-viz-detail-value"
              x="720"
              y="304"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              SoH 87.1% · Good
            </text>
            <text
              x="720"
              y="348"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              not a formal appraisal
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
              $ lost = MSRP × 38% × fade%
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
              $45k · 52k mi · 4 yr → $42,794
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
