"use client"

import { useState, type ReactNode } from "react"
import { cn } from "../utils"

export type MetalColorVariant =
  | "default"
  | "primary"
  | "success"
  | "error"
  | "gold"
  | "bronze"

const METAL_VARIANTS: Record<
  MetalColorVariant,
  { outer: string; inner: string; button: string; text: string; shadow: string }
> = {
  default: {
    outer: "bg-gradient-to-b from-[#000] to-[#A0A0A0]",
    inner: "bg-gradient-to-b from-[#FAFAFA] via-[#3E3E3E] to-[#E5E5E5]",
    button: "bg-gradient-to-b from-[#B9B9B9] to-[#969696]",
    text: "text-white",
    shadow: "[text-shadow:_0_-1px_0_rgb(80_80_80_/_100%)]",
  },
  primary: {
    outer: "bg-gradient-to-b from-[#000] to-[#A0A0A0]",
    inner: "bg-gradient-to-b from-[#E85D04] via-[#9f4e00] to-[#3a2000]",
    button: "bg-gradient-to-b from-[#E85D04] to-[#9f4e00]",
    text: "text-white",
    shadow: "[text-shadow:_0_-1px_0_rgb(159_78_0_/_100%)]",
  },
  success: {
    outer: "bg-gradient-to-b from-[#005A43] to-[#7CCB9B]",
    inner: "bg-gradient-to-b from-[#E5F8F0] via-[#00352F] to-[#D1F0E6]",
    button: "bg-gradient-to-b from-[#9ADBC8] to-[#3E8F7C]",
    text: "text-[#FFF7F0]",
    shadow: "[text-shadow:_0_-1px_0_rgb(6_78_59_/_100%)]",
  },
  error: {
    outer: "bg-gradient-to-b from-[#5A0000] to-[#FFAEB0]",
    inner: "bg-gradient-to-b from-[#FFDEDE] via-[#680002] to-[#FFE9E9]",
    button: "bg-gradient-to-b from-[#F08D8F] to-[#A45253]",
    text: "text-[#FFF7F0]",
    shadow: "[text-shadow:_0_-1px_0_rgb(146_64_14_/_100%)]",
  },
  gold: {
    outer: "bg-gradient-to-b from-[#917100] to-[#EAD98F]",
    inner: "bg-gradient-to-b from-[#FFFDDD] via-[#856807] to-[#FFF1B3]",
    button: "bg-gradient-to-b from-[#FFEBA1] to-[#9B873F]",
    text: "text-[#FFFDE5]",
    shadow: "[text-shadow:_0_-1px_0_rgb(178_140_2_/_100%)]",
  },
  bronze: {
    outer: "bg-gradient-to-b from-[#864813] to-[#E9B486]",
    inner: "bg-gradient-to-b from-[#EDC5A1] via-[#5F2D01] to-[#FFDEC1]",
    button: "bg-gradient-to-b from-[#FFE3C9] to-[#A36F3D]",
    text: "text-[#FFF7F0]",
    shadow: "[text-shadow:_0_-1px_0_rgb(124_45_18_/_100%)]",
  },
}

interface MetalButtonProps {
  children: ReactNode
  variant?: MetalColorVariant
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  className?: string
}

/**
 * MetalButton — skeuomorphic 3D metal button with 6 color variants. Uses
 * a 3-layer construction (outer shell + inner highlight + button face) plus
 * shine sweep on press and brightness lift on hover.
 */
export function MetalButton({
  children,
  variant = "default",
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: MetalButtonProps) {
  const [pressed, setPressed] = useState(false)
  const [hovered, setHovered] = useState(false)
  const v = METAL_VARIANTS[variant]
  const ease = "all 250ms cubic-bezier(0.1, 0.4, 0.2, 1)"

  return (
    <div
      className={cn("relative inline-flex rounded-md p-[1.25px]", v.outer, className)}
      style={{
        transform: pressed ? "translateY(2.5px) scale(0.99)" : "translateY(0) scale(1)",
        boxShadow: pressed
          ? "0 1px 2px rgba(0,0,0,0.15)"
          : hovered
            ? "0 4px 12px rgba(0,0,0,0.12)"
            : "0 3px 8px rgba(0,0,0,0.08)",
        transition: ease,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <div
        className={cn("absolute inset-[1px] rounded-lg", v.inner)}
        style={{ transition: ease, filter: hovered && !pressed ? "brightness(1.05)" : "none" }}
      />
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "relative z-10 m-[1px] inline-flex h-11 cursor-pointer items-center justify-center overflow-hidden rounded-md px-6 py-2 text-sm font-semibold leading-none",
          v.button,
          v.text,
          v.shadow,
        )}
        style={{
          transform: pressed ? "scale(0.97)" : "scale(1)",
          transition: ease,
          filter: hovered && !pressed ? "brightness(1.02)" : "none",
        }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setPressed(false)
          setHovered(false)
        }}
        onTouchStart={() => setPressed(true)}
        onTouchEnd={() => setPressed(false)}
      >
        {/* Shine on press */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-20 overflow-hidden transition-opacity duration-300",
            pressed ? "opacity-20" : "opacity-0",
          )}
        >
          <div className="absolute inset-0 rounded-md bg-gradient-to-r from-transparent via-neutral-100 to-transparent" />
        </div>
        {children}
        {hovered && !pressed && (
          <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-t from-transparent to-white/5" />
        )}
      </button>
    </div>
  )
}
