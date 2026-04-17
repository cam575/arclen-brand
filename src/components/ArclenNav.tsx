"use client"

import { useState, useEffect } from "react"
import type { ReactNode } from "react"
import { cn } from "../utils"
import { MenuButton } from "./MenuButton"

export type NavTheme = "dark" | "light"

export interface ArclenNavProps {
  logo: (theme: NavTheme) => ReactNode
  renderMenuTrigger?: (isOpen: boolean, toggle: () => void) => ReactNode
  renderMenuOverlay?: (isOpen: boolean, close: () => void) => ReactNode
  hideUntilScroll?: boolean
  className?: string
}

const STYLE_ID = "arclen-nav-styles"
const NAV_STYLES = `
@keyframes arclen-nav-entrance {
  0% { opacity: 0; transform: translateY(-12px); }
  100% { opacity: 1; transform: translateY(0); }
}
.arclen-nav-pill--light { color: #111111; }
`

function ensureStyles() {
  if (typeof document === "undefined") return
  if (document.getElementById(STYLE_ID)) return
  const style = document.createElement("style")
  style.id = STYLE_ID
  style.textContent = NAV_STYLES
  document.head.appendChild(style)
}

export function ArclenNav({
  logo,
  renderMenuTrigger,
  renderMenuOverlay,
  hideUntilScroll = false,
  className,
}: ArclenNavProps) {
  const [visible, setVisible] = useState(!hideUntilScroll)
  const [menuOpen, setMenuOpen] = useState(false)
  const [navTheme, setNavTheme] = useState<NavTheme>("dark")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    ensureStyles()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (hideUntilScroll) setVisible(window.scrollY > 100)
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hideUntilScroll])

  useEffect(() => {
    const NAV_LINE = 60

    const computeTheme = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-nav-theme]")
      )
      if (sections.length === 0) return

      const candidates = sections.filter((el) => {
        const r = el.getBoundingClientRect()
        return r.top <= NAV_LINE && r.bottom > NAV_LINE
      })
      if (candidates.length === 0) return

      let winner = candidates[0]
      for (const c of candidates) {
        if (winner.contains(c)) winner = c
      }
      const theme = winner.getAttribute("data-nav-theme") as NavTheme | null
      if (theme) setNavTheme(theme)
    }

    computeTheme()
    window.addEventListener("scroll", computeTheme, { passive: true })
    window.addEventListener("resize", computeTheme)
    return () => {
      window.removeEventListener("scroll", computeTheme)
      window.removeEventListener("resize", computeTheme)
    }
  }, [])

  const toggleMenu = () => setMenuOpen((v) => !v)
  const closeMenu = () => setMenuOpen(false)

  const trigger = renderMenuTrigger
    ? renderMenuTrigger(menuOpen, toggleMenu)
    : <MenuButton isOpen={menuOpen} onClick={toggleMenu} />

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-70 flex justify-center pt-3 lg:pt-5 px-3 lg:px-5 pointer-events-none transition-all duration-300",
          !visible ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0",
          className
        )}
        style={
          visible
            ? { animation: "arclen-nav-entrance 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards" }
            : undefined
        }
      >
        <div
          className={cn(
            "w-full relative overflow-hidden pointer-events-auto",
            navTheme === "light" ? "arclen-nav-pill--light" : ""
          )}
          style={{
            maxWidth: scrolled ? "min(92%, 1140px)" : "min(96%, 1280px)",
            padding: scrolled ? "10px 10px 10px 16px" : "14px 20px",
            borderRadius: scrolled ? "12px" : "16px",
            transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {!menuOpen && (
            <>
              <span
                className="absolute inset-0 rounded-[inherit]"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                  backdropFilter: scrolled ? "blur(24px) saturate(1.2)" : "blur(0px) saturate(1)",
                  WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.2)" : "blur(0px) saturate(1)",
                  boxShadow: scrolled
                    ? "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(255,255,255,0.1)"
                    : "inset 0 1px 0 rgba(255,255,255,0), inset 0 -1px 0 rgba(255,255,255,0)",
                  opacity: scrolled ? 1 : 0,
                  transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              />
              <span
                className="absolute inset-0 rounded-[inherit] pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 30%, transparent 50%, rgba(0,0,0,0.06) 100%)",
                  opacity: scrolled ? 1 : 0,
                  transition: "opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              />
              <span
                className="absolute inset-0 rounded-[inherit] pointer-events-none"
                style={{
                  border: "1px solid transparent",
                  background: scrolled
                    ? "transparent padding-box, linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.1) 70%, rgba(255,255,255,0.2) 100%) border-box"
                    : "transparent padding-box, linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%) border-box",
                  transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              />
              <span
                className="absolute inset-0 rounded-[inherit] pointer-events-none"
                style={{
                  boxShadow: scrolled
                    ? "0 8px 32px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.2)"
                    : "0 8px 32px rgba(0,0,0,0), 0 2px 6px rgba(0,0,0,0)",
                  transition: "box-shadow 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              />
            </>
          )}
          <div className="relative z-1 flex items-center justify-between w-full">
            {logo(navTheme)}
            {trigger}
          </div>
        </div>
      </nav>

      {renderMenuOverlay?.(menuOpen, closeMenu)}
    </>
  )
}
