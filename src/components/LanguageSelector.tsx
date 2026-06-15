import { useRouterState } from '@tanstack/react-router'

import { LocaleFlagIcon } from '@/components/LocaleFlagIcon'
import { useLocale } from '@/components/LocaleContext'
import {
  LOCALE_LABELS,
  LOCALE_SHORT,
  LOCALES,
  localizePath,
  pathnameMatchesNavHref,
  stripLocaleFromPathname,
  type Locale,
} from '@/lib/i18n'
import { cn } from '@/lib/utils'

type LanguageSelectorProps = {
  variant?: 'desktop' | 'mobile'
  useChrome?: boolean
  onNavigate?: () => void
}

function localeButtonLabel(code: Locale, isActive: boolean): string {
  return isActive ? `${LOCALE_LABELS[code]} (${LOCALE_SHORT[code]}), current language` : LOCALE_LABELS[code]
}

export function LanguageSelector({ variant = 'desktop', useChrome = true, onNavigate }: LanguageSelectorProps) {
  const { locale, messages } = useLocale()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const basePath = stripLocaleFromPathname(pathname)

  const switchTo = (next: Locale) => {
    if (next === locale) return
    const href = localizePath(basePath === '/' ? '/' : basePath, next)
    onNavigate?.()
    window.location.assign(href)
  }

  const flagSize = variant === 'mobile' ? 24 : 20

  if (variant === 'mobile') {
    return (
      <div className="pt-2 border-t" style={{ borderColor: 'color-mix(in srgb, var(--chrome-border) 70%, transparent)' }}>
        <p
          id="language-selector-mobile-label"
          className="text-xs uppercase tracking-widest mb-3 font-body font-semibold"
          style={{ color: useChrome ? 'var(--chrome-accent)' : 'var(--accent-ink-color)' }}
        >
          {messages.language}
        </p>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-labelledby="language-selector-mobile-label"
        >
          {LOCALES.map((code) => {
            const isActive = locale === code
            return (
              <button
                key={code}
                type="button"
                lang={code}
                tabIndex={isActive ? -1 : undefined}
                onClick={() => switchTo(code)}
                className={cn(
                  'locale-pill locale-pill-with-flag font-body text-sm px-3 py-1.5 rounded-full border transition-colors duration-200 inline-flex items-center gap-2',
                  isActive && 'locale-pill-active',
                )}
                aria-label={localeButtonLabel(code, isActive)}
                aria-current={isActive ? 'true' : undefined}
              >
                <LocaleFlagIcon locale={code} size={flagSize} decorative className="locale-flag-icon" />
                <span aria-hidden="true">{LOCALE_SHORT[code]}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div
      className="locale-switcher flex items-center gap-1 rounded-full border px-1 py-1"
      role="group"
      aria-label={messages.language}
      style={{
        borderColor: useChrome ? 'var(--chrome-border)' : 'color-mix(in srgb, var(--accent-ink-color) 20%, transparent)',
      }}
    >
      {LOCALES.map((code) => {
        const isActive = locale === code
        return (
              <button
                key={code}
                type="button"
                lang={code}
                tabIndex={isActive ? -1 : undefined}
                onClick={() => switchTo(code)}
                className={cn(
                  'locale-pill locale-pill-with-flag font-body text-xs tracking-wider px-2 py-1 rounded-full transition-all duration-200 inline-flex items-center gap-1.5',
                  isActive && 'locale-pill-active',
                )}
                aria-label={localeButtonLabel(code, isActive)}
                aria-current={isActive ? 'true' : undefined}
              >
            <LocaleFlagIcon locale={code} size={flagSize} decorative className="locale-flag-icon" />
            <span aria-hidden="true">{LOCALE_SHORT[code]}</span>
          </button>
        )
      })}
    </div>
  )
}

export { pathnameMatchesNavHref }
