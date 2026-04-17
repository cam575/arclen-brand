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

/* Inset reflex stack — thin wet-glass edge. Values tuned down from the
   original thicker bevel so the button reads as a refined hairline
   rather than a chunky jewel. */
const REFLEX_STACK_BASE = [
  "inset 0 0 0 0.5px rgba(255,255,255,0.06)",
  "inset 0 1px 0.5px -0.5px rgba(255,255,255,0.45)", // top specular (thinner)
  "inset 1px 1.5px 0px -1px rgba(255,255,255,0.18)",
  "inset -1px -1px 0px -1px rgba(255,255,255,0.16)",
  "inset -1.5px -4px 1px -4px rgba(255,255,255,0.10)",
  "inset -0.3px -0.5px 2px 0px rgba(0,0,0,0.18)",
  "inset -1px 1.5px 0px -1.5px rgba(0,0,0,0.28)",
].join(", ")

const REFLEX_STACK_ACTIVE = [
  "inset 0 0 0 0.5px rgba(232,93,4,0.12)",
  "inset 0 1px 0.5px -0.5px rgba(255,200,140,0.55)", // ember top highlight (thinner)
  "inset 1px 1.5px 0px -1px rgba(255,200,140,0.22)",
  "inset -1px -1px 0px -1px rgba(232,93,4,0.18)",
  "inset 0 -6px 10px -6px rgba(232,93,4,0.30)", // bottom ember glow
  "inset -0.3px -0.5px 2px 0px rgba(0,0,0,0.16)",
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

  /* Ember bar visible whenever active; widens slightly on hover */

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
      style={{ ...baseStyle, position: "relative", overflow: "hidden" }}
    >
      {icon && <span style={{ display: "flex", position: "relative", zIndex: 1 }}>{icon}</span>}
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>

      {/* Active hover: slide-in ember bar at the bottom */}
      {active && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: isLifted ? "10%" : "15%",
            right: isLifted ? "10%" : "15%",
            height: 2,
            borderRadius: 1,
            background:
              "linear-gradient(90deg, transparent 0%, #E85D04 30%, #FF8C42 50%, #E85D04 70%, transparent 100%)",
            boxShadow: isLifted
              ? "0 0 10px rgba(232,93,4,0.5)"
              : "0 0 6px rgba(232,93,4,0.35)",
            opacity: 1,
            transition:
              "opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), left 0.35s cubic-bezier(0.16, 1, 0.3, 1), right 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      )}
    </button>
  )
}
