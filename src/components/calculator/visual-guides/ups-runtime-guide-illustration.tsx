"use client";

import { cn } from "@/lib/utils";

interface UpsRuntimeGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: battery Wh + load W → runtime hours → backup time.
 * Modal only (not embedded in page DOM by default).
 */
export function UpsRuntimeGuideIllustration({
  className,
}: UpsRuntimeGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "ups-runtime-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="ups-rt-guide-title ups-rt-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="ups-rt-guide-title">UPS runtime flow diagram</title>
      <desc id="ups-rt-guide-desc">
        Inputs: battery energy in watt-hours and load power in watts. Process:
        divide stored energy by load power for backup duration. Output:
        estimated UPS backup time in hours and minutes.
      </desc>

      <defs>
        <pattern
          id="bp-ups-grid-minor"
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
          id="bp-ups-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-ups-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-ups-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-ups-grid-major)"
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
        FIG. 1 — UPS RUNTIME
      </text>
      <path
        d="M 34 52 H 220"
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
        filter="url(#bp-ups-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Battery energy Wh */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 168 Q 174 174 168 174 H 44 Q 38 174 36 168 Z"
          strokeWidth="1.1"
        />
        <rect
          x="52"
          y="118"
          width="108"
          height="40"
          strokeWidth="0.9"
          fill="currentColor"
          fillOpacity="0.1"
        />
        <text
          x="72"
          y="142"
          fill="currentColor"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          500 Wh
        </text>
        <text
          x="48"
          y="108"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          battery energy
        </text>
        <text
          x="48"
          y="188"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          or Ah × V from UPS specs
        </text>

        {/* Load power W */}
        <path
          d="M 36 204 Q 38 200 44 200 H 168 Q 174 200 176 206 V 268 Q 174 274 168 274 H 44 Q 38 274 36 268 Z"
          strokeWidth="1.1"
        />
        <rect x="52" y="220" width="48" height="32" strokeWidth="0.9" />
        <path d="M 60 228 H 92 M 60 236 H 88 M 60 244 H 84" strokeWidth="0.7" opacity="0.6" />
        <circle cx="120" cy="236" r="8" strokeWidth="1" />
        <path d="M 120 228 V 244 M 112 236 H 128" strokeWidth="0.9" />
        <text
          x="136"
          y="240"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          150 W
        </text>
        <text
          x="48"
          y="216"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          load power
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 130 H 218" strokeLinecap="round" />
        <path d="M 214 126 L 222 130 L 214 134" strokeLinejoin="round" />
        <path d="M 186 236 H 218" strokeLinecap="round" />
        <path d="M 214 232 L 222 236 L 214 240" />
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
        filter="url(#bp-ups-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 218 92 Q 220 86 228 86 H 468 Q 476 86 478 94 V 278 Q 476 286 468 286 H 228 Q 220 286 218 278 Z"
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
          Constant-load backup model
        </text>
        <path d="M 238 122 H 450" strokeWidth="0.6" opacity="0.45" />

        <text
          x="256"
          y="152"
          fill="currentColor"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          hours = Wh ÷ W
        </text>
        <text
          x="256"
          y="178"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          500 ÷ 150 ≈ 3.33 h
        </text>

        <text
          x="256"
          y="212"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          energy ÷ power = time
        </text>
        <text
          x="256"
          y="232"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          real UPS: −10–20% for inverter loss
        </text>

        {/* UPS box sketch */}
        <rect x="256" y="248" width="80" height="28" strokeWidth="1" rx="1" />
        <text
          x="296"
          y="266"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          UPS
        </text>
        <path d="M 336 262 H 380 M 376 258 L 384 262 L 376 266" strokeWidth="0.9" />
        <rect x="388" y="252" width="40" height="20" strokeWidth="0.8" />
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
        filter="url(#bp-ups-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 278 Q 692 286 684 286 H 538 Q 530 286 528 278 Z"
          strokeWidth="1.3"
        />

        <circle cx="611" cy="158" r="36" strokeWidth="1.2" />
        <line x1="611" y1="158" x2="611" y2="130" strokeWidth="1.3" />
        <line x1="611" y1="158" x2="634" y2="170" strokeWidth="1.1" />
        <circle cx="611" cy="158" r="3" fill="currentColor" stroke="none" />

        <text
          x="611"
          y="218"
          textAnchor="middle"
          fill="currentColor"
          fontSize="24"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          3h 20m
        </text>
        <text
          x="611"
          y="242"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          estimated backup time
        </text>
        <text
          x="611"
          y="262"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          (3.33 hours)
        </text>
      </g>

      {/* Bottom: energy depletion timeline */}
      <g
        filter="url(#bp-ups-pencil)"
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
          Wh depletes at constant W until cutoff
        </text>
        <line x1="72" y1="388" x2="640" y2="388" strokeWidth="0.8" />
        <rect
          x="72"
          y="378"
          width="320"
          height="12"
          strokeWidth="0.8"
          fill="currentColor"
          fillOpacity="0.12"
          rx="1"
        />
        <line x1="392" y1="372" x2="392" y2="396" strokeWidth="1" />
        <text
          x="396"
          y="368"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          outage ends ~3.3 h
        </text>
        <text x="72" y="374" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          full
        </text>
        <text x="620" y="374" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          empty
        </text>
      </g>
    </svg>
  );
}
