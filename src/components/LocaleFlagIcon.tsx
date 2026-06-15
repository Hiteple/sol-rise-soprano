import { useId } from 'react'

import { LOCALE_LABELS, type Locale } from '@/lib/i18n/locales'

type LocaleFlagIconProps = {
  locale: Locale
  size?: number
  className?: string
  /** When true, hide from assistive tech (parent control supplies the accessible name). */
  decorative?: boolean
}

export function LocaleFlagIcon({
  locale,
  size = 36,
  className,
  decorative = false,
}: LocaleFlagIconProps) {
  const clipId = useId()
  const label = LOCALE_LABELS[locale]

  return (
    <span
      className={className}
      {...(decorative
        ? { 'aria-hidden': true }
        : { role: 'img', 'aria-label': label })}
      style={{ width: size, height: size, display: 'inline-block', flexShrink: 0 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <clipPath id={clipId}>
            <circle cx="18" cy="18" r="18" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          {locale === 'en' && (
            <>
              <rect width="36" height="36" fill="#B22234" />
              <rect y="2.77" width="36" height="2.77" fill="#FFFFFF" />
              <rect y="8.31" width="36" height="2.77" fill="#FFFFFF" />
              <rect y="13.85" width="36" height="2.77" fill="#FFFFFF" />
              <rect y="19.38" width="36" height="2.77" fill="#FFFFFF" />
              <rect y="24.92" width="36" height="2.77" fill="#FFFFFF" />
              <rect y="30.46" width="36" height="2.77" fill="#FFFFFF" />
              <rect width="14.4" height="19.38" fill="#3C3B6E" />
              <circle cx="3.2" cy="3.2" r="0.9" fill="#FFFFFF" />
              <circle cx="7.2" cy="3.2" r="0.9" fill="#FFFFFF" />
              <circle cx="11.2" cy="3.2" r="0.9" fill="#FFFFFF" />
              <circle cx="5.2" cy="6.4" r="0.9" fill="#FFFFFF" />
              <circle cx="9.2" cy="6.4" r="0.9" fill="#FFFFFF" />
              <circle cx="3.2" cy="9.6" r="0.9" fill="#FFFFFF" />
              <circle cx="7.2" cy="9.6" r="0.9" fill="#FFFFFF" />
              <circle cx="11.2" cy="9.6" r="0.9" fill="#FFFFFF" />
              <circle cx="5.2" cy="12.8" r="0.9" fill="#FFFFFF" />
              <circle cx="9.2" cy="12.8" r="0.9" fill="#FFFFFF" />
              <circle cx="3.2" cy="16" r="0.9" fill="#FFFFFF" />
              <circle cx="7.2" cy="16" r="0.9" fill="#FFFFFF" />
              <circle cx="11.2" cy="16" r="0.9" fill="#FFFFFF" />
            </>
          )}
          {locale === 'es' && (
            <>
              <rect width="36" height="9" fill="#AA151B" />
              <rect y="9" width="36" height="18" fill="#F1BF00" />
              <rect y="27" width="36" height="9" fill="#AA151B" />
            </>
          )}
          {locale === 'de' && (
            <>
              <rect width="36" height="12" fill="#000000" />
              <rect y="12" width="36" height="12" fill="#DD0000" />
              <rect y="24" width="36" height="12" fill="#FFCE00" />
            </>
          )}
          {locale === 'it' && (
            <>
              <rect width="12" height="36" fill="#009246" />
              <rect x="12" width="12" height="36" fill="#FFFFFF" />
              <rect x="24" width="12" height="36" fill="#CE2B37" />
            </>
          )}
        </g>
        <circle
          cx="18"
          cy="18"
          r="17.25"
          fill="none"
          stroke="color-mix(in srgb, var(--chrome-border) 70%, transparent)"
          strokeWidth="1.5"
        />
      </svg>
    </span>
  )
}
