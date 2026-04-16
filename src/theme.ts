// ═══════════════════════════════════════════════
// GLASS THEME — Global configuration
// ═══════════════════════════════════════════════
//
// Edit this file to customize the glass system
// for any project. Change the accent, tweak blur,
// adjust border intensity — all components pick
// it up automatically.
//
// Drop glass-theme.ts + glass.tsx into any
// React/Next.js project and you're set.
//
// ═══════════════════════════════════════════════

import type React from "react";

// ─── Accent Colors ─────────────────────────────
// Change these to rebrand the entire glass system.

export const accent = {
  primary: "#E85D04",
  secondary: "#F07020",
} as const;

// ─── Text Colors ───────────────────────────────

export const text = {
  primary: "#FFFFFF",
  secondary: "rgba(255,255,255,0.7)",
  muted: "rgba(255,255,255,0.4)",
  accent: accent.primary,
} as const;

// ─── Blur Levels ───────────────────────────────
// Moderate blur — distorts background softly
// without going opaque. Increase for frostier,
// decrease for clearer glass.

export const blur = {
  heavy: 24,
  medium: 16,
  light: 10,
} as const;

// ─── Shadows ───────────────────────────────────
// Shadow is the primary depth cue.

export const shadows = {
  depth: "0 8px 32px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.2)",
  depthHover: "0 16px 48px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.3)",
  accentGlow: `0 12px 40px rgba(${hexToRgb(accent.primary)},0.35), 0 0 80px rgba(${hexToRgb(accent.secondary)},0.15)`,
  /** Resting glow for accent elements — always-on subtle ember */
  accentAmbient: `0 8px 32px rgba(0,0,0,0.4), 0 0 16px rgba(${hexToRgb(accent.primary)},0.12), 0 0 40px rgba(${hexToRgb(accent.primary)},0.06)`,
  subtle: "0 4px 20px rgba(0,0,0,0.3)",
} as const;

// ─── Glass Fill ────────────────────────────────
// Very low opacity — the glass is transparent.

/** Blue accent — secondary brand color for AI / Build surfaces */
export const blueAccent = {
  primary: "#0064F0",
  light: "#4AB4FF",
  mid: "#1A9FF8",
} as const;

export const fill = {
  default: {
    from: "rgba(255,255,255,0.08)",
    to: "rgba(255,255,255,0.02)",
  },
  accent: {
    from: "rgba(255,255,255,0.14)",
    mid: `rgba(${hexToRgb(accent.primary)},0.22)`,
    to: `rgba(${hexToRgb(accent.primary)},0.12)`,
  },
  blue: {
    from: "rgba(255,255,255,0.12)",
    mid: `rgba(${hexToRgb(blueAccent.primary)},0.18)`,
    to: `rgba(${hexToRgb(blueAccent.primary)},0.10)`,
  },
  flat: {
    default: "rgba(255,255,255,0.05)",
    accent: `rgba(${hexToRgb(accent.primary)},0.08)`,
    blue: `rgba(${hexToRgb(blueAccent.primary)},0.08)`,
  },
} as const;

// ─── Border Config ─────────────────────────────
// Controls the 3D bevel border intensity.
// top = brightest edge (light catch)
// mid = sides
// bottom = shadow side (still visible)

export const border = {
  width: "1px",
  default: {
    top: 0.5,
    midHigh: 0.15,
    mid: 0.08,
    midLow: 0.1,
    bottom: 0.2,
  },
  accent: {
    top: 0.75,
    midHigh: 0.25,
    mid: 0.15,
    midLow: 0.18,
    bottom: 0.35,
  },
  blue: {
    top: 0.65,
    midHigh: 0.22,
    mid: 0.12,
    midLow: 0.15,
    bottom: 0.30,
  },
} as const;

// ─── Inset Bevel Config ────────────────────────
// Dual inset shadows for 3D glass pane edge.

export const inset = {
  default: {
    topOpacity: 0.35,
    bottomOpacity: 0.1,
  },
  accent: {
    topOpacity: 0.55,
    bottomOpacity: 0.2,
  },
  blue: {
    topOpacity: 0.5,
    bottomOpacity: 0.18,
  },
} as const;

// ─── Convex Highlight ──────────────────────────
// Thin bright gradient at top of components.

export const highlight = {
  default: {
    from: "rgba(255,255,255,0.12)",
    mid: "rgba(255,255,255,0.02)",
  },
  accent: {
    from: "rgba(255,160,60,0.22)",
    mid: "rgba(255,120,30,0.06)",
  },
  blue: {
    from: "rgba(120,200,255,0.20)",
    mid: "rgba(0,100,240,0.05)",
  },
} as const;

// ─── Card Top Line ─────────────────────────────

export const topLine = {
  default: "rgba(255,255,255,0.4)",
  accent: "rgba(255,160,60,0.7)",
  blue: "rgba(120,200,255,0.6)",
  inset: "5%",
} as const;

// ─── Saturate ──────────────────────────────────

export const saturate = {
  heavy: 1.2,
  medium: 1.1,
  light: 1.05,
} as const;

// ─── Easing ────────────────────────────────────

export const easing = {
  smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
  bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;

// ─── Radii ─────────────────────────────────────

export const radius = {
  pill: "9999px",
  card: "16px",
  input: "12px",
} as const;

// ─── Backgrounds ───────────────────────────────
// Three presets matching the CSS utility classes.
// Rich = marketing, Muted = dashboard, Neutral = blog.

export const backgrounds = {
  rich: `
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232,93,4,0.03) 0%, transparent 55%),
    radial-gradient(ellipse 60% 40% at 80% 70%, rgba(255,255,255,0.02) 0%, transparent 50%),
    radial-gradient(ellipse 50% 50% at 20% 90%, rgba(255,255,255,0.015) 0%, transparent 50%),
    linear-gradient(180deg, #111 0%, #0D0D0D 30%, #0A0A0A 70%, #080808 100%)`,
  muted: `
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232,93,4,0.02) 0%, transparent 60%),
    linear-gradient(180deg, #0D0D0D 0%, #080808 100%)`,
  neutral: "#080808",
} as const;

/** @deprecated Use backgrounds.rich instead */
export const demoBackground = backgrounds.rich;

// ═══════════════════════════════════════════════
// COMPUTED HELPERS — used by glass.tsx
// ═══════════════════════════════════════════════

export type GlassVariant = "default" | "accent" | "blue";

/** 3D bevel border — bright top, visible bottom */
export function glassBorder(
  variant: GlassVariant,
  angle: number = 180
): React.CSSProperties {
  const b =
    variant === "accent"
      ? border.accent
      : variant === "blue"
        ? border.blue
        : border.default;

  const topColor =
    variant === "accent"
      ? `rgba(255,180,80,${b.top})`
      : variant === "blue"
        ? `rgba(120,200,255,${b.top})`
        : `rgba(255,255,255,${b.top})`;
  const accentRgb =
    variant === "accent"
      ? hexToRgb(accent.primary)
      : variant === "blue"
        ? hexToRgb(blueAccent.primary)
        : null;
  const midHighColor = accentRgb
    ? `rgba(${accentRgb},${b.midHigh})`
    : `rgba(255,255,255,${b.midHigh})`;
  const midColor = accentRgb
    ? `rgba(${accentRgb},${b.mid})`
    : `rgba(255,255,255,${b.mid})`;
  const midLowColor = accentRgb
    ? `rgba(${accentRgb},${b.midLow})`
    : `rgba(255,255,255,${b.midLow})`;
  const bottomColor =
    variant === "accent"
      ? `rgba(255,160,60,${b.bottom})`
      : variant === "blue"
        ? `rgba(74,180,255,${b.bottom})`
        : `rgba(255,255,255,${b.bottom})`;

  return {
    border: `${border.width} solid transparent`,
    background: `transparent padding-box,
      linear-gradient(${angle}deg,
        ${topColor} 0%,
        ${midHighColor} 30%,
        ${midColor} 50%,
        ${midLowColor} 70%,
        ${bottomColor} 100%
      ) border-box`,
  };
}

/** Dual inset shadows: bright top line + subtle bottom line */
export function insetBevel(variant: GlassVariant): string {
  const cfg =
    variant === "accent"
      ? inset.accent
      : variant === "blue"
        ? inset.blue
        : inset.default;

  const topColor =
    variant === "accent"
      ? `rgba(255,180,80,${cfg.topOpacity})`
      : variant === "blue"
        ? `rgba(120,200,255,${cfg.topOpacity})`
        : `rgba(255,255,255,${cfg.topOpacity})`;
  const bottomColor =
    variant === "accent"
      ? `rgba(255,140,40,${cfg.bottomOpacity})`
      : variant === "blue"
        ? `rgba(0,100,240,${cfg.bottomOpacity})`
        : `rgba(255,255,255,${cfg.bottomOpacity})`;

  return `inset 0 1px 0 ${topColor}, inset 0 -1px 0 ${bottomColor}`;
}

// ─── Internal ──────────────────────────────────

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r},${g},${b}`;
}
