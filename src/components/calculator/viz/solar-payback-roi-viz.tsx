"use client";

import { cn } from "@/lib/utils";

interface SolarPaybackRoiVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Solar Payback Period (ROI) [VIZ].
 * Net cost = cost × (1 − incentive%); savings = kWh × $/kWh; payback = net ÷ savings.
 * Sample: $18,000 · 12,000 kWh/yr · $0.14 · 30% ITC → net $12,600 · $1,680/yr
 * → 7.5 yr payback · 25-yr ROI 233% · $29,400 net lifetime.
 */
export function SolarPaybackRoiViz({ className }: SolarPaybackRoiVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--solar-payback-roi", className)}
      aria-label="Solar payback period ROI visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Solar CapEx → Payback</h3>
        <p className="tool-viz__subtitle">
          Incentives cut net installed cost; yearly kWh × rate builds bill
          savings until the system pays for itself — then pure ROI.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg solar-payback-roi-viz"
          role="img"
          aria-labelledby="sproi-viz-title sproi-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="sproi-viz-title">
            Solar payback period and ROI animated diagram
          </title>
          <desc id="sproi-viz-desc">
            System cost after incentives divided by annual electricity savings
            yields simple payback years. Sample: an 18,000 dollar system with
            30 percent incentives, producing 12,000 kilowatt-hours per year at
            0.14 dollars per kilowatt-hour, has a net cost of 12,600 dollars,
            saves 1,680 dollars per year, and pays back in 7.5 years with a
            233 percent 25-year ROI.
          </desc>

          <defs>
            <pattern
              id="sproi-viz-grid"
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
              id="sproi-viz-arrow"
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
              id="sproi-viz-pulse"
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
              id="sproi-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#sproi-viz-grid)"
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

          {/* —— INPUTS —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="220"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="64"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SYSTEM COST
            </text>
            <text
              className="sproi-viz-cost-value"
              x="56"
              y="102"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $18,000
            </text>

            <rect
              x="40"
              y="140"
              width="220"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="164"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ANNUAL PRODUCTION
            </text>
            <text
              className="sproi-viz-kwh-value"
              x="56"
              y="196"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              12,000 kWh/yr
            </text>

            <rect
              x="40"
              y="224"
              width="220"
              height="136"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="248"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              RATE · INCENTIVES
            </text>
            <text
              className="sproi-viz-rate-value"
              x="56"
              y="284"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.14/kWh
            </text>
            <text
              className="sproi-viz-itc-value"
              x="56"
              y="314"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              30% ITC
            </text>
            <text
              x="56"
              y="340"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              cash purchase · no financing
            </text>
          </g>

          {/* Flow → recovery path */}
          <path
            d="M 260 84 L 310 84"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#sproi-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 84 L 310 84"
            fill="none"
            stroke="url(#sproi-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 176 L 290 176 L 290 140 L 310 140"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#sproi-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 176 L 290 176 L 290 140 L 310 140"
            fill="none"
            stroke="url(#sproi-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 290 L 290 290 L 290 220 L 310 220"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#sproi-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 290 L 290 290 L 290 220 L 310 220"
            fill="none"
            stroke="url(#sproi-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Capital recovery —— */}
          <g>
            <rect
              x="320"
              y="40"
              width="340"
              height="320"
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
              CAPITAL-RECOVERY PATH
            </text>

            <text
              className="sproi-viz-math-value"
              x="336"
              y="96"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $18,000 × (1 − 0.30) = $12,600 net
            </text>
            <text
              className="sproi-viz-save-chip"
              x="336"
              y="118"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              12,000 × $0.14 = $1,680/yr
            </text>

            {/* Gross vs net cost bars */}
            <text
              x="336"
              y="150"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              GROSS
            </text>
            <rect
              x="400"
              y="140"
              width="240"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="sproi-viz-gross-bar"
              x="400"
              y="140"
              width="220"
              height="14"
              rx="2"
              fill="#555555"
            />
            <text
              x="412"
              y="151"
              fill="#ededed"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              $18k
            </text>

            <text
              x="336"
              y="180"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              NET
            </text>
            <rect
              x="400"
              y="170"
              width="240"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="sproi-viz-net-bar"
              x="400"
              y="170"
              width="154"
              height="14"
              rx="2"
              fill="url(#sproi-viz-bar)"
            />
            <text
              className="sproi-viz-net-chip"
              x="412"
              y="181"
              fill="#0a0a0a"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              $12.6k
            </text>

            {/* Payback curve */}
            <line
              x1="360"
              y1="300"
              x2="640"
              y2="300"
              stroke="#333333"
              strokeWidth="1"
            />
            <line
              x1="360"
              y1="300"
              x2="360"
              y2="210"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="360"
              y="316"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              yr 0
            </text>
            <text
              x="480"
              y="316"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              yr 7.5
            </text>
            <text
              x="600"
              y="316"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              yr 25
            </text>

            <line
              className="sproi-viz-net-line"
              x1="360"
              y1="220"
              x2="640"
              y2="220"
              stroke="#555555"
              strokeWidth="1.25"
              strokeDasharray="4 3"
            />
            <text
              x="640"
              y="216"
              textAnchor="end"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              net cost
            </text>

            <path
              className="sproi-viz-cash-curve"
              d="M 360 300 L 420 276 L 460 252 L 500 228 L 520 220 L 580 160 L 640 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="sproi-viz-cash-pulse"
              d="M 360 300 L 420 276 L 460 252 L 500 228 L 520 220 L 580 160 L 640 100"
              fill="none"
              stroke="url(#sproi-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              className="sproi-viz-be-point"
              cx="520"
              cy="220"
              r="6"
              fill="currentColor"
            />
            <text
              className="sproi-viz-be-chip"
              x="530"
              y="212"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              BE 7.5 yr
            </text>

            {/* Mini solar panel icon */}
            <rect
              className="sproi-viz-panel"
              x="372"
              y="248"
              width="48"
              height="32"
              rx="2"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M 384 248 L 384 280 M 396 248 L 396 280 M 408 248 L 408 280 M 372 258 L 420 258 M 372 268 L 420 268"
              fill="none"
              stroke="#333333"
              strokeWidth="1"
            />

            <rect
              x="348"
              y="328"
              width="284"
              height="20"
              rx="2"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              className="sproi-viz-life-chip"
              x="362"
              y="342"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
              dominantBaseline="middle"
            >
              after BE → pure savings to yr 25
            </text>
          </g>

          {/* Flow → outputs */}
          <path
            d="M 660 140 L 700 140"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#sproi-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 140 L 700 140"
            fill="none"
            stroke="url(#sproi-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 660 250 L 680 250 L 680 280 L 700 280"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#sproi-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 660 250 L 680 250 L 680 280 L 700 280"
            fill="none"
            stroke="url(#sproi-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Payback —— */}
          <g>
            <rect
              x="710"
              y="40"
              width="210"
              height="180"
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
              SIMPLE PAYBACK
            </text>
            <text
              className="sproi-viz-output-value"
              x="726"
              y="120"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              7.5 yr
            </text>
            <text
              x="726"
              y="148"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              net ÷ annual savings
            </text>
            <rect
              x="726"
              y="168"
              width="162"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="sproi-viz-pb-bar"
              x="726"
              y="168"
              width="97"
              height="12"
              rx="2"
              fill="url(#sproi-viz-bar)"
            />
            <text
              className="sproi-viz-detail-value"
              x="726"
              y="202"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              then pure savings
            </text>
          </g>

          {/* —— OUTPUT: ROI —— */}
          <g>
            <rect
              x="710"
              y="236"
              width="210"
              height="124"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="262"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              25-YEAR ROI
            </text>
            <text
              className="sproi-viz-roi-out"
              x="726"
              y="304"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              233%
            </text>
            <rect
              x="726"
              y="324"
              width="162"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="sproi-viz-roi-bar"
              x="726"
              y="324"
              width="150"
              height="10"
              rx="2"
              fill="url(#sproi-viz-bar)"
            />
            <text
              x="726"
              y="348"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              +$29,400 lifetime net
            </text>
          </g>

          {/* —— Footer —— */}
          <g>
            <rect
              x="40"
              y="388"
              width="880"
              height="132"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="416"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MORE kWh OR HIGHER $/kWh · FASTER PAYBACK · ITC CUTS NET COST
            </text>

            <text
              x="56"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              $0
            </text>
            <rect
              x="100"
              y="442"
              width="520"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="sproi-viz-accum-bar"
              x="100"
              y="442"
              width="312"
              height="14"
              rx="2"
              fill="url(#sproi-viz-bar)"
            />
            <text
              x="380"
              y="452"
              fill="#0a0a0a"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              BE @ 7.5
            </text>
            <text
              x="640"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              $42k @ 25 yr
            </text>

            <path
              className="sproi-viz-timeline-pulse"
              d="M 56 490 L 880 490"
              fill="none"
              stroke="url(#sproi-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text
              x="56"
              y="514"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              no rate escalation / degradation in simple model
            </text>
            <text
              className="sproi-viz-detail-value"
              x="880"
              y="514"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              7.5 yr · $1,680/yr · 233% ROI
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
