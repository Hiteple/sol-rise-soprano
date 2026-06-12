import { Link } from '@tanstack/react-router'

import { schemeGoldLinkStyle, schemeForeground, schemeSolidBackground } from '@/lib/section-color-scheme'

export type NotFoundSectionProps = {
  eyebrow: string
  title: string
  description: string
  backHref: string
  backLabel: string
  homeLabel?: string
}

export function NotFoundSection({
  eyebrow,
  title,
  description,
  backHref,
  backLabel,
  homeLabel = 'Return home',
}: NotFoundSectionProps) {
  const fg = schemeForeground('wine')
  const linkStyle = schemeGoldLinkStyle('wine')

  return (
    <section
      className="relative overflow-hidden pt-40 pb-24 lg:pt-52 lg:pb-32 min-h-[75vh] flex items-center"
      style={{ background: schemeSolidBackground('wine') }}
      aria-labelledby="not-found-title"
    >
      <p
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display italic leading-none select-none"
        style={{
          fontSize: 'clamp(10rem, 32vw, 22rem)',
          color: 'color-mix(in srgb, var(--palette-pink) 9%, transparent)',
        }}
      >
        404
      </p>

      <div className="relative z-10 max-w-site mx-auto w-full px-4 lg:px-12 text-center">
        <p
          className="text-xs uppercase tracking-[0.38em] font-body font-semibold mb-6"
          style={{ color: fg.eyebrow }}
        >
          {eyebrow}
        </p>

        <h1
          id="not-found-title"
          className="font-display italic leading-[0.95] mb-6"
          style={{
            fontSize: 'clamp(2.75rem, 7vw, 5rem)',
            color: fg.heading,
          }}
        >
          {title}
        </h1>

        <div
          className="w-14 h-px mx-auto mb-8"
          style={{ background: 'color-mix(in srgb, var(--palette-pink) 45%, transparent)' }}
          aria-hidden
        />

        <p
          className="font-body text-base leading-relaxed max-w-md mx-auto mb-12"
          style={{ color: fg.body }}
        >
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          <Link
            to={backHref}
            className="gold-link font-body text-xs uppercase tracking-[0.28em]"
            style={linkStyle}
          >
            {backLabel} →
          </Link>
          {backHref !== '/' && (
            <Link
              to="/"
              className="gold-link font-body text-xs uppercase tracking-[0.28em]"
              style={linkStyle}
            >
              {homeLabel} →
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
