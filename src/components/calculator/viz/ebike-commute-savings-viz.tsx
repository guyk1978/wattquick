"use client";

import { cn } from "@/lib/utils";

interface EbikeCommuteSavingsVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for E-Bike Commute Savings [VIZ].
 * Annual km = one-way × 2 × days; e-bike $ = km × 12 Wh/km × rate;
 * car $ = km × $/km; save = car − e-bike.
 * Sample: 8 km · 220 days → 3,520 km · car $634 · e-bike $5.91 · save $628/yr.
 */
export function EbikeCommuteSavingsViz({
  className,
}: EbikeCommuteSavingsVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ebike-commute-savings", className)}
      aria-label="E-bike commute savings visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">E-Bike Commute Savings</h3>
        <p className="tool-viz__subtitle">
          Same annual kilometers, two bills — car fuel and wear versus a few
          kilowatt-hours on the e-bike — with the gap as what you keep each
          year.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ebike-commute-savings-viz"
          role="img"
          aria-labelledby="ebcs-viz-title ebcs-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ebcs-viz-title">
            E-bike commute savings animated comparison diagram
          </title>
          <desc id="ebcs-viz-desc">
            One-way commute distance and days per year yield annual kilometers,
            then car cost versus e-bike electricity cost. Sample: 8 kilometers
            one way for 220 days is 3,520 kilometers yearly, about 634 dollars
            by car and 5.91 dollars by e-bike, saving about 628 dollars.
          </desc>

          <defs>
            <pattern
              id="ebcs-viz-grid"
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
              id="ebcs-viz-arrow"
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
              id="ebcs-viz-pulse"
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
              id="ebcs-viz-bar"
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
            fill="url(#ebcs-viz-grid)"
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
            CAR vs E-BIKE
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

          {/* —— INPUT: Distance —— */}
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
              ONE-WAY COMMUTE
            </text>
            <text
              className="ebcs-viz-km-value"
              x="56"
              y="140"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              8 km
            </text>
          </g>

          {/* —— INPUT: Days —— */}
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
              COMMUTE DAYS / YEAR
            </text>
            <text
              className="ebcs-viz-days-value"
              x="56"
              y="256"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              220
            </text>
          </g>

          {/* —— INPUT: Rates —— */}
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
              COST RATES
            </text>
            <text
              className="ebcs-viz-rates-value"
              x="56"
              y="362"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.18/km · $0.14/kWh
            </text>
          </g>

          {/* —— Flow —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 122 L 320 122"
            fill="none"
            stroke="url(#ebcs-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebcs-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 238 L 320 238"
            fill="none"
            stroke="url(#ebcs-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebcs-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 348 L 320 348"
            fill="none"
            stroke="url(#ebcs-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebcs-viz-arrow)"
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
              ANNUAL ENERGY COST
            </text>

            <text
              className="ebcs-viz-km-chip"
              x="340"
              y="124"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              8 × 2 × 220 = 3,520 km/yr
            </text>

            {/* Car card */}
            <g transform="translate(350, 140)">
              <rect
                className="ebcs-viz-car-card"
                x="0"
                y="0"
                width="130"
                height="110"
                rx="4"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <text
                x="16"
                y="28"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                CAR
              </text>
              <text
                className="ebcs-viz-car-cost"
                x="16"
                y="64"
                fill="#ededed"
                fontSize="24"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                $634
              </text>
              <text
                x="16"
                y="88"
                fill="#888888"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                /yr
              </text>
              <text
                x="16"
                y="104"
                fill="#666666"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                fuel + wear
              </text>
            </g>

            <text
              x="490"
              y="200"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              −
            </text>

            {/* E-bike card */}
            <g transform="translate(510, 140)">
              <rect
                className="ebcs-viz-bike-card"
                x="0"
                y="0"
                width="130"
                height="110"
                rx="4"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <text
                x="16"
                y="28"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                E-BIKE
              </text>
              <text
                className="ebcs-viz-bike-cost"
                x="16"
                y="64"
                fill="#ededed"
                fontSize="24"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                $5.91
              </text>
              <text
                x="16"
                y="88"
                fill="#888888"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                /yr
              </text>
              <text
                x="16"
                y="104"
                fill="#666666"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                ~42 kWh
              </text>
            </g>

            {/* Cost bars */}
            <text
              x="340"
              y="290"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              COST BARS
            </text>
            <text
              x="340"
              y="314"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              CAR
            </text>
            <rect
              x="380"
              y="304"
              width="250"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="ebcs-viz-car-bar"
              x="382"
              y="306"
              width="236"
              height="6"
              rx="1"
              fill="url(#ebcs-viz-bar)"
            />
            <text
              x="340"
              y="342"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              BIKE
            </text>
            <rect
              x="380"
              y="332"
              width="250"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="ebcs-viz-bike-bar"
              x="382"
              y="334"
              width="8"
              height="6"
              rx="1"
              fill="url(#ebcs-viz-bar)"
            />

            <text
              className="ebcs-viz-math-value"
              x="340"
              y="372"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $634 − $5.91 = $628 /yr
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 232 L 700 232"
            fill="none"
            stroke="url(#ebcs-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebcs-viz-arrow)"
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
              SAVINGS VS CAR
            </text>
            <text
              className="ebcs-viz-output-value"
              x="720"
              y="150"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $628
            </text>
            <text
              x="720"
              y="176"
              fill="#888888"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              /yr
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
              className="ebcs-viz-output-bar"
              x="722"
              y="198"
              width="165"
              height="8"
              rx="1"
              fill="url(#ebcs-viz-bar)"
            />

            <text
              x="720"
              y="240"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              DETAIL
            </text>
            <text
              className="ebcs-viz-detail-value"
              x="720"
              y="272"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              3,520 km · e-bike $5.91
            </text>
            <text
              x="720"
              y="304"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              ~12 Wh/km charge
            </text>
            <text
              x="720"
              y="348"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              energy only
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
              save = car $/yr − e-bike $/yr
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
              8 km · 220 days → $628/yr
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
