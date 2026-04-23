import { Link } from '@tanstack/react-router'

import { resolveColorScheme, schemeForeground, schemePageBandBackground } from '@/lib/section-color-scheme'
import type { AboutPage } from '../../schemas/site-pages'

export type TextButtonsSectionProps = {
  page: AboutPage
}

export function TextButtonsSection({ page }: TextButtonsSectionProps) {
  const scheme = resolveColorScheme(page.ctaColorScheme)
  const fg = schemeForeground(scheme)
  const primaryLabel = page.ctaPrimaryLabel?.trim() ?? ''
  const primaryHref = page.ctaPrimaryHref?.trim() ?? ''
  const secondaryLabel = page.ctaSecondaryLabel?.trim() ?? ''
  const secondaryHref = page.ctaSecondaryHref?.trim() ?? ''
  const showPrimary = primaryLabel.length > 0 && primaryHref.length > 0
  const showSecondary = secondaryLabel.length > 0 && secondaryHref.length > 0

  return (
    <section
      className="py-24 text-center"
      style={{ background: schemePageBandBackground(scheme) }}
      data-sb-field-path="ctaColorScheme"
    >
      <div className="max-w-xl mx-auto px-6">
        <h2
          className="font-display italic text-4xl mb-6"
          style={{ color: fg.heading }}
        >
          <span data-sb-field-path="ctaTitleLine1">{page.ctaTitleLine1}</span>
          <br />
          <span data-sb-field-path="ctaTitleLine2">{page.ctaTitleLine2}</span>
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {showPrimary && (
            <Link
              to={primaryHref}
              className="px-8 py-3 font-body text-xs uppercase tracking-widest font-semibold transition-all duration-300"
              style={{ background: 'var(--accent-color)', color: 'var(--on-accent-text-color)' }}
              data-sb-field-path="ctaPrimaryLabel"
            >
              {primaryLabel}
            </Link>
          )}
          {showSecondary && (
            <Link
              to={secondaryHref}
              className="px-8 py-3 font-body text-xs uppercase tracking-widest font-semibold border transition-all duration-300"
              style={{
                borderColor:
                  scheme === 'wine'
                    ? fg.divider
                    : 'color-mix(in srgb, var(--accent-color) 45%, transparent)',
                color: scheme === 'wine' ? fg.eyebrow : 'var(--accent-color)',
              }}
              data-sb-field-path="ctaSecondaryLabel"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
