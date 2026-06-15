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
      ? 'h-10 sm:h-11 w-auto max-w-[min(48vw,10.5rem)]'
      : 'h-12 sm:h-14 w-auto max-w-[12rem]'

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
