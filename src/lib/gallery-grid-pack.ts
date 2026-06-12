import type { GallerySortItem } from '@/lib/gallery-sort'

const GRID_COLUMNS = 4

type GridPackItem = GallerySortItem & {
  featuredImg?: boolean
}

function itemSpan(item: GridPackItem): number {
  return item.featuredImg ? 2 : 1
}

function groupKey(item: GallerySortItem): string {
  return item.gallerySlug?.trim() || item.roleSlug?.trim() || item.title?.trim() || ''
}

function splitByGroup<T extends GallerySortItem>(items: readonly T[]): T[][] {
  const groups: T[][] = []

  for (const item of items) {
    const key = groupKey(item)
    const last = groups.at(-1)
    if (!last || groupKey(last[0]!) !== key) {
      groups.push([item])
    } else {
      last.push(item)
    }
  }

  return groups
}

/** Places items in grid row order without skipping ahead — preserves `order` within each group. */
function packGalleryGridGroup<T extends GridPackItem>(items: readonly T[]): T[] {
  const pool = [...items]
  const result: T[] = []
  let col = 0

  while (pool.length > 0) {
    const remaining = GRID_COLUMNS - col
    const index = pool.findIndex((item) => itemSpan(item) <= remaining)

    if (index === -1) {
      col = 0
      continue
    }

    const [item] = pool.splice(index, 1)
    result.push(item)
    col += itemSpan(item)
    if (col >= GRID_COLUMNS) col = 0
  }

  return result
}

/**
 * Adjusts tile placement for the 4-col grid while keeping chronological groups intact
 * and honoring `order` inside each group. Remaining 1-cell gaps are filled via CSS dense flow.
 */
export function packGalleryGrid<T extends GridPackItem>(items: readonly T[]): T[] {
  return splitByGroup(items).flatMap((group) => packGalleryGridGroup(group))
}
