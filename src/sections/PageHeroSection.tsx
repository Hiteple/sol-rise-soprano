import { resolveColorScheme, schemeForeground, schemeSolidBackground } from '@/lib/section-color-scheme'
import type { SectionColorScheme } from '../../schemas/color-scheme'

export type PageHeroSectionProps = {
  heroEyebrow: string
  heroTitle: string
  heroIntro?: string
  colorScheme?: SectionColorScheme
  /** Gallery hero uses slightly tighter bottom padding on large screens */
  bottomSpacing?: 'default' | 'compact'
}

export function PageHeroSection({
  heroEyebrow,
  heroTitle,
  heroIntro,
  colorScheme,
  bottomSpacing = 'default',
}: PageHeroSectionProps) {
  const bottomClass =
    bottomSpacing === 'compact' ? 'pb-16 lg:pb-20' : 'pb-16 lg:pb-24'
  const scheme = resolveColorScheme(colorScheme)
  const fg = schemeForeground(scheme)

  return (
    <section
      className={`pt-40 ${bottomClass} lg:pt-52`}
      style={{ background: schemeSolidBackground(scheme) }}
      data-sb-field-path="pageHeroColorScheme"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p
          className="text-xs uppercase tracking-[0.35em] font-body font-semibold mb-4"
          style={{ color: fg.eyebrow }}
          data-sb-field-path="heroEyebrow"
        >
          {heroEyebrow}
        </p>
        <h1
          className={`font-display italic leading-none ${heroIntro ? 'mb-8' : ''}`}
          style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            color: fg.heading,
          }}
          data-sb-field-path="heroTitle"
        >
          {heroTitle}
        </h1>
        {heroIntro !== undefined && heroIntro !== '' && (
          <p
            className="font-body text-lg max-w-xl"
            style={{ color: fg.body }}
            data-sb-field-path="heroIntro"
          >
            {heroIntro}
          </p>
        )}
      </div>
    </section>
  )
}
