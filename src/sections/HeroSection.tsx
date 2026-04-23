import { Link } from '@tanstack/react-router'
import { ChevronDown } from 'lucide-react'

import { schemeHeroImageOverlay } from '@/lib/section-color-scheme'
import { netlifyImg } from '@/lib/netlify-image'
import type { HomeHeroSection } from './types'

export type HeroSectionProps = {
  section: HomeHeroSection
}

export function HeroSection({ section }: HeroSectionProps) {
  const primaryLabel = section.primaryCtaLabel ?? 'View Productions'
  const primaryHref = section.primaryCtaHref ?? '/productions'
  const secondaryLabel = section.secondaryCtaLabel ?? 'Book a Performance'
  const secondaryHref = section.secondaryCtaHref ?? '/contact'
  const isWine = section.colorScheme === 'wine'

  return (
    <section
      className="relative flex items-end pb-24 lg:pb-32"
      style={{ minHeight: '100svh' }}
      data-sb-field-path="heroColorScheme"
    >
        <div className="absolute inset-0">
          <img
            src={netlifyImg(section.heroImage, 1920, 1080)}
            alt={section.heroImageAlt}
            className="w-full h-full object-cover"
            data-sb-field-path="heroImage#@src"
          />
          <div
            className="absolute inset-0"
            style={{
              background: schemeHeroImageOverlay(section.colorScheme),
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <p
            className="animate-fade-up text-xs uppercase tracking-[0.35em] mb-6 font-body font-semibold"
            style={{ color: isWine ? 'var(--media-caption-text-color)' : 'var(--heading-color)' }}
            data-sb-field-path="heroTagline"
          >
            {section.heroTagline}
          </p>

          <h1
            className="animate-fade-up-delay-1 font-display italic leading-none mb-6"
            style={{
              fontSize: 'var(--h1-fluid-size)',
              color: isWine ? 'var(--media-caption-text-color)' : 'var(--heading-color)',
              letterSpacing: '-0.02em',
            }}
            data-sb-field-path="heroTitle"
          >
            {section.heroTitle}
          </h1>

          <p
            className="animate-fade-up-delay-2 font-body text-base tracking-[0.2em] uppercase mb-12"
            style={{
              color: isWine
                ? 'color-mix(in srgb, var(--media-caption-text-color) 88%, transparent)'
                : 'var(--muted-text-color)',
            }}
            data-sb-field-path="heroSubtitle"
          >
            {section.heroSubtitle}
          </p>

          <div className="animate-fade-up-delay-3 flex flex-wrap gap-6">
            <Link
              to={primaryHref}
              className="px-8 py-3 font-body text-xs uppercase tracking-widest font-semibold transition-all duration-300"
              style={{
                background: 'var(--accent-color)',
                color: 'var(--on-accent-text-color)',
              }}
            data-sb-field-path="primaryCtaHref"
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = 'var(--accent-soft-color)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'var(--accent-color)')
              }
            >
              <span data-sb-field-path="primaryCtaLabel">{primaryLabel}</span>
            </Link>
            <Link
              to={secondaryHref}
              className="px-8 py-3 font-body text-xs uppercase tracking-widest font-semibold border transition-all duration-300"
              style={{
                borderColor: isWine
                  ? 'color-mix(in srgb, var(--media-caption-text-color) 35%, transparent)'
                  : 'color-mix(in srgb, var(--body-color) 28%, transparent)',
                color: isWine ? 'var(--media-caption-text-color)' : 'var(--body-color)',
              }}
            data-sb-field-path="secondaryCtaHref"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-color)'
                e.currentTarget.style.color = 'var(--accent-color)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  isWine
                    ? 'color-mix(in srgb, var(--media-caption-text-color) 35%, transparent)'
                    : 'color-mix(in srgb, var(--body-color) 28%, transparent)'
                e.currentTarget.style.color = isWine
                  ? 'var(--media-caption-text-color)'
                  : 'var(--body-color)'
              }}
            >
              <span data-sb-field-path="secondaryCtaLabel">{secondaryLabel}</span>
            </Link>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
          style={{
            color: isWine
              ? 'color-mix(in srgb, var(--media-caption-text-color) 58%, transparent)'
              : 'color-mix(in srgb, var(--accent-color) 55%, transparent)',
          }}
        >
          <ChevronDown size={20} />
        </div>
    </section>
  )
}
