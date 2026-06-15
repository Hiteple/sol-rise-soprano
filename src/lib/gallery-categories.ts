/** Canonical gallery tab values — must match `category` on gallery markdown items. */
export const GALLERY_CATEGORIES = ['All', 'Stage', 'Backstage', 'Photobook'] as const

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number]

export function isGalleryCategory(value: string): value is GalleryCategory {
  return (GALLERY_CATEGORIES as readonly string[]).includes(value)
}
