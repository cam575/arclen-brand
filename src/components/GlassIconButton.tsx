"use client"

import { useState, type CSSProperties, type MouseEvent, type ReactNode } from "react"
import type { GlassVariant } from "../theme"

// ═══════════════════════════════════════════════
// GlassIconButton — Circular liquid-glass icon button
// Same aesthetic family as LiquidGlassButton: 6-layer inset reflex,
// sharp specular top, outer drop shadow elevation, hover lift, press
// scale, accent ember tint with slide-in bottom bar.
// ═══════════════════════════════════════════════

interface GlassIconButtonProps {
  children: ReactNode
  variant?: GlassVariant
  size?: number
  onClick?: (e?: MouseEvent) => void
  disabled?: boolean
  "aria-label"?: string
  className?: string
  as?: "button" | "span" | "div"
}

/* Inset reflex stacks (matched to LiquidGlassButton) */
const REFLEX_STACK_BASE = [
  "inset 0 0 0 1px rgba(255,255,255,0.05)",
  "inset 0 1.5px 0.5px -0.5px rgba(255,255,255,0.55)",
  "inset 1.8px 3px 0px -2px rgba(255,255,255,0.27)",
  "inset -2px -2px 0px -2px rgba(255,255,255,0.24)",
  "inset -3px -8px 1px -6px rgba(255,255,255,0.18)",
  "inset -0.3px -1px 4px 0px rgba(0,0,0,0.24)",
  "inset -1.5px 2.5px 0px -2px rgba(0,0,0,0.40)",
].join(", ")

const REFLEX_STACK_ACCENT_REST = [
  "inset 0 0 0 1px rgba(232,93,4,0.10)",
  "inset 0 1.5px 0.5px -0.5px rgba(255,200,140,0.65)",
  "inset 1.8px 3px 0px -2px rgba(255,200,140,0.30)",
  "inset -2px -2px 0px -2px rgba(232,93,4,0.20)",
  "inset 0 -8px 12px -6px rgba(232,93,4,0.35)",
  "inset -0.3px -1px 4px 0px rgba(0,0,0,0.20)",
].join(", ")

/* On hover, push the bottom inset ember glow harder so the entire lower
   arc of the circle reads as luminous — replaces the rectangular slide-in bar
   that didn't fit a circular surface. */
const REFLEX_STACK_ACCENT_HOVER = [
  "inset 0 0 0 1px rgba(232,93,4,0.18)",
  "inset 0 1.5px 0.5px -0.5px rgba(255,210,160,0.85)",
  "inset 1.8px 3px 0px -2px rgba(255,210,160,0.40)",
  "inset -2px -2px 0px -2px rgba(232,93,4,0.30)",
  "inset 0 -12px 18px -8px rgba(255,140,40,0.65)",
  "inset 0 -2px 4px -1px rgba(255,200,140,0.40)",
  "inset -0.3px -1px 4px 0px rgba(0,0,0,0.20)",
].join(", ")

const OUTER_REST = "0 1px 2px rgba(0,0,0,0.20), 0 4px 12px rgba(0,0,0,0.18)"
const OUTER_HOVER = "0 2px 4px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.28)"
const OUTER_ACCENT_REST = "0 1px 2px rgba(232,93,4,0.20), 0 4px 16px rgba(232,93,4,0.22)"
const OUTER_ACCENT_HOVER = "0 2px 4px rgba(232,93,4,0.25), 0 8px 28px rgba(232,93,4,0.32)"

export function GlassIconButton({
  children,
  variant = "default",
  size = 48,
  onClick,
  disabled = false,
  "aria-label": ariaLabel,
  className = "",
  as: Tag = "button",
}: GlassIconButtonProps) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  const isAccent = variant === "accent"
  const isInteractive = Tag === "button"
  const isLifted = hovered && !disabled && !pressed

  const innerReflex = isAccent
    ? isLifted
      ? REFLEX_STACK_ACCENT_HOVER
      : REFLEX_STACK_ACCENT_REST
    : REFLEX_STACK_BASE
  const outer = isAccent
    ? isLifted
      ? OUTER_ACCENT_HOVER
      : OUTER_ACCENT_REST
    : isLifted
      ? OUTER_HOVER
      : OUTER_REST

  const baseStyle: CSSProperties = {
    position: "relative",
    width: size,
    height: size,
    borderRadius: "50%",
    border: "none",
    cursor: isInteractive ? (disabled ? "not-allowed" : "pointer") : "default",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: isAccent ? "#E85D04" : "rgba(255,255,255,0.85)",
    backgroundColor: isAccent
      ? "rgba(232,93,4,0.10)"
      : isLifted
        ? "rgba(255,255,255,0.09)"
        : "rgba(187,187,188,0.06)",
    backdropFilter: "blur(10px) saturate(170%)",
    WebkitBackdropFilter: "blur(10px) saturate(170%)",
    boxShadow: `${innerReflex}, ${outer}`,
    transform: pressed
      ? "scale(0.94)"
      : isLifted
        ? "translateY(-1px)"
        : "translateY(0)",
    transition:
      "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease",
    opacity: disabled ? 0.5 : 1,
    outline: "none",
    overflow: "hidden",
  }

  const interactionProps = isInteractive
    ? {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => {
          setHovered(false)
          setPressed(false)
        },
        onMouseDown: () => setPressed(true),
        onMouseUp: () => setPressed(false),
        onClick,
        disabled,
        type: "button" as const,
      }
    : { role: "img" as const }

  return (
    <Tag
      {...interactionProps}
      aria-label={ariaLabel}
      className={className}
      style={baseStyle}
    >
      <span
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </span>

      {/* Accent hover: bottom arc glow lives inside REFLEX_STACK_ACCENT_HOVER
          so it follows the circle's curve naturally — no separate bar element
          needed. (A horizontal bar would clip wrong on a circular surface.) */}
    </Tag>
  )
}
