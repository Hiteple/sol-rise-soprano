import { createFileRoute } from '@tanstack/react-router'
import { allVideos } from 'content-collections'

import { useLocale } from '@/components/LocaleContext'
import { getVideosPage } from '@/lib/i18n/content'
import { SITE_NAME, pageHead, seoLocaleFromParams } from '@/lib/seo'
import { PageHeroSection } from '@/sections/PageHeroSection'
import { VideosSection } from '@/sections/VideosSection'

export const Route = createFileRoute('/{-$locale}/videos')({
  head: ({ params }) =>
    pageHead({
      title: 'Videos',
      description: `Performance videos of ${SITE_NAME} — arias and stage excerpts on YouTube.`,
      path: '/videos',
      locale: seoLocaleFromParams(params),
    }),
  component: VideosPage,
})

function VideosPage() {
  const { locale } = useLocale()
  const page = getVideosPage(locale)

  return (
    <div
      style={{ background: 'var(--page-background-color)' }}
      data-sb-object-id="content/videos-landing/page.md"
    >
      <PageHeroSection
        colorScheme={page?.pageHeroColorScheme}
        heroEyebrow={page?.heroEyebrow ?? 'Performance'}
        heroTitle={page?.heroTitle ?? 'Videos'}
        bottomSpacing="compact"
      />
      <VideosSection page={page} videos={allVideos} />
    </div>
  )
}
