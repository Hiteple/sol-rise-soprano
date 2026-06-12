import {
  eventYearFromEventRef,
  isScheduleBadgePast,
  isScheduleBadgeToday,
  scheduleBadgeLabel,
} from '@/lib/schedule-badge-date'
import { useClientToday } from '@/lib/use-client-today'

export type SchedulePerformanceDateBadgesProps = {
  badges: string[]
  eventRef: string
  markPastBadges?: boolean
  fieldPathPrefix?: string
}

export function SchedulePerformanceDateBadges({
  badges,
  eventRef,
  markPastBadges = false,
  fieldPathPrefix = 'badges',
}: SchedulePerformanceDateBadgesProps) {
  const today = useClientToday()
  const eventYear = eventYearFromEventRef(eventRef)

  if (badges.length === 0) return null

  return (
    <ul className="flex flex-wrap gap-2">
      {badges.map((badge, badgeIndex) => {
        const isToday = today ? isScheduleBadgeToday(badge, today, eventYear) : false
        const isPast =
          markPastBadges && today && !isToday ? isScheduleBadgePast(badge, today, eventYear) : false

        return (
          <li
            key={`${badge}-${badgeIndex}`}
            className={`schedule-detail-badge font-body text-xs uppercase tracking-[0.2em]${isToday ? ' schedule-detail-badge--today' : ''}${isPast ? ' schedule-detail-badge--past' : ''}`}
            {...(fieldPathPrefix
              ? { 'data-sb-field-path': `${fieldPathPrefix}.${badgeIndex}` }
              : {})}
          >
            {today ? scheduleBadgeLabel(badge, today, eventYear) : badge}
          </li>
        )
      })}
    </ul>
  )
}
