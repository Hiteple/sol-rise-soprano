import { marked } from 'marked'

import type { AboutPage } from '../../schemas/site-pages'

export type TimelineSectionProps = {
  page: AboutPage
}

export function TimelineSection({ page }: TimelineSectionProps) {
  return (
    <section
      className="py-24 lg:py-36"
      style={{ background: 'var(--section-background-color)' }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <p
          className="text-xs uppercase tracking-[0.35em] font-body font-semibold mb-4"
          style={{ color: 'var(--accent-color)' }}
          data-sb-field-path="timelineSectionEyebrow"
        >
          {page.timelineSectionEyebrow}
        </p>
        <h2
          className="font-display italic text-4xl lg:text-5xl mb-16"
          style={{ color: 'var(--heading-color)' }}
          data-sb-field-path="timelineSectionTitle"
        >
          {page.timelineSectionTitle}
        </h2>

        <div className="relative">
          <div
            className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px"
            style={{
              background: 'color-mix(in srgb, var(--accent-color) 28%, transparent)',
            }}
          />

          <div className="space-y-12">
            {page.timeline.map((item, idx) => (
              <div
                key={item.year + item.title}
                className={`relative flex items-start gap-8 lg:gap-16 ${
                  idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <div
                  className="absolute left-0 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full mt-1 border-2"
                  style={{
                    background: 'var(--page-background-color)',
                    borderColor: 'var(--accent-color)',
                    zIndex: 1,
                  }}
                />

                <div
                  className={`ml-8 lg:ml-0 lg:w-5/12 ${idx % 2 === 0 ? 'lg:text-right' : 'lg:pl-16'}`}
                  data-sb-field-path={`timeline.${idx}`}
                >
                  <span
                    className="font-display italic text-2xl"
                    style={{ color: 'var(--accent-color)' }}
                  >
                    {item.year}
                  </span>
                  <h3
                    className="font-display text-xl mt-1 mb-3"
                    style={{ color: 'var(--heading-color)' }}
                  >
                    {item.title}
                  </h3>
                  <div
                    className="timeline-markdown max-w-none font-body text-sm leading-relaxed [&_a]:text-[color:var(--accent-color)]"
                    style={{ color: 'var(--muted-text-color)' }}
                    data-sb-field-path={`timeline.${idx}.description`}
                    dangerouslySetInnerHTML={{
                      __html: String(marked(item.description)),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
