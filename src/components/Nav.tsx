import { useState, useEffect } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { allHomes } from 'content-collections'

import { parseSiteNavLinks } from '@/lib/nav-links'
import { cn } from '@/lib/utils'

const fallbackNavLinks = [
  { to: '/' as const, label: 'Home' },
  { to: '/bio' as const, label: 'Bio' },
  { to: '/career' as const, label: 'Career' },
  { to: '/gallery' as const, label: 'Gallery' },
  { to: '/contact' as const, label: 'Contact' },
]

export function Nav() {
  const site = allHomes[0]
  const [scrolled, setScrolled] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const navLinks = parseSiteNavLinks(
    site?.headerNavLinks,
    fallbackNavLinks.map((link) => ({ label: link.label, href: link.to })),
  )
  /** Transparent overlay only applies on the desktop home hero before scroll. */
  const onHeroHome = isDesktop && pathname === '/' && !scrolled
  /** Wine bar everywhere except over the desktop home hero before scroll. */
  const useChrome = !isDesktop || scrolled || pathname !== '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const mobileMenuId = 'site-mobile-menu'

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        useChrome ? 'nav-chrome' : `bg-transparent${onHeroHome ? ' nav-hero' : ''}`
      }`}
      data-sb-object-id="content/home/data.md"
    >
      <div className="max-w-site mx-auto px-4 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Name */}
          <Link to="/" className="flex flex-col leading-none" aria-label="Sol Risé Soprano, home">
            <span
              className="font-display text-xl tracking-widest"
              style={{
                color: useChrome
                  ? 'var(--chrome-accent)'
                  : onHeroHome
                    ? 'var(--accent-pale-color)'
                    : 'var(--accent-ink-color)',
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
                aria-current={pathname === link.href ? 'page' : undefined}
                data-sb-field-path={`headerNavLinks.${idx}.label`}
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
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls={mobileMenuId}
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
            {menuOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — slides down on open, up on close */}
      <div
        id={mobileMenuId}
        className={cn(
          'md:hidden overflow-hidden transition-[max-height] duration-300 ease-out motion-reduce:transition-none',
          menuOpen ? 'max-h-[28rem]' : 'max-h-0',
        )}
        aria-hidden={!menuOpen}
      >
        <div
          className={cn(
            'border-t px-4 pb-8 pt-4 flex flex-col gap-6 transition-transform duration-300 ease-out motion-reduce:transition-none',
            menuOpen ? 'translate-y-0 pointer-events-auto' : '-translate-y-full pointer-events-none',
          )}
          style={{
            background: useChrome
              ? 'color-mix(in srgb, var(--chrome-bg) 96%, black)'
              : 'color-mix(in srgb, var(--section-background-color) 97%, white)',
            borderColor: useChrome ? 'var(--chrome-border)' : 'color-mix(in srgb, var(--accent-ink-color) 15%, transparent)',
          }}
        >
          {navLinks.map((link, idx) => (
            <a
              key={`${link.label}-${link.href}-mobile`}
              href={link.href}
              className="font-display text-2xl italic"
              aria-current={pathname === link.href ? 'page' : undefined}
              data-sb-field-path={`headerNavLinks.${idx}.label`}
              style={{ color: useChrome ? 'var(--chrome-text)' : 'var(--body-color)' }}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? undefined : -1}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
