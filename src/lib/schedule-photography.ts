import type { GalleryLightboxItem } from '@/lib/gallery-photoswipe'
import { filterPublishedContent } from '@/lib/content-order'
import { documentSlug } from '@/lib/i18n/content'
import { youtubeThumbnailCandidates } from '@/lib/utils'

export type GalleryPhoto = {
  image: string
  alt: string
  title: string
  photographer?: string
}

export type PhotographyVideo = {
  title: string
  videoUrl: string
  image?: string
  /** Schedule slug when sourced from a past event (for Stackbit object linking). */
  scheduleSlug?: string
}

type ScheduleVideoSource = {
  _meta: { path: string }
  title: string
  videoUrl?: string
  image?: string
  year?: string
  status: 'upcoming' | 'past'
  roleSlug?: string
  order?: number
}

export function scheduleVideosForRole(
  roleSlug: string,
  events: readonly ScheduleVideoSource[],
): PhotographyVideo[] {
  const slug = roleSlug.trim()
  if (!slug) return []

  return filterPublishedContent(
    events.filter(
      (event) =>
        event.status === 'past' &&
        event.roleSlug?.trim() === slug &&
        Boolean(event.videoUrl?.trim()),
    ),
  )
    .sort((a, b) => {
      const yearDiff = Number(b.year ?? 0) - Number(a.year ?? 0)
      if (yearDiff !== 0) return yearDiff
      return (a.order ?? 0) - (b.order ?? 0)
    })
    .map((event) => ({
      title: event.title,
      videoUrl: event.videoUrl!.trim(),
      image: event.image,
      scheduleSlug: documentSlug(event),
    }))
}

export function photographyLightboxItems(
  videos: PhotographyVideo[],
  galleryPhotos: GalleryPhoto[],
): GalleryLightboxItem[] {
  const items: GalleryLightboxItem[] = []

  for (const video of videos) {
    const poster = photographyVideoPosterCandidates(video)[0]
    items.push({
      videoUrl: video.videoUrl,
      image: poster,
      alt: `${video.title} performance video`,
      title: video.title,
    })
  }

  for (const photo of galleryPhotos) {
    items.push({
      image: photo.image,
      alt: photo.alt,
      title: photo.title,
      photographer: photo.photographer,
    })
  }

  return items
}

export function schedulePhotographyLightboxItems(
  event: { title: string; videoUrl?: string; image?: string },
  galleryPhotos: GalleryPhoto[],
): GalleryLightboxItem[] {
  const videoUrl = event.videoUrl?.trim()
  const videos: PhotographyVideo[] = videoUrl
    ? [{ title: event.title, videoUrl, image: event.image }]
    : []

  return photographyLightboxItems(videos, galleryPhotos)
}

export function rolePhotographyLightboxItems(
  videos: PhotographyVideo[],
  galleryPhotos: GalleryPhoto[],
): GalleryLightboxItem[] {
  return photographyLightboxItems(videos, galleryPhotos)
}

/** YouTube poster (best → sd → hq), then optional schedule `image` fallback. */
export function photographyVideoPosterCandidates(video: PhotographyVideo): string[] {
  const fromYoutube = youtubeThumbnailCandidates(video.videoUrl)
  const scheduleImage = video.image?.trim()
  if (fromYoutube.length > 0) {
    return scheduleImage ? [...fromYoutube, scheduleImage] : fromYoutube
  }
  return scheduleImage ? [scheduleImage] : []
}

export function photographyVideoPoster(video: PhotographyVideo): string {
  return photographyVideoPosterCandidates(video)[0] ?? ''
}
