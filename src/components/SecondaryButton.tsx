"use client"

import type { CSSProperties, ReactNode } from "react"

interface SecondaryButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * SecondaryButton — outlined glass button. Pairs with GlowButton or GradientBorderCTA
 * as the secondary action.
 */
export function SecondaryButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  className,
  style,
}: SecondaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-8 py-3.5 text-[14px] font-medium text-white transition-all hover:-translate-y-px hover:bg-white/[0.04] active:scale-[0.97] ${className ?? ""}`}
      style={{
        border: "1px solid rgba(255,255,255,0.25)",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  )
}
