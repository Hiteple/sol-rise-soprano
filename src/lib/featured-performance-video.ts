import { filterPublishedContent } from '@/lib/content-order'
import { documentSlug, getScheduleEvent } from '@/lib/i18n/content'
import type { Locale } from '@/lib/i18n/locales'

type ScheduleVideoSource = {
  _meta: { path: string }
  title: string
  subtitle?: string
  composer?: string
  videoUrl?: string
  image?: string
  year?: string
  status: 'upcoming' | 'past'
  order?: number
}

export type FeaturedPerformanceVideo = {
  scheduleSlug: string
  title: string
  subtitle?: string
  composer?: string
  year?: string
  videoUrl: string
  image?: string
}

function newestPastEventWithVideo(events: readonly ScheduleVideoSource[]): ScheduleVideoSource | undefined {
  return filterPublishedContent(
    events.filter((event) => event.status === 'past' && Boolean(event.videoUrl?.trim())),
  ).sort((a, b) => {
    const yearDiff = Number(b.year ?? 0) - Number(a.year ?? 0)
    if (yearDiff !== 0) return yearDiff
    return (a.order ?? 0) - (b.order ?? 0)
  })[0]
}

function toFeaturedVideo(event: ScheduleVideoSource): FeaturedPerformanceVideo {
  return {
    scheduleSlug: documentSlug(event),
    title: event.title,
    subtitle: event.subtitle,
    composer: event.composer,
    year: event.year,
    videoUrl: event.videoUrl!.trim(),
    image: event.image,
  }
}

/** Home featured clip — explicit schedule slug, or newest published past event with `videoUrl`. */
export function resolveFeaturedPerformanceVideo(
  scheduleSlug: string | undefined,
  events: readonly ScheduleVideoSource[],
  locale: Locale,
): FeaturedPerformanceVideo | null {
  const slug = scheduleSlug?.trim()
  const event = slug
    ? getScheduleEvent(slug, locale)
    : newestPastEventWithVideo(events)

  if (!event?.videoUrl?.trim()) return null
  return toFeaturedVideo(event)
}
