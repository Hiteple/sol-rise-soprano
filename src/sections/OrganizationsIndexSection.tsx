import { ExternalLink } from '@/components/ExternalLink'
import { OrganizationImage } from '@/components/OrganizationImage'
import { useLocale } from '@/components/LocaleContext'
import { contentMarkdownPath, documentSlug } from '@/lib/i18n/content'
import { resolveColorScheme, schemeForeground } from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import type { SectionColorScheme } from '../../schemas/color-scheme'

export type OrganizationCard = {
  _meta: { path: string }
  name: string
  city: string
  country?: string
  image?: string
  summary: string
  website?: string
}

export type OrganizationsIndexSectionProps = {
  organizations: OrganizationCard[]
  listColorScheme?: SectionColorScheme
  slideIn?: boolean
}

export function OrganizationsIndexSection({
  organizations,
  listColorScheme,
  slideIn,
}: OrganizationsIndexSectionProps) {
  const { locale, messages } = useLocale()
  const scheme = resolveColorScheme(listColorScheme)
  const fg = schemeForeground(scheme)
  const animate = slideIn !== false
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section className="section-vertical-padding" data-sb-field-path="organizationsListColorScheme">
      <div
        ref={ref}
        className={`max-w-site mx-auto px-4 lg:px-12 ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {organizations.map((org) => {
            const slug = documentSlug(org)

            return (
            <article
              key={slug}
              className="grid grid-cols-1 sm:grid-cols-[180px_minmax(0,1fr)] gap-0 overflow-hidden rounded-[var(--media-radius)] border"
              style={{
                borderColor: 'color-mix(in srgb, var(--accent-ink-color) 16%, transparent)',
                background: 'var(--section-surface-bright)',
              }}
              data-sb-object-id={contentMarkdownPath(org)}
            >
              <div className="sm:min-h-[180px] bg-[color-mix(in_srgb,var(--palette-wine)_12%,transparent)]">
                <OrganizationImage
                  name={org.name}
                  image={org.image}
                  eyebrowColor={fg.eyebrow}
                  variant="index"
                  imageFieldPath="image"
                />
              </div>

              <div className="p-8 flex flex-col justify-center">
                <h2
                  className="font-display text-2xl italic mb-2"
                  style={{ color: fg.heading }}
                  data-sb-field-path="name"
                >
                  {org.name}
                </h2>
                <p
                  className="font-body text-xs uppercase tracking-widest mb-4"
                  style={{ color: fg.eyebrow }}
                  data-sb-field-path="city"
                >
                  {org.city}
                  {org.country ? `, ${org.country}` : ''}
                </p>
                <p
                  className="font-body text-sm leading-relaxed mb-5"
                  style={{ color: fg.body }}
                  data-sb-field-path="summary"
                >
                  {org.summary}
                </p>
                {org.website && (
                  <ExternalLink
                    href={org.website}
                    aria-label={`${messages.organizations.visitWebsite} — ${org.name}`}
                    className="font-body text-xs uppercase tracking-[0.28em] self-start border-b pb-1 transition-opacity hover:opacity-75"
                    style={{ color: fg.heading, borderColor: fg.divider }}
                    data-sb-field-path="website"
                  >
                    {messages.organizations.visitWebsite}
                  </ExternalLink>
                )}
              </div>
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
