import { useMemo, useState } from 'react'
import { Play } from 'lucide-react'

import { netlifyImgSet } from '@/lib/netlify-image'
import {
  photographyVideoPosterCandidates,
  type PhotographyVideo,
} from '@/lib/schedule-photography'

type PhotographyVideoTileProps = {
  video: PhotographyVideo
  ariaLabel?: string
  onClick: () => void
  /** Stackbit object id for the schedule event that owns `videoUrl`. */
  stackbitObjectId?: string
  videoFieldPath?: string
  /** Tile shape. Default portrait matches schedule/role media grids. */
  aspectRatio?: '4/5' | '16/9'
}

export function PhotographyVideoTile({
  video,
  ariaLabel,
  onClick,
  stackbitObjectId,
  videoFieldPath,
  aspectRatio = '4/5',
}: PhotographyVideoTileProps) {
  const candidates = useMemo(() => photographyVideoPosterCandidates(video), [video])
  const [candidateIndex, setCandidateIndex] = useState(0)
  const poster = candidates[candidateIndex]
  const isLandscape = aspectRatio === '16/9'
  const imgWidth = isLandscape ? 800 : 480
  const imgHeight = isLandscape ? 450 : 600

  if (!poster) return null

  return (
    <button
      type="button"
      className="img-zoom relative block media-radius border-0 p-0 text-left cursor-pointer w-full"
      style={{ aspectRatio }}
      aria-label={ariaLabel ?? `Play video: ${video.title}`}
      {...(stackbitObjectId ? { 'data-sb-object-id': stackbitObjectId } : {})}
      {...(videoFieldPath ? { 'data-sb-field-path': videoFieldPath } : {})}
      onClick={onClick}
    >
      <img
        {...netlifyImgSet(poster, imgWidth, imgHeight)}
        alt=""
        aria-hidden
        width={imgWidth}
        height={imgHeight}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        onError={() => {
          if (candidateIndex < candidates.length - 1) {
            setCandidateIndex((index) => index + 1)
          }
        }}
      />
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, color-mix(in srgb, var(--palette-wine) 55%, transparent) 0%, transparent 60%)',
        }}
        aria-hidden
      >
        <div className="play-btn">
          <Play
            size={20}
            fill="currentColor"
            aria-hidden
            style={{ color: 'var(--media-caption-text-color)', marginLeft: 2 }}
          />
        </div>
      </div>
    </button>
  )
}
