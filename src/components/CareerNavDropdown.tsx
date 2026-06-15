import { useEffect, useId, useRef, useState } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { ChevronDown } from 'lucide-react'

import { useLocale } from '@/components/LocaleContext'
import { getCareerNavItems, isCareerPath } from '@/lib/career-nav'
import { localizePath } from '@/lib/i18n'
import { getUiMessages } from '@/lib/i18n/messages'
import { isCareerSubNavActive } from '@/lib/nav-active'
import { cn } from '@/lib/utils'

type CareerNavDropdownProps = {
  useChrome: boolean
  pathname: string
  onNavigate?: () => void
  variant: 'desktop' | 'mobile'
}

export function CareerNavDropdown({
  useChrome,
  pathname,
  onNavigate,
  variant,
}: CareerNavDropdownProps) {
  const { locale } = useLocale()
  const items = getCareerNavItems(locale)
  const label = getUiMessages(locale).careerNav.label
  const menuId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const active = isCareerPath(pathname)
  const careerHref = localizePath('/career', locale)

  useEffect(() => {
    if (variant !== 'desktop' || !open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [open, variant])

  if (variant === 'mobile') {
    return (
      <div className={cn('flex flex-col', open && 'gap-3')}>
        <button
          type="button"
          className="nav-mobile-link flex items-center justify-between font-display text-2xl italic text-left"
          style={
            active
              ? { color: useChrome ? 'var(--chrome-accent)' : 'var(--accent-soft-color)' }
              : undefined
          }
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          {label}
          <ChevronDown
            size={20}
            aria-hidden
            className={cn('transition-transform duration-200', open && 'rotate-180')}
          />
        </button>
        <div
          id={menuId}
          className={cn(
            'overflow-hidden transition-[max-height] duration-300 ease-out pl-4 border-l',
            open ? 'max-h-64' : 'max-h-0',
          )}
          style={{
            borderColor: useChrome
              ? 'var(--chrome-border)'
              : 'color-mix(in srgb, var(--accent-ink-color) 20%, transparent)',
          }}
          aria-hidden={!open}
        >
          <ul className="flex flex-col gap-4 py-2">
            {items.map((item) => {
              const itemActive = isCareerSubNavActive(item.href, pathname)
              const href = localizePath(item.href, locale)

              return (
                <li key={item.href}>
                  <a
                    href={href}
                    className="block"
                    aria-current={itemActive ? 'page' : undefined}
                    onClick={() => {
                      setOpen(false)
                      onNavigate?.()
                    }}
                    tabIndex={open ? undefined : -1}
                  >
                    <span
                      className="font-display text-xl italic"
                      style={{
                        color: itemActive
                          ? useChrome
                            ? 'var(--chrome-accent)'
                            : 'var(--accent-soft-color)'
                          : useChrome
                            ? 'var(--chrome-text)'
                            : 'var(--body-color)',
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="block font-body text-sm mt-1"
                      style={{ color: useChrome ? 'var(--chrome-text-muted)' : 'var(--muted-text-color)' }}
                    >
                      {item.description}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node)) setOpen(false)
      }}
    >
      <a
        href={careerHref}
        className="gold-link inline-flex items-center gap-1.5"
        aria-current={active ? 'page' : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => {
          setOpen(false)
          onNavigate?.()
        }}
      >
        {label}
        <ChevronDown size={14} aria-hidden className={cn('transition-transform', open && 'rotate-180')} />
      </a>

      <div
        className={cn(
          'absolute left-1/2 top-full z-50 w-[min(18rem,calc(100vw-2rem))] -translate-x-1/2 pt-3 transition-all duration-200',
          open ? 'pointer-events-auto opacity-100 translate-y-0' : 'pointer-events-none opacity-0 -translate-y-1',
        )}
        aria-hidden={!open}
      >
        <div id={menuId} className="career-nav-dropdown" role="menu">
          <ul className="p-2">
            {items.map((item) => {
              const itemActive = isCareerSubNavActive(item.href, pathname)
              const href = localizePath(item.href, locale)

              return (
                <li key={item.href} role="none">
                  <a
                    href={href}
                    role="menuitem"
                    className="career-nav-dropdown__item block rounded-[var(--media-radius)] px-4 py-3 transition-colors"
                    aria-current={itemActive ? 'page' : undefined}
                    onClick={() => {
                      setOpen(false)
                      onNavigate?.()
                    }}
                  >
                    <span className="font-display text-lg italic">{item.label}</span>
                    <span className="block font-body text-xs mt-1 leading-snug opacity-80">{item.description}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
