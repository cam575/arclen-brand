import type { CSSProperties } from "react"

/** Multi-layered liquid glass shadow matching Apple/Figma reflex aesthetic */
export const LIQUID_GLASS_SHADOW = [
  "inset 0 0 0 1px rgba(255,255,255,0.10)",
  "inset 1.8px 3px 0px -2px rgba(255,255,255,0.27)",
  "inset -2px -2px 0px -2px rgba(255,255,255,0.24)",
  "inset -3px -8px 1px -6px rgba(255,255,255,0.18)",
  "inset -0.3px -1px 4px 0px rgba(0,0,0,0.24)",
  "inset -1.5px 2.5px 0px -2px rgba(0,0,0,0.40)",
].join(", ")

/** Pre-built style object for liquid glass containers (frosted pill aesthetic) */
export const LIQUID_GLASS_STYLE: CSSProperties = {
  backgroundColor: "rgba(187,187,188,0.06)",
  backdropFilter: "blur(8px) saturate(150%)",
  WebkitBackdropFilter: "blur(8px) saturate(150%)",
  boxShadow: LIQUID_GLASS_SHADOW,
}

/** Standard subtle border for section cards */
export const BORDER_DEFAULT = "1px solid #191919"

/** Glass element border */
export const BORDER_GLASS = "1px solid rgba(255,255,255,0.1)"

/** Elevated variant — adds outer drop shadow to LIQUID_GLASS_SHADOW */
export const LIQUID_GLASS_SHADOW_ELEVATED = [
  LIQUID_GLASS_SHADOW,
  "0 2px 8px rgba(0,0,0,0.3)",
].join(", ")
