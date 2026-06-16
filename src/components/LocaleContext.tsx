import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'
import { useRouterState } from '@tanstack/react-router'

import {
  DEFAULT_LOCALE,
  getUiMessages,
  localeFromPathname,
  type Locale,
  type UiMessages,
} from '@/lib/i18n'

type LocaleContextValue = {
  locale: Locale
  messages: UiMessages
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  messages: getUiMessages(DEFAULT_LOCALE),
})

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = locale === 'en' ? 'en' : locale
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      messages: getUiMessages(locale),
    }),
    [locale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  return useContext(LocaleContext)
}

/** Read locale from the current pathname when outside the locale layout. */
export function useLocaleFromPathname(): Locale {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  return localeFromPathname(pathname)
}
