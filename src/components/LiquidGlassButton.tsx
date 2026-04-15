"use client"

import { useState, type CSSProperties, type ReactNode } from "react"

interface LiquidGlassButtonProps {
  children: ReactNode
  /** Optional icon rendered to the left of the label. */
  icon?: ReactNode
  /** Active/selected state shows the ember tint with stronger inset glow. */
  active?: boolean
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  /** Pill (rounded-full) or rounded (12px radius). Default: pill. */
  shape?: "pill" | "rounded"
  className?: string
  style?: CSSProperties
}

/* Inset reflex stack — sharper top specular highlight than the base
   LIQUID_GLASS_SHADOW for the wet-glass feel. */
const REFLEX_STACK_BASE = [
  "inset 0 0 0 1px rgba(255,255,255,0.10)",
  "inset 0 1.5px 0.5px -0.5px rgba(255,255,255,0.55)", // sharper top specular
  "inset 1.8px 3px 0px -2px rgba(255,255,255,0.27)",
  "inset -2px -2px 0px -2px rgba(255,255,255,0.24)",
  "inset -3px -8px 1px -6px rgba(255,255,255,0.18)",
  "inset -0.3px -1px 4px 0px rgba(0,0,0,0.24)",
  "inset -1.5px 2.5px 0px -2px rgba(0,0,0,0.40)",
].join(", ")

const REFLEX_STACK_ACTIVE = [
  "inset 0 0 0 1px rgba(232,93,4,0.20)",
  "inset 0 1.5px 0.5px -0.5px rgba(255,200,140,0.65)", // ember-tinted top highlight
  "inset 1.8px 3px 0px -2px rgba(255,200,140,0.30)",
  "inset -2px -2px 0px -2px rgba(232,93,4,0.20)",
  "inset 0 -8px 12px -6px rgba(232,93,4,0.35)", // bottom ember glow
  "inset -0.3px -1px 4px 0px rgba(0,0,0,0.20)",
].join(", ")

/* Outer drop shadow — gives elevation so the button floats above the surface */
const OUTER_SHADOW_REST = "0 1px 2px rgba(0,0,0,0.20), 0 4px 12px rgba(0,0,0,0.18)"
const OUTER_SHADOW_HOVER = "0 2px 4px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.28)"
const OUTER_SHADOW_ACTIVE_REST =
  "0 1px 2px rgba(232,93,4,0.20), 0 4px 16px rgba(232,93,4,0.22)"
const OUTER_SHADOW_ACTIVE_HOVER =
  "0 2px 4px rgba(232,93,4,0.25), 0 8px 28px rgba(232,93,4,0.32)"

/**
 * LiquidGlassButton — frosted glass button with sharper specular highlight,
 * outer drop shadow for elevation, hover lift, and press microinteraction.
 * Same aesthetic family as LiquidGlassSwitcher.
 */
export function LiquidGlassButton({
  children,
  icon,
  active = false,
  onClick,
  type = "button",
  disabled = false,
  shape = "pill",
  className = "",
  style,
}: LiquidGlassButtonProps) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  const isLifted = hovered && !disabled && !pressed
  const innerReflex = active ? REFLEX_STACK_ACTIVE : REFLEX_STACK_BASE
  const outer = active
    ? isLifted
      ? OUTER_SHADOW_ACTIVE_HOVER
      : OUTER_SHADOW_ACTIVE_REST
    : isLifted
      ? OUTER_SHADOW_HOVER
      : OUTER_SHADOW_REST

  const baseStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 50,
    padding: "0 28px",
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "0.005em",
    color: active ? "#E85D04" : "rgba(255,255,255,0.92)",
    borderRadius: shape === "pill" ? "99em" : "12px",
    backgroundColor: active
      ? "rgba(232,93,4,0.10)"
      : isLifted
        ? "rgba(255,255,255,0.09)"
        : "rgba(187,187,188,0.06)",
    backdropFilter: "blur(10px) saturate(170%)",
    WebkitBackdropFilter: "blur(10px) saturate(170%)",
    boxShadow: `${innerReflex}, ${outer}`,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transform: pressed
      ? "scale(0.97)"
      : isLifted
        ? "translateY(-1px)"
        : "translateY(0)",
    transition: "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease",
    border: "none",
    outline: "none",
    textShadow: active
      ? "0 0 12px rgba(232,93,4,0.35)"
      : "0 1px 1px rgba(0,0,0,0.25)",
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
