import { netlifyImg } from '@/lib/netlify-image'
import type { HomeQuoteBannerSection } from '../../schemas/home-sections'

export type QuoteBannerSectionProps = {
  section: HomeQuoteBannerSection
}

export function QuoteBannerSection({ section }: QuoteBannerSectionProps) {
  const quoteAlt = section.quoteImageAlt ?? 'Performance backdrop'

  return (
    <section className="relative py-36 lg:py-48 flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={netlifyImg(section.quoteImage, 1920, 900)}
          alt={quoteAlt}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, color-mix(in srgb, var(--section-background-color) 92%, transparent) 0%, color-mix(in srgb, var(--accent-pale-color) 75%, transparent) 100%)',
          }}
        />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12">
        <div
          className="font-display text-5xl lg:text-6xl mb-8"
          style={{ color: 'var(--accent-color)', opacity: 0.6 }}
        >
          "
        </div>
        <blockquote
          className="font-display italic text-2xl lg:text-4xl leading-relaxed mb-8"
          style={{ color: 'var(--heading-color)' }}
        >
          {section.quoteText}
        </blockquote>
        <cite
          className="font-body text-sm uppercase tracking-widest not-italic"
          style={{ color: 'var(--accent-color)' }}
        >
          {section.quoteAuthor}
        </cite>
      </div>
    </section>
  )
}
