import { netlifyImgSet } from '@/lib/netlify-image'
import { photographerCreditLabel } from '@/lib/photographer-credit'
import { resolvePublicPath } from '@/lib/public-path'

type PhotographyGalleryTileProps = {
  title: string
  image: string
  alt: string
  photographer?: string
  onClick: () => void
  stackbitObjectId?: string
  titleFieldPath?: string
  photographerFieldPath?: string
  imageFieldPath?: string
}

export function PhotographyGalleryTile({
  title,
  image,
  alt,
  photographer,
  onClick,
  stackbitObjectId,
  titleFieldPath = 'title',
  photographerFieldPath = 'photographer',
  imageFieldPath = 'image',
}: PhotographyGalleryTileProps) {
  const photographerCredit = photographerCreditLabel(photographer)
  const imagePath = resolvePublicPath(image)

  return (
    <button
      type="button"
      className="group img-zoom relative block media-radius overflow-hidden border-0 p-0 text-left cursor-pointer w-full"
      style={{ aspectRatio: '4/5' }}
      aria-label={`View larger image: ${title}`}
      {...(stackbitObjectId ? { 'data-sb-object-id': stackbitObjectId } : {})}
      onClick={onClick}
    >
      <img
        {...netlifyImgSet(imagePath, 480, 600)}
        alt={alt}
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        data-sb-field-path={imageFieldPath}
      />
      <div className="gallery-tile-caption" aria-hidden>
        <div>
          <p
            className="font-display italic text-base"
            style={{ color: 'var(--media-caption-text-color)' }}
            data-sb-field-path={titleFieldPath}
          >
            {title}
          </p>
          {photographerCredit && (
            <p
              className="font-body text-xs uppercase tracking-widest mt-1"
              style={{ color: 'var(--media-caption-text-color)' }}
              data-sb-field-path={photographerFieldPath}
            >
              {photographerCredit}
            </p>
          )}
        </div>
      </div>
    </button>
  )
}
