export type RoleAppearance = {
  year: string
  venue: string
  organizationSlug?: string
  city?: string
  notes?: string
}

export function roleLatestYear(appearances: RoleAppearance[]): number | null {
  const years = appearances
    .map((item) => Number.parseInt(item.year, 10))
    .filter((year) => Number.isFinite(year))
  return years.length > 0 ? Math.max(...years) : null
}

export function roleStats(appearances: RoleAppearance[]) {
  const years = appearances
    .map((item) => Number.parseInt(item.year, 10))
    .filter((year) => Number.isFinite(year))
  const venues = new Set(appearances.map((item) => item.venue.trim()).filter(Boolean))
  const organizations = new Set(
    appearances.map((item) => item.organizationSlug?.trim()).filter(Boolean) as string[],
  )

  const minYear = years.length > 0 ? Math.min(...years) : null
  const maxYear = years.length > 0 ? Math.max(...years) : null

  return {
    performanceCount: appearances.length,
    venueCount: venues.size,
    organizationCount: organizations.size,
    yearRange:
      minYear !== null && maxYear !== null
        ? minYear === maxYear
          ? String(minYear)
          : `${minYear} – ${maxYear}`
        : null,
  }
}
