import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Play } from 'lucide-react'

import { useLocale } from '@/components/LocaleContext'
import type { FeaturedPerformanceVideo } from '@/lib/featured-performance-video'
import { netlifyImgSet } from '@/lib/netlify-image'
import { localeRouteParams } from '@/lib/i18n/paths'
import { photographyVideoPosterCandidates } from '@/lib/schedule-photography'
import {
  schemeForeground,
  schemeGoldLinkStyle,
  schemePageBandBackground,
} from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import { youtubeIframeSrc } from '@/lib/utils'
import type { HomeFeaturedVideoSection } from './types'

export type FeaturedVideoSectionProps = {
  section: HomeFeaturedVideoSection
  video: FeaturedPerformanceVideo
}

export function FeaturedVideoSection({ section, video }: FeaturedVideoSectionProps) {
  const { locale } = useLocale()
  const [playing, setPlaying] = useState(false)
  const [posterIndex, setPosterIndex] = useState(0)

  const scheme = section.colorScheme
  const fg = schemeForeground(scheme)
  const linkStyle = schemeGoldLinkStyle(scheme)
  const animate = section.slideIn !== false
  const { ref, inView } = useInView<HTMLDivElement>()

  const posterCandidates = useMemo(
    () =>
      photographyVideoPosterCandidates({
        title: video.title,
        videoUrl: video.videoUrl,
        image: video.image,
        scheduleSlug: video.scheduleSlug,
      }),
    [video],
  )
  const poster = posterCandidates[posterIndex]
  const posterProps = poster ? netlifyImgSet(poster, 960, 540, 'cover', '(max-width: 1024px) 100vw, 50vw') : null

  const metaParts = [video.composer, video.subtitle, video.year].filter(
    (part): part is string => Boolean(part?.trim()),
  )

  const scheduleHref = `/{-$locale}/schedule/$slug`
  const linkLabel = section.linkText?.trim() || 'View performance details'

  return (
    <section
      className="section-vertical-padding"
      aria-label="Featured performance video"
      data-sb-field-path="featuredVideoColorScheme"
      style={{ background: schemePageBandBackground(scheme) }}
    >
      <div className="max-w-site mx-auto px-4 lg:px-12">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''}`}
        >
          <div className="order-2 lg:order-1">
            {section.eyebrow?.trim() && (
              <p
                className="text-xs uppercase tracking-[0.3em] font-body font-semibold mb-6"
                style={{ color: fg.eyebrow }}
                data-sb-field-path="featuredVideoEyebrow"
              >
                {section.eyebrow}
              </p>
            )}
            <h2
              className="font-display text-4xl lg:text-[2.75rem] italic leading-tight mb-6"
              style={{ color: fg.heading }}
              data-sb-field-path="featuredVideoTitle"
            >
              {section.title}
            </h2>
            <div className="w-12 h-px mb-6" style={{ background: fg.divider }} />
            {section.description?.trim() && (
              <p
                className="font-body text-base leading-relaxed mb-6"
                style={{ color: fg.body }}
                data-sb-field-path="featuredVideoDescription"
              >
                {section.description}
              </p>
            )}
            {metaParts.length > 0 && (
              <p className="font-display text-lg italic leading-snug mb-8" style={{ color: fg.heading }}>
                {metaParts.join(' · ')}
              </p>
            )}
            <Link
              to={scheduleHref}
              params={{ ...localeRouteParams(locale), slug: video.scheduleSlug }}
              className="gold-link font-body text-xs uppercase tracking-[0.28em]"
              style={linkStyle}
              data-sb-field-path="featuredVideoLinkText"
            >
              {`${linkLabel} →`}
            </Link>
          </div>

          <div className="order-1 lg:order-2">
            <div className="featured-video-frame media-radius overflow-hidden relative w-full bg-[color-mix(in_srgb,var(--palette-wine)_12%,transparent)]">
              {playing ? (
                <iframe
                  className="featured-video-iframe"
                  src={youtubeIframeSrc(video.videoUrl)}
                  title={`${video.title} — performance video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  className="featured-video-poster group relative block h-full w-full border-0 p-0 cursor-pointer text-left"
                  aria-label={`Play video: ${video.title}`}
                  onClick={() => setPlaying(true)}
                >
                  {posterProps && (
                    <img
                      {...posterProps}
                      alt=""
                      aria-hidden
                      width={960}
                      height={540}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                      onError={() => {
                        if (posterIndex < posterCandidates.length - 1) {
                          setPosterIndex((index) => index + 1)
                        }
                      }}
                    />
                  )}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(to top, color-mix(in srgb, var(--palette-wine) 48%, transparent) 0%, transparent 55%)',
                    }}
                    aria-hidden
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="play-btn play-btn--featured transition-transform duration-300 group-hover:scale-105">
                      <Play
                        size={24}
                        fill="currentColor"
                        aria-hidden
                        style={{ color: 'var(--media-caption-text-color)', marginLeft: 3 }}
                      />
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
