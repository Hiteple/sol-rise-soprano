import { netlifyImgSet } from '@/lib/netlify-image'
import { initialLetter, showsPlaceholderImage } from '@/lib/placeholder-image'

type OrganizationImageProps = {
  name: string
  image?: string
  eyebrowColor: string
  variant: 'index' | 'strip'
  imageFieldPath?: string
}

export function OrganizationImage({
  name,
  image,
  eyebrowColor,
  variant,
  imageFieldPath,
}: OrganizationImageProps) {
  const letter = initialLetter(name)
  const letterClass =
    variant === 'index' ? 'text-3xl sm:text-4xl' : 'text-3xl lg:text-4xl'

  if (!showsPlaceholderImage(image)) {
    if (variant === 'index') {
      return (
        <img
          {...netlifyImgSet(image!, 360, 450)}
          alt={name}
          className="w-full h-full object-cover min-h-[180px]"
          data-sb-field-path={imageFieldPath}
        />
      )
    }

    return (
      <img
        {...netlifyImgSet(image!, 480, 360)}
        alt=""
        aria-hidden
        className="w-full h-full object-cover"
        data-sb-field-path={imageFieldPath}
      />
    )
  }

  const layoutClass =
    variant === 'index' ? 'w-full h-full min-h-[180px]' : 'w-full h-full'

  return (
    <div
      className={`${layoutClass} flex items-center justify-center px-4 text-center font-display italic ${letterClass}`}
      style={{ color: eyebrowColor }}
      aria-hidden={variant === 'strip' ? true : undefined}
    >
      {letter}
    </div>
  )
}
