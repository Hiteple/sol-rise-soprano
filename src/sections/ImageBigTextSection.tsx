import { netlifyImg } from '@/lib/netlify-image'
import type { AboutPage } from '../../schemas/site-pages'

export type ImageBigTextSectionProps = {
  page: AboutPage
}

const HERO_FALLBACK = 'https://picsum.photos/seed/aboutpage/800/1000'

export function ImageBigTextSection({ page }: ImageBigTextSectionProps) {
  const heroSrc = page.heroImage?.trim() || HERO_FALLBACK

  return (
    <section
      className="pt-40 pb-24 lg:pt-52 lg:pb-36"
      style={{ background: 'var(--section-background-color)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p
              className="text-xs uppercase tracking-[0.35em] font-body font-semibold mb-6"
              style={{ color: 'var(--accent-color)' }}
              data-sb-field-path="heroEyebrow"
            >
              {page.heroEyebrow}
            </p>
            <h1
              className="font-display italic leading-none mb-8"
              style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                color: 'var(--heading-color)',
              }}
            >
              <span data-sb-field-path="heroTitleLine1">{page.heroTitleLine1}</span>
              <br />
              <span style={{ color: 'var(--accent-color)' }} data-sb-field-path="heroTitleAccent">
                {page.heroTitleAccent}
              </span>
              <br />
              <span data-sb-field-path="heroTitleLine2">{page.heroTitleLine2}</span>
            </h1>
            <div className="w-16 h-px mb-8" style={{ background: 'var(--accent-color)' }} />
            <p
              className="font-body text-lg leading-relaxed"
              style={{ color: 'var(--muted-text-color)' }}
              data-sb-field-path="heroIntro"
            >
              {page.heroIntro}
            </p>
          </div>

          <div className="relative img-zoom">
            <img
              src={netlifyImg(heroSrc, 800, 1000)}
              alt={page.heroImageAlt}
              className="w-full object-cover"
              style={{ maxHeight: 680 }}
              data-sb-field-path="heroImage"
            />
            <div
              className="absolute bottom-6 left-6 right-6 p-6"
              style={{
                background: 'color-mix(in srgb, var(--page-background-color) 88%, transparent)',
                backdropFilter: 'blur(10px)',
                borderLeft: '3px solid var(--accent-color)',
              }}
            >
              <p
                className="font-display italic text-xl"
                style={{ color: 'var(--heading-color)' }}
                data-sb-field-path="heroQuote"
              >
                {page.heroQuote}
              </p>
              <p
                className="font-body text-xs mt-2 uppercase tracking-widest"
                style={{ color: 'var(--accent-color)' }}
                data-sb-field-path="heroQuoteAttribution"
              >
                {page.heroQuoteAttribution}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
