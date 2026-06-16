import { renderMarkdown } from '@/lib/markdown'
import { netlifyImgSet } from '@/lib/netlify-image'
import { photographerCreditLabel } from '@/lib/photographer-credit'
import { resolveColorScheme, schemeForeground, schemePageBandBackground } from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import type { BioPage } from '../../schemas/site-pages'

export type RichtextContentSectionProps = {
  page: Pick<
    BioPage,
    | 'fullBioColorScheme'
    | 'fullBioEyebrow'
    | 'fullBioParagraphs'
    | 'fullBioImage'
    | 'fullBioImageAlt'
    | 'fullBioImagePhotography'
    | 'fullBioImagePosition'
    | 'fullBioSlideIn'
  >
}

export function RichtextContentSection({ page }: RichtextContentSectionProps) {
  const scheme = resolveColorScheme(page.fullBioColorScheme)
  const fg = schemeForeground(scheme)
  const hasImage = Boolean(page.fullBioImage)
  const imageOnLeft = page.fullBioImagePosition === 'left'
  const animate = page.fullBioSlideIn !== false
  const imageCredit = photographerCreditLabel(page.fullBioImagePhotography)
  const { ref, inView } = useInView<HTMLDivElement>()

  const eyebrow = (
    <p
      className="text-xs uppercase tracking-[0.35em] font-body font-semibold mb-6"
      style={{ color: fg.eyebrow }}
      data-sb-field-path="fullBioEyebrow"
    >
      {page.fullBioEyebrow}
    </p>
  )

  const paragraphs = (
    <div className="font-body text-base leading-relaxed space-y-6" style={{ color: fg.body }}>
      {page.fullBioParagraphs.map((para, i) => (
        <div
          key={i}
          className="timeline-markdown"
          data-sb-field-path={`fullBioParagraphs.${i}.content`}
          style={
            para.addBorderBottom
              ? {
                  paddingBottom: '1rem',
                  borderBottom: `1px solid ${fg.divider}`,
                }
              : undefined
          }
          dangerouslySetInnerHTML={{ __html: renderMarkdown(para.content) }}
        />
      ))}
    </div>
  )

  return (
    <section
      className="section-vertical-padding"
      style={{ background: schemePageBandBackground(scheme) }}
      data-sb-field-path="fullBioColorScheme"
    >
      {hasImage ? (
        <div
          ref={ref}
          className={`max-w-site mx-auto px-4 lg:px-12 ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div
              className={`relative img-zoom media-radius overflow-hidden ${imageOnLeft ? 'order-1' : 'order-1 lg:order-2'}`}
            >
              <img
                {...netlifyImgSet(page.fullBioImage as string, 900, 1100)}
                alt={page.fullBioImageAlt ?? ''}
                className="w-full object-cover"
                style={{ aspectRatio: '4/5', objectPosition: 'top center' }}
                loading="lazy"
                decoding="async"
                data-sb-field-path="fullBioImage#@src"
              />
              {imageCredit && (
                <div
                  className="role-feature-image__credit absolute inset-x-0 bottom-0 px-4 pb-3 pointer-events-none"
                  aria-hidden
                >
                  <p
                    className="font-body text-xs uppercase tracking-widest text-right"
                    style={{ color: 'var(--media-caption-text-color)' }}
                    data-sb-field-path="fullBioImagePhotography"
                  >
                    {imageCredit}
                  </p>
                </div>
              )}
            </div>
            <div className={imageOnLeft ? 'order-2' : 'order-2 lg:order-1'}>
              {eyebrow}
              {paragraphs}
            </div>
          </div>
        </div>
      ) : (
        <div
          ref={ref}
          className={`max-w-3xl mx-auto px-4 lg:px-12 ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''}`}
        >
          {eyebrow}
          {paragraphs}
        </div>
      )}
    </section>
  )
}
