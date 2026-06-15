import {
  eventYearFromEventRef,
  isScheduleBadgePast,
  isScheduleBadgeToday,
  scheduleBadgeLabel,
} from '@/lib/schedule-badge-date'
import {
  collapseScheduleDateBadges,
  formatScheduleMoreDates,
} from '@/lib/schedule-badge-display'
import { useLocale } from '@/components/LocaleContext'
import { useClientToday } from '@/lib/use-client-today'

export type SplitGridBadgesProps = {
  badges: string[]
  /** Stackbit field path prefix, e.g. `badges` → `badges.0` */
  fieldPathPrefix?: string
  /** Schedule slug (`madama-butterfly-2026`) or href (`/schedule/...`) for year inference. */
  eventRef?: string
  /** Strike past dates — only for upcoming events with mixed date badges. */
  markPastBadges?: boolean
  /** Collapse to this many date badges plus a "+N more" indicator (omit to show all). */
  collapseAfter?: number
}

export function SplitGridBadges({
  badges,
  fieldPathPrefix,
  eventRef,
  markPastBadges = false,
  collapseAfter,
}: SplitGridBadgesProps) {
  const { messages } = useLocale()
  const today = useClientToday()
  const eventYear = eventYearFromEventRef(eventRef)
  const { visible, overflowCount } =
    collapseAfter === undefined
      ? { visible: badges, overflowCount: 0 }
      : collapseScheduleDateBadges(badges, collapseAfter)

  if (visible.length === 0 && overflowCount === 0) return null

  return (
    <div className="split-grid-badges">
      {visible.map((badge, badgeIndex) => {
        const isToday = today ? isScheduleBadgeToday(badge, today, eventYear) : false
        const isPast =
          markPastBadges && today && !isToday ? isScheduleBadgePast(badge, today, eventYear) : false
        return (
          <span
            key={`${badge}-${badgeIndex}`}
            className={`split-grid-link font-body text-xs uppercase tracking-[0.22em]${isToday ? ' split-grid-link--today' : ''}${isPast ? ' split-grid-link--past' : ''}`}
            {...(fieldPathPrefix
              ? { 'data-sb-field-path': `${fieldPathPrefix}.${badgeIndex}` }
              : {})}
          >
            {today ? scheduleBadgeLabel(badge, today, eventYear) : badge}
          </span>
        )
      })}
      {overflowCount > 0 ? (
        <span className="split-grid-link split-grid-link--overflow font-body text-xs uppercase tracking-[0.22em]">
          {formatScheduleMoreDates(messages.schedule.moreDates, overflowCount)}
        </span>
      ) : null}
    </div>
  )
}
