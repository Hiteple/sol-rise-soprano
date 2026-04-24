import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** YouTube's /watch page cannot be iframed (X-Frame-Options). Use /embed/… for iframe src. */
export function youtubeIframeSrc(videoUrl: string): string {
  try {
    const u = new URL(videoUrl.trim())
    const host = u.hostname.replace(/^www\./, '')

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (u.pathname === '/watch') {
        const id = u.searchParams.get('v')
        if (id) {
          const embed = new URL(`https://www.youtube.com/embed/${id}`)
          embed.searchParams.set('autoplay', '1')
          return embed.toString()
        }
      }
      if (u.pathname.startsWith('/embed/')) {
        u.searchParams.set('autoplay', '1')
        return u.toString()
      }
    }
    if (host === 'youtu.be') {
      const id = u.pathname.slice(1).split('/')[0]
      if (id) {
        const embed = new URL(`https://www.youtube.com/embed/${id}`)
        embed.searchParams.set('autoplay', '1')
        return embed.toString()
      }
    }

    u.searchParams.set('autoplay', '1')
    return u.toString()
  } catch {
    const sep = videoUrl.includes('?') ? '&' : '?'
    return `${videoUrl}${sep}autoplay=1`
  }
}
