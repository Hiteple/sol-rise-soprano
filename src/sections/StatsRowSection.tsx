import type { AboutPage } from '../../schemas/site-pages'

export type StatsRowSectionProps = {
  page: AboutPage
}

export function StatsRowSection({ page }: StatsRowSectionProps) {
  const statsSurface = page.statsSurface ?? 'soft'
  const statsIsWine = statsSurface === 'wine'
  const statsBackground =
    statsSurface === 'wine'
      ? 'var(--palette-wine)'
      : statsSurface === 'bright'
        ? 'var(--section-surface-bright)'
        : 'transparent'
  const statsNumberColor = statsIsWine ? 'var(--media-caption-text-color)' : 'var(--accent-color)'
  const statsLabelColor = statsIsWine
    ? 'color-mix(in srgb, var(--media-caption-text-color) 84%, transparent)'
    : 'var(--subtle-text-color)'
  const statsDividerColor = statsIsWine
    ? 'color-mix(in srgb, var(--media-caption-text-color) 28%, transparent)'
    : 'color-mix(in srgb, var(--accent-color) 20%, transparent)'

  return (
    <section
      className="py-20"
      style={{
        background: statsBackground,
        borderTop: `1px solid ${statsDividerColor}`,
        borderBottom: `1px solid ${statsDividerColor}`,
      }}
      data-sb-field-path="statsSurface"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {page.highlights.map((h) => (
            <div key={`${h.number}-${h.label}`} className="text-center">
              <div
                className="font-display text-5xl lg:text-6xl italic mb-2"
                style={{ color: statsNumberColor }}
              >
                {h.number}
              </div>
              <div
                className="font-body text-xs uppercase tracking-widest"
                style={{ color: statsLabelColor }}
              >
                {h.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
