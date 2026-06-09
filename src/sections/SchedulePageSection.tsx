import { Link } from '@tanstack/react-router'

import { splitGridBadges } from '@/lib/split-grid-badges'
import { resolveColorScheme, schemeForeground, schemePageBandBackground } from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import type { SectionColorScheme } from '../../schemas/color-scheme'
import type { CSSProperties, RefObject } from 'react'

export type ScheduleEvent = {
  _meta: { path: string }
  title: string
  subtitle?: string
  composer?: string
  venue?: string
  city?: string
  image?: string
  organizationSlug?: string
  roleSlug?: string
  ticketHref?: string
  imageAlt?: string
  badges?: string[]
  cast?: { character: string; performer: string }[]
  productionCredits?: {
    conductor?: string
    production?: string
    setDesigner?: string
    costumes?: string
    lighting?: string
  }
  status: 'upcoming' | 'past'
  year?: string
}

export type SchedulePageSectionProps = {
  events: ScheduleEvent[]
  upcomingColorScheme?: SectionColorScheme
  pastColorScheme?: SectionColorScheme
  upcomingSlideIn?: boolean
  pastSlideIn?: boolean
}

type ScheduleCardScheme = {
  hoverContentTextColor: string
  hoverContentBackground: string
  eyebrowBackground: string
  eyebrowTextColor: string
}

function scheduleCardScheme(colorScheme?: SectionColorScheme): ScheduleCardScheme {
  const scheme = resolveColorScheme(colorScheme)

  const hoverContentTextColor =
    scheme === 'wine' ? 'var(--palette-pink)' : 'var(--palette-pine)'
  const hoverContentBackground =
    scheme === 'wine'
      ? 'color-mix(in srgb, var(--palette-wine) 78%, transparent)'
      : scheme === 'bright'
        ? 'color-mix(in srgb, var(--section-surface-bright) 92%, transparent)'
        : 'color-mix(in srgb, var(--page-background-color) 90%, transparent)'
  const eyebrowBackground =
    scheme === 'wine'
      ? 'color-mix(in srgb, var(--palette-pink) 90%, white 10%)'
      : 'color-mix(in srgb, var(--palette-wine) 58%, transparent)'
  const eyebrowTextColor = scheme === 'wine' ? 'var(--palette-pine)' : 'var(--media-caption-text-color)'

  return {
    hoverContentTextColor,
    hoverContentBackground,
    eyebrowBackground,
    eyebrowTextColor,
  }
}

function eventCardBadges(item: ScheduleEvent): string[] {
  const fromBadges = splitGridBadges({ badges: item.badges })
  if (fromBadges.length > 0) return fromBadges
  if (item.status === 'past' && item.year?.trim()) return [item.year.trim()]
  return []
}

function ScheduleEventCard({
  item,
  cardScheme,
}: {
  item: ScheduleEvent
  cardScheme: ScheduleCardScheme
}) {
  const badges = eventCardBadges(item)
  const hasImage = Boolean(item.image?.trim())

  const panelContent = (
    <>
      <div className="split-grid-overlay" />
      <div className="split-grid-content">
        {badges.length > 0 && (
          <div className="split-grid-badges">
            {badges.map((badge, badgeIndex) => (
              <span
                key={`${item.title}-badge-${badgeIndex}`}
                className="split-grid-link font-body text-xs uppercase tracking-[0.22em]"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
        <h3 className="font-display text-3xl italic">{item.title}</h3>
        {(item.subtitle?.trim().length ?? 0) > 0 && (
          <h4 className="font-display text-xl italic mt-2">{item.subtitle}</h4>
        )}
      </div>
    </>
  )

  const style = {
    backgroundImage: hasImage ? `url(${item.image})` : undefined,
    '--split-grid-hover-content-bg': cardScheme.hoverContentBackground,
    '--split-grid-hover-content-text': cardScheme.hoverContentTextColor,
    '--split-grid-eyebrow-bg': cardScheme.eyebrowBackground,
    '--split-grid-eyebrow-text': cardScheme.eyebrowTextColor,
  } as CSSProperties

  return (
    <Link
      to="/schedule/$slug"
      params={{ slug: item._meta.path }}
      className={`schedule-event-card${hasImage ? '' : ' schedule-event-card--placeholder'}`}
      style={style}
    >
      {panelContent}
    </Link>
  )
}

function ScheduleEventGrid({
  events,
  colorScheme,
  animate,
  inView,
  gridRef,
}: {
  events: ScheduleEvent[]
  colorScheme?: SectionColorScheme
  animate: boolean
  inView: boolean
  gridRef: RefObject<HTMLDivElement | null>
}) {
  const cardScheme = scheduleCardScheme(colorScheme)

  return (
    <div
      ref={gridRef}
      className={`max-w-site mx-auto w-full px-4 lg:px-12 ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''}`}
    >
      <div className="schedule-event-grid">
        {events.map((item) => (
          <ScheduleEventCard key={item._meta.path} item={item} cardScheme={cardScheme} />
        ))}
      </div>
    </div>
  )
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
          <div
            ref={pastRef}
            className={`max-w-site mx-auto w-full px-4 lg:px-12 ${animatePast ? `reveal ${pastInView ? 'is-visible' : ''}` : ''}`}
          >
            <h2 className="font-display text-4xl lg:text-5xl italic pb-8" style={{ color: pastFg.heading }}>
              Recent appearances
            </h2>
            <div className="schedule-event-grid">
              {past.map((item) => (
                <ScheduleEventCard
                  key={item._meta.path}
                  item={item}
                  cardScheme={scheduleCardScheme(pastColorScheme)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
