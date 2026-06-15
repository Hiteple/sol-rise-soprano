export const DEFAULT_LOCALE = 'en' as const

export const LOCALES = ['en', 'es', 'de', 'it'] as const

export type Locale = (typeof LOCALES)[number]

export type NonDefaultLocale = Exclude<Locale, typeof DEFAULT_LOCALE>

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  it: 'Italiano',
}

export const LOCALE_SHORT: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
  de: 'DE',
  it: 'IT',
}

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.includes(value as Locale)
}

export function parseLocaleParam(value: string | undefined): Locale {
  if (value && isLocale(value) && value !== DEFAULT_LOCALE) return value
  return DEFAULT_LOCALE
}

const BROWSER_LOCALE_MAP: Record<string, NonDefaultLocale> = {
  es: 'es',
  de: 'de',
  it: 'it',
}

/** Map navigator.language (e.g. es-AR, de-DE) to a supported non-English locale. */
export function localeFromBrowserLanguage(language: string | undefined): NonDefaultLocale | null {
  if (!language) return null
  const base = language.trim().toLowerCase().split('-')[0] ?? ''
  return BROWSER_LOCALE_MAP[base] ?? null
}
