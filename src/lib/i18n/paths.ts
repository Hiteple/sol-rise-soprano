import { DEFAULT_LOCALE, isLocale, type Locale } from './locales'

const LOCALE_PREFIX_RE = /^\/(es|de|it)(\/|$)/

/** Strip a leading /es, /de or /it prefix from a pathname. */
export function stripLocaleFromPathname(pathname: string): string {
  const stripped = pathname.replace(LOCALE_PREFIX_RE, '/')
  return stripped === '' ? '/' : stripped
}

/** Read locale from a URL pathname (e.g. /es/bio → es). */
export function localeFromPathname(pathname: string): Locale {
  const match = pathname.match(/^\/(es|de|it)(\/|$)/)
  if (match?.[1] && isLocale(match[1])) return match[1]
  return DEFAULT_LOCALE
}

/**
 * Build a localized href. English keeps unprefixed paths (/bio).
 * @param path — site path without locale (/bio, /schedule/foo)
 */
export function localizePath(path: string, locale: Locale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (locale === DEFAULT_LOCALE) return normalized === '' ? '/' : normalized
  if (normalized === '/') return `/${locale}`
  return `/${locale}${normalized}`
}

/** Localize nav links from content (which store English paths). */
export function localizeNavHref(href: string, locale: Locale): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href
  return localizePath(href, locale)
}

export function pathnameMatchesNavHref(href: string, pathname: string, locale: Locale): boolean {
  const localizedHref = localizeNavHref(href, locale)
  const target = localizedHref.replace(/\/+$/, '') || '/'
  const current = pathname.replace(/\/+$/, '') || '/'
  if (target === '/' || target === `/${locale}`) {
    return current === '/' || current === `/${locale}`
  }
  return current === target || current.startsWith(`${target}/`)
}

/** TanStack Router params for the optional `/{-$locale}` segment (omit for English). */
export function localeRouteParams(locale: Locale): { locale?: Locale } {
  return locale === DEFAULT_LOCALE ? {} : { locale }
}

export { parseLocaleParam, isLocale } from './locales'
