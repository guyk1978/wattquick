"use client";

import { cn } from "@/lib/utils";

interface TouShiftingSavingsGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: shiftable kWh + peak/off rates → spread → savings.
 * Modal only (not embedded in page DOM by default).
 */
export function TouShiftingSavingsGuideIllustration({
  className,
}: TouShiftingSavingsGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "tou-shifting-savings-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="toushift-guide-title toushift-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="toushift-guide-title">TOU load shifting savings flow diagram</title>
      <desc id="toushift-guide-desc">
        Inputs: shiftable load in kilowatt-hours per month, peak rate, and
        off-peak rate. Process: compute price spread per kilowatt-hour and
        multiply by shifted energy. Output: monthly and annual savings from
        moving load to cheaper windows.
      </desc>

      <defs>
        <pattern
          id="bp-toushift-grid-minor"
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
          id="bp-toushift-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-toushift-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter
          id="bp-toushift-pencil"
          x="-2%"
          y="-2%"
          width="104%"
          height="104%"
        >
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
        fill="url(#bp-toushift-grid-major)"
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
        FIG. 1 — TOU LOAD SHIFTING
      </text>
      <path
        d="M 34 52 H 300"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
        fill="none"
      />

      {/* INPUT */}
      <text
        x="36"
        y="80"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        INPUT
      </text>

      <g
        filter="url(#bp-toushift-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 92 Q 38 86 44 86 H 196 Q 202 86 204 92 V 268 Q 202 274 196 274 H 44 Q 38 274 36 268 Z"
          strokeWidth="1.1"
        />

        <text
          x="48"
          y="108"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          shiftable load
        </text>
        <text
          x="48"
          y="132"
          fill="currentColor"
          fontSize="22"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="700"
        >
          350 kWh
        </text>
        <text
          x="48"
          y="152"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          per month movable
        </text>

        <path d="M 48 164 H 188" strokeWidth="0.6" opacity="0.35" />

        <text
          x="48"
          y="180"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          TOU tariff spread
        </text>
        <text
          x="48"
          y="198"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          peak $0.42/kWh
        </text>
        <text
          x="48"
          y="214"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          off-peak $0.11/kWh
        </text>

        {/* Clock windows sketch */}
        <circle cx="158" cy="242" r="16" strokeWidth="0.9" />
        <path d="M 158 242 L 158 232" strokeWidth="0.7" />
        <path d="M 158 242 L 166 246" strokeWidth="0.7" />
        <text
          x="158"
          y="268"
          textAnchor="middle"
          fill="currentColor"
          fontSize="6"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          time windows
        </text>
      </g>

      {/* Arrow to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 214 180 H 244" strokeLinecap="round" />
        <path d="M 240 176 L 248 180 L 240 184" strokeLinejoin="round" />
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
        filter="url(#bp-toushift-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 248 92 Q 250 86 258 86 H 468 Q 476 86 478 94 V 268 Q 476 276 468 276 H 258 Q 250 276 248 268 Z"
          strokeWidth="1.2"
        />

        <text
          x="268"
          y="112"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          Move kWh to off-peak
        </text>

        {/* Peak → off-peak arrow */}
        <rect x="262" y="122" width="72" height="32" strokeWidth="0.8" rx="1" />
        <text
          x="298"
          y="142"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          PEAK
        </text>
        <path d="M 338 138 H 358" strokeWidth="0.9" />
        <path d="M 354 134 L 360 138 L 354 142" strokeWidth="0.7" />
        <rect x="362" y="122" width="72" height="32" strokeWidth="0.8" rx="1" />
        <text
          x="398"
          y="142"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          OFF-PEAK
        </text>

        <text
          x="268"
          y="172"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          spread = $0.42 − $0.11
        </text>
        <text
          x="268"
          y="190"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          = $0.31/kWh saved
        </text>

        <path d="M 262 200 H 456" strokeWidth="0.6" opacity="0.35" />

        <text
          x="268"
          y="218"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          savings = kWh × spread
        </text>
        <text
          x="268"
          y="240"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          350 × 0.31 = $109/mo
        </text>

        <text
          x="268"
          y="262"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          EV, laundry &amp; HVAC are common shift targets
        </text>
      </g>

      {/* Arrow to output */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 488 180 H 518" strokeLinecap="round" />
        <path d="M 514 176 L 522 180 L 514 184" strokeLinejoin="round" />
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
        filter="url(#bp-toushift-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 268 Q 692 276 684 276 H 538 Q 530 276 528 268 Z"
          strokeWidth="1.3"
        />

        <text
          x="611"
          y="118"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          energy-rate savings
        </text>

        <text
          x="611"
          y="168"
          textAnchor="middle"
          fill="currentColor"
          fontSize="28"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          $109
        </text>
        <text
          x="611"
          y="192"
          textAnchor="middle"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          per month
        </text>

        <rect x="558" y="208" width="106" height="36" strokeWidth="0.9" rx="1" />
        <text
          x="611"
          y="230"
          textAnchor="middle"
          fill="currentColor"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          $1,302/yr
        </text>

        <text
          x="611"
          y="258"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          $0.31/kWh × 350 kWh
        </text>
      </g>

      {/* Footer */}
      <g
        filter="url(#bp-toushift-pencil)"
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
          behavior change only — energy kWh charges, not demand kW penalties
        </text>
        <text
          x="72"
          y="388"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          $109 × 12 =
        </text>
        <text
          x="140"
          y="388"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          $1,302/yr saved
        </text>
      </g>
    </svg>
  );
}
