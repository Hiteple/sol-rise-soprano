import type { ScheduleEvent } from '@/components/ScheduleEventGrid'
import type { MediaFilter } from '@/sections/types'

export function sortPastScheduleEvents<T extends ScheduleEvent>(events: readonly T[]): T[] {
  return [...events].sort((a, b) => {
    const yearA = Number.parseInt(String(a.year ?? ''), 10)
    const yearB = Number.parseInt(String(b.year ?? ''), 10)
    const safeYearA = Number.isFinite(yearA) ? yearA : 0
    const safeYearB = Number.isFinite(yearB) ? yearB : 0
    if (safeYearA !== safeYearB) return safeYearB - safeYearA
    return (a.order ?? 0) - (b.order ?? 0)
  })
}

export function filterScheduleEventsByMedia(events: readonly ScheduleEvent[], filter: MediaFilter): ScheduleEvent[] {
  if (filter === 'all') return [...events]
  if (filter === 'opera') return events.filter((item) => Boolean(item.roleSlug?.trim()))
  return events.filter((item) => !item.roleSlug?.trim())
}
