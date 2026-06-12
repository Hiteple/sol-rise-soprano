import { SplitGrid, type SplitGridItem } from '@/components/SplitGrid'
import { resolveColorScheme, schemeForeground, schemePageBandBackground } from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import type { SectionColorScheme } from '@/lib/section-color-scheme'
import type { CSSProperties } from 'react'

export type { SplitGridItem } from '@/components/SplitGrid'

export type SplitGridSectionProps = {
  items: SplitGridItem[]
  colorScheme: SectionColorScheme
  slideIn?: boolean
  title?: string
  description?: string
}

export function SplitGridSection({ items, colorScheme, slideIn, title, description }: SplitGridSectionProps) {
  const scheme = resolveColorScheme(colorScheme)
  const fg = schemeForeground(scheme)
  const hasTitle = (title?.trim().length ?? 0) > 0
  const hasDescription = (description?.trim().length ?? 0) > 0
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
  const animate = slideIn !== false
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section
      className="section-vertical-padding"
      aria-label="Featured navigation panels"
      data-sb-field-path="splitGridColorScheme"
      style={{
        background: schemePageBandBackground(colorScheme),
        '--split-grid-hover-content-bg': hoverContentBackground,
        '--split-grid-hover-content-text': hoverContentTextColor,
        '--split-grid-eyebrow-bg': eyebrowBackground,
        '--split-grid-eyebrow-text': eyebrowTextColor,
      } as CSSProperties}
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
      <SplitGrid items={items} animate={animate} inView={inView} gridRef={ref} />
    </section>
  )
}
