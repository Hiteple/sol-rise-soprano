import { useEffect, useId, useRef, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { ChevronDown } from 'lucide-react'

import { careerNavItems, isCareerPath } from '@/lib/career-nav'
import { cn } from '@/lib/utils'

type CareerNavDropdownProps = {
  useChrome: boolean
  onHeroHome: boolean
  pathname: string
  onNavigate?: () => void
  variant: 'desktop' | 'mobile'
}

export function CareerNavDropdown({
  useChrome,
  onHeroHome,
  pathname,
  onNavigate,
  variant,
}: CareerNavDropdownProps) {
  const menuId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const active = isCareerPath(pathname)

  useEffect(() => {
    if (variant !== 'desktop' || !open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [open, variant])

  const linkColor = active
    ? useChrome
      ? 'var(--chrome-text)'
      : onHeroHome
        ? 'var(--accent-pale-color)'
        : 'var(--accent-soft-color)'
    : undefined

  if (variant === 'mobile') {
    return (
      <div className={cn('flex flex-col', open && 'gap-3')}>
        <button
          type="button"
          className="flex items-center justify-between font-display text-2xl italic text-left"
          style={{ color: useChrome ? 'var(--chrome-text)' : 'var(--body-color)' }}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          Career
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
            {careerNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="block"
                  onClick={() => {
                    setOpen(false)
                    onNavigate?.()
                  }}
                  tabIndex={open ? undefined : -1}
                >
                  <span
                    className="font-display text-xl italic"
                    style={{
                      color:
                        pathname === item.href || pathname.startsWith(`${item.href}/`)
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
                </Link>
              </li>
            ))}
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
      <Link
        to="/career"
        className="gold-link inline-flex items-center gap-1.5"
        style={{ color: linkColor }}
        aria-current={active ? 'page' : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => {
          setOpen(false)
          onNavigate?.()
        }}
      >
        Career
        <ChevronDown size={14} aria-hidden className={cn('transition-transform', open && 'rotate-180')} />
      </Link>

      {/* pt-3 bridges the gap so mouseenter stays active while moving into the panel */}
      <div
        className={cn(
          'absolute left-1/2 top-full z-50 w-[min(18rem,calc(100vw-2rem))] -translate-x-1/2 pt-3 transition-all duration-200',
          open ? 'pointer-events-auto opacity-100 translate-y-0' : 'pointer-events-none opacity-0 -translate-y-1',
        )}
        aria-hidden={!open}
      >
        <div id={menuId} className="career-nav-dropdown" role="menu">
          <ul className="p-2">
            {careerNavItems.map((item) => (
              <li key={item.href} role="none">
                <Link
                  to={item.href}
                  role="menuitem"
                  className="career-nav-dropdown__item block rounded-[var(--media-radius)] px-4 py-3 transition-colors"
                  onClick={() => {
                    setOpen(false)
                    onNavigate?.()
                  }}
                >
                  <span className="font-display text-lg italic">{item.label}</span>
                  <span className="block font-body text-xs mt-1 leading-snug opacity-80">{item.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
