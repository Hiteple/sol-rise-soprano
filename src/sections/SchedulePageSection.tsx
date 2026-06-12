import {
  ScheduleEventCard,
  ScheduleEventGrid,
  scheduleCardScheme,
  type ScheduleEvent,
} from '@/components/ScheduleEventGrid'
import { resolveColorScheme, schemeForeground, schemePageBandBackground } from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
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
  upcomingSlideIn,
  pastSlideIn,
}: SchedulePageSectionProps) {
  const upcoming = events.filter((event) => event.status === 'upcoming')
  const past = events
    .filter((event) => event.status === 'past')
    .sort((a, b) => Number(b.year ?? 0) - Number(a.year ?? 0))

  const upcomingScheme = resolveColorScheme(upcomingColorScheme)
  const pastScheme = resolveColorScheme(pastColorScheme)
  const upcomingFg = schemeForeground(upcomingScheme)
  const pastFg = schemeForeground(pastScheme)

  const animateUpcoming = upcomingSlideIn !== false
  const animatePast = pastSlideIn !== false
  const { ref: upcomingRef, inView: upcomingInView } = useInView<HTMLDivElement>()
  const { ref: pastRef, inView: pastInView } = useInView<HTMLDivElement>()

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
              Upcoming
            </h2>
          </div>
          <ScheduleEventGrid
            events={upcoming}
            colorScheme={upcomingColorScheme}
            animate={animateUpcoming}
            inView={upcomingInView}
            gridRef={upcomingRef}
          />
        </section>
      )}

      {past.length > 0 && (
        <section
          className="section-vertical-padding"
          data-sb-field-path="pastColorScheme"
          style={{ background: schemePageBandBackground(pastScheme) }}
        >
          <div className="max-w-site mx-auto w-full px-4 lg:px-12">
            {/* Observe the heading only — the full grid is too tall for IO threshold on mobile */}
            <div ref={pastRef}>
              <h2 className="font-display text-4xl lg:text-5xl italic pb-8" style={{ color: pastFg.heading }}>
                Last Appearances
              </h2>
            </div>
            <div
              className={`schedule-event-grid${animatePast ? ` reveal${pastInView ? ' is-visible' : ''}` : ''}`}
            >
              {past.map((item) => (
                <ScheduleEventCard
                  key={item._meta.path}
                  item={item}
                  cardScheme={scheduleCardScheme(pastColorScheme)}
                  compact
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
