import { netlifyImgSet } from '@/lib/netlify-image'
import { initialLetter, showsPlaceholderImage } from '@/lib/placeholder-image'

type RoleCardImageProps = {
  characterName: string
  heroImage: string
  alt: string
  eyebrowColor: string
}

export function RoleCardImage({ characterName, heroImage, alt, eyebrowColor }: RoleCardImageProps) {
  const letter = initialLetter(characterName)

  if (!showsPlaceholderImage(heroImage)) {
    return (
      <img
        {...netlifyImgSet(heroImage, 360, 450)}
        alt={alt}
        className="w-full h-full min-h-[180px] object-cover"
        style={{ objectPosition: 'top center' }}
        loading="lazy"
        decoding="async"
        data-sb-field-path="heroImage"
      />
    )
  }

  return (
    <div
      className="w-full h-full min-h-[180px] flex items-center justify-center px-4 text-center font-display italic text-3xl sm:text-4xl"
      style={{ color: eyebrowColor }}
      role="img"
      aria-label={alt}
    >
      {letter}
    </div>
  )
}
