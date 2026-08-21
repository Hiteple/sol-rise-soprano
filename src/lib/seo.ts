import { allRoles, allScheduleEvents } from 'content-collections'

import { documentSlug } from '@/lib/i18n/content'

import { isPublishedContent } from '@/lib/content-order'
import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/lib/i18n/locales'
import { localizePath, parseLocaleParam } from '@/lib/i18n/paths'

export const SITE_NAME = 'Sol Risé Soprano'
export const DEFAULT_DESCRIPTION =
  'Sol Risé Soprano — official website of Argentine soprano Sol Risé. Opera, concert and choral performances, repertoire, schedule, photography and contact for engagements.'

/** Set `VITE_SITE_URL` in Netlify (e.g. https://solrisesoprano.com). Netlify also exposes `URL` at runtime. */
export const DEFAULT_OG_IMAGE = '/images/don-giovanni/IMG_1371.jpg'

export type PageSeo = {
  title: string
  description: string
  /** Site path without locale prefix (e.g. `/bio`, `/schedule/foo`). */
  path: string
  imagePath?: string
  type?: 'website' | 'article'
  noindex?: boolean
  /** Active locale from the `/{-$locale}` route segment. */
  locale?: Locale
  /** When false, only canonical is emitted (English-only detail pages). Default true. */
  alternateLocales?: boolean
}

/** Read locale from TanStack Router `params` on localized routes. */
export function seoLocaleFromParams(params: { locale?: string }): Locale {
  return parseLocaleParam(params.locale)
}

function hreflangLinkTags(basePath: string) {
  const tags = LOCALES.map((locale) => ({
    rel: 'alternate' as const,
    hrefLang: locale,
    href: absoluteUrl(localizePath(basePath, locale)),
  }))
  tags.push({
    rel: 'alternate',
    hrefLang: 'x-default',
    href: absoluteUrl(localizePath(basePath, DEFAULT_LOCALE)),
  })
  return tags
}

export function getSiteUrl(): string {
  const fromProcess =
    typeof process !== 'undefined'
      ? process.env.URL?.trim() || process.env.VITE_SITE_URL?.trim()
      : ''
  const fromImport = import.meta.env.VITE_SITE_URL?.trim() ?? ''
  return (fromProcess || fromImport || 'https://solrisesoprano.com').replace(/\/$/, '')
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${getSiteUrl()}${normalized}`
}

export function formatPageTitle(title: string): string {
  if (/sol\s*risé(\s+soprano)?/i.test(title)) return title
  return `${title} — ${SITE_NAME}`
}

export function pageHead(seo: PageSeo) {
  const locale = seo.locale ?? DEFAULT_LOCALE
  const localizedPath = localizePath(seo.path, locale)
  const title = formatPageTitle(seo.title)
  const url = absoluteUrl(localizedPath)
  const image = absoluteUrl(seo.imagePath ?? DEFAULT_OG_IMAGE)
  const emitAlternates = (seo.alternateLocales ?? true) && !seo.noindex

  return {
    meta: [
      { title },
      { name: 'description', content: seo.description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: seo.description },
      { property: 'og:type', content: seo.type ?? 'website' },
      { property: 'og:url', content: url },
      { property: 'og:locale', content: ogLocaleTag(locale) },
      ...(emitAlternates
        ? LOCALES.filter((loc) => loc !== locale).map((loc) => ({
            property: 'og:locale:alternate',
            content: ogLocaleTag(loc),
          }))
        : []),
      { property: 'og:image', content: image },
      { property: 'og:site_name', content: SITE_NAME },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: seo.description },
      { name: 'twitter:image', content: image },
      ...(seo.noindex ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
    ],
    links: [
      { rel: 'canonical', href: url },
      ...(emitAlternates ? hreflangLinkTags(seo.path) : []),
    ],
  }
}

/** Open Graph locale tags (e.g. `es_AR`, `de_DE`). */
function ogLocaleTag(locale: Locale): string {
  const map: Record<Locale, string> = {
    en: 'en_US',
    es: 'es_AR',
    de: 'de_DE',
    it: 'it_IT',
  }
  return map[locale]
}

export function googleSiteVerificationMeta(): { name: string; content: string }[] {
  const token = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION?.trim()
  return token ? [{ name: 'google-site-verification', content: token }] : []
}

export function jsonLdScript(data: Record<string, unknown>) {
  return {
    type: 'application/ld+json',
    children: JSON.stringify(data),
  }
}

export function personJsonLd() {
  return jsonLdScript({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_NAME,
    alternateName: ['Sol Risé', 'Sol Rise Soprano', 'solrisesoprano'],
    jobTitle: 'Opera Singer',
    description: DEFAULT_DESCRIPTION,
    url: getSiteUrl(),
    sameAs: [
      'https://instagram.com/solrisesoprano/',
      'https://www.youtube.com/channel/UCgm68FC8sM_2r3cAXBQdbvw',
      'https://facebook.com/solrisesoprano',
      'https://www.muvac.com/es/profile/florencia-sol-rise-lopez',
    ],
  })
}

export function musicEventJsonLd(event: {
  title: string
  subtitle?: string
  plot?: string
  composer?: string
  venue?: string
  city?: string
  status: 'upcoming' | 'past'
  year?: string
  path: string
  image?: string
}) {
  const description = event.plot?.trim() || event.subtitle?.trim() || `${event.title} — ${SITE_NAME}`
  const locationName = [event.venue, event.city].filter(Boolean).join(', ')

  return jsonLdScript({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description,
    eventStatus:
      event.status === 'upcoming'
        ? 'https://schema.org/EventScheduled'
        : 'https://schema.org/EventCompleted',
    ...(event.year ? { startDate: event.year } : {}),
    ...(locationName
      ? {
          location: {
            '@type': 'Place',
            name: locationName,
          },
        }
      : {}),
    performer: {
      '@type': 'Person',
      name: SITE_NAME,
    },
    ...(event.composer
      ? {
          organizer: {
            '@type': 'Organization',
            name: event.composer,
          },
        }
      : {}),
    image: event.image?.trim() ? absoluteUrl(event.image) : absoluteUrl(DEFAULT_OG_IMAGE),
    url: absoluteUrl(event.path),
  })
}

export function performanceRoleJsonLd(role: {
  characterName: string
  operaTitle: string
  composer: string
  summary: string
  path: string
  heroImage?: string
}) {
  return jsonLdScript({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${role.characterName} — ${role.operaTitle}`,
    description: role.summary,
    creator: {
      '@type': 'Person',
      name: SITE_NAME,
    },
    about: role.operaTitle,
    author: {
      '@type': 'Person',
      name: role.composer,
    },
    image: role.heroImage?.trim() ? absoluteUrl(role.heroImage) : absoluteUrl(DEFAULT_OG_IMAGE),
    url: absoluteUrl(role.path),
  })
}

const STATIC_BASE_PATHS = ['/', '/bio', '/career', '/schedule', '/roles', '/organizations', '/gallery', '/videos', '/press-kit', '/contact'] as const

export type SitemapEntry = {
  localizedPath: string
  basePath: string
  alternateLocales: boolean
}

export function sitemapEntries(): SitemapEntry[] {
  const eventSlugs = [...new Set(allScheduleEvents.map(documentSlug))]
  const roleSlugs = [...new Set(allRoles.map(documentSlug))]

  const staticEntries: SitemapEntry[] = STATIC_BASE_PATHS.flatMap((basePath) =>
    LOCALES.map((locale) => ({
      localizedPath: localizePath(basePath, locale),
      basePath,
      alternateLocales: true,
    })),
  )

  const detailEntries: SitemapEntry[] = [
    ...eventSlugs.map((slug) => {
      const basePath = `/schedule/${slug}`
      return { localizedPath: basePath, basePath, alternateLocales: false }
    }),
    ...roleSlugs.map((slug) => {
      const basePath = `/roles/${slug}`
      return { localizedPath: basePath, basePath, alternateLocales: false }
    }),
  ]

  return [...staticEntries, ...detailEntries]
}

/** @deprecated Use sitemapEntries() for hreflang-aware sitemaps. */
export function sitemapPaths(): string[] {
  return sitemapEntries().map((entry) => entry.localizedPath)
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function sitemapAlternateLinks(basePath: string): string {
  const links = LOCALES.map(
    (locale) =>
      `    <xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(absoluteUrl(localizePath(basePath, locale)))}" />`,
  )
  links.push(
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(absoluteUrl(localizePath(basePath, DEFAULT_LOCALE)))}" />`,
  )
  return links.join('\n')
}

export function buildSitemapXml(): string {
  const lastmod = new Date().toISOString().slice(0, 10)

  const urls = sitemapEntries()
    .map((entry) => {
      const loc = escapeXml(absoluteUrl(entry.localizedPath))
      const alternates = entry.alternateLocales ? `\n${sitemapAlternateLinks(entry.basePath)}\n` : ''
      return `  <url>
    <loc>${loc}</loc>${alternates}    <lastmod>${lastmod}</lastmod>
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`
}

export function buildRobotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: ${getSiteUrl()}/sitemap.xml
`
}

/** Draft schedule/role slugs are excluded via publishedContentSorted / isPublishedContent. */
export { isPublishedContent }
