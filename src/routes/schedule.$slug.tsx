import { createFileRoute, notFound } from '@tanstack/react-router'
import {
  allGalleries,
  allOrganizations,
  allRoles,
  allScheduleEvents,
  allSchedulePages,
} from 'content-collections'

import { NotFoundSection } from '@/components/NotFoundSection'
import {
  filterPublishedContent,
  isPublishedContent,
  publishedContentSorted,
} from '@/lib/content-order'
import { SITE_NAME, musicEventJsonLd, pageHead } from '@/lib/seo'
import { PageHeroSection } from '@/sections/PageHeroSection'
import { ScheduleEventDetailSection } from '@/sections/ScheduleEventDetailSection'

export const Route = createFileRoute('/schedule/$slug')({
  loader: ({ params }) => {
    const event = allScheduleEvents.find((entry) => entry._meta.path === params.slug)
    if (!event || !isPublishedContent(event.order)) throw notFound()
    return { event }
  },
  head: ({ loaderData }) => {
    const event = loaderData.event
    const description =
      event.plot?.trim() ||
      event.subtitle?.trim() ||
      `${event.title} — performance by ${SITE_NAME}.`
    const path = `/schedule/${event._meta.path}`

    return {
      ...pageHead({
        title: event.title,
        description,
        path,
        imagePath: event.image,
        type: 'article',
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

function scheduleEventHeroEyebrow(event: { status: 'upcoming' | 'past'; year?: string }): string {
  if (event.status === 'upcoming') return 'Upcoming'
  return [event.year, 'Past appearance'].filter(Boolean).join(' · ')
}

function ScheduleEventDetailPage() {
  const { event } = Route.useLoaderData()
  const landing = allSchedulePages[0]

  return (
    <div
      style={{ background: 'var(--page-background-color)' }}
      data-sb-object-id={`content/schedule/${event._meta.path}.md`}
    >
      <PageHeroSection
        colorScheme={landing?.pageHeroColorScheme ?? 'bright'}
        heroEyebrow={scheduleEventHeroEyebrow(event)}
        heroTitle={event.title}
        bottomSpacing="compact"
      />
      <ScheduleEventDetailSection
        event={event}
        organizations={publishedContentSorted(allOrganizations)}
        roles={publishedContentSorted(allRoles)}
        galleryItems={filterPublishedContent(allGalleries)}
      />
    </div>
  )
}

function ScheduleEventNotFound() {
  return (
    <NotFoundSection
      eyebrow="Schedule"
      title="Event not found"
      description="This performance is not on the calendar — it may be unpublished, past, or the link may have changed."
      backHref="/schedule"
      backLabel="Back to schedule"
    />
  )
}
