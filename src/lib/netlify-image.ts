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

/** Netlify Image CDN transform (same-origin in production on Netlify). */
export function netlifyImg(url: string, w: number, h?: number, fit = 'cover') {
  const params = new URLSearchParams({ url, w: String(w), fit })
  if (h) params.set('h', String(h))
  return `/.netlify/images?${params.toString()}`
}

/**
 * Same as netlifyImg, but also returns a 2x `srcSet` so the image stays crisp
 * on high-DPI (Retina) displays. Spread the result onto an <img>:
 *   <img {...netlifyImgSet(url, 900, 1100)} alt="..." />
 * The browser then picks the 1x source on standard screens (lighter) and the
 * 2x source on Retina (sharper).
 *
 * Absolute external URLs (e.g. YouTube posters) load directly — Netlify transform
 * is unavailable in local dev and not needed for those hosts.
 */
export function netlifyImgSet(url: string, w: number, h?: number, fit = 'cover') {
  if (!isNetlifyTransformableUrl(url)) {
    return { src: url.trim() }
  }

  const src = netlifyImg(url, w, h, fit)
  const src2x = netlifyImg(url, w * 2, h ? h * 2 : undefined, fit)
  return { src, srcSet: `${src} 1x, ${src2x} 2x` }
}
