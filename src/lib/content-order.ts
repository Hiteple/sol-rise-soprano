/** `order: 0` marks draft content — prepared in the repo but hidden until order is set. */
export const DRAFT_CONTENT_ORDER = 0

export function isPublishedContent(order: number | undefined | null): boolean {
  return order !== DRAFT_CONTENT_ORDER
}

export function filterPublishedContent<T extends { order?: number }>(items: readonly T[]): T[] {
  return items.filter((item) => isPublishedContent(item.order))
}

export function sortByContentOrder<T extends { order?: number }>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

export function publishedContentSorted<T extends { order?: number }>(items: readonly T[]): T[] {
  return sortByContentOrder(filterPublishedContent(items))
}
