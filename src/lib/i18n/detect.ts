import { DEFAULT_LOCALE, localeFromBrowserLanguage, type NonDefaultLocale } from './locales'
import { getSavedLocale, isSuggestDismissed, suggestLocaleFromSearch } from './storage'

/** Suggested locale for the welcome banner (null = do not show). */
export function getSuggestedLocale(search: string): NonDefaultLocale | null {
  if (isSuggestDismissed()) return null

  const saved = getSavedLocale()
  if (saved && saved !== DEFAULT_LOCALE) return null

  const override = suggestLocaleFromSearch(search)
  if (override && override !== DEFAULT_LOCALE) return override

  if (typeof navigator === 'undefined') return null
  return localeFromBrowserLanguage(navigator.language)
}
