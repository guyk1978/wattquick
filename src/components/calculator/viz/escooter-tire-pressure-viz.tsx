"use client";

import { cn } from "@/lib/utils";

interface EscooterTirePressureVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for E-Scooter Tyre Pressure [VIZ] tab.
 * Under-inflation → rolling multiplier → adjusted Wh/km.
 * Sample: 2.8 bar vs 3.5 bar · 10″ · 75 kg → ~16.5 Wh/km (~25% range penalty).
 */
export function EscooterTirePressureViz({
  className,
}: EscooterTirePressureVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--escooter-tire-pressure", className)}
      aria-label="E-scooter tyre pressure visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Tyre Pressure & Rolling Resistance</h3>
        <p className="tool-viz__subtitle">
          Soft tyres widen the contact patch and raise deformation loss —
          each bar below recommendation multiplies Wh/km on 8–10″ wheels.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg escooter-tire-pressure-viz"
          role="img"
          aria-labelledby="estp-viz-title estp-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="estp-viz-title">
            E-scooter tyre pressure animated flow diagram
          </title>
          <desc id="estp-viz-desc">
            Current tyre pressure compared to recommended bar feeds a rolling
            resistance path that shows contact-patch deformation and friction
            loss. Sample: 2.8 bar versus 3.5 bar on a 10 inch wheel with a 75
            kilogram rider yields about 16.5 watt-hours per kilometre — roughly
            a 25 percent range penalty.
          </desc>

          <defs>
            <pattern
              id="estp-viz-grid"
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
              id="estp-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#a3e635" />
            </marker>
            <linearGradient
              id="estp-viz-pulse"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0" />
              <stop offset="50%" stopColor="#a3e635" stopOpacity="1" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="estp-viz-pressure"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient
              id="estp-viz-wh"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#estp-viz-grid)"
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
            DEFORMATION · RESISTANCE
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

          {/* —— INPUT: Current pressure —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="150"
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
              CURRENT PRESSURE
            </text>
            <text
              x="56"
              y="132"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              2.8 bar
            </text>
            <text
              x="56"
              y="154"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              ≈ 40.6 psi · soft
            </text>
            <rect
              x="56"
              y="172"
              width="18"
              height="32"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="estp-viz-pressure-fill estp-viz-pressure-fill--soft"
              x="58"
              y="186"
              width="14"
              height="16"
              rx="1"
              fill="url(#estp-viz-pressure)"
            />
            <text
              x="84"
              y="194"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              −0.7 bar deficit
            </text>
          </g>

          {/* —— INPUT: Recommended —— */}
          <g>
            <rect
              x="40"
              y="240"
              width="230"
              height="130"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="266"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              RECOMMENDED
            </text>
            <text
              x="56"
              y="300"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              3.5 bar
            </text>
            <text
              x="56"
              y="322"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              ≈ 50.8 psi · sidewall
            </text>
            <text
              x="56"
              y="348"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              10″ wheel · 75 kg rider
            </text>
          </g>

          {/* —— Flow: inputs → deformation —— */}
          <path
            d="M 270 147 L 320 147"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#estp-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 147 L 320 147"
            fill="none"
            stroke="url(#estp-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 305 L 300 305 L 300 210 L 320 210"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#estp-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 305 L 300 305 L 300 210 L 320 210"
            fill="none"
            stroke="url(#estp-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Soft tyre contact patch —— */}
          <g>
            <rect
              x="330"
              y="72"
              width="300"
              height="200"
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
              UNDER-INFLATED CONTACT
            </text>

            {/* Soft tyre silhouette */}
            <g transform="translate(370, 130)">
              <ellipse
                className="estp-viz-tyre-soft"
                cx="70"
                cy="48"
                rx="62"
                ry="42"
                fill="none"
                stroke="#a3e635"
                strokeWidth="2"
              />
              <ellipse
                cx="70"
                cy="48"
                rx="28"
                ry="20"
                fill="none"
                stroke="#333333"
                strokeWidth="1"
              />
              <line
                x1="8"
                y1="90"
                x2="132"
                y2="90"
                stroke="#444444"
                strokeWidth="1.5"
              />
              <path
                className="estp-viz-contact-soft"
                d="M 22 90 Q 70 78 118 90"
                fill="none"
                stroke="#a3e635"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <text
                x="70"
                y="112"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                wide patch · flex loss
              </text>
            </g>

            {/* Friction arrows */}
            <g className="estp-viz-friction" transform="translate(520, 150)">
              <path
                d="M 0 20 L 48 20"
                fill="none"
                stroke="#a3e635"
                strokeWidth="1.5"
                markerEnd="url(#estp-viz-arrow)"
              />
              <path
                d="M 8 36 L 48 36"
                fill="none"
                stroke="#a3e635"
                strokeWidth="1.25"
                opacity="0.7"
                markerEnd="url(#estp-viz-arrow)"
              />
              <path
                d="M 16 52 L 48 52"
                fill="none"
                stroke="#a3e635"
                strokeWidth="1"
                opacity="0.45"
                markerEnd="url(#estp-viz-arrow)"
              />
              <text
                x="28"
                y="74"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                F_rr ↑
              </text>
            </g>
          </g>

          {/* —— FLOW: Rolling multiplier —— */}
          <g>
            <rect
              x="330"
              y="290"
              width="300"
              height="130"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="316"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ROLLING MULTIPLIER
            </text>
            <text
              x="346"
              y="352"
              fill="#a3e635"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="estp-viz-mult-value"
            >
              1.25×
            </text>
            <text
              x="346"
              y="380"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              1 + 0.7×0.35 · 10″ OK
            </text>
            <rect
              x="480"
              y="330"
              width="120"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="estp-viz-mult-bar"
              x="482"
              y="332"
              width="90"
              height="6"
              rx="1"
              fill="url(#estp-viz-wh)"
            />
            <text
              x="480"
              y="362"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              vs 1.00× at 3.5 bar
            </text>
          </g>

          {/* —— Flow: resistance → output —— */}
          <path
            d="M 630 172 L 680 172"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#estp-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 172 L 680 172"
            fill="none"
            stroke="url(#estp-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 630 355 L 655 355 L 655 280 L 680 280"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#estp-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 355 L 655 355 L 655 280 L 680 280"
            fill="none"
            stroke="url(#estp-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="690"
              y="72"
              width="230"
              height="348"
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
              ADJUSTED ENERGY
            </text>
            <text
              x="706"
              y="148"
              fill="#a3e635"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="estp-viz-output-value"
            >
              16.5
            </text>
            <text
              x="706"
              y="178"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
            >
              Wh/km
            </text>
            <text
              x="706"
              y="206"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              ≈ 26.5 Wh/mi
            </text>

            <rect
              x="706"
              y="230"
              width="198"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="estp-viz-wh-bar"
              x="708"
              y="232"
              width="148"
              height="8"
              rx="1"
              fill="url(#estp-viz-wh)"
            />

            {/* Firm reference tyre */}
            <g transform="translate(720, 270)">
              <text
                x="0"
                y="0"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                AT SPEC (3.5 bar)
              </text>
              <ellipse
                className="estp-viz-tyre-firm"
                cx="70"
                cy="48"
                rx="48"
                ry="40"
                fill="none"
                stroke="#555555"
                strokeWidth="1.5"
              />
              <line
                x1="22"
                y1="88"
                x2="118"
                y2="88"
                stroke="#333333"
                strokeWidth="1"
              />
              <path
                className="estp-viz-contact-firm"
                d="M 48 88 Q 70 84 92 88"
                fill="none"
                stroke="#666666"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <text
                x="70"
                y="110"
                textAnchor="middle"
                fill="#888888"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                13.3 Wh/km baseline
              </text>
            </g>

            <text
              x="706"
              y="400"
              fill="#a3e635"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="estp-viz-output-value"
            >
              +25% range penalty
            </text>
          </g>

          {/* —— Legend strip —— */}
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
              Δbar → rolling mult → base 13 Wh/km × mass → Wh/km
            </text>
            <text
              x="520"
              y="28"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SAMPLE
            </text>
            <text
              x="520"
              y="52"
              fill="#a3e635"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              2.8 / 3.5 bar · 10″ · 75 kg → 16.5 Wh/km
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
