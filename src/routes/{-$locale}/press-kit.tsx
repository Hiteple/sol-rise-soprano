import { createFileRoute } from '@tanstack/react-router'

import { useLocale } from '@/components/LocaleContext'
import { getPressKitPage } from '@/lib/i18n/content'
import { SITE_NAME, pageHead, seoLocaleFromParams } from '@/lib/seo'
import { PageHeroSection } from '@/sections/PageHeroSection'
import { PressKitSection } from '@/sections/PressKitSection'

export const Route = createFileRoute('/{-$locale}/press-kit')({
  head: ({ params }) =>
    pageHead({
      title: 'Press Kit',
      description:
        `Download press materials for ${SITE_NAME} — bios, CVs and high-resolution photography for programmes and media.`,
      path: '/press-kit',
      imagePath: '/images/photo-book/SON05945 1.jpg',
      locale: seoLocaleFromParams(params),
    }),
  component: PressKitPage,
})

function PressKitPage() {
  const { locale } = useLocale()
  const page = getPressKitPage(locale)

  return (
    <div style={{ background: 'var(--page-background-color)' }} data-sb-object-id="content/press-kit/page.md">
      <PageHeroSection
        colorScheme={page?.pageHeroColorScheme}
        heroEyebrow={page?.heroEyebrow ?? 'Press & Media'}
        heroTitle={page?.heroTitle ?? 'Press Kit'}
        heroDescription={page?.heroDescription}
        bottomSpacing="compact"
      />
      <PressKitSection page={page} />
    </div>
  )
}
