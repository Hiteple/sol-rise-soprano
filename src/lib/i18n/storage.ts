import type { Locale } from './locales'
import { DEFAULT_LOCALE, isLocale } from './locales'

/** Explicit user choice (banner accept or language selector) — not set when merely browsing a locale URL. */
const LOCALE_PREFERENCE_KEY = 'solrise-locale-preference'
const SUGGEST_DISMISSED_KEY = 'solrise-locale-suggest-dismissed'

export function getSavedLocale(): Locale | null {
  if (typeof window === 'undefined') return null
  const value = window.localStorage.getItem(LOCALE_PREFERENCE_KEY)
  return value && isLocale(value) ? value : null
}

export function saveLocale(locale: Locale): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(LOCALE_PREFERENCE_KEY, locale)
}

export function isSuggestDismissed(): boolean {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(SUGGEST_DISMISSED_KEY) === '1'
}

export function dismissSuggestPermanently(): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(SUGGEST_DISMISSED_KEY, '1')
}

export function clearSuggestDismissed(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(SUGGEST_DISMISSED_KEY)
}

/**
 * Language-suggestion banner persistence (`solrise-locale-preference`, `solrise-locale-suggest-dismissed`).
 *
 * ## Testing the bottom bar locally (no VPN)
 *
 * 1. Open the English site (`/` or any unprefixed path).
 * 2. Append a dev override: `?suggestLocale=de`, `?suggestLocale=es`, or `?suggestLocale=it`.
 *    Example: `http://localhost:3000/?suggestLocale=de`
 * 3. If the bar does not appear, clear the dismiss flag in DevTools → Application → Local Storage
 *    → remove `solrise-locale-suggest-dismissed`, or run:
 *    `localStorage.removeItem('solrise-locale-suggest-dismissed')`
 * 4. The bar only shows on the default English locale, not on `/de`, `/es`, or `/it`.
 */
export function suggestLocaleFromSearch(search: string): Locale | null {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(search)
  const override = params.get('suggestLocale')
  if (override && isLocale(override) && override !== DEFAULT_LOCALE) return override
  return null
}
