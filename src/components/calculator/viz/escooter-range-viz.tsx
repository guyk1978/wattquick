"use client";

import { cn } from "@/lib/utils";

interface EscooterRangeVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for E-Scooter Range [VIZ] tab.
 * Usable Wh (SOC × pack eff) ÷ adjusted Wh/km (mass + tyre + voltage sag).
 * Sample: 48 V · 60% SOC · 720 Wh · 90% → ~26 km.
 */
export function EscooterRangeViz({ className }: EscooterRangeVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--escooter-range", className)}
      aria-label="E-scooter range visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">E-Scooter Range</h3>
        <p className="tool-viz__subtitle">
          Remaining pack energy at your SOC divides by Wh/km that grows with
          rider mass, soft tyres, and voltage sag under load.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg escooter-range-viz"
          role="img"
          aria-labelledby="esr-viz-title esr-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="esr-viz-title">
            E-scooter range animated flow diagram
          </title>
          <desc id="esr-viz-desc">
            Nominal voltage, state of charge, battery watt-hours, and rider mass
            feed a discharge path that applies voltage sag and rolling penalties.
            Sample: a 48 volt pack at 60 percent SOC with 720 watt-hours yields
            about 26 kilometers of remaining range.
          </desc>

          <defs>
            <pattern
              id="esr-viz-grid"
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
              id="esr-viz-arrow"
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
              id="esr-viz-pulse"
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
              id="esr-viz-soc"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient
              id="esr-viz-range"
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
            fill="url(#esr-viz-grid)"
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
            DISCHARGE PATH
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

          {/* —— INPUT: Voltage + SOC —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="130"
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
              VOLTAGE · SOC
            </text>
            <text
              x="56"
              y="132"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              48 V · 60%
            </text>
            <rect
              x="56"
              y="148"
              width="198"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="esr-viz-soc-bar"
              x="58"
              y="150"
              width="116"
              height="6"
              rx="1"
              fill="url(#esr-viz-soc)"
            />
            <text
              x="56"
              y="180"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              sag softer than 36 V
            </text>
          </g>

          {/* —— INPUT: Pack —— */}
          <g>
            <rect
              x="40"
              y="218"
              width="230"
              height="110"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="244"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BATTERY · EFF
            </text>
            <g transform="translate(56, 256)" stroke="#ededed" fill="none">
              <rect x="0" y="6" width="24" height="32" rx="2" strokeWidth="1.2" />
              <rect
                className="esr-viz-battery-fill"
                x="3"
                y="14"
                width="18"
                height="20"
                rx="1"
                fill="currentColor"
                fillOpacity="0.75"
                stroke="none"
              />
            </g>
            <text
              x="96"
              y="282"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              720 Wh · 90%
            </text>
            <text
              x="96"
              y="304"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ~15 Ah pack
            </text>
          </g>

          {/* —— INPUT: Rider / terrain —— */}
          <g>
            <rect
              x="40"
              y="344"
              width="230"
              height="114"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="370"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              RIDER · TYRES
            </text>
            <g
              transform="translate(56, 384)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.2"
              className="esr-viz-scooter"
            >
              <circle cx="10" cy="28" r="8" />
              <circle cx="48" cy="28" r="8" />
              <path d="M18 24 H40 L46 8 H54" strokeLinejoin="round" />
              <path d="M28 24 V12" />
            </g>
            <text
              x="120"
              y="408"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              75 kg
            </text>
            <text
              x="120"
              y="430"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              3.5 bar · flat urban
            </text>
          </g>

          {/* Flow → process */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#esr-viz-arrow)"
          >
            <path d="M 270 137 H 320 V 170 H 350" />
            <path d="M 270 273 H 320 V 250 H 350" />
            <path d="M 270 401 H 320 V 360 H 350" />
          </g>
          <g
            fill="none"
            stroke="url(#esr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 270 137 H 320 V 170 H 350"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 270 273 H 320 V 250 H 350"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse"
              style={{ animationDelay: "0.6s" }}
              d="M 270 401 H 320 V 360 H 350"
              pathLength="100"
            />
          </g>

          {/* —— PROCESS —— */}
          <g>
            <rect
              x="350"
              y="72"
              width="270"
              height="386"
              rx="4"
              fill="#111111"
              stroke="#404040"
              strokeWidth="1.25"
            />
            <text
              x="366"
              y="102"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              USABLE Wh ÷ Wh/km
            </text>

            <rect
              x="366"
              y="120"
              width="238"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="378"
              y="142"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 1 · USABLE ENERGY
            </text>
            <text
              x="378"
              y="164"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              720 × 0.60 × 0.90 ={" "}
              <tspan fill="#ededed">389 Wh</tspan>
            </text>

            <rect
              x="366"
              y="190"
              width="238"
              height="78"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="378"
              y="212"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 2 · VOLTAGE SAG
            </text>
            <text
              x="378"
              y="234"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              ~1.8 V sag · −3.8% eff
            </text>
            <text
              x="378"
              y="254"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              hills cut available power mid-ride
            </text>

            <rect
              x="366"
              y="282"
              width="238"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="378"
              y="304"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 3 · CONSUMPTION
            </text>
            <text
              x="378"
              y="326"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              ~14.8 Wh/km adjusted
            </text>

            <text
              x="366"
              y="368"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              RANGE BAND
            </text>
            <rect
              x="366"
              y="380"
              width="238"
              height="14"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="esr-viz-range-bar"
              x="368"
              y="382"
              width="234"
              height="10"
              rx="1"
              fill="url(#esr-viz-range)"
            />

            <text
              x="485"
              y="422"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              km = usable Wh ÷ Wh/km
            </text>
            <text
              x="485"
              y="442"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              standing drag &gt; e-bike Wh/km
            </text>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#esr-viz-arrow)"
          >
            <path d="M 620 265 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#esr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
              d="M 620 265 H 700"
              pathLength="100"
            />
          </g>

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="700"
              y="140"
              width="220"
              height="250"
              rx="4"
              fill="#111111"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeOpacity="0.45"
            />
            <text
              x="716"
              y="172"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              EST. REMAINING RANGE
            </text>

            <g
              transform="translate(778, 196)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
            >
              <circle cx="16" cy="28" r="10" className="esr-viz-wheel" />
              <circle cx="52" cy="28" r="10" className="esr-viz-wheel" />
              <path d="M26 24 H44 L50 8 H58" strokeLinejoin="round" />
              <path
                d="M0 42 H68"
                strokeDasharray="6 4"
                className="esr-viz-road"
              />
            </g>

            <text
              x="810"
              y="280"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="esr-viz-output-value"
            >
              26 km
            </text>
            <text
              x="810"
              y="310"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              ≈ 16 mi
            </text>
            <text
              x="810"
              y="342"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              389 Wh usable · 60% SOC
            </text>
            <text
              x="810"
              y="360"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              48 V pack · 90% eff
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Range ≈ (Wh × SOC% × pack eff) ÷ Wh/km · lower SOC raises sag and cuts hill power
          </text>
        </svg>
      </div>
    </section>
  );
}
