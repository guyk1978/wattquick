"use client";

import { cn } from "@/lib/utils";

interface CampingFridgeRuntimeVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for 12V Camping Fridge Runtime [VIZ].
 * Runtime h = (battery Wh ÷ adjusted Wh/day) × 24; ambient scales daily draw.
 * Sample: 1,200 Wh · 350 Wh/day · hot 1.35× → 473 Wh/day · 61 h (~2.5 days).
 */
export function CampingFridgeRuntimeViz({
  className,
}: CampingFridgeRuntimeVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--camping-fridge-runtime", className)}
      aria-label="12V camping fridge runtime visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">12V Camping Fridge Runtime</h3>
        <p className="tool-viz__subtitle">
          Battery watt-hours divided by ambient-adjusted daily draw estimates
          how many days the compressor fridge stays cold off-grid.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg camping-fridge-runtime-viz"
          role="img"
          aria-labelledby="cfr-viz-title cfr-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="cfr-viz-title">
            12V camping fridge runtime animated flow diagram
          </title>
          <desc id="cfr-viz-desc">
            Battery energy in watt-hours is divided by ambient-adjusted daily
            fridge consumption to estimate runtime. Sample: a 1200 watt-hour
            bank with a 350 watt-hour per day fridge rating at hot ambient
            1.35 times factor draws about 473 watt-hours per day and lasts
            roughly 61 hours or 2.5 days.
          </desc>

          <defs>
            <pattern
              id="cfr-viz-grid"
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
              id="cfr-viz-arrow"
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
              id="cfr-viz-pulse"
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
              id="cfr-viz-bank"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient
              id="cfr-viz-bar"
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
            fill="url(#cfr-viz-grid)"
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
            x="350"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            DUTY · DISCHARGE
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

          {/* —— INPUT: Battery —— */}
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
              BATTERY ENERGY
            </text>
            <text
              x="56"
              y="140"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,200 Wh
            </text>
            <g transform="translate(56, 160)">
              <rect
                x="0"
                y="6"
                width="44"
                height="32"
                rx="2"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <rect x="14" y="0" width="16" height="6" rx="1" fill="currentColor" />
              <rect
                className="cfr-viz-bank-fill"
                x="4"
                y="10"
                width="36"
                height="24"
                rx="1"
                fill="url(#cfr-viz-bank)"
              />
              <text
                x="56"
                y="26"
                fill="#888888"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                12 V house / AGM / LFP
              </text>
            </g>
          </g>

          {/* —— INPUT: Fridge + ambient —— */}
          <g>
            <rect
              x="40"
              y="240"
              width="230"
              height="188"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="266"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              FRIDGE RATED USE
            </text>
            <text
              x="56"
              y="306"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              350 Wh/day
            </text>
            <text
              x="56"
              y="334"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              lab rating @ 77°F
            </text>
            <text
              x="56"
              y="370"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Hot · 1.35×
            </text>
            <text
              x="56"
              y="398"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              85°F+ ambient heat
            </text>
          </g>

          {/* —— Flow: inputs → mid —— */}
          <path
            d="M 270 147 L 320 147"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#cfr-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 147 L 320 147"
            fill="none"
            stroke="url(#cfr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 334 L 300 334 L 300 200 L 320 200"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#cfr-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 334 L 300 334 L 300 200 L 320 200"
            fill="none"
            stroke="url(#cfr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Adjusted daily —— */}
          <g>
            <rect
              x="330"
              y="72"
              width="300"
              height="150"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ADJUSTED DAILY DRAW
            </text>
            <text
              x="346"
              y="124"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              rated × ambient factor
            </text>
            <text
              x="346"
              y="164"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="cfr-viz-draw-value"
            >
              473 Wh/day
            </text>
            <text
              x="346"
              y="196"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              350 × 1.35 · higher duty
            </text>
          </g>

          {/* —— FLOW: Fridge + discharge —— */}
          <g>
            <rect
              x="330"
              y="240"
              width="300"
              height="188"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="266"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              COMPRESSOR DUTY
            </text>

            {/* Fridge glyph */}
            <g transform="translate(360, 290)">
              <rect
                className="cfr-viz-fridge"
                x="0"
                y="0"
                width="56"
                height="80"
                rx="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line x1="0" y1="36" x2="56" y2="36" stroke="#333333" strokeWidth="1" />
              <rect x="44" y="16" width="4" height="12" rx="1" fill="currentColor" />
              <rect x="44" y="48" width="4" height="12" rx="1" fill="#555555" />
              <path
                className="cfr-viz-cool"
                d="M 70 20 Q 82 28 70 36"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <path
                className="cfr-viz-cool"
                d="M 74 40 Q 86 48 74 56"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                opacity="0.6"
              />
            </g>

            <text
              x="460"
              y="320"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              Wh ÷ Wh/day × 24
            </text>
            <rect
              x="460"
              y="340"
              width="140"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="cfr-viz-drain-bar"
              x="462"
              y="342"
              width="110"
              height="8"
              rx="1"
              fill="url(#cfr-viz-bar)"
            />
            <text
              x="460"
              y="380"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              1,200 ÷ 473 × 24
            </text>
            <text
              x="460"
              y="404"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              cool 0.85 · mild 1.0 · hot 1.35
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            d="M 630 147 L 680 147"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#cfr-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 147 L 680 147"
            fill="none"
            stroke="url(#cfr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 630 334 L 655 334 L 655 230 L 680 230"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#cfr-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 334 L 655 334 L 655 230 L 680 230"
            fill="none"
            stroke="url(#cfr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="690"
              y="72"
              width="230"
              height="356"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="706"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ESTIMATED RUNTIME
            </text>
            <text
              x="706"
              y="156"
              fill="#ededed"
              fontSize="40"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="cfr-viz-output-value"
            >
              2d 13h
            </text>
            <text
              x="706"
              y="190"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
            >
              61 hours
            </text>
            <text
              x="706"
              y="218"
              fill="#888888"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              ≈ 2.5 days
            </text>

            <rect
              x="706"
              y="240"
              width="198"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="cfr-viz-runtime-bar"
              x="708"
              y="242"
              width="130"
              height="8"
              rx="1"
              fill="url(#cfr-viz-bar)"
            />

            <text
              x="706"
              y="290"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              vs MILD AMBIENT
            </text>
            <text
              x="706"
              y="322"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              3.4 days
            </text>
            <text
              x="706"
              y="350"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              82 h at 1.0× (350 Wh/day)
            </text>
            <text
              x="706"
              y="400"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="cfr-viz-output-value"
            >
              −0.9 day in heat
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
              rated Wh/day × ambient → draw · Wh ÷ draw × 24 → hours
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
              1,200 Wh · hot 1.35× → 61 h · 2d 13h
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
