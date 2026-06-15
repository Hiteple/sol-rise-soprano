import { createFileRoute } from '@tanstack/react-router'

import { useLocale } from '@/components/LocaleContext'
import { publishedContentSorted } from '@/lib/content-order'
import { getAllOrganizations, getOrganizationsPage } from '@/lib/i18n/content'
import { SITE_NAME, pageHead, seoLocaleFromParams } from '@/lib/seo'
import { PageHeroSection } from '@/sections/PageHeroSection'
import { OrganizationsIndexSection } from '@/sections/OrganizationsIndexSection'

export const Route = createFileRoute('/{-$locale}/organizations')({
  head: ({ params }) =>
    pageHead({
      title: 'Organizations',
      description:
        `Opera houses, festivals and companies where ${SITE_NAME} has performed — Teatro Colón, Juventus Lyrica, Teatro Avenida and more.`,
      path: '/organizations',
      imagePath: '/images/teatro-colon/theater-colon-01.webp',
      locale: seoLocaleFromParams(params),
    }),
  component: OrganizationsPage,
})

function OrganizationsPage() {
  const { locale } = useLocale()
  const landing = getOrganizationsPage(locale)
  const organizations = publishedContentSorted(getAllOrganizations(locale))

  return (
    <div
      style={{ background: 'var(--page-background-color)' }}
      data-sb-object-id="content/organizations-landing/page.md"
    >
      <PageHeroSection
        colorScheme={landing?.pageHeroColorScheme ?? 'bright'}
        heroEyebrow={landing?.heroEyebrow ?? 'Career'}
        heroTitle={landing?.heroTitle ?? 'Organizations'}
        heroDescription={
          landing?.heroDescription ??
          'Opera houses, festivals, and companies where Sol Risé has performed.'
        }
      />
      <OrganizationsIndexSection
        organizations={organizations}
        listColorScheme={landing?.organizationsListColorScheme}
        slideIn={landing?.organizationsListSlideIn}
      />
    </div>
  )
}
