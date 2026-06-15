import { createFileRoute } from '@tanstack/react-router'
import { useLocale } from '@/components/LocaleContext'
import { getCareerPage } from '@/lib/i18n/content'
import { pageHead, seoLocaleFromParams } from '@/lib/seo'
import { ImageBigTextSection } from '@/sections/ImageBigTextSection'
import { StatsRowSection } from '@/sections/StatsRowSection'
import { TimelineSection } from '@/sections/TimelineSection'

export const Route = createFileRoute('/{-$locale}/career')({
  head: ({ params }) =>
    pageHead({
      title: 'Career',
      description:
        'Opera and concert career of Sol Risé Soprano — milestones, repertoire, Teatro Colón, Juventus Lyrica and international appearances.',
      path: '/career',
      imagePath: '/images/salon-dorado/IMG_5954.webp',
      locale: seoLocaleFromParams(params),
    }),
  component: CareerPage,
})

function CareerPage() {
  const { locale } = useLocale()
  const page = getCareerPage(locale)
  if (!page) return null

  return (
    <div style={{ background: 'var(--page-background-color)' }} data-sb-object-id="content/career/page.md">
      <ImageBigTextSection page={page} />
      <StatsRowSection page={page} />
      <TimelineSection page={page} />
    </div>
  )
}
