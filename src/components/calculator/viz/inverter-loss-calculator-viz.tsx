"use client";

import { cn } from "@/lib/utils";

interface InverterLossCalculatorVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Inverter Loss Calculator [VIZ].
 * AC = DC × (η ÷ 100); Loss = DC − AC.
 * Sample: 1,000 W DC · 90% → 900 W AC · 100 W loss (10%).
 */
export function InverterLossCalculatorViz({
  className,
}: InverterLossCalculatorVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--inverter-loss-calculator", className)}
      aria-label="Inverter loss conversion visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">DC → AC · Conversion Loss</h3>
        <p className="tool-viz__subtitle">
          DC watts enter the inverter; efficiency peels off thermal and
          switching loss — the remainder is usable AC output.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg inverter-loss-calculator-viz"
          role="img"
          aria-labelledby="ilc-viz-title ilc-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ilc-viz-title">
            Inverter loss animated DC to AC conversion diagram
          </title>
          <desc id="ilc-viz-desc">
            DC input power multiplied by inverter efficiency yields AC output;
            the difference is conversion loss. Sample: 1,000 watts DC at 90
            percent efficiency delivers 900 watts AC with 100 watts lost as
            heat.
          </desc>

          <defs>
            <pattern
              id="ilc-viz-grid"
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
              id="ilc-viz-arrow"
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
              id="ilc-viz-pulse"
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
              id="ilc-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="ilc-viz-heat"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#555555" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#888888" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#ilc-viz-grid)"
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

          {/* —— INPUT: DC —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="220"
              height="160"
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
              DC INPUT POWER
            </text>
            <text
              className="ilc-viz-dc-value"
              x="56"
              y="114"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,000 W
            </text>
            <text
              x="56"
              y="142"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              battery / PV bus draw
            </text>
            <text
              x="56"
              y="164"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              size cables for DC input
            </text>
            <text
              x="56"
              y="182"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              not AC load alone
            </text>
          </g>

          {/* —— INPUT: Efficiency —— */}
          <g>
            <rect
              x="40"
              y="220"
              width="220"
              height="140"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="246"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              INVERTER EFFICIENCY
            </text>
            <text
              className="ilc-viz-eff-value"
              x="56"
              y="292"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              90%
            </text>
            <text
              x="56"
              y="320"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              η · conversion yield
            </text>
            <text
              x="56"
              y="342"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              lower at light load
            </text>
          </g>

          {/* Flow → inverter */}
          <path
            d="M 260 120 L 310 120"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#ilc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 120 L 310 120"
            fill="none"
            stroke="url(#ilc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 290 L 290 290 L 290 200 L 310 200"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#ilc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 290 L 290 290 L 290 200 L 310 200"
            fill="none"
            stroke="url(#ilc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Inverter block —— */}
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
              CONVERSION-LOSS PATH
            </text>

            {/* Inverter chassis */}
            <rect
              className="ilc-viz-chassis"
              x="380"
              y="90"
              width="220"
              height="140"
              rx="6"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="2"
            />
            <text
              x="490"
              y="118"
              textAnchor="middle"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              INVERTER
            </text>
            <text
              className="ilc-viz-convert"
              x="490"
              y="148"
              textAnchor="middle"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              DC → AC
            </text>
            <text
              className="ilc-viz-math-value"
              x="490"
              y="178"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,000 × 0.90 = 900 W
            </text>
            <text
              x="490"
              y="204"
              textAnchor="middle"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              switching · magnetics · heat
            </text>

            {/* Heat vent plume */}
            <path
              className="ilc-viz-heat"
              d="M 430 230 L 430 255 M 460 230 L 460 262 M 490 230 L 490 255 M 520 230 L 520 262 M 550 230 L 550 255"
              fill="none"
              stroke="url(#ilc-viz-heat)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text
              className="ilc-viz-loss-chip"
              x="490"
              y="280"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              −100 W heat
            </text>

            {/* Split bars: AC pass vs loss */}
            <text
              x="348"
              y="308"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              yield
            </text>
            <rect
              x="388"
              y="298"
              width="240"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="ilc-viz-ac-bar"
              x="388"
              y="298"
              width="216"
              height="12"
              rx="2"
              fill="url(#ilc-viz-bar)"
            />
            <text
              x="348"
              y="336"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              loss
            </text>
            <rect
              x="388"
              y="326"
              width="240"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="ilc-viz-loss-bar"
              x="388"
              y="326"
              width="24"
              height="10"
              rx="2"
              fill="#555555"
            />
          </g>

          {/* Flow → outputs */}
          <path
            d="M 660 160 L 700 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#ilc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 160 L 700 160"
            fill="none"
            stroke="url(#ilc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 660 260 L 680 260 L 680 280 L 700 280"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#ilc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 660 260 L 680 260 L 680 280 L 700 280"
            fill="none"
            stroke="url(#ilc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: AC —— */}
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
              AC OUTPUT
            </text>
            <text
              className="ilc-viz-output-value"
              x="726"
              y="114"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              900 W
            </text>
            <text
              x="726"
              y="140"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              usable load power
            </text>
            <rect
              x="726"
              y="160"
              width="162"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="ilc-viz-out-bar"
              x="726"
              y="160"
              width="146"
              height="12"
              rx="2"
              fill="url(#ilc-viz-bar)"
            />
            <text
              className="ilc-viz-detail-value"
              x="726"
              y="196"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              90% of DC input
            </text>
          </g>

          {/* —— OUTPUT: Loss —— */}
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
              CONVERSION LOSS
            </text>
            <text
              className="ilc-viz-loss-out"
              x="726"
              y="304"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              100 W
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
              className="ilc-viz-loss-out-bar"
              x="726"
              y="324"
              width="16"
              height="10"
              rx="2"
              fill="#555555"
            />
            <text
              x="726"
              y="348"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              10% · heat / switching
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
              EFFICIENCY DRIVES AC YIELD · SIZE BATTERY FOR DC INPUT
            </text>

            <text
              x="56"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              η 80%
            </text>
            <rect
              x="120"
              y="442"
              width="520"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="ilc-viz-eff-bar"
              x="120"
              y="442"
              width="274"
              height="14"
              rx="2"
              fill="url(#ilc-viz-bar)"
            />
            <text
              x="370"
              y="452"
              fill="#0a0a0a"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              90%
            </text>
            <text
              x="652"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              η 99%
            </text>

            <path
              className="ilc-viz-timeline-pulse"
              d="M 56 490 L 880 490"
              fill="none"
              stroke="url(#ilc-viz-pulse)"
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
              lower η → more heat · less AC for the same DC
            </text>
            <text
              className="ilc-viz-detail-value"
              x="880"
              y="514"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              900 W AC · 100 W loss · 10%
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
