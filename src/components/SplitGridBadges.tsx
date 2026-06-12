import { useEffect, useState } from 'react'

import {
  eventYearFromHref,
  eventYearFromSlug,
  isScheduleBadgeToday,
  scheduleBadgeLabel,
} from '@/lib/schedule-badge-date'

export type SplitGridBadgesProps = {
  badges: string[]
  /** Stackbit field path prefix, e.g. `badges` → `badges.0` */
  fieldPathPrefix?: string
  /** Schedule slug (`madama-butterfly-2026`) or href (`/schedule/...`) for year inference. */
  eventRef?: string
}

function resolveEventYear(eventRef?: string): number | undefined {
  if (!eventRef?.trim()) return undefined
  const trimmed = eventRef.trim()
  if (trimmed.startsWith('/')) return eventYearFromHref(trimmed)
  return eventYearFromSlug(trimmed)
}

/** Visitor-local “today” — avoids SSR timezone mismatches for TODAY badges. */
function useClientToday(): Date | undefined {
  const [today, setToday] = useState<Date>()

  useEffect(() => {
    setToday(new Date())
  }, [])

  return today
}

export function SplitGridBadges({ badges, fieldPathPrefix, eventRef }: SplitGridBadgesProps) {
  const today = useClientToday()
  const eventYear = resolveEventYear(eventRef)

  if (badges.length === 0) return null

  return (
    <div className="split-grid-badges">
      {badges.map((badge, badgeIndex) => {
        const isToday = today ? isScheduleBadgeToday(badge, today, eventYear) : false
        return (
          <span
            key={`${badge}-${badgeIndex}`}
            className={`split-grid-link font-body text-xs uppercase tracking-[0.22em]${isToday ? ' split-grid-link--today' : ''}`}
            {...(fieldPathPrefix
              ? { 'data-sb-field-path': `${fieldPathPrefix}.${badgeIndex}` }
              : {})}
          >
            {today ? scheduleBadgeLabel(badge, today, eventYear) : badge}
          </span>
        )
      })}
    </div>
  )
}
