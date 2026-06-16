import { netlifyImgSet } from '@/lib/netlify-image'
import { resolvePublicPath } from '@/lib/public-path'

type SplitGridPanelImageProps = {
  image: string
  loading?: 'lazy' | 'eager'
}

/** Decorative cover image for split-grid and schedule event cards. */
export function SplitGridPanelImage({ image, loading = 'lazy' }: SplitGridPanelImageProps) {
  const imagePath = resolvePublicPath(image)

  return (
    <img
      {...netlifyImgSet(imagePath, 600, 750)}
      alt=""
      aria-hidden
      width={600}
      height={750}
      loading={loading}
      decoding="async"
      className="split-grid-panel-image"
    />
  )
}
