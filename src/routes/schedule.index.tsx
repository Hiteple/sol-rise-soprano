import { createFileRoute } from '@tanstack/react-router'
import { allScheduleEvents, allSchedulePages } from 'content-collections'

import { PageHeroSection } from '@/sections/PageHeroSection'
import { SchedulePageSection } from '@/sections/SchedulePageSection'

export const Route = createFileRoute('/schedule/')({
  component: SchedulePage,
})

function SchedulePage() {
  const landing = allSchedulePages[0]
  const events = [...allScheduleEvents].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <div
      style={{ background: 'var(--page-background-color)' }}
      data-sb-object-id="content/schedule-landing/page.md"
    >
      <PageHeroSection
        colorScheme={landing?.pageHeroColorScheme ?? 'bright'}
        heroEyebrow={landing?.heroEyebrow ?? 'On Stage'}
        heroTitle={landing?.heroTitle ?? 'Schedule'}
        heroDescription={
          landing?.heroDescription ?? 'Upcoming performances and a record of recent appearances.'
        }
      />
      <SchedulePageSection
        events={events}
        upcomingColorScheme={landing?.upcomingColorScheme}
        pastColorScheme={landing?.pastColorScheme}
        upcomingSlideIn={landing?.upcomingSlideIn}
        pastSlideIn={landing?.pastSlideIn}
      />
    </div>
  )
}
