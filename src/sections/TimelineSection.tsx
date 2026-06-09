import { ChevronDown } from 'lucide-react'
import { marked } from 'marked'
import { useCallback, useRef } from 'react'

import { resolveColorScheme, schemeForeground, schemeSolidBackground } from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import type { AboutPage } from '../../schemas/site-pages'

export type TimelineSectionProps = {
  page: AboutPage
}

export function TimelineSection({ page }: TimelineSectionProps) {
  const scheme = resolveColorScheme(page.timelineColorScheme)
  const fg = schemeForeground(scheme)
  const animate = page.timelineSlideIn !== false
  const { ref, inView } = useInView<HTMLDivElement>()
  const sectionRef = useRef<HTMLElement>(null)

  const scrollToNextSection = useCallback(() => {
    const next = sectionRef.current?.nextElementSibling
    if (next instanceof HTMLElement) {
      next.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-vertical-padding"
      style={{ background: schemeSolidBackground(scheme) }}
      data-sb-field-path="timelineColorScheme"
    >
      <div
        ref={ref}
        className={`max-w-5xl mx-auto px-4 lg:px-12 ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''}`}
      >
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

        <div>
          <div className="relative">
            <div
              className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px"
              style={{
                background:
                  scheme === 'wine'
                    ? fg.divider
                    : 'color-mix(in srgb, var(--accent-ink-color) 28%, transparent)',
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
                    borderColor: fg.eyebrow,
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
                        : '[&_a]:text-[color:var(--accent-ink-color)]'
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

          <div className="timeline-closure mx-auto mt-16 max-w-md w-full text-center">
            <div
              className="quote-banner-ornament font-body mb-6"
              style={{ color: fg.eyebrow }}
              aria-hidden
            >
              <span className="quote-banner-ornament__glyph">✦</span>
            </div>
            <p
              className="font-display text-xl lg:text-2xl italic"
              style={{ color: fg.heading }}
            >
              The journey continues…
            </p>
            <button
              type="button"
              className="timeline-closure__scroll mt-8 inline-flex border-0 bg-transparent p-0 cursor-pointer"
              style={{ color: fg.eyebrow }}
              aria-label="Scroll to the next section"
              onClick={scrollToNextSection}
            >
              <ChevronDown size={22} strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
