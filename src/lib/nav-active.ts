import { stripLocaleFromPathname } from '@/lib/i18n/paths'

export function normalizeNavPath(path: string): string {
  const trimmed = path.trim()
  if (!trimmed || trimmed === '/') return '/'
  return stripLocaleFromPathname(trimmed.replace(/\/+$/, '') || '/')
}

/** Whether a top-level nav href matches the current route (incl. detail pages). */
export function isNavLinkActive(href: string, pathname: string): boolean {
  const target = normalizeNavPath(href)
  const current = normalizeNavPath(pathname)
  if (target === '/') return current === '/'
  return current === target || current.startsWith(`${target}/`)
}

export function isCareerSubNavActive(href: string, pathname: string): boolean {
  const target = normalizeNavPath(href)
  const current = normalizeNavPath(pathname)
  if (target === '/career') return current === '/career'
  return current === target || current.startsWith(`${target}/`)
}
