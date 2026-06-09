export type GalleryLinkItem = {
  roleSlug?: string
  gallerySlug?: string
}

export type ScheduleGallerySource = {
  status: 'upcoming' | 'past'
  roleSlug?: string
  gallerySlug?: string
}

/** Past events: photos linked by `roleSlug` or, for concerts, by shared `gallerySlug`. */
export function relatedGalleryForScheduleEvent<T extends GalleryLinkItem>(
  event: ScheduleGallerySource,
  galleryItems: T[],
): T[] {
  if (event.status !== 'past') return []

  const roleSlug = event.roleSlug?.trim()
  const gallerySlug = event.gallerySlug?.trim()
  if (!roleSlug && !gallerySlug) return []

  return galleryItems.filter((item) => {
    if (roleSlug && item.roleSlug === roleSlug) return true
    if (gallerySlug && item.gallerySlug === gallerySlug) return true
    return false
  })
}
