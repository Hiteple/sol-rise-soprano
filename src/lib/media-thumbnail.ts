import { youtubeThumbnailUrl } from '@/lib/utils'

type MediaThumbnailSource = {
  type: 'video' | 'image'
  thumbnail?: string | null
  videoUrl?: string | null
}

/** Card image: explicit thumbnail, or YouTube poster when `type` is video. */
export function resolveMediaThumbnail(item: MediaThumbnailSource): string {
  const explicit = item.thumbnail?.trim()
  if (explicit) return explicit

  if (item.type === 'video' && item.videoUrl?.trim()) {
    return youtubeThumbnailUrl(item.videoUrl, 'hq') ?? ''
  }

  return ''
}
