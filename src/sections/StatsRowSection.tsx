import { resolveColorScheme, schemeForeground, schemeStatsBackground } from '@/lib/section-color-scheme'
import type { AboutPage } from '../../schemas/site-pages'

export type StatsRowSectionProps = {
  page: AboutPage
}

export function StatsRowSection({ page }: StatsRowSectionProps) {
  const statsSurface = resolveColorScheme(page.statsSurface)
  const statsIsWine = statsSurface === 'wine'
  const statsBackground = schemeStatsBackground(statsSurface)
  const fg = schemeForeground(statsSurface)
  const statsNumberColor = statsIsWine ? fg.heading : 'var(--accent-color)'
  const statsLabelColor = statsIsWine ? fg.body : 'var(--subtle-text-color)'
  const statsDividerColor = statsIsWine ? fg.divider : 'color-mix(in srgb, var(--accent-color) 20%, transparent)'

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
