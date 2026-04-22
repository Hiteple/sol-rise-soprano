import { Play } from 'lucide-react'

import { netlifyImg } from '@/lib/netlify-image'
import type { HomeMediaSection, MediaFilter, MediaItem } from './types'

export type MediaGridSectionProps = {
  section: HomeMediaSection
  mediaItems: MediaItem[]
  filter: MediaFilter
  onFilterChange: (filter: MediaFilter) => void
  onOpenVideo: (videoUrl: string) => void
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

  return (
    <section
      className="py-24 lg:py-36"
      style={{ background: 'var(--page-background-color)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <p
                className="text-xs uppercase tracking-[0.3em] font-body font-semibold mb-4"
                style={{ color: 'var(--accent-color)' }}
                data-sb-field-path="mediaEyebrow"
              >
                {section.eyebrow}
              </p>
              <h2
                className="font-display text-4xl lg:text-5xl italic"
                style={{ color: 'var(--heading-color)' }}
                data-sb-field-path="mediaTitle"
              >
                {section.title}
              </h2>
            </div>

            <div
              className="flex gap-1 p-1"
              style={{ background: 'var(--pill-track-background-color)' }}
            >
              {(['all', 'video', 'image'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => onFilterChange(f)}
                  className="px-5 py-2 text-xs uppercase tracking-widest font-body font-semibold transition-all duration-300"
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
              <div
                key={item._meta.path}
                className="relative img-zoom cursor-pointer group"
                style={{ aspectRatio: '16/10' }}
                data-sb-object-id={`content/media/${item._meta.path}.md`}
                onClick={() => {
                  if (item.type === 'video' && item.videoUrl) {
                    onOpenVideo(item.videoUrl)
                  }
                }}
              >
                <img
                  src={netlifyImg(item.thumbnail, 800, 500)}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  data-sb-field-path="thumbnail#@src"
                />
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300"
                  style={{
                    background:
                      'linear-gradient(to top, color-mix(in srgb, var(--palette-wine) 88%, transparent) 0%, color-mix(in srgb, var(--palette-pine) 32%, transparent) 55%, transparent 100%)',
                  }}
                >
                  {item.type === 'video' && (
                    <div className="play-btn mb-4">
                      <Play
                        size={20}
                        fill="currentColor"
                        style={{
                          color: 'var(--media-caption-text-color)',
                          marginLeft: 2,
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
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
              </div>
            ))}
          </div>
      </div>
    </section>
  )
}
