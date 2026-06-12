import { Link } from '@tanstack/react-router'

import { ExternalLink } from '@/components/ExternalLink'
import { SplitGridBadges } from '@/components/SplitGridBadges'
import { splitGridBadges } from '@/lib/split-grid-badges'
import type { RefObject } from 'react'

export type SplitGridItem = {
  title: string
  href: string
  image: string
  badges?: string[]
  /** @deprecated Use `badges` — kept for existing content. */
  decorativeEyebrow?: string
  subtitle?: string
}

export type SplitGridProps = {
  items: SplitGridItem[]
  animate?: boolean
  inView?: boolean
  gridRef?: RefObject<HTMLDivElement | null>
  maxItems?: number
  className?: string
}

export function SplitGrid({
  items,
  animate = false,
  inView = false,
  gridRef,
  maxItems = 3,
  className = '',
}: SplitGridProps) {
  const visibleItems = items.slice(0, maxItems)

  return (
    <div
      ref={gridRef}
      className={`max-w-site mx-auto w-full px-4 lg:px-12 ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''} ${className}`.trim()}
    >
      <div className="split-grid">
        {visibleItems.map((item) => {
          const href = item.href?.trim() ?? ''
          const badges = splitGridBadges(item)
          const panelContent = (
            <>
              <div className="split-grid-overlay" />
              <div className="split-grid-content">
                <SplitGridBadges
                  badges={badges}
                  fieldPathPrefix="badges"
                  eventRef={href}
                  markPastBadges
                />
                <h3 className="font-display text-3xl italic">{item.title}</h3>
                {(item.subtitle?.trim().length ?? 0) > 0 && (
                  <h4 className="font-display text-xl italic mt-2">{item.subtitle}</h4>
                )}
              </div>
            </>
          )

          if (!href) {
            return (
              <div
                key={`${item.title}-panel`}
                className="split-grid-item"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                {panelContent}
              </div>
            )
          }

          const isInternal = href.startsWith('/') && !href.startsWith('//')

          if (isInternal) {
            return (
              <Link
                key={`${item.title}-${href}`}
                to={href}
                className="split-grid-item"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                {panelContent}
              </Link>
            )
          }

          const externalLabel = item.subtitle?.trim()
            ? `${item.title}, ${item.subtitle.trim()}`
            : item.title

          return (
            <ExternalLink
              key={`${item.title}-${href}`}
              href={href}
              aria-label={externalLabel}
              className="split-grid-item"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              {panelContent}
            </ExternalLink>
          )
        })}
      </div>
    </div>
  )
}
