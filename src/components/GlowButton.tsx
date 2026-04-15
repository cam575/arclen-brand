"use client"

import { useState, type CSSProperties, type ReactNode } from "react"

interface GlowButtonProps {
  children: ReactNode
  icon?: ReactNode
  /** Color variant. Ember (primary CTAs) or Blue (AI / Build features). */
  variant?: "ember" | "blue"
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  /** Pill (rounded-full) or rounded (12px). Default: pill. */
  shape?: "pill" | "rounded"
  className?: string
  style?: CSSProperties
}

/* ───── Variant tokens ───── */

type GlowVariantTokens = {
  fill: string
  reflex: string
  outerRest: string
  outerHover: string
  textShadow: string
}

const EMBER: GlowVariantTokens = {
  fill: [
    "radial-gradient(ellipse 70% 80% at 15% 25%, rgba(255,211,122,0.5) 0%, transparent 60%)",
    "linear-gradient(135deg, #FFAA40 0%, #FF8C42 30%, #F07020 65%, #E85D04 100%)",
  ].join(", "),
  reflex: [
    "inset 0 1.5px 0.5px -0.5px rgba(255,210,160,0.75)",
    "inset 1.8px 3px 0px -2px rgba(255,200,140,0.40)",
    "inset -2px -2px 0px -2px rgba(255,170,80,0.30)",
    "inset 0 -8px 12px -6px rgba(120,40,0,0.35)",
    "inset -0.3px -1px 4px 0px rgba(80,30,0,0.30)",
  ].join(", "),
  outerRest: [
    "0 1px 2px rgba(0,0,0,0.20)",
    "0 4px 12px rgba(232,93,4,0.22)",
    "0 0 28px rgba(232,93,4,0.10)",
  ].join(", "),
  outerHover: [
    "0 2px 4px rgba(0,0,0,0.25)",
    "0 6px 18px rgba(232,93,4,0.32)",
    "0 0 40px rgba(232,93,4,0.16)",
  ].join(", "),
  textShadow: "0 1px 2px rgba(120,40,0,0.5)",
}

const BLUE: GlowVariantTokens = {
  fill: [
    "radial-gradient(ellipse 70% 80% at 15% 25%, rgba(160,210,255,0.5) 0%, transparent 60%)",
    "linear-gradient(135deg, #4AB4FF 0%, #1A9FF8 30%, #0098F3 65%, #0064F0 100%)",
  ].join(", "),
  reflex: [
    "inset 0 1.5px 0.5px -0.5px rgba(180,220,255,0.75)",
    "inset 1.8px 3px 0px -2px rgba(160,210,255,0.40)",
    "inset -2px -2px 0px -2px rgba(80,160,240,0.30)",
    "inset 0 -8px 12px -6px rgba(0,40,100,0.40)",
    "inset -0.3px -1px 4px 0px rgba(0,30,80,0.30)",
  ].join(", "),
  outerRest: [
    "0 1px 2px rgba(0,0,0,0.20)",
    "0 4px 12px rgba(0,100,240,0.22)",
    "0 0 28px rgba(0,100,240,0.10)",
  ].join(", "),
  outerHover: [
    "0 2px 4px rgba(0,0,0,0.25)",
    "0 6px 18px rgba(0,100,240,0.32)",
    "0 0 40px rgba(0,100,240,0.16)",
  ].join(", "),
  textShadow: "0 1px 2px rgba(0,40,100,0.5)",
}

const VARIANT_TOKENS: Record<NonNullable<GlowButtonProps["variant"]>, GlowVariantTokens> = {
  ember: EMBER,
  blue: BLUE,
}

/**
 * GlowButton — primary CTA. Ember CTA gradient fill with sharp specular
 * top highlight, dimensional inset reflex shadows, outer ember glow.
 * Hover lift + press microinteraction match LiquidGlassButton.
 *
 * Use for the highest-priority action on a page.
 */
export function GlowButton({
  children,
  icon,
  variant = "ember",
  onClick,
  type = "button",
  disabled = false,
  shape = "pill",
  className = "",
  style,
}: GlowButtonProps) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  const isLifted = hovered && !disabled && !pressed
  const tokens = VARIANT_TOKENS[variant]

  const baseStyle: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 50,
    padding: "0 28px",
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "0.005em",
    color: "#FFFFFF",
    backgroundImage: tokens.fill,
    border: "none",
    borderRadius: shape === "pill" ? "99em" : "12px",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    boxShadow: `${tokens.reflex}, ${isLifted ? tokens.outerHover : tokens.outerRest}`,
    transform: pressed
      ? "scale(0.97)"
      : isLifted
        ? "translateY(-1px)"
        : "translateY(0)",
    transition:
      "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, filter 0.3s ease",
    filter: isLifted ? "brightness(1.06)" : "brightness(1)",
    textShadow: tokens.textShadow,
    outline: "none",
    overflow: "hidden",
    ...style,
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setPressed(false)
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className={className}
      style={baseStyle}
    >
      {icon && <span style={{ display: "flex" }}>{icon}</span>}
      {children}
    </button>
  )
}
