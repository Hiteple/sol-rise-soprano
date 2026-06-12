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

export function isCareerPath(pathname: string): boolean {
  return careerPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

export function isCareerNavHref(href: string): boolean {
  const normalized = href.replace(/\/+$/, '') || '/'
  return normalized === '/career'
}
