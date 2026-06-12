import { ScheduleEventGrid } from '@/components/ScheduleEventGrid'
import { SplitGrid, type SplitGridItem } from '@/components/SplitGrid'
import {
  resolveFeaturedEventsLayout,
  splitGridItemsToScheduleEvents,
  type FeaturedEventsLayout,
} from '@/lib/featured-events'
import { resolveColorScheme, schemeForeground, schemePageBandBackground } from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import type { SectionColorScheme } from '@/lib/section-color-scheme'
import type { CSSProperties } from 'react'

export type FeaturedEventsSectionProps = {
  items: SplitGridItem[]
  layout?: FeaturedEventsLayout | string
  colorScheme: SectionColorScheme
  slideIn?: boolean
  title?: string
  description?: string
}

function splitGridSchemeVars(colorScheme: SectionColorScheme): CSSProperties {
  const hoverContentTextColor =
    colorScheme === 'wine' ? 'var(--palette-pink)' : 'var(--palette-pine)'
  const hoverContentBackground =
    colorScheme === 'wine'
      ? 'color-mix(in srgb, var(--palette-wine) 78%, transparent)'
      : colorScheme === 'bright'
        ? 'color-mix(in srgb, var(--section-surface-bright) 92%, transparent)'
        : 'color-mix(in srgb, var(--page-background-color) 90%, transparent)'
  const eyebrowBackground =
    colorScheme === 'wine'
      ? 'color-mix(in srgb, var(--palette-pink) 90%, white 10%)'
      : 'color-mix(in srgb, var(--palette-wine) 58%, transparent)'
  const eyebrowTextColor =
    colorScheme === 'wine' ? 'var(--palette-pine)' : 'var(--media-caption-text-color)'

  return {
    '--split-grid-hover-content-bg': hoverContentBackground,
    '--split-grid-hover-content-text': hoverContentTextColor,
    '--split-grid-eyebrow-bg': eyebrowBackground,
    '--split-grid-eyebrow-text': eyebrowTextColor,
  } as CSSProperties
}

export function FeaturedEventsSection({
  items,
  layout,
  colorScheme,
  slideIn,
  title,
  description,
}: FeaturedEventsSectionProps) {
  const resolvedLayout = resolveFeaturedEventsLayout(layout)
  const scheme = resolveColorScheme(colorScheme)
  const fg = schemeForeground(scheme)
  const hasTitle = (title?.trim().length ?? 0) > 0
  const hasDescription = (description?.trim().length ?? 0) > 0
  const animate = slideIn !== false
  const { ref, inView } = useInView<HTMLDivElement>()
  const visibleItems = items.slice(0, 3)

  if (visibleItems.length === 0) return null

  const ariaLabel =
    resolvedLayout === 'scheduleCards' ? 'Featured schedule events' : 'Featured navigation panels'

  return (
    <section
      className="section-vertical-padding"
      aria-label={ariaLabel}
      data-sb-field-path="splitGridColorScheme"
      style={{
        background: schemePageBandBackground(scheme),
        ...splitGridSchemeVars(scheme),
      }}
    >
      {(hasTitle || hasDescription) && (
        <div className="max-w-site mx-auto w-full px-4 lg:px-12 pb-8">
          {hasTitle && (
            <h2
              className="font-display text-4xl lg:text-5xl italic"
              style={{ color: fg.heading }}
              data-sb-field-path="splitGridTitle"
            >
              {title}
            </h2>
          )}
          {hasDescription && (
            <p
              className="mt-3 font-body text-base leading-relaxed"
              style={{ color: fg.body }}
              data-sb-field-path="splitGridDescription"
            >
              {description}
            </p>
          )}
        </div>
      )}

      {resolvedLayout === 'scheduleCards' ? (
        <ScheduleEventGrid
          events={splitGridItemsToScheduleEvents(visibleItems)}
          colorScheme={scheme}
          animate={animate}
          inView={inView}
          gridRef={ref}
        />
      ) : (
        <SplitGrid items={visibleItems} animate={animate} inView={inView} gridRef={ref} />
      )}
    </section>
  )
}
