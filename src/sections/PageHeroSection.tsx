import { SKIP_PAST_HERO_ATTR } from '@/lib/skip-to-content'
import { aboutPageHeroImageProps } from '@/lib/netlify-image'
import { resolveColorScheme, schemeForeground, schemeSolidBackground } from '@/lib/section-color-scheme'
import type { SectionColorScheme } from '../../schemas/color-scheme'

export type PageHeroSectionProps = {
  heroEyebrow: string
  heroTitle: string
  heroDescription?: string
  heroImage?: string
  heroImageAlt?: string
  colorScheme?: SectionColorScheme
  /** Gallery hero uses slightly tighter bottom padding on large screens */
  bottomSpacing?: 'default' | 'compact'
  /** `compact` = 32px min title on mobile (long compound words, e.g. DE privacy). */
  heroTitleMobileSize?: 'default' | 'compact'
}

export function PageHeroSection({
  heroEyebrow,
  heroTitle,
  heroDescription,
  heroImage,
  heroImageAlt,
  colorScheme,
  bottomSpacing = 'default',
  heroTitleMobileSize = 'default',
}: PageHeroSectionProps) {
  const bottomClass =
    bottomSpacing === 'compact' ? 'pb-8 lg:pb-20' : 'pb-8 lg:pb-24'
  const scheme = resolveColorScheme(colorScheme)
  const fg = schemeForeground(scheme)
  const titleSize =
    heroTitleMobileSize === 'compact' ? 'clamp(2rem, 8vw, 6rem)' : 'clamp(3rem, 8vw, 6rem)'
  const heroImageSrc = heroImage?.trim()

  const heroText = (
    <>
      <p
        className="text-xs uppercase tracking-[0.35em] font-body font-semibold mb-4"
        style={{ color: fg.eyebrow }}
        data-sb-field-path="heroEyebrow"
      >
        {heroEyebrow}
      </p>
      <h1
        className={`page-hero-title font-display italic leading-none ${heroDescription ? 'mb-8' : ''}`}
        style={{
          fontSize: titleSize,
          color: fg.heading,
        }}
        data-sb-field-path="heroTitle"
      >
        {heroTitle}
      </h1>
      {heroDescription !== undefined && heroDescription !== '' && (
        <p
          className="font-body text-lg max-w-xl"
          style={{ color: fg.body }}
          data-sb-field-path="heroDescription"
        >
          {heroDescription}
        </p>
      )}
    </>
  )

  return (
    <section
      className={`pt-40 ${bottomClass} lg:pt-52`}
      style={{ background: schemeSolidBackground(scheme) }}
      {...{ [SKIP_PAST_HERO_ATTR]: '' }}
      data-sb-field-path="pageHeroColorScheme"
    >
      <div className="max-w-site mx-auto px-4 lg:px-12">
        {heroImageSrc ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>{heroText}</div>
            <div className="relative img-zoom media-radius">
              <img
                {...aboutPageHeroImageProps(heroImageSrc)}
                alt={heroImageAlt ?? ''}
                className="w-full object-cover"
                width={800}
                height={1000}
                style={{ maxHeight: 680, objectPosition: 'top center' }}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                data-sb-field-path="heroImage"
              />
            </div>
          </div>
        ) : (
          heroText
        )}
      </div>
    </section>
  )
}
