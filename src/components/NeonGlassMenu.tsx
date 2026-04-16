"use client"

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"

export interface NeonMenuItem {
  label: string
  /** SVG path elements (children of an outer <svg viewBox="0 0 24 24" stroke="currentColor">). */
  icon: ReactNode
  /** Optional keyboard shortcut label, e.g. "⌘K", "⇧⌘P". Rendered on the right of the item. */
  shortcut?: string
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
  /** Start in open state. Default: true. */
  defaultOpen?: boolean
  /** Enable ⌘K / Ctrl+K toggle, ↑↓ navigate, Enter select, Esc close. Default: true. */
  keyboardShortcuts?: boolean
}

/**
 * Inline SVG noise mask (base-layer sparse organic bleed). Replaces the
 * external PNG the CodePen reference used so the component has no
 * external asset dependency.
 */
const NOISE_MASK_URL =
  "url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1.3 -0.2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

const NEON_MENU_CSS = `
.neon-menu {
  /* Arclen palette: hue1 = ember (#E85D04), hue2 = blue (#0064F0) */
  --hue1: 21;
  --hue2: 215;
  --border: 1px;
  --border-color: hsl(var(--hue2), 12%, 20%);
  --radius: 22px;
  --ease: cubic-bezier(0.5, 1, 0.89, 1);

  position: relative;
  min-width: 300px;
  max-width: 340px;
  border-radius: var(--radius);
  border: var(--border) solid var(--border-color);
  padding: 1em;
  background:
    linear-gradient(235deg, hsl(var(--hue1) 55% 12% / 0.5), hsl(var(--hue1) 50% 10% / 0) 33%),
    linear-gradient(45deg, hsl(var(--hue2) 55% 12% / 0.5), hsl(var(--hue2) 50% 10% / 0) 33%),
    linear-gradient(hsl(220deg 25% 4% / 0.78));
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  box-shadow:
    hsl(var(--hue2) 50% 2%) 0px 10px 16px -8px,
    hsl(var(--hue2) 50% 4%) 0px 20px 36px -14px,
    inset 0 1px 0 hsl(0 0% 100% / 0.04);

  font-family: inherit;
  font-size: 0.875rem;
  color: #8a90a0;

  /* open/close state machine */
  transition-property: opacity, filter, transform;
  transition-duration: 0.25s, 0.25s, 0.25s;
  transition-timing-function: var(--ease);
  opacity: 1;
  filter: blur(0);
  transform: translateY(0);
}
.neon-menu[data-open="false"] {
  opacity: 0;
  filter: blur(4px);
  transform: translateY(-4px);
  pointer-events: none;
}
.neon-menu[data-open="false"] .shine,
.neon-menu[data-open="false"] .glow { opacity: 0 !important; animation: none !important; }

.neon-menu .shine, .neon-menu .glow { --hue: var(--hue1); }
.neon-menu .shine-bottom, .neon-menu .glow-bottom { --hue: var(--hue2); --conic: 135deg; }

/* ===== shine — pixel-thin border highlight ===== */
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
  background: conic-gradient(from var(--conic, -45deg) at center, transparent var(--start, 0%), hsl(var(--hue), var(--sat, 90%), var(--lit, 72%)), transparent var(--end, 50%)) border-box;
  -webkit-mask-image: linear-gradient(transparent), linear-gradient(black);
  mask-image: linear-gradient(transparent), linear-gradient(black);
  -webkit-mask-clip: padding-box, border-box;
  mask-clip: padding-box, border-box;
  -webkit-mask-composite: xor;
  mask-composite: subtract;
}
.neon-menu .shine::before,
.neon-menu .shine::after { content: ""; width: auto; inset: -2px; -webkit-mask: none; mask: none; }
.neon-menu .shine::after {
  z-index: 2;
  --start: 17%;
  --end: 33%;
  background: conic-gradient(from var(--conic, -45deg) at center, transparent var(--start, 0%), hsl(var(--hue), var(--sat, 90%), var(--lit, 95%)), transparent var(--end, 50%));
}
.neon-menu .shine-bottom {
  top: auto; bottom: calc(var(--border) * -1); left: calc(var(--border) * -1); right: auto;
}

/* ===== glow — smooth color bleed outside the card ===== */
.neon-menu .glow {
  pointer-events: none;
  border-top-right-radius: calc(var(--radius) * 2.5);
  border-bottom-left-radius: calc(var(--radius) * 2.5);
  border: calc(var(--radius) * 1.25) solid transparent;
  inset: calc(var(--radius) * -2);
  width: 75%; height: auto; aspect-ratio: 1;
  display: block; position: absolute; left: auto; bottom: auto;

  opacity: 1;
  filter: blur(12px) saturate(1.25) brightness(0.5);
  mix-blend-mode: plus-lighter;
  z-index: 3;
}

/* ===== noise-inner — speckled neon texture clipped to card interior ===== */
.neon-menu .noise-inner {
  pointer-events: none;
  position: absolute;
  inset: 0;
  border-radius: inherit;
  overflow: hidden;   /* clip the noise to the card's rounded interior */
  z-index: 2;
}
.neon-menu .noise-inner::before,
.neon-menu .noise-inner::after {
  content: "";
  position: absolute;
  width: 110%;
  aspect-ratio: 1;
  -webkit-mask-image: ${NOISE_MASK_URL};
  mask-image: ${NOISE_MASK_URL};
  -webkit-mask-mode: luminance;
  mask-mode: luminance;
  -webkit-mask-size: 40%;
  mask-size: 40%;
  mix-blend-mode: plus-lighter;
  filter: blur(14px) saturate(1.1) brightness(0.35);
  opacity: 0.35;
}
.neon-menu .noise-inner::before {
  /* ember noise — top-right corner */
  top: -55%;
  right: -35%;
  background: radial-gradient(circle at center, hsl(var(--hue1) 95% 60%) 0%, hsl(var(--hue1) 95% 55% / 0.35) 30%, transparent 55%);
}
.neon-menu .noise-inner::after {
  /* blue noise — bottom-left corner */
  bottom: -55%;
  left: -35%;
  background: radial-gradient(circle at center, hsl(var(--hue2) 95% 60%) 0%, hsl(var(--hue2) 95% 55% / 0.35) 30%, transparent 55%);
}
.neon-menu .glow-bottom { inset: calc(var(--radius) * -2); top: auto; right: auto; }
.neon-menu .glow::before, .neon-menu .glow::after {
  content: ""; position: absolute; inset: 0;
  border: inherit; border-radius: inherit;
  background: conic-gradient(from var(--conic, -45deg) at center, transparent var(--start, 0%), hsl(var(--hue), var(--sat, 95%), var(--lit, 60%)), transparent var(--end, 50%)) border-box;
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

/* ===== glow-bright — sharp luminous outline that accents the shine ===== */
.neon-menu .glow-bright {
  --lit: 88%; --sat: 100%; --start: 14%; --end: 36%;
  border-width: 3px;
  border-radius: calc(var(--radius) + 1px);
  inset: -4px;
  left: auto;
  filter: blur(0.6px) brightness(1);
}
.neon-menu .glow-bright::after { content: none; }
.neon-menu .glow-bright.glow-bottom { inset: -4px; right: auto; top: auto; }

/* ===== flicker animations ===== */
.neon-menu .shine, .neon-menu .glow, .neon-menu .glow-bright { animation: neon-glow 1s var(--ease) both; }
.neon-menu .shine { animation-delay: 0s; animation-duration: 2s; }
.neon-menu .glow { animation-delay: 0.2s; }
.neon-menu .glow-bright { animation-delay: 0.1s; animation-duration: 1.5s; }
.neon-menu .shine-bottom { animation-delay: 0.1s; animation-duration: 1.8s; }
.neon-menu .glow-bottom { animation-delay: 0.3s; }
.neon-menu .glow-bright.glow-bottom { animation-delay: 0.3s; animation-duration: 1.1s; }

/* ===== inner content ===== */
.neon-menu .inner { display: flex; flex-direction: column; gap: 0.5em; position: relative; z-index: 10; }
.neon-menu section { display: flex; flex-direction: column; gap: 0.5em; }
.neon-menu section > header {
  font-size: 0.68rem; font-weight: 500; padding: 0 0.66em;
  color: hsl(0 0% 100% / 0.38);
  text-transform: uppercase; letter-spacing: 0.08em;
}
.neon-menu ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 2px; }
.neon-menu hr { width: 100%; height: 0.5px; background: var(--border-color); border: none; margin: 0.25em 0 0.5em; opacity: 0.66; }

@property --neon-item-opacity { syntax: "<number>"; inherits: false; initial-value: 0; }

.neon-menu li {
  --item-hue: var(--hue2);
  position: relative;
  padding: 0.66em 0.75em;
  min-height: 34px;
  display: flex; align-items: center; gap: 0.66em;
  border-radius: calc(var(--radius) * 0.33333);
  border: 1px solid transparent;
  transition: all 0.3s ease-in, --neon-item-opacity 0.3s ease-in;
  background: linear-gradient(90deg, hsl(var(--item-hue) 29% 13% / var(--neon-item-opacity)), hsl(var(--item-hue) 30% 15% / var(--neon-item-opacity)) 24% 32%, hsl(var(--item-hue) 5% 7% / 0) 95%) border-box;
  cursor: pointer;
  outline: none;
}
.neon-menu li::after {
  content: ""; position: absolute; inset: 0;
  border-radius: inherit; border: inherit;
  background: linear-gradient(90deg, hsl(var(--item-hue) 15% 16% / var(--neon-item-opacity)), hsl(var(--item-hue) 40% 24% / var(--neon-item-opacity)) 20% 32%, hsl(var(--item-hue) 2% 12% / 0) 95%) border-box;
  -webkit-mask-image: linear-gradient(transparent), linear-gradient(to right, black, transparent);
  mask-image: linear-gradient(transparent), linear-gradient(to right, black, transparent);
  -webkit-mask-clip: padding-box, border-box;
  mask-clip: padding-box, border-box;
  -webkit-mask-composite: xor;
  mask-composite: subtract;
  pointer-events: none;
}
.neon-menu li:hover,
.neon-menu li.highlighted,
.neon-menu li.selected,
.neon-menu li:hover::after,
.neon-menu li.highlighted::after,
.neon-menu li.selected::after {
  --neon-item-opacity: 0.5;
  transition: all 0.1s ease-out, --neon-item-opacity 0.1s ease-out;
  color: white;
}
.neon-menu li.selected, .neon-menu li.selected::after { animation: neon-flash 0.75s ease-out 1 forwards; }
.neon-menu section:first-of-type li { --item-hue: var(--hue1); }

.neon-menu li .item-label { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.neon-menu li .item-shortcut {
  margin-left: auto;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.68rem;
  color: hsl(0 0% 100% / 0.35);
  padding: 2px 6px;
  border-radius: 4px;
  background: hsl(var(--item-hue) 20% 10% / 0.5);
  border: 1px solid hsl(var(--item-hue) 15% 20% / 0.4);
  letter-spacing: 0.04em;
  transition: color 0.1s ease-out, background 0.1s ease-out, border-color 0.1s ease-out;
}
.neon-menu li:hover .item-shortcut,
.neon-menu li.highlighted .item-shortcut,
.neon-menu li.selected .item-shortcut {
  color: hsl(0 0% 100% / 0.75);
  background: hsl(var(--item-hue) 30% 15% / 0.7);
  border-color: hsl(var(--item-hue) 30% 25% / 0.6);
}

/* ===== search input ===== */
.neon-menu .search { display: grid; grid-template: 1fr/1fr; margin-bottom: 0.75em; width: 100%; position: relative; }
.neon-menu .search > * { grid-area: 1/1; align-self: center; }
.neon-menu .search svg.search-icon { margin-left: 0.66em; opacity: 0.45; height: 16px; width: 16px; fill: none; stroke-width: 1.5; pointer-events: none; }
.neon-menu .search:has(input:focus) svg.search-icon { stroke: hsl(var(--hue1) 70% 75%); opacity: 0.9; }
.neon-menu .search .kbd-hint {
  grid-area: 1/1;
  align-self: center;
  justify-self: end;
  margin-right: 0.66em;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.64rem;
  color: hsl(0 0% 100% / 0.3);
  padding: 2px 6px;
  border-radius: 4px;
  background: hsl(var(--hue2) 20% 10% / 0.5);
  border: 1px solid hsl(var(--hue2) 15% 20% / 0.4);
  letter-spacing: 0.04em;
  pointer-events: none;
}
.neon-menu input[type=text] {
  color: hsl(0 0% 100% / 0.7); font-family: inherit; font-weight: 400; font-size: 0.875rem;
  box-shadow: 0 0 0 1px transparent;
  border: 1px solid hsl(var(--hue2) 13% 18.5% / 0.5);
  background: linear-gradient(to bottom, hsl(var(--hue1) 20% 20% / 0.08) 50%, hsl(var(--hue1) 50% 50% / 0.7) 180%);
  background-size: 100% 300%; background-position: 0% 0%; background-repeat: no-repeat;
  border-radius: calc(var(--radius) * 0.33333);
  padding: 0.55em 3em 0.55em 2.33em;
  transition: all 0.3s var(--ease); outline: none; width: 100%;
}
.neon-menu input[type=text]:focus {
  border-color: hsl(var(--hue1) 40% 55% / 0.55);
  background-position: 0% 50%;
  color: hsl(var(--hue1) 20% 90%);
}
.neon-menu input[type=text]::placeholder { color: hsl(0 0% 100% / 0.28); }

.neon-menu svg { fill: none; stroke-width: 1; height: 18px; }

.neon-menu .empty {
  padding: 1.5em 0.66em;
  text-align: center;
  color: hsl(0 0% 100% / 0.35);
  font-size: 0.8rem;
}
`

/**
 * NeonGlassMenu — command-palette-style menu with conic-gradient neon glow
 * borders (dual-hue: ember + blue), noise-masked sparse color bleed,
 * animated flicker on open, and full keyboard navigation.
 *
 * Keyboard (when `keyboardShortcuts` is enabled, default):
 *   ⌘K / Ctrl+K  — toggle open/close
 *   ↑ ↓          — navigate items
 *   Enter        — select highlighted item
 *   Esc          — close
 *
 * Requires keyframes `neon-glow` and `neon-flash` (shipped in
 * arclen-brand/src/glass.css).
 */
export function NeonGlassMenu({
  sections,
  showSearch = true,
  searchPlaceholder = "Search commands…",
  className = "",
  defaultOpen = true,
  keyboardShortcuts = true,
}: NeonGlassMenuProps) {
  const [open, setOpen] = useState(defaultOpen)
  const [selected, setSelected] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [highlighted, setHighlighted] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter items by query. Keep section structure so headers still render.
  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return sections
    return sections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => item.label.toLowerCase().includes(q)),
      }))
      .filter((section) => section.items.length > 0)
  }, [sections, query])

  // Flat list of items for keyboard navigation (with stable keys).
  const flatItems = useMemo(() => {
    const flat: Array<{ key: string; item: NeonMenuItem; sectionIdx: number }> = []
    filteredSections.forEach((section, sIdx) => {
      section.items.forEach((item, iIdx) => {
        flat.push({ key: `${sIdx}-${iIdx}-${item.label}`, item, sectionIdx: sIdx })
      })
    })
    return flat
  }, [filteredSections])

  // Reset highlight when filter changes, clamp to valid range.
  useEffect(() => {
    setHighlighted((h) => (flatItems.length === 0 ? 0 : Math.min(h, flatItems.length - 1)))
  }, [flatItems.length])

  // Autofocus search when menu opens.
  useEffect(() => {
    if (open && showSearch) {
      // Delay to let the open transition start, otherwise the focus can
      // interfere with the flicker animation restart.
      const t = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(t)
    }
  }, [open, showSearch])

  // Global keyboard shortcuts (⌘K toggle).
  useEffect(() => {
    if (!keyboardShortcuts) return
    const handler = (e: KeyboardEvent) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k"
      if (isCmdK) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [keyboardShortcuts])

  // Local key handlers on the menu (arrow nav, enter, esc).
  const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!keyboardShortcuts || !open) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlighted((h) => (flatItems.length === 0 ? 0 : (h + 1) % flatItems.length))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlighted((h) => (flatItems.length === 0 ? 0 : (h - 1 + flatItems.length) % flatItems.length))
    } else if (e.key === "Enter") {
      e.preventDefault()
      const target = flatItems[highlighted]
      if (target) {
        setSelected(target.key)
        target.item.onClick?.()
      }
    } else if (e.key === "Escape") {
      e.preventDefault()
      setOpen(false)
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: NEON_MENU_CSS }} />
      <aside
        className={`neon-menu ${className}`}
        data-open={open ? "true" : "false"}
        onKeyDown={handleMenuKeyDown}
      >
        <span className="shine shine-top" />
        <span className="shine shine-bottom" />
        <span className="glow glow-top" />
        <span className="glow glow-bottom" />
        <span className="glow glow-bright glow-top" />
        <span className="glow glow-bright glow-bottom" />
        <span className="noise-inner" />

        <div className="inner">
          {showSearch && (
            <label className="search">
              <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder={searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
                spellCheck={false}
              />
              {keyboardShortcuts && <span className="kbd-hint">⌘K</span>}
            </label>
          )}

          {filteredSections.length === 0 ? (
            <div className="empty">No results</div>
          ) : (
            filteredSections.map((section, sIdx) => (
              <div key={section.header ?? sIdx}>
                {sIdx > 0 && <hr />}
                <section>
                  {section.header && <header>{section.header}</header>}
                  <ul>
                    {section.items.map((item, iIdx) => {
                      const key = `${sIdx}-${iIdx}-${item.label}`
                      const flatIdx = flatItems.findIndex((f) => f.key === key)
                      const isHighlighted = keyboardShortcuts && flatIdx === highlighted
                      const classes = [
                        selected === key ? "selected" : "",
                        isHighlighted ? "highlighted" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")
                      return (
                        <li
                          key={key}
                          className={classes}
                          tabIndex={-1}
                          onMouseEnter={() => keyboardShortcuts && flatIdx >= 0 && setHighlighted(flatIdx)}
                          onClick={() => {
                            setSelected(key)
                            item.onClick?.()
                          }}
                        >
                          <svg viewBox="0 0 24 24" stroke="currentColor">{item.icon}</svg>
                          <span className="item-label">{item.label}</span>
                          {item.shortcut && <span className="item-shortcut">{item.shortcut}</span>}
                        </li>
                      )
                    })}
                  </ul>
                </section>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  )
}
