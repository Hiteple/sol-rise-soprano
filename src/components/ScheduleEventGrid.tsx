import { Link } from '@tanstack/react-router'

import { SplitGridBadges } from '@/components/SplitGridBadges'
import { splitGridBadges } from '@/lib/split-grid-badges'
import { resolveColorScheme } from '@/lib/section-color-scheme'
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
  externalUrl?: string
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

export type ScheduleCardScheme = {
  hoverContentTextColor: string
  hoverContentBackground: string
  eyebrowBackground: string
  eyebrowTextColor: string
}

export function scheduleCardScheme(colorScheme?: SectionColorScheme): ScheduleCardScheme {
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

export function ScheduleEventCard({
  item,
  cardScheme,
  compact = false,
}: {
  item: ScheduleEvent
  cardScheme: ScheduleCardScheme
  /** Smaller title/subtitle for past event grids */
  compact?: boolean
}) {
  const badges = eventCardBadges(item)
  const hasImage = Boolean(item.image?.trim())

  const panelContent = (
    <>
      <div className="split-grid-overlay" />
      <div className="split-grid-content">
        <SplitGridBadges badges={badges} eventRef={item._meta.path} />
        <h3
          className={`font-display italic leading-tight ${
            compact ? 'text-base md:text-2xl line-clamp-3 md:line-clamp-none' : 'text-3xl'
          }`}
        >
          {item.title}
        </h3>
        {(item.subtitle?.trim().length ?? 0) > 0 && (
          <h4
            className={`font-display italic leading-snug mt-1 md:mt-2 ${
              compact ? 'text-xs md:text-lg line-clamp-2 md:line-clamp-none' : 'text-xl'
            }`}
          >
            {item.subtitle}
          </h4>
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
      className={`schedule-event-card${compact ? ' schedule-event-card--compact' : ''}${hasImage ? '' : ' schedule-event-card--placeholder'}`}
      style={style}
    >
      {panelContent}
    </Link>
  )
}

export type ScheduleEventGridProps = {
  events: ScheduleEvent[]
  colorScheme?: SectionColorScheme
  animate?: boolean
  inView?: boolean
  gridRef?: RefObject<HTMLDivElement | null>
  className?: string
}

export function ScheduleEventGrid({
  events,
  colorScheme,
  animate = false,
  inView = false,
  gridRef,
  className = '',
}: ScheduleEventGridProps) {
  const cardScheme = scheduleCardScheme(colorScheme)

  return (
    <div
      ref={gridRef}
      className={`max-w-site mx-auto w-full px-4 lg:px-12 ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''} ${className}`.trim()}
    >
      <div className="schedule-event-grid schedule-event-grid--upcoming">
        {events.map((item) => (
          <ScheduleEventCard key={item._meta.path} item={item} cardScheme={cardScheme} />
        ))}
      </div>
    </div>
  )
}
