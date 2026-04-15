"use client"

import type { ReactNode } from "react"

const LIQUID_GLASS_CSS = `
.lg-wrap {
  --lg-bg: rgba(255,255,255,0.25);
  --lg-highlight: rgba(255,255,255,0.75);
  --lg-text: #ffffff;
  --lg-accent: #E85D04;
  --lg-grey: #ccc;
  display: flex; flex-direction: column; align-items: center;
  gap: 2rem; padding: 2rem; border-radius: 1.5rem;
  position: relative; overflow: hidden;
  background-size: cover; background-position: center;
}
.lg-row { display: flex; gap: 1rem; width: 100%; }
.lg-glass {
  position: relative; display: flex; align-items: center;
  background: transparent; border-radius: 2rem; overflow: hidden;
  flex: 1 1 auto;
  box-shadow: 0 6px 6px rgba(0,0,0,0.2), 0 0 20px rgba(0,0,0,0.1);
  color: var(--lg-text);
}
.lg-glass--pill { border-radius: 3rem; }
.lg-glass--fit { flex: 0 1 auto; }
.lg-filter, .lg-overlay, .lg-specular {
  position: absolute; inset: 0; border-radius: inherit;
}
.lg-filter {
  z-index: 0;
  backdrop-filter: blur(4px) saturate(120%) brightness(1.15);
  -webkit-backdrop-filter: blur(4px) saturate(120%) brightness(1.15);
}
.lg-overlay { z-index: 1; background: var(--lg-bg); }
.lg-specular {
  z-index: 2;
  box-shadow: inset 1px 1px 0 var(--lg-highlight), inset 0 0 5px var(--lg-highlight);
}
.lg-content {
  position: relative; z-index: 3;
  display: flex; flex: 1 1 auto; align-items: center;
  justify-content: space-around;
  padding: 12px 28px; gap: 1rem; flex-wrap: wrap;
}
.lg-player { display: flex; align-items: center; justify-content: space-between; width: 100%; }
.lg-player__thumb { display: flex; align-items: center; gap: 1rem; }
.lg-player__img {
  width: 5rem; height: auto; border-radius: 0.5rem;
  transition: transform 0.25s ease-out;
}
.lg-player__img:hover { transform: scale(1.05); }
.lg-player__title { margin: 0; font-size: 1rem; color: rgba(0,0,0,0.85); font-weight: 600; }
.lg-player__artist { margin: 0; font-size: 0.875rem; color: rgba(0,0,0,0.5); }
.lg-player__controls { display: flex; align-items: center; gap: 1rem; }
.lg-player__controls svg { cursor: pointer; transition: transform 0.2s; }
.lg-player__controls svg:hover { transform: scale(1.15); }
.lg-player__controls svg:first-child { transform: scaleX(-1); }
.lg-player__controls svg:first-child:hover { transform: scaleX(-1) scale(1.15); }
.lg-tab {
  display: flex; flex-direction: column; align-items: center; text-align: center;
  color: var(--lg-grey); font-size: 0.75rem; cursor: pointer; padding: 0.25rem 0;
  transition: color 0.3s;
}
.lg-tab svg { fill: var(--lg-grey); height: 28px; margin-bottom: 0.25rem; filter: drop-shadow(0 0 3px rgba(255,255,255,0.25)); transition: transform 0.25s; }
.lg-tab:hover svg { transform: scale(1.1); }
.lg-tab--active {
  background: rgba(0,0,0,0.25); color: var(--lg-accent); margin: -8px -24px; padding: 0.5rem 1.5rem; border-radius: 3rem;
}
.lg-tab--active svg { fill: var(--lg-accent); }
.lg-search { fill: white; display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: white; }
.lg-dock-icon {
  width: 56px; margin-top: 4px; margin-bottom: -1px;
  transition: transform 0.2s ease-out; cursor: pointer;
}
.lg-dock-icon:hover { transform: scale(1.1); }
.lg-dock-icon:active { transform: scale(0.95); }
`

const PlayIcon = ({ size }: { size: number }) => (
  <svg viewBox="0 0 448 512" width={size}>
    <path
      fill="black"
      d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
    />
  </svg>
)

interface LiquidGlassPlayerProps {
  title?: string
  artist?: string
  albumArtSrc?: string
  className?: string
}

/** LiquidGlassPlayer — frosted music player pill (Apple-style). */
export function LiquidGlassPlayer({
  title = "All Of Me",
  artist = "Nao",
  albumArtSrc = "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  className = "",
}: LiquidGlassPlayerProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LIQUID_GLASS_CSS }} />
      <div className={`lg-glass lg-glass--pill ${className}`}>
        <div className="lg-filter" />
        <div className="lg-overlay" />
        <div className="lg-specular" />
        <div className="lg-content">
          <div className="lg-player">
            <div className="lg-player__thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="lg-player__img" src={albumArtSrc} alt="Album art" />
              <div>
                <p className="lg-player__title">{title}</p>
                <p className="lg-player__artist">{artist}</p>
              </div>
            </div>
            <div className="lg-player__controls">
              <PlayIcon size={18} />
              <PlayIcon size={22} />
              <PlayIcon size={18} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export interface LiquidGlassTab {
  label: string
  icon: ReactNode
  active?: boolean
  onClick?: () => void
}

interface LiquidGlassTabBarProps {
  tabs: LiquidGlassTab[]
  className?: string
}

/** LiquidGlassTabBar — frosted bottom tab bar. */
export function LiquidGlassTabBar({ tabs, className = "" }: LiquidGlassTabBarProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LIQUID_GLASS_CSS }} />
      <div className={`lg-glass lg-glass--pill ${className}`} style={{ flex: "1 1 auto" }}>
        <div className="lg-filter" />
        <div className="lg-overlay" />
        <div className="lg-specular" />
        <div className="lg-content">
          {tabs.map((tab) => (
            <div
              key={tab.label}
              className={`lg-tab ${tab.active ? "lg-tab--active" : ""}`}
              onClick={tab.onClick}
            >
              {tab.icon}
              {tab.label}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

interface LiquidGlassDockProps {
  /** Image URLs for the dock icons. */
  icons: { src: string; alt: string }[]
  className?: string
}

/** LiquidGlassDock — Apple-style dock with hover/active scale. */
export function LiquidGlassDock({ icons, className = "" }: LiquidGlassDockProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LIQUID_GLASS_CSS }} />
      <div className={`lg-glass ${className}`}>
        <div className="lg-filter" />
        <div className="lg-overlay" />
        <div className="lg-specular" />
        <div className="lg-content" style={{ justifyContent: "center" }}>
          {icons.map((icon) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={icon.src} className="lg-dock-icon" src={icon.src} alt={icon.alt} />
          ))}
        </div>
      </div>
    </>
  )
}

interface LiquidGlassKitProps {
  /** Background image URL for the wrapping frame. */
  backgroundSrc?: string
  children: ReactNode
  className?: string
}

/**
 * LiquidGlassKit — wrapping frame for a composition of LiquidGlass primitives
 * (Player, TabBar, Dock). Provides the background image and CSS variables.
 *
 * Compose your own layout inside, or use the standalone Player/TabBar/Dock
 * exports anywhere with their own background.
 */
export function LiquidGlassKit({
  backgroundSrc = "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?crop=entropy&cs=srgb&fm=jpg&w=1200&q=85",
  children,
  className = "",
}: LiquidGlassKitProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LIQUID_GLASS_CSS }} />
      <div
        className={`lg-wrap ${className}`}
        style={{ backgroundImage: `url("${backgroundSrc}")` }}
      >
        {children}
      </div>
    </>
  )
}
