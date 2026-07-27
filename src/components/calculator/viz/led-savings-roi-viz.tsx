"use client";

import { cn } from "@/lib/utils";

interface LedSavingsRoiVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for LED Savings & ROI [VIZ].
 * Legacy W vs LED W → kWh/$/CO₂ cut → payback.
 * Sample: 60 W → 9 W · 5 h · $0.14 · $4 bulb · 0.5 kg CO₂/kWh
 * → 3.7 mo payback · $13.03/yr · 46.5 kg CO₂/yr.
 */
export function LedSavingsRoiViz({ className }: LedSavingsRoiVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--led-savings-roi", className)}
      aria-label="LED savings and ROI visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">LED Savings &amp; ROI</h3>
        <p className="tool-viz__subtitle">
          High-watt legacy lamps burn kilowatt-hours and cash. Matching-lumen
          LEDs slash draw — payback is bulb price divided by daily energy
          savings, with CO₂ falling in step.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg led-savings-roi-viz"
          role="img"
          aria-labelledby="lsr-viz-title lsr-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="lsr-viz-title">
            LED savings and ROI animated flow diagram
          </title>
          <desc id="lsr-viz-desc">
            Existing bulb watts and hours set legacy operating cost. An LED
            replacement cuts power draw, annual kilowatt-hours, dollars, and
            CO2. Payback is LED price divided by daily savings. Sample: a 60
            watt incandescent replaced by a 9 watt LED used 5 hours per day at
            14 cents per kilowatt-hour with a 4 dollar bulb breaks even in
            about 3.7 months, saves 13 dollars a year, and avoids roughly 47
            kilograms of CO2 annually.
          </desc>

          <defs>
            <pattern
              id="lsr-viz-grid"
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
              id="lsr-viz-arrow"
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
              id="lsr-viz-pulse"
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
              id="lsr-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <radialGradient id="lsr-viz-glow" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.55" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#lsr-viz-grid)"
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
            LEGACY → LED
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

          {/* —— INPUT: Legacy —— */}
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
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              EXISTING BULB
            </text>
            <text
              x="56"
              y="134"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              60 W
            </text>
            <text
              x="56"
              y="158"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              incandescent
            </text>
          </g>

          {/* —— INPUT: LED —— */}
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
              y="214"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              LED · PRICE · HOURS
            </text>
            <text
              x="56"
              y="250"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              9 W · $4
            </text>
            <text
              x="56"
              y="274"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              5 hrs/day use
            </text>
          </g>

          {/* —— INPUT: Rate / CO2 —— */}
          <g>
            <rect
              x="40"
              y="304"
              width="230"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="330"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              RATE · GRID CO₂
            </text>
            <text
              x="56"
              y="366"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.14/kWh
            </text>
            <text
              x="56"
              y="390"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              0.5 kg CO₂ / kWh
            </text>
          </g>

          {/* —— Flow inputs → mid —— */}
          <path
            d="M 270 122 L 320 122"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#lsr-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 122 L 320 122"
            fill="none"
            stroke="url(#lsr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 238 L 295 238 L 295 200 L 320 200"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#lsr-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 270 238 L 295 238 L 295 200 L 320 200"
            fill="none"
            stroke="url(#lsr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 354 L 295 354 L 295 280 L 320 280"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#lsr-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 354 L 295 354 L 295 280 L 320 280"
            fill="none"
            stroke="url(#lsr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— MID: Legacy lamp —— */}
          <g>
            <rect
              x="330"
              y="72"
              width="280"
              height="140"
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
              LEGACY LOAD
            </text>
            <g transform="translate(360, 118)">
              <ellipse
                className="lsr-viz-legacy-glow"
                cx="28"
                cy="18"
                rx="36"
                ry="28"
                fill="url(#lsr-viz-glow)"
              />
              <path
                className="lsr-viz-bulb"
                d="M 16 8 Q 28 -6 40 8 V 28 H 16 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <rect
                x="20"
                y="28"
                width="16"
                height="14"
                rx="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <line
                x1="22"
                y1="34"
                x2="34"
                y2="34"
                stroke="#444444"
                strokeWidth="1"
              />
            </g>
            <text
              x="430"
              y="140"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $15.33/yr
            </text>
            <text
              x="430"
              y="168"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              109.5 kWh · 54.8 kg CO₂
            </text>
            <rect
              x="430"
              y="182"
              width="150"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="lsr-viz-legacy-bar"
              x="432"
              y="184"
              width="130"
              height="6"
              rx="1"
              fill="url(#lsr-viz-bar)"
            />
          </g>

          {/* —— MID: LED swap —— */}
          <g>
            <rect
              x="330"
              y="230"
              width="280"
              height="180"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="256"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              LED SWAP · −51 W
            </text>
            <g transform="translate(360, 278)">
              <ellipse
                className="lsr-viz-led-glow"
                cx="28"
                cy="18"
                rx="28"
                ry="22"
                fill="url(#lsr-viz-glow)"
              />
              <path
                className="lsr-viz-bulb lsr-viz-bulb--led"
                d="M 18 10 Q 28 -2 38 10 V 26 H 18 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <rect
                x="22"
                y="26"
                width="12"
                height="12"
                rx="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <path
                className="tool-viz-flow__pulse"
                d="M 56 20 L 90 20"
                fill="none"
                stroke="url(#lsr-viz-pulse)"
                strokeWidth="2"
                markerEnd="url(#lsr-viz-arrow)"
              />
            </g>
            <text
              x="470"
              y="300"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="lsr-viz-led-cost"
            >
              $2.30/yr
            </text>
            <text
              x="470"
              y="326"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              16.4 kWh · 8.2 kg CO₂
            </text>
            <text
              x="346"
              y="370"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              daily $ save ≈ $0.04 → price ÷ save
            </text>
            <rect
              x="346"
              y="384"
              width="240"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="lsr-viz-led-bar"
              x="348"
              y="386"
              width="36"
              height="6"
              rx="1"
              fill="url(#lsr-viz-bar)"
            />
          </g>

          {/* —— Flow mid → output —— */}
          <path
            d="M 610 142 L 680 142"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#lsr-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 610 142 L 680 142"
            fill="none"
            stroke="url(#lsr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 610 320 L 645 320 L 645 220 L 680 220"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#lsr-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
            d="M 610 320 L 645 320 L 645 220 L 680 220"
            fill="none"
            stroke="url(#lsr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="690"
              y="72"
              width="230"
              height="352"
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
              TIME TO BREAK EVEN
            </text>
            <text
              x="706"
              y="148"
              fill="#ededed"
              fontSize="34"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="lsr-viz-output-value"
            >
              3.7 mo
            </text>
            <text
              x="706"
              y="176"
              fill="#888888"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              ≈ 112 days
            </text>

            <rect
              x="706"
              y="196"
              width="198"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="lsr-viz-payback-bar"
              x="708"
              y="198"
              width="120"
              height="8"
              rx="1"
              fill="url(#lsr-viz-bar)"
            />

            <text
              x="706"
              y="244"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ANNUAL $ SAVINGS
            </text>
            <text
              x="706"
              y="278"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="lsr-viz-savings-value"
            >
              $13.03
            </text>
            <text
              x="706"
              y="302"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              93.1 kWh avoided
            </text>

            <text
              x="706"
              y="340"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CO₂ REDUCTION
            </text>
            <text
              x="706"
              y="374"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="lsr-viz-co2-value"
            >
              46.5 kg/yr
            </text>
            <text
              x="706"
              y="400"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ≈ 3.9 kg / month
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
              (W_legacy − W_LED) × hrs → kWh × $ → payback · CO₂
            </text>
            <text
              x="500"
              y="28"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SAMPLE
            </text>
            <text
              x="500"
              y="52"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              60 W → 9 W · $4 · 5 h → 3.7 mo · $13/yr
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
