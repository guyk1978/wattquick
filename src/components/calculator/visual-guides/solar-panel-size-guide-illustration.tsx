"use client";

import { cn } from "@/lib/utils";

interface SolarPanelSizeGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: daily Wh + sun hours + efficiency → panel W.
 * Modal only (not embedded in page DOM by default).
 */
export function SolarPanelSizeGuideIllustration({
  className,
}: SolarPanelSizeGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "solar-panel-size-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="sps-guide-title sps-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="sps-guide-title">Solar panel sizing flow diagram</title>
      <desc id="sps-guide-desc">
        Inputs: daily energy need in watt-hours, peak sun hours, and system
        efficiency. Process: divide daily energy by available harvest window.
        Output: minimum solar panel wattage rating.
      </desc>

      <defs>
        <pattern
          id="bp-sps-grid-minor"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.35"
            opacity="0.12"
          />
        </pattern>
        <pattern
          id="bp-sps-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-sps-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-sps-pencil" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.04 0"
            in="noise"
            result="grain"
          />
          <feBlend in="SourceGraphic" in2="grain" mode="multiply" />
        </filter>
      </defs>

      <rect
        width="720"
        height="420"
        fill="url(#bp-sps-grid-major)"
        className="text-foreground"
        rx="2"
      />
      <rect
        x="12"
        y="12"
        width="696"
        height="396"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="6 4"
        opacity="0.35"
        rx="1"
      />

      <text
        x="36"
        y="44"
        fill="currentColor"
        fontSize="11"
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.12em"
        opacity="0.55"
      >
        FIG. 1 — SOLAR PANEL SIZE
      </text>
      <path
        d="M 34 52 H 268"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
        fill="none"
      />

      {/* INPUTS */}
      <text
        x="36"
        y="80"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        INPUTS
      </text>

      <g
        filter="url(#bp-sps-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Daily energy Wh/day */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 132 Q 174 138 168 138 H 44 Q 38 138 36 132 Z"
          strokeWidth="1.1"
        />
        <path d="M 52 108 H 88 M 52 118 H 120 M 52 128 H 100" strokeWidth="0.8" opacity="0.7" />
        <text
          x="48"
          y="104"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          daily load
        </text>
        <text
          x="48"
          y="124"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          2400 Wh/day
        </text>

        {/* Peak sun hours */}
        <path
          d="M 36 152 Q 38 148 44 148 H 168 Q 174 148 176 154 V 218 Q 174 224 168 224 H 44 Q 38 224 36 218 Z"
          strokeWidth="1.1"
        />
        <circle cx="72" cy="178" r="12" strokeWidth="1" />
        <path
          d="M 72 162 V 158 M 72 198 V 202 M 58 178 H 54 M 86 178 H 90 M 61 165 L 58 162 M 83 165 L 86 162 M 61 191 L 58 194 M 83 191 L 86 194"
          strokeWidth="0.7"
        />
        <text
          x="96"
          y="182"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          5 h sun
        </text>
        <text
          x="48"
          y="164"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          peak sun hrs
        </text>
        <path d="M 52 200 H 160" strokeWidth="0.6" opacity="0.5" />
        <path d="M 52 200 H 92" strokeWidth="1.2" />
        <text
          x="48"
          y="214"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          0 ———— 5 ———— 24 h day
        </text>

        {/* System efficiency */}
        <path
          d="M 36 238 Q 38 234 44 234 H 168 Q 174 234 176 240 V 276 Q 174 282 168 282 H 44 Q 38 282 36 276 Z"
          strokeWidth="1.1"
        />
        <path d="M 52 258 H 156" strokeWidth="0.8" />
        <path d="M 52 258 H 128" strokeWidth="1.2" />
        <text
          x="48"
          y="250"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          system η
        </text>
        <text
          x="48"
          y="272"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          80%
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 115 H 218" strokeLinecap="round" />
        <path d="M 214 111 L 222 115 L 214 119" strokeLinejoin="round" />
        <path d="M 186 186 H 218" strokeLinecap="round" />
        <path d="M 214 182 L 222 186 L 214 190" />
        <path d="M 186 258 H 218" strokeLinecap="round" />
        <path d="M 214 254 L 222 258 L 214 262" />
      </g>

      {/* PROCESS */}
      <text
        x="228"
        y="80"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        PROCESS
      </text>

      <g
        filter="url(#bp-sps-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 218 92 Q 220 86 228 86 H 468 Q 476 86 478 94 V 288 Q 476 296 468 296 H 228 Q 220 296 218 288 Z"
          strokeWidth="1.2"
        />

        <text
          x="238"
          y="112"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          Harvest window
        </text>
        <text
          x="256"
          y="136"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          W = Wh/day ÷ (h × η)
        </text>
        <text
          x="256"
          y="162"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          2400 ÷ (5 × 0.80)
        </text>
        <text
          x="256"
          y="186"
          fill="currentColor"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          = 600 W
        </text>

        {/* Sun arc over panel */}
        <path d="M 280 228 Q 360 188 440 228" strokeWidth="0.9" opacity="0.6" />
        <circle cx="360" cy="200" r="10" strokeWidth="0.9" />
        <path
          d="M 360 186 V 182 M 360 218 V 222 M 346 200 H 342 M 374 200 H 378"
          strokeWidth="0.6"
        />

        {/* Panel array sketch */}
        <rect x="296" y="238" width="36" height="24" strokeWidth="0.9" rx="1" />
        <rect x="336" y="238" width="36" height="24" strokeWidth="0.9" rx="1" />
        <rect x="376" y="238" width="36" height="24" strokeWidth="0.9" rx="1" />
        <path d="M 304 246 H 324 M 304 254 H 324 M 344 246 H 364 M 344 254 H 364 M 384 246 H 404 M 384 254 H 404" strokeWidth="0.5" opacity="0.6" />
        <path d="M 296 262 H 412" strokeWidth="0.7" opacity="0.5" />

        <text
          x="256"
          y="278"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          energy need ÷ usable harvest time
        </text>
      </g>

      {/* Arrow to output */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 488 190 H 518" strokeLinecap="round" />
        <path d="M 514 186 L 522 190 L 514 194" strokeLinejoin="round" />
      </g>

      {/* OUTPUT */}
      <text
        x="538"
        y="80"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        OUTPUT
      </text>

      <g
        filter="url(#bp-sps-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 288 Q 692 296 684 296 H 538 Q 530 296 528 288 Z"
          strokeWidth="1.3"
        />

        {/* Large panel module */}
        <rect x="568" y="118" width="88" height="56" strokeWidth="1.2" rx="2" />
        <path d="M 580 134 H 644 M 580 146 H 644 M 580 158 H 644 M 592 118 V 174 M 616 118 V 174 M 640 118 V 174" strokeWidth="0.7" opacity="0.65" />
        <text
          x="612"
          y="192"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          PV module
        </text>

        <text
          x="612"
          y="232"
          textAnchor="middle"
          fill="currentColor"
          fontSize="28"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          600 W
        </text>
        <text
          x="612"
          y="256"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          min. panel rating
        </text>
        <text
          x="612"
          y="276"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          add 20–30% margin
        </text>
      </g>

      {/* Bottom note */}
      <g
        filter="url(#bp-sps-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      >
        <rect
          x="36"
          y="352"
          width="648"
          height="48"
          strokeWidth="0.8"
          strokeDasharray="4 3"
          rx="1"
        />
        <text
          x="48"
          y="368"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          peak sun hours = full-sun equivalent per day (location & season)
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          2400 Wh
        </text>
        <text x="130" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ÷
        </text>
        <text x="150" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          (5 h × 80%)
        </text>
        <text x="230" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          =
        </text>
        <text x="250" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          600 W panels
        </text>
      </g>
    </svg>
  );
}
