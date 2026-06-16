import { netlifyImgSet, netlifyImgSrc } from '@/lib/netlify-image'
import { resolvePublicPath } from '@/lib/public-path'

export function galleryTileLayout(featured: boolean) {
  return featured
    ? { w: 1200, h: 675, sizes: '(max-width: 1024px) 100vw, 50vw' }
    : { w: 600, h: 750, sizes: '(max-width: 1024px) 50vw, 25vw' }
}

export function galleryTileImgProps(image: string, featured: boolean) {
  const path = resolvePublicPath(image)
  const { w, h, sizes } = galleryTileLayout(featured)
  return netlifyImgSet(path, w, h, 'cover', sizes)
}

export function galleryTilePreloadHref(image: string, featured: boolean): string {
  const path = resolvePublicPath(image)
  const { w, h } = galleryTileLayout(featured)
  return netlifyImgSrc(path, w, h)
}
