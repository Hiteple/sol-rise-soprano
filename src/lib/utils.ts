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

/**
 * Public poster frame served by YouTube (no API key).
 * `hq` ≈ 480×360; `max` is higher-res when the uploader provided one.
 */
export function youtubeThumbnailUrl(
  videoUrl: string,
  quality: 'hq' | 'max' = 'hq',
): string | null {
  const id = youtubeVideoId(videoUrl)
  if (!id) return null
  const file = quality === 'max' ? 'maxresdefault.jpg' : 'hqdefault.jpg'
  return `https://img.youtube.com/vi/${id}/${file}`
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
