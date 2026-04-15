"use client"

import { useState, type ReactNode } from "react"

export interface NeonMenuItem {
  label: string
  /** SVG path elements (children of an outer <svg viewBox="0 0 24 24" stroke="currentColor">). */
  icon: ReactNode
  onClick?: () => void
}

export interface NeonMenuSection {
  header?: string
  items: NeonMenuItem[]
}

interface NeonGlassMenuProps {
  sections: NeonMenuSection[]
  /** Show the search input at the top. Default: true. */
  showSearch?: boolean
  searchPlaceholder?: string
  className?: string
}

const NEON_MENU_CSS = `
.neon-menu {
  --hue1: 25;
  --hue2: 220;
  --border: 1px;
  --border-color: hsl(var(--hue2), 12%, 20%);
  --radius: 22px;
  --ease: cubic-bezier(0.5, 1, 0.89, 1);
  position: relative;
  min-width: 275px;
  border-radius: var(--radius);
  border: var(--border) solid var(--border-color);
  padding: 1em;
  background: linear-gradient(235deg, hsl(var(--hue1) 50% 10% / 0.3), hsl(var(--hue1) 50% 10% / 0) 33%),
              linear-gradient(45deg, hsl(var(--hue2) 50% 10% / 0.3), hsl(var(--hue2) 50% 10% / 0) 33%),
              linear-gradient(hsl(220deg 25% 3% / 0.95));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: hsl(var(--hue2) 50% 2%) 0px 10px 16px -8px, hsl(var(--hue2) 50% 4%) 0px 20px 36px -14px;
  overflow: hidden;
  font-size: 0.875rem;
  color: #737985;
}
.neon-menu .shine, .neon-menu .glow { --hue: var(--hue1); }
.neon-menu .shine-bottom, .neon-menu .glow-bottom { --hue: var(--hue2); --conic: 135deg; }
.neon-menu .shine,
.neon-menu .shine::before,
.neon-menu .shine::after {
  pointer-events: none;
  border-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-left-radius: inherit;
  border: 1px solid transparent;
  width: 75%; height: auto; aspect-ratio: 1;
  display: block; position: absolute;
  right: calc(var(--border) * -1); top: calc(var(--border) * -1); left: auto;
  z-index: 1;
  --start: 12%;
  background: conic-gradient(from var(--conic, -45deg) at center, transparent var(--start,0%), hsl(var(--hue), var(--sat,80%), var(--lit,60%)), transparent var(--end,50%)) border-box;
  -webkit-mask-image: linear-gradient(transparent), linear-gradient(black);
  mask-image: linear-gradient(transparent), linear-gradient(black);
  -webkit-mask-clip: padding-box, border-box;
  mask-clip: padding-box, border-box;
  -webkit-mask-composite: xor;
  mask-composite: subtract;
}
.neon-menu .shine-bottom {
  top: auto; bottom: calc(var(--border) * -1); left: calc(var(--border) * -1); right: auto;
}
.neon-menu .glow {
  pointer-events: none;
  border-top-right-radius: calc(var(--radius) * 2.5);
  border-bottom-left-radius: calc(var(--radius) * 2.5);
  border: calc(var(--radius) * 1.25) solid transparent;
  inset: calc(var(--radius) * -2);
  width: 75%; height: auto; aspect-ratio: 1;
  display: block; position: absolute; left: auto; bottom: auto;
  opacity: 1;
  filter: blur(8px) saturate(1) brightness(0.15);
  mix-blend-mode: plus-lighter;
  z-index: 3;
}
.neon-menu .glow-bottom { inset: calc(var(--radius) * -2); top: auto; right: auto; }
.neon-menu .glow::before, .neon-menu .glow::after {
  content: ""; position: absolute; inset: 0;
  border: inherit; border-radius: inherit;
  background: conic-gradient(from var(--conic, -45deg) at center, transparent var(--start,0%), hsl(var(--hue), var(--sat,95%), var(--lit,60%)), transparent var(--end,50%)) border-box;
  -webkit-mask-image: linear-gradient(transparent), linear-gradient(black);
  mask-image: linear-gradient(transparent), linear-gradient(black);
  -webkit-mask-clip: padding-box, border-box;
  mask-clip: padding-box, border-box;
  -webkit-mask-composite: xor;
  mask-composite: subtract;
  filter: saturate(2) brightness(1);
}
.neon-menu .glow::after {
  --lit: 70%; --sat: 100%; --start: 15%; --end: 35%;
  border-width: calc(var(--radius) * 1.75);
  border-radius: calc(var(--radius) * 2.75);
  inset: calc(var(--radius) * -0.25);
  z-index: 4; opacity: 0.75;
}
.neon-menu .glow-bright {
  --lit: 85%; --sat: 100%; --start: 13%; --end: 37%;
  border-width: 2px; border-radius: calc(var(--radius) + 1px);
  inset: -2px; left: auto;
  filter: blur(0.5px) brightness(0.7);
}
.neon-menu .glow-bright::after { content: none; }
.neon-menu .glow-bright.glow-bottom { inset: -2px; right: auto; top: auto; }
.neon-menu .shine, .neon-menu .glow, .neon-menu .glow-bright { animation: neon-glow 1s var(--ease) both; }
.neon-menu .shine { animation-delay: 0s; animation-duration: 2s; }
.neon-menu .glow { animation-delay: 0.2s; }
.neon-menu .glow-bright { animation-delay: 0.1s; animation-duration: 1.5s; }
.neon-menu .shine-bottom { animation-delay: 0.1s; animation-duration: 1.8s; }
.neon-menu .glow-bottom { animation-delay: 0.3s; }
.neon-menu .glow-bright.glow-bottom { animation-delay: 0.3s; animation-duration: 1.1s; }
.neon-menu hr { width: 100%; height: 0.5px; background: var(--border-color); border: none; margin: 0.25em 0 0.5em; opacity: 0.66; }
.neon-menu .inner { display: flex; flex-direction: column; gap: 0.5em; position: relative; z-index: 10; }
.neon-menu section { display: flex; flex-direction: column; gap: 0.5em; }
.neon-menu section > header { font-size: 0.75rem; font-weight: 300; padding: 0 0.66em; }
.neon-menu ul { list-style: none; padding: 0; margin: 0; }
@property --neon-item-opacity { syntax: "<number>"; inherits: false; initial-value: 0; }
.neon-menu li {
  --item-hue: var(--hue2);
  position: relative; padding: 0.66em; height: 32px;
  display: flex; align-items: center; gap: 0.5em;
  border-radius: calc(var(--radius) * 0.33333);
  border: 1px solid transparent;
  transition: all 0.3s ease-in, --neon-item-opacity 0.3s ease-in;
  background: linear-gradient(90deg, hsl(var(--item-hue) 29% 13% / var(--neon-item-opacity)), hsl(var(--item-hue) 30% 15% / var(--neon-item-opacity)) 24% 32%, hsl(var(--item-hue) 5% 7% / 0) 95%) border-box;
  cursor: pointer;
}
.neon-menu li::after {
  content: ""; position: absolute; inset: 0;
  border-radius: inherit; border: inherit;
  background: linear-gradient(90deg, hsl(var(--item-hue) 15% 16% / var(--neon-item-opacity)), hsl(var(--item-hue) 40% 24% / var(--neon-item-opacity)) 20% 32%, hsl(var(--item-hue) 2% 12% / 0) 95%) border-box;
  mask: linear-gradient(transparent) padding-box, linear-gradient(to right, black, transparent) border-box;
  -webkit-mask: linear-gradient(transparent) padding-box, linear-gradient(to right, black, transparent) border-box;
  -webkit-mask-composite: xor;
  mask-composite: subtract;
}
.neon-menu li:hover, .neon-menu li.selected, .neon-menu li:focus,
.neon-menu li:hover::after, .neon-menu li.selected::after, .neon-menu li:focus::after {
  --neon-item-opacity: 0.5;
  transition: all 0.1s ease-out, --neon-item-opacity 0.1s ease-out;
  color: white; outline: none;
}
.neon-menu li.selected, .neon-menu li.selected::after { animation: neon-flash 0.75s ease-out 1 forwards; }
.neon-menu section:first-of-type li { --item-hue: var(--hue1); }
.neon-menu .search { display: grid; grid-template: 1fr/1fr; margin-bottom: 1em; width: 100%; }
.neon-menu .search > * { grid-area: 1/1; align-self: center; }
.neon-menu .search svg { margin-left: 0.5em; opacity: 0.5; height: 20px; fill: none; stroke-width: 1.5; }
.neon-menu .search:has(input:focus) svg { stroke: hsl(var(--hue1) 60% 70%); }
.neon-menu input[type=text] {
  color: hsl(0 0% 100% / 0.5); font-family: inherit; font-weight: 300;
  box-shadow: 0 0 0 1px transparent;
  border: 1px solid hsl(var(--hue2) 13% 18.5% / 0.5);
  background: linear-gradient(to bottom, hsl(var(--hue1) 20% 20% / 0.1) 50%, hsl(var(--hue1) 50% 50% / 0.8) 180%);
  background-size: 100% 300%; background-position: 0% 0%; background-repeat: no-repeat;
  border-radius: calc(var(--radius) * 0.33333);
  padding: 0.5em 0.5em 0.5em 2.33em;
  transition: all 0.3s var(--ease); outline: none; width: 100%;
}
.neon-menu input[type=text]:focus {
  border-color: hsl(var(--hue1) 20% 70% / 0.5);
  background-position: 0% 50%;
  color: hsl(var(--hue1) 20% 80%);
}
.neon-menu input[type=text]::placeholder { color: hsl(0 0% 100% / 0.3); }
.neon-menu svg { fill: none; stroke-width: 1; height: 20px; }
`

/**
 * NeonGlassMenu — command-palette-style menu with conic-gradient neon glow
 * borders (dual-hue: ember + blue) and animated shine/flash effects.
 *
 * Requires keyframes `neon-glow` and `neon-flash` (shipped in
 * arclen-brand/src/glass.css).
 *
 * Pass `sections` to populate the menu. Each item icon should be SVG path
 * children (the component wraps them in <svg viewBox="0 0 24 24">).
 */
export function NeonGlassMenu({
  sections,
  showSearch = true,
  searchPlaceholder = "type a command or search",
  className = "",
}: NeonGlassMenuProps) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: NEON_MENU_CSS }} />
      <aside className={`neon-menu ${className}`}>
        <span className="shine shine-top" />
        <span className="shine shine-bottom" />
        <span className="glow glow-top" />
        <span className="glow glow-bottom" />
        <span className="glow glow-bright glow-top" />
        <span className="glow glow-bright glow-bottom" />

        <div className="inner">
          {showSearch && (
            <label className="search">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input type="text" placeholder={searchPlaceholder} />
            </label>
          )}

          {sections.map((section, sIdx) => (
            <div key={section.header ?? sIdx}>
              {sIdx > 0 && <hr />}
              <section>
                {section.header && <header>{section.header}</header>}
                <ul>
                  {section.items.map((item, iIdx) => {
                    const key = `${sIdx}-${iIdx}-${item.label}`
                    return (
                      <li
                        key={key}
                        className={selected === key ? "selected" : ""}
                        tabIndex={0}
                        onClick={() => {
                          setSelected(key)
                          item.onClick?.()
                        }}
                      >
                        <svg viewBox="0 0 24 24" stroke="currentColor">{item.icon}</svg>
                        {item.label}
                      </li>
                    )
                  })}
                </ul>
              </section>
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}
