"use client"

import type { CSSProperties, ReactNode } from "react"

interface GlassPanelProps {
  children?: ReactNode
  className?: string
  style?: CSSProperties
  /** Tailwind rounded class. Default: "rounded-2xl". */
  rounded?: string
  /** Optional elevation — adds a soft outer drop shadow. Default: true. */
  elevated?: boolean
}

/**
 * GlassPanel — premium frosted glass content surface.
 *
 * Edge construction (refined):
 *   1. Backdrop blur(16px) saturate(160%) — rich frost
 *   2. Gradient white fill — top-left brighter, bottom-right dimmer
 *   3. Multi-layer inset reflex — sharp top specular, soft bottom shadow,
 *      warm top-left corner catchlight, cool bottom-right corner catchlight
 *   4. Single gradient border — bright white at top-left fading to subtle
 *      at bottom-right (no masked borders that can render patchy)
 *   5. Optional outer drop shadow for elevation
 *
 * Static surface — no hover. Use for pricing tiles, feature cards,
 * sidebar panels, any content needing the Arclen glass aesthetic.
 */
export function GlassPanel({
  children,
  className = "",
  style,
  rounded = "rounded-2xl",
  elevated = true,
}: GlassPanelProps) {
  const reflexStack = [
    // Sharp top specular — wet glass catching light
    "inset 0 1px 0.5px -0.5px rgba(255,255,255,0.5)",
    // Left edge soft highlight
    "inset 1px 0 1px -1px rgba(255,255,255,0.18)",
    // Right edge subtle shadow
    "inset -1px 0 1px -1px rgba(0,0,0,0.12)",
    // Bottom soft shadow
    "inset 0 -1px 0.5px -0.5px rgba(0,0,0,0.2)",
    // Warm top-left corner catchlight (very subtle)
    "inset 6px 6px 12px -8px rgba(255,180,120,0.18)",
    // Cool bottom-right corner catchlight (very subtle)
    "inset -6px -6px 12px -8px rgba(100,180,255,0.10)",
  ].join(", ")

  const outerShadow = elevated
    ? "0 1px 2px rgba(0,0,0,0.20), 0 8px 24px rgba(0,0,0,0.25), 0 0 1px rgba(255,255,255,0.08)"
    : "0 0 1px rgba(255,255,255,0.08)"

  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{ boxShadow: outerShadow, ...style }}
    >
      {/* Frosted blur layer */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(16px) saturate(160%)",
          WebkitBackdropFilter: "blur(16px) saturate(160%)",
        }}
      />
      {/* Glass fill — directional gradient (brighter top-left → dimmer bottom-right) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.02) 100%)",
        }}
      />
      {/* Multi-layer reflex stack */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${rounded}`}
        style={{ boxShadow: reflexStack }}
      />
      {/* Gradient border — bright at top-left, fading all the way around */}
      <div
        className={`pointer-events-none absolute inset-0 ${rounded}`}
        style={{
          padding: "1px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.25) 30%, rgba(255,255,255,0.08) 60%, rgba(255,255,255,0.2) 100%)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  )
}
