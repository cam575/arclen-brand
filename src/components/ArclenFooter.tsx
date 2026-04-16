"use client"

import type { ReactNode } from "react"
import { GlassBadge } from "./GlassBadge"
import { GlassCard } from "./GlassCard"
import { GlassIconButton } from "./GlassIconButton"

type FooterLink = {
  name: string
  href: string
  badge?: string
}

export type ArclenFooterCTA = {
  /** Headline for the merged final CTA (rendered above the footer link columns). */
  headline: string
  /** Optional subcopy under the headline. */
  sub?: string
  /** Buttons / links composed by the consumer (e.g. GlowLink + GlassButton). */
  actions: ReactNode
  /** Optional tertiary text link rendered under the buttons (e.g. "Or book a strategy call →"). */
  tertiary?: ReactNode
  /** Optional background image URL. Defaults to a soft radial glow. */
  backgroundImage?: string
}

const FOOTER_LINKS: Record<string, FooterLink[]> = {
  Products: [
    { name: "Page Scan", href: "/page" },
    { name: "Ad Scan", href: "/ads" },
    { name: "Build Platform", href: "/build" },
  ],
  Services: [
    { name: "Arclen Grow", href: "/grow" },
  ],
  "Use Cases": [
    { name: "For SaaS", href: "/for-saas" },
    { name: "For Course Creators", href: "/for-course-creators" },
    { name: "For Agencies", href: "/for-agencies" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
}

export function ArclenFooter({ cta }: { cta?: ArclenFooterCTA } = {}) {
  return (
    <footer className="relative pb-16 overflow-hidden">
      {/* Merged final CTA (optional) */}
      {cta && (
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden">
          {cta.backgroundImage && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url('${cta.backgroundImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
              }}
            />
          )}
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.02em] leading-[1.1]">
              {cta.headline}
            </h2>
            {cta.sub && (
              <p className="mt-6 text-lg text-[#A1A1A1] max-w-xl mx-auto">
                {cta.sub}
              </p>
            )}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              {cta.actions}
            </div>
            {cta.tertiary && (
              <div className="mt-6 text-sm text-[#A1A1A1]">
                {cta.tertiary}
              </div>
            )}
          </div>
        </section>
      )}

      <div className={`relative z-10 max-w-[1200px] mx-auto px-6 ${cta ? "pt-4" : "pt-16"}`}>
        {/* Rich dual-tone ambient backdrop — gives the Clear variant
            something to actually reveal. Ember top-left, blue bottom-right,
            composition (never blended in one gradient). */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            inset: "0 0 -40px 0",
            backgroundImage: [
              "radial-gradient(ellipse 45% 85% at 15% 25%, rgba(232,93,4,0.20) 0%, transparent 55%)",
              "radial-gradient(ellipse 45% 85% at 85% 75%, rgba(0,100,240,0.16) 0%, transparent 55%)",
            ].join(", "),
            zIndex: 0,
          }}
        />
        {/* Soft ember glow bridging the card and the ghosted wordmark below */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            bottom: -40,
            width: "70%",
            height: 120,
            background:
              "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(232,93,4,0.08) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />
        <GlassCard variant="clear" hover={false} padding="40px 32px" className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-[1.8fr_1fr_1fr_1fr_1fr] gap-8">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1 sm:pr-8">
            <img
              src="https://arclen.io/logos/arclen-wordmark.png"
              alt="Arclen"
              width={120}
              height={32}
              className="h-7 w-auto"
            />
            <p className="text-[#A1A1A1] text-sm mt-4 max-w-[280px]">
              Diagnose. Build. Grow.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <p className="text-[#666666] text-xs font-semibold uppercase tracking-wider mb-4">
                {category}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <span className="flex flex-col gap-1">
                      <a
                        href={link.href}
                        className="text-[#A1A1A1] hover:text-white text-sm transition-colors"
                      >
                        {link.name}
                      </a>
                      {link.badge && (
                        <GlassBadge variant="accent" className="text-[8px] font-semibold w-fit">
                          {link.badge}
                        </GlassBadge>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

          {/* Divider + copyright bar inside the card */}
          <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-[#666666] text-sm">
              &copy; 2026 Arclen &middot; Diagnose. Build. Grow.
            </p>
            <div className="flex items-center gap-4">
              <a href="/privacy" className="text-[#666666] text-sm hover:text-white transition-colors">Privacy</a>
              <a href="/terms" className="text-[#666666] text-sm hover:text-white transition-colors">Terms</a>
              <a
                href="https://x.com/cam_rickerby"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on X"
              >
                <GlassIconButton size={32}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </GlassIconButton>
              </a>
              <a
                href="https://www.linkedin.com/company/arclen-io/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on LinkedIn"
              >
                <GlassIconButton size={32}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </GlassIconButton>
              </a>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Ghosted brand section */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: 200 }}
      >
        {/* Large ghosted Arclen wordmark SVG */}
        <svg
          viewBox="0 0 540.75 142.15"
          className="pointer-events-none select-none absolute"
          style={{ height: "clamp(80px, 15vw, 180px)", width: "auto" }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="footer-ghost-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.20" />
              <stop offset="60%" stopColor="white" stopOpacity="0.07" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g fill="url(#footer-ghost-gradient)">
            <path d="M89.63,37.81h12.36v97.93h-12.36v-16.78c-10.7,12.91-24.16,19.18-39.47,19.18C21.58,138.14,0,114.35,0,86.5s22.13-51.27,50.53-51.27c15.86,0,29.32,6.82,39.1,20.47v-17.89ZM12.91,86.87c0,21.21,16.6,39.84,38.55,39.84,20.1,0,39.1-15.12,39.1-39.47,0-22.69-16.97-39.84-38.92-39.84S12.91,65.84,12.91,86.87Z" />
            <path d="M137.58,52.01c7.38-10.7,15.31-16.78,25.27-16.78,5.72,0,8.67,1.84,11.25,3.32l-6.64,10.7c-1.48-.74-3.87-1.84-6.64-1.84-9.22,0-17.52,7.93-21.21,21.39-1.66,6.27-2.03,16.41-2.03,29.69v37.26h-13.28V37.81h13.28v14.2Z" />
            <path d="M266.24,110.14l-28.21,16.29c-2.39,1.38-5.34,1.38-7.73,0l-28.62-16.52c-2.39-1.38-3.87-3.93-3.87-6.7v-33.05c0-2.76,1.47-5.32,3.87-6.7l28.62-16.52c2.39-1.38,5.34-1.38,7.73,0l28,16.17,8.42-8.42c-9.43-11.86-23.96-19.46-40.29-19.46-28.42,0-51.46,23.04-51.46,51.46,0,28.42,23.04,51.46,51.46,51.46,16.41,0,31.02-7.68,40.44-19.65l-8.36-8.36Z" />
            <path d="M298.78,0h12.54v135.74h-12.54V0Z" />
            <path d="M391.17,125.74c-2.91.62-6.09.97-9.58.97-21.03,0-36.33-16.41-36.89-38.92h88.16c-.37-32.46-22.87-52.56-50.72-52.56-30.62,0-50.35,25.08-50.35,51.83s18.63,51.09,51.09,51.09c5.1,0,9.85-.57,14.27-1.69-2.89-2.91-4.98-6.6-5.98-10.72ZM382.32,47.4c16.97,0,31.54,9.04,36.7,29.33h-73.04c5.72-19.92,18.81-29.33,36.33-29.33Z" />
            <path d="M467.71,55.33c10.14-13.28,22.32-20.1,36.7-20.1,21.39,0,36.33,14.75,36.33,45.55v54.96h-12.54v-53.3c0-23.05-7.19-35.78-26.19-35.78-10.51,0-19.18,4.61-25.82,13.28-7.38,9.59-8.48,19.18-8.48,34.67v41.13h-12.54V37.81h12.54v17.52Z" />
          </g>
          <circle cx="419.66" cy="122.98" r="12.75" fill="#E85D04" fillOpacity="0.08" />
        </svg>

        {/* Horizontal rule through center */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "50%",
            height: 1,
            zIndex: 1,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.06) 80%, transparent 100%)",
          }}
        />

        {/* Centered torus */}
        <div
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: "140%",
              height: "140%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(232,93,4,0.15) 0%, rgba(232,93,4,0.05) 40%, transparent 70%)",
            }}
          />
          <img
            src="https://arclen.io/images/torus/torus-v4-compact.webp"
            alt=""
            width={640}
            height={640}
            className="relative w-[80px] md:w-[100px] h-auto"
            style={{
              maskImage: "radial-gradient(circle, black 40%, transparent 60%)",
              WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 60%)",
              filter: "brightness(0.8)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Bottom fade overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: 80,
            background: "linear-gradient(to top, #080808, transparent)",
          }}
        />

        {/* Subtle orange glow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            bottom: 0,
            width: 400,
            height: 80,
            background:
              "radial-gradient(ellipse, rgba(232,93,4,0.06), transparent 70%)",
          }}
        />
      </div>

    </footer>
  )
}
