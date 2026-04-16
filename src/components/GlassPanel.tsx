"use client"

import type { CSSProperties, ReactNode } from "react"

interface GlassPanelProps {
  children?: ReactNode
  className?: string
  style?: CSSProperties
  /** Tailwind rounded class. Default: "rounded-2xl". */
  rounded?: string
}

/**
 * GlassPanel — frosted glass content surface with directional border fades
 * (top-left white, bottom-right brand). Static — no hover.
 *
 * Use as a reusable container for content that needs the Arclen glass aesthetic:
 * pricing tiles, feature cards, sidebar panels, etc.
 */
export function GlassPanel({
  children,
  className = "",
  style,
  rounded = "rounded-2xl",
}: GlassPanelProps) {
  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`} style={style}>
      {/* Frosted blur — richer than before, matches the new system */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(16px) saturate(150%)",
          WebkitBackdropFilter: "blur(16px) saturate(150%)",
        }}
      />
      {/* Glass fill — gradient white tint */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03))",
        }}
      />
      {/* Subtle top specular highlight — softer than the button (content surface, not interactive) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${rounded}`}
        style={{
          boxShadow: [
            "inset 0 1px 0.5px -0.5px rgba(255,255,255,0.35)",
            "inset 0 -1px 0.5px -0.5px rgba(0,0,0,0.15)",
            "inset 1px 0 1px -1px rgba(255,255,255,0.12)",
          ].join(", "),
        }}
      />
      {/* Top-left white border fade */}
      <div
        className={`pointer-events-none absolute inset-0 ${rounded}`}
        style={{
          border: "1px solid white",
          maskImage: "linear-gradient(135deg, white, transparent 50%)",
          WebkitMaskImage: "linear-gradient(135deg, white, transparent 50%)",
        }}
      />
      {/* Bottom-right brand border fade */}
      <div
        className={`pointer-events-none absolute inset-0 ${rounded}`}
        style={{
          border: "1px solid rgba(255,255,255,0.5)",
          maskImage: "linear-gradient(135deg, transparent 50%, white)",
          WebkitMaskImage: "linear-gradient(135deg, transparent 50%, white)",
        }}
      />
      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  )
}
