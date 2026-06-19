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

const CDN_FORMAT: NetlifyImgOptions = { q: 75 }

const WIDTH_STEPS = [400, 480, 640, 768, 800, 960, 1024, 1200, 1280, 1600, 1920, 2400] as const

/** `sizes` strings aligned with common layout breakpoints in this site. */
export const IMAGE_SIZES = {
  fullViewport: '100vw',
  halfColumn: '(max-width: 1024px) 100vw, 50vw',
  splitGridThird: '(max-width: 1024px) 100vw, 33vw',
  scheduleCard: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw',
  roleFeature: '(max-width: 1024px) 100vw, 60vw',
  thumbnailColumn: '(max-width: 640px) 100vw, 180px',
  organizationStrip: '(max-width: 1024px) 50vw, 25vw',
  brandLogoHeader: 'min(56vw, 14rem)',
  brandLogoFooter: 'min(100%, 18rem)',
} as const

export const HERO_IMAGE_WIDTHS = [640, 960, 1280] as const
export const HERO_DEFAULT_WIDTH = 960
export const HERO_DEFAULT_HEIGHT = 540
export const HALF_COLUMN_DEFAULT_WIDTH = 800
export const HALF_COLUMN_DEFAULT_HEIGHT = 1000
export const HALF_COLUMN_WIDTHS = [480, 640, 800] as const
export const QUOTE_BANNER_WIDTHS = [640, 960, 1280, 1920] as const

/** Width candidates up to `maxWidth` (no automatic 2× jump). */
export function responsiveWidthsUpTo(maxWidth: number, extra?: number[]): number[] {
  const picked: number[] = WIDTH_STEPS.filter((step) => step <= maxWidth)
  for (const width of extra ?? []) {
    if (width <= maxWidth && !picked.includes(width)) picked.push(width)
  }
  if (!picked.includes(maxWidth)) picked.push(maxWidth)
  return [...new Set(picked)].sort((a, b) => a - b)
}

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
 * Format is negotiated by Netlify Image CDN (AVIF/WebP) when `fm` is omitted.
 */
export function netlifyImgSet(
  url: string,
  w: number,
  h?: number,
  fit = 'cover',
  sizes?: string,
  widths?: number[],
) {
  if (!isNetlifyTransformableUrl(url)) {
    return { src: url.trim() }
  }

  if (!useNetlifyImageCdn()) {
    return { src: resolvePublicPath(url) }
  }

  const resolvedWidths = widths ?? responsiveWidthsUpTo(w)
  const srcSet = resolvedWidths
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

/** Home hero — full viewport LCP image with stepped `srcset`. */
export function heroImageProps(url: string) {
  return netlifyImgSet(
    url,
    HERO_DEFAULT_WIDTH,
    HERO_DEFAULT_HEIGHT,
    'cover',
    IMAGE_SIZES.fullViewport,
    [...HERO_IMAGE_WIDTHS],
  )
}

/** `<link rel="preload">` for home hero with responsive candidates. */
export function heroImagePreloadLink(url: string) {
  const { srcSet, sizes } = heroImageProps(url)
  const href = useNetlifyImageCdn()
    ? netlifyImg(url, 640, 360, 'cover')
    : resolvePublicPath(url)

  return {
    rel: 'preload' as const,
    href,
    as: 'image' as const,
    fetchPriority: 'high' as const,
    imageSrcSet: srcSet,
    imageSizes: sizes,
  }
}

/** About / half-column portrait blocks on home and career pages. */
export function halfColumnImageProps(
  url: string,
  w = HALF_COLUMN_DEFAULT_WIDTH,
  h = HALF_COLUMN_DEFAULT_HEIGHT,
) {
  return netlifyImgSet(
    url,
    w,
    h,
    'cover',
    IMAGE_SIZES.halfColumn,
    [...HALF_COLUMN_WIDTHS],
  )
}

/** Featured events split-grid panels (~3 columns on desktop). */
export function splitGridPanelImageProps(url: string) {
  return netlifyImgSet(
    url,
    600,
    750,
    'cover',
    IMAGE_SIZES.splitGridThird,
    [400, 600, 800],
  )
}

/** Compact schedule cards (up to 4 columns on desktop). */
export function scheduleCardImageProps(url: string) {
  return netlifyImgSet(
    url,
    600,
    750,
    'cover',
    IMAGE_SIZES.scheduleCard,
    [400, 600, 800],
  )
}

/** Header/footer brand logo at display size (not full 1024px PNG). */
export function brandLogoImageProps(url: string, variant: 'header' | 'footer') {
  const w = variant === 'header' ? 224 : 288
  return netlifyImgSet(
    url,
    w,
    w,
    'contain',
    variant === 'header' ? IMAGE_SIZES.brandLogoHeader : IMAGE_SIZES.brandLogoFooter,
    variant === 'header' ? [128, 192, 224] : [160, 224, 288],
  )
}

/** Home quote banner — full-width background, lazy-loaded below the fold. */
export function quoteBannerImageProps(url: string) {
  return netlifyImgSet(
    url,
    1280,
    600,
    'cover',
    IMAGE_SIZES.fullViewport,
    [...QUOTE_BANNER_WIDTHS],
  )
}

/** Role detail feature image (main column beside stats sidebar). */
export function roleFeatureImageProps(url: string) {
  return netlifyImgSet(
    url,
    900,
    563,
    'cover',
    IMAGE_SIZES.roleFeature,
    [400, 600, 800, 900, 1200],
  )
}

/** Bio page hero portrait (half-column grid). */
export function aboutPageHeroImageProps(url: string) {
  return halfColumnImageProps(url, 800, 1000)
}

/** Role/org index list thumbnail (180px column on sm+). */
export function thumbnailColumnImageProps(url: string, w = 360, h = 450) {
  return netlifyImgSet(url, w, h, 'cover', IMAGE_SIZES.thumbnailColumn, [180, 360])
}

/** Organizations strip on home (2 cols mobile, 4 cols desktop). */
export function organizationStripImageProps(url: string) {
  return netlifyImgSet(
    url,
    480,
    360,
    'cover',
    IMAGE_SIZES.organizationStrip,
    [240, 360, 480],
  )
}
