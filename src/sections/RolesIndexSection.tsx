import { useState } from 'react'
import { Link } from '@tanstack/react-router'

import { RoleCardImage } from '@/components/RoleCardImage'
import { SlidingTabGroup } from '@/components/SlidingTabGroup'
import { TabGridEmptyState } from '@/components/TabGridEmptyState'
import { filterRolesByCategory, roleFilterEmptyCopy } from '@/lib/role-category'
import { roleStats } from '@/lib/role-stats'
import { resolveColorScheme, schemeForeground, schemeGoldLinkStyle } from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import type { SectionColorScheme } from '../../schemas/color-scheme'
import {
  ROLE_CATEGORY_LABEL,
  type RoleCategory,
  type RoleCategoryFilter,
} from '../../schemas/role-category'

export type RoleCard = {
  _meta: { path: string }
  characterName: string
  operaTitle: string
  composer: string
  category: RoleCategory
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
  const [filter, setFilter] = useState<RoleCategoryFilter>('all')
  const scheme = resolveColorScheme(listColorScheme)
  const fg = schemeForeground(scheme)
  const linkStyle = schemeGoldLinkStyle(scheme)
  const animate = slideIn !== false
  const { ref, inView } = useInView<HTMLDivElement>()
  const filtered = filterRolesByCategory(roles, filter)

  return (
    <section className="section-vertical-padding" data-sb-field-path="rolesListColorScheme">
      <div
        ref={ref}
        className={`max-w-site mx-auto px-4 lg:px-12 ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''}`}
      >
        <div className="mb-8">
          <SlidingTabGroup
            ariaLabel="Filter performances by category"
            value={filter}
            onChange={setFilter}
            inactiveTextColor={scheme === 'wine' ? fg.body : 'var(--subtle-text-color)'}
            activeTextColor="var(--on-accent-text-color)"
            options={[
              { value: 'all', label: 'All' },
              { value: 'lead', label: 'Lead' },
              { value: 'supporting', label: 'Supporting' },
              { value: 'ensemble', label: 'Ensemble' },
            ]}
          />
        </div>

        {filtered.length === 0 ? (
          <TabGridEmptyState
            {...roleFilterEmptyCopy(filter)}
            headingColor={fg.heading}
            bodyColor={fg.body}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((role) => {
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
                      alt={`Sol Risé as ${role.characterName} in ${role.operaTitle}`}
                      eyebrowColor={fg.eyebrow}
                    />
                  </Link>

                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h2
                        className="font-display text-2xl italic leading-none pb-[0.2em]"
                        style={{ color: fg.heading }}
                        data-sb-field-path="characterName"
                      >
                        {role.characterName}
                      </h2>
                      <span
                        className="inline-flex shrink-0 items-center rounded-[var(--media-radius)] border px-2 py-0.5 font-body text-[0.65rem] uppercase tracking-[0.22em] font-semibold"
                        style={{
                          borderColor: 'color-mix(in srgb, var(--accent-ink-color) 22%, transparent)',
                          color: fg.eyebrow,
                          background: 'color-mix(in srgb, var(--accent-ink-color) 6%, transparent)',
                        }}
                        data-sb-field-path="category"
                      >
                        {ROLE_CATEGORY_LABEL[role.category]}
                      </span>
                    </div>

                    <p
                      className="font-body text-xs uppercase tracking-[0.35em] mb-2 font-semibold"
                      style={{ color: fg.eyebrow }}
                      data-sb-field-path="operaTitle"
                    >
                      {role.operaTitle}
                    </p>

                    <p
                      className="font-body text-xs uppercase tracking-widest mb-4"
                      style={{ color: fg.eyebrow }}
                      data-sb-field-path="composer"
                    >
                      {role.composer}
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
                      View Details →
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
