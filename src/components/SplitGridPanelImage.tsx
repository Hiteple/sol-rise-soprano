import {
  scheduleCardImageProps,
  splitGridPanelImageProps,
} from '@/lib/netlify-image'
import { resolvePublicPath } from '@/lib/public-path'

type SplitGridPanelImageProps = {
  image: string
  loading?: 'lazy' | 'eager'
  /** `featured` = 3-column split grid; `schedule` = compact event cards. */
  layout?: 'featured' | 'schedule'
}

/** Decorative cover image for split-grid and schedule event cards. */
export function SplitGridPanelImage({
  image,
  loading = 'lazy',
  layout = 'featured',
}: SplitGridPanelImageProps) {
  const imagePath = resolvePublicPath(image)
  const imgProps =
    layout === 'schedule'
      ? scheduleCardImageProps(imagePath)
      : splitGridPanelImageProps(imagePath)

  return (
    <img
      {...imgProps}
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
