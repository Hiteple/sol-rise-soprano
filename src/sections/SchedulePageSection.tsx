import { useState } from 'react'

import {
  ScheduleEventCard,
  ScheduleEventGrid,
  scheduleCardScheme,
  type ScheduleEvent,
} from '@/components/ScheduleEventGrid'
import { SlidingTabGroup } from '@/components/SlidingTabGroup'
import { TabGridEmptyState } from '@/components/TabGridEmptyState'
import { useLocale } from '@/components/LocaleContext'
import { documentSlug } from '@/lib/i18n/content'
import { filterScheduleEventsByMedia, sortPastScheduleEvents } from '@/lib/schedule-event-filter'
import { resolveColorScheme, schemeForeground, schemePageBandBackground } from '@/lib/section-color-scheme'
import { mediaFilterEmptyCopy } from '@/lib/tab-grid-empty-copy'
import type { MediaFilter } from '@/sections/types'
import type { SectionColorScheme } from '../../schemas/color-scheme'

export type { ScheduleEvent } from '@/components/ScheduleEventGrid'

export type SchedulePageSectionProps = {
  events: ScheduleEvent[]
  upcomingColorScheme?: SectionColorScheme
  pastColorScheme?: SectionColorScheme
  upcomingSlideIn?: boolean
  pastSlideIn?: boolean
}

export function SchedulePageSection({
  events,
  upcomingColorScheme,
  pastColorScheme,
}: SchedulePageSectionProps) {
  const { messages } = useLocale()
  const schedule = messages.schedule
  const [pastFilter, setPastFilter] = useState<MediaFilter>('all')

  const upcoming = events.filter((event) => event.status === 'upcoming')
  const past = sortPastScheduleEvents(events.filter((event) => event.status === 'past'))
  const filteredPast = filterScheduleEventsByMedia(past, pastFilter)

  const upcomingScheme = resolveColorScheme(upcomingColorScheme)
  const pastScheme = resolveColorScheme(pastColorScheme)
  const upcomingFg = schemeForeground(upcomingScheme)
  const pastFg = schemeForeground(pastScheme)

  return (
    <>
      {upcoming.length > 0 && (
        <section
          className="section-vertical-padding"
          data-sb-field-path="upcomingColorScheme"
          style={{ background: schemePageBandBackground(upcomingScheme) }}
        >
          <div className="max-w-site mx-auto w-full px-4 lg:px-12 pb-8">
            <h2 className="font-display text-4xl lg:text-5xl italic" style={{ color: upcomingFg.heading }}>
              {schedule.upcoming}
            </h2>
          </div>
          <ScheduleEventGrid events={upcoming} colorScheme={upcomingColorScheme} />
        </section>
      )}

      {past.length > 0 && (
        <section
          id="last-appearances"
          className="section-vertical-padding scroll-mt-24"
          data-sb-field-path="pastColorScheme"
          style={{ background: schemePageBandBackground(pastScheme) }}
        >
          <div className="max-w-site mx-auto w-full px-4 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
              <h2 className="font-display text-4xl lg:text-5xl italic" style={{ color: pastFg.heading }}>
                {schedule.lastAppearances}
              </h2>
              <SlidingTabGroup
                ariaLabel={schedule.filterAriaLabel}
                value={pastFilter}
                onChange={setPastFilter}
                options={[
                  { value: 'all', label: schedule.filterAll },
                  { value: 'opera', label: schedule.filterOpera },
                  { value: 'concert', label: schedule.filterConcert },
                ]}
              />
            </div>

            {filteredPast.length === 0 ? (
              <TabGridEmptyState
                {...mediaFilterEmptyCopy(pastFilter)}
                headingColor={pastFg.heading}
                bodyColor={pastFg.body}
              />
            ) : (
              <div className="schedule-event-grid">
                {filteredPast.map((item, index) => (
                  <ScheduleEventCard
                    key={documentSlug(item)}
                    item={item}
                    cardScheme={scheduleCardScheme(pastColorScheme)}
                    compact
                    tileIndex={index}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  )
}
