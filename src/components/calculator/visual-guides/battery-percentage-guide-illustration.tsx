"use client";

import { cn } from "@/lib/utils";

interface BatteryPercentageGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: inputs (current mAh, full mAh) → ratio × 100 → % SoC.
 * Black & white, thin pencil lines — modal only (not embedded in page DOM by default).
 */
export function BatteryPercentageGuideIllustration({
  className,
}: BatteryPercentageGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "battery-percentage-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="battery-pct-guide-title battery-pct-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="battery-pct-guide-title">Battery percentage flow diagram</title>
      <desc id="battery-pct-guide-desc">
        Inputs: current charge in milliamp-hours and full rated capacity in
        milliamp-hours. Process: divide current by full capacity and multiply by
        one hundred. Output: remaining charge as a percentage.
      </desc>

      <defs>
        <pattern
          id="bp-pct-grid-minor"
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
          id="bp-pct-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-pct-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-pct-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-pct-grid-major)"
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
        FIG. 1 — BATTERY PERCENTAGE
      </text>
      <path
        d="M 34 52 H 248"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
        fill="none"
      />

      {/* INPUTS */}
      <text
        x="48"
        y="88"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        INPUTS
      </text>

      {/* Current charge — partial fill battery */}
      <g
        filter="url(#bp-pct-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 52 108 Q 54 102 62 102 H 108 Q 116 102 118 110 V 198 Q 116 206 108 206 H 62 Q 54 206 52 198 Z"
          strokeWidth="1.2"
        />
        <path d="M 66 118 H 104" strokeWidth="0.8" opacity="0.45" />
        <rect
          x="58"
          y="148"
          width="54"
          height="50"
          strokeWidth="1"
          fill="currentColor"
          fillOpacity="0.12"
        />
        <path
          d="M 58 148 H 112 V 198 H 58 Z"
          strokeWidth="0.9"
          opacity="0.35"
        />
        <path d="M 70 128 V 134 M 100 128 V 134" strokeWidth="1" />
      </g>
      <text
        x="48"
        y="224"
        fill="currentColor"
        fontSize="10"
        fontFamily="ui-monospace, monospace"
        opacity="0.75"
      >
        Current charge (mAh)
      </text>
      <text
        x="72"
        y="244"
        fill="currentColor"
        fontSize="11"
        fontFamily="ui-monospace, monospace"
        fontWeight="600"
        stroke="none"
      >
        e.g. 3,200 mAh
      </text>

      {/* Full capacity — empty outline battery */}
      <g
        filter="url(#bp-pct-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 52 264 Q 54 258 62 258 H 108 Q 116 258 118 266 V 354 Q 116 362 108 362 H 62 Q 54 362 52 354 Z"
          strokeWidth="1.2"
        />
        <path
          d="M 58 304 H 112 V 354 H 58 Z"
          strokeWidth="0.9"
          strokeDasharray="3 2"
          opacity="0.5"
        />
        <path d="M 70 278 V 284 M 100 278 V 284" strokeWidth="1" />
      </g>
      <text
        x="48"
        y="380"
        fill="currentColor"
        fontSize="10"
        fontFamily="ui-monospace, monospace"
        opacity="0.75"
      >
        Full capacity (mAh)
      </text>
      <text
        x="72"
        y="398"
        fill="currentColor"
        fontSize="11"
        fontFamily="ui-monospace, monospace"
        fontWeight="600"
        stroke="none"
        opacity="0.85"
      >
        e.g. 5,000 mAh
      </text>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 128 156 H 208" strokeLinecap="round" />
        <path d="M 204 152 L 212 156 L 204 160" strokeLinejoin="round" />
        <path d="M 128 310 H 208" strokeLinecap="round" />
        <path d="M 204 306 L 212 310 L 204 314" strokeLinejoin="round" />
      </g>

      {/* PROCESS */}
      <text
        x="248"
        y="88"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        PROCESS
      </text>

      <g
        filter="url(#bp-pct-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 228 104 Q 230 98 238 98 H 442 Q 450 98 452 106 V 318 Q 450 326 442 326 H 238 Q 230 326 228 318 Z"
          strokeWidth="1.2"
        />
        <text
          x="248"
          y="128"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          Linear state-of-charge ratio
        </text>
        <path d="M 248 138 H 420" strokeWidth="0.6" opacity="0.5" />

        <text
          x="268"
          y="178"
          fill="currentColor"
          fontSize="16"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          % = ( current ÷ full ) × 100
        </text>

        <text
          x="268"
          y="212"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          same units on both sides
        </text>
        <text
          x="268"
          y="234"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          (mAh ÷ mAh or Ah ÷ Ah)
        </text>

        <text
          x="268"
          y="272"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          3,200 ÷ 5,000 × 100
        </text>
        <text
          x="268"
          y="296"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          = 0.64 × 100
        </text>
      </g>

      {/* Arrow to output */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 462 210 H 518" strokeLinecap="round" />
        <path d="M 514 206 L 522 210 L 514 214" strokeLinejoin="round" />
      </g>

      {/* OUTPUT */}
      <text
        x="548"
        y="88"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        OUTPUT
      </text>

      <g
        filter="url(#bp-pct-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 536 104 Q 538 98 546 98 H 676 Q 684 98 686 106 V 318 Q 684 326 676 326 H 546 Q 538 326 536 318 Z"
          strokeWidth="1.3"
        />

        {/* Arc gauge sketch */}
        <path
          d="M 566 248 A 45 45 0 0 1 656 248"
          strokeWidth="1.4"
        />
        <path
          d="M 566 248 A 45 45 0 0 1 632 196"
          strokeWidth="2"
          opacity="0.85"
        />
        <line x1="611" y1="248" x2="632" y2="210" strokeWidth="1.2" />
        <circle cx="611" cy="248" r="4" fill="currentColor" stroke="none" />

        <text
          x="611"
          y="278"
          textAnchor="middle"
          fill="currentColor"
          fontSize="28"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          64%
        </text>
        <text
          x="611"
          y="302"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          charge level (SoC)
        </text>
      </g>

      {/* Capacity bar comparison along bottom */}
      <g
        filter="url(#bp-pct-pencil)"
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
          0%
        </text>
        <rect
          x="72"
          y="362"
          width="400"
          height="12"
          strokeWidth="0.8"
          rx="1"
        />
        <rect
          x="72"
          y="362"
          width="256"
          height="12"
          strokeWidth="0.8"
          fill="currentColor"
          fillOpacity="0.15"
          rx="1"
        />
        <line x1="328" y1="358" x2="328" y2="378" strokeWidth="0.9" />
        <text
          x="332"
          y="368"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          64% of full
        </text>
        <text
          x="480"
          y="368"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          100% rated
        </text>
      </g>
    </svg>
  );
}
