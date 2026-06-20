"use client";

import { cn } from "@/lib/utils";

interface SolarPanelTiltGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: latitude → tilt ≈ |lat| → panel angle °.
 * Modal only (not embedded in page DOM by default).
 */
export function SolarPanelTiltGuideIllustration({
  className,
}: SolarPanelTiltGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "solar-panel-tilt-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="spt-guide-title spt-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="spt-guide-title">Solar panel tilt flow diagram</title>
      <desc id="spt-guide-desc">
        Input: site latitude in degrees. Process: for year-round fixed mounts,
        recommended tilt equals the absolute value of latitude. Output:
        panel tilt angle from horizontal facing the equator.
      </desc>

      <defs>
        <pattern
          id="bp-spt-grid-minor"
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
          id="bp-spt-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-spt-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-spt-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-spt-grid-major)"
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
        FIG. 1 — SOLAR PANEL TILT
      </text>
      <path
        d="M 34 52 H 300"
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
        filter="url(#bp-spt-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 92 Q 38 88 44 88 H 176 Q 182 88 184 94 V 300 Q 182 306 176 306 H 44 Q 38 306 36 300 Z"
          strokeWidth="1.1"
        />

        <text x="48" y="104" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          site latitude
        </text>
        <text x="48" y="122" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          40° N
        </text>
        <text x="48" y="136" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          +N / −S from equator
        </text>

        {/* Globe cross-section */}
        <circle cx="72" cy="178" r="28" strokeWidth="0.9" />
        <line x1="44" y1="178" x2="100" y2="178" strokeWidth="0.6" opacity="0.5" />
        <line x1="72" y1="150" x2="72" y2="206" strokeWidth="0.6" opacity="0.5" />
        <path d="M 44 178 Q 72 162 100 178" strokeWidth="0.7" strokeDasharray="3 2" />
        <text x="102" y="182" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          40°
        </text>
        <text x="48" y="218" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          year-round fixed mount
        </text>
        <text x="48" y="234" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.5">
          face south (N hemisphere)
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 194 190 H 218" strokeLinecap="round" />
        <path d="M 214 186 L 222 190 L 214 194" strokeLinejoin="round" />
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
        filter="url(#bp-spt-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 218 92 Q 220 86 228 86 H 468 Q 476 86 478 94 V 304 Q 476 312 468 312 H 228 Q 220 312 218 304 Z"
          strokeWidth="1.2"
        />

        <text x="238" y="112" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          1. Year-round rule
        </text>
        <text x="256" y="132" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          tilt ≈ |latitude|
        </text>
        <text x="256" y="152" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          |40°| = 40° from horizontal
        </text>

        {/* Tilt diagram */}
        <line x1="256" y1="248" x2="420" y2="248" strokeWidth="0.9" />
        <text x="256" y="244" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          ground
        </text>
        <line x1="280" y1="248" x2="360" y2="192" strokeWidth="1" />
        <rect x="300" y="200" width="48" height="8" strokeWidth="0.8" rx="1" transform="rotate(-40 324 204)" />
        <path d="M 280 248 A 40 40 0 0 0 312 228" strokeWidth="0.7" />
        <text x="288" y="238" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          40°
        </text>

        {/* Sun rays */}
        <path d="M 380 168 L 340 200 M 400 160 L 350 204 M 420 172 L 360 208" strokeWidth="0.6" opacity="0.55" />
        <circle cx="410" cy="158" r="10" strokeWidth="0.7" />
        <text x="400" y="162" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          sun
        </text>

        <text x="256" y="278" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          panel normal ≈ average sun altitude
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
        filter="url(#bp-spt-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 304 Q 692 312 684 312 H 538 Q 530 312 528 304 Z"
          strokeWidth="1.3"
        />

        <text x="548" y="108" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          recommended tilt
        </text>

        <text x="616" y="158" textAnchor="middle" fill="currentColor" fontSize="36" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          40°
        </text>
        <text x="616" y="182" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          from horizontal
        </text>

        <line x1="564" y1="200" x2="668" y2="200" strokeWidth="0.8" />
        <line x1="584" y1="200" x2="620" y2="168" strokeWidth="0.9" />
        <rect x="600" y="172" width="36" height="6" strokeWidth="0.7" rx="1" transform="rotate(-40 618 175)" />
        <text x="616" y="218" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          south-facing fixed rack
        </text>

        <text x="616" y="252" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          summer: 25°
        </text>
        <text x="616" y="268" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          winter: 55°
        </text>
        <text x="616" y="286" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          seasonal: lat ± 15°
        </text>
      </g>

      {/* Bottom note */}
      <g filter="url(#bp-spt-pencil)" stroke="currentColor" fill="none" opacity="0.55">
        <rect x="36" y="352" width="648" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          starting estimate — adjust for roof pitch, shading, and TOU rates
        </text>
        <text x="48" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          southern hemisphere: face north · azimuth toward equator
        </text>
      </g>
    </svg>
  );
}
