/** Max date badges shown on schedule cards before a "+N more" overflow badge. */
export const SCHEDULE_DATE_BADGE_CARD_LIMIT = 2

export function collapseScheduleDateBadges(
  badges: readonly string[],
  limit = SCHEDULE_DATE_BADGE_CARD_LIMIT,
): { visible: string[]; overflowCount: number } {
  const trimmed = badges.map((badge) => badge.trim()).filter((badge) => badge.length > 0)
  if (trimmed.length <= limit) {
    return { visible: trimmed, overflowCount: 0 }
  }
  return {
    visible: trimmed.slice(0, limit),
    overflowCount: trimmed.length - limit,
  }
}

export function formatScheduleMoreDates(template: string, count: number): string {
  return template.replace('{count}', String(count))
}
