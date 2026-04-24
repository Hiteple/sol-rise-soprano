export type SiteNavLink = {
  label: string
  href: string
}

export type SiteNavLinkInput = SiteNavLink | string

function titleFromHref(href: string): string {
  if (href === '/') return 'Home'
  const cleaned = href.replace(/^\/+/, '').split('/')[0] ?? ''
  if (!cleaned) return 'Link'
  return cleaned
    .split('-')
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase() + part.slice(1))
    .join(' ')
}

/**
 * Supports:
 * - { label, href } object entries
 * - "Label | /path" legacy entries
 * - "/path" legacy entries (label inferred from path)
 */
export function parseSiteNavLinks(entries: SiteNavLinkInput[] | undefined, fallback: SiteNavLink[]): SiteNavLink[] {
  if (!entries || entries.length === 0) return fallback

  const links = entries
    .map((entry) => {
      if (typeof entry === 'string') return entry.trim()
      const label = entry.label?.trim() ?? ''
      const href = entry.href?.trim() ?? ''
      if (!label && !href) return ''
      return { label, href }
    })
    .filter((entry) => (typeof entry === 'string' ? entry.length > 0 : entry.label.length > 0 || entry.href.length > 0))
    .map((entry) => {
      if (typeof entry !== 'string') {
        if (entry.href.length > 0) return { label: entry.label || titleFromHref(entry.href), href: entry.href }
        if (entry.label.length > 0) return { label: entry.label, href: '#' }
        return null
      }
      const [rawLabel, rawHref] = entry.split('|').map((part) => part.trim())
      if (rawHref && rawHref.length > 0) {
        return { label: rawLabel || titleFromHref(rawHref), href: rawHref }
      }
      if (rawLabel.startsWith('/') || rawLabel.startsWith('http://') || rawLabel.startsWith('https://')) {
        return { label: titleFromHref(rawLabel), href: rawLabel }
      }
      return { label: rawLabel, href: '#' }
    })
    .filter((link): link is SiteNavLink => Boolean(link))
    .filter((link) => link.label.length > 0 && link.href.length > 0)

  return links.length > 0 ? links : fallback
}
