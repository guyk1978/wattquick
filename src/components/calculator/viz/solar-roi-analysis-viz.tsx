"use client";

import { cn } from "@/lib/utils";

interface SolarRoiAnalysisVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Solar ROI Analysis [VIZ].
 * Net CapEx after incentives; blended self/export savings escalate & degrade.
 * Sample: $15k · 30% ITC · 11,200 kWh · 0.5%/yr · $0.14/$0.08 · 85% · 3% →
 * BE Year 6.7 · $37,423 / 20 yr · NPV $16,676 · net +$26,923.
 */
export function SolarRoiAnalysisViz({ className }: SolarRoiAnalysisVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--solar-roi-analysis", className)}
      aria-label="Solar ROI analysis visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">CapEx → NPV · 20-Yr Recovery</h3>
        <p className="tool-viz__subtitle">
          Incentives cut net install cost; self-consumed and export kWh compound
          bill savings until cumulative cash crosses break-even — then NPV.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg solar-roi-analysis-viz"
          role="img"
          aria-labelledby="sra-viz-title sra-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="sra-viz-title">
            Solar ROI analysis animated cash-flow and break-even diagram
          </title>
          <desc id="sra-viz-desc">
            Installed cost after tax incentives is repaid by cumulative
            electricity savings that blend self-consumption and export credits
            while yield degrades and rates inflate. Sample: a 15,000 dollar
            system with 30 percent ITC, 11,200 kilowatt-hours year one, 0.5
            percent degradation, and 3 percent inflation breaks even at year
            6.7, saves 37,423 dollars over 20 years, with simple NPV of 16,676
            dollars and net benefit of 26,923 dollars.
          </desc>

          <defs>
            <pattern
              id="sra-viz-grid"
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
              id="sra-viz-arrow"
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
              id="sra-viz-pulse"
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
              id="sra-viz-bar"
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
            fill="url(#sra-viz-grid)"
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
              x="36"
              y="36"
              width="200"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="58"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              INSTALLED COST
            </text>
            <text
              className="sra-viz-cost-value"
              x="52"
              y="88"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $15,000
            </text>

            <rect
              x="36"
              y="120"
              width="200"
              height="66"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="142"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              TAX CREDITS / ITC
            </text>
            <text
              className="sra-viz-itc-value"
              x="52"
              y="168"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              30% · −$4,500
            </text>

            <rect
              x="36"
              y="198"
              width="200"
              height="66"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="220"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              YEAR-1 YIELD
            </text>
            <text
              className="sra-viz-kwh-value"
              x="52"
              y="246"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              11,200 kWh
            </text>

            <rect
              x="36"
              y="276"
              width="200"
              height="84"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="298"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              DEG · RATES · SELF
            </text>
            <text
              className="sra-viz-params-value"
              x="52"
              y="322"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.5%/yr · $0.14 / $0.08
            </text>
            <text
              className="sra-viz-params-value"
              x="52"
              y="342"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              85% self · 3% infl
            </text>
          </g>

          {/* —— FLOW —— */}
          <g>
            <path
              d="M 236 72 L 300 72 L 300 130"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#sra-viz-arrow)"
            />
            <path
              className="sra-viz-timeline-pulse"
              d="M 236 72 L 300 72 L 300 130"
              fill="none"
              stroke="url(#sra-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 236 154 L 280 154 L 280 170 L 300 170"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="sra-viz-cash-pulse"
              d="M 236 154 L 280 154 L 280 170 L 300 170"
              fill="none"
              stroke="url(#sra-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.25s" }}
            />
            <path
              d="M 236 232 L 280 232 L 280 200 L 300 200"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="sra-viz-cash-pulse"
              d="M 236 232 L 280 232 L 280 200 L 300 200"
              fill="none"
              stroke="url(#sra-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.5s" }}
            />
          </g>

          {/* —— CENTER: CASH-FLOW PATH —— */}
          <g>
            <rect
              x="300"
              y="48"
              width="340"
              height="360"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="320"
              y="72"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MULTI-YEAR RECOVERY PATH
            </text>

            {/* Net CapEx chip */}
            <rect
              x="320"
              y="88"
              width="140"
              height="36"
              rx="3"
              fill="#0a0a0a"
              stroke="#555555"
              strokeWidth="1"
            />
            <text
              x="390"
              y="104"
              textAnchor="middle"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              GROSS → NET
            </text>
            <text
              className="sra-viz-net-chip"
              x="390"
              y="118"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $15k → $10.5k
            </text>

            <rect
              x="480"
              y="88"
              width="140"
              height="36"
              rx="3"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              x="550"
              y="104"
              textAnchor="middle"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              Y1 BLENDED SAVE
            </text>
            <text
              className="sra-viz-y1-chip"
              x="550"
              y="118"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $1,467/yr
            </text>

            {/* Axes */}
            <path
              d="M 330 150 L 330 350 L 620 350"
              fill="none"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="330"
              y="142"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              $ cum.
            </text>
            <text
              x="330"
              y="368"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              yr 1
            </text>
            <text
              x="620"
              y="368"
              textAnchor="end"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              yr 20
            </text>

            {/* Net CapEx line @ $10.5k — map 0..40k → y 350..130 */}
            {/* 10500/40000 * 220 = 57.75 → y = 350-58 = 292 */}
            <path
              className="sra-viz-capex-line"
              d="M 330 292 L 620 292"
              fill="none"
              stroke="#555555"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text
              x="624"
              y="296"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              net CapEx
            </text>

            {/* Cumulative savings: y1 1467→342, y5 7710→308, y10 16426→260, y20 37423→144 */}
            {/* x: 340, 395, 463, 600 for y1,5,10,20; BE 6.7 → x≈418 */}
            <path
              className="sra-viz-save-curve"
              d="M 340 342 L 395 308 L 418 292 L 463 260 L 531 200 L 600 144"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="sra-viz-cash-pulse"
              d="M 340 342 L 395 308 L 418 292 L 463 260 L 531 200 L 600 144"
              fill="none"
              stroke="url(#sra-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Status quo dashed (higher) — ~40k at y20 → y=130 */}
            <path
              className="sra-viz-sq-curve"
              d="M 340 340 L 395 300 L 463 248 L 531 185 L 600 130"
              fill="none"
              stroke="#666666"
              strokeWidth="1.25"
              strokeDasharray="3 4"
            />
            <text
              x="520"
              y="168"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              status quo grid
            </text>

            <circle
              className="sra-viz-be-point"
              cx="418"
              cy="292"
              r="6"
              fill="currentColor"
            />
            <rect
              x="382"
              y="258"
              width="72"
              height="22"
              rx="3"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              className="sra-viz-be-chip"
              x="418"
              y="273"
              textAnchor="middle"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              BE 6.7 yr
            </text>

            {/* Progress bars */}
            <text
              x="320"
              y="388"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              CUM. SAVINGS @ Y20
            </text>
            <rect
              x="450"
              y="380"
              width="170"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="sra-viz-save-bar"
              x="450"
              y="380"
              width="159"
              height="10"
              rx="2"
              fill="url(#sra-viz-bar)"
            />
          </g>

          {/* —— OUTPUTS —— */}
          <g>
            <path
              d="M 640 228 L 680 228"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#sra-viz-arrow)"
            />
            <path
              className="sra-viz-timeline-pulse"
              d="M 640 228 L 680 228"
              fill="none"
              stroke="url(#sra-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <rect
              x="680"
              y="48"
              width="244"
              height="88"
              rx="4"
              fill="#111111"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              x="696"
              y="72"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BREAK-EVEN YEAR
            </text>
            <text
              className="sra-viz-output-value"
              x="696"
              y="110"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Year 6.7
            </text>

            <rect
              x="680"
              y="152"
              width="244"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="178"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              TOTAL 20-YR SAVINGS
            </text>
            <text
              className="sra-viz-save-out"
              x="696"
              y="206"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $37,423
            </text>

            <rect
              x="680"
              y="240"
              width="244"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="266"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SIMPLE NPV
            </text>
            <text
              className="sra-viz-npv-out"
              x="696"
              y="294"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $16,676
            </text>

            <rect
              x="680"
              y="328"
              width="244"
              height="80"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="354"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              NET BENEFIT VS CAPEX
            </text>
            <text
              className="sra-viz-net-out"
              x="696"
              y="382"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              +$26,923
            </text>
            <text
              x="696"
              y="398"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              90.9% capacity @ Y20
            </text>
          </g>

          {/* —— MATH STRIP —— */}
          <g>
            <rect
              x="36"
              y="420"
              width="888"
              height="52"
              rx="4"
              fill="#0d0d0d"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="sra-viz-math-value"
              x="480"
              y="452"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              $15k × (1−0.30) = $10.5k net · Σ blended savings → BE 6.7 · NPV
              $16,676
            </text>
          </g>

          <path
            className="sra-viz-timeline-pulse"
            d="M 56 500 L 880 500"
            fill="none"
            stroke="url(#sra-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <text
            x="56"
            y="528"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
          >
            ITC cuts CapEx · self + export blend · inflation lifts rates
          </text>
          <text
            className="sra-viz-detail-value"
            x="880"
            y="528"
            textAnchor="end"
            fill="#ededed"
            fontSize="12"
            fontFamily="ui-monospace, monospace"
            fontWeight="700"
          >
            vs grid $39,994
          </text>
        </svg>
      </div>
    </section>
  );
}
