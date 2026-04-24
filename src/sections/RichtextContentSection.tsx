import { marked } from 'marked'
import { resolveColorScheme, schemeForeground, schemePageBandBackground } from '@/lib/section-color-scheme'
import type { BioPage } from '../../schemas/site-pages'

export type RichtextContentSectionProps = {
  page: Pick<BioPage, 'fullBioColorScheme' | 'fullBioEyebrow' | 'fullBioParagraphs'>
}

export function RichtextContentSection({ page }: RichtextContentSectionProps) {
  const scheme = resolveColorScheme(page.fullBioColorScheme)
  const fg = schemeForeground(scheme)

  return (
    <section
      className="section-vertical-padding"
      style={{ background: schemePageBandBackground(scheme) }}
      data-sb-field-path="fullBioColorScheme"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <p
          className="text-xs uppercase tracking-[0.35em] font-body font-semibold mb-6"
          style={{ color: fg.eyebrow }}
          data-sb-field-path="fullBioEyebrow"
        >
          {page.fullBioEyebrow}
        </p>
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
      </div>
    </section>
  )
}
