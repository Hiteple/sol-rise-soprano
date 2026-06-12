import type { ScheduleEvent } from '@/components/ScheduleEventGrid'
import type { SplitGridItem } from '@/components/SplitGrid'

export type FeaturedEventsLayout = 'splitGrid' | 'scheduleCards'

export function resolveFeaturedEventsLayout(value: string | undefined | null): FeaturedEventsLayout {
  if (value === 'scheduleCards') return 'scheduleCards'
  return 'splitGrid'
}

function scheduleSlugFromHref(href: string, index: number): string {
  const match = href.trim().match(/\/schedule\/([^/?#]+)/)
  return match?.[1] ?? `featured-${index}`
}

export function splitGridItemsToScheduleEvents(items: SplitGridItem[]): ScheduleEvent[] {
  return items.map((item, index) => ({
    _meta: { path: scheduleSlugFromHref(item.href, index) },
    title: item.title,
    subtitle: item.subtitle,
    image: item.image,
    badges: item.badges,
    status: 'upcoming' as const,
  }))
}
