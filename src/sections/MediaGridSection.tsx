import { Play } from 'lucide-react'

import { netlifyImg } from '@/lib/netlify-image'
import { schemeForeground, schemePageBandBackground } from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import type { HomeMediaSection, MediaFilter, MediaItem } from './types'

export type MediaGridSectionProps = {
  section: HomeMediaSection
  mediaItems: MediaItem[]
  filter: MediaFilter
  onFilterChange: (filter: MediaFilter) => void
  onOpenMedia: (media: { kind: 'video' | 'image'; url: string; title?: string | null }) => void
}

export function MediaGridSection({
  section,
  mediaItems,
  filter,
  onFilterChange,
  onOpenMedia,
}: MediaGridSectionProps) {
  const filtered =
    filter === 'all' ? mediaItems : mediaItems.filter((m) => m.type === filter)

  const scheme = section.colorScheme
  const fg = schemeForeground(scheme)
  const animate = section.slideIn !== false
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section
      className="section-vertical-padding"
      style={{ background: schemePageBandBackground(scheme) }}
      data-sb-field-path="mediaGridColorScheme"
    >
      <div
        ref={ref}
        className={`max-w-site mx-auto px-6 lg:px-12 ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''}`}
      >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <p
                className="text-xs uppercase tracking-[0.3em] font-body font-semibold mb-4"
                style={{ color: fg.eyebrow }}
                data-sb-field-path="mediaEyebrow"
              >
                {section.eyebrow}
              </p>
              <h2
                className="font-display text-4xl lg:text-5xl italic"
                style={{ color: fg.heading }}
                data-sb-field-path="mediaTitle"
              >
                {section.title}
              </h2>
            </div>

            <div
              className="flex gap-1 p-1 rounded-[var(--media-radius)]"
              style={{ background: 'var(--pill-track-background-color)' }}
              role="group"
              aria-label="Filter media by type"
            >
              {(['all', 'video', 'image'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => onFilterChange(f)}
                  aria-pressed={filter === f}
                  className="px-5 py-2 text-xs uppercase tracking-widest font-body font-semibold transition-all duration-300 rounded-[var(--media-radius-inner)]"
                  style={
                    filter === f
                      ? {
                          background: 'var(--accent-color)',
                          color: 'var(--media-filter-tab-active-text-color)',
                        }
                      : { color: 'var(--subtle-text-color)' }
                  }
                >
                  {f === 'all' ? 'All' : f === 'video' ? 'Videos' : 'Photos'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <button
                key={item._meta.path}
                type="button"
                className="relative img-zoom media-radius cursor-pointer group block w-full border-0 p-0 text-left"
                style={{ aspectRatio: '16/10' }}
                data-sb-object-id={`content/media/${item._meta.path}.md`}
                aria-label={
                  item.type === 'video'
                    ? `Play video: ${item.title}`
                    : `View image: ${item.title}`
                }
                onClick={() => {
                  if (item.type === 'video' && item.videoUrl) {
                    onOpenMedia({ kind: 'video', url: item.videoUrl, title: item.title })
                  }
                  if (item.type === 'image') {
                    onOpenMedia({ kind: 'image', url: item.thumbnail, title: item.title })
                  }
                }}
              >
                <img
                  src={netlifyImg(item.thumbnail, 800, 500)}
                  alt=""
                  aria-hidden
                  className="w-full h-full object-cover"
                  data-sb-field-path="thumbnail#@src"
                />
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, color-mix(in srgb, var(--palette-wine) 88%, transparent) 0%, color-mix(in srgb, var(--palette-pine) 32%, transparent) 55%, transparent 100%)',
                  }}
                  aria-hidden
                >
                  {item.type === 'video' && (
                    <div className="play-btn mb-4">
                      <Play
                        size={20}
                        fill="currentColor"
                        aria-hidden
                        style={{
                          color: 'var(--media-caption-text-color)',
                          marginLeft: 2,
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
                  <p
                    className="font-display text-lg italic leading-tight"
                    style={{ color: 'var(--media-caption-text-color)' }}
                    data-sb-field-path="title"
                  >
                    {item.title}
                  </p>
                  <p
                    className="font-body text-xs mt-1 line-clamp-1"
                    style={{ color: 'var(--media-caption-text-muted-color)' }}
                    data-sb-field-path="description"
                  >
                    {item.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
      </div>
    </section>
  )
}
