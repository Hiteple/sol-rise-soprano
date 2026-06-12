const MONTHS: Record<string, number> = {
  january: 0,
  jan: 0,
  february: 1,
  feb: 1,
  march: 2,
  mar: 2,
  april: 3,
  apr: 3,
  may: 4,
  june: 5,
  jun: 5,
  july: 6,
  jul: 6,
  august: 7,
  aug: 7,
  september: 8,
  sep: 8,
  sept: 8,
  october: 9,
  oct: 9,
  november: 10,
  nov: 10,
  december: 11,
  dec: 11,
}

function parseMonth(name: string): number | null {
  const index = MONTHS[name.toLowerCase()]
  return index === undefined ? null : index
}

/** e.g. `madama-butterfly-2026` → `2026` */
export function eventYearFromSlug(slug: string): number | undefined {
  const match = slug.trim().match(/(?:^|-)(\d{4})$/)
  if (!match) return undefined
  const year = Number.parseInt(match[1], 10)
  return Number.isFinite(year) ? year : undefined
}

export function eventYearFromHref(href: string): number | undefined {
  const slug = href.trim().match(/\/schedule\/([^/?#]+)/)?.[1]
  return slug ? eventYearFromSlug(slug) : undefined
}

export function eventYearFromEventRef(eventRef?: string): number | undefined {
  if (!eventRef?.trim()) return undefined
  const trimmed = eventRef.trim()
  if (trimmed.startsWith('/')) return eventYearFromHref(trimmed)
  return eventYearFromSlug(trimmed)
}

/**
 * Parses schedule badge labels like `June 12th` or `June 12, 2026`.
 * Year defaults to `eventYear`, then the reference date’s calendar year.
 */
export function parseScheduleBadgeDate(
  badge: string,
  referenceDate: Date = new Date(),
  eventYear?: number,
): Date | null {
  const trimmed = badge.trim()
  const match = trimmed.match(/^([A-Za-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?(?:\s*,?\s*(\d{4}))?$/i)
  if (!match) return null

  const month = parseMonth(match[1])
  const day = Number.parseInt(match[2], 10)
  const year = match[3]
    ? Number.parseInt(match[3], 10)
    : (eventYear ?? referenceDate.getFullYear())

  if (month === null || !Number.isFinite(day) || day < 1 || day > 31) return null
  if (match[3] && !Number.isFinite(year)) return null

  const date = new Date(year, month, day)
  if (date.getMonth() !== month || date.getDate() !== day) return null
  return date
}

function isSameCalendarDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function startOfCalendarDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function parseYearOnlyBadge(badge: string): number | null {
  const trimmed = badge.trim()
  if (!/^\d{4}$/.test(trimmed)) return null
  const year = Number.parseInt(trimmed, 10)
  return Number.isFinite(year) ? year : null
}

export function isScheduleBadgeToday(
  badge: string,
  now: Date = new Date(),
  eventYear?: number,
): boolean {
  const parsed = parseScheduleBadgeDate(badge, now, eventYear)
  if (!parsed) return false
  return isSameCalendarDay(parsed, now)
}

export function scheduleBadgeLabel(
  badge: string,
  now: Date = new Date(),
  eventYear?: number,
): string {
  return isScheduleBadgeToday(badge, now, eventYear) ? 'TODAY' : badge
}

/** True when the badge date is strictly before today (visitor-local calendar). */
export function isScheduleBadgePast(
  badge: string,
  now: Date = new Date(),
  eventYear?: number,
): boolean {
  const parsed = parseScheduleBadgeDate(badge, now, eventYear)
  if (parsed) {
    return parsed < startOfCalendarDay(now)
  }

  const yearOnly = parseYearOnlyBadge(badge)
  if (yearOnly !== null) {
    return yearOnly < now.getFullYear()
  }

  return false
}
