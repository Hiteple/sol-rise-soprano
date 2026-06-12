import { Link } from '@tanstack/react-router'

import { RoleCardImage } from '@/components/RoleCardImage'
import { roleStats } from '@/lib/role-stats'
import { resolveColorScheme, schemeForeground, schemeGoldLinkStyle } from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import type { SectionColorScheme } from '../../schemas/color-scheme'

export type RoleCard = {
  _meta: { path: string }
  characterName: string
  operaTitle: string
  composer: string
  heroImage: string
  summary: string
  appearances: {
    year: string
    venue: string
    organizationSlug?: string
    city?: string
    notes?: string
  }[]
  tags: string[]
}

export type RolesIndexSectionProps = {
  roles: RoleCard[]
  listColorScheme?: SectionColorScheme
  slideIn?: boolean
}

export function RolesIndexSection({ roles, listColorScheme, slideIn }: RolesIndexSectionProps) {
  const scheme = resolveColorScheme(listColorScheme)
  const fg = schemeForeground(scheme)
  const linkStyle = schemeGoldLinkStyle(scheme)
  const animate = slideIn !== false
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section className="section-vertical-padding" data-sb-field-path="rolesListColorScheme">
      <div
        ref={ref}
        className={`max-w-site mx-auto px-4 lg:px-12 ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => {
            const stats = roleStats(role.appearances)
            const slug = role._meta.path

            return (
              <article
                key={slug}
                className="grid grid-cols-1 sm:grid-cols-[180px_minmax(0,1fr)] gap-0 overflow-hidden rounded-[var(--media-radius)] border"
                style={{
                  borderColor: 'color-mix(in srgb, var(--accent-ink-color) 16%, transparent)',
                  background: 'var(--section-surface-bright)',
                }}
                data-sb-object-id={`content/roles/${slug}.md`}
              >
                <Link
                  to="/roles/$slug"
                  params={{ slug }}
                  className="img-zoom block sm:min-h-[180px] bg-[color-mix(in_srgb,var(--palette-wine)_12%,transparent)]"
                >
                  <RoleCardImage
                    characterName={role.characterName}
                    heroImage={role.heroImage}
                    alt={`${role.characterName} in ${role.operaTitle}`}
                    eyebrowColor={fg.eyebrow}
                  />
                </Link>

                <div className="p-8 flex flex-col justify-center">
                  <p
                    className="font-body text-xs uppercase tracking-[0.35em] mb-2 font-semibold"
                    style={{ color: fg.eyebrow }}
                    data-sb-field-path="composer"
                  >
                    {role.composer}
                  </p>

                  <h2
                    className="font-display text-2xl italic mb-2"
                    style={{ color: fg.heading }}
                    data-sb-field-path="characterName"
                  >
                    {role.characterName}
                  </h2>

                  <p
                    className="font-body text-xs uppercase tracking-widest mb-4"
                    style={{ color: fg.eyebrow }}
                    data-sb-field-path="operaTitle"
                  >
                    {role.operaTitle}
                  </p>

                  <p
                    className="font-body text-sm leading-relaxed mb-4"
                    style={{ color: fg.body }}
                    data-sb-field-path="summary"
                  >
                    {role.summary}
                  </p>

                  {stats.yearRange && (
                    <p className="font-body text-xs uppercase tracking-widest mb-5" style={{ color: fg.eyebrow }}>
                      {stats.performanceCount} {stats.performanceCount === 1 ? 'appearance' : 'appearances'}
                      {` · ${stats.yearRange}`}
                    </p>
                  )}

                  <Link
                    to="/roles/$slug"
                    params={{ slug }}
                    className="gold-link font-body text-xs uppercase tracking-[0.28em] self-start"
                    style={linkStyle}
                  >
                    View role →
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
