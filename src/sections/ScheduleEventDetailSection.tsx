import { Link } from '@tanstack/react-router'

import { ExternalLink } from '@/components/ExternalLink'
import { PhotographyVideoTile } from '@/components/PhotographyVideoTile'
import { SchedulePerformanceDateBadges } from '@/components/SchedulePerformanceDateBadges'
import { useGalleryPhotoSwipe } from '@/lib/gallery-photoswipe'
import { isInternalHref } from '@/lib/internal-href'
import { netlifyImgSet } from '@/lib/netlify-image'
import { relatedGalleryForScheduleEvent } from '@/lib/schedule-gallery'
import { schedulePhotographyLightboxItems } from '@/lib/schedule-photography'
import {
  resolveColorScheme,
  schemeForeground,
  schemeGoldLinkStyle,
  schemeSolidBackground,
} from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import type { ScheduleProductionCredit } from '../../schemas/schedule-event'
import type { ScheduleEvent } from '@/sections/SchedulePageSection'

type GalleryItem = {
  _meta: { path: string }
  title: string
  image: string
  alt: string
  photographer?: string
  roleSlug?: string
  gallerySlug?: string
}

type OrganizationItem = {
  _meta: { path: string }
  name: string
  city: string
  country?: string
}

type RoleItem = {
  _meta: { path: string }
  characterName: string
  operaTitle: string
}

export type ScheduleEventDetailSectionProps = {
  event: ScheduleEvent & {
    composer?: string
    city?: string
    imageAlt?: string
    organizationSlug?: string
    roleSlug?: string
    gallerySlug?: string
    ticketHref?: string
    externalUrl?: string
    cast?: { character: string; performer: string }[]
    productionCredits?: ScheduleProductionCredit[]
    plot?: string
  }
  organizations: OrganizationItem[]
  roles: RoleItem[]
  galleryItems: GalleryItem[]
}

const PRODUCTION_CREDIT_LABELS: Record<ScheduleProductionCredit['position'], string> = {
  conductor: 'Conductor',
  production: 'Production',
  setDesigner: 'Set designer',
  costumes: 'Costumes',
  lighting: 'Lighting',
}

function productionCreditEntries(credits: ScheduleProductionCredit[] | undefined): {
  key: ScheduleProductionCredit['position']
  label: string
  value: string
}[] {
  if (!credits?.length) return []

  return credits
    .filter((entry) => Boolean(entry.name?.trim()) && entry.position in PRODUCTION_CREDIT_LABELS)
    .map((entry) => ({
      key: entry.position,
      label: PRODUCTION_CREDIT_LABELS[entry.position],
      value: entry.name.trim(),
    }))
}

function EventDetailImage({
  title,
  image,
  imageAlt,
}: {
  title: string
  image?: string
  imageAlt?: string
}) {
  if (image?.trim()) {
    return (
      <div className="img-zoom media-radius order-1 lg:order-2 relative">
        <img
          {...netlifyImgSet(image, 900, 1100)}
          alt={imageAlt?.trim() || title}
          className="w-full object-cover"
          style={{ aspectRatio: '4/5', objectPosition: 'top center' }}
        />
      </div>
    )
  }

  return (
    <div
      className="media-radius order-1 lg:order-2 schedule-event-placeholder flex items-center justify-center px-8 text-center"
      style={{ aspectRatio: '4/5' }}
      aria-hidden
    >
      <span className="font-display text-3xl lg:text-4xl italic leading-snug opacity-55">{title}</span>
    </div>
  )
}

function TicketLink({ href, eventTitle }: { href: string; eventTitle: string }) {
  const style = schemeGoldLinkStyle('soft')

  if (isInternalHref(href)) {
    return (
      <Link
        to={href}
        className="gold-link font-body text-xs uppercase tracking-[0.28em]"
        style={style}
        aria-label={`Inquire about ${eventTitle}`}
      >
        Inquire →
      </Link>
    )
  }

  return (
    <ExternalLink
      href={href}
      aria-label={`Get tickets for ${eventTitle}`}
      className="gold-link font-body text-xs uppercase tracking-[0.28em]"
      style={style}
    >
      Get tickets →
    </ExternalLink>
  )
}

export function ScheduleEventDetailSection({
  event,
  organizations,
  roles,
  galleryItems,
}: ScheduleEventDetailSectionProps) {
  const workScheme = resolveColorScheme('bright')
  const workFg = schemeForeground(workScheme)
  const bodyScheme = resolveColorScheme('soft')
  const bodyFg = schemeForeground(bodyScheme)

  const org = event.organizationSlug
    ? organizations.find((entry) => entry._meta.path === event.organizationSlug)
    : undefined
  const role = event.roleSlug ? roles.find((entry) => entry._meta.path === event.roleSlug) : undefined
  const relatedGallery = relatedGalleryForScheduleEvent(event, galleryItems)
  const videoUrl = event.videoUrl?.trim() ?? ''
  const hasVideo = Boolean(videoUrl)
  const showPhotography =
    event.status === 'past' && (hasVideo || relatedGallery.length > 0)
  const plot = event.plot?.trim() ?? ''
  const ticketHref = event.ticketHref?.trim() ?? ''
  const externalUrl = event.externalUrl?.trim() ?? ''
  const creditEntries = productionCreditEntries(event.productionCredits)

  const { ref: workRef, inView: workInView } = useInView<HTMLDivElement>()
  const { ref: bodyRef, inView: bodyInView } = useInView<HTMLDivElement>()
  const { openGallery } = useGalleryPhotoSwipe()

  const lightboxItems = schedulePhotographyLightboxItems(
    { title: event.title, videoUrl, image: event.image },
    relatedGallery.map((item) => ({
      image: item.image,
      alt: item.alt,
      title: item.title,
      photographer: item.photographer,
    })),
  )

  const locationParts = [event.venue, event.city ?? org?.city, org?.country].filter(Boolean)

  const roleLinkStyle: ReturnType<typeof schemeGoldLinkStyle> = {
    ...schemeGoldLinkStyle('bright'),
    color: workFg.heading,
    '--gold-link-underline': workFg.heading,
  }

  return (
    <>
      {/* Work + venue — ImageText layout */}
      <section
        className="section-vertical-padding"
        style={{ background: schemeSolidBackground(workScheme) }}
      >
        <div className="max-w-site mx-auto px-4 lg:px-12">
          <div
            ref={workRef}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start reveal ${workInView ? 'is-visible' : ''}`}
          >
            <div className="order-2 lg:order-1">
              {event.composer && (
                <>
                  <p
                    className="font-body text-xs uppercase tracking-[0.3em] font-semibold mb-6"
                    style={{ color: workFg.eyebrow }}
                  >
                    Music by
                  </p>
                  <p
                    className="font-display text-4xl lg:text-5xl italic leading-tight mb-8"
                    style={{ color: workFg.heading }}
                  >
                    {event.composer}
                  </p>
                  <div className="w-12 h-px mb-8" style={{ background: workFg.divider }} />
                </>
              )}

              {org && (
                <div className="mb-8">
                  <p
                    className="font-body text-xs uppercase tracking-[0.3em] font-semibold mb-3"
                    style={{ color: workFg.eyebrow }}
                  >
                    Presented by
                  </p>
                  <p className="font-display text-2xl lg:text-3xl italic leading-tight" style={{ color: workFg.heading }}>
                    {org.name}
                  </p>
                </div>
              )}

              {plot && (
                <p className="font-body text-base leading-relaxed mb-10" style={{ color: workFg.body }}>
                  {plot}
                </p>
              )}

              {creditEntries.map((row) => (
                <div key={row.key} className="mb-5">
                  <p className="font-body text-xs uppercase tracking-[0.28em] mb-2" style={{ color: workFg.eyebrow }}>
                    {row.label}
                  </p>
                  <p className="font-display text-lg italic leading-snug" style={{ color: workFg.heading }}>
                    {row.value}
                  </p>
                </div>
              ))}

              {role && (
                <div className="mb-5">
                  <p className="font-body text-xs uppercase tracking-[0.28em] mb-2" style={{ color: workFg.eyebrow }}>
                    Sol Risé
                  </p>
                  <Link
                    to="/roles/$slug"
                    params={{ slug: role._meta.path }}
                    className="gold-link-display font-display text-lg italic leading-snug"
                    style={roleLinkStyle}
                  >
                    {role.characterName}
                  </Link>
                </div>
              )}

              {locationParts.length > 0 && (
                <div className="mb-5">
                  <p className="font-body text-xs uppercase tracking-[0.28em] mb-2" style={{ color: workFg.eyebrow }}>
                    Venue
                  </p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: workFg.body }}>
                    {locationParts.join(' · ')}
                  </p>
                </div>
              )}

              {(event.badges?.length ?? 0) > 0 && (
                <div className="mb-8">
                  <p className="font-body text-xs uppercase tracking-[0.28em] mb-3" style={{ color: workFg.eyebrow }}>
                    Performance dates
                  </p>
                  <SchedulePerformanceDateBadges
                    badges={event.badges!}
                    eventRef={event._meta.path}
                    markPastBadges={event.status === 'upcoming'}
                  />
                </div>
              )}

              <div className="flex flex-col items-start gap-4">
                {ticketHref ? <TicketLink href={ticketHref} eventTitle={event.title} /> : null}
                {externalUrl ? (
                  <ExternalLink
                    href={externalUrl}
                    aria-label={`View program for ${event.title}`}
                    className="gold-link font-body text-xs uppercase tracking-[0.28em]"
                    style={schemeGoldLinkStyle('soft')}
                  >
                    View program →
                  </ExternalLink>
                ) : null}
                <Link
                  to="/schedule"
                  className="font-body text-xs uppercase tracking-[0.24em] opacity-70 hover:opacity-100 transition-opacity"
                  style={{ color: workFg.body }}
                >
                  ← All events
                </Link>
              </div>
            </div>

            <EventDetailImage title={event.title} image={event.image} imageAlt={event.imageAlt} />
          </div>
        </div>
      </section>

      {/* Cast; gallery only for past events (photos from this run / role) */}
      {((event.cast?.length ?? 0) > 0 || showPhotography) && (
      <section className="section-vertical-padding" style={{ background: 'var(--page-background-color)' }}>
        <div
          ref={bodyRef}
          className={`max-w-site mx-auto px-4 lg:px-12 reveal ${bodyInView ? 'is-visible' : ''}`}
        >
          {(event.cast?.length ?? 0) > 0 && (
            <div className="mb-14 overflow-x-auto">
              <h2 className="font-display text-2xl lg:text-3xl italic mb-6" style={{ color: bodyFg.heading }}>
                Cast
              </h2>
              <table className="w-full max-w-3xl font-body text-sm border-collapse">
                <tbody>
                  {event.cast!.map((member) => (
                    <tr
                      key={`${member.character}-${member.performer}`}
                      className="border-b"
                      style={{ borderColor: 'color-mix(in srgb, var(--accent-ink-color) 16%, transparent)' }}
                    >
                      <td className="py-3 pr-8 font-display italic text-lg" style={{ color: bodyFg.heading }}>
                        {member.character}
                      </td>
                      <td className="py-3" style={{ color: bodyFg.body }}>
                        {member.performer}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {showPhotography && (
            <div>
              <h2 className="font-display text-2xl lg:text-3xl italic mb-6" style={{ color: bodyFg.heading }}>
                Media
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {hasVideo && (
                  <PhotographyVideoTile
                    video={{ title: event.title, videoUrl, image: event.image }}
                    videoFieldPath="videoUrl"
                    onClick={() => openGallery(lightboxItems, 0)}
                  />
                )}
                {relatedGallery.map((item, index) => (
                  <button
                    key={item._meta.path}
                    type="button"
                    className="img-zoom block media-radius border-0 p-0 text-left cursor-pointer w-full"
                    style={{ aspectRatio: '4/5' }}
                    aria-label={`View larger image: ${item.title}`}
                    onClick={() => openGallery(lightboxItems, hasVideo ? index + 1 : index)}
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
      )}
    </>
  )
}
