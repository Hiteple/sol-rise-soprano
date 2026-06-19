import { marked } from 'marked'

import { PhotographyVideoTile } from '@/components/PhotographyVideoTile'
import { PhotographyGalleryTile } from '@/components/PhotographyGalleryTile'
import { useLocale } from '@/components/LocaleContext'
import { documentSlug } from '@/lib/i18n/content'
import { useGalleryPhotoSwipe } from '@/lib/gallery-photoswipe'
import { roleFeatureImageProps } from '@/lib/netlify-image'
import { photographerCreditLabel } from '@/lib/photographer-credit'
import { showsPlaceholderImage } from '@/lib/placeholder-image'
import { sortByContentOrder } from '@/lib/content-order'
import { roleStats } from '@/lib/role-stats'
import { resolveColorScheme, schemeForeground, schemePageBandBackground } from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import {
  rolePhotographyLightboxItems,
  scheduleVideosForRole,
} from '@/lib/schedule-photography'
import type { ScheduleEvent } from '@/components/ScheduleEventGrid'
import type { RolesIndexSectionProps } from '@/sections/RolesIndexSection'

type GalleryItem = {
  _meta: { path: string }
  title: string
  image: string
  alt: string
  photographer?: string
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
  scheduleEvents: ScheduleEvent[]
}

export function RoleDetailSection({
  role,
  galleryItems,
  organizations,
  scheduleEvents,
}: RoleDetailSectionProps) {
  const { messages } = useLocale()
  const roleMsg = messages.role
  const scheduleMsg = messages.schedule
  const roleSlug = documentSlug(role)
  const scheme = resolveColorScheme('soft')
  const fg = schemeForeground(scheme)
  const stats = roleStats(role.appearances)
  const orgBySlug = new Map(organizations.map((org) => [documentSlug(org), org]))
  const relatedGallery = sortByContentOrder(
    galleryItems.filter((item) => item.roleSlug === roleSlug),
  )
  const roleVideos = scheduleVideosForRole(roleSlug, scheduleEvents)
  const showPhotography = roleVideos.length > 0 || relatedGallery.length > 0
  const bodyHtml = role.content?.trim() ? marked(role.content) : ''
  const { ref, inView } = useInView<HTMLDivElement>()
  const { openGallery } = useGalleryPhotoSwipe()

  const hasFeatureImage = !showsPlaceholderImage(role.featureImage)
  const featureImageCredit = photographerCreditLabel(role.featureImagePhotography)

  const lightboxItems = rolePhotographyLightboxItems(
    roleVideos,
    relatedGallery.map((item) => ({
      image: item.image,
      alt: item.alt,
      title: item.title,
      photographer: item.photographer,
    })),
  )

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
        <div className="max-w-site mx-auto px-4 lg:px-12">
          <div
            ref={ref}
            className={`reveal ${inView ? 'is-visible' : ''}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(320px,24rem)] gap-12 lg:gap-16">
            <div>
              {hasFeatureImage && (
                <div
                  className="relative img-zoom media-radius mb-10 overflow-hidden"
                  style={{ aspectRatio: '16/10' }}
                >
                  <img
                    {...roleFeatureImageProps(role.featureImage)}
                    alt={roleMsg.featureImageAlt
                      .replace('{character}', role.characterName)
                      .replace('{opera}', role.operaTitle)}
                    className="w-full h-full object-cover"
                    width={900}
                    height={563}
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    data-sb-field-path="featureImage"
                  />
                  {featureImageCredit && (
                    <div
                      className="role-feature-image__credit absolute inset-x-0 bottom-0 px-4 pb-3 pointer-events-none"
                      aria-hidden
                    >
                      <p
                        className="font-body text-xs uppercase tracking-widest text-right"
                        style={{ color: 'var(--media-caption-text-color)' }}
                        data-sb-field-path="featureImagePhotography"
                      >
                        {featureImageCredit}
                      </p>
                    </div>
                  )}
                </div>
              )}

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
                    {roleMsg.appearances}
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
              className="h-fit min-w-0 p-6 rounded-[var(--media-radius)] border"
              style={{
                background: schemePageBandBackground('wine'),
                borderColor: 'color-mix(in srgb, var(--media-caption-text-color) 22%, transparent)',
                color: 'var(--media-caption-text-color)',
              }}
            >
              <h2 className="font-body text-xs uppercase tracking-[0.32em] mb-5 font-semibold leading-snug break-words">
                {roleMsg.performanceInfo}
              </h2>
              <dl className="space-y-4 font-body text-sm">
                <div>
                  <dt className="uppercase tracking-widest text-xs opacity-75 break-words">{roleMsg.composer}</dt>
                  <dd className="mt-1">{role.composer}</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-widest text-xs opacity-75 break-words">{roleMsg.opera}</dt>
                  <dd className="mt-1">{role.operaTitle}</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-widest text-xs opacity-75 break-words">{roleMsg.appearances}</dt>
                  <dd className="mt-1">{stats.performanceCount}</dd>
                </div>
                {stats.venueCount > 0 && (
                  <div>
                    <dt className="uppercase tracking-widest text-xs opacity-75 break-words">{roleMsg.venues}</dt>
                    <dd className="mt-1">{stats.venueCount}</dd>
                  </div>
                )}
                {stats.yearRange && (
                  <div>
                    <dt className="uppercase tracking-widest text-xs opacity-75 break-words">{roleMsg.years}</dt>
                    <dd className="mt-1">{stats.yearRange}</dd>
                  </div>
                )}
              </dl>
            </aside>
          </div>
          </div>

          {showPhotography && (
            <div className="mt-16">
              <h2 className="font-display text-2xl italic mb-6" style={{ color: fg.heading }}>
                {roleVideos.length > 0 ? scheduleMsg.media : scheduleMsg.photography}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {roleVideos.map((video, index) => (
                  <PhotographyVideoTile
                    key={video.scheduleSlug ?? `${video.videoUrl}-${index}`}
                    video={video}
                    stackbitObjectId={
                      video.scheduleSlug ? `content/schedule/${video.scheduleSlug}.md` : undefined
                    }
                    videoFieldPath="videoUrl"
                    onClick={() => openGallery(lightboxItems, index)}
                  />
                ))}
                {relatedGallery.map((item, index) => (
                  <PhotographyGalleryTile
                    key={item._meta.path}
                    title={item.title}
                    image={item.image}
                    alt={item.alt}
                    photographer={item.photographer}
                    stackbitObjectId={`content/gallery/${item._meta.path}.md`}
                    onClick={() => openGallery(lightboxItems, roleVideos.length + index)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
