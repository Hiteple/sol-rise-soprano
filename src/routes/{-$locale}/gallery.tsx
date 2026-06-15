import { createFileRoute } from '@tanstack/react-router'
import { allGalleries, allRoles, allScheduleEvents } from 'content-collections'

import { useLocale } from '@/components/LocaleContext'
import { filterPublishedContent } from '@/lib/content-order'
import { GALLERY_CATEGORIES } from '@/lib/gallery-categories'
import { sortGalleryChronologically } from '@/lib/gallery-sort'
import { getGalleryPage } from '@/lib/i18n/content'
import { SITE_NAME, pageHead, seoLocaleFromParams } from '@/lib/seo'
import { PageHeroSection } from '@/sections/PageHeroSection'
import { TabItemsSection } from '@/sections/TabItemsSection'

export const Route = createFileRoute('/{-$locale}/gallery')({
  head: ({ params }) =>
    pageHead({
      title: 'Gallery',
      description:
        `Photography from ${SITE_NAME} on stage, backstage and photo book sessions — opera, concert and festival performances.`,
      path: '/gallery',
      imagePath: '/images/photo-book/SON05945 1.jpg',
      locale: seoLocaleFromParams(params),
    }),
  component: GalleryPage,
})

function GalleryPage() {
  const { locale } = useLocale()
  const landing = getGalleryPage(locale)
  const categories =
    landing?.filterCategories?.length ? landing.filterCategories : [...GALLERY_CATEGORIES]

  const items = sortGalleryChronologically(
    filterPublishedContent(allGalleries),
    allScheduleEvents,
    allRoles,
  )

  return (
    <div
      style={{ background: 'var(--page-background-color)' }}
      data-sb-object-id="content/gallery-landing/page.md"
    >
      <PageHeroSection
        colorScheme={landing?.pageHeroColorScheme}
        heroEyebrow={landing?.heroEyebrow ?? 'Photography'}
        heroTitle={landing?.heroTitle ?? 'Gallery'}
        bottomSpacing="compact"
      />
      <TabItemsSection
        categories={categories}
        items={items}
        tabItemsColorScheme={landing?.tabItemsColorScheme}
        slideIn={landing?.tabItemsSlideIn}
      />
    </div>
  )
}
