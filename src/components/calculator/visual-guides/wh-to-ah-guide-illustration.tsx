"use client";

import { cn } from "@/lib/utils";

interface WhToAhGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: Wh + V → Ah = Wh ÷ V → amp-hour capacity.
 * Modal only (not embedded in page DOM by default).
 */
export function WhToAhGuideIllustration({
  className,
}: WhToAhGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn("wh-to-ah-guide-illustration w-full max-w-3xl", className)}
      role="img"
      aria-labelledby="w2a-guide-title w2a-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="w2a-guide-title">Wh to Ah flow diagram</title>
      <desc id="w2a-guide-desc">
        Inputs: energy in watt-hours and system voltage in volts. Process:
        divide watt-hours by voltage to convert stored energy to amp-hour
        capacity. Output: equivalent amp-hours for battery comparison and
        runtime planning.
      </desc>

      <defs>
        <pattern
          id="bp-w2a-grid-minor"
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
          id="bp-w2a-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-w2a-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-w2a-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-w2a-grid-major)"
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
        FIG. 1 — Wh TO Ah
      </text>
      <path
        d="M 34 52 H 200"
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
        filter="url(#bp-w2a-pencil)"
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
          stored energy
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
          1,200 Wh
        </text>
        <text
          x="48"
          y="154"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          watt-hours (energy)
        </text>

        <path d="M 48 168 H 188" strokeWidth="0.6" opacity="0.35" />

        <text
          x="48"
          y="186"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          system voltage
        </text>
        <text
          x="48"
          y="210"
          fill="currentColor"
          fontSize="22"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="700"
        >
          12 V
        </text>
        <text
          x="48"
          y="232"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          nominal bus voltage
        </text>

        {/* Battery icon */}
        <rect x="48" y="244" width="40" height="22" strokeWidth="0.9" rx="1" />
        <path d="M 88 250 H 94 V 260 H 88" strokeWidth="0.8" />
        <path d="M 54 252 H 82" strokeWidth="0.5" opacity="0.5" />
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
        filter="url(#bp-w2a-pencil)"
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
          Energy → charge capacity
        </text>
        <text
          x="268"
          y="136"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          Wh = Ah × V  →  Ah = Wh ÷ V
        </text>
        <text
          x="268"
          y="162"
          fill="currentColor"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          Ah = Wh ÷ V
        </text>
        <text
          x="268"
          y="188"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          1,200 ÷ 12 = 100
        </text>

        {/* Energy flow: Wh bucket → divided by V → Ah */}
        <rect x="360" y="204" width="36" height="28" strokeWidth="0.9" rx="1" />
        <text
          x="378"
          y="222"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          Wh
        </text>
        <path d="M 396 218 H 412" strokeWidth="0.9" />
        <text
          x="404"
          y="212"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          ÷
        </text>
        <rect x="416" y="210" width="24" height="16" strokeWidth="0.8" rx="1" />
        <text
          x="428"
          y="222"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          V
        </text>
        <path d="M 440 218 H 452" strokeWidth="0.9" />
        <text
          x="448"
          y="212"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          =
        </text>
        <rect x="456" y="204" width="36" height="28" strokeWidth="0.9" rx="1" />
        <text
          x="474"
          y="222"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          Ah
        </text>

        <text
          x="268"
          y="252"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          compare packs at different voltages via Wh first
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
        filter="url(#bp-w2a-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 268 Q 692 276 684 276 H 538 Q 530 276 528 268 Z"
          strokeWidth="1.3"
        />

        <circle cx="611" cy="148" r="28" strokeWidth="1.2" />
        <text
          x="611"
          y="154"
          textAnchor="middle"
          fill="currentColor"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          Ah
        </text>

        <text
          x="611"
          y="208"
          textAnchor="middle"
          fill="currentColor"
          fontSize="28"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          100 Ah
        </text>
        <text
          x="611"
          y="232"
          textAnchor="middle"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          amp-hour capacity
        </text>
        <text
          x="611"
          y="252"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          @ 12 V nominal
        </text>
      </g>

      {/* Footer */}
      <g
        filter="url(#bp-w2a-pencil)"
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
          inverse: Wh = Ah × V — use nominal system V, not cell marketing voltage
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          1,200 Wh
        </text>
        <text x="130" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ÷
        </text>
        <text x="150" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          12 V
        </text>
        <text x="190" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          =
        </text>
        <text
          x="210"
          y="388"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          100 Ah
        </text>
      </g>
    </svg>
  );
}
