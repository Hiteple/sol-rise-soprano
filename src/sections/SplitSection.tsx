import { Link } from '@tanstack/react-router'

import { netlifyImg } from '@/lib/netlify-image'
import type { HomeFeatureSplitSection } from '../../schemas/home-sections'

export type SplitSectionProps = {
  section: HomeFeatureSplitSection
}

export function SplitSection({ section }: SplitSectionProps) {
  const ctaLabel = section.ctaLabel ?? 'Enquire About Lessons →'
  const ctaHref = section.ctaHref ?? '/contact'

  return (
    <section
      className="py-24 lg:py-36"
      style={{ background: 'var(--section-background-color)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <p
              className="text-xs uppercase tracking-[0.3em] font-body font-semibold mb-6"
              style={{ color: 'var(--accent-color)' }}
            >
              {section.eyebrow}
            </p>
            <h2
              className="font-display text-4xl lg:text-5xl italic leading-tight mb-8"
              style={{ color: 'var(--heading-color)' }}
            >
              {section.featureTitle}
            </h2>
            <div
              className="w-12 h-px mb-8"
              style={{ background: 'var(--accent-color)' }}
            />
            <p
              className="font-body text-base leading-relaxed mb-10"
              style={{ color: 'var(--muted-text-color)' }}
            >
              {section.featureText}
            </p>
            <Link to={ctaHref} className="gold-link">
              {ctaLabel}
            </Link>
          </div>

          <div className="lg:col-span-3 img-zoom order-1 lg:order-2 relative">
            <div
              className="absolute -top-6 -right-6 w-32 h-32 border"
              style={{
                borderColor: 'color-mix(in srgb, var(--accent-color) 22%, transparent)',
              }}
            />
            <img
              src={netlifyImg(section.featureImage, 900, 1100)}
              alt={section.featureImageAlt}
              className="w-full object-cover"
              style={{ maxHeight: '640px', objectPosition: 'top center' }}
            />
            <div
              className="absolute -bottom-6 -left-6 w-32 h-32 border"
              style={{
                borderColor: 'color-mix(in srgb, var(--accent-color) 22%, transparent)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
