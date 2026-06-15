import { Link } from '@tanstack/react-router'
import { marked } from 'marked'
import { useRef, type CSSProperties } from 'react'

import { resolveColorScheme, schemeForeground, schemeSolidBackground } from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import { useTimelineDotsReached } from '@/lib/use-timeline-dots-reached'
import { useTimelineFillProgress } from '@/lib/use-timeline-fill-progress'
import type { AboutPage } from '../../schemas/site-pages'

export type TimelineSectionProps = {
  page: AboutPage
}

export function TimelineSection({ page }: TimelineSectionProps) {
  const scheme = resolveColorScheme(page.timelineColorScheme)
  const fg = schemeForeground(scheme)
  const animate = page.timelineSlideIn !== false
  const { ref, inView } = useInView<HTMLDivElement>()
  const timelineTrackRef = useRef<HTMLDivElement>(null)
  const { progress: fillProgress, complete: timelineComplete } =
    useTimelineFillProgress(timelineTrackRef)

  const dotsReached = useTimelineDotsReached(timelineTrackRef, fillProgress)
  const ctaLabel = page.ctaPrimaryLabel?.trim() || 'Get in Touch'
  const ctaHref = page.ctaPrimaryHref?.trim() || '/contact'

  return (
    <section
      className="section-vertical-padding pb-24 lg:pb-32"
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
          <div ref={timelineTrackRef} className="timeline-track relative">
            <div
              className="timeline-track__line timeline-track__line--base"
              style={{
                background:
                  scheme === 'wine'
                    ? fg.divider
                    : 'color-mix(in srgb, var(--accent-ink-color) 28%, transparent)',
              }}
              aria-hidden
            />
            <div
              className="timeline-track__line timeline-track__line--fill"
              style={{ '--timeline-fill': fillProgress } as CSSProperties}
              aria-hidden
            />

            <div className="space-y-12">
              {page.timeline.map((item, idx) => {
                const dotReached = dotsReached[idx] ?? false

                return (
                  <div
                    key={item.year + item.title}
                    className={`relative flex items-start gap-8 lg:gap-16 ${
                      idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    <div
                      className={`timeline-track__dot mt-1${dotReached ? ' timeline-track__dot--reached' : ''}`}
                      style={
                        {
                          '--timeline-dot-color': fg.eyebrow,
                          borderColor: fg.eyebrow,
                        } as CSSProperties
                      }
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
                )
              })}
            </div>
          </div>

          <div
            className={`timeline-closure mx-auto mt-16 max-w-md w-full text-center${timelineComplete ? ' timeline-closure--complete' : ''}`}
          >
            <div className="quote-banner-ornament timeline-closure__ornament font-body mb-6" aria-hidden>
              <span className="quote-banner-ornament__glyph">✦</span>
            </div>
            <p
              className="timeline-closure__message font-display italic"
              data-sb-field-path="timelineClosureMessage"
            >
              {page.timelineClosureMessage}
            </p>
            <Link
              to={ctaHref}
              className="timeline-closure__cta mt-8 inline-flex px-8 py-3 font-body text-xs uppercase tracking-widest font-semibold transition-all duration-300 rounded-[var(--media-radius)]"
              data-sb-field-path="ctaPrimaryLabel"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
