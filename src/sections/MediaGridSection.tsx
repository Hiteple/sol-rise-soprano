import { Play } from 'lucide-react'

import { SlidingTabGroup } from '@/components/SlidingTabGroup'
import { TabGridEmptyState } from '@/components/TabGridEmptyState'
import { resolveMediaThumbnail } from '@/lib/media-thumbnail'
import { netlifyImgSet } from '@/lib/netlify-image'
import { schemeForeground, schemePageBandBackground } from '@/lib/section-color-scheme'
import { mediaFilterEmptyCopy } from '@/lib/tab-grid-empty-copy'
import { useInView } from '@/lib/use-in-view'
import type { HomeMediaSection, MediaFilter, MediaItem } from './types'

export type MediaGridSectionProps = {
  section: HomeMediaSection
  mediaItems: MediaItem[]
  filter: MediaFilter
  onFilterChange: (filter: MediaFilter) => void
  onOpenVideo: (media: { url: string; title?: string | null }) => void
}

const cardClassName =
  'relative img-zoom media-radius cursor-pointer group block w-full border-0 p-0 text-left'

function MediaGridCardContent({ item }: { item: MediaItem }) {
  const thumbnail = resolveMediaThumbnail(item)

  return (
    <>
      <img
        {...netlifyImgSet(thumbnail, 800, 500)}
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
    </>
  )
}

export function MediaGridSection({
  section,
  mediaItems,
  filter,
  onFilterChange,
  onOpenVideo,
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
        className={`max-w-site mx-auto px-4 lg:px-12 ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''}`}
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

            <SlidingTabGroup
              ariaLabel="Filter media by type"
              value={filter}
              onChange={onFilterChange}
              options={[
                { value: 'all', label: 'All' },
                { value: 'image', label: 'Explore' },
                { value: 'video', label: 'Watch' },
              ]}
            />
          </div>

          {filtered.length === 0 ? (
            <TabGridEmptyState
              {...mediaFilterEmptyCopy(filter)}
              headingColor={fg.heading}
              bodyColor={fg.body}
            />
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => {
              const objectId = `content/media/${item._meta.path}.md`
              const cardStyle = { aspectRatio: '16/10' as const }

              if (item.type === 'image') {
                const imageHref = item.imageUrl?.trim() ?? ''
                if (!imageHref) {
                  return (
                    <div
                      key={item._meta.path}
                      className={`${cardClassName} cursor-default`}
                      style={cardStyle}
                      data-sb-object-id={objectId}
                    >
                      <MediaGridCardContent item={item} />
                    </div>
                  )
                }

                return (
                  <a
                    key={item._meta.path}
                    href={imageHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClassName}
                    style={cardStyle}
                    data-sb-object-id={objectId}
                    data-sb-field-path="imageUrl"
                    aria-label={`Open link: ${item.title}`}
                  >
                    <MediaGridCardContent item={item} />
                  </a>
                )
              }

              return (
                <button
                  key={item._meta.path}
                  type="button"
                  className={cardClassName}
                  style={cardStyle}
                  data-sb-object-id={objectId}
                  aria-label={`Play video: ${item.title}`}
                  onClick={() => {
                    if (item.videoUrl) {
                      onOpenVideo({ url: item.videoUrl, title: item.title })
                    }
                  }}
                >
                  <MediaGridCardContent item={item} />
                </button>
              )
            })}
          </div>
          )}
      </div>
    </section>
  )
}
