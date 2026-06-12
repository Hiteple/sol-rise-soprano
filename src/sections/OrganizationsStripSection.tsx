import { Link } from '@tanstack/react-router'

import { ExternalLink } from '@/components/ExternalLink'
import { OrganizationImage } from '@/components/OrganizationImage'
import {
  resolveColorScheme,
  schemeForeground,
  schemeGoldLinkStyle,
  schemePageBandBackground,
} from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import type { SectionColorScheme } from '../../schemas/color-scheme'

export type OrganizationStripItem = {
  _meta: { path: string }
  name: string
  city: string
  country?: string
  image?: string
  website?: string
}

export type OrganizationsStripSectionProps = {
  eyebrow: string
  title: string
  description?: string
  linkText?: string
  organizations: OrganizationStripItem[]
  colorScheme?: SectionColorScheme
  slideIn?: boolean
}

export function OrganizationsStripSection({
  eyebrow,
  title,
  description,
  linkText = 'View all opera houses & companies',
  organizations,
  colorScheme,
  slideIn,
}: OrganizationsStripSectionProps) {
  const scheme = resolveColorScheme(colorScheme)
  const fg = schemeForeground(scheme)
  const animate = slideIn !== false
  const { ref, inView } = useInView<HTMLDivElement>()
  const hasDescription = (description?.trim().length ?? 0) > 0

  if (organizations.length === 0) return null

  return (
    <section
      className="section-vertical-padding"
      aria-label="Organizations and venues"
      style={{ background: schemePageBandBackground(scheme) }}
      data-sb-field-path="organizationsStripColorScheme"
    >
      <div
        ref={ref}
        className={`max-w-site mx-auto px-4 lg:px-12 ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''}`}
      >
        <div className="mb-12 lg:mb-14 max-w-2xl">
          <p
            className="text-xs uppercase tracking-[0.3em] font-body font-semibold mb-4"
            style={{ color: fg.eyebrow }}
            data-sb-field-path="organizationsStripEyebrow"
          >
            {eyebrow}
          </p>
          <h2
            className="font-display text-4xl lg:text-5xl italic mb-4"
            style={{ color: fg.heading }}
            data-sb-field-path="organizationsStripTitle"
          >
            {title}
          </h2>
          {hasDescription && (
            <p
              className="font-body text-base leading-relaxed"
              style={{ color: fg.body }}
              data-sb-field-path="organizationsStripDescription"
            >
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {organizations.map((org) => {
            const location = [org.city, org.country].filter(Boolean).join(', ')
            const cardInner = (
              <>
                <div
                  className="aspect-[4/3] overflow-hidden"
                  style={{ background: 'color-mix(in srgb, var(--palette-wine) 10%, transparent)' }}
                >
                  <OrganizationImage
                    name={org.name}
                    image={org.image}
                    eyebrowColor={fg.eyebrow}
                    variant="strip"
                    imageFieldPath="image"
                  />
                </div>
                <div className="p-4 lg:p-5">
                  <h3
                    className="font-display text-lg lg:text-xl italic leading-snug mb-2"
                    style={{ color: fg.heading }}
                    data-sb-field-path="name"
                  >
                    {org.name}
                  </h3>
                  {location && (
                    <p
                      className="font-body text-[0.65rem] uppercase tracking-[0.28em]"
                      style={{ color: fg.eyebrow }}
                      data-sb-field-path="city"
                    >
                      {location}
                    </p>
                  )}
                </div>
              </>
            )

            const cardStyle = {
              borderColor: 'color-mix(in srgb, var(--accent-ink-color) 14%, transparent)',
              background: 'var(--section-surface-bright)',
            }

            if (org.website) {
              return (
                <ExternalLink
                  key={org._meta.path}
                  href={org.website}
                  aria-label={`Visit ${org.name} website`}
                  className="overflow-hidden rounded-[var(--media-radius)] border transition-opacity hover:opacity-90"
                  style={cardStyle}
                  data-sb-object-id={`content/organizations/${org._meta.path}.md`}
                >
                  {cardInner}
                </ExternalLink>
              )
            }

            return (
              <article
                key={org._meta.path}
                className="overflow-hidden rounded-[var(--media-radius)] border"
                style={cardStyle}
                data-sb-object-id={`content/organizations/${org._meta.path}.md`}
              >
                {cardInner}
              </article>
            )
          })}
        </div>

        <div className="mt-10 lg:mt-12">
          <Link
            to="/organizations"
            className="gold-link font-body text-xs uppercase tracking-[0.28em]"
            style={schemeGoldLinkStyle(scheme)}
            data-sb-field-path="organizationsStripLinkText"
          >
            {linkText} →
          </Link>
        </div>
      </div>
    </section>
  )
}
