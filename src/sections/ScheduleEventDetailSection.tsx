import { Link } from '@tanstack/react-router'

import { useGalleryPhotoSwipe } from '@/lib/gallery-photoswipe'
import { isInternalHref } from '@/lib/internal-href'
import { netlifyImgSet } from '@/lib/netlify-image'
import { relatedGalleryForScheduleEvent } from '@/lib/schedule-gallery'
import {
  resolveColorScheme,
  schemeForeground,
  schemeGoldLinkStyle,
  schemePageBandBackground,
  schemeSolidBackground,
} from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import type { ScheduleProductionCredits } from '../../schemas/schedule-event'
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
    productionCredits?: ScheduleProductionCredits
    plot?: string
  }
  organizations: OrganizationItem[]
  roles: RoleItem[]
  galleryItems: GalleryItem[]
}

const PRODUCTION_CREDIT_ROWS: { key: keyof ScheduleProductionCredits; label: string }[] = [
  { key: 'conductor', label: 'Conductor' },
  { key: 'production', label: 'Production' },
  { key: 'setDesigner', label: 'Set designer' },
  { key: 'costumes', label: 'Costumes' },
  { key: 'lighting', label: 'Lighting' },
]

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

function TicketLink({ href }: { href: string }) {
  const style = schemeGoldLinkStyle('soft')

  if (isInternalHref(href)) {
    return (
      <Link to={href} className="gold-link font-body text-xs uppercase tracking-[0.28em]" style={style}>
        Inquire →
      </Link>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="gold-link font-body text-xs uppercase tracking-[0.28em]"
      style={style}
    >
      Get tickets →
    </a>
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
  const creditsScheme = resolveColorScheme('wine')
  const creditsFg = schemeForeground(creditsScheme)

  const org = event.organizationSlug
    ? organizations.find((entry) => entry._meta.path === event.organizationSlug)
    : undefined
  const role = event.roleSlug ? roles.find((entry) => entry._meta.path === event.roleSlug) : undefined
  const relatedGallery = relatedGalleryForScheduleEvent(event, galleryItems)
  const plot = event.plot?.trim() ?? ''
  const ticketHref = event.ticketHref?.trim() ?? ''
  const externalUrl = event.externalUrl?.trim() ?? ''
  const credits = event.productionCredits ?? {}
  const creditEntries = PRODUCTION_CREDIT_ROWS.filter((row) => (credits[row.key]?.trim().length ?? 0) > 0)
  const hasCredits = creditEntries.length > 0

  const { ref: workRef, inView: workInView } = useInView<HTMLDivElement>()
  const { ref: bodyRef, inView: bodyInView } = useInView<HTMLDivElement>()
  const { openGallery } = useGalleryPhotoSwipe()

  const lightboxItems = relatedGallery.map((item) => ({
    image: item.image,
    alt: item.alt,
    title: item.title,
    photographer: item.photographer,
  }))

  const locationParts = [event.venue, event.city ?? org?.city, org?.country].filter(Boolean)

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

              {role && (
                <div className="mb-5">
                  <p className="font-body text-xs uppercase tracking-[0.28em] mb-2" style={{ color: workFg.eyebrow }}>
                    Sol Risé
                  </p>
                  <Link
                    to="/roles/$slug"
                    params={{ slug: role._meta.path }}
                    className="gold-link font-display text-lg italic"
                  >
                    {role.characterName}
                  </Link>
                </div>
              )}

              {(event.badges?.length ?? 0) > 0 && (
                <div className="mb-8">
                  <p className="font-body text-xs uppercase tracking-[0.28em] mb-3" style={{ color: workFg.eyebrow }}>
                    Performance dates
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {event.badges!.map((badge) => (
                      <li
                        key={badge}
                        className="px-3 py-1.5 font-body text-xs uppercase tracking-[0.2em] rounded-[var(--media-radius)] border"
                        style={{
                          borderColor: workFg.divider,
                          color: workFg.heading,
                        }}
                      >
                        {badge}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col items-start gap-4">
                {ticketHref ? <TicketLink href={ticketHref} /> : null}
                {externalUrl ? (
                  <a
                    href={externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gold-link font-body text-xs uppercase tracking-[0.28em]"
                    style={schemeGoldLinkStyle('soft')}
                  >
                    View program →
                  </a>
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

      {/* This production — creative team */}
      {hasCredits && (
        <section
          className="section-vertical-padding border-t"
          style={{
            background: schemePageBandBackground(creditsScheme),
            borderColor: 'color-mix(in srgb, var(--media-caption-text-color) 12%, transparent)',
          }}
        >
          <div className="max-w-site mx-auto px-4 lg:px-12">
            <h2
              className="font-display text-3xl lg:text-4xl italic mb-10"
              style={{ color: creditsFg.heading }}
            >
              This production
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
              {creditEntries.map((row) => (
                <div key={row.key}>
                  <dt
                    className="font-body text-xs uppercase tracking-[0.32em] mb-2 font-semibold"
                    style={{ color: creditsFg.eyebrow }}
                  >
                    {row.label}
                  </dt>
                  <dd className="font-display text-xl italic" style={{ color: creditsFg.heading }}>
                    {credits[row.key]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Cast; gallery only for past events (photos from this run / role) */}
      {((event.cast?.length ?? 0) > 0 || relatedGallery.length > 0) && (
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

          {relatedGallery.length > 0 && (
            <div>
              <h2 className="font-display text-2xl lg:text-3xl italic mb-6" style={{ color: bodyFg.heading }}>
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
      )}
    </>
  )
}
