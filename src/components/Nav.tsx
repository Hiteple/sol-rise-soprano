import { useState, useEffect } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'

import { CareerNavDropdown } from '@/components/CareerNavDropdown'
import { MediaNavDropdown } from '@/components/MediaNavDropdown'
import { LanguageSelector, pathnameMatchesNavHref } from '@/components/LanguageSelector'
import { SiteBrandLogo } from '@/components/SiteBrandLogo'
import { useLocale } from '@/components/LocaleContext'
import { getHomePage } from '@/lib/i18n/content'
import { localizeNavHref, localizePath, translateNavLabel } from '@/lib/i18n'
import { isCareerNavHref } from '@/lib/career-nav'
import { isMediaNavHref } from '@/lib/media-nav'
import { parseSiteNavLinks } from '@/lib/nav-links'
import { cn } from '@/lib/utils'

/** Horizontal nav from 1061px; drawer at 1060px and below. */
const NAV_DESKTOP_MIN_WIDTH_PX = 1061

const fallbackNavLinks = [
  { to: '/' as const, label: 'Home' },
  { to: '/bio' as const, label: 'Bio' },
  { to: '/career' as const, label: 'Career' },
  { to: '/schedule' as const, label: 'Schedule' },
  { to: '/gallery' as const, label: 'Media' },
  { to: '/press-kit' as const, label: 'Press Kit' },
  { to: '/contact' as const, label: 'Contact' },
]

function isHomePathname(pathname: string): boolean {
  return pathname === '/' || /^\/(es|de|it)$/.test(pathname)
}

export function Nav() {
  const { locale } = useLocale()
  const site = getHomePage(locale)
  const [scrolled, setScrolled] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const navLinks = parseSiteNavLinks(
    site?.headerNavLinks,
    fallbackNavLinks.map((link) => ({ label: link.label, href: link.to })),
  )
  const onHeroHome = isDesktop && isHomePathname(pathname) && !scrolled
  const useChrome = !isDesktop || scrolled || !isHomePathname(pathname)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${NAV_DESKTOP_MIN_WIDTH_PX}px)`)
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

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  const mobileMenuId = 'site-mobile-menu'
  const homeHref = localizePath('/', locale)
  const headerBrandLogo = site?.headerBrandLogo?.trim()

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        useChrome ? 'nav-chrome' : `bg-transparent${onHeroHome ? ' nav-hero' : ''}`
      }`}
      data-sb-object-id="content/home/data.md"
    >
      <div className="relative z-[46] max-w-site mx-auto px-4 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link
            to={homeHref}
            className={headerBrandLogo ? 'flex items-center shrink-0' : 'flex flex-col leading-none'}
            aria-label="Sol Risé Soprano, home"
            onClick={() => setMenuOpen(false)}
          >
            {headerBrandLogo ? (
              <SiteBrandLogo variant="header" src={headerBrandLogo} fieldPath="headerBrandLogo" />
            ) : (
              <>
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
              </>
            )}
          </Link>

          <div className="hidden min-[1061px]:flex items-center gap-8">
            {navLinks.map((link, idx) => {
              const active = pathnameMatchesNavHref(link.href, pathname, locale)
              const href = localizeNavHref(link.href, locale)
              const label = translateNavLabel(link.label, locale)

              return isCareerNavHref(link.href) ? (
                <CareerNavDropdown
                  key={`${link.label}-${link.href}`}
                  variant="desktop"
                  useChrome={useChrome}
                  pathname={pathname}
                />
              ) : isMediaNavHref(link.href) ? (
                <MediaNavDropdown
                  key={`${link.label}-${link.href}`}
                  variant="desktop"
                  useChrome={useChrome}
                  pathname={pathname}
                />
              ) : (
                <Link
                  key={`${link.label}-${link.href}`}
                  to={href}
                  className="gold-link"
                  aria-current={active ? 'page' : undefined}
                  data-sb-field-path={`headerNavLinks.${idx}.label`}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              )
            })}
            <LanguageSelector variant="desktop" useChrome={useChrome} />
          </div>

          <button
            className="min-[1061px]:hidden p-2"
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

      <button
        type="button"
        tabIndex={menuOpen ? 0 : -1}
        className={cn(
          'min-[1061px]:hidden fixed top-20 left-0 right-0 bottom-0 z-40 bg-black/45 transition-opacity duration-300 ease-out motion-reduce:transition-none',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        aria-label="Close menu"
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />

      <div
        id={mobileMenuId}
        className={cn(
          'nav-mobile-drawer min-[1061px]:hidden fixed top-20 left-0 bottom-0 z-[45] flex w-[min(18rem,85vw)] flex-col overflow-y-auto border-r px-4 pb-8 pt-4 transition-transform duration-300 ease-out motion-reduce:transition-none',
          menuOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none',
        )}
        aria-hidden={!menuOpen}
        style={{
          background: useChrome
            ? 'color-mix(in srgb, var(--chrome-bg) 96%, black)'
            : 'color-mix(in srgb, var(--section-background-color) 97%, white)',
          borderColor: useChrome ? 'var(--chrome-border)' : 'color-mix(in srgb, var(--accent-ink-color) 15%, transparent)',
        }}
      >
        <div className="flex flex-col gap-2">
          {navLinks.map((link, idx) => {
            const active = pathnameMatchesNavHref(link.href, pathname, locale)
            const href = localizeNavHref(link.href, locale)
            const label = translateNavLabel(link.label, locale)

            return isCareerNavHref(link.href) ? (
              <CareerNavDropdown
                key={`${link.label}-${link.href}-mobile`}
                variant="mobile"
                useChrome={useChrome}
                pathname={pathname}
                onNavigate={() => setMenuOpen(false)}
              />
            ) : isMediaNavHref(link.href) ? (
              <MediaNavDropdown
                key={`${link.label}-${link.href}-mobile`}
                variant="mobile"
                useChrome={useChrome}
                pathname={pathname}
                onNavigate={() => setMenuOpen(false)}
              />
            ) : (
              <Link
                key={`${link.label}-${link.href}-mobile`}
                to={href}
                className="nav-mobile-link font-display italic"
                aria-current={active ? 'page' : undefined}
                data-sb-field-path={`headerNavLinks.${idx}.label`}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? undefined : -1}
              >
                {label}
              </Link>
            )
          })}
          <LanguageSelector
            variant="mobile"
            useChrome={useChrome}
            onNavigate={() => setMenuOpen(false)}
          />
        </div>
      </div>
    </nav>
  )
}
