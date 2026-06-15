import { renderMarkdown } from '@/lib/markdown'
import { resolveColorScheme, schemeForeground, schemePageBandBackground } from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import type { PrivacyPage } from '../../schemas/site-pages'

export type PrivacyContentSectionProps = {
  page: Pick<
    PrivacyPage,
    'bodyColorScheme' | 'bodySlideIn' | 'lastUpdated' | 'sections'
  >
  lastUpdatedLabel: string
}

export function PrivacyContentSection({ page, lastUpdatedLabel }: PrivacyContentSectionProps) {
  const scheme = resolveColorScheme(page.bodyColorScheme)
  const fg = schemeForeground(scheme)
  const animate = page.bodySlideIn !== false
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section
      className="section-vertical-padding"
      style={{ background: schemePageBandBackground(scheme) }}
      data-sb-field-path="bodyColorScheme"
    >
      <div
        ref={ref}
        className={`max-w-3xl mx-auto px-4 lg:px-12 ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''}`}
      >
        <p
          className="font-body text-xs uppercase tracking-[0.28em] mb-10"
          style={{ color: fg.eyebrow }}
          data-sb-field-path="lastUpdated"
        >
          {lastUpdatedLabel}: {page.lastUpdated}
        </p>

        <div className="space-y-12">
          {page.sections.map((section, i) => (
            <article key={section.heading}>
              <h2
                className="font-display italic text-2xl lg:text-3xl mb-4"
                style={{ color: fg.heading }}
                data-sb-field-path={`sections.${i}.heading`}
              >
                {section.heading}
              </h2>
              <div
                className="font-body text-base leading-relaxed timeline-markdown privacy-markdown"
                style={{ color: fg.body }}
                data-sb-field-path={`sections.${i}.body`}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(section.body) }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
