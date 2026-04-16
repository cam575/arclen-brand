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

type TopLineTone = "default" | "ember" | "blue" | "ember-blue"

interface GlassCardProps {
  children: React.ReactNode
  variant?: GlassVariant
  padding?: string
  hover?: boolean
  /** Add frosted noise texture. `true` = default opacity (0.08), or pass a number for custom opacity. */
  noise?: boolean | number
  /** Override the top edge highlight tone. Defaults to the variant's built-in color (white for default/clear, warm for accent, cool for blue).
   *  - `"ember"` — warm orange glow (use when the card sits near ember-themed content)
   *  - `"blue"` — cool blue glow (use near AI/Build surfaces)
   *  - `"ember-blue"` — compositional dual-tone: ember left, blue right, transparent gap between (for dual-context cards) */
  topLine?: TopLineTone
  className?: string
  style?: React.CSSProperties
}

const TOP_LINE_GRADIENTS: Record<Exclude<TopLineTone, "default">, string> = {
  ember:
    "linear-gradient(90deg, transparent 0%, rgba(232,93,4,0.55) 50%, transparent 100%)",
  blue:
    "linear-gradient(90deg, transparent 0%, rgba(0,100,240,0.55) 50%, transparent 100%)",
  // Compositional: ember left, blue right, transparent gap between — never blended
  "ember-blue":
    "linear-gradient(90deg, transparent 0%, transparent 15%, rgba(232,93,4,0.55) 30%, transparent 50%, rgba(0,100,240,0.55) 70%, transparent 85%, transparent 100%)",
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

/* Neutral elevation shadow — same for all variants (no colored halos).
   Cards feel like solid objects sitting above the surface, not glowing tiles. */
const neutralElevation = (lifted: boolean): string =>
  lifted
    ? "0 2px 4px rgba(0,0,0,0.28), 0 16px 40px rgba(0,0,0,0.38), 0 0 1px rgba(255,255,255,0.06)"
    : "0 1px 2px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.28), 0 0 1px rgba(255,255,255,0.04)"

const DEFAULT_TOKENS: VariantTokens = {
  fill:
    "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.035) 50%, rgba(255,255,255,0.01) 100%)",
  fillHover:
    "linear-gradient(180deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)",
  specular: "inset 0 1.25px 0.5px -0.5px rgba(255,255,255,0.6)",
  spotlight: "rgba(255,255,255,0.08)",
  outerGlow: neutralElevation,
  cornerStack: [
    "inset 6px 6px 12px -8px rgba(255,180,120,0.12)",
    "inset -6px -6px 12px -8px rgba(100,180,255,0.08)",
    // Bottom inner shadow — grounds the card, gives it volume
    "inset 0 -12px 20px -16px rgba(0,0,0,0.45)",
  ].join(", "),
  edgeStack: [
    "inset 0 0 0 1px rgba(255,255,255,0.06)",
    "inset 1px 0 1px -1px rgba(255,255,255,0.14)",
    "inset -1px 0 1px -1px rgba(0,0,0,0.12)",
    "inset 0 -1px 0.5px -0.5px rgba(0,0,0,0.25)",
  ].join(", "),
  topLineColor: "rgba(255,255,255,0.4)",
}

const ACCENT_TOKENS: VariantTokens = {
  fill:
    "linear-gradient(180deg, rgba(255,200,120,0.12) 0%, rgba(232,93,4,0.08) 50%, rgba(232,93,4,0.02) 100%)",
  fillHover:
    "linear-gradient(180deg, rgba(255,200,120,0.16) 0%, rgba(232,93,4,0.12) 50%, rgba(232,93,4,0.03) 100%)",
  specular: "inset 0 1.25px 0.5px -0.5px rgba(255,215,170,0.8)",
  spotlight: "rgba(255,180,80,0.12)",
  outerGlow: neutralElevation,
  cornerStack: [
    "inset 6px 6px 12px -8px rgba(255,200,140,0.22)",
    "inset -6px -6px 16px -8px rgba(232,93,4,0.18)",
    "inset 0 -12px 20px -16px rgba(60,20,0,0.55)",
  ].join(", "),
  edgeStack: [
    "inset 0 0 0 1px rgba(232,93,4,0.10)",
    "inset 1px 0 1px -1px rgba(255,200,140,0.20)",
    "inset -1px 0 1px -1px rgba(120,40,0,0.14)",
    "inset 0 -1px 0.5px -0.5px rgba(60,20,0,0.28)",
  ].join(", "),
  topLineColor: "rgba(255,160,60,0.7)",
}

/* Clear — ethereal see-through glass. Minimal tint, lighter blur so the
   content behind is visibly readable. Use for overlays, modals, cards on
   rich backgrounds where you want the backdrop to breathe through. */
const CLEAR_TOKENS: VariantTokens = {
  fill:
    "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 50%, rgba(255,255,255,0) 100%)",
  fillHover:
    "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.01) 100%)",
  specular: "inset 0 1px 0.5px -0.5px rgba(255,255,255,0.5)",
  spotlight: "rgba(255,255,255,0.05)",
  outerGlow: neutralElevation,
  cornerStack: [
    "inset 4px 4px 10px -8px rgba(255,180,120,0.08)",
    "inset -4px -4px 10px -8px rgba(100,180,255,0.05)",
    "inset 0 -10px 16px -14px rgba(0,0,0,0.30)",
  ].join(", "),
  edgeStack: [
    "inset 0 0 0 1px rgba(255,255,255,0.04)",
    "inset 1px 0 1px -1px rgba(255,255,255,0.10)",
    "inset -1px 0 1px -1px rgba(0,0,0,0.08)",
    "inset 0 -1px 0.5px -0.5px rgba(0,0,0,0.18)",
  ].join(", "),
  topLineColor: "rgba(255,255,255,0.3)",
}

const BLUE_TOKENS: VariantTokens = {
  fill:
    "linear-gradient(180deg, rgba(160,210,255,0.12) 0%, rgba(0,100,240,0.08) 50%, rgba(0,100,240,0.02) 100%)",
  fillHover:
    "linear-gradient(180deg, rgba(160,210,255,0.16) 0%, rgba(0,100,240,0.12) 50%, rgba(0,100,240,0.03) 100%)",
  specular: "inset 0 1.25px 0.5px -0.5px rgba(190,225,255,0.8)",
  spotlight: "rgba(120,200,255,0.12)",
  outerGlow: neutralElevation,
  cornerStack: [
    "inset 6px 6px 12px -8px rgba(180,220,255,0.22)",
    "inset -6px -6px 16px -8px rgba(0,100,240,0.18)",
    "inset 0 -12px 20px -16px rgba(0,20,60,0.55)",
  ].join(", "),
  edgeStack: [
    "inset 0 0 0 1px rgba(0,100,240,0.10)",
    "inset 1px 0 1px -1px rgba(180,220,255,0.20)",
    "inset -1px 0 1px -1px rgba(0,30,80,0.14)",
    "inset 0 -1px 0.5px -0.5px rgba(0,20,60,0.28)",
  ].join(", "),
  topLineColor: "rgba(120,200,255,0.6)",
}

const VARIANT_TOKENS: Record<GlassVariant, VariantTokens> = {
  default: DEFAULT_TOKENS,
  accent: ACCENT_TOKENS,
  blue: BLUE_TOKENS,
  clear: CLEAR_TOKENS,
}

export function GlassCard({
  children,
  variant = "default",
  padding = "24px",
  hover = true,
  noise = false,
  topLine,
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
      {/* Frosted backdrop blur — lighter for clear variant so content behind breathes through */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          backdropFilter:
            variant === "clear" ? "blur(8px) saturate(140%)" : "blur(16px) saturate(160%)",
          WebkitBackdropFilter:
            variant === "clear" ? "blur(8px) saturate(140%)" : "blur(16px) saturate(160%)",
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
      {/* Top highlight line — brightens on hover. Honors `topLine` prop
          override, otherwise falls back to the variant's token color. */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "5%",
          right: "5%",
          height: "1px",
          background:
            topLine && topLine !== "default"
              ? TOP_LINE_GRADIENTS[topLine]
              : `linear-gradient(90deg, transparent 0%, ${tokens.topLineColor} 50%, transparent 100%)`,
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
