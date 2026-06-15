import { resolvePublicPath } from '@/lib/public-path'

const DEFAULT_BRAND_LOGO_ALT = 'Sol Risé Soprano'

type SiteBrandLogoProps = {
  src: string
  alt?: string
  variant: 'header' | 'footer'
  fieldPath?: string
}

export function SiteBrandLogo({ src, alt = DEFAULT_BRAND_LOGO_ALT, variant, fieldPath }: SiteBrandLogoProps) {
  const sizeClass =
    variant === 'header'
      ? 'h-16 w-auto max-w-[min(56vw,14rem)]'
      : 'h-20 sm:h-24 w-auto max-w-[min(100%,18rem)]'

  return (
    <img
      src={resolvePublicPath(src)}
      alt={alt}
      className={`${sizeClass} object-contain object-left`}
      decoding="async"
      data-sb-field-path={fieldPath}
    />
  )
}
