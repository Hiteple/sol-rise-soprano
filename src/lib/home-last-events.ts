import type { ScheduleEvent } from '@/components/ScheduleEventGrid'
import { filterPublishedContent, publishedContentSorted } from '@/lib/content-order'

function normalizeScheduleSlug(ref: string): string {
  return ref
    .trim()
    .replace(/^\/+/, '')
    .replace(/^content\/schedule\//, '')
    .replace(/\.md$/, '')
}

/** Past schedule events for the home “Last Events” grid. */
export function homeLastEvents(
  events: readonly ScheduleEvent[],
  selectedSlugs?: string[] | null,
): ScheduleEvent[] {
  const pastPublished = filterPublishedContent(events.filter((event) => event.status === 'past'))
  const bySlug = new Map(pastPublished.map((event) => [event._meta.path, event]))

  if (selectedSlugs?.length) {
    return selectedSlugs
      .map((ref) => bySlug.get(normalizeScheduleSlug(ref)))
      .filter((event): event is ScheduleEvent => Boolean(event))
  }

  return publishedContentSorted(pastPublished)
}
