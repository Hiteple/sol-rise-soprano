import { createFileRoute, notFound } from '@tanstack/react-router'

import { NotFoundSection } from '@/components/NotFoundSection'
import { useLocale } from '@/components/LocaleContext'
import {
  filterPublishedContent,
  isPublishedContent,
  publishedContentSorted,
} from '@/lib/content-order'
import { allGalleries } from 'content-collections'
import {
  contentMarkdownPath,
  documentSlug,
  getAllOrganizations,
  getAllRoles,
  getScheduleEvent,
  getSchedulePage,
} from '@/lib/i18n/content'
import { getUiMessages } from '@/lib/i18n'
import { SITE_NAME, musicEventJsonLd, pageHead, seoLocaleFromParams } from '@/lib/seo'
import { PageHeroSection } from '@/sections/PageHeroSection'
import { ScheduleEventDetailSection } from '@/sections/ScheduleEventDetailSection'

export const Route = createFileRoute('/{-$locale}/schedule/$slug')({
  loader: ({ params }) => {
    const locale = seoLocaleFromParams(params)
    const event = getScheduleEvent(params.slug, locale)
    if (!event || !isPublishedContent(event.order)) throw notFound()
    return { event }
  },
  head: ({ loaderData, params }) => {
    const { event } = loaderData
    const locale = seoLocaleFromParams(params)
    const description =
      event.plot?.trim() ||
      event.subtitle?.trim() ||
      `${event.title} — performance by ${SITE_NAME}.`
    const slug = documentSlug(event)
    const path = `/schedule/${slug}`

    return {
      ...pageHead({
        title: event.title,
        description,
        path,
        imagePath: event.image,
        type: 'article',
        locale,
        alternateLocales: false,
      }),
      scripts: [
        musicEventJsonLd({
          title: event.title,
          subtitle: event.subtitle,
          plot: event.plot,
          composer: event.composer,
          venue: event.venue,
          city: event.city,
          status: event.status,
          year: event.year,
          path,
          image: event.image,
        }),
      ],
    }
  },
  component: ScheduleEventDetailPage,
  notFoundComponent: ScheduleEventNotFound,
})

function scheduleEventHeroEyebrow(
  event: { status: 'upcoming' | 'past'; year?: string },
  messages: ReturnType<typeof getUiMessages>,
): string {
  if (event.status === 'upcoming') return messages.schedule.upcoming
  return [event.year, messages.schedule.pastAppearance].filter(Boolean).join(' · ')
}

function ScheduleEventDetailPage() {
  const { event } = Route.useLoaderData()
  const { locale, messages } = useLocale()
  const landing = getSchedulePage(locale)

  return (
    <div
      style={{ background: 'var(--page-background-color)' }}
      data-sb-object-id={contentMarkdownPath(event)}
    >
      <PageHeroSection
        colorScheme={landing?.pageHeroColorScheme ?? 'bright'}
        heroEyebrow={scheduleEventHeroEyebrow(event, messages)}
        heroTitle={event.title}
        bottomSpacing="compact"
      />
      <ScheduleEventDetailSection
        event={event}
        organizations={publishedContentSorted(getAllOrganizations(locale))}
        roles={publishedContentSorted(getAllRoles(locale))}
        galleryItems={filterPublishedContent(allGalleries)}
      />
    </div>
  )
}

function ScheduleEventNotFound() {
  const { messages } = useLocale()
  const nf = messages.schedule.notFound

  return (
    <NotFoundSection
      eyebrow={nf.eyebrow}
      title={nf.title}
      description={nf.description}
      backHref="/schedule"
      backLabel={nf.backLabel}
    />
  )
}
