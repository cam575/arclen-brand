"use client"

import { useState, type CSSProperties, type ReactNode } from "react"

interface GlowButtonProps {
  children: ReactNode
  icon?: ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  /** Pill (rounded-full) or rounded (12px). Default: pill. */
  shape?: "pill" | "rounded"
  className?: string
  style?: CSSProperties
}

/* Inset reflex stack — wet ember surface aesthetic */
const REFLEX_STACK = [
  "inset 0 1.5px 0.5px -0.5px rgba(255,210,160,0.75)",  // sharp top specular
  "inset 1.8px 3px 0px -2px rgba(255,200,140,0.40)",
  "inset -2px -2px 0px -2px rgba(255,170,80,0.30)",
  "inset 0 -8px 12px -6px rgba(120,40,0,0.35)",          // bottom shadow inside
  "inset -0.3px -1px 4px 0px rgba(80,30,0,0.30)",
].join(", ")

/* Outer ember glow — gives the button heat */
const OUTER_GLOW_REST = [
  "0 1px 2px rgba(0,0,0,0.20)",
  "0 4px 12px rgba(232,93,4,0.30)",
  "0 0 32px rgba(232,93,4,0.15)",
].join(", ")

const OUTER_GLOW_HOVER = [
  "0 2px 4px rgba(0,0,0,0.25)",
  "0 8px 24px rgba(232,93,4,0.45)",
  "0 0 56px rgba(232,93,4,0.25)",
].join(", ")

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
    backgroundImage: [
      "radial-gradient(ellipse 70% 80% at 15% 25%, rgba(255,211,122,0.5) 0%, transparent 60%)",
      "linear-gradient(135deg, #FFAA40 0%, #FF8C42 30%, #F07020 65%, #E85D04 100%)",
    ].join(", "),
    border: "none",
    borderRadius: shape === "pill" ? "99em" : "12px",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    boxShadow: `${REFLEX_STACK}, ${isLifted ? OUTER_GLOW_HOVER : OUTER_GLOW_REST}`,
    transform: pressed
      ? "scale(0.97)"
      : isLifted
        ? "translateY(-1px)"
        : "translateY(0)",
    transition:
      "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, filter 0.3s ease",
    filter: isLifted ? "brightness(1.06)" : "brightness(1)",
    textShadow: "0 1px 2px rgba(120,40,0,0.5)",
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
