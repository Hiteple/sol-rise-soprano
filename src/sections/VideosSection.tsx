import { PhotographyVideoTile } from '@/components/PhotographyVideoTile'
import { filterPublishedContent, publishedContentSorted } from '@/lib/content-order'
import { useGalleryPhotoSwipe } from '@/lib/gallery-photoswipe'
import { photographyLightboxItems } from '@/lib/schedule-photography'
import {
  resolveColorScheme,
  schemeForeground,
  schemePageBandBackground,
} from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import type { VideosPage } from '../../schemas/site-pages'

export type VideoItem = {
  _meta: { path: string }
  title: string
  youtubeUrl: string
  order?: number
}

export type VideosSectionProps = {
  page: VideosPage | undefined
  videos: readonly VideoItem[]
}

export function VideosSection({ page, videos }: VideosSectionProps) {
  const scheme = resolveColorScheme(page?.sectionColorScheme)
  const fg = schemeForeground(scheme)
  const animate = page?.sectionSlideIn !== false
  const { ref, inView } = useInView<HTMLDivElement>()
  const { openGallery } = useGalleryPhotoSwipe()

  const items = publishedContentSorted(filterPublishedContent(videos))
  const lightboxItems = photographyLightboxItems(
    items.map((video) => ({ title: video.title, videoUrl: video.youtubeUrl })),
    [],
  )

  return (
    <section
      className="section-vertical-padding"
      style={{ background: schemePageBandBackground(scheme) }}
      data-sb-field-path="sectionColorScheme"
    >
      <div
        ref={ref}
        className={`max-w-site mx-auto px-4 lg:px-12 ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''}`}
      >
        {items.length === 0 ? (
          <p className="font-body text-base" style={{ color: fg.body }}>
            No videos published yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {items.map((video, index) => (
              <PhotographyVideoTile
                key={video._meta.path}
                video={{ title: video.title, videoUrl: video.youtubeUrl }}
                aspectRatio="16/9"
                stackbitObjectId={`content/videos/${video._meta.path}.md`}
                videoFieldPath="youtubeUrl"
                onClick={() => openGallery(lightboxItems, index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
