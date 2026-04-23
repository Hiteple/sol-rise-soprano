export type SiteNavLink = {
  label: string
  href: string
}

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
 * - "Label | /path"
 * - "/path" (label inferred from path)
 */
export function parseSiteNavLinks(entries: string[] | undefined, fallback: SiteNavLink[]): SiteNavLink[] {
  if (!entries || entries.length === 0) return fallback

  const links = entries
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0)
    .map((entry) => {
      const [rawLabel, rawHref] = entry.split('|').map((part) => part.trim())
      if (rawHref && rawHref.length > 0) {
        return { label: rawLabel || titleFromHref(rawHref), href: rawHref }
      }
      if (rawLabel.startsWith('/') || rawLabel.startsWith('http://') || rawLabel.startsWith('https://')) {
        return { label: titleFromHref(rawLabel), href: rawLabel }
      }
      return { label: rawLabel, href: '#' }
    })
    .filter((link) => link.label.length > 0 && link.href.length > 0)

  return links.length > 0 ? links : fallback
}
