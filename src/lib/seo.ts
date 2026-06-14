import { allRoles, allScheduleEvents } from 'content-collections'

import { isPublishedContent, publishedContentSorted } from '@/lib/content-order'

export const SITE_NAME = 'Sol Risé Soprano'
export const DEFAULT_DESCRIPTION =
  'Sol Risé Soprano — official website of Argentine soprano Sol Risé. Opera, concert and choral performances, repertoire, schedule, photography and contact for engagements.'

/** Set `VITE_SITE_URL` in Netlify (e.g. https://solrisesoprano.com). Netlify also exposes `URL` at runtime. */
export const DEFAULT_OG_IMAGE = '/images/don-giovanni/IMG_1371.jpg'

export type PageSeo = {
  title: string
  description: string
  path: string
  imagePath?: string
  type?: 'website' | 'article'
  noindex?: boolean
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
  const title = formatPageTitle(seo.title)
  const url = absoluteUrl(seo.path)
  const image = absoluteUrl(seo.imagePath ?? DEFAULT_OG_IMAGE)

  return {
    meta: [
      { title },
      { name: 'description', content: seo.description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: seo.description },
      { property: 'og:type', content: seo.type ?? 'website' },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:site_name', content: SITE_NAME },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: seo.description },
      { name: 'twitter:image', content: image },
      ...(seo.noindex ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
    ],
    links: [{ rel: 'canonical', href: url }],
  }
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

const STATIC_PATHS = ['/', '/bio', '/career', '/schedule', '/roles', '/organizations', '/gallery', '/contact'] as const

export function sitemapPaths(): string[] {
  const events = publishedContentSorted(allScheduleEvents)
  const roles = publishedContentSorted(allRoles)

  return [
    ...STATIC_PATHS,
    ...events.map((event) => `/schedule/${event._meta.path}`),
    ...roles.map((role) => `/roles/${role._meta.path}`),
  ]
}

export function buildSitemapXml(): string {
  const siteUrl = getSiteUrl()
  const lastmod = new Date().toISOString().slice(0, 10)

  const urls = sitemapPaths()
    .map(
      (path) => `  <url>
    <loc>${siteUrl}${path === '/' ? '' : path}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
