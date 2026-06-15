export type SplitGridBadgeSource = {
  badges?: string[] | null
  decorativeEyebrow?: string | null
}

/** Non-empty badge labels; falls back to legacy `decorativeEyebrow`. */
export function splitGridBadges(item: SplitGridBadgeSource): string[] {
  const fromArray = (item.badges ?? [])
    .map((badge) => badge.trim())
    .filter((badge) => badge.length > 0)

  if (fromArray.length > 0) return fromArray

  const legacy = item.decorativeEyebrow?.trim()
  return legacy ? [legacy] : []
}
