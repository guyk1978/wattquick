"use client";

import { cn } from "@/lib/utils";

interface ElectricityRatePlanVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Electricity Rate Plan (TOU vs Flat) [VIZ].
 * Flat = kWh × flatRate; TOU = Σ(tier kWh × tier rate).
 * Sample: 450 kWh · 35/25/40% · $0.52 vs $0.68/$0.42/$0.22 → flat $234 · TOU $193.95 · save $40.05/mo.
 */
export function ElectricityRatePlanViz({
  className,
}: ElectricityRatePlanVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--electricity-rate-plan", className)}
      aria-label="Electricity rate plan TOU versus flat visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">TOU vs Flat Rate Plan</h3>
        <p className="tool-viz__subtitle">
          Same monthly kilowatt-hours, two bill formulas — flat single rate
          versus peak / shoulder / off-peak tiers — pick the cheaper plan.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg electricity-rate-plan-viz"
          role="img"
          aria-labelledby="erp-viz-title erp-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="erp-viz-title">
            Electricity rate plan TOU versus flat animated comparison
          </title>
          <desc id="erp-viz-desc">
            Monthly kilowatt-hours, peak and shoulder shares, and flat versus
            TOU rates determine which plan costs less. Sample: 450 kilowatt-hours
            with 35 percent peak, 25 percent shoulder, and 40 percent off-peak
            costs 234 dollars on flat at 52 cents and 193 dollars 95 cents on
            TOU, saving 40 dollars 5 cents monthly or 481 dollars yearly.
          </desc>

          <defs>
            <pattern
              id="erp-viz-grid"
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
              id="erp-viz-arrow"
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
              id="erp-viz-pulse"
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
              id="erp-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="erp-viz-flat"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#888888" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#888888" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#erp-viz-grid)"
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

          {/* —— INPUT: Monthly use —— */}
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
              MONTHLY USE
            </text>
            <text
              className="erp-viz-kwh-value"
              x="56"
              y="102"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              450 kWh
            </text>
            <text
              x="56"
              y="124"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              average household
            </text>
          </g>

          {/* —— INPUT: Peak share —— */}
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
              PEAK-HOUR SHARE
            </text>
            <text
              className="erp-viz-peak-value"
              x="56"
              y="218"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              35%
            </text>
            <text
              x="56"
              y="240"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              late afternoon / evening
            </text>
          </g>

          {/* —— INPUT: Advanced rates —— */}
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
              RATES · ADVANCED
            </text>
            <text
              className="erp-viz-rates-value"
              x="56"
              y="328"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              flat $0.52
            </text>
            <text
              className="erp-viz-rates-value"
              x="56"
              y="350"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              TOU 0.68 / 0.42 / 0.22
            </text>
            <text
              x="56"
              y="374"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              peak · shoulder · off-peak
            </text>
            <text
              x="56"
              y="390"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              shoulder 25% · off 40%
            </text>
          </g>

          {/* Flow → comparison */}
          <path
            d="M 260 90 L 310 90"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#erp-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 90 L 310 90"
            fill="none"
            stroke="url(#erp-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 206 L 290 206 L 290 150 L 310 150"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#erp-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 206 L 290 206 L 290 150 L 310 150"
            fill="none"
            stroke="url(#erp-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 337 L 290 337 L 290 210 L 310 210"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#erp-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 337 L 290 337 L 290 210 L 310 210"
            fill="none"
            stroke="url(#erp-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ animationDelay: "0.7s" }}
          />

          {/* —— FLOW: Rate comparison —— */}
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
              RATE COMPARISON PATH
            </text>

            {/* Usage split stacked bar */}
            <g transform="translate(348, 88)">
              <text
                x="0"
                y="0"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.06em"
              >
                USAGE SPLIT · 450 kWh
              </text>
              <rect
                x="0"
                y="16"
                width="284"
                height="18"
                rx="2"
                fill="#1a1a1a"
                stroke="#333333"
              />
              {/* 35% peak = 99px of 284 */}
              <rect
                className="erp-viz-split-peak"
                x="0"
                y="16"
                width="99"
                height="18"
                rx="2"
                fill="url(#erp-viz-flat)"
              />
              {/* 25% shoulder = 71px */}
              <rect
                className="erp-viz-split-shoulder"
                x="99"
                y="16"
                width="71"
                height="18"
                fill="url(#erp-viz-bar)"
                opacity="0.55"
              />
              {/* 40% off = 114px */}
              <rect
                className="erp-viz-split-off"
                x="170"
                y="16"
                width="114"
                height="18"
                rx="2"
                fill="url(#erp-viz-bar)"
              />
              <text
                x="0"
                y="52"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                peak 35% · shoulder 25% · off-peak 40%
              </text>
            </g>

            {/* Flat card */}
            <g className="erp-viz-flat-card" transform="translate(348, 160)">
              <rect
                width="130"
                height="88"
                rx="3"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <text
                x="12"
                y="24"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.06em"
              >
                FLAT
              </text>
              <text
                className="erp-viz-flat-cost"
                x="12"
                y="52"
                fill="#ededed"
                fontSize="20"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                $234.00
              </text>
              <text
                x="12"
                y="74"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                450 × $0.52
              </text>
            </g>

            <text
              x="500"
              y="210"
              textAnchor="middle"
              fill="#666666"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              vs
            </text>

            {/* TOU card */}
            <g className="erp-viz-tou-card" transform="translate(520, 160)">
              <rect
                width="130"
                height="88"
                rx="3"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <text
                x="12"
                y="24"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.06em"
              >
                TOU
              </text>
              <text
                className="erp-viz-tou-cost"
                x="12"
                y="52"
                fill="#ededed"
                fontSize="20"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                $193.95
              </text>
              <text
                x="12"
                y="74"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                blend $0.431
              </text>
            </g>

            {/* Tier math */}
            <rect
              x="348"
              y="272"
              width="284"
              height="108"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="364"
              y="296"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              TOU TIER MATH
            </text>
            <text
              className="erp-viz-math-value"
              x="364"
              y="320"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              157.5 × 0.68 = $107.10
            </text>
            <text
              className="erp-viz-math-value"
              x="364"
              y="340"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              112.5 × 0.42 = $47.25
            </text>
            <text
              className="erp-viz-math-value"
              x="364"
              y="360"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              180 × 0.22 = $39.60
            </text>
          </g>

          {/* Flow → output */}
          <path
            d="M 660 204 L 700 204"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#erp-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 204 L 700 204"
            fill="none"
            stroke="url(#erp-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="710"
              y="40"
              width="210"
              height="220"
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
              MONTHLY SAVINGS
            </text>
            <text
              className="erp-viz-output-value"
              x="726"
              y="112"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $40.05
            </text>
            <text
              x="726"
              y="138"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              TOU beats flat
            </text>
            <rect
              x="726"
              y="156"
              width="162"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="erp-viz-save-bar"
              x="726"
              y="156"
              width="140"
              height="12"
              rx="2"
              fill="url(#erp-viz-bar)"
            />
            <text
              className="erp-viz-detail-value"
              x="726"
              y="192"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              Flat $234.00
            </text>
            <text
              className="erp-viz-detail-value"
              x="726"
              y="214"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              TOU $193.95
            </text>
            <text
              x="726"
              y="240"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              winner: Time-of-use
            </text>
          </g>

          <g>
            <rect
              x="710"
              y="276"
              width="210"
              height="126"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="302"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ANNUAL SAVINGS
            </text>
            <text
              className="erp-viz-year-value"
              x="726"
              y="342"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $481/yr
            </text>
            <rect
              x="726"
              y="362"
              width="162"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="erp-viz-year-bar"
              x="726"
              y="362"
              width="162"
              height="10"
              rx="2"
              fill="url(#erp-viz-bar)"
            />
            <text
              x="726"
              y="388"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              $40.05 × 12
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
              PLAN SELECTION AT A GLANCE
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
              className="erp-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="erp-viz-tick"
              cx="320"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.7"
            />
            <circle
              className="erp-viz-tick"
              cx="600"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.5"
            />
            <circle
              className="erp-viz-tick erp-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="erp-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#erp-viz-pulse)"
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
              kWh profile
            </text>
            <text
              x="600"
              y="502"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              flat vs tiered bills
            </text>
            <text
              className="erp-viz-detail-value"
              x="880"
              y="502"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              pick TOU · save $40.05/mo
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
