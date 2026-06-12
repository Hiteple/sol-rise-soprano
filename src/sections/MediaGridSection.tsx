import { ScheduleEventCard, scheduleCardScheme, type ScheduleEvent } from '@/components/ScheduleEventGrid'
import { SlidingTabGroup } from '@/components/SlidingTabGroup'
import { TabGridEmptyState } from '@/components/TabGridEmptyState'
import { schemeForeground, schemePageBandBackground } from '@/lib/section-color-scheme'
import { mediaFilterEmptyCopy } from '@/lib/tab-grid-empty-copy'
import { useInView } from '@/lib/use-in-view'
import type { HomeMediaSection, MediaFilter } from './types'

export type MediaGridSectionProps = {
  section: HomeMediaSection
  events: ScheduleEvent[]
  filter: MediaFilter
  onFilterChange: (filter: MediaFilter) => void
}

function filterLastEvents(items: ScheduleEvent[], filter: MediaFilter): ScheduleEvent[] {
  if (filter === 'all') return items
  if (filter === 'opera') return items.filter((item) => Boolean(item.roleSlug?.trim()))
  return items.filter((item) => !item.roleSlug?.trim())
}

export function MediaGridSection({
  section,
  events,
  filter,
  onFilterChange,
}: MediaGridSectionProps) {
  const filtered = filterLastEvents(events, filter)

  const scheme = section.colorScheme
  const fg = schemeForeground(scheme)
  const cardScheme = scheduleCardScheme(scheme)
  const animate = section.slideIn !== false
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section
      className="section-vertical-padding"
      style={{ background: schemePageBandBackground(scheme) }}
      data-sb-field-path="mediaGridColorScheme"
    >
      <div
        ref={ref}
        className={`max-w-site mx-auto px-4 lg:px-12 ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''}`}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <p
              className="text-xs uppercase tracking-[0.3em] font-body font-semibold mb-4"
              style={{ color: fg.eyebrow }}
              data-sb-field-path="mediaEyebrow"
            >
              {section.eyebrow}
            </p>
            <h2
              className="font-display text-4xl lg:text-5xl italic"
              style={{ color: fg.heading }}
              data-sb-field-path="mediaTitle"
            >
              {section.title}
            </h2>
          </div>

          <SlidingTabGroup
            ariaLabel="Filter last events"
            value={filter}
            onChange={onFilterChange}
            options={[
              { value: 'all', label: 'All' },
              { value: 'opera', label: 'Opera' },
              { value: 'concert', label: 'Concerts' },
            ]}
          />
        </div>

        {filtered.length === 0 ? (
          <TabGridEmptyState
            {...mediaFilterEmptyCopy(filter)}
            headingColor={fg.heading}
            bodyColor={fg.body}
          />
        ) : (
          <div className="schedule-event-grid">
            {filtered.map((item) => (
              <ScheduleEventCard
                key={item._meta.path}
                item={item}
                cardScheme={cardScheme}
                compact
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
