import { netlifyImgSet } from '@/lib/netlify-image'
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
          {organizations.map((org) => (
            <article
              key={org._meta.path}
              className="grid grid-cols-1 sm:grid-cols-[180px_minmax(0,1fr)] gap-0 overflow-hidden rounded-[var(--media-radius)] border"
              style={{
                borderColor: 'color-mix(in srgb, var(--accent-ink-color) 16%, transparent)',
                background: 'var(--section-surface-bright)',
              }}
              data-sb-object-id={`content/organizations/${org._meta.path}.md`}
            >
              <div className="sm:min-h-[180px] bg-[color-mix(in_srgb,var(--palette-wine)_12%,transparent)]">
                {org.image ? (
                  <img
                    {...netlifyImgSet(org.image, 360, 450)}
                    alt={org.name}
                    className="w-full h-full object-cover min-h-[180px]"
                    data-sb-field-path="image"
                  />
                ) : (
                  <div
                    className="w-full h-full min-h-[180px] flex items-center justify-center font-display text-4xl italic px-4 text-center"
                    style={{ color: fg.eyebrow }}
                  >
                    {org.name.charAt(0)}
                  </div>
                )}
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
                  <a
                    href={org.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-xs uppercase tracking-[0.28em] self-start border-b pb-1 transition-opacity hover:opacity-75"
                    style={{ color: fg.heading, borderColor: fg.divider }}
                    data-sb-field-path="website"
                  >
                    Visit website
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
