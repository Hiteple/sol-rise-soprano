import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useRouterState } from '@tanstack/react-router'

import { LocaleFlagIcon } from '@/components/LocaleFlagIcon'
import { useLocale } from '@/components/LocaleContext'
import {
  DEFAULT_LOCALE,
  dismissSuggestPermanently,
  getSuggestedLocale,
  localizePath,
  saveLocale,
  stripLocaleFromPathname,
  type NonDefaultLocale,
} from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function LanguageSuggestBanner() {
  const { locale, messages } = useLocale()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const search = useRouterState({ select: (s) => s.location.searchStr })
  const [suggested, setSuggested] = useState<NonDefaultLocale | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (locale !== DEFAULT_LOCALE) {
      setVisible(false)
      setSuggested(null)
      return
    }

    const next = getSuggestedLocale(search)
    setSuggested(next)
    setVisible(Boolean(next))
  }, [locale, search])

  if (!suggested || !visible) return null

  const accept = () => {
    saveLocale(suggested)
    const basePath = stripLocaleFromPathname(pathname)
    window.location.assign(localizePath(basePath, suggested))
  }

  const stay = () => {
    setVisible(false)
  }

  const dismissForever = () => {
    dismissSuggestPermanently()
    setVisible(false)
  }

  return (
    <div
      className={cn('locale-suggest', visible && 'locale-suggest-visible')}
      role="dialog"
      aria-labelledby="locale-suggest-title"
      aria-describedby="locale-suggest-body"
    >
      <div className="locale-suggest-bar">
        <div className="locale-suggest-inner max-w-site mx-auto px-4 lg:px-12">
          <div className="locale-suggest-main">
            <LocaleFlagIcon locale={suggested} size={40} className="locale-suggest-flag" />

            <div className="locale-suggest-copy min-w-0 flex-1">
              <p
                id="locale-suggest-title"
                className="locale-suggest-title font-display italic leading-snug"
              >
                {messages.suggest.title[suggested]}
              </p>
              <p
                id="locale-suggest-body"
                className="locale-suggest-body leading-relaxed mt-0.5 md:mt-1"
              >
                {messages.suggest.body[suggested]}
              </p>
            </div>
          </div>

          <div className="locale-suggest-actions">
            <button
              type="button"
              onClick={accept}
              className="locale-suggest-accept font-body px-4 py-2 rounded-full transition-colors whitespace-nowrap"
            >
              {messages.suggest.accept[suggested]}
            </button>
            <button
              type="button"
              onClick={stay}
              className="locale-suggest-stay font-body px-4 py-2 rounded-full border transition-colors whitespace-nowrap"
            >
              {messages.suggest.stay[suggested]}
            </button>
            <button
              type="button"
              onClick={dismissForever}
              className="locale-suggest-dismiss font-body underline-offset-2 hover:underline whitespace-nowrap"
            >
              {messages.suggest.dismiss[suggested]}
            </button>
          </div>

          <button
            type="button"
            onClick={stay}
            className="locale-suggest-close shrink-0 p-1.5 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={16} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  )
}
