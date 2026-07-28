"use client";

import { cn } from "@/lib/utils";

interface EscooterCostPerKmVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for E-Scooter Cost per km [VIZ].
 * cost/km = (Wh/km ÷ 1000) × $/kWh; weekly = cost/km × weeklyKm.
 * Sample: 15 Wh/km · $0.14/kWh · 40 km/wk → $0.0021/km · $0.08/wk · ~$1,296/yr vs transit.
 */
export function EscooterCostPerKmViz({ className }: EscooterCostPerKmVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--escooter-cost-per-km", className)}
      aria-label="E-scooter cost per kilometre visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Cost per Kilometre</h3>
        <p className="tool-viz__subtitle">
          Watt-hours per kilometre times the local tariff set the cash burned
          for every kilometre — then scale by weekly distance and transit fare.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg escooter-cost-per-km-viz"
          role="img"
          aria-labelledby="escpk-viz-title escpk-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="escpk-viz-title">
            E-scooter cost per kilometre animated flow diagram
          </title>
          <desc id="escpk-viz-desc">
            Consumption in watt-hours per kilometre and electricity rate in
            dollars per kilowatt-hour yield cost per kilometre. Weekly commute
            kilometres and transit fare scale to weekly and annual operating
            costs. Sample: 15 watt-hours per kilometre at 0.14 dollars per
            kilowatt-hour is 0.0021 dollars per kilometre, about 0.08 dollars
            weekly, versus roughly 25 dollars weekly transit and about 1,296
            dollars annual savings.
          </desc>

          <defs>
            <pattern
              id="escpk-viz-grid"
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
              id="escpk-viz-arrow"
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
              id="escpk-viz-pulse"
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
              id="escpk-viz-cost"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="escpk-viz-transit"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#888888" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#888888" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#escpk-viz-grid)"
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
            rx="4"
          />

          {/* —— INPUT: Consumption —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="220"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CONSUMPTION
            </text>
            <text
              className="escpk-viz-wh-value"
              x="56"
              y="102"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              15 Wh/km
            </text>
            <text
              x="56"
              y="124"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              energy per distance
            </text>
          </g>

          {/* —— INPUT: Electricity rate —— */}
          <g>
            <rect
              x="40"
              y="156"
              width="220"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="182"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ELECTRICITY RATE
            </text>
            <text
              className="escpk-viz-rate-value"
              x="56"
              y="218"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.14/kWh
            </text>
            <text
              x="56"
              y="240"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              local tariff
            </text>
          </g>

          {/* —— INPUT: Advanced —— */}
          <g>
            <rect
              x="40"
              y="272"
              width="220"
              height="130"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="298"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ADVANCED · COMMUTE
            </text>
            <text
              className="escpk-viz-adv-value"
              x="56"
              y="334"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              40 km/wk
            </text>
            <text
              x="56"
              y="358"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              transit $2.50 / trip
            </text>
            <text
              x="56"
              y="380"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              × 10 trips / week est.
            </text>
          </g>

          {/* Flow: inputs → cost path */}
          <path
            d="M 260 90 L 310 90"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#escpk-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 90 L 310 90"
            fill="none"
            stroke="url(#escpk-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 206 L 290 206 L 290 150 L 310 150"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#escpk-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 206 L 290 206 L 290 150 L 310 150"
            fill="none"
            stroke="url(#escpk-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 337 L 290 337 L 290 210 L 310 210"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#escpk-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 337 L 290 337 L 290 210 L 310 210"
            fill="none"
            stroke="url(#escpk-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ animationDelay: "0.7s" }}
          />

          {/* —— FLOW: Cost scaling path —— */}
          <g>
            <rect
              x="320"
              y="40"
              width="340"
              height="362"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="336"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              COST SCALING PATH
            </text>

            {/* Wh/km chip */}
            <g className="escpk-viz-chip" transform="translate(348, 88)">
              <rect
                width="100"
                height="56"
                rx="3"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <text
                x="50"
                y="24"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                ENERGY
              </text>
              <text
                x="50"
                y="42"
                textAnchor="middle"
                fill="#ededed"
                fontSize="13"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                0.015 kWh
              </text>
            </g>

            <path
              d="M 448 116 L 488 116"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#escpk-viz-arrow)"
            />
            <path
              className="tool-viz-flow__pulse"
              d="M 448 116 L 488 116"
              fill="none"
              stroke="url(#escpk-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text
              x="468"
              y="106"
              textAnchor="middle"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              ×
            </text>

            {/* Rate chip */}
            <g className="escpk-viz-chip" transform="translate(498, 88)">
              <rect
                width="100"
                height="56"
                rx="3"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <text
                x="50"
                y="24"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                TARIFF
              </text>
              <text
                x="50"
                y="42"
                textAnchor="middle"
                fill="#ededed"
                fontSize="13"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                $0.14
              </text>
            </g>

            {/* Distance ruler with $ ticks */}
            <g transform="translate(348, 172)">
              <line
                className="escpk-viz-road"
                x1="0"
                y1="40"
                x2="284"
                y2="40"
                stroke="#444444"
                strokeWidth="2"
              />
              <circle
                className="escpk-viz-scooter"
                cx="24"
                cy="40"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="24" cy="40" r="5" fill="none" stroke="#555555" />
              <path
                className="escpk-viz-coin-trail"
                d="M 48 28 L 90 20 L 140 24 L 190 16 L 240 22 L 280 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeDasharray="4 6"
              />
              <text
                x="142"
                y="68"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                each km burns a fraction of a cent
              </text>
            </g>

            {/* Math */}
            <rect
              x="344"
              y="268"
              width="292"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="360"
              y="290"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              PER-KM FORMULA
            </text>
            <text
              className="escpk-viz-math-value"
              x="360"
              y="310"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              (15 ÷ 1000) × $0.14 = $0.0021
            </text>

            {/* Weekly scale bar */}
            <text
              x="360"
              y="350"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              WEEKLY SCALE · 40 km
            </text>
            <rect
              x="360"
              y="362"
              width="260"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="escpk-viz-week-bar"
              x="360"
              y="362"
              width="40"
              height="10"
              rx="2"
              fill="url(#escpk-viz-cost)"
            />
            <text
              x="408"
              y="370"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              dominantBaseline="middle"
            >
              scooter $0.08
            </text>
          </g>

          {/* Flow → outputs */}
          <path
            d="M 660 180 L 700 180"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#escpk-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 180 L 700 180"
            fill="none"
            stroke="url(#escpk-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 660 300 L 680 300 L 680 320 L 700 320"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#escpk-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 660 300 L 680 300 L 680 320 L 700 320"
            fill="none"
            stroke="url(#escpk-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Cost per km —— */}
          <g>
            <rect
              x="710"
              y="40"
              width="210"
              height="160"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              COST PER KM
            </text>
            <text
              className="escpk-viz-output-value"
              x="726"
              y="110"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.0021
            </text>
            <text
              x="726"
              y="134"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ≈ 0.21 ¢ / km
            </text>
            <rect
              x="726"
              y="152"
              width="162"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="escpk-viz-cost-bar"
              x="726"
              y="152"
              width="48"
              height="10"
              rx="2"
              fill="url(#escpk-viz-cost)"
            />
            <text
              className="escpk-viz-detail-value"
              x="726"
              y="184"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              marginal electricity
            </text>
          </g>

          {/* —— OUTPUT: Weekly / annual —— */}
          <g>
            <rect
              x="710"
              y="216"
              width="210"
              height="186"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="242"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              WEEKLY SCOOTER
            </text>
            <text
              className="escpk-viz-week-value"
              x="726"
              y="276"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.08
            </text>
            <text
              x="726"
              y="298"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              transit est. $25.00 / wk
            </text>
            <rect
              x="726"
              y="312"
              width="162"
              height="8"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="escpk-viz-transit-bar"
              x="726"
              y="312"
              width="162"
              height="8"
              rx="2"
              fill="url(#escpk-viz-transit)"
            />
            <text
              x="726"
              y="348"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              ANNUAL VS TRANSIT
            </text>
            <text
              className="escpk-viz-save-value"
              x="726"
              y="380"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $1,296
            </text>
          </g>

          {/* —— Footer —— */}
          <g>
            <rect
              x="40"
              y="428"
              width="880"
              height="92"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="454"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              OPERATING COST AT A GLANCE
            </text>
            <line
              x1="56"
              y1="478"
              x2="880"
              y2="478"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <circle
              className="escpk-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="escpk-viz-tick"
              cx="320"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.7"
            />
            <circle
              className="escpk-viz-tick"
              cx="600"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.5"
            />
            <circle
              className="escpk-viz-tick escpk-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="escpk-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#escpk-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <text
              x="56"
              y="502"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              Wh/km × tariff
            </text>
            <text
              x="600"
              y="502"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              weekly km scales the bill
            </text>
            <text
              className="escpk-viz-detail-value"
              x="880"
              y="502"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              $0.0021/km · $1,296/yr saved
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
