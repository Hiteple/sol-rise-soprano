import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Extract a YouTube video ID from common watch / youtu.be / embed URLs. */
export function youtubeVideoId(videoUrl: string): string | null {
  try {
    const u = new URL(videoUrl.trim())
    const host = u.hostname.replace(/^www\./, '')

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (u.pathname === '/watch') {
        return u.searchParams.get('v')
      }
      const embedMatch = u.pathname.match(/^\/embed\/([^/?]+)/)
      if (embedMatch?.[1]) return embedMatch[1]
      const shortsMatch = u.pathname.match(/^\/shorts\/([^/?]+)/)
      if (shortsMatch?.[1]) return shortsMatch[1]
    }
    if (host === 'youtu.be') {
      const id = u.pathname.slice(1).split('/')[0]
      return id || null
    }
  } catch {
    return null
  }
  return null
}

const YOUTUBE_THUMBNAIL_FILES = {
  max: 'maxresdefault.jpg',
  sd: 'sddefault.jpg',
  hq: 'hqdefault.jpg',
} as const

/**
 * Public poster frames served by YouTube (no API key), highest quality first.
 * `maxresdefault` is 1280×720 when available; not every upload has it.
 */
export function youtubeThumbnailCandidates(videoUrl: string): string[] {
  const id = youtubeVideoId(videoUrl)
  if (!id) return []
  return [
    `https://img.youtube.com/vi/${id}/${YOUTUBE_THUMBNAIL_FILES.max}`,
    `https://img.youtube.com/vi/${id}/${YOUTUBE_THUMBNAIL_FILES.sd}`,
    `https://img.youtube.com/vi/${id}/${YOUTUBE_THUMBNAIL_FILES.hq}`,
  ]
}

/** Single YouTube poster URL. Prefer `youtubeThumbnailCandidates` when you can fall back on 404. */
export function youtubeThumbnailUrl(
  videoUrl: string,
  quality: 'hq' | 'sd' | 'max' = 'max',
): string | null {
  const id = youtubeVideoId(videoUrl)
  if (!id) return null
  return `https://img.youtube.com/vi/${id}/${YOUTUBE_THUMBNAIL_FILES[quality]}`
}

/** YouTube's /watch page cannot be iframed (X-Frame-Options). Use /embed/… for iframe src. */
export function youtubeIframeSrc(videoUrl: string): string {
  const id = youtubeVideoId(videoUrl)
  if (id) {
    const embed = new URL(`https://www.youtube.com/embed/${id}`)
    embed.searchParams.set('autoplay', '1')
    return embed.toString()
  }

  try {
    const u = new URL(videoUrl.trim())
    u.searchParams.set('autoplay', '1')
    return u.toString()
  } catch {
    const sep = videoUrl.includes('?') ? '&' : '?'
    return `${videoUrl}${sep}autoplay=1`
  }
}
