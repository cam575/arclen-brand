"use client"

import React, { forwardRef, type ReactNode } from "react"
import { cn } from "../utils"

const variantClass = {
  default: "",
  sm: "btn-glass-sm",
  full: "btn-glass-full",
} as const

type GlassVariant = keyof typeof variantClass

/* ─── Shared inner content ─── */

function GlassContent({
  label,
  mobileLabel,
  icon,
  hideIcon,
}: {
  label: string
  mobileLabel?: string
  icon?: ReactNode
  hideIcon?: boolean
}) {
  return (
    <span className="flex items-center justify-center gap-1.5">
      {mobileLabel ? (
        <>
          <span className="sm:hidden">{mobileLabel}</span>
          <span className="hidden sm:inline">{label}</span>
        </>
      ) : (
        label
      )}
      {!hideIcon && icon}
    </span>
  )
}

/* ─── GlassButtonSimple (native <button>) ─── */

interface GlassButtonSimpleProps {
  label: string
  mobileLabel?: string
  onClick?(): void
  className?: string
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  variant?: GlassVariant
  icon?: ReactNode
  hideIcon?: boolean
}

export const GlassButtonSimple = forwardRef<HTMLButtonElement, GlassButtonSimpleProps>(
  (
    {
      label,
      mobileLabel,
      onClick,
      className,
      type = "button",
      disabled = false,
      variant = "default",
      icon,
      hideIcon = false,
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-label={label}
      className={cn("btn-glass", variantClass[variant], className)}
      onClick={onClick}
    >
      <GlassContent
        label={label}
        mobileLabel={mobileLabel}
        icon={icon}
        hideIcon={hideIcon}
      />
    </button>
  )
)
GlassButtonSimple.displayName = "GlassButtonSimple"

/* ─── GlassAnchor (plain <a>) ─── */

interface GlassAnchorProps {
  label: string
  mobileLabel?: string
  href: string
  className?: string
  variant?: GlassVariant
  icon?: ReactNode
  hideIcon?: boolean
  target?: string
  rel?: string
}

export function GlassAnchor({
  label,
  mobileLabel,
  href,
  className,
  variant = "default",
  icon,
  hideIcon = false,
  target,
  rel,
}: GlassAnchorProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn("btn-glass", variantClass[variant], className)}
    >
      <GlassContent label={label} mobileLabel={mobileLabel} icon={icon} hideIcon={hideIcon} />
    </a>
  )
}
