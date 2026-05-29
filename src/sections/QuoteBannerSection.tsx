import { netlifyImg } from '@/lib/netlify-image'
import { schemeForeground, schemeQuoteOverlay } from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import type { HomeQuoteSection } from './types'

export type QuoteBannerSectionProps = {
  section: HomeQuoteSection
}

export function QuoteBannerSection({ section }: QuoteBannerSectionProps) {
  const quoteAlt = section.quoteImageAlt ?? 'Performance backdrop'
  const scheme = section.colorScheme
  const fg = schemeForeground(scheme)
  const animate = section.slideIn !== false
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section
      className="relative py-36 lg:py-48 flex items-center justify-center text-center overflow-hidden"
      data-sb-field-path="quoteBannerColorScheme"
    >
        <div className="absolute inset-0">
          <img
            src={netlifyImg(section.quoteImage, 1920, 900)}
            alt={quoteAlt}
            className="w-full h-full object-cover"
            data-sb-field-path="quoteImage#@src"
          />
          <div
            className="absolute inset-0"
            style={{
              background: schemeQuoteOverlay(scheme),
            }}
          />
        </div>
        <div
          ref={ref}
          className={`relative z-10 max-w-3xl mx-auto px-6 lg:px-12 ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''}`}
        >
          <div
            className="font-display text-5xl lg:text-6xl mb-8"
            style={{ color: fg.eyebrow, opacity: scheme === 'wine' ? 0.85 : 0.6 }}
          >
            "
          </div>
          <blockquote
            className="font-display italic text-2xl lg:text-4xl leading-relaxed mb-8"
            style={{ color: fg.heading }}
            data-sb-field-path="quoteText"
          >
            {section.quoteText}
          </blockquote>
          {section.quoteAuthor?.trim() && (
            <cite
              className="font-body text-sm uppercase tracking-widest not-italic"
              style={{ color: fg.eyebrow }}
              data-sb-field-path="quoteAuthor"
            >
              {section.quoteAuthor}
            </cite>
          )}
        </div>
    </section>
  )
}
