"use client";

import React from "react";
import {
  accent,
  easing,
  type GlassVariant,
} from "../theme";
import { hexToRgbInline } from "./helpers";

// ═══════════════════════════════════════════════
// GlassProgress — Progress bar with glass styling
// ═══════════════════════════════════════════════

interface GlassProgressProps {
  value: number;
  variant?: GlassVariant;
  height?: number;
  className?: string;
}

export function GlassProgress({
  value,
  variant = "default",
  height = 4,
  className = "",
}: GlassProgressProps) {
  const isAccent = variant === "accent";

  return (
    <div
      className={className}
      style={{
        width: "100%",
        height,
        borderRadius: height / 2,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.04)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${Math.min(100, Math.max(0, value))}%`,
          borderRadius: "inherit",
          background: isAccent
            ? `linear-gradient(90deg, ${accent.primary}, ${accent.secondary})`
            : "rgba(255,255,255,0.8)",
          boxShadow: isAccent
            ? `0 0 12px rgba(${hexToRgbInline(accent.primary)},0.4)`
            : "0 0 8px rgba(255,255,255,0.15)",
          transition: `width 0.5s ${easing.smooth}`,
        }}
      />
    </div>
  );
}
