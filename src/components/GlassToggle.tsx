"use client";

import React from "react";
import {
  accent,
  highlight,
  blur,
  saturate,
  easing,
  glassBorder,
  insetBevel,
  type GlassVariant,
} from "../theme";
import { hexToRgbInline } from "./helpers";

// ═══════════════════════════════════════════════
// GlassToggle — On/off toggle switch
// ═══════════════════════════════════════════════

interface GlassToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  variant?: GlassVariant;
  size?: "sm" | "md";
  disabled?: boolean;
  className?: string;
}

const SIZES = {
  sm: { width: 38, height: 22, thumb: 16, pad: 3, travel: 16 },
  md: { width: 52, height: 28, thumb: 22, pad: 3, travel: 23 },
} as const;

export function GlassToggle({
  checked = false,
  onChange,
  variant = "default",
  size = "md",
  disabled = false,
  className = "",
}: GlassToggleProps) {
  const isAccent = variant === "accent";
  const thumbVariant: GlassVariant = checked && isAccent ? "accent" : "default";
  const s = SIZES[size];

  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => !disabled && onChange?.(!checked)}
      disabled={disabled}
      className={className}
      style={{
        position: "relative",
        width: s.width,
        height: s.height,
        borderRadius: s.height / 2,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        background: "transparent",
        outline: "none",
        padding: 0,
        flexShrink: 0,
      }}
    >
      {/* Track */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: checked
            ? isAccent
              ? `rgba(${hexToRgbInline(accent.primary)},0.12)`
              : "rgba(255,255,255,0.1)"
            : "rgba(255,255,255,0.05)",
          backdropFilter: `blur(${blur.medium}px) saturate(${saturate.medium})`,
          WebkitBackdropFilter: `blur(${blur.medium}px) saturate(${saturate.medium})`,
          transition: "background 0.3s ease",
        }}
      />
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          ...glassBorder(thumbVariant),
          transition: "all 0.3s ease",
          pointerEvents: "none",
        }}
      />
      {/* Thumb */}
      <span
        style={{
          position: "absolute",
          top: s.pad,
          left: checked ? s.width - s.thumb - s.pad : s.pad,
          width: s.thumb,
          height: s.thumb,
          borderRadius: "50%",
          transition: `all 0.3s ${easing.bounce}`,
        }}
      >
        {/* Glass fill */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background: checked
              ? isAccent
                ? `radial-gradient(circle at 38% 28%, rgba(255,160,60,0.15) 0%, rgba(${hexToRgbInline(accent.primary)},0.05) 70%)`
                : "radial-gradient(circle at 38% 28%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 70%)"
              : "radial-gradient(circle at 38% 28%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 70%)",
            backdropFilter: `blur(${blur.medium}px) saturate(${saturate.heavy})`,
            WebkitBackdropFilter: `blur(${blur.medium}px) saturate(${saturate.heavy})`,
            boxShadow: insetBevel(thumbVariant),
          }}
        />
        {/* Convex highlight */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background: `radial-gradient(ellipse 55% 40% at 42% 25%,
              ${thumbVariant === "accent" ? highlight.accent.from : highlight.default.from} 0%,
              transparent 100%)`,
            pointerEvents: "none",
          }}
        />
        {/* 3D bevel border */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            ...glassBorder(thumbVariant, 135),
          }}
        />
        {/* Shadow */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            boxShadow: checked
              ? isAccent
                ? `0 2px 12px rgba(${hexToRgbInline(accent.primary)},0.25)`
                : "0 2px 12px rgba(255,255,255,0.12)"
              : "0 2px 8px rgba(0,0,0,0.3)",
          }}
        />
      </span>
    </button>
  );
}
