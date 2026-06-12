import { Link } from '@tanstack/react-router'

import { ScheduleEventCard, scheduleCardScheme, type ScheduleEvent } from '@/components/ScheduleEventGrid'
import { schemeForeground, schemeGoldLinkStyle, schemePageBandBackground } from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import type { HomeMediaSection } from './types'

export type MediaGridSectionProps = {
  section: HomeMediaSection
  events: ScheduleEvent[]
  linkText?: string
}

export function MediaGridSection({
  section,
  events,
  linkText = 'View all past appearances',
}: MediaGridSectionProps) {
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
        <div className="mb-14">
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

        <div className="schedule-event-grid">
          {events.map((item) => (
            <ScheduleEventCard key={item._meta.path} item={item} cardScheme={cardScheme} compact />
          ))}
        </div>

        {events.length > 0 && (
          <div className="mt-12 lg:mt-14 flex justify-center">
            <Link
              to="/schedule"
              hash="last-appearances"
              className="gold-link font-body text-xs uppercase tracking-[0.28em]"
              style={schemeGoldLinkStyle(scheme)}
              data-sb-field-path="mediaLinkText"
            >
              {linkText} →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
