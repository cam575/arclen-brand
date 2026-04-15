"use client"

import type { CSSProperties, ReactNode } from "react"

interface GradientBorderCTAProps {
  children: ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * GradientBorderCTA — premium CTA with the signature ember-to-blue gradient border,
 * top glow blob, and shimmer sweep on hover. Use for hero CTAs.
 */
export function GradientBorderCTA({
  children,
  onClick,
  type = "button",
  disabled = false,
  className,
  style,
}: GradientBorderCTAProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group/cta relative rounded-xl text-[14px] font-medium text-white transition-all hover:-translate-y-px active:scale-[0.97] ${className ?? ""}`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }}
    >
      {/* Glow blob above */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-[18px] left-[5%] right-[5%] h-[50px] rounded-[50%]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 90%, rgba(255,137,24,0.8) 0%, rgba(232,93,4,0.4) 30%, transparent 65%)",
          filter: "blur(3px)",
        }}
      />
      {/* Button body — gradient border */}
      <span
        className="relative block overflow-hidden rounded-xl px-8 py-3.5"
        style={{
          background:
            "linear-gradient(#000, #000) padding-box, linear-gradient(160deg, #ffaa40 0%, #ff8918 15%, #9f4e00 40%, #3a2000 70%, #0a2a5c 90%, #0064F0 100%) border-box",
          border: "1px solid transparent",
        }}
      >
        {/* Inner top glow */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[5%] right-[5%] top-0 h-[50px] rounded-[50%]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,170,64,0.35) 0%, rgba(255,137,24,0.15) 40%, transparent 70%)",
            transform: "translateY(-55%)",
          }}
        />
        {/* Shimmer on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 translate-x-[-100%] transition-transform duration-[600ms] ease-out group-hover/cta:translate-x-[100%]"
          style={{
            background:
              "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 65%)",
          }}
        />
        <span className="relative">{children}</span>
      </span>
    </button>
  )
}
