import type { ScheduleEvent } from '@/components/ScheduleEventGrid'
import { filterPublishedContent, publishedContentSorted } from '@/lib/content-order'
import type { MediaItem } from '@/sections/types'

function normalizeScheduleSlug(ref: string): string {
  return ref
    .trim()
    .replace(/^\/+/, '')
    .replace(/^content\/schedule\//, '')
    .replace(/\.md$/, '')
}

export function scheduleEventToMediaItem(event: ScheduleEvent): MediaItem {
  return {
    _meta: { path: event._meta.path },
    title: event.title,
    imageUrl: `/schedule/${event._meta.path}`,
    thumbnail: event.image,
    description: event.subtitle ?? '',
    roleSlug: event.roleSlug,
  }
}

/** Past schedule events for the home “Last Events” grid. */
export function homeLastEvents(
  events: readonly ScheduleEvent[],
  selectedSlugs?: string[] | null,
): MediaItem[] {
  const pastPublished = filterPublishedContent(events.filter((event) => event.status === 'past'))
  const bySlug = new Map(pastPublished.map((event) => [event._meta.path, event]))

  if (selectedSlugs?.length) {
    return selectedSlugs
      .map((ref) => bySlug.get(normalizeScheduleSlug(ref)))
      .filter((event): event is ScheduleEvent => Boolean(event))
      .map(scheduleEventToMediaItem)
  }

  return publishedContentSorted(pastPublished).map(scheduleEventToMediaItem)
}
