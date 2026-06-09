import { marked } from 'marked'
import { netlifyImgSet } from '@/lib/netlify-image'
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
          dangerouslySetInnerHTML={{ __html: String(marked(para.content)) }}
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
          className={`max-w-site mx-auto px-6 lg:px-12 ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <div
              className={`lg:col-span-2 img-zoom media-radius ${imageOnLeft ? 'order-1' : 'order-1 lg:order-2'}`}
            >
              <img
                {...netlifyImgSet(page.fullBioImage as string, 900, 1100)}
                alt={page.fullBioImageAlt ?? ''}
                className="w-full object-cover"
                style={{ objectPosition: 'top center' }}
                data-sb-field-path="fullBioImage#@src"
              />
            </div>
            <div className={`lg:col-span-3 ${imageOnLeft ? 'order-2' : 'order-2 lg:order-1'}`}>
              {eyebrow}
              {paragraphs}
            </div>
          </div>
        </div>
      ) : (
        <div
          ref={ref}
          className={`max-w-3xl mx-auto px-6 lg:px-12 ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''}`}
        >
          {eyebrow}
          {paragraphs}
        </div>
      )}
    </section>
  )
}
