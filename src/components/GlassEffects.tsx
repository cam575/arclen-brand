"use client";

import React from "react";
import {
  blur,
  type GlassVariant,
} from "../theme";

// ═══════════════════════════════════════════════
// GlassSpotlight — Cursor-tracking ambient light
// ═══════════════════════════════════════════════
//
// A radial gradient that follows the mouse cursor.
// Simulates light catching the glass surface from
// different angles. Compose with GlassLayers.
//
// USAGE:
//   const [hovered, setHovered] = useState(false);
//   const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
//   const handleMouseMove = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     setMousePos({
//       x: ((e.clientX - rect.left) / rect.width) * 100,
//       y: ((e.clientY - rect.top) / rect.height) * 100,
//     });
//   };
//   <div style={{ position: "relative" }} onMouseMove={handleMouseMove}>
//     <GlassLayers />
//     <GlassSpotlight x={mousePos.x} y={mousePos.y} visible={hovered} />
//     <div style={{ position: "relative", zIndex: 1 }}>{content}</div>
//   </div>
//
// ═══════════════════════════════════════════════

interface GlassSpotlightProps {
  /** Cursor X position as percentage (0-100) */
  x: number;
  /** Cursor Y position as percentage (0-100) */
  y: number;
  /** Whether the spotlight is visible */
  visible: boolean;
  /** Glass variant for color matching */
  variant?: GlassVariant;
  /** Spotlight radius in CSS units (default "250px") */
  size?: string;
}

export function GlassSpotlight({
  x,
  y,
  visible,
  variant = "default",
  size = "250px",
}: GlassSpotlightProps) {
  const color = variant === "accent"
    ? "rgba(255,160,60,0.07)"
    : "rgba(255,255,255,0.06)";

  return (
    <span
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        background: `radial-gradient(circle ${size} at ${x}% ${y}%, ${color} 0%, transparent 100%)`,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
      }}
    />
  );
}

// ═══════════════════════════════════════════════
// GlassNoise — Subtle frosted noise texture
// ═══════════════════════════════════════════════
//
// Renders a procedural noise overlay using an
// inline SVG feTurbulence filter. Adds physical
// realism to glass surfaces — real frosted glass
// has grain.
//
// USAGE:
//   <div style={{ position: "relative", borderRadius: 16 }}>
//     <GlassLayers />
//     <GlassNoise />
//     <div style={{ position: "relative", zIndex: 1 }}>{content}</div>
//   </div>
//
// ═══════════════════════════════════════════════

// Grayscale noise: feTurbulence → feColorMatrix (desaturate) → white speckles only.
// High baseFrequency (1.2) = fine grain, not blobby. Screen blend = lightens only.
const NOISE_SVG = `data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E`;

interface GlassNoiseProps {
  opacity?: number;
}

export function GlassNoise({ opacity = 0.08 }: GlassNoiseProps) {
  return (
    <span
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        backgroundImage: `url("${NOISE_SVG}")`,
        backgroundSize: "128px 128px",
        opacity,
        mixBlendMode: "screen",
        pointerEvents: "none",
      }}
    />
  );
}

// ═══════════════════════════════════════════════
// GlassShimmer — Diagonal light sweep
// ═══════════════════════════════════════════════
//
// A renderless span that shows a diagonal shimmer
// sweeping across the surface. Activated by the
// `active` prop (wire to parent hover state) or
// runs continuously with `loop`.
//
// USAGE (hover):
//   const [hovered, setHovered] = useState(false);
//   <div onMouseEnter={...} onMouseLeave={...}>
//     <GlassLayers />
//     <GlassShimmer active={hovered} />
//   </div>
//
// USAGE (loop):
//   <GlassLayers />
//   <GlassShimmer loop />
//
// ═══════════════════════════════════════════════

let shimmerStyleInjected = false;

function injectShimmerStyles() {
  if (shimmerStyleInjected || typeof document === "undefined") return;
  const style = document.createElement("style");
  style.textContent = `
    @keyframes glass-shimmer-sweep {
      0% { transform: translateX(-100%) rotate(-15deg); }
      100% { transform: translateX(400%) rotate(-15deg); }
    }
  `;
  document.head.appendChild(style);
  shimmerStyleInjected = true;
}

interface GlassShimmerProps {
  active?: boolean;
  loop?: boolean;
  duration?: number;
}

export function GlassShimmer({
  active = false,
  loop = false,
  duration = 1.2,
}: GlassShimmerProps) {
  React.useEffect(() => {
    injectShimmerStyles();
  }, []);

  const shouldAnimate = active || loop;

  return (
    <span
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "50%",
          height: "200%",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 60%, transparent 100%)",
          transform: shouldAnimate ? undefined : "translateX(-200%) rotate(-15deg)",
          animation: shouldAnimate
            ? `glass-shimmer-sweep ${duration}s ${loop ? "ease-in-out infinite" : "ease-out forwards"}`
            : "none",
          pointerEvents: "none",
        }}
      />
    </span>
  );
}

// ═══════════════════════════════════════════════
// GlassSkeleton — Loading placeholder
// ═══════════════════════════════════════════════
//
// A frosted glass loading skeleton with a slow
// shimmer sweep. Replaces generic gray skeletons
// with something that matches the glass system.
//
// USAGE:
//   <GlassSkeleton width={200} height={20} />
//   <GlassSkeleton width="100%" height={48} borderRadius={12} />
//   <GlassSkeleton width={48} height={48} borderRadius="50%" />
//
// ═══════════════════════════════════════════════

let skeletonStyleInjected = false;

function injectSkeletonStyles() {
  if (skeletonStyleInjected || typeof document === "undefined") return;
  const style = document.createElement("style");
  style.textContent = `
    @keyframes glass-skeleton-shimmer {
      0% { transform: translateX(-100%) rotate(-15deg); }
      100% { transform: translateX(400%) rotate(-15deg); }
    }
  `;
  document.head.appendChild(style);
  skeletonStyleInjected = true;
}

interface GlassSkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
  className?: string;
}

export function GlassSkeleton({
  width = "100%",
  height = 20,
  borderRadius = 8,
  className = "",
}: GlassSkeletonProps) {
  React.useEffect(() => {
    injectSkeletonStyles();
  }, []);

  return (
    <span
      className={className}
      style={{
        position: "relative",
        display: "block",
        width,
        height,
        borderRadius,
        overflow: "hidden",
      }}
    >
      {/* Glass base */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: `blur(${blur.medium}px)`,
          WebkitBackdropFilter: `blur(${blur.medium}px)`,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(255,255,255,0.03)",
        }}
      />
      {/* Border */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          border: "1px solid rgba(255,255,255,0.06)",
          pointerEvents: "none",
        }}
      />
      {/* Shimmer sweep */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "50%",
            height: "200%",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 60%, transparent 100%)",
            animation: "glass-skeleton-shimmer 2s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
      </span>
    </span>
  );
}
