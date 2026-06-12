import type { ComponentProps } from 'react'

export const OPENS_IN_NEW_TAB_LABEL = '(opens in new tab)'

/** Appends the new-tab hint when building a custom `aria-label`. */
export function withOpensInNewTabAriaLabel(label: string): string {
  if (/opens in new tab/i.test(label)) return label.trim()
  return `${label.trim()} (${OPENS_IN_NEW_TAB_LABEL})`
}

export type ExternalLinkProps = Omit<ComponentProps<'a'>, 'target' | 'rel'> & {
  href: string
}

/**
 * External URL — opens in a new tab with a screen-reader hint.
 * Prefer an explicit `aria-label` with context (e.g. "Visit Teatro Colón website")
 * when visible link text is generic ("Visit website", "Get tickets →").
 */
export function ExternalLink({
  children,
  'aria-label': ariaLabel,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ? withOpensInNewTabAriaLabel(ariaLabel) : undefined}
    >
      {children}
      {!ariaLabel && <span className="sr-only"> ({OPENS_IN_NEW_TAB_LABEL})</span>}
    </a>
  )
}
