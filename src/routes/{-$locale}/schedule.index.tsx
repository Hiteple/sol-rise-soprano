import { createFileRoute } from '@tanstack/react-router'

import { useLocale } from '@/components/LocaleContext'
import { publishedContentSorted } from '@/lib/content-order'
import { getAllScheduleEvents, getSchedulePage } from '@/lib/i18n/content'
import { pageHead, seoLocaleFromParams } from '@/lib/seo'
import { PageHeroSection } from '@/sections/PageHeroSection'
import { SchedulePageSection } from '@/sections/SchedulePageSection'

export const Route = createFileRoute('/{-$locale}/schedule/')({
  head: ({ params }) =>
    pageHead({
      title: 'Schedule',
      description:
        'Upcoming performances and past appearances of Sol Risé Soprano — opera, concert and festival dates, venues and details.',
      path: '/schedule',
      locale: seoLocaleFromParams(params),
    }),
  component: SchedulePage,
})

function SchedulePage() {
  const { locale } = useLocale()
  const landing = getSchedulePage(locale)
  const events = publishedContentSorted(getAllScheduleEvents(locale))

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
