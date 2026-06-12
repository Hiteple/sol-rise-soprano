import { getStatsCountUpDurationMs } from '@/lib/motion-timing'
import {
  parseStatNumber,
  useCountUp,
  usePrefersReducedMotion,
} from '@/lib/use-count-up'
import { resolveColorScheme, schemeForeground, schemeStatsBackground } from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import { useEffect, useState } from 'react'
import type { AboutPage } from '../../schemas/site-pages'

type AnimatedStatNumberProps = {
  number: string
  active: boolean
  color: string
  prefersReducedMotion: boolean
  countUpDurationMs: number
}

function AnimatedStatNumber({
  number,
  active,
  color,
  prefersReducedMotion,
  countUpDurationMs,
}: AnimatedStatNumberProps) {
  const parsed = parseStatNumber(number)
  const shouldAnimate = Boolean(parsed) && active && !prefersReducedMotion
  const count = useCountUp(parsed?.value ?? 0, shouldAnimate, {
    animate: !prefersReducedMotion,
    durationMs: countUpDurationMs,
  })

  if (!parsed) {
    return (
      <div className="font-display text-5xl lg:text-6xl italic mb-2" style={{ color }}>
        {number}
      </div>
    )
  }

  const displayValue = prefersReducedMotion ? parsed.value : count
  const showSuffix = prefersReducedMotion || count >= parsed.value

  return (
    <div className="font-display text-5xl lg:text-6xl italic mb-2" style={{ color }}>
      {parsed.prefix}
      {displayValue}
      {showSuffix ? parsed.suffix : ''}
    </div>
  )
}

export type StatsRowSectionProps = {
  page: AboutPage
}

export function StatsRowSection({ page }: StatsRowSectionProps) {
  const statsSurface = resolveColorScheme(page.statsSurface)
  const statsIsWine = statsSurface === 'wine'
  const statsBackground = schemeStatsBackground(statsSurface)
  const fg = schemeForeground(statsSurface)
  const statsNumberColor = statsIsWine ? fg.heading : fg.eyebrow
  const statsLabelColor = statsIsWine ? fg.body : 'var(--subtle-text-color)'
  const statsDividerColor = statsIsWine ? fg.divider : 'color-mix(in srgb, var(--accent-ink-color) 20%, transparent)'
  const animate = page.statsSlideIn !== false
  const { ref, inView } = useInView<HTMLDivElement>()
  const countUpActive = inView
  const prefersReducedMotion = usePrefersReducedMotion()
  const [countUpDurationMs, setCountUpDurationMs] = useState(() => getStatsCountUpDurationMs())

  useEffect(() => {
    setCountUpDurationMs(getStatsCountUpDurationMs())
  }, [])

  return (
    <section
      className="py-20"
      style={{
        background: statsBackground,
        borderTop: `1px solid ${statsDividerColor}`,
        borderBottom: `1px solid ${statsDividerColor}`,
      }}
      data-sb-field-path="statsSurface"
    >
      <div
        ref={ref}
        className={`max-w-site mx-auto px-4 lg:px-12 ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''}`}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {page.highlights.map((h) => (
            <div key={`${h.number}-${h.label}`} className="text-center">
              <AnimatedStatNumber
                number={h.number}
                active={countUpActive}
                color={statsNumberColor}
                prefersReducedMotion={prefersReducedMotion}
                countUpDurationMs={countUpDurationMs}
              />
              <div
                className="font-body text-xs uppercase tracking-widest"
                style={{ color: statsLabelColor }}
              >
                {h.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
