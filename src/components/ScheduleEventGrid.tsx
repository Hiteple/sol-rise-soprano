import { Link } from '@tanstack/react-router'

import { SplitGridBadges } from '@/components/SplitGridBadges'
import { SplitGridPanelImage } from '@/components/SplitGridPanelImage'
import { useLocale } from '@/components/LocaleContext'
import { documentSlug } from '@/lib/i18n/content'
import { localeRouteParams } from '@/lib/i18n/paths'
import { SCHEDULE_DATE_BADGE_CARD_LIMIT } from '@/lib/schedule-badge-display'
import { splitGridBadges } from '@/lib/split-grid-badges'
import { resolveColorScheme } from '@/lib/section-color-scheme'
import type { SectionColorScheme } from '../../schemas/color-scheme'
import type { CSSProperties } from 'react'

export type ScheduleEvent = {
  _meta: { path: string }
  title: string
  subtitle?: string
  composer?: string
  venue?: string
  city?: string
  videoUrl?: string
  image?: string
  organizationSlug?: string
  roleSlug?: string
  ticketHref?: string
  externalUrl?: string
  imageAlt?: string
  badges?: string[]
  cast?: { character: string; performer: string }[]
  productionCredits?: { position: string; name: string }[]
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
  tileIndex = 0,
}: {
  item: ScheduleEvent
  cardScheme: ScheduleCardScheme
  /** Smaller title/subtitle for past event grids */
  compact?: boolean
  tileIndex?: number
}) {
  const { locale } = useLocale()
  const badges = eventCardBadges(item)
  const imagePath = item.image?.trim() ?? ''
  const hasImage = Boolean(imagePath)
  const slug = documentSlug(item)
  const imageLoading = tileIndex < 3 ? 'eager' : 'lazy'

  const panelContent = (
    <>
      {hasImage && (
        <SplitGridPanelImage image={imagePath} loading={imageLoading} layout={compact ? 'schedule' : 'featured'} />
      )}
      <div className="split-grid-overlay" />
      <div className="split-grid-content">
        <SplitGridBadges
          badges={badges}
          eventRef={slug}
          markPastBadges={item.status === 'upcoming'}
          collapseAfter={SCHEDULE_DATE_BADGE_CARD_LIMIT}
        />
        <h3
          className={`split-grid-card-title font-display italic leading-tight ${
            compact ? 'split-grid-card-title--compact' : 'text-3xl'
          }`}
        >
          {item.title}
        </h3>
        {(item.subtitle?.trim().length ?? 0) > 0 && (
          <h4
            className={`font-display italic leading-snug mt-1 md:mt-2 ${
              compact
                ? 'split-grid-card-subtitle--compact line-clamp-2 md:line-clamp-none'
                : 'text-xl'
            }`}
          >
            {item.subtitle}
          </h4>
        )}
      </div>
    </>
  )

  const style = {
    '--split-grid-hover-content-bg': cardScheme.hoverContentBackground,
    '--split-grid-hover-content-text': cardScheme.hoverContentTextColor,
    '--split-grid-eyebrow-bg': cardScheme.eyebrowBackground,
    '--split-grid-eyebrow-text': cardScheme.eyebrowTextColor,
  } as CSSProperties

  return (
    <Link
      to="/{-$locale}/schedule/$slug"
      params={{ ...localeRouteParams(locale), slug }}
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
  className?: string
}

export function ScheduleEventGrid({
  events,
  colorScheme,
  className = '',
}: ScheduleEventGridProps) {
  const cardScheme = scheduleCardScheme(colorScheme)

  return (
    <div className={`max-w-site mx-auto w-full px-4 lg:px-12 ${className}`.trim()}>
      <div className="schedule-event-grid schedule-event-grid--upcoming">
        {events.map((item, index) => (
          <ScheduleEventCard
            key={documentSlug(item)}
            item={item}
            cardScheme={cardScheme}
            tileIndex={index}
          />
        ))}
      </div>
    </div>
  )
}
