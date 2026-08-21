import { getUiMessages } from '@/lib/i18n/messages'
import type { Locale } from '@/lib/i18n/locales'
import { stripLocaleFromPathname } from '@/lib/i18n/paths'

export type MediaNavItem = {
  label: string
  description: string
  href: string
}

const mediaPrefixes = ['/gallery', '/videos']

export function getMediaNavItems(locale: Locale): MediaNavItem[] {
  const items = getUiMessages(locale).mediaNav
  return [
    { label: items.gallery, description: items.galleryDesc, href: '/gallery' },
    { label: items.videos, description: items.videosDesc, href: '/videos' },
  ]
}

export function isMediaPath(pathname: string): boolean {
  const current = stripLocaleFromPathname(pathname)
  return mediaPrefixes.some(
    (prefix) => current === prefix || current.startsWith(`${prefix}/`),
  )
}

/** Top-level nav entry for the Media dropdown (replaces the former Gallery link). */
export function isMediaNavHref(href: string): boolean {
  const normalized = href.replace(/\/+$/, '') || '/'
  return normalized === '/gallery' || normalized === '/media'
}
