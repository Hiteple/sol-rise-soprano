import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import {
  allGalleries,
  allOrganizations,
  allRoles,
  allScheduleEvents,
  allSchedulePages,
} from 'content-collections'

import { PageHeroSection } from '@/sections/PageHeroSection'
import { ScheduleEventDetailSection } from '@/sections/ScheduleEventDetailSection'

export const Route = createFileRoute('/schedule/$slug')({
  loader: ({ params }) => {
    const event = allScheduleEvents.find((entry) => entry._meta.path === params.slug)
    if (!event) throw notFound()
    return { event }
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
        organizations={allOrganizations}
        roles={allRoles}
        galleryItems={allGalleries}
      />
    </div>
  )
}

function ScheduleEventNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-4xl italic mb-4">Event not found</h1>
      <p className="font-body text-sm mb-8" style={{ color: 'var(--muted-text-color)' }}>
        This event page does not exist or has been moved.
      </p>
      <Link to="/schedule" className="gold-link font-body text-xs uppercase tracking-widest">
        Back to schedule
      </Link>
    </div>
  )
}
