import { resolvePublicPath } from '@/lib/public-path'

/** Site paths and relative assets — safe to run through Netlify Image CDN. */
export function isNetlifyTransformableUrl(url: string): boolean {
  const trimmed = url.trim()
  if (!trimmed) return false
  if (trimmed.startsWith('/') || trimmed.startsWith('./')) return true

  try {
    const { protocol } = new URL(trimmed)
    return protocol !== 'http:' && protocol !== 'https:'
  } catch {
    return true
  }
}

type NetlifyImgOptions = {
  fm?: string
  q?: number
}

const CDN_FORMAT: NetlifyImgOptions = { fm: 'webp', q: 80 }

/** Netlify Image CDN transform (same-origin in production on Netlify). */
export function netlifyImg(
  url: string,
  w: number,
  h?: number,
  fit = 'cover',
  options: NetlifyImgOptions = CDN_FORMAT,
) {
  const params = new URLSearchParams({ url, w: String(w) })
  // `cover` needs a target box — without height, Netlify stretches to full source height.
  if (h != null) {
    params.set('h', String(h))
    params.set('fit', fit)
  }
  if (options.fm) params.set('fm', options.fm)
  if (options.q != null) params.set('q', String(options.q))
  return `/.netlify/images?${params.toString()}`
}

/** Netlify Image CDN runs on deploy only — not in vite dev/preview. */
function useNetlifyImageCdn(): boolean {
  return import.meta.env.VITE_NETLIFY_IMAGE_CDN === 'true'
}

/** Single image URL — CDN on Netlify deploy, otherwise the public asset path. */
export function netlifyImgSrc(url: string, w: number, h?: number, fit = 'cover'): string {
  if (!isNetlifyTransformableUrl(url)) {
    return url.trim()
  }

  if (!useNetlifyImageCdn()) {
    return resolvePublicPath(url)
  }

  return netlifyImg(url, w, h, fit)
}

/**
 * Responsive `srcSet` with width descriptors + optional `sizes`.
 * CDN output uses WebP at q=80 for smaller payloads on gallery grids and heroes.
 */
export function netlifyImgSet(
  url: string,
  w: number,
  h?: number,
  fit = 'cover',
  sizes?: string,
) {
  if (!isNetlifyTransformableUrl(url)) {
    return { src: url.trim() }
  }

  if (!useNetlifyImageCdn()) {
    return { src: resolvePublicPath(url) }
  }

  const widths = [...new Set([w, Math.min(w * 2, 2400)])]
  const srcSet = widths
    .map((width) => {
      const height = h ? Math.round((h * width) / w) : undefined
      return `${netlifyImg(url, width, height, fit)} ${width}w`
    })
    .join(', ')

  return {
    src: netlifyImg(url, w, h, fit),
    srcSet,
    sizes: sizes ?? `${w}px`,
  }
}
