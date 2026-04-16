"use client"

import React, { useState } from "react"
import { easing, radius, type GlassVariant } from "../theme"
import { GlassNoise } from "./GlassEffects"

// ═══════════════════════════════════════════════
// GlassCard — Premium liquid-glass interactive card
// Shares aesthetic DNA with LiquidGlassSwitcher and LiquidGlassButton:
// wet-glass specular, multi-layer reflex, corner catchlights, outer
// elevation. Retains cursor-tracked spotlight as GlassCard's signature
// interactive trait.
// ═══════════════════════════════════════════════

interface GlassCardProps {
  children: React.ReactNode
  variant?: GlassVariant
  padding?: string
  hover?: boolean
  /** Add frosted noise texture. `true` = default opacity (0.08), or pass a number for custom opacity. */
  noise?: boolean | number
  className?: string
  style?: React.CSSProperties
}

/* ────── Variant tokens ────── */

type VariantTokens = {
  fill: string
  /** Hover-intensified fill. */
  fillHover: string
  /** Specular top highlight color. */
  specular: string
  /** Spotlight color for the cursor-tracked ambient light. */
  spotlight: string
  /** Outer glow — subtle halo that brightens on hover. */
  outerGlow: (lifted: boolean) => string
  /** Corner catchlights (warm + cool). */
  cornerStack: string
  /** Inset reflex edges. */
  edgeStack: string
  /** Top highlight line color. */
  topLineColor: string
}

const DEFAULT_TOKENS: VariantTokens = {
  fill:
    "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
  fillHover:
    "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)",
  specular: "inset 0 1px 0.5px -0.5px rgba(255,255,255,0.55)",
  spotlight: "rgba(255,255,255,0.08)",
  outerGlow: (lifted) =>
    lifted
      ? "0 2px 4px rgba(0,0,0,0.25), 0 12px 32px rgba(0,0,0,0.30)"
      : "0 1px 2px rgba(0,0,0,0.20), 0 6px 18px rgba(0,0,0,0.20)",
  cornerStack: [
    "inset 6px 6px 12px -8px rgba(255,180,120,0.12)",
    "inset -6px -6px 12px -8px rgba(100,180,255,0.08)",
  ].join(", "),
  edgeStack: [
    "inset 0 0 0 1px rgba(255,255,255,0.06)",
    "inset 1px 0 1px -1px rgba(255,255,255,0.14)",
    "inset -1px 0 1px -1px rgba(0,0,0,0.10)",
    "inset 0 -1px 0.5px -0.5px rgba(0,0,0,0.18)",
  ].join(", "),
  topLineColor: "rgba(255,255,255,0.4)",
}

const ACCENT_TOKENS: VariantTokens = {
  fill:
    "linear-gradient(180deg, rgba(255,200,120,0.10) 0%, rgba(232,93,4,0.10) 50%, rgba(232,93,4,0.04) 100%)",
  fillHover:
    "linear-gradient(180deg, rgba(255,200,120,0.14) 0%, rgba(232,93,4,0.14) 50%, rgba(232,93,4,0.06) 100%)",
  specular: "inset 0 1px 0.5px -0.5px rgba(255,210,160,0.75)",
  spotlight: "rgba(255,180,80,0.12)",
  outerGlow: (lifted) =>
    lifted
      ? "0 2px 4px rgba(0,0,0,0.25), 0 12px 32px rgba(232,93,4,0.25), 0 0 40px rgba(232,93,4,0.12)"
      : "0 1px 2px rgba(0,0,0,0.20), 0 8px 24px rgba(232,93,4,0.15), 0 0 24px rgba(232,93,4,0.06)",
  cornerStack: [
    "inset 6px 6px 12px -8px rgba(255,200,140,0.25)",
    "inset -6px -6px 16px -8px rgba(232,93,4,0.20)",
  ].join(", "),
  edgeStack: [
    "inset 0 0 0 1px rgba(232,93,4,0.10)",
    "inset 1px 0 1px -1px rgba(255,200,140,0.18)",
    "inset -1px 0 1px -1px rgba(120,40,0,0.12)",
    "inset 0 -1px 0.5px -0.5px rgba(120,40,0,0.20)",
  ].join(", "),
  topLineColor: "rgba(255,160,60,0.7)",
}

const BLUE_TOKENS: VariantTokens = {
  fill:
    "linear-gradient(180deg, rgba(160,210,255,0.10) 0%, rgba(0,100,240,0.10) 50%, rgba(0,100,240,0.04) 100%)",
  fillHover:
    "linear-gradient(180deg, rgba(160,210,255,0.14) 0%, rgba(0,100,240,0.14) 50%, rgba(0,100,240,0.06) 100%)",
  specular: "inset 0 1px 0.5px -0.5px rgba(180,220,255,0.75)",
  spotlight: "rgba(120,200,255,0.12)",
  outerGlow: (lifted) =>
    lifted
      ? "0 2px 4px rgba(0,0,0,0.25), 0 12px 32px rgba(0,100,240,0.25), 0 0 40px rgba(0,100,240,0.12)"
      : "0 1px 2px rgba(0,0,0,0.20), 0 8px 24px rgba(0,100,240,0.15), 0 0 24px rgba(0,100,240,0.06)",
  cornerStack: [
    "inset 6px 6px 12px -8px rgba(180,220,255,0.25)",
    "inset -6px -6px 16px -8px rgba(0,100,240,0.20)",
  ].join(", "),
  edgeStack: [
    "inset 0 0 0 1px rgba(0,100,240,0.10)",
    "inset 1px 0 1px -1px rgba(180,220,255,0.18)",
    "inset -1px 0 1px -1px rgba(0,40,100,0.12)",
    "inset 0 -1px 0.5px -0.5px rgba(0,40,100,0.20)",
  ].join(", "),
  topLineColor: "rgba(120,200,255,0.6)",
}

const VARIANT_TOKENS: Record<GlassVariant, VariantTokens> = {
  default: DEFAULT_TOKENS,
  accent: ACCENT_TOKENS,
  blue: BLUE_TOKENS,
}

export function GlassCard({
  children,
  variant = "default",
  padding = "24px",
  hover = true,
  noise = false,
  className = "",
  style = {},
}: GlassCardProps) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  const tokens = VARIANT_TOKENS[variant]
  const isLifted = hover && hovered && !pressed

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <div
      onMouseEnter={hover ? () => setHovered(true) : undefined}
      onMouseLeave={
        hover
          ? () => {
              setHovered(false)
              setPressed(false)
              setMousePos({ x: 50, y: 50 })
            }
          : undefined
      }
      onMouseMove={hover ? handleMouseMove : undefined}
      onMouseDown={hover ? () => setPressed(true) : undefined}
      onMouseUp={hover ? () => setPressed(false) : undefined}
      className={className}
      style={{
        position: "relative",
        padding,
        borderRadius: radius.card,
        transition: `transform 0.3s ${easing.smooth}, box-shadow 0.3s ease`,
        transform: pressed
          ? "scale(0.99)"
          : isLifted
            ? "translateY(-2px)"
            : "translateY(0)",
        boxShadow: tokens.outerGlow(isLifted),
        ...style,
      }}
    >
      {/* Frosted backdrop blur */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          backdropFilter: "blur(16px) saturate(160%)",
          WebkitBackdropFilter: "blur(16px) saturate(160%)",
          pointerEvents: "none",
        }}
      />
      {/* Glass fill — variant-aware, brightens on hover */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: isLifted ? tokens.fillHover : tokens.fill,
          transition: "background 0.3s ease",
          pointerEvents: "none",
        }}
      />
      {/* Multi-layer reflex stack: specular + edges + corner catchlights */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          boxShadow: [tokens.specular, tokens.edgeStack, tokens.cornerStack].join(", "),
          pointerEvents: "none",
        }}
      />
      {/* Cursor-tracked ambient spotlight (GlassCard signature) */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: `radial-gradient(circle 260px at ${mousePos.x}% ${mousePos.y}%, ${tokens.spotlight} 0%, transparent 100%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      />
      {/* Frosted noise texture (opt-in) */}
      {noise && <GlassNoise opacity={typeof noise === "number" ? noise : undefined} />}
      {/* Top highlight line — brightens on hover */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "5%",
          right: "5%",
          height: "1px",
          background: `linear-gradient(90deg, transparent 0%, ${tokens.topLineColor} 50%, transparent 100%)`,
          pointerEvents: "none",
          transition: "filter 0.3s ease",
          filter: isLifted ? "brightness(1.6)" : "brightness(1)",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "inherit",
          flexDirection: "inherit",
          flex: "1 1 auto",
        }}
      >
        {children}
      </div>
    </div>
  )
}
