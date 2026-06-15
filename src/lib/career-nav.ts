import { getUiMessages } from '@/lib/i18n/messages'
import type { Locale } from '@/lib/i18n/locales'
import { stripLocaleFromPathname } from '@/lib/i18n/paths'

export type CareerNavItem = {
  label: string
  description: string
  href: string
}

export const careerNavItems: CareerNavItem[] = [
  {
    label: 'Overview',
    description: 'Timeline and career milestones',
    href: '/career',
  },
  {
    label: 'Performances',
    description: 'Operatic roles and repertoire',
    href: '/roles',
  },
  {
    label: 'Organizations',
    description: 'Opera houses and companies',
    href: '/organizations',
  },
]

const careerPrefixes = ['/career', '/roles', '/organizations']

export function getCareerNavItems(locale: Locale): CareerNavItem[] {
  const items = getUiMessages(locale).careerNav
  return [
    { label: items.overview, description: items.overviewDesc, href: '/career' },
    { label: items.performances, description: items.performancesDesc, href: '/roles' },
    { label: items.organizations, description: items.organizationsDesc, href: '/organizations' },
  ]
}

export function isCareerPath(pathname: string): boolean {
  const current = stripLocaleFromPathname(pathname)
  return careerPrefixes.some(
    (prefix) => current === prefix || current.startsWith(`${prefix}/`),
  )
}

export function isCareerNavHref(href: string): boolean {
  const normalized = href.replace(/\/+$/, '') || '/'
  return normalized === '/career'
}
