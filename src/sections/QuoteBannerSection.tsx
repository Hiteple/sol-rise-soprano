import { ImageCredit } from '@/components/ImageCredit'
import { netlifyImgSet } from '@/lib/netlify-image'
import { schemeForeground, schemeQuoteOverlay } from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import { resolveImageCredit } from '../../schemas/image-credit'
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
  const imageCredit = resolveImageCredit(section.quoteImageCredit)

  return (
    <section
      className="relative py-36 lg:py-48 flex items-center justify-center text-center overflow-hidden"
      data-sb-field-path="quoteBannerColorScheme"
    >
        <div className="absolute inset-0">
          <img
            {...netlifyImgSet(section.quoteImage, 1920, 900)}
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
          {imageCredit && (
            <div className="absolute bottom-3 right-4 z-20 pointer-events-auto">
              <ImageCredit
                credit={imageCredit}
                style={{ color: 'var(--media-caption-text-color)' }}
                data-sb-field-path="quoteImageCredit"
              />
            </div>
          )}
        </div>
        <div
          ref={ref}
          className={`relative z-10 max-w-3xl mx-auto px-4 lg:px-12 ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''}`}
        >
          <div
            className="quote-banner-ornament font-body"
            style={{ color: fg.eyebrow }}
            aria-hidden
          >
            <span className="quote-banner-ornament__glyph">✦</span>
          </div>
          <blockquote
            className="font-display italic text-2xl lg:text-[2.75rem] leading-relaxed mb-8"
            style={{ color: fg.heading, fontStyle: 'italic' }}
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
