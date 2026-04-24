import { Link } from '@tanstack/react-router'
import { schemeForeground, schemePageBandBackground } from '@/lib/section-color-scheme'
import type { SectionColorScheme } from '@/lib/section-color-scheme'
import type { CSSProperties } from 'react'

export type SplitGridItem = {
  title: string
  href: string
  image: string
  decorativeEyebrow?: string
  subtitle?: string
}

export type SplitGridSectionProps = {
  items: SplitGridItem[]
  colorScheme: SectionColorScheme
  title?: string
  description?: string
}

export function SplitGridSection({ items, colorScheme, title, description }: SplitGridSectionProps) {
  const visibleItems = items.slice(0, 3)
  const hasTitle = (title?.trim().length ?? 0) > 0
  const hasDescription = (description?.trim().length ?? 0) > 0
  const fg = schemeForeground(colorScheme)
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
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 pb-8">
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
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12">
        <div className="split-grid">
          {visibleItems.map((item) => (
            <Link
              key={`${item.title}-${item.href}`}
              to={item.href}
              className="split-grid-item"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="split-grid-overlay" />
              <div className="split-grid-content">
                {(item.decorativeEyebrow?.trim().length ?? 0) > 0 && (
                  <span className="split-grid-link font-body text-xs uppercase tracking-[0.22em]">
                    {item.decorativeEyebrow}
                  </span>
                )}
                <h3 className="font-display text-3xl italic">{item.title}</h3>
                {(item.subtitle?.trim().length ?? 0) > 0 && (
                  <h4 className="font-display text-xl italic mt-2">
                    {item.subtitle}
                  </h4>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
