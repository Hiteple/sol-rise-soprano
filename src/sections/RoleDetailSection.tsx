import { marked } from 'marked'

import { useGalleryPhotoSwipe } from '@/lib/gallery-photoswipe'
import { netlifyImgSet } from '@/lib/netlify-image'
import { roleStats } from '@/lib/role-stats'
import { resolveColorScheme, schemeForeground, schemePageBandBackground } from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import type { RolesIndexSectionProps } from '@/sections/RolesIndexSection'

type GalleryItem = {
  _meta: { path: string }
  title: string
  image: string
  alt: string
  category?: string
  roleSlug?: string
}

type OrganizationItem = {
  _meta: { path: string }
  name: string
}

export type RoleDetailSectionProps = {
  role: RolesIndexSectionProps['roles'][number] & { content: string }
  galleryItems: GalleryItem[]
  organizations: OrganizationItem[]
}

export function RoleDetailSection({ role, galleryItems, organizations }: RoleDetailSectionProps) {
  const scheme = resolveColorScheme('soft')
  const fg = schemeForeground(scheme)
  const stats = roleStats(role.appearances)
  const orgBySlug = new Map(organizations.map((org) => [org._meta.path, org]))
  const relatedGallery = galleryItems.filter((item) => item.roleSlug === role._meta.path)
  const bodyHtml = role.content?.trim() ? marked(role.content) : ''
  const { ref, inView } = useInView<HTMLDivElement>()
  const { openGallery } = useGalleryPhotoSwipe()

  const lightboxItems = relatedGallery.map((item) => ({
    image: item.image,
    alt: item.alt,
    title: item.title,
    category: item.category,
  }))

  return (
    <>
      <section className="pt-40 pb-12 lg:pt-52" style={{ background: schemePageBandBackground('bright') }}>
        <div className="max-w-site mx-auto px-4 lg:px-12">
          <p className="text-xs uppercase tracking-[0.35em] font-body font-semibold mb-4" style={{ color: fg.eyebrow }}>
            {role.composer}
          </p>
          <h1
            className="font-display italic leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', color: fg.heading }}
          >
            {role.characterName}
          </h1>
          <p className="font-display text-2xl lg:text-3xl italic" style={{ color: fg.body }}>
            {role.operaTitle}
          </p>
        </div>
      </section>

      <section className="section-vertical-padding" style={{ background: 'var(--page-background-color)' }}>
        <div
          ref={ref}
          className={`max-w-site mx-auto px-4 lg:px-12 reveal ${inView ? 'is-visible' : ''}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-12 lg:gap-16">
            <div>
              <div className="img-zoom media-radius mb-10" style={{ aspectRatio: '16/10' }}>
                <img
                  {...netlifyImgSet(role.heroImage, 1200, 750)}
                  alt={`${role.characterName} in ${role.operaTitle}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {bodyHtml && (
                <div
                  className="role-markdown font-body text-base leading-relaxed space-y-4"
                  style={{ color: fg.body }}
                  dangerouslySetInnerHTML={{ __html: bodyHtml }}
                />
              )}

              {role.appearances.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-display text-2xl italic mb-6" style={{ color: fg.heading }}>
                    Appearances
                  </h2>
                  <ul className="space-y-4">
                    {role.appearances.map((appearance, index) => {
                      const org = appearance.organizationSlug
                        ? orgBySlug.get(appearance.organizationSlug)
                        : undefined

                      return (
                        <li
                          key={`${appearance.year}-${appearance.venue}-${index}`}
                          className="border-b pb-4"
                          style={{ borderColor: 'color-mix(in srgb, var(--accent-ink-color) 18%, transparent)' }}
                        >
                          <p className="font-display text-xl italic" style={{ color: fg.heading }}>
                            {appearance.year}
                            {appearance.city ? ` · ${appearance.city}` : ''}
                          </p>
                          <p className="font-body text-sm mt-1" style={{ color: fg.body }}>
                            {appearance.venue}
                            {org ? ` — ${org.name}` : null}
                          </p>
                          {appearance.notes && (
                            <p className="font-body text-sm mt-1" style={{ color: 'var(--subtle-text-color)' }}>
                              {appearance.notes}
                            </p>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>

            <aside
              className="h-fit p-6 rounded-[var(--media-radius)] border"
              style={{
                background: schemePageBandBackground('wine'),
                borderColor: 'color-mix(in srgb, var(--media-caption-text-color) 22%, transparent)',
                color: 'var(--media-caption-text-color)',
              }}
            >
              <h2 className="font-body text-xs uppercase tracking-[0.32em] mb-5 font-semibold">Role information</h2>
              <dl className="space-y-4 font-body text-sm">
                <div>
                  <dt className="uppercase tracking-widest text-xs opacity-75">Composer</dt>
                  <dd className="mt-1">{role.composer}</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-widest text-xs opacity-75">Opera</dt>
                  <dd className="mt-1">{role.operaTitle}</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-widest text-xs opacity-75">Appearances</dt>
                  <dd className="mt-1">{stats.performanceCount}</dd>
                </div>
                {stats.venueCount > 0 && (
                  <div>
                    <dt className="uppercase tracking-widest text-xs opacity-75">Venues</dt>
                    <dd className="mt-1">{stats.venueCount}</dd>
                  </div>
                )}
                {stats.yearRange && (
                  <div>
                    <dt className="uppercase tracking-widest text-xs opacity-75">Years</dt>
                    <dd className="mt-1">{stats.yearRange}</dd>
                  </div>
                )}
              </dl>
            </aside>
          </div>

          {relatedGallery.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-2xl italic mb-6" style={{ color: fg.heading }}>
                Photography
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {relatedGallery.map((item, index) => (
                  <button
                    key={item._meta.path}
                    type="button"
                    className="img-zoom block media-radius border-0 p-0 text-left cursor-pointer w-full"
                    style={{ aspectRatio: '4/5' }}
                    aria-label={`View larger image: ${item.title}`}
                    onClick={() => openGallery(lightboxItems, index)}
                  >
                    <img
                      {...netlifyImgSet(item.image, 480, 600)}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
