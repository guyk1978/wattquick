"use client";

import { cn } from "@/lib/utils";

interface MicrogridRoiVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Microgrid ROI [VIZ].
 * monthlyNet = savings − maintenance; cumulative escalates with inflation.
 * Sample: $45k · $320/mo · $45 O&M · 3% → BE 11.6 yr · 10-yr −16% · 20-yr 97%.
 */
export function MicrogridRoiViz({ className }: MicrogridRoiVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--microgrid-roi", className)}
      aria-label="Microgrid ROI visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Microgrid ROI Path</h3>
        <p className="tool-viz__subtitle">
          Capex is recovered as monthly net savings compound with rising energy
          rates — break-even first, then cumulative ROI at 10 and 20 years.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg microgrid-roi-viz"
          role="img"
          aria-labelledby="mroi-viz-title mroi-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="mroi-viz-title">
            Microgrid ROI animated flow diagram
          </title>
          <desc id="mroi-viz-desc">
            Initial setup cost, monthly self-production savings, maintenance,
            and energy inflation determine break-even and long-horizon ROI.
            Sample: 45,000 dollars setup, 320 dollars monthly savings, 45
            dollars monthly maintenance, and 3 percent inflation breaks even at
            11.6 years, with minus 16 percent ROI at 10 years and 97 percent at
            20 years.
          </desc>

          <defs>
            <pattern
              id="mroi-viz-grid"
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
              id="mroi-viz-arrow"
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
              id="mroi-viz-pulse"
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
              id="mroi-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="mroi-viz-curve"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#mroi-viz-grid)"
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

          {/* —— INPUT: Capex —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="220"
              height="110"
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
              INITIAL SETUP
            </text>
            <text
              className="mroi-viz-cost-value"
              x="56"
              y="106"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $45,000
            </text>
            <text
              x="56"
              y="130"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              solar · storage · controls
            </text>
          </g>

          {/* —— INPUT: Monthly savings —— */}
          <g>
            <rect
              x="40"
              y="166"
              width="220"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="192"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MONTHLY SAVINGS
            </text>
            <text
              className="mroi-viz-save-value"
              x="56"
              y="228"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $320/mo
            </text>
            <text
              x="56"
              y="250"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              self-production offset
            </text>
          </g>

          {/* —— INPUT: Maintenance / inflation —— */}
          <g>
            <rect
              x="40"
              y="282"
              width="220"
              height="120"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="308"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              O&amp;M · INFLATION
            </text>
            <text
              className="mroi-viz-om-value"
              x="56"
              y="344"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $45 · 3%/yr
            </text>
            <text
              x="56"
              y="368"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              net $275 / mo year 1
            </text>
            <text
              x="56"
              y="386"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              rates escalate savings
            </text>
          </g>

          {/* Flow → amortization path */}
          <path
            d="M 260 95 L 310 95"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#mroi-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 95 L 310 95"
            fill="none"
            stroke="url(#mroi-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 216 L 290 216 L 290 155 L 310 155"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#mroi-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 216 L 290 216 L 290 155 L 310 155"
            fill="none"
            stroke="url(#mroi-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 342 L 290 342 L 290 215 L 310 215"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#mroi-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 342 L 290 342 L 290 215 L 310 215"
            fill="none"
            stroke="url(#mroi-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ animationDelay: "0.7s" }}
          />

          {/* —— FLOW: Amortization / recovery —— */}
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
              AMORTIZATION · RECOVERY PATH
            </text>

            {/* Capex vs cumulative curve chart */}
            <g transform="translate(348, 88)">
              {/* Axes */}
              <line
                x1="24"
                y1="160"
                x2="280"
                y2="160"
                stroke="#333333"
                strokeWidth="1"
              />
              <line
                x1="24"
                y1="160"
                x2="24"
                y2="16"
                stroke="#333333"
                strokeWidth="1"
              />
              {/* Capex horizontal */}
              <line
                x1="24"
                y1="72"
                x2="280"
                y2="72"
                stroke="#555555"
                strokeWidth="1"
                strokeDasharray="4 3"
              />
              <text
                x="284"
                y="75"
                fill="#666666"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                $45k
              </text>
              {/* Cumulative recovery curve */}
              <path
                className="mroi-viz-curve"
                d="M 24 160 C 80 150, 120 130, 160 100 S 220 50, 280 20"
                fill="none"
                stroke="url(#mroi-viz-curve)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Break-even marker ~11.6 yr → ~58% of 20yr axis */}
              <circle
                className="mroi-viz-be-dot"
                cx="172"
                cy="72"
                r="5"
                fill="currentColor"
              />
              <text
                x="172"
                y="60"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                BE
              </text>
              <text
                x="24"
                y="178"
                fill="#666666"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                yr 0
              </text>
              <text
                x="150"
                y="178"
                textAnchor="middle"
                fill="#666666"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                10
              </text>
              <text
                x="280"
                y="178"
                textAnchor="end"
                fill="#666666"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                20
              </text>
            </g>

            {/* Net cash chip */}
            <rect
              x="348"
              y="288"
              width="284"
              height="92"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="364"
              y="312"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              YEAR-1 MONTHLY NET
            </text>
            <text
              className="mroi-viz-math-value"
              x="364"
              y="340"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $320 − $45 = $275/mo
            </text>
            <text
              x="364"
              y="364"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              × 12 · escalate @ 3%/yr
            </text>
          </g>

          {/* Flow → outputs */}
          <path
            d="M 660 160 L 700 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#mroi-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 160 L 700 160"
            fill="none"
            stroke="url(#mroi-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 660 280 L 680 280 L 680 300 L 700 300"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#mroi-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 660 280 L 680 280 L 680 300 L 700 300"
            fill="none"
            stroke="url(#mroi-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Break-even —— */}
          <g>
            <rect
              x="710"
              y="40"
              width="210"
              height="140"
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
              BREAK-EVEN
            </text>
            <text
              className="mroi-viz-output-value"
              x="726"
              y="110"
              fill="#ededed"
              fontSize="30"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              11.6 yr
            </text>
            <rect
              x="726"
              y="128"
              width="162"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="mroi-viz-be-bar"
              x="726"
              y="128"
              width="94"
              height="10"
              rx="2"
              fill="url(#mroi-viz-bar)"
            />
            <text
              className="mroi-viz-detail-value"
              x="726"
              y="160"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              capex recovered
            </text>
          </g>

          {/* —— OUTPUT: 10 / 20 yr ROI —— */}
          <g>
            <rect
              x="710"
              y="196"
              width="210"
              height="206"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="222"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              10-YEAR ROI
            </text>
            <text
              className="mroi-viz-roi10-value"
              x="726"
              y="256"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              −16%
            </text>
            <text
              x="726"
              y="276"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              cum. $37,831 vs $45k
            </text>
            <text
              x="726"
              y="308"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              20-YEAR ROI
            </text>
            <text
              className="mroi-viz-roi20-value"
              x="726"
              y="342"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              +97%
            </text>
            <rect
              x="726"
              y="358"
              width="162"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="mroi-viz-roi-bar"
              x="726"
              y="358"
              width="162"
              height="10"
              rx="2"
              fill="url(#mroi-viz-bar)"
            />
            <text
              className="mroi-viz-detail-value"
              x="726"
              y="386"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              cum. $88,672 @ 20 yr
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
              CAPITAL RECOVERY TIMELINE
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
              className="mroi-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="mroi-viz-tick"
              cx="320"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.7"
            />
            <circle
              className="mroi-viz-tick mroi-viz-tick--be"
              cx="520"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              className="mroi-viz-tick"
              cx="700"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.5"
            />
            <circle
              className="mroi-viz-tick mroi-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="mroi-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#mroi-viz-pulse)"
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
              install · $45k out
            </text>
            <text
              x="520"
              y="502"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              BE 11.6 yr
            </text>
            <text
              className="mroi-viz-detail-value"
              x="880"
              y="502"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              yr 20 · +97% ROI
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
