import { Link } from '@tanstack/react-router'
import type { AboutPage } from '../../schemas/site-pages'

export type TextButtonsSectionProps = {
  page: AboutPage
}

export function TextButtonsSection({ page }: TextButtonsSectionProps) {
  return (
    <section className="py-24 text-center">
      <div className="max-w-xl mx-auto px-6">
        <h2
          className="font-display italic text-4xl mb-6"
          style={{ color: 'var(--heading-color)' }}
        >
          <span data-sb-field-path="ctaTitleLine1">{page.ctaTitleLine1}</span>
          <br />
          <span data-sb-field-path="ctaTitleLine2">{page.ctaTitleLine2}</span>
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to={page.ctaPrimaryHref}
            className="px-8 py-3 font-body text-xs uppercase tracking-widest font-semibold transition-all duration-300"
            style={{ background: 'var(--accent-color)', color: 'var(--on-accent-text-color)' }}
            data-sb-field-path="ctaPrimaryLabel"
          >
            {page.ctaPrimaryLabel}
          </Link>
          <Link
            to={page.ctaSecondaryHref}
            className="px-8 py-3 font-body text-xs uppercase tracking-widest font-semibold border transition-all duration-300"
            style={{
              borderColor: 'color-mix(in srgb, var(--accent-color) 45%, transparent)',
              color: 'var(--accent-color)',
            }}
            data-sb-field-path="ctaSecondaryLabel"
          >
            {page.ctaSecondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
