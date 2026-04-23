import type { AboutPage } from '../../schemas/site-pages'

export type RichtextContentSectionProps = {
  page: AboutPage
}

export function RichtextContentSection({ page }: RichtextContentSectionProps) {
  return (
    <section className="py-24 lg:py-36">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <p
          className="text-xs uppercase tracking-[0.35em] font-body font-semibold mb-6"
          style={{ color: 'var(--accent-color)' }}
          data-sb-field-path="fullBioEyebrow"
        >
          {page.fullBioEyebrow}
        </p>
        <div
          className="font-body text-base leading-relaxed space-y-6"
          style={{ color: 'var(--muted-text-color)' }}
        >
          {page.fullBioParagraphs.map((para, i) => (
            <p key={i} data-sb-field-path={`fullBioParagraphs.${i}`}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
