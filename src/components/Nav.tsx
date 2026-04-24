import { useState, useEffect } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { allHomes } from 'content-collections'

import { parseSiteNavLinks } from '@/lib/nav-links'

const fallbackNavLinks = [
  { to: '/' as const, label: 'Home' },
  { to: '/bio' as const, label: 'Bio' },
  { to: '/career' as const, label: 'Career' },
  { to: '/productions' as const, label: 'Productions' },
  { to: '/gallery' as const, label: 'Gallery' },
  { to: '/contact' as const, label: 'Contact' },
]

export function Nav() {
  const site = allHomes[0]
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const navLinks = parseSiteNavLinks(
    site?.headerNavLinks,
    fallbackNavLinks.map((link) => ({ label: link.label, href: link.to })),
  )
  const onHeroHome = pathname === '/' && !scrolled
  /** Wine bar everywhere except over the home hero before scroll */
  const useChrome = scrolled || pathname !== '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        useChrome ? 'nav-chrome' : `bg-transparent${onHeroHome ? ' nav-hero' : ''}`
      }`}
      data-sb-object-id="content/home/data.md"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Name */}
          <Link to="/" className="flex flex-col leading-none">
            <span
              className="font-display text-xl tracking-widest"
              style={{
                color: useChrome
                  ? 'var(--chrome-accent)'
                  : onHeroHome
                    ? 'var(--accent-pale-color)'
                    : 'var(--accent-color)',
                letterSpacing: '0.2em',
                textShadow: onHeroHome
                  ? '0 1px 18px rgba(16, 43, 31, 0.5)'
                  : undefined,
              }}
              data-sb-field-path="headerBrandLine1"
            >
              {site?.headerBrandLine1 ?? 'Sol Risé'}
            </span>
            <span
              className="font-display text-xs tracking-[0.35em] uppercase"
              style={{
                color: useChrome
                  ? 'var(--chrome-text-muted)'
                  : onHeroHome
                    ? 'var(--nav-overlay-text-muted-color)'
                    : 'var(--muted-text-color)',
                textShadow: onHeroHome ? '0 1px 14px rgba(16, 43, 31, 0.45)' : undefined,
              }}
              data-sb-field-path="headerBrandLine2"
            >
              {site?.headerBrandLine2 ?? 'Soprano'}
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, idx) => (
              <a
                key={`${link.label}-${link.href}`}
                href={link.href}
                className="gold-link"
                data-sb-field-path={`headerNavLinks.${idx}`}
                style={
                  pathname === link.href
                    ? {
                        color: useChrome
                          ? 'var(--chrome-text)'
                          : onHeroHome
                            ? 'var(--accent-pale-color)'
                            : 'var(--accent-soft-color)',
                      }
                    : undefined
                }
                onClick={() => setMenuOpen(false)}
                onMouseEnter={(e) => {
                  if (pathname !== link.href && !useChrome && onHeroHome) {
                    e.currentTarget.style.color = 'var(--accent-pale-color)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== link.href && !useChrome && onHeroHome) {
                    e.currentTarget.style.color = ''
                  }
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              color: useChrome
                ? 'var(--chrome-text)'
                : onHeroHome
                  ? 'var(--nav-overlay-text-color)'
                  : 'var(--body-color)',
              filter: onHeroHome
                ? 'drop-shadow(0 1px 10px rgba(16,43,31,0.55))'
                : undefined,
            }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-8 pt-4 flex flex-col gap-6 border-t"
          style={{
            background: useChrome
              ? 'color-mix(in srgb, var(--chrome-bg) 96%, black)'
              : 'color-mix(in srgb, var(--section-background-color) 97%, white)',
            borderColor: useChrome ? 'var(--chrome-border)' : 'color-mix(in srgb, var(--accent-color) 15%, transparent)',
          }}
        >
          {navLinks.map((link, idx) => (
            <a
              key={`${link.label}-${link.href}-mobile`}
              href={link.href}
              className="font-display text-2xl italic"
              data-sb-field-path={`headerNavLinks.${idx}`}
              style={{ color: useChrome ? 'var(--chrome-text)' : 'var(--body-color)' }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
