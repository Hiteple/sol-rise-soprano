import { roleLatestYear, type RoleAppearance } from '@/lib/role-stats'

export type GallerySortItem = {
  order?: number
  roleSlug?: string
  gallerySlug?: string
  title?: string
}

type ScheduleYearSource = {
  year?: string
  gallerySlug?: string
}

type RoleYearSource = {
  _meta: { path: string }
  appearances: RoleAppearance[]
}

function parseYear(year?: string): number | null {
  if (!year?.trim()) return null
  const parsed = Number.parseInt(year, 10)
  return Number.isFinite(parsed) ? parsed : null
}

function yearFromTitle(title?: string): number | null {
  if (!title) return null
  const match = title.match(/\b(20\d{2})\b/)
  return match ? parseYear(match[1]) : null
}

function buildGallerySlugYears(scheduleEvents: ScheduleYearSource[]): Map<string, number> {
  const years = new Map<string, number>()
  for (const event of scheduleEvents) {
    const year = parseYear(event.year)
    const slug = event.gallerySlug?.trim()
    if (year !== null && slug) years.set(slug, year)
  }
  return years
}

function buildRoleSlugYears(roles: RoleYearSource[]): Map<string, number> {
  const years = new Map<string, number>()
  for (const role of roles) {
    const year = roleLatestYear(role.appearances)
    if (year !== null) years.set(role._meta.path, year)
  }
  return years
}

export function galleryItemYear(
  item: GallerySortItem,
  gallerySlugYears: Map<string, number>,
  roleSlugYears: Map<string, number>,
): number | null {
  const gallerySlug = item.gallerySlug?.trim()
  if (gallerySlug && gallerySlugYears.has(gallerySlug)) {
    return gallerySlugYears.get(gallerySlug) ?? null
  }

  const roleSlug = item.roleSlug?.trim()
  if (roleSlug && roleSlugYears.has(roleSlug)) {
    return roleSlugYears.get(roleSlug) ?? null
  }

  return yearFromTitle(item.title)
}

function galleryItemGroupKey(item: GallerySortItem): string {
  return item.gallerySlug?.trim() || item.roleSlug?.trim() || item.title?.trim() || ''
}

/** Newest performances first; photos from the same event stay grouped and follow `order`. */
export function sortGalleryChronologically<T extends GallerySortItem>(
  items: readonly T[],
  scheduleEvents: ScheduleYearSource[],
  roles: RoleYearSource[],
): T[] {
  const gallerySlugYears = buildGallerySlugYears(scheduleEvents)
  const roleSlugYears = buildRoleSlugYears(roles)

  return [...items].sort((a, b) => {
    const yearA = galleryItemYear(a, gallerySlugYears, roleSlugYears)
    const yearB = galleryItemYear(b, gallerySlugYears, roleSlugYears)

    if (yearA !== null && yearB !== null && yearA !== yearB) return yearB - yearA
    if (yearA !== null && yearB === null) return -1
    if (yearA === null && yearB !== null) return 1

    const groupA = galleryItemGroupKey(a)
    const groupB = galleryItemGroupKey(b)
    if (groupA !== groupB) return groupA.localeCompare(groupB)

    return (a.order ?? 0) - (b.order ?? 0)
  })
}
