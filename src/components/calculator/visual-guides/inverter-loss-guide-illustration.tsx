"use client";

import { cn } from "@/lib/utils";

interface InverterLossGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: DC W + η → AC out + heat loss.
 * Black & white, thin pencil lines — modal only (not embedded in page DOM by default).
 */
export function InverterLossGuideIllustration({
  className,
}: InverterLossGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "inverter-loss-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="invl-guide-title invl-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="invl-guide-title">Inverter loss flow diagram</title>
      <desc id="invl-guide-desc">
        Inputs: DC input power in watts and inverter efficiency percentage.
        Process: AC output equals DC input times efficiency; loss watts equals
        DC minus AC and dissipates as heat. Output: usable AC power and
        inverter heat loss.
      </desc>

      <defs>
        <pattern
          id="bp-invl-grid-minor"
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
          id="bp-invl-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-invl-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-invl-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-invl-grid-major)"
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
        FIG. 1 — INVERTER LOSS
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
        x="36"
        y="84"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        INPUTS
      </text>

      {/* DC input watts */}
      <g
        filter="url(#bp-invl-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 96 Q 38 92 44 92 H 108 Q 114 92 116 98 V 148 Q 114 154 108 154 H 44 Q 38 154 36 148 Z"
          strokeWidth="1.1"
        />
        <rect x="42" y="104" width="32" height="36" strokeWidth="0.9" rx="2" />
        <path d="M 50 112 H 66 M 50 120 H 66" strokeWidth="0.5" opacity="0.6" />
        <text x="48" y="104" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          DC
        </text>
        <text
          x="82"
          y="128"
          fill="currentColor"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          1,200 W
        </text>
      </g>
      <text
        x="36"
        y="170"
        fill="currentColor"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        opacity="0.75"
      >
        DC input power (W)
      </text>

      {/* Inverter efficiency */}
      <g
        filter="url(#bp-invl-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      >
        <path
          d="M 36 184 Q 38 180 44 180 H 108 Q 114 180 116 186 V 236 Q 114 242 108 242 H 44 Q 38 242 36 236 Z"
          strokeWidth="1.1"
        />
        <path d="M 48 208 H 100" strokeWidth="0.8" />
        <path d="M 48 208 H 92" strokeWidth="1.2" />
        <text x="48" y="200" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          inverter η
        </text>
        <text
          x="48"
          y="228"
          fill="currentColor"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          92%
        </text>
      </g>
      <text
        x="36"
        y="258"
        fill="currentColor"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        opacity="0.75"
      >
        Inverter efficiency (%)
      </text>
      <text
        x="36"
        y="274"
        fill="currentColor"
        fontSize="8"
        fontFamily="ui-monospace, monospace"
        opacity="0.6"
        stroke="none"
      >
        e.g. 1,200 W DC · 92% η
      </text>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 126 124 H 198" strokeLinecap="round" />
        <path d="M 194 120 L 202 124 L 194 128" strokeLinejoin="round" />
        <path d="M 126 212 H 198" strokeLinecap="round" />
        <path d="M 194 208 L 202 212 L 194 216" />
      </g>

      {/* PROCESS */}
      <text
        x="228"
        y="84"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        PROCESS
      </text>

      <g
        filter="url(#bp-invl-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 218 96 Q 220 90 228 90 H 452 Q 460 90 462 98 V 318 Q 460 326 452 326 H 228 Q 220 326 218 318 Z"
          strokeWidth="1.2"
        />

        <text
          x="238"
          y="118"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          DC → AC conversion
        </text>
        <text
          x="256"
          y="142"
          fill="currentColor"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          AC = DC × (η ÷ 100)
        </text>
        <text
          x="256"
          y="166"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          1,200 × 0.92 = 1,104 W
        </text>

        <path d="M 238 182 H 430" strokeWidth="0.6" opacity="0.45" />

        {/* Inverter box with heat */}
        <rect x="256" y="192" width="72" height="44" strokeWidth="1" rx="2" />
        <text x="268" y="210" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          INV
        </text>
        <path d="M 268 220 H 316" strokeWidth="0.6" opacity="0.5" />
        <path d="M 268 228 H 308" strokeWidth="0.6" opacity="0.5" />
        <path d="M 340 214 L 348 200 L 356 214 L 352 214 L 352 226 L 344 226 L 344 214 Z" strokeWidth="0.8" />
        <text x="362" y="218" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          heat
        </text>

        <text
          x="256"
          y="256"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          Loss = DC − AC
        </text>
        <text
          x="256"
          y="278"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          1,200 − 1,104 = 96 W (8%)
        </text>
        <text
          x="256"
          y="304"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          switching loss · I²R · idle draw
        </text>
      </g>

      {/* Arrow to output */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 472 210 H 518" strokeLinecap="round" />
        <path d="M 514 206 L 522 210 L 514 214" strokeLinejoin="round" />
      </g>

      {/* OUTPUT */}
      <text
        x="538"
        y="84"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        OUTPUT
      </text>

      <g
        filter="url(#bp-invl-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 96 Q 530 90 538 90 H 684 Q 692 90 694 98 V 318 Q 692 326 684 326 H 538 Q 530 326 528 318 Z"
          strokeWidth="1.3"
        />

        <text x="548" y="112" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          AC output
        </text>
        <text
          x="616"
          y="156"
          textAnchor="middle"
          fill="currentColor"
          fontSize="28"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          1,104 W
        </text>
        <text
          x="616"
          y="178"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          usable AC power
        </text>

        <path d="M 548 192 H 684" strokeWidth="0.6" opacity="0.4" />

        <text x="548" y="212" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          lost as heat
        </text>
        <text
          x="616"
          y="244"
          textAnchor="middle"
          fill="currentColor"
          fontSize="18"
          fontFamily="ui-monospace, monospace"
          fontWeight="600"
          stroke="none"
        >
          96 W
        </text>
        <text
          x="616"
          y="266"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          8% inverter loss
        </text>
        <text
          x="616"
          y="298"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          size battery for DC in, not AC load
        </text>
      </g>

      {/* Power split bar */}
      <g
        filter="url(#bp-invl-pencil)"
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
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          1,200 W DC in
        </text>
        <rect x="140" y="360" width="400" height="12" strokeWidth="0.8" rx="1" />
        <rect
          x="140"
          y="360"
          width="368"
          height="12"
          strokeWidth="0.8"
          fill="currentColor"
          fillOpacity="0.12"
          rx="1"
        />
        <rect
          x="508"
          y="360"
          width="32"
          height="12"
          strokeWidth="0.8"
          fill="currentColor"
          fillOpacity="0.06"
          rx="1"
        />
        <text x="150" y="370" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          1,104 W AC
        </text>
        <text x="512" y="370" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          96 W
        </text>
        <text x="48" y="392" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          η drops at very light load · ventilate inverter enclosure
        </text>
      </g>
    </svg>
  );
}
