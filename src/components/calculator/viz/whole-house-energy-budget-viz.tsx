"use client";

import { cn } from "@/lib/utils";

interface WholeHouseEnergyBudgetVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Whole House Energy Budget [VIZ].
 * daily = Σ categories; monthly = daily × 30; annual = daily × 365; $ = kWh × rate.
 * Sample: 25+12+8+3+10 = 58 kWh/day · $0.14 → $243.60/mo · $2,963.80/yr.
 */
export function WholeHouseEnergyBudgetViz({
  className,
}: WholeHouseEnergyBudgetVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--whole-house-energy-budget", className)}
      aria-label="Whole house energy budget visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Category Stack · Bill Projection</h3>
        <p className="tool-viz__subtitle">
          Daily kilowatt-hours from HVAC, water heat, kitchen, laundry, and other
          loads stack into monthly and yearly utility spend at your tariff.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg whole-house-energy-budget-viz"
          role="img"
          aria-labelledby="wheb-viz-title wheb-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="wheb-viz-title">
            Whole house energy budget category aggregation diagram
          </title>
          <desc id="wheb-viz-desc">
            Daily kilowatt-hours from HVAC, water heater, kitchen, laundry, and
            other loads sum to a household daily total, then scale by thirty and
            three hundred sixty-five days into monthly and annual energy and
            cost. Sample: twenty-five plus twelve plus eight plus three plus ten
            equals fifty-eight kilowatt-hours per day at fourteen cents per
            kilowatt-hour, about two hundred forty-three dollars sixty cents per
            month and two thousand nine hundred sixty-three dollars eighty cents
            per year.
          </desc>

          <defs>
            <pattern
              id="wheb-viz-grid"
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
              id="wheb-viz-arrow"
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
              id="wheb-viz-pulse"
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
              id="wheb-viz-stack"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient
              id="wheb-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="wheb-viz-year"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#wheb-viz-grid)"
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

          {/* —— INPUTS: categories —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="120"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="62"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              HVAC
            </text>
            <text
              className="wheb-viz-hvac-value"
              x="52"
              y="96"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              25
            </text>
            <text
              x="90"
              y="96"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              kWh/d
            </text>
          </g>

          <g>
            <rect
              x="176"
              y="40"
              width="120"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="188"
              y="62"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              WATER HEATER
            </text>
            <text
              className="wheb-viz-wh-value"
              x="188"
              y="96"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              12
            </text>
            <text
              x="226"
              y="96"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              kWh/d
            </text>
          </g>

          <g>
            <rect
              x="312"
              y="40"
              width="120"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="324"
              y="62"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              KITCHEN+LAUNDRY
            </text>
            <text
              className="wheb-viz-kl-value"
              x="324"
              y="96"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              11
            </text>
            <text
              x="362"
              y="96"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              kWh/d
            </text>
          </g>

          <g>
            <rect
              x="448"
              y="40"
              width="110"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="460"
              y="62"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              OTHER + RATE
            </text>
            <text
              className="wheb-viz-other-value"
              x="460"
              y="88"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10 kWh/d
            </text>
            <text
              className="wheb-viz-rate-value"
              x="460"
              y="112"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.14/kWh
            </text>
          </g>

          {/* Flow → stack */}
          <path
            d="M 100 128 L 100 156 L 300 156"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#wheb-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 100 128 L 100 156 L 300 156"
            fill="none"
            stroke="url(#wheb-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 236 128 L 236 156"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 236 128 L 236 156"
            fill="none"
            stroke="url(#wheb-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 372 128 L 372 156 L 300 156"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />
          <path
            d="M 503 128 L 503 156 L 300 156"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />

          {/* —— CENTER: House + stacked daily —— */}
          <g>
            <rect
              x="40"
              y="176"
              width="640"
              height="220"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="202"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              DAILY AGGREGATION · Σ CATEGORIES → ×30 / ×365
            </text>

            {/* House outline */}
            <g className="wheb-viz-house" transform="translate(64, 228)">
              <path
                d="M 48 0 L 96 32 L 96 88 L 0 88 L 0 32 Z"
                fill="none"
                stroke="#444444"
                strokeWidth="1.5"
              />
              <path
                d="M 48 0 L 96 32 L 0 32 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              />
              <rect
                x="36"
                y="52"
                width="24"
                height="36"
                fill="none"
                stroke="#444444"
                strokeWidth="1.25"
              />
              <text
                x="48"
                y="112"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                whole home
              </text>
            </g>

            {/* Stacked category bars (proportional heights) */}
            <g transform="translate(200, 220)">
              <text
                x="0"
                y="0"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                DAILY STACK (KWH)
              </text>
              {/* Stack from bottom: other 10, laundry+kitchen 11, WH 12, HVAC 25 — total 58, max height ~120 */}
              <rect
                x="0"
                y="16"
                width="48"
                height="120"
                rx="2"
                fill="#1a1a1a"
                stroke="#333333"
              />
              {/* HVAC 25/58 * 120 ≈ 52 */}
              <rect
                className="wheb-viz-stack-hvac"
                x="2"
                y="18"
                width="44"
                height="52"
                fill="url(#wheb-viz-stack)"
                opacity="0.95"
              />
              {/* WH 12/58 * 120 ≈ 25 */}
              <rect
                className="wheb-viz-stack-wh"
                x="2"
                y="70"
                width="44"
                height="25"
                fill="currentColor"
                opacity="0.55"
              />
              {/* Kitchen+laundry 11/58 * 120 ≈ 23 */}
              <rect
                className="wheb-viz-stack-kl"
                x="2"
                y="95"
                width="44"
                height="23"
                fill="#666666"
                opacity="0.7"
              />
              {/* Other 10/58 * 120 ≈ 21 */}
              <rect
                className="wheb-viz-stack-other"
                x="2"
                y="118"
                width="44"
                height="16"
                fill="#444444"
                opacity="0.9"
              />

              <g transform="translate(64, 28)">
                <text
                  className="wheb-viz-legend"
                  x="0"
                  y="0"
                  fill="#ededed"
                  fontSize="12"
                  fontFamily="ui-monospace, monospace"
                >
                  HVAC 25
                </text>
                <text
                  className="wheb-viz-legend"
                  x="0"
                  y="28"
                  fill="#ededed"
                  fontSize="12"
                  fontFamily="ui-monospace, monospace"
                >
                  Water 12
                </text>
                <text
                  className="wheb-viz-legend"
                  x="0"
                  y="56"
                  fill="#ededed"
                  fontSize="12"
                  fontFamily="ui-monospace, monospace"
                >
                  Kit+Laun 11
                </text>
                <text
                  className="wheb-viz-legend"
                  x="0"
                  y="84"
                  fill="#ededed"
                  fontSize="12"
                  fontFamily="ui-monospace, monospace"
                >
                  Other 10
                </text>
              </g>
            </g>

            {/* Daily total + math */}
            <g transform="translate(400, 240)">
              <text
                x="0"
                y="0"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                DAILY TOTAL
              </text>
              <text
                className="wheb-viz-daily-value"
                x="0"
                y="40"
                fill="#ededed"
                fontSize="28"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                58 kWh
              </text>
              <text
                x="0"
                y="64"
                fill="#888888"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                25+12+8+3+10
              </text>

              <rect
                x="0"
                y="84"
                width="220"
                height="48"
                rx="3"
                fill="#0a0a0a"
                stroke="#2a2a2a"
              />
              <text
                className="wheb-viz-math-value"
                x="110"
                y="104"
                textAnchor="middle"
                fill="#ededed"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                ×30 → 1,740 kWh/mo
              </text>
              <text
                className="wheb-viz-math-value"
                x="110"
                y="122"
                textAnchor="middle"
                fill="#ededed"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                ×365 → 21,170 kWh/yr
              </text>
            </g>
          </g>

          {/* Flow → outputs */}
          <path
            d="M 680 250 L 700 250"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#wheb-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 680 250 L 700 250"
            fill="none"
            stroke="url(#wheb-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 680 340 L 690 340 L 690 320 L 700 320"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#wheb-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 680 340 L 690 340 L 690 320 L 700 320"
            fill="none"
            stroke="url(#wheb-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Monthly cost —— */}
          <g>
            <rect
              x="700"
              y="40"
              width="220"
              height="200"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="716"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MONTHLY ENERGY COST
            </text>
            <text
              className="wheb-viz-output-value"
              x="716"
              y="112"
              fill="#ededed"
              fontSize="30"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $243.60
            </text>
            <text
              x="716"
              y="138"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              1,740 kWh × $0.14
            </text>
            <rect
              x="716"
              y="158"
              width="172"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="wheb-viz-mo-bar"
              x="716"
              y="158"
              width="172"
              height="10"
              rx="2"
              fill="url(#wheb-viz-bar)"
            />
            <text
              className="wheb-viz-detail-value"
              x="716"
              y="198"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              58 kWh/day baseline
            </text>
          </g>

          {/* —— OUTPUT: Annual —— */}
          <g>
            <rect
              x="700"
              y="256"
              width="220"
              height="140"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="716"
              y="282"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ANNUAL PROJECTED
            </text>
            <text
              className="wheb-viz-yr-out"
              x="716"
              y="318"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $2,963.80
            </text>
            <rect
              x="716"
              y="336"
              width="172"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="wheb-viz-yr-bar"
              x="716"
              y="336"
              width="172"
              height="10"
              rx="2"
              fill="url(#wheb-viz-year)"
            />
            <text
              className="wheb-viz-detail-value"
              x="716"
              y="372"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              21,170 kWh / year
            </text>
          </g>

          {/* —— Footer —— */}
          <g>
            <rect
              x="40"
              y="420"
              width="880"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="448"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BILL BUILD-UP AT A GLANCE
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
              className="wheb-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="wheb-viz-tick"
              cx="320"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.75"
            />
            <circle
              className="wheb-viz-tick"
              cx="560"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.55"
            />
            <circle
              className="wheb-viz-tick wheb-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="wheb-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#wheb-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            <text
              x="56"
              y="504"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              day · 58 kWh
            </text>
            <text
              x="320"
              y="504"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              month · 1,740 kWh
            </text>
            <text
              x="560"
              y="504"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              $243.60 / mo
            </text>
            <text
              x="880"
              y="504"
              textAnchor="end"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              year · $2,963.80
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
