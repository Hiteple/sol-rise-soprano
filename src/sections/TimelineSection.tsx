import { marked } from 'marked'

import { resolveColorScheme, schemeForeground, schemeSolidBackground } from '@/lib/section-color-scheme'
import type { AboutPage } from '../../schemas/site-pages'

export type TimelineSectionProps = {
  page: AboutPage
}

export function TimelineSection({ page }: TimelineSectionProps) {
  const scheme = resolveColorScheme(page.timelineColorScheme)
  const fg = schemeForeground(scheme)

  return (
    <section
      className="py-24 lg:py-36"
      style={{ background: schemeSolidBackground(scheme) }}
      data-sb-field-path="timelineColorScheme"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <p
          className="text-xs uppercase tracking-[0.35em] font-body font-semibold mb-4"
          style={{ color: fg.eyebrow }}
          data-sb-field-path="timelineSectionEyebrow"
        >
          {page.timelineSectionEyebrow}
        </p>
        <h2
          className="font-display italic text-4xl lg:text-5xl mb-16"
          style={{ color: fg.heading }}
          data-sb-field-path="timelineSectionTitle"
        >
          {page.timelineSectionTitle}
        </h2>

        <div className="relative">
          <div
            className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px"
            style={{
              background:
                scheme === 'wine'
                  ? fg.divider
                  : 'color-mix(in srgb, var(--accent-color) 28%, transparent)',
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
                    borderColor: scheme === 'wine' ? fg.eyebrow : 'var(--accent-color)',
                    zIndex: 1,
                  }}
                />

                <div
                  className={`ml-8 lg:ml-0 lg:w-5/12 ${idx % 2 === 0 ? 'lg:text-right' : 'lg:pl-16'}`}
                  data-sb-field-path={`timeline.${idx}`}
                >
                  <span
                    className="font-display italic text-2xl"
                    style={{ color: fg.eyebrow }}
                  >
                    {item.year}
                  </span>
                  <h3
                    className="font-display text-xl mt-1 mb-3"
                    style={{ color: fg.heading }}
                  >
                    {item.title}
                  </h3>
                  <div
                    className={`timeline-markdown max-w-none font-body text-sm leading-relaxed [&_a]:underline ${
                      scheme === 'wine'
                        ? '[&_a]:text-[color:var(--media-caption-text-color)]'
                        : '[&_a]:text-[color:var(--accent-color)]'
                    }`}
                    style={{ color: fg.body }}
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
