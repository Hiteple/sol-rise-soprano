import type { ScheduleEvent } from '@/components/ScheduleEventGrid'
import { filterPublishedContent } from '@/lib/content-order'
import { sortPastScheduleEvents } from '@/lib/schedule-event-filter'

export const HOME_LAST_EVENTS_LIMIT = 8

/** Eight most recent past schedule events for the home “Last Events” grid. */
export function homeLastEvents(events: readonly ScheduleEvent[]): ScheduleEvent[] {
  const pastPublished = filterPublishedContent(events.filter((event) => event.status === 'past'))
  return sortPastScheduleEvents(pastPublished).slice(0, HOME_LAST_EVENTS_LIMIT)
}
